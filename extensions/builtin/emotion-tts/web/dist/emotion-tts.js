function bE(n, a) {
  for (var i = 0; i < a.length; i++) {
    const s = a[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in n)) {
          const c = Object.getOwnPropertyDescriptor(s, o);
          c && Object.defineProperty(n, o, c.get ? c : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function Lb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Xd = { exports: {} }, Xl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $v;
function xE() {
  if ($v) return Xl;
  $v = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(s, o, c) {
    var h = null;
    if (c !== void 0 && (h = "" + c), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      c = {};
      for (var m in o)
        m !== "key" && (c[m] = o[m]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: s,
      key: h,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Xl.Fragment = a, Xl.jsx = i, Xl.jsxs = i, Xl;
}
var Hv;
function SE() {
  return Hv || (Hv = 1, Xd.exports = xE()), Xd.exports;
}
var d = SE(), Kd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qv;
function wE() {
  if (qv) return Le;
  qv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), S = Symbol.iterator;
  function E(A) {
    return A === null || typeof A != "object" ? null : (A = S && A[S] || A["@@iterator"], typeof A == "function" ? A : null);
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
  function T(A, Q, ee) {
    this.props = A, this.context = Q, this.refs = R, this.updater = ee || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(A, Q) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, Q, "setState");
  }, T.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function L() {
  }
  L.prototype = T.prototype;
  function M(A, Q, ee) {
    this.props = A, this.context = Q, this.refs = R, this.updater = ee || w;
  }
  var _ = M.prototype = new L();
  _.constructor = M, N(_, T.prototype), _.isPureReactComponent = !0;
  var Z = Array.isArray;
  function te() {
  }
  var ne = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function H(A, Q, ee) {
    var ue = ee.ref;
    return {
      $$typeof: n,
      type: A,
      key: Q,
      ref: ue !== void 0 ? ue : null,
      props: ee
    };
  }
  function q(A, Q) {
    return H(A.type, Q, A.props);
  }
  function oe(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function I(A) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(ee) {
      return Q[ee];
    });
  }
  var Y = /\/+/g;
  function se(A, Q) {
    return typeof A == "object" && A !== null && A.key != null ? I("" + A.key) : Q.toString(36);
  }
  function J(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(te, te) : (A.status = "pending", A.then(
          function(Q) {
            A.status === "pending" && (A.status = "fulfilled", A.value = Q);
          },
          function(Q) {
            A.status === "pending" && (A.status = "rejected", A.reason = Q);
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
  function O(A, Q, ee, ue, fe) {
    var ve = typeof A;
    (ve === "undefined" || ve === "boolean") && (A = null);
    var ze = !1;
    if (A === null) ze = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          ze = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case n:
            case a:
              ze = !0;
              break;
            case x:
              return ze = A._init, O(
                ze(A._payload),
                Q,
                ee,
                ue,
                fe
              );
          }
      }
    if (ze)
      return fe = fe(A), ze = ue === "" ? "." + se(A, 0) : ue, Z(fe) ? (ee = "", ze != null && (ee = ze.replace(Y, "$&/") + "/"), O(fe, Q, ee, "", function(Ut) {
        return Ut;
      })) : fe != null && (oe(fe) && (fe = q(
        fe,
        ee + (fe.key == null || A && A.key === fe.key ? "" : ("" + fe.key).replace(
          Y,
          "$&/"
        ) + "/") + ze
      )), Q.push(fe)), 1;
    ze = 0;
    var _e = ue === "" ? "." : ue + ":";
    if (Z(A))
      for (var Ve = 0; Ve < A.length; Ve++)
        ue = A[Ve], ve = _e + se(ue, Ve), ze += O(
          ue,
          Q,
          ee,
          ve,
          fe
        );
    else if (Ve = E(A), typeof Ve == "function")
      for (A = Ve.call(A), Ve = 0; !(ue = A.next()).done; )
        ue = ue.value, ve = _e + se(ue, Ve++), ze += O(
          ue,
          Q,
          ee,
          ve,
          fe
        );
    else if (ve === "object") {
      if (typeof A.then == "function")
        return O(
          J(A),
          Q,
          ee,
          ue,
          fe
        );
      throw Q = String(A), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ze;
  }
  function C(A, Q, ee) {
    if (A == null) return A;
    var ue = [], fe = 0;
    return O(A, ue, "", "", function(ve) {
      return Q.call(ee, ve, fe++);
    }), ue;
  }
  function B(A) {
    if (A._status === -1) {
      var Q = A._result;
      Q = Q(), Q.then(
        function(ee) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = ee);
        },
        function(ee) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = ee);
        }
      ), A._status === -1 && (A._status = 0, A._result = Q);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var P = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, re = {
    map: C,
    forEach: function(A, Q, ee) {
      C(
        A,
        function() {
          Q.apply(this, arguments);
        },
        ee
      );
    },
    count: function(A) {
      var Q = 0;
      return C(A, function() {
        Q++;
      }), Q;
    },
    toArray: function(A) {
      return C(A, function(Q) {
        return Q;
      }) || [];
    },
    only: function(A) {
      if (!oe(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Le.Activity = g, Le.Children = re, Le.Component = T, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = M, Le.StrictMode = s, Le.Suspense = v, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, Le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return ne.H.useMemoCache(A);
    }
  }, Le.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Le.cacheSignal = function() {
    return null;
  }, Le.cloneElement = function(A, Q, ee) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ue = N({}, A.props), fe = A.key;
    if (Q != null)
      for (ve in Q.key !== void 0 && (fe = "" + Q.key), Q)
        !D.call(Q, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && Q.ref === void 0 || (ue[ve] = Q[ve]);
    var ve = arguments.length - 2;
    if (ve === 1) ue.children = ee;
    else if (1 < ve) {
      for (var ze = Array(ve), _e = 0; _e < ve; _e++)
        ze[_e] = arguments[_e + 2];
      ue.children = ze;
    }
    return H(A.type, fe, ue);
  }, Le.createContext = function(A) {
    return A = {
      $$typeof: h,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: c,
      _context: A
    }, A;
  }, Le.createElement = function(A, Q, ee) {
    var ue, fe = {}, ve = null;
    if (Q != null)
      for (ue in Q.key !== void 0 && (ve = "" + Q.key), Q)
        D.call(Q, ue) && ue !== "key" && ue !== "__self" && ue !== "__source" && (fe[ue] = Q[ue]);
    var ze = arguments.length - 2;
    if (ze === 1) fe.children = ee;
    else if (1 < ze) {
      for (var _e = Array(ze), Ve = 0; Ve < ze; Ve++)
        _e[Ve] = arguments[Ve + 2];
      fe.children = _e;
    }
    if (A && A.defaultProps)
      for (ue in ze = A.defaultProps, ze)
        fe[ue] === void 0 && (fe[ue] = ze[ue]);
    return H(A, ve, fe);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(A) {
    return { $$typeof: m, render: A };
  }, Le.isValidElement = oe, Le.lazy = function(A) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: A },
      _init: B
    };
  }, Le.memo = function(A, Q) {
    return {
      $$typeof: p,
      type: A,
      compare: Q === void 0 ? null : Q
    };
  }, Le.startTransition = function(A) {
    var Q = ne.T, ee = {};
    ne.T = ee;
    try {
      var ue = A(), fe = ne.S;
      fe !== null && fe(ee, ue), typeof ue == "object" && ue !== null && typeof ue.then == "function" && ue.then(te, P);
    } catch (ve) {
      P(ve);
    } finally {
      Q !== null && ee.types !== null && (Q.types = ee.types), ne.T = Q;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, Le.use = function(A) {
    return ne.H.use(A);
  }, Le.useActionState = function(A, Q, ee) {
    return ne.H.useActionState(A, Q, ee);
  }, Le.useCallback = function(A, Q) {
    return ne.H.useCallback(A, Q);
  }, Le.useContext = function(A) {
    return ne.H.useContext(A);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(A, Q) {
    return ne.H.useDeferredValue(A, Q);
  }, Le.useEffect = function(A, Q) {
    return ne.H.useEffect(A, Q);
  }, Le.useEffectEvent = function(A) {
    return ne.H.useEffectEvent(A);
  }, Le.useId = function() {
    return ne.H.useId();
  }, Le.useImperativeHandle = function(A, Q, ee) {
    return ne.H.useImperativeHandle(A, Q, ee);
  }, Le.useInsertionEffect = function(A, Q) {
    return ne.H.useInsertionEffect(A, Q);
  }, Le.useLayoutEffect = function(A, Q) {
    return ne.H.useLayoutEffect(A, Q);
  }, Le.useMemo = function(A, Q) {
    return ne.H.useMemo(A, Q);
  }, Le.useOptimistic = function(A, Q) {
    return ne.H.useOptimistic(A, Q);
  }, Le.useReducer = function(A, Q, ee) {
    return ne.H.useReducer(A, Q, ee);
  }, Le.useRef = function(A) {
    return ne.H.useRef(A);
  }, Le.useState = function(A) {
    return ne.H.useState(A);
  }, Le.useSyncExternalStore = function(A, Q, ee) {
    return ne.H.useSyncExternalStore(
      A,
      Q,
      ee
    );
  }, Le.useTransition = function() {
    return ne.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var Iv;
function vh() {
  return Iv || (Iv = 1, Kd.exports = wE()), Kd.exports;
}
var b = vh();
const he = /* @__PURE__ */ Lb(b), EE = /* @__PURE__ */ bE({
  __proto__: null,
  default: he
}, [b]);
var Pd = { exports: {} }, Kl = {}, Qd = { exports: {} }, Zd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fv;
function jE() {
  return Fv || (Fv = 1, (function(n) {
    function a(O, C) {
      var B = O.length;
      O.push(C);
      e: for (; 0 < B; ) {
        var P = B - 1 >>> 1, re = O[P];
        if (0 < o(re, C))
          O[P] = C, O[B] = re, B = P;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var C = O[0], B = O.pop();
      if (B !== C) {
        O[0] = B;
        e: for (var P = 0, re = O.length, A = re >>> 1; P < A; ) {
          var Q = 2 * (P + 1) - 1, ee = O[Q], ue = Q + 1, fe = O[ue];
          if (0 > o(ee, B))
            ue < re && 0 > o(fe, ee) ? (O[P] = fe, O[ue] = B, P = ue) : (O[P] = ee, O[Q] = B, P = Q);
          else if (ue < re && 0 > o(fe, B))
            O[P] = fe, O[ue] = B, P = ue;
          else break e;
        }
      }
      return C;
    }
    function o(O, C) {
      var B = O.sortIndex - C.sortIndex;
      return B !== 0 ? B : O.id - C.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var h = Date, m = h.now();
      n.unstable_now = function() {
        return h.now() - m;
      };
    }
    var v = [], p = [], x = 1, g = null, S = 3, E = !1, w = !1, N = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
    function _(O) {
      for (var C = i(p); C !== null; ) {
        if (C.callback === null) s(p);
        else if (C.startTime <= O)
          s(p), C.sortIndex = C.expirationTime, a(v, C);
        else break;
        C = i(p);
      }
    }
    function Z(O) {
      if (N = !1, _(O), !w)
        if (i(v) !== null)
          w = !0, te || (te = !0, I());
        else {
          var C = i(p);
          C !== null && J(Z, C.startTime - O);
        }
    }
    var te = !1, ne = -1, D = 5, H = -1;
    function q() {
      return R ? !0 : !(n.unstable_now() - H < D);
    }
    function oe() {
      if (R = !1, te) {
        var O = n.unstable_now();
        H = O;
        var C = !0;
        try {
          e: {
            w = !1, N && (N = !1, L(ne), ne = -1), E = !0;
            var B = S;
            try {
              t: {
                for (_(O), g = i(v); g !== null && !(g.expirationTime > O && q()); ) {
                  var P = g.callback;
                  if (typeof P == "function") {
                    g.callback = null, S = g.priorityLevel;
                    var re = P(
                      g.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof re == "function") {
                      g.callback = re, _(O), C = !0;
                      break t;
                    }
                    g === i(v) && s(v), _(O);
                  } else s(v);
                  g = i(v);
                }
                if (g !== null) C = !0;
                else {
                  var A = i(p);
                  A !== null && J(
                    Z,
                    A.startTime - O
                  ), C = !1;
                }
              }
              break e;
            } finally {
              g = null, S = B, E = !1;
            }
            C = void 0;
          }
        } finally {
          C ? I() : te = !1;
        }
      }
    }
    var I;
    if (typeof M == "function")
      I = function() {
        M(oe);
      };
    else if (typeof MessageChannel < "u") {
      var Y = new MessageChannel(), se = Y.port2;
      Y.port1.onmessage = oe, I = function() {
        se.postMessage(null);
      };
    } else
      I = function() {
        T(oe, 0);
      };
    function J(O, C) {
      ne = T(function() {
        O(n.unstable_now());
      }, C);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = S;
      }
      var B = S;
      S = C;
      try {
        return O();
      } finally {
        S = B;
      }
    }, n.unstable_requestPaint = function() {
      R = !0;
    }, n.unstable_runWithPriority = function(O, C) {
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
      var B = S;
      S = O;
      try {
        return C();
      } finally {
        S = B;
      }
    }, n.unstable_scheduleCallback = function(O, C, B) {
      var P = n.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? P + B : P) : B = P, O) {
        case 1:
          var re = -1;
          break;
        case 2:
          re = 250;
          break;
        case 5:
          re = 1073741823;
          break;
        case 4:
          re = 1e4;
          break;
        default:
          re = 5e3;
      }
      return re = B + re, O = {
        id: x++,
        callback: C,
        priorityLevel: O,
        startTime: B,
        expirationTime: re,
        sortIndex: -1
      }, B > P ? (O.sortIndex = B, a(p, O), i(v) === null && O === i(p) && (N ? (L(ne), ne = -1) : N = !0, J(Z, B - P))) : (O.sortIndex = re, a(v, O), w || E || (w = !0, te || (te = !0, I()))), O;
    }, n.unstable_shouldYield = q, n.unstable_wrapCallback = function(O) {
      var C = S;
      return function() {
        var B = S;
        S = C;
        try {
          return O.apply(this, arguments);
        } finally {
          S = B;
        }
      };
    };
  })(Zd)), Zd;
}
var Yv;
function NE() {
  return Yv || (Yv = 1, Qd.exports = jE()), Qd.exports;
}
var Jd = { exports: {} }, rn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gv;
function TE() {
  if (Gv) return rn;
  Gv = 1;
  var n = vh();
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
  function c(v, p, x) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
      children: v,
      containerInfo: p,
      implementation: x
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, rn.createPortal = function(v, p) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return c(v, p, null, x);
  }, rn.flushSync = function(v) {
    var p = h.T, x = s.p;
    try {
      if (h.T = null, s.p = 2, v) return v();
    } finally {
      h.T = p, s.p = x, s.d.f();
    }
  }, rn.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(v, p));
  }, rn.prefetchDNS = function(v) {
    typeof v == "string" && s.d.D(v);
  }, rn.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var x = p.as, g = m(x, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, E = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      x === "style" ? s.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: g,
          integrity: S,
          fetchPriority: E
        }
      ) : x === "script" && s.d.X(v, {
        crossOrigin: g,
        integrity: S,
        fetchPriority: E,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, rn.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var x = m(
            p.as,
            p.crossOrigin
          );
          s.d.M(v, {
            crossOrigin: x,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(v);
  }, rn.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var x = p.as, g = m(x, p.crossOrigin);
      s.d.L(v, x, {
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
  }, rn.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var x = m(p.as, p.crossOrigin);
        s.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: x,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(v);
  }, rn.requestFormReset = function(v) {
    s.d.r(v);
  }, rn.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, rn.useFormState = function(v, p, x) {
    return h.H.useFormState(v, p, x);
  }, rn.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, rn.version = "19.2.5", rn;
}
var Xv;
function Ub() {
  if (Xv) return Jd.exports;
  Xv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Jd.exports = TE(), Jd.exports;
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
var Kv;
function CE() {
  if (Kv) return Kl;
  Kv = 1;
  var n = NE(), a = vh(), i = Ub();
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
  function c(e) {
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
  function v(e) {
    if (c(e) !== e)
      throw Error(s(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = c(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var r = e, l = t; ; ) {
      var u = r.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (l = u.return, l !== null) {
          r = l;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === r) return v(u), e;
          if (f === l) return v(u), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (r.return !== l.return) r = u, l = f;
      else {
        for (var y = !1, j = u.child; j; ) {
          if (j === r) {
            y = !0, r = u, l = f;
            break;
          }
          if (j === l) {
            y = !0, l = u, r = f;
            break;
          }
          j = j.sibling;
        }
        if (!y) {
          for (j = f.child; j; ) {
            if (j === r) {
              y = !0, r = f, l = u;
              break;
            }
            if (j === l) {
              y = !0, l = f, r = u;
              break;
            }
            j = j.sibling;
          }
          if (!y) throw Error(s(189));
        }
      }
      if (r.alternate !== l) throw Error(s(190));
    }
    if (r.tag !== 3) throw Error(s(188));
    return r.stateNode.current === r ? e : t;
  }
  function x(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = x(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var g = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), M = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), q = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Y = Symbol.for("react.client.reference");
  function se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Y ? null : e.displayName || e.name || null;
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
      case te:
        return "SuspenseList";
      case H:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case M:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ne:
          return t = e.displayName || null, t !== null ? t : se(e.type) || "Memo";
        case D:
          t = e._payload, e = e._init;
          try {
            return se(e(t));
          } catch {
          }
      }
    return null;
  }
  var J = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, P = [], re = -1;
  function A(e) {
    return { current: e };
  }
  function Q(e) {
    0 > re || (e.current = P[re], P[re] = null, re--);
  }
  function ee(e, t) {
    re++, P[re] = e.current, e.current = t;
  }
  var ue = A(null), fe = A(null), ve = A(null), ze = A(null);
  function _e(e, t) {
    switch (ee(ve, t), ee(fe, e), ee(ue, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? uv(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = uv(t), e = cv(t, e);
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
    Q(ue), ee(ue, e);
  }
  function Ve() {
    Q(ue), Q(fe), Q(ve);
  }
  function Ut(e) {
    e.memoizedState !== null && ee(ze, e);
    var t = ue.current, r = cv(t, e.type);
    t !== r && (ee(fe, e), ee(ue, r));
  }
  function Yt(e) {
    fe.current === e && (Q(ue), Q(fe)), ze.current === e && (Q(ze), Il._currentValue = B);
  }
  var me, Ne;
  function Ce(e) {
    if (me === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        me = t && t[1] || "", Ne = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + me + e + Ne;
  }
  var Re = !1;
  function Kt(e, t) {
    if (!e || Re) return "";
    Re = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var le = function() {
                throw Error();
              };
              if (Object.defineProperty(le.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(le, []);
                } catch (W) {
                  var K = W;
                }
                Reflect.construct(e, [], le);
              } else {
                try {
                  le.call();
                } catch (W) {
                  K = W;
                }
                e.call(le.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (W) {
                K = W;
              }
              (le = e()) && typeof le.catch == "function" && le.catch(function() {
              });
            }
          } catch (W) {
            if (W && K && typeof W.stack == "string")
              return [W.stack, K.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = l.DetermineComponentFrameRoot(), y = f[0], j = f[1];
      if (y && j) {
        var k = y.split(`
`), X = j.split(`
`);
        for (u = l = 0; l < k.length && !k[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < X.length && !X[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === k.length || u === X.length)
          for (l = k.length - 1, u = X.length - 1; 1 <= l && 0 <= u && k[l] !== X[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (k[l] !== X[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || k[l] !== X[u]) {
                  var ae = `
` + k[l].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Re = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Ce(r) : "";
  }
  function at(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ce(e.type);
      case 16:
        return Ce("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ce("Suspense Fallback") : Ce("Suspense");
      case 19:
        return Ce("SuspenseList");
      case 0:
      case 15:
        return Kt(e.type, !1);
      case 11:
        return Kt(e.type.render, !1);
      case 1:
        return Kt(e.type, !0);
      case 31:
        return Ce("Activity");
      default:
        return "";
    }
  }
  function on(e) {
    try {
      var t = "", r = null;
      do
        t += at(e, r), r = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Pt = Object.prototype.hasOwnProperty, xn = n.unstable_scheduleCallback, pa = n.unstable_cancelCallback, Bt = n.unstable_shouldYield, zn = n.unstable_requestPaint, Vt = n.unstable_now, ye = n.unstable_getCurrentPriorityLevel, Oe = n.unstable_ImmediatePriority, Pe = n.unstable_UserBlockingPriority, et = n.unstable_NormalPriority, $t = n.unstable_LowPriority, Ht = n.unstable_IdlePriority, Nr = n.log, ia = n.unstable_setDisableYieldValue, Qn = null, Qt = null;
  function Et(e) {
    if (typeof Nr == "function" && ia(e), Qt && typeof Qt.setStrictMode == "function")
      try {
        Qt.setStrictMode(Qn, e);
      } catch {
      }
  }
  var qt = Math.clz32 ? Math.clz32 : On, ei = Math.log, $a = Math.LN2;
  function On(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / $a | 0) | 0;
  }
  var ga = 256, Zn = 262144, la = 4194304;
  function cn(e) {
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
  function ke(e, t, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, f = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var j = l & 134217727;
    return j !== 0 ? (l = j & ~f, l !== 0 ? u = cn(l) : (y &= j, y !== 0 ? u = cn(y) : r || (r = j & ~e, r !== 0 && (u = cn(r))))) : (j = l & ~f, j !== 0 ? u = cn(j) : y !== 0 ? u = cn(y) : r || (r = l & ~e, r !== 0 && (u = cn(r)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, r = t & -t, f >= r || f === 32 && (r & 4194048) !== 0) ? t : u;
  }
  function ut(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Rt(e, t) {
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
  function It() {
    var e = la;
    return la <<= 1, (la & 62914560) === 0 && (la = 4194304), e;
  }
  function Sn(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function rt(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Zt(e, t, r, l, u, f) {
    var y = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var j = e.entanglements, k = e.expirationTimes, X = e.hiddenUpdates;
    for (r = y & ~r; 0 < r; ) {
      var ae = 31 - qt(r), le = 1 << ae;
      j[ae] = 0, k[ae] = -1;
      var K = X[ae];
      if (K !== null)
        for (X[ae] = null, ae = 0; ae < K.length; ae++) {
          var W = K[ae];
          W !== null && (W.lane &= -536870913);
        }
      r &= ~le;
    }
    l !== 0 && va(e, l, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(y & ~t));
  }
  function va(e, t, r) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - qt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function nn(e, t) {
    var r = e.entangledLanes |= t;
    for (e = e.entanglements; r; ) {
      var l = 31 - qt(r), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), r &= ~u;
    }
  }
  function z(e, t) {
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
  function ce() {
    var e = C.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : zv(e.type));
  }
  function de(e, t) {
    var r = C.p;
    try {
      return C.p = e, t();
    } finally {
      C.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ge = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Ae = "__reactListeners$" + Se, Te = "__reactHandles$" + Se, Qe = "__reactResources$" + Se, $e = "__reactMarker$" + Se;
  function ct(e) {
    delete e[pe], delete e[ge], delete e[be], delete e[Ae], delete e[Te];
  }
  function it(e) {
    var t = e[pe];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if (t = r[Ee] || r[pe]) {
        if (r = t.alternate, t.child !== null || r !== null && r.child !== null)
          for (e = vv(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = vv(e);
          }
        return t;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function yt(e) {
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
  function Mt(e) {
    var t = e[Qe];
    return t || (t = e[Qe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ht(e) {
    e[$e] = !0;
  }
  var Ha = /* @__PURE__ */ new Set(), Jn = {};
  function Gt(e, t) {
    sa(e, t), sa(e + "Capture", t);
  }
  function sa(e, t) {
    for (Jn[e] = t, e = 0; e < t.length; e++)
      Ha.add(t[e]);
  }
  var Tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), oa = {}, Cr = {};
  function ti(e) {
    return Pt.call(Cr, e) ? !0 : Pt.call(oa, e) ? !1 : Tr.test(e) ? Cr[e] = !0 : (oa[e] = !0, !1);
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
  function jt(e, t, r) {
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
  function an(e, t, r, l) {
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
  function At(e) {
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
  function pt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ni(e, t, r) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, f = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          r = "" + y, f.call(this, y);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(y) {
          r = "" + y;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ai(e) {
    if (!e._valueTracker) {
      var t = pt(e) ? "checked" : "value";
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
    return e && (l = pt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (t.setValue(e), !0) : !1;
  }
  function zs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var hS = /[\n"\\]/g;
  function kn(e) {
    return e.replace(
      hS,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hu(e, t, r, l, u, f, y, j) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + At(t)) : e.value !== "" + At(t) && (e.value = "" + At(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? qu(e, y, At(t)) : r != null ? qu(e, y, At(r)) : l != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), j != null && typeof j != "function" && typeof j != "symbol" && typeof j != "boolean" ? e.name = "" + At(j) : e.removeAttribute("name");
  }
  function am(e, t, r, l, u, f, y, j) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + At(r) : "", t = t != null ? "" + At(t) : r, j || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = j ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), ai(e);
  }
  function qu(e, t, r) {
    t === "number" && zs(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, t, r, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < r.length; u++)
        t["$" + r[u]] = !0;
      for (r = 0; r < e.length; r++)
        u = t.hasOwnProperty("$" + e[r].value), e[r].selected !== u && (e[r].selected = u), u && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + At(r), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === r) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function rm(e, t, r) {
    if (t != null && (t = "" + At(t), t !== e.value && (e.value = t), r == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = r != null ? "" + At(r) : "";
  }
  function im(e, t, r, l) {
    if (t == null) {
      if (l != null) {
        if (r != null) throw Error(s(92));
        if (J(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), t = r;
    }
    r = At(t), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), ai(e);
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
  var mS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function lm(e, t, r) {
    var l = t.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, r) : typeof r != "number" || r === 0 || mS.has(t) ? t === "float" ? e.cssFloat = r : e[t] = ("" + r).trim() : e[t] = r + "px";
  }
  function sm(e, t, r) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && r[u] !== l && lm(e, u, l);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && lm(e, f, t[f]);
  }
  function Iu(e) {
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
  var pS = /* @__PURE__ */ new Map([
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
  ]), gS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Os(e) {
    return gS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Fu = null;
  function Yu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var li = null, si = null;
  function om(e) {
    var t = yt(e);
    if (t && (e = t.stateNode)) {
      var r = e[ge] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Hu(
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
              'input[name="' + kn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < r.length; t++) {
              var l = r[t];
              if (l !== e && l.form === e.form) {
                var u = l[ge] || null;
                if (!u) throw Error(s(90));
                Hu(
                  l,
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
            for (t = 0; t < r.length; t++)
              l = r[t], l.form === e.form && Ds(l);
          }
          break e;
        case "textarea":
          rm(e, r.value, r.defaultValue);
          break e;
        case "select":
          t = r.value, t != null && ri(e, !!r.multiple, t, !1);
      }
    }
  }
  var Gu = !1;
  function um(e, t, r) {
    if (Gu) return e(t, r);
    Gu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Gu = !1, (li !== null || si !== null) && (wo(), li && (t = li, e = si, si = li = null, om(t), e)))
        for (t = 0; t < e.length; t++) om(e[t]);
    }
  }
  function ll(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[ge] || null;
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
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xu = !1;
  if (ba)
    try {
      var sl = {};
      Object.defineProperty(sl, "passive", {
        get: function() {
          Xu = !0;
        }
      }), window.addEventListener("test", sl, sl), window.removeEventListener("test", sl, sl);
    } catch {
      Xu = !1;
    }
  var qa = null, Ku = null, ks = null;
  function cm() {
    if (ks) return ks;
    var e, t = Ku, r = t.length, l, u = "value" in qa ? qa.value : qa.textContent, f = u.length;
    for (e = 0; e < r && t[e] === u[e]; e++) ;
    var y = r - e;
    for (l = 1; l <= y && t[r - l] === u[f - l]; l++) ;
    return ks = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ls(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Us() {
    return !0;
  }
  function dm() {
    return !1;
  }
  function dn(e) {
    function t(r, l, u, f, y) {
      this._reactName = r, this._targetInst = u, this.type = l, this.nativeEvent = f, this.target = y, this.currentTarget = null;
      for (var j in e)
        e.hasOwnProperty(j) && (r = e[j], this[j] = r ? r(f) : f[j]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Us : dm, this.isPropagationStopped = dm, this;
    }
    return g(t.prototype, {
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
  var Rr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bs = dn(Rr), ol = g({}, Rr, { view: 0, detail: 0 }), vS = dn(ol), Pu, Qu, ul, Vs = g({}, ol, {
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
    getModifierState: Ju,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ul && (ul && e.type === "mousemove" ? (Pu = e.screenX - ul.screenX, Qu = e.screenY - ul.screenY) : Qu = Pu = 0, ul = e), Pu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Qu;
    }
  }), fm = dn(Vs), yS = g({}, Vs, { dataTransfer: 0 }), bS = dn(yS), xS = g({}, ol, { relatedTarget: 0 }), Zu = dn(xS), SS = g({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), wS = dn(SS), ES = g({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), jS = dn(ES), NS = g({}, Rr, { data: 0 }), hm = dn(NS), TS = {
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
  }, CS = {
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
  }, RS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function MS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = RS[e]) ? !!t[e] : !1;
  }
  function Ju() {
    return MS;
  }
  var AS = g({}, ol, {
    key: function(e) {
      if (e.key) {
        var t = TS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ls(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? CS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ju,
    charCode: function(e) {
      return e.type === "keypress" ? Ls(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ls(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _S = dn(AS), DS = g({}, Vs, {
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
  }), mm = dn(DS), zS = g({}, ol, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ju
  }), OS = dn(zS), kS = g({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), LS = dn(kS), US = g({}, Vs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), BS = dn(US), VS = g({}, Rr, {
    newState: 0,
    oldState: 0
  }), $S = dn(VS), HS = [9, 13, 27, 32], Wu = ba && "CompositionEvent" in window, cl = null;
  ba && "documentMode" in document && (cl = document.documentMode);
  var qS = ba && "TextEvent" in window && !cl, pm = ba && (!Wu || cl && 8 < cl && 11 >= cl), gm = " ", vm = !1;
  function ym(e, t) {
    switch (e) {
      case "keyup":
        return HS.indexOf(t.keyCode) !== -1;
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
  function bm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function IS(e, t) {
    switch (e) {
      case "compositionend":
        return bm(t);
      case "keypress":
        return t.which !== 32 ? null : (vm = !0, gm);
      case "textInput":
        return e = t.data, e === gm && vm ? null : e;
      default:
        return null;
    }
  }
  function FS(e, t) {
    if (oi)
      return e === "compositionend" || !Wu && ym(e, t) ? (e = cm(), ks = Ku = qa = null, oi = !1, e) : null;
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
        return pm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var YS = {
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
  function xm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!YS[e.type] : t === "textarea";
  }
  function Sm(e, t, r, l) {
    li ? si ? si.push(l) : si = [l] : li = l, t = Mo(t, "onChange"), 0 < t.length && (r = new Bs(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: t }));
  }
  var dl = null, fl = null;
  function GS(e) {
    av(e, 0);
  }
  function $s(e) {
    var t = Ie(e);
    if (Ds(t)) return e;
  }
  function wm(e, t) {
    if (e === "change") return t;
  }
  var Em = !1;
  if (ba) {
    var ec;
    if (ba) {
      var tc = "oninput" in document;
      if (!tc) {
        var jm = document.createElement("div");
        jm.setAttribute("oninput", "return;"), tc = typeof jm.oninput == "function";
      }
      ec = tc;
    } else ec = !1;
    Em = ec && (!document.documentMode || 9 < document.documentMode);
  }
  function Nm() {
    dl && (dl.detachEvent("onpropertychange", Tm), fl = dl = null);
  }
  function Tm(e) {
    if (e.propertyName === "value" && $s(fl)) {
      var t = [];
      Sm(
        t,
        fl,
        e,
        Yu(e)
      ), um(GS, t);
    }
  }
  function XS(e, t, r) {
    e === "focusin" ? (Nm(), dl = t, fl = r, dl.attachEvent("onpropertychange", Tm)) : e === "focusout" && Nm();
  }
  function KS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $s(fl);
  }
  function PS(e, t) {
    if (e === "click") return $s(t);
  }
  function QS(e, t) {
    if (e === "input" || e === "change")
      return $s(t);
  }
  function ZS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var wn = typeof Object.is == "function" ? Object.is : ZS;
  function hl(e, t) {
    if (wn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(t);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var u = r[l];
      if (!Pt.call(t, u) || !wn(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function Cm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Rm(e, t) {
    var r = Cm(e);
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
      r = Cm(r);
    }
  }
  function Mm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Mm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Am(e) {
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
  function nc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var JS = ba && "documentMode" in document && 11 >= document.documentMode, ui = null, ac = null, ml = null, rc = !1;
  function _m(e, t, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    rc || ui == null || ui !== zs(l) || (l = ui, "selectionStart" in l && nc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ml && hl(ml, l) || (ml = l, l = Mo(ac, "onSelect"), 0 < l.length && (t = new Bs(
      "onSelect",
      "select",
      null,
      t,
      r
    ), e.push({ event: t, listeners: l }), t.target = ui)));
  }
  function Mr(e, t) {
    var r = {};
    return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r;
  }
  var ci = {
    animationend: Mr("Animation", "AnimationEnd"),
    animationiteration: Mr("Animation", "AnimationIteration"),
    animationstart: Mr("Animation", "AnimationStart"),
    transitionrun: Mr("Transition", "TransitionRun"),
    transitionstart: Mr("Transition", "TransitionStart"),
    transitioncancel: Mr("Transition", "TransitionCancel"),
    transitionend: Mr("Transition", "TransitionEnd")
  }, ic = {}, Dm = {};
  ba && (Dm = document.createElement("div").style, "AnimationEvent" in window || (delete ci.animationend.animation, delete ci.animationiteration.animation, delete ci.animationstart.animation), "TransitionEvent" in window || delete ci.transitionend.transition);
  function Ar(e) {
    if (ic[e]) return ic[e];
    if (!ci[e]) return e;
    var t = ci[e], r;
    for (r in t)
      if (t.hasOwnProperty(r) && r in Dm)
        return ic[e] = t[r];
    return e;
  }
  var zm = Ar("animationend"), Om = Ar("animationiteration"), km = Ar("animationstart"), WS = Ar("transitionrun"), ew = Ar("transitionstart"), tw = Ar("transitioncancel"), Lm = Ar("transitionend"), Um = /* @__PURE__ */ new Map(), lc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  lc.push("scrollEnd");
  function Wn(e, t) {
    Um.set(e, t), Gt(t, [e]);
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
  }, Ln = [], di = 0, sc = 0;
  function qs() {
    for (var e = di, t = sc = di = 0; t < e; ) {
      var r = Ln[t];
      Ln[t++] = null;
      var l = Ln[t];
      Ln[t++] = null;
      var u = Ln[t];
      Ln[t++] = null;
      var f = Ln[t];
      if (Ln[t++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      f !== 0 && Bm(r, u, f);
    }
  }
  function Is(e, t, r, l) {
    Ln[di++] = e, Ln[di++] = t, Ln[di++] = r, Ln[di++] = l, sc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function oc(e, t, r, l) {
    return Is(e, t, r, l), Fs(e);
  }
  function _r(e, t) {
    return Is(e, null, null, t), Fs(e);
  }
  function Bm(e, t, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= r, l = f.alternate, l !== null && (l.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - qt(r), e = f.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = r | 536870912), f) : null;
  }
  function Fs(e) {
    if (50 < Ll)
      throw Ll = 0, vd = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function nw(e, t, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function En(e, t, r, l) {
    return new nw(e, t, r, l);
  }
  function uc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xa(e, t) {
    var r = e.alternate;
    return r === null ? (r = En(
      e.tag,
      t,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Vm(e, t) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, t = r.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ys(e, t, r, l, u, f) {
    var y = 0;
    if (l = e, typeof e == "function") uc(e) && (y = 1);
    else if (typeof e == "string")
      y = sE(
        e,
        r,
        ue.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case H:
          return e = En(31, r, t, u), e.elementType = H, e.lanes = f, e;
        case N:
          return Dr(r.children, u, f, t);
        case R:
          y = 8, u |= 24;
          break;
        case T:
          return e = En(12, r, t, u | 2), e.elementType = T, e.lanes = f, e;
        case Z:
          return e = En(13, r, t, u), e.elementType = Z, e.lanes = f, e;
        case te:
          return e = En(19, r, t, u), e.elementType = te, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case M:
                y = 10;
                break e;
              case L:
                y = 9;
                break e;
              case _:
                y = 11;
                break e;
              case ne:
                y = 14;
                break e;
              case D:
                y = 16, l = null;
                break e;
            }
          y = 29, r = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = En(y, r, t, u), t.elementType = e, t.type = l, t.lanes = f, t;
  }
  function Dr(e, t, r, l) {
    return e = En(7, e, l, t), e.lanes = r, e;
  }
  function cc(e, t, r) {
    return e = En(6, e, null, t), e.lanes = r, e;
  }
  function $m(e) {
    var t = En(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function dc(e, t, r) {
    return t = En(
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
  var Hm = /* @__PURE__ */ new WeakMap();
  function Un(e, t) {
    if (typeof e == "object" && e !== null) {
      var r = Hm.get(e);
      return r !== void 0 ? r : (t = {
        value: e,
        source: t,
        stack: on(t)
      }, Hm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: on(t)
    };
  }
  var hi = [], mi = 0, Gs = null, pl = 0, Bn = [], Vn = 0, Ia = null, ua = 1, ca = "";
  function Sa(e, t) {
    hi[mi++] = pl, hi[mi++] = Gs, Gs = e, pl = t;
  }
  function qm(e, t, r) {
    Bn[Vn++] = ua, Bn[Vn++] = ca, Bn[Vn++] = Ia, Ia = e;
    var l = ua;
    e = ca;
    var u = 32 - qt(l) - 1;
    l &= ~(1 << u), r += 1;
    var f = 32 - qt(t) + u;
    if (30 < f) {
      var y = u - u % 5;
      f = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, ua = 1 << 32 - qt(t) + u | r << u | l, ca = f + e;
    } else
      ua = 1 << f | r << u | l, ca = e;
  }
  function fc(e) {
    e.return !== null && (Sa(e, 1), qm(e, 1, 0));
  }
  function hc(e) {
    for (; e === Gs; )
      Gs = hi[--mi], hi[mi] = null, pl = hi[--mi], hi[mi] = null;
    for (; e === Ia; )
      Ia = Bn[--Vn], Bn[Vn] = null, ca = Bn[--Vn], Bn[Vn] = null, ua = Bn[--Vn], Bn[Vn] = null;
  }
  function Im(e, t) {
    Bn[Vn++] = ua, Bn[Vn++] = ca, Bn[Vn++] = Ia, ua = t.id, ca = t.overflow, Ia = e;
  }
  var Jt = null, gt = null, Ke = !1, Fa = null, $n = !1, mc = Error(s(519));
  function Ya(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw gl(Un(t, e)), mc;
  }
  function Fm(e) {
    var t = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (t[pe] = e, t[ge] = l, r) {
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
        Ye("invalid", t), am(
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
        Ye("invalid", t), im(t, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || t.textContent === "" + r || l.suppressHydrationWarning === !0 || sv(t.textContent, r) ? (l.popover != null && (Ye("beforetoggle", t), Ye("toggle", t)), l.onScroll != null && Ye("scroll", t), l.onScrollEnd != null && Ye("scrollend", t), l.onClick != null && (t.onclick = ya), t = !0) : t = !1, t || Ya(e, !0);
  }
  function Ym(e) {
    for (Jt = e.return; Jt; )
      switch (Jt.tag) {
        case 5:
        case 31:
        case 13:
          $n = !1;
          return;
        case 27:
        case 3:
          $n = !0;
          return;
        default:
          Jt = Jt.return;
      }
  }
  function pi(e) {
    if (e !== Jt) return !1;
    if (!Ke) return Ym(e), Ke = !0, !1;
    var t = e.tag, r;
    if ((r = t !== 3 && t !== 27) && ((r = t === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Dd(e.type, e.memoizedProps)), r = !r), r && gt && Ya(e), Ym(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      gt = gv(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      gt = gv(e);
    } else
      t === 27 ? (t = gt, ir(e.type) ? (e = Ud, Ud = null, gt = e) : gt = t) : gt = Jt ? qn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function zr() {
    gt = Jt = null, Ke = !1;
  }
  function pc() {
    var e = Fa;
    return e !== null && (pn === null ? pn = e : pn.push.apply(
      pn,
      e
    ), Fa = null), e;
  }
  function gl(e) {
    Fa === null ? Fa = [e] : Fa.push(e);
  }
  var gc = A(null), Or = null, wa = null;
  function Ga(e, t, r) {
    ee(gc, t._currentValue), t._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = gc.current, Q(gc);
  }
  function vc(e, t, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === r) break;
      e = e.return;
    }
  }
  function yc(e, t, r, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var y = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var j = f;
          f = u;
          for (var k = 0; k < t.length; k++)
            if (j.context === t[k]) {
              f.lanes |= r, j = f.alternate, j !== null && (j.lanes |= r), vc(
                f.return,
                r,
                e
              ), l || (y = null);
              break e;
            }
          f = j.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(s(341));
        y.lanes |= r, f = y.alternate, f !== null && (f.lanes |= r), vc(y, r, e), y = null;
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (u = y.sibling, u !== null) {
            u.return = y.return, y = u;
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function gi(e, t, r, l) {
    e = null;
    for (var u = t, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(s(387));
        if (y = y.memoizedProps, y !== null) {
          var j = u.type;
          wn(u.pendingProps.value, y.value) || (e !== null ? e.push(j) : e = [j]);
        }
      } else if (u === ze.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Il) : e = [Il]);
      }
      u = u.return;
    }
    e !== null && yc(
      t,
      e,
      r,
      l
    ), t.flags |= 262144;
  }
  function Xs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!wn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function kr(e) {
    Or = e, wa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Wt(e) {
    return Gm(Or, e);
  }
  function Ks(e, t) {
    return Or === null && kr(e), Gm(e, t);
  }
  function Gm(e, t) {
    var r = t._currentValue;
    if (t = { context: t, memoizedValue: r, next: null }, wa === null) {
      if (e === null) throw Error(s(308));
      wa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else wa = wa.next = t;
    return r;
  }
  var aw = typeof AbortController < "u" ? AbortController : function() {
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
  }, rw = n.unstable_scheduleCallback, iw = n.unstable_NormalPriority, _t = {
    $$typeof: M,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function bc() {
    return {
      controller: new aw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function vl(e) {
    e.refCount--, e.refCount === 0 && rw(iw, function() {
      e.controller.abort();
    });
  }
  var yl = null, xc = 0, vi = 0, yi = null;
  function lw(e, t) {
    if (yl === null) {
      var r = yl = [];
      xc = 0, vi = Ed(), yi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return xc++, t.then(Xm, Xm), t;
  }
  function Xm() {
    if (--xc === 0 && yl !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = yl;
      yl = null, vi = 0, yi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function sw(e, t) {
    var r = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        r.push(u);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var u = 0; u < r.length; u++) (0, r[u])(t);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < r.length; u++)
          (0, r[u])(void 0);
      }
    ), l;
  }
  var Km = O.S;
  O.S = function(e, t) {
    _g = Vt(), typeof t == "object" && t !== null && typeof t.then == "function" && lw(e, t), Km !== null && Km(e, t);
  };
  var Lr = A(null);
  function Sc() {
    var e = Lr.current;
    return e !== null ? e : dt.pooledCache;
  }
  function Ps(e, t) {
    t === null ? ee(Lr, Lr.current) : ee(Lr, t.pool);
  }
  function Pm() {
    var e = Sc();
    return e === null ? null : { parent: _t._currentValue, pool: e };
  }
  var bi = Error(s(460)), wc = Error(s(474)), Qs = Error(s(542)), Zs = { then: function() {
  } };
  function Qm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Zm(e, t, r) {
    switch (r = e[r], r === void 0 ? e.push(t) : r !== t && (t.then(ya, ya), t = r), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Wm(e), e;
      default:
        if (typeof t.status == "string") t.then(ya, ya);
        else {
          if (e = dt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Wm(e), e;
        }
        throw Br = t, bi;
    }
  }
  function Ur(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Br = r, bi) : r;
    }
  }
  var Br = null;
  function Jm() {
    if (Br === null) throw Error(s(459));
    var e = Br;
    return Br = null, e;
  }
  function Wm(e) {
    if (e === bi || e === Qs)
      throw Error(s(483));
  }
  var xi = null, bl = 0;
  function Js(e) {
    var t = bl;
    return bl += 1, xi === null && (xi = []), Zm(xi, e, t);
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
  function ep(e) {
    function t($, U) {
      if (e) {
        var G = $.deletions;
        G === null ? ($.deletions = [U], $.flags |= 16) : G.push(U);
      }
    }
    function r($, U) {
      if (!e) return null;
      for (; U !== null; )
        t($, U), U = U.sibling;
      return null;
    }
    function l($) {
      for (var U = /* @__PURE__ */ new Map(); $ !== null; )
        $.key !== null ? U.set($.key, $) : U.set($.index, $), $ = $.sibling;
      return U;
    }
    function u($, U) {
      return $ = xa($, U), $.index = 0, $.sibling = null, $;
    }
    function f($, U, G) {
      return $.index = G, e ? (G = $.alternate, G !== null ? (G = G.index, G < U ? ($.flags |= 67108866, U) : G) : ($.flags |= 67108866, U)) : ($.flags |= 1048576, U);
    }
    function y($) {
      return e && $.alternate === null && ($.flags |= 67108866), $;
    }
    function j($, U, G, ie) {
      return U === null || U.tag !== 6 ? (U = cc(G, $.mode, ie), U.return = $, U) : (U = u(U, G), U.return = $, U);
    }
    function k($, U, G, ie) {
      var Me = G.type;
      return Me === N ? ae(
        $,
        U,
        G.props.children,
        ie,
        G.key
      ) : U !== null && (U.elementType === Me || typeof Me == "object" && Me !== null && Me.$$typeof === D && Ur(Me) === U.type) ? (U = u(U, G.props), xl(U, G), U.return = $, U) : (U = Ys(
        G.type,
        G.key,
        G.props,
        null,
        $.mode,
        ie
      ), xl(U, G), U.return = $, U);
    }
    function X($, U, G, ie) {
      return U === null || U.tag !== 4 || U.stateNode.containerInfo !== G.containerInfo || U.stateNode.implementation !== G.implementation ? (U = dc(G, $.mode, ie), U.return = $, U) : (U = u(U, G.children || []), U.return = $, U);
    }
    function ae($, U, G, ie, Me) {
      return U === null || U.tag !== 7 ? (U = Dr(
        G,
        $.mode,
        ie,
        Me
      ), U.return = $, U) : (U = u(U, G), U.return = $, U);
    }
    function le($, U, G) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return U = cc(
          "" + U,
          $.mode,
          G
        ), U.return = $, U;
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case E:
            return G = Ys(
              U.type,
              U.key,
              U.props,
              null,
              $.mode,
              G
            ), xl(G, U), G.return = $, G;
          case w:
            return U = dc(
              U,
              $.mode,
              G
            ), U.return = $, U;
          case D:
            return U = Ur(U), le($, U, G);
        }
        if (J(U) || I(U))
          return U = Dr(
            U,
            $.mode,
            G,
            null
          ), U.return = $, U;
        if (typeof U.then == "function")
          return le($, Js(U), G);
        if (U.$$typeof === M)
          return le(
            $,
            Ks($, U),
            G
          );
        Ws($, U);
      }
      return null;
    }
    function K($, U, G, ie) {
      var Me = U !== null ? U.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return Me !== null ? null : j($, U, "" + G, ie);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            return G.key === Me ? k($, U, G, ie) : null;
          case w:
            return G.key === Me ? X($, U, G, ie) : null;
          case D:
            return G = Ur(G), K($, U, G, ie);
        }
        if (J(G) || I(G))
          return Me !== null ? null : ae($, U, G, ie, null);
        if (typeof G.then == "function")
          return K(
            $,
            U,
            Js(G),
            ie
          );
        if (G.$$typeof === M)
          return K(
            $,
            U,
            Ks($, G),
            ie
          );
        Ws($, G);
      }
      return null;
    }
    function W($, U, G, ie, Me) {
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return $ = $.get(G) || null, j(U, $, "" + ie, Me);
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case E:
            return $ = $.get(
              ie.key === null ? G : ie.key
            ) || null, k(U, $, ie, Me);
          case w:
            return $ = $.get(
              ie.key === null ? G : ie.key
            ) || null, X(U, $, ie, Me);
          case D:
            return ie = Ur(ie), W(
              $,
              U,
              G,
              ie,
              Me
            );
        }
        if (J(ie) || I(ie))
          return $ = $.get(G) || null, ae(U, $, ie, Me, null);
        if (typeof ie.then == "function")
          return W(
            $,
            U,
            G,
            Js(ie),
            Me
          );
        if (ie.$$typeof === M)
          return W(
            $,
            U,
            G,
            Ks(U, ie),
            Me
          );
        Ws(U, ie);
      }
      return null;
    }
    function xe($, U, G, ie) {
      for (var Me = null, Ze = null, je = U, Be = U = 0, Xe = null; je !== null && Be < G.length; Be++) {
        je.index > Be ? (Xe = je, je = null) : Xe = je.sibling;
        var Je = K(
          $,
          je,
          G[Be],
          ie
        );
        if (Je === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && Je.alternate === null && t($, je), U = f(Je, U, Be), Ze === null ? Me = Je : Ze.sibling = Je, Ze = Je, je = Xe;
      }
      if (Be === G.length)
        return r($, je), Ke && Sa($, Be), Me;
      if (je === null) {
        for (; Be < G.length; Be++)
          je = le($, G[Be], ie), je !== null && (U = f(
            je,
            U,
            Be
          ), Ze === null ? Me = je : Ze.sibling = je, Ze = je);
        return Ke && Sa($, Be), Me;
      }
      for (je = l(je); Be < G.length; Be++)
        Xe = W(
          je,
          $,
          Be,
          G[Be],
          ie
        ), Xe !== null && (e && Xe.alternate !== null && je.delete(
          Xe.key === null ? Be : Xe.key
        ), U = f(
          Xe,
          U,
          Be
        ), Ze === null ? Me = Xe : Ze.sibling = Xe, Ze = Xe);
      return e && je.forEach(function(cr) {
        return t($, cr);
      }), Ke && Sa($, Be), Me;
    }
    function De($, U, G, ie) {
      if (G == null) throw Error(s(151));
      for (var Me = null, Ze = null, je = U, Be = U = 0, Xe = null, Je = G.next(); je !== null && !Je.done; Be++, Je = G.next()) {
        je.index > Be ? (Xe = je, je = null) : Xe = je.sibling;
        var cr = K($, je, Je.value, ie);
        if (cr === null) {
          je === null && (je = Xe);
          break;
        }
        e && je && cr.alternate === null && t($, je), U = f(cr, U, Be), Ze === null ? Me = cr : Ze.sibling = cr, Ze = cr, je = Xe;
      }
      if (Je.done)
        return r($, je), Ke && Sa($, Be), Me;
      if (je === null) {
        for (; !Je.done; Be++, Je = G.next())
          Je = le($, Je.value, ie), Je !== null && (U = f(Je, U, Be), Ze === null ? Me = Je : Ze.sibling = Je, Ze = Je);
        return Ke && Sa($, Be), Me;
      }
      for (je = l(je); !Je.done; Be++, Je = G.next())
        Je = W(je, $, Be, Je.value, ie), Je !== null && (e && Je.alternate !== null && je.delete(Je.key === null ? Be : Je.key), U = f(Je, U, Be), Ze === null ? Me = Je : Ze.sibling = Je, Ze = Je);
      return e && je.forEach(function(yE) {
        return t($, yE);
      }), Ke && Sa($, Be), Me;
    }
    function ot($, U, G, ie) {
      if (typeof G == "object" && G !== null && G.type === N && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            e: {
              for (var Me = G.key; U !== null; ) {
                if (U.key === Me) {
                  if (Me = G.type, Me === N) {
                    if (U.tag === 7) {
                      r(
                        $,
                        U.sibling
                      ), ie = u(
                        U,
                        G.props.children
                      ), ie.return = $, $ = ie;
                      break e;
                    }
                  } else if (U.elementType === Me || typeof Me == "object" && Me !== null && Me.$$typeof === D && Ur(Me) === U.type) {
                    r(
                      $,
                      U.sibling
                    ), ie = u(U, G.props), xl(ie, G), ie.return = $, $ = ie;
                    break e;
                  }
                  r($, U);
                  break;
                } else t($, U);
                U = U.sibling;
              }
              G.type === N ? (ie = Dr(
                G.props.children,
                $.mode,
                ie,
                G.key
              ), ie.return = $, $ = ie) : (ie = Ys(
                G.type,
                G.key,
                G.props,
                null,
                $.mode,
                ie
              ), xl(ie, G), ie.return = $, $ = ie);
            }
            return y($);
          case w:
            e: {
              for (Me = G.key; U !== null; ) {
                if (U.key === Me)
                  if (U.tag === 4 && U.stateNode.containerInfo === G.containerInfo && U.stateNode.implementation === G.implementation) {
                    r(
                      $,
                      U.sibling
                    ), ie = u(U, G.children || []), ie.return = $, $ = ie;
                    break e;
                  } else {
                    r($, U);
                    break;
                  }
                else t($, U);
                U = U.sibling;
              }
              ie = dc(G, $.mode, ie), ie.return = $, $ = ie;
            }
            return y($);
          case D:
            return G = Ur(G), ot(
              $,
              U,
              G,
              ie
            );
        }
        if (J(G))
          return xe(
            $,
            U,
            G,
            ie
          );
        if (I(G)) {
          if (Me = I(G), typeof Me != "function") throw Error(s(150));
          return G = Me.call(G), De(
            $,
            U,
            G,
            ie
          );
        }
        if (typeof G.then == "function")
          return ot(
            $,
            U,
            Js(G),
            ie
          );
        if (G.$$typeof === M)
          return ot(
            $,
            U,
            Ks($, G),
            ie
          );
        Ws($, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, U !== null && U.tag === 6 ? (r($, U.sibling), ie = u(U, G), ie.return = $, $ = ie) : (r($, U), ie = cc(G, $.mode, ie), ie.return = $, $ = ie), y($)) : r($, U);
    }
    return function($, U, G, ie) {
      try {
        bl = 0;
        var Me = ot(
          $,
          U,
          G,
          ie
        );
        return xi = null, Me;
      } catch (je) {
        if (je === bi || je === Qs) throw je;
        var Ze = En(29, je, null, $.mode);
        return Ze.lanes = ie, Ze.return = $, Ze;
      } finally {
      }
    };
  }
  var Vr = ep(!0), tp = ep(!1), Xa = !1;
  function Ec(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function jc(e, t) {
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
  function Pa(e, t, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (We & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Fs(e), Bm(e, null, r), t;
    }
    return Is(e, l, t, r), Fs(e);
  }
  function Sl(e, t, r) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, nn(e, r);
    }
  }
  function Nc(e, t) {
    var r = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, r === l)) {
      var u = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var y = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? u = f = y : f = f.next = y, r = r.next;
        } while (r !== null);
        f === null ? u = f = t : f = f.next = t;
      } else u = f = t;
      r = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t;
  }
  var Tc = !1;
  function wl() {
    if (Tc) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function El(e, t, r, l) {
    Tc = !1;
    var u = e.updateQueue;
    Xa = !1;
    var f = u.firstBaseUpdate, y = u.lastBaseUpdate, j = u.shared.pending;
    if (j !== null) {
      u.shared.pending = null;
      var k = j, X = k.next;
      k.next = null, y === null ? f = X : y.next = X, y = k;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, j = ae.lastBaseUpdate, j !== y && (j === null ? ae.firstBaseUpdate = X : j.next = X, ae.lastBaseUpdate = k));
    }
    if (f !== null) {
      var le = u.baseState;
      y = 0, ae = X = k = null, j = f;
      do {
        var K = j.lane & -536870913, W = K !== j.lane;
        if (W ? (Ge & K) === K : (l & K) === K) {
          K !== 0 && K === vi && (Tc = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, De = j;
            K = t;
            var ot = r;
            switch (De.tag) {
              case 1:
                if (xe = De.payload, typeof xe == "function") {
                  le = xe.call(ot, le, K);
                  break e;
                }
                le = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = De.payload, K = typeof xe == "function" ? xe.call(ot, le, K) : xe, K == null) break e;
                le = g({}, le, K);
                break e;
              case 2:
                Xa = !0;
            }
          }
          K = j.callback, K !== null && (e.flags |= 64, W && (e.flags |= 8192), W = u.callbacks, W === null ? u.callbacks = [K] : W.push(K));
        } else
          W = {
            lane: K,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          }, ae === null ? (X = ae = W, k = le) : ae = ae.next = W, y |= K;
        if (j = j.next, j === null) {
          if (j = u.shared.pending, j === null)
            break;
          W = j, j = W.next, W.next = null, u.lastBaseUpdate = W, u.shared.pending = null;
        }
      } while (!0);
      ae === null && (k = le), u.baseState = k, u.firstBaseUpdate = X, u.lastBaseUpdate = ae, f === null && (u.shared.lanes = 0), er |= y, e.lanes = y, e.memoizedState = le;
    }
  }
  function np(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function ap(e, t) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        np(r[e], t);
  }
  var Si = A(null), eo = A(0);
  function rp(e, t) {
    e = Da, ee(eo, e), ee(Si, t), Da = e | t.baseLanes;
  }
  function Cc() {
    ee(eo, Da), ee(Si, Si.current);
  }
  function Rc() {
    Da = eo.current, Q(Si), Q(eo);
  }
  var jn = A(null), Hn = null;
  function Qa(e) {
    var t = e.alternate;
    ee(Nt, Nt.current & 1), ee(jn, e), Hn === null && (t === null || Si.current !== null || t.memoizedState !== null) && (Hn = e);
  }
  function Mc(e) {
    ee(Nt, Nt.current), ee(jn, e), Hn === null && (Hn = e);
  }
  function ip(e) {
    e.tag === 22 ? (ee(Nt, Nt.current), ee(jn, e), Hn === null && (Hn = e)) : Za();
  }
  function Za() {
    ee(Nt, Nt.current), ee(jn, jn.current);
  }
  function Nn(e) {
    Q(jn), Hn === e && (Hn = null), Q(Nt);
  }
  var Nt = A(0);
  function to(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || kd(r) || Ld(r)))
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
  var ja = 0, Ue = null, lt = null, Dt = null, no = !1, wi = !1, $r = !1, ao = 0, jl = 0, Ei = null, ow = 0;
  function St() {
    throw Error(s(321));
  }
  function Ac(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!wn(e[r], t[r])) return !1;
    return !0;
  }
  function _c(e, t, r, l, u, f) {
    return ja = f, Ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? qp : Gc, $r = !1, f = r(l, u), $r = !1, wi && (f = sp(
      t,
      r,
      l,
      u
    )), lp(e), f;
  }
  function lp(e) {
    O.H = Cl;
    var t = lt !== null && lt.next !== null;
    if (ja = 0, Dt = lt = Ue = null, no = !1, jl = 0, Ei = null, t) throw Error(s(300));
    e === null || zt || (e = e.dependencies, e !== null && Xs(e) && (zt = !0));
  }
  function sp(e, t, r, l) {
    Ue = e;
    var u = 0;
    do {
      if (wi && (Ei = null), jl = 0, wi = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Dt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = Ip, f = t(r, l);
    } while (wi);
    return f;
  }
  function uw() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Nl(t) : t, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), t;
  }
  function Dc() {
    var e = ao !== 0;
    return ao = 0, e;
  }
  function zc(e, t, r) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r;
  }
  function Oc(e) {
    if (no) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      no = !1;
    }
    ja = 0, Dt = lt = Ue = null, wi = !1, jl = ao = 0, Ei = null;
  }
  function un() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Dt === null ? Ue.memoizedState = Dt = e : Dt = Dt.next = e, Dt;
  }
  function Tt() {
    if (lt === null) {
      var e = Ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = lt.next;
    var t = Dt === null ? Ue.memoizedState : Dt.next;
    if (t !== null)
      Dt = t, lt = e;
    else {
      if (e === null)
        throw Ue.alternate === null ? Error(s(467)) : Error(s(310));
      lt = e, e = {
        memoizedState: lt.memoizedState,
        baseState: lt.baseState,
        baseQueue: lt.baseQueue,
        queue: lt.queue,
        next: null
      }, Dt === null ? Ue.memoizedState = Dt = e : Dt = Dt.next = e;
    }
    return Dt;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nl(e) {
    var t = jl;
    return jl += 1, Ei === null && (Ei = []), e = Zm(Ei, e, t), t = Ue, (Dt === null ? t.memoizedState : Dt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? qp : Gc), e;
  }
  function io(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Nl(e);
      if (e.$$typeof === M) return Wt(e);
    }
    throw Error(s(438, String(e)));
  }
  function kc(e) {
    var t = null, r = Ue.updateQueue;
    if (r !== null && (t = r.memoCache), t == null) {
      var l = Ue.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
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
    var t = Tt();
    return Lc(t, lt, e);
  }
  function Lc(e, t, r) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = r;
    var u = e.baseQueue, f = l.pending;
    if (f !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = f.next, f.next = y;
      }
      t.baseQueue = u = f, l.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      t = u.next;
      var j = y = null, k = null, X = t, ae = !1;
      do {
        var le = X.lane & -536870913;
        if (le !== X.lane ? (Ge & le) === le : (ja & le) === le) {
          var K = X.revertLane;
          if (K === 0)
            k !== null && (k = k.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }), le === vi && (ae = !0);
          else if ((ja & K) === K) {
            X = X.next, K === vi && (ae = !0);
            continue;
          } else
            le = {
              lane: 0,
              revertLane: X.revertLane,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }, k === null ? (j = k = le, y = f) : k = k.next = le, Ue.lanes |= K, er |= K;
          le = X.action, $r && r(f, le), f = X.hasEagerState ? X.eagerState : r(f, le);
        } else
          K = {
            lane: le,
            revertLane: X.revertLane,
            gesture: X.gesture,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          }, k === null ? (j = k = K, y = f) : k = k.next = K, Ue.lanes |= le, er |= le;
        X = X.next;
      } while (X !== null && X !== t);
      if (k === null ? y = f : k.next = j, !wn(f, e.memoizedState) && (zt = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = y, e.baseQueue = k, l.lastRenderedState = f;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Uc(e) {
    var t = Tt(), r = t.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, u = r.pending, f = t.memoizedState;
    if (u !== null) {
      r.pending = null;
      var y = u = u.next;
      do
        f = e(f, y.action), y = y.next;
      while (y !== u);
      wn(f, t.memoizedState) || (zt = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), r.lastRenderedState = f;
    }
    return [f, l];
  }
  function op(e, t, r) {
    var l = Ue, u = Tt(), f = Ke;
    if (f) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = t();
    var y = !wn(
      (lt || u).memoizedState,
      r
    );
    if (y && (u.memoizedState = r, zt = !0), u = u.queue, $c(dp.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || Dt !== null && Dt.memoizedState.tag & 1) {
      if (l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        cp.bind(
          null,
          l,
          u,
          r,
          t
        ),
        null
      ), dt === null) throw Error(s(349));
      f || (ja & 127) !== 0 || up(l, t, r);
    }
    return r;
  }
  function up(e, t, r) {
    e.flags |= 16384, e = { getSnapshot: t, value: r }, t = Ue.updateQueue, t === null ? (t = ro(), Ue.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e));
  }
  function cp(e, t, r, l) {
    t.value = r, t.getSnapshot = l, fp(t) && hp(e);
  }
  function dp(e, t, r) {
    return r(function() {
      fp(t) && hp(e);
    });
  }
  function fp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !wn(e, r);
    } catch {
      return !0;
    }
  }
  function hp(e) {
    var t = _r(e, 2);
    t !== null && gn(t, e, 2);
  }
  function Bc(e) {
    var t = un();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), $r) {
        Et(!0);
        try {
          r();
        } finally {
          Et(!1);
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
  function mp(e, t, r, l) {
    return e.baseState = r, Lc(
      e,
      lt,
      typeof l == "function" ? l : Na
    );
  }
  function cw(e, t, r, l, u) {
    if (uo(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var f = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          f.listeners.push(y);
        }
      };
      O.T !== null ? r(!0) : f.isTransition = !1, l(f), r = t.pending, r === null ? (f.next = t.pending = f, pp(t, f)) : (f.next = r.next, t.pending = r.next = f);
    }
  }
  function pp(e, t) {
    var r = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var f = O.T, y = {};
      O.T = y;
      try {
        var j = r(u, l), k = O.S;
        k !== null && k(y, j), gp(e, t, j);
      } catch (X) {
        Vc(e, t, X);
      } finally {
        f !== null && y.types !== null && (f.types = y.types), O.T = f;
      }
    } else
      try {
        f = r(u, l), gp(e, t, f);
      } catch (X) {
        Vc(e, t, X);
      }
  }
  function gp(e, t, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        vp(e, t, l);
      },
      function(l) {
        return Vc(e, t, l);
      }
    ) : vp(e, t, r);
  }
  function vp(e, t, r) {
    t.status = "fulfilled", t.value = r, yp(t), e.state = r, t = e.pending, t !== null && (r = t.next, r === t ? e.pending = null : (r = r.next, t.next = r, pp(e, r)));
  }
  function Vc(e, t, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = r, yp(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function yp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function bp(e, t) {
    return t;
  }
  function xp(e, t) {
    if (Ke) {
      var r = dt.formState;
      if (r !== null) {
        e: {
          var l = Ue;
          if (Ke) {
            if (gt) {
              t: {
                for (var u = gt, f = $n; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = qn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                gt = qn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Ya(l);
          }
          l = !1;
        }
        l && (t = r[0]);
      }
    }
    return r = un(), r.memoizedState = r.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bp,
      lastRenderedState: t
    }, r.queue = l, r = Vp.bind(
      null,
      Ue,
      l
    ), l.dispatch = r, l = Bc(!1), f = Yc.bind(
      null,
      Ue,
      !1,
      l.queue
    ), l = un(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, r = cw.bind(
      null,
      Ue,
      u,
      f,
      r
    ), u.dispatch = r, l.memoizedState = e, [t, r, !1];
  }
  function Sp(e) {
    var t = Tt();
    return wp(t, lt, e);
  }
  function wp(e, t, r) {
    if (t = Lc(
      e,
      t,
      bp
    )[0], e = lo(Na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Nl(t);
      } catch (y) {
        throw y === bi ? Qs : y;
      }
    else l = t;
    t = Tt();
    var u = t.queue, f = u.dispatch;
    return r !== t.memoizedState && (Ue.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      dw.bind(null, u, r),
      null
    )), [l, f, e];
  }
  function dw(e, t) {
    e.action = t;
  }
  function Ep(e) {
    var t = Tt(), r = lt;
    if (r !== null)
      return wp(t, r, e);
    Tt(), t = t.memoizedState, r = Tt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [t, l, !1];
  }
  function ji(e, t, r, l) {
    return e = { tag: e, create: r, deps: l, inst: t, next: null }, t = Ue.updateQueue, t === null && (t = ro(), Ue.updateQueue = t), r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, t.lastEffect = e), e;
  }
  function jp() {
    return Tt().memoizedState;
  }
  function so(e, t, r, l) {
    var u = un();
    Ue.flags |= e, u.memoizedState = ji(
      1 | t,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function oo(e, t, r, l) {
    var u = Tt();
    l = l === void 0 ? null : l;
    var f = u.memoizedState.inst;
    lt !== null && l !== null && Ac(l, lt.memoizedState.deps) ? u.memoizedState = ji(t, f, r, l) : (Ue.flags |= e, u.memoizedState = ji(
      1 | t,
      f,
      r,
      l
    ));
  }
  function Np(e, t) {
    so(8390656, 8, e, t);
  }
  function $c(e, t) {
    oo(2048, 8, e, t);
  }
  function fw(e) {
    Ue.flags |= 4;
    var t = Ue.updateQueue;
    if (t === null)
      t = ro(), Ue.updateQueue = t, t.events = [e];
    else {
      var r = t.events;
      r === null ? t.events = [e] : r.push(e);
    }
  }
  function Tp(e) {
    var t = Tt().memoizedState;
    return fw({ ref: t, nextImpl: e }), function() {
      if ((We & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Cp(e, t) {
    return oo(4, 2, e, t);
  }
  function Rp(e, t) {
    return oo(4, 4, e, t);
  }
  function Mp(e, t) {
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
  function Ap(e, t, r) {
    r = r != null ? r.concat([e]) : null, oo(4, 4, Mp.bind(null, t, e), r);
  }
  function Hc() {
  }
  function _p(e, t) {
    var r = Tt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    return t !== null && Ac(t, l[1]) ? l[0] : (r.memoizedState = [e, t], e);
  }
  function Dp(e, t) {
    var r = Tt();
    t = t === void 0 ? null : t;
    var l = r.memoizedState;
    if (t !== null && Ac(t, l[1]))
      return l[0];
    if (l = e(), $r) {
      Et(!0);
      try {
        e();
      } finally {
        Et(!1);
      }
    }
    return r.memoizedState = [l, t], l;
  }
  function qc(e, t, r) {
    return r === void 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = r, e = zg(), Ue.lanes |= e, er |= e, r);
  }
  function zp(e, t, r, l) {
    return wn(r, t) ? r : Si.current !== null ? (e = qc(e, r, l), wn(e, t) || (zt = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? (zt = !0, e.memoizedState = r) : (e = zg(), Ue.lanes |= e, er |= e, t);
  }
  function Op(e, t, r, l, u) {
    var f = C.p;
    C.p = f !== 0 && 8 > f ? f : 8;
    var y = O.T, j = {};
    O.T = j, Yc(e, !1, t, r);
    try {
      var k = u(), X = O.S;
      if (X !== null && X(j, k), k !== null && typeof k == "object" && typeof k.then == "function") {
        var ae = sw(
          k,
          l
        );
        Tl(
          e,
          t,
          ae,
          Rn(e)
        );
      } else
        Tl(
          e,
          t,
          l,
          Rn(e)
        );
    } catch (le) {
      Tl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: le },
        Rn()
      );
    } finally {
      C.p = f, y !== null && j.types !== null && (y.types = j.types), O.T = y;
    }
  }
  function hw() {
  }
  function Ic(e, t, r, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = kp(e).queue;
    Op(
      e,
      u,
      t,
      B,
      r === null ? hw : function() {
        return Lp(e), r(l);
      }
    );
  }
  function kp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Na,
        lastRenderedState: B
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
  function Lp(e) {
    var t = kp(e);
    t.next === null && (t = e.alternate.memoizedState), Tl(
      e,
      t.next.queue,
      {},
      Rn()
    );
  }
  function Fc() {
    return Wt(Il);
  }
  function Up() {
    return Tt().memoizedState;
  }
  function Bp() {
    return Tt().memoizedState;
  }
  function mw(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var r = Rn();
          e = Ka(r);
          var l = Pa(t, e, r);
          l !== null && (gn(l, t, r), Sl(l, t, r)), t = { cache: bc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function pw(e, t, r) {
    var l = Rn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, uo(e) ? $p(t, r) : (r = oc(e, t, r, l), r !== null && (gn(r, e, l), Hp(r, t, l)));
  }
  function Vp(e, t, r) {
    var l = Rn();
    Tl(e, t, r, l);
  }
  function Tl(e, t, r, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (uo(e)) $p(t, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var y = t.lastRenderedState, j = f(y, r);
          if (u.hasEagerState = !0, u.eagerState = j, wn(j, y))
            return Is(e, t, u, 0), dt === null && qs(), !1;
        } catch {
        } finally {
        }
      if (r = oc(e, t, u, l), r !== null)
        return gn(r, e, l), Hp(r, t, l), !0;
    }
    return !1;
  }
  function Yc(e, t, r, l) {
    if (l = {
      lane: 2,
      revertLane: Ed(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, uo(e)) {
      if (t) throw Error(s(479));
    } else
      t = oc(
        e,
        r,
        l,
        2
      ), t !== null && gn(t, e, 2);
  }
  function uo(e) {
    var t = e.alternate;
    return e === Ue || t !== null && t === Ue;
  }
  function $p(e, t) {
    wi = no = !0;
    var r = e.pending;
    r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t;
  }
  function Hp(e, t, r) {
    if ((r & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, r |= l, t.lanes = r, nn(e, r);
    }
  }
  var Cl = {
    readContext: Wt,
    use: io,
    useCallback: St,
    useContext: St,
    useEffect: St,
    useImperativeHandle: St,
    useLayoutEffect: St,
    useInsertionEffect: St,
    useMemo: St,
    useReducer: St,
    useRef: St,
    useState: St,
    useDebugValue: St,
    useDeferredValue: St,
    useTransition: St,
    useSyncExternalStore: St,
    useId: St,
    useHostTransitionStatus: St,
    useFormState: St,
    useActionState: St,
    useOptimistic: St,
    useMemoCache: St,
    useCacheRefresh: St
  };
  Cl.useEffectEvent = St;
  var qp = {
    readContext: Wt,
    use: io,
    useCallback: function(e, t) {
      return un().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Wt,
    useEffect: Np,
    useImperativeHandle: function(e, t, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        Mp.bind(null, t, e),
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
      var r = un();
      t = t === void 0 ? null : t;
      var l = e();
      if ($r) {
        Et(!0);
        try {
          e();
        } finally {
          Et(!1);
        }
      }
      return r.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, r) {
      var l = un();
      if (r !== void 0) {
        var u = r(t);
        if ($r) {
          Et(!0);
          try {
            r(t);
          } finally {
            Et(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = pw.bind(
        null,
        Ue,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = un();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Bc(e);
      var t = e.queue, r = Vp.bind(null, Ue, t);
      return t.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var r = un();
      return qc(r, e, t);
    },
    useTransition: function() {
      var e = Bc(!1);
      return e = Op.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), un().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, r) {
      var l = Ue, u = un();
      if (Ke) {
        if (r === void 0)
          throw Error(s(407));
        r = r();
      } else {
        if (r = t(), dt === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || up(l, t, r);
      }
      u.memoizedState = r;
      var f = { value: r, getSnapshot: t };
      return u.queue = f, Np(dp.bind(null, l, f, e), [
        e
      ]), l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        cp.bind(
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
      var e = un(), t = dt.identifierPrefix;
      if (Ke) {
        var r = ca, l = ua;
        r = (l & ~(1 << 32 - qt(l) - 1)).toString(32) + r, t = "_" + t + "R_" + r, r = ao++, 0 < r && (t += "H" + r.toString(32)), t += "_";
      } else
        r = ow++, t = "_" + t + "r_" + r.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Fc,
    useFormState: xp,
    useActionState: xp,
    useOptimistic: function(e) {
      var t = un();
      t.memoizedState = t.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = r, t = Yc.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = t, [e, t];
    },
    useMemoCache: kc,
    useCacheRefresh: function() {
      return un().memoizedState = mw.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var t = un(), r = { impl: e };
      return t.memoizedState = r, function() {
        if ((We & 2) !== 0)
          throw Error(s(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Gc = {
    readContext: Wt,
    use: io,
    useCallback: _p,
    useContext: Wt,
    useEffect: $c,
    useImperativeHandle: Ap,
    useInsertionEffect: Cp,
    useLayoutEffect: Rp,
    useMemo: Dp,
    useReducer: lo,
    useRef: jp,
    useState: function() {
      return lo(Na);
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var r = Tt();
      return zp(
        r,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = lo(Na)[0], t = Tt().memoizedState;
      return [
        typeof e == "boolean" ? e : Nl(e),
        t
      ];
    },
    useSyncExternalStore: op,
    useId: Up,
    useHostTransitionStatus: Fc,
    useFormState: Sp,
    useActionState: Sp,
    useOptimistic: function(e, t) {
      var r = Tt();
      return mp(r, lt, e, t);
    },
    useMemoCache: kc,
    useCacheRefresh: Bp
  };
  Gc.useEffectEvent = Tp;
  var Ip = {
    readContext: Wt,
    use: io,
    useCallback: _p,
    useContext: Wt,
    useEffect: $c,
    useImperativeHandle: Ap,
    useInsertionEffect: Cp,
    useLayoutEffect: Rp,
    useMemo: Dp,
    useReducer: Uc,
    useRef: jp,
    useState: function() {
      return Uc(Na);
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var r = Tt();
      return lt === null ? qc(r, e, t) : zp(
        r,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Uc(Na)[0], t = Tt().memoizedState;
      return [
        typeof e == "boolean" ? e : Nl(e),
        t
      ];
    },
    useSyncExternalStore: op,
    useId: Up,
    useHostTransitionStatus: Fc,
    useFormState: Ep,
    useActionState: Ep,
    useOptimistic: function(e, t) {
      var r = Tt();
      return lt !== null ? mp(r, lt, e, t) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: kc,
    useCacheRefresh: Bp
  };
  Ip.useEffectEvent = Tp;
  function Xc(e, t, r, l) {
    t = e.memoizedState, r = r(l, t), r = r == null ? t : g({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Kc = {
    enqueueSetState: function(e, t, r) {
      e = e._reactInternals;
      var l = Rn(), u = Ka(l);
      u.payload = t, r != null && (u.callback = r), t = Pa(e, u, l), t !== null && (gn(t, e, l), Sl(t, e, l));
    },
    enqueueReplaceState: function(e, t, r) {
      e = e._reactInternals;
      var l = Rn(), u = Ka(l);
      u.tag = 1, u.payload = t, r != null && (u.callback = r), t = Pa(e, u, l), t !== null && (gn(t, e, l), Sl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var r = Rn(), l = Ka(r);
      l.tag = 2, t != null && (l.callback = t), t = Pa(e, l, r), t !== null && (gn(t, e, r), Sl(t, e, r));
    }
  };
  function Fp(e, t, r, l, u, f, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, f, y) : t.prototype && t.prototype.isPureReactComponent ? !hl(r, l) || !hl(u, f) : !0;
  }
  function Yp(e, t, r, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, l), t.state !== e && Kc.enqueueReplaceState(t, t.state, null);
  }
  function Hr(e, t) {
    var r = t;
    if ("ref" in t) {
      r = {};
      for (var l in t)
        l !== "ref" && (r[l] = t[l]);
    }
    if (e = e.defaultProps) {
      r === t && (r = g({}, r));
      for (var u in e)
        r[u] === void 0 && (r[u] = e[u]);
    }
    return r;
  }
  function Gp(e) {
    Hs(e);
  }
  function Xp(e) {
    console.error(e);
  }
  function Kp(e) {
    Hs(e);
  }
  function co(e, t) {
    try {
      var r = e.onUncaughtError;
      r(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Pp(e, t, r) {
    try {
      var l = e.onCaughtError;
      l(r.value, {
        componentStack: r.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Pc(e, t, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      co(e, t);
    }, r;
  }
  function Qp(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function Zp(e, t, r, l) {
    var u = r.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = l.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        Pp(t, r, l);
      };
    }
    var y = r.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      Pp(t, r, l), typeof u != "function" && (tr === null ? tr = /* @__PURE__ */ new Set([this]) : tr.add(this));
      var j = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: j !== null ? j : ""
      });
    });
  }
  function gw(e, t, r, l, u) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = r.alternate, t !== null && gi(
        t,
        r,
        u,
        !0
      ), r = jn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Hn === null ? Eo() : r.alternate === null && wt === 0 && (wt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = u, l === Zs ? r.flags |= 16384 : (t = r.updateQueue, t === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), xd(e, l, u)), !1;
          case 22:
            return r.flags |= 65536, l === Zs ? r.flags |= 16384 : (t = r.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = t) : (r = t.retryQueue, r === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), xd(e, l, u)), !1;
        }
        throw Error(s(435, r.tag));
      }
      return xd(e, l, u), Eo(), !1;
    }
    if (Ke)
      return t = jn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== mc && (e = Error(s(422), { cause: l }), gl(Un(e, r)))) : (l !== mc && (t = Error(s(423), {
        cause: l
      }), gl(
        Un(t, r)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = Un(l, r), u = Pc(
        e.stateNode,
        l,
        u
      ), Nc(e, u), wt !== 4 && (wt = 2)), !1;
    var f = Error(s(520), { cause: l });
    if (f = Un(f, r), kl === null ? kl = [f] : kl.push(f), wt !== 4 && (wt = 2), t === null) return !0;
    l = Un(l, r), r = t;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = u & -u, r.lanes |= e, e = Pc(r.stateNode, l, e), Nc(r, e), !1;
        case 1:
          if (t = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (tr === null || !tr.has(f))))
            return r.flags |= 65536, u &= -u, r.lanes |= u, u = Qp(u), Zp(
              u,
              e,
              r,
              l
            ), Nc(r, u), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Qc = Error(s(461)), zt = !1;
  function en(e, t, r, l) {
    t.child = e === null ? tp(t, null, r, l) : Vr(
      t,
      e.child,
      r,
      l
    );
  }
  function Jp(e, t, r, l, u) {
    r = r.render;
    var f = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var j in l)
        j !== "ref" && (y[j] = l[j]);
    } else y = l;
    return kr(t), l = _c(
      e,
      t,
      r,
      y,
      f,
      u
    ), j = Dc(), e !== null && !zt ? (zc(e, t, u), Ta(e, t, u)) : (Ke && j && fc(t), t.flags |= 1, en(e, t, l, u), t.child);
  }
  function Wp(e, t, r, l, u) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !uc(f) && f.defaultProps === void 0 && r.compare === null ? (t.tag = 15, t.type = f, eg(
        e,
        t,
        f,
        l,
        u
      )) : (e = Ys(
        r.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !rd(e, u)) {
      var y = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : hl, r(y, l) && e.ref === t.ref)
        return Ta(e, t, u);
    }
    return t.flags |= 1, e = xa(f, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function eg(e, t, r, l, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (hl(f, l) && e.ref === t.ref)
        if (zt = !1, t.pendingProps = l = f, rd(e, u))
          (e.flags & 131072) !== 0 && (zt = !0);
        else
          return t.lanes = e.lanes, Ta(e, t, u);
    }
    return Zc(
      e,
      t,
      r,
      l,
      u
    );
  }
  function tg(e, t, r, l) {
    var u = l.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~f;
        } else l = 0, t.child = null;
        return ng(
          e,
          t,
          f,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ps(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? rp(t, f) : Cc(), ip(t);
      else
        return l = t.lanes = 536870912, ng(
          e,
          t,
          f !== null ? f.baseLanes | r : r,
          r,
          l
        );
    } else
      f !== null ? (Ps(t, f.cachePool), rp(t, f), Za(), t.memoizedState = null) : (e !== null && Ps(t, null), Cc(), Za());
    return en(e, t, u, r), t.child;
  }
  function Rl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function ng(e, t, r, l, u) {
    var f = Sc();
    return f = f === null ? null : { parent: _t._currentValue, pool: f }, t.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Ps(t, null), Cc(), ip(t), e !== null && gi(e, t, l, !0), t.childLanes = u, null;
  }
  function fo(e, t) {
    return t = mo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ag(e, t, r) {
    return Vr(t, e.child, null, r), e = fo(t, t.pendingProps), e.flags |= 2, Nn(t), t.memoizedState = null, e;
  }
  function vw(e, t, r) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ke) {
        if (l.mode === "hidden")
          return e = fo(t, l), t.lanes = 536870912, Rl(null, e);
        if (Mc(t), (e = gt) ? (e = pv(
          e,
          $n
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ia !== null ? { id: ua, overflow: ca } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = $m(e), r.return = t, t.child = r, Jt = t, gt = null)) : e = null, e === null) throw Ya(t);
        return t.lanes = 536870912, null;
      }
      return fo(t, l);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var y = f.dehydrated;
      if (Mc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = ag(
            e,
            t,
            r
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (zt || gi(e, t, r, !1), u = (r & e.childLanes) !== 0, zt || u) {
        if (l = dt, l !== null && (y = z(l, r), y !== 0 && y !== f.retryLane))
          throw f.retryLane = y, _r(e, y), gn(l, e, y), Qc;
        Eo(), t = ag(
          e,
          t,
          r
        );
      } else
        e = f.treeContext, gt = qn(y.nextSibling), Jt = t, Ke = !0, Fa = null, $n = !1, e !== null && Im(t, e), t = fo(t, l), t.flags |= 4096;
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
  function Zc(e, t, r, l, u) {
    return kr(t), r = _c(
      e,
      t,
      r,
      l,
      void 0,
      u
    ), l = Dc(), e !== null && !zt ? (zc(e, t, u), Ta(e, t, u)) : (Ke && l && fc(t), t.flags |= 1, en(e, t, r, u), t.child);
  }
  function rg(e, t, r, l, u, f) {
    return kr(t), t.updateQueue = null, r = sp(
      t,
      l,
      r,
      u
    ), lp(e), l = Dc(), e !== null && !zt ? (zc(e, t, f), Ta(e, t, f)) : (Ke && l && fc(t), t.flags |= 1, en(e, t, r, f), t.child);
  }
  function ig(e, t, r, l, u) {
    if (kr(t), t.stateNode === null) {
      var f = fi, y = r.contextType;
      typeof y == "object" && y !== null && (f = Wt(y)), f = new r(l, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Kc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = l, f.state = t.memoizedState, f.refs = {}, Ec(t), y = r.contextType, f.context = typeof y == "object" && y !== null ? Wt(y) : fi, f.state = t.memoizedState, y = r.getDerivedStateFromProps, typeof y == "function" && (Xc(
        t,
        r,
        y,
        l
      ), f.state = t.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (y = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), y !== f.state && Kc.enqueueReplaceState(f, f.state, null), El(t, l, f, u), wl(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      f = t.stateNode;
      var j = t.memoizedProps, k = Hr(r, j);
      f.props = k;
      var X = f.context, ae = r.contextType;
      y = fi, typeof ae == "object" && ae !== null && (y = Wt(ae));
      var le = r.getDerivedStateFromProps;
      ae = typeof le == "function" || typeof f.getSnapshotBeforeUpdate == "function", j = t.pendingProps !== j, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (j || X !== y) && Yp(
        t,
        f,
        l,
        y
      ), Xa = !1;
      var K = t.memoizedState;
      f.state = K, El(t, l, f, u), wl(), X = t.memoizedState, j || K !== X || Xa ? (typeof le == "function" && (Xc(
        t,
        r,
        le,
        l
      ), X = t.memoizedState), (k = Xa || Fp(
        t,
        r,
        k,
        l,
        K,
        X,
        y
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = X), f.props = l, f.state = X, f.context = y, l = k) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      f = t.stateNode, jc(e, t), y = t.memoizedProps, ae = Hr(r, y), f.props = ae, le = t.pendingProps, K = f.context, X = r.contextType, k = fi, typeof X == "object" && X !== null && (k = Wt(X)), j = r.getDerivedStateFromProps, (X = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== le || K !== k) && Yp(
        t,
        f,
        l,
        k
      ), Xa = !1, K = t.memoizedState, f.state = K, El(t, l, f, u), wl();
      var W = t.memoizedState;
      y !== le || K !== W || Xa || e !== null && e.dependencies !== null && Xs(e.dependencies) ? (typeof j == "function" && (Xc(
        t,
        r,
        j,
        l
      ), W = t.memoizedState), (ae = Xa || Fp(
        t,
        r,
        ae,
        l,
        K,
        W,
        k
      ) || e !== null && e.dependencies !== null && Xs(e.dependencies)) ? (X || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(l, W, k), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        l,
        W,
        k
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && K === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && K === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = W), f.props = l, f.state = W, f.context = k, l = ae) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && K === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && K === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return f = l, ho(e, t), l = (t.flags & 128) !== 0, f || l ? (f = t.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && l ? (t.child = Vr(
      t,
      e.child,
      null,
      u
    ), t.child = Vr(
      t,
      null,
      r,
      u
    )) : en(e, t, r, u), t.memoizedState = f.state, e = t.child) : e = Ta(
      e,
      t,
      u
    ), e;
  }
  function lg(e, t, r, l) {
    return zr(), t.flags |= 256, en(e, t, r, l), t.child;
  }
  var Jc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Wc(e) {
    return { baseLanes: e, cachePool: Pm() };
  }
  function ed(e, t, r) {
    return e = e !== null ? e.childLanes & ~r : 0, t && (e |= Cn), e;
  }
  function sg(e, t, r) {
    var l = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (Nt.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Qa(t) : Za(), (e = gt) ? (e = pv(
          e,
          $n
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ia !== null ? { id: ua, overflow: ca } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = $m(e), r.return = t, t.child = r, Jt = t, gt = null)) : e = null, e === null) throw Ya(t);
        return Ld(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var j = l.children;
      return l = l.fallback, u ? (Za(), u = t.mode, j = mo(
        { mode: "hidden", children: j },
        u
      ), l = Dr(
        l,
        u,
        r,
        null
      ), j.return = t, l.return = t, j.sibling = l, t.child = j, l = t.child, l.memoizedState = Wc(r), l.childLanes = ed(
        e,
        y,
        r
      ), t.memoizedState = Jc, Rl(null, l)) : (Qa(t), td(t, j));
    }
    var k = e.memoizedState;
    if (k !== null && (j = k.dehydrated, j !== null)) {
      if (f)
        t.flags & 256 ? (Qa(t), t.flags &= -257, t = nd(
          e,
          t,
          r
        )) : t.memoizedState !== null ? (Za(), t.child = e.child, t.flags |= 128, t = null) : (Za(), j = l.fallback, u = t.mode, l = mo(
          { mode: "visible", children: l.children },
          u
        ), j = Dr(
          j,
          u,
          r,
          null
        ), j.flags |= 2, l.return = t, j.return = t, l.sibling = j, t.child = l, Vr(
          t,
          e.child,
          null,
          r
        ), l = t.child, l.memoizedState = Wc(r), l.childLanes = ed(
          e,
          y,
          r
        ), t.memoizedState = Jc, t = Rl(null, l));
      else if (Qa(t), Ld(j)) {
        if (y = j.nextSibling && j.nextSibling.dataset, y) var X = y.dgst;
        y = X, l = Error(s(419)), l.stack = "", l.digest = y, gl({ value: l, source: null, stack: null }), t = nd(
          e,
          t,
          r
        );
      } else if (zt || gi(e, t, r, !1), y = (r & e.childLanes) !== 0, zt || y) {
        if (y = dt, y !== null && (l = z(y, r), l !== 0 && l !== k.retryLane))
          throw k.retryLane = l, _r(e, l), gn(y, e, l), Qc;
        kd(j) || Eo(), t = nd(
          e,
          t,
          r
        );
      } else
        kd(j) ? (t.flags |= 192, t.child = e.child, t = null) : (e = k.treeContext, gt = qn(
          j.nextSibling
        ), Jt = t, Ke = !0, Fa = null, $n = !1, e !== null && Im(t, e), t = td(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Za(), j = l.fallback, u = t.mode, k = e.child, X = k.sibling, l = xa(k, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = k.subtreeFlags & 65011712, X !== null ? j = xa(
      X,
      j
    ) : (j = Dr(
      j,
      u,
      r,
      null
    ), j.flags |= 2), j.return = t, l.return = t, l.sibling = j, t.child = l, Rl(null, l), l = t.child, j = e.child.memoizedState, j === null ? j = Wc(r) : (u = j.cachePool, u !== null ? (k = _t._currentValue, u = u.parent !== k ? { parent: k, pool: k } : u) : u = Pm(), j = {
      baseLanes: j.baseLanes | r,
      cachePool: u
    }), l.memoizedState = j, l.childLanes = ed(
      e,
      y,
      r
    ), t.memoizedState = Jc, Rl(e.child, l)) : (Qa(t), r = e.child, e = r.sibling, r = xa(r, {
      mode: "visible",
      children: l.children
    }), r.return = t, r.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = r, t.memoizedState = null, r);
  }
  function td(e, t) {
    return t = mo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function mo(e, t) {
    return e = En(22, e, null, t), e.lanes = 0, e;
  }
  function nd(e, t, r) {
    return Vr(t, e.child, null, r), e = td(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function og(e, t, r) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), vc(e.return, t, r);
  }
  function ad(e, t, r, l, u, f) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: r,
      tailMode: u,
      treeForkCount: f
    } : (y.isBackwards = t, y.rendering = null, y.renderingStartTime = 0, y.last = l, y.tail = r, y.tailMode = u, y.treeForkCount = f);
  }
  function ug(e, t, r) {
    var l = t.pendingProps, u = l.revealOrder, f = l.tail;
    l = l.children;
    var y = Nt.current, j = (y & 2) !== 0;
    if (j ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, ee(Nt, y), en(e, t, l, r), l = Ke ? pl : 0, !j && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && og(e, r, t);
        else if (e.tag === 19)
          og(e, r, t);
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
    switch (u) {
      case "forwards":
        for (r = t.child, u = null; r !== null; )
          e = r.alternate, e !== null && to(e) === null && (u = r), r = r.sibling;
        r = u, r === null ? (u = t.child, t.child = null) : (u = r.sibling, r.sibling = null), ad(
          t,
          !1,
          u,
          r,
          f,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && to(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = r, r = u, u = e;
        }
        ad(
          t,
          !0,
          r,
          null,
          f,
          l
        );
        break;
      case "together":
        ad(
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
    if (e !== null && (t.dependencies = e.dependencies), er |= t.lanes, (r & t.childLanes) === 0)
      if (e !== null) {
        if (gi(
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
  function rd(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Xs(e)));
  }
  function yw(e, t, r) {
    switch (t.tag) {
      case 3:
        _e(t, t.stateNode.containerInfo), Ga(t, _t, e.memoizedState.cache), zr();
        break;
      case 27:
      case 5:
        Ut(t);
        break;
      case 4:
        _e(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ga(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Mc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Qa(t), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? sg(e, t, r) : (Qa(t), e = Ta(
            e,
            t,
            r
          ), e !== null ? e.sibling : null);
        Qa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (r & t.childLanes) !== 0, l || (gi(
          e,
          t,
          r,
          !1
        ), l = (r & t.childLanes) !== 0), u) {
          if (l)
            return ug(
              e,
              t,
              r
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ee(Nt, Nt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, tg(
          e,
          t,
          r,
          t.pendingProps
        );
      case 24:
        Ga(t, _t, e.memoizedState.cache);
    }
    return Ta(e, t, r);
  }
  function cg(e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        zt = !0;
      else {
        if (!rd(e, r) && (t.flags & 128) === 0)
          return zt = !1, yw(
            e,
            t,
            r
          );
        zt = (e.flags & 131072) !== 0;
      }
    else
      zt = !1, Ke && (t.flags & 1048576) !== 0 && qm(t, pl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Ur(t.elementType), t.type = e, typeof e == "function")
            uc(e) ? (l = Hr(e, l), t.tag = 1, t = ig(
              null,
              t,
              e,
              l,
              r
            )) : (t.tag = 0, t = Zc(
              null,
              t,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === _) {
                t.tag = 11, t = Jp(
                  null,
                  t,
                  e,
                  l,
                  r
                );
                break e;
              } else if (u === ne) {
                t.tag = 14, t = Wp(
                  null,
                  t,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw t = se(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Zc(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 1:
        return l = t.type, u = Hr(
          l,
          t.pendingProps
        ), ig(
          e,
          t,
          l,
          u,
          r
        );
      case 3:
        e: {
          if (_e(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var f = t.memoizedState;
          u = f.element, jc(e, t), El(t, l, null, r);
          var y = t.memoizedState;
          if (l = y.cache, Ga(t, _t, l), l !== f.cache && yc(
            t,
            [_t],
            r,
            !0
          ), wl(), l = y.element, f.isDehydrated)
            if (f = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = lg(
                e,
                t,
                l,
                r
              );
              break e;
            } else if (l !== u) {
              u = Un(
                Error(s(424)),
                t
              ), gl(u), t = lg(
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
              for (gt = qn(e.firstChild), Jt = t, Ke = !0, Fa = null, $n = !0, r = tp(
                t,
                null,
                l,
                r
              ), t.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (zr(), l === u) {
              t = Ta(
                e,
                t,
                r
              );
              break e;
            }
            en(e, t, l, r);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ho(e, t), e === null ? (r = Sv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = r : Ke || (r = t.type, e = t.pendingProps, l = Ao(
          ve.current
        ).createElement(r), l[pe] = t, l[ge] = e, tn(l, r, e), ht(l), t.stateNode = l) : t.memoizedState = Sv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ut(t), e === null && Ke && (l = t.stateNode = yv(
          t.type,
          t.pendingProps,
          ve.current
        ), Jt = t, $n = !0, u = gt, ir(t.type) ? (Ud = u, gt = qn(l.firstChild)) : gt = u), en(
          e,
          t,
          t.pendingProps.children,
          r
        ), ho(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ke && ((u = l = gt) && (l = Kw(
          l,
          t.type,
          t.pendingProps,
          $n
        ), l !== null ? (t.stateNode = l, Jt = t, gt = qn(l.firstChild), $n = !1, u = !0) : u = !1), u || Ya(t)), Ut(t), u = t.type, f = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = f.children, Dd(u, f) ? l = null : y !== null && Dd(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = _c(
          e,
          t,
          uw,
          null,
          null,
          r
        ), Il._currentValue = u), ho(e, t), en(e, t, l, r), t.child;
      case 6:
        return e === null && Ke && ((e = r = gt) && (r = Pw(
          r,
          t.pendingProps,
          $n
        ), r !== null ? (t.stateNode = r, Jt = t, gt = null, e = !0) : e = !1), e || Ya(t)), null;
      case 13:
        return sg(e, t, r);
      case 4:
        return _e(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Vr(
          t,
          null,
          l,
          r
        ) : en(e, t, l, r), t.child;
      case 11:
        return Jp(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 7:
        return en(
          e,
          t,
          t.pendingProps,
          r
        ), t.child;
      case 8:
        return en(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 12:
        return en(
          e,
          t,
          t.pendingProps.children,
          r
        ), t.child;
      case 10:
        return l = t.pendingProps, Ga(t, t.type, l.value), en(e, t, l.children, r), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, kr(t), u = Wt(u), l = l(u), t.flags |= 1, en(e, t, l, r), t.child;
      case 14:
        return Wp(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 15:
        return eg(
          e,
          t,
          t.type,
          t.pendingProps,
          r
        );
      case 19:
        return ug(e, t, r);
      case 31:
        return vw(e, t, r);
      case 22:
        return tg(
          e,
          t,
          r,
          t.pendingProps
        );
      case 24:
        return kr(t), l = Wt(_t), e === null ? (u = Sc(), u === null && (u = dt, f = bc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= r), u = f), t.memoizedState = { parent: l, cache: u }, Ec(t), Ga(t, _t, u)) : ((e.lanes & r) !== 0 && (jc(e, t), El(t, null, null, r), wl()), u = e.memoizedState, f = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ga(t, _t, l)) : (l = f.cache, Ga(t, _t, l), l !== u.cache && yc(
          t,
          [_t],
          r,
          !0
        ))), en(
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
  function id(e, t, r, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ug()) e.flags |= 8192;
        else
          throw Br = Zs, wc;
    } else e.flags &= -16777217;
  }
  function dg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Tv(t))
      if (Ug()) e.flags |= 8192;
      else
        throw Br = Zs, wc;
  }
  function po(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? It() : 536870912, e.lanes |= t, Ri |= t);
  }
  function Ml(e, t) {
    if (!Ke)
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
  function vt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        r |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        r |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, t;
  }
  function bw(e, t, r) {
    var l = t.pendingProps;
    switch (hc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return vt(t), null;
      case 1:
        return vt(t), null;
      case 3:
        return r = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Ea(_t), Ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(t) ? Ca(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, pc())), vt(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (Ca(t), f !== null ? (vt(t), dg(t, f)) : (vt(t), id(
          t,
          u,
          null,
          l,
          r
        ))) : f ? f !== e.memoizedState ? (Ca(t), vt(t), dg(t, f)) : (vt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ca(t), vt(t), id(
          t,
          u,
          e,
          l,
          r
        )), null;
      case 27:
        if (Yt(t), r = ve.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return vt(t), null;
          }
          e = ue.current, pi(t) ? Fm(t) : (e = yv(u, l, r), t.stateNode = e, Ca(t));
        }
        return vt(t), null;
      case 5:
        if (Yt(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return vt(t), null;
          }
          if (f = ue.current, pi(t))
            Fm(t);
          else {
            var y = Ao(
              ve.current
            );
            switch (f) {
              case 1:
                f = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                f = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    f = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    f = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    f = y.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof l.is == "string" ? y.createElement("select", {
                      is: l.is
                    }) : y.createElement("select"), l.multiple ? f.multiple = !0 : l.size && (f.size = l.size);
                    break;
                  default:
                    f = typeof l.is == "string" ? y.createElement(u, { is: l.is }) : y.createElement(u);
                }
            }
            f[pe] = t, f[ge] = l;
            e: for (y = t.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                f.appendChild(y.stateNode);
              else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
                y.child.return = y, y = y.child;
                continue;
              }
              if (y === t) break e;
              for (; y.sibling === null; ) {
                if (y.return === null || y.return === t)
                  break e;
                y = y.return;
              }
              y.sibling.return = y.return, y = y.sibling;
            }
            t.stateNode = f;
            e: switch (tn(f, u, l), u) {
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
        return vt(t), id(
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
          if (e = ve.current, pi(t)) {
            if (e = t.stateNode, r = t.memoizedProps, l = null, u = Jt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[pe] = t, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || sv(e.nodeValue, r)), e || Ya(t, !0);
          } else
            e = Ao(e).createTextNode(
              l
            ), e[pe] = t, t.stateNode = e;
        }
        return vt(t), null;
      case 31:
        if (r = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = pi(t), r !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[pe] = t;
            } else
              zr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vt(t), e = !1;
          } else
            r = pc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return t.flags & 256 ? (Nn(t), t) : (Nn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return vt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = pi(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[pe] = t;
            } else
              zr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vt(t), u = !1;
          } else
            u = pc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Nn(t), t) : (Nn(t), null);
        }
        return Nn(t), (t.flags & 128) !== 0 ? (t.lanes = r, t) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), f = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (f = l.memoizedState.cachePool.pool), f !== u && (l.flags |= 2048)), r !== e && r && (t.child.flags |= 8192), po(t, t.updateQueue), vt(t), null);
      case 4:
        return Ve(), e === null && Cd(t.stateNode.containerInfo), vt(t), null;
      case 10:
        return Ea(t.type), vt(t), null;
      case 19:
        if (Q(Nt), l = t.memoizedState, l === null) return vt(t), null;
        if (u = (t.flags & 128) !== 0, f = l.rendering, f === null)
          if (u) Ml(l, !1);
          else {
            if (wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = to(e), f !== null) {
                  for (t.flags |= 128, Ml(l, !1), e = f.updateQueue, t.updateQueue = e, po(t, e), t.subtreeFlags = 0, e = r, r = t.child; r !== null; )
                    Vm(r, e), r = r.sibling;
                  return ee(
                    Nt,
                    Nt.current & 1 | 2
                  ), Ke && Sa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Vt() > xo && (t.flags |= 128, u = !0, Ml(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = to(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, po(t, e), Ml(l, !0), l.tail === null && l.tailMode === "hidden" && !f.alternate && !Ke)
                return vt(t), null;
            } else
              2 * Vt() - l.renderingStartTime > xo && r !== 536870912 && (t.flags |= 128, u = !0, Ml(l, !1), t.lanes = 4194304);
          l.isBackwards ? (f.sibling = t.child, t.child = f) : (e = l.last, e !== null ? e.sibling = f : t.child = f, l.last = f);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Vt(), e.sibling = null, r = Nt.current, ee(
          Nt,
          u ? r & 1 | 2 : r & 1
        ), Ke && Sa(t, l.treeForkCount), e) : (vt(t), null);
      case 22:
      case 23:
        return Nn(t), Rc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (r & 536870912) !== 0 && (t.flags & 128) === 0 && (vt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vt(t), r = t.updateQueue, r !== null && po(t, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== r && (t.flags |= 2048), e !== null && Q(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ea(_t), vt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function xw(e, t) {
    switch (hc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ea(_t), Ve(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Yt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Nn(t), t.alternate === null)
            throw Error(s(340));
          zr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Nn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          zr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Q(Nt), null;
      case 4:
        return Ve(), null;
      case 10:
        return Ea(t.type), null;
      case 22:
      case 23:
        return Nn(t), Rc(), e !== null && Q(Lr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ea(_t), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function fg(e, t) {
    switch (hc(t), t.tag) {
      case 3:
        Ea(_t), Ve();
        break;
      case 26:
      case 27:
      case 5:
        Yt(t);
        break;
      case 4:
        Ve();
        break;
      case 31:
        t.memoizedState !== null && Nn(t);
        break;
      case 13:
        Nn(t);
        break;
      case 19:
        Q(Nt);
        break;
      case 10:
        Ea(t.type);
        break;
      case 22:
      case 23:
        Nn(t), Rc(), e !== null && Q(Lr);
        break;
      case 24:
        Ea(_t);
    }
  }
  function Al(e, t) {
    try {
      var r = t.updateQueue, l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        r = u;
        do {
          if ((r.tag & e) === e) {
            l = void 0;
            var f = r.create, y = r.inst;
            l = f(), y.destroy = l;
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (j) {
      nt(t, t.return, j);
    }
  }
  function Ja(e, t, r) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        l = f;
        do {
          if ((l.tag & e) === e) {
            var y = l.inst, j = y.destroy;
            if (j !== void 0) {
              y.destroy = void 0, u = t;
              var k = r, X = j;
              try {
                X();
              } catch (ae) {
                nt(
                  u,
                  k,
                  ae
                );
              }
            }
          }
          l = l.next;
        } while (l !== f);
      }
    } catch (ae) {
      nt(t, t.return, ae);
    }
  }
  function hg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var r = e.stateNode;
      try {
        ap(t, r);
      } catch (l) {
        nt(e, e.return, l);
      }
    }
  }
  function mg(e, t, r) {
    r.props = Hr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      nt(e, t, l);
    }
  }
  function _l(e, t) {
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
    } catch (u) {
      nt(e, t, u);
    }
  }
  function da(e, t) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          nt(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (u) {
          nt(e, t, u);
        }
      else r.current = null;
  }
  function pg(e) {
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
    } catch (u) {
      nt(e, e.return, u);
    }
  }
  function ld(e, t, r) {
    try {
      var l = e.stateNode;
      qw(l, e.type, r, t), l[ge] = t;
    } catch (u) {
      nt(e, e.return, u);
    }
  }
  function gg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ir(e.type) || e.tag === 4;
  }
  function sd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || gg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ir(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function od(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, t) : (t = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, t.appendChild(e), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = ya));
    else if (l !== 4 && (l === 27 && ir(e.type) && (r = e.stateNode, t = null), e = e.child, e !== null))
      for (od(e, t, r), e = e.sibling; e !== null; )
        od(e, t, r), e = e.sibling;
  }
  function go(e, t, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && ir(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (go(e, t, r), e = e.sibling; e !== null; )
        go(e, t, r), e = e.sibling;
  }
  function vg(e) {
    var t = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      tn(t, l, r), t[pe] = e, t[ge] = r;
    } catch (f) {
      nt(e, e.return, f);
    }
  }
  var Ra = !1, Ot = !1, ud = !1, yg = typeof WeakSet == "function" ? WeakSet : Set, Xt = null;
  function Sw(e, t) {
    if (e = e.containerInfo, Ad = Uo, e = Am(e), nc(e)) {
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
            var u = l.anchorOffset, f = l.focusNode;
            l = l.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var y = 0, j = -1, k = -1, X = 0, ae = 0, le = e, K = null;
            t: for (; ; ) {
              for (var W; le !== r || u !== 0 && le.nodeType !== 3 || (j = y + u), le !== f || l !== 0 && le.nodeType !== 3 || (k = y + l), le.nodeType === 3 && (y += le.nodeValue.length), (W = le.firstChild) !== null; )
                K = le, le = W;
              for (; ; ) {
                if (le === e) break t;
                if (K === r && ++X === u && (j = y), K === f && ++ae === l && (k = y), (W = le.nextSibling) !== null) break;
                le = K, K = le.parentNode;
              }
              le = W;
            }
            r = j === -1 || k === -1 ? null : { start: j, end: k };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (_d = { focusedElem: e, selectionRange: r }, Uo = !1, Xt = t; Xt !== null; )
      if (t = Xt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Xt = e;
      else
        for (; Xt !== null; ) {
          switch (t = Xt, f = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  u = e[r], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = t, u = f.memoizedProps, f = f.memoizedState, l = r.stateNode;
                try {
                  var xe = Hr(
                    r.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    xe,
                    f
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (De) {
                  nt(
                    r,
                    r.return,
                    De
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, r = e.nodeType, r === 9)
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Xt = e;
            break;
          }
          Xt = t.return;
        }
  }
  function bg(e, t, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        Aa(e, r), l & 4 && Al(5, r);
        break;
      case 1:
        if (Aa(e, r), l & 4)
          if (e = r.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              nt(r, r.return, y);
            }
          else {
            var u = Hr(
              r.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              nt(
                r,
                r.return,
                y
              );
            }
          }
        l & 64 && hg(r), l & 512 && _l(r, r.return);
        break;
      case 3:
        if (Aa(e, r), l & 64 && (e = r.updateQueue, e !== null)) {
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
            ap(e, t);
          } catch (y) {
            nt(r, r.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && vg(r);
      case 26:
      case 5:
        Aa(e, r), t === null && l & 4 && pg(r), l & 512 && _l(r, r.return);
        break;
      case 12:
        Aa(e, r);
        break;
      case 31:
        Aa(e, r), l & 4 && wg(e, r);
        break;
      case 13:
        Aa(e, r), l & 4 && Eg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Aw.bind(
          null,
          r
        ), Qw(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Ra, !l) {
          t = t !== null && t.memoizedState !== null || Ot, u = Ra;
          var f = Ot;
          Ra = l, (Ot = t) && !f ? _a(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : Aa(e, r), Ra = u, Ot = f;
        }
        break;
      case 30:
        break;
      default:
        Aa(e, r);
    }
  }
  function xg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, xg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ct(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var bt = null, fn = !1;
  function Ma(e, t, r) {
    for (r = r.child; r !== null; )
      Sg(e, t, r), r = r.sibling;
  }
  function Sg(e, t, r) {
    if (Qt && typeof Qt.onCommitFiberUnmount == "function")
      try {
        Qt.onCommitFiberUnmount(Qn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Ot || da(r, t), Ma(
          e,
          t,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Ot || da(r, t);
        var l = bt, u = fn;
        ir(r.type) && (bt = r.stateNode, fn = !1), Ma(
          e,
          t,
          r
        ), $l(r.stateNode), bt = l, fn = u;
        break;
      case 5:
        Ot || da(r, t);
      case 6:
        if (l = bt, u = fn, bt = null, Ma(
          e,
          t,
          r
        ), bt = l, fn = u, bt !== null)
          if (fn)
            try {
              (bt.nodeType === 9 ? bt.body : bt.nodeName === "HTML" ? bt.ownerDocument.body : bt).removeChild(r.stateNode);
            } catch (f) {
              nt(
                r,
                t,
                f
              );
            }
          else
            try {
              bt.removeChild(r.stateNode);
            } catch (f) {
              nt(
                r,
                t,
                f
              );
            }
        break;
      case 18:
        bt !== null && (fn ? (e = bt, hv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : hv(bt, r.stateNode));
        break;
      case 4:
        l = bt, u = fn, bt = r.stateNode.containerInfo, fn = !0, Ma(
          e,
          t,
          r
        ), bt = l, fn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ja(2, r, t), Ot || Ja(4, r, t), Ma(
          e,
          t,
          r
        );
        break;
      case 1:
        Ot || (da(r, t), l = r.stateNode, typeof l.componentWillUnmount == "function" && mg(
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
        Ot = (l = Ot) || r.memoizedState !== null, Ma(
          e,
          t,
          r
        ), Ot = l;
        break;
      default:
        Ma(
          e,
          t,
          r
        );
    }
  }
  function wg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        nt(t, t.return, r);
      }
    }
  }
  function Eg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
      } catch (r) {
        nt(t, t.return, r);
      }
  }
  function ww(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new yg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new yg()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function vo(e, t) {
    var r = ww(e);
    t.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var u = _w.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function hn(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var u = r[l], f = e, y = t, j = y;
        e: for (; j !== null; ) {
          switch (j.tag) {
            case 27:
              if (ir(j.type)) {
                bt = j.stateNode, fn = !1;
                break e;
              }
              break;
            case 5:
              bt = j.stateNode, fn = !1;
              break e;
            case 3:
            case 4:
              bt = j.stateNode.containerInfo, fn = !0;
              break e;
          }
          j = j.return;
        }
        if (bt === null) throw Error(s(160));
        Sg(f, y, u), bt = null, fn = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        jg(t, e), t = t.sibling;
  }
  var ea = null;
  function jg(e, t) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        hn(t, e), mn(e), l & 4 && (Ja(3, e, e.return), Al(3, e), Ja(5, e, e.return));
        break;
      case 1:
        hn(t, e), mn(e), l & 512 && (Ot || r === null || da(r, r.return)), l & 64 && Ra && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var u = ea;
        if (hn(t, e), mn(e), l & 512 && (Ot || r === null || da(r, r.return)), l & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[$e] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(l), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), tn(f, l, r), f[pe] = e, ht(f), l = f;
                      break e;
                    case "link":
                      var y = jv(
                        "link",
                        "href",
                        u
                      ).get(l + (r.href || ""));
                      if (y) {
                        for (var j = 0; j < y.length; j++)
                          if (f = y[j], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            y.splice(j, 1);
                            break t;
                          }
                      }
                      f = u.createElement(l), tn(f, l, r), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (y = jv(
                        "meta",
                        "content",
                        u
                      ).get(l + (r.content || ""))) {
                        for (j = 0; j < y.length; j++)
                          if (f = y[j], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            y.splice(j, 1);
                            break t;
                          }
                      }
                      f = u.createElement(l), tn(f, l, r), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  f[pe] = e, ht(f), l = f;
                }
                e.stateNode = l;
              } else
                Nv(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Ev(
                u,
                l,
                e.memoizedProps
              );
          else
            f !== l ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, l === null ? Nv(
              u,
              e.type,
              e.stateNode
            ) : Ev(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && ld(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        hn(t, e), mn(e), l & 512 && (Ot || r === null || da(r, r.return)), r !== null && l & 4 && ld(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (hn(t, e), mn(e), l & 512 && (Ot || r === null || da(r, r.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            ii(u, "");
          } catch (xe) {
            nt(e, e.return, xe);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, ld(
          e,
          u,
          r !== null ? r.memoizedProps : u
        )), l & 1024 && (ud = !0);
        break;
      case 6:
        if (hn(t, e), mn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (xe) {
            nt(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (zo = null, u = ea, ea = _o(t.containerInfo), hn(t, e), ea = u, mn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(t.containerInfo);
          } catch (xe) {
            nt(e, e.return, xe);
          }
        ud && (ud = !1, Ng(e));
        break;
      case 4:
        l = ea, ea = _o(
          e.stateNode.containerInfo
        ), hn(t, e), mn(e), ea = l;
        break;
      case 12:
        hn(t, e), mn(e);
        break;
      case 31:
        hn(t, e), mn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 13:
        hn(t, e), mn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = Vt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var k = r !== null && r.memoizedState !== null, X = Ra, ae = Ot;
        if (Ra = X || u, Ot = ae || k, hn(t, e), Ot = ae, Ra = X, mn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (r === null || k || Ra || Ot || qr(e)), r = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (r === null) {
                k = r = t;
                try {
                  if (f = k.stateNode, u)
                    y = f.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    j = k.stateNode;
                    var le = k.memoizedProps.style, K = le != null && le.hasOwnProperty("display") ? le.display : null;
                    j.style.display = K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (xe) {
                  nt(k, k.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (r === null) {
                k = t;
                try {
                  k.stateNode.nodeValue = u ? "" : k.memoizedProps;
                } catch (xe) {
                  nt(k, k.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (r === null) {
                k = t;
                try {
                  var W = k.stateNode;
                  u ? mv(W, !0) : mv(k.stateNode, !1);
                } catch (xe) {
                  nt(k, k.return, xe);
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
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, vo(e, r))));
        break;
      case 19:
        hn(t, e), mn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        hn(t, e), mn(e);
    }
  }
  function mn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (gg(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(s(160));
        switch (r.tag) {
          case 27:
            var u = r.stateNode, f = sd(e);
            go(e, f, u);
            break;
          case 5:
            var y = r.stateNode;
            r.flags & 32 && (ii(y, ""), r.flags &= -33);
            var j = sd(e);
            go(e, j, y);
            break;
          case 3:
          case 4:
            var k = r.stateNode.containerInfo, X = sd(e);
            od(
              e,
              X,
              k
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (ae) {
        nt(e, e.return, ae);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ng(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ng(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Aa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        bg(e, t.alternate, t), t = t.sibling;
  }
  function qr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ja(4, t, t.return), qr(t);
          break;
        case 1:
          da(t, t.return);
          var r = t.stateNode;
          typeof r.componentWillUnmount == "function" && mg(
            t,
            t.return,
            r
          ), qr(t);
          break;
        case 27:
          $l(t.stateNode);
        case 26:
        case 5:
          da(t, t.return), qr(t);
          break;
        case 22:
          t.memoizedState === null && qr(t);
          break;
        case 30:
          qr(t);
          break;
        default:
          qr(t);
      }
      e = e.sibling;
    }
  }
  function _a(e, t, r) {
    for (r = r && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, f = t, y = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          _a(
            u,
            f,
            r
          ), Al(4, f);
          break;
        case 1:
          if (_a(
            u,
            f,
            r
          ), l = f, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (X) {
              nt(l, l.return, X);
            }
          if (l = f, u = l.updateQueue, u !== null) {
            var j = l.stateNode;
            try {
              var k = u.shared.hiddenCallbacks;
              if (k !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < k.length; u++)
                  np(k[u], j);
            } catch (X) {
              nt(l, l.return, X);
            }
          }
          r && y & 64 && hg(f), _l(f, f.return);
          break;
        case 27:
          vg(f);
        case 26:
        case 5:
          _a(
            u,
            f,
            r
          ), r && l === null && y & 4 && pg(f), _l(f, f.return);
          break;
        case 12:
          _a(
            u,
            f,
            r
          );
          break;
        case 31:
          _a(
            u,
            f,
            r
          ), r && y & 4 && wg(u, f);
          break;
        case 13:
          _a(
            u,
            f,
            r
          ), r && y & 4 && Eg(u, f);
          break;
        case 22:
          f.memoizedState === null && _a(
            u,
            f,
            r
          ), _l(f, f.return);
          break;
        case 30:
          break;
        default:
          _a(
            u,
            f,
            r
          );
      }
      t = t.sibling;
    }
  }
  function cd(e, t) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && vl(r));
  }
  function dd(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && vl(e));
  }
  function ta(e, t, r, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Tg(
          e,
          t,
          r,
          l
        ), t = t.sibling;
  }
  function Tg(e, t, r, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ta(
          e,
          t,
          r,
          l
        ), u & 2048 && Al(9, t);
        break;
      case 1:
        ta(
          e,
          t,
          r,
          l
        );
        break;
      case 3:
        ta(
          e,
          t,
          r,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && vl(e)));
        break;
      case 12:
        if (u & 2048) {
          ta(
            e,
            t,
            r,
            l
          ), e = t.stateNode;
          try {
            var f = t.memoizedProps, y = f.id, j = f.onPostCommit;
            typeof j == "function" && j(
              y,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (k) {
            nt(t, t.return, k);
          }
        } else
          ta(
            e,
            t,
            r,
            l
          );
        break;
      case 31:
        ta(
          e,
          t,
          r,
          l
        );
        break;
      case 13:
        ta(
          e,
          t,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, y = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? ta(
          e,
          t,
          r,
          l
        ) : Dl(e, t) : f._visibility & 2 ? ta(
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
        )), u & 2048 && cd(y, t);
        break;
      case 24:
        ta(
          e,
          t,
          r,
          l
        ), u & 2048 && dd(t.alternate, t);
        break;
      default:
        ta(
          e,
          t,
          r,
          l
        );
    }
  }
  function Ni(e, t, r, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, y = t, j = r, k = l, X = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            y,
            j,
            k,
            u
          ), Al(8, y);
          break;
        case 23:
          break;
        case 22:
          var ae = y.stateNode;
          y.memoizedState !== null ? ae._visibility & 2 ? Ni(
            f,
            y,
            j,
            k,
            u
          ) : Dl(
            f,
            y
          ) : (ae._visibility |= 2, Ni(
            f,
            y,
            j,
            k,
            u
          )), u && X & 2048 && cd(
            y.alternate,
            y
          );
          break;
        case 24:
          Ni(
            f,
            y,
            j,
            k,
            u
          ), u && X & 2048 && dd(y.alternate, y);
          break;
        default:
          Ni(
            f,
            y,
            j,
            k,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Dl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var r = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            Dl(r, l), u & 2048 && cd(
              l.alternate,
              l
            );
            break;
          case 24:
            Dl(r, l), u & 2048 && dd(l.alternate, l);
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
        Cg(
          e,
          t,
          r
        ), e = e.sibling;
  }
  function Cg(e, t, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          t,
          r
        ), e.flags & zl && e.memoizedState !== null && oE(
          r,
          ea,
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
        var l = ea;
        ea = _o(e.stateNode.containerInfo), Ti(
          e,
          t,
          r
        ), ea = l;
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
  function Rg(e) {
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
          Xt = l, Ag(
            l,
            e
          );
        }
      Rg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Mg(e), e = e.sibling;
  }
  function Mg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ol(e), e.flags & 2048 && Ja(9, e, e.return);
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
          Xt = l, Ag(
            l,
            e
          );
        }
      Rg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Ja(8, t, t.return), yo(t);
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
  function Ag(e, t) {
    for (; Xt !== null; ) {
      var r = Xt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Ja(8, r, t);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var l = r.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          vl(r.memoizedState.cache);
      }
      if (l = r.child, l !== null) l.return = r, Xt = l;
      else
        e: for (r = e; Xt !== null; ) {
          l = Xt;
          var u = l.sibling, f = l.return;
          if (xg(l), l === r) {
            Xt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Xt = u;
            break e;
          }
          Xt = f;
        }
    }
  }
  var Ew = {
    getCacheForType: function(e) {
      var t = Wt(_t), r = t.data.get(e);
      return r === void 0 && (r = e(), t.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return Wt(_t).controller.signal;
    }
  }, jw = typeof WeakMap == "function" ? WeakMap : Map, We = 0, dt = null, Fe = null, Ge = 0, tt = 0, Tn = null, Wa = !1, Ci = !1, fd = !1, Da = 0, wt = 0, er = 0, Ir = 0, hd = 0, Cn = 0, Ri = 0, kl = null, pn = null, md = !1, bo = 0, _g = 0, xo = 1 / 0, So = null, tr = null, Ft = 0, nr = null, Mi = null, za = 0, pd = 0, gd = null, Dg = null, Ll = 0, vd = null;
  function Rn() {
    return (We & 2) !== 0 && Ge !== 0 ? Ge & -Ge : O.T !== null ? Ed() : ce();
  }
  function zg() {
    if (Cn === 0)
      if ((Ge & 536870912) === 0 || Ke) {
        var e = Zn;
        Zn <<= 1, (Zn & 3932160) === 0 && (Zn = 262144), Cn = e;
      } else Cn = 536870912;
    return e = jn.current, e !== null && (e.flags |= 32), Cn;
  }
  function gn(e, t, r) {
    (e === dt && (tt === 2 || tt === 9) || e.cancelPendingCommit !== null) && (Ai(e, 0), ar(
      e,
      Ge,
      Cn,
      !1
    )), rt(e, r), ((We & 2) === 0 || e !== dt) && (e === dt && ((We & 2) === 0 && (Ir |= r), wt === 4 && ar(
      e,
      Ge,
      Cn,
      !1
    )), fa(e));
  }
  function Og(e, t, r) {
    if ((We & 6) !== 0) throw Error(s(327));
    var l = !r && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ut(e, t), u = l ? Cw(e, t) : bd(e, t, !0), f = l;
    do {
      if (u === 0) {
        Ci && !l && ar(e, t, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Nw(r)) {
          u = bd(e, t, !1), f = !1;
          continue;
        }
        if (u === 2) {
          if (f = t, e.errorRecoveryDisabledLanes & f)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            t = y;
            e: {
              var j = e;
              u = kl;
              var k = j.current.memoizedState.isDehydrated;
              if (k && (Ai(j, y).flags |= 256), y = bd(
                j,
                y,
                !1
              ), y !== 2) {
                if (fd && !k) {
                  j.errorRecoveryDisabledLanes |= f, Ir |= f, u = 4;
                  break e;
                }
                f = pn, pn = u, f !== null && (pn === null ? pn = f : pn.push.apply(
                  pn,
                  f
                ));
              }
              u = y;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ai(e, 0), ar(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, f = u, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ar(
                l,
                t,
                Cn,
                !Wa
              );
              break e;
            case 2:
              pn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = bo + 300 - Vt(), 10 < u)) {
            if (ar(
              l,
              t,
              Cn,
              !Wa
            ), ke(l, 0, !0) !== 0) break e;
            za = t, l.timeoutHandle = dv(
              kg.bind(
                null,
                l,
                r,
                pn,
                So,
                md,
                t,
                Cn,
                Ir,
                Ri,
                Wa,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          kg(
            l,
            r,
            pn,
            So,
            md,
            t,
            Cn,
            Ir,
            Ri,
            Wa,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    fa(e);
  }
  function kg(e, t, r, l, u, f, y, j, k, X, ae, le, K, W) {
    if (e.timeoutHandle = -1, le = t.subtreeFlags, le & 8192 || (le & 16785408) === 16785408) {
      le = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ya
      }, Cg(
        t,
        f,
        le
      );
      var xe = (f & 62914560) === f ? bo - Vt() : (f & 4194048) === f ? _g - Vt() : 0;
      if (xe = uE(
        le,
        xe
      ), xe !== null) {
        za = f, e.cancelPendingCommit = xe(
          Ig.bind(
            null,
            e,
            t,
            f,
            r,
            l,
            u,
            y,
            j,
            k,
            ae,
            le,
            null,
            K,
            W
          )
        ), ar(e, f, y, !X);
        return;
      }
    }
    Ig(
      e,
      t,
      f,
      r,
      l,
      u,
      y,
      j,
      k
    );
  }
  function Nw(e) {
    for (var t = e; ; ) {
      var r = t.tag;
      if ((r === 0 || r === 11 || r === 15) && t.flags & 16384 && (r = t.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var u = r[l], f = u.getSnapshot;
          u = u.value;
          try {
            if (!wn(f(), u)) return !1;
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
  function ar(e, t, r, l) {
    t &= ~hd, t &= ~Ir, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - qt(u), y = 1 << f;
      l[f] = -1, u &= ~y;
    }
    r !== 0 && va(e, r, t);
  }
  function wo() {
    return (We & 6) === 0 ? (Ul(0), !1) : !0;
  }
  function yd() {
    if (Fe !== null) {
      if (tt === 0)
        var e = Fe.return;
      else
        e = Fe, wa = Or = null, Oc(e), xi = null, bl = 0, e = Fe;
      for (; e !== null; )
        fg(e.alternate, e), e = e.return;
      Fe = null;
    }
  }
  function Ai(e, t) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Yw(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), za = 0, yd(), dt = e, Fe = r = xa(e.current, null), Ge = t, tt = 0, Tn = null, Wa = !1, Ci = ut(e, t), fd = !1, Ri = Cn = hd = Ir = er = wt = 0, pn = kl = null, md = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - qt(l), f = 1 << u;
        t |= e[u], l &= ~f;
      }
    return Da = t, qs(), r;
  }
  function Lg(e, t) {
    Ue = null, O.H = Cl, t === bi || t === Qs ? (t = Jm(), tt = 3) : t === wc ? (t = Jm(), tt = 4) : tt = t === Qc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Tn = t, Fe === null && (wt = 1, co(
      e,
      Un(t, e.current)
    ));
  }
  function Ug() {
    var e = jn.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? Hn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === Hn : !1;
  }
  function Bg() {
    var e = O.H;
    return O.H = Cl, e === null ? Cl : e;
  }
  function Vg() {
    var e = O.A;
    return O.A = Ew, e;
  }
  function Eo() {
    wt = 4, Wa || (Ge & 4194048) !== Ge && jn.current !== null || (Ci = !0), (er & 134217727) === 0 && (Ir & 134217727) === 0 || dt === null || ar(
      dt,
      Ge,
      Cn,
      !1
    );
  }
  function bd(e, t, r) {
    var l = We;
    We |= 2;
    var u = Bg(), f = Vg();
    (dt !== e || Ge !== t) && (So = null, Ai(e, t)), t = !1;
    var y = wt;
    e: do
      try {
        if (tt !== 0 && Fe !== null) {
          var j = Fe, k = Tn;
          switch (tt) {
            case 8:
              yd(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jn.current === null && (t = !0);
              var X = tt;
              if (tt = 0, Tn = null, _i(e, j, k, X), r && Ci) {
                y = 0;
                break e;
              }
              break;
            default:
              X = tt, tt = 0, Tn = null, _i(e, j, k, X);
          }
        }
        Tw(), y = wt;
        break;
      } catch (ae) {
        Lg(e, ae);
      }
    while (!0);
    return t && e.shellSuspendCounter++, wa = Or = null, We = l, O.H = u, O.A = f, Fe === null && (dt = null, Ge = 0, qs()), y;
  }
  function Tw() {
    for (; Fe !== null; ) $g(Fe);
  }
  function Cw(e, t) {
    var r = We;
    We |= 2;
    var l = Bg(), u = Vg();
    dt !== e || Ge !== t ? (So = null, xo = Vt() + 500, Ai(e, t)) : Ci = ut(
      e,
      t
    );
    e: do
      try {
        if (tt !== 0 && Fe !== null) {
          t = Fe;
          var f = Tn;
          t: switch (tt) {
            case 1:
              tt = 0, Tn = null, _i(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (Qm(f)) {
                tt = 0, Tn = null, Hg(t);
                break;
              }
              t = function() {
                tt !== 2 && tt !== 9 || dt !== e || (tt = 7), fa(e);
              }, f.then(t, t);
              break e;
            case 3:
              tt = 7;
              break e;
            case 4:
              tt = 5;
              break e;
            case 7:
              Qm(f) ? (tt = 0, Tn = null, Hg(t)) : (tt = 0, Tn = null, _i(e, t, f, 7));
              break;
            case 5:
              var y = null;
              switch (Fe.tag) {
                case 26:
                  y = Fe.memoizedState;
                case 5:
                case 27:
                  var j = Fe;
                  if (y ? Tv(y) : j.stateNode.complete) {
                    tt = 0, Tn = null;
                    var k = j.sibling;
                    if (k !== null) Fe = k;
                    else {
                      var X = j.return;
                      X !== null ? (Fe = X, jo(X)) : Fe = null;
                    }
                    break t;
                  }
              }
              tt = 0, Tn = null, _i(e, t, f, 5);
              break;
            case 6:
              tt = 0, Tn = null, _i(e, t, f, 6);
              break;
            case 8:
              yd(), wt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Rw();
        break;
      } catch (ae) {
        Lg(e, ae);
      }
    while (!0);
    return wa = Or = null, O.H = l, O.A = u, We = r, Fe !== null ? 0 : (dt = null, Ge = 0, qs(), wt);
  }
  function Rw() {
    for (; Fe !== null && !Bt(); )
      $g(Fe);
  }
  function $g(e) {
    var t = cg(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, t === null ? jo(e) : Fe = t;
  }
  function Hg(e) {
    var t = e, r = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = rg(
          r,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = rg(
          r,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        Oc(t);
      default:
        fg(r, t), t = Fe = Vm(t, Da), t = cg(r, t, Da);
    }
    e.memoizedProps = e.pendingProps, t === null ? jo(e) : Fe = t;
  }
  function _i(e, t, r, l) {
    wa = Or = null, Oc(t), xi = null, bl = 0;
    var u = t.return;
    try {
      if (gw(
        e,
        u,
        t,
        r,
        Ge
      )) {
        wt = 1, co(
          e,
          Un(r, e.current)
        ), Fe = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Fe = u, f;
      wt = 1, co(
        e,
        Un(r, e.current)
      ), Fe = null;
      return;
    }
    t.flags & 32768 ? (Ke || l === 1 ? e = !0 : Ci || (Ge & 536870912) !== 0 ? e = !1 : (Wa = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = jn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), qg(t, e)) : jo(t);
  }
  function jo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        qg(
          t,
          Wa
        );
        return;
      }
      e = t.return;
      var r = bw(
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
    wt === 0 && (wt = 5);
  }
  function qg(e, t) {
    do {
      var r = xw(e.alternate, e);
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
    wt = 6, Fe = null;
  }
  function Ig(e, t, r, l, u, f, y, j, k) {
    e.cancelPendingCommit = null;
    do
      No();
    while (Ft !== 0);
    if ((We & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= sc, Zt(
        e,
        r,
        f,
        y,
        j,
        k
      ), e === dt && (Fe = dt = null, Ge = 0), Mi = t, nr = e, za = r, pd = f, gd = u, Dg = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Dw(et, function() {
        return Kg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, u = C.p, C.p = 2, y = We, We |= 4;
        try {
          Sw(e, t, r);
        } finally {
          We = y, C.p = u, O.T = l;
        }
      }
      Ft = 1, Fg(), Yg(), Gg();
    }
  }
  function Fg() {
    if (Ft === 1) {
      Ft = 0;
      var e = nr, t = Mi, r = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null;
        var l = C.p;
        C.p = 2;
        var u = We;
        We |= 4;
        try {
          jg(t, e);
          var f = _d, y = Am(e.containerInfo), j = f.focusedElem, k = f.selectionRange;
          if (y !== j && j && j.ownerDocument && Mm(
            j.ownerDocument.documentElement,
            j
          )) {
            if (k !== null && nc(j)) {
              var X = k.start, ae = k.end;
              if (ae === void 0 && (ae = X), "selectionStart" in j)
                j.selectionStart = X, j.selectionEnd = Math.min(
                  ae,
                  j.value.length
                );
              else {
                var le = j.ownerDocument || document, K = le && le.defaultView || window;
                if (K.getSelection) {
                  var W = K.getSelection(), xe = j.textContent.length, De = Math.min(k.start, xe), ot = k.end === void 0 ? De : Math.min(k.end, xe);
                  !W.extend && De > ot && (y = ot, ot = De, De = y);
                  var $ = Rm(
                    j,
                    De
                  ), U = Rm(
                    j,
                    ot
                  );
                  if ($ && U && (W.rangeCount !== 1 || W.anchorNode !== $.node || W.anchorOffset !== $.offset || W.focusNode !== U.node || W.focusOffset !== U.offset)) {
                    var G = le.createRange();
                    G.setStart($.node, $.offset), W.removeAllRanges(), De > ot ? (W.addRange(G), W.extend(U.node, U.offset)) : (G.setEnd(U.node, U.offset), W.addRange(G));
                  }
                }
              }
            }
            for (le = [], W = j; W = W.parentNode; )
              W.nodeType === 1 && le.push({
                element: W,
                left: W.scrollLeft,
                top: W.scrollTop
              });
            for (typeof j.focus == "function" && j.focus(), j = 0; j < le.length; j++) {
              var ie = le[j];
              ie.element.scrollLeft = ie.left, ie.element.scrollTop = ie.top;
            }
          }
          Uo = !!Ad, _d = Ad = null;
        } finally {
          We = u, C.p = l, O.T = r;
        }
      }
      e.current = t, Ft = 2;
    }
  }
  function Yg() {
    if (Ft === 2) {
      Ft = 0;
      var e = nr, t = Mi, r = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || r) {
        r = O.T, O.T = null;
        var l = C.p;
        C.p = 2;
        var u = We;
        We |= 4;
        try {
          bg(e, t.alternate, t);
        } finally {
          We = u, C.p = l, O.T = r;
        }
      }
      Ft = 3;
    }
  }
  function Gg() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0, zn();
      var e = nr, t = Mi, r = za, l = Dg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ft = 5 : (Ft = 0, Mi = nr = null, Xg(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (tr = null), F(r), t = t.stateNode, Qt && typeof Qt.onCommitFiberRoot == "function")
        try {
          Qt.onCommitFiberRoot(
            Qn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, u = C.p, C.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, y = 0; y < l.length; y++) {
            var j = l[y];
            f(j.value, {
              componentStack: j.stack
            });
          }
        } finally {
          O.T = t, C.p = u;
        }
      }
      (za & 3) !== 0 && No(), fa(e), u = e.pendingLanes, (r & 261930) !== 0 && (u & 42) !== 0 ? e === vd ? Ll++ : (Ll = 0, vd = e) : Ll = 0, Ul(0);
    }
  }
  function Xg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, vl(t)));
  }
  function No() {
    return Fg(), Yg(), Gg(), Kg();
  }
  function Kg() {
    if (Ft !== 5) return !1;
    var e = nr, t = pd;
    pd = 0;
    var r = F(za), l = O.T, u = C.p;
    try {
      C.p = 32 > r ? 32 : r, O.T = null, r = gd, gd = null;
      var f = nr, y = za;
      if (Ft = 0, Mi = nr = null, za = 0, (We & 6) !== 0) throw Error(s(331));
      var j = We;
      if (We |= 4, Mg(f.current), Tg(
        f,
        f.current,
        y,
        r
      ), We = j, Ul(0, !1), Qt && typeof Qt.onPostCommitFiberRoot == "function")
        try {
          Qt.onPostCommitFiberRoot(Qn, f);
        } catch {
        }
      return !0;
    } finally {
      C.p = u, O.T = l, Xg(e, t);
    }
  }
  function Pg(e, t, r) {
    t = Un(r, t), t = Pc(e.stateNode, t, 2), e = Pa(e, t, 2), e !== null && (rt(e, 2), fa(e));
  }
  function nt(e, t, r) {
    if (e.tag === 3)
      Pg(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Pg(
            t,
            e,
            r
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (tr === null || !tr.has(l))) {
            e = Un(r, e), r = Qp(2), l = Pa(t, r, 2), l !== null && (Zp(
              r,
              l,
              t,
              e
            ), rt(l, 2), fa(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function xd(e, t, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new jw();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(r) || (fd = !0, u.add(r), e = Mw.bind(null, e, t, r), t.then(e, e));
  }
  function Mw(e, t, r) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, dt === e && (Ge & r) === r && (wt === 4 || wt === 3 && (Ge & 62914560) === Ge && 300 > Vt() - bo ? (We & 2) === 0 && Ai(e, 0) : hd |= r, Ri === Ge && (Ri = 0)), fa(e);
  }
  function Qg(e, t) {
    t === 0 && (t = It()), e = _r(e, t), e !== null && (rt(e, t), fa(e));
  }
  function Aw(e) {
    var t = e.memoizedState, r = 0;
    t !== null && (r = t.retryLane), Qg(e, r);
  }
  function _w(e, t) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, u = e.memoizedState;
        u !== null && (r = u.retryLane);
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
    l !== null && l.delete(t), Qg(e, r);
  }
  function Dw(e, t) {
    return xn(e, t);
  }
  var To = null, Di = null, Sd = !1, Co = !1, wd = !1, rr = 0;
  function fa(e) {
    e !== Di && e.next === null && (Di === null ? To = Di = e : Di = Di.next = e), Co = !0, Sd || (Sd = !0, Ow());
  }
  function Ul(e, t) {
    if (!wd && Co) {
      wd = !0;
      do
        for (var r = !1, l = To; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var y = l.suspendedLanes, j = l.pingedLanes;
              f = (1 << 31 - qt(42 | e) + 1) - 1, f &= u & ~(y & ~j), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, ev(l, f));
          } else
            f = Ge, f = ke(
              l,
              l === dt ? f : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (f & 3) === 0 || ut(l, f) || (r = !0, ev(l, f));
          l = l.next;
        }
      while (r);
      wd = !1;
    }
  }
  function zw() {
    Zg();
  }
  function Zg() {
    Co = Sd = !1;
    var e = 0;
    rr !== 0 && Fw() && (e = rr);
    for (var t = Vt(), r = null, l = To; l !== null; ) {
      var u = l.next, f = Jg(l, t);
      f === 0 ? (l.next = null, r === null ? To = u : r.next = u, u === null && (Di = r)) : (r = l, (e !== 0 || (f & 3) !== 0) && (Co = !0)), l = u;
    }
    Ft !== 0 && Ft !== 5 || Ul(e), rr !== 0 && (rr = 0);
  }
  function Jg(e, t) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var y = 31 - qt(f), j = 1 << y, k = u[y];
      k === -1 ? ((j & r) === 0 || (j & l) !== 0) && (u[y] = Rt(j, t)) : k <= t && (e.expiredLanes |= j), f &= ~j;
    }
    if (t = dt, r = Ge, r = ke(
      e,
      e === t ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === t && (tt === 2 || tt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && pa(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ut(e, r)) {
      if (t = r & -r, t === e.callbackPriority) return t;
      switch (l !== null && pa(l), F(r)) {
        case 2:
        case 8:
          r = Pe;
          break;
        case 32:
          r = et;
          break;
        case 268435456:
          r = Ht;
          break;
        default:
          r = et;
      }
      return l = Wg.bind(null, e), r = xn(r, l), e.callbackPriority = t, e.callbackNode = r, t;
    }
    return l !== null && l !== null && pa(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Wg(e, t) {
    if (Ft !== 0 && Ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = Ge;
    return l = ke(
      e,
      e === dt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Og(e, l, t), Jg(e, Vt()), e.callbackNode != null && e.callbackNode === r ? Wg.bind(null, e) : null);
  }
  function ev(e, t) {
    if (No()) return null;
    Og(e, t, !0);
  }
  function Ow() {
    Gw(function() {
      (We & 6) !== 0 ? xn(
        Oe,
        zw
      ) : Zg();
    });
  }
  function Ed() {
    if (rr === 0) {
      var e = vi;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), rr = e;
    }
    return rr;
  }
  function tv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Os("" + e);
  }
  function nv(e, t) {
    var r = t.ownerDocument.createElement("input");
    return r.name = t.name, r.value = t.value, e.id && r.setAttribute("form", e.id), t.parentNode.insertBefore(r, t), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function kw(e, t, r, l, u) {
    if (t === "submit" && r && r.stateNode === u) {
      var f = tv(
        (u[ge] || null).action
      ), y = l.submitter;
      y && (t = (t = y[ge] || null) ? tv(t.formAction) : y.getAttribute("formAction"), t !== null && (f = t, y = null));
      var j = new Bs(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: j,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (rr !== 0) {
                  var k = y ? nv(u, y) : new FormData(u);
                  Ic(
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
                typeof f == "function" && (j.preventDefault(), k = y ? nv(u, y) : new FormData(u), Ic(
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
  for (var jd = 0; jd < lc.length; jd++) {
    var Nd = lc[jd], Lw = Nd.toLowerCase(), Uw = Nd[0].toUpperCase() + Nd.slice(1);
    Wn(
      Lw,
      "on" + Uw
    );
  }
  Wn(zm, "onAnimationEnd"), Wn(Om, "onAnimationIteration"), Wn(km, "onAnimationStart"), Wn("dblclick", "onDoubleClick"), Wn("focusin", "onFocus"), Wn("focusout", "onBlur"), Wn(WS, "onTransitionRun"), Wn(ew, "onTransitionStart"), Wn(tw, "onTransitionCancel"), Wn(Lm, "onTransitionEnd"), sa("onMouseEnter", ["mouseout", "mouseover"]), sa("onMouseLeave", ["mouseout", "mouseover"]), sa("onPointerEnter", ["pointerout", "pointerover"]), sa("onPointerLeave", ["pointerout", "pointerover"]), Gt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Gt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Gt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Gt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Gt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Gt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Bw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bl)
  );
  function av(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], u = l.event;
      l = l.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var j = l[y], k = j.instance, X = j.currentTarget;
            if (j = j.listener, k !== f && u.isPropagationStopped())
              break e;
            f = j, u.currentTarget = X;
            try {
              f(u);
            } catch (ae) {
              Hs(ae);
            }
            u.currentTarget = null, f = k;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (j = l[y], k = j.instance, X = j.currentTarget, j = j.listener, k !== f && u.isPropagationStopped())
              break e;
            f = j, u.currentTarget = X;
            try {
              f(u);
            } catch (ae) {
              Hs(ae);
            }
            u.currentTarget = null, f = k;
          }
      }
    }
  }
  function Ye(e, t) {
    var r = t[be];
    r === void 0 && (r = t[be] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (rv(t, e, 2, !1), r.add(l));
  }
  function Td(e, t, r) {
    var l = 0;
    t && (l |= 4), rv(
      r,
      e,
      l,
      t
    );
  }
  var Ro = "_reactListening" + Math.random().toString(36).slice(2);
  function Cd(e) {
    if (!e[Ro]) {
      e[Ro] = !0, Ha.forEach(function(r) {
        r !== "selectionchange" && (Bw.has(r) || Td(r, !1, e), Td(r, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ro] || (t[Ro] = !0, Td("selectionchange", !1, t));
    }
  }
  function rv(e, t, r, l) {
    switch (zv(t)) {
      case 2:
        var u = fE;
        break;
      case 8:
        u = hE;
        break;
      default:
        u = qd;
    }
    r = u.bind(
      null,
      t,
      r,
      e
    ), u = void 0, !Xu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, r, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, r, !0) : u !== void 0 ? e.addEventListener(t, r, {
      passive: u
    }) : e.addEventListener(t, r, !1);
  }
  function Rd(e, t, r, l, u) {
    var f = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var j = l.stateNode.containerInfo;
          if (j === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var k = y.tag;
              if ((k === 3 || k === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; j !== null; ) {
            if (y = it(j), y === null) return;
            if (k = y.tag, k === 5 || k === 6 || k === 26 || k === 27) {
              l = f = y;
              continue e;
            }
            j = j.parentNode;
          }
        }
        l = l.return;
      }
    um(function() {
      var X = f, ae = Yu(r), le = [];
      e: {
        var K = Um.get(e);
        if (K !== void 0) {
          var W = Bs, xe = e;
          switch (e) {
            case "keypress":
              if (Ls(r) === 0) break e;
            case "keydown":
            case "keyup":
              W = _S;
              break;
            case "focusin":
              xe = "focus", W = Zu;
              break;
            case "focusout":
              xe = "blur", W = Zu;
              break;
            case "beforeblur":
            case "afterblur":
              W = Zu;
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
              W = fm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              W = bS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              W = OS;
              break;
            case zm:
            case Om:
            case km:
              W = wS;
              break;
            case Lm:
              W = LS;
              break;
            case "scroll":
            case "scrollend":
              W = vS;
              break;
            case "wheel":
              W = BS;
              break;
            case "copy":
            case "cut":
            case "paste":
              W = jS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              W = mm;
              break;
            case "toggle":
            case "beforetoggle":
              W = $S;
          }
          var De = (t & 4) !== 0, ot = !De && (e === "scroll" || e === "scrollend"), $ = De ? K !== null ? K + "Capture" : null : K;
          De = [];
          for (var U = X, G; U !== null; ) {
            var ie = U;
            if (G = ie.stateNode, ie = ie.tag, ie !== 5 && ie !== 26 && ie !== 27 || G === null || $ === null || (ie = ll(U, $), ie != null && De.push(
              Vl(U, ie, G)
            )), ot) break;
            U = U.return;
          }
          0 < De.length && (K = new W(
            K,
            xe,
            null,
            r,
            ae
          ), le.push({ event: K, listeners: De }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (K = e === "mouseover" || e === "pointerover", W = e === "mouseout" || e === "pointerout", K && r !== Fu && (xe = r.relatedTarget || r.fromElement) && (it(xe) || xe[Ee]))
            break e;
          if ((W || K) && (K = ae.window === ae ? ae : (K = ae.ownerDocument) ? K.defaultView || K.parentWindow : window, W ? (xe = r.relatedTarget || r.toElement, W = X, xe = xe ? it(xe) : null, xe !== null && (ot = c(xe), De = xe.tag, xe !== ot || De !== 5 && De !== 27 && De !== 6) && (xe = null)) : (W = null, xe = X), W !== xe)) {
            if (De = fm, ie = "onMouseLeave", $ = "onMouseEnter", U = "mouse", (e === "pointerout" || e === "pointerover") && (De = mm, ie = "onPointerLeave", $ = "onPointerEnter", U = "pointer"), ot = W == null ? K : Ie(W), G = xe == null ? K : Ie(xe), K = new De(
              ie,
              U + "leave",
              W,
              r,
              ae
            ), K.target = ot, K.relatedTarget = G, ie = null, it(ae) === X && (De = new De(
              $,
              U + "enter",
              xe,
              r,
              ae
            ), De.target = G, De.relatedTarget = ot, ie = De), ot = ie, W && xe)
              t: {
                for (De = Vw, $ = W, U = xe, G = 0, ie = $; ie; ie = De(ie))
                  G++;
                ie = 0;
                for (var Me = U; Me; Me = De(Me))
                  ie++;
                for (; 0 < G - ie; )
                  $ = De($), G--;
                for (; 0 < ie - G; )
                  U = De(U), ie--;
                for (; G--; ) {
                  if ($ === U || U !== null && $ === U.alternate) {
                    De = $;
                    break t;
                  }
                  $ = De($), U = De(U);
                }
                De = null;
              }
            else De = null;
            W !== null && iv(
              le,
              K,
              W,
              De,
              !1
            ), xe !== null && ot !== null && iv(
              le,
              ot,
              xe,
              De,
              !0
            );
          }
        }
        e: {
          if (K = X ? Ie(X) : window, W = K.nodeName && K.nodeName.toLowerCase(), W === "select" || W === "input" && K.type === "file")
            var Ze = wm;
          else if (xm(K))
            if (Em)
              Ze = QS;
            else {
              Ze = KS;
              var je = XS;
            }
          else
            W = K.nodeName, !W || W.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? X && Iu(X.elementType) && (Ze = wm) : Ze = PS;
          if (Ze && (Ze = Ze(e, X))) {
            Sm(
              le,
              Ze,
              r,
              ae
            );
            break e;
          }
          je && je(e, K, X), e === "focusout" && X && K.type === "number" && X.memoizedProps.value != null && qu(K, "number", K.value);
        }
        switch (je = X ? Ie(X) : window, e) {
          case "focusin":
            (xm(je) || je.contentEditable === "true") && (ui = je, ac = X, ml = null);
            break;
          case "focusout":
            ml = ac = ui = null;
            break;
          case "mousedown":
            rc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            rc = !1, _m(le, r, ae);
            break;
          case "selectionchange":
            if (JS) break;
          case "keydown":
          case "keyup":
            _m(le, r, ae);
        }
        var Be;
        if (Wu)
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
          oi ? ym(e, r) && (Xe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (pm && r.locale !== "ko" && (oi || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && oi && (Be = cm()) : (qa = ae, Ku = "value" in qa ? qa.value : qa.textContent, oi = !0)), je = Mo(X, Xe), 0 < je.length && (Xe = new hm(
          Xe,
          e,
          null,
          r,
          ae
        ), le.push({ event: Xe, listeners: je }), Be ? Xe.data = Be : (Be = bm(r), Be !== null && (Xe.data = Be)))), (Be = qS ? IS(e, r) : FS(e, r)) && (Xe = Mo(X, "onBeforeInput"), 0 < Xe.length && (je = new hm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), le.push({
          event: je,
          listeners: Xe
        }), je.data = Be)), kw(
          le,
          e,
          X,
          r,
          ae
        );
      }
      av(le, t);
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
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = ll(e, r), u != null && l.unshift(
        Vl(e, u, f)
      ), u = ll(e, t), u != null && l.push(
        Vl(e, u, f)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Vw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function iv(e, t, r, l, u) {
    for (var f = t._reactName, y = []; r !== null && r !== l; ) {
      var j = r, k = j.alternate, X = j.stateNode;
      if (j = j.tag, k !== null && k === l) break;
      j !== 5 && j !== 26 && j !== 27 || X === null || (k = X, u ? (X = ll(r, f), X != null && y.unshift(
        Vl(r, X, k)
      )) : u || (X = ll(r, f), X != null && y.push(
        Vl(r, X, k)
      ))), r = r.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var $w = /\r\n?/g, Hw = /\u0000|\uFFFD/g;
  function lv(e) {
    return (typeof e == "string" ? e : "" + e).replace($w, `
`).replace(Hw, "");
  }
  function sv(e, t) {
    return t = lv(t), lv(e) === t;
  }
  function st(e, t, r, l, u, f) {
    switch (r) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ii(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ii(e, "" + l);
        break;
      case "className":
        jt(e, "class", l);
        break;
      case "tabIndex":
        jt(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        jt(e, r, l);
        break;
      case "style":
        sm(e, l, f);
        break;
      case "data":
        if (t !== "object") {
          jt(e, "data", l);
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
          typeof f == "function" && (r === "formAction" ? (t !== "input" && st(e, t, "name", u.name, u, null), st(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), st(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), st(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (st(e, t, "encType", u.encType, u, null), st(e, t, "method", u.method, u, null), st(e, t, "target", u.target, u, null)));
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
            if (u.children != null) throw Error(s(60));
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
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        an(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        an(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        an(
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = pS.get(r) || r, He(e, r, l));
    }
  }
  function Md(e, t, r, l, u, f) {
    switch (r) {
      case "style":
        sm(e, l, f);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (r = l.__html, r != null) {
            if (u.children != null) throw Error(s(60));
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
        if (!Jn.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (u = r.endsWith("Capture"), t = r.slice(2, u ? r.length - 7 : void 0), f = e[ge] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof l == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(t, l, u);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : He(e, r, l);
          }
    }
  }
  function tn(e, t, r) {
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
        var l = !1, u = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var y = r[f];
            if (y != null)
              switch (f) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  st(e, t, f, y, r, null);
              }
          }
        u && st(e, t, "srcSet", r.srcSet, r, null), l && st(e, t, "src", r.src, r, null);
        return;
      case "input":
        Ye("invalid", e);
        var j = f = y = u = null, k = null, X = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var ae = r[l];
            if (ae != null)
              switch (l) {
                case "name":
                  u = ae;
                  break;
                case "type":
                  y = ae;
                  break;
                case "checked":
                  k = ae;
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
                    throw Error(s(137, t));
                  break;
                default:
                  st(e, t, l, ae, r, null);
              }
          }
        am(
          e,
          f,
          j,
          k,
          X,
          y,
          u,
          !1
        );
        return;
      case "select":
        Ye("invalid", e), l = y = f = null;
        for (u in r)
          if (r.hasOwnProperty(u) && (j = r[u], j != null))
            switch (u) {
              case "value":
                f = j;
                break;
              case "defaultValue":
                y = j;
                break;
              case "multiple":
                l = j;
              default:
                st(e, t, u, j, r, null);
            }
        t = f, r = y, e.multiple = !!l, t != null ? ri(e, !!l, t, !1) : r != null && ri(e, !!l, r, !0);
        return;
      case "textarea":
        Ye("invalid", e), f = u = l = null;
        for (y in r)
          if (r.hasOwnProperty(y) && (j = r[y], j != null))
            switch (y) {
              case "value":
                l = j;
                break;
              case "defaultValue":
                u = j;
                break;
              case "children":
                f = j;
                break;
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(s(91));
                break;
              default:
                st(e, t, y, j, r, null);
            }
        im(e, l, u, f);
        return;
      case "option":
        for (k in r)
          if (r.hasOwnProperty(k) && (l = r[k], l != null))
            switch (k) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                st(e, t, k, l, r, null);
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
        for (X in r)
          if (r.hasOwnProperty(X) && (l = r[X], l != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                st(e, t, X, l, r, null);
            }
        return;
      default:
        if (Iu(t)) {
          for (ae in r)
            r.hasOwnProperty(ae) && (l = r[ae], l !== void 0 && Md(
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
  function qw(e, t, r, l) {
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
        var u = null, f = null, y = null, j = null, k = null, X = null, ae = null;
        for (W in r) {
          var le = r[W];
          if (r.hasOwnProperty(W) && le != null)
            switch (W) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                k = le;
              default:
                l.hasOwnProperty(W) || st(e, t, W, null, l, le);
            }
        }
        for (var K in l) {
          var W = l[K];
          if (le = r[K], l.hasOwnProperty(K) && (W != null || le != null))
            switch (K) {
              case "type":
                f = W;
                break;
              case "name":
                u = W;
                break;
              case "checked":
                X = W;
                break;
              case "defaultChecked":
                ae = W;
                break;
              case "value":
                y = W;
                break;
              case "defaultValue":
                j = W;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (W != null)
                  throw Error(s(137, t));
                break;
              default:
                W !== le && st(
                  e,
                  t,
                  K,
                  W,
                  l,
                  le
                );
            }
        }
        Hu(
          e,
          y,
          j,
          k,
          X,
          ae,
          f,
          u
        );
        return;
      case "select":
        W = y = j = K = null;
        for (f in r)
          if (k = r[f], r.hasOwnProperty(f) && k != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                W = k;
              default:
                l.hasOwnProperty(f) || st(
                  e,
                  t,
                  f,
                  null,
                  l,
                  k
                );
            }
        for (u in l)
          if (f = l[u], k = r[u], l.hasOwnProperty(u) && (f != null || k != null))
            switch (u) {
              case "value":
                K = f;
                break;
              case "defaultValue":
                j = f;
                break;
              case "multiple":
                y = f;
              default:
                f !== k && st(
                  e,
                  t,
                  u,
                  f,
                  l,
                  k
                );
            }
        t = j, r = y, l = W, K != null ? ri(e, !!r, K, !1) : !!l != !!r && (t != null ? ri(e, !!r, t, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        W = K = null;
        for (j in r)
          if (u = r[j], r.hasOwnProperty(j) && u != null && !l.hasOwnProperty(j))
            switch (j) {
              case "value":
                break;
              case "children":
                break;
              default:
                st(e, t, j, null, l, u);
            }
        for (y in l)
          if (u = l[y], f = r[y], l.hasOwnProperty(y) && (u != null || f != null))
            switch (y) {
              case "value":
                K = u;
                break;
              case "defaultValue":
                W = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== f && st(e, t, y, u, l, f);
            }
        rm(e, K, W);
        return;
      case "option":
        for (var xe in r)
          if (K = r[xe], r.hasOwnProperty(xe) && K != null && !l.hasOwnProperty(xe))
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
                  K
                );
            }
        for (k in l)
          if (K = l[k], W = r[k], l.hasOwnProperty(k) && K !== W && (K != null || W != null))
            switch (k) {
              case "selected":
                e.selected = K && typeof K != "function" && typeof K != "symbol";
                break;
              default:
                st(
                  e,
                  t,
                  k,
                  K,
                  l,
                  W
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
        for (var De in r)
          K = r[De], r.hasOwnProperty(De) && K != null && !l.hasOwnProperty(De) && st(e, t, De, null, l, K);
        for (X in l)
          if (K = l[X], W = r[X], l.hasOwnProperty(X) && K !== W && (K != null || W != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(s(137, t));
                break;
              default:
                st(
                  e,
                  t,
                  X,
                  K,
                  l,
                  W
                );
            }
        return;
      default:
        if (Iu(t)) {
          for (var ot in r)
            K = r[ot], r.hasOwnProperty(ot) && K !== void 0 && !l.hasOwnProperty(ot) && Md(
              e,
              t,
              ot,
              void 0,
              l,
              K
            );
          for (ae in l)
            K = l[ae], W = r[ae], !l.hasOwnProperty(ae) || K === W || K === void 0 && W === void 0 || Md(
              e,
              t,
              ae,
              K,
              l,
              W
            );
          return;
        }
    }
    for (var $ in r)
      K = r[$], r.hasOwnProperty($) && K != null && !l.hasOwnProperty($) && st(e, t, $, null, l, K);
    for (le in l)
      K = l[le], W = r[le], !l.hasOwnProperty(le) || K === W || K == null && W == null || st(e, t, le, K, l, W);
  }
  function ov(e) {
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
  function Iw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var u = r[l], f = u.transferSize, y = u.initiatorType, j = u.duration;
        if (f && j && ov(y)) {
          for (y = 0, j = u.responseEnd, l += 1; l < r.length; l++) {
            var k = r[l], X = k.startTime;
            if (X > j) break;
            var ae = k.transferSize, le = k.initiatorType;
            ae && ov(le) && (k = k.responseEnd, y += ae * (k < j ? 1 : (j - X) / (k - X)));
          }
          if (--l, t += 8 * (f + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ad = null, _d = null;
  function Ao(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function uv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function cv(e, t) {
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
  function Dd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var zd = null;
  function Fw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === zd ? !1 : (zd = e, !0) : (zd = null, !1);
  }
  var dv = typeof setTimeout == "function" ? setTimeout : void 0, Yw = typeof clearTimeout == "function" ? clearTimeout : void 0, fv = typeof Promise == "function" ? Promise : void 0, Gw = typeof queueMicrotask == "function" ? queueMicrotask : typeof fv < "u" ? function(e) {
    return fv.resolve(null).then(e).catch(Xw);
  } : dv;
  function Xw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ir(e) {
    return e === "head";
  }
  function hv(e, t) {
    var r = t, l = 0;
    do {
      var u = r.nextSibling;
      if (e.removeChild(r), u && u.nodeType === 8)
        if (r = u.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(u), Li(t);
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
            var y = f.nextSibling, j = f.nodeName;
            f[$e] || j === "SCRIPT" || j === "STYLE" || j === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = y;
          }
        } else
          r === "body" && $l(e.ownerDocument.body);
      r = u;
    } while (r);
    Li(t);
  }
  function mv(e, t) {
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
  function Od(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var r = t;
      switch (t = t.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Od(r), ct(r);
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
  function Kw(e, t, r, l) {
    for (; e.nodeType === 1; ) {
      var u = r;
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
      } else if (t === "input" && e.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = qn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Pw(e, t, r) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function pv(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function kd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ld(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Qw(e, t) {
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
  function qn(e) {
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
  var Ud = null;
  function gv(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (t === 0)
            return qn(e.nextSibling);
          t--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function vv(e) {
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
  function yv(e, t, r) {
    switch (t = Ao(r), e) {
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
    ct(e);
  }
  var In = /* @__PURE__ */ new Map(), bv = /* @__PURE__ */ new Set();
  function _o(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = C.d;
  C.d = {
    f: Zw,
    r: Jw,
    D: Ww,
    C: eE,
    L: tE,
    m: nE,
    X: rE,
    S: aE,
    M: iE
  };
  function Zw() {
    var e = Oa.f(), t = wo();
    return e || t;
  }
  function Jw(e) {
    var t = yt(e);
    t !== null && t.tag === 5 && t.type === "form" ? Lp(t) : Oa.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function xv(e, t, r) {
    var l = zi;
    if (l && typeof t == "string" && t) {
      var u = kn(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof r == "string" && (u += '[crossorigin="' + r + '"]'), bv.has(u) || (bv.add(u), e = { rel: e, crossOrigin: r, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), tn(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function Ww(e) {
    Oa.D(e), xv("dns-prefetch", e, null);
  }
  function eE(e, t) {
    Oa.C(e, t), xv("preconnect", e, t);
  }
  function tE(e, t, r) {
    Oa.L(e, t, r);
    var l = zi;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + kn(t) + '"]';
      t === "image" && r && r.imageSrcSet ? (u += '[imagesrcset="' + kn(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (u += '[imagesizes="' + kn(
        r.imageSizes
      ) + '"]')) : u += '[href="' + kn(e) + '"]';
      var f = u;
      switch (t) {
        case "style":
          f = Oi(e);
          break;
        case "script":
          f = ki(e);
      }
      In.has(f) || (e = g(
        {
          rel: "preload",
          href: t === "image" && r && r.imageSrcSet ? void 0 : e,
          as: t
        },
        r
      ), In.set(f, e), l.querySelector(u) !== null || t === "style" && l.querySelector(Hl(f)) || t === "script" && l.querySelector(ql(f)) || (t = l.createElement("link"), tn(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function nE(e, t) {
    Oa.m(e, t);
    var r = zi;
    if (r && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + kn(l) + '"][href="' + kn(e) + '"]', f = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ki(e);
      }
      if (!In.has(f) && (e = g({ rel: "modulepreload", href: e }, t), In.set(f, e), r.querySelector(u) === null)) {
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
        l = r.createElement("link"), tn(l, "link", e), ht(l), r.head.appendChild(l);
      }
    }
  }
  function aE(e, t, r) {
    Oa.S(e, t, r);
    var l = zi;
    if (l && e) {
      var u = Mt(l).hoistableStyles, f = Oi(e);
      t = t || "default";
      var y = u.get(f);
      if (!y) {
        var j = { loading: 0, preload: null };
        if (y = l.querySelector(
          Hl(f)
        ))
          j.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": t },
            r
          ), (r = In.get(f)) && Bd(e, r);
          var k = y = l.createElement("link");
          ht(k), tn(k, "link", e), k._p = new Promise(function(X, ae) {
            k.onload = X, k.onerror = ae;
          }), k.addEventListener("load", function() {
            j.loading |= 1;
          }), k.addEventListener("error", function() {
            j.loading |= 2;
          }), j.loading |= 4, Do(y, t, l);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: j
        }, u.set(f, y);
      }
    }
  }
  function rE(e, t) {
    Oa.X(e, t);
    var r = zi;
    if (r && e) {
      var l = Mt(r).hoistableScripts, u = ki(e), f = l.get(u);
      f || (f = r.querySelector(ql(u)), f || (e = g({ src: e, async: !0 }, t), (t = In.get(u)) && Vd(e, t), f = r.createElement("script"), ht(f), tn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(u, f));
    }
  }
  function iE(e, t) {
    Oa.M(e, t);
    var r = zi;
    if (r && e) {
      var l = Mt(r).hoistableScripts, u = ki(e), f = l.get(u);
      f || (f = r.querySelector(ql(u)), f || (e = g({ src: e, async: !0, type: "module" }, t), (t = In.get(u)) && Vd(e, t), f = r.createElement("script"), ht(f), tn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(u, f));
    }
  }
  function Sv(e, t, r, l) {
    var u = (u = ve.current) ? _o(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (t = Oi(r.href), r = Mt(
          u
        ).hoistableStyles, l = r.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Oi(r.href);
          var f = Mt(
            u
          ).hoistableStyles, y = f.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, y), (f = u.querySelector(
            Hl(e)
          )) && !f._p && (y.instance = f, y.state.loading = 5), In.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, In.set(e, r), f || lE(
            u,
            e,
            r,
            y.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return y;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = r.async, r = r.src, typeof r == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ki(r), r = Mt(
          u
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
    return 'href="' + kn(e) + '"';
  }
  function Hl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function wv(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function lE(e, t, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), tn(t, "link", r), ht(t), e.head.appendChild(t));
  }
  function ki(e) {
    return '[src="' + kn(e) + '"]';
  }
  function ql(e) {
    return "script[async]" + e;
  }
  function Ev(e, t, r) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + kn(r.href) + '"]'
          );
          if (l)
            return t.instance = l, ht(l), l;
          var u = g({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ht(l), tn(l, "style", u), Do(l, r.precedence, e), t.instance = l;
        case "stylesheet":
          u = Oi(r.href);
          var f = e.querySelector(
            Hl(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, ht(f), f;
          l = wv(r), (u = In.get(u)) && Bd(l, u), f = (e.ownerDocument || e).createElement("link"), ht(f);
          var y = f;
          return y._p = new Promise(function(j, k) {
            y.onload = j, y.onerror = k;
          }), tn(f, "link", l), t.state.loading |= 4, Do(f, r.precedence, e), t.instance = f;
        case "script":
          return f = ki(r.src), (u = e.querySelector(
            ql(f)
          )) ? (t.instance = u, ht(u), u) : (l = r, (u = In.get(f)) && (l = g({}, r), Vd(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), ht(u), tn(u, "link", l), e.head.appendChild(u), t.instance = u);
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
    ), u = l.length ? l[l.length - 1] : null, f = u, y = 0; y < l.length; y++) {
      var j = l[y];
      if (j.dataset.precedence === t) f = j;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = r.nodeType === 9 ? r.head : r, t.insertBefore(e, t.firstChild));
  }
  function Bd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Vd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var zo = null;
  function jv(e, t, r) {
    if (zo === null) {
      var l = /* @__PURE__ */ new Map(), u = zo = /* @__PURE__ */ new Map();
      u.set(r, l);
    } else
      u = zo, l = u.get(r), l || (l = /* @__PURE__ */ new Map(), u.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), u = 0; u < r.length; u++) {
      var f = r[u];
      if (!(f[$e] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = f.getAttribute(t) || "";
        y = e + y;
        var j = l.get(y);
        j ? j.push(f) : l.set(y, [f]);
      }
    }
    return l;
  }
  function Nv(e, t, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function sE(e, t, r) {
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
  function Tv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function oE(e, t, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var u = Oi(l.href), f = t.querySelector(
          Hl(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Oo.bind(e), t.then(e, e)), r.state.loading |= 4, r.instance = f, ht(f);
          return;
        }
        f = t.ownerDocument || t, l = wv(l), (u = In.get(u)) && Bd(l, u), f = f.createElement("link"), ht(f);
        var y = f;
        y._p = new Promise(function(j, k) {
          y.onload = j, y.onerror = k;
        }), tn(f, "link", l), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, t), (t = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Oo.bind(e), t.addEventListener("load", r), t.addEventListener("error", r));
    }
  }
  var $d = 0;
  function uE(e, t) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && $d === 0 && ($d = 62500 * Iw());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > $d ? 50 : 800) + t
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ko = /* @__PURE__ */ new Map(), t.forEach(cE, e), ko = null, Oo.call(e));
  }
  function cE(e, t) {
    if (!(t.state.loading & 4)) {
      var r = ko.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), ko.set(e, r);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var y = u[f];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (r.set(y.dataset.precedence, y), l = y);
        }
        l && r.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), f = r.get(y) || l, f === l && r.set(null, u), r.set(y, u), this.count++, l = Oo.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Il = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0
  };
  function dE(e, t, r, l, u, f, y, j, k) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Sn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Sn(0), this.hiddenUpdates = Sn(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = k, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Cv(e, t, r, l, u, f, y, j, k, X, ae, le) {
    return e = new dE(
      e,
      t,
      r,
      y,
      k,
      X,
      ae,
      le,
      j
    ), t = 1, f === !0 && (t |= 24), f = En(3, null, null, t), e.current = f, f.stateNode = e, t = bc(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: t
    }, Ec(f), e;
  }
  function Rv(e) {
    return e ? (e = fi, e) : fi;
  }
  function Mv(e, t, r, l, u, f) {
    u = Rv(u), l.context === null ? l.context = u : l.pendingContext = u, l = Ka(t), l.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (l.callback = f), r = Pa(e, l, t), r !== null && (gn(r, e, t), Sl(r, e, t));
  }
  function Av(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function Hd(e, t) {
    Av(e, t), (e = e.alternate) && Av(e, t);
  }
  function _v(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _r(e, 67108864);
      t !== null && gn(t, e, 67108864), Hd(e, 67108864);
    }
  }
  function Dv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Rn();
      t = V(t);
      var r = _r(e, t);
      r !== null && gn(r, e, t), Hd(e, t);
    }
  }
  var Uo = !0;
  function fE(e, t, r, l) {
    var u = O.T;
    O.T = null;
    var f = C.p;
    try {
      C.p = 2, qd(e, t, r, l);
    } finally {
      C.p = f, O.T = u;
    }
  }
  function hE(e, t, r, l) {
    var u = O.T;
    O.T = null;
    var f = C.p;
    try {
      C.p = 8, qd(e, t, r, l);
    } finally {
      C.p = f, O.T = u;
    }
  }
  function qd(e, t, r, l) {
    if (Uo) {
      var u = Id(l);
      if (u === null)
        Rd(
          e,
          t,
          l,
          Bo,
          r
        ), Ov(e, l);
      else if (pE(
        u,
        e,
        t,
        r,
        l
      ))
        l.stopPropagation();
      else if (Ov(e, l), t & 4 && -1 < mE.indexOf(e)) {
        for (; u !== null; ) {
          var f = yt(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var y = cn(f.pendingLanes);
                  if (y !== 0) {
                    var j = f;
                    for (j.pendingLanes |= 2, j.entangledLanes |= 2; y; ) {
                      var k = 1 << 31 - qt(y);
                      j.entanglements[1] |= k, y &= ~k;
                    }
                    fa(f), (We & 6) === 0 && (xo = Vt() + 500, Ul(0));
                  }
                }
                break;
              case 31:
              case 13:
                j = _r(f, 2), j !== null && gn(j, f, 2), wo(), Hd(f, 2);
            }
          if (f = Id(l), f === null && Rd(
            e,
            t,
            l,
            Bo,
            r
          ), f === u) break;
          u = f;
        }
        u !== null && l.stopPropagation();
      } else
        Rd(
          e,
          t,
          l,
          null,
          r
        );
    }
  }
  function Id(e) {
    return e = Yu(e), Fd(e);
  }
  var Bo = null;
  function Fd(e) {
    if (Bo = null, e = it(e), e !== null) {
      var t = c(e);
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
  function zv(e) {
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
          case Oe:
            return 2;
          case Pe:
            return 8;
          case et:
          case $t:
            return 32;
          case Ht:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Yd = !1, lr = null, sr = null, or = null, Fl = /* @__PURE__ */ new Map(), Yl = /* @__PURE__ */ new Map(), ur = [], mE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Ov(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        lr = null;
        break;
      case "dragenter":
      case "dragleave":
        sr = null;
        break;
      case "mouseover":
      case "mouseout":
        or = null;
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
  function Gl(e, t, r, l, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = yt(t), t !== null && _v(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function pE(e, t, r, l, u) {
    switch (t) {
      case "focusin":
        return lr = Gl(
          lr,
          e,
          t,
          r,
          l,
          u
        ), !0;
      case "dragenter":
        return sr = Gl(
          sr,
          e,
          t,
          r,
          l,
          u
        ), !0;
      case "mouseover":
        return or = Gl(
          or,
          e,
          t,
          r,
          l,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Fl.set(
          f,
          Gl(
            Fl.get(f) || null,
            e,
            t,
            r,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Yl.set(
          f,
          Gl(
            Yl.get(f) || null,
            e,
            t,
            r,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function kv(e) {
    var t = it(e.target);
    if (t !== null) {
      var r = c(t);
      if (r !== null) {
        if (t = r.tag, t === 13) {
          if (t = h(r), t !== null) {
            e.blockedOn = t, de(e.priority, function() {
              Dv(r);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(r), t !== null) {
            e.blockedOn = t, de(e.priority, function() {
              Dv(r);
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
      var r = Id(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        Fu = l, r.target.dispatchEvent(l), Fu = null;
      } else
        return t = yt(r), t !== null && _v(t), e.blockedOn = r, !1;
      t.shift();
    }
    return !0;
  }
  function Lv(e, t, r) {
    Vo(e) && r.delete(t);
  }
  function gE() {
    Yd = !1, lr !== null && Vo(lr) && (lr = null), sr !== null && Vo(sr) && (sr = null), or !== null && Vo(or) && (or = null), Fl.forEach(Lv), Yl.forEach(Lv);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Yd || (Yd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      gE
    )));
  }
  var Ho = null;
  function Uv(e) {
    Ho !== e && (Ho = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ho === e && (Ho = null);
        for (var t = 0; t < e.length; t += 3) {
          var r = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Fd(l || r) === null)
              continue;
            break;
          }
          var f = yt(r);
          f !== null && (e.splice(t, 3), t -= 3, Ic(
            f,
            {
              pending: !0,
              data: u,
              method: r.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function Li(e) {
    function t(k) {
      return $o(k, e);
    }
    lr !== null && $o(lr, e), sr !== null && $o(sr, e), or !== null && $o(or, e), Fl.forEach(t), Yl.forEach(t);
    for (var r = 0; r < ur.length; r++) {
      var l = ur[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      kv(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var u = r[l], f = r[l + 1], y = u[ge] || null;
        if (typeof f == "function")
          y || Uv(r);
        else if (y) {
          var j = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, y = f[ge] || null)
              j = y.formAction;
            else if (Fd(u) !== null) continue;
          } else j = y.action;
          typeof j == "function" ? r[l + 1] = j : (r.splice(l, 3), l -= 3), Uv(r);
        }
      }
  }
  function Bv() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(y) {
            return u = y;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), l || setTimeout(r, 20);
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
      var l = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(r, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Gd(e) {
    this._internalRoot = e;
  }
  qo.prototype.render = Gd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var r = t.current, l = Rn();
    Mv(r, l, e, t, null, null);
  }, qo.prototype.unmount = Gd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Mv(e.current, 2, null, e, null, null), wo(), t[Ee] = null;
    }
  };
  function qo(e) {
    this._internalRoot = e;
  }
  qo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ce();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < ur.length && t !== 0 && t < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && kv(e);
    }
  };
  var Vv = a.version;
  if (Vv !== "19.2.5")
    throw Error(
      s(
        527,
        Vv,
        "19.2.5"
      )
    );
  C.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? x(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var vE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Io = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Io.isDisabled && Io.supportsFiber)
      try {
        Qn = Io.inject(
          vE
        ), Qt = Io;
      } catch {
      }
  }
  return Kl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var r = !1, l = "", u = Gp, f = Xp, y = Kp;
    return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = Cv(
      e,
      1,
      !1,
      null,
      null,
      r,
      l,
      null,
      u,
      f,
      y,
      Bv
    ), e[Ee] = t.current, Cd(e), new Gd(t);
  }, Kl.hydrateRoot = function(e, t, r) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", f = Gp, y = Xp, j = Kp, k = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (y = r.onCaughtError), r.onRecoverableError !== void 0 && (j = r.onRecoverableError), r.formState !== void 0 && (k = r.formState)), t = Cv(
      e,
      1,
      !0,
      t,
      r ?? null,
      l,
      u,
      k,
      f,
      y,
      j,
      Bv
    ), t.context = Rv(null), r = t.current, l = Rn(), l = V(l), u = Ka(l), u.callback = null, Pa(r, u, l), r = l, t.current.lanes = r, rt(t, r), fa(t), e[Ee] = t.current, Cd(e), new qo(t);
  }, Kl.version = "19.2.5", Kl;
}
var Pv;
function RE() {
  if (Pv) return Pd.exports;
  Pv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Pd.exports = CE(), Pd.exports;
}
var ME = RE();
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
var Bb = (n) => {
  throw TypeError(n);
}, AE = (n, a, i) => a.has(n) || Bb("Cannot " + i), Wd = (n, a, i) => (AE(n, a, "read from private field"), i ? i.call(n) : a.get(n)), _E = (n, a, i) => a.has(n) ? Bb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, i);
function Qv(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function DE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: s = !1 } = n, o;
  o = a.map(
    (E, w) => x(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let c = v(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function v(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function p() {
    return o[c];
  }
  function x(E, w = null, N, R) {
    let T = qf(
      o ? p().pathname : "/",
      E,
      w,
      N,
      R
    );
    return Ct(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), T;
  }
  function g(E) {
    return typeof E == "string" ? E : ma(E);
  }
  return {
    get index() {
      return c;
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
      let w = typeof E == "string" ? ra(E) : E;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(E, w) {
      h = "PUSH";
      let N = Qv(E) ? E : x(E, w);
      c += 1, o.splice(c, o.length, N), s && m && m({ action: h, location: N, delta: 1 });
    },
    replace(E, w) {
      h = "REPLACE";
      let N = Qv(E) ? E : x(E, w);
      o[c] = N, s && m && m({ action: h, location: N, delta: 0 });
    },
    go(E) {
      h = "POP";
      let w = v(c + E), N = o[w];
      c = w, m && m({ action: h, location: N, delta: E });
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
function Ct(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function zE() {
  return Math.random().toString(36).substring(2, 10);
}
function qf(n, a, i = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ra(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || zE(),
    unstable_mask: o
  };
}
function ma({
  pathname: n = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (n += i.charAt(0) === "#" ? i : "#" + i), n;
}
function ra(n) {
  let a = {};
  if (n) {
    let i = n.indexOf("#");
    i >= 0 && (a.hash = n.substring(i), n = n.substring(0, i));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function OE(n, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), qe(i, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : ma(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = i + s), new URL(s, i);
}
var ls, Zv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (_E(this, ls, /* @__PURE__ */ new Map()), n)
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
    if (Wd(this, ls).has(n))
      return Wd(this, ls).get(n);
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
    Wd(this, ls).set(n, a);
  }
};
ls = /* @__PURE__ */ new WeakMap();
var kE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function LE(n) {
  return kE.has(
    n
  );
}
var UE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function BE(n) {
  return UE.has(
    n
  );
}
function VE(n) {
  return n.index === !0;
}
function hs(n, a, i = [], s = {}, o = !1) {
  return n.map((c, h) => {
    let m = [...i, String(h)], v = typeof c.id == "string" ? c.id : m.join("-");
    if (qe(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), qe(
      o || !s[v],
      `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
    ), VE(c)) {
      let p = {
        ...c,
        id: v
      };
      return s[v] = Jv(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...c,
        id: v,
        children: void 0
      };
      return s[v] = Jv(
        p,
        a(p)
      ), c.children && (p.children = hs(
        c.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function Jv(n, a) {
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
function pr(n, a, i = "/") {
  return ss(n, a, i, !1);
}
function ss(n, a, i, s) {
  let o = typeof a == "string" ? ra(a) : a, c = Kn(o.pathname || "/", i);
  if (c == null)
    return null;
  let h = Vb(n);
  HE(h);
  let m = null;
  for (let v = 0; m == null && v < h.length; ++v) {
    let p = JE(c);
    m = QE(
      h[v],
      p,
      s
    );
  }
  return m;
}
function $E(n, a) {
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
function Vb(n, a = [], i = [], s = "", o = !1) {
  let c = (h, m, v = o, p) => {
    let x = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (x.relativePath.startsWith("/")) {
      if (!x.relativePath.startsWith(s) && v)
        return;
      qe(
        x.relativePath.startsWith(s),
        `Absolute route path "${x.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), x.relativePath = x.relativePath.slice(s.length);
    }
    let g = Yn([s, x.relativePath]), S = i.concat(x);
    h.children && h.children.length > 0 && (qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Vb(
      h.children,
      a,
      S,
      g,
      v
    )), !(h.path == null && !h.index) && a.push({
      path: g,
      score: KE(g, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      c(h, m);
    else
      for (let v of $b(h.path))
        c(h, m, !0, v);
  }), a;
}
function $b(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [i, ...s] = a, o = i.endsWith("?"), c = i.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let h = $b(s.join("/")), m = [];
  return m.push(
    ...h.map(
      (v) => v === "" ? c : [c, v].join("/")
    )
  ), o && m.push(...h), m.map(
    (v) => n.startsWith("/") && v === "" ? "/" : v
  );
}
function HE(n) {
  n.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : PE(
      a.routesMeta.map((s) => s.childrenIndex),
      i.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var qE = /^:[\w-]+$/, IE = 3, FE = 2, YE = 1, GE = 10, XE = -2, Wv = (n) => n === "*";
function KE(n, a) {
  let i = n.split("/"), s = i.length;
  return i.some(Wv) && (s += XE), a && (s += FE), i.filter((o) => !Wv(o)).reduce(
    (o, c) => o + (qE.test(c) ? IE : c === "" ? YE : GE),
    s
  );
}
function PE(n, a) {
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
function QE(n, a, i = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", h = [];
  for (let m = 0; m < s.length; ++m) {
    let v = s[m], p = m === s.length - 1, x = c === "/" ? a : a.slice(c.length) || "/", g = pu(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: p },
      x
    ), S = v.route;
    if (!g && p && i && !s[s.length - 1].route.index && (g = pu(
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
      pathname: Yn([c, g.pathname]),
      pathnameBase: tj(
        Yn([c, g.pathnameBase])
      ),
      route: S
    }), g.pathnameBase !== "/" && (c = Yn([c, g.pathnameBase]));
  }
  return h;
}
function pu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [i, s] = ZE(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(i);
  if (!o) return null;
  let c = o[0], h = c.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (p, { paramName: x, isOptional: g }, S) => {
        if (x === "*") {
          let w = m[S] || "";
          h = c.slice(0, c.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = m[S];
        return g && !E ? p[x] = void 0 : p[x] = (E || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: c,
    pathnameBase: h,
    pattern: n
  };
}
function ZE(n, a = !1, i = !0) {
  Ct(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, v, p, x) => {
      if (s.push({ paramName: m, isOptional: v != null }), v) {
        let g = x.charAt(p + h.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function JE(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Ct(
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
function WE({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Yn([n, a]);
}
var Hb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, yh = (n) => Hb.test(n);
function ej(n, a = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? ra(n) : n, c;
  return i ? (i = xh(i), i.startsWith("/") ? c = ey(i.substring(1), "/") : c = ey(i, a)) : c = a, {
    pathname: c,
    search: nj(s),
    hash: aj(o)
  };
}
function ey(n, a) {
  let i = gu(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function ef(n, a, i, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function qb(n) {
  return n.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function bh(n) {
  let a = qb(n);
  return a.map(
    (i, s) => s === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Cu(n, a, i, s = !1) {
  let o;
  typeof n == "string" ? o = ra(n) : (o = { ...n }, qe(
    !o.pathname || !o.pathname.includes("?"),
    ef("?", "pathname", "search", o)
  ), qe(
    !o.pathname || !o.pathname.includes("#"),
    ef("#", "pathname", "hash", o)
  ), qe(
    !o.search || !o.search.includes("#"),
    ef("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", h = c ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let g = a.length - 1;
    if (!s && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), g -= 1;
      o.pathname = S.join("/");
    }
    m = g >= 0 ? a[g] : "/";
  }
  let v = ej(o, m), p = h && h !== "/" && h.endsWith("/"), x = (c || h === ".") && i.endsWith("/");
  return !v.pathname.endsWith("/") && (p || x) && (v.pathname += "/"), v;
}
var xh = (n) => n.replace(/\/\/+/g, "/"), Yn = (n) => xh(n.join("/")), gu = (n) => n.replace(/\/+$/, ""), tj = (n) => gu(n).replace(/^\/*/, "/"), nj = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, aj = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, rj = (n, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let s = new Headers(i.headers);
  return s.set("Location", n), new Response(null, { ...i, headers: s });
}, Ru = class {
  constructor(n, a, i, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function ms(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function Ss(n) {
  let a = n.map((i) => i.route.path).filter(Boolean);
  return Yn(a) || "/";
}
var Ib = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Fb(n, a) {
  let i = n;
  if (typeof i != "string" || !Hb.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let s = i, o = !1;
  if (Ib)
    try {
      let c = new URL(window.location.href), h = i.startsWith("//") ? new URL(c.protocol + i) : new URL(i), m = Kn(h.pathname, a);
      h.origin === c.origin && m != null ? i = m + h.search + h.hash : o = !0;
    } catch {
      Ct(
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
var vr = Symbol("Uninstrumented");
function ij(n, a) {
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
      instrument(c) {
        let h = Object.keys(i);
        for (let m of h)
          c[m] && i[m].push(c[m]);
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
    ["middleware", "loader", "action"].forEach((c) => {
      let h = o[c], m = i[`lazy.${c}`];
      if (typeof h == "function" && m.length > 0) {
        let v = Fi(m, h, () => {
        });
        v && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: v
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && i[o].length > 0) {
      let h = c[vr] ?? c, m = Fi(
        i[o],
        h,
        (...v) => ty(v[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[vr] = h, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[vr] ?? o, h = Fi(
      i.middleware,
      c,
      (...m) => ty(m[0])
    );
    return h ? (h[vr] = c, h) : o;
  })), s;
}
function lj(n, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let h of c)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let s = n.navigate[vr] ?? n.navigate, o = Fi(
      i.navigate,
      s,
      (...c) => {
        let [h, m] = c;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? ma(h) : ".",
          ...ny(n, m ?? {})
        };
      }
    );
    o && (o[vr] = s, n.navigate = o);
  }
  if (i.fetch.length > 0) {
    let s = n.fetch[vr] ?? n.fetch, o = Fi(i.fetch, s, (...c) => {
      let [h, , m, v] = c;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...ny(n, v ?? {})
      };
    });
    o && (o[vr] = s, n.fetch = o);
  }
  return n;
}
function Fi(n, a, i) {
  return n.length === 0 ? null : async (...s) => {
    let o = await Yb(
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
async function Yb(n, a, i, s) {
  let o = n[s], c;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = Yb(n, a, i, s - 1), c = await h, qe(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (v) {
      console.error("An instrumentation function threw an error:", v);
    }
    h || await m(), await h;
  } else
    try {
      c = { type: "success", value: await i() };
    } catch (h) {
      c = { type: "error", value: h };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function ty(n) {
  let { request: a, context: i, params: s, unstable_pattern: o } = n;
  return {
    request: sj(a),
    params: { ...s },
    unstable_pattern: o,
    context: oj(i)
  };
}
function ny(n, a) {
  return {
    currentUrl: ma(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function sj(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function oj(n) {
  if (cj(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var uj = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function cj(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === uj;
}
var Gb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], dj = new Set(
  Gb
), fj = [
  "GET",
  ...Gb
], hj = new Set(fj), Xb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), mj = /* @__PURE__ */ new Set([307, 308]), tf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, pj = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Pl = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, gj = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Kb = "remix-router-transitions", Pb = Symbol("ResetLoaderData");
function vj(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  qe(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || gj, c = o;
  if (n.unstable_instrumentations) {
    let z = n.unstable_instrumentations;
    c = (V) => ({
      ...o(V),
      ...ij(
        z.map((F) => F.route).filter(Boolean),
        V
      )
    });
  }
  let h = {}, m = hs(
    n.routes,
    c,
    void 0,
    h
  ), v, p = n.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let x = n.dataStrategy || wj, g = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, E = /* @__PURE__ */ new Set(), w = null, N = null, R = null, T = n.hydrationData != null, L = pr(m, n.history.location, p), M = !1, _ = null, Z, te;
  if (L == null && !n.patchRoutesOnNavigation) {
    let z = Fn(404, {
      pathname: n.history.location.pathname
    }), { matches: V, route: F } = Fo(m);
    Z = !0, te = !Z, L = V, _ = { [F.id]: z };
  } else if (L && !n.hydrationData && Sn(
    L,
    m,
    n.history.location.pathname
  ).active && (L = null), L)
    if (L.some((z) => z.route.lazy))
      Z = !1, te = !Z;
    else if (!L.some((z) => Sh(z.route)))
      Z = !0, te = !Z;
    else {
      let z = n.hydrationData ? n.hydrationData.loaderData : null, V = n.hydrationData ? n.hydrationData.errors : null, F = L;
      if (V) {
        let ce = L.findIndex(
          (de) => V[de.route.id] !== void 0
        );
        F = F.slice(0, ce + 1);
      }
      te = !1, Z = !0, F.forEach((ce) => {
        let de = Qb(ce.route, z, V);
        te = te || de.renderFallback, Z = Z && !de.shouldLoad;
      });
    }
  else {
    Z = !1, te = !Z, L = [];
    let z = Sn(
      null,
      m,
      n.history.location.pathname
    );
    z.active && z.matches && (M = !0, L = z.matches);
  }
  let ne, D = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: L,
    initialized: Z,
    renderFallback: te,
    navigation: tf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || _,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, H = "POP", q = null, oe = !1, I, Y = !1, se = /* @__PURE__ */ new Map(), J = null, O = !1, C = !1, B = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Map(), re = 0, A = -1, Q = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), ze = /* @__PURE__ */ new Map(), _e, Ve = null;
  function Ut() {
    if (S = n.history.listen(
      ({ action: z, location: V, delta: F }) => {
        if (_e) {
          _e(), _e = void 0;
          return;
        }
        Ct(
          ze.size === 0 || F != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ce = la({
          currentLocation: D.location,
          nextLocation: V,
          historyAction: z
        });
        if (ce && F != null) {
          let de = new Promise((Se) => {
            _e = Se;
          });
          n.history.go(F * -1), Zn(ce, {
            state: "blocked",
            location: V,
            proceed() {
              Zn(ce, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: V
              }), de.then(() => n.history.go(F));
            },
            reset() {
              let Se = new Map(D.blockers);
              Se.set(ce, Pl), Ne({ blockers: Se });
            }
          }), q?.resolve(), q = null;
          return;
        }
        return at(z, V);
      }
    ), i) {
      $j(a, se);
      let z = () => Hj(a, se);
      a.addEventListener("pagehide", z), J = () => a.removeEventListener("pagehide", z);
    }
    return D.initialized || at("POP", D.location, {
      initialHydration: !0
    }), ne;
  }
  function Yt() {
    S && S(), J && J(), E.clear(), I && I.abort(), D.fetchers.forEach((z, V) => Qn(V)), D.blockers.forEach((z, V) => ga(V));
  }
  function me(z) {
    return E.add(z), () => E.delete(z);
  }
  function Ne(z, V = {}) {
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
    let F = [], ce = [];
    D.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ve.has(Se) ? F.push(Se) : ce.push(Se));
    }), ve.forEach((de) => {
      !D.fetchers.has(de) && !P.has(de) && F.push(de);
    }), [...E].forEach(
      (de) => de(D, {
        deletedFetchers: F,
        newErrors: z.errors ?? null,
        viewTransitionOpts: V.viewTransitionOpts,
        flushSync: V.flushSync === !0
      })
    ), F.forEach((de) => Qn(de)), ce.forEach((de) => D.fetchers.delete(de));
  }
  function Ce(z, V, { flushSync: F } = {}) {
    let ce = D.actionData != null && D.navigation.formMethod != null && ln(D.navigation.formMethod) && D.navigation.state === "loading" && z.state?._isRedirect !== !0, de;
    V.actionData ? Object.keys(V.actionData).length > 0 ? de = V.actionData : de = null : ce ? de = D.actionData : de = null;
    let Se = V.loaderData ? hy(
      D.loaderData,
      V.loaderData,
      V.matches || [],
      V.errors
    ) : D.loaderData, pe = D.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Ae, Te) => pe.set(Te, Pl)));
    let ge = O ? !1 : It(z, V.matches || D.matches), Ee = oe === !0 || D.navigation.formMethod != null && ln(D.navigation.formMethod) && z.state?._isRedirect !== !0;
    v && (m = v, v = void 0), O || H === "POP" || (H === "PUSH" ? n.history.push(z, z.state) : H === "REPLACE" && n.history.replace(z, z.state));
    let be;
    if (H === "POP") {
      let Ae = se.get(D.location.pathname);
      Ae && Ae.has(z.pathname) ? be = {
        currentLocation: D.location,
        nextLocation: z
      } : se.has(z.pathname) && (be = {
        currentLocation: z,
        nextLocation: D.location
      });
    } else if (Y) {
      let Ae = se.get(D.location.pathname);
      Ae ? Ae.add(z.pathname) : (Ae = /* @__PURE__ */ new Set([z.pathname]), se.set(D.location.pathname, Ae)), be = {
        currentLocation: D.location,
        nextLocation: z
      };
    }
    Ne(
      {
        ...V,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: H,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: tf,
        revalidation: "idle",
        restoreScrollPosition: ge,
        preventScrollReset: Ee,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: F === !0
      }
    ), H = "POP", oe = !1, Y = !1, O = !1, C = !1, q?.resolve(), q = null, Ve?.resolve(), Ve = null;
  }
  async function Re(z, V) {
    if (q?.resolve(), q = null, typeof z == "number") {
      q || (q = vy());
      let ct = q.promise;
      return n.history.go(z), ct;
    }
    let F = If(
      D.location,
      D.matches,
      p,
      z,
      V?.fromRouteId,
      V?.relative
    ), { path: ce, submission: de, error: Se } = ay(
      !1,
      F,
      V
    ), pe;
    V?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof V.unstable_mask == "string" ? ra(V.unstable_mask) : {
        ...D.location.unstable_mask,
        ...V.unstable_mask
      }
    });
    let ge = D.location, Ee = qf(
      ge,
      ce,
      V && V.state,
      void 0,
      pe
    );
    Ee = {
      ...Ee,
      ...n.history.encodeLocation(Ee)
    };
    let be = V && V.replace != null ? V.replace : void 0, Ae = "PUSH";
    be === !0 ? Ae = "REPLACE" : be === !1 || de != null && ln(de.formMethod) && de.formAction === D.location.pathname + D.location.search && (Ae = "REPLACE");
    let Te = V && "preventScrollReset" in V ? V.preventScrollReset === !0 : void 0, Qe = (V && V.flushSync) === !0, $e = la({
      currentLocation: ge,
      nextLocation: Ee,
      historyAction: Ae
    });
    if ($e) {
      Zn($e, {
        state: "blocked",
        location: Ee,
        proceed() {
          Zn($e, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), Re(z, V);
        },
        reset() {
          let ct = new Map(D.blockers);
          ct.set($e, Pl), Ne({ blockers: ct });
        }
      });
      return;
    }
    await at(Ae, Ee, {
      submission: de,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Te,
      replace: V && V.replace,
      enableViewTransition: V && V.viewTransition,
      flushSync: Qe,
      callSiteDefaultShouldRevalidate: V && V.unstable_defaultShouldRevalidate
    });
  }
  function Kt() {
    Ve || (Ve = vy()), et(), Ne({ revalidation: "loading" });
    let z = Ve.promise;
    return D.navigation.state === "submitting" ? z : D.navigation.state === "idle" ? (at(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), z) : (at(
      H || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: Y === !0
      }
    ), z);
  }
  async function at(z, V, F) {
    I && I.abort(), I = null, H = z, O = (F && F.startUninterruptedRevalidation) === !0, Rt(D.location, D.matches), oe = (F && F.preventScrollReset) === !0, Y = (F && F.enableViewTransition) === !0;
    let ce = v || m, de = F && F.overrideNavigation, Se = F?.initialHydration && D.matches && D.matches.length > 0 && !M ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : pr(ce, V, p), pe = (F && F.flushSync) === !0;
    if (Se && D.initialized && !C && Aj(D.location, V) && !(F && F.submission && ln(F.submission.formMethod))) {
      Ce(V, { matches: Se }, { flushSync: pe });
      return;
    }
    let ge = Sn(Se, ce, V.pathname);
    if (ge.active && ge.matches && (Se = ge.matches), !Se) {
      let { error: it, notFoundMatches: yt, route: Ie } = cn(
        V.pathname
      );
      Ce(
        V,
        {
          matches: yt,
          loaderData: {},
          errors: {
            [Ie.id]: it
          }
        },
        { flushSync: pe }
      );
      return;
    }
    I = new AbortController();
    let Ee = qi(
      n.history,
      V,
      I.signal,
      F && F.submission
    ), be = n.getContext ? await n.getContext() : new Zv(), Ae;
    if (F && F.pendingError)
      Ae = [
        gr(Se).route.id,
        { type: "error", error: F.pendingError }
      ];
    else if (F && F.submission && ln(F.submission.formMethod)) {
      let it = await on(
        Ee,
        V,
        F.submission,
        Se,
        be,
        ge.active,
        F && F.initialHydration === !0,
        { replace: F.replace, flushSync: pe }
      );
      if (it.shortCircuited)
        return;
      if (it.pendingActionResult) {
        let [yt, Ie] = it.pendingActionResult;
        if (An(Ie) && ms(Ie.error) && Ie.error.status === 404) {
          I = null, Ce(V, {
            matches: it.matches,
            loaderData: {},
            errors: {
              [yt]: Ie.error
            }
          });
          return;
        }
      }
      Se = it.matches || Se, Ae = it.pendingActionResult, de = nf(V, F.submission), pe = !1, ge.active = !1, Ee = qi(
        n.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Te,
      matches: Qe,
      loaderData: $e,
      errors: ct
    } = await Pt(
      Ee,
      V,
      Se,
      be,
      ge.active,
      de,
      F && F.submission,
      F && F.fetcherSubmission,
      F && F.replace,
      F && F.initialHydration === !0,
      pe,
      Ae,
      F && F.callSiteDefaultShouldRevalidate
    );
    Te || (I = null, Ce(V, {
      matches: Qe || Se,
      ...my(Ae),
      loaderData: $e,
      errors: ct
    }));
  }
  async function on(z, V, F, ce, de, Se, pe, ge = {}) {
    et();
    let Ee = Bj(V, F);
    if (Ne({ navigation: Ee }, { flushSync: ge.flushSync === !0 }), Se) {
      let Te = await rt(
        ce,
        V.pathname,
        z.signal
      );
      if (Te.type === "aborted")
        return { shortCircuited: !0 };
      if (Te.type === "error") {
        if (Te.partialMatches.length === 0) {
          let { matches: $e, route: ct } = Fo(m);
          return {
            matches: $e,
            pendingActionResult: [
              ct.id,
              {
                type: "error",
                error: Te.error
              }
            ]
          };
        }
        let Qe = gr(Te.partialMatches).route.id;
        return {
          matches: Te.partialMatches,
          pendingActionResult: [
            Qe,
            {
              type: "error",
              error: Te.error
            }
          ]
        };
      } else if (Te.matches)
        ce = Te.matches;
      else {
        let { notFoundMatches: Qe, error: $e, route: ct } = cn(
          V.pathname
        );
        return {
          matches: Qe,
          pendingActionResult: [
            ct.id,
            {
              type: "error",
              error: $e
            }
          ]
        };
      }
    }
    let be, Ae = su(ce, V);
    if (!Ae.route.action && !Ae.route.lazy)
      be = {
        type: "error",
        error: Fn(405, {
          method: z.method,
          pathname: V.pathname,
          routeId: Ae.route.id
        })
      };
    else {
      let Te = Ki(
        c,
        h,
        z,
        V,
        ce,
        Ae,
        pe ? [] : s,
        de
      ), Qe = await Oe(
        z,
        V,
        Te,
        de,
        null
      );
      if (be = Qe[Ae.route.id], !be) {
        for (let $e of ce)
          if (Qe[$e.route.id]) {
            be = Qe[$e.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(be)) {
      let Te;
      return ge && ge.replace != null ? Te = ge.replace : Te = cy(
        be.response.headers.get("Location"),
        new URL(z.url),
        p,
        n.history
      ) === D.location.pathname + D.location.search, await ye(z, be, !0, {
        submission: F,
        replace: Te
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Te = gr(ce, Ae.route.id);
      return (ge && ge.replace) !== !0 && (H = "PUSH"), {
        matches: ce,
        pendingActionResult: [
          Te.route.id,
          be,
          Ae.route.id
        ]
      };
    }
    return {
      matches: ce,
      pendingActionResult: [Ae.route.id, be]
    };
  }
  async function Pt(z, V, F, ce, de, Se, pe, ge, Ee, be, Ae, Te, Qe) {
    let $e = Se || nf(V, pe), ct = pe || ge || gy($e), it = !O && !be;
    if (de) {
      if (it) {
        let jt = xn(Te);
        Ne(
          {
            navigation: $e,
            ...jt !== void 0 ? { actionData: jt } : {}
          },
          {
            flushSync: Ae
          }
        );
      }
      let He = await rt(
        F,
        V.pathname,
        z.signal
      );
      if (He.type === "aborted")
        return { shortCircuited: !0 };
      if (He.type === "error") {
        if (He.partialMatches.length === 0) {
          let { matches: an, route: At } = Fo(m);
          return {
            matches: an,
            loaderData: {},
            errors: {
              [At.id]: He.error
            }
          };
        }
        let jt = gr(He.partialMatches).route.id;
        return {
          matches: He.partialMatches,
          loaderData: {},
          errors: {
            [jt]: He.error
          }
        };
      } else if (He.matches)
        F = He.matches;
      else {
        let { error: jt, notFoundMatches: an, route: At } = cn(
          V.pathname
        );
        return {
          matches: an,
          loaderData: {},
          errors: {
            [At.id]: jt
          }
        };
      }
    }
    let yt = v || m, { dsMatches: Ie, revalidatingFetchers: Mt } = ry(
      z,
      ce,
      c,
      h,
      n.history,
      D,
      F,
      ct,
      V,
      be ? [] : s,
      be === !0,
      C,
      B,
      ve,
      ue,
      ee,
      yt,
      p,
      n.patchRoutesOnNavigation != null,
      Te,
      Qe
    );
    if (A = ++re, !n.dataStrategy && !Ie.some((He) => He.shouldLoad) && !Ie.some(
      (He) => He.route.middleware && He.route.middleware.length > 0
    ) && Mt.length === 0) {
      let He = ei();
      return Ce(
        V,
        {
          matches: F,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Te && An(Te[1]) ? { [Te[0]]: Te[1].error } : null,
          ...my(Te),
          ...He ? { fetchers: new Map(D.fetchers) } : {}
        },
        { flushSync: Ae }
      ), { shortCircuited: !0 };
    }
    if (it) {
      let He = {};
      if (!de) {
        He.navigation = $e;
        let jt = xn(Te);
        jt !== void 0 && (He.actionData = jt);
      }
      Mt.length > 0 && (He.fetchers = pa(Mt)), Ne(He, { flushSync: Ae });
    }
    Mt.forEach((He) => {
      Et(He.key), He.controller && P.set(He.key, He.controller);
    });
    let ht = () => Mt.forEach((He) => Et(He.key));
    I && I.signal.addEventListener(
      "abort",
      ht
    );
    let { loaderResults: Ha, fetcherResults: Jn } = await Pe(
      Ie,
      Mt,
      z,
      V,
      ce
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    I && I.signal.removeEventListener(
      "abort",
      ht
    ), Mt.forEach((He) => P.delete(He.key));
    let Gt = Yo(Ha);
    if (Gt)
      return await ye(z, Gt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Gt = Yo(Jn), Gt)
      return ee.add(Gt.key), await ye(z, Gt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: sa, errors: Tr } = fy(
      D,
      F,
      Ha,
      Te,
      Mt,
      Jn
    );
    be && D.errors && (Tr = { ...D.errors, ...Tr });
    let oa = ei(), Cr = $a(A), ti = oa || Cr || Mt.length > 0;
    return {
      matches: F,
      loaderData: sa,
      errors: Tr,
      ...ti ? { fetchers: new Map(D.fetchers) } : {}
    };
  }
  function xn(z) {
    if (z && !An(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function pa(z) {
    return z.forEach((V) => {
      let F = D.fetchers.get(V.key), ce = Ql(
        void 0,
        F ? F.data : void 0
      );
      D.fetchers.set(V.key, ce);
    }), new Map(D.fetchers);
  }
  async function Bt(z, V, F, ce) {
    Et(z);
    let de = (ce && ce.flushSync) === !0, Se = v || m, pe = If(
      D.location,
      D.matches,
      p,
      F,
      V,
      ce?.relative
    ), ge = pr(Se, pe, p), Ee = Sn(ge, Se, pe);
    if (Ee.active && Ee.matches && (ge = Ee.matches), !ge) {
      Ht(
        z,
        V,
        Fn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Ae, error: Te } = ay(
      !0,
      pe,
      ce
    );
    if (Te) {
      Ht(z, V, Te, { flushSync: de });
      return;
    }
    let Qe = n.getContext ? await n.getContext() : new Zv(), $e = (ce && ce.preventScrollReset) === !0;
    if (Ae && ln(Ae.formMethod)) {
      await zn(
        z,
        V,
        be,
        ge,
        Qe,
        Ee.active,
        de,
        $e,
        Ae,
        ce && ce.unstable_defaultShouldRevalidate
      );
      return;
    }
    ue.set(z, { routeId: V, path: be }), await Vt(
      z,
      V,
      be,
      ge,
      Qe,
      Ee.active,
      de,
      $e,
      Ae
    );
  }
  async function zn(z, V, F, ce, de, Se, pe, ge, Ee, be) {
    et(), ue.delete(z);
    let Ae = D.fetchers.get(z);
    $t(z, Vj(Ee, Ae), {
      flushSync: pe
    });
    let Te = new AbortController(), Qe = qi(
      n.history,
      F,
      Te.signal,
      Ee
    );
    if (Se) {
      let pt = await rt(
        ce,
        new URL(Qe.url).pathname,
        Qe.signal,
        z
      );
      if (pt.type === "aborted")
        return;
      if (pt.type === "error") {
        Ht(z, V, pt.error, { flushSync: pe });
        return;
      } else if (pt.matches)
        ce = pt.matches;
      else {
        Ht(
          z,
          V,
          Fn(404, { pathname: F }),
          { flushSync: pe }
        );
        return;
      }
    }
    let $e = su(ce, F);
    if (!$e.route.action && !$e.route.lazy) {
      let pt = Fn(405, {
        method: Ee.formMethod,
        pathname: F,
        routeId: V
      });
      Ht(z, V, pt, { flushSync: pe });
      return;
    }
    P.set(z, Te);
    let ct = re, it = Ki(
      c,
      h,
      Qe,
      F,
      ce,
      $e,
      s,
      de
    ), yt = await Oe(
      Qe,
      F,
      it,
      de,
      z
    ), Ie = yt[$e.route.id];
    if (!Ie) {
      for (let pt of it)
        if (yt[pt.route.id]) {
          Ie = yt[pt.route.id];
          break;
        }
    }
    if (Qe.signal.aborted) {
      P.get(z) === Te && P.delete(z);
      return;
    }
    if (ve.has(z)) {
      if (Gr(Ie) || An(Ie)) {
        $t(z, ka(void 0));
        return;
      }
    } else {
      if (Gr(Ie))
        if (P.delete(z), A > ct) {
          $t(z, ka(void 0));
          return;
        } else
          return ee.add(z), $t(z, Ql(Ee)), ye(Qe, Ie, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ge
          });
      if (An(Ie)) {
        Ht(z, V, Ie.error);
        return;
      }
    }
    let Mt = D.navigation.location || D.location, ht = qi(
      n.history,
      Mt,
      Te.signal
    ), Ha = v || m, Jn = D.navigation.state !== "idle" ? pr(Ha, D.navigation.location, p) : D.matches;
    qe(Jn, "Didn't find any matches after fetcher action");
    let Gt = ++re;
    Q.set(z, Gt);
    let sa = Ql(Ee, Ie.data);
    D.fetchers.set(z, sa);
    let { dsMatches: Tr, revalidatingFetchers: oa } = ry(
      ht,
      de,
      c,
      h,
      n.history,
      D,
      Jn,
      Ee,
      Mt,
      s,
      !1,
      C,
      B,
      ve,
      ue,
      ee,
      Ha,
      p,
      n.patchRoutesOnNavigation != null,
      [$e.route.id, Ie],
      be
    );
    oa.filter((pt) => pt.key !== z).forEach((pt) => {
      let ni = pt.key, ai = D.fetchers.get(ni), Ds = Ql(
        void 0,
        ai ? ai.data : void 0
      );
      D.fetchers.set(ni, Ds), Et(ni), pt.controller && P.set(ni, pt.controller);
    }), Ne({ fetchers: new Map(D.fetchers) });
    let Cr = () => oa.forEach((pt) => Et(pt.key));
    Te.signal.addEventListener(
      "abort",
      Cr
    );
    let { loaderResults: ti, fetcherResults: He } = await Pe(
      Tr,
      oa,
      ht,
      Mt,
      de
    );
    if (Te.signal.aborted)
      return;
    if (Te.signal.removeEventListener(
      "abort",
      Cr
    ), Q.delete(z), P.delete(z), oa.forEach((pt) => P.delete(pt.key)), D.fetchers.has(z)) {
      let pt = ka(Ie.data);
      D.fetchers.set(z, pt);
    }
    let jt = Yo(ti);
    if (jt)
      return ye(
        ht,
        jt.result,
        !1,
        { preventScrollReset: ge }
      );
    if (jt = Yo(He), jt)
      return ee.add(jt.key), ye(
        ht,
        jt.result,
        !1,
        { preventScrollReset: ge }
      );
    let { loaderData: an, errors: At } = fy(
      D,
      Jn,
      ti,
      void 0,
      oa,
      He
    );
    $a(Gt), D.navigation.state === "loading" && Gt > A ? (qe(H, "Expected pending action"), I && I.abort(), Ce(D.navigation.location, {
      matches: Jn,
      loaderData: an,
      errors: At,
      fetchers: new Map(D.fetchers)
    })) : (Ne({
      errors: At,
      loaderData: hy(
        D.loaderData,
        an,
        Jn,
        At
      ),
      fetchers: new Map(D.fetchers)
    }), C = !1);
  }
  async function Vt(z, V, F, ce, de, Se, pe, ge, Ee) {
    let be = D.fetchers.get(z);
    $t(
      z,
      Ql(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: pe }
    );
    let Ae = new AbortController(), Te = qi(
      n.history,
      F,
      Ae.signal
    );
    if (Se) {
      let Ie = await rt(
        ce,
        new URL(Te.url).pathname,
        Te.signal,
        z
      );
      if (Ie.type === "aborted")
        return;
      if (Ie.type === "error") {
        Ht(z, V, Ie.error, { flushSync: pe });
        return;
      } else if (Ie.matches)
        ce = Ie.matches;
      else {
        Ht(
          z,
          V,
          Fn(404, { pathname: F }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Qe = su(ce, F);
    P.set(z, Ae);
    let $e = re, ct = Ki(
      c,
      h,
      Te,
      F,
      ce,
      Qe,
      s,
      de
    ), it = await Oe(
      Te,
      F,
      ct,
      de,
      z
    ), yt = it[Qe.route.id];
    if (!yt) {
      for (let Ie of ce)
        if (it[Ie.route.id]) {
          yt = it[Ie.route.id];
          break;
        }
    }
    if (P.get(z) === Ae && P.delete(z), !Te.signal.aborted) {
      if (ve.has(z)) {
        $t(z, ka(void 0));
        return;
      }
      if (Gr(yt))
        if (A > $e) {
          $t(z, ka(void 0));
          return;
        } else {
          ee.add(z), await ye(Te, yt, !1, {
            preventScrollReset: ge
          });
          return;
        }
      if (An(yt)) {
        Ht(z, V, yt.error);
        return;
      }
      $t(z, ka(yt.data));
    }
  }
  async function ye(z, V, F, {
    submission: ce,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    F || (q?.resolve(), q = null), V.response.headers.has("X-Remix-Revalidate") && (C = !0);
    let ge = V.response.headers.get("Location");
    qe(ge, "Expected a Location header on the redirect Response"), ge = cy(
      ge,
      new URL(z.url),
      p,
      n.history
    );
    let Ee = qf(D.location, ge, {
      _isRedirect: !0
    });
    if (i) {
      let ct = !1;
      if (V.response.headers.has("X-Remix-Reload-Document"))
        ct = !0;
      else if (yh(ge)) {
        const it = OE(ge, !0);
        ct = // Hard reload if it's an absolute URL to a new origin
        it.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(it.pathname, p) == null;
      }
      if (ct) {
        pe ? a.location.replace(ge) : a.location.assign(ge);
        return;
      }
    }
    I = null;
    let be = pe === !0 || V.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ae, formAction: Te, formEncType: Qe } = D.navigation;
    !ce && !de && Ae && Te && Qe && (ce = gy(D.navigation));
    let $e = ce || de;
    if (mj.has(V.response.status) && $e && ln($e.formMethod))
      await at(be, Ee, {
        submission: {
          ...$e,
          formAction: ge
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || oe,
        enableViewTransition: F ? Y : void 0
      });
    else {
      let ct = nf(
        Ee,
        ce
      );
      await at(be, Ee, {
        overrideNavigation: ct,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || oe,
        enableViewTransition: F ? Y : void 0
      });
    }
  }
  async function Oe(z, V, F, ce, de) {
    let Se, pe = {};
    try {
      Se = await jj(
        x,
        z,
        V,
        F,
        de,
        ce,
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
    if (!ln(z.method))
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
      if (Oj(Ee)) {
        let be = Ee.result;
        pe[ge] = {
          type: "redirect",
          response: Rj(
            be,
            z,
            ge,
            F,
            p
          )
        };
      } else
        pe[ge] = await Cj(Ee);
    return pe;
  }
  async function Pe(z, V, F, ce, de) {
    let Se = Oe(
      F,
      ce,
      z,
      de,
      null
    ), pe = Promise.all(
      V.map(async (be) => {
        if (be.matches && be.match && be.request && be.controller) {
          let Te = (await Oe(
            be.request,
            be.path,
            be.matches,
            de,
            be.key
          ))[be.match.route.id];
          return { [be.key]: Te };
        } else
          return Promise.resolve({
            [be.key]: {
              type: "error",
              error: Fn(404, {
                pathname: be.path
              })
            }
          });
      })
    ), ge = await Se, Ee = (await pe).reduce(
      (be, Ae) => Object.assign(be, Ae),
      {}
    );
    return {
      loaderResults: ge,
      fetcherResults: Ee
    };
  }
  function et() {
    C = !0, ue.forEach((z, V) => {
      P.has(V) && B.add(V), Et(V);
    });
  }
  function $t(z, V, F = {}) {
    D.fetchers.set(z, V), Ne(
      { fetchers: new Map(D.fetchers) },
      { flushSync: (F && F.flushSync) === !0 }
    );
  }
  function Ht(z, V, F, ce = {}) {
    let de = gr(D.matches, V);
    Qn(z), Ne(
      {
        errors: {
          [de.route.id]: F
        },
        fetchers: new Map(D.fetchers)
      },
      { flushSync: (ce && ce.flushSync) === !0 }
    );
  }
  function Nr(z) {
    return fe.set(z, (fe.get(z) || 0) + 1), ve.has(z) && ve.delete(z), D.fetchers.get(z) || pj;
  }
  function ia(z, V) {
    Et(z, V?.reason), $t(z, ka(null));
  }
  function Qn(z) {
    let V = D.fetchers.get(z);
    P.has(z) && !(V && V.state === "loading" && Q.has(z)) && Et(z), ue.delete(z), Q.delete(z), ee.delete(z), ve.delete(z), B.delete(z), D.fetchers.delete(z);
  }
  function Qt(z) {
    let V = (fe.get(z) || 0) - 1;
    V <= 0 ? (fe.delete(z), ve.add(z)) : fe.set(z, V), Ne({ fetchers: new Map(D.fetchers) });
  }
  function Et(z, V) {
    let F = P.get(z);
    F && (F.abort(V), P.delete(z));
  }
  function qt(z) {
    for (let V of z) {
      let F = Nr(V), ce = ka(F.data);
      D.fetchers.set(V, ce);
    }
  }
  function ei() {
    let z = [], V = !1;
    for (let F of ee) {
      let ce = D.fetchers.get(F);
      qe(ce, `Expected fetcher: ${F}`), ce.state === "loading" && (ee.delete(F), z.push(F), V = !0);
    }
    return qt(z), V;
  }
  function $a(z) {
    let V = [];
    for (let [F, ce] of Q)
      if (ce < z) {
        let de = D.fetchers.get(F);
        qe(de, `Expected fetcher: ${F}`), de.state === "loading" && (Et(F), Q.delete(F), V.push(F));
      }
    return qt(V), V.length > 0;
  }
  function On(z, V) {
    let F = D.blockers.get(z) || Pl;
    return ze.get(z) !== V && ze.set(z, V), F;
  }
  function ga(z) {
    D.blockers.delete(z), ze.delete(z);
  }
  function Zn(z, V) {
    let F = D.blockers.get(z) || Pl;
    qe(
      F.state === "unblocked" && V.state === "blocked" || F.state === "blocked" && V.state === "blocked" || F.state === "blocked" && V.state === "proceeding" || F.state === "blocked" && V.state === "unblocked" || F.state === "proceeding" && V.state === "unblocked",
      `Invalid blocker state transition: ${F.state} -> ${V.state}`
    );
    let ce = new Map(D.blockers);
    ce.set(z, V), Ne({ blockers: ce });
  }
  function la({
    currentLocation: z,
    nextLocation: V,
    historyAction: F
  }) {
    if (ze.size === 0)
      return;
    ze.size > 1 && Ct(!1, "A router only supports one blocker at a time");
    let ce = Array.from(ze.entries()), [de, Se] = ce[ce.length - 1], pe = D.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: z, nextLocation: V, historyAction: F }))
      return de;
  }
  function cn(z) {
    let V = Fn(404, { pathname: z }), F = v || m, { matches: ce, route: de } = Fo(F);
    return { notFoundMatches: ce, route: de, error: V };
  }
  function ke(z, V, F) {
    if (w = z, R = V, N = F || null, !T && D.navigation === tf) {
      T = !0;
      let ce = It(D.location, D.matches);
      ce != null && Ne({ restoreScrollPosition: ce });
    }
    return () => {
      w = null, R = null, N = null;
    };
  }
  function ut(z, V) {
    return N && N(
      z,
      V.map((ce) => $E(ce, D.loaderData))
    ) || z.key;
  }
  function Rt(z, V) {
    if (w && R) {
      let F = ut(z, V);
      w[F] = R();
    }
  }
  function It(z, V) {
    if (w) {
      let F = ut(z, V), ce = w[F];
      if (typeof ce == "number")
        return ce;
    }
    return null;
  }
  function Sn(z, V, F) {
    if (n.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
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
  async function rt(z, V, F, ce) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let de = z;
    for (; ; ) {
      let Se = v == null, pe = v || m, ge = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: F,
          path: V,
          matches: de,
          fetcherKey: ce,
          patch: (Ae, Te) => {
            F.aborted || iy(
              Ae,
              Te,
              pe,
              ge,
              c,
              !1
            );
          }
        });
      } catch (Ae) {
        return { type: "error", error: Ae, partialMatches: de };
      } finally {
        Se && !F.aborted && (m = [...m]);
      }
      if (F.aborted)
        return { type: "aborted" };
      let Ee = pr(pe, V, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = ss(
          pe,
          V,
          p,
          !0
        ), !(be && de.length < be.length && Zt(
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
      )), !be || Zt(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function Zt(z, V) {
    return z.length === V.length && z.every((F, ce) => F.route.id === V[ce].route.id);
  }
  function va(z) {
    h = {}, v = hs(
      z,
      c,
      void 0,
      h
    );
  }
  function nn(z, V, F = !1) {
    let ce = v == null;
    iy(
      z,
      V,
      v || m,
      h,
      c,
      F
    ), ce && (m = [...m], Ne({}));
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
    initialize: Ut,
    subscribe: me,
    enableScrollRestoration: ke,
    navigate: Re,
    fetch: Bt,
    revalidate: Kt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => n.history.createHref(z),
    encodeLocation: (z) => n.history.encodeLocation(z),
    getFetcher: Nr,
    resetFetcher: ia,
    deleteFetcher: Qt,
    dispose: Yt,
    getBlocker: On,
    deleteBlocker: ga,
    patchRoutes: nn,
    _internalFetchControllers: P,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: va,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Ne(z);
    }
  }, n.unstable_instrumentations && (ne = lj(
    ne,
    n.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), ne;
}
function yj(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function If(n, a, i, s, o, c) {
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
  let v = Cu(
    s || ".",
    bh(h),
    Kn(n.pathname, i) || n.pathname,
    c === "path"
  );
  if (s == null && (v.search = n.search, v.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let p = Eh(v.search);
    if (m.route.index && !p)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let x = new URLSearchParams(v.search), g = x.getAll("index");
      x.delete("index"), g.filter((E) => E).forEach((E) => x.append("index", E));
      let S = x.toString();
      v.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (v.pathname = WE({ basename: i, pathname: v.pathname })), ma(v);
}
function ay(n, a, i) {
  if (!i || !yj(i))
    return { path: a };
  if (i.formMethod && !Uj(i.formMethod))
    return {
      path: a,
      error: Fn(405, { method: i.formMethod })
    };
  let s = () => ({
    path: a,
    error: Fn(400, { type: "invalid-body" })
  }), c = (i.formMethod || "get").toUpperCase(), h = ax(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!ln(c))
        return s();
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
          formMethod: c,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!ln(c))
        return s();
      try {
        let g = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: h,
            formEncType: i.formEncType,
            formData: void 0,
            json: g,
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
  let m, v;
  if (i.formData)
    m = Yf(i.formData), v = i.formData;
  else if (i.body instanceof FormData)
    m = Yf(i.body), v = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, v = dy(m);
  else if (i.body == null)
    m = new URLSearchParams(), v = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), v = dy(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: c,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: v,
    json: void 0,
    text: void 0
  };
  if (ln(p.formMethod))
    return { path: a, submission: p };
  let x = ra(a);
  return n && x.search && Eh(x.search) && m.append("index", ""), x.search = `?${m}`, { path: ma(x), submission: p };
}
function ry(n, a, i, s, o, c, h, m, v, p, x, g, S, E, w, N, R, T, L, M, _) {
  let Z = M ? An(M[1]) ? M[1].error : M[1].data : void 0, te = o.createURL(c.location), ne = o.createURL(v), D;
  if (x && c.errors) {
    let J = Object.keys(c.errors)[0];
    D = h.findIndex((O) => O.route.id === J);
  } else if (M && An(M[1])) {
    let J = M[0];
    D = h.findIndex((O) => O.route.id === J) - 1;
  }
  let H = M ? M[1].statusCode : void 0, q = H && H >= 400, oe = {
    currentUrl: te,
    currentParams: c.matches[0]?.params || {},
    nextUrl: ne,
    nextParams: h[0].params,
    ...m,
    actionResult: Z,
    actionStatus: H
  }, I = Ss(h), Y = h.map((J, O) => {
    let { route: C } = J, B = null;
    if (D != null && O > D)
      B = !1;
    else if (C.lazy)
      B = !0;
    else if (!Sh(C))
      B = !1;
    else if (x) {
      let { shouldLoad: Q } = Qb(
        C,
        c.loaderData,
        c.errors
      );
      B = Q;
    } else bj(c.loaderData, c.matches[O], J) && (B = !0);
    if (B !== null)
      return Ff(
        i,
        s,
        n,
        v,
        I,
        J,
        p,
        a,
        B
      );
    let P = !1;
    typeof _ == "boolean" ? P = _ : q ? P = !1 : (g || te.pathname + te.search === ne.pathname + ne.search || te.search !== ne.search || xj(c.matches[O], J)) && (P = !0);
    let re = {
      ...oe,
      defaultShouldRevalidate: P
    }, A = us(J, re);
    return Ff(
      i,
      s,
      n,
      v,
      I,
      J,
      p,
      a,
      A,
      re,
      _
    );
  }), se = [];
  return w.forEach((J, O) => {
    if (x || !h.some((ue) => ue.route.id === J.routeId) || E.has(O))
      return;
    let C = c.fetchers.get(O), B = C && C.state !== "idle" && C.data === void 0, P = pr(R, J.path, T);
    if (!P) {
      if (L && B)
        return;
      se.push({
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
    let re = su(P, J.path), A = new AbortController(), Q = qi(
      o,
      J.path,
      A.signal
    ), ee = null;
    if (S.has(O))
      S.delete(O), ee = Ki(
        i,
        s,
        Q,
        J.path,
        P,
        re,
        p,
        a
      );
    else if (B)
      g && (ee = Ki(
        i,
        s,
        Q,
        J.path,
        P,
        re,
        p,
        a
      ));
    else {
      let ue;
      typeof _ == "boolean" ? ue = _ : q ? ue = !1 : ue = g;
      let fe = {
        ...oe,
        defaultShouldRevalidate: ue
      };
      us(re, fe) && (ee = Ki(
        i,
        s,
        Q,
        J.path,
        P,
        re,
        p,
        a,
        fe
      ));
    }
    ee && se.push({
      key: O,
      routeId: J.routeId,
      path: J.path,
      matches: ee,
      match: re,
      request: Q,
      controller: A
    });
  }), { dsMatches: Y, revalidatingFetchers: se };
}
function Sh(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function Qb(n, a, i) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Sh(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = i != null && i[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function bj(n, a, i) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !n.hasOwnProperty(i.route.id);
  return s || o;
}
function xj(n, a) {
  let i = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function us(n, a) {
  if (n.route.shouldRevalidate) {
    let i = n.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function iy(n, a, i, s, o, c) {
  let h;
  if (n) {
    let p = s[n];
    qe(
      p,
      `No route found to patch children into: routeId = ${n}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = i;
  let m = [], v = [];
  if (a.forEach((p) => {
    let x = h.find(
      (g) => Zb(p, g)
    );
    x ? v.push({ existingRoute: x, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = hs(
      m,
      o,
      [n || "_", "patch", String(h?.length || "0")],
      s
    );
    h.push(...p);
  }
  if (c && v.length > 0)
    for (let p = 0; p < v.length; p++) {
      let { existingRoute: x, newRoute: g } = v[p], S = x, [E] = hs(
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
function Zb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (i, s) => a.children?.some((o) => Zb(i, o))
  ) ?? !1 : !1;
}
var ly = /* @__PURE__ */ new WeakMap(), Jb = ({
  key: n,
  route: a,
  manifest: i,
  mapRouteProperties: s
}) => {
  let o = i[a.id];
  if (qe(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let h = ly.get(o);
  h || (h = {}, ly.set(o, h));
  let m = h[n];
  if (m)
    return m;
  let v = (async () => {
    let p = LE(n), g = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (p)
      Ct(
        !p,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (g)
      Ct(
        !1,
        `Route "${o.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await c();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[n] = v, v;
}, sy = /* @__PURE__ */ new WeakMap();
function Sj(n, a, i, s, o) {
  let c = i[n.id];
  if (qe(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let x = sy.get(c);
    if (x)
      return {
        lazyRoutePromise: x,
        lazyHandlerPromise: x
      };
    let g = (async () => {
      qe(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), E = {};
      for (let w in S) {
        let N = S[w];
        if (N === void 0)
          continue;
        let R = BE(w), L = c[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        R ? Ct(
          !R,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? Ct(
          !L,
          `Route "${c.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = N;
      }
      Object.assign(c, E), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return sy.set(c, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let h = Object.keys(n.lazy), m = [], v;
  for (let x of h) {
    if (o && o.includes(x))
      continue;
    let g = Jb({
      key: x,
      route: n,
      manifest: i,
      mapRouteProperties: s
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
async function oy(n) {
  let a = n.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    i[a[c].route.id] = o;
  }), i;
}
async function wj(n) {
  return n.matches.some((a) => a.route.middleware) ? Wb(n, () => oy(n)) : oy(n);
}
function Wb(n, a) {
  return Ej(
    n,
    a,
    (s) => {
      if (Lj(s))
        throw s;
      return s;
    },
    Dj,
    i
  );
  function i(s, o, c) {
    if (c)
      return Promise.resolve(
        Object.assign(c.value, {
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
      ), v = gr(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [v]: { type: "error", result: s }
      });
    }
  }
}
async function Ej(n, a, i, s, o) {
  let { matches: c, ...h } = n, m = c.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((x) => [p.route.id, x]) : []
  );
  return await ex(
    h,
    m,
    a,
    i,
    s,
    o
  );
}
async function ex(n, a, i, s, o, c, h = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let v = a[h];
  if (!v)
    return await i();
  let [p, x] = v, g, S = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await ex(
        n,
        a,
        i,
        s,
        o,
        c,
        h + 1
      ) }, g.value;
    } catch (E) {
      return g = { value: await c(E, p, g) }, g.value;
    }
  };
  try {
    let E = await x(n, S), w = E != null ? s(E) : void 0;
    return o(w) ? w : g ? w ?? g.value : (g = { value: await S() }, g.value);
  } catch (E) {
    return await c(E, p, g);
  }
}
function tx(n, a, i, s, o) {
  let c = Jb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = Sj(
    s.route,
    ln(i.method) ? "action" : "loader",
    a,
    n,
    o
  );
  return {
    middleware: c,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Ff(n, a, i, s, o, c, h, m, v, p = null, x) {
  let g = !1, S = tx(
    n,
    a,
    i,
    c,
    h
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: v,
    shouldRevalidateArgs: p,
    shouldCallHandler(E) {
      return g = !0, p ? typeof x == "boolean" ? us(c, {
        ...p,
        defaultShouldRevalidate: x
      }) : typeof E == "boolean" ? us(c, {
        ...p,
        defaultShouldRevalidate: E
      }) : us(c, p) : v;
    },
    resolve(E) {
      let { lazy: w, loader: N, middleware: R } = c.route, T = g || v || E && !ln(i.method) && (w || N), L = R && R.length > 0 && !N && !w;
      return T && (ln(i.method) || !L) ? Nj({
        request: i,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: E,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Ki(n, a, i, s, o, c, h, m, v = null) {
  return o.map((p) => p.route.id !== c.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: v,
    shouldCallHandler: () => !1,
    _lazyPromises: tx(
      n,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Ff(
    n,
    a,
    i,
    s,
    Ss(o),
    p,
    h,
    m,
    !0,
    v
  ));
}
async function jj(n, a, i, s, o, c, h) {
  s.some((x) => x._lazyPromises?.middleware) && await Promise.all(s.map((x) => x._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: nx(a, i),
    unstable_pattern: Ss(s),
    params: s[0].params,
    context: c,
    matches: s
  }, p = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (x) => {
      let g = m;
      return Wb(g, () => x({
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
      s.flatMap((x) => [
        x._lazyPromises?.handler,
        x._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function Nj({
  request: n,
  path: a,
  unstable_pattern: i,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: h,
  scopedContext: m
}) {
  let v, p, x = ln(n.method), g = x ? "action" : "loader", S = (E) => {
    let w, N = new Promise((L, M) => w = M);
    p = () => w(), n.signal.addEventListener("abort", p);
    let R = (L) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${s.route.id}]`
      )
    ) : E(
      {
        request: n,
        unstable_url: nx(n, a),
        unstable_pattern: i,
        params: s.params,
        context: m
      },
      ...L !== void 0 ? [L] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (h ? h((M) => R(M)) : R()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let E = x ? s.route.action : s.route.loader;
    if (o || c)
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
          c
        ]);
        if (w !== void 0)
          throw w;
        v = N;
      } else {
        await o;
        let w = x ? s.route.action : s.route.loader;
        if (w)
          [v] = await Promise.all([S(w), c]);
        else if (g === "action") {
          let N = new URL(n.url), R = N.pathname + N.search;
          throw Fn(405, {
            method: n.method,
            pathname: R,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      v = await S(E);
    else {
      let w = new URL(n.url), N = w.pathname + w.search;
      throw Fn(404, {
        pathname: N
      });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    p && n.signal.removeEventListener("abort", p);
  }
  return v;
}
async function Tj(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function Cj(n) {
  let { result: a, type: i } = n;
  if (wh(a)) {
    let s;
    try {
      s = await Tj(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Ru(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? py(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: _j(a),
    statusCode: ms(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ms(a) ? a.status : void 0
  } : py(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Rj(n, a, i, s, o) {
  let c = n.headers.get("Location");
  if (qe(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !yh(c)) {
    let h = s.slice(
      0,
      s.findIndex((m) => m.route.id === i) + 1
    );
    c = If(
      new URL(a.url),
      h,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var uy = [
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
function cy(n, a, i, s) {
  if (yh(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (uy.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(c.pathname, i) != null;
    if (c.origin === a.origin && h)
      return xh(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (uy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function qi(n, a, i, s) {
  let o = n.createURL(ax(a)).toString(), c = { signal: i };
  if (s && ln(s.formMethod)) {
    let { formMethod: h, formEncType: m } = s;
    c.method = h.toUpperCase(), m === "application/json" ? (c.headers = new Headers({ "Content-Type": m }), c.body = JSON.stringify(s.json)) : m === "text/plain" ? c.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? c.body = Yf(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function nx(n, a) {
  let i = new URL(n.url), s = typeof a == "string" ? ra(a) : a;
  if (i.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let h of c.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = s.hash || "", i;
}
function Yf(n) {
  let a = new URLSearchParams();
  for (let [i, s] of n.entries())
    a.append(i, typeof s == "string" ? s : s.name);
  return a;
}
function dy(n) {
  let a = new FormData();
  for (let [i, s] of n.entries())
    a.append(i, s);
  return a;
}
function Mj(n, a, i, s = !1, o = !1) {
  let c = {}, h = null, m, v = !1, p = {}, x = i && An(i[1]) ? i[1].error : void 0;
  return n.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let S = g.route.id, E = a[S];
    if (qe(
      !Gr(E),
      "Cannot handle redirect results in processLoaderData"
    ), An(E)) {
      let w = E.error;
      if (x !== void 0 && (w = x, x = void 0), h = h || {}, o)
        h[S] = w;
      else {
        let N = gr(n, S);
        h[N.route.id] == null && (h[N.route.id] = w);
      }
      s || (c[S] = Pb), v || (v = !0, m = ms(E.error) ? E.error.status : 500), E.headers && (p[S] = E.headers);
    } else
      c[S] = E.data, E.statusCode && E.statusCode !== 200 && !v && (m = E.statusCode), E.headers && (p[S] = E.headers);
  }), x !== void 0 && i && (h = { [i[0]]: x }, i[2] && (c[i[2]] = void 0)), {
    loaderData: c,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function fy(n, a, i, s, o, c) {
  let { loaderData: h, errors: m } = Mj(
    a,
    i,
    s
  );
  return o.filter((v) => !v.matches || v.matches.some((p) => p.shouldLoad)).forEach((v) => {
    let { key: p, match: x, controller: g } = v;
    if (g && g.signal.aborted)
      return;
    let S = c[p];
    if (qe(S, "Did not find corresponding fetcher result"), An(S)) {
      let E = gr(n.matches, x?.route.id);
      m && m[E.route.id] || (m = {
        ...m,
        [E.route.id]: S.error
      }), n.fetchers.delete(p);
    } else if (Gr(S))
      qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = ka(S.data);
      n.fetchers.set(p, E);
    }
  }), { loaderData: h, errors: m };
}
function hy(n, a, i, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Pb).reduce((c, [h, m]) => (c[h] = m, c), {});
  for (let c of i) {
    let h = c.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && c.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function my(n) {
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
function Fn(n, {
  pathname: a,
  routeId: i,
  method: s,
  type: o,
  message: c
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && i ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && i ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new Ru(
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
    if (Gr(o))
      return { key: s, result: o };
  }
}
function ax(n) {
  let a = typeof n == "string" ? ra(n) : n;
  return ma({ ...a, hash: "" });
}
function Aj(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function _j(n) {
  return new Ru(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function Dj(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, i]) => typeof a == "string" && zj(i)
  );
}
function zj(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function Oj(n) {
  return wh(n.result) && Xb.has(n.result.status);
}
function An(n) {
  return n.type === "error";
}
function Gr(n) {
  return (n && n.type) === "redirect";
}
function py(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function wh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function kj(n) {
  return Xb.has(n);
}
function Lj(n) {
  return wh(n) && kj(n.status) && n.headers.has("Location");
}
function Uj(n) {
  return hj.has(n.toUpperCase());
}
function ln(n) {
  return dj.has(n.toUpperCase());
}
function Eh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function su(n, a) {
  let i = typeof a == "string" ? ra(a).search : a.search;
  if (n[n.length - 1].route.index && Eh(i || ""))
    return n[n.length - 1];
  let s = qb(n);
  return s[s.length - 1];
}
function gy(n) {
  let { formMethod: a, formAction: i, formEncType: s, text: o, formData: c, json: h } = n;
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
    if (c != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: c,
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
function nf(n, a) {
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
function Bj(n, a) {
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
function Vj(n, a) {
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
function $j(n, a) {
  try {
    let i = n.sessionStorage.getItem(
      Kb
    );
    if (i) {
      let s = JSON.parse(i);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function Hj(n, a) {
  if (a.size > 0) {
    let i = {};
    for (let [s, o] of a)
      i[s] = [...o];
    try {
      n.sessionStorage.setItem(
        Kb,
        JSON.stringify(i)
      );
    } catch (s) {
      Ct(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function vy() {
  let n, a, i = new Promise((s, o) => {
    n = async (c) => {
      s(c);
      try {
        await i;
      } catch {
      }
    }, a = async (c) => {
      o(c);
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
var Wr = b.createContext(null);
Wr.displayName = "DataRouter";
var ws = b.createContext(null);
ws.displayName = "DataRouterState";
var rx = b.createContext(!1);
function ix() {
  return b.useContext(rx);
}
var jh = b.createContext({
  isTransitioning: !1
});
jh.displayName = "ViewTransition";
var lx = b.createContext(
  /* @__PURE__ */ new Map()
);
lx.displayName = "Fetchers";
var qj = b.createContext(null);
qj.displayName = "Await";
var Pn = b.createContext(
  null
);
Pn.displayName = "Navigation";
var Mu = b.createContext(
  null
);
Mu.displayName = "Location";
var Ba = b.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ba.displayName = "Route";
var Nh = b.createContext(null);
Nh.displayName = "RouteError";
var sx = "REACT_ROUTER_ERROR", Ij = "REDIRECT", Fj = "ROUTE_ERROR_RESPONSE";
function Yj(n) {
  if (n.startsWith(`${sx}:${Ij}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function Gj(n) {
  if (n.startsWith(
    `${sx}:${Fj}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ru(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Xj(n, { relative: a } = {}) {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = b.useContext(Pn), { hash: o, pathname: c, search: h } = Ns(n, { relative: a }), m = c;
  return i !== "/" && (m = c === "/" ? i : Yn([i, c])), s.createHref({ pathname: m, search: h, hash: o });
}
function Es() {
  return b.useContext(Mu) != null;
}
function Va() {
  return qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), b.useContext(Mu).location;
}
var ox = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ux(n) {
  b.useContext(Pn).static || b.useLayoutEffect(n);
}
function js() {
  let { isDataRoute: n } = b.useContext(Ba);
  return n ? iN() : Kj();
}
function Kj() {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = b.useContext(Wr), { basename: a, navigator: i } = b.useContext(Pn), { matches: s } = b.useContext(Ba), { pathname: o } = Va(), c = JSON.stringify(bh(s)), h = b.useRef(!1);
  return ux(() => {
    h.current = !0;
  }), b.useCallback(
    (v, p = {}) => {
      if (Ct(h.current, ox), !h.current) return;
      if (typeof v == "number") {
        i.go(v);
        return;
      }
      let x = Cu(
        v,
        JSON.parse(c),
        o,
        p.relative === "path"
      );
      n == null && a !== "/" && (x.pathname = x.pathname === "/" ? a : Yn([a, x.pathname])), (p.replace ? i.replace : i.push)(
        x,
        p.state,
        p
      );
    },
    [
      a,
      i,
      c,
      o,
      n
    ]
  );
}
b.createContext(null);
function Ns(n, { relative: a } = {}) {
  let { matches: i } = b.useContext(Ba), { pathname: s } = Va(), o = JSON.stringify(bh(i));
  return b.useMemo(
    () => Cu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function Pj(n, a, i) {
  qe(
    Es(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = b.useContext(Pn), { matches: o } = b.useContext(Ba), c = o[o.length - 1], h = c ? c.params : {}, m = c ? c.pathname : "/", v = c ? c.pathnameBase : "/", p = c && c.route;
  {
    let R = p && p.path || "";
    fx(
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
  let w = pr(n, { pathname: E });
  return Ct(
    p || w != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Ct(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), eN(
    w && w.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, h, R.params),
        pathname: Yn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? v : Yn([
          v,
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
function Qj() {
  let n = rN(), a = ms(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), i = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ b.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ b.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ b.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ b.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ b.createElement("pre", { style: o }, i) : null, h);
}
var Zj = /* @__PURE__ */ b.createElement(Qj, null), cx = class extends b.Component {
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
      const i = Gj(n.digest);
      i && (n = i);
    }
    let a = n !== void 0 ? /* @__PURE__ */ b.createElement(Ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ b.createElement(
      Nh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ b.createElement(Jj, { error: n }, a) : a;
  }
};
cx.contextType = rx;
var af = /* @__PURE__ */ new WeakMap();
function Jj({
  children: n,
  error: a
}) {
  let { basename: i } = b.useContext(Pn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Yj(a.digest);
    if (s) {
      let o = af.get(a);
      if (o) throw o;
      let c = Fb(s.location, i);
      if (Ib && !af.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw af.set(a, h), h;
        }
      return /* @__PURE__ */ b.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${c.absoluteURL || c.to}`
        }
      );
    }
  }
  return n;
}
function Wj({ routeContext: n, match: a, children: i }) {
  let s = b.useContext(Wr);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ b.createElement(Ba.Provider, { value: n }, i);
}
function eN(n, a = [], i) {
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
  let o = n, c = s?.errors;
  if (c != null) {
    let x = o.findIndex(
      (g) => g.route.id && c?.[g.route.id] !== void 0
    );
    qe(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, x + 1)
    );
  }
  let h = !1, m = -1;
  if (i && s) {
    h = s.renderFallback;
    for (let x = 0; x < o.length; x++) {
      let g = o[x];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (m = x), g.route.id) {
        let { loaderData: S, errors: E } = s, w = g.route.loader && !S.hasOwnProperty(g.route.id) && (!E || E[g.route.id] === void 0);
        if (g.route.lazy || w) {
          i.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let v = i?.onError, p = s && v ? (x, g) => {
    v(x, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: Ss(s.matches),
      errorInfo: g
    });
  } : void 0;
  return o.reduceRight(
    (x, g, S) => {
      let E, w = !1, N = null, R = null;
      s && (E = c && g.route.id ? c[g.route.id] : void 0, N = g.route.errorElement || Zj, h && (m < 0 && S === 0 ? (fx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, R = null) : m === S && (w = !0, R = g.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), L = () => {
        let M;
        return E ? M = N : w ? M = R : g.route.Component ? M = /* @__PURE__ */ b.createElement(g.route.Component, null) : g.route.element ? M = g.route.element : M = x, /* @__PURE__ */ b.createElement(
          Wj,
          {
            match: g,
            routeContext: {
              outlet: x,
              matches: T,
              isDataRoute: s != null
            },
            children: M
          }
        );
      };
      return s && (g.route.ErrorBoundary || g.route.errorElement || S === 0) ? /* @__PURE__ */ b.createElement(
        cx,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: N,
          error: E,
          children: L(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : L();
    },
    null
  );
}
function Th(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function tN(n) {
  let a = b.useContext(Wr);
  return qe(a, Th(n)), a;
}
function dx(n) {
  let a = b.useContext(ws);
  return qe(a, Th(n)), a;
}
function nN(n) {
  let a = b.useContext(Ba);
  return qe(a, Th(n)), a;
}
function Au(n) {
  let a = nN(n), i = a.matches[a.matches.length - 1];
  return qe(
    i.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function aN() {
  return Au(
    "useRouteId"
    /* UseRouteId */
  );
}
function Ts() {
  let n = dx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Au(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function rN() {
  let n = b.useContext(Nh), a = dx(
    "useRouteError"
    /* UseRouteError */
  ), i = Au(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[i];
}
function iN() {
  let { router: n } = tN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Au(
    "useNavigate"
    /* UseNavigateStable */
  ), i = b.useRef(!1);
  return ux(() => {
    i.current = !0;
  }), b.useCallback(
    async (o, c = {}) => {
      Ct(i.current, ox), i.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var yy = {};
function fx(n, a, i) {
  !a && !yy[n] && (yy[n] = !0, Ct(!1, i));
}
var by = {};
function xy(n, a) {
  !n && !by[a] && (by[a] = !0, console.warn(a));
}
var lN = "useOptimistic", Sy = EE[lN], sN = () => {
};
function oN(n) {
  return Sy ? Sy(n) : [n, sN];
}
function uN(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && Ct(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: b.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && Ct(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: b.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && Ct(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: b.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var cN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function dN(n, a) {
  return vj({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: DE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: cN,
    mapRouteProperties: uN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var fN = class {
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
function hN({
  router: n,
  flushSync: a,
  onError: i,
  unstable_useTransitions: s
}) {
  s = ix() || s;
  let [c, h] = b.useState(n.state), [m, v] = oN(c), [p, x] = b.useState(), [g, S] = b.useState({
    isTransitioning: !1
  }), [E, w] = b.useState(), [N, R] = b.useState(), [T, L] = b.useState(), M = b.useRef(/* @__PURE__ */ new Map()), _ = b.useCallback(
    (H, { deletedFetchers: q, newErrors: oe, flushSync: I, viewTransitionOpts: Y }) => {
      oe && i && Object.values(oe).forEach(
        (J) => i(J, {
          location: H.location,
          params: H.matches[0]?.params ?? {},
          unstable_pattern: Ss(H.matches)
        })
      ), H.fetchers.forEach((J, O) => {
        J.data !== void 0 && M.current.set(O, J.data);
      }), q.forEach((J) => M.current.delete(J)), xy(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let se = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (xy(
        Y == null || se,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Y || !se) {
        a && I ? a(() => h(H)) : s === !1 ? h(H) : b.startTransition(() => {
          s === !0 && v((J) => wy(J, H)), h(H);
        });
        return;
      }
      if (a && I) {
        a(() => {
          N && (E?.resolve(), N.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Y.currentLocation,
            nextLocation: Y.nextLocation
          });
        });
        let J = n.window.document.startViewTransition(() => {
          a(() => h(H));
        });
        J.finished.finally(() => {
          a(() => {
            w(void 0), R(void 0), x(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => R(J));
        return;
      }
      N ? (E?.resolve(), N.skipTransition(), L({
        state: H,
        currentLocation: Y.currentLocation,
        nextLocation: Y.nextLocation
      })) : (x(H), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Y.currentLocation,
        nextLocation: Y.nextLocation
      }));
    },
    [
      n.window,
      a,
      N,
      E,
      s,
      v,
      i
    ]
  );
  b.useLayoutEffect(() => n.subscribe(_), [n, _]);
  let Z = m.initialized;
  b.useLayoutEffect(() => {
    !Z && n.state.initialized && _(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [Z, _, n.state]), b.useEffect(() => {
    g.isTransitioning && !g.flushSync && w(new fN());
  }, [g]), b.useEffect(() => {
    if (E && p && n.window) {
      let H = p, q = E.promise, oe = n.window.document.startViewTransition(async () => {
        s === !1 ? h(H) : b.startTransition(() => {
          s === !0 && v((I) => wy(I, H)), h(H);
        }), await q;
      });
      oe.finished.finally(() => {
        w(void 0), R(void 0), x(void 0), S({ isTransitioning: !1 });
      }), R(oe);
    }
  }, [
    p,
    E,
    n.window,
    s,
    v
  ]), b.useEffect(() => {
    E && p && m.location.key === p.location.key && E.resolve();
  }, [E, N, m.location, p]), b.useEffect(() => {
    !g.isTransitioning && T && (x(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), L(void 0));
  }, [g.isTransitioning, T]);
  let te = b.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (H) => n.navigate(H),
    push: (H, q, oe) => n.navigate(H, {
      state: q,
      preventScrollReset: oe?.preventScrollReset
    }),
    replace: (H, q, oe) => n.navigate(H, {
      replace: !0,
      state: q,
      preventScrollReset: oe?.preventScrollReset
    })
  }), [n]), ne = n.basename || "/", D = b.useMemo(
    () => ({
      router: n,
      navigator: te,
      static: !1,
      basename: ne,
      onError: i
    }),
    [n, te, ne, i]
  );
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement(Wr.Provider, { value: D }, /* @__PURE__ */ b.createElement(ws.Provider, { value: m }, /* @__PURE__ */ b.createElement(lx.Provider, { value: M.current }, /* @__PURE__ */ b.createElement(jh.Provider, { value: g }, /* @__PURE__ */ b.createElement(
    gN,
    {
      basename: ne,
      location: m.location,
      navigationType: m.historyAction,
      navigator: te,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ b.createElement(
      mN,
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
function wy(n, a) {
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
var mN = b.memo(pN);
function pN({
  routes: n,
  future: a,
  state: i,
  isStatic: s,
  onError: o
}) {
  return Pj(n, void 0, { state: i, isStatic: s, onError: o });
}
function gN({
  basename: n = "/",
  children: a = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: h
}) {
  qe(
    !Es(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"), v = b.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: c,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, c, h]
  );
  typeof i == "string" && (i = ra(i));
  let {
    pathname: p = "/",
    search: x = "",
    hash: g = "",
    state: S = null,
    key: E = "default",
    unstable_mask: w
  } = i, N = b.useMemo(() => {
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
      navigationType: s
    };
  }, [
    m,
    p,
    x,
    g,
    S,
    E,
    s,
    w
  ]);
  return Ct(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${x}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ b.createElement(Pn.Provider, { value: v }, /* @__PURE__ */ b.createElement(Mu.Provider, { children: a, value: N }));
}
var ou = "get", uu = "application/x-www-form-urlencoded";
function _u(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function vN(n) {
  return _u(n) && n.tagName.toLowerCase() === "button";
}
function yN(n) {
  return _u(n) && n.tagName.toLowerCase() === "form";
}
function bN(n) {
  return _u(n) && n.tagName.toLowerCase() === "input";
}
function xN(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function SN(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !xN(n);
}
var Go = null;
function wN() {
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
var EN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function rf(n) {
  return n != null && !EN.has(n) ? (Ct(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${uu}"`
  ), null) : n;
}
function jN(n, a) {
  let i, s, o, c, h;
  if (yN(n)) {
    let m = n.getAttribute("action");
    s = m ? Kn(m, a) : null, i = n.getAttribute("method") || ou, o = rf(n.getAttribute("enctype")) || uu, c = new FormData(n);
  } else if (vN(n) || bN(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = v ? Kn(v, a) : null, i = n.getAttribute("formmethod") || m.getAttribute("method") || ou, o = rf(n.getAttribute("formenctype")) || rf(m.getAttribute("enctype")) || uu, c = new FormData(m, n), !wN()) {
      let { name: p, type: x, value: g } = n;
      if (x === "image") {
        let S = p ? `${p}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else p && c.append(p, g);
    }
  } else {
    if (_u(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = ou, s = null, o = uu, h = n;
  }
  return c && o === "text/plain" && (h = c, c = void 0), { action: s, method: i.toLowerCase(), encType: o, formData: c, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ch(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function hx(n, a, i, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${gu(a)}/_root.${s}` : o.pathname = `${gu(o.pathname)}.${s}`, o;
}
async function NN(n, a) {
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
function TN(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function CN(n, a, i) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let h = await NN(c, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return _N(
    s.flat(1).filter(TN).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Ey(n, a, i, s, o, c) {
  let h = (v, p) => i[p] ? v.route.id !== i[p].route.id : !0, m = (v, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== v.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== v.params["*"]
  );
  return c === "assets" ? a.filter(
    (v, p) => h(v, p) || m(v, p)
  ) : c === "data" ? a.filter((v, p) => {
    let x = s.routes[v.route.id];
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
        nextUrl: new URL(n, window.origin),
        nextParams: v.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function RN(n, a, { includeHydrateFallback: i } = {}) {
  return MN(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function MN(n) {
  return [...new Set(n)];
}
function AN(n) {
  let a = {}, i = Object.keys(n).sort();
  for (let s of i)
    a[s] = n[s];
  return a;
}
function _N(n, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(AN(o));
    return i.has(c) || (i.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function Rh() {
  let n = b.useContext(Wr);
  return Ch(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function DN() {
  let n = b.useContext(ws);
  return Ch(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var Mh = b.createContext(void 0);
Mh.displayName = "FrameworkContext";
function Ah() {
  let n = b.useContext(Mh);
  return Ch(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function zN(n, a) {
  let i = b.useContext(Mh), [s, o] = b.useState(!1), [c, h] = b.useState(!1), { onFocus: m, onBlur: v, onMouseEnter: p, onMouseLeave: x, onTouchStart: g } = a, S = b.useRef(null);
  b.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let N = (T) => {
        T.forEach((L) => {
          h(L.isIntersecting);
        });
      }, R = new IntersectionObserver(N, { threshold: 0.5 });
      return S.current && R.observe(S.current), () => {
        R.disconnect();
      };
    }
  }, [n]), b.useEffect(() => {
    if (s) {
      let N = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [s]);
  let E = () => {
    o(!0);
  }, w = () => {
    o(!1), h(!1);
  };
  return i ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Zl(m, E),
      onBlur: Zl(v, w),
      onMouseEnter: Zl(p, E),
      onMouseLeave: Zl(x, w),
      onTouchStart: Zl(g, E)
    }
  ] : [!1, S, {}];
}
function Zl(n, a) {
  return (i) => {
    n && n(i), i.defaultPrevented || a(i);
  };
}
function ON({ page: n, ...a }) {
  let i = ix(), { router: s } = Rh(), o = b.useMemo(
    () => pr(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? i ? /* @__PURE__ */ b.createElement(LN, { page: n, matches: o, ...a }) : /* @__PURE__ */ b.createElement(UN, { page: n, matches: o, ...a }) : null;
}
function kN(n) {
  let { manifest: a, routeModules: i } = Ah(), [s, o] = b.useState([]);
  return b.useEffect(() => {
    let c = !1;
    return CN(n, a, i).then(
      (h) => {
        c || o(h);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, i]), s;
}
function LN({
  page: n,
  matches: a,
  ...i
}) {
  let s = Va(), { future: o } = Ah(), { basename: c } = Rh(), h = b.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = hx(
      n,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), v = !1, p = [];
    for (let x of a)
      typeof x.route.shouldRevalidate == "function" ? v = !0 : p.push(x.route.id);
    return v && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, h.map((m) => /* @__PURE__ */ b.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function UN({
  page: n,
  matches: a,
  ...i
}) {
  let s = Va(), { future: o, manifest: c, routeModules: h } = Ah(), { basename: m } = Rh(), { loaderData: v, matches: p } = DN(), x = b.useMemo(
    () => Ey(
      n,
      a,
      p,
      c,
      s,
      "data"
    ),
    [n, a, p, c, s]
  ), g = b.useMemo(
    () => Ey(
      n,
      a,
      p,
      c,
      s,
      "assets"
    ),
    [n, a, p, c, s]
  ), S = b.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((L) => {
      let M = c.routes[L.route.id];
      !M || !M.hasLoader || (!x.some((_) => _.route.id === L.route.id) && L.route.id in v && h[L.route.id]?.shouldRevalidate || M.hasClientLoader ? R = !0 : N.add(L.route.id));
    }), N.size === 0)
      return [];
    let T = hx(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((L) => N.has(L.route.id)).map((L) => L.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    v,
    s,
    c,
    x,
    a,
    n,
    h
  ]), E = b.useMemo(
    () => RN(g, c),
    [g, c]
  ), w = kN(g);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, S.map((N) => /* @__PURE__ */ b.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...i })), E.map((N) => /* @__PURE__ */ b.createElement("link", { key: N, rel: "modulepreload", href: N, ...i })), w.map(({ key: N, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ b.createElement(
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
function BN(...n) {
  return (a) => {
    n.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var VN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  VN && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var mx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Du = b.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
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
    let { basename: R, navigator: T, unstable_useTransitions: L } = b.useContext(Pn), M = typeof x == "string" && mx.test(x), _ = Fb(x, R);
    x = _.to;
    let Z = Xj(x, { relative: o }), te = Va(), ne = null;
    if (m) {
      let J = Cu(
        m,
        [],
        te.unstable_mask ? te.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (J.pathname = J.pathname === "/" ? R : Yn([R, J.pathname])), ne = T.createHref(J);
    }
    let [D, H, q] = zN(
      s,
      w
    ), oe = IN(x, {
      replace: h,
      unstable_mask: m,
      state: v,
      target: p,
      preventScrollReset: g,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: L
    });
    function I(J) {
      a && a(J), J.defaultPrevented || oe(J);
    }
    let Y = !(_.isExternal || c), se = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ b.createElement(
        "a",
        {
          ...w,
          ...q,
          href: (Y ? ne : void 0) || _.absoluteURL || Z,
          onClick: Y ? I : a,
          ref: BN(N, H),
          target: p,
          "data-discover": !M && i === "render" ? "true" : void 0
        }
      )
    );
    return D && !M ? /* @__PURE__ */ b.createElement(b.Fragment, null, se, /* @__PURE__ */ b.createElement(ON, { page: Z })) : se;
  }
);
Du.displayName = "Link";
var $N = b.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: h,
    viewTransition: m,
    children: v,
    ...p
  }, x) {
    let g = Ns(h, { relative: p.relative }), S = Va(), E = b.useContext(ws), { navigator: w, basename: N } = b.useContext(Pn), R = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    KN(g) && m === !0, T = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname, L = S.pathname, M = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    i || (L = L.toLowerCase(), M = M ? M.toLowerCase() : null, T = T.toLowerCase()), M && N && (M = Kn(M, N) || M);
    const _ = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let Z = L === T || !o && L.startsWith(T) && L.charAt(_) === "/", te = M != null && (M === T || !o && M.startsWith(T) && M.charAt(T.length) === "/"), ne = {
      isActive: Z,
      isPending: te,
      isTransitioning: R
    }, D = Z ? a : void 0, H;
    typeof s == "function" ? H = s(ne) : H = [
      s,
      Z ? "active" : null,
      te ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let q = typeof c == "function" ? c(ne) : c;
    return /* @__PURE__ */ b.createElement(
      Du,
      {
        ...p,
        "aria-current": D,
        className: H,
        ref: x,
        style: q,
        to: h,
        viewTransition: m
      },
      typeof v == "function" ? v(ne) : v
    );
  }
);
$N.displayName = "NavLink";
var HN = b.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: s,
    replace: o,
    state: c,
    method: h = ou,
    action: m,
    onSubmit: v,
    relative: p,
    preventScrollReset: x,
    viewTransition: g,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, w) => {
    let { unstable_useTransitions: N } = b.useContext(Pn), R = GN(), T = XN(m, { relative: p }), L = h.toLowerCase() === "get" ? "get" : "post", M = typeof m == "string" && mx.test(m), _ = (Z) => {
      if (v && v(Z), Z.defaultPrevented) return;
      Z.preventDefault();
      let te = Z.nativeEvent.submitter, ne = te?.getAttribute("formmethod") || h, D = () => R(te || Z.currentTarget, {
        fetcherKey: a,
        method: ne,
        navigate: i,
        replace: o,
        state: c,
        relative: p,
        preventScrollReset: x,
        viewTransition: g,
        unstable_defaultShouldRevalidate: S
      });
      N && i !== !1 ? b.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ b.createElement(
      "form",
      {
        ref: w,
        method: L,
        action: T,
        onSubmit: s ? v : _,
        ...E,
        "data-discover": !M && n === "render" ? "true" : void 0
      }
    );
  }
);
HN.displayName = "Form";
function qN(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function px(n) {
  let a = b.useContext(Wr);
  return qe(a, qN(n)), a;
}
function IN(n, {
  target: a,
  replace: i,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: v,
  unstable_useTransitions: p
} = {}) {
  let x = js(), g = Va(), S = Ns(n, { relative: h });
  return b.useCallback(
    (E) => {
      if (SN(E, a)) {
        E.preventDefault();
        let w = i !== void 0 ? i : ma(g) === ma(S), N = () => x(n, {
          replace: w,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: v
        });
        p ? b.startTransition(() => N()) : N();
      }
    },
    [
      g,
      x,
      S,
      i,
      s,
      o,
      a,
      n,
      c,
      h,
      m,
      v,
      p
    ]
  );
}
var FN = 0, YN = () => `__${String(++FN)}__`;
function GN() {
  let { router: n } = px(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = b.useContext(Pn), i = aN(), s = n.fetch, o = n.navigate;
  return b.useCallback(
    async (c, h = {}) => {
      let { action: m, method: v, encType: p, formData: x, body: g } = jN(
        c,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || YN();
        await s(S, i, h.action || m, {
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
    [s, o, a, i]
  );
}
function XN(n, { relative: a } = {}) {
  let { basename: i } = b.useContext(Pn), s = b.useContext(Ba);
  qe(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...Ns(n || ".", { relative: a }) }, h = Va();
  if (n == null) {
    c.search = h.search;
    let m = new URLSearchParams(c.search), v = m.getAll("index");
    if (v.some((x) => x === "")) {
      m.delete("index"), v.filter((g) => g).forEach((g) => m.append("index", g));
      let x = m.toString();
      c.search = x ? `?${x}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (c.pathname = c.pathname === "/" ? i : Yn([i, c.pathname])), ma(c);
}
function KN(n, { relative: a } = {}) {
  let i = b.useContext(jh);
  qe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = px(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Ns(n, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let c = Kn(i.currentLocation.pathname, s) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return pu(o.pathname, h) != null || pu(o.pathname, c) != null;
}
class el extends Error {
  constructor(a, i, s, o) {
    super(s), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const wr = "/api/v1/extensions/nexus.audio.emotiontts";
async function mt(n, a) {
  const i = n.startsWith("http") ? n : `${wr}${n}`, s = await fetch(i, {
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
function PN(n, a, i) {
  const s = n.startsWith("http") ? n : `${wr}${n}`, o = new EventSource(s);
  return o.onmessage = (c) => {
    if (c.data)
      try {
        a(JSON.parse(c.data));
      } catch {
      }
  }, o.onerror = (c) => {
    i?.(c);
  }, () => o.close();
}
async function QN() {
  return mt("/deployments");
}
async function jy(n) {
  return mt(`/deployments/${n}`);
}
async function ZN(n, a) {
  return mt(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Ny(n) {
  return mt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function _h(n, a) {
  return mt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function cs(n, a, i) {
  return mt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function gx(n, a) {
  await mt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function JN(n) {
  return mt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function WN(n, a, i = "error") {
  return mt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: i })
  });
}
async function eT(n, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const s = i.toString(), o = s ? `?${s}` : "";
  return mt(`/deployments/${n}/runs${o}`);
}
async function tT(n, a) {
  return mt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Dh(n, a) {
  return mt(`/deployments/${n}/runs/${a}`);
}
async function nT(n, a) {
  return mt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function vx(n, a) {
  return mt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function aT(n, a) {
  return mt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Ty(n, a, i, s) {
  return PN(
    `/deployments/${n}/runs/${a}/progress`,
    i,
    s
  );
}
async function ps(n) {
  return mt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function vu(n, a, i, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", i), c.append("kind", s), c.append("audio", a);
  const h = await fetch(`${wr}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function rT(n, a) {
  await mt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function iT(n, a, i) {
  return mt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function lT(n) {
  const a = n.audioArtifactRef;
  return a ? a.startsWith("http://") || a.startsWith("https://") ? a : a.startsWith("artifact://") ? `/api/v1/artifacts/${encodeURIComponent(a.slice(11))}` : null : null;
}
async function sT(n) {
  return mt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var oT = "mux0i60", uT = "mux0i61", cT = "mux0i62", dT = "mux0i63";
function Cs({ count: n = "0", title: a, hint: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: oT, children: [
    /* @__PURE__ */ d.jsx("span", { className: uT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ d.jsx("h3", { className: cT, children: a }),
    i ? /* @__PURE__ */ d.jsx("p", { className: dT, children: i }) : null
  ] });
}
var fT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, hT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, mT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, pT = "zwn3019";
function La({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: h,
  ...m
}) {
  const v = [fT[n], mT[a], hT[i], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(s, { className: v, style: h, "data-elevation": i, ...m, children: o });
}
function gT({ children: n, className: a }) {
  const i = [pT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: i, children: n });
}
var Pr = "vrkn5p0", vT = "_93p6291", yT = "_93p6292", bT = "_93p6293", xT = "_93p6294", ST = "_93p6295", wT = "_93p6296", ET = "_93p6297", jT = "_93p6298", NT = "_93p6299", TT = "_93p629a", CT = "_93p629b", RT = "_93p629c", MT = "_93p629d", AT = "_93p629e";
function _T() {
  const { deployments: n } = Ts(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ d.jsxs("main", { className: vT, children: [
    /* @__PURE__ */ d.jsxs("header", { className: yT, children: [
      /* @__PURE__ */ d.jsx("p", { className: bT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ d.jsxs("h1", { className: xT, children: [
        "Direct your characters.",
        /* @__PURE__ */ d.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: ST, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ d.jsxs("p", { className: wT, children: [
        /* @__PURE__ */ d.jsx("span", { className: ET, children: n.length }),
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
        className: jT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ d.jsx("h2", { id: "deployments-section-list", className: Pr, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ d.jsx(
            Cs,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ d.jsx("ul", { className: NT, children: n.map((i) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(Du, { to: `/${i.deploymentId}/recipe`, className: TT, children: [
            /* @__PURE__ */ d.jsx("span", { className: CT, "aria-hidden": "true", children: DT(i.displayName) }),
            /* @__PURE__ */ d.jsxs("span", { children: [
              /* @__PURE__ */ d.jsx("span", { className: RT, children: i.displayName }),
              /* @__PURE__ */ d.jsx("span", { className: MT, children: i.deploymentId })
            ] }),
            /* @__PURE__ */ d.jsx("span", { className: AT, "aria-hidden": "true", children: "→" })
          ] }) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function DT(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var zT = Ub();
const OT = /* @__PURE__ */ Lb(zT);
function kT(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n));
}
const LT = (n) => {
  switch (n) {
    case "success":
      return VT;
    case "info":
      return HT;
    case "warning":
      return $T;
    case "error":
      return qT;
    default:
      return null;
  }
}, UT = Array(12).fill(0), BT = ({ visible: n, className: a }) => /* @__PURE__ */ he.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ he.createElement("div", {
  className: "sonner-spinner"
}, UT.map((i, s) => /* @__PURE__ */ he.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), VT = /* @__PURE__ */ he.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ he.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), $T = /* @__PURE__ */ he.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ he.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), HT = /* @__PURE__ */ he.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ he.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), qT = /* @__PURE__ */ he.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ he.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), IT = /* @__PURE__ */ he.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ he.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ he.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), FT = () => {
  const [n, a] = he.useState(document.hidden);
  return he.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), n;
};
let Gf = 1;
class YT {
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
      const { message: s, ...o } = a, c = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Gf++, h = this.toasts.find((v) => v.id === c), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(c) && this.dismissedToasts.delete(c), h ? this.toasts = this.toasts.map((v) => v.id === c ? (this.publish({
        ...v,
        ...a,
        id: c,
        title: s
      }), {
        ...v,
        ...a,
        id: c,
        dismissible: m,
        title: s
      }) : v) : this.addToast({
        title: s,
        ...o,
        dismissible: m,
        id: c
      }), c;
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
      let c = s !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], he.isValidElement(p))
          c = !1, this.create({
            id: s,
            type: "default",
            message: p
          });
        else if (XT(p) && !p.ok) {
          c = !1;
          const g = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, w = typeof g == "object" && !he.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...w
          });
        } else if (p instanceof Error) {
          c = !1;
          const g = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof g == "object" && !he.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...w
          });
        } else if (i.success !== void 0) {
          c = !1;
          const g = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof g == "object" && !he.isValidElement(g) ? g : {
            message: g
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
          c = !1;
          const x = typeof i.error == "function" ? await i.error(p) : i.error, g = typeof i.description == "function" ? await i.description(p) : i.description, E = typeof x == "object" && !he.isValidElement(x) ? x : {
            message: x
          };
          this.create({
            id: s,
            type: "error",
            description: g,
            ...E
          });
        }
      }).finally(() => {
        c && (this.dismiss(s), s = void 0), i.finally == null || i.finally.call(i);
      }), v = () => new Promise((p, x) => m.then(() => h[0] === "reject" ? x(h[1]) : p(h[1])).catch(x));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: v
      } : Object.assign(s, {
        unwrap: v
      });
    }, this.custom = (a, i) => {
      const s = i?.id || Gf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...i
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const yn = new YT(), GT = (n, a) => {
  const i = a?.id || Gf++;
  return yn.addToast({
    title: n,
    ...a,
    id: i
  }), i;
}, XT = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", KT = GT, PT = () => yn.toasts, QT = () => yn.getActiveToasts(), vn = Object.assign(KT, {
  success: yn.success,
  info: yn.info,
  warning: yn.warning,
  error: yn.error,
  custom: yn.custom,
  message: yn.message,
  promise: yn.promise,
  dismiss: yn.dismiss,
  loading: yn.loading
}, {
  getHistory: PT,
  getToasts: QT
});
kT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Xo(n) {
  return n.label !== void 0;
}
const ZT = 3, JT = "24px", WT = "16px", Cy = 4e3, eC = 356, tC = 14, nC = 45, aC = 200;
function ha(...n) {
  return n.filter(Boolean).join(" ");
}
function rC(n) {
  const [a, i] = n.split("-"), s = [];
  return a && s.push(a), i && s.push(i), s;
}
const iC = (n) => {
  var a, i, s, o, c, h, m, v, p;
  const { invert: x, toast: g, unstyled: S, interacting: E, setHeights: w, visibleToasts: N, heights: R, index: T, toasts: L, expanded: M, removeToast: _, defaultRichColors: Z, closeButton: te, style: ne, cancelButtonStyle: D, actionButtonStyle: H, className: q = "", descriptionClassName: oe = "", duration: I, position: Y, gap: se, expandByDefault: J, classNames: O, icons: C, closeButtonAriaLabel: B = "Close toast" } = n, [P, re] = he.useState(null), [A, Q] = he.useState(null), [ee, ue] = he.useState(!1), [fe, ve] = he.useState(!1), [ze, _e] = he.useState(!1), [Ve, Ut] = he.useState(!1), [Yt, me] = he.useState(!1), [Ne, Ce] = he.useState(0), [Re, Kt] = he.useState(0), at = he.useRef(g.duration || I || Cy), on = he.useRef(null), Pt = he.useRef(null), xn = T === 0, pa = T + 1 <= N, Bt = g.type, zn = g.dismissible !== !1, Vt = g.className || "", ye = g.descriptionClassName || "", Oe = he.useMemo(() => R.findIndex((ke) => ke.toastId === g.id) || 0, [
    R,
    g.id
  ]), Pe = he.useMemo(() => {
    var ke;
    return (ke = g.closeButton) != null ? ke : te;
  }, [
    g.closeButton,
    te
  ]), et = he.useMemo(() => g.duration || I || Cy, [
    g.duration,
    I
  ]), $t = he.useRef(0), Ht = he.useRef(0), Nr = he.useRef(0), ia = he.useRef(null), [Qn, Qt] = Y.split("-"), Et = he.useMemo(() => R.reduce((ke, ut, Rt) => Rt >= Oe ? ke : ke + ut.height, 0), [
    R,
    Oe
  ]), qt = FT(), ei = g.invert || x, $a = Bt === "loading";
  Ht.current = he.useMemo(() => Oe * se + Et, [
    Oe,
    Et
  ]), he.useEffect(() => {
    at.current = et;
  }, [
    et
  ]), he.useEffect(() => {
    ue(!0);
  }, []), he.useEffect(() => {
    const ke = Pt.current;
    if (ke) {
      const ut = ke.getBoundingClientRect().height;
      return Kt(ut), w((Rt) => [
        {
          toastId: g.id,
          height: ut,
          position: g.position
        },
        ...Rt
      ]), () => w((Rt) => Rt.filter((It) => It.toastId !== g.id));
    }
  }, [
    w,
    g.id
  ]), he.useLayoutEffect(() => {
    if (!ee) return;
    const ke = Pt.current, ut = ke.style.height;
    ke.style.height = "auto";
    const Rt = ke.getBoundingClientRect().height;
    ke.style.height = ut, Kt(Rt), w((It) => It.find((rt) => rt.toastId === g.id) ? It.map((rt) => rt.toastId === g.id ? {
      ...rt,
      height: Rt
    } : rt) : [
      {
        toastId: g.id,
        height: Rt,
        position: g.position
      },
      ...It
    ]);
  }, [
    ee,
    g.title,
    g.description,
    w,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const On = he.useCallback(() => {
    ve(!0), Ce(Ht.current), w((ke) => ke.filter((ut) => ut.toastId !== g.id)), setTimeout(() => {
      _(g);
    }, aC);
  }, [
    g,
    _,
    w,
    Ht
  ]);
  he.useEffect(() => {
    if (g.promise && Bt === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let ke;
    return M || E || qt ? (() => {
      if (Nr.current < $t.current) {
        const It = (/* @__PURE__ */ new Date()).getTime() - $t.current;
        at.current = at.current - It;
      }
      Nr.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      at.current !== 1 / 0 && ($t.current = (/* @__PURE__ */ new Date()).getTime(), ke = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), On();
      }, at.current));
    })(), () => clearTimeout(ke);
  }, [
    M,
    E,
    g,
    Bt,
    qt,
    On
  ]), he.useEffect(() => {
    g.delete && (On(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    On,
    g.delete
  ]);
  function ga() {
    var ke;
    if (C?.loading) {
      var ut;
      return /* @__PURE__ */ he.createElement("div", {
        className: ha(O?.loader, g == null || (ut = g.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Bt === "loading"
      }, C.loading);
    }
    return /* @__PURE__ */ he.createElement(BT, {
      className: ha(O?.loader, g == null || (ke = g.classNames) == null ? void 0 : ke.loader),
      visible: Bt === "loading"
    });
  }
  const Zn = g.icon || C?.[Bt] || LT(Bt);
  var la, cn;
  return /* @__PURE__ */ he.createElement("li", {
    tabIndex: 0,
    ref: Pt,
    className: ha(q, Vt, O?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, O?.default, O?.[Bt], g == null || (i = g.classNames) == null ? void 0 : i[Bt]),
    "data-sonner-toast": "",
    "data-rich-colors": (la = g.richColors) != null ? la : Z,
    "data-styled": !(g.jsx || g.unstyled || S),
    "data-mounted": ee,
    "data-promise": !!g.promise,
    "data-swiped": Yt,
    "data-removed": fe,
    "data-visible": pa,
    "data-y-position": Qn,
    "data-x-position": Qt,
    "data-index": T,
    "data-front": xn,
    "data-swiping": ze,
    "data-dismissible": zn,
    "data-type": Bt,
    "data-invert": ei,
    "data-swipe-out": Ve,
    "data-swipe-direction": A,
    "data-expanded": !!(M || J && ee),
    "data-testid": g.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": L.length - T,
      "--offset": `${fe ? Ne : Ht.current}px`,
      "--initial-height": J ? "auto" : `${Re}px`,
      ...ne,
      ...g.style
    },
    onDragEnd: () => {
      _e(!1), re(null), ia.current = null;
    },
    onPointerDown: (ke) => {
      ke.button !== 2 && ($a || !zn || (on.current = /* @__PURE__ */ new Date(), Ce(Ht.current), ke.target.setPointerCapture(ke.pointerId), ke.target.tagName !== "BUTTON" && (_e(!0), ia.current = {
        x: ke.clientX,
        y: ke.clientY
      })));
    },
    onPointerUp: () => {
      var ke, ut, Rt;
      if (Ve || !zn) return;
      ia.current = null;
      const It = Number(((ke = Pt.current) == null ? void 0 : ke.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Sn = Number(((ut = Pt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Rt = on.current) == null ? void 0 : Rt.getTime()), Zt = P === "x" ? It : Sn, va = Math.abs(Zt) / rt;
      if (Math.abs(Zt) >= nC || va > 0.11) {
        Ce(Ht.current), g.onDismiss == null || g.onDismiss.call(g, g), Q(P === "x" ? It > 0 ? "right" : "left" : Sn > 0 ? "down" : "up"), On(), Ut(!0);
        return;
      } else {
        var nn, z;
        (nn = Pt.current) == null || nn.style.setProperty("--swipe-amount-x", "0px"), (z = Pt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      me(!1), _e(!1), re(null);
    },
    onPointerMove: (ke) => {
      var ut, Rt, It;
      if (!ia.current || !zn || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const rt = ke.clientY - ia.current.y, Zt = ke.clientX - ia.current.x;
      var va;
      const nn = (va = n.swipeDirections) != null ? va : rC(Y);
      !P && (Math.abs(Zt) > 1 || Math.abs(rt) > 1) && re(Math.abs(Zt) > Math.abs(rt) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const V = (F) => 1 / (1.5 + Math.abs(F) / 20);
      if (P === "y") {
        if (nn.includes("top") || nn.includes("bottom"))
          if (nn.includes("top") && rt < 0 || nn.includes("bottom") && rt > 0)
            z.y = rt;
          else {
            const F = rt * V(rt);
            z.y = Math.abs(F) < Math.abs(rt) ? F : rt;
          }
      } else if (P === "x" && (nn.includes("left") || nn.includes("right")))
        if (nn.includes("left") && Zt < 0 || nn.includes("right") && Zt > 0)
          z.x = Zt;
        else {
          const F = Zt * V(Zt);
          z.x = Math.abs(F) < Math.abs(Zt) ? F : Zt;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && me(!0), (Rt = Pt.current) == null || Rt.style.setProperty("--swipe-amount-x", `${z.x}px`), (It = Pt.current) == null || It.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Pe && !g.jsx && Bt !== "loading" ? /* @__PURE__ */ he.createElement("button", {
    "aria-label": B,
    "data-disabled": $a,
    "data-close-button": !0,
    onClick: $a || !zn ? () => {
    } : () => {
      On(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: ha(O?.closeButton, g == null || (s = g.classNames) == null ? void 0 : s.closeButton)
  }, (cn = C?.close) != null ? cn : IT) : null, (Bt || g.icon || g.promise) && g.icon !== null && (C?.[Bt] !== null || g.icon) ? /* @__PURE__ */ he.createElement("div", {
    "data-icon": "",
    className: ha(O?.icon, g == null || (o = g.classNames) == null ? void 0 : o.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ga() : null, g.type !== "loading" ? Zn : null) : null, /* @__PURE__ */ he.createElement("div", {
    "data-content": "",
    className: ha(O?.content, g == null || (c = g.classNames) == null ? void 0 : c.content)
  }, /* @__PURE__ */ he.createElement("div", {
    "data-title": "",
    className: ha(O?.title, g == null || (h = g.classNames) == null ? void 0 : h.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ he.createElement("div", {
    "data-description": "",
    className: ha(oe, ye, O?.description, g == null || (m = g.classNames) == null ? void 0 : m.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ he.isValidElement(g.cancel) ? g.cancel : g.cancel && Xo(g.cancel) ? /* @__PURE__ */ he.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || D,
    onClick: (ke) => {
      Xo(g.cancel) && zn && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, ke), On());
    },
    className: ha(O?.cancelButton, g == null || (v = g.classNames) == null ? void 0 : v.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ he.isValidElement(g.action) ? g.action : g.action && Xo(g.action) ? /* @__PURE__ */ he.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || H,
    onClick: (ke) => {
      Xo(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, ke), !ke.defaultPrevented && On());
    },
    className: ha(O?.actionButton, g == null || (p = g.classNames) == null ? void 0 : p.actionButton)
  }, g.action.label) : null);
};
function Ry() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function lC(n, a) {
  const i = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const c = o === 1, h = c ? "--mobile-offset" : "--offset", m = c ? WT : JT;
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
    typeof s == "number" || typeof s == "string" ? v(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      s[p] === void 0 ? i[`${h}-${p}`] = m : i[`${h}-${p}`] = typeof s[p] == "number" ? `${s[p]}px` : s[p];
    }) : v(m);
  }), i;
}
const sC = /* @__PURE__ */ he.forwardRef(function(a, i) {
  const { id: s, invert: o, position: c = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: v, className: p, offset: x, mobileOffset: g, theme: S = "light", richColors: E, duration: w, style: N, visibleToasts: R = ZT, toastOptions: T, dir: L = Ry(), gap: M = tC, icons: _, containerAriaLabel: Z = "Notifications" } = a, [te, ne] = he.useState([]), D = he.useMemo(() => s ? te.filter((ee) => ee.toasterId === s) : te.filter((ee) => !ee.toasterId), [
    te,
    s
  ]), H = he.useMemo(() => Array.from(new Set([
    c
  ].concat(D.filter((ee) => ee.position).map((ee) => ee.position)))), [
    D,
    c
  ]), [q, oe] = he.useState([]), [I, Y] = he.useState(!1), [se, J] = he.useState(!1), [O, C] = he.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), B = he.useRef(null), P = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), re = he.useRef(null), A = he.useRef(!1), Q = he.useCallback((ee) => {
    ne((ue) => {
      var fe;
      return (fe = ue.find((ve) => ve.id === ee.id)) != null && fe.delete || yn.dismiss(ee.id), ue.filter(({ id: ve }) => ve !== ee.id);
    });
  }, []);
  return he.useEffect(() => yn.subscribe((ee) => {
    if (ee.dismiss) {
      requestAnimationFrame(() => {
        ne((ue) => ue.map((fe) => fe.id === ee.id ? {
          ...fe,
          delete: !0
        } : fe));
      });
      return;
    }
    setTimeout(() => {
      OT.flushSync(() => {
        ne((ue) => {
          const fe = ue.findIndex((ve) => ve.id === ee.id);
          return fe !== -1 ? [
            ...ue.slice(0, fe),
            {
              ...ue[fe],
              ...ee
            },
            ...ue.slice(fe + 1)
          ] : [
            ee,
            ...ue
          ];
        });
      });
    });
  }), [
    te
  ]), he.useEffect(() => {
    if (S !== "system") {
      C(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? C("dark") : C("light")), typeof window > "u") return;
    const ee = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      ee.addEventListener("change", ({ matches: ue }) => {
        C(ue ? "dark" : "light");
      });
    } catch {
      ee.addListener(({ matches: fe }) => {
        try {
          C(fe ? "dark" : "light");
        } catch (ve) {
          console.error(ve);
        }
      });
    }
  }, [
    S
  ]), he.useEffect(() => {
    te.length <= 1 && Y(!1);
  }, [
    te
  ]), he.useEffect(() => {
    const ee = (ue) => {
      var fe;
      if (h.every((_e) => ue[_e] || ue.code === _e)) {
        var ze;
        Y(!0), (ze = B.current) == null || ze.focus();
      }
      ue.code === "Escape" && (document.activeElement === B.current || (fe = B.current) != null && fe.contains(document.activeElement)) && Y(!1);
    };
    return document.addEventListener("keydown", ee), () => document.removeEventListener("keydown", ee);
  }, [
    h
  ]), he.useEffect(() => {
    if (B.current)
      return () => {
        re.current && (re.current.focus({
          preventScroll: !0
        }), re.current = null, A.current = !1);
      };
  }, [
    B.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ he.createElement("section", {
    ref: i,
    "aria-label": `${Z} ${P}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, H.map((ee, ue) => {
    var fe;
    const [ve, ze] = ee.split("-");
    return D.length ? /* @__PURE__ */ he.createElement("ol", {
      key: ee,
      dir: L === "auto" ? Ry() : L,
      tabIndex: -1,
      ref: B,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": O,
      "data-y-position": ve,
      "data-x-position": ze,
      style: {
        "--front-toast-height": `${((fe = q[0]) == null ? void 0 : fe.height) || 0}px`,
        "--width": `${eC}px`,
        "--gap": `${M}px`,
        ...N,
        ...lC(x, g)
      },
      onBlur: (_e) => {
        A.current && !_e.currentTarget.contains(_e.relatedTarget) && (A.current = !1, re.current && (re.current.focus({
          preventScroll: !0
        }), re.current = null));
      },
      onFocus: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || A.current || (A.current = !0, re.current = _e.relatedTarget);
      },
      onMouseEnter: () => Y(!0),
      onMouseMove: () => Y(!0),
      onMouseLeave: () => {
        se || Y(!1);
      },
      onDragEnd: () => Y(!1),
      onPointerDown: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || J(!0);
      },
      onPointerUp: () => J(!1)
    }, D.filter((_e) => !_e.position && ue === 0 || _e.position === ee).map((_e, Ve) => {
      var Ut, Yt;
      return /* @__PURE__ */ he.createElement(iC, {
        key: _e.id,
        icons: _,
        index: Ve,
        toast: _e,
        defaultRichColors: E,
        duration: (Ut = T?.duration) != null ? Ut : w,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Yt = T?.closeButton) != null ? Yt : v,
        interacting: se,
        position: ee,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: Q,
        toasts: D.filter((me) => me.position == _e.position),
        heights: q.filter((me) => me.position == _e.position),
        setHeights: oe,
        expandByDefault: m,
        gap: M,
        expanded: I,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), My = 32, Ay = -30, _y = -6, Dy = 0.5, zy = 2, Oy = -24, ky = 24, Ly = -12, Uy = 12, By = -12, Vy = 12, $y = -60, Hy = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function yx(n, a, i, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${wr}${o}`, h = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), v = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(v, p);
  }
  if (!h.ok)
    throw new Error(await zu(h, "apply"));
  return await h.json();
}
async function oC(n, a, i, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${wr}${c}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const v = await m.json().catch(() => null), p = v?.error?.current_digest ?? "", x = v?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(p, x);
  }
  if (!m.ok)
    throw new Error(await zu(m, "apply"));
  return await m.json();
}
async function uC(n, a, i = {}) {
  const s = `${wr}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function cC(n, a, i, s = {}) {
  const o = `${wr}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await zu(c, "preview"));
  return c.blob();
}
async function cu(n, a, i, s = 50, o = {}) {
  const c = `${wr}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await zu(h, "audit fetch"));
  return await h.json();
}
function bn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function bx(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > My)
    return {
      message: `Chain exceeds the maximum of ${My} operations.`
    };
  for (const i of n.ops) {
    const s = dC(i, a);
    if (s) return s;
  }
  return null;
}
function dC(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return fC(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < Ay || n.target_lufs > _y ? {
        opId: n.id,
        message: `Normalize target must be between ${Ay} and ${_y} LUFS.`
      } : null;
    case "speed":
      return n.factor < Dy || n.factor > zy ? {
        opId: n.id,
        message: `Speed factor must be between ${Dy}× and ${zy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < Oy || n.gain_db > ky ? {
        opId: n.id,
        message: `Volume must be between ${Oy} and ${ky} dB.`
      } : null;
    case "eq3":
      for (const [i, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < Ly || s > Uy)
          return {
            opId: n.id,
            message: `EQ ${i} must be between ${Ly} and ${Uy} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < By || n.semitones > Vy ? {
        opId: n.id,
        message: `Pitch must be between ${By} and ${Vy} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < $y || n.threshold_db > Hy ? {
        opId: n.id,
        message: `Silence threshold must be between ${$y} and ${Hy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function fC(n, a, i, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && i > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function zu(n, a) {
  const i = await n.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${n.status}`;
}
var hC = "_3f2ar0", mC = "_3f2ar1", pC = "_3f2ar2", gC = "_3f2ar3", vC = "_3f2ar4", yC = "_3f2ar6", Jl = "_3f2ar7", Wl = "_3f2ar8", es = "_3f2ar9", qy = "_3f2ara", Iy = "_3f2arb";
function bC({ label: n, glyph: a = "?", children: i }) {
  const [s, o] = b.useState(!1), c = b.useRef(null), h = b.useId(), m = `${h}-content`, v = b.useCallback(() => o(!1), []);
  return b.useEffect(() => {
    if (!s) return;
    const p = (g) => {
      c.current && (g.target instanceof Node && c.current.contains(g.target) || v());
    }, x = (g) => {
      g.key === "Escape" && v();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", x), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", x);
    };
  }, [s, v]), /* @__PURE__ */ d.jsxs("span", { ref: c, className: hC, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: mC,
        "aria-expanded": s,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: pC, "aria-hidden": "true", children: a }),
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
        className: gC,
        children: i
      }
    )
  ] });
}
var xC = "a6ki8u0", SC = "a6ki8u1", wC = "a6ki8u2", EC = "a6ki8u3", jC = "a6ki8u4", NC = "a6ki8u5", TC = "a6ki8u6", lf = "a6ki8u7", CC = "a6ki8u8", RC = "a6ki8u9", MC = "a6ki8ua", AC = "a6ki8ub", _C = "a6ki8uc", DC = "a6ki8ud", zC = "a6ki8ue", OC = "a6ki8uf", kC = "a6ki8ug", LC = "a6ki8uh", UC = "a6ki8ui", BC = "_1lguv7x0", VC = "_1lguv7x1", $C = "_1lguv7x2", HC = "_1lguv7x3", qC = "_1lguv7x4", IC = "_1lguv7x5", FC = "_1lguv7x6", YC = "_1lguv7x7", GC = "_1lguv7x8", XC = "_1lguv7x9", KC = "_1lguv7xa", PC = "_1lguv7xb", QC = "_1lguv7xc", Fy = "_1lguv7xd", ZC = "_1lguv7xe", JC = "_1lguv7xf", sf = "_1lguv7xg", WC = "_1lguv7xh";
const eR = 28;
function tR(n) {
  if (!n) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(n.length, 12); i++)
    a = a * 33 + n.charCodeAt(i) >>> 0;
  return a || 1;
}
function nR(n, a) {
  const i = new Array(a);
  let s = n;
  for (let o = 0; o < a; o++) {
    s = (s * 9301 + 49297) % 233280;
    const c = s / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + c * 0.68));
  }
  return i;
}
function aR(n) {
  if (n == null) return "—";
  const a = Math.max(0, Math.round(n / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function rR(n) {
  return n ? `${(n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function iR({
  asset: n,
  presentation: a,
  usedBy: i,
  isPlaying: s,
  onTogglePlay: o,
  onRename: c,
  onCopyName: h,
  onDelete: m,
  onPlaybackEnded: v
}) {
  const [p, x] = b.useState(!1), [g, S] = b.useState(n.displayName), E = b.useRef(null), w = b.useMemo(() => tR(n.contentSha256), [n.contentSha256]), N = b.useMemo(() => nR(w, eR), [w]), R = b.useMemo(() => lT(n), [n]);
  b.useEffect(() => {
    S(n.displayName);
  }, [n.displayName]), b.useEffect(() => {
    const M = E.current;
    M && (s && R ? M.play().catch(() => {
    }) : (M.pause(), M.currentTime = 0));
  }, [s, R]);
  const T = async () => {
    const M = g.trim();
    if (!M || M === n.displayName) {
      x(!1), S(n.displayName);
      return;
    }
    try {
      await c(M);
    } finally {
      x(!1);
    }
  }, L = `${aR(n.durationMs)} · ${rR(n.sampleRate)}`;
  return /* @__PURE__ */ d.jsxs("article", { className: BC, "data-playing": s ? "true" : "false", children: [
    /* @__PURE__ */ d.jsxs("header", { className: VC, children: [
      /* @__PURE__ */ d.jsx("span", { className: $C, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ d.jsxs("div", { className: HC, children: [
        p ? /* @__PURE__ */ d.jsx(
          "input",
          {
            className: IC,
            value: g,
            autoFocus: !0,
            onChange: (M) => S(M.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (M) => {
              M.key === "Enter" ? (M.preventDefault(), M.currentTarget.blur()) : M.key === "Escape" && (x(!1), S(n.displayName));
            },
            "aria-label": `Rename ${n.displayName}`
          }
        ) : /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: qC,
            onDoubleClick: () => x(!0),
            title: "Double-click to rename",
            children: n.displayName
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: FC, children: L })
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: YC, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: GC,
        "data-playing": s ? "true" : "false",
        disabled: R == null,
        title: R ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": s ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ d.jsx("span", { className: XC, "aria-hidden": "true", children: s ? "❚❚" : "▶" }),
          /* @__PURE__ */ d.jsx("span", { className: KC, "aria-hidden": "true", children: N.map((M, _) => /* @__PURE__ */ d.jsx("span", { className: PC, style: { height: `${Math.round(M * 100)}%` } }, _)) })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("footer", { className: QC, children: [
      i.length > 0 ? /* @__PURE__ */ d.jsxs("span", { className: Fy, children: [
        /* @__PURE__ */ d.jsx("span", { children: "used by" }),
        i.map((M) => /* @__PURE__ */ d.jsx(
          "span",
          {
            className: ZC,
            style: { color: M.color, borderColor: M.color },
            children: M.characterName
          },
          M.characterName
        ))
      ] }) : /* @__PURE__ */ d.jsx("span", { className: Fy, children: "unassigned" }),
      /* @__PURE__ */ d.jsxs("span", { className: JC, children: [
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: sf,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => x(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: sf,
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
            className: sf,
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
        className: WC,
        onEnded: v
      }
    )
  ] });
}
var lR = "_17eol300", sR = "_17eol301", oR = "_17eol302", uR = "_17eol303", cR = "_17eol304", dR = "_17eol305", Ui = "_17eol306", fR = "_17eol307", hR = "_17eol308", mR = "_17eol309", pR = "_17eol30a", gR = "_17eol30b", vR = "_17eol30c";
function yR() {
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
function bR(n) {
  const a = Math.max(0, Math.floor(n / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function xR({
  open: n,
  defaultName: a,
  onClose: i,
  onSubmit: s
}) {
  const [o, c] = b.useState("idle"), [h, m] = b.useState(null), [v, p] = b.useState(0), [x, g] = b.useState(null), [S, E] = b.useState(a), [w, N] = b.useState(!1), R = b.useRef(null), T = b.useRef(null), L = b.useRef([]), M = b.useRef(0), _ = b.useRef(null), Z = b.useRef(null), te = b.useRef({ mime: "audio/webm", ext: "webm" }), ne = b.useCallback(() => {
    if (T.current) {
      for (const Y of T.current.getTracks()) Y.stop();
      T.current = null;
    }
    _.current != null && (window.clearInterval(_.current), _.current = null);
  }, []), D = b.useCallback(() => {
    ne(), x && URL.revokeObjectURL(x), g(null), L.current = [], Z.current = null, p(0), m(null), c("idle");
  }, [x, ne]);
  if (b.useEffect(() => {
    n || (D(), E(a));
  }, [n, a, D]), b.useEffect(() => () => {
    ne(), x && URL.revokeObjectURL(x);
  }, [x, ne]), !n) return null;
  const H = async () => {
    m(null), c("preparing");
    try {
      const Y = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = Y;
      const se = yR();
      te.current = se;
      const J = se.mime ? new MediaRecorder(Y, { mimeType: se.mime }) : new MediaRecorder(Y);
      R.current = J, L.current = [], J.ondataavailable = (O) => {
        O.data && O.data.size > 0 && L.current.push(O.data);
      }, J.onstop = () => {
        const O = se.mime || "audio/webm", C = new Blob(L.current, { type: O }), B = new File([C], `${S || a || "recording"}.${se.ext}`, {
          type: O
        });
        Z.current = B;
        const P = URL.createObjectURL(C);
        g(P), c("ready"), ne();
      }, J.start(), M.current = Date.now(), p(0), _.current = window.setInterval(() => {
        p(Date.now() - M.current);
      }, 200), c("recording");
    } catch (Y) {
      const se = Y instanceof Error ? Y.message : "could not access microphone";
      m(se), c(se.toLowerCase().includes("denied") ? "denied" : "error"), ne();
    }
  }, q = () => {
    const Y = R.current;
    Y && Y.state !== "inactive" && Y.stop(), _.current != null && (window.clearInterval(_.current), _.current = null);
  }, oe = async () => {
    const Y = Z.current;
    if (!Y) return;
    const se = (S || a).trim();
    if (!se) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await s(Y, se), i();
    } catch (J) {
      m(J instanceof Error ? J.message : "upload failed");
    } finally {
      N(!1);
    }
  }, I = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ d.jsx("div", { className: lR, role: "presentation", onClick: i, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: sR,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (Y) => Y.stopPropagation(),
      children: [
        /* @__PURE__ */ d.jsx("h2", { id: "mic-recorder-heading", className: oR, children: "Record reference audio" }),
        /* @__PURE__ */ d.jsx("p", { className: uR, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: cR,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: I
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: pR, "aria-live": "polite", children: bR(v) }),
        /* @__PURE__ */ d.jsxs("div", { className: dR, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: Ui,
              "data-tone": "danger",
              onClick: () => {
                H();
              },
              children: "● Record"
            }
          ),
          o === "preparing" && /* @__PURE__ */ d.jsx("button", { type: "button", className: Ui, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ d.jsx("button", { type: "button", className: Ui, "data-tone": "danger", onClick: q, children: "■ Stop" }),
          o === "ready" && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: Ui,
              onClick: () => {
                D();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        x && /* @__PURE__ */ d.jsx("audio", { className: gR, src: x, controls: !0, preload: "auto" }),
        /* @__PURE__ */ d.jsxs("label", { className: fR, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: hR,
              value: S,
              onChange: (Y) => E(Y.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ d.jsx("div", { className: mR, children: h }),
        /* @__PURE__ */ d.jsxs("div", { className: vR, children: [
          /* @__PURE__ */ d.jsx("button", { type: "button", className: Ui, onClick: i, disabled: w, children: "Cancel" }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: Ui,
              "data-tone": "accent",
              onClick: () => {
                oe();
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
function SR({
  deploymentId: n,
  voiceAssets: a,
  mappings: i,
  characterColors: s,
  onVoiceAssetsChange: o
}) {
  const [c, h] = b.useState(""), [m, v] = b.useState("all"), [p, x] = b.useState(!1), [g, S] = b.useState(null), [E, w] = b.useState(!1), [N, R] = b.useState(!1), T = b.useRef(null), L = b.useCallback(
    (Y) => "upload",
    []
  ), M = b.useMemo(() => {
    const Y = c.trim().toLowerCase();
    return a.filter((se) => {
      const J = L(se);
      return !(m === "uploaded" && J !== "upload" || m === "preset" && J !== "preset" || Y && !se.displayName.toLowerCase().includes(Y));
    });
  }, [a, c, m, L]), _ = b.useMemo(
    () => a.filter((Y) => L(Y) === "upload").length,
    [a, L]
  ), Z = b.useCallback(
    (Y) => {
      const se = [], J = /* @__PURE__ */ new Set();
      for (const O of i)
        O.speakerVoiceAssetId === Y && (J.has(O.characterName) || (J.add(O.characterName), se.push({
          characterName: O.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: s[O.characterName] ?? "#ba9eff"
        })));
      return se;
    },
    [i, s]
  ), te = b.useCallback(
    async (Y) => {
      const se = Array.from(Y).slice(0, 8);
      if (se.length !== 0) {
        R(!0);
        try {
          const J = [];
          for (const O of se) {
            if (!O.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(O.name)) {
              vn.error(`${O.name}: not an audio file`);
              continue;
            }
            const C = O.name.replace(/\.[^.]+$/, "");
            try {
              const B = await vu(n, O, C, "speaker");
              J.push(B), vn.success(`Added ${B.displayName}`);
            } catch (B) {
              vn.error(B instanceof Error ? B.message : `${O.name}: upload failed`);
            }
          }
          J.length > 0 && o([...J, ...a]);
        } finally {
          R(!1);
        }
      }
    },
    [n, a, o]
  ), ne = (Y) => {
    Y.preventDefault(), x(!1), Y.dataTransfer?.files && te(Y.dataTransfer.files);
  }, D = b.useCallback(async () => {
    const Y = window.prompt("Paste an audio URL (https://…)");
    if (Y)
      try {
        const se = await fetch(Y);
        if (!se.ok) throw new Error(`fetch failed: ${se.status}`);
        const J = await se.blob(), O = Y.split("/").pop()?.split("?")[0] ?? "voice.wav", C = new File([J], O, { type: J.type || "audio/wav" });
        await te([C]);
      } catch (se) {
        vn.error(se instanceof Error ? se.message : "could not fetch URL");
      }
  }, [te]), H = b.useCallback(
    async (Y, se) => {
      try {
        const J = await iT(n, Y, se);
        o(
          a.map((O) => O.voiceAssetId === Y ? J : O)
        ), vn.success(`Renamed to ${J.displayName}`);
      } catch (J) {
        vn.error(J instanceof Error ? J.message : "rename failed");
      }
    },
    [n, a, o]
  ), q = b.useCallback((Y) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(Y), vn.success("Copied name")) : vn.error("Clipboard unavailable");
  }, []), oe = b.useCallback(
    async (Y) => {
      if (window.confirm(`Delete "${Y.displayName}"? Mappings using it will reset.`))
        try {
          await rT(n, Y.voiceAssetId), o(a.filter((J) => J.voiceAssetId !== Y.voiceAssetId)), vn.success(`Deleted ${Y.displayName}`);
        } catch (J) {
          vn.error(J instanceof Error ? J.message : "delete failed");
        }
    },
    [n, a, o]
  );
  return /* @__PURE__ */ d.jsxs("div", { className: xC, children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: SC,
        "data-over": p ? "true" : "false",
        onDragOver: (Y) => {
          Y.preventDefault(), x(!0);
        },
        onDragLeave: () => x(!1),
        onDrop: ne,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: wC, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ d.jsxs("div", { className: EC, children: [
            /* @__PURE__ */ d.jsxs("div", { className: jC, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ d.jsx("span", { className: NC, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: TC, children: [
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
            "button",
            {
              type: "button",
              className: CC,
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
              className: UC,
              onChange: (Y) => {
                Y.target.files && (te(Y.target.files), Y.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: RC, children: [
      /* @__PURE__ */ d.jsxs("label", { className: MC, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            className: AC,
            value: c,
            onChange: (Y) => h(Y.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: _C, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([Y, se]) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: DC,
          "data-active": m === Y ? "true" : "false",
          onClick: () => v(Y),
          children: se
        },
        Y
      )) }),
      /* @__PURE__ */ d.jsxs("span", { className: kC, children: [
        /* @__PURE__ */ d.jsx("span", { className: LC, children: a.length }),
        " voices",
        /* @__PURE__ */ d.jsx("span", { children: "·" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          _,
          " uploaded"
        ] })
      ] })
    ] }),
    M.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: OC, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ d.jsx("div", { className: zC, children: M.map((Y) => {
      const se = L(Y);
      return /* @__PURE__ */ d.jsx(
        iR,
        {
          asset: Y,
          presentation: se,
          usedBy: Z(Y.voiceAssetId),
          isPlaying: g === Y.voiceAssetId,
          onTogglePlay: () => S((J) => J === Y.voiceAssetId ? null : Y.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (J) => H(Y.voiceAssetId, J),
          onCopyName: () => q(Y.displayName),
          onDelete: se === "upload" ? () => void oe(Y) : void 0
        },
        Y.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ d.jsx(
      xR,
      {
        open: E,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => w(!1),
        onSubmit: async (Y, se) => {
          await I(Y, se);
        }
      }
    )
  ] });
  async function I(Y, se) {
    R(!0);
    try {
      const J = await vu(n, Y, se, "speaker");
      o([J, ...a]), vn.success(`Recorded ${J.displayName}`);
    } catch (J) {
      throw vn.error(J instanceof Error ? J.message : "upload failed"), J;
    } finally {
      R(!1);
    }
  }
}
async function xx(n) {
  return mt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function wR(n, a, i) {
  return mt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: i })
  });
}
async function ER(n, a) {
  await mt(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var Yy = "_190jlds0", jR = "_190jlds1", NR = "_190jlds2", TR = "_190jlds3", CR = "_190jlds4", RR = "_190jlds5", MR = "_190jlds7", AR = "_190jlds8", _R = "_190jlds9", DR = "_190jldsa", zR = "_190jldsb", Gy = "_190jldsc", OR = "_190jldsd", Xy = "_190jldse", kR = "_190jldsf", LR = "_190jldsg", UR = "_190jldsh", Sx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, wx = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function ft({
  variant: n = "primary",
  size: a = "md",
  type: i = "button",
  loading: s = !1,
  disabled: o,
  children: c,
  className: h,
  style: m,
  ...v
}) {
  const p = [Sx[n], wx[a], h].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      type: i,
      className: p,
      style: m,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...v,
      children: c
    }
  );
}
function BR({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [c, h] = b.useState(() => Bi(a[0])), [m, v] = b.useState([]), [p, x] = b.useState(!1), [g, S] = b.useState(null), [E, w] = b.useState(!1), [N, R] = b.useState(null), T = b.useMemo(
    () => a.find((_) => Bi(_) === c) ?? a[0],
    [a, c]
  );
  b.useEffect(() => {
    a.length && (a.some((_) => Bi(_) === c) || h(Bi(a[0])));
  }, [a, c]), b.useEffect(() => {
    if (!T) {
      v([]);
      return;
    }
    let _ = !1;
    return x(!0), S(null), cu(n, T.kind, T.id, 50).then((Z) => {
      _ || v(Z.entries);
    }).catch((Z) => {
      _ || S(Z instanceof Error ? Z.message : "audit fetch failed");
    }).finally(() => {
      _ || x(!1);
    }), () => {
      _ = !0;
    };
  }, [n, T]);
  const L = b.useCallback(() => {
    if (!T) return;
    const _ = {
      deploymentId: n,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, Z = new Blob([JSON.stringify(_, null, 2)], {
      type: "application/json"
    }), te = URL.createObjectURL(Z), ne = document.createElement("a");
    ne.href = te, ne.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ne), ne.click(), document.body.removeChild(ne), URL.revokeObjectURL(te);
  }, [n, m, T]), M = b.useCallback(async () => {
    if (!(!T || !i) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await i(T);
        const _ = await cu(n, T.kind, T.id, 50);
        v(_.entries);
      } catch (_) {
        S(_ instanceof Error ? _.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [n, i, T]);
  return a.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Yy, children: /* @__PURE__ */ d.jsx("p", { className: Xy, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ d.jsxs("div", { className: Yy, children: [
    /* @__PURE__ */ d.jsxs("header", { className: jR, children: [
      /* @__PURE__ */ d.jsxs("div", { className: NR, children: [
        /* @__PURE__ */ d.jsx("label", { htmlFor: "audit-target-select", className: Gy, children: "Target" }),
        /* @__PURE__ */ d.jsx(
          "select",
          {
            id: "audit-target-select",
            className: TR,
            value: c,
            onChange: (_) => h(_.target.value),
            children: a.map((_) => /* @__PURE__ */ d.jsxs("option", { value: Bi(_), children: [
              _.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              _.label
            ] }, Bi(_)))
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: CR, children: [
        /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: L,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void M(),
            disabled: E || !T,
            children: E ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ d.jsx("div", { className: LR, children: g }),
    p && !g && /* @__PURE__ */ d.jsx("div", { className: UR, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !g && m.length === 0 && /* @__PURE__ */ d.jsxs("p", { className: Xy, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ d.jsx("br", {}),
      /* @__PURE__ */ d.jsx("span", { className: kR, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !g && m.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: MR, children: m.map((_) => {
      const Z = s && T && !!_.chain_snapshot_json && _.operation_count > 0;
      return /* @__PURE__ */ d.jsxs("li", { className: AR, children: [
        /* @__PURE__ */ d.jsx("span", { className: _R, children: VR(_.recorded_at) }),
        /* @__PURE__ */ d.jsx("span", { className: DR, children: _.operation_count === 0 ? "cleared" : `${_.operation_count} ops` }),
        /* @__PURE__ */ d.jsxs("span", { className: zR, title: _.digest_after, children: [
          _.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: Gy, children: _.actor || "—" }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: OR,
            style: {
              background: `color-mix(in oklab, ${_.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: _.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: _.digest_before === "" || !_.digest_before ? "create" : _.operation_count === 0 ? "clear" : "update"
          }
        ),
        Z && /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: RR,
            disabled: E || N !== null,
            onClick: async () => {
              if (!(!T || !_.chain_snapshot_json) && !(N !== null || E) && window.confirm(
                `Replay this ${_.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                R(_.entry_id);
                try {
                  await s(T, _.chain_snapshot_json, _);
                  const te = await cu(
                    n,
                    T.kind,
                    T.id,
                    50
                  );
                  v(te.entries);
                } catch (te) {
                  S(te instanceof Error ? te.message : "revert failed");
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
function Bi(n) {
  return n ? `${n.kind}:${n.id}` : "";
}
function VR(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var $R = "_1uzgubz0", HR = "_1uzgubz1", qR = "_1uzgubz2", IR = "_1uzgubz3", FR = "_1uzgubz4", YR = "_1uzgubz5", GR = "_1uzgubz6", XR = "_1uzgubz7", Ky = "_1uzgubz8", KR = "_1uzgubz9", Ex = "_1uzgubza", jx = "_1uzgubzb", PR = "_1uzgubzc", QR = "_1uzgubzd", of = "_1uzgubze", uf = "_1uzgubzf", ZR = "_1uzgubzg", JR = "_1uzgubzh", Py = "_1uzgubzi", Qy = "_1uzgubzj", Zy = "_1uzgubzk", Jy = "_1uzgubzl", Wy = "_1uzgubzm", WR = "_1uzgubzn", eM = "_1uzgubzo", tM = "_1uzgubzp", nM = "_1uzgubzq", aM = "_1uzgubzr";
function rM({
  characterName: n,
  color: a,
  lineCount: i,
  mapping: s,
  voiceAssets: o,
  presets: c,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: v,
  onAssignPreset: p,
  onUploadFile: x,
  onClearMapping: g
}) {
  const [S, E] = b.useState(!1), w = s ? o.find((L) => L.voiceAssetId === s.speakerVoiceAssetId) : null, N = s?.defaultVectorPresetId ? c.find((L) => L.presetId === s.defaultVectorPresetId) ?? null : null, R = (n[0] ?? "?").toUpperCase(), T = s !== null;
  return /* @__PURE__ */ d.jsxs("div", { className: `${$R}${h ? ` ${HR}` : ""}`, children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: qR,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: IR,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: R
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: FR, children: [
            /* @__PURE__ */ d.jsx("span", { className: YR, style: { color: a }, children: n }),
            /* @__PURE__ */ d.jsxs("span", { className: GR, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: XR, children: [
            w ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: Ky, children: w.displayName }),
              w.durationMs != null && /* @__PURE__ */ d.jsxs("span", { children: [
                e0(w.durationMs),
                " ·",
                " ",
                w.sampleRate ? `${w.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("span", { className: Ky, children: N.presetName }),
              /* @__PURE__ */ d.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ d.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ d.jsxs("span", { className: PR, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: `${KR} ${T ? Ex : jx}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ d.jsxs("div", { className: QR, children: [
      /* @__PURE__ */ d.jsxs("div", { className: of, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Drop new audio" }),
        /* @__PURE__ */ d.jsxs(
          "label",
          {
            className: `${ZR}${S ? ` ${JR}` : ""}`,
            onDragEnter: (L) => {
              L.preventDefault(), E(!0);
            },
            onDragOver: (L) => L.preventDefault(),
            onDragLeave: () => E(!1),
            onDrop: (L) => {
              L.preventDefault(), E(!1);
              const M = L.dataTransfer.files?.[0];
              M && x && x(M);
            },
            children: [
              /* @__PURE__ */ d.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (L) => {
                    const M = L.target.files?.[0];
                    M && x && x(M);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: of, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Reference library" }),
        /* @__PURE__ */ d.jsx("div", { className: Py, children: o.map((L) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${Qy}${s?.speakerVoiceAssetId === L.voiceAssetId ? ` ${Zy}` : ""}`,
            onClick: () => v(L.voiceAssetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: Jy, children: L.displayName }),
              /* @__PURE__ */ d.jsxs("span", { className: Wy, children: [
                L.durationMs != null ? e0(L.durationMs) : "—",
                " ",
                "·",
                " ",
                L.sampleRate ? `${L.sampleRate} Hz` : "—"
              ] })
            ]
          },
          L.voiceAssetId
        )) })
      ] }),
      c.length > 0 && p && /* @__PURE__ */ d.jsxs("div", { className: of, children: [
        /* @__PURE__ */ d.jsx("span", { className: uf, children: "Preset voices" }),
        /* @__PURE__ */ d.jsx("div", { className: Py, children: c.map((L) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: `${Qy}${s?.defaultVectorPresetId === L.presetId ? ` ${Zy}` : ""}`,
            onClick: () => p(L.presetId),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: Jy, children: L.presetName }),
              /* @__PURE__ */ d.jsx("span", { className: Wy, children: "preset · vector" })
            ]
          },
          L.presetId
        )) })
      ] }),
      T && g && /* @__PURE__ */ d.jsx("button", { type: "button", className: aM, onClick: g, children: "Clear mapping →" })
    ] })
  ] });
}
function e0(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function iM({
  unmappedCount: n,
  totalCount: a,
  children: i,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ d.jsx("p", { className: nM, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("header", { className: WR, children: /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `${eM} ${o ? Ex : jx}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ d.jsx("ul", { className: tM, children: i })
  ] });
}
async function Xf() {
  return mt("/runtime/health");
}
async function lM() {
  await mt("/runtime/start", { method: "POST" });
}
async function sM() {
  return mt("/runtime/stop", { method: "POST" });
}
function Nx(n) {
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
var oM = "g5r6d10", uM = "g5r6d11", cM = "g5r6d12", dM = "g5r6d13", fM = "g5r6d14", hM = "g5r6d15", mM = "g5r6d1a", pM = "g5r6d1b", gM = "g5r6d1c", vM = "g5r6d1d", yM = "g5r6d1e", bM = "g5r6d1g", xM = "g5r6d1h", SM = "g5r6d1i", wM = "g5r6d1j", EM = "g5r6d1k", jM = "g5r6d1l", t0 = "g5r6d1m", NM = "g5r6d1n", TM = "g5r6d1o", CM = "g5r6d1p", n0 = "g5r6d1q", a0 = "g5r6d1r", RM = "g5r6d1s", MM = "g5r6d1t", Yi = "g5r6d1u", Tx = "g5r6d1v", r0 = "g5r6d1w", AM = "g5r6d1x", _M = "g5r6d1y", dr = "g5r6d1z", DM = "g5r6d110", zM = "g5r6d111", OM = "g5r6d112", kM = "g5r6d113", LM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Dn({
  severity: n,
  children: a,
  role: i,
  ariaLive: s,
  className: o,
  style: c
}) {
  const h = [LM[n], o].filter(Boolean).join(" "), m = i ?? (n === "error" ? "alert" : "status"), v = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ d.jsx("div", { className: h, role: m, "aria-live": v, style: c, children: a });
}
var Cx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Rx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, UM = "_13bb4njb";
function br({
  tone: n,
  size: a = "sm",
  pulse: i = !1,
  children: s,
  className: o,
  style: c,
  title: h
}) {
  const m = i && n !== "faint", v = [Cx[a], Rx[n], m ? UM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("span", { className: v, style: c, title: h, children: s });
}
const BM = 4e3;
function VM({ deployment: n }) {
  const [a, i] = b.useState(null), [s, o] = b.useState(null);
  b.useEffect(() => {
    let m = !1;
    const v = async () => {
      try {
        const x = await Xf();
        m || (i(x), o(null));
      } catch (x) {
        m || o(qM(x));
      }
    };
    v();
    const p = setInterval(v, BM);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const c = a?.badge ?? "not_installed", h = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ d.jsxs("output", { className: Tx, "aria-live": "polite", children: [
    /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Runtime" }),
    /* @__PURE__ */ d.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Badge" }),
    /* @__PURE__ */ d.jsx(br, { tone: $M(c), pulse: c === "starting" || c === "installing", children: Nx(c) }),
    a && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "Uptime" }),
      /* @__PURE__ */ d.jsx("span", { children: HM(a.uptimeSeconds) }),
      /* @__PURE__ */ d.jsx("span", { className: Yi, children: "VRAM" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    s && !h && /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: s })
  ] });
}
function $M(n) {
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
function HM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function qM(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
const yu = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Ou = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ua = 1e-3;
function IM(n, a, i) {
  for (const s of Object.keys(yu)) {
    const o = yu[s];
    if (Math.abs(o.low - n) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - i) < Ua)
      return s;
  }
  return "custom";
}
function FM(n) {
  let a = GM();
  for (const i of n.ops)
    a = YM(a, i);
  return a;
}
function YM(n, a) {
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
          preset: IM(a.low_db, a.mid_db, a.high_db)
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
function GM() {
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
function Er(n, a) {
  return n.ops.filter((i) => i.mode !== a);
}
function jr(n, a) {
  return [...n, a];
}
function XM(n, a) {
  const i = Er(n, "gain");
  if (Math.abs(a) < Ua) return { ...n, ops: i };
  const s = { id: bn(), mode: "gain", gain_db: a };
  return { ...n, ops: jr(i, s) };
}
function KM(n, a, i, s) {
  const o = Er(n, "eq3");
  if (Math.abs(a) < Ua && Math.abs(i) < Ua && Math.abs(s) < Ua)
    return { ...n, ops: o };
  const c = {
    id: bn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: s
  };
  return { ...n, ops: jr(o, c) };
}
function PM(n, a) {
  const i = Er(n, "speed");
  if (Math.abs(a - 1) < Ua) return { ...n, ops: i };
  const s = { id: bn(), mode: "speed", factor: a };
  return { ...n, ops: jr(i, s) };
}
function QM(n, a) {
  const i = Er(n, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...n, ops: i };
  const s = {
    id: bn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: jr(i, s) };
}
function ZM(n, a, i) {
  const s = Er(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: bn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...n, ops: jr(s, o) };
}
function JM(n, a) {
  const i = Er(n, "fade_in");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: bn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: jr(i, s) };
}
function WM(n, a) {
  const i = Er(n, "fade_out");
  if (a <= 0) return { ...n, ops: i };
  const s = {
    id: bn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: jr(i, s) };
}
function eA(n, a, i) {
  const s = Er(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: bn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...n, ops: jr(s, o) };
}
const Mx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Ax(n, a) {
  const i = {
    ...n,
    ops: n.ops.filter((c) => !Mx.has(c.mode))
  };
  let o = XM({ version: 1, ops: [] }, a.volumeDb);
  return o = KM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = PM(o, a.speed.value)), o = QM(o, a.pitchSt), o = ZM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = JM(o, a.fade.inS), o = WM(o, a.fade.outS), o = eA(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function _x(n) {
  const a = {
    ...n,
    ops: n.ops.filter((i) => Mx.has(i.mode))
  };
  return FM(a);
}
var tA = "_1rsa80i0", nA = "_1rsa80i1", aA = "_1rsa80i2", rA = "_1rsa80i3", iA = "_1rsa80i4", lA = "_1rsa80i5", sA = "_1rsa80i6", oA = "_1rsa80i7", uA = "_1rsa80i8", cA = "_1rsa80i9";
const Dx = ["flat", "warm", "bright", "voice", "telephone"], ts = -12, Ko = 12, dA = 0.5;
function fA(n) {
  const { low: a, mid: i, high: s, preset: o, onChange: c, disabled: h } = n, m = (p) => {
    const x = yu[p];
    c(x.low, x.mid, x.high, p);
  }, v = (p, x) => {
    const g = { low: a, mid: i, high: s, [p]: x }, S = mA(g.low, g.mid, g.high);
    c(g.low, g.mid, g.high, S);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: tA, children: [
    /* @__PURE__ */ d.jsxs("div", { className: nA, role: "group", "aria-label": "EQ presets", children: [
      Dx.map((p) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: aA,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ d.jsx("span", { className: rA, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: iA, children: [
      /* @__PURE__ */ d.jsx(
        cf,
        {
          label: "Low",
          value: a,
          onChange: (p) => v("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        cf,
        {
          label: "Mid",
          value: i,
          onChange: (p) => v("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ d.jsx(
        cf,
        {
          label: "High",
          value: s,
          onChange: (p) => v("high", p),
          disabled: h
        }
      )
    ] })
  ] });
}
function cf({ label: n, value: a, onChange: i, disabled: s }) {
  const o = (a - ts) / (Ko - ts) * 100, c = b.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: lA, children: [
    /* @__PURE__ */ d.jsx("label", { htmlFor: c, className: sA, children: n }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: c,
        type: "range",
        min: ts,
        max: Ko,
        step: dA,
        value: a,
        disabled: s,
        className: uA,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": ts,
        "aria-valuemax": Ko,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: oA, children: hA(a) }),
    /* @__PURE__ */ d.jsxs("span", { className: cA, "aria-hidden": "true", children: [
      /* @__PURE__ */ d.jsx("span", { children: ts }),
      /* @__PURE__ */ d.jsx("span", { children: "0" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "+",
        Ko
      ] })
    ] })
  ] });
}
function hA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const df = 1e-3;
function mA(n, a, i) {
  for (const s of Dx) {
    const o = yu[s];
    if (Math.abs(o.low - n) < df && Math.abs(o.mid - a) < df && Math.abs(o.high - i) < df)
      return s;
  }
  return "custom";
}
var pA = "_85bhwb0", gA = "_85bhwb1", i0 = "_85bhwb2", vA = "_85bhwb3", yA = "_85bhwb4", bA = "_85bhwb5", xA = "_85bhwb6", SA = "_85bhwb7";
const Po = 0.5, ff = 2, wA = 0.05;
function EA(n) {
  const { mode: a, value: i, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: c, disabled: h } = n, m = (i - Po) / (ff - Po) * 100, v = b.useId(), p = (g) => o(g, i), x = (g) => o(a, g);
  return /* @__PURE__ */ d.jsxs("div", { className: pA, children: [
    s ? /* @__PURE__ */ d.jsxs("div", { className: gA, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: i0,
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
          className: i0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ d.jsxs("div", { className: vA, children: [
      /* @__PURE__ */ d.jsx(
        "input",
        {
          id: v,
          type: "range",
          min: Po,
          max: ff,
          step: wA,
          value: i,
          disabled: h,
          className: yA,
          style: { "--fill": `${m}%` },
          onChange: (g) => x(Number(g.target.value)),
          "aria-valuemin": Po,
          "aria-valuemax": ff,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: bA, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ d.jsxs("div", { className: xA, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "primary",
          size: "sm",
          onClick: c,
          disabled: h || !c,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: SA, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var jA = "kgszk50", NA = "kgszk51", l0 = "kgszk52", TA = "kgszk53", CA = "kgszk54", zx = "kgszk55", RA = "kgszk56", MA = "kgszk58", zh = "kgszk59", Ox = "kgszk5a", Oh = "kgszk5b", AA = "kgszk5c", _A = "kgszk5d", DA = "kgszk5e", s0 = "kgszk5f", o0 = "kgszk5g", u0 = "kgszk5h", zA = "kgszk5i", OA = "kgszk5j", kA = "kgszk5l", gs = "kgszk5m", vs = "kgszk5n";
const LA = -24, UA = 24, BA = 0.5, VA = -12, $A = 12, HA = 0.5, qA = -30, IA = -6, FA = -12, YA = 0, Qo = -60, hf = -20;
function kh(n) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: c,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: v,
    applyLabel: p = "Apply edit"
  } = n, x = (E) => {
    i({ ...a, ...E });
  }, g = PA(a), S = (E) => {
    const w = E.target;
    w && (w.tagName === "INPUT" || w.tagName === "BUTTON" || w.closest("input, button")) && c?.();
  };
  return /* @__PURE__ */ d.jsxs("div", { className: jA, onPointerDownCapture: S, children: [
    /* @__PURE__ */ d.jsxs("div", { className: NA, children: [
      g.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: TA, children: "No active edits" }) : /* @__PURE__ */ d.jsxs("span", { className: l0, children: [
        /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ d.jsx("span", { children: g.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ d.jsxs("span", { className: l0, "aria-live": "polite", children: [
        /* @__PURE__ */ d.jsx("span", { className: CA, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsx(
      c0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: LA,
        max: UA,
        step: BA,
        format: QA,
        value: a.volumeDb,
        onChange: (E) => x({ volumeDb: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
      /* @__PURE__ */ d.jsx("span", { className: vs, children: "3-band EQ" }),
      /* @__PURE__ */ d.jsx(
        fA,
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
    /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
      /* @__PURE__ */ d.jsx("span", { className: vs, children: "Speed" }),
      /* @__PURE__ */ d.jsx(
        EA,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (E, w) => x({ speed: { mode: E, value: w } })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx(
      c0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: VA,
        max: $A,
        step: HA,
        format: ZA,
        value: a.pitchSt,
        onChange: (E) => x({ pitchSt: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ d.jsx(
      GA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (E) => x({ normalize: E })
      }
    ),
    /* @__PURE__ */ d.jsx(
      XA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (E, w) => x({ fade: { ...a.fade, inS: E, outS: w } })
      }
    ),
    /* @__PURE__ */ d.jsx(
      KA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (E, w) => x({ silence: { enabled: E, thresholdDb: w } })
      }
    ),
    v ? /* @__PURE__ */ d.jsxs("div", { className: kA, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Ou),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ d.jsx(ft, { variant: "primary", size: "md", onClick: v, disabled: m, children: p })
    ] }) : null
  ] });
}
function c0(n) {
  const { label: a, sub: i, min: s, max: o, step: c, format: h, value: m, onChange: v, disabled: p } = n, x = (m - s) / (o - s) * 100, g = b.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: zx, children: [
    /* @__PURE__ */ d.jsxs("div", { className: RA, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: g, className: MA, children: a }),
      /* @__PURE__ */ d.jsx("span", { className: Ox, children: i })
    ] }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        id: g,
        type: "range",
        min: s,
        max: o,
        step: c,
        value: m,
        disabled: p,
        className: Oh,
        style: { "--fill": `${x}%` },
        onChange: (S) => v(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: zh, children: h(m) })
  ] });
}
function GA({ normalize: n, onChange: a, disabled: i }) {
  const o = n.mode === "loudness" ? { min: qA, max: IA, step: 0.5, suffix: "LUFS" } : { min: FA, max: YA, step: 0.5, suffix: "dB" }, c = JA(n.targetDbOrLufs, o.min, o.max), h = (c - o.min) / (o.max - o.min) * 100, m = (v) => {
    if (v === "off") {
      a({ mode: v, targetDbOrLufs: n.targetDbOrLufs });
      return;
    }
    if (v === "peak") {
      a({ mode: v, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: v, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
    /* @__PURE__ */ d.jsx("span", { className: vs, children: "Normalize" }),
    /* @__PURE__ */ d.jsx("div", { className: AA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((v) => {
      const p = v === "peak";
      return /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: _A,
          "data-active": n.mode === v,
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
    n.mode !== "off" ? /* @__PURE__ */ d.jsxs("div", { className: zx, children: [
      /* @__PURE__ */ d.jsx("span", { className: Ox, children: "Target" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: c,
          disabled: i,
          className: Oh,
          style: { "--fill": `${h}%` },
          onChange: (v) => a({ mode: n.mode, targetDbOrLufs: Number(v.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": c,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: zh, children: [
        c.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function XA({ inS: n, outS: a, onChange: i, disabled: s }) {
  const o = b.useId(), c = b.useId();
  return /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
    /* @__PURE__ */ d.jsx("span", { className: vs, children: "Fade" }),
    /* @__PURE__ */ d.jsxs("div", { className: DA, children: [
      /* @__PURE__ */ d.jsxs("div", { className: s0, children: [
        /* @__PURE__ */ d.jsx("label", { className: o0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: u0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: s0, children: [
        /* @__PURE__ */ d.jsx("label", { className: o0, htmlFor: c, children: "Fade out (s)" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: c,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: u0,
            onChange: (h) => i(n, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function KA({ enabled: n, thresholdDb: a, onChange: i, disabled: s }) {
  const o = (a - Qo) / (hf - Qo) * 100;
  return /* @__PURE__ */ d.jsxs("div", { className: gs, children: [
    /* @__PURE__ */ d.jsx("span", { className: vs, children: "Silence trim" }),
    /* @__PURE__ */ d.jsxs("div", { className: zA, children: [
      /* @__PURE__ */ d.jsxs("label", { className: OA, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: n,
            disabled: s,
            onChange: (c) => i(c.target.checked, a)
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
          disabled: s || !n,
          className: Oh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (c) => i(n, Number(c.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": hf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: zh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Vi = 1e-3;
function PA(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= Vi && a.push("gain"), (Math.abs(n.eq3.low) >= Vi || Math.abs(n.eq3.mid) >= Vi || Math.abs(n.eq3.high) >= Vi) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= Vi && a.push("speed"), Math.abs(n.pitchSt) >= Vi && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function QA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function ZA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function JA(n, a, i) {
  return Number.isFinite(n) ? Math.max(a, Math.min(i, n)) : a;
}
var WA = "skdk4g0", e2 = "skdk4g1", d0 = "skdk4g2", t2 = "skdk4g3", n2 = "skdk4g4", a2 = "skdk4g5", r2 = "skdk4g6", i2 = "skdk4g7", l2 = "skdk4g8", s2 = "skdk4g9", o2 = "skdk4ga", u2 = "skdk4gb", c2 = "skdk4gc", d2 = "skdk4gd", f2 = "skdk4ge", f0 = "skdk4gf", h0 = "skdk4gg", h2 = "skdk4gh", m0 = "skdk4gi", p0 = "skdk4gj", m2 = "skdk4gk", p2 = "skdk4gl", g2 = "skdk4gm", g0 = "skdk4gn", v2 = "skdk4go", v0 = "skdk4gp", y2 = "skdk4gq", b2 = "skdk4gr", x2 = "skdk4gs", S2 = "skdk4gt", w2 = "skdk4gu", E2 = "skdk4gv", j2 = "skdk4gw", y0 = "skdk4gx", N2 = "skdk4gy", T2 = "skdk4gz", C2 = "skdk4g10", R2 = "skdk4g11", M2 = "cgsfgh1", A2 = "cgsfgh2", _2 = "cgsfgh3", D2 = "cgsfgh4", z2 = "cgsfgh5", O2 = "cgsfgh6", k2 = "cgsfgh7", L2 = "cgsfgh8", U2 = "cgsfgh9", B2 = "cgsfgha", V2 = "cgsfghb", $2 = "cgsfghc", H2 = "cgsfghd", q2 = "cgsfghe", I2 = "cgsfghm", F2 = "cgsfghn", Y2 = "cgsfgho", G2 = "cgsfghp";
const Lt = [
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
}, kx = 0.05;
function X2(n) {
  let a = null, i = -1 / 0;
  for (const s of Lt) {
    const o = n[s];
    o > i && (i = o, a = s);
  }
  return !a || i <= kx ? null : a;
}
function Lx(n, a = 3) {
  return Lt.map((i) => ({ key: i, label: ys[i], value: n[i] })).filter((i) => i.value > kx).sort((i, s) => s.value - i.value).slice(0, a);
}
function K2(n) {
  let a = 0;
  for (const i of Lt) a += n[i] * n[i];
  return Math.sqrt(a);
}
function b0(n) {
  const a = Lx(n, 2), i = a[0];
  if (!i) return "";
  const s = a[1];
  return !s || i.value - s.value > 0.25 ? mf(i.label) : `${mf(i.label)} + ${s.label.toLowerCase()}`;
}
function mf(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function Jr(n) {
  const a = { ...Zi };
  for (const i of Lt) {
    const s = n[i];
    a[i] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const x0 = 0.05, S0 = 0.2, P2 = 22, Q2 = 320, pf = 0.78;
function gf(n, a, i, s) {
  const o = Math.cos(i), c = Math.sin(i), h = n * o + a * c;
  return Math.max(0, Math.min(1, h / s));
}
function Z2(n) {
  const { vec: a, onChange: i, size: s, reduceMotion: o = !1 } = n, [c, h] = b.useState(a), [m, v] = b.useState(null), [p, x] = b.useState(null), g = b.useRef(null), S = b.useRef(a), E = b.useRef(o), w = b.useRef(null), N = b.useRef(0);
  E.current = o, b.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const R = b.useCallback(
    (H) => {
      const q = Jr(H);
      h(q), S.current = q, i(q);
    },
    [i]
  ), T = b.useCallback((H) => {
    const q = Jr(H);
    h(q), S.current = q;
  }, []), L = b.useCallback(
    (H) => {
      const q = g.current;
      if (!q || E.current) return;
      const oe = H.clientX - q.centerX, I = H.clientY - q.centerY, Y = s / 2 * pf, se = gf(oe, I, q.angle, Y), J = { ...S.current, [q.axis]: se };
      T(J);
    },
    [s, T]
  ), M = b.useCallback(
    (H) => {
      const q = g.current;
      if (q) {
        if (window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), E.current) {
          const oe = H.clientX - q.centerX, I = H.clientY - q.centerY, Y = s / 2 * pf, se = gf(oe, I, q.angle, Y), J = { ...S.current, [q.axis]: se };
          g.current = null, R(J);
          return;
        }
        g.current = null, R(S.current);
      }
    },
    [R, L, s]
  );
  b.useEffect(() => () => {
    window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), g.current = null, w.current !== null && (window.clearTimeout(w.current), w.current = null);
  }, [L, M]);
  const _ = b.useCallback((H, q) => {
    E.current || (N.current += 1, x({ x: H, y: q, key: N.current }), w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      x(null), w.current = null;
    }, Q2));
  }, []), Z = b.useCallback(
    (H, q, oe, I, Y) => {
      const se = oe.getBoundingClientRect(), J = se.left + se.width / 2, O = se.top + se.height / 2, B = Lt.indexOf(H) / Lt.length * Math.PI * 2 - Math.PI / 2;
      if (g.current = {
        axis: H,
        pointerId: q,
        centerX: J,
        centerY: O,
        angle: B
      }, v(H), I !== void 0 && Y !== void 0) {
        const P = I - J, re = Y - O, A = s / 2 * pf, Q = gf(P, re, B, A), ee = { ...S.current, [H]: Q };
        E.current ? R(ee) : T(ee);
      }
      window.addEventListener("pointermove", L), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M);
    },
    [R, L, M, s, T]
  ), te = b.useCallback(
    (H, q) => {
      q.preventDefault();
      const oe = q.currentTarget, I = oe.ownerSVGElement ?? oe;
      Z(H, q.pointerId, I);
    },
    [Z]
  ), ne = b.useCallback(
    (H) => {
      const q = H.currentTarget, oe = q instanceof SVGSVGElement ? q : q.ownerSVGElement ?? q, I = oe.getBoundingClientRect(), Y = I.left + I.width / 2, se = I.top + I.height / 2, J = H.clientX - Y, O = H.clientY - se;
      if (Math.sqrt(J * J + O * O) < 8) return;
      let B = Math.atan2(O, J) * 180 / Math.PI;
      B = ((B + 90) % 360 + 360) % 360;
      let P = null, re = 999;
      for (let ee = 0; ee < Lt.length; ee++) {
        const ue = Lt[ee];
        if (!ue) continue;
        const fe = ee / Lt.length * 360, ve = Math.abs((fe - B + 540) % 360 - 180);
        ve < re && (re = ve, P = ue);
      }
      if (!P || re > P2) return;
      H.preventDefault();
      const A = (H.clientX - I.left) / I.width * s, Q = (H.clientY - I.top) / I.height * s;
      _(A, Q), Z(P, H.pointerId, oe, H.clientX, H.clientY);
    },
    [Z, s, _]
  ), D = b.useCallback(
    (H, q) => {
      const oe = S.current[H];
      let I = oe;
      switch (q.key) {
        case "ArrowUp":
        case "ArrowRight":
          I = oe + x0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          I = oe - x0;
          break;
        case "PageUp":
          I = oe + S0;
          break;
        case "PageDown":
          I = oe - S0;
          break;
        case "Home":
          I = 0;
          break;
        case "End":
          I = 1;
          break;
        default:
          return;
      }
      q.preventDefault(), v(H), R({ ...S.current, [H]: I });
    },
    [R]
  );
  return {
    liveVec: c,
    activeAxis: m,
    setActiveAxis: v,
    onPointerDown: te,
    onKeyDown: D,
    onSurfacePointerDown: ne,
    surfacePing: p
  };
}
const J2 = [0.25, 0.5, 0.75, 1];
function W2({
  vec: n,
  onChange: a,
  size: i = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const c = Z2({ vec: n, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, v = i / 2 * 0.78, p = b.useMemo(() => e_(h, m, v), [h, m, v]), x = b.useMemo(() => Lt.map((g, S) => {
    const E = du(c.liveVec[g]), w = p[S];
    return w ? `${h + w.dx * E},${m + w.dy * E}` : "0,0";
  }).join(" "), [p, h, m, c.liveVec]);
  return /* @__PURE__ */ d.jsx("div", { className: M2, children: /* @__PURE__ */ d.jsx("div", { className: A2, style: { width: i, height: i }, children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: _2,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: s ? void 0 : c.onSurfacePointerDown,
      style: s ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        J2.map((g) => /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: D2,
            cx: h,
            cy: m,
            r: v * g
          },
          g
        )),
        Lt.map((g, S) => {
          const E = p[S];
          if (!E) return null;
          const w = h + E.dx * 1.18, N = m + E.dy * 1.18, R = c.activeAxis === g;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "line",
              {
                className: z2,
                x1: h,
                y1: m,
                x2: h + E.dx,
                y2: m + E.dy
              }
            ),
            /* @__PURE__ */ d.jsx(
              "text",
              {
                className: `${H2}${R ? ` ${q2}` : ""}`,
                x: w,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: ys[g]
              }
            )
          ] }, g);
        }),
        Lt.map((g, S) => {
          const E = du(c.liveVec[g]);
          if (E <= 0.01) return null;
          const w = p[S];
          if (!w) return null;
          const N = c.activeAxis === g;
          return /* @__PURE__ */ d.jsx(
            "line",
            {
              className: `${k2}${N ? ` ${L2}` : ""}`,
              x1: h,
              y1: m,
              x2: h + w.dx * E,
              y2: m + w.dy * E
            },
            `petal-${g}`
          );
        }),
        /* @__PURE__ */ d.jsx("polygon", { className: O2, points: x }),
        c.surfacePing && /* @__PURE__ */ d.jsx(
          "circle",
          {
            className: $2,
            cx: c.surfacePing.x,
            cy: c.surfacePing.y,
            r: 10
          },
          c.surfacePing.key
        ),
        !s && Lt.map((g, S) => {
          const E = du(c.liveVec[g]), w = p[S];
          if (!w) return null;
          const N = h + w.dx * E, R = m + w.dy * E, T = c.activeAxis === g;
          return /* @__PURE__ */ d.jsxs("g", { children: [
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: U2,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${ys[g]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": E,
                onPointerDown: (L) => c.onPointerDown(g, L),
                onKeyDown: (L) => c.onKeyDown(g, L),
                onFocus: () => c.setActiveAxis(g),
                onBlur: () => c.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ d.jsx(
              "circle",
              {
                className: `${B2}${T ? ` ${V2}` : ""}`,
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
function e_(n, a, i) {
  return Lt.map((s, o) => {
    const c = o / Lt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(c) * i,
      dy: Math.sin(c) * i
    };
  });
}
function du(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function t_({ vec: n, size: a = 36 }) {
  const i = a / 2, s = a / 2, o = a / 2 * 0.86, c = b.useMemo(() => Lt.map((h, m) => {
    const v = du(n[h]), p = m / Lt.length * Math.PI * 2 - Math.PI / 2, x = i + Math.cos(p) * o * v, g = s + Math.sin(p) * o * v;
    return `${x},${g}`;
  }).join(" "), [i, s, o, n]);
  return /* @__PURE__ */ d.jsx("span", { className: I2, "aria-hidden": "true", children: /* @__PURE__ */ d.jsxs(
    "svg",
    {
      className: F2,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ d.jsx("circle", { className: Y2, cx: i, cy: s, r: o }),
        /* @__PURE__ */ d.jsx("polygon", { className: G2, points: c })
      ]
    }
  ) });
}
var n_ = "_1jqr3aj0", a_ = "_1jqr3aj1", r_ = "_1jqr3aj2", i_ = "_1jqr3aj3", l_ = "_1jqr3aj4", s_ = "_1jqr3aj5", o_ = "_1jqr3aj6", u_ = "_1jqr3aj7";
const w0 = 0.05, E0 = 0.2;
function c_({
  vec: n,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: s = !1
}) {
  const [o, c] = b.useState(null), h = b.useRef(null), m = b.useRef(/* @__PURE__ */ new Map()), v = b.useCallback(
    (w, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(Jr({ ...n, [w]: R }));
    },
    [a, n]
  ), p = b.useCallback((w, N) => {
    const R = m.current.get(w);
    return !R || R.width <= 0 ? 0 : (N - R.left) / R.width;
  }, []), x = b.useCallback(
    (w, N) => {
      if (i) return;
      N.preventDefault();
      const R = N.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && m.current.set(w, R.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), h.current = w, c(w), v(w, p(w, N.clientX));
    },
    [i, v, p]
  ), g = b.useCallback(
    (w, N) => {
      i || s || h.current === w && v(w, p(w, N.clientX));
    },
    [i, s, v, p]
  ), S = b.useCallback(
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
  ), E = b.useCallback(
    (w, N) => {
      if (i) return;
      const R = n[w] ?? 0;
      let T = R;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = R + w0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = R - w0;
          break;
        case "PageUp":
          T = R + E0;
          break;
        case "PageDown":
          T = R - E0;
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
      N.preventDefault(), c(w), v(w, T);
    },
    [i, v, n]
  );
  return /* @__PURE__ */ d.jsx("div", { className: n_, role: "group", "aria-label": "Emotion axis sliders", children: Lt.map((w) => {
    const N = d_(n[w] ?? 0), R = N > 0.05, T = o === w, L = ys[w];
    return /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: `${a_}${R ? ` ${r_}` : ""}${T ? ` ${i_}` : ""}`,
        role: "slider",
        "aria-label": `${L} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (M) => x(w, M),
        onPointerMove: (M) => g(w, M),
        onPointerUp: (M) => S(w, M),
        onPointerCancel: (M) => S(w, M),
        onKeyDown: (M) => E(w, M),
        onFocus: () => c(w),
        onBlur: () => c(null),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: l_, children: L }),
          /* @__PURE__ */ d.jsx("span", { className: s_, "data-track": "true", children: /* @__PURE__ */ d.jsx(
            "span",
            {
              className: o_,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ d.jsx("span", { className: u_, children: N.toFixed(2) })
        ]
      },
      w
    );
  }) });
}
function d_(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
var j0 = "gvwvwg0", f_ = "gvwvwg2", h_ = "gvwvwg3", m_ = "gvwvwg8", p_ = "gvwvwg9", g_ = "gvwvwga", v_ = "gvwvwgb", y_ = "gvwvwgc", b_ = "gvwvwgd", x_ = "gvwvwge";
function S_({
  presets: n,
  activePresetId: a,
  onSelect: i,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: j0, children: [
    /* @__PURE__ */ d.jsx("span", { className: f_, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("span", { className: h_, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: j0, children: [
    /* @__PURE__ */ d.jsx("span", { className: x_, children: "Preset library" }),
    /* @__PURE__ */ d.jsx("div", { className: m_, children: n.map((o) => {
      const c = w_(o), h = o.presetId === a;
      return /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${p_}${h ? ` ${v_}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: g_,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ d.jsx(t_, { vec: c, size: 28 }),
                  /* @__PURE__ */ d.jsx("span", { className: y_, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: b_,
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
function w_(n) {
  const a = Kf.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(n.vector)) return a;
  const i = Kf.reduce(
    (s, o, c) => ({ ...s, [o]: n.vector[c] ?? 0 }),
    a
  );
  return Jr(i);
}
function vf(n) {
  return Kf.map((a) => n[a] ?? 0);
}
const E_ = [
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
], j_ = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], N_ = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], T_ = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function C_(n) {
  const a = n.toLowerCase().trim();
  if (!a) return { ...Zi };
  const s = a.split(/\s+/).some((h) => j_.includes(h)) ? 1.2 : 1, o = N_.some((h) => a.includes(h)) ? 0.55 : 1, c = { ...Zi };
  for (const h of E_) {
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
      T_.some((T) => new RegExp(`\\b${T}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const v = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * s * o;
      c[h.axis] = Math.min(1, v);
    }
  }
  return Lt.every((h) => c[h] === 0) && (c.calm = 0.4), Jr(c);
}
const R_ = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function M_({
  value: n,
  onChange: a,
  deploymentId: i
}) {
  const s = n.mode ?? "none", o = b.useMemo(() => A_(n.vector), [n.vector]), c = n.emotionAlpha ?? 1, [h, m] = b.useState([]), [v, p] = b.useState(null), [x, g] = b.useState(!1), [S, E] = b.useState(null), [w, N] = b.useState(""), [R, T] = b.useState(!1), L = b.useRef(!0);
  b.useEffect(() => (L.current = !0, () => {
    L.current = !1;
  }), []), b.useEffect(() => {
    let C = !1;
    return xx(i).then((B) => {
      C || m(N0(B.presets));
    }).catch((B) => {
      C || p(yf(B));
    }), () => {
      C = !0;
    };
  }, [i]), b.useEffect(() => {
    R || N(b0(o));
  }, [o, R]);
  const M = (C) => {
    a({ ...n, mode: C });
  }, _ = (C) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: vf(C)
    }), S && E(null);
  }, Z = () => {
    _(Jr(Zi));
  }, te = (C) => {
    const B = Math.max(0, Math.min(1, Number.isFinite(C) ? C : 1));
    a({ ...n, emotionAlpha: B });
  }, ne = async () => {
    const C = w.trim();
    if (C) {
      g(!0), p(null);
      try {
        const B = await wR(i, C, vf(o));
        if (!L.current) return;
        m(
          (P) => N0([B, ...P.filter((re) => re.presetId !== B.presetId)])
        ), E(B.presetId), T(!1);
      } catch (B) {
        L.current && p(yf(B));
      } finally {
        L.current && g(!1);
      }
    }
  }, D = async (C) => {
    const B = h;
    m((P) => P.filter((re) => re.presetId !== C)), S === C && E(null);
    try {
      await ER(i, C);
    } catch (P) {
      L.current && (m(B), p(yf(P)));
    }
  }, H = (C) => {
    E(C.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: C.vector
    });
  }, q = (C) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: C });
  }, oe = X2(o), I = K2(o), Y = Lx(o, 3), se = Y.length > 0 && w.trim().length > 0 && !x, J = b0(o) || "name your preset…", O = s !== "emotion_vector";
  return /* @__PURE__ */ d.jsxs("div", { className: WA, children: [
    /* @__PURE__ */ d.jsxs("div", { className: e2, children: [
      /* @__PURE__ */ d.jsx("span", { className: d0, children: "Emotion mode" }),
      /* @__PURE__ */ d.jsx("div", { className: t2, role: "radiogroup", "aria-label": "Emotion mode", children: R_.map((C) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === C.id,
          className: `${n2}${s === C.id ? ` ${a2}` : ""}`,
          onClick: () => M(C.id),
          children: C.label
        },
        C.id
      )) })
    ] }),
    s === "none" && /* @__PURE__ */ d.jsxs("div", { className: v0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ d.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    s === "audio_ref" && /* @__PURE__ */ d.jsx("div", { className: v0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: m2, children: [
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: p2,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: n.qwenTemplate ?? "",
          onChange: (C) => q(C.target.value)
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: g2, children: [
        /* @__PURE__ */ d.jsx(
          ft,
          {
            variant: "secondary",
            onClick: () => {
              const C = (n.qwenTemplate ?? "").trim();
              if (!C) return;
              const B = C_(C);
              a({
                ...n,
                mode: "emotion_vector",
                vector: vf(B)
              });
            },
            disabled: !(n.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ d.jsx("span", { className: g0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: g0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ d.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (s === "emotion_vector" || s === "none" || s === "audio_ref") && /* @__PURE__ */ d.jsxs("div", { className: f2, children: [
      /* @__PURE__ */ d.jsx("div", { className: `${t0} ${r2}`, children: /* @__PURE__ */ d.jsx(
        W2,
        {
          vec: o,
          onChange: _,
          readOnly: O
        }
      ) }),
      /* @__PURE__ */ d.jsxs("div", { className: `${t0} ${i2}`, children: [
        /* @__PURE__ */ d.jsxs("div", { className: l2, children: [
          /* @__PURE__ */ d.jsx("span", { className: d0, children: "Dominant" }),
          /* @__PURE__ */ d.jsx("span", { className: s2, children: oe ? ys[oe].toLowerCase() : "neutral" }),
          /* @__PURE__ */ d.jsxs("span", { className: o2, children: [
            "‖v‖ = ",
            I.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(c_, { vec: o, onChange: _, readOnly: O }),
        /* @__PURE__ */ d.jsx("div", { className: u2, children: /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: c2,
            onClick: Z,
            disabled: O || I < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ d.jsxs(
                "svg",
                {
                  className: d2,
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
      /* @__PURE__ */ d.jsxs("div", { className: f0, children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          /* @__PURE__ */ d.jsx("span", { className: h0, children: "Alpha" }),
          /* @__PURE__ */ d.jsx("br", {}),
          /* @__PURE__ */ d.jsx("span", { className: h2, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: m0,
            style: { "--fill": `${c * 100}%` },
            onChange: (C) => te(Number(C.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: p0, children: [
          (c * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: `${y2}${Y.length === 0 ? ` ${b2}` : ""}`,
          children: [
            /* @__PURE__ */ d.jsxs("div", { className: x2, children: [
              /* @__PURE__ */ d.jsx("span", { className: S2, children: "Save current as preset" }),
              Y.length === 0 && /* @__PURE__ */ d.jsx("span", { className: w2, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: E2, children: [
              /* @__PURE__ */ d.jsx("div", { className: j2, children: Y.length === 0 ? /* @__PURE__ */ d.jsx("span", { className: `${y0} ${T2}`, children: "no axes set" }) : Y.map((C) => /* @__PURE__ */ d.jsxs("span", { className: y0, children: [
                C.label.toLowerCase(),
                /* @__PURE__ */ d.jsx("b", { className: N2, children: C.value.toFixed(2) })
              ] }, C.key)) }),
              /* @__PURE__ */ d.jsxs("div", { className: C2, children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "text",
                    className: R2,
                    placeholder: J,
                    value: w,
                    disabled: Y.length === 0 || x,
                    onChange: (C) => {
                      N(C.target.value), T(!0);
                    },
                    onKeyDown: (C) => {
                      C.key === "Enter" && se && ne();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  ft,
                  {
                    variant: "primary",
                    disabled: !se,
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
        S_,
        {
          presets: h,
          activePresetId: S,
          onSelect: H,
          onDelete: D
        }
      )
    ] }),
    s === "qwen_template" && /* @__PURE__ */ d.jsxs("div", { className: f0, children: [
      /* @__PURE__ */ d.jsx("span", { className: h0, children: "Alpha" }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 1,
          step: 0.01,
          value: c,
          className: m0,
          style: { "--fill": `${c * 100}%` },
          onChange: (C) => te(Number(C.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: p0, children: [
        (c * 100).toFixed(0),
        "%"
      ] })
    ] }),
    v && /* @__PURE__ */ d.jsx("div", { className: v2, children: v })
  ] });
}
function A_(n) {
  if (!n || !Array.isArray(n)) return Jr(Zi);
  const a = { ...Zi };
  return Lt.forEach((i, s) => {
    const o = n[s];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function N0(n) {
  return [...n].sort((a, i) => i.updatedAt - a.updatedAt);
}
function yf(n) {
  return n instanceof el || n instanceof Error ? n.message : "Unknown error";
}
var __ = "_5u1uau0", ns = "_5u1uau1", D_ = "_5u1uau2", $i = "_5u1uau3", as = "_5u1uau4", z_ = "_5u1uau5", bf = "_5u1uau6", O_ = "_5u1uau7", k_ = "_5u1uau8", L_ = "_5u1uau9", U_ = "_5u1uaua", B_ = "_5u1uaub", V_ = "_5u1uauc", $_ = "_5u1uaud";
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
], H_ = ["mp3", "wav", "flac"], Zo = 0.5, Sf = 2, q_ = 0.05, I_ = 0.8, F_ = 0.8, Y_ = 42;
function wf(n, a, i) {
  const s = n[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function G_({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: h,
  onGenerationChange: m
}) {
  const v = b.useId(), p = b.useId(), x = b.useId(), g = b.useId(), S = b.useId(), E = (M, _) => {
    m({ ...h, [M]: _ });
  }, w = xf.find((M) => M.id === o) ?? xf[0], N = (i - Zo) / (Sf - Zo) * 100, R = wf(h, "temperature", I_), T = wf(h, "top_p", F_), L = wf(h, "seed", Y_);
  return /* @__PURE__ */ d.jsxs("div", { className: __, children: [
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: v, className: $i, children: "Format" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "select",
        {
          id: v,
          className: z_,
          value: n,
          onChange: (M) => a(M.currentTarget.value),
          children: H_.map((M) => /* @__PURE__ */ d.jsx("option", { value: M, children: M }, M))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: $i, children: "Speed" }),
      /* @__PURE__ */ d.jsxs("div", { className: `${as} ${O_}`, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: k_,
            min: Zo,
            max: Sf,
            step: q_,
            value: i,
            style: { "--range-pct": `${N}%` },
            onChange: (M) => s(Number(M.currentTarget.value)),
            "aria-valuemin": Zo,
            "aria-valuemax": Sf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { className: L_, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: D_, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ d.jsx("span", { className: $i, children: "Cache" }),
      /* @__PURE__ */ d.jsx("div", { className: U_, children: xf.map((M) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === M.id,
          className: B_,
          onClick: () => c(M.id),
          title: M.help,
          children: M.label
        },
        M.id
      )) }),
      /* @__PURE__ */ d.jsx("p", { className: V_, "aria-live": "polite", children: w.help })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: $_, "aria-hidden": "true" }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: x, className: $i, children: "Temperature" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: x,
          type: "number",
          className: bf,
          min: 0,
          max: 2,
          step: 0.05,
          value: R,
          onChange: (M) => E("temperature", Number(M.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: ns, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: g, className: $i, children: "Top-p" }),
      /* @__PURE__ */ d.jsx("div", { className: as, children: /* @__PURE__ */ d.jsx(
        "input",
        {
          id: g,
          type: "number",
          className: bf,
          min: 0,
          max: 1,
          step: 0.05,
          value: T,
          onChange: (M) => E("top_p", Number(M.currentTarget.value))
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
          className: bf,
          step: 1,
          value: L,
          onChange: (M) => E("seed", Math.trunc(Number(M.currentTarget.value)))
        }
      ) })
    ] })
  ] });
}
var X_ = "iv43qk0", T0 = "iv43qk1", K_ = "iv43qk2", C0 = "iv43qk3", P_ = "iv43qk4", Q_ = "iv43qk5", Z_ = "iv43qk6", J_ = "iv43qk7", W_ = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, e3 = "iv43qkd", t3 = "iv43qke", Ef = "iv43qkf", jf = "iv43qkg";
function n3({
  lines: n,
  characterColors: a,
  onLineClick: i
}) {
  if (n.length === 0)
    return /* @__PURE__ */ d.jsx("p", { className: e3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, c = s - o;
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: t3, children: [
      /* @__PURE__ */ d.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ d.jsx("span", { className: jf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ d.jsx("span", { className: jf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ d.jsx("span", { className: jf, children: c }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ol", { className: X_, children: n.map((h) => /* @__PURE__ */ d.jsx(
      a3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function a3({ line: n, color: a, onClick: i }) {
  return n.character === null ? /* @__PURE__ */ d.jsxs("li", { className: `${T0} ${K_}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: C0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ d.jsx("span", { className: Z_, children: n.text })
  ] }) : /* @__PURE__ */ d.jsxs(
    "li",
    {
      className: T0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: C0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ d.jsx("span", { className: P_, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ d.jsxs("span", { className: Q_, children: [
          n.text,
          n.override && /* @__PURE__ */ d.jsxs("span", { className: `${J_} ${W_[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var r3 = "_46z95i0", i3 = "_46z95i1", l3 = "_46z95i2", s3 = "_46z95i3", o3 = "_46z95i4", u3 = "_46z95i5", c3 = "_46z95i6";
const d3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function f3({ value: n, onChange: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: r3, children: [
    /* @__PURE__ */ d.jsx(
      Nf,
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
      Nf,
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
      Nf,
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
function Nf({ label: n, sub: a, min: i, max: s, step: o, format: c, value: h, onChange: m }) {
  const v = (h - i) / (s - i) * 100, p = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ d.jsxs("div", { className: i3, children: [
    /* @__PURE__ */ d.jsxs("div", { className: l3, children: [
      /* @__PURE__ */ d.jsx("label", { htmlFor: p, className: s3, children: n }),
      /* @__PURE__ */ d.jsx("span", { className: o3, children: a })
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
        className: u3,
        style: { "--fill": `${v}%` },
        onChange: (x) => m(Number(x.target.value))
      }
    ),
    /* @__PURE__ */ d.jsx("span", { className: c3, children: c(h) })
  ] });
}
var h3 = "qe93dj0", m3 = "qe93dj1", p3 = "qe93dj2", g3 = "qe93dj3", v3 = "qe93dj4", y3 = "qe93dj5", b3 = "qe93dj6", x3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, S3 = "qe93dja", w3 = "qe93djb";
function E3({ checks: n }) {
  const a = n.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ d.jsxs("div", { className: h3, children: [
    /* @__PURE__ */ d.jsxs("header", { className: m3, children: [
      /* @__PURE__ */ d.jsx("span", { className: p3, children: "Pre-flight" }),
      /* @__PURE__ */ d.jsxs("span", { className: g3, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: v3, children: n.map((i) => /* @__PURE__ */ d.jsxs("li", { className: y3, children: [
      /* @__PURE__ */ d.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${b3} ${x3[i.status]}`
        }
      ),
      /* @__PURE__ */ d.jsx("span", { className: S3, children: i.label }),
      i.detail && /* @__PURE__ */ d.jsx("span", { className: w3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var j3 = "xq3iim0", N3 = "xq3iim2 xq3iim1", T3 = "xq3iim3 xq3iim1", C3 = "xq3iim4", R3 = "xq3iim5", M3 = "xq3iim6", A3 = "xq3iim7";
function _3({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [s, o] = b.useState([]), [c, h] = b.useState(a), [m, v] = b.useState(!0), [p, x] = b.useState(!1), [g, S] = b.useState(null);
  b.useEffect(() => {
    let w = !1;
    return v(!0), ps(n).then(({ voiceAssets: N }) => {
      w || o(N);
    }).catch((N) => {
      w || S(N instanceof Error ? N.message : "Failed to load voices");
    }).finally(() => {
      w || v(!1);
    }), () => {
      w = !0;
    };
  }, [n]);
  async function E(w) {
    x(!0), S(null);
    const N = c;
    h(w);
    try {
      await ZN(n, w), i?.(w);
    } catch (R) {
      h(N), S(R instanceof Error ? R.message : "Failed to update default voice");
    } finally {
      x(!1);
    }
  }
  return m ? /* @__PURE__ */ d.jsx("p", { className: M3, children: "Loading voices…" }) : g ? /* @__PURE__ */ d.jsx("p", { className: A3, children: g }) : s.length === 0 ? /* @__PURE__ */ d.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ d.jsx(
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
      className: j3,
      children: s.map((w) => {
        const N = w.voiceAssetId === c;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": N,
            disabled: p,
            onClick: () => void E(N ? null : w.voiceAssetId),
            className: N ? T3 : N3,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: C3, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ d.jsx("span", { className: R3, children: D3(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function D3(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), s = Math.round(a - i * 60);
  return `${i}:${s.toString().padStart(2, "0")}`;
}
var R0 = "_17fbpt30", M0 = "_17fbpt31", A0 = "_17fbpt32", z3 = "_17fbpt33", O3 = "_17fbpt34", k3 = "_17fbpt35", _0 = "_17fbpt36", L3 = "_17fbpt37", U3 = "_17fbpt38";
const B3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function V3({
  runs: n,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: R0, children: [
    /* @__PURE__ */ d.jsx("header", { className: M0, children: /* @__PURE__ */ d.jsx(
      "a",
      {
        className: A0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (c) => {
          c.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ d.jsx("p", { className: L3, children: "No runs yet." }),
    /* @__PURE__ */ d.jsx("p", { className: U3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: R0, children: [
    /* @__PURE__ */ d.jsxs("header", { className: M0, children: [
      /* @__PURE__ */ d.jsx("span", {}),
      /* @__PURE__ */ d.jsx(
        "a",
        {
          className: A0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (c) => {
            c.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx("ul", { className: z3, children: n.slice(0, 5).map((c) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: O3,
        onClick: s ? () => s(c.runId) : void 0,
        children: [
          /* @__PURE__ */ d.jsx("span", { className: k3, children: c.runId }),
          /* @__PURE__ */ d.jsx("span", { className: `${Cx.sm} ${Rx[B3[c.status] ?? "neutral"]}`, children: c.status }),
          /* @__PURE__ */ d.jsx("span", { className: _0, children: $3(c.startedAt ?? c.queuedAt) }),
          /* @__PURE__ */ d.jsx("span", { className: _0, children: c.kind })
        ]
      }
    ) }, c.runId)) })
  ] });
}
function $3(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
function H3(n) {
  const a = js(), [i, s] = b.useState("idle"), [o, c] = b.useState(null), [h, m] = b.useState(/* @__PURE__ */ new Map()), [v, p] = b.useState(null), [x, g] = b.useState(null), S = b.useRef(null);
  b.useEffect(() => () => {
    S.current?.();
  }, []);
  const E = b.useCallback(async () => {
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), g(null);
    try {
      const I = await tT(n.deploymentId, n.createPayload);
      c(I.runId), s("running"), S.current?.(), S.current = Ty(
        n.deploymentId,
        I.runId,
        (Y) => D0(Y, m, s, g, n.deploymentId, I.runId),
        () => s("error")
      );
    } catch (I) {
      s("error"), p(Tf(I));
    }
  }, [n.deploymentId, n.createPayload]), w = b.useCallback(async () => {
    if (o)
      try {
        await nT(n.deploymentId, o);
      } catch (I) {
        p(Tf(I));
      }
  }, [n.deploymentId, o]), N = Array.from(h.values()).sort((I, Y) => I.globalIndex - Y.globalIndex), R = i === "starting" || i === "running", T = x?.status === "partial", L = N.filter((I) => I.status === "running").length, M = N.filter((I) => I.status === "completed").length, _ = i === "starting" || i === "running" || N.length > 0, Z = N.filter((I) => I.status === "failed"), te = (() => {
    if (i !== "terminal" || Z.length === 0) return null;
    const I = /* @__PURE__ */ new Map();
    for (const O of Z) {
      const C = O.failureCategory ?? "unknown";
      I.set(C, (I.get(C) ?? 0) + 1);
    }
    let Y = "unknown", se = 0;
    for (const [O, C] of I)
      C > se && (Y = O, se = C);
    const J = N.length;
    return { category: Y, count: se, total: J };
  })(), ne = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, D = "Check the run detail page for the per-segment error log.", H = v?.toLowerCase().includes("unmapped") ?? !1, q = n.diagnostics ?? [], oe = q.find((I) => I.status === "fail");
  return /* @__PURE__ */ d.jsxs("div", { children: [
    q.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: DM, "aria-label": "Pre-flight checks", children: q.map((I) => /* @__PURE__ */ d.jsxs("li", { className: zM, children: [
      /* @__PURE__ */ d.jsx(br, { tone: I3(I.status), children: F3(I.status) }),
      /* @__PURE__ */ d.jsx("span", { className: OM, children: I.label }),
      I.detail && /* @__PURE__ */ d.jsx("span", { className: kM, children: I.detail })
    ] }, I.label)) }),
    v && /* @__PURE__ */ d.jsxs(
      Dn,
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
          H && /* @__PURE__ */ d.jsx(
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
    /* @__PURE__ */ d.jsxs("div", { className: Tx, children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          disabled: !n.canGenerate || R || !!oe,
          onClick: E,
          children: i === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ d.jsx(ft, { variant: "danger", disabled: !R, onClick: w, children: "Cancel" }),
      _ && /* @__PURE__ */ d.jsxs(
        "div",
        {
          role: "status",
          "aria-live": "polite",
          style: {
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            opacity: 0.85,
            fontVariantNumeric: "tabular-nums"
          },
          children: [
            /* @__PURE__ */ d.jsx(
              "span",
              {
                style: {
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: i === "running" || i === "starting" ? "#a78bfa" : "#94a3b8",
                  animation: i === "running" || i === "starting" ? "pulse 1.4s ease-in-out infinite" : void 0
                },
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ d.jsxs("span", { children: [
              "Queue: ",
              /* @__PURE__ */ d.jsx("strong", { children: L }),
              " in flight ·",
              " ",
              /* @__PURE__ */ d.jsx("strong", { children: M }),
              "/",
              N.length,
              " done"
            ] })
          ]
        }
      )
    ] }),
    te && /* @__PURE__ */ d.jsxs(Dn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        "Run failed — ",
        te.count,
        " of ",
        te.total,
        " segments failed with ",
        /* @__PURE__ */ d.jsx("code", { children: te.category })
      ] }),
      /* @__PURE__ */ d.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: ne[te.category] ?? D })
    ] }),
    x?.exportArtifactRef && /* @__PURE__ */ d.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${x.exportArtifactRef}/download`,
        download: !0,
        className: `${Sx.secondary} ${wx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    T && x && /* @__PURE__ */ d.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "secondary",
          disabled: !!oe,
          onClick: async () => {
            try {
              const I = await vx(n.deploymentId, x.runId);
              c(I.runId), m(/* @__PURE__ */ new Map()), g(null), s("running"), S.current?.(), S.current = Ty(
                n.deploymentId,
                I.runId,
                (Y) => D0(Y, m, s, g, n.deploymentId, I.runId),
                () => s("error")
              );
            } catch (I) {
              p(Tf(I)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    N.length > 0 && /* @__PURE__ */ d.jsxs("table", { className: AM, children: [
      /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
        /* @__PURE__ */ d.jsx("th", { className: dr, children: "#" }),
        /* @__PURE__ */ d.jsx("th", { className: dr, children: "Status" }),
        /* @__PURE__ */ d.jsx("th", { className: dr, children: "Duration" }),
        /* @__PURE__ */ d.jsx("th", { className: dr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ d.jsx("tbody", { children: N.map((I) => /* @__PURE__ */ d.jsxs("tr", { className: _M, children: [
        /* @__PURE__ */ d.jsx("td", { className: dr, children: I.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ d.jsx("td", { className: dr, children: /* @__PURE__ */ d.jsx(br, { tone: q3(I.status), children: I.status }) }),
        /* @__PURE__ */ d.jsx("td", { className: dr, children: I.durationMs ? `${I.durationMs} ms` : "—" }),
        /* @__PURE__ */ d.jsx("td", { className: dr, children: I.failureCategory ?? "" })
      ] }, I.globalIndex)) })
    ] })
  ] });
}
async function D0(n, a, i, s, o, c) {
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
        const h = await Dh(o, c);
        s(h);
      } catch {
      }
      return;
  }
}
function q3(n) {
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
function I3(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function F3(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function Tf(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
const z0 = [
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
function Y3(n) {
  const a = js(), i = b.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: h, characterColor: m } = b.useMemo(
    () => X3(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), v = (p) => {
    const x = i.current;
    x && (x.scrollTop = p.currentTarget.scrollTop, x.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: NM, children: [
      /* @__PURE__ */ d.jsx("div", { ref: i, className: TM, "aria-hidden": "true", children: s.map((p, x) => G3(p, x, m)) }),
      /* @__PURE__ */ d.jsx(
        "textarea",
        {
          className: CM,
          value: n.value,
          onChange: (p) => n.onChange(p.currentTarget.value),
          onScroll: v,
          placeholder: `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    c.length > 0 && /* @__PURE__ */ d.jsxs(Dn, { severity: "error", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((p) => /* @__PURE__ */ d.jsxs(
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
      /* @__PURE__ */ d.jsx("ul", { className: r0, children: o.map((p) => /* @__PURE__ */ d.jsxs("li", { children: [
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
      /* @__PURE__ */ d.jsx("ul", { className: r0, children: h.map((p) => /* @__PURE__ */ d.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function G3(n, a, i) {
  if (n.kind === "blank")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ d.jsxs("span", { children: [
      /* @__PURE__ */ d.jsx("span", { className: a0, children: n.raw }),
      `
`
    ] }, a);
  const s = i.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? n0 : `${n0} ${RM}`;
  return /* @__PURE__ */ d.jsxs("span", { children: [
    /* @__PURE__ */ d.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ d.jsxs("span", { className: MM, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: a0, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function X3(n, a, i) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = [], p = /* @__PURE__ */ new Map();
  let x = 0;
  const g = n.split(/\r?\n/);
  let S = 0;
  return g.forEach((E, w) => {
    const N = E.trim();
    if (!N) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const R = w + 1, T = N.match(s);
    let L = "Narrator", M = N, _, Z = !1;
    if (T?.groups) {
      Z = !0;
      const H = (T.groups.body ?? "").trim(), q = (T.groups.rest ?? "").trim();
      L = ((H.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", _ = (H.includes("|") ? H.slice(H.indexOf("|") + 1) : "").trim() || void 0, M = q;
    }
    S += 1;
    const te = L.toLowerCase(), ne = (m.get(te) ?? 0) + 1;
    m.set(te, ne);
    const D = L === "Narrator" || i.has(te);
    if (D || h.add(L), L !== "Narrator" && !p.has(te) && (p.set(te, z0[x % z0.length] ?? "currentColor"), x += 1), Z) {
      const H = { kind: "character", raw: E, character: L, text: M, hasMapping: D };
      _ !== void 0 && (H.override = _), o.push(H);
    } else
      o.push({ kind: "narrator", raw: E });
    c.push({ lineNumber: R, character: L, text: M, hasMapping: D }), v.push(
      `${S.toString().padStart(3, "0")}_${K3(L)}_${ne.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(h),
    predictedFilenames: v,
    characterColor: p
  };
}
function K3(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Cf = [
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
], P3 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function Q3(n) {
  const a = [];
  if (!n) return a;
  const i = n.split(/\r?\n/);
  for (let s = 0; s < i.length; s += 1) {
    const c = (i[s] ?? "").trim();
    if (c.length === 0) continue;
    const h = c.match(P3);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: c, override: null });
      continue;
    }
    const m = h.groups.body ?? "", v = (h.groups.rest ?? "").trim(), [p = "", ...x] = m.split("|"), g = p.trim();
    if (!g) {
      a.push({ idx: s, character: null, text: v || c, override: null });
      continue;
    }
    const S = g.split(":")[0]?.trim() || null, E = x.join("|").trim(), w = E ? Z3(E) : null;
    a.push({
      idx: s,
      character: S,
      text: v,
      override: w
    });
  }
  return a;
}
function Z3(n) {
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
function J3(n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(s.character));
  }
  return i;
}
function W3(n) {
  const a = {};
  for (let i = 0; i < n.length; i += 1) {
    const s = n[i];
    s && (a[s] = Cf[i % Cf.length] ?? Cf[0]);
  }
  return a;
}
function eD(n) {
  const a = {};
  for (const i of n)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
function tD(n) {
  const a = n.workflowCustomised ?? !1, i = n.unmappableFields ?? [], s = rD(n.deployment.displayName, n.deployment.deploymentId), o = nD(360);
  return /* @__PURE__ */ d.jsxs("div", { className: oM, children: [
    /* @__PURE__ */ d.jsxs("header", { className: uM, children: [
      /* @__PURE__ */ d.jsx("div", { className: dM, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ d.jsx("div", { className: cM, children: /* @__PURE__ */ d.jsx("h1", { className: fM, children: s }) }),
      /* @__PURE__ */ d.jsx("p", { className: hM, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ d.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ d.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    n.quickActions && /* @__PURE__ */ d.jsx("div", { className: SM, "aria-label": "Quick actions", children: n.quickActions }),
    /* @__PURE__ */ d.jsxs("div", { className: mM, children: [
      /* @__PURE__ */ d.jsx(
        fr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        fr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      n.voiceLibrarySection && /* @__PURE__ */ d.jsx(
        fr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: n.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ d.jsx(
        fr,
        {
          number: n.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        fr,
        {
          number: n.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        fr,
        {
          number: n.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ d.jsx(
        fr,
        {
          number: n.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ d.jsx(
        fr,
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
    /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: wM,
        "data-visible": o ? "true" : "false",
        "aria-label": "Scroll to top",
        title: "Scroll to top",
        onClick: aD,
        children: "↑"
      }
    )
  ] });
}
function nD(n) {
  const [a, i] = b.useState(!1);
  return b.useEffect(() => {
    const s = Ux(), o = () => s instanceof Window ? window.scrollY : s.scrollTop, c = () => i(o() > n);
    c();
    const h = { passive: !0 };
    return s.addEventListener("scroll", c, h), () => s.removeEventListener("scroll", c, h);
  }, [n]), a;
}
function Ux() {
  if (typeof document > "u") return window;
  let n = document.querySelector("emotion-tts-app");
  for (; n; ) {
    const a = window.getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(a.overflowY)) return n;
    n = n.parentElement;
  }
  return window;
}
function aD() {
  const n = Ux();
  n instanceof Window ? window.scrollTo({ top: 0, behavior: "smooth" }) : n.scrollTo({ top: 0, behavior: "smooth" });
}
function rD(n, a) {
  const i = (n ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function fr({
  number: n,
  title: a,
  id: i,
  variant: s,
  defaultCollapsed: o = !1,
  children: c
}) {
  const [h, m] = b.useState(o), v = `${i}-body`;
  return /* @__PURE__ */ d.jsxs("section", { className: pM, "aria-labelledby": i, children: [
    /* @__PURE__ */ d.jsx("header", { className: gM, children: /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: bM,
        "aria-expanded": !h,
        "aria-controls": v,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ d.jsxs("span", { className: vM, children: [
            n,
            " / ",
            a
          ] }),
          /* @__PURE__ */ d.jsx("h2", { id: i, className: yM, children: a }),
          /* @__PURE__ */ d.jsx(
            "span",
            {
              className: xM,
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
        className: s === "split" ? jM : EM,
        children: c
      }
    )
  ] });
}
const Mn = {
  success(n) {
    vn.success(n);
  },
  error(n) {
    vn.error(n);
  }
};
function iD(n) {
  try {
    const a = JSON.parse(n);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function lD() {
  const { deployment: n, mappings: a, runs: i, workflow: s } = Ts(), [o, c] = b.useState(a), [h, m] = b.useState([]), [v, p] = b.useState([]), [x, g] = b.useState(null), [S, E] = b.useState(Ou), [w, N] = b.useState(""), [R, T] = b.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [L, M] = b.useState(n.defaultSpeedFactor ?? 1), [_, Z] = b.useState({
    mode: "none",
    emotionAlpha: 1
  }), [te, ne] = b.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...n.defaultGenerationOverridesJson ? iD(n.defaultGenerationOverridesJson) : {}
  })), [D, H] = b.useState("use_cache"), [q, oe] = b.useState(
    n.defaultVoiceAssetId ?? null
  ), [I, Y] = b.useState(n.defaultVoiceAssetId != null), [se, J] = b.useState(d3);
  b.useEffect(() => {
    let me = !1;
    return ps(n.deploymentId).then((Ne) => {
      me || m(Ne.voiceAssets);
    }).catch(() => {
    }), xx(n.deploymentId).then((Ne) => {
      me || p(Ne.presets);
    }).catch(() => {
    }), () => {
      me = !0;
    };
  }, [n.deploymentId]);
  const O = b.useMemo(() => Q3(w), [w]), C = b.useMemo(() => J3(O), [O]), B = b.useMemo(() => W3(C), [C]), P = b.useMemo(() => eD(O), [O]), re = b.useMemo(() => {
    const me = /* @__PURE__ */ new Map();
    for (const Ne of o)
      me.set(Ne.characterName.toLowerCase(), Ne);
    return me;
  }, [o]), A = b.useMemo(() => I && q ? 0 : C.filter((me) => !re.has(me.toLowerCase())).length, [C, re, I, q]), Q = b.useCallback(
    async (me, Ne) => {
      const Ce = re.get(me.toLowerCase());
      try {
        if (Ce) {
          const Re = await cs(n.deploymentId, Ce.mappingId, Ne);
          c(
            (Kt) => Kt.map((at) => at.mappingId === Re.mappingId ? Re : at)
          ), Mn.success(`Updated mapping for ${me}`);
        } else if (Ne.speakerVoiceAssetId) {
          const Re = await _h(n.deploymentId, {
            ...Ne,
            characterName: me,
            speakerVoiceAssetId: Ne.speakerVoiceAssetId
          });
          c((Kt) => [...Kt, Re]), Mn.success(`Mapped ${me} to voice`);
        }
      } catch (Re) {
        Mn.error(Re instanceof Error ? Re.message : "mapping failed");
      }
    },
    [re, n.deploymentId]
  ), ee = b.useCallback(
    async (me) => {
      const Ne = re.get(me.toLowerCase());
      if (Ne)
        try {
          await gx(n.deploymentId, Ne.mappingId), c((Ce) => Ce.filter((Re) => Re.mappingId !== Ne.mappingId)), Mn.success(`Cleared mapping for ${me}`);
        } catch (Ce) {
          Mn.error(Ce instanceof Error ? Ce.message : "clear failed");
        }
    },
    [re, n.deploymentId]
  ), ue = b.useCallback(
    async (me, Ne) => {
      try {
        const Ce = await vu(
          n.deploymentId,
          Ne,
          Ne.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Re) => [Ce, ...Re]), await Q(me, { speakerVoiceAssetId: Ce.voiceAssetId });
      } catch (Ce) {
        Mn.error(Ce instanceof Error ? Ce.message : "upload failed");
      }
    },
    [n.deploymentId, Q]
  ), fe = b.useCallback((me) => {
    E(me);
  }, []), ve = b.useMemo(() => {
    const me = [], Ne = /* @__PURE__ */ new Set();
    for (const Ce of o) {
      const Re = Ce.speakerVoiceAssetId;
      if (!Re || Ne.has(Re)) continue;
      Ne.add(Re);
      const at = h.find((on) => on.voiceAssetId === Re)?.displayName ?? `${Ce.characterName} · ${Re.slice(0, 8)}`;
      me.push({ kind: "voice_asset", id: Re, label: at });
    }
    for (const Ce of h)
      Ne.has(Ce.voiceAssetId) || (Ne.add(Ce.voiceAssetId), me.push({ kind: "voice_asset", id: Ce.voiceAssetId, label: Ce.displayName }));
    return me;
  }, [o, h]), ze = b.useCallback(
    async (me, Ne) => {
      if (me.kind !== "voice_asset") {
        Mn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ce;
      try {
        const Re = JSON.parse(Ne);
        if (typeof Re != "object" || Re === null || Re.version !== 1 || !Array.isArray(Re.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ce = Re;
      } catch (Re) {
        Mn.error(
          Re instanceof Error ? `Audit snapshot is malformed: ${Re.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Re = await yx(me.id, n.deploymentId, {
          chain: Ce
        }), Kt = o.filter((at) => at.speakerVoiceAssetId === me.id);
        await Promise.all(
          Kt.map(
            (at) => cs(n.deploymentId, at.mappingId, {
              voiceAssetChainDigest: Re.chain_digest
            }).catch(() => null)
          )
        ), c(
          (at) => at.map(
            (on) => on.speakerVoiceAssetId === me.id ? { ...on, voiceAssetChainDigest: Re.chain_digest } : on
          )
        ), Mn.success(`Reverted ${me.label} to a prior chain`);
      } catch (Re) {
        Mn.error(Re instanceof Error ? Re.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), _e = b.useCallback(
    async (me) => {
      if (me.kind !== "voice_asset") {
        Mn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await uC(me.id, n.deploymentId);
        const Ne = o.filter((Ce) => Ce.speakerVoiceAssetId === me.id);
        await Promise.all(
          Ne.map(
            (Ce) => cs(n.deploymentId, Ce.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), c(
          (Ce) => Ce.map(
            (Re) => Re.speakerVoiceAssetId === me.id ? { ...Re, voiceAssetChainDigest: null } : Re
          )
        ), Mn.success(`Cleared edit chain on ${me.label}`);
      } catch (Ne) {
        Mn.error(Ne instanceof Error ? Ne.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), Ve = b.useMemo(
    () => ({
      script: w,
      parserMode: I ? "raw_text" : "dialogue",
      outputFormat: R,
      speedFactor: L,
      globalEmotion: { ..._, emotionAlpha: se.intensity },
      generation: te,
      cachePolicy: D
    }),
    [w, I, R, L, se.intensity, _, te, D]
  ), Ut = b.useMemo(
    () => cD({
      script: w,
      quickMode: I,
      defaultVoiceAssetId: q,
      characters: C,
      unmappedCount: A,
      globalEmotion: _,
      performance: se
    }),
    [w, I, q, C, A, _, se]
  ), Yt = b.useMemo(
    () => Ut.filter((me) => me.id !== "performance").map((me) => ({
      label: me.label,
      status: me.status === "ok" ? "ok" : me.status === "warn" ? "warn" : "fail",
      detail: me.detail
    })),
    [Ut]
  );
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(sC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ d.jsx(
      tD,
      {
        deployment: n,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ d.jsx(VM, { deployment: n }),
        quickActions: /* @__PURE__ */ d.jsx(
          H3,
          {
            deploymentId: n.deploymentId,
            createPayload: Ve,
            canGenerate: w.trim().length > 0,
            diagnostics: Yt
          }
        ),
        scriptSection: /* @__PURE__ */ d.jsx(
          sD,
          {
            quickMode: I,
            onToggleQuickMode: Y,
            deployment: n,
            script: w,
            onScriptChange: N,
            outputFormat: R,
            mappingsByLower: re,
            defaultVoiceAssetId: q,
            onDefaultVoiceAssetIdChange: oe
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ d.jsx(n3, { lines: O, characterColors: B }),
        voiceLibrarySection: /* @__PURE__ */ d.jsx(
          SR,
          {
            deploymentId: n.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: B,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ d.jsx(iM, { unmappedCount: A, totalCount: C.length, children: C.map((me) => {
          const Ne = re.get(me.toLowerCase()) ?? null, Ce = B[me] ?? "#ba9eff";
          return /* @__PURE__ */ d.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ d.jsx(
            rM,
            {
              characterName: me,
              color: Ce,
              lineCount: P[me] ?? 0,
              mapping: Ne,
              voiceAssets: h,
              presets: v,
              active: x === me,
              onToggle: () => g((Re) => Re === me ? null : me),
              onAssignVoiceAsset: (Re) => Q(me, { speakerVoiceAssetId: Re }),
              onAssignPreset: (Re) => Q(me, { defaultVectorPresetId: Re }),
              onUploadFile: (Re) => ue(me, Re),
              onClearMapping: () => ee(me)
            }
          ) }, me);
        }) }),
        emotionSection: /* @__PURE__ */ d.jsx(
          M_,
          {
            value: _,
            onChange: Z,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            f3,
            {
              value: { ...se, pace: L },
              onChange: (me) => {
                J(me), me.pace !== L && M(me.pace);
              }
            }
          ),
          /* @__PURE__ */ d.jsx(
            kh,
            {
              state: S,
              onChange: fe,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ d.jsx(E3, { checks: Ut }),
          /* @__PURE__ */ d.jsx(
            G_,
            {
              outputFormat: R,
              onOutputFormatChange: T,
              speedFactor: L,
              onSpeedFactorChange: M,
              cachePolicy: D,
              onCachePolicyChange: H,
              generation: te,
              onGenerationChange: ne
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ d.jsx(V3, { runs: i, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ d.jsx(
          BR,
          {
            deploymentId: n.deploymentId,
            targets: ve,
            onRevertToIdentity: _e,
            onRevertToChain: ze
          }
        )
      }
    )
  ] });
}
function sD({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: i,
  script: s,
  onScriptChange: o,
  outputFormat: c,
  mappingsByLower: h,
  defaultVoiceAssetId: m,
  onDefaultVoiceAssetIdChange: v
}) {
  const p = s.length, x = s.trim() ? s.trim().split(/\s+/).length : 0, g = s.trim() ? s.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
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
            _3,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: m,
              onChange: v
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
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: g.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ d.jsxs("span", { children: [
                  /* @__PURE__ */ d.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: x.toString().padStart(3, "0") }),
                  " ",
                  "words"
                ] }),
                /* @__PURE__ */ d.jsx(oD, {})
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d.jsx(
      Y3,
      {
        value: s,
        onChange: o,
        outputFormat: c,
        mappings: h,
        deploymentId: i.deploymentId
      }
    ),
    /* @__PURE__ */ d.jsx(uD, {})
  ] });
}
function oD() {
  return /* @__PURE__ */ d.jsxs(bC, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ d.jsx("h3", { className: vC, children: "Script syntax" }),
    /* @__PURE__ */ d.jsxs("ul", { className: yC, children: [
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
    /* @__PURE__ */ d.jsxs("p", { className: qy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Iy, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: qy, children: [
      /* @__PURE__ */ d.jsx("span", { className: Iy, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function uD() {
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
function cD({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: s,
  unmappedCount: o,
  globalEmotion: c,
  performance: h
}) {
  const m = [], v = n.trim();
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
  }) : s.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), c.mode === "qwen_template" && !c.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (c.mode === "emotion_vector") {
    const p = c.vector, x = Array.isArray(p) && p.some((g) => Math.abs(g) > 0.01);
    m.push({
      id: "emotion",
      status: x ? "ok" : "info",
      label: "Emotion",
      detail: x ? "8-axis vector" : "neutral vector"
    });
  } else c.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const O0 = /* @__PURE__ */ new Map();
function dD(n, a) {
  const [i, s] = b.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return b.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, c = O0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), fD(n, a, h.signal).then((m) => {
      h.signal.aborted || (O0.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const v = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: v });
    }), () => h.abort();
  }, [n, a]), i;
}
async function fD(n, a, i) {
  const s = await fetch(n, { signal: i });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return hD(h, a);
}
function hD(n, a) {
  const i = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(n.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const v = m * o, p = Math.min(s, v + o);
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
    c[m] = x;
  }
  return c;
}
const k0 = "(prefers-reduced-motion: reduce)";
function mD() {
  const [n, a] = b.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(k0).matches);
  return b.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(k0), s = (o) => a(o.matches);
    return i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), n;
}
var pD = "mquzal0", gD = "mquzal1", L0 = "mquzal2", U0 = "mquzal3", B0 = "mquzal4", vD = "mquzal5", V0 = "mquzal6", $0 = "mquzal7";
const yD = 120, bD = 720;
function Bx(n) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: v = 0,
    onSeek: p,
    width: x = bD,
    height: g = yD
  } = n, S = b.useRef(null), E = b.useRef(null), w = b.useRef(null), N = dD(a, x), R = mD();
  b.useEffect(() => {
    xD(S.current, N.peaks, x, g);
  }, [N.peaks, x, g]);
  const T = b.useCallback(
    (D) => {
      const H = E.current?.getBoundingClientRect();
      if (!H || H.width <= 0) return 0;
      const q = Math.max(0, Math.min(1, (D - H.left) / H.width));
      return Math.round(q * i);
    },
    [i]
  );
  b.useEffect(() => {
    const D = (q) => {
      if (!w.current) return;
      const oe = T(q.clientX);
      w.current === "start" ? c(Jo(oe, 0, o - 1)) : h(Jo(oe, s + 1, i));
    }, H = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", D), window.addEventListener("pointerup", H), () => {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", H);
    };
  }, [T, i, o, s, c, h]);
  const L = (D) => (H) => {
    H.preventDefault(), H.stopPropagation(), w.current = D;
  }, M = (D) => {
    !p || D.target.closest("[data-handle]") || p(T(D.clientX));
  }, _ = (D) => (H) => {
    const q = H.shiftKey ? 100 : H.ctrlKey ? 1 : 10;
    let oe = 0;
    if (H.key === "ArrowLeft") oe = -q;
    else if (H.key === "ArrowRight") oe = q;
    else return;
    H.preventDefault(), D === "start" ? c(Jo(s + oe, 0, o - 1)) : h(Jo(o + oe, s + 1, i));
  }, Z = Rf(s, i), te = Rf(o, i), ne = Rf(v, i);
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: E,
      className: pD,
      style: { height: g },
      onPointerDown: M,
      children: [
        /* @__PURE__ */ d.jsx(
          "canvas",
          {
            ref: S,
            width: x,
            height: g,
            className: gD,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ d.jsx("div", { className: $0, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ d.jsx("div", { className: $0, role: "alert", children: N.error }),
        /* @__PURE__ */ d.jsx("div", { className: V0, style: { left: 0, width: `${Z}%` } }),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: V0,
            style: { left: `${te}%`, right: 0, width: `${100 - te}%` }
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: L0,
            style: { left: `${Z}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: L("start"),
            onKeyDown: _("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: U0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: B0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: L0,
            style: { left: `${te}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: L("end"),
            onKeyDown: _("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: U0, "aria-hidden": "true" }),
              /* @__PURE__ */ d.jsx("span", { className: B0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ d.jsx(
          "div",
          {
            className: vD,
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
function Rf(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Jo(n, a, i) {
  return Math.max(a, Math.min(i, n));
}
function xD(n, a, i, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = SD(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const v = a[m] ?? 0, p = Math.max(1, v * (s - 4));
    o.fillRect(m, c - p / 2, 1, p);
  }
}
function SD(n, a, i) {
  return getComputedStyle(n).getPropertyValue(a).trim() || i;
}
var wD = "r8lfsm0", ED = "r8lfsm1", jD = "r8lfsm2", ND = "r8lfsm3", TD = "r8lfsm4", CD = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, RD = "_1b1zchy3", MD = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, AD = "_1b1zchy6", _D = "_1b1zchy7";
const Vx = b.createContext("standalone");
function $x({
  variant: n = "standalone",
  children: a,
  className: i,
  style: s,
  ...o
}) {
  const c = [CD[n], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx(Vx.Provider, { value: n, children: /* @__PURE__ */ d.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function Hx({
  title: n,
  meta: a,
  children: i,
  className: s,
  titleId: o
}) {
  const c = b.useContext(Vx), h = [RD, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsxs("div", { className: h, children: [
    /* @__PURE__ */ d.jsx("h3", { id: o, className: MD[c], children: n }),
    a ? /* @__PURE__ */ d.jsx("span", { className: AD, children: a }) : null,
    i
  ] });
}
function qx({
  children: n,
  className: a,
  role: i = "group"
}) {
  const s = [_D, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ d.jsx("div", { className: s, role: i, children: n });
}
const H0 = -16, DD = 80, zD = 720;
function OD(n) {
  const { deploymentId: a, runId: i, utterance: s, audioUrl: o, onApplied: c, onError: h, onCancel: m } = n, v = s.durationMs ?? 0, [p, x] = b.useState(() => q0(v)), [g, S] = b.useState(Ou), [E, w] = b.useState(!1), [N, R] = b.useState(!1), [T, L] = b.useState(null), [M, _] = b.useState(!1), Z = b.useRef(null), te = b.useRef(null), ne = b.useRef(null);
  b.useEffect(() => {
    const B = q0(v);
    x(B), S(_x(B)), R(!1), L(null), ne.current = null;
  }, [s.utteranceId, v]);
  const D = b.useCallback((B) => {
    S(B), x((P) => Ax(P, B));
  }, []);
  b.useEffect(() => () => te.current?.abort(), []), b.useEffect(() => {
    Z.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const H = b.useCallback(
    (B) => {
      B.key === "Escape" && (B.stopPropagation(), m());
    },
    [m]
  ), q = b.useMemo(
    () => p.ops.find((B) => B.mode === "trim"),
    [p.ops]
  ), oe = q?.start_ms ?? 0, I = q?.end_ms ?? Math.max(1, v), Y = b.useCallback((B, P) => {
    x((re) => kD(re, "trim", (A) => ({
      ...A,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(B)),
      end_ms: Math.max(Math.floor(B) + 1, Math.floor(P))
    })));
  }, []), se = b.useCallback((B) => Y(B, I), [I, Y]), J = b.useCallback((B) => Y(oe, B), [oe, Y]), O = b.useCallback((B) => {
    R(B), x((P) => {
      const re = P.ops.filter((A) => A.mode !== "normalize");
      if (B) {
        const A = {
          id: bn(),
          mode: "normalize",
          target_lufs: H0
        };
        return { ...P, ops: [...re, A] };
      }
      return { ...P, ops: re };
    });
  }, []), C = b.useCallback(async () => {
    const B = bx(p, v);
    if (B) {
      L(B.message);
      return;
    }
    if (L(null), M) return;
    te.current?.abort();
    const P = new AbortController();
    te.current = P, _(!0);
    try {
      const re = ne.current ?? void 0, A = await oC(
        a,
        i,
        s.utteranceId,
        re ? { chain: p, digest_before: re } : { chain: p },
        { signal: P.signal }
      );
      if (P.signal.aborted) return;
      ne.current = A.chain_digest, c(A);
    } catch (re) {
      if (P.signal.aborted) return;
      re instanceof Qi && (ne.current = re.currentDigest || null);
      const A = re instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : re instanceof Error ? re.message : "apply failed";
      L(A), h(A);
    } finally {
      P.signal.aborted || _(!1);
    }
  }, [p, v, M, a, i, s.utteranceId, c, h]);
  return /* @__PURE__ */ d.jsx($x, { variant: "nested", children: /* @__PURE__ */ d.jsxs("div", { ref: Z, onKeyDown: H, children: [
    /* @__PURE__ */ d.jsx(Hx, { title: "Edit segment", meta: `Source · ${Wo(v)}` }),
    /* @__PURE__ */ d.jsx(
      Bx,
      {
        audioUrl: o,
        durationMs: Math.max(1, v),
        startMs: oe,
        endMs: I,
        onChangeStart: se,
        onChangeEnd: J,
        height: DD,
        width: zD
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: wD, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: ED, children: [
        Wo(oe),
        " → ",
        Wo(I),
        " · ",
        Wo(I - oe)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: jD, children: [
      /* @__PURE__ */ d.jsxs("label", { className: ND, children: [
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (B) => O(B.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ d.jsxs("span", { children: [
          "Normalize to ",
          H0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(
        "button",
        {
          type: "button",
          className: TD,
          onClick: () => w((B) => !B),
          "aria-expanded": E,
          children: [
            E ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    E && /* @__PURE__ */ d.jsx(
      kh,
      {
        state: g,
        onChange: D,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ d.jsxs(qx, { children: [
      /* @__PURE__ */ d.jsx(ft, { size: "sm", onClick: () => void C(), disabled: M, children: M ? "Applying…" : "Apply" }),
      /* @__PURE__ */ d.jsx(ft, { variant: "ghost", size: "sm", onClick: m, disabled: M, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: T })
  ] }) });
}
function q0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: bn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function kD(n, a, i) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: bn(), mode: a };
    return { ...n, ops: [...n.ops, i(c)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function Wo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var LD = "jq2zyb2", UD = "jq2zyb3", BD = "jq2zyb4", VD = "jq2zyb5", $D = "jq2zyb6", HD = "jq2zyb7", qD = "jq2zyb8", ID = "jq2zyb9", FD = "jq2zyba", YD = "jq2zybb", GD = "jq2zybc", XD = "jq2zybd", KD = "jq2zybe", PD = "jq2zybf jq2zybe", QD = "jq2zybg", ZD = "jq2zybh", JD = "jq2zybi", WD = "jq2zybj", ez = "jq2zybk", tz = "jq2zybl", nz = "jq2zybm", az = "jq2zybn", rz = "jq2zybo", iz = "jq2zybp", lz = "jq2zybq", sz = "jq2zybr", oz = "jq2zybs", uz = "jq2zybt", cz = "jq2zybu", dz = "jq2zybv", fz = "jq2zybw", hz = "jq2zybx", mz = "jq2zyby", pz = "jq2zybz", I0 = "jq2zyb10", gz = "jq2zyb11", vz = "jq2zyb12", yz = "jq2zyb13", bz = "jq2zyb14";
const xz = ["cancelled", "failed", "partial"], Sz = 2600;
function wz() {
  const { run: n } = Ts(), a = js(), [i, s] = b.useState(n), [o, c] = b.useState(!1), [h, m] = b.useState(null), [v, p] = b.useState(null), [x, g] = b.useState(
    null
  );
  b.useEffect(() => {
    s(n);
  }, [n]), b.useEffect(() => {
    if (!x) return;
    const _ = setTimeout(() => g(null), Sz);
    return () => clearTimeout(_);
  }, [x]);
  const S = b.useMemo(() => Nz(i), [i]), E = xz.includes(i.status) && i.kind === "batch", w = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      c(!0), m(null);
      try {
        const { runId: _ } = await vx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${_}`);
      } catch (_) {
        m(Rz(_));
      } finally {
        c(!1);
      }
    }
  }, R = b.useCallback((_) => {
    p((Z) => Z === _ ? null : _);
  }, []), T = b.useCallback(() => {
    p(null);
  }, []), L = (_, Z) => {
    s((te) => jz(te, _, Z)), p(null), g({ message: "Segment edited", severity: "success" });
  }, M = b.useCallback((_) => {
    g({ message: _, severity: "error" });
  }, []);
  return /* @__PURE__ */ d.jsxs("main", { className: LD, children: [
    /* @__PURE__ */ d.jsxs("div", { className: UD, children: [
      /* @__PURE__ */ d.jsxs("header", { className: BD, children: [
        /* @__PURE__ */ d.jsxs("p", { className: VD, children: [
          i.deploymentId ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx(Du, { to: `/${i.deploymentId}/recipe`, className: $D, children: "← Back to recipe" }),
            /* @__PURE__ */ d.jsx("span", { className: HD, children: "·" })
          ] }) : null,
          /* @__PURE__ */ d.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: qD, children: [
          /* @__PURE__ */ d.jsxs("h1", { className: ID, children: [
            Tz(i.kind),
            /* @__PURE__ */ d.jsx("span", { className: FD, children: i.runId })
          ] }),
          /* @__PURE__ */ d.jsx(br, { size: "md", tone: Mz(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("section", { className: YD, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ d.jsx(eu, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ d.jsx(eu, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ d.jsx(
          eu,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ d.jsx(
          eu,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      E && /* @__PURE__ */ d.jsxs("section", { className: ZD, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ d.jsxs("div", { className: JD, children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-resume-title", className: WD, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ d.jsx("p", { className: ez, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ d.jsx(ft, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ d.jsx("p", { className: tz, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ d.jsxs(gT, { children: [
          /* @__PURE__ */ d.jsx("h2", { id: "run-detail-utterances", className: Pr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ d.jsxs("span", { className: nz, children: [
            /* @__PURE__ */ d.jsx("span", { className: az, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("ul", { className: rz, children: i.utterances.map((_) => {
          const Z = v === _.utteranceId, te = _.status === "completed" && _.audioArtifactRef !== null && _.audioArtifactRef !== void 0, ne = _.derivedArtifactRef ?? _.audioArtifactRef ?? null, D = ne ? `/api/v1/artifacts/${encodeURIComponent(ne)}/download` : "", H = (_.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ d.jsxs("li", { className: lz, children: [
            /* @__PURE__ */ d.jsxs("div", { className: iz, children: [
              /* @__PURE__ */ d.jsxs("span", { className: uz, children: [
                "#",
                _.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: cz, title: _.characterDisplay, children: _.characterDisplay }),
              /* @__PURE__ */ d.jsx("span", { className: dz, title: _.text, children: _.text }),
              /* @__PURE__ */ d.jsxs("span", { className: fz, children: [
                _.cacheHit && /* @__PURE__ */ d.jsx("span", { className: hz, children: "cached" }),
                H && /* @__PURE__ */ d.jsx("span", { className: sz, children: "edited" }),
                _.durationMs ? /* @__PURE__ */ d.jsx("span", { children: Cz(_.durationMs) }) : null,
                /* @__PURE__ */ d.jsx(br, { tone: Az(_.status), children: _.status }),
                te && /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: oz,
                    onClick: () => R(_.utteranceId),
                    "aria-expanded": Z,
                    "aria-label": Z ? "Close segment editor" : "Edit segment",
                    children: Z ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            Z && D && i.deploymentId && /* @__PURE__ */ d.jsx(
              OD,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: _,
                audioUrl: D,
                onApplied: (q) => L(_.utteranceId, q),
                onError: M,
                onCancel: T
              }
            )
          ] }, _.utteranceId);
        }) })
      ] }),
      Ez(i, w)
    ] }),
    x && /* @__PURE__ */ d.jsx(
      "div",
      {
        className: bz,
        role: x.severity === "error" ? "alert" : "status",
        "aria-live": x.severity === "error" ? "assertive" : "polite",
        children: x.message
      }
    )
  ] });
}
function Ez(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ d.jsx("div", { className: mz, children: a ? /* @__PURE__ */ d.jsxs("div", { className: gz, children: [
    /* @__PURE__ */ d.jsx("p", { className: vz, children: s }),
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: yz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ d.jsx("span", { className: I0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ d.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: pz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ d.jsx("span", { className: I0, children: "↓" })
      ]
    }
  ) : null });
}
function jz(n, a, i) {
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
function eu({ label: n, value: a, mono: i, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: GD,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ d.jsx("span", { className: XD, children: n }),
        /* @__PURE__ */ d.jsx("span", { className: i ? PD : KD, children: a }),
        o !== void 0 && /* @__PURE__ */ d.jsx("span", { className: QD, "aria-hidden": "true" })
      ]
    }
  );
}
function Nz(n) {
  const a = n.utterances.length, i = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, c = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: s, cached: o, cacheRatio: c };
}
function Tz(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function Cz(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function Rz(n) {
  return n instanceof el ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function Mz(n) {
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
function Az(n) {
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
var _z = "pcphqj2", Dz = "pcphqj3", zz = "pcphqj4", Oz = "pcphqj5", kz = "pcphqj6", Lz = "pcphqj7", Uz = "pcphqj8", Bz = "pcphqj9", Vz = "pcphqja", F0 = "pcphqjb", $z = "pcphqjc", Hz = "pcphqjd", qz = "pcphqje pcphqjd", Iz = "pcphqjf", Fz = "pcphqjg", Yz = "pcphqjh", Gz = "pcphqji", Xz = "pcphqjj pcphqji", Kz = "pcphqjk pcphqji", Pz = "pcphqjl pcphqji", Qz = "pcphqjm", Mf = "pcphqjn", Af = "pcphqjo";
function Zz() {
  const [n, a] = b.useState(null), [i, s] = b.useState(null);
  return b.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const m = await mt("/runtime/queue");
        o || (a(m.entries), s(null));
      } catch (m) {
        o || s(m instanceof Error ? m.message : "Unknown error");
      }
    };
    c();
    const h = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ d.jsx("main", { className: _z, children: /* @__PURE__ */ d.jsxs("div", { className: Dz, children: [
    /* @__PURE__ */ d.jsxs("header", { className: zz, children: [
      /* @__PURE__ */ d.jsx("p", { className: Oz, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ d.jsxs("div", { className: kz, children: [
        /* @__PURE__ */ d.jsx("h1", { className: Lz, children: "Queue" }),
        /* @__PURE__ */ d.jsx("span", { className: Uz, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ d.jsx("p", { className: Bz, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: i }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ d.jsx(La, { density: "compact", children: /* @__PURE__ */ d.jsx(Cs, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ d.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ d.jsx("h2", { id: "runtime-queue-section", className: Pr, children: "01 / In flight" }),
      /* @__PURE__ */ d.jsx("ul", { className: Vz, children: n.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ d.jsxs(
          "li",
          {
            className: c ? `${F0} ${$z}` : F0,
            children: [
              /* @__PURE__ */ d.jsx("span", { className: c ? qz : Hz, children: o.position }),
              /* @__PURE__ */ d.jsxs("span", { className: Iz, children: [
                /* @__PURE__ */ d.jsx("span", { className: Fz, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ d.jsx("span", { className: Yz, children: o.runId })
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: Jz(o.kind), children: Wz(o.kind) }),
              /* @__PURE__ */ d.jsx("span", { className: Qz, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: Mf, children: e5(o.etaSeconds) }),
                /* @__PURE__ */ d.jsx("span", { className: Af, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: Mf, children: o.utteranceTotal }),
                /* @__PURE__ */ d.jsx("span", { className: Af, children: "lines" })
              ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("span", { className: Mf, children: "—" }),
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
function Jz(n) {
  switch (n) {
    case "batch":
      return Xz;
    case "test_line":
      return Kz;
    case "resume":
      return Pz;
    default:
      return Gz;
  }
}
function Wz(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function e5(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), i = n % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function t5() {
  const { deploymentId: n, prefillCharacterName: a } = Ts(), i = js(), [s, o] = b.useState(a), [c, h] = b.useState(""), [m, v] = b.useState("none"), [p, x] = b.useState(!1), [g, S] = b.useState(null), E = b.useRef(null);
  b.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (N) => {
    N.preventDefault(), x(!0), S(null);
    try {
      await _h(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: m
      }), i(`/${n}/recipe`);
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
            value: s,
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
            value: c,
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
      /* @__PURE__ */ d.jsx(ft, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      g && /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: g })
    ] })
  ] });
}
const Ix = b.createContext({});
function Lh(n) {
  const a = b.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const n5 = typeof window < "u", Fx = n5 ? b.useLayoutEffect : b.useEffect, ku = /* @__PURE__ */ b.createContext(null);
function a5(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function r5(n, a) {
  const i = n.indexOf(a);
  i > -1 && n.splice(i, 1);
}
const xr = (n, a, i) => i > a ? a : i < n ? n : i;
function Y0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let Rs = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rs = (n, a, i) => {
  !n && typeof console < "u" && console.warn(Y0(a, i));
}, Ji = (n, a, i) => {
  if (!n)
    throw new Error(Y0(a, i));
});
const Sr = {}, Yx = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function i5(n) {
  return typeof n == "object" && n !== null;
}
const Gx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Xx(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const tl = /* @__NO_SIDE_EFFECTS__ */ (n) => n, l5 = (n, a) => (i) => a(n(i)), Lu = (...n) => n.reduce(l5), Kx = /* @__NO_SIDE_EFFECTS__ */ (n, a, i) => {
  const s = a - n;
  return s === 0 ? 1 : (i - n) / s;
};
class Px {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return a5(this.subscriptions, a), () => r5(this.subscriptions, a);
  }
  notify(a, i, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, s);
      else
        for (let c = 0; c < o; c++) {
          const h = this.subscriptions[c];
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
const Gn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, na = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Qx(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Zx = (n, a, i) => (((1 - 3 * i + 3 * a) * n + (3 * i - 6 * a)) * n + 3 * a) * n, s5 = 1e-7, o5 = 12;
function u5(n, a, i, s, o) {
  let c, h, m = 0;
  do
    h = a + (i - a) / 2, c = Zx(h, s, o) - n, c > 0 ? i = h : a = h;
  while (Math.abs(c) > s5 && ++m < o5);
  return h;
}
function Ms(n, a, i, s) {
  if (n === a && i === s)
    return tl;
  const o = (c) => u5(c, 0, 1, n, i);
  return (c) => c === 0 || c === 1 ? c : Zx(o(c), a, s);
}
const Jx = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Wx = (n) => (a) => 1 - n(1 - a), e1 = /* @__PURE__ */ Ms(0.33, 1.53, 0.69, 0.99), Uh = /* @__PURE__ */ Wx(e1), t1 = /* @__PURE__ */ Jx(Uh), n1 = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Uh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Bh = (n) => 1 - Math.sin(Math.acos(n)), c5 = Wx(Bh), a1 = Jx(Bh), d5 = /* @__PURE__ */ Ms(0.42, 0, 1, 1), f5 = /* @__PURE__ */ Ms(0, 0, 0.58, 1), r1 = /* @__PURE__ */ Ms(0.42, 0, 0.58, 1), h5 = (n) => Array.isArray(n) && typeof n[0] != "number", i1 = (n) => Array.isArray(n) && typeof n[0] == "number", G0 = {
  linear: tl,
  easeIn: d5,
  easeInOut: r1,
  easeOut: f5,
  circIn: Bh,
  circInOut: a1,
  circOut: c5,
  backIn: Uh,
  backInOut: t1,
  backOut: e1,
  anticipate: n1
}, m5 = (n) => typeof n == "string", X0 = (n) => {
  if (i1(n)) {
    Ji(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, s, o] = n;
    return Ms(a, i, s, o);
  } else if (m5(n))
    return Ji(G0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), G0[n];
  return n;
}, tu = [
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
function p5(n, a) {
  let i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function v(x) {
    h.has(x) && (p.schedule(x), n()), x(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (x, g = !1, S = !1) => {
      const w = S && o ? i : s;
      return g && h.add(x), w.add(x), x;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (x) => {
      s.delete(x), h.delete(x);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (x) => {
      if (m = x, o) {
        c = !0;
        return;
      }
      o = !0;
      const g = i;
      i = s, s = g, i.forEach(v), i.clear(), o = !1, c && (c = !1, p.process(x));
    }
  };
  return p;
}
const g5 = 40;
function l1(n, a) {
  let i = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => i = !0, h = tu.reduce((M, _) => (M[_] = p5(c), M), {}), { setup: m, read: v, resolveKeyframes: p, preUpdate: x, update: g, preRender: S, render: E, postRender: w } = h, N = () => {
    const M = Sr.useManualTiming, _ = M ? o.timestamp : performance.now();
    i = !1, M || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(_ - o.timestamp, g5), 1)), o.timestamp = _, o.isProcessing = !0, m.process(o), v.process(o), p.process(o), x.process(o), g.process(o), S.process(o), E.process(o), w.process(o), o.isProcessing = !1, i && a && (s = !1, n(N));
  }, R = () => {
    i = !0, s = !0, o.isProcessing || n(N);
  };
  return { schedule: tu.reduce((M, _) => {
    const Z = h[_];
    return M[_] = (te, ne = !1, D = !1) => (i || R(), Z.schedule(te, ne, D)), M;
  }, {}), cancel: (M) => {
    for (let _ = 0; _ < tu.length; _++)
      h[tu[_]].cancel(M);
  }, state: o, steps: h };
}
const { schedule: Xn, cancel: Pf, state: bu } = /* @__PURE__ */ l1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : tl, !0);
let fu;
function v5() {
  fu = void 0;
}
const _n = {
  now: () => (fu === void 0 && _n.set(bu.isProcessing || Sr.useManualTiming ? bu.timestamp : performance.now()), fu),
  set: (n) => {
    fu = n, queueMicrotask(v5);
  }
}, s1 = (n) => (a) => typeof a == "string" && a.startsWith(n), o1 = /* @__PURE__ */ s1("--"), y5 = /* @__PURE__ */ s1("var(--"), Vh = (n) => y5(n) ? b5.test(n.split("/*")[0].trim()) : !1, b5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function K0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const nl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, bs = {
  ...nl,
  transform: (n) => xr(0, 1, n)
}, nu = {
  ...nl,
  default: 1
}, ds = (n) => Math.round(n * 1e5) / 1e5, $h = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function x5(n) {
  return n == null;
}
const S5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Hh = (n, a) => (i) => !!(typeof i == "string" && S5.test(i) && i.startsWith(n) || a && !x5(i) && Object.prototype.hasOwnProperty.call(i, a)), u1 = (n, a, i) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, h, m] = s.match($h);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, w5 = (n) => xr(0, 255, n), _f = {
  ...nl,
  transform: (n) => Math.round(w5(n))
}, Xr = {
  test: /* @__PURE__ */ Hh("rgb", "red"),
  parse: /* @__PURE__ */ u1("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: i, alpha: s = 1 }) => "rgba(" + _f.transform(n) + ", " + _f.transform(a) + ", " + _f.transform(i) + ", " + ds(bs.transform(s)) + ")"
};
function E5(n) {
  let a = "", i = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), i = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), i = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, i += i, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Qf = {
  test: /* @__PURE__ */ Hh("#"),
  parse: E5,
  transform: Xr.transform
}, As = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), mr = /* @__PURE__ */ As("deg"), Pi = /* @__PURE__ */ As("%"), we = /* @__PURE__ */ As("px"), j5 = /* @__PURE__ */ As("vh"), N5 = /* @__PURE__ */ As("vw"), P0 = {
  ...Pi,
  parse: (n) => Pi.parse(n) / 100,
  transform: (n) => Pi.transform(n * 100)
}, Gi = {
  test: /* @__PURE__ */ Hh("hsl", "hue"),
  parse: /* @__PURE__ */ u1("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: i, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Pi.transform(ds(a)) + ", " + Pi.transform(ds(i)) + ", " + ds(bs.transform(s)) + ")"
}, kt = {
  test: (n) => Xr.test(n) || Qf.test(n) || Gi.test(n),
  parse: (n) => Xr.test(n) ? Xr.parse(n) : Gi.test(n) ? Gi.parse(n) : Qf.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Xr.transform(n) : Gi.transform(n),
  getAnimatableNone: (n) => {
    const a = kt.parse(n);
    return a.alpha = 0, kt.transform(a);
  }
}, T5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function C5(n) {
  return isNaN(n) && typeof n == "string" && (n.match($h)?.length || 0) + (n.match(T5)?.length || 0) > 0;
}
const c1 = "number", d1 = "color", R5 = "var", M5 = "var(", Q0 = "${}", A5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(n) {
  const a = n.toString(), i = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const m = a.replace(A5, (v) => (kt.test(v) ? (s.color.push(c), o.push(d1), i.push(kt.parse(v))) : v.startsWith(M5) ? (s.var.push(c), o.push(R5), i.push(v)) : (s.number.push(c), o.push(c1), i.push(parseFloat(v))), ++c, Q0)).split(Q0);
  return { values: i, split: m, indexes: s, types: o };
}
function _5(n) {
  return Wi(n).values;
}
function f1({ split: n, types: a }) {
  const i = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < i; c++)
      if (o += n[c], s[c] !== void 0) {
        const h = a[c];
        h === c1 ? o += ds(s[c]) : h === d1 ? o += kt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function D5(n) {
  return f1(Wi(n));
}
const z5 = (n) => typeof n == "number" ? 0 : kt.test(n) ? kt.getAnimatableNone(n) : n, O5 = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : z5(n);
function k5(n) {
  const a = Wi(n);
  return f1(a)(a.values.map((s, o) => O5(s, a.split[o])));
}
const aa = {
  test: C5,
  parse: _5,
  createTransformer: D5,
  getAnimatableNone: k5
};
function Df(n, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? n + (a - n) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? n + (a - n) * (2 / 3 - i) * 6 : n;
}
function L5({ hue: n, saturation: a, lightness: i, alpha: s }) {
  n /= 360, a /= 100, i /= 100;
  let o = 0, c = 0, h = 0;
  if (!a)
    o = c = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, v = 2 * i - m;
    o = Df(v, m, n + 1 / 3), c = Df(v, m, n), h = Df(v, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function xu(n, a) {
  return (i) => i > 0 ? a : n;
}
const _s = (n, a, i) => n + (a - n) * i, zf = (n, a, i) => {
  const s = n * n, o = i * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, U5 = [Qf, Xr, Gi], B5 = (n) => U5.find((a) => a.test(n));
function Z0(n) {
  const a = B5(n);
  if (Rs(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(n);
  return a === Gi && (i = L5(i)), i;
}
const J0 = (n, a) => {
  const i = Z0(n), s = Z0(a);
  if (!i || !s)
    return xu(n, a);
  const o = { ...i };
  return (c) => (o.red = zf(i.red, s.red, c), o.green = zf(i.green, s.green, c), o.blue = zf(i.blue, s.blue, c), o.alpha = _s(i.alpha, s.alpha, c), Xr.transform(o));
}, Zf = /* @__PURE__ */ new Set(["none", "hidden"]);
function V5(n, a) {
  return Zf.has(n) ? (i) => i <= 0 ? n : a : (i) => i >= 1 ? a : n;
}
function $5(n, a) {
  return (i) => _s(n, a, i);
}
function qh(n) {
  return typeof n == "number" ? $5 : typeof n == "string" ? Vh(n) ? xu : kt.test(n) ? J0 : I5 : Array.isArray(n) ? h1 : typeof n == "object" ? kt.test(n) ? J0 : H5 : xu;
}
function h1(n, a) {
  const i = [...n], s = i.length, o = n.map((c, h) => qh(c)(c, a[h]));
  return (c) => {
    for (let h = 0; h < s; h++)
      i[h] = o[h](c);
    return i;
  };
}
function H5(n, a) {
  const i = { ...n, ...a }, s = {};
  for (const o in i)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = qh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      i[c] = s[c](o);
    return i;
  };
}
function q5(n, a) {
  const i = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], h = n.indexes[c][s[c]], m = n.values[h] ?? 0;
    i[o] = m, s[c]++;
  }
  return i;
}
const I5 = (n, a) => {
  const i = aa.createTransformer(a), s = Wi(n), o = Wi(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Zf.has(n) && !o.values.length || Zf.has(a) && !s.values.length ? V5(n, a) : Lu(h1(q5(s, o), o.values), i) : (Rs(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), xu(n, a));
};
function m1(n, a, i) {
  return typeof n == "number" && typeof a == "number" && typeof i == "number" ? _s(n, a, i) : qh(n)(n, a);
}
const F5 = (n) => {
  const a = ({ timestamp: i }) => n(i);
  return {
    start: (i = !0) => Xn.update(a, i),
    stop: () => Pf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => bu.isProcessing ? bu.timestamp : _n.now()
  };
}, p1 = (n, a, i = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Su = 2e4;
function Ih(n) {
  let a = 0;
  const i = 50;
  let s = n.next(a);
  for (; !s.done && a < Su; )
    a += i, s = n.next(a);
  return a >= Su ? 1 / 0 : a;
}
function Y5(n, a = 100, i) {
  const s = i({ ...n, keyframes: [0, a] }), o = Math.min(Ih(s), Su);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ na(o)
  };
}
const xt = {
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
function Jf(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const G5 = 12;
function X5(n, a, i) {
  let s = i;
  for (let o = 1; o < G5; o++)
    s = s - n(s) / a(s);
  return s;
}
const Of = 1e-3;
function K5({ duration: n = xt.duration, bounce: a = xt.bounce, velocity: i = xt.velocity, mass: s = xt.mass }) {
  let o, c;
  Rs(n <= /* @__PURE__ */ Gn(xt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(xt.minDamping, xt.maxDamping, h), n = xr(xt.minDuration, xt.maxDuration, /* @__PURE__ */ na(n)), h < 1 ? (o = (p) => {
    const x = p * h, g = x * n, S = x - i, E = Jf(p, h), w = Math.exp(-g);
    return Of - S / E * w;
  }, c = (p) => {
    const g = p * h * n, S = g * i + i, E = Math.pow(h, 2) * Math.pow(p, 2) * n, w = Math.exp(-g), N = Jf(Math.pow(p, 2), h);
    return (-o(p) + Of > 0 ? -1 : 1) * ((S - E) * w) / N;
  }) : (o = (p) => {
    const x = Math.exp(-p * n), g = (p - i) * n + 1;
    return -Of + x * g;
  }, c = (p) => {
    const x = Math.exp(-p * n), g = (i - p) * (n * n);
    return x * g;
  });
  const m = 5 / n, v = X5(o, c, m);
  if (n = /* @__PURE__ */ Gn(n), isNaN(v))
    return {
      stiffness: xt.stiffness,
      damping: xt.damping,
      duration: n
    };
  {
    const p = Math.pow(v, 2) * s;
    return {
      stiffness: p,
      damping: h * 2 * Math.sqrt(s * p),
      duration: n
    };
  }
}
const P5 = ["duration", "bounce"], Q5 = ["stiffness", "damping", "mass"];
function W0(n, a) {
  return a.some((i) => n[i] !== void 0);
}
function Z5(n) {
  let a = {
    velocity: xt.velocity,
    stiffness: xt.stiffness,
    damping: xt.damping,
    mass: xt.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!W0(n, Q5) && W0(n, P5))
    if (a.velocity = 0, n.visualDuration) {
      const i = n.visualDuration, s = 2 * Math.PI / (i * 1.2), o = s * s, c = 2 * xr(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: xt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const i = K5({ ...n, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: xt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function wu(n = xt.visualDuration, a = xt.bounce) {
  const i = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = i;
  const c = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: c }, { stiffness: v, damping: p, mass: x, duration: g, velocity: S, isResolvedFromDuration: E } = Z5({
    ...i,
    velocity: -/* @__PURE__ */ na(i.velocity || 0)
  }), w = S || 0, N = p / (2 * Math.sqrt(v * x)), R = h - c, T = /* @__PURE__ */ na(Math.sqrt(v / x)), L = Math.abs(R) < 5;
  s || (s = L ? xt.restSpeed.granular : xt.restSpeed.default), o || (o = L ? xt.restDelta.granular : xt.restDelta.default);
  let M, _, Z, te, ne, D;
  if (N < 1)
    Z = Jf(T, N), te = (w + N * T * R) / Z, M = (q) => {
      const oe = Math.exp(-N * T * q);
      return h - oe * (te * Math.sin(Z * q) + R * Math.cos(Z * q));
    }, ne = N * T * te + R * Z, D = N * T * R - te * Z, _ = (q) => Math.exp(-N * T * q) * (ne * Math.sin(Z * q) + D * Math.cos(Z * q));
  else if (N === 1) {
    M = (oe) => h - Math.exp(-T * oe) * (R + (w + T * R) * oe);
    const q = w + T * R;
    _ = (oe) => Math.exp(-T * oe) * (T * q * oe - w);
  } else {
    const q = T * Math.sqrt(N * N - 1);
    M = (se) => {
      const J = Math.exp(-N * T * se), O = Math.min(q * se, 300);
      return h - J * ((w + N * T * R) * Math.sinh(O) + q * R * Math.cosh(O)) / q;
    };
    const oe = (w + N * T * R) / q, I = N * T * oe - R * q, Y = N * T * R - oe * q;
    _ = (se) => {
      const J = Math.exp(-N * T * se), O = Math.min(q * se, 300);
      return J * (I * Math.sinh(O) + Y * Math.cosh(O));
    };
  }
  const H = {
    calculatedDuration: E && g || null,
    velocity: (q) => /* @__PURE__ */ Gn(_(q)),
    next: (q) => {
      if (!E && N < 1) {
        const I = Math.exp(-N * T * q), Y = Math.sin(Z * q), se = Math.cos(Z * q), J = h - I * (te * Y + R * se), O = /* @__PURE__ */ Gn(I * (ne * Y + D * se));
        return m.done = Math.abs(O) <= s && Math.abs(h - J) <= o, m.value = m.done ? h : J, m;
      }
      const oe = M(q);
      if (E)
        m.done = q >= g;
      else {
        const I = /* @__PURE__ */ Gn(_(q));
        m.done = Math.abs(I) <= s && Math.abs(h - oe) <= o;
      }
      return m.value = m.done ? h : oe, m;
    },
    toString: () => {
      const q = Math.min(Ih(H), Su), oe = p1((I) => H.next(q * I).value, q, 30);
      return q + "ms " + oe;
    },
    toTransition: () => {
    }
  };
  return H;
}
wu.applyToOptions = (n) => {
  const a = Y5(n, 100, wu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Gn(a.duration), n.type = "keyframes", n;
};
const J5 = 5;
function g1(n, a, i) {
  const s = Math.max(a - J5, 0);
  return Qx(i - n(s), a - s);
}
function Wf({ keyframes: n, velocity: a = 0, power: i = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: h, min: m, max: v, restDelta: p = 0.5, restSpeed: x }) {
  const g = n[0], S = {
    done: !1,
    value: g
  }, E = (D) => m !== void 0 && D < m || v !== void 0 && D > v, w = (D) => m === void 0 ? v : v === void 0 || Math.abs(m - D) < Math.abs(v - D) ? m : v;
  let N = i * a;
  const R = g + N, T = h === void 0 ? R : h(R);
  T !== R && (N = T - g);
  const L = (D) => -N * Math.exp(-D / s), M = (D) => T + L(D), _ = (D) => {
    const H = L(D), q = M(D);
    S.done = Math.abs(H) <= p, S.value = S.done ? T : q;
  };
  let Z, te;
  const ne = (D) => {
    E(S.value) && (Z = D, te = wu({
      keyframes: [S.value, w(S.value)],
      velocity: g1(M, D, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: p,
      restSpeed: x
    }));
  };
  return ne(0), {
    calculatedDuration: null,
    next: (D) => {
      let H = !1;
      return !te && Z === void 0 && (H = !0, _(D), ne(D)), Z !== void 0 && D >= Z ? te.next(D - Z) : (!H && _(D), S);
    }
  };
}
function W5(n, a, i) {
  const s = [], o = i || Sr.mix || m1, c = n.length - 1;
  for (let h = 0; h < c; h++) {
    let m = o(n[h], n[h + 1]);
    if (a) {
      const v = Array.isArray(a) ? a[h] || tl : a;
      m = Lu(v, m);
    }
    s.push(m);
  }
  return s;
}
function e4(n, a, { clamp: i = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Ji(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = W5(a, s, o), v = m.length, p = (x) => {
    if (h && x < n[0])
      return a[0];
    let g = 0;
    if (v > 1)
      for (; g < n.length - 2 && !(x < n[g + 1]); g++)
        ;
    const S = /* @__PURE__ */ Kx(n[g], n[g + 1], x);
    return m[g](S);
  };
  return i ? (x) => p(xr(n[0], n[c - 1], x)) : p;
}
function t4(n, a) {
  const i = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Kx(0, a, s);
    n.push(_s(i, 1, o));
  }
}
function n4(n) {
  const a = [0];
  return t4(a, n.length - 1), a;
}
function a4(n, a) {
  return n.map((i) => i * a);
}
function r4(n, a) {
  return n.map(() => a || r1).splice(0, n.length - 1);
}
function fs({ duration: n = 300, keyframes: a, times: i, ease: s = "easeInOut" }) {
  const o = h5(s) ? s.map(X0) : X0(s), c = {
    done: !1,
    value: a[0]
  }, h = a4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : n4(a),
    n
  ), m = e4(h, a, {
    ease: Array.isArray(o) ? o : r4(a, o)
  });
  return {
    calculatedDuration: n,
    next: (v) => (c.value = m(v), c.done = v >= n, c)
  };
}
const i4 = (n) => n !== null;
function Uu(n, { repeat: a, repeatType: i = "loop" }, s, o = 1) {
  const c = n.filter(i4), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !m || s === void 0 ? c[m] : s;
}
const l4 = {
  decay: Wf,
  inertia: Wf,
  tween: fs,
  keyframes: fs,
  spring: wu
};
function v1(n) {
  typeof n.type == "string" && (n.type = l4[n.type]);
}
class Fh {
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
const s4 = (n) => n / 100;
class Eu extends Fh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== _n.now() && this.tick(_n.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    v1(a);
    const { type: i = fs, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const v = i || fs;
    v !== fs && typeof m[0] != "number" && (this.mixKeyframes = Lu(s4, m1(m[0], m[1])), m = [0, 100]);
    const p = v({ ...a, keyframes: m });
    c === "mirror" && (this.mirroredGenerator = v({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Ih(p));
    const { calculatedDuration: x } = p;
    this.calculatedDuration = x, this.resolvedDuration = x + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: x, repeat: g, repeatType: S, repeatDelay: E, type: w, onUpdate: N, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), L = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let M = this.currentTime, _ = s;
    if (g) {
      const D = Math.min(this.currentTime, o) / m;
      let H = Math.floor(D), q = D % 1;
      !q && D >= 1 && (q = 1), q === 1 && H--, H = Math.min(H, g + 1), !!(H % 2) && (S === "reverse" ? (q = 1 - q, E && (q -= E / m)) : S === "mirror" && (_ = h)), M = xr(0, 1, q) * m;
    }
    let Z;
    L ? (this.delayState.value = x[0], Z = this.delayState) : Z = _.next(M), c && !L && (Z.value = c(Z.value));
    let { done: te } = Z;
    !L && v !== null && (te = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ne = this.holdTime === null && (this.state === "finished" || this.state === "running" && te);
    return ne && w !== Wf && (Z.value = Uu(x, this.options, R, this.speed)), N && N(Z.value), ne && this.finish(), Z;
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
    return /* @__PURE__ */ na(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ na(a);
  }
  get time() {
    return /* @__PURE__ */ na(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Gn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return g1((s) => this.generator.next(s).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(_n.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ na(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = F5, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(_n.now()), this.holdTime = this.currentTime;
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
function o4(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Kr = (n) => n * 180 / Math.PI, eh = (n) => {
  const a = Kr(Math.atan2(n[1], n[0]));
  return th(a);
}, u4 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: eh,
  rotateZ: eh,
  skewX: (n) => Kr(Math.atan(n[1])),
  skewY: (n) => Kr(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, th = (n) => (n = n % 360, n < 0 && (n += 360), n), eb = eh, tb = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), nb = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), c4 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: tb,
  scaleY: nb,
  scale: (n) => (tb(n) + nb(n)) / 2,
  rotateX: (n) => th(Kr(Math.atan2(n[6], n[5]))),
  rotateY: (n) => th(Kr(Math.atan2(-n[2], n[0]))),
  rotateZ: eb,
  rotate: eb,
  skewX: (n) => Kr(Math.atan(n[4])),
  skewY: (n) => Kr(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function nh(n) {
  return n.includes("scale") ? 1 : 0;
}
function ah(n, a) {
  if (!n || n === "none")
    return nh(a);
  const i = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (i)
    s = c4, o = i;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = u4, o = m;
  }
  if (!o)
    return nh(a);
  const c = s[a], h = o[1].split(",").map(f4);
  return typeof c == "function" ? c(h) : h[c];
}
const d4 = (n, a) => {
  const { transform: i = "none" } = getComputedStyle(n);
  return ah(i, a);
};
function f4(n) {
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
], rl = new Set(al), ab = (n) => n === nl || n === we, h4 = /* @__PURE__ */ new Set(["x", "y", "z"]), m4 = al.filter((n) => !h4.has(n));
function p4(n) {
  const a = [];
  return m4.forEach((i) => {
    const s = n.getValue(i);
    s !== void 0 && (a.push([i, s.get()]), s.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const yr = {
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
  x: (n, { transform: a }) => ah(a, "x"),
  y: (n, { transform: a }) => ah(a, "y")
};
yr.translateX = yr.x;
yr.translateY = yr.y;
const Qr = /* @__PURE__ */ new Set();
let rh = !1, ih = !1, lh = !1;
function y1() {
  if (ih) {
    const n = Array.from(Qr).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), i = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = p4(s);
      o.length && (i.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = i.get(s);
      o && o.forEach(([c, h]) => {
        s.getValue(c)?.set(h);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  ih = !1, rh = !1, Qr.forEach((n) => n.complete(lh)), Qr.clear();
}
function b1() {
  Qr.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (ih = !0);
  });
}
function g4() {
  lh = !0, b1(), y1(), lh = !1;
}
class Yh {
  constructor(a, i, s, o, c, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = s, this.motionValue = o, this.element = c, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), rh || (rh = !0, Xn.read(b1), Xn.resolveKeyframes(y1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), h = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && i) {
        const m = s.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && c === void 0 && o.set(a[0]);
    }
    o4(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Qr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Qr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const v4 = (n) => n.startsWith("--");
function x1(n, a, i) {
  v4(a) ? n.style.setProperty(a, i) : n.style[a] = i;
}
const y4 = {};
function S1(n, a) {
  const i = /* @__PURE__ */ Xx(n);
  return () => y4[a] ?? i();
}
const b4 = /* @__PURE__ */ S1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), w1 = /* @__PURE__ */ S1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), os = ([n, a, i, s]) => `cubic-bezier(${n}, ${a}, ${i}, ${s})`, rb = {
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
function E1(n, a) {
  if (n)
    return typeof n == "function" ? w1() ? p1(n, a) : "ease-out" : i1(n) ? os(n) : Array.isArray(n) ? n.map((i) => E1(i, a) || rb.easeOut) : rb[n];
}
function x4(n, a, i, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: h = "loop", ease: m = "easeOut", times: v } = {}, p = void 0) {
  const x = {
    [a]: i
  };
  v && (x.offset = v);
  const g = E1(m, o);
  Array.isArray(g) && (x.easing = g);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: c + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), n.animate(x, S);
}
function j1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function S4({ type: n, ...a }) {
  return j1(n) && w1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class N1 extends Fh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: s, keyframes: o, pseudoElement: c, allowFlatten: h = !1, finalKeyframe: m, onComplete: v } = a;
    this.isPseudoElement = !!c, this.allowFlatten = h, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = S4(a);
    this.animation = x4(i, s, o, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const x = Uu(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(x), x1(i, s, x), this.animation.cancel();
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
    return /* @__PURE__ */ na(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ na(a);
  }
  get time() {
    return /* @__PURE__ */ na(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Gn(a), i && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && b4() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), s && (this.animation.rangeEnd = s), tl) : o(this);
  }
}
const T1 = {
  anticipate: n1,
  backInOut: t1,
  circInOut: a1
};
function w4(n) {
  return n in T1;
}
function E4(n) {
  typeof n.ease == "string" && w4(n.ease) && (n.ease = T1[n.ease]);
}
const kf = 10;
class j4 extends N1 {
  constructor(a) {
    E4(a), v1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: s, onComplete: o, element: c, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new Eu({
      ...h,
      autoplay: !1
    }), v = Math.max(kf, _n.now() - this.startTime), p = xr(0, kf, v - kf), x = m.sample(v).value, { name: g } = this.options;
    c && g && x1(c, g, x), i.setWithVelocity(m.sample(Math.max(0, v - p)).value, x, p), m.stop();
  }
}
const ib = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(aa.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function N4(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let i = 0; i < n.length; i++)
    if (n[i] !== a)
      return !0;
}
function T4(n, a, i, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], h = ib(o, a), m = ib(c, a);
  return Rs(h === m, `You are trying to animate ${a} from "${o}" to "${c}". "${h ? c : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : N4(n) || (i === "spring" || j1(i)) && s;
}
function sh(n) {
  n.duration = 0, n.type = "keyframes";
}
const C1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), C4 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function R4(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && C4.test(n[a]))
      return !0;
  return !1;
}
const M4 = /* @__PURE__ */ new Set([
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
]), A4 = /* @__PURE__ */ Xx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _4(n) {
  const { motionValue: a, name: i, repeatDelay: s, repeatType: o, damping: c, type: h, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: x } = a.owner.getProps();
  return A4() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (C1.has(i) || M4.has(i) && R4(m)) && (i !== "transform" || !x) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && c !== 0 && h !== "inertia";
}
const D4 = 40;
class z4 extends Fh {
  constructor({ autoplay: a = !0, delay: i = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: h = "loop", keyframes: m, name: v, motionValue: p, element: x, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = _n.now();
    const S = {
      autoplay: a,
      delay: i,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: h,
      name: v,
      motionValue: p,
      element: x,
      ...g
    }, E = x?.KeyframeResolver || Yh;
    this.keyframeResolver = new E(m, (w, N, R) => this.onKeyframesResolved(w, N, S, !R), v, p, x), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: h, velocity: m, delay: v, isHandoff: p, onUpdate: x } = s;
    this.resolvedAt = _n.now();
    let g = !0;
    T4(a, c, h, m) || (g = !1, (Sr.instantAnimations || !v) && x?.(Uu(a, s, i)), a[0] = a[a.length - 1], sh(s), s.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > D4 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...s,
      keyframes: a
    }, w = g && !p && _4(E), N = E.motionValue?.owner?.current;
    let R;
    if (w)
      try {
        R = new j4({
          ...E,
          element: N
        });
      } catch {
        R = new Eu(E);
      }
    else
      R = new Eu(E);
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
    return this._animation || (this.keyframeResolver?.resume(), g4()), this._animation;
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
function R1(n, a, i, s = 0, o = 1) {
  const c = Array.from(n).sort((p, x) => p.sortNodePosition(x)).indexOf(a), h = n.size, m = (h - 1) * s;
  return typeof i == "function" ? i(c, h) : o === 1 ? c * s : m - c * s;
}
const O4 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function k4(n) {
  const a = O4.exec(n);
  if (!a)
    return [,];
  const [, i, s, o] = a;
  return [`--${i ?? s}`, o];
}
const L4 = 4;
function M1(n, a, i = 1) {
  Ji(i <= L4, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = k4(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const h = c.trim();
    return Yx(h) ? parseFloat(h) : h;
  }
  return Vh(o) ? M1(o, a, i + 1) : o;
}
const U4 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, B4 = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), V4 = {
  type: "keyframes",
  duration: 0.8
}, $4 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, H4 = (n, { keyframes: a }) => a.length > 2 ? V4 : rl.has(n) ? n.startsWith("scale") ? B4(a[1]) : U4 : $4;
function A1(n, a) {
  if (n?.inherit && a) {
    const { inherit: i, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function _1(n, a) {
  const i = n?.[a] ?? n?.default ?? n;
  return i !== n ? A1(i, n) : i;
}
const q4 = /* @__PURE__ */ new Set([
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
function I4(n) {
  for (const a in n)
    if (!q4.has(a))
      return !0;
  return !1;
}
const F4 = (n, a, i, s = {}, o, c) => (h) => {
  const m = _1(s, n) || {}, v = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ Gn(v);
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
    name: n,
    motionValue: a,
    element: c ? void 0 : o
  };
  I4(m) || Object.assign(x, H4(n, x)), x.duration && (x.duration = /* @__PURE__ */ Gn(x.duration)), x.repeatDelay && (x.repeatDelay = /* @__PURE__ */ Gn(x.repeatDelay)), x.from !== void 0 && (x.keyframes[0] = x.from);
  let g = !1;
  if ((x.type === !1 || x.duration === 0 && !x.repeatDelay) && (sh(x), x.delay === 0 && (g = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (g = !0, sh(x), x.delay = 0), x.allowFlatten = !m.type && !m.ease, g && !c && a.get() !== void 0) {
    const S = Uu(x.keyframes, m);
    if (S !== void 0) {
      Xn.update(() => {
        x.onUpdate(S), x.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Eu(x) : new z4(x);
};
function lb(n) {
  const a = [{}, {}];
  return n?.values.forEach((i, s) => {
    a[0][s] = i.get(), a[1][s] = i.getVelocity();
  }), a;
}
function Gh(n, a, i, s) {
  if (typeof a == "function") {
    const [o, c] = lb(s);
    a = a(i !== void 0 ? i : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = lb(s);
    a = a(i !== void 0 ? i : n.custom, o, c);
  }
  return a;
}
function Zr(n, a, i) {
  const s = n.getProps();
  return Gh(s, a, i !== void 0 ? i : s.custom, n);
}
const D1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...al
]), sb = 30, Y4 = (n) => !isNaN(parseFloat(n));
class G4 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = _n.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = _n.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = Y4(this.current));
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
    this.events[a] || (this.events[a] = new Px());
    const s = this.events[a].add(i);
    return a === "change" ? () => {
      s(), Xn.read(() => {
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
    const a = _n.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > sb)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, sb);
    return Qx(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function ju(n, a) {
  return new G4(n, a);
}
const oh = (n) => Array.isArray(n);
function X4(n, a, i) {
  n.hasValue(a) ? n.getValue(a).set(i) : n.addValue(a, ju(i));
}
function K4(n) {
  return oh(n) ? n[n.length - 1] || 0 : n;
}
function P4(n, a) {
  const i = Zr(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = i || {};
  c = { ...c, ...s };
  for (const h in c) {
    const m = K4(c[h]);
    X4(n, h, m);
  }
}
const sn = (n) => !!(n && n.getVelocity);
function Q4(n) {
  return !!(sn(n) && n.add);
}
function Z4(n, a) {
  const i = n.getValue("willChange");
  if (Q4(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const s = new Sr.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Xh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const J4 = "framerAppearId", z1 = "data-" + Xh(J4);
function W4(n) {
  return n.props[z1];
}
function eO({ protectedKeys: n, needsAnimating: a }, i) {
  const s = n.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, s;
}
function O1(n, a, { delay: i = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: h, ...m } = a;
  const v = n.getDefaultTransition();
  c = c ? A1(c, v) : v;
  const p = c?.reduceMotion;
  s && (c = s);
  const x = [], g = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const E = n.getValue(S, n.latestValues[S] ?? null), w = m[S];
    if (w === void 0 || g && eO(g, S))
      continue;
    const N = {
      delay: i,
      ..._1(c || {}, S)
    }, R = E.get();
    if (R !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === R && !N.velocity) {
      Xn.update(() => E.set(w));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const _ = W4(n);
      if (_) {
        const Z = window.MotionHandoffAnimation(_, S, Xn);
        Z !== null && (N.startTime = Z, T = !0);
      }
    }
    Z4(n, S);
    const L = p ?? n.shouldReduceMotion;
    E.start(F4(S, E, w, L && D1.has(S) ? { type: !1 } : N, n, T));
    const M = E.animation;
    M && x.push(M);
  }
  if (h) {
    const S = () => Xn.update(() => {
      h && P4(n, h);
    });
    x.length ? Promise.all(x).then(S) : S();
  }
  return x;
}
function uh(n, a, i = {}) {
  const s = Zr(n, a, i.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (o = i.transitionOverride);
  const c = s ? () => Promise.all(O1(n, s, i)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (v = 0) => {
    const { delayChildren: p = 0, staggerChildren: x, staggerDirection: g } = o;
    return tO(n, a, v, p, x, g, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [v, p] = m === "beforeChildren" ? [c, h] : [h, c];
    return v().then(() => p());
  } else
    return Promise.all([c(), h(i.delay)]);
}
function tO(n, a, i = 0, s = 0, o = 0, c = 1, h) {
  const m = [];
  for (const v of n.variantChildren)
    v.notify("AnimationStart", a), m.push(uh(v, a, {
      ...h,
      delay: i + (typeof s == "function" ? 0 : s) + R1(n.variantChildren, v, s, o, c)
    }).then(() => v.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function nO(n, a, i = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => uh(n, c, i));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = uh(n, a, i);
  else {
    const o = typeof a == "function" ? Zr(n, a, i.custom) : a;
    s = Promise.all(O1(n, o, i));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const aO = {
  test: (n) => n === "auto",
  parse: (n) => n
}, k1 = (n) => (a) => a.test(n), L1 = [nl, we, Pi, mr, N5, j5, aO], ob = (n) => L1.find(k1(n));
function rO(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Gx(n) : !0;
}
const iO = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function lO(n) {
  const [a, i] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = i.match($h) || [];
  if (!s)
    return n;
  const o = i.replace(s, "");
  let c = iO.has(a) ? 1 : 0;
  return s !== i && (c *= 100), a + "(" + c + o + ")";
}
const sO = /\b([a-z-]*)\(.*?\)/gu, ch = {
  ...aa,
  getAnimatableNone: (n) => {
    const a = n.match(sO);
    return a ? a.map(lO).join(" ") : n;
  }
}, dh = {
  ...aa,
  getAnimatableNone: (n) => {
    const a = aa.parse(n);
    return aa.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, ub = {
  ...nl,
  transform: Math.round
}, oO = {
  rotate: mr,
  rotateX: mr,
  rotateY: mr,
  rotateZ: mr,
  scale: nu,
  scaleX: nu,
  scaleY: nu,
  scaleZ: nu,
  skew: mr,
  skewX: mr,
  skewY: mr,
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
  originX: P0,
  originY: P0,
  originZ: we
}, Kh = {
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
  ...oO,
  zIndex: ub,
  // SVG
  fillOpacity: bs,
  strokeOpacity: bs,
  numOctaves: ub
}, uO = {
  ...Kh,
  // Color props
  color: kt,
  backgroundColor: kt,
  outlineColor: kt,
  fill: kt,
  stroke: kt,
  // Border props
  borderColor: kt,
  borderTopColor: kt,
  borderRightColor: kt,
  borderBottomColor: kt,
  borderLeftColor: kt,
  filter: ch,
  WebkitFilter: ch,
  mask: dh,
  WebkitMask: dh
}, U1 = (n) => uO[n], cO = /* @__PURE__ */ new Set([ch, dh]);
function B1(n, a) {
  let i = U1(n);
  return cO.has(i) || (i = aa), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const dO = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function fO(n, a, i) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !dO.has(c) && Wi(c).values.length && (o = n[s]), s++;
  }
  if (o && i)
    for (const c of a)
      n[c] = B1(i, o);
}
class hO extends Yh {
  constructor(a, i, s, o, c) {
    super(a, i, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: s } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let x = 0; x < a.length; x++) {
      let g = a[x];
      if (typeof g == "string" && (g = g.trim(), Vh(g))) {
        const S = M1(g, i.current);
        S !== void 0 && (a[x] = S), x === a.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !D1.has(s) || a.length !== 2)
      return;
    const [o, c] = a, h = ob(o), m = ob(c), v = K0(o), p = K0(c);
    if (v !== p && yr[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (ab(h) && ab(m))
        for (let x = 0; x < a.length; x++) {
          const g = a[x];
          typeof g == "string" && (a[x] = parseFloat(g));
        }
      else yr[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || rO(a[o])) && s.push(o);
    s.length && fO(a, s, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = yr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, h = s[c];
    s[c] = yr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, v]) => {
      a.getValue(m).set(v);
    }), this.resolveNoneKeyframes();
  }
}
function mO(n, a, i) {
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
const V1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function hu(n) {
  return i5(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: pO } = /* @__PURE__ */ l1(queueMicrotask, !1), gO = {
  y: !1
};
function vO() {
  return gO.y;
}
function $1(n, a) {
  const i = mO(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [i, o, () => s.abort()];
}
function yO(n) {
  return !(n.pointerType === "touch" || vO());
}
function bO(n, a, i = {}) {
  const [s, o, c] = $1(n, i);
  return s.forEach((h) => {
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
      if (!yO(R))
        return;
      v = !1;
      const T = a(h, R);
      typeof T == "function" && (p = T, h.addEventListener("pointerleave", w, o));
    };
    h.addEventListener("pointerenter", N, o), h.addEventListener("pointerdown", E, o);
  }), c;
}
const H1 = (n, a) => a ? n === a ? !0 : H1(n, a.parentElement) : !1, xO = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, SO = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function wO(n) {
  return SO.has(n.tagName) || n.isContentEditable === !0;
}
const mu = /* @__PURE__ */ new WeakSet();
function cb(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function Lf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const EO = (n, a) => {
  const i = n.currentTarget;
  if (!i)
    return;
  const s = cb(() => {
    if (mu.has(i))
      return;
    Lf(i, "down");
    const o = cb(() => {
      Lf(i, "up");
    }), c = () => Lf(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", c, a);
  });
  i.addEventListener("keydown", s, a), i.addEventListener("blur", () => i.removeEventListener("keydown", s), a);
};
function db(n) {
  return xO(n) && !0;
}
const fb = /* @__PURE__ */ new WeakSet();
function jO(n, a, i = {}) {
  const [s, o, c] = $1(n, i), h = (m) => {
    const v = m.currentTarget;
    if (!db(m) || fb.has(m))
      return;
    mu.add(v), i.stopPropagation && fb.add(m);
    const p = a(v, m), x = (E, w) => {
      window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", S), mu.has(v) && mu.delete(v), db(E) && typeof p == "function" && p(E, { success: w });
    }, g = (E) => {
      x(E, v === window || v === document || i.useGlobalTarget || H1(v, E.target));
    }, S = (E) => {
      x(E, !1);
    };
    window.addEventListener("pointerup", g, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), hu(m) && (m.addEventListener("focus", (p) => EO(p, o)), !wO(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), c;
}
const NO = [...L1, kt, aa], TO = (n) => NO.find(k1(n)), hb = () => ({ min: 0, max: 0 }), q1 = () => ({
  x: hb(),
  y: hb()
}), CO = /* @__PURE__ */ new WeakMap();
function Bu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function xs(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Ph = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Qh = ["initial", ...Ph];
function Vu(n) {
  return Bu(n.animate) || Qh.some((a) => xs(n[a]));
}
function I1(n) {
  return !!(Vu(n) || n.variants);
}
function RO(n, a, i) {
  for (const s in a) {
    const o = a[s], c = i[s];
    if (sn(o))
      n.addValue(s, o);
    else if (sn(c))
      n.addValue(s, ju(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, ju(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in i)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const fh = { current: null }, F1 = { current: !1 }, MO = typeof window < "u";
function AO() {
  if (F1.current = !0, !!MO)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => fh.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      fh.current = !1;
}
const mb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Nu = {};
function Y1(n) {
  Nu = n;
}
function _O() {
  return Nu;
}
class DO {
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
  constructor({ parent: a, props: i, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: h, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Yh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = _n.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Xn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: x } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = x, this.parent = a, this.props = i, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = Vu(i), this.isVariantNode = I1(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: g, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const E in S) {
      const w = S[E];
      p[E] !== void 0 && sn(w) && w.set(p[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, CO.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, s) => this.bindToMotionValue(s, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (F1.current || AO(), this.shouldReduceMotion = fh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Pf(this.notifyUpdate), Pf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && C1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: v, ease: p, duration: x } = i.accelerate, g = new N1({
        element: this.current,
        name: a,
        keyframes: m,
        times: v,
        ease: p,
        duration: /* @__PURE__ */ Gn(x)
      }), S = h(g);
      this.valueSubscriptions.set(a, () => {
        S(), g.cancel();
      });
      return;
    }
    const s = rl.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Xn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), c && c(), i.owner && i.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in Nu) {
      const i = Nu[a];
      if (!i)
        continue;
      const { isEnabled: s, Feature: o } = i;
      if (!this.features[a] && o && s(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const c = this.features[a];
        c.isMounted ? c.update() : (c.mount(), c.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : q1();
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
    for (let s = 0; s < mb.length; s++) {
      const o = mb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, h = a[c];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = RO(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && i !== void 0 && (s = ju(i === null ? void 0 : i, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Yx(s) || Gx(s)) ? s = parseFloat(s) : !TO(s) && aa.test(i) && (s = B1(a, i)), this.setBaseTarget(a, sn(s) ? s.get() : s)), sn(s) ? s.get() : s;
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
      const c = Gh(this.props, i, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !sn(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new Px()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    pO.render(this.render);
  }
}
class G1 extends DO {
  constructor() {
    super(...arguments), this.KeyframeResolver = hO;
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
    sn(a) && (this.childSubscription = a.on("change", (i) => {
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
function zO({ top: n, left: a, right: i, bottom: s }) {
  return {
    x: { min: a, max: i },
    y: { min: n, max: s }
  };
}
function OO(n, a) {
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
function kO(n, a) {
  return zO(OO(n.getBoundingClientRect(), a));
}
const LO = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, UO = al.length;
function BO(n, a, i) {
  let s = "", o = !0;
  for (let c = 0; c < UO; c++) {
    const h = al[c], m = n[h];
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
      const p = V1(m, Kh[h]);
      if (!v) {
        o = !1;
        const x = LO[h] || h;
        s += `${x}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return s = s.trim(), i ? s = i(a, o ? "" : s) : o && (s = "none"), s;
}
function Zh(n, a, i) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let h = !1, m = !1;
  for (const v in a) {
    const p = a[v];
    if (rl.has(v)) {
      h = !0;
      continue;
    } else if (o1(v)) {
      o[v] = p;
      continue;
    } else {
      const x = V1(p, Kh[v]);
      v.startsWith("origin") ? (m = !0, c[v] = x) : s[v] = x;
    }
  }
  if (a.transform || (h || i ? s.transform = BO(a, n.transform, i) : s.transform && (s.transform = "none")), m) {
    const { originX: v = "50%", originY: p = "50%", originZ: x = 0 } = c;
    s.transformOrigin = `${v} ${p} ${x}`;
  }
}
function X1(n, { style: a, vars: i }, s, o) {
  const c = n.style;
  let h;
  for (h in a)
    c[h] = a[h];
  o?.applyProjectionStyles(c, s);
  for (h in i)
    c.setProperty(h, i[h]);
}
function pb(n, a) {
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
    const i = pb(n, a.target.x), s = pb(n, a.target.y);
    return `${i}% ${s}%`;
  }
}, VO = {
  correct: (n, { treeScale: a, projectionDelta: i }) => {
    const s = n, o = aa.parse(n);
    if (o.length > 5)
      return s;
    const c = aa.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, v = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= v;
    const p = _s(m, v, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), c(o);
  }
}, $O = {
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
  boxShadow: VO
};
function K1(n, { layout: a, layoutId: i }) {
  return rl.has(n) || n.startsWith("origin") || (a || i !== void 0) && (!!$O[n] || n === "opacity");
}
function Jh(n, a, i) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const h in s)
    (sn(s[h]) || o && sn(o[h]) || K1(h, n) || i?.getValue(h)?.liveStyle !== void 0) && (c[h] = s[h]);
  return c;
}
function HO(n) {
  return window.getComputedStyle(n);
}
class qO extends G1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = X1;
  }
  readValueFromInstance(a, i) {
    if (rl.has(i))
      return this.projection?.isProjecting ? nh(i) : d4(a, i);
    {
      const s = HO(a), o = (o1(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return kO(a, i);
  }
  build(a, i, s) {
    Zh(a, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return Jh(a, i, s);
  }
}
const IO = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, FO = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function YO(n, a, i = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? IO : FO;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${i}`;
}
const GO = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function P1(n, {
  attrX: a,
  attrY: i,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, v, p, x) {
  if (Zh(n, m, p), v) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: g, style: S } = n;
  g.transform && (S.transform = g.transform, delete g.transform), (S.transform || g.transformOrigin) && (S.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), S.transform && (S.transformBox = x?.transformBox ?? "fill-box", delete g.transformBox);
  for (const E of GO)
    g[E] !== void 0 && (S[E] = g[E], delete g[E]);
  a !== void 0 && (g.x = a), i !== void 0 && (g.y = i), s !== void 0 && (g.scale = s), o !== void 0 && YO(g, o, c, h, !1);
}
const Q1 = /* @__PURE__ */ new Set([
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
]), Z1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function XO(n, a, i, s) {
  X1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(Q1.has(o) ? o : Xh(o), a.attrs[o]);
}
function J1(n, a, i) {
  const s = Jh(n, a, i);
  for (const o in n)
    if (sn(n[o]) || sn(a[o])) {
      const c = al.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class KO extends G1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = q1;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (rl.has(i)) {
      const s = U1(i);
      return s && s.default || 0;
    }
    return i = Q1.has(i) ? i : Xh(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return J1(a, i, s);
  }
  build(a, i, s) {
    P1(a, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, i, s, o) {
    XO(a, i, s, o);
  }
  mount(a) {
    this.isSVGTag = Z1(a.tagName), super.mount(a);
  }
}
const PO = Qh.length;
function W1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const i = n.parent ? W1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (i.initial = n.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < PO; i++) {
    const s = Qh[i], o = n.props[s];
    (xs(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function eS(n, a) {
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
const QO = [...Ph].reverse(), ZO = Ph.length;
function JO(n) {
  return (a) => Promise.all(a.map(({ animation: i, options: s }) => nO(n, i, s)));
}
function WO(n) {
  let a = JO(n), i = gb(), s = !0, o = !1;
  const c = (p) => (x, g) => {
    const S = Zr(n, g, p === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: w, ...N } = S;
      x = { ...x, ...N, ...w };
    }
    return x;
  };
  function h(p) {
    a = p(n);
  }
  function m(p) {
    const { props: x } = n, g = W1(n.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let w = {}, N = 1 / 0;
    for (let T = 0; T < ZO; T++) {
      const L = QO[T], M = i[L], _ = x[L] !== void 0 ? x[L] : g[L], Z = xs(_), te = L === p ? M.isActive : null;
      te === !1 && (N = T);
      let ne = _ === g[L] && _ !== x[L] && Z;
      if (ne && (s || o) && n.manuallyAnimateOnMount && (ne = !1), M.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !M.isActive && te === null || // If we didn't and don't have any defined prop for this animation type
      !_ && !M.prevProp || // Or if the prop doesn't define an animation
      Bu(_) || typeof _ == "boolean")
        continue;
      if (L === "exit" && M.isActive && te !== !0) {
        M.prevResolvedValues && (w = {
          ...w,
          ...M.prevResolvedValues
        });
        continue;
      }
      const D = ek(M.prevProp, _);
      let H = D || // If we're making this variant active, we want to always make it active
      L === p && M.isActive && !ne && Z || // If we removed a higher-priority variant (i is in reverse order)
      T > N && Z, q = !1;
      const oe = Array.isArray(_) ? _ : [_];
      let I = oe.reduce(c(L), {});
      te === !1 && (I = {});
      const { prevResolvedValues: Y = {} } = M, se = {
        ...Y,
        ...I
      }, J = (B) => {
        H = !0, E.has(B) && (q = !0, E.delete(B)), M.needsAnimating[B] = !0;
        const P = n.getValue(B);
        P && (P.liveStyle = !1);
      };
      for (const B in se) {
        const P = I[B], re = Y[B];
        if (w.hasOwnProperty(B))
          continue;
        let A = !1;
        oh(P) && oh(re) ? A = !eS(P, re) : A = P !== re, A ? P != null ? J(B) : E.add(B) : P !== void 0 && E.has(B) ? J(B) : M.protectedKeys[B] = !0;
      }
      M.prevProp = _, M.prevResolvedValues = I, M.isActive && (w = { ...w, ...I }), (s || o) && n.blockInitialAnimation && (H = !1);
      const O = ne && D;
      H && (!O || q) && S.push(...oe.map((B) => {
        const P = { type: L };
        if (typeof B == "string" && (s || o) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: re } = n, A = Zr(re, B);
          if (re.enteringChildren && A) {
            const { delayChildren: Q } = A.transition || {};
            P.delay = R1(re.enteringChildren, n, Q);
          }
        }
        return {
          animation: B,
          options: P
        };
      }));
    }
    if (E.size) {
      const T = {};
      if (typeof x.initial != "boolean") {
        const L = Zr(n, Array.isArray(x.initial) ? x.initial[0] : x.initial);
        L && L.transition && (T.transition = L.transition);
      }
      E.forEach((L) => {
        const M = n.getBaseTarget(L), _ = n.getValue(L);
        _ && (_.liveStyle = !0), T[L] = M ?? null;
      }), S.push({ animation: T });
    }
    let R = !!S.length;
    return s && (x.initial === !1 || x.initial === x.animate) && !n.manuallyAnimateOnMount && (R = !1), s = !1, o = !1, R ? a(S) : Promise.resolve();
  }
  function v(p, x) {
    if (i[p].isActive === x)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(p, x)), i[p].isActive = x;
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
      i = gb(), o = !0;
    }
  };
}
function ek(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !eS(a, n) : !1;
}
function Fr(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function gb() {
  return {
    animate: Fr(!0),
    whileInView: Fr(),
    whileHover: Fr(),
    whileTap: Fr(),
    whileDrag: Fr(),
    whileFocus: Fr(),
    exit: Fr()
  };
}
function vb(n, a, i, s = { passive: !0 }) {
  return n.addEventListener(a, i, s), () => n.removeEventListener(a, i);
}
function tk(n) {
  return sn(n) ? n.get() : n;
}
const Wh = b.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function yb(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function nk(...n) {
  return (a) => {
    let i = !1;
    const s = n.map((o) => {
      const c = yb(o, a);
      return !i && typeof c == "function" && (i = !0), c;
    });
    if (i)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : yb(n[o], null);
        }
      };
  };
}
function ak(...n) {
  return b.useCallback(nk(...n), n);
}
class rk extends b.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (hu(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = i.offsetParent, o = hu(s) && s.offsetWidth || 0, c = hu(s) && s.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = c - m.height - m.top;
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
function ik({ children: n, isPresent: a, anchorX: i, anchorY: s, root: o, pop: c }) {
  const h = b.useId(), m = b.useRef(null), v = b.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = b.useContext(Wh), x = n.props?.ref ?? n?.ref, g = ak(m, x);
  return b.useInsertionEffect(() => {
    const { width: S, height: E, top: w, left: N, right: R, bottom: T } = v.current;
    if (a || c === !1 || !m.current || !S || !E)
      return;
    const L = i === "left" ? `left: ${N}` : `right: ${R}`, M = s === "bottom" ? `bottom: ${T}` : `top: ${w}`;
    m.current.dataset.motionPopId = h;
    const _ = document.createElement("style");
    p && (_.nonce = p);
    const Z = o ?? document.head;
    return Z.appendChild(_), _.sheet && _.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${L}px !important;
            ${M}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), Z.contains(_) && Z.removeChild(_);
    };
  }, [a]), d.jsx(rk, { isPresent: a, childRef: m, sizeRef: v, pop: c, children: c === !1 ? n : b.cloneElement(n, { ref: g }) });
}
const lk = ({ children: n, initial: a, isPresent: i, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: h, anchorX: m, anchorY: v, root: p }) => {
  const x = Lh(sk), g = b.useId();
  let S = !0, E = b.useMemo(() => (S = !1, {
    id: g,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (w) => {
      x.set(w, !0);
      for (const N of x.values())
        if (!N)
          return;
      s && s();
    },
    register: (w) => (x.set(w, !1), () => x.delete(w))
  }), [i, x, s]);
  return c && S && (E = { ...E }), b.useMemo(() => {
    x.forEach((w, N) => x.set(N, !1));
  }, [i]), b.useEffect(() => {
    !i && !x.size && s && s();
  }, [i]), n = d.jsx(ik, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: v, root: p, children: n }), d.jsx(ku.Provider, { value: E, children: n });
};
function sk() {
  return /* @__PURE__ */ new Map();
}
function ok(n = !0) {
  const a = b.useContext(ku);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: s, register: o } = a, c = b.useId();
  b.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const h = b.useCallback(() => n && s && s(c), [c, s, n]);
  return !i && s ? [!1, h] : [!0];
}
const au = (n) => n.key || "";
function bb(n) {
  const a = [];
  return b.Children.forEach(n, (i) => {
    b.isValidElement(i) && a.push(i);
  }), a;
}
const uk = ({ children: n, custom: a, initial: i = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: h = !1, anchorX: m = "left", anchorY: v = "top", root: p }) => {
  const [x, g] = ok(h), S = b.useMemo(() => bb(n), [n]), E = h && !x ? [] : S.map(au), w = b.useRef(!0), N = b.useRef(S), R = Lh(() => /* @__PURE__ */ new Map()), T = b.useRef(/* @__PURE__ */ new Set()), [L, M] = b.useState(S), [_, Z] = b.useState(S);
  Fx(() => {
    w.current = !1, N.current = S;
    for (let D = 0; D < _.length; D++) {
      const H = au(_[D]);
      E.includes(H) ? (R.delete(H), T.current.delete(H)) : R.get(H) !== !0 && R.set(H, !1);
    }
  }, [_, E.length, E.join("-")]);
  const te = [];
  if (S !== L) {
    let D = [...S];
    for (let H = 0; H < _.length; H++) {
      const q = _[H], oe = au(q);
      E.includes(oe) || (D.splice(H, 0, q), te.push(q));
    }
    return c === "wait" && te.length && (D = te), Z(bb(D)), M(S), null;
  }
  const { forceRender: ne } = b.useContext(Ix);
  return d.jsx(d.Fragment, { children: _.map((D) => {
    const H = au(D), q = h && !x ? !1 : S === _ || E.includes(H), oe = () => {
      if (T.current.has(H))
        return;
      if (R.has(H))
        T.current.add(H), R.set(H, !0);
      else
        return;
      let I = !0;
      R.forEach((Y) => {
        Y || (I = !1);
      }), I && (ne?.(), Z(N.current), h && g?.(), s && s());
    };
    return d.jsx(lk, { isPresent: q, initial: !w.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: p, onExitComplete: q ? void 0 : oe, anchorX: m, anchorY: v, children: D }, H);
  }) });
}, em = b.createContext({ strict: !1 }), xb = {
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
let Sb = !1;
function ck() {
  if (Sb)
    return;
  const n = {};
  for (const a in xb)
    n[a] = {
      isEnabled: (i) => xb[a].some((s) => !!i[s])
    };
  Y1(n), Sb = !0;
}
function tS() {
  return ck(), _O();
}
function hh(n) {
  const a = tS();
  for (const i in n)
    a[i] = {
      ...a[i],
      ...n[i]
    };
  Y1(a);
}
function nS({ children: n, features: a, strict: i = !1 }) {
  const [, s] = b.useState(!Uf(a)), o = b.useRef(void 0);
  if (!Uf(a)) {
    const { renderer: c, ...h } = a;
    o.current = c, hh(h);
  }
  return b.useEffect(() => {
    Uf(a) && a().then(({ renderer: c, ...h }) => {
      hh(h), o.current = c, s(!0);
    });
  }, []), d.jsx(em.Provider, { value: { renderer: o.current, strict: i }, children: n });
}
function Uf(n) {
  return typeof n == "function";
}
const dk = /* @__PURE__ */ new Set([
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
function Tu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || dk.has(n);
}
let aS = (n) => !Tu(n);
function fk(n) {
  typeof n == "function" && (aS = (a) => a.startsWith("on") ? !Tu(a) : n(a));
}
try {
  fk(require("@emotion/is-prop-valid").default);
} catch {
}
function hk(n, a, i) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || sn(n[o]) || (aS(o) || i === !0 && Tu(o) || !a && !Tu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const $u = /* @__PURE__ */ b.createContext({});
function mk(n, a) {
  if (Vu(n)) {
    const { initial: i, animate: s } = n;
    return {
      initial: i === !1 || xs(i) ? i : void 0,
      animate: xs(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function pk(n) {
  const { initial: a, animate: i } = mk(n, b.useContext($u));
  return b.useMemo(() => ({ initial: a, animate: i }), [wb(a), wb(i)]);
}
function wb(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const tm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function rS(n, a, i) {
  for (const s in a)
    !sn(a[s]) && !K1(s, i) && (n[s] = a[s]);
}
function gk({ transformTemplate: n }, a) {
  return b.useMemo(() => {
    const i = tm();
    return Zh(i, a, n), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function vk(n, a) {
  const i = n.style || {}, s = {};
  return rS(s, i, n), Object.assign(s, gk(n, a)), s;
}
function yk(n, a) {
  const i = {}, s = vk(n, a);
  return n.drag && n.dragListener !== !1 && (i.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (i.tabIndex = 0), i.style = s, i;
}
const iS = () => ({
  ...tm(),
  attrs: {}
});
function bk(n, a, i, s) {
  const o = b.useMemo(() => {
    const c = iS();
    return P1(c, a, Z1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    rS(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const xk = [
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
function nm(n) {
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
      !!(xk.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function Sk(n, a, i, { latestValues: s }, o, c = !1, h) {
  const v = (h ?? nm(n) ? bk : yk)(a, s, o, n), p = hk(a, typeof n == "string", c), x = n !== b.Fragment ? { ...p, ...v, ref: i } : {}, { children: g } = a, S = b.useMemo(() => sn(g) ? g.get() : g, [g]);
  return b.createElement(n, {
    ...x,
    children: S
  });
}
function wk({ scrapeMotionValuesFromProps: n, createRenderState: a }, i, s, o) {
  return {
    latestValues: Ek(i, s, o, n),
    renderState: a()
  };
}
function Ek(n, a, i, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = tk(c[S]);
  let { initial: h, animate: m } = n;
  const v = Vu(n), p = I1(n);
  a && p && !v && n.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let x = i ? i.initial === !1 : !1;
  x = x || h === !1;
  const g = x ? m : h;
  if (g && typeof g != "boolean" && !Bu(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let E = 0; E < S.length; E++) {
      const w = Gh(n, S[E]);
      if (w) {
        const { transitionEnd: N, transition: R, ...T } = w;
        for (const L in T) {
          let M = T[L];
          if (Array.isArray(M)) {
            const _ = x ? M.length - 1 : 0;
            M = M[_];
          }
          M !== null && (o[L] = M);
        }
        for (const L in N)
          o[L] = N[L];
      }
    }
  }
  return o;
}
const lS = (n) => (a, i) => {
  const s = b.useContext($u), o = b.useContext(ku), c = () => wk(n, a, s, o);
  return i ? c() : Lh(c);
}, jk = /* @__PURE__ */ lS({
  scrapeMotionValuesFromProps: Jh,
  createRenderState: tm
}), Nk = /* @__PURE__ */ lS({
  scrapeMotionValuesFromProps: J1,
  createRenderState: iS
}), Tk = Symbol.for("motionComponentSymbol");
function Ck(n, a, i) {
  const s = b.useRef(i);
  b.useInsertionEffect(() => {
    s.current = i;
  });
  const o = b.useRef(null);
  return b.useCallback((c) => {
    c && n.onMount?.(c);
    const h = s.current;
    if (typeof h == "function")
      if (c) {
        const m = h(c);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(c);
    else h && (h.current = c);
    a && (c ? a.mount(c) : a.unmount());
  }, [a]);
}
const Rk = b.createContext({});
function Mk(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function Ak(n, a, i, s, o, c) {
  const { visualElement: h } = b.useContext($u), m = b.useContext(em), v = b.useContext(ku), p = b.useContext(Wh), x = p.reducedMotion, g = p.skipAnimations, S = b.useRef(null), E = b.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: x,
    skipAnimations: g,
    isSVG: c
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, N = b.useContext(Rk);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && _k(S.current, i, o, N);
  const R = b.useRef(!1);
  b.useInsertionEffect(() => {
    w && R.current && w.update(i, v);
  });
  const T = i[z1], L = b.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return Fx(() => {
    E.current = !0, w && (R.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), L.current && w.animationState && w.animationState.animateChanges());
  }), b.useEffect(() => {
    w && (!L.current && w.animationState && w.animationState.animateChanges(), L.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), L.current = !1), w.enteringChildren = void 0);
  }), w;
}
function _k(n, a, i, s) {
  const { layoutId: o, layout: c, drag: h, dragConstraints: m, layoutScroll: v, layoutRoot: p, layoutAnchor: x, layoutCrossfade: g } = a;
  n.projection = new i(n.latestValues, a["data-framer-portal-id"] ? void 0 : sS(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!h || m && Mk(m),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof c == "string" ? c : "both",
    initialPromotionConfig: s,
    crossfade: g,
    layoutScroll: v,
    layoutRoot: p,
    layoutAnchor: x
  });
}
function sS(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : sS(n.parent);
}
function Bf(n, { forwardMotionProps: a = !1, type: i } = {}, s, o) {
  s && hh(s);
  const c = i ? i === "svg" : nm(n), h = c ? Nk : jk;
  function m(p, x) {
    let g;
    const S = {
      ...b.useContext(Wh),
      ...p,
      layoutId: Dk(p)
    }, { isStatic: E } = S, w = pk(p), N = h(p, E);
    if (!E && typeof window < "u") {
      zk();
      const R = Ok(S);
      g = R.MeasureLayout, w.visualElement = Ak(n, N, S, o, R.ProjectionNode, c);
    }
    return d.jsxs($u.Provider, { value: w, children: [g && w.visualElement ? d.jsx(g, { visualElement: w.visualElement, ...S }) : null, Sk(n, p, Ck(N, w.visualElement, x), N, E, a, c)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const v = b.forwardRef(m);
  return v[Tk] = n, v;
}
function Dk({ layoutId: n }) {
  const a = b.useContext(Ix).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function zk(n, a) {
  b.useContext(em).strict;
}
function Ok(n) {
  const a = tS(), { drag: i, layout: s } = a;
  if (!i && !s)
    return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function kk(n, a) {
  if (typeof Proxy > "u")
    return Bf;
  const i = /* @__PURE__ */ new Map(), s = (c, h) => Bf(c, h, n, a), o = (c, h) => s(c, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, h) => h === "create" ? s : (i.has(h) || i.set(h, Bf(h, void 0, n, a)), i.get(h))
  });
}
const oS = /* @__PURE__ */ kk(), Lk = (n, a) => a.isSVG ?? nm(n) ? new KO(a) : new qO(a, {
  allowProjection: n !== b.Fragment
});
class Uk extends il {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = WO(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Bu(a) && (this.unmountControls = a.subscribe(this.node));
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
let Bk = 0;
class Vk extends il {
  constructor() {
    super(...arguments), this.id = Bk++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: h } = this.node.getProps();
        if (typeof c == "string") {
          const m = Zr(this.node, c, h);
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
const $k = {
  animation: {
    Feature: Uk
  },
  exit: {
    Feature: Vk
  }
};
function uS(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function Eb(n, a, i) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, c = s[o];
  c && Xn.postRender(() => c(a, uS(a)));
}
class Hk extends il {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = bO(a, (i, s) => (Eb(this.node, s, "Start"), (o) => Eb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class qk extends il {
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
    this.unmount = Lu(vb(this.node.current, "focus", () => this.onFocus()), vb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function jb(n, a, i) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), c = s[o];
  c && Xn.postRender(() => c(a, uS(a)));
}
class Ik extends il {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = jO(a, (o, c) => (jb(this.node, c, "Start"), (h, { success: m }) => jb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const mh = /* @__PURE__ */ new WeakMap(), Vf = /* @__PURE__ */ new WeakMap(), Fk = (n) => {
  const a = mh.get(n.target);
  a && a(n);
}, Yk = (n) => {
  n.forEach(Fk);
};
function Gk({ root: n, ...a }) {
  const i = n || document;
  Vf.has(i) || Vf.set(i, {});
  const s = Vf.get(i), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(Yk, { root: n, ...a })), s[o];
}
function Xk(n, a, i) {
  const s = Gk(a);
  return mh.set(n, i), s.observe(n), () => {
    mh.delete(n), s.unobserve(n);
  };
}
const Kk = {
  some: 0,
  all: 1
};
class Pk extends il {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: s, amount: o = "some", once: c } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : Kk[o]
    }, m = (v) => {
      const { isIntersecting: p } = v;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: x, onViewportLeave: g } = this.node.getProps(), S = p ? x : g;
      S && S(v);
    };
    this.stopObserver = Xk(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(Qk(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function Qk({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (i) => n[i] !== a[i];
}
const Zk = {
  inView: {
    Feature: Pk
  },
  tap: {
    Feature: Ik
  },
  focus: {
    Feature: qk
  },
  hover: {
    Feature: Hk
  }
}, cS = {
  renderer: Lk,
  ...$k,
  ...Zk
};
var Jk = "_1oor31e0", Wk = "_1oor31e1", e6 = "_1oor31e2", t6 = "_1oor31e3", n6 = "_1oor31e4", a6 = "_1oor31e5", r6 = "_1oor31e6", i6 = "_1oor31e7", l6 = "_1oor31e8";
const s6 = 8;
function o6(n) {
  const { entries: a, loading: i, error: s } = n;
  return /* @__PURE__ */ d.jsxs("div", { className: Jk, "aria-busy": !!i, children: [
    s && /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: s }),
    i && !s && /* @__PURE__ */ d.jsx("div", { className: l6, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !s && a.length === 0 && /* @__PURE__ */ d.jsx("div", { className: i6, children: "No edits yet" }),
    !i && !s && a.length > 0 && /* @__PURE__ */ d.jsx("ul", { className: Wk, children: a.map((o) => /* @__PURE__ */ d.jsxs("li", { className: e6, children: [
      /* @__PURE__ */ d.jsx("span", { className: t6, children: c6(o.recorded_at) }),
      /* @__PURE__ */ d.jsx("span", { className: n6, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ d.jsx("span", { className: a6, title: o.digest_after, children: u6(o.digest_after) }),
      /* @__PURE__ */ d.jsx("span", { className: r6, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function u6(n) {
  return n ? `${n.slice(0, s6)}…` : "—";
}
function c6(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var Nb = "_1c63kaw0", d6 = "_1c63kaw1", f6 = "_1c63kaw2", h6 = "_1c63kaw3", m6 = "_1c63kaw4", p6 = "_1c63kaw5", g6 = "_1c63kaw6", v6 = "_1c63kaw7";
function y6({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: Nb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ d.jsx("span", { className: d6, children: "No edits yet" }) }) : /* @__PURE__ */ d.jsx("ol", { className: Nb, "data-testid": "edit-chain-list", children: n.ops.map((i, s) => /* @__PURE__ */ d.jsxs("li", { className: f6, children: [
    /* @__PURE__ */ d.jsxs("span", { className: h6, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ d.jsxs("span", { className: m6, children: [
      /* @__PURE__ */ d.jsx("span", { className: p6, children: Tb(i) }),
      /* @__PURE__ */ d.jsx("span", { className: g6, children: b6(i) })
    ] }),
    /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: v6,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Tb(i)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Tb(n) {
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
function b6(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Cb(n.start_ms)} → ${Cb(n.end_ms)}`;
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
      return `${$f(n.low_db)} / ${$f(n.mid_db)} / ${$f(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function $f(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function Cb(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var ru = "_1o3ytop0", x6 = "_1o3ytop1", S6 = "_1o3ytop2", w6 = "_1o3ytop3", E6 = "_1o3ytop4", iu = "_1o3ytop5", j6 = "_1o3ytop6", N6 = "_1o3ytopc", T6 = "_1o3ytopd", C6 = "_1o3ytope", R6 = "_1o3ytopf", M6 = "_1o3ytopg", A6 = "_1o3ytoph";
const Rb = -16;
function _6(n) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: c
  } = n, h = a.durationMs ?? 0, m = b.useMemo(
    () => D6(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [v, p] = b.useState(() => Hf(h)), [x, g] = b.useState(Ou), [S, E] = b.useState(!1), [w, N] = b.useState(null), [R, T] = b.useState(null), [L, M] = b.useState(!1), [_, Z] = b.useState(!1), [te, ne] = b.useState(!1), [D, H] = b.useState(null), [q, oe] = b.useState([]), [I, Y] = b.useState(null), [se, J] = b.useState([]), [O, C] = b.useState(!1), [B, P] = b.useState(null), [re, A] = b.useState(0), Q = b.useRef(null), ee = b.useRef(null), ue = b.useRef(null), fe = b.useRef(null), ve = b.useRef(null), ze = b.useRef(0), _e = b.useMemo(
    () => v.ops.some((ye) => ye.mode === "normalize"),
    [v.ops]
  );
  b.useEffect(() => {
    const ye = Hf(h);
    p(ye), g(_x(ye)), N(null), ne(!1), oe([]), Y(null), ve.current = null;
  }, [a.voiceAssetId, h]);
  const Ve = b.useCallback((ye) => {
    g(ye), p((Oe) => Ax(Oe, ye));
  }, []);
  b.useEffect(() => {
    fe.current?.abort();
    const ye = new AbortController();
    return fe.current = ye, C(!0), P(null), cu(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((Oe) => {
      ye.signal.aborted || J(Oe.entries);
    }).catch((Oe) => {
      if (ye.signal.aborted) return;
      const Pe = Oe instanceof Error ? Oe.message : "audit fetch failed";
      P(Pe);
    }).finally(() => {
      ye.signal.aborted || C(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, re]), b.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), b.useEffect(() => () => {
    ee.current?.abort(), ue.current?.abort(), fe.current?.abort();
  }, []);
  const Ut = v.ops.find((ye) => ye.mode === "trim"), Yt = v.ops.find((ye) => ye.mode === "normalize"), me = Ut?.start_ms ?? 0, Ne = Ut?.end_ms ?? Math.max(1, h), Ce = b.useCallback((ye, Oe) => {
    p(
      (Pe) => Mb(
        Pe,
        "trim",
        (et) => ({
          ...et,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(Oe))
        })
      )
    );
  }, []), Re = b.useCallback(
    (ye) => Ce(ye, Ne),
    [Ne, Ce]
  ), Kt = b.useCallback(
    (ye) => Ce(me, ye),
    [me, Ce]
  ), at = b.useCallback((ye) => {
    p((Oe) => {
      const Pe = Oe.ops.filter((et) => et.mode !== "normalize");
      if (ye) {
        const et = {
          id: bn(),
          mode: "normalize",
          target_lufs: Rb
        };
        return { ...Oe, ops: [...Pe, et] };
      }
      return { ...Oe, ops: Pe };
    });
  }, []), on = b.useCallback(
    (ye) => {
      const Oe = v.ops.findIndex(($t) => $t.id === ye);
      if (Oe === -1) return;
      const Pe = v.ops[Oe];
      if (!Pe) return;
      const et = [...v.ops.slice(0, Oe), ...v.ops.slice(Oe + 1)];
      p({ ...v, ops: et }), oe(($t) => [...$t, { op: Pe, index: Oe }]);
    },
    [v]
  ), Pt = b.useCallback(() => {
    const ye = q[q.length - 1];
    if (!ye) return;
    const Oe = Math.min(ye.index, v.ops.length), Pe = [...v.ops.slice(0, Oe), ye.op, ...v.ops.slice(Oe)];
    p({ ...v, ops: Pe }), oe(q.slice(0, -1));
  }, [v, q]), xn = b.useCallback(() => {
    const ye = bx(v, h);
    return ye ? (N(ye.message), !1) : (N(null), !0);
  }, [v, h]), pa = b.useCallback(async () => {
    if (!xn() || L) return;
    ee.current?.abort();
    const ye = new AbortController();
    ee.current = ye;
    const Oe = ++ze.current;
    Z(!0);
    try {
      const Pe = await cC(a.voiceAssetId, i, v, {
        signal: ye.signal
      });
      if (ye.signal.aborted || Oe !== ze.current) return;
      R && URL.revokeObjectURL(R);
      const et = URL.createObjectURL(Pe);
      T(et), ne(!0), requestAnimationFrame(() => Q.current?.play().catch(() => {
      }));
    } catch (Pe) {
      if (ye.signal.aborted) return;
      const et = Pe instanceof Error ? Pe.message : "preview failed";
      N(et), c(et);
    } finally {
      ye.signal.aborted || Z(!1);
    }
  }, [xn, L, a.voiceAssetId, i, v, R, c]), Bt = b.useCallback(async () => {
    if (!xn() || _ || L) return;
    if (s.length > 1) {
      const Oe = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${Oe}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    ee.current?.abort(), ue.current?.abort();
    const ye = new AbortController();
    ue.current = ye, M(!0);
    try {
      const Oe = ve.current ?? void 0, Pe = await yx(
        a.voiceAssetId,
        i,
        Oe ? { chain: v, digest_before: Oe } : { chain: v },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ve.current = Pe.chain_digest, Y(Pe.chain_digest), N(null), H(Pe.measured_lufs ?? null), oe([]), o(Pe), A((et) => et + 1);
    } catch (Oe) {
      if (ye.signal.aborted) return;
      const Pe = Oe instanceof Qi;
      Oe instanceof Qi && (ve.current = Oe.currentDigest || null);
      const et = Pe ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      N(et), c(et);
    } finally {
      ye.signal.aborted || M(!1);
    }
  }, [
    xn,
    _,
    L,
    s,
    a.voiceAssetId,
    i,
    v,
    o,
    c
  ]), zn = b.useCallback(() => {
    ee.current?.abort(), p(Hf(h)), N(null), H(null), ne(!1), oe([]), A((ye) => ye + 1), R && (URL.revokeObjectURL(R), T(null));
  }, [h, R]), Vt = b.useCallback((ye) => {
    p(
      (Oe) => Mb(
        Oe,
        "normalize",
        (Pe) => ({
          ...Pe,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ d.jsxs($x, { variant: "standalone", children: [
    /* @__PURE__ */ d.jsx(
      Hx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${lu(h)}`
      }
    ),
    /* @__PURE__ */ d.jsx(
      Bx,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: me,
        endMs: Ne,
        onChangeStart: Re,
        onChangeEnd: Kt
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: ru, children: [
      /* @__PURE__ */ d.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ d.jsxs("span", { className: x6, children: [
        lu(me),
        " → ",
        lu(Ne),
        " · ",
        lu(Ne - me)
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: E6, children: [
      /* @__PURE__ */ d.jsxs("div", { className: iu, children: [
        /* @__PURE__ */ d.jsxs("span", { className: ru, children: [
          /* @__PURE__ */ d.jsx("span", { children: "Normalize loudness" }),
          _e && Yt && /* @__PURE__ */ d.jsxs("span", { className: N6, children: [
            "target ",
            Yt.target_lufs.toFixed(1),
            " LUFS",
            D !== null && ` · measured ${D.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: j6, children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: _e,
              onChange: (ye) => at(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { children: [
            "Target ",
            Rb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        _e && Yt && /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            className: C6,
            min: -30,
            max: -6,
            step: 0.5,
            value: Yt.target_lufs,
            onChange: (ye) => Vt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: iu, children: [
        /* @__PURE__ */ d.jsxs("span", { className: ru, children: [
          "Operations · ",
          v.ops.length
        ] }),
        /* @__PURE__ */ d.jsx(y6, { chain: v, onRemoveOp: on })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: iu, children: [
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: S6,
            onClick: () => E((ye) => !ye),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ d.jsx(
          kh,
          {
            state: x,
            onChange: Ve,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      I && /* @__PURE__ */ d.jsx("div", { className: iu, children: /* @__PURE__ */ d.jsxs("span", { className: ru, children: [
        /* @__PURE__ */ d.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ d.jsxs("span", { className: w6, title: I, children: [
          I.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ d.jsxs(qx, { children: [
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "secondary",
          onClick: () => void pa(),
          disabled: _ || L,
          children: _ ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          onClick: () => void Bt(),
          disabled: L || _,
          children: L ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ d.jsx(
        ft,
        {
          variant: "ghost",
          onClick: zn,
          disabled: L || _,
          children: "Reset"
        }
      ),
      q.length > 0 && /* @__PURE__ */ d.jsxs(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: Pt,
          disabled: L || _,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            q.length,
            ")"
          ]
        }
      ),
      te && /* @__PURE__ */ d.jsx(
        "span",
        {
          className: A6,
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
        className: T6,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: w }),
    /* @__PURE__ */ d.jsxs("details", { className: R6, children: [
      /* @__PURE__ */ d.jsxs("summary", { className: M6, children: [
        "Edit history",
        se.length > 0 ? ` · ${se.length}` : ""
      ] }),
      /* @__PURE__ */ d.jsx(
        o6,
        {
          entries: se,
          loading: O,
          error: B
        }
      )
    ] })
  ] });
}
function Hf(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: bn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function Mb(n, a, i) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: bn(), mode: a };
    return { ...n, ops: [...n.ops, i(c)] };
  }
  const o = [...n.ops];
  return o[s] = i(o[s]), { ...n, ops: o };
}
function lu(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function D6(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var z6 = "go9vi12", O6 = "go9vi13", k6 = "go9vi14", L6 = "go9vi15", U6 = "go9vi16", B6 = "go9vi17", V6 = "go9vi18", $6 = "go9vi19", H6 = "go9vi1a go9vi19", q6 = "go9vi1b", I6 = "go9vi1c", F6 = "go9vi1d", Y6 = "go9vi1e", G6 = "go9vi1f", X6 = "go9vi1g", K6 = "go9vi1h", P6 = "go9vi1i", Yr = "go9vi1j", is = "go9vi1k", Xi = "go9vi1l", Q6 = "go9vi1m go9vi1l", Z6 = "go9vi1n", J6 = "go9vi1o go9vi1n", W6 = "go9vi1p go9vi1n", eL = "go9vi1q", tL = "go9vi1r", nL = "go9vi1s", aL = "go9vi1t", dS = "go9vi1u", rL = "go9vi1v", iL = "go9vi1w", lL = "go9vi1x go9vi1l", sL = "go9vi1y", oL = "go9vi1z", uL = "go9vi110", cL = "go9vi111", dL = "go9vi112", fL = "go9vi113";
const hL = ["none", "audio_ref", "vector_preset", "qwen_template"];
function mL() {
  const { deployment: n, mappings: a, voiceAssets: i } = Ts(), [s, o] = b.useState(a), [c, h] = b.useState(i), [m, v] = b.useState(
    a[0]?.mappingId ?? null
  ), [p, x] = b.useState(""), [g, S] = b.useState(null), [E, w] = b.useState(null), [N, R] = b.useState(null), T = b.useMemo(() => {
    const C = /* @__PURE__ */ new Map();
    for (const B of c) C.set(B.voiceAssetId, B);
    return C;
  }, [c]), L = b.useMemo(() => {
    const C = p.trim().toLowerCase();
    return C ? s.filter((B) => B.characterName.toLowerCase().includes(C)) : s;
  }, [s, p]), M = b.useMemo(
    () => s.find((C) => C.mappingId === m) ?? null,
    [s, m]
  );
  b.useEffect(() => {
    o(a), h(i), v(a[0]?.mappingId ?? null);
  }, [a, i]), b.useEffect(() => {
    if (!E) return;
    const C = setTimeout(() => w(null), 2600);
    return () => clearTimeout(C);
  }, [E]);
  const _ = b.useCallback(async () => {
    const C = await ps(n.deploymentId);
    h(C.voiceAssets);
  }, [n.deploymentId]), Z = b.useCallback(
    (C) => {
      o(
        (B) => B.map((P) => P.mappingId === m ? { ...P, ...C } : P)
      );
    },
    [m]
  ), te = b.useCallback(
    async (C) => {
      if (!M) return;
      const B = M;
      try {
        const P = await cs(n.deploymentId, M.mappingId, C);
        o((re) => re.map((A) => A.mappingId === P.mappingId ? P : A));
      } catch (P) {
        o(
          (re) => re.map((A) => A.mappingId === B.mappingId ? B : A)
        ), S(hr(P));
      }
    },
    [M, n.deploymentId]
  ), ne = b.useCallback(async () => {
    const C = c[0];
    if (!C) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = xL(s), P = await _h(n.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: C.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((re) => [...re, P]), v(P.mappingId);
    } catch (B) {
      S(hr(B));
    }
  }, [n.deploymentId, c, s]), D = b.useCallback(() => {
    M && R({ id: M.mappingId, name: M.characterName });
  }, [M]), H = b.useCallback(async () => {
    if (!N) return;
    const { id: C, name: B } = N;
    R(null);
    try {
      await gx(n.deploymentId, C), o((P) => P.filter((re) => re.mappingId !== C)), v(null), w(`Mapping for ${B} deactivated.`);
    } catch (P) {
      S(hr(P));
    }
  }, [n.deploymentId, N]), q = b.useCallback(
    async (C, B, P) => {
      try {
        const re = await vu(n.deploymentId, C, B, P);
        return h((A) => [re, ...A]), w(`${re.displayName} uploaded.`), re;
      } catch (re) {
        return S(hr(re)), null;
      }
    },
    [n.deploymentId]
  ), oe = b.useCallback(async () => {
    try {
      const C = await JN(n.deploymentId);
      TL(C, `${n.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (C) {
      S(hr(C));
    }
  }, [n.deploymentId]), I = b.useCallback(
    async (C, B) => {
      try {
        const P = await WN(
          n.deploymentId,
          C.mappings,
          B
        );
        w(
          `Imported ${P.created.length} • skipped ${P.skipped.length} • replaced ${P.replaced.length}.`
        );
        const re = await ps(n.deploymentId);
        h(re.voiceAssets);
      } catch (P) {
        S(hr(P));
      }
    },
    [n.deploymentId]
  ), Y = b.useCallback(
    async (C) => {
      if (await _(), M && C.chain_digest)
        try {
          const B = await cs(n.deploymentId, M.mappingId, {
            voiceAssetChainDigest: C.chain_digest
          });
          o(
            (P) => P.map((re) => re.mappingId === B.mappingId ? B : re)
          );
        } catch (B) {
          S(hr(B));
        }
      w("Edit applied.");
    },
    [_, M, n.deploymentId]
  ), se = b.useCallback((C) => {
    S(C);
  }, []), J = b.useCallback(
    async (C, B) => {
      if (!M) return null;
      const P = C.trim() || `[${M.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await aT(n.deploymentId, {
          line: P,
          outputFormat: B
        })).runId };
      } catch (re) {
        return S(hr(re)), null;
      }
    },
    [n.deploymentId, M]
  ), O = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ d.jsxs("div", { className: z6, children: [
    /* @__PURE__ */ d.jsxs("aside", { className: O6, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ d.jsxs("header", { className: k6, children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("h1", { id: "mapping-sidebar-heading", className: L6, children: "Cast" }),
          /* @__PURE__ */ d.jsxs("span", { className: U6, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            O
          ] })
        ] }),
        /* @__PURE__ */ d.jsx(ft, { variant: "primary", size: "sm", onClick: ne, children: "+ Add" })
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "search",
          className: B6,
          placeholder: "Search characters",
          value: p,
          onChange: (C) => x(C.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ d.jsx(bL, { onExport: oe, onImport: I, onParseError: S }),
      /* @__PURE__ */ d.jsx("div", { className: V6, children: L.length === 0 ? /* @__PURE__ */ d.jsx(
        Cs,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : L.map((C) => {
        const B = T.get(C.speakerVoiceAssetId), P = C.mappingId === m;
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: P ? H6 : $6,
            onClick: () => v(C.mappingId),
            "aria-pressed": P,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ d.jsx("span", { className: q6, "aria-hidden": "true", children: SL(C.characterName) }),
              /* @__PURE__ */ d.jsxs("span", { className: I6, children: [
                /* @__PURE__ */ d.jsx("span", { className: F6, children: C.characterName }),
                /* @__PURE__ */ d.jsxs("span", { className: Y6, children: [
                  C.defaultEmotionMode,
                  " · ",
                  B?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          C.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: G6, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ d.jsx(nS, { features: cS, children: /* @__PURE__ */ d.jsx(uk, { children: E && /* @__PURE__ */ d.jsx(
        oS.div,
        {
          className: rL,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      g && /* @__PURE__ */ d.jsx(Dn, { severity: "error", children: g }),
      N && /* @__PURE__ */ d.jsxs(Dn, { severity: "warning", children: [
        /* @__PURE__ */ d.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          N.name,
          "?"
        ] }),
        /* @__PURE__ */ d.jsx(ft, { variant: "danger", size: "sm", onClick: () => void H(), children: "Delete" }),
        /* @__PURE__ */ d.jsx(ft, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      M ? /* @__PURE__ */ d.jsx(
        gL,
        {
          deploymentId: n.deploymentId,
          mapping: M,
          voiceAssets: c,
          allMappings: s,
          onNameChange: (C) => {
            Z({ characterName: C });
          },
          onNameBlur: (C) => {
            C !== M.characterName && C.trim() && te({ characterName: C.trim() });
          },
          onSpeakerChange: (C) => {
            Z({ speakerVoiceAssetId: C }), te({ speakerVoiceAssetId: C });
          },
          onModeChange: (C) => {
            Z({ defaultEmotionMode: C }), te({ defaultEmotionMode: C });
          },
          onQwenChange: (C) => {
            Z({ defaultQwenTemplate: C });
          },
          onQwenBlur: (C) => {
            te({ defaultQwenTemplate: C });
          },
          onSpeedChange: (C) => {
            Z({ defaultSpeedFactor: C });
          },
          onSpeedCommit: (C) => {
            te({ defaultSpeedFactor: C });
          },
          onEmotionVoiceChange: (C) => {
            const B = C || null;
            Z({ defaultEmotionVoiceAssetId: B }), te({ defaultEmotionVoiceAssetId: B });
          },
          onDelete: D,
          onUploadVoice: async (C, B, P) => {
            const re = await q(C, B, P);
            return re && P === "speaker" && (Z({ speakerVoiceAssetId: re.voiceAssetId }), te({ speakerVoiceAssetId: re.voiceAssetId })), await _(), re;
          },
          onTestLine: J,
          onEditChainPersisted: Y,
          onEditError: se
        },
        M.mappingId
      ) : /* @__PURE__ */ d.jsx(
        pL,
        {
          voiceCount: c.length,
          onUploadVoice: async (C) => {
            await q(C, C.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function pL({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ d.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ d.jsxs("div", { className: uL, children: [
      /* @__PURE__ */ d.jsx("p", { className: Pr, children: "01 / Onboarding" }),
      /* @__PURE__ */ d.jsx("h2", { id: "onboarding-heading", className: cL, children: "Upload your first voice" }),
      /* @__PURE__ */ d.jsxs("p", { className: dL, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ d.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      fS,
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
function gL(n) {
  const { mapping: a, voiceAssets: i, allMappings: s } = n, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, c = b.useMemo(
    () => s.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [s, a.speakerVoiceAssetId]
  ), h = i.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, v] = b.useState(""), [p, x] = b.useState("mp3"), [g, S] = b.useState("idle"), [E, w] = b.useState(null), N = b.useRef(!1);
  b.useEffect(() => (N.current = !1, () => {
    N.current = !0;
  }), []);
  const R = b.useCallback(async () => {
    N.current = !1, S("running"), w(null);
    const T = await n.onTestLine(m, p);
    if (N.current) return;
    if (!T) {
      S("error"), w("Failed to enqueue test-line run.");
      return;
    }
    const { runId: L } = T;
    for (let M = 0; M < 60; M += 1) {
      if (await new Promise((_) => setTimeout(_, 500)), N.current) return;
      try {
        const _ = await Dh(n.deploymentId, L);
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
  }, [n.onTestLine, n.deploymentId, m, p]);
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("header", { className: X6, children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("p", { className: Pr, children: "Character" }),
        /* @__PURE__ */ d.jsx("h2", { className: K6, children: a.characterName })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: dS, children: /* @__PURE__ */ d.jsx(ft, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ d.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: iL,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              className: lL,
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
              className: Xi,
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
            ft,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: g === "running",
              children: g === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          g === "done" && /* @__PURE__ */ d.jsx(br, { tone: "success", children: "Synthesised — see host logs for output path." }),
          g === "error" && E && /* @__PURE__ */ d.jsx(br, { tone: "danger", children: E })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: P6, children: [
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "identity-heading", className: Pr, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Character name" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              className: Xi,
              value: a.characterName,
              onChange: (T) => n.onNameChange(T.currentTarget.value),
              onBlur: (T) => n.onNameBlur(T.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Emotion mode" }),
          /* @__PURE__ */ d.jsx(
            "select",
            {
              className: Xi,
              value: a.defaultEmotionMode,
              onChange: (T) => n.onModeChange(T.currentTarget.value),
              children: hL.map((T) => /* @__PURE__ */ d.jsx("option", { value: T, children: wL(T) }, T))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Yr, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ d.jsx(
            "textarea",
            {
              className: Q6,
              value: a.defaultQwenTemplate ?? "",
              onChange: (T) => n.onQwenChange(T.currentTarget.value),
              onBlur: (T) => n.onQwenBlur(T.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Emotion reference" }),
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              className: Xi,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (T) => n.onEmotionVoiceChange(T.currentTarget.value),
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
        /* @__PURE__ */ d.jsxs("label", { className: is, children: [
          /* @__PURE__ */ d.jsxs("span", { className: Yr, children: [
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
              onChange: (T) => n.onSpeedChange(Number(T.currentTarget.value)),
              onMouseUp: (T) => n.onSpeedCommit(Number(T.currentTarget.value)),
              onTouchEnd: (T) => n.onSpeedCommit(Number(T.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ d.jsx("h3", { id: "voice-heading", className: Pr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Speaker reference" }),
        /* @__PURE__ */ d.jsx(
          vL,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: n.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ d.jsx(Ab, { voice: o }),
        /* @__PURE__ */ d.jsx(
          fS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => n.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ d.jsx(
          _6,
          {
            voiceAsset: o,
            deploymentId: n.deploymentId,
            affectedCharacterNames: c,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        h && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("span", { className: Yr, children: "Emotion reference voice" }),
          /* @__PURE__ */ d.jsx(Ab, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function vL({
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
function Ab({ voice: n }) {
  const a = EL(n.durationMs ?? null);
  return /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsxs("div", { className: eL, children: [
      /* @__PURE__ */ d.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ d.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ d.jsx("span", { children: jL(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ d.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ d.jsxs("div", { className: tL, children: [
      /* @__PURE__ */ d.jsx("div", { className: nL, children: /* @__PURE__ */ d.jsx(nS, { features: cS, children: /* @__PURE__ */ d.jsx(
        oS.div,
        {
          className: aL,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ d.jsx(br, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ d.jsx(yL, { seed: n.contentSha256 })
  ] });
}
function yL({ seed: n }) {
  const a = b.useMemo(() => NL(n, 48), [n]);
  return /* @__PURE__ */ d.jsx("div", { className: sL, "aria-hidden": "true", children: a.map((i, s) => /* @__PURE__ */ d.jsx(
    "span",
    {
      className: oL,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function fS({
  label: n,
  onFile: a
}) {
  const [i, s] = b.useState(!1), [o, c] = b.useState(!1), h = b.useRef(null), m = b.useCallback(
    async (v) => {
      c(!0);
      try {
        await a(v);
      } finally {
        c(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: o ? W6 : i ? J6 : Z6,
      onDragOver: (v) => {
        v.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (v) => {
        v.preventDefault(), s(!1);
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
        o ? "Uploading…" : n
      ]
    }
  );
}
function bL({
  onExport: n,
  onImport: a,
  onParseError: i
}) {
  const [s, o] = b.useState("error"), c = b.useRef(null);
  return /* @__PURE__ */ d.jsxs("div", { className: dS, children: [
    /* @__PURE__ */ d.jsx(ft, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: fL,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const v = await m.text(), p = JSON.parse(v);
              a(p, s);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ d.jsx(ft, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
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
function xL(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function SL(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function wL(n) {
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
function EL(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function jL(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function NL(n, a) {
  const i = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    i.push((o * 31 + s * 7) % 100 / 100);
  }
  return i;
}
function TL(n, a) {
  const i = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function hr(n) {
  return n instanceof el || n instanceof Error ? n.message : "unknown error";
}
function CL() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await QN();
        return { deployments: n };
      },
      Component: _T
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId");
        return rj(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), [i, { mappings: s }, { runs: o }, c] = await Promise.all([
          jy(a),
          Ny(a),
          eT(a, { limit: 10 }),
          sT(a)
        ]);
        return { deployment: i, mappings: s, runs: o, workflow: c };
      },
      Component: lD
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), i = Hi(n, "runId");
        return { run: await Dh(a, i) };
      },
      Component: wz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Hi(n, "deploymentId"), [i, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          jy(a),
          Ny(a),
          ps(a)
        ]);
        return { deployment: i, mappings: s, voiceAssets: o };
      },
      Component: mL
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
      Component: t5
    },
    {
      path: "/runtime/queue",
      Component: Zz
    }
  ];
}
function Hi(n, a) {
  const i = n[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const _b = "ext-actions-request", RL = "ext-actions-declare", ML = "ext-action-state", Db = "ext-action-invoke", ph = "emotion-tts:navigate", Ii = "emotion-tts.run", zb = "emotion-tts.mappings", AL = 4e3;
function _L(n, a) {
  let i = null, s = !1;
  const o = () => {
    const w = i?.badge ?? "not_installed";
    return DL(w, s);
  }, c = () => ({
    primary: o(),
    secondary: {
      id: zb,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    n.dispatchEvent(
      new CustomEvent(RL, {
        detail: { actions: c() },
        bubbles: !1
      })
    );
  }, m = () => {
    n.dispatchEvent(
      new CustomEvent(ML, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, v = () => h(), p = (w) => {
    const N = w.detail?.id;
    N === Ii ? x() : N === zb && n.dispatchEvent(
      new CustomEvent(ph, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, x = async () => {
    const w = i?.badge ?? "not_installed", N = w === "ready" || w === "running" || w === "starting";
    s = !0, m();
    try {
      N ? await sM() : await lM();
      try {
        i = await Xf();
      } catch {
      }
    } catch {
    } finally {
      s = !1, m();
    }
  };
  n.addEventListener(_b, v), n.addEventListener(Db, p);
  let g = !1;
  const S = async () => {
    try {
      const w = await Xf();
      if (g) return;
      i = w, m();
    } catch {
    }
  };
  S();
  const E = window.setInterval(() => void S(), AL);
  return h(), {
    dispose: () => {
      g = !0, window.clearInterval(E), n.removeEventListener(_b, v), n.removeEventListener(Db, p);
    }
  };
}
function DL(n, a) {
  const i = n === "ready" || n === "running" || n === "starting", s = n === "stopped" || n === "not_installed" || n === "failed";
  return a ? {
    id: Ii,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : n === "starting" || n === "installing" || n === "stopping" ? {
    id: Ii,
    label: Nx(n),
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
const gh = "emotion-tts-app", zL = "ext-event", Ob = "emotion-tts-stylesheet", kb = ["accent", "density", "card"];
function OL(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function kL() {
  if (typeof document > "u" || document.getElementById(Ob)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Ob, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
kL();
class LL extends HTMLElement {
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
    this.root = ME.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(ph, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = _L(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const s = i.detail?.path;
      s && this.router && this.router.navigate(s);
    };
    this.navigateListener = a, this.addEventListener(ph, a);
  }
  syncTweaksFromBody() {
    for (const a of kb) {
      const i = OL(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: kb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = dN(CL(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ d.jsx(b.StrictMode, { children: /* @__PURE__ */ d.jsx(hN, { router: i }) })
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
      new CustomEvent(zL, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function UL() {
  typeof customElements > "u" || customElements.get(gh) || customElements.define(gh, LL);
}
typeof customElements < "u" && !customElements.get(gh) && UL();
export {
  UL as register
};
//# sourceMappingURL=emotion-tts.js.map
