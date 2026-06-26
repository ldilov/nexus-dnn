function Tw(t, a) {
  for (var i = 0; i < a.length; i++) {
    const o = a[i];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const s in o)
        if (s !== "default" && !(s in t)) {
          const u = Object.getOwnPropertyDescriptor(o, s);
          u && Object.defineProperty(t, s, u.get ? u : {
            enumerable: !0,
            get: () => o[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function ih(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nd = { exports: {} }, eo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var E0;
function Cw() {
  if (E0) return eo;
  E0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(o, s, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), s.key !== void 0 && (f = "" + s.key), "key" in s) {
      u = {};
      for (var h in s)
        h !== "key" && (u[h] = s[h]);
    } else u = s;
    return s = u.ref, {
      $$typeof: t,
      type: o,
      key: f,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return eo.Fragment = a, eo.jsx = i, eo.jsxs = i, eo;
}
var _0;
function Rw() {
  return _0 || (_0 = 1, nd.exports = Cw()), nd.exports;
}
var w = Rw(), ad = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var N0;
function Aw() {
  if (N0) return Ue;
  N0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), v = Symbol.iterator;
  function x(D) {
    return D === null || typeof D != "object" ? null : (D = v && D[v] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var S = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, A = Object.assign, R = {};
  function T(D, k, K) {
    this.props = D, this.context = k, this.refs = R, this.updater = K || S;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(D, k) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, k, "setState");
  }, T.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function L() {
  }
  L.prototype = T.prototype;
  function E(D, k, K) {
    this.props = D, this.context = k, this.refs = R, this.updater = K || S;
  }
  var z = E.prototype = new L();
  z.constructor = E, A(z, T.prototype), z.isPureReactComponent = !0;
  var Y = Array.isArray;
  function U() {
  }
  var V = { H: null, A: null, T: null, S: null }, C = Object.prototype.hasOwnProperty;
  function G(D, k, K) {
    var ae = K.ref;
    return {
      $$typeof: t,
      type: D,
      key: k,
      ref: ae !== void 0 ? ae : null,
      props: K
    };
  }
  function P(D, k) {
    return G(D.type, k, D.props);
  }
  function I(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function J(D) {
    var k = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(K) {
      return k[K];
    });
  }
  var oe = /\/+/g;
  function j(D, k) {
    return typeof D == "object" && D !== null && D.key != null ? J("" + D.key) : k.toString(36);
  }
  function X(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(U, U) : (D.status = "pending", D.then(
          function(k) {
            D.status === "pending" && (D.status = "fulfilled", D.value = k);
          },
          function(k) {
            D.status === "pending" && (D.status = "rejected", D.reason = k);
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
  function N(D, k, K, ae, se) {
    var me = typeof D;
    (me === "undefined" || me === "boolean") && (D = null);
    var ge = !1;
    if (D === null) ge = !0;
    else
      switch (me) {
        case "bigint":
        case "string":
        case "number":
          ge = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case t:
            case a:
              ge = !0;
              break;
            case y:
              return ge = D._init, N(
                ge(D._payload),
                k,
                K,
                ae,
                se
              );
          }
      }
    if (ge)
      return se = se(D), ge = ae === "" ? "." + j(D, 0) : ae, Y(se) ? (K = "", ge != null && (K = ge.replace(oe, "$&/") + "/"), N(se, k, K, "", function(ze) {
        return ze;
      })) : se != null && (I(se) && (se = P(
        se,
        K + (se.key == null || D && D.key === se.key ? "" : ("" + se.key).replace(
          oe,
          "$&/"
        ) + "/") + ge
      )), k.push(se)), 1;
    ge = 0;
    var ee = ae === "" ? "." : ae + ":";
    if (Y(D))
      for (var pe = 0; pe < D.length; pe++)
        ae = D[pe], me = ee + j(ae, pe), ge += N(
          ae,
          k,
          K,
          me,
          se
        );
    else if (pe = x(D), typeof pe == "function")
      for (D = pe.call(D), pe = 0; !(ae = D.next()).done; )
        ae = ae.value, me = ee + j(ae, pe++), ge += N(
          ae,
          k,
          K,
          me,
          se
        );
    else if (me === "object") {
      if (typeof D.then == "function")
        return N(
          X(D),
          k,
          K,
          ae,
          se
        );
      throw k = String(D), Error(
        "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ge;
  }
  function O(D, k, K) {
    if (D == null) return D;
    var ae = [], se = 0;
    return N(D, ae, "", "", function(me) {
      return k.call(K, me, se++);
    }), ae;
  }
  function Q(D) {
    if (D._status === -1) {
      var k = D._result;
      k = k(), k.then(
        function(K) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = K);
        },
        function(K) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = K);
        }
      ), D._status === -1 && (D._status = 0, D._result = k);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var $ = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var k = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(k)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, le = {
    map: O,
    forEach: function(D, k, K) {
      O(
        D,
        function() {
          k.apply(this, arguments);
        },
        K
      );
    },
    count: function(D) {
      var k = 0;
      return O(D, function() {
        k++;
      }), k;
    },
    toArray: function(D) {
      return O(D, function(k) {
        return k;
      }) || [];
    },
    only: function(D) {
      if (!I(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Ue.Activity = m, Ue.Children = le, Ue.Component = T, Ue.Fragment = i, Ue.Profiler = s, Ue.PureComponent = E, Ue.StrictMode = o, Ue.Suspense = p, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return V.H.useMemoCache(D);
    }
  }, Ue.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(D, k, K) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var ae = A({}, D.props), se = D.key;
    if (k != null)
      for (me in k.key !== void 0 && (se = "" + k.key), k)
        !C.call(k, me) || me === "key" || me === "__self" || me === "__source" || me === "ref" && k.ref === void 0 || (ae[me] = k[me]);
    var me = arguments.length - 2;
    if (me === 1) ae.children = K;
    else if (1 < me) {
      for (var ge = Array(me), ee = 0; ee < me; ee++)
        ge[ee] = arguments[ee + 2];
      ae.children = ge;
    }
    return G(D.type, se, ae);
  }, Ue.createContext = function(D) {
    return D = {
      $$typeof: f,
      _currentValue: D,
      _currentValue2: D,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, D.Provider = D, D.Consumer = {
      $$typeof: u,
      _context: D
    }, D;
  }, Ue.createElement = function(D, k, K) {
    var ae, se = {}, me = null;
    if (k != null)
      for (ae in k.key !== void 0 && (me = "" + k.key), k)
        C.call(k, ae) && ae !== "key" && ae !== "__self" && ae !== "__source" && (se[ae] = k[ae]);
    var ge = arguments.length - 2;
    if (ge === 1) se.children = K;
    else if (1 < ge) {
      for (var ee = Array(ge), pe = 0; pe < ge; pe++)
        ee[pe] = arguments[pe + 2];
      se.children = ee;
    }
    if (D && D.defaultProps)
      for (ae in ge = D.defaultProps, ge)
        se[ae] === void 0 && (se[ae] = ge[ae]);
    return G(D, me, se);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(D) {
    return { $$typeof: h, render: D };
  }, Ue.isValidElement = I, Ue.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: Q
    };
  }, Ue.memo = function(D, k) {
    return {
      $$typeof: g,
      type: D,
      compare: k === void 0 ? null : k
    };
  }, Ue.startTransition = function(D) {
    var k = V.T, K = {};
    V.T = K;
    try {
      var ae = D(), se = V.S;
      se !== null && se(K, ae), typeof ae == "object" && ae !== null && typeof ae.then == "function" && ae.then(U, $);
    } catch (me) {
      $(me);
    } finally {
      k !== null && K.types !== null && (k.types = K.types), V.T = k;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ue.use = function(D) {
    return V.H.use(D);
  }, Ue.useActionState = function(D, k, K) {
    return V.H.useActionState(D, k, K);
  }, Ue.useCallback = function(D, k) {
    return V.H.useCallback(D, k);
  }, Ue.useContext = function(D) {
    return V.H.useContext(D);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(D, k) {
    return V.H.useDeferredValue(D, k);
  }, Ue.useEffect = function(D, k) {
    return V.H.useEffect(D, k);
  }, Ue.useEffectEvent = function(D) {
    return V.H.useEffectEvent(D);
  }, Ue.useId = function() {
    return V.H.useId();
  }, Ue.useImperativeHandle = function(D, k, K) {
    return V.H.useImperativeHandle(D, k, K);
  }, Ue.useInsertionEffect = function(D, k) {
    return V.H.useInsertionEffect(D, k);
  }, Ue.useLayoutEffect = function(D, k) {
    return V.H.useLayoutEffect(D, k);
  }, Ue.useMemo = function(D, k) {
    return V.H.useMemo(D, k);
  }, Ue.useOptimistic = function(D, k) {
    return V.H.useOptimistic(D, k);
  }, Ue.useReducer = function(D, k, K) {
    return V.H.useReducer(D, k, K);
  }, Ue.useRef = function(D) {
    return V.H.useRef(D);
  }, Ue.useState = function(D) {
    return V.H.useState(D);
  }, Ue.useSyncExternalStore = function(D, k, K) {
    return V.H.useSyncExternalStore(
      D,
      k,
      K
    );
  }, Ue.useTransition = function() {
    return V.H.useTransition();
  }, Ue.version = "19.2.7", Ue;
}
var M0;
function Mo() {
  return M0 || (M0 = 1, ad.exports = Aw()), ad.exports;
}
var M = Mo();
const ye = /* @__PURE__ */ ih(M), Dw = /* @__PURE__ */ Tw({
  __proto__: null,
  default: ye
}, [M]);
var ld = { exports: {} }, to = {}, id = { exports: {} }, rd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var T0;
function zw() {
  return T0 || (T0 = 1, (function(t) {
    function a(N, O) {
      var Q = N.length;
      N.push(O);
      e: for (; 0 < Q; ) {
        var $ = Q - 1 >>> 1, le = N[$];
        if (0 < s(le, O))
          N[$] = O, N[Q] = le, Q = $;
        else break e;
      }
    }
    function i(N) {
      return N.length === 0 ? null : N[0];
    }
    function o(N) {
      if (N.length === 0) return null;
      var O = N[0], Q = N.pop();
      if (Q !== O) {
        N[0] = Q;
        e: for (var $ = 0, le = N.length, D = le >>> 1; $ < D; ) {
          var k = 2 * ($ + 1) - 1, K = N[k], ae = k + 1, se = N[ae];
          if (0 > s(K, Q))
            ae < le && 0 > s(se, K) ? (N[$] = se, N[ae] = Q, $ = ae) : (N[$] = K, N[k] = Q, $ = k);
          else if (ae < le && 0 > s(se, Q))
            N[$] = se, N[ae] = Q, $ = ae;
          else break e;
        }
      }
      return O;
    }
    function s(N, O) {
      var Q = N.sortIndex - O.sortIndex;
      return Q !== 0 ? Q : N.id - O.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, h = f.now();
      t.unstable_now = function() {
        return f.now() - h;
      };
    }
    var p = [], g = [], y = 1, m = null, v = 3, x = !1, S = !1, A = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function z(N) {
      for (var O = i(g); O !== null; ) {
        if (O.callback === null) o(g);
        else if (O.startTime <= N)
          o(g), O.sortIndex = O.expirationTime, a(p, O);
        else break;
        O = i(g);
      }
    }
    function Y(N) {
      if (A = !1, z(N), !S)
        if (i(p) !== null)
          S = !0, U || (U = !0, J());
        else {
          var O = i(g);
          O !== null && X(Y, O.startTime - N);
        }
    }
    var U = !1, V = -1, C = 5, G = -1;
    function P() {
      return R ? !0 : !(t.unstable_now() - G < C);
    }
    function I() {
      if (R = !1, U) {
        var N = t.unstable_now();
        G = N;
        var O = !0;
        try {
          e: {
            S = !1, A && (A = !1, L(V), V = -1), x = !0;
            var Q = v;
            try {
              t: {
                for (z(N), m = i(p); m !== null && !(m.expirationTime > N && P()); ) {
                  var $ = m.callback;
                  if (typeof $ == "function") {
                    m.callback = null, v = m.priorityLevel;
                    var le = $(
                      m.expirationTime <= N
                    );
                    if (N = t.unstable_now(), typeof le == "function") {
                      m.callback = le, z(N), O = !0;
                      break t;
                    }
                    m === i(p) && o(p), z(N);
                  } else o(p);
                  m = i(p);
                }
                if (m !== null) O = !0;
                else {
                  var D = i(g);
                  D !== null && X(
                    Y,
                    D.startTime - N
                  ), O = !1;
                }
              }
              break e;
            } finally {
              m = null, v = Q, x = !1;
            }
            O = void 0;
          }
        } finally {
          O ? J() : U = !1;
        }
      }
    }
    var J;
    if (typeof E == "function")
      J = function() {
        E(I);
      };
    else if (typeof MessageChannel < "u") {
      var oe = new MessageChannel(), j = oe.port2;
      oe.port1.onmessage = I, J = function() {
        j.postMessage(null);
      };
    } else
      J = function() {
        T(I, 0);
      };
    function X(N, O) {
      V = T(function() {
        N(t.unstable_now());
      }, O);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, t.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : C = 0 < N ? Math.floor(1e3 / N) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(N) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = v;
      }
      var Q = v;
      v = O;
      try {
        return N();
      } finally {
        v = Q;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(N, O) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var Q = v;
      v = N;
      try {
        return O();
      } finally {
        v = Q;
      }
    }, t.unstable_scheduleCallback = function(N, O, Q) {
      var $ = t.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? $ + Q : $) : Q = $, N) {
        case 1:
          var le = -1;
          break;
        case 2:
          le = 250;
          break;
        case 5:
          le = 1073741823;
          break;
        case 4:
          le = 1e4;
          break;
        default:
          le = 5e3;
      }
      return le = Q + le, N = {
        id: y++,
        callback: O,
        priorityLevel: N,
        startTime: Q,
        expirationTime: le,
        sortIndex: -1
      }, Q > $ ? (N.sortIndex = Q, a(g, N), i(p) === null && N === i(g) && (A ? (L(V), V = -1) : A = !0, X(Y, Q - $))) : (N.sortIndex = le, a(p, N), S || x || (S = !0, U || (U = !0, J()))), N;
    }, t.unstable_shouldYield = P, t.unstable_wrapCallback = function(N) {
      var O = v;
      return function() {
        var Q = v;
        v = O;
        try {
          return N.apply(this, arguments);
        } finally {
          v = Q;
        }
      };
    };
  })(rd)), rd;
}
var C0;
function Ow() {
  return C0 || (C0 = 1, id.exports = zw()), id.exports;
}
var od = { exports: {} }, un = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R0;
function jw() {
  if (R0) return un;
  R0 = 1;
  var t = Mo();
  function a(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        g += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var o = {
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
  }, s = Symbol.for("react.portal");
  function u(p, g, y) {
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: m == null ? null : "" + m,
      children: p,
      containerInfo: g,
      implementation: y
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, g) {
    if (p === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return un.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, un.createPortal = function(p, g) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(a(299));
    return u(p, g, null, y);
  }, un.flushSync = function(p) {
    var g = f.T, y = o.p;
    try {
      if (f.T = null, o.p = 2, p) return p();
    } finally {
      f.T = g, o.p = y, o.d.f();
    }
  }, un.preconnect = function(p, g) {
    typeof p == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(p, g));
  }, un.prefetchDNS = function(p) {
    typeof p == "string" && o.d.D(p);
  }, un.preinit = function(p, g) {
    if (typeof p == "string" && g && typeof g.as == "string") {
      var y = g.as, m = h(y, g.crossOrigin), v = typeof g.integrity == "string" ? g.integrity : void 0, x = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      y === "style" ? o.d.S(
        p,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: m,
          integrity: v,
          fetchPriority: x
        }
      ) : y === "script" && o.d.X(p, {
        crossOrigin: m,
        integrity: v,
        fetchPriority: x,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, un.preinitModule = function(p, g) {
    if (typeof p == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var y = h(
            g.as,
            g.crossOrigin
          );
          o.d.M(p, {
            crossOrigin: y,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && o.d.M(p);
  }, un.preload = function(p, g) {
    if (typeof p == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var y = g.as, m = h(y, g.crossOrigin);
      o.d.L(p, y, {
        crossOrigin: m,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, un.preloadModule = function(p, g) {
    if (typeof p == "string")
      if (g) {
        var y = h(g.as, g.crossOrigin);
        o.d.m(p, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: y,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else o.d.m(p);
  }, un.requestFormReset = function(p) {
    o.d.r(p);
  }, un.unstable_batchedUpdates = function(p, g) {
    return p(g);
  }, un.useFormState = function(p, g, y) {
    return f.H.useFormState(p, g, y);
  }, un.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, un.version = "19.2.7", un;
}
var A0;
function Gv() {
  if (A0) return od.exports;
  A0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), od.exports = jw(), od.exports;
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
var D0;
function Lw() {
  if (D0) return to;
  D0 = 1;
  var t = Ow(), a = Mo(), i = Gv();
  function o(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        n += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var n = e, l = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (l = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? l : null;
  }
  function f(e) {
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
  function p(e) {
    if (u(e) !== e)
      throw Error(o(188));
  }
  function g(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(o(188));
      return n !== e ? null : e;
    }
    for (var l = e, r = n; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (r = c.return, r !== null) {
          l = r;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return p(c), e;
          if (d === r) return p(c), n;
          d = d.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== r.return) l = c, r = d;
      else {
        for (var b = !1, _ = c.child; _; ) {
          if (_ === l) {
            b = !0, l = c, r = d;
            break;
          }
          if (_ === r) {
            b = !0, r = c, l = d;
            break;
          }
          _ = _.sibling;
        }
        if (!b) {
          for (_ = d.child; _; ) {
            if (_ === l) {
              b = !0, l = d, r = c;
              break;
            }
            if (_ === r) {
              b = !0, r = d, l = c;
              break;
            }
            _ = _.sibling;
          }
          if (!b) throw Error(o(189));
        }
      }
      if (l.alternate !== r) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? e : n;
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
  var m = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), E = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), G = Symbol.for("react.activity"), P = Symbol.for("react.memo_cache_sentinel"), I = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = I && e[I] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var oe = Symbol.for("react.client.reference");
  function j(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === oe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case T:
        return "Profiler";
      case R:
        return "StrictMode";
      case Y:
        return "Suspense";
      case U:
        return "SuspenseList";
      case G:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case E:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case z:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case V:
          return n = e.displayName || null, n !== null ? n : j(e.type) || "Memo";
        case C:
          n = e._payload, e = e._init;
          try {
            return j(e(n));
          } catch {
          }
      }
    return null;
  }
  var X = Array.isArray, N = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, $ = [], le = -1;
  function D(e) {
    return { current: e };
  }
  function k(e) {
    0 > le || (e.current = $[le], $[le] = null, le--);
  }
  function K(e, n) {
    le++, $[le] = e.current, e.current = n;
  }
  var ae = D(null), se = D(null), me = D(null), ge = D(null);
  function ee(e, n) {
    switch (K(me, n), K(se, e), K(ae, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Zp(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Zp(n), e = Qp(n, e);
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
    k(ae), K(ae, e);
  }
  function pe() {
    k(ae), k(se), k(me);
  }
  function ze(e) {
    e.memoizedState !== null && K(ge, e);
    var n = ae.current, l = Qp(n, e.type);
    n !== l && (K(se, e), K(ae, l));
  }
  function Ae(e) {
    se.current === e && (k(ae), k(se)), ge.current === e && (k(ge), Fr._currentValue = Q);
  }
  var we, Se;
  function De(e) {
    if (we === void 0)
      try {
        throw Error();
      } catch (l) {
        var n = l.stack.trim().match(/\n( *(at )?)/);
        we = n && n[1] || "", Se = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + we + e + Se;
  }
  var qe = !1;
  function nt(e, n) {
    if (!e || qe) return "";
    qe = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
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
                } catch (re) {
                  var ie = re;
                }
                Reflect.construct(e, [], fe);
              } else {
                try {
                  fe.call();
                } catch (re) {
                  ie = re;
                }
                e.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (re) {
                ie = re;
              }
              (fe = e()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (re) {
            if (re && ie && typeof re.stack == "string")
              return [re.stack, ie.stack];
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        r.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var d = r.DetermineComponentFrameRoot(), b = d[0], _ = d[1];
      if (b && _) {
        var B = b.split(`
`), ne = _.split(`
`);
        for (c = r = 0; r < B.length && !B[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; c < ne.length && !ne[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (r === B.length || c === ne.length)
          for (r = B.length - 1, c = ne.length - 1; 1 <= r && 0 <= c && B[r] !== ne[c]; )
            c--;
        for (; 1 <= r && 0 <= c; r--, c--)
          if (B[r] !== ne[c]) {
            if (r !== 1 || c !== 1)
              do
                if (r--, c--, 0 > c || B[r] !== ne[c]) {
                  var ue = `
` + B[r].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= r && 0 <= c);
            break;
          }
      }
    } finally {
      qe = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? De(l) : "";
  }
  function it(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return De(e.type);
      case 16:
        return De("Lazy");
      case 13:
        return e.child !== n && n !== null ? De("Suspense Fallback") : De("Suspense");
      case 19:
        return De("SuspenseList");
      case 0:
      case 15:
        return nt(e.type, !1);
      case 11:
        return nt(e.type.render, !1);
      case 1:
        return nt(e.type, !0);
      case 31:
        return De("Activity");
      default:
        return "";
    }
  }
  function Ft(e) {
    try {
      var n = "", l = null;
      do
        n += it(e, l), l = e, e = e.return;
      while (e);
      return n;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var pt = Object.prototype.hasOwnProperty, Gt = t.unstable_scheduleCallback, Jt = t.unstable_cancelCallback, Et = t.unstable_shouldYield, Qt = t.unstable_requestPaint, yt = t.unstable_now, _t = t.unstable_getCurrentPriorityLevel, Nt = t.unstable_ImmediatePriority, Pt = t.unstable_UserBlockingPriority, qt = t.unstable_NormalPriority, Wt = t.unstable_LowPriority, Mt = t.unstable_IdlePriority, tl = t.log, kn = t.unstable_setDisableYieldValue, Nn = null, $t = null;
  function Tt(e) {
    if (typeof tl == "function" && kn(e), $t && typeof $t.setStrictMode == "function")
      try {
        $t.setStrictMode(Nn, e);
      } catch {
      }
  }
  var zt = Math.clz32 ? Math.clz32 : mn, nl = Math.log, pa = Math.LN2;
  function mn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (nl(e) / pa | 0) | 0;
  }
  var ta = 256, Mn = 262144, Vn = 4194304;
  function on(e) {
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
  function Le(e, n, l) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var c = 0, d = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var _ = r & 134217727;
    return _ !== 0 ? (r = _ & ~d, r !== 0 ? c = on(r) : (b &= _, b !== 0 ? c = on(b) : l || (l = _ & ~e, l !== 0 && (c = on(l))))) : (_ = r & ~d, _ !== 0 ? c = on(_) : b !== 0 ? c = on(b) : l || (l = r & ~e, l !== 0 && (c = on(l)))), c === 0 ? 0 : n !== 0 && n !== c && (n & d) === 0 && (d = c & -c, l = n & -n, d >= l || d === 32 && (l & 4194048) !== 0) ? n : c;
  }
  function ot(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Rt(e, n) {
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
  function Ot() {
    var e = Vn;
    return Vn <<= 1, (Vn & 62914560) === 0 && (Vn = 4194304), e;
  }
  function fn(e) {
    for (var n = [], l = 0; 31 > l; l++) n.push(e);
    return n;
  }
  function rt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Xt(e, n, l, r, c, d) {
    var b = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var _ = e.entanglements, B = e.expirationTimes, ne = e.hiddenUpdates;
    for (l = b & ~l; 0 < l; ) {
      var ue = 31 - zt(l), fe = 1 << ue;
      _[ue] = 0, B[ue] = -1;
      var ie = ne[ue];
      if (ie !== null)
        for (ne[ue] = null, ue = 0; ue < ie.length; ue++) {
          var re = ie[ue];
          re !== null && (re.lane &= -536870913);
        }
      l &= ~fe;
    }
    r !== 0 && na(e, r, 0), d !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(b & ~n));
  }
  function na(e, n, l) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var r = 31 - zt(n);
    e.entangledLanes |= n, e.entanglements[r] = e.entanglements[r] | 1073741824 | l & 261930;
  }
  function It(e, n) {
    var l = e.entangledLanes |= n;
    for (e = e.entanglements; l; ) {
      var r = 31 - zt(l), c = 1 << r;
      c & n | e[r] & n && (e[r] |= n), l &= ~c;
    }
  }
  function H(e, n) {
    var l = n & -n;
    return l = (l & 42) !== 0 ? 1 : Z(l), (l & (e.suspendedLanes | n)) !== 0 ? 0 : l;
  }
  function Z(e) {
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
  function W(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function de() {
    var e = O.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : p0(e.type));
  }
  function he(e, n) {
    var l = O.p;
    try {
      return O.p = e, n();
    } finally {
      O.p = l;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, xe = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, Te = "__reactListeners$" + Ee, Be = "__reactHandles$" + Ee, Oe = "__reactResources$" + Ee, Ye = "__reactMarker$" + Ee;
  function Je(e) {
    delete e[ve], delete e[xe], delete e[Me], delete e[Te], delete e[Be];
  }
  function mt(e) {
    var n = e[ve];
    if (n) return n;
    for (var l = e.parentNode; l; ) {
      if (n = l[be] || l[ve]) {
        if (l = n.alternate, n.child !== null || l !== null && l.child !== null)
          for (e = e0(e); e !== null; ) {
            if (l = e[ve]) return l;
            e = e0(e);
          }
        return n;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function We(e) {
    if (e = e[ve] || e[be]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Ze(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Ct(e) {
    var n = e[Oe];
    return n || (n = e[Oe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Ke(e) {
    e[Ye] = !0;
  }
  var ya = /* @__PURE__ */ new Set(), Tn = {};
  function sn(e, n) {
    en(e, n), en(e + "Capture", n);
  }
  function en(e, n) {
    for (Tn[e] = n, e = 0; e < n.length; e++)
      ya.add(n[e]);
  }
  var gn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), al = {}, pn = {};
  function ll(e) {
    return pt.call(pn, e) ? !0 : pt.call(al, e) ? !1 : gn.test(e) ? pn[e] = !0 : (al[e] = !0, !1);
  }
  function aa(e, n, l) {
    if (ll(n))
      if (l === null) e.removeAttribute(n);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var r = n.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + l);
      }
  }
  function la(e, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + l);
    }
  }
  function He(e, n, l, r) {
    if (r === null) e.removeAttribute(l);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(n, l, "" + r);
    }
  }
  function st(e) {
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
  function dn(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Cn(e, n, l) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var c = r.get, d = r.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(b) {
          l = "" + b, d.call(this, b);
        }
      }), Object.defineProperty(e, n, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(b) {
          l = "" + b;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function il(e) {
    if (!e._valueTracker) {
      var n = dn(e) ? "checked" : "value";
      e._valueTracker = Cn(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Da(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var l = n.getValue(), r = "";
    return e && (r = dn(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== l ? (n.setValue(e), !0) : !1;
  }
  function at(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Yn = /[\n"\\]/g;
  function tn(e) {
    return e.replace(
      Yn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bl(e, n, l, r, c, d, b, _) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), n != null ? b === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + st(n)) : e.value !== "" + st(n) && (e.value = "" + st(n)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), n != null ? fr(e, b, st(n)) : l != null ? fr(e, b, st(l)) : r != null && e.removeAttribute("value"), c == null && d != null && (e.defaultChecked = !!d), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" ? e.name = "" + st(_) : e.removeAttribute("name");
  }
  function di(e, n, l, r, c, d, b, _) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || l != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        il(e);
        return;
      }
      l = l != null ? "" + st(l) : "", n = n != null ? "" + st(n) : l, _ || n === e.value || (e.value = n), e.defaultValue = n;
    }
    r = r ?? c, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = _ ? e.checked : !!r, e.defaultChecked = !!r, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), il(e);
  }
  function fr(e, n, l) {
    n === "number" && at(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function rl(e, n, l, r) {
    if (e = e.options, n) {
      n = {};
      for (var c = 0; c < l.length; c++)
        n["$" + l[c]] = !0;
      for (l = 0; l < e.length; l++)
        c = n.hasOwnProperty("$" + e[l].value), e[l].selected !== c && (e[l].selected = c), c && r && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + st(l), n = null, c = 0; c < e.length; c++) {
        if (e[c].value === l) {
          e[c].selected = !0, r && (e[c].defaultSelected = !0);
          return;
        }
        n !== null || e[c].disabled || (n = e[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function dr(e, n, l) {
    if (n != null && (n = "" + st(n), n !== e.value && (e.value = n), l == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = l != null ? "" + st(l) : "";
  }
  function Gh(e, n, l, r) {
    if (n == null) {
      if (r != null) {
        if (l != null) throw Error(o(92));
        if (X(r)) {
          if (1 < r.length) throw Error(o(93));
          r = r[0];
        }
        l = r;
      }
      l == null && (l = ""), n = l;
    }
    l = st(n), e.defaultValue = l, r = e.textContent, r === l && r !== "" && r !== null && (e.value = r), il(e);
  }
  function hi(e, n) {
    if (n) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var wx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qh(e, n, l) {
    var r = n.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? r ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : r ? e.setProperty(n, l) : typeof l != "number" || l === 0 || wx.has(n) ? n === "float" ? e.cssFloat = l : e[n] = ("" + l).trim() : e[n] = l + "px";
  }
  function $h(e, n, l) {
    if (n != null && typeof n != "object")
      throw Error(o(62));
    if (e = e.style, l != null) {
      for (var r in l)
        !l.hasOwnProperty(r) || n != null && n.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var c in n)
        r = n[c], n.hasOwnProperty(c) && l[c] !== r && qh(e, c, r);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && qh(e, d, n[d]);
  }
  function Ju(e) {
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
  var Ex = /* @__PURE__ */ new Map([
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
  ]), _x = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Uo(e) {
    return _x.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function za() {
  }
  var Pu = null;
  function Wu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var mi = null, gi = null;
  function Xh(e) {
    var n = We(e);
    if (n && (e = n.stateNode)) {
      var l = e[xe] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Bl(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), n = l.name, l.type === "radio" && n != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + tn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < l.length; n++) {
              var r = l[n];
              if (r !== e && r.form === e.form) {
                var c = r[xe] || null;
                if (!c) throw Error(o(90));
                Bl(
                  r,
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
            for (n = 0; n < l.length; n++)
              r = l[n], r.form === e.form && Da(r);
          }
          break e;
        case "textarea":
          dr(e, l.value, l.defaultValue);
          break e;
        case "select":
          n = l.value, n != null && rl(e, !!l.multiple, n, !1);
      }
    }
  }
  var ec = !1;
  function Zh(e, n, l) {
    if (ec) return e(n, l);
    ec = !0;
    try {
      var r = e(n);
      return r;
    } finally {
      if (ec = !1, (mi !== null || gi !== null) && (Ns(), mi && (n = mi, e = gi, gi = mi = null, Xh(n), e)))
        for (n = 0; n < e.length; n++) Xh(e[n]);
    }
  }
  function hr(e, n) {
    var l = e.stateNode;
    if (l === null) return null;
    var r = l[xe] || null;
    if (r === null) return null;
    l = r[n];
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
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        o(231, n, typeof l)
      );
    return l;
  }
  var Oa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), tc = !1;
  if (Oa)
    try {
      var mr = {};
      Object.defineProperty(mr, "passive", {
        get: function() {
          tc = !0;
        }
      }), window.addEventListener("test", mr, mr), window.removeEventListener("test", mr, mr);
    } catch {
      tc = !1;
    }
  var ol = null, nc = null, ko = null;
  function Qh() {
    if (ko) return ko;
    var e, n = nc, l = n.length, r, c = "value" in ol ? ol.value : ol.textContent, d = c.length;
    for (e = 0; e < l && n[e] === c[e]; e++) ;
    var b = l - e;
    for (r = 1; r <= b && n[l - r] === c[d - r]; r++) ;
    return ko = c.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Vo(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Yo() {
    return !0;
  }
  function Ih() {
    return !1;
  }
  function yn(e) {
    function n(l, r, c, d, b) {
      this._reactName = l, this._targetInst = c, this.type = r, this.nativeEvent = d, this.target = b, this.currentTarget = null;
      for (var _ in e)
        e.hasOwnProperty(_) && (l = e[_], this[_] = l ? l(d) : d[_]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Yo : Ih, this.isPropagationStopped = Ih, this;
    }
    return m(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Yo);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Yo);
      },
      persist: function() {
      },
      isPersistent: Yo
    }), n;
  }
  var Ul = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Go = yn(Ul), gr = m({}, Ul, { view: 0, detail: 0 }), Nx = yn(gr), ac, lc, pr, qo = m({}, gr, {
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
    getModifierState: rc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== pr && (pr && e.type === "mousemove" ? (ac = e.screenX - pr.screenX, lc = e.screenY - pr.screenY) : lc = ac = 0, pr = e), ac);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : lc;
    }
  }), Kh = yn(qo), Mx = m({}, qo, { dataTransfer: 0 }), Tx = yn(Mx), Cx = m({}, gr, { relatedTarget: 0 }), ic = yn(Cx), Rx = m({}, Ul, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ax = yn(Rx), Dx = m({}, Ul, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), zx = yn(Dx), Ox = m({}, Ul, { data: 0 }), Fh = yn(Ox), jx = {
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
  }, Lx = {
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
  }, Hx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Bx(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Hx[e]) ? !!n[e] : !1;
  }
  function rc() {
    return Bx;
  }
  var Ux = m({}, gr, {
    key: function(e) {
      if (e.key) {
        var n = jx[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Vo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Lx[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: rc,
    charCode: function(e) {
      return e.type === "keypress" ? Vo(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Vo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), kx = yn(Ux), Vx = m({}, qo, {
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
  }), Jh = yn(Vx), Yx = m({}, gr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: rc
  }), Gx = yn(Yx), qx = m({}, Ul, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), $x = yn(qx), Xx = m({}, qo, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zx = yn(Xx), Qx = m({}, Ul, {
    newState: 0,
    oldState: 0
  }), Ix = yn(Qx), Kx = [9, 13, 27, 32], oc = Oa && "CompositionEvent" in window, yr = null;
  Oa && "documentMode" in document && (yr = document.documentMode);
  var Fx = Oa && "TextEvent" in window && !yr, Ph = Oa && (!oc || yr && 8 < yr && 11 >= yr), Wh = " ", em = !1;
  function tm(e, n) {
    switch (e) {
      case "keyup":
        return Kx.indexOf(n.keyCode) !== -1;
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
  function nm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pi = !1;
  function Jx(e, n) {
    switch (e) {
      case "compositionend":
        return nm(n);
      case "keypress":
        return n.which !== 32 ? null : (em = !0, Wh);
      case "textInput":
        return e = n.data, e === Wh && em ? null : e;
      default:
        return null;
    }
  }
  function Px(e, n) {
    if (pi)
      return e === "compositionend" || !oc && tm(e, n) ? (e = Qh(), ko = nc = ol = null, pi = !1, e) : null;
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
        return Ph && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Wx = {
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
  function am(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Wx[e.type] : n === "textarea";
  }
  function lm(e, n, l, r) {
    mi ? gi ? gi.push(r) : gi = [r] : mi = r, n = zs(n, "onChange"), 0 < n.length && (l = new Go(
      "onChange",
      "change",
      null,
      l,
      r
    ), e.push({ event: l, listeners: n }));
  }
  var vr = null, br = null;
  function eS(e) {
    Vp(e, 0);
  }
  function $o(e) {
    var n = Ze(e);
    if (Da(n)) return e;
  }
  function im(e, n) {
    if (e === "change") return n;
  }
  var rm = !1;
  if (Oa) {
    var sc;
    if (Oa) {
      var uc = "oninput" in document;
      if (!uc) {
        var om = document.createElement("div");
        om.setAttribute("oninput", "return;"), uc = typeof om.oninput == "function";
      }
      sc = uc;
    } else sc = !1;
    rm = sc && (!document.documentMode || 9 < document.documentMode);
  }
  function sm() {
    vr && (vr.detachEvent("onpropertychange", um), br = vr = null);
  }
  function um(e) {
    if (e.propertyName === "value" && $o(br)) {
      var n = [];
      lm(
        n,
        br,
        e,
        Wu(e)
      ), Zh(eS, n);
    }
  }
  function tS(e, n, l) {
    e === "focusin" ? (sm(), vr = n, br = l, vr.attachEvent("onpropertychange", um)) : e === "focusout" && sm();
  }
  function nS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $o(br);
  }
  function aS(e, n) {
    if (e === "click") return $o(n);
  }
  function lS(e, n) {
    if (e === "input" || e === "change")
      return $o(n);
  }
  function iS(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Rn = typeof Object.is == "function" ? Object.is : iS;
  function xr(e, n) {
    if (Rn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var l = Object.keys(e), r = Object.keys(n);
    if (l.length !== r.length) return !1;
    for (r = 0; r < l.length; r++) {
      var c = l[r];
      if (!pt.call(n, c) || !Rn(e[c], n[c]))
        return !1;
    }
    return !0;
  }
  function cm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function fm(e, n) {
    var l = cm(e);
    e = 0;
    for (var r; l; ) {
      if (l.nodeType === 3) {
        if (r = e + l.textContent.length, e <= n && r >= n)
          return { node: l, offset: n - e };
        e = r;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = cm(l);
    }
  }
  function dm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? dm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function hm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = at(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof n.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = n.contentWindow;
      else break;
      n = at(e.document);
    }
    return n;
  }
  function cc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var rS = Oa && "documentMode" in document && 11 >= document.documentMode, yi = null, fc = null, Sr = null, dc = !1;
  function mm(e, n, l) {
    var r = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    dc || yi == null || yi !== at(r) || (r = yi, "selectionStart" in r && cc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Sr && xr(Sr, r) || (Sr = r, r = zs(fc, "onSelect"), 0 < r.length && (n = new Go(
      "onSelect",
      "select",
      null,
      n,
      l
    ), e.push({ event: n, listeners: r }), n.target = yi)));
  }
  function kl(e, n) {
    var l = {};
    return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
  }
  var vi = {
    animationend: kl("Animation", "AnimationEnd"),
    animationiteration: kl("Animation", "AnimationIteration"),
    animationstart: kl("Animation", "AnimationStart"),
    transitionrun: kl("Transition", "TransitionRun"),
    transitionstart: kl("Transition", "TransitionStart"),
    transitioncancel: kl("Transition", "TransitionCancel"),
    transitionend: kl("Transition", "TransitionEnd")
  }, hc = {}, gm = {};
  Oa && (gm = document.createElement("div").style, "AnimationEvent" in window || (delete vi.animationend.animation, delete vi.animationiteration.animation, delete vi.animationstart.animation), "TransitionEvent" in window || delete vi.transitionend.transition);
  function Vl(e) {
    if (hc[e]) return hc[e];
    if (!vi[e]) return e;
    var n = vi[e], l;
    for (l in n)
      if (n.hasOwnProperty(l) && l in gm)
        return hc[e] = n[l];
    return e;
  }
  var pm = Vl("animationend"), ym = Vl("animationiteration"), vm = Vl("animationstart"), oS = Vl("transitionrun"), sS = Vl("transitionstart"), uS = Vl("transitioncancel"), bm = Vl("transitionend"), xm = /* @__PURE__ */ new Map(), mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  mc.push("scrollEnd");
  function ia(e, n) {
    xm.set(e, n), sn(n, [e]);
  }
  var Xo = typeof reportError == "function" ? reportError : function(e) {
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
  }, Gn = [], bi = 0, gc = 0;
  function Zo() {
    for (var e = bi, n = gc = bi = 0; n < e; ) {
      var l = Gn[n];
      Gn[n++] = null;
      var r = Gn[n];
      Gn[n++] = null;
      var c = Gn[n];
      Gn[n++] = null;
      var d = Gn[n];
      if (Gn[n++] = null, r !== null && c !== null) {
        var b = r.pending;
        b === null ? c.next = c : (c.next = b.next, b.next = c), r.pending = c;
      }
      d !== 0 && Sm(l, c, d);
    }
  }
  function Qo(e, n, l, r) {
    Gn[bi++] = e, Gn[bi++] = n, Gn[bi++] = l, Gn[bi++] = r, gc |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function pc(e, n, l, r) {
    return Qo(e, n, l, r), Io(e);
  }
  function Yl(e, n) {
    return Qo(e, null, null, n), Io(e);
  }
  function Sm(e, n, l) {
    e.lanes |= l;
    var r = e.alternate;
    r !== null && (r.lanes |= l);
    for (var c = !1, d = e.return; d !== null; )
      d.childLanes |= l, r = d.alternate, r !== null && (r.childLanes |= l), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (c = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, c && n !== null && (c = 31 - zt(l), e = d.hiddenUpdates, r = e[c], r === null ? e[c] = [n] : r.push(n), n.lane = l | 536870912), d) : null;
  }
  function Io(e) {
    if (50 < qr)
      throw qr = 0, Mf = null, Error(o(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var xi = {};
  function cS(e, n, l, r) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function An(e, n, l, r) {
    return new cS(e, n, l, r);
  }
  function yc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ja(e, n) {
    var l = e.alternate;
    return l === null ? (l = An(
      e.tag,
      n,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, n = e.dependencies, l.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function wm(e, n) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, n = l.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Ko(e, n, l, r, c, d) {
    var b = 0;
    if (r = e, typeof e == "function") yc(e) && (b = 1);
    else if (typeof e == "string")
      b = gw(
        e,
        l,
        ae.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case G:
          return e = An(31, l, n, c), e.elementType = G, e.lanes = d, e;
        case A:
          return Gl(l.children, c, d, n);
        case R:
          b = 8, c |= 24;
          break;
        case T:
          return e = An(12, l, n, c | 2), e.elementType = T, e.lanes = d, e;
        case Y:
          return e = An(13, l, n, c), e.elementType = Y, e.lanes = d, e;
        case U:
          return e = An(19, l, n, c), e.elementType = U, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
                b = 10;
                break e;
              case L:
                b = 9;
                break e;
              case z:
                b = 11;
                break e;
              case V:
                b = 14;
                break e;
              case C:
                b = 16, r = null;
                break e;
            }
          b = 29, l = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return n = An(b, l, n, c), n.elementType = e, n.type = r, n.lanes = d, n;
  }
  function Gl(e, n, l, r) {
    return e = An(7, e, r, n), e.lanes = l, e;
  }
  function vc(e, n, l) {
    return e = An(6, e, null, n), e.lanes = l, e;
  }
  function Em(e) {
    var n = An(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function bc(e, n, l) {
    return n = An(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = l, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  var _m = /* @__PURE__ */ new WeakMap();
  function qn(e, n) {
    if (typeof e == "object" && e !== null) {
      var l = _m.get(e);
      return l !== void 0 ? l : (n = {
        value: e,
        source: n,
        stack: Ft(n)
      }, _m.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ft(n)
    };
  }
  var Si = [], wi = 0, Fo = null, wr = 0, $n = [], Xn = 0, sl = null, va = 1, ba = "";
  function La(e, n) {
    Si[wi++] = wr, Si[wi++] = Fo, Fo = e, wr = n;
  }
  function Nm(e, n, l) {
    $n[Xn++] = va, $n[Xn++] = ba, $n[Xn++] = sl, sl = e;
    var r = va;
    e = ba;
    var c = 32 - zt(r) - 1;
    r &= ~(1 << c), l += 1;
    var d = 32 - zt(n) + c;
    if (30 < d) {
      var b = c - c % 5;
      d = (r & (1 << b) - 1).toString(32), r >>= b, c -= b, va = 1 << 32 - zt(n) + c | l << c | r, ba = d + e;
    } else
      va = 1 << d | l << c | r, ba = e;
  }
  function xc(e) {
    e.return !== null && (La(e, 1), Nm(e, 1, 0));
  }
  function Sc(e) {
    for (; e === Fo; )
      Fo = Si[--wi], Si[wi] = null, wr = Si[--wi], Si[wi] = null;
    for (; e === sl; )
      sl = $n[--Xn], $n[Xn] = null, ba = $n[--Xn], $n[Xn] = null, va = $n[--Xn], $n[Xn] = null;
  }
  function Mm(e, n) {
    $n[Xn++] = va, $n[Xn++] = ba, $n[Xn++] = sl, va = n.id, ba = n.overflow, sl = e;
  }
  var nn = null, vt = null, Fe = !1, ul = null, Zn = !1, wc = Error(o(519));
  function cl(e) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Er(qn(n, e)), wc;
  }
  function Tm(e) {
    var n = e.stateNode, l = e.type, r = e.memoizedProps;
    switch (n[ve] = e, n[xe] = r, l) {
      case "dialog":
        Xe("cancel", n), Xe("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Xe("load", n);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Xr.length; l++)
          Xe(Xr[l], n);
        break;
      case "source":
        Xe("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Xe("error", n), Xe("load", n);
        break;
      case "details":
        Xe("toggle", n);
        break;
      case "input":
        Xe("invalid", n), di(
          n,
          r.value,
          r.defaultValue,
          r.checked,
          r.defaultChecked,
          r.type,
          r.name,
          !0
        );
        break;
      case "select":
        Xe("invalid", n);
        break;
      case "textarea":
        Xe("invalid", n), Gh(n, r.value, r.defaultValue, r.children);
    }
    l = r.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || n.textContent === "" + l || r.suppressHydrationWarning === !0 || $p(n.textContent, l) ? (r.popover != null && (Xe("beforetoggle", n), Xe("toggle", n)), r.onScroll != null && Xe("scroll", n), r.onScrollEnd != null && Xe("scrollend", n), r.onClick != null && (n.onclick = za), n = !0) : n = !1, n || cl(e, !0);
  }
  function Cm(e) {
    for (nn = e.return; nn; )
      switch (nn.tag) {
        case 5:
        case 31:
        case 13:
          Zn = !1;
          return;
        case 27:
        case 3:
          Zn = !0;
          return;
        default:
          nn = nn.return;
      }
  }
  function Ei(e) {
    if (e !== nn) return !1;
    if (!Fe) return Cm(e), Fe = !0, !1;
    var n = e.tag, l;
    if ((l = n !== 3 && n !== 27) && ((l = n === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Yf(e.type, e.memoizedProps)), l = !l), l && vt && cl(e), Cm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      vt = Wp(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      vt = Wp(e);
    } else
      n === 27 ? (n = vt, _l(e.type) ? (e = Zf, Zf = null, vt = e) : vt = n) : vt = nn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ql() {
    vt = nn = null, Fe = !1;
  }
  function Ec() {
    var e = ul;
    return e !== null && (Sn === null ? Sn = e : Sn.push.apply(
      Sn,
      e
    ), ul = null), e;
  }
  function Er(e) {
    ul === null ? ul = [e] : ul.push(e);
  }
  var _c = D(null), $l = null, Ha = null;
  function fl(e, n, l) {
    K(_c, n._currentValue), n._currentValue = l;
  }
  function Ba(e) {
    e._currentValue = _c.current, k(_c);
  }
  function Nc(e, n, l) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === l) break;
      e = e.return;
    }
  }
  function Mc(e, n, l, r) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var d = c.dependencies;
      if (d !== null) {
        var b = c.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var _ = d;
          d = c;
          for (var B = 0; B < n.length; B++)
            if (_.context === n[B]) {
              d.lanes |= l, _ = d.alternate, _ !== null && (_.lanes |= l), Nc(
                d.return,
                l,
                e
              ), r || (b = null);
              break e;
            }
          d = _.next;
        }
      } else if (c.tag === 18) {
        if (b = c.return, b === null) throw Error(o(341));
        b.lanes |= l, d = b.alternate, d !== null && (d.lanes |= l), Nc(b, l, e), b = null;
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
  function _i(e, n, l, r) {
    e = null;
    for (var c = n, d = !1; c !== null; ) {
      if (!d) {
        if ((c.flags & 524288) !== 0) d = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var b = c.alternate;
        if (b === null) throw Error(o(387));
        if (b = b.memoizedProps, b !== null) {
          var _ = c.type;
          Rn(c.pendingProps.value, b.value) || (e !== null ? e.push(_) : e = [_]);
        }
      } else if (c === ge.current) {
        if (b = c.alternate, b === null) throw Error(o(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Fr) : e = [Fr]);
      }
      c = c.return;
    }
    e !== null && Mc(
      n,
      e,
      l,
      r
    ), n.flags |= 262144;
  }
  function Jo(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Rn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Xl(e) {
    $l = e, Ha = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function an(e) {
    return Rm($l, e);
  }
  function Po(e, n) {
    return $l === null && Xl(e), Rm(e, n);
  }
  function Rm(e, n) {
    var l = n._currentValue;
    if (n = { context: n, memoizedValue: l, next: null }, Ha === null) {
      if (e === null) throw Error(o(308));
      Ha = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ha = Ha.next = n;
    return l;
  }
  var fS = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(l, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, dS = t.unstable_scheduleCallback, hS = t.unstable_NormalPriority, Bt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tc() {
    return {
      controller: new fS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function _r(e) {
    e.refCount--, e.refCount === 0 && dS(hS, function() {
      e.controller.abort();
    });
  }
  var Nr = null, Cc = 0, Ni = 0, Mi = null;
  function mS(e, n) {
    if (Nr === null) {
      var l = Nr = [];
      Cc = 0, Ni = zf(), Mi = {
        status: "pending",
        value: void 0,
        then: function(r) {
          l.push(r);
        }
      };
    }
    return Cc++, n.then(Am, Am), n;
  }
  function Am() {
    if (--Cc === 0 && Nr !== null) {
      Mi !== null && (Mi.status = "fulfilled");
      var e = Nr;
      Nr = null, Ni = 0, Mi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function gS(e, n) {
    var l = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        l.push(c);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = n;
        for (var c = 0; c < l.length; c++) (0, l[c])(n);
      },
      function(c) {
        for (r.status = "rejected", r.reason = c, c = 0; c < l.length; c++)
          (0, l[c])(void 0);
      }
    ), r;
  }
  var Dm = N.S;
  N.S = function(e, n) {
    mp = yt(), typeof n == "object" && n !== null && typeof n.then == "function" && mS(e, n), Dm !== null && Dm(e, n);
  };
  var Zl = D(null);
  function Rc() {
    var e = Zl.current;
    return e !== null ? e : gt.pooledCache;
  }
  function Wo(e, n) {
    n === null ? K(Zl, Zl.current) : K(Zl, n.pool);
  }
  function zm() {
    var e = Rc();
    return e === null ? null : { parent: Bt._currentValue, pool: e };
  }
  var Ti = Error(o(460)), Ac = Error(o(474)), es = Error(o(542)), ts = { then: function() {
  } };
  function Om(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jm(e, n, l) {
    switch (l = e[l], l === void 0 ? e.push(n) : l !== n && (n.then(za, za), n = l), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Hm(e), e;
      default:
        if (typeof n.status == "string") n.then(za, za);
        else {
          if (e = gt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = n, e.status = "pending", e.then(
            function(r) {
              if (n.status === "pending") {
                var c = n;
                c.status = "fulfilled", c.value = r;
              }
            },
            function(r) {
              if (n.status === "pending") {
                var c = n;
                c.status = "rejected", c.reason = r;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, Hm(e), e;
        }
        throw Il = n, Ti;
    }
  }
  function Ql(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Il = l, Ti) : l;
    }
  }
  var Il = null;
  function Lm() {
    if (Il === null) throw Error(o(459));
    var e = Il;
    return Il = null, e;
  }
  function Hm(e) {
    if (e === Ti || e === es)
      throw Error(o(483));
  }
  var Ci = null, Mr = 0;
  function ns(e) {
    var n = Mr;
    return Mr += 1, Ci === null && (Ci = []), jm(Ci, e, n);
  }
  function Tr(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function as(e, n) {
    throw n.$$typeof === v ? Error(o(525)) : (e = Object.prototype.toString.call(n), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Bm(e) {
    function n(F, q) {
      if (e) {
        var te = F.deletions;
        te === null ? (F.deletions = [q], F.flags |= 16) : te.push(q);
      }
    }
    function l(F, q) {
      if (!e) return null;
      for (; q !== null; )
        n(F, q), q = q.sibling;
      return null;
    }
    function r(F) {
      for (var q = /* @__PURE__ */ new Map(); F !== null; )
        F.key !== null ? q.set(F.key, F) : q.set(F.index, F), F = F.sibling;
      return q;
    }
    function c(F, q) {
      return F = ja(F, q), F.index = 0, F.sibling = null, F;
    }
    function d(F, q, te) {
      return F.index = te, e ? (te = F.alternate, te !== null ? (te = te.index, te < q ? (F.flags |= 67108866, q) : te) : (F.flags |= 67108866, q)) : (F.flags |= 1048576, q);
    }
    function b(F) {
      return e && F.alternate === null && (F.flags |= 67108866), F;
    }
    function _(F, q, te, ce) {
      return q === null || q.tag !== 6 ? (q = vc(te, F.mode, ce), q.return = F, q) : (q = c(q, te), q.return = F, q);
    }
    function B(F, q, te, ce) {
      var Re = te.type;
      return Re === A ? ue(
        F,
        q,
        te.props.children,
        ce,
        te.key
      ) : q !== null && (q.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === C && Ql(Re) === q.type) ? (q = c(q, te.props), Tr(q, te), q.return = F, q) : (q = Ko(
        te.type,
        te.key,
        te.props,
        null,
        F.mode,
        ce
      ), Tr(q, te), q.return = F, q);
    }
    function ne(F, q, te, ce) {
      return q === null || q.tag !== 4 || q.stateNode.containerInfo !== te.containerInfo || q.stateNode.implementation !== te.implementation ? (q = bc(te, F.mode, ce), q.return = F, q) : (q = c(q, te.children || []), q.return = F, q);
    }
    function ue(F, q, te, ce, Re) {
      return q === null || q.tag !== 7 ? (q = Gl(
        te,
        F.mode,
        ce,
        Re
      ), q.return = F, q) : (q = c(q, te), q.return = F, q);
    }
    function fe(F, q, te) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return q = vc(
          "" + q,
          F.mode,
          te
        ), q.return = F, q;
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case x:
            return te = Ko(
              q.type,
              q.key,
              q.props,
              null,
              F.mode,
              te
            ), Tr(te, q), te.return = F, te;
          case S:
            return q = bc(
              q,
              F.mode,
              te
            ), q.return = F, q;
          case C:
            return q = Ql(q), fe(F, q, te);
        }
        if (X(q) || J(q))
          return q = Gl(
            q,
            F.mode,
            te,
            null
          ), q.return = F, q;
        if (typeof q.then == "function")
          return fe(F, ns(q), te);
        if (q.$$typeof === E)
          return fe(
            F,
            Po(F, q),
            te
          );
        as(F, q);
      }
      return null;
    }
    function ie(F, q, te, ce) {
      var Re = q !== null ? q.key : null;
      if (typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint")
        return Re !== null ? null : _(F, q, "" + te, ce);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case x:
            return te.key === Re ? B(F, q, te, ce) : null;
          case S:
            return te.key === Re ? ne(F, q, te, ce) : null;
          case C:
            return te = Ql(te), ie(F, q, te, ce);
        }
        if (X(te) || J(te))
          return Re !== null ? null : ue(F, q, te, ce, null);
        if (typeof te.then == "function")
          return ie(
            F,
            q,
            ns(te),
            ce
          );
        if (te.$$typeof === E)
          return ie(
            F,
            q,
            Po(F, te),
            ce
          );
        as(F, te);
      }
      return null;
    }
    function re(F, q, te, ce, Re) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return F = F.get(te) || null, _(q, F, "" + ce, Re);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return F = F.get(
              ce.key === null ? te : ce.key
            ) || null, B(q, F, ce, Re);
          case S:
            return F = F.get(
              ce.key === null ? te : ce.key
            ) || null, ne(q, F, ce, Re);
          case C:
            return ce = Ql(ce), re(
              F,
              q,
              te,
              ce,
              Re
            );
        }
        if (X(ce) || J(ce))
          return F = F.get(te) || null, ue(q, F, ce, Re, null);
        if (typeof ce.then == "function")
          return re(
            F,
            q,
            te,
            ns(ce),
            Re
          );
        if (ce.$$typeof === E)
          return re(
            F,
            q,
            te,
            Po(q, ce),
            Re
          );
        as(q, ce);
      }
      return null;
    }
    function _e(F, q, te, ce) {
      for (var Re = null, et = null, Ne = q, Ve = q = 0, Ie = null; Ne !== null && Ve < te.length; Ve++) {
        Ne.index > Ve ? (Ie = Ne, Ne = null) : Ie = Ne.sibling;
        var tt = ie(
          F,
          Ne,
          te[Ve],
          ce
        );
        if (tt === null) {
          Ne === null && (Ne = Ie);
          break;
        }
        e && Ne && tt.alternate === null && n(F, Ne), q = d(tt, q, Ve), et === null ? Re = tt : et.sibling = tt, et = tt, Ne = Ie;
      }
      if (Ve === te.length)
        return l(F, Ne), Fe && La(F, Ve), Re;
      if (Ne === null) {
        for (; Ve < te.length; Ve++)
          Ne = fe(F, te[Ve], ce), Ne !== null && (q = d(
            Ne,
            q,
            Ve
          ), et === null ? Re = Ne : et.sibling = Ne, et = Ne);
        return Fe && La(F, Ve), Re;
      }
      for (Ne = r(Ne); Ve < te.length; Ve++)
        Ie = re(
          Ne,
          F,
          Ve,
          te[Ve],
          ce
        ), Ie !== null && (e && Ie.alternate !== null && Ne.delete(
          Ie.key === null ? Ve : Ie.key
        ), q = d(
          Ie,
          q,
          Ve
        ), et === null ? Re = Ie : et.sibling = Ie, et = Ie);
      return e && Ne.forEach(function(Rl) {
        return n(F, Rl);
      }), Fe && La(F, Ve), Re;
    }
    function je(F, q, te, ce) {
      if (te == null) throw Error(o(151));
      for (var Re = null, et = null, Ne = q, Ve = q = 0, Ie = null, tt = te.next(); Ne !== null && !tt.done; Ve++, tt = te.next()) {
        Ne.index > Ve ? (Ie = Ne, Ne = null) : Ie = Ne.sibling;
        var Rl = ie(F, Ne, tt.value, ce);
        if (Rl === null) {
          Ne === null && (Ne = Ie);
          break;
        }
        e && Ne && Rl.alternate === null && n(F, Ne), q = d(Rl, q, Ve), et === null ? Re = Rl : et.sibling = Rl, et = Rl, Ne = Ie;
      }
      if (tt.done)
        return l(F, Ne), Fe && La(F, Ve), Re;
      if (Ne === null) {
        for (; !tt.done; Ve++, tt = te.next())
          tt = fe(F, tt.value, ce), tt !== null && (q = d(tt, q, Ve), et === null ? Re = tt : et.sibling = tt, et = tt);
        return Fe && La(F, Ve), Re;
      }
      for (Ne = r(Ne); !tt.done; Ve++, tt = te.next())
        tt = re(Ne, F, Ve, tt.value, ce), tt !== null && (e && tt.alternate !== null && Ne.delete(tt.key === null ? Ve : tt.key), q = d(tt, q, Ve), et === null ? Re = tt : et.sibling = tt, et = tt);
      return e && Ne.forEach(function(Mw) {
        return n(F, Mw);
      }), Fe && La(F, Ve), Re;
    }
    function ht(F, q, te, ce) {
      if (typeof te == "object" && te !== null && te.type === A && te.key === null && (te = te.props.children), typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case x:
            e: {
              for (var Re = te.key; q !== null; ) {
                if (q.key === Re) {
                  if (Re = te.type, Re === A) {
                    if (q.tag === 7) {
                      l(
                        F,
                        q.sibling
                      ), ce = c(
                        q,
                        te.props.children
                      ), ce.return = F, F = ce;
                      break e;
                    }
                  } else if (q.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === C && Ql(Re) === q.type) {
                    l(
                      F,
                      q.sibling
                    ), ce = c(q, te.props), Tr(ce, te), ce.return = F, F = ce;
                    break e;
                  }
                  l(F, q);
                  break;
                } else n(F, q);
                q = q.sibling;
              }
              te.type === A ? (ce = Gl(
                te.props.children,
                F.mode,
                ce,
                te.key
              ), ce.return = F, F = ce) : (ce = Ko(
                te.type,
                te.key,
                te.props,
                null,
                F.mode,
                ce
              ), Tr(ce, te), ce.return = F, F = ce);
            }
            return b(F);
          case S:
            e: {
              for (Re = te.key; q !== null; ) {
                if (q.key === Re)
                  if (q.tag === 4 && q.stateNode.containerInfo === te.containerInfo && q.stateNode.implementation === te.implementation) {
                    l(
                      F,
                      q.sibling
                    ), ce = c(q, te.children || []), ce.return = F, F = ce;
                    break e;
                  } else {
                    l(F, q);
                    break;
                  }
                else n(F, q);
                q = q.sibling;
              }
              ce = bc(te, F.mode, ce), ce.return = F, F = ce;
            }
            return b(F);
          case C:
            return te = Ql(te), ht(
              F,
              q,
              te,
              ce
            );
        }
        if (X(te))
          return _e(
            F,
            q,
            te,
            ce
          );
        if (J(te)) {
          if (Re = J(te), typeof Re != "function") throw Error(o(150));
          return te = Re.call(te), je(
            F,
            q,
            te,
            ce
          );
        }
        if (typeof te.then == "function")
          return ht(
            F,
            q,
            ns(te),
            ce
          );
        if (te.$$typeof === E)
          return ht(
            F,
            q,
            Po(F, te),
            ce
          );
        as(F, te);
      }
      return typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint" ? (te = "" + te, q !== null && q.tag === 6 ? (l(F, q.sibling), ce = c(q, te), ce.return = F, F = ce) : (l(F, q), ce = vc(te, F.mode, ce), ce.return = F, F = ce), b(F)) : l(F, q);
    }
    return function(F, q, te, ce) {
      try {
        Mr = 0;
        var Re = ht(
          F,
          q,
          te,
          ce
        );
        return Ci = null, Re;
      } catch (Ne) {
        if (Ne === Ti || Ne === es) throw Ne;
        var et = An(29, Ne, null, F.mode);
        return et.lanes = ce, et.return = F, et;
      } finally {
      }
    };
  }
  var Kl = Bm(!0), Um = Bm(!1), dl = !1;
  function Dc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function zc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function hl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ml(e, n, l) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (lt & 2) !== 0) {
      var c = r.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), r.pending = n, n = Io(e), Sm(e, null, l), n;
    }
    return Qo(e, r, n, l), Io(e);
  }
  function Cr(e, n, l) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (l & 4194048) !== 0)) {
      var r = n.lanes;
      r &= e.pendingLanes, l |= r, n.lanes = l, It(e, l);
    }
  }
  function Oc(e, n) {
    var l = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, l === r)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var b = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          d === null ? c = d = b : d = d.next = b, l = l.next;
        } while (l !== null);
        d === null ? c = d = n : d = d.next = n;
      } else c = d = n;
      l = {
        baseState: r.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: d,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = n : e.next = n, l.lastBaseUpdate = n;
  }
  var jc = !1;
  function Rr() {
    if (jc) {
      var e = Mi;
      if (e !== null) throw e;
    }
  }
  function Ar(e, n, l, r) {
    jc = !1;
    var c = e.updateQueue;
    dl = !1;
    var d = c.firstBaseUpdate, b = c.lastBaseUpdate, _ = c.shared.pending;
    if (_ !== null) {
      c.shared.pending = null;
      var B = _, ne = B.next;
      B.next = null, b === null ? d = ne : b.next = ne, b = B;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, _ = ue.lastBaseUpdate, _ !== b && (_ === null ? ue.firstBaseUpdate = ne : _.next = ne, ue.lastBaseUpdate = B));
    }
    if (d !== null) {
      var fe = c.baseState;
      b = 0, ue = ne = B = null, _ = d;
      do {
        var ie = _.lane & -536870913, re = ie !== _.lane;
        if (re ? (Qe & ie) === ie : (r & ie) === ie) {
          ie !== 0 && ie === Ni && (jc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: _.tag,
            payload: _.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = e, je = _;
            ie = n;
            var ht = l;
            switch (je.tag) {
              case 1:
                if (_e = je.payload, typeof _e == "function") {
                  fe = _e.call(ht, fe, ie);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = je.payload, ie = typeof _e == "function" ? _e.call(ht, fe, ie) : _e, ie == null) break e;
                fe = m({}, fe, ie);
                break e;
              case 2:
                dl = !0;
            }
          }
          ie = _.callback, ie !== null && (e.flags |= 64, re && (e.flags |= 8192), re = c.callbacks, re === null ? c.callbacks = [ie] : re.push(ie));
        } else
          re = {
            lane: ie,
            tag: _.tag,
            payload: _.payload,
            callback: _.callback,
            next: null
          }, ue === null ? (ne = ue = re, B = fe) : ue = ue.next = re, b |= ie;
        if (_ = _.next, _ === null) {
          if (_ = c.shared.pending, _ === null)
            break;
          re = _, _ = re.next, re.next = null, c.lastBaseUpdate = re, c.shared.pending = null;
        }
      } while (!0);
      ue === null && (B = fe), c.baseState = B, c.firstBaseUpdate = ne, c.lastBaseUpdate = ue, d === null && (c.shared.lanes = 0), bl |= b, e.lanes = b, e.memoizedState = fe;
    }
  }
  function km(e, n) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(n);
  }
  function Vm(e, n) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        km(l[e], n);
  }
  var Ri = D(null), ls = D(0);
  function Ym(e, n) {
    e = Za, K(ls, e), K(Ri, n), Za = e | n.baseLanes;
  }
  function Lc() {
    K(ls, Za), K(Ri, Ri.current);
  }
  function Hc() {
    Za = ls.current, k(Ri), k(ls);
  }
  var Dn = D(null), Qn = null;
  function gl(e) {
    var n = e.alternate;
    K(jt, jt.current & 1), K(Dn, e), Qn === null && (n === null || Ri.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Bc(e) {
    K(jt, jt.current), K(Dn, e), Qn === null && (Qn = e);
  }
  function Gm(e) {
    e.tag === 22 ? (K(jt, jt.current), K(Dn, e), Qn === null && (Qn = e)) : pl();
  }
  function pl() {
    K(jt, jt.current), K(Dn, Dn.current);
  }
  function zn(e) {
    k(Dn), Qn === e && (Qn = null), k(jt);
  }
  var jt = D(0);
  function is(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var l = n.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || $f(l) || Xf(l)))
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
  var Ua = 0, ke = null, ft = null, Ut = null, rs = !1, Ai = !1, Fl = !1, os = 0, Dr = 0, Di = null, pS = 0;
  function At() {
    throw Error(o(321));
  }
  function Uc(e, n) {
    if (n === null) return !1;
    for (var l = 0; l < n.length && l < e.length; l++)
      if (!Rn(e[l], n[l])) return !1;
    return !0;
  }
  function kc(e, n, l, r, c, d) {
    return Ua = d, ke = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, N.H = e === null || e.memoizedState === null ? Ng : ef, Fl = !1, d = l(r, c), Fl = !1, Ai && (d = $m(
      n,
      l,
      r,
      c
    )), qm(e), d;
  }
  function qm(e) {
    N.H = jr;
    var n = ft !== null && ft.next !== null;
    if (Ua = 0, Ut = ft = ke = null, rs = !1, Dr = 0, Di = null, n) throw Error(o(300));
    e === null || kt || (e = e.dependencies, e !== null && Jo(e) && (kt = !0));
  }
  function $m(e, n, l, r) {
    ke = e;
    var c = 0;
    do {
      if (Ai && (Di = null), Dr = 0, Ai = !1, 25 <= c) throw Error(o(301));
      if (c += 1, Ut = ft = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      N.H = Mg, d = n(l, r);
    } while (Ai);
    return d;
  }
  function yS() {
    var e = N.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? zr(n) : n, e = e.useState()[0], (ft !== null ? ft.memoizedState : null) !== e && (ke.flags |= 1024), n;
  }
  function Vc() {
    var e = os !== 0;
    return os = 0, e;
  }
  function Yc(e, n, l) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l;
  }
  function Gc(e) {
    if (rs) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      rs = !1;
    }
    Ua = 0, Ut = ft = ke = null, Ai = !1, Dr = os = 0, Di = null;
  }
  function hn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ut === null ? ke.memoizedState = Ut = e : Ut = Ut.next = e, Ut;
  }
  function Lt() {
    if (ft === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ft.next;
    var n = Ut === null ? ke.memoizedState : Ut.next;
    if (n !== null)
      Ut = n, ft = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(o(467)) : Error(o(310));
      ft = e, e = {
        memoizedState: ft.memoizedState,
        baseState: ft.baseState,
        baseQueue: ft.baseQueue,
        queue: ft.queue,
        next: null
      }, Ut === null ? ke.memoizedState = Ut = e : Ut = Ut.next = e;
    }
    return Ut;
  }
  function ss() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function zr(e) {
    var n = Dr;
    return Dr += 1, Di === null && (Di = []), e = jm(Di, e, n), n = ke, (Ut === null ? n.memoizedState : Ut.next) === null && (n = n.alternate, N.H = n === null || n.memoizedState === null ? Ng : ef), e;
  }
  function us(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return zr(e);
      if (e.$$typeof === E) return an(e);
    }
    throw Error(o(438, String(e)));
  }
  function qc(e) {
    var n = null, l = ke.updateQueue;
    if (l !== null && (n = l.memoCache), n == null) {
      var r = ke.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (n = {
        data: r.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), l === null && (l = ss(), ke.updateQueue = l), l.memoCache = n, l = n.data[n.index], l === void 0)
      for (l = n.data[n.index] = Array(e), r = 0; r < e; r++)
        l[r] = P;
    return n.index++, l;
  }
  function ka(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function cs(e) {
    var n = Lt();
    return $c(n, ft, e);
  }
  function $c(e, n, l) {
    var r = e.queue;
    if (r === null) throw Error(o(311));
    r.lastRenderedReducer = l;
    var c = e.baseQueue, d = r.pending;
    if (d !== null) {
      if (c !== null) {
        var b = c.next;
        c.next = d.next, d.next = b;
      }
      n.baseQueue = c = d, r.pending = null;
    }
    if (d = e.baseState, c === null) e.memoizedState = d;
    else {
      n = c.next;
      var _ = b = null, B = null, ne = n, ue = !1;
      do {
        var fe = ne.lane & -536870913;
        if (fe !== ne.lane ? (Qe & fe) === fe : (Ua & fe) === fe) {
          var ie = ne.revertLane;
          if (ie === 0)
            B !== null && (B = B.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }), fe === Ni && (ue = !0);
          else if ((Ua & ie) === ie) {
            ne = ne.next, ie === Ni && (ue = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: ne.revertLane,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }, B === null ? (_ = B = fe, b = d) : B = B.next = fe, ke.lanes |= ie, bl |= ie;
          fe = ne.action, Fl && l(d, fe), d = ne.hasEagerState ? ne.eagerState : l(d, fe);
        } else
          ie = {
            lane: fe,
            revertLane: ne.revertLane,
            gesture: ne.gesture,
            action: ne.action,
            hasEagerState: ne.hasEagerState,
            eagerState: ne.eagerState,
            next: null
          }, B === null ? (_ = B = ie, b = d) : B = B.next = ie, ke.lanes |= fe, bl |= fe;
        ne = ne.next;
      } while (ne !== null && ne !== n);
      if (B === null ? b = d : B.next = _, !Rn(d, e.memoizedState) && (kt = !0, ue && (l = Mi, l !== null)))
        throw l;
      e.memoizedState = d, e.baseState = b, e.baseQueue = B, r.lastRenderedState = d;
    }
    return c === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function Xc(e) {
    var n = Lt(), l = n.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = e;
    var r = l.dispatch, c = l.pending, d = n.memoizedState;
    if (c !== null) {
      l.pending = null;
      var b = c = c.next;
      do
        d = e(d, b.action), b = b.next;
      while (b !== c);
      Rn(d, n.memoizedState) || (kt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), l.lastRenderedState = d;
    }
    return [d, r];
  }
  function Xm(e, n, l) {
    var r = ke, c = Lt(), d = Fe;
    if (d) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = n();
    var b = !Rn(
      (ft || c).memoizedState,
      l
    );
    if (b && (c.memoizedState = l, kt = !0), c = c.queue, Ic(Im.bind(null, r, c, e), [
      e
    ]), c.getSnapshot !== n || b || Ut !== null && Ut.memoizedState.tag & 1) {
      if (r.flags |= 2048, zi(
        9,
        { destroy: void 0 },
        Qm.bind(
          null,
          r,
          c,
          l,
          n
        ),
        null
      ), gt === null) throw Error(o(349));
      d || (Ua & 127) !== 0 || Zm(r, n, l);
    }
    return l;
  }
  function Zm(e, n, l) {
    e.flags |= 16384, e = { getSnapshot: n, value: l }, n = ke.updateQueue, n === null ? (n = ss(), ke.updateQueue = n, n.stores = [e]) : (l = n.stores, l === null ? n.stores = [e] : l.push(e));
  }
  function Qm(e, n, l, r) {
    n.value = l, n.getSnapshot = r, Km(n) && Fm(e);
  }
  function Im(e, n, l) {
    return l(function() {
      Km(n) && Fm(e);
    });
  }
  function Km(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var l = n();
      return !Rn(e, l);
    } catch {
      return !0;
    }
  }
  function Fm(e) {
    var n = Yl(e, 2);
    n !== null && wn(n, e, 2);
  }
  function Zc(e) {
    var n = hn();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Fl) {
        Tt(!0);
        try {
          l();
        } finally {
          Tt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ka,
      lastRenderedState: e
    }, n;
  }
  function Jm(e, n, l, r) {
    return e.baseState = l, $c(
      e,
      ft,
      typeof r == "function" ? r : ka
    );
  }
  function vS(e, n, l, r, c) {
    if (hs(e)) throw Error(o(485));
    if (e = n.action, e !== null) {
      var d = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(b) {
          d.listeners.push(b);
        }
      };
      N.T !== null ? l(!0) : d.isTransition = !1, r(d), l = n.pending, l === null ? (d.next = n.pending = d, Pm(n, d)) : (d.next = l.next, n.pending = l.next = d);
    }
  }
  function Pm(e, n) {
    var l = n.action, r = n.payload, c = e.state;
    if (n.isTransition) {
      var d = N.T, b = {};
      N.T = b;
      try {
        var _ = l(c, r), B = N.S;
        B !== null && B(b, _), Wm(e, n, _);
      } catch (ne) {
        Qc(e, n, ne);
      } finally {
        d !== null && b.types !== null && (d.types = b.types), N.T = d;
      }
    } else
      try {
        d = l(c, r), Wm(e, n, d);
      } catch (ne) {
        Qc(e, n, ne);
      }
  }
  function Wm(e, n, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(r) {
        eg(e, n, r);
      },
      function(r) {
        return Qc(e, n, r);
      }
    ) : eg(e, n, l);
  }
  function eg(e, n, l) {
    n.status = "fulfilled", n.value = l, tg(n), e.state = l, n = e.pending, n !== null && (l = n.next, l === n ? e.pending = null : (l = l.next, n.next = l, Pm(e, l)));
  }
  function Qc(e, n, l) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        n.status = "rejected", n.reason = l, tg(n), n = n.next;
      while (n !== r);
    }
    e.action = null;
  }
  function tg(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function ng(e, n) {
    return n;
  }
  function ag(e, n) {
    if (Fe) {
      var l = gt.formState;
      if (l !== null) {
        e: {
          var r = ke;
          if (Fe) {
            if (vt) {
              t: {
                for (var c = vt, d = Zn; c.nodeType !== 8; ) {
                  if (!d) {
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
                d = c.data, c = d === "F!" || d === "F" ? c : null;
              }
              if (c) {
                vt = In(
                  c.nextSibling
                ), r = c.data === "F!";
                break e;
              }
            }
            cl(r);
          }
          r = !1;
        }
        r && (n = l[0]);
      }
    }
    return l = hn(), l.memoizedState = l.baseState = n, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ng,
      lastRenderedState: n
    }, l.queue = r, l = wg.bind(
      null,
      ke,
      r
    ), r.dispatch = l, r = Zc(!1), d = Wc.bind(
      null,
      ke,
      !1,
      r.queue
    ), r = hn(), c = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = c, l = vS.bind(
      null,
      ke,
      c,
      d,
      l
    ), c.dispatch = l, r.memoizedState = e, [n, l, !1];
  }
  function lg(e) {
    var n = Lt();
    return ig(n, ft, e);
  }
  function ig(e, n, l) {
    if (n = $c(
      e,
      n,
      ng
    )[0], e = cs(ka)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var r = zr(n);
      } catch (b) {
        throw b === Ti ? es : b;
      }
    else r = n;
    n = Lt();
    var c = n.queue, d = c.dispatch;
    return l !== n.memoizedState && (ke.flags |= 2048, zi(
      9,
      { destroy: void 0 },
      bS.bind(null, c, l),
      null
    )), [r, d, e];
  }
  function bS(e, n) {
    e.action = n;
  }
  function rg(e) {
    var n = Lt(), l = ft;
    if (l !== null)
      return ig(n, l, e);
    Lt(), n = n.memoizedState, l = Lt();
    var r = l.queue.dispatch;
    return l.memoizedState = e, [n, r, !1];
  }
  function zi(e, n, l, r) {
    return e = { tag: e, create: l, deps: r, inst: n, next: null }, n = ke.updateQueue, n === null && (n = ss(), ke.updateQueue = n), l = n.lastEffect, l === null ? n.lastEffect = e.next = e : (r = l.next, l.next = e, e.next = r, n.lastEffect = e), e;
  }
  function og() {
    return Lt().memoizedState;
  }
  function fs(e, n, l, r) {
    var c = hn();
    ke.flags |= e, c.memoizedState = zi(
      1 | n,
      { destroy: void 0 },
      l,
      r === void 0 ? null : r
    );
  }
  function ds(e, n, l, r) {
    var c = Lt();
    r = r === void 0 ? null : r;
    var d = c.memoizedState.inst;
    ft !== null && r !== null && Uc(r, ft.memoizedState.deps) ? c.memoizedState = zi(n, d, l, r) : (ke.flags |= e, c.memoizedState = zi(
      1 | n,
      d,
      l,
      r
    ));
  }
  function sg(e, n) {
    fs(8390656, 8, e, n);
  }
  function Ic(e, n) {
    ds(2048, 8, e, n);
  }
  function xS(e) {
    ke.flags |= 4;
    var n = ke.updateQueue;
    if (n === null)
      n = ss(), ke.updateQueue = n, n.events = [e];
    else {
      var l = n.events;
      l === null ? n.events = [e] : l.push(e);
    }
  }
  function ug(e) {
    var n = Lt().memoizedState;
    return xS({ ref: n, nextImpl: e }), function() {
      if ((lt & 2) !== 0) throw Error(o(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function cg(e, n) {
    return ds(4, 2, e, n);
  }
  function fg(e, n) {
    return ds(4, 4, e, n);
  }
  function dg(e, n) {
    if (typeof n == "function") {
      e = e();
      var l = n(e);
      return function() {
        typeof l == "function" ? l() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function hg(e, n, l) {
    l = l != null ? l.concat([e]) : null, ds(4, 4, dg.bind(null, n, e), l);
  }
  function Kc() {
  }
  function mg(e, n) {
    var l = Lt();
    n = n === void 0 ? null : n;
    var r = l.memoizedState;
    return n !== null && Uc(n, r[1]) ? r[0] : (l.memoizedState = [e, n], e);
  }
  function gg(e, n) {
    var l = Lt();
    n = n === void 0 ? null : n;
    var r = l.memoizedState;
    if (n !== null && Uc(n, r[1]))
      return r[0];
    if (r = e(), Fl) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return l.memoizedState = [r, n], r;
  }
  function Fc(e, n, l) {
    return l === void 0 || (Ua & 1073741824) !== 0 && (Qe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = l, e = pp(), ke.lanes |= e, bl |= e, l);
  }
  function pg(e, n, l, r) {
    return Rn(l, n) ? l : Ri.current !== null ? (e = Fc(e, l, r), Rn(e, n) || (kt = !0), e) : (Ua & 42) === 0 || (Ua & 1073741824) !== 0 && (Qe & 261930) === 0 ? (kt = !0, e.memoizedState = l) : (e = pp(), ke.lanes |= e, bl |= e, n);
  }
  function yg(e, n, l, r, c) {
    var d = O.p;
    O.p = d !== 0 && 8 > d ? d : 8;
    var b = N.T, _ = {};
    N.T = _, Wc(e, !1, n, l);
    try {
      var B = c(), ne = N.S;
      if (ne !== null && ne(_, B), B !== null && typeof B == "object" && typeof B.then == "function") {
        var ue = gS(
          B,
          r
        );
        Or(
          e,
          n,
          ue,
          Ln(e)
        );
      } else
        Or(
          e,
          n,
          r,
          Ln(e)
        );
    } catch (fe) {
      Or(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Ln()
      );
    } finally {
      O.p = d, b !== null && _.types !== null && (b.types = _.types), N.T = b;
    }
  }
  function SS() {
  }
  function Jc(e, n, l, r) {
    if (e.tag !== 5) throw Error(o(476));
    var c = vg(e).queue;
    yg(
      e,
      c,
      n,
      Q,
      l === null ? SS : function() {
        return bg(e), l(r);
      }
    );
  }
  function vg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ka,
        lastRenderedState: Q
      },
      next: null
    };
    var l = {};
    return n.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ka,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function bg(e) {
    var n = vg(e);
    n.next === null && (n = e.alternate.memoizedState), Or(
      e,
      n.next.queue,
      {},
      Ln()
    );
  }
  function Pc() {
    return an(Fr);
  }
  function xg() {
    return Lt().memoizedState;
  }
  function Sg() {
    return Lt().memoizedState;
  }
  function wS(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var l = Ln();
          e = hl(l);
          var r = ml(n, e, l);
          r !== null && (wn(r, n, l), Cr(r, n, l)), n = { cache: Tc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function ES(e, n, l) {
    var r = Ln();
    l = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hs(e) ? Eg(n, l) : (l = pc(e, n, l, r), l !== null && (wn(l, e, r), _g(l, n, r)));
  }
  function wg(e, n, l) {
    var r = Ln();
    Or(e, n, l, r);
  }
  function Or(e, n, l, r) {
    var c = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (hs(e)) Eg(n, c);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var b = n.lastRenderedState, _ = d(b, l);
          if (c.hasEagerState = !0, c.eagerState = _, Rn(_, b))
            return Qo(e, n, c, 0), gt === null && Zo(), !1;
        } catch {
        } finally {
        }
      if (l = pc(e, n, c, r), l !== null)
        return wn(l, e, r), _g(l, n, r), !0;
    }
    return !1;
  }
  function Wc(e, n, l, r) {
    if (r = {
      lane: 2,
      revertLane: zf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hs(e)) {
      if (n) throw Error(o(479));
    } else
      n = pc(
        e,
        l,
        r,
        2
      ), n !== null && wn(n, e, 2);
  }
  function hs(e) {
    var n = e.alternate;
    return e === ke || n !== null && n === ke;
  }
  function Eg(e, n) {
    Ai = rs = !0;
    var l = e.pending;
    l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
  }
  function _g(e, n, l) {
    if ((l & 4194048) !== 0) {
      var r = n.lanes;
      r &= e.pendingLanes, l |= r, n.lanes = l, It(e, l);
    }
  }
  var jr = {
    readContext: an,
    use: us,
    useCallback: At,
    useContext: At,
    useEffect: At,
    useImperativeHandle: At,
    useLayoutEffect: At,
    useInsertionEffect: At,
    useMemo: At,
    useReducer: At,
    useRef: At,
    useState: At,
    useDebugValue: At,
    useDeferredValue: At,
    useTransition: At,
    useSyncExternalStore: At,
    useId: At,
    useHostTransitionStatus: At,
    useFormState: At,
    useActionState: At,
    useOptimistic: At,
    useMemoCache: At,
    useCacheRefresh: At
  };
  jr.useEffectEvent = At;
  var Ng = {
    readContext: an,
    use: us,
    useCallback: function(e, n) {
      return hn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: an,
    useEffect: sg,
    useImperativeHandle: function(e, n, l) {
      l = l != null ? l.concat([e]) : null, fs(
        4194308,
        4,
        dg.bind(null, n, e),
        l
      );
    },
    useLayoutEffect: function(e, n) {
      return fs(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      fs(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var l = hn();
      n = n === void 0 ? null : n;
      var r = e();
      if (Fl) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return l.memoizedState = [r, n], r;
    },
    useReducer: function(e, n, l) {
      var r = hn();
      if (l !== void 0) {
        var c = l(n);
        if (Fl) {
          Tt(!0);
          try {
            l(n);
          } finally {
            Tt(!1);
          }
        }
      } else c = n;
      return r.memoizedState = r.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, r.queue = e, e = e.dispatch = ES.bind(
        null,
        ke,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var n = hn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Zc(e);
      var n = e.queue, l = wg.bind(null, ke, n);
      return n.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Kc,
    useDeferredValue: function(e, n) {
      var l = hn();
      return Fc(l, e, n);
    },
    useTransition: function() {
      var e = Zc(!1);
      return e = yg.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), hn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, l) {
      var r = ke, c = hn();
      if (Fe) {
        if (l === void 0)
          throw Error(o(407));
        l = l();
      } else {
        if (l = n(), gt === null)
          throw Error(o(349));
        (Qe & 127) !== 0 || Zm(r, n, l);
      }
      c.memoizedState = l;
      var d = { value: l, getSnapshot: n };
      return c.queue = d, sg(Im.bind(null, r, d, e), [
        e
      ]), r.flags |= 2048, zi(
        9,
        { destroy: void 0 },
        Qm.bind(
          null,
          r,
          d,
          l,
          n
        ),
        null
      ), l;
    },
    useId: function() {
      var e = hn(), n = gt.identifierPrefix;
      if (Fe) {
        var l = ba, r = va;
        l = (r & ~(1 << 32 - zt(r) - 1)).toString(32) + l, n = "_" + n + "R_" + l, l = os++, 0 < l && (n += "H" + l.toString(32)), n += "_";
      } else
        l = pS++, n = "_" + n + "r_" + l.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Pc,
    useFormState: ag,
    useActionState: ag,
    useOptimistic: function(e) {
      var n = hn();
      n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = l, n = Wc.bind(
        null,
        ke,
        !0,
        l
      ), l.dispatch = n, [e, n];
    },
    useMemoCache: qc,
    useCacheRefresh: function() {
      return hn().memoizedState = wS.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var n = hn(), l = { impl: e };
      return n.memoizedState = l, function() {
        if ((lt & 2) !== 0)
          throw Error(o(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, ef = {
    readContext: an,
    use: us,
    useCallback: mg,
    useContext: an,
    useEffect: Ic,
    useImperativeHandle: hg,
    useInsertionEffect: cg,
    useLayoutEffect: fg,
    useMemo: gg,
    useReducer: cs,
    useRef: og,
    useState: function() {
      return cs(ka);
    },
    useDebugValue: Kc,
    useDeferredValue: function(e, n) {
      var l = Lt();
      return pg(
        l,
        ft.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = cs(ka)[0], n = Lt().memoizedState;
      return [
        typeof e == "boolean" ? e : zr(e),
        n
      ];
    },
    useSyncExternalStore: Xm,
    useId: xg,
    useHostTransitionStatus: Pc,
    useFormState: lg,
    useActionState: lg,
    useOptimistic: function(e, n) {
      var l = Lt();
      return Jm(l, ft, e, n);
    },
    useMemoCache: qc,
    useCacheRefresh: Sg
  };
  ef.useEffectEvent = ug;
  var Mg = {
    readContext: an,
    use: us,
    useCallback: mg,
    useContext: an,
    useEffect: Ic,
    useImperativeHandle: hg,
    useInsertionEffect: cg,
    useLayoutEffect: fg,
    useMemo: gg,
    useReducer: Xc,
    useRef: og,
    useState: function() {
      return Xc(ka);
    },
    useDebugValue: Kc,
    useDeferredValue: function(e, n) {
      var l = Lt();
      return ft === null ? Fc(l, e, n) : pg(
        l,
        ft.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Xc(ka)[0], n = Lt().memoizedState;
      return [
        typeof e == "boolean" ? e : zr(e),
        n
      ];
    },
    useSyncExternalStore: Xm,
    useId: xg,
    useHostTransitionStatus: Pc,
    useFormState: rg,
    useActionState: rg,
    useOptimistic: function(e, n) {
      var l = Lt();
      return ft !== null ? Jm(l, ft, e, n) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: qc,
    useCacheRefresh: Sg
  };
  Mg.useEffectEvent = ug;
  function tf(e, n, l, r) {
    n = e.memoizedState, l = l(r, n), l = l == null ? n : m({}, n, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var nf = {
    enqueueSetState: function(e, n, l) {
      e = e._reactInternals;
      var r = Ln(), c = hl(r);
      c.payload = n, l != null && (c.callback = l), n = ml(e, c, r), n !== null && (wn(n, e, r), Cr(n, e, r));
    },
    enqueueReplaceState: function(e, n, l) {
      e = e._reactInternals;
      var r = Ln(), c = hl(r);
      c.tag = 1, c.payload = n, l != null && (c.callback = l), n = ml(e, c, r), n !== null && (wn(n, e, r), Cr(n, e, r));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var l = Ln(), r = hl(l);
      r.tag = 2, n != null && (r.callback = n), n = ml(e, r, l), n !== null && (wn(n, e, l), Cr(n, e, l));
    }
  };
  function Tg(e, n, l, r, c, d, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, d, b) : n.prototype && n.prototype.isPureReactComponent ? !xr(l, r) || !xr(c, d) : !0;
  }
  function Cg(e, n, l, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, r), n.state !== e && nf.enqueueReplaceState(n, n.state, null);
  }
  function Jl(e, n) {
    var l = n;
    if ("ref" in n) {
      l = {};
      for (var r in n)
        r !== "ref" && (l[r] = n[r]);
    }
    if (e = e.defaultProps) {
      l === n && (l = m({}, l));
      for (var c in e)
        l[c] === void 0 && (l[c] = e[c]);
    }
    return l;
  }
  function Rg(e) {
    Xo(e);
  }
  function Ag(e) {
    console.error(e);
  }
  function Dg(e) {
    Xo(e);
  }
  function ms(e, n) {
    try {
      var l = e.onUncaughtError;
      l(n.value, { componentStack: n.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function zg(e, n, l) {
    try {
      var r = e.onCaughtError;
      r(l.value, {
        componentStack: l.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function af(e, n, l) {
    return l = hl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ms(e, n);
    }, l;
  }
  function Og(e) {
    return e = hl(e), e.tag = 3, e;
  }
  function jg(e, n, l, r) {
    var c = l.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var d = r.value;
      e.payload = function() {
        return c(d);
      }, e.callback = function() {
        zg(n, l, r);
      };
    }
    var b = l.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      zg(n, l, r), typeof c != "function" && (xl === null ? xl = /* @__PURE__ */ new Set([this]) : xl.add(this));
      var _ = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: _ !== null ? _ : ""
      });
    });
  }
  function _S(e, n, l, r, c) {
    if (l.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (n = l.alternate, n !== null && _i(
        n,
        l,
        c,
        !0
      ), l = Dn.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Qn === null ? Ms() : l.alternate === null && Dt === 0 && (Dt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = c, r === ts ? l.flags |= 16384 : (n = l.updateQueue, n === null ? l.updateQueue = /* @__PURE__ */ new Set([r]) : n.add(r), Rf(e, r, c)), !1;
          case 22:
            return l.flags |= 65536, r === ts ? l.flags |= 16384 : (n = l.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, l.updateQueue = n) : (l = n.retryQueue, l === null ? n.retryQueue = /* @__PURE__ */ new Set([r]) : l.add(r)), Rf(e, r, c)), !1;
        }
        throw Error(o(435, l.tag));
      }
      return Rf(e, r, c), Ms(), !1;
    }
    if (Fe)
      return n = Dn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = c, r !== wc && (e = Error(o(422), { cause: r }), Er(qn(e, l)))) : (r !== wc && (n = Error(o(423), {
        cause: r
      }), Er(
        qn(n, l)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, r = qn(r, l), c = af(
        e.stateNode,
        r,
        c
      ), Oc(e, c), Dt !== 4 && (Dt = 2)), !1;
    var d = Error(o(520), { cause: r });
    if (d = qn(d, l), Gr === null ? Gr = [d] : Gr.push(d), Dt !== 4 && (Dt = 2), n === null) return !0;
    r = qn(r, l), l = n;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = c & -c, l.lanes |= e, e = af(l.stateNode, r, e), Oc(l, e), !1;
        case 1:
          if (n = l.type, d = l.stateNode, (l.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (xl === null || !xl.has(d))))
            return l.flags |= 65536, c &= -c, l.lanes |= c, c = Og(c), jg(
              c,
              e,
              l,
              r
            ), Oc(l, c), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var lf = Error(o(461)), kt = !1;
  function ln(e, n, l, r) {
    n.child = e === null ? Um(n, null, l, r) : Kl(
      n,
      e.child,
      l,
      r
    );
  }
  function Lg(e, n, l, r, c) {
    l = l.render;
    var d = n.ref;
    if ("ref" in r) {
      var b = {};
      for (var _ in r)
        _ !== "ref" && (b[_] = r[_]);
    } else b = r;
    return Xl(n), r = kc(
      e,
      n,
      l,
      b,
      d,
      c
    ), _ = Vc(), e !== null && !kt ? (Yc(e, n, c), Va(e, n, c)) : (Fe && _ && xc(n), n.flags |= 1, ln(e, n, r, c), n.child);
  }
  function Hg(e, n, l, r, c) {
    if (e === null) {
      var d = l.type;
      return typeof d == "function" && !yc(d) && d.defaultProps === void 0 && l.compare === null ? (n.tag = 15, n.type = d, Bg(
        e,
        n,
        d,
        r,
        c
      )) : (e = Ko(
        l.type,
        null,
        r,
        n,
        n.mode,
        c
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, !hf(e, c)) {
      var b = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : xr, l(b, r) && e.ref === n.ref)
        return Va(e, n, c);
    }
    return n.flags |= 1, e = ja(d, r), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Bg(e, n, l, r, c) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (xr(d, r) && e.ref === n.ref)
        if (kt = !1, n.pendingProps = r = d, hf(e, c))
          (e.flags & 131072) !== 0 && (kt = !0);
        else
          return n.lanes = e.lanes, Va(e, n, c);
    }
    return rf(
      e,
      n,
      l,
      r,
      c
    );
  }
  function Ug(e, n, l, r) {
    var c = r.children, d = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | l : l, e !== null) {
          for (r = n.child = e.child, c = 0; r !== null; )
            c = c | r.lanes | r.childLanes, r = r.sibling;
          r = c & ~d;
        } else r = 0, n.child = null;
        return kg(
          e,
          n,
          d,
          l,
          r
        );
      }
      if ((l & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Wo(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? Ym(n, d) : Lc(), Gm(n);
      else
        return r = n.lanes = 536870912, kg(
          e,
          n,
          d !== null ? d.baseLanes | l : l,
          l,
          r
        );
    } else
      d !== null ? (Wo(n, d.cachePool), Ym(n, d), pl(), n.memoizedState = null) : (e !== null && Wo(n, null), Lc(), pl());
    return ln(e, n, c, l), n.child;
  }
  function Lr(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function kg(e, n, l, r, c) {
    var d = Rc();
    return d = d === null ? null : { parent: Bt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: l,
      cachePool: d
    }, e !== null && Wo(n, null), Lc(), Gm(n), e !== null && _i(e, n, r, !0), n.childLanes = c, null;
  }
  function gs(e, n) {
    return n = ys(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Vg(e, n, l) {
    return Kl(n, e.child, null, l), e = gs(n, n.pendingProps), e.flags |= 2, zn(n), n.memoizedState = null, e;
  }
  function NS(e, n, l) {
    var r = n.pendingProps, c = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Fe) {
        if (r.mode === "hidden")
          return e = gs(n, r), n.lanes = 536870912, Lr(null, e);
        if (Bc(n), (e = vt) ? (e = Pp(
          e,
          Zn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: sl !== null ? { id: va, overflow: ba } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Em(e), l.return = n, n.child = l, nn = n, vt = null)) : e = null, e === null) throw cl(n);
        return n.lanes = 536870912, null;
      }
      return gs(n, r);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var b = d.dehydrated;
      if (Bc(n), c)
        if (n.flags & 256)
          n.flags &= -257, n = Vg(
            e,
            n,
            l
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(o(558));
      else if (kt || _i(e, n, l, !1), c = (l & e.childLanes) !== 0, kt || c) {
        if (r = gt, r !== null && (b = H(r, l), b !== 0 && b !== d.retryLane))
          throw d.retryLane = b, Yl(e, b), wn(r, e, b), lf;
        Ms(), n = Vg(
          e,
          n,
          l
        );
      } else
        e = d.treeContext, vt = In(b.nextSibling), nn = n, Fe = !0, ul = null, Zn = !1, e !== null && Mm(n, e), n = gs(n, r), n.flags |= 4096;
      return n;
    }
    return e = ja(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function ps(e, n) {
    var l = n.ref;
    if (l === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(o(284));
      (e === null || e.ref !== l) && (n.flags |= 4194816);
    }
  }
  function rf(e, n, l, r, c) {
    return Xl(n), l = kc(
      e,
      n,
      l,
      r,
      void 0,
      c
    ), r = Vc(), e !== null && !kt ? (Yc(e, n, c), Va(e, n, c)) : (Fe && r && xc(n), n.flags |= 1, ln(e, n, l, c), n.child);
  }
  function Yg(e, n, l, r, c, d) {
    return Xl(n), n.updateQueue = null, l = $m(
      n,
      r,
      l,
      c
    ), qm(e), r = Vc(), e !== null && !kt ? (Yc(e, n, d), Va(e, n, d)) : (Fe && r && xc(n), n.flags |= 1, ln(e, n, l, d), n.child);
  }
  function Gg(e, n, l, r, c) {
    if (Xl(n), n.stateNode === null) {
      var d = xi, b = l.contextType;
      typeof b == "object" && b !== null && (d = an(b)), d = new l(r, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = nf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = r, d.state = n.memoizedState, d.refs = {}, Dc(n), b = l.contextType, d.context = typeof b == "object" && b !== null ? an(b) : xi, d.state = n.memoizedState, b = l.getDerivedStateFromProps, typeof b == "function" && (tf(
        n,
        l,
        b,
        r
      ), d.state = n.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (b = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), b !== d.state && nf.enqueueReplaceState(d, d.state, null), Ar(n, r, d, c), Rr(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !0;
    } else if (e === null) {
      d = n.stateNode;
      var _ = n.memoizedProps, B = Jl(l, _);
      d.props = B;
      var ne = d.context, ue = l.contextType;
      b = xi, typeof ue == "object" && ue !== null && (b = an(ue));
      var fe = l.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", _ = n.pendingProps !== _, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (_ || ne !== b) && Cg(
        n,
        d,
        r,
        b
      ), dl = !1;
      var ie = n.memoizedState;
      d.state = ie, Ar(n, r, d, c), Rr(), ne = n.memoizedState, _ || ie !== ne || dl ? (typeof fe == "function" && (tf(
        n,
        l,
        fe,
        r
      ), ne = n.memoizedState), (B = dl || Tg(
        n,
        l,
        B,
        r,
        ie,
        ne,
        b
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = ne), d.props = r, d.state = ne, d.context = b, r = B) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
    } else {
      d = n.stateNode, zc(e, n), b = n.memoizedProps, ue = Jl(l, b), d.props = ue, fe = n.pendingProps, ie = d.context, ne = l.contextType, B = xi, typeof ne == "object" && ne !== null && (B = an(ne)), _ = l.getDerivedStateFromProps, (ne = typeof _ == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (b !== fe || ie !== B) && Cg(
        n,
        d,
        r,
        B
      ), dl = !1, ie = n.memoizedState, d.state = ie, Ar(n, r, d, c), Rr();
      var re = n.memoizedState;
      b !== fe || ie !== re || dl || e !== null && e.dependencies !== null && Jo(e.dependencies) ? (typeof _ == "function" && (tf(
        n,
        l,
        _,
        r
      ), re = n.memoizedState), (ue = dl || Tg(
        n,
        l,
        ue,
        r,
        ie,
        re,
        B
      ) || e !== null && e.dependencies !== null && Jo(e.dependencies)) ? (ne || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, re, B), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        r,
        re,
        B
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = re), d.props = r, d.state = re, d.context = B, r = ue) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), r = !1);
    }
    return d = r, ps(e, n), r = (n.flags & 128) !== 0, d || r ? (d = n.stateNode, l = r && typeof l.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && r ? (n.child = Kl(
      n,
      e.child,
      null,
      c
    ), n.child = Kl(
      n,
      null,
      l,
      c
    )) : ln(e, n, l, c), n.memoizedState = d.state, e = n.child) : e = Va(
      e,
      n,
      c
    ), e;
  }
  function qg(e, n, l, r) {
    return ql(), n.flags |= 256, ln(e, n, l, r), n.child;
  }
  var of = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sf(e) {
    return { baseLanes: e, cachePool: zm() };
  }
  function uf(e, n, l) {
    return e = e !== null ? e.childLanes & ~l : 0, n && (e |= jn), e;
  }
  function $g(e, n, l) {
    var r = n.pendingProps, c = !1, d = (n.flags & 128) !== 0, b;
    if ((b = d) || (b = e !== null && e.memoizedState === null ? !1 : (jt.current & 2) !== 0), b && (c = !0, n.flags &= -129), b = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Fe) {
        if (c ? gl(n) : pl(), (e = vt) ? (e = Pp(
          e,
          Zn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: sl !== null ? { id: va, overflow: ba } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Em(e), l.return = n, n.child = l, nn = n, vt = null)) : e = null, e === null) throw cl(n);
        return Xf(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var _ = r.children;
      return r = r.fallback, c ? (pl(), c = n.mode, _ = ys(
        { mode: "hidden", children: _ },
        c
      ), r = Gl(
        r,
        c,
        l,
        null
      ), _.return = n, r.return = n, _.sibling = r, n.child = _, r = n.child, r.memoizedState = sf(l), r.childLanes = uf(
        e,
        b,
        l
      ), n.memoizedState = of, Lr(null, r)) : (gl(n), cf(n, _));
    }
    var B = e.memoizedState;
    if (B !== null && (_ = B.dehydrated, _ !== null)) {
      if (d)
        n.flags & 256 ? (gl(n), n.flags &= -257, n = ff(
          e,
          n,
          l
        )) : n.memoizedState !== null ? (pl(), n.child = e.child, n.flags |= 128, n = null) : (pl(), _ = r.fallback, c = n.mode, r = ys(
          { mode: "visible", children: r.children },
          c
        ), _ = Gl(
          _,
          c,
          l,
          null
        ), _.flags |= 2, r.return = n, _.return = n, r.sibling = _, n.child = r, Kl(
          n,
          e.child,
          null,
          l
        ), r = n.child, r.memoizedState = sf(l), r.childLanes = uf(
          e,
          b,
          l
        ), n.memoizedState = of, n = Lr(null, r));
      else if (gl(n), Xf(_)) {
        if (b = _.nextSibling && _.nextSibling.dataset, b) var ne = b.dgst;
        b = ne, r = Error(o(419)), r.stack = "", r.digest = b, Er({ value: r, source: null, stack: null }), n = ff(
          e,
          n,
          l
        );
      } else if (kt || _i(e, n, l, !1), b = (l & e.childLanes) !== 0, kt || b) {
        if (b = gt, b !== null && (r = H(b, l), r !== 0 && r !== B.retryLane))
          throw B.retryLane = r, Yl(e, r), wn(b, e, r), lf;
        $f(_) || Ms(), n = ff(
          e,
          n,
          l
        );
      } else
        $f(_) ? (n.flags |= 192, n.child = e.child, n = null) : (e = B.treeContext, vt = In(
          _.nextSibling
        ), nn = n, Fe = !0, ul = null, Zn = !1, e !== null && Mm(n, e), n = cf(
          n,
          r.children
        ), n.flags |= 4096);
      return n;
    }
    return c ? (pl(), _ = r.fallback, c = n.mode, B = e.child, ne = B.sibling, r = ja(B, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = B.subtreeFlags & 65011712, ne !== null ? _ = ja(
      ne,
      _
    ) : (_ = Gl(
      _,
      c,
      l,
      null
    ), _.flags |= 2), _.return = n, r.return = n, r.sibling = _, n.child = r, Lr(null, r), r = n.child, _ = e.child.memoizedState, _ === null ? _ = sf(l) : (c = _.cachePool, c !== null ? (B = Bt._currentValue, c = c.parent !== B ? { parent: B, pool: B } : c) : c = zm(), _ = {
      baseLanes: _.baseLanes | l,
      cachePool: c
    }), r.memoizedState = _, r.childLanes = uf(
      e,
      b,
      l
    ), n.memoizedState = of, Lr(e.child, r)) : (gl(n), l = e.child, e = l.sibling, l = ja(l, {
      mode: "visible",
      children: r.children
    }), l.return = n, l.sibling = null, e !== null && (b = n.deletions, b === null ? (n.deletions = [e], n.flags |= 16) : b.push(e)), n.child = l, n.memoizedState = null, l);
  }
  function cf(e, n) {
    return n = ys(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function ys(e, n) {
    return e = An(22, e, null, n), e.lanes = 0, e;
  }
  function ff(e, n, l) {
    return Kl(n, e.child, null, l), e = cf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Xg(e, n, l) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n), Nc(e.return, n, l);
  }
  function df(e, n, l, r, c, d) {
    var b = e.memoizedState;
    b === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: l,
      tailMode: c,
      treeForkCount: d
    } : (b.isBackwards = n, b.rendering = null, b.renderingStartTime = 0, b.last = r, b.tail = l, b.tailMode = c, b.treeForkCount = d);
  }
  function Zg(e, n, l) {
    var r = n.pendingProps, c = r.revealOrder, d = r.tail;
    r = r.children;
    var b = jt.current, _ = (b & 2) !== 0;
    if (_ ? (b = b & 1 | 2, n.flags |= 128) : b &= 1, K(jt, b), ln(e, n, r, l), r = Fe ? wr : 0, !_ && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Xg(e, l, n);
        else if (e.tag === 19)
          Xg(e, l, n);
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
        for (l = n.child, c = null; l !== null; )
          e = l.alternate, e !== null && is(e) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = n.child, n.child = null) : (c = l.sibling, l.sibling = null), df(
          n,
          !1,
          c,
          l,
          d,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, c = n.child, n.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && is(e) === null) {
            n.child = c;
            break;
          }
          e = c.sibling, c.sibling = l, l = c, c = e;
        }
        df(
          n,
          !0,
          l,
          null,
          d,
          r
        );
        break;
      case "together":
        df(
          n,
          !1,
          null,
          null,
          void 0,
          r
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Va(e, n, l) {
    if (e !== null && (n.dependencies = e.dependencies), bl |= n.lanes, (l & n.childLanes) === 0)
      if (e !== null) {
        if (_i(
          e,
          n,
          l,
          !1
        ), (l & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(o(153));
    if (n.child !== null) {
      for (e = n.child, l = ja(e, e.pendingProps), n.child = l, l.return = n; e.sibling !== null; )
        e = e.sibling, l = l.sibling = ja(e, e.pendingProps), l.return = n;
      l.sibling = null;
    }
    return n.child;
  }
  function hf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Jo(e)));
  }
  function MS(e, n, l) {
    switch (n.tag) {
      case 3:
        ee(n, n.stateNode.containerInfo), fl(n, Bt, e.memoizedState.cache), ql();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        ee(n, n.stateNode.containerInfo);
        break;
      case 10:
        fl(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Bc(n), null;
        break;
      case 13:
        var r = n.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (gl(n), n.flags |= 128, null) : (l & n.child.childLanes) !== 0 ? $g(e, n, l) : (gl(n), e = Va(
            e,
            n,
            l
          ), e !== null ? e.sibling : null);
        gl(n);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (r = (l & n.childLanes) !== 0, r || (_i(
          e,
          n,
          l,
          !1
        ), r = (l & n.childLanes) !== 0), c) {
          if (r)
            return Zg(
              e,
              n,
              l
            );
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), K(jt, jt.current), r) break;
        return null;
      case 22:
        return n.lanes = 0, Ug(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        fl(n, Bt, e.memoizedState.cache);
    }
    return Va(e, n, l);
  }
  function Qg(e, n, l) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        kt = !0;
      else {
        if (!hf(e, l) && (n.flags & 128) === 0)
          return kt = !1, MS(
            e,
            n,
            l
          );
        kt = (e.flags & 131072) !== 0;
      }
    else
      kt = !1, Fe && (n.flags & 1048576) !== 0 && Nm(n, wr, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var r = n.pendingProps;
          if (e = Ql(n.elementType), n.type = e, typeof e == "function")
            yc(e) ? (r = Jl(e, r), n.tag = 1, n = Gg(
              null,
              n,
              e,
              r,
              l
            )) : (n.tag = 0, n = rf(
              null,
              n,
              e,
              r,
              l
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === z) {
                n.tag = 11, n = Lg(
                  null,
                  n,
                  e,
                  r,
                  l
                );
                break e;
              } else if (c === V) {
                n.tag = 14, n = Hg(
                  null,
                  n,
                  e,
                  r,
                  l
                );
                break e;
              }
            }
            throw n = j(e) || e, Error(o(306, n, ""));
          }
        }
        return n;
      case 0:
        return rf(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 1:
        return r = n.type, c = Jl(
          r,
          n.pendingProps
        ), Gg(
          e,
          n,
          r,
          c,
          l
        );
      case 3:
        e: {
          if (ee(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          r = n.pendingProps;
          var d = n.memoizedState;
          c = d.element, zc(e, n), Ar(n, r, null, l);
          var b = n.memoizedState;
          if (r = b.cache, fl(n, Bt, r), r !== d.cache && Mc(
            n,
            [Bt],
            l,
            !0
          ), Rr(), r = b.element, d.isDehydrated)
            if (d = {
              element: r,
              isDehydrated: !1,
              cache: b.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = qg(
                e,
                n,
                r,
                l
              );
              break e;
            } else if (r !== c) {
              c = qn(
                Error(o(424)),
                n
              ), Er(c), n = qg(
                e,
                n,
                r,
                l
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
              for (vt = In(e.firstChild), nn = n, Fe = !0, ul = null, Zn = !0, l = Um(
                n,
                null,
                r,
                l
              ), n.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (ql(), r === c) {
              n = Va(
                e,
                n,
                l
              );
              break e;
            }
            ln(e, n, r, l);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ps(e, n), e === null ? (l = l0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = l : Fe || (l = n.type, e = n.pendingProps, r = Os(
          me.current
        ).createElement(l), r[ve] = n, r[xe] = e, rn(r, l, e), Ke(r), n.stateNode = r) : n.memoizedState = l0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && Fe && (r = n.stateNode = t0(
          n.type,
          n.pendingProps,
          me.current
        ), nn = n, Zn = !0, c = vt, _l(n.type) ? (Zf = c, vt = In(r.firstChild)) : vt = c), ln(
          e,
          n,
          n.pendingProps.children,
          l
        ), ps(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Fe && ((c = r = vt) && (r = nw(
          r,
          n.type,
          n.pendingProps,
          Zn
        ), r !== null ? (n.stateNode = r, nn = n, vt = In(r.firstChild), Zn = !1, c = !0) : c = !1), c || cl(n)), ze(n), c = n.type, d = n.pendingProps, b = e !== null ? e.memoizedProps : null, r = d.children, Yf(c, d) ? r = null : b !== null && Yf(c, b) && (n.flags |= 32), n.memoizedState !== null && (c = kc(
          e,
          n,
          yS,
          null,
          null,
          l
        ), Fr._currentValue = c), ps(e, n), ln(e, n, r, l), n.child;
      case 6:
        return e === null && Fe && ((e = l = vt) && (l = aw(
          l,
          n.pendingProps,
          Zn
        ), l !== null ? (n.stateNode = l, nn = n, vt = null, e = !0) : e = !1), e || cl(n)), null;
      case 13:
        return $g(e, n, l);
      case 4:
        return ee(
          n,
          n.stateNode.containerInfo
        ), r = n.pendingProps, e === null ? n.child = Kl(
          n,
          null,
          r,
          l
        ) : ln(e, n, r, l), n.child;
      case 11:
        return Lg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 7:
        return ln(
          e,
          n,
          n.pendingProps,
          l
        ), n.child;
      case 8:
        return ln(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 12:
        return ln(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 10:
        return r = n.pendingProps, fl(n, n.type, r.value), ln(e, n, r.children, l), n.child;
      case 9:
        return c = n.type._context, r = n.pendingProps.children, Xl(n), c = an(c), r = r(c), n.flags |= 1, ln(e, n, r, l), n.child;
      case 14:
        return Hg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 15:
        return Bg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 19:
        return Zg(e, n, l);
      case 31:
        return NS(e, n, l);
      case 22:
        return Ug(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        return Xl(n), r = an(Bt), e === null ? (c = Rc(), c === null && (c = gt, d = Tc(), c.pooledCache = d, d.refCount++, d !== null && (c.pooledCacheLanes |= l), c = d), n.memoizedState = { parent: r, cache: c }, Dc(n), fl(n, Bt, c)) : ((e.lanes & l) !== 0 && (zc(e, n), Ar(n, null, null, l), Rr()), c = e.memoizedState, d = n.memoizedState, c.parent !== r ? (c = { parent: r, cache: r }, n.memoizedState = c, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c), fl(n, Bt, r)) : (r = d.cache, fl(n, Bt, r), r !== c.cache && Mc(
          n,
          [Bt],
          l,
          !0
        ))), ln(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(o(156, n.tag));
  }
  function Ya(e) {
    e.flags |= 4;
  }
  function mf(e, n, l, r, c) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (xp()) e.flags |= 8192;
        else
          throw Il = ts, Ac;
    } else e.flags &= -16777217;
  }
  function Ig(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !u0(n))
      if (xp()) e.flags |= 8192;
      else
        throw Il = ts, Ac;
  }
  function vs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Ot() : 536870912, e.lanes |= n, Hi |= n);
  }
  function Hr(e, n) {
    if (!Fe)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var r = null; l !== null; )
            l.alternate !== null && (r = l), l = l.sibling;
          r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function bt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, l = 0, r = 0;
    if (n)
      for (var c = e.child; c !== null; )
        l |= c.lanes | c.childLanes, r |= c.subtreeFlags & 65011712, r |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        l |= c.lanes | c.childLanes, r |= c.subtreeFlags, r |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= r, e.childLanes = l, n;
  }
  function TS(e, n, l) {
    var r = n.pendingProps;
    switch (Sc(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bt(n), null;
      case 1:
        return bt(n), null;
      case 3:
        return l = n.stateNode, r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ba(Bt), pe(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Ei(n) ? Ya(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Ec())), bt(n), null;
      case 26:
        var c = n.type, d = n.memoizedState;
        return e === null ? (Ya(n), d !== null ? (bt(n), Ig(n, d)) : (bt(n), mf(
          n,
          c,
          null,
          r,
          l
        ))) : d ? d !== e.memoizedState ? (Ya(n), bt(n), Ig(n, d)) : (bt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== r && Ya(n), bt(n), mf(
          n,
          c,
          e,
          r,
          l
        )), null;
      case 27:
        if (Ae(n), l = me.current, c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && Ya(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(o(166));
            return bt(n), null;
          }
          e = ae.current, Ei(n) ? Tm(n) : (e = t0(c, r, l), n.stateNode = e, Ya(n));
        }
        return bt(n), null;
      case 5:
        if (Ae(n), c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== r && Ya(n);
        else {
          if (!r) {
            if (n.stateNode === null)
              throw Error(o(166));
            return bt(n), null;
          }
          if (d = ae.current, Ei(n))
            Tm(n);
          else {
            var b = Os(
              me.current
            );
            switch (d) {
              case 1:
                d = b.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                d = b.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    d = b.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    d = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    d = b.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof r.is == "string" ? b.createElement("select", {
                      is: r.is
                    }) : b.createElement("select"), r.multiple ? d.multiple = !0 : r.size && (d.size = r.size);
                    break;
                  default:
                    d = typeof r.is == "string" ? b.createElement(c, { is: r.is }) : b.createElement(c);
                }
            }
            d[ve] = n, d[xe] = r;
            e: for (b = n.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6)
                d.appendChild(b.stateNode);
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
            n.stateNode = d;
            e: switch (rn(d, c, r), c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
            r && Ya(n);
          }
        }
        return bt(n), mf(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          l
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== r && Ya(n);
        else {
          if (typeof r != "string" && n.stateNode === null)
            throw Error(o(166));
          if (e = me.current, Ei(n)) {
            if (e = n.stateNode, l = n.memoizedProps, r = null, c = nn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  r = c.memoizedProps;
              }
            e[ve] = n, e = !!(e.nodeValue === l || r !== null && r.suppressHydrationWarning === !0 || $p(e.nodeValue, l)), e || cl(n, !0);
          } else
            e = Os(e).createTextNode(
              r
            ), e[ve] = n, n.stateNode = e;
        }
        return bt(n), null;
      case 31:
        if (l = n.memoizedState, e === null || e.memoizedState !== null) {
          if (r = Ei(n), l !== null) {
            if (e === null) {
              if (!r) throw Error(o(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ve] = n;
            } else
              ql(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), e = !1;
          } else
            l = Ec(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return n.flags & 256 ? (zn(n), n) : (zn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(o(558));
        }
        return bt(n), null;
      case 13:
        if (r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = Ei(n), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(o(318));
              if (c = n.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(o(317));
              c[ve] = n;
            } else
              ql(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), c = !1;
          } else
            c = Ec(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return n.flags & 256 ? (zn(n), n) : (zn(n), null);
        }
        return zn(n), (n.flags & 128) !== 0 ? (n.lanes = l, n) : (l = r !== null, e = e !== null && e.memoizedState !== null, l && (r = n.child, c = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (c = r.alternate.memoizedState.cachePool.pool), d = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (d = r.memoizedState.cachePool.pool), d !== c && (r.flags |= 2048)), l !== e && l && (n.child.flags |= 8192), vs(n, n.updateQueue), bt(n), null);
      case 4:
        return pe(), e === null && Hf(n.stateNode.containerInfo), bt(n), null;
      case 10:
        return Ba(n.type), bt(n), null;
      case 19:
        if (k(jt), r = n.memoizedState, r === null) return bt(n), null;
        if (c = (n.flags & 128) !== 0, d = r.rendering, d === null)
          if (c) Hr(r, !1);
          else {
            if (Dt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = is(e), d !== null) {
                  for (n.flags |= 128, Hr(r, !1), e = d.updateQueue, n.updateQueue = e, vs(n, e), n.subtreeFlags = 0, e = l, l = n.child; l !== null; )
                    wm(l, e), l = l.sibling;
                  return K(
                    jt,
                    jt.current & 1 | 2
                  ), Fe && La(n, r.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            r.tail !== null && yt() > Es && (n.flags |= 128, c = !0, Hr(r, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = is(d), e !== null) {
              if (n.flags |= 128, c = !0, e = e.updateQueue, n.updateQueue = e, vs(n, e), Hr(r, !0), r.tail === null && r.tailMode === "hidden" && !d.alternate && !Fe)
                return bt(n), null;
            } else
              2 * yt() - r.renderingStartTime > Es && l !== 536870912 && (n.flags |= 128, c = !0, Hr(r, !1), n.lanes = 4194304);
          r.isBackwards ? (d.sibling = n.child, n.child = d) : (e = r.last, e !== null ? e.sibling = d : n.child = d, r.last = d);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = yt(), e.sibling = null, l = jt.current, K(
          jt,
          c ? l & 1 | 2 : l & 1
        ), Fe && La(n, r.treeForkCount), e) : (bt(n), null);
      case 22:
      case 23:
        return zn(n), Hc(), r = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (n.flags |= 8192) : r && (n.flags |= 8192), r ? (l & 536870912) !== 0 && (n.flags & 128) === 0 && (bt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : bt(n), l = n.updateQueue, l !== null && vs(n, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== l && (n.flags |= 2048), e !== null && k(Zl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ba(Bt), bt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function CS(e, n) {
    switch (Sc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ba(Bt), pe(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ae(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (zn(n), n.alternate === null)
            throw Error(o(340));
          ql();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (zn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(o(340));
          ql();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return k(jt), null;
      case 4:
        return pe(), null;
      case 10:
        return Ba(n.type), null;
      case 22:
      case 23:
        return zn(n), Hc(), e !== null && k(Zl), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ba(Bt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kg(e, n) {
    switch (Sc(n), n.tag) {
      case 3:
        Ba(Bt), pe();
        break;
      case 26:
      case 27:
      case 5:
        Ae(n);
        break;
      case 4:
        pe();
        break;
      case 31:
        n.memoizedState !== null && zn(n);
        break;
      case 13:
        zn(n);
        break;
      case 19:
        k(jt);
        break;
      case 10:
        Ba(n.type);
        break;
      case 22:
      case 23:
        zn(n), Hc(), e !== null && k(Zl);
        break;
      case 24:
        Ba(Bt);
    }
  }
  function Br(e, n) {
    try {
      var l = n.updateQueue, r = l !== null ? l.lastEffect : null;
      if (r !== null) {
        var c = r.next;
        l = c;
        do {
          if ((l.tag & e) === e) {
            r = void 0;
            var d = l.create, b = l.inst;
            r = d(), b.destroy = r;
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (_) {
      ct(n, n.return, _);
    }
  }
  function yl(e, n, l) {
    try {
      var r = n.updateQueue, c = r !== null ? r.lastEffect : null;
      if (c !== null) {
        var d = c.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            var b = r.inst, _ = b.destroy;
            if (_ !== void 0) {
              b.destroy = void 0, c = n;
              var B = l, ne = _;
              try {
                ne();
              } catch (ue) {
                ct(
                  c,
                  B,
                  ue
                );
              }
            }
          }
          r = r.next;
        } while (r !== d);
      }
    } catch (ue) {
      ct(n, n.return, ue);
    }
  }
  function Fg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var l = e.stateNode;
      try {
        Vm(n, l);
      } catch (r) {
        ct(e, e.return, r);
      }
    }
  }
  function Jg(e, n, l) {
    l.props = Jl(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (r) {
      ct(e, n, r);
    }
  }
  function Ur(e, n) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(r) : l.current = r;
      }
    } catch (c) {
      ct(e, n, c);
    }
  }
  function xa(e, n) {
    var l = e.ref, r = e.refCleanup;
    if (l !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (c) {
          ct(e, n, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (c) {
          ct(e, n, c);
        }
      else l.current = null;
  }
  function Pg(e) {
    var n = e.type, l = e.memoizedProps, r = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && r.focus();
          break e;
        case "img":
          l.src ? r.src = l.src : l.srcSet && (r.srcset = l.srcSet);
      }
    } catch (c) {
      ct(e, e.return, c);
    }
  }
  function gf(e, n, l) {
    try {
      var r = e.stateNode;
      FS(r, e.type, l, n), r[xe] = n;
    } catch (c) {
      ct(e, e.return, c);
    }
  }
  function Wg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && _l(e.type) || e.tag === 4;
  }
  function pf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Wg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && _l(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function yf(e, n, l) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, n) : (n = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, n.appendChild(e), l = l._reactRootContainer, l != null || n.onclick !== null || (n.onclick = za));
    else if (r !== 4 && (r === 27 && _l(e.type) && (l = e.stateNode, n = null), e = e.child, e !== null))
      for (yf(e, n, l), e = e.sibling; e !== null; )
        yf(e, n, l), e = e.sibling;
  }
  function bs(e, n, l) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? l.insertBefore(e, n) : l.appendChild(e);
    else if (r !== 4 && (r === 27 && _l(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (bs(e, n, l), e = e.sibling; e !== null; )
        bs(e, n, l), e = e.sibling;
  }
  function ep(e) {
    var n = e.stateNode, l = e.memoizedProps;
    try {
      for (var r = e.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      rn(n, r, l), n[ve] = e, n[xe] = l;
    } catch (d) {
      ct(e, e.return, d);
    }
  }
  var Ga = !1, Vt = !1, vf = !1, tp = typeof WeakSet == "function" ? WeakSet : Set, Kt = null;
  function RS(e, n) {
    if (e = e.containerInfo, kf = Vs, e = hm(e), cc(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var r = l.getSelection && l.getSelection();
          if (r && r.rangeCount !== 0) {
            l = r.anchorNode;
            var c = r.anchorOffset, d = r.focusNode;
            r = r.focusOffset;
            try {
              l.nodeType, d.nodeType;
            } catch {
              l = null;
              break e;
            }
            var b = 0, _ = -1, B = -1, ne = 0, ue = 0, fe = e, ie = null;
            t: for (; ; ) {
              for (var re; fe !== l || c !== 0 && fe.nodeType !== 3 || (_ = b + c), fe !== d || r !== 0 && fe.nodeType !== 3 || (B = b + r), fe.nodeType === 3 && (b += fe.nodeValue.length), (re = fe.firstChild) !== null; )
                ie = fe, fe = re;
              for (; ; ) {
                if (fe === e) break t;
                if (ie === l && ++ne === c && (_ = b), ie === d && ++ue === r && (B = b), (re = fe.nextSibling) !== null) break;
                fe = ie, ie = fe.parentNode;
              }
              fe = re;
            }
            l = _ === -1 || B === -1 ? null : { start: _, end: B };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Vf = { focusedElem: e, selectionRange: l }, Vs = !1, Kt = n; Kt !== null; )
      if (n = Kt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Kt = e;
      else
        for (; Kt !== null; ) {
          switch (n = Kt, d = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  c = e[l], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, l = n, c = d.memoizedProps, d = d.memoizedState, r = l.stateNode;
                try {
                  var _e = Jl(
                    l.type,
                    c
                  );
                  e = r.getSnapshotBeforeUpdate(
                    _e,
                    d
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (je) {
                  ct(
                    l,
                    l.return,
                    je
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, l = e.nodeType, l === 9)
                  qf(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      qf(e);
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
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, Kt = e;
            break;
          }
          Kt = n.return;
        }
  }
  function np(e, n, l) {
    var r = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        $a(e, l), r & 4 && Br(5, l);
        break;
      case 1:
        if ($a(e, l), r & 4)
          if (e = l.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (b) {
              ct(l, l.return, b);
            }
          else {
            var c = Jl(
              l.type,
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
              ct(
                l,
                l.return,
                b
              );
            }
          }
        r & 64 && Fg(l), r & 512 && Ur(l, l.return);
        break;
      case 3:
        if ($a(e, l), r & 64 && (e = l.updateQueue, e !== null)) {
          if (n = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                n = l.child.stateNode;
                break;
              case 1:
                n = l.child.stateNode;
            }
          try {
            Vm(e, n);
          } catch (b) {
            ct(l, l.return, b);
          }
        }
        break;
      case 27:
        n === null && r & 4 && ep(l);
      case 26:
      case 5:
        $a(e, l), n === null && r & 4 && Pg(l), r & 512 && Ur(l, l.return);
        break;
      case 12:
        $a(e, l);
        break;
      case 31:
        $a(e, l), r & 4 && ip(e, l);
        break;
      case 13:
        $a(e, l), r & 4 && rp(e, l), r & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = US.bind(
          null,
          l
        ), lw(e, l))));
        break;
      case 22:
        if (r = l.memoizedState !== null || Ga, !r) {
          n = n !== null && n.memoizedState !== null || Vt, c = Ga;
          var d = Vt;
          Ga = r, (Vt = n) && !d ? Xa(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : $a(e, l), Ga = c, Vt = d;
        }
        break;
      case 30:
        break;
      default:
        $a(e, l);
    }
  }
  function ap(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, ap(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Je(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var xt = null, vn = !1;
  function qa(e, n, l) {
    for (l = l.child; l !== null; )
      lp(e, n, l), l = l.sibling;
  }
  function lp(e, n, l) {
    if ($t && typeof $t.onCommitFiberUnmount == "function")
      try {
        $t.onCommitFiberUnmount(Nn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Vt || xa(l, n), qa(
          e,
          n,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Vt || xa(l, n);
        var r = xt, c = vn;
        _l(l.type) && (xt = l.stateNode, vn = !1), qa(
          e,
          n,
          l
        ), Qr(l.stateNode), xt = r, vn = c;
        break;
      case 5:
        Vt || xa(l, n);
      case 6:
        if (r = xt, c = vn, xt = null, qa(
          e,
          n,
          l
        ), xt = r, vn = c, xt !== null)
          if (vn)
            try {
              (xt.nodeType === 9 ? xt.body : xt.nodeName === "HTML" ? xt.ownerDocument.body : xt).removeChild(l.stateNode);
            } catch (d) {
              ct(
                l,
                n,
                d
              );
            }
          else
            try {
              xt.removeChild(l.stateNode);
            } catch (d) {
              ct(
                l,
                n,
                d
              );
            }
        break;
      case 18:
        xt !== null && (vn ? (e = xt, Fp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), $i(e)) : Fp(xt, l.stateNode));
        break;
      case 4:
        r = xt, c = vn, xt = l.stateNode.containerInfo, vn = !0, qa(
          e,
          n,
          l
        ), xt = r, vn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        yl(2, l, n), Vt || yl(4, l, n), qa(
          e,
          n,
          l
        );
        break;
      case 1:
        Vt || (xa(l, n), r = l.stateNode, typeof r.componentWillUnmount == "function" && Jg(
          l,
          n,
          r
        )), qa(
          e,
          n,
          l
        );
        break;
      case 21:
        qa(
          e,
          n,
          l
        );
        break;
      case 22:
        Vt = (r = Vt) || l.memoizedState !== null, qa(
          e,
          n,
          l
        ), Vt = r;
        break;
      default:
        qa(
          e,
          n,
          l
        );
    }
  }
  function ip(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        $i(e);
      } catch (l) {
        ct(n, n.return, l);
      }
    }
  }
  function rp(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        $i(e);
      } catch (l) {
        ct(n, n.return, l);
      }
  }
  function AS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new tp()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new tp()), n;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function xs(e, n) {
    var l = AS(e);
    n.forEach(function(r) {
      if (!l.has(r)) {
        l.add(r);
        var c = kS.bind(null, e, r);
        r.then(c, c);
      }
    });
  }
  function bn(e, n) {
    var l = n.deletions;
    if (l !== null)
      for (var r = 0; r < l.length; r++) {
        var c = l[r], d = e, b = n, _ = b;
        e: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (_l(_.type)) {
                xt = _.stateNode, vn = !1;
                break e;
              }
              break;
            case 5:
              xt = _.stateNode, vn = !1;
              break e;
            case 3:
            case 4:
              xt = _.stateNode.containerInfo, vn = !0;
              break e;
          }
          _ = _.return;
        }
        if (xt === null) throw Error(o(160));
        lp(d, b, c), xt = null, vn = !1, d = c.alternate, d !== null && (d.return = null), c.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        op(n, e), n = n.sibling;
  }
  var ra = null;
  function op(e, n) {
    var l = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        bn(n, e), xn(e), r & 4 && (yl(3, e, e.return), Br(3, e), yl(5, e, e.return));
        break;
      case 1:
        bn(n, e), xn(e), r & 512 && (Vt || l === null || xa(l, l.return)), r & 64 && Ga && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? r : l.concat(r))));
        break;
      case 26:
        var c = ra;
        if (bn(n, e), xn(e), r & 512 && (Vt || l === null || xa(l, l.return)), r & 4) {
          var d = l !== null ? l.memoizedState : null;
          if (r = e.memoizedState, l === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, l = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (r) {
                    case "title":
                      d = c.getElementsByTagName("title")[0], (!d || d[Ye] || d[ve] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = c.createElement(r), c.head.insertBefore(
                        d,
                        c.querySelector("head > title")
                      )), rn(d, r, l), d[ve] = e, Ke(d), r = d;
                      break e;
                    case "link":
                      var b = o0(
                        "link",
                        "href",
                        c
                      ).get(r + (l.href || ""));
                      if (b) {
                        for (var _ = 0; _ < b.length; _++)
                          if (d = b[_], d.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && d.getAttribute("rel") === (l.rel == null ? null : l.rel) && d.getAttribute("title") === (l.title == null ? null : l.title) && d.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            b.splice(_, 1);
                            break t;
                          }
                      }
                      d = c.createElement(r), rn(d, r, l), c.head.appendChild(d);
                      break;
                    case "meta":
                      if (b = o0(
                        "meta",
                        "content",
                        c
                      ).get(r + (l.content || ""))) {
                        for (_ = 0; _ < b.length; _++)
                          if (d = b[_], d.getAttribute("content") === (l.content == null ? null : "" + l.content) && d.getAttribute("name") === (l.name == null ? null : l.name) && d.getAttribute("property") === (l.property == null ? null : l.property) && d.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && d.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            b.splice(_, 1);
                            break t;
                          }
                      }
                      d = c.createElement(r), rn(d, r, l), c.head.appendChild(d);
                      break;
                    default:
                      throw Error(o(468, r));
                  }
                  d[ve] = e, Ke(d), r = d;
                }
                e.stateNode = r;
              } else
                s0(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = r0(
                c,
                r,
                e.memoizedProps
              );
          else
            d !== r ? (d === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : d.count--, r === null ? s0(
              c,
              e.type,
              e.stateNode
            ) : r0(
              c,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && gf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        bn(n, e), xn(e), r & 512 && (Vt || l === null || xa(l, l.return)), l !== null && r & 4 && gf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (bn(n, e), xn(e), r & 512 && (Vt || l === null || xa(l, l.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            hi(c, "");
          } catch (_e) {
            ct(e, e.return, _e);
          }
        }
        r & 4 && e.stateNode != null && (c = e.memoizedProps, gf(
          e,
          c,
          l !== null ? l.memoizedProps : c
        )), r & 1024 && (vf = !0);
        break;
      case 6:
        if (bn(n, e), xn(e), r & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          r = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = r;
          } catch (_e) {
            ct(e, e.return, _e);
          }
        }
        break;
      case 3:
        if (Hs = null, c = ra, ra = js(n.containerInfo), bn(n, e), ra = c, xn(e), r & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            $i(n.containerInfo);
          } catch (_e) {
            ct(e, e.return, _e);
          }
        vf && (vf = !1, sp(e));
        break;
      case 4:
        r = ra, ra = js(
          e.stateNode.containerInfo
        ), bn(n, e), xn(e), ra = r;
        break;
      case 12:
        bn(n, e), xn(e);
        break;
      case 31:
        bn(n, e), xn(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xs(e, r)));
        break;
      case 13:
        bn(n, e), xn(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ws = yt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xs(e, r)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var B = l !== null && l.memoizedState !== null, ne = Ga, ue = Vt;
        if (Ga = ne || c, Vt = ue || B, bn(n, e), Vt = ue, Ga = ne, xn(e), r & 8192)
          e: for (n = e.stateNode, n._visibility = c ? n._visibility & -2 : n._visibility | 1, c && (l === null || B || Ga || Vt || Pl(e)), l = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (l === null) {
                B = l = n;
                try {
                  if (d = B.stateNode, c)
                    b = d.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    _ = B.stateNode;
                    var fe = B.memoizedProps.style, ie = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    _.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (_e) {
                  ct(B, B.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (l === null) {
                B = n;
                try {
                  B.stateNode.nodeValue = c ? "" : B.memoizedProps;
                } catch (_e) {
                  ct(B, B.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (l === null) {
                B = n;
                try {
                  var re = B.stateNode;
                  c ? Jp(re, !0) : Jp(B.stateNode, !1);
                } catch (_e) {
                  ct(B, B.return, _e);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              l === n && (l = null), n = n.return;
            }
            l === n && (l = null), n.sibling.return = n.return, n = n.sibling;
          }
        r & 4 && (r = e.updateQueue, r !== null && (l = r.retryQueue, l !== null && (r.retryQueue = null, xs(e, l))));
        break;
      case 19:
        bn(n, e), xn(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, xs(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        bn(n, e), xn(e);
    }
  }
  function xn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var l, r = e.return; r !== null; ) {
          if (Wg(r)) {
            l = r;
            break;
          }
          r = r.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var c = l.stateNode, d = pf(e);
            bs(e, d, c);
            break;
          case 5:
            var b = l.stateNode;
            l.flags & 32 && (hi(b, ""), l.flags &= -33);
            var _ = pf(e);
            bs(e, _, b);
            break;
          case 3:
          case 4:
            var B = l.stateNode.containerInfo, ne = pf(e);
            yf(
              e,
              ne,
              B
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (ue) {
        ct(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function sp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        sp(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function $a(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        np(e, n.alternate, n), n = n.sibling;
  }
  function Pl(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          yl(4, n, n.return), Pl(n);
          break;
        case 1:
          xa(n, n.return);
          var l = n.stateNode;
          typeof l.componentWillUnmount == "function" && Jg(
            n,
            n.return,
            l
          ), Pl(n);
          break;
        case 27:
          Qr(n.stateNode);
        case 26:
        case 5:
          xa(n, n.return), Pl(n);
          break;
        case 22:
          n.memoizedState === null && Pl(n);
          break;
        case 30:
          Pl(n);
          break;
        default:
          Pl(n);
      }
      e = e.sibling;
    }
  }
  function Xa(e, n, l) {
    for (l = l && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var r = n.alternate, c = e, d = n, b = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Xa(
            c,
            d,
            l
          ), Br(4, d);
          break;
        case 1:
          if (Xa(
            c,
            d,
            l
          ), r = d, c = r.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (ne) {
              ct(r, r.return, ne);
            }
          if (r = d, c = r.updateQueue, c !== null) {
            var _ = r.stateNode;
            try {
              var B = c.shared.hiddenCallbacks;
              if (B !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < B.length; c++)
                  km(B[c], _);
            } catch (ne) {
              ct(r, r.return, ne);
            }
          }
          l && b & 64 && Fg(d), Ur(d, d.return);
          break;
        case 27:
          ep(d);
        case 26:
        case 5:
          Xa(
            c,
            d,
            l
          ), l && r === null && b & 4 && Pg(d), Ur(d, d.return);
          break;
        case 12:
          Xa(
            c,
            d,
            l
          );
          break;
        case 31:
          Xa(
            c,
            d,
            l
          ), l && b & 4 && ip(c, d);
          break;
        case 13:
          Xa(
            c,
            d,
            l
          ), l && b & 4 && rp(c, d);
          break;
        case 22:
          d.memoizedState === null && Xa(
            c,
            d,
            l
          ), Ur(d, d.return);
          break;
        case 30:
          break;
        default:
          Xa(
            c,
            d,
            l
          );
      }
      n = n.sibling;
    }
  }
  function bf(e, n) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && _r(l));
  }
  function xf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && _r(e));
  }
  function oa(e, n, l, r) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        up(
          e,
          n,
          l,
          r
        ), n = n.sibling;
  }
  function up(e, n, l, r) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        oa(
          e,
          n,
          l,
          r
        ), c & 2048 && Br(9, n);
        break;
      case 1:
        oa(
          e,
          n,
          l,
          r
        );
        break;
      case 3:
        oa(
          e,
          n,
          l,
          r
        ), c & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && _r(e)));
        break;
      case 12:
        if (c & 2048) {
          oa(
            e,
            n,
            l,
            r
          ), e = n.stateNode;
          try {
            var d = n.memoizedProps, b = d.id, _ = d.onPostCommit;
            typeof _ == "function" && _(
              b,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (B) {
            ct(n, n.return, B);
          }
        } else
          oa(
            e,
            n,
            l,
            r
          );
        break;
      case 31:
        oa(
          e,
          n,
          l,
          r
        );
        break;
      case 13:
        oa(
          e,
          n,
          l,
          r
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, b = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? oa(
          e,
          n,
          l,
          r
        ) : kr(e, n) : d._visibility & 2 ? oa(
          e,
          n,
          l,
          r
        ) : (d._visibility |= 2, Oi(
          e,
          n,
          l,
          r,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && bf(b, n);
        break;
      case 24:
        oa(
          e,
          n,
          l,
          r
        ), c & 2048 && xf(n.alternate, n);
        break;
      default:
        oa(
          e,
          n,
          l,
          r
        );
    }
  }
  function Oi(e, n, l, r, c) {
    for (c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, b = n, _ = l, B = r, ne = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Oi(
            d,
            b,
            _,
            B,
            c
          ), Br(8, b);
          break;
        case 23:
          break;
        case 22:
          var ue = b.stateNode;
          b.memoizedState !== null ? ue._visibility & 2 ? Oi(
            d,
            b,
            _,
            B,
            c
          ) : kr(
            d,
            b
          ) : (ue._visibility |= 2, Oi(
            d,
            b,
            _,
            B,
            c
          )), c && ne & 2048 && bf(
            b.alternate,
            b
          );
          break;
        case 24:
          Oi(
            d,
            b,
            _,
            B,
            c
          ), c && ne & 2048 && xf(b.alternate, b);
          break;
        default:
          Oi(
            d,
            b,
            _,
            B,
            c
          );
      }
      n = n.sibling;
    }
  }
  function kr(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var l = e, r = n, c = r.flags;
        switch (r.tag) {
          case 22:
            kr(l, r), c & 2048 && bf(
              r.alternate,
              r
            );
            break;
          case 24:
            kr(l, r), c & 2048 && xf(r.alternate, r);
            break;
          default:
            kr(l, r);
        }
        n = n.sibling;
      }
  }
  var Vr = 8192;
  function ji(e, n, l) {
    if (e.subtreeFlags & Vr)
      for (e = e.child; e !== null; )
        cp(
          e,
          n,
          l
        ), e = e.sibling;
  }
  function cp(e, n, l) {
    switch (e.tag) {
      case 26:
        ji(
          e,
          n,
          l
        ), e.flags & Vr && e.memoizedState !== null && pw(
          l,
          ra,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ji(
          e,
          n,
          l
        );
        break;
      case 3:
      case 4:
        var r = ra;
        ra = js(e.stateNode.containerInfo), ji(
          e,
          n,
          l
        ), ra = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Vr, Vr = 16777216, ji(
          e,
          n,
          l
        ), Vr = r) : ji(
          e,
          n,
          l
        ));
        break;
      default:
        ji(
          e,
          n,
          l
        );
    }
  }
  function fp(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function Yr(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var r = n[l];
          Kt = r, hp(
            r,
            e
          );
        }
      fp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        dp(e), e = e.sibling;
  }
  function dp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Yr(e), e.flags & 2048 && yl(9, e, e.return);
        break;
      case 3:
        Yr(e);
        break;
      case 12:
        Yr(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, Ss(e)) : Yr(e);
        break;
      default:
        Yr(e);
    }
  }
  function Ss(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var r = n[l];
          Kt = r, hp(
            r,
            e
          );
        }
      fp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          yl(8, n, n.return), Ss(n);
          break;
        case 22:
          l = n.stateNode, l._visibility & 2 && (l._visibility &= -3, Ss(n));
          break;
        default:
          Ss(n);
      }
      e = e.sibling;
    }
  }
  function hp(e, n) {
    for (; Kt !== null; ) {
      var l = Kt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          yl(8, l, n);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var r = l.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          _r(l.memoizedState.cache);
      }
      if (r = l.child, r !== null) r.return = l, Kt = r;
      else
        e: for (l = e; Kt !== null; ) {
          r = Kt;
          var c = r.sibling, d = r.return;
          if (ap(r), r === l) {
            Kt = null;
            break e;
          }
          if (c !== null) {
            c.return = d, Kt = c;
            break e;
          }
          Kt = d;
        }
    }
  }
  var DS = {
    getCacheForType: function(e) {
      var n = an(Bt), l = n.data.get(e);
      return l === void 0 && (l = e(), n.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return an(Bt).controller.signal;
    }
  }, zS = typeof WeakMap == "function" ? WeakMap : Map, lt = 0, gt = null, $e = null, Qe = 0, ut = 0, On = null, vl = !1, Li = !1, Sf = !1, Za = 0, Dt = 0, bl = 0, Wl = 0, wf = 0, jn = 0, Hi = 0, Gr = null, Sn = null, Ef = !1, ws = 0, mp = 0, Es = 1 / 0, _s = null, xl = null, Zt = 0, Sl = null, Bi = null, Qa = 0, _f = 0, Nf = null, gp = null, qr = 0, Mf = null;
  function Ln() {
    return (lt & 2) !== 0 && Qe !== 0 ? Qe & -Qe : N.T !== null ? zf() : de();
  }
  function pp() {
    if (jn === 0)
      if ((Qe & 536870912) === 0 || Fe) {
        var e = Mn;
        Mn <<= 1, (Mn & 3932160) === 0 && (Mn = 262144), jn = e;
      } else jn = 536870912;
    return e = Dn.current, e !== null && (e.flags |= 32), jn;
  }
  function wn(e, n, l) {
    (e === gt && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null) && (Ui(e, 0), wl(
      e,
      Qe,
      jn,
      !1
    )), rt(e, l), ((lt & 2) === 0 || e !== gt) && (e === gt && ((lt & 2) === 0 && (Wl |= l), Dt === 4 && wl(
      e,
      Qe,
      jn,
      !1
    )), Sa(e));
  }
  function yp(e, n, l) {
    if ((lt & 6) !== 0) throw Error(o(327));
    var r = !l && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ot(e, n), c = r ? LS(e, n) : Cf(e, n, !0), d = r;
    do {
      if (c === 0) {
        Li && !r && wl(e, n, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, d && !OS(l)) {
          c = Cf(e, n, !1), d = !1;
          continue;
        }
        if (c === 2) {
          if (d = n, e.errorRecoveryDisabledLanes & d)
            var b = 0;
          else
            b = e.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            n = b;
            e: {
              var _ = e;
              c = Gr;
              var B = _.current.memoizedState.isDehydrated;
              if (B && (Ui(_, b).flags |= 256), b = Cf(
                _,
                b,
                !1
              ), b !== 2) {
                if (Sf && !B) {
                  _.errorRecoveryDisabledLanes |= d, Wl |= d, c = 4;
                  break e;
                }
                d = Sn, Sn = c, d !== null && (Sn === null ? Sn = d : Sn.push.apply(
                  Sn,
                  d
                ));
              }
              c = b;
            }
            if (d = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Ui(e, 0), wl(e, n, 0, !0);
          break;
        }
        e: {
          switch (r = e, d = c, d) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              wl(
                r,
                n,
                jn,
                !vl
              );
              break e;
            case 2:
              Sn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((n & 62914560) === n && (c = ws + 300 - yt(), 10 < c)) {
            if (wl(
              r,
              n,
              jn,
              !vl
            ), Le(r, 0, !0) !== 0) break e;
            Qa = n, r.timeoutHandle = Ip(
              vp.bind(
                null,
                r,
                l,
                Sn,
                _s,
                Ef,
                n,
                jn,
                Wl,
                Hi,
                vl,
                d,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          vp(
            r,
            l,
            Sn,
            _s,
            Ef,
            n,
            jn,
            Wl,
            Hi,
            vl,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Sa(e);
  }
  function vp(e, n, l, r, c, d, b, _, B, ne, ue, fe, ie, re) {
    if (e.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: za
      }, cp(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? ws - yt() : (d & 4194048) === d ? mp - yt() : 0;
      if (_e = yw(
        fe,
        _e
      ), _e !== null) {
        Qa = d, e.cancelPendingCommit = _e(
          Mp.bind(
            null,
            e,
            n,
            d,
            l,
            r,
            c,
            b,
            _,
            B,
            ue,
            fe,
            null,
            ie,
            re
          )
        ), wl(e, d, b, !ne);
        return;
      }
    }
    Mp(
      e,
      n,
      d,
      l,
      r,
      c,
      b,
      _,
      B
    );
  }
  function OS(e) {
    for (var n = e; ; ) {
      var l = n.tag;
      if ((l === 0 || l === 11 || l === 15) && n.flags & 16384 && (l = n.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var r = 0; r < l.length; r++) {
          var c = l[r], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Rn(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = n.child, n.subtreeFlags & 16384 && l !== null)
        l.return = n, n = l;
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
  function wl(e, n, l, r) {
    n &= ~wf, n &= ~Wl, e.suspendedLanes |= n, e.pingedLanes &= ~n, r && (e.warmLanes |= n), r = e.expirationTimes;
    for (var c = n; 0 < c; ) {
      var d = 31 - zt(c), b = 1 << d;
      r[d] = -1, c &= ~b;
    }
    l !== 0 && na(e, l, n);
  }
  function Ns() {
    return (lt & 6) === 0 ? ($r(0), !1) : !0;
  }
  function Tf() {
    if ($e !== null) {
      if (ut === 0)
        var e = $e.return;
      else
        e = $e, Ha = $l = null, Gc(e), Ci = null, Mr = 0, e = $e;
      for (; e !== null; )
        Kg(e.alternate, e), e = e.return;
      $e = null;
    }
  }
  function Ui(e, n) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, WS(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Qa = 0, Tf(), gt = e, $e = l = ja(e.current, null), Qe = n, ut = 0, On = null, vl = !1, Li = ot(e, n), Sf = !1, Hi = jn = wf = Wl = bl = Dt = 0, Sn = Gr = null, Ef = !1, (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= n; 0 < r; ) {
        var c = 31 - zt(r), d = 1 << c;
        n |= e[c], r &= ~d;
      }
    return Za = n, Zo(), l;
  }
  function bp(e, n) {
    ke = null, N.H = jr, n === Ti || n === es ? (n = Lm(), ut = 3) : n === Ac ? (n = Lm(), ut = 4) : ut = n === lf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, On = n, $e === null && (Dt = 1, ms(
      e,
      qn(n, e.current)
    ));
  }
  function xp() {
    var e = Dn.current;
    return e === null ? !0 : (Qe & 4194048) === Qe ? Qn === null : (Qe & 62914560) === Qe || (Qe & 536870912) !== 0 ? e === Qn : !1;
  }
  function Sp() {
    var e = N.H;
    return N.H = jr, e === null ? jr : e;
  }
  function wp() {
    var e = N.A;
    return N.A = DS, e;
  }
  function Ms() {
    Dt = 4, vl || (Qe & 4194048) !== Qe && Dn.current !== null || (Li = !0), (bl & 134217727) === 0 && (Wl & 134217727) === 0 || gt === null || wl(
      gt,
      Qe,
      jn,
      !1
    );
  }
  function Cf(e, n, l) {
    var r = lt;
    lt |= 2;
    var c = Sp(), d = wp();
    (gt !== e || Qe !== n) && (_s = null, Ui(e, n)), n = !1;
    var b = Dt;
    e: do
      try {
        if (ut !== 0 && $e !== null) {
          var _ = $e, B = On;
          switch (ut) {
            case 8:
              Tf(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Dn.current === null && (n = !0);
              var ne = ut;
              if (ut = 0, On = null, ki(e, _, B, ne), l && Li) {
                b = 0;
                break e;
              }
              break;
            default:
              ne = ut, ut = 0, On = null, ki(e, _, B, ne);
          }
        }
        jS(), b = Dt;
        break;
      } catch (ue) {
        bp(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ha = $l = null, lt = r, N.H = c, N.A = d, $e === null && (gt = null, Qe = 0, Zo()), b;
  }
  function jS() {
    for (; $e !== null; ) Ep($e);
  }
  function LS(e, n) {
    var l = lt;
    lt |= 2;
    var r = Sp(), c = wp();
    gt !== e || Qe !== n ? (_s = null, Es = yt() + 500, Ui(e, n)) : Li = ot(
      e,
      n
    );
    e: do
      try {
        if (ut !== 0 && $e !== null) {
          n = $e;
          var d = On;
          t: switch (ut) {
            case 1:
              ut = 0, On = null, ki(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (Om(d)) {
                ut = 0, On = null, _p(n);
                break;
              }
              n = function() {
                ut !== 2 && ut !== 9 || gt !== e || (ut = 7), Sa(e);
              }, d.then(n, n);
              break e;
            case 3:
              ut = 7;
              break e;
            case 4:
              ut = 5;
              break e;
            case 7:
              Om(d) ? (ut = 0, On = null, _p(n)) : (ut = 0, On = null, ki(e, n, d, 7));
              break;
            case 5:
              var b = null;
              switch ($e.tag) {
                case 26:
                  b = $e.memoizedState;
                case 5:
                case 27:
                  var _ = $e;
                  if (b ? u0(b) : _.stateNode.complete) {
                    ut = 0, On = null;
                    var B = _.sibling;
                    if (B !== null) $e = B;
                    else {
                      var ne = _.return;
                      ne !== null ? ($e = ne, Ts(ne)) : $e = null;
                    }
                    break t;
                  }
              }
              ut = 0, On = null, ki(e, n, d, 5);
              break;
            case 6:
              ut = 0, On = null, ki(e, n, d, 6);
              break;
            case 8:
              Tf(), Dt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        HS();
        break;
      } catch (ue) {
        bp(e, ue);
      }
    while (!0);
    return Ha = $l = null, N.H = r, N.A = c, lt = l, $e !== null ? 0 : (gt = null, Qe = 0, Zo(), Dt);
  }
  function HS() {
    for (; $e !== null && !Et(); )
      Ep($e);
  }
  function Ep(e) {
    var n = Qg(e.alternate, e, Za);
    e.memoizedProps = e.pendingProps, n === null ? Ts(e) : $e = n;
  }
  function _p(e) {
    var n = e, l = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Yg(
          l,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Qe
        );
        break;
      case 11:
        n = Yg(
          l,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Qe
        );
        break;
      case 5:
        Gc(n);
      default:
        Kg(l, n), n = $e = wm(n, Za), n = Qg(l, n, Za);
    }
    e.memoizedProps = e.pendingProps, n === null ? Ts(e) : $e = n;
  }
  function ki(e, n, l, r) {
    Ha = $l = null, Gc(n), Ci = null, Mr = 0;
    var c = n.return;
    try {
      if (_S(
        e,
        c,
        n,
        l,
        Qe
      )) {
        Dt = 1, ms(
          e,
          qn(l, e.current)
        ), $e = null;
        return;
      }
    } catch (d) {
      if (c !== null) throw $e = c, d;
      Dt = 1, ms(
        e,
        qn(l, e.current)
      ), $e = null;
      return;
    }
    n.flags & 32768 ? (Fe || r === 1 ? e = !0 : Li || (Qe & 536870912) !== 0 ? e = !1 : (vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Dn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Np(n, e)) : Ts(n);
  }
  function Ts(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Np(
          n,
          vl
        );
        return;
      }
      e = n.return;
      var l = TS(
        n.alternate,
        n,
        Za
      );
      if (l !== null) {
        $e = l;
        return;
      }
      if (n = n.sibling, n !== null) {
        $e = n;
        return;
      }
      $e = n = e;
    } while (n !== null);
    Dt === 0 && (Dt = 5);
  }
  function Np(e, n) {
    do {
      var l = CS(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, $e = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !n && (e = e.sibling, e !== null)) {
        $e = e;
        return;
      }
      $e = e = l;
    } while (e !== null);
    Dt = 6, $e = null;
  }
  function Mp(e, n, l, r, c, d, b, _, B) {
    e.cancelPendingCommit = null;
    do
      Cs();
    while (Zt !== 0);
    if ((lt & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (d = n.lanes | n.childLanes, d |= gc, Xt(
        e,
        l,
        d,
        b,
        _,
        B
      ), e === gt && ($e = gt = null, Qe = 0), Bi = n, Sl = e, Qa = l, _f = d, Nf = c, gp = r, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, VS(qt, function() {
        return Dp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || r) {
        r = N.T, N.T = null, c = O.p, O.p = 2, b = lt, lt |= 4;
        try {
          RS(e, n, l);
        } finally {
          lt = b, O.p = c, N.T = r;
        }
      }
      Zt = 1, Tp(), Cp(), Rp();
    }
  }
  function Tp() {
    if (Zt === 1) {
      Zt = 0;
      var e = Sl, n = Bi, l = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || l) {
        l = N.T, N.T = null;
        var r = O.p;
        O.p = 2;
        var c = lt;
        lt |= 4;
        try {
          op(n, e);
          var d = Vf, b = hm(e.containerInfo), _ = d.focusedElem, B = d.selectionRange;
          if (b !== _ && _ && _.ownerDocument && dm(
            _.ownerDocument.documentElement,
            _
          )) {
            if (B !== null && cc(_)) {
              var ne = B.start, ue = B.end;
              if (ue === void 0 && (ue = ne), "selectionStart" in _)
                _.selectionStart = ne, _.selectionEnd = Math.min(
                  ue,
                  _.value.length
                );
              else {
                var fe = _.ownerDocument || document, ie = fe && fe.defaultView || window;
                if (ie.getSelection) {
                  var re = ie.getSelection(), _e = _.textContent.length, je = Math.min(B.start, _e), ht = B.end === void 0 ? je : Math.min(B.end, _e);
                  !re.extend && je > ht && (b = ht, ht = je, je = b);
                  var F = fm(
                    _,
                    je
                  ), q = fm(
                    _,
                    ht
                  );
                  if (F && q && (re.rangeCount !== 1 || re.anchorNode !== F.node || re.anchorOffset !== F.offset || re.focusNode !== q.node || re.focusOffset !== q.offset)) {
                    var te = fe.createRange();
                    te.setStart(F.node, F.offset), re.removeAllRanges(), je > ht ? (re.addRange(te), re.extend(q.node, q.offset)) : (te.setEnd(q.node, q.offset), re.addRange(te));
                  }
                }
              }
            }
            for (fe = [], re = _; re = re.parentNode; )
              re.nodeType === 1 && fe.push({
                element: re,
                left: re.scrollLeft,
                top: re.scrollTop
              });
            for (typeof _.focus == "function" && _.focus(), _ = 0; _ < fe.length; _++) {
              var ce = fe[_];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          Vs = !!kf, Vf = kf = null;
        } finally {
          lt = c, O.p = r, N.T = l;
        }
      }
      e.current = n, Zt = 2;
    }
  }
  function Cp() {
    if (Zt === 2) {
      Zt = 0;
      var e = Sl, n = Bi, l = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || l) {
        l = N.T, N.T = null;
        var r = O.p;
        O.p = 2;
        var c = lt;
        lt |= 4;
        try {
          np(e, n.alternate, n);
        } finally {
          lt = c, O.p = r, N.T = l;
        }
      }
      Zt = 3;
    }
  }
  function Rp() {
    if (Zt === 4 || Zt === 3) {
      Zt = 0, Qt();
      var e = Sl, n = Bi, l = Qa, r = gp;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Zt = 5 : (Zt = 0, Bi = Sl = null, Ap(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (xl = null), W(l), n = n.stateNode, $t && typeof $t.onCommitFiberRoot == "function")
        try {
          $t.onCommitFiberRoot(
            Nn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = N.T, c = O.p, O.p = 2, N.T = null;
        try {
          for (var d = e.onRecoverableError, b = 0; b < r.length; b++) {
            var _ = r[b];
            d(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          N.T = n, O.p = c;
        }
      }
      (Qa & 3) !== 0 && Cs(), Sa(e), c = e.pendingLanes, (l & 261930) !== 0 && (c & 42) !== 0 ? e === Mf ? qr++ : (qr = 0, Mf = e) : qr = 0, $r(0);
    }
  }
  function Ap(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, _r(n)));
  }
  function Cs() {
    return Tp(), Cp(), Rp(), Dp();
  }
  function Dp() {
    if (Zt !== 5) return !1;
    var e = Sl, n = _f;
    _f = 0;
    var l = W(Qa), r = N.T, c = O.p;
    try {
      O.p = 32 > l ? 32 : l, N.T = null, l = Nf, Nf = null;
      var d = Sl, b = Qa;
      if (Zt = 0, Bi = Sl = null, Qa = 0, (lt & 6) !== 0) throw Error(o(331));
      var _ = lt;
      if (lt |= 4, dp(d.current), up(
        d,
        d.current,
        b,
        l
      ), lt = _, $r(0, !1), $t && typeof $t.onPostCommitFiberRoot == "function")
        try {
          $t.onPostCommitFiberRoot(Nn, d);
        } catch {
        }
      return !0;
    } finally {
      O.p = c, N.T = r, Ap(e, n);
    }
  }
  function zp(e, n, l) {
    n = qn(l, n), n = af(e.stateNode, n, 2), e = ml(e, n, 2), e !== null && (rt(e, 2), Sa(e));
  }
  function ct(e, n, l) {
    if (e.tag === 3)
      zp(e, e, l);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          zp(
            n,
            e,
            l
          );
          break;
        } else if (n.tag === 1) {
          var r = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xl === null || !xl.has(r))) {
            e = qn(l, e), l = Og(2), r = ml(n, l, 2), r !== null && (jg(
              l,
              r,
              n,
              e
            ), rt(r, 2), Sa(r));
            break;
          }
        }
        n = n.return;
      }
  }
  function Rf(e, n, l) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new zS();
      var c = /* @__PURE__ */ new Set();
      r.set(n, c);
    } else
      c = r.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), r.set(n, c));
    c.has(l) || (Sf = !0, c.add(l), e = BS.bind(null, e, n, l), n.then(e, e));
  }
  function BS(e, n, l) {
    var r = e.pingCache;
    r !== null && r.delete(n), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, gt === e && (Qe & l) === l && (Dt === 4 || Dt === 3 && (Qe & 62914560) === Qe && 300 > yt() - ws ? (lt & 2) === 0 && Ui(e, 0) : wf |= l, Hi === Qe && (Hi = 0)), Sa(e);
  }
  function Op(e, n) {
    n === 0 && (n = Ot()), e = Yl(e, n), e !== null && (rt(e, n), Sa(e));
  }
  function US(e) {
    var n = e.memoizedState, l = 0;
    n !== null && (l = n.retryLane), Op(e, l);
  }
  function kS(e, n) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, c = e.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    r !== null && r.delete(n), Op(e, l);
  }
  function VS(e, n) {
    return Gt(e, n);
  }
  var Rs = null, Vi = null, Af = !1, As = !1, Df = !1, El = 0;
  function Sa(e) {
    e !== Vi && e.next === null && (Vi === null ? Rs = Vi = e : Vi = Vi.next = e), As = !0, Af || (Af = !0, GS());
  }
  function $r(e, n) {
    if (!Df && As) {
      Df = !0;
      do
        for (var l = !1, r = Rs; r !== null; ) {
          if (e !== 0) {
            var c = r.pendingLanes;
            if (c === 0) var d = 0;
            else {
              var b = r.suspendedLanes, _ = r.pingedLanes;
              d = (1 << 31 - zt(42 | e) + 1) - 1, d &= c & ~(b & ~_), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (l = !0, Bp(r, d));
          } else
            d = Qe, d = Le(
              r,
              r === gt ? d : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (d & 3) === 0 || ot(r, d) || (l = !0, Bp(r, d));
          r = r.next;
        }
      while (l);
      Df = !1;
    }
  }
  function YS() {
    jp();
  }
  function jp() {
    As = Af = !1;
    var e = 0;
    El !== 0 && PS() && (e = El);
    for (var n = yt(), l = null, r = Rs; r !== null; ) {
      var c = r.next, d = Lp(r, n);
      d === 0 ? (r.next = null, l === null ? Rs = c : l.next = c, c === null && (Vi = l)) : (l = r, (e !== 0 || (d & 3) !== 0) && (As = !0)), r = c;
    }
    Zt !== 0 && Zt !== 5 || $r(e), El !== 0 && (El = 0);
  }
  function Lp(e, n) {
    for (var l = e.suspendedLanes, r = e.pingedLanes, c = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var b = 31 - zt(d), _ = 1 << b, B = c[b];
      B === -1 ? ((_ & l) === 0 || (_ & r) !== 0) && (c[b] = Rt(_, n)) : B <= n && (e.expiredLanes |= _), d &= ~_;
    }
    if (n = gt, l = Qe, l = Le(
      e,
      e === n ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, l === 0 || e === n && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Jt(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || ot(e, l)) {
      if (n = l & -l, n === e.callbackPriority) return n;
      switch (r !== null && Jt(r), W(l)) {
        case 2:
        case 8:
          l = Pt;
          break;
        case 32:
          l = qt;
          break;
        case 268435456:
          l = Mt;
          break;
        default:
          l = qt;
      }
      return r = Hp.bind(null, e), l = Gt(l, r), e.callbackPriority = n, e.callbackNode = l, n;
    }
    return r !== null && r !== null && Jt(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Hp(e, n) {
    if (Zt !== 0 && Zt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Cs() && e.callbackNode !== l)
      return null;
    var r = Qe;
    return r = Le(
      e,
      e === gt ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (yp(e, r, n), Lp(e, yt()), e.callbackNode != null && e.callbackNode === l ? Hp.bind(null, e) : null);
  }
  function Bp(e, n) {
    if (Cs()) return null;
    yp(e, n, !0);
  }
  function GS() {
    ew(function() {
      (lt & 6) !== 0 ? Gt(
        Nt,
        YS
      ) : jp();
    });
  }
  function zf() {
    if (El === 0) {
      var e = Ni;
      e === 0 && (e = ta, ta <<= 1, (ta & 261888) === 0 && (ta = 256)), El = e;
    }
    return El;
  }
  function Up(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Uo("" + e);
  }
  function kp(e, n) {
    var l = n.ownerDocument.createElement("input");
    return l.name = n.name, l.value = n.value, e.id && l.setAttribute("form", e.id), n.parentNode.insertBefore(l, n), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function qS(e, n, l, r, c) {
    if (n === "submit" && l && l.stateNode === c) {
      var d = Up(
        (c[xe] || null).action
      ), b = r.submitter;
      b && (n = (n = b[xe] || null) ? Up(n.formAction) : b.getAttribute("formAction"), n !== null && (d = n, b = null));
      var _ = new Go(
        "action",
        "action",
        null,
        r,
        c
      );
      e.push({
        event: _,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (El !== 0) {
                  var B = b ? kp(c, b) : new FormData(c);
                  Jc(
                    l,
                    {
                      pending: !0,
                      data: B,
                      method: c.method,
                      action: d
                    },
                    null,
                    B
                  );
                }
              } else
                typeof d == "function" && (_.preventDefault(), B = b ? kp(c, b) : new FormData(c), Jc(
                  l,
                  {
                    pending: !0,
                    data: B,
                    method: c.method,
                    action: d
                  },
                  d,
                  B
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Of = 0; Of < mc.length; Of++) {
    var jf = mc[Of], $S = jf.toLowerCase(), XS = jf[0].toUpperCase() + jf.slice(1);
    ia(
      $S,
      "on" + XS
    );
  }
  ia(pm, "onAnimationEnd"), ia(ym, "onAnimationIteration"), ia(vm, "onAnimationStart"), ia("dblclick", "onDoubleClick"), ia("focusin", "onFocus"), ia("focusout", "onBlur"), ia(oS, "onTransitionRun"), ia(sS, "onTransitionStart"), ia(uS, "onTransitionCancel"), ia(bm, "onTransitionEnd"), en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]), sn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), sn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), sn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), sn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), sn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), sn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Xr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), ZS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xr)
  );
  function Vp(e, n) {
    n = (n & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var r = e[l], c = r.event;
      r = r.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var b = r.length - 1; 0 <= b; b--) {
            var _ = r[b], B = _.instance, ne = _.currentTarget;
            if (_ = _.listener, B !== d && c.isPropagationStopped())
              break e;
            d = _, c.currentTarget = ne;
            try {
              d(c);
            } catch (ue) {
              Xo(ue);
            }
            c.currentTarget = null, d = B;
          }
        else
          for (b = 0; b < r.length; b++) {
            if (_ = r[b], B = _.instance, ne = _.currentTarget, _ = _.listener, B !== d && c.isPropagationStopped())
              break e;
            d = _, c.currentTarget = ne;
            try {
              d(c);
            } catch (ue) {
              Xo(ue);
            }
            c.currentTarget = null, d = B;
          }
      }
    }
  }
  function Xe(e, n) {
    var l = n[Me];
    l === void 0 && (l = n[Me] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    l.has(r) || (Yp(n, e, 2, !1), l.add(r));
  }
  function Lf(e, n, l) {
    var r = 0;
    n && (r |= 4), Yp(
      l,
      e,
      r,
      n
    );
  }
  var Ds = "_reactListening" + Math.random().toString(36).slice(2);
  function Hf(e) {
    if (!e[Ds]) {
      e[Ds] = !0, ya.forEach(function(l) {
        l !== "selectionchange" && (ZS.has(l) || Lf(l, !1, e), Lf(l, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ds] || (n[Ds] = !0, Lf("selectionchange", !1, n));
    }
  }
  function Yp(e, n, l, r) {
    switch (p0(n)) {
      case 2:
        var c = xw;
        break;
      case 8:
        c = Sw;
        break;
      default:
        c = Jf;
    }
    l = c.bind(
      null,
      n,
      l,
      e
    ), c = void 0, !tc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), r ? c !== void 0 ? e.addEventListener(n, l, {
      capture: !0,
      passive: c
    }) : e.addEventListener(n, l, !0) : c !== void 0 ? e.addEventListener(n, l, {
      passive: c
    }) : e.addEventListener(n, l, !1);
  }
  function Bf(e, n, l, r, c) {
    var d = r;
    if ((n & 1) === 0 && (n & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var b = r.tag;
        if (b === 3 || b === 4) {
          var _ = r.stateNode.containerInfo;
          if (_ === c) break;
          if (b === 4)
            for (b = r.return; b !== null; ) {
              var B = b.tag;
              if ((B === 3 || B === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; _ !== null; ) {
            if (b = mt(_), b === null) return;
            if (B = b.tag, B === 5 || B === 6 || B === 26 || B === 27) {
              r = d = b;
              continue e;
            }
            _ = _.parentNode;
          }
        }
        r = r.return;
      }
    Zh(function() {
      var ne = d, ue = Wu(l), fe = [];
      e: {
        var ie = xm.get(e);
        if (ie !== void 0) {
          var re = Go, _e = e;
          switch (e) {
            case "keypress":
              if (Vo(l) === 0) break e;
            case "keydown":
            case "keyup":
              re = kx;
              break;
            case "focusin":
              _e = "focus", re = ic;
              break;
            case "focusout":
              _e = "blur", re = ic;
              break;
            case "beforeblur":
            case "afterblur":
              re = ic;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              re = Kh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              re = Tx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              re = Gx;
              break;
            case pm:
            case ym:
            case vm:
              re = Ax;
              break;
            case bm:
              re = $x;
              break;
            case "scroll":
            case "scrollend":
              re = Nx;
              break;
            case "wheel":
              re = Zx;
              break;
            case "copy":
            case "cut":
            case "paste":
              re = zx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              re = Jh;
              break;
            case "toggle":
            case "beforetoggle":
              re = Ix;
          }
          var je = (n & 4) !== 0, ht = !je && (e === "scroll" || e === "scrollend"), F = je ? ie !== null ? ie + "Capture" : null : ie;
          je = [];
          for (var q = ne, te; q !== null; ) {
            var ce = q;
            if (te = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || te === null || F === null || (ce = hr(q, F), ce != null && je.push(
              Zr(q, ce, te)
            )), ht) break;
            q = q.return;
          }
          0 < je.length && (ie = new re(
            ie,
            _e,
            null,
            l,
            ue
          ), fe.push({ event: ie, listeners: je }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", re = e === "mouseout" || e === "pointerout", ie && l !== Pu && (_e = l.relatedTarget || l.fromElement) && (mt(_e) || _e[be]))
            break e;
          if ((re || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, re ? (_e = l.relatedTarget || l.toElement, re = ne, _e = _e ? mt(_e) : null, _e !== null && (ht = u(_e), je = _e.tag, _e !== ht || je !== 5 && je !== 27 && je !== 6) && (_e = null)) : (re = null, _e = ne), re !== _e)) {
            if (je = Kh, ce = "onMouseLeave", F = "onMouseEnter", q = "mouse", (e === "pointerout" || e === "pointerover") && (je = Jh, ce = "onPointerLeave", F = "onPointerEnter", q = "pointer"), ht = re == null ? ie : Ze(re), te = _e == null ? ie : Ze(_e), ie = new je(
              ce,
              q + "leave",
              re,
              l,
              ue
            ), ie.target = ht, ie.relatedTarget = te, ce = null, mt(ue) === ne && (je = new je(
              F,
              q + "enter",
              _e,
              l,
              ue
            ), je.target = te, je.relatedTarget = ht, ce = je), ht = ce, re && _e)
              t: {
                for (je = QS, F = re, q = _e, te = 0, ce = F; ce; ce = je(ce))
                  te++;
                ce = 0;
                for (var Re = q; Re; Re = je(Re))
                  ce++;
                for (; 0 < te - ce; )
                  F = je(F), te--;
                for (; 0 < ce - te; )
                  q = je(q), ce--;
                for (; te--; ) {
                  if (F === q || q !== null && F === q.alternate) {
                    je = F;
                    break t;
                  }
                  F = je(F), q = je(q);
                }
                je = null;
              }
            else je = null;
            re !== null && Gp(
              fe,
              ie,
              re,
              je,
              !1
            ), _e !== null && ht !== null && Gp(
              fe,
              ht,
              _e,
              je,
              !0
            );
          }
        }
        e: {
          if (ie = ne ? Ze(ne) : window, re = ie.nodeName && ie.nodeName.toLowerCase(), re === "select" || re === "input" && ie.type === "file")
            var et = im;
          else if (am(ie))
            if (rm)
              et = lS;
            else {
              et = nS;
              var Ne = tS;
            }
          else
            re = ie.nodeName, !re || re.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ne && Ju(ne.elementType) && (et = im) : et = aS;
          if (et && (et = et(e, ne))) {
            lm(
              fe,
              et,
              l,
              ue
            );
            break e;
          }
          Ne && Ne(e, ie, ne), e === "focusout" && ne && ie.type === "number" && ne.memoizedProps.value != null && fr(ie, "number", ie.value);
        }
        switch (Ne = ne ? Ze(ne) : window, e) {
          case "focusin":
            (am(Ne) || Ne.contentEditable === "true") && (yi = Ne, fc = ne, Sr = null);
            break;
          case "focusout":
            Sr = fc = yi = null;
            break;
          case "mousedown":
            dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            dc = !1, mm(fe, l, ue);
            break;
          case "selectionchange":
            if (rS) break;
          case "keydown":
          case "keyup":
            mm(fe, l, ue);
        }
        var Ve;
        if (oc)
          e: {
            switch (e) {
              case "compositionstart":
                var Ie = "onCompositionStart";
                break e;
              case "compositionend":
                Ie = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ie = "onCompositionUpdate";
                break e;
            }
            Ie = void 0;
          }
        else
          pi ? tm(e, l) && (Ie = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Ie = "onCompositionStart");
        Ie && (Ph && l.locale !== "ko" && (pi || Ie !== "onCompositionStart" ? Ie === "onCompositionEnd" && pi && (Ve = Qh()) : (ol = ue, nc = "value" in ol ? ol.value : ol.textContent, pi = !0)), Ne = zs(ne, Ie), 0 < Ne.length && (Ie = new Fh(
          Ie,
          e,
          null,
          l,
          ue
        ), fe.push({ event: Ie, listeners: Ne }), Ve ? Ie.data = Ve : (Ve = nm(l), Ve !== null && (Ie.data = Ve)))), (Ve = Fx ? Jx(e, l) : Px(e, l)) && (Ie = zs(ne, "onBeforeInput"), 0 < Ie.length && (Ne = new Fh(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ue
        ), fe.push({
          event: Ne,
          listeners: Ie
        }), Ne.data = Ve)), qS(
          fe,
          e,
          ne,
          l,
          ue
        );
      }
      Vp(fe, n);
    });
  }
  function Zr(e, n, l) {
    return {
      instance: e,
      listener: n,
      currentTarget: l
    };
  }
  function zs(e, n) {
    for (var l = n + "Capture", r = []; e !== null; ) {
      var c = e, d = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || d === null || (c = hr(e, l), c != null && r.unshift(
        Zr(e, c, d)
      ), c = hr(e, n), c != null && r.push(
        Zr(e, c, d)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function QS(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Gp(e, n, l, r, c) {
    for (var d = n._reactName, b = []; l !== null && l !== r; ) {
      var _ = l, B = _.alternate, ne = _.stateNode;
      if (_ = _.tag, B !== null && B === r) break;
      _ !== 5 && _ !== 26 && _ !== 27 || ne === null || (B = ne, c ? (ne = hr(l, d), ne != null && b.unshift(
        Zr(l, ne, B)
      )) : c || (ne = hr(l, d), ne != null && b.push(
        Zr(l, ne, B)
      ))), l = l.return;
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var IS = /\r\n?/g, KS = /\u0000|\uFFFD/g;
  function qp(e) {
    return (typeof e == "string" ? e : "" + e).replace(IS, `
`).replace(KS, "");
  }
  function $p(e, n) {
    return n = qp(n), qp(e) === n;
  }
  function dt(e, n, l, r, c, d) {
    switch (l) {
      case "children":
        typeof r == "string" ? n === "body" || n === "textarea" && r === "" || hi(e, r) : (typeof r == "number" || typeof r == "bigint") && n !== "body" && hi(e, "" + r);
        break;
      case "className":
        la(e, "class", r);
        break;
      case "tabIndex":
        la(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        la(e, l, r);
        break;
      case "style":
        $h(e, r, d);
        break;
      case "data":
        if (n !== "object") {
          la(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (n !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(l);
          break;
        }
        r = Uo("" + r), e.setAttribute(l, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof d == "function" && (l === "formAction" ? (n !== "input" && dt(e, n, "name", c.name, c, null), dt(
            e,
            n,
            "formEncType",
            c.formEncType,
            c,
            null
          ), dt(
            e,
            n,
            "formMethod",
            c.formMethod,
            c,
            null
          ), dt(
            e,
            n,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (dt(e, n, "encType", c.encType, c, null), dt(e, n, "method", c.method, c, null), dt(e, n, "target", c.target, c, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(l);
          break;
        }
        r = Uo("" + r), e.setAttribute(l, r);
        break;
      case "onClick":
        r != null && (e.onclick = za);
        break;
      case "onScroll":
        r != null && Xe("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Xe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(o(61));
          if (l = r.__html, l != null) {
            if (c.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
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
        if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = Uo("" + r), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(l, "" + r) : e.removeAttribute(l);
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
        r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        r === !0 ? e.setAttribute(l, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(l, r) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(l, r) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(l) : e.setAttribute(l, r);
        break;
      case "popover":
        Xe("beforetoggle", e), Xe("toggle", e), aa(e, "popover", r);
        break;
      case "xlinkActuate":
        He(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        He(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        He(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        He(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        He(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        He(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        He(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        He(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        He(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        aa(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Ex.get(l) || l, aa(e, l, r));
    }
  }
  function Uf(e, n, l, r, c, d) {
    switch (l) {
      case "style":
        $h(e, r, d);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(o(61));
          if (l = r.__html, l != null) {
            if (c.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof r == "string" ? hi(e, r) : (typeof r == "number" || typeof r == "bigint") && hi(e, "" + r);
        break;
      case "onScroll":
        r != null && Xe("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Xe("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = za);
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
        if (!Tn.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (c = l.endsWith("Capture"), n = l.slice(2, c ? l.length - 7 : void 0), d = e[xe] || null, d = d != null ? d[l] : null, typeof d == "function" && e.removeEventListener(n, d, c), typeof r == "function")) {
              typeof d != "function" && d !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(n, r, c);
              break e;
            }
            l in e ? e[l] = r : r === !0 ? e.setAttribute(l, "") : aa(e, l, r);
          }
    }
  }
  function rn(e, n, l) {
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
        Xe("error", e), Xe("load", e);
        var r = !1, c = !1, d;
        for (d in l)
          if (l.hasOwnProperty(d)) {
            var b = l[d];
            if (b != null)
              switch (d) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, n));
                default:
                  dt(e, n, d, b, l, null);
              }
          }
        c && dt(e, n, "srcSet", l.srcSet, l, null), r && dt(e, n, "src", l.src, l, null);
        return;
      case "input":
        Xe("invalid", e);
        var _ = d = b = c = null, B = null, ne = null;
        for (r in l)
          if (l.hasOwnProperty(r)) {
            var ue = l[r];
            if (ue != null)
              switch (r) {
                case "name":
                  c = ue;
                  break;
                case "type":
                  b = ue;
                  break;
                case "checked":
                  B = ue;
                  break;
                case "defaultChecked":
                  ne = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  _ = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(o(137, n));
                  break;
                default:
                  dt(e, n, r, ue, l, null);
              }
          }
        di(
          e,
          d,
          _,
          B,
          ne,
          b,
          c,
          !1
        );
        return;
      case "select":
        Xe("invalid", e), r = b = d = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (_ = l[c], _ != null))
            switch (c) {
              case "value":
                d = _;
                break;
              case "defaultValue":
                b = _;
                break;
              case "multiple":
                r = _;
              default:
                dt(e, n, c, _, l, null);
            }
        n = d, l = b, e.multiple = !!r, n != null ? rl(e, !!r, n, !1) : l != null && rl(e, !!r, l, !0);
        return;
      case "textarea":
        Xe("invalid", e), d = c = r = null;
        for (b in l)
          if (l.hasOwnProperty(b) && (_ = l[b], _ != null))
            switch (b) {
              case "value":
                r = _;
                break;
              case "defaultValue":
                c = _;
                break;
              case "children":
                d = _;
                break;
              case "dangerouslySetInnerHTML":
                if (_ != null) throw Error(o(91));
                break;
              default:
                dt(e, n, b, _, l, null);
            }
        Gh(e, r, c, d);
        return;
      case "option":
        for (B in l)
          if (l.hasOwnProperty(B) && (r = l[B], r != null))
            switch (B) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                dt(e, n, B, r, l, null);
            }
        return;
      case "dialog":
        Xe("beforetoggle", e), Xe("toggle", e), Xe("cancel", e), Xe("close", e);
        break;
      case "iframe":
      case "object":
        Xe("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Xr.length; r++)
          Xe(Xr[r], e);
        break;
      case "image":
        Xe("error", e), Xe("load", e);
        break;
      case "details":
        Xe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Xe("error", e), Xe("load", e);
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
        for (ne in l)
          if (l.hasOwnProperty(ne) && (r = l[ne], r != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                dt(e, n, ne, r, l, null);
            }
        return;
      default:
        if (Ju(n)) {
          for (ue in l)
            l.hasOwnProperty(ue) && (r = l[ue], r !== void 0 && Uf(
              e,
              n,
              ue,
              r,
              l,
              void 0
            ));
          return;
        }
    }
    for (_ in l)
      l.hasOwnProperty(_) && (r = l[_], r != null && dt(e, n, _, r, l, null));
  }
  function FS(e, n, l, r) {
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
        var c = null, d = null, b = null, _ = null, B = null, ne = null, ue = null;
        for (re in l) {
          var fe = l[re];
          if (l.hasOwnProperty(re) && fe != null)
            switch (re) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                B = fe;
              default:
                r.hasOwnProperty(re) || dt(e, n, re, null, r, fe);
            }
        }
        for (var ie in r) {
          var re = r[ie];
          if (fe = l[ie], r.hasOwnProperty(ie) && (re != null || fe != null))
            switch (ie) {
              case "type":
                d = re;
                break;
              case "name":
                c = re;
                break;
              case "checked":
                ne = re;
                break;
              case "defaultChecked":
                ue = re;
                break;
              case "value":
                b = re;
                break;
              case "defaultValue":
                _ = re;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(o(137, n));
                break;
              default:
                re !== fe && dt(
                  e,
                  n,
                  ie,
                  re,
                  r,
                  fe
                );
            }
        }
        Bl(
          e,
          b,
          _,
          B,
          ne,
          ue,
          d,
          c
        );
        return;
      case "select":
        re = b = _ = ie = null;
        for (d in l)
          if (B = l[d], l.hasOwnProperty(d) && B != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                re = B;
              default:
                r.hasOwnProperty(d) || dt(
                  e,
                  n,
                  d,
                  null,
                  r,
                  B
                );
            }
        for (c in r)
          if (d = r[c], B = l[c], r.hasOwnProperty(c) && (d != null || B != null))
            switch (c) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                _ = d;
                break;
              case "multiple":
                b = d;
              default:
                d !== B && dt(
                  e,
                  n,
                  c,
                  d,
                  r,
                  B
                );
            }
        n = _, l = b, r = re, ie != null ? rl(e, !!l, ie, !1) : !!r != !!l && (n != null ? rl(e, !!l, n, !0) : rl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        re = ie = null;
        for (_ in l)
          if (c = l[_], l.hasOwnProperty(_) && c != null && !r.hasOwnProperty(_))
            switch (_) {
              case "value":
                break;
              case "children":
                break;
              default:
                dt(e, n, _, null, r, c);
            }
        for (b in r)
          if (c = r[b], d = l[b], r.hasOwnProperty(b) && (c != null || d != null))
            switch (b) {
              case "value":
                ie = c;
                break;
              case "defaultValue":
                re = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(o(91));
                break;
              default:
                c !== d && dt(e, n, b, c, r, d);
            }
        dr(e, ie, re);
        return;
      case "option":
        for (var _e in l)
          if (ie = l[_e], l.hasOwnProperty(_e) && ie != null && !r.hasOwnProperty(_e))
            switch (_e) {
              case "selected":
                e.selected = !1;
                break;
              default:
                dt(
                  e,
                  n,
                  _e,
                  null,
                  r,
                  ie
                );
            }
        for (B in r)
          if (ie = r[B], re = l[B], r.hasOwnProperty(B) && ie !== re && (ie != null || re != null))
            switch (B) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                dt(
                  e,
                  n,
                  B,
                  ie,
                  r,
                  re
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
        for (var je in l)
          ie = l[je], l.hasOwnProperty(je) && ie != null && !r.hasOwnProperty(je) && dt(e, n, je, null, r, ie);
        for (ne in r)
          if (ie = r[ne], re = l[ne], r.hasOwnProperty(ne) && ie !== re && (ie != null || re != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(o(137, n));
                break;
              default:
                dt(
                  e,
                  n,
                  ne,
                  ie,
                  r,
                  re
                );
            }
        return;
      default:
        if (Ju(n)) {
          for (var ht in l)
            ie = l[ht], l.hasOwnProperty(ht) && ie !== void 0 && !r.hasOwnProperty(ht) && Uf(
              e,
              n,
              ht,
              void 0,
              r,
              ie
            );
          for (ue in r)
            ie = r[ue], re = l[ue], !r.hasOwnProperty(ue) || ie === re || ie === void 0 && re === void 0 || Uf(
              e,
              n,
              ue,
              ie,
              r,
              re
            );
          return;
        }
    }
    for (var F in l)
      ie = l[F], l.hasOwnProperty(F) && ie != null && !r.hasOwnProperty(F) && dt(e, n, F, null, r, ie);
    for (fe in r)
      ie = r[fe], re = l[fe], !r.hasOwnProperty(fe) || ie === re || ie == null && re == null || dt(e, n, fe, ie, r, re);
  }
  function Xp(e) {
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
  function JS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, l = performance.getEntriesByType("resource"), r = 0; r < l.length; r++) {
        var c = l[r], d = c.transferSize, b = c.initiatorType, _ = c.duration;
        if (d && _ && Xp(b)) {
          for (b = 0, _ = c.responseEnd, r += 1; r < l.length; r++) {
            var B = l[r], ne = B.startTime;
            if (ne > _) break;
            var ue = B.transferSize, fe = B.initiatorType;
            ue && Xp(fe) && (B = B.responseEnd, b += ue * (B < _ ? 1 : (_ - ne) / (B - ne)));
          }
          if (--r, n += 8 * (d + b) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var kf = null, Vf = null;
  function Os(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Zp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qp(e, n) {
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
  function Yf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Gf = null;
  function PS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Gf ? !1 : (Gf = e, !0) : (Gf = null, !1);
  }
  var Ip = typeof setTimeout == "function" ? setTimeout : void 0, WS = typeof clearTimeout == "function" ? clearTimeout : void 0, Kp = typeof Promise == "function" ? Promise : void 0, ew = typeof queueMicrotask == "function" ? queueMicrotask : typeof Kp < "u" ? function(e) {
    return Kp.resolve(null).then(e).catch(tw);
  } : Ip;
  function tw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function _l(e) {
    return e === "head";
  }
  function Fp(e, n) {
    var l = n, r = 0;
    do {
      var c = l.nextSibling;
      if (e.removeChild(l), c && c.nodeType === 8)
        if (l = c.data, l === "/$" || l === "/&") {
          if (r === 0) {
            e.removeChild(c), $i(n);
            return;
          }
          r--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          r++;
        else if (l === "html")
          Qr(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Qr(l);
          for (var d = l.firstChild; d; ) {
            var b = d.nextSibling, _ = d.nodeName;
            d[Ye] || _ === "SCRIPT" || _ === "STYLE" || _ === "LINK" && d.rel.toLowerCase() === "stylesheet" || l.removeChild(d), d = b;
          }
        } else
          l === "body" && Qr(e.ownerDocument.body);
      l = c;
    } while (l);
    $i(n);
  }
  function Jp(e, n) {
    var l = e;
    e = 0;
    do {
      var r = l.nextSibling;
      if (l.nodeType === 1 ? n ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (n ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), r && r.nodeType === 8)
        if (l = r.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = r;
    } while (l);
  }
  function qf(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var l = n;
      switch (n = n.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          qf(l), Je(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function nw(e, n, l, r) {
    for (; e.nodeType === 1; ) {
      var c = l;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[Ye])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (d = e.getAttribute("rel"), d === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (d !== c.rel || e.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || e.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (d = e.getAttribute("src"), (d !== (c.src == null ? null : c.src) || e.getAttribute("type") !== (c.type == null ? null : c.type) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && d && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var d = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === d)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function aw(e, n, l) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Pp(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function $f(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Xf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function lw(e, n) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || l.readyState !== "loading")
      n();
    else {
      var r = function() {
        n(), l.removeEventListener("DOMContentLoaded", r);
      };
      l.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
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
  var Zf = null;
  function Wp(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (n === 0)
            return In(e.nextSibling);
          n--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function e0(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (n === 0) return e;
          n--;
        } else l !== "/$" && l !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function t0(e, n, l) {
    switch (n = Os(l), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Qr(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Je(e);
  }
  var Kn = /* @__PURE__ */ new Map(), n0 = /* @__PURE__ */ new Set();
  function js(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ia = O.d;
  O.d = {
    f: iw,
    r: rw,
    D: ow,
    C: sw,
    L: uw,
    m: cw,
    X: dw,
    S: fw,
    M: hw
  };
  function iw() {
    var e = Ia.f(), n = Ns();
    return e || n;
  }
  function rw(e) {
    var n = We(e);
    n !== null && n.tag === 5 && n.type === "form" ? bg(n) : Ia.r(e);
  }
  var Yi = typeof document > "u" ? null : document;
  function a0(e, n, l) {
    var r = Yi;
    if (r && typeof n == "string" && n) {
      var c = tn(n);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof l == "string" && (c += '[crossorigin="' + l + '"]'), n0.has(c) || (n0.add(c), e = { rel: e, crossOrigin: l, href: n }, r.querySelector(c) === null && (n = r.createElement("link"), rn(n, "link", e), Ke(n), r.head.appendChild(n)));
    }
  }
  function ow(e) {
    Ia.D(e), a0("dns-prefetch", e, null);
  }
  function sw(e, n) {
    Ia.C(e, n), a0("preconnect", e, n);
  }
  function uw(e, n, l) {
    Ia.L(e, n, l);
    var r = Yi;
    if (r && e && n) {
      var c = 'link[rel="preload"][as="' + tn(n) + '"]';
      n === "image" && l && l.imageSrcSet ? (c += '[imagesrcset="' + tn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (c += '[imagesizes="' + tn(
        l.imageSizes
      ) + '"]')) : c += '[href="' + tn(e) + '"]';
      var d = c;
      switch (n) {
        case "style":
          d = Gi(e);
          break;
        case "script":
          d = qi(e);
      }
      Kn.has(d) || (e = m(
        {
          rel: "preload",
          href: n === "image" && l && l.imageSrcSet ? void 0 : e,
          as: n
        },
        l
      ), Kn.set(d, e), r.querySelector(c) !== null || n === "style" && r.querySelector(Ir(d)) || n === "script" && r.querySelector(Kr(d)) || (n = r.createElement("link"), rn(n, "link", e), Ke(n), r.head.appendChild(n)));
    }
  }
  function cw(e, n) {
    Ia.m(e, n);
    var l = Yi;
    if (l && e) {
      var r = n && typeof n.as == "string" ? n.as : "script", c = 'link[rel="modulepreload"][as="' + tn(r) + '"][href="' + tn(e) + '"]', d = c;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = qi(e);
      }
      if (!Kn.has(d) && (e = m({ rel: "modulepreload", href: e }, n), Kn.set(d, e), l.querySelector(c) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Kr(d)))
              return;
        }
        r = l.createElement("link"), rn(r, "link", e), Ke(r), l.head.appendChild(r);
      }
    }
  }
  function fw(e, n, l) {
    Ia.S(e, n, l);
    var r = Yi;
    if (r && e) {
      var c = Ct(r).hoistableStyles, d = Gi(e);
      n = n || "default";
      var b = c.get(d);
      if (!b) {
        var _ = { loading: 0, preload: null };
        if (b = r.querySelector(
          Ir(d)
        ))
          _.loading = 5;
        else {
          e = m(
            { rel: "stylesheet", href: e, "data-precedence": n },
            l
          ), (l = Kn.get(d)) && Qf(e, l);
          var B = b = r.createElement("link");
          Ke(B), rn(B, "link", e), B._p = new Promise(function(ne, ue) {
            B.onload = ne, B.onerror = ue;
          }), B.addEventListener("load", function() {
            _.loading |= 1;
          }), B.addEventListener("error", function() {
            _.loading |= 2;
          }), _.loading |= 4, Ls(b, n, r);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: _
        }, c.set(d, b);
      }
    }
  }
  function dw(e, n) {
    Ia.X(e, n);
    var l = Yi;
    if (l && e) {
      var r = Ct(l).hoistableScripts, c = qi(e), d = r.get(c);
      d || (d = l.querySelector(Kr(c)), d || (e = m({ src: e, async: !0 }, n), (n = Kn.get(c)) && If(e, n), d = l.createElement("script"), Ke(d), rn(d, "link", e), l.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(c, d));
    }
  }
  function hw(e, n) {
    Ia.M(e, n);
    var l = Yi;
    if (l && e) {
      var r = Ct(l).hoistableScripts, c = qi(e), d = r.get(c);
      d || (d = l.querySelector(Kr(c)), d || (e = m({ src: e, async: !0, type: "module" }, n), (n = Kn.get(c)) && If(e, n), d = l.createElement("script"), Ke(d), rn(d, "link", e), l.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(c, d));
    }
  }
  function l0(e, n, l, r) {
    var c = (c = me.current) ? js(c) : null;
    if (!c) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (n = Gi(l.href), l = Ct(
          c
        ).hoistableStyles, r = l.get(n), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Gi(l.href);
          var d = Ct(
            c
          ).hoistableStyles, b = d.get(e);
          if (b || (c = c.ownerDocument || c, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, b), (d = c.querySelector(
            Ir(e)
          )) && !d._p && (b.instance = d, b.state.loading = 5), Kn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Kn.set(e, l), d || mw(
            c,
            e,
            l,
            b.state
          ))), n && r === null)
            throw Error(o(528, ""));
          return b;
        }
        if (n && r !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return n = l.async, l = l.src, typeof l == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = qi(l), l = Ct(
          c
        ).hoistableScripts, r = l.get(n), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function Gi(e) {
    return 'href="' + tn(e) + '"';
  }
  function Ir(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function i0(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function mw(e, n, l, r) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? r.loading = 1 : (n = e.createElement("link"), r.preload = n, n.addEventListener("load", function() {
      return r.loading |= 1;
    }), n.addEventListener("error", function() {
      return r.loading |= 2;
    }), rn(n, "link", l), Ke(n), e.head.appendChild(n));
  }
  function qi(e) {
    return '[src="' + tn(e) + '"]';
  }
  function Kr(e) {
    return "script[async]" + e;
  }
  function r0(e, n, l) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + tn(l.href) + '"]'
          );
          if (r)
            return n.instance = r, Ke(r), r;
          var c = m({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), Ke(r), rn(r, "style", c), Ls(r, l.precedence, e), n.instance = r;
        case "stylesheet":
          c = Gi(l.href);
          var d = e.querySelector(
            Ir(c)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, Ke(d), d;
          r = i0(l), (c = Kn.get(c)) && Qf(r, c), d = (e.ownerDocument || e).createElement("link"), Ke(d);
          var b = d;
          return b._p = new Promise(function(_, B) {
            b.onload = _, b.onerror = B;
          }), rn(d, "link", r), n.state.loading |= 4, Ls(d, l.precedence, e), n.instance = d;
        case "script":
          return d = qi(l.src), (c = e.querySelector(
            Kr(d)
          )) ? (n.instance = c, Ke(c), c) : (r = l, (c = Kn.get(d)) && (r = m({}, l), If(r, c)), e = e.ownerDocument || e, c = e.createElement("script"), Ke(c), rn(c, "link", r), e.head.appendChild(c), n.instance = c);
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (r = n.instance, n.state.loading |= 4, Ls(r, l.precedence, e));
    return n.instance;
  }
  function Ls(e, n, l) {
    for (var r = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = r.length ? r[r.length - 1] : null, d = c, b = 0; b < r.length; b++) {
      var _ = r[b];
      if (_.dataset.precedence === n) d = _;
      else if (d !== c) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (n = l.nodeType === 9 ? l.head : l, n.insertBefore(e, n.firstChild));
  }
  function Qf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function If(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Hs = null;
  function o0(e, n, l) {
    if (Hs === null) {
      var r = /* @__PURE__ */ new Map(), c = Hs = /* @__PURE__ */ new Map();
      c.set(l, r);
    } else
      c = Hs, r = c.get(l), r || (r = /* @__PURE__ */ new Map(), c.set(l, r));
    if (r.has(e)) return r;
    for (r.set(e, null), l = l.getElementsByTagName(e), c = 0; c < l.length; c++) {
      var d = l[c];
      if (!(d[Ye] || d[ve] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = d.getAttribute(n) || "";
        b = e + b;
        var _ = r.get(b);
        _ ? _.push(d) : r.set(b, [d]);
      }
    }
    return r;
  }
  function s0(e, n, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function gw(e, n, l) {
    if (l === 1 || n.itemProp != null) return !1;
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
  function u0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function pw(e, n, l, r) {
    if (l.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var c = Gi(r.href), d = n.querySelector(
          Ir(c)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Bs.bind(e), n.then(e, e)), l.state.loading |= 4, l.instance = d, Ke(d);
          return;
        }
        d = n.ownerDocument || n, r = i0(r), (c = Kn.get(c)) && Qf(r, c), d = d.createElement("link"), Ke(d);
        var b = d;
        b._p = new Promise(function(_, B) {
          b.onload = _, b.onerror = B;
        }), rn(d, "link", r), l.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, n), (n = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Bs.bind(e), n.addEventListener("load", l), n.addEventListener("error", l));
    }
  }
  var Kf = 0;
  function yw(e, n) {
    return e.stylesheets && e.count === 0 && ks(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var r = setTimeout(function() {
        if (e.stylesheets && ks(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Kf === 0 && (Kf = 62500 * JS());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ks(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > Kf ? 50 : 800) + n
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(c);
      };
    } : null;
  }
  function Bs() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ks(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Us = null;
  function ks(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Us = /* @__PURE__ */ new Map(), n.forEach(vw, e), Us = null, Bs.call(e));
  }
  function vw(e, n) {
    if (!(n.state.loading & 4)) {
      var l = Us.get(e);
      if (l) var r = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Us.set(e, l);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < c.length; d++) {
          var b = c[d];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (l.set(b.dataset.precedence, b), r = b);
        }
        r && l.set(null, r);
      }
      c = n.instance, b = c.getAttribute("data-precedence"), d = l.get(b) || r, d === r && l.set(null, c), l.set(b, c), this.count++, r = Bs.bind(this), c.addEventListener("load", r), c.addEventListener("error", r), d ? d.parentNode.insertBefore(c, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Fr = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function bw(e, n, l, r, c, d, b, _, B) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = fn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = fn(0), this.hiddenUpdates = fn(null), this.identifierPrefix = r, this.onUncaughtError = c, this.onCaughtError = d, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = B, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function c0(e, n, l, r, c, d, b, _, B, ne, ue, fe) {
    return e = new bw(
      e,
      n,
      l,
      b,
      B,
      ne,
      ue,
      fe,
      _
    ), n = 1, d === !0 && (n |= 24), d = An(3, null, null, n), e.current = d, d.stateNode = e, n = Tc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: r,
      isDehydrated: l,
      cache: n
    }, Dc(d), e;
  }
  function f0(e) {
    return e ? (e = xi, e) : xi;
  }
  function d0(e, n, l, r, c, d) {
    c = f0(c), r.context === null ? r.context = c : r.pendingContext = c, r = hl(n), r.payload = { element: l }, d = d === void 0 ? null : d, d !== null && (r.callback = d), l = ml(e, r, n), l !== null && (wn(l, e, n), Cr(l, e, n));
  }
  function h0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < n ? l : n;
    }
  }
  function Ff(e, n) {
    h0(e, n), (e = e.alternate) && h0(e, n);
  }
  function m0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Yl(e, 67108864);
      n !== null && wn(n, e, 67108864), Ff(e, 67108864);
    }
  }
  function g0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ln();
      n = Z(n);
      var l = Yl(e, n);
      l !== null && wn(l, e, n), Ff(e, n);
    }
  }
  var Vs = !0;
  function xw(e, n, l, r) {
    var c = N.T;
    N.T = null;
    var d = O.p;
    try {
      O.p = 2, Jf(e, n, l, r);
    } finally {
      O.p = d, N.T = c;
    }
  }
  function Sw(e, n, l, r) {
    var c = N.T;
    N.T = null;
    var d = O.p;
    try {
      O.p = 8, Jf(e, n, l, r);
    } finally {
      O.p = d, N.T = c;
    }
  }
  function Jf(e, n, l, r) {
    if (Vs) {
      var c = Pf(r);
      if (c === null)
        Bf(
          e,
          n,
          r,
          Ys,
          l
        ), y0(e, r);
      else if (Ew(
        c,
        e,
        n,
        l,
        r
      ))
        r.stopPropagation();
      else if (y0(e, r), n & 4 && -1 < ww.indexOf(e)) {
        for (; c !== null; ) {
          var d = We(c);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var b = on(d.pendingLanes);
                  if (b !== 0) {
                    var _ = d;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; b; ) {
                      var B = 1 << 31 - zt(b);
                      _.entanglements[1] |= B, b &= ~B;
                    }
                    Sa(d), (lt & 6) === 0 && (Es = yt() + 500, $r(0));
                  }
                }
                break;
              case 31:
              case 13:
                _ = Yl(d, 2), _ !== null && wn(_, d, 2), Ns(), Ff(d, 2);
            }
          if (d = Pf(r), d === null && Bf(
            e,
            n,
            r,
            Ys,
            l
          ), d === c) break;
          c = d;
        }
        c !== null && r.stopPropagation();
      } else
        Bf(
          e,
          n,
          r,
          null,
          l
        );
    }
  }
  function Pf(e) {
    return e = Wu(e), Wf(e);
  }
  var Ys = null;
  function Wf(e) {
    if (Ys = null, e = mt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var l = n.tag;
        if (l === 13) {
          if (e = f(n), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = h(n), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return Ys = e, null;
  }
  function p0(e) {
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
        switch (_t()) {
          case Nt:
            return 2;
          case Pt:
            return 8;
          case qt:
          case Wt:
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
  var ed = !1, Nl = null, Ml = null, Tl = null, Jr = /* @__PURE__ */ new Map(), Pr = /* @__PURE__ */ new Map(), Cl = [], ww = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function y0(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Nl = null;
        break;
      case "dragenter":
      case "dragleave":
        Ml = null;
        break;
      case "mouseover":
      case "mouseout":
        Tl = null;
        break;
      case "pointerover":
      case "pointerout":
        Jr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pr.delete(n.pointerId);
    }
  }
  function Wr(e, n, l, r, c, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: n,
      domEventName: l,
      eventSystemFlags: r,
      nativeEvent: d,
      targetContainers: [c]
    }, n !== null && (n = We(n), n !== null && m0(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), e);
  }
  function Ew(e, n, l, r, c) {
    switch (n) {
      case "focusin":
        return Nl = Wr(
          Nl,
          e,
          n,
          l,
          r,
          c
        ), !0;
      case "dragenter":
        return Ml = Wr(
          Ml,
          e,
          n,
          l,
          r,
          c
        ), !0;
      case "mouseover":
        return Tl = Wr(
          Tl,
          e,
          n,
          l,
          r,
          c
        ), !0;
      case "pointerover":
        var d = c.pointerId;
        return Jr.set(
          d,
          Wr(
            Jr.get(d) || null,
            e,
            n,
            l,
            r,
            c
          )
        ), !0;
      case "gotpointercapture":
        return d = c.pointerId, Pr.set(
          d,
          Wr(
            Pr.get(d) || null,
            e,
            n,
            l,
            r,
            c
          )
        ), !0;
    }
    return !1;
  }
  function v0(e) {
    var n = mt(e.target);
    if (n !== null) {
      var l = u(n);
      if (l !== null) {
        if (n = l.tag, n === 13) {
          if (n = f(l), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              g0(l);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(l), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              g0(l);
            });
            return;
          }
        } else if (n === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Gs(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var l = Pf(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var r = new l.constructor(
          l.type,
          l
        );
        Pu = r, l.target.dispatchEvent(r), Pu = null;
      } else
        return n = We(l), n !== null && m0(n), e.blockedOn = l, !1;
      n.shift();
    }
    return !0;
  }
  function b0(e, n, l) {
    Gs(e) && l.delete(n);
  }
  function _w() {
    ed = !1, Nl !== null && Gs(Nl) && (Nl = null), Ml !== null && Gs(Ml) && (Ml = null), Tl !== null && Gs(Tl) && (Tl = null), Jr.forEach(b0), Pr.forEach(b0);
  }
  function qs(e, n) {
    e.blockedOn === n && (e.blockedOn = null, ed || (ed = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      _w
    )));
  }
  var $s = null;
  function x0(e) {
    $s !== e && ($s = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        $s === e && ($s = null);
        for (var n = 0; n < e.length; n += 3) {
          var l = e[n], r = e[n + 1], c = e[n + 2];
          if (typeof r != "function") {
            if (Wf(r || l) === null)
              continue;
            break;
          }
          var d = We(l);
          d !== null && (e.splice(n, 3), n -= 3, Jc(
            d,
            {
              pending: !0,
              data: c,
              method: l.method,
              action: r
            },
            r,
            c
          ));
        }
      }
    ));
  }
  function $i(e) {
    function n(B) {
      return qs(B, e);
    }
    Nl !== null && qs(Nl, e), Ml !== null && qs(Ml, e), Tl !== null && qs(Tl, e), Jr.forEach(n), Pr.forEach(n);
    for (var l = 0; l < Cl.length; l++) {
      var r = Cl[l];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Cl.length && (l = Cl[0], l.blockedOn === null); )
      v0(l), l.blockedOn === null && Cl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (r = 0; r < l.length; r += 3) {
        var c = l[r], d = l[r + 1], b = c[xe] || null;
        if (typeof d == "function")
          b || x0(l);
        else if (b) {
          var _ = null;
          if (d && d.hasAttribute("formAction")) {
            if (c = d, b = d[xe] || null)
              _ = b.formAction;
            else if (Wf(c) !== null) continue;
          } else _ = b.action;
          typeof _ == "function" ? l[r + 1] = _ : (l.splice(r, 3), r -= 3), x0(l);
        }
      }
  }
  function S0() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
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
      c !== null && (c(), c = null), r || setTimeout(l, 20);
    }
    function l() {
      if (!r && !navigation.transition) {
        var d = navigation.currentEntry;
        d && d.url != null && navigation.navigate(d.url, {
          state: d.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var r = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(l, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), c !== null && (c(), c = null);
      };
    }
  }
  function td(e) {
    this._internalRoot = e;
  }
  Xs.prototype.render = td.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    var l = n.current, r = Ln();
    d0(l, r, e, n, null, null);
  }, Xs.prototype.unmount = td.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      d0(e.current, 2, null, e, null, null), Ns(), n[be] = null;
    }
  };
  function Xs(e) {
    this._internalRoot = e;
  }
  Xs.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = de();
      e = { blockedOn: null, target: e, priority: n };
      for (var l = 0; l < Cl.length && n !== 0 && n < Cl[l].priority; l++) ;
      Cl.splice(l, 0, e), l === 0 && v0(e);
    }
  };
  var w0 = a.version;
  if (w0 !== "19.2.7")
    throw Error(
      o(
        527,
        w0,
        "19.2.7"
      )
    );
  O.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = g(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Nw = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Zs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zs.isDisabled && Zs.supportsFiber)
      try {
        Nn = Zs.inject(
          Nw
        ), $t = Zs;
      } catch {
      }
  }
  return to.createRoot = function(e, n) {
    if (!s(e)) throw Error(o(299));
    var l = !1, r = "", c = Rg, d = Ag, b = Dg;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError)), n = c0(
      e,
      1,
      !1,
      null,
      null,
      l,
      r,
      null,
      c,
      d,
      b,
      S0
    ), e[be] = n.current, Hf(e), new td(n);
  }, to.hydrateRoot = function(e, n, l) {
    if (!s(e)) throw Error(o(299));
    var r = !1, c = "", d = Rg, b = Ag, _ = Dg, B = null;
    return l != null && (l.unstable_strictMode === !0 && (r = !0), l.identifierPrefix !== void 0 && (c = l.identifierPrefix), l.onUncaughtError !== void 0 && (d = l.onUncaughtError), l.onCaughtError !== void 0 && (b = l.onCaughtError), l.onRecoverableError !== void 0 && (_ = l.onRecoverableError), l.formState !== void 0 && (B = l.formState)), n = c0(
      e,
      1,
      !0,
      n,
      l ?? null,
      r,
      c,
      B,
      d,
      b,
      _,
      S0
    ), n.context = f0(null), l = n.current, r = Ln(), r = Z(r), c = hl(r), c.callback = null, ml(l, c, r), l = r, n.current.lanes = l, rt(n, l), Sa(n), e[be] = n.current, Hf(e), new Xs(n);
  }, to.version = "19.2.7", to;
}
var z0;
function Hw() {
  if (z0) return ld.exports;
  z0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), ld.exports = Lw(), ld.exports;
}
var Bw = Hw();
/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var qv = (t) => {
  throw TypeError(t);
}, $v = (t, a, i) => a.has(t) || qv("Cannot " + i), Fn = (t, a, i) => ($v(t, a, "read from private field"), i ? i.call(t) : a.get(t)), oo = (t, a, i) => a.has(t) ? qv("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i), wa = (t, a, i, o) => ($v(t, a, "write to private field"), a.set(t, i), i), Du = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i, rh = /^[\\/]{2}/;
function Xv(t, a) {
  return a + t.replace(/\\/g, "/");
}
function O0(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function Uw(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: o = !1 } = t, s;
  s = a.map(
    (x, S) => y(
      x,
      typeof x == "string" ? null : x.state,
      S === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    i ?? s.length - 1
  ), f = "POP", h = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function g() {
    return s[u];
  }
  function y(x, S = null, A, R) {
    let T = jd(
      s ? g().pathname : "/",
      x,
      S,
      A,
      R
    );
    return Ht(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), T;
  }
  function m(x) {
    return typeof x == "string" ? x : Ca(x);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return f;
    },
    get location() {
      return g();
    },
    createHref: m,
    createURL(x) {
      return new URL(m(x), "http://localhost");
    },
    encodeLocation(x) {
      let S = typeof x == "string" ? ma(x) : x;
      return {
        pathname: S.pathname || "",
        search: S.search || "",
        hash: S.hash || ""
      };
    },
    push(x, S) {
      f = "PUSH";
      let A = O0(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, A), o && h && h({ action: f, location: A, delta: 1 });
    },
    replace(x, S) {
      f = "REPLACE";
      let A = O0(x) ? x : y(x, S);
      s[u] = A, o && h && h({ action: f, location: A, delta: 0 });
    },
    go(x) {
      f = "POP";
      let S = p(u + x), A = s[S];
      u = S, h && h({ action: f, location: A, delta: x });
    },
    listen(x) {
      return h = x, () => {
        h = null;
      };
    }
  };
}
function Ge(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Ht(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function kw() {
  return Math.random().toString(36).substring(2, 10);
}
function jd(t, a, i = null, o, s) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ma(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || o || kw(),
    mask: s
  };
}
function Ca({
  pathname: t = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (t += i.charAt(0) === "#" ? i : "#" + i), t;
}
function ma(t) {
  let a = {};
  if (t) {
    let i = t.indexOf("#");
    i >= 0 && (a.hash = t.substring(i), t = t.substring(0, i));
    let o = t.indexOf("?");
    o >= 0 && (a.search = t.substring(o), t = t.substring(0, o)), t && (a.pathname = t);
  }
  return a;
}
function Vw(t, a, i = !1) {
  let o = "http://localhost";
  t && (o = t.location.origin !== "null" ? t.location.origin : t.location.href), Ge(o, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ca(a);
  return s = s.replace(/ $/, "%20"), !i && rh.test(s) && (s = o + s), new URL(s, o);
}
var so, j0 = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (oo(this, so, /* @__PURE__ */ new Map()), t)
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
    if (Fn(this, so).has(t))
      return Fn(this, so).get(t);
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
    Fn(this, so).set(t, a);
  }
};
so = /* @__PURE__ */ new WeakMap();
var Yw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function Gw(t) {
  return Yw.has(
    t
  );
}
var qw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function $w(t) {
  return qw.has(
    t
  );
}
function Xw(t) {
  return t.index === !0;
}
function go(t, a, i = [], o = {}, s = !1) {
  return t.map((u, f) => {
    let h = [...i, String(f)], p = typeof u.id == "string" ? u.id : h.join("-");
    if (Ge(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ge(
      s || !o[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), Xw(u)) {
      let g = {
        ...u,
        id: p
      };
      return o[p] = L0(
        g,
        a(g)
      ), g;
    } else {
      let g = {
        ...u,
        id: p,
        children: void 0
      };
      return o[p] = L0(
        g,
        a(g)
      ), u.children && (g.children = go(
        u.children,
        a,
        h,
        o,
        s
      )), g;
    }
  });
}
function L0(t, a) {
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
function Zv(t, a, i = "/") {
  return sa(t, a, i, !1);
}
function sa(t, a, i, o, s) {
  let u = typeof a == "string" ? ma(a) : a, f = Wn(u.pathname || "/", i);
  if (f == null)
    return null;
  let h = s ?? ou(t), p = null, g = aE(f);
  for (let y = 0; p == null && y < h.length; ++y)
    p = nE(
      h[y],
      g,
      o
    );
  return p;
}
function Zw(t, a) {
  let { route: i, pathname: o, params: s } = t;
  return {
    id: i.id,
    pathname: o,
    params: s,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function ou(t) {
  let a = Qv(t);
  return Qw(a), a;
}
function Qv(t, a = [], i = [], o = "", s = !1) {
  let u = (f, h, p = s, g) => {
    let y = {
      relativePath: g === void 0 ? f.path || "" : g,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(o) && p)
        return;
      Ge(
        y.relativePath.startsWith(o),
        `Absolute route path "${y.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(o.length);
    }
    let m = Pn([o, y.relativePath]), v = i.concat(y);
    f.children && f.children.length > 0 && (Ge(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
    ), Qv(
      f.children,
      a,
      v,
      m,
      p
    )), !(f.path == null && !f.index) && a.push({
      path: m,
      score: eE(m, f.index),
      routesMeta: v.map((x, S) => {
        let [A, R] = Fv(
          x.relativePath,
          x.caseSensitive,
          S === v.length - 1
        );
        return {
          ...x,
          matcher: A,
          compiledParams: R
        };
      })
    });
  };
  return t.forEach((f, h) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, h);
    else
      for (let p of Iv(f.path))
        u(f, h, !0, p);
  }), a;
}
function Iv(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...o] = a, s = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [u, ""] : [u];
  let f = Iv(o.join("/")), h = [];
  return h.push(
    ...f.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && h.push(...f), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function Qw(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : tE(
      a.routesMeta.map((o) => o.childrenIndex),
      i.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var Iw = /^:[\w-]+$/, Kw = 3, Fw = 2, Jw = 1, Pw = 10, Ww = -2, H0 = (t) => t === "*";
function eE(t, a) {
  let i = t.split("/"), o = i.length;
  return i.some(H0) && (o += Ww), a && (o += Fw), i.filter((s) => !H0(s)).reduce(
    (s, u) => s + (Iw.test(u) ? Kw : u === "" ? Jw : Pw),
    o
  );
}
function tE(t, a) {
  return t.length === a.length && t.slice(0, -1).every((o, s) => o === a[s]) ? (
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
function nE(t, a, i = !1) {
  let { routesMeta: o } = t, s = {}, u = "/", f = [];
  for (let h = 0; h < o.length; ++h) {
    let p = o[h], g = h === o.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", m = {
      path: p.relativePath,
      caseSensitive: p.caseSensitive,
      end: g
    }, v = (
      // Use precomputed matcher if it exists
      p.matcher && p.compiledParams ? Kv(
        m,
        y,
        p.matcher,
        p.compiledParams
      ) : vu(m, y)
    ), x = p.route;
    if (!v && g && i && !o[o.length - 1].route.index && (v = vu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !v)
      return null;
    Object.assign(s, v.params), f.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: Pn([u, v.pathname]),
      pathnameBase: rE(
        Pn([u, v.pathnameBase])
      ),
      route: x
    }), v.pathnameBase !== "/" && (u = Pn([u, v.pathnameBase]));
  }
  return f;
}
function vu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, o] = Fv(
    t.path,
    t.caseSensitive,
    t.end
  );
  return Kv(t, a, i, o);
}
function Kv(t, a, i, o) {
  let s = a.match(i);
  if (!s) return null;
  let u = s[0], f = u.replace(/(.)\/+$/, "$1"), h = s.slice(1);
  return {
    params: o.reduce(
      (g, { paramName: y, isOptional: m }, v) => {
        if (y === "*") {
          let S = h[v] || "";
          f = u.slice(0, u.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const x = h[v];
        return m && !x ? g[y] = void 0 : g[y] = (x || "").replace(/%2F/g, "/"), g;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function Fv(t, a = !1, i = !0) {
  Ht(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let o = [], s = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, h, p, g, y) => {
      if (o.push({ paramName: h, isOptional: p != null }), p) {
        let m = y.charAt(g + f.length);
        return m && m !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (o.push({ paramName: "*" }), s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? s += "\\/*$" : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), o];
}
function aE(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Ht(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function Wn(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, o = t.charAt(i);
  return o && o !== "/" ? null : t.slice(i) || "/";
}
function lE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Pn([t, a]);
}
var oh = (t) => Du.test(t);
function iE(t, a = "/") {
  let {
    pathname: i,
    search: o = "",
    hash: s = ""
  } = typeof t == "string" ? ma(t) : t, u;
  return i ? (i = uh(i), i.startsWith("/") ? u = B0(i.substring(1), "/") : u = B0(i, a)) : u = a, {
    pathname: u,
    search: oE(o),
    hash: sE(s)
  };
}
function B0(t, a) {
  let i = bu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? i.length > 1 && i.pop() : s !== "." && i.push(s);
  }), i.length > 1 ? i.join("/") : "/";
}
function sd(t, a, i, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Jv(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function sh(t) {
  let a = Jv(t);
  return a.map(
    (i, o) => o === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function zu(t, a, i, o = !1) {
  let s;
  typeof t == "string" ? s = ma(t) : (s = { ...t }, Ge(
    !s.pathname || !s.pathname.includes("?"),
    sd("?", "pathname", "search", s)
  ), Ge(
    !s.pathname || !s.pathname.includes("#"),
    sd("#", "pathname", "hash", s)
  ), Ge(
    !s.search || !s.search.includes("#"),
    sd("#", "search", "hash", s)
  ));
  let u = t === "" || s.pathname === "", f = u ? "/" : s.pathname, h;
  if (f == null)
    h = i;
  else {
    let m = a.length - 1;
    if (!o && f.startsWith("..")) {
      let v = f.split("/");
      for (; v[0] === ".."; )
        v.shift(), m -= 1;
      s.pathname = v.join("/");
    }
    h = m >= 0 ? a[m] : "/";
  }
  let p = iE(s, h), g = f && f !== "/" && f.endsWith("/"), y = (u || f === ".") && i.endsWith("/");
  return !p.pathname.endsWith("/") && (g || y) && (p.pathname += "/"), p;
}
var uh = (t) => t.replace(/[\\/]{2,}/g, "/"), Pn = (t) => uh(t.join("/")), bu = (t) => t.replace(/\/+$/, ""), rE = (t) => bu(t).replace(/^\/*/, "/"), oE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, sE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, U0 = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let o = new Headers(i.headers);
  return o.set("Location", t), new Response(null, { ...i, headers: o });
}, Ou = class {
  constructor(t, a, i, o = !1) {
    this.status = t, this.statusText = a || "", this.internal = o, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function po(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function To(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Pn(a) || "/";
}
var Pv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Wv(t, a) {
  let i = t;
  if (typeof i != "string" || !Du.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let o = i, s = !1;
  if (Pv)
    try {
      let u = new URL(window.location.href), f = rh.test(i) ? new URL(Xv(i, u.protocol)) : new URL(i), h = Wn(f.pathname, a);
      f.origin === u.origin && h != null ? i = h + f.search + f.hash : s = !0;
    } catch {
      Ht(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: o,
    isExternal: s,
    to: i
  };
}
var Ll = Symbol("Uninstrumented");
function uE(t, a) {
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
    (s) => s({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(u) {
        let f = Object.keys(i);
        for (let h of f)
          u[h] && i[h].push(u[h]);
      }
    })
  );
  let o = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let s = Ki(i.lazy, a.lazy, () => {
    });
    s && (o.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = s[u], h = i[`lazy.${u}`];
      if (typeof f == "function" && h.length > 0) {
        let p = Ki(h, f, () => {
        });
        p && (o.lazy = Object.assign(o.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && i[s].length > 0) {
      let f = u[Ll] ?? u, h = Ki(
        i[s],
        f,
        (...p) => k0(p[0])
      );
      h && (s === "loader" && f.hydrate === !0 && (h.hydrate = !0), h[Ll] = f, o[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (o.middleware = a.middleware.map((s) => {
    let u = s[Ll] ?? s, f = Ki(
      i.middleware,
      u,
      (...h) => k0(h[0])
    );
    return f ? (f[Ll] = u, f) : s;
  })), o;
}
function cE(t, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (o) => o({
      instrument(s) {
        let u = Object.keys(s);
        for (let f of u)
          s[f] && i[f].push(s[f]);
      }
    })
  ), i.navigate.length > 0) {
    let o = t.navigate[Ll] ?? t.navigate, s = Ki(
      i.navigate,
      o,
      (...u) => {
        let [f, h] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Ca(f) : ".",
          ...V0(t, h ?? {})
        };
      }
    );
    s && (s[Ll] = o, t.navigate = s);
  }
  if (i.fetch.length > 0) {
    let o = t.fetch[Ll] ?? t.fetch, s = Ki(i.fetch, o, (...u) => {
      let [f, , h, p] = u;
      return {
        href: h ?? ".",
        fetcherKey: f,
        ...V0(t, p ?? {})
      };
    });
    s && (s[Ll] = o, t.fetch = s);
  }
  return t;
}
function Ki(t, a, i) {
  return t.length === 0 ? null : async (...o) => {
    let s = await eb(
      t,
      i(...o),
      () => a(...o),
      t.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function eb(t, a, i, o) {
  let s = t[o], u;
  if (s) {
    let f, h = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = eb(t, a, i, o - 1), u = await f, Ge(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    f || await h(), await f;
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (f) {
      u = { type: "error", value: f };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function k0(t) {
  let { request: a, context: i, params: o, pattern: s } = t;
  return {
    request: fE(a),
    params: { ...o },
    pattern: s,
    context: dE(i)
  };
}
function V0(t, a) {
  return {
    currentUrl: Ca(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function fE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function dE(t) {
  if (mE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var hE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function mE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === hE;
}
var tb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], gE = new Set(
  tb
), pE = [
  "GET",
  ...tb
], yE = new Set(pE), nb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), vE = /* @__PURE__ */ new Set([307, 308]), ud = {
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
}, bE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, no = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, xE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), ab = "remix-router-transitions", lb = Symbol("ResetLoaderData"), ei, Zi, zl, Qi, SE = class {
  constructor(t) {
    oo(this, ei), oo(this, Zi), oo(this, zl), oo(this, Qi), wa(this, ei, t), wa(this, Zi, ou(t));
  }
  /** The stable route tree */
  get stableRoutes() {
    return Fn(this, ei);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return Fn(this, zl) ?? Fn(this, ei);
  }
  /** Pre-computed branches */
  get branches() {
    return Fn(this, Qi) ?? Fn(this, Zi);
  }
  get hasHMRRoutes() {
    return Fn(this, zl) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    wa(this, ei, t), wa(this, Zi, ou(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    wa(this, zl, t), wa(this, Qi, ou(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Fn(this, zl) && (wa(this, ei, Fn(this, zl)), wa(this, Zi, Fn(this, Qi)), wa(this, zl, void 0), wa(this, Qi, void 0));
  }
};
ei = /* @__PURE__ */ new WeakMap();
Zi = /* @__PURE__ */ new WeakMap();
zl = /* @__PURE__ */ new WeakMap();
Qi = /* @__PURE__ */ new WeakMap();
function wE(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ge(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o = t.hydrationRouteProperties || [], s = t.mapRouteProperties || xE, u = s;
  if (t.instrumentations) {
    let H = t.instrumentations;
    u = (Z) => ({
      ...s(Z),
      ...uE(
        H.map((W) => W.route).filter(Boolean),
        Z
      )
    });
  }
  let f = {}, h = new SE(
    go(
      t.routes,
      u,
      void 0,
      f
    )
  ), p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let g = t.dataStrategy || TE, y = {
    ...t.future
  }, m = null, v = /* @__PURE__ */ new Set(), x = null, S = null, A = null, R = null, T = t.hydrationData != null, L = sa(
    h.activeRoutes,
    t.history.location,
    p,
    !1,
    h.branches
  ), E = !1, z = null, Y, U;
  if (L == null && !t.patchRoutesOnNavigation) {
    let H = Jn(404, {
      pathname: t.history.location.pathname
    }), { matches: Z, route: W } = Qs(h.activeRoutes);
    Y = !0, U = !Y, L = Z, z = { [W.id]: H };
  } else if (L && !t.hydrationData && fn(
    L,
    h.activeRoutes,
    t.history.location.pathname
  ).active && (L = null), L)
    if (L.some((H) => H.route.lazy))
      Y = !1, U = !Y;
    else if (!L.some((H) => ch(H.route)))
      Y = !0, U = !Y;
    else {
      let H = t.hydrationData ? t.hydrationData.loaderData : null, Z = t.hydrationData ? t.hydrationData.errors : null, W = L;
      if (Z) {
        let de = L.findIndex(
          (he) => Z[he.route.id] !== void 0
        );
        W = W.slice(0, de + 1);
      }
      U = !1, Y = !0, W.forEach((de) => {
        let he = ib(de.route, H, Z);
        U = U || he.renderFallback, Y = Y && !he.shouldLoad;
      });
    }
  else {
    Y = !1, U = !Y, L = [];
    let H = fn(
      null,
      h.activeRoutes,
      t.history.location.pathname
    );
    H.active && H.matches && (E = !0, L = H.matches);
  }
  let V, C = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: L,
    initialized: Y,
    renderFallback: U,
    navigation: ud,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || z,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, G = "POP", P = null, I = !1, J, oe = !1, j = /* @__PURE__ */ new Map(), X = null, N = !1, O = !1, Q = /* @__PURE__ */ new Set(), $ = /* @__PURE__ */ new Map(), le = 0, D = -1, k = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Set(), ae = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Set(), ge = /* @__PURE__ */ new Map(), ee, pe = null;
  function ze() {
    if (m = t.history.listen(
      ({ action: H, location: Z, delta: W }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        Ht(
          ge.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = Vn({
          currentLocation: C.location,
          nextLocation: Z,
          historyAction: H
        });
        if (de && W != null) {
          let he = new Promise((Ee) => {
            ee = Ee;
          });
          t.history.go(W * -1), Mn(de, {
            state: "blocked",
            location: Z,
            proceed() {
              Mn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Z
              }), he.then(() => t.history.go(W));
            },
            reset() {
              let Ee = new Map(C.blockers);
              Ee.set(de, no), Se({ blockers: Ee });
            }
          }), P?.resolve(), P = null;
          return;
        }
        return it(H, Z);
      }
    ), i) {
      ZE(a, j);
      let H = () => QE(a, j);
      a.addEventListener("pagehide", H), X = () => a.removeEventListener("pagehide", H);
    }
    return C.initialized || it("POP", C.location, {
      initialHydration: !0
    }), V;
  }
  function Ae() {
    m && m(), X && X(), v.clear(), J && J.abort(), C.fetchers.forEach((H, Z) => Nn(C.fetchers, Z)), C.blockers.forEach((H, Z) => ta(Z));
  }
  function we(H) {
    if (v.add(H), x) {
      let { newErrors: Z } = x;
      x = null, H(C, {
        deletedFetchers: [],
        newErrors: Z,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(H);
  }
  function Se(H, Z = {}) {
    H.matches && (H.matches = H.matches.map((he) => {
      let Ee = f[he.route.id], ve = he.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...he,
        route: Ee
      } : he;
    })), C = {
      ...C,
      ...H
    };
    let W = [], de = [];
    C.fetchers.forEach((he, Ee) => {
      he.state === "idle" && (me.has(Ee) ? W.push(Ee) : de.push(Ee));
    }), me.forEach((he) => {
      !C.fetchers.has(he) && !$.has(he) && W.push(he);
    }), v.size === 0 && (x = { newErrors: H.errors ?? null }), [...v].forEach(
      (he) => he(C, {
        deletedFetchers: W,
        newErrors: H.errors ?? null,
        viewTransitionOpts: Z.viewTransitionOpts,
        flushSync: Z.flushSync === !0
      })
    ), W.forEach((he) => Nn(C.fetchers, he)), de.forEach((he) => C.fetchers.delete(he));
  }
  function De(H, Z, { flushSync: W } = {}) {
    let de = C.actionData != null && C.navigation.formMethod != null && cn(C.navigation.formMethod) && C.navigation.state === "loading" && H.state?._isRedirect !== !0, he;
    Z.actionData ? Object.keys(Z.actionData).length > 0 ? he = Z.actionData : he = null : de ? he = C.actionData : he = null;
    let Ee = Z.loaderData ? F0(
      C.loaderData,
      Z.loaderData,
      Z.matches || [],
      Z.errors
    ) : C.loaderData, ve = C.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((Te, Be) => ve.set(Be, no)));
    let xe = N ? !1 : Ot(H, Z.matches || C.matches), be = I === !0 || C.navigation.formMethod != null && cn(C.navigation.formMethod) && H.state?._isRedirect !== !0;
    h.commitHmrRoutes(), N || G === "POP" || (G === "PUSH" ? t.history.push(H, H.state) : G === "REPLACE" && t.history.replace(H, H.state));
    let Me;
    if (G === "POP") {
      let Te = j.get(C.location.pathname);
      Te && Te.has(H.pathname) ? Me = {
        currentLocation: C.location,
        nextLocation: H
      } : j.has(H.pathname) && (Me = {
        currentLocation: H,
        nextLocation: C.location
      });
    } else if (oe) {
      let Te = j.get(C.location.pathname);
      Te ? Te.add(H.pathname) : (Te = /* @__PURE__ */ new Set([H.pathname]), j.set(C.location.pathname, Te)), Me = {
        currentLocation: C.location,
        nextLocation: H
      };
    }
    Se(
      {
        ...Z,
        // matches, errors, fetchers go through as-is
        actionData: he,
        loaderData: Ee,
        historyAction: G,
        location: H,
        initialized: !0,
        renderFallback: !1,
        navigation: ud,
        revalidation: "idle",
        restoreScrollPosition: xe,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Me,
        flushSync: W === !0
      }
    ), G = "POP", I = !1, oe = !1, N = !1, O = !1, P?.resolve(), P = null, pe?.resolve(), pe = null;
  }
  async function qe(H, Z) {
    if (P?.resolve(), P = null, typeof H == "number") {
      P || (P = ey());
      let Je = P.promise;
      return t.history.go(H), Je;
    }
    let W = Ld(
      C.location,
      C.matches,
      p,
      H,
      Z?.fromRouteId,
      Z?.relative
    ), { path: de, submission: he, error: Ee } = Y0(
      !1,
      W,
      Z
    ), ve;
    Z?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Z.mask == "string" ? ma(Z.mask) : {
        ...C.location.mask,
        ...Z.mask
      }
    });
    let xe = C.location, be = jd(
      xe,
      de,
      Z && Z.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...t.history.encodeLocation(be)
    };
    let Me = Z && Z.replace != null ? Z.replace : void 0, Te = "PUSH";
    Me === !0 ? Te = "REPLACE" : Me === !1 || he != null && cn(he.formMethod) && he.formAction === C.location.pathname + C.location.search && (Te = "REPLACE");
    let Be = Z && "preventScrollReset" in Z ? Z.preventScrollReset === !0 : void 0, Oe = (Z && Z.flushSync) === !0, Ye = Vn({
      currentLocation: xe,
      nextLocation: be,
      historyAction: Te
    });
    if (Ye) {
      Mn(Ye, {
        state: "blocked",
        location: be,
        proceed() {
          Mn(Ye, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), qe(H, Z);
        },
        reset() {
          let Je = new Map(C.blockers);
          Je.set(Ye, no), Se({ blockers: Je });
        }
      });
      return;
    }
    await it(Te, be, {
      submission: he,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Be,
      replace: Z && Z.replace,
      enableViewTransition: Z && Z.viewTransition,
      flushSync: Oe,
      callSiteDefaultShouldRevalidate: Z && Z.defaultShouldRevalidate
    });
  }
  function nt() {
    pe || (pe = ey()), qt(), Se({ revalidation: "loading" });
    let H = pe.promise;
    return C.navigation.state === "submitting" ? H : C.navigation.state === "idle" ? (it(C.historyAction, C.location, {
      startUninterruptedRevalidation: !0
    }), H) : (it(
      G || C.historyAction,
      C.navigation.location,
      {
        overrideNavigation: C.navigation,
        // Proxy through any rending view transition
        enableViewTransition: oe === !0
      }
    ), H);
  }
  async function it(H, Z, W) {
    J && J.abort(), J = null, G = H, N = (W && W.startUninterruptedRevalidation) === !0, Rt(C.location, C.matches), I = (W && W.preventScrollReset) === !0, oe = (W && W.enableViewTransition) === !0;
    let de = h.activeRoutes, he = W?.initialHydration && C.matches && C.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      C.matches
    ) : sa(
      de,
      Z,
      p,
      !1,
      h.branches
    ), Ee = (W && W.flushSync) === !0;
    if (he && C.initialized && !O && HE(C.location, Z) && !(W && W.submission && cn(W.submission.formMethod))) {
      De(Z, { matches: he }, { flushSync: Ee });
      return;
    }
    let ve = fn(he, de, Z.pathname);
    if (ve.active && ve.matches && (he = ve.matches), !he) {
      let { error: We, notFoundMatches: Ze, route: Ct } = on(
        Z.pathname
      );
      De(
        Z,
        {
          matches: Ze,
          loaderData: {},
          errors: {
            [Ct.id]: We
          }
        },
        { flushSync: Ee }
      );
      return;
    }
    let xe = W && W.overrideNavigation ? {
      ...W.overrideNavigation,
      matches: he,
      historyAction: H
    } : void 0;
    J = new AbortController();
    let be = Ii(
      t.history,
      Z,
      J.signal,
      W && W.submission
    ), Me = t.getContext ? await t.getContext() : new j0(), Te;
    if (W && W.pendingError)
      Te = [
        Ol(he).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && cn(W.submission.formMethod)) {
      let We = await Ft(
        be,
        Z,
        W.submission,
        he,
        H,
        Me,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (We.shortCircuited)
        return;
      if (We.pendingActionResult) {
        let [Ze, Ct] = We.pendingActionResult;
        if (Hn(Ct) && po(Ct.error) && Ct.error.status === 404) {
          J = null, De(Z, {
            matches: We.matches,
            loaderData: {},
            errors: {
              [Ze]: Ct.error
            }
          });
          return;
        }
      }
      he = We.matches || he, Te = We.pendingActionResult, xe = cd(
        Z,
        he,
        H,
        W.submission
      ), Ee = !1, ve.active = !1, be = Ii(
        t.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Be,
      matches: Oe,
      loaderData: Ye,
      errors: Je,
      workingFetchers: mt
    } = await pt(
      be,
      Z,
      he,
      H,
      Me,
      ve.active,
      xe,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      Te,
      W && W.callSiteDefaultShouldRevalidate
    );
    Be || (J = null, De(Z, {
      matches: Oe || he,
      ...J0(Te),
      loaderData: Ye,
      errors: Je,
      ...mt ? { fetchers: mt } : {}
    }));
  }
  async function Ft(H, Z, W, de, he, Ee, ve, xe, be = {}) {
    qt();
    let Me = $E(
      Z,
      de,
      he,
      W
    );
    if (Se({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let Oe = await rt(
        de,
        Z.pathname,
        H.signal
      );
      if (Oe.type === "aborted")
        return { shortCircuited: !0 };
      if (Oe.type === "error") {
        if (Oe.partialMatches.length === 0) {
          let { matches: Je, route: mt } = Qs(
            h.activeRoutes
          );
          return {
            matches: Je,
            pendingActionResult: [
              mt.id,
              {
                type: "error",
                error: Oe.error
              }
            ]
          };
        }
        let Ye = Ol(Oe.partialMatches).route.id;
        return {
          matches: Oe.partialMatches,
          pendingActionResult: [
            Ye,
            {
              type: "error",
              error: Oe.error
            }
          ]
        };
      } else if (Oe.matches)
        de = Oe.matches;
      else {
        let { notFoundMatches: Ye, error: Je, route: mt } = on(
          Z.pathname
        );
        return {
          matches: Ye,
          pendingActionResult: [
            mt.id,
            {
              type: "error",
              error: Je
            }
          ]
        };
      }
    }
    let Te, Be = su(de, Z);
    if (!Be.route.action && !Be.route.lazy)
      Te = {
        type: "error",
        error: Jn(405, {
          method: H.method,
          pathname: Z.pathname,
          routeId: Be.route.id
        })
      };
    else {
      let Oe = Wi(
        u,
        f,
        H,
        Z,
        de,
        Be,
        xe ? [] : o,
        Ee
      ), Ye = await Nt(
        H,
        Z,
        Oe,
        Ee,
        null
      );
      if (Te = Ye[Be.route.id], !Te) {
        for (let Je of de)
          if (Ye[Je.route.id]) {
            Te = Ye[Je.route.id];
            break;
          }
      }
      if (H.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (ni(Te)) {
      let Oe;
      return be && be.replace != null ? Oe = be.replace : Oe = Q0(
        Te.response.headers.get("Location"),
        new URL(H.url),
        p,
        t.history
      ) === C.location.pathname + C.location.search, await _t(H, Te, !0, {
        submission: W,
        replace: Oe
      }), { shortCircuited: !0 };
    }
    if (Hn(Te)) {
      let Oe = Ol(de, Be.route.id);
      return (be && be.replace) !== !0 && (G = "PUSH"), {
        matches: de,
        pendingActionResult: [
          Oe.route.id,
          Te,
          Be.route.id
        ]
      };
    }
    return {
      matches: de,
      pendingActionResult: [Be.route.id, Te]
    };
  }
  async function pt(H, Z, W, de, he, Ee, ve, xe, be, Me, Te, Be, Oe, Ye) {
    let Je = ve || cd(Z, W, de, xe), mt = xe || be || W0(Je), We = !N && !Te;
    if (Ee) {
      if (We) {
        let st = Gt(Oe);
        Se(
          {
            navigation: Je,
            ...st !== void 0 ? { actionData: st } : {}
          },
          {
            flushSync: Be
          }
        );
      }
      let He = await rt(
        W,
        Z.pathname,
        H.signal
      );
      if (He.type === "aborted")
        return { shortCircuited: !0 };
      if (He.type === "error") {
        if (He.partialMatches.length === 0) {
          let { matches: dn, route: Cn } = Qs(
            h.activeRoutes
          );
          return {
            matches: dn,
            loaderData: {},
            errors: {
              [Cn.id]: He.error
            }
          };
        }
        let st = Ol(He.partialMatches).route.id;
        return {
          matches: He.partialMatches,
          loaderData: {},
          errors: {
            [st]: He.error
          }
        };
      } else if (He.matches)
        W = He.matches;
      else {
        let { error: st, notFoundMatches: dn, route: Cn } = on(
          Z.pathname
        );
        return {
          matches: dn,
          loaderData: {},
          errors: {
            [Cn.id]: st
          }
        };
      }
    }
    let Ze = h.activeRoutes, { dsMatches: Ct, revalidatingFetchers: Ke } = G0(
      H,
      he,
      u,
      f,
      t.history,
      C,
      W,
      mt,
      Z,
      Te ? [] : o,
      Te === !0,
      O,
      Q,
      me,
      ae,
      K,
      Ze,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      Oe,
      Ye
    );
    if (D = ++le, !t.dataStrategy && !Ct.some((He) => He.shouldLoad) && !Ct.some(
      (He) => He.route.middleware && He.route.middleware.length > 0
    ) && Ke.length === 0) {
      let He = new Map(C.fetchers), st = nl(He);
      return De(
        Z,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Oe && Hn(Oe[1]) ? { [Oe[0]]: Oe[1].error } : null,
          ...J0(Oe),
          ...st ? { fetchers: He } : {}
        },
        { flushSync: Be }
      ), { shortCircuited: !0 };
    }
    if (We) {
      let He = {};
      if (!Ee) {
        He.navigation = Je;
        let st = Gt(Oe);
        st !== void 0 && (He.actionData = st);
      }
      Ke.length > 0 && (He.fetchers = Jt(Ke)), Se(He, { flushSync: Be });
    }
    Ke.forEach((He) => {
      Tt(He.key), He.controller && $.set(He.key, He.controller);
    });
    let ya = () => Ke.forEach((He) => Tt(He.key));
    J && J.signal.addEventListener(
      "abort",
      ya
    );
    let { loaderResults: Tn, fetcherResults: sn } = await Pt(
      Ct,
      Ke,
      H,
      Z,
      he
    );
    if (H.signal.aborted)
      return { shortCircuited: !0 };
    J && J.signal.removeEventListener(
      "abort",
      ya
    ), Ke.forEach((He) => $.delete(He.key));
    let en = Is(Tn);
    if (en)
      return await _t(H, en.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (en = Is(sn), en)
      return K.add(en.key), await _t(H, en.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let gn = new Map(C.fetchers), { loaderData: al, errors: pn } = K0(
      C,
      W,
      Tn,
      Oe,
      Ke,
      sn,
      gn
    );
    Te && C.errors && (pn = { ...C.errors, ...pn });
    let ll = nl(gn), aa = pa(
      D,
      gn
    ), la = ll || aa || Ke.length > 0;
    return {
      matches: W,
      loaderData: al,
      errors: pn,
      ...la ? { workingFetchers: gn } : {}
    };
  }
  function Gt(H) {
    if (H && !Hn(H[1]))
      return {
        [H[0]]: H[1].data
      };
    if (C.actionData)
      return Object.keys(C.actionData).length === 0 ? null : C.actionData;
  }
  function Jt(H) {
    let Z = new Map(C.fetchers);
    return H.forEach((W) => {
      let de = Z.get(W.key), he = ao(
        void 0,
        de ? de.data : void 0
      );
      Z.set(W.key, he);
    }), Z;
  }
  async function Et(H, Z, W, de) {
    Tt(H);
    let he = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = Ld(
      C.location,
      C.matches,
      p,
      W,
      Z,
      de?.relative
    ), xe = sa(
      Ee,
      ve,
      p,
      !1,
      h.branches
    ), be = fn(xe, Ee, ve);
    if (be.active && be.matches && (xe = be.matches), !xe) {
      Mt(
        H,
        Z,
        Jn(404, { pathname: ve }),
        { flushSync: he }
      );
      return;
    }
    let { path: Me, submission: Te, error: Be } = Y0(
      !0,
      ve,
      de
    );
    if (Be) {
      Mt(H, Z, Be, { flushSync: he });
      return;
    }
    let Oe = t.getContext ? await t.getContext() : new j0(), Ye = (de && de.preventScrollReset) === !0;
    if (Te && cn(Te.formMethod)) {
      await Qt(
        H,
        Z,
        Me,
        xe,
        Oe,
        be.active,
        he,
        Ye,
        Te,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    ae.set(H, { routeId: Z, path: Me }), await yt(
      H,
      Z,
      Me,
      xe,
      Oe,
      be.active,
      he,
      Ye,
      Te
    );
  }
  async function Qt(H, Z, W, de, he, Ee, ve, xe, be, Me) {
    qt(), ae.delete(H);
    let Te = C.fetchers.get(H);
    Wt(H, XE(be, Te), {
      flushSync: ve
    });
    let Be = new AbortController(), Oe = Ii(
      t.history,
      W,
      Be.signal,
      be
    );
    if (Ee) {
      let at = await rt(
        de,
        new URL(Oe.url).pathname,
        Oe.signal,
        H
      );
      if (at.type === "aborted")
        return;
      if (at.type === "error") {
        Mt(H, Z, at.error, { flushSync: ve });
        return;
      } else if (at.matches)
        de = at.matches;
      else {
        Mt(
          H,
          Z,
          Jn(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ye = su(de, W);
    if (!Ye.route.action && !Ye.route.lazy) {
      let at = Jn(405, {
        method: be.formMethod,
        pathname: W,
        routeId: Z
      });
      Mt(H, Z, at, { flushSync: ve });
      return;
    }
    $.set(H, Be);
    let Je = le, mt = Wi(
      u,
      f,
      Oe,
      W,
      de,
      Ye,
      o,
      he
    ), We = await Nt(
      Oe,
      W,
      mt,
      he,
      H
    ), Ze = We[Ye.route.id];
    if (!Ze) {
      for (let at of mt)
        if (We[at.route.id]) {
          Ze = We[at.route.id];
          break;
        }
    }
    if (Oe.signal.aborted) {
      $.get(H) === Be && $.delete(H);
      return;
    }
    if (me.has(H)) {
      if (ni(Ze) || Hn(Ze)) {
        Wt(H, _a(void 0));
        return;
      }
    } else {
      if (ni(Ze))
        if ($.delete(H), D > Je) {
          Wt(H, _a(void 0));
          return;
        } else
          return K.add(H), Wt(H, ao(be)), _t(Oe, Ze, !1, {
            fetcherSubmission: be,
            preventScrollReset: xe
          });
      if (Hn(Ze)) {
        Mt(H, Z, Ze.error);
        return;
      }
    }
    let Ct = C.navigation.location || C.location, Ke = Ii(
      t.history,
      Ct,
      Be.signal
    ), ya = h.activeRoutes, Tn = C.navigation.state !== "idle" ? sa(
      ya,
      C.navigation.location,
      p,
      !1,
      h.branches
    ) : C.matches;
    Ge(Tn, "Didn't find any matches after fetcher action");
    let sn = ++le;
    k.set(H, sn);
    let { dsMatches: en, revalidatingFetchers: gn } = G0(
      Ke,
      he,
      u,
      f,
      t.history,
      C,
      Tn,
      be,
      Ct,
      o,
      !1,
      O,
      Q,
      me,
      ae,
      K,
      ya,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      [Ye.route.id, Ze],
      Me
    ), al = ao(be, Ze.data), pn = new Map(C.fetchers);
    pn.set(H, al), gn.filter((at) => at.key !== H).forEach((at) => {
      let Yn = at.key, tn = pn.get(Yn), Bl = ao(
        void 0,
        tn ? tn.data : void 0
      );
      pn.set(Yn, Bl), Tt(Yn), at.controller && $.set(Yn, at.controller);
    }), Se({ fetchers: pn });
    let ll = () => gn.forEach((at) => Tt(at.key));
    Be.signal.addEventListener(
      "abort",
      ll
    );
    let { loaderResults: aa, fetcherResults: la } = await Pt(
      en,
      gn,
      Ke,
      Ct,
      he
    );
    if (Be.signal.aborted)
      return;
    Be.signal.removeEventListener(
      "abort",
      ll
    ), k.delete(H), $.delete(H), gn.forEach((at) => $.delete(at.key));
    let He = C.fetchers.has(H), st = (at) => {
      if (!He) return at;
      let Yn = new Map(at.fetchers);
      return Yn.set(H, _a(Ze.data)), { ...at, fetchers: Yn };
    }, dn = Is(aa);
    if (dn)
      return C = st(C), _t(
        Ke,
        dn.result,
        !1,
        { preventScrollReset: xe }
      );
    if (dn = Is(la), dn)
      return K.add(dn.key), C = st(C), _t(
        Ke,
        dn.result,
        !1,
        { preventScrollReset: xe }
      );
    let Cn = new Map(C.fetchers);
    He && Cn.set(H, _a(Ze.data));
    let { loaderData: il, errors: Da } = K0(
      C,
      Tn,
      aa,
      void 0,
      gn,
      la,
      Cn
    );
    pa(sn, Cn), C.navigation.state === "loading" && sn > D ? (Ge(G, "Expected pending action"), J && J.abort(), De(C.navigation.location, {
      matches: Tn,
      loaderData: il,
      errors: Da,
      fetchers: Cn
    })) : (Se({
      errors: Da,
      loaderData: F0(
        C.loaderData,
        il,
        Tn,
        Da
      ),
      fetchers: Cn
    }), O = !1);
  }
  async function yt(H, Z, W, de, he, Ee, ve, xe, be) {
    let Me = C.fetchers.get(H);
    Wt(
      H,
      ao(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let Te = new AbortController(), Be = Ii(
      t.history,
      W,
      Te.signal
    );
    if (Ee) {
      let Ze = await rt(
        de,
        new URL(Be.url).pathname,
        Be.signal,
        H
      );
      if (Ze.type === "aborted")
        return;
      if (Ze.type === "error") {
        Mt(H, Z, Ze.error, { flushSync: ve });
        return;
      } else if (Ze.matches)
        de = Ze.matches;
      else {
        Mt(
          H,
          Z,
          Jn(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Oe = su(de, W);
    $.set(H, Te);
    let Ye = le, Je = Wi(
      u,
      f,
      Be,
      W,
      de,
      Oe,
      o,
      he
    ), mt = await Nt(
      Be,
      W,
      Je,
      he,
      H
    ), We = mt[Oe.route.id];
    if (!We) {
      for (let Ze of de)
        if (mt[Ze.route.id]) {
          We = mt[Ze.route.id];
          break;
        }
    }
    if ($.get(H) === Te && $.delete(H), !Be.signal.aborted) {
      if (me.has(H)) {
        Wt(H, _a(void 0));
        return;
      }
      if (ni(We))
        if (D > Ye) {
          Wt(H, _a(void 0));
          return;
        } else {
          K.add(H), await _t(Be, We, !1, {
            preventScrollReset: xe
          });
          return;
        }
      if (Hn(We)) {
        Mt(H, Z, We.error);
        return;
      }
      Wt(H, _a(We.data));
    }
  }
  async function _t(H, Z, W, {
    submission: de,
    fetcherSubmission: he,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    W || (P?.resolve(), P = null), Z.response.headers.has("X-Remix-Revalidate") && (O = !0);
    let xe = Z.response.headers.get("Location");
    Ge(xe, "Expected a Location header on the redirect Response"), xe = Q0(
      xe,
      new URL(H.url),
      p,
      t.history
    );
    let be = jd(C.location, xe, {
      _isRedirect: !0
    });
    if (i) {
      let Je = !1;
      if (Z.response.headers.has("X-Remix-Reload-Document"))
        Je = !0;
      else if (oh(xe)) {
        const mt = Vw(a, xe, !0);
        Je = // Hard reload if it's an absolute URL to a new origin
        mt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Wn(mt.pathname, p) == null;
      }
      if (Je) {
        ve ? a.location.replace(xe) : a.location.assign(xe);
        return;
      }
    }
    J = null;
    let Me = ve === !0 || Z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Te, formAction: Be, formEncType: Oe } = C.navigation;
    !de && !he && Te && Be && Oe && (de = W0(C.navigation));
    let Ye = de || he;
    if (vE.has(Z.response.status) && Ye && cn(Ye.formMethod))
      await it(Me, be, {
        submission: {
          ...Ye,
          formAction: xe
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || I,
        enableViewTransition: W ? oe : void 0
      });
    else {
      let Je = cd(
        be,
        [],
        Me,
        de
      );
      await it(Me, be, {
        overrideNavigation: Je,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: he,
        // Preserve these flags across redirects
        preventScrollReset: Ee || I,
        enableViewTransition: W ? oe : void 0
      });
    }
  }
  async function Nt(H, Z, W, de, he) {
    let Ee, ve = {};
    try {
      Ee = await RE(
        g,
        H,
        Z,
        W,
        he,
        de,
        !1
      );
    } catch (xe) {
      return W.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: xe
        };
      }), ve;
    }
    if (H.signal.aborted)
      return ve;
    if (!cn(H.method))
      for (let xe of W) {
        if (Ee[xe.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(xe.route.id) && !C.loaderData.hasOwnProperty(xe.route.id) && (!C.errors || !C.errors.hasOwnProperty(xe.route.id)) && xe.shouldCallHandler() && (Ee[xe.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${xe.route.id}`
          )
        });
      }
    for (let [xe, be] of Object.entries(Ee))
      if (VE(be)) {
        let Me = be.result;
        ve[xe] = {
          type: "redirect",
          response: OE(
            Me,
            H,
            xe,
            W,
            p
          )
        };
      } else
        ve[xe] = await zE(be);
    return ve;
  }
  async function Pt(H, Z, W, de, he) {
    let Ee = Nt(
      W,
      de,
      H,
      he,
      null
    ), ve = Promise.all(
      Z.map(async (Me) => {
        if (Me.matches && Me.match && Me.request && Me.controller) {
          let Be = (await Nt(
            Me.request,
            Me.path,
            Me.matches,
            he,
            Me.key
          ))[Me.match.route.id];
          return { [Me.key]: Be };
        } else
          return Promise.resolve({
            [Me.key]: {
              type: "error",
              error: Jn(404, {
                pathname: Me.path
              })
            }
          });
      })
    ), xe = await Ee, be = (await ve).reduce(
      (Me, Te) => Object.assign(Me, Te),
      {}
    );
    return {
      loaderResults: xe,
      fetcherResults: be
    };
  }
  function qt() {
    O = !0, ae.forEach((H, Z) => {
      $.has(Z) && Q.add(Z), Tt(Z);
    });
  }
  function Wt(H, Z, W = {}) {
    let de = new Map(C.fetchers);
    de.set(H, Z), Se(
      { fetchers: de },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function Mt(H, Z, W, de = {}) {
    let he = Ol(C.matches, Z), Ee = new Map(C.fetchers);
    Nn(Ee, H), Se(
      {
        errors: {
          [he.route.id]: W
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function tl(H) {
    return se.set(H, (se.get(H) || 0) + 1), me.has(H) && me.delete(H), C.fetchers.get(H) || bE;
  }
  function kn(H, Z) {
    Tt(H, Z?.reason), Wt(H, _a(null));
  }
  function Nn(H, Z) {
    let W = C.fetchers.get(Z);
    $.has(Z) && !(W && W.state === "loading" && k.has(Z)) && Tt(Z), ae.delete(Z), k.delete(Z), K.delete(Z), me.delete(Z), Q.delete(Z), H.delete(Z);
  }
  function $t(H) {
    let Z = (se.get(H) || 0) - 1;
    Z <= 0 ? (se.delete(H), me.add(H)) : se.set(H, Z), Se({ fetchers: new Map(C.fetchers) });
  }
  function Tt(H, Z) {
    let W = $.get(H);
    W && (W.abort(Z), $.delete(H));
  }
  function zt(H, Z) {
    for (let W of H) {
      let de = Z.get(W);
      Ge(de, `Expected fetcher: ${W}`);
      let he = _a(de.data);
      Z.set(W, he);
    }
  }
  function nl(H) {
    let Z = [], W = !1;
    for (let de of K) {
      let he = H.get(de);
      Ge(he, `Expected fetcher: ${de}`), he.state === "loading" && (K.delete(de), Z.push(de), W = !0);
    }
    return zt(Z, H), W;
  }
  function pa(H, Z) {
    let W = [];
    for (let [de, he] of k)
      if (he < H) {
        let Ee = Z.get(de);
        Ge(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Tt(de), k.delete(de), W.push(de));
      }
    return zt(W, Z), W.length > 0;
  }
  function mn(H, Z) {
    let W = C.blockers.get(H) || no;
    return ge.get(H) !== Z && ge.set(H, Z), W;
  }
  function ta(H) {
    C.blockers.delete(H), ge.delete(H);
  }
  function Mn(H, Z) {
    let W = C.blockers.get(H) || no;
    Ge(
      W.state === "unblocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "proceeding" || W.state === "blocked" && Z.state === "unblocked" || W.state === "proceeding" && Z.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${Z.state}`
    );
    let de = new Map(C.blockers);
    de.set(H, Z), Se({ blockers: de });
  }
  function Vn({
    currentLocation: H,
    nextLocation: Z,
    historyAction: W
  }) {
    if (ge.size === 0)
      return;
    ge.size > 1 && Ht(!1, "A router only supports one blocker at a time");
    let de = Array.from(ge.entries()), [he, Ee] = de[de.length - 1], ve = C.blockers.get(he);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: H, nextLocation: Z, historyAction: W }))
      return he;
  }
  function on(H) {
    let Z = Jn(404, { pathname: H }), W = h.activeRoutes, { matches: de, route: he } = Qs(W);
    return { notFoundMatches: de, route: he, error: Z };
  }
  function Le(H, Z, W) {
    if (S = H, R = Z, A = W || null, !T && C.navigation === ud) {
      T = !0;
      let de = Ot(C.location, C.matches);
      de != null && Se({ restoreScrollPosition: de });
    }
    return () => {
      S = null, R = null, A = null;
    };
  }
  function ot(H, Z) {
    return A && A(
      H,
      Z.map((de) => Zw(de, C.loaderData))
    ) || H.key;
  }
  function Rt(H, Z) {
    if (S && R) {
      let W = ot(H, Z);
      S[W] = R();
    }
  }
  function Ot(H, Z) {
    if (S) {
      let W = ot(H, Z), de = S[W];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function fn(H, Z, W) {
    if (t.patchRoutesOnNavigation) {
      let de = h.branches;
      if (H) {
        if (Object.keys(H[0].params).length > 0)
          return { active: !0, matches: sa(
            Z,
            W,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: sa(
          Z,
          W,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function rt(H, Z, W, de) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: H };
    let he = H;
    for (; ; ) {
      let Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: W,
          path: Z,
          matches: he,
          fetcherKey: de,
          patch: (Me, Te) => {
            W.aborted || q0(
              Me,
              Te,
              h,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Me) {
        return { type: "error", error: Me, partialMatches: he };
      }
      if (W.aborted)
        return { type: "aborted" };
      let ve = h.branches, xe = sa(
        h.activeRoutes,
        Z,
        p,
        !1,
        ve
      ), be = null;
      if (xe) {
        if (Object.keys(xe[0].params).length === 0)
          return { type: "success", matches: xe };
        if (be = sa(
          h.activeRoutes,
          Z,
          p,
          !0,
          ve
        ), !(be && he.length < be.length && Xt(
          he,
          be.slice(0, he.length)
        )))
          return { type: "success", matches: xe };
      }
      if (be || (be = sa(
        h.activeRoutes,
        Z,
        p,
        !0,
        ve
      )), !be || Xt(he, be))
        return { type: "success", matches: null };
      he = be;
    }
  }
  function Xt(H, Z) {
    return H.length === Z.length && H.every((W, de) => W.route.id === Z[de].route.id);
  }
  function na(H) {
    f = {}, h.setHmrRoutes(
      go(
        H,
        u,
        void 0,
        f
      )
    );
  }
  function It(H, Z, W = !1) {
    q0(
      H,
      Z,
      h,
      f,
      u,
      W
    ), h.hasHMRRoutes || Se({});
  }
  return V = {
    get basename() {
      return p;
    },
    get future() {
      return y;
    },
    get state() {
      return C;
    },
    get routes() {
      return h.stableRoutes;
    },
    get branches() {
      return h.branches;
    },
    get manifest() {
      return f;
    },
    get window() {
      return a;
    },
    initialize: ze,
    subscribe: we,
    enableScrollRestoration: Le,
    navigate: qe,
    fetch: Et,
    revalidate: nt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (H) => t.history.createHref(H),
    encodeLocation: (H) => t.history.encodeLocation(H),
    getFetcher: tl,
    resetFetcher: kn,
    deleteFetcher: $t,
    dispose: Ae,
    getBlocker: mn,
    deleteBlocker: ta,
    patchRoutes: It,
    _internalFetchControllers: $,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: na,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(H) {
      Se(H);
    }
  }, t.instrumentations && (V = cE(
    V,
    t.instrumentations.map((H) => H.router).filter(Boolean)
  )), V;
}
function EE(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Ld(t, a, i, o, s, u) {
  let f, h;
  if (s) {
    f = [];
    for (let g of a)
      if (f.push(g), g.route.id === s) {
        h = g;
        break;
      }
  } else
    f = a, h = a[a.length - 1];
  let p = zu(
    o || ".",
    sh(f),
    Wn(t.pathname, i) || t.pathname,
    u === "path"
  );
  if (o == null && (p.search = t.search, p.hash = t.hash), (o == null || o === "" || o === ".") && h) {
    let g = dh(p.search);
    if (h.route.index && !g)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && g) {
      let y = new URLSearchParams(p.search), m = y.getAll("index");
      y.delete("index"), m.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return i !== "/" && (p.pathname = lE({ basename: i, pathname: p.pathname })), Ca(p);
}
function Y0(t, a, i) {
  if (!i || !EE(i))
    return { path: a };
  if (i.formMethod && !qE(i.formMethod))
    return {
      path: a,
      error: Jn(405, { method: i.formMethod })
    };
  let o = () => ({
    path: a,
    error: Jn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), f = db(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!cn(u))
        return o();
      let m = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (v, [x, S]) => `${v}${x}=${S}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: f,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: m
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!cn(u))
        return o();
      try {
        let m = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: f,
            formEncType: i.formEncType,
            formData: void 0,
            json: m,
            text: void 0
          }
        };
      } catch {
        return o();
      }
    }
  }
  Ge(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (i.formData)
    h = Ud(i.formData), p = i.formData;
  else if (i.body instanceof FormData)
    h = Ud(i.body), p = i.body;
  else if (i.body instanceof URLSearchParams)
    h = i.body, p = I0(h);
  else if (i.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(i.body), p = I0(h);
    } catch {
      return o();
    }
  let g = {
    formMethod: u,
    formAction: f,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (cn(g.formMethod))
    return { path: a, submission: g };
  let y = ma(a);
  return t && y.search && dh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Ca(y), submission: g };
}
function G0(t, a, i, o, s, u, f, h, p, g, y, m, v, x, S, A, R, T, L, E, z, Y) {
  let U = z ? Hn(z[1]) ? z[1].error : z[1].data : void 0, V = s.createURL(u.location), C = s.createURL(p), G;
  if (y && u.errors) {
    let N = Object.keys(u.errors)[0];
    G = f.findIndex((O) => O.route.id === N);
  } else if (z && Hn(z[1])) {
    let N = z[0];
    G = f.findIndex((O) => O.route.id === N) - 1;
  }
  let P = z ? z[1].statusCode : void 0, I = P && P >= 400, J = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: C,
    nextParams: f[0].params,
    ...h,
    actionResult: U,
    actionStatus: P
  }, oe = To(f), j = f.map((N, O) => {
    let { route: Q } = N, $ = null;
    if (G != null && O > G)
      $ = !1;
    else if (Q.lazy)
      $ = !0;
    else if (!ch(Q))
      $ = !1;
    else if (y) {
      let { shouldLoad: K } = ib(
        Q,
        u.loaderData,
        u.errors
      );
      $ = K;
    } else _E(u.loaderData, u.matches[O], N) && ($ = !0);
    if ($ !== null)
      return Hd(
        i,
        o,
        t,
        p,
        oe,
        N,
        g,
        a,
        $
      );
    let le = !1;
    typeof Y == "boolean" ? le = Y : I ? le = !1 : (m || V.pathname + V.search === C.pathname + C.search || V.search !== C.search || NE(u.matches[O], N)) && (le = !0);
    let D = {
      ...J,
      defaultShouldRevalidate: le
    }, k = fo(N, D);
    return Hd(
      i,
      o,
      t,
      p,
      oe,
      N,
      g,
      a,
      k,
      D,
      Y
    );
  }), X = [];
  return S.forEach((N, O) => {
    if (y || !f.some((se) => se.route.id === N.routeId) || x.has(O))
      return;
    let Q = u.fetchers.get(O), $ = Q && Q.state !== "idle" && Q.data === void 0, le = sa(
      R,
      N.path,
      T ?? "/",
      !1,
      E
    );
    if (!le) {
      if (L && $)
        return;
      X.push({
        key: O,
        routeId: N.routeId,
        path: N.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (A.has(O))
      return;
    let D = su(le, N.path), k = new AbortController(), K = Ii(
      s,
      N.path,
      k.signal
    ), ae = null;
    if (v.has(O))
      v.delete(O), ae = Wi(
        i,
        o,
        K,
        N.path,
        le,
        D,
        g,
        a
      );
    else if ($)
      m && (ae = Wi(
        i,
        o,
        K,
        N.path,
        le,
        D,
        g,
        a
      ));
    else {
      let se;
      typeof Y == "boolean" ? se = Y : I ? se = !1 : se = m;
      let me = {
        ...J,
        defaultShouldRevalidate: se
      };
      fo(D, me) && (ae = Wi(
        i,
        o,
        K,
        N.path,
        le,
        D,
        g,
        a,
        me
      ));
    }
    ae && X.push({
      key: O,
      routeId: N.routeId,
      path: N.path,
      matches: ae,
      match: D,
      request: K,
      controller: k
    });
  }), { dsMatches: j, revalidatingFetchers: X };
}
function ch(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function ib(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!ch(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let o = a != null && t.id in a, s = i != null && i[t.id] !== void 0;
  if (!o && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let u = !o && !s;
  return { shouldLoad: u, renderFallback: u };
}
function _E(t, a, i) {
  let o = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), s = !t.hasOwnProperty(i.route.id);
  return o || s;
}
function NE(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function fo(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function q0(t, a, i, o, s, u) {
  let f;
  if (t) {
    let g = o[t];
    Ge(
      g,
      `No route found to patch children into: routeId = ${t}`
    ), g.children || (g.children = []), f = g.children;
  } else
    f = i.activeRoutes;
  let h = [], p = [];
  if (a.forEach((g) => {
    let y = f.find(
      (m) => rb(g, m)
    );
    y ? p.push({ existingRoute: y, newRoute: g }) : h.push(g);
  }), h.length > 0) {
    let g = go(
      h,
      s,
      [t || "_", "patch", String(f?.length || "0")],
      o
    );
    f.push(...g);
  }
  if (u && p.length > 0)
    for (let g = 0; g < p.length; g++) {
      let { existingRoute: y, newRoute: m } = p[g], v = y, [x] = go(
        [m],
        s,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(v, {
        element: x.element ? x.element : v.element,
        errorElement: x.errorElement ? x.errorElement : v.errorElement,
        hydrateFallbackElement: x.hydrateFallbackElement ? x.hydrateFallbackElement : v.hydrateFallbackElement
      });
    }
  i.hasHMRRoutes || i.setRoutes([...i.activeRoutes]);
}
function rb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, o) => a.children?.some((s) => rb(i, s))
  ) ?? !1 : !1;
}
var $0 = /* @__PURE__ */ new WeakMap(), ob = ({
  key: t,
  route: a,
  manifest: i,
  mapRouteProperties: o
}) => {
  let s = i[a.id];
  if (Ge(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[t];
  if (!u)
    return;
  let f = $0.get(s);
  f || (f = {}, $0.set(s, f));
  let h = f[t];
  if (h)
    return h;
  let p = (async () => {
    let g = Gw(t), m = s[t] !== void 0 && t !== "hasErrorBoundary";
    if (g)
      Ht(
        !g,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (m)
      Ht(
        !1,
        `Route "${s.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let v = await u();
      v != null && (Object.assign(s, { [t]: v }), Object.assign(s, o(s)));
    }
    typeof s.lazy == "object" && (s.lazy[t] = void 0, Object.values(s.lazy).every((v) => v === void 0) && (s.lazy = void 0));
  })();
  return f[t] = p, p;
}, X0 = /* @__PURE__ */ new WeakMap();
function ME(t, a, i, o, s) {
  let u = i[t.id];
  if (Ge(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = X0.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let m = (async () => {
      Ge(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let v = await t.lazy(), x = {};
      for (let S in v) {
        let A = v[S];
        if (A === void 0)
          continue;
        let R = $w(S), L = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        R ? Ht(
          !R,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? Ht(
          !L,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = A;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...o(u),
        lazy: void 0
      });
    })();
    return X0.set(u, m), m.catch(() => {
    }), {
      lazyRoutePromise: m,
      lazyHandlerPromise: m
    };
  }
  let f = Object.keys(t.lazy), h = [], p;
  for (let y of f) {
    if (s && s.includes(y))
      continue;
    let m = ob({
      key: y,
      route: t,
      manifest: i,
      mapRouteProperties: o
    });
    m && (h.push(m), y === a && (p = m));
  }
  let g = h.length > 0 ? Promise.all(h).then(() => {
  }) : void 0;
  return g?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: g,
    lazyHandlerPromise: p
  };
}
async function Z0(t) {
  let a = t.matches.filter((s) => s.shouldLoad), i = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    i[a[u].route.id] = s;
  }), i;
}
async function TE(t) {
  return t.matches.some((a) => a.route.middleware) ? sb(t, () => Z0(t)) : Z0(t);
}
function sb(t, a) {
  return CE(
    t,
    a,
    (o) => {
      if (GE(o))
        throw o;
      return o;
    },
    UE,
    i
  );
  function i(o, s, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [s]: { type: "error", result: o }
        })
      );
    {
      let { matches: f } = t, h = Math.min(
        // Throwing route
        Math.max(
          f.findIndex((g) => g.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          f.findIndex((g) => g.shouldCallHandler()),
          0
        )
      ), p = Ol(
        f,
        f[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: o }
      });
    }
  }
}
async function CE(t, a, i, o, s) {
  let { matches: u, ...f } = t, h = u.flatMap(
    (g) => g.route.middleware ? g.route.middleware.map((y) => [g.route.id, y]) : []
  );
  return await ub(
    f,
    h,
    a,
    i,
    o,
    s
  );
}
async function ub(t, a, i, o, s, u, f = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[f];
  if (!p)
    return await i();
  let [g, y] = p, m, v = async () => {
    if (m)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return m = { value: await ub(
        t,
        a,
        i,
        o,
        s,
        u,
        f + 1
      ) }, m.value;
    } catch (x) {
      return m = { value: await u(x, g, m) }, m.value;
    }
  };
  try {
    let x = await y(t, v), S = x != null ? o(x) : void 0;
    return s(S) ? S : m ? S ?? m.value : (m = { value: await v() }, m.value);
  } catch (x) {
    return await u(x, g, m);
  }
}
function cb(t, a, i, o, s) {
  let u = ob({
    key: "middleware",
    route: o.route,
    manifest: a,
    mapRouteProperties: t
  }), f = ME(
    o.route,
    cn(i.method) ? "action" : "loader",
    a,
    t,
    s
  );
  return {
    middleware: u,
    route: f.lazyRoutePromise,
    handler: f.lazyHandlerPromise
  };
}
function Hd(t, a, i, o, s, u, f, h, p, g = null, y) {
  let m = !1, v = cb(
    t,
    a,
    i,
    u,
    f
  );
  return {
    ...u,
    _lazyPromises: v,
    shouldLoad: p,
    shouldRevalidateArgs: g,
    shouldCallHandler(x) {
      return m = !0, g ? typeof y == "boolean" ? fo(u, {
        ...g,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? fo(u, {
        ...g,
        defaultShouldRevalidate: x
      }) : fo(u, g) : p;
    },
    resolve(x) {
      let { lazy: S, loader: A, middleware: R } = u.route, T = m || p || x && !cn(i.method) && (S || A), L = R && R.length > 0 && !A && !S;
      return T && (cn(i.method) || !L) ? AE({
        request: i,
        path: o,
        pattern: s,
        match: u,
        lazyHandlerPromise: v?.handler,
        lazyRoutePromise: v?.route,
        handlerOverride: x,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Wi(t, a, i, o, s, u, f, h, p = null) {
  return s.map((g) => g.route.id !== u.route.id ? {
    ...g,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: cb(
      t,
      a,
      i,
      g,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Hd(
    t,
    a,
    i,
    o,
    To(s),
    g,
    f,
    h,
    !0,
    p
  ));
}
async function RE(t, a, i, o, s, u, f) {
  o.some((y) => y._lazyPromises?.middleware) && await Promise.all(o.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: fb(a, i),
    pattern: To(o),
    params: o[0].params,
    context: u,
    matches: o
  }, g = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let m = h;
      return sb(m, () => y({
        ...m,
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
      o.flatMap((y) => [
        y._lazyPromises?.handler,
        y._lazyPromises?.route
      ])
    );
  } catch {
  }
  return g;
}
async function AE({
  request: t,
  path: a,
  pattern: i,
  match: o,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: h
}) {
  let p, g, y = cn(t.method), m = y ? "action" : "loader", v = (x) => {
    let S, A = new Promise((L, E) => S = E);
    g = () => S(), t.signal.addEventListener("abort", g);
    let R = (L) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${m}" [routeId: ${o.route.id}]`
      )
    ) : x(
      {
        request: t,
        url: fb(t, a),
        pattern: i,
        params: o.params,
        context: h
      },
      ...L !== void 0 ? [L] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (f ? f((E) => R(E)) : R()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([T, A]);
  };
  try {
    let x = y ? o.route.action : o.route.loader;
    if (s || u)
      if (x) {
        let S, [A] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(x).catch((R) => {
            S = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (S !== void 0)
          throw S;
        p = A;
      } else {
        await s;
        let S = y ? o.route.action : o.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (m === "action") {
          let A = new URL(t.url), R = A.pathname + A.search;
          throw Jn(405, {
            method: t.method,
            pathname: R,
            routeId: o.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await v(x);
    else {
      let S = new URL(t.url), A = S.pathname + S.search;
      throw Jn(404, {
        pathname: A
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    g && t.signal.removeEventListener("abort", g);
  }
  return p;
}
async function DE(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function zE(t) {
  let { result: a, type: i } = t;
  if (fh(a)) {
    let o;
    try {
      o = await DE(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return i === "error" ? {
      type: "error",
      error: new Ou(a.status, a.statusText, o),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: o,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? P0(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: BE(a),
    statusCode: po(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: po(a) ? a.status : void 0
  } : P0(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function OE(t, a, i, o, s) {
  let u = t.headers.get("Location");
  if (Ge(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !oh(u)) {
    let f = o.slice(
      0,
      o.findIndex((h) => h.route.id === i) + 1
    );
    u = Ld(
      new URL(a.url),
      f,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var jE = [
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
function Bd(t) {
  try {
    return jE.includes(new URL(t).protocol);
  } catch {
    return !1;
  }
}
function Q0(t, a, i, o) {
  if (oh(t)) {
    let s = t, u = rh.test(s) ? new URL(
      Xv(s, a.protocol)
    ) : new URL(s);
    if (Bd(u.toString()))
      throw new Error("Invalid redirect location");
    let f = Wn(u.pathname, i) != null;
    if (u.origin === a.origin && f)
      return uh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = o.createURL(t);
    if (Bd(s.toString()))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Ii(t, a, i, o) {
  let s = t.createURL(db(a)).toString(), u = { signal: i };
  if (o && cn(o.formMethod)) {
    let { formMethod: f, formEncType: h } = o;
    u.method = f.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(o.json)) : h === "text/plain" ? u.body = o.text : h === "application/x-www-form-urlencoded" && o.formData ? u.body = Ud(o.formData) : u.body = o.formData;
  }
  return new Request(s, u);
}
function fb(t, a) {
  let i = new URL(t.url), o = typeof a == "string" ? ma(a) : a;
  if (i.pathname = o.pathname || "/", o.search) {
    let s = new URLSearchParams(o.search), u = s.getAll("index");
    s.delete("index");
    for (let f of u.filter(Boolean))
      s.append("index", f);
    i.search = s.size ? `?${s.toString()}` : "";
  } else
    i.search = "";
  return i.hash = o.hash || "", i;
}
function Ud(t) {
  let a = new URLSearchParams();
  for (let [i, o] of t.entries())
    a.append(i, typeof o == "string" ? o : o.name);
  return a;
}
function I0(t) {
  let a = new FormData();
  for (let [i, o] of t.entries())
    a.append(i, o);
  return a;
}
function LE(t, a, i, o = !1, s = !1) {
  let u = {}, f = null, h, p = !1, g = {}, y = i && Hn(i[1]) ? i[1].error : void 0;
  return t.forEach((m) => {
    if (!(m.route.id in a))
      return;
    let v = m.route.id, x = a[v];
    if (Ge(
      !ni(x),
      "Cannot handle redirect results in processLoaderData"
    ), Hn(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), f = f || {}, s)
        f[v] = S;
      else {
        let A = Ol(t, v);
        f[A.route.id] == null && (f[A.route.id] = S);
      }
      o || (u[v] = lb), p || (p = !0, h = po(x.error) ? x.error.status : 500), x.headers && (g[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (h = x.statusCode), x.headers && (g[v] = x.headers);
  }), y !== void 0 && i && (f = { [i[0]]: y }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: h || 200,
    loaderHeaders: g
  };
}
function K0(t, a, i, o, s, u, f) {
  let { loaderData: h, errors: p } = LE(
    a,
    i,
    o
  );
  return s.filter((g) => !g.matches || g.matches.some((y) => y.shouldLoad)).forEach((g) => {
    let { key: y, match: m, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (Ge(x, "Did not find corresponding fetcher result"), Hn(x)) {
      let S = Ol(t.matches, m?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: x.error
      }), f.delete(y);
    } else if (ni(x))
      Ge(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = _a(x.data);
      f.set(y, S);
    }
  }), { loaderData: h, errors: p };
}
function F0(t, a, i, o) {
  let s = Object.entries(a).filter(([, u]) => u !== lb).reduce((u, [f, h]) => (u[f] = h, u), {});
  for (let u of i) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (s[f] = t[f]), o && o.hasOwnProperty(f))
      break;
  }
  return s;
}
function J0(t) {
  return t ? Hn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function Ol(t, a) {
  return (a ? t.slice(0, t.findIndex((o) => o.route.id === a) + 1) : [...t]).reverse().find((o) => o.route.hasErrorBoundary === !0) || t[0];
}
function Qs(t) {
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
function Jn(t, {
  pathname: a,
  routeId: i,
  method: o,
  type: s,
  message: u
} = {}) {
  let f = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", o && a && i ? h = `You made a ${o} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : s === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", h = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", o && a && i ? h = `You made a ${o.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : o && (h = `Invalid request method "${o.toUpperCase()}"`)), new Ou(
    t || 500,
    f,
    new Error(h),
    !0
  );
}
function Is(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [o, s] = a[i];
    if (ni(s))
      return { key: o, result: s };
  }
}
function db(t) {
  let a = typeof t == "string" ? ma(t) : t;
  return Ca({ ...a, hash: "" });
}
function HE(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function BE(t) {
  return new Ou(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function UE(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && kE(i)
  );
}
function kE(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function VE(t) {
  return fh(t.result) && nb.has(t.result.status);
}
function Hn(t) {
  return t.type === "error";
}
function ni(t) {
  return (t && t.type) === "redirect";
}
function P0(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function fh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function YE(t) {
  return nb.has(t);
}
function GE(t) {
  return fh(t) && YE(t.status) && t.headers.has("Location");
}
function qE(t) {
  return yE.has(t.toUpperCase());
}
function cn(t) {
  return gE.has(t.toUpperCase());
}
function dh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function su(t, a) {
  let i = typeof a == "string" ? ma(a).search : a.search;
  if (t[t.length - 1].route.index && dh(i || ""))
    return t[t.length - 1];
  let o = Jv(t);
  return o[o.length - 1];
}
function W0(t) {
  let { formMethod: a, formAction: i, formEncType: o, text: s, formData: u, json: f } = t;
  if (!(!a || !i || !o)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: o,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: o,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (f !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: o,
        formData: void 0,
        json: f,
        text: void 0
      };
  }
}
function cd(t, a, i, o) {
  return o ? {
    state: "loading",
    location: t,
    matches: a,
    historyAction: i,
    formMethod: o.formMethod,
    formAction: o.formAction,
    formEncType: o.formEncType,
    formData: o.formData,
    json: o.json,
    text: o.text
  } : {
    state: "loading",
    location: t,
    matches: a,
    historyAction: i,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function $E(t, a, i, o) {
  return {
    state: "submitting",
    location: t,
    matches: a,
    historyAction: i,
    formMethod: o.formMethod,
    formAction: o.formAction,
    formEncType: o.formEncType,
    formData: o.formData,
    json: o.json,
    text: o.text
  };
}
function ao(t, a) {
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
function XE(t, a) {
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
function _a(t) {
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
function ZE(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      ab
    );
    if (i) {
      let o = JSON.parse(i);
      for (let [s, u] of Object.entries(o || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function QE(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [o, s] of a)
      i[o] = [...s];
    try {
      t.sessionStorage.setItem(
        ab,
        JSON.stringify(i)
      );
    } catch (o) {
      Ht(
        !1,
        `Failed to save applied view transitions in sessionStorage (${o}).`
      );
    }
  }
}
function ey() {
  let t, a, i = new Promise((o, s) => {
    t = async (u) => {
      o(u);
      try {
        await i;
      } catch {
      }
    }, a = async (u) => {
      s(u);
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
var fi = M.createContext(null);
fi.displayName = "DataRouter";
var Co = M.createContext(null);
Co.displayName = "DataRouterState";
var hb = M.createContext(!1);
function mb() {
  return M.useContext(hb);
}
var hh = M.createContext({
  isTransitioning: !1
});
hh.displayName = "ViewTransition";
var gb = M.createContext(
  /* @__PURE__ */ new Map()
);
gb.displayName = "Fetchers";
var IE = M.createContext(null);
IE.displayName = "Await";
var ea = M.createContext(
  null
);
ea.displayName = "Navigation";
var ju = M.createContext(
  null
);
ju.displayName = "Location";
var Ra = M.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ra.displayName = "Route";
var mh = M.createContext(null);
mh.displayName = "RouteError";
var pb = "REACT_ROUTER_ERROR", KE = "REDIRECT", FE = "ROUTE_ERROR_RESPONSE";
function JE(t) {
  if (t.startsWith(`${pb}:${KE}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function PE(t) {
  if (t.startsWith(
    `${pb}:${FE}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ou(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function WE(t, { relative: a } = {}) {
  Ge(
    Ro(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: o } = M.useContext(ea), { hash: s, pathname: u, search: f } = Ao(t, { relative: a }), h = u;
  return i !== "/" && (h = u === "/" ? i : Pn([i, u])), o.createHref({ pathname: h, search: f, hash: s });
}
function Ro() {
  return M.useContext(ju) != null;
}
function Wa() {
  return Ge(
    Ro(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), M.useContext(ju).location;
}
var yb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function vb(t) {
  M.useContext(ea).static || M.useLayoutEffect(t);
}
function e_() {
  let { isDataRoute: t } = M.useContext(Ra);
  return t ? g_() : t_();
}
function t_() {
  Ge(
    Ro(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = M.useContext(fi), { basename: a, navigator: i } = M.useContext(ea), { matches: o } = M.useContext(Ra), { pathname: s } = Wa(), u = JSON.stringify(sh(o)), f = M.useRef(!1);
  return vb(() => {
    f.current = !0;
  }), M.useCallback(
    (p, g = {}) => {
      if (Ht(f.current, yb), !f.current) return;
      if (typeof p == "number") {
        i.go(p);
        return;
      }
      let y = zu(
        p,
        JSON.parse(u),
        s,
        g.relative === "path"
      );
      t == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : Pn([a, y.pathname])), (g.replace ? i.replace : i.push)(
        y,
        g.state,
        g
      );
    },
    [
      a,
      i,
      u,
      s,
      t
    ]
  );
}
var n_ = M.createContext(null);
function a_(t) {
  let a = M.useContext(Ra).outlet;
  return M.useMemo(
    () => a && /* @__PURE__ */ M.createElement(n_.Provider, { value: t }, a),
    [a, t]
  );
}
function Ao(t, { relative: a } = {}) {
  let { matches: i } = M.useContext(Ra), { pathname: o } = Wa(), s = JSON.stringify(sh(i));
  return M.useMemo(
    () => zu(
      t,
      JSON.parse(s),
      o,
      a === "path"
    ),
    [t, s, o, a]
  );
}
function l_(t, a, i) {
  Ge(
    Ro(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = M.useContext(ea), { matches: s } = M.useContext(Ra), u = s[s.length - 1], f = u ? u.params : {}, h = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", g = u && u.route;
  {
    let R = g && g.path || "";
    xb(
      h,
      !g || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let y = Wa(), m;
  m = y;
  let v = m.pathname || "/", x = v;
  if (p !== "/") {
    let R = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let S = i && i.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    i.state.matches.map(
      (R) => Object.assign(R, {
        route: i.manifest[R.route.id] || R.route
      })
    )
  ) : Zv(t, { pathname: x });
  return Ht(
    g || S != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), Ht(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), u_(
    S && S.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, f, R.params),
        pathname: Pn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? p : Pn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    s,
    i
  );
}
function i_() {
  let t = m_(), a = po(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, u = { padding: "2px 4px", backgroundColor: o }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ M.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ M.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ M.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ M.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ M.createElement("pre", { style: s }, i) : null, f);
}
var r_ = /* @__PURE__ */ M.createElement(i_, null), bb = class extends M.Component {
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
      const i = PE(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ M.createElement(Ra.Provider, { value: this.props.routeContext }, /* @__PURE__ */ M.createElement(
      mh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ M.createElement(o_, { error: t }, a) : a;
  }
};
bb.contextType = hb;
var fd = /* @__PURE__ */ new WeakMap();
function o_({
  children: t,
  error: a
}) {
  let { basename: i } = M.useContext(ea);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let o = JE(a.digest);
    if (o) {
      let s = fd.get(a);
      if (s) throw s;
      let u = Wv(o.location, i), f = u.absoluteURL || u.to;
      if (Bd(f))
        throw new Error("Invalid redirect location");
      if (Pv && !fd.get(a))
        if (u.isExternal || o.reloadDocument)
          window.location.href = f;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: o.replace
            })
          );
          throw fd.set(a, h), h;
        }
      return /* @__PURE__ */ M.createElement("meta", { httpEquiv: "refresh", content: `0;url=${f}` });
    }
  }
  return t;
}
function s_({ routeContext: t, match: a, children: i }) {
  let o = M.useContext(fi);
  return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ M.createElement(Ra.Provider, { value: t }, i);
}
function u_(t, a = [], i) {
  let o = i?.state;
  if (t == null) {
    if (!o)
      return null;
    if (o.errors)
      t = o.matches;
    else if (a.length === 0 && !o.initialized && o.matches.length > 0)
      t = o.matches;
    else
      return null;
  }
  let s = t, u = o?.errors;
  if (u != null) {
    let y = s.findIndex(
      (m) => m.route.id && u?.[m.route.id] !== void 0
    );
    Ge(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, y + 1)
    );
  }
  let f = !1, h = -1;
  if (i && o) {
    f = o.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let m = s[y];
      if ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (h = y), m.route.id) {
        let { loaderData: v, errors: x } = o, S = m.route.loader && !v.hasOwnProperty(m.route.id) && (!x || x[m.route.id] === void 0);
        if (m.route.lazy || S) {
          i.isStatic && (f = !0), h >= 0 ? s = s.slice(0, h + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = i?.onError, g = o && p ? (y, m) => {
    p(y, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      pattern: To(o.matches),
      errorInfo: m
    });
  } : void 0;
  return s.reduceRight(
    (y, m, v) => {
      let x, S = !1, A = null, R = null;
      o && (x = u && m.route.id ? u[m.route.id] : void 0, A = m.route.errorElement || r_, f && (h < 0 && v === 0 ? (xb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, R = null) : h === v && (S = !0, R = m.route.hydrateFallbackElement || null)));
      let T = a.concat(s.slice(0, v + 1)), L = () => {
        let E;
        return x ? E = A : S ? E = R : m.route.Component ? E = /* @__PURE__ */ M.createElement(m.route.Component, null) : m.route.element ? E = m.route.element : E = y, /* @__PURE__ */ M.createElement(
          s_,
          {
            match: m,
            routeContext: {
              outlet: y,
              matches: T,
              isDataRoute: o != null
            },
            children: E
          }
        );
      };
      return o && (m.route.ErrorBoundary || m.route.errorElement || v === 0) ? /* @__PURE__ */ M.createElement(
        bb,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: A,
          error: x,
          children: L(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: g
        }
      ) : L();
    },
    null
  );
}
function gh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function c_(t) {
  let a = M.useContext(fi);
  return Ge(a, gh(t)), a;
}
function f_(t) {
  let a = M.useContext(Co);
  return Ge(a, gh(t)), a;
}
function d_(t) {
  let a = M.useContext(Ra);
  return Ge(a, gh(t)), a;
}
function ph(t) {
  let a = d_(t), i = a.matches[a.matches.length - 1];
  return Ge(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function h_() {
  return ph(
    "useRouteId"
    /* UseRouteId */
  );
}
function m_() {
  let t = M.useContext(mh), a = f_(
    "useRouteError"
    /* UseRouteError */
  ), i = ph(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function g_() {
  let { router: t } = c_(
    "useNavigate"
    /* UseNavigateStable */
  ), a = ph(
    "useNavigate"
    /* UseNavigateStable */
  ), i = M.useRef(!1);
  return vb(() => {
    i.current = !0;
  }), M.useCallback(
    async (s, u = {}) => {
      Ht(i.current, yb), i.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var ty = {};
function xb(t, a, i) {
  !a && !ty[t] && (ty[t] = !0, Ht(!1, i));
}
var ny = {};
function ay(t, a) {
  !t && !ny[a] && (ny[a] = !0, console.warn(a));
}
var p_ = "useOptimistic", ly = Dw[p_], y_ = () => {
};
function v_(t) {
  return ly ? ly(t) : [t, y_];
}
function b_(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Ht(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: M.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Ht(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: M.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Ht(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: M.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var x_ = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function S_(t, a) {
  return wE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: Uw({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: x_,
    mapRouteProperties: b_,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var w_ = class {
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
function E_({
  router: t,
  flushSync: a,
  onError: i,
  useTransitions: o
}) {
  o = mb() || o;
  let [u, f] = M.useState(t.state), [h, p] = v_(u), [g, y] = M.useState(), [m, v] = M.useState({
    isTransitioning: !1
  }), [x, S] = M.useState(), [A, R] = M.useState(), [T, L] = M.useState(), E = M.useRef(/* @__PURE__ */ new Map()), z = M.useCallback(
    (C, { deletedFetchers: G, newErrors: P, flushSync: I, viewTransitionOpts: J }) => {
      P && i && Object.values(P).forEach(
        (j) => i(j, {
          location: C.location,
          params: C.matches[0]?.params ?? {},
          pattern: To(C.matches)
        })
      ), C.fetchers.forEach((j, X) => {
        j.data !== void 0 && E.current.set(X, j.data);
      }), G.forEach((j) => E.current.delete(j)), ay(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (ay(
        J == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !J || !oe) {
        a && I ? a(() => f(C)) : o === !1 ? f(C) : M.startTransition(() => {
          o === !0 && p((j) => iy(j, C)), f(C);
        });
        return;
      }
      if (a && I) {
        a(() => {
          A && (x?.resolve(), A.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: J.currentLocation,
            nextLocation: J.nextLocation
          });
        });
        let j = t.window.document.startViewTransition(() => {
          a(() => f(C));
        });
        j.finished.finally(() => {
          a(() => {
            S(void 0), R(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => R(j));
        return;
      }
      A ? (x?.resolve(), A.skipTransition(), L({
        state: C,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      })) : (y(C), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      }));
    },
    [
      t.window,
      a,
      A,
      x,
      o,
      p,
      i
    ]
  );
  M.useLayoutEffect(() => t.subscribe(z), [t, z]), M.useEffect(() => {
    m.isTransitioning && !m.flushSync && S(new w_());
  }, [m]), M.useEffect(() => {
    if (x && g && t.window) {
      let C = g, G = x.promise, P = t.window.document.startViewTransition(async () => {
        o === !1 ? f(C) : M.startTransition(() => {
          o === !0 && p((I) => iy(I, C)), f(C);
        }), await G;
      });
      P.finished.finally(() => {
        S(void 0), R(void 0), y(void 0), v({ isTransitioning: !1 });
      }), R(P);
    }
  }, [
    g,
    x,
    t.window,
    o,
    p
  ]), M.useEffect(() => {
    x && g && h.location.key === g.location.key && x.resolve();
  }, [x, A, h.location, g]), M.useEffect(() => {
    !m.isTransitioning && T && (y(T.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), L(void 0));
  }, [m.isTransitioning, T]);
  let Y = M.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (C) => t.navigate(C),
    push: (C, G, P) => t.navigate(C, {
      state: G,
      preventScrollReset: P?.preventScrollReset
    }),
    replace: (C, G, P) => t.navigate(C, {
      replace: !0,
      state: G,
      preventScrollReset: P?.preventScrollReset
    })
  }), [t]), U = t.basename || "/", V = M.useMemo(
    () => ({
      router: t,
      navigator: Y,
      static: !1,
      basename: U,
      onError: i
    }),
    [t, Y, U, i]
  );
  return /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement(fi.Provider, { value: V }, /* @__PURE__ */ M.createElement(Co.Provider, { value: h }, /* @__PURE__ */ M.createElement(gb.Provider, { value: E.current }, /* @__PURE__ */ M.createElement(hh.Provider, { value: m }, /* @__PURE__ */ M.createElement(
    T_,
    {
      basename: U,
      location: h.location,
      navigationType: h.historyAction,
      navigator: Y,
      useTransitions: o
    },
    /* @__PURE__ */ M.createElement(
      __,
      {
        routes: t.routes,
        manifest: t.manifest,
        future: t.future,
        state: h,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function iy(t, a) {
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
var __ = M.memo(N_);
function N_({
  routes: t,
  manifest: a,
  future: i,
  state: o,
  isStatic: s,
  onError: u
}) {
  return l_(t, void 0, {
    manifest: a,
    state: o,
    isStatic: s,
    onError: u
  });
}
function M_(t) {
  return a_(t.context);
}
function T_({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: o = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: f
}) {
  Ge(
    !Ro(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), p = M.useMemo(
    () => ({
      basename: h,
      navigator: s,
      static: u,
      useTransitions: f,
      future: {}
    }),
    [h, s, u, f]
  );
  typeof i == "string" && (i = ma(i));
  let {
    pathname: g = "/",
    search: y = "",
    hash: m = "",
    state: v = null,
    key: x = "default",
    mask: S
  } = i, A = M.useMemo(() => {
    let R = Wn(g, h);
    return R == null ? null : {
      location: {
        pathname: R,
        search: y,
        hash: m,
        state: v,
        key: x,
        mask: S
      },
      navigationType: o
    };
  }, [h, g, y, m, v, x, o, S]);
  return Ht(
    A != null,
    `<Router basename="${h}"> is not able to match the URL "${g}${y}${m}" because it does not start with the basename, so the <Router> won't render anything.`
  ), A == null ? null : /* @__PURE__ */ M.createElement(ea.Provider, { value: p }, /* @__PURE__ */ M.createElement(ju.Provider, { children: a, value: A }));
}
var uu = "get", cu = "application/x-www-form-urlencoded";
function Lu(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function C_(t) {
  return Lu(t) && t.tagName.toLowerCase() === "button";
}
function R_(t) {
  return Lu(t) && t.tagName.toLowerCase() === "form";
}
function A_(t) {
  return Lu(t) && t.tagName.toLowerCase() === "input";
}
function D_(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function z_(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !D_(t);
}
var Ks = null;
function O_() {
  if (Ks === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ks = !1;
    } catch {
      Ks = !0;
    }
  return Ks;
}
var j_ = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function dd(t) {
  return t != null && !j_.has(t) ? (Ht(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cu}"`
  ), null) : t;
}
function L_(t, a) {
  let i, o, s, u, f;
  if (R_(t)) {
    let h = t.getAttribute("action");
    o = h ? Wn(h, a) : null, i = t.getAttribute("method") || uu, s = dd(t.getAttribute("enctype")) || cu, u = new FormData(t);
  } else if (C_(t) || A_(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (o = p ? Wn(p, a) : null, i = t.getAttribute("formmethod") || h.getAttribute("method") || uu, s = dd(t.getAttribute("formenctype")) || dd(h.getAttribute("enctype")) || cu, u = new FormData(h, t), !O_()) {
      let { name: g, type: y, value: m } = t;
      if (y === "image") {
        let v = g ? `${g}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else g && u.append(g, m);
    }
  } else {
    if (Lu(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = uu, o = null, s = cu, f = t;
  }
  return u && s === "text/plain" && (f = u, u = void 0), { action: o, method: i.toLowerCase(), encType: s, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function yh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Sb(t, a, i, o) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : a && Wn(s.pathname, a) === "/" ? s.pathname = `${bu(a)}/_root.${o}` : s.pathname = `${bu(s.pathname)}.${o}`, s;
}
async function H_(t, a) {
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
function B_(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function U_(t, a, i) {
  let o = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let f = await H_(u, i);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return G_(
    o.flat(1).filter(B_).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function ry(t, a, i, o, s, u) {
  let f = (p, g) => i[g] ? p.route.id !== i[g].route.id : !0, h = (p, g) => (
    // param change, /users/123 -> /users/456
    i[g].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[g].route.path?.endsWith("*") && i[g].params["*"] !== p.params["*"]
  );
  return u === "assets" ? a.filter(
    (p, g) => f(p, g) || h(p, g)
  ) : u === "data" ? a.filter((p, g) => {
    let y = o.routes[p.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (f(p, g) || h(p, g))
      return !0;
    if (p.route.shouldRevalidate) {
      let m = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: i[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof m == "boolean")
        return m;
    }
    return !0;
  }) : [];
}
function k_(t, a, { includeHydrateFallback: i } = {}) {
  return V_(
    t.map((o) => {
      let s = a.routes[o.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), i && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function V_(t) {
  return [...new Set(t)];
}
function Y_(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let o of i)
    a[o] = t[o];
  return a;
}
function G_(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((o, s) => {
    let u = JSON.stringify(Y_(s));
    return i.has(u) || (i.add(u), o.push({ key: u, link: s })), o;
  }, []);
}
function vh() {
  let t = M.useContext(fi);
  return yh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function q_() {
  let t = M.useContext(Co);
  return yh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var bh = M.createContext(void 0);
bh.displayName = "FrameworkContext";
function Hu() {
  let t = M.useContext(bh);
  return yh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function $_(t, a) {
  let i = M.useContext(bh), [o, s] = M.useState(!1), [u, f] = M.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: m } = a, v = M.useRef(null);
  M.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let A = (T) => {
        T.forEach((L) => {
          f(L.isIntersecting);
        });
      }, R = new IntersectionObserver(A, { threshold: 0.5 });
      return v.current && R.observe(v.current), () => {
        R.disconnect();
      };
    }
  }, [t]), M.useEffect(() => {
    if (o) {
      let A = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(A);
      };
    }
  }, [o]);
  let x = () => {
    s(!0);
  }, S = () => {
    s(!1), f(!1);
  };
  return i ? t !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: lo(h, x),
      onBlur: lo(p, S),
      onMouseEnter: lo(g, x),
      onMouseLeave: lo(y, S),
      onTouchStart: lo(m, x)
    }
  ] : [!1, v, {}];
}
function lo(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function X_({ page: t, ...a }) {
  let i = mb(), { nonce: o } = Hu(), { router: s } = vh(), u = M.useMemo(
    () => Zv(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return u ? (a.nonce == null && o && (a = { ...a, nonce: o }), i ? /* @__PURE__ */ M.createElement(Q_, { page: t, matches: u, ...a }) : /* @__PURE__ */ M.createElement(I_, { page: t, matches: u, ...a })) : null;
}
function Z_(t) {
  let { manifest: a, routeModules: i } = Hu(), [o, s] = M.useState([]);
  return M.useEffect(() => {
    let u = !1;
    return U_(t, a, i).then(
      (f) => {
        u || s(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, i]), o;
}
function Q_({
  page: t,
  matches: a,
  ...i
}) {
  let o = Wa(), { future: s } = Hu(), { basename: u } = vh(), f = M.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let h = Sb(
      t,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, g = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? p = !0 : g.push(y.route.id);
    return p && g.length > 0 && h.searchParams.set("_routes", g.join(",")), [h.pathname + h.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    t,
    o,
    a
  ]);
  return /* @__PURE__ */ M.createElement(M.Fragment, null, f.map((h) => /* @__PURE__ */ M.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...i })));
}
function I_({
  page: t,
  matches: a,
  ...i
}) {
  let o = Wa(), { future: s, manifest: u, routeModules: f } = Hu(), { basename: h } = vh(), { loaderData: p, matches: g } = q_(), y = M.useMemo(
    () => ry(
      t,
      a,
      g,
      u,
      o,
      "data"
    ),
    [t, a, g, u, o]
  ), m = M.useMemo(
    () => ry(
      t,
      a,
      g,
      u,
      o,
      "assets"
    ),
    [t, a, g, u, o]
  ), v = M.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let A = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((L) => {
      let E = u.routes[L.route.id];
      !E || !E.hasLoader || (!y.some((z) => z.route.id === L.route.id) && L.route.id in p && f[L.route.id]?.shouldRevalidate || E.hasClientLoader ? R = !0 : A.add(L.route.id));
    }), A.size === 0)
      return [];
    let T = Sb(
      t,
      h,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return R && A.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((L) => A.has(L.route.id)).map((L) => L.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    h,
    s.v8_trailingSlashAwareDataRequests,
    p,
    o,
    u,
    y,
    a,
    t,
    f
  ]), x = M.useMemo(
    () => k_(m, u),
    [m, u]
  ), S = Z_(m);
  return /* @__PURE__ */ M.createElement(M.Fragment, null, v.map((A) => /* @__PURE__ */ M.createElement("link", { key: A, rel: "prefetch", as: "fetch", href: A, ...i })), x.map((A) => /* @__PURE__ */ M.createElement("link", { key: A, rel: "modulepreload", href: A, ...i })), S.map(({ key: A, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ M.createElement(
      "link",
      {
        key: A,
        nonce: i.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function K_(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var F_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  F_ && (window.__reactRouterVersion = // @ts-expect-error
  "7.18.0");
} catch {
}
var wb = M.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: o = "none",
    relative: s,
    reloadDocument: u,
    replace: f,
    mask: h,
    state: p,
    target: g,
    to: y,
    preventScrollReset: m,
    viewTransition: v,
    defaultShouldRevalidate: x,
    ...S
  }, A) {
    let { basename: R, navigator: T, useTransitions: L } = M.useContext(ea), E = typeof y == "string" && Du.test(y), z = Wv(y, R);
    y = z.to;
    let Y = WE(y, { relative: s }), U = Wa(), V = null;
    if (h) {
      let X = zu(
        h,
        [],
        U.mask ? U.mask.pathname : "/",
        !0
      );
      R !== "/" && (X.pathname = X.pathname === "/" ? R : Pn([R, X.pathname])), V = T.createHref(X);
    }
    let [C, G, P] = $_(
      o,
      S
    ), I = e2(y, {
      replace: f,
      mask: h,
      state: p,
      target: g,
      preventScrollReset: m,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: x,
      useTransitions: L
    });
    function J(X) {
      a && a(X), X.defaultPrevented || I(X);
    }
    let oe = !(z.isExternal || u), j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ M.createElement(
        "a",
        {
          ...S,
          ...P,
          href: (oe ? V : void 0) || z.absoluteURL || Y,
          onClick: oe ? J : a,
          ref: K_(A, G),
          target: g,
          "data-discover": !E && i === "render" ? "true" : void 0
        }
      )
    );
    return C && !E ? /* @__PURE__ */ M.createElement(M.Fragment, null, j, /* @__PURE__ */ M.createElement(X_, { page: Y })) : j;
  }
);
wb.displayName = "Link";
var J_ = M.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: o = "",
    end: s = !1,
    style: u,
    to: f,
    viewTransition: h,
    children: p,
    ...g
  }, y) {
    let m = Ao(f, { relative: g.relative }), v = Wa(), x = M.useContext(Co), { navigator: S, basename: A } = M.useContext(ea), R = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    i2(m) && h === !0, T = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, L = v.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    i || (L = L.toLowerCase(), E = E ? E.toLowerCase() : null, T = T.toLowerCase()), E && A && (E = Wn(E, A) || E);
    const z = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let Y = L === T || !s && L.startsWith(T) && L.charAt(z) === "/", U = E != null && (E === T || !s && E.startsWith(T) && E.charAt(T.length) === "/"), V = {
      isActive: Y,
      isPending: U,
      isTransitioning: R
    }, C = Y ? a : void 0, G;
    typeof o == "function" ? G = o(V) : G = [
      o,
      Y ? "active" : null,
      U ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let P = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ M.createElement(
      wb,
      {
        ...g,
        "aria-current": C,
        className: G,
        ref: y,
        style: P,
        to: f,
        viewTransition: h
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
J_.displayName = "NavLink";
var P_ = M.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: o,
    replace: s,
    state: u,
    method: f = uu,
    action: h,
    onSubmit: p,
    relative: g,
    preventScrollReset: y,
    viewTransition: m,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: A } = M.useContext(ea), R = a2(), T = l2(h, { relative: g }), L = f.toLowerCase() === "get" ? "get" : "post", E = typeof h == "string" && Du.test(h), z = (Y) => {
      if (p && p(Y), Y.defaultPrevented) return;
      Y.preventDefault();
      let U = Y.nativeEvent.submitter, V = U?.getAttribute("formmethod") || f, C = () => R(U || Y.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: i,
        replace: s,
        state: u,
        relative: g,
        preventScrollReset: y,
        viewTransition: m,
        defaultShouldRevalidate: v
      });
      A && i !== !1 ? M.startTransition(() => C()) : C();
    };
    return /* @__PURE__ */ M.createElement(
      "form",
      {
        ref: S,
        method: L,
        action: T,
        onSubmit: o ? p : z,
        ...x,
        "data-discover": !E && t === "render" ? "true" : void 0
      }
    );
  }
);
P_.displayName = "Form";
function W_(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Eb(t) {
  let a = M.useContext(fi);
  return Ge(a, W_(t)), a;
}
function e2(t, {
  target: a,
  replace: i,
  mask: o,
  state: s,
  preventScrollReset: u,
  relative: f,
  viewTransition: h,
  defaultShouldRevalidate: p,
  useTransitions: g
} = {}) {
  let y = e_(), m = Wa(), v = Ao(t, { relative: f });
  return M.useCallback(
    (x) => {
      if (z_(x, a)) {
        x.preventDefault();
        let S = i !== void 0 ? i : Ca(m) === Ca(v), A = () => y(t, {
          replace: S,
          mask: o,
          state: s,
          preventScrollReset: u,
          relative: f,
          viewTransition: h,
          defaultShouldRevalidate: p
        });
        g ? M.startTransition(() => A()) : A();
      }
    },
    [
      m,
      y,
      v,
      i,
      o,
      s,
      a,
      t,
      u,
      f,
      h,
      p,
      g
    ]
  );
}
var t2 = 0, n2 = () => `__${String(++t2)}__`;
function a2() {
  let { router: t } = Eb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = M.useContext(ea), i = h_(), o = t.fetch, s = t.navigate;
  return M.useCallback(
    async (u, f = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: m } = L_(
        u,
        a
      );
      if (f.navigate === !1) {
        let v = f.fetcherKey || n2();
        await o(v, i, f.action || h, {
          defaultShouldRevalidate: f.defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: m,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          flushSync: f.flushSync
        });
      } else
        await s(f.action || h, {
          defaultShouldRevalidate: f.defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: m,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          replace: f.replace,
          state: f.state,
          fromRouteId: i,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition
        });
    },
    [o, s, a, i]
  );
}
function l2(t, { relative: a } = {}) {
  let { basename: i } = M.useContext(ea), o = M.useContext(Ra);
  Ge(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), u = { ...Ao(t || ".", { relative: a }) }, f = Wa();
  if (t == null) {
    u.search = f.search;
    let h = new URLSearchParams(u.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((m) => m).forEach((m) => h.append("index", m));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Pn([i, u.pathname])), Ca(u);
}
function i2(t, { relative: a } = {}) {
  let i = M.useContext(hh);
  Ge(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = Eb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Ao(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = Wn(i.currentLocation.pathname, o) || i.currentLocation.pathname, f = Wn(i.nextLocation.pathname, o) || i.nextLocation.pathname;
  return vu(s.pathname, f) != null || vu(s.pathname, u) != null;
}
const kd = "trellis2:trigger-generate", Vd = "trellis2:generate-state";
function r2() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(kd));
}
function o2(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Vd, { detail: t }));
}
function s2(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(kd, t), () => window.removeEventListener(kd, t));
}
function u2(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const o = i.detail;
    o && t(o);
  };
  return window.addEventListener(Vd, a), () => window.removeEventListener(Vd, a);
}
const oy = "ext-actions-request", c2 = "ext-actions-declare", f2 = "ext-action-state", sy = "ext-action-invoke", uy = "trellis2:navigate", cy = "trellis2.generate";
function d2(t, a) {
  let i = !1, o = !1;
  const s = () => ({
    id: cy,
    label: i ? "Generating…" : "Generate",
    icon: i ? "hourglass_top" : "deployed_code",
    tone: "primary",
    state: i ? "loading" : o ? "disabled" : "idle",
    tooltip: o ? "Upload an input image before generating" : "Generate a 3D mesh from the input image"
  }), u = () => ({
    primary: s()
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(c2, { detail: { actions: u() }, bubbles: !1 })
    );
  }, h = () => {
    t.dispatchEvent(
      new CustomEvent(f2, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => f(), g = (m) => {
    m.detail?.id === cy && r2();
  }, y = u2((m) => {
    i = m.busy, o = m.blocked, h();
  });
  return t.addEventListener(oy, p), t.addEventListener(sy, g), f(), {
    dispose: () => {
      y(), t.removeEventListener(oy, p), t.removeEventListener(sy, g);
    }
  };
}
function Yt(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let a = "";
  if (Array.isArray(t))
    for (let i = 0, o; i < t.length; i++)
      (o = Yt(t[i])) !== "" && (a += (a && " ") + o);
  else
    for (let i in t)
      t[i] && (a += (a && " ") + i);
  return a;
}
var h2 = { value: () => {
} };
function Bu() {
  for (var t = 0, a = arguments.length, i = {}, o; t < a; ++t) {
    if (!(o = arguments[t] + "") || o in i || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    i[o] = [];
  }
  return new fu(i);
}
function fu(t) {
  this._ = t;
}
function m2(t, a) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var o = "", s = i.indexOf(".");
    if (s >= 0 && (o = i.slice(s + 1), i = i.slice(0, s)), i && !a.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: o };
  });
}
fu.prototype = Bu.prototype = {
  constructor: fu,
  on: function(t, a) {
    var i = this._, o = m2(t + "", i), s, u = -1, f = o.length;
    if (arguments.length < 2) {
      for (; ++u < f; ) if ((s = (t = o[u]).type) && (s = g2(i[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < f; )
      if (s = (t = o[u]).type) i[s] = fy(i[s], t.name, a);
      else if (a == null) for (s in i) i[s] = fy(i[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, a = this._;
    for (var i in a) t[i] = a[i].slice();
    return new fu(t);
  },
  call: function(t, a) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), o = 0, s, u; o < s; ++o) i[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (u = this._[t], o = 0, s = u.length; o < s; ++o) u[o].value.apply(a, i);
  },
  apply: function(t, a, i) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var o = this._[t], s = 0, u = o.length; s < u; ++s) o[s].value.apply(a, i);
  }
};
function g2(t, a) {
  for (var i = 0, o = t.length, s; i < o; ++i)
    if ((s = t[i]).name === a)
      return s.value;
}
function fy(t, a, i) {
  for (var o = 0, s = t.length; o < s; ++o)
    if (t[o].name === a) {
      t[o] = h2, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return i != null && t.push({ name: a, value: i }), t;
}
var Yd = "http://www.w3.org/1999/xhtml";
const dy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yd,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Uu(t) {
  var a = t += "", i = a.indexOf(":");
  return i >= 0 && (a = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), dy.hasOwnProperty(a) ? { space: dy[a], local: t } : t;
}
function p2(t) {
  return function() {
    var a = this.ownerDocument, i = this.namespaceURI;
    return i === Yd && a.documentElement.namespaceURI === Yd ? a.createElement(t) : a.createElementNS(i, t);
  };
}
function y2(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function _b(t) {
  var a = Uu(t);
  return (a.local ? y2 : p2)(a);
}
function v2() {
}
function xh(t) {
  return t == null ? v2 : function() {
    return this.querySelector(t);
  };
}
function b2(t) {
  typeof t != "function" && (t = xh(t));
  for (var a = this._groups, i = a.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], f = u.length, h = o[s] = new Array(f), p, g, y = 0; y < f; ++y)
      (p = u[y]) && (g = t.call(p, p.__data__, y, u)) && ("__data__" in p && (g.__data__ = p.__data__), h[y] = g);
  return new Un(o, this._parents);
}
function x2(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function S2() {
  return [];
}
function Nb(t) {
  return t == null ? S2 : function() {
    return this.querySelectorAll(t);
  };
}
function w2(t) {
  return function() {
    return x2(t.apply(this, arguments));
  };
}
function E2(t) {
  typeof t == "function" ? t = w2(t) : t = Nb(t);
  for (var a = this._groups, i = a.length, o = [], s = [], u = 0; u < i; ++u)
    for (var f = a[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && (o.push(t.call(p, p.__data__, g, f)), s.push(p));
  return new Un(o, s);
}
function Mb(t) {
  return function() {
    return this.matches(t);
  };
}
function Tb(t) {
  return function(a) {
    return a.matches(t);
  };
}
var _2 = Array.prototype.find;
function N2(t) {
  return function() {
    return _2.call(this.children, t);
  };
}
function M2() {
  return this.firstElementChild;
}
function T2(t) {
  return this.select(t == null ? M2 : N2(typeof t == "function" ? t : Tb(t)));
}
var C2 = Array.prototype.filter;
function R2() {
  return Array.from(this.children);
}
function A2(t) {
  return function() {
    return C2.call(this.children, t);
  };
}
function D2(t) {
  return this.selectAll(t == null ? R2 : A2(typeof t == "function" ? t : Tb(t)));
}
function z2(t) {
  typeof t != "function" && (t = Mb(t));
  for (var a = this._groups, i = a.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], f = u.length, h = o[s] = [], p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Un(o, this._parents);
}
function Cb(t) {
  return new Array(t.length);
}
function O2() {
  return new Un(this._enter || this._groups.map(Cb), this._parents);
}
function xu(t, a) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = a;
}
xu.prototype = {
  constructor: xu,
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
function j2(t) {
  return function() {
    return t;
  };
}
function L2(t, a, i, o, s, u) {
  for (var f = 0, h, p = a.length, g = u.length; f < g; ++f)
    (h = a[f]) ? (h.__data__ = u[f], o[f] = h) : i[f] = new xu(t, u[f]);
  for (; f < p; ++f)
    (h = a[f]) && (s[f] = h);
}
function H2(t, a, i, o, s, u, f) {
  var h, p, g = /* @__PURE__ */ new Map(), y = a.length, m = u.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (p = a[h]) && (v[h] = x = f.call(p, p.__data__, h, a) + "", g.has(x) ? s[h] = p : g.set(x, p));
  for (h = 0; h < m; ++h)
    x = f.call(t, u[h], h, u) + "", (p = g.get(x)) ? (o[h] = p, p.__data__ = u[h], g.delete(x)) : i[h] = new xu(t, u[h]);
  for (h = 0; h < y; ++h)
    (p = a[h]) && g.get(v[h]) === p && (s[h] = p);
}
function B2(t) {
  return t.__data__;
}
function U2(t, a) {
  if (!arguments.length) return Array.from(this, B2);
  var i = a ? H2 : L2, o = this._parents, s = this._groups;
  typeof t != "function" && (t = j2(t));
  for (var u = s.length, f = new Array(u), h = new Array(u), p = new Array(u), g = 0; g < u; ++g) {
    var y = o[g], m = s[g], v = m.length, x = k2(t.call(y, y && y.__data__, g, o)), S = x.length, A = h[g] = new Array(S), R = f[g] = new Array(S), T = p[g] = new Array(v);
    i(y, m, A, R, T, x, a);
    for (var L = 0, E = 0, z, Y; L < S; ++L)
      if (z = A[L]) {
        for (L >= E && (E = L + 1); !(Y = R[E]) && ++E < S; ) ;
        z._next = Y || null;
      }
  }
  return f = new Un(f, o), f._enter = h, f._exit = p, f;
}
function k2(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function V2() {
  return new Un(this._exit || this._groups.map(Cb), this._parents);
}
function Y2(t, a, i) {
  var o = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), i == null ? u.remove() : i(u), o && s ? o.merge(s).order() : s;
}
function G2(t) {
  for (var a = t.selection ? t.selection() : t, i = this._groups, o = a._groups, s = i.length, u = o.length, f = Math.min(s, u), h = new Array(s), p = 0; p < f; ++p)
    for (var g = i[p], y = o[p], m = g.length, v = h[p] = new Array(m), x, S = 0; S < m; ++S)
      (x = g[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    h[p] = i[p];
  return new Un(h, this._parents);
}
function q2() {
  for (var t = this._groups, a = -1, i = t.length; ++a < i; )
    for (var o = t[a], s = o.length - 1, u = o[s], f; --s >= 0; )
      (f = o[s]) && (u && f.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(f, u), u = f);
  return this;
}
function $2(t) {
  t || (t = X2);
  function a(m, v) {
    return m && v ? t(m.__data__, v.__data__) : !m - !v;
  }
  for (var i = this._groups, o = i.length, s = new Array(o), u = 0; u < o; ++u) {
    for (var f = i[u], h = f.length, p = s[u] = new Array(h), g, y = 0; y < h; ++y)
      (g = f[y]) && (p[y] = g);
    p.sort(a);
  }
  return new Un(s, this._parents).order();
}
function X2(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function Z2() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Q2() {
  return Array.from(this);
}
function I2() {
  for (var t = this._groups, a = 0, i = t.length; a < i; ++a)
    for (var o = t[a], s = 0, u = o.length; s < u; ++s) {
      var f = o[s];
      if (f) return f;
    }
  return null;
}
function K2() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function F2() {
  return !this.node();
}
function J2(t) {
  for (var a = this._groups, i = 0, o = a.length; i < o; ++i)
    for (var s = a[i], u = 0, f = s.length, h; u < f; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function P2(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function W2(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function eN(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function tN(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function nN(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function aN(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function lN(t, a) {
  var i = Uu(t);
  if (arguments.length < 2) {
    var o = this.node();
    return i.local ? o.getAttributeNS(i.space, i.local) : o.getAttribute(i);
  }
  return this.each((a == null ? i.local ? W2 : P2 : typeof a == "function" ? i.local ? aN : nN : i.local ? tN : eN)(i, a));
}
function Rb(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function iN(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function rN(t, a, i) {
  return function() {
    this.style.setProperty(t, a, i);
  };
}
function oN(t, a, i) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, i);
  };
}
function sN(t, a, i) {
  return arguments.length > 1 ? this.each((a == null ? iN : typeof a == "function" ? oN : rN)(t, a, i ?? "")) : ar(this.node(), t);
}
function ar(t, a) {
  return t.style.getPropertyValue(a) || Rb(t).getComputedStyle(t, null).getPropertyValue(a);
}
function uN(t) {
  return function() {
    delete this[t];
  };
}
function cN(t, a) {
  return function() {
    this[t] = a;
  };
}
function fN(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function dN(t, a) {
  return arguments.length > 1 ? this.each((a == null ? uN : typeof a == "function" ? fN : cN)(t, a)) : this.node()[t];
}
function Ab(t) {
  return t.trim().split(/^|\s+/);
}
function Sh(t) {
  return t.classList || new Db(t);
}
function Db(t) {
  this._node = t, this._names = Ab(t.getAttribute("class") || "");
}
Db.prototype = {
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
function zb(t, a) {
  for (var i = Sh(t), o = -1, s = a.length; ++o < s; ) i.add(a[o]);
}
function Ob(t, a) {
  for (var i = Sh(t), o = -1, s = a.length; ++o < s; ) i.remove(a[o]);
}
function hN(t) {
  return function() {
    zb(this, t);
  };
}
function mN(t) {
  return function() {
    Ob(this, t);
  };
}
function gN(t, a) {
  return function() {
    (a.apply(this, arguments) ? zb : Ob)(this, t);
  };
}
function pN(t, a) {
  var i = Ab(t + "");
  if (arguments.length < 2) {
    for (var o = Sh(this.node()), s = -1, u = i.length; ++s < u; ) if (!o.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? gN : a ? hN : mN)(i, a));
}
function yN() {
  this.textContent = "";
}
function vN(t) {
  return function() {
    this.textContent = t;
  };
}
function bN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function xN(t) {
  return arguments.length ? this.each(t == null ? yN : (typeof t == "function" ? bN : vN)(t)) : this.node().textContent;
}
function SN() {
  this.innerHTML = "";
}
function wN(t) {
  return function() {
    this.innerHTML = t;
  };
}
function EN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function _N(t) {
  return arguments.length ? this.each(t == null ? SN : (typeof t == "function" ? EN : wN)(t)) : this.node().innerHTML;
}
function NN() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function MN() {
  return this.each(NN);
}
function TN() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function CN() {
  return this.each(TN);
}
function RN(t) {
  var a = typeof t == "function" ? t : _b(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function AN() {
  return null;
}
function DN(t, a) {
  var i = typeof t == "function" ? t : _b(t), o = a == null ? AN : typeof a == "function" ? a : xh(a);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function zN() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ON() {
  return this.each(zN);
}
function jN() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function LN() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function HN(t) {
  return this.select(t ? LN : jN);
}
function BN(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function UN(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function kN(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var i = "", o = a.indexOf(".");
    return o >= 0 && (i = a.slice(o + 1), a = a.slice(0, o)), { type: a, name: i };
  });
}
function VN(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var i = 0, o = -1, s = a.length, u; i < s; ++i)
        u = a[i], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++o] = u;
      ++o ? a.length = o : delete this.__on;
    }
  };
}
function YN(t, a, i) {
  return function() {
    var o = this.__on, s, u = UN(a);
    if (o) {
      for (var f = 0, h = o.length; f < h; ++f)
        if ((s = o[f]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = i), s.value = a;
          return;
        }
    }
    this.addEventListener(t.type, u, i), s = { type: t.type, name: t.name, value: a, listener: u, options: i }, o ? o.push(s) : this.__on = [s];
  };
}
function GN(t, a, i) {
  var o = kN(t + ""), s, u = o.length, f;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var p = 0, g = h.length, y; p < g; ++p)
        for (s = 0, y = h[p]; s < u; ++s)
          if ((f = o[s]).type === y.type && f.name === y.name)
            return y.value;
    }
    return;
  }
  for (h = a ? YN : VN, s = 0; s < u; ++s) this.each(h(o[s], a, i));
  return this;
}
function jb(t, a, i) {
  var o = Rb(t), s = o.CustomEvent;
  typeof s == "function" ? s = new s(a, i) : (s = o.document.createEvent("Event"), i ? (s.initEvent(a, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function qN(t, a) {
  return function() {
    return jb(this, t, a);
  };
}
function $N(t, a) {
  return function() {
    return jb(this, t, a.apply(this, arguments));
  };
}
function XN(t, a) {
  return this.each((typeof a == "function" ? $N : qN)(t, a));
}
function* ZN() {
  for (var t = this._groups, a = 0, i = t.length; a < i; ++a)
    for (var o = t[a], s = 0, u = o.length, f; s < u; ++s)
      (f = o[s]) && (yield f);
}
var Lb = [null];
function Un(t, a) {
  this._groups = t, this._parents = a;
}
function Do() {
  return new Un([[document.documentElement]], Lb);
}
function QN() {
  return this;
}
Un.prototype = Do.prototype = {
  constructor: Un,
  select: b2,
  selectAll: E2,
  selectChild: T2,
  selectChildren: D2,
  filter: z2,
  data: U2,
  enter: O2,
  exit: V2,
  join: Y2,
  merge: G2,
  selection: QN,
  order: q2,
  sort: $2,
  call: Z2,
  nodes: Q2,
  node: I2,
  size: K2,
  empty: F2,
  each: J2,
  attr: lN,
  style: sN,
  property: dN,
  classed: pN,
  text: xN,
  html: _N,
  raise: MN,
  lower: CN,
  append: RN,
  insert: DN,
  remove: ON,
  clone: HN,
  datum: BN,
  on: GN,
  dispatch: XN,
  [Symbol.iterator]: ZN
};
function Bn(t) {
  return typeof t == "string" ? new Un([[document.querySelector(t)]], [document.documentElement]) : new Un([[t]], Lb);
}
function IN(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ua(t, a) {
  if (t = IN(t), a === void 0 && (a = t.currentTarget), a) {
    var i = a.ownerSVGElement || a;
    if (i.createSVGPoint) {
      var o = i.createSVGPoint();
      return o.x = t.clientX, o.y = t.clientY, o = o.matrixTransform(a.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [t.clientX - s.left - a.clientLeft, t.clientY - s.top - a.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const KN = { passive: !1 }, yo = { capture: !0, passive: !1 };
function hd(t) {
  t.stopImmediatePropagation();
}
function er(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Hb(t) {
  var a = t.document.documentElement, i = Bn(t).on("dragstart.drag", er, yo);
  "onselectstart" in a ? i.on("selectstart.drag", er, yo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function Bb(t, a) {
  var i = t.document.documentElement, o = Bn(t).on("dragstart.drag", null);
  a && (o.on("click.drag", er, yo), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in i ? o.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
const Fs = (t) => () => t;
function Gd(t, {
  sourceEvent: a,
  subject: i,
  target: o,
  identifier: s,
  active: u,
  x: f,
  y: h,
  dx: p,
  dy: g,
  dispatch: y
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    subject: { value: i, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: f, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: g, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
Gd.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function FN(t) {
  return !t.ctrlKey && !t.button;
}
function JN() {
  return this.parentNode;
}
function PN(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function WN() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ub() {
  var t = FN, a = JN, i = PN, o = WN, s = {}, u = Bu("start", "drag", "end"), f = 0, h, p, g, y, m = 0;
  function v(z) {
    z.on("mousedown.drag", x).filter(o).on("touchstart.drag", R).on("touchmove.drag", T, KN).on("touchend.drag touchcancel.drag", L).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(z, Y) {
    if (!(y || !t.call(this, z, Y))) {
      var U = E(this, a.call(this, z, Y), z, Y, "mouse");
      U && (Bn(z.view).on("mousemove.drag", S, yo).on("mouseup.drag", A, yo), Hb(z.view), hd(z), g = !1, h = z.clientX, p = z.clientY, U("start", z));
    }
  }
  function S(z) {
    if (er(z), !g) {
      var Y = z.clientX - h, U = z.clientY - p;
      g = Y * Y + U * U > m;
    }
    s.mouse("drag", z);
  }
  function A(z) {
    Bn(z.view).on("mousemove.drag mouseup.drag", null), Bb(z.view, g), er(z), s.mouse("end", z);
  }
  function R(z, Y) {
    if (t.call(this, z, Y)) {
      var U = z.changedTouches, V = a.call(this, z, Y), C = U.length, G, P;
      for (G = 0; G < C; ++G)
        (P = E(this, V, z, Y, U[G].identifier, U[G])) && (hd(z), P("start", z, U[G]));
    }
  }
  function T(z) {
    var Y = z.changedTouches, U = Y.length, V, C;
    for (V = 0; V < U; ++V)
      (C = s[Y[V].identifier]) && (er(z), C("drag", z, Y[V]));
  }
  function L(z) {
    var Y = z.changedTouches, U = Y.length, V, C;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < U; ++V)
      (C = s[Y[V].identifier]) && (hd(z), C("end", z, Y[V]));
  }
  function E(z, Y, U, V, C, G) {
    var P = u.copy(), I = ua(G || U, Y), J, oe, j;
    if ((j = i.call(z, new Gd("beforestart", {
      sourceEvent: U,
      target: v,
      identifier: C,
      active: f,
      x: I[0],
      y: I[1],
      dx: 0,
      dy: 0,
      dispatch: P
    }), V)) != null)
      return J = j.x - I[0] || 0, oe = j.y - I[1] || 0, function X(N, O, Q) {
        var $ = I, le;
        switch (N) {
          case "start":
            s[C] = X, le = f++;
            break;
          case "end":
            delete s[C], --f;
          // falls through
          case "drag":
            I = ua(Q || O, Y), le = f;
            break;
        }
        P.call(
          N,
          z,
          new Gd(N, {
            sourceEvent: O,
            subject: j,
            target: v,
            identifier: C,
            active: le,
            x: I[0] + J,
            y: I[1] + oe,
            dx: I[0] - $[0],
            dy: I[1] - $[1],
            dispatch: P
          }),
          V
        );
      };
  }
  return v.filter = function(z) {
    return arguments.length ? (t = typeof z == "function" ? z : Fs(!!z), v) : t;
  }, v.container = function(z) {
    return arguments.length ? (a = typeof z == "function" ? z : Fs(z), v) : a;
  }, v.subject = function(z) {
    return arguments.length ? (i = typeof z == "function" ? z : Fs(z), v) : i;
  }, v.touchable = function(z) {
    return arguments.length ? (o = typeof z == "function" ? z : Fs(!!z), v) : o;
  }, v.on = function() {
    var z = u.on.apply(u, arguments);
    return z === u ? v : z;
  }, v.clickDistance = function(z) {
    return arguments.length ? (m = (z = +z) * z, v) : Math.sqrt(m);
  }, v;
}
function wh(t, a, i) {
  t.prototype = a.prototype = i, i.constructor = t;
}
function kb(t, a) {
  var i = Object.create(t.prototype);
  for (var o in a) i[o] = a[o];
  return i;
}
function zo() {
}
var vo = 0.7, Su = 1 / vo, tr = "\\s*([+-]?\\d+)\\s*", bo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ma = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", eM = /^#([0-9a-f]{3,8})$/, tM = new RegExp(`^rgb\\(${tr},${tr},${tr}\\)$`), nM = new RegExp(`^rgb\\(${Ma},${Ma},${Ma}\\)$`), aM = new RegExp(`^rgba\\(${tr},${tr},${tr},${bo}\\)$`), lM = new RegExp(`^rgba\\(${Ma},${Ma},${Ma},${bo}\\)$`), iM = new RegExp(`^hsl\\(${bo},${Ma},${Ma}\\)$`), rM = new RegExp(`^hsla\\(${bo},${Ma},${Ma},${bo}\\)$`), hy = {
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
wh(zo, ri, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: my,
  // Deprecated! Use color.formatHex.
  formatHex: my,
  formatHex8: oM,
  formatHsl: sM,
  formatRgb: gy,
  toString: gy
});
function my() {
  return this.rgb().formatHex();
}
function oM() {
  return this.rgb().formatHex8();
}
function sM() {
  return Vb(this).formatHsl();
}
function gy() {
  return this.rgb().formatRgb();
}
function ri(t) {
  var a, i;
  return t = (t + "").trim().toLowerCase(), (a = eM.exec(t)) ? (i = a[1].length, a = parseInt(a[1], 16), i === 6 ? py(a) : i === 3 ? new _n(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : i === 8 ? Js(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : i === 4 ? Js(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = tM.exec(t)) ? new _n(a[1], a[2], a[3], 1) : (a = nM.exec(t)) ? new _n(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = aM.exec(t)) ? Js(a[1], a[2], a[3], a[4]) : (a = lM.exec(t)) ? Js(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = iM.exec(t)) ? by(a[1], a[2] / 100, a[3] / 100, 1) : (a = rM.exec(t)) ? by(a[1], a[2] / 100, a[3] / 100, a[4]) : hy.hasOwnProperty(t) ? py(hy[t]) : t === "transparent" ? new _n(NaN, NaN, NaN, 0) : null;
}
function py(t) {
  return new _n(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Js(t, a, i, o) {
  return o <= 0 && (t = a = i = NaN), new _n(t, a, i, o);
}
function uM(t) {
  return t instanceof zo || (t = ri(t)), t ? (t = t.rgb(), new _n(t.r, t.g, t.b, t.opacity)) : new _n();
}
function qd(t, a, i, o) {
  return arguments.length === 1 ? uM(t) : new _n(t, a, i, o ?? 1);
}
function _n(t, a, i, o) {
  this.r = +t, this.g = +a, this.b = +i, this.opacity = +o;
}
wh(_n, qd, kb(zo, {
  brighter(t) {
    return t = t == null ? Su : Math.pow(Su, t), new _n(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? vo : Math.pow(vo, t), new _n(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _n(li(this.r), li(this.g), li(this.b), wu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: yy,
  // Deprecated! Use color.formatHex.
  formatHex: yy,
  formatHex8: cM,
  formatRgb: vy,
  toString: vy
}));
function yy() {
  return `#${ai(this.r)}${ai(this.g)}${ai(this.b)}`;
}
function cM() {
  return `#${ai(this.r)}${ai(this.g)}${ai(this.b)}${ai((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function vy() {
  const t = wu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${li(this.r)}, ${li(this.g)}, ${li(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function wu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function li(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ai(t) {
  return t = li(t), (t < 16 ? "0" : "") + t.toString(16);
}
function by(t, a, i, o) {
  return o <= 0 ? t = a = i = NaN : i <= 0 || i >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ca(t, a, i, o);
}
function Vb(t) {
  if (t instanceof ca) return new ca(t.h, t.s, t.l, t.opacity);
  if (t instanceof zo || (t = ri(t)), !t) return new ca();
  if (t instanceof ca) return t;
  t = t.rgb();
  var a = t.r / 255, i = t.g / 255, o = t.b / 255, s = Math.min(a, i, o), u = Math.max(a, i, o), f = NaN, h = u - s, p = (u + s) / 2;
  return h ? (a === u ? f = (i - o) / h + (i < o) * 6 : i === u ? f = (o - a) / h + 2 : f = (a - i) / h + 4, h /= p < 0.5 ? u + s : 2 - u - s, f *= 60) : h = p > 0 && p < 1 ? 0 : f, new ca(f, h, p, t.opacity);
}
function fM(t, a, i, o) {
  return arguments.length === 1 ? Vb(t) : new ca(t, a, i, o ?? 1);
}
function ca(t, a, i, o) {
  this.h = +t, this.s = +a, this.l = +i, this.opacity = +o;
}
wh(ca, fM, kb(zo, {
  brighter(t) {
    return t = t == null ? Su : Math.pow(Su, t), new ca(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? vo : Math.pow(vo, t), new ca(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, o = i + (i < 0.5 ? i : 1 - i) * a, s = 2 * i - o;
    return new _n(
      md(t >= 240 ? t - 240 : t + 120, s, o),
      md(t, s, o),
      md(t < 120 ? t + 240 : t - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new ca(xy(this.h), Ps(this.s), Ps(this.l), wu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = wu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${xy(this.h)}, ${Ps(this.s) * 100}%, ${Ps(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function xy(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ps(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function md(t, a, i) {
  return (t < 60 ? a + (i - a) * t / 60 : t < 180 ? i : t < 240 ? a + (i - a) * (240 - t) / 60 : a) * 255;
}
const Eh = (t) => () => t;
function dM(t, a) {
  return function(i) {
    return t + i * a;
  };
}
function hM(t, a, i) {
  return t = Math.pow(t, i), a = Math.pow(a, i) - t, i = 1 / i, function(o) {
    return Math.pow(t + o * a, i);
  };
}
function mM(t) {
  return (t = +t) == 1 ? Yb : function(a, i) {
    return i - a ? hM(a, i, t) : Eh(isNaN(a) ? i : a);
  };
}
function Yb(t, a) {
  var i = a - t;
  return i ? dM(t, i) : Eh(isNaN(t) ? a : t);
}
const Eu = (function t(a) {
  var i = mM(a);
  function o(s, u) {
    var f = i((s = qd(s)).r, (u = qd(u)).r), h = i(s.g, u.g), p = i(s.b, u.b), g = Yb(s.opacity, u.opacity);
    return function(y) {
      return s.r = f(y), s.g = h(y), s.b = p(y), s.opacity = g(y), s + "";
    };
  }
  return o.gamma = t, o;
})(1);
function gM(t, a) {
  a || (a = []);
  var i = t ? Math.min(a.length, t.length) : 0, o = a.slice(), s;
  return function(u) {
    for (s = 0; s < i; ++s) o[s] = t[s] * (1 - u) + a[s] * u;
    return o;
  };
}
function pM(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function yM(t, a) {
  var i = a ? a.length : 0, o = t ? Math.min(i, t.length) : 0, s = new Array(o), u = new Array(i), f;
  for (f = 0; f < o; ++f) s[f] = ho(t[f], a[f]);
  for (; f < i; ++f) u[f] = a[f];
  return function(h) {
    for (f = 0; f < o; ++f) u[f] = s[f](h);
    return u;
  };
}
function vM(t, a) {
  var i = /* @__PURE__ */ new Date();
  return t = +t, a = +a, function(o) {
    return i.setTime(t * (1 - o) + a * o), i;
  };
}
function Na(t, a) {
  return t = +t, a = +a, function(i) {
    return t * (1 - i) + a * i;
  };
}
function bM(t, a) {
  var i = {}, o = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? i[s] = ho(t[s], a[s]) : o[s] = a[s];
  return function(u) {
    for (s in i) o[s] = i[s](u);
    return o;
  };
}
var $d = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gd = new RegExp($d.source, "g");
function xM(t) {
  return function() {
    return t;
  };
}
function SM(t) {
  return function(a) {
    return t(a) + "";
  };
}
function Gb(t, a) {
  var i = $d.lastIndex = gd.lastIndex = 0, o, s, u, f = -1, h = [], p = [];
  for (t = t + "", a = a + ""; (o = $d.exec(t)) && (s = gd.exec(a)); )
    (u = s.index) > i && (u = a.slice(i, u), h[f] ? h[f] += u : h[++f] = u), (o = o[0]) === (s = s[0]) ? h[f] ? h[f] += s : h[++f] = s : (h[++f] = null, p.push({ i: f, x: Na(o, s) })), i = gd.lastIndex;
  return i < a.length && (u = a.slice(i), h[f] ? h[f] += u : h[++f] = u), h.length < 2 ? p[0] ? SM(p[0].x) : xM(a) : (a = p.length, function(g) {
    for (var y = 0, m; y < a; ++y) h[(m = p[y]).i] = m.x(g);
    return h.join("");
  });
}
function ho(t, a) {
  var i = typeof a, o;
  return a == null || i === "boolean" ? Eh(a) : (i === "number" ? Na : i === "string" ? (o = ri(a)) ? (a = o, Eu) : Gb : a instanceof ri ? Eu : a instanceof Date ? vM : pM(a) ? gM : Array.isArray(a) ? yM : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? bM : Na)(t, a);
}
var Sy = 180 / Math.PI, Xd = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function qb(t, a, i, o, s, u) {
  var f, h, p;
  return (f = Math.sqrt(t * t + a * a)) && (t /= f, a /= f), (p = t * i + a * o) && (i -= t * p, o -= a * p), (h = Math.sqrt(i * i + o * o)) && (i /= h, o /= h, p /= h), t * o < a * i && (t = -t, a = -a, p = -p, f = -f), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * Sy,
    skewX: Math.atan(p) * Sy,
    scaleX: f,
    scaleY: h
  };
}
var Ws;
function wM(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? Xd : qb(a.a, a.b, a.c, a.d, a.e, a.f);
}
function EM(t) {
  return t == null || (Ws || (Ws = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ws.setAttribute("transform", t), !(t = Ws.transform.baseVal.consolidate())) ? Xd : (t = t.matrix, qb(t.a, t.b, t.c, t.d, t.e, t.f));
}
function $b(t, a, i, o) {
  function s(g) {
    return g.length ? g.pop() + " " : "";
  }
  function u(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var A = x.push("translate(", null, a, null, i);
      S.push({ i: A - 4, x: Na(g, m) }, { i: A - 2, x: Na(y, v) });
    } else (m || v) && x.push("translate(" + m + a + v + i);
  }
  function f(g, y, m, v) {
    g !== y ? (g - y > 180 ? y += 360 : y - g > 180 && (g += 360), v.push({ i: m.push(s(m) + "rotate(", null, o) - 2, x: Na(g, y) })) : y && m.push(s(m) + "rotate(" + y + o);
  }
  function h(g, y, m, v) {
    g !== y ? v.push({ i: m.push(s(m) + "skewX(", null, o) - 2, x: Na(g, y) }) : y && m.push(s(m) + "skewX(" + y + o);
  }
  function p(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var A = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: A - 4, x: Na(g, m) }, { i: A - 2, x: Na(y, v) });
    } else (m !== 1 || v !== 1) && x.push(s(x) + "scale(" + m + "," + v + ")");
  }
  return function(g, y) {
    var m = [], v = [];
    return g = t(g), y = t(y), u(g.translateX, g.translateY, y.translateX, y.translateY, m, v), f(g.rotate, y.rotate, m, v), h(g.skewX, y.skewX, m, v), p(g.scaleX, g.scaleY, y.scaleX, y.scaleY, m, v), g = y = null, function(x) {
      for (var S = -1, A = v.length, R; ++S < A; ) m[(R = v[S]).i] = R.x(x);
      return m.join("");
    };
  };
}
var _M = $b(wM, "px, ", "px)", "deg)"), NM = $b(EM, ", ", ")", ")"), MM = 1e-12;
function wy(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function TM(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function CM(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const du = (function t(a, i, o) {
  function s(u, f) {
    var h = u[0], p = u[1], g = u[2], y = f[0], m = f[1], v = f[2], x = y - h, S = m - p, A = x * x + S * S, R, T;
    if (A < MM)
      T = Math.log(v / g) / a, R = function(V) {
        return [
          h + V * x,
          p + V * S,
          g * Math.exp(a * V * T)
        ];
      };
    else {
      var L = Math.sqrt(A), E = (v * v - g * g + o * A) / (2 * g * i * L), z = (v * v - g * g - o * A) / (2 * v * i * L), Y = Math.log(Math.sqrt(E * E + 1) - E), U = Math.log(Math.sqrt(z * z + 1) - z);
      T = (U - Y) / a, R = function(V) {
        var C = V * T, G = wy(Y), P = g / (i * L) * (G * CM(a * C + Y) - TM(Y));
        return [
          h + P * x,
          p + P * S,
          g * G / wy(a * C + Y)
        ];
      };
    }
    return R.duration = T * 1e3 * a / Math.SQRT2, R;
  }
  return s.rho = function(u) {
    var f = Math.max(1e-3, +u), h = f * f, p = h * h;
    return t(f, h, p);
  }, s;
})(Math.SQRT2, 2, 4);
var lr = 0, uo = 0, io = 0, Xb = 1e3, _u, co, Nu = 0, oi = 0, ku = 0, xo = typeof performance == "object" && performance.now ? performance : Date, Zb = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function _h() {
  return oi || (Zb(RM), oi = xo.now() + ku);
}
function RM() {
  oi = 0;
}
function Mu() {
  this._call = this._time = this._next = null;
}
Mu.prototype = Qb.prototype = {
  constructor: Mu,
  restart: function(t, a, i) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    i = (i == null ? _h() : +i) + (a == null ? 0 : +a), !this._next && co !== this && (co ? co._next = this : _u = this, co = this), this._call = t, this._time = i, Zd();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Zd());
  }
};
function Qb(t, a, i) {
  var o = new Mu();
  return o.restart(t, a, i), o;
}
function AM() {
  _h(), ++lr;
  for (var t = _u, a; t; )
    (a = oi - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --lr;
}
function Ey() {
  oi = (Nu = xo.now()) + ku, lr = uo = 0;
  try {
    AM();
  } finally {
    lr = 0, zM(), oi = 0;
  }
}
function DM() {
  var t = xo.now(), a = t - Nu;
  a > Xb && (ku -= a, Nu = t);
}
function zM() {
  for (var t, a = _u, i, o = 1 / 0; a; )
    a._call ? (o > a._time && (o = a._time), t = a, a = a._next) : (i = a._next, a._next = null, a = t ? t._next = i : _u = i);
  co = t, Zd(o);
}
function Zd(t) {
  if (!lr) {
    uo && (uo = clearTimeout(uo));
    var a = t - oi;
    a > 24 ? (t < 1 / 0 && (uo = setTimeout(Ey, t - xo.now() - ku)), io && (io = clearInterval(io))) : (io || (Nu = xo.now(), io = setInterval(DM, Xb)), lr = 1, Zb(Ey));
  }
}
function _y(t, a, i) {
  var o = new Mu();
  return a = a == null ? 0 : +a, o.restart((s) => {
    o.stop(), t(s + a);
  }, a, i), o;
}
var OM = Bu("start", "end", "cancel", "interrupt"), jM = [], Ib = 0, Ny = 1, Qd = 2, hu = 3, My = 4, Id = 5, mu = 6;
function Vu(t, a, i, o, s, u) {
  var f = t.__transition;
  if (!f) t.__transition = {};
  else if (i in f) return;
  LM(t, i, {
    name: a,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: OM,
    tween: jM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: Ib
  });
}
function Nh(t, a) {
  var i = ga(t, a);
  if (i.state > Ib) throw new Error("too late; already scheduled");
  return i;
}
function Aa(t, a) {
  var i = ga(t, a);
  if (i.state > hu) throw new Error("too late; already running");
  return i;
}
function ga(t, a) {
  var i = t.__transition;
  if (!i || !(i = i[a])) throw new Error("transition not found");
  return i;
}
function LM(t, a, i) {
  var o = t.__transition, s;
  o[a] = i, i.timer = Qb(u, 0, i.time);
  function u(g) {
    i.state = Ny, i.timer.restart(f, i.delay, i.time), i.delay <= g && f(g - i.delay);
  }
  function f(g) {
    var y, m, v, x;
    if (i.state !== Ny) return p();
    for (y in o)
      if (x = o[y], x.name === i.name) {
        if (x.state === hu) return _y(f);
        x.state === My ? (x.state = mu, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete o[y]) : +y < a && (x.state = mu, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete o[y]);
      }
    if (_y(function() {
      i.state === hu && (i.state = My, i.timer.restart(h, i.delay, i.time), h(g));
    }), i.state = Qd, i.on.call("start", t, t.__data__, i.index, i.group), i.state === Qd) {
      for (i.state = hu, s = new Array(v = i.tween.length), y = 0, m = -1; y < v; ++y)
        (x = i.tween[y].value.call(t, t.__data__, i.index, i.group)) && (s[++m] = x);
      s.length = m + 1;
    }
  }
  function h(g) {
    for (var y = g < i.duration ? i.ease.call(null, g / i.duration) : (i.timer.restart(p), i.state = Id, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(t, y);
    i.state === Id && (i.on.call("end", t, t.__data__, i.index, i.group), p());
  }
  function p() {
    i.state = mu, i.timer.stop(), delete o[a];
    for (var g in o) return;
    delete t.__transition;
  }
}
function gu(t, a) {
  var i = t.__transition, o, s, u = !0, f;
  if (i) {
    a = a == null ? null : a + "";
    for (f in i) {
      if ((o = i[f]).name !== a) {
        u = !1;
        continue;
      }
      s = o.state > Qd && o.state < Id, o.state = mu, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete i[f];
    }
    u && delete t.__transition;
  }
}
function HM(t) {
  return this.each(function() {
    gu(this, t);
  });
}
function BM(t, a) {
  var i, o;
  return function() {
    var s = Aa(this, t), u = s.tween;
    if (u !== i) {
      o = i = u;
      for (var f = 0, h = o.length; f < h; ++f)
        if (o[f].name === a) {
          o = o.slice(), o.splice(f, 1);
          break;
        }
    }
    s.tween = o;
  };
}
function UM(t, a, i) {
  var o, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var u = Aa(this, t), f = u.tween;
    if (f !== o) {
      s = (o = f).slice();
      for (var h = { name: a, value: i }, p = 0, g = s.length; p < g; ++p)
        if (s[p].name === a) {
          s[p] = h;
          break;
        }
      p === g && s.push(h);
    }
    u.tween = s;
  };
}
function kM(t, a) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = ga(this.node(), i).tween, s = 0, u = o.length, f; s < u; ++s)
      if ((f = o[s]).name === t)
        return f.value;
    return null;
  }
  return this.each((a == null ? BM : UM)(i, t, a));
}
function Mh(t, a, i) {
  var o = t._id;
  return t.each(function() {
    var s = Aa(this, o);
    (s.value || (s.value = {}))[a] = i.apply(this, arguments);
  }), function(s) {
    return ga(s, o).value[a];
  };
}
function Kb(t, a) {
  var i;
  return (typeof a == "number" ? Na : a instanceof ri ? Eu : (i = ri(a)) ? (a = i, Eu) : Gb)(t, a);
}
function VM(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function YM(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function GM(t, a, i) {
  var o, s = i + "", u;
  return function() {
    var f = this.getAttribute(t);
    return f === s ? null : f === o ? u : u = a(o = f, i);
  };
}
function qM(t, a, i) {
  var o, s = i + "", u;
  return function() {
    var f = this.getAttributeNS(t.space, t.local);
    return f === s ? null : f === o ? u : u = a(o = f, i);
  };
}
function $M(t, a, i) {
  var o, s, u;
  return function() {
    var f, h = i(this), p;
    return h == null ? void this.removeAttribute(t) : (f = this.getAttribute(t), p = h + "", f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h)));
  };
}
function XM(t, a, i) {
  var o, s, u;
  return function() {
    var f, h = i(this), p;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (f = this.getAttributeNS(t.space, t.local), p = h + "", f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h)));
  };
}
function ZM(t, a) {
  var i = Uu(t), o = i === "transform" ? NM : Kb;
  return this.attrTween(t, typeof a == "function" ? (i.local ? XM : $M)(i, o, Mh(this, "attr." + t, a)) : a == null ? (i.local ? YM : VM)(i) : (i.local ? qM : GM)(i, o, a));
}
function QM(t, a) {
  return function(i) {
    this.setAttribute(t, a.call(this, i));
  };
}
function IM(t, a) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, a.call(this, i));
  };
}
function KM(t, a) {
  var i, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (i = (o = u) && IM(t, u)), i;
  }
  return s._value = a, s;
}
function FM(t, a) {
  var i, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (i = (o = u) && QM(t, u)), i;
  }
  return s._value = a, s;
}
function JM(t, a) {
  var i = "attr." + t;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (a == null) return this.tween(i, null);
  if (typeof a != "function") throw new Error();
  var o = Uu(t);
  return this.tween(i, (o.local ? KM : FM)(o, a));
}
function PM(t, a) {
  return function() {
    Nh(this, t).delay = +a.apply(this, arguments);
  };
}
function WM(t, a) {
  return a = +a, function() {
    Nh(this, t).delay = a;
  };
}
function eT(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? PM : WM)(a, t)) : ga(this.node(), a).delay;
}
function tT(t, a) {
  return function() {
    Aa(this, t).duration = +a.apply(this, arguments);
  };
}
function nT(t, a) {
  return a = +a, function() {
    Aa(this, t).duration = a;
  };
}
function aT(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? tT : nT)(a, t)) : ga(this.node(), a).duration;
}
function lT(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Aa(this, t).ease = a;
  };
}
function iT(t) {
  var a = this._id;
  return arguments.length ? this.each(lT(a, t)) : ga(this.node(), a).ease;
}
function rT(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Aa(this, t).ease = i;
  };
}
function oT(t) {
  if (typeof t != "function") throw new Error();
  return this.each(rT(this._id, t));
}
function sT(t) {
  typeof t != "function" && (t = Mb(t));
  for (var a = this._groups, i = a.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], f = u.length, h = o[s] = [], p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Pa(o, this._parents, this._name, this._id);
}
function uT(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, i = t._groups, o = a.length, s = i.length, u = Math.min(o, s), f = new Array(o), h = 0; h < u; ++h)
    for (var p = a[h], g = i[h], y = p.length, m = f[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || g[x]) && (m[x] = v);
  for (; h < o; ++h)
    f[h] = a[h];
  return new Pa(f, this._parents, this._name, this._id);
}
function cT(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var i = a.indexOf(".");
    return i >= 0 && (a = a.slice(0, i)), !a || a === "start";
  });
}
function fT(t, a, i) {
  var o, s, u = cT(a) ? Nh : Aa;
  return function() {
    var f = u(this, t), h = f.on;
    h !== o && (s = (o = h).copy()).on(a, i), f.on = s;
  };
}
function dT(t, a) {
  var i = this._id;
  return arguments.length < 2 ? ga(this.node(), i).on.on(t) : this.each(fT(i, t, a));
}
function hT(t) {
  return function() {
    var a = this.parentNode;
    for (var i in this.__transition) if (+i !== t) return;
    a && a.removeChild(this);
  };
}
function mT() {
  return this.on("end.remove", hT(this._id));
}
function gT(t) {
  var a = this._name, i = this._id;
  typeof t != "function" && (t = xh(t));
  for (var o = this._groups, s = o.length, u = new Array(s), f = 0; f < s; ++f)
    for (var h = o[f], p = h.length, g = u[f] = new Array(p), y, m, v = 0; v < p; ++v)
      (y = h[v]) && (m = t.call(y, y.__data__, v, h)) && ("__data__" in y && (m.__data__ = y.__data__), g[v] = m, Vu(g[v], a, i, v, g, ga(y, i)));
  return new Pa(u, this._parents, a, i);
}
function pT(t) {
  var a = this._name, i = this._id;
  typeof t != "function" && (t = Nb(t));
  for (var o = this._groups, s = o.length, u = [], f = [], h = 0; h < s; ++h)
    for (var p = o[h], g = p.length, y, m = 0; m < g; ++m)
      if (y = p[m]) {
        for (var v = t.call(y, y.__data__, m, p), x, S = ga(y, i), A = 0, R = v.length; A < R; ++A)
          (x = v[A]) && Vu(x, a, i, A, v, S);
        u.push(v), f.push(y);
      }
  return new Pa(u, f, a, i);
}
var yT = Do.prototype.constructor;
function vT() {
  return new yT(this._groups, this._parents);
}
function bT(t, a) {
  var i, o, s;
  return function() {
    var u = ar(this, t), f = (this.style.removeProperty(t), ar(this, t));
    return u === f ? null : u === i && f === o ? s : s = a(i = u, o = f);
  };
}
function Fb(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xT(t, a, i) {
  var o, s = i + "", u;
  return function() {
    var f = ar(this, t);
    return f === s ? null : f === o ? u : u = a(o = f, i);
  };
}
function ST(t, a, i) {
  var o, s, u;
  return function() {
    var f = ar(this, t), h = i(this), p = h + "";
    return h == null && (p = h = (this.style.removeProperty(t), ar(this, t))), f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h));
  };
}
function wT(t, a) {
  var i, o, s, u = "style." + a, f = "end." + u, h;
  return function() {
    var p = Aa(this, t), g = p.on, y = p.value[u] == null ? h || (h = Fb(a)) : void 0;
    (g !== i || s !== y) && (o = (i = g).copy()).on(f, s = y), p.on = o;
  };
}
function ET(t, a, i) {
  var o = (t += "") == "transform" ? _M : Kb;
  return a == null ? this.styleTween(t, bT(t, o)).on("end.style." + t, Fb(t)) : typeof a == "function" ? this.styleTween(t, ST(t, o, Mh(this, "style." + t, a))).each(wT(this._id, t)) : this.styleTween(t, xT(t, o, a), i).on("end.style." + t, null);
}
function _T(t, a, i) {
  return function(o) {
    this.style.setProperty(t, a.call(this, o), i);
  };
}
function NT(t, a, i) {
  var o, s;
  function u() {
    var f = a.apply(this, arguments);
    return f !== s && (o = (s = f) && _T(t, f, i)), o;
  }
  return u._value = a, u;
}
function MT(t, a, i) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (a == null) return this.tween(o, null);
  if (typeof a != "function") throw new Error();
  return this.tween(o, NT(t, a, i ?? ""));
}
function TT(t) {
  return function() {
    this.textContent = t;
  };
}
function CT(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function RT(t) {
  return this.tween("text", typeof t == "function" ? CT(Mh(this, "text", t)) : TT(t == null ? "" : t + ""));
}
function AT(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function DT(t) {
  var a, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (a = (i = s) && AT(s)), a;
  }
  return o._value = t, o;
}
function zT(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, DT(t));
}
function OT() {
  for (var t = this._name, a = this._id, i = Jb(), o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      if (p = f[g]) {
        var y = ga(p, a);
        Vu(p, t, i, g, f, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new Pa(o, this._parents, t, i);
}
function jT() {
  var t, a, i = this, o = i._id, s = i.size();
  return new Promise(function(u, f) {
    var h = { value: f }, p = { value: function() {
      --s === 0 && u();
    } };
    i.each(function() {
      var g = Aa(this, o), y = g.on;
      y !== t && (a = (t = y).copy(), a._.cancel.push(h), a._.interrupt.push(h), a._.end.push(p)), g.on = a;
    }), s === 0 && u();
  });
}
var LT = 0;
function Pa(t, a, i, o) {
  this._groups = t, this._parents = a, this._name = i, this._id = o;
}
function Jb() {
  return ++LT;
}
var Ka = Do.prototype;
Pa.prototype = {
  constructor: Pa,
  select: gT,
  selectAll: pT,
  selectChild: Ka.selectChild,
  selectChildren: Ka.selectChildren,
  filter: sT,
  merge: uT,
  selection: vT,
  transition: OT,
  call: Ka.call,
  nodes: Ka.nodes,
  node: Ka.node,
  size: Ka.size,
  empty: Ka.empty,
  each: Ka.each,
  on: dT,
  attr: ZM,
  attrTween: JM,
  style: ET,
  styleTween: MT,
  text: RT,
  textTween: zT,
  remove: mT,
  tween: kM,
  delay: eT,
  duration: aT,
  ease: iT,
  easeVarying: oT,
  end: jT,
  [Symbol.iterator]: Ka[Symbol.iterator]
};
function HT(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var BT = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: HT
};
function UT(t, a) {
  for (var i; !(i = t.__transition) || !(i = i[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return i;
}
function kT(t) {
  var a, i;
  t instanceof Pa ? (a = t._id, t = t._name) : (a = Jb(), (i = BT).time = _h(), t = t == null ? null : t + "");
  for (var o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && Vu(p, t, a, g, f, i || UT(p, a));
  return new Pa(o, this._parents, t, a);
}
Do.prototype.interrupt = HM;
Do.prototype.transition = kT;
const eu = (t) => () => t;
function VT(t, {
  sourceEvent: a,
  target: i,
  transform: o,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function Fa(t, a, i) {
  this.k = t, this.x = a, this.y = i;
}
Fa.prototype = {
  constructor: Fa,
  scale: function(t) {
    return t === 1 ? this : new Fa(this.k * t, this.x, this.y);
  },
  translate: function(t, a) {
    return t === 0 & a === 0 ? this : new Fa(this.k, this.x + this.k * t, this.y + this.k * a);
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
var Yu = new Fa(1, 0, 0);
Pb.prototype = Fa.prototype;
function Pb(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Yu;
  return t.__zoom;
}
function pd(t) {
  t.stopImmediatePropagation();
}
function ro(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function YT(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function GT() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ty() {
  return this.__zoom || Yu;
}
function qT(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function $T() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function XT(t, a, i) {
  var o = t.invertX(a[0][0]) - i[0][0], s = t.invertX(a[1][0]) - i[1][0], u = t.invertY(a[0][1]) - i[0][1], f = t.invertY(a[1][1]) - i[1][1];
  return t.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    f > u ? (u + f) / 2 : Math.min(0, u) || Math.max(0, f)
  );
}
function Wb() {
  var t = YT, a = GT, i = XT, o = qT, s = $T, u = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, p = du, g = Bu("start", "zoom", "end"), y, m, v, x = 500, S = 150, A = 0, R = 10;
  function T(j) {
    j.property("__zoom", Ty).on("wheel.zoom", C, { passive: !1 }).on("mousedown.zoom", G).on("dblclick.zoom", P).filter(s).on("touchstart.zoom", I).on("touchmove.zoom", J).on("touchend.zoom touchcancel.zoom", oe).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  T.transform = function(j, X, N, O) {
    var Q = j.selection ? j.selection() : j;
    Q.property("__zoom", Ty), j !== Q ? Y(j, X, N, O) : Q.interrupt().each(function() {
      U(this, arguments).event(O).start().zoom(null, typeof X == "function" ? X.apply(this, arguments) : X).end();
    });
  }, T.scaleBy = function(j, X, N, O) {
    T.scaleTo(j, function() {
      var Q = this.__zoom.k, $ = typeof X == "function" ? X.apply(this, arguments) : X;
      return Q * $;
    }, N, O);
  }, T.scaleTo = function(j, X, N, O) {
    T.transform(j, function() {
      var Q = a.apply(this, arguments), $ = this.__zoom, le = N == null ? z(Q) : typeof N == "function" ? N.apply(this, arguments) : N, D = $.invert(le), k = typeof X == "function" ? X.apply(this, arguments) : X;
      return i(E(L($, k), le, D), Q, f);
    }, N, O);
  }, T.translateBy = function(j, X, N, O) {
    T.transform(j, function() {
      return i(this.__zoom.translate(
        typeof X == "function" ? X.apply(this, arguments) : X,
        typeof N == "function" ? N.apply(this, arguments) : N
      ), a.apply(this, arguments), f);
    }, null, O);
  }, T.translateTo = function(j, X, N, O, Q) {
    T.transform(j, function() {
      var $ = a.apply(this, arguments), le = this.__zoom, D = O == null ? z($) : typeof O == "function" ? O.apply(this, arguments) : O;
      return i(Yu.translate(D[0], D[1]).scale(le.k).translate(
        typeof X == "function" ? -X.apply(this, arguments) : -X,
        typeof N == "function" ? -N.apply(this, arguments) : -N
      ), $, f);
    }, O, Q);
  };
  function L(j, X) {
    return X = Math.max(u[0], Math.min(u[1], X)), X === j.k ? j : new Fa(X, j.x, j.y);
  }
  function E(j, X, N) {
    var O = X[0] - N[0] * j.k, Q = X[1] - N[1] * j.k;
    return O === j.x && Q === j.y ? j : new Fa(j.k, O, Q);
  }
  function z(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function Y(j, X, N, O) {
    j.on("start.zoom", function() {
      U(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      U(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var Q = this, $ = arguments, le = U(Q, $).event(O), D = a.apply(Q, $), k = N == null ? z(D) : typeof N == "function" ? N.apply(Q, $) : N, K = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), ae = Q.__zoom, se = typeof X == "function" ? X.apply(Q, $) : X, me = p(ae.invert(k).concat(K / ae.k), se.invert(k).concat(K / se.k));
      return function(ge) {
        if (ge === 1) ge = se;
        else {
          var ee = me(ge), pe = K / ee[2];
          ge = new Fa(pe, k[0] - ee[0] * pe, k[1] - ee[1] * pe);
        }
        le.zoom(null, ge);
      };
    });
  }
  function U(j, X, N) {
    return !N && j.__zooming || new V(j, X);
  }
  function V(j, X) {
    this.that = j, this.args = X, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, X), this.taps = 0;
  }
  V.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, X) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = X.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = X.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = X.invert(this.touch1[0])), this.that.__zoom = X, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var X = Bn(this.that).datum();
      g.call(
        j,
        this.that,
        new VT(j, {
          sourceEvent: this.sourceEvent,
          target: T,
          transform: this.that.__zoom,
          dispatch: g
        }),
        X
      );
    }
  };
  function C(j, ...X) {
    if (!t.apply(this, arguments)) return;
    var N = U(this, X).event(j), O = this.__zoom, Q = Math.max(u[0], Math.min(u[1], O.k * Math.pow(2, o.apply(this, arguments)))), $ = ua(j);
    if (N.wheel)
      (N.mouse[0][0] !== $[0] || N.mouse[0][1] !== $[1]) && (N.mouse[1] = O.invert(N.mouse[0] = $)), clearTimeout(N.wheel);
    else {
      if (O.k === Q) return;
      N.mouse = [$, O.invert($)], gu(this), N.start();
    }
    ro(j), N.wheel = setTimeout(le, S), N.zoom("mouse", i(E(L(O, Q), N.mouse[0], N.mouse[1]), N.extent, f));
    function le() {
      N.wheel = null, N.end();
    }
  }
  function G(j, ...X) {
    if (v || !t.apply(this, arguments)) return;
    var N = j.currentTarget, O = U(this, X, !0).event(j), Q = Bn(j.view).on("mousemove.zoom", k, !0).on("mouseup.zoom", K, !0), $ = ua(j, N), le = j.clientX, D = j.clientY;
    Hb(j.view), pd(j), O.mouse = [$, this.__zoom.invert($)], gu(this), O.start();
    function k(ae) {
      if (ro(ae), !O.moved) {
        var se = ae.clientX - le, me = ae.clientY - D;
        O.moved = se * se + me * me > A;
      }
      O.event(ae).zoom("mouse", i(E(O.that.__zoom, O.mouse[0] = ua(ae, N), O.mouse[1]), O.extent, f));
    }
    function K(ae) {
      Q.on("mousemove.zoom mouseup.zoom", null), Bb(ae.view, O.moved), ro(ae), O.event(ae).end();
    }
  }
  function P(j, ...X) {
    if (t.apply(this, arguments)) {
      var N = this.__zoom, O = ua(j.changedTouches ? j.changedTouches[0] : j, this), Q = N.invert(O), $ = N.k * (j.shiftKey ? 0.5 : 2), le = i(E(L(N, $), O, Q), a.apply(this, X), f);
      ro(j), h > 0 ? Bn(this).transition().duration(h).call(Y, le, O, j) : Bn(this).call(T.transform, le, O, j);
    }
  }
  function I(j, ...X) {
    if (t.apply(this, arguments)) {
      var N = j.touches, O = N.length, Q = U(this, X, j.changedTouches.length === O).event(j), $, le, D, k;
      for (pd(j), le = 0; le < O; ++le)
        D = N[le], k = ua(D, this), k = [k, this.__zoom.invert(k), D.identifier], Q.touch0 ? !Q.touch1 && Q.touch0[2] !== k[2] && (Q.touch1 = k, Q.taps = 0) : (Q.touch0 = k, $ = !0, Q.taps = 1 + !!y);
      y && (y = clearTimeout(y)), $ && (Q.taps < 2 && (m = k[0], y = setTimeout(function() {
        y = null;
      }, x)), gu(this), Q.start());
    }
  }
  function J(j, ...X) {
    if (this.__zooming) {
      var N = U(this, X).event(j), O = j.changedTouches, Q = O.length, $, le, D, k;
      for (ro(j), $ = 0; $ < Q; ++$)
        le = O[$], D = ua(le, this), N.touch0 && N.touch0[2] === le.identifier ? N.touch0[0] = D : N.touch1 && N.touch1[2] === le.identifier && (N.touch1[0] = D);
      if (le = N.that.__zoom, N.touch1) {
        var K = N.touch0[0], ae = N.touch0[1], se = N.touch1[0], me = N.touch1[1], ge = (ge = se[0] - K[0]) * ge + (ge = se[1] - K[1]) * ge, ee = (ee = me[0] - ae[0]) * ee + (ee = me[1] - ae[1]) * ee;
        le = L(le, Math.sqrt(ge / ee)), D = [(K[0] + se[0]) / 2, (K[1] + se[1]) / 2], k = [(ae[0] + me[0]) / 2, (ae[1] + me[1]) / 2];
      } else if (N.touch0) D = N.touch0[0], k = N.touch0[1];
      else return;
      N.zoom("touch", i(E(le, D, k), N.extent, f));
    }
  }
  function oe(j, ...X) {
    if (this.__zooming) {
      var N = U(this, X).event(j), O = j.changedTouches, Q = O.length, $, le;
      for (pd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), $ = 0; $ < Q; ++$)
        le = O[$], N.touch0 && N.touch0[2] === le.identifier ? delete N.touch0 : N.touch1 && N.touch1[2] === le.identifier && delete N.touch1;
      if (N.touch1 && !N.touch0 && (N.touch0 = N.touch1, delete N.touch1), N.touch0) N.touch0[1] = this.__zoom.invert(N.touch0[0]);
      else if (N.end(), N.taps === 2 && (le = ua(le, this), Math.hypot(m[0] - le[0], m[1] - le[1]) < R)) {
        var D = Bn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return T.wheelDelta = function(j) {
    return arguments.length ? (o = typeof j == "function" ? j : eu(+j), T) : o;
  }, T.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : eu(!!j), T) : t;
  }, T.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : eu(!!j), T) : s;
  }, T.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : eu([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), T) : a;
  }, T.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], T) : [u[0], u[1]];
  }, T.translateExtent = function(j) {
    return arguments.length ? (f[0][0] = +j[0][0], f[1][0] = +j[1][0], f[0][1] = +j[0][1], f[1][1] = +j[1][1], T) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, T.constrain = function(j) {
    return arguments.length ? (i = j, T) : i;
  }, T.duration = function(j) {
    return arguments.length ? (h = +j, T) : h;
  }, T.interpolate = function(j) {
    return arguments.length ? (p = j, T) : p;
  }, T.on = function() {
    var j = g.on.apply(g, arguments);
    return j === g ? T : j;
  }, T.clickDistance = function(j) {
    return arguments.length ? (A = (j = +j) * j, T) : Math.sqrt(A);
  }, T.tapDistance = function(j) {
    return arguments.length ? (R = +j, T) : R;
  }, T;
}
const ha = {
  error001: (t = "react") => `Seems like you have not used ${t === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${t}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (t) => `Node type "${t}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (t) => `The old edge with id=${t} does not exist.`,
  error009: (t) => `Marker type "${t}" doesn't exist.`,
  error008: (t, { id: a, sourceHandle: i, targetHandle: o }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? i : o}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (t) => `Edge type "${t}" not found. Using fallback type "default".`,
  error012: (t) => `Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (t = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (t) => `Edge with id "${t}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, So = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], e1 = ["Enter", " ", "Escape"], t1 = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: t, x: a, y: i }) => `Moved selected node ${t}. New position, x: ${a}, y: ${i}`,
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
var ir;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(ir || (ir = {}));
var ii;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(ii || (ii = {}));
var wo;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(wo || (wo = {}));
const n1 = {
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
var jl;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(jl || (jl = {}));
var Tu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Tu || (Tu = {}));
var Ce;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(Ce || (Ce = {}));
const Cy = {
  [Ce.Left]: Ce.Right,
  [Ce.Right]: Ce.Left,
  [Ce.Top]: Ce.Bottom,
  [Ce.Bottom]: Ce.Top
};
function a1(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const l1 = (t) => "id" in t && "source" in t && "target" in t, ZT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), Th = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Oo = (t, a = [0, 0]) => {
  const { width: i, height: o } = el(t), s = t.origin ?? a, u = i * s[0], f = o * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - f
  };
}, QT = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = t.reduce((o, s) => {
    const u = typeof s == "string";
    let f = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (f = u ? a.nodeLookup.get(s) : Th(s) ? s : a.nodeLookup.get(s.id));
    const h = f ? Cu(f, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Gu(o, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return qu(i);
}, jo = (t, a = {}) => {
  let i = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (i = Gu(i, Cu(s)), o = !0);
  }), o ? qu(i) : { x: 0, y: 0, width: 0, height: 0 };
}, Ch = (t, a, [i, o, s] = [0, 0, 1], u = !1, f = !1) => {
  const h = (a.x - i) / s, p = (a.y - o) / s, g = a.width / s, y = a.height / s, m = [];
  for (const v of t.values()) {
    const { measured: x, selectable: S = !0, hidden: A = !1 } = v;
    if (f && !S || A)
      continue;
    const R = x.width ?? v.width ?? v.initialWidth ?? 0, T = x.height ?? v.height ?? v.initialHeight ?? 0, { x: L, y: E } = v.internals.positionAbsolute, z = s1(h, p, g, y, L, E, R, T), Y = R * T, U = u && z > 0;
    (!v.internals.handleBounds || U || z >= Y || v.dragging) && m.push(v);
  }
  return m;
}, IT = (t, a) => {
  const i = /* @__PURE__ */ new Set();
  return t.forEach((o) => {
    i.add(o.id);
  }), a.filter((o) => i.has(o.source) || i.has(o.target));
};
function KT(t, a) {
  const i = /* @__PURE__ */ new Map(), o = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!o || o.has(s.id)) && i.set(s.id, s);
  }), i;
}
async function FT({ nodes: t, width: a, height: i, panZoom: o, minZoom: s, maxZoom: u }, f) {
  if (t.size === 0)
    return !0;
  const h = KT(t, f), p = jo(h), g = Ah(p, a, i, f?.minZoom ?? s, f?.maxZoom ?? u, f?.padding ?? 0.1);
  return await o.setViewport(g, {
    duration: f?.duration,
    ease: f?.ease,
    interpolate: f?.interpolate
  }), !0;
}
function i1({ nodeId: t, nextPosition: a, nodeLookup: i, nodeOrigin: o = [0, 0], nodeExtent: s, onError: u }) {
  const f = i.get(t), h = f.parentId ? i.get(f.parentId) : void 0, { x: p, y: g } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = f.origin ?? o;
  let m = f.extent || s;
  if (f.extent === "parent" && !f.expandParent)
    if (!h)
      u?.("005", ha.error005());
    else {
      const x = h.measured.width, S = h.measured.height;
      x && S && (m = [
        [p, g],
        [p + x, g + S]
      ]);
    }
  else h && ui(f.extent) && (m = [
    [f.extent[0][0] + p, f.extent[0][1] + g],
    [f.extent[1][0] + p, f.extent[1][1] + g]
  ]);
  const v = ui(m) ? si(a, m, f.measured) : a;
  return (f.measured.width === void 0 || f.measured.height === void 0) && u?.("015", ha.error015()), {
    position: {
      x: v.x - p + (f.measured.width ?? 0) * y[0],
      y: v.y - g + (f.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function JT({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: i, edges: o, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), f = [];
  for (const v of i) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && f.find((A) => A.id === v.parentId);
    (x || S) && f.push(v);
  }
  const h = new Set(a.map((v) => v.id)), p = o.filter((v) => v.deletable !== !1), y = IT(f, p);
  for (const v of p)
    h.has(v.id) && !y.find((S) => S.id === v.id) && y.push(v);
  if (!s)
    return {
      edges: y,
      nodes: f
    };
  const m = await s({
    nodes: f,
    edges: y
  });
  return typeof m == "boolean" ? m ? { edges: y, nodes: f } : { edges: [], nodes: [] } : m;
}
const rr = (t, a = 0, i = 1) => Math.min(Math.max(t, a), i), si = (t = { x: 0, y: 0 }, a, i) => ({
  x: rr(t.x, a[0][0], a[1][0] - (i?.width ?? 0)),
  y: rr(t.y, a[0][1], a[1][1] - (i?.height ?? 0))
});
function r1(t, a, i) {
  const { width: o, height: s } = el(i), { x: u, y: f } = i.internals.positionAbsolute;
  return si(t, [
    [u, f],
    [u + o, f + s]
  ], a);
}
const Ry = (t, a, i) => t < a ? rr(Math.abs(t - a), 1, a) / a : t > i ? -rr(Math.abs(t - i), 1, a) / a : 0, Rh = (t, a, i = 15, o = 40) => {
  const s = Ry(t.x, o, a.width - o) * i, u = Ry(t.y, o, a.height - o) * i;
  return [s, u];
}, Gu = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), Kd = ({ x: t, y: a, width: i, height: o }) => ({
  x: t,
  y: a,
  x2: t + i,
  y2: a + o
}), qu = ({ x: t, y: a, x2: i, y2: o }) => ({
  x: t,
  y: a,
  width: i - t,
  height: o - a
}), Eo = (t, a = [0, 0]) => {
  const { x: i, y: o } = Th(t) ? t.internals.positionAbsolute : Oo(t, a);
  return {
    x: i,
    y: o,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Cu = (t, a = [0, 0]) => {
  const { x: i, y: o } = Th(t) ? t.internals.positionAbsolute : Oo(t, a);
  return {
    x: i,
    y: o,
    x2: i + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: o + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, o1 = (t, a) => qu(Gu(Kd(t), Kd(a))), s1 = (t, a, i, o, s, u, f, h) => {
  const p = Math.max(0, Math.min(t + i, s + f) - Math.max(t, s)), g = Math.max(0, Math.min(a + o, u + h) - Math.max(a, u));
  return Math.ceil(p * g);
}, Ru = (t, a) => s1(t.x, t.y, t.width, t.height, a.x, a.y, a.width, a.height), Ay = (t) => fa(t.width) && fa(t.height) && fa(t.x) && fa(t.y), fa = (t) => !isNaN(t) && isFinite(t), u1 = (t, a) => (i, o) => {
}, Lo = (t, a = [1, 1]) => ({
  x: a[0] * Math.round(t.x / a[0]),
  y: a[1] * Math.round(t.y / a[1])
}), Ho = ({ x: t, y: a }, [i, o, s], u = !1, f = [1, 1]) => {
  const h = {
    x: (t - i) / s,
    y: (a - o) / s
  };
  return u ? Lo(h, f) : h;
}, or = ({ x: t, y: a }, [i, o, s]) => ({
  x: t * s + i,
  y: a * s + o
});
function Xi(t, a) {
  if (typeof t == "number")
    return Math.floor((a - a / (1 + t)) * 0.5);
  if (typeof t == "string" && t.endsWith("px")) {
    const i = parseFloat(t);
    if (!Number.isNaN(i))
      return Math.floor(i);
  }
  if (typeof t == "string" && t.endsWith("%")) {
    const i = parseFloat(t);
    if (!Number.isNaN(i))
      return Math.floor(a * i * 0.01);
  }
  return console.error(`The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function PT(t, a, i) {
  if (typeof t == "string" || typeof t == "number") {
    const o = Xi(t, i), s = Xi(t, a);
    return {
      top: o,
      right: s,
      bottom: o,
      left: s,
      x: s * 2,
      y: o * 2
    };
  }
  if (typeof t == "object") {
    const o = Xi(t.top ?? t.y ?? 0, i), s = Xi(t.bottom ?? t.y ?? 0, i), u = Xi(t.left ?? t.x ?? 0, a), f = Xi(t.right ?? t.x ?? 0, a);
    return { top: o, right: f, bottom: s, left: u, x: u + f, y: o + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function WT(t, a, i, o, s, u) {
  const { x: f, y: h } = or(t, [a, i, o]), { x: p, y: g } = or({ x: t.x + t.width, y: t.y + t.height }, [a, i, o]), y = s - p, m = u - g;
  return {
    left: Math.floor(f),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const Ah = (t, a, i, o, s, u) => {
  const f = PT(u, a, i), h = (a - f.x) / t.width, p = (i - f.y) / t.height, g = Math.min(h, p), y = rr(g, o, s), m = t.x + t.width / 2, v = t.y + t.height / 2, x = a / 2 - m * y, S = i / 2 - v * y, A = WT(t, x, S, y, a, i), R = {
    left: Math.min(A.left - f.left, 0),
    top: Math.min(A.top - f.top, 0),
    right: Math.min(A.right - f.right, 0),
    bottom: Math.min(A.bottom - f.bottom, 0)
  };
  return {
    x: x - R.left + R.right,
    y: S - R.top + R.bottom,
    zoom: y
  };
}, _o = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function ui(t) {
  return t != null && t !== "parent";
}
function el(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function c1(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function f1(t, a = { width: 0, height: 0 }, i, o, s) {
  const u = { ...t }, f = o.get(i);
  if (f) {
    const h = f.origin || s;
    u.x += f.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += f.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function Dy(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const i of t)
    if (!a.has(i))
      return !1;
  return !0;
}
function eC() {
  let t, a;
  return { promise: new Promise((o, s) => {
    t = o, a = s;
  }), resolve: t, reject: a };
}
function tC(t) {
  return { ...t1, ...t || {} };
}
function mo(t, { snapGrid: a = [0, 0], snapToGrid: i = !1, transform: o, containerBounds: s }) {
  const { x: u, y: f } = da(t), h = Ho({ x: u - (s?.left ?? 0), y: f - (s?.top ?? 0) }, o), { x: p, y: g } = i ? Lo(h, a) : h;
  return {
    xSnapped: p,
    ySnapped: g,
    ...h
  };
}
const Dh = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), d1 = (t) => t?.getRootNode?.() || window?.document, nC = ["INPUT", "SELECT", "TEXTAREA"];
function h1(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : nC.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const m1 = (t) => "clientX" in t, da = (t, a) => {
  const i = m1(t), o = i ? t.clientX : t.touches?.[0].clientX, s = i ? t.clientY : t.touches?.[0].clientY;
  return {
    x: o - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, zy = (t, a, i, o, s) => {
  const u = a.querySelectorAll(`.${t}`);
  return !u || !u.length ? null : Array.from(u).map((f) => {
    const h = f.getBoundingClientRect();
    return {
      id: f.getAttribute("data-handleid"),
      type: t,
      nodeId: s,
      position: f.getAttribute("data-handlepos"),
      x: (h.left - i.left) / o,
      y: (h.top - i.top) / o,
      ...Dh(f)
    };
  });
};
function g1({ sourceX: t, sourceY: a, targetX: i, targetY: o, sourceControlX: s, sourceControlY: u, targetControlX: f, targetControlY: h }) {
  const p = t * 0.125 + s * 0.375 + f * 0.375 + i * 0.125, g = a * 0.125 + u * 0.375 + h * 0.375 + o * 0.125, y = Math.abs(p - t), m = Math.abs(g - a);
  return [p, g, y, m];
}
function tu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function Oy({ pos: t, x1: a, y1: i, x2: o, y2: s, c: u }) {
  switch (t) {
    case Ce.Left:
      return [a - tu(a - o, u), i];
    case Ce.Right:
      return [a + tu(o - a, u), i];
    case Ce.Top:
      return [a, i - tu(i - s, u)];
    case Ce.Bottom:
      return [a, i + tu(s - i, u)];
  }
}
function p1({ sourceX: t, sourceY: a, sourcePosition: i = Ce.Bottom, targetX: o, targetY: s, targetPosition: u = Ce.Top, curvature: f = 0.25 }) {
  const [h, p] = Oy({
    pos: i,
    x1: t,
    y1: a,
    x2: o,
    y2: s,
    c: f
  }), [g, y] = Oy({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a,
    c: f
  }), [m, v, x, S] = g1({
    sourceX: t,
    sourceY: a,
    targetX: o,
    targetY: s,
    sourceControlX: h,
    sourceControlY: p,
    targetControlX: g,
    targetControlY: y
  });
  return [
    `M${t},${a} C${h},${p} ${g},${y} ${o},${s}`,
    m,
    v,
    x,
    S
  ];
}
function y1({ sourceX: t, sourceY: a, targetX: i, targetY: o }) {
  const s = Math.abs(i - t) / 2, u = i < t ? i + s : i - s, f = Math.abs(o - a) / 2, h = o < a ? o + f : o - f;
  return [u, h, s, f];
}
function aC({ sourceNode: t, targetNode: a, selected: i = !1, zIndex: o = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return o;
  const f = s && i ? o + 1e3 : o, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return f + h;
}
function lC({ sourceNode: t, targetNode: a, width: i, height: o, transform: s }) {
  const u = Gu(Cu(t), Cu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const f = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: i / s[2],
    height: o / s[2]
  };
  return Ru(f, qu(u)) > 0;
}
const iC = ({ source: t, sourceHandle: a, target: i, targetHandle: o }) => `xy-edge__${t}${a || ""}-${i}${o || ""}`, rC = (t, a) => a.some((i) => i.source === t.source && i.target === t.target && (i.sourceHandle === t.sourceHandle || !i.sourceHandle && !t.sourceHandle) && (i.targetHandle === t.targetHandle || !i.targetHandle && !t.targetHandle)), oC = (t, a, i = {}) => {
  if (!t.source || !t.target)
    return i.onError?.("006", ha.error006()), a;
  const o = i.getEdgeId || iC;
  let s;
  return l1(t) ? s = { ...t } : s = {
    ...t,
    id: o(t)
  }, rC(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function v1({ sourceX: t, sourceY: a, targetX: i, targetY: o }) {
  const [s, u, f, h] = y1({
    sourceX: t,
    sourceY: a,
    targetX: i,
    targetY: o
  });
  return [`M ${t},${a}L ${i},${o}`, s, u, f, h];
}
const jy = {
  [Ce.Left]: { x: -1, y: 0 },
  [Ce.Right]: { x: 1, y: 0 },
  [Ce.Top]: { x: 0, y: -1 },
  [Ce.Bottom]: { x: 0, y: 1 }
}, sC = ({ source: t, sourcePosition: a = Ce.Bottom, target: i }) => a === Ce.Left || a === Ce.Right ? t.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Ly = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function uC({ source: t, sourcePosition: a = Ce.Bottom, target: i, targetPosition: o = Ce.Top, center: s, offset: u, stepPosition: f }) {
  const h = jy[a], p = jy[o], g = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: i.x + p.x * u, y: i.y + p.y * u }, m = sC({
    source: g,
    sourcePosition: a,
    target: y
  }), v = m.x !== 0 ? "x" : "y", x = m[v];
  let S = [], A, R;
  const T = { x: 0, y: 0 }, L = { x: 0, y: 0 }, [, , E, z] = y1({
    sourceX: t.x,
    sourceY: t.y,
    targetX: i.x,
    targetY: i.y
  });
  if (h[v] * p[v] === -1) {
    v === "x" ? (A = s.x ?? g.x + (y.x - g.x) * f, R = s.y ?? (g.y + y.y) / 2) : (A = s.x ?? (g.x + y.x) / 2, R = s.y ?? g.y + (y.y - g.y) * f);
    const C = [
      { x: A, y: g.y },
      { x: A, y: y.y }
    ], G = [
      { x: g.x, y: R },
      { x: y.x, y: R }
    ];
    h[v] === x ? S = v === "x" ? C : G : S = v === "x" ? G : C;
  } else {
    const C = [{ x: g.x, y: y.y }], G = [{ x: y.x, y: g.y }];
    if (v === "x" ? S = h.x === x ? G : C : S = h.y === x ? C : G, a === o) {
      const j = Math.abs(t[v] - i[v]);
      if (j <= u) {
        const X = Math.min(u - 1, u - j);
        h[v] === x ? T[v] = (g[v] > t[v] ? -1 : 1) * X : L[v] = (y[v] > i[v] ? -1 : 1) * X;
      }
    }
    if (a !== o) {
      const j = v === "x" ? "y" : "x", X = h[v] === p[j], N = g[j] > y[j], O = g[j] < y[j];
      (h[v] === 1 && (!X && N || X && O) || h[v] !== 1 && (!X && O || X && N)) && (S = v === "x" ? C : G);
    }
    const P = { x: g.x + T.x, y: g.y + T.y }, I = { x: y.x + L.x, y: y.y + L.y }, J = Math.max(Math.abs(P.x - S[0].x), Math.abs(I.x - S[0].x)), oe = Math.max(Math.abs(P.y - S[0].y), Math.abs(I.y - S[0].y));
    J >= oe ? (A = (P.x + I.x) / 2, R = S[0].y) : (A = S[0].x, R = (P.y + I.y) / 2);
  }
  const Y = { x: g.x + T.x, y: g.y + T.y }, U = { x: y.x + L.x, y: y.y + L.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...Y.x !== S[0].x || Y.y !== S[0].y ? [Y] : [],
    ...S,
    ...U.x !== S[S.length - 1].x || U.y !== S[S.length - 1].y ? [U] : [],
    i
  ], A, R, E, z];
}
function cC(t, a, i, o) {
  const s = Math.min(Ly(t, a) / 2, Ly(a, i) / 2, o), { x: u, y: f } = a;
  if (t.x === u && u === i.x || t.y === f && f === i.y)
    return `L${u} ${f}`;
  if (t.y === f) {
    const g = t.x < i.x ? -1 : 1, y = t.y < i.y ? 1 : -1;
    return `L ${u + s * g},${f}Q ${u},${f} ${u},${f + s * y}`;
  }
  const h = t.x < i.x ? 1 : -1, p = t.y < i.y ? -1 : 1;
  return `L ${u},${f + s * p}Q ${u},${f} ${u + s * h},${f}`;
}
function Fd({ sourceX: t, sourceY: a, sourcePosition: i = Ce.Bottom, targetX: o, targetY: s, targetPosition: u = Ce.Top, borderRadius: f = 5, centerX: h, centerY: p, offset: g = 20, stepPosition: y = 0.5 }) {
  const [m, v, x, S, A] = uC({
    source: { x: t, y: a },
    sourcePosition: i,
    target: { x: o, y: s },
    targetPosition: u,
    center: { x: h, y: p },
    offset: g,
    stepPosition: y
  });
  let R = `M${m[0].x} ${m[0].y}`;
  for (let T = 1; T < m.length - 1; T++)
    R += cC(m[T - 1], m[T], m[T + 1], f);
  return R += `L${m[m.length - 1].x} ${m[m.length - 1].y}`, [R, v, x, S, A];
}
function Hy(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function fC(t) {
  const { sourceNode: a, targetNode: i } = t;
  if (!Hy(a) || !Hy(i))
    return null;
  const o = a.internals.handleBounds || By(a.handles), s = i.internals.handleBounds || By(i.handles), u = Uy(o?.source ?? [], t.sourceHandle), f = Uy(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === ir.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !f)
    return t.onError?.("008", ha.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const h = u?.position || Ce.Bottom, p = f?.position || Ce.Top, g = ci(a, u, h), y = ci(i, f, p);
  return {
    sourceX: g.x,
    sourceY: g.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: p
  };
}
function By(t) {
  if (!t)
    return null;
  const a = [], i = [];
  for (const o of t)
    o.width = o.width ?? 1, o.height = o.height ?? 1, o.type === "source" ? a.push(o) : o.type === "target" && i.push(o);
  return {
    source: a,
    target: i
  };
}
function ci(t, a, i = Ce.Left, o = !1) {
  const s = (a?.x ?? 0) + t.internals.positionAbsolute.x, u = (a?.y ?? 0) + t.internals.positionAbsolute.y, { width: f, height: h } = a ?? el(t);
  if (o)
    return { x: s + f / 2, y: u + h / 2 };
  switch (a?.position ?? i) {
    case Ce.Top:
      return { x: s + f / 2, y: u };
    case Ce.Right:
      return { x: s + f, y: u + h / 2 };
    case Ce.Bottom:
      return { x: s + f / 2, y: u + h };
    case Ce.Left:
      return { x: s, y: u + h / 2 };
  }
}
function Uy(t, a) {
  return t && (a ? t.find((i) => i.id === a) : t[0]) || null;
}
function Jd(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((o) => `${o}=${t[o]}`).join("&")}` : "";
}
function dC(t, { id: a, defaultColor: i, defaultMarkerStart: o, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((f, h) => ([h.markerStart || o, h.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const g = Jd(p, a);
      u.has(g) || (f.push({ id: g, color: p.color || i, ...p }), u.add(g));
    }
  }), f), []).sort((f, h) => f.id.localeCompare(h.id));
}
const b1 = 1e3, hC = 10, zh = {
  nodeOrigin: [0, 0],
  nodeExtent: So,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, mC = {
  ...zh,
  checkEquality: !0
};
function Oh(t, a) {
  const i = { ...t };
  for (const o in a)
    a[o] !== void 0 && (i[o] = a[o]);
  return i;
}
function gC(t, a, i) {
  const o = Oh(zh, i);
  for (const s of t.values())
    if (s.parentId)
      Lh(s, t, a, o);
    else {
      const u = Oo(s, o.nodeOrigin), f = ui(s.extent) ? s.extent : o.nodeExtent, h = si(u, f, el(s));
      s.internals.positionAbsolute = h;
    }
}
function pC(t, a) {
  if (!t.handles)
    return t.measured ? a?.internals.handleBounds : void 0;
  const i = [], o = [];
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
    s.type === "source" ? i.push(u) : s.type === "target" && o.push(u);
  }
  return {
    source: i,
    target: o
  };
}
function jh(t) {
  return t === "manual";
}
function Pd(t, a, i, o = {}) {
  const s = Oh(mC, o), u = { i: 0 }, f = new Map(a), h = s?.elevateNodesOnSelect && !jh(s.zIndexMode) ? b1 : 0;
  let p = t.length > 0, g = !1;
  a.clear(), i.clear();
  for (const y of t) {
    let m = f.get(y.id);
    if (s.checkEquality && y === m?.internals.userNode)
      a.set(y.id, m);
    else {
      const v = Oo(y, s.nodeOrigin), x = ui(y.extent) ? y.extent : s.nodeExtent, S = si(v, x, el(y));
      m = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: S,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: pC(y, m),
          z: x1(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, m);
    }
    (m.measured === void 0 || m.measured.width === void 0 || m.measured.height === void 0) && !m.hidden && (p = !1), y.parentId && Lh(m, a, i, o, u), g ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: g };
}
function yC(t, a) {
  if (!t.parentId)
    return;
  const i = a.get(t.parentId);
  i ? i.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function Lh(t, a, i, o, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: f, nodeExtent: h, zIndexMode: p } = Oh(zh, o), g = t.parentId, y = a.get(g);
  if (!y) {
    console.warn(`Parent node ${g} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  yC(t, i), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * hC), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = u && !jh(p) ? b1 : 0, { x: v, y: x, z: S } = vC(t, y, f, h, m, p), { positionAbsolute: A } = t.internals, R = v !== A.x || x !== A.y;
  (R || S !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: R ? { x: v, y: x } : A,
      z: S
    }
  });
}
function x1(t, a, i) {
  const o = fa(t.zIndex) ? t.zIndex : 0;
  return jh(i) ? o : o + (t.selected ? a : 0);
}
function vC(t, a, i, o, s, u) {
  const { x: f, y: h } = a.internals.positionAbsolute, p = el(t), g = Oo(t, i), y = ui(t.extent) ? si(g, t.extent, p) : g;
  let m = si({ x: f + y.x, y: h + y.y }, o, p);
  t.extent === "parent" && (m = r1(m, p, a));
  const v = x1(t, s, u), x = a.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: x >= v ? x + 1 : v
  };
}
function Hh(t, a, i, o = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const f of t) {
    const h = a.get(f.parentId);
    if (!h)
      continue;
    const p = u.get(f.parentId)?.expandedRect ?? Eo(h), g = o1(p, f.rect);
    u.set(f.parentId, { expandedRect: g, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: f, parent: h }, p) => {
    const g = h.internals.positionAbsolute, y = el(h), m = h.origin ?? o, v = f.x < g.x ? Math.round(Math.abs(g.x - f.x)) : 0, x = f.y < g.y ? Math.round(Math.abs(g.y - f.y)) : 0, S = Math.max(y.width, Math.round(f.width)), A = Math.max(y.height, Math.round(f.height)), R = (S - y.width) * m[0], T = (A - y.height) * m[1];
    (v > 0 || x > 0 || R || T) && (s.push({
      id: p,
      type: "position",
      position: {
        x: h.position.x - v + R,
        y: h.position.y - x + T
      }
    }), i.get(p)?.forEach((L) => {
      t.some((E) => E.id === L.id) || s.push({
        id: L.id,
        type: "position",
        position: {
          x: L.position.x + v,
          y: L.position.y + x
        }
      });
    })), (y.width < f.width || y.height < f.height || v || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? m[0] * v - R : 0),
        height: A + (x ? m[1] * x - T : 0)
      }
    });
  }), s;
}
function bC(t, a, i, o, s, u, f) {
  const h = o?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!h)
    return { changes: [], updatedInternals: p };
  const g = [], y = window.getComputedStyle(h), { m22: m } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const x of t.values()) {
    const S = a.get(x.id);
    if (!S)
      continue;
    if (S.hidden) {
      a.set(S.id, {
        ...S,
        internals: {
          ...S.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const A = Dh(x.nodeElement), R = S.measured.width !== A.width || S.measured.height !== A.height;
    if (!!(A.width && A.height && (R || !S.internals.handleBounds || x.force))) {
      const L = x.nodeElement.getBoundingClientRect(), E = ui(S.extent) ? S.extent : u;
      let { positionAbsolute: z } = S.internals;
      S.parentId && S.extent === "parent" ? z = r1(z, A, a.get(S.parentId)) : E && (z = si(z, E, A));
      const Y = {
        ...S,
        measured: A,
        internals: {
          ...S.internals,
          positionAbsolute: z,
          handleBounds: {
            source: zy("source", x.nodeElement, L, m, S.id),
            target: zy("target", x.nodeElement, L, m, S.id)
          }
        }
      };
      a.set(S.id, Y), S.parentId && Lh(Y, a, i, { nodeOrigin: s, zIndexMode: f }), p = !0, R && (g.push({
        id: S.id,
        type: "dimensions",
        dimensions: A
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: Eo(Y, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Hh(v, a, i, s);
    g.push(...x);
  }
  return { changes: g, updatedInternals: p };
}
async function xC({ delta: t, panZoom: a, transform: i, translateExtent: o, width: s, height: u }) {
  if (!a || !t.x && !t.y)
    return !1;
  const f = await a.setViewportConstrained({
    x: i[0] + t.x,
    y: i[1] + t.y,
    zoom: i[2]
  }, [
    [0, 0],
    [s, u]
  ], o);
  return !!f && (f.x !== i[0] || f.y !== i[1] || f.k !== i[2]);
}
function ky(t, a, i, o, s, u) {
  let f = s;
  const h = o.get(f) || /* @__PURE__ */ new Map();
  o.set(f, h.set(i, a)), f = `${s}-${t}`;
  const p = o.get(f) || /* @__PURE__ */ new Map();
  if (o.set(f, p.set(i, a)), u) {
    f = `${s}-${t}-${u}`;
    const g = o.get(f) || /* @__PURE__ */ new Map();
    o.set(f, g.set(i, a));
  }
}
function S1(t, a, i) {
  t.clear(), a.clear();
  for (const o of i) {
    const { source: s, target: u, sourceHandle: f = null, targetHandle: h = null } = o, p = { edgeId: o.id, source: s, target: u, sourceHandle: f, targetHandle: h }, g = `${s}-${f}--${u}-${h}`, y = `${u}-${h}--${s}-${f}`;
    ky("source", p, y, t, s, f), ky("target", p, g, t, u, h), a.set(o.id, o);
  }
}
function w1(t, a) {
  if (!t.parentId)
    return !1;
  const i = a.get(t.parentId);
  return i ? i.selected ? !0 : w1(i, a) : !1;
}
function Vy(t, a, i) {
  let o = t;
  do {
    if (o?.matches?.(a))
      return !0;
    if (o === i)
      return !1;
    o = o?.parentElement;
  } while (o);
  return !1;
}
function SC(t, a, i, o) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, f] of t)
    if ((f.selected || f.id === o) && (!f.parentId || !w1(f, t)) && (f.draggable || a && typeof f.draggable > "u")) {
      const h = t.get(u);
      h && s.set(u, {
        id: u,
        position: h.position || { x: 0, y: 0 },
        distance: {
          x: i.x - h.internals.positionAbsolute.x,
          y: i.y - h.internals.positionAbsolute.y
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
function yd({ nodeId: t, dragItems: a, nodeLookup: i, dragging: o = !0 }) {
  const s = [];
  for (const [f, h] of a) {
    const p = i.get(f)?.internals.userNode;
    p && s.push({
      ...p,
      position: h.position,
      dragging: o
    });
  }
  if (!t)
    return [s[0], s];
  const u = i.get(t)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(t)?.position || u.position,
      dragging: o
    } : s[0],
    s
  ];
}
function wC({ dragItems: t, snapGrid: a, x: i, y: o }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: i - s.distance.x,
    y: o - s.distance.y
  }, f = Lo(u, a);
  return {
    x: f.x - u.x,
    y: f.y - u.y
  };
}
function EC({ onNodeMouseDown: t, getStoreItems: a, onDragStart: i, onDrag: o, onDragStop: s }) {
  let u = { x: null, y: null }, f = 0, h = /* @__PURE__ */ new Map(), p = !1, g = { x: 0, y: 0 }, y = null, m = !1, v = null, x = !1, S = !1, A = null;
  function R({ noDragClassName: L, handleSelector: E, domNode: z, isSelectable: Y, nodeId: U, nodeClickDistance: V = 0 }) {
    v = Bn(z);
    function C({ x: J, y: oe }) {
      const { nodeLookup: j, nodeExtent: X, snapGrid: N, snapToGrid: O, nodeOrigin: Q, onNodeDrag: $, onSelectionDrag: le, onError: D, updateNodePositions: k } = a();
      u = { x: J, y: oe };
      let K = !1;
      const ae = h.size > 1, se = ae && X ? Kd(jo(h)) : null, me = ae && O ? wC({
        dragItems: h,
        snapGrid: N,
        x: J,
        y: oe
      }) : null;
      for (const [ge, ee] of h) {
        if (!j.has(ge))
          continue;
        let pe = { x: J - ee.distance.x, y: oe - ee.distance.y };
        O && (pe = me ? {
          x: Math.round(pe.x + me.x),
          y: Math.round(pe.y + me.y)
        } : Lo(pe, N));
        let ze = null;
        if (ae && X && !ee.extent && se) {
          const { positionAbsolute: Se } = ee.internals, De = Se.x - se.x + X[0][0], qe = Se.x + ee.measured.width - se.x2 + X[1][0], nt = Se.y - se.y + X[0][1], it = Se.y + ee.measured.height - se.y2 + X[1][1];
          ze = [
            [De, nt],
            [qe, it]
          ];
        }
        const { position: Ae, positionAbsolute: we } = i1({
          nodeId: ge,
          nextPosition: pe,
          nodeLookup: j,
          nodeExtent: ze || X,
          nodeOrigin: Q,
          onError: D
        });
        K = K || ee.position.x !== Ae.x || ee.position.y !== Ae.y, ee.position = Ae, ee.internals.positionAbsolute = we;
      }
      if (S = S || K, !!K && (k(h, !0), A && (o || $ || !U && le))) {
        const [ge, ee] = yd({
          nodeId: U,
          dragItems: h,
          nodeLookup: j
        });
        o?.(A, h, ge, ee), $?.(A, ge, ee), U || le?.(A, ee);
      }
    }
    async function G() {
      if (!y)
        return;
      const { transform: J, panBy: oe, autoPanSpeed: j, autoPanOnNodeDrag: X } = a();
      if (!X) {
        p = !1, cancelAnimationFrame(f);
        return;
      }
      const [N, O] = Rh(g, y, j);
      (N !== 0 || O !== 0) && (u.x = (u.x ?? 0) - N / J[2], u.y = (u.y ?? 0) - O / J[2], await oe({ x: N, y: O }) && C(u)), f = requestAnimationFrame(G);
    }
    function P(J) {
      const { nodeLookup: oe, multiSelectionActive: j, nodesDraggable: X, transform: N, snapGrid: O, snapToGrid: Q, selectNodesOnDrag: $, onNodeDragStart: le, onSelectionDragStart: D, unselectNodesAndEdges: k } = a();
      m = !0, (!$ || !Y) && !j && U && (oe.get(U)?.selected || k()), Y && $ && U && t?.(U);
      const K = mo(J.sourceEvent, { transform: N, snapGrid: O, snapToGrid: Q, containerBounds: y });
      if (u = K, h = SC(oe, X, K, U), h.size > 0 && (i || le || !U && D)) {
        const [ae, se] = yd({
          nodeId: U,
          dragItems: h,
          nodeLookup: oe
        });
        i?.(J.sourceEvent, h, ae, se), le?.(J.sourceEvent, ae, se), U || D?.(J.sourceEvent, se);
      }
    }
    const I = Ub().clickDistance(V).on("start", (J) => {
      const { domNode: oe, nodeDragThreshold: j, transform: X, snapGrid: N, snapToGrid: O } = a();
      y = oe?.getBoundingClientRect() || null, x = !1, S = !1, A = J.sourceEvent, j === 0 && P(J), u = mo(J.sourceEvent, { transform: X, snapGrid: N, snapToGrid: O, containerBounds: y }), g = da(J.sourceEvent, y);
    }).on("drag", (J) => {
      const { autoPanOnNodeDrag: oe, transform: j, snapGrid: X, snapToGrid: N, nodeDragThreshold: O, nodeLookup: Q } = a(), $ = mo(J.sourceEvent, { transform: j, snapGrid: X, snapToGrid: N, containerBounds: y });
      if (A = J.sourceEvent, (J.sourceEvent.type === "touchmove" && J.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      U && !Q.has(U)) && (x = !0), !x) {
        if (!p && oe && m && (p = !0, G()), !m) {
          const le = da(J.sourceEvent, y), D = le.x - g.x, k = le.y - g.y;
          Math.sqrt(D * D + k * k) > O && P(J);
        }
        (u.x !== $.xSnapped || u.y !== $.ySnapped) && h && m && (g = da(J.sourceEvent, y), C($));
      }
    }).on("end", (J) => {
      if (!m || x) {
        x && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (p = !1, m = !1, cancelAnimationFrame(f), h.size > 0) {
        const { nodeLookup: oe, updateNodePositions: j, onNodeDragStop: X, onSelectionDragStop: N } = a();
        if (S && (j(h, !1), S = !1), s || X || !U && N) {
          const [O, Q] = yd({
            nodeId: U,
            dragItems: h,
            nodeLookup: oe,
            dragging: !1
          });
          s?.(J.sourceEvent, h, O, Q), X?.(J.sourceEvent, O, Q), U || N?.(J.sourceEvent, Q);
        }
      }
    }).filter((J) => {
      const oe = J.target;
      return !J.button && (!L || !Vy(oe, `.${L}`, z)) && (!E || Vy(oe, E, z));
    });
    v.call(I);
  }
  function T() {
    v?.on(".drag", null);
  }
  return {
    update: R,
    destroy: T
  };
}
function _C(t, a, i) {
  const o = [], s = {
    x: t.x - i,
    y: t.y - i,
    width: i * 2,
    height: i * 2
  };
  for (const u of a.values())
    Ru(s, Eo(u)) > 0 && o.push(u);
  return o;
}
const NC = 250;
function MC(t, a, i, o) {
  let s = [], u = 1 / 0;
  const f = _C(t, i, a + NC);
  for (const h of f) {
    const p = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const g of p) {
      if (o.nodeId === g.nodeId && o.type === g.type && o.id === g.id)
        continue;
      const { x: y, y: m } = ci(h, g, g.position, !0), v = Math.sqrt(Math.pow(y - t.x, 2) + Math.pow(m - t.y, 2));
      v > a || (v < u ? (s = [{ ...g, x: y, y: m }], u = v) : v === u && s.push({ ...g, x: y, y: m }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const h = o.type === "source" ? "target" : "source";
    return s.find((p) => p.type === h) ?? s[0];
  }
  return s[0];
}
function E1(t, a, i, o, s, u = !1) {
  const f = o.get(t);
  if (!f)
    return null;
  const h = s === "strict" ? f.internals.handleBounds?.[a] : [...f.internals.handleBounds?.source ?? [], ...f.internals.handleBounds?.target ?? []], p = (i ? h?.find((g) => g.id === i) : h?.[0]) ?? null;
  return p && u ? { ...p, ...ci(f, p, p.position, !0) } : p;
}
function _1(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function TC(t, a) {
  let i = null;
  return a ? i = !0 : t && !a && (i = !1), i;
}
const N1 = () => !0;
function CC(t, { connectionMode: a, connectionRadius: i, handleId: o, nodeId: s, edgeUpdaterType: u, isTarget: f, domNode: h, nodeLookup: p, lib: g, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: A, onConnectEnd: R, isValidConnection: T = N1, onReconnectEnd: L, updateConnection: E, getTransform: z, getFromHandle: Y, autoPanSpeed: U, dragThreshold: V = 1, handleDomNode: C }) {
  const G = d1(t.target);
  let P = 0, I;
  const { x: J, y: oe } = da(t), j = _1(u, C), X = h?.getBoundingClientRect();
  let N = !1;
  if (!X || !j)
    return;
  const O = E1(s, j, o, p, a);
  if (!O)
    return;
  let Q = da(t, X), $ = !1, le = null, D = !1, k = null;
  function K() {
    if (!y || !X)
      return;
    const [Ae, we] = Rh(Q, X, U);
    v({ x: Ae, y: we }), P = requestAnimationFrame(K);
  }
  const ae = {
    ...O,
    nodeId: s,
    type: j,
    position: O.position
  }, se = p.get(s);
  let ge = {
    inProgress: !0,
    isValid: null,
    from: ci(se, ae, Ce.Left, !0),
    fromHandle: ae,
    fromPosition: ae.position,
    fromNode: se,
    to: Q,
    toHandle: null,
    toPosition: Cy[ae.position],
    toNode: null,
    pointer: Q
  };
  function ee() {
    N = !0, E(ge), S?.(t, { nodeId: s, handleId: o, handleType: j });
  }
  V === 0 && ee();
  function pe(Ae) {
    if (!N) {
      const { x: it, y: Ft } = da(Ae), pt = it - J, Gt = Ft - oe;
      if (!(pt * pt + Gt * Gt > V * V))
        return;
      ee();
    }
    if (!Y() || !ae) {
      ze(Ae);
      return;
    }
    const we = z();
    Q = da(Ae, X), I = MC(Ho(Q, we, !1, [1, 1]), i, p, ae), $ || (K(), $ = !0);
    const Se = M1(Ae, {
      handle: I,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: o,
      fromType: f ? "target" : "source",
      isValidConnection: T,
      doc: G,
      lib: g,
      flowId: m,
      nodeLookup: p
    });
    k = Se.handleDomNode, le = Se.connection, D = TC(!!I, Se.isValid);
    const De = p.get(s), qe = De ? ci(De, ae, Ce.Left, !0) : ge.from, nt = {
      ...ge,
      from: qe,
      isValid: D,
      to: Se.toHandle && D ? or({ x: Se.toHandle.x, y: Se.toHandle.y }, we) : Q,
      toHandle: Se.toHandle,
      toPosition: D && Se.toHandle ? Se.toHandle.position : Cy[ae.position],
      toNode: Se.toHandle ? p.get(Se.toHandle.nodeId) : null,
      pointer: Q
    };
    E(nt), ge = nt;
  }
  function ze(Ae) {
    if (!("touches" in Ae && Ae.touches.length > 0)) {
      if (N) {
        (I || k) && le && D && A?.(le);
        const { inProgress: we, ...Se } = ge, De = {
          ...Se,
          toPosition: ge.toHandle ? ge.toPosition : null
        };
        R?.(Ae, De), u && L?.(Ae, De);
      }
      x(), cancelAnimationFrame(P), $ = !1, D = !1, le = null, k = null, G.removeEventListener("mousemove", pe), G.removeEventListener("mouseup", ze), G.removeEventListener("touchmove", pe), G.removeEventListener("touchend", ze);
    }
  }
  G.addEventListener("mousemove", pe), G.addEventListener("mouseup", ze), G.addEventListener("touchmove", pe), G.addEventListener("touchend", ze);
}
function M1(t, { handle: a, connectionMode: i, fromNodeId: o, fromHandleId: s, fromType: u, doc: f, lib: h, flowId: p, isValidConnection: g = N1, nodeLookup: y }) {
  const m = u === "target", v = a ? f.querySelector(`.${h}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = da(t), A = f.elementFromPoint(x, S), R = A?.classList.contains(`${h}-flow__handle`) ? A : v, T = {
    handleDomNode: R,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (R) {
    const L = _1(void 0, R), E = R.getAttribute("data-nodeid"), z = R.getAttribute("data-handleid"), Y = R.classList.contains("connectable"), U = R.classList.contains("connectableend");
    if (!E || !L)
      return T;
    const V = {
      source: m ? E : o,
      sourceHandle: m ? z : s,
      target: m ? o : E,
      targetHandle: m ? s : z
    };
    T.connection = V;
    const G = Y && U && (i === ir.Strict ? m && L === "source" || !m && L === "target" : E !== o || z !== s);
    T.isValid = G && g(V), T.toHandle = E1(E, L, z, y, i, !0);
  }
  return T;
}
const Wd = {
  onPointerDown: CC,
  isValid: M1
};
function RC({ domNode: t, panZoom: a, getTransform: i, getViewScale: o }) {
  const s = Bn(t);
  function u({ translateExtent: h, width: p, height: g, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const z = i(), Y = E.sourceEvent.ctrlKey && _o() ? 10 : 1, U = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = z[2] * Math.pow(2, U * Y);
      a.scaleTo(V);
    };
    let A = [0, 0];
    const R = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (A = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, T = (E) => {
      const z = i();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const Y = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], U = [Y[0] - A[0], Y[1] - A[1]];
      A = Y;
      const V = o() * Math.max(z[2], Math.log(z[2])) * (x ? -1 : 1), C = {
        x: z[0] - U[0] * V,
        y: z[1] - U[1] * V
      }, G = [
        [0, 0],
        [p, g]
      ];
      a.setViewportConstrained({
        x: C.x,
        y: C.y,
        zoom: z[2]
      }, G, h);
    }, L = Wb().on("start", R).on("zoom", m ? T : null).on("zoom.wheel", v ? S : null);
    s.call(L, {});
  }
  function f() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: f,
    pointer: ua
  };
}
const $u = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), vd = ({ x: t, y: a, zoom: i }) => Yu.translate(t, a).scale(i), Fi = (t, a) => t.target.closest(`.${a}`), T1 = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), AC = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, bd = (t, a = 0, i = AC, o = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || o(), s ? t.transition().duration(a).ease(i).on("end", o) : t;
}, C1 = (t) => {
  const a = t.ctrlKey && _o() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function DC({ zoomPanValues: t, noWheelClassName: a, d3Selection: i, d3Zoom: o, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: f, onPanZoomStart: h, onPanZoom: p, onPanZoomEnd: g }) {
  return (y) => {
    if (Fi(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = i.property("__zoom").k || 1;
    if (y.ctrlKey && f) {
      const R = ua(y), T = C1(y), L = m * Math.pow(2, T);
      o.scaleTo(i, L, R, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === ii.Vertical ? 0 : y.deltaX * v, S = s === ii.Horizontal ? 0 : y.deltaY * v;
    !_o() && y.shiftKey && s !== ii.Vertical && (x = y.deltaY * v, S = 0), o.translateBy(
      i,
      -(x / m) * u,
      -(S / m) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const A = $u(i.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (p?.(y, A), t.panScrollTimeout = setTimeout(() => {
      g?.(y, A), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, A));
  };
}
function zC({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: i }) {
  return function(o, s) {
    const u = o.type === "wheel", f = !a && u && !o.ctrlKey, h = Fi(o, t);
    if (o.ctrlKey && u && h && o.preventDefault(), f || h)
      return null;
    o.preventDefault(), i.call(this, o, s);
  };
}
function OC({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: i }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const s = $u(o.transform);
    t.mouseButton = o.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, o.sourceEvent?.type === "mousedown" && a(!0), i && i?.(o.sourceEvent, s);
  };
}
function jC({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: i, onTransformChange: o, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(i && T1(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || o([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, $u(u.transform));
  };
}
function LC({ zoomPanValues: t, panOnDrag: a, panOnScroll: i, onDraggingChange: o, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (f) => {
    if (!f.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && T1(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && f.sourceEvent && u(f.sourceEvent), t.usedRightMouseButton = !1, o(!1), s)) {
      const h = $u(f.transform);
      t.prevViewport = h, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(f.sourceEvent, h);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        i ? 150 : 0
      );
    }
  };
}
function HC({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: i, panOnDrag: o, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: f, noWheelClassName: h, noPanClassName: p, lib: g, connectionInProgress: y }) {
  return (m) => {
    const v = t || a, x = i && m.ctrlKey, S = m.type === "wheel";
    if (m.button === 1 && m.type === "mousedown" && (Fi(m, `${g}-flow__node`) || Fi(m, `${g}-flow__edge`)))
      return !0;
    if (!o && !v && !s && !u && !i || f || y && !S || Fi(m, h) && S || Fi(m, p) && (!S || s && S && !t) || !i && m.ctrlKey && S)
      return !1;
    if (!i && m.type === "touchstart" && m.touches?.length > 1)
      return m.preventDefault(), !1;
    if (!v && !s && !x && S || !o && (m.type === "mousedown" || m.type === "touchstart") || Array.isArray(o) && !o.includes(m.button) && m.type === "mousedown")
      return !1;
    const A = Array.isArray(o) && o.includes(m.button) || !m.button || m.button <= 1;
    return (!m.ctrlKey || S) && A;
  };
}
function BC({ domNode: t, minZoom: a, maxZoom: i, translateExtent: o, viewport: s, onPanZoom: u, onPanZoomStart: f, onPanZoomEnd: h, onDraggingChange: p }) {
  const g = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), m = Wb().scaleExtent([a, i]).translateExtent(o), v = Bn(t).call(m);
  L({
    x: s.x,
    y: s.y,
    zoom: rr(s.zoom, a, i)
  }, [
    [0, 0],
    [y.width, y.height]
  ], o);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  m.wheelDelta(C1);
  async function A(I, J) {
    return v ? new Promise((oe) => {
      m?.interpolate(J?.interpolate === "linear" ? ho : du).transform(bd(v, J?.duration, J?.ease, () => oe(!0)), I);
    }) : !1;
  }
  function R({ noWheelClassName: I, noPanClassName: J, onPaneContextMenu: oe, userSelectionActive: j, panOnScroll: X, panOnDrag: N, panOnScrollMode: O, panOnScrollSpeed: Q, preventScrolling: $, zoomOnPinch: le, zoomOnScroll: D, zoomOnDoubleClick: k, zoomActivationKeyPressed: K, lib: ae, onTransformChange: se, connectionInProgress: me, paneClickDistance: ge, selectionOnDrag: ee }) {
    j && !g.isZoomingOrPanning && T();
    const pe = X && !K && !j;
    m.clickDistance(ee ? 1 / 0 : !fa(ge) || ge < 0 ? 0 : ge);
    const ze = pe ? DC({
      zoomPanValues: g,
      noWheelClassName: I,
      d3Selection: v,
      d3Zoom: m,
      panOnScrollMode: O,
      panOnScrollSpeed: Q,
      zoomOnPinch: le,
      onPanZoomStart: f,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : zC({
      noWheelClassName: I,
      preventScrolling: $,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Ae = OC({
      zoomPanValues: g,
      onDraggingChange: p,
      onPanZoomStart: f
    });
    m.on("start", Ae);
    const we = jC({
      zoomPanValues: g,
      panOnDrag: N,
      onPaneContextMenu: !!oe,
      onPanZoom: u,
      onTransformChange: se
    });
    m.on("zoom", we);
    const Se = LC({
      zoomPanValues: g,
      panOnDrag: N,
      panOnScroll: X,
      onPaneContextMenu: oe,
      onPanZoomEnd: h,
      onDraggingChange: p
    });
    m.on("end", Se);
    const De = HC({
      zoomActivationKeyPressed: K,
      panOnDrag: N,
      zoomOnScroll: D,
      panOnScroll: X,
      zoomOnDoubleClick: k,
      zoomOnPinch: le,
      userSelectionActive: j,
      noPanClassName: J,
      noWheelClassName: I,
      lib: ae,
      connectionInProgress: me
    });
    m.filter(De), k ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function T() {
    m.on("zoom", null);
  }
  async function L(I, J, oe) {
    const j = vd(I), X = m?.constrain()(j, J, oe);
    return X && await A(X), X;
  }
  async function E(I, J) {
    const oe = vd(I);
    return await A(oe, J), oe;
  }
  function z(I) {
    if (v) {
      const J = vd(I), oe = v.property("__zoom");
      (oe.k !== I.zoom || oe.x !== I.x || oe.y !== I.y) && m?.transform(v, J, null, { sync: !0 });
    }
  }
  function Y() {
    const I = v ? Pb(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: I.x, y: I.y, zoom: I.k };
  }
  async function U(I, J) {
    return v ? new Promise((oe) => {
      m?.interpolate(J?.interpolate === "linear" ? ho : du).scaleTo(bd(v, J?.duration, J?.ease, () => oe(!0)), I);
    }) : !1;
  }
  async function V(I, J) {
    return v ? new Promise((oe) => {
      m?.interpolate(J?.interpolate === "linear" ? ho : du).scaleBy(bd(v, J?.duration, J?.ease, () => oe(!0)), I);
    }) : !1;
  }
  function C(I) {
    m?.scaleExtent(I);
  }
  function G(I) {
    m?.translateExtent(I);
  }
  function P(I) {
    const J = !fa(I) || I < 0 ? 0 : I;
    m?.clickDistance(J);
  }
  return {
    update: R,
    destroy: T,
    setViewport: E,
    setViewportConstrained: L,
    getViewport: Y,
    scaleTo: U,
    scaleBy: V,
    setScaleExtent: C,
    setTranslateExtent: G,
    syncViewport: z,
    setClickDistance: P
  };
}
var sr;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(sr || (sr = {}));
function UC({ width: t, prevWidth: a, height: i, prevHeight: o, affectsX: s, affectsY: u }) {
  const f = t - a, h = i - o, p = [f > 0 ? 1 : f < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return f && s && (p[0] = p[0] * -1), h && u && (p[1] = p[1] * -1), p;
}
function Yy(t) {
  const a = t.includes("right") || t.includes("left"), i = t.includes("bottom") || t.includes("top"), o = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: a,
    isVertical: i,
    affectsX: o,
    affectsY: s
  };
}
function Al(t, a) {
  return Math.max(0, a - t);
}
function Dl(t, a) {
  return Math.max(0, t - a);
}
function nu(t, a, i) {
  return Math.max(0, a - t, t - i);
}
function Gy(t, a) {
  return t ? !a : a;
}
function kC(t, a, i, o, s, u, f, h) {
  let { affectsX: p, affectsY: g } = a;
  const { isHorizontal: y, isVertical: m } = a, v = y && m, { xSnapped: x, ySnapped: S } = i, { minWidth: A, maxWidth: R, minHeight: T, maxHeight: L } = o, { x: E, y: z, width: Y, height: U, aspectRatio: V } = t;
  let C = Math.floor(y ? x - t.pointerX : 0), G = Math.floor(m ? S - t.pointerY : 0);
  const P = Y + (p ? -C : C), I = U + (g ? -G : G), J = -u[0] * Y, oe = -u[1] * U;
  let j = nu(P, A, R), X = nu(I, T, L);
  if (f) {
    let Q = 0, $ = 0;
    p && C < 0 ? Q = Al(E + C + J, f[0][0]) : !p && C > 0 && (Q = Dl(E + P + J, f[1][0])), g && G < 0 ? $ = Al(z + G + oe, f[0][1]) : !g && G > 0 && ($ = Dl(z + I + oe, f[1][1])), j = Math.max(j, Q), X = Math.max(X, $);
  }
  if (h) {
    let Q = 0, $ = 0;
    p && C > 0 ? Q = Dl(E + C, h[0][0]) : !p && C < 0 && (Q = Al(E + P, h[1][0])), g && G > 0 ? $ = Dl(z + G, h[0][1]) : !g && G < 0 && ($ = Al(z + I, h[1][1])), j = Math.max(j, Q), X = Math.max(X, $);
  }
  if (s) {
    if (y) {
      const Q = nu(P / V, T, L) * V;
      if (j = Math.max(j, Q), f) {
        let $ = 0;
        !p && !g || p && !g && v ? $ = Dl(z + oe + P / V, f[1][1]) * V : $ = Al(z + oe + (p ? C : -C) / V, f[0][1]) * V, j = Math.max(j, $);
      }
      if (h) {
        let $ = 0;
        !p && !g || p && !g && v ? $ = Al(z + P / V, h[1][1]) * V : $ = Dl(z + (p ? C : -C) / V, h[0][1]) * V, j = Math.max(j, $);
      }
    }
    if (m) {
      const Q = nu(I * V, A, R) / V;
      if (X = Math.max(X, Q), f) {
        let $ = 0;
        !p && !g || g && !p && v ? $ = Dl(E + I * V + J, f[1][0]) / V : $ = Al(E + (g ? G : -G) * V + J, f[0][0]) / V, X = Math.max(X, $);
      }
      if (h) {
        let $ = 0;
        !p && !g || g && !p && v ? $ = Al(E + I * V, h[1][0]) / V : $ = Dl(E + (g ? G : -G) * V, h[0][0]) / V, X = Math.max(X, $);
      }
    }
  }
  G = G + (G < 0 ? X : -X), C = C + (C < 0 ? j : -j), s && (v ? P > I * V ? G = (Gy(p, g) ? -C : C) / V : C = (Gy(p, g) ? -G : G) * V : y ? (G = C / V, g = p) : (C = G * V, p = g));
  const N = p ? E + C : E, O = g ? z + G : z;
  return {
    width: Y + (p ? -C : C),
    height: U + (g ? -G : G),
    x: u[0] * C * (p ? -1 : 1) + N,
    y: u[1] * G * (g ? -1 : 1) + O
  };
}
const R1 = { width: 0, height: 0, x: 0, y: 0 }, VC = {
  ...R1,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function YC(t, a, i) {
  const o = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, f = t.measured.height ?? 0, h = i[0] * u, p = i[1] * f;
  return [
    [o - h, s - p],
    [o + u - h, s + f - p]
  ];
}
function GC({ domNode: t, nodeId: a, getStoreItems: i, onChange: o, onEnd: s }) {
  const u = Bn(t);
  let f = {
    controlDirection: Yy("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: g, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: A, shouldResize: R }) {
    let T = { ...R1 }, L = { ...VC };
    f = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: Yy(g)
    };
    let E, z = null, Y = [], U, V, C, G = !1;
    const P = Ub().on("start", (I) => {
      const { nodeLookup: J, transform: oe, snapGrid: j, snapToGrid: X, nodeOrigin: N, paneDomNode: O } = i();
      if (E = J.get(a), !E)
        return;
      z = O?.getBoundingClientRect() ?? null;
      const { xSnapped: Q, ySnapped: $ } = mo(I.sourceEvent, {
        transform: oe,
        snapGrid: j,
        snapToGrid: X,
        containerBounds: z
      });
      T = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, L = {
        ...T,
        pointerX: Q,
        pointerY: $,
        aspectRatio: T.width / T.height
      }, U = void 0, V = ui(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (U = J.get(E.parentId)), U && E.extent === "parent" && (V = [
        [0, 0],
        [U.measured.width, U.measured.height]
      ]), Y = [], C = void 0;
      for (const [le, D] of J)
        if (D.parentId === a && (Y.push({
          id: le,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const k = YC(D, E, D.origin ?? N);
          C ? C = [
            [Math.min(k[0][0], C[0][0]), Math.min(k[0][1], C[0][1])],
            [Math.max(k[1][0], C[1][0]), Math.max(k[1][1], C[1][1])]
          ] : C = k;
        }
      x?.(I, { ...T });
    }).on("drag", (I) => {
      const { transform: J, snapGrid: oe, snapToGrid: j, nodeOrigin: X } = i(), N = mo(I.sourceEvent, {
        transform: J,
        snapGrid: oe,
        snapToGrid: j,
        containerBounds: z
      }), O = [];
      if (!E)
        return;
      const { x: Q, y: $, width: le, height: D } = T, k = {}, K = E.origin ?? X, { width: ae, height: se, x: me, y: ge } = kC(L, f.controlDirection, N, f.boundaries, f.keepAspectRatio, K, V, C), ee = ae !== le, pe = se !== D, ze = me !== Q && ee, Ae = ge !== $ && pe;
      if (!ze && !Ae && !ee && !pe)
        return;
      if ((ze || Ae || K[0] === 1 || K[1] === 1) && (k.x = ze ? me : T.x, k.y = Ae ? ge : T.y, T.x = k.x, T.y = k.y, Y.length > 0)) {
        const qe = me - Q, nt = ge - $;
        for (const it of Y)
          it.position = {
            x: it.position.x - qe + K[0] * (ae - le),
            y: it.position.y - nt + K[1] * (se - D)
          }, O.push(it);
      }
      if ((ee || pe) && (k.width = ee && (!f.resizeDirection || f.resizeDirection === "horizontal") ? ae : T.width, k.height = pe && (!f.resizeDirection || f.resizeDirection === "vertical") ? se : T.height, T.width = k.width, T.height = k.height), U && E.expandParent) {
        const qe = K[0] * (k.width ?? 0);
        k.x && k.x < qe && (T.x = qe, L.x = L.x - (k.x - qe));
        const nt = K[1] * (k.height ?? 0);
        k.y && k.y < nt && (T.y = nt, L.y = L.y - (k.y - nt));
      }
      const we = UC({
        width: T.width,
        prevWidth: le,
        height: T.height,
        prevHeight: D,
        affectsX: f.controlDirection.affectsX,
        affectsY: f.controlDirection.affectsY
      }), Se = { ...T, direction: we };
      R?.(I, Se) !== !1 && (G = !0, S?.(I, Se), o(k, O));
    }).on("end", (I) => {
      G && (A?.(I, { ...T }), s?.({ ...T }), G = !1);
    });
    u.call(P);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: h,
    destroy: p
  };
}
var xd = { exports: {} }, Sd = {}, wd = { exports: {} }, Ed = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qy;
function qC() {
  if (qy) return Ed;
  qy = 1;
  var t = Mo();
  function a(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var i = typeof Object.is == "function" ? Object.is : a, o = t.useState, s = t.useEffect, u = t.useLayoutEffect, f = t.useDebugValue;
  function h(m, v) {
    var x = v(), S = o({ inst: { value: x, getSnapshot: v } }), A = S[0].inst, R = S[1];
    return u(
      function() {
        A.value = x, A.getSnapshot = v, p(A) && R({ inst: A });
      },
      [m, x, v]
    ), s(
      function() {
        return p(A) && R({ inst: A }), m(function() {
          p(A) && R({ inst: A });
        });
      },
      [m]
    ), f(x), x;
  }
  function p(m) {
    var v = m.getSnapshot;
    m = m.value;
    try {
      var x = v();
      return !i(m, x);
    } catch {
      return !0;
    }
  }
  function g(m, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : h;
  return Ed.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y, Ed;
}
var $y;
function $C() {
  return $y || ($y = 1, wd.exports = qC()), wd.exports;
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
var Xy;
function XC() {
  if (Xy) return Sd;
  Xy = 1;
  var t = Mo(), a = $C();
  function i(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var o = typeof Object.is == "function" ? Object.is : i, s = a.useSyncExternalStore, u = t.useRef, f = t.useEffect, h = t.useMemo, p = t.useDebugValue;
  return Sd.useSyncExternalStoreWithSelector = function(g, y, m, v, x) {
    var S = u(null);
    if (S.current === null) {
      var A = { hasValue: !1, value: null };
      S.current = A;
    } else A = S.current;
    S = h(
      function() {
        function T(U) {
          if (!L) {
            if (L = !0, E = U, U = v(U), x !== void 0 && A.hasValue) {
              var V = A.value;
              if (x(V, U))
                return z = V;
            }
            return z = U;
          }
          if (V = z, o(E, U)) return V;
          var C = v(U);
          return x !== void 0 && x(V, C) ? (E = U, V) : (E = U, z = C);
        }
        var L = !1, E, z, Y = m === void 0 ? null : m;
        return [
          function() {
            return T(y());
          },
          Y === null ? void 0 : function() {
            return T(Y());
          }
        ];
      },
      [y, m, v, x]
    );
    var R = s(g, S[0], S[1]);
    return f(
      function() {
        A.hasValue = !0, A.value = R;
      },
      [R]
    ), p(R), R;
  }, Sd;
}
var Zy;
function ZC() {
  return Zy || (Zy = 1, xd.exports = XC()), xd.exports;
}
var QC = ZC();
const IC = /* @__PURE__ */ ih(QC), KC = {}, Qy = (t) => {
  let a;
  const i = /* @__PURE__ */ new Set(), o = (y, m) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), i.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: o, getState: s, getInitialState: () => g, subscribe: (y) => (i.add(y), () => i.delete(y)), destroy: () => {
    (KC ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), i.clear();
  } }, g = a = t(o, s, p);
  return p;
}, FC = (t) => t ? Qy(t) : Qy, { useDebugValue: JC } = ye, { useSyncExternalStoreWithSelector: PC } = IC, WC = (t) => t;
function A1(t, a = WC, i) {
  const o = PC(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    i
  );
  return JC(o), o;
}
const Iy = (t, a) => {
  const i = FC(t), o = (s, u = a) => A1(i, s, u);
  return Object.assign(o, i), o;
}, eR = (t, a) => t ? Iy(t, a) : Iy;
function St(t, a) {
  if (Object.is(t, a))
    return !0;
  if (typeof t != "object" || t === null || typeof a != "object" || a === null)
    return !1;
  if (t instanceof Map && a instanceof Map) {
    if (t.size !== a.size) return !1;
    for (const [o, s] of t)
      if (!Object.is(s, a.get(o)))
        return !1;
    return !0;
  }
  if (t instanceof Set && a instanceof Set) {
    if (t.size !== a.size) return !1;
    for (const o of t)
      if (!a.has(o))
        return !1;
    return !0;
  }
  const i = Object.keys(t);
  if (i.length !== Object.keys(a).length)
    return !1;
  for (const o of i)
    if (!Object.prototype.hasOwnProperty.call(a, o) || !Object.is(t[o], a[o]))
      return !1;
  return !0;
}
var tR = Gv();
const nR = /* @__PURE__ */ ih(tR), Xu = M.createContext(null), aR = Xu.Provider, D1 = ha.error001("react");
function Pe(t, a) {
  const i = M.useContext(Xu);
  if (i === null)
    throw new Error(D1);
  return A1(i, t, a);
}
function wt() {
  const t = M.useContext(Xu);
  if (t === null)
    throw new Error(D1);
  return M.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const Ky = { display: "none" }, lR = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, z1 = "react-flow__node-desc", O1 = "react-flow__edge-desc", iR = "react-flow__aria-live", rR = (t) => t.ariaLiveMessage, oR = (t) => t.ariaLabelConfig;
function sR({ rfId: t }) {
  const a = Pe(rR);
  return w.jsx("div", { id: `${iR}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: lR, children: a });
}
function uR({ rfId: t, disableKeyboardA11y: a }) {
  const i = Pe(oR);
  return w.jsxs(w.Fragment, { children: [w.jsx("div", { id: `${z1}-${t}`, style: Ky, children: a ? i["node.a11yDescription.default"] : i["node.a11yDescription.keyboardDisabled"] }), w.jsx("div", { id: `${O1}-${t}`, style: Ky, children: i["edge.a11yDescription.default"] }), !a && w.jsx(sR, { rfId: t })] });
}
const Zu = M.forwardRef(({ position: t = "top-left", children: a, className: i, style: o, ...s }, u) => {
  const f = `${t}`.split("-");
  return w.jsx("div", { className: Yt(["react-flow__panel", i, ...f]), style: o, ref: u, ...s, children: a });
});
Zu.displayName = "Panel";
const Fy = "https://reactflow.dev?utm_source=attribution";
function cR({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : w.jsx(Zu, { position: a, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${Fy}`, children: w.jsx("a", { href: Fy, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const fR = (t) => {
  const a = [], i = [];
  for (const [, o] of t.nodeLookup)
    o.selected && a.push(o.internals.userNode);
  for (const [, o] of t.edgeLookup)
    o.selected && i.push(o);
  return { selectedNodes: a, selectedEdges: i };
}, au = (t) => t.id;
function dR(t, a) {
  return St(t.selectedNodes.map(au), a.selectedNodes.map(au)) && St(t.selectedEdges.map(au), a.selectedEdges.map(au));
}
function hR({ onSelectionChange: t }) {
  const a = wt(), { selectedNodes: i, selectedEdges: o } = Pe(fR, dR);
  return M.useEffect(() => {
    const s = { nodes: i, edges: o };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [i, o, t]), null;
}
const mR = (t) => !!t.onSelectionChangeHandlers;
function gR({ onSelectionChange: t }) {
  const a = Pe(mR);
  return t || a ? w.jsx(hR, { onSelectionChange: t }) : null;
}
const j1 = [0, 0], pR = { x: 0, y: 0, zoom: 1 }, yR = [
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
], Jy = [...yR, "rfId"], vR = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), Py = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: So,
  nodeOrigin: j1,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function bR(t) {
  const { setNodes: a, setEdges: i, setMinZoom: o, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: f, reset: h, setDefaultNodesAndEdges: p } = Pe(vR, St), g = wt();
  M.useEffect(() => (p(t.defaultNodes, t.defaultEdges), () => {
    y.current = Py, h();
  }), []);
  const y = M.useRef(Py);
  return M.useEffect(
    () => {
      for (const m of Jy) {
        const v = t[m], x = y.current[m];
        v !== x && (typeof t[m] > "u" || (m === "nodes" ? a(v) : m === "edges" ? i(v) : m === "minZoom" ? o(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? u(v) : m === "nodeExtent" ? f(v) : m === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: tC(v) }) : m === "fitView" ? g.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? g.setState({ fitViewOptions: v }) : g.setState({ [m]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    Jy.map((m) => t[m])
  ), null;
}
function Wy() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function xR(t) {
  const [a, i] = M.useState(t === "system" ? null : t);
  return M.useEffect(() => {
    if (t !== "system") {
      i(t);
      return;
    }
    const o = Wy(), s = () => i(o?.matches ? "dark" : "light");
    return s(), o?.addEventListener("change", s), () => {
      o?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : Wy()?.matches ? "dark" : "light";
}
const ev = typeof document < "u" ? document : null;
function No(t = null, a = { target: ev, actInsideInputWithModifier: !0 }) {
  const [i, o] = M.useState(!1), s = M.useRef(!1), u = M.useRef(/* @__PURE__ */ new Set([])), [f, h] = M.useMemo(() => {
    if (t !== null) {
      const g = (Array.isArray(t) ? t : [t]).filter((m) => typeof m == "string").map((m) => m.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = g.reduce((m, v) => m.concat(...v), []);
      return [g, y];
    }
    return [[], []];
  }, [t]);
  return M.useEffect(() => {
    const p = a?.target ?? ev, g = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !g) && h1(x))
          return !1;
        const A = nv(x.code, h);
        if (u.current.add(x[A]), tv(f, u.current, !1)) {
          const R = x.composedPath?.()?.[0] || x.target, T = R?.nodeName === "BUTTON" || R?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !T) && x.preventDefault(), o(!0);
        }
      }, m = (x) => {
        const S = nv(x.code, h);
        tv(f, u.current, !0) ? (o(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), o(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, o]), i;
}
function tv(t, a, i) {
  return t.filter((o) => i || o.length === a.size).some((o) => o.every((s) => a.has(s)));
}
function nv(t, a) {
  return a.includes(t) ? "code" : "key";
}
const SR = () => {
  const t = wt();
  return M.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: i } = t.getState();
      return i ? i.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: i } = t.getState();
      return i ? i.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, i) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleTo(a, i) : !1;
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (a, i) => {
      const { transform: [o, s, u], panZoom: f } = t.getState();
      return f ? (await f.setViewport({
        x: a.x ?? o,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, i), !0) : !1;
    },
    getViewport: () => {
      const [a, i, o] = t.getState().transform;
      return { x: a, y: i, zoom: o };
    },
    setCenter: async (a, i, o) => t.getState().setCenter(a, i, o),
    fitBounds: async (a, i) => {
      const { width: o, height: s, minZoom: u, maxZoom: f, panZoom: h } = t.getState(), p = Ah(a, o, s, u, f, i?.padding ?? 0.1);
      return h ? (await h.setViewport(p, {
        duration: i?.duration,
        ease: i?.ease,
        interpolate: i?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, i = {}) => {
      const { transform: o, snapGrid: s, snapToGrid: u, domNode: f } = t.getState();
      if (!f)
        return a;
      const { x: h, y: p } = f.getBoundingClientRect(), g = {
        x: a.x - h,
        y: a.y - p
      }, y = i.snapGrid ?? s, m = i.snapToGrid ?? u;
      return Ho(g, o, m, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: i, domNode: o } = t.getState();
      if (!o)
        return a;
      const { x: s, y: u } = o.getBoundingClientRect(), f = or(a, i);
      return {
        x: f.x + s,
        y: f.y + u
      };
    }
  }), []);
};
function L1(t, a) {
  const i = [], o = /* @__PURE__ */ new Map(), s = [];
  for (const u of t)
    if (u.type === "add") {
      s.push(u);
      continue;
    } else if (u.type === "remove" || u.type === "replace")
      o.set(u.id, [u]);
    else {
      const f = o.get(u.id);
      f ? f.push(u) : o.set(u.id, [u]);
    }
  for (const u of a) {
    const f = o.get(u.id);
    if (!f) {
      i.push(u);
      continue;
    }
    if (f[0].type === "remove")
      continue;
    if (f[0].type === "replace") {
      i.push({ ...f[0].item });
      continue;
    }
    const h = { ...u };
    for (const p of f)
      wR(p, h);
    i.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? i.splice(u.index, 0, { ...u.item }) : i.push({ ...u.item });
  }), i;
}
function wR(t, a) {
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
function ER(t, a) {
  return L1(t, a);
}
function _R(t, a) {
  return L1(t, a);
}
function ti(t, a) {
  return {
    id: t,
    type: "select",
    selected: a
  };
}
function Ji(t, a = /* @__PURE__ */ new Set(), i = !1) {
  const o = [];
  for (const [s, u] of t) {
    const f = a.has(s);
    !(u.selected === void 0 && !f) && u.selected !== f && (i && (u.selected = f), o.push(ti(u.id, f)));
  }
  return o;
}
function av({ items: t = [], lookup: a }) {
  const i = [], o = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const f = a.get(u.id), h = f?.internals?.userNode ?? f;
    h !== void 0 && h !== u && i.push({ id: u.id, item: u, type: "replace" }), h === void 0 && i.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    o.get(s) === void 0 && i.push({ id: s, type: "remove" });
  return i;
}
function lv(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const NR = u1();
function MR(t, a, i = {}) {
  return oC(t, a, {
    ...i,
    onError: i.onError ?? NR
  });
}
const iv = (t) => ZT(t), TR = (t) => l1(t);
function H1(t) {
  return M.forwardRef(t);
}
const CR = typeof window < "u" ? M.useLayoutEffect : M.useEffect;
function rv(t) {
  const [a, i] = M.useState(BigInt(0)), [o] = M.useState(() => RR(() => i((s) => s + BigInt(1))));
  return CR(() => {
    const s = o.get();
    s.length && (t(s), o.reset());
  }, [a]), o;
}
function RR(t) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (i) => {
      a.push(i), t();
    }
  };
}
const B1 = M.createContext(null);
function AR({ children: t }) {
  const a = wt(), i = M.useCallback((h) => {
    const { nodes: p = [], setNodes: g, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let A = p;
    for (const T of h)
      A = typeof T == "function" ? T(A) : T;
    let R = av({
      items: A,
      lookup: v
    });
    for (const T of S.values())
      R = T(R);
    y && g(A), R.length > 0 ? m?.(R) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: T, nodes: L, setNodes: E } = a.getState();
      T && E(L);
    });
  }, []), o = rv(i), s = M.useCallback((h) => {
    const { edges: p = [], setEdges: g, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? g(x) : m && m(av({
      items: x,
      lookup: v
    }));
  }, []), u = rv(s), f = M.useMemo(() => ({ nodeQueue: o, edgeQueue: u }), []);
  return w.jsx(B1.Provider, { value: f, children: t });
}
function DR() {
  const t = M.useContext(B1);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const zR = (t) => !!t.panZoom;
function Bh() {
  const t = SR(), a = wt(), i = DR(), o = Pe(zR), s = M.useMemo(() => {
    const u = (m) => a.getState().nodeLookup.get(m), f = (m) => {
      i.nodeQueue.push(m);
    }, h = (m) => {
      i.edgeQueue.push(m);
    }, p = (m) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = iv(m) ? m : v.get(m.id), A = S.parentId ? f1(S.position, S.measured, S.parentId, v, x) : S.position, R = {
        ...S,
        position: A,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return Eo(R);
    }, g = (m, v, x = { replace: !1 }) => {
      f((S) => S.map((A) => {
        if (A.id === m) {
          const R = typeof v == "function" ? v(A) : v;
          return x.replace && iv(R) ? R : { ...A, ...R };
        }
        return A;
      }));
    }, y = (m, v, x = { replace: !1 }) => {
      h((S) => S.map((A) => {
        if (A.id === m) {
          const R = typeof v == "function" ? v(A) : v;
          return x.replace && TR(R) ? R : { ...A, ...R };
        }
        return A;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((m) => ({ ...m })),
      getNode: (m) => u(m)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: m = [] } = a.getState();
        return m.map((v) => ({ ...v }));
      },
      getEdge: (m) => a.getState().edgeLookup.get(m),
      setNodes: f,
      setEdges: h,
      addNodes: (m) => {
        const v = Array.isArray(m) ? m : [m];
        i.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (m) => {
        const v = Array.isArray(m) ? m : [m];
        i.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: m = [], edges: v = [], transform: x } = a.getState(), [S, A, R] = x;
        return {
          nodes: m.map((T) => ({ ...T })),
          edges: v.map((T) => ({ ...T })),
          viewport: {
            x: S,
            y: A,
            zoom: R
          }
        };
      },
      deleteElements: async ({ nodes: m = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: A, onEdgesDelete: R, triggerNodeChanges: T, triggerEdgeChanges: L, onDelete: E, onBeforeDelete: z } = a.getState(), { nodes: Y, edges: U } = await JT({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: z
        }), V = U.length > 0, C = Y.length > 0;
        if (V) {
          const G = U.map(lv);
          R?.(U), L(G);
        }
        if (C) {
          const G = Y.map(lv);
          A?.(Y), T(G);
        }
        return (C || V) && E?.({ nodes: Y, edges: U }), { deletedNodes: Y, deletedEdges: U };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (m, v = !0, x) => {
        const S = Ay(m), A = S ? m : p(m), R = x !== void 0;
        return A ? (x || a.getState().nodes).filter((T) => {
          const L = a.getState().nodeLookup.get(T.id);
          if (L && !S && (T.id === m.id || !L.internals.positionAbsolute))
            return !1;
          const E = Eo(R ? T : L), z = Ru(E, A);
          return v && z > 0 || z >= E.width * E.height || z >= A.width * A.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, x = !0) => {
        const A = Ay(m) ? m : p(m);
        if (!A)
          return !1;
        const R = Ru(A, v);
        return x && R > 0 || R >= v.width * v.height || R >= A.width * A.height;
      },
      updateNode: g,
      updateNodeData: (m, v, x = { replace: !1 }) => {
        g(m, (S) => {
          const A = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: A } : { ...S, data: { ...S.data, ...A } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (m, v, x = { replace: !1 }) => {
        y(m, (S) => {
          const A = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: A } : { ...S, data: { ...S.data, ...A } };
        }, x);
      },
      getNodesBounds: (m) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return QT(m, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = a.getState().fitViewResolver ?? eC();
        return a.setState({ fitViewQueued: !0, fitViewOptions: m, fitViewResolver: v }), i.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return M.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: o
  }), [o]);
}
const ov = (t) => t.selected, OR = typeof window < "u" ? window : void 0;
function jR({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const i = wt(), { deleteElements: o } = Bh(), s = No(t, { actInsideInputWithModifier: !1 }), u = No(a, { target: OR });
  M.useEffect(() => {
    if (s) {
      const { edges: f, nodes: h } = i.getState();
      o({ nodes: h.filter(ov), edges: f.filter(ov) }), i.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), M.useEffect(() => {
    i.setState({ multiSelectionActive: u });
  }, [u]);
}
function LR(t) {
  const a = wt();
  M.useEffect(() => {
    const i = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Dh(t.current);
      (o.height === 0 || o.width === 0) && a.getState().onError?.("004", ha.error004()), a.setState({ width: o.width || 500, height: o.height || 500 });
    };
    if (t.current) {
      i(), window.addEventListener("resize", i);
      const o = new ResizeObserver(() => i());
      return o.observe(t.current), () => {
        window.removeEventListener("resize", i), o && t.current && o.unobserve(t.current);
      };
    }
  }, []);
}
const Qu = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, HR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function BR({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: i = !0, panOnScroll: o = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = ii.Free, zoomOnDoubleClick: f = !0, panOnDrag: h = !0, defaultViewport: p, translateExtent: g, minZoom: y, maxZoom: m, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: A, noPanClassName: R, onViewportChange: T, isControlledViewport: L, paneClickDistance: E, selectionOnDrag: z }) {
  const Y = wt(), U = M.useRef(null), { userSelectionActive: V, lib: C, connectionInProgress: G } = Pe(HR, St), P = No(v), I = M.useRef();
  LR(U);
  const J = M.useCallback((oe) => {
    T?.({ x: oe[0], y: oe[1], zoom: oe[2] }), L || Y.setState({ transform: oe });
  }, [T, L]);
  return M.useEffect(() => {
    if (U.current) {
      I.current = BC({
        domNode: U.current,
        minZoom: y,
        maxZoom: m,
        translateExtent: g,
        viewport: p,
        onDraggingChange: (N) => Y.setState((O) => O.paneDragging === N ? O : { paneDragging: N }),
        onPanZoomStart: (N, O) => {
          const { onViewportChangeStart: Q, onMoveStart: $ } = Y.getState();
          $?.(N, O), Q?.(O);
        },
        onPanZoom: (N, O) => {
          const { onViewportChange: Q, onMove: $ } = Y.getState();
          $?.(N, O), Q?.(O);
        },
        onPanZoomEnd: (N, O) => {
          const { onViewportChangeEnd: Q, onMoveEnd: $ } = Y.getState();
          $?.(N, O), Q?.(O);
        }
      });
      const { x: oe, y: j, zoom: X } = I.current.getViewport();
      return Y.setState({
        panZoom: I.current,
        transform: [oe, j, X],
        domNode: U.current.closest(".react-flow")
      }), () => {
        I.current?.destroy();
      };
    }
  }, []), M.useEffect(() => {
    I.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: a,
      zoomOnPinch: i,
      panOnScroll: o,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: f,
      panOnDrag: h,
      zoomActivationKeyPressed: P,
      preventScrolling: x,
      noPanClassName: R,
      userSelectionActive: V,
      noWheelClassName: A,
      lib: C,
      onTransformChange: J,
      connectionInProgress: G,
      selectionOnDrag: z,
      paneClickDistance: E
    });
  }, [
    t,
    a,
    i,
    o,
    s,
    u,
    f,
    h,
    P,
    x,
    R,
    V,
    A,
    C,
    J,
    G,
    z,
    E
  ]), w.jsx("div", { className: "react-flow__renderer", ref: U, style: Qu, children: S });
}
const UR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function kR() {
  const { userSelectionActive: t, userSelectionRect: a } = Pe(UR, St);
  return t && a ? w.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const _d = (t, a) => (i) => {
  i.target === a.current && t?.(i);
}, VR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function YR({ isSelecting: t, selectionKeyPressed: a, selectionMode: i = wo.Full, panOnDrag: o, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: f, onSelectionStart: h, onSelectionEnd: p, onPaneClick: g, onPaneContextMenu: y, onPaneScroll: m, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: A }) {
  const R = M.useRef(0), T = wt(), { userSelectionActive: L, elementsSelectable: E, dragging: z, panBy: Y, autoPanSpeed: U } = Pe(VR, St), V = E && (t || L), C = M.useRef(null), G = M.useRef(), P = M.useRef(/* @__PURE__ */ new Set()), I = M.useRef(/* @__PURE__ */ new Set()), J = M.useRef(!1), oe = M.useRef(!1), j = M.useRef({ x: 0, y: 0 }), X = M.useRef(!1), N = (ee) => {
    if (oe.current || J.current || T.getState().connection.inProgress) {
      oe.current = !1, J.current = !1;
      return;
    }
    g?.(ee), T.getState().resetSelectedElements(), T.setState({ nodesSelectionActive: !1 });
  }, O = (ee) => {
    if (Array.isArray(o) && o?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, Q = m ? (ee) => m(ee) : void 0, $ = (ee) => {
    oe.current && (ee.stopPropagation(), oe.current = !1);
  }, le = (ee) => {
    const { domNode: pe, transform: ze } = T.getState();
    if (G.current = pe?.getBoundingClientRect(), !G.current)
      return;
    const Ae = ee.target === C.current;
    if (!Ae && !!ee.target.closest(".nokey") || !t || !(f && Ae || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), oe.current = !1;
    const { x: De, y: qe } = da(ee.nativeEvent, G.current), nt = Ho({ x: De, y: qe }, ze);
    T.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: nt.x,
        startY: nt.y,
        x: De,
        y: qe
      }
    }), Ae || (ee.stopPropagation(), ee.preventDefault());
  };
  function D(ee, pe) {
    const { userSelectionRect: ze } = T.getState();
    if (!ze)
      return;
    const { transform: Ae, nodeLookup: we, edgeLookup: Se, connectionLookup: De, triggerNodeChanges: qe, triggerEdgeChanges: nt, defaultEdgeOptions: it } = T.getState(), Ft = { x: ze.startX, y: ze.startY }, { x: pt, y: Gt } = or(Ft, Ae), Jt = {
      startX: Ft.x,
      startY: Ft.y,
      x: ee < pt ? ee : pt,
      y: pe < Gt ? pe : Gt,
      width: Math.abs(ee - pt),
      height: Math.abs(pe - Gt)
    }, Et = P.current, Qt = I.current;
    P.current = new Set(Ch(we, Jt, Ae, i === wo.Partial, !0).map((_t) => _t.id)), I.current = /* @__PURE__ */ new Set();
    const yt = it?.selectable ?? !0;
    for (const _t of P.current) {
      const Nt = De.get(_t);
      if (Nt)
        for (const { edgeId: Pt } of Nt.values()) {
          const qt = Se.get(Pt);
          qt && (qt.selectable ?? yt) && I.current.add(Pt);
        }
    }
    if (!Dy(Et, P.current)) {
      const _t = Ji(we, P.current, !0);
      qe(_t);
    }
    if (!Dy(Qt, I.current)) {
      const _t = Ji(Se, I.current);
      nt(_t);
    }
    T.setState({
      userSelectionRect: Jt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function k() {
    if (!s || !G.current)
      return;
    const [ee, pe] = Rh(j.current, G.current, U);
    Y({ x: ee, y: pe }).then((ze) => {
      if (!oe.current || !ze) {
        R.current = requestAnimationFrame(k);
        return;
      }
      const { x: Ae, y: we } = j.current;
      D(Ae, we), R.current = requestAnimationFrame(k);
    });
  }
  const K = () => {
    cancelAnimationFrame(R.current), R.current = 0, X.current = !1;
  };
  M.useEffect(() => () => K(), []);
  const ae = (ee) => {
    const { userSelectionRect: pe, transform: ze, resetSelectedElements: Ae } = T.getState();
    if (!G.current || !pe)
      return;
    const { x: we, y: Se } = da(ee.nativeEvent, G.current);
    j.current = { x: we, y: Se };
    const De = or({ x: pe.startX, y: pe.startY }, ze);
    if (!oe.current) {
      const qe = a ? 0 : u;
      if (Math.hypot(we - De.x, Se - De.y) <= qe)
        return;
      Ae(), h?.(ee);
    }
    oe.current = !0, X.current || (k(), X.current = !0), D(we, Se);
  }, se = (ee) => {
    if (!V) {
      ee.target === C.current && T.getState().connection.inProgress && (J.current = !0);
      return;
    }
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !L && ee.target === C.current && T.getState().userSelectionRect && N?.(ee), T.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), oe.current && (p?.(ee), T.setState({
      nodesSelectionActive: P.current.size > 0
    })), K());
  }, me = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), K();
  }, ge = o === !0 || Array.isArray(o) && o.includes(0);
  return w.jsxs("div", { className: Yt(["react-flow__pane", { draggable: ge, dragging: z, selection: t }]), onClick: V ? void 0 : _d(N, C), onContextMenu: _d(O, C), onWheel: _d(Q, C), onPointerEnter: V ? void 0 : v, onPointerMove: V ? ae : x, onPointerUp: se, onPointerCancel: V ? me : void 0, onPointerDownCapture: V ? le : void 0, onClickCapture: V ? $ : void 0, onPointerLeave: S, ref: C, style: Qu, children: [A, w.jsx(kR, {})] });
}
function eh({ id: t, store: a, unselect: i = !1, nodeRef: o }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: f, nodeLookup: h, onError: p } = a.getState(), g = h.get(t);
  if (!g) {
    p?.("012", ha.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), g.selected ? (i || g.selected && f) && (u({ nodes: [g], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : s([t]);
}
function U1({ nodeRef: t, disabled: a = !1, noDragClassName: i, handleSelector: o, nodeId: s, isSelectable: u, nodeClickDistance: f }) {
  const h = wt(), [p, g] = M.useState(!1), y = M.useRef();
  return M.useEffect(() => {
    y.current = EC({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (m) => {
        eh({
          id: m,
          store: h,
          nodeRef: t
        });
      },
      onDragStart: () => {
        g(!0);
      },
      onDragStop: () => {
        g(!1);
      }
    });
  }, []), M.useEffect(() => {
    if (!(a || !t.current || !y.current))
      return y.current.update({
        noDragClassName: i,
        handleSelector: o,
        domNode: t.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: f
      }), () => {
        y.current?.destroy();
      };
  }, [i, o, a, u, t, s, f]), p;
}
const GR = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function k1() {
  const t = wt();
  return M.useCallback((i) => {
    const { nodeExtent: o, snapToGrid: s, snapGrid: u, nodesDraggable: f, onError: h, updateNodePositions: p, nodeLookup: g, nodeOrigin: y } = t.getState(), m = /* @__PURE__ */ new Map(), v = GR(f), x = s ? u[0] : 5, S = s ? u[1] : 5, A = i.direction.x * x * i.factor, R = i.direction.y * S * i.factor;
    for (const [, T] of g) {
      if (!v(T))
        continue;
      let L = {
        x: T.internals.positionAbsolute.x + A,
        y: T.internals.positionAbsolute.y + R
      };
      s && (L = Lo(L, u));
      const { position: E, positionAbsolute: z } = i1({
        nodeId: T.id,
        nextPosition: L,
        nodeLookup: g,
        nodeExtent: o,
        nodeOrigin: y,
        onError: h
      });
      T.position = E, T.internals.positionAbsolute = z, m.set(T.id, T);
    }
    p(m);
  }, []);
}
const Uh = M.createContext(null), qR = Uh.Provider;
Uh.Consumer;
const V1 = () => M.useContext(Uh), $R = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), Y1 = M.createContext(null);
function XR({ children: t }) {
  const a = Pe($R, St);
  return w.jsx(Y1.Provider, { value: a, children: t });
}
function ZR() {
  const t = M.useContext(Y1);
  if (!t)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return t;
}
const QR = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, IR = (t, a, i) => (o) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: f } = o, { fromHandle: h, toHandle: p, isValid: g } = f;
  if (!h && !s)
    return QR;
  const y = p?.nodeId === t && p?.id === a && p?.type === i;
  return {
    connectingFrom: h?.nodeId === t && h?.id === a && h?.type === i,
    connectingTo: y,
    clickConnecting: s?.nodeId === t && s?.id === a && s?.type === i,
    isPossibleEndHandle: u === ir.Strict ? h?.type !== i : t !== h?.nodeId || a !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && g
  };
};
function KR({ type: t = "source", position: a = Ce.Top, isValidConnection: i, isConnectable: o = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: f, onConnect: h, children: p, className: g, onMouseDown: y, onTouchStart: m, ...v }, x) {
  const S = f || null, A = t === "target", R = wt(), T = V1(), { connectOnClick: L, noPanClassName: E, rfId: z } = ZR(), { connectingFrom: Y, connectingTo: U, clickConnecting: V, isPossibleEndHandle: C, connectionInProcess: G, clickConnectionInProcess: P, valid: I } = Pe(IR(T, S, t), St);
  T || R.getState().onError?.("010", ha.error010());
  const J = (X) => {
    const { defaultEdgeOptions: N, onConnect: O, hasDefaultEdges: Q } = R.getState(), $ = {
      ...N,
      ...X
    };
    if (Q) {
      const { edges: le, setEdges: D, onError: k } = R.getState();
      D(MR($, le, { onError: k }));
    }
    O?.($), h?.($);
  }, oe = (X) => {
    if (!T)
      return;
    const N = m1(X.nativeEvent);
    if (s && (N && X.button === 0 || !N)) {
      const O = R.getState();
      Wd.onPointerDown(X.nativeEvent, {
        handleDomNode: X.currentTarget,
        autoPanOnConnect: O.autoPanOnConnect,
        connectionMode: O.connectionMode,
        connectionRadius: O.connectionRadius,
        domNode: O.domNode,
        nodeLookup: O.nodeLookup,
        lib: O.lib,
        isTarget: A,
        handleId: S,
        nodeId: T,
        flowId: O.rfId,
        panBy: O.panBy,
        cancelConnection: O.cancelConnection,
        onConnectStart: O.onConnectStart,
        onConnectEnd: (...Q) => R.getState().onConnectEnd?.(...Q),
        updateConnection: O.updateConnection,
        onConnect: J,
        isValidConnection: i || ((...Q) => R.getState().isValidConnection?.(...Q) ?? !0),
        getTransform: () => R.getState().transform,
        getFromHandle: () => R.getState().connection.fromHandle,
        autoPanSpeed: O.autoPanSpeed,
        dragThreshold: O.connectionDragThreshold
      });
    }
    N ? y?.(X) : m?.(X);
  }, j = (X) => {
    const { onClickConnectStart: N, onClickConnectEnd: O, connectionClickStartHandle: Q, connectionMode: $, isValidConnection: le, lib: D, rfId: k, nodeLookup: K, connection: ae } = R.getState();
    if (!T || !Q && !s)
      return;
    if (!Q) {
      N?.(X.nativeEvent, { nodeId: T, handleId: S, handleType: t }), R.setState({ connectionClickStartHandle: { nodeId: T, type: t, id: S } });
      return;
    }
    const se = d1(X.target), me = i || le, { connection: ge, isValid: ee } = Wd.isValid(X.nativeEvent, {
      handle: {
        nodeId: T,
        id: S,
        type: t
      },
      connectionMode: $,
      fromNodeId: Q.nodeId,
      fromHandleId: Q.id || null,
      fromType: Q.type,
      isValidConnection: me,
      flowId: k,
      doc: se,
      lib: D,
      nodeLookup: K
    });
    ee && ge && J(ge);
    const pe = structuredClone(ae);
    delete pe.inProgress, pe.toPosition = pe.toHandle ? pe.toHandle.position : null, O?.(X, pe), R.setState({ connectionClickStartHandle: null });
  };
  return w.jsx("div", { "data-handleid": S, "data-nodeid": T, "data-handlepos": a, "data-id": `${z}-${T}-${S}-${t}`, className: Yt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    g,
    {
      source: !A,
      target: A,
      connectable: o,
      connectablestart: s,
      connectableend: u,
      clickconnecting: V,
      connectingfrom: Y,
      connectingto: U,
      valid: I,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!G || C) && (G || P ? u : s)
    }
  ]), onMouseDown: oe, onTouchStart: oe, onClick: L ? j : void 0, ref: x, ...v, children: p });
}
const ur = M.memo(H1(KR));
function FR({ data: t, isConnectable: a, sourcePosition: i = Ce.Bottom }) {
  return w.jsxs(w.Fragment, { children: [t?.label, w.jsx(ur, { type: "source", position: i, isConnectable: a })] });
}
function JR({ data: t, isConnectable: a, targetPosition: i = Ce.Top, sourcePosition: o = Ce.Bottom }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(ur, { type: "target", position: i, isConnectable: a }), t?.label, w.jsx(ur, { type: "source", position: o, isConnectable: a })] });
}
function PR() {
  return null;
}
function WR({ data: t, isConnectable: a, targetPosition: i = Ce.Top }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(ur, { type: "target", position: i, isConnectable: a }), t?.label] });
}
const Au = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, sv = {
  input: FR,
  default: JR,
  output: WR,
  group: PR
};
function e3(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const t3 = (t) => {
  const { width: a, height: i, x: o, y: s } = jo(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: fa(a) ? a : null,
    height: fa(i) ? i : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${o}px,${s}px)`
  };
};
function n3({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: i }) {
  const o = wt(), { width: s, height: u, transformString: f, userSelectionActive: h } = Pe(t3, St), p = k1(), g = M.useRef(null);
  M.useEffect(() => {
    i || g.current?.focus({
      preventScroll: !0
    });
  }, [i]);
  const y = !h && s !== null && u !== null;
  if (U1({
    nodeRef: g,
    disabled: !y
  }), !y)
    return null;
  const m = t ? (x) => {
    const S = o.getState().nodes.filter((A) => A.selected);
    t(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Au, x.key) && (x.preventDefault(), p({
      direction: Au[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return w.jsx("div", { className: Yt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: f
  }, children: w.jsx("div", { ref: g, className: "react-flow__nodesselection-rect", onContextMenu: m, tabIndex: i ? void 0 : -1, onKeyDown: i ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const uv = typeof window < "u" ? window : void 0, a3 = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function G1({ children: t, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: f, paneClickDistance: h, deleteKeyCode: p, selectionKeyCode: g, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: A, zoomActivationKeyCode: R, elementsSelectable: T, zoomOnScroll: L, zoomOnPinch: E, panOnScroll: z, panOnScrollSpeed: Y, panOnScrollMode: U, zoomOnDoubleClick: V, panOnDrag: C, autoPanOnSelection: G, defaultViewport: P, translateExtent: I, minZoom: J, maxZoom: oe, preventScrolling: j, onSelectionContextMenu: X, noWheelClassName: N, noPanClassName: O, disableKeyboardA11y: Q, onViewportChange: $, isControlledViewport: le }) {
  const { nodesSelectionActive: D, userSelectionActive: k } = Pe(a3, St), K = No(g, { target: uv }), ae = No(A, { target: uv }), se = ae || C, me = ae || z, ge = y && se !== !0, ee = K || k || ge;
  return jR({ deleteKeyCode: p, multiSelectionKeyCode: S }), w.jsx(BR, { onPaneContextMenu: u, elementsSelectable: T, zoomOnScroll: L, zoomOnPinch: E, panOnScroll: me, panOnScrollSpeed: Y, panOnScrollMode: U, zoomOnDoubleClick: V, panOnDrag: !K && se, defaultViewport: P, translateExtent: I, minZoom: J, maxZoom: oe, zoomActivationKeyCode: R, preventScrolling: j, noWheelClassName: N, noPanClassName: O, onViewportChange: $, isControlledViewport: le, paneClickDistance: h, selectionOnDrag: ge, children: w.jsxs(YR, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: f, panOnDrag: se, autoPanOnSelection: G, isSelecting: !!ee, selectionMode: m, selectionKeyPressed: K, paneClickDistance: h, selectionOnDrag: ge, children: [t, D && w.jsx(n3, { onSelectionContextMenu: X, noPanClassName: O, disableKeyboardA11y: Q })] }) });
}
G1.displayName = "FlowRenderer";
const l3 = M.memo(G1), i3 = (t) => (a) => t ? Ch(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((i) => i.id) : Array.from(a.nodeLookup.keys());
function r3(t) {
  return Pe(M.useCallback(i3(t), [t]), St);
}
const o3 = (t) => t.updateNodeInternals;
function s3() {
  const t = Pe(o3), [a] = M.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((i) => {
    const o = /* @__PURE__ */ new Map();
    i.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      o.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), t(o);
  }));
  return M.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function u3({ node: t, nodeType: a, hasDimensions: i, resizeObserver: o }) {
  const s = wt(), u = M.useRef(null), f = M.useRef(null), h = M.useRef(t.sourcePosition), p = M.useRef(t.targetPosition), g = M.useRef(a), y = i && !!t.internals.handleBounds;
  return M.useEffect(() => {
    u.current && !t.hidden && (!y || f.current !== u.current) && (f.current && o?.unobserve(f.current), o?.observe(u.current), f.current = u.current);
  }, [y, t.hidden]), M.useEffect(() => () => {
    f.current && (o?.unobserve(f.current), f.current = null);
  }, []), M.useEffect(() => {
    if (u.current) {
      const m = g.current !== a, v = h.current !== t.sourcePosition, x = p.current !== t.targetPosition;
      (m || v || x) && (g.current = a, h.current = t.sourcePosition, p.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, a, t.sourcePosition, t.targetPosition]), u;
}
function c3({ id: t, onClick: a, onMouseEnter: i, onMouseMove: o, onMouseLeave: s, onContextMenu: u, onDoubleClick: f, nodesDraggable: h, elementsSelectable: p, nodesConnectable: g, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: A, nodeTypes: R, nodeClickDistance: T, onError: L }) {
  const { node: E, internals: z, isParent: Y } = Pe((ee) => {
    const pe = ee.nodeLookup.get(t), ze = ee.parentLookup.has(t);
    return {
      node: pe,
      internals: pe.internals,
      isParent: ze
    };
  }, St);
  let U = E.type || "default", V = R?.[U] || sv[U];
  V === void 0 && (L?.("003", ha.error003(U)), U = "default", V = R?.default || sv.default);
  const C = !!(E.draggable || h && typeof E.draggable > "u"), G = !!(E.selectable || p && typeof E.selectable > "u"), P = !!(E.connectable || g && typeof E.connectable > "u"), I = !!(E.focusable || y && typeof E.focusable > "u"), J = wt(), oe = c1(E), j = u3({ node: E, nodeType: U, hasDimensions: oe, resizeObserver: m }), X = U1({
    nodeRef: j,
    disabled: E.hidden || !C,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: t,
    isSelectable: G,
    nodeClickDistance: T
  }), N = k1();
  if (E.hidden)
    return null;
  const O = el(E), Q = e3(E), $ = G || C || a || i || o || s, le = i ? (ee) => i(ee, { ...z.userNode }) : void 0, D = o ? (ee) => o(ee, { ...z.userNode }) : void 0, k = s ? (ee) => s(ee, { ...z.userNode }) : void 0, K = u ? (ee) => u(ee, { ...z.userNode }) : void 0, ae = f ? (ee) => f(ee, { ...z.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: pe, nodeDragThreshold: ze } = J.getState();
    G && (!pe || !C || ze > 0) && eh({
      id: t,
      store: J,
      nodeRef: j
    }), a && a(ee, { ...z.userNode });
  }, me = (ee) => {
    if (!(h1(ee.nativeEvent) || S)) {
      if (e1.includes(ee.key) && G) {
        const pe = ee.key === "Escape";
        eh({
          id: t,
          store: J,
          unselect: pe,
          nodeRef: j
        });
      } else if (C && E.selected && Object.prototype.hasOwnProperty.call(Au, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: pe } = J.getState();
        J.setState({
          ariaLiveMessage: pe["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~z.positionAbsolute.x,
            y: ~~z.positionAbsolute.y
          })
        }), N({
          direction: Au[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, ge = () => {
    if (S || !j.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: pe, height: ze, autoPanOnNodeFocus: Ae, setCenter: we } = J.getState();
    if (!Ae)
      return;
    Ch(/* @__PURE__ */ new Map([[t, E]]), { x: 0, y: 0, width: pe, height: ze }, ee, !0).length > 0 || we(E.position.x + O.width / 2, E.position.y + O.height / 2, {
      zoom: ee[2]
    });
  };
  return w.jsx("div", { className: Yt([
    "react-flow__node",
    `react-flow__node-${U}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: C
    },
    E.className,
    {
      selected: E.selected,
      selectable: G,
      parent: Y,
      draggable: C,
      dragging: X
    }
  ]), ref: j, style: {
    zIndex: z.z,
    transform: `translate(${z.positionAbsolute.x}px,${z.positionAbsolute.y}px)`,
    pointerEvents: $ ? "all" : "none",
    visibility: oe ? "visible" : "hidden",
    ...E.style,
    ...Q
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: le, onMouseMove: D, onMouseLeave: k, onContextMenu: K, onClick: se, onDoubleClick: ae, onKeyDown: I ? me : void 0, tabIndex: I ? 0 : void 0, onFocus: I ? ge : void 0, role: E.ariaRole ?? (I ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${z1}-${A}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: w.jsx(qR, { value: t, children: w.jsx(V, { id: t, data: E.data, type: U, positionAbsoluteX: z.positionAbsolute.x, positionAbsoluteY: z.positionAbsolute.y, selected: E.selected ?? !1, selectable: G, draggable: C, deletable: E.deletable ?? !0, isConnectable: P, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: X, dragHandle: E.dragHandle, zIndex: z.z, parentId: E.parentId, ...O }) }) });
}
var f3 = M.memo(c3);
const d3 = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function q1(t) {
  const { nodesDraggable: a, nodesConnectable: i, nodesFocusable: o, elementsSelectable: s, onError: u } = Pe(d3, St), f = r3(t.onlyRenderVisibleElements), h = s3();
  return w.jsx("div", { className: "react-flow__nodes", style: Qu, children: f.map((p) => (
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
    w.jsx(f3, { id: p, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: i, nodesFocusable: o, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, p)
  )) });
}
q1.displayName = "NodeRenderer";
const h3 = M.memo(q1);
function m3(t) {
  return Pe(M.useCallback((i) => {
    if (!t)
      return i.edges.map((s) => s.id);
    const o = [];
    if (i.width && i.height)
      for (const s of i.edges) {
        const u = i.nodeLookup.get(s.source), f = i.nodeLookup.get(s.target);
        u && f && lC({
          sourceNode: u,
          targetNode: f,
          width: i.width,
          height: i.height,
          transform: i.transform
        }) && o.push(s.id);
      }
    return o;
  }, [t]), St);
}
const g3 = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return w.jsx("polyline", { className: "arrow", style: i, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, p3 = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return w.jsx("polyline", { className: "arrowclosed", style: i, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, cv = {
  [Tu.Arrow]: g3,
  [Tu.ArrowClosed]: p3
};
function y3(t) {
  const a = wt();
  return M.useMemo(() => Object.prototype.hasOwnProperty.call(cv, t) ? cv[t] : (a.getState().onError?.("009", ha.error009(t)), null), [t]);
}
const v3 = ({ id: t, type: a, color: i, width: o = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: f, orient: h = "auto-start-reverse" }) => {
  const p = y3(a);
  return p ? w.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${o}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: w.jsx(p, { color: i, strokeWidth: f }) }) : null;
}, $1 = ({ defaultColor: t, rfId: a }) => {
  const i = Pe((u) => u.edges), o = Pe((u) => u.defaultEdgeOptions), s = M.useMemo(() => dC(i, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [i, o, a, t]);
  return s.length ? w.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: w.jsx("defs", { children: s.map((u) => w.jsx(v3, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
$1.displayName = "MarkerDefinitions";
var b3 = M.memo($1);
function X1({ x: t, y: a, label: i, labelStyle: o, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: f = [2, 4], labelBgBorderRadius: h = 2, children: p, className: g, ...y }) {
  const [m, v] = M.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Yt(["react-flow__edge-textwrapper", g]), S = M.useRef(null);
  return M.useEffect(() => {
    if (S.current) {
      const A = S.current.getBBox();
      v({
        x: A.x,
        y: A.y,
        width: A.width,
        height: A.height
      });
    }
  }, [i]), i ? w.jsxs("g", { transform: `translate(${t - m.width / 2} ${a - m.height / 2})`, className: x, visibility: m.width ? "visible" : "hidden", ...y, children: [s && w.jsx("rect", { width: m.width + 2 * f[0], x: -f[0], y: -f[1], height: m.height + 2 * f[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), w.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: S, style: o, children: i }), p] }) : null;
}
X1.displayName = "EdgeText";
const x3 = M.memo(X1);
function Iu({ path: t, labelX: a, labelY: i, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, interactionWidth: g = 20, ...y }) {
  return w.jsxs(w.Fragment, { children: [w.jsx("path", { ...y, d: t, fill: "none", className: Yt(["react-flow__edge-path", y.className]) }), g ? w.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: g, className: "react-flow__edge-interaction" }) : null, o && fa(a) && fa(i) ? w.jsx(x3, { x: a, y: i, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p }) : null] });
}
function fv({ pos: t, x1: a, y1: i, x2: o, y2: s }) {
  return t === Ce.Left || t === Ce.Right ? [0.5 * (a + o), i] : [a, 0.5 * (i + s)];
}
function Z1({ sourceX: t, sourceY: a, sourcePosition: i = Ce.Bottom, targetX: o, targetY: s, targetPosition: u = Ce.Top }) {
  const [f, h] = fv({
    pos: i,
    x1: t,
    y1: a,
    x2: o,
    y2: s
  }), [p, g] = fv({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a
  }), [y, m, v, x] = g1({
    sourceX: t,
    sourceY: a,
    targetX: o,
    targetY: s,
    sourceControlX: f,
    sourceControlY: h,
    targetControlX: p,
    targetControlY: g
  });
  return [
    `M${t},${a} C${f},${h} ${p},${g} ${o},${s}`,
    y,
    m,
    v,
    x
  ];
}
function Q1(t) {
  return M.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, sourcePosition: f, targetPosition: h, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: A, markerStart: R, interactionWidth: T }) => {
    const [L, E, z] = Z1({
      sourceX: i,
      sourceY: o,
      sourcePosition: f,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), Y = t.isInternal ? void 0 : a;
    return w.jsx(Iu, { id: Y, path: L, labelX: E, labelY: z, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: A, markerStart: R, interactionWidth: T });
  });
}
const S3 = Q1({ isInternal: !1 }), I1 = Q1({ isInternal: !0 });
S3.displayName = "SimpleBezierEdge";
I1.displayName = "SimpleBezierEdgeInternal";
function K1(t) {
  return M.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: x = Ce.Bottom, targetPosition: S = Ce.Top, markerEnd: A, markerStart: R, pathOptions: T, interactionWidth: L }) => {
    const [E, z, Y] = Fd({
      sourceX: i,
      sourceY: o,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: T?.borderRadius,
      offset: T?.offset,
      stepPosition: T?.stepPosition
    }), U = t.isInternal ? void 0 : a;
    return w.jsx(Iu, { id: U, path: E, labelX: z, labelY: Y, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: A, markerStart: R, interactionWidth: L });
  });
}
const F1 = K1({ isInternal: !1 }), J1 = K1({ isInternal: !0 });
F1.displayName = "SmoothStepEdge";
J1.displayName = "SmoothStepEdgeInternal";
function P1(t) {
  return M.memo(({ id: a, ...i }) => {
    const o = t.isInternal ? void 0 : a;
    return w.jsx(F1, { ...i, id: o, pathOptions: M.useMemo(() => ({ borderRadius: 0, offset: i.pathOptions?.offset }), [i.pathOptions?.offset]) });
  });
}
const w3 = P1({ isInternal: !1 }), W1 = P1({ isInternal: !0 });
w3.displayName = "StepEdge";
W1.displayName = "StepEdgeInternal";
function ex(t) {
  return M.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: A }) => {
    const [R, T, L] = v1({ sourceX: i, sourceY: o, targetX: s, targetY: u }), E = t.isInternal ? void 0 : a;
    return w.jsx(Iu, { id: E, path: R, labelX: T, labelY: L, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: A });
  });
}
const E3 = ex({ isInternal: !1 }), tx = ex({ isInternal: !0 });
E3.displayName = "StraightEdge";
tx.displayName = "StraightEdgeInternal";
function nx(t) {
  return M.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, sourcePosition: f = Ce.Bottom, targetPosition: h = Ce.Top, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: A, markerStart: R, pathOptions: T, interactionWidth: L }) => {
    const [E, z, Y] = p1({
      sourceX: i,
      sourceY: o,
      sourcePosition: f,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: T?.curvature
    }), U = t.isInternal ? void 0 : a;
    return w.jsx(Iu, { id: U, path: E, labelX: z, labelY: Y, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: A, markerStart: R, interactionWidth: L });
  });
}
const _3 = nx({ isInternal: !1 }), ax = nx({ isInternal: !0 });
_3.displayName = "BezierEdge";
ax.displayName = "BezierEdgeInternal";
const dv = {
  default: ax,
  straight: tx,
  step: W1,
  smoothstep: J1,
  simplebezier: I1
}, hv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, N3 = (t, a, i) => i === Ce.Left ? t - a : i === Ce.Right ? t + a : t, M3 = (t, a, i) => i === Ce.Top ? t - a : i === Ce.Bottom ? t + a : t, mv = "react-flow__edgeupdater";
function gv({ position: t, centerX: a, centerY: i, radius: o = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: f, type: h }) {
  return w.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: f, className: Yt([mv, `${mv}-${h}`]), cx: N3(a, o, t), cy: M3(i, o, t), r: o, stroke: "transparent", fill: "transparent" });
}
function T3({ isReconnectable: t, reconnectRadius: a, edge: i, sourceX: o, sourceY: s, targetX: u, targetY: f, sourcePosition: h, targetPosition: p, onReconnect: g, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: x }) {
  const S = wt(), A = (z, Y) => {
    if (z.button !== 0)
      return;
    const { autoPanOnConnect: U, domNode: V, connectionMode: C, connectionRadius: G, lib: P, onConnectStart: I, cancelConnection: J, nodeLookup: oe, rfId: j, panBy: X, updateConnection: N } = S.getState(), O = Y.type === "target", Q = (D, k) => {
      v(!1), m?.(D, i, Y.type, k);
    }, $ = (D) => g?.(i, D), le = (D, k) => {
      v(!0), y?.(z, i, Y.type), I?.(D, k);
    };
    Wd.onPointerDown(z.nativeEvent, {
      autoPanOnConnect: U,
      connectionMode: C,
      connectionRadius: G,
      domNode: V,
      handleId: Y.id,
      nodeId: Y.nodeId,
      nodeLookup: oe,
      isTarget: O,
      edgeUpdaterType: Y.type,
      lib: P,
      flowId: j,
      cancelConnection: J,
      panBy: X,
      isValidConnection: (...D) => S.getState().isValidConnection?.(...D) ?? !0,
      onConnect: $,
      onConnectStart: le,
      onConnectEnd: (...D) => S.getState().onConnectEnd?.(...D),
      onReconnectEnd: Q,
      updateConnection: N,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: z.currentTarget
    });
  }, R = (z) => A(z, { nodeId: i.target, id: i.targetHandle ?? null, type: "target" }), T = (z) => A(z, { nodeId: i.source, id: i.sourceHandle ?? null, type: "source" }), L = () => x(!0), E = () => x(!1);
  return w.jsxs(w.Fragment, { children: [(t === !0 || t === "source") && w.jsx(gv, { position: h, centerX: o, centerY: s, radius: a, onMouseDown: R, onMouseEnter: L, onMouseOut: E, type: "source" }), (t === !0 || t === "target") && w.jsx(gv, { position: p, centerX: u, centerY: f, radius: a, onMouseDown: T, onMouseEnter: L, onMouseOut: E, type: "target" })] });
}
function C3({ id: t, edgesFocusable: a, edgesReconnectable: i, elementsSelectable: o, onClick: s, onDoubleClick: u, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: A, noPanClassName: R, onError: T, disableKeyboardA11y: L }) {
  let E = Pe((we) => we.edgeLookup.get(t));
  const z = Pe((we) => we.defaultEdgeOptions);
  E = z ? { ...z, ...E } : E;
  let Y = E.type || "default", U = A?.[Y] || dv[Y];
  U === void 0 && (T?.("011", ha.error011(Y)), Y = "default", U = A?.default || dv.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), C = typeof m < "u" && (E.reconnectable || i && typeof E.reconnectable > "u"), G = !!(E.selectable || o && typeof E.selectable > "u"), P = M.useRef(null), [I, J] = M.useState(!1), [oe, j] = M.useState(!1), X = wt(), { zIndex: N = E.zIndex, sourceX: O, sourceY: Q, targetX: $, targetY: le, sourcePosition: D, targetPosition: k } = Pe(M.useCallback((we) => {
    const Se = we.nodeLookup.get(E.source), De = we.nodeLookup.get(E.target);
    if (!Se || !De)
      return hv;
    const qe = fC({
      id: t,
      sourceNode: Se,
      targetNode: De,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: we.connectionMode,
      onError: T
    }), nt = aC({
      selected: E.selected,
      zIndex: E.zIndex,
      sourceNode: Se,
      targetNode: De,
      elevateOnSelect: we.elevateEdgesOnSelect,
      zIndexMode: we.zIndexMode
    });
    return {
      ...qe || hv,
      zIndex: nt
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), St), K = M.useMemo(() => E.markerStart ? `url('#${Jd(E.markerStart, S)}')` : void 0, [E.markerStart, S]), ae = M.useMemo(() => E.markerEnd ? `url('#${Jd(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || O === null || Q === null || $ === null || le === null)
    return null;
  const se = (we) => {
    const { addSelectedEdges: Se, unselectNodesAndEdges: De, multiSelectionActive: qe } = X.getState();
    G && (X.setState({ nodesSelectionActive: !1 }), E.selected && qe ? (De({ nodes: [], edges: [E] }), P.current?.blur()) : Se([t])), s && s(we, E);
  }, me = u ? (we) => {
    u(we, { ...E });
  } : void 0, ge = f ? (we) => {
    f(we, { ...E });
  } : void 0, ee = h ? (we) => {
    h(we, { ...E });
  } : void 0, pe = p ? (we) => {
    p(we, { ...E });
  } : void 0, ze = g ? (we) => {
    g(we, { ...E });
  } : void 0, Ae = (we) => {
    if (!L && e1.includes(we.key) && G) {
      const { unselectNodesAndEdges: Se, addSelectedEdges: De } = X.getState();
      we.key === "Escape" ? (P.current?.blur(), Se({ edges: [E] })) : De([t]);
    }
  };
  return w.jsx("svg", { style: { zIndex: N }, children: w.jsxs("g", { className: Yt([
    "react-flow__edge",
    `react-flow__edge-${Y}`,
    E.className,
    R,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !G && !s,
      updating: I,
      selectable: G
    }
  ]), onClick: se, onDoubleClick: me, onContextMenu: ge, onMouseEnter: ee, onMouseMove: pe, onMouseLeave: ze, onKeyDown: V ? Ae : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${O1}-${S}` : void 0, ref: P, ...E.domAttributes, children: [!oe && w.jsx(U, { id: t, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: G, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: O, sourceY: Q, targetX: $, targetY: le, sourcePosition: D, targetPosition: k, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: K, markerEnd: ae, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), C && w.jsx(T3, { edge: E, isReconnectable: C, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, sourceX: O, sourceY: Q, targetX: $, targetY: le, sourcePosition: D, targetPosition: k, setUpdateHover: J, setReconnecting: j })] }) });
}
var R3 = M.memo(C3);
const A3 = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function lx({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: i, edgeTypes: o, noPanClassName: s, onReconnect: u, onEdgeContextMenu: f, onEdgeMouseEnter: h, onEdgeMouseMove: p, onEdgeMouseLeave: g, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: A }) {
  const { edgesFocusable: R, edgesReconnectable: T, elementsSelectable: L, onError: E } = Pe(A3, St), z = m3(a);
  return w.jsxs("div", { className: "react-flow__edges", children: [w.jsx(b3, { defaultColor: t, rfId: i }), z.map((Y) => w.jsx(R3, { id: Y, edgesFocusable: R, edgesReconnectable: T, elementsSelectable: L, noPanClassName: s, onReconnect: u, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: i, onError: E, edgeTypes: o, disableKeyboardA11y: A }, Y))] });
}
lx.displayName = "EdgeRenderer";
const D3 = M.memo(lx), z3 = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function O3({ children: t }) {
  const a = Pe(z3);
  return w.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function j3(t) {
  const a = Bh(), i = M.useRef(!1);
  M.useEffect(() => {
    !i.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), i.current = !0);
  }, [t, a.viewportInitialized]);
}
const L3 = (t) => t.panZoom?.syncViewport;
function H3(t) {
  const a = Pe(L3), i = wt();
  return M.useEffect(() => {
    t && (a?.(t), i.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function B3(t) {
  return t.connection.inProgress ? { ...t.connection, to: Ho(t.connection.to, t.transform) } : { ...t.connection };
}
function U3(t) {
  return B3;
}
function k3(t) {
  const a = U3();
  return Pe(a, St);
}
const V3 = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function Y3({ containerStyle: t, style: a, type: i, component: o }) {
  const { nodesConnectable: s, width: u, height: f, isValid: h, inProgress: p } = Pe(V3, St);
  return !(u && s && p) ? null : w.jsx("svg", { style: t, width: u, height: f, className: "react-flow__connectionline react-flow__container", children: w.jsx("g", { className: Yt(["react-flow__connection", a1(h)]), children: w.jsx(ix, { style: a, type: i, CustomComponent: o, isValid: h }) }) });
}
const ix = ({ style: t, type: a = jl.Bezier, CustomComponent: i, isValid: o }) => {
  const { inProgress: s, from: u, fromNode: f, fromHandle: h, fromPosition: p, to: g, toNode: y, toHandle: m, toPosition: v, pointer: x } = k3();
  if (!s)
    return;
  if (i)
    return w.jsx(i, { connectionLineType: a, connectionLineStyle: t, fromNode: f, fromHandle: h, fromX: u.x, fromY: u.y, toX: g.x, toY: g.y, fromPosition: p, toPosition: v, connectionStatus: a1(o), toNode: y, toHandle: m, pointer: x });
  let S = "";
  const A = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: g.x,
    targetY: g.y,
    targetPosition: v
  };
  switch (a) {
    case jl.Bezier:
      [S] = p1(A);
      break;
    case jl.SimpleBezier:
      [S] = Z1(A);
      break;
    case jl.Step:
      [S] = Fd({
        ...A,
        borderRadius: 0
      });
      break;
    case jl.SmoothStep:
      [S] = Fd(A);
      break;
    default:
      [S] = v1(A);
  }
  return w.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: t });
};
ix.displayName = "ConnectionLine";
const G3 = {};
function pv(t = G3) {
  M.useRef(t), wt(), M.useEffect(() => {
  }, [t]);
}
function q3() {
  wt(), M.useRef(!1), M.useEffect(() => {
  }, []);
}
function rx({ nodeTypes: t, edgeTypes: a, onInit: i, onNodeClick: o, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: f, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: A, connectionLineComponent: R, connectionLineContainerStyle: T, selectionKeyCode: L, selectionOnDrag: E, selectionMode: z, multiSelectionKeyCode: Y, panActivationKeyCode: U, zoomActivationKeyCode: V, deleteKeyCode: C, onlyRenderVisibleElements: G, elementsSelectable: P, defaultViewport: I, translateExtent: J, minZoom: oe, maxZoom: j, preventScrolling: X, defaultMarkerColor: N, zoomOnScroll: O, zoomOnPinch: Q, panOnScroll: $, panOnScrollSpeed: le, panOnScrollMode: D, zoomOnDoubleClick: k, panOnDrag: K, autoPanOnSelection: ae, onPaneClick: se, onPaneMouseEnter: me, onPaneMouseMove: ge, onPaneMouseLeave: ee, onPaneScroll: pe, onPaneContextMenu: ze, paneClickDistance: Ae, nodeClickDistance: we, onEdgeContextMenu: Se, onEdgeMouseEnter: De, onEdgeMouseMove: qe, onEdgeMouseLeave: nt, reconnectRadius: it, onReconnect: Ft, onReconnectStart: pt, onReconnectEnd: Gt, noDragClassName: Jt, noWheelClassName: Et, noPanClassName: Qt, disableKeyboardA11y: yt, nodeExtent: _t, rfId: Nt, viewport: Pt, onViewportChange: qt }) {
  return pv(t), pv(a), q3(), j3(i), H3(Pt), w.jsx(l3, { onPaneClick: se, onPaneMouseEnter: me, onPaneMouseMove: ge, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: pe, paneClickDistance: Ae, deleteKeyCode: C, selectionKeyCode: L, selectionOnDrag: E, selectionMode: z, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: Y, panActivationKeyCode: U, zoomActivationKeyCode: V, elementsSelectable: P, zoomOnScroll: O, zoomOnPinch: Q, zoomOnDoubleClick: k, panOnScroll: $, panOnScrollSpeed: le, panOnScrollMode: D, panOnDrag: K, autoPanOnSelection: ae, defaultViewport: I, translateExtent: J, minZoom: oe, maxZoom: j, onSelectionContextMenu: m, preventScrolling: X, noDragClassName: Jt, noWheelClassName: Et, noPanClassName: Qt, disableKeyboardA11y: yt, onViewportChange: qt, isControlledViewport: !!Pt, children: w.jsxs(O3, { children: [w.jsx(D3, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: f, onReconnect: Ft, onReconnectStart: pt, onReconnectEnd: Gt, onlyRenderVisibleElements: G, onEdgeContextMenu: Se, onEdgeMouseEnter: De, onEdgeMouseMove: qe, onEdgeMouseLeave: nt, reconnectRadius: it, defaultMarkerColor: N, noPanClassName: Qt, disableKeyboardA11y: yt, rfId: Nt }), w.jsx(Y3, { style: A, type: S, component: R, containerStyle: T }), w.jsx("div", { className: "react-flow__edgelabel-renderer" }), w.jsx(h3, { nodeTypes: t, onNodeClick: o, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, nodeClickDistance: we, onlyRenderVisibleElements: G, noPanClassName: Qt, noDragClassName: Jt, disableKeyboardA11y: yt, nodeExtent: _t, rfId: Nt }), w.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
rx.displayName = "GraphView";
const $3 = M.memo(rx), X3 = u1(), yv = ({ nodes: t, edges: a, defaultNodes: i, defaultEdges: o, width: s, height: u, fitView: f, fitViewOptions: h, minZoom: p = 0.5, maxZoom: g = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), T = o ?? a ?? [], L = i ?? t ?? [], E = y ?? [0, 0], z = m ?? So;
  S1(A, R, T);
  const { nodesInitialized: Y } = Pd(L, x, S, {
    nodeOrigin: E,
    nodeExtent: z,
    zIndexMode: v
  });
  let U = [0, 0, 1];
  if (f && s && u) {
    const V = jo(x, {
      filter: (I) => !!((I.width || I.initialWidth) && (I.height || I.initialHeight))
    }), { x: C, y: G, zoom: P } = Ah(V, s, u, p, g, h?.padding ?? 0.1);
    U = [C, G, P];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: U,
    nodes: L,
    nodesInitialized: Y,
    nodeLookup: x,
    parentLookup: S,
    edges: T,
    edgeLookup: R,
    connectionLookup: A,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: i !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: g,
    translateExtent: So,
    nodeExtent: z,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: ir.Strict,
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
    fitViewQueued: f ?? !1,
    fitViewOptions: h,
    fitViewResolver: null,
    connection: { ...n1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: X3,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: t1,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, Z3 = ({ nodes: t, edges: a, defaultNodes: i, defaultEdges: o, width: s, height: u, fitView: f, fitViewOptions: h, minZoom: p, maxZoom: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => eR((x, S) => {
  async function A() {
    const { nodeLookup: R, panZoom: T, fitViewOptions: L, fitViewResolver: E, width: z, height: Y, minZoom: U, maxZoom: V } = S();
    T && (await FT({
      nodes: R,
      width: z,
      height: Y,
      panZoom: T,
      minZoom: U,
      maxZoom: V
    }, L), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...yv({
      nodes: t,
      edges: a,
      width: s,
      height: u,
      fitView: f,
      fitViewOptions: h,
      minZoom: p,
      maxZoom: g,
      nodeOrigin: y,
      nodeExtent: m,
      defaultNodes: i,
      defaultEdges: o,
      zIndexMode: v
    }),
    setNodes: (R) => {
      const { nodeLookup: T, parentLookup: L, nodeOrigin: E, elevateNodesOnSelect: z, fitViewQueued: Y, zIndexMode: U, nodesSelectionActive: V } = S(), { nodesInitialized: C, hasSelectedNodes: G } = Pd(R, T, L, {
        nodeOrigin: E,
        nodeExtent: m,
        elevateNodesOnSelect: z,
        checkEquality: !0,
        zIndexMode: U
      }), P = V && G;
      Y && C ? (A(), x({
        nodes: R,
        nodesInitialized: C,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: P
      })) : x({ nodes: R, nodesInitialized: C, nodesSelectionActive: P });
    },
    setEdges: (R) => {
      const { connectionLookup: T, edgeLookup: L } = S();
      S1(T, L, R), x({ edges: R });
    },
    setDefaultNodesAndEdges: (R, T) => {
      if (R) {
        const { setNodes: L } = S();
        L(R), x({ hasDefaultNodes: !0 });
      }
      if (T) {
        const { setEdges: L } = S();
        L(T), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (R) => {
      const { triggerNodeChanges: T, nodeLookup: L, parentLookup: E, domNode: z, nodeOrigin: Y, nodeExtent: U, debug: V, fitViewQueued: C, zIndexMode: G } = S(), { changes: P, updatedInternals: I } = bC(R, L, E, z, Y, U, G);
      I && (gC(L, E, { nodeOrigin: Y, nodeExtent: U, zIndexMode: G }), C ? (A(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), P?.length > 0 && (V && console.log("React Flow: trigger node changes", P), T?.(P)));
    },
    updateNodePositions: (R, T = !1) => {
      const L = [];
      let E = [];
      const { nodeLookup: z, triggerNodeChanges: Y, connection: U, updateConnection: V, onNodesChangeMiddlewareMap: C } = S();
      for (const [G, P] of R) {
        const I = z.get(G), J = !!(I?.expandParent && I?.parentId && P?.position), oe = {
          id: G,
          type: "position",
          position: J ? {
            x: Math.max(0, P.position.x),
            y: Math.max(0, P.position.y)
          } : P.position,
          dragging: T
        };
        if (I && U.inProgress && U.fromNode.id === I.id) {
          const j = ci(I, U.fromHandle, Ce.Left, !0);
          V({ ...U, from: j });
        }
        J && I.parentId && L.push({
          id: G,
          parentId: I.parentId,
          rect: {
            ...P.internals.positionAbsolute,
            width: P.measured.width ?? 0,
            height: P.measured.height ?? 0
          }
        }), E.push(oe);
      }
      if (L.length > 0) {
        const { parentLookup: G, nodeOrigin: P } = S(), I = Hh(L, z, G, P);
        E.push(...I);
      }
      for (const G of C.values())
        E = G(E);
      Y(E);
    },
    triggerNodeChanges: (R) => {
      const { onNodesChange: T, setNodes: L, nodes: E, hasDefaultNodes: z, debug: Y } = S();
      if (R?.length) {
        if (z) {
          const U = ER(R, E);
          L(U);
        }
        Y && console.log("React Flow: trigger node changes", R), T?.(R);
      }
    },
    triggerEdgeChanges: (R) => {
      const { onEdgesChange: T, setEdges: L, edges: E, hasDefaultEdges: z, debug: Y } = S();
      if (R?.length) {
        if (z) {
          const U = _R(R, E);
          L(U);
        }
        Y && console.log("React Flow: trigger edge changes", R), T?.(R);
      }
    },
    addSelectedNodes: (R) => {
      const { multiSelectionActive: T, edgeLookup: L, nodeLookup: E, triggerNodeChanges: z, triggerEdgeChanges: Y } = S();
      if (T) {
        const U = R.map((V) => ti(V, !0));
        z(U);
        return;
      }
      z(Ji(E, /* @__PURE__ */ new Set([...R]), !0)), Y(Ji(L));
    },
    addSelectedEdges: (R) => {
      const { multiSelectionActive: T, edgeLookup: L, nodeLookup: E, triggerNodeChanges: z, triggerEdgeChanges: Y } = S();
      if (T) {
        const U = R.map((V) => ti(V, !0));
        Y(U);
        return;
      }
      Y(Ji(L, /* @__PURE__ */ new Set([...R]))), z(Ji(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: R, edges: T } = {}) => {
      const { edges: L, nodes: E, nodeLookup: z, triggerNodeChanges: Y, triggerEdgeChanges: U } = S(), V = R || E, C = T || L, G = [];
      for (const I of V) {
        if (!I.selected)
          continue;
        const J = z.get(I.id);
        J && (J.selected = !1), G.push(ti(I.id, !1));
      }
      const P = [];
      for (const I of C)
        I.selected && P.push(ti(I.id, !1));
      Y(G), U(P);
    },
    setMinZoom: (R) => {
      const { panZoom: T, maxZoom: L } = S();
      T?.setScaleExtent([R, L]), x({ minZoom: R });
    },
    setMaxZoom: (R) => {
      const { panZoom: T, minZoom: L } = S();
      T?.setScaleExtent([L, R]), x({ maxZoom: R });
    },
    setTranslateExtent: (R) => {
      S().panZoom?.setTranslateExtent(R), x({ translateExtent: R });
    },
    resetSelectedElements: () => {
      const { edges: R, nodes: T, triggerNodeChanges: L, triggerEdgeChanges: E, elementsSelectable: z } = S();
      if (!z)
        return;
      const Y = T.reduce((V, C) => C.selected ? [...V, ti(C.id, !1)] : V, []), U = R.reduce((V, C) => C.selected ? [...V, ti(C.id, !1)] : V, []);
      L(Y), E(U);
    },
    setNodeExtent: (R) => {
      const { nodes: T, nodeLookup: L, parentLookup: E, nodeOrigin: z, elevateNodesOnSelect: Y, nodeExtent: U, zIndexMode: V } = S();
      R[0][0] === U[0][0] && R[0][1] === U[0][1] && R[1][0] === U[1][0] && R[1][1] === U[1][1] || (Pd(T, L, E, {
        nodeOrigin: z,
        nodeExtent: R,
        elevateNodesOnSelect: Y,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: R }));
    },
    panBy: (R) => {
      const { transform: T, width: L, height: E, panZoom: z, translateExtent: Y } = S();
      return xC({ delta: R, panZoom: z, transform: T, translateExtent: Y, width: L, height: E });
    },
    setCenter: async (R, T, L) => {
      const { width: E, height: z, maxZoom: Y, panZoom: U } = S();
      if (!U)
        return !1;
      const V = typeof L?.zoom < "u" ? L.zoom : Y;
      return await U.setViewport({
        x: E / 2 - R * V,
        y: z / 2 - T * V,
        zoom: V
      }, { duration: L?.duration, ease: L?.ease, interpolate: L?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...n1 }
      });
    },
    updateConnection: (R) => {
      x({ connection: R });
    },
    reset: () => x({ ...yv() })
  };
}, Object.is);
function ox({ initialNodes: t, initialEdges: a, defaultNodes: i, defaultEdges: o, initialWidth: s, initialHeight: u, initialMinZoom: f, initialMaxZoom: h, initialFitViewOptions: p, fitView: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: x }) {
  const [S] = M.useState(() => Z3({
    nodes: t,
    edges: a,
    defaultNodes: i,
    defaultEdges: o,
    width: s,
    height: u,
    fitView: g,
    minZoom: f,
    maxZoom: h,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: m,
    zIndexMode: v
  }));
  return w.jsx(aR, { value: S, children: w.jsx(AR, { children: w.jsx(XR, { children: x }) }) });
}
function Q3({ children: t, nodes: a, edges: i, defaultNodes: o, defaultEdges: s, width: u, height: f, fitView: h, fitViewOptions: p, minZoom: g, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x }) {
  return M.useContext(Xu) ? w.jsx(w.Fragment, { children: t }) : w.jsx(ox, { initialNodes: a, initialEdges: i, defaultNodes: o, defaultEdges: s, initialWidth: u, initialHeight: f, fitView: h, initialFitViewOptions: p, initialMinZoom: g, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x, children: t });
}
const I3 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function K3({ nodes: t, edges: a, defaultNodes: i, defaultEdges: o, className: s, nodeTypes: u, edgeTypes: f, onNodeClick: h, onEdgeClick: p, onInit: g, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: A, onClickConnectStart: R, onClickConnectEnd: T, onNodeMouseEnter: L, onNodeMouseMove: E, onNodeMouseLeave: z, onNodeContextMenu: Y, onNodeDoubleClick: U, onNodeDragStart: V, onNodeDrag: C, onNodeDragStop: G, onNodesDelete: P, onEdgesDelete: I, onDelete: J, onSelectionChange: oe, onSelectionDragStart: j, onSelectionDrag: X, onSelectionDragStop: N, onSelectionContextMenu: O, onSelectionStart: Q, onSelectionEnd: $, onBeforeDelete: le, connectionMode: D, connectionLineType: k = jl.Bezier, connectionLineStyle: K, connectionLineComponent: ae, connectionLineContainerStyle: se, deleteKeyCode: me = "Backspace", selectionKeyCode: ge = "Shift", selectionOnDrag: ee = !1, selectionMode: pe = wo.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Ae = _o() ? "Meta" : "Control", zoomActivationKeyCode: we = _o() ? "Meta" : "Control", snapToGrid: Se, snapGrid: De, onlyRenderVisibleElements: qe = !1, selectNodesOnDrag: nt, nodesDraggable: it, autoPanOnNodeFocus: Ft, nodesConnectable: pt, nodesFocusable: Gt, nodeOrigin: Jt = j1, edgesFocusable: Et, edgesReconnectable: Qt, elementsSelectable: yt = !0, defaultViewport: _t = pR, minZoom: Nt = 0.5, maxZoom: Pt = 2, translateExtent: qt = So, preventScrolling: Wt = !0, nodeExtent: Mt, defaultMarkerColor: tl = "#b1b1b7", zoomOnScroll: kn = !0, zoomOnPinch: Nn = !0, panOnScroll: $t = !1, panOnScrollSpeed: Tt = 0.5, panOnScrollMode: zt = ii.Free, zoomOnDoubleClick: nl = !0, panOnDrag: pa = !0, onPaneClick: mn, onPaneMouseEnter: ta, onPaneMouseMove: Mn, onPaneMouseLeave: Vn, onPaneScroll: on, onPaneContextMenu: Le, paneClickDistance: ot = 1, nodeClickDistance: Rt = 0, children: Ot, onReconnect: fn, onReconnectStart: rt, onReconnectEnd: Xt, onEdgeContextMenu: na, onEdgeDoubleClick: It, onEdgeMouseEnter: H, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: he, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: xe = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: Te, connectOnClick: Be, attributionPosition: Oe, proOptions: Ye, defaultEdgeOptions: Je, elevateNodesOnSelect: mt = !0, elevateEdgesOnSelect: We = !1, disableKeyboardA11y: Ze = !1, autoPanOnConnect: Ct, autoPanOnNodeDrag: Ke, autoPanOnSelection: ya = !0, autoPanSpeed: Tn, connectionRadius: sn, isValidConnection: en, onError: gn, style: al, id: pn, nodeDragThreshold: ll, connectionDragThreshold: aa, viewport: la, onViewportChange: He, width: st, height: dn, colorMode: Cn = "light", debug: il, onScroll: Da, ariaLabelConfig: at, zIndexMode: Yn = "basic", ...tn }, Bl) {
  const di = pn || "1", fr = xR(Cn), rl = M.useCallback((dr) => {
    dr.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Da?.(dr);
  }, [Da]);
  return w.jsx("div", { "data-testid": "rf__wrapper", ...tn, onScroll: rl, style: { ...al, ...I3 }, ref: Bl, className: Yt(["react-flow", s, fr]), id: pn, role: "application", children: w.jsxs(Q3, { nodes: t, edges: a, width: st, height: dn, fitView: Me, fitViewOptions: Te, minZoom: Nt, maxZoom: Pt, nodeOrigin: Jt, nodeExtent: Mt, zIndexMode: Yn, children: [w.jsx(bR, { nodes: t, edges: a, defaultNodes: i, defaultEdges: o, onConnect: x, onConnectStart: S, onConnectEnd: A, onClickConnectStart: R, onClickConnectEnd: T, nodesDraggable: it, autoPanOnNodeFocus: Ft, nodesConnectable: pt, nodesFocusable: Gt, edgesFocusable: Et, edgesReconnectable: Qt, elementsSelectable: yt, elevateNodesOnSelect: mt, elevateEdgesOnSelect: We, minZoom: Nt, maxZoom: Pt, nodeExtent: Mt, onNodesChange: he, onEdgesChange: Ee, snapToGrid: Se, snapGrid: De, connectionMode: D, translateExtent: qt, connectOnClick: Be, defaultEdgeOptions: Je, fitView: Me, fitViewOptions: Te, onNodesDelete: P, onEdgesDelete: I, onDelete: J, onNodeDragStart: V, onNodeDrag: C, onNodeDragStop: G, onSelectionDrag: X, onSelectionDragStart: j, onSelectionDragStop: N, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: be, nodeOrigin: Jt, rfId: di, autoPanOnConnect: Ct, autoPanOnNodeDrag: Ke, autoPanSpeed: Tn, onError: gn, connectionRadius: sn, isValidConnection: en, selectNodesOnDrag: nt, nodeDragThreshold: ll, connectionDragThreshold: aa, onBeforeDelete: le, debug: il, ariaLabelConfig: at, zIndexMode: Yn }), w.jsx($3, { onInit: g, onNodeClick: h, onEdgeClick: p, onNodeMouseEnter: L, onNodeMouseMove: E, onNodeMouseLeave: z, onNodeContextMenu: Y, onNodeDoubleClick: U, nodeTypes: u, edgeTypes: f, connectionLineType: k, connectionLineStyle: K, connectionLineComponent: ae, connectionLineContainerStyle: se, selectionKeyCode: ge, selectionOnDrag: ee, selectionMode: pe, deleteKeyCode: me, multiSelectionKeyCode: Ae, panActivationKeyCode: ze, zoomActivationKeyCode: we, onlyRenderVisibleElements: qe, defaultViewport: _t, translateExtent: qt, minZoom: Nt, maxZoom: Pt, preventScrolling: Wt, zoomOnScroll: kn, zoomOnPinch: Nn, zoomOnDoubleClick: nl, panOnScroll: $t, panOnScrollSpeed: Tt, panOnScrollMode: zt, panOnDrag: pa, autoPanOnSelection: ya, onPaneClick: mn, onPaneMouseEnter: ta, onPaneMouseMove: Mn, onPaneMouseLeave: Vn, onPaneScroll: on, onPaneContextMenu: Le, paneClickDistance: ot, nodeClickDistance: Rt, onSelectionContextMenu: O, onSelectionStart: Q, onSelectionEnd: $, onReconnect: fn, onReconnectStart: rt, onReconnectEnd: Xt, onEdgeContextMenu: na, onEdgeDoubleClick: It, onEdgeMouseEnter: H, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: tl, noDragClassName: ve, noWheelClassName: xe, noPanClassName: be, rfId: di, disableKeyboardA11y: Ze, nodeExtent: Mt, viewport: la, onViewportChange: He }), w.jsx(gR, { onSelectionChange: oe }), Ot, w.jsx(cR, { proOptions: Ye, position: Oe }), w.jsx(uR, { rfId: di, disableKeyboardA11y: Ze })] }) });
}
var F3 = H1(K3);
function J3({ dimensions: t, lineWidth: a, variant: i, className: o }) {
  return w.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Yt(["react-flow__background-pattern", i, o]) });
}
function P3({ radius: t, className: a }) {
  return w.jsx("circle", { cx: t, cy: t, r: t, className: Yt(["react-flow__background-pattern", "dots", a]) });
}
var Ta;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(Ta || (Ta = {}));
const W3 = {
  [Ta.Dots]: 1,
  [Ta.Lines]: 1,
  [Ta.Cross]: 6
}, eA = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function sx({
  id: t,
  variant: a = Ta.Dots,
  // only used for dots and cross
  gap: i = 20,
  // only used for lines and cross
  size: o,
  lineWidth: s = 1,
  offset: u = 0,
  color: f,
  bgColor: h,
  style: p,
  className: g,
  patternClassName: y
}) {
  const m = M.useRef(null), { transform: v, patternId: x } = Pe(eA, St), S = o || W3[a], A = a === Ta.Dots, R = a === Ta.Cross, T = Array.isArray(i) ? i : [i, i], L = [T[0] * v[2] || 1, T[1] * v[2] || 1], E = S * v[2], z = Array.isArray(u) ? u : [u, u], Y = R ? [E, E] : L, U = [
    z[0] * v[2] || 1 + Y[0] / 2,
    z[1] * v[2] || 1 + Y[1] / 2
  ], V = `${x}${t || ""}`;
  return w.jsxs("svg", { className: Yt(["react-flow__background", g]), style: {
    ...p,
    ...Qu,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": f
  }, ref: m, "data-testid": "rf__background", children: [w.jsx("pattern", { id: V, x: v[0] % L[0], y: v[1] % L[1], width: L[0], height: L[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${U[0]},-${U[1]})`, children: A ? w.jsx(P3, { radius: E / 2, className: y }) : w.jsx(J3, { dimensions: Y, lineWidth: s, variant: a, className: y }) }), w.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
sx.displayName = "Background";
const vv = M.memo(sx);
function tA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: w.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function nA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: w.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function aA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: w.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function lA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function iA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function lu({ children: t, className: a, ...i }) {
  return w.jsx("button", { type: "button", className: Yt(["react-flow__controls-button", a]), ...i, children: t });
}
const rA = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function ux({ style: t, showZoom: a = !0, showFitView: i = !0, showInteractive: o = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: f, onFitView: h, onInteractiveChange: p, className: g, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = wt(), { isInteractive: A, minZoomReached: R, maxZoomReached: T, ariaLabelConfig: L } = Pe(rA, St), { zoomIn: E, zoomOut: z, fitView: Y } = Bh(), U = () => {
    E(), u?.();
  }, V = () => {
    z(), f?.();
  }, C = () => {
    Y(s), h?.();
  }, G = () => {
    S.setState({
      nodesDraggable: !A,
      nodesConnectable: !A,
      elementsSelectable: !A
    }), p?.(!A);
  }, P = v === "horizontal" ? "horizontal" : "vertical";
  return w.jsxs(Zu, { className: Yt(["react-flow__controls", P, g]), position: m, style: t, "data-testid": "rf__controls", "aria-label": x ?? L["controls.ariaLabel"], children: [a && w.jsxs(w.Fragment, { children: [w.jsx(lu, { onClick: U, className: "react-flow__controls-zoomin", title: L["controls.zoomIn.ariaLabel"], "aria-label": L["controls.zoomIn.ariaLabel"], disabled: T, children: w.jsx(tA, {}) }), w.jsx(lu, { onClick: V, className: "react-flow__controls-zoomout", title: L["controls.zoomOut.ariaLabel"], "aria-label": L["controls.zoomOut.ariaLabel"], disabled: R, children: w.jsx(nA, {}) })] }), i && w.jsx(lu, { className: "react-flow__controls-fitview", onClick: C, title: L["controls.fitView.ariaLabel"], "aria-label": L["controls.fitView.ariaLabel"], children: w.jsx(aA, {}) }), o && w.jsx(lu, { className: "react-flow__controls-interactive", onClick: G, title: L["controls.interactive.ariaLabel"], "aria-label": L["controls.interactive.ariaLabel"], children: A ? w.jsx(iA, {}) : w.jsx(lA, {}) }), y] });
}
ux.displayName = "Controls";
const oA = M.memo(ux);
function sA({ id: t, x: a, y: i, width: o, height: s, style: u, color: f, strokeColor: h, strokeWidth: p, className: g, borderRadius: y, shapeRendering: m, selected: v, onClick: x }) {
  const { background: S, backgroundColor: A } = u || {}, R = f || S || A;
  return w.jsx("rect", { className: Yt(["react-flow__minimap-node", { selected: v }, g]), x: a, y: i, rx: y, ry: y, width: o, height: s, style: {
    fill: R,
    stroke: h,
    strokeWidth: p
  }, shapeRendering: m, onClick: x ? (T) => x(T, t) : void 0 });
}
const uA = M.memo(sA), cA = (t) => t.nodes.map((a) => a.id), Nd = (t) => t instanceof Function ? t : () => t;
function fA({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: i = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = uA,
  onClick: f
}) {
  const h = Pe(cA, St), p = Nd(a), g = Nd(t), y = Nd(i), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return w.jsx(w.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    w.jsx(hA, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: g, nodeClassNameFunc: y, nodeBorderRadius: o, nodeStrokeWidth: s, NodeComponent: u, onClick: f, shapeRendering: m }, v)
  )) });
}
function dA({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: i, nodeClassNameFunc: o, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: f, NodeComponent: h, onClick: p }) {
  const { node: g, x: y, y: m, width: v, height: x } = Pe((S) => {
    const A = S.nodeLookup.get(t);
    if (!A)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const R = A.internals.userNode, { x: T, y: L } = A.internals.positionAbsolute, { width: E, height: z } = el(R);
    return {
      node: R,
      x: T,
      y: L,
      width: E,
      height: z
    };
  }, St);
  return !g || g.hidden || !c1(g) ? null : w.jsx(h, { x: y, y: m, width: v, height: x, style: g.style, selected: !!g.selected, className: o(g), color: a(g), borderRadius: s, strokeColor: i(g), strokeWidth: u, shapeRendering: f, onClick: p, id: g.id });
}
const hA = M.memo(dA);
var mA = M.memo(fA);
const gA = 200, pA = 150, yA = (t) => !t.hidden, vA = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? o1(jo(t.nodeLookup, { filter: yA }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, bA = "react-flow__minimap-desc";
function cx({
  style: t,
  className: a,
  nodeStrokeColor: i,
  nodeColor: o,
  nodeClassName: s = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: f,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: h,
  bgColor: p,
  maskColor: g,
  maskStrokeColor: y,
  maskStrokeWidth: m,
  position: v = "bottom-right",
  onClick: x,
  onNodeClick: S,
  pannable: A = !1,
  zoomable: R = !1,
  ariaLabel: T,
  inversePan: L,
  zoomStep: E = 1,
  offsetScale: z = 5
}) {
  const Y = wt(), U = M.useRef(null), { boundingRect: V, viewBB: C, rfId: G, panZoom: P, translateExtent: I, flowWidth: J, flowHeight: oe, ariaLabelConfig: j } = Pe(vA, St), X = t?.width ?? gA, N = t?.height ?? pA, O = V.width / X, Q = V.height / N, $ = Math.max(O, Q), le = $ * X, D = $ * N, k = z * $, K = V.x - (le - V.width) / 2 - k, ae = V.y - (D - V.height) / 2 - k, se = le + k * 2, me = D + k * 2, ge = `${bA}-${G}`, ee = M.useRef(0), pe = M.useRef();
  ee.current = $, M.useEffect(() => {
    if (U.current && P)
      return pe.current = RC({
        domNode: U.current,
        panZoom: P,
        getTransform: () => Y.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        pe.current?.destroy();
      };
  }, [P]), M.useEffect(() => {
    pe.current?.update({
      translateExtent: I,
      width: J,
      height: oe,
      inversePan: L,
      pannable: A,
      zoomStep: E,
      zoomable: R
    });
  }, [A, R, L, E, I, J, oe]);
  const ze = x ? (Se) => {
    const [De, qe] = pe.current?.pointer(Se) || [0, 0];
    x(Se, { x: De, y: qe });
  } : void 0, Ae = S ? M.useCallback((Se, De) => {
    const qe = Y.getState().nodeLookup.get(De).internals.userNode;
    S(Se, qe);
  }, []) : void 0, we = T ?? j["minimap.ariaLabel"];
  return w.jsx(Zu, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * $ : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof i == "string" ? i : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: Yt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: w.jsxs("svg", { width: X, height: N, viewBox: `${K} ${ae} ${se} ${me}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ge, ref: U, onClick: ze, children: [we && w.jsx("title", { id: ge, children: we }), w.jsx(mA, { onClick: Ae, nodeColor: o, nodeStrokeColor: i, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: f, nodeComponent: h }), w.jsx("path", { className: "react-flow__minimap-mask", d: `M${K - k},${ae - k}h${se + k * 2}v${me + k * 2}h${-se - k * 2}z
        M${C.x},${C.y}h${C.width}v${C.height}h${-C.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
cx.displayName = "MiniMap";
const xA = M.memo(cx), SA = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, wA = {
  [sr.Line]: "right",
  [sr.Handle]: "bottom-right"
};
function EA({ nodeId: t, position: a, variant: i = sr.Handle, className: o, style: s = void 0, children: u, color: f, minWidth: h = 10, minHeight: p = 10, maxWidth: g = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: A, onResize: R, onResizeEnd: T }) {
  const L = V1(), E = typeof t == "string" ? t : L, z = wt(), Y = M.useRef(null), U = i === sr.Handle, V = Pe(M.useCallback(SA(U && x), [U, x]), St), C = M.useRef(null), G = a ?? wA[i];
  M.useEffect(() => {
    if (!(!Y.current || !E))
      return C.current || (C.current = GC({
        domNode: Y.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: I, transform: J, snapGrid: oe, snapToGrid: j, nodeOrigin: X, domNode: N } = z.getState();
          return {
            nodeLookup: I,
            transform: J,
            snapGrid: oe,
            snapToGrid: j,
            nodeOrigin: X,
            paneDomNode: N
          };
        },
        onChange: (I, J) => {
          const { triggerNodeChanges: oe, nodeLookup: j, parentLookup: X, nodeOrigin: N } = z.getState(), O = [], Q = { x: I.x, y: I.y }, $ = j.get(E);
          if ($ && $.expandParent && $.parentId) {
            const le = $.origin ?? N, D = I.width ?? $.measured.width ?? 0, k = I.height ?? $.measured.height ?? 0, K = {
              id: $.id,
              parentId: $.parentId,
              rect: {
                width: D,
                height: k,
                ...f1({
                  x: I.x ?? $.position.x,
                  y: I.y ?? $.position.y
                }, { width: D, height: k }, $.parentId, j, le)
              }
            }, ae = Hh([K], j, X, N);
            O.push(...ae), Q.x = I.x ? Math.max(le[0] * D, I.x) : void 0, Q.y = I.y ? Math.max(le[1] * k, I.y) : void 0;
          }
          if (Q.x !== void 0 && Q.y !== void 0) {
            const le = {
              id: E,
              type: "position",
              position: { ...Q }
            };
            O.push(le);
          }
          if (I.width !== void 0 && I.height !== void 0) {
            const D = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: I.width,
                height: I.height
              }
            };
            O.push(D);
          }
          for (const le of J) {
            const D = {
              ...le,
              type: "position"
            };
            O.push(D);
          }
          oe(O);
        },
        onEnd: ({ width: I, height: J }) => {
          const oe = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: I,
              height: J
            }
          };
          z.getState().triggerNodeChanges([oe]);
        }
      })), C.current.update({
        controlPosition: G,
        boundaries: {
          minWidth: h,
          minHeight: p,
          maxWidth: g,
          maxHeight: y
        },
        keepAspectRatio: m,
        resizeDirection: v,
        onResizeStart: A,
        onResize: R,
        onResizeEnd: T,
        shouldResize: S
      }), () => {
        C.current?.destroy();
      };
  }, [
    G,
    h,
    p,
    g,
    y,
    m,
    A,
    R,
    T,
    S
  ]);
  const P = G.split("-");
  return w.jsx("div", { className: Yt(["react-flow__resize-control", "nodrag", ...P, i, o]), ref: Y, style: {
    ...s,
    scale: V,
    ...f && { [U ? "backgroundColor" : "borderColor"]: f }
  }, children: u });
}
M.memo(EA);
var _A = "_1729v610", NA = "_1729v611";
const bv = 16, MA = "rgba(186, 158, 255, 0.14)", TA = "rgba(186, 158, 255, 0.06)", CA = "rgba(0, 0, 0, 0.6)", RA = "#1d2023", AA = "#ba9eff";
function DA({
  nodes: t,
  edges: a,
  nodeTypes: i,
  showMiniMap: o = !1,
  showControls: s = !0,
  fitView: u = !0,
  className: f,
  ariaLabel: h,
  children: p
}) {
  const g = [_A, f].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("div", { className: g, "aria-label": h ?? "node graph", children: /* @__PURE__ */ w.jsxs(
    F3,
    {
      nodes: t,
      edges: a,
      ...i ? { nodeTypes: i } : {},
      fitView: u,
      fitViewOptions: { padding: 0.2 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !1,
      minZoom: 0.2,
      maxZoom: 1.8,
      proOptions: { hideAttribution: !0 },
      children: [
        /* @__PURE__ */ w.jsx(
          vv,
          {
            id: "minor",
            variant: Ta.Dots,
            gap: bv,
            size: 1.1,
            color: MA
          }
        ),
        /* @__PURE__ */ w.jsx(
          vv,
          {
            id: "major",
            variant: Ta.Lines,
            gap: bv * 5,
            lineWidth: 1,
            color: TA
          }
        ),
        s && /* @__PURE__ */ w.jsx(oA, { showInteractive: !1 }),
        o && /* @__PURE__ */ w.jsx(
          xA,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: CA,
            nodeColor: () => RA,
            nodeStrokeColor: () => AA,
            className: NA
          }
        ),
        p
      ]
    }
  ) });
}
function zA(t) {
  return /* @__PURE__ */ w.jsx(ox, { children: /* @__PURE__ */ w.jsx(DA, { ...t }) });
}
var OA = { neutral: "_160uuo1 _160uuo0", accent: "_160uuo2 _160uuo0", warning: "_160uuo3 _160uuo0", success: "_160uuo4 _160uuo0" };
function fx({ tone: t = "neutral", children: a, className: i }) {
  const o = [OA[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("span", { className: o, children: a });
}
var jA = { primary: "mzxlfs1 mzxlfs0", secondary: "mzxlfs2 mzxlfs0", ghost: "mzxlfs3 mzxlfs0", danger: "mzxlfs4 mzxlfs0" }, LA = { sm: "mzxlfs5", md: "mzxlfs6", lg: "mzxlfs7" }, HA = "mzxlfs9";
function Ja({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: o = !1,
  disabled: s,
  children: u,
  className: f,
  ...h
}) {
  const p = [jA[t], LA[a], f].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs(
    "button",
    {
      type: i,
      className: p,
      disabled: o || s,
      "aria-busy": o || void 0,
      ...h,
      children: [
        o ? /* @__PURE__ */ w.jsx("span", { className: HA, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
var BA = "_1i506u20", UA = "_1i506u21", kA = "_1i506u22", VA = "_1i506u23", YA = "_1i506u24", GA = "_1i506u25", qA = "_1i506u26", $A = "_1i506u27", XA = "_1i506u28";
const ZA = {
  default: "",
  raised: UA,
  inset: kA
};
function pu({
  eyebrow: t,
  title: a,
  description: i,
  actions: o,
  children: s,
  className: u,
  elevation: f = "default"
}) {
  const h = [BA, ZA[f], u].filter(Boolean).join(" "), p = !!(t || a || o);
  return /* @__PURE__ */ w.jsxs("section", { className: h, children: [
    p && /* @__PURE__ */ w.jsxs("header", { className: VA, children: [
      /* @__PURE__ */ w.jsxs("div", { className: YA, children: [
        t && /* @__PURE__ */ w.jsx("span", { className: qA, children: t }),
        a && /* @__PURE__ */ w.jsx("span", { className: $A, children: a }),
        i && /* @__PURE__ */ w.jsx("span", { className: XA, children: i })
      ] }),
      o && /* @__PURE__ */ w.jsx("div", { className: GA, children: o })
    ] }),
    s
  ] });
}
function QA(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const IA = (t) => {
  switch (t) {
    case "success":
      return JA;
    case "info":
      return WA;
    case "warning":
      return PA;
    case "error":
      return eD;
    default:
      return null;
  }
}, KA = Array(12).fill(0), FA = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, KA.map((i, o) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${o}`
})))), JA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), PA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), WA = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), eD = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), tD = /* @__PURE__ */ ye.createElement("svg", {
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
})), nD = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let th = 1;
class aD {
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
      const { message: o, ...s } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : th++, f = this.toasts.find((p) => p.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((p) => p.id === u ? (this.publish({
        ...p,
        ...a,
        id: u,
        title: o
      }), {
        ...p,
        ...a,
        id: u,
        dismissible: h,
        title: o
      }) : p) : this.addToast({
        title: o,
        ...s,
        dismissible: h,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((o) => o({
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
      let o;
      i.loading !== void 0 && (o = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const s = Promise.resolve(a instanceof Function ? a() : a);
      let u = o !== void 0, f;
      const h = s.then(async (g) => {
        if (f = [
          "resolve",
          g
        ], ye.isValidElement(g))
          u = !1, this.create({
            id: o,
            type: "default",
            message: g
          });
        else if (iD(g) && !g.ok) {
          u = !1;
          const m = typeof i.error == "function" ? await i.error(`HTTP error! status: ${g.status}`) : i.error, v = typeof i.description == "function" ? await i.description(`HTTP error! status: ${g.status}`) : i.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "error",
            description: v,
            ...S
          });
        } else if (g instanceof Error) {
          u = !1;
          const m = typeof i.error == "function" ? await i.error(g) : i.error, v = typeof i.description == "function" ? await i.description(g) : i.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "error",
            description: v,
            ...S
          });
        } else if (i.success !== void 0) {
          u = !1;
          const m = typeof i.success == "function" ? await i.success(g) : i.success, v = typeof i.description == "function" ? await i.description(g) : i.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "success",
            description: v,
            ...S
          });
        }
      }).catch(async (g) => {
        if (f = [
          "reject",
          g
        ], i.error !== void 0) {
          u = !1;
          const y = typeof i.error == "function" ? await i.error(g) : i.error, m = typeof i.description == "function" ? await i.description(g) : i.description, x = typeof y == "object" && !ye.isValidElement(y) ? y : {
            message: y
          };
          this.create({
            id: o,
            type: "error",
            description: m,
            ...x
          });
        }
      }).finally(() => {
        u && (this.dismiss(o), o = void 0), i.finally == null || i.finally.call(i);
      }), p = () => new Promise((g, y) => h.then(() => f[0] === "reject" ? y(f[1]) : g(f[1])).catch(y));
      return typeof o != "string" && typeof o != "number" ? {
        unwrap: p
      } : Object.assign(o, {
        unwrap: p
      });
    }, this.custom = (a, i) => {
      const o = i?.id || th++;
      return this.create({
        jsx: a(o),
        id: o,
        ...i
      }), o;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const En = new aD(), lD = (t, a) => {
  const i = a?.id || th++;
  return En.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, iD = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", rD = lD, oD = () => En.toasts, sD = () => En.getActiveToasts(), Pi = Object.assign(rD, {
  success: En.success,
  info: En.info,
  warning: En.warning,
  error: En.error,
  custom: En.custom,
  message: En.message,
  promise: En.promise,
  dismiss: En.dismiss,
  loading: En.loading
}, {
  getHistory: oD,
  getToasts: sD
});
QA("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function iu(t) {
  return t.label !== void 0;
}
const uD = 3, cD = "24px", fD = "16px", xv = 4e3, dD = 356, hD = 14, mD = 45, gD = 200;
function Ea(...t) {
  return t.filter(Boolean).join(" ");
}
function pD(t) {
  const [a, i] = t.split("-"), o = [];
  return a && o.push(a), i && o.push(i), o;
}
const yD = (t) => {
  var a, i, o, s, u, f, h, p, g;
  const { invert: y, toast: m, unstyled: v, interacting: x, setHeights: S, visibleToasts: A, heights: R, index: T, toasts: L, expanded: E, removeToast: z, defaultRichColors: Y, closeButton: U, style: V, cancelButtonStyle: C, actionButtonStyle: G, className: P = "", descriptionClassName: I = "", duration: J, position: oe, gap: j, expandByDefault: X, classNames: N, icons: O, closeButtonAriaLabel: Q = "Close toast" } = t, [$, le] = ye.useState(null), [D, k] = ye.useState(null), [K, ae] = ye.useState(!1), [se, me] = ye.useState(!1), [ge, ee] = ye.useState(!1), [pe, ze] = ye.useState(!1), [Ae, we] = ye.useState(!1), [Se, De] = ye.useState(0), [qe, nt] = ye.useState(0), it = ye.useRef(m.duration || J || xv), Ft = ye.useRef(null), pt = ye.useRef(null), Gt = T === 0, Jt = T + 1 <= A, Et = m.type, Qt = m.dismissible !== !1, yt = m.className || "", _t = m.descriptionClassName || "", Nt = ye.useMemo(() => R.findIndex((Le) => Le.toastId === m.id) || 0, [
    R,
    m.id
  ]), Pt = ye.useMemo(() => {
    var Le;
    return (Le = m.closeButton) != null ? Le : U;
  }, [
    m.closeButton,
    U
  ]), qt = ye.useMemo(() => m.duration || J || xv, [
    m.duration,
    J
  ]), Wt = ye.useRef(0), Mt = ye.useRef(0), tl = ye.useRef(0), kn = ye.useRef(null), [Nn, $t] = oe.split("-"), Tt = ye.useMemo(() => R.reduce((Le, ot, Rt) => Rt >= Nt ? Le : Le + ot.height, 0), [
    R,
    Nt
  ]), zt = nD(), nl = m.invert || y, pa = Et === "loading";
  Mt.current = ye.useMemo(() => Nt * j + Tt, [
    Nt,
    Tt
  ]), ye.useEffect(() => {
    it.current = qt;
  }, [
    qt
  ]), ye.useEffect(() => {
    ae(!0);
  }, []), ye.useEffect(() => {
    const Le = pt.current;
    if (Le) {
      const ot = Le.getBoundingClientRect().height;
      return nt(ot), S((Rt) => [
        {
          toastId: m.id,
          height: ot,
          position: m.position
        },
        ...Rt
      ]), () => S((Rt) => Rt.filter((Ot) => Ot.toastId !== m.id));
    }
  }, [
    S,
    m.id
  ]), ye.useLayoutEffect(() => {
    if (!K) return;
    const Le = pt.current, ot = Le.style.height;
    Le.style.height = "auto";
    const Rt = Le.getBoundingClientRect().height;
    Le.style.height = ot, nt(Rt), S((Ot) => Ot.find((rt) => rt.toastId === m.id) ? Ot.map((rt) => rt.toastId === m.id ? {
      ...rt,
      height: Rt
    } : rt) : [
      {
        toastId: m.id,
        height: Rt,
        position: m.position
      },
      ...Ot
    ]);
  }, [
    K,
    m.title,
    m.description,
    S,
    m.id,
    m.jsx,
    m.action,
    m.cancel
  ]);
  const mn = ye.useCallback(() => {
    me(!0), De(Mt.current), S((Le) => Le.filter((ot) => ot.toastId !== m.id)), setTimeout(() => {
      z(m);
    }, gD);
  }, [
    m,
    z,
    S,
    Mt
  ]);
  ye.useEffect(() => {
    if (m.promise && Et === "loading" || m.duration === 1 / 0 || m.type === "loading") return;
    let Le;
    return E || x || zt ? (() => {
      if (tl.current < Wt.current) {
        const Ot = (/* @__PURE__ */ new Date()).getTime() - Wt.current;
        it.current = it.current - Ot;
      }
      tl.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      it.current !== 1 / 0 && (Wt.current = (/* @__PURE__ */ new Date()).getTime(), Le = setTimeout(() => {
        m.onAutoClose == null || m.onAutoClose.call(m, m), mn();
      }, it.current));
    })(), () => clearTimeout(Le);
  }, [
    E,
    x,
    m,
    Et,
    zt,
    mn
  ]), ye.useEffect(() => {
    m.delete && (mn(), m.onDismiss == null || m.onDismiss.call(m, m));
  }, [
    mn,
    m.delete
  ]);
  function ta() {
    var Le;
    if (O?.loading) {
      var ot;
      return /* @__PURE__ */ ye.createElement("div", {
        className: Ea(N?.loader, m == null || (ot = m.classNames) == null ? void 0 : ot.loader, "sonner-loader"),
        "data-visible": Et === "loading"
      }, O.loading);
    }
    return /* @__PURE__ */ ye.createElement(FA, {
      className: Ea(N?.loader, m == null || (Le = m.classNames) == null ? void 0 : Le.loader),
      visible: Et === "loading"
    });
  }
  const Mn = m.icon || O?.[Et] || IA(Et);
  var Vn, on;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: pt,
    className: Ea(P, yt, N?.toast, m == null || (a = m.classNames) == null ? void 0 : a.toast, N?.default, N?.[Et], m == null || (i = m.classNames) == null ? void 0 : i[Et]),
    "data-sonner-toast": "",
    "data-rich-colors": (Vn = m.richColors) != null ? Vn : Y,
    "data-styled": !(m.jsx || m.unstyled || v),
    "data-mounted": K,
    "data-promise": !!m.promise,
    "data-swiped": Ae,
    "data-removed": se,
    "data-visible": Jt,
    "data-y-position": Nn,
    "data-x-position": $t,
    "data-index": T,
    "data-front": Gt,
    "data-swiping": ge,
    "data-dismissible": Qt,
    "data-type": Et,
    "data-invert": nl,
    "data-swipe-out": pe,
    "data-swipe-direction": D,
    "data-expanded": !!(E || X && K),
    "data-testid": m.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": L.length - T,
      "--offset": `${se ? Se : Mt.current}px`,
      "--initial-height": X ? "auto" : `${qe}px`,
      ...V,
      ...m.style
    },
    onDragEnd: () => {
      ee(!1), le(null), kn.current = null;
    },
    onPointerDown: (Le) => {
      Le.button !== 2 && (pa || !Qt || (Ft.current = /* @__PURE__ */ new Date(), De(Mt.current), Le.target.setPointerCapture(Le.pointerId), Le.target.tagName !== "BUTTON" && (ee(!0), kn.current = {
        x: Le.clientX,
        y: Le.clientY
      })));
    },
    onPointerUp: () => {
      var Le, ot, Rt;
      if (pe || !Qt) return;
      kn.current = null;
      const Ot = Number(((Le = pt.current) == null ? void 0 : Le.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), fn = Number(((ot = pt.current) == null ? void 0 : ot.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Rt = Ft.current) == null ? void 0 : Rt.getTime()), Xt = $ === "x" ? Ot : fn, na = Math.abs(Xt) / rt;
      if (Math.abs(Xt) >= mD || na > 0.11) {
        De(Mt.current), m.onDismiss == null || m.onDismiss.call(m, m), k($ === "x" ? Ot > 0 ? "right" : "left" : fn > 0 ? "down" : "up"), mn(), ze(!0);
        return;
      } else {
        var It, H;
        (It = pt.current) == null || It.style.setProperty("--swipe-amount-x", "0px"), (H = pt.current) == null || H.style.setProperty("--swipe-amount-y", "0px");
      }
      we(!1), ee(!1), le(null);
    },
    onPointerMove: (Le) => {
      var ot, Rt, Ot;
      if (!kn.current || !Qt || ((ot = window.getSelection()) == null ? void 0 : ot.toString().length) > 0) return;
      const rt = Le.clientY - kn.current.y, Xt = Le.clientX - kn.current.x;
      var na;
      const It = (na = t.swipeDirections) != null ? na : pD(oe);
      !$ && (Math.abs(Xt) > 1 || Math.abs(rt) > 1) && le(Math.abs(Xt) > Math.abs(rt) ? "x" : "y");
      let H = {
        x: 0,
        y: 0
      };
      const Z = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if ($ === "y") {
        if (It.includes("top") || It.includes("bottom"))
          if (It.includes("top") && rt < 0 || It.includes("bottom") && rt > 0)
            H.y = rt;
          else {
            const W = rt * Z(rt);
            H.y = Math.abs(W) < Math.abs(rt) ? W : rt;
          }
      } else if ($ === "x" && (It.includes("left") || It.includes("right")))
        if (It.includes("left") && Xt < 0 || It.includes("right") && Xt > 0)
          H.x = Xt;
        else {
          const W = Xt * Z(Xt);
          H.x = Math.abs(W) < Math.abs(Xt) ? W : Xt;
        }
      (Math.abs(H.x) > 0 || Math.abs(H.y) > 0) && we(!0), (Rt = pt.current) == null || Rt.style.setProperty("--swipe-amount-x", `${H.x}px`), (Ot = pt.current) == null || Ot.style.setProperty("--swipe-amount-y", `${H.y}px`);
    }
  }, Pt && !m.jsx && Et !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": Q,
    "data-disabled": pa,
    "data-close-button": !0,
    onClick: pa || !Qt ? () => {
    } : () => {
      mn(), m.onDismiss == null || m.onDismiss.call(m, m);
    },
    className: Ea(N?.closeButton, m == null || (o = m.classNames) == null ? void 0 : o.closeButton)
  }, (on = O?.close) != null ? on : tD) : null, (Et || m.icon || m.promise) && m.icon !== null && (O?.[Et] !== null || m.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Ea(N?.icon, m == null || (s = m.classNames) == null ? void 0 : s.icon)
  }, m.promise || m.type === "loading" && !m.icon ? m.icon || ta() : null, m.type !== "loading" ? Mn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Ea(N?.content, m == null || (u = m.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Ea(N?.title, m == null || (f = m.classNames) == null ? void 0 : f.title)
  }, m.jsx ? m.jsx : typeof m.title == "function" ? m.title() : m.title), m.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Ea(I, _t, N?.description, m == null || (h = m.classNames) == null ? void 0 : h.description)
  }, typeof m.description == "function" ? m.description() : m.description) : null), /* @__PURE__ */ ye.isValidElement(m.cancel) ? m.cancel : m.cancel && iu(m.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: m.cancelButtonStyle || C,
    onClick: (Le) => {
      iu(m.cancel) && Qt && (m.cancel.onClick == null || m.cancel.onClick.call(m.cancel, Le), mn());
    },
    className: Ea(N?.cancelButton, m == null || (p = m.classNames) == null ? void 0 : p.cancelButton)
  }, m.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(m.action) ? m.action : m.action && iu(m.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: m.actionButtonStyle || G,
    onClick: (Le) => {
      iu(m.action) && (m.action.onClick == null || m.action.onClick.call(m.action, Le), !Le.defaultPrevented && mn());
    },
    className: Ea(N?.actionButton, m == null || (g = m.classNames) == null ? void 0 : g.actionButton)
  }, m.action.label) : null);
};
function Sv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function vD(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((o, s) => {
    const u = s === 1, f = u ? "--mobile-offset" : "--offset", h = u ? fD : cD;
    function p(g) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        i[`${f}-${y}`] = typeof g == "number" ? `${g}px` : g;
      });
    }
    typeof o == "number" || typeof o == "string" ? p(o) : typeof o == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((g) => {
      o[g] === void 0 ? i[`${f}-${g}`] = h : i[`${f}-${g}`] = typeof o[g] == "number" ? `${o[g]}px` : o[g];
    }) : p(h);
  }), i;
}
const bD = /* @__PURE__ */ ye.forwardRef(function(a, i) {
  const { id: o, invert: s, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: p, className: g, offset: y, mobileOffset: m, theme: v = "light", richColors: x, duration: S, style: A, visibleToasts: R = uD, toastOptions: T, dir: L = Sv(), gap: E = hD, icons: z, containerAriaLabel: Y = "Notifications" } = a, [U, V] = ye.useState([]), C = ye.useMemo(() => o ? U.filter((K) => K.toasterId === o) : U.filter((K) => !K.toasterId), [
    U,
    o
  ]), G = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(C.filter((K) => K.position).map((K) => K.position)))), [
    C,
    u
  ]), [P, I] = ye.useState([]), [J, oe] = ye.useState(!1), [j, X] = ye.useState(!1), [N, O] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), Q = ye.useRef(null), $ = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), le = ye.useRef(null), D = ye.useRef(!1), k = ye.useCallback((K) => {
    V((ae) => {
      var se;
      return (se = ae.find((me) => me.id === K.id)) != null && se.delete || En.dismiss(K.id), ae.filter(({ id: me }) => me !== K.id);
    });
  }, []);
  return ye.useEffect(() => En.subscribe((K) => {
    if (K.dismiss) {
      requestAnimationFrame(() => {
        V((ae) => ae.map((se) => se.id === K.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      nR.flushSync(() => {
        V((ae) => {
          const se = ae.findIndex((me) => me.id === K.id);
          return se !== -1 ? [
            ...ae.slice(0, se),
            {
              ...ae[se],
              ...K
            },
            ...ae.slice(se + 1)
          ] : [
            K,
            ...ae
          ];
        });
      });
    });
  }), [
    U
  ]), ye.useEffect(() => {
    if (v !== "system") {
      O(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? O("dark") : O("light")), typeof window > "u") return;
    const K = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      K.addEventListener("change", ({ matches: ae }) => {
        O(ae ? "dark" : "light");
      });
    } catch {
      K.addListener(({ matches: se }) => {
        try {
          O(se ? "dark" : "light");
        } catch (me) {
          console.error(me);
        }
      });
    }
  }, [
    v
  ]), ye.useEffect(() => {
    U.length <= 1 && oe(!1);
  }, [
    U
  ]), ye.useEffect(() => {
    const K = (ae) => {
      var se;
      if (f.every((ee) => ae[ee] || ae.code === ee)) {
        var ge;
        oe(!0), (ge = Q.current) == null || ge.focus();
      }
      ae.code === "Escape" && (document.activeElement === Q.current || (se = Q.current) != null && se.contains(document.activeElement)) && oe(!1);
    };
    return document.addEventListener("keydown", K), () => document.removeEventListener("keydown", K);
  }, [
    f
  ]), ye.useEffect(() => {
    if (Q.current)
      return () => {
        le.current && (le.current.focus({
          preventScroll: !0
        }), le.current = null, D.current = !1);
      };
  }, [
    Q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: i,
    "aria-label": `${Y} ${$}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, G.map((K, ae) => {
    var se;
    const [me, ge] = K.split("-");
    return C.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: K,
      dir: L === "auto" ? Sv() : L,
      tabIndex: -1,
      ref: Q,
      className: g,
      "data-sonner-toaster": !0,
      "data-sonner-theme": N,
      "data-y-position": me,
      "data-x-position": ge,
      style: {
        "--front-toast-height": `${((se = P[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${dD}px`,
        "--gap": `${E}px`,
        ...A,
        ...vD(y, m)
      },
      onBlur: (ee) => {
        D.current && !ee.currentTarget.contains(ee.relatedTarget) && (D.current = !1, le.current && (le.current.focus({
          preventScroll: !0
        }), le.current = null));
      },
      onFocus: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || D.current || (D.current = !0, le.current = ee.relatedTarget);
      },
      onMouseEnter: () => oe(!0),
      onMouseMove: () => oe(!0),
      onMouseLeave: () => {
        j || oe(!1);
      },
      onDragEnd: () => oe(!1),
      onPointerDown: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || X(!0);
      },
      onPointerUp: () => X(!1)
    }, C.filter((ee) => !ee.position && ae === 0 || ee.position === K).map((ee, pe) => {
      var ze, Ae;
      return /* @__PURE__ */ ye.createElement(yD, {
        key: ee.id,
        icons: z,
        index: pe,
        toast: ee,
        defaultRichColors: x,
        duration: (ze = T?.duration) != null ? ze : S,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: s,
        visibleToasts: R,
        closeButton: (Ae = T?.closeButton) != null ? Ae : p,
        interacting: j,
        position: K,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: k,
        toasts: C.filter((we) => we.position == ee.position),
        heights: P.filter((we) => we.position == ee.position),
        setHeights: I,
        expandByDefault: h,
        gap: E,
        expanded: J,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
});
class Ku extends Error {
  constructor(a, i, o, s) {
    super(o), this.status = a, this.category = i, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Fu = "/api/v1/extensions/nexus.3d.trellis2";
async function Bo(t, a) {
  const i = t.startsWith("http") ? t : `${Fu}${t}`, o = await fetch(i, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!o.ok) {
    let s = null;
    try {
      s = await o.json();
    } catch {
      s = null;
    }
    throw new Ku(
      o.status,
      s?.category ?? "unknown",
      s?.message ?? o.statusText,
      s?.requestId
    );
  }
  if (o.status !== 204)
    return await o.json();
}
function xD(t, a, i) {
  const o = t.startsWith("http") ? t : `${Fu}${t}`, s = new EventSource(o);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
  }, () => s.close();
}
const SD = {
  seed: 0,
  pipeline_type: "1024_cascade",
  sparse_steps: 12,
  shape_steps: 12,
  texture_steps: 12,
  max_num_tokens: 49152,
  texture_size: 2048,
  metallic: 0,
  simplify_target: 1e6,
  texture: !1,
  remove_background: !0,
  residency: "balanced"
}, Hl = [
  "load",
  "encode",
  "sparse",
  "shape",
  "texture",
  "decode",
  "glb"
];
function kh() {
  const t = {};
  for (const a of Hl) t[a] = "idle";
  return t;
}
const nr = {
  phase: "idle",
  stage: null,
  step: 0,
  totalSteps: 0,
  overallFraction: 0,
  stageStates: kh(),
  glbRef: null,
  thumbnailRef: null,
  metadata: null,
  errorCode: null,
  errorMessage: null
};
function nh() {
  return { ...nr, stageStates: kh(), phase: "running" };
}
function Vh(t) {
  return Hl.includes(t);
}
function wD(t, a) {
  if (!Vh(a)) return t;
  const i = { ...t };
  let o = !1;
  for (const s of Hl)
    s === a ? (i[s] = "active", o = !0) : o || (i[s] = "done");
  return i;
}
function ED(t, a, i) {
  const o = i > 0 ? Math.min(1, a / i) : 0, s = Vh(t) ? Hl.indexOf(t) : 0, u = 1 / Hl.length;
  return Math.min(0.99, u * (s + o));
}
function _D(t, a) {
  switch (a.method) {
    case "trellis2.generate.progress": {
      const { stage: i, step: o, total: s } = a.params, u = ED(i, o, s);
      return {
        ...t,
        phase: "running",
        stage: i,
        step: o,
        totalSteps: s,
        overallFraction: Math.max(t.overallFraction, u),
        stageStates: wD(t.stageStates, i)
      };
    }
    case "trellis2.generate.done": {
      const i = kh();
      for (const o of Hl) i[o] = "done";
      return {
        ...t,
        phase: "done",
        overallFraction: 1,
        stageStates: i,
        glbRef: a.params.glbRef,
        thumbnailRef: null,
        metadata: a.params.metadata ?? null
      };
    }
    case "trellis2.generate.error": {
      const i = { ...t.stageStates };
      return t.stage && Vh(t.stage) && (i[t.stage] = "error"), {
        ...t,
        phase: "error",
        stageStates: i,
        errorCode: a.params.code,
        errorMessage: a.params.message
      };
    }
    default:
      return t;
  }
}
function wv(t) {
  return { ...t, phase: "cancelled" };
}
function Md(t, a, i, o) {
  return {
    id: t,
    title: a,
    blurb: i,
    fields: [
      {
        key: `${t}_guidance_strength`,
        label: "Strength",
        placeholder: o.strength,
        min: 0,
        max: 100,
        step: 0.1,
        help: "Classifier-free guidance scale. Higher pulls harder toward the prompt/image."
      },
      {
        key: `${t}_guidance_rescale`,
        label: "Rescale",
        placeholder: o.rescale,
        min: 0,
        max: 1,
        step: 0.05,
        help: "CFG-rescale factor (0–1) that tames over-saturation from high strength."
      },
      {
        key: `${t}_rescale_t`,
        label: "Rescale t",
        placeholder: o.rescaleT,
        min: 0,
        max: 10,
        step: 0.1,
        help: "Timestep above which rescale is applied."
      },
      {
        key: `${t}_guidance_interval_start`,
        label: "Interval start",
        placeholder: o.intervalStart,
        min: 0,
        max: 1,
        step: 0.05,
        help: "Start of the guided window (0–1). Set both start and end to take effect."
      },
      {
        key: `${t}_guidance_interval_end`,
        label: "Interval end",
        placeholder: o.intervalEnd,
        min: 0,
        max: 1,
        step: 0.05,
        help: "End of the guided window (0–1). Set both start and end to take effect."
      }
    ]
  };
}
const dx = [
  Md("sparse", "Sparse structure", "Coarse O-Voxel structure stage.", {
    strength: "7.5",
    rescale: "0.7",
    rescaleT: "5.0",
    intervalStart: "0.3",
    intervalEnd: "1.0"
  }),
  Md("shape", "Shape", "Mesh refinement stage.", {
    strength: "7.5",
    rescale: "0.5",
    rescaleT: "3.0",
    intervalStart: "0.3",
    intervalEnd: "1.0"
  }),
  Md("texture", "Texture", "Texture-bake stage (used only when Bake texture is on).", {
    strength: "1.0",
    rescale: "0.0",
    rescaleT: "3.0",
    intervalStart: "0.6",
    intervalEnd: "0.9"
  })
], hx = dx.flatMap(
  (t) => t.fields.map((a) => a.key)
);
new Set(hx);
const mx = [
  ["sparse_guidance_interval_start", "sparse_guidance_interval_end"],
  ["shape_guidance_interval_start", "shape_guidance_interval_end"],
  ["texture_guidance_interval_start", "texture_guidance_interval_end"]
];
function ND(t) {
  return mx.some(([a, i]) => t === a || t === i);
}
function Td(t) {
  if (t === void 0) return null;
  const a = t.trim();
  if (a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) ? i : null;
}
function MD(t) {
  const a = {};
  for (const i of hx) {
    if (ND(i)) continue;
    const o = Td(t[i]);
    o !== null && (a[i] = o);
  }
  for (const [i, o] of mx) {
    const s = Td(t[i]), u = Td(t[o]);
    s !== null && u !== null && (a[i] = s, a[o] = u);
  }
  return a;
}
async function TD(t) {
  return Bo("/generate/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function CD(t) {
  return Bo(`/generate/jobs/${encodeURIComponent(t)}/cancel`, {
    method: "POST",
    body: "{}"
  });
}
function RD(t, a, i) {
  return xD(
    `/generate/jobs/${encodeURIComponent(t)}/events`,
    a
  );
}
async function AD(t = 25) {
  return Bo(`/generate/jobs?limit=${t}`);
}
async function Ev(t) {
  return Bo(`/generate/jobs/${encodeURIComponent(t)}`);
}
async function DD(t) {
  await Bo(`/generate/jobs/${encodeURIComponent(t)}`, { method: "DELETE" });
}
const Yh = "nexus.3d.trellis2.active-job";
function zD(t) {
  try {
    sessionStorage.setItem(Yh, JSON.stringify({ jobId: t }));
  } catch {
  }
}
function ru() {
  try {
    sessionStorage.removeItem(Yh);
  } catch {
  }
}
function Cd() {
  try {
    const t = sessionStorage.getItem(Yh);
    if (!t) return null;
    const a = JSON.parse(t);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
function Rd(t) {
  return t.status === "succeeded" ? {
    ...nr,
    phase: "done",
    overallFraction: 1,
    glbRef: t.glbRef,
    thumbnailRef: null,
    metadata: t.metadata
  } : t.status === "failed" ? {
    ...nr,
    phase: "error",
    errorCode: t.errorCode,
    errorMessage: t.errorMessage
  } : t.status === "cancelled" ? { ...nr, phase: "cancelled" } : nh();
}
const gx = M.createContext(null);
function OD({ children: t }) {
  const [a, i] = M.useState(() => ({ ...SD })), [o, s] = M.useState({}), [u, f] = M.useState(null), [h, p] = M.useState(null), [g, y] = M.useState(nr), m = M.useRef(null), v = M.useRef(g);
  v.current = g;
  const x = M.useCallback((C) => {
    m.current?.(), m.current = RD(C, (G) => {
      y((P) => _D(P, G));
    });
  }, []), S = M.useCallback(
    (C, G) => {
      i((P) => ({ ...P, [C]: G }));
    },
    []
  ), A = M.useCallback((C) => {
    i((G) => ({ ...G, ...C }));
  }, []), R = M.useCallback((C, G) => {
    s((P) => ({ ...P, [C]: G }));
  }, []), T = M.useCallback((C, G) => {
    f(C), p(G);
  }, []), L = M.useCallback(() => {
    f(null), p(null);
  }, []), E = M.useCallback(() => {
    m.current?.(), m.current = null, ru(), y(nr);
  }, []), z = M.useCallback(async () => {
    if (!u) return;
    m.current?.();
    const C = MD(o), G = { image: u, params: { ...a, ...C } }, { jobId: P } = await TD(G);
    y(nh()), zD(P), x(P);
  }, [u, a, o, x]), Y = M.useCallback(async () => {
    const C = Cd();
    if (!C) {
      y((P) => wv(P));
      return;
    }
    const { status: G } = await CD(C);
    G !== "cancelling" && (m.current?.(), m.current = null, ru(), y((P) => wv(P)));
  }, []), U = M.useCallback(async (C) => {
    m.current?.(), m.current = null;
    try {
      const G = await Ev(C.id);
      y(Rd(G));
    } catch {
      y(Rd(C));
    }
  }, []);
  M.useEffect(() => {
    (g.phase === "done" || g.phase === "error" || g.phase === "cancelled") && ru();
  }, [g.phase]), M.useEffect(() => {
    const C = () => {
      if (v.current.phase !== "running") return;
      const J = Cd();
      J && x(J);
    }, G = () => {
      document.visibilityState === "visible" && C();
    }, P = () => C();
    return document.addEventListener("visibilitychange", G), window.addEventListener("focus", P), () => {
      document.removeEventListener("visibilitychange", G), window.removeEventListener("focus", P);
    };
  }, [x]), M.useEffect(() => {
    const C = Cd();
    if (!C) return;
    let G = !1;
    return Ev(C).then((P) => {
      if (!G) {
        if (P.status === "queued" || P.status === "running") {
          y(nh()), x(C);
          return;
        }
        ru(), y(Rd(P));
      }
    }).catch(() => {
    }), () => {
      G = !0;
    };
  }, [x]), M.useEffect(() => () => {
    m.current?.(), m.current = null;
  }, []);
  const V = M.useMemo(
    () => ({
      params: a,
      guidanceDraft: o,
      imageRef: u,
      imageName: h,
      generate: g,
      updateParam: S,
      applyParams: A,
      setGuidance: R,
      setImage: T,
      clearImage: L,
      startJob: z,
      cancelJob: Y,
      resetGenerate: E,
      showJobResult: U
    }),
    [
      a,
      o,
      u,
      h,
      g,
      S,
      A,
      R,
      T,
      L,
      z,
      Y,
      E,
      U
    ]
  );
  return /* @__PURE__ */ w.jsx(gx.Provider, { value: V, children: t });
}
function cr() {
  const t = M.useContext(gx);
  if (!t)
    throw new Error("useGenerateRequest must be used within GenerateRequestProvider");
  return t;
}
function px() {
  const { imageRef: t, generate: a, startJob: i, cancelJob: o } = cr(), s = !t, u = a.phase === "running", f = M.useCallback(async () => {
    if (s) {
      Pi.error("Upload an input image before generating.");
      return;
    }
    try {
      await i(), Pi.success("Generation started.");
    } catch (p) {
      const g = p instanceof Ku ? p.message : "Could not start the generation.";
      Pi.error(g);
    }
  }, [s, i]), h = M.useCallback(async () => {
    try {
      await o();
    } catch {
      Pi.error("Could not cancel the generation.");
    }
  }, [o]);
  return M.useEffect(() => s2(() => void f()), [f]), M.useEffect(() => {
    o2({ busy: u, blocked: s });
  }, [u, s]), { blocked: s, busy: u, submit: f, cancel: h };
}
const jD = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB"
}, LD = {
  load: "Weights → VRAM",
  encode: "DINOv3 features",
  sparse: "O-Voxel layout",
  shape: "Structured latents",
  texture: "Albedo bake",
  decode: "Watertight mesh",
  glb: "glTF artifact"
}, HD = 220, BD = 80;
function UD({
  stageStates: t,
  textureEnabled: a
}) {
  const i = Hl.filter(
    (u) => u !== "texture" || a
  ), o = i.map((u, f) => ({
    id: u,
    type: "dagStage",
    position: { x: f * HD, y: BD },
    data: {
      label: jD[u],
      caption: LD[u],
      state: t[u],
      index: f,
      total: i.length
    }
  })), s = [];
  for (let u = 1; u < i.length; u += 1) {
    const f = i[u - 1], h = i[u];
    if (!f || !h) continue;
    const p = t[h] === "active";
    s.push({
      id: `${f}->${h}`,
      source: f,
      target: h,
      animated: p,
      style: {
        stroke: p ? "var(--accent, #ba9eff)" : "color-mix(in oklab, var(--outline-variant, #46484a) 70%, transparent)",
        strokeWidth: p ? 2 : 1.5
      }
    });
  }
  return { nodes: o, edges: s };
}
var kD = "_1igljo10", VD = "_1igljo11", YD = "_1igljo12", GD = "_1igljo13", qD = "_1igljo14", $D = "_1igljo15", XD = "_1igljo16", ZD = "_1igljo17", QD = { idle: "m9fvj82 m9fvj81", active: "m9fvj83 m9fvj81", done: "m9fvj84 m9fvj81", error: "m9fvj85 m9fvj81" }, ID = "m9fvj86", KD = "m9fvj87", FD = { idle: "m9fvj89 m9fvj88", active: "m9fvj8a m9fvj88", done: "m9fvj8b m9fvj88", error: "m9fvj8c m9fvj88" }, JD = { idle: "m9fvj8f m9fvj8e", active: "m9fvj8g m9fvj8e", done: "m9fvj8h m9fvj8e", error: "m9fvj8i m9fvj8e" }, PD = "m9fvj8j", WD = "m9fvj8k", _v = "m9fvj8l";
const ez = {
  idle: "idle",
  active: "running",
  done: "done",
  error: "failed"
};
function tz({ data: t }) {
  const a = t, { state: i } = a, o = `${a.index + 1}/${a.total}`;
  return /* @__PURE__ */ w.jsxs("div", { className: QD[i], children: [
    /* @__PURE__ */ w.jsx(ur, { type: "target", position: Ce.Left, className: _v }),
    /* @__PURE__ */ w.jsxs("div", { className: ID, children: [
      /* @__PURE__ */ w.jsx("span", { className: KD, children: o }),
      /* @__PURE__ */ w.jsxs("span", { className: FD[i], children: [
        /* @__PURE__ */ w.jsx("span", { className: JD[i], "aria-hidden": "true" }),
        ez[i]
      ] })
    ] }),
    /* @__PURE__ */ w.jsx("span", { className: PD, children: a.label }),
    /* @__PURE__ */ w.jsx("span", { className: WD, children: a.caption }),
    /* @__PURE__ */ w.jsx(ur, { type: "source", position: Ce.Right, className: _v })
  ] });
}
const nz = {
  dagStage: tz
}, az = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, lz = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB"
};
function iz() {
  const { params: t, generate: a } = cr(), { busy: i, blocked: o, submit: s, cancel: u } = px(), f = !!t.texture, h = M.useMemo(
    () => UD({ stageStates: a.stageStates, textureEnabled: f }),
    [a.stageStates, f]
  ), p = Hl.filter(
    (g) => g !== "texture" || f
  );
  return /* @__PURE__ */ w.jsxs("div", { className: kD, children: [
    /* @__PURE__ */ w.jsx("div", { className: VD, children: /* @__PURE__ */ w.jsx(
      zA,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: nz,
        ariaLabel: "TRELLIS 2 image-to-3D workflow graph"
      }
    ) }),
    /* @__PURE__ */ w.jsx("div", { className: YD, children: /* @__PURE__ */ w.jsxs(
      pu,
      {
        elevation: "raised",
        title: "Workflow",
        description: "load → encode → sparse → shape → texture → decode → glb. Live state mirrors the worker.",
        children: [
          /* @__PURE__ */ w.jsx("div", { className: GD, children: p.map((g, y) => /* @__PURE__ */ w.jsxs("div", { className: qD, children: [
            /* @__PURE__ */ w.jsxs("span", { className: $D, children: [
              /* @__PURE__ */ w.jsx("span", { className: XD, children: String(y + 1).padStart(2, "0") }),
              /* @__PURE__ */ w.jsx("span", { children: lz[g] })
            ] }),
            /* @__PURE__ */ w.jsx(fx, { tone: az[a.stageStates[g]], children: a.stageStates[g] })
          ] }, g)) }),
          /* @__PURE__ */ w.jsx("div", { className: ZD, children: i ? /* @__PURE__ */ w.jsx(Ja, { variant: "danger", onClick: () => void u(), children: "Cancel generation" }) : /* @__PURE__ */ w.jsx(Ja, { onClick: () => void s(), disabled: o, children: "Generate" }) })
        ]
      }
    ) })
  ] });
}
function rz(t) {
  const [a, i] = M.useState([]), [o, s] = M.useState(!0), [u, f] = M.useState(0), h = M.useCallback(() => f((g) => g + 1), []), p = M.useCallback(async (g) => {
    i((y) => y.filter((m) => m.id !== g)), await DD(g);
  }, []);
  return M.useEffect(() => {
    let g = !1;
    return s(!0), AD().then((y) => {
      g || i(y.jobs);
    }).catch(() => {
    }).finally(() => {
      g || s(!1);
    }), () => {
      g = !0;
    };
  }, [u, t]), { jobs: a, loading: o, reload: h, remove: p };
}
var oz = "qi7dyl0", sz = "qi7dyl1", uz = "qi7dyl2", cz = "qi7dyl3", yx = "qi7dyl4", fz = "qi7dyl5", dz = "qi7dyl7 qi7dyl6", hz = "qi7dyl8 qi7dyl6", Nv = "qi7dyl9", mz = "qi7dyla", gz = "qi7dylb", pz = "qi7dylc", yz = "qi7dyld";
function Mv({
  spec: t,
  value: a,
  error: i,
  onChange: o,
  disabled: s = !1
}) {
  const u = M.useId(), f = `${u}-help`, h = i ? `${u}-error` : f;
  return /* @__PURE__ */ w.jsxs("div", { className: oz, children: [
    /* @__PURE__ */ w.jsxs("div", { className: sz, children: [
      /* @__PURE__ */ w.jsx("label", { className: uz, htmlFor: u, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ w.jsx("span", { className: cz, children: bz(a, t.step) })
    ] }),
    vz(t, a, o, u, h, i !== void 0, s),
    /* @__PURE__ */ w.jsx("span", { id: f, className: yx, children: t.help }),
    i && /* @__PURE__ */ w.jsx("span", { id: `${u}-error`, role: "alert", className: fz, children: i })
  ] });
}
function vz(t, a, i, o, s, u, f) {
  switch (t.control) {
    case "toggle": {
      const h = !!a;
      return /* @__PURE__ */ w.jsxs("div", { className: gz, children: [
        /* @__PURE__ */ w.jsx(
          "button",
          {
            type: "button",
            id: o,
            role: "switch",
            "aria-checked": h,
            "aria-describedby": s,
            disabled: f,
            className: pz,
            onClick: () => i(!h),
            children: /* @__PURE__ */ w.jsx("span", { className: yz, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ w.jsx("span", { className: yx, children: h ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ w.jsx(
        "select",
        {
          id: o,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: [hz, u ? Nv : ""].filter(Boolean).join(" "),
          value: String(a ?? t.default ?? ""),
          onChange: (h) => i(t.numeric ? Number(h.target.value) : h.target.value),
          children: t.options?.map((h) => /* @__PURE__ */ w.jsx("option", { value: h.value, children: h.label }, h.value))
        }
      );
    case "slider": {
      const h = Tv(a, t), p = t.min ?? 0, g = t.max ?? 100, m = { "--trellis2-slider-fill": `${g > p ? (h - p) / (g - p) * 100 : 0}%` };
      return /* @__PURE__ */ w.jsx(
        "input",
        {
          id: o,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: mz,
          style: m,
          min: t.min,
          max: t.max,
          step: t.step,
          value: h,
          onChange: (v) => i(Number(v.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ w.jsx(
        "input",
        {
          id: o,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: [dz, u ? Nv : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: Tv(a, t),
          onChange: (h) => i(Number(h.target.value))
        }
      );
  }
}
function Tv(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function bz(t, a) {
  return typeof t != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(t) ? String(t) : t.toFixed(2) : t.toFixed(a >= 0.1 ? 1 : 2);
}
const vx = [
  {
    key: "seed",
    label: "Seed",
    help: "Deterministic seed. 0 draws a fresh random structure each run.",
    control: "number",
    min: 0,
    max: 2147483647,
    step: 1,
    default: 0
  },
  {
    key: "sparse_steps",
    label: "Sparse steps",
    help: "O-Voxel sparse-structure flow steps. More steps sharpen coarse shape.",
    control: "slider",
    min: 4,
    max: 50,
    step: 1,
    default: 12
  },
  {
    key: "pipeline_type",
    label: "Detail preset",
    help: "512 is fastest and lowest detail; 1536 cascade is the highest detail (more VRAM and time).",
    control: "select",
    default: "1024_cascade",
    advanced: !0,
    options: [
      { value: "512", label: "512 — fastest" },
      { value: "1024", label: "1024" },
      { value: "1024_cascade", label: "1024 cascade" },
      { value: "1536_cascade", label: "1536 cascade — highest" }
    ]
  },
  {
    key: "shape_steps",
    label: "Shape steps",
    help: "Mesh refinement flow steps. More steps add surface detail; past ~25 the gain is negligible.",
    control: "slider",
    min: 4,
    max: 50,
    step: 1,
    default: 12,
    advanced: !0
  },
  {
    key: "texture_steps",
    label: "Texture steps",
    help: "Texture-bake flow steps. Only used when Bake texture is on; past ~25 the gain is negligible.",
    control: "slider",
    min: 1,
    max: 100,
    step: 1,
    default: 12,
    advanced: !0
  },
  {
    key: "texture_size",
    label: "Texture resolution",
    help: "Baked texture size in pixels. 4096 is sharper but larger file and more VRAM.",
    control: "select",
    numeric: !0,
    default: 2048,
    advanced: !0,
    options: [
      { value: "1024", label: "1024" },
      { value: "2048", label: "2048" },
      { value: "4096", label: "4096" },
      { value: "8192", label: "8192" }
    ]
  },
  {
    key: "metallic",
    label: "Metallic",
    help: "0 = matte/dielectric (default); raise for metal subjects. TRELLIS bakes a spurious full-metalness, so 0 makes the baked color render correctly.",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    advanced: !0
  },
  {
    key: "max_num_tokens",
    label: "Max tokens",
    help: "Voxel-token cap on the high-res shape stage — only affects the 1536 cascade. Lower forces a smaller effective resolution; 0 = uncapped (full resolution).",
    control: "number",
    min: 0,
    max: 131072,
    step: 4096,
    default: 49152,
    advanced: !0
  },
  {
    key: "simplify_target",
    label: "Triangle budget",
    help: "Decimation target (faces). ~50K game-ready · ~500K balanced · 1M+ archival. Lower exports lighter meshes.",
    control: "number",
    min: 1e3,
    max: 5e6,
    step: 1e3,
    default: 1e6,
    advanced: !0
  },
  {
    key: "residency",
    label: "Residency",
    help: "Balanced keeps weights resident; Low VRAM offloads between stages.",
    control: "select",
    default: "balanced",
    advanced: !0,
    options: [
      { value: "balanced", label: "Balanced" },
      { value: "low_vram", label: "Low VRAM" }
    ]
  }
], xz = vx.filter(
  (t) => !t.advanced
), Sz = vx.filter(
  (t) => t.advanced
);
function wz(t, a) {
  return t.gate ? t.gate.in.includes(String(a[t.gate.key])) : !0;
}
const Ez = [{ id: "fast", label: "Fast", hint: "512 · quick draft", params: { pipeline_type: "512", sparse_steps: 8, shape_steps: 8, texture_steps: 8, texture_size: 1024, max_num_tokens: 49152, simplify_target: 1e5 } }, { id: "balanced", label: "Balanced", hint: "1024 cascade · default", params: { pipeline_type: "1024_cascade", sparse_steps: 12, shape_steps: 12, texture_steps: 12, texture_size: 2048, max_num_tokens: 49152, simplify_target: 1e6 } }, { id: "max", label: "Max detail", hint: "1536 cascade · slow", params: { pipeline_type: "1536_cascade", sparse_steps: 20, shape_steps: 25, texture_steps: 25, texture_size: 4096, max_num_tokens: 98304, simplify_target: 1e6 } }], _z = {
  presets: Ez
}, Nz = [
  "pipeline_type",
  "sparse_steps",
  "shape_steps",
  "texture_steps",
  "texture_size",
  "max_num_tokens",
  "simplify_target"
], bx = _z.presets.map((t) => ({
  id: t.id,
  label: t.label,
  hint: t.hint,
  params: t.params
}));
function Mz(t) {
  for (const a of bx)
    if (Nz.every((i) => t[i] === a.params[i]))
      return a.id;
  return null;
}
var Tz = "ax1idp0", Cz = "ax1idp1", Rz = "ax1idp2", Az = "ax1idp3", Dz = "ax1idp4", zz = "ax1idp5", Oz = "ax1idp6", jz = "ax1idp7", Lz = "ax1idp8", Hz = "ax1idp9", Bz = "ax1idpa", Uz = "ax1idpb", kz = "ax1idpc", Vz = "ax1idpd", Yz = "ax1idpe";
function Gz({ disabled: t = !1 }) {
  const [a, i] = M.useState(!1), o = M.useId();
  return /* @__PURE__ */ w.jsxs("section", { className: Tz, children: [
    /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        className: Cz,
        "aria-expanded": a,
        "aria-controls": o,
        onClick: () => i((s) => !s),
        children: [
          /* @__PURE__ */ w.jsx("span", { className: Rz, children: "Guidance (per-stage CFG)" }),
          /* @__PURE__ */ w.jsx("span", { className: Az, "data-open": a, "aria-hidden": "true", children: "expand_more" })
        ]
      }
    ),
    a && /* @__PURE__ */ w.jsxs("div", { id: o, className: zz, children: [
      /* @__PURE__ */ w.jsx("p", { className: Dz, children: "Optional overrides. Leave a field blank to inherit the model's tuned default (shown as the hint). Interval start and end only apply when both are set." }),
      dx.map((s) => /* @__PURE__ */ w.jsx(qz, { stage: s, disabled: t }, s.id))
    ] })
  ] });
}
function qz({
  stage: t,
  disabled: a
}) {
  return /* @__PURE__ */ w.jsxs("fieldset", { className: Oz, disabled: a, children: [
    /* @__PURE__ */ w.jsxs("legend", { className: jz, children: [
      /* @__PURE__ */ w.jsx("span", { className: Lz, children: t.title }),
      /* @__PURE__ */ w.jsx("span", { className: Hz, children: t.blurb })
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: Bz, children: t.fields.map((i) => /* @__PURE__ */ w.jsx($z, { field: i }, i.key)) })
  ] });
}
function $z({ field: t }) {
  const { guidanceDraft: a, setGuidance: i } = cr(), o = M.useId(), s = `${o}-help`, u = a[t.key] ?? "";
  return /* @__PURE__ */ w.jsxs("div", { className: Uz, children: [
    /* @__PURE__ */ w.jsx("label", { className: kz, htmlFor: o, children: t.label }),
    /* @__PURE__ */ w.jsx(
      "input",
      {
        id: o,
        type: "number",
        inputMode: "decimal",
        className: Vz,
        "aria-describedby": s,
        placeholder: t.placeholder,
        min: t.min,
        max: t.max,
        step: t.step,
        value: u,
        onChange: (f) => i(t.key, f.target.value)
      }
    ),
    /* @__PURE__ */ w.jsx("span", { id: s, className: Yz, children: t.help })
  ] });
}
var Xz = "dab3al0", Zz = "dab3al1", Qz = "dab3al2", Iz = "dab3al3", Kz = "dab3al4", Fz = "dab3al5", Jz = "dab3al6", Pz = "dab3al7", Wz = "dab3al8";
function e5(t, a) {
  const i = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (i.length === 0) return !0;
  const o = t.name.toLowerCase(), s = t.type.toLowerCase();
  return i.some((u) => u.startsWith(".") ? o.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function t5(t, a, i) {
  return a && !e5(t, a) ? `"${t.name}" is not an accepted file type.` : i !== void 0 && t.size > i ? `"${t.name}" exceeds the maximum size.` : null;
}
function n5({
  accept: t,
  maxSizeBytes: a,
  disabled: i = !1,
  label: o,
  hint: s,
  ariaLabel: u,
  className: f,
  renderPreview: h,
  onFile: p
}) {
  const g = M.useRef(null), y = M.useId(), m = M.useId(), [v, x] = M.useState(!1), [S, A] = M.useState(null), [R, T] = M.useState(null), L = M.useCallback(
    (P) => {
      const I = P?.[0];
      if (!I) return;
      const J = t5(I, t, a);
      if (J) {
        A(J);
        return;
      }
      A(null), T(I), p(I);
    },
    [t, a, p]
  ), E = M.useCallback(() => {
    i || g.current?.click();
  }, [i]), z = M.useCallback(
    (P) => {
      i || (P.key === "Enter" || P.key === " ") && (P.preventDefault(), E());
    },
    [i, E]
  ), Y = M.useCallback(
    (P) => {
      P.preventDefault(), x(!1), !i && L(P.dataTransfer.files);
    },
    [i, L]
  ), U = M.useCallback(
    (P) => {
      P.preventDefault(), i || x(!0);
    },
    [i]
  ), V = M.useCallback((P) => {
    P.preventDefault(), x(!1);
  }, []), C = [s ? m : null, S ? y : null].filter(Boolean).join(" "), G = [
    Xz,
    v ? Zz : "",
    i ? Qz : "",
    S !== null ? Iz : "",
    f
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("div", { children: [
    /* @__PURE__ */ w.jsxs(
      "div",
      {
        role: "button",
        tabIndex: i ? -1 : 0,
        "aria-label": u ?? "image dropzone",
        "aria-disabled": i,
        "aria-describedby": C || void 0,
        className: G,
        onClick: E,
        onKeyDown: z,
        onDrop: Y,
        onDragOver: U,
        onDragLeave: V,
        children: [
          /* @__PURE__ */ w.jsx(
            "input",
            {
              ref: g,
              type: "file",
              className: Kz,
              accept: t,
              disabled: i,
              tabIndex: -1,
              onChange: (P) => L(P.target.files)
            }
          ),
          h && R ? /* @__PURE__ */ w.jsx("div", { className: Wz, children: h(R) }) : /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
            /* @__PURE__ */ w.jsx("span", { className: Fz, children: o ?? (v ? "Drop to upload" : "Drop an image or click to browse") }),
            s && /* @__PURE__ */ w.jsx("span", { id: m, className: Jz, children: s })
          ] })
        ]
      }
    ),
    S && /* @__PURE__ */ w.jsx("div", { id: y, role: "alert", className: Pz, children: S })
  ] });
}
function a5(t) {
  const [a, i] = M.useState(null);
  return M.useEffect(() => {
    if (!t) {
      i(null);
      return;
    }
    const o = URL.createObjectURL(t);
    return i(o), () => URL.revokeObjectURL(o);
  }, [t]), a;
}
async function l5(t) {
  const a = new FormData();
  a.append("file", t);
  const i = await fetch(`${Fu}/uploads`, { method: "POST", body: a });
  if (!i.ok) {
    let o = null;
    try {
      o = await i.json();
    } catch {
      o = null;
    }
    throw new Ku(
      i.status,
      o?.category ?? "unknown",
      o?.message ?? i.statusText,
      o?.requestId
    );
  }
  return await i.json();
}
var i5 = "_16wbbp30", r5 = "_16wbbp31", o5 = "_16wbbp32", s5 = "_16wbbp33", u5 = "_16wbbp34", c5 = "_16wbbp35", f5 = "_16wbbp37";
const d5 = 32 * 1024 * 1024, h5 = "image/png,image/jpeg,image/webp";
function m5() {
  const { imageRef: t, imageName: a, setImage: i, clearImage: o } = cr(), [s, u] = M.useState(null), [f, h] = M.useState(!1), p = a5(s), g = M.useCallback(
    async (m) => {
      u(m), h(!0);
      try {
        const { ref: v } = await l5(m);
        i(v, m.name);
      } catch (v) {
        const x = v instanceof Ku ? v.message : "Upload failed — try again.";
        Pi.error(x), u(null);
      } finally {
        h(!1);
      }
    },
    [i]
  ), y = M.useCallback(() => {
    u(null), o();
  }, [o]);
  return t && a ? /* @__PURE__ */ w.jsx("div", { className: i5, children: /* @__PURE__ */ w.jsxs("div", { className: r5, children: [
    p ? /* @__PURE__ */ w.jsx("img", { className: o5, src: p, alt: a }) : null,
    /* @__PURE__ */ w.jsxs("div", { className: s5, children: [
      /* @__PURE__ */ w.jsx("span", { className: u5, children: a }),
      /* @__PURE__ */ w.jsx("span", { className: c5, children: t })
    ] }),
    /* @__PURE__ */ w.jsx(Ja, { variant: "ghost", size: "sm", onClick: y, children: "Replace" })
  ] }) }) : /* @__PURE__ */ w.jsx(
    n5,
    {
      accept: h5,
      maxSizeBytes: d5,
      disabled: f,
      ariaLabel: "input image",
      label: f ? "Uploading…" : "Drop an image or click to browse",
      hint: "PNG, JPEG or WebP · single subject on a clean background works best",
      onFile: (m) => void g(m),
      renderPreview: (m) => p ? /* @__PURE__ */ w.jsx("img", { className: f5, src: p, alt: m.name }) : null
    }
  );
}
var g5 = "_12e60xu0", p5 = "_12e60xu1", y5 = "_12e60xu2", v5 = "_12e60xu3", b5 = "_12e60xu4", x5 = "_12e60xu5", S5 = "_12e60xu6", w5 = "_12e60xu7", E5 = "_12e60xu8", _5 = "_12e60xu9";
function N5({ presets: t, activeId: a, disabled: i, onApply: o }) {
  const [s, u] = M.useState(!1), f = M.useRef(null), h = t.find((p) => p.id === a)?.label ?? "Custom";
  return M.useEffect(() => {
    if (!s) return;
    function p(g) {
      f.current && !f.current.contains(g.target) && u(!1);
    }
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [s]), /* @__PURE__ */ w.jsxs("div", { className: g5, ref: f, children: [
    /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        className: p5,
        disabled: i,
        "aria-haspopup": "menu",
        "aria-expanded": s,
        onClick: () => u((p) => !p),
        children: [
          /* @__PURE__ */ w.jsx("span", { className: y5, "aria-hidden": "true", children: "tune" }),
          /* @__PURE__ */ w.jsx("span", { className: v5, children: "Presets" }),
          /* @__PURE__ */ w.jsx("span", { className: b5, children: h }),
          /* @__PURE__ */ w.jsx("span", { className: x5, "data-open": s, "aria-hidden": "true", children: "expand_more" })
        ]
      }
    ),
    s && /* @__PURE__ */ w.jsx("div", { className: S5, role: "menu", "aria-label": "Quality presets", children: t.map((p) => /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        role: "menuitemradio",
        "aria-checked": p.id === a,
        className: w5,
        "data-active": p.id === a,
        disabled: i,
        onClick: () => {
          o(p), u(!1);
        },
        children: [
          /* @__PURE__ */ w.jsx("span", { className: E5, children: p.label }),
          /* @__PURE__ */ w.jsx("span", { className: _5, children: p.hint })
        ]
      },
      p.id
    )) })
  ] });
}
var M5 = "_1dyscui0", Ad = "_1dyscui1", Cv = "_1dyscui2", Rv = "_1dyscui3", Av = "_1dyscui4", Dv = "_1dyscui5", zv = "_1dyscui6", Ov = "_1dyscui7", jv = "_1dyscui8", T5 = "_1dyscui9", C5 = "_1dyscuia", R5 = "_1dyscuib", A5 = "_1dyscuic", D5 = "_1dyscuid";
const z5 = /* @__PURE__ */ new Set(["pipeline_type", "residency"]);
function O5() {
  const { params: t, generate: a, updateParam: i, applyParams: o } = cr(), s = a.phase === "running", [u, f] = M.useState(!1), h = M.useId(), p = Mz(t);
  return /* @__PURE__ */ w.jsxs("div", { className: M5, children: [
    /* @__PURE__ */ w.jsx("span", { className: Ad, children: "Input image" }),
    /* @__PURE__ */ w.jsx(m5, {}),
    /* @__PURE__ */ w.jsx("span", { className: Ad, children: "Quality preset" }),
    /* @__PURE__ */ w.jsx(
      N5,
      {
        presets: bx,
        activeId: p,
        disabled: s,
        onApply: (y) => o(y.params)
      }
    ),
    /* @__PURE__ */ w.jsx("span", { className: Ad, children: "Generation" }),
    /* @__PURE__ */ w.jsx("div", { className: Cv, children: xz.map((y) => /* @__PURE__ */ w.jsx(
      Mv,
      {
        spec: y,
        value: t[y.key],
        disabled: s,
        onChange: (m) => g(y.key, m)
      },
      y.key
    )) }),
    /* @__PURE__ */ w.jsxs("div", { className: Rv, children: [
      /* @__PURE__ */ w.jsxs("div", { className: Av, children: [
        /* @__PURE__ */ w.jsx("span", { className: Dv, children: "Remove background" }),
        /* @__PURE__ */ w.jsx("span", { className: zv, children: "On auto-cuts the subject so no ground/shadow becomes a platform. Turn off only when the input is already a cut-out (transparent PNG)." })
      ] }),
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": t.remove_background !== !1,
          "aria-label": "Remove background",
          disabled: s,
          className: Ov,
          onClick: () => i("remove_background", t.remove_background === !1),
          children: /* @__PURE__ */ w.jsx("span", { className: jv, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: Rv, children: [
      /* @__PURE__ */ w.jsxs("div", { className: Av, children: [
        /* @__PURE__ */ w.jsx("span", { className: Dv, children: "Bake texture" }),
        /* @__PURE__ */ w.jsx("span", { className: zv, children: "Off exports a MeshOnly GLB. On runs the texture pass (slower, larger file)." })
      ] }),
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": !!t.texture,
          "aria-label": "Bake texture",
          disabled: s,
          className: Ov,
          onClick: () => i("texture", !t.texture),
          children: /* @__PURE__ */ w.jsx("span", { className: jv, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ w.jsxs("section", { className: T5, children: [
      /* @__PURE__ */ w.jsxs(
        "button",
        {
          type: "button",
          className: R5,
          "aria-expanded": u,
          "aria-controls": h,
          onClick: () => f((y) => !y),
          children: [
            /* @__PURE__ */ w.jsx("span", { className: A5, children: "Advanced / Quality" }),
            /* @__PURE__ */ w.jsx("span", { className: D5, "data-open": u, "aria-hidden": "true", children: "expand_more" })
          ]
        }
      ),
      u && /* @__PURE__ */ w.jsxs("div", { id: h, className: C5, children: [
        /* @__PURE__ */ w.jsx("div", { className: Cv, children: Sz.map((y) => /* @__PURE__ */ w.jsx(
          Mv,
          {
            spec: y,
            value: t[y.key],
            disabled: s || !wz(y, t),
            onChange: (m) => g(y.key, m)
          },
          y.key
        )) }),
        /* @__PURE__ */ w.jsx(Gz, { disabled: s })
      ] })
    ] })
  ] });
  function g(y, m) {
    if (z5.has(y) && typeof m == "string") {
      i(y, m);
      return;
    }
    typeof m == "number" && i(y, m);
  }
}
var j5 = "gsuv1n0", L5 = "gsuv1n1", H5 = "gsuv1n2";
function ah({ title: t, detail: a, action: i, className: o }) {
  const s = [j5, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("div", { className: s, children: [
    /* @__PURE__ */ w.jsx("span", { className: L5, children: t }),
    a && /* @__PURE__ */ w.jsx("span", { className: H5, children: a }),
    i
  ] });
}
const Lv = {
  1: {
    title: "Worker failed to start",
    hint: "The TRELLIS 2 worker could not launch. Check that the backend is installed and the GPU is available."
  },
  2: {
    title: "Input image rejected",
    hint: "The uploaded image could not be decoded. Use a PNG or JPEG with a clear subject."
  },
  73: {
    title: "Out of GPU memory",
    hint: "Generation ran out of VRAM. Switch residency to Low VRAM or lower the triangle budget."
  }
};
function B5(t, a) {
  return t !== null && Lv[t] ? Lv[t] : {
    title: "Generation failed",
    hint: a ?? "The worker reported an unexpected error. Check the logs and try again."
  };
}
var Dd = "_1799g9j0", U5 = "_1799g9j1", k5 = "_1799g9j3", V5 = "_1799g9j4", Y5 = "_1799g9j5", G5 = "_1799g9j6", q5 = "_1799g9j7", $5 = "_1799g9j8", X5 = "_1799g9j9", Z5 = "_1799g9ja", yu = "_1799g9jb", Q5 = "_1799g9jc", I5 = "_1799g9jd", K5 = "_1799g9je", F5 = "_1799g9jf", J5 = "_1799g9jg", P5 = "_1799g9jh", W5 = "_1799g9ji", e4 = "_1799g9jj", t4 = "_1799g9jk", n4 = "_1799g9jl", a4 = "_1799g9jm", l4 = "_1799g9jn";
const i4 = {
  load: "Loading model…",
  encode: "Encoding image (DINOv3)…",
  sparse: "Building sparse structure…",
  shape: "Decoding shape…",
  texture: "Baking texture…",
  decode: "Decoding mesh…",
  glb: "Exporting GLB…"
};
function r4({
  state: t,
  onCancel: a,
  onReset: i
}) {
  const [o, s] = M.useState(!1);
  M.useEffect(() => {
    t.phase !== "running" && s(!1);
  }, [t.phase]);
  const u = M.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (t.phase === "idle")
    return /* @__PURE__ */ w.jsx(
      ah,
      {
        title: "No active generation",
        detail: "Upload an input image and start a generation to see live progress here."
      }
    );
  if (t.phase === "error") {
    const h = B5(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ w.jsxs("div", { className: Dd, children: [
      /* @__PURE__ */ w.jsxs("div", { className: Q5, role: "alert", children: [
        /* @__PURE__ */ w.jsx("span", { className: I5, children: h.title }),
        /* @__PURE__ */ w.jsx("span", { className: K5, children: h.hint })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: yu, children: /* @__PURE__ */ w.jsx(Ja, { variant: "secondary", onClick: i, children: "Dismiss" }) })
    ] });
  }
  if (t.phase === "cancelled")
    return /* @__PURE__ */ w.jsxs("div", { className: Dd, children: [
      /* @__PURE__ */ w.jsx(
        ah,
        {
          title: "Generation cancelled",
          detail: "The generation was stopped before completion."
        }
      ),
      /* @__PURE__ */ w.jsx("div", { className: yu, children: /* @__PURE__ */ w.jsx(Ja, { variant: "secondary", onClick: i, children: "Reset" }) })
    ] });
  if (t.phase === "done")
    return /* @__PURE__ */ w.jsx(o4, { state: t, onReset: i });
  const f = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ w.jsxs("div", { className: Dd, children: [
    /* @__PURE__ */ w.jsxs("output", { className: U5, "aria-live": "polite", children: [
      /* @__PURE__ */ w.jsx("span", { className: k5, "aria-hidden": "true" }),
      s4(t)
    ] }),
    /* @__PURE__ */ w.jsx(
      "div",
      {
        className: V5,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": f,
        children: /* @__PURE__ */ w.jsx(
          "div",
          {
            className: Y5,
            style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
          }
        )
      }
    ),
    /* @__PURE__ */ w.jsxs("div", { className: G5, "aria-live": "polite", children: [
      /* @__PURE__ */ w.jsx(zd, { label: "Overall", value: `${f}%` }),
      /* @__PURE__ */ w.jsx(zd, { label: "Stage", value: t.stage ? xx(t.stage) : "—", accent: !0 }),
      /* @__PURE__ */ w.jsx(
        zd,
        {
          label: "Step",
          value: t.totalSteps ? `${t.step} / ${t.totalSteps}` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: yu, children: /* @__PURE__ */ w.jsx(Ja, { variant: "danger", onClick: u, loading: o, disabled: o, children: o ? "Cancelling…" : "Cancel generation" }) })
  ] });
}
function o4({
  state: t,
  onReset: a
}) {
  return /* @__PURE__ */ w.jsxs("output", { className: F5, children: [
    /* @__PURE__ */ w.jsxs("div", { className: J5, children: [
      /* @__PURE__ */ w.jsx("span", { className: P5, "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsx("span", { className: W5, children: "Mesh ready" })
    ] }),
    /* @__PURE__ */ w.jsx("p", { className: e4, children: "Preview, orbit and download the GLB from the stage above." }),
    /* @__PURE__ */ w.jsx(u4, { metadata: t.metadata, glbRef: t.glbRef }),
    /* @__PURE__ */ w.jsx("div", { className: yu, children: /* @__PURE__ */ w.jsx(Ja, { variant: "secondary", onClick: a, children: "New generation" }) })
  ] });
}
function xx(t) {
  return t.replace(/[_-]+/g, " ");
}
function s4(t) {
  return t.stage ? i4[t.stage] ?? `${xx(t.stage)}…` : "Starting worker…";
}
function zd({
  label: t,
  value: a,
  accent: i = !1
}) {
  return /* @__PURE__ */ w.jsxs("div", { className: q5, children: [
    /* @__PURE__ */ w.jsx("span", { className: $5, children: t }),
    /* @__PURE__ */ w.jsx(
      "span",
      {
        className: [X5, i ? Z5 : ""].filter(Boolean).join(" "),
        children: a
      }
    )
  ] });
}
function u4({
  metadata: t,
  glbRef: a
}) {
  const i = [];
  if (t) {
    const o = t.mesh?.vertices, s = t.mesh?.faces;
    typeof o == "number" && i.push(["Vertices", o.toLocaleString()]), typeof s == "number" && i.push(["Faces", s.toLocaleString()]), typeof t.textured == "boolean" && i.push(["Texture", t.textured ? "baked" : "none"]), typeof t.attention_backend == "string" && i.push(["Attention", t.attention_backend]), typeof t.compute_cap == "string" && i.push(["Compute cap", t.compute_cap]);
    const u = c4(t.stage_timings);
    u !== null && i.push(["Duration", `${(u / 1e3).toFixed(1)}s`]), typeof t.sha256 == "string" && i.push(["sha256", `${t.sha256.slice(0, 16)}…`]);
  }
  return a && i.push(["Artifact", a]), i.length === 0 ? null : /* @__PURE__ */ w.jsx("div", { className: t4, children: i.map(([o, s]) => /* @__PURE__ */ w.jsxs("div", { className: n4, children: [
    /* @__PURE__ */ w.jsx("span", { className: a4, children: o }),
    /* @__PURE__ */ w.jsx("span", { className: l4, children: s })
  ] }, o)) });
}
function c4(t) {
  if (!t) return null;
  const a = Object.values(t).filter((i) => typeof i == "number");
  return a.length === 0 ? null : a.reduce((i, o) => i + o, 0);
}
function Sx(t) {
  if (!t) return null;
  const a = t.split("/").map(encodeURIComponent).join("/");
  return `${Fu}/media/${a}`;
}
var f4 = "_16ts7i00", d4 = "_16ts7i01", h4 = "_16ts7i03", m4 = "_16ts7i04", g4 = "_16ts7i05", p4 = "_16ts7i06", y4 = "_16ts7i07", v4 = "_16ts7i08", b4 = "_16ts7i09", x4 = "_16ts7i0b _16ts7i0a", S4 = "_16ts7i0c", w4 = "_16ts7i0d _16ts7i0a", E4 = "_16ts7i0e";
const _4 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function N4({ jobs: t, onOpen: a, onDelete: i }) {
  return t.length === 0 ? /* @__PURE__ */ w.jsx(
    ah,
    {
      title: "No meshes yet",
      detail: "Completed generations appear here with their preview, parameters and a GLB download."
    }
  ) : /* @__PURE__ */ w.jsx("div", { className: f4, children: t.map((o) => {
    const s = Sx(o.glbRef);
    return /* @__PURE__ */ w.jsxs("div", { className: d4, children: [
      /* @__PURE__ */ w.jsx("span", { className: h4, "aria-hidden": "true", children: "3D" }),
      /* @__PURE__ */ w.jsxs("button", { type: "button", className: m4, onClick: () => a(o), children: [
        /* @__PURE__ */ w.jsxs("span", { className: g4, children: [
          /* @__PURE__ */ w.jsx("span", { className: p4, children: o.id }),
          /* @__PURE__ */ w.jsx("span", { className: y4, children: T4(o) })
        ] }),
        /* @__PURE__ */ w.jsxs("span", { className: v4, children: [
          /* @__PURE__ */ w.jsx(
            "time",
            {
              className: b4,
              dateTime: o.createdAt,
              title: C4(o.createdAt),
              children: R4(o.createdAt)
            }
          ),
          /* @__PURE__ */ w.jsx(fx, { tone: _4[o.status], children: o.status })
        ] })
      ] }),
      /* @__PURE__ */ w.jsxs(
        "a",
        {
          className: [x4, s ? "" : S4].filter(Boolean).join(" "),
          href: s ?? void 0,
          download: s ? `${o.glbRef}.glb` : void 0,
          "aria-disabled": s ? void 0 : !0,
          tabIndex: s ? 0 : -1,
          "aria-label": `Download GLB for ${o.id}`,
          title: "Download GLB",
          children: [
            /* @__PURE__ */ w.jsx("svg", { viewBox: "0 0 24 24", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ w.jsx(
              "path",
              {
                d: "M12 3v12m0 0l-4-4m4 4l4-4M5 21h14",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fill: "none"
              }
            ) }),
            /* @__PURE__ */ w.jsx("span", { className: E4, children: "Download GLB" })
          ]
        }
      ),
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          className: w4,
          "aria-label": `Delete ${o.id} from history`,
          title: "Delete from history",
          onClick: () => i(o),
          children: /* @__PURE__ */ w.jsxs("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", children: [
            /* @__PURE__ */ w.jsx("title", { children: "delete" }),
            /* @__PURE__ */ w.jsx(
              "path",
              {
                d: "M6 6l12 12M18 6L6 18",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          ] })
        }
      )
    ] }, o.id);
  }) });
}
const M4 = M.memo(N4);
function T4(t) {
  const a = t.params, i = [];
  typeof a.seed == "number" && i.push(`seed ${a.seed}`), typeof a.sparse_steps == "number" && i.push(`${a.sparse_steps} sparse`), a.texture && i.push("textured");
  const o = t.metadata?.mesh?.faces;
  return typeof o == "number" && i.push(`${o.toLocaleString()} faces`), i.join(" · ") || "—";
}
function C4(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
function R4(t) {
  const a = new Date(t), i = a.getTime();
  if (Number.isNaN(i)) return "";
  const o = Date.now() - i;
  if (o < 0) return "just now";
  const s = Math.floor(o / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const f = Math.floor(u / 24);
  return f < 7 ? `${f}d ago` : a.toLocaleDateString();
}
var A4 = "_11e6dkm0", D4 = "_11e6dkm1", z4 = "_11e6dkm3", O4 = "_11e6dkm4", j4 = "_11e6dkm5", L4 = "_11e6dkm6 _11e6dkm5", H4 = "_11e6dkm7", B4 = "_11e6dkm8", U4 = "_11e6dkm9", k4 = "_11e6dkma", V4 = "_11e6dkmb", Y4 = "_11e6dkmc", G4 = "_11e6dkme _11e6dkmd", q4 = "_11e6dkmf _11e6dkmd";
const $4 = ["neutral", "aces"], X4 = {
  neutral: "Neutral",
  aces: "ACES"
}, Z4 = 0.4, Q4 = 2, I4 = 1;
function K4({ url: t, alt: a, className: i }) {
  const [o, s] = M.useState(
    () => typeof customElements < "u" && !!customElements.get("model-viewer")
  ), [u, f] = M.useState(!1), [h, p] = M.useState(I4), [g, y] = M.useState("neutral"), m = M.useRef(null), v = M.useId();
  return M.useEffect(() => {
    let x = !1;
    if (!o)
      return import("./model-viewer-CRo-xH2b.js").then(() => {
        x || s(!0);
      }).catch(() => {
      }), () => {
        x = !0;
      };
  }, [o]), M.useEffect(() => {
    f(!1);
    const x = m.current;
    if (!o || !x || x.getAttribute("src") !== t) return;
    const S = () => f(!0);
    return x.addEventListener("load", S), () => x.removeEventListener("load", S);
  }, [o, t]), /* @__PURE__ */ w.jsxs("div", { className: [A4, i].filter(Boolean).join(" "), children: [
    o ? /* @__PURE__ */ w.jsx(
      "model-viewer",
      {
        ref: m,
        className: D4,
        src: t,
        alt: a,
        "camera-controls": !0,
        "auto-rotate": !0,
        "environment-image": "neutral",
        "tone-mapping": g,
        "shadow-intensity": "1",
        exposure: h.toFixed(2)
      }
    ) : null,
    o && u ? /* @__PURE__ */ w.jsxs("div", { className: O4, children: [
      /* @__PURE__ */ w.jsxs("div", { className: [j4, B4].join(" "), children: [
        /* @__PURE__ */ w.jsx("label", { className: U4, htmlFor: v, children: "Exposure" }),
        /* @__PURE__ */ w.jsx(
          "input",
          {
            id: v,
            className: V4,
            type: "range",
            min: Z4,
            max: Q4,
            step: 0.05,
            value: h,
            onChange: (x) => p(Number(x.target.value))
          }
        ),
        /* @__PURE__ */ w.jsx("span", { className: k4, children: h.toFixed(2) })
      ] }),
      /* @__PURE__ */ w.jsxs("fieldset", { className: L4, children: [
        /* @__PURE__ */ w.jsx("legend", { className: H4, children: "Tone" }),
        /* @__PURE__ */ w.jsx("div", { className: Y4, children: $4.map((x) => {
          const S = x === g;
          return /* @__PURE__ */ w.jsx(
            "button",
            {
              type: "button",
              className: S ? q4 : G4,
              "aria-pressed": S,
              onClick: () => y(x),
              children: X4[x]
            },
            x
          );
        }) })
      ] })
    ] }) : null,
    o && u ? null : /* @__PURE__ */ w.jsx("span", { className: z4, "aria-hidden": "true", children: "Loading mesh…" })
  ] });
}
var F4 = "at6khm0", J4 = "at6khm1", P4 = "at6khm2", W4 = "at6khm3", e6 = "at6khm4", t6 = "at6khm5", n6 = "at6khm6", a6 = "at6khm7", l6 = "at6khm8", i6 = "at6khm9", r6 = "at6khmb", Hv = "at6khmc", o6 = "at6khmd", s6 = "at6khme", u6 = "at6khmf", c6 = "at6khmg", f6 = "at6khmh", d6 = "at6khmi", h6 = "at6khmj", m6 = "at6khmk", g6 = "at6khml", p6 = "at6khmm", Bv = "at6khmn", y6 = "at6khmo", Uv = "at6khmp";
function v6({ state: t }) {
  const a = t.phase === "done" ? Sx(t.glbRef) : null, i = b6(t.phase), o = x6(t), s = t.glbRef ? `${t.glbRef}.glb` : "mesh.glb";
  return /* @__PURE__ */ w.jsxs("section", { className: F4, "aria-label": "Mesh preview", children: [
    /* @__PURE__ */ w.jsx("div", { className: J4, children: a ? /* @__PURE__ */ w.jsx(K4, { url: a, alt: "Generated 3D mesh preview", className: P4 }) : /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
      /* @__PURE__ */ w.jsx("div", { className: W4, "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsx("span", { className: e6, children: "OUTPUT · GLB MESH" }),
      /* @__PURE__ */ w.jsxs("div", { className: t6, children: [
        /* @__PURE__ */ w.jsx("span", { className: n6, "aria-hidden": "true", children: "deployed_code" }),
        /* @__PURE__ */ w.jsx("span", { className: a6, children: i.hint })
      ] })
    ] }) }),
    /* @__PURE__ */ w.jsxs("div", { className: l6, children: [
      /* @__PURE__ */ w.jsxs("div", { className: i6, children: [
        /* @__PURE__ */ w.jsx("span", { className: [r6, i.dot].join(" "), "aria-hidden": "true" }),
        /* @__PURE__ */ w.jsx("span", { className: c6, children: i.title })
      ] }),
      /* @__PURE__ */ w.jsx("span", { className: f6, title: t.glbRef ?? void 0, children: t.glbRef ?? "—" }),
      /* @__PURE__ */ w.jsxs("div", { className: d6, children: [
        /* @__PURE__ */ w.jsx(Od, { label: "Format", value: o.format }),
        /* @__PURE__ */ w.jsx(Od, { label: "Triangles", value: o.tris }),
        /* @__PURE__ */ w.jsx(Od, { label: "Vertices", value: o.verts })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: p6, children: a ? /* @__PURE__ */ w.jsxs("a", { className: Bv, href: a, download: s, children: [
        /* @__PURE__ */ w.jsx("span", { className: Uv, "aria-hidden": "true", children: "download" }),
        "Download GLB"
      ] }) : /* @__PURE__ */ w.jsxs(
        "span",
        {
          className: [Bv, y6].join(" "),
          "aria-disabled": "true",
          children: [
            /* @__PURE__ */ w.jsx("span", { className: Uv, "aria-hidden": "true", children: "download" }),
            "Download GLB"
          ]
        }
      ) })
    ] })
  ] });
}
function Od({ label: t, value: a }) {
  return /* @__PURE__ */ w.jsxs("div", { className: h6, children: [
    /* @__PURE__ */ w.jsx("span", { className: m6, children: t }),
    /* @__PURE__ */ w.jsx("span", { className: g6, children: a })
  ] });
}
function b6(t) {
  switch (t) {
    case "running":
      return {
        title: "Generating…",
        hint: "Building the mesh — the preview appears here when it lands.",
        dot: o6
      };
    case "done":
      return { title: "Mesh ready", hint: "", dot: s6 };
    case "error":
      return {
        title: "Generation failed",
        hint: "See the progress panel for details, then try again.",
        dot: u6
      };
    case "cancelled":
      return {
        title: "Cancelled",
        hint: "Run a generation to preview the mesh.",
        dot: Hv
      };
    default:
      return {
        title: "No mesh yet",
        hint: "Run a generation to preview the mesh.",
        dot: Hv
      };
  }
}
function x6(t) {
  if (t.phase !== "done") return { format: "—", tris: "—", verts: "—" };
  const a = t.metadata, i = a?.mesh?.faces, o = a?.mesh?.vertices;
  return {
    format: typeof a?.textured == "boolean" ? a.textured ? "GLB · textured" : "GLB · mesh only" : "GLB",
    tris: typeof i == "number" ? i.toLocaleString() : "—",
    verts: typeof o == "number" ? o.toLocaleString() : "—"
  };
}
var S6 = "_174fijm0", w6 = "_174fijm1", kv = "_174fijm2", E6 = "_174fijm3";
function _6() {
  const { generate: t, resetGenerate: a, showJobResult: i } = cr(), { blocked: o, busy: s, submit: u, cancel: f } = px(), h = rz(t.phase), p = M.useCallback(
    (y) => {
      i(y);
    },
    [i]
  ), g = M.useCallback(
    async (y) => {
      try {
        await h.remove(y.id);
      } catch {
        Pi.error("Could not delete that generation."), h.reload();
      }
    },
    [h]
  );
  return /* @__PURE__ */ w.jsxs("div", { className: S6, children: [
    /* @__PURE__ */ w.jsx(v6, { state: t }),
    /* @__PURE__ */ w.jsxs("div", { className: w6, children: [
      /* @__PURE__ */ w.jsxs("div", { className: kv, children: [
        /* @__PURE__ */ w.jsxs(
          pu,
          {
            eyebrow: "OPERATOR · TRELLIS2.GENERATE_3D",
            title: "New mesh",
            description: "One image in, one watertight GLB out.",
            children: [
              /* @__PURE__ */ w.jsx(O5, {}),
              /* @__PURE__ */ w.jsx("div", { className: E6, children: s ? /* @__PURE__ */ w.jsx(Ja, { variant: "danger", onClick: () => void f(), children: "Cancel generation" }) : /* @__PURE__ */ w.jsx(Ja, { onClick: () => void u(), disabled: o, children: "Generate" }) })
            ]
          }
        ),
        /* @__PURE__ */ w.jsx(pu, { elevation: "raised", title: "Progress", description: "Live state mirrors the worker.", children: /* @__PURE__ */ w.jsx(
          r4,
          {
            state: t,
            onCancel: () => void f(),
            onReset: a
          }
        ) })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: kv, children: /* @__PURE__ */ w.jsx(pu, { title: "History", description: "Past generations and their GLB downloads.", children: /* @__PURE__ */ w.jsx(M4, { jobs: h.jobs, onOpen: p, onDelete: g }) }) })
    ] })
  ] });
}
var N6 = "_126eaw50", M6 = "_126eaw51", T6 = "_126eaw52", C6 = "_126eaw53", R6 = "_126eaw54", A6 = "_126eaw55", D6 = "_126eaw56", z6 = "_126eaw57";
function O6() {
  return /* @__PURE__ */ w.jsxs(OD, { children: [
    /* @__PURE__ */ w.jsxs("div", { className: N6, children: [
      /* @__PURE__ */ w.jsx("div", { className: M6, "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsx("header", { className: T6, children: /* @__PURE__ */ w.jsxs("div", { className: C6, children: [
        /* @__PURE__ */ w.jsx("span", { className: R6, children: "GENERATIVE SURFACE · IMAGE TO 3D" }),
        /* @__PURE__ */ w.jsx("h1", { className: A6, children: "TRELLIS 2" }),
        /* @__PURE__ */ w.jsx("p", { className: D6, children: "Turn a single image into a watertight 3D mesh with Microsoft TRELLIS.2. Upload a subject, tune the flow, and export a GLB." })
      ] }) }),
      /* @__PURE__ */ w.jsx("main", { className: z6, children: /* @__PURE__ */ w.jsx(M_, {}) })
    ] }),
    /* @__PURE__ */ w.jsx(bD, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function j6() {
  return [
    {
      path: "/",
      loader: () => U0("/default/generate")
    },
    {
      path: "/:deploymentId",
      Component: O6,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => U0(`/${L6(t, "deploymentId")}/generate`)
        },
        { path: "generate", Component: _6 },
        { path: "dag", Component: iz }
      ]
    }
  ];
}
function L6(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const lh = "trellis2-app", H6 = "ext-event", Vv = "trellis2-stylesheet", Yv = ["accent", "density", "card"];
function B6(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function U6() {
  if (typeof document > "u" || document.getElementById(Vv)) return;
  const t = new URL("./trellis2.css", import.meta.url).href, a = document.createElement("link");
  a.id = Vv, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
U6();
class k6 extends HTMLElement {
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
    this.root = Bw.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(uy, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = d2(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const o = i.detail?.path;
      o && this.router && this.router.navigate(o);
    };
    this.navigateListener = a, this.addEventListener(uy, a);
  }
  syncTweaksFromBody() {
    for (const a of Yv) {
      const i = B6(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Yv.map((a) => `data-${a}`)
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
    const i = S_(j6(), { initialEntries: [a] });
    this.router = i, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ w.jsx(M.StrictMode, { children: /* @__PURE__ */ w.jsx(E_, { router: i }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const i = this.getAttribute("deployment-id");
    return i && i.length > 0 ? `/${i}/generate` : "/";
  }
  emitHostEvent(a, i) {
    this.dispatchEvent(
      new CustomEvent(H6, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function V6() {
  typeof customElements > "u" || customElements.get(lh) || customElements.define(lh, k6);
}
typeof customElements < "u" && !customElements.get(lh) && V6();
export {
  V6 as register
};
//# sourceMappingURL=trellis2.js.map
