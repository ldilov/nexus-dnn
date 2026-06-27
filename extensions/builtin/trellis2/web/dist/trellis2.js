function Lw(t, a) {
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
function fh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var od = { exports: {} }, no = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R0;
function Hw() {
  if (R0) return no;
  R0 = 1;
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
  return no.Fragment = a, no.jsx = i, no.jsxs = i, no;
}
var A0;
function Bw() {
  return A0 || (A0 = 1, od.exports = Hw()), od.exports;
}
var w = Bw(), sd = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D0;
function Uw() {
  if (D0) return Ue;
  D0 = 1;
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
  }, R = Object.assign, T = {};
  function M(D, V, F) {
    this.props = D, this.context = V, this.refs = T, this.updater = F || S;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(D, V) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, V, "setState");
  }, M.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function L() {
  }
  L.prototype = M.prototype;
  function _(D, V, F) {
    this.props = D, this.context = V, this.refs = T, this.updater = F || S;
  }
  var z = _.prototype = new L();
  z.constructor = _, R(z, M.prototype), z.isPureReactComponent = !0;
  var Y = Array.isArray;
  function B() {
  }
  var U = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function K(D, V, F) {
    var le = F.ref;
    return {
      $$typeof: t,
      type: D,
      key: V,
      ref: le !== void 0 ? le : null,
      props: F
    };
  }
  function J(D, V) {
    return K(D.type, V, D.props);
  }
  function G(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function Q(D) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(F) {
      return V[F];
    });
  }
  var re = /\/+/g;
  function j(D, V) {
    return typeof D == "object" && D !== null && D.key != null ? Q("" + D.key) : V.toString(36);
  }
  function Z(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(B, B) : (D.status = "pending", D.then(
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
  function C(D, V, F, le, se) {
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
              return ge = D._init, C(
                ge(D._payload),
                V,
                F,
                le,
                se
              );
          }
      }
    if (ge)
      return se = se(D), ge = le === "" ? "." + j(D, 0) : le, Y(se) ? (F = "", ge != null && (F = ge.replace(re, "$&/") + "/"), C(se, V, F, "", function(ze) {
        return ze;
      })) : se != null && (G(se) && (se = J(
        se,
        F + (se.key == null || D && D.key === se.key ? "" : ("" + se.key).replace(
          re,
          "$&/"
        ) + "/") + ge
      )), V.push(se)), 1;
    ge = 0;
    var ee = le === "" ? "." : le + ":";
    if (Y(D))
      for (var pe = 0; pe < D.length; pe++)
        le = D[pe], me = ee + j(le, pe), ge += C(
          le,
          V,
          F,
          me,
          se
        );
    else if (pe = x(D), typeof pe == "function")
      for (D = pe.call(D), pe = 0; !(le = D.next()).done; )
        le = le.value, me = ee + j(le, pe++), ge += C(
          le,
          V,
          F,
          me,
          se
        );
    else if (me === "object") {
      if (typeof D.then == "function")
        return C(
          Z(D),
          V,
          F,
          le,
          se
        );
      throw V = String(D), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ge;
  }
  function O(D, V, F) {
    if (D == null) return D;
    var le = [], se = 0;
    return C(D, le, "", "", function(me) {
      return V.call(F, me, se++);
    }), le;
  }
  function q(D) {
    if (D._status === -1) {
      var V = D._result;
      V = V(), V.then(
        function(F) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = F);
        },
        function(F) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = F);
        }
      ), D._status === -1 && (D._status = 0, D._result = V);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var $ = typeof reportError == "function" ? reportError : function(D) {
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
  }, ne = {
    map: O,
    forEach: function(D, V, F) {
      O(
        D,
        function() {
          V.apply(this, arguments);
        },
        F
      );
    },
    count: function(D) {
      var V = 0;
      return O(D, function() {
        V++;
      }), V;
    },
    toArray: function(D) {
      return O(D, function(V) {
        return V;
      }) || [];
    },
    only: function(D) {
      if (!G(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Ue.Activity = m, Ue.Children = ne, Ue.Component = M, Ue.Fragment = i, Ue.Profiler = s, Ue.PureComponent = _, Ue.StrictMode = o, Ue.Suspense = p, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return U.H.useMemoCache(D);
    }
  }, Ue.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(D, V, F) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var le = R({}, D.props), se = D.key;
    if (V != null)
      for (me in V.key !== void 0 && (se = "" + V.key), V)
        !A.call(V, me) || me === "key" || me === "__self" || me === "__source" || me === "ref" && V.ref === void 0 || (le[me] = V[me]);
    var me = arguments.length - 2;
    if (me === 1) le.children = F;
    else if (1 < me) {
      for (var ge = Array(me), ee = 0; ee < me; ee++)
        ge[ee] = arguments[ee + 2];
      le.children = ge;
    }
    return K(D.type, se, le);
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
  }, Ue.createElement = function(D, V, F) {
    var le, se = {}, me = null;
    if (V != null)
      for (le in V.key !== void 0 && (me = "" + V.key), V)
        A.call(V, le) && le !== "key" && le !== "__self" && le !== "__source" && (se[le] = V[le]);
    var ge = arguments.length - 2;
    if (ge === 1) se.children = F;
    else if (1 < ge) {
      for (var ee = Array(ge), pe = 0; pe < ge; pe++)
        ee[pe] = arguments[pe + 2];
      se.children = ee;
    }
    if (D && D.defaultProps)
      for (le in ge = D.defaultProps, ge)
        se[le] === void 0 && (se[le] = ge[le]);
    return K(D, me, se);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(D) {
    return { $$typeof: h, render: D };
  }, Ue.isValidElement = G, Ue.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: q
    };
  }, Ue.memo = function(D, V) {
    return {
      $$typeof: g,
      type: D,
      compare: V === void 0 ? null : V
    };
  }, Ue.startTransition = function(D) {
    var V = U.T, F = {};
    U.T = F;
    try {
      var le = D(), se = U.S;
      se !== null && se(F, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(B, $);
    } catch (me) {
      $(me);
    } finally {
      V !== null && F.types !== null && (V.types = F.types), U.T = V;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return U.H.useCacheRefresh();
  }, Ue.use = function(D) {
    return U.H.use(D);
  }, Ue.useActionState = function(D, V, F) {
    return U.H.useActionState(D, V, F);
  }, Ue.useCallback = function(D, V) {
    return U.H.useCallback(D, V);
  }, Ue.useContext = function(D) {
    return U.H.useContext(D);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(D, V) {
    return U.H.useDeferredValue(D, V);
  }, Ue.useEffect = function(D, V) {
    return U.H.useEffect(D, V);
  }, Ue.useEffectEvent = function(D) {
    return U.H.useEffectEvent(D);
  }, Ue.useId = function() {
    return U.H.useId();
  }, Ue.useImperativeHandle = function(D, V, F) {
    return U.H.useImperativeHandle(D, V, F);
  }, Ue.useInsertionEffect = function(D, V) {
    return U.H.useInsertionEffect(D, V);
  }, Ue.useLayoutEffect = function(D, V) {
    return U.H.useLayoutEffect(D, V);
  }, Ue.useMemo = function(D, V) {
    return U.H.useMemo(D, V);
  }, Ue.useOptimistic = function(D, V) {
    return U.H.useOptimistic(D, V);
  }, Ue.useReducer = function(D, V, F) {
    return U.H.useReducer(D, V, F);
  }, Ue.useRef = function(D) {
    return U.H.useRef(D);
  }, Ue.useState = function(D) {
    return U.H.useState(D);
  }, Ue.useSyncExternalStore = function(D, V, F) {
    return U.H.useSyncExternalStore(
      D,
      V,
      F
    );
  }, Ue.useTransition = function() {
    return U.H.useTransition();
  }, Ue.version = "19.2.7", Ue;
}
var z0;
function Ao() {
  return z0 || (z0 = 1, sd.exports = Uw()), sd.exports;
}
var E = Ao();
const ye = /* @__PURE__ */ fh(E), kw = /* @__PURE__ */ Lw({
  __proto__: null,
  default: ye
}, [E]);
var ud = { exports: {} }, ao = {}, cd = { exports: {} }, fd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var j0;
function Vw() {
  return j0 || (j0 = 1, (function(t) {
    function a(C, O) {
      var q = C.length;
      C.push(O);
      e: for (; 0 < q; ) {
        var $ = q - 1 >>> 1, ne = C[$];
        if (0 < s(ne, O))
          C[$] = O, C[q] = ne, q = $;
        else break e;
      }
    }
    function i(C) {
      return C.length === 0 ? null : C[0];
    }
    function o(C) {
      if (C.length === 0) return null;
      var O = C[0], q = C.pop();
      if (q !== O) {
        C[0] = q;
        e: for (var $ = 0, ne = C.length, D = ne >>> 1; $ < D; ) {
          var V = 2 * ($ + 1) - 1, F = C[V], le = V + 1, se = C[le];
          if (0 > s(F, q))
            le < ne && 0 > s(se, F) ? (C[$] = se, C[le] = q, $ = le) : (C[$] = F, C[V] = q, $ = V);
          else if (le < ne && 0 > s(se, q))
            C[$] = se, C[le] = q, $ = le;
          else break e;
        }
      }
      return O;
    }
    function s(C, O) {
      var q = C.sortIndex - O.sortIndex;
      return q !== 0 ? q : C.id - O.id;
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
    var p = [], g = [], y = 1, m = null, v = 3, x = !1, S = !1, R = !1, T = !1, M = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function z(C) {
      for (var O = i(g); O !== null; ) {
        if (O.callback === null) o(g);
        else if (O.startTime <= C)
          o(g), O.sortIndex = O.expirationTime, a(p, O);
        else break;
        O = i(g);
      }
    }
    function Y(C) {
      if (R = !1, z(C), !S)
        if (i(p) !== null)
          S = !0, B || (B = !0, Q());
        else {
          var O = i(g);
          O !== null && Z(Y, O.startTime - C);
        }
    }
    var B = !1, U = -1, A = 5, K = -1;
    function J() {
      return T ? !0 : !(t.unstable_now() - K < A);
    }
    function G() {
      if (T = !1, B) {
        var C = t.unstable_now();
        K = C;
        var O = !0;
        try {
          e: {
            S = !1, R && (R = !1, L(U), U = -1), x = !0;
            var q = v;
            try {
              t: {
                for (z(C), m = i(p); m !== null && !(m.expirationTime > C && J()); ) {
                  var $ = m.callback;
                  if (typeof $ == "function") {
                    m.callback = null, v = m.priorityLevel;
                    var ne = $(
                      m.expirationTime <= C
                    );
                    if (C = t.unstable_now(), typeof ne == "function") {
                      m.callback = ne, z(C), O = !0;
                      break t;
                    }
                    m === i(p) && o(p), z(C);
                  } else o(p);
                  m = i(p);
                }
                if (m !== null) O = !0;
                else {
                  var D = i(g);
                  D !== null && Z(
                    Y,
                    D.startTime - C
                  ), O = !1;
                }
              }
              break e;
            } finally {
              m = null, v = q, x = !1;
            }
            O = void 0;
          }
        } finally {
          O ? Q() : B = !1;
        }
      }
    }
    var Q;
    if (typeof _ == "function")
      Q = function() {
        _(G);
      };
    else if (typeof MessageChannel < "u") {
      var re = new MessageChannel(), j = re.port2;
      re.port1.onmessage = G, Q = function() {
        j.postMessage(null);
      };
    } else
      Q = function() {
        M(G, 0);
      };
    function Z(C, O) {
      U = M(function() {
        C(t.unstable_now());
      }, O);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, t.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < C ? Math.floor(1e3 / C) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(C) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = v;
      }
      var q = v;
      v = O;
      try {
        return C();
      } finally {
        v = q;
      }
    }, t.unstable_requestPaint = function() {
      T = !0;
    }, t.unstable_runWithPriority = function(C, O) {
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
      var q = v;
      v = C;
      try {
        return O();
      } finally {
        v = q;
      }
    }, t.unstable_scheduleCallback = function(C, O, q) {
      var $ = t.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? $ + q : $) : q = $, C) {
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
      return ne = q + ne, C = {
        id: y++,
        callback: O,
        priorityLevel: C,
        startTime: q,
        expirationTime: ne,
        sortIndex: -1
      }, q > $ ? (C.sortIndex = q, a(g, C), i(p) === null && C === i(g) && (R ? (L(U), U = -1) : R = !0, Z(Y, q - $))) : (C.sortIndex = ne, a(p, C), S || x || (S = !0, B || (B = !0, Q()))), C;
    }, t.unstable_shouldYield = J, t.unstable_wrapCallback = function(C) {
      var O = v;
      return function() {
        var q = v;
        v = O;
        try {
          return C.apply(this, arguments);
        } finally {
          v = q;
        }
      };
    };
  })(fd)), fd;
}
var O0;
function Yw() {
  return O0 || (O0 = 1, cd.exports = Vw()), cd.exports;
}
var dd = { exports: {} }, un = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var L0;
function Gw() {
  if (L0) return un;
  L0 = 1;
  var t = Ao();
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
var H0;
function Kv() {
  if (H0) return dd.exports;
  H0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), dd.exports = Gw(), dd.exports;
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
var B0;
function qw() {
  if (B0) return ao;
  B0 = 1;
  var t = Yw(), a = Ao(), i = Kv();
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
        for (var b = !1, N = c.child; N; ) {
          if (N === l) {
            b = !0, l = c, r = d;
            break;
          }
          if (N === r) {
            b = !0, r = c, l = d;
            break;
          }
          N = N.sibling;
        }
        if (!b) {
          for (N = d.child; N; ) {
            if (N === l) {
              b = !0, l = d, r = c;
              break;
            }
            if (N === r) {
              b = !0, r = d, l = c;
              break;
            }
            N = N.sibling;
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
  var m = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), K = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), G = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = G && e[G] || e["@@iterator"], typeof e == "function" ? e : null);
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
      case M:
        return "Profiler";
      case T:
        return "StrictMode";
      case Y:
        return "Suspense";
      case B:
        return "SuspenseList";
      case K:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case z:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case U:
          return n = e.displayName || null, n !== null ? n : j(e.type) || "Memo";
        case A:
          n = e._payload, e = e._init;
          try {
            return j(e(n));
          } catch {
          }
      }
    return null;
  }
  var Z = Array.isArray, C = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, $ = [], ne = -1;
  function D(e) {
    return { current: e };
  }
  function V(e) {
    0 > ne || (e.current = $[ne], $[ne] = null, ne--);
  }
  function F(e, n) {
    ne++, $[ne] = e.current, e.current = n;
  }
  var le = D(null), se = D(null), me = D(null), ge = D(null);
  function ee(e, n) {
    switch (F(me, n), F(se, e), F(le, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Pp(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Pp(n), e = Wp(n, e);
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
    V(le), F(le, e);
  }
  function pe() {
    V(le), V(se), V(me);
  }
  function ze(e) {
    e.memoizedState !== null && F(ge, e);
    var n = le.current, l = Wp(n, e.type);
    n !== l && (F(se, e), F(le, l));
  }
  function Ae(e) {
    se.current === e && (V(le), V(se)), ge.current === e && (V(ge), Pr._currentValue = q);
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
      var d = r.DetermineComponentFrameRoot(), b = d[0], N = d[1];
      if (b && N) {
        var k = b.split(`
`), ae = N.split(`
`);
        for (c = r = 0; r < k.length && !k[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; c < ae.length && !ae[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (r === k.length || c === ae.length)
          for (r = k.length - 1, c = ae.length - 1; 1 <= r && 0 <= c && k[r] !== ae[c]; )
            c--;
        for (; 1 <= r && 0 <= c; r--, c--)
          if (k[r] !== ae[c]) {
            if (r !== 1 || c !== 1)
              do
                if (r--, c--, 0 > c || k[r] !== ae[c]) {
                  var ue = `
` + k[r].replace(" at new ", " at ");
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
  var pt = Object.prototype.hasOwnProperty, Gt = t.unstable_scheduleCallback, Jt = t.unstable_cancelCallback, Et = t.unstable_shouldYield, Qt = t.unstable_requestPaint, yt = t.unstable_now, _t = t.unstable_getCurrentPriorityLevel, Nt = t.unstable_ImmediatePriority, Pt = t.unstable_UserBlockingPriority, qt = t.unstable_NormalPriority, Wt = t.unstable_LowPriority, Ct = t.unstable_IdlePriority, nl = t.log, kn = t.unstable_setDisableYieldValue, Nn = null, $t = null;
  function Mt(e) {
    if (typeof nl == "function" && kn(e), $t && typeof $t.setStrictMode == "function")
      try {
        $t.setStrictMode(Nn, e);
      } catch {
      }
  }
  var zt = Math.clz32 ? Math.clz32 : mn, al = Math.log, pa = Math.LN2;
  function mn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (al(e) / pa | 0) | 0;
  }
  var ta = 256, Cn = 262144, Vn = 4194304;
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
    var N = r & 134217727;
    return N !== 0 ? (r = N & ~d, r !== 0 ? c = on(r) : (b &= N, b !== 0 ? c = on(b) : l || (l = N & ~e, l !== 0 && (c = on(l))))) : (N = r & ~d, N !== 0 ? c = on(N) : b !== 0 ? c = on(b) : l || (l = r & ~e, l !== 0 && (c = on(l)))), c === 0 ? 0 : n !== 0 && n !== c && (n & d) === 0 && (d = c & -c, l = n & -n, d >= l || d === 32 && (l & 4194048) !== 0) ? n : c;
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
  function jt() {
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
    var N = e.entanglements, k = e.expirationTimes, ae = e.hiddenUpdates;
    for (l = b & ~l; 0 < l; ) {
      var ue = 31 - zt(l), fe = 1 << ue;
      N[ue] = 0, k[ue] = -1;
      var ie = ae[ue];
      if (ie !== null)
        for (ae[ue] = null, ue = 0; ue < ie.length; ue++) {
          var oe = ie[ue];
          oe !== null && (oe.lane &= -536870913);
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
    return l = (l & 42) !== 0 ? 1 : I(l), (l & (e.suspendedLanes | n)) !== 0 ? 0 : l;
  }
  function I(e) {
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
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : w0(e.type));
  }
  function he(e, n) {
    var l = O.p;
    try {
      return O.p = e, n();
    } finally {
      O.p = l;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, xe = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Ce = "__reactEvents$" + Ee, Me = "__reactListeners$" + Ee, Be = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Ye = "__reactMarker$" + Ee;
  function Je(e) {
    delete e[ve], delete e[xe], delete e[Ce], delete e[Me], delete e[Be];
  }
  function mt(e) {
    var n = e[ve];
    if (n) return n;
    for (var l = e.parentNode; l; ) {
      if (n = l[be] || l[ve]) {
        if (l = n.alternate, n.child !== null || l !== null && l.child !== null)
          for (e = r0(e); e !== null; ) {
            if (l = e[ve]) return l;
            e = r0(e);
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
  function Tt(e) {
    var n = e[je];
    return n || (n = e[je] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Ke(e) {
    e[Ye] = !0;
  }
  var ya = /* @__PURE__ */ new Set(), Mn = {};
  function sn(e, n) {
    en(e, n), en(e + "Capture", n);
  }
  function en(e, n) {
    for (Mn[e] = n, e = 0; e < n.length; e++)
      ya.add(n[e]);
  }
  var gn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ll = {}, pn = {};
  function il(e) {
    return pt.call(pn, e) ? !0 : pt.call(ll, e) ? !1 : gn.test(e) ? pn[e] = !0 : (ll[e] = !0, !1);
  }
  function aa(e, n, l) {
    if (il(n))
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
  function Tn(e, n, l) {
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
  function rl(e) {
    if (!e._valueTracker) {
      var n = dn(e) ? "checked" : "value";
      e._valueTracker = Tn(
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
  function Ul(e, n, l, r, c, d, b, N) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), n != null ? b === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + st(n)) : e.value !== "" + st(n) && (e.value = "" + st(n)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), n != null ? hr(e, b, st(n)) : l != null ? hr(e, b, st(l)) : r != null && e.removeAttribute("value"), c == null && d != null && (e.defaultChecked = !!d), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), N != null && typeof N != "function" && typeof N != "symbol" && typeof N != "boolean" ? e.name = "" + st(N) : e.removeAttribute("name");
  }
  function pi(e, n, l, r, c, d, b, N) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || l != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        rl(e);
        return;
      }
      l = l != null ? "" + st(l) : "", n = n != null ? "" + st(n) : l, N || n === e.value || (e.value = n), e.defaultValue = n;
    }
    r = r ?? c, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = N ? e.checked : !!r, e.defaultChecked = !!r, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), rl(e);
  }
  function hr(e, n, l) {
    n === "number" && at(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function ol(e, n, l, r) {
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
  function mr(e, n, l) {
    if (n != null && (n = "" + st(n), n !== e.value && (e.value = n), l == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = l != null ? "" + st(l) : "";
  }
  function Ih(e, n, l, r) {
    if (n == null) {
      if (r != null) {
        if (l != null) throw Error(o(92));
        if (Z(r)) {
          if (1 < r.length) throw Error(o(93));
          r = r[0];
        }
        l = r;
      }
      l == null && (l = ""), n = l;
    }
    l = st(n), e.defaultValue = l, r = e.textContent, r === l && r !== "" && r !== null && (e.value = r), rl(e);
  }
  function yi(e, n) {
    if (n) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Ax = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Kh(e, n, l) {
    var r = n.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? r ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : r ? e.setProperty(n, l) : typeof l != "number" || l === 0 || Ax.has(n) ? n === "float" ? e.cssFloat = l : e[n] = ("" + l).trim() : e[n] = l + "px";
  }
  function Fh(e, n, l) {
    if (n != null && typeof n != "object")
      throw Error(o(62));
    if (e = e.style, l != null) {
      for (var r in l)
        !l.hasOwnProperty(r) || n != null && n.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var c in n)
        r = n[c], n.hasOwnProperty(c) && l[c] !== r && Kh(e, c, r);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && Kh(e, d, n[d]);
  }
  function nc(e) {
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
  var Dx = /* @__PURE__ */ new Map([
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
  ]), zx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yo(e) {
    return zx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function za() {
  }
  var ac = null;
  function lc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var vi = null, bi = null;
  function Jh(e) {
    var n = We(e);
    if (n && (e = n.stateNode)) {
      var l = e[xe] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Ul(
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
                Ul(
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
          mr(e, l.value, l.defaultValue);
          break e;
        case "select":
          n = l.value, n != null && ol(e, !!l.multiple, n, !1);
      }
    }
  }
  var ic = !1;
  function Ph(e, n, l) {
    if (ic) return e(n, l);
    ic = !0;
    try {
      var r = e(n);
      return r;
    } finally {
      if (ic = !1, (vi !== null || bi !== null) && (Ts(), vi && (n = vi, e = bi, bi = vi = null, Jh(n), e)))
        for (n = 0; n < e.length; n++) Jh(e[n]);
    }
  }
  function gr(e, n) {
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
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), rc = !1;
  if (ja)
    try {
      var pr = {};
      Object.defineProperty(pr, "passive", {
        get: function() {
          rc = !0;
        }
      }), window.addEventListener("test", pr, pr), window.removeEventListener("test", pr, pr);
    } catch {
      rc = !1;
    }
  var sl = null, oc = null, Go = null;
  function Wh() {
    if (Go) return Go;
    var e, n = oc, l = n.length, r, c = "value" in sl ? sl.value : sl.textContent, d = c.length;
    for (e = 0; e < l && n[e] === c[e]; e++) ;
    var b = l - e;
    for (r = 1; r <= b && n[l - r] === c[d - r]; r++) ;
    return Go = c.slice(e, 1 < r ? 1 - r : void 0);
  }
  function qo(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function $o() {
    return !0;
  }
  function em() {
    return !1;
  }
  function yn(e) {
    function n(l, r, c, d, b) {
      this._reactName = l, this._targetInst = c, this.type = r, this.nativeEvent = d, this.target = b, this.currentTarget = null;
      for (var N in e)
        e.hasOwnProperty(N) && (l = e[N], this[N] = l ? l(d) : d[N]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? $o : em, this.isPropagationStopped = em, this;
    }
    return m(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = $o);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = $o);
      },
      persist: function() {
      },
      isPersistent: $o
    }), n;
  }
  var kl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Xo = yn(kl), yr = m({}, kl, { view: 0, detail: 0 }), jx = yn(yr), sc, uc, vr, Zo = m({}, yr, {
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
    getModifierState: fc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== vr && (vr && e.type === "mousemove" ? (sc = e.screenX - vr.screenX, uc = e.screenY - vr.screenY) : uc = sc = 0, vr = e), sc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : uc;
    }
  }), tm = yn(Zo), Ox = m({}, Zo, { dataTransfer: 0 }), Lx = yn(Ox), Hx = m({}, yr, { relatedTarget: 0 }), cc = yn(Hx), Bx = m({}, kl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ux = yn(Bx), kx = m({}, kl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Vx = yn(kx), Yx = m({}, kl, { data: 0 }), nm = yn(Yx), Gx = {
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
  }, qx = {
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
  }, $x = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Xx(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = $x[e]) ? !!n[e] : !1;
  }
  function fc() {
    return Xx;
  }
  var Zx = m({}, yr, {
    key: function(e) {
      if (e.key) {
        var n = Gx[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = qo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qx[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fc,
    charCode: function(e) {
      return e.type === "keypress" ? qo(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? qo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Qx = yn(Zx), Ix = m({}, Zo, {
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
  }), am = yn(Ix), Kx = m({}, yr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fc
  }), Fx = yn(Kx), Jx = m({}, kl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Px = yn(Jx), Wx = m({}, Zo, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), eS = yn(Wx), tS = m({}, kl, {
    newState: 0,
    oldState: 0
  }), nS = yn(tS), aS = [9, 13, 27, 32], dc = ja && "CompositionEvent" in window, br = null;
  ja && "documentMode" in document && (br = document.documentMode);
  var lS = ja && "TextEvent" in window && !br, lm = ja && (!dc || br && 8 < br && 11 >= br), im = " ", rm = !1;
  function om(e, n) {
    switch (e) {
      case "keyup":
        return aS.indexOf(n.keyCode) !== -1;
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
  function sm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var xi = !1;
  function iS(e, n) {
    switch (e) {
      case "compositionend":
        return sm(n);
      case "keypress":
        return n.which !== 32 ? null : (rm = !0, im);
      case "textInput":
        return e = n.data, e === im && rm ? null : e;
      default:
        return null;
    }
  }
  function rS(e, n) {
    if (xi)
      return e === "compositionend" || !dc && om(e, n) ? (e = Wh(), Go = oc = sl = null, xi = !1, e) : null;
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
        return lm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var oS = {
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
  function um(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!oS[e.type] : n === "textarea";
  }
  function cm(e, n, l, r) {
    vi ? bi ? bi.push(r) : bi = [r] : vi = r, n = Ls(n, "onChange"), 0 < n.length && (l = new Xo(
      "onChange",
      "change",
      null,
      l,
      r
    ), e.push({ event: l, listeners: n }));
  }
  var xr = null, Sr = null;
  function sS(e) {
    Zp(e, 0);
  }
  function Qo(e) {
    var n = Ze(e);
    if (Da(n)) return e;
  }
  function fm(e, n) {
    if (e === "change") return n;
  }
  var dm = !1;
  if (ja) {
    var hc;
    if (ja) {
      var mc = "oninput" in document;
      if (!mc) {
        var hm = document.createElement("div");
        hm.setAttribute("oninput", "return;"), mc = typeof hm.oninput == "function";
      }
      hc = mc;
    } else hc = !1;
    dm = hc && (!document.documentMode || 9 < document.documentMode);
  }
  function mm() {
    xr && (xr.detachEvent("onpropertychange", gm), Sr = xr = null);
  }
  function gm(e) {
    if (e.propertyName === "value" && Qo(Sr)) {
      var n = [];
      cm(
        n,
        Sr,
        e,
        lc(e)
      ), Ph(sS, n);
    }
  }
  function uS(e, n, l) {
    e === "focusin" ? (mm(), xr = n, Sr = l, xr.attachEvent("onpropertychange", gm)) : e === "focusout" && mm();
  }
  function cS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Qo(Sr);
  }
  function fS(e, n) {
    if (e === "click") return Qo(n);
  }
  function dS(e, n) {
    if (e === "input" || e === "change")
      return Qo(n);
  }
  function hS(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Rn = typeof Object.is == "function" ? Object.is : hS;
  function wr(e, n) {
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
  function pm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ym(e, n) {
    var l = pm(e);
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
      l = pm(l);
    }
  }
  function vm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? vm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function bm(e) {
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
  function gc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var mS = ja && "documentMode" in document && 11 >= document.documentMode, Si = null, pc = null, Er = null, yc = !1;
  function xm(e, n, l) {
    var r = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    yc || Si == null || Si !== at(r) || (r = Si, "selectionStart" in r && gc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Er && wr(Er, r) || (Er = r, r = Ls(pc, "onSelect"), 0 < r.length && (n = new Xo(
      "onSelect",
      "select",
      null,
      n,
      l
    ), e.push({ event: n, listeners: r }), n.target = Si)));
  }
  function Vl(e, n) {
    var l = {};
    return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
  }
  var wi = {
    animationend: Vl("Animation", "AnimationEnd"),
    animationiteration: Vl("Animation", "AnimationIteration"),
    animationstart: Vl("Animation", "AnimationStart"),
    transitionrun: Vl("Transition", "TransitionRun"),
    transitionstart: Vl("Transition", "TransitionStart"),
    transitioncancel: Vl("Transition", "TransitionCancel"),
    transitionend: Vl("Transition", "TransitionEnd")
  }, vc = {}, Sm = {};
  ja && (Sm = document.createElement("div").style, "AnimationEvent" in window || (delete wi.animationend.animation, delete wi.animationiteration.animation, delete wi.animationstart.animation), "TransitionEvent" in window || delete wi.transitionend.transition);
  function Yl(e) {
    if (vc[e]) return vc[e];
    if (!wi[e]) return e;
    var n = wi[e], l;
    for (l in n)
      if (n.hasOwnProperty(l) && l in Sm)
        return vc[e] = n[l];
    return e;
  }
  var wm = Yl("animationend"), Em = Yl("animationiteration"), _m = Yl("animationstart"), gS = Yl("transitionrun"), pS = Yl("transitionstart"), yS = Yl("transitioncancel"), Nm = Yl("transitionend"), Cm = /* @__PURE__ */ new Map(), bc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  bc.push("scrollEnd");
  function ia(e, n) {
    Cm.set(e, n), sn(n, [e]);
  }
  var Io = typeof reportError == "function" ? reportError : function(e) {
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
  }, Gn = [], Ei = 0, xc = 0;
  function Ko() {
    for (var e = Ei, n = xc = Ei = 0; n < e; ) {
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
      d !== 0 && Mm(l, c, d);
    }
  }
  function Fo(e, n, l, r) {
    Gn[Ei++] = e, Gn[Ei++] = n, Gn[Ei++] = l, Gn[Ei++] = r, xc |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Sc(e, n, l, r) {
    return Fo(e, n, l, r), Jo(e);
  }
  function Gl(e, n) {
    return Fo(e, null, null, n), Jo(e);
  }
  function Mm(e, n, l) {
    e.lanes |= l;
    var r = e.alternate;
    r !== null && (r.lanes |= l);
    for (var c = !1, d = e.return; d !== null; )
      d.childLanes |= l, r = d.alternate, r !== null && (r.childLanes |= l), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (c = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, c && n !== null && (c = 31 - zt(l), e = d.hiddenUpdates, r = e[c], r === null ? e[c] = [n] : r.push(n), n.lane = l | 536870912), d) : null;
  }
  function Jo(e) {
    if (50 < Xr)
      throw Xr = 0, Df = null, Error(o(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var _i = {};
  function vS(e, n, l, r) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function An(e, n, l, r) {
    return new vS(e, n, l, r);
  }
  function wc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Oa(e, n) {
    var l = e.alternate;
    return l === null ? (l = An(
      e.tag,
      n,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, n = e.dependencies, l.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Tm(e, n) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, n = l.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Po(e, n, l, r, c, d) {
    var b = 0;
    if (r = e, typeof e == "function") wc(e) && (b = 1);
    else if (typeof e == "string")
      b = Ew(
        e,
        l,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case K:
          return e = An(31, l, n, c), e.elementType = K, e.lanes = d, e;
        case R:
          return ql(l.children, c, d, n);
        case T:
          b = 8, c |= 24;
          break;
        case M:
          return e = An(12, l, n, c | 2), e.elementType = M, e.lanes = d, e;
        case Y:
          return e = An(13, l, n, c), e.elementType = Y, e.lanes = d, e;
        case B:
          return e = An(19, l, n, c), e.elementType = B, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                b = 10;
                break e;
              case L:
                b = 9;
                break e;
              case z:
                b = 11;
                break e;
              case U:
                b = 14;
                break e;
              case A:
                b = 16, r = null;
                break e;
            }
          b = 29, l = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return n = An(b, l, n, c), n.elementType = e, n.type = r, n.lanes = d, n;
  }
  function ql(e, n, l, r) {
    return e = An(7, e, r, n), e.lanes = l, e;
  }
  function Ec(e, n, l) {
    return e = An(6, e, null, n), e.lanes = l, e;
  }
  function Rm(e) {
    var n = An(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function _c(e, n, l) {
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
  var Am = /* @__PURE__ */ new WeakMap();
  function qn(e, n) {
    if (typeof e == "object" && e !== null) {
      var l = Am.get(e);
      return l !== void 0 ? l : (n = {
        value: e,
        source: n,
        stack: Ft(n)
      }, Am.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ft(n)
    };
  }
  var Ni = [], Ci = 0, Wo = null, _r = 0, $n = [], Xn = 0, ul = null, va = 1, ba = "";
  function La(e, n) {
    Ni[Ci++] = _r, Ni[Ci++] = Wo, Wo = e, _r = n;
  }
  function Dm(e, n, l) {
    $n[Xn++] = va, $n[Xn++] = ba, $n[Xn++] = ul, ul = e;
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
  function Nc(e) {
    e.return !== null && (La(e, 1), Dm(e, 1, 0));
  }
  function Cc(e) {
    for (; e === Wo; )
      Wo = Ni[--Ci], Ni[Ci] = null, _r = Ni[--Ci], Ni[Ci] = null;
    for (; e === ul; )
      ul = $n[--Xn], $n[Xn] = null, ba = $n[--Xn], $n[Xn] = null, va = $n[--Xn], $n[Xn] = null;
  }
  function zm(e, n) {
    $n[Xn++] = va, $n[Xn++] = ba, $n[Xn++] = ul, va = n.id, ba = n.overflow, ul = e;
  }
  var nn = null, vt = null, Fe = !1, cl = null, Zn = !1, Mc = Error(o(519));
  function fl(e) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Nr(qn(n, e)), Mc;
  }
  function jm(e) {
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
        for (l = 0; l < Qr.length; l++)
          Xe(Qr[l], n);
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
        Xe("invalid", n), pi(
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
        Xe("invalid", n), Ih(n, r.value, r.defaultValue, r.children);
    }
    l = r.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || n.textContent === "" + l || r.suppressHydrationWarning === !0 || Fp(n.textContent, l) ? (r.popover != null && (Xe("beforetoggle", n), Xe("toggle", n)), r.onScroll != null && Xe("scroll", n), r.onScrollEnd != null && Xe("scrollend", n), r.onClick != null && (n.onclick = za), n = !0) : n = !1, n || fl(e, !0);
  }
  function Om(e) {
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
  function Mi(e) {
    if (e !== nn) return !1;
    if (!Fe) return Om(e), Fe = !0, !1;
    var n = e.tag, l;
    if ((l = n !== 3 && n !== 27) && ((l = n === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Zf(e.type, e.memoizedProps)), l = !l), l && vt && fl(e), Om(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      vt = i0(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      vt = i0(e);
    } else
      n === 27 ? (n = vt, Nl(e.type) ? (e = Jf, Jf = null, vt = e) : vt = n) : vt = nn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $l() {
    vt = nn = null, Fe = !1;
  }
  function Tc() {
    var e = cl;
    return e !== null && (Sn === null ? Sn = e : Sn.push.apply(
      Sn,
      e
    ), cl = null), e;
  }
  function Nr(e) {
    cl === null ? cl = [e] : cl.push(e);
  }
  var Rc = D(null), Xl = null, Ha = null;
  function dl(e, n, l) {
    F(Rc, n._currentValue), n._currentValue = l;
  }
  function Ba(e) {
    e._currentValue = Rc.current, V(Rc);
  }
  function Ac(e, n, l) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, r !== null && (r.childLanes |= n)) : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n), e === l) break;
      e = e.return;
    }
  }
  function Dc(e, n, l, r) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var d = c.dependencies;
      if (d !== null) {
        var b = c.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var N = d;
          d = c;
          for (var k = 0; k < n.length; k++)
            if (N.context === n[k]) {
              d.lanes |= l, N = d.alternate, N !== null && (N.lanes |= l), Ac(
                d.return,
                l,
                e
              ), r || (b = null);
              break e;
            }
          d = N.next;
        }
      } else if (c.tag === 18) {
        if (b = c.return, b === null) throw Error(o(341));
        b.lanes |= l, d = b.alternate, d !== null && (d.lanes |= l), Ac(b, l, e), b = null;
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
  function Ti(e, n, l, r) {
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
          var N = c.type;
          Rn(c.pendingProps.value, b.value) || (e !== null ? e.push(N) : e = [N]);
        }
      } else if (c === ge.current) {
        if (b = c.alternate, b === null) throw Error(o(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Pr) : e = [Pr]);
      }
      c = c.return;
    }
    e !== null && Dc(
      n,
      e,
      l,
      r
    ), n.flags |= 262144;
  }
  function es(e) {
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
  function Zl(e) {
    Xl = e, Ha = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function an(e) {
    return Lm(Xl, e);
  }
  function ts(e, n) {
    return Xl === null && Zl(e), Lm(e, n);
  }
  function Lm(e, n) {
    var l = n._currentValue;
    if (n = { context: n, memoizedValue: l, next: null }, Ha === null) {
      if (e === null) throw Error(o(308));
      Ha = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ha = Ha.next = n;
    return l;
  }
  var bS = typeof AbortController < "u" ? AbortController : function() {
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
  }, xS = t.unstable_scheduleCallback, SS = t.unstable_NormalPriority, Bt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function zc() {
    return {
      controller: new bS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Cr(e) {
    e.refCount--, e.refCount === 0 && xS(SS, function() {
      e.controller.abort();
    });
  }
  var Mr = null, jc = 0, Ri = 0, Ai = null;
  function wS(e, n) {
    if (Mr === null) {
      var l = Mr = [];
      jc = 0, Ri = Bf(), Ai = {
        status: "pending",
        value: void 0,
        then: function(r) {
          l.push(r);
        }
      };
    }
    return jc++, n.then(Hm, Hm), n;
  }
  function Hm() {
    if (--jc === 0 && Mr !== null) {
      Ai !== null && (Ai.status = "fulfilled");
      var e = Mr;
      Mr = null, Ri = 0, Ai = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function ES(e, n) {
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
  var Bm = C.S;
  C.S = function(e, n) {
    xp = yt(), typeof n == "object" && n !== null && typeof n.then == "function" && wS(e, n), Bm !== null && Bm(e, n);
  };
  var Ql = D(null);
  function Oc() {
    var e = Ql.current;
    return e !== null ? e : gt.pooledCache;
  }
  function ns(e, n) {
    n === null ? F(Ql, Ql.current) : F(Ql, n.pool);
  }
  function Um() {
    var e = Oc();
    return e === null ? null : { parent: Bt._currentValue, pool: e };
  }
  var Di = Error(o(460)), Lc = Error(o(474)), as = Error(o(542)), ls = { then: function() {
  } };
  function km(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Vm(e, n, l) {
    switch (l = e[l], l === void 0 ? e.push(n) : l !== n && (n.then(za, za), n = l), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Gm(e), e;
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
            throw e = n.reason, Gm(e), e;
        }
        throw Kl = n, Di;
    }
  }
  function Il(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Kl = l, Di) : l;
    }
  }
  var Kl = null;
  function Ym() {
    if (Kl === null) throw Error(o(459));
    var e = Kl;
    return Kl = null, e;
  }
  function Gm(e) {
    if (e === Di || e === as)
      throw Error(o(483));
  }
  var zi = null, Tr = 0;
  function is(e) {
    var n = Tr;
    return Tr += 1, zi === null && (zi = []), Vm(zi, e, n);
  }
  function Rr(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function rs(e, n) {
    throw n.$$typeof === v ? Error(o(525)) : (e = Object.prototype.toString.call(n), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function qm(e) {
    function n(P, X) {
      if (e) {
        var te = P.deletions;
        te === null ? (P.deletions = [X], P.flags |= 16) : te.push(X);
      }
    }
    function l(P, X) {
      if (!e) return null;
      for (; X !== null; )
        n(P, X), X = X.sibling;
      return null;
    }
    function r(P) {
      for (var X = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? X.set(P.key, P) : X.set(P.index, P), P = P.sibling;
      return X;
    }
    function c(P, X) {
      return P = Oa(P, X), P.index = 0, P.sibling = null, P;
    }
    function d(P, X, te) {
      return P.index = te, e ? (te = P.alternate, te !== null ? (te = te.index, te < X ? (P.flags |= 67108866, X) : te) : (P.flags |= 67108866, X)) : (P.flags |= 1048576, X);
    }
    function b(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function N(P, X, te, ce) {
      return X === null || X.tag !== 6 ? (X = Ec(te, P.mode, ce), X.return = P, X) : (X = c(X, te), X.return = P, X);
    }
    function k(P, X, te, ce) {
      var Re = te.type;
      return Re === R ? ue(
        P,
        X,
        te.props.children,
        ce,
        te.key
      ) : X !== null && (X.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === A && Il(Re) === X.type) ? (X = c(X, te.props), Rr(X, te), X.return = P, X) : (X = Po(
        te.type,
        te.key,
        te.props,
        null,
        P.mode,
        ce
      ), Rr(X, te), X.return = P, X);
    }
    function ae(P, X, te, ce) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== te.containerInfo || X.stateNode.implementation !== te.implementation ? (X = _c(te, P.mode, ce), X.return = P, X) : (X = c(X, te.children || []), X.return = P, X);
    }
    function ue(P, X, te, ce, Re) {
      return X === null || X.tag !== 7 ? (X = ql(
        te,
        P.mode,
        ce,
        Re
      ), X.return = P, X) : (X = c(X, te), X.return = P, X);
    }
    function fe(P, X, te) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = Ec(
          "" + X,
          P.mode,
          te
        ), X.return = P, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return te = Po(
              X.type,
              X.key,
              X.props,
              null,
              P.mode,
              te
            ), Rr(te, X), te.return = P, te;
          case S:
            return X = _c(
              X,
              P.mode,
              te
            ), X.return = P, X;
          case A:
            return X = Il(X), fe(P, X, te);
        }
        if (Z(X) || Q(X))
          return X = ql(
            X,
            P.mode,
            te,
            null
          ), X.return = P, X;
        if (typeof X.then == "function")
          return fe(P, is(X), te);
        if (X.$$typeof === _)
          return fe(
            P,
            ts(P, X),
            te
          );
        rs(P, X);
      }
      return null;
    }
    function ie(P, X, te, ce) {
      var Re = X !== null ? X.key : null;
      if (typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint")
        return Re !== null ? null : N(P, X, "" + te, ce);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case x:
            return te.key === Re ? k(P, X, te, ce) : null;
          case S:
            return te.key === Re ? ae(P, X, te, ce) : null;
          case A:
            return te = Il(te), ie(P, X, te, ce);
        }
        if (Z(te) || Q(te))
          return Re !== null ? null : ue(P, X, te, ce, null);
        if (typeof te.then == "function")
          return ie(
            P,
            X,
            is(te),
            ce
          );
        if (te.$$typeof === _)
          return ie(
            P,
            X,
            ts(P, te),
            ce
          );
        rs(P, te);
      }
      return null;
    }
    function oe(P, X, te, ce, Re) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return P = P.get(te) || null, N(X, P, "" + ce, Re);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return P = P.get(
              ce.key === null ? te : ce.key
            ) || null, k(X, P, ce, Re);
          case S:
            return P = P.get(
              ce.key === null ? te : ce.key
            ) || null, ae(X, P, ce, Re);
          case A:
            return ce = Il(ce), oe(
              P,
              X,
              te,
              ce,
              Re
            );
        }
        if (Z(ce) || Q(ce))
          return P = P.get(te) || null, ue(X, P, ce, Re, null);
        if (typeof ce.then == "function")
          return oe(
            P,
            X,
            te,
            is(ce),
            Re
          );
        if (ce.$$typeof === _)
          return oe(
            P,
            X,
            te,
            ts(X, ce),
            Re
          );
        rs(X, ce);
      }
      return null;
    }
    function _e(P, X, te, ce) {
      for (var Re = null, et = null, Ne = X, Ve = X = 0, Ie = null; Ne !== null && Ve < te.length; Ve++) {
        Ne.index > Ve ? (Ie = Ne, Ne = null) : Ie = Ne.sibling;
        var tt = ie(
          P,
          Ne,
          te[Ve],
          ce
        );
        if (tt === null) {
          Ne === null && (Ne = Ie);
          break;
        }
        e && Ne && tt.alternate === null && n(P, Ne), X = d(tt, X, Ve), et === null ? Re = tt : et.sibling = tt, et = tt, Ne = Ie;
      }
      if (Ve === te.length)
        return l(P, Ne), Fe && La(P, Ve), Re;
      if (Ne === null) {
        for (; Ve < te.length; Ve++)
          Ne = fe(P, te[Ve], ce), Ne !== null && (X = d(
            Ne,
            X,
            Ve
          ), et === null ? Re = Ne : et.sibling = Ne, et = Ne);
        return Fe && La(P, Ve), Re;
      }
      for (Ne = r(Ne); Ve < te.length; Ve++)
        Ie = oe(
          Ne,
          P,
          Ve,
          te[Ve],
          ce
        ), Ie !== null && (e && Ie.alternate !== null && Ne.delete(
          Ie.key === null ? Ve : Ie.key
        ), X = d(
          Ie,
          X,
          Ve
        ), et === null ? Re = Ie : et.sibling = Ie, et = Ie);
      return e && Ne.forEach(function(Al) {
        return n(P, Al);
      }), Fe && La(P, Ve), Re;
    }
    function Oe(P, X, te, ce) {
      if (te == null) throw Error(o(151));
      for (var Re = null, et = null, Ne = X, Ve = X = 0, Ie = null, tt = te.next(); Ne !== null && !tt.done; Ve++, tt = te.next()) {
        Ne.index > Ve ? (Ie = Ne, Ne = null) : Ie = Ne.sibling;
        var Al = ie(P, Ne, tt.value, ce);
        if (Al === null) {
          Ne === null && (Ne = Ie);
          break;
        }
        e && Ne && Al.alternate === null && n(P, Ne), X = d(Al, X, Ve), et === null ? Re = Al : et.sibling = Al, et = Al, Ne = Ie;
      }
      if (tt.done)
        return l(P, Ne), Fe && La(P, Ve), Re;
      if (Ne === null) {
        for (; !tt.done; Ve++, tt = te.next())
          tt = fe(P, tt.value, ce), tt !== null && (X = d(tt, X, Ve), et === null ? Re = tt : et.sibling = tt, et = tt);
        return Fe && La(P, Ve), Re;
      }
      for (Ne = r(Ne); !tt.done; Ve++, tt = te.next())
        tt = oe(Ne, P, Ve, tt.value, ce), tt !== null && (e && tt.alternate !== null && Ne.delete(tt.key === null ? Ve : tt.key), X = d(tt, X, Ve), et === null ? Re = tt : et.sibling = tt, et = tt);
      return e && Ne.forEach(function(Ow) {
        return n(P, Ow);
      }), Fe && La(P, Ve), Re;
    }
    function ht(P, X, te, ce) {
      if (typeof te == "object" && te !== null && te.type === R && te.key === null && (te = te.props.children), typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case x:
            e: {
              for (var Re = te.key; X !== null; ) {
                if (X.key === Re) {
                  if (Re = te.type, Re === R) {
                    if (X.tag === 7) {
                      l(
                        P,
                        X.sibling
                      ), ce = c(
                        X,
                        te.props.children
                      ), ce.return = P, P = ce;
                      break e;
                    }
                  } else if (X.elementType === Re || typeof Re == "object" && Re !== null && Re.$$typeof === A && Il(Re) === X.type) {
                    l(
                      P,
                      X.sibling
                    ), ce = c(X, te.props), Rr(ce, te), ce.return = P, P = ce;
                    break e;
                  }
                  l(P, X);
                  break;
                } else n(P, X);
                X = X.sibling;
              }
              te.type === R ? (ce = ql(
                te.props.children,
                P.mode,
                ce,
                te.key
              ), ce.return = P, P = ce) : (ce = Po(
                te.type,
                te.key,
                te.props,
                null,
                P.mode,
                ce
              ), Rr(ce, te), ce.return = P, P = ce);
            }
            return b(P);
          case S:
            e: {
              for (Re = te.key; X !== null; ) {
                if (X.key === Re)
                  if (X.tag === 4 && X.stateNode.containerInfo === te.containerInfo && X.stateNode.implementation === te.implementation) {
                    l(
                      P,
                      X.sibling
                    ), ce = c(X, te.children || []), ce.return = P, P = ce;
                    break e;
                  } else {
                    l(P, X);
                    break;
                  }
                else n(P, X);
                X = X.sibling;
              }
              ce = _c(te, P.mode, ce), ce.return = P, P = ce;
            }
            return b(P);
          case A:
            return te = Il(te), ht(
              P,
              X,
              te,
              ce
            );
        }
        if (Z(te))
          return _e(
            P,
            X,
            te,
            ce
          );
        if (Q(te)) {
          if (Re = Q(te), typeof Re != "function") throw Error(o(150));
          return te = Re.call(te), Oe(
            P,
            X,
            te,
            ce
          );
        }
        if (typeof te.then == "function")
          return ht(
            P,
            X,
            is(te),
            ce
          );
        if (te.$$typeof === _)
          return ht(
            P,
            X,
            ts(P, te),
            ce
          );
        rs(P, te);
      }
      return typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint" ? (te = "" + te, X !== null && X.tag === 6 ? (l(P, X.sibling), ce = c(X, te), ce.return = P, P = ce) : (l(P, X), ce = Ec(te, P.mode, ce), ce.return = P, P = ce), b(P)) : l(P, X);
    }
    return function(P, X, te, ce) {
      try {
        Tr = 0;
        var Re = ht(
          P,
          X,
          te,
          ce
        );
        return zi = null, Re;
      } catch (Ne) {
        if (Ne === Di || Ne === as) throw Ne;
        var et = An(29, Ne, null, P.mode);
        return et.lanes = ce, et.return = P, et;
      } finally {
      }
    };
  }
  var Fl = qm(!0), $m = qm(!1), hl = !1;
  function Hc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ml(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function gl(e, n, l) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (lt & 2) !== 0) {
      var c = r.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), r.pending = n, n = Jo(e), Mm(e, null, l), n;
    }
    return Fo(e, r, n, l), Jo(e);
  }
  function Ar(e, n, l) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (l & 4194048) !== 0)) {
      var r = n.lanes;
      r &= e.pendingLanes, l |= r, n.lanes = l, It(e, l);
    }
  }
  function Uc(e, n) {
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
  var kc = !1;
  function Dr() {
    if (kc) {
      var e = Ai;
      if (e !== null) throw e;
    }
  }
  function zr(e, n, l, r) {
    kc = !1;
    var c = e.updateQueue;
    hl = !1;
    var d = c.firstBaseUpdate, b = c.lastBaseUpdate, N = c.shared.pending;
    if (N !== null) {
      c.shared.pending = null;
      var k = N, ae = k.next;
      k.next = null, b === null ? d = ae : b.next = ae, b = k;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, N = ue.lastBaseUpdate, N !== b && (N === null ? ue.firstBaseUpdate = ae : N.next = ae, ue.lastBaseUpdate = k));
    }
    if (d !== null) {
      var fe = c.baseState;
      b = 0, ue = ae = k = null, N = d;
      do {
        var ie = N.lane & -536870913, oe = ie !== N.lane;
        if (oe ? (Qe & ie) === ie : (r & ie) === ie) {
          ie !== 0 && ie === Ri && (kc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = e, Oe = N;
            ie = n;
            var ht = l;
            switch (Oe.tag) {
              case 1:
                if (_e = Oe.payload, typeof _e == "function") {
                  fe = _e.call(ht, fe, ie);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = Oe.payload, ie = typeof _e == "function" ? _e.call(ht, fe, ie) : _e, ie == null) break e;
                fe = m({}, fe, ie);
                break e;
              case 2:
                hl = !0;
            }
          }
          ie = N.callback, ie !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = c.callbacks, oe === null ? c.callbacks = [ie] : oe.push(ie));
        } else
          oe = {
            lane: ie,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          }, ue === null ? (ae = ue = oe, k = fe) : ue = ue.next = oe, b |= ie;
        if (N = N.next, N === null) {
          if (N = c.shared.pending, N === null)
            break;
          oe = N, N = oe.next, oe.next = null, c.lastBaseUpdate = oe, c.shared.pending = null;
        }
      } while (!0);
      ue === null && (k = fe), c.baseState = k, c.firstBaseUpdate = ae, c.lastBaseUpdate = ue, d === null && (c.shared.lanes = 0), xl |= b, e.lanes = b, e.memoizedState = fe;
    }
  }
  function Xm(e, n) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(n);
  }
  function Zm(e, n) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Xm(l[e], n);
  }
  var ji = D(null), os = D(0);
  function Qm(e, n) {
    e = Za, F(os, e), F(ji, n), Za = e | n.baseLanes;
  }
  function Vc() {
    F(os, Za), F(ji, ji.current);
  }
  function Yc() {
    Za = os.current, V(ji), V(os);
  }
  var Dn = D(null), Qn = null;
  function pl(e) {
    var n = e.alternate;
    F(Ot, Ot.current & 1), F(Dn, e), Qn === null && (n === null || ji.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Gc(e) {
    F(Ot, Ot.current), F(Dn, e), Qn === null && (Qn = e);
  }
  function Im(e) {
    e.tag === 22 ? (F(Ot, Ot.current), F(Dn, e), Qn === null && (Qn = e)) : yl();
  }
  function yl() {
    F(Ot, Ot.current), F(Dn, Dn.current);
  }
  function zn(e) {
    V(Dn), Qn === e && (Qn = null), V(Ot);
  }
  var Ot = D(0);
  function ss(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var l = n.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Kf(l) || Ff(l)))
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
  var Ua = 0, ke = null, ft = null, Ut = null, us = !1, Oi = !1, Jl = !1, cs = 0, jr = 0, Li = null, _S = 0;
  function At() {
    throw Error(o(321));
  }
  function qc(e, n) {
    if (n === null) return !1;
    for (var l = 0; l < n.length && l < e.length; l++)
      if (!Rn(e[l], n[l])) return !1;
    return !0;
  }
  function $c(e, n, l, r, c, d) {
    return Ua = d, ke = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, C.H = e === null || e.memoizedState === null ? Dg : rf, Jl = !1, d = l(r, c), Jl = !1, Oi && (d = Fm(
      n,
      l,
      r,
      c
    )), Km(e), d;
  }
  function Km(e) {
    C.H = Hr;
    var n = ft !== null && ft.next !== null;
    if (Ua = 0, Ut = ft = ke = null, us = !1, jr = 0, Li = null, n) throw Error(o(300));
    e === null || kt || (e = e.dependencies, e !== null && es(e) && (kt = !0));
  }
  function Fm(e, n, l, r) {
    ke = e;
    var c = 0;
    do {
      if (Oi && (Li = null), jr = 0, Oi = !1, 25 <= c) throw Error(o(301));
      if (c += 1, Ut = ft = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      C.H = zg, d = n(l, r);
    } while (Oi);
    return d;
  }
  function NS() {
    var e = C.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Or(n) : n, e = e.useState()[0], (ft !== null ? ft.memoizedState : null) !== e && (ke.flags |= 1024), n;
  }
  function Xc() {
    var e = cs !== 0;
    return cs = 0, e;
  }
  function Zc(e, n, l) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l;
  }
  function Qc(e) {
    if (us) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      us = !1;
    }
    Ua = 0, Ut = ft = ke = null, Oi = !1, jr = cs = 0, Li = null;
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
  function fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Or(e) {
    var n = jr;
    return jr += 1, Li === null && (Li = []), e = Vm(Li, e, n), n = ke, (Ut === null ? n.memoizedState : Ut.next) === null && (n = n.alternate, C.H = n === null || n.memoizedState === null ? Dg : rf), e;
  }
  function ds(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Or(e);
      if (e.$$typeof === _) return an(e);
    }
    throw Error(o(438, String(e)));
  }
  function Ic(e) {
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
    if (n == null && (n = { data: [], index: 0 }), l === null && (l = fs(), ke.updateQueue = l), l.memoCache = n, l = n.data[n.index], l === void 0)
      for (l = n.data[n.index] = Array(e), r = 0; r < e; r++)
        l[r] = J;
    return n.index++, l;
  }
  function ka(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function hs(e) {
    var n = Lt();
    return Kc(n, ft, e);
  }
  function Kc(e, n, l) {
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
      var N = b = null, k = null, ae = n, ue = !1;
      do {
        var fe = ae.lane & -536870913;
        if (fe !== ae.lane ? (Qe & fe) === fe : (Ua & fe) === fe) {
          var ie = ae.revertLane;
          if (ie === 0)
            k !== null && (k = k.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }), fe === Ri && (ue = !0);
          else if ((Ua & ie) === ie) {
            ae = ae.next, ie === Ri && (ue = !0);
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
            }, k === null ? (N = k = fe, b = d) : k = k.next = fe, ke.lanes |= ie, xl |= ie;
          fe = ae.action, Jl && l(d, fe), d = ae.hasEagerState ? ae.eagerState : l(d, fe);
        } else
          ie = {
            lane: fe,
            revertLane: ae.revertLane,
            gesture: ae.gesture,
            action: ae.action,
            hasEagerState: ae.hasEagerState,
            eagerState: ae.eagerState,
            next: null
          }, k === null ? (N = k = ie, b = d) : k = k.next = ie, ke.lanes |= fe, xl |= fe;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if (k === null ? b = d : k.next = N, !Rn(d, e.memoizedState) && (kt = !0, ue && (l = Ai, l !== null)))
        throw l;
      e.memoizedState = d, e.baseState = b, e.baseQueue = k, r.lastRenderedState = d;
    }
    return c === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function Fc(e) {
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
  function Jm(e, n, l) {
    var r = ke, c = Lt(), d = Fe;
    if (d) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = n();
    var b = !Rn(
      (ft || c).memoizedState,
      l
    );
    if (b && (c.memoizedState = l, kt = !0), c = c.queue, Wc(eg.bind(null, r, c, e), [
      e
    ]), c.getSnapshot !== n || b || Ut !== null && Ut.memoizedState.tag & 1) {
      if (r.flags |= 2048, Hi(
        9,
        { destroy: void 0 },
        Wm.bind(
          null,
          r,
          c,
          l,
          n
        ),
        null
      ), gt === null) throw Error(o(349));
      d || (Ua & 127) !== 0 || Pm(r, n, l);
    }
    return l;
  }
  function Pm(e, n, l) {
    e.flags |= 16384, e = { getSnapshot: n, value: l }, n = ke.updateQueue, n === null ? (n = fs(), ke.updateQueue = n, n.stores = [e]) : (l = n.stores, l === null ? n.stores = [e] : l.push(e));
  }
  function Wm(e, n, l, r) {
    n.value = l, n.getSnapshot = r, tg(n) && ng(e);
  }
  function eg(e, n, l) {
    return l(function() {
      tg(n) && ng(e);
    });
  }
  function tg(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var l = n();
      return !Rn(e, l);
    } catch {
      return !0;
    }
  }
  function ng(e) {
    var n = Gl(e, 2);
    n !== null && wn(n, e, 2);
  }
  function Jc(e) {
    var n = hn();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Jl) {
        Mt(!0);
        try {
          l();
        } finally {
          Mt(!1);
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
  function ag(e, n, l, r) {
    return e.baseState = l, Kc(
      e,
      ft,
      typeof r == "function" ? r : ka
    );
  }
  function CS(e, n, l, r, c) {
    if (ps(e)) throw Error(o(485));
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
      C.T !== null ? l(!0) : d.isTransition = !1, r(d), l = n.pending, l === null ? (d.next = n.pending = d, lg(n, d)) : (d.next = l.next, n.pending = l.next = d);
    }
  }
  function lg(e, n) {
    var l = n.action, r = n.payload, c = e.state;
    if (n.isTransition) {
      var d = C.T, b = {};
      C.T = b;
      try {
        var N = l(c, r), k = C.S;
        k !== null && k(b, N), ig(e, n, N);
      } catch (ae) {
        Pc(e, n, ae);
      } finally {
        d !== null && b.types !== null && (d.types = b.types), C.T = d;
      }
    } else
      try {
        d = l(c, r), ig(e, n, d);
      } catch (ae) {
        Pc(e, n, ae);
      }
  }
  function ig(e, n, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(r) {
        rg(e, n, r);
      },
      function(r) {
        return Pc(e, n, r);
      }
    ) : rg(e, n, l);
  }
  function rg(e, n, l) {
    n.status = "fulfilled", n.value = l, og(n), e.state = l, n = e.pending, n !== null && (l = n.next, l === n ? e.pending = null : (l = l.next, n.next = l, lg(e, l)));
  }
  function Pc(e, n, l) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        n.status = "rejected", n.reason = l, og(n), n = n.next;
      while (n !== r);
    }
    e.action = null;
  }
  function og(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function sg(e, n) {
    return n;
  }
  function ug(e, n) {
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
            fl(r);
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
      lastRenderedReducer: sg,
      lastRenderedState: n
    }, l.queue = r, l = Tg.bind(
      null,
      ke,
      r
    ), r.dispatch = l, r = Jc(!1), d = lf.bind(
      null,
      ke,
      !1,
      r.queue
    ), r = hn(), c = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = c, l = CS.bind(
      null,
      ke,
      c,
      d,
      l
    ), c.dispatch = l, r.memoizedState = e, [n, l, !1];
  }
  function cg(e) {
    var n = Lt();
    return fg(n, ft, e);
  }
  function fg(e, n, l) {
    if (n = Kc(
      e,
      n,
      sg
    )[0], e = hs(ka)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var r = Or(n);
      } catch (b) {
        throw b === Di ? as : b;
      }
    else r = n;
    n = Lt();
    var c = n.queue, d = c.dispatch;
    return l !== n.memoizedState && (ke.flags |= 2048, Hi(
      9,
      { destroy: void 0 },
      MS.bind(null, c, l),
      null
    )), [r, d, e];
  }
  function MS(e, n) {
    e.action = n;
  }
  function dg(e) {
    var n = Lt(), l = ft;
    if (l !== null)
      return fg(n, l, e);
    Lt(), n = n.memoizedState, l = Lt();
    var r = l.queue.dispatch;
    return l.memoizedState = e, [n, r, !1];
  }
  function Hi(e, n, l, r) {
    return e = { tag: e, create: l, deps: r, inst: n, next: null }, n = ke.updateQueue, n === null && (n = fs(), ke.updateQueue = n), l = n.lastEffect, l === null ? n.lastEffect = e.next = e : (r = l.next, l.next = e, e.next = r, n.lastEffect = e), e;
  }
  function hg() {
    return Lt().memoizedState;
  }
  function ms(e, n, l, r) {
    var c = hn();
    ke.flags |= e, c.memoizedState = Hi(
      1 | n,
      { destroy: void 0 },
      l,
      r === void 0 ? null : r
    );
  }
  function gs(e, n, l, r) {
    var c = Lt();
    r = r === void 0 ? null : r;
    var d = c.memoizedState.inst;
    ft !== null && r !== null && qc(r, ft.memoizedState.deps) ? c.memoizedState = Hi(n, d, l, r) : (ke.flags |= e, c.memoizedState = Hi(
      1 | n,
      d,
      l,
      r
    ));
  }
  function mg(e, n) {
    ms(8390656, 8, e, n);
  }
  function Wc(e, n) {
    gs(2048, 8, e, n);
  }
  function TS(e) {
    ke.flags |= 4;
    var n = ke.updateQueue;
    if (n === null)
      n = fs(), ke.updateQueue = n, n.events = [e];
    else {
      var l = n.events;
      l === null ? n.events = [e] : l.push(e);
    }
  }
  function gg(e) {
    var n = Lt().memoizedState;
    return TS({ ref: n, nextImpl: e }), function() {
      if ((lt & 2) !== 0) throw Error(o(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function pg(e, n) {
    return gs(4, 2, e, n);
  }
  function yg(e, n) {
    return gs(4, 4, e, n);
  }
  function vg(e, n) {
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
  function bg(e, n, l) {
    l = l != null ? l.concat([e]) : null, gs(4, 4, vg.bind(null, n, e), l);
  }
  function ef() {
  }
  function xg(e, n) {
    var l = Lt();
    n = n === void 0 ? null : n;
    var r = l.memoizedState;
    return n !== null && qc(n, r[1]) ? r[0] : (l.memoizedState = [e, n], e);
  }
  function Sg(e, n) {
    var l = Lt();
    n = n === void 0 ? null : n;
    var r = l.memoizedState;
    if (n !== null && qc(n, r[1]))
      return r[0];
    if (r = e(), Jl) {
      Mt(!0);
      try {
        e();
      } finally {
        Mt(!1);
      }
    }
    return l.memoizedState = [r, n], r;
  }
  function tf(e, n, l) {
    return l === void 0 || (Ua & 1073741824) !== 0 && (Qe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = l, e = wp(), ke.lanes |= e, xl |= e, l);
  }
  function wg(e, n, l, r) {
    return Rn(l, n) ? l : ji.current !== null ? (e = tf(e, l, r), Rn(e, n) || (kt = !0), e) : (Ua & 42) === 0 || (Ua & 1073741824) !== 0 && (Qe & 261930) === 0 ? (kt = !0, e.memoizedState = l) : (e = wp(), ke.lanes |= e, xl |= e, n);
  }
  function Eg(e, n, l, r, c) {
    var d = O.p;
    O.p = d !== 0 && 8 > d ? d : 8;
    var b = C.T, N = {};
    C.T = N, lf(e, !1, n, l);
    try {
      var k = c(), ae = C.S;
      if (ae !== null && ae(N, k), k !== null && typeof k == "object" && typeof k.then == "function") {
        var ue = ES(
          k,
          r
        );
        Lr(
          e,
          n,
          ue,
          Ln(e)
        );
      } else
        Lr(
          e,
          n,
          r,
          Ln(e)
        );
    } catch (fe) {
      Lr(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Ln()
      );
    } finally {
      O.p = d, b !== null && N.types !== null && (b.types = N.types), C.T = b;
    }
  }
  function RS() {
  }
  function nf(e, n, l, r) {
    if (e.tag !== 5) throw Error(o(476));
    var c = _g(e).queue;
    Eg(
      e,
      c,
      n,
      q,
      l === null ? RS : function() {
        return Ng(e), l(r);
      }
    );
  }
  function _g(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ka,
        lastRenderedState: q
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
  function Ng(e) {
    var n = _g(e);
    n.next === null && (n = e.alternate.memoizedState), Lr(
      e,
      n.next.queue,
      {},
      Ln()
    );
  }
  function af() {
    return an(Pr);
  }
  function Cg() {
    return Lt().memoizedState;
  }
  function Mg() {
    return Lt().memoizedState;
  }
  function AS(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var l = Ln();
          e = ml(l);
          var r = gl(n, e, l);
          r !== null && (wn(r, n, l), Ar(r, n, l)), n = { cache: zc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function DS(e, n, l) {
    var r = Ln();
    l = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ps(e) ? Rg(n, l) : (l = Sc(e, n, l, r), l !== null && (wn(l, e, r), Ag(l, n, r)));
  }
  function Tg(e, n, l) {
    var r = Ln();
    Lr(e, n, l, r);
  }
  function Lr(e, n, l, r) {
    var c = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ps(e)) Rg(n, c);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var b = n.lastRenderedState, N = d(b, l);
          if (c.hasEagerState = !0, c.eagerState = N, Rn(N, b))
            return Fo(e, n, c, 0), gt === null && Ko(), !1;
        } catch {
        } finally {
        }
      if (l = Sc(e, n, c, r), l !== null)
        return wn(l, e, r), Ag(l, n, r), !0;
    }
    return !1;
  }
  function lf(e, n, l, r) {
    if (r = {
      lane: 2,
      revertLane: Bf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ps(e)) {
      if (n) throw Error(o(479));
    } else
      n = Sc(
        e,
        l,
        r,
        2
      ), n !== null && wn(n, e, 2);
  }
  function ps(e) {
    var n = e.alternate;
    return e === ke || n !== null && n === ke;
  }
  function Rg(e, n) {
    Oi = us = !0;
    var l = e.pending;
    l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
  }
  function Ag(e, n, l) {
    if ((l & 4194048) !== 0) {
      var r = n.lanes;
      r &= e.pendingLanes, l |= r, n.lanes = l, It(e, l);
    }
  }
  var Hr = {
    readContext: an,
    use: ds,
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
  Hr.useEffectEvent = At;
  var Dg = {
    readContext: an,
    use: ds,
    useCallback: function(e, n) {
      return hn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: an,
    useEffect: mg,
    useImperativeHandle: function(e, n, l) {
      l = l != null ? l.concat([e]) : null, ms(
        4194308,
        4,
        vg.bind(null, n, e),
        l
      );
    },
    useLayoutEffect: function(e, n) {
      return ms(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      ms(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var l = hn();
      n = n === void 0 ? null : n;
      var r = e();
      if (Jl) {
        Mt(!0);
        try {
          e();
        } finally {
          Mt(!1);
        }
      }
      return l.memoizedState = [r, n], r;
    },
    useReducer: function(e, n, l) {
      var r = hn();
      if (l !== void 0) {
        var c = l(n);
        if (Jl) {
          Mt(!0);
          try {
            l(n);
          } finally {
            Mt(!1);
          }
        }
      } else c = n;
      return r.memoizedState = r.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, r.queue = e, e = e.dispatch = DS.bind(
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
      e = Jc(e);
      var n = e.queue, l = Tg.bind(null, ke, n);
      return n.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: ef,
    useDeferredValue: function(e, n) {
      var l = hn();
      return tf(l, e, n);
    },
    useTransition: function() {
      var e = Jc(!1);
      return e = Eg.bind(
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
        (Qe & 127) !== 0 || Pm(r, n, l);
      }
      c.memoizedState = l;
      var d = { value: l, getSnapshot: n };
      return c.queue = d, mg(eg.bind(null, r, d, e), [
        e
      ]), r.flags |= 2048, Hi(
        9,
        { destroy: void 0 },
        Wm.bind(
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
        l = (r & ~(1 << 32 - zt(r) - 1)).toString(32) + l, n = "_" + n + "R_" + l, l = cs++, 0 < l && (n += "H" + l.toString(32)), n += "_";
      } else
        l = _S++, n = "_" + n + "r_" + l.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: af,
    useFormState: ug,
    useActionState: ug,
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
      return n.queue = l, n = lf.bind(
        null,
        ke,
        !0,
        l
      ), l.dispatch = n, [e, n];
    },
    useMemoCache: Ic,
    useCacheRefresh: function() {
      return hn().memoizedState = AS.bind(
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
  }, rf = {
    readContext: an,
    use: ds,
    useCallback: xg,
    useContext: an,
    useEffect: Wc,
    useImperativeHandle: bg,
    useInsertionEffect: pg,
    useLayoutEffect: yg,
    useMemo: Sg,
    useReducer: hs,
    useRef: hg,
    useState: function() {
      return hs(ka);
    },
    useDebugValue: ef,
    useDeferredValue: function(e, n) {
      var l = Lt();
      return wg(
        l,
        ft.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = hs(ka)[0], n = Lt().memoizedState;
      return [
        typeof e == "boolean" ? e : Or(e),
        n
      ];
    },
    useSyncExternalStore: Jm,
    useId: Cg,
    useHostTransitionStatus: af,
    useFormState: cg,
    useActionState: cg,
    useOptimistic: function(e, n) {
      var l = Lt();
      return ag(l, ft, e, n);
    },
    useMemoCache: Ic,
    useCacheRefresh: Mg
  };
  rf.useEffectEvent = gg;
  var zg = {
    readContext: an,
    use: ds,
    useCallback: xg,
    useContext: an,
    useEffect: Wc,
    useImperativeHandle: bg,
    useInsertionEffect: pg,
    useLayoutEffect: yg,
    useMemo: Sg,
    useReducer: Fc,
    useRef: hg,
    useState: function() {
      return Fc(ka);
    },
    useDebugValue: ef,
    useDeferredValue: function(e, n) {
      var l = Lt();
      return ft === null ? tf(l, e, n) : wg(
        l,
        ft.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Fc(ka)[0], n = Lt().memoizedState;
      return [
        typeof e == "boolean" ? e : Or(e),
        n
      ];
    },
    useSyncExternalStore: Jm,
    useId: Cg,
    useHostTransitionStatus: af,
    useFormState: dg,
    useActionState: dg,
    useOptimistic: function(e, n) {
      var l = Lt();
      return ft !== null ? ag(l, ft, e, n) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Ic,
    useCacheRefresh: Mg
  };
  zg.useEffectEvent = gg;
  function of(e, n, l, r) {
    n = e.memoizedState, l = l(r, n), l = l == null ? n : m({}, n, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var sf = {
    enqueueSetState: function(e, n, l) {
      e = e._reactInternals;
      var r = Ln(), c = ml(r);
      c.payload = n, l != null && (c.callback = l), n = gl(e, c, r), n !== null && (wn(n, e, r), Ar(n, e, r));
    },
    enqueueReplaceState: function(e, n, l) {
      e = e._reactInternals;
      var r = Ln(), c = ml(r);
      c.tag = 1, c.payload = n, l != null && (c.callback = l), n = gl(e, c, r), n !== null && (wn(n, e, r), Ar(n, e, r));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var l = Ln(), r = ml(l);
      r.tag = 2, n != null && (r.callback = n), n = gl(e, r, l), n !== null && (wn(n, e, l), Ar(n, e, l));
    }
  };
  function jg(e, n, l, r, c, d, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, d, b) : n.prototype && n.prototype.isPureReactComponent ? !wr(l, r) || !wr(c, d) : !0;
  }
  function Og(e, n, l, r) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, r), n.state !== e && sf.enqueueReplaceState(n, n.state, null);
  }
  function Pl(e, n) {
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
  function Lg(e) {
    Io(e);
  }
  function Hg(e) {
    console.error(e);
  }
  function Bg(e) {
    Io(e);
  }
  function ys(e, n) {
    try {
      var l = e.onUncaughtError;
      l(n.value, { componentStack: n.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Ug(e, n, l) {
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
  function uf(e, n, l) {
    return l = ml(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ys(e, n);
    }, l;
  }
  function kg(e) {
    return e = ml(e), e.tag = 3, e;
  }
  function Vg(e, n, l, r) {
    var c = l.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var d = r.value;
      e.payload = function() {
        return c(d);
      }, e.callback = function() {
        Ug(n, l, r);
      };
    }
    var b = l.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      Ug(n, l, r), typeof c != "function" && (Sl === null ? Sl = /* @__PURE__ */ new Set([this]) : Sl.add(this));
      var N = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: N !== null ? N : ""
      });
    });
  }
  function zS(e, n, l, r, c) {
    if (l.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (n = l.alternate, n !== null && Ti(
        n,
        l,
        c,
        !0
      ), l = Dn.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Qn === null ? Rs() : l.alternate === null && Dt === 0 && (Dt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = c, r === ls ? l.flags |= 16384 : (n = l.updateQueue, n === null ? l.updateQueue = /* @__PURE__ */ new Set([r]) : n.add(r), Of(e, r, c)), !1;
          case 22:
            return l.flags |= 65536, r === ls ? l.flags |= 16384 : (n = l.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, l.updateQueue = n) : (l = n.retryQueue, l === null ? n.retryQueue = /* @__PURE__ */ new Set([r]) : l.add(r)), Of(e, r, c)), !1;
        }
        throw Error(o(435, l.tag));
      }
      return Of(e, r, c), Rs(), !1;
    }
    if (Fe)
      return n = Dn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = c, r !== Mc && (e = Error(o(422), { cause: r }), Nr(qn(e, l)))) : (r !== Mc && (n = Error(o(423), {
        cause: r
      }), Nr(
        qn(n, l)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, r = qn(r, l), c = uf(
        e.stateNode,
        r,
        c
      ), Uc(e, c), Dt !== 4 && (Dt = 2)), !1;
    var d = Error(o(520), { cause: r });
    if (d = qn(d, l), $r === null ? $r = [d] : $r.push(d), Dt !== 4 && (Dt = 2), n === null) return !0;
    r = qn(r, l), l = n;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = c & -c, l.lanes |= e, e = uf(l.stateNode, r, e), Uc(l, e), !1;
        case 1:
          if (n = l.type, d = l.stateNode, (l.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Sl === null || !Sl.has(d))))
            return l.flags |= 65536, c &= -c, l.lanes |= c, c = kg(c), Vg(
              c,
              e,
              l,
              r
            ), Uc(l, c), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var cf = Error(o(461)), kt = !1;
  function ln(e, n, l, r) {
    n.child = e === null ? $m(n, null, l, r) : Fl(
      n,
      e.child,
      l,
      r
    );
  }
  function Yg(e, n, l, r, c) {
    l = l.render;
    var d = n.ref;
    if ("ref" in r) {
      var b = {};
      for (var N in r)
        N !== "ref" && (b[N] = r[N]);
    } else b = r;
    return Zl(n), r = $c(
      e,
      n,
      l,
      b,
      d,
      c
    ), N = Xc(), e !== null && !kt ? (Zc(e, n, c), Va(e, n, c)) : (Fe && N && Nc(n), n.flags |= 1, ln(e, n, r, c), n.child);
  }
  function Gg(e, n, l, r, c) {
    if (e === null) {
      var d = l.type;
      return typeof d == "function" && !wc(d) && d.defaultProps === void 0 && l.compare === null ? (n.tag = 15, n.type = d, qg(
        e,
        n,
        d,
        r,
        c
      )) : (e = Po(
        l.type,
        null,
        r,
        n,
        n.mode,
        c
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, !vf(e, c)) {
      var b = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : wr, l(b, r) && e.ref === n.ref)
        return Va(e, n, c);
    }
    return n.flags |= 1, e = Oa(d, r), e.ref = n.ref, e.return = n, n.child = e;
  }
  function qg(e, n, l, r, c) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (wr(d, r) && e.ref === n.ref)
        if (kt = !1, n.pendingProps = r = d, vf(e, c))
          (e.flags & 131072) !== 0 && (kt = !0);
        else
          return n.lanes = e.lanes, Va(e, n, c);
    }
    return ff(
      e,
      n,
      l,
      r,
      c
    );
  }
  function $g(e, n, l, r) {
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
        return Xg(
          e,
          n,
          d,
          l,
          r
        );
      }
      if ((l & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && ns(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? Qm(n, d) : Vc(), Im(n);
      else
        return r = n.lanes = 536870912, Xg(
          e,
          n,
          d !== null ? d.baseLanes | l : l,
          l,
          r
        );
    } else
      d !== null ? (ns(n, d.cachePool), Qm(n, d), yl(), n.memoizedState = null) : (e !== null && ns(n, null), Vc(), yl());
    return ln(e, n, c, l), n.child;
  }
  function Br(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Xg(e, n, l, r, c) {
    var d = Oc();
    return d = d === null ? null : { parent: Bt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: l,
      cachePool: d
    }, e !== null && ns(n, null), Vc(), Im(n), e !== null && Ti(e, n, r, !0), n.childLanes = c, null;
  }
  function vs(e, n) {
    return n = xs(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Zg(e, n, l) {
    return Fl(n, e.child, null, l), e = vs(n, n.pendingProps), e.flags |= 2, zn(n), n.memoizedState = null, e;
  }
  function jS(e, n, l) {
    var r = n.pendingProps, c = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Fe) {
        if (r.mode === "hidden")
          return e = vs(n, r), n.lanes = 536870912, Br(null, e);
        if (Gc(n), (e = vt) ? (e = l0(
          e,
          Zn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: ul !== null ? { id: va, overflow: ba } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Rm(e), l.return = n, n.child = l, nn = n, vt = null)) : e = null, e === null) throw fl(n);
        return n.lanes = 536870912, null;
      }
      return vs(n, r);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var b = d.dehydrated;
      if (Gc(n), c)
        if (n.flags & 256)
          n.flags &= -257, n = Zg(
            e,
            n,
            l
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(o(558));
      else if (kt || Ti(e, n, l, !1), c = (l & e.childLanes) !== 0, kt || c) {
        if (r = gt, r !== null && (b = H(r, l), b !== 0 && b !== d.retryLane))
          throw d.retryLane = b, Gl(e, b), wn(r, e, b), cf;
        Rs(), n = Zg(
          e,
          n,
          l
        );
      } else
        e = d.treeContext, vt = In(b.nextSibling), nn = n, Fe = !0, cl = null, Zn = !1, e !== null && zm(n, e), n = vs(n, r), n.flags |= 4096;
      return n;
    }
    return e = Oa(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function bs(e, n) {
    var l = n.ref;
    if (l === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(o(284));
      (e === null || e.ref !== l) && (n.flags |= 4194816);
    }
  }
  function ff(e, n, l, r, c) {
    return Zl(n), l = $c(
      e,
      n,
      l,
      r,
      void 0,
      c
    ), r = Xc(), e !== null && !kt ? (Zc(e, n, c), Va(e, n, c)) : (Fe && r && Nc(n), n.flags |= 1, ln(e, n, l, c), n.child);
  }
  function Qg(e, n, l, r, c, d) {
    return Zl(n), n.updateQueue = null, l = Fm(
      n,
      r,
      l,
      c
    ), Km(e), r = Xc(), e !== null && !kt ? (Zc(e, n, d), Va(e, n, d)) : (Fe && r && Nc(n), n.flags |= 1, ln(e, n, l, d), n.child);
  }
  function Ig(e, n, l, r, c) {
    if (Zl(n), n.stateNode === null) {
      var d = _i, b = l.contextType;
      typeof b == "object" && b !== null && (d = an(b)), d = new l(r, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = sf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = r, d.state = n.memoizedState, d.refs = {}, Hc(n), b = l.contextType, d.context = typeof b == "object" && b !== null ? an(b) : _i, d.state = n.memoizedState, b = l.getDerivedStateFromProps, typeof b == "function" && (of(
        n,
        l,
        b,
        r
      ), d.state = n.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (b = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), b !== d.state && sf.enqueueReplaceState(d, d.state, null), zr(n, r, d, c), Dr(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !0;
    } else if (e === null) {
      d = n.stateNode;
      var N = n.memoizedProps, k = Pl(l, N);
      d.props = k;
      var ae = d.context, ue = l.contextType;
      b = _i, typeof ue == "object" && ue !== null && (b = an(ue));
      var fe = l.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", N = n.pendingProps !== N, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (N || ae !== b) && Og(
        n,
        d,
        r,
        b
      ), hl = !1;
      var ie = n.memoizedState;
      d.state = ie, zr(n, r, d, c), Dr(), ae = n.memoizedState, N || ie !== ae || hl ? (typeof fe == "function" && (of(
        n,
        l,
        fe,
        r
      ), ae = n.memoizedState), (k = hl || jg(
        n,
        l,
        k,
        r,
        ie,
        ae,
        b
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = r, n.memoizedState = ae), d.props = r, d.state = ae, d.context = b, r = k) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), r = !1);
    } else {
      d = n.stateNode, Bc(e, n), b = n.memoizedProps, ue = Pl(l, b), d.props = ue, fe = n.pendingProps, ie = d.context, ae = l.contextType, k = _i, typeof ae == "object" && ae !== null && (k = an(ae)), N = l.getDerivedStateFromProps, (ae = typeof N == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (b !== fe || ie !== k) && Og(
        n,
        d,
        r,
        k
      ), hl = !1, ie = n.memoizedState, d.state = ie, zr(n, r, d, c), Dr();
      var oe = n.memoizedState;
      b !== fe || ie !== oe || hl || e !== null && e.dependencies !== null && es(e.dependencies) ? (typeof N == "function" && (of(
        n,
        l,
        N,
        r
      ), oe = n.memoizedState), (ue = hl || jg(
        n,
        l,
        ue,
        r,
        ie,
        oe,
        k
      ) || e !== null && e.dependencies !== null && es(e.dependencies)) ? (ae || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(r, oe, k), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        r,
        oe,
        k
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = r, n.memoizedState = oe), d.props = r, d.state = oe, d.context = k, r = ue) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), r = !1);
    }
    return d = r, bs(e, n), r = (n.flags & 128) !== 0, d || r ? (d = n.stateNode, l = r && typeof l.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && r ? (n.child = Fl(
      n,
      e.child,
      null,
      c
    ), n.child = Fl(
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
  function Kg(e, n, l, r) {
    return $l(), n.flags |= 256, ln(e, n, l, r), n.child;
  }
  var df = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function hf(e) {
    return { baseLanes: e, cachePool: Um() };
  }
  function mf(e, n, l) {
    return e = e !== null ? e.childLanes & ~l : 0, n && (e |= On), e;
  }
  function Fg(e, n, l) {
    var r = n.pendingProps, c = !1, d = (n.flags & 128) !== 0, b;
    if ((b = d) || (b = e !== null && e.memoizedState === null ? !1 : (Ot.current & 2) !== 0), b && (c = !0, n.flags &= -129), b = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Fe) {
        if (c ? pl(n) : yl(), (e = vt) ? (e = l0(
          e,
          Zn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: ul !== null ? { id: va, overflow: ba } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Rm(e), l.return = n, n.child = l, nn = n, vt = null)) : e = null, e === null) throw fl(n);
        return Ff(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var N = r.children;
      return r = r.fallback, c ? (yl(), c = n.mode, N = xs(
        { mode: "hidden", children: N },
        c
      ), r = ql(
        r,
        c,
        l,
        null
      ), N.return = n, r.return = n, N.sibling = r, n.child = N, r = n.child, r.memoizedState = hf(l), r.childLanes = mf(
        e,
        b,
        l
      ), n.memoizedState = df, Br(null, r)) : (pl(n), gf(n, N));
    }
    var k = e.memoizedState;
    if (k !== null && (N = k.dehydrated, N !== null)) {
      if (d)
        n.flags & 256 ? (pl(n), n.flags &= -257, n = pf(
          e,
          n,
          l
        )) : n.memoizedState !== null ? (yl(), n.child = e.child, n.flags |= 128, n = null) : (yl(), N = r.fallback, c = n.mode, r = xs(
          { mode: "visible", children: r.children },
          c
        ), N = ql(
          N,
          c,
          l,
          null
        ), N.flags |= 2, r.return = n, N.return = n, r.sibling = N, n.child = r, Fl(
          n,
          e.child,
          null,
          l
        ), r = n.child, r.memoizedState = hf(l), r.childLanes = mf(
          e,
          b,
          l
        ), n.memoizedState = df, n = Br(null, r));
      else if (pl(n), Ff(N)) {
        if (b = N.nextSibling && N.nextSibling.dataset, b) var ae = b.dgst;
        b = ae, r = Error(o(419)), r.stack = "", r.digest = b, Nr({ value: r, source: null, stack: null }), n = pf(
          e,
          n,
          l
        );
      } else if (kt || Ti(e, n, l, !1), b = (l & e.childLanes) !== 0, kt || b) {
        if (b = gt, b !== null && (r = H(b, l), r !== 0 && r !== k.retryLane))
          throw k.retryLane = r, Gl(e, r), wn(b, e, r), cf;
        Kf(N) || Rs(), n = pf(
          e,
          n,
          l
        );
      } else
        Kf(N) ? (n.flags |= 192, n.child = e.child, n = null) : (e = k.treeContext, vt = In(
          N.nextSibling
        ), nn = n, Fe = !0, cl = null, Zn = !1, e !== null && zm(n, e), n = gf(
          n,
          r.children
        ), n.flags |= 4096);
      return n;
    }
    return c ? (yl(), N = r.fallback, c = n.mode, k = e.child, ae = k.sibling, r = Oa(k, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = k.subtreeFlags & 65011712, ae !== null ? N = Oa(
      ae,
      N
    ) : (N = ql(
      N,
      c,
      l,
      null
    ), N.flags |= 2), N.return = n, r.return = n, r.sibling = N, n.child = r, Br(null, r), r = n.child, N = e.child.memoizedState, N === null ? N = hf(l) : (c = N.cachePool, c !== null ? (k = Bt._currentValue, c = c.parent !== k ? { parent: k, pool: k } : c) : c = Um(), N = {
      baseLanes: N.baseLanes | l,
      cachePool: c
    }), r.memoizedState = N, r.childLanes = mf(
      e,
      b,
      l
    ), n.memoizedState = df, Br(e.child, r)) : (pl(n), l = e.child, e = l.sibling, l = Oa(l, {
      mode: "visible",
      children: r.children
    }), l.return = n, l.sibling = null, e !== null && (b = n.deletions, b === null ? (n.deletions = [e], n.flags |= 16) : b.push(e)), n.child = l, n.memoizedState = null, l);
  }
  function gf(e, n) {
    return n = xs(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function xs(e, n) {
    return e = An(22, e, null, n), e.lanes = 0, e;
  }
  function pf(e, n, l) {
    return Fl(n, e.child, null, l), e = gf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Jg(e, n, l) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n), Ac(e.return, n, l);
  }
  function yf(e, n, l, r, c, d) {
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
  function Pg(e, n, l) {
    var r = n.pendingProps, c = r.revealOrder, d = r.tail;
    r = r.children;
    var b = Ot.current, N = (b & 2) !== 0;
    if (N ? (b = b & 1 | 2, n.flags |= 128) : b &= 1, F(Ot, b), ln(e, n, r, l), r = Fe ? _r : 0, !N && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Jg(e, l, n);
        else if (e.tag === 19)
          Jg(e, l, n);
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
          e = l.alternate, e !== null && ss(e) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = n.child, n.child = null) : (c = l.sibling, l.sibling = null), yf(
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
          if (e = c.alternate, e !== null && ss(e) === null) {
            n.child = c;
            break;
          }
          e = c.sibling, c.sibling = l, l = c, c = e;
        }
        yf(
          n,
          !0,
          l,
          null,
          d,
          r
        );
        break;
      case "together":
        yf(
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
    if (e !== null && (n.dependencies = e.dependencies), xl |= n.lanes, (l & n.childLanes) === 0)
      if (e !== null) {
        if (Ti(
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
      for (e = n.child, l = Oa(e, e.pendingProps), n.child = l, l.return = n; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Oa(e, e.pendingProps), l.return = n;
      l.sibling = null;
    }
    return n.child;
  }
  function vf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && es(e)));
  }
  function OS(e, n, l) {
    switch (n.tag) {
      case 3:
        ee(n, n.stateNode.containerInfo), dl(n, Bt, e.memoizedState.cache), $l();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        ee(n, n.stateNode.containerInfo);
        break;
      case 10:
        dl(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Gc(n), null;
        break;
      case 13:
        var r = n.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (pl(n), n.flags |= 128, null) : (l & n.child.childLanes) !== 0 ? Fg(e, n, l) : (pl(n), e = Va(
            e,
            n,
            l
          ), e !== null ? e.sibling : null);
        pl(n);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (r = (l & n.childLanes) !== 0, r || (Ti(
          e,
          n,
          l,
          !1
        ), r = (l & n.childLanes) !== 0), c) {
          if (r)
            return Pg(
              e,
              n,
              l
            );
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), F(Ot, Ot.current), r) break;
        return null;
      case 22:
        return n.lanes = 0, $g(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        dl(n, Bt, e.memoizedState.cache);
    }
    return Va(e, n, l);
  }
  function Wg(e, n, l) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        kt = !0;
      else {
        if (!vf(e, l) && (n.flags & 128) === 0)
          return kt = !1, OS(
            e,
            n,
            l
          );
        kt = (e.flags & 131072) !== 0;
      }
    else
      kt = !1, Fe && (n.flags & 1048576) !== 0 && Dm(n, _r, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var r = n.pendingProps;
          if (e = Il(n.elementType), n.type = e, typeof e == "function")
            wc(e) ? (r = Pl(e, r), n.tag = 1, n = Ig(
              null,
              n,
              e,
              r,
              l
            )) : (n.tag = 0, n = ff(
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
                n.tag = 11, n = Yg(
                  null,
                  n,
                  e,
                  r,
                  l
                );
                break e;
              } else if (c === U) {
                n.tag = 14, n = Gg(
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
        return ff(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 1:
        return r = n.type, c = Pl(
          r,
          n.pendingProps
        ), Ig(
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
          c = d.element, Bc(e, n), zr(n, r, null, l);
          var b = n.memoizedState;
          if (r = b.cache, dl(n, Bt, r), r !== d.cache && Dc(
            n,
            [Bt],
            l,
            !0
          ), Dr(), r = b.element, d.isDehydrated)
            if (d = {
              element: r,
              isDehydrated: !1,
              cache: b.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = Kg(
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
              ), Nr(c), n = Kg(
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
              for (vt = In(e.firstChild), nn = n, Fe = !0, cl = null, Zn = !0, l = $m(
                n,
                null,
                r,
                l
              ), n.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if ($l(), r === c) {
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
        return bs(e, n), e === null ? (l = c0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = l : Fe || (l = n.type, e = n.pendingProps, r = Hs(
          me.current
        ).createElement(l), r[ve] = n, r[xe] = e, rn(r, l, e), Ke(r), n.stateNode = r) : n.memoizedState = c0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && Fe && (r = n.stateNode = o0(
          n.type,
          n.pendingProps,
          me.current
        ), nn = n, Zn = !0, c = vt, Nl(n.type) ? (Jf = c, vt = In(r.firstChild)) : vt = c), ln(
          e,
          n,
          n.pendingProps.children,
          l
        ), bs(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Fe && ((c = r = vt) && (r = cw(
          r,
          n.type,
          n.pendingProps,
          Zn
        ), r !== null ? (n.stateNode = r, nn = n, vt = In(r.firstChild), Zn = !1, c = !0) : c = !1), c || fl(n)), ze(n), c = n.type, d = n.pendingProps, b = e !== null ? e.memoizedProps : null, r = d.children, Zf(c, d) ? r = null : b !== null && Zf(c, b) && (n.flags |= 32), n.memoizedState !== null && (c = $c(
          e,
          n,
          NS,
          null,
          null,
          l
        ), Pr._currentValue = c), bs(e, n), ln(e, n, r, l), n.child;
      case 6:
        return e === null && Fe && ((e = l = vt) && (l = fw(
          l,
          n.pendingProps,
          Zn
        ), l !== null ? (n.stateNode = l, nn = n, vt = null, e = !0) : e = !1), e || fl(n)), null;
      case 13:
        return Fg(e, n, l);
      case 4:
        return ee(
          n,
          n.stateNode.containerInfo
        ), r = n.pendingProps, e === null ? n.child = Fl(
          n,
          null,
          r,
          l
        ) : ln(e, n, r, l), n.child;
      case 11:
        return Yg(
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
        return r = n.pendingProps, dl(n, n.type, r.value), ln(e, n, r.children, l), n.child;
      case 9:
        return c = n.type._context, r = n.pendingProps.children, Zl(n), c = an(c), r = r(c), n.flags |= 1, ln(e, n, r, l), n.child;
      case 14:
        return Gg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 15:
        return qg(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 19:
        return Pg(e, n, l);
      case 31:
        return jS(e, n, l);
      case 22:
        return $g(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        return Zl(n), r = an(Bt), e === null ? (c = Oc(), c === null && (c = gt, d = zc(), c.pooledCache = d, d.refCount++, d !== null && (c.pooledCacheLanes |= l), c = d), n.memoizedState = { parent: r, cache: c }, Hc(n), dl(n, Bt, c)) : ((e.lanes & l) !== 0 && (Bc(e, n), zr(n, null, null, l), Dr()), c = e.memoizedState, d = n.memoizedState, c.parent !== r ? (c = { parent: r, cache: r }, n.memoizedState = c, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c), dl(n, Bt, r)) : (r = d.cache, dl(n, Bt, r), r !== c.cache && Dc(
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
  function bf(e, n, l, r, c) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Cp()) e.flags |= 8192;
        else
          throw Kl = ls, Lc;
    } else e.flags &= -16777217;
  }
  function ep(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !g0(n))
      if (Cp()) e.flags |= 8192;
      else
        throw Kl = ls, Lc;
  }
  function Ss(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? jt() : 536870912, e.lanes |= n, Vi |= n);
  }
  function Ur(e, n) {
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
  function LS(e, n, l) {
    var r = n.pendingProps;
    switch (Cc(n), n.tag) {
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
        return l = n.stateNode, r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ba(Bt), pe(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Mi(n) ? Ya(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Tc())), bt(n), null;
      case 26:
        var c = n.type, d = n.memoizedState;
        return e === null ? (Ya(n), d !== null ? (bt(n), ep(n, d)) : (bt(n), bf(
          n,
          c,
          null,
          r,
          l
        ))) : d ? d !== e.memoizedState ? (Ya(n), bt(n), ep(n, d)) : (bt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== r && Ya(n), bt(n), bf(
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
          e = le.current, Mi(n) ? jm(n) : (e = o0(c, r, l), n.stateNode = e, Ya(n));
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
          if (d = le.current, Mi(n))
            jm(n);
          else {
            var b = Hs(
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
        return bt(n), bf(
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
          if (e = me.current, Mi(n)) {
            if (e = n.stateNode, l = n.memoizedProps, r = null, c = nn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  r = c.memoizedProps;
              }
            e[ve] = n, e = !!(e.nodeValue === l || r !== null && r.suppressHydrationWarning === !0 || Fp(e.nodeValue, l)), e || fl(n, !0);
          } else
            e = Hs(e).createTextNode(
              r
            ), e[ve] = n, n.stateNode = e;
        }
        return bt(n), null;
      case 31:
        if (l = n.memoizedState, e === null || e.memoizedState !== null) {
          if (r = Mi(n), l !== null) {
            if (e === null) {
              if (!r) throw Error(o(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ve] = n;
            } else
              $l(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), e = !1;
          } else
            l = Tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return n.flags & 256 ? (zn(n), n) : (zn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(o(558));
        }
        return bt(n), null;
      case 13:
        if (r = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = Mi(n), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(o(318));
              if (c = n.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(o(317));
              c[ve] = n;
            } else
              $l(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), c = !1;
          } else
            c = Tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return n.flags & 256 ? (zn(n), n) : (zn(n), null);
        }
        return zn(n), (n.flags & 128) !== 0 ? (n.lanes = l, n) : (l = r !== null, e = e !== null && e.memoizedState !== null, l && (r = n.child, c = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (c = r.alternate.memoizedState.cachePool.pool), d = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (d = r.memoizedState.cachePool.pool), d !== c && (r.flags |= 2048)), l !== e && l && (n.child.flags |= 8192), Ss(n, n.updateQueue), bt(n), null);
      case 4:
        return pe(), e === null && Yf(n.stateNode.containerInfo), bt(n), null;
      case 10:
        return Ba(n.type), bt(n), null;
      case 19:
        if (V(Ot), r = n.memoizedState, r === null) return bt(n), null;
        if (c = (n.flags & 128) !== 0, d = r.rendering, d === null)
          if (c) Ur(r, !1);
          else {
            if (Dt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = ss(e), d !== null) {
                  for (n.flags |= 128, Ur(r, !1), e = d.updateQueue, n.updateQueue = e, Ss(n, e), n.subtreeFlags = 0, e = l, l = n.child; l !== null; )
                    Tm(l, e), l = l.sibling;
                  return F(
                    Ot,
                    Ot.current & 1 | 2
                  ), Fe && La(n, r.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            r.tail !== null && yt() > Cs && (n.flags |= 128, c = !0, Ur(r, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = ss(d), e !== null) {
              if (n.flags |= 128, c = !0, e = e.updateQueue, n.updateQueue = e, Ss(n, e), Ur(r, !0), r.tail === null && r.tailMode === "hidden" && !d.alternate && !Fe)
                return bt(n), null;
            } else
              2 * yt() - r.renderingStartTime > Cs && l !== 536870912 && (n.flags |= 128, c = !0, Ur(r, !1), n.lanes = 4194304);
          r.isBackwards ? (d.sibling = n.child, n.child = d) : (e = r.last, e !== null ? e.sibling = d : n.child = d, r.last = d);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = yt(), e.sibling = null, l = Ot.current, F(
          Ot,
          c ? l & 1 | 2 : l & 1
        ), Fe && La(n, r.treeForkCount), e) : (bt(n), null);
      case 22:
      case 23:
        return zn(n), Yc(), r = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (n.flags |= 8192) : r && (n.flags |= 8192), r ? (l & 536870912) !== 0 && (n.flags & 128) === 0 && (bt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : bt(n), l = n.updateQueue, l !== null && Ss(n, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), r = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (r = n.memoizedState.cachePool.pool), r !== l && (n.flags |= 2048), e !== null && V(Ql), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ba(Bt), bt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function HS(e, n) {
    switch (Cc(n), n.tag) {
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
          $l();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (zn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(o(340));
          $l();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return V(Ot), null;
      case 4:
        return pe(), null;
      case 10:
        return Ba(n.type), null;
      case 22:
      case 23:
        return zn(n), Yc(), e !== null && V(Ql), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ba(Bt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function tp(e, n) {
    switch (Cc(n), n.tag) {
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
        V(Ot);
        break;
      case 10:
        Ba(n.type);
        break;
      case 22:
      case 23:
        zn(n), Yc(), e !== null && V(Ql);
        break;
      case 24:
        Ba(Bt);
    }
  }
  function kr(e, n) {
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
    } catch (N) {
      ct(n, n.return, N);
    }
  }
  function vl(e, n, l) {
    try {
      var r = n.updateQueue, c = r !== null ? r.lastEffect : null;
      if (c !== null) {
        var d = c.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            var b = r.inst, N = b.destroy;
            if (N !== void 0) {
              b.destroy = void 0, c = n;
              var k = l, ae = N;
              try {
                ae();
              } catch (ue) {
                ct(
                  c,
                  k,
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
  function np(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var l = e.stateNode;
      try {
        Zm(n, l);
      } catch (r) {
        ct(e, e.return, r);
      }
    }
  }
  function ap(e, n, l) {
    l.props = Pl(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (r) {
      ct(e, n, r);
    }
  }
  function Vr(e, n) {
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
  function lp(e) {
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
  function xf(e, n, l) {
    try {
      var r = e.stateNode;
      lw(r, e.type, l, n), r[xe] = n;
    } catch (c) {
      ct(e, e.return, c);
    }
  }
  function ip(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Nl(e.type) || e.tag === 4;
  }
  function Sf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ip(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Nl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function wf(e, n, l) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, n) : (n = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, n.appendChild(e), l = l._reactRootContainer, l != null || n.onclick !== null || (n.onclick = za));
    else if (r !== 4 && (r === 27 && Nl(e.type) && (l = e.stateNode, n = null), e = e.child, e !== null))
      for (wf(e, n, l), e = e.sibling; e !== null; )
        wf(e, n, l), e = e.sibling;
  }
  function ws(e, n, l) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, n ? l.insertBefore(e, n) : l.appendChild(e);
    else if (r !== 4 && (r === 27 && Nl(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (ws(e, n, l), e = e.sibling; e !== null; )
        ws(e, n, l), e = e.sibling;
  }
  function rp(e) {
    var n = e.stateNode, l = e.memoizedProps;
    try {
      for (var r = e.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      rn(n, r, l), n[ve] = e, n[xe] = l;
    } catch (d) {
      ct(e, e.return, d);
    }
  }
  var Ga = !1, Vt = !1, Ef = !1, op = typeof WeakSet == "function" ? WeakSet : Set, Kt = null;
  function BS(e, n) {
    if (e = e.containerInfo, $f = qs, e = bm(e), gc(e)) {
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
            var b = 0, N = -1, k = -1, ae = 0, ue = 0, fe = e, ie = null;
            t: for (; ; ) {
              for (var oe; fe !== l || c !== 0 && fe.nodeType !== 3 || (N = b + c), fe !== d || r !== 0 && fe.nodeType !== 3 || (k = b + r), fe.nodeType === 3 && (b += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                ie = fe, fe = oe;
              for (; ; ) {
                if (fe === e) break t;
                if (ie === l && ++ae === c && (N = b), ie === d && ++ue === r && (k = b), (oe = fe.nextSibling) !== null) break;
                fe = ie, ie = fe.parentNode;
              }
              fe = oe;
            }
            l = N === -1 || k === -1 ? null : { start: N, end: k };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Xf = { focusedElem: e, selectionRange: l }, qs = !1, Kt = n; Kt !== null; )
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
                  var _e = Pl(
                    l.type,
                    c
                  );
                  e = r.getSnapshotBeforeUpdate(
                    _e,
                    d
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Oe) {
                  ct(
                    l,
                    l.return,
                    Oe
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, l = e.nodeType, l === 9)
                  If(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      If(e);
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
  function sp(e, n, l) {
    var r = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        $a(e, l), r & 4 && kr(5, l);
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
            var c = Pl(
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
        r & 64 && np(l), r & 512 && Vr(l, l.return);
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
            Zm(e, n);
          } catch (b) {
            ct(l, l.return, b);
          }
        }
        break;
      case 27:
        n === null && r & 4 && rp(l);
      case 26:
      case 5:
        $a(e, l), n === null && r & 4 && lp(l), r & 512 && Vr(l, l.return);
        break;
      case 12:
        $a(e, l);
        break;
      case 31:
        $a(e, l), r & 4 && fp(e, l);
        break;
      case 13:
        $a(e, l), r & 4 && dp(e, l), r & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = ZS.bind(
          null,
          l
        ), dw(e, l))));
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
  function up(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, up(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Je(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var xt = null, vn = !1;
  function qa(e, n, l) {
    for (l = l.child; l !== null; )
      cp(e, n, l), l = l.sibling;
  }
  function cp(e, n, l) {
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
        Nl(l.type) && (xt = l.stateNode, vn = !1), qa(
          e,
          n,
          l
        ), Kr(l.stateNode), xt = r, vn = c;
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
        xt !== null && (vn ? (e = xt, n0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Ii(e)) : n0(xt, l.stateNode));
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
        vl(2, l, n), Vt || vl(4, l, n), qa(
          e,
          n,
          l
        );
        break;
      case 1:
        Vt || (xa(l, n), r = l.stateNode, typeof r.componentWillUnmount == "function" && ap(
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
  function fp(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ii(e);
      } catch (l) {
        ct(n, n.return, l);
      }
    }
  }
  function dp(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ii(e);
      } catch (l) {
        ct(n, n.return, l);
      }
  }
  function US(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new op()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new op()), n;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Es(e, n) {
    var l = US(e);
    n.forEach(function(r) {
      if (!l.has(r)) {
        l.add(r);
        var c = QS.bind(null, e, r);
        r.then(c, c);
      }
    });
  }
  function bn(e, n) {
    var l = n.deletions;
    if (l !== null)
      for (var r = 0; r < l.length; r++) {
        var c = l[r], d = e, b = n, N = b;
        e: for (; N !== null; ) {
          switch (N.tag) {
            case 27:
              if (Nl(N.type)) {
                xt = N.stateNode, vn = !1;
                break e;
              }
              break;
            case 5:
              xt = N.stateNode, vn = !1;
              break e;
            case 3:
            case 4:
              xt = N.stateNode.containerInfo, vn = !0;
              break e;
          }
          N = N.return;
        }
        if (xt === null) throw Error(o(160));
        cp(d, b, c), xt = null, vn = !1, d = c.alternate, d !== null && (d.return = null), c.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        hp(n, e), n = n.sibling;
  }
  var ra = null;
  function hp(e, n) {
    var l = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        bn(n, e), xn(e), r & 4 && (vl(3, e, e.return), kr(3, e), vl(5, e, e.return));
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
                      var b = h0(
                        "link",
                        "href",
                        c
                      ).get(r + (l.href || ""));
                      if (b) {
                        for (var N = 0; N < b.length; N++)
                          if (d = b[N], d.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && d.getAttribute("rel") === (l.rel == null ? null : l.rel) && d.getAttribute("title") === (l.title == null ? null : l.title) && d.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            b.splice(N, 1);
                            break t;
                          }
                      }
                      d = c.createElement(r), rn(d, r, l), c.head.appendChild(d);
                      break;
                    case "meta":
                      if (b = h0(
                        "meta",
                        "content",
                        c
                      ).get(r + (l.content || ""))) {
                        for (N = 0; N < b.length; N++)
                          if (d = b[N], d.getAttribute("content") === (l.content == null ? null : "" + l.content) && d.getAttribute("name") === (l.name == null ? null : l.name) && d.getAttribute("property") === (l.property == null ? null : l.property) && d.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && d.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            b.splice(N, 1);
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
                m0(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = d0(
                c,
                r,
                e.memoizedProps
              );
          else
            d !== r ? (d === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : d.count--, r === null ? m0(
              c,
              e.type,
              e.stateNode
            ) : d0(
              c,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && xf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        bn(n, e), xn(e), r & 512 && (Vt || l === null || xa(l, l.return)), l !== null && r & 4 && xf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (bn(n, e), xn(e), r & 512 && (Vt || l === null || xa(l, l.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            yi(c, "");
          } catch (_e) {
            ct(e, e.return, _e);
          }
        }
        r & 4 && e.stateNode != null && (c = e.memoizedProps, xf(
          e,
          c,
          l !== null ? l.memoizedProps : c
        )), r & 1024 && (Ef = !0);
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
        if (ks = null, c = ra, ra = Bs(n.containerInfo), bn(n, e), ra = c, xn(e), r & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ii(n.containerInfo);
          } catch (_e) {
            ct(e, e.return, _e);
          }
        Ef && (Ef = !1, mp(e));
        break;
      case 4:
        r = ra, ra = Bs(
          e.stateNode.containerInfo
        ), bn(n, e), xn(e), ra = r;
        break;
      case 12:
        bn(n, e), xn(e);
        break;
      case 31:
        bn(n, e), xn(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Es(e, r)));
        break;
      case 13:
        bn(n, e), xn(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Ns = yt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Es(e, r)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var k = l !== null && l.memoizedState !== null, ae = Ga, ue = Vt;
        if (Ga = ae || c, Vt = ue || k, bn(n, e), Vt = ue, Ga = ae, xn(e), r & 8192)
          e: for (n = e.stateNode, n._visibility = c ? n._visibility & -2 : n._visibility | 1, c && (l === null || k || Ga || Vt || Wl(e)), l = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (l === null) {
                k = l = n;
                try {
                  if (d = k.stateNode, c)
                    b = d.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    N = k.stateNode;
                    var fe = k.memoizedProps.style, ie = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    N.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (_e) {
                  ct(k, k.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (l === null) {
                k = n;
                try {
                  k.stateNode.nodeValue = c ? "" : k.memoizedProps;
                } catch (_e) {
                  ct(k, k.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (l === null) {
                k = n;
                try {
                  var oe = k.stateNode;
                  c ? a0(oe, !0) : a0(k.stateNode, !1);
                } catch (_e) {
                  ct(k, k.return, _e);
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
        r & 4 && (r = e.updateQueue, r !== null && (l = r.retryQueue, l !== null && (r.retryQueue = null, Es(e, l))));
        break;
      case 19:
        bn(n, e), xn(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Es(e, r)));
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
          if (ip(r)) {
            l = r;
            break;
          }
          r = r.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var c = l.stateNode, d = Sf(e);
            ws(e, d, c);
            break;
          case 5:
            var b = l.stateNode;
            l.flags & 32 && (yi(b, ""), l.flags &= -33);
            var N = Sf(e);
            ws(e, N, b);
            break;
          case 3:
          case 4:
            var k = l.stateNode.containerInfo, ae = Sf(e);
            wf(
              e,
              ae,
              k
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
  function mp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        mp(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function $a(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        sp(e, n.alternate, n), n = n.sibling;
  }
  function Wl(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          vl(4, n, n.return), Wl(n);
          break;
        case 1:
          xa(n, n.return);
          var l = n.stateNode;
          typeof l.componentWillUnmount == "function" && ap(
            n,
            n.return,
            l
          ), Wl(n);
          break;
        case 27:
          Kr(n.stateNode);
        case 26:
        case 5:
          xa(n, n.return), Wl(n);
          break;
        case 22:
          n.memoizedState === null && Wl(n);
          break;
        case 30:
          Wl(n);
          break;
        default:
          Wl(n);
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
          ), kr(4, d);
          break;
        case 1:
          if (Xa(
            c,
            d,
            l
          ), r = d, c = r.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (ae) {
              ct(r, r.return, ae);
            }
          if (r = d, c = r.updateQueue, c !== null) {
            var N = r.stateNode;
            try {
              var k = c.shared.hiddenCallbacks;
              if (k !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < k.length; c++)
                  Xm(k[c], N);
            } catch (ae) {
              ct(r, r.return, ae);
            }
          }
          l && b & 64 && np(d), Vr(d, d.return);
          break;
        case 27:
          rp(d);
        case 26:
        case 5:
          Xa(
            c,
            d,
            l
          ), l && r === null && b & 4 && lp(d), Vr(d, d.return);
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
          ), l && b & 4 && fp(c, d);
          break;
        case 13:
          Xa(
            c,
            d,
            l
          ), l && b & 4 && dp(c, d);
          break;
        case 22:
          d.memoizedState === null && Xa(
            c,
            d,
            l
          ), Vr(d, d.return);
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
  function _f(e, n) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Cr(l));
  }
  function Nf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Cr(e));
  }
  function oa(e, n, l, r) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        gp(
          e,
          n,
          l,
          r
        ), n = n.sibling;
  }
  function gp(e, n, l, r) {
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
        ), c & 2048 && kr(9, n);
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
        ), c & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Cr(e)));
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
            var d = n.memoizedProps, b = d.id, N = d.onPostCommit;
            typeof N == "function" && N(
              b,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (k) {
            ct(n, n.return, k);
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
        ) : Yr(e, n) : d._visibility & 2 ? oa(
          e,
          n,
          l,
          r
        ) : (d._visibility |= 2, Bi(
          e,
          n,
          l,
          r,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && _f(b, n);
        break;
      case 24:
        oa(
          e,
          n,
          l,
          r
        ), c & 2048 && Nf(n.alternate, n);
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
  function Bi(e, n, l, r, c) {
    for (c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, b = n, N = l, k = r, ae = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Bi(
            d,
            b,
            N,
            k,
            c
          ), kr(8, b);
          break;
        case 23:
          break;
        case 22:
          var ue = b.stateNode;
          b.memoizedState !== null ? ue._visibility & 2 ? Bi(
            d,
            b,
            N,
            k,
            c
          ) : Yr(
            d,
            b
          ) : (ue._visibility |= 2, Bi(
            d,
            b,
            N,
            k,
            c
          )), c && ae & 2048 && _f(
            b.alternate,
            b
          );
          break;
        case 24:
          Bi(
            d,
            b,
            N,
            k,
            c
          ), c && ae & 2048 && Nf(b.alternate, b);
          break;
        default:
          Bi(
            d,
            b,
            N,
            k,
            c
          );
      }
      n = n.sibling;
    }
  }
  function Yr(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var l = e, r = n, c = r.flags;
        switch (r.tag) {
          case 22:
            Yr(l, r), c & 2048 && _f(
              r.alternate,
              r
            );
            break;
          case 24:
            Yr(l, r), c & 2048 && Nf(r.alternate, r);
            break;
          default:
            Yr(l, r);
        }
        n = n.sibling;
      }
  }
  var Gr = 8192;
  function Ui(e, n, l) {
    if (e.subtreeFlags & Gr)
      for (e = e.child; e !== null; )
        pp(
          e,
          n,
          l
        ), e = e.sibling;
  }
  function pp(e, n, l) {
    switch (e.tag) {
      case 26:
        Ui(
          e,
          n,
          l
        ), e.flags & Gr && e.memoizedState !== null && _w(
          l,
          ra,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ui(
          e,
          n,
          l
        );
        break;
      case 3:
      case 4:
        var r = ra;
        ra = Bs(e.stateNode.containerInfo), Ui(
          e,
          n,
          l
        ), ra = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Gr, Gr = 16777216, Ui(
          e,
          n,
          l
        ), Gr = r) : Ui(
          e,
          n,
          l
        ));
        break;
      default:
        Ui(
          e,
          n,
          l
        );
    }
  }
  function yp(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function qr(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var r = n[l];
          Kt = r, bp(
            r,
            e
          );
        }
      yp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        vp(e), e = e.sibling;
  }
  function vp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        qr(e), e.flags & 2048 && vl(9, e, e.return);
        break;
      case 3:
        qr(e);
        break;
      case 12:
        qr(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, _s(e)) : qr(e);
        break;
      default:
        qr(e);
    }
  }
  function _s(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var r = n[l];
          Kt = r, bp(
            r,
            e
          );
        }
      yp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          vl(8, n, n.return), _s(n);
          break;
        case 22:
          l = n.stateNode, l._visibility & 2 && (l._visibility &= -3, _s(n));
          break;
        default:
          _s(n);
      }
      e = e.sibling;
    }
  }
  function bp(e, n) {
    for (; Kt !== null; ) {
      var l = Kt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          vl(8, l, n);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var r = l.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          Cr(l.memoizedState.cache);
      }
      if (r = l.child, r !== null) r.return = l, Kt = r;
      else
        e: for (l = e; Kt !== null; ) {
          r = Kt;
          var c = r.sibling, d = r.return;
          if (up(r), r === l) {
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
  var kS = {
    getCacheForType: function(e) {
      var n = an(Bt), l = n.data.get(e);
      return l === void 0 && (l = e(), n.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return an(Bt).controller.signal;
    }
  }, VS = typeof WeakMap == "function" ? WeakMap : Map, lt = 0, gt = null, $e = null, Qe = 0, ut = 0, jn = null, bl = !1, ki = !1, Cf = !1, Za = 0, Dt = 0, xl = 0, ei = 0, Mf = 0, On = 0, Vi = 0, $r = null, Sn = null, Tf = !1, Ns = 0, xp = 0, Cs = 1 / 0, Ms = null, Sl = null, Zt = 0, wl = null, Yi = null, Qa = 0, Rf = 0, Af = null, Sp = null, Xr = 0, Df = null;
  function Ln() {
    return (lt & 2) !== 0 && Qe !== 0 ? Qe & -Qe : C.T !== null ? Bf() : de();
  }
  function wp() {
    if (On === 0)
      if ((Qe & 536870912) === 0 || Fe) {
        var e = Cn;
        Cn <<= 1, (Cn & 3932160) === 0 && (Cn = 262144), On = e;
      } else On = 536870912;
    return e = Dn.current, e !== null && (e.flags |= 32), On;
  }
  function wn(e, n, l) {
    (e === gt && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null) && (Gi(e, 0), El(
      e,
      Qe,
      On,
      !1
    )), rt(e, l), ((lt & 2) === 0 || e !== gt) && (e === gt && ((lt & 2) === 0 && (ei |= l), Dt === 4 && El(
      e,
      Qe,
      On,
      !1
    )), Sa(e));
  }
  function Ep(e, n, l) {
    if ((lt & 6) !== 0) throw Error(o(327));
    var r = !l && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ot(e, n), c = r ? qS(e, n) : jf(e, n, !0), d = r;
    do {
      if (c === 0) {
        ki && !r && El(e, n, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, d && !YS(l)) {
          c = jf(e, n, !1), d = !1;
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
              var N = e;
              c = $r;
              var k = N.current.memoizedState.isDehydrated;
              if (k && (Gi(N, b).flags |= 256), b = jf(
                N,
                b,
                !1
              ), b !== 2) {
                if (Cf && !k) {
                  N.errorRecoveryDisabledLanes |= d, ei |= d, c = 4;
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
          Gi(e, 0), El(e, n, 0, !0);
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
              El(
                r,
                n,
                On,
                !bl
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
          if ((n & 62914560) === n && (c = Ns + 300 - yt(), 10 < c)) {
            if (El(
              r,
              n,
              On,
              !bl
            ), Le(r, 0, !0) !== 0) break e;
            Qa = n, r.timeoutHandle = e0(
              _p.bind(
                null,
                r,
                l,
                Sn,
                Ms,
                Tf,
                n,
                On,
                ei,
                Vi,
                bl,
                d,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          _p(
            r,
            l,
            Sn,
            Ms,
            Tf,
            n,
            On,
            ei,
            Vi,
            bl,
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
  function _p(e, n, l, r, c, d, b, N, k, ae, ue, fe, ie, oe) {
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
      }, pp(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? Ns - yt() : (d & 4194048) === d ? xp - yt() : 0;
      if (_e = Nw(
        fe,
        _e
      ), _e !== null) {
        Qa = d, e.cancelPendingCommit = _e(
          zp.bind(
            null,
            e,
            n,
            d,
            l,
            r,
            c,
            b,
            N,
            k,
            ue,
            fe,
            null,
            ie,
            oe
          )
        ), El(e, d, b, !ae);
        return;
      }
    }
    zp(
      e,
      n,
      d,
      l,
      r,
      c,
      b,
      N,
      k
    );
  }
  function YS(e) {
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
  function El(e, n, l, r) {
    n &= ~Mf, n &= ~ei, e.suspendedLanes |= n, e.pingedLanes &= ~n, r && (e.warmLanes |= n), r = e.expirationTimes;
    for (var c = n; 0 < c; ) {
      var d = 31 - zt(c), b = 1 << d;
      r[d] = -1, c &= ~b;
    }
    l !== 0 && na(e, l, n);
  }
  function Ts() {
    return (lt & 6) === 0 ? (Zr(0), !1) : !0;
  }
  function zf() {
    if ($e !== null) {
      if (ut === 0)
        var e = $e.return;
      else
        e = $e, Ha = Xl = null, Qc(e), zi = null, Tr = 0, e = $e;
      for (; e !== null; )
        tp(e.alternate, e), e = e.return;
      $e = null;
    }
  }
  function Gi(e, n) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, ow(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Qa = 0, zf(), gt = e, $e = l = Oa(e.current, null), Qe = n, ut = 0, jn = null, bl = !1, ki = ot(e, n), Cf = !1, Vi = On = Mf = ei = xl = Dt = 0, Sn = $r = null, Tf = !1, (n & 8) !== 0 && (n |= n & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= n; 0 < r; ) {
        var c = 31 - zt(r), d = 1 << c;
        n |= e[c], r &= ~d;
      }
    return Za = n, Ko(), l;
  }
  function Np(e, n) {
    ke = null, C.H = Hr, n === Di || n === as ? (n = Ym(), ut = 3) : n === Lc ? (n = Ym(), ut = 4) : ut = n === cf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, jn = n, $e === null && (Dt = 1, ys(
      e,
      qn(n, e.current)
    ));
  }
  function Cp() {
    var e = Dn.current;
    return e === null ? !0 : (Qe & 4194048) === Qe ? Qn === null : (Qe & 62914560) === Qe || (Qe & 536870912) !== 0 ? e === Qn : !1;
  }
  function Mp() {
    var e = C.H;
    return C.H = Hr, e === null ? Hr : e;
  }
  function Tp() {
    var e = C.A;
    return C.A = kS, e;
  }
  function Rs() {
    Dt = 4, bl || (Qe & 4194048) !== Qe && Dn.current !== null || (ki = !0), (xl & 134217727) === 0 && (ei & 134217727) === 0 || gt === null || El(
      gt,
      Qe,
      On,
      !1
    );
  }
  function jf(e, n, l) {
    var r = lt;
    lt |= 2;
    var c = Mp(), d = Tp();
    (gt !== e || Qe !== n) && (Ms = null, Gi(e, n)), n = !1;
    var b = Dt;
    e: do
      try {
        if (ut !== 0 && $e !== null) {
          var N = $e, k = jn;
          switch (ut) {
            case 8:
              zf(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Dn.current === null && (n = !0);
              var ae = ut;
              if (ut = 0, jn = null, qi(e, N, k, ae), l && ki) {
                b = 0;
                break e;
              }
              break;
            default:
              ae = ut, ut = 0, jn = null, qi(e, N, k, ae);
          }
        }
        GS(), b = Dt;
        break;
      } catch (ue) {
        Np(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ha = Xl = null, lt = r, C.H = c, C.A = d, $e === null && (gt = null, Qe = 0, Ko()), b;
  }
  function GS() {
    for (; $e !== null; ) Rp($e);
  }
  function qS(e, n) {
    var l = lt;
    lt |= 2;
    var r = Mp(), c = Tp();
    gt !== e || Qe !== n ? (Ms = null, Cs = yt() + 500, Gi(e, n)) : ki = ot(
      e,
      n
    );
    e: do
      try {
        if (ut !== 0 && $e !== null) {
          n = $e;
          var d = jn;
          t: switch (ut) {
            case 1:
              ut = 0, jn = null, qi(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (km(d)) {
                ut = 0, jn = null, Ap(n);
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
              km(d) ? (ut = 0, jn = null, Ap(n)) : (ut = 0, jn = null, qi(e, n, d, 7));
              break;
            case 5:
              var b = null;
              switch ($e.tag) {
                case 26:
                  b = $e.memoizedState;
                case 5:
                case 27:
                  var N = $e;
                  if (b ? g0(b) : N.stateNode.complete) {
                    ut = 0, jn = null;
                    var k = N.sibling;
                    if (k !== null) $e = k;
                    else {
                      var ae = N.return;
                      ae !== null ? ($e = ae, As(ae)) : $e = null;
                    }
                    break t;
                  }
              }
              ut = 0, jn = null, qi(e, n, d, 5);
              break;
            case 6:
              ut = 0, jn = null, qi(e, n, d, 6);
              break;
            case 8:
              zf(), Dt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        $S();
        break;
      } catch (ue) {
        Np(e, ue);
      }
    while (!0);
    return Ha = Xl = null, C.H = r, C.A = c, lt = l, $e !== null ? 0 : (gt = null, Qe = 0, Ko(), Dt);
  }
  function $S() {
    for (; $e !== null && !Et(); )
      Rp($e);
  }
  function Rp(e) {
    var n = Wg(e.alternate, e, Za);
    e.memoizedProps = e.pendingProps, n === null ? As(e) : $e = n;
  }
  function Ap(e) {
    var n = e, l = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Qg(
          l,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Qe
        );
        break;
      case 11:
        n = Qg(
          l,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Qe
        );
        break;
      case 5:
        Qc(n);
      default:
        tp(l, n), n = $e = Tm(n, Za), n = Wg(l, n, Za);
    }
    e.memoizedProps = e.pendingProps, n === null ? As(e) : $e = n;
  }
  function qi(e, n, l, r) {
    Ha = Xl = null, Qc(n), zi = null, Tr = 0;
    var c = n.return;
    try {
      if (zS(
        e,
        c,
        n,
        l,
        Qe
      )) {
        Dt = 1, ys(
          e,
          qn(l, e.current)
        ), $e = null;
        return;
      }
    } catch (d) {
      if (c !== null) throw $e = c, d;
      Dt = 1, ys(
        e,
        qn(l, e.current)
      ), $e = null;
      return;
    }
    n.flags & 32768 ? (Fe || r === 1 ? e = !0 : ki || (Qe & 536870912) !== 0 ? e = !1 : (bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Dn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Dp(n, e)) : As(n);
  }
  function As(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Dp(
          n,
          bl
        );
        return;
      }
      e = n.return;
      var l = LS(
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
  function Dp(e, n) {
    do {
      var l = HS(e.alternate, e);
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
  function zp(e, n, l, r, c, d, b, N, k) {
    e.cancelPendingCommit = null;
    do
      Ds();
    while (Zt !== 0);
    if ((lt & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (d = n.lanes | n.childLanes, d |= xc, Xt(
        e,
        l,
        d,
        b,
        N,
        k
      ), e === gt && ($e = gt = null, Qe = 0), Yi = n, wl = e, Qa = l, Rf = d, Af = c, Sp = r, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, IS(qt, function() {
        return Bp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || r) {
        r = C.T, C.T = null, c = O.p, O.p = 2, b = lt, lt |= 4;
        try {
          BS(e, n, l);
        } finally {
          lt = b, O.p = c, C.T = r;
        }
      }
      Zt = 1, jp(), Op(), Lp();
    }
  }
  function jp() {
    if (Zt === 1) {
      Zt = 0;
      var e = wl, n = Yi, l = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || l) {
        l = C.T, C.T = null;
        var r = O.p;
        O.p = 2;
        var c = lt;
        lt |= 4;
        try {
          hp(n, e);
          var d = Xf, b = bm(e.containerInfo), N = d.focusedElem, k = d.selectionRange;
          if (b !== N && N && N.ownerDocument && vm(
            N.ownerDocument.documentElement,
            N
          )) {
            if (k !== null && gc(N)) {
              var ae = k.start, ue = k.end;
              if (ue === void 0 && (ue = ae), "selectionStart" in N)
                N.selectionStart = ae, N.selectionEnd = Math.min(
                  ue,
                  N.value.length
                );
              else {
                var fe = N.ownerDocument || document, ie = fe && fe.defaultView || window;
                if (ie.getSelection) {
                  var oe = ie.getSelection(), _e = N.textContent.length, Oe = Math.min(k.start, _e), ht = k.end === void 0 ? Oe : Math.min(k.end, _e);
                  !oe.extend && Oe > ht && (b = ht, ht = Oe, Oe = b);
                  var P = ym(
                    N,
                    Oe
                  ), X = ym(
                    N,
                    ht
                  );
                  if (P && X && (oe.rangeCount !== 1 || oe.anchorNode !== P.node || oe.anchorOffset !== P.offset || oe.focusNode !== X.node || oe.focusOffset !== X.offset)) {
                    var te = fe.createRange();
                    te.setStart(P.node, P.offset), oe.removeAllRanges(), Oe > ht ? (oe.addRange(te), oe.extend(X.node, X.offset)) : (te.setEnd(X.node, X.offset), oe.addRange(te));
                  }
                }
              }
            }
            for (fe = [], oe = N; oe = oe.parentNode; )
              oe.nodeType === 1 && fe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof N.focus == "function" && N.focus(), N = 0; N < fe.length; N++) {
              var ce = fe[N];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          qs = !!$f, Xf = $f = null;
        } finally {
          lt = c, O.p = r, C.T = l;
        }
      }
      e.current = n, Zt = 2;
    }
  }
  function Op() {
    if (Zt === 2) {
      Zt = 0;
      var e = wl, n = Yi, l = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || l) {
        l = C.T, C.T = null;
        var r = O.p;
        O.p = 2;
        var c = lt;
        lt |= 4;
        try {
          sp(e, n.alternate, n);
        } finally {
          lt = c, O.p = r, C.T = l;
        }
      }
      Zt = 3;
    }
  }
  function Lp() {
    if (Zt === 4 || Zt === 3) {
      Zt = 0, Qt();
      var e = wl, n = Yi, l = Qa, r = Sp;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Zt = 5 : (Zt = 0, Yi = wl = null, Hp(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (Sl = null), W(l), n = n.stateNode, $t && typeof $t.onCommitFiberRoot == "function")
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
        n = C.T, c = O.p, O.p = 2, C.T = null;
        try {
          for (var d = e.onRecoverableError, b = 0; b < r.length; b++) {
            var N = r[b];
            d(N.value, {
              componentStack: N.stack
            });
          }
        } finally {
          C.T = n, O.p = c;
        }
      }
      (Qa & 3) !== 0 && Ds(), Sa(e), c = e.pendingLanes, (l & 261930) !== 0 && (c & 42) !== 0 ? e === Df ? Xr++ : (Xr = 0, Df = e) : Xr = 0, Zr(0);
    }
  }
  function Hp(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Cr(n)));
  }
  function Ds() {
    return jp(), Op(), Lp(), Bp();
  }
  function Bp() {
    if (Zt !== 5) return !1;
    var e = wl, n = Rf;
    Rf = 0;
    var l = W(Qa), r = C.T, c = O.p;
    try {
      O.p = 32 > l ? 32 : l, C.T = null, l = Af, Af = null;
      var d = wl, b = Qa;
      if (Zt = 0, Yi = wl = null, Qa = 0, (lt & 6) !== 0) throw Error(o(331));
      var N = lt;
      if (lt |= 4, vp(d.current), gp(
        d,
        d.current,
        b,
        l
      ), lt = N, Zr(0, !1), $t && typeof $t.onPostCommitFiberRoot == "function")
        try {
          $t.onPostCommitFiberRoot(Nn, d);
        } catch {
        }
      return !0;
    } finally {
      O.p = c, C.T = r, Hp(e, n);
    }
  }
  function Up(e, n, l) {
    n = qn(l, n), n = uf(e.stateNode, n, 2), e = gl(e, n, 2), e !== null && (rt(e, 2), Sa(e));
  }
  function ct(e, n, l) {
    if (e.tag === 3)
      Up(e, e, l);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Up(
            n,
            e,
            l
          );
          break;
        } else if (n.tag === 1) {
          var r = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Sl === null || !Sl.has(r))) {
            e = qn(l, e), l = kg(2), r = gl(n, l, 2), r !== null && (Vg(
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
  function Of(e, n, l) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new VS();
      var c = /* @__PURE__ */ new Set();
      r.set(n, c);
    } else
      c = r.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), r.set(n, c));
    c.has(l) || (Cf = !0, c.add(l), e = XS.bind(null, e, n, l), n.then(e, e));
  }
  function XS(e, n, l) {
    var r = e.pingCache;
    r !== null && r.delete(n), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, gt === e && (Qe & l) === l && (Dt === 4 || Dt === 3 && (Qe & 62914560) === Qe && 300 > yt() - Ns ? (lt & 2) === 0 && Gi(e, 0) : Mf |= l, Vi === Qe && (Vi = 0)), Sa(e);
  }
  function kp(e, n) {
    n === 0 && (n = jt()), e = Gl(e, n), e !== null && (rt(e, n), Sa(e));
  }
  function ZS(e) {
    var n = e.memoizedState, l = 0;
    n !== null && (l = n.retryLane), kp(e, l);
  }
  function QS(e, n) {
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
    r !== null && r.delete(n), kp(e, l);
  }
  function IS(e, n) {
    return Gt(e, n);
  }
  var zs = null, $i = null, Lf = !1, js = !1, Hf = !1, _l = 0;
  function Sa(e) {
    e !== $i && e.next === null && ($i === null ? zs = $i = e : $i = $i.next = e), js = !0, Lf || (Lf = !0, FS());
  }
  function Zr(e, n) {
    if (!Hf && js) {
      Hf = !0;
      do
        for (var l = !1, r = zs; r !== null; ) {
          if (e !== 0) {
            var c = r.pendingLanes;
            if (c === 0) var d = 0;
            else {
              var b = r.suspendedLanes, N = r.pingedLanes;
              d = (1 << 31 - zt(42 | e) + 1) - 1, d &= c & ~(b & ~N), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (l = !0, qp(r, d));
          } else
            d = Qe, d = Le(
              r,
              r === gt ? d : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (d & 3) === 0 || ot(r, d) || (l = !0, qp(r, d));
          r = r.next;
        }
      while (l);
      Hf = !1;
    }
  }
  function KS() {
    Vp();
  }
  function Vp() {
    js = Lf = !1;
    var e = 0;
    _l !== 0 && rw() && (e = _l);
    for (var n = yt(), l = null, r = zs; r !== null; ) {
      var c = r.next, d = Yp(r, n);
      d === 0 ? (r.next = null, l === null ? zs = c : l.next = c, c === null && ($i = l)) : (l = r, (e !== 0 || (d & 3) !== 0) && (js = !0)), r = c;
    }
    Zt !== 0 && Zt !== 5 || Zr(e), _l !== 0 && (_l = 0);
  }
  function Yp(e, n) {
    for (var l = e.suspendedLanes, r = e.pingedLanes, c = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var b = 31 - zt(d), N = 1 << b, k = c[b];
      k === -1 ? ((N & l) === 0 || (N & r) !== 0) && (c[b] = Rt(N, n)) : k <= n && (e.expiredLanes |= N), d &= ~N;
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
          l = Ct;
          break;
        default:
          l = qt;
      }
      return r = Gp.bind(null, e), l = Gt(l, r), e.callbackPriority = n, e.callbackNode = l, n;
    }
    return r !== null && r !== null && Jt(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Gp(e, n) {
    if (Zt !== 0 && Zt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Ds() && e.callbackNode !== l)
      return null;
    var r = Qe;
    return r = Le(
      e,
      e === gt ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (Ep(e, r, n), Yp(e, yt()), e.callbackNode != null && e.callbackNode === l ? Gp.bind(null, e) : null);
  }
  function qp(e, n) {
    if (Ds()) return null;
    Ep(e, n, !0);
  }
  function FS() {
    sw(function() {
      (lt & 6) !== 0 ? Gt(
        Nt,
        KS
      ) : Vp();
    });
  }
  function Bf() {
    if (_l === 0) {
      var e = Ri;
      e === 0 && (e = ta, ta <<= 1, (ta & 261888) === 0 && (ta = 256)), _l = e;
    }
    return _l;
  }
  function $p(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yo("" + e);
  }
  function Xp(e, n) {
    var l = n.ownerDocument.createElement("input");
    return l.name = n.name, l.value = n.value, e.id && l.setAttribute("form", e.id), n.parentNode.insertBefore(l, n), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function JS(e, n, l, r, c) {
    if (n === "submit" && l && l.stateNode === c) {
      var d = $p(
        (c[xe] || null).action
      ), b = r.submitter;
      b && (n = (n = b[xe] || null) ? $p(n.formAction) : b.getAttribute("formAction"), n !== null && (d = n, b = null));
      var N = new Xo(
        "action",
        "action",
        null,
        r,
        c
      );
      e.push({
        event: N,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (_l !== 0) {
                  var k = b ? Xp(c, b) : new FormData(c);
                  nf(
                    l,
                    {
                      pending: !0,
                      data: k,
                      method: c.method,
                      action: d
                    },
                    null,
                    k
                  );
                }
              } else
                typeof d == "function" && (N.preventDefault(), k = b ? Xp(c, b) : new FormData(c), nf(
                  l,
                  {
                    pending: !0,
                    data: k,
                    method: c.method,
                    action: d
                  },
                  d,
                  k
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Uf = 0; Uf < bc.length; Uf++) {
    var kf = bc[Uf], PS = kf.toLowerCase(), WS = kf[0].toUpperCase() + kf.slice(1);
    ia(
      PS,
      "on" + WS
    );
  }
  ia(wm, "onAnimationEnd"), ia(Em, "onAnimationIteration"), ia(_m, "onAnimationStart"), ia("dblclick", "onDoubleClick"), ia("focusin", "onFocus"), ia("focusout", "onBlur"), ia(gS, "onTransitionRun"), ia(pS, "onTransitionStart"), ia(yS, "onTransitionCancel"), ia(Nm, "onTransitionEnd"), en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]), sn(
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
  var Qr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), ew = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qr)
  );
  function Zp(e, n) {
    n = (n & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var r = e[l], c = r.event;
      r = r.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var b = r.length - 1; 0 <= b; b--) {
            var N = r[b], k = N.instance, ae = N.currentTarget;
            if (N = N.listener, k !== d && c.isPropagationStopped())
              break e;
            d = N, c.currentTarget = ae;
            try {
              d(c);
            } catch (ue) {
              Io(ue);
            }
            c.currentTarget = null, d = k;
          }
        else
          for (b = 0; b < r.length; b++) {
            if (N = r[b], k = N.instance, ae = N.currentTarget, N = N.listener, k !== d && c.isPropagationStopped())
              break e;
            d = N, c.currentTarget = ae;
            try {
              d(c);
            } catch (ue) {
              Io(ue);
            }
            c.currentTarget = null, d = k;
          }
      }
    }
  }
  function Xe(e, n) {
    var l = n[Ce];
    l === void 0 && (l = n[Ce] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    l.has(r) || (Qp(n, e, 2, !1), l.add(r));
  }
  function Vf(e, n, l) {
    var r = 0;
    n && (r |= 4), Qp(
      l,
      e,
      r,
      n
    );
  }
  var Os = "_reactListening" + Math.random().toString(36).slice(2);
  function Yf(e) {
    if (!e[Os]) {
      e[Os] = !0, ya.forEach(function(l) {
        l !== "selectionchange" && (ew.has(l) || Vf(l, !1, e), Vf(l, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Os] || (n[Os] = !0, Vf("selectionchange", !1, n));
    }
  }
  function Qp(e, n, l, r) {
    switch (w0(n)) {
      case 2:
        var c = Tw;
        break;
      case 8:
        c = Rw;
        break;
      default:
        c = nd;
    }
    l = c.bind(
      null,
      n,
      l,
      e
    ), c = void 0, !rc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), r ? c !== void 0 ? e.addEventListener(n, l, {
      capture: !0,
      passive: c
    }) : e.addEventListener(n, l, !0) : c !== void 0 ? e.addEventListener(n, l, {
      passive: c
    }) : e.addEventListener(n, l, !1);
  }
  function Gf(e, n, l, r, c) {
    var d = r;
    if ((n & 1) === 0 && (n & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var b = r.tag;
        if (b === 3 || b === 4) {
          var N = r.stateNode.containerInfo;
          if (N === c) break;
          if (b === 4)
            for (b = r.return; b !== null; ) {
              var k = b.tag;
              if ((k === 3 || k === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; N !== null; ) {
            if (b = mt(N), b === null) return;
            if (k = b.tag, k === 5 || k === 6 || k === 26 || k === 27) {
              r = d = b;
              continue e;
            }
            N = N.parentNode;
          }
        }
        r = r.return;
      }
    Ph(function() {
      var ae = d, ue = lc(l), fe = [];
      e: {
        var ie = Cm.get(e);
        if (ie !== void 0) {
          var oe = Xo, _e = e;
          switch (e) {
            case "keypress":
              if (qo(l) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Qx;
              break;
            case "focusin":
              _e = "focus", oe = cc;
              break;
            case "focusout":
              _e = "blur", oe = cc;
              break;
            case "beforeblur":
            case "afterblur":
              oe = cc;
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
              oe = tm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Lx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Fx;
              break;
            case wm:
            case Em:
            case _m:
              oe = Ux;
              break;
            case Nm:
              oe = Px;
              break;
            case "scroll":
            case "scrollend":
              oe = jx;
              break;
            case "wheel":
              oe = eS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Vx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = am;
              break;
            case "toggle":
            case "beforetoggle":
              oe = nS;
          }
          var Oe = (n & 4) !== 0, ht = !Oe && (e === "scroll" || e === "scrollend"), P = Oe ? ie !== null ? ie + "Capture" : null : ie;
          Oe = [];
          for (var X = ae, te; X !== null; ) {
            var ce = X;
            if (te = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || te === null || P === null || (ce = gr(X, P), ce != null && Oe.push(
              Ir(X, ce, te)
            )), ht) break;
            X = X.return;
          }
          0 < Oe.length && (ie = new oe(
            ie,
            _e,
            null,
            l,
            ue
          ), fe.push({ event: ie, listeners: Oe }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", ie && l !== ac && (_e = l.relatedTarget || l.fromElement) && (mt(_e) || _e[be]))
            break e;
          if ((oe || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, oe ? (_e = l.relatedTarget || l.toElement, oe = ae, _e = _e ? mt(_e) : null, _e !== null && (ht = u(_e), Oe = _e.tag, _e !== ht || Oe !== 5 && Oe !== 27 && Oe !== 6) && (_e = null)) : (oe = null, _e = ae), oe !== _e)) {
            if (Oe = tm, ce = "onMouseLeave", P = "onMouseEnter", X = "mouse", (e === "pointerout" || e === "pointerover") && (Oe = am, ce = "onPointerLeave", P = "onPointerEnter", X = "pointer"), ht = oe == null ? ie : Ze(oe), te = _e == null ? ie : Ze(_e), ie = new Oe(
              ce,
              X + "leave",
              oe,
              l,
              ue
            ), ie.target = ht, ie.relatedTarget = te, ce = null, mt(ue) === ae && (Oe = new Oe(
              P,
              X + "enter",
              _e,
              l,
              ue
            ), Oe.target = te, Oe.relatedTarget = ht, ce = Oe), ht = ce, oe && _e)
              t: {
                for (Oe = tw, P = oe, X = _e, te = 0, ce = P; ce; ce = Oe(ce))
                  te++;
                ce = 0;
                for (var Re = X; Re; Re = Oe(Re))
                  ce++;
                for (; 0 < te - ce; )
                  P = Oe(P), te--;
                for (; 0 < ce - te; )
                  X = Oe(X), ce--;
                for (; te--; ) {
                  if (P === X || X !== null && P === X.alternate) {
                    Oe = P;
                    break t;
                  }
                  P = Oe(P), X = Oe(X);
                }
                Oe = null;
              }
            else Oe = null;
            oe !== null && Ip(
              fe,
              ie,
              oe,
              Oe,
              !1
            ), _e !== null && ht !== null && Ip(
              fe,
              ht,
              _e,
              Oe,
              !0
            );
          }
        }
        e: {
          if (ie = ae ? Ze(ae) : window, oe = ie.nodeName && ie.nodeName.toLowerCase(), oe === "select" || oe === "input" && ie.type === "file")
            var et = fm;
          else if (um(ie))
            if (dm)
              et = dS;
            else {
              et = cS;
              var Ne = uS;
            }
          else
            oe = ie.nodeName, !oe || oe.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ae && nc(ae.elementType) && (et = fm) : et = fS;
          if (et && (et = et(e, ae))) {
            cm(
              fe,
              et,
              l,
              ue
            );
            break e;
          }
          Ne && Ne(e, ie, ae), e === "focusout" && ae && ie.type === "number" && ae.memoizedProps.value != null && hr(ie, "number", ie.value);
        }
        switch (Ne = ae ? Ze(ae) : window, e) {
          case "focusin":
            (um(Ne) || Ne.contentEditable === "true") && (Si = Ne, pc = ae, Er = null);
            break;
          case "focusout":
            Er = pc = Si = null;
            break;
          case "mousedown":
            yc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            yc = !1, xm(fe, l, ue);
            break;
          case "selectionchange":
            if (mS) break;
          case "keydown":
          case "keyup":
            xm(fe, l, ue);
        }
        var Ve;
        if (dc)
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
          xi ? om(e, l) && (Ie = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Ie = "onCompositionStart");
        Ie && (lm && l.locale !== "ko" && (xi || Ie !== "onCompositionStart" ? Ie === "onCompositionEnd" && xi && (Ve = Wh()) : (sl = ue, oc = "value" in sl ? sl.value : sl.textContent, xi = !0)), Ne = Ls(ae, Ie), 0 < Ne.length && (Ie = new nm(
          Ie,
          e,
          null,
          l,
          ue
        ), fe.push({ event: Ie, listeners: Ne }), Ve ? Ie.data = Ve : (Ve = sm(l), Ve !== null && (Ie.data = Ve)))), (Ve = lS ? iS(e, l) : rS(e, l)) && (Ie = Ls(ae, "onBeforeInput"), 0 < Ie.length && (Ne = new nm(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ue
        ), fe.push({
          event: Ne,
          listeners: Ie
        }), Ne.data = Ve)), JS(
          fe,
          e,
          ae,
          l,
          ue
        );
      }
      Zp(fe, n);
    });
  }
  function Ir(e, n, l) {
    return {
      instance: e,
      listener: n,
      currentTarget: l
    };
  }
  function Ls(e, n) {
    for (var l = n + "Capture", r = []; e !== null; ) {
      var c = e, d = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || d === null || (c = gr(e, l), c != null && r.unshift(
        Ir(e, c, d)
      ), c = gr(e, n), c != null && r.push(
        Ir(e, c, d)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function tw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ip(e, n, l, r, c) {
    for (var d = n._reactName, b = []; l !== null && l !== r; ) {
      var N = l, k = N.alternate, ae = N.stateNode;
      if (N = N.tag, k !== null && k === r) break;
      N !== 5 && N !== 26 && N !== 27 || ae === null || (k = ae, c ? (ae = gr(l, d), ae != null && b.unshift(
        Ir(l, ae, k)
      )) : c || (ae = gr(l, d), ae != null && b.push(
        Ir(l, ae, k)
      ))), l = l.return;
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var nw = /\r\n?/g, aw = /\u0000|\uFFFD/g;
  function Kp(e) {
    return (typeof e == "string" ? e : "" + e).replace(nw, `
`).replace(aw, "");
  }
  function Fp(e, n) {
    return n = Kp(n), Kp(e) === n;
  }
  function dt(e, n, l, r, c, d) {
    switch (l) {
      case "children":
        typeof r == "string" ? n === "body" || n === "textarea" && r === "" || yi(e, r) : (typeof r == "number" || typeof r == "bigint") && n !== "body" && yi(e, "" + r);
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
        Fh(e, r, d);
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
        r = Yo("" + r), e.setAttribute(l, r);
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
        r = Yo("" + r), e.setAttribute(l, r);
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
        l = Yo("" + r), e.setAttributeNS(
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
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Dx.get(l) || l, aa(e, l, r));
    }
  }
  function qf(e, n, l, r, c, d) {
    switch (l) {
      case "style":
        Fh(e, r, d);
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
        typeof r == "string" ? yi(e, r) : (typeof r == "number" || typeof r == "bigint") && yi(e, "" + r);
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
        if (!Mn.hasOwnProperty(l))
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
        var N = d = b = c = null, k = null, ae = null;
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
                  k = ue;
                  break;
                case "defaultChecked":
                  ae = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  N = ue;
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
        pi(
          e,
          d,
          N,
          k,
          ae,
          b,
          c,
          !1
        );
        return;
      case "select":
        Xe("invalid", e), r = b = d = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (N = l[c], N != null))
            switch (c) {
              case "value":
                d = N;
                break;
              case "defaultValue":
                b = N;
                break;
              case "multiple":
                r = N;
              default:
                dt(e, n, c, N, l, null);
            }
        n = d, l = b, e.multiple = !!r, n != null ? ol(e, !!r, n, !1) : l != null && ol(e, !!r, l, !0);
        return;
      case "textarea":
        Xe("invalid", e), d = c = r = null;
        for (b in l)
          if (l.hasOwnProperty(b) && (N = l[b], N != null))
            switch (b) {
              case "value":
                r = N;
                break;
              case "defaultValue":
                c = N;
                break;
              case "children":
                d = N;
                break;
              case "dangerouslySetInnerHTML":
                if (N != null) throw Error(o(91));
                break;
              default:
                dt(e, n, b, N, l, null);
            }
        Ih(e, r, c, d);
        return;
      case "option":
        for (k in l)
          if (l.hasOwnProperty(k) && (r = l[k], r != null))
            switch (k) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                dt(e, n, k, r, l, null);
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
        for (r = 0; r < Qr.length; r++)
          Xe(Qr[r], e);
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
        for (ae in l)
          if (l.hasOwnProperty(ae) && (r = l[ae], r != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                dt(e, n, ae, r, l, null);
            }
        return;
      default:
        if (nc(n)) {
          for (ue in l)
            l.hasOwnProperty(ue) && (r = l[ue], r !== void 0 && qf(
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
    for (N in l)
      l.hasOwnProperty(N) && (r = l[N], r != null && dt(e, n, N, r, l, null));
  }
  function lw(e, n, l, r) {
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
        var c = null, d = null, b = null, N = null, k = null, ae = null, ue = null;
        for (oe in l) {
          var fe = l[oe];
          if (l.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                k = fe;
              default:
                r.hasOwnProperty(oe) || dt(e, n, oe, null, r, fe);
            }
        }
        for (var ie in r) {
          var oe = r[ie];
          if (fe = l[ie], r.hasOwnProperty(ie) && (oe != null || fe != null))
            switch (ie) {
              case "type":
                d = oe;
                break;
              case "name":
                c = oe;
                break;
              case "checked":
                ae = oe;
                break;
              case "defaultChecked":
                ue = oe;
                break;
              case "value":
                b = oe;
                break;
              case "defaultValue":
                N = oe;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (oe != null)
                  throw Error(o(137, n));
                break;
              default:
                oe !== fe && dt(
                  e,
                  n,
                  ie,
                  oe,
                  r,
                  fe
                );
            }
        }
        Ul(
          e,
          b,
          N,
          k,
          ae,
          ue,
          d,
          c
        );
        return;
      case "select":
        oe = b = N = ie = null;
        for (d in l)
          if (k = l[d], l.hasOwnProperty(d) && k != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                oe = k;
              default:
                r.hasOwnProperty(d) || dt(
                  e,
                  n,
                  d,
                  null,
                  r,
                  k
                );
            }
        for (c in r)
          if (d = r[c], k = l[c], r.hasOwnProperty(c) && (d != null || k != null))
            switch (c) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                N = d;
                break;
              case "multiple":
                b = d;
              default:
                d !== k && dt(
                  e,
                  n,
                  c,
                  d,
                  r,
                  k
                );
            }
        n = N, l = b, r = oe, ie != null ? ol(e, !!l, ie, !1) : !!r != !!l && (n != null ? ol(e, !!l, n, !0) : ol(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        oe = ie = null;
        for (N in l)
          if (c = l[N], l.hasOwnProperty(N) && c != null && !r.hasOwnProperty(N))
            switch (N) {
              case "value":
                break;
              case "children":
                break;
              default:
                dt(e, n, N, null, r, c);
            }
        for (b in r)
          if (c = r[b], d = l[b], r.hasOwnProperty(b) && (c != null || d != null))
            switch (b) {
              case "value":
                ie = c;
                break;
              case "defaultValue":
                oe = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(o(91));
                break;
              default:
                c !== d && dt(e, n, b, c, r, d);
            }
        mr(e, ie, oe);
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
        for (k in r)
          if (ie = r[k], oe = l[k], r.hasOwnProperty(k) && ie !== oe && (ie != null || oe != null))
            switch (k) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                dt(
                  e,
                  n,
                  k,
                  ie,
                  r,
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
        for (var Oe in l)
          ie = l[Oe], l.hasOwnProperty(Oe) && ie != null && !r.hasOwnProperty(Oe) && dt(e, n, Oe, null, r, ie);
        for (ae in r)
          if (ie = r[ae], oe = l[ae], r.hasOwnProperty(ae) && ie !== oe && (ie != null || oe != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(o(137, n));
                break;
              default:
                dt(
                  e,
                  n,
                  ae,
                  ie,
                  r,
                  oe
                );
            }
        return;
      default:
        if (nc(n)) {
          for (var ht in l)
            ie = l[ht], l.hasOwnProperty(ht) && ie !== void 0 && !r.hasOwnProperty(ht) && qf(
              e,
              n,
              ht,
              void 0,
              r,
              ie
            );
          for (ue in r)
            ie = r[ue], oe = l[ue], !r.hasOwnProperty(ue) || ie === oe || ie === void 0 && oe === void 0 || qf(
              e,
              n,
              ue,
              ie,
              r,
              oe
            );
          return;
        }
    }
    for (var P in l)
      ie = l[P], l.hasOwnProperty(P) && ie != null && !r.hasOwnProperty(P) && dt(e, n, P, null, r, ie);
    for (fe in r)
      ie = r[fe], oe = l[fe], !r.hasOwnProperty(fe) || ie === oe || ie == null && oe == null || dt(e, n, fe, ie, r, oe);
  }
  function Jp(e) {
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
  function iw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, l = performance.getEntriesByType("resource"), r = 0; r < l.length; r++) {
        var c = l[r], d = c.transferSize, b = c.initiatorType, N = c.duration;
        if (d && N && Jp(b)) {
          for (b = 0, N = c.responseEnd, r += 1; r < l.length; r++) {
            var k = l[r], ae = k.startTime;
            if (ae > N) break;
            var ue = k.transferSize, fe = k.initiatorType;
            ue && Jp(fe) && (k = k.responseEnd, b += ue * (k < N ? 1 : (N - ae) / (k - ae)));
          }
          if (--r, n += 8 * (d + b) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var $f = null, Xf = null;
  function Hs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Pp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Wp(e, n) {
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
  function Zf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Qf = null;
  function rw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Qf ? !1 : (Qf = e, !0) : (Qf = null, !1);
  }
  var e0 = typeof setTimeout == "function" ? setTimeout : void 0, ow = typeof clearTimeout == "function" ? clearTimeout : void 0, t0 = typeof Promise == "function" ? Promise : void 0, sw = typeof queueMicrotask == "function" ? queueMicrotask : typeof t0 < "u" ? function(e) {
    return t0.resolve(null).then(e).catch(uw);
  } : e0;
  function uw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Nl(e) {
    return e === "head";
  }
  function n0(e, n) {
    var l = n, r = 0;
    do {
      var c = l.nextSibling;
      if (e.removeChild(l), c && c.nodeType === 8)
        if (l = c.data, l === "/$" || l === "/&") {
          if (r === 0) {
            e.removeChild(c), Ii(n);
            return;
          }
          r--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          r++;
        else if (l === "html")
          Kr(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Kr(l);
          for (var d = l.firstChild; d; ) {
            var b = d.nextSibling, N = d.nodeName;
            d[Ye] || N === "SCRIPT" || N === "STYLE" || N === "LINK" && d.rel.toLowerCase() === "stylesheet" || l.removeChild(d), d = b;
          }
        } else
          l === "body" && Kr(e.ownerDocument.body);
      l = c;
    } while (l);
    Ii(n);
  }
  function a0(e, n) {
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
  function If(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var l = n;
      switch (n = n.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          If(l), Je(l);
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
  function cw(e, n, l, r) {
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
  function fw(e, n, l) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function l0(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Kf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ff(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function dw(e, n) {
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
  var Jf = null;
  function i0(e) {
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
  function r0(e) {
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
  function o0(e, n, l) {
    switch (n = Hs(l), e) {
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
  function Kr(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Je(e);
  }
  var Kn = /* @__PURE__ */ new Map(), s0 = /* @__PURE__ */ new Set();
  function Bs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ia = O.d;
  O.d = {
    f: hw,
    r: mw,
    D: gw,
    C: pw,
    L: yw,
    m: vw,
    X: xw,
    S: bw,
    M: Sw
  };
  function hw() {
    var e = Ia.f(), n = Ts();
    return e || n;
  }
  function mw(e) {
    var n = We(e);
    n !== null && n.tag === 5 && n.type === "form" ? Ng(n) : Ia.r(e);
  }
  var Xi = typeof document > "u" ? null : document;
  function u0(e, n, l) {
    var r = Xi;
    if (r && typeof n == "string" && n) {
      var c = tn(n);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof l == "string" && (c += '[crossorigin="' + l + '"]'), s0.has(c) || (s0.add(c), e = { rel: e, crossOrigin: l, href: n }, r.querySelector(c) === null && (n = r.createElement("link"), rn(n, "link", e), Ke(n), r.head.appendChild(n)));
    }
  }
  function gw(e) {
    Ia.D(e), u0("dns-prefetch", e, null);
  }
  function pw(e, n) {
    Ia.C(e, n), u0("preconnect", e, n);
  }
  function yw(e, n, l) {
    Ia.L(e, n, l);
    var r = Xi;
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
          d = Zi(e);
          break;
        case "script":
          d = Qi(e);
      }
      Kn.has(d) || (e = m(
        {
          rel: "preload",
          href: n === "image" && l && l.imageSrcSet ? void 0 : e,
          as: n
        },
        l
      ), Kn.set(d, e), r.querySelector(c) !== null || n === "style" && r.querySelector(Fr(d)) || n === "script" && r.querySelector(Jr(d)) || (n = r.createElement("link"), rn(n, "link", e), Ke(n), r.head.appendChild(n)));
    }
  }
  function vw(e, n) {
    Ia.m(e, n);
    var l = Xi;
    if (l && e) {
      var r = n && typeof n.as == "string" ? n.as : "script", c = 'link[rel="modulepreload"][as="' + tn(r) + '"][href="' + tn(e) + '"]', d = c;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Qi(e);
      }
      if (!Kn.has(d) && (e = m({ rel: "modulepreload", href: e }, n), Kn.set(d, e), l.querySelector(c) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Jr(d)))
              return;
        }
        r = l.createElement("link"), rn(r, "link", e), Ke(r), l.head.appendChild(r);
      }
    }
  }
  function bw(e, n, l) {
    Ia.S(e, n, l);
    var r = Xi;
    if (r && e) {
      var c = Tt(r).hoistableStyles, d = Zi(e);
      n = n || "default";
      var b = c.get(d);
      if (!b) {
        var N = { loading: 0, preload: null };
        if (b = r.querySelector(
          Fr(d)
        ))
          N.loading = 5;
        else {
          e = m(
            { rel: "stylesheet", href: e, "data-precedence": n },
            l
          ), (l = Kn.get(d)) && Pf(e, l);
          var k = b = r.createElement("link");
          Ke(k), rn(k, "link", e), k._p = new Promise(function(ae, ue) {
            k.onload = ae, k.onerror = ue;
          }), k.addEventListener("load", function() {
            N.loading |= 1;
          }), k.addEventListener("error", function() {
            N.loading |= 2;
          }), N.loading |= 4, Us(b, n, r);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: N
        }, c.set(d, b);
      }
    }
  }
  function xw(e, n) {
    Ia.X(e, n);
    var l = Xi;
    if (l && e) {
      var r = Tt(l).hoistableScripts, c = Qi(e), d = r.get(c);
      d || (d = l.querySelector(Jr(c)), d || (e = m({ src: e, async: !0 }, n), (n = Kn.get(c)) && Wf(e, n), d = l.createElement("script"), Ke(d), rn(d, "link", e), l.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(c, d));
    }
  }
  function Sw(e, n) {
    Ia.M(e, n);
    var l = Xi;
    if (l && e) {
      var r = Tt(l).hoistableScripts, c = Qi(e), d = r.get(c);
      d || (d = l.querySelector(Jr(c)), d || (e = m({ src: e, async: !0, type: "module" }, n), (n = Kn.get(c)) && Wf(e, n), d = l.createElement("script"), Ke(d), rn(d, "link", e), l.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, r.set(c, d));
    }
  }
  function c0(e, n, l, r) {
    var c = (c = me.current) ? Bs(c) : null;
    if (!c) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (n = Zi(l.href), l = Tt(
          c
        ).hoistableStyles, r = l.get(n), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Zi(l.href);
          var d = Tt(
            c
          ).hoistableStyles, b = d.get(e);
          if (b || (c = c.ownerDocument || c, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, b), (d = c.querySelector(
            Fr(e)
          )) && !d._p && (b.instance = d, b.state.loading = 5), Kn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Kn.set(e, l), d || ww(
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
        return n = l.async, l = l.src, typeof l == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Qi(l), l = Tt(
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
  function Zi(e) {
    return 'href="' + tn(e) + '"';
  }
  function Fr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function f0(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function ww(e, n, l, r) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? r.loading = 1 : (n = e.createElement("link"), r.preload = n, n.addEventListener("load", function() {
      return r.loading |= 1;
    }), n.addEventListener("error", function() {
      return r.loading |= 2;
    }), rn(n, "link", l), Ke(n), e.head.appendChild(n));
  }
  function Qi(e) {
    return '[src="' + tn(e) + '"]';
  }
  function Jr(e) {
    return "script[async]" + e;
  }
  function d0(e, n, l) {
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
          ), Ke(r), rn(r, "style", c), Us(r, l.precedence, e), n.instance = r;
        case "stylesheet":
          c = Zi(l.href);
          var d = e.querySelector(
            Fr(c)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, Ke(d), d;
          r = f0(l), (c = Kn.get(c)) && Pf(r, c), d = (e.ownerDocument || e).createElement("link"), Ke(d);
          var b = d;
          return b._p = new Promise(function(N, k) {
            b.onload = N, b.onerror = k;
          }), rn(d, "link", r), n.state.loading |= 4, Us(d, l.precedence, e), n.instance = d;
        case "script":
          return d = Qi(l.src), (c = e.querySelector(
            Jr(d)
          )) ? (n.instance = c, Ke(c), c) : (r = l, (c = Kn.get(d)) && (r = m({}, l), Wf(r, c)), e = e.ownerDocument || e, c = e.createElement("script"), Ke(c), rn(c, "link", r), e.head.appendChild(c), n.instance = c);
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (r = n.instance, n.state.loading |= 4, Us(r, l.precedence, e));
    return n.instance;
  }
  function Us(e, n, l) {
    for (var r = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = r.length ? r[r.length - 1] : null, d = c, b = 0; b < r.length; b++) {
      var N = r[b];
      if (N.dataset.precedence === n) d = N;
      else if (d !== c) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (n = l.nodeType === 9 ? l.head : l, n.insertBefore(e, n.firstChild));
  }
  function Pf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Wf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var ks = null;
  function h0(e, n, l) {
    if (ks === null) {
      var r = /* @__PURE__ */ new Map(), c = ks = /* @__PURE__ */ new Map();
      c.set(l, r);
    } else
      c = ks, r = c.get(l), r || (r = /* @__PURE__ */ new Map(), c.set(l, r));
    if (r.has(e)) return r;
    for (r.set(e, null), l = l.getElementsByTagName(e), c = 0; c < l.length; c++) {
      var d = l[c];
      if (!(d[Ye] || d[ve] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = d.getAttribute(n) || "";
        b = e + b;
        var N = r.get(b);
        N ? N.push(d) : r.set(b, [d]);
      }
    }
    return r;
  }
  function m0(e, n, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Ew(e, n, l) {
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
  function g0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function _w(e, n, l, r) {
    if (l.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var c = Zi(r.href), d = n.querySelector(
          Fr(c)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Vs.bind(e), n.then(e, e)), l.state.loading |= 4, l.instance = d, Ke(d);
          return;
        }
        d = n.ownerDocument || n, r = f0(r), (c = Kn.get(c)) && Pf(r, c), d = d.createElement("link"), Ke(d);
        var b = d;
        b._p = new Promise(function(N, k) {
          b.onload = N, b.onerror = k;
        }), rn(d, "link", r), l.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, n), (n = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Vs.bind(e), n.addEventListener("load", l), n.addEventListener("error", l));
    }
  }
  var ed = 0;
  function Nw(e, n) {
    return e.stylesheets && e.count === 0 && Gs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var r = setTimeout(function() {
        if (e.stylesheets && Gs(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && ed === 0 && (ed = 62500 * iw());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Gs(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > ed ? 50 : 800) + n
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(c);
      };
    } : null;
  }
  function Vs() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Gs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ys = null;
  function Gs(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ys = /* @__PURE__ */ new Map(), n.forEach(Cw, e), Ys = null, Vs.call(e));
  }
  function Cw(e, n) {
    if (!(n.state.loading & 4)) {
      var l = Ys.get(e);
      if (l) var r = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ys.set(e, l);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < c.length; d++) {
          var b = c[d];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (l.set(b.dataset.precedence, b), r = b);
        }
        r && l.set(null, r);
      }
      c = n.instance, b = c.getAttribute("data-precedence"), d = l.get(b) || r, d === r && l.set(null, c), l.set(b, c), this.count++, r = Vs.bind(this), c.addEventListener("load", r), c.addEventListener("error", r), d ? d.parentNode.insertBefore(c, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Pr = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function Mw(e, n, l, r, c, d, b, N, k) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = fn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = fn(0), this.hiddenUpdates = fn(null), this.identifierPrefix = r, this.onUncaughtError = c, this.onCaughtError = d, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = k, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function p0(e, n, l, r, c, d, b, N, k, ae, ue, fe) {
    return e = new Mw(
      e,
      n,
      l,
      b,
      k,
      ae,
      ue,
      fe,
      N
    ), n = 1, d === !0 && (n |= 24), d = An(3, null, null, n), e.current = d, d.stateNode = e, n = zc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: r,
      isDehydrated: l,
      cache: n
    }, Hc(d), e;
  }
  function y0(e) {
    return e ? (e = _i, e) : _i;
  }
  function v0(e, n, l, r, c, d) {
    c = y0(c), r.context === null ? r.context = c : r.pendingContext = c, r = ml(n), r.payload = { element: l }, d = d === void 0 ? null : d, d !== null && (r.callback = d), l = gl(e, r, n), l !== null && (wn(l, e, n), Ar(l, e, n));
  }
  function b0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < n ? l : n;
    }
  }
  function td(e, n) {
    b0(e, n), (e = e.alternate) && b0(e, n);
  }
  function x0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Gl(e, 67108864);
      n !== null && wn(n, e, 67108864), td(e, 67108864);
    }
  }
  function S0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ln();
      n = I(n);
      var l = Gl(e, n);
      l !== null && wn(l, e, n), td(e, n);
    }
  }
  var qs = !0;
  function Tw(e, n, l, r) {
    var c = C.T;
    C.T = null;
    var d = O.p;
    try {
      O.p = 2, nd(e, n, l, r);
    } finally {
      O.p = d, C.T = c;
    }
  }
  function Rw(e, n, l, r) {
    var c = C.T;
    C.T = null;
    var d = O.p;
    try {
      O.p = 8, nd(e, n, l, r);
    } finally {
      O.p = d, C.T = c;
    }
  }
  function nd(e, n, l, r) {
    if (qs) {
      var c = ad(r);
      if (c === null)
        Gf(
          e,
          n,
          r,
          $s,
          l
        ), E0(e, r);
      else if (Dw(
        c,
        e,
        n,
        l,
        r
      ))
        r.stopPropagation();
      else if (E0(e, r), n & 4 && -1 < Aw.indexOf(e)) {
        for (; c !== null; ) {
          var d = We(c);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var b = on(d.pendingLanes);
                  if (b !== 0) {
                    var N = d;
                    for (N.pendingLanes |= 2, N.entangledLanes |= 2; b; ) {
                      var k = 1 << 31 - zt(b);
                      N.entanglements[1] |= k, b &= ~k;
                    }
                    Sa(d), (lt & 6) === 0 && (Cs = yt() + 500, Zr(0));
                  }
                }
                break;
              case 31:
              case 13:
                N = Gl(d, 2), N !== null && wn(N, d, 2), Ts(), td(d, 2);
            }
          if (d = ad(r), d === null && Gf(
            e,
            n,
            r,
            $s,
            l
          ), d === c) break;
          c = d;
        }
        c !== null && r.stopPropagation();
      } else
        Gf(
          e,
          n,
          r,
          null,
          l
        );
    }
  }
  function ad(e) {
    return e = lc(e), ld(e);
  }
  var $s = null;
  function ld(e) {
    if ($s = null, e = mt(e), e !== null) {
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
    return $s = e, null;
  }
  function w0(e) {
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
          case Ct:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var id = !1, Cl = null, Ml = null, Tl = null, Wr = /* @__PURE__ */ new Map(), eo = /* @__PURE__ */ new Map(), Rl = [], Aw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function E0(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Cl = null;
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
        Wr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        eo.delete(n.pointerId);
    }
  }
  function to(e, n, l, r, c, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: n,
      domEventName: l,
      eventSystemFlags: r,
      nativeEvent: d,
      targetContainers: [c]
    }, n !== null && (n = We(n), n !== null && x0(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), e);
  }
  function Dw(e, n, l, r, c) {
    switch (n) {
      case "focusin":
        return Cl = to(
          Cl,
          e,
          n,
          l,
          r,
          c
        ), !0;
      case "dragenter":
        return Ml = to(
          Ml,
          e,
          n,
          l,
          r,
          c
        ), !0;
      case "mouseover":
        return Tl = to(
          Tl,
          e,
          n,
          l,
          r,
          c
        ), !0;
      case "pointerover":
        var d = c.pointerId;
        return Wr.set(
          d,
          to(
            Wr.get(d) || null,
            e,
            n,
            l,
            r,
            c
          )
        ), !0;
      case "gotpointercapture":
        return d = c.pointerId, eo.set(
          d,
          to(
            eo.get(d) || null,
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
  function _0(e) {
    var n = mt(e.target);
    if (n !== null) {
      var l = u(n);
      if (l !== null) {
        if (n = l.tag, n === 13) {
          if (n = f(l), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              S0(l);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(l), n !== null) {
            e.blockedOn = n, he(e.priority, function() {
              S0(l);
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
  function Xs(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var l = ad(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var r = new l.constructor(
          l.type,
          l
        );
        ac = r, l.target.dispatchEvent(r), ac = null;
      } else
        return n = We(l), n !== null && x0(n), e.blockedOn = l, !1;
      n.shift();
    }
    return !0;
  }
  function N0(e, n, l) {
    Xs(e) && l.delete(n);
  }
  function zw() {
    id = !1, Cl !== null && Xs(Cl) && (Cl = null), Ml !== null && Xs(Ml) && (Ml = null), Tl !== null && Xs(Tl) && (Tl = null), Wr.forEach(N0), eo.forEach(N0);
  }
  function Zs(e, n) {
    e.blockedOn === n && (e.blockedOn = null, id || (id = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      zw
    )));
  }
  var Qs = null;
  function C0(e) {
    Qs !== e && (Qs = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Qs === e && (Qs = null);
        for (var n = 0; n < e.length; n += 3) {
          var l = e[n], r = e[n + 1], c = e[n + 2];
          if (typeof r != "function") {
            if (ld(r || l) === null)
              continue;
            break;
          }
          var d = We(l);
          d !== null && (e.splice(n, 3), n -= 3, nf(
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
  function Ii(e) {
    function n(k) {
      return Zs(k, e);
    }
    Cl !== null && Zs(Cl, e), Ml !== null && Zs(Ml, e), Tl !== null && Zs(Tl, e), Wr.forEach(n), eo.forEach(n);
    for (var l = 0; l < Rl.length; l++) {
      var r = Rl[l];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Rl.length && (l = Rl[0], l.blockedOn === null); )
      _0(l), l.blockedOn === null && Rl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (r = 0; r < l.length; r += 3) {
        var c = l[r], d = l[r + 1], b = c[xe] || null;
        if (typeof d == "function")
          b || C0(l);
        else if (b) {
          var N = null;
          if (d && d.hasAttribute("formAction")) {
            if (c = d, b = d[xe] || null)
              N = b.formAction;
            else if (ld(c) !== null) continue;
          } else N = b.action;
          typeof N == "function" ? l[r + 1] = N : (l.splice(r, 3), r -= 3), C0(l);
        }
      }
  }
  function M0() {
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
  function rd(e) {
    this._internalRoot = e;
  }
  Is.prototype.render = rd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    var l = n.current, r = Ln();
    v0(l, r, e, n, null, null);
  }, Is.prototype.unmount = rd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      v0(e.current, 2, null, e, null, null), Ts(), n[be] = null;
    }
  };
  function Is(e) {
    this._internalRoot = e;
  }
  Is.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = de();
      e = { blockedOn: null, target: e, priority: n };
      for (var l = 0; l < Rl.length && n !== 0 && n < Rl[l].priority; l++) ;
      Rl.splice(l, 0, e), l === 0 && _0(e);
    }
  };
  var T0 = a.version;
  if (T0 !== "19.2.7")
    throw Error(
      o(
        527,
        T0,
        "19.2.7"
      )
    );
  O.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = g(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var jw = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ks = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ks.isDisabled && Ks.supportsFiber)
      try {
        Nn = Ks.inject(
          jw
        ), $t = Ks;
      } catch {
      }
  }
  return ao.createRoot = function(e, n) {
    if (!s(e)) throw Error(o(299));
    var l = !1, r = "", c = Lg, d = Hg, b = Bg;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError)), n = p0(
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
      M0
    ), e[be] = n.current, Yf(e), new rd(n);
  }, ao.hydrateRoot = function(e, n, l) {
    if (!s(e)) throw Error(o(299));
    var r = !1, c = "", d = Lg, b = Hg, N = Bg, k = null;
    return l != null && (l.unstable_strictMode === !0 && (r = !0), l.identifierPrefix !== void 0 && (c = l.identifierPrefix), l.onUncaughtError !== void 0 && (d = l.onUncaughtError), l.onCaughtError !== void 0 && (b = l.onCaughtError), l.onRecoverableError !== void 0 && (N = l.onRecoverableError), l.formState !== void 0 && (k = l.formState)), n = p0(
      e,
      1,
      !0,
      n,
      l ?? null,
      r,
      c,
      k,
      d,
      b,
      N,
      M0
    ), n.context = y0(null), l = n.current, r = Ln(), r = I(r), c = ml(r), c.callback = null, gl(l, c, r), l = r, n.current.lanes = l, rt(n, l), Sa(n), e[be] = n.current, Yf(e), new Is(n);
  }, ao.version = "19.2.7", ao;
}
var U0;
function $w() {
  if (U0) return ud.exports;
  U0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), ud.exports = qw(), ud.exports;
}
var Xw = $w();
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
var Fv = (t) => {
  throw TypeError(t);
}, Jv = (t, a, i) => a.has(t) || Fv("Cannot " + i), Fn = (t, a, i) => (Jv(t, a, "read from private field"), i ? i.call(t) : a.get(t)), co = (t, a, i) => a.has(t) ? Fv("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i), wa = (t, a, i, o) => (Jv(t, a, "write to private field"), a.set(t, i), i), Bu = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i, dh = /^[\\/]{2}/;
function Pv(t, a) {
  return a + t.replace(/\\/g, "/");
}
function k0(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function Zw(t = {}) {
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
  function y(x, S = null, R, T) {
    let M = Yd(
      s ? g().pathname : "/",
      x,
      S,
      R,
      T
    );
    return Ht(
      M.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), M;
  }
  function m(x) {
    return typeof x == "string" ? x : Ta(x);
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
      let R = k0(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, R), o && h && h({ action: f, location: R, delta: 1 });
    },
    replace(x, S) {
      f = "REPLACE";
      let R = k0(x) ? x : y(x, S);
      s[u] = R, o && h && h({ action: f, location: R, delta: 0 });
    },
    go(x) {
      f = "POP";
      let S = p(u + x), R = s[S];
      u = S, h && h({ action: f, location: R, delta: x });
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
function Qw() {
  return Math.random().toString(36).substring(2, 10);
}
function Yd(t, a, i = null, o, s) {
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
    key: a && a.key || o || Qw(),
    mask: s
  };
}
function Ta({
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
function Iw(t, a, i = !1) {
  let o = "http://localhost";
  t && (o = t.location.origin !== "null" ? t.location.origin : t.location.href), Ge(o, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ta(a);
  return s = s.replace(/ $/, "%20"), !i && dh.test(s) && (s = o + s), new URL(s, o);
}
var fo, V0 = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (co(this, fo, /* @__PURE__ */ new Map()), t)
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
    if (Fn(this, fo).has(t))
      return Fn(this, fo).get(t);
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
    Fn(this, fo).set(t, a);
  }
};
fo = /* @__PURE__ */ new WeakMap();
var Kw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function Fw(t) {
  return Kw.has(
    t
  );
}
var Jw = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function Pw(t) {
  return Jw.has(
    t
  );
}
function Ww(t) {
  return t.index === !0;
}
function bo(t, a, i = [], o = {}, s = !1) {
  return t.map((u, f) => {
    let h = [...i, String(f)], p = typeof u.id == "string" ? u.id : h.join("-");
    if (Ge(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ge(
      s || !o[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), Ww(u)) {
      let g = {
        ...u,
        id: p
      };
      return o[p] = Y0(
        g,
        a(g)
      ), g;
    } else {
      let g = {
        ...u,
        id: p,
        children: void 0
      };
      return o[p] = Y0(
        g,
        a(g)
      ), u.children && (g.children = bo(
        u.children,
        a,
        h,
        o,
        s
      )), g;
    }
  });
}
function Y0(t, a) {
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
function Wv(t, a, i = "/") {
  return sa(t, a, i, !1);
}
function sa(t, a, i, o, s) {
  let u = typeof a == "string" ? ma(a) : a, f = Wn(u.pathname || "/", i);
  if (f == null)
    return null;
  let h = s ?? hu(t), p = null, g = fE(f);
  for (let y = 0; p == null && y < h.length; ++y)
    p = cE(
      h[y],
      g,
      o
    );
  return p;
}
function eE(t, a) {
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
function hu(t) {
  let a = eb(t);
  return tE(a), a;
}
function eb(t, a = [], i = [], o = "", s = !1) {
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
    ), eb(
      f.children,
      a,
      v,
      m,
      p
    )), !(f.path == null && !f.index) && a.push({
      path: m,
      score: sE(m, f.index),
      routesMeta: v.map((x, S) => {
        let [R, T] = ab(
          x.relativePath,
          x.caseSensitive,
          S === v.length - 1
        );
        return {
          ...x,
          matcher: R,
          compiledParams: T
        };
      })
    });
  };
  return t.forEach((f, h) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, h);
    else
      for (let p of tb(f.path))
        u(f, h, !0, p);
  }), a;
}
function tb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...o] = a, s = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [u, ""] : [u];
  let f = tb(o.join("/")), h = [];
  return h.push(
    ...f.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && h.push(...f), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function tE(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : uE(
      a.routesMeta.map((o) => o.childrenIndex),
      i.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var nE = /^:[\w-]+$/, aE = 3, lE = 2, iE = 1, rE = 10, oE = -2, G0 = (t) => t === "*";
function sE(t, a) {
  let i = t.split("/"), o = i.length;
  return i.some(G0) && (o += oE), a && (o += lE), i.filter((s) => !G0(s)).reduce(
    (s, u) => s + (nE.test(u) ? aE : u === "" ? iE : rE),
    o
  );
}
function uE(t, a) {
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
function cE(t, a, i = !1) {
  let { routesMeta: o } = t, s = {}, u = "/", f = [];
  for (let h = 0; h < o.length; ++h) {
    let p = o[h], g = h === o.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", m = {
      path: p.relativePath,
      caseSensitive: p.caseSensitive,
      end: g
    }, v = (
      // Use precomputed matcher if it exists
      p.matcher && p.compiledParams ? nb(
        m,
        y,
        p.matcher,
        p.compiledParams
      ) : _u(m, y)
    ), x = p.route;
    if (!v && g && i && !o[o.length - 1].route.index && (v = _u(
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
      pathnameBase: mE(
        Pn([u, v.pathnameBase])
      ),
      route: x
    }), v.pathnameBase !== "/" && (u = Pn([u, v.pathnameBase]));
  }
  return f;
}
function _u(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, o] = ab(
    t.path,
    t.caseSensitive,
    t.end
  );
  return nb(t, a, i, o);
}
function nb(t, a, i, o) {
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
function ab(t, a = !1, i = !0) {
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
function fE(t) {
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
function dE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Pn([t, a]);
}
var hh = (t) => Bu.test(t);
function hE(t, a = "/") {
  let {
    pathname: i,
    search: o = "",
    hash: s = ""
  } = typeof t == "string" ? ma(t) : t, u;
  return i ? (i = gh(i), i.startsWith("/") ? u = q0(i.substring(1), "/") : u = q0(i, a)) : u = a, {
    pathname: u,
    search: gE(o),
    hash: pE(s)
  };
}
function q0(t, a) {
  let i = Nu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? i.length > 1 && i.pop() : s !== "." && i.push(s);
  }), i.length > 1 ? i.join("/") : "/";
}
function hd(t, a, i, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function lb(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function mh(t) {
  let a = lb(t);
  return a.map(
    (i, o) => o === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Uu(t, a, i, o = !1) {
  let s;
  typeof t == "string" ? s = ma(t) : (s = { ...t }, Ge(
    !s.pathname || !s.pathname.includes("?"),
    hd("?", "pathname", "search", s)
  ), Ge(
    !s.pathname || !s.pathname.includes("#"),
    hd("#", "pathname", "hash", s)
  ), Ge(
    !s.search || !s.search.includes("#"),
    hd("#", "search", "hash", s)
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
  let p = hE(s, h), g = f && f !== "/" && f.endsWith("/"), y = (u || f === ".") && i.endsWith("/");
  return !p.pathname.endsWith("/") && (g || y) && (p.pathname += "/"), p;
}
var gh = (t) => t.replace(/[\\/]{2,}/g, "/"), Pn = (t) => gh(t.join("/")), Nu = (t) => t.replace(/\/+$/, ""), mE = (t) => Nu(t).replace(/^\/*/, "/"), gE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, pE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, $0 = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let o = new Headers(i.headers);
  return o.set("Location", t), new Response(null, { ...i, headers: o });
}, ku = class {
  constructor(t, a, i, o = !1) {
    this.status = t, this.statusText = a || "", this.internal = o, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function xo(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function Do(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Pn(a) || "/";
}
var ib = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function rb(t, a) {
  let i = t;
  if (typeof i != "string" || !Bu.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let o = i, s = !1;
  if (ib)
    try {
      let u = new URL(window.location.href), f = dh.test(i) ? new URL(Pv(i, u.protocol)) : new URL(i), h = Wn(f.pathname, a);
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
var Hl = Symbol("Uninstrumented");
function yE(t, a) {
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
    let s = Wi(i.lazy, a.lazy, () => {
    });
    s && (o.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = s[u], h = i[`lazy.${u}`];
      if (typeof f == "function" && h.length > 0) {
        let p = Wi(h, f, () => {
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
      let f = u[Hl] ?? u, h = Wi(
        i[s],
        f,
        (...p) => X0(p[0])
      );
      h && (s === "loader" && f.hydrate === !0 && (h.hydrate = !0), h[Hl] = f, o[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (o.middleware = a.middleware.map((s) => {
    let u = s[Hl] ?? s, f = Wi(
      i.middleware,
      u,
      (...h) => X0(h[0])
    );
    return f ? (f[Hl] = u, f) : s;
  })), o;
}
function vE(t, a) {
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
    let o = t.navigate[Hl] ?? t.navigate, s = Wi(
      i.navigate,
      o,
      (...u) => {
        let [f, h] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Ta(f) : ".",
          ...Z0(t, h ?? {})
        };
      }
    );
    s && (s[Hl] = o, t.navigate = s);
  }
  if (i.fetch.length > 0) {
    let o = t.fetch[Hl] ?? t.fetch, s = Wi(i.fetch, o, (...u) => {
      let [f, , h, p] = u;
      return {
        href: h ?? ".",
        fetcherKey: f,
        ...Z0(t, p ?? {})
      };
    });
    s && (s[Hl] = o, t.fetch = s);
  }
  return t;
}
function Wi(t, a, i) {
  return t.length === 0 ? null : async (...o) => {
    let s = await ob(
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
async function ob(t, a, i, o) {
  let s = t[o], u;
  if (s) {
    let f, h = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = ob(t, a, i, o - 1), u = await f, Ge(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function X0(t) {
  let { request: a, context: i, params: o, pattern: s } = t;
  return {
    request: bE(a),
    params: { ...o },
    pattern: s,
    context: xE(i)
  };
}
function Z0(t, a) {
  return {
    currentUrl: Ta(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function bE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function xE(t) {
  if (wE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var SE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function wE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === SE;
}
var sb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], EE = new Set(
  sb
), _E = [
  "GET",
  ...sb
], NE = new Set(_E), ub = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), CE = /* @__PURE__ */ new Set([307, 308]), md = {
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
}, ME = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, lo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, TE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), cb = "remix-router-transitions", fb = Symbol("ResetLoaderData"), ti, Fi, jl, Ji, RE = class {
  constructor(t) {
    co(this, ti), co(this, Fi), co(this, jl), co(this, Ji), wa(this, ti, t), wa(this, Fi, hu(t));
  }
  /** The stable route tree */
  get stableRoutes() {
    return Fn(this, ti);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return Fn(this, jl) ?? Fn(this, ti);
  }
  /** Pre-computed branches */
  get branches() {
    return Fn(this, Ji) ?? Fn(this, Fi);
  }
  get hasHMRRoutes() {
    return Fn(this, jl) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    wa(this, ti, t), wa(this, Fi, hu(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    wa(this, jl, t), wa(this, Ji, hu(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Fn(this, jl) && (wa(this, ti, Fn(this, jl)), wa(this, Fi, Fn(this, Ji)), wa(this, jl, void 0), wa(this, Ji, void 0));
  }
};
ti = /* @__PURE__ */ new WeakMap();
Fi = /* @__PURE__ */ new WeakMap();
jl = /* @__PURE__ */ new WeakMap();
Ji = /* @__PURE__ */ new WeakMap();
function AE(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ge(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o = t.hydrationRouteProperties || [], s = t.mapRouteProperties || TE, u = s;
  if (t.instrumentations) {
    let H = t.instrumentations;
    u = (I) => ({
      ...s(I),
      ...yE(
        H.map((W) => W.route).filter(Boolean),
        I
      )
    });
  }
  let f = {}, h = new RE(
    bo(
      t.routes,
      u,
      void 0,
      f
    )
  ), p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let g = t.dataStrategy || LE, y = {
    ...t.future
  }, m = null, v = /* @__PURE__ */ new Set(), x = null, S = null, R = null, T = null, M = t.hydrationData != null, L = sa(
    h.activeRoutes,
    t.history.location,
    p,
    !1,
    h.branches
  ), _ = !1, z = null, Y, B;
  if (L == null && !t.patchRoutesOnNavigation) {
    let H = Jn(404, {
      pathname: t.history.location.pathname
    }), { matches: I, route: W } = Fs(h.activeRoutes);
    Y = !0, B = !Y, L = I, z = { [W.id]: H };
  } else if (L && !t.hydrationData && fn(
    L,
    h.activeRoutes,
    t.history.location.pathname
  ).active && (L = null), L)
    if (L.some((H) => H.route.lazy))
      Y = !1, B = !Y;
    else if (!L.some((H) => ph(H.route)))
      Y = !0, B = !Y;
    else {
      let H = t.hydrationData ? t.hydrationData.loaderData : null, I = t.hydrationData ? t.hydrationData.errors : null, W = L;
      if (I) {
        let de = L.findIndex(
          (he) => I[he.route.id] !== void 0
        );
        W = W.slice(0, de + 1);
      }
      B = !1, Y = !0, W.forEach((de) => {
        let he = db(de.route, H, I);
        B = B || he.renderFallback, Y = Y && !he.shouldLoad;
      });
    }
  else {
    Y = !1, B = !Y, L = [];
    let H = fn(
      null,
      h.activeRoutes,
      t.history.location.pathname
    );
    H.active && H.matches && (_ = !0, L = H.matches);
  }
  let U, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: L,
    initialized: Y,
    renderFallback: B,
    navigation: md,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || z,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, K = "POP", J = null, G = !1, Q, re = !1, j = /* @__PURE__ */ new Map(), Z = null, C = !1, O = !1, q = /* @__PURE__ */ new Set(), $ = /* @__PURE__ */ new Map(), ne = 0, D = -1, V = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Set(), ge = /* @__PURE__ */ new Map(), ee, pe = null;
  function ze() {
    if (m = t.history.listen(
      ({ action: H, location: I, delta: W }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        Ht(
          ge.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = Vn({
          currentLocation: A.location,
          nextLocation: I,
          historyAction: H
        });
        if (de && W != null) {
          let he = new Promise((Ee) => {
            ee = Ee;
          });
          t.history.go(W * -1), Cn(de, {
            state: "blocked",
            location: I,
            proceed() {
              Cn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: I
              }), he.then(() => t.history.go(W));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(de, lo), Se({ blockers: Ee });
            }
          }), J?.resolve(), J = null;
          return;
        }
        return it(H, I);
      }
    ), i) {
      e_(a, j);
      let H = () => t_(a, j);
      a.addEventListener("pagehide", H), Z = () => a.removeEventListener("pagehide", H);
    }
    return A.initialized || it("POP", A.location, {
      initialHydration: !0
    }), U;
  }
  function Ae() {
    m && m(), Z && Z(), v.clear(), Q && Q.abort(), A.fetchers.forEach((H, I) => Nn(A.fetchers, I)), A.blockers.forEach((H, I) => ta(I));
  }
  function we(H) {
    if (v.add(H), x) {
      let { newErrors: I } = x;
      x = null, H(A, {
        deletedFetchers: [],
        newErrors: I,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(H);
  }
  function Se(H, I = {}) {
    H.matches && (H.matches = H.matches.map((he) => {
      let Ee = f[he.route.id], ve = he.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...he,
        route: Ee
      } : he;
    })), A = {
      ...A,
      ...H
    };
    let W = [], de = [];
    A.fetchers.forEach((he, Ee) => {
      he.state === "idle" && (me.has(Ee) ? W.push(Ee) : de.push(Ee));
    }), me.forEach((he) => {
      !A.fetchers.has(he) && !$.has(he) && W.push(he);
    }), v.size === 0 && (x = { newErrors: H.errors ?? null }), [...v].forEach(
      (he) => he(A, {
        deletedFetchers: W,
        newErrors: H.errors ?? null,
        viewTransitionOpts: I.viewTransitionOpts,
        flushSync: I.flushSync === !0
      })
    ), W.forEach((he) => Nn(A.fetchers, he)), de.forEach((he) => A.fetchers.delete(he));
  }
  function De(H, I, { flushSync: W } = {}) {
    let de = A.actionData != null && A.navigation.formMethod != null && cn(A.navigation.formMethod) && A.navigation.state === "loading" && H.state?._isRedirect !== !0, he;
    I.actionData ? Object.keys(I.actionData).length > 0 ? he = I.actionData : he = null : de ? he = A.actionData : he = null;
    let Ee = I.loaderData ? ny(
      A.loaderData,
      I.loaderData,
      I.matches || [],
      I.errors
    ) : A.loaderData, ve = A.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((Me, Be) => ve.set(Be, lo)));
    let xe = C ? !1 : jt(H, I.matches || A.matches), be = G === !0 || A.navigation.formMethod != null && cn(A.navigation.formMethod) && H.state?._isRedirect !== !0;
    h.commitHmrRoutes(), C || K === "POP" || (K === "PUSH" ? t.history.push(H, H.state) : K === "REPLACE" && t.history.replace(H, H.state));
    let Ce;
    if (K === "POP") {
      let Me = j.get(A.location.pathname);
      Me && Me.has(H.pathname) ? Ce = {
        currentLocation: A.location,
        nextLocation: H
      } : j.has(H.pathname) && (Ce = {
        currentLocation: H,
        nextLocation: A.location
      });
    } else if (re) {
      let Me = j.get(A.location.pathname);
      Me ? Me.add(H.pathname) : (Me = /* @__PURE__ */ new Set([H.pathname]), j.set(A.location.pathname, Me)), Ce = {
        currentLocation: A.location,
        nextLocation: H
      };
    }
    Se(
      {
        ...I,
        // matches, errors, fetchers go through as-is
        actionData: he,
        loaderData: Ee,
        historyAction: K,
        location: H,
        initialized: !0,
        renderFallback: !1,
        navigation: md,
        revalidation: "idle",
        restoreScrollPosition: xe,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Ce,
        flushSync: W === !0
      }
    ), K = "POP", G = !1, re = !1, C = !1, O = !1, J?.resolve(), J = null, pe?.resolve(), pe = null;
  }
  async function qe(H, I) {
    if (J?.resolve(), J = null, typeof H == "number") {
      J || (J = ry());
      let Je = J.promise;
      return t.history.go(H), Je;
    }
    let W = Gd(
      A.location,
      A.matches,
      p,
      H,
      I?.fromRouteId,
      I?.relative
    ), { path: de, submission: he, error: Ee } = Q0(
      !1,
      W,
      I
    ), ve;
    I?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof I.mask == "string" ? ma(I.mask) : {
        ...A.location.mask,
        ...I.mask
      }
    });
    let xe = A.location, be = Yd(
      xe,
      de,
      I && I.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...t.history.encodeLocation(be)
    };
    let Ce = I && I.replace != null ? I.replace : void 0, Me = "PUSH";
    Ce === !0 ? Me = "REPLACE" : Ce === !1 || he != null && cn(he.formMethod) && he.formAction === A.location.pathname + A.location.search && (Me = "REPLACE");
    let Be = I && "preventScrollReset" in I ? I.preventScrollReset === !0 : void 0, je = (I && I.flushSync) === !0, Ye = Vn({
      currentLocation: xe,
      nextLocation: be,
      historyAction: Me
    });
    if (Ye) {
      Cn(Ye, {
        state: "blocked",
        location: be,
        proceed() {
          Cn(Ye, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), qe(H, I);
        },
        reset() {
          let Je = new Map(A.blockers);
          Je.set(Ye, lo), Se({ blockers: Je });
        }
      });
      return;
    }
    await it(Me, be, {
      submission: he,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Be,
      replace: I && I.replace,
      enableViewTransition: I && I.viewTransition,
      flushSync: je,
      callSiteDefaultShouldRevalidate: I && I.defaultShouldRevalidate
    });
  }
  function nt() {
    pe || (pe = ry()), qt(), Se({ revalidation: "loading" });
    let H = pe.promise;
    return A.navigation.state === "submitting" ? H : A.navigation.state === "idle" ? (it(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), H) : (it(
      K || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: re === !0
      }
    ), H);
  }
  async function it(H, I, W) {
    Q && Q.abort(), Q = null, K = H, C = (W && W.startUninterruptedRevalidation) === !0, Rt(A.location, A.matches), G = (W && W.preventScrollReset) === !0, re = (W && W.enableViewTransition) === !0;
    let de = h.activeRoutes, he = W?.initialHydration && A.matches && A.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : sa(
      de,
      I,
      p,
      !1,
      h.branches
    ), Ee = (W && W.flushSync) === !0;
    if (he && A.initialized && !O && $E(A.location, I) && !(W && W.submission && cn(W.submission.formMethod))) {
      De(I, { matches: he }, { flushSync: Ee });
      return;
    }
    let ve = fn(he, de, I.pathname);
    if (ve.active && ve.matches && (he = ve.matches), !he) {
      let { error: We, notFoundMatches: Ze, route: Tt } = on(
        I.pathname
      );
      De(
        I,
        {
          matches: Ze,
          loaderData: {},
          errors: {
            [Tt.id]: We
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
    Q = new AbortController();
    let be = Pi(
      t.history,
      I,
      Q.signal,
      W && W.submission
    ), Ce = t.getContext ? await t.getContext() : new V0(), Me;
    if (W && W.pendingError)
      Me = [
        Ol(he).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && cn(W.submission.formMethod)) {
      let We = await Ft(
        be,
        I,
        W.submission,
        he,
        H,
        Ce,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (We.shortCircuited)
        return;
      if (We.pendingActionResult) {
        let [Ze, Tt] = We.pendingActionResult;
        if (Hn(Tt) && xo(Tt.error) && Tt.error.status === 404) {
          Q = null, De(I, {
            matches: We.matches,
            loaderData: {},
            errors: {
              [Ze]: Tt.error
            }
          });
          return;
        }
      }
      he = We.matches || he, Me = We.pendingActionResult, xe = gd(
        I,
        he,
        H,
        W.submission
      ), Ee = !1, ve.active = !1, be = Pi(
        t.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Be,
      matches: je,
      loaderData: Ye,
      errors: Je,
      workingFetchers: mt
    } = await pt(
      be,
      I,
      he,
      H,
      Ce,
      ve.active,
      xe,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      Me,
      W && W.callSiteDefaultShouldRevalidate
    );
    Be || (Q = null, De(I, {
      matches: je || he,
      ...ay(Me),
      loaderData: Ye,
      errors: Je,
      ...mt ? { fetchers: mt } : {}
    }));
  }
  async function Ft(H, I, W, de, he, Ee, ve, xe, be = {}) {
    qt();
    let Ce = PE(
      I,
      de,
      he,
      W
    );
    if (Se({ navigation: Ce }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await rt(
        de,
        I.pathname,
        H.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: Je, route: mt } = Fs(
            h.activeRoutes
          );
          return {
            matches: Je,
            pendingActionResult: [
              mt.id,
              {
                type: "error",
                error: je.error
              }
            ]
          };
        }
        let Ye = Ol(je.partialMatches).route.id;
        return {
          matches: je.partialMatches,
          pendingActionResult: [
            Ye,
            {
              type: "error",
              error: je.error
            }
          ]
        };
      } else if (je.matches)
        de = je.matches;
      else {
        let { notFoundMatches: Ye, error: Je, route: mt } = on(
          I.pathname
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
    let Me, Be = mu(de, I);
    if (!Be.route.action && !Be.route.lazy)
      Me = {
        type: "error",
        error: Jn(405, {
          method: H.method,
          pathname: I.pathname,
          routeId: Be.route.id
        })
      };
    else {
      let je = nr(
        u,
        f,
        H,
        I,
        de,
        Be,
        xe ? [] : o,
        Ee
      ), Ye = await Nt(
        H,
        I,
        je,
        Ee,
        null
      );
      if (Me = Ye[Be.route.id], !Me) {
        for (let Je of de)
          if (Ye[Je.route.id]) {
            Me = Ye[Je.route.id];
            break;
          }
      }
      if (H.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (ai(Me)) {
      let je;
      return be && be.replace != null ? je = be.replace : je = W0(
        Me.response.headers.get("Location"),
        new URL(H.url),
        p,
        t.history
      ) === A.location.pathname + A.location.search, await _t(H, Me, !0, {
        submission: W,
        replace: je
      }), { shortCircuited: !0 };
    }
    if (Hn(Me)) {
      let je = Ol(de, Be.route.id);
      return (be && be.replace) !== !0 && (K = "PUSH"), {
        matches: de,
        pendingActionResult: [
          je.route.id,
          Me,
          Be.route.id
        ]
      };
    }
    return {
      matches: de,
      pendingActionResult: [Be.route.id, Me]
    };
  }
  async function pt(H, I, W, de, he, Ee, ve, xe, be, Ce, Me, Be, je, Ye) {
    let Je = ve || gd(I, W, de, xe), mt = xe || be || iy(Je), We = !C && !Me;
    if (Ee) {
      if (We) {
        let st = Gt(je);
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
        I.pathname,
        H.signal
      );
      if (He.type === "aborted")
        return { shortCircuited: !0 };
      if (He.type === "error") {
        if (He.partialMatches.length === 0) {
          let { matches: dn, route: Tn } = Fs(
            h.activeRoutes
          );
          return {
            matches: dn,
            loaderData: {},
            errors: {
              [Tn.id]: He.error
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
        let { error: st, notFoundMatches: dn, route: Tn } = on(
          I.pathname
        );
        return {
          matches: dn,
          loaderData: {},
          errors: {
            [Tn.id]: st
          }
        };
      }
    }
    let Ze = h.activeRoutes, { dsMatches: Tt, revalidatingFetchers: Ke } = I0(
      H,
      he,
      u,
      f,
      t.history,
      A,
      W,
      mt,
      I,
      Me ? [] : o,
      Me === !0,
      O,
      q,
      me,
      le,
      F,
      Ze,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      je,
      Ye
    );
    if (D = ++ne, !t.dataStrategy && !Tt.some((He) => He.shouldLoad) && !Tt.some(
      (He) => He.route.middleware && He.route.middleware.length > 0
    ) && Ke.length === 0) {
      let He = new Map(A.fetchers), st = al(He);
      return De(
        I,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: je && Hn(je[1]) ? { [je[0]]: je[1].error } : null,
          ...ay(je),
          ...st ? { fetchers: He } : {}
        },
        { flushSync: Be }
      ), { shortCircuited: !0 };
    }
    if (We) {
      let He = {};
      if (!Ee) {
        He.navigation = Je;
        let st = Gt(je);
        st !== void 0 && (He.actionData = st);
      }
      Ke.length > 0 && (He.fetchers = Jt(Ke)), Se(He, { flushSync: Be });
    }
    Ke.forEach((He) => {
      Mt(He.key), He.controller && $.set(He.key, He.controller);
    });
    let ya = () => Ke.forEach((He) => Mt(He.key));
    Q && Q.signal.addEventListener(
      "abort",
      ya
    );
    let { loaderResults: Mn, fetcherResults: sn } = await Pt(
      Tt,
      Ke,
      H,
      I,
      he
    );
    if (H.signal.aborted)
      return { shortCircuited: !0 };
    Q && Q.signal.removeEventListener(
      "abort",
      ya
    ), Ke.forEach((He) => $.delete(He.key));
    let en = Js(Mn);
    if (en)
      return await _t(H, en.result, !0, {
        replace: Ce
      }), { shortCircuited: !0 };
    if (en = Js(sn), en)
      return F.add(en.key), await _t(H, en.result, !0, {
        replace: Ce
      }), { shortCircuited: !0 };
    let gn = new Map(A.fetchers), { loaderData: ll, errors: pn } = ty(
      A,
      W,
      Mn,
      je,
      Ke,
      sn,
      gn
    );
    Me && A.errors && (pn = { ...A.errors, ...pn });
    let il = al(gn), aa = pa(
      D,
      gn
    ), la = il || aa || Ke.length > 0;
    return {
      matches: W,
      loaderData: ll,
      errors: pn,
      ...la ? { workingFetchers: gn } : {}
    };
  }
  function Gt(H) {
    if (H && !Hn(H[1]))
      return {
        [H[0]]: H[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function Jt(H) {
    let I = new Map(A.fetchers);
    return H.forEach((W) => {
      let de = I.get(W.key), he = io(
        void 0,
        de ? de.data : void 0
      );
      I.set(W.key, he);
    }), I;
  }
  async function Et(H, I, W, de) {
    Mt(H);
    let he = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = Gd(
      A.location,
      A.matches,
      p,
      W,
      I,
      de?.relative
    ), xe = sa(
      Ee,
      ve,
      p,
      !1,
      h.branches
    ), be = fn(xe, Ee, ve);
    if (be.active && be.matches && (xe = be.matches), !xe) {
      Ct(
        H,
        I,
        Jn(404, { pathname: ve }),
        { flushSync: he }
      );
      return;
    }
    let { path: Ce, submission: Me, error: Be } = Q0(
      !0,
      ve,
      de
    );
    if (Be) {
      Ct(H, I, Be, { flushSync: he });
      return;
    }
    let je = t.getContext ? await t.getContext() : new V0(), Ye = (de && de.preventScrollReset) === !0;
    if (Me && cn(Me.formMethod)) {
      await Qt(
        H,
        I,
        Ce,
        xe,
        je,
        be.active,
        he,
        Ye,
        Me,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    le.set(H, { routeId: I, path: Ce }), await yt(
      H,
      I,
      Ce,
      xe,
      je,
      be.active,
      he,
      Ye,
      Me
    );
  }
  async function Qt(H, I, W, de, he, Ee, ve, xe, be, Ce) {
    qt(), le.delete(H);
    let Me = A.fetchers.get(H);
    Wt(H, WE(be, Me), {
      flushSync: ve
    });
    let Be = new AbortController(), je = Pi(
      t.history,
      W,
      Be.signal,
      be
    );
    if (Ee) {
      let at = await rt(
        de,
        new URL(je.url).pathname,
        je.signal,
        H
      );
      if (at.type === "aborted")
        return;
      if (at.type === "error") {
        Ct(H, I, at.error, { flushSync: ve });
        return;
      } else if (at.matches)
        de = at.matches;
      else {
        Ct(
          H,
          I,
          Jn(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ye = mu(de, W);
    if (!Ye.route.action && !Ye.route.lazy) {
      let at = Jn(405, {
        method: be.formMethod,
        pathname: W,
        routeId: I
      });
      Ct(H, I, at, { flushSync: ve });
      return;
    }
    $.set(H, Be);
    let Je = ne, mt = nr(
      u,
      f,
      je,
      W,
      de,
      Ye,
      o,
      he
    ), We = await Nt(
      je,
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
    if (je.signal.aborted) {
      $.get(H) === Be && $.delete(H);
      return;
    }
    if (me.has(H)) {
      if (ai(Ze) || Hn(Ze)) {
        Wt(H, _a(void 0));
        return;
      }
    } else {
      if (ai(Ze))
        if ($.delete(H), D > Je) {
          Wt(H, _a(void 0));
          return;
        } else
          return F.add(H), Wt(H, io(be)), _t(je, Ze, !1, {
            fetcherSubmission: be,
            preventScrollReset: xe
          });
      if (Hn(Ze)) {
        Ct(H, I, Ze.error);
        return;
      }
    }
    let Tt = A.navigation.location || A.location, Ke = Pi(
      t.history,
      Tt,
      Be.signal
    ), ya = h.activeRoutes, Mn = A.navigation.state !== "idle" ? sa(
      ya,
      A.navigation.location,
      p,
      !1,
      h.branches
    ) : A.matches;
    Ge(Mn, "Didn't find any matches after fetcher action");
    let sn = ++ne;
    V.set(H, sn);
    let { dsMatches: en, revalidatingFetchers: gn } = I0(
      Ke,
      he,
      u,
      f,
      t.history,
      A,
      Mn,
      be,
      Tt,
      o,
      !1,
      O,
      q,
      me,
      le,
      F,
      ya,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      [Ye.route.id, Ze],
      Ce
    ), ll = io(be, Ze.data), pn = new Map(A.fetchers);
    pn.set(H, ll), gn.filter((at) => at.key !== H).forEach((at) => {
      let Yn = at.key, tn = pn.get(Yn), Ul = io(
        void 0,
        tn ? tn.data : void 0
      );
      pn.set(Yn, Ul), Mt(Yn), at.controller && $.set(Yn, at.controller);
    }), Se({ fetchers: pn });
    let il = () => gn.forEach((at) => Mt(at.key));
    Be.signal.addEventListener(
      "abort",
      il
    );
    let { loaderResults: aa, fetcherResults: la } = await Pt(
      en,
      gn,
      Ke,
      Tt,
      he
    );
    if (Be.signal.aborted)
      return;
    Be.signal.removeEventListener(
      "abort",
      il
    ), V.delete(H), $.delete(H), gn.forEach((at) => $.delete(at.key));
    let He = A.fetchers.has(H), st = (at) => {
      if (!He) return at;
      let Yn = new Map(at.fetchers);
      return Yn.set(H, _a(Ze.data)), { ...at, fetchers: Yn };
    }, dn = Js(aa);
    if (dn)
      return A = st(A), _t(
        Ke,
        dn.result,
        !1,
        { preventScrollReset: xe }
      );
    if (dn = Js(la), dn)
      return F.add(dn.key), A = st(A), _t(
        Ke,
        dn.result,
        !1,
        { preventScrollReset: xe }
      );
    let Tn = new Map(A.fetchers);
    He && Tn.set(H, _a(Ze.data));
    let { loaderData: rl, errors: Da } = ty(
      A,
      Mn,
      aa,
      void 0,
      gn,
      la,
      Tn
    );
    pa(sn, Tn), A.navigation.state === "loading" && sn > D ? (Ge(K, "Expected pending action"), Q && Q.abort(), De(A.navigation.location, {
      matches: Mn,
      loaderData: rl,
      errors: Da,
      fetchers: Tn
    })) : (Se({
      errors: Da,
      loaderData: ny(
        A.loaderData,
        rl,
        Mn,
        Da
      ),
      fetchers: Tn
    }), O = !1);
  }
  async function yt(H, I, W, de, he, Ee, ve, xe, be) {
    let Ce = A.fetchers.get(H);
    Wt(
      H,
      io(
        be,
        Ce ? Ce.data : void 0
      ),
      { flushSync: ve }
    );
    let Me = new AbortController(), Be = Pi(
      t.history,
      W,
      Me.signal
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
        Ct(H, I, Ze.error, { flushSync: ve });
        return;
      } else if (Ze.matches)
        de = Ze.matches;
      else {
        Ct(
          H,
          I,
          Jn(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let je = mu(de, W);
    $.set(H, Me);
    let Ye = ne, Je = nr(
      u,
      f,
      Be,
      W,
      de,
      je,
      o,
      he
    ), mt = await Nt(
      Be,
      W,
      Je,
      he,
      H
    ), We = mt[je.route.id];
    if (!We) {
      for (let Ze of de)
        if (mt[Ze.route.id]) {
          We = mt[Ze.route.id];
          break;
        }
    }
    if ($.get(H) === Me && $.delete(H), !Be.signal.aborted) {
      if (me.has(H)) {
        Wt(H, _a(void 0));
        return;
      }
      if (ai(We))
        if (D > Ye) {
          Wt(H, _a(void 0));
          return;
        } else {
          F.add(H), await _t(Be, We, !1, {
            preventScrollReset: xe
          });
          return;
        }
      if (Hn(We)) {
        Ct(H, I, We.error);
        return;
      }
      Wt(H, _a(We.data));
    }
  }
  async function _t(H, I, W, {
    submission: de,
    fetcherSubmission: he,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    W || (J?.resolve(), J = null), I.response.headers.has("X-Remix-Revalidate") && (O = !0);
    let xe = I.response.headers.get("Location");
    Ge(xe, "Expected a Location header on the redirect Response"), xe = W0(
      xe,
      new URL(H.url),
      p,
      t.history
    );
    let be = Yd(A.location, xe, {
      _isRedirect: !0
    });
    if (i) {
      let Je = !1;
      if (I.response.headers.has("X-Remix-Reload-Document"))
        Je = !0;
      else if (hh(xe)) {
        const mt = Iw(a, xe, !0);
        Je = // Hard reload if it's an absolute URL to a new origin
        mt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Wn(mt.pathname, p) == null;
      }
      if (Je) {
        ve ? a.location.replace(xe) : a.location.assign(xe);
        return;
      }
    }
    Q = null;
    let Ce = ve === !0 || I.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Me, formAction: Be, formEncType: je } = A.navigation;
    !de && !he && Me && Be && je && (de = iy(A.navigation));
    let Ye = de || he;
    if (CE.has(I.response.status) && Ye && cn(Ye.formMethod))
      await it(Ce, be, {
        submission: {
          ...Ye,
          formAction: xe
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || G,
        enableViewTransition: W ? re : void 0
      });
    else {
      let Je = gd(
        be,
        [],
        Ce,
        de
      );
      await it(Ce, be, {
        overrideNavigation: Je,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: he,
        // Preserve these flags across redirects
        preventScrollReset: Ee || G,
        enableViewTransition: W ? re : void 0
      });
    }
  }
  async function Nt(H, I, W, de, he) {
    let Ee, ve = {};
    try {
      Ee = await BE(
        g,
        H,
        I,
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
        !Ee.hasOwnProperty(xe.route.id) && !A.loaderData.hasOwnProperty(xe.route.id) && (!A.errors || !A.errors.hasOwnProperty(xe.route.id)) && xe.shouldCallHandler() && (Ee[xe.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${xe.route.id}`
          )
        });
      }
    for (let [xe, be] of Object.entries(Ee))
      if (IE(be)) {
        let Ce = be.result;
        ve[xe] = {
          type: "redirect",
          response: YE(
            Ce,
            H,
            xe,
            W,
            p
          )
        };
      } else
        ve[xe] = await VE(be);
    return ve;
  }
  async function Pt(H, I, W, de, he) {
    let Ee = Nt(
      W,
      de,
      H,
      he,
      null
    ), ve = Promise.all(
      I.map(async (Ce) => {
        if (Ce.matches && Ce.match && Ce.request && Ce.controller) {
          let Be = (await Nt(
            Ce.request,
            Ce.path,
            Ce.matches,
            he,
            Ce.key
          ))[Ce.match.route.id];
          return { [Ce.key]: Be };
        } else
          return Promise.resolve({
            [Ce.key]: {
              type: "error",
              error: Jn(404, {
                pathname: Ce.path
              })
            }
          });
      })
    ), xe = await Ee, be = (await ve).reduce(
      (Ce, Me) => Object.assign(Ce, Me),
      {}
    );
    return {
      loaderResults: xe,
      fetcherResults: be
    };
  }
  function qt() {
    O = !0, le.forEach((H, I) => {
      $.has(I) && q.add(I), Mt(I);
    });
  }
  function Wt(H, I, W = {}) {
    let de = new Map(A.fetchers);
    de.set(H, I), Se(
      { fetchers: de },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function Ct(H, I, W, de = {}) {
    let he = Ol(A.matches, I), Ee = new Map(A.fetchers);
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
  function nl(H) {
    return se.set(H, (se.get(H) || 0) + 1), me.has(H) && me.delete(H), A.fetchers.get(H) || ME;
  }
  function kn(H, I) {
    Mt(H, I?.reason), Wt(H, _a(null));
  }
  function Nn(H, I) {
    let W = A.fetchers.get(I);
    $.has(I) && !(W && W.state === "loading" && V.has(I)) && Mt(I), le.delete(I), V.delete(I), F.delete(I), me.delete(I), q.delete(I), H.delete(I);
  }
  function $t(H) {
    let I = (se.get(H) || 0) - 1;
    I <= 0 ? (se.delete(H), me.add(H)) : se.set(H, I), Se({ fetchers: new Map(A.fetchers) });
  }
  function Mt(H, I) {
    let W = $.get(H);
    W && (W.abort(I), $.delete(H));
  }
  function zt(H, I) {
    for (let W of H) {
      let de = I.get(W);
      Ge(de, `Expected fetcher: ${W}`);
      let he = _a(de.data);
      I.set(W, he);
    }
  }
  function al(H) {
    let I = [], W = !1;
    for (let de of F) {
      let he = H.get(de);
      Ge(he, `Expected fetcher: ${de}`), he.state === "loading" && (F.delete(de), I.push(de), W = !0);
    }
    return zt(I, H), W;
  }
  function pa(H, I) {
    let W = [];
    for (let [de, he] of V)
      if (he < H) {
        let Ee = I.get(de);
        Ge(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Mt(de), V.delete(de), W.push(de));
      }
    return zt(W, I), W.length > 0;
  }
  function mn(H, I) {
    let W = A.blockers.get(H) || lo;
    return ge.get(H) !== I && ge.set(H, I), W;
  }
  function ta(H) {
    A.blockers.delete(H), ge.delete(H);
  }
  function Cn(H, I) {
    let W = A.blockers.get(H) || lo;
    Ge(
      W.state === "unblocked" && I.state === "blocked" || W.state === "blocked" && I.state === "blocked" || W.state === "blocked" && I.state === "proceeding" || W.state === "blocked" && I.state === "unblocked" || W.state === "proceeding" && I.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${I.state}`
    );
    let de = new Map(A.blockers);
    de.set(H, I), Se({ blockers: de });
  }
  function Vn({
    currentLocation: H,
    nextLocation: I,
    historyAction: W
  }) {
    if (ge.size === 0)
      return;
    ge.size > 1 && Ht(!1, "A router only supports one blocker at a time");
    let de = Array.from(ge.entries()), [he, Ee] = de[de.length - 1], ve = A.blockers.get(he);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: H, nextLocation: I, historyAction: W }))
      return he;
  }
  function on(H) {
    let I = Jn(404, { pathname: H }), W = h.activeRoutes, { matches: de, route: he } = Fs(W);
    return { notFoundMatches: de, route: he, error: I };
  }
  function Le(H, I, W) {
    if (S = H, T = I, R = W || null, !M && A.navigation === md) {
      M = !0;
      let de = jt(A.location, A.matches);
      de != null && Se({ restoreScrollPosition: de });
    }
    return () => {
      S = null, T = null, R = null;
    };
  }
  function ot(H, I) {
    return R && R(
      H,
      I.map((de) => eE(de, A.loaderData))
    ) || H.key;
  }
  function Rt(H, I) {
    if (S && T) {
      let W = ot(H, I);
      S[W] = T();
    }
  }
  function jt(H, I) {
    if (S) {
      let W = ot(H, I), de = S[W];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function fn(H, I, W) {
    if (t.patchRoutesOnNavigation) {
      let de = h.branches;
      if (H) {
        if (Object.keys(H[0].params).length > 0)
          return { active: !0, matches: sa(
            I,
            W,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: sa(
          I,
          W,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function rt(H, I, W, de) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: H };
    let he = H;
    for (; ; ) {
      let Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: W,
          path: I,
          matches: he,
          fetcherKey: de,
          patch: (Ce, Me) => {
            W.aborted || K0(
              Ce,
              Me,
              h,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Ce) {
        return { type: "error", error: Ce, partialMatches: he };
      }
      if (W.aborted)
        return { type: "aborted" };
      let ve = h.branches, xe = sa(
        h.activeRoutes,
        I,
        p,
        !1,
        ve
      ), be = null;
      if (xe) {
        if (Object.keys(xe[0].params).length === 0)
          return { type: "success", matches: xe };
        if (be = sa(
          h.activeRoutes,
          I,
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
        I,
        p,
        !0,
        ve
      )), !be || Xt(he, be))
        return { type: "success", matches: null };
      he = be;
    }
  }
  function Xt(H, I) {
    return H.length === I.length && H.every((W, de) => W.route.id === I[de].route.id);
  }
  function na(H) {
    f = {}, h.setHmrRoutes(
      bo(
        H,
        u,
        void 0,
        f
      )
    );
  }
  function It(H, I, W = !1) {
    K0(
      H,
      I,
      h,
      f,
      u,
      W
    ), h.hasHMRRoutes || Se({});
  }
  return U = {
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
    getFetcher: nl,
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
  }, t.instrumentations && (U = vE(
    U,
    t.instrumentations.map((H) => H.router).filter(Boolean)
  )), U;
}
function DE(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Gd(t, a, i, o, s, u) {
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
  let p = Uu(
    o || ".",
    mh(f),
    Wn(t.pathname, i) || t.pathname,
    u === "path"
  );
  if (o == null && (p.search = t.search, p.hash = t.hash), (o == null || o === "" || o === ".") && h) {
    let g = vh(p.search);
    if (h.route.index && !g)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && g) {
      let y = new URLSearchParams(p.search), m = y.getAll("index");
      y.delete("index"), m.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return i !== "/" && (p.pathname = dE({ basename: i, pathname: p.pathname })), Ta(p);
}
function Q0(t, a, i) {
  if (!i || !DE(i))
    return { path: a };
  if (i.formMethod && !JE(i.formMethod))
    return {
      path: a,
      error: Jn(405, { method: i.formMethod })
    };
  let o = () => ({
    path: a,
    error: Jn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), f = bb(a);
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
    h = Xd(i.formData), p = i.formData;
  else if (i.body instanceof FormData)
    h = Xd(i.body), p = i.body;
  else if (i.body instanceof URLSearchParams)
    h = i.body, p = ey(h);
  else if (i.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(i.body), p = ey(h);
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
  return t && y.search && vh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Ta(y), submission: g };
}
function I0(t, a, i, o, s, u, f, h, p, g, y, m, v, x, S, R, T, M, L, _, z, Y) {
  let B = z ? Hn(z[1]) ? z[1].error : z[1].data : void 0, U = s.createURL(u.location), A = s.createURL(p), K;
  if (y && u.errors) {
    let C = Object.keys(u.errors)[0];
    K = f.findIndex((O) => O.route.id === C);
  } else if (z && Hn(z[1])) {
    let C = z[0];
    K = f.findIndex((O) => O.route.id === C) - 1;
  }
  let J = z ? z[1].statusCode : void 0, G = J && J >= 400, Q = {
    currentUrl: U,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: f[0].params,
    ...h,
    actionResult: B,
    actionStatus: J
  }, re = Do(f), j = f.map((C, O) => {
    let { route: q } = C, $ = null;
    if (K != null && O > K)
      $ = !1;
    else if (q.lazy)
      $ = !0;
    else if (!ph(q))
      $ = !1;
    else if (y) {
      let { shouldLoad: F } = db(
        q,
        u.loaderData,
        u.errors
      );
      $ = F;
    } else zE(u.loaderData, u.matches[O], C) && ($ = !0);
    if ($ !== null)
      return qd(
        i,
        o,
        t,
        p,
        re,
        C,
        g,
        a,
        $
      );
    let ne = !1;
    typeof Y == "boolean" ? ne = Y : G ? ne = !1 : (m || U.pathname + U.search === A.pathname + A.search || U.search !== A.search || jE(u.matches[O], C)) && (ne = !0);
    let D = {
      ...Q,
      defaultShouldRevalidate: ne
    }, V = po(C, D);
    return qd(
      i,
      o,
      t,
      p,
      re,
      C,
      g,
      a,
      V,
      D,
      Y
    );
  }), Z = [];
  return S.forEach((C, O) => {
    if (y || !f.some((se) => se.route.id === C.routeId) || x.has(O))
      return;
    let q = u.fetchers.get(O), $ = q && q.state !== "idle" && q.data === void 0, ne = sa(
      T,
      C.path,
      M ?? "/",
      !1,
      _
    );
    if (!ne) {
      if (L && $)
        return;
      Z.push({
        key: O,
        routeId: C.routeId,
        path: C.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(O))
      return;
    let D = mu(ne, C.path), V = new AbortController(), F = Pi(
      s,
      C.path,
      V.signal
    ), le = null;
    if (v.has(O))
      v.delete(O), le = nr(
        i,
        o,
        F,
        C.path,
        ne,
        D,
        g,
        a
      );
    else if ($)
      m && (le = nr(
        i,
        o,
        F,
        C.path,
        ne,
        D,
        g,
        a
      ));
    else {
      let se;
      typeof Y == "boolean" ? se = Y : G ? se = !1 : se = m;
      let me = {
        ...Q,
        defaultShouldRevalidate: se
      };
      po(D, me) && (le = nr(
        i,
        o,
        F,
        C.path,
        ne,
        D,
        g,
        a,
        me
      ));
    }
    le && Z.push({
      key: O,
      routeId: C.routeId,
      path: C.path,
      matches: le,
      match: D,
      request: F,
      controller: V
    });
  }), { dsMatches: j, revalidatingFetchers: Z };
}
function ph(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function db(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!ph(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let o = a != null && t.id in a, s = i != null && i[t.id] !== void 0;
  if (!o && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let u = !o && !s;
  return { shouldLoad: u, renderFallback: u };
}
function zE(t, a, i) {
  let o = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), s = !t.hasOwnProperty(i.route.id);
  return o || s;
}
function jE(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function po(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function K0(t, a, i, o, s, u) {
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
      (m) => hb(g, m)
    );
    y ? p.push({ existingRoute: y, newRoute: g }) : h.push(g);
  }), h.length > 0) {
    let g = bo(
      h,
      s,
      [t || "_", "patch", String(f?.length || "0")],
      o
    );
    f.push(...g);
  }
  if (u && p.length > 0)
    for (let g = 0; g < p.length; g++) {
      let { existingRoute: y, newRoute: m } = p[g], v = y, [x] = bo(
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
function hb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, o) => a.children?.some((s) => hb(i, s))
  ) ?? !1 : !1;
}
var F0 = /* @__PURE__ */ new WeakMap(), mb = ({
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
  let f = F0.get(s);
  f || (f = {}, F0.set(s, f));
  let h = f[t];
  if (h)
    return h;
  let p = (async () => {
    let g = Fw(t), m = s[t] !== void 0 && t !== "hasErrorBoundary";
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
}, J0 = /* @__PURE__ */ new WeakMap();
function OE(t, a, i, o, s) {
  let u = i[t.id];
  if (Ge(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = J0.get(u);
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
        let R = v[S];
        if (R === void 0)
          continue;
        let T = Pw(S), L = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        T ? Ht(
          !T,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? Ht(
          !L,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = R;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...o(u),
        lazy: void 0
      });
    })();
    return J0.set(u, m), m.catch(() => {
    }), {
      lazyRoutePromise: m,
      lazyHandlerPromise: m
    };
  }
  let f = Object.keys(t.lazy), h = [], p;
  for (let y of f) {
    if (s && s.includes(y))
      continue;
    let m = mb({
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
async function P0(t) {
  let a = t.matches.filter((s) => s.shouldLoad), i = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    i[a[u].route.id] = s;
  }), i;
}
async function LE(t) {
  return t.matches.some((a) => a.route.middleware) ? gb(t, () => P0(t)) : P0(t);
}
function gb(t, a) {
  return HE(
    t,
    a,
    (o) => {
      if (FE(o))
        throw o;
      return o;
    },
    ZE,
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
async function HE(t, a, i, o, s) {
  let { matches: u, ...f } = t, h = u.flatMap(
    (g) => g.route.middleware ? g.route.middleware.map((y) => [g.route.id, y]) : []
  );
  return await pb(
    f,
    h,
    a,
    i,
    o,
    s
  );
}
async function pb(t, a, i, o, s, u, f = 0) {
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
      return m = { value: await pb(
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
function yb(t, a, i, o, s) {
  let u = mb({
    key: "middleware",
    route: o.route,
    manifest: a,
    mapRouteProperties: t
  }), f = OE(
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
function qd(t, a, i, o, s, u, f, h, p, g = null, y) {
  let m = !1, v = yb(
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
      return m = !0, g ? typeof y == "boolean" ? po(u, {
        ...g,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? po(u, {
        ...g,
        defaultShouldRevalidate: x
      }) : po(u, g) : p;
    },
    resolve(x) {
      let { lazy: S, loader: R, middleware: T } = u.route, M = m || p || x && !cn(i.method) && (S || R), L = T && T.length > 0 && !R && !S;
      return M && (cn(i.method) || !L) ? UE({
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
function nr(t, a, i, o, s, u, f, h, p = null) {
  return s.map((g) => g.route.id !== u.route.id ? {
    ...g,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: yb(
      t,
      a,
      i,
      g,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : qd(
    t,
    a,
    i,
    o,
    Do(s),
    g,
    f,
    h,
    !0,
    p
  ));
}
async function BE(t, a, i, o, s, u, f) {
  o.some((y) => y._lazyPromises?.middleware) && await Promise.all(o.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: vb(a, i),
    pattern: Do(o),
    params: o[0].params,
    context: u,
    matches: o
  }, g = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let m = h;
      return gb(m, () => y({
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
async function UE({
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
    let S, R = new Promise((L, _) => S = _);
    g = () => S(), t.signal.addEventListener("abort", g);
    let T = (L) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${m}" [routeId: ${o.route.id}]`
      )
    ) : x(
      {
        request: t,
        url: vb(t, a),
        pattern: i,
        params: o.params,
        context: h
      },
      ...L !== void 0 ? [L] : []
    ), M = (async () => {
      try {
        return { type: "data", result: await (f ? f((_) => T(_)) : T()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([M, R]);
  };
  try {
    let x = y ? o.route.action : o.route.loader;
    if (s || u)
      if (x) {
        let S, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(x).catch((T) => {
            S = T;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (S !== void 0)
          throw S;
        p = R;
      } else {
        await s;
        let S = y ? o.route.action : o.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (m === "action") {
          let R = new URL(t.url), T = R.pathname + R.search;
          throw Jn(405, {
            method: t.method,
            pathname: T,
            routeId: o.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await v(x);
    else {
      let S = new URL(t.url), R = S.pathname + S.search;
      throw Jn(404, {
        pathname: R
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    g && t.signal.removeEventListener("abort", g);
  }
  return p;
}
async function kE(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function VE(t) {
  let { result: a, type: i } = t;
  if (yh(a)) {
    let o;
    try {
      o = await kE(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return i === "error" ? {
      type: "error",
      error: new ku(a.status, a.statusText, o),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: o,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? ly(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: XE(a),
    statusCode: xo(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: xo(a) ? a.status : void 0
  } : ly(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function YE(t, a, i, o, s) {
  let u = t.headers.get("Location");
  if (Ge(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !hh(u)) {
    let f = o.slice(
      0,
      o.findIndex((h) => h.route.id === i) + 1
    );
    u = Gd(
      new URL(a.url),
      f,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var GE = [
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
function $d(t) {
  try {
    return GE.includes(new URL(t).protocol);
  } catch {
    return !1;
  }
}
function W0(t, a, i, o) {
  if (hh(t)) {
    let s = t, u = dh.test(s) ? new URL(
      Pv(s, a.protocol)
    ) : new URL(s);
    if ($d(u.toString()))
      throw new Error("Invalid redirect location");
    let f = Wn(u.pathname, i) != null;
    if (u.origin === a.origin && f)
      return gh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = o.createURL(t);
    if ($d(s.toString()))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Pi(t, a, i, o) {
  let s = t.createURL(bb(a)).toString(), u = { signal: i };
  if (o && cn(o.formMethod)) {
    let { formMethod: f, formEncType: h } = o;
    u.method = f.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(o.json)) : h === "text/plain" ? u.body = o.text : h === "application/x-www-form-urlencoded" && o.formData ? u.body = Xd(o.formData) : u.body = o.formData;
  }
  return new Request(s, u);
}
function vb(t, a) {
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
function Xd(t) {
  let a = new URLSearchParams();
  for (let [i, o] of t.entries())
    a.append(i, typeof o == "string" ? o : o.name);
  return a;
}
function ey(t) {
  let a = new FormData();
  for (let [i, o] of t.entries())
    a.append(i, o);
  return a;
}
function qE(t, a, i, o = !1, s = !1) {
  let u = {}, f = null, h, p = !1, g = {}, y = i && Hn(i[1]) ? i[1].error : void 0;
  return t.forEach((m) => {
    if (!(m.route.id in a))
      return;
    let v = m.route.id, x = a[v];
    if (Ge(
      !ai(x),
      "Cannot handle redirect results in processLoaderData"
    ), Hn(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), f = f || {}, s)
        f[v] = S;
      else {
        let R = Ol(t, v);
        f[R.route.id] == null && (f[R.route.id] = S);
      }
      o || (u[v] = fb), p || (p = !0, h = xo(x.error) ? x.error.status : 500), x.headers && (g[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (h = x.statusCode), x.headers && (g[v] = x.headers);
  }), y !== void 0 && i && (f = { [i[0]]: y }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: h || 200,
    loaderHeaders: g
  };
}
function ty(t, a, i, o, s, u, f) {
  let { loaderData: h, errors: p } = qE(
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
    } else if (ai(x))
      Ge(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = _a(x.data);
      f.set(y, S);
    }
  }), { loaderData: h, errors: p };
}
function ny(t, a, i, o) {
  let s = Object.entries(a).filter(([, u]) => u !== fb).reduce((u, [f, h]) => (u[f] = h, u), {});
  for (let u of i) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (s[f] = t[f]), o && o.hasOwnProperty(f))
      break;
  }
  return s;
}
function ay(t) {
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
function Fs(t) {
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
  return t === 400 ? (f = "Bad Request", o && a && i ? h = `You made a ${o} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : s === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", h = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", o && a && i ? h = `You made a ${o.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : o && (h = `Invalid request method "${o.toUpperCase()}"`)), new ku(
    t || 500,
    f,
    new Error(h),
    !0
  );
}
function Js(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [o, s] = a[i];
    if (ai(s))
      return { key: o, result: s };
  }
}
function bb(t) {
  let a = typeof t == "string" ? ma(t) : t;
  return Ta({ ...a, hash: "" });
}
function $E(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function XE(t) {
  return new ku(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function ZE(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && QE(i)
  );
}
function QE(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function IE(t) {
  return yh(t.result) && ub.has(t.result.status);
}
function Hn(t) {
  return t.type === "error";
}
function ai(t) {
  return (t && t.type) === "redirect";
}
function ly(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function yh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function KE(t) {
  return ub.has(t);
}
function FE(t) {
  return yh(t) && KE(t.status) && t.headers.has("Location");
}
function JE(t) {
  return NE.has(t.toUpperCase());
}
function cn(t) {
  return EE.has(t.toUpperCase());
}
function vh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function mu(t, a) {
  let i = typeof a == "string" ? ma(a).search : a.search;
  if (t[t.length - 1].route.index && vh(i || ""))
    return t[t.length - 1];
  let o = lb(t);
  return o[o.length - 1];
}
function iy(t) {
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
function gd(t, a, i, o) {
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
function PE(t, a, i, o) {
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
function io(t, a) {
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
function WE(t, a) {
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
function e_(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      cb
    );
    if (i) {
      let o = JSON.parse(i);
      for (let [s, u] of Object.entries(o || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function t_(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [o, s] of a)
      i[o] = [...s];
    try {
      t.sessionStorage.setItem(
        cb,
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
function ry() {
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
var hi = E.createContext(null);
hi.displayName = "DataRouter";
var zo = E.createContext(null);
zo.displayName = "DataRouterState";
var xb = E.createContext(!1);
function Sb() {
  return E.useContext(xb);
}
var bh = E.createContext({
  isTransitioning: !1
});
bh.displayName = "ViewTransition";
var wb = E.createContext(
  /* @__PURE__ */ new Map()
);
wb.displayName = "Fetchers";
var n_ = E.createContext(null);
n_.displayName = "Await";
var ea = E.createContext(
  null
);
ea.displayName = "Navigation";
var Vu = E.createContext(
  null
);
Vu.displayName = "Location";
var Ra = E.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ra.displayName = "Route";
var xh = E.createContext(null);
xh.displayName = "RouteError";
var Eb = "REACT_ROUTER_ERROR", a_ = "REDIRECT", l_ = "ROUTE_ERROR_RESPONSE";
function i_(t) {
  if (t.startsWith(`${Eb}:${a_}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function r_(t) {
  if (t.startsWith(
    `${Eb}:${l_}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new ku(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function o_(t, { relative: a } = {}) {
  Ge(
    jo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: o } = E.useContext(ea), { hash: s, pathname: u, search: f } = Oo(t, { relative: a }), h = u;
  return i !== "/" && (h = u === "/" ? i : Pn([i, u])), o.createHref({ pathname: h, search: f, hash: s });
}
function jo() {
  return E.useContext(Vu) != null;
}
function el() {
  return Ge(
    jo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), E.useContext(Vu).location;
}
var _b = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Nb(t) {
  E.useContext(ea).static || E.useLayoutEffect(t);
}
function s_() {
  let { isDataRoute: t } = E.useContext(Ra);
  return t ? E_() : u_();
}
function u_() {
  Ge(
    jo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = E.useContext(hi), { basename: a, navigator: i } = E.useContext(ea), { matches: o } = E.useContext(Ra), { pathname: s } = el(), u = JSON.stringify(mh(o)), f = E.useRef(!1);
  return Nb(() => {
    f.current = !0;
  }), E.useCallback(
    (p, g = {}) => {
      if (Ht(f.current, _b), !f.current) return;
      if (typeof p == "number") {
        i.go(p);
        return;
      }
      let y = Uu(
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
var c_ = E.createContext(null);
function f_(t) {
  let a = E.useContext(Ra).outlet;
  return E.useMemo(
    () => a && /* @__PURE__ */ E.createElement(c_.Provider, { value: t }, a),
    [a, t]
  );
}
function Oo(t, { relative: a } = {}) {
  let { matches: i } = E.useContext(Ra), { pathname: o } = el(), s = JSON.stringify(mh(i));
  return E.useMemo(
    () => Uu(
      t,
      JSON.parse(s),
      o,
      a === "path"
    ),
    [t, s, o, a]
  );
}
function d_(t, a, i) {
  Ge(
    jo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = E.useContext(ea), { matches: s } = E.useContext(Ra), u = s[s.length - 1], f = u ? u.params : {}, h = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", g = u && u.route;
  {
    let T = g && g.path || "";
    Mb(
      h,
      !g || T.endsWith("*") || T.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T === "/" ? "*" : `${T}/*`}">.`
    );
  }
  let y = el(), m;
  m = y;
  let v = m.pathname || "/", x = v;
  if (p !== "/") {
    let T = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(T.length).join("/");
  }
  let S = i && i.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    i.state.matches.map(
      (T) => Object.assign(T, {
        route: i.manifest[T.route.id] || T.route
      })
    )
  ) : Wv(t, { pathname: x });
  return Ht(
    g || S != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), Ht(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), y_(
    S && S.map(
      (T) => Object.assign({}, T, {
        params: Object.assign({}, f, T.params),
        pathname: Pn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            T.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathname
        ]),
        pathnameBase: T.pathnameBase === "/" ? p : Pn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            T.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathnameBase
        ])
      })
    ),
    s,
    i
  );
}
function h_() {
  let t = w_(), a = xo(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, u = { padding: "2px 4px", backgroundColor: o }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ E.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ E.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ E.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ E.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ E.createElement("pre", { style: s }, i) : null, f);
}
var m_ = /* @__PURE__ */ E.createElement(h_, null), Cb = class extends E.Component {
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
      const i = r_(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ E.createElement(Ra.Provider, { value: this.props.routeContext }, /* @__PURE__ */ E.createElement(
      xh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ E.createElement(g_, { error: t }, a) : a;
  }
};
Cb.contextType = xb;
var pd = /* @__PURE__ */ new WeakMap();
function g_({
  children: t,
  error: a
}) {
  let { basename: i } = E.useContext(ea);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let o = i_(a.digest);
    if (o) {
      let s = pd.get(a);
      if (s) throw s;
      let u = rb(o.location, i), f = u.absoluteURL || u.to;
      if ($d(f))
        throw new Error("Invalid redirect location");
      if (ib && !pd.get(a))
        if (u.isExternal || o.reloadDocument)
          window.location.href = f;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: o.replace
            })
          );
          throw pd.set(a, h), h;
        }
      return /* @__PURE__ */ E.createElement("meta", { httpEquiv: "refresh", content: `0;url=${f}` });
    }
  }
  return t;
}
function p_({ routeContext: t, match: a, children: i }) {
  let o = E.useContext(hi);
  return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ E.createElement(Ra.Provider, { value: t }, i);
}
function y_(t, a = [], i) {
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
      pattern: Do(o.matches),
      errorInfo: m
    });
  } : void 0;
  return s.reduceRight(
    (y, m, v) => {
      let x, S = !1, R = null, T = null;
      o && (x = u && m.route.id ? u[m.route.id] : void 0, R = m.route.errorElement || m_, f && (h < 0 && v === 0 ? (Mb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, T = null) : h === v && (S = !0, T = m.route.hydrateFallbackElement || null)));
      let M = a.concat(s.slice(0, v + 1)), L = () => {
        let _;
        return x ? _ = R : S ? _ = T : m.route.Component ? _ = /* @__PURE__ */ E.createElement(m.route.Component, null) : m.route.element ? _ = m.route.element : _ = y, /* @__PURE__ */ E.createElement(
          p_,
          {
            match: m,
            routeContext: {
              outlet: y,
              matches: M,
              isDataRoute: o != null
            },
            children: _
          }
        );
      };
      return o && (m.route.ErrorBoundary || m.route.errorElement || v === 0) ? /* @__PURE__ */ E.createElement(
        Cb,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: R,
          error: x,
          children: L(),
          routeContext: { outlet: null, matches: M, isDataRoute: !0 },
          onError: g
        }
      ) : L();
    },
    null
  );
}
function Sh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function v_(t) {
  let a = E.useContext(hi);
  return Ge(a, Sh(t)), a;
}
function b_(t) {
  let a = E.useContext(zo);
  return Ge(a, Sh(t)), a;
}
function x_(t) {
  let a = E.useContext(Ra);
  return Ge(a, Sh(t)), a;
}
function wh(t) {
  let a = x_(t), i = a.matches[a.matches.length - 1];
  return Ge(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function S_() {
  return wh(
    "useRouteId"
    /* UseRouteId */
  );
}
function w_() {
  let t = E.useContext(xh), a = b_(
    "useRouteError"
    /* UseRouteError */
  ), i = wh(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function E_() {
  let { router: t } = v_(
    "useNavigate"
    /* UseNavigateStable */
  ), a = wh(
    "useNavigate"
    /* UseNavigateStable */
  ), i = E.useRef(!1);
  return Nb(() => {
    i.current = !0;
  }), E.useCallback(
    async (s, u = {}) => {
      Ht(i.current, _b), i.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var oy = {};
function Mb(t, a, i) {
  !a && !oy[t] && (oy[t] = !0, Ht(!1, i));
}
var sy = {};
function uy(t, a) {
  !t && !sy[a] && (sy[a] = !0, console.warn(a));
}
var __ = "useOptimistic", cy = kw[__], N_ = () => {
};
function C_(t) {
  return cy ? cy(t) : [t, N_];
}
function M_(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Ht(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: E.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Ht(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: E.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Ht(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: E.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var T_ = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function R_(t, a) {
  return AE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: Zw({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: T_,
    mapRouteProperties: M_,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var A_ = class {
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
function D_({
  router: t,
  flushSync: a,
  onError: i,
  useTransitions: o
}) {
  o = Sb() || o;
  let [u, f] = E.useState(t.state), [h, p] = C_(u), [g, y] = E.useState(), [m, v] = E.useState({
    isTransitioning: !1
  }), [x, S] = E.useState(), [R, T] = E.useState(), [M, L] = E.useState(), _ = E.useRef(/* @__PURE__ */ new Map()), z = E.useCallback(
    (A, { deletedFetchers: K, newErrors: J, flushSync: G, viewTransitionOpts: Q }) => {
      J && i && Object.values(J).forEach(
        (j) => i(j, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: Do(A.matches)
        })
      ), A.fetchers.forEach((j, Z) => {
        j.data !== void 0 && _.current.set(Z, j.data);
      }), K.forEach((j) => _.current.delete(j)), uy(
        G === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let re = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (uy(
        Q == null || re,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Q || !re) {
        a && G ? a(() => f(A)) : o === !1 ? f(A) : E.startTransition(() => {
          o === !0 && p((j) => fy(j, A)), f(A);
        });
        return;
      }
      if (a && G) {
        a(() => {
          R && (x?.resolve(), R.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Q.currentLocation,
            nextLocation: Q.nextLocation
          });
        });
        let j = t.window.document.startViewTransition(() => {
          a(() => f(A));
        });
        j.finished.finally(() => {
          a(() => {
            S(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => T(j));
        return;
      }
      R ? (x?.resolve(), R.skipTransition(), L({
        state: A,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      })) : (y(A), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      }));
    },
    [
      t.window,
      a,
      R,
      x,
      o,
      p,
      i
    ]
  );
  E.useLayoutEffect(() => t.subscribe(z), [t, z]), E.useEffect(() => {
    m.isTransitioning && !m.flushSync && S(new A_());
  }, [m]), E.useEffect(() => {
    if (x && g && t.window) {
      let A = g, K = x.promise, J = t.window.document.startViewTransition(async () => {
        o === !1 ? f(A) : E.startTransition(() => {
          o === !0 && p((G) => fy(G, A)), f(A);
        }), await K;
      });
      J.finished.finally(() => {
        S(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
      }), T(J);
    }
  }, [
    g,
    x,
    t.window,
    o,
    p
  ]), E.useEffect(() => {
    x && g && h.location.key === g.location.key && x.resolve();
  }, [x, R, h.location, g]), E.useEffect(() => {
    !m.isTransitioning && M && (y(M.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: M.currentLocation,
      nextLocation: M.nextLocation
    }), L(void 0));
  }, [m.isTransitioning, M]);
  let Y = E.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (A) => t.navigate(A),
    push: (A, K, J) => t.navigate(A, {
      state: K,
      preventScrollReset: J?.preventScrollReset
    }),
    replace: (A, K, J) => t.navigate(A, {
      replace: !0,
      state: K,
      preventScrollReset: J?.preventScrollReset
    })
  }), [t]), B = t.basename || "/", U = E.useMemo(
    () => ({
      router: t,
      navigator: Y,
      static: !1,
      basename: B,
      onError: i
    }),
    [t, Y, B, i]
  );
  return /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement(hi.Provider, { value: U }, /* @__PURE__ */ E.createElement(zo.Provider, { value: h }, /* @__PURE__ */ E.createElement(wb.Provider, { value: _.current }, /* @__PURE__ */ E.createElement(bh.Provider, { value: m }, /* @__PURE__ */ E.createElement(
    L_,
    {
      basename: B,
      location: h.location,
      navigationType: h.historyAction,
      navigator: Y,
      useTransitions: o
    },
    /* @__PURE__ */ E.createElement(
      z_,
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
function fy(t, a) {
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
var z_ = E.memo(j_);
function j_({
  routes: t,
  manifest: a,
  future: i,
  state: o,
  isStatic: s,
  onError: u
}) {
  return d_(t, void 0, {
    manifest: a,
    state: o,
    isStatic: s,
    onError: u
  });
}
function O_(t) {
  return f_(t.context);
}
function L_({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: o = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: f
}) {
  Ge(
    !jo(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), p = E.useMemo(
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
  } = i, R = E.useMemo(() => {
    let T = Wn(g, h);
    return T == null ? null : {
      location: {
        pathname: T,
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
    R != null,
    `<Router basename="${h}"> is not able to match the URL "${g}${y}${m}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ E.createElement(ea.Provider, { value: p }, /* @__PURE__ */ E.createElement(Vu.Provider, { children: a, value: R }));
}
var gu = "get", pu = "application/x-www-form-urlencoded";
function Yu(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function H_(t) {
  return Yu(t) && t.tagName.toLowerCase() === "button";
}
function B_(t) {
  return Yu(t) && t.tagName.toLowerCase() === "form";
}
function U_(t) {
  return Yu(t) && t.tagName.toLowerCase() === "input";
}
function k_(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function V_(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !k_(t);
}
var Ps = null;
function Y_() {
  if (Ps === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Ps = !1;
    } catch {
      Ps = !0;
    }
  return Ps;
}
var G_ = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function yd(t) {
  return t != null && !G_.has(t) ? (Ht(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${pu}"`
  ), null) : t;
}
function q_(t, a) {
  let i, o, s, u, f;
  if (B_(t)) {
    let h = t.getAttribute("action");
    o = h ? Wn(h, a) : null, i = t.getAttribute("method") || gu, s = yd(t.getAttribute("enctype")) || pu, u = new FormData(t);
  } else if (H_(t) || U_(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (o = p ? Wn(p, a) : null, i = t.getAttribute("formmethod") || h.getAttribute("method") || gu, s = yd(t.getAttribute("formenctype")) || yd(h.getAttribute("enctype")) || pu, u = new FormData(h, t), !Y_()) {
      let { name: g, type: y, value: m } = t;
      if (y === "image") {
        let v = g ? `${g}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else g && u.append(g, m);
    }
  } else {
    if (Yu(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = gu, o = null, s = pu, f = t;
  }
  return u && s === "text/plain" && (f = u, u = void 0), { action: o, method: i.toLowerCase(), encType: s, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Eh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Tb(t, a, i, o) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : a && Wn(s.pathname, a) === "/" ? s.pathname = `${Nu(a)}/_root.${o}` : s.pathname = `${Nu(s.pathname)}.${o}`, s;
}
async function $_(t, a) {
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
function X_(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function Z_(t, a, i) {
  let o = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let f = await $_(u, i);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return F_(
    o.flat(1).filter(X_).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function dy(t, a, i, o, s, u) {
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
function Q_(t, a, { includeHydrateFallback: i } = {}) {
  return I_(
    t.map((o) => {
      let s = a.routes[o.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), i && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function I_(t) {
  return [...new Set(t)];
}
function K_(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let o of i)
    a[o] = t[o];
  return a;
}
function F_(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((o, s) => {
    let u = JSON.stringify(K_(s));
    return i.has(u) || (i.add(u), o.push({ key: u, link: s })), o;
  }, []);
}
function _h() {
  let t = E.useContext(hi);
  return Eh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function J_() {
  let t = E.useContext(zo);
  return Eh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Nh = E.createContext(void 0);
Nh.displayName = "FrameworkContext";
function Gu() {
  let t = E.useContext(Nh);
  return Eh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function P_(t, a) {
  let i = E.useContext(Nh), [o, s] = E.useState(!1), [u, f] = E.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: m } = a, v = E.useRef(null);
  E.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let R = (M) => {
        M.forEach((L) => {
          f(L.isIntersecting);
        });
      }, T = new IntersectionObserver(R, { threshold: 0.5 });
      return v.current && T.observe(v.current), () => {
        T.disconnect();
      };
    }
  }, [t]), E.useEffect(() => {
    if (o) {
      let R = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(R);
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
      onFocus: ro(h, x),
      onBlur: ro(p, S),
      onMouseEnter: ro(g, x),
      onMouseLeave: ro(y, S),
      onTouchStart: ro(m, x)
    }
  ] : [!1, v, {}];
}
function ro(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function W_({ page: t, ...a }) {
  let i = Sb(), { nonce: o } = Gu(), { router: s } = _h(), u = E.useMemo(
    () => Wv(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return u ? (a.nonce == null && o && (a = { ...a, nonce: o }), i ? /* @__PURE__ */ E.createElement(t2, { page: t, matches: u, ...a }) : /* @__PURE__ */ E.createElement(n2, { page: t, matches: u, ...a })) : null;
}
function e2(t) {
  let { manifest: a, routeModules: i } = Gu(), [o, s] = E.useState([]);
  return E.useEffect(() => {
    let u = !1;
    return Z_(t, a, i).then(
      (f) => {
        u || s(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, i]), o;
}
function t2({
  page: t,
  matches: a,
  ...i
}) {
  let o = el(), { future: s } = Gu(), { basename: u } = _h(), f = E.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let h = Tb(
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
  return /* @__PURE__ */ E.createElement(E.Fragment, null, f.map((h) => /* @__PURE__ */ E.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...i })));
}
function n2({
  page: t,
  matches: a,
  ...i
}) {
  let o = el(), { future: s, manifest: u, routeModules: f } = Gu(), { basename: h } = _h(), { loaderData: p, matches: g } = J_(), y = E.useMemo(
    () => dy(
      t,
      a,
      g,
      u,
      o,
      "data"
    ),
    [t, a, g, u, o]
  ), m = E.useMemo(
    () => dy(
      t,
      a,
      g,
      u,
      o,
      "assets"
    ),
    [t, a, g, u, o]
  ), v = E.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), T = !1;
    if (a.forEach((L) => {
      let _ = u.routes[L.route.id];
      !_ || !_.hasLoader || (!y.some((z) => z.route.id === L.route.id) && L.route.id in p && f[L.route.id]?.shouldRevalidate || _.hasClientLoader ? T = !0 : R.add(L.route.id));
    }), R.size === 0)
      return [];
    let M = Tb(
      t,
      h,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return T && R.size > 0 && M.searchParams.set(
      "_routes",
      a.filter((L) => R.has(L.route.id)).map((L) => L.route.id).join(",")
    ), [M.pathname + M.search];
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
  ]), x = E.useMemo(
    () => Q_(m, u),
    [m, u]
  ), S = e2(m);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, v.map((R) => /* @__PURE__ */ E.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...i })), x.map((R) => /* @__PURE__ */ E.createElement("link", { key: R, rel: "modulepreload", href: R, ...i })), S.map(({ key: R, link: T }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ E.createElement(
      "link",
      {
        key: R,
        nonce: i.nonce,
        ...T,
        crossOrigin: T.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function a2(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var l2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  l2 && (window.__reactRouterVersion = // @ts-expect-error
  "7.18.0");
} catch {
}
var Rb = E.forwardRef(
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
  }, R) {
    let { basename: T, navigator: M, useTransitions: L } = E.useContext(ea), _ = typeof y == "string" && Bu.test(y), z = rb(y, T);
    y = z.to;
    let Y = o_(y, { relative: s }), B = el(), U = null;
    if (h) {
      let Z = Uu(
        h,
        [],
        B.mask ? B.mask.pathname : "/",
        !0
      );
      T !== "/" && (Z.pathname = Z.pathname === "/" ? T : Pn([T, Z.pathname])), U = M.createHref(Z);
    }
    let [A, K, J] = P_(
      o,
      S
    ), G = s2(y, {
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
    function Q(Z) {
      a && a(Z), Z.defaultPrevented || G(Z);
    }
    let re = !(z.isExternal || u), j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ E.createElement(
        "a",
        {
          ...S,
          ...J,
          href: (re ? U : void 0) || z.absoluteURL || Y,
          onClick: re ? Q : a,
          ref: a2(R, K),
          target: g,
          "data-discover": !_ && i === "render" ? "true" : void 0
        }
      )
    );
    return A && !_ ? /* @__PURE__ */ E.createElement(E.Fragment, null, j, /* @__PURE__ */ E.createElement(W_, { page: Y })) : j;
  }
);
Rb.displayName = "Link";
var i2 = E.forwardRef(
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
    let m = Oo(f, { relative: g.relative }), v = el(), x = E.useContext(zo), { navigator: S, basename: R } = E.useContext(ea), T = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    h2(m) && h === !0, M = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, L = v.pathname, _ = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    i || (L = L.toLowerCase(), _ = _ ? _.toLowerCase() : null, M = M.toLowerCase()), _ && R && (_ = Wn(_, R) || _);
    const z = M !== "/" && M.endsWith("/") ? M.length - 1 : M.length;
    let Y = L === M || !s && L.startsWith(M) && L.charAt(z) === "/", B = _ != null && (_ === M || !s && _.startsWith(M) && _.charAt(M.length) === "/"), U = {
      isActive: Y,
      isPending: B,
      isTransitioning: T
    }, A = Y ? a : void 0, K;
    typeof o == "function" ? K = o(U) : K = [
      o,
      Y ? "active" : null,
      B ? "pending" : null,
      T ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let J = typeof u == "function" ? u(U) : u;
    return /* @__PURE__ */ E.createElement(
      Rb,
      {
        ...g,
        "aria-current": A,
        className: K,
        ref: y,
        style: J,
        to: f,
        viewTransition: h
      },
      typeof p == "function" ? p(U) : p
    );
  }
);
i2.displayName = "NavLink";
var r2 = E.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: o,
    replace: s,
    state: u,
    method: f = gu,
    action: h,
    onSubmit: p,
    relative: g,
    preventScrollReset: y,
    viewTransition: m,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: R } = E.useContext(ea), T = f2(), M = d2(h, { relative: g }), L = f.toLowerCase() === "get" ? "get" : "post", _ = typeof h == "string" && Bu.test(h), z = (Y) => {
      if (p && p(Y), Y.defaultPrevented) return;
      Y.preventDefault();
      let B = Y.nativeEvent.submitter, U = B?.getAttribute("formmethod") || f, A = () => T(B || Y.currentTarget, {
        fetcherKey: a,
        method: U,
        navigate: i,
        replace: s,
        state: u,
        relative: g,
        preventScrollReset: y,
        viewTransition: m,
        defaultShouldRevalidate: v
      });
      R && i !== !1 ? E.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ E.createElement(
      "form",
      {
        ref: S,
        method: L,
        action: M,
        onSubmit: o ? p : z,
        ...x,
        "data-discover": !_ && t === "render" ? "true" : void 0
      }
    );
  }
);
r2.displayName = "Form";
function o2(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ab(t) {
  let a = E.useContext(hi);
  return Ge(a, o2(t)), a;
}
function s2(t, {
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
  let y = s_(), m = el(), v = Oo(t, { relative: f });
  return E.useCallback(
    (x) => {
      if (V_(x, a)) {
        x.preventDefault();
        let S = i !== void 0 ? i : Ta(m) === Ta(v), R = () => y(t, {
          replace: S,
          mask: o,
          state: s,
          preventScrollReset: u,
          relative: f,
          viewTransition: h,
          defaultShouldRevalidate: p
        });
        g ? E.startTransition(() => R()) : R();
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
var u2 = 0, c2 = () => `__${String(++u2)}__`;
function f2() {
  let { router: t } = Ab(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = E.useContext(ea), i = S_(), o = t.fetch, s = t.navigate;
  return E.useCallback(
    async (u, f = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: m } = q_(
        u,
        a
      );
      if (f.navigate === !1) {
        let v = f.fetcherKey || c2();
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
function d2(t, { relative: a } = {}) {
  let { basename: i } = E.useContext(ea), o = E.useContext(Ra);
  Ge(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), u = { ...Oo(t || ".", { relative: a }) }, f = el();
  if (t == null) {
    u.search = f.search;
    let h = new URLSearchParams(u.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((m) => m).forEach((m) => h.append("index", m));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Pn([i, u.pathname])), Ta(u);
}
function h2(t, { relative: a } = {}) {
  let i = E.useContext(bh);
  Ge(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = Ab(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Oo(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = Wn(i.currentLocation.pathname, o) || i.currentLocation.pathname, f = Wn(i.nextLocation.pathname, o) || i.nextLocation.pathname;
  return _u(s.pathname, f) != null || _u(s.pathname, u) != null;
}
const Zd = "trellis2:trigger-generate", Qd = "trellis2:generate-state";
function m2() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Zd));
}
function g2(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Qd, { detail: t }));
}
function p2(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Zd, t), () => window.removeEventListener(Zd, t));
}
function y2(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const o = i.detail;
    o && t(o);
  };
  return window.addEventListener(Qd, a), () => window.removeEventListener(Qd, a);
}
const hy = "ext-actions-request", v2 = "ext-actions-declare", b2 = "ext-action-state", my = "ext-action-invoke", gy = "trellis2:navigate", py = "trellis2.generate";
function x2(t, a) {
  let i = !1, o = !1;
  const s = () => ({
    id: py,
    label: i ? "Generating…" : "Generate",
    icon: i ? "hourglass_top" : "deployed_code",
    tone: "primary",
    state: i ? "loading" : o ? "disabled" : "idle",
    tooltip: o ? "Upload an input image before generating" : "Generate a 3D mesh from the input image"
  }), u = () => ({
    primary: s()
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(v2, { detail: { actions: u() }, bubbles: !1 })
    );
  }, h = () => {
    t.dispatchEvent(
      new CustomEvent(b2, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => f(), g = (m) => {
    m.detail?.id === py && m2();
  }, y = y2((m) => {
    i = m.busy, o = m.blocked, h();
  });
  return t.addEventListener(hy, p), t.addEventListener(my, g), f(), {
    dispose: () => {
      y(), t.removeEventListener(hy, p), t.removeEventListener(my, g);
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
var S2 = { value: () => {
} };
function qu() {
  for (var t = 0, a = arguments.length, i = {}, o; t < a; ++t) {
    if (!(o = arguments[t] + "") || o in i || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    i[o] = [];
  }
  return new yu(i);
}
function yu(t) {
  this._ = t;
}
function w2(t, a) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var o = "", s = i.indexOf(".");
    if (s >= 0 && (o = i.slice(s + 1), i = i.slice(0, s)), i && !a.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: o };
  });
}
yu.prototype = qu.prototype = {
  constructor: yu,
  on: function(t, a) {
    var i = this._, o = w2(t + "", i), s, u = -1, f = o.length;
    if (arguments.length < 2) {
      for (; ++u < f; ) if ((s = (t = o[u]).type) && (s = E2(i[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < f; )
      if (s = (t = o[u]).type) i[s] = yy(i[s], t.name, a);
      else if (a == null) for (s in i) i[s] = yy(i[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, a = this._;
    for (var i in a) t[i] = a[i].slice();
    return new yu(t);
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
function E2(t, a) {
  for (var i = 0, o = t.length, s; i < o; ++i)
    if ((s = t[i]).name === a)
      return s.value;
}
function yy(t, a, i) {
  for (var o = 0, s = t.length; o < s; ++o)
    if (t[o].name === a) {
      t[o] = S2, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return i != null && t.push({ name: a, value: i }), t;
}
var Id = "http://www.w3.org/1999/xhtml";
const vy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Id,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function $u(t) {
  var a = t += "", i = a.indexOf(":");
  return i >= 0 && (a = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), vy.hasOwnProperty(a) ? { space: vy[a], local: t } : t;
}
function _2(t) {
  return function() {
    var a = this.ownerDocument, i = this.namespaceURI;
    return i === Id && a.documentElement.namespaceURI === Id ? a.createElement(t) : a.createElementNS(i, t);
  };
}
function N2(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Db(t) {
  var a = $u(t);
  return (a.local ? N2 : _2)(a);
}
function C2() {
}
function Ch(t) {
  return t == null ? C2 : function() {
    return this.querySelector(t);
  };
}
function M2(t) {
  typeof t != "function" && (t = Ch(t));
  for (var a = this._groups, i = a.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], f = u.length, h = o[s] = new Array(f), p, g, y = 0; y < f; ++y)
      (p = u[y]) && (g = t.call(p, p.__data__, y, u)) && ("__data__" in p && (g.__data__ = p.__data__), h[y] = g);
  return new Un(o, this._parents);
}
function T2(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function R2() {
  return [];
}
function zb(t) {
  return t == null ? R2 : function() {
    return this.querySelectorAll(t);
  };
}
function A2(t) {
  return function() {
    return T2(t.apply(this, arguments));
  };
}
function D2(t) {
  typeof t == "function" ? t = A2(t) : t = zb(t);
  for (var a = this._groups, i = a.length, o = [], s = [], u = 0; u < i; ++u)
    for (var f = a[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && (o.push(t.call(p, p.__data__, g, f)), s.push(p));
  return new Un(o, s);
}
function jb(t) {
  return function() {
    return this.matches(t);
  };
}
function Ob(t) {
  return function(a) {
    return a.matches(t);
  };
}
var z2 = Array.prototype.find;
function j2(t) {
  return function() {
    return z2.call(this.children, t);
  };
}
function O2() {
  return this.firstElementChild;
}
function L2(t) {
  return this.select(t == null ? O2 : j2(typeof t == "function" ? t : Ob(t)));
}
var H2 = Array.prototype.filter;
function B2() {
  return Array.from(this.children);
}
function U2(t) {
  return function() {
    return H2.call(this.children, t);
  };
}
function k2(t) {
  return this.selectAll(t == null ? B2 : U2(typeof t == "function" ? t : Ob(t)));
}
function V2(t) {
  typeof t != "function" && (t = jb(t));
  for (var a = this._groups, i = a.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], f = u.length, h = o[s] = [], p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Un(o, this._parents);
}
function Lb(t) {
  return new Array(t.length);
}
function Y2() {
  return new Un(this._enter || this._groups.map(Lb), this._parents);
}
function Cu(t, a) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = a;
}
Cu.prototype = {
  constructor: Cu,
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
function G2(t) {
  return function() {
    return t;
  };
}
function q2(t, a, i, o, s, u) {
  for (var f = 0, h, p = a.length, g = u.length; f < g; ++f)
    (h = a[f]) ? (h.__data__ = u[f], o[f] = h) : i[f] = new Cu(t, u[f]);
  for (; f < p; ++f)
    (h = a[f]) && (s[f] = h);
}
function $2(t, a, i, o, s, u, f) {
  var h, p, g = /* @__PURE__ */ new Map(), y = a.length, m = u.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (p = a[h]) && (v[h] = x = f.call(p, p.__data__, h, a) + "", g.has(x) ? s[h] = p : g.set(x, p));
  for (h = 0; h < m; ++h)
    x = f.call(t, u[h], h, u) + "", (p = g.get(x)) ? (o[h] = p, p.__data__ = u[h], g.delete(x)) : i[h] = new Cu(t, u[h]);
  for (h = 0; h < y; ++h)
    (p = a[h]) && g.get(v[h]) === p && (s[h] = p);
}
function X2(t) {
  return t.__data__;
}
function Z2(t, a) {
  if (!arguments.length) return Array.from(this, X2);
  var i = a ? $2 : q2, o = this._parents, s = this._groups;
  typeof t != "function" && (t = G2(t));
  for (var u = s.length, f = new Array(u), h = new Array(u), p = new Array(u), g = 0; g < u; ++g) {
    var y = o[g], m = s[g], v = m.length, x = Q2(t.call(y, y && y.__data__, g, o)), S = x.length, R = h[g] = new Array(S), T = f[g] = new Array(S), M = p[g] = new Array(v);
    i(y, m, R, T, M, x, a);
    for (var L = 0, _ = 0, z, Y; L < S; ++L)
      if (z = R[L]) {
        for (L >= _ && (_ = L + 1); !(Y = T[_]) && ++_ < S; ) ;
        z._next = Y || null;
      }
  }
  return f = new Un(f, o), f._enter = h, f._exit = p, f;
}
function Q2(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function I2() {
  return new Un(this._exit || this._groups.map(Lb), this._parents);
}
function K2(t, a, i) {
  var o = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), i == null ? u.remove() : i(u), o && s ? o.merge(s).order() : s;
}
function F2(t) {
  for (var a = t.selection ? t.selection() : t, i = this._groups, o = a._groups, s = i.length, u = o.length, f = Math.min(s, u), h = new Array(s), p = 0; p < f; ++p)
    for (var g = i[p], y = o[p], m = g.length, v = h[p] = new Array(m), x, S = 0; S < m; ++S)
      (x = g[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    h[p] = i[p];
  return new Un(h, this._parents);
}
function J2() {
  for (var t = this._groups, a = -1, i = t.length; ++a < i; )
    for (var o = t[a], s = o.length - 1, u = o[s], f; --s >= 0; )
      (f = o[s]) && (u && f.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(f, u), u = f);
  return this;
}
function P2(t) {
  t || (t = W2);
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
function W2(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function eN() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function tN() {
  return Array.from(this);
}
function nN() {
  for (var t = this._groups, a = 0, i = t.length; a < i; ++a)
    for (var o = t[a], s = 0, u = o.length; s < u; ++s) {
      var f = o[s];
      if (f) return f;
    }
  return null;
}
function aN() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function lN() {
  return !this.node();
}
function iN(t) {
  for (var a = this._groups, i = 0, o = a.length; i < o; ++i)
    for (var s = a[i], u = 0, f = s.length, h; u < f; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function rN(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function oN(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function sN(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function uN(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function cN(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function fN(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function dN(t, a) {
  var i = $u(t);
  if (arguments.length < 2) {
    var o = this.node();
    return i.local ? o.getAttributeNS(i.space, i.local) : o.getAttribute(i);
  }
  return this.each((a == null ? i.local ? oN : rN : typeof a == "function" ? i.local ? fN : cN : i.local ? uN : sN)(i, a));
}
function Hb(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function hN(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function mN(t, a, i) {
  return function() {
    this.style.setProperty(t, a, i);
  };
}
function gN(t, a, i) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, i);
  };
}
function pN(t, a, i) {
  return arguments.length > 1 ? this.each((a == null ? hN : typeof a == "function" ? gN : mN)(t, a, i ?? "")) : rr(this.node(), t);
}
function rr(t, a) {
  return t.style.getPropertyValue(a) || Hb(t).getComputedStyle(t, null).getPropertyValue(a);
}
function yN(t) {
  return function() {
    delete this[t];
  };
}
function vN(t, a) {
  return function() {
    this[t] = a;
  };
}
function bN(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function xN(t, a) {
  return arguments.length > 1 ? this.each((a == null ? yN : typeof a == "function" ? bN : vN)(t, a)) : this.node()[t];
}
function Bb(t) {
  return t.trim().split(/^|\s+/);
}
function Mh(t) {
  return t.classList || new Ub(t);
}
function Ub(t) {
  this._node = t, this._names = Bb(t.getAttribute("class") || "");
}
Ub.prototype = {
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
function kb(t, a) {
  for (var i = Mh(t), o = -1, s = a.length; ++o < s; ) i.add(a[o]);
}
function Vb(t, a) {
  for (var i = Mh(t), o = -1, s = a.length; ++o < s; ) i.remove(a[o]);
}
function SN(t) {
  return function() {
    kb(this, t);
  };
}
function wN(t) {
  return function() {
    Vb(this, t);
  };
}
function EN(t, a) {
  return function() {
    (a.apply(this, arguments) ? kb : Vb)(this, t);
  };
}
function _N(t, a) {
  var i = Bb(t + "");
  if (arguments.length < 2) {
    for (var o = Mh(this.node()), s = -1, u = i.length; ++s < u; ) if (!o.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? EN : a ? SN : wN)(i, a));
}
function NN() {
  this.textContent = "";
}
function CN(t) {
  return function() {
    this.textContent = t;
  };
}
function MN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function TN(t) {
  return arguments.length ? this.each(t == null ? NN : (typeof t == "function" ? MN : CN)(t)) : this.node().textContent;
}
function RN() {
  this.innerHTML = "";
}
function AN(t) {
  return function() {
    this.innerHTML = t;
  };
}
function DN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function zN(t) {
  return arguments.length ? this.each(t == null ? RN : (typeof t == "function" ? DN : AN)(t)) : this.node().innerHTML;
}
function jN() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ON() {
  return this.each(jN);
}
function LN() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function HN() {
  return this.each(LN);
}
function BN(t) {
  var a = typeof t == "function" ? t : Db(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function UN() {
  return null;
}
function kN(t, a) {
  var i = typeof t == "function" ? t : Db(t), o = a == null ? UN : typeof a == "function" ? a : Ch(a);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function VN() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function YN() {
  return this.each(VN);
}
function GN() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function qN() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function $N(t) {
  return this.select(t ? qN : GN);
}
function XN(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ZN(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function QN(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var i = "", o = a.indexOf(".");
    return o >= 0 && (i = a.slice(o + 1), a = a.slice(0, o)), { type: a, name: i };
  });
}
function IN(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var i = 0, o = -1, s = a.length, u; i < s; ++i)
        u = a[i], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++o] = u;
      ++o ? a.length = o : delete this.__on;
    }
  };
}
function KN(t, a, i) {
  return function() {
    var o = this.__on, s, u = ZN(a);
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
function FN(t, a, i) {
  var o = QN(t + ""), s, u = o.length, f;
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
  for (h = a ? KN : IN, s = 0; s < u; ++s) this.each(h(o[s], a, i));
  return this;
}
function Yb(t, a, i) {
  var o = Hb(t), s = o.CustomEvent;
  typeof s == "function" ? s = new s(a, i) : (s = o.document.createEvent("Event"), i ? (s.initEvent(a, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function JN(t, a) {
  return function() {
    return Yb(this, t, a);
  };
}
function PN(t, a) {
  return function() {
    return Yb(this, t, a.apply(this, arguments));
  };
}
function WN(t, a) {
  return this.each((typeof a == "function" ? PN : JN)(t, a));
}
function* eC() {
  for (var t = this._groups, a = 0, i = t.length; a < i; ++a)
    for (var o = t[a], s = 0, u = o.length, f; s < u; ++s)
      (f = o[s]) && (yield f);
}
var Gb = [null];
function Un(t, a) {
  this._groups = t, this._parents = a;
}
function Lo() {
  return new Un([[document.documentElement]], Gb);
}
function tC() {
  return this;
}
Un.prototype = Lo.prototype = {
  constructor: Un,
  select: M2,
  selectAll: D2,
  selectChild: L2,
  selectChildren: k2,
  filter: V2,
  data: Z2,
  enter: Y2,
  exit: I2,
  join: K2,
  merge: F2,
  selection: tC,
  order: J2,
  sort: P2,
  call: eN,
  nodes: tN,
  node: nN,
  size: aN,
  empty: lN,
  each: iN,
  attr: dN,
  style: pN,
  property: xN,
  classed: _N,
  text: TN,
  html: zN,
  raise: ON,
  lower: HN,
  append: BN,
  insert: kN,
  remove: YN,
  clone: $N,
  datum: XN,
  on: FN,
  dispatch: WN,
  [Symbol.iterator]: eC
};
function Bn(t) {
  return typeof t == "string" ? new Un([[document.querySelector(t)]], [document.documentElement]) : new Un([[t]], Gb);
}
function nC(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ua(t, a) {
  if (t = nC(t), a === void 0 && (a = t.currentTarget), a) {
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
const aC = { passive: !1 }, So = { capture: !0, passive: !1 };
function vd(t) {
  t.stopImmediatePropagation();
}
function ar(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function qb(t) {
  var a = t.document.documentElement, i = Bn(t).on("dragstart.drag", ar, So);
  "onselectstart" in a ? i.on("selectstart.drag", ar, So) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function $b(t, a) {
  var i = t.document.documentElement, o = Bn(t).on("dragstart.drag", null);
  a && (o.on("click.drag", ar, So), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in i ? o.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
const Ws = (t) => () => t;
function Kd(t, {
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
Kd.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function lC(t) {
  return !t.ctrlKey && !t.button;
}
function iC() {
  return this.parentNode;
}
function rC(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function oC() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Xb() {
  var t = lC, a = iC, i = rC, o = oC, s = {}, u = qu("start", "drag", "end"), f = 0, h, p, g, y, m = 0;
  function v(z) {
    z.on("mousedown.drag", x).filter(o).on("touchstart.drag", T).on("touchmove.drag", M, aC).on("touchend.drag touchcancel.drag", L).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(z, Y) {
    if (!(y || !t.call(this, z, Y))) {
      var B = _(this, a.call(this, z, Y), z, Y, "mouse");
      B && (Bn(z.view).on("mousemove.drag", S, So).on("mouseup.drag", R, So), qb(z.view), vd(z), g = !1, h = z.clientX, p = z.clientY, B("start", z));
    }
  }
  function S(z) {
    if (ar(z), !g) {
      var Y = z.clientX - h, B = z.clientY - p;
      g = Y * Y + B * B > m;
    }
    s.mouse("drag", z);
  }
  function R(z) {
    Bn(z.view).on("mousemove.drag mouseup.drag", null), $b(z.view, g), ar(z), s.mouse("end", z);
  }
  function T(z, Y) {
    if (t.call(this, z, Y)) {
      var B = z.changedTouches, U = a.call(this, z, Y), A = B.length, K, J;
      for (K = 0; K < A; ++K)
        (J = _(this, U, z, Y, B[K].identifier, B[K])) && (vd(z), J("start", z, B[K]));
    }
  }
  function M(z) {
    var Y = z.changedTouches, B = Y.length, U, A;
    for (U = 0; U < B; ++U)
      (A = s[Y[U].identifier]) && (ar(z), A("drag", z, Y[U]));
  }
  function L(z) {
    var Y = z.changedTouches, B = Y.length, U, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), U = 0; U < B; ++U)
      (A = s[Y[U].identifier]) && (vd(z), A("end", z, Y[U]));
  }
  function _(z, Y, B, U, A, K) {
    var J = u.copy(), G = ua(K || B, Y), Q, re, j;
    if ((j = i.call(z, new Kd("beforestart", {
      sourceEvent: B,
      target: v,
      identifier: A,
      active: f,
      x: G[0],
      y: G[1],
      dx: 0,
      dy: 0,
      dispatch: J
    }), U)) != null)
      return Q = j.x - G[0] || 0, re = j.y - G[1] || 0, function Z(C, O, q) {
        var $ = G, ne;
        switch (C) {
          case "start":
            s[A] = Z, ne = f++;
            break;
          case "end":
            delete s[A], --f;
          // falls through
          case "drag":
            G = ua(q || O, Y), ne = f;
            break;
        }
        J.call(
          C,
          z,
          new Kd(C, {
            sourceEvent: O,
            subject: j,
            target: v,
            identifier: A,
            active: ne,
            x: G[0] + Q,
            y: G[1] + re,
            dx: G[0] - $[0],
            dy: G[1] - $[1],
            dispatch: J
          }),
          U
        );
      };
  }
  return v.filter = function(z) {
    return arguments.length ? (t = typeof z == "function" ? z : Ws(!!z), v) : t;
  }, v.container = function(z) {
    return arguments.length ? (a = typeof z == "function" ? z : Ws(z), v) : a;
  }, v.subject = function(z) {
    return arguments.length ? (i = typeof z == "function" ? z : Ws(z), v) : i;
  }, v.touchable = function(z) {
    return arguments.length ? (o = typeof z == "function" ? z : Ws(!!z), v) : o;
  }, v.on = function() {
    var z = u.on.apply(u, arguments);
    return z === u ? v : z;
  }, v.clickDistance = function(z) {
    return arguments.length ? (m = (z = +z) * z, v) : Math.sqrt(m);
  }, v;
}
function Th(t, a, i) {
  t.prototype = a.prototype = i, i.constructor = t;
}
function Zb(t, a) {
  var i = Object.create(t.prototype);
  for (var o in a) i[o] = a[o];
  return i;
}
function Ho() {
}
var wo = 0.7, Mu = 1 / wo, lr = "\\s*([+-]?\\d+)\\s*", Eo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ca = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", sC = /^#([0-9a-f]{3,8})$/, uC = new RegExp(`^rgb\\(${lr},${lr},${lr}\\)$`), cC = new RegExp(`^rgb\\(${Ca},${Ca},${Ca}\\)$`), fC = new RegExp(`^rgba\\(${lr},${lr},${lr},${Eo}\\)$`), dC = new RegExp(`^rgba\\(${Ca},${Ca},${Ca},${Eo}\\)$`), hC = new RegExp(`^hsl\\(${Eo},${Ca},${Ca}\\)$`), mC = new RegExp(`^hsla\\(${Eo},${Ca},${Ca},${Eo}\\)$`), by = {
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
Th(Ho, si, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xy,
  // Deprecated! Use color.formatHex.
  formatHex: xy,
  formatHex8: gC,
  formatHsl: pC,
  formatRgb: Sy,
  toString: Sy
});
function xy() {
  return this.rgb().formatHex();
}
function gC() {
  return this.rgb().formatHex8();
}
function pC() {
  return Qb(this).formatHsl();
}
function Sy() {
  return this.rgb().formatRgb();
}
function si(t) {
  var a, i;
  return t = (t + "").trim().toLowerCase(), (a = sC.exec(t)) ? (i = a[1].length, a = parseInt(a[1], 16), i === 6 ? wy(a) : i === 3 ? new _n(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : i === 8 ? eu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : i === 4 ? eu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = uC.exec(t)) ? new _n(a[1], a[2], a[3], 1) : (a = cC.exec(t)) ? new _n(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = fC.exec(t)) ? eu(a[1], a[2], a[3], a[4]) : (a = dC.exec(t)) ? eu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = hC.exec(t)) ? Ny(a[1], a[2] / 100, a[3] / 100, 1) : (a = mC.exec(t)) ? Ny(a[1], a[2] / 100, a[3] / 100, a[4]) : by.hasOwnProperty(t) ? wy(by[t]) : t === "transparent" ? new _n(NaN, NaN, NaN, 0) : null;
}
function wy(t) {
  return new _n(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function eu(t, a, i, o) {
  return o <= 0 && (t = a = i = NaN), new _n(t, a, i, o);
}
function yC(t) {
  return t instanceof Ho || (t = si(t)), t ? (t = t.rgb(), new _n(t.r, t.g, t.b, t.opacity)) : new _n();
}
function Fd(t, a, i, o) {
  return arguments.length === 1 ? yC(t) : new _n(t, a, i, o ?? 1);
}
function _n(t, a, i, o) {
  this.r = +t, this.g = +a, this.b = +i, this.opacity = +o;
}
Th(_n, Fd, Zb(Ho, {
  brighter(t) {
    return t = t == null ? Mu : Math.pow(Mu, t), new _n(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? wo : Math.pow(wo, t), new _n(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new _n(ii(this.r), ii(this.g), ii(this.b), Tu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ey,
  // Deprecated! Use color.formatHex.
  formatHex: Ey,
  formatHex8: vC,
  formatRgb: _y,
  toString: _y
}));
function Ey() {
  return `#${li(this.r)}${li(this.g)}${li(this.b)}`;
}
function vC() {
  return `#${li(this.r)}${li(this.g)}${li(this.b)}${li((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function _y() {
  const t = Tu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ii(this.r)}, ${ii(this.g)}, ${ii(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Tu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ii(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function li(t) {
  return t = ii(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ny(t, a, i, o) {
  return o <= 0 ? t = a = i = NaN : i <= 0 || i >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ca(t, a, i, o);
}
function Qb(t) {
  if (t instanceof ca) return new ca(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ho || (t = si(t)), !t) return new ca();
  if (t instanceof ca) return t;
  t = t.rgb();
  var a = t.r / 255, i = t.g / 255, o = t.b / 255, s = Math.min(a, i, o), u = Math.max(a, i, o), f = NaN, h = u - s, p = (u + s) / 2;
  return h ? (a === u ? f = (i - o) / h + (i < o) * 6 : i === u ? f = (o - a) / h + 2 : f = (a - i) / h + 4, h /= p < 0.5 ? u + s : 2 - u - s, f *= 60) : h = p > 0 && p < 1 ? 0 : f, new ca(f, h, p, t.opacity);
}
function bC(t, a, i, o) {
  return arguments.length === 1 ? Qb(t) : new ca(t, a, i, o ?? 1);
}
function ca(t, a, i, o) {
  this.h = +t, this.s = +a, this.l = +i, this.opacity = +o;
}
Th(ca, bC, Zb(Ho, {
  brighter(t) {
    return t = t == null ? Mu : Math.pow(Mu, t), new ca(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? wo : Math.pow(wo, t), new ca(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, o = i + (i < 0.5 ? i : 1 - i) * a, s = 2 * i - o;
    return new _n(
      bd(t >= 240 ? t - 240 : t + 120, s, o),
      bd(t, s, o),
      bd(t < 120 ? t + 240 : t - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new ca(Cy(this.h), tu(this.s), tu(this.l), Tu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Tu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Cy(this.h)}, ${tu(this.s) * 100}%, ${tu(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Cy(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function tu(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function bd(t, a, i) {
  return (t < 60 ? a + (i - a) * t / 60 : t < 180 ? i : t < 240 ? a + (i - a) * (240 - t) / 60 : a) * 255;
}
const Rh = (t) => () => t;
function xC(t, a) {
  return function(i) {
    return t + i * a;
  };
}
function SC(t, a, i) {
  return t = Math.pow(t, i), a = Math.pow(a, i) - t, i = 1 / i, function(o) {
    return Math.pow(t + o * a, i);
  };
}
function wC(t) {
  return (t = +t) == 1 ? Ib : function(a, i) {
    return i - a ? SC(a, i, t) : Rh(isNaN(a) ? i : a);
  };
}
function Ib(t, a) {
  var i = a - t;
  return i ? xC(t, i) : Rh(isNaN(t) ? a : t);
}
const Ru = (function t(a) {
  var i = wC(a);
  function o(s, u) {
    var f = i((s = Fd(s)).r, (u = Fd(u)).r), h = i(s.g, u.g), p = i(s.b, u.b), g = Ib(s.opacity, u.opacity);
    return function(y) {
      return s.r = f(y), s.g = h(y), s.b = p(y), s.opacity = g(y), s + "";
    };
  }
  return o.gamma = t, o;
})(1);
function EC(t, a) {
  a || (a = []);
  var i = t ? Math.min(a.length, t.length) : 0, o = a.slice(), s;
  return function(u) {
    for (s = 0; s < i; ++s) o[s] = t[s] * (1 - u) + a[s] * u;
    return o;
  };
}
function _C(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function NC(t, a) {
  var i = a ? a.length : 0, o = t ? Math.min(i, t.length) : 0, s = new Array(o), u = new Array(i), f;
  for (f = 0; f < o; ++f) s[f] = yo(t[f], a[f]);
  for (; f < i; ++f) u[f] = a[f];
  return function(h) {
    for (f = 0; f < o; ++f) u[f] = s[f](h);
    return u;
  };
}
function CC(t, a) {
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
function MC(t, a) {
  var i = {}, o = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? i[s] = yo(t[s], a[s]) : o[s] = a[s];
  return function(u) {
    for (s in i) o[s] = i[s](u);
    return o;
  };
}
var Jd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, xd = new RegExp(Jd.source, "g");
function TC(t) {
  return function() {
    return t;
  };
}
function RC(t) {
  return function(a) {
    return t(a) + "";
  };
}
function Kb(t, a) {
  var i = Jd.lastIndex = xd.lastIndex = 0, o, s, u, f = -1, h = [], p = [];
  for (t = t + "", a = a + ""; (o = Jd.exec(t)) && (s = xd.exec(a)); )
    (u = s.index) > i && (u = a.slice(i, u), h[f] ? h[f] += u : h[++f] = u), (o = o[0]) === (s = s[0]) ? h[f] ? h[f] += s : h[++f] = s : (h[++f] = null, p.push({ i: f, x: Na(o, s) })), i = xd.lastIndex;
  return i < a.length && (u = a.slice(i), h[f] ? h[f] += u : h[++f] = u), h.length < 2 ? p[0] ? RC(p[0].x) : TC(a) : (a = p.length, function(g) {
    for (var y = 0, m; y < a; ++y) h[(m = p[y]).i] = m.x(g);
    return h.join("");
  });
}
function yo(t, a) {
  var i = typeof a, o;
  return a == null || i === "boolean" ? Rh(a) : (i === "number" ? Na : i === "string" ? (o = si(a)) ? (a = o, Ru) : Kb : a instanceof si ? Ru : a instanceof Date ? CC : _C(a) ? EC : Array.isArray(a) ? NC : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? MC : Na)(t, a);
}
var My = 180 / Math.PI, Pd = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Fb(t, a, i, o, s, u) {
  var f, h, p;
  return (f = Math.sqrt(t * t + a * a)) && (t /= f, a /= f), (p = t * i + a * o) && (i -= t * p, o -= a * p), (h = Math.sqrt(i * i + o * o)) && (i /= h, o /= h, p /= h), t * o < a * i && (t = -t, a = -a, p = -p, f = -f), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * My,
    skewX: Math.atan(p) * My,
    scaleX: f,
    scaleY: h
  };
}
var nu;
function AC(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? Pd : Fb(a.a, a.b, a.c, a.d, a.e, a.f);
}
function DC(t) {
  return t == null || (nu || (nu = document.createElementNS("http://www.w3.org/2000/svg", "g")), nu.setAttribute("transform", t), !(t = nu.transform.baseVal.consolidate())) ? Pd : (t = t.matrix, Fb(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Jb(t, a, i, o) {
  function s(g) {
    return g.length ? g.pop() + " " : "";
  }
  function u(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var R = x.push("translate(", null, a, null, i);
      S.push({ i: R - 4, x: Na(g, m) }, { i: R - 2, x: Na(y, v) });
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
      var R = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: R - 4, x: Na(g, m) }, { i: R - 2, x: Na(y, v) });
    } else (m !== 1 || v !== 1) && x.push(s(x) + "scale(" + m + "," + v + ")");
  }
  return function(g, y) {
    var m = [], v = [];
    return g = t(g), y = t(y), u(g.translateX, g.translateY, y.translateX, y.translateY, m, v), f(g.rotate, y.rotate, m, v), h(g.skewX, y.skewX, m, v), p(g.scaleX, g.scaleY, y.scaleX, y.scaleY, m, v), g = y = null, function(x) {
      for (var S = -1, R = v.length, T; ++S < R; ) m[(T = v[S]).i] = T.x(x);
      return m.join("");
    };
  };
}
var zC = Jb(AC, "px, ", "px)", "deg)"), jC = Jb(DC, ", ", ")", ")"), OC = 1e-12;
function Ty(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function LC(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function HC(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const vu = (function t(a, i, o) {
  function s(u, f) {
    var h = u[0], p = u[1], g = u[2], y = f[0], m = f[1], v = f[2], x = y - h, S = m - p, R = x * x + S * S, T, M;
    if (R < OC)
      M = Math.log(v / g) / a, T = function(U) {
        return [
          h + U * x,
          p + U * S,
          g * Math.exp(a * U * M)
        ];
      };
    else {
      var L = Math.sqrt(R), _ = (v * v - g * g + o * R) / (2 * g * i * L), z = (v * v - g * g - o * R) / (2 * v * i * L), Y = Math.log(Math.sqrt(_ * _ + 1) - _), B = Math.log(Math.sqrt(z * z + 1) - z);
      M = (B - Y) / a, T = function(U) {
        var A = U * M, K = Ty(Y), J = g / (i * L) * (K * HC(a * A + Y) - LC(Y));
        return [
          h + J * x,
          p + J * S,
          g * K / Ty(a * A + Y)
        ];
      };
    }
    return T.duration = M * 1e3 * a / Math.SQRT2, T;
  }
  return s.rho = function(u) {
    var f = Math.max(1e-3, +u), h = f * f, p = h * h;
    return t(f, h, p);
  }, s;
})(Math.SQRT2, 2, 4);
var or = 0, ho = 0, oo = 0, Pb = 1e3, Au, mo, Du = 0, ui = 0, Xu = 0, _o = typeof performance == "object" && performance.now ? performance : Date, Wb = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ah() {
  return ui || (Wb(BC), ui = _o.now() + Xu);
}
function BC() {
  ui = 0;
}
function zu() {
  this._call = this._time = this._next = null;
}
zu.prototype = e1.prototype = {
  constructor: zu,
  restart: function(t, a, i) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Ah() : +i) + (a == null ? 0 : +a), !this._next && mo !== this && (mo ? mo._next = this : Au = this, mo = this), this._call = t, this._time = i, Wd();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Wd());
  }
};
function e1(t, a, i) {
  var o = new zu();
  return o.restart(t, a, i), o;
}
function UC() {
  Ah(), ++or;
  for (var t = Au, a; t; )
    (a = ui - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --or;
}
function Ry() {
  ui = (Du = _o.now()) + Xu, or = ho = 0;
  try {
    UC();
  } finally {
    or = 0, VC(), ui = 0;
  }
}
function kC() {
  var t = _o.now(), a = t - Du;
  a > Pb && (Xu -= a, Du = t);
}
function VC() {
  for (var t, a = Au, i, o = 1 / 0; a; )
    a._call ? (o > a._time && (o = a._time), t = a, a = a._next) : (i = a._next, a._next = null, a = t ? t._next = i : Au = i);
  mo = t, Wd(o);
}
function Wd(t) {
  if (!or) {
    ho && (ho = clearTimeout(ho));
    var a = t - ui;
    a > 24 ? (t < 1 / 0 && (ho = setTimeout(Ry, t - _o.now() - Xu)), oo && (oo = clearInterval(oo))) : (oo || (Du = _o.now(), oo = setInterval(kC, Pb)), or = 1, Wb(Ry));
  }
}
function Ay(t, a, i) {
  var o = new zu();
  return a = a == null ? 0 : +a, o.restart((s) => {
    o.stop(), t(s + a);
  }, a, i), o;
}
var YC = qu("start", "end", "cancel", "interrupt"), GC = [], t1 = 0, Dy = 1, eh = 2, bu = 3, zy = 4, th = 5, xu = 6;
function Zu(t, a, i, o, s, u) {
  var f = t.__transition;
  if (!f) t.__transition = {};
  else if (i in f) return;
  qC(t, i, {
    name: a,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: YC,
    tween: GC,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: t1
  });
}
function Dh(t, a) {
  var i = ga(t, a);
  if (i.state > t1) throw new Error("too late; already scheduled");
  return i;
}
function Aa(t, a) {
  var i = ga(t, a);
  if (i.state > bu) throw new Error("too late; already running");
  return i;
}
function ga(t, a) {
  var i = t.__transition;
  if (!i || !(i = i[a])) throw new Error("transition not found");
  return i;
}
function qC(t, a, i) {
  var o = t.__transition, s;
  o[a] = i, i.timer = e1(u, 0, i.time);
  function u(g) {
    i.state = Dy, i.timer.restart(f, i.delay, i.time), i.delay <= g && f(g - i.delay);
  }
  function f(g) {
    var y, m, v, x;
    if (i.state !== Dy) return p();
    for (y in o)
      if (x = o[y], x.name === i.name) {
        if (x.state === bu) return Ay(f);
        x.state === zy ? (x.state = xu, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete o[y]) : +y < a && (x.state = xu, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete o[y]);
      }
    if (Ay(function() {
      i.state === bu && (i.state = zy, i.timer.restart(h, i.delay, i.time), h(g));
    }), i.state = eh, i.on.call("start", t, t.__data__, i.index, i.group), i.state === eh) {
      for (i.state = bu, s = new Array(v = i.tween.length), y = 0, m = -1; y < v; ++y)
        (x = i.tween[y].value.call(t, t.__data__, i.index, i.group)) && (s[++m] = x);
      s.length = m + 1;
    }
  }
  function h(g) {
    for (var y = g < i.duration ? i.ease.call(null, g / i.duration) : (i.timer.restart(p), i.state = th, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(t, y);
    i.state === th && (i.on.call("end", t, t.__data__, i.index, i.group), p());
  }
  function p() {
    i.state = xu, i.timer.stop(), delete o[a];
    for (var g in o) return;
    delete t.__transition;
  }
}
function Su(t, a) {
  var i = t.__transition, o, s, u = !0, f;
  if (i) {
    a = a == null ? null : a + "";
    for (f in i) {
      if ((o = i[f]).name !== a) {
        u = !1;
        continue;
      }
      s = o.state > eh && o.state < th, o.state = xu, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete i[f];
    }
    u && delete t.__transition;
  }
}
function $C(t) {
  return this.each(function() {
    Su(this, t);
  });
}
function XC(t, a) {
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
function ZC(t, a, i) {
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
function QC(t, a) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = ga(this.node(), i).tween, s = 0, u = o.length, f; s < u; ++s)
      if ((f = o[s]).name === t)
        return f.value;
    return null;
  }
  return this.each((a == null ? XC : ZC)(i, t, a));
}
function zh(t, a, i) {
  var o = t._id;
  return t.each(function() {
    var s = Aa(this, o);
    (s.value || (s.value = {}))[a] = i.apply(this, arguments);
  }), function(s) {
    return ga(s, o).value[a];
  };
}
function n1(t, a) {
  var i;
  return (typeof a == "number" ? Na : a instanceof si ? Ru : (i = si(a)) ? (a = i, Ru) : Kb)(t, a);
}
function IC(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function KC(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function FC(t, a, i) {
  var o, s = i + "", u;
  return function() {
    var f = this.getAttribute(t);
    return f === s ? null : f === o ? u : u = a(o = f, i);
  };
}
function JC(t, a, i) {
  var o, s = i + "", u;
  return function() {
    var f = this.getAttributeNS(t.space, t.local);
    return f === s ? null : f === o ? u : u = a(o = f, i);
  };
}
function PC(t, a, i) {
  var o, s, u;
  return function() {
    var f, h = i(this), p;
    return h == null ? void this.removeAttribute(t) : (f = this.getAttribute(t), p = h + "", f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h)));
  };
}
function WC(t, a, i) {
  var o, s, u;
  return function() {
    var f, h = i(this), p;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (f = this.getAttributeNS(t.space, t.local), p = h + "", f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h)));
  };
}
function eM(t, a) {
  var i = $u(t), o = i === "transform" ? jC : n1;
  return this.attrTween(t, typeof a == "function" ? (i.local ? WC : PC)(i, o, zh(this, "attr." + t, a)) : a == null ? (i.local ? KC : IC)(i) : (i.local ? JC : FC)(i, o, a));
}
function tM(t, a) {
  return function(i) {
    this.setAttribute(t, a.call(this, i));
  };
}
function nM(t, a) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, a.call(this, i));
  };
}
function aM(t, a) {
  var i, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (i = (o = u) && nM(t, u)), i;
  }
  return s._value = a, s;
}
function lM(t, a) {
  var i, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (i = (o = u) && tM(t, u)), i;
  }
  return s._value = a, s;
}
function iM(t, a) {
  var i = "attr." + t;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (a == null) return this.tween(i, null);
  if (typeof a != "function") throw new Error();
  var o = $u(t);
  return this.tween(i, (o.local ? aM : lM)(o, a));
}
function rM(t, a) {
  return function() {
    Dh(this, t).delay = +a.apply(this, arguments);
  };
}
function oM(t, a) {
  return a = +a, function() {
    Dh(this, t).delay = a;
  };
}
function sM(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? rM : oM)(a, t)) : ga(this.node(), a).delay;
}
function uM(t, a) {
  return function() {
    Aa(this, t).duration = +a.apply(this, arguments);
  };
}
function cM(t, a) {
  return a = +a, function() {
    Aa(this, t).duration = a;
  };
}
function fM(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? uM : cM)(a, t)) : ga(this.node(), a).duration;
}
function dM(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Aa(this, t).ease = a;
  };
}
function hM(t) {
  var a = this._id;
  return arguments.length ? this.each(dM(a, t)) : ga(this.node(), a).ease;
}
function mM(t, a) {
  return function() {
    var i = a.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Aa(this, t).ease = i;
  };
}
function gM(t) {
  if (typeof t != "function") throw new Error();
  return this.each(mM(this._id, t));
}
function pM(t) {
  typeof t != "function" && (t = jb(t));
  for (var a = this._groups, i = a.length, o = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], f = u.length, h = o[s] = [], p, g = 0; g < f; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Wa(o, this._parents, this._name, this._id);
}
function yM(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, i = t._groups, o = a.length, s = i.length, u = Math.min(o, s), f = new Array(o), h = 0; h < u; ++h)
    for (var p = a[h], g = i[h], y = p.length, m = f[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || g[x]) && (m[x] = v);
  for (; h < o; ++h)
    f[h] = a[h];
  return new Wa(f, this._parents, this._name, this._id);
}
function vM(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var i = a.indexOf(".");
    return i >= 0 && (a = a.slice(0, i)), !a || a === "start";
  });
}
function bM(t, a, i) {
  var o, s, u = vM(a) ? Dh : Aa;
  return function() {
    var f = u(this, t), h = f.on;
    h !== o && (s = (o = h).copy()).on(a, i), f.on = s;
  };
}
function xM(t, a) {
  var i = this._id;
  return arguments.length < 2 ? ga(this.node(), i).on.on(t) : this.each(bM(i, t, a));
}
function SM(t) {
  return function() {
    var a = this.parentNode;
    for (var i in this.__transition) if (+i !== t) return;
    a && a.removeChild(this);
  };
}
function wM() {
  return this.on("end.remove", SM(this._id));
}
function EM(t) {
  var a = this._name, i = this._id;
  typeof t != "function" && (t = Ch(t));
  for (var o = this._groups, s = o.length, u = new Array(s), f = 0; f < s; ++f)
    for (var h = o[f], p = h.length, g = u[f] = new Array(p), y, m, v = 0; v < p; ++v)
      (y = h[v]) && (m = t.call(y, y.__data__, v, h)) && ("__data__" in y && (m.__data__ = y.__data__), g[v] = m, Zu(g[v], a, i, v, g, ga(y, i)));
  return new Wa(u, this._parents, a, i);
}
function _M(t) {
  var a = this._name, i = this._id;
  typeof t != "function" && (t = zb(t));
  for (var o = this._groups, s = o.length, u = [], f = [], h = 0; h < s; ++h)
    for (var p = o[h], g = p.length, y, m = 0; m < g; ++m)
      if (y = p[m]) {
        for (var v = t.call(y, y.__data__, m, p), x, S = ga(y, i), R = 0, T = v.length; R < T; ++R)
          (x = v[R]) && Zu(x, a, i, R, v, S);
        u.push(v), f.push(y);
      }
  return new Wa(u, f, a, i);
}
var NM = Lo.prototype.constructor;
function CM() {
  return new NM(this._groups, this._parents);
}
function MM(t, a) {
  var i, o, s;
  return function() {
    var u = rr(this, t), f = (this.style.removeProperty(t), rr(this, t));
    return u === f ? null : u === i && f === o ? s : s = a(i = u, o = f);
  };
}
function a1(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function TM(t, a, i) {
  var o, s = i + "", u;
  return function() {
    var f = rr(this, t);
    return f === s ? null : f === o ? u : u = a(o = f, i);
  };
}
function RM(t, a, i) {
  var o, s, u;
  return function() {
    var f = rr(this, t), h = i(this), p = h + "";
    return h == null && (p = h = (this.style.removeProperty(t), rr(this, t))), f === p ? null : f === o && p === s ? u : (s = p, u = a(o = f, h));
  };
}
function AM(t, a) {
  var i, o, s, u = "style." + a, f = "end." + u, h;
  return function() {
    var p = Aa(this, t), g = p.on, y = p.value[u] == null ? h || (h = a1(a)) : void 0;
    (g !== i || s !== y) && (o = (i = g).copy()).on(f, s = y), p.on = o;
  };
}
function DM(t, a, i) {
  var o = (t += "") == "transform" ? zC : n1;
  return a == null ? this.styleTween(t, MM(t, o)).on("end.style." + t, a1(t)) : typeof a == "function" ? this.styleTween(t, RM(t, o, zh(this, "style." + t, a))).each(AM(this._id, t)) : this.styleTween(t, TM(t, o, a), i).on("end.style." + t, null);
}
function zM(t, a, i) {
  return function(o) {
    this.style.setProperty(t, a.call(this, o), i);
  };
}
function jM(t, a, i) {
  var o, s;
  function u() {
    var f = a.apply(this, arguments);
    return f !== s && (o = (s = f) && zM(t, f, i)), o;
  }
  return u._value = a, u;
}
function OM(t, a, i) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (a == null) return this.tween(o, null);
  if (typeof a != "function") throw new Error();
  return this.tween(o, jM(t, a, i ?? ""));
}
function LM(t) {
  return function() {
    this.textContent = t;
  };
}
function HM(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function BM(t) {
  return this.tween("text", typeof t == "function" ? HM(zh(this, "text", t)) : LM(t == null ? "" : t + ""));
}
function UM(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function kM(t) {
  var a, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (a = (i = s) && UM(s)), a;
  }
  return o._value = t, o;
}
function VM(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, kM(t));
}
function YM() {
  for (var t = this._name, a = this._id, i = l1(), o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      if (p = f[g]) {
        var y = ga(p, a);
        Zu(p, t, i, g, f, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new Wa(o, this._parents, t, i);
}
function GM() {
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
var qM = 0;
function Wa(t, a, i, o) {
  this._groups = t, this._parents = a, this._name = i, this._id = o;
}
function l1() {
  return ++qM;
}
var Ka = Lo.prototype;
Wa.prototype = {
  constructor: Wa,
  select: EM,
  selectAll: _M,
  selectChild: Ka.selectChild,
  selectChildren: Ka.selectChildren,
  filter: pM,
  merge: yM,
  selection: CM,
  transition: YM,
  call: Ka.call,
  nodes: Ka.nodes,
  node: Ka.node,
  size: Ka.size,
  empty: Ka.empty,
  each: Ka.each,
  on: xM,
  attr: eM,
  attrTween: iM,
  style: DM,
  styleTween: OM,
  text: BM,
  textTween: VM,
  remove: wM,
  tween: QC,
  delay: sM,
  duration: fM,
  ease: hM,
  easeVarying: gM,
  end: GM,
  [Symbol.iterator]: Ka[Symbol.iterator]
};
function $M(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var XM = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: $M
};
function ZM(t, a) {
  for (var i; !(i = t.__transition) || !(i = i[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return i;
}
function QM(t) {
  var a, i;
  t instanceof Wa ? (a = t._id, t = t._name) : (a = l1(), (i = XM).time = Ah(), t = t == null ? null : t + "");
  for (var o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var f = o[u], h = f.length, p, g = 0; g < h; ++g)
      (p = f[g]) && Zu(p, t, a, g, f, i || ZM(p, a));
  return new Wa(o, this._parents, t, a);
}
Lo.prototype.interrupt = $C;
Lo.prototype.transition = QM;
const au = (t) => () => t;
function IM(t, {
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
var Qu = new Fa(1, 0, 0);
i1.prototype = Fa.prototype;
function i1(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Qu;
  return t.__zoom;
}
function Sd(t) {
  t.stopImmediatePropagation();
}
function so(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function KM(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function FM() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function jy() {
  return this.__zoom || Qu;
}
function JM(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function PM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function WM(t, a, i) {
  var o = t.invertX(a[0][0]) - i[0][0], s = t.invertX(a[1][0]) - i[1][0], u = t.invertY(a[0][1]) - i[0][1], f = t.invertY(a[1][1]) - i[1][1];
  return t.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    f > u ? (u + f) / 2 : Math.min(0, u) || Math.max(0, f)
  );
}
function r1() {
  var t = KM, a = FM, i = WM, o = JM, s = PM, u = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, p = vu, g = qu("start", "zoom", "end"), y, m, v, x = 500, S = 150, R = 0, T = 10;
  function M(j) {
    j.property("__zoom", jy).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", K).on("dblclick.zoom", J).filter(s).on("touchstart.zoom", G).on("touchmove.zoom", Q).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  M.transform = function(j, Z, C, O) {
    var q = j.selection ? j.selection() : j;
    q.property("__zoom", jy), j !== q ? Y(j, Z, C, O) : q.interrupt().each(function() {
      B(this, arguments).event(O).start().zoom(null, typeof Z == "function" ? Z.apply(this, arguments) : Z).end();
    });
  }, M.scaleBy = function(j, Z, C, O) {
    M.scaleTo(j, function() {
      var q = this.__zoom.k, $ = typeof Z == "function" ? Z.apply(this, arguments) : Z;
      return q * $;
    }, C, O);
  }, M.scaleTo = function(j, Z, C, O) {
    M.transform(j, function() {
      var q = a.apply(this, arguments), $ = this.__zoom, ne = C == null ? z(q) : typeof C == "function" ? C.apply(this, arguments) : C, D = $.invert(ne), V = typeof Z == "function" ? Z.apply(this, arguments) : Z;
      return i(_(L($, V), ne, D), q, f);
    }, C, O);
  }, M.translateBy = function(j, Z, C, O) {
    M.transform(j, function() {
      return i(this.__zoom.translate(
        typeof Z == "function" ? Z.apply(this, arguments) : Z,
        typeof C == "function" ? C.apply(this, arguments) : C
      ), a.apply(this, arguments), f);
    }, null, O);
  }, M.translateTo = function(j, Z, C, O, q) {
    M.transform(j, function() {
      var $ = a.apply(this, arguments), ne = this.__zoom, D = O == null ? z($) : typeof O == "function" ? O.apply(this, arguments) : O;
      return i(Qu.translate(D[0], D[1]).scale(ne.k).translate(
        typeof Z == "function" ? -Z.apply(this, arguments) : -Z,
        typeof C == "function" ? -C.apply(this, arguments) : -C
      ), $, f);
    }, O, q);
  };
  function L(j, Z) {
    return Z = Math.max(u[0], Math.min(u[1], Z)), Z === j.k ? j : new Fa(Z, j.x, j.y);
  }
  function _(j, Z, C) {
    var O = Z[0] - C[0] * j.k, q = Z[1] - C[1] * j.k;
    return O === j.x && q === j.y ? j : new Fa(j.k, O, q);
  }
  function z(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function Y(j, Z, C, O) {
    j.on("start.zoom", function() {
      B(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var q = this, $ = arguments, ne = B(q, $).event(O), D = a.apply(q, $), V = C == null ? z(D) : typeof C == "function" ? C.apply(q, $) : C, F = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), le = q.__zoom, se = typeof Z == "function" ? Z.apply(q, $) : Z, me = p(le.invert(V).concat(F / le.k), se.invert(V).concat(F / se.k));
      return function(ge) {
        if (ge === 1) ge = se;
        else {
          var ee = me(ge), pe = F / ee[2];
          ge = new Fa(pe, V[0] - ee[0] * pe, V[1] - ee[1] * pe);
        }
        ne.zoom(null, ge);
      };
    });
  }
  function B(j, Z, C) {
    return !C && j.__zooming || new U(j, Z);
  }
  function U(j, Z) {
    this.that = j, this.args = Z, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, Z), this.taps = 0;
  }
  U.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, Z) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = Z.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = Z.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = Z.invert(this.touch1[0])), this.that.__zoom = Z, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var Z = Bn(this.that).datum();
      g.call(
        j,
        this.that,
        new IM(j, {
          sourceEvent: this.sourceEvent,
          target: M,
          transform: this.that.__zoom,
          dispatch: g
        }),
        Z
      );
    }
  };
  function A(j, ...Z) {
    if (!t.apply(this, arguments)) return;
    var C = B(this, Z).event(j), O = this.__zoom, q = Math.max(u[0], Math.min(u[1], O.k * Math.pow(2, o.apply(this, arguments)))), $ = ua(j);
    if (C.wheel)
      (C.mouse[0][0] !== $[0] || C.mouse[0][1] !== $[1]) && (C.mouse[1] = O.invert(C.mouse[0] = $)), clearTimeout(C.wheel);
    else {
      if (O.k === q) return;
      C.mouse = [$, O.invert($)], Su(this), C.start();
    }
    so(j), C.wheel = setTimeout(ne, S), C.zoom("mouse", i(_(L(O, q), C.mouse[0], C.mouse[1]), C.extent, f));
    function ne() {
      C.wheel = null, C.end();
    }
  }
  function K(j, ...Z) {
    if (v || !t.apply(this, arguments)) return;
    var C = j.currentTarget, O = B(this, Z, !0).event(j), q = Bn(j.view).on("mousemove.zoom", V, !0).on("mouseup.zoom", F, !0), $ = ua(j, C), ne = j.clientX, D = j.clientY;
    qb(j.view), Sd(j), O.mouse = [$, this.__zoom.invert($)], Su(this), O.start();
    function V(le) {
      if (so(le), !O.moved) {
        var se = le.clientX - ne, me = le.clientY - D;
        O.moved = se * se + me * me > R;
      }
      O.event(le).zoom("mouse", i(_(O.that.__zoom, O.mouse[0] = ua(le, C), O.mouse[1]), O.extent, f));
    }
    function F(le) {
      q.on("mousemove.zoom mouseup.zoom", null), $b(le.view, O.moved), so(le), O.event(le).end();
    }
  }
  function J(j, ...Z) {
    if (t.apply(this, arguments)) {
      var C = this.__zoom, O = ua(j.changedTouches ? j.changedTouches[0] : j, this), q = C.invert(O), $ = C.k * (j.shiftKey ? 0.5 : 2), ne = i(_(L(C, $), O, q), a.apply(this, Z), f);
      so(j), h > 0 ? Bn(this).transition().duration(h).call(Y, ne, O, j) : Bn(this).call(M.transform, ne, O, j);
    }
  }
  function G(j, ...Z) {
    if (t.apply(this, arguments)) {
      var C = j.touches, O = C.length, q = B(this, Z, j.changedTouches.length === O).event(j), $, ne, D, V;
      for (Sd(j), ne = 0; ne < O; ++ne)
        D = C[ne], V = ua(D, this), V = [V, this.__zoom.invert(V), D.identifier], q.touch0 ? !q.touch1 && q.touch0[2] !== V[2] && (q.touch1 = V, q.taps = 0) : (q.touch0 = V, $ = !0, q.taps = 1 + !!y);
      y && (y = clearTimeout(y)), $ && (q.taps < 2 && (m = V[0], y = setTimeout(function() {
        y = null;
      }, x)), Su(this), q.start());
    }
  }
  function Q(j, ...Z) {
    if (this.__zooming) {
      var C = B(this, Z).event(j), O = j.changedTouches, q = O.length, $, ne, D, V;
      for (so(j), $ = 0; $ < q; ++$)
        ne = O[$], D = ua(ne, this), C.touch0 && C.touch0[2] === ne.identifier ? C.touch0[0] = D : C.touch1 && C.touch1[2] === ne.identifier && (C.touch1[0] = D);
      if (ne = C.that.__zoom, C.touch1) {
        var F = C.touch0[0], le = C.touch0[1], se = C.touch1[0], me = C.touch1[1], ge = (ge = se[0] - F[0]) * ge + (ge = se[1] - F[1]) * ge, ee = (ee = me[0] - le[0]) * ee + (ee = me[1] - le[1]) * ee;
        ne = L(ne, Math.sqrt(ge / ee)), D = [(F[0] + se[0]) / 2, (F[1] + se[1]) / 2], V = [(le[0] + me[0]) / 2, (le[1] + me[1]) / 2];
      } else if (C.touch0) D = C.touch0[0], V = C.touch0[1];
      else return;
      C.zoom("touch", i(_(ne, D, V), C.extent, f));
    }
  }
  function re(j, ...Z) {
    if (this.__zooming) {
      var C = B(this, Z).event(j), O = j.changedTouches, q = O.length, $, ne;
      for (Sd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), $ = 0; $ < q; ++$)
        ne = O[$], C.touch0 && C.touch0[2] === ne.identifier ? delete C.touch0 : C.touch1 && C.touch1[2] === ne.identifier && delete C.touch1;
      if (C.touch1 && !C.touch0 && (C.touch0 = C.touch1, delete C.touch1), C.touch0) C.touch0[1] = this.__zoom.invert(C.touch0[0]);
      else if (C.end(), C.taps === 2 && (ne = ua(ne, this), Math.hypot(m[0] - ne[0], m[1] - ne[1]) < T)) {
        var D = Bn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return M.wheelDelta = function(j) {
    return arguments.length ? (o = typeof j == "function" ? j : au(+j), M) : o;
  }, M.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : au(!!j), M) : t;
  }, M.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : au(!!j), M) : s;
  }, M.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : au([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), M) : a;
  }, M.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], M) : [u[0], u[1]];
  }, M.translateExtent = function(j) {
    return arguments.length ? (f[0][0] = +j[0][0], f[1][0] = +j[1][0], f[0][1] = +j[0][1], f[1][1] = +j[1][1], M) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, M.constrain = function(j) {
    return arguments.length ? (i = j, M) : i;
  }, M.duration = function(j) {
    return arguments.length ? (h = +j, M) : h;
  }, M.interpolate = function(j) {
    return arguments.length ? (p = j, M) : p;
  }, M.on = function() {
    var j = g.on.apply(g, arguments);
    return j === g ? M : j;
  }, M.clickDistance = function(j) {
    return arguments.length ? (R = (j = +j) * j, M) : Math.sqrt(R);
  }, M.tapDistance = function(j) {
    return arguments.length ? (T = +j, M) : T;
  }, M;
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
}, No = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], o1 = ["Enter", " ", "Escape"], s1 = {
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
var sr;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(sr || (sr = {}));
var ri;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(ri || (ri = {}));
var Co;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Co || (Co = {}));
const u1 = {
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
var Ll;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Ll || (Ll = {}));
var ju;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(ju || (ju = {}));
var Te;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(Te || (Te = {}));
const Oy = {
  [Te.Left]: Te.Right,
  [Te.Right]: Te.Left,
  [Te.Top]: Te.Bottom,
  [Te.Bottom]: Te.Top
};
function c1(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const f1 = (t) => "id" in t && "source" in t && "target" in t, eT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), jh = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Bo = (t, a = [0, 0]) => {
  const { width: i, height: o } = tl(t), s = t.origin ?? a, u = i * s[0], f = o * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - f
  };
}, tT = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = t.reduce((o, s) => {
    const u = typeof s == "string";
    let f = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (f = u ? a.nodeLookup.get(s) : jh(s) ? s : a.nodeLookup.get(s.id));
    const h = f ? Ou(f, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Iu(o, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Ku(i);
}, Uo = (t, a = {}) => {
  let i = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (i = Iu(i, Ou(s)), o = !0);
  }), o ? Ku(i) : { x: 0, y: 0, width: 0, height: 0 };
}, Oh = (t, a, [i, o, s] = [0, 0, 1], u = !1, f = !1) => {
  const h = (a.x - i) / s, p = (a.y - o) / s, g = a.width / s, y = a.height / s, m = [];
  for (const v of t.values()) {
    const { measured: x, selectable: S = !0, hidden: R = !1 } = v;
    if (f && !S || R)
      continue;
    const T = x.width ?? v.width ?? v.initialWidth ?? 0, M = x.height ?? v.height ?? v.initialHeight ?? 0, { x: L, y: _ } = v.internals.positionAbsolute, z = g1(h, p, g, y, L, _, T, M), Y = T * M, B = u && z > 0;
    (!v.internals.handleBounds || B || z >= Y || v.dragging) && m.push(v);
  }
  return m;
}, nT = (t, a) => {
  const i = /* @__PURE__ */ new Set();
  return t.forEach((o) => {
    i.add(o.id);
  }), a.filter((o) => i.has(o.source) || i.has(o.target));
};
function aT(t, a) {
  const i = /* @__PURE__ */ new Map(), o = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!o || o.has(s.id)) && i.set(s.id, s);
  }), i;
}
async function lT({ nodes: t, width: a, height: i, panZoom: o, minZoom: s, maxZoom: u }, f) {
  if (t.size === 0)
    return !0;
  const h = aT(t, f), p = Uo(h), g = Hh(p, a, i, f?.minZoom ?? s, f?.maxZoom ?? u, f?.padding ?? 0.1);
  return await o.setViewport(g, {
    duration: f?.duration,
    ease: f?.ease,
    interpolate: f?.interpolate
  }), !0;
}
function d1({ nodeId: t, nextPosition: a, nodeLookup: i, nodeOrigin: o = [0, 0], nodeExtent: s, onError: u }) {
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
  else h && fi(f.extent) && (m = [
    [f.extent[0][0] + p, f.extent[0][1] + g],
    [f.extent[1][0] + p, f.extent[1][1] + g]
  ]);
  const v = fi(m) ? ci(a, m, f.measured) : a;
  return (f.measured.width === void 0 || f.measured.height === void 0) && u?.("015", ha.error015()), {
    position: {
      x: v.x - p + (f.measured.width ?? 0) * y[0],
      y: v.y - g + (f.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function iT({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: i, edges: o, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), f = [];
  for (const v of i) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && f.find((R) => R.id === v.parentId);
    (x || S) && f.push(v);
  }
  const h = new Set(a.map((v) => v.id)), p = o.filter((v) => v.deletable !== !1), y = nT(f, p);
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
const ur = (t, a = 0, i = 1) => Math.min(Math.max(t, a), i), ci = (t = { x: 0, y: 0 }, a, i) => ({
  x: ur(t.x, a[0][0], a[1][0] - (i?.width ?? 0)),
  y: ur(t.y, a[0][1], a[1][1] - (i?.height ?? 0))
});
function h1(t, a, i) {
  const { width: o, height: s } = tl(i), { x: u, y: f } = i.internals.positionAbsolute;
  return ci(t, [
    [u, f],
    [u + o, f + s]
  ], a);
}
const Ly = (t, a, i) => t < a ? ur(Math.abs(t - a), 1, a) / a : t > i ? -ur(Math.abs(t - i), 1, a) / a : 0, Lh = (t, a, i = 15, o = 40) => {
  const s = Ly(t.x, o, a.width - o) * i, u = Ly(t.y, o, a.height - o) * i;
  return [s, u];
}, Iu = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), nh = ({ x: t, y: a, width: i, height: o }) => ({
  x: t,
  y: a,
  x2: t + i,
  y2: a + o
}), Ku = ({ x: t, y: a, x2: i, y2: o }) => ({
  x: t,
  y: a,
  width: i - t,
  height: o - a
}), Mo = (t, a = [0, 0]) => {
  const { x: i, y: o } = jh(t) ? t.internals.positionAbsolute : Bo(t, a);
  return {
    x: i,
    y: o,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Ou = (t, a = [0, 0]) => {
  const { x: i, y: o } = jh(t) ? t.internals.positionAbsolute : Bo(t, a);
  return {
    x: i,
    y: o,
    x2: i + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: o + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, m1 = (t, a) => Ku(Iu(nh(t), nh(a))), g1 = (t, a, i, o, s, u, f, h) => {
  const p = Math.max(0, Math.min(t + i, s + f) - Math.max(t, s)), g = Math.max(0, Math.min(a + o, u + h) - Math.max(a, u));
  return Math.ceil(p * g);
}, Lu = (t, a) => g1(t.x, t.y, t.width, t.height, a.x, a.y, a.width, a.height), Hy = (t) => fa(t.width) && fa(t.height) && fa(t.x) && fa(t.y), fa = (t) => !isNaN(t) && isFinite(t), p1 = (t, a) => (i, o) => {
}, ko = (t, a = [1, 1]) => ({
  x: a[0] * Math.round(t.x / a[0]),
  y: a[1] * Math.round(t.y / a[1])
}), Vo = ({ x: t, y: a }, [i, o, s], u = !1, f = [1, 1]) => {
  const h = {
    x: (t - i) / s,
    y: (a - o) / s
  };
  return u ? ko(h, f) : h;
}, cr = ({ x: t, y: a }, [i, o, s]) => ({
  x: t * s + i,
  y: a * s + o
});
function Ki(t, a) {
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
function rT(t, a, i) {
  if (typeof t == "string" || typeof t == "number") {
    const o = Ki(t, i), s = Ki(t, a);
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
    const o = Ki(t.top ?? t.y ?? 0, i), s = Ki(t.bottom ?? t.y ?? 0, i), u = Ki(t.left ?? t.x ?? 0, a), f = Ki(t.right ?? t.x ?? 0, a);
    return { top: o, right: f, bottom: s, left: u, x: u + f, y: o + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function oT(t, a, i, o, s, u) {
  const { x: f, y: h } = cr(t, [a, i, o]), { x: p, y: g } = cr({ x: t.x + t.width, y: t.y + t.height }, [a, i, o]), y = s - p, m = u - g;
  return {
    left: Math.floor(f),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const Hh = (t, a, i, o, s, u) => {
  const f = rT(u, a, i), h = (a - f.x) / t.width, p = (i - f.y) / t.height, g = Math.min(h, p), y = ur(g, o, s), m = t.x + t.width / 2, v = t.y + t.height / 2, x = a / 2 - m * y, S = i / 2 - v * y, R = oT(t, x, S, y, a, i), T = {
    left: Math.min(R.left - f.left, 0),
    top: Math.min(R.top - f.top, 0),
    right: Math.min(R.right - f.right, 0),
    bottom: Math.min(R.bottom - f.bottom, 0)
  };
  return {
    x: x - T.left + T.right,
    y: S - T.top + T.bottom,
    zoom: y
  };
}, To = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function fi(t) {
  return t != null && t !== "parent";
}
function tl(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function y1(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function v1(t, a = { width: 0, height: 0 }, i, o, s) {
  const u = { ...t }, f = o.get(i);
  if (f) {
    const h = f.origin || s;
    u.x += f.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += f.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function By(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const i of t)
    if (!a.has(i))
      return !1;
  return !0;
}
function sT() {
  let t, a;
  return { promise: new Promise((o, s) => {
    t = o, a = s;
  }), resolve: t, reject: a };
}
function uT(t) {
  return { ...s1, ...t || {} };
}
function vo(t, { snapGrid: a = [0, 0], snapToGrid: i = !1, transform: o, containerBounds: s }) {
  const { x: u, y: f } = da(t), h = Vo({ x: u - (s?.left ?? 0), y: f - (s?.top ?? 0) }, o), { x: p, y: g } = i ? ko(h, a) : h;
  return {
    xSnapped: p,
    ySnapped: g,
    ...h
  };
}
const Bh = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), b1 = (t) => t?.getRootNode?.() || window?.document, cT = ["INPUT", "SELECT", "TEXTAREA"];
function x1(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : cT.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const S1 = (t) => "clientX" in t, da = (t, a) => {
  const i = S1(t), o = i ? t.clientX : t.touches?.[0].clientX, s = i ? t.clientY : t.touches?.[0].clientY;
  return {
    x: o - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Uy = (t, a, i, o, s) => {
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
      ...Bh(f)
    };
  });
};
function w1({ sourceX: t, sourceY: a, targetX: i, targetY: o, sourceControlX: s, sourceControlY: u, targetControlX: f, targetControlY: h }) {
  const p = t * 0.125 + s * 0.375 + f * 0.375 + i * 0.125, g = a * 0.125 + u * 0.375 + h * 0.375 + o * 0.125, y = Math.abs(p - t), m = Math.abs(g - a);
  return [p, g, y, m];
}
function lu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function ky({ pos: t, x1: a, y1: i, x2: o, y2: s, c: u }) {
  switch (t) {
    case Te.Left:
      return [a - lu(a - o, u), i];
    case Te.Right:
      return [a + lu(o - a, u), i];
    case Te.Top:
      return [a, i - lu(i - s, u)];
    case Te.Bottom:
      return [a, i + lu(s - i, u)];
  }
}
function E1({ sourceX: t, sourceY: a, sourcePosition: i = Te.Bottom, targetX: o, targetY: s, targetPosition: u = Te.Top, curvature: f = 0.25 }) {
  const [h, p] = ky({
    pos: i,
    x1: t,
    y1: a,
    x2: o,
    y2: s,
    c: f
  }), [g, y] = ky({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a,
    c: f
  }), [m, v, x, S] = w1({
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
function _1({ sourceX: t, sourceY: a, targetX: i, targetY: o }) {
  const s = Math.abs(i - t) / 2, u = i < t ? i + s : i - s, f = Math.abs(o - a) / 2, h = o < a ? o + f : o - f;
  return [u, h, s, f];
}
function fT({ sourceNode: t, targetNode: a, selected: i = !1, zIndex: o = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return o;
  const f = s && i ? o + 1e3 : o, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return f + h;
}
function dT({ sourceNode: t, targetNode: a, width: i, height: o, transform: s }) {
  const u = Iu(Ou(t), Ou(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const f = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: i / s[2],
    height: o / s[2]
  };
  return Lu(f, Ku(u)) > 0;
}
const hT = ({ source: t, sourceHandle: a, target: i, targetHandle: o }) => `xy-edge__${t}${a || ""}-${i}${o || ""}`, mT = (t, a) => a.some((i) => i.source === t.source && i.target === t.target && (i.sourceHandle === t.sourceHandle || !i.sourceHandle && !t.sourceHandle) && (i.targetHandle === t.targetHandle || !i.targetHandle && !t.targetHandle)), gT = (t, a, i = {}) => {
  if (!t.source || !t.target)
    return i.onError?.("006", ha.error006()), a;
  const o = i.getEdgeId || hT;
  let s;
  return f1(t) ? s = { ...t } : s = {
    ...t,
    id: o(t)
  }, mT(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function N1({ sourceX: t, sourceY: a, targetX: i, targetY: o }) {
  const [s, u, f, h] = _1({
    sourceX: t,
    sourceY: a,
    targetX: i,
    targetY: o
  });
  return [`M ${t},${a}L ${i},${o}`, s, u, f, h];
}
const Vy = {
  [Te.Left]: { x: -1, y: 0 },
  [Te.Right]: { x: 1, y: 0 },
  [Te.Top]: { x: 0, y: -1 },
  [Te.Bottom]: { x: 0, y: 1 }
}, pT = ({ source: t, sourcePosition: a = Te.Bottom, target: i }) => a === Te.Left || a === Te.Right ? t.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Yy = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function yT({ source: t, sourcePosition: a = Te.Bottom, target: i, targetPosition: o = Te.Top, center: s, offset: u, stepPosition: f }) {
  const h = Vy[a], p = Vy[o], g = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: i.x + p.x * u, y: i.y + p.y * u }, m = pT({
    source: g,
    sourcePosition: a,
    target: y
  }), v = m.x !== 0 ? "x" : "y", x = m[v];
  let S = [], R, T;
  const M = { x: 0, y: 0 }, L = { x: 0, y: 0 }, [, , _, z] = _1({
    sourceX: t.x,
    sourceY: t.y,
    targetX: i.x,
    targetY: i.y
  });
  if (h[v] * p[v] === -1) {
    v === "x" ? (R = s.x ?? g.x + (y.x - g.x) * f, T = s.y ?? (g.y + y.y) / 2) : (R = s.x ?? (g.x + y.x) / 2, T = s.y ?? g.y + (y.y - g.y) * f);
    const A = [
      { x: R, y: g.y },
      { x: R, y: y.y }
    ], K = [
      { x: g.x, y: T },
      { x: y.x, y: T }
    ];
    h[v] === x ? S = v === "x" ? A : K : S = v === "x" ? K : A;
  } else {
    const A = [{ x: g.x, y: y.y }], K = [{ x: y.x, y: g.y }];
    if (v === "x" ? S = h.x === x ? K : A : S = h.y === x ? A : K, a === o) {
      const j = Math.abs(t[v] - i[v]);
      if (j <= u) {
        const Z = Math.min(u - 1, u - j);
        h[v] === x ? M[v] = (g[v] > t[v] ? -1 : 1) * Z : L[v] = (y[v] > i[v] ? -1 : 1) * Z;
      }
    }
    if (a !== o) {
      const j = v === "x" ? "y" : "x", Z = h[v] === p[j], C = g[j] > y[j], O = g[j] < y[j];
      (h[v] === 1 && (!Z && C || Z && O) || h[v] !== 1 && (!Z && O || Z && C)) && (S = v === "x" ? A : K);
    }
    const J = { x: g.x + M.x, y: g.y + M.y }, G = { x: y.x + L.x, y: y.y + L.y }, Q = Math.max(Math.abs(J.x - S[0].x), Math.abs(G.x - S[0].x)), re = Math.max(Math.abs(J.y - S[0].y), Math.abs(G.y - S[0].y));
    Q >= re ? (R = (J.x + G.x) / 2, T = S[0].y) : (R = S[0].x, T = (J.y + G.y) / 2);
  }
  const Y = { x: g.x + M.x, y: g.y + M.y }, B = { x: y.x + L.x, y: y.y + L.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...Y.x !== S[0].x || Y.y !== S[0].y ? [Y] : [],
    ...S,
    ...B.x !== S[S.length - 1].x || B.y !== S[S.length - 1].y ? [B] : [],
    i
  ], R, T, _, z];
}
function vT(t, a, i, o) {
  const s = Math.min(Yy(t, a) / 2, Yy(a, i) / 2, o), { x: u, y: f } = a;
  if (t.x === u && u === i.x || t.y === f && f === i.y)
    return `L${u} ${f}`;
  if (t.y === f) {
    const g = t.x < i.x ? -1 : 1, y = t.y < i.y ? 1 : -1;
    return `L ${u + s * g},${f}Q ${u},${f} ${u},${f + s * y}`;
  }
  const h = t.x < i.x ? 1 : -1, p = t.y < i.y ? -1 : 1;
  return `L ${u},${f + s * p}Q ${u},${f} ${u + s * h},${f}`;
}
function ah({ sourceX: t, sourceY: a, sourcePosition: i = Te.Bottom, targetX: o, targetY: s, targetPosition: u = Te.Top, borderRadius: f = 5, centerX: h, centerY: p, offset: g = 20, stepPosition: y = 0.5 }) {
  const [m, v, x, S, R] = yT({
    source: { x: t, y: a },
    sourcePosition: i,
    target: { x: o, y: s },
    targetPosition: u,
    center: { x: h, y: p },
    offset: g,
    stepPosition: y
  });
  let T = `M${m[0].x} ${m[0].y}`;
  for (let M = 1; M < m.length - 1; M++)
    T += vT(m[M - 1], m[M], m[M + 1], f);
  return T += `L${m[m.length - 1].x} ${m[m.length - 1].y}`, [T, v, x, S, R];
}
function Gy(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function bT(t) {
  const { sourceNode: a, targetNode: i } = t;
  if (!Gy(a) || !Gy(i))
    return null;
  const o = a.internals.handleBounds || qy(a.handles), s = i.internals.handleBounds || qy(i.handles), u = $y(o?.source ?? [], t.sourceHandle), f = $y(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === sr.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !f)
    return t.onError?.("008", ha.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const h = u?.position || Te.Bottom, p = f?.position || Te.Top, g = di(a, u, h), y = di(i, f, p);
  return {
    sourceX: g.x,
    sourceY: g.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: p
  };
}
function qy(t) {
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
function di(t, a, i = Te.Left, o = !1) {
  const s = (a?.x ?? 0) + t.internals.positionAbsolute.x, u = (a?.y ?? 0) + t.internals.positionAbsolute.y, { width: f, height: h } = a ?? tl(t);
  if (o)
    return { x: s + f / 2, y: u + h / 2 };
  switch (a?.position ?? i) {
    case Te.Top:
      return { x: s + f / 2, y: u };
    case Te.Right:
      return { x: s + f, y: u + h / 2 };
    case Te.Bottom:
      return { x: s + f / 2, y: u + h };
    case Te.Left:
      return { x: s, y: u + h / 2 };
  }
}
function $y(t, a) {
  return t && (a ? t.find((i) => i.id === a) : t[0]) || null;
}
function lh(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((o) => `${o}=${t[o]}`).join("&")}` : "";
}
function xT(t, { id: a, defaultColor: i, defaultMarkerStart: o, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((f, h) => ([h.markerStart || o, h.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const g = lh(p, a);
      u.has(g) || (f.push({ id: g, color: p.color || i, ...p }), u.add(g));
    }
  }), f), []).sort((f, h) => f.id.localeCompare(h.id));
}
const C1 = 1e3, ST = 10, Uh = {
  nodeOrigin: [0, 0],
  nodeExtent: No,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, wT = {
  ...Uh,
  checkEquality: !0
};
function kh(t, a) {
  const i = { ...t };
  for (const o in a)
    a[o] !== void 0 && (i[o] = a[o]);
  return i;
}
function ET(t, a, i) {
  const o = kh(Uh, i);
  for (const s of t.values())
    if (s.parentId)
      Yh(s, t, a, o);
    else {
      const u = Bo(s, o.nodeOrigin), f = fi(s.extent) ? s.extent : o.nodeExtent, h = ci(u, f, tl(s));
      s.internals.positionAbsolute = h;
    }
}
function _T(t, a) {
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
function Vh(t) {
  return t === "manual";
}
function ih(t, a, i, o = {}) {
  const s = kh(wT, o), u = { i: 0 }, f = new Map(a), h = s?.elevateNodesOnSelect && !Vh(s.zIndexMode) ? C1 : 0;
  let p = t.length > 0, g = !1;
  a.clear(), i.clear();
  for (const y of t) {
    let m = f.get(y.id);
    if (s.checkEquality && y === m?.internals.userNode)
      a.set(y.id, m);
    else {
      const v = Bo(y, s.nodeOrigin), x = fi(y.extent) ? y.extent : s.nodeExtent, S = ci(v, x, tl(y));
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
          handleBounds: _T(y, m),
          z: M1(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, m);
    }
    (m.measured === void 0 || m.measured.width === void 0 || m.measured.height === void 0) && !m.hidden && (p = !1), y.parentId && Yh(m, a, i, o, u), g ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: g };
}
function NT(t, a) {
  if (!t.parentId)
    return;
  const i = a.get(t.parentId);
  i ? i.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function Yh(t, a, i, o, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: f, nodeExtent: h, zIndexMode: p } = kh(Uh, o), g = t.parentId, y = a.get(g);
  if (!y) {
    console.warn(`Parent node ${g} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  NT(t, i), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * ST), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = u && !Vh(p) ? C1 : 0, { x: v, y: x, z: S } = CT(t, y, f, h, m, p), { positionAbsolute: R } = t.internals, T = v !== R.x || x !== R.y;
  (T || S !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: T ? { x: v, y: x } : R,
      z: S
    }
  });
}
function M1(t, a, i) {
  const o = fa(t.zIndex) ? t.zIndex : 0;
  return Vh(i) ? o : o + (t.selected ? a : 0);
}
function CT(t, a, i, o, s, u) {
  const { x: f, y: h } = a.internals.positionAbsolute, p = tl(t), g = Bo(t, i), y = fi(t.extent) ? ci(g, t.extent, p) : g;
  let m = ci({ x: f + y.x, y: h + y.y }, o, p);
  t.extent === "parent" && (m = h1(m, p, a));
  const v = M1(t, s, u), x = a.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: x >= v ? x + 1 : v
  };
}
function Gh(t, a, i, o = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const f of t) {
    const h = a.get(f.parentId);
    if (!h)
      continue;
    const p = u.get(f.parentId)?.expandedRect ?? Mo(h), g = m1(p, f.rect);
    u.set(f.parentId, { expandedRect: g, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: f, parent: h }, p) => {
    const g = h.internals.positionAbsolute, y = tl(h), m = h.origin ?? o, v = f.x < g.x ? Math.round(Math.abs(g.x - f.x)) : 0, x = f.y < g.y ? Math.round(Math.abs(g.y - f.y)) : 0, S = Math.max(y.width, Math.round(f.width)), R = Math.max(y.height, Math.round(f.height)), T = (S - y.width) * m[0], M = (R - y.height) * m[1];
    (v > 0 || x > 0 || T || M) && (s.push({
      id: p,
      type: "position",
      position: {
        x: h.position.x - v + T,
        y: h.position.y - x + M
      }
    }), i.get(p)?.forEach((L) => {
      t.some((_) => _.id === L.id) || s.push({
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
        width: S + (v ? m[0] * v - T : 0),
        height: R + (x ? m[1] * x - M : 0)
      }
    });
  }), s;
}
function MT(t, a, i, o, s, u, f) {
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
    const R = Bh(x.nodeElement), T = S.measured.width !== R.width || S.measured.height !== R.height;
    if (!!(R.width && R.height && (T || !S.internals.handleBounds || x.force))) {
      const L = x.nodeElement.getBoundingClientRect(), _ = fi(S.extent) ? S.extent : u;
      let { positionAbsolute: z } = S.internals;
      S.parentId && S.extent === "parent" ? z = h1(z, R, a.get(S.parentId)) : _ && (z = ci(z, _, R));
      const Y = {
        ...S,
        measured: R,
        internals: {
          ...S.internals,
          positionAbsolute: z,
          handleBounds: {
            source: Uy("source", x.nodeElement, L, m, S.id),
            target: Uy("target", x.nodeElement, L, m, S.id)
          }
        }
      };
      a.set(S.id, Y), S.parentId && Yh(Y, a, i, { nodeOrigin: s, zIndexMode: f }), p = !0, T && (g.push({
        id: S.id,
        type: "dimensions",
        dimensions: R
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: Mo(Y, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Gh(v, a, i, s);
    g.push(...x);
  }
  return { changes: g, updatedInternals: p };
}
async function TT({ delta: t, panZoom: a, transform: i, translateExtent: o, width: s, height: u }) {
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
function Xy(t, a, i, o, s, u) {
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
function T1(t, a, i) {
  t.clear(), a.clear();
  for (const o of i) {
    const { source: s, target: u, sourceHandle: f = null, targetHandle: h = null } = o, p = { edgeId: o.id, source: s, target: u, sourceHandle: f, targetHandle: h }, g = `${s}-${f}--${u}-${h}`, y = `${u}-${h}--${s}-${f}`;
    Xy("source", p, y, t, s, f), Xy("target", p, g, t, u, h), a.set(o.id, o);
  }
}
function R1(t, a) {
  if (!t.parentId)
    return !1;
  const i = a.get(t.parentId);
  return i ? i.selected ? !0 : R1(i, a) : !1;
}
function Zy(t, a, i) {
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
function RT(t, a, i, o) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, f] of t)
    if ((f.selected || f.id === o) && (!f.parentId || !R1(f, t)) && (f.draggable || a && typeof f.draggable > "u")) {
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
function wd({ nodeId: t, dragItems: a, nodeLookup: i, dragging: o = !0 }) {
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
function AT({ dragItems: t, snapGrid: a, x: i, y: o }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: i - s.distance.x,
    y: o - s.distance.y
  }, f = ko(u, a);
  return {
    x: f.x - u.x,
    y: f.y - u.y
  };
}
function DT({ onNodeMouseDown: t, getStoreItems: a, onDragStart: i, onDrag: o, onDragStop: s }) {
  let u = { x: null, y: null }, f = 0, h = /* @__PURE__ */ new Map(), p = !1, g = { x: 0, y: 0 }, y = null, m = !1, v = null, x = !1, S = !1, R = null;
  function T({ noDragClassName: L, handleSelector: _, domNode: z, isSelectable: Y, nodeId: B, nodeClickDistance: U = 0 }) {
    v = Bn(z);
    function A({ x: Q, y: re }) {
      const { nodeLookup: j, nodeExtent: Z, snapGrid: C, snapToGrid: O, nodeOrigin: q, onNodeDrag: $, onSelectionDrag: ne, onError: D, updateNodePositions: V } = a();
      u = { x: Q, y: re };
      let F = !1;
      const le = h.size > 1, se = le && Z ? nh(Uo(h)) : null, me = le && O ? AT({
        dragItems: h,
        snapGrid: C,
        x: Q,
        y: re
      }) : null;
      for (const [ge, ee] of h) {
        if (!j.has(ge))
          continue;
        let pe = { x: Q - ee.distance.x, y: re - ee.distance.y };
        O && (pe = me ? {
          x: Math.round(pe.x + me.x),
          y: Math.round(pe.y + me.y)
        } : ko(pe, C));
        let ze = null;
        if (le && Z && !ee.extent && se) {
          const { positionAbsolute: Se } = ee.internals, De = Se.x - se.x + Z[0][0], qe = Se.x + ee.measured.width - se.x2 + Z[1][0], nt = Se.y - se.y + Z[0][1], it = Se.y + ee.measured.height - se.y2 + Z[1][1];
          ze = [
            [De, nt],
            [qe, it]
          ];
        }
        const { position: Ae, positionAbsolute: we } = d1({
          nodeId: ge,
          nextPosition: pe,
          nodeLookup: j,
          nodeExtent: ze || Z,
          nodeOrigin: q,
          onError: D
        });
        F = F || ee.position.x !== Ae.x || ee.position.y !== Ae.y, ee.position = Ae, ee.internals.positionAbsolute = we;
      }
      if (S = S || F, !!F && (V(h, !0), R && (o || $ || !B && ne))) {
        const [ge, ee] = wd({
          nodeId: B,
          dragItems: h,
          nodeLookup: j
        });
        o?.(R, h, ge, ee), $?.(R, ge, ee), B || ne?.(R, ee);
      }
    }
    async function K() {
      if (!y)
        return;
      const { transform: Q, panBy: re, autoPanSpeed: j, autoPanOnNodeDrag: Z } = a();
      if (!Z) {
        p = !1, cancelAnimationFrame(f);
        return;
      }
      const [C, O] = Lh(g, y, j);
      (C !== 0 || O !== 0) && (u.x = (u.x ?? 0) - C / Q[2], u.y = (u.y ?? 0) - O / Q[2], await re({ x: C, y: O }) && A(u)), f = requestAnimationFrame(K);
    }
    function J(Q) {
      const { nodeLookup: re, multiSelectionActive: j, nodesDraggable: Z, transform: C, snapGrid: O, snapToGrid: q, selectNodesOnDrag: $, onNodeDragStart: ne, onSelectionDragStart: D, unselectNodesAndEdges: V } = a();
      m = !0, (!$ || !Y) && !j && B && (re.get(B)?.selected || V()), Y && $ && B && t?.(B);
      const F = vo(Q.sourceEvent, { transform: C, snapGrid: O, snapToGrid: q, containerBounds: y });
      if (u = F, h = RT(re, Z, F, B), h.size > 0 && (i || ne || !B && D)) {
        const [le, se] = wd({
          nodeId: B,
          dragItems: h,
          nodeLookup: re
        });
        i?.(Q.sourceEvent, h, le, se), ne?.(Q.sourceEvent, le, se), B || D?.(Q.sourceEvent, se);
      }
    }
    const G = Xb().clickDistance(U).on("start", (Q) => {
      const { domNode: re, nodeDragThreshold: j, transform: Z, snapGrid: C, snapToGrid: O } = a();
      y = re?.getBoundingClientRect() || null, x = !1, S = !1, R = Q.sourceEvent, j === 0 && J(Q), u = vo(Q.sourceEvent, { transform: Z, snapGrid: C, snapToGrid: O, containerBounds: y }), g = da(Q.sourceEvent, y);
    }).on("drag", (Q) => {
      const { autoPanOnNodeDrag: re, transform: j, snapGrid: Z, snapToGrid: C, nodeDragThreshold: O, nodeLookup: q } = a(), $ = vo(Q.sourceEvent, { transform: j, snapGrid: Z, snapToGrid: C, containerBounds: y });
      if (R = Q.sourceEvent, (Q.sourceEvent.type === "touchmove" && Q.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      B && !q.has(B)) && (x = !0), !x) {
        if (!p && re && m && (p = !0, K()), !m) {
          const ne = da(Q.sourceEvent, y), D = ne.x - g.x, V = ne.y - g.y;
          Math.sqrt(D * D + V * V) > O && J(Q);
        }
        (u.x !== $.xSnapped || u.y !== $.ySnapped) && h && m && (g = da(Q.sourceEvent, y), A($));
      }
    }).on("end", (Q) => {
      if (!m || x) {
        x && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (p = !1, m = !1, cancelAnimationFrame(f), h.size > 0) {
        const { nodeLookup: re, updateNodePositions: j, onNodeDragStop: Z, onSelectionDragStop: C } = a();
        if (S && (j(h, !1), S = !1), s || Z || !B && C) {
          const [O, q] = wd({
            nodeId: B,
            dragItems: h,
            nodeLookup: re,
            dragging: !1
          });
          s?.(Q.sourceEvent, h, O, q), Z?.(Q.sourceEvent, O, q), B || C?.(Q.sourceEvent, q);
        }
      }
    }).filter((Q) => {
      const re = Q.target;
      return !Q.button && (!L || !Zy(re, `.${L}`, z)) && (!_ || Zy(re, _, z));
    });
    v.call(G);
  }
  function M() {
    v?.on(".drag", null);
  }
  return {
    update: T,
    destroy: M
  };
}
function zT(t, a, i) {
  const o = [], s = {
    x: t.x - i,
    y: t.y - i,
    width: i * 2,
    height: i * 2
  };
  for (const u of a.values())
    Lu(s, Mo(u)) > 0 && o.push(u);
  return o;
}
const jT = 250;
function OT(t, a, i, o) {
  let s = [], u = 1 / 0;
  const f = zT(t, i, a + jT);
  for (const h of f) {
    const p = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const g of p) {
      if (o.nodeId === g.nodeId && o.type === g.type && o.id === g.id)
        continue;
      const { x: y, y: m } = di(h, g, g.position, !0), v = Math.sqrt(Math.pow(y - t.x, 2) + Math.pow(m - t.y, 2));
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
function A1(t, a, i, o, s, u = !1) {
  const f = o.get(t);
  if (!f)
    return null;
  const h = s === "strict" ? f.internals.handleBounds?.[a] : [...f.internals.handleBounds?.source ?? [], ...f.internals.handleBounds?.target ?? []], p = (i ? h?.find((g) => g.id === i) : h?.[0]) ?? null;
  return p && u ? { ...p, ...di(f, p, p.position, !0) } : p;
}
function D1(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function LT(t, a) {
  let i = null;
  return a ? i = !0 : t && !a && (i = !1), i;
}
const z1 = () => !0;
function HT(t, { connectionMode: a, connectionRadius: i, handleId: o, nodeId: s, edgeUpdaterType: u, isTarget: f, domNode: h, nodeLookup: p, lib: g, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: R, onConnectEnd: T, isValidConnection: M = z1, onReconnectEnd: L, updateConnection: _, getTransform: z, getFromHandle: Y, autoPanSpeed: B, dragThreshold: U = 1, handleDomNode: A }) {
  const K = b1(t.target);
  let J = 0, G;
  const { x: Q, y: re } = da(t), j = D1(u, A), Z = h?.getBoundingClientRect();
  let C = !1;
  if (!Z || !j)
    return;
  const O = A1(s, j, o, p, a);
  if (!O)
    return;
  let q = da(t, Z), $ = !1, ne = null, D = !1, V = null;
  function F() {
    if (!y || !Z)
      return;
    const [Ae, we] = Lh(q, Z, B);
    v({ x: Ae, y: we }), J = requestAnimationFrame(F);
  }
  const le = {
    ...O,
    nodeId: s,
    type: j,
    position: O.position
  }, se = p.get(s);
  let ge = {
    inProgress: !0,
    isValid: null,
    from: di(se, le, Te.Left, !0),
    fromHandle: le,
    fromPosition: le.position,
    fromNode: se,
    to: q,
    toHandle: null,
    toPosition: Oy[le.position],
    toNode: null,
    pointer: q
  };
  function ee() {
    C = !0, _(ge), S?.(t, { nodeId: s, handleId: o, handleType: j });
  }
  U === 0 && ee();
  function pe(Ae) {
    if (!C) {
      const { x: it, y: Ft } = da(Ae), pt = it - Q, Gt = Ft - re;
      if (!(pt * pt + Gt * Gt > U * U))
        return;
      ee();
    }
    if (!Y() || !le) {
      ze(Ae);
      return;
    }
    const we = z();
    q = da(Ae, Z), G = OT(Vo(q, we, !1, [1, 1]), i, p, le), $ || (F(), $ = !0);
    const Se = j1(Ae, {
      handle: G,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: o,
      fromType: f ? "target" : "source",
      isValidConnection: M,
      doc: K,
      lib: g,
      flowId: m,
      nodeLookup: p
    });
    V = Se.handleDomNode, ne = Se.connection, D = LT(!!G, Se.isValid);
    const De = p.get(s), qe = De ? di(De, le, Te.Left, !0) : ge.from, nt = {
      ...ge,
      from: qe,
      isValid: D,
      to: Se.toHandle && D ? cr({ x: Se.toHandle.x, y: Se.toHandle.y }, we) : q,
      toHandle: Se.toHandle,
      toPosition: D && Se.toHandle ? Se.toHandle.position : Oy[le.position],
      toNode: Se.toHandle ? p.get(Se.toHandle.nodeId) : null,
      pointer: q
    };
    _(nt), ge = nt;
  }
  function ze(Ae) {
    if (!("touches" in Ae && Ae.touches.length > 0)) {
      if (C) {
        (G || V) && ne && D && R?.(ne);
        const { inProgress: we, ...Se } = ge, De = {
          ...Se,
          toPosition: ge.toHandle ? ge.toPosition : null
        };
        T?.(Ae, De), u && L?.(Ae, De);
      }
      x(), cancelAnimationFrame(J), $ = !1, D = !1, ne = null, V = null, K.removeEventListener("mousemove", pe), K.removeEventListener("mouseup", ze), K.removeEventListener("touchmove", pe), K.removeEventListener("touchend", ze);
    }
  }
  K.addEventListener("mousemove", pe), K.addEventListener("mouseup", ze), K.addEventListener("touchmove", pe), K.addEventListener("touchend", ze);
}
function j1(t, { handle: a, connectionMode: i, fromNodeId: o, fromHandleId: s, fromType: u, doc: f, lib: h, flowId: p, isValidConnection: g = z1, nodeLookup: y }) {
  const m = u === "target", v = a ? f.querySelector(`.${h}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = da(t), R = f.elementFromPoint(x, S), T = R?.classList.contains(`${h}-flow__handle`) ? R : v, M = {
    handleDomNode: T,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (T) {
    const L = D1(void 0, T), _ = T.getAttribute("data-nodeid"), z = T.getAttribute("data-handleid"), Y = T.classList.contains("connectable"), B = T.classList.contains("connectableend");
    if (!_ || !L)
      return M;
    const U = {
      source: m ? _ : o,
      sourceHandle: m ? z : s,
      target: m ? o : _,
      targetHandle: m ? s : z
    };
    M.connection = U;
    const K = Y && B && (i === sr.Strict ? m && L === "source" || !m && L === "target" : _ !== o || z !== s);
    M.isValid = K && g(U), M.toHandle = A1(_, L, z, y, i, !0);
  }
  return M;
}
const rh = {
  onPointerDown: HT,
  isValid: j1
};
function BT({ domNode: t, panZoom: a, getTransform: i, getViewScale: o }) {
  const s = Bn(t);
  function u({ translateExtent: h, width: p, height: g, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (_) => {
      if (_.sourceEvent.type !== "wheel" || !a)
        return;
      const z = i(), Y = _.sourceEvent.ctrlKey && To() ? 10 : 1, B = -_.sourceEvent.deltaY * (_.sourceEvent.deltaMode === 1 ? 0.05 : _.sourceEvent.deltaMode ? 1 : 2e-3) * y, U = z[2] * Math.pow(2, B * Y);
      a.scaleTo(U);
    };
    let R = [0, 0];
    const T = (_) => {
      (_.sourceEvent.type === "mousedown" || _.sourceEvent.type === "touchstart") && (R = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ]);
    }, M = (_) => {
      const z = i();
      if (_.sourceEvent.type !== "mousemove" && _.sourceEvent.type !== "touchmove" || !a)
        return;
      const Y = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ], B = [Y[0] - R[0], Y[1] - R[1]];
      R = Y;
      const U = o() * Math.max(z[2], Math.log(z[2])) * (x ? -1 : 1), A = {
        x: z[0] - B[0] * U,
        y: z[1] - B[1] * U
      }, K = [
        [0, 0],
        [p, g]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: z[2]
      }, K, h);
    }, L = r1().on("start", T).on("zoom", m ? M : null).on("zoom.wheel", v ? S : null);
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
const Fu = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Ed = ({ x: t, y: a, zoom: i }) => Qu.translate(t, a).scale(i), er = (t, a) => t.target.closest(`.${a}`), O1 = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), UT = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, _d = (t, a = 0, i = UT, o = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || o(), s ? t.transition().duration(a).ease(i).on("end", o) : t;
}, L1 = (t) => {
  const a = t.ctrlKey && To() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function kT({ zoomPanValues: t, noWheelClassName: a, d3Selection: i, d3Zoom: o, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: f, onPanZoomStart: h, onPanZoom: p, onPanZoomEnd: g }) {
  return (y) => {
    if (er(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = i.property("__zoom").k || 1;
    if (y.ctrlKey && f) {
      const T = ua(y), M = L1(y), L = m * Math.pow(2, M);
      o.scaleTo(i, L, T, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === ri.Vertical ? 0 : y.deltaX * v, S = s === ri.Horizontal ? 0 : y.deltaY * v;
    !To() && y.shiftKey && s !== ri.Vertical && (x = y.deltaY * v, S = 0), o.translateBy(
      i,
      -(x / m) * u,
      -(S / m) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const R = Fu(i.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (p?.(y, R), t.panScrollTimeout = setTimeout(() => {
      g?.(y, R), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, R));
  };
}
function VT({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: i }) {
  return function(o, s) {
    const u = o.type === "wheel", f = !a && u && !o.ctrlKey, h = er(o, t);
    if (o.ctrlKey && u && h && o.preventDefault(), f || h)
      return null;
    o.preventDefault(), i.call(this, o, s);
  };
}
function YT({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: i }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const s = Fu(o.transform);
    t.mouseButton = o.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, o.sourceEvent?.type === "mousedown" && a(!0), i && i?.(o.sourceEvent, s);
  };
}
function GT({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: i, onTransformChange: o, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(i && O1(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || o([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Fu(u.transform));
  };
}
function qT({ zoomPanValues: t, panOnDrag: a, panOnScroll: i, onDraggingChange: o, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (f) => {
    if (!f.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && O1(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && f.sourceEvent && u(f.sourceEvent), t.usedRightMouseButton = !1, o(!1), s)) {
      const h = Fu(f.transform);
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
function $T({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: i, panOnDrag: o, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: f, noWheelClassName: h, noPanClassName: p, lib: g, connectionInProgress: y }) {
  return (m) => {
    const v = t || a, x = i && m.ctrlKey, S = m.type === "wheel";
    if (m.button === 1 && m.type === "mousedown" && (er(m, `${g}-flow__node`) || er(m, `${g}-flow__edge`)))
      return !0;
    if (!o && !v && !s && !u && !i || f || y && !S || er(m, h) && S || er(m, p) && (!S || s && S && !t) || !i && m.ctrlKey && S)
      return !1;
    if (!i && m.type === "touchstart" && m.touches?.length > 1)
      return m.preventDefault(), !1;
    if (!v && !s && !x && S || !o && (m.type === "mousedown" || m.type === "touchstart") || Array.isArray(o) && !o.includes(m.button) && m.type === "mousedown")
      return !1;
    const R = Array.isArray(o) && o.includes(m.button) || !m.button || m.button <= 1;
    return (!m.ctrlKey || S) && R;
  };
}
function XT({ domNode: t, minZoom: a, maxZoom: i, translateExtent: o, viewport: s, onPanZoom: u, onPanZoomStart: f, onPanZoomEnd: h, onDraggingChange: p }) {
  const g = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), m = r1().scaleExtent([a, i]).translateExtent(o), v = Bn(t).call(m);
  L({
    x: s.x,
    y: s.y,
    zoom: ur(s.zoom, a, i)
  }, [
    [0, 0],
    [y.width, y.height]
  ], o);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  m.wheelDelta(L1);
  async function R(G, Q) {
    return v ? new Promise((re) => {
      m?.interpolate(Q?.interpolate === "linear" ? yo : vu).transform(_d(v, Q?.duration, Q?.ease, () => re(!0)), G);
    }) : !1;
  }
  function T({ noWheelClassName: G, noPanClassName: Q, onPaneContextMenu: re, userSelectionActive: j, panOnScroll: Z, panOnDrag: C, panOnScrollMode: O, panOnScrollSpeed: q, preventScrolling: $, zoomOnPinch: ne, zoomOnScroll: D, zoomOnDoubleClick: V, zoomActivationKeyPressed: F, lib: le, onTransformChange: se, connectionInProgress: me, paneClickDistance: ge, selectionOnDrag: ee }) {
    j && !g.isZoomingOrPanning && M();
    const pe = Z && !F && !j;
    m.clickDistance(ee ? 1 / 0 : !fa(ge) || ge < 0 ? 0 : ge);
    const ze = pe ? kT({
      zoomPanValues: g,
      noWheelClassName: G,
      d3Selection: v,
      d3Zoom: m,
      panOnScrollMode: O,
      panOnScrollSpeed: q,
      zoomOnPinch: ne,
      onPanZoomStart: f,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : VT({
      noWheelClassName: G,
      preventScrolling: $,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Ae = YT({
      zoomPanValues: g,
      onDraggingChange: p,
      onPanZoomStart: f
    });
    m.on("start", Ae);
    const we = GT({
      zoomPanValues: g,
      panOnDrag: C,
      onPaneContextMenu: !!re,
      onPanZoom: u,
      onTransformChange: se
    });
    m.on("zoom", we);
    const Se = qT({
      zoomPanValues: g,
      panOnDrag: C,
      panOnScroll: Z,
      onPaneContextMenu: re,
      onPanZoomEnd: h,
      onDraggingChange: p
    });
    m.on("end", Se);
    const De = $T({
      zoomActivationKeyPressed: F,
      panOnDrag: C,
      zoomOnScroll: D,
      panOnScroll: Z,
      zoomOnDoubleClick: V,
      zoomOnPinch: ne,
      userSelectionActive: j,
      noPanClassName: Q,
      noWheelClassName: G,
      lib: le,
      connectionInProgress: me
    });
    m.filter(De), V ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function M() {
    m.on("zoom", null);
  }
  async function L(G, Q, re) {
    const j = Ed(G), Z = m?.constrain()(j, Q, re);
    return Z && await R(Z), Z;
  }
  async function _(G, Q) {
    const re = Ed(G);
    return await R(re, Q), re;
  }
  function z(G) {
    if (v) {
      const Q = Ed(G), re = v.property("__zoom");
      (re.k !== G.zoom || re.x !== G.x || re.y !== G.y) && m?.transform(v, Q, null, { sync: !0 });
    }
  }
  function Y() {
    const G = v ? i1(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: G.x, y: G.y, zoom: G.k };
  }
  async function B(G, Q) {
    return v ? new Promise((re) => {
      m?.interpolate(Q?.interpolate === "linear" ? yo : vu).scaleTo(_d(v, Q?.duration, Q?.ease, () => re(!0)), G);
    }) : !1;
  }
  async function U(G, Q) {
    return v ? new Promise((re) => {
      m?.interpolate(Q?.interpolate === "linear" ? yo : vu).scaleBy(_d(v, Q?.duration, Q?.ease, () => re(!0)), G);
    }) : !1;
  }
  function A(G) {
    m?.scaleExtent(G);
  }
  function K(G) {
    m?.translateExtent(G);
  }
  function J(G) {
    const Q = !fa(G) || G < 0 ? 0 : G;
    m?.clickDistance(Q);
  }
  return {
    update: T,
    destroy: M,
    setViewport: _,
    setViewportConstrained: L,
    getViewport: Y,
    scaleTo: B,
    scaleBy: U,
    setScaleExtent: A,
    setTranslateExtent: K,
    syncViewport: z,
    setClickDistance: J
  };
}
var fr;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(fr || (fr = {}));
function ZT({ width: t, prevWidth: a, height: i, prevHeight: o, affectsX: s, affectsY: u }) {
  const f = t - a, h = i - o, p = [f > 0 ? 1 : f < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return f && s && (p[0] = p[0] * -1), h && u && (p[1] = p[1] * -1), p;
}
function Qy(t) {
  const a = t.includes("right") || t.includes("left"), i = t.includes("bottom") || t.includes("top"), o = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: a,
    isVertical: i,
    affectsX: o,
    affectsY: s
  };
}
function Dl(t, a) {
  return Math.max(0, a - t);
}
function zl(t, a) {
  return Math.max(0, t - a);
}
function iu(t, a, i) {
  return Math.max(0, a - t, t - i);
}
function Iy(t, a) {
  return t ? !a : a;
}
function QT(t, a, i, o, s, u, f, h) {
  let { affectsX: p, affectsY: g } = a;
  const { isHorizontal: y, isVertical: m } = a, v = y && m, { xSnapped: x, ySnapped: S } = i, { minWidth: R, maxWidth: T, minHeight: M, maxHeight: L } = o, { x: _, y: z, width: Y, height: B, aspectRatio: U } = t;
  let A = Math.floor(y ? x - t.pointerX : 0), K = Math.floor(m ? S - t.pointerY : 0);
  const J = Y + (p ? -A : A), G = B + (g ? -K : K), Q = -u[0] * Y, re = -u[1] * B;
  let j = iu(J, R, T), Z = iu(G, M, L);
  if (f) {
    let q = 0, $ = 0;
    p && A < 0 ? q = Dl(_ + A + Q, f[0][0]) : !p && A > 0 && (q = zl(_ + J + Q, f[1][0])), g && K < 0 ? $ = Dl(z + K + re, f[0][1]) : !g && K > 0 && ($ = zl(z + G + re, f[1][1])), j = Math.max(j, q), Z = Math.max(Z, $);
  }
  if (h) {
    let q = 0, $ = 0;
    p && A > 0 ? q = zl(_ + A, h[0][0]) : !p && A < 0 && (q = Dl(_ + J, h[1][0])), g && K > 0 ? $ = zl(z + K, h[0][1]) : !g && K < 0 && ($ = Dl(z + G, h[1][1])), j = Math.max(j, q), Z = Math.max(Z, $);
  }
  if (s) {
    if (y) {
      const q = iu(J / U, M, L) * U;
      if (j = Math.max(j, q), f) {
        let $ = 0;
        !p && !g || p && !g && v ? $ = zl(z + re + J / U, f[1][1]) * U : $ = Dl(z + re + (p ? A : -A) / U, f[0][1]) * U, j = Math.max(j, $);
      }
      if (h) {
        let $ = 0;
        !p && !g || p && !g && v ? $ = Dl(z + J / U, h[1][1]) * U : $ = zl(z + (p ? A : -A) / U, h[0][1]) * U, j = Math.max(j, $);
      }
    }
    if (m) {
      const q = iu(G * U, R, T) / U;
      if (Z = Math.max(Z, q), f) {
        let $ = 0;
        !p && !g || g && !p && v ? $ = zl(_ + G * U + Q, f[1][0]) / U : $ = Dl(_ + (g ? K : -K) * U + Q, f[0][0]) / U, Z = Math.max(Z, $);
      }
      if (h) {
        let $ = 0;
        !p && !g || g && !p && v ? $ = Dl(_ + G * U, h[1][0]) / U : $ = zl(_ + (g ? K : -K) * U, h[0][0]) / U, Z = Math.max(Z, $);
      }
    }
  }
  K = K + (K < 0 ? Z : -Z), A = A + (A < 0 ? j : -j), s && (v ? J > G * U ? K = (Iy(p, g) ? -A : A) / U : A = (Iy(p, g) ? -K : K) * U : y ? (K = A / U, g = p) : (A = K * U, p = g));
  const C = p ? _ + A : _, O = g ? z + K : z;
  return {
    width: Y + (p ? -A : A),
    height: B + (g ? -K : K),
    x: u[0] * A * (p ? -1 : 1) + C,
    y: u[1] * K * (g ? -1 : 1) + O
  };
}
const H1 = { width: 0, height: 0, x: 0, y: 0 }, IT = {
  ...H1,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function KT(t, a, i) {
  const o = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, f = t.measured.height ?? 0, h = i[0] * u, p = i[1] * f;
  return [
    [o - h, s - p],
    [o + u - h, s + f - p]
  ];
}
function FT({ domNode: t, nodeId: a, getStoreItems: i, onChange: o, onEnd: s }) {
  const u = Bn(t);
  let f = {
    controlDirection: Qy("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: g, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: R, shouldResize: T }) {
    let M = { ...H1 }, L = { ...IT };
    f = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: Qy(g)
    };
    let _, z = null, Y = [], B, U, A, K = !1;
    const J = Xb().on("start", (G) => {
      const { nodeLookup: Q, transform: re, snapGrid: j, snapToGrid: Z, nodeOrigin: C, paneDomNode: O } = i();
      if (_ = Q.get(a), !_)
        return;
      z = O?.getBoundingClientRect() ?? null;
      const { xSnapped: q, ySnapped: $ } = vo(G.sourceEvent, {
        transform: re,
        snapGrid: j,
        snapToGrid: Z,
        containerBounds: z
      });
      M = {
        width: _.measured.width ?? 0,
        height: _.measured.height ?? 0,
        x: _.position.x ?? 0,
        y: _.position.y ?? 0
      }, L = {
        ...M,
        pointerX: q,
        pointerY: $,
        aspectRatio: M.width / M.height
      }, B = void 0, U = fi(_.extent) ? _.extent : void 0, _.parentId && (_.extent === "parent" || _.expandParent) && (B = Q.get(_.parentId)), B && _.extent === "parent" && (U = [
        [0, 0],
        [B.measured.width, B.measured.height]
      ]), Y = [], A = void 0;
      for (const [ne, D] of Q)
        if (D.parentId === a && (Y.push({
          id: ne,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const V = KT(D, _, D.origin ?? C);
          A ? A = [
            [Math.min(V[0][0], A[0][0]), Math.min(V[0][1], A[0][1])],
            [Math.max(V[1][0], A[1][0]), Math.max(V[1][1], A[1][1])]
          ] : A = V;
        }
      x?.(G, { ...M });
    }).on("drag", (G) => {
      const { transform: Q, snapGrid: re, snapToGrid: j, nodeOrigin: Z } = i(), C = vo(G.sourceEvent, {
        transform: Q,
        snapGrid: re,
        snapToGrid: j,
        containerBounds: z
      }), O = [];
      if (!_)
        return;
      const { x: q, y: $, width: ne, height: D } = M, V = {}, F = _.origin ?? Z, { width: le, height: se, x: me, y: ge } = QT(L, f.controlDirection, C, f.boundaries, f.keepAspectRatio, F, U, A), ee = le !== ne, pe = se !== D, ze = me !== q && ee, Ae = ge !== $ && pe;
      if (!ze && !Ae && !ee && !pe)
        return;
      if ((ze || Ae || F[0] === 1 || F[1] === 1) && (V.x = ze ? me : M.x, V.y = Ae ? ge : M.y, M.x = V.x, M.y = V.y, Y.length > 0)) {
        const qe = me - q, nt = ge - $;
        for (const it of Y)
          it.position = {
            x: it.position.x - qe + F[0] * (le - ne),
            y: it.position.y - nt + F[1] * (se - D)
          }, O.push(it);
      }
      if ((ee || pe) && (V.width = ee && (!f.resizeDirection || f.resizeDirection === "horizontal") ? le : M.width, V.height = pe && (!f.resizeDirection || f.resizeDirection === "vertical") ? se : M.height, M.width = V.width, M.height = V.height), B && _.expandParent) {
        const qe = F[0] * (V.width ?? 0);
        V.x && V.x < qe && (M.x = qe, L.x = L.x - (V.x - qe));
        const nt = F[1] * (V.height ?? 0);
        V.y && V.y < nt && (M.y = nt, L.y = L.y - (V.y - nt));
      }
      const we = ZT({
        width: M.width,
        prevWidth: ne,
        height: M.height,
        prevHeight: D,
        affectsX: f.controlDirection.affectsX,
        affectsY: f.controlDirection.affectsY
      }), Se = { ...M, direction: we };
      T?.(G, Se) !== !1 && (K = !0, S?.(G, Se), o(V, O));
    }).on("end", (G) => {
      K && (R?.(G, { ...M }), s?.({ ...M }), K = !1);
    });
    u.call(J);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: h,
    destroy: p
  };
}
var Nd = { exports: {} }, Cd = {}, Md = { exports: {} }, Td = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ky;
function JT() {
  if (Ky) return Td;
  Ky = 1;
  var t = Ao();
  function a(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var i = typeof Object.is == "function" ? Object.is : a, o = t.useState, s = t.useEffect, u = t.useLayoutEffect, f = t.useDebugValue;
  function h(m, v) {
    var x = v(), S = o({ inst: { value: x, getSnapshot: v } }), R = S[0].inst, T = S[1];
    return u(
      function() {
        R.value = x, R.getSnapshot = v, p(R) && T({ inst: R });
      },
      [m, x, v]
    ), s(
      function() {
        return p(R) && T({ inst: R }), m(function() {
          p(R) && T({ inst: R });
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
  return Td.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y, Td;
}
var Fy;
function PT() {
  return Fy || (Fy = 1, Md.exports = JT()), Md.exports;
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
var Jy;
function WT() {
  if (Jy) return Cd;
  Jy = 1;
  var t = Ao(), a = PT();
  function i(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var o = typeof Object.is == "function" ? Object.is : i, s = a.useSyncExternalStore, u = t.useRef, f = t.useEffect, h = t.useMemo, p = t.useDebugValue;
  return Cd.useSyncExternalStoreWithSelector = function(g, y, m, v, x) {
    var S = u(null);
    if (S.current === null) {
      var R = { hasValue: !1, value: null };
      S.current = R;
    } else R = S.current;
    S = h(
      function() {
        function M(B) {
          if (!L) {
            if (L = !0, _ = B, B = v(B), x !== void 0 && R.hasValue) {
              var U = R.value;
              if (x(U, B))
                return z = U;
            }
            return z = B;
          }
          if (U = z, o(_, B)) return U;
          var A = v(B);
          return x !== void 0 && x(U, A) ? (_ = B, U) : (_ = B, z = A);
        }
        var L = !1, _, z, Y = m === void 0 ? null : m;
        return [
          function() {
            return M(y());
          },
          Y === null ? void 0 : function() {
            return M(Y());
          }
        ];
      },
      [y, m, v, x]
    );
    var T = s(g, S[0], S[1]);
    return f(
      function() {
        R.hasValue = !0, R.value = T;
      },
      [T]
    ), p(T), T;
  }, Cd;
}
var Py;
function eR() {
  return Py || (Py = 1, Nd.exports = WT()), Nd.exports;
}
var tR = eR();
const nR = /* @__PURE__ */ fh(tR), aR = {}, Wy = (t) => {
  let a;
  const i = /* @__PURE__ */ new Set(), o = (y, m) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), i.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: o, getState: s, getInitialState: () => g, subscribe: (y) => (i.add(y), () => i.delete(y)), destroy: () => {
    (aR ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), i.clear();
  } }, g = a = t(o, s, p);
  return p;
}, lR = (t) => t ? Wy(t) : Wy, { useDebugValue: iR } = ye, { useSyncExternalStoreWithSelector: rR } = nR, oR = (t) => t;
function B1(t, a = oR, i) {
  const o = rR(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    i
  );
  return iR(o), o;
}
const ev = (t, a) => {
  const i = lR(t), o = (s, u = a) => B1(i, s, u);
  return Object.assign(o, i), o;
}, sR = (t, a) => t ? ev(t, a) : ev;
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
var uR = Kv();
const cR = /* @__PURE__ */ fh(uR), Ju = E.createContext(null), fR = Ju.Provider, U1 = ha.error001("react");
function Pe(t, a) {
  const i = E.useContext(Ju);
  if (i === null)
    throw new Error(U1);
  return B1(i, t, a);
}
function wt() {
  const t = E.useContext(Ju);
  if (t === null)
    throw new Error(U1);
  return E.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const tv = { display: "none" }, dR = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, k1 = "react-flow__node-desc", V1 = "react-flow__edge-desc", hR = "react-flow__aria-live", mR = (t) => t.ariaLiveMessage, gR = (t) => t.ariaLabelConfig;
function pR({ rfId: t }) {
  const a = Pe(mR);
  return w.jsx("div", { id: `${hR}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: dR, children: a });
}
function yR({ rfId: t, disableKeyboardA11y: a }) {
  const i = Pe(gR);
  return w.jsxs(w.Fragment, { children: [w.jsx("div", { id: `${k1}-${t}`, style: tv, children: a ? i["node.a11yDescription.default"] : i["node.a11yDescription.keyboardDisabled"] }), w.jsx("div", { id: `${V1}-${t}`, style: tv, children: i["edge.a11yDescription.default"] }), !a && w.jsx(pR, { rfId: t })] });
}
const Pu = E.forwardRef(({ position: t = "top-left", children: a, className: i, style: o, ...s }, u) => {
  const f = `${t}`.split("-");
  return w.jsx("div", { className: Yt(["react-flow__panel", i, ...f]), style: o, ref: u, ...s, children: a });
});
Pu.displayName = "Panel";
const nv = "https://reactflow.dev?utm_source=attribution";
function vR({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : w.jsx(Pu, { position: a, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${nv}`, children: w.jsx("a", { href: nv, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const bR = (t) => {
  const a = [], i = [];
  for (const [, o] of t.nodeLookup)
    o.selected && a.push(o.internals.userNode);
  for (const [, o] of t.edgeLookup)
    o.selected && i.push(o);
  return { selectedNodes: a, selectedEdges: i };
}, ru = (t) => t.id;
function xR(t, a) {
  return St(t.selectedNodes.map(ru), a.selectedNodes.map(ru)) && St(t.selectedEdges.map(ru), a.selectedEdges.map(ru));
}
function SR({ onSelectionChange: t }) {
  const a = wt(), { selectedNodes: i, selectedEdges: o } = Pe(bR, xR);
  return E.useEffect(() => {
    const s = { nodes: i, edges: o };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [i, o, t]), null;
}
const wR = (t) => !!t.onSelectionChangeHandlers;
function ER({ onSelectionChange: t }) {
  const a = Pe(wR);
  return t || a ? w.jsx(SR, { onSelectionChange: t }) : null;
}
const Y1 = [0, 0], _R = { x: 0, y: 0, zoom: 1 }, NR = [
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
], av = [...NR, "rfId"], CR = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), lv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: No,
  nodeOrigin: Y1,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function MR(t) {
  const { setNodes: a, setEdges: i, setMinZoom: o, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: f, reset: h, setDefaultNodesAndEdges: p } = Pe(CR, St), g = wt();
  E.useEffect(() => (p(t.defaultNodes, t.defaultEdges), () => {
    y.current = lv, h();
  }), []);
  const y = E.useRef(lv);
  return E.useEffect(
    () => {
      for (const m of av) {
        const v = t[m], x = y.current[m];
        v !== x && (typeof t[m] > "u" || (m === "nodes" ? a(v) : m === "edges" ? i(v) : m === "minZoom" ? o(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? u(v) : m === "nodeExtent" ? f(v) : m === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: uT(v) }) : m === "fitView" ? g.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? g.setState({ fitViewOptions: v }) : g.setState({ [m]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    av.map((m) => t[m])
  ), null;
}
function iv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function TR(t) {
  const [a, i] = E.useState(t === "system" ? null : t);
  return E.useEffect(() => {
    if (t !== "system") {
      i(t);
      return;
    }
    const o = iv(), s = () => i(o?.matches ? "dark" : "light");
    return s(), o?.addEventListener("change", s), () => {
      o?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : iv()?.matches ? "dark" : "light";
}
const rv = typeof document < "u" ? document : null;
function Ro(t = null, a = { target: rv, actInsideInputWithModifier: !0 }) {
  const [i, o] = E.useState(!1), s = E.useRef(!1), u = E.useRef(/* @__PURE__ */ new Set([])), [f, h] = E.useMemo(() => {
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
  return E.useEffect(() => {
    const p = a?.target ?? rv, g = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !g) && x1(x))
          return !1;
        const R = sv(x.code, h);
        if (u.current.add(x[R]), ov(f, u.current, !1)) {
          const T = x.composedPath?.()?.[0] || x.target, M = T?.nodeName === "BUTTON" || T?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !M) && x.preventDefault(), o(!0);
        }
      }, m = (x) => {
        const S = sv(x.code, h);
        ov(f, u.current, !0) ? (o(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), o(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, o]), i;
}
function ov(t, a, i) {
  return t.filter((o) => i || o.length === a.size).some((o) => o.every((s) => a.has(s)));
}
function sv(t, a) {
  return a.includes(t) ? "code" : "key";
}
const RR = () => {
  const t = wt();
  return E.useMemo(() => ({
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
      const { width: o, height: s, minZoom: u, maxZoom: f, panZoom: h } = t.getState(), p = Hh(a, o, s, u, f, i?.padding ?? 0.1);
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
      return Vo(g, o, m, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: i, domNode: o } = t.getState();
      if (!o)
        return a;
      const { x: s, y: u } = o.getBoundingClientRect(), f = cr(a, i);
      return {
        x: f.x + s,
        y: f.y + u
      };
    }
  }), []);
};
function G1(t, a) {
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
      AR(p, h);
    i.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? i.splice(u.index, 0, { ...u.item }) : i.push({ ...u.item });
  }), i;
}
function AR(t, a) {
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
function DR(t, a) {
  return G1(t, a);
}
function zR(t, a) {
  return G1(t, a);
}
function ni(t, a) {
  return {
    id: t,
    type: "select",
    selected: a
  };
}
function tr(t, a = /* @__PURE__ */ new Set(), i = !1) {
  const o = [];
  for (const [s, u] of t) {
    const f = a.has(s);
    !(u.selected === void 0 && !f) && u.selected !== f && (i && (u.selected = f), o.push(ni(u.id, f)));
  }
  return o;
}
function uv({ items: t = [], lookup: a }) {
  const i = [], o = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const f = a.get(u.id), h = f?.internals?.userNode ?? f;
    h !== void 0 && h !== u && i.push({ id: u.id, item: u, type: "replace" }), h === void 0 && i.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    o.get(s) === void 0 && i.push({ id: s, type: "remove" });
  return i;
}
function cv(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const jR = p1();
function OR(t, a, i = {}) {
  return gT(t, a, {
    ...i,
    onError: i.onError ?? jR
  });
}
const fv = (t) => eT(t), LR = (t) => f1(t);
function q1(t) {
  return E.forwardRef(t);
}
const HR = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function dv(t) {
  const [a, i] = E.useState(BigInt(0)), [o] = E.useState(() => BR(() => i((s) => s + BigInt(1))));
  return HR(() => {
    const s = o.get();
    s.length && (t(s), o.reset());
  }, [a]), o;
}
function BR(t) {
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
const $1 = E.createContext(null);
function UR({ children: t }) {
  const a = wt(), i = E.useCallback((h) => {
    const { nodes: p = [], setNodes: g, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let R = p;
    for (const M of h)
      R = typeof M == "function" ? M(R) : M;
    let T = uv({
      items: R,
      lookup: v
    });
    for (const M of S.values())
      T = M(T);
    y && g(R), T.length > 0 ? m?.(T) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: M, nodes: L, setNodes: _ } = a.getState();
      M && _(L);
    });
  }, []), o = dv(i), s = E.useCallback((h) => {
    const { edges: p = [], setEdges: g, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? g(x) : m && m(uv({
      items: x,
      lookup: v
    }));
  }, []), u = dv(s), f = E.useMemo(() => ({ nodeQueue: o, edgeQueue: u }), []);
  return w.jsx($1.Provider, { value: f, children: t });
}
function kR() {
  const t = E.useContext($1);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const VR = (t) => !!t.panZoom;
function qh() {
  const t = RR(), a = wt(), i = kR(), o = Pe(VR), s = E.useMemo(() => {
    const u = (m) => a.getState().nodeLookup.get(m), f = (m) => {
      i.nodeQueue.push(m);
    }, h = (m) => {
      i.edgeQueue.push(m);
    }, p = (m) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = fv(m) ? m : v.get(m.id), R = S.parentId ? v1(S.position, S.measured, S.parentId, v, x) : S.position, T = {
        ...S,
        position: R,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return Mo(T);
    }, g = (m, v, x = { replace: !1 }) => {
      f((S) => S.map((R) => {
        if (R.id === m) {
          const T = typeof v == "function" ? v(R) : v;
          return x.replace && fv(T) ? T : { ...R, ...T };
        }
        return R;
      }));
    }, y = (m, v, x = { replace: !1 }) => {
      h((S) => S.map((R) => {
        if (R.id === m) {
          const T = typeof v == "function" ? v(R) : v;
          return x.replace && LR(T) ? T : { ...R, ...T };
        }
        return R;
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
        const { nodes: m = [], edges: v = [], transform: x } = a.getState(), [S, R, T] = x;
        return {
          nodes: m.map((M) => ({ ...M })),
          edges: v.map((M) => ({ ...M })),
          viewport: {
            x: S,
            y: R,
            zoom: T
          }
        };
      },
      deleteElements: async ({ nodes: m = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: R, onEdgesDelete: T, triggerNodeChanges: M, triggerEdgeChanges: L, onDelete: _, onBeforeDelete: z } = a.getState(), { nodes: Y, edges: B } = await iT({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: z
        }), U = B.length > 0, A = Y.length > 0;
        if (U) {
          const K = B.map(cv);
          T?.(B), L(K);
        }
        if (A) {
          const K = Y.map(cv);
          R?.(Y), M(K);
        }
        return (A || U) && _?.({ nodes: Y, edges: B }), { deletedNodes: Y, deletedEdges: B };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (m, v = !0, x) => {
        const S = Hy(m), R = S ? m : p(m), T = x !== void 0;
        return R ? (x || a.getState().nodes).filter((M) => {
          const L = a.getState().nodeLookup.get(M.id);
          if (L && !S && (M.id === m.id || !L.internals.positionAbsolute))
            return !1;
          const _ = Mo(T ? M : L), z = Lu(_, R);
          return v && z > 0 || z >= _.width * _.height || z >= R.width * R.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, x = !0) => {
        const R = Hy(m) ? m : p(m);
        if (!R)
          return !1;
        const T = Lu(R, v);
        return x && T > 0 || T >= v.width * v.height || T >= R.width * R.height;
      },
      updateNode: g,
      updateNodeData: (m, v, x = { replace: !1 }) => {
        g(m, (S) => {
          const R = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: R } : { ...S, data: { ...S.data, ...R } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (m, v, x = { replace: !1 }) => {
        y(m, (S) => {
          const R = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: R } : { ...S, data: { ...S.data, ...R } };
        }, x);
      },
      getNodesBounds: (m) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return tT(m, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = a.getState().fitViewResolver ?? sT();
        return a.setState({ fitViewQueued: !0, fitViewOptions: m, fitViewResolver: v }), i.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return E.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: o
  }), [o]);
}
const hv = (t) => t.selected, YR = typeof window < "u" ? window : void 0;
function GR({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const i = wt(), { deleteElements: o } = qh(), s = Ro(t, { actInsideInputWithModifier: !1 }), u = Ro(a, { target: YR });
  E.useEffect(() => {
    if (s) {
      const { edges: f, nodes: h } = i.getState();
      o({ nodes: h.filter(hv), edges: f.filter(hv) }), i.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), E.useEffect(() => {
    i.setState({ multiSelectionActive: u });
  }, [u]);
}
function qR(t) {
  const a = wt();
  E.useEffect(() => {
    const i = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Bh(t.current);
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
const Wu = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, $R = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function XR({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: i = !0, panOnScroll: o = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = ri.Free, zoomOnDoubleClick: f = !0, panOnDrag: h = !0, defaultViewport: p, translateExtent: g, minZoom: y, maxZoom: m, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: R, noPanClassName: T, onViewportChange: M, isControlledViewport: L, paneClickDistance: _, selectionOnDrag: z }) {
  const Y = wt(), B = E.useRef(null), { userSelectionActive: U, lib: A, connectionInProgress: K } = Pe($R, St), J = Ro(v), G = E.useRef();
  qR(B);
  const Q = E.useCallback((re) => {
    M?.({ x: re[0], y: re[1], zoom: re[2] }), L || Y.setState({ transform: re });
  }, [M, L]);
  return E.useEffect(() => {
    if (B.current) {
      G.current = XT({
        domNode: B.current,
        minZoom: y,
        maxZoom: m,
        translateExtent: g,
        viewport: p,
        onDraggingChange: (C) => Y.setState((O) => O.paneDragging === C ? O : { paneDragging: C }),
        onPanZoomStart: (C, O) => {
          const { onViewportChangeStart: q, onMoveStart: $ } = Y.getState();
          $?.(C, O), q?.(O);
        },
        onPanZoom: (C, O) => {
          const { onViewportChange: q, onMove: $ } = Y.getState();
          $?.(C, O), q?.(O);
        },
        onPanZoomEnd: (C, O) => {
          const { onViewportChangeEnd: q, onMoveEnd: $ } = Y.getState();
          $?.(C, O), q?.(O);
        }
      });
      const { x: re, y: j, zoom: Z } = G.current.getViewport();
      return Y.setState({
        panZoom: G.current,
        transform: [re, j, Z],
        domNode: B.current.closest(".react-flow")
      }), () => {
        G.current?.destroy();
      };
    }
  }, []), E.useEffect(() => {
    G.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: a,
      zoomOnPinch: i,
      panOnScroll: o,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: f,
      panOnDrag: h,
      zoomActivationKeyPressed: J,
      preventScrolling: x,
      noPanClassName: T,
      userSelectionActive: U,
      noWheelClassName: R,
      lib: A,
      onTransformChange: Q,
      connectionInProgress: K,
      selectionOnDrag: z,
      paneClickDistance: _
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
    J,
    x,
    T,
    U,
    R,
    A,
    Q,
    K,
    z,
    _
  ]), w.jsx("div", { className: "react-flow__renderer", ref: B, style: Wu, children: S });
}
const ZR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function QR() {
  const { userSelectionActive: t, userSelectionRect: a } = Pe(ZR, St);
  return t && a ? w.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Rd = (t, a) => (i) => {
  i.target === a.current && t?.(i);
}, IR = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function KR({ isSelecting: t, selectionKeyPressed: a, selectionMode: i = Co.Full, panOnDrag: o, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: f, onSelectionStart: h, onSelectionEnd: p, onPaneClick: g, onPaneContextMenu: y, onPaneScroll: m, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: R }) {
  const T = E.useRef(0), M = wt(), { userSelectionActive: L, elementsSelectable: _, dragging: z, panBy: Y, autoPanSpeed: B } = Pe(IR, St), U = _ && (t || L), A = E.useRef(null), K = E.useRef(), J = E.useRef(/* @__PURE__ */ new Set()), G = E.useRef(/* @__PURE__ */ new Set()), Q = E.useRef(!1), re = E.useRef(!1), j = E.useRef({ x: 0, y: 0 }), Z = E.useRef(!1), C = (ee) => {
    if (re.current || Q.current || M.getState().connection.inProgress) {
      re.current = !1, Q.current = !1;
      return;
    }
    g?.(ee), M.getState().resetSelectedElements(), M.setState({ nodesSelectionActive: !1 });
  }, O = (ee) => {
    if (Array.isArray(o) && o?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, q = m ? (ee) => m(ee) : void 0, $ = (ee) => {
    re.current && (ee.stopPropagation(), re.current = !1);
  }, ne = (ee) => {
    const { domNode: pe, transform: ze } = M.getState();
    if (K.current = pe?.getBoundingClientRect(), !K.current)
      return;
    const Ae = ee.target === A.current;
    if (!Ae && !!ee.target.closest(".nokey") || !t || !(f && Ae || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), re.current = !1;
    const { x: De, y: qe } = da(ee.nativeEvent, K.current), nt = Vo({ x: De, y: qe }, ze);
    M.setState({
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
    const { userSelectionRect: ze } = M.getState();
    if (!ze)
      return;
    const { transform: Ae, nodeLookup: we, edgeLookup: Se, connectionLookup: De, triggerNodeChanges: qe, triggerEdgeChanges: nt, defaultEdgeOptions: it } = M.getState(), Ft = { x: ze.startX, y: ze.startY }, { x: pt, y: Gt } = cr(Ft, Ae), Jt = {
      startX: Ft.x,
      startY: Ft.y,
      x: ee < pt ? ee : pt,
      y: pe < Gt ? pe : Gt,
      width: Math.abs(ee - pt),
      height: Math.abs(pe - Gt)
    }, Et = J.current, Qt = G.current;
    J.current = new Set(Oh(we, Jt, Ae, i === Co.Partial, !0).map((_t) => _t.id)), G.current = /* @__PURE__ */ new Set();
    const yt = it?.selectable ?? !0;
    for (const _t of J.current) {
      const Nt = De.get(_t);
      if (Nt)
        for (const { edgeId: Pt } of Nt.values()) {
          const qt = Se.get(Pt);
          qt && (qt.selectable ?? yt) && G.current.add(Pt);
        }
    }
    if (!By(Et, J.current)) {
      const _t = tr(we, J.current, !0);
      qe(_t);
    }
    if (!By(Qt, G.current)) {
      const _t = tr(Se, G.current);
      nt(_t);
    }
    M.setState({
      userSelectionRect: Jt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function V() {
    if (!s || !K.current)
      return;
    const [ee, pe] = Lh(j.current, K.current, B);
    Y({ x: ee, y: pe }).then((ze) => {
      if (!re.current || !ze) {
        T.current = requestAnimationFrame(V);
        return;
      }
      const { x: Ae, y: we } = j.current;
      D(Ae, we), T.current = requestAnimationFrame(V);
    });
  }
  const F = () => {
    cancelAnimationFrame(T.current), T.current = 0, Z.current = !1;
  };
  E.useEffect(() => () => F(), []);
  const le = (ee) => {
    const { userSelectionRect: pe, transform: ze, resetSelectedElements: Ae } = M.getState();
    if (!K.current || !pe)
      return;
    const { x: we, y: Se } = da(ee.nativeEvent, K.current);
    j.current = { x: we, y: Se };
    const De = cr({ x: pe.startX, y: pe.startY }, ze);
    if (!re.current) {
      const qe = a ? 0 : u;
      if (Math.hypot(we - De.x, Se - De.y) <= qe)
        return;
      Ae(), h?.(ee);
    }
    re.current = !0, Z.current || (V(), Z.current = !0), D(we, Se);
  }, se = (ee) => {
    if (!U) {
      ee.target === A.current && M.getState().connection.inProgress && (Q.current = !0);
      return;
    }
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !L && ee.target === A.current && M.getState().userSelectionRect && C?.(ee), M.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), re.current && (p?.(ee), M.setState({
      nodesSelectionActive: J.current.size > 0
    })), F());
  }, me = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), F();
  }, ge = o === !0 || Array.isArray(o) && o.includes(0);
  return w.jsxs("div", { className: Yt(["react-flow__pane", { draggable: ge, dragging: z, selection: t }]), onClick: U ? void 0 : Rd(C, A), onContextMenu: Rd(O, A), onWheel: Rd(q, A), onPointerEnter: U ? void 0 : v, onPointerMove: U ? le : x, onPointerUp: se, onPointerCancel: U ? me : void 0, onPointerDownCapture: U ? ne : void 0, onClickCapture: U ? $ : void 0, onPointerLeave: S, ref: A, style: Wu, children: [R, w.jsx(QR, {})] });
}
function oh({ id: t, store: a, unselect: i = !1, nodeRef: o }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: f, nodeLookup: h, onError: p } = a.getState(), g = h.get(t);
  if (!g) {
    p?.("012", ha.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), g.selected ? (i || g.selected && f) && (u({ nodes: [g], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : s([t]);
}
function X1({ nodeRef: t, disabled: a = !1, noDragClassName: i, handleSelector: o, nodeId: s, isSelectable: u, nodeClickDistance: f }) {
  const h = wt(), [p, g] = E.useState(!1), y = E.useRef();
  return E.useEffect(() => {
    y.current = DT({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (m) => {
        oh({
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
  }, []), E.useEffect(() => {
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
const FR = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function Z1() {
  const t = wt();
  return E.useCallback((i) => {
    const { nodeExtent: o, snapToGrid: s, snapGrid: u, nodesDraggable: f, onError: h, updateNodePositions: p, nodeLookup: g, nodeOrigin: y } = t.getState(), m = /* @__PURE__ */ new Map(), v = FR(f), x = s ? u[0] : 5, S = s ? u[1] : 5, R = i.direction.x * x * i.factor, T = i.direction.y * S * i.factor;
    for (const [, M] of g) {
      if (!v(M))
        continue;
      let L = {
        x: M.internals.positionAbsolute.x + R,
        y: M.internals.positionAbsolute.y + T
      };
      s && (L = ko(L, u));
      const { position: _, positionAbsolute: z } = d1({
        nodeId: M.id,
        nextPosition: L,
        nodeLookup: g,
        nodeExtent: o,
        nodeOrigin: y,
        onError: h
      });
      M.position = _, M.internals.positionAbsolute = z, m.set(M.id, M);
    }
    p(m);
  }, []);
}
const $h = E.createContext(null), JR = $h.Provider;
$h.Consumer;
const Q1 = () => E.useContext($h), PR = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), I1 = E.createContext(null);
function WR({ children: t }) {
  const a = Pe(PR, St);
  return w.jsx(I1.Provider, { value: a, children: t });
}
function e3() {
  const t = E.useContext(I1);
  if (!t)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return t;
}
const t3 = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, n3 = (t, a, i) => (o) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: f } = o, { fromHandle: h, toHandle: p, isValid: g } = f;
  if (!h && !s)
    return t3;
  const y = p?.nodeId === t && p?.id === a && p?.type === i;
  return {
    connectingFrom: h?.nodeId === t && h?.id === a && h?.type === i,
    connectingTo: y,
    clickConnecting: s?.nodeId === t && s?.id === a && s?.type === i,
    isPossibleEndHandle: u === sr.Strict ? h?.type !== i : t !== h?.nodeId || a !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && g
  };
};
function a3({ type: t = "source", position: a = Te.Top, isValidConnection: i, isConnectable: o = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: f, onConnect: h, children: p, className: g, onMouseDown: y, onTouchStart: m, ...v }, x) {
  const S = f || null, R = t === "target", T = wt(), M = Q1(), { connectOnClick: L, noPanClassName: _, rfId: z } = e3(), { connectingFrom: Y, connectingTo: B, clickConnecting: U, isPossibleEndHandle: A, connectionInProcess: K, clickConnectionInProcess: J, valid: G } = Pe(n3(M, S, t), St);
  M || T.getState().onError?.("010", ha.error010());
  const Q = (Z) => {
    const { defaultEdgeOptions: C, onConnect: O, hasDefaultEdges: q } = T.getState(), $ = {
      ...C,
      ...Z
    };
    if (q) {
      const { edges: ne, setEdges: D, onError: V } = T.getState();
      D(OR($, ne, { onError: V }));
    }
    O?.($), h?.($);
  }, re = (Z) => {
    if (!M)
      return;
    const C = S1(Z.nativeEvent);
    if (s && (C && Z.button === 0 || !C)) {
      const O = T.getState();
      rh.onPointerDown(Z.nativeEvent, {
        handleDomNode: Z.currentTarget,
        autoPanOnConnect: O.autoPanOnConnect,
        connectionMode: O.connectionMode,
        connectionRadius: O.connectionRadius,
        domNode: O.domNode,
        nodeLookup: O.nodeLookup,
        lib: O.lib,
        isTarget: R,
        handleId: S,
        nodeId: M,
        flowId: O.rfId,
        panBy: O.panBy,
        cancelConnection: O.cancelConnection,
        onConnectStart: O.onConnectStart,
        onConnectEnd: (...q) => T.getState().onConnectEnd?.(...q),
        updateConnection: O.updateConnection,
        onConnect: Q,
        isValidConnection: i || ((...q) => T.getState().isValidConnection?.(...q) ?? !0),
        getTransform: () => T.getState().transform,
        getFromHandle: () => T.getState().connection.fromHandle,
        autoPanSpeed: O.autoPanSpeed,
        dragThreshold: O.connectionDragThreshold
      });
    }
    C ? y?.(Z) : m?.(Z);
  }, j = (Z) => {
    const { onClickConnectStart: C, onClickConnectEnd: O, connectionClickStartHandle: q, connectionMode: $, isValidConnection: ne, lib: D, rfId: V, nodeLookup: F, connection: le } = T.getState();
    if (!M || !q && !s)
      return;
    if (!q) {
      C?.(Z.nativeEvent, { nodeId: M, handleId: S, handleType: t }), T.setState({ connectionClickStartHandle: { nodeId: M, type: t, id: S } });
      return;
    }
    const se = b1(Z.target), me = i || ne, { connection: ge, isValid: ee } = rh.isValid(Z.nativeEvent, {
      handle: {
        nodeId: M,
        id: S,
        type: t
      },
      connectionMode: $,
      fromNodeId: q.nodeId,
      fromHandleId: q.id || null,
      fromType: q.type,
      isValidConnection: me,
      flowId: V,
      doc: se,
      lib: D,
      nodeLookup: F
    });
    ee && ge && Q(ge);
    const pe = structuredClone(le);
    delete pe.inProgress, pe.toPosition = pe.toHandle ? pe.toHandle.position : null, O?.(Z, pe), T.setState({ connectionClickStartHandle: null });
  };
  return w.jsx("div", { "data-handleid": S, "data-nodeid": M, "data-handlepos": a, "data-id": `${z}-${M}-${S}-${t}`, className: Yt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    _,
    g,
    {
      source: !R,
      target: R,
      connectable: o,
      connectablestart: s,
      connectableend: u,
      clickconnecting: U,
      connectingfrom: Y,
      connectingto: B,
      valid: G,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!K || A) && (K || J ? u : s)
    }
  ]), onMouseDown: re, onTouchStart: re, onClick: L ? j : void 0, ref: x, ...v, children: p });
}
const dr = E.memo(q1(a3));
function l3({ data: t, isConnectable: a, sourcePosition: i = Te.Bottom }) {
  return w.jsxs(w.Fragment, { children: [t?.label, w.jsx(dr, { type: "source", position: i, isConnectable: a })] });
}
function i3({ data: t, isConnectable: a, targetPosition: i = Te.Top, sourcePosition: o = Te.Bottom }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(dr, { type: "target", position: i, isConnectable: a }), t?.label, w.jsx(dr, { type: "source", position: o, isConnectable: a })] });
}
function r3() {
  return null;
}
function o3({ data: t, isConnectable: a, targetPosition: i = Te.Top }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(dr, { type: "target", position: i, isConnectable: a }), t?.label] });
}
const Hu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, mv = {
  input: l3,
  default: i3,
  output: o3,
  group: r3
};
function s3(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const u3 = (t) => {
  const { width: a, height: i, x: o, y: s } = Uo(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: fa(a) ? a : null,
    height: fa(i) ? i : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${o}px,${s}px)`
  };
};
function c3({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: i }) {
  const o = wt(), { width: s, height: u, transformString: f, userSelectionActive: h } = Pe(u3, St), p = Z1(), g = E.useRef(null);
  E.useEffect(() => {
    i || g.current?.focus({
      preventScroll: !0
    });
  }, [i]);
  const y = !h && s !== null && u !== null;
  if (X1({
    nodeRef: g,
    disabled: !y
  }), !y)
    return null;
  const m = t ? (x) => {
    const S = o.getState().nodes.filter((R) => R.selected);
    t(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Hu, x.key) && (x.preventDefault(), p({
      direction: Hu[x.key],
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
const gv = typeof window < "u" ? window : void 0, f3 = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function K1({ children: t, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: f, paneClickDistance: h, deleteKeyCode: p, selectionKeyCode: g, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: R, zoomActivationKeyCode: T, elementsSelectable: M, zoomOnScroll: L, zoomOnPinch: _, panOnScroll: z, panOnScrollSpeed: Y, panOnScrollMode: B, zoomOnDoubleClick: U, panOnDrag: A, autoPanOnSelection: K, defaultViewport: J, translateExtent: G, minZoom: Q, maxZoom: re, preventScrolling: j, onSelectionContextMenu: Z, noWheelClassName: C, noPanClassName: O, disableKeyboardA11y: q, onViewportChange: $, isControlledViewport: ne }) {
  const { nodesSelectionActive: D, userSelectionActive: V } = Pe(f3, St), F = Ro(g, { target: gv }), le = Ro(R, { target: gv }), se = le || A, me = le || z, ge = y && se !== !0, ee = F || V || ge;
  return GR({ deleteKeyCode: p, multiSelectionKeyCode: S }), w.jsx(XR, { onPaneContextMenu: u, elementsSelectable: M, zoomOnScroll: L, zoomOnPinch: _, panOnScroll: me, panOnScrollSpeed: Y, panOnScrollMode: B, zoomOnDoubleClick: U, panOnDrag: !F && se, defaultViewport: J, translateExtent: G, minZoom: Q, maxZoom: re, zoomActivationKeyCode: T, preventScrolling: j, noWheelClassName: C, noPanClassName: O, onViewportChange: $, isControlledViewport: ne, paneClickDistance: h, selectionOnDrag: ge, children: w.jsxs(KR, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: f, panOnDrag: se, autoPanOnSelection: K, isSelecting: !!ee, selectionMode: m, selectionKeyPressed: F, paneClickDistance: h, selectionOnDrag: ge, children: [t, D && w.jsx(c3, { onSelectionContextMenu: Z, noPanClassName: O, disableKeyboardA11y: q })] }) });
}
K1.displayName = "FlowRenderer";
const d3 = E.memo(K1), h3 = (t) => (a) => t ? Oh(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((i) => i.id) : Array.from(a.nodeLookup.keys());
function m3(t) {
  return Pe(E.useCallback(h3(t), [t]), St);
}
const g3 = (t) => t.updateNodeInternals;
function p3() {
  const t = Pe(g3), [a] = E.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((i) => {
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
  return E.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function y3({ node: t, nodeType: a, hasDimensions: i, resizeObserver: o }) {
  const s = wt(), u = E.useRef(null), f = E.useRef(null), h = E.useRef(t.sourcePosition), p = E.useRef(t.targetPosition), g = E.useRef(a), y = i && !!t.internals.handleBounds;
  return E.useEffect(() => {
    u.current && !t.hidden && (!y || f.current !== u.current) && (f.current && o?.unobserve(f.current), o?.observe(u.current), f.current = u.current);
  }, [y, t.hidden]), E.useEffect(() => () => {
    f.current && (o?.unobserve(f.current), f.current = null);
  }, []), E.useEffect(() => {
    if (u.current) {
      const m = g.current !== a, v = h.current !== t.sourcePosition, x = p.current !== t.targetPosition;
      (m || v || x) && (g.current = a, h.current = t.sourcePosition, p.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, a, t.sourcePosition, t.targetPosition]), u;
}
function v3({ id: t, onClick: a, onMouseEnter: i, onMouseMove: o, onMouseLeave: s, onContextMenu: u, onDoubleClick: f, nodesDraggable: h, elementsSelectable: p, nodesConnectable: g, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: R, nodeTypes: T, nodeClickDistance: M, onError: L }) {
  const { node: _, internals: z, isParent: Y } = Pe((ee) => {
    const pe = ee.nodeLookup.get(t), ze = ee.parentLookup.has(t);
    return {
      node: pe,
      internals: pe.internals,
      isParent: ze
    };
  }, St);
  let B = _.type || "default", U = T?.[B] || mv[B];
  U === void 0 && (L?.("003", ha.error003(B)), B = "default", U = T?.default || mv.default);
  const A = !!(_.draggable || h && typeof _.draggable > "u"), K = !!(_.selectable || p && typeof _.selectable > "u"), J = !!(_.connectable || g && typeof _.connectable > "u"), G = !!(_.focusable || y && typeof _.focusable > "u"), Q = wt(), re = y1(_), j = y3({ node: _, nodeType: B, hasDimensions: re, resizeObserver: m }), Z = X1({
    nodeRef: j,
    disabled: _.hidden || !A,
    noDragClassName: v,
    handleSelector: _.dragHandle,
    nodeId: t,
    isSelectable: K,
    nodeClickDistance: M
  }), C = Z1();
  if (_.hidden)
    return null;
  const O = tl(_), q = s3(_), $ = K || A || a || i || o || s, ne = i ? (ee) => i(ee, { ...z.userNode }) : void 0, D = o ? (ee) => o(ee, { ...z.userNode }) : void 0, V = s ? (ee) => s(ee, { ...z.userNode }) : void 0, F = u ? (ee) => u(ee, { ...z.userNode }) : void 0, le = f ? (ee) => f(ee, { ...z.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: pe, nodeDragThreshold: ze } = Q.getState();
    K && (!pe || !A || ze > 0) && oh({
      id: t,
      store: Q,
      nodeRef: j
    }), a && a(ee, { ...z.userNode });
  }, me = (ee) => {
    if (!(x1(ee.nativeEvent) || S)) {
      if (o1.includes(ee.key) && K) {
        const pe = ee.key === "Escape";
        oh({
          id: t,
          store: Q,
          unselect: pe,
          nodeRef: j
        });
      } else if (A && _.selected && Object.prototype.hasOwnProperty.call(Hu, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: pe } = Q.getState();
        Q.setState({
          ariaLiveMessage: pe["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~z.positionAbsolute.x,
            y: ~~z.positionAbsolute.y
          })
        }), C({
          direction: Hu[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, ge = () => {
    if (S || !j.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: pe, height: ze, autoPanOnNodeFocus: Ae, setCenter: we } = Q.getState();
    if (!Ae)
      return;
    Oh(/* @__PURE__ */ new Map([[t, _]]), { x: 0, y: 0, width: pe, height: ze }, ee, !0).length > 0 || we(_.position.x + O.width / 2, _.position.y + O.height / 2, {
      zoom: ee[2]
    });
  };
  return w.jsx("div", { className: Yt([
    "react-flow__node",
    `react-flow__node-${B}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: A
    },
    _.className,
    {
      selected: _.selected,
      selectable: K,
      parent: Y,
      draggable: A,
      dragging: Z
    }
  ]), ref: j, style: {
    zIndex: z.z,
    transform: `translate(${z.positionAbsolute.x}px,${z.positionAbsolute.y}px)`,
    pointerEvents: $ ? "all" : "none",
    visibility: re ? "visible" : "hidden",
    ..._.style,
    ...q
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: ne, onMouseMove: D, onMouseLeave: V, onContextMenu: F, onClick: se, onDoubleClick: le, onKeyDown: G ? me : void 0, tabIndex: G ? 0 : void 0, onFocus: G ? ge : void 0, role: _.ariaRole ?? (G ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${k1}-${R}`, "aria-label": _.ariaLabel, ..._.domAttributes, children: w.jsx(JR, { value: t, children: w.jsx(U, { id: t, data: _.data, type: B, positionAbsoluteX: z.positionAbsolute.x, positionAbsoluteY: z.positionAbsolute.y, selected: _.selected ?? !1, selectable: K, draggable: A, deletable: _.deletable ?? !0, isConnectable: J, sourcePosition: _.sourcePosition, targetPosition: _.targetPosition, dragging: Z, dragHandle: _.dragHandle, zIndex: z.z, parentId: _.parentId, ...O }) }) });
}
var b3 = E.memo(v3);
const x3 = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function F1(t) {
  const { nodesDraggable: a, nodesConnectable: i, nodesFocusable: o, elementsSelectable: s, onError: u } = Pe(x3, St), f = m3(t.onlyRenderVisibleElements), h = p3();
  return w.jsx("div", { className: "react-flow__nodes", style: Wu, children: f.map((p) => (
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
    w.jsx(b3, { id: p, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: i, nodesFocusable: o, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, p)
  )) });
}
F1.displayName = "NodeRenderer";
const S3 = E.memo(F1);
function w3(t) {
  return Pe(E.useCallback((i) => {
    if (!t)
      return i.edges.map((s) => s.id);
    const o = [];
    if (i.width && i.height)
      for (const s of i.edges) {
        const u = i.nodeLookup.get(s.source), f = i.nodeLookup.get(s.target);
        u && f && dT({
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
const E3 = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return w.jsx("polyline", { className: "arrow", style: i, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, _3 = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return w.jsx("polyline", { className: "arrowclosed", style: i, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, pv = {
  [ju.Arrow]: E3,
  [ju.ArrowClosed]: _3
};
function N3(t) {
  const a = wt();
  return E.useMemo(() => Object.prototype.hasOwnProperty.call(pv, t) ? pv[t] : (a.getState().onError?.("009", ha.error009(t)), null), [t]);
}
const C3 = ({ id: t, type: a, color: i, width: o = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: f, orient: h = "auto-start-reverse" }) => {
  const p = N3(a);
  return p ? w.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${o}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: w.jsx(p, { color: i, strokeWidth: f }) }) : null;
}, J1 = ({ defaultColor: t, rfId: a }) => {
  const i = Pe((u) => u.edges), o = Pe((u) => u.defaultEdgeOptions), s = E.useMemo(() => xT(i, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [i, o, a, t]);
  return s.length ? w.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: w.jsx("defs", { children: s.map((u) => w.jsx(C3, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
J1.displayName = "MarkerDefinitions";
var M3 = E.memo(J1);
function P1({ x: t, y: a, label: i, labelStyle: o, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: f = [2, 4], labelBgBorderRadius: h = 2, children: p, className: g, ...y }) {
  const [m, v] = E.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Yt(["react-flow__edge-textwrapper", g]), S = E.useRef(null);
  return E.useEffect(() => {
    if (S.current) {
      const R = S.current.getBBox();
      v({
        x: R.x,
        y: R.y,
        width: R.width,
        height: R.height
      });
    }
  }, [i]), i ? w.jsxs("g", { transform: `translate(${t - m.width / 2} ${a - m.height / 2})`, className: x, visibility: m.width ? "visible" : "hidden", ...y, children: [s && w.jsx("rect", { width: m.width + 2 * f[0], x: -f[0], y: -f[1], height: m.height + 2 * f[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), w.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: S, style: o, children: i }), p] }) : null;
}
P1.displayName = "EdgeText";
const T3 = E.memo(P1);
function ec({ path: t, labelX: a, labelY: i, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, interactionWidth: g = 20, ...y }) {
  return w.jsxs(w.Fragment, { children: [w.jsx("path", { ...y, d: t, fill: "none", className: Yt(["react-flow__edge-path", y.className]) }), g ? w.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: g, className: "react-flow__edge-interaction" }) : null, o && fa(a) && fa(i) ? w.jsx(T3, { x: a, y: i, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p }) : null] });
}
function yv({ pos: t, x1: a, y1: i, x2: o, y2: s }) {
  return t === Te.Left || t === Te.Right ? [0.5 * (a + o), i] : [a, 0.5 * (i + s)];
}
function W1({ sourceX: t, sourceY: a, sourcePosition: i = Te.Bottom, targetX: o, targetY: s, targetPosition: u = Te.Top }) {
  const [f, h] = yv({
    pos: i,
    x1: t,
    y1: a,
    x2: o,
    y2: s
  }), [p, g] = yv({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a
  }), [y, m, v, x] = w1({
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
function ex(t) {
  return E.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, sourcePosition: f, targetPosition: h, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: T, interactionWidth: M }) => {
    const [L, _, z] = W1({
      sourceX: i,
      sourceY: o,
      sourcePosition: f,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), Y = t.isInternal ? void 0 : a;
    return w.jsx(ec, { id: Y, path: L, labelX: _, labelY: z, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: T, interactionWidth: M });
  });
}
const R3 = ex({ isInternal: !1 }), tx = ex({ isInternal: !0 });
R3.displayName = "SimpleBezierEdge";
tx.displayName = "SimpleBezierEdgeInternal";
function nx(t) {
  return E.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: x = Te.Bottom, targetPosition: S = Te.Top, markerEnd: R, markerStart: T, pathOptions: M, interactionWidth: L }) => {
    const [_, z, Y] = ah({
      sourceX: i,
      sourceY: o,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: M?.borderRadius,
      offset: M?.offset,
      stepPosition: M?.stepPosition
    }), B = t.isInternal ? void 0 : a;
    return w.jsx(ec, { id: B, path: _, labelX: z, labelY: Y, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: R, markerStart: T, interactionWidth: L });
  });
}
const ax = nx({ isInternal: !1 }), lx = nx({ isInternal: !0 });
ax.displayName = "SmoothStepEdge";
lx.displayName = "SmoothStepEdgeInternal";
function ix(t) {
  return E.memo(({ id: a, ...i }) => {
    const o = t.isInternal ? void 0 : a;
    return w.jsx(ax, { ...i, id: o, pathOptions: E.useMemo(() => ({ borderRadius: 0, offset: i.pathOptions?.offset }), [i.pathOptions?.offset]) });
  });
}
const A3 = ix({ isInternal: !1 }), rx = ix({ isInternal: !0 });
A3.displayName = "StepEdge";
rx.displayName = "StepEdgeInternal";
function ox(t) {
  return E.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: R }) => {
    const [T, M, L] = N1({ sourceX: i, sourceY: o, targetX: s, targetY: u }), _ = t.isInternal ? void 0 : a;
    return w.jsx(ec, { id: _, path: T, labelX: M, labelY: L, label: f, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: R });
  });
}
const D3 = ox({ isInternal: !1 }), sx = ox({ isInternal: !0 });
D3.displayName = "StraightEdge";
sx.displayName = "StraightEdgeInternal";
function ux(t) {
  return E.memo(({ id: a, sourceX: i, sourceY: o, targetX: s, targetY: u, sourcePosition: f = Te.Bottom, targetPosition: h = Te.Top, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: T, pathOptions: M, interactionWidth: L }) => {
    const [_, z, Y] = E1({
      sourceX: i,
      sourceY: o,
      sourcePosition: f,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: M?.curvature
    }), B = t.isInternal ? void 0 : a;
    return w.jsx(ec, { id: B, path: _, labelX: z, labelY: Y, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: T, interactionWidth: L });
  });
}
const z3 = ux({ isInternal: !1 }), cx = ux({ isInternal: !0 });
z3.displayName = "BezierEdge";
cx.displayName = "BezierEdgeInternal";
const vv = {
  default: cx,
  straight: sx,
  step: rx,
  smoothstep: lx,
  simplebezier: tx
}, bv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, j3 = (t, a, i) => i === Te.Left ? t - a : i === Te.Right ? t + a : t, O3 = (t, a, i) => i === Te.Top ? t - a : i === Te.Bottom ? t + a : t, xv = "react-flow__edgeupdater";
function Sv({ position: t, centerX: a, centerY: i, radius: o = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: f, type: h }) {
  return w.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: f, className: Yt([xv, `${xv}-${h}`]), cx: j3(a, o, t), cy: O3(i, o, t), r: o, stroke: "transparent", fill: "transparent" });
}
function L3({ isReconnectable: t, reconnectRadius: a, edge: i, sourceX: o, sourceY: s, targetX: u, targetY: f, sourcePosition: h, targetPosition: p, onReconnect: g, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: x }) {
  const S = wt(), R = (z, Y) => {
    if (z.button !== 0)
      return;
    const { autoPanOnConnect: B, domNode: U, connectionMode: A, connectionRadius: K, lib: J, onConnectStart: G, cancelConnection: Q, nodeLookup: re, rfId: j, panBy: Z, updateConnection: C } = S.getState(), O = Y.type === "target", q = (D, V) => {
      v(!1), m?.(D, i, Y.type, V);
    }, $ = (D) => g?.(i, D), ne = (D, V) => {
      v(!0), y?.(z, i, Y.type), G?.(D, V);
    };
    rh.onPointerDown(z.nativeEvent, {
      autoPanOnConnect: B,
      connectionMode: A,
      connectionRadius: K,
      domNode: U,
      handleId: Y.id,
      nodeId: Y.nodeId,
      nodeLookup: re,
      isTarget: O,
      edgeUpdaterType: Y.type,
      lib: J,
      flowId: j,
      cancelConnection: Q,
      panBy: Z,
      isValidConnection: (...D) => S.getState().isValidConnection?.(...D) ?? !0,
      onConnect: $,
      onConnectStart: ne,
      onConnectEnd: (...D) => S.getState().onConnectEnd?.(...D),
      onReconnectEnd: q,
      updateConnection: C,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: z.currentTarget
    });
  }, T = (z) => R(z, { nodeId: i.target, id: i.targetHandle ?? null, type: "target" }), M = (z) => R(z, { nodeId: i.source, id: i.sourceHandle ?? null, type: "source" }), L = () => x(!0), _ = () => x(!1);
  return w.jsxs(w.Fragment, { children: [(t === !0 || t === "source") && w.jsx(Sv, { position: h, centerX: o, centerY: s, radius: a, onMouseDown: T, onMouseEnter: L, onMouseOut: _, type: "source" }), (t === !0 || t === "target") && w.jsx(Sv, { position: p, centerX: u, centerY: f, radius: a, onMouseDown: M, onMouseEnter: L, onMouseOut: _, type: "target" })] });
}
function H3({ id: t, edgesFocusable: a, edgesReconnectable: i, elementsSelectable: o, onClick: s, onDoubleClick: u, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: R, noPanClassName: T, onError: M, disableKeyboardA11y: L }) {
  let _ = Pe((we) => we.edgeLookup.get(t));
  const z = Pe((we) => we.defaultEdgeOptions);
  _ = z ? { ...z, ..._ } : _;
  let Y = _.type || "default", B = R?.[Y] || vv[Y];
  B === void 0 && (M?.("011", ha.error011(Y)), Y = "default", B = R?.default || vv.default);
  const U = !!(_.focusable || a && typeof _.focusable > "u"), A = typeof m < "u" && (_.reconnectable || i && typeof _.reconnectable > "u"), K = !!(_.selectable || o && typeof _.selectable > "u"), J = E.useRef(null), [G, Q] = E.useState(!1), [re, j] = E.useState(!1), Z = wt(), { zIndex: C = _.zIndex, sourceX: O, sourceY: q, targetX: $, targetY: ne, sourcePosition: D, targetPosition: V } = Pe(E.useCallback((we) => {
    const Se = we.nodeLookup.get(_.source), De = we.nodeLookup.get(_.target);
    if (!Se || !De)
      return bv;
    const qe = bT({
      id: t,
      sourceNode: Se,
      targetNode: De,
      sourceHandle: _.sourceHandle || null,
      targetHandle: _.targetHandle || null,
      connectionMode: we.connectionMode,
      onError: M
    }), nt = fT({
      selected: _.selected,
      zIndex: _.zIndex,
      sourceNode: Se,
      targetNode: De,
      elevateOnSelect: we.elevateEdgesOnSelect,
      zIndexMode: we.zIndexMode
    });
    return {
      ...qe || bv,
      zIndex: nt
    };
  }, [_.source, _.target, _.sourceHandle, _.targetHandle, _.selected, _.zIndex]), St), F = E.useMemo(() => _.markerStart ? `url('#${lh(_.markerStart, S)}')` : void 0, [_.markerStart, S]), le = E.useMemo(() => _.markerEnd ? `url('#${lh(_.markerEnd, S)}')` : void 0, [_.markerEnd, S]);
  if (_.hidden || O === null || q === null || $ === null || ne === null)
    return null;
  const se = (we) => {
    const { addSelectedEdges: Se, unselectNodesAndEdges: De, multiSelectionActive: qe } = Z.getState();
    K && (Z.setState({ nodesSelectionActive: !1 }), _.selected && qe ? (De({ nodes: [], edges: [_] }), J.current?.blur()) : Se([t])), s && s(we, _);
  }, me = u ? (we) => {
    u(we, { ..._ });
  } : void 0, ge = f ? (we) => {
    f(we, { ..._ });
  } : void 0, ee = h ? (we) => {
    h(we, { ..._ });
  } : void 0, pe = p ? (we) => {
    p(we, { ..._ });
  } : void 0, ze = g ? (we) => {
    g(we, { ..._ });
  } : void 0, Ae = (we) => {
    if (!L && o1.includes(we.key) && K) {
      const { unselectNodesAndEdges: Se, addSelectedEdges: De } = Z.getState();
      we.key === "Escape" ? (J.current?.blur(), Se({ edges: [_] })) : De([t]);
    }
  };
  return w.jsx("svg", { style: { zIndex: C }, children: w.jsxs("g", { className: Yt([
    "react-flow__edge",
    `react-flow__edge-${Y}`,
    _.className,
    T,
    {
      selected: _.selected,
      animated: _.animated,
      inactive: !K && !s,
      updating: G,
      selectable: K
    }
  ]), onClick: se, onDoubleClick: me, onContextMenu: ge, onMouseEnter: ee, onMouseMove: pe, onMouseLeave: ze, onKeyDown: U ? Ae : void 0, tabIndex: U ? 0 : void 0, role: _.ariaRole ?? (U ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": _.ariaLabel === null ? void 0 : _.ariaLabel || `Edge from ${_.source} to ${_.target}`, "aria-describedby": U ? `${V1}-${S}` : void 0, ref: J, ..._.domAttributes, children: [!re && w.jsx(B, { id: t, source: _.source, target: _.target, type: _.type, selected: _.selected, animated: _.animated, selectable: K, deletable: _.deletable ?? !0, label: _.label, labelStyle: _.labelStyle, labelShowBg: _.labelShowBg, labelBgStyle: _.labelBgStyle, labelBgPadding: _.labelBgPadding, labelBgBorderRadius: _.labelBgBorderRadius, sourceX: O, sourceY: q, targetX: $, targetY: ne, sourcePosition: D, targetPosition: V, data: _.data, style: _.style, sourceHandleId: _.sourceHandle, targetHandleId: _.targetHandle, markerStart: F, markerEnd: le, pathOptions: "pathOptions" in _ ? _.pathOptions : void 0, interactionWidth: _.interactionWidth }), A && w.jsx(L3, { edge: _, isReconnectable: A, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, sourceX: O, sourceY: q, targetX: $, targetY: ne, sourcePosition: D, targetPosition: V, setUpdateHover: Q, setReconnecting: j })] }) });
}
var B3 = E.memo(H3);
const U3 = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function fx({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: i, edgeTypes: o, noPanClassName: s, onReconnect: u, onEdgeContextMenu: f, onEdgeMouseEnter: h, onEdgeMouseMove: p, onEdgeMouseLeave: g, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: R }) {
  const { edgesFocusable: T, edgesReconnectable: M, elementsSelectable: L, onError: _ } = Pe(U3, St), z = w3(a);
  return w.jsxs("div", { className: "react-flow__edges", children: [w.jsx(M3, { defaultColor: t, rfId: i }), z.map((Y) => w.jsx(B3, { id: Y, edgesFocusable: T, edgesReconnectable: M, elementsSelectable: L, noPanClassName: s, onReconnect: u, onContextMenu: f, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: i, onError: _, edgeTypes: o, disableKeyboardA11y: R }, Y))] });
}
fx.displayName = "EdgeRenderer";
const k3 = E.memo(fx), V3 = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function Y3({ children: t }) {
  const a = Pe(V3);
  return w.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function G3(t) {
  const a = qh(), i = E.useRef(!1);
  E.useEffect(() => {
    !i.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), i.current = !0);
  }, [t, a.viewportInitialized]);
}
const q3 = (t) => t.panZoom?.syncViewport;
function $3(t) {
  const a = Pe(q3), i = wt();
  return E.useEffect(() => {
    t && (a?.(t), i.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function X3(t) {
  return t.connection.inProgress ? { ...t.connection, to: Vo(t.connection.to, t.transform) } : { ...t.connection };
}
function Z3(t) {
  return X3;
}
function Q3(t) {
  const a = Z3();
  return Pe(a, St);
}
const I3 = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function K3({ containerStyle: t, style: a, type: i, component: o }) {
  const { nodesConnectable: s, width: u, height: f, isValid: h, inProgress: p } = Pe(I3, St);
  return !(u && s && p) ? null : w.jsx("svg", { style: t, width: u, height: f, className: "react-flow__connectionline react-flow__container", children: w.jsx("g", { className: Yt(["react-flow__connection", c1(h)]), children: w.jsx(dx, { style: a, type: i, CustomComponent: o, isValid: h }) }) });
}
const dx = ({ style: t, type: a = Ll.Bezier, CustomComponent: i, isValid: o }) => {
  const { inProgress: s, from: u, fromNode: f, fromHandle: h, fromPosition: p, to: g, toNode: y, toHandle: m, toPosition: v, pointer: x } = Q3();
  if (!s)
    return;
  if (i)
    return w.jsx(i, { connectionLineType: a, connectionLineStyle: t, fromNode: f, fromHandle: h, fromX: u.x, fromY: u.y, toX: g.x, toY: g.y, fromPosition: p, toPosition: v, connectionStatus: c1(o), toNode: y, toHandle: m, pointer: x });
  let S = "";
  const R = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: g.x,
    targetY: g.y,
    targetPosition: v
  };
  switch (a) {
    case Ll.Bezier:
      [S] = E1(R);
      break;
    case Ll.SimpleBezier:
      [S] = W1(R);
      break;
    case Ll.Step:
      [S] = ah({
        ...R,
        borderRadius: 0
      });
      break;
    case Ll.SmoothStep:
      [S] = ah(R);
      break;
    default:
      [S] = N1(R);
  }
  return w.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: t });
};
dx.displayName = "ConnectionLine";
const F3 = {};
function wv(t = F3) {
  E.useRef(t), wt(), E.useEffect(() => {
  }, [t]);
}
function J3() {
  wt(), E.useRef(!1), E.useEffect(() => {
  }, []);
}
function hx({ nodeTypes: t, edgeTypes: a, onInit: i, onNodeClick: o, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: f, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: R, connectionLineComponent: T, connectionLineContainerStyle: M, selectionKeyCode: L, selectionOnDrag: _, selectionMode: z, multiSelectionKeyCode: Y, panActivationKeyCode: B, zoomActivationKeyCode: U, deleteKeyCode: A, onlyRenderVisibleElements: K, elementsSelectable: J, defaultViewport: G, translateExtent: Q, minZoom: re, maxZoom: j, preventScrolling: Z, defaultMarkerColor: C, zoomOnScroll: O, zoomOnPinch: q, panOnScroll: $, panOnScrollSpeed: ne, panOnScrollMode: D, zoomOnDoubleClick: V, panOnDrag: F, autoPanOnSelection: le, onPaneClick: se, onPaneMouseEnter: me, onPaneMouseMove: ge, onPaneMouseLeave: ee, onPaneScroll: pe, onPaneContextMenu: ze, paneClickDistance: Ae, nodeClickDistance: we, onEdgeContextMenu: Se, onEdgeMouseEnter: De, onEdgeMouseMove: qe, onEdgeMouseLeave: nt, reconnectRadius: it, onReconnect: Ft, onReconnectStart: pt, onReconnectEnd: Gt, noDragClassName: Jt, noWheelClassName: Et, noPanClassName: Qt, disableKeyboardA11y: yt, nodeExtent: _t, rfId: Nt, viewport: Pt, onViewportChange: qt }) {
  return wv(t), wv(a), J3(), G3(i), $3(Pt), w.jsx(d3, { onPaneClick: se, onPaneMouseEnter: me, onPaneMouseMove: ge, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: pe, paneClickDistance: Ae, deleteKeyCode: A, selectionKeyCode: L, selectionOnDrag: _, selectionMode: z, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: Y, panActivationKeyCode: B, zoomActivationKeyCode: U, elementsSelectable: J, zoomOnScroll: O, zoomOnPinch: q, zoomOnDoubleClick: V, panOnScroll: $, panOnScrollSpeed: ne, panOnScrollMode: D, panOnDrag: F, autoPanOnSelection: le, defaultViewport: G, translateExtent: Q, minZoom: re, maxZoom: j, onSelectionContextMenu: m, preventScrolling: Z, noDragClassName: Jt, noWheelClassName: Et, noPanClassName: Qt, disableKeyboardA11y: yt, onViewportChange: qt, isControlledViewport: !!Pt, children: w.jsxs(Y3, { children: [w.jsx(k3, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: f, onReconnect: Ft, onReconnectStart: pt, onReconnectEnd: Gt, onlyRenderVisibleElements: K, onEdgeContextMenu: Se, onEdgeMouseEnter: De, onEdgeMouseMove: qe, onEdgeMouseLeave: nt, reconnectRadius: it, defaultMarkerColor: C, noPanClassName: Qt, disableKeyboardA11y: yt, rfId: Nt }), w.jsx(K3, { style: R, type: S, component: T, containerStyle: M }), w.jsx("div", { className: "react-flow__edgelabel-renderer" }), w.jsx(S3, { nodeTypes: t, onNodeClick: o, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, nodeClickDistance: we, onlyRenderVisibleElements: K, noPanClassName: Qt, noDragClassName: Jt, disableKeyboardA11y: yt, nodeExtent: _t, rfId: Nt }), w.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
hx.displayName = "GraphView";
const P3 = E.memo(hx), W3 = p1(), Ev = ({ nodes: t, edges: a, defaultNodes: i, defaultEdges: o, width: s, height: u, fitView: f, fitViewOptions: h, minZoom: p = 0.5, maxZoom: g = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), M = o ?? a ?? [], L = i ?? t ?? [], _ = y ?? [0, 0], z = m ?? No;
  T1(R, T, M);
  const { nodesInitialized: Y } = ih(L, x, S, {
    nodeOrigin: _,
    nodeExtent: z,
    zIndexMode: v
  });
  let B = [0, 0, 1];
  if (f && s && u) {
    const U = Uo(x, {
      filter: (G) => !!((G.width || G.initialWidth) && (G.height || G.initialHeight))
    }), { x: A, y: K, zoom: J } = Hh(U, s, u, p, g, h?.padding ?? 0.1);
    B = [A, K, J];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: B,
    nodes: L,
    nodesInitialized: Y,
    nodeLookup: x,
    parentLookup: S,
    edges: M,
    edgeLookup: T,
    connectionLookup: R,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: i !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: g,
    translateExtent: No,
    nodeExtent: z,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: sr.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: _,
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
    connection: { ...u1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: W3,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: s1,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, eA = ({ nodes: t, edges: a, defaultNodes: i, defaultEdges: o, width: s, height: u, fitView: f, fitViewOptions: h, minZoom: p, maxZoom: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => sR((x, S) => {
  async function R() {
    const { nodeLookup: T, panZoom: M, fitViewOptions: L, fitViewResolver: _, width: z, height: Y, minZoom: B, maxZoom: U } = S();
    M && (await lT({
      nodes: T,
      width: z,
      height: Y,
      panZoom: M,
      minZoom: B,
      maxZoom: U
    }, L), _?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...Ev({
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
    setNodes: (T) => {
      const { nodeLookup: M, parentLookup: L, nodeOrigin: _, elevateNodesOnSelect: z, fitViewQueued: Y, zIndexMode: B, nodesSelectionActive: U } = S(), { nodesInitialized: A, hasSelectedNodes: K } = ih(T, M, L, {
        nodeOrigin: _,
        nodeExtent: m,
        elevateNodesOnSelect: z,
        checkEquality: !0,
        zIndexMode: B
      }), J = U && K;
      Y && A ? (R(), x({
        nodes: T,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: J
      })) : x({ nodes: T, nodesInitialized: A, nodesSelectionActive: J });
    },
    setEdges: (T) => {
      const { connectionLookup: M, edgeLookup: L } = S();
      T1(M, L, T), x({ edges: T });
    },
    setDefaultNodesAndEdges: (T, M) => {
      if (T) {
        const { setNodes: L } = S();
        L(T), x({ hasDefaultNodes: !0 });
      }
      if (M) {
        const { setEdges: L } = S();
        L(M), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (T) => {
      const { triggerNodeChanges: M, nodeLookup: L, parentLookup: _, domNode: z, nodeOrigin: Y, nodeExtent: B, debug: U, fitViewQueued: A, zIndexMode: K } = S(), { changes: J, updatedInternals: G } = MT(T, L, _, z, Y, B, K);
      G && (ET(L, _, { nodeOrigin: Y, nodeExtent: B, zIndexMode: K }), A ? (R(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), J?.length > 0 && (U && console.log("React Flow: trigger node changes", J), M?.(J)));
    },
    updateNodePositions: (T, M = !1) => {
      const L = [];
      let _ = [];
      const { nodeLookup: z, triggerNodeChanges: Y, connection: B, updateConnection: U, onNodesChangeMiddlewareMap: A } = S();
      for (const [K, J] of T) {
        const G = z.get(K), Q = !!(G?.expandParent && G?.parentId && J?.position), re = {
          id: K,
          type: "position",
          position: Q ? {
            x: Math.max(0, J.position.x),
            y: Math.max(0, J.position.y)
          } : J.position,
          dragging: M
        };
        if (G && B.inProgress && B.fromNode.id === G.id) {
          const j = di(G, B.fromHandle, Te.Left, !0);
          U({ ...B, from: j });
        }
        Q && G.parentId && L.push({
          id: K,
          parentId: G.parentId,
          rect: {
            ...J.internals.positionAbsolute,
            width: J.measured.width ?? 0,
            height: J.measured.height ?? 0
          }
        }), _.push(re);
      }
      if (L.length > 0) {
        const { parentLookup: K, nodeOrigin: J } = S(), G = Gh(L, z, K, J);
        _.push(...G);
      }
      for (const K of A.values())
        _ = K(_);
      Y(_);
    },
    triggerNodeChanges: (T) => {
      const { onNodesChange: M, setNodes: L, nodes: _, hasDefaultNodes: z, debug: Y } = S();
      if (T?.length) {
        if (z) {
          const B = DR(T, _);
          L(B);
        }
        Y && console.log("React Flow: trigger node changes", T), M?.(T);
      }
    },
    triggerEdgeChanges: (T) => {
      const { onEdgesChange: M, setEdges: L, edges: _, hasDefaultEdges: z, debug: Y } = S();
      if (T?.length) {
        if (z) {
          const B = zR(T, _);
          L(B);
        }
        Y && console.log("React Flow: trigger edge changes", T), M?.(T);
      }
    },
    addSelectedNodes: (T) => {
      const { multiSelectionActive: M, edgeLookup: L, nodeLookup: _, triggerNodeChanges: z, triggerEdgeChanges: Y } = S();
      if (M) {
        const B = T.map((U) => ni(U, !0));
        z(B);
        return;
      }
      z(tr(_, /* @__PURE__ */ new Set([...T]), !0)), Y(tr(L));
    },
    addSelectedEdges: (T) => {
      const { multiSelectionActive: M, edgeLookup: L, nodeLookup: _, triggerNodeChanges: z, triggerEdgeChanges: Y } = S();
      if (M) {
        const B = T.map((U) => ni(U, !0));
        Y(B);
        return;
      }
      Y(tr(L, /* @__PURE__ */ new Set([...T]))), z(tr(_, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: T, edges: M } = {}) => {
      const { edges: L, nodes: _, nodeLookup: z, triggerNodeChanges: Y, triggerEdgeChanges: B } = S(), U = T || _, A = M || L, K = [];
      for (const G of U) {
        if (!G.selected)
          continue;
        const Q = z.get(G.id);
        Q && (Q.selected = !1), K.push(ni(G.id, !1));
      }
      const J = [];
      for (const G of A)
        G.selected && J.push(ni(G.id, !1));
      Y(K), B(J);
    },
    setMinZoom: (T) => {
      const { panZoom: M, maxZoom: L } = S();
      M?.setScaleExtent([T, L]), x({ minZoom: T });
    },
    setMaxZoom: (T) => {
      const { panZoom: M, minZoom: L } = S();
      M?.setScaleExtent([L, T]), x({ maxZoom: T });
    },
    setTranslateExtent: (T) => {
      S().panZoom?.setTranslateExtent(T), x({ translateExtent: T });
    },
    resetSelectedElements: () => {
      const { edges: T, nodes: M, triggerNodeChanges: L, triggerEdgeChanges: _, elementsSelectable: z } = S();
      if (!z)
        return;
      const Y = M.reduce((U, A) => A.selected ? [...U, ni(A.id, !1)] : U, []), B = T.reduce((U, A) => A.selected ? [...U, ni(A.id, !1)] : U, []);
      L(Y), _(B);
    },
    setNodeExtent: (T) => {
      const { nodes: M, nodeLookup: L, parentLookup: _, nodeOrigin: z, elevateNodesOnSelect: Y, nodeExtent: B, zIndexMode: U } = S();
      T[0][0] === B[0][0] && T[0][1] === B[0][1] && T[1][0] === B[1][0] && T[1][1] === B[1][1] || (ih(M, L, _, {
        nodeOrigin: z,
        nodeExtent: T,
        elevateNodesOnSelect: Y,
        checkEquality: !1,
        zIndexMode: U
      }), x({ nodeExtent: T }));
    },
    panBy: (T) => {
      const { transform: M, width: L, height: _, panZoom: z, translateExtent: Y } = S();
      return TT({ delta: T, panZoom: z, transform: M, translateExtent: Y, width: L, height: _ });
    },
    setCenter: async (T, M, L) => {
      const { width: _, height: z, maxZoom: Y, panZoom: B } = S();
      if (!B)
        return !1;
      const U = typeof L?.zoom < "u" ? L.zoom : Y;
      return await B.setViewport({
        x: _ / 2 - T * U,
        y: z / 2 - M * U,
        zoom: U
      }, { duration: L?.duration, ease: L?.ease, interpolate: L?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...u1 }
      });
    },
    updateConnection: (T) => {
      x({ connection: T });
    },
    reset: () => x({ ...Ev() })
  };
}, Object.is);
function mx({ initialNodes: t, initialEdges: a, defaultNodes: i, defaultEdges: o, initialWidth: s, initialHeight: u, initialMinZoom: f, initialMaxZoom: h, initialFitViewOptions: p, fitView: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: x }) {
  const [S] = E.useState(() => eA({
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
  return w.jsx(fR, { value: S, children: w.jsx(UR, { children: w.jsx(WR, { children: x }) }) });
}
function tA({ children: t, nodes: a, edges: i, defaultNodes: o, defaultEdges: s, width: u, height: f, fitView: h, fitViewOptions: p, minZoom: g, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x }) {
  return E.useContext(Ju) ? w.jsx(w.Fragment, { children: t }) : w.jsx(mx, { initialNodes: a, initialEdges: i, defaultNodes: o, defaultEdges: s, initialWidth: u, initialHeight: f, fitView: h, initialFitViewOptions: p, initialMinZoom: g, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x, children: t });
}
const nA = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function aA({ nodes: t, edges: a, defaultNodes: i, defaultEdges: o, className: s, nodeTypes: u, edgeTypes: f, onNodeClick: h, onEdgeClick: p, onInit: g, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: R, onClickConnectStart: T, onClickConnectEnd: M, onNodeMouseEnter: L, onNodeMouseMove: _, onNodeMouseLeave: z, onNodeContextMenu: Y, onNodeDoubleClick: B, onNodeDragStart: U, onNodeDrag: A, onNodeDragStop: K, onNodesDelete: J, onEdgesDelete: G, onDelete: Q, onSelectionChange: re, onSelectionDragStart: j, onSelectionDrag: Z, onSelectionDragStop: C, onSelectionContextMenu: O, onSelectionStart: q, onSelectionEnd: $, onBeforeDelete: ne, connectionMode: D, connectionLineType: V = Ll.Bezier, connectionLineStyle: F, connectionLineComponent: le, connectionLineContainerStyle: se, deleteKeyCode: me = "Backspace", selectionKeyCode: ge = "Shift", selectionOnDrag: ee = !1, selectionMode: pe = Co.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Ae = To() ? "Meta" : "Control", zoomActivationKeyCode: we = To() ? "Meta" : "Control", snapToGrid: Se, snapGrid: De, onlyRenderVisibleElements: qe = !1, selectNodesOnDrag: nt, nodesDraggable: it, autoPanOnNodeFocus: Ft, nodesConnectable: pt, nodesFocusable: Gt, nodeOrigin: Jt = Y1, edgesFocusable: Et, edgesReconnectable: Qt, elementsSelectable: yt = !0, defaultViewport: _t = _R, minZoom: Nt = 0.5, maxZoom: Pt = 2, translateExtent: qt = No, preventScrolling: Wt = !0, nodeExtent: Ct, defaultMarkerColor: nl = "#b1b1b7", zoomOnScroll: kn = !0, zoomOnPinch: Nn = !0, panOnScroll: $t = !1, panOnScrollSpeed: Mt = 0.5, panOnScrollMode: zt = ri.Free, zoomOnDoubleClick: al = !0, panOnDrag: pa = !0, onPaneClick: mn, onPaneMouseEnter: ta, onPaneMouseMove: Cn, onPaneMouseLeave: Vn, onPaneScroll: on, onPaneContextMenu: Le, paneClickDistance: ot = 1, nodeClickDistance: Rt = 0, children: jt, onReconnect: fn, onReconnectStart: rt, onReconnectEnd: Xt, onEdgeContextMenu: na, onEdgeDoubleClick: It, onEdgeMouseEnter: H, onEdgeMouseMove: I, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: he, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: xe = "nowheel", noPanClassName: be = "nopan", fitView: Ce, fitViewOptions: Me, connectOnClick: Be, attributionPosition: je, proOptions: Ye, defaultEdgeOptions: Je, elevateNodesOnSelect: mt = !0, elevateEdgesOnSelect: We = !1, disableKeyboardA11y: Ze = !1, autoPanOnConnect: Tt, autoPanOnNodeDrag: Ke, autoPanOnSelection: ya = !0, autoPanSpeed: Mn, connectionRadius: sn, isValidConnection: en, onError: gn, style: ll, id: pn, nodeDragThreshold: il, connectionDragThreshold: aa, viewport: la, onViewportChange: He, width: st, height: dn, colorMode: Tn = "light", debug: rl, onScroll: Da, ariaLabelConfig: at, zIndexMode: Yn = "basic", ...tn }, Ul) {
  const pi = pn || "1", hr = TR(Tn), ol = E.useCallback((mr) => {
    mr.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Da?.(mr);
  }, [Da]);
  return w.jsx("div", { "data-testid": "rf__wrapper", ...tn, onScroll: ol, style: { ...ll, ...nA }, ref: Ul, className: Yt(["react-flow", s, hr]), id: pn, role: "application", children: w.jsxs(tA, { nodes: t, edges: a, width: st, height: dn, fitView: Ce, fitViewOptions: Me, minZoom: Nt, maxZoom: Pt, nodeOrigin: Jt, nodeExtent: Ct, zIndexMode: Yn, children: [w.jsx(MR, { nodes: t, edges: a, defaultNodes: i, defaultEdges: o, onConnect: x, onConnectStart: S, onConnectEnd: R, onClickConnectStart: T, onClickConnectEnd: M, nodesDraggable: it, autoPanOnNodeFocus: Ft, nodesConnectable: pt, nodesFocusable: Gt, edgesFocusable: Et, edgesReconnectable: Qt, elementsSelectable: yt, elevateNodesOnSelect: mt, elevateEdgesOnSelect: We, minZoom: Nt, maxZoom: Pt, nodeExtent: Ct, onNodesChange: he, onEdgesChange: Ee, snapToGrid: Se, snapGrid: De, connectionMode: D, translateExtent: qt, connectOnClick: Be, defaultEdgeOptions: Je, fitView: Ce, fitViewOptions: Me, onNodesDelete: J, onEdgesDelete: G, onDelete: Q, onNodeDragStart: U, onNodeDrag: A, onNodeDragStop: K, onSelectionDrag: Z, onSelectionDragStart: j, onSelectionDragStop: C, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: be, nodeOrigin: Jt, rfId: pi, autoPanOnConnect: Tt, autoPanOnNodeDrag: Ke, autoPanSpeed: Mn, onError: gn, connectionRadius: sn, isValidConnection: en, selectNodesOnDrag: nt, nodeDragThreshold: il, connectionDragThreshold: aa, onBeforeDelete: ne, debug: rl, ariaLabelConfig: at, zIndexMode: Yn }), w.jsx(P3, { onInit: g, onNodeClick: h, onEdgeClick: p, onNodeMouseEnter: L, onNodeMouseMove: _, onNodeMouseLeave: z, onNodeContextMenu: Y, onNodeDoubleClick: B, nodeTypes: u, edgeTypes: f, connectionLineType: V, connectionLineStyle: F, connectionLineComponent: le, connectionLineContainerStyle: se, selectionKeyCode: ge, selectionOnDrag: ee, selectionMode: pe, deleteKeyCode: me, multiSelectionKeyCode: Ae, panActivationKeyCode: ze, zoomActivationKeyCode: we, onlyRenderVisibleElements: qe, defaultViewport: _t, translateExtent: qt, minZoom: Nt, maxZoom: Pt, preventScrolling: Wt, zoomOnScroll: kn, zoomOnPinch: Nn, zoomOnDoubleClick: al, panOnScroll: $t, panOnScrollSpeed: Mt, panOnScrollMode: zt, panOnDrag: pa, autoPanOnSelection: ya, onPaneClick: mn, onPaneMouseEnter: ta, onPaneMouseMove: Cn, onPaneMouseLeave: Vn, onPaneScroll: on, onPaneContextMenu: Le, paneClickDistance: ot, nodeClickDistance: Rt, onSelectionContextMenu: O, onSelectionStart: q, onSelectionEnd: $, onReconnect: fn, onReconnectStart: rt, onReconnectEnd: Xt, onEdgeContextMenu: na, onEdgeDoubleClick: It, onEdgeMouseEnter: H, onEdgeMouseMove: I, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: nl, noDragClassName: ve, noWheelClassName: xe, noPanClassName: be, rfId: pi, disableKeyboardA11y: Ze, nodeExtent: Ct, viewport: la, onViewportChange: He }), w.jsx(ER, { onSelectionChange: re }), jt, w.jsx(vR, { proOptions: Ye, position: je }), w.jsx(yR, { rfId: pi, disableKeyboardA11y: Ze })] }) });
}
var lA = q1(aA);
function iA({ dimensions: t, lineWidth: a, variant: i, className: o }) {
  return w.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Yt(["react-flow__background-pattern", i, o]) });
}
function rA({ radius: t, className: a }) {
  return w.jsx("circle", { cx: t, cy: t, r: t, className: Yt(["react-flow__background-pattern", "dots", a]) });
}
var Ma;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(Ma || (Ma = {}));
const oA = {
  [Ma.Dots]: 1,
  [Ma.Lines]: 1,
  [Ma.Cross]: 6
}, sA = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function gx({
  id: t,
  variant: a = Ma.Dots,
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
  const m = E.useRef(null), { transform: v, patternId: x } = Pe(sA, St), S = o || oA[a], R = a === Ma.Dots, T = a === Ma.Cross, M = Array.isArray(i) ? i : [i, i], L = [M[0] * v[2] || 1, M[1] * v[2] || 1], _ = S * v[2], z = Array.isArray(u) ? u : [u, u], Y = T ? [_, _] : L, B = [
    z[0] * v[2] || 1 + Y[0] / 2,
    z[1] * v[2] || 1 + Y[1] / 2
  ], U = `${x}${t || ""}`;
  return w.jsxs("svg", { className: Yt(["react-flow__background", g]), style: {
    ...p,
    ...Wu,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": f
  }, ref: m, "data-testid": "rf__background", children: [w.jsx("pattern", { id: U, x: v[0] % L[0], y: v[1] % L[1], width: L[0], height: L[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${B[0]},-${B[1]})`, children: R ? w.jsx(rA, { radius: _ / 2, className: y }) : w.jsx(iA, { dimensions: Y, lineWidth: s, variant: a, className: y }) }), w.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${U})` })] });
}
gx.displayName = "Background";
const _v = E.memo(gx);
function uA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: w.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function cA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: w.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function fA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: w.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function dA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function hA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function ou({ children: t, className: a, ...i }) {
  return w.jsx("button", { type: "button", className: Yt(["react-flow__controls-button", a]), ...i, children: t });
}
const mA = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function px({ style: t, showZoom: a = !0, showFitView: i = !0, showInteractive: o = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: f, onFitView: h, onInteractiveChange: p, className: g, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = wt(), { isInteractive: R, minZoomReached: T, maxZoomReached: M, ariaLabelConfig: L } = Pe(mA, St), { zoomIn: _, zoomOut: z, fitView: Y } = qh(), B = () => {
    _(), u?.();
  }, U = () => {
    z(), f?.();
  }, A = () => {
    Y(s), h?.();
  }, K = () => {
    S.setState({
      nodesDraggable: !R,
      nodesConnectable: !R,
      elementsSelectable: !R
    }), p?.(!R);
  }, J = v === "horizontal" ? "horizontal" : "vertical";
  return w.jsxs(Pu, { className: Yt(["react-flow__controls", J, g]), position: m, style: t, "data-testid": "rf__controls", "aria-label": x ?? L["controls.ariaLabel"], children: [a && w.jsxs(w.Fragment, { children: [w.jsx(ou, { onClick: B, className: "react-flow__controls-zoomin", title: L["controls.zoomIn.ariaLabel"], "aria-label": L["controls.zoomIn.ariaLabel"], disabled: M, children: w.jsx(uA, {}) }), w.jsx(ou, { onClick: U, className: "react-flow__controls-zoomout", title: L["controls.zoomOut.ariaLabel"], "aria-label": L["controls.zoomOut.ariaLabel"], disabled: T, children: w.jsx(cA, {}) })] }), i && w.jsx(ou, { className: "react-flow__controls-fitview", onClick: A, title: L["controls.fitView.ariaLabel"], "aria-label": L["controls.fitView.ariaLabel"], children: w.jsx(fA, {}) }), o && w.jsx(ou, { className: "react-flow__controls-interactive", onClick: K, title: L["controls.interactive.ariaLabel"], "aria-label": L["controls.interactive.ariaLabel"], children: R ? w.jsx(hA, {}) : w.jsx(dA, {}) }), y] });
}
px.displayName = "Controls";
const gA = E.memo(px);
function pA({ id: t, x: a, y: i, width: o, height: s, style: u, color: f, strokeColor: h, strokeWidth: p, className: g, borderRadius: y, shapeRendering: m, selected: v, onClick: x }) {
  const { background: S, backgroundColor: R } = u || {}, T = f || S || R;
  return w.jsx("rect", { className: Yt(["react-flow__minimap-node", { selected: v }, g]), x: a, y: i, rx: y, ry: y, width: o, height: s, style: {
    fill: T,
    stroke: h,
    strokeWidth: p
  }, shapeRendering: m, onClick: x ? (M) => x(M, t) : void 0 });
}
const yA = E.memo(pA), vA = (t) => t.nodes.map((a) => a.id), Ad = (t) => t instanceof Function ? t : () => t;
function bA({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: i = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = yA,
  onClick: f
}) {
  const h = Pe(vA, St), p = Ad(a), g = Ad(t), y = Ad(i), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return w.jsx(w.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    w.jsx(SA, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: g, nodeClassNameFunc: y, nodeBorderRadius: o, nodeStrokeWidth: s, NodeComponent: u, onClick: f, shapeRendering: m }, v)
  )) });
}
function xA({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: i, nodeClassNameFunc: o, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: f, NodeComponent: h, onClick: p }) {
  const { node: g, x: y, y: m, width: v, height: x } = Pe((S) => {
    const R = S.nodeLookup.get(t);
    if (!R)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const T = R.internals.userNode, { x: M, y: L } = R.internals.positionAbsolute, { width: _, height: z } = tl(T);
    return {
      node: T,
      x: M,
      y: L,
      width: _,
      height: z
    };
  }, St);
  return !g || g.hidden || !y1(g) ? null : w.jsx(h, { x: y, y: m, width: v, height: x, style: g.style, selected: !!g.selected, className: o(g), color: a(g), borderRadius: s, strokeColor: i(g), strokeWidth: u, shapeRendering: f, onClick: p, id: g.id });
}
const SA = E.memo(xA);
var wA = E.memo(bA);
const EA = 200, _A = 150, NA = (t) => !t.hidden, CA = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? m1(Uo(t.nodeLookup, { filter: NA }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, MA = "react-flow__minimap-desc";
function yx({
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
  pannable: R = !1,
  zoomable: T = !1,
  ariaLabel: M,
  inversePan: L,
  zoomStep: _ = 1,
  offsetScale: z = 5
}) {
  const Y = wt(), B = E.useRef(null), { boundingRect: U, viewBB: A, rfId: K, panZoom: J, translateExtent: G, flowWidth: Q, flowHeight: re, ariaLabelConfig: j } = Pe(CA, St), Z = t?.width ?? EA, C = t?.height ?? _A, O = U.width / Z, q = U.height / C, $ = Math.max(O, q), ne = $ * Z, D = $ * C, V = z * $, F = U.x - (ne - U.width) / 2 - V, le = U.y - (D - U.height) / 2 - V, se = ne + V * 2, me = D + V * 2, ge = `${MA}-${K}`, ee = E.useRef(0), pe = E.useRef();
  ee.current = $, E.useEffect(() => {
    if (B.current && J)
      return pe.current = BT({
        domNode: B.current,
        panZoom: J,
        getTransform: () => Y.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        pe.current?.destroy();
      };
  }, [J]), E.useEffect(() => {
    pe.current?.update({
      translateExtent: G,
      width: Q,
      height: re,
      inversePan: L,
      pannable: R,
      zoomStep: _,
      zoomable: T
    });
  }, [R, T, L, _, G, Q, re]);
  const ze = x ? (Se) => {
    const [De, qe] = pe.current?.pointer(Se) || [0, 0];
    x(Se, { x: De, y: qe });
  } : void 0, Ae = S ? E.useCallback((Se, De) => {
    const qe = Y.getState().nodeLookup.get(De).internals.userNode;
    S(Se, qe);
  }, []) : void 0, we = M ?? j["minimap.ariaLabel"];
  return w.jsx(Pu, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * $ : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof i == "string" ? i : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: Yt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: w.jsxs("svg", { width: Z, height: C, viewBox: `${F} ${le} ${se} ${me}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ge, ref: B, onClick: ze, children: [we && w.jsx("title", { id: ge, children: we }), w.jsx(wA, { onClick: Ae, nodeColor: o, nodeStrokeColor: i, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: f, nodeComponent: h }), w.jsx("path", { className: "react-flow__minimap-mask", d: `M${F - V},${le - V}h${se + V * 2}v${me + V * 2}h${-se - V * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
yx.displayName = "MiniMap";
const TA = E.memo(yx), RA = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, AA = {
  [fr.Line]: "right",
  [fr.Handle]: "bottom-right"
};
function DA({ nodeId: t, position: a, variant: i = fr.Handle, className: o, style: s = void 0, children: u, color: f, minWidth: h = 10, minHeight: p = 10, maxWidth: g = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: R, onResize: T, onResizeEnd: M }) {
  const L = Q1(), _ = typeof t == "string" ? t : L, z = wt(), Y = E.useRef(null), B = i === fr.Handle, U = Pe(E.useCallback(RA(B && x), [B, x]), St), A = E.useRef(null), K = a ?? AA[i];
  E.useEffect(() => {
    if (!(!Y.current || !_))
      return A.current || (A.current = FT({
        domNode: Y.current,
        nodeId: _,
        getStoreItems: () => {
          const { nodeLookup: G, transform: Q, snapGrid: re, snapToGrid: j, nodeOrigin: Z, domNode: C } = z.getState();
          return {
            nodeLookup: G,
            transform: Q,
            snapGrid: re,
            snapToGrid: j,
            nodeOrigin: Z,
            paneDomNode: C
          };
        },
        onChange: (G, Q) => {
          const { triggerNodeChanges: re, nodeLookup: j, parentLookup: Z, nodeOrigin: C } = z.getState(), O = [], q = { x: G.x, y: G.y }, $ = j.get(_);
          if ($ && $.expandParent && $.parentId) {
            const ne = $.origin ?? C, D = G.width ?? $.measured.width ?? 0, V = G.height ?? $.measured.height ?? 0, F = {
              id: $.id,
              parentId: $.parentId,
              rect: {
                width: D,
                height: V,
                ...v1({
                  x: G.x ?? $.position.x,
                  y: G.y ?? $.position.y
                }, { width: D, height: V }, $.parentId, j, ne)
              }
            }, le = Gh([F], j, Z, C);
            O.push(...le), q.x = G.x ? Math.max(ne[0] * D, G.x) : void 0, q.y = G.y ? Math.max(ne[1] * V, G.y) : void 0;
          }
          if (q.x !== void 0 && q.y !== void 0) {
            const ne = {
              id: _,
              type: "position",
              position: { ...q }
            };
            O.push(ne);
          }
          if (G.width !== void 0 && G.height !== void 0) {
            const D = {
              id: _,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: G.width,
                height: G.height
              }
            };
            O.push(D);
          }
          for (const ne of Q) {
            const D = {
              ...ne,
              type: "position"
            };
            O.push(D);
          }
          re(O);
        },
        onEnd: ({ width: G, height: Q }) => {
          const re = {
            id: _,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: G,
              height: Q
            }
          };
          z.getState().triggerNodeChanges([re]);
        }
      })), A.current.update({
        controlPosition: K,
        boundaries: {
          minWidth: h,
          minHeight: p,
          maxWidth: g,
          maxHeight: y
        },
        keepAspectRatio: m,
        resizeDirection: v,
        onResizeStart: R,
        onResize: T,
        onResizeEnd: M,
        shouldResize: S
      }), () => {
        A.current?.destroy();
      };
  }, [
    K,
    h,
    p,
    g,
    y,
    m,
    R,
    T,
    M,
    S
  ]);
  const J = K.split("-");
  return w.jsx("div", { className: Yt(["react-flow__resize-control", "nodrag", ...J, i, o]), ref: Y, style: {
    ...s,
    scale: U,
    ...f && { [B ? "backgroundColor" : "borderColor"]: f }
  }, children: u });
}
E.memo(DA);
var zA = "_1729v610", jA = "_1729v611";
const Nv = 16, OA = "rgba(186, 158, 255, 0.14)", LA = "rgba(186, 158, 255, 0.06)", HA = "rgba(0, 0, 0, 0.6)", BA = "#1d2023", UA = "#ba9eff";
function kA({
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
  const g = [zA, f].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("div", { className: g, "aria-label": h ?? "node graph", children: /* @__PURE__ */ w.jsxs(
    lA,
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
          _v,
          {
            id: "minor",
            variant: Ma.Dots,
            gap: Nv,
            size: 1.1,
            color: OA
          }
        ),
        /* @__PURE__ */ w.jsx(
          _v,
          {
            id: "major",
            variant: Ma.Lines,
            gap: Nv * 5,
            lineWidth: 1,
            color: LA
          }
        ),
        s && /* @__PURE__ */ w.jsx(gA, { showInteractive: !1 }),
        o && /* @__PURE__ */ w.jsx(
          TA,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: HA,
            nodeColor: () => BA,
            nodeStrokeColor: () => UA,
            className: jA
          }
        ),
        p
      ]
    }
  ) });
}
function VA(t) {
  return /* @__PURE__ */ w.jsx(mx, { children: /* @__PURE__ */ w.jsx(kA, { ...t }) });
}
var YA = { neutral: "_160uuo1 _160uuo0", accent: "_160uuo2 _160uuo0", warning: "_160uuo3 _160uuo0", success: "_160uuo4 _160uuo0" };
function vx({ tone: t = "neutral", children: a, className: i }) {
  const o = [YA[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("span", { className: o, children: a });
}
var GA = { primary: "mzxlfs1 mzxlfs0", secondary: "mzxlfs2 mzxlfs0", ghost: "mzxlfs3 mzxlfs0", danger: "mzxlfs4 mzxlfs0" }, qA = { sm: "mzxlfs5", md: "mzxlfs6", lg: "mzxlfs7" }, $A = "mzxlfs9";
function Pa({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: o = !1,
  disabled: s,
  children: u,
  className: f,
  ...h
}) {
  const p = [GA[t], qA[a], f].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs(
    "button",
    {
      type: i,
      className: p,
      disabled: o || s,
      "aria-busy": o || void 0,
      ...h,
      children: [
        o ? /* @__PURE__ */ w.jsx("span", { className: $A, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
var XA = "_1i506u20", ZA = "_1i506u21", QA = "_1i506u22", IA = "_1i506u23", KA = "_1i506u24", FA = "_1i506u25", JA = "_1i506u26", PA = "_1i506u27", WA = "_1i506u28";
const eD = {
  default: "",
  raised: ZA,
  inset: QA
};
function wu({
  eyebrow: t,
  title: a,
  description: i,
  actions: o,
  children: s,
  className: u,
  elevation: f = "default"
}) {
  const h = [XA, eD[f], u].filter(Boolean).join(" "), p = !!(t || a || o);
  return /* @__PURE__ */ w.jsxs("section", { className: h, children: [
    p && /* @__PURE__ */ w.jsxs("header", { className: IA, children: [
      /* @__PURE__ */ w.jsxs("div", { className: KA, children: [
        t && /* @__PURE__ */ w.jsx("span", { className: JA, children: t }),
        a && /* @__PURE__ */ w.jsx("span", { className: PA, children: a }),
        i && /* @__PURE__ */ w.jsx("span", { className: WA, children: i })
      ] }),
      o && /* @__PURE__ */ w.jsx("div", { className: FA, children: o })
    ] }),
    s
  ] });
}
function tD(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const nD = (t) => {
  switch (t) {
    case "success":
      return iD;
    case "info":
      return oD;
    case "warning":
      return rD;
    case "error":
      return sD;
    default:
      return null;
  }
}, aD = Array(12).fill(0), lD = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, aD.map((i, o) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${o}`
})))), iD = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), rD = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), oD = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), sD = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), uD = /* @__PURE__ */ ye.createElement("svg", {
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
})), cD = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let sh = 1;
class fD {
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
      const { message: o, ...s } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : sh++, f = this.toasts.find((p) => p.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
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
        else if (hD(g) && !g.ok) {
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
      const o = i?.id || sh++;
      return this.create({
        jsx: a(o),
        id: o,
        ...i
      }), o;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const En = new fD(), dD = (t, a) => {
  const i = a?.id || sh++;
  return En.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, hD = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", mD = dD, gD = () => En.toasts, pD = () => En.getActiveToasts(), Ja = Object.assign(mD, {
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
  getHistory: gD,
  getToasts: pD
});
tD("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function su(t) {
  return t.label !== void 0;
}
const yD = 3, vD = "24px", bD = "16px", Cv = 4e3, xD = 356, SD = 14, wD = 45, ED = 200;
function Ea(...t) {
  return t.filter(Boolean).join(" ");
}
function _D(t) {
  const [a, i] = t.split("-"), o = [];
  return a && o.push(a), i && o.push(i), o;
}
const ND = (t) => {
  var a, i, o, s, u, f, h, p, g;
  const { invert: y, toast: m, unstyled: v, interacting: x, setHeights: S, visibleToasts: R, heights: T, index: M, toasts: L, expanded: _, removeToast: z, defaultRichColors: Y, closeButton: B, style: U, cancelButtonStyle: A, actionButtonStyle: K, className: J = "", descriptionClassName: G = "", duration: Q, position: re, gap: j, expandByDefault: Z, classNames: C, icons: O, closeButtonAriaLabel: q = "Close toast" } = t, [$, ne] = ye.useState(null), [D, V] = ye.useState(null), [F, le] = ye.useState(!1), [se, me] = ye.useState(!1), [ge, ee] = ye.useState(!1), [pe, ze] = ye.useState(!1), [Ae, we] = ye.useState(!1), [Se, De] = ye.useState(0), [qe, nt] = ye.useState(0), it = ye.useRef(m.duration || Q || Cv), Ft = ye.useRef(null), pt = ye.useRef(null), Gt = M === 0, Jt = M + 1 <= R, Et = m.type, Qt = m.dismissible !== !1, yt = m.className || "", _t = m.descriptionClassName || "", Nt = ye.useMemo(() => T.findIndex((Le) => Le.toastId === m.id) || 0, [
    T,
    m.id
  ]), Pt = ye.useMemo(() => {
    var Le;
    return (Le = m.closeButton) != null ? Le : B;
  }, [
    m.closeButton,
    B
  ]), qt = ye.useMemo(() => m.duration || Q || Cv, [
    m.duration,
    Q
  ]), Wt = ye.useRef(0), Ct = ye.useRef(0), nl = ye.useRef(0), kn = ye.useRef(null), [Nn, $t] = re.split("-"), Mt = ye.useMemo(() => T.reduce((Le, ot, Rt) => Rt >= Nt ? Le : Le + ot.height, 0), [
    T,
    Nt
  ]), zt = cD(), al = m.invert || y, pa = Et === "loading";
  Ct.current = ye.useMemo(() => Nt * j + Mt, [
    Nt,
    Mt
  ]), ye.useEffect(() => {
    it.current = qt;
  }, [
    qt
  ]), ye.useEffect(() => {
    le(!0);
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
      ]), () => S((Rt) => Rt.filter((jt) => jt.toastId !== m.id));
    }
  }, [
    S,
    m.id
  ]), ye.useLayoutEffect(() => {
    if (!F) return;
    const Le = pt.current, ot = Le.style.height;
    Le.style.height = "auto";
    const Rt = Le.getBoundingClientRect().height;
    Le.style.height = ot, nt(Rt), S((jt) => jt.find((rt) => rt.toastId === m.id) ? jt.map((rt) => rt.toastId === m.id ? {
      ...rt,
      height: Rt
    } : rt) : [
      {
        toastId: m.id,
        height: Rt,
        position: m.position
      },
      ...jt
    ]);
  }, [
    F,
    m.title,
    m.description,
    S,
    m.id,
    m.jsx,
    m.action,
    m.cancel
  ]);
  const mn = ye.useCallback(() => {
    me(!0), De(Ct.current), S((Le) => Le.filter((ot) => ot.toastId !== m.id)), setTimeout(() => {
      z(m);
    }, ED);
  }, [
    m,
    z,
    S,
    Ct
  ]);
  ye.useEffect(() => {
    if (m.promise && Et === "loading" || m.duration === 1 / 0 || m.type === "loading") return;
    let Le;
    return _ || x || zt ? (() => {
      if (nl.current < Wt.current) {
        const jt = (/* @__PURE__ */ new Date()).getTime() - Wt.current;
        it.current = it.current - jt;
      }
      nl.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      it.current !== 1 / 0 && (Wt.current = (/* @__PURE__ */ new Date()).getTime(), Le = setTimeout(() => {
        m.onAutoClose == null || m.onAutoClose.call(m, m), mn();
      }, it.current));
    })(), () => clearTimeout(Le);
  }, [
    _,
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
        className: Ea(C?.loader, m == null || (ot = m.classNames) == null ? void 0 : ot.loader, "sonner-loader"),
        "data-visible": Et === "loading"
      }, O.loading);
    }
    return /* @__PURE__ */ ye.createElement(lD, {
      className: Ea(C?.loader, m == null || (Le = m.classNames) == null ? void 0 : Le.loader),
      visible: Et === "loading"
    });
  }
  const Cn = m.icon || O?.[Et] || nD(Et);
  var Vn, on;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: pt,
    className: Ea(J, yt, C?.toast, m == null || (a = m.classNames) == null ? void 0 : a.toast, C?.default, C?.[Et], m == null || (i = m.classNames) == null ? void 0 : i[Et]),
    "data-sonner-toast": "",
    "data-rich-colors": (Vn = m.richColors) != null ? Vn : Y,
    "data-styled": !(m.jsx || m.unstyled || v),
    "data-mounted": F,
    "data-promise": !!m.promise,
    "data-swiped": Ae,
    "data-removed": se,
    "data-visible": Jt,
    "data-y-position": Nn,
    "data-x-position": $t,
    "data-index": M,
    "data-front": Gt,
    "data-swiping": ge,
    "data-dismissible": Qt,
    "data-type": Et,
    "data-invert": al,
    "data-swipe-out": pe,
    "data-swipe-direction": D,
    "data-expanded": !!(_ || Z && F),
    "data-testid": m.testId,
    style: {
      "--index": M,
      "--toasts-before": M,
      "--z-index": L.length - M,
      "--offset": `${se ? Se : Ct.current}px`,
      "--initial-height": Z ? "auto" : `${qe}px`,
      ...U,
      ...m.style
    },
    onDragEnd: () => {
      ee(!1), ne(null), kn.current = null;
    },
    onPointerDown: (Le) => {
      Le.button !== 2 && (pa || !Qt || (Ft.current = /* @__PURE__ */ new Date(), De(Ct.current), Le.target.setPointerCapture(Le.pointerId), Le.target.tagName !== "BUTTON" && (ee(!0), kn.current = {
        x: Le.clientX,
        y: Le.clientY
      })));
    },
    onPointerUp: () => {
      var Le, ot, Rt;
      if (pe || !Qt) return;
      kn.current = null;
      const jt = Number(((Le = pt.current) == null ? void 0 : Le.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), fn = Number(((ot = pt.current) == null ? void 0 : ot.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Rt = Ft.current) == null ? void 0 : Rt.getTime()), Xt = $ === "x" ? jt : fn, na = Math.abs(Xt) / rt;
      if (Math.abs(Xt) >= wD || na > 0.11) {
        De(Ct.current), m.onDismiss == null || m.onDismiss.call(m, m), V($ === "x" ? jt > 0 ? "right" : "left" : fn > 0 ? "down" : "up"), mn(), ze(!0);
        return;
      } else {
        var It, H;
        (It = pt.current) == null || It.style.setProperty("--swipe-amount-x", "0px"), (H = pt.current) == null || H.style.setProperty("--swipe-amount-y", "0px");
      }
      we(!1), ee(!1), ne(null);
    },
    onPointerMove: (Le) => {
      var ot, Rt, jt;
      if (!kn.current || !Qt || ((ot = window.getSelection()) == null ? void 0 : ot.toString().length) > 0) return;
      const rt = Le.clientY - kn.current.y, Xt = Le.clientX - kn.current.x;
      var na;
      const It = (na = t.swipeDirections) != null ? na : _D(re);
      !$ && (Math.abs(Xt) > 1 || Math.abs(rt) > 1) && ne(Math.abs(Xt) > Math.abs(rt) ? "x" : "y");
      let H = {
        x: 0,
        y: 0
      };
      const I = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if ($ === "y") {
        if (It.includes("top") || It.includes("bottom"))
          if (It.includes("top") && rt < 0 || It.includes("bottom") && rt > 0)
            H.y = rt;
          else {
            const W = rt * I(rt);
            H.y = Math.abs(W) < Math.abs(rt) ? W : rt;
          }
      } else if ($ === "x" && (It.includes("left") || It.includes("right")))
        if (It.includes("left") && Xt < 0 || It.includes("right") && Xt > 0)
          H.x = Xt;
        else {
          const W = Xt * I(Xt);
          H.x = Math.abs(W) < Math.abs(Xt) ? W : Xt;
        }
      (Math.abs(H.x) > 0 || Math.abs(H.y) > 0) && we(!0), (Rt = pt.current) == null || Rt.style.setProperty("--swipe-amount-x", `${H.x}px`), (jt = pt.current) == null || jt.style.setProperty("--swipe-amount-y", `${H.y}px`);
    }
  }, Pt && !m.jsx && Et !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": q,
    "data-disabled": pa,
    "data-close-button": !0,
    onClick: pa || !Qt ? () => {
    } : () => {
      mn(), m.onDismiss == null || m.onDismiss.call(m, m);
    },
    className: Ea(C?.closeButton, m == null || (o = m.classNames) == null ? void 0 : o.closeButton)
  }, (on = O?.close) != null ? on : uD) : null, (Et || m.icon || m.promise) && m.icon !== null && (O?.[Et] !== null || m.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Ea(C?.icon, m == null || (s = m.classNames) == null ? void 0 : s.icon)
  }, m.promise || m.type === "loading" && !m.icon ? m.icon || ta() : null, m.type !== "loading" ? Cn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Ea(C?.content, m == null || (u = m.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Ea(C?.title, m == null || (f = m.classNames) == null ? void 0 : f.title)
  }, m.jsx ? m.jsx : typeof m.title == "function" ? m.title() : m.title), m.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Ea(G, _t, C?.description, m == null || (h = m.classNames) == null ? void 0 : h.description)
  }, typeof m.description == "function" ? m.description() : m.description) : null), /* @__PURE__ */ ye.isValidElement(m.cancel) ? m.cancel : m.cancel && su(m.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: m.cancelButtonStyle || A,
    onClick: (Le) => {
      su(m.cancel) && Qt && (m.cancel.onClick == null || m.cancel.onClick.call(m.cancel, Le), mn());
    },
    className: Ea(C?.cancelButton, m == null || (p = m.classNames) == null ? void 0 : p.cancelButton)
  }, m.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(m.action) ? m.action : m.action && su(m.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: m.actionButtonStyle || K,
    onClick: (Le) => {
      su(m.action) && (m.action.onClick == null || m.action.onClick.call(m.action, Le), !Le.defaultPrevented && mn());
    },
    className: Ea(C?.actionButton, m == null || (g = m.classNames) == null ? void 0 : g.actionButton)
  }, m.action.label) : null);
};
function Mv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function CD(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((o, s) => {
    const u = s === 1, f = u ? "--mobile-offset" : "--offset", h = u ? bD : vD;
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
const MD = /* @__PURE__ */ ye.forwardRef(function(a, i) {
  const { id: o, invert: s, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: p, className: g, offset: y, mobileOffset: m, theme: v = "light", richColors: x, duration: S, style: R, visibleToasts: T = yD, toastOptions: M, dir: L = Mv(), gap: _ = SD, icons: z, containerAriaLabel: Y = "Notifications" } = a, [B, U] = ye.useState([]), A = ye.useMemo(() => o ? B.filter((F) => F.toasterId === o) : B.filter((F) => !F.toasterId), [
    B,
    o
  ]), K = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((F) => F.position).map((F) => F.position)))), [
    A,
    u
  ]), [J, G] = ye.useState([]), [Q, re] = ye.useState(!1), [j, Z] = ye.useState(!1), [C, O] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = ye.useRef(null), $ = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ne = ye.useRef(null), D = ye.useRef(!1), V = ye.useCallback((F) => {
    U((le) => {
      var se;
      return (se = le.find((me) => me.id === F.id)) != null && se.delete || En.dismiss(F.id), le.filter(({ id: me }) => me !== F.id);
    });
  }, []);
  return ye.useEffect(() => En.subscribe((F) => {
    if (F.dismiss) {
      requestAnimationFrame(() => {
        U((le) => le.map((se) => se.id === F.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      cR.flushSync(() => {
        U((le) => {
          const se = le.findIndex((me) => me.id === F.id);
          return se !== -1 ? [
            ...le.slice(0, se),
            {
              ...le[se],
              ...F
            },
            ...le.slice(se + 1)
          ] : [
            F,
            ...le
          ];
        });
      });
    });
  }), [
    B
  ]), ye.useEffect(() => {
    if (v !== "system") {
      O(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? O("dark") : O("light")), typeof window > "u") return;
    const F = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      F.addEventListener("change", ({ matches: le }) => {
        O(le ? "dark" : "light");
      });
    } catch {
      F.addListener(({ matches: se }) => {
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
    B.length <= 1 && re(!1);
  }, [
    B
  ]), ye.useEffect(() => {
    const F = (le) => {
      var se;
      if (f.every((ee) => le[ee] || le.code === ee)) {
        var ge;
        re(!0), (ge = q.current) == null || ge.focus();
      }
      le.code === "Escape" && (document.activeElement === q.current || (se = q.current) != null && se.contains(document.activeElement)) && re(!1);
    };
    return document.addEventListener("keydown", F), () => document.removeEventListener("keydown", F);
  }, [
    f
  ]), ye.useEffect(() => {
    if (q.current)
      return () => {
        ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null, D.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: i,
    "aria-label": `${Y} ${$}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, K.map((F, le) => {
    var se;
    const [me, ge] = F.split("-");
    return A.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: F,
      dir: L === "auto" ? Mv() : L,
      tabIndex: -1,
      ref: q,
      className: g,
      "data-sonner-toaster": !0,
      "data-sonner-theme": C,
      "data-y-position": me,
      "data-x-position": ge,
      style: {
        "--front-toast-height": `${((se = J[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${xD}px`,
        "--gap": `${_}px`,
        ...R,
        ...CD(y, m)
      },
      onBlur: (ee) => {
        D.current && !ee.currentTarget.contains(ee.relatedTarget) && (D.current = !1, ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null));
      },
      onFocus: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || D.current || (D.current = !0, ne.current = ee.relatedTarget);
      },
      onMouseEnter: () => re(!0),
      onMouseMove: () => re(!0),
      onMouseLeave: () => {
        j || re(!1);
      },
      onDragEnd: () => re(!1),
      onPointerDown: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || Z(!0);
      },
      onPointerUp: () => Z(!1)
    }, A.filter((ee) => !ee.position && le === 0 || ee.position === F).map((ee, pe) => {
      var ze, Ae;
      return /* @__PURE__ */ ye.createElement(ND, {
        key: ee.id,
        icons: z,
        index: pe,
        toast: ee,
        defaultRichColors: x,
        duration: (ze = M?.duration) != null ? ze : S,
        className: M?.className,
        descriptionClassName: M?.descriptionClassName,
        invert: s,
        visibleToasts: T,
        closeButton: (Ae = M?.closeButton) != null ? Ae : p,
        interacting: j,
        position: F,
        style: M?.style,
        unstyled: M?.unstyled,
        classNames: M?.classNames,
        cancelButtonStyle: M?.cancelButtonStyle,
        actionButtonStyle: M?.actionButtonStyle,
        closeButtonAriaLabel: M?.closeButtonAriaLabel,
        removeToast: V,
        toasts: A.filter((we) => we.position == ee.position),
        heights: J.filter((we) => we.position == ee.position),
        setHeights: G,
        expandByDefault: h,
        gap: _,
        expanded: Q,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
});
class oi extends Error {
  constructor(a, i, o, s) {
    super(o), this.status = a, this.category = i, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const tc = "/api/v1/extensions/nexus.3d.trellis2";
async function mi(t, a) {
  const i = t.startsWith("http") ? t : `${tc}${t}`, o = await fetch(i, {
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
    throw new oi(
      o.status,
      s?.category ?? "unknown",
      s?.message ?? o.statusText,
      s?.requestId
    );
  }
  if (o.status !== 204)
    return await o.json();
}
function TD(t, a, i) {
  const o = t.startsWith("http") ? t : `${tc}${t}`, s = new EventSource(o);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
  }, () => s.close();
}
const RD = {
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
}, uo = {
  resolution: 1536,
  max_views: 4,
  shape_steps: 25,
  texture_steps: 25,
  max_num_tokens: 98304
}, AD = {
  azimuth: 0,
  elevation: 0,
  texture_size: 4096
}, Bl = [
  "load",
  "encode",
  "sparse",
  "shape",
  "texture",
  "decode",
  "glb"
];
function Xh() {
  const t = {};
  for (const a of Bl) t[a] = "idle";
  return t;
}
const ir = {
  phase: "idle",
  stage: null,
  step: 0,
  totalSteps: 0,
  overallFraction: 0,
  stageStates: Xh(),
  glbRef: null,
  thumbnailRef: null,
  inputImageRef: null,
  metadata: null,
  errorCode: null,
  errorMessage: null
};
function go(t = null) {
  return {
    ...ir,
    stageStates: Xh(),
    phase: "running",
    inputImageRef: t
  };
}
function Zh(t) {
  return Bl.includes(t);
}
function DD(t, a) {
  if (!Zh(a)) return t;
  const i = { ...t };
  let o = !1;
  for (const s of Bl)
    s === a ? (i[s] = "active", o = !0) : o || (i[s] = "done");
  return i;
}
function zD(t, a, i) {
  const o = i > 0 ? Math.min(1, a / i) : 0, s = Zh(t) ? Bl.indexOf(t) : 0, u = 1 / Bl.length;
  return Math.min(0.99, u * (s + o));
}
function jD(t, a) {
  switch (a.method) {
    case "trellis2.generate.progress": {
      const { stage: i, step: o, total: s } = a.params, u = zD(i, o, s);
      return {
        ...t,
        phase: "running",
        stage: i,
        step: o,
        totalSteps: s,
        overallFraction: Math.max(t.overallFraction, u),
        stageStates: DD(t.stageStates, i)
      };
    }
    case "trellis2.generate.done": {
      const i = Xh();
      for (const o of Bl) i[o] = "done";
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
      return t.stage && Zh(t.stage) && (i[t.stage] = "error"), {
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
function Tv(t) {
  return { ...t, phase: "cancelled" };
}
function Dd(t, a, i, o) {
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
const bx = [
  Dd("sparse", "Sparse structure", "Coarse O-Voxel structure stage.", {
    strength: "7.5",
    rescale: "0.7",
    rescaleT: "5.0",
    intervalStart: "0.3",
    intervalEnd: "1.0"
  }),
  Dd("shape", "Shape", "Mesh refinement stage.", {
    strength: "7.5",
    rescale: "0.5",
    rescaleT: "3.0",
    intervalStart: "0.3",
    intervalEnd: "1.0"
  }),
  Dd("texture", "Texture", "Texture-bake stage (used only when Bake texture is on).", {
    strength: "1.0",
    rescale: "0.0",
    rescaleT: "3.0",
    intervalStart: "0.6",
    intervalEnd: "0.9"
  })
], xx = bx.flatMap(
  (t) => t.fields.map((a) => a.key)
);
new Set(xx);
const Sx = [
  ["sparse_guidance_interval_start", "sparse_guidance_interval_end"],
  ["shape_guidance_interval_start", "shape_guidance_interval_end"],
  ["texture_guidance_interval_start", "texture_guidance_interval_end"]
];
function OD(t) {
  return Sx.some(([a, i]) => t === a || t === i);
}
function zd(t) {
  if (t === void 0) return null;
  const a = t.trim();
  if (a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) ? i : null;
}
function LD(t) {
  const a = {};
  for (const i of xx) {
    if (OD(i)) continue;
    const o = zd(t[i]);
    o !== null && (a[i] = o);
  }
  for (const [i, o] of Sx) {
    const s = zd(t[i]), u = zd(t[o]);
    s !== null && u !== null && (a[i] = s, a[o] = u);
  }
  return a;
}
async function HD(t) {
  return mi("/generate/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function BD(t) {
  return mi(`/generate/jobs/${encodeURIComponent(t)}/cancel`, {
    method: "POST",
    body: "{}"
  });
}
function UD(t, a, i) {
  return TD(
    `/generate/jobs/${encodeURIComponent(t)}/events`,
    a
  );
}
async function kD(t) {
  return mi("/refine/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function VD(t) {
  return mi("/project/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function YD(t = 25) {
  return mi(`/generate/jobs?limit=${t}`);
}
async function Rv(t) {
  return mi(`/generate/jobs/${encodeURIComponent(t)}`);
}
async function GD(t) {
  await mi(`/generate/jobs/${encodeURIComponent(t)}`, { method: "DELETE" });
}
const Qh = "nexus.3d.trellis2.active-job";
function jd(t) {
  try {
    sessionStorage.setItem(Qh, JSON.stringify({ jobId: t }));
  } catch {
  }
}
function uu() {
  try {
    sessionStorage.removeItem(Qh);
  } catch {
  }
}
function Od() {
  try {
    const t = sessionStorage.getItem(Qh);
    if (!t) return null;
    const a = JSON.parse(t);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
function Ld(t) {
  return t.status === "succeeded" ? {
    ...ir,
    phase: "done",
    overallFraction: 1,
    glbRef: t.glbRef,
    thumbnailRef: null,
    inputImageRef: t.inputImageRef,
    metadata: t.metadata
  } : t.status === "failed" ? {
    ...ir,
    phase: "error",
    errorCode: t.errorCode,
    errorMessage: t.errorMessage
  } : t.status === "cancelled" ? { ...ir, phase: "cancelled" } : go();
}
const wx = E.createContext(null);
function qD({ children: t }) {
  const [a, i] = E.useState(() => ({ ...RD })), [o, s] = E.useState({}), [u, f] = E.useState(null), [h, p] = E.useState(null), [g, y] = E.useState(ir), m = E.useRef(null), v = E.useRef(g);
  v.current = g;
  const x = E.useCallback((J) => {
    m.current?.(), m.current = UD(J, (G) => {
      y((Q) => jD(Q, G));
    });
  }, []), S = E.useCallback(
    (J, G) => {
      i((Q) => ({ ...Q, [J]: G }));
    },
    []
  ), R = E.useCallback((J) => {
    i((G) => ({ ...G, ...J }));
  }, []), T = E.useCallback((J, G) => {
    s((Q) => ({ ...Q, [J]: G }));
  }, []), M = E.useCallback((J, G) => {
    f(J), p(G);
  }, []), L = E.useCallback(() => {
    f(null), p(null);
  }, []), _ = E.useCallback(() => {
    m.current?.(), m.current = null, uu(), y(ir);
  }, []), z = E.useCallback(async () => {
    if (!u) return;
    m.current?.();
    const J = LD(o), G = { image: u, params: { ...a, ...J } }, { jobId: Q } = await HD(G);
    y(go(u)), jd(Q), x(Q);
  }, [u, a, o, x]), Y = E.useCallback(
    async (J, G, Q, re) => {
      m.current?.();
      const j = {
        mesh: J,
        image: G,
        params: Q,
        ...re ? { face_image: re } : {}
      }, { jobId: Z } = await kD(j);
      y(go(G)), jd(Z), x(Z);
    },
    [x]
  ), B = E.useCallback(
    async (J, G, Q) => {
      m.current?.();
      const re = { mesh: J, image: G, params: Q }, { jobId: j } = await VD(re);
      y(go(G)), jd(j), x(j);
    },
    [x]
  ), U = E.useCallback(async () => {
    const J = Od();
    if (!J) {
      y((Q) => Tv(Q));
      return;
    }
    const { status: G } = await BD(J);
    G !== "cancelling" && (m.current?.(), m.current = null, uu(), y((Q) => Tv(Q)));
  }, []), A = E.useCallback(async (J) => {
    m.current?.(), m.current = null;
    try {
      const G = await Rv(J.id);
      y(Ld(G));
    } catch {
      y(Ld(J));
    }
  }, []);
  E.useEffect(() => {
    (g.phase === "done" || g.phase === "error" || g.phase === "cancelled") && uu();
  }, [g.phase]), E.useEffect(() => {
    const J = () => {
      if (v.current.phase !== "running") return;
      const j = Od();
      j && x(j);
    }, G = () => {
      document.visibilityState === "visible" && J();
    }, Q = () => J();
    return document.addEventListener("visibilitychange", G), window.addEventListener("focus", Q), () => {
      document.removeEventListener("visibilitychange", G), window.removeEventListener("focus", Q);
    };
  }, [x]), E.useEffect(() => {
    const J = Od();
    if (!J) return;
    let G = !1;
    return Rv(J).then((Q) => {
      if (!G) {
        if (Q.status === "queued" || Q.status === "running") {
          y(go()), x(J);
          return;
        }
        uu(), y(Ld(Q));
      }
    }).catch(() => {
    }), () => {
      G = !0;
    };
  }, [x]), E.useEffect(() => () => {
    m.current?.(), m.current = null;
  }, []);
  const K = E.useMemo(
    () => ({
      params: a,
      guidanceDraft: o,
      imageRef: u,
      imageName: h,
      generate: g,
      updateParam: S,
      applyParams: R,
      setGuidance: T,
      setImage: M,
      clearImage: L,
      startJob: z,
      startRefine: Y,
      startProject: B,
      cancelJob: U,
      resetGenerate: _,
      showJobResult: A
    }),
    [
      a,
      o,
      u,
      h,
      g,
      S,
      R,
      T,
      M,
      L,
      z,
      Y,
      B,
      U,
      _,
      A
    ]
  );
  return /* @__PURE__ */ w.jsx(wx.Provider, { value: K, children: t });
}
function gi() {
  const t = E.useContext(wx);
  if (!t)
    throw new Error("useGenerateRequest must be used within GenerateRequestProvider");
  return t;
}
function Ex() {
  const { imageRef: t, generate: a, startJob: i, cancelJob: o } = gi(), s = !t, u = a.phase === "running", f = E.useCallback(async () => {
    if (s) {
      Ja.error("Upload an input image before generating.");
      return;
    }
    try {
      await i(), Ja.success("Generation started.");
    } catch (p) {
      const g = p instanceof oi ? p.message : "Could not start the generation.";
      Ja.error(g);
    }
  }, [s, i]), h = E.useCallback(async () => {
    try {
      await o();
    } catch {
      Ja.error("Could not cancel the generation.");
    }
  }, [o]);
  return E.useEffect(() => p2(() => void f()), [f]), E.useEffect(() => {
    g2({ busy: u, blocked: s });
  }, [u, s]), { blocked: s, busy: u, submit: f, cancel: h };
}
const $D = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB"
}, XD = {
  load: "Weights → VRAM",
  encode: "DINOv3 features",
  sparse: "O-Voxel layout",
  shape: "Structured latents",
  texture: "Albedo bake",
  decode: "Watertight mesh",
  glb: "glTF artifact"
}, ZD = 220, QD = 80;
function ID({
  stageStates: t,
  textureEnabled: a
}) {
  const i = Bl.filter(
    (u) => u !== "texture" || a
  ), o = i.map((u, f) => ({
    id: u,
    type: "dagStage",
    position: { x: f * ZD, y: QD },
    data: {
      label: $D[u],
      caption: XD[u],
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
var KD = "_1igljo10", FD = "_1igljo11", JD = "_1igljo12", PD = "_1igljo13", WD = "_1igljo14", ez = "_1igljo15", tz = "_1igljo16", nz = "_1igljo17", az = { idle: "m9fvj82 m9fvj81", active: "m9fvj83 m9fvj81", done: "m9fvj84 m9fvj81", error: "m9fvj85 m9fvj81" }, lz = "m9fvj86", iz = "m9fvj87", rz = { idle: "m9fvj89 m9fvj88", active: "m9fvj8a m9fvj88", done: "m9fvj8b m9fvj88", error: "m9fvj8c m9fvj88" }, oz = { idle: "m9fvj8f m9fvj8e", active: "m9fvj8g m9fvj8e", done: "m9fvj8h m9fvj8e", error: "m9fvj8i m9fvj8e" }, sz = "m9fvj8j", uz = "m9fvj8k", Av = "m9fvj8l";
const cz = {
  idle: "idle",
  active: "running",
  done: "done",
  error: "failed"
};
function fz({ data: t }) {
  const a = t, { state: i } = a, o = `${a.index + 1}/${a.total}`;
  return /* @__PURE__ */ w.jsxs("div", { className: az[i], children: [
    /* @__PURE__ */ w.jsx(dr, { type: "target", position: Te.Left, className: Av }),
    /* @__PURE__ */ w.jsxs("div", { className: lz, children: [
      /* @__PURE__ */ w.jsx("span", { className: iz, children: o }),
      /* @__PURE__ */ w.jsxs("span", { className: rz[i], children: [
        /* @__PURE__ */ w.jsx("span", { className: oz[i], "aria-hidden": "true" }),
        cz[i]
      ] })
    ] }),
    /* @__PURE__ */ w.jsx("span", { className: sz, children: a.label }),
    /* @__PURE__ */ w.jsx("span", { className: uz, children: a.caption }),
    /* @__PURE__ */ w.jsx(dr, { type: "source", position: Te.Right, className: Av })
  ] });
}
const dz = {
  dagStage: fz
}, hz = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, mz = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB"
};
function gz() {
  const { params: t, generate: a } = gi(), { busy: i, blocked: o, submit: s, cancel: u } = Ex(), f = !!t.texture, h = E.useMemo(
    () => ID({ stageStates: a.stageStates, textureEnabled: f }),
    [a.stageStates, f]
  ), p = Bl.filter(
    (g) => g !== "texture" || f
  );
  return /* @__PURE__ */ w.jsxs("div", { className: KD, children: [
    /* @__PURE__ */ w.jsx("div", { className: FD, children: /* @__PURE__ */ w.jsx(
      VA,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: dz,
        ariaLabel: "TRELLIS 2 image-to-3D workflow graph"
      }
    ) }),
    /* @__PURE__ */ w.jsx("div", { className: JD, children: /* @__PURE__ */ w.jsxs(
      wu,
      {
        elevation: "raised",
        title: "Workflow",
        description: "load → encode → sparse → shape → texture → decode → glb. Live state mirrors the worker.",
        children: [
          /* @__PURE__ */ w.jsx("div", { className: PD, children: p.map((g, y) => /* @__PURE__ */ w.jsxs("div", { className: WD, children: [
            /* @__PURE__ */ w.jsxs("span", { className: ez, children: [
              /* @__PURE__ */ w.jsx("span", { className: tz, children: String(y + 1).padStart(2, "0") }),
              /* @__PURE__ */ w.jsx("span", { children: mz[g] })
            ] }),
            /* @__PURE__ */ w.jsx(vx, { tone: hz[a.stageStates[g]], children: a.stageStates[g] })
          ] }, g)) }),
          /* @__PURE__ */ w.jsx("div", { className: nz, children: i ? /* @__PURE__ */ w.jsx(Pa, { variant: "danger", onClick: () => void u(), children: "Cancel generation" }) : /* @__PURE__ */ w.jsx(Pa, { onClick: () => void s(), disabled: o, children: "Generate" }) })
        ]
      }
    ) })
  ] });
}
function pz(t) {
  const [a, i] = E.useState([]), [o, s] = E.useState(!0), [u, f] = E.useState(0), h = E.useCallback(() => f((g) => g + 1), []), p = E.useCallback(async (g) => {
    i((y) => y.filter((m) => m.id !== g)), await GD(g);
  }, []);
  return E.useEffect(() => {
    let g = !1;
    return s(!0), YD().then((y) => {
      g || i(y.jobs);
    }).catch(() => {
    }).finally(() => {
      g || s(!1);
    }), () => {
      g = !0;
    };
  }, [u, t]), { jobs: a, loading: o, reload: h, remove: p };
}
var yz = "qi7dyl0", vz = "qi7dyl1", bz = "qi7dyl2", xz = "qi7dyl3", _x = "qi7dyl4", Sz = "qi7dyl5", wz = "qi7dyl7 qi7dyl6", Ez = "qi7dyl8 qi7dyl6", Dv = "qi7dyl9", _z = "qi7dyla", Nz = "qi7dylb", Cz = "qi7dylc", Mz = "qi7dyld";
function zv({
  spec: t,
  value: a,
  error: i,
  onChange: o,
  disabled: s = !1
}) {
  const u = E.useId(), f = `${u}-help`, h = i ? `${u}-error` : f;
  return /* @__PURE__ */ w.jsxs("div", { className: yz, children: [
    /* @__PURE__ */ w.jsxs("div", { className: vz, children: [
      /* @__PURE__ */ w.jsx("label", { className: bz, htmlFor: u, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ w.jsx("span", { className: xz, children: Rz(a, t.step) })
    ] }),
    Tz(t, a, o, u, h, i !== void 0, s),
    /* @__PURE__ */ w.jsx("span", { id: f, className: _x, children: t.help }),
    i && /* @__PURE__ */ w.jsx("span", { id: `${u}-error`, role: "alert", className: Sz, children: i })
  ] });
}
function Tz(t, a, i, o, s, u, f) {
  switch (t.control) {
    case "toggle": {
      const h = !!a;
      return /* @__PURE__ */ w.jsxs("div", { className: Nz, children: [
        /* @__PURE__ */ w.jsx(
          "button",
          {
            type: "button",
            id: o,
            role: "switch",
            "aria-checked": h,
            "aria-describedby": s,
            disabled: f,
            className: Cz,
            onClick: () => i(!h),
            children: /* @__PURE__ */ w.jsx("span", { className: Mz, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ w.jsx("span", { className: _x, children: h ? "On" : "Off" })
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
          className: [Ez, u ? Dv : ""].filter(Boolean).join(" "),
          value: String(a ?? t.default ?? ""),
          onChange: (h) => i(t.numeric ? Number(h.target.value) : h.target.value),
          children: t.options?.map((h) => /* @__PURE__ */ w.jsx("option", { value: h.value, children: h.label }, h.value))
        }
      );
    case "slider": {
      const h = jv(a, t), p = t.min ?? 0, g = t.max ?? 100, m = { "--trellis2-slider-fill": `${g > p ? (h - p) / (g - p) * 100 : 0}%` };
      return /* @__PURE__ */ w.jsx(
        "input",
        {
          id: o,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: f,
          className: _z,
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
          className: [wz, u ? Dv : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: jv(a, t),
          onChange: (h) => i(Number(h.target.value))
        }
      );
  }
}
function jv(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function Rz(t, a) {
  return typeof t != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(t) ? String(t) : t.toFixed(2) : t.toFixed(a >= 0.1 ? 1 : 2);
}
const Nx = [
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
], Az = Nx.filter(
  (t) => !t.advanced
), Dz = Nx.filter(
  (t) => t.advanced
);
function zz(t, a) {
  return t.gate ? t.gate.in.includes(String(a[t.gate.key])) : !0;
}
const jz = [{ id: "fast", label: "Fast", hint: "512 · quick draft", params: { pipeline_type: "512", sparse_steps: 8, shape_steps: 8, texture_steps: 8, texture_size: 1024, max_num_tokens: 49152, simplify_target: 1e5 } }, { id: "balanced", label: "Balanced", hint: "1024 cascade · default", params: { pipeline_type: "1024_cascade", sparse_steps: 12, shape_steps: 12, texture_steps: 12, texture_size: 2048, max_num_tokens: 49152, simplify_target: 1e6 } }, { id: "max", label: "Max detail", hint: "1536 cascade · slow", params: { pipeline_type: "1536_cascade", sparse_steps: 20, shape_steps: 25, texture_steps: 25, texture_size: 4096, max_num_tokens: 98304, simplify_target: 1e6 } }], Oz = {
  presets: jz
}, Lz = [
  "pipeline_type",
  "sparse_steps",
  "shape_steps",
  "texture_steps",
  "texture_size",
  "max_num_tokens",
  "simplify_target"
], Cx = Oz.presets.map((t) => ({
  id: t.id,
  label: t.label,
  hint: t.hint,
  params: t.params
}));
function Hz(t) {
  for (const a of Cx)
    if (Lz.every((i) => t[i] === a.params[i]))
      return a.id;
  return null;
}
var Bz = "ax1idp0", Uz = "ax1idp1", kz = "ax1idp2", Vz = "ax1idp3", Yz = "ax1idp4", Gz = "ax1idp5", qz = "ax1idp6", $z = "ax1idp7", Xz = "ax1idp8", Zz = "ax1idp9", Qz = "ax1idpa", Iz = "ax1idpb", Kz = "ax1idpc", Fz = "ax1idpd", Jz = "ax1idpe";
function Pz({ disabled: t = !1 }) {
  const [a, i] = E.useState(!1), o = E.useId();
  return /* @__PURE__ */ w.jsxs("section", { className: Bz, children: [
    /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        className: Uz,
        "aria-expanded": a,
        "aria-controls": o,
        onClick: () => i((s) => !s),
        children: [
          /* @__PURE__ */ w.jsx("span", { className: kz, children: "Guidance (per-stage CFG)" }),
          /* @__PURE__ */ w.jsx("span", { className: Vz, "data-open": a, "aria-hidden": "true", children: "expand_more" })
        ]
      }
    ),
    a && /* @__PURE__ */ w.jsxs("div", { id: o, className: Gz, children: [
      /* @__PURE__ */ w.jsx("p", { className: Yz, children: "Optional overrides. Leave a field blank to inherit the model's tuned default (shown as the hint). Interval start and end only apply when both are set." }),
      bx.map((s) => /* @__PURE__ */ w.jsx(Wz, { stage: s, disabled: t }, s.id))
    ] })
  ] });
}
function Wz({
  stage: t,
  disabled: a
}) {
  return /* @__PURE__ */ w.jsxs("fieldset", { className: qz, disabled: a, children: [
    /* @__PURE__ */ w.jsxs("legend", { className: $z, children: [
      /* @__PURE__ */ w.jsx("span", { className: Xz, children: t.title }),
      /* @__PURE__ */ w.jsx("span", { className: Zz, children: t.blurb })
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: Qz, children: t.fields.map((i) => /* @__PURE__ */ w.jsx(e5, { field: i }, i.key)) })
  ] });
}
function e5({ field: t }) {
  const { guidanceDraft: a, setGuidance: i } = gi(), o = E.useId(), s = `${o}-help`, u = a[t.key] ?? "";
  return /* @__PURE__ */ w.jsxs("div", { className: Iz, children: [
    /* @__PURE__ */ w.jsx("label", { className: Kz, htmlFor: o, children: t.label }),
    /* @__PURE__ */ w.jsx(
      "input",
      {
        id: o,
        type: "number",
        inputMode: "decimal",
        className: Fz,
        "aria-describedby": s,
        placeholder: t.placeholder,
        min: t.min,
        max: t.max,
        step: t.step,
        value: u,
        onChange: (f) => i(t.key, f.target.value)
      }
    ),
    /* @__PURE__ */ w.jsx("span", { id: s, className: Jz, children: t.help })
  ] });
}
var t5 = "dab3al0", n5 = "dab3al1", a5 = "dab3al2", l5 = "dab3al3", i5 = "dab3al4", r5 = "dab3al5", o5 = "dab3al6", s5 = "dab3al7", u5 = "dab3al8";
function c5(t, a) {
  const i = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (i.length === 0) return !0;
  const o = t.name.toLowerCase(), s = t.type.toLowerCase();
  return i.some((u) => u.startsWith(".") ? o.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function f5(t, a, i) {
  return a && !c5(t, a) ? `"${t.name}" is not an accepted file type.` : i !== void 0 && t.size > i ? `"${t.name}" exceeds the maximum size.` : null;
}
function d5({
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
  const g = E.useRef(null), y = E.useId(), m = E.useId(), [v, x] = E.useState(!1), [S, R] = E.useState(null), [T, M] = E.useState(null), L = E.useCallback(
    (J) => {
      const G = J?.[0];
      if (!G) return;
      const Q = f5(G, t, a);
      if (Q) {
        R(Q);
        return;
      }
      R(null), M(G), p(G);
    },
    [t, a, p]
  ), _ = E.useCallback(() => {
    i || g.current?.click();
  }, [i]), z = E.useCallback(
    (J) => {
      i || (J.key === "Enter" || J.key === " ") && (J.preventDefault(), _());
    },
    [i, _]
  ), Y = E.useCallback(
    (J) => {
      J.preventDefault(), x(!1), !i && L(J.dataTransfer.files);
    },
    [i, L]
  ), B = E.useCallback(
    (J) => {
      J.preventDefault(), i || x(!0);
    },
    [i]
  ), U = E.useCallback((J) => {
    J.preventDefault(), x(!1);
  }, []), A = [s ? m : null, S ? y : null].filter(Boolean).join(" "), K = [
    t5,
    v ? n5 : "",
    i ? a5 : "",
    S !== null ? l5 : "",
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
        "aria-describedby": A || void 0,
        className: K,
        onClick: _,
        onKeyDown: z,
        onDrop: Y,
        onDragOver: B,
        onDragLeave: U,
        children: [
          /* @__PURE__ */ w.jsx(
            "input",
            {
              ref: g,
              type: "file",
              className: i5,
              accept: t,
              disabled: i,
              tabIndex: -1,
              onChange: (J) => L(J.target.files)
            }
          ),
          h && T ? /* @__PURE__ */ w.jsx("div", { className: u5, children: h(T) }) : /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
            /* @__PURE__ */ w.jsx("span", { className: r5, children: o ?? (v ? "Drop to upload" : "Drop an image or click to browse") }),
            s && /* @__PURE__ */ w.jsx("span", { id: m, className: o5, children: s })
          ] })
        ]
      }
    ),
    S && /* @__PURE__ */ w.jsx("div", { id: y, role: "alert", className: s5, children: S })
  ] });
}
function h5(t) {
  const [a, i] = E.useState(null);
  return E.useEffect(() => {
    if (!t) {
      i(null);
      return;
    }
    const o = URL.createObjectURL(t);
    return i(o), () => URL.revokeObjectURL(o);
  }, [t]), a;
}
async function Mx(t) {
  const a = new FormData();
  a.append("file", t);
  const i = await fetch(`${tc}/uploads`, { method: "POST", body: a });
  if (!i.ok) {
    let o = null;
    try {
      o = await i.json();
    } catch {
      o = null;
    }
    throw new oi(
      i.status,
      o?.category ?? "unknown",
      o?.message ?? i.statusText,
      o?.requestId
    );
  }
  return await i.json();
}
var m5 = "_16wbbp30", g5 = "_16wbbp31", p5 = "_16wbbp32", y5 = "_16wbbp33", v5 = "_16wbbp34", b5 = "_16wbbp35", x5 = "_16wbbp37";
const S5 = 32 * 1024 * 1024, w5 = "image/png,image/jpeg,image/webp";
function E5() {
  const { imageRef: t, imageName: a, setImage: i, clearImage: o } = gi(), [s, u] = E.useState(null), [f, h] = E.useState(!1), p = h5(s), g = E.useCallback(
    async (m) => {
      u(m), h(!0);
      try {
        const { ref: v } = await Mx(m);
        i(v, m.name);
      } catch (v) {
        const x = v instanceof oi ? v.message : "Upload failed — try again.";
        Ja.error(x), u(null);
      } finally {
        h(!1);
      }
    },
    [i]
  ), y = E.useCallback(() => {
    u(null), o();
  }, [o]);
  return t && a ? /* @__PURE__ */ w.jsx("div", { className: m5, children: /* @__PURE__ */ w.jsxs("div", { className: g5, children: [
    p ? /* @__PURE__ */ w.jsx("img", { className: p5, src: p, alt: a }) : null,
    /* @__PURE__ */ w.jsxs("div", { className: y5, children: [
      /* @__PURE__ */ w.jsx("span", { className: v5, children: a }),
      /* @__PURE__ */ w.jsx("span", { className: b5, children: t })
    ] }),
    /* @__PURE__ */ w.jsx(Pa, { variant: "ghost", size: "sm", onClick: y, children: "Replace" })
  ] }) }) : /* @__PURE__ */ w.jsx(
    d5,
    {
      accept: w5,
      maxSizeBytes: S5,
      disabled: f,
      ariaLabel: "input image",
      label: f ? "Uploading…" : "Drop an image or click to browse",
      hint: "PNG, JPEG or WebP · single subject on a clean background works best",
      onFile: (m) => void g(m),
      renderPreview: (m) => p ? /* @__PURE__ */ w.jsx("img", { className: x5, src: p, alt: m.name }) : null
    }
  );
}
var _5 = "_12e60xu0", N5 = "_12e60xu1", C5 = "_12e60xu2", M5 = "_12e60xu3", T5 = "_12e60xu4", R5 = "_12e60xu5", A5 = "_12e60xu6", D5 = "_12e60xu7", z5 = "_12e60xu8", j5 = "_12e60xu9";
function O5({ presets: t, activeId: a, disabled: i, onApply: o }) {
  const [s, u] = E.useState(!1), f = E.useRef(null), h = t.find((p) => p.id === a)?.label ?? "Custom";
  return E.useEffect(() => {
    if (!s) return;
    function p(g) {
      f.current && !f.current.contains(g.target) && u(!1);
    }
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [s]), /* @__PURE__ */ w.jsxs("div", { className: _5, ref: f, children: [
    /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        className: N5,
        disabled: i,
        "aria-haspopup": "menu",
        "aria-expanded": s,
        onClick: () => u((p) => !p),
        children: [
          /* @__PURE__ */ w.jsx("span", { className: C5, "aria-hidden": "true", children: "tune" }),
          /* @__PURE__ */ w.jsx("span", { className: M5, children: "Presets" }),
          /* @__PURE__ */ w.jsx("span", { className: T5, children: h }),
          /* @__PURE__ */ w.jsx("span", { className: R5, "data-open": s, "aria-hidden": "true", children: "expand_more" })
        ]
      }
    ),
    s && /* @__PURE__ */ w.jsx("div", { className: A5, role: "menu", "aria-label": "Quality presets", children: t.map((p) => /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        role: "menuitemradio",
        "aria-checked": p.id === a,
        className: D5,
        "data-active": p.id === a,
        disabled: i,
        onClick: () => {
          o(p), u(!1);
        },
        children: [
          /* @__PURE__ */ w.jsx("span", { className: z5, children: p.label }),
          /* @__PURE__ */ w.jsx("span", { className: j5, children: p.hint })
        ]
      },
      p.id
    )) })
  ] });
}
var L5 = "_1dyscui0", Hd = "_1dyscui1", Ov = "_1dyscui2", Lv = "_1dyscui3", Hv = "_1dyscui4", Bv = "_1dyscui5", Uv = "_1dyscui6", kv = "_1dyscui7", Vv = "_1dyscui8", H5 = "_1dyscui9", B5 = "_1dyscuia", U5 = "_1dyscuib", k5 = "_1dyscuic", V5 = "_1dyscuid";
const Y5 = /* @__PURE__ */ new Set(["pipeline_type", "residency"]);
function G5() {
  const { params: t, generate: a, updateParam: i, applyParams: o } = gi(), s = a.phase === "running", [u, f] = E.useState(!1), h = E.useId(), p = Hz(t);
  return /* @__PURE__ */ w.jsxs("div", { className: L5, children: [
    /* @__PURE__ */ w.jsx("span", { className: Hd, children: "Input image" }),
    /* @__PURE__ */ w.jsx(E5, {}),
    /* @__PURE__ */ w.jsx("span", { className: Hd, children: "Quality preset" }),
    /* @__PURE__ */ w.jsx(
      O5,
      {
        presets: Cx,
        activeId: p,
        disabled: s,
        onApply: (y) => o(y.params)
      }
    ),
    /* @__PURE__ */ w.jsx("span", { className: Hd, children: "Generation" }),
    /* @__PURE__ */ w.jsx("div", { className: Ov, children: Az.map((y) => /* @__PURE__ */ w.jsx(
      zv,
      {
        spec: y,
        value: t[y.key],
        disabled: s,
        onChange: (m) => g(y.key, m)
      },
      y.key
    )) }),
    /* @__PURE__ */ w.jsxs("div", { className: Lv, children: [
      /* @__PURE__ */ w.jsxs("div", { className: Hv, children: [
        /* @__PURE__ */ w.jsx("span", { className: Bv, children: "Remove background" }),
        /* @__PURE__ */ w.jsx("span", { className: Uv, children: "On auto-cuts the subject so no ground/shadow becomes a platform. Turn off only when the input is already a cut-out (transparent PNG)." })
      ] }),
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": t.remove_background !== !1,
          "aria-label": "Remove background",
          disabled: s,
          className: kv,
          onClick: () => i("remove_background", t.remove_background === !1),
          children: /* @__PURE__ */ w.jsx("span", { className: Vv, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: Lv, children: [
      /* @__PURE__ */ w.jsxs("div", { className: Hv, children: [
        /* @__PURE__ */ w.jsx("span", { className: Bv, children: "Bake texture" }),
        /* @__PURE__ */ w.jsx("span", { className: Uv, children: "Off exports a MeshOnly GLB. On runs the texture pass (slower, larger file)." })
      ] }),
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": !!t.texture,
          "aria-label": "Bake texture",
          disabled: s,
          className: kv,
          onClick: () => i("texture", !t.texture),
          children: /* @__PURE__ */ w.jsx("span", { className: Vv, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ w.jsxs("section", { className: H5, children: [
      /* @__PURE__ */ w.jsxs(
        "button",
        {
          type: "button",
          className: U5,
          "aria-expanded": u,
          "aria-controls": h,
          onClick: () => f((y) => !y),
          children: [
            /* @__PURE__ */ w.jsx("span", { className: k5, children: "Advanced / Quality" }),
            /* @__PURE__ */ w.jsx("span", { className: V5, "data-open": u, "aria-hidden": "true", children: "expand_more" })
          ]
        }
      ),
      u && /* @__PURE__ */ w.jsxs("div", { id: h, className: B5, children: [
        /* @__PURE__ */ w.jsx("div", { className: Ov, children: Dz.map((y) => /* @__PURE__ */ w.jsx(
          zv,
          {
            spec: y,
            value: t[y.key],
            disabled: s || !zz(y, t),
            onChange: (m) => g(y.key, m)
          },
          y.key
        )) }),
        /* @__PURE__ */ w.jsx(Pz, { disabled: s })
      ] })
    ] })
  ] });
  function g(y, m) {
    if (Y5.has(y) && typeof m == "string") {
      i(y, m);
      return;
    }
    typeof m == "number" && i(y, m);
  }
}
var q5 = "gsuv1n0", $5 = "gsuv1n1", X5 = "gsuv1n2";
function uh({ title: t, detail: a, action: i, className: o }) {
  const s = [q5, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("div", { className: s, children: [
    /* @__PURE__ */ w.jsx("span", { className: $5, children: t }),
    a && /* @__PURE__ */ w.jsx("span", { className: X5, children: a }),
    i
  ] });
}
const Yv = {
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
function Z5(t, a) {
  return t !== null && Yv[t] ? Yv[t] : {
    title: "Generation failed",
    hint: a ?? "The worker reported an unexpected error. Check the logs and try again."
  };
}
var Bd = "_1799g9j0", Q5 = "_1799g9j1", I5 = "_1799g9j3", K5 = "_1799g9j4", F5 = "_1799g9j5", J5 = "_1799g9j6", P5 = "_1799g9j7", W5 = "_1799g9j8", e4 = "_1799g9j9", t4 = "_1799g9ja", Eu = "_1799g9jb", n4 = "_1799g9jc", a4 = "_1799g9jd", l4 = "_1799g9je", i4 = "_1799g9jf", r4 = "_1799g9jg", o4 = "_1799g9jh", s4 = "_1799g9ji", u4 = "_1799g9jj", c4 = "_1799g9jk", f4 = "_1799g9jl", d4 = "_1799g9jm", h4 = "_1799g9jn";
const m4 = {
  load: "Loading model…",
  encode: "Encoding image (DINOv3)…",
  sparse: "Building sparse structure…",
  shape: "Decoding shape…",
  texture: "Baking texture…",
  decode: "Decoding mesh…",
  glb: "Exporting GLB…"
};
function g4({
  state: t,
  onCancel: a,
  onReset: i
}) {
  const [o, s] = E.useState(!1);
  E.useEffect(() => {
    t.phase !== "running" && s(!1);
  }, [t.phase]);
  const u = E.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (t.phase === "idle")
    return /* @__PURE__ */ w.jsx(
      uh,
      {
        title: "No active generation",
        detail: "Upload an input image and start a generation to see live progress here."
      }
    );
  if (t.phase === "error") {
    const h = Z5(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ w.jsxs("div", { className: Bd, children: [
      /* @__PURE__ */ w.jsxs("div", { className: n4, role: "alert", children: [
        /* @__PURE__ */ w.jsx("span", { className: a4, children: h.title }),
        /* @__PURE__ */ w.jsx("span", { className: l4, children: h.hint })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: Eu, children: /* @__PURE__ */ w.jsx(Pa, { variant: "secondary", onClick: i, children: "Dismiss" }) })
    ] });
  }
  if (t.phase === "cancelled")
    return /* @__PURE__ */ w.jsxs("div", { className: Bd, children: [
      /* @__PURE__ */ w.jsx(
        uh,
        {
          title: "Generation cancelled",
          detail: "The generation was stopped before completion."
        }
      ),
      /* @__PURE__ */ w.jsx("div", { className: Eu, children: /* @__PURE__ */ w.jsx(Pa, { variant: "secondary", onClick: i, children: "Reset" }) })
    ] });
  if (t.phase === "done")
    return /* @__PURE__ */ w.jsx(p4, { state: t, onReset: i });
  const f = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ w.jsxs("div", { className: Bd, children: [
    /* @__PURE__ */ w.jsxs("output", { className: Q5, "aria-live": "polite", children: [
      /* @__PURE__ */ w.jsx("span", { className: I5, "aria-hidden": "true" }),
      y4(t)
    ] }),
    /* @__PURE__ */ w.jsx(
      "div",
      {
        className: K5,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": f,
        children: /* @__PURE__ */ w.jsx(
          "div",
          {
            className: F5,
            style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
          }
        )
      }
    ),
    /* @__PURE__ */ w.jsxs("div", { className: J5, "aria-live": "polite", children: [
      /* @__PURE__ */ w.jsx(Ud, { label: "Overall", value: `${f}%` }),
      /* @__PURE__ */ w.jsx(Ud, { label: "Stage", value: t.stage ? Tx(t.stage) : "—", accent: !0 }),
      /* @__PURE__ */ w.jsx(
        Ud,
        {
          label: "Step",
          value: t.totalSteps ? `${t.step} / ${t.totalSteps}` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: Eu, children: /* @__PURE__ */ w.jsx(Pa, { variant: "danger", onClick: u, loading: o, disabled: o, children: o ? "Cancelling…" : "Cancel generation" }) })
  ] });
}
function p4({
  state: t,
  onReset: a
}) {
  return /* @__PURE__ */ w.jsxs("output", { className: i4, children: [
    /* @__PURE__ */ w.jsxs("div", { className: r4, children: [
      /* @__PURE__ */ w.jsx("span", { className: o4, "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsx("span", { className: s4, children: "Mesh ready" })
    ] }),
    /* @__PURE__ */ w.jsx("p", { className: u4, children: "Preview, orbit and download the GLB from the stage above." }),
    /* @__PURE__ */ w.jsx(v4, { metadata: t.metadata, glbRef: t.glbRef }),
    /* @__PURE__ */ w.jsx("div", { className: Eu, children: /* @__PURE__ */ w.jsx(Pa, { variant: "secondary", onClick: a, children: "New generation" }) })
  ] });
}
function Tx(t) {
  return t.replace(/[_-]+/g, " ");
}
function y4(t) {
  return t.stage ? m4[t.stage] ?? `${Tx(t.stage)}…` : "Starting worker…";
}
function Ud({
  label: t,
  value: a,
  accent: i = !1
}) {
  return /* @__PURE__ */ w.jsxs("div", { className: P5, children: [
    /* @__PURE__ */ w.jsx("span", { className: W5, children: t }),
    /* @__PURE__ */ w.jsx(
      "span",
      {
        className: [e4, i ? t4 : ""].filter(Boolean).join(" "),
        children: a
      }
    )
  ] });
}
function v4({
  metadata: t,
  glbRef: a
}) {
  const i = [];
  if (t) {
    const o = t.mesh?.vertices, s = t.mesh?.faces;
    typeof o == "number" && i.push(["Vertices", o.toLocaleString()]), typeof s == "number" && i.push(["Faces", s.toLocaleString()]), typeof t.textured == "boolean" && i.push(["Texture", t.textured ? "baked" : "none"]), typeof t.attention_backend == "string" && i.push(["Attention", t.attention_backend]), typeof t.compute_cap == "string" && i.push(["Compute cap", t.compute_cap]);
    const u = b4(t.stage_timings);
    u !== null && i.push(["Duration", `${(u / 1e3).toFixed(1)}s`]), typeof t.sha256 == "string" && i.push(["sha256", `${t.sha256.slice(0, 16)}…`]);
  }
  return a && i.push(["Artifact", a]), i.length === 0 ? null : /* @__PURE__ */ w.jsx("div", { className: c4, children: i.map(([o, s]) => /* @__PURE__ */ w.jsxs("div", { className: f4, children: [
    /* @__PURE__ */ w.jsx("span", { className: d4, children: o }),
    /* @__PURE__ */ w.jsx("span", { className: h4, children: s })
  ] }, o)) });
}
function b4(t) {
  if (!t) return null;
  const a = Object.values(t).filter((i) => typeof i == "number");
  return a.length === 0 ? null : a.reduce((i, o) => i + o, 0);
}
function Rx(t) {
  if (!t) return null;
  const a = t.split("/").map(encodeURIComponent).join("/");
  return `${tc}/media/${a}`;
}
var x4 = "_16ts7i00", S4 = "_16ts7i01", w4 = "_16ts7i03", E4 = "_16ts7i04", _4 = "_16ts7i05", N4 = "_16ts7i06", C4 = "_16ts7i07", M4 = "_16ts7i08", T4 = "_16ts7i09", R4 = "_16ts7i0b _16ts7i0a", A4 = "_16ts7i0c", D4 = "_16ts7i0d _16ts7i0a", z4 = "_16ts7i0e";
const j4 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function O4({ jobs: t, onOpen: a, onDelete: i }) {
  return t.length === 0 ? /* @__PURE__ */ w.jsx(
    uh,
    {
      title: "No meshes yet",
      detail: "Completed generations appear here with their preview, parameters and a GLB download."
    }
  ) : /* @__PURE__ */ w.jsx("div", { className: x4, children: t.map((o) => {
    const s = Rx(o.glbRef);
    return /* @__PURE__ */ w.jsxs("div", { className: S4, children: [
      /* @__PURE__ */ w.jsx("span", { className: w4, "aria-hidden": "true", children: "3D" }),
      /* @__PURE__ */ w.jsxs("button", { type: "button", className: E4, onClick: () => a(o), children: [
        /* @__PURE__ */ w.jsxs("span", { className: _4, children: [
          /* @__PURE__ */ w.jsx("span", { className: N4, children: o.id }),
          /* @__PURE__ */ w.jsx("span", { className: C4, children: H4(o) })
        ] }),
        /* @__PURE__ */ w.jsxs("span", { className: M4, children: [
          /* @__PURE__ */ w.jsx(
            "time",
            {
              className: T4,
              dateTime: o.createdAt,
              title: B4(o.createdAt),
              children: U4(o.createdAt)
            }
          ),
          /* @__PURE__ */ w.jsx(vx, { tone: j4[o.status], children: o.status })
        ] })
      ] }),
      /* @__PURE__ */ w.jsxs(
        "a",
        {
          className: [R4, s ? "" : A4].filter(Boolean).join(" "),
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
            /* @__PURE__ */ w.jsx("span", { className: z4, children: "Download GLB" })
          ]
        }
      ),
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          className: D4,
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
const L4 = E.memo(O4);
function H4(t) {
  const a = t.params, i = [];
  typeof a.seed == "number" && i.push(`seed ${a.seed}`), typeof a.sparse_steps == "number" && i.push(`${a.sparse_steps} sparse`), a.texture && i.push("textured");
  const o = t.metadata?.mesh?.faces;
  return typeof o == "number" && i.push(`${o.toLocaleString()} faces`), i.join(" · ") || "—";
}
function B4(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
function U4(t) {
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
var k4 = "_11e6dkm0", V4 = "_11e6dkm1", Y4 = "_11e6dkm3", G4 = "_11e6dkm4", q4 = "_11e6dkm5", $4 = "_11e6dkm6 _11e6dkm5", X4 = "_11e6dkm7", Z4 = "_11e6dkm8", Q4 = "_11e6dkm9", I4 = "_11e6dkma", K4 = "_11e6dkmb", F4 = "_11e6dkmc", J4 = "_11e6dkme _11e6dkmd", P4 = "_11e6dkmf _11e6dkmd";
const W4 = ["neutral", "aces"], e6 = {
  neutral: "Neutral",
  aces: "ACES"
}, t6 = 0.4, n6 = 2, a6 = 1;
function l6({ url: t, alt: a, className: i }) {
  const [o, s] = E.useState(
    () => typeof customElements < "u" && !!customElements.get("model-viewer")
  ), [u, f] = E.useState(!1), [h, p] = E.useState(a6), [g, y] = E.useState("neutral"), m = E.useRef(null), v = E.useId();
  return E.useEffect(() => {
    let x = !1;
    if (!o)
      return import("./model-viewer-CRo-xH2b.js").then(() => {
        x || s(!0);
      }).catch(() => {
      }), () => {
        x = !0;
      };
  }, [o]), E.useEffect(() => {
    f(!1);
    const x = m.current;
    if (!o || !x || x.getAttribute("src") !== t) return;
    const S = () => f(!0);
    return x.addEventListener("load", S), () => x.removeEventListener("load", S);
  }, [o, t]), /* @__PURE__ */ w.jsxs("div", { className: [k4, i].filter(Boolean).join(" "), children: [
    o ? /* @__PURE__ */ w.jsx(
      "model-viewer",
      {
        ref: m,
        className: V4,
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
    o && u ? /* @__PURE__ */ w.jsxs("div", { className: G4, children: [
      /* @__PURE__ */ w.jsxs("div", { className: [q4, Z4].join(" "), children: [
        /* @__PURE__ */ w.jsx("label", { className: Q4, htmlFor: v, children: "Exposure" }),
        /* @__PURE__ */ w.jsx(
          "input",
          {
            id: v,
            className: K4,
            type: "range",
            min: t6,
            max: n6,
            step: 0.05,
            value: h,
            onChange: (x) => p(Number(x.target.value))
          }
        ),
        /* @__PURE__ */ w.jsx("span", { className: I4, children: h.toFixed(2) })
      ] }),
      /* @__PURE__ */ w.jsxs("fieldset", { className: $4, children: [
        /* @__PURE__ */ w.jsx("legend", { className: X4, children: "Tone" }),
        /* @__PURE__ */ w.jsx("div", { className: F4, children: W4.map((x) => {
          const S = x === g;
          return /* @__PURE__ */ w.jsx(
            "button",
            {
              type: "button",
              className: S ? P4 : J4,
              "aria-pressed": S,
              onClick: () => y(x),
              children: e6[x]
            },
            x
          );
        }) })
      ] })
    ] }) : null,
    o && u ? null : /* @__PURE__ */ w.jsx("span", { className: Y4, "aria-hidden": "true", children: "Loading mesh…" })
  ] });
}
var i6 = "at6khm0", r6 = "at6khm1", o6 = "at6khm2", s6 = "at6khm3", u6 = "at6khm4", c6 = "at6khm5", f6 = "at6khm6", d6 = "at6khm7", h6 = "at6khm8", m6 = "at6khm9", g6 = "at6khmb", Gv = "at6khmc", p6 = "at6khmd", y6 = "at6khme", v6 = "at6khmf", b6 = "at6khmg", x6 = "at6khmh", S6 = "at6khmi", w6 = "at6khmj", E6 = "at6khmk", _6 = "at6khml", N6 = "at6khmm", qv = "at6khmn", $v = "at6khmo", C6 = "at6khmp", Xv = "at6khmq", M6 = "at6khmr", T6 = "at6khms", R6 = "at6khmt", A6 = "at6khmu", D6 = "at6khmv", z6 = "at6khmw", j6 = "at6khmx", O6 = "at6khmy", L6 = "at6khmz", cu = "at6khm10", fu = "at6khm11", du = "at6khm12", H6 = "at6khm13", B6 = "at6khm14", U6 = "at6khm15", k6 = "at6khm16", V6 = "at6khm17", Y6 = "at6khm18";
const G6 = "image/png,image/jpeg,image/webp";
function q6({ state: t }) {
  const { startRefine: a, startProject: i } = gi(), o = E.useRef(null), [s, u] = E.useState(null), [f, h] = E.useState(null), [p, g] = E.useState(!1), [y, m] = E.useState(!1), [v, x] = E.useState(!1), [S, R] = E.useState(
    uo.resolution
  ), [T, M] = E.useState(uo.shape_steps), [L, _] = E.useState(
    uo.texture_steps
  ), [z, Y] = E.useState(
    uo.max_num_tokens
  ), B = t.phase === "done" ? Rx(t.glbRef) : null, U = $6(t.phase), A = X6(t), K = t.glbRef ? `${t.glbRef}.glb` : "mesh.glb", J = !!t.glbRef && !!t.inputImageRef, G = J && !y && !v, Q = J && !y && !v, re = E.useCallback(() => o.current?.click(), []), j = E.useCallback(async (q) => {
    const $ = q.target.files?.[0];
    if (q.target.value = "", !!$) {
      g(!0);
      try {
        const { ref: ne } = await Mx($);
        u(ne), h($.name);
      } catch (ne) {
        const D = ne instanceof oi ? ne.message : "Face crop upload failed — try again.";
        Ja.error(D);
      } finally {
        g(!1);
      }
    }
  }, []), Z = E.useCallback(() => {
    u(null), h(null);
  }, []), C = E.useCallback(async () => {
    if (!(!t.glbRef || !t.inputImageRef)) {
      m(!0);
      try {
        await a(
          t.glbRef,
          t.inputImageRef,
          {
            ...uo,
            resolution: S,
            shape_steps: T,
            texture_steps: L,
            max_num_tokens: z
          },
          s ?? void 0
        );
      } catch (q) {
        const $ = q instanceof oi ? q.message : "Could not start refine — try again.";
        Ja.error($);
      } finally {
        m(!1);
      }
    }
  }, [
    t.glbRef,
    t.inputImageRef,
    s,
    S,
    T,
    L,
    z,
    a
  ]), O = E.useCallback(async () => {
    if (!(!t.glbRef || !t.inputImageRef)) {
      x(!0);
      try {
        await i(t.glbRef, t.inputImageRef, { ...AD });
      } catch (q) {
        const $ = q instanceof oi ? q.message : "Could not start photo projection — try again.";
        Ja.error($);
      } finally {
        x(!1);
      }
    }
  }, [t.glbRef, t.inputImageRef, i]);
  return /* @__PURE__ */ w.jsxs("section", { className: i6, "aria-label": "Mesh preview", children: [
    /* @__PURE__ */ w.jsx("div", { className: r6, children: B ? /* @__PURE__ */ w.jsx(l6, { url: B, alt: "Generated 3D mesh preview", className: o6 }) : /* @__PURE__ */ w.jsxs(w.Fragment, { children: [
      /* @__PURE__ */ w.jsx("div", { className: s6, "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsx("span", { className: u6, children: "OUTPUT · GLB MESH" }),
      /* @__PURE__ */ w.jsxs("div", { className: c6, children: [
        /* @__PURE__ */ w.jsx("span", { className: f6, "aria-hidden": "true", children: "deployed_code" }),
        /* @__PURE__ */ w.jsx("span", { className: d6, children: U.hint })
      ] })
    ] }) }),
    /* @__PURE__ */ w.jsxs("div", { className: h6, children: [
      /* @__PURE__ */ w.jsxs("div", { className: m6, children: [
        /* @__PURE__ */ w.jsx("span", { className: [g6, U.dot].join(" "), "aria-hidden": "true" }),
        /* @__PURE__ */ w.jsx("span", { className: b6, children: U.title })
      ] }),
      /* @__PURE__ */ w.jsx("span", { className: x6, title: t.glbRef ?? void 0, children: t.glbRef ?? "—" }),
      /* @__PURE__ */ w.jsxs("div", { className: S6, children: [
        /* @__PURE__ */ w.jsx(Vd, { label: "Format", value: A.format }),
        /* @__PURE__ */ w.jsx(Vd, { label: "Triangles", value: A.tris }),
        /* @__PURE__ */ w.jsx(Vd, { label: "Vertices", value: A.verts })
      ] }),
      /* @__PURE__ */ w.jsxs("div", { className: N6, children: [
        /* @__PURE__ */ w.jsx("div", { className: qv, children: B ? /* @__PURE__ */ w.jsxs(
          "a",
          {
            className: [$v, M6].join(" "),
            href: B,
            download: K,
            children: [
              /* @__PURE__ */ w.jsx("span", { className: Xv, "aria-hidden": "true", children: "download" }),
              "Download GLB"
            ]
          }
        ) : /* @__PURE__ */ w.jsxs(
          "span",
          {
            className: [$v, C6].join(" "),
            "aria-disabled": "true",
            children: [
              /* @__PURE__ */ w.jsx("span", { className: Xv, "aria-hidden": "true", children: "download" }),
              "Download GLB"
            ]
          }
        ) }),
        /* @__PURE__ */ w.jsxs("div", { className: qv, children: [
          /* @__PURE__ */ w.jsxs(
            "button",
            {
              type: "button",
              className: T6,
              onClick: () => void C(),
              disabled: !G,
              "aria-busy": y || void 0,
              children: [
                /* @__PURE__ */ w.jsx("span", { className: R6, "aria-hidden": "true", children: "auto_fix_high" }),
                "Refine detail"
              ]
            }
          ),
          /* @__PURE__ */ w.jsxs(
            "button",
            {
              type: "button",
              className: A6,
              onClick: () => void O(),
              disabled: !Q,
              "aria-busy": v || void 0,
              children: [
                /* @__PURE__ */ w.jsx("span", { className: D6, "aria-hidden": "true", children: "wallpaper" }),
                "Project photo"
              ]
            }
          )
        ] }),
        B ? /* @__PURE__ */ w.jsxs("div", { className: z6, children: [
          /* @__PURE__ */ w.jsxs("span", { className: j6, children: [
            /* @__PURE__ */ w.jsx("span", { className: O6, "aria-hidden": "true", children: "tune" }),
            "Refine settings"
          ] }),
          /* @__PURE__ */ w.jsxs("div", { className: L6, children: [
            /* @__PURE__ */ w.jsxs("label", { className: cu, children: [
              /* @__PURE__ */ w.jsx("span", { className: fu, children: "Detail" }),
              /* @__PURE__ */ w.jsxs(
                "select",
                {
                  className: du,
                  value: S,
                  onChange: (q) => R(Number(q.target.value)),
                  disabled: y,
                  children: [
                    /* @__PURE__ */ w.jsx("option", { value: 1536, children: "Max · 1536" }),
                    /* @__PURE__ */ w.jsx("option", { value: 1024, children: "Balanced · 1024" }),
                    /* @__PURE__ */ w.jsx("option", { value: 512, children: "Fast · 512" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ w.jsxs("label", { className: cu, children: [
              /* @__PURE__ */ w.jsx("span", { className: fu, children: "Max tokens" }),
              /* @__PURE__ */ w.jsx(
                "input",
                {
                  className: du,
                  type: "number",
                  min: 0,
                  step: 4096,
                  value: z,
                  onChange: (q) => Y(kd(q.target.value, 0)),
                  disabled: y
                }
              )
            ] }),
            /* @__PURE__ */ w.jsxs("label", { className: cu, children: [
              /* @__PURE__ */ w.jsx("span", { className: fu, children: "Shape steps" }),
              /* @__PURE__ */ w.jsx(
                "input",
                {
                  className: du,
                  type: "number",
                  min: 1,
                  max: 100,
                  value: T,
                  onChange: (q) => M(kd(q.target.value, 1)),
                  disabled: y
                }
              )
            ] }),
            /* @__PURE__ */ w.jsxs("label", { className: cu, children: [
              /* @__PURE__ */ w.jsx("span", { className: fu, children: "Texture steps" }),
              /* @__PURE__ */ w.jsx(
                "input",
                {
                  className: du,
                  type: "number",
                  min: 1,
                  max: 100,
                  value: L,
                  onChange: (q) => _(kd(q.target.value, 1)),
                  disabled: y
                }
              )
            ] })
          ] })
        ] }) : null,
        B ? /* @__PURE__ */ w.jsxs("div", { className: H6, children: [
          /* @__PURE__ */ w.jsxs("span", { className: B6, children: [
            /* @__PURE__ */ w.jsx("span", { className: U6, "aria-hidden": "true", children: "face" }),
            /* @__PURE__ */ w.jsx("span", { className: k6, children: f ?? "Face crop · optional" })
          ] }),
          /* @__PURE__ */ w.jsx(
            "input",
            {
              ref: o,
              type: "file",
              className: Y6,
              accept: G6,
              tabIndex: -1,
              onChange: (q) => void j(q)
            }
          ),
          /* @__PURE__ */ w.jsx(
            "button",
            {
              type: "button",
              className: V6,
              onClick: s ? Z : re,
              disabled: p,
              children: p ? "Uploading…" : s ? "Remove" : "Attach"
            }
          )
        ] }) : null
      ] })
    ] })
  ] });
}
function kd(t, a) {
  const i = Number.parseInt(t, 10);
  return Number.isNaN(i) || i < a ? a : i;
}
function Vd({ label: t, value: a }) {
  return /* @__PURE__ */ w.jsxs("div", { className: w6, children: [
    /* @__PURE__ */ w.jsx("span", { className: E6, children: t }),
    /* @__PURE__ */ w.jsx("span", { className: _6, children: a })
  ] });
}
function $6(t) {
  switch (t) {
    case "running":
      return {
        title: "Generating…",
        hint: "Building the mesh — the preview appears here when it lands.",
        dot: p6
      };
    case "done":
      return { title: "Mesh ready", hint: "", dot: y6 };
    case "error":
      return {
        title: "Generation failed",
        hint: "See the progress panel for details, then try again.",
        dot: v6
      };
    case "cancelled":
      return {
        title: "Cancelled",
        hint: "Run a generation to preview the mesh.",
        dot: Gv
      };
    default:
      return {
        title: "No mesh yet",
        hint: "Run a generation to preview the mesh.",
        dot: Gv
      };
  }
}
function X6(t) {
  if (t.phase !== "done") return { format: "—", tris: "—", verts: "—" };
  const a = t.metadata, i = a?.mesh?.faces, o = a?.mesh?.vertices;
  return {
    format: typeof a?.textured == "boolean" ? a.textured ? "GLB · textured" : "GLB · mesh only" : "GLB",
    tris: typeof i == "number" ? i.toLocaleString() : "—",
    verts: typeof o == "number" ? o.toLocaleString() : "—"
  };
}
var Z6 = "_174fijm0", Q6 = "_174fijm1", Zv = "_174fijm2", I6 = "_174fijm3";
function K6() {
  const { generate: t, resetGenerate: a, showJobResult: i } = gi(), { blocked: o, busy: s, submit: u, cancel: f } = Ex(), h = pz(t.phase), p = E.useCallback(
    (y) => {
      i(y);
    },
    [i]
  ), g = E.useCallback(
    async (y) => {
      try {
        await h.remove(y.id);
      } catch {
        Ja.error("Could not delete that generation."), h.reload();
      }
    },
    [h]
  );
  return /* @__PURE__ */ w.jsxs("div", { className: Z6, children: [
    /* @__PURE__ */ w.jsx(q6, { state: t }),
    /* @__PURE__ */ w.jsxs("div", { className: Q6, children: [
      /* @__PURE__ */ w.jsxs("div", { className: Zv, children: [
        /* @__PURE__ */ w.jsxs(
          wu,
          {
            eyebrow: "OPERATOR · TRELLIS2.GENERATE_3D",
            title: "New mesh",
            description: "One image in, one watertight GLB out.",
            children: [
              /* @__PURE__ */ w.jsx(G5, {}),
              /* @__PURE__ */ w.jsx("div", { className: I6, children: s ? /* @__PURE__ */ w.jsx(Pa, { variant: "danger", onClick: () => void f(), children: "Cancel generation" }) : /* @__PURE__ */ w.jsx(Pa, { onClick: () => void u(), disabled: o, children: "Generate" }) })
            ]
          }
        ),
        /* @__PURE__ */ w.jsx(wu, { elevation: "raised", title: "Progress", description: "Live state mirrors the worker.", children: /* @__PURE__ */ w.jsx(
          g4,
          {
            state: t,
            onCancel: () => void f(),
            onReset: a
          }
        ) })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: Zv, children: /* @__PURE__ */ w.jsx(wu, { title: "History", description: "Past generations and their GLB downloads.", children: /* @__PURE__ */ w.jsx(L4, { jobs: h.jobs, onOpen: p, onDelete: g }) }) })
    ] })
  ] });
}
var F6 = "_126eaw50", J6 = "_126eaw51", P6 = "_126eaw52", W6 = "_126eaw53", ej = "_126eaw54", tj = "_126eaw55", nj = "_126eaw56", aj = "_126eaw57";
function lj() {
  return /* @__PURE__ */ w.jsxs(qD, { children: [
    /* @__PURE__ */ w.jsxs("div", { className: F6, children: [
      /* @__PURE__ */ w.jsx("div", { className: J6, "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsx("header", { className: P6, children: /* @__PURE__ */ w.jsxs("div", { className: W6, children: [
        /* @__PURE__ */ w.jsx("span", { className: ej, children: "GENERATIVE SURFACE · IMAGE TO 3D" }),
        /* @__PURE__ */ w.jsx("h1", { className: tj, children: "TRELLIS 2" }),
        /* @__PURE__ */ w.jsx("p", { className: nj, children: "Turn a single image into a watertight 3D mesh with Microsoft TRELLIS.2. Upload a subject, tune the flow, and export a GLB." })
      ] }) }),
      /* @__PURE__ */ w.jsx("main", { className: aj, children: /* @__PURE__ */ w.jsx(O_, {}) })
    ] }),
    /* @__PURE__ */ w.jsx(MD, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function ij() {
  return [
    {
      path: "/",
      loader: () => $0("/default/generate")
    },
    {
      path: "/:deploymentId",
      Component: lj,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => $0(`/${rj(t, "deploymentId")}/generate`)
        },
        { path: "generate", Component: K6 },
        { path: "dag", Component: gz }
      ]
    }
  ];
}
function rj(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const ch = "trellis2-app", oj = "ext-event", Qv = "trellis2-stylesheet", Iv = ["accent", "density", "card"];
function sj(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function uj() {
  if (typeof document > "u" || document.getElementById(Qv)) return;
  const t = new URL("./trellis2.css", import.meta.url).href, a = document.createElement("link");
  a.id = Qv, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
uj();
class cj extends HTMLElement {
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
    this.root = Xw.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(gy, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = x2(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const o = i.detail?.path;
      o && this.router && this.router.navigate(o);
    };
    this.navigateListener = a, this.addEventListener(gy, a);
  }
  syncTweaksFromBody() {
    for (const a of Iv) {
      const i = sj(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Iv.map((a) => `data-${a}`)
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
    const i = R_(ij(), { initialEntries: [a] });
    this.router = i, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ w.jsx(E.StrictMode, { children: /* @__PURE__ */ w.jsx(D_, { router: i }) })
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
      new CustomEvent(oj, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function fj() {
  typeof customElements > "u" || customElements.get(ch) || customElements.define(ch, cj);
}
typeof customElements < "u" && !customElements.get(ch) && fj();
export {
  fj as register
};
//# sourceMappingURL=trellis2.js.map
