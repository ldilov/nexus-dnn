function ME(t, a) {
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
function jh(t) {
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
var ty;
function DE() {
  if (ty) return po;
  ty = 1;
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
var ny;
function AE() {
  return ny || (ny = 1, xd.exports = DE()), xd.exports;
}
var S = AE(), wd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ay;
function zE() {
  if (ay) return Ve;
  ay = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), v = Symbol.iterator;
  function b(D) {
    return D === null || typeof D != "object" ? null : (D = v && D[v] || D["@@iterator"], typeof D == "function" ? D : null);
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
  }, N = Object.assign, M = {};
  function R(D, q, Q) {
    this.props = D, this.context = q, this.refs = M, this.updater = Q || w;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(D, q) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, q, "setState");
  }, R.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function z() {
  }
  z.prototype = R.prototype;
  function E(D, q, Q) {
    this.props = D, this.context = q, this.refs = M, this.updater = Q || w;
  }
  var O = E.prototype = new z();
  O.constructor = E, N(O, R.prototype), O.isPureReactComponent = !0;
  var H = Array.isArray;
  function U() {
  }
  var B = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(D, q, Q) {
    var te = Q.ref;
    return {
      $$typeof: t,
      type: D,
      key: q,
      ref: te !== void 0 ? te : null,
      props: Q
    };
  }
  function le(D, q) {
    return I(D.type, q, D.props);
  }
  function $(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function K(D) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(Q) {
      return q[Q];
    });
  }
  var re = /\/+/g;
  function j(D, q) {
    return typeof D == "object" && D !== null && D.key != null ? K("" + D.key) : q.toString(36);
  }
  function X(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(U, U) : (D.status = "pending", D.then(
          function(q) {
            D.status === "pending" && (D.status = "fulfilled", D.value = q);
          },
          function(q) {
            D.status === "pending" && (D.status = "rejected", D.reason = q);
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
  function C(D, q, Q, te, se) {
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
            case t:
            case a:
              me = !0;
              break;
            case y:
              return me = D._init, C(
                me(D._payload),
                q,
                Q,
                te,
                se
              );
          }
      }
    if (me)
      return se = se(D), me = te === "" ? "." + j(D, 0) : te, H(se) ? (Q = "", me != null && (Q = me.replace(re, "$&/") + "/"), C(se, q, Q, "", function(ze) {
        return ze;
      })) : se != null && ($(se) && (se = le(
        se,
        Q + (se.key == null || D && D.key === se.key ? "" : ("" + se.key).replace(
          re,
          "$&/"
        ) + "/") + me
      )), q.push(se)), 1;
    me = 0;
    var ee = te === "" ? "." : te + ":";
    if (H(D))
      for (var ge = 0; ge < D.length; ge++)
        te = D[ge], he = ee + j(te, ge), me += C(
          te,
          q,
          Q,
          he,
          se
        );
    else if (ge = b(D), typeof ge == "function")
      for (D = ge.call(D), ge = 0; !(te = D.next()).done; )
        te = te.value, he = ee + j(te, ge++), me += C(
          te,
          q,
          Q,
          he,
          se
        );
    else if (he === "object") {
      if (typeof D.then == "function")
        return C(
          X(D),
          q,
          Q,
          te,
          se
        );
      throw q = String(D), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return me;
  }
  function L(D, q, Q) {
    if (D == null) return D;
    var te = [], se = 0;
    return C(D, te, "", "", function(he) {
      return q.call(Q, he, se++);
    }), te;
  }
  function Z(D) {
    if (D._status === -1) {
      var q = D._result;
      q = q(), q.then(
        function(Q) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = Q);
        },
        function(Q) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = Q);
        }
      ), D._status === -1 && (D._status = 0, D._result = q);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var V = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, P = {
    map: L,
    forEach: function(D, q, Q) {
      L(
        D,
        function() {
          q.apply(this, arguments);
        },
        Q
      );
    },
    count: function(D) {
      var q = 0;
      return L(D, function() {
        q++;
      }), q;
    },
    toArray: function(D) {
      return L(D, function(q) {
        return q;
      }) || [];
    },
    only: function(D) {
      if (!$(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Ve.Activity = p, Ve.Children = P, Ve.Component = R, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = g, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, Ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return B.H.useMemoCache(D);
    }
  }, Ve.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Ve.cacheSignal = function() {
    return null;
  }, Ve.cloneElement = function(D, q, Q) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var te = N({}, D.props), se = D.key;
    if (q != null)
      for (he in q.key !== void 0 && (se = "" + q.key), q)
        !A.call(q, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && q.ref === void 0 || (te[he] = q[he]);
    var he = arguments.length - 2;
    if (he === 1) te.children = Q;
    else if (1 < he) {
      for (var me = Array(he), ee = 0; ee < he; ee++)
        me[ee] = arguments[ee + 2];
      te.children = me;
    }
    return I(D.type, se, te);
  }, Ve.createContext = function(D) {
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
  }, Ve.createElement = function(D, q, Q) {
    var te, se = {}, he = null;
    if (q != null)
      for (te in q.key !== void 0 && (he = "" + q.key), q)
        A.call(q, te) && te !== "key" && te !== "__self" && te !== "__source" && (se[te] = q[te]);
    var me = arguments.length - 2;
    if (me === 1) se.children = Q;
    else if (1 < me) {
      for (var ee = Array(me), ge = 0; ge < me; ge++)
        ee[ge] = arguments[ge + 2];
      se.children = ee;
    }
    if (D && D.defaultProps)
      for (te in me = D.defaultProps, me)
        se[te] === void 0 && (se[te] = me[te]);
    return I(D, he, se);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(D) {
    return { $$typeof: h, render: D };
  }, Ve.isValidElement = $, Ve.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: Z
    };
  }, Ve.memo = function(D, q) {
    return {
      $$typeof: m,
      type: D,
      compare: q === void 0 ? null : q
    };
  }, Ve.startTransition = function(D) {
    var q = B.T, Q = {};
    B.T = Q;
    try {
      var te = D(), se = B.S;
      se !== null && se(Q, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(U, V);
    } catch (he) {
      V(he);
    } finally {
      q !== null && Q.types !== null && (q.types = Q.types), B.T = q;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, Ve.use = function(D) {
    return B.H.use(D);
  }, Ve.useActionState = function(D, q, Q) {
    return B.H.useActionState(D, q, Q);
  }, Ve.useCallback = function(D, q) {
    return B.H.useCallback(D, q);
  }, Ve.useContext = function(D) {
    return B.H.useContext(D);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(D, q) {
    return B.H.useDeferredValue(D, q);
  }, Ve.useEffect = function(D, q) {
    return B.H.useEffect(D, q);
  }, Ve.useEffectEvent = function(D) {
    return B.H.useEffectEvent(D);
  }, Ve.useId = function() {
    return B.H.useId();
  }, Ve.useImperativeHandle = function(D, q, Q) {
    return B.H.useImperativeHandle(D, q, Q);
  }, Ve.useInsertionEffect = function(D, q) {
    return B.H.useInsertionEffect(D, q);
  }, Ve.useLayoutEffect = function(D, q) {
    return B.H.useLayoutEffect(D, q);
  }, Ve.useMemo = function(D, q) {
    return B.H.useMemo(D, q);
  }, Ve.useOptimistic = function(D, q) {
    return B.H.useOptimistic(D, q);
  }, Ve.useReducer = function(D, q, Q) {
    return B.H.useReducer(D, q, Q);
  }, Ve.useRef = function(D) {
    return B.H.useRef(D);
  }, Ve.useState = function(D) {
    return B.H.useState(D);
  }, Ve.useSyncExternalStore = function(D, q, Q) {
    return B.H.useSyncExternalStore(
      D,
      q,
      Q
    );
  }, Ve.useTransition = function() {
    return B.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var iy;
function qo() {
  return iy || (iy = 1, wd.exports = zE()), wd.exports;
}
var _ = qo();
const ye = /* @__PURE__ */ jh(_), OE = /* @__PURE__ */ ME({
  __proto__: null,
  default: ye
}, [_]);
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
var ry;
function jE() {
  return ry || (ry = 1, (function(t) {
    function a(C, L) {
      var Z = C.length;
      C.push(L);
      e: for (; 0 < Z; ) {
        var V = Z - 1 >>> 1, P = C[V];
        if (0 < s(P, L))
          C[V] = L, C[Z] = P, Z = V;
        else break e;
      }
    }
    function r(C) {
      return C.length === 0 ? null : C[0];
    }
    function l(C) {
      if (C.length === 0) return null;
      var L = C[0], Z = C.pop();
      if (Z !== L) {
        C[0] = Z;
        e: for (var V = 0, P = C.length, D = P >>> 1; V < D; ) {
          var q = 2 * (V + 1) - 1, Q = C[q], te = q + 1, se = C[te];
          if (0 > s(Q, Z))
            te < P && 0 > s(se, Q) ? (C[V] = se, C[te] = Z, V = te) : (C[V] = Q, C[q] = Z, V = q);
          else if (te < P && 0 > s(se, Z))
            C[V] = se, C[te] = Z, V = te;
          else break e;
        }
      }
      return L;
    }
    function s(C, L) {
      var Z = C.sortIndex - L.sortIndex;
      return Z !== 0 ? Z : C.id - L.id;
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
    var g = [], m = [], y = 1, p = null, v = 3, b = !1, w = !1, N = !1, M = !1, R = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(C) {
      for (var L = r(m); L !== null; ) {
        if (L.callback === null) l(m);
        else if (L.startTime <= C)
          l(m), L.sortIndex = L.expirationTime, a(g, L);
        else break;
        L = r(m);
      }
    }
    function H(C) {
      if (N = !1, O(C), !w)
        if (r(g) !== null)
          w = !0, U || (U = !0, K());
        else {
          var L = r(m);
          L !== null && X(H, L.startTime - C);
        }
    }
    var U = !1, B = -1, A = 5, I = -1;
    function le() {
      return M ? !0 : !(t.unstable_now() - I < A);
    }
    function $() {
      if (M = !1, U) {
        var C = t.unstable_now();
        I = C;
        var L = !0;
        try {
          e: {
            w = !1, N && (N = !1, z(B), B = -1), b = !0;
            var Z = v;
            try {
              t: {
                for (O(C), p = r(g); p !== null && !(p.expirationTime > C && le()); ) {
                  var V = p.callback;
                  if (typeof V == "function") {
                    p.callback = null, v = p.priorityLevel;
                    var P = V(
                      p.expirationTime <= C
                    );
                    if (C = t.unstable_now(), typeof P == "function") {
                      p.callback = P, O(C), L = !0;
                      break t;
                    }
                    p === r(g) && l(g), O(C);
                  } else l(g);
                  p = r(g);
                }
                if (p !== null) L = !0;
                else {
                  var D = r(m);
                  D !== null && X(
                    H,
                    D.startTime - C
                  ), L = !1;
                }
              }
              break e;
            } finally {
              p = null, v = Z, b = !1;
            }
            L = void 0;
          }
        } finally {
          L ? K() : U = !1;
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
        R($, 0);
      };
    function X(C, L) {
      B = R(function() {
        C(t.unstable_now());
      }, L);
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
          var L = 3;
          break;
        default:
          L = v;
      }
      var Z = v;
      v = L;
      try {
        return C();
      } finally {
        v = Z;
      }
    }, t.unstable_requestPaint = function() {
      M = !0;
    }, t.unstable_runWithPriority = function(C, L) {
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
      var Z = v;
      v = C;
      try {
        return L();
      } finally {
        v = Z;
      }
    }, t.unstable_scheduleCallback = function(C, L, Z) {
      var V = t.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? V + Z : V) : Z = V, C) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = Z + P, C = {
        id: y++,
        callback: L,
        priorityLevel: C,
        startTime: Z,
        expirationTime: P,
        sortIndex: -1
      }, Z > V ? (C.sortIndex = Z, a(m, C), r(g) === null && C === r(m) && (N ? (z(B), B = -1) : N = !0, X(H, Z - V))) : (C.sortIndex = P, a(g, C), w || b || (w = !0, U || (U = !0, K()))), C;
    }, t.unstable_shouldYield = le, t.unstable_wrapCallback = function(C) {
      var L = v;
      return function() {
        var Z = v;
        v = L;
        try {
          return C.apply(this, arguments);
        } finally {
          v = Z;
        }
      };
    };
  })(_d)), _d;
}
var ly;
function LE() {
  return ly || (ly = 1, Ed.exports = jE()), Ed.exports;
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
var oy;
function HE() {
  if (oy) return fn;
  oy = 1;
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
var sy;
function Db() {
  if (sy) return Nd.exports;
  sy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Nd.exports = HE(), Nd.exports;
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
var uy;
function BE() {
  if (uy) return go;
  uy = 1;
  var t = LE(), a = qo(), r = Db();
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
        for (var x = !1, T = f.child; T; ) {
          if (T === i) {
            x = !0, i = f, o = d;
            break;
          }
          if (T === o) {
            x = !0, o = f, i = d;
            break;
          }
          T = T.sibling;
        }
        if (!x) {
          for (T = d.child; T; ) {
            if (T === i) {
              x = !0, i = d, o = f;
              break;
            }
            if (T === o) {
              x = !0, o = d, i = f;
              break;
            }
            T = T.sibling;
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
  var p = Object.assign, v = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), B = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), le = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
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
      case N:
        return "Fragment";
      case R:
        return "Profiler";
      case M:
        return "StrictMode";
      case H:
        return "Suspense";
      case U:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case E:
          return e.displayName || "Context";
        case z:
          return (e._context.displayName || "Context") + ".Consumer";
        case O:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case B:
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
  var X = Array.isArray, C = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, V = [], P = -1;
  function D(e) {
    return { current: e };
  }
  function q(e) {
    0 > P || (e.current = V[P], V[P] = null, P--);
  }
  function Q(e, n) {
    P++, V[P] = e.current, e.current = n;
  }
  var te = D(null), se = D(null), he = D(null), me = D(null);
  function ee(e, n) {
    switch (Q(he, n), Q(se, e), Q(te, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? _0(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = _0(n), e = N0(n, e);
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
    q(te), Q(te, e);
  }
  function ge() {
    q(te), q(se), q(he);
  }
  function ze(e) {
    e.memoizedState !== null && Q(me, e);
    var n = te.current, i = N0(n, e.type);
    n !== i && (Q(se, e), Q(te, i));
  }
  function Re(e) {
    se.current === e && (q(te), q(se)), me.current === e && (q(me), co._currentValue = Z);
  }
  var Se, xe;
  function Ce(e) {
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
      var d = o.DetermineComponentFrameRoot(), x = d[0], T = d[1];
      if (x && T) {
        var Y = x.split(`
`), ae = T.split(`
`);
        for (f = o = 0; o < Y.length && !Y[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < ae.length && !ae[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === Y.length || f === ae.length)
          for (o = Y.length - 1, f = ae.length - 1; 1 <= o && 0 <= f && Y[o] !== ae[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (Y[o] !== ae[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || Y[o] !== ae[f]) {
                  var ue = `
` + Y[o].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      Ye = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ce(i) : "";
  }
  function Te(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ce(e.type);
      case 16:
        return Ce("Lazy");
      case 13:
        return e.child !== n && n !== null ? Ce("Suspense Fallback") : Ce("Suspense");
      case 19:
        return Ce("SuspenseList");
      case 0:
      case 15:
        return ft(e.type, !1);
      case 11:
        return ft(e.type.render, !1);
      case 1:
        return ft(e.type, !0);
      case 31:
        return Ce("Activity");
      default:
        return "";
    }
  }
  function Ge(e) {
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
  var Be = Object.prototype.hasOwnProperty, $e = t.unstable_scheduleCallback, St = t.unstable_cancelCallback, Je = t.unstable_shouldYield, Fe = t.unstable_requestPaint, Qe = t.unstable_now, gt = t.unstable_getCurrentPriorityLevel, yt = t.unstable_ImmediatePriority, It = t.unstable_UserBlockingPriority, Lt = t.unstable_NormalPriority, mt = t.unstable_LowPriority, ot = t.unstable_IdlePriority, $n = t.log, yn = t.unstable_setDisableYieldValue, tn = null, Pt = null;
  function Ot(e) {
    if (typeof $n == "function" && yn(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(tn, e);
      } catch {
      }
  }
  var kt = Math.clz32 ? Math.clz32 : vn, fi = Math.log, Sa = Math.LN2;
  function vn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (fi(e) / Sa | 0) | 0;
  }
  var ra = 256, Dn = 262144, In = 4194304;
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
    var T = o & 134217727;
    return T !== 0 ? (o = T & ~d, o !== 0 ? f = un(o) : (x &= T, x !== 0 ? f = un(x) : i || (i = T & ~e, i !== 0 && (f = un(i))))) : (T = o & ~d, T !== 0 ? f = un(T) : x !== 0 ? f = un(x) : i || (i = o & ~e, i !== 0 && (f = un(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & d) === 0 && (d = f & -f, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : f;
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
    var e = In;
    return In <<= 1, (In & 62914560) === 0 && (In = 4194304), e;
  }
  function mn(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function pt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Kt(e, n, i, o, f, d) {
    var x = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var T = e.entanglements, Y = e.expirationTimes, ae = e.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var ue = 31 - kt(i), fe = 1 << ue;
      T[ue] = 0, Y[ue] = -1;
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
  function k(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : F(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function F(e) {
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
    var e = L.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : F0(e.type));
  }
  function pe(e, n) {
    var i = L.p;
    try {
      return L.p = e, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, we = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, ke = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Xe = "__reactMarker$" + Ee;
  function rt(e) {
    delete e[ve], delete e[we], delete e[Me], delete e[De], delete e[ke];
  }
  function Ct(e) {
    var n = e[ve];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = z0(e); e !== null; ) {
            if (i = e[ve]) return i;
            e = z0(e);
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
  function jt(e) {
    var n = e[je];
    return n || (n = e[je] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(e) {
    e[Xe] = !0;
  }
  var Ea = /* @__PURE__ */ new Set(), An = {};
  function cn(e, n) {
    nn(e, n), nn(e + "Capture", n);
  }
  function nn(e, n) {
    for (An[e] = n, e = 0; e < n.length; e++)
      Ea.add(n[e]);
  }
  var bn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), di = {}, xn = {};
  function hi(e) {
    return Be.call(xn, e) ? !0 : Be.call(di, e) ? !1 : bn.test(e) ? xn[e] = !0 : (di[e] = !0, !1);
  }
  function oa(e, n, i) {
    if (hi(n))
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
  function zn(e, n, i) {
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
  function mi(e) {
    if (!e._valueTracker) {
      var n = pn(e) ? "checked" : "value";
      e._valueTracker = zn(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Ba(e) {
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
  function Gi(e, n, i, o, f, d, x, T) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + bt(n)) : e.value !== "" + bt(n) && (e.value = "" + bt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Nl(e, x, bt(n)) : i != null ? Nl(e, x, bt(i)) : o != null && e.removeAttribute("value"), f == null && d != null && (e.defaultChecked = !!d), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean" ? e.name = "" + bt(T) : e.removeAttribute("name");
  }
  function Cr(e, n, i, o, f, d, x, T) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        mi(e);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, T || n === e.value || (e.value = n), e.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = T ? e.checked : !!o, e.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), mi(e);
  }
  function Nl(e, n, i) {
    n === "number" && dt(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function pi(e, n, i, o) {
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
  function Cl(e, n, i) {
    if (n != null && (n = "" + bt(n), n !== e.value && (e.value = n), i == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = i != null ? "" + bt(i) : "";
  }
  function xm(e, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (X(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), e.defaultValue = i, o = e.textContent, o === i && o !== "" && o !== null && (e.value = o), mi(e);
  }
  function Rr(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var _w = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function wm(e, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : o ? e.setProperty(n, i) : typeof i != "number" || i === 0 || _w.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function Sm(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && wm(e, f, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && wm(e, d, n[d]);
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
  var Nw = /* @__PURE__ */ new Map([
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
  ]), Cw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Jo(e) {
    return Cw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Ua() {
  }
  var gc = null;
  function yc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Tr = null, Mr = null;
  function Em(e) {
    var n = st(e);
    if (n && (e = n.stateNode)) {
      var i = e[we] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Gi(
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
                Gi(
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
              o = i[n], o.form === e.form && Ba(o);
          }
          break e;
        case "textarea":
          Cl(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && pi(e, !!i.multiple, n, !1);
      }
    }
  }
  var vc = !1;
  function _m(e, n, i) {
    if (vc) return e(n, i);
    vc = !0;
    try {
      var o = e(n);
      return o;
    } finally {
      if (vc = !1, (Tr !== null || Mr !== null) && (ks(), Tr && (n = Tr, e = Mr, Mr = Tr = null, Em(n), e)))
        for (n = 0; n < e.length; n++) Em(e[n]);
    }
  }
  function Rl(e, n) {
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
  var ka = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bc = !1;
  if (ka)
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
  var gi = null, xc = null, Wo = null;
  function Nm() {
    if (Wo) return Wo;
    var e, n = xc, i = n.length, o, f = "value" in gi ? gi.value : gi.textContent, d = f.length;
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
  function Cm() {
    return !1;
  }
  function wn(e) {
    function n(i, o, f, d, x) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var T in e)
        e.hasOwnProperty(T) && (i = e[T], this[T] = i ? i(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ts : Cm, this.isPropagationStopped = Cm, this;
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
  }, ns = wn(Zi), Ml = p({}, Zi, { view: 0, detail: 0 }), Rw = wn(Ml), wc, Sc, Dl, as = p({}, Ml, {
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
  }), Rm = wn(as), Tw = p({}, as, { dataTransfer: 0 }), Mw = wn(Tw), Dw = p({}, Ml, { relatedTarget: 0 }), Ec = wn(Dw), Aw = p({}, Zi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), zw = wn(Aw), Ow = p({}, Zi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), jw = wn(Ow), Lw = p({}, Zi, { data: 0 }), Tm = wn(Lw), Hw = {
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
  }, Bw = {
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
  }, Uw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function kw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Uw[e]) ? !!n[e] : !1;
  }
  function _c() {
    return kw;
  }
  var Vw = p({}, Ml, {
    key: function(e) {
      if (e.key) {
        var n = Hw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = es(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Bw[e.keyCode] || "Unidentified" : "";
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
  }), qw = wn(Vw), Yw = p({}, as, {
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
  }), Mm = wn(Yw), $w = p({}, Ml, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: _c
  }), Iw = wn($w), Xw = p({}, Zi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Gw = wn(Xw), Zw = p({}, as, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Fw = wn(Zw), Qw = p({}, Zi, {
    newState: 0,
    oldState: 0
  }), Pw = wn(Qw), Kw = [9, 13, 27, 32], Nc = ka && "CompositionEvent" in window, Al = null;
  ka && "documentMode" in document && (Al = document.documentMode);
  var Jw = ka && "TextEvent" in window && !Al, Dm = ka && (!Nc || Al && 8 < Al && 11 >= Al), Am = " ", zm = !1;
  function Om(e, n) {
    switch (e) {
      case "keyup":
        return Kw.indexOf(n.keyCode) !== -1;
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
  function jm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Dr = !1;
  function Ww(e, n) {
    switch (e) {
      case "compositionend":
        return jm(n);
      case "keypress":
        return n.which !== 32 ? null : (zm = !0, Am);
      case "textInput":
        return e = n.data, e === Am && zm ? null : e;
      default:
        return null;
    }
  }
  function eS(e, n) {
    if (Dr)
      return e === "compositionend" || !Nc && Om(e, n) ? (e = Nm(), Wo = xc = gi = null, Dr = !1, e) : null;
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
        return Dm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var tS = {
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
  function Lm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!tS[e.type] : n === "textarea";
  }
  function Hm(e, n, i, o) {
    Tr ? Mr ? Mr.push(o) : Mr = [o] : Tr = o, n = Gs(n, "onChange"), 0 < n.length && (i = new ns(
      "onChange",
      "change",
      null,
      i,
      o
    ), e.push({ event: i, listeners: n }));
  }
  var zl = null, Ol = null;
  function nS(e) {
    v0(e, 0);
  }
  function is(e) {
    var n = We(e);
    if (Ba(n)) return e;
  }
  function Bm(e, n) {
    if (e === "change") return n;
  }
  var Um = !1;
  if (ka) {
    var Cc;
    if (ka) {
      var Rc = "oninput" in document;
      if (!Rc) {
        var km = document.createElement("div");
        km.setAttribute("oninput", "return;"), Rc = typeof km.oninput == "function";
      }
      Cc = Rc;
    } else Cc = !1;
    Um = Cc && (!document.documentMode || 9 < document.documentMode);
  }
  function Vm() {
    zl && (zl.detachEvent("onpropertychange", qm), Ol = zl = null);
  }
  function qm(e) {
    if (e.propertyName === "value" && is(Ol)) {
      var n = [];
      Hm(
        n,
        Ol,
        e,
        yc(e)
      ), _m(nS, n);
    }
  }
  function aS(e, n, i) {
    e === "focusin" ? (Vm(), zl = n, Ol = i, zl.attachEvent("onpropertychange", qm)) : e === "focusout" && Vm();
  }
  function iS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return is(Ol);
  }
  function rS(e, n) {
    if (e === "click") return is(n);
  }
  function lS(e, n) {
    if (e === "input" || e === "change")
      return is(n);
  }
  function oS(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var On = typeof Object.is == "function" ? Object.is : oS;
  function jl(e, n) {
    if (On(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(e), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!Be.call(n, f) || !On(e[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Ym(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $m(e, n) {
    var i = Ym(e);
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
      i = Ym(i);
    }
  }
  function Im(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Im(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Xm(e) {
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
  var sS = ka && "documentMode" in document && 11 >= document.documentMode, Ar = null, Mc = null, Ll = null, Dc = !1;
  function Gm(e, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Dc || Ar == null || Ar !== dt(o) || (o = Ar, "selectionStart" in o && Tc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ll && jl(Ll, o) || (Ll = o, o = Gs(Mc, "onSelect"), 0 < o.length && (n = new ns(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: o }), n.target = Ar)));
  }
  function Fi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var zr = {
    animationend: Fi("Animation", "AnimationEnd"),
    animationiteration: Fi("Animation", "AnimationIteration"),
    animationstart: Fi("Animation", "AnimationStart"),
    transitionrun: Fi("Transition", "TransitionRun"),
    transitionstart: Fi("Transition", "TransitionStart"),
    transitioncancel: Fi("Transition", "TransitionCancel"),
    transitionend: Fi("Transition", "TransitionEnd")
  }, Ac = {}, Zm = {};
  ka && (Zm = document.createElement("div").style, "AnimationEvent" in window || (delete zr.animationend.animation, delete zr.animationiteration.animation, delete zr.animationstart.animation), "TransitionEvent" in window || delete zr.transitionend.transition);
  function Qi(e) {
    if (Ac[e]) return Ac[e];
    if (!zr[e]) return e;
    var n = zr[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Zm)
        return Ac[e] = n[i];
    return e;
  }
  var Fm = Qi("animationend"), Qm = Qi("animationiteration"), Pm = Qi("animationstart"), uS = Qi("transitionrun"), cS = Qi("transitionstart"), fS = Qi("transitioncancel"), Km = Qi("transitionend"), Jm = /* @__PURE__ */ new Map(), zc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  zc.push("scrollEnd");
  function ua(e, n) {
    Jm.set(e, n), cn(n, [e]);
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
      d !== 0 && Wm(i, f, d);
    }
  }
  function os(e, n, i, o) {
    Gn[Or++] = e, Gn[Or++] = n, Gn[Or++] = i, Gn[Or++] = o, Oc |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function jc(e, n, i, o) {
    return os(e, n, i, o), ss(e);
  }
  function Pi(e, n) {
    return os(e, null, null, n), ss(e);
  }
  function Wm(e, n, i) {
    e.lanes |= i;
    var o = e.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, d = e.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (f = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, f && n !== null && (f = 31 - kt(i), e = d.hiddenUpdates, o = e[f], o === null ? e[f] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function ss(e) {
    if (50 < ao)
      throw ao = 0, If = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var jr = {};
  function dS(e, n, i, o) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(e, n, i, o) {
    return new dS(e, n, i, o);
  }
  function Lc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Va(e, n) {
    var i = e.alternate;
    return i === null ? (i = jn(
      e.tag,
      n,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function ep(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function us(e, n, i, o, f, d) {
    var x = 0;
    if (o = e, typeof e == "function") Lc(e) && (x = 1);
    else if (typeof e == "string")
      x = yE(
        e,
        i,
        te.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case I:
          return e = jn(31, i, n, f), e.elementType = I, e.lanes = d, e;
        case N:
          return Ki(i.children, f, d, n);
        case M:
          x = 8, f |= 24;
          break;
        case R:
          return e = jn(12, i, n, f | 2), e.elementType = R, e.lanes = d, e;
        case H:
          return e = jn(13, i, n, f), e.elementType = H, e.lanes = d, e;
        case U:
          return e = jn(19, i, n, f), e.elementType = U, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
                x = 10;
                break e;
              case z:
                x = 9;
                break e;
              case O:
                x = 11;
                break e;
              case B:
                x = 14;
                break e;
              case A:
                x = 16, o = null;
                break e;
            }
          x = 29, i = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return n = jn(x, i, n, f), n.elementType = e, n.type = o, n.lanes = d, n;
  }
  function Ki(e, n, i, o) {
    return e = jn(7, e, o, n), e.lanes = i, e;
  }
  function Hc(e, n, i) {
    return e = jn(6, e, null, n), e.lanes = i, e;
  }
  function tp(e) {
    var n = jn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Bc(e, n, i) {
    return n = jn(
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
  var np = /* @__PURE__ */ new WeakMap();
  function Zn(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = np.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Ge(n)
      }, np.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ge(n)
    };
  }
  var Lr = [], Hr = 0, cs = null, Hl = 0, Fn = [], Qn = 0, yi = null, _a = 1, Na = "";
  function qa(e, n) {
    Lr[Hr++] = Hl, Lr[Hr++] = cs, cs = e, Hl = n;
  }
  function ap(e, n, i) {
    Fn[Qn++] = _a, Fn[Qn++] = Na, Fn[Qn++] = yi, yi = e;
    var o = _a;
    e = Na;
    var f = 32 - kt(o) - 1;
    o &= ~(1 << f), i += 1;
    var d = 32 - kt(n) + f;
    if (30 < d) {
      var x = f - f % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, f -= x, _a = 1 << 32 - kt(n) + f | i << f | o, Na = d + e;
    } else
      _a = 1 << d | i << f | o, Na = e;
  }
  function Uc(e) {
    e.return !== null && (qa(e, 1), ap(e, 1, 0));
  }
  function kc(e) {
    for (; e === cs; )
      cs = Lr[--Hr], Lr[Hr] = null, Hl = Lr[--Hr], Lr[Hr] = null;
    for (; e === yi; )
      yi = Fn[--Qn], Fn[Qn] = null, Na = Fn[--Qn], Fn[Qn] = null, _a = Fn[--Qn], Fn[Qn] = null;
  }
  function ip(e, n) {
    Fn[Qn++] = _a, Fn[Qn++] = Na, Fn[Qn++] = yi, _a = n.id, Na = n.overflow, yi = e;
  }
  var rn = null, Tt = null, it = !1, vi = null, Pn = !1, Vc = Error(l(519));
  function bi(e) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Bl(Zn(n, e)), Vc;
  }
  function rp(e) {
    var n = e.stateNode, i = e.type, o = e.memoizedProps;
    switch (n[ve] = e, n[we] = o, i) {
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
        for (i = 0; i < ro.length; i++)
          Ke(ro[i], n);
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
        Ke("invalid", n), Cr(
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
        Ke("invalid", n), xm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || S0(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = Ua), n = !0) : n = !1, n || bi(e, !0);
  }
  function lp(e) {
    for (rn = e.return; rn; )
      switch (rn.tag) {
        case 5:
        case 31:
        case 13:
          Pn = !1;
          return;
        case 27:
        case 3:
          Pn = !0;
          return;
        default:
          rn = rn.return;
      }
  }
  function Br(e) {
    if (e !== rn) return !1;
    if (!it) return lp(e), it = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || rd(e.type, e.memoizedProps)), i = !i), i && Tt && bi(e), lp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Tt = A0(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Tt = A0(e);
    } else
      n === 27 ? (n = Tt, Oi(e.type) ? (e = cd, cd = null, Tt = e) : Tt = n) : Tt = rn ? Jn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ji() {
    Tt = rn = null, it = !1;
  }
  function qc() {
    var e = vi;
    return e !== null && (Nn === null ? Nn = e : Nn.push.apply(
      Nn,
      e
    ), vi = null), e;
  }
  function Bl(e) {
    vi === null ? vi = [e] : vi.push(e);
  }
  var Yc = D(null), Wi = null, Ya = null;
  function xi(e, n, i) {
    Q(Yc, n._currentValue), n._currentValue = i;
  }
  function $a(e) {
    e._currentValue = Yc.current, q(Yc);
  }
  function $c(e, n, i) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function Ic(e, n, i, o) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var d = f.dependencies;
      if (d !== null) {
        var x = f.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var T = d;
          d = f;
          for (var Y = 0; Y < n.length; Y++)
            if (T.context === n[Y]) {
              d.lanes |= i, T = d.alternate, T !== null && (T.lanes |= i), $c(
                d.return,
                i,
                e
              ), o || (x = null);
              break e;
            }
          d = T.next;
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
          var T = f.type;
          On(f.pendingProps.value, x.value) || (e !== null ? e.push(T) : e = [T]);
        }
      } else if (f === me.current) {
        if (x = f.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(co) : e = [co]);
      }
      f = f.return;
    }
    e !== null && Ic(
      n,
      e,
      i,
      o
    ), n.flags |= 262144;
  }
  function fs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!On(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function er(e) {
    Wi = e, Ya = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ln(e) {
    return op(Wi, e);
  }
  function ds(e, n) {
    return Wi === null && er(e), op(e, n);
  }
  function op(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Ya === null) {
      if (e === null) throw Error(l(308));
      Ya = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ya = Ya.next = n;
    return i;
  }
  var hS = typeof AbortController < "u" ? AbortController : function() {
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
  }, mS = t.unstable_scheduleCallback, pS = t.unstable_NormalPriority, Xt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Xc() {
    return {
      controller: new hS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ul(e) {
    e.refCount--, e.refCount === 0 && mS(pS, function() {
      e.controller.abort();
    });
  }
  var kl = null, Gc = 0, kr = 0, Vr = null;
  function gS(e, n) {
    if (kl === null) {
      var i = kl = [];
      Gc = 0, kr = Pf(), Vr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Gc++, n.then(sp, sp), n;
  }
  function sp() {
    if (--Gc === 0 && kl !== null) {
      Vr !== null && (Vr.status = "fulfilled");
      var e = kl;
      kl = null, kr = 0, Vr = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function yS(e, n) {
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
  var up = C.S;
  C.S = function(e, n) {
    Gg = Qe(), typeof n == "object" && n !== null && typeof n.then == "function" && gS(e, n), up !== null && up(e, n);
  };
  var tr = D(null);
  function Zc() {
    var e = tr.current;
    return e !== null ? e : Rt.pooledCache;
  }
  function hs(e, n) {
    n === null ? Q(tr, tr.current) : Q(tr, n.pool);
  }
  function cp() {
    var e = Zc();
    return e === null ? null : { parent: Xt._currentValue, pool: e };
  }
  var qr = Error(l(460)), Fc = Error(l(474)), ms = Error(l(542)), ps = { then: function() {
  } };
  function fp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function dp(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(Ua, Ua), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, mp(e), e;
      default:
        if (typeof n.status == "string") n.then(Ua, Ua);
        else {
          if (e = Rt, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = n.reason, mp(e), e;
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
  function hp() {
    if (ar === null) throw Error(l(459));
    var e = ar;
    return ar = null, e;
  }
  function mp(e) {
    if (e === qr || e === ms)
      throw Error(l(483));
  }
  var Yr = null, Vl = 0;
  function gs(e) {
    var n = Vl;
    return Vl += 1, Yr === null && (Yr = []), dp(Yr, e, n);
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
  function pp(e) {
    function n(J, G) {
      if (e) {
        var ne = J.deletions;
        ne === null ? (J.deletions = [G], J.flags |= 16) : ne.push(G);
      }
    }
    function i(J, G) {
      if (!e) return null;
      for (; G !== null; )
        n(J, G), G = G.sibling;
      return null;
    }
    function o(J) {
      for (var G = /* @__PURE__ */ new Map(); J !== null; )
        J.key !== null ? G.set(J.key, J) : G.set(J.index, J), J = J.sibling;
      return G;
    }
    function f(J, G) {
      return J = Va(J, G), J.index = 0, J.sibling = null, J;
    }
    function d(J, G, ne) {
      return J.index = ne, e ? (ne = J.alternate, ne !== null ? (ne = ne.index, ne < G ? (J.flags |= 67108866, G) : ne) : (J.flags |= 67108866, G)) : (J.flags |= 1048576, G);
    }
    function x(J) {
      return e && J.alternate === null && (J.flags |= 67108866), J;
    }
    function T(J, G, ne, ce) {
      return G === null || G.tag !== 6 ? (G = Hc(ne, J.mode, ce), G.return = J, G) : (G = f(G, ne), G.return = J, G);
    }
    function Y(J, G, ne, ce) {
      var Oe = ne.type;
      return Oe === N ? ue(
        J,
        G,
        ne.props.children,
        ce,
        ne.key
      ) : G !== null && (G.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && nr(Oe) === G.type) ? (G = f(G, ne.props), ql(G, ne), G.return = J, G) : (G = us(
        ne.type,
        ne.key,
        ne.props,
        null,
        J.mode,
        ce
      ), ql(G, ne), G.return = J, G);
    }
    function ae(J, G, ne, ce) {
      return G === null || G.tag !== 4 || G.stateNode.containerInfo !== ne.containerInfo || G.stateNode.implementation !== ne.implementation ? (G = Bc(ne, J.mode, ce), G.return = J, G) : (G = f(G, ne.children || []), G.return = J, G);
    }
    function ue(J, G, ne, ce, Oe) {
      return G === null || G.tag !== 7 ? (G = Ki(
        ne,
        J.mode,
        ce,
        Oe
      ), G.return = J, G) : (G = f(G, ne), G.return = J, G);
    }
    function fe(J, G, ne) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return G = Hc(
          "" + G,
          J.mode,
          ne
        ), G.return = J, G;
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case b:
            return ne = us(
              G.type,
              G.key,
              G.props,
              null,
              J.mode,
              ne
            ), ql(ne, G), ne.return = J, ne;
          case w:
            return G = Bc(
              G,
              J.mode,
              ne
            ), G.return = J, G;
          case A:
            return G = nr(G), fe(J, G, ne);
        }
        if (X(G) || K(G))
          return G = Ki(
            G,
            J.mode,
            ne,
            null
          ), G.return = J, G;
        if (typeof G.then == "function")
          return fe(J, gs(G), ne);
        if (G.$$typeof === E)
          return fe(
            J,
            ds(J, G),
            ne
          );
        ys(J, G);
      }
      return null;
    }
    function ie(J, G, ne, ce) {
      var Oe = G !== null ? G.key : null;
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return Oe !== null ? null : T(J, G, "" + ne, ce);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case b:
            return ne.key === Oe ? Y(J, G, ne, ce) : null;
          case w:
            return ne.key === Oe ? ae(J, G, ne, ce) : null;
          case A:
            return ne = nr(ne), ie(J, G, ne, ce);
        }
        if (X(ne) || K(ne))
          return Oe !== null ? null : ue(J, G, ne, ce, null);
        if (typeof ne.then == "function")
          return ie(
            J,
            G,
            gs(ne),
            ce
          );
        if (ne.$$typeof === E)
          return ie(
            J,
            G,
            ds(J, ne),
            ce
          );
        ys(J, ne);
      }
      return null;
    }
    function oe(J, G, ne, ce, Oe) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return J = J.get(ne) || null, T(G, J, "" + ce, Oe);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case b:
            return J = J.get(
              ce.key === null ? ne : ce.key
            ) || null, Y(G, J, ce, Oe);
          case w:
            return J = J.get(
              ce.key === null ? ne : ce.key
            ) || null, ae(G, J, ce, Oe);
          case A:
            return ce = nr(ce), oe(
              J,
              G,
              ne,
              ce,
              Oe
            );
        }
        if (X(ce) || K(ce))
          return J = J.get(ne) || null, ue(G, J, ce, Oe, null);
        if (typeof ce.then == "function")
          return oe(
            J,
            G,
            ne,
            gs(ce),
            Oe
          );
        if (ce.$$typeof === E)
          return oe(
            J,
            G,
            ne,
            ds(G, ce),
            Oe
          );
        ys(G, ce);
      }
      return null;
    }
    function _e(J, G, ne, ce) {
      for (var Oe = null, ut = null, Ne = G, Ie = G = 0, tt = null; Ne !== null && Ie < ne.length; Ie++) {
        Ne.index > Ie ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var ct = ie(
          J,
          Ne,
          ne[Ie],
          ce
        );
        if (ct === null) {
          Ne === null && (Ne = tt);
          break;
        }
        e && Ne && ct.alternate === null && n(J, Ne), G = d(ct, G, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ne = tt;
      }
      if (Ie === ne.length)
        return i(J, Ne), it && qa(J, Ie), Oe;
      if (Ne === null) {
        for (; Ie < ne.length; Ie++)
          Ne = fe(J, ne[Ie], ce), Ne !== null && (G = d(
            Ne,
            G,
            Ie
          ), ut === null ? Oe = Ne : ut.sibling = Ne, ut = Ne);
        return it && qa(J, Ie), Oe;
      }
      for (Ne = o(Ne); Ie < ne.length; Ie++)
        tt = oe(
          Ne,
          J,
          Ie,
          ne[Ie],
          ce
        ), tt !== null && (e && tt.alternate !== null && Ne.delete(
          tt.key === null ? Ie : tt.key
        ), G = d(
          tt,
          G,
          Ie
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return e && Ne.forEach(function(Ui) {
        return n(J, Ui);
      }), it && qa(J, Ie), Oe;
    }
    function Le(J, G, ne, ce) {
      if (ne == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ne = G, Ie = G = 0, tt = null, ct = ne.next(); Ne !== null && !ct.done; Ie++, ct = ne.next()) {
        Ne.index > Ie ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var Ui = ie(J, Ne, ct.value, ce);
        if (Ui === null) {
          Ne === null && (Ne = tt);
          break;
        }
        e && Ne && Ui.alternate === null && n(J, Ne), G = d(Ui, G, Ie), ut === null ? Oe = Ui : ut.sibling = Ui, ut = Ui, Ne = tt;
      }
      if (ct.done)
        return i(J, Ne), it && qa(J, Ie), Oe;
      if (Ne === null) {
        for (; !ct.done; Ie++, ct = ne.next())
          ct = fe(J, ct.value, ce), ct !== null && (G = d(ct, G, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && qa(J, Ie), Oe;
      }
      for (Ne = o(Ne); !ct.done; Ie++, ct = ne.next())
        ct = oe(Ne, J, Ie, ct.value, ce), ct !== null && (e && ct.alternate !== null && Ne.delete(ct.key === null ? Ie : ct.key), G = d(ct, G, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return e && Ne.forEach(function(TE) {
        return n(J, TE);
      }), it && qa(J, Ie), Oe;
    }
    function Nt(J, G, ne, ce) {
      if (typeof ne == "object" && ne !== null && ne.type === N && ne.key === null && (ne = ne.props.children), typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case b:
            e: {
              for (var Oe = ne.key; G !== null; ) {
                if (G.key === Oe) {
                  if (Oe = ne.type, Oe === N) {
                    if (G.tag === 7) {
                      i(
                        J,
                        G.sibling
                      ), ce = f(
                        G,
                        ne.props.children
                      ), ce.return = J, J = ce;
                      break e;
                    }
                  } else if (G.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && nr(Oe) === G.type) {
                    i(
                      J,
                      G.sibling
                    ), ce = f(G, ne.props), ql(ce, ne), ce.return = J, J = ce;
                    break e;
                  }
                  i(J, G);
                  break;
                } else n(J, G);
                G = G.sibling;
              }
              ne.type === N ? (ce = Ki(
                ne.props.children,
                J.mode,
                ce,
                ne.key
              ), ce.return = J, J = ce) : (ce = us(
                ne.type,
                ne.key,
                ne.props,
                null,
                J.mode,
                ce
              ), ql(ce, ne), ce.return = J, J = ce);
            }
            return x(J);
          case w:
            e: {
              for (Oe = ne.key; G !== null; ) {
                if (G.key === Oe)
                  if (G.tag === 4 && G.stateNode.containerInfo === ne.containerInfo && G.stateNode.implementation === ne.implementation) {
                    i(
                      J,
                      G.sibling
                    ), ce = f(G, ne.children || []), ce.return = J, J = ce;
                    break e;
                  } else {
                    i(J, G);
                    break;
                  }
                else n(J, G);
                G = G.sibling;
              }
              ce = Bc(ne, J.mode, ce), ce.return = J, J = ce;
            }
            return x(J);
          case A:
            return ne = nr(ne), Nt(
              J,
              G,
              ne,
              ce
            );
        }
        if (X(ne))
          return _e(
            J,
            G,
            ne,
            ce
          );
        if (K(ne)) {
          if (Oe = K(ne), typeof Oe != "function") throw Error(l(150));
          return ne = Oe.call(ne), Le(
            J,
            G,
            ne,
            ce
          );
        }
        if (typeof ne.then == "function")
          return Nt(
            J,
            G,
            gs(ne),
            ce
          );
        if (ne.$$typeof === E)
          return Nt(
            J,
            G,
            ds(J, ne),
            ce
          );
        ys(J, ne);
      }
      return typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint" ? (ne = "" + ne, G !== null && G.tag === 6 ? (i(J, G.sibling), ce = f(G, ne), ce.return = J, J = ce) : (i(J, G), ce = Hc(ne, J.mode, ce), ce.return = J, J = ce), x(J)) : i(J, G);
    }
    return function(J, G, ne, ce) {
      try {
        Vl = 0;
        var Oe = Nt(
          J,
          G,
          ne,
          ce
        );
        return Yr = null, Oe;
      } catch (Ne) {
        if (Ne === qr || Ne === ms) throw Ne;
        var ut = jn(29, Ne, null, J.mode);
        return ut.lanes = ce, ut.return = J, ut;
      } finally {
      }
    };
  }
  var ir = pp(!0), gp = pp(!1), wi = !1;
  function Qc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Pc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Si(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ei(e, n, i) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = ss(e), Wm(e, null, i), n;
    }
    return os(e, o, n, i), ss(e);
  }
  function Yl(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= e.pendingLanes, i |= o, n.lanes = i, Wt(e, i);
    }
  }
  function Kc(e, n) {
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
  function Il(e, n, i, o) {
    Jc = !1;
    var f = e.updateQueue;
    wi = !1;
    var d = f.firstBaseUpdate, x = f.lastBaseUpdate, T = f.shared.pending;
    if (T !== null) {
      f.shared.pending = null;
      var Y = T, ae = Y.next;
      Y.next = null, x === null ? d = ae : x.next = ae, x = Y;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, T = ue.lastBaseUpdate, T !== x && (T === null ? ue.firstBaseUpdate = ae : T.next = ae, ue.lastBaseUpdate = Y));
    }
    if (d !== null) {
      var fe = f.baseState;
      x = 0, ue = ae = Y = null, T = d;
      do {
        var ie = T.lane & -536870913, oe = ie !== T.lane;
        if (oe ? (et & ie) === ie : (o & ie) === ie) {
          ie !== 0 && ie === kr && (Jc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = e, Le = T;
            ie = n;
            var Nt = i;
            switch (Le.tag) {
              case 1:
                if (_e = Le.payload, typeof _e == "function") {
                  fe = _e.call(Nt, fe, ie);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = Le.payload, ie = typeof _e == "function" ? _e.call(Nt, fe, ie) : _e, ie == null) break e;
                fe = p({}, fe, ie);
                break e;
              case 2:
                wi = !0;
            }
          }
          ie = T.callback, ie !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [ie] : oe.push(ie));
        } else
          oe = {
            lane: ie,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          }, ue === null ? (ae = ue = oe, Y = fe) : ue = ue.next = oe, x |= ie;
        if (T = T.next, T === null) {
          if (T = f.shared.pending, T === null)
            break;
          oe = T, T = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (Y = fe), f.baseState = Y, f.firstBaseUpdate = ae, f.lastBaseUpdate = ue, d === null && (f.shared.lanes = 0), Ti |= x, e.lanes = x, e.memoizedState = fe;
    }
  }
  function yp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function vp(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        yp(i[e], n);
  }
  var $r = D(null), vs = D(0);
  function bp(e, n) {
    e = Ja, Q(vs, e), Q($r, n), Ja = e | n.baseLanes;
  }
  function Wc() {
    Q(vs, Ja), Q($r, $r.current);
  }
  function ef() {
    Ja = vs.current, q($r), q(vs);
  }
  var Ln = D(null), Kn = null;
  function _i(e) {
    var n = e.alternate;
    Q(qt, qt.current & 1), Q(Ln, e), Kn === null && (n === null || $r.current !== null || n.memoizedState !== null) && (Kn = e);
  }
  function tf(e) {
    Q(qt, qt.current), Q(Ln, e), Kn === null && (Kn = e);
  }
  function xp(e) {
    e.tag === 22 ? (Q(qt, qt.current), Q(Ln, e), Kn === null && (Kn = e)) : Ni();
  }
  function Ni() {
    Q(qt, qt.current), Q(Ln, Ln.current);
  }
  function Hn(e) {
    q(Ln), Kn === e && (Kn = null), q(qt);
  }
  var qt = D(0);
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
  var Ia = 0, qe = null, Et = null, Gt = null, xs = !1, Ir = !1, rr = !1, ws = 0, Xl = 0, Xr = null, vS = 0;
  function Bt() {
    throw Error(l(321));
  }
  function nf(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!On(e[i], n[i])) return !1;
    return !0;
  }
  function af(e, n, i, o, f, d) {
    return Ia = d, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, C.H = e === null || e.memoizedState === null ? ag : bf, rr = !1, d = i(o, f), rr = !1, Ir && (d = Sp(
      n,
      i,
      o,
      f
    )), wp(e), d;
  }
  function wp(e) {
    C.H = Fl;
    var n = Et !== null && Et.next !== null;
    if (Ia = 0, Gt = Et = qe = null, xs = !1, Xl = 0, Xr = null, n) throw Error(l(300));
    e === null || Zt || (e = e.dependencies, e !== null && fs(e) && (Zt = !0));
  }
  function Sp(e, n, i, o) {
    qe = e;
    var f = 0;
    do {
      if (Ir && (Xr = null), Xl = 0, Ir = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Gt = Et = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      C.H = ig, d = n(i, o);
    } while (Ir);
    return d;
  }
  function bS() {
    var e = C.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Gl(n) : n, e = e.useState()[0], (Et !== null ? Et.memoizedState : null) !== e && (qe.flags |= 1024), n;
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
    Ia = 0, Gt = Et = qe = null, Ir = !1, Xl = ws = 0, Xr = null;
  }
  function gn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Gt === null ? qe.memoizedState = Gt = e : Gt = Gt.next = e, Gt;
  }
  function Yt() {
    if (Et === null) {
      var e = qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Et.next;
    var n = Gt === null ? qe.memoizedState : Gt.next;
    if (n !== null)
      Gt = n, Et = e;
    else {
      if (e === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      Et = e, e = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Gt === null ? qe.memoizedState = Gt = e : Gt = Gt.next = e;
    }
    return Gt;
  }
  function Ss() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Gl(e) {
    var n = Xl;
    return Xl += 1, Xr === null && (Xr = []), e = dp(Xr, e, n), n = qe, (Gt === null ? n.memoizedState : Gt.next) === null && (n = n.alternate, C.H = n === null || n.memoizedState === null ? ag : bf), e;
  }
  function Es(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Gl(e);
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
      var T = x = null, Y = null, ae = n, ue = !1;
      do {
        var fe = ae.lane & -536870913;
        if (fe !== ae.lane ? (et & fe) === fe : (Ia & fe) === fe) {
          var ie = ae.revertLane;
          if (ie === 0)
            Y !== null && (Y = Y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }), fe === kr && (ue = !0);
          else if ((Ia & ie) === ie) {
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
            }, Y === null ? (T = Y = fe, x = d) : Y = Y.next = fe, qe.lanes |= ie, Ti |= ie;
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
          }, Y === null ? (T = Y = ie, x = d) : Y = Y.next = ie, qe.lanes |= fe, Ti |= fe;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if (Y === null ? x = d : Y.next = T, !On(d, e.memoizedState) && (Zt = !0, ue && (i = Vr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = x, e.baseQueue = Y, o.lastRenderedState = d;
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
      On(d, n.memoizedState) || (Zt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function Ep(e, n, i) {
    var o = qe, f = Yt(), d = it;
    if (d) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var x = !On(
      (Et || f).memoizedState,
      i
    );
    if (x && (f.memoizedState = i, Zt = !0), f = f.queue, hf(Cp.bind(null, o, f, e), [
      e
    ]), f.getSnapshot !== n || x || Gt !== null && Gt.memoizedState.tag & 1) {
      if (o.flags |= 2048, Gr(
        9,
        { destroy: void 0 },
        Np.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      d || (Ia & 127) !== 0 || _p(o, n, i);
    }
    return i;
  }
  function _p(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = Ss(), qe.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function Np(e, n, i, o) {
    n.value = i, n.getSnapshot = o, Rp(n) && Tp(e);
  }
  function Cp(e, n, i) {
    return i(function() {
      Rp(n) && Tp(e);
    });
  }
  function Rp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !On(e, i);
    } catch {
      return !0;
    }
  }
  function Tp(e) {
    var n = Pi(e, 2);
    n !== null && Cn(n, e, 2);
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
  function Mp(e, n, i, o) {
    return e.baseState = i, uf(
      e,
      Et,
      typeof o == "function" ? o : Xa
    );
  }
  function xS(e, n, i, o, f) {
    if (Rs(e)) throw Error(l(485));
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
      C.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, Dp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function Dp(e, n) {
    var i = n.action, o = n.payload, f = e.state;
    if (n.isTransition) {
      var d = C.T, x = {};
      C.T = x;
      try {
        var T = i(f, o), Y = C.S;
        Y !== null && Y(x, T), Ap(e, n, T);
      } catch (ae) {
        df(e, n, ae);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), C.T = d;
      }
    } else
      try {
        d = i(f, o), Ap(e, n, d);
      } catch (ae) {
        df(e, n, ae);
      }
  }
  function Ap(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        zp(e, n, o);
      },
      function(o) {
        return df(e, n, o);
      }
    ) : zp(e, n, i);
  }
  function zp(e, n, i) {
    n.status = "fulfilled", n.value = i, Op(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, Dp(e, i)));
  }
  function df(e, n, i) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Op(n), n = n.next;
      while (n !== o);
    }
    e.action = null;
  }
  function Op(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function jp(e, n) {
    return n;
  }
  function Lp(e, n) {
    if (it) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, d = Pn; f.nodeType !== 8; ) {
                  if (!d) {
                    f = null;
                    break t;
                  }
                  if (f = Jn(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                d = f.data, f = d === "F!" || d === "F" ? f : null;
              }
              if (f) {
                Tt = Jn(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            bi(o);
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
      lastRenderedReducer: jp,
      lastRenderedState: n
    }, i.queue = o, i = eg.bind(
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
    }, o.queue = f, i = xS.bind(
      null,
      qe,
      f,
      d,
      i
    ), f.dispatch = i, o.memoizedState = e, [n, i, !1];
  }
  function Hp(e) {
    var n = Yt();
    return Bp(n, Et, e);
  }
  function Bp(e, n, i) {
    if (n = uf(
      e,
      n,
      jp
    )[0], e = _s(Xa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Gl(n);
      } catch (x) {
        throw x === qr ? ms : x;
      }
    else o = n;
    n = Yt();
    var f = n.queue, d = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, Gr(
      9,
      { destroy: void 0 },
      wS.bind(null, f, i),
      null
    )), [o, d, e];
  }
  function wS(e, n) {
    e.action = n;
  }
  function Up(e) {
    var n = Yt(), i = Et;
    if (i !== null)
      return Bp(n, i, e);
    Yt(), n = n.memoizedState, i = Yt();
    var o = i.queue.dispatch;
    return i.memoizedState = e, [n, o, !1];
  }
  function Gr(e, n, i, o) {
    return e = { tag: e, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = Ss(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (o = i.next, i.next = e, e.next = o, n.lastEffect = e), e;
  }
  function kp() {
    return Yt().memoizedState;
  }
  function Ns(e, n, i, o) {
    var f = gn();
    qe.flags |= e, f.memoizedState = Gr(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Cs(e, n, i, o) {
    var f = Yt();
    o = o === void 0 ? null : o;
    var d = f.memoizedState.inst;
    Et !== null && o !== null && nf(o, Et.memoizedState.deps) ? f.memoizedState = Gr(n, d, i, o) : (qe.flags |= e, f.memoizedState = Gr(
      1 | n,
      d,
      i,
      o
    ));
  }
  function Vp(e, n) {
    Ns(8390656, 8, e, n);
  }
  function hf(e, n) {
    Cs(2048, 8, e, n);
  }
  function SS(e) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = Ss(), qe.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function qp(e) {
    var n = Yt().memoizedState;
    return SS({ ref: n, nextImpl: e }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Yp(e, n) {
    return Cs(4, 2, e, n);
  }
  function $p(e, n) {
    return Cs(4, 4, e, n);
  }
  function Ip(e, n) {
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
  function Xp(e, n, i) {
    i = i != null ? i.concat([e]) : null, Cs(4, 4, Ip.bind(null, n, e), i);
  }
  function mf() {
  }
  function Gp(e, n) {
    var i = Yt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && nf(n, o[1]) ? o[0] : (i.memoizedState = [e, n], e);
  }
  function Zp(e, n) {
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
    return i === void 0 || (Ia & 1073741824) !== 0 && (et & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = Fg(), qe.lanes |= e, Ti |= e, i);
  }
  function Fp(e, n, i, o) {
    return On(i, n) ? i : $r.current !== null ? (e = pf(e, i, o), On(e, n) || (Zt = !0), e) : (Ia & 42) === 0 || (Ia & 1073741824) !== 0 && (et & 261930) === 0 ? (Zt = !0, e.memoizedState = i) : (e = Fg(), qe.lanes |= e, Ti |= e, n);
  }
  function Qp(e, n, i, o, f) {
    var d = L.p;
    L.p = d !== 0 && 8 > d ? d : 8;
    var x = C.T, T = {};
    C.T = T, vf(e, !1, n, i);
    try {
      var Y = f(), ae = C.S;
      if (ae !== null && ae(T, Y), Y !== null && typeof Y == "object" && typeof Y.then == "function") {
        var ue = yS(
          Y,
          o
        );
        Zl(
          e,
          n,
          ue,
          kn(e)
        );
      } else
        Zl(
          e,
          n,
          o,
          kn(e)
        );
    } catch (fe) {
      Zl(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        kn()
      );
    } finally {
      L.p = d, x !== null && T.types !== null && (x.types = T.types), C.T = x;
    }
  }
  function ES() {
  }
  function gf(e, n, i, o) {
    if (e.tag !== 5) throw Error(l(476));
    var f = Pp(e).queue;
    Qp(
      e,
      f,
      n,
      Z,
      i === null ? ES : function() {
        return Kp(e), i(o);
      }
    );
  }
  function Pp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xa,
        lastRenderedState: Z
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
  function Kp(e) {
    var n = Pp(e);
    n.next === null && (n = e.alternate.memoizedState), Zl(
      e,
      n.next.queue,
      {},
      kn()
    );
  }
  function yf() {
    return ln(co);
  }
  function Jp() {
    return Yt().memoizedState;
  }
  function Wp() {
    return Yt().memoizedState;
  }
  function _S(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = kn();
          e = Si(i);
          var o = Ei(n, e, i);
          o !== null && (Cn(o, n, i), Yl(o, n, i)), n = { cache: Xc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function NS(e, n, i) {
    var o = kn();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Rs(e) ? tg(n, i) : (i = jc(e, n, i, o), i !== null && (Cn(i, e, o), ng(i, n, o)));
  }
  function eg(e, n, i) {
    var o = kn();
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
    if (Rs(e)) tg(n, f);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, T = d(x, i);
          if (f.hasEagerState = !0, f.eagerState = T, On(T, x))
            return os(e, n, f, 0), Rt === null && ls(), !1;
        } catch {
        } finally {
        }
      if (i = jc(e, n, f, o), i !== null)
        return Cn(i, e, o), ng(i, n, o), !0;
    }
    return !1;
  }
  function vf(e, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Pf(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Rs(e)) {
      if (n) throw Error(l(479));
    } else
      n = jc(
        e,
        i,
        o,
        2
      ), n !== null && Cn(n, e, 2);
  }
  function Rs(e) {
    var n = e.alternate;
    return e === qe || n !== null && n === qe;
  }
  function tg(e, n) {
    Ir = xs = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function ng(e, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= e.pendingLanes, i |= o, n.lanes = i, Wt(e, i);
    }
  }
  var Fl = {
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
  Fl.useEffectEvent = Bt;
  var ag = {
    readContext: ln,
    use: Es,
    useCallback: function(e, n) {
      return gn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: ln,
    useEffect: Vp,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Ns(
        4194308,
        4,
        Ip.bind(null, n, e),
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
      }, o.queue = e, e = e.dispatch = NS.bind(
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
      var n = e.queue, i = eg.bind(null, qe, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: mf,
    useDeferredValue: function(e, n) {
      var i = gn();
      return pf(i, e, n);
    },
    useTransition: function() {
      var e = ff(!1);
      return e = Qp.bind(
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
        if (i = n(), Rt === null)
          throw Error(l(349));
        (et & 127) !== 0 || _p(o, n, i);
      }
      f.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return f.queue = d, Vp(Cp.bind(null, o, d, e), [
        e
      ]), o.flags |= 2048, Gr(
        9,
        { destroy: void 0 },
        Np.bind(
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
      var e = gn(), n = Rt.identifierPrefix;
      if (it) {
        var i = Na, o = _a;
        i = (o & ~(1 << 32 - kt(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = ws++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = vS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: yf,
    useFormState: Lp,
    useActionState: Lp,
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
      return gn().memoizedState = _S.bind(
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
    useCallback: Gp,
    useContext: ln,
    useEffect: hf,
    useImperativeHandle: Xp,
    useInsertionEffect: Yp,
    useLayoutEffect: $p,
    useMemo: Zp,
    useReducer: _s,
    useRef: kp,
    useState: function() {
      return _s(Xa);
    },
    useDebugValue: mf,
    useDeferredValue: function(e, n) {
      var i = Yt();
      return Fp(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = _s(Xa)[0], n = Yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Gl(e),
        n
      ];
    },
    useSyncExternalStore: Ep,
    useId: Jp,
    useHostTransitionStatus: yf,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e, n) {
      var i = Yt();
      return Mp(i, Et, e, n);
    },
    useMemoCache: sf,
    useCacheRefresh: Wp
  };
  bf.useEffectEvent = qp;
  var ig = {
    readContext: ln,
    use: Es,
    useCallback: Gp,
    useContext: ln,
    useEffect: hf,
    useImperativeHandle: Xp,
    useInsertionEffect: Yp,
    useLayoutEffect: $p,
    useMemo: Zp,
    useReducer: cf,
    useRef: kp,
    useState: function() {
      return cf(Xa);
    },
    useDebugValue: mf,
    useDeferredValue: function(e, n) {
      var i = Yt();
      return Et === null ? pf(i, e, n) : Fp(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = cf(Xa)[0], n = Yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Gl(e),
        n
      ];
    },
    useSyncExternalStore: Ep,
    useId: Jp,
    useHostTransitionStatus: yf,
    useFormState: Up,
    useActionState: Up,
    useOptimistic: function(e, n) {
      var i = Yt();
      return Et !== null ? Mp(i, Et, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: sf,
    useCacheRefresh: Wp
  };
  ig.useEffectEvent = qp;
  function xf(e, n, i, o) {
    n = e.memoizedState, i = i(o, n), i = i == null ? n : p({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var wf = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var o = kn(), f = Si(o);
      f.payload = n, i != null && (f.callback = i), n = Ei(e, f, o), n !== null && (Cn(n, e, o), Yl(n, e, o));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var o = kn(), f = Si(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Ei(e, f, o), n !== null && (Cn(n, e, o), Yl(n, e, o));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = kn(), o = Si(i);
      o.tag = 2, n != null && (o.callback = n), n = Ei(e, o, i), n !== null && (Cn(n, e, i), Yl(n, e, i));
    }
  };
  function rg(e, n, i, o, f, d, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !jl(i, o) || !jl(f, d) : !0;
  }
  function lg(e, n, i, o) {
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
  function og(e) {
    rs(e);
  }
  function sg(e) {
    console.error(e);
  }
  function ug(e) {
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
  function cg(e, n, i) {
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
    return i = Si(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ts(e, n);
    }, i;
  }
  function fg(e) {
    return e = Si(e), e.tag = 3, e;
  }
  function dg(e, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var d = o.value;
      e.payload = function() {
        return f(d);
      }, e.callback = function() {
        cg(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      cg(n, i, o), typeof f != "function" && (Mi === null ? Mi = /* @__PURE__ */ new Set([this]) : Mi.add(this));
      var T = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: T !== null ? T : ""
      });
    });
  }
  function CS(e, n, i, o, f) {
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
      return n = Ln.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== Vc && (e = Error(l(422), { cause: o }), Bl(Zn(e, i)))) : (o !== Vc && (n = Error(l(423), {
        cause: o
      }), Bl(
        Zn(n, i)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, o = Zn(o, i), f = Sf(
        e.stateNode,
        o,
        f
      ), Kc(e, f), Ut !== 4 && (Ut = 2)), !1;
    var d = Error(l(520), { cause: o });
    if (d = Zn(d, i), no === null ? no = [d] : no.push(d), Ut !== 4 && (Ut = 2), n === null) return !0;
    o = Zn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = f & -f, i.lanes |= e, e = Sf(i.stateNode, o, e), Kc(i, e), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Mi === null || !Mi.has(d))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = fg(f), dg(
              f,
              e,
              i,
              o
            ), Kc(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Ef = Error(l(461)), Zt = !1;
  function on(e, n, i, o) {
    n.child = e === null ? gp(n, null, i, o) : ir(
      n,
      e.child,
      i,
      o
    );
  }
  function hg(e, n, i, o, f) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var T in o)
        T !== "ref" && (x[T] = o[T]);
    } else x = o;
    return er(n), o = af(
      e,
      n,
      i,
      x,
      d,
      f
    ), T = rf(), e !== null && !Zt ? (lf(e, n, f), Ga(e, n, f)) : (it && T && Uc(n), n.flags |= 1, on(e, n, o, f), n.child);
  }
  function mg(e, n, i, o, f) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !Lc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, pg(
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
      if (i = i.compare, i = i !== null ? i : jl, i(x, o) && e.ref === n.ref)
        return Ga(e, n, f);
    }
    return n.flags |= 1, e = Va(d, o), e.ref = n.ref, e.return = n, n.child = e;
  }
  function pg(e, n, i, o, f) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (jl(d, o) && e.ref === n.ref)
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
  function gg(e, n, i, o) {
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
        return yg(
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
        ), d !== null ? bp(n, d) : Wc(), xp(n);
      else
        return o = n.lanes = 536870912, yg(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (hs(n, d.cachePool), bp(n, d), Ni(), n.memoizedState = null) : (e !== null && hs(n, null), Wc(), Ni());
    return on(e, n, f, i), n.child;
  }
  function Ql(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function yg(e, n, i, o, f) {
    var d = Zc();
    return d = d === null ? null : { parent: Xt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && hs(n, null), Wc(), xp(n), e !== null && Ur(e, n, o, !0), n.childLanes = f, null;
  }
  function Ms(e, n) {
    return n = As(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function vg(e, n, i) {
    return ir(n, e.child, null, i), e = Ms(n, n.pendingProps), e.flags |= 2, Hn(n), n.memoizedState = null, e;
  }
  function RS(e, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (it) {
        if (o.mode === "hidden")
          return e = Ms(n, o), n.lanes = 536870912, Ql(null, e);
        if (tf(n), (e = Tt) ? (e = D0(
          e,
          Pn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: yi !== null ? { id: _a, overflow: Na } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = tp(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw bi(n);
        return n.lanes = 536870912, null;
      }
      return Ms(n, o);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (tf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = vg(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Zt || Ur(e, n, i, !1), f = (i & e.childLanes) !== 0, Zt || f) {
        if (o = Rt, o !== null && (x = k(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, Pi(e, x), Cn(o, e, x), Ef;
        Vs(), n = vg(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, Tt = Jn(x.nextSibling), rn = n, it = !0, vi = null, Pn = !1, e !== null && ip(n, e), n = Ms(n, o), n.flags |= 4096;
      return n;
    }
    return e = Va(e.child, {
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
  function bg(e, n, i, o, f, d) {
    return er(n), n.updateQueue = null, i = Sp(
      n,
      o,
      i,
      f
    ), wp(e), o = rf(), e !== null && !Zt ? (lf(e, n, d), Ga(e, n, d)) : (it && o && Uc(n), n.flags |= 1, on(e, n, i, d), n.child);
  }
  function xg(e, n, i, o, f) {
    if (er(n), n.stateNode === null) {
      var d = jr, x = i.contextType;
      typeof x == "object" && x !== null && (d = ln(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = wf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, Qc(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? ln(x) : jr, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (xf(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && wf.enqueueReplaceState(d, d.state, null), Il(n, o, d, f), $l(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (e === null) {
      d = n.stateNode;
      var T = n.memoizedProps, Y = lr(i, T);
      d.props = Y;
      var ae = d.context, ue = i.contextType;
      x = jr, typeof ue == "object" && ue !== null && (x = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", T = n.pendingProps !== T, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (T || ae !== x) && lg(
        n,
        d,
        o,
        x
      ), wi = !1;
      var ie = n.memoizedState;
      d.state = ie, Il(n, o, d, f), $l(), ae = n.memoizedState, T || ie !== ae || wi ? (typeof fe == "function" && (xf(
        n,
        i,
        fe,
        o
      ), ae = n.memoizedState), (Y = wi || rg(
        n,
        i,
        Y,
        o,
        ie,
        ae,
        x
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ae), d.props = o, d.state = ae, d.context = x, o = Y) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Pc(e, n), x = n.memoizedProps, ue = lr(i, x), d.props = ue, fe = n.pendingProps, ie = d.context, ae = i.contextType, Y = jr, typeof ae == "object" && ae !== null && (Y = ln(ae)), T = i.getDerivedStateFromProps, (ae = typeof T == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== fe || ie !== Y) && lg(
        n,
        d,
        o,
        Y
      ), wi = !1, ie = n.memoizedState, d.state = ie, Il(n, o, d, f), $l();
      var oe = n.memoizedState;
      x !== fe || ie !== oe || wi || e !== null && e.dependencies !== null && fs(e.dependencies) ? (typeof T == "function" && (xf(
        n,
        i,
        T,
        o
      ), oe = n.memoizedState), (ue = wi || rg(
        n,
        i,
        ue,
        o,
        ie,
        oe,
        Y
      ) || e !== null && e.dependencies !== null && fs(e.dependencies)) ? (ae || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, oe, Y), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        oe,
        Y
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), d.props = o, d.state = oe, d.context = Y, o = ue) : (typeof d.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), o = !1);
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
  function wg(e, n, i, o) {
    return Ji(), n.flags |= 256, on(e, n, i, o), n.child;
  }
  var Nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Cf(e) {
    return { baseLanes: e, cachePool: cp() };
  }
  function Rf(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= Un), e;
  }
  function Sg(e, n, i) {
    var o = n.pendingProps, f = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = e !== null && e.memoizedState === null ? !1 : (qt.current & 2) !== 0), x && (f = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (it) {
        if (f ? _i(n) : Ni(), (e = Tt) ? (e = D0(
          e,
          Pn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: yi !== null ? { id: _a, overflow: Na } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = tp(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw bi(n);
        return ud(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var T = o.children;
      return o = o.fallback, f ? (Ni(), f = n.mode, T = As(
        { mode: "hidden", children: T },
        f
      ), o = Ki(
        o,
        f,
        i,
        null
      ), T.return = n, o.return = n, T.sibling = o, n.child = T, o = n.child, o.memoizedState = Cf(i), o.childLanes = Rf(
        e,
        x,
        i
      ), n.memoizedState = Nf, Ql(null, o)) : (_i(n), Tf(n, T));
    }
    var Y = e.memoizedState;
    if (Y !== null && (T = Y.dehydrated, T !== null)) {
      if (d)
        n.flags & 256 ? (_i(n), n.flags &= -257, n = Mf(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (Ni(), n.child = e.child, n.flags |= 128, n = null) : (Ni(), T = o.fallback, f = n.mode, o = As(
          { mode: "visible", children: o.children },
          f
        ), T = Ki(
          T,
          f,
          i,
          null
        ), T.flags |= 2, o.return = n, T.return = n, o.sibling = T, n.child = o, ir(
          n,
          e.child,
          null,
          i
        ), o = n.child, o.memoizedState = Cf(i), o.childLanes = Rf(
          e,
          x,
          i
        ), n.memoizedState = Nf, n = Ql(null, o));
      else if (_i(n), ud(T)) {
        if (x = T.nextSibling && T.nextSibling.dataset, x) var ae = x.dgst;
        x = ae, o = Error(l(419)), o.stack = "", o.digest = x, Bl({ value: o, source: null, stack: null }), n = Mf(
          e,
          n,
          i
        );
      } else if (Zt || Ur(e, n, i, !1), x = (i & e.childLanes) !== 0, Zt || x) {
        if (x = Rt, x !== null && (o = k(x, i), o !== 0 && o !== Y.retryLane))
          throw Y.retryLane = o, Pi(e, o), Cn(x, e, o), Ef;
        sd(T) || Vs(), n = Mf(
          e,
          n,
          i
        );
      } else
        sd(T) ? (n.flags |= 192, n.child = e.child, n = null) : (e = Y.treeContext, Tt = Jn(
          T.nextSibling
        ), rn = n, it = !0, vi = null, Pn = !1, e !== null && ip(n, e), n = Tf(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Ni(), T = o.fallback, f = n.mode, Y = e.child, ae = Y.sibling, o = Va(Y, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = Y.subtreeFlags & 65011712, ae !== null ? T = Va(
      ae,
      T
    ) : (T = Ki(
      T,
      f,
      i,
      null
    ), T.flags |= 2), T.return = n, o.return = n, o.sibling = T, n.child = o, Ql(null, o), o = n.child, T = e.child.memoizedState, T === null ? T = Cf(i) : (f = T.cachePool, f !== null ? (Y = Xt._currentValue, f = f.parent !== Y ? { parent: Y, pool: Y } : f) : f = cp(), T = {
      baseLanes: T.baseLanes | i,
      cachePool: f
    }), o.memoizedState = T, o.childLanes = Rf(
      e,
      x,
      i
    ), n.memoizedState = Nf, Ql(e.child, o)) : (_i(n), i = e.child, e = i.sibling, i = Va(i, {
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
    return e = jn(22, e, null, n), e.lanes = 0, e;
  }
  function Mf(e, n, i) {
    return ir(n, e.child, null, i), e = Tf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Eg(e, n, i) {
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
  function _g(e, n, i) {
    var o = n.pendingProps, f = o.revealOrder, d = o.tail;
    o = o.children;
    var x = qt.current, T = (x & 2) !== 0;
    if (T ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, Q(qt, x), on(e, n, o, i), o = it ? Hl : 0, !T && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Eg(e, i, n);
        else if (e.tag === 19)
          Eg(e, i, n);
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
    if (e !== null && (n.dependencies = e.dependencies), Ti |= n.lanes, (i & n.childLanes) === 0)
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
      for (e = n.child, i = Va(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        e = e.sibling, i = i.sibling = Va(e, e.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Af(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fs(e)));
  }
  function TS(e, n, i) {
    switch (n.tag) {
      case 3:
        ee(n, n.stateNode.containerInfo), xi(n, Xt, e.memoizedState.cache), Ji();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        ee(n, n.stateNode.containerInfo);
        break;
      case 10:
        xi(
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
          return o.dehydrated !== null ? (_i(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Sg(e, n, i) : (_i(n), e = Ga(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        _i(n);
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
            return _g(
              e,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Q(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, gg(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        xi(n, Xt, e.memoizedState.cache);
    }
    return Ga(e, n, i);
  }
  function Ng(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Zt = !0;
      else {
        if (!Af(e, i) && (n.flags & 128) === 0)
          return Zt = !1, TS(
            e,
            n,
            i
          );
        Zt = (e.flags & 131072) !== 0;
      }
    else
      Zt = !1, it && (n.flags & 1048576) !== 0 && ap(n, Hl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (e = nr(n.elementType), n.type = e, typeof e == "function")
            Lc(e) ? (o = lr(e, o), n.tag = 1, n = xg(
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
              if (f === O) {
                n.tag = 11, n = hg(
                  null,
                  n,
                  e,
                  o,
                  i
                );
                break e;
              } else if (f === B) {
                n.tag = 14, n = mg(
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
        ), xg(
          e,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (ee(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          f = d.element, Pc(e, n), Il(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, xi(n, Xt, o), o !== d.cache && Ic(
            n,
            [Xt],
            i,
            !0
          ), $l(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = wg(
                e,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = Zn(
                Error(l(424)),
                n
              ), Bl(f), n = wg(
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
              for (Tt = Jn(e.firstChild), rn = n, it = !0, vi = null, Pn = !0, i = gp(
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
        return Ds(e, n), e === null ? (i = H0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, e = n.pendingProps, o = Zs(
          he.current
        ).createElement(i), o[ve] = n, o[we] = e, sn(o, i, e), at(o), n.stateNode = o) : n.memoizedState = H0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && it && (o = n.stateNode = O0(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Pn = !0, f = Tt, Oi(n.type) ? (cd = f, Tt = Jn(o.firstChild)) : Tt = f), on(
          e,
          n,
          n.pendingProps.children,
          i
        ), Ds(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && it && ((f = o = Tt) && (o = iE(
          o,
          n.type,
          n.pendingProps,
          Pn
        ), o !== null ? (n.stateNode = o, rn = n, Tt = Jn(o.firstChild), Pn = !1, f = !0) : f = !1), f || bi(n)), ze(n), f = n.type, d = n.pendingProps, x = e !== null ? e.memoizedProps : null, o = d.children, rd(f, d) ? o = null : x !== null && rd(f, x) && (n.flags |= 32), n.memoizedState !== null && (f = af(
          e,
          n,
          bS,
          null,
          null,
          i
        ), co._currentValue = f), Ds(e, n), on(e, n, o, i), n.child;
      case 6:
        return e === null && it && ((e = i = Tt) && (i = rE(
          i,
          n.pendingProps,
          Pn
        ), i !== null ? (n.stateNode = i, rn = n, Tt = null, e = !0) : e = !1), e || bi(n)), null;
      case 13:
        return Sg(e, n, i);
      case 4:
        return ee(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, e === null ? n.child = ir(
          n,
          null,
          o,
          i
        ) : on(e, n, o, i), n.child;
      case 11:
        return hg(
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
        return o = n.pendingProps, xi(n, n.type, o.value), on(e, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, er(n), f = ln(f), o = o(f), n.flags |= 1, on(e, n, o, i), n.child;
      case 14:
        return mg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return pg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return _g(e, n, i);
      case 31:
        return RS(e, n, i);
      case 22:
        return gg(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return er(n), o = ln(Xt), e === null ? (f = Zc(), f === null && (f = Rt, d = Xc(), f.pooledCache = d, d.refCount++, d !== null && (f.pooledCacheLanes |= i), f = d), n.memoizedState = { parent: o, cache: f }, Qc(n), xi(n, Xt, f)) : ((e.lanes & i) !== 0 && (Pc(e, n), Il(n, null, null, i), $l()), f = e.memoizedState, d = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), xi(n, Xt, o)) : (o = d.cache, xi(n, Xt, o), o !== f.cache && Ic(
          n,
          [Xt],
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
  function Za(e) {
    e.flags |= 4;
  }
  function zf(e, n, i, o, f) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Jg()) e.flags |= 8192;
        else
          throw ar = ps, Fc;
    } else e.flags &= -16777217;
  }
  function Cg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !q0(n))
      if (Jg()) e.flags |= 8192;
      else
        throw ar = ps, Fc;
  }
  function zs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Vt() : 536870912, e.lanes |= n, Pr |= n);
  }
  function Pl(e, n) {
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
  function MS(e, n, i) {
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
        return i = n.stateNode, o = null, e !== null && (o = e.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), $a(Xt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Br(n) ? Za(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, qc())), Mt(n), null;
      case 26:
        var f = n.type, d = n.memoizedState;
        return e === null ? (Za(n), d !== null ? (Mt(n), Cg(n, d)) : (Mt(n), zf(
          n,
          f,
          null,
          o,
          i
        ))) : d ? d !== e.memoizedState ? (Za(n), Mt(n), Cg(n, d)) : (Mt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== o && Za(n), Mt(n), zf(
          n,
          f,
          e,
          o,
          i
        )), null;
      case 27:
        if (Re(n), i = he.current, f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Za(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          e = te.current, Br(n) ? rp(n) : (e = O0(f, o, i), n.stateNode = e, Za(n));
        }
        return Mt(n), null;
      case 5:
        if (Re(n), f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Za(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (d = te.current, Br(n))
            rp(n);
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
            o && Za(n);
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
          e.memoizedProps !== o && Za(n);
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
            e[ve] = n, e = !!(e.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || S0(e.nodeValue, i)), e || bi(n, !0);
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
            return n.flags & 256 ? (Hn(n), n) : (Hn(n), null);
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
            return n.flags & 256 ? (Hn(n), n) : (Hn(n), null);
        }
        return Hn(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, e = e !== null && e.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== f && (o.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), zs(n, n.updateQueue), Mt(n), null);
      case 4:
        return ge(), e === null && ed(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return $a(n.type), Mt(n), null;
      case 19:
        if (q(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (f) Pl(o, !1);
          else {
            if (Ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = bs(e), d !== null) {
                  for (n.flags |= 128, Pl(o, !1), e = d.updateQueue, n.updateQueue = e, zs(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    ep(i, e), i = i.sibling;
                  return Q(
                    qt,
                    qt.current & 1 | 2
                  ), it && qa(n, o.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            o.tail !== null && Qe() > Bs && (n.flags |= 128, f = !0, Pl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = bs(d), e !== null) {
              if (n.flags |= 128, f = !0, e = e.updateQueue, n.updateQueue = e, zs(n, e), Pl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !it)
                return Mt(n), null;
            } else
              2 * Qe() - o.renderingStartTime > Bs && i !== 536870912 && (n.flags |= 128, f = !0, Pl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (e = o.last, e !== null ? e.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Qe(), e.sibling = null, i = qt.current, Q(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && qa(n, o.treeForkCount), e) : (Mt(n), null);
      case 22:
      case 23:
        return Hn(n), ef(), o = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && zs(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), e !== null && q(tr), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), $a(Xt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function DS(e, n) {
    switch (kc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return $a(Xt), ge(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Re(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Hn(n), n.alternate === null)
            throw Error(l(340));
          Ji();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Hn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          Ji();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return q(qt), null;
      case 4:
        return ge(), null;
      case 10:
        return $a(n.type), null;
      case 22:
      case 23:
        return Hn(n), ef(), e !== null && q(tr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return $a(Xt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Rg(e, n) {
    switch (kc(n), n.tag) {
      case 3:
        $a(Xt), ge();
        break;
      case 26:
      case 27:
      case 5:
        Re(n);
        break;
      case 4:
        ge();
        break;
      case 31:
        n.memoizedState !== null && Hn(n);
        break;
      case 13:
        Hn(n);
        break;
      case 19:
        q(qt);
        break;
      case 10:
        $a(n.type);
        break;
      case 22:
      case 23:
        Hn(n), ef(), e !== null && q(tr);
        break;
      case 24:
        $a(Xt);
    }
  }
  function Kl(e, n) {
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
    } catch (T) {
      wt(n, n.return, T);
    }
  }
  function Ci(e, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var d = f.next;
        o = d;
        do {
          if ((o.tag & e) === e) {
            var x = o.inst, T = x.destroy;
            if (T !== void 0) {
              x.destroy = void 0, f = n;
              var Y = i, ae = T;
              try {
                ae();
              } catch (ue) {
                wt(
                  f,
                  Y,
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
  function Tg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        vp(n, i);
      } catch (o) {
        wt(e, e.return, o);
      }
    }
  }
  function Mg(e, n, i) {
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
  function Ca(e, n) {
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
  function Dg(e) {
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
      JS(o, e.type, i, n), o[we] = n;
    } catch (f) {
      wt(e, e.return, f);
    }
  }
  function Ag(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Oi(e.type) || e.tag === 4;
  }
  function jf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ag(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Oi(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Lf(e, n, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ua));
    else if (o !== 4 && (o === 27 && Oi(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (Lf(e, n, i), e = e.sibling; e !== null; )
        Lf(e, n, i), e = e.sibling;
  }
  function Os(e, n, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (o !== 4 && (o === 27 && Oi(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Os(e, n, i), e = e.sibling; e !== null; )
        Os(e, n, i), e = e.sibling;
  }
  function zg(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var o = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, o, i), n[ve] = e, n[we] = i;
    } catch (d) {
      wt(e, e.return, d);
    }
  }
  var Fa = !1, Ft = !1, Hf = !1, Og = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function AS(e, n) {
    if (e = e.containerInfo, ad = eu, e = Xm(e), Tc(e)) {
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
            var x = 0, T = -1, Y = -1, ae = 0, ue = 0, fe = e, ie = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (T = x + f), fe !== d || o !== 0 && fe.nodeType !== 3 || (Y = x + o), fe.nodeType === 3 && (x += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                ie = fe, fe = oe;
              for (; ; ) {
                if (fe === e) break t;
                if (ie === i && ++ae === f && (T = x), ie === d && ++ue === o && (Y = x), (oe = fe.nextSibling) !== null) break;
                fe = ie, ie = fe.parentNode;
              }
              fe = oe;
            }
            i = T === -1 || Y === -1 ? null : { start: T, end: Y };
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
  function jg(e, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Pa(e, i), o & 4 && Kl(5, i);
        break;
      case 1:
        if (Pa(e, i), o & 4)
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
        o & 64 && Tg(i), o & 512 && Jl(i, i.return);
        break;
      case 3:
        if (Pa(e, i), o & 64 && (e = i.updateQueue, e !== null)) {
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
            vp(e, n);
          } catch (x) {
            wt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && zg(i);
      case 26:
      case 5:
        Pa(e, i), n === null && o & 4 && Dg(i), o & 512 && Jl(i, i.return);
        break;
      case 12:
        Pa(e, i);
        break;
      case 31:
        Pa(e, i), o & 4 && Bg(e, i);
        break;
      case 13:
        Pa(e, i), o & 4 && Ug(e, i), o & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = VS.bind(
          null,
          i
        ), lE(e, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Fa, !o) {
          n = n !== null && n.memoizedState !== null || Ft, f = Fa;
          var d = Ft;
          Fa = o, (Ft = n) && !d ? Ka(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Pa(e, i), Fa = f, Ft = d;
        }
        break;
      case 30:
        break;
      default:
        Pa(e, i);
    }
  }
  function Lg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Lg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && rt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Dt = null, Sn = !1;
  function Qa(e, n, i) {
    for (i = i.child; i !== null; )
      Hg(e, n, i), i = i.sibling;
  }
  function Hg(e, n, i) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(tn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ft || Ca(i, n), Qa(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ft || Ca(i, n);
        var o = Dt, f = Sn;
        Oi(i.type) && (Dt = i.stateNode, Sn = !1), Qa(
          e,
          n,
          i
        ), oo(i.stateNode), Dt = o, Sn = f;
        break;
      case 5:
        Ft || Ca(i, n);
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
        Dt !== null && (Sn ? (e = Dt, T0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), il(e)) : T0(Dt, i.stateNode));
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
        Ci(2, i, n), Ft || Ci(4, i, n), Qa(
          e,
          n,
          i
        );
        break;
      case 1:
        Ft || (Ca(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && Mg(
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
        Ft = (o = Ft) || i.memoizedState !== null, Qa(
          e,
          n,
          i
        ), Ft = o;
        break;
      default:
        Qa(
          e,
          n,
          i
        );
    }
  }
  function Bg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        il(e);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function Ug(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        il(e);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function zS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Og()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Og()), n;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function js(e, n) {
    var i = zS(e);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = qS.bind(null, e, o);
        o.then(f, f);
      }
    });
  }
  function En(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], d = e, x = n, T = x;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (Oi(T.type)) {
                Dt = T.stateNode, Sn = !1;
                break e;
              }
              break;
            case 5:
              Dt = T.stateNode, Sn = !1;
              break e;
            case 3:
            case 4:
              Dt = T.stateNode.containerInfo, Sn = !0;
              break e;
          }
          T = T.return;
        }
        if (Dt === null) throw Error(l(160));
        Hg(d, x, f), Dt = null, Sn = !1, d = f.alternate, d !== null && (d.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        kg(n, e), n = n.sibling;
  }
  var ca = null;
  function kg(e, n) {
    var i = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        En(n, e), _n(e), o & 4 && (Ci(3, e, e.return), Kl(3, e), Ci(5, e, e.return));
        break;
      case 1:
        En(n, e), _n(e), o & 512 && (Ft || i === null || Ca(i, i.return)), o & 64 && Fa && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = ca;
        if (En(n, e), _n(e), o & 512 && (Ft || i === null || Ca(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = e.memoizedState, i === null)
            if (o === null)
              if (e.stateNode === null) {
                e: {
                  o = e.type, i = e.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      d = f.getElementsByTagName("title")[0], (!d || d[Xe] || d[ve] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = f.createElement(o), f.head.insertBefore(
                        d,
                        f.querySelector("head > title")
                      )), sn(d, o, i), d[ve] = e, at(d), o = d;
                      break e;
                    case "link":
                      var x = k0(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (x) {
                        for (var T = 0; T < x.length; T++)
                          if (d = x[T], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            x.splice(T, 1);
                            break t;
                          }
                      }
                      d = f.createElement(o), sn(d, o, i), f.head.appendChild(d);
                      break;
                    case "meta":
                      if (x = k0(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (T = 0; T < x.length; T++)
                          if (d = x[T], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            x.splice(T, 1);
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
                V0(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = U0(
                f,
                o,
                e.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? V0(
              f,
              e.type,
              e.stateNode
            ) : U0(
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
        En(n, e), _n(e), o & 512 && (Ft || i === null || Ca(i, i.return)), i !== null && o & 4 && Of(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (En(n, e), _n(e), o & 512 && (Ft || i === null || Ca(i, i.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Rr(f, "");
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
        if (Ps = null, f = ca, ca = Fs(n.containerInfo), En(n, e), ca = f, _n(e), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            il(n.containerInfo);
          } catch (_e) {
            wt(e, e.return, _e);
          }
        Hf && (Hf = !1, Vg(e));
        break;
      case 4:
        o = ca, ca = Fs(
          e.stateNode.containerInfo
        ), En(n, e), _n(e), ca = o;
        break;
      case 12:
        En(n, e), _n(e);
        break;
      case 31:
        En(n, e), _n(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, js(e, o)));
        break;
      case 13:
        En(n, e), _n(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Hs = Qe()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, js(e, o)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var Y = i !== null && i.memoizedState !== null, ae = Fa, ue = Ft;
        if (Fa = ae || f, Ft = ue || Y, En(n, e), Ft = ue, Fa = ae, _n(e), o & 8192)
          e: for (n = e.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || Y || Fa || Ft || or(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                Y = i = n;
                try {
                  if (d = Y.stateNode, f)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    T = Y.stateNode;
                    var fe = Y.memoizedProps.style, ie = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    T.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (_e) {
                  wt(Y, Y.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                Y = n;
                try {
                  Y.stateNode.nodeValue = f ? "" : Y.memoizedProps;
                } catch (_e) {
                  wt(Y, Y.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                Y = n;
                try {
                  var oe = Y.stateNode;
                  f ? M0(oe, !0) : M0(Y.stateNode, !1);
                } catch (_e) {
                  wt(Y, Y.return, _e);
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
        o & 4 && (o = e.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, js(e, i))));
        break;
      case 19:
        En(n, e), _n(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, js(e, o)));
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
          if (Ag(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, d = jf(e);
            Os(e, d, f);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (Rr(x, ""), i.flags &= -33);
            var T = jf(e);
            Os(e, T, x);
            break;
          case 3:
          case 4:
            var Y = i.stateNode.containerInfo, ae = jf(e);
            Lf(
              e,
              ae,
              Y
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
  function Vg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Vg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Pa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        jg(e, n.alternate, n), n = n.sibling;
  }
  function or(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ci(4, n, n.return), or(n);
          break;
        case 1:
          Ca(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && Mg(
            n,
            n.return,
            i
          ), or(n);
          break;
        case 27:
          oo(n.stateNode);
        case 26:
        case 5:
          Ca(n, n.return), or(n);
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
          ), Kl(4, d);
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
            var T = o.stateNode;
            try {
              var Y = f.shared.hiddenCallbacks;
              if (Y !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < Y.length; f++)
                  yp(Y[f], T);
            } catch (ae) {
              wt(o, o.return, ae);
            }
          }
          i && x & 64 && Tg(d), Jl(d, d.return);
          break;
        case 27:
          zg(d);
        case 26:
        case 5:
          Ka(
            f,
            d,
            i
          ), i && o === null && x & 4 && Dg(d), Jl(d, d.return);
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
          ), i && x & 4 && Bg(f, d);
          break;
        case 13:
          Ka(
            f,
            d,
            i
          ), i && x & 4 && Ug(f, d);
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
        qg(
          e,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function qg(e, n, i, o) {
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
        ), f & 2048 && Kl(9, n);
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
            var d = n.memoizedProps, x = d.id, T = d.onPostCommit;
            typeof T == "function" && T(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (Y) {
            wt(n, n.return, Y);
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
      var d = e, x = n, T = i, Y = o, ae = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Zr(
            d,
            x,
            T,
            Y,
            f
          ), Kl(8, x);
          break;
        case 23:
          break;
        case 22:
          var ue = x.stateNode;
          x.memoizedState !== null ? ue._visibility & 2 ? Zr(
            d,
            x,
            T,
            Y,
            f
          ) : Wl(
            d,
            x
          ) : (ue._visibility |= 2, Zr(
            d,
            x,
            T,
            Y,
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
            T,
            Y,
            f
          ), f && ae & 2048 && Uf(x.alternate, x);
          break;
        default:
          Zr(
            d,
            x,
            T,
            Y,
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
  function Fr(e, n, i) {
    if (e.subtreeFlags & eo)
      for (e = e.child; e !== null; )
        Yg(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function Yg(e, n, i) {
    switch (e.tag) {
      case 26:
        Fr(
          e,
          n,
          i
        ), e.flags & eo && e.memoizedState !== null && vE(
          i,
          ca,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Fr(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ca;
        ca = Fs(e.stateNode.containerInfo), Fr(
          e,
          n,
          i
        ), ca = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = eo, eo = 16777216, Fr(
          e,
          n,
          i
        ), eo = o) : Fr(
          e,
          n,
          i
        ));
        break;
      default:
        Fr(
          e,
          n,
          i
        );
    }
  }
  function $g(e) {
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
          en = o, Xg(
            o,
            e
          );
        }
      $g(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Ig(e), e = e.sibling;
  }
  function Ig(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        to(e), e.flags & 2048 && Ci(9, e, e.return);
        break;
      case 3:
        to(e);
        break;
      case 12:
        to(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, Ls(e)) : to(e);
        break;
      default:
        to(e);
    }
  }
  function Ls(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, Xg(
            o,
            e
          );
        }
      $g(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Ci(8, n, n.return), Ls(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, Ls(n));
          break;
        default:
          Ls(n);
      }
      e = e.sibling;
    }
  }
  function Xg(e, n) {
    for (; en !== null; ) {
      var i = en;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ci(8, i, n);
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
          if (Lg(o), o === i) {
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
  var OS = {
    getCacheForType: function(e) {
      var n = ln(Xt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return ln(Xt).controller.signal;
    }
  }, jS = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Pe = null, et = 0, xt = 0, Bn = null, Ri = !1, Qr = !1, kf = !1, Ja = 0, Ut = 0, Ti = 0, sr = 0, Vf = 0, Un = 0, Pr = 0, no = null, Nn = null, qf = !1, Hs = 0, Gg = 0, Bs = 1 / 0, Us = null, Mi = null, Jt = 0, Di = null, Kr = null, Wa = 0, Yf = 0, $f = null, Zg = null, ao = 0, If = null;
  function kn() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : C.T !== null ? Pf() : de();
  }
  function Fg() {
    if (Un === 0)
      if ((et & 536870912) === 0 || it) {
        var e = Dn;
        Dn <<= 1, (Dn & 3932160) === 0 && (Dn = 262144), Un = e;
      } else Un = 536870912;
    return e = Ln.current, e !== null && (e.flags |= 32), Un;
  }
  function Cn(e, n, i) {
    (e === Rt && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null) && (Jr(e, 0), Ai(
      e,
      et,
      Un,
      !1
    )), pt(e, i), ((ht & 2) === 0 || e !== Rt) && (e === Rt && ((ht & 2) === 0 && (sr |= i), Ut === 4 && Ai(
      e,
      et,
      Un,
      !1
    )), Ra(e));
  }
  function Qg(e, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || vt(e, n), f = o ? BS(e, n) : Gf(e, n, !0), d = o;
    do {
      if (f === 0) {
        Qr && !o && Ai(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !LS(i)) {
          f = Gf(e, n, !1), d = !1;
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
              var T = e;
              f = no;
              var Y = T.current.memoizedState.isDehydrated;
              if (Y && (Jr(T, x).flags |= 256), x = Gf(
                T,
                x,
                !1
              ), x !== 2) {
                if (kf && !Y) {
                  T.errorRecoveryDisabledLanes |= d, sr |= d, f = 4;
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
          Jr(e, 0), Ai(e, n, 0, !0);
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
              Ai(
                o,
                n,
                Un,
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
          if ((n & 62914560) === n && (f = Hs + 300 - Qe(), 10 < f)) {
            if (Ai(
              o,
              n,
              Un,
              !Ri
            ), He(o, 0, !0) !== 0) break e;
            Wa = n, o.timeoutHandle = C0(
              Pg.bind(
                null,
                o,
                i,
                Nn,
                Us,
                qf,
                n,
                Un,
                sr,
                Pr,
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
          Pg(
            o,
            i,
            Nn,
            Us,
            qf,
            n,
            Un,
            sr,
            Pr,
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
  function Pg(e, n, i, o, f, d, x, T, Y, ae, ue, fe, ie, oe) {
    if (e.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ua
      }, Yg(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? Hs - Qe() : (d & 4194048) === d ? Gg - Qe() : 0;
      if (_e = bE(
        fe,
        _e
      ), _e !== null) {
        Wa = d, e.cancelPendingCommit = _e(
          i0.bind(
            null,
            e,
            n,
            d,
            i,
            o,
            f,
            x,
            T,
            Y,
            ue,
            fe,
            null,
            ie,
            oe
          )
        ), Ai(e, d, x, !ae);
        return;
      }
    }
    i0(
      e,
      n,
      d,
      i,
      o,
      f,
      x,
      T,
      Y
    );
  }
  function LS(e) {
    for (var n = e; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], d = f.getSnapshot;
          f = f.value;
          try {
            if (!On(d(), f)) return !1;
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
  function Ai(e, n, i, o) {
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
  function Xf() {
    if (Pe !== null) {
      if (xt === 0)
        var e = Pe.return;
      else
        e = Pe, Ya = Wi = null, of(e), Yr = null, Vl = 0, e = Pe;
      for (; e !== null; )
        Rg(e.alternate, e), e = e.return;
      Pe = null;
    }
  }
  function Jr(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, tE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Wa = 0, Xf(), Rt = e, Pe = i = Va(e.current, null), et = n, xt = 0, Bn = null, Ri = !1, Qr = vt(e, n), kf = !1, Pr = Un = Vf = sr = Ti = Ut = 0, Nn = no = null, qf = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= n; 0 < o; ) {
        var f = 31 - kt(o), d = 1 << f;
        n |= e[f], o &= ~d;
      }
    return Ja = n, ls(), i;
  }
  function Kg(e, n) {
    qe = null, C.H = Fl, n === qr || n === ms ? (n = hp(), xt = 3) : n === Fc ? (n = hp(), xt = 4) : xt = n === Ef ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, Pe === null && (Ut = 1, Ts(
      e,
      Zn(n, e.current)
    ));
  }
  function Jg() {
    var e = Ln.current;
    return e === null ? !0 : (et & 4194048) === et ? Kn === null : (et & 62914560) === et || (et & 536870912) !== 0 ? e === Kn : !1;
  }
  function Wg() {
    var e = C.H;
    return C.H = Fl, e === null ? Fl : e;
  }
  function e0() {
    var e = C.A;
    return C.A = OS, e;
  }
  function Vs() {
    Ut = 4, Ri || (et & 4194048) !== et && Ln.current !== null || (Qr = !0), (Ti & 134217727) === 0 && (sr & 134217727) === 0 || Rt === null || Ai(
      Rt,
      et,
      Un,
      !1
    );
  }
  function Gf(e, n, i) {
    var o = ht;
    ht |= 2;
    var f = Wg(), d = e0();
    (Rt !== e || et !== n) && (Us = null, Jr(e, n)), n = !1;
    var x = Ut;
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          var T = Pe, Y = Bn;
          switch (xt) {
            case 8:
              Xf(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ln.current === null && (n = !0);
              var ae = xt;
              if (xt = 0, Bn = null, Wr(e, T, Y, ae), i && Qr) {
                x = 0;
                break e;
              }
              break;
            default:
              ae = xt, xt = 0, Bn = null, Wr(e, T, Y, ae);
          }
        }
        HS(), x = Ut;
        break;
      } catch (ue) {
        Kg(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ya = Wi = null, ht = o, C.H = f, C.A = d, Pe === null && (Rt = null, et = 0, ls()), x;
  }
  function HS() {
    for (; Pe !== null; ) t0(Pe);
  }
  function BS(e, n) {
    var i = ht;
    ht |= 2;
    var o = Wg(), f = e0();
    Rt !== e || et !== n ? (Us = null, Bs = Qe() + 500, Jr(e, n)) : Qr = vt(
      e,
      n
    );
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          n = Pe;
          var d = Bn;
          t: switch (xt) {
            case 1:
              xt = 0, Bn = null, Wr(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (fp(d)) {
                xt = 0, Bn = null, n0(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Rt !== e || (xt = 7), Ra(e);
              }, d.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              fp(d) ? (xt = 0, Bn = null, n0(n)) : (xt = 0, Bn = null, Wr(e, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Pe.tag) {
                case 26:
                  x = Pe.memoizedState;
                case 5:
                case 27:
                  var T = Pe;
                  if (x ? q0(x) : T.stateNode.complete) {
                    xt = 0, Bn = null;
                    var Y = T.sibling;
                    if (Y !== null) Pe = Y;
                    else {
                      var ae = T.return;
                      ae !== null ? (Pe = ae, qs(ae)) : Pe = null;
                    }
                    break t;
                  }
              }
              xt = 0, Bn = null, Wr(e, n, d, 5);
              break;
            case 6:
              xt = 0, Bn = null, Wr(e, n, d, 6);
              break;
            case 8:
              Xf(), Ut = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        US();
        break;
      } catch (ue) {
        Kg(e, ue);
      }
    while (!0);
    return Ya = Wi = null, C.H = o, C.A = f, ht = i, Pe !== null ? 0 : (Rt = null, et = 0, ls(), Ut);
  }
  function US() {
    for (; Pe !== null && !Je(); )
      t0(Pe);
  }
  function t0(e) {
    var n = Ng(e.alternate, e, Ja);
    e.memoizedProps = e.pendingProps, n === null ? qs(e) : Pe = n;
  }
  function n0(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = bg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = bg(
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
        Rg(i, n), n = Pe = ep(n, Ja), n = Ng(i, n, Ja);
    }
    e.memoizedProps = e.pendingProps, n === null ? qs(e) : Pe = n;
  }
  function Wr(e, n, i, o) {
    Ya = Wi = null, of(n), Yr = null, Vl = 0;
    var f = n.return;
    try {
      if (CS(
        e,
        f,
        n,
        i,
        et
      )) {
        Ut = 1, Ts(
          e,
          Zn(i, e.current)
        ), Pe = null;
        return;
      }
    } catch (d) {
      if (f !== null) throw Pe = f, d;
      Ut = 1, Ts(
        e,
        Zn(i, e.current)
      ), Pe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? e = !0 : Qr || (et & 536870912) !== 0 ? e = !1 : (Ri = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ln.current, o !== null && o.tag === 13 && (o.flags |= 16384))), a0(n, e)) : qs(n);
  }
  function qs(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        a0(
          n,
          Ri
        );
        return;
      }
      e = n.return;
      var i = MS(
        n.alternate,
        n,
        Ja
      );
      if (i !== null) {
        Pe = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Pe = n;
        return;
      }
      Pe = n = e;
    } while (n !== null);
    Ut === 0 && (Ut = 5);
  }
  function a0(e, n) {
    do {
      var i = DS(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Pe = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (e = e.sibling, e !== null)) {
        Pe = e;
        return;
      }
      Pe = e = i;
    } while (e !== null);
    Ut = 6, Pe = null;
  }
  function i0(e, n, i, o, f, d, x, T, Y) {
    e.cancelPendingCommit = null;
    do
      Ys();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (d = n.lanes | n.childLanes, d |= Oc, Kt(
        e,
        i,
        d,
        x,
        T,
        Y
      ), e === Rt && (Pe = Rt = null, et = 0), Kr = n, Di = e, Wa = i, Yf = d, $f = f, Zg = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, YS(Lt, function() {
        return u0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = C.T, C.T = null, f = L.p, L.p = 2, x = ht, ht |= 4;
        try {
          AS(e, n, i);
        } finally {
          ht = x, L.p = f, C.T = o;
        }
      }
      Jt = 1, r0(), l0(), o0();
    }
  }
  function r0() {
    if (Jt === 1) {
      Jt = 0;
      var e = Di, n = Kr, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = C.T, C.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          kg(n, e);
          var d = id, x = Xm(e.containerInfo), T = d.focusedElem, Y = d.selectionRange;
          if (x !== T && T && T.ownerDocument && Im(
            T.ownerDocument.documentElement,
            T
          )) {
            if (Y !== null && Tc(T)) {
              var ae = Y.start, ue = Y.end;
              if (ue === void 0 && (ue = ae), "selectionStart" in T)
                T.selectionStart = ae, T.selectionEnd = Math.min(
                  ue,
                  T.value.length
                );
              else {
                var fe = T.ownerDocument || document, ie = fe && fe.defaultView || window;
                if (ie.getSelection) {
                  var oe = ie.getSelection(), _e = T.textContent.length, Le = Math.min(Y.start, _e), Nt = Y.end === void 0 ? Le : Math.min(Y.end, _e);
                  !oe.extend && Le > Nt && (x = Nt, Nt = Le, Le = x);
                  var J = $m(
                    T,
                    Le
                  ), G = $m(
                    T,
                    Nt
                  );
                  if (J && G && (oe.rangeCount !== 1 || oe.anchorNode !== J.node || oe.anchorOffset !== J.offset || oe.focusNode !== G.node || oe.focusOffset !== G.offset)) {
                    var ne = fe.createRange();
                    ne.setStart(J.node, J.offset), oe.removeAllRanges(), Le > Nt ? (oe.addRange(ne), oe.extend(G.node, G.offset)) : (ne.setEnd(G.node, G.offset), oe.addRange(ne));
                  }
                }
              }
            }
            for (fe = [], oe = T; oe = oe.parentNode; )
              oe.nodeType === 1 && fe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof T.focus == "function" && T.focus(), T = 0; T < fe.length; T++) {
              var ce = fe[T];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          eu = !!ad, id = ad = null;
        } finally {
          ht = f, L.p = o, C.T = i;
        }
      }
      e.current = n, Jt = 2;
    }
  }
  function l0() {
    if (Jt === 2) {
      Jt = 0;
      var e = Di, n = Kr, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = C.T, C.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          jg(e, n.alternate, n);
        } finally {
          ht = f, L.p = o, C.T = i;
        }
      }
      Jt = 3;
    }
  }
  function o0() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Fe();
      var e = Di, n = Kr, i = Wa, o = Zg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, Kr = Di = null, s0(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (Mi = null), W(i), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            tn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = C.T, f = L.p, L.p = 2, C.T = null;
        try {
          for (var d = e.onRecoverableError, x = 0; x < o.length; x++) {
            var T = o[x];
            d(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          C.T = n, L.p = f;
        }
      }
      (Wa & 3) !== 0 && Ys(), Ra(e), f = e.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? e === If ? ao++ : (ao = 0, If = e) : ao = 0, io(0);
    }
  }
  function s0(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Ul(n)));
  }
  function Ys() {
    return r0(), l0(), o0(), u0();
  }
  function u0() {
    if (Jt !== 5) return !1;
    var e = Di, n = Yf;
    Yf = 0;
    var i = W(Wa), o = C.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, C.T = null, i = $f, $f = null;
      var d = Di, x = Wa;
      if (Jt = 0, Kr = Di = null, Wa = 0, (ht & 6) !== 0) throw Error(l(331));
      var T = ht;
      if (ht |= 4, Ig(d.current), qg(
        d,
        d.current,
        x,
        i
      ), ht = T, io(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(tn, d);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, C.T = o, s0(e, n);
    }
  }
  function c0(e, n, i) {
    n = Zn(i, n), n = Sf(e.stateNode, n, 2), e = Ei(e, n, 2), e !== null && (pt(e, 2), Ra(e));
  }
  function wt(e, n, i) {
    if (e.tag === 3)
      c0(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          c0(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Mi === null || !Mi.has(o))) {
            e = Zn(i, e), i = fg(2), o = Ei(n, i, 2), o !== null && (dg(
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
      o = e.pingCache = new jS();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (kf = !0, f.add(i), e = kS.bind(null, e, n, i), n.then(e, e));
  }
  function kS(e, n, i) {
    var o = e.pingCache;
    o !== null && o.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Rt === e && (et & i) === i && (Ut === 4 || Ut === 3 && (et & 62914560) === et && 300 > Qe() - Hs ? (ht & 2) === 0 && Jr(e, 0) : Vf |= i, Pr === et && (Pr = 0)), Ra(e);
  }
  function f0(e, n) {
    n === 0 && (n = Vt()), e = Pi(e, n), e !== null && (pt(e, n), Ra(e));
  }
  function VS(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), f0(e, i);
  }
  function qS(e, n) {
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
    o !== null && o.delete(n), f0(e, i);
  }
  function YS(e, n) {
    return $e(e, n);
  }
  var $s = null, el = null, Ff = !1, Is = !1, Qf = !1, zi = 0;
  function Ra(e) {
    e !== el && e.next === null && (el === null ? $s = el = e : el = el.next = e), Is = !0, Ff || (Ff = !0, IS());
  }
  function io(e, n) {
    if (!Qf && Is) {
      Qf = !0;
      do
        for (var i = !1, o = $s; o !== null; ) {
          if (e !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var x = o.suspendedLanes, T = o.pingedLanes;
              d = (1 << 31 - kt(42 | e) + 1) - 1, d &= f & ~(x & ~T), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, p0(o, d));
          } else
            d = et, d = He(
              o,
              o === Rt ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || vt(o, d) || (i = !0, p0(o, d));
          o = o.next;
        }
      while (i);
      Qf = !1;
    }
  }
  function $S() {
    d0();
  }
  function d0() {
    Is = Ff = !1;
    var e = 0;
    zi !== 0 && eE() && (e = zi);
    for (var n = Qe(), i = null, o = $s; o !== null; ) {
      var f = o.next, d = h0(o, n);
      d === 0 ? (o.next = null, i === null ? $s = f : i.next = f, f === null && (el = i)) : (i = o, (e !== 0 || (d & 3) !== 0) && (Is = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || io(e), zi !== 0 && (zi = 0);
  }
  function h0(e, n) {
    for (var i = e.suspendedLanes, o = e.pingedLanes, f = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - kt(d), T = 1 << x, Y = f[x];
      Y === -1 ? ((T & i) === 0 || (T & o) !== 0) && (f[x] = Ht(T, n)) : Y <= n && (e.expiredLanes |= T), d &= ~T;
    }
    if (n = Rt, i = et, i = He(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, i === 0 || e === n && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && St(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || vt(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (o !== null && St(o), W(i)) {
        case 2:
        case 8:
          i = It;
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
      return o = m0.bind(null, e), i = $e(i, o), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return o !== null && o !== null && St(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function m0(e, n) {
    if (Jt !== 0 && Jt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Ys() && e.callbackNode !== i)
      return null;
    var o = et;
    return o = He(
      e,
      e === Rt ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (Qg(e, o, n), h0(e, Qe()), e.callbackNode != null && e.callbackNode === i ? m0.bind(null, e) : null);
  }
  function p0(e, n) {
    if (Ys()) return null;
    Qg(e, n, !0);
  }
  function IS() {
    nE(function() {
      (ht & 6) !== 0 ? $e(
        yt,
        $S
      ) : d0();
    });
  }
  function Pf() {
    if (zi === 0) {
      var e = kr;
      e === 0 && (e = ra, ra <<= 1, (ra & 261888) === 0 && (ra = 256)), zi = e;
    }
    return zi;
  }
  function g0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Jo("" + e);
  }
  function y0(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function XS(e, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var d = g0(
        (f[we] || null).action
      ), x = o.submitter;
      x && (n = (n = x[we] || null) ? g0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var T = new ns(
        "action",
        "action",
        null,
        o,
        f
      );
      e.push({
        event: T,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (zi !== 0) {
                  var Y = x ? y0(f, x) : new FormData(f);
                  gf(
                    i,
                    {
                      pending: !0,
                      data: Y,
                      method: f.method,
                      action: d
                    },
                    null,
                    Y
                  );
                }
              } else
                typeof d == "function" && (T.preventDefault(), Y = x ? y0(f, x) : new FormData(f), gf(
                  i,
                  {
                    pending: !0,
                    data: Y,
                    method: f.method,
                    action: d
                  },
                  d,
                  Y
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Kf = 0; Kf < zc.length; Kf++) {
    var Jf = zc[Kf], GS = Jf.toLowerCase(), ZS = Jf[0].toUpperCase() + Jf.slice(1);
    ua(
      GS,
      "on" + ZS
    );
  }
  ua(Fm, "onAnimationEnd"), ua(Qm, "onAnimationIteration"), ua(Pm, "onAnimationStart"), ua("dblclick", "onDoubleClick"), ua("focusin", "onFocus"), ua("focusout", "onBlur"), ua(uS, "onTransitionRun"), ua(cS, "onTransitionStart"), ua(fS, "onTransitionCancel"), ua(Km, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
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
  ), FS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ro)
  );
  function v0(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var o = e[i], f = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var T = o[x], Y = T.instance, ae = T.currentTarget;
            if (T = T.listener, Y !== d && f.isPropagationStopped())
              break e;
            d = T, f.currentTarget = ae;
            try {
              d(f);
            } catch (ue) {
              rs(ue);
            }
            f.currentTarget = null, d = Y;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (T = o[x], Y = T.instance, ae = T.currentTarget, T = T.listener, Y !== d && f.isPropagationStopped())
              break e;
            d = T, f.currentTarget = ae;
            try {
              d(f);
            } catch (ue) {
              rs(ue);
            }
            f.currentTarget = null, d = Y;
          }
      }
    }
  }
  function Ke(e, n) {
    var i = n[Me];
    i === void 0 && (i = n[Me] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    i.has(o) || (b0(n, e, 2, !1), i.add(o));
  }
  function Wf(e, n, i) {
    var o = 0;
    n && (o |= 4), b0(
      i,
      e,
      o,
      n
    );
  }
  var Xs = "_reactListening" + Math.random().toString(36).slice(2);
  function ed(e) {
    if (!e[Xs]) {
      e[Xs] = !0, Ea.forEach(function(i) {
        i !== "selectionchange" && (FS.has(i) || Wf(i, !1, e), Wf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Xs] || (n[Xs] = !0, Wf("selectionchange", !1, n));
    }
  }
  function b0(e, n, i, o) {
    switch (F0(n)) {
      case 2:
        var f = SE;
        break;
      case 8:
        f = EE;
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
          var T = o.stateNode.containerInfo;
          if (T === f) break;
          if (x === 4)
            for (x = o.return; x !== null; ) {
              var Y = x.tag;
              if ((Y === 3 || Y === 4) && x.stateNode.containerInfo === f)
                return;
              x = x.return;
            }
          for (; T !== null; ) {
            if (x = Ct(T), x === null) return;
            if (Y = x.tag, Y === 5 || Y === 6 || Y === 26 || Y === 27) {
              o = d = x;
              continue e;
            }
            T = T.parentNode;
          }
        }
        o = o.return;
      }
    _m(function() {
      var ae = d, ue = yc(i), fe = [];
      e: {
        var ie = Jm.get(e);
        if (ie !== void 0) {
          var oe = ns, _e = e;
          switch (e) {
            case "keypress":
              if (es(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = qw;
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
              oe = Rm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Mw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Iw;
              break;
            case Fm:
            case Qm:
            case Pm:
              oe = zw;
              break;
            case Km:
              oe = Gw;
              break;
            case "scroll":
            case "scrollend":
              oe = Rw;
              break;
            case "wheel":
              oe = Fw;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = jw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Mm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = Pw;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (e === "scroll" || e === "scrollend"), J = Le ? ie !== null ? ie + "Capture" : null : ie;
          Le = [];
          for (var G = ae, ne; G !== null; ) {
            var ce = G;
            if (ne = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ne === null || J === null || (ce = Rl(G, J), ce != null && Le.push(
              lo(G, ce, ne)
            )), Nt) break;
            G = G.return;
          }
          0 < Le.length && (ie = new oe(
            ie,
            _e,
            null,
            i,
            ue
          ), fe.push({ event: ie, listeners: Le }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", ie && i !== gc && (_e = i.relatedTarget || i.fromElement) && (Ct(_e) || _e[be]))
            break e;
          if ((oe || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ae, _e = _e ? Ct(_e) : null, _e !== null && (Nt = u(_e), Le = _e.tag, _e !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (oe = null, _e = ae), oe !== _e)) {
            if (Le = Rm, ce = "onMouseLeave", J = "onMouseEnter", G = "mouse", (e === "pointerout" || e === "pointerover") && (Le = Mm, ce = "onPointerLeave", J = "onPointerEnter", G = "pointer"), Nt = oe == null ? ie : We(oe), ne = _e == null ? ie : We(_e), ie = new Le(
              ce,
              G + "leave",
              oe,
              i,
              ue
            ), ie.target = Nt, ie.relatedTarget = ne, ce = null, Ct(ue) === ae && (Le = new Le(
              J,
              G + "enter",
              _e,
              i,
              ue
            ), Le.target = ne, Le.relatedTarget = Nt, ce = Le), Nt = ce, oe && _e)
              t: {
                for (Le = QS, J = oe, G = _e, ne = 0, ce = J; ce; ce = Le(ce))
                  ne++;
                ce = 0;
                for (var Oe = G; Oe; Oe = Le(Oe))
                  ce++;
                for (; 0 < ne - ce; )
                  J = Le(J), ne--;
                for (; 0 < ce - ne; )
                  G = Le(G), ce--;
                for (; ne--; ) {
                  if (J === G || G !== null && J === G.alternate) {
                    Le = J;
                    break t;
                  }
                  J = Le(J), G = Le(G);
                }
                Le = null;
              }
            else Le = null;
            oe !== null && x0(
              fe,
              ie,
              oe,
              Le,
              !1
            ), _e !== null && Nt !== null && x0(
              fe,
              Nt,
              _e,
              Le,
              !0
            );
          }
        }
        e: {
          if (ie = ae ? We(ae) : window, oe = ie.nodeName && ie.nodeName.toLowerCase(), oe === "select" || oe === "input" && ie.type === "file")
            var ut = Bm;
          else if (Lm(ie))
            if (Um)
              ut = lS;
            else {
              ut = iS;
              var Ne = aS;
            }
          else
            oe = ie.nodeName, !oe || oe.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ae && pc(ae.elementType) && (ut = Bm) : ut = rS;
          if (ut && (ut = ut(e, ae))) {
            Hm(
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
            (Lm(Ne) || Ne.contentEditable === "true") && (Ar = Ne, Mc = ae, Ll = null);
            break;
          case "focusout":
            Ll = Mc = Ar = null;
            break;
          case "mousedown":
            Dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Dc = !1, Gm(fe, i, ue);
            break;
          case "selectionchange":
            if (sS) break;
          case "keydown":
          case "keyup":
            Gm(fe, i, ue);
        }
        var Ie;
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
          Dr ? Om(e, i) && (tt = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Dm && i.locale !== "ko" && (Dr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Dr && (Ie = Nm()) : (gi = ue, xc = "value" in gi ? gi.value : gi.textContent, Dr = !0)), Ne = Gs(ae, tt), 0 < Ne.length && (tt = new Tm(
          tt,
          e,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Ie ? tt.data = Ie : (Ie = jm(i), Ie !== null && (tt.data = Ie)))), (Ie = Jw ? Ww(e, i) : eS(e, i)) && (tt = Gs(ae, "onBeforeInput"), 0 < tt.length && (Ne = new Tm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Ie)), XS(
          fe,
          e,
          ae,
          i,
          ue
        );
      }
      v0(fe, n);
    });
  }
  function lo(e, n, i) {
    return {
      instance: e,
      listener: n,
      currentTarget: i
    };
  }
  function Gs(e, n) {
    for (var i = n + "Capture", o = []; e !== null; ) {
      var f = e, d = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || d === null || (f = Rl(e, i), f != null && o.unshift(
        lo(e, f, d)
      ), f = Rl(e, n), f != null && o.push(
        lo(e, f, d)
      )), e.tag === 3) return o;
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
  function x0(e, n, i, o, f) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var T = i, Y = T.alternate, ae = T.stateNode;
      if (T = T.tag, Y !== null && Y === o) break;
      T !== 5 && T !== 26 && T !== 27 || ae === null || (Y = ae, f ? (ae = Rl(i, d), ae != null && x.unshift(
        lo(i, ae, Y)
      )) : f || (ae = Rl(i, d), ae != null && x.push(
        lo(i, ae, Y)
      ))), i = i.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var PS = /\r\n?/g, KS = /\u0000|\uFFFD/g;
  function w0(e) {
    return (typeof e == "string" ? e : "" + e).replace(PS, `
`).replace(KS, "");
  }
  function S0(e, n) {
    return n = w0(n), w0(e) === n;
  }
  function _t(e, n, i, o, f, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Rr(e, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Rr(e, "" + o);
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
        Sm(e, o, d);
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
        o != null && (e.onclick = Ua);
        break;
      case "onScroll":
        o != null && Ke("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", e);
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
        Ke("beforetoggle", e), Ke("toggle", e), oa(e, "popover", o);
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Nw.get(i) || i, oa(e, i, o));
    }
  }
  function nd(e, n, i, o, f, d) {
    switch (i) {
      case "style":
        Sm(e, o, d);
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
        typeof o == "string" ? Rr(e, o) : (typeof o == "number" || typeof o == "bigint") && Rr(e, "" + o);
        break;
      case "onScroll":
        o != null && Ke("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = Ua);
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
        if (!An.hasOwnProperty(i))
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
        Ke("error", e), Ke("load", e);
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
        Ke("invalid", e);
        var T = d = x = f = null, Y = null, ae = null;
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
                  Y = ue;
                  break;
                case "defaultChecked":
                  ae = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  T = ue;
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
        Cr(
          e,
          d,
          T,
          Y,
          ae,
          x,
          f,
          !1
        );
        return;
      case "select":
        Ke("invalid", e), o = x = d = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (T = i[f], T != null))
            switch (f) {
              case "value":
                d = T;
                break;
              case "defaultValue":
                x = T;
                break;
              case "multiple":
                o = T;
              default:
                _t(e, n, f, T, i, null);
            }
        n = d, i = x, e.multiple = !!o, n != null ? pi(e, !!o, n, !1) : i != null && pi(e, !!o, i, !0);
        return;
      case "textarea":
        Ke("invalid", e), d = f = o = null;
        for (x in i)
          if (i.hasOwnProperty(x) && (T = i[x], T != null))
            switch (x) {
              case "value":
                o = T;
                break;
              case "defaultValue":
                f = T;
                break;
              case "children":
                d = T;
                break;
              case "dangerouslySetInnerHTML":
                if (T != null) throw Error(l(91));
                break;
              default:
                _t(e, n, x, T, i, null);
            }
        xm(e, o, f, d);
        return;
      case "option":
        for (Y in i)
          if (i.hasOwnProperty(Y) && (o = i[Y], o != null))
            switch (Y) {
              case "selected":
                e.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                _t(e, n, Y, o, i, null);
            }
        return;
      case "dialog":
        Ke("beforetoggle", e), Ke("toggle", e), Ke("cancel", e), Ke("close", e);
        break;
      case "iframe":
      case "object":
        Ke("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < ro.length; o++)
          Ke(ro[o], e);
        break;
      case "image":
        Ke("error", e), Ke("load", e);
        break;
      case "details":
        Ke("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ke("error", e), Ke("load", e);
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
    for (T in i)
      i.hasOwnProperty(T) && (o = i[T], o != null && _t(e, n, T, o, i, null));
  }
  function JS(e, n, i, o) {
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
        var f = null, d = null, x = null, T = null, Y = null, ae = null, ue = null;
        for (oe in i) {
          var fe = i[oe];
          if (i.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                Y = fe;
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
                T = oe;
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
        Gi(
          e,
          x,
          T,
          Y,
          ae,
          ue,
          d,
          f
        );
        return;
      case "select":
        oe = x = T = ie = null;
        for (d in i)
          if (Y = i[d], i.hasOwnProperty(d) && Y != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                oe = Y;
              default:
                o.hasOwnProperty(d) || _t(
                  e,
                  n,
                  d,
                  null,
                  o,
                  Y
                );
            }
        for (f in o)
          if (d = o[f], Y = i[f], o.hasOwnProperty(f) && (d != null || Y != null))
            switch (f) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                T = d;
                break;
              case "multiple":
                x = d;
              default:
                d !== Y && _t(
                  e,
                  n,
                  f,
                  d,
                  o,
                  Y
                );
            }
        n = T, i = x, o = oe, ie != null ? pi(e, !!i, ie, !1) : !!o != !!i && (n != null ? pi(e, !!i, n, !0) : pi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = ie = null;
        for (T in i)
          if (f = i[T], i.hasOwnProperty(T) && f != null && !o.hasOwnProperty(T))
            switch (T) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(e, n, T, null, o, f);
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
        Cl(e, ie, oe);
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
        for (Y in o)
          if (ie = o[Y], oe = i[Y], o.hasOwnProperty(Y) && ie !== oe && (ie != null || oe != null))
            switch (Y) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                _t(
                  e,
                  n,
                  Y,
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
        for (var Le in i)
          ie = i[Le], i.hasOwnProperty(Le) && ie != null && !o.hasOwnProperty(Le) && _t(e, n, Le, null, o, ie);
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
    for (var J in i)
      ie = i[J], i.hasOwnProperty(J) && ie != null && !o.hasOwnProperty(J) && _t(e, n, J, null, o, ie);
    for (fe in o)
      ie = o[fe], oe = i[fe], !o.hasOwnProperty(fe) || ie === oe || ie == null && oe == null || _t(e, n, fe, ie, o, oe);
  }
  function E0(e) {
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
  function WS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], d = f.transferSize, x = f.initiatorType, T = f.duration;
        if (d && T && E0(x)) {
          for (x = 0, T = f.responseEnd, o += 1; o < i.length; o++) {
            var Y = i[o], ae = Y.startTime;
            if (ae > T) break;
            var ue = Y.transferSize, fe = Y.initiatorType;
            ue && E0(fe) && (Y = Y.responseEnd, x += ue * (Y < T ? 1 : (T - ae) / (Y - ae)));
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
  function _0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function N0(e, n) {
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
  function eE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ld ? !1 : (ld = e, !0) : (ld = null, !1);
  }
  var C0 = typeof setTimeout == "function" ? setTimeout : void 0, tE = typeof clearTimeout == "function" ? clearTimeout : void 0, R0 = typeof Promise == "function" ? Promise : void 0, nE = typeof queueMicrotask == "function" ? queueMicrotask : typeof R0 < "u" ? function(e) {
    return R0.resolve(null).then(e).catch(aE);
  } : C0;
  function aE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Oi(e) {
    return e === "head";
  }
  function T0(e, n) {
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
            var x = d.nextSibling, T = d.nodeName;
            d[Xe] || T === "SCRIPT" || T === "STYLE" || T === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && oo(e.ownerDocument.body);
      i = f;
    } while (i);
    il(n);
  }
  function M0(e, n) {
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
  function iE(e, n, i, o) {
    for (; e.nodeType === 1; ) {
      var f = i;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[Xe])
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
      if (e = Jn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function rE(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = Jn(e.nextSibling), e === null)) return null;
    return e;
  }
  function D0(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Jn(e.nextSibling), e === null)) return null;
    return e;
  }
  function sd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ud(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function lE(e, n) {
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
  function Jn(e) {
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
  function A0(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return Jn(e.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function z0(e) {
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
  function O0(e, n, i) {
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
  var Wn = /* @__PURE__ */ new Map(), j0 = /* @__PURE__ */ new Set();
  function Fs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ei = L.d;
  L.d = {
    f: oE,
    r: sE,
    D: uE,
    C: cE,
    L: fE,
    m: dE,
    X: mE,
    S: hE,
    M: pE
  };
  function oE() {
    var e = ei.f(), n = ks();
    return e || n;
  }
  function sE(e) {
    var n = st(e);
    n !== null && n.tag === 5 && n.type === "form" ? Kp(n) : ei.r(e);
  }
  var tl = typeof document > "u" ? null : document;
  function L0(e, n, i) {
    var o = tl;
    if (o && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), j0.has(f) || (j0.add(f), e = { rel: e, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), sn(n, "link", e), at(n), o.head.appendChild(n)));
    }
  }
  function uE(e) {
    ei.D(e), L0("dns-prefetch", e, null);
  }
  function cE(e, n) {
    ei.C(e, n), L0("preconnect", e, n);
  }
  function fE(e, n, i) {
    ei.L(e, n, i);
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
      Wn.has(d) || (e = p(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : e,
          as: n
        },
        i
      ), Wn.set(d, e), o.querySelector(f) !== null || n === "style" && o.querySelector(so(d)) || n === "script" && o.querySelector(uo(d)) || (n = o.createElement("link"), sn(n, "link", e), at(n), o.head.appendChild(n)));
    }
  }
  function dE(e, n) {
    ei.m(e, n);
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
      if (!Wn.has(d) && (e = p({ rel: "modulepreload", href: e }, n), Wn.set(d, e), i.querySelector(f) === null)) {
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
  function hE(e, n, i) {
    ei.S(e, n, i);
    var o = tl;
    if (o && e) {
      var f = jt(o).hoistableStyles, d = nl(e);
      n = n || "default";
      var x = f.get(d);
      if (!x) {
        var T = { loading: 0, preload: null };
        if (x = o.querySelector(
          so(d)
        ))
          T.loading = 5;
        else {
          e = p(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = Wn.get(d)) && fd(e, i);
          var Y = x = o.createElement("link");
          at(Y), sn(Y, "link", e), Y._p = new Promise(function(ae, ue) {
            Y.onload = ae, Y.onerror = ue;
          }), Y.addEventListener("load", function() {
            T.loading |= 1;
          }), Y.addEventListener("error", function() {
            T.loading |= 2;
          }), T.loading |= 4, Qs(x, n, o);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: T
        }, f.set(d, x);
      }
    }
  }
  function mE(e, n) {
    ei.X(e, n);
    var i = tl;
    if (i && e) {
      var o = jt(i).hoistableScripts, f = al(e), d = o.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = p({ src: e, async: !0 }, n), (n = Wn.get(f)) && dd(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(f, d));
    }
  }
  function pE(e, n) {
    ei.M(e, n);
    var i = tl;
    if (i && e) {
      var o = jt(i).hoistableScripts, f = al(e), d = o.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = p({ src: e, async: !0, type: "module" }, n), (n = Wn.get(f)) && dd(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(f, d));
    }
  }
  function H0(e, n, i, o) {
    var f = (f = he.current) ? Fs(f) : null;
    if (!f) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = nl(i.href), i = jt(
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
          var d = jt(
            f
          ).hoistableStyles, x = d.get(e);
          if (x || (f = f.ownerDocument || f, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, x), (d = f.querySelector(
            so(e)
          )) && !d._p && (x.instance = d, x.state.loading = 5), Wn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Wn.set(e, i), d || gE(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = al(i), i = jt(
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
  function B0(e) {
    return p({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function gE(e, n, i, o) {
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
  function U0(e, n, i) {
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
          ), at(o), sn(o, "style", f), Qs(o, i.precedence, e), n.instance = o;
        case "stylesheet":
          f = nl(i.href);
          var d = e.querySelector(
            so(f)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, at(d), d;
          o = B0(i), (f = Wn.get(f)) && fd(o, f), d = (e.ownerDocument || e).createElement("link"), at(d);
          var x = d;
          return x._p = new Promise(function(T, Y) {
            x.onload = T, x.onerror = Y;
          }), sn(d, "link", o), n.state.loading |= 4, Qs(d, i.precedence, e), n.instance = d;
        case "script":
          return d = al(i.src), (f = e.querySelector(
            uo(d)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = Wn.get(d)) && (o = p({}, i), dd(o, f)), e = e.ownerDocument || e, f = e.createElement("script"), at(f), sn(f, "link", o), e.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Qs(o, i.precedence, e));
    return n.instance;
  }
  function Qs(e, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, d = f, x = 0; x < o.length; x++) {
      var T = o[x];
      if (T.dataset.precedence === n) d = T;
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
  var Ps = null;
  function k0(e, n, i) {
    if (Ps === null) {
      var o = /* @__PURE__ */ new Map(), f = Ps = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = Ps, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(e)) return o;
    for (o.set(e, null), i = i.getElementsByTagName(e), f = 0; f < i.length; f++) {
      var d = i[f];
      if (!(d[Xe] || d[ve] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = e + x;
        var T = o.get(x);
        T ? T.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function V0(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function yE(e, n, i) {
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
  function q0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function vE(e, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = nl(o.href), d = n.querySelector(
          so(f)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ks.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, at(d);
          return;
        }
        d = n.ownerDocument || n, o = B0(o), (f = Wn.get(f)) && fd(o, f), d = d.createElement("link"), at(d);
        var x = d;
        x._p = new Promise(function(T, Y) {
          x.onload = T, x.onerror = Y;
        }), sn(d, "link", o), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Ks.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var hd = 0;
  function bE(e, n) {
    return e.stylesheets && e.count === 0 && Ws(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && hd === 0 && (hd = 62500 * WS());
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
  function Ks() {
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Js = /* @__PURE__ */ new Map(), n.forEach(xE, e), Js = null, Ks.call(e));
  }
  function xE(e, n) {
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
      f = n.instance, x = f.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, f), i.set(x, f), this.count++, o = Ks.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), d ? d.parentNode.insertBefore(f, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), n.state.loading |= 4;
    }
  }
  var co = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function wE(e, n, i, o, f, d, x, T, Y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = Y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Y0(e, n, i, o, f, d, x, T, Y, ae, ue, fe) {
    return e = new wE(
      e,
      n,
      i,
      x,
      Y,
      ae,
      ue,
      fe,
      T
    ), n = 1, d === !0 && (n |= 24), d = jn(3, null, null, n), e.current = d, d.stateNode = e, n = Xc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Qc(d), e;
  }
  function $0(e) {
    return e ? (e = jr, e) : jr;
  }
  function I0(e, n, i, o, f, d) {
    f = $0(f), o.context === null ? o.context = f : o.pendingContext = f, o = Si(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = Ei(e, o, n), i !== null && (Cn(i, e, n), Yl(i, e, n));
  }
  function X0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function md(e, n) {
    X0(e, n), (e = e.alternate) && X0(e, n);
  }
  function G0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Pi(e, 67108864);
      n !== null && Cn(n, e, 67108864), md(e, 67108864);
    }
  }
  function Z0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = kn();
      n = F(n);
      var i = Pi(e, n);
      i !== null && Cn(i, e, n), md(e, n);
    }
  }
  var eu = !0;
  function SE(e, n, i, o) {
    var f = C.T;
    C.T = null;
    var d = L.p;
    try {
      L.p = 2, pd(e, n, i, o);
    } finally {
      L.p = d, C.T = f;
    }
  }
  function EE(e, n, i, o) {
    var f = C.T;
    C.T = null;
    var d = L.p;
    try {
      L.p = 8, pd(e, n, i, o);
    } finally {
      L.p = d, C.T = f;
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
        ), Q0(e, o);
      else if (NE(
        f,
        e,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (Q0(e, o), n & 4 && -1 < _E.indexOf(e)) {
        for (; f !== null; ) {
          var d = st(f);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var x = un(d.pendingLanes);
                  if (x !== 0) {
                    var T = d;
                    for (T.pendingLanes |= 2, T.entangledLanes |= 2; x; ) {
                      var Y = 1 << 31 - kt(x);
                      T.entanglements[1] |= Y, x &= ~Y;
                    }
                    Ra(d), (ht & 6) === 0 && (Bs = Qe() + 500, io(0));
                  }
                }
                break;
              case 31:
              case 13:
                T = Pi(d, 2), T !== null && Cn(T, d, 2), ks(), md(d, 2);
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
    if (tu = null, e = Ct(e), e !== null) {
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
  function F0(e) {
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
          case It:
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
  var vd = !1, ji = null, Li = null, Hi = null, fo = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map(), Bi = [], _E = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Q0(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        ji = null;
        break;
      case "dragenter":
      case "dragleave":
        Li = null;
        break;
      case "mouseover":
      case "mouseout":
        Hi = null;
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
    }, n !== null && (n = st(n), n !== null && G0(n)), e) : (e.eventSystemFlags |= o, n = e.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), e);
  }
  function NE(e, n, i, o, f) {
    switch (n) {
      case "focusin":
        return ji = mo(
          ji,
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
        return Hi = mo(
          Hi,
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
  function P0(e) {
    var n = Ct(e.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              Z0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              Z0(i);
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
        return n = st(i), n !== null && G0(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function K0(e, n, i) {
    nu(e) && i.delete(n);
  }
  function CE() {
    vd = !1, ji !== null && nu(ji) && (ji = null), Li !== null && nu(Li) && (Li = null), Hi !== null && nu(Hi) && (Hi = null), fo.forEach(K0), ho.forEach(K0);
  }
  function au(e, n) {
    e.blockedOn === n && (e.blockedOn = null, vd || (vd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      CE
    )));
  }
  var iu = null;
  function J0(e) {
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
    function n(Y) {
      return au(Y, e);
    }
    ji !== null && au(ji, e), Li !== null && au(Li, e), Hi !== null && au(Hi, e), fo.forEach(n), ho.forEach(n);
    for (var i = 0; i < Bi.length; i++) {
      var o = Bi[i];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < Bi.length && (i = Bi[0], i.blockedOn === null); )
      P0(i), i.blockedOn === null && Bi.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], d = i[o + 1], x = f[we] || null;
        if (typeof d == "function")
          x || J0(i);
        else if (x) {
          var T = null;
          if (d && d.hasAttribute("formAction")) {
            if (f = d, x = d[we] || null)
              T = x.formAction;
            else if (yd(f) !== null) continue;
          } else T = x.action;
          typeof T == "function" ? i[o + 1] = T : (i.splice(o, 3), o -= 3), J0(i);
        }
      }
  }
  function W0() {
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
    var i = n.current, o = kn();
    I0(i, o, e, n, null, null);
  }, ru.prototype.unmount = bd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      I0(e.current, 2, null, e, null, null), ks(), n[be] = null;
    }
  };
  function ru(e) {
    this._internalRoot = e;
  }
  ru.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = de();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < Bi.length && n !== 0 && n < Bi[i].priority; i++) ;
      Bi.splice(i, 0, e), i === 0 && P0(e);
    }
  };
  var ey = a.version;
  if (ey !== "19.2.7")
    throw Error(
      l(
        527,
        ey,
        "19.2.7"
      )
    );
  L.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = m(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var RE = {
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
          RE
        ), Pt = lu;
      } catch {
      }
  }
  return go.createRoot = function(e, n) {
    if (!s(e)) throw Error(l(299));
    var i = !1, o = "", f = og, d = sg, x = ug;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Y0(
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
      W0
    ), e[be] = n.current, ed(e), new bd(n);
  }, go.hydrateRoot = function(e, n, i) {
    if (!s(e)) throw Error(l(299));
    var o = !1, f = "", d = og, x = sg, T = ug, Y = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (T = i.onRecoverableError), i.formState !== void 0 && (Y = i.formState)), n = Y0(
      e,
      1,
      !0,
      n,
      i ?? null,
      o,
      f,
      Y,
      d,
      x,
      T,
      W0
    ), n.context = $0(null), i = n.current, o = kn(), o = F(o), f = Si(o), f.callback = null, Ei(i, f, o), i = o, n.current.lanes = i, pt(n, i), Ra(n), e[be] = n.current, ed(e), new ru(n);
  }, go.version = "19.2.7", go;
}
var cy;
function UE() {
  if (cy) return Sd.exports;
  cy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Sd.exports = BE(), Sd.exports;
}
var kE = UE();
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
var Ab = (t) => {
  throw TypeError(t);
}, zb = (t, a, r) => a.has(t) || Ab("Cannot " + r), ea = (t, a, r) => (zb(t, a, "read from private field"), r ? r.call(t) : a.get(t)), So = (t, a, r) => a.has(t) ? Ab("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, r), Ta = (t, a, r, l) => (zb(t, a, "write to private field"), a.set(t, r), r);
function fy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function VE(t = {}) {
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
  function y(b, w = null, N, M) {
    let R = Jd(
      s ? m().pathname : "/",
      b,
      w,
      N,
      M
    );
    return $t(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        b
      )}`
    ), R;
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
      let N = fy(b) ? b : y(b, w);
      u += 1, s.splice(u, s.length, N), l && h && h({ action: c, location: N, delta: 1 });
    },
    replace(b, w) {
      c = "REPLACE";
      let N = fy(b) ? b : y(b, w);
      s[u] = N, l && h && h({ action: c, location: N, delta: 0 });
    },
    go(b) {
      c = "POP";
      let w = g(u + b), N = s[w];
      u = w, h && h({ action: c, location: N, delta: b });
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
function qE() {
  return Math.random().toString(36).substring(2, 10);
}
function Jd(t, a, r = null, l, s) {
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
    key: a && a.key || l || qE(),
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
function YE(t, a, r = !1) {
  let l = "http://localhost";
  t && (l = t.location.origin !== "null" ? t.location.origin : t.location.href), Ze(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : La(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Eo, dy = class {
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
    if (ea(this, Eo).has(t))
      return ea(this, Eo).get(t);
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
    ea(this, Eo).set(t, a);
  }
};
Eo = /* @__PURE__ */ new WeakMap();
var $E = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function IE(t) {
  return $E.has(
    t
  );
}
var XE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function GE(t) {
  return XE.has(
    t
  );
}
function ZE(t) {
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
    ), ZE(u)) {
      let m = {
        ...u,
        id: g
      };
      return l[g] = hy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: g,
        children: void 0
      };
      return l[g] = hy(
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
function hy(t, a) {
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
function Ob(t, a, r = "/") {
  return da(t, a, r, !1);
}
function da(t, a, r, l, s) {
  let u = typeof a == "string" ? va(a) : a, c = aa(u.pathname || "/", r);
  if (c == null)
    return null;
  let h = s ?? Ru(t), g = null, m = l_(c);
  for (let y = 0; g == null && y < h.length; ++y)
    g = i_(
      h[y],
      m,
      l
    );
  return g;
}
function FE(t, a) {
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
function Ru(t) {
  let a = jb(t);
  return QE(a), a;
}
function jb(t, a = [], r = [], l = "", s = !1) {
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
    ), jb(
      c.children,
      a,
      v,
      p,
      g
    )), !(c.path == null && !c.index) && a.push({
      path: p,
      score: n_(p, c.index),
      routesMeta: v
    });
  };
  return t.forEach((c, h) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, h);
    else
      for (let g of Lb(c.path))
        u(c, h, !0, g);
  }), a;
}
function Lb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Lb(l.join("/")), h = [];
  return h.push(
    ...c.map(
      (g) => g === "" ? u : [u, g].join("/")
    )
  ), s && h.push(...c), h.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function QE(t) {
  t.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : a_(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var PE = /^:[\w-]+$/, KE = 3, JE = 2, WE = 1, e_ = 10, t_ = -2, my = (t) => t === "*";
function n_(t, a) {
  let r = t.split("/"), l = r.length;
  return r.some(my) && (l += t_), a && (l += JE), r.filter((s) => !my(s)).reduce(
    (s, u) => s + (PE.test(u) ? KE : u === "" ? WE : e_),
    l
  );
}
function a_(t, a) {
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
function i_(t, a, r = !1) {
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
      pathnameBase: u_(
        na([u, p.pathnameBase])
      ),
      route: v
    }), p.pathnameBase !== "/" && (u = na([u, p.pathnameBase]));
  }
  return c;
}
function Hu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [r, l] = r_(
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
function r_(t, a = !1, r = !0) {
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
function l_(t) {
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
function o_({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : na([t, a]);
}
var Hb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Lh = (t) => Hb.test(t);
function s_(t, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof t == "string" ? va(t) : t, u;
  return r ? (r = Bh(r), r.startsWith("/") ? u = py(r.substring(1), "/") : u = py(r, a)) : u = a, {
    pathname: u,
    search: c_(l),
    hash: f_(s)
  };
}
function py(t, a) {
  let r = Bu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Cd(t, a, r, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Bb(t) {
  return t.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Hh(t) {
  let a = Bb(t);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Pu(t, a, r, l = !1) {
  let s;
  typeof t == "string" ? s = va(t) : (s = { ...t }, Ze(
    !s.pathname || !s.pathname.includes("?"),
    Cd("?", "pathname", "search", s)
  ), Ze(
    !s.pathname || !s.pathname.includes("#"),
    Cd("#", "pathname", "hash", s)
  ), Ze(
    !s.search || !s.search.includes("#"),
    Cd("#", "search", "hash", s)
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
  let g = s_(s, h), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !g.pathname.endsWith("/") && (m || y) && (g.pathname += "/"), g;
}
var Bh = (t) => t.replace(/\/\/+/g, "/"), na = (t) => Bh(t.join("/")), Bu = (t) => t.replace(/\/+$/, ""), u_ = (t) => Bu(t).replace(/^\/*/, "/"), c_ = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, f_ = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, gy = (t, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", t), new Response(null, { ...r, headers: l });
}, Ku = class {
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
var Ub = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function kb(t, a) {
  let r = t;
  if (typeof r != "string" || !Hb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (Ub)
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
var Ii = Symbol("Uninstrumented");
function d_(t, a) {
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
      let c = u[Ii] ?? u, h = ul(
        r[s],
        c,
        (...g) => yy(g[0])
      );
      h && (s === "loader" && c.hydrate === !0 && (h.hydrate = !0), h[Ii] = c, l[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Ii] ?? s, c = ul(
      r.middleware,
      u,
      (...h) => yy(h[0])
    );
    return c ? (c[Ii] = u, c) : s;
  })), l;
}
function h_(t, a) {
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
    let l = t.navigate[Ii] ?? t.navigate, s = ul(
      r.navigate,
      l,
      (...u) => {
        let [c, h] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? La(c) : ".",
          ...vy(t, h ?? {})
        };
      }
    );
    s && (s[Ii] = l, t.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = t.fetch[Ii] ?? t.fetch, s = ul(r.fetch, l, (...u) => {
      let [c, , h, g] = u;
      return {
        href: h ?? ".",
        fetcherKey: c,
        ...vy(t, g ?? {})
      };
    });
    s && (s[Ii] = l, t.fetch = s);
  }
  return t;
}
function ul(t, a, r) {
  return t.length === 0 ? null : async (...l) => {
    let s = await Vb(
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
async function Vb(t, a, r, l) {
  let s = t[l], u;
  if (s) {
    let c, h = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Vb(t, a, r, l - 1), u = await c, Ze(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function yy(t) {
  let { request: a, context: r, params: l, pattern: s } = t;
  return {
    request: m_(a),
    params: { ...l },
    pattern: s,
    context: p_(r)
  };
}
function vy(t, a) {
  return {
    currentUrl: La(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function m_(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function p_(t) {
  if (y_(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var g_ = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function y_(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === g_;
}
var qb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], v_ = new Set(
  qb
), b_ = [
  "GET",
  ...qb
], x_ = new Set(b_), Yb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), w_ = /* @__PURE__ */ new Set([307, 308]), Rd = {
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
}, S_ = {
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
}, E_ = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), $b = "remix-router-transitions", Ib = Symbol("ResetLoaderData"), dr, ll, qi, ol, __ = class {
  constructor(t) {
    So(this, dr), So(this, ll), So(this, qi), So(this, ol), Ta(this, dr, t), Ta(this, ll, Ru(t));
  }
  /** The stable route tree */
  get stableRoutes() {
    return ea(this, dr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return ea(this, qi) ?? ea(this, dr);
  }
  /** Pre-computed branches */
  get branches() {
    return ea(this, ol) ?? ea(this, ll);
  }
  get hasHMRRoutes() {
    return ea(this, qi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    Ta(this, dr, t), Ta(this, ll, Ru(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    Ta(this, qi, t), Ta(this, ol, Ru(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    ea(this, qi) && (Ta(this, dr, ea(this, qi)), Ta(this, ll, ea(this, ol)), Ta(this, qi, void 0), Ta(this, ol, void 0));
  }
};
dr = /* @__PURE__ */ new WeakMap();
ll = /* @__PURE__ */ new WeakMap();
qi = /* @__PURE__ */ new WeakMap();
ol = /* @__PURE__ */ new WeakMap();
function N_(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ze(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], s = t.mapRouteProperties || E_, u = s;
  if (t.instrumentations) {
    let k = t.instrumentations;
    u = (F) => ({
      ...s(F),
      ...d_(
        k.map((W) => W.route).filter(Boolean),
        F
      )
    });
  }
  let c = {}, h = new __(
    Mo(
      t.routes,
      u,
      void 0,
      c
    )
  ), g = t.basename || "/";
  g.startsWith("/") || (g = `/${g}`);
  let m = t.dataStrategy || D_, y = {
    ...t.future
  }, p = null, v = /* @__PURE__ */ new Set(), b = null, w = null, N = null, M = null, R = t.hydrationData != null, z = da(
    h.activeRoutes,
    t.history.location,
    g,
    !1,
    h.branches
  ), E = !1, O = null, H, U;
  if (z == null && !t.patchRoutesOnNavigation) {
    let k = ta(404, {
      pathname: t.history.location.pathname
    }), { matches: F, route: W } = ou(h.activeRoutes);
    H = !0, U = !H, z = F, O = { [W.id]: k };
  } else if (z && !t.hydrationData && mn(
    z,
    h.activeRoutes,
    t.history.location.pathname
  ).active && (z = null), z)
    if (z.some((k) => k.route.lazy))
      H = !1, U = !H;
    else if (!z.some((k) => Uh(k.route)))
      H = !0, U = !H;
    else {
      let k = t.hydrationData ? t.hydrationData.loaderData : null, F = t.hydrationData ? t.hydrationData.errors : null, W = z;
      if (F) {
        let de = z.findIndex(
          (pe) => F[pe.route.id] !== void 0
        );
        W = W.slice(0, de + 1);
      }
      U = !1, H = !0, W.forEach((de) => {
        let pe = Xb(de.route, k, F);
        U = U || pe.renderFallback, H = H && !pe.shouldLoad;
      });
    }
  else {
    H = !1, U = !H, z = [];
    let k = mn(
      null,
      h.activeRoutes,
      t.history.location.pathname
    );
    k.active && k.matches && (E = !0, z = k.matches);
  }
  let B, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: z,
    initialized: H,
    renderFallback: U,
    navigation: Rd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", le = null, $ = !1, K, re = !1, j = /* @__PURE__ */ new Map(), X = null, C = !1, L = !1, Z = /* @__PURE__ */ new Set(), V = /* @__PURE__ */ new Map(), P = 0, D = -1, q = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), te = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), ee, ge = null;
  function ze() {
    if (p = t.history.listen(
      ({ action: k, location: F, delta: W }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        $t(
          me.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = In({
          currentLocation: A.location,
          nextLocation: F,
          historyAction: k
        });
        if (de && W != null) {
          let pe = new Promise((Ee) => {
            ee = Ee;
          });
          t.history.go(W * -1), Dn(de, {
            state: "blocked",
            location: F,
            proceed() {
              Dn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: F
              }), pe.then(() => t.history.go(W));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(de, yo), xe({ blockers: Ee });
            }
          }), le?.resolve(), le = null;
          return;
        }
        return Te(k, F);
      }
    ), r) {
      F_(a, j);
      let k = () => Q_(a, j);
      a.addEventListener("pagehide", k), X = () => a.removeEventListener("pagehide", k);
    }
    return A.initialized || Te("POP", A.location, {
      initialHydration: !0
    }), B;
  }
  function Re() {
    p && p(), X && X(), v.clear(), K && K.abort(), A.fetchers.forEach((k, F) => tn(A.fetchers, F)), A.blockers.forEach((k, F) => ra(F));
  }
  function Se(k) {
    if (v.add(k), b) {
      let { newErrors: F } = b;
      b = null, k(A, {
        deletedFetchers: [],
        newErrors: F,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(k);
  }
  function xe(k, F = {}) {
    k.matches && (k.matches = k.matches.map((pe) => {
      let Ee = c[pe.route.id], ve = pe.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...pe,
        route: Ee
      } : pe;
    })), A = {
      ...A,
      ...k
    };
    let W = [], de = [];
    A.fetchers.forEach((pe, Ee) => {
      pe.state === "idle" && (he.has(Ee) ? W.push(Ee) : de.push(Ee));
    }), he.forEach((pe) => {
      !A.fetchers.has(pe) && !V.has(pe) && W.push(pe);
    }), v.size === 0 && (b = { newErrors: k.errors ?? null }), [...v].forEach(
      (pe) => pe(A, {
        deletedFetchers: W,
        newErrors: k.errors ?? null,
        viewTransitionOpts: F.viewTransitionOpts,
        flushSync: F.flushSync === !0
      })
    ), W.forEach((pe) => tn(A.fetchers, pe)), de.forEach((pe) => A.fetchers.delete(pe));
  }
  function Ce(k, F, { flushSync: W } = {}) {
    let de = A.actionData != null && A.navigation.formMethod != null && dn(A.navigation.formMethod) && A.navigation.state === "loading" && k.state?._isRedirect !== !0, pe;
    F.actionData ? Object.keys(F.actionData).length > 0 ? pe = F.actionData : pe = null : de ? pe = A.actionData : pe = null;
    let Ee = F.loaderData ? My(
      A.loaderData,
      F.loaderData,
      F.matches || [],
      F.errors
    ) : A.loaderData, ve = A.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((De, ke) => ve.set(ke, yo)));
    let we = C ? !1 : Vt(k, F.matches || A.matches), be = $ === !0 || A.navigation.formMethod != null && dn(A.navigation.formMethod) && k.state?._isRedirect !== !0;
    h.commitHmrRoutes(), C || I === "POP" || (I === "PUSH" ? t.history.push(k, k.state) : I === "REPLACE" && t.history.replace(k, k.state));
    let Me;
    if (I === "POP") {
      let De = j.get(A.location.pathname);
      De && De.has(k.pathname) ? Me = {
        currentLocation: A.location,
        nextLocation: k
      } : j.has(k.pathname) && (Me = {
        currentLocation: k,
        nextLocation: A.location
      });
    } else if (re) {
      let De = j.get(A.location.pathname);
      De ? De.add(k.pathname) : (De = /* @__PURE__ */ new Set([k.pathname]), j.set(A.location.pathname, De)), Me = {
        currentLocation: A.location,
        nextLocation: k
      };
    }
    xe(
      {
        ...F,
        // matches, errors, fetchers go through as-is
        actionData: pe,
        loaderData: Ee,
        historyAction: I,
        location: k,
        initialized: !0,
        renderFallback: !1,
        navigation: Rd,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Me,
        flushSync: W === !0
      }
    ), I = "POP", $ = !1, re = !1, C = !1, L = !1, le?.resolve(), le = null, ge?.resolve(), ge = null;
  }
  async function Ye(k, F) {
    if (le?.resolve(), le = null, typeof k == "number") {
      le || (le = Oy());
      let rt = le.promise;
      return t.history.go(k), rt;
    }
    let W = Wd(
      A.location,
      A.matches,
      g,
      k,
      F?.fromRouteId,
      F?.relative
    ), { path: de, submission: pe, error: Ee } = by(
      !1,
      W,
      F
    ), ve;
    F?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof F.mask == "string" ? va(F.mask) : {
        ...A.location.mask,
        ...F.mask
      }
    });
    let we = A.location, be = Jd(
      we,
      de,
      F && F.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...t.history.encodeLocation(be)
    };
    let Me = F && F.replace != null ? F.replace : void 0, De = "PUSH";
    Me === !0 ? De = "REPLACE" : Me === !1 || pe != null && dn(pe.formMethod) && pe.formAction === A.location.pathname + A.location.search && (De = "REPLACE");
    let ke = F && "preventScrollReset" in F ? F.preventScrollReset === !0 : void 0, je = (F && F.flushSync) === !0, Xe = In({
      currentLocation: we,
      nextLocation: be,
      historyAction: De
    });
    if (Xe) {
      Dn(Xe, {
        state: "blocked",
        location: be,
        proceed() {
          Dn(Xe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), Ye(k, F);
        },
        reset() {
          let rt = new Map(A.blockers);
          rt.set(Xe, yo), xe({ blockers: rt });
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
      replace: F && F.replace,
      enableViewTransition: F && F.viewTransition,
      flushSync: je,
      callSiteDefaultShouldRevalidate: F && F.defaultShouldRevalidate
    });
  }
  function ft() {
    ge || (ge = Oy()), Lt(), xe({ revalidation: "loading" });
    let k = ge.promise;
    return A.navigation.state === "submitting" ? k : A.navigation.state === "idle" ? (Te(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), k) : (Te(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: re === !0
      }
    ), k);
  }
  async function Te(k, F, W) {
    K && K.abort(), K = null, I = k, C = (W && W.startUninterruptedRevalidation) === !0, Ht(A.location, A.matches), $ = (W && W.preventScrollReset) === !0, re = (W && W.enableViewTransition) === !0;
    let de = h.activeRoutes, pe = W?.initialHydration && A.matches && A.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : da(
      de,
      F,
      g,
      !1,
      h.branches
    ), Ee = (W && W.flushSync) === !0;
    if (pe && A.initialized && !L && U_(A.location, F) && !(W && W.submission && dn(W.submission.formMethod))) {
      Ce(F, { matches: pe }, { flushSync: Ee });
      return;
    }
    let ve = mn(pe, de, F.pathname);
    if (ve.active && ve.matches && (pe = ve.matches), !pe) {
      let { error: st, notFoundMatches: We, route: jt } = un(
        F.pathname
      );
      Ce(
        F,
        {
          matches: We,
          loaderData: {},
          errors: {
            [jt.id]: st
          }
        },
        { flushSync: Ee }
      );
      return;
    }
    let we = W && W.overrideNavigation ? {
      ...W.overrideNavigation,
      matches: pe,
      historyAction: k
    } : void 0;
    K = new AbortController();
    let be = sl(
      t.history,
      F,
      K.signal,
      W && W.submission
    ), Me = t.getContext ? await t.getContext() : new dy(), De;
    if (W && W.pendingError)
      De = [
        Yi(pe).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && dn(W.submission.formMethod)) {
      let st = await Ge(
        be,
        F,
        W.submission,
        pe,
        k,
        Me,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, jt] = st.pendingActionResult;
        if (Vn(jt) && Do(jt.error) && jt.error.status === 404) {
          K = null, Ce(F, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: jt.error
            }
          });
          return;
        }
      }
      pe = st.matches || pe, De = st.pendingActionResult, we = Td(
        F,
        pe,
        k,
        W.submission
      ), Ee = !1, ve.active = !1, be = sl(
        t.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: ke,
      matches: je,
      loaderData: Xe,
      errors: rt,
      workingFetchers: Ct
    } = await Be(
      be,
      F,
      pe,
      k,
      Me,
      ve.active,
      we,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      De,
      W && W.callSiteDefaultShouldRevalidate
    );
    ke || (K = null, Ce(F, {
      matches: je || pe,
      ...Dy(De),
      loaderData: Xe,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Ge(k, F, W, de, pe, Ee, ve, we, be = {}) {
    Lt();
    let Me = G_(
      F,
      de,
      pe,
      W
    );
    if (xe({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await pt(
        de,
        F.pathname,
        k.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = ou(
            h.activeRoutes
          );
          return {
            matches: rt,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: je.error
              }
            ]
          };
        }
        let Xe = Yi(je.partialMatches).route.id;
        return {
          matches: je.partialMatches,
          pendingActionResult: [
            Xe,
            {
              type: "error",
              error: je.error
            }
          ]
        };
      } else if (je.matches)
        de = je.matches;
      else {
        let { notFoundMatches: Xe, error: rt, route: Ct } = un(
          F.pathname
        );
        return {
          matches: Xe,
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
    let De, ke = Tu(de, F);
    if (!ke.route.action && !ke.route.lazy)
      De = {
        type: "error",
        error: ta(405, {
          method: k.method,
          pathname: F.pathname,
          routeId: ke.route.id
        })
      };
    else {
      let je = dl(
        u,
        c,
        k,
        F,
        de,
        ke,
        we ? [] : l,
        Ee
      ), Xe = await yt(
        k,
        F,
        je,
        Ee,
        null
      );
      if (De = Xe[ke.route.id], !De) {
        for (let rt of de)
          if (Xe[rt.route.id]) {
            De = Xe[rt.route.id];
            break;
          }
      }
      if (k.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (mr(De)) {
      let je;
      return be && be.replace != null ? je = be.replace : je = Cy(
        De.response.headers.get("Location"),
        new URL(k.url),
        g,
        t.history
      ) === A.location.pathname + A.location.search, await gt(k, De, !0, {
        submission: W,
        replace: je
      }), { shortCircuited: !0 };
    }
    if (Vn(De)) {
      let je = Yi(de, ke.route.id);
      return (be && be.replace) !== !0 && (I = "PUSH"), {
        matches: de,
        pendingActionResult: [
          je.route.id,
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
  async function Be(k, F, W, de, pe, Ee, ve, we, be, Me, De, ke, je, Xe) {
    let rt = ve || Td(F, W, de, we), Ct = we || be || zy(rt), st = !C && !De;
    if (Ee) {
      if (st) {
        let bt = $e(je);
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
        W,
        F.pathname,
        k.signal
      );
      if (Ue.type === "aborted")
        return { shortCircuited: !0 };
      if (Ue.type === "error") {
        if (Ue.partialMatches.length === 0) {
          let { matches: pn, route: zn } = ou(
            h.activeRoutes
          );
          return {
            matches: pn,
            loaderData: {},
            errors: {
              [zn.id]: Ue.error
            }
          };
        }
        let bt = Yi(Ue.partialMatches).route.id;
        return {
          matches: Ue.partialMatches,
          loaderData: {},
          errors: {
            [bt]: Ue.error
          }
        };
      } else if (Ue.matches)
        W = Ue.matches;
      else {
        let { error: bt, notFoundMatches: pn, route: zn } = un(
          F.pathname
        );
        return {
          matches: pn,
          loaderData: {},
          errors: {
            [zn.id]: bt
          }
        };
      }
    }
    let We = h.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = xy(
      k,
      pe,
      u,
      c,
      t.history,
      A,
      W,
      Ct,
      F,
      De ? [] : l,
      De === !0,
      L,
      Z,
      he,
      te,
      Q,
      We,
      g,
      t.patchRoutesOnNavigation != null,
      h.branches,
      je,
      Xe
    );
    if (D = ++P, !t.dataStrategy && !jt.some((Ue) => Ue.shouldLoad) && !jt.some(
      (Ue) => Ue.route.middleware && Ue.route.middleware.length > 0
    ) && at.length === 0) {
      let Ue = new Map(A.fetchers), bt = fi(Ue);
      return Ce(
        F,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: je && Vn(je[1]) ? { [je[0]]: je[1].error } : null,
          ...Dy(je),
          ...bt ? { fetchers: Ue } : {}
        },
        { flushSync: ke }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Ue = {};
      if (!Ee) {
        Ue.navigation = rt;
        let bt = $e(je);
        bt !== void 0 && (Ue.actionData = bt);
      }
      at.length > 0 && (Ue.fetchers = St(at)), xe(Ue, { flushSync: ke });
    }
    at.forEach((Ue) => {
      Ot(Ue.key), Ue.controller && V.set(Ue.key, Ue.controller);
    });
    let Ea = () => at.forEach((Ue) => Ot(Ue.key));
    K && K.signal.addEventListener(
      "abort",
      Ea
    );
    let { loaderResults: An, fetcherResults: cn } = await It(
      jt,
      at,
      k,
      F,
      pe
    );
    if (k.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      Ea
    ), at.forEach((Ue) => V.delete(Ue.key));
    let nn = su(An);
    if (nn)
      return await gt(k, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (nn = su(cn), nn)
      return Q.add(nn.key), await gt(k, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let bn = new Map(A.fetchers), { loaderData: di, errors: xn } = Ty(
      A,
      W,
      An,
      je,
      at,
      cn,
      bn
    );
    De && A.errors && (xn = { ...A.errors, ...xn });
    let hi = fi(bn), oa = Sa(
      D,
      bn
    ), sa = hi || oa || at.length > 0;
    return {
      matches: W,
      loaderData: di,
      errors: xn,
      ...sa ? { workingFetchers: bn } : {}
    };
  }
  function $e(k) {
    if (k && !Vn(k[1]))
      return {
        [k[0]]: k[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function St(k) {
    let F = new Map(A.fetchers);
    return k.forEach((W) => {
      let de = F.get(W.key), pe = vo(
        void 0,
        de ? de.data : void 0
      );
      F.set(W.key, pe);
    }), F;
  }
  async function Je(k, F, W, de) {
    Ot(k);
    let pe = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = Wd(
      A.location,
      A.matches,
      g,
      W,
      F,
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
        k,
        F,
        ta(404, { pathname: ve }),
        { flushSync: pe }
      );
      return;
    }
    let { path: Me, submission: De, error: ke } = by(
      !0,
      ve,
      de
    );
    if (ke) {
      ot(k, F, ke, { flushSync: pe });
      return;
    }
    let je = t.getContext ? await t.getContext() : new dy(), Xe = (de && de.preventScrollReset) === !0;
    if (De && dn(De.formMethod)) {
      await Fe(
        k,
        F,
        Me,
        we,
        je,
        be.active,
        pe,
        Xe,
        De,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    te.set(k, { routeId: F, path: Me }), await Qe(
      k,
      F,
      Me,
      we,
      je,
      be.active,
      pe,
      Xe,
      De
    );
  }
  async function Fe(k, F, W, de, pe, Ee, ve, we, be, Me) {
    Lt(), te.delete(k);
    let De = A.fetchers.get(k);
    mt(k, Z_(be, De), {
      flushSync: ve
    });
    let ke = new AbortController(), je = sl(
      t.history,
      W,
      ke.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        de,
        new URL(je.url).pathname,
        je.signal,
        k
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(k, F, dt.error, { flushSync: ve });
        return;
      } else if (dt.matches)
        de = dt.matches;
      else {
        ot(
          k,
          F,
          ta(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Xe = Tu(de, W);
    if (!Xe.route.action && !Xe.route.lazy) {
      let dt = ta(405, {
        method: be.formMethod,
        pathname: W,
        routeId: F
      });
      ot(k, F, dt, { flushSync: ve });
      return;
    }
    V.set(k, ke);
    let rt = P, Ct = dl(
      u,
      c,
      je,
      W,
      de,
      Xe,
      l,
      pe
    ), st = await yt(
      je,
      W,
      Ct,
      pe,
      k
    ), We = st[Xe.route.id];
    if (!We) {
      for (let dt of Ct)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (je.signal.aborted) {
      V.get(k) === ke && V.delete(k);
      return;
    }
    if (he.has(k)) {
      if (mr(We) || Vn(We)) {
        mt(k, Da(void 0));
        return;
      }
    } else {
      if (mr(We))
        if (V.delete(k), D > rt) {
          mt(k, Da(void 0));
          return;
        } else
          return Q.add(k), mt(k, vo(be)), gt(je, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: we
          });
      if (Vn(We)) {
        ot(k, F, We.error);
        return;
      }
    }
    let jt = A.navigation.location || A.location, at = sl(
      t.history,
      jt,
      ke.signal
    ), Ea = h.activeRoutes, An = A.navigation.state !== "idle" ? da(
      Ea,
      A.navigation.location,
      g,
      !1,
      h.branches
    ) : A.matches;
    Ze(An, "Didn't find any matches after fetcher action");
    let cn = ++P;
    q.set(k, cn);
    let { dsMatches: nn, revalidatingFetchers: bn } = xy(
      at,
      pe,
      u,
      c,
      t.history,
      A,
      An,
      be,
      jt,
      l,
      !1,
      L,
      Z,
      he,
      te,
      Q,
      Ea,
      g,
      t.patchRoutesOnNavigation != null,
      h.branches,
      [Xe.route.id, We],
      Me
    ), di = vo(be, We.data), xn = new Map(A.fetchers);
    xn.set(k, di), bn.filter((dt) => dt.key !== k).forEach((dt) => {
      let Xn = dt.key, an = xn.get(Xn), Gi = vo(
        void 0,
        an ? an.data : void 0
      );
      xn.set(Xn, Gi), Ot(Xn), dt.controller && V.set(Xn, dt.controller);
    }), xe({ fetchers: xn });
    let hi = () => bn.forEach((dt) => Ot(dt.key));
    ke.signal.addEventListener(
      "abort",
      hi
    );
    let { loaderResults: oa, fetcherResults: sa } = await It(
      nn,
      bn,
      at,
      jt,
      pe
    );
    if (ke.signal.aborted)
      return;
    ke.signal.removeEventListener(
      "abort",
      hi
    ), q.delete(k), V.delete(k), bn.forEach((dt) => V.delete(dt.key));
    let Ue = A.fetchers.has(k), bt = (dt) => {
      if (!Ue) return dt;
      let Xn = new Map(dt.fetchers);
      return Xn.set(k, Da(We.data)), { ...dt, fetchers: Xn };
    }, pn = su(oa);
    if (pn)
      return A = bt(A), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: we }
      );
    if (pn = su(sa), pn)
      return Q.add(pn.key), A = bt(A), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: we }
      );
    let zn = new Map(A.fetchers);
    Ue && zn.set(k, Da(We.data));
    let { loaderData: mi, errors: Ba } = Ty(
      A,
      An,
      oa,
      void 0,
      bn,
      sa,
      zn
    );
    Sa(cn, zn), A.navigation.state === "loading" && cn > D ? (Ze(I, "Expected pending action"), K && K.abort(), Ce(A.navigation.location, {
      matches: An,
      loaderData: mi,
      errors: Ba,
      fetchers: zn
    })) : (xe({
      errors: Ba,
      loaderData: My(
        A.loaderData,
        mi,
        An,
        Ba
      ),
      fetchers: zn
    }), L = !1);
  }
  async function Qe(k, F, W, de, pe, Ee, ve, we, be) {
    let Me = A.fetchers.get(k);
    mt(
      k,
      vo(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let De = new AbortController(), ke = sl(
      t.history,
      W,
      De.signal
    );
    if (Ee) {
      let We = await pt(
        de,
        new URL(ke.url).pathname,
        ke.signal,
        k
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(k, F, We.error, { flushSync: ve });
        return;
      } else if (We.matches)
        de = We.matches;
      else {
        ot(
          k,
          F,
          ta(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let je = Tu(de, W);
    V.set(k, De);
    let Xe = P, rt = dl(
      u,
      c,
      ke,
      W,
      de,
      je,
      l,
      pe
    ), Ct = await yt(
      ke,
      W,
      rt,
      pe,
      k
    ), st = Ct[je.route.id];
    if (!st) {
      for (let We of de)
        if (Ct[We.route.id]) {
          st = Ct[We.route.id];
          break;
        }
    }
    if (V.get(k) === De && V.delete(k), !ke.signal.aborted) {
      if (he.has(k)) {
        mt(k, Da(void 0));
        return;
      }
      if (mr(st))
        if (D > Xe) {
          mt(k, Da(void 0));
          return;
        } else {
          Q.add(k), await gt(ke, st, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (Vn(st)) {
        ot(k, F, st.error);
        return;
      }
      mt(k, Da(st.data));
    }
  }
  async function gt(k, F, W, {
    submission: de,
    fetcherSubmission: pe,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    W || (le?.resolve(), le = null), F.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let we = F.response.headers.get("Location");
    Ze(we, "Expected a Location header on the redirect Response"), we = Cy(
      we,
      new URL(k.url),
      g,
      t.history
    );
    let be = Jd(A.location, we, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (F.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (Lh(we)) {
        const Ct = YE(a, we, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(Ct.pathname, g) == null;
      }
      if (rt) {
        ve ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    K = null;
    let Me = ve === !0 || F.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: ke, formEncType: je } = A.navigation;
    !de && !pe && De && ke && je && (de = zy(A.navigation));
    let Xe = de || pe;
    if (w_.has(F.response.status) && Xe && dn(Xe.formMethod))
      await Te(Me, be, {
        submission: {
          ...Xe,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? re : void 0
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
        enableViewTransition: W ? re : void 0
      });
    }
  }
  async function yt(k, F, W, de, pe) {
    let Ee, ve = {};
    try {
      Ee = await z_(
        m,
        k,
        F,
        W,
        pe,
        de,
        !1
      );
    } catch (we) {
      return W.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: we
        };
      }), ve;
    }
    if (k.signal.aborted)
      return ve;
    if (!dn(k.method))
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
      if (Y_(be)) {
        let Me = be.result;
        ve[we] = {
          type: "redirect",
          response: H_(
            Me,
            k,
            we,
            W,
            g
          )
        };
      } else
        ve[we] = await L_(be);
    return ve;
  }
  async function It(k, F, W, de, pe) {
    let Ee = yt(
      W,
      de,
      k,
      pe,
      null
    ), ve = Promise.all(
      F.map(async (Me) => {
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
              error: ta(404, {
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
  function Lt() {
    L = !0, te.forEach((k, F) => {
      V.has(F) && Z.add(F), Ot(F);
    });
  }
  function mt(k, F, W = {}) {
    let de = new Map(A.fetchers);
    de.set(k, F), xe(
      { fetchers: de },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function ot(k, F, W, de = {}) {
    let pe = Yi(A.matches, F), Ee = new Map(A.fetchers);
    tn(Ee, k), xe(
      {
        errors: {
          [pe.route.id]: W
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function $n(k) {
    return se.set(k, (se.get(k) || 0) + 1), he.has(k) && he.delete(k), A.fetchers.get(k) || S_;
  }
  function yn(k, F) {
    Ot(k, F?.reason), mt(k, Da(null));
  }
  function tn(k, F) {
    let W = A.fetchers.get(F);
    V.has(F) && !(W && W.state === "loading" && q.has(F)) && Ot(F), te.delete(F), q.delete(F), Q.delete(F), he.delete(F), Z.delete(F), k.delete(F);
  }
  function Pt(k) {
    let F = (se.get(k) || 0) - 1;
    F <= 0 ? (se.delete(k), he.add(k)) : se.set(k, F), xe({ fetchers: new Map(A.fetchers) });
  }
  function Ot(k, F) {
    let W = V.get(k);
    W && (W.abort(F), V.delete(k));
  }
  function kt(k, F) {
    for (let W of k) {
      let de = F.get(W);
      Ze(de, `Expected fetcher: ${W}`);
      let pe = Da(de.data);
      F.set(W, pe);
    }
  }
  function fi(k) {
    let F = [], W = !1;
    for (let de of Q) {
      let pe = k.get(de);
      Ze(pe, `Expected fetcher: ${de}`), pe.state === "loading" && (Q.delete(de), F.push(de), W = !0);
    }
    return kt(F, k), W;
  }
  function Sa(k, F) {
    let W = [];
    for (let [de, pe] of q)
      if (pe < k) {
        let Ee = F.get(de);
        Ze(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Ot(de), q.delete(de), W.push(de));
      }
    return kt(W, F), W.length > 0;
  }
  function vn(k, F) {
    let W = A.blockers.get(k) || yo;
    return me.get(k) !== F && me.set(k, F), W;
  }
  function ra(k) {
    A.blockers.delete(k), me.delete(k);
  }
  function Dn(k, F) {
    let W = A.blockers.get(k) || yo;
    Ze(
      W.state === "unblocked" && F.state === "blocked" || W.state === "blocked" && F.state === "blocked" || W.state === "blocked" && F.state === "proceeding" || W.state === "blocked" && F.state === "unblocked" || W.state === "proceeding" && F.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${F.state}`
    );
    let de = new Map(A.blockers);
    de.set(k, F), xe({ blockers: de });
  }
  function In({
    currentLocation: k,
    nextLocation: F,
    historyAction: W
  }) {
    if (me.size === 0)
      return;
    me.size > 1 && $t(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [pe, Ee] = de[de.length - 1], ve = A.blockers.get(pe);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: k, nextLocation: F, historyAction: W }))
      return pe;
  }
  function un(k) {
    let F = ta(404, { pathname: k }), W = h.activeRoutes, { matches: de, route: pe } = ou(W);
    return { notFoundMatches: de, route: pe, error: F };
  }
  function He(k, F, W) {
    if (w = k, M = F, N = W || null, !R && A.navigation === Rd) {
      R = !0;
      let de = Vt(A.location, A.matches);
      de != null && xe({ restoreScrollPosition: de });
    }
    return () => {
      w = null, M = null, N = null;
    };
  }
  function vt(k, F) {
    return N && N(
      k,
      F.map((de) => FE(de, A.loaderData))
    ) || k.key;
  }
  function Ht(k, F) {
    if (w && M) {
      let W = vt(k, F);
      w[W] = M();
    }
  }
  function Vt(k, F) {
    if (w) {
      let W = vt(k, F), de = w[W];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function mn(k, F, W) {
    if (t.patchRoutesOnNavigation) {
      let de = h.branches;
      if (k) {
        if (Object.keys(k[0].params).length > 0)
          return { active: !0, matches: da(
            F,
            W,
            g,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: da(
          F,
          W,
          g,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(k, F, W, de) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: k };
    let pe = k;
    for (; ; ) {
      let Ee = c;
      try {
        await t.patchRoutesOnNavigation({
          signal: W,
          path: F,
          matches: pe,
          fetcherKey: de,
          patch: (Me, De) => {
            W.aborted || wy(
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
      if (W.aborted)
        return { type: "aborted" };
      let ve = h.branches, we = da(
        h.activeRoutes,
        F,
        g,
        !1,
        ve
      ), be = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0)
          return { type: "success", matches: we };
        if (be = da(
          h.activeRoutes,
          F,
          g,
          !0,
          ve
        ), !(be && pe.length < be.length && Kt(
          pe,
          be.slice(0, pe.length)
        )))
          return { type: "success", matches: we };
      }
      if (be || (be = da(
        h.activeRoutes,
        F,
        g,
        !0,
        ve
      )), !be || Kt(pe, be))
        return { type: "success", matches: null };
      pe = be;
    }
  }
  function Kt(k, F) {
    return k.length === F.length && k.every((W, de) => W.route.id === F[de].route.id);
  }
  function la(k) {
    c = {}, h.setHmrRoutes(
      Mo(
        k,
        u,
        void 0,
        c
      )
    );
  }
  function Wt(k, F, W = !1) {
    wy(
      k,
      F,
      h,
      c,
      u,
      W
    ), h.hasHMRRoutes || xe({});
  }
  return B = {
    get basename() {
      return g;
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
    createHref: (k) => t.history.createHref(k),
    encodeLocation: (k) => t.history.encodeLocation(k),
    getFetcher: $n,
    resetFetcher: yn,
    deleteFetcher: Pt,
    dispose: Re,
    getBlocker: vn,
    deleteBlocker: ra,
    patchRoutes: Wt,
    _internalFetchControllers: V,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: la,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(k) {
      xe(k);
    }
  }, t.instrumentations && (B = h_(
    B,
    t.instrumentations.map((k) => k.router).filter(Boolean)
  )), B;
}
function C_(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Wd(t, a, r, l, s, u) {
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
  let g = Pu(
    l || ".",
    Hh(c),
    aa(t.pathname, r) || t.pathname,
    u === "path"
  );
  if (l == null && (g.search = t.search, g.hash = t.hash), (l == null || l === "" || l === ".") && h) {
    let m = Vh(g.search);
    if (h.route.index && !m)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(g.search), p = y.getAll("index");
      y.delete("index"), p.filter((b) => b).forEach((b) => y.append("index", b));
      let v = y.toString();
      g.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (g.pathname = o_({ basename: r, pathname: g.pathname })), La(g);
}
function by(t, a, r) {
  if (!r || !C_(r))
    return { path: a };
  if (r.formMethod && !X_(r.formMethod))
    return {
      path: a,
      error: ta(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: ta(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = Jb(a);
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
    h = th(r.formData), g = r.formData;
  else if (r.body instanceof FormData)
    h = th(r.body), g = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, g = Ry(h);
  else if (r.body == null)
    h = new URLSearchParams(), g = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), g = Ry(h);
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
  return t && y.search && Vh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: La(y), submission: m };
}
function xy(t, a, r, l, s, u, c, h, g, m, y, p, v, b, w, N, M, R, z, E, O, H) {
  let U = O ? Vn(O[1]) ? O[1].error : O[1].data : void 0, B = s.createURL(u.location), A = s.createURL(g), I;
  if (y && u.errors) {
    let C = Object.keys(u.errors)[0];
    I = c.findIndex((L) => L.route.id === C);
  } else if (O && Vn(O[1])) {
    let C = O[0];
    I = c.findIndex((L) => L.route.id === C) - 1;
  }
  let le = O ? O[1].statusCode : void 0, $ = le && le >= 400, K = {
    currentUrl: B,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...h,
    actionResult: U,
    actionStatus: le
  }, re = Yo(c), j = c.map((C, L) => {
    let { route: Z } = C, V = null;
    if (I != null && L > I)
      V = !1;
    else if (Z.lazy)
      V = !0;
    else if (!Uh(Z))
      V = !1;
    else if (y) {
      let { shouldLoad: Q } = Xb(
        Z,
        u.loaderData,
        u.errors
      );
      V = Q;
    } else R_(u.loaderData, u.matches[L], C) && (V = !0);
    if (V !== null)
      return eh(
        r,
        l,
        t,
        g,
        re,
        C,
        m,
        a,
        V
      );
    let P = !1;
    typeof H == "boolean" ? P = H : $ ? P = !1 : (p || B.pathname + B.search === A.pathname + A.search || B.search !== A.search || T_(u.matches[L], C)) && (P = !0);
    let D = {
      ...K,
      defaultShouldRevalidate: P
    }, q = Co(C, D);
    return eh(
      r,
      l,
      t,
      g,
      re,
      C,
      m,
      a,
      q,
      D,
      H
    );
  }), X = [];
  return w.forEach((C, L) => {
    if (y || !c.some((se) => se.route.id === C.routeId) || b.has(L))
      return;
    let Z = u.fetchers.get(L), V = Z && Z.state !== "idle" && Z.data === void 0, P = da(
      M,
      C.path,
      R ?? "/",
      !1,
      E
    );
    if (!P) {
      if (z && V)
        return;
      X.push({
        key: L,
        routeId: C.routeId,
        path: C.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(L))
      return;
    let D = Tu(P, C.path), q = new AbortController(), Q = sl(
      s,
      C.path,
      q.signal
    ), te = null;
    if (v.has(L))
      v.delete(L), te = dl(
        r,
        l,
        Q,
        C.path,
        P,
        D,
        m,
        a
      );
    else if (V)
      p && (te = dl(
        r,
        l,
        Q,
        C.path,
        P,
        D,
        m,
        a
      ));
    else {
      let se;
      typeof H == "boolean" ? se = H : $ ? se = !1 : se = p;
      let he = {
        ...K,
        defaultShouldRevalidate: se
      };
      Co(D, he) && (te = dl(
        r,
        l,
        Q,
        C.path,
        P,
        D,
        m,
        a,
        he
      ));
    }
    te && X.push({
      key: L,
      routeId: C.routeId,
      path: C.path,
      matches: te,
      match: D,
      request: Q,
      controller: q
    });
  }), { dsMatches: j, revalidatingFetchers: X };
}
function Uh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Xb(t, a, r) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Uh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, s = r != null && r[t.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function R_(t, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !t.hasOwnProperty(r.route.id);
  return l || s;
}
function T_(t, a) {
  let r = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function Co(t, a) {
  if (t.route.shouldRevalidate) {
    let r = t.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function wy(t, a, r, l, s, u) {
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
      (p) => Gb(m, p)
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
function Gb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (r, l) => a.children?.some((s) => Gb(r, s))
  ) ?? !1 : !1;
}
var Sy = /* @__PURE__ */ new WeakMap(), Zb = ({
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
  let c = Sy.get(s);
  c || (c = {}, Sy.set(s, c));
  let h = c[t];
  if (h)
    return h;
  let g = (async () => {
    let m = IE(t), p = s[t] !== void 0 && t !== "hasErrorBoundary";
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
}, Ey = /* @__PURE__ */ new WeakMap();
function M_(t, a, r, l, s) {
  let u = r[t.id];
  if (Ze(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = Ey.get(u);
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
        let N = v[w];
        if (N === void 0)
          continue;
        let M = GE(w), z = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        M ? $t(
          !M,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? $t(
          !z,
          `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : b[w] = N;
      }
      Object.assign(u, b), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return Ey.set(u, p), p.catch(() => {
    }), {
      lazyRoutePromise: p,
      lazyHandlerPromise: p
    };
  }
  let c = Object.keys(t.lazy), h = [], g;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let p = Zb({
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
async function _y(t) {
  let a = t.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function D_(t) {
  return t.matches.some((a) => a.route.middleware) ? Fb(t, () => _y(t)) : _y(t);
}
function Fb(t, a) {
  return A_(
    t,
    a,
    (l) => {
      if (I_(l))
        throw l;
      return l;
    },
    V_,
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
      ), g = Yi(
        c,
        c[h].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: l }
      });
    }
  }
}
async function A_(t, a, r, l, s) {
  let { matches: u, ...c } = t, h = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await Qb(
    c,
    h,
    a,
    r,
    l,
    s
  );
}
async function Qb(t, a, r, l, s, u, c = 0) {
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
      return p = { value: await Qb(
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
function Pb(t, a, r, l, s) {
  let u = Zb({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), c = M_(
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
function eh(t, a, r, l, s, u, c, h, g, m = null, y) {
  let p = !1, v = Pb(
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
      return p = !0, m ? typeof y == "boolean" ? Co(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof b == "boolean" ? Co(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : Co(u, m) : g;
    },
    resolve(b) {
      let { lazy: w, loader: N, middleware: M } = u.route, R = p || g || b && !dn(r.method) && (w || N), z = M && M.length > 0 && !N && !w;
      return R && (dn(r.method) || !z) ? O_({
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
    _lazyPromises: Pb(
      t,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : eh(
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
async function z_(t, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: Kb(a, r),
    pattern: Yo(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let p = h;
      return Fb(p, () => y({
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
async function O_({
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
    let w, N = new Promise((z, E) => w = E);
    m = () => w(), t.signal.addEventListener("abort", m);
    let M = (z) => typeof b != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${p}" [routeId: ${l.route.id}]`
      )
    ) : b(
      {
        request: t,
        url: Kb(t, a),
        pattern: r,
        params: l.params,
        context: h
      },
      ...z !== void 0 ? [z] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => M(E)) : M()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([R, N]);
  };
  try {
    let b = y ? l.route.action : l.route.loader;
    if (s || u)
      if (b) {
        let w, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(b).catch((M) => {
            w = M;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (w !== void 0)
          throw w;
        g = N;
      } else {
        await s;
        let w = y ? l.route.action : l.route.loader;
        if (w)
          [g] = await Promise.all([v(w), u]);
        else if (p === "action") {
          let N = new URL(t.url), M = N.pathname + N.search;
          throw ta(405, {
            method: t.method,
            pathname: M,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (b)
      g = await v(b);
    else {
      let w = new URL(t.url), N = w.pathname + w.search;
      throw ta(404, {
        pathname: N
      });
    }
  } catch (b) {
    return { type: "error", result: b };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return g;
}
async function j_(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function L_(t) {
  let { result: a, type: r } = t;
  if (kh(a)) {
    let l;
    try {
      l = await j_(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new Ku(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Ay(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: k_(a),
    statusCode: Do(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Do(a) ? a.status : void 0
  } : Ay(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function H_(t, a, r, l, s) {
  let u = t.headers.get("Location");
  if (Ze(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Lh(u)) {
    let c = l.slice(
      0,
      l.findIndex((h) => h.route.id === r) + 1
    );
    u = Wd(
      new URL(a.url),
      c,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var Ny = [
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
function Cy(t, a, r, l) {
  if (Lh(t)) {
    let s = t, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (Ny.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = aa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return Bh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(t);
    if (Ny.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function sl(t, a, r, l) {
  let s = t.createURL(Jb(a)).toString(), u = { signal: r };
  if (l && dn(l.formMethod)) {
    let { formMethod: c, formEncType: h } = l;
    u.method = c.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(l.json)) : h === "text/plain" ? u.body = l.text : h === "application/x-www-form-urlencoded" && l.formData ? u.body = th(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function Kb(t, a) {
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
function th(t) {
  let a = new URLSearchParams();
  for (let [r, l] of t.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function Ry(t) {
  let a = new FormData();
  for (let [r, l] of t.entries())
    a.append(r, l);
  return a;
}
function B_(t, a, r, l = !1, s = !1) {
  let u = {}, c = null, h, g = !1, m = {}, y = r && Vn(r[1]) ? r[1].error : void 0;
  return t.forEach((p) => {
    if (!(p.route.id in a))
      return;
    let v = p.route.id, b = a[v];
    if (Ze(
      !mr(b),
      "Cannot handle redirect results in processLoaderData"
    ), Vn(b)) {
      let w = b.error;
      if (y !== void 0 && (w = y, y = void 0), c = c || {}, s)
        c[v] = w;
      else {
        let N = Yi(t, v);
        c[N.route.id] == null && (c[N.route.id] = w);
      }
      l || (u[v] = Ib), g || (g = !0, h = Do(b.error) ? b.error.status : 500), b.headers && (m[v] = b.headers);
    } else
      u[v] = b.data, b.statusCode && b.statusCode !== 200 && !g && (h = b.statusCode), b.headers && (m[v] = b.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function Ty(t, a, r, l, s, u, c) {
  let { loaderData: h, errors: g } = B_(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: p, controller: v } = m;
    if (v && v.signal.aborted)
      return;
    let b = u[y];
    if (Ze(b, "Did not find corresponding fetcher result"), Vn(b)) {
      let w = Yi(t.matches, p?.route.id);
      g && g[w.route.id] || (g = {
        ...g,
        [w.route.id]: b.error
      }), c.delete(y);
    } else if (mr(b))
      Ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Da(b.data);
      c.set(y, w);
    }
  }), { loaderData: h, errors: g };
}
function My(t, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== Ib).reduce((u, [c, h]) => (u[c] = h, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && t.hasOwnProperty(c) && u.route.loader && (s[c] = t[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Dy(t) {
  return t ? Vn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function Yi(t, a) {
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
function ta(t, {
  pathname: a,
  routeId: r,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (c = "Bad Request", l && a && r ? h = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (c = "Forbidden", h = `Route "${r}" does not match URL "${a}"`) : t === 404 ? (c = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (c = "Method Not Allowed", l && a && r ? h = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (h = `Invalid request method "${l.toUpperCase()}"`)), new Ku(
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
function Jb(t) {
  let a = typeof t == "string" ? va(t) : t;
  return La({ ...a, hash: "" });
}
function U_(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function k_(t) {
  return new Ku(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function V_(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, r]) => typeof a == "string" && q_(r)
  );
}
function q_(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function Y_(t) {
  return kh(t.result) && Yb.has(t.result.status);
}
function Vn(t) {
  return t.type === "error";
}
function mr(t) {
  return (t && t.type) === "redirect";
}
function Ay(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function kh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function $_(t) {
  return Yb.has(t);
}
function I_(t) {
  return kh(t) && $_(t.status) && t.headers.has("Location");
}
function X_(t) {
  return x_.has(t.toUpperCase());
}
function dn(t) {
  return v_.has(t.toUpperCase());
}
function Vh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Tu(t, a) {
  let r = typeof a == "string" ? va(a).search : a.search;
  if (t[t.length - 1].route.index && Vh(r || ""))
    return t[t.length - 1];
  let l = Bb(t);
  return l[l.length - 1];
}
function zy(t) {
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
function G_(t, a, r, l) {
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
function Z_(t, a) {
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
function Da(t) {
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
function F_(t, a) {
  try {
    let r = t.sessionStorage.getItem(
      $b
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function Q_(t, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      t.sessionStorage.setItem(
        $b,
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
function Oy() {
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
var _r = _.createContext(null);
_r.displayName = "DataRouter";
var $o = _.createContext(null);
$o.displayName = "DataRouterState";
var Wb = _.createContext(!1);
function e1() {
  return _.useContext(Wb);
}
var qh = _.createContext({
  isTransitioning: !1
});
qh.displayName = "ViewTransition";
var t1 = _.createContext(
  /* @__PURE__ */ new Map()
);
t1.displayName = "Fetchers";
var P_ = _.createContext(null);
P_.displayName = "Await";
var ia = _.createContext(
  null
);
ia.displayName = "Navigation";
var Ju = _.createContext(
  null
);
Ju.displayName = "Location";
var ba = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ba.displayName = "Route";
var Yh = _.createContext(null);
Yh.displayName = "RouteError";
var n1 = "REACT_ROUTER_ERROR", K_ = "REDIRECT", J_ = "ROUTE_ERROR_RESPONSE";
function W_(t) {
  if (t.startsWith(`${n1}:${K_}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function e2(t) {
  if (t.startsWith(
    `${n1}:${J_}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ku(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function t2(t, { relative: a } = {}) {
  Ze(
    Io(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = _.useContext(ia), { hash: s, pathname: u, search: c } = Xo(t, { relative: a }), h = u;
  return r !== "/" && (h = u === "/" ? r : na([r, u])), l.createHref({ pathname: h, search: c, hash: s });
}
function Io() {
  return _.useContext(Ju) != null;
}
function ui() {
  return Ze(
    Io(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), _.useContext(Ju).location;
}
var a1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function i1(t) {
  _.useContext(ia).static || _.useLayoutEffect(t);
}
function n2() {
  let { isDataRoute: t } = _.useContext(ba);
  return t ? v2() : a2();
}
function a2() {
  Ze(
    Io(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = _.useContext(_r), { basename: a, navigator: r } = _.useContext(ia), { matches: l } = _.useContext(ba), { pathname: s } = ui(), u = JSON.stringify(Hh(l)), c = _.useRef(!1);
  return i1(() => {
    c.current = !0;
  }), _.useCallback(
    (g, m = {}) => {
      if ($t(c.current, a1), !c.current) return;
      if (typeof g == "number") {
        r.go(g);
        return;
      }
      let y = Pu(
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
var i2 = _.createContext(null);
function r2(t) {
  let a = _.useContext(ba).outlet;
  return _.useMemo(
    () => a && /* @__PURE__ */ _.createElement(i2.Provider, { value: t }, a),
    [a, t]
  );
}
function l2() {
  let { matches: t } = _.useContext(ba);
  return t[t.length - 1]?.params ?? {};
}
function Xo(t, { relative: a } = {}) {
  let { matches: r } = _.useContext(ba), { pathname: l } = ui(), s = JSON.stringify(Hh(r));
  return _.useMemo(
    () => Pu(
      t,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [t, s, l, a]
  );
}
function o2(t, a, r) {
  Ze(
    Io(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = _.useContext(ia), { matches: s } = _.useContext(ba), u = s[s.length - 1], c = u ? u.params : {}, h = u ? u.pathname : "/", g = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let M = m && m.path || "";
    o1(
      h,
      !m || M.endsWith("*") || M.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M === "/" ? "*" : `${M}/*`}">.`
    );
  }
  let y = ui(), p;
  p = y;
  let v = p.pathname || "/", b = v;
  if (g !== "/") {
    let M = g.replace(/^\//, "").split("/");
    b = "/" + v.replace(/^\//, "").split("/").slice(M.length).join("/");
  }
  let w = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (M) => Object.assign(M, {
        route: r.manifest[M.route.id] || M.route
      })
    )
  ) : Ob(t, { pathname: b });
  return $t(
    m || w != null,
    `No routes matched location "${p.pathname}${p.search}${p.hash}" `
  ), $t(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), d2(
    w && w.map(
      (M) => Object.assign({}, M, {
        params: Object.assign({}, c, M.params),
        pathname: na([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            M.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : M.pathname
        ]),
        pathnameBase: M.pathnameBase === "/" ? g : na([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            M.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : M.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function s2() {
  let t = y2(), a = Do(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), r = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), c = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ _.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ _.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ _.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ _.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ _.createElement("pre", { style: s }, r) : null, c);
}
var u2 = /* @__PURE__ */ _.createElement(s2, null), r1 = class extends _.Component {
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
      const r = e2(t.digest);
      r && (t = r);
    }
    let a = t !== void 0 ? /* @__PURE__ */ _.createElement(ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ _.createElement(
      Yh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ _.createElement(c2, { error: t }, a) : a;
  }
};
r1.contextType = Wb;
var Md = /* @__PURE__ */ new WeakMap();
function c2({
  children: t,
  error: a
}) {
  let { basename: r } = _.useContext(ia);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = W_(a.digest);
    if (l) {
      let s = Md.get(a);
      if (s) throw s;
      let u = kb(l.location, r);
      if (Ub && !Md.get(a))
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
      return /* @__PURE__ */ _.createElement(
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
function f2({ routeContext: t, match: a, children: r }) {
  let l = _.useContext(_r);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ _.createElement(ba.Provider, { value: t }, r);
}
function d2(t, a = [], r) {
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
      let b, w = !1, N = null, M = null;
      l && (b = u && p.route.id ? u[p.route.id] : void 0, N = p.route.errorElement || u2, c && (h < 0 && v === 0 ? (o1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, M = null) : h === v && (w = !0, M = p.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return b ? E = N : w ? E = M : p.route.Component ? E = /* @__PURE__ */ _.createElement(p.route.Component, null) : p.route.element ? E = p.route.element : E = y, /* @__PURE__ */ _.createElement(
          f2,
          {
            match: p,
            routeContext: {
              outlet: y,
              matches: R,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (p.route.ErrorBoundary || p.route.errorElement || v === 0) ? /* @__PURE__ */ _.createElement(
        r1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: b,
          children: z(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function $h(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function h2(t) {
  let a = _.useContext(_r);
  return Ze(a, $h(t)), a;
}
function l1(t) {
  let a = _.useContext($o);
  return Ze(a, $h(t)), a;
}
function m2(t) {
  let a = _.useContext(ba);
  return Ze(a, $h(t)), a;
}
function Wu(t) {
  let a = m2(t), r = a.matches[a.matches.length - 1];
  return Ze(
    r.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function p2() {
  return Wu(
    "useRouteId"
    /* UseRouteId */
  );
}
function g2() {
  let t = l1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Wu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function y2() {
  let t = _.useContext(Yh), a = l1(
    "useRouteError"
    /* UseRouteError */
  ), r = Wu(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[r];
}
function v2() {
  let { router: t } = h2(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Wu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = _.useRef(!1);
  return i1(() => {
    r.current = !0;
  }), _.useCallback(
    async (s, u = {}) => {
      $t(r.current, a1), r.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var jy = {};
function o1(t, a, r) {
  !a && !jy[t] && (jy[t] = !0, $t(!1, r));
}
var Ly = {};
function Hy(t, a) {
  !t && !Ly[a] && (Ly[a] = !0, console.warn(a));
}
var b2 = "useOptimistic", By = OE[b2], x2 = () => {
};
function w2(t) {
  return By ? By(t) : [t, x2];
}
function S2(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && $t(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: _.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && $t(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: _.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && $t(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: _.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var E2 = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function _2(t, a) {
  return N_({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: VE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: E2,
    mapRouteProperties: S2,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var N2 = class {
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
function C2({
  router: t,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = e1() || l;
  let [u, c] = _.useState(t.state), [h, g] = w2(u), [m, y] = _.useState(), [p, v] = _.useState({
    isTransitioning: !1
  }), [b, w] = _.useState(), [N, M] = _.useState(), [R, z] = _.useState(), E = _.useRef(/* @__PURE__ */ new Map()), O = _.useCallback(
    (A, { deletedFetchers: I, newErrors: le, flushSync: $, viewTransitionOpts: K }) => {
      le && r && Object.values(le).forEach(
        (j) => r(j, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: Yo(A.matches)
        })
      ), A.fetchers.forEach((j, X) => {
        j.data !== void 0 && E.current.set(X, j.data);
      }), I.forEach((j) => E.current.delete(j)), Hy(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let re = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Hy(
        K == null || re,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !re) {
        a && $ ? a(() => c(A)) : l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && g((j) => Uy(j, A)), c(A);
        });
        return;
      }
      if (a && $) {
        a(() => {
          N && (b?.resolve(), N.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let j = t.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        j.finished.finally(() => {
          a(() => {
            w(void 0), M(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => M(j));
        return;
      }
      N ? (b?.resolve(), N.skipTransition(), z({
        state: A,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (y(A), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      t.window,
      a,
      N,
      b,
      l,
      g,
      r
    ]
  );
  _.useLayoutEffect(() => t.subscribe(O), [t, O]), _.useEffect(() => {
    p.isTransitioning && !p.flushSync && w(new N2());
  }, [p]), _.useEffect(() => {
    if (b && m && t.window) {
      let A = m, I = b.promise, le = t.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && g(($) => Uy($, A)), c(A);
        }), await I;
      });
      le.finished.finally(() => {
        w(void 0), M(void 0), y(void 0), v({ isTransitioning: !1 });
      }), M(le);
    }
  }, [
    m,
    b,
    t.window,
    l,
    g
  ]), _.useEffect(() => {
    b && m && h.location.key === m.location.key && b.resolve();
  }, [b, N, h.location, m]), _.useEffect(() => {
    !p.isTransitioning && R && (y(R.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), z(void 0));
  }, [p.isTransitioning, R]);
  let H = _.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (A) => t.navigate(A),
    push: (A, I, le) => t.navigate(A, {
      state: I,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (A, I, le) => t.navigate(A, {
      replace: !0,
      state: I,
      preventScrollReset: le?.preventScrollReset
    })
  }), [t]), U = t.basename || "/", B = _.useMemo(
    () => ({
      router: t,
      navigator: H,
      static: !1,
      basename: U,
      onError: r
    }),
    [t, H, U, r]
  );
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(_r.Provider, { value: B }, /* @__PURE__ */ _.createElement($o.Provider, { value: h }, /* @__PURE__ */ _.createElement(t1.Provider, { value: E.current }, /* @__PURE__ */ _.createElement(qh.Provider, { value: p }, /* @__PURE__ */ _.createElement(
    D2,
    {
      basename: U,
      location: h.location,
      navigationType: h.historyAction,
      navigator: H,
      useTransitions: l
    },
    /* @__PURE__ */ _.createElement(
      R2,
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
function Uy(t, a) {
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
var R2 = _.memo(T2);
function T2({
  routes: t,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return o2(t, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function M2(t) {
  return r2(t.context);
}
function D2({
  basename: t = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Ze(
    !Io(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), g = _.useMemo(
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
  } = r, N = _.useMemo(() => {
    let M = aa(m, h);
    return M == null ? null : {
      location: {
        pathname: M,
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
    N != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${p}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ _.createElement(ia.Provider, { value: g }, /* @__PURE__ */ _.createElement(Ju.Provider, { children: a, value: N }));
}
var Mu = "get", Du = "application/x-www-form-urlencoded";
function ec(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function A2(t) {
  return ec(t) && t.tagName.toLowerCase() === "button";
}
function z2(t) {
  return ec(t) && t.tagName.toLowerCase() === "form";
}
function O2(t) {
  return ec(t) && t.tagName.toLowerCase() === "input";
}
function j2(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function L2(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !j2(t);
}
var uu = null;
function H2() {
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
var B2 = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Dd(t) {
  return t != null && !B2.has(t) ? ($t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Du}"`
  ), null) : t;
}
function U2(t, a) {
  let r, l, s, u, c;
  if (z2(t)) {
    let h = t.getAttribute("action");
    l = h ? aa(h, a) : null, r = t.getAttribute("method") || Mu, s = Dd(t.getAttribute("enctype")) || Du, u = new FormData(t);
  } else if (A2(t) || O2(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || h.getAttribute("action");
    if (l = g ? aa(g, a) : null, r = t.getAttribute("formmethod") || h.getAttribute("method") || Mu, s = Dd(t.getAttribute("formenctype")) || Dd(h.getAttribute("enctype")) || Du, u = new FormData(h, t), !H2()) {
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
function Ih(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function s1(t, a, r, l) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && aa(s.pathname, a) === "/" ? s.pathname = `${Bu(a)}/_root.${l}` : s.pathname = `${Bu(s.pathname)}.${l}`, s;
}
async function k2(t, a) {
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
function V2(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function q2(t, a, r) {
  let l = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await k2(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return X2(
    l.flat(1).filter(V2).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function ky(t, a, r, l, s, u) {
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
function Y2(t, a, { includeHydrateFallback: r } = {}) {
  return $2(
    t.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function $2(t) {
  return [...new Set(t)];
}
function I2(t) {
  let a = {}, r = Object.keys(t).sort();
  for (let l of r)
    a[l] = t[l];
  return a;
}
function X2(t, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((l, s) => {
    let u = JSON.stringify(I2(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function Xh() {
  let t = _.useContext(_r);
  return Ih(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function G2() {
  let t = _.useContext($o);
  return Ih(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Gh = _.createContext(void 0);
Gh.displayName = "FrameworkContext";
function Zh() {
  let t = _.useContext(Gh);
  return Ih(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function Z2(t, a) {
  let r = _.useContext(Gh), [l, s] = _.useState(!1), [u, c] = _.useState(!1), { onFocus: h, onBlur: g, onMouseEnter: m, onMouseLeave: y, onTouchStart: p } = a, v = _.useRef(null);
  _.useEffect(() => {
    if (t === "render" && c(!0), t === "viewport") {
      let N = (R) => {
        R.forEach((z) => {
          c(z.isIntersecting);
        });
      }, M = new IntersectionObserver(N, { threshold: 0.5 });
      return v.current && M.observe(v.current), () => {
        M.disconnect();
      };
    }
  }, [t]), _.useEffect(() => {
    if (l) {
      let N = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(N);
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
function F2({ page: t, ...a }) {
  let r = e1(), { router: l } = Xh(), s = _.useMemo(
    () => Ob(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return s ? r ? /* @__PURE__ */ _.createElement(P2, { page: t, matches: s, ...a }) : /* @__PURE__ */ _.createElement(K2, { page: t, matches: s, ...a }) : null;
}
function Q2(t) {
  let { manifest: a, routeModules: r } = Zh(), [l, s] = _.useState([]);
  return _.useEffect(() => {
    let u = !1;
    return q2(t, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, r]), l;
}
function P2({
  page: t,
  matches: a,
  ...r
}) {
  let l = ui(), { future: s } = Zh(), { basename: u } = Xh(), c = _.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let h = s1(
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
  return /* @__PURE__ */ _.createElement(_.Fragment, null, c.map((h) => /* @__PURE__ */ _.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function K2({
  page: t,
  matches: a,
  ...r
}) {
  let l = ui(), { future: s, manifest: u, routeModules: c } = Zh(), { basename: h } = Xh(), { loaderData: g, matches: m } = G2(), y = _.useMemo(
    () => ky(
      t,
      a,
      m,
      u,
      l,
      "data"
    ),
    [t, a, m, u, l]
  ), p = _.useMemo(
    () => ky(
      t,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [t, a, m, u, l]
  ), v = _.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), M = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((O) => O.route.id === z.route.id) && z.route.id in g && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? M = !0 : N.add(z.route.id));
    }), N.size === 0)
      return [];
    let R = s1(
      t,
      h,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return M && N.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((z) => N.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [R.pathname + R.search];
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
  ]), b = _.useMemo(
    () => Y2(p, u),
    [p, u]
  ), w = Q2(p);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, v.map((N) => /* @__PURE__ */ _.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...r })), b.map((N) => /* @__PURE__ */ _.createElement("link", { key: N, rel: "modulepreload", href: N, ...r })), w.map(({ key: N, link: M }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ _.createElement(
      "link",
      {
        key: N,
        nonce: r.nonce,
        ...M,
        crossOrigin: M.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function J2(...t) {
  return (a) => {
    t.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var W2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  W2 && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var u1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, c1 = _.forwardRef(
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
  }, N) {
    let { basename: M, navigator: R, useTransitions: z } = _.useContext(ia), E = typeof y == "string" && u1.test(y), O = kb(y, M);
    y = O.to;
    let H = t2(y, { relative: s }), U = ui(), B = null;
    if (h) {
      let X = Pu(
        h,
        [],
        U.mask ? U.mask.pathname : "/",
        !0
      );
      M !== "/" && (X.pathname = X.pathname === "/" ? M : na([M, X.pathname])), B = R.createHref(X);
    }
    let [A, I, le] = Z2(
      l,
      w
    ), $ = nN(y, {
      replace: c,
      mask: h,
      state: g,
      target: m,
      preventScrollReset: p,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: b,
      useTransitions: z
    });
    function K(X) {
      a && a(X), X.defaultPrevented || $(X);
    }
    let re = !(O.isExternal || u), j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ _.createElement(
        "a",
        {
          ...w,
          ...le,
          href: (re ? B : void 0) || O.absoluteURL || H,
          onClick: re ? K : a,
          ref: J2(N, I),
          target: m,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !E ? /* @__PURE__ */ _.createElement(_.Fragment, null, j, /* @__PURE__ */ _.createElement(F2, { page: H })) : j;
  }
);
c1.displayName = "Link";
var f1 = _.forwardRef(
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
    let p = Xo(c, { relative: m.relative }), v = ui(), b = _.useContext($o), { navigator: w, basename: N } = _.useContext(ia), M = b != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    oN(p) && h === !0, R = w.encodeLocation ? w.encodeLocation(p).pathname : p.pathname, z = v.pathname, E = b && b.navigation && b.navigation.location ? b.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), E = E ? E.toLowerCase() : null, R = R.toLowerCase()), E && N && (E = aa(E, N) || E);
    const O = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let H = z === R || !s && z.startsWith(R) && z.charAt(O) === "/", U = E != null && (E === R || !s && E.startsWith(R) && E.charAt(R.length) === "/"), B = {
      isActive: H,
      isPending: U,
      isTransitioning: M
    }, A = H ? a : void 0, I;
    typeof l == "function" ? I = l(B) : I = [
      l,
      H ? "active" : null,
      U ? "pending" : null,
      M ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let le = typeof u == "function" ? u(B) : u;
    return /* @__PURE__ */ _.createElement(
      c1,
      {
        ...m,
        "aria-current": A,
        className: I,
        ref: y,
        style: le,
        to: c,
        viewTransition: h
      },
      typeof g == "function" ? g(B) : g
    );
  }
);
f1.displayName = "NavLink";
var eN = _.forwardRef(
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
    let { useTransitions: N } = _.useContext(ia), M = rN(), R = lN(h, { relative: m }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof h == "string" && u1.test(h), O = (H) => {
      if (g && g(H), H.defaultPrevented) return;
      H.preventDefault();
      let U = H.nativeEvent.submitter, B = U?.getAttribute("formmethod") || c, A = () => M(U || H.currentTarget, {
        fetcherKey: a,
        method: B,
        navigate: r,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: p,
        defaultShouldRevalidate: v
      });
      N && r !== !1 ? _.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ _.createElement(
      "form",
      {
        ref: w,
        method: z,
        action: R,
        onSubmit: l ? g : O,
        ...b,
        "data-discover": !E && t === "render" ? "true" : void 0
      }
    );
  }
);
eN.displayName = "Form";
function tN(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function d1(t) {
  let a = _.useContext(_r);
  return Ze(a, tN(t)), a;
}
function nN(t, {
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
  let y = n2(), p = ui(), v = Xo(t, { relative: c });
  return _.useCallback(
    (b) => {
      if (L2(b, a)) {
        b.preventDefault();
        let w = r !== void 0 ? r : La(p) === La(v), N = () => y(t, {
          replace: w,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: h,
          defaultShouldRevalidate: g
        });
        m ? _.startTransition(() => N()) : N();
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
var aN = 0, iN = () => `__${String(++aN)}__`;
function rN() {
  let { router: t } = d1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = _.useContext(ia), r = p2(), l = t.fetch, s = t.navigate;
  return _.useCallback(
    async (u, c = {}) => {
      let { action: h, method: g, encType: m, formData: y, body: p } = U2(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || iN();
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
function lN(t, { relative: a } = {}) {
  let { basename: r } = _.useContext(ia), l = _.useContext(ba);
  Ze(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...Xo(t || ".", { relative: a }) }, c = ui();
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
function oN(t, { relative: a } = {}) {
  let r = _.useContext(qh);
  Ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = d1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Xo(t, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = aa(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = aa(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return Hu(s.pathname, c) != null || Hu(s.pathname, u) != null;
}
const sN = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], uN = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], h1 = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: ""
}, cN = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)";
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
function fN(t, a, r) {
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
async function m1() {
  return Nr("/presets");
}
async function dN() {
  return Nr("/settings");
}
async function p1(t) {
  return Nr("/settings", {
    method: "PUT",
    body: JSON.stringify(t)
  });
}
var hN = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function Tn({ tone: t = "neutral", children: a, className: r }) {
  const l = [hN[t], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsx("span", { className: l, children: a });
}
var mN = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, pN = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, gN = "_1h48t1v9";
function ri({
  variant: t = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...h
}) {
  const g = [mN[t], pN[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs(
    "button",
    {
      type: r,
      className: g,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...h,
      children: [
        l ? /* @__PURE__ */ S.jsx("span", { className: gN, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Qt(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let a = "";
  if (Array.isArray(t))
    for (let r = 0, l; r < t.length; r++)
      (l = Qt(t[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in t)
      t[r] && (a += (a && " ") + r);
  return a;
}
var yN = { value: () => {
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
function vN(t, a) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
Au.prototype = ac.prototype = {
  constructor: Au,
  on: function(t, a) {
    var r = this._, l = vN(t + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (t = l[u]).type) && (s = bN(r[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (t = l[u]).type) r[s] = Vy(r[s], t.name, a);
      else if (a == null) for (s in r) r[s] = Vy(r[s], t.name, null);
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
function bN(t, a) {
  for (var r = 0, l = t.length, s; r < l; ++r)
    if ((s = t[r]).name === a)
      return s.value;
}
function Vy(t, a, r) {
  for (var l = 0, s = t.length; l < s; ++l)
    if (t[l].name === a) {
      t[l] = yN, t = t.slice(0, l).concat(t.slice(l + 1));
      break;
    }
  return r != null && t.push({ name: a, value: r }), t;
}
var nh = "http://www.w3.org/1999/xhtml";
const qy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: nh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ic(t) {
  var a = t += "", r = a.indexOf(":");
  return r >= 0 && (a = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)), qy.hasOwnProperty(a) ? { space: qy[a], local: t } : t;
}
function xN(t) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === nh && a.documentElement.namespaceURI === nh ? a.createElement(t) : a.createElementNS(r, t);
  };
}
function wN(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function g1(t) {
  var a = ic(t);
  return (a.local ? wN : xN)(a);
}
function SN() {
}
function Fh(t) {
  return t == null ? SN : function() {
    return this.querySelector(t);
  };
}
function EN(t) {
  typeof t != "function" && (t = Fh(t));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = l[s] = new Array(c), g, m, y = 0; y < c; ++y)
      (g = u[y]) && (m = t.call(g, g.__data__, y, u)) && ("__data__" in g && (m.__data__ = g.__data__), h[y] = m);
  return new Yn(l, this._parents);
}
function _N(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function NN() {
  return [];
}
function y1(t) {
  return t == null ? NN : function() {
    return this.querySelectorAll(t);
  };
}
function CN(t) {
  return function() {
    return _N(t.apply(this, arguments));
  };
}
function RN(t) {
  typeof t == "function" ? t = CN(t) : t = y1(t);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], h = c.length, g, m = 0; m < h; ++m)
      (g = c[m]) && (l.push(t.call(g, g.__data__, m, c)), s.push(g));
  return new Yn(l, s);
}
function v1(t) {
  return function() {
    return this.matches(t);
  };
}
function b1(t) {
  return function(a) {
    return a.matches(t);
  };
}
var TN = Array.prototype.find;
function MN(t) {
  return function() {
    return TN.call(this.children, t);
  };
}
function DN() {
  return this.firstElementChild;
}
function AN(t) {
  return this.select(t == null ? DN : MN(typeof t == "function" ? t : b1(t)));
}
var zN = Array.prototype.filter;
function ON() {
  return Array.from(this.children);
}
function jN(t) {
  return function() {
    return zN.call(this.children, t);
  };
}
function LN(t) {
  return this.selectAll(t == null ? ON : jN(typeof t == "function" ? t : b1(t)));
}
function HN(t) {
  typeof t != "function" && (t = v1(t));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = l[s] = [], g, m = 0; m < c; ++m)
      (g = u[m]) && t.call(g, g.__data__, m, u) && h.push(g);
  return new Yn(l, this._parents);
}
function x1(t) {
  return new Array(t.length);
}
function BN() {
  return new Yn(this._enter || this._groups.map(x1), this._parents);
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
function UN(t) {
  return function() {
    return t;
  };
}
function kN(t, a, r, l, s, u) {
  for (var c = 0, h, g = a.length, m = u.length; c < m; ++c)
    (h = a[c]) ? (h.__data__ = u[c], l[c] = h) : r[c] = new Uu(t, u[c]);
  for (; c < g; ++c)
    (h = a[c]) && (s[c] = h);
}
function VN(t, a, r, l, s, u, c) {
  var h, g, m = /* @__PURE__ */ new Map(), y = a.length, p = u.length, v = new Array(y), b;
  for (h = 0; h < y; ++h)
    (g = a[h]) && (v[h] = b = c.call(g, g.__data__, h, a) + "", m.has(b) ? s[h] = g : m.set(b, g));
  for (h = 0; h < p; ++h)
    b = c.call(t, u[h], h, u) + "", (g = m.get(b)) ? (l[h] = g, g.__data__ = u[h], m.delete(b)) : r[h] = new Uu(t, u[h]);
  for (h = 0; h < y; ++h)
    (g = a[h]) && m.get(v[h]) === g && (s[h] = g);
}
function qN(t) {
  return t.__data__;
}
function YN(t, a) {
  if (!arguments.length) return Array.from(this, qN);
  var r = a ? VN : kN, l = this._parents, s = this._groups;
  typeof t != "function" && (t = UN(t));
  for (var u = s.length, c = new Array(u), h = new Array(u), g = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], p = s[m], v = p.length, b = $N(t.call(y, y && y.__data__, m, l)), w = b.length, N = h[m] = new Array(w), M = c[m] = new Array(w), R = g[m] = new Array(v);
    r(y, p, N, M, R, b, a);
    for (var z = 0, E = 0, O, H; z < w; ++z)
      if (O = N[z]) {
        for (z >= E && (E = z + 1); !(H = M[E]) && ++E < w; ) ;
        O._next = H || null;
      }
  }
  return c = new Yn(c, l), c._enter = h, c._exit = g, c;
}
function $N(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function IN() {
  return new Yn(this._exit || this._groups.map(x1), this._parents);
}
function XN(t, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (l = t(l), l && (l = l.selection())) : l = l.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function GN(t) {
  for (var a = t.selection ? t.selection() : t, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), h = new Array(s), g = 0; g < c; ++g)
    for (var m = r[g], y = l[g], p = m.length, v = h[g] = new Array(p), b, w = 0; w < p; ++w)
      (b = m[w] || y[w]) && (v[w] = b);
  for (; g < s; ++g)
    h[g] = r[g];
  return new Yn(h, this._parents);
}
function ZN() {
  for (var t = this._groups, a = -1, r = t.length; ++a < r; )
    for (var l = t[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function FN(t) {
  t || (t = QN);
  function a(p, v) {
    return p && v ? t(p.__data__, v.__data__) : !p - !v;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], h = c.length, g = s[u] = new Array(h), m, y = 0; y < h; ++y)
      (m = c[y]) && (g[y] = m);
    g.sort(a);
  }
  return new Yn(s, this._parents).order();
}
function QN(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function PN() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function KN() {
  return Array.from(this);
}
function JN() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var l = t[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function WN() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function eC() {
  return !this.node();
}
function tC(t) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, h; u < c; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function nC(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function aC(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function iC(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function rC(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function lC(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
  };
}
function oC(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, r);
  };
}
function sC(t, a) {
  var r = ic(t);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? aC : nC : typeof a == "function" ? r.local ? oC : lC : r.local ? rC : iC)(r, a));
}
function w1(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function uC(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function cC(t, a, r) {
  return function() {
    this.style.setProperty(t, a, r);
  };
}
function fC(t, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(t) : this.style.setProperty(t, l, r);
  };
}
function dC(t, a, r) {
  return arguments.length > 1 ? this.each((a == null ? uC : typeof a == "function" ? fC : cC)(t, a, r ?? "")) : gl(this.node(), t);
}
function gl(t, a) {
  return t.style.getPropertyValue(a) || w1(t).getComputedStyle(t, null).getPropertyValue(a);
}
function hC(t) {
  return function() {
    delete this[t];
  };
}
function mC(t, a) {
  return function() {
    this[t] = a;
  };
}
function pC(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[t] : this[t] = r;
  };
}
function gC(t, a) {
  return arguments.length > 1 ? this.each((a == null ? hC : typeof a == "function" ? pC : mC)(t, a)) : this.node()[t];
}
function S1(t) {
  return t.trim().split(/^|\s+/);
}
function Qh(t) {
  return t.classList || new E1(t);
}
function E1(t) {
  this._node = t, this._names = S1(t.getAttribute("class") || "");
}
E1.prototype = {
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
function _1(t, a) {
  for (var r = Qh(t), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function N1(t, a) {
  for (var r = Qh(t), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function yC(t) {
  return function() {
    _1(this, t);
  };
}
function vC(t) {
  return function() {
    N1(this, t);
  };
}
function bC(t, a) {
  return function() {
    (a.apply(this, arguments) ? _1 : N1)(this, t);
  };
}
function xC(t, a) {
  var r = S1(t + "");
  if (arguments.length < 2) {
    for (var l = Qh(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? bC : a ? yC : vC)(r, a));
}
function wC() {
  this.textContent = "";
}
function SC(t) {
  return function() {
    this.textContent = t;
  };
}
function EC(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function _C(t) {
  return arguments.length ? this.each(t == null ? wC : (typeof t == "function" ? EC : SC)(t)) : this.node().textContent;
}
function NC() {
  this.innerHTML = "";
}
function CC(t) {
  return function() {
    this.innerHTML = t;
  };
}
function RC(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function TC(t) {
  return arguments.length ? this.each(t == null ? NC : (typeof t == "function" ? RC : CC)(t)) : this.node().innerHTML;
}
function MC() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function DC() {
  return this.each(MC);
}
function AC() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zC() {
  return this.each(AC);
}
function OC(t) {
  var a = typeof t == "function" ? t : g1(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function jC() {
  return null;
}
function LC(t, a) {
  var r = typeof t == "function" ? t : g1(t), l = a == null ? jC : typeof a == "function" ? a : Fh(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function HC() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function BC() {
  return this.each(HC);
}
function UC() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function kC() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function VC(t) {
  return this.select(t ? kC : UC);
}
function qC(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function YC(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function $C(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function IC(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function XC(t, a, r) {
  return function() {
    var l = this.__on, s, u = YC(a);
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
function GC(t, a, r) {
  var l = $C(t + ""), s, u = l.length, c;
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
  for (h = a ? XC : IC, s = 0; s < u; ++s) this.each(h(l[s], a, r));
  return this;
}
function C1(t, a, r) {
  var l = w1(t), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function ZC(t, a) {
  return function() {
    return C1(this, t, a);
  };
}
function FC(t, a) {
  return function() {
    return C1(this, t, a.apply(this, arguments));
  };
}
function QC(t, a) {
  return this.each((typeof a == "function" ? FC : ZC)(t, a));
}
function* PC() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var l = t[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var R1 = [null];
function Yn(t, a) {
  this._groups = t, this._parents = a;
}
function Go() {
  return new Yn([[document.documentElement]], R1);
}
function KC() {
  return this;
}
Yn.prototype = Go.prototype = {
  constructor: Yn,
  select: EN,
  selectAll: RN,
  selectChild: AN,
  selectChildren: LN,
  filter: HN,
  data: YN,
  enter: BN,
  exit: IN,
  join: XN,
  merge: GN,
  selection: KC,
  order: ZN,
  sort: FN,
  call: PN,
  nodes: KN,
  node: JN,
  size: WN,
  empty: eC,
  each: tC,
  attr: sC,
  style: dC,
  property: gC,
  classed: xC,
  text: _C,
  html: TC,
  raise: DC,
  lower: zC,
  append: OC,
  insert: LC,
  remove: BC,
  clone: VC,
  datum: qC,
  on: GC,
  dispatch: QC,
  [Symbol.iterator]: PC
};
function qn(t) {
  return typeof t == "string" ? new Yn([[document.querySelector(t)]], [document.documentElement]) : new Yn([[t]], R1);
}
function JC(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ha(t, a) {
  if (t = JC(t), a === void 0 && (a = t.currentTarget), a) {
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
const WC = { passive: !1 }, Ao = { capture: !0, passive: !1 };
function Ad(t) {
  t.stopImmediatePropagation();
}
function hl(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function T1(t) {
  var a = t.document.documentElement, r = qn(t).on("dragstart.drag", hl, Ao);
  "onselectstart" in a ? r.on("selectstart.drag", hl, Ao) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function M1(t, a) {
  var r = t.document.documentElement, l = qn(t).on("dragstart.drag", null);
  a && (l.on("click.drag", hl, Ao), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const cu = (t) => () => t;
function ah(t, {
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
ah.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function eR(t) {
  return !t.ctrlKey && !t.button;
}
function tR() {
  return this.parentNode;
}
function nR(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function aR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function D1() {
  var t = eR, a = tR, r = nR, l = aR, s = {}, u = ac("start", "drag", "end"), c = 0, h, g, m, y, p = 0;
  function v(O) {
    O.on("mousedown.drag", b).filter(l).on("touchstart.drag", M).on("touchmove.drag", R, WC).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function b(O, H) {
    if (!(y || !t.call(this, O, H))) {
      var U = E(this, a.call(this, O, H), O, H, "mouse");
      U && (qn(O.view).on("mousemove.drag", w, Ao).on("mouseup.drag", N, Ao), T1(O.view), Ad(O), m = !1, h = O.clientX, g = O.clientY, U("start", O));
    }
  }
  function w(O) {
    if (hl(O), !m) {
      var H = O.clientX - h, U = O.clientY - g;
      m = H * H + U * U > p;
    }
    s.mouse("drag", O);
  }
  function N(O) {
    qn(O.view).on("mousemove.drag mouseup.drag", null), M1(O.view, m), hl(O), s.mouse("end", O);
  }
  function M(O, H) {
    if (t.call(this, O, H)) {
      var U = O.changedTouches, B = a.call(this, O, H), A = U.length, I, le;
      for (I = 0; I < A; ++I)
        (le = E(this, B, O, H, U[I].identifier, U[I])) && (Ad(O), le("start", O, U[I]));
    }
  }
  function R(O) {
    var H = O.changedTouches, U = H.length, B, A;
    for (B = 0; B < U; ++B)
      (A = s[H[B].identifier]) && (hl(O), A("drag", O, H[B]));
  }
  function z(O) {
    var H = O.changedTouches, U = H.length, B, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), B = 0; B < U; ++B)
      (A = s[H[B].identifier]) && (Ad(O), A("end", O, H[B]));
  }
  function E(O, H, U, B, A, I) {
    var le = u.copy(), $ = ha(I || U, H), K, re, j;
    if ((j = r.call(O, new ah("beforestart", {
      sourceEvent: U,
      target: v,
      identifier: A,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: le
    }), B)) != null)
      return K = j.x - $[0] || 0, re = j.y - $[1] || 0, function X(C, L, Z) {
        var V = $, P;
        switch (C) {
          case "start":
            s[A] = X, P = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            $ = ha(Z || L, H), P = c;
            break;
        }
        le.call(
          C,
          O,
          new ah(C, {
            sourceEvent: L,
            subject: j,
            target: v,
            identifier: A,
            active: P,
            x: $[0] + K,
            y: $[1] + re,
            dx: $[0] - V[0],
            dy: $[1] - V[1],
            dispatch: le
          }),
          B
        );
      };
  }
  return v.filter = function(O) {
    return arguments.length ? (t = typeof O == "function" ? O : cu(!!O), v) : t;
  }, v.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : cu(O), v) : a;
  }, v.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : cu(O), v) : r;
  }, v.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : cu(!!O), v) : l;
  }, v.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? v : O;
  }, v.clickDistance = function(O) {
    return arguments.length ? (p = (O = +O) * O, v) : Math.sqrt(p);
  }, v;
}
function Ph(t, a, r) {
  t.prototype = a.prototype = r, r.constructor = t;
}
function A1(t, a) {
  var r = Object.create(t.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function Zo() {
}
var zo = 0.7, ku = 1 / zo, ml = "\\s*([+-]?\\d+)\\s*", Oo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Oa = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", iR = /^#([0-9a-f]{3,8})$/, rR = new RegExp(`^rgb\\(${ml},${ml},${ml}\\)$`), lR = new RegExp(`^rgb\\(${Oa},${Oa},${Oa}\\)$`), oR = new RegExp(`^rgba\\(${ml},${ml},${ml},${Oo}\\)$`), sR = new RegExp(`^rgba\\(${Oa},${Oa},${Oa},${Oo}\\)$`), uR = new RegExp(`^hsl\\(${Oo},${Oa},${Oa}\\)$`), cR = new RegExp(`^hsla\\(${Oo},${Oa},${Oa},${Oo}\\)$`), Yy = {
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
Ph(Zo, br, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: $y,
  // Deprecated! Use color.formatHex.
  formatHex: $y,
  formatHex8: fR,
  formatHsl: dR,
  formatRgb: Iy,
  toString: Iy
});
function $y() {
  return this.rgb().formatHex();
}
function fR() {
  return this.rgb().formatHex8();
}
function dR() {
  return z1(this).formatHsl();
}
function Iy() {
  return this.rgb().formatRgb();
}
function br(t) {
  var a, r;
  return t = (t + "").trim().toLowerCase(), (a = iR.exec(t)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? Xy(a) : r === 3 ? new Mn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? fu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? fu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = rR.exec(t)) ? new Mn(a[1], a[2], a[3], 1) : (a = lR.exec(t)) ? new Mn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = oR.exec(t)) ? fu(a[1], a[2], a[3], a[4]) : (a = sR.exec(t)) ? fu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = uR.exec(t)) ? Fy(a[1], a[2] / 100, a[3] / 100, 1) : (a = cR.exec(t)) ? Fy(a[1], a[2] / 100, a[3] / 100, a[4]) : Yy.hasOwnProperty(t) ? Xy(Yy[t]) : t === "transparent" ? new Mn(NaN, NaN, NaN, 0) : null;
}
function Xy(t) {
  return new Mn(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function fu(t, a, r, l) {
  return l <= 0 && (t = a = r = NaN), new Mn(t, a, r, l);
}
function hR(t) {
  return t instanceof Zo || (t = br(t)), t ? (t = t.rgb(), new Mn(t.r, t.g, t.b, t.opacity)) : new Mn();
}
function ih(t, a, r, l) {
  return arguments.length === 1 ? hR(t) : new Mn(t, a, r, l ?? 1);
}
function Mn(t, a, r, l) {
  this.r = +t, this.g = +a, this.b = +r, this.opacity = +l;
}
Ph(Mn, ih, A1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new Mn(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new Mn(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Mn(yr(this.r), yr(this.g), yr(this.b), Vu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Gy,
  // Deprecated! Use color.formatHex.
  formatHex: Gy,
  formatHex8: mR,
  formatRgb: Zy,
  toString: Zy
}));
function Gy() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}`;
}
function mR() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}${pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Zy() {
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
function Fy(t, a, r, l) {
  return l <= 0 ? t = a = r = NaN : r <= 0 || r >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ma(t, a, r, l);
}
function z1(t) {
  if (t instanceof ma) return new ma(t.h, t.s, t.l, t.opacity);
  if (t instanceof Zo || (t = br(t)), !t) return new ma();
  if (t instanceof ma) return t;
  t = t.rgb();
  var a = t.r / 255, r = t.g / 255, l = t.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, h = u - s, g = (u + s) / 2;
  return h ? (a === u ? c = (r - l) / h + (r < l) * 6 : r === u ? c = (l - a) / h + 2 : c = (a - r) / h + 4, h /= g < 0.5 ? u + s : 2 - u - s, c *= 60) : h = g > 0 && g < 1 ? 0 : c, new ma(c, h, g, t.opacity);
}
function pR(t, a, r, l) {
  return arguments.length === 1 ? z1(t) : new ma(t, a, r, l ?? 1);
}
function ma(t, a, r, l) {
  this.h = +t, this.s = +a, this.l = +r, this.opacity = +l;
}
Ph(ma, pR, A1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new Mn(
      zd(t >= 240 ? t - 240 : t + 120, s, l),
      zd(t, s, l),
      zd(t < 120 ? t + 240 : t - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new ma(Qy(this.h), du(this.s), du(this.l), Vu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Vu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Qy(this.h)}, ${du(this.s) * 100}%, ${du(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Qy(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function du(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function zd(t, a, r) {
  return (t < 60 ? a + (r - a) * t / 60 : t < 180 ? r : t < 240 ? a + (r - a) * (240 - t) / 60 : a) * 255;
}
const Kh = (t) => () => t;
function gR(t, a) {
  return function(r) {
    return t + r * a;
  };
}
function yR(t, a, r) {
  return t = Math.pow(t, r), a = Math.pow(a, r) - t, r = 1 / r, function(l) {
    return Math.pow(t + l * a, r);
  };
}
function vR(t) {
  return (t = +t) == 1 ? O1 : function(a, r) {
    return r - a ? yR(a, r, t) : Kh(isNaN(a) ? r : a);
  };
}
function O1(t, a) {
  var r = a - t;
  return r ? gR(t, r) : Kh(isNaN(t) ? a : t);
}
const qu = (function t(a) {
  var r = vR(a);
  function l(s, u) {
    var c = r((s = ih(s)).r, (u = ih(u)).r), h = r(s.g, u.g), g = r(s.b, u.b), m = O1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = h(y), s.b = g(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = t, l;
})(1);
function bR(t, a) {
  a || (a = []);
  var r = t ? Math.min(a.length, t.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = t[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function xR(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function wR(t, a) {
  var r = a ? a.length : 0, l = t ? Math.min(r, t.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = Ro(t[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(h) {
    for (c = 0; c < l; ++c) u[c] = s[c](h);
    return u;
  };
}
function SR(t, a) {
  var r = /* @__PURE__ */ new Date();
  return t = +t, a = +a, function(l) {
    return r.setTime(t * (1 - l) + a * l), r;
  };
}
function Aa(t, a) {
  return t = +t, a = +a, function(r) {
    return t * (1 - r) + a * r;
  };
}
function ER(t, a) {
  var r = {}, l = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? r[s] = Ro(t[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var rh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Od = new RegExp(rh.source, "g");
function _R(t) {
  return function() {
    return t;
  };
}
function NR(t) {
  return function(a) {
    return t(a) + "";
  };
}
function j1(t, a) {
  var r = rh.lastIndex = Od.lastIndex = 0, l, s, u, c = -1, h = [], g = [];
  for (t = t + "", a = a + ""; (l = rh.exec(t)) && (s = Od.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), h[c] ? h[c] += u : h[++c] = u), (l = l[0]) === (s = s[0]) ? h[c] ? h[c] += s : h[++c] = s : (h[++c] = null, g.push({ i: c, x: Aa(l, s) })), r = Od.lastIndex;
  return r < a.length && (u = a.slice(r), h[c] ? h[c] += u : h[++c] = u), h.length < 2 ? g[0] ? NR(g[0].x) : _R(a) : (a = g.length, function(m) {
    for (var y = 0, p; y < a; ++y) h[(p = g[y]).i] = p.x(m);
    return h.join("");
  });
}
function Ro(t, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? Kh(a) : (r === "number" ? Aa : r === "string" ? (l = br(a)) ? (a = l, qu) : j1 : a instanceof br ? qu : a instanceof Date ? SR : xR(a) ? bR : Array.isArray(a) ? wR : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? ER : Aa)(t, a);
}
var Py = 180 / Math.PI, lh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function L1(t, a, r, l, s, u) {
  var c, h, g;
  return (c = Math.sqrt(t * t + a * a)) && (t /= c, a /= c), (g = t * r + a * l) && (r -= t * g, l -= a * g), (h = Math.sqrt(r * r + l * l)) && (r /= h, l /= h, g /= h), t * l < a * r && (t = -t, a = -a, g = -g, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * Py,
    skewX: Math.atan(g) * Py,
    scaleX: c,
    scaleY: h
  };
}
var hu;
function CR(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? lh : L1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function RR(t) {
  return t == null || (hu || (hu = document.createElementNS("http://www.w3.org/2000/svg", "g")), hu.setAttribute("transform", t), !(t = hu.transform.baseVal.consolidate())) ? lh : (t = t.matrix, L1(t.a, t.b, t.c, t.d, t.e, t.f));
}
function H1(t, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, p, v, b, w) {
    if (m !== p || y !== v) {
      var N = b.push("translate(", null, a, null, r);
      w.push({ i: N - 4, x: Aa(m, p) }, { i: N - 2, x: Aa(y, v) });
    } else (p || v) && b.push("translate(" + p + a + v + r);
  }
  function c(m, y, p, v) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), v.push({ i: p.push(s(p) + "rotate(", null, l) - 2, x: Aa(m, y) })) : y && p.push(s(p) + "rotate(" + y + l);
  }
  function h(m, y, p, v) {
    m !== y ? v.push({ i: p.push(s(p) + "skewX(", null, l) - 2, x: Aa(m, y) }) : y && p.push(s(p) + "skewX(" + y + l);
  }
  function g(m, y, p, v, b, w) {
    if (m !== p || y !== v) {
      var N = b.push(s(b) + "scale(", null, ",", null, ")");
      w.push({ i: N - 4, x: Aa(m, p) }, { i: N - 2, x: Aa(y, v) });
    } else (p !== 1 || v !== 1) && b.push(s(b) + "scale(" + p + "," + v + ")");
  }
  return function(m, y) {
    var p = [], v = [];
    return m = t(m), y = t(y), u(m.translateX, m.translateY, y.translateX, y.translateY, p, v), c(m.rotate, y.rotate, p, v), h(m.skewX, y.skewX, p, v), g(m.scaleX, m.scaleY, y.scaleX, y.scaleY, p, v), m = y = null, function(b) {
      for (var w = -1, N = v.length, M; ++w < N; ) p[(M = v[w]).i] = M.x(b);
      return p.join("");
    };
  };
}
var TR = H1(CR, "px, ", "px)", "deg)"), MR = H1(RR, ", ", ")", ")"), DR = 1e-12;
function Ky(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function AR(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function zR(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const zu = (function t(a, r, l) {
  function s(u, c) {
    var h = u[0], g = u[1], m = u[2], y = c[0], p = c[1], v = c[2], b = y - h, w = p - g, N = b * b + w * w, M, R;
    if (N < DR)
      R = Math.log(v / m) / a, M = function(B) {
        return [
          h + B * b,
          g + B * w,
          m * Math.exp(a * B * R)
        ];
      };
    else {
      var z = Math.sqrt(N), E = (v * v - m * m + l * N) / (2 * m * r * z), O = (v * v - m * m - l * N) / (2 * v * r * z), H = Math.log(Math.sqrt(E * E + 1) - E), U = Math.log(Math.sqrt(O * O + 1) - O);
      R = (U - H) / a, M = function(B) {
        var A = B * R, I = Ky(H), le = m / (r * z) * (I * zR(a * A + H) - AR(H));
        return [
          h + le * b,
          g + le * w,
          m * I / Ky(a * A + H)
        ];
      };
    }
    return M.duration = R * 1e3 * a / Math.SQRT2, M;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), h = c * c, g = h * h;
    return t(c, h, g);
  }, s;
})(Math.SQRT2, 2, 4);
var yl = 0, _o = 0, xo = 0, B1 = 1e3, Yu, No, $u = 0, xr = 0, rc = 0, jo = typeof performance == "object" && performance.now ? performance : Date, U1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Jh() {
  return xr || (U1(OR), xr = jo.now() + rc);
}
function OR() {
  xr = 0;
}
function Iu() {
  this._call = this._time = this._next = null;
}
Iu.prototype = k1.prototype = {
  constructor: Iu,
  restart: function(t, a, r) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Jh() : +r) + (a == null ? 0 : +a), !this._next && No !== this && (No ? No._next = this : Yu = this, No = this), this._call = t, this._time = r, oh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, oh());
  }
};
function k1(t, a, r) {
  var l = new Iu();
  return l.restart(t, a, r), l;
}
function jR() {
  Jh(), ++yl;
  for (var t = Yu, a; t; )
    (a = xr - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --yl;
}
function Jy() {
  xr = ($u = jo.now()) + rc, yl = _o = 0;
  try {
    jR();
  } finally {
    yl = 0, HR(), xr = 0;
  }
}
function LR() {
  var t = jo.now(), a = t - $u;
  a > B1 && (rc -= a, $u = t);
}
function HR() {
  for (var t, a = Yu, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), t = a, a = a._next) : (r = a._next, a._next = null, a = t ? t._next = r : Yu = r);
  No = t, oh(l);
}
function oh(t) {
  if (!yl) {
    _o && (_o = clearTimeout(_o));
    var a = t - xr;
    a > 24 ? (t < 1 / 0 && (_o = setTimeout(Jy, t - jo.now() - rc)), xo && (xo = clearInterval(xo))) : (xo || ($u = jo.now(), xo = setInterval(LR, B1)), yl = 1, U1(Jy));
  }
}
function Wy(t, a, r) {
  var l = new Iu();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), t(s + a);
  }, a, r), l;
}
var BR = ac("start", "end", "cancel", "interrupt"), UR = [], V1 = 0, ev = 1, sh = 2, Ou = 3, tv = 4, uh = 5, ju = 6;
function lc(t, a, r, l, s, u) {
  var c = t.__transition;
  if (!c) t.__transition = {};
  else if (r in c) return;
  kR(t, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: BR,
    tween: UR,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: V1
  });
}
function Wh(t, a) {
  var r = xa(t, a);
  if (r.state > V1) throw new Error("too late; already scheduled");
  return r;
}
function Ha(t, a) {
  var r = xa(t, a);
  if (r.state > Ou) throw new Error("too late; already running");
  return r;
}
function xa(t, a) {
  var r = t.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function kR(t, a, r) {
  var l = t.__transition, s;
  l[a] = r, r.timer = k1(u, 0, r.time);
  function u(m) {
    r.state = ev, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, p, v, b;
    if (r.state !== ev) return g();
    for (y in l)
      if (b = l[y], b.name === r.name) {
        if (b.state === Ou) return Wy(c);
        b.state === tv ? (b.state = ju, b.timer.stop(), b.on.call("interrupt", t, t.__data__, b.index, b.group), delete l[y]) : +y < a && (b.state = ju, b.timer.stop(), b.on.call("cancel", t, t.__data__, b.index, b.group), delete l[y]);
      }
    if (Wy(function() {
      r.state === Ou && (r.state = tv, r.timer.restart(h, r.delay, r.time), h(m));
    }), r.state = sh, r.on.call("start", t, t.__data__, r.index, r.group), r.state === sh) {
      for (r.state = Ou, s = new Array(v = r.tween.length), y = 0, p = -1; y < v; ++y)
        (b = r.tween[y].value.call(t, t.__data__, r.index, r.group)) && (s[++p] = b);
      s.length = p + 1;
    }
  }
  function h(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(g), r.state = uh, 1), p = -1, v = s.length; ++p < v; )
      s[p].call(t, y);
    r.state === uh && (r.on.call("end", t, t.__data__, r.index, r.group), g());
  }
  function g() {
    r.state = ju, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete t.__transition;
  }
}
function Lu(t, a) {
  var r = t.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > sh && l.state < uh, l.state = ju, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", t, t.__data__, l.index, l.group), delete r[c];
    }
    u && delete t.__transition;
  }
}
function VR(t) {
  return this.each(function() {
    Lu(this, t);
  });
}
function qR(t, a) {
  var r, l;
  return function() {
    var s = Ha(this, t), u = s.tween;
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
function YR(t, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = Ha(this, t), c = u.tween;
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
function $R(t, a) {
  var r = this._id;
  if (t += "", arguments.length < 2) {
    for (var l = xa(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === t)
        return c.value;
    return null;
  }
  return this.each((a == null ? qR : YR)(r, t, a));
}
function em(t, a, r) {
  var l = t._id;
  return t.each(function() {
    var s = Ha(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return xa(s, l).value[a];
  };
}
function q1(t, a) {
  var r;
  return (typeof a == "number" ? Aa : a instanceof br ? qu : (r = br(a)) ? (a = r, qu) : j1)(t, a);
}
function IR(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function XR(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function GR(t, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(t);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function ZR(t, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(t.space, t.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function FR(t, a, r) {
  var l, s, u;
  return function() {
    var c, h = r(this), g;
    return h == null ? void this.removeAttribute(t) : (c = this.getAttribute(t), g = h + "", c === g ? null : c === l && g === s ? u : (s = g, u = a(l = c, h)));
  };
}
function QR(t, a, r) {
  var l, s, u;
  return function() {
    var c, h = r(this), g;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (c = this.getAttributeNS(t.space, t.local), g = h + "", c === g ? null : c === l && g === s ? u : (s = g, u = a(l = c, h)));
  };
}
function PR(t, a) {
  var r = ic(t), l = r === "transform" ? MR : q1;
  return this.attrTween(t, typeof a == "function" ? (r.local ? QR : FR)(r, l, em(this, "attr." + t, a)) : a == null ? (r.local ? XR : IR)(r) : (r.local ? ZR : GR)(r, l, a));
}
function KR(t, a) {
  return function(r) {
    this.setAttribute(t, a.call(this, r));
  };
}
function JR(t, a) {
  return function(r) {
    this.setAttributeNS(t.space, t.local, a.call(this, r));
  };
}
function WR(t, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && JR(t, u)), r;
  }
  return s._value = a, s;
}
function eT(t, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && KR(t, u)), r;
  }
  return s._value = a, s;
}
function tT(t, a) {
  var r = "attr." + t;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = ic(t);
  return this.tween(r, (l.local ? WR : eT)(l, a));
}
function nT(t, a) {
  return function() {
    Wh(this, t).delay = +a.apply(this, arguments);
  };
}
function aT(t, a) {
  return a = +a, function() {
    Wh(this, t).delay = a;
  };
}
function iT(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? nT : aT)(a, t)) : xa(this.node(), a).delay;
}
function rT(t, a) {
  return function() {
    Ha(this, t).duration = +a.apply(this, arguments);
  };
}
function lT(t, a) {
  return a = +a, function() {
    Ha(this, t).duration = a;
  };
}
function oT(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? rT : lT)(a, t)) : xa(this.node(), a).duration;
}
function sT(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Ha(this, t).ease = a;
  };
}
function uT(t) {
  var a = this._id;
  return arguments.length ? this.each(sT(a, t)) : xa(this.node(), a).ease;
}
function cT(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Ha(this, t).ease = r;
  };
}
function fT(t) {
  if (typeof t != "function") throw new Error();
  return this.each(cT(this._id, t));
}
function dT(t) {
  typeof t != "function" && (t = v1(t));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = l[s] = [], g, m = 0; m < c; ++m)
      (g = u[m]) && t.call(g, g.__data__, m, u) && h.push(g);
  return new si(l, this._parents, this._name, this._id);
}
function hT(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, r = t._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), h = 0; h < u; ++h)
    for (var g = a[h], m = r[h], y = g.length, p = c[h] = new Array(y), v, b = 0; b < y; ++b)
      (v = g[b] || m[b]) && (p[b] = v);
  for (; h < l; ++h)
    c[h] = a[h];
  return new si(c, this._parents, this._name, this._id);
}
function mT(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function pT(t, a, r) {
  var l, s, u = mT(a) ? Wh : Ha;
  return function() {
    var c = u(this, t), h = c.on;
    h !== l && (s = (l = h).copy()).on(a, r), c.on = s;
  };
}
function gT(t, a) {
  var r = this._id;
  return arguments.length < 2 ? xa(this.node(), r).on.on(t) : this.each(pT(r, t, a));
}
function yT(t) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== t) return;
    a && a.removeChild(this);
  };
}
function vT() {
  return this.on("end.remove", yT(this._id));
}
function bT(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = Fh(t));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var h = l[c], g = h.length, m = u[c] = new Array(g), y, p, v = 0; v < g; ++v)
      (y = h[v]) && (p = t.call(y, y.__data__, v, h)) && ("__data__" in y && (p.__data__ = y.__data__), m[v] = p, lc(m[v], a, r, v, m, xa(y, r)));
  return new si(u, this._parents, a, r);
}
function xT(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = y1(t));
  for (var l = this._groups, s = l.length, u = [], c = [], h = 0; h < s; ++h)
    for (var g = l[h], m = g.length, y, p = 0; p < m; ++p)
      if (y = g[p]) {
        for (var v = t.call(y, y.__data__, p, g), b, w = xa(y, r), N = 0, M = v.length; N < M; ++N)
          (b = v[N]) && lc(b, a, r, N, v, w);
        u.push(v), c.push(y);
      }
  return new si(u, c, a, r);
}
var wT = Go.prototype.constructor;
function ST() {
  return new wT(this._groups, this._parents);
}
function ET(t, a) {
  var r, l, s;
  return function() {
    var u = gl(this, t), c = (this.style.removeProperty(t), gl(this, t));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function Y1(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function _T(t, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = gl(this, t);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function NT(t, a, r) {
  var l, s, u;
  return function() {
    var c = gl(this, t), h = r(this), g = h + "";
    return h == null && (g = h = (this.style.removeProperty(t), gl(this, t))), c === g ? null : c === l && g === s ? u : (s = g, u = a(l = c, h));
  };
}
function CT(t, a) {
  var r, l, s, u = "style." + a, c = "end." + u, h;
  return function() {
    var g = Ha(this, t), m = g.on, y = g.value[u] == null ? h || (h = Y1(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), g.on = l;
  };
}
function RT(t, a, r) {
  var l = (t += "") == "transform" ? TR : q1;
  return a == null ? this.styleTween(t, ET(t, l)).on("end.style." + t, Y1(t)) : typeof a == "function" ? this.styleTween(t, NT(t, l, em(this, "style." + t, a))).each(CT(this._id, t)) : this.styleTween(t, _T(t, l, a), r).on("end.style." + t, null);
}
function TT(t, a, r) {
  return function(l) {
    this.style.setProperty(t, a.call(this, l), r);
  };
}
function MT(t, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && TT(t, c, r)), l;
  }
  return u._value = a, u;
}
function DT(t, a, r) {
  var l = "style." + (t += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, MT(t, a, r ?? ""));
}
function AT(t) {
  return function() {
    this.textContent = t;
  };
}
function zT(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function OT(t) {
  return this.tween("text", typeof t == "function" ? zT(em(this, "text", t)) : AT(t == null ? "" : t + ""));
}
function jT(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function LT(t) {
  var a, r;
  function l() {
    var s = t.apply(this, arguments);
    return s !== r && (a = (r = s) && jT(s)), a;
  }
  return l._value = t, l;
}
function HT(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, LT(t));
}
function BT() {
  for (var t = this._name, a = this._id, r = $1(), l = this._groups, s = l.length, u = 0; u < s; ++u)
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
  return new si(l, this._parents, t, r);
}
function UT() {
  var t, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var h = { value: c }, g = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = Ha(this, l), y = m.on;
      y !== t && (a = (t = y).copy(), a._.cancel.push(h), a._.interrupt.push(h), a._.end.push(g)), m.on = a;
    }), s === 0 && u();
  });
}
var kT = 0;
function si(t, a, r, l) {
  this._groups = t, this._parents = a, this._name = r, this._id = l;
}
function $1() {
  return ++kT;
}
var ti = Go.prototype;
si.prototype = {
  constructor: si,
  select: bT,
  selectAll: xT,
  selectChild: ti.selectChild,
  selectChildren: ti.selectChildren,
  filter: dT,
  merge: hT,
  selection: ST,
  transition: BT,
  call: ti.call,
  nodes: ti.nodes,
  node: ti.node,
  size: ti.size,
  empty: ti.empty,
  each: ti.each,
  on: gT,
  attr: PR,
  attrTween: tT,
  style: RT,
  styleTween: DT,
  text: OT,
  textTween: HT,
  remove: vT,
  tween: $R,
  delay: iT,
  duration: oT,
  ease: uT,
  easeVarying: fT,
  end: UT,
  [Symbol.iterator]: ti[Symbol.iterator]
};
function VT(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qT = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: VT
};
function YT(t, a) {
  for (var r; !(r = t.__transition) || !(r = r[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function $T(t) {
  var a, r;
  t instanceof si ? (a = t._id, t = t._name) : (a = $1(), (r = qT).time = Jh(), t = t == null ? null : t + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], h = c.length, g, m = 0; m < h; ++m)
      (g = c[m]) && lc(g, t, a, m, c, r || YT(g, a));
  return new si(l, this._parents, t, a);
}
Go.prototype.interrupt = VR;
Go.prototype.transition = $T;
const mu = (t) => () => t;
function IT(t, {
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
function li(t, a, r) {
  this.k = t, this.x = a, this.y = r;
}
li.prototype = {
  constructor: li,
  scale: function(t) {
    return t === 1 ? this : new li(this.k * t, this.x, this.y);
  },
  translate: function(t, a) {
    return t === 0 & a === 0 ? this : new li(this.k, this.x + this.k * t, this.y + this.k * a);
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
var oc = new li(1, 0, 0);
I1.prototype = li.prototype;
function I1(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return oc;
  return t.__zoom;
}
function jd(t) {
  t.stopImmediatePropagation();
}
function wo(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function XT(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function GT() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function nv() {
  return this.__zoom || oc;
}
function ZT(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function FT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function QT(t, a, r) {
  var l = t.invertX(a[0][0]) - r[0][0], s = t.invertX(a[1][0]) - r[1][0], u = t.invertY(a[0][1]) - r[0][1], c = t.invertY(a[1][1]) - r[1][1];
  return t.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function X1() {
  var t = XT, a = GT, r = QT, l = ZT, s = FT, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, g = zu, m = ac("start", "zoom", "end"), y, p, v, b = 500, w = 150, N = 0, M = 10;
  function R(j) {
    j.property("__zoom", nv).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(j, X, C, L) {
    var Z = j.selection ? j.selection() : j;
    Z.property("__zoom", nv), j !== Z ? H(j, X, C, L) : Z.interrupt().each(function() {
      U(this, arguments).event(L).start().zoom(null, typeof X == "function" ? X.apply(this, arguments) : X).end();
    });
  }, R.scaleBy = function(j, X, C, L) {
    R.scaleTo(j, function() {
      var Z = this.__zoom.k, V = typeof X == "function" ? X.apply(this, arguments) : X;
      return Z * V;
    }, C, L);
  }, R.scaleTo = function(j, X, C, L) {
    R.transform(j, function() {
      var Z = a.apply(this, arguments), V = this.__zoom, P = C == null ? O(Z) : typeof C == "function" ? C.apply(this, arguments) : C, D = V.invert(P), q = typeof X == "function" ? X.apply(this, arguments) : X;
      return r(E(z(V, q), P, D), Z, c);
    }, C, L);
  }, R.translateBy = function(j, X, C, L) {
    R.transform(j, function() {
      return r(this.__zoom.translate(
        typeof X == "function" ? X.apply(this, arguments) : X,
        typeof C == "function" ? C.apply(this, arguments) : C
      ), a.apply(this, arguments), c);
    }, null, L);
  }, R.translateTo = function(j, X, C, L, Z) {
    R.transform(j, function() {
      var V = a.apply(this, arguments), P = this.__zoom, D = L == null ? O(V) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(oc.translate(D[0], D[1]).scale(P.k).translate(
        typeof X == "function" ? -X.apply(this, arguments) : -X,
        typeof C == "function" ? -C.apply(this, arguments) : -C
      ), V, c);
    }, L, Z);
  };
  function z(j, X) {
    return X = Math.max(u[0], Math.min(u[1], X)), X === j.k ? j : new li(X, j.x, j.y);
  }
  function E(j, X, C) {
    var L = X[0] - C[0] * j.k, Z = X[1] - C[1] * j.k;
    return L === j.x && Z === j.y ? j : new li(j.k, L, Z);
  }
  function O(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function H(j, X, C, L) {
    j.on("start.zoom", function() {
      U(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      U(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var Z = this, V = arguments, P = U(Z, V).event(L), D = a.apply(Z, V), q = C == null ? O(D) : typeof C == "function" ? C.apply(Z, V) : C, Q = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), te = Z.__zoom, se = typeof X == "function" ? X.apply(Z, V) : X, he = g(te.invert(q).concat(Q / te.k), se.invert(q).concat(Q / se.k));
      return function(me) {
        if (me === 1) me = se;
        else {
          var ee = he(me), ge = Q / ee[2];
          me = new li(ge, q[0] - ee[0] * ge, q[1] - ee[1] * ge);
        }
        P.zoom(null, me);
      };
    });
  }
  function U(j, X, C) {
    return !C && j.__zooming || new B(j, X);
  }
  function B(j, X) {
    this.that = j, this.args = X, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, X), this.taps = 0;
  }
  B.prototype = {
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
      var X = qn(this.that).datum();
      m.call(
        j,
        this.that,
        new IT(j, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: m
        }),
        X
      );
    }
  };
  function A(j, ...X) {
    if (!t.apply(this, arguments)) return;
    var C = U(this, X).event(j), L = this.__zoom, Z = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), V = ha(j);
    if (C.wheel)
      (C.mouse[0][0] !== V[0] || C.mouse[0][1] !== V[1]) && (C.mouse[1] = L.invert(C.mouse[0] = V)), clearTimeout(C.wheel);
    else {
      if (L.k === Z) return;
      C.mouse = [V, L.invert(V)], Lu(this), C.start();
    }
    wo(j), C.wheel = setTimeout(P, w), C.zoom("mouse", r(E(z(L, Z), C.mouse[0], C.mouse[1]), C.extent, c));
    function P() {
      C.wheel = null, C.end();
    }
  }
  function I(j, ...X) {
    if (v || !t.apply(this, arguments)) return;
    var C = j.currentTarget, L = U(this, X, !0).event(j), Z = qn(j.view).on("mousemove.zoom", q, !0).on("mouseup.zoom", Q, !0), V = ha(j, C), P = j.clientX, D = j.clientY;
    T1(j.view), jd(j), L.mouse = [V, this.__zoom.invert(V)], Lu(this), L.start();
    function q(te) {
      if (wo(te), !L.moved) {
        var se = te.clientX - P, he = te.clientY - D;
        L.moved = se * se + he * he > N;
      }
      L.event(te).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ha(te, C), L.mouse[1]), L.extent, c));
    }
    function Q(te) {
      Z.on("mousemove.zoom mouseup.zoom", null), M1(te.view, L.moved), wo(te), L.event(te).end();
    }
  }
  function le(j, ...X) {
    if (t.apply(this, arguments)) {
      var C = this.__zoom, L = ha(j.changedTouches ? j.changedTouches[0] : j, this), Z = C.invert(L), V = C.k * (j.shiftKey ? 0.5 : 2), P = r(E(z(C, V), L, Z), a.apply(this, X), c);
      wo(j), h > 0 ? qn(this).transition().duration(h).call(H, P, L, j) : qn(this).call(R.transform, P, L, j);
    }
  }
  function $(j, ...X) {
    if (t.apply(this, arguments)) {
      var C = j.touches, L = C.length, Z = U(this, X, j.changedTouches.length === L).event(j), V, P, D, q;
      for (jd(j), P = 0; P < L; ++P)
        D = C[P], q = ha(D, this), q = [q, this.__zoom.invert(q), D.identifier], Z.touch0 ? !Z.touch1 && Z.touch0[2] !== q[2] && (Z.touch1 = q, Z.taps = 0) : (Z.touch0 = q, V = !0, Z.taps = 1 + !!y);
      y && (y = clearTimeout(y)), V && (Z.taps < 2 && (p = q[0], y = setTimeout(function() {
        y = null;
      }, b)), Lu(this), Z.start());
    }
  }
  function K(j, ...X) {
    if (this.__zooming) {
      var C = U(this, X).event(j), L = j.changedTouches, Z = L.length, V, P, D, q;
      for (wo(j), V = 0; V < Z; ++V)
        P = L[V], D = ha(P, this), C.touch0 && C.touch0[2] === P.identifier ? C.touch0[0] = D : C.touch1 && C.touch1[2] === P.identifier && (C.touch1[0] = D);
      if (P = C.that.__zoom, C.touch1) {
        var Q = C.touch0[0], te = C.touch0[1], se = C.touch1[0], he = C.touch1[1], me = (me = se[0] - Q[0]) * me + (me = se[1] - Q[1]) * me, ee = (ee = he[0] - te[0]) * ee + (ee = he[1] - te[1]) * ee;
        P = z(P, Math.sqrt(me / ee)), D = [(Q[0] + se[0]) / 2, (Q[1] + se[1]) / 2], q = [(te[0] + he[0]) / 2, (te[1] + he[1]) / 2];
      } else if (C.touch0) D = C.touch0[0], q = C.touch0[1];
      else return;
      C.zoom("touch", r(E(P, D, q), C.extent, c));
    }
  }
  function re(j, ...X) {
    if (this.__zooming) {
      var C = U(this, X).event(j), L = j.changedTouches, Z = L.length, V, P;
      for (jd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, b), V = 0; V < Z; ++V)
        P = L[V], C.touch0 && C.touch0[2] === P.identifier ? delete C.touch0 : C.touch1 && C.touch1[2] === P.identifier && delete C.touch1;
      if (C.touch1 && !C.touch0 && (C.touch0 = C.touch1, delete C.touch1), C.touch0) C.touch0[1] = this.__zoom.invert(C.touch0[0]);
      else if (C.end(), C.taps === 2 && (P = ha(P, this), Math.hypot(p[0] - P[0], p[1] - P[1]) < M)) {
        var D = qn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return R.wheelDelta = function(j) {
    return arguments.length ? (l = typeof j == "function" ? j : mu(+j), R) : l;
  }, R.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : mu(!!j), R) : t;
  }, R.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : mu(!!j), R) : s;
  }, R.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : mu([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), R) : a;
  }, R.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], R) : [u[0], u[1]];
  }, R.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], R) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, R.constrain = function(j) {
    return arguments.length ? (r = j, R) : r;
  }, R.duration = function(j) {
    return arguments.length ? (h = +j, R) : h;
  }, R.interpolate = function(j) {
    return arguments.length ? (g = j, R) : g;
  }, R.on = function() {
    var j = m.on.apply(m, arguments);
    return j === m ? R : j;
  }, R.clickDistance = function(j) {
    return arguments.length ? (N = (j = +j) * j, R) : Math.sqrt(N);
  }, R.tapDistance = function(j) {
    return arguments.length ? (M = +j, R) : M;
  }, R;
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
}, Lo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], G1 = ["Enter", " ", "Escape"], Z1 = {
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
const F1 = {
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
var $i;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})($i || ($i = {}));
var Xu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Xu || (Xu = {}));
var Ae;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(Ae || (Ae = {}));
const av = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function Q1(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const P1 = (t) => "id" in t && "source" in t && "target" in t, PT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), tm = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Fo = (t, a = [0, 0]) => {
  const { width: r, height: l } = ci(t), s = t.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - c
  };
}, KT = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = t.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : tm(s) ? s : a.nodeLookup.get(s.id));
    const h = c ? Gu(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return sc(l, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return uc(r);
}, Qo = (t, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = sc(r, Gu(s)), l = !0);
  }), l ? uc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, nm = (t, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const h = {
    ..._l(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, g = [];
  for (const m of t.values()) {
    const { measured: y, selectable: p = !0, hidden: v = !1 } = m;
    if (c && !p || v)
      continue;
    const b = y.width ?? m.width ?? m.initialWidth ?? null, w = y.height ?? m.height ?? m.initialHeight ?? null, N = Bo(h, xl(m)), M = (b ?? 0) * (w ?? 0), R = u && N > 0;
    (!m.internals.handleBounds || R || N >= M || m.dragging) && g.push(m);
  }
  return g;
}, JT = (t, a) => {
  const r = /* @__PURE__ */ new Set();
  return t.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function WT(t, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function eM({ nodes: t, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (t.size === 0)
    return !0;
  const h = WT(t, c), g = Qo(h), m = im(g, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function K1({ nodeId: t, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
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
async function tM({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const b = u.has(v.id), w = !b && v.parentId && c.find((N) => N.id === v.parentId);
    (b || w) && c.push(v);
  }
  const h = new Set(a.map((v) => v.id)), g = l.filter((v) => v.deletable !== !1), y = JT(c, g);
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
function J1(t, a, r) {
  const { width: l, height: s } = ci(r), { x: u, y: c } = r.internals.positionAbsolute;
  return wr(t, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const iv = (t, a, r) => t < a ? bl(Math.abs(t - a), 1, a) / a : t > r ? -bl(Math.abs(t - r), 1, a) / a : 0, am = (t, a, r = 15, l = 40) => {
  const s = iv(t.x, l, a.width - l) * r, u = iv(t.y, l, a.height - l) * r;
  return [s, u];
}, sc = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), ch = ({ x: t, y: a, width: r, height: l }) => ({
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
  const { x: r, y: l } = tm(t) ? t.internals.positionAbsolute : Fo(t, a);
  return {
    x: r,
    y: l,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Gu = (t, a = [0, 0]) => {
  const { x: r, y: l } = tm(t) ? t.internals.positionAbsolute : Fo(t, a);
  return {
    x: r,
    y: l,
    x2: r + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: l + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, W1 = (t, a) => uc(sc(ch(t), ch(a))), Bo = (t, a) => {
  const r = Math.max(0, Math.min(t.x + t.width, a.x + a.width) - Math.max(t.x, a.x)), l = Math.max(0, Math.min(t.y + t.height, a.y + a.height) - Math.max(t.y, a.y));
  return Math.ceil(r * l);
}, rv = (t) => pa(t.width) && pa(t.height) && pa(t.x) && pa(t.y), pa = (t) => !isNaN(t) && isFinite(t), ex = (t, a) => (r, l) => {
}, Po = (t, a = [1, 1]) => ({
  x: a[0] * Math.round(t.x / a[0]),
  y: a[1] * Math.round(t.y / a[1])
}), _l = ({ x: t, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const h = {
    x: (t - r) / s,
    y: (a - l) / s
  };
  return u ? Po(h, c) : h;
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
function nM(t, a, r) {
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
function aM(t, a, r, l, s, u) {
  const { x: c, y: h } = wl(t, [a, r, l]), { x: g, y: m } = wl({ x: t.x + t.width, y: t.y + t.height }, [a, r, l]), y = s - g, p = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(p)
  };
}
const im = (t, a, r, l, s, u) => {
  const c = nM(u, a, r), h = (a - c.x) / t.width, g = (r - c.y) / t.height, m = Math.min(h, g), y = bl(m, l, s), p = t.x + t.width / 2, v = t.y + t.height / 2, b = a / 2 - p * y, w = r / 2 - v * y, N = aM(t, b, w, y, a, r), M = {
    left: Math.min(N.left - c.left, 0),
    top: Math.min(N.top - c.top, 0),
    right: Math.min(N.right - c.right, 0),
    bottom: Math.min(N.bottom - c.bottom, 0)
  };
  return {
    x: b - M.left + M.right,
    y: w - M.top + M.bottom,
    zoom: y
  };
}, Uo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Sr(t) {
  return t != null && t !== "parent";
}
function ci(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function tx(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function nx(t, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...t }, c = l.get(r);
  if (c) {
    const h = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function lv(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const r of t)
    if (!a.has(r))
      return !1;
  return !0;
}
function iM() {
  let t, a;
  return { promise: new Promise((l, s) => {
    t = l, a = s;
  }), resolve: t, reject: a };
}
function rM(t) {
  return { ...Z1, ...t || {} };
}
function To(t, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = ga(t), h = _l({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: g, y: m } = r ? Po(h, a) : h;
  return {
    xSnapped: g,
    ySnapped: m,
    ...h
  };
}
const rm = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), ax = (t) => t?.getRootNode?.() || window?.document, lM = ["INPUT", "SELECT", "TEXTAREA"];
function ix(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : lM.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const rx = (t) => "clientX" in t, ga = (t, a) => {
  const r = rx(t), l = r ? t.clientX : t.touches?.[0].clientX, s = r ? t.clientY : t.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, ov = (t, a, r, l, s) => {
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
      ...rm(c)
    };
  });
};
function lx({ sourceX: t, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: h }) {
  const g = t * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + h * 0.375 + l * 0.125, y = Math.abs(g - t), p = Math.abs(m - a);
  return [g, m, y, p];
}
function pu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function sv({ pos: t, x1: a, y1: r, x2: l, y2: s, c: u }) {
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
function ox({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [h, g] = sv({
    pos: r,
    x1: t,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = sv({
    pos: u,
    x1: l,
    y1: s,
    x2: t,
    y2: a,
    c
  }), [p, v, b, w] = lx({
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
function sx({ sourceX: t, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - t) / 2, u = r < t ? r + s : r - s, c = Math.abs(l - a) / 2, h = l < a ? l + c : l - c;
  return [u, h, s, c];
}
function oM({ sourceNode: t, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + h;
}
function sM({ sourceNode: t, targetNode: a, width: r, height: l, transform: s }) {
  const u = sc(Gu(t), Gu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Bo(c, uc(u)) > 0;
}
const uM = ({ source: t, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${t}${a || ""}-${r}${l || ""}`, cM = (t, a) => a.some((r) => r.source === t.source && r.target === t.target && (r.sourceHandle === t.sourceHandle || !r.sourceHandle && !t.sourceHandle) && (r.targetHandle === t.targetHandle || !r.targetHandle && !t.targetHandle)), fM = (t, a, r = {}) => {
  if (!t.source || !t.target)
    return r.onError?.("006", ya.error006()), a;
  const l = r.getEdgeId || uM;
  let s;
  return P1(t) ? s = { ...t } : s = {
    ...t,
    id: l(t)
  }, cM(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function ux({ sourceX: t, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, h] = sx({
    sourceX: t,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${t},${a}L ${r},${l}`, s, u, c, h];
}
const uv = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, dM = ({ source: t, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? t.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, cv = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function hM({ source: t, sourcePosition: a = Ae.Bottom, target: r, targetPosition: l = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const h = uv[a], g = uv[l], m = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: r.x + g.x * u, y: r.y + g.y * u }, p = dM({
    source: m,
    sourcePosition: a,
    target: y
  }), v = p.x !== 0 ? "x" : "y", b = p[v];
  let w = [], N, M;
  const R = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, O] = sx({
    sourceX: t.x,
    sourceY: t.y,
    targetX: r.x,
    targetY: r.y
  });
  if (h[v] * g[v] === -1) {
    v === "x" ? (N = s.x ?? m.x + (y.x - m.x) * c, M = s.y ?? (m.y + y.y) / 2) : (N = s.x ?? (m.x + y.x) / 2, M = s.y ?? m.y + (y.y - m.y) * c);
    const A = [
      { x: N, y: m.y },
      { x: N, y: y.y }
    ], I = [
      { x: m.x, y: M },
      { x: y.x, y: M }
    ];
    h[v] === b ? w = v === "x" ? A : I : w = v === "x" ? I : A;
  } else {
    const A = [{ x: m.x, y: y.y }], I = [{ x: y.x, y: m.y }];
    if (v === "x" ? w = h.x === b ? I : A : w = h.y === b ? A : I, a === l) {
      const j = Math.abs(t[v] - r[v]);
      if (j <= u) {
        const X = Math.min(u - 1, u - j);
        h[v] === b ? R[v] = (m[v] > t[v] ? -1 : 1) * X : z[v] = (y[v] > r[v] ? -1 : 1) * X;
      }
    }
    if (a !== l) {
      const j = v === "x" ? "y" : "x", X = h[v] === g[j], C = m[j] > y[j], L = m[j] < y[j];
      (h[v] === 1 && (!X && C || X && L) || h[v] !== 1 && (!X && L || X && C)) && (w = v === "x" ? A : I);
    }
    const le = { x: m.x + R.x, y: m.y + R.y }, $ = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(le.x - w[0].x), Math.abs($.x - w[0].x)), re = Math.max(Math.abs(le.y - w[0].y), Math.abs($.y - w[0].y));
    K >= re ? (N = (le.x + $.x) / 2, M = w[0].y) : (N = w[0].x, M = (le.y + $.y) / 2);
  }
  const H = { x: m.x + R.x, y: m.y + R.y }, U = { x: y.x + z.x, y: y.y + z.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...H.x !== w[0].x || H.y !== w[0].y ? [H] : [],
    ...w,
    ...U.x !== w[w.length - 1].x || U.y !== w[w.length - 1].y ? [U] : [],
    r
  ], N, M, E, O];
}
function mM(t, a, r, l) {
  const s = Math.min(cv(t, a) / 2, cv(a, r) / 2, l), { x: u, y: c } = a;
  if (t.x === u && u === r.x || t.y === c && c === r.y)
    return `L${u} ${c}`;
  if (t.y === c) {
    const m = t.x < r.x ? -1 : 1, y = t.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const h = t.x < r.x ? 1 : -1, g = t.y < r.y ? -1 : 1;
  return `L ${u},${c + s * g}Q ${u},${c} ${u + s * h},${c}`;
}
function fh({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: h, centerY: g, offset: m = 20, stepPosition: y = 0.5 }) {
  const [p, v, b, w, N] = hM({
    source: { x: t, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: h, y: g },
    offset: m,
    stepPosition: y
  });
  let M = `M${p[0].x} ${p[0].y}`;
  for (let R = 1; R < p.length - 1; R++)
    M += mM(p[R - 1], p[R], p[R + 1], c);
  return M += `L${p[p.length - 1].x} ${p[p.length - 1].y}`, [M, v, b, w, N];
}
function fv(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function pM(t) {
  const { sourceNode: a, targetNode: r } = t;
  if (!fv(a) || !fv(r))
    return null;
  const l = a.internals.handleBounds || dv(a.handles), s = r.internals.handleBounds || dv(r.handles), u = hv(l?.source ?? [], t.sourceHandle), c = hv(
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
function dv(t) {
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
  const s = (a?.x ?? 0) + t.internals.positionAbsolute.x, u = (a?.y ?? 0) + t.internals.positionAbsolute.y, { width: c, height: h } = a ?? ci(t);
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
function hv(t, a) {
  return t && (a ? t.find((r) => r.id === a) : t[0]) || null;
}
function dh(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((l) => `${l}=${t[l]}`).join("&")}` : "";
}
function gM(t, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((c, h) => ([h.markerStart || l, h.markerEnd || s].forEach((g) => {
    if (g && typeof g == "object") {
      const m = dh(g, a);
      u.has(m) || (c.push({ id: m, color: g.color || r, ...g }), u.add(m));
    }
  }), c), []).sort((c, h) => c.id.localeCompare(h.id));
}
const cx = 1e3, yM = 10, lm = {
  nodeOrigin: [0, 0],
  nodeExtent: Lo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, vM = {
  ...lm,
  checkEquality: !0
};
function om(t, a) {
  const r = { ...t };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function bM(t, a, r) {
  const l = om(lm, r);
  for (const s of t.values())
    if (s.parentId)
      um(s, t, a, l);
    else {
      const u = Fo(s, l.nodeOrigin), c = Sr(s.extent) ? s.extent : l.nodeExtent, h = wr(u, c, ci(s));
      s.internals.positionAbsolute = h;
    }
}
function xM(t, a) {
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
function sm(t) {
  return t === "manual";
}
function hh(t, a, r, l = {}) {
  const s = om(vM, l), u = { i: 0 }, c = new Map(a), h = s?.elevateNodesOnSelect && !sm(s.zIndexMode) ? cx : 0;
  let g = t.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of t) {
    let p = c.get(y.id);
    if (s.checkEquality && y === p?.internals.userNode)
      a.set(y.id, p);
    else {
      const v = Fo(y, s.nodeOrigin), b = Sr(y.extent) ? y.extent : s.nodeExtent, w = wr(v, b, ci(y));
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
          handleBounds: xM(y, p),
          z: fx(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, p);
    }
    (p.measured === void 0 || p.measured.width === void 0 || p.measured.height === void 0) && !p.hidden && (g = !1), y.parentId && um(p, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: g, hasSelectedNodes: m };
}
function wM(t, a) {
  if (!t.parentId)
    return;
  const r = a.get(t.parentId);
  r ? r.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function um(t, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: h, zIndexMode: g } = om(lm, l), m = t.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  wM(t, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && g === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * yM), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const p = u && !sm(g) ? cx : 0, { x: v, y: b, z: w } = SM(t, y, c, h, p, g), { positionAbsolute: N } = t.internals, M = v !== N.x || b !== N.y;
  (M || w !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: M ? { x: v, y: b } : N,
      z: w
    }
  });
}
function fx(t, a, r) {
  const l = pa(t.zIndex) ? t.zIndex : 0;
  return sm(r) ? l : l + (t.selected ? a : 0);
}
function SM(t, a, r, l, s, u) {
  const { x: c, y: h } = a.internals.positionAbsolute, g = ci(t), m = Fo(t, r), y = Sr(t.extent) ? wr(m, t.extent, g) : m;
  let p = wr({ x: c + y.x, y: h + y.y }, l, g);
  t.extent === "parent" && (p = J1(p, g, a));
  const v = fx(t, s, u), b = a.internals.z ?? 0;
  return {
    x: p.x,
    y: p.y,
    z: b >= v ? b + 1 : v
  };
}
function cm(t, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of t) {
    const h = a.get(c.parentId);
    if (!h)
      continue;
    const g = u.get(c.parentId)?.expandedRect ?? xl(h), m = W1(g, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: h }, g) => {
    const m = h.internals.positionAbsolute, y = ci(h), p = h.origin ?? l, v = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, b = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, w = Math.max(y.width, Math.round(c.width)), N = Math.max(y.height, Math.round(c.height)), M = (w - y.width) * p[0], R = (N - y.height) * p[1];
    (v > 0 || b > 0 || M || R) && (s.push({
      id: g,
      type: "position",
      position: {
        x: h.position.x - v + M,
        y: h.position.y - b + R
      }
    }), r.get(g)?.forEach((z) => {
      t.some((E) => E.id === z.id) || s.push({
        id: z.id,
        type: "position",
        position: {
          x: z.position.x + v,
          y: z.position.y + b
        }
      });
    })), (y.width < c.width || y.height < c.height || v || b) && s.push({
      id: g,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (v ? p[0] * v - M : 0),
        height: N + (b ? p[1] * b - R : 0)
      }
    });
  }), s;
}
function EM(t, a, r, l, s, u, c) {
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
    const N = rm(b.nodeElement), M = w.measured.width !== N.width || w.measured.height !== N.height;
    if (!!(N.width && N.height && (M || !w.internals.handleBounds || b.force))) {
      const z = b.nodeElement.getBoundingClientRect(), E = Sr(w.extent) ? w.extent : u;
      let { positionAbsolute: O } = w.internals;
      w.parentId && w.extent === "parent" ? O = J1(O, N, a.get(w.parentId)) : E && (O = wr(O, E, N));
      const H = {
        ...w,
        measured: N,
        internals: {
          ...w.internals,
          positionAbsolute: O,
          handleBounds: {
            source: ov("source", b.nodeElement, z, p, w.id),
            target: ov("target", b.nodeElement, z, p, w.id)
          }
        }
      };
      a.set(w.id, H), w.parentId && um(H, a, r, { nodeOrigin: s, zIndexMode: c }), g = !0, M && (m.push({
        id: w.id,
        type: "dimensions",
        dimensions: N
      }), w.expandParent && w.parentId && v.push({
        id: w.id,
        parentId: w.parentId,
        rect: xl(H, s)
      }));
    }
  }
  if (v.length > 0) {
    const b = cm(v, a, r, s);
    m.push(...b);
  }
  return { changes: m, updatedInternals: g };
}
async function _M({ delta: t, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
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
function mv(t, a, r, l, s, u) {
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
function dx(t, a, r) {
  t.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: h = null } = l, g = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: h }, m = `${s}-${c}--${u}-${h}`, y = `${u}-${h}--${s}-${c}`;
    mv("source", g, y, t, s, c), mv("target", g, m, t, u, h), a.set(l.id, l);
  }
}
function hx(t, a) {
  if (!t.parentId)
    return !1;
  const r = a.get(t.parentId);
  return r ? r.selected ? !0 : hx(r, a) : !1;
}
function pv(t, a, r) {
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
function NM(t, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of t)
    if ((c.selected || c.id === l) && (!c.parentId || !hx(c, t)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function Ld({ nodeId: t, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
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
function CM({ dragItems: t, snapGrid: a, x: r, y: l }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = Po(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function RM({ onNodeMouseDown: t, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, h = /* @__PURE__ */ new Map(), g = !1, m = { x: 0, y: 0 }, y = null, p = !1, v = null, b = !1, w = !1, N = null;
  function M({ noDragClassName: z, handleSelector: E, domNode: O, isSelectable: H, nodeId: U, nodeClickDistance: B = 0 }) {
    v = qn(O);
    function A({ x: K, y: re }) {
      const { nodeLookup: j, nodeExtent: X, snapGrid: C, snapToGrid: L, nodeOrigin: Z, onNodeDrag: V, onSelectionDrag: P, onError: D, updateNodePositions: q } = a();
      u = { x: K, y: re };
      let Q = !1;
      const te = h.size > 1, se = te && X ? ch(Qo(h)) : null, he = te && L ? CM({
        dragItems: h,
        snapGrid: C,
        x: K,
        y: re
      }) : null;
      for (const [me, ee] of h) {
        if (!j.has(me))
          continue;
        let ge = { x: K - ee.distance.x, y: re - ee.distance.y };
        L && (ge = he ? {
          x: Math.round(ge.x + he.x),
          y: Math.round(ge.y + he.y)
        } : Po(ge, C));
        let ze = null;
        if (te && X && !ee.extent && se) {
          const { positionAbsolute: xe } = ee.internals, Ce = xe.x - se.x + X[0][0], Ye = xe.x + ee.measured.width - se.x2 + X[1][0], ft = xe.y - se.y + X[0][1], Te = xe.y + ee.measured.height - se.y2 + X[1][1];
          ze = [
            [Ce, ft],
            [Ye, Te]
          ];
        }
        const { position: Re, positionAbsolute: Se } = K1({
          nodeId: me,
          nextPosition: ge,
          nodeLookup: j,
          nodeExtent: ze || X,
          nodeOrigin: Z,
          onError: D
        });
        Q = Q || ee.position.x !== Re.x || ee.position.y !== Re.y, ee.position = Re, ee.internals.positionAbsolute = Se;
      }
      if (w = w || Q, !!Q && (q(h, !0), N && (l || V || !U && P))) {
        const [me, ee] = Ld({
          nodeId: U,
          dragItems: h,
          nodeLookup: j
        });
        l?.(N, h, me, ee), V?.(N, me, ee), U || P?.(N, ee);
      }
    }
    async function I() {
      if (!y)
        return;
      const { transform: K, panBy: re, autoPanSpeed: j, autoPanOnNodeDrag: X } = a();
      if (!X) {
        g = !1, cancelAnimationFrame(c);
        return;
      }
      const [C, L] = am(m, y, j);
      (C !== 0 || L !== 0) && (u.x = (u.x ?? 0) - C / K[2], u.y = (u.y ?? 0) - L / K[2], await re({ x: C, y: L }) && A(u)), c = requestAnimationFrame(I);
    }
    function le(K) {
      const { nodeLookup: re, multiSelectionActive: j, nodesDraggable: X, transform: C, snapGrid: L, snapToGrid: Z, selectNodesOnDrag: V, onNodeDragStart: P, onSelectionDragStart: D, unselectNodesAndEdges: q } = a();
      p = !0, (!V || !H) && !j && U && (re.get(U)?.selected || q()), H && V && U && t?.(U);
      const Q = To(K.sourceEvent, { transform: C, snapGrid: L, snapToGrid: Z, containerBounds: y });
      if (u = Q, h = NM(re, X, Q, U), h.size > 0 && (r || P || !U && D)) {
        const [te, se] = Ld({
          nodeId: U,
          dragItems: h,
          nodeLookup: re
        });
        r?.(K.sourceEvent, h, te, se), P?.(K.sourceEvent, te, se), U || D?.(K.sourceEvent, se);
      }
    }
    const $ = D1().clickDistance(B).on("start", (K) => {
      const { domNode: re, nodeDragThreshold: j, transform: X, snapGrid: C, snapToGrid: L } = a();
      y = re?.getBoundingClientRect() || null, b = !1, w = !1, N = K.sourceEvent, j === 0 && le(K), u = To(K.sourceEvent, { transform: X, snapGrid: C, snapToGrid: L, containerBounds: y }), m = ga(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: re, transform: j, snapGrid: X, snapToGrid: C, nodeDragThreshold: L, nodeLookup: Z } = a(), V = To(K.sourceEvent, { transform: j, snapGrid: X, snapToGrid: C, containerBounds: y });
      if (N = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      U && !Z.has(U)) && (b = !0), !b) {
        if (!g && re && p && (g = !0, I()), !p) {
          const P = ga(K.sourceEvent, y), D = P.x - m.x, q = P.y - m.y;
          Math.sqrt(D * D + q * q) > L && le(K);
        }
        (u.x !== V.xSnapped || u.y !== V.ySnapped) && h && p && (m = ga(K.sourceEvent, y), A(V));
      }
    }).on("end", (K) => {
      if (!p || b) {
        b && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (g = !1, p = !1, cancelAnimationFrame(c), h.size > 0) {
        const { nodeLookup: re, updateNodePositions: j, onNodeDragStop: X, onSelectionDragStop: C } = a();
        if (w && (j(h, !1), w = !1), s || X || !U && C) {
          const [L, Z] = Ld({
            nodeId: U,
            dragItems: h,
            nodeLookup: re,
            dragging: !1
          });
          s?.(K.sourceEvent, h, L, Z), X?.(K.sourceEvent, L, Z), U || C?.(K.sourceEvent, Z);
        }
      }
    }).filter((K) => {
      const re = K.target;
      return !K.button && (!z || !pv(re, `.${z}`, O)) && (!E || pv(re, E, O));
    });
    v.call($);
  }
  function R() {
    v?.on(".drag", null);
  }
  return {
    update: M,
    destroy: R
  };
}
function TM(t, a, r) {
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
const MM = 250;
function DM(t, a, r, l) {
  let s = [], u = 1 / 0;
  const c = TM(t, r, a + MM);
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
function mx(t, a, r, l, s, u = !1) {
  const c = l.get(t);
  if (!c)
    return null;
  const h = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], g = (r ? h?.find((m) => m.id === r) : h?.[0]) ?? null;
  return g && u ? { ...g, ...Er(c, g, g.position, !0) } : g;
}
function px(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function AM(t, a) {
  let r = null;
  return a ? r = !0 : t && !a && (r = !1), r;
}
const gx = () => !0;
function zM(t, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: h, nodeLookup: g, lib: m, autoPanOnConnect: y, flowId: p, panBy: v, cancelConnection: b, onConnectStart: w, onConnect: N, onConnectEnd: M, isValidConnection: R = gx, onReconnectEnd: z, updateConnection: E, getTransform: O, getFromHandle: H, autoPanSpeed: U, dragThreshold: B = 1, handleDomNode: A }) {
  const I = ax(t.target);
  let le = 0, $;
  const { x: K, y: re } = ga(t), j = px(u, A), X = h?.getBoundingClientRect();
  let C = !1;
  if (!X || !j)
    return;
  const L = mx(s, j, l, g, a);
  if (!L)
    return;
  let Z = ga(t, X), V = !1, P = null, D = !1, q = null;
  function Q() {
    if (!y || !X)
      return;
    const [Re, Se] = am(Z, X, U);
    v({ x: Re, y: Se }), le = requestAnimationFrame(Q);
  }
  const te = {
    ...L,
    nodeId: s,
    type: j,
    position: L.position
  }, se = g.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: Er(se, te, Ae.Left, !0),
    fromHandle: te,
    fromPosition: te.position,
    fromNode: se,
    to: Z,
    toHandle: null,
    toPosition: av[te.position],
    toNode: null,
    pointer: Z
  };
  function ee() {
    C = !0, E(me), w?.(t, { nodeId: s, handleId: l, handleType: j });
  }
  B === 0 && ee();
  function ge(Re) {
    if (!C) {
      const { x: Te, y: Ge } = ga(Re), Be = Te - K, $e = Ge - re;
      if (!(Be * Be + $e * $e > B * B))
        return;
      ee();
    }
    if (!H() || !te) {
      ze(Re);
      return;
    }
    const Se = O();
    Z = ga(Re, X), $ = DM(_l(Z, Se, !1, [1, 1]), r, g, te), V || (Q(), V = !0);
    const xe = yx(Re, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: I,
      lib: m,
      flowId: p,
      nodeLookup: g
    });
    q = xe.handleDomNode, P = xe.connection, D = AM(!!$, xe.isValid);
    const Ce = g.get(s), Ye = Ce ? Er(Ce, te, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: Ye,
      isValid: D,
      to: xe.toHandle && D ? wl({ x: xe.toHandle.x, y: xe.toHandle.y }, Se) : Z,
      toHandle: xe.toHandle,
      toPosition: D && xe.toHandle ? xe.toHandle.position : av[te.position],
      toNode: xe.toHandle ? g.get(xe.toHandle.nodeId) : null,
      pointer: Z
    };
    E(ft), me = ft;
  }
  function ze(Re) {
    if (!("touches" in Re && Re.touches.length > 0)) {
      if (C) {
        ($ || q) && P && D && N?.(P);
        const { inProgress: Se, ...xe } = me, Ce = {
          ...xe,
          toPosition: me.toHandle ? me.toPosition : null
        };
        M?.(Re, Ce), u && z?.(Re, Ce);
      }
      b(), cancelAnimationFrame(le), V = !1, D = !1, P = null, q = null, I.removeEventListener("mousemove", ge), I.removeEventListener("mouseup", ze), I.removeEventListener("touchmove", ge), I.removeEventListener("touchend", ze);
    }
  }
  I.addEventListener("mousemove", ge), I.addEventListener("mouseup", ze), I.addEventListener("touchmove", ge), I.addEventListener("touchend", ze);
}
function yx(t, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: h, flowId: g, isValidConnection: m = gx, nodeLookup: y }) {
  const p = u === "target", v = a ? c.querySelector(`.${h}-flow__handle[data-id="${g}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x: b, y: w } = ga(t), N = c.elementFromPoint(b, w), M = N?.classList.contains(`${h}-flow__handle`) ? N : v, R = {
    handleDomNode: M,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (M) {
    const z = px(void 0, M), E = M.getAttribute("data-nodeid"), O = M.getAttribute("data-handleid"), H = M.classList.contains("connectable"), U = M.classList.contains("connectableend");
    if (!E || !z)
      return R;
    const B = {
      source: p ? E : l,
      sourceHandle: p ? O : s,
      target: p ? l : E,
      targetHandle: p ? s : O
    };
    R.connection = B;
    const I = H && U && (r === vl.Strict ? p && z === "source" || !p && z === "target" : E !== l || O !== s);
    R.isValid = I && m(B), R.toHandle = mx(E, z, O, y, r, !0);
  }
  return R;
}
const mh = {
  onPointerDown: zM,
  isValid: yx
};
function OM({ domNode: t, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = qn(t);
  function u({ translateExtent: h, width: g, height: m, zoomStep: y = 1, pannable: p = !0, zoomable: v = !0, inversePan: b = !1 }) {
    const w = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), H = E.sourceEvent.ctrlKey && Uo() ? 10 : 1, U = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, B = O[2] * Math.pow(2, U * H);
      a.scaleTo(B);
    };
    let N = [0, 0];
    const M = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (N = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, R = (E) => {
      const O = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const H = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], U = [H[0] - N[0], H[1] - N[1]];
      N = H;
      const B = l() * Math.max(O[2], Math.log(O[2])) * (b ? -1 : 1), A = {
        x: O[0] - U[0] * B,
        y: O[1] - U[1] * B
      }, I = [
        [0, 0],
        [g, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, I, h);
    }, z = X1().on("start", M).on("zoom", p ? R : null).on("zoom.wheel", v ? w : null);
    s.call(z, {});
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
}), Hd = ({ x: t, y: a, zoom: r }) => oc.translate(t, a).scale(r), cl = (t, a) => t.target.closest(`.${a}`), vx = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), jM = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Bd = (t, a = 0, r = jM, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? t.transition().duration(a).ease(r).on("end", l) : t;
}, bx = (t) => {
  const a = t.ctrlKey && Uo() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function LM({ zoomPanValues: t, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: h, onPanZoom: g, onPanZoomEnd: m }) {
  return (y) => {
    if (cl(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const p = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const M = ha(y), R = bx(y), z = p * Math.pow(2, R);
      l.scaleTo(r, z, M, y);
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
    const N = cc(r.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (g?.(y, N), t.panScrollTimeout = setTimeout(() => {
      m?.(y, N), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, N));
  };
}
function HM({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, h = cl(l, t);
    if (l.ctrlKey && u && h && l.preventDefault(), c || h)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function BM({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = cc(l.transform);
    t.mouseButton = l.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function UM({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(r && vx(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, cc(u.transform));
  };
}
function kM({ zoomPanValues: t, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && vx(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), t.usedRightMouseButton = !1, l(!1), s)) {
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
function VM({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: h, noPanClassName: g, lib: m, connectionInProgress: y }) {
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
    const N = Array.isArray(l) && l.includes(p.button) || !p.button || p.button <= 1;
    return (!p.ctrlKey || w) && N;
  };
}
function qM({ domNode: t, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: h, onDraggingChange: g }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), p = X1().scaleExtent([a, r]).translateExtent(l), v = qn(t).call(p);
  z({
    x: s.x,
    y: s.y,
    zoom: bl(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const b = v.on("wheel.zoom"), w = v.on("dblclick.zoom");
  p.wheelDelta(bx);
  async function N($, K) {
    return v ? new Promise((re) => {
      p?.interpolate(K?.interpolate === "linear" ? Ro : zu).transform(Bd(v, K?.duration, K?.ease, () => re(!0)), $);
    }) : !1;
  }
  function M({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: re, userSelectionActive: j, panOnScroll: X, panOnDrag: C, panOnScrollMode: L, panOnScrollSpeed: Z, preventScrolling: V, zoomOnPinch: P, zoomOnScroll: D, zoomOnDoubleClick: q, zoomActivationKeyPressed: Q, lib: te, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: ee }) {
    j && !m.isZoomingOrPanning && R();
    const ge = X && !Q && !j;
    p.clickDistance(ee ? 1 / 0 : !pa(me) || me < 0 ? 0 : me);
    const ze = ge ? LM({
      zoomPanValues: m,
      noWheelClassName: $,
      d3Selection: v,
      d3Zoom: p,
      panOnScrollMode: L,
      panOnScrollSpeed: Z,
      zoomOnPinch: P,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : HM({
      noWheelClassName: $,
      preventScrolling: V,
      d3ZoomHandler: b
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Re = BM({
      zoomPanValues: m,
      onDraggingChange: g,
      onPanZoomStart: c
    });
    p.on("start", Re);
    const Se = UM({
      zoomPanValues: m,
      panOnDrag: C,
      onPaneContextMenu: !!re,
      onPanZoom: u,
      onTransformChange: se
    });
    p.on("zoom", Se);
    const xe = kM({
      zoomPanValues: m,
      panOnDrag: C,
      panOnScroll: X,
      onPaneContextMenu: re,
      onPanZoomEnd: h,
      onDraggingChange: g
    });
    p.on("end", xe);
    const Ce = VM({
      zoomActivationKeyPressed: Q,
      panOnDrag: C,
      zoomOnScroll: D,
      panOnScroll: X,
      zoomOnDoubleClick: q,
      zoomOnPinch: P,
      userSelectionActive: j,
      noPanClassName: K,
      noWheelClassName: $,
      lib: te,
      connectionInProgress: he
    });
    p.filter(Ce), q ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null);
  }
  function R() {
    p.on("zoom", null);
  }
  async function z($, K, re) {
    const j = Hd($), X = p?.constrain()(j, K, re);
    return X && await N(X), X;
  }
  async function E($, K) {
    const re = Hd($);
    return await N(re, K), re;
  }
  function O($) {
    if (v) {
      const K = Hd($), re = v.property("__zoom");
      (re.k !== $.zoom || re.x !== $.x || re.y !== $.y) && p?.transform(v, K, null, { sync: !0 });
    }
  }
  function H() {
    const $ = v ? I1(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function U($, K) {
    return v ? new Promise((re) => {
      p?.interpolate(K?.interpolate === "linear" ? Ro : zu).scaleTo(Bd(v, K?.duration, K?.ease, () => re(!0)), $);
    }) : !1;
  }
  async function B($, K) {
    return v ? new Promise((re) => {
      p?.interpolate(K?.interpolate === "linear" ? Ro : zu).scaleBy(Bd(v, K?.duration, K?.ease, () => re(!0)), $);
    }) : !1;
  }
  function A($) {
    p?.scaleExtent($);
  }
  function I($) {
    p?.translateExtent($);
  }
  function le($) {
    const K = !pa($) || $ < 0 ? 0 : $;
    p?.clickDistance(K);
  }
  return {
    update: M,
    destroy: R,
    setViewport: E,
    setViewportConstrained: z,
    getViewport: H,
    scaleTo: U,
    scaleBy: B,
    setScaleExtent: A,
    setTranslateExtent: I,
    syncViewport: O,
    setClickDistance: le
  };
}
var Sl;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Sl || (Sl = {}));
function YM({ width: t, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = t - a, h = r - l, g = [c > 0 ? 1 : c < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return c && s && (g[0] = g[0] * -1), h && u && (g[1] = g[1] * -1), g;
}
function gv(t) {
  const a = t.includes("right") || t.includes("left"), r = t.includes("bottom") || t.includes("top"), l = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function ki(t, a) {
  return Math.max(0, a - t);
}
function Vi(t, a) {
  return Math.max(0, t - a);
}
function gu(t, a, r) {
  return Math.max(0, a - t, t - r);
}
function yv(t, a) {
  return t ? !a : a;
}
function $M(t, a, r, l, s, u, c, h) {
  let { affectsX: g, affectsY: m } = a;
  const { isHorizontal: y, isVertical: p } = a, v = y && p, { xSnapped: b, ySnapped: w } = r, { minWidth: N, maxWidth: M, minHeight: R, maxHeight: z } = l, { x: E, y: O, width: H, height: U, aspectRatio: B } = t;
  let A = Math.floor(y ? b - t.pointerX : 0), I = Math.floor(p ? w - t.pointerY : 0);
  const le = H + (g ? -A : A), $ = U + (m ? -I : I), K = -u[0] * H, re = -u[1] * U;
  let j = gu(le, N, M), X = gu($, R, z);
  if (c) {
    let Z = 0, V = 0;
    g && A < 0 ? Z = ki(E + A + K, c[0][0]) : !g && A > 0 && (Z = Vi(E + le + K, c[1][0])), m && I < 0 ? V = ki(O + I + re, c[0][1]) : !m && I > 0 && (V = Vi(O + $ + re, c[1][1])), j = Math.max(j, Z), X = Math.max(X, V);
  }
  if (h) {
    let Z = 0, V = 0;
    g && A > 0 ? Z = Vi(E + A, h[0][0]) : !g && A < 0 && (Z = ki(E + le, h[1][0])), m && I > 0 ? V = Vi(O + I, h[0][1]) : !m && I < 0 && (V = ki(O + $, h[1][1])), j = Math.max(j, Z), X = Math.max(X, V);
  }
  if (s) {
    if (y) {
      const Z = gu(le / B, R, z) * B;
      if (j = Math.max(j, Z), c) {
        let V = 0;
        !g && !m || g && !m && v ? V = Vi(O + re + le / B, c[1][1]) * B : V = ki(O + re + (g ? A : -A) / B, c[0][1]) * B, j = Math.max(j, V);
      }
      if (h) {
        let V = 0;
        !g && !m || g && !m && v ? V = ki(O + le / B, h[1][1]) * B : V = Vi(O + (g ? A : -A) / B, h[0][1]) * B, j = Math.max(j, V);
      }
    }
    if (p) {
      const Z = gu($ * B, N, M) / B;
      if (X = Math.max(X, Z), c) {
        let V = 0;
        !g && !m || m && !g && v ? V = Vi(E + $ * B + K, c[1][0]) / B : V = ki(E + (m ? I : -I) * B + K, c[0][0]) / B, X = Math.max(X, V);
      }
      if (h) {
        let V = 0;
        !g && !m || m && !g && v ? V = ki(E + $ * B, h[1][0]) / B : V = Vi(E + (m ? I : -I) * B, h[0][0]) / B, X = Math.max(X, V);
      }
    }
  }
  I = I + (I < 0 ? X : -X), A = A + (A < 0 ? j : -j), s && (v ? le > $ * B ? I = (yv(g, m) ? -A : A) / B : A = (yv(g, m) ? -I : I) * B : y ? (I = A / B, m = g) : (A = I * B, g = m));
  const C = g ? E + A : E, L = m ? O + I : O;
  return {
    width: H + (g ? -A : A),
    height: U + (m ? -I : I),
    x: u[0] * A * (g ? -1 : 1) + C,
    y: u[1] * I * (m ? -1 : 1) + L
  };
}
const xx = { width: 0, height: 0, x: 0, y: 0 }, IM = {
  ...xx,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function XM(t, a, r) {
  const l = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, c = t.measured.height ?? 0, h = r[0] * u, g = r[1] * c;
  return [
    [l - h, s - g],
    [l + u - h, s + c - g]
  ];
}
function GM({ domNode: t, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = qn(t);
  let c = {
    controlDirection: gv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: m, boundaries: y, keepAspectRatio: p, resizeDirection: v, onResizeStart: b, onResize: w, onResizeEnd: N, shouldResize: M }) {
    let R = { ...xx }, z = { ...IM };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: p,
      controlDirection: gv(m)
    };
    let E, O = null, H = [], U, B, A, I = !1;
    const le = D1().on("start", ($) => {
      const { nodeLookup: K, transform: re, snapGrid: j, snapToGrid: X, nodeOrigin: C, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      O = L?.getBoundingClientRect() ?? null;
      const { xSnapped: Z, ySnapped: V } = To($.sourceEvent, {
        transform: re,
        snapGrid: j,
        snapToGrid: X,
        containerBounds: O
      });
      R = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, z = {
        ...R,
        pointerX: Z,
        pointerY: V,
        aspectRatio: R.width / R.height
      }, U = void 0, B = Sr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (U = K.get(E.parentId)), U && E.extent === "parent" && (B = [
        [0, 0],
        [U.measured.width, U.measured.height]
      ]), H = [], A = void 0;
      for (const [P, D] of K)
        if (D.parentId === a && (H.push({
          id: P,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const q = XM(D, E, D.origin ?? C);
          A ? A = [
            [Math.min(q[0][0], A[0][0]), Math.min(q[0][1], A[0][1])],
            [Math.max(q[1][0], A[1][0]), Math.max(q[1][1], A[1][1])]
          ] : A = q;
        }
      b?.($, { ...R });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: re, snapToGrid: j, nodeOrigin: X } = r(), C = To($.sourceEvent, {
        transform: K,
        snapGrid: re,
        snapToGrid: j,
        containerBounds: O
      }), L = [];
      if (!E)
        return;
      const { x: Z, y: V, width: P, height: D } = R, q = {}, Q = E.origin ?? X, { width: te, height: se, x: he, y: me } = $M(z, c.controlDirection, C, c.boundaries, c.keepAspectRatio, Q, B, A), ee = te !== P, ge = se !== D, ze = he !== Z && ee, Re = me !== V && ge;
      if (!ze && !Re && !ee && !ge)
        return;
      if ((ze || Re || Q[0] === 1 || Q[1] === 1) && (q.x = ze ? he : R.x, q.y = Re ? me : R.y, R.x = q.x, R.y = q.y, H.length > 0)) {
        const Ye = he - Z, ft = me - V;
        for (const Te of H)
          Te.position = {
            x: Te.position.x - Ye + Q[0] * (te - P),
            y: Te.position.y - ft + Q[1] * (se - D)
          }, L.push(Te);
      }
      if ((ee || ge) && (q.width = ee && (!c.resizeDirection || c.resizeDirection === "horizontal") ? te : R.width, q.height = ge && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : R.height, R.width = q.width, R.height = q.height), U && E.expandParent) {
        const Ye = Q[0] * (q.width ?? 0);
        q.x && q.x < Ye && (R.x = Ye, z.x = z.x - (q.x - Ye));
        const ft = Q[1] * (q.height ?? 0);
        q.y && q.y < ft && (R.y = ft, z.y = z.y - (q.y - ft));
      }
      const Se = YM({
        width: R.width,
        prevWidth: P,
        height: R.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...R, direction: Se };
      M?.($, xe) !== !1 && (I = !0, w?.($, xe), l(q, L));
    }).on("end", ($) => {
      I && (N?.($, { ...R }), s?.({ ...R }), I = !1);
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
var vv;
function ZM() {
  if (vv) return qd;
  vv = 1;
  var t = qo();
  function a(p, v) {
    return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = t.useState, s = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function h(p, v) {
    var b = v(), w = l({ inst: { value: b, getSnapshot: v } }), N = w[0].inst, M = w[1];
    return u(
      function() {
        N.value = b, N.getSnapshot = v, g(N) && M({ inst: N });
      },
      [p, b, v]
    ), s(
      function() {
        return g(N) && M({ inst: N }), p(function() {
          g(N) && M({ inst: N });
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
var bv;
function wx() {
  return bv || (bv = 1, Vd.exports = ZM()), Vd.exports;
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
var xv;
function FM() {
  if (xv) return kd;
  xv = 1;
  var t = qo(), a = wx();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = t.useRef, c = t.useEffect, h = t.useMemo, g = t.useDebugValue;
  return kd.useSyncExternalStoreWithSelector = function(m, y, p, v, b) {
    var w = u(null);
    if (w.current === null) {
      var N = { hasValue: !1, value: null };
      w.current = N;
    } else N = w.current;
    w = h(
      function() {
        function R(U) {
          if (!z) {
            if (z = !0, E = U, U = v(U), b !== void 0 && N.hasValue) {
              var B = N.value;
              if (b(B, U))
                return O = B;
            }
            return O = U;
          }
          if (B = O, l(E, U)) return B;
          var A = v(U);
          return b !== void 0 && b(B, A) ? (E = U, B) : (E = U, O = A);
        }
        var z = !1, E, O, H = p === void 0 ? null : p;
        return [
          function() {
            return R(y());
          },
          H === null ? void 0 : function() {
            return R(H());
          }
        ];
      },
      [y, p, v, b]
    );
    var M = s(m, w[0], w[1]);
    return c(
      function() {
        N.hasValue = !0, N.value = M;
      },
      [M]
    ), g(M), M;
  }, kd;
}
var wv;
function QM() {
  return wv || (wv = 1, Ud.exports = FM()), Ud.exports;
}
var PM = QM();
const KM = /* @__PURE__ */ jh(PM), JM = {}, Sv = (t) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, p) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const b = a;
      a = p ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((w) => w(a, b));
    }
  }, s = () => a, g = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (JM ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = t(l, s, g);
  return g;
}, WM = (t) => t ? Sv(t) : Sv, { useDebugValue: eD } = ye, { useSyncExternalStoreWithSelector: tD } = KM, nD = (t) => t;
function Sx(t, a = nD, r) {
  const l = tD(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    r
  );
  return eD(l), l;
}
const Ev = (t, a) => {
  const r = WM(t), l = (s, u = a) => Sx(r, s, u);
  return Object.assign(l, r), l;
}, aD = (t, a) => t ? Ev(t, a) : Ev;
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
var iD = Db();
const rD = /* @__PURE__ */ jh(iD), fc = _.createContext(null), lD = fc.Provider, Ex = ya.error001("react");
function lt(t, a) {
  const r = _.useContext(fc);
  if (r === null)
    throw new Error(Ex);
  return Sx(r, t, a);
}
function zt() {
  const t = _.useContext(fc);
  if (t === null)
    throw new Error(Ex);
  return _.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const _v = { display: "none" }, oD = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, _x = "react-flow__node-desc", Nx = "react-flow__edge-desc", sD = "react-flow__aria-live", uD = (t) => t.ariaLiveMessage, cD = (t) => t.ariaLabelConfig;
function fD({ rfId: t }) {
  const a = lt(uD);
  return S.jsx("div", { id: `${sD}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: oD, children: a });
}
function dD({ rfId: t, disableKeyboardA11y: a }) {
  const r = lt(cD);
  return S.jsxs(S.Fragment, { children: [S.jsx("div", { id: `${_x}-${t}`, style: _v, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), S.jsx("div", { id: `${Nx}-${t}`, style: _v, children: r["edge.a11yDescription.default"] }), !a && S.jsx(fD, { rfId: t })] });
}
const dc = _.forwardRef(({ position: t = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${t}`.split("-");
  return S.jsx("div", { className: Qt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
dc.displayName = "Panel";
function hD({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : S.jsx(dc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: S.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const mD = (t) => {
  const a = [], r = [];
  for (const [, l] of t.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of t.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, yu = (t) => t.id;
function pD(t, a) {
  return At(t.selectedNodes.map(yu), a.selectedNodes.map(yu)) && At(t.selectedEdges.map(yu), a.selectedEdges.map(yu));
}
function gD({ onSelectionChange: t }) {
  const a = zt(), { selectedNodes: r, selectedEdges: l } = lt(mD, pD);
  return _.useEffect(() => {
    const s = { nodes: r, edges: l };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, t]), null;
}
const yD = (t) => !!t.onSelectionChangeHandlers;
function vD({ onSelectionChange: t }) {
  const a = lt(yD);
  return t || a ? S.jsx(gD, { onSelectionChange: t }) : null;
}
const Cx = [0, 0], bD = { x: 0, y: 0, zoom: 1 }, xD = [
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
], Nv = [...xD, "rfId"], wD = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), Cv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Lo,
  nodeOrigin: Cx,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function SD(t) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: h, setDefaultNodesAndEdges: g } = lt(wD, At), m = zt();
  _.useEffect(() => (g(t.defaultNodes, t.defaultEdges), () => {
    y.current = Cv, h();
  }), []);
  const y = _.useRef(Cv);
  return _.useEffect(
    () => {
      for (const p of Nv) {
        const v = t[p], b = y.current[p];
        v !== b && (typeof t[p] > "u" || (p === "nodes" ? a(v) : p === "edges" ? r(v) : p === "minZoom" ? l(v) : p === "maxZoom" ? s(v) : p === "translateExtent" ? u(v) : p === "nodeExtent" ? c(v) : p === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: rM(v) }) : p === "fitView" ? m.setState({ fitViewQueued: v }) : p === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [p]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    Nv.map((p) => t[p])
  ), null;
}
function Rv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function ED(t) {
  const [a, r] = _.useState(t === "system" ? null : t);
  return _.useEffect(() => {
    if (t !== "system") {
      r(t);
      return;
    }
    const l = Rv(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : Rv()?.matches ? "dark" : "light";
}
const Tv = typeof document < "u" ? document : null;
function ko(t = null, a = { target: Tv, actInsideInputWithModifier: !0 }) {
  const [r, l] = _.useState(!1), s = _.useRef(!1), u = _.useRef(/* @__PURE__ */ new Set([])), [c, h] = _.useMemo(() => {
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
  return _.useEffect(() => {
    const g = a?.target ?? Tv, m = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (b) => {
        if (s.current = b.ctrlKey || b.metaKey || b.shiftKey || b.altKey, (!s.current || s.current && !m) && ix(b))
          return !1;
        const N = Dv(b.code, h);
        if (u.current.add(b[N]), Mv(c, u.current, !1)) {
          const M = b.composedPath?.()?.[0] || b.target, R = M?.nodeName === "BUTTON" || M?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && b.preventDefault(), l(!0);
        }
      }, p = (b) => {
        const w = Dv(b.code, h);
        Mv(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(b[w]), b.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), l(!1);
      };
      return g?.addEventListener("keydown", y), g?.addEventListener("keyup", p), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        g?.removeEventListener("keydown", y), g?.removeEventListener("keyup", p), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, l]), r;
}
function Mv(t, a, r) {
  return t.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Dv(t, a) {
  return a.includes(t) ? "code" : "key";
}
const _D = () => {
  const t = zt();
  return _.useMemo(() => ({
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
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: h } = t.getState(), g = im(a, l, s, u, c, r?.padding ?? 0.1);
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
function Rx(t, a) {
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
      ND(g, h);
    r.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function ND(t, a) {
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
function CD(t, a) {
  return Rx(t, a);
}
function RD(t, a) {
  return Rx(t, a);
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
function Av({ items: t = [], lookup: a }) {
  const r = [], l = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const c = a.get(u.id), h = c?.internals?.userNode ?? c;
    h !== void 0 && h !== u && r.push({ id: u.id, item: u, type: "replace" }), h === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function zv(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const TD = ex();
function MD(t, a, r = {}) {
  return fM(t, a, {
    ...r,
    onError: r.onError ?? TD
  });
}
const Ov = (t) => PT(t), DD = (t) => P1(t);
function Tx(t) {
  return _.forwardRef(t);
}
const AD = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function jv(t) {
  const [a, r] = _.useState(BigInt(0)), [l] = _.useState(() => zD(() => r((s) => s + BigInt(1))));
  return AD(() => {
    const s = l.get();
    s.length && (t(s), l.reset());
  }, [a]), l;
}
function zD(t) {
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
const Mx = _.createContext(null);
function OD({ children: t }) {
  const a = zt(), r = _.useCallback((h) => {
    const { nodes: g = [], setNodes: m, hasDefaultNodes: y, onNodesChange: p, nodeLookup: v, fitViewQueued: b, onNodesChangeMiddlewareMap: w } = a.getState();
    let N = g;
    for (const R of h)
      N = typeof R == "function" ? R(N) : R;
    let M = Av({
      items: N,
      lookup: v
    });
    for (const R of w.values())
      M = R(M);
    y && m(N), M.length > 0 ? p?.(M) : b && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: z, setNodes: E } = a.getState();
      R && E(z);
    });
  }, []), l = jv(r), s = _.useCallback((h) => {
    const { edges: g = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: p, edgeLookup: v } = a.getState();
    let b = g;
    for (const w of h)
      b = typeof w == "function" ? w(b) : w;
    y ? m(b) : p && p(Av({
      items: b,
      lookup: v
    }));
  }, []), u = jv(s), c = _.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return S.jsx(Mx.Provider, { value: c, children: t });
}
function jD() {
  const t = _.useContext(Mx);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const LD = (t) => !!t.panZoom;
function fm() {
  const t = _D(), a = zt(), r = jD(), l = lt(LD), s = _.useMemo(() => {
    const u = (p) => a.getState().nodeLookup.get(p), c = (p) => {
      r.nodeQueue.push(p);
    }, h = (p) => {
      r.edgeQueue.push(p);
    }, g = (p) => {
      const { nodeLookup: v, nodeOrigin: b } = a.getState(), w = Ov(p) ? p : v.get(p.id), N = w.parentId ? nx(w.position, w.measured, w.parentId, v, b) : w.position, M = {
        ...w,
        position: N,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return xl(M);
    }, m = (p, v, b = { replace: !1 }) => {
      c((w) => w.map((N) => {
        if (N.id === p) {
          const M = typeof v == "function" ? v(N) : v;
          return b.replace && Ov(M) ? M : { ...N, ...M };
        }
        return N;
      }));
    }, y = (p, v, b = { replace: !1 }) => {
      h((w) => w.map((N) => {
        if (N.id === p) {
          const M = typeof v == "function" ? v(N) : v;
          return b.replace && DD(M) ? M : { ...N, ...M };
        }
        return N;
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
        const { nodes: p = [], edges: v = [], transform: b } = a.getState(), [w, N, M] = b;
        return {
          nodes: p.map((R) => ({ ...R })),
          edges: v.map((R) => ({ ...R })),
          viewport: {
            x: w,
            y: N,
            zoom: M
          }
        };
      },
      deleteElements: async ({ nodes: p = [], edges: v = [] }) => {
        const { nodes: b, edges: w, onNodesDelete: N, onEdgesDelete: M, triggerNodeChanges: R, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: H, edges: U } = await tM({
          nodesToRemove: p,
          edgesToRemove: v,
          nodes: b,
          edges: w,
          onBeforeDelete: O
        }), B = U.length > 0, A = H.length > 0;
        if (B) {
          const I = U.map(zv);
          M?.(U), z(I);
        }
        if (A) {
          const I = H.map(zv);
          N?.(H), R(I);
        }
        return (A || B) && E?.({ nodes: H, edges: U }), { deletedNodes: H, deletedEdges: U };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (p, v = !0, b) => {
        const w = rv(p), N = w ? p : g(p), M = b !== void 0;
        return N ? (b || a.getState().nodes).filter((R) => {
          const z = a.getState().nodeLookup.get(R.id);
          if (z && !w && (R.id === p.id || !z.internals.positionAbsolute))
            return !1;
          const E = xl(M ? R : z), O = Bo(E, N);
          return v && O > 0 || O >= E.width * E.height || O >= N.width * N.height;
        }) : [];
      },
      isNodeIntersecting: (p, v, b = !0) => {
        const N = rv(p) ? p : g(p);
        if (!N)
          return !1;
        const M = Bo(N, v);
        return b && M > 0 || M >= v.width * v.height || M >= N.width * N.height;
      },
      updateNode: m,
      updateNodeData: (p, v, b = { replace: !1 }) => {
        m(p, (w) => {
          const N = typeof v == "function" ? v(w) : v;
          return b.replace ? { ...w, data: N } : { ...w, data: { ...w.data, ...N } };
        }, b);
      },
      updateEdge: y,
      updateEdgeData: (p, v, b = { replace: !1 }) => {
        y(p, (w) => {
          const N = typeof v == "function" ? v(w) : v;
          return b.replace ? { ...w, data: N } : { ...w, data: { ...w.data, ...N } };
        }, b);
      },
      getNodesBounds: (p) => {
        const { nodeLookup: v, nodeOrigin: b } = a.getState();
        return KT(p, { nodeLookup: v, nodeOrigin: b });
      },
      getHandleConnections: ({ type: p, id: v, nodeId: b }) => Array.from(a.getState().connectionLookup.get(`${b}-${p}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: p, handleId: v, nodeId: b }) => Array.from(a.getState().connectionLookup.get(`${b}${p ? v ? `-${p}-${v}` : `-${p}` : ""}`)?.values() ?? []),
      fitView: async (p) => {
        const v = a.getState().fitViewResolver ?? iM();
        return a.setState({ fitViewQueued: !0, fitViewOptions: p, fitViewResolver: v }), r.nodeQueue.push((b) => [...b]), v.promise;
      }
    };
  }, []);
  return _.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: l
  }), [l]);
}
const Lv = (t) => t.selected, HD = typeof window < "u" ? window : void 0;
function BD({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: l } = fm(), s = ko(t, { actInsideInputWithModifier: !1 }), u = ko(a, { target: HD });
  _.useEffect(() => {
    if (s) {
      const { edges: c, nodes: h } = r.getState();
      l({ nodes: h.filter(Lv), edges: c.filter(Lv) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), _.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function UD(t) {
  const a = zt();
  _.useEffect(() => {
    const r = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const l = rm(t.current);
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
}, kD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function VD({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = vr.Free, zoomOnDoubleClick: c = !0, panOnDrag: h = !0, defaultViewport: g, translateExtent: m, minZoom: y, maxZoom: p, zoomActivationKeyCode: v, preventScrolling: b = !0, children: w, noWheelClassName: N, noPanClassName: M, onViewportChange: R, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: O }) {
  const H = zt(), U = _.useRef(null), { userSelectionActive: B, lib: A, connectionInProgress: I } = lt(kD, At), le = ko(v), $ = _.useRef();
  UD(U);
  const K = _.useCallback((re) => {
    R?.({ x: re[0], y: re[1], zoom: re[2] }), z || H.setState({ transform: re });
  }, [R, z]);
  return _.useEffect(() => {
    if (U.current) {
      $.current = qM({
        domNode: U.current,
        minZoom: y,
        maxZoom: p,
        translateExtent: m,
        viewport: g,
        onDraggingChange: (C) => H.setState((L) => L.paneDragging === C ? L : { paneDragging: C }),
        onPanZoomStart: (C, L) => {
          const { onViewportChangeStart: Z, onMoveStart: V } = H.getState();
          V?.(C, L), Z?.(L);
        },
        onPanZoom: (C, L) => {
          const { onViewportChange: Z, onMove: V } = H.getState();
          V?.(C, L), Z?.(L);
        },
        onPanZoomEnd: (C, L) => {
          const { onViewportChangeEnd: Z, onMoveEnd: V } = H.getState();
          V?.(C, L), Z?.(L);
        }
      });
      const { x: re, y: j, zoom: X } = $.current.getViewport();
      return H.setState({
        panZoom: $.current,
        transform: [re, j, X],
        domNode: U.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), _.useEffect(() => {
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
      noPanClassName: M,
      userSelectionActive: B,
      noWheelClassName: N,
      lib: A,
      onTransformChange: K,
      connectionInProgress: I,
      selectionOnDrag: O,
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
    M,
    B,
    N,
    A,
    K,
    I,
    O,
    E
  ]), S.jsx("div", { className: "react-flow__renderer", ref: U, style: hc, children: w });
}
const qD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function YD() {
  const { userSelectionActive: t, userSelectionRect: a } = lt(qD, At);
  return t && a ? S.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Yd = (t, a) => (r) => {
  r.target === a.current && t?.(r);
}, $D = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  connectionInProgress: t.connection.inProgress,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function ID({ isSelecting: t, selectionKeyPressed: a, selectionMode: r = Ho.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: h, onSelectionEnd: g, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: p, onPaneMouseEnter: v, onPaneMouseMove: b, onPaneMouseLeave: w, children: N }) {
  const M = _.useRef(0), R = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: O, connectionInProgress: H, panBy: U, autoPanSpeed: B } = lt($D, At), A = E && (t || z), I = _.useRef(null), le = _.useRef(), $ = _.useRef(/* @__PURE__ */ new Set()), K = _.useRef(/* @__PURE__ */ new Set()), re = _.useRef(!1), j = _.useRef({ x: 0, y: 0 }), X = _.useRef(!1), C = (ee) => {
    if (re.current || H) {
      re.current = !1;
      return;
    }
    m?.(ee), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
  }, L = (ee) => {
    if (Array.isArray(l) && l?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, Z = p ? (ee) => p(ee) : void 0, V = (ee) => {
    re.current && (ee.stopPropagation(), re.current = !1);
  }, P = (ee) => {
    const { domNode: ge, transform: ze } = R.getState();
    if (le.current = ge?.getBoundingClientRect(), !le.current)
      return;
    const Re = ee.target === I.current;
    if (!Re && !!ee.target.closest(".nokey") || !t || !(c && Re || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), re.current = !1;
    const { x: Ce, y: Ye } = ga(ee.nativeEvent, le.current), ft = _l({ x: Ce, y: Ye }, ze);
    R.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Ce,
        y: Ye
      }
    }), Re || (ee.stopPropagation(), ee.preventDefault());
  };
  function D(ee, ge) {
    const { userSelectionRect: ze } = R.getState();
    if (!ze)
      return;
    const { transform: Re, nodeLookup: Se, edgeLookup: xe, connectionLookup: Ce, triggerNodeChanges: Ye, triggerEdgeChanges: ft, defaultEdgeOptions: Te } = R.getState(), Ge = { x: ze.startX, y: ze.startY }, { x: Be, y: $e } = wl(Ge, Re), St = {
      startX: Ge.x,
      startY: Ge.y,
      x: ee < Be ? ee : Be,
      y: ge < $e ? ge : $e,
      width: Math.abs(ee - Be),
      height: Math.abs(ge - $e)
    }, Je = $.current, Fe = K.current;
    $.current = new Set(nm(Se, St, Re, r === Ho.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Qe = Te?.selectable ?? !0;
    for (const gt of $.current) {
      const yt = Ce.get(gt);
      if (yt)
        for (const { edgeId: It } of yt.values()) {
          const Lt = xe.get(It);
          Lt && (Lt.selectable ?? Qe) && K.current.add(It);
        }
    }
    if (!lv(Je, $.current)) {
      const gt = fl(Se, $.current, !0);
      Ye(gt);
    }
    if (!lv(Fe, K.current)) {
      const gt = fl(xe, K.current);
      ft(gt);
    }
    R.setState({
      userSelectionRect: St,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function q() {
    if (!s || !le.current)
      return;
    const [ee, ge] = am(j.current, le.current, B);
    U({ x: ee, y: ge }).then((ze) => {
      if (!re.current || !ze) {
        M.current = requestAnimationFrame(q);
        return;
      }
      const { x: Re, y: Se } = j.current;
      D(Re, Se), M.current = requestAnimationFrame(q);
    });
  }
  const Q = () => {
    cancelAnimationFrame(M.current), M.current = 0, X.current = !1;
  };
  _.useEffect(() => () => Q(), []);
  const te = (ee) => {
    const { userSelectionRect: ge, transform: ze, resetSelectedElements: Re } = R.getState();
    if (!le.current || !ge)
      return;
    const { x: Se, y: xe } = ga(ee.nativeEvent, le.current);
    j.current = { x: Se, y: xe };
    const Ce = wl({ x: ge.startX, y: ge.startY }, ze);
    if (!re.current) {
      const Ye = a ? 0 : u;
      if (Math.hypot(Se - Ce.x, xe - Ce.y) <= Ye)
        return;
      Re(), h?.(ee);
    }
    re.current = !0, X.current || (q(), X.current = !0), D(Se, xe);
  }, se = (ee) => {
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !z && ee.target === I.current && R.getState().userSelectionRect && C?.(ee), R.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), re.current && (g?.(ee), R.setState({
      nodesSelectionActive: $.current.size > 0
    })), Q());
  }, he = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), Q();
  }, me = l === !0 || Array.isArray(l) && l.includes(0);
  return S.jsxs("div", { className: Qt(["react-flow__pane", { draggable: me, dragging: O, selection: t }]), onClick: A ? void 0 : Yd(C, I), onContextMenu: Yd(L, I), onWheel: Yd(Z, I), onPointerEnter: A ? void 0 : v, onPointerMove: A ? te : b, onPointerUp: A ? se : void 0, onPointerCancel: A ? he : void 0, onPointerDownCapture: A ? P : void 0, onClickCapture: A ? V : void 0, onPointerLeave: w, ref: I, style: hc, children: [N, S.jsx(YD, {})] });
}
function ph({ id: t, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: h, onError: g } = a.getState(), m = h.get(t);
  if (!m) {
    g?.("012", ya.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([t]);
}
function Dx({ nodeRef: t, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const h = zt(), [g, m] = _.useState(!1), y = _.useRef();
  return _.useEffect(() => {
    y.current = RM({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (p) => {
        ph({
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
  }, []), _.useEffect(() => {
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
const XD = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function Ax() {
  const t = zt();
  return _.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: h, updateNodePositions: g, nodeLookup: m, nodeOrigin: y } = t.getState(), p = /* @__PURE__ */ new Map(), v = XD(c), b = s ? u[0] : 5, w = s ? u[1] : 5, N = r.direction.x * b * r.factor, M = r.direction.y * w * r.factor;
    for (const [, R] of m) {
      if (!v(R))
        continue;
      let z = {
        x: R.internals.positionAbsolute.x + N,
        y: R.internals.positionAbsolute.y + M
      };
      s && (z = Po(z, u));
      const { position: E, positionAbsolute: O } = K1({
        nodeId: R.id,
        nextPosition: z,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: h
      });
      R.position = E, R.internals.positionAbsolute = O, p.set(R.id, R);
    }
    g(p);
  }, []);
}
const dm = _.createContext(null), GD = dm.Provider;
dm.Consumer;
const zx = () => _.useContext(dm), ZD = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), FD = (t, a, r) => (l) => {
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
function QD({ type: t = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: h, children: g, className: m, onMouseDown: y, onTouchStart: p, ...v }, b) {
  const w = c || null, N = t === "target", M = zt(), R = zx(), { connectOnClick: z, noPanClassName: E, rfId: O } = lt(ZD, At), { connectingFrom: H, connectingTo: U, clickConnecting: B, isPossibleEndHandle: A, connectionInProcess: I, clickConnectionInProcess: le, valid: $ } = lt(FD(R, w, t), At);
  R || M.getState().onError?.("010", ya.error010());
  const K = (X) => {
    const { defaultEdgeOptions: C, onConnect: L, hasDefaultEdges: Z } = M.getState(), V = {
      ...C,
      ...X
    };
    if (Z) {
      const { edges: P, setEdges: D, onError: q } = M.getState();
      D(MD(V, P, { onError: q }));
    }
    L?.(V), h?.(V);
  }, re = (X) => {
    if (!R)
      return;
    const C = rx(X.nativeEvent);
    if (s && (C && X.button === 0 || !C)) {
      const L = M.getState();
      mh.onPointerDown(X.nativeEvent, {
        handleDomNode: X.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: N,
        handleId: w,
        nodeId: R,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...Z) => M.getState().onConnectEnd?.(...Z),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...Z) => M.getState().isValidConnection?.(...Z) ?? !0),
        getTransform: () => M.getState().transform,
        getFromHandle: () => M.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    C ? y?.(X) : p?.(X);
  }, j = (X) => {
    const { onClickConnectStart: C, onClickConnectEnd: L, connectionClickStartHandle: Z, connectionMode: V, isValidConnection: P, lib: D, rfId: q, nodeLookup: Q, connection: te } = M.getState();
    if (!R || !Z && !s)
      return;
    if (!Z) {
      C?.(X.nativeEvent, { nodeId: R, handleId: w, handleType: t }), M.setState({ connectionClickStartHandle: { nodeId: R, type: t, id: w } });
      return;
    }
    const se = ax(X.target), he = r || P, { connection: me, isValid: ee } = mh.isValid(X.nativeEvent, {
      handle: {
        nodeId: R,
        id: w,
        type: t
      },
      connectionMode: V,
      fromNodeId: Z.nodeId,
      fromHandleId: Z.id || null,
      fromType: Z.type,
      isValidConnection: he,
      flowId: q,
      doc: se,
      lib: D,
      nodeLookup: Q
    });
    ee && me && K(me);
    const ge = structuredClone(te);
    delete ge.inProgress, ge.toPosition = ge.toHandle ? ge.toHandle.position : null, L?.(X, ge), M.setState({ connectionClickStartHandle: null });
  };
  return S.jsx("div", { "data-handleid": w, "data-nodeid": R, "data-handlepos": a, "data-id": `${O}-${R}-${w}-${t}`, className: Qt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    m,
    {
      source: !N,
      target: N,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: B,
      connectingfrom: H,
      connectingto: U,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!I || A) && (I || le ? u : s)
    }
  ]), onMouseDown: re, onTouchStart: re, onClick: z ? j : void 0, ref: b, ...v, children: g });
}
const El = _.memo(Tx(QD));
function PD({ data: t, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return S.jsxs(S.Fragment, { children: [t?.label, S.jsx(El, { type: "source", position: r, isConnectable: a })] });
}
function KD({ data: t, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: l = Ae.Bottom }) {
  return S.jsxs(S.Fragment, { children: [S.jsx(El, { type: "target", position: r, isConnectable: a }), t?.label, S.jsx(El, { type: "source", position: l, isConnectable: a })] });
}
function JD() {
  return null;
}
function WD({ data: t, isConnectable: a, targetPosition: r = Ae.Top }) {
  return S.jsxs(S.Fragment, { children: [S.jsx(El, { type: "target", position: r, isConnectable: a }), t?.label] });
}
const Zu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Hv = {
  input: PD,
  default: KD,
  output: WD,
  group: JD
};
function eA(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const tA = (t) => {
  const { width: a, height: r, x: l, y: s } = Qo(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: pa(a) ? a : null,
    height: pa(r) ? r : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${l}px,${s}px)`
  };
};
function nA({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = zt(), { width: s, height: u, transformString: c, userSelectionActive: h } = lt(tA, At), g = Ax(), m = _.useRef(null);
  _.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !h && s !== null && u !== null;
  if (Dx({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const p = t ? (b) => {
    const w = l.getState().nodes.filter((N) => N.selected);
    t(b, w);
  } : void 0, v = (b) => {
    Object.prototype.hasOwnProperty.call(Zu, b.key) && (b.preventDefault(), g({
      direction: Zu[b.key],
      factor: b.shiftKey ? 4 : 1
    }));
  };
  return S.jsx("div", { className: Qt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: S.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: p, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const Bv = typeof window < "u" ? window : void 0, aA = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function Ox({ children: t, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: h, deleteKeyCode: g, selectionKeyCode: m, selectionOnDrag: y, selectionMode: p, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: w, panActivationKeyCode: N, zoomActivationKeyCode: M, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: H, panOnScrollMode: U, zoomOnDoubleClick: B, panOnDrag: A, autoPanOnSelection: I, defaultViewport: le, translateExtent: $, minZoom: K, maxZoom: re, preventScrolling: j, onSelectionContextMenu: X, noWheelClassName: C, noPanClassName: L, disableKeyboardA11y: Z, onViewportChange: V, isControlledViewport: P }) {
  const { nodesSelectionActive: D, userSelectionActive: q } = lt(aA, At), Q = ko(m, { target: Bv }), te = ko(N, { target: Bv }), se = te || A, he = te || O, me = y && se !== !0, ee = Q || q || me;
  return BD({ deleteKeyCode: g, multiSelectionKeyCode: w }), S.jsx(VD, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: H, panOnScrollMode: U, zoomOnDoubleClick: B, panOnDrag: !Q && se, defaultViewport: le, translateExtent: $, minZoom: K, maxZoom: re, zoomActivationKeyCode: M, preventScrolling: j, noWheelClassName: C, noPanClassName: L, onViewportChange: V, isControlledViewport: P, paneClickDistance: h, selectionOnDrag: me, children: S.jsxs(ID, { onSelectionStart: v, onSelectionEnd: b, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: I, isSelecting: !!ee, selectionMode: p, selectionKeyPressed: Q, paneClickDistance: h, selectionOnDrag: me, children: [t, D && S.jsx(nA, { onSelectionContextMenu: X, noPanClassName: L, disableKeyboardA11y: Z })] }) });
}
Ox.displayName = "FlowRenderer";
const iA = _.memo(Ox), rA = (t) => (a) => t ? nm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function lA(t) {
  return lt(_.useCallback(rA(t), [t]), At);
}
const oA = (t) => t.updateNodeInternals;
function sA() {
  const t = lt(oA), [a] = _.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
  return _.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function uA({ node: t, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = zt(), u = _.useRef(null), c = _.useRef(null), h = _.useRef(t.sourcePosition), g = _.useRef(t.targetPosition), m = _.useRef(a), y = r && !!t.internals.handleBounds;
  return _.useEffect(() => {
    u.current && !t.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, t.hidden]), _.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), _.useEffect(() => {
    if (u.current) {
      const p = m.current !== a, v = h.current !== t.sourcePosition, b = g.current !== t.targetPosition;
      (p || v || b) && (m.current = a, h.current = t.sourcePosition, g.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, a, t.sourcePosition, t.targetPosition]), u;
}
function cA({ id: t, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: h, elementsSelectable: g, nodesConnectable: m, nodesFocusable: y, resizeObserver: p, noDragClassName: v, noPanClassName: b, disableKeyboardA11y: w, rfId: N, nodeTypes: M, nodeClickDistance: R, onError: z }) {
  const { node: E, internals: O, isParent: H } = lt((ee) => {
    const ge = ee.nodeLookup.get(t), ze = ee.parentLookup.has(t);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let U = E.type || "default", B = M?.[U] || Hv[U];
  B === void 0 && (z?.("003", ya.error003(U)), U = "default", B = M?.default || Hv.default);
  const A = !!(E.draggable || h && typeof E.draggable > "u"), I = !!(E.selectable || g && typeof E.selectable > "u"), le = !!(E.connectable || m && typeof E.connectable > "u"), $ = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), re = tx(E), j = uA({ node: E, nodeType: U, hasDimensions: re, resizeObserver: p }), X = Dx({
    nodeRef: j,
    disabled: E.hidden || !A,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: t,
    isSelectable: I,
    nodeClickDistance: R
  }), C = Ax();
  if (E.hidden)
    return null;
  const L = ci(E), Z = eA(E), V = I || A || a || r || l || s, P = r ? (ee) => r(ee, { ...O.userNode }) : void 0, D = l ? (ee) => l(ee, { ...O.userNode }) : void 0, q = s ? (ee) => s(ee, { ...O.userNode }) : void 0, Q = u ? (ee) => u(ee, { ...O.userNode }) : void 0, te = c ? (ee) => c(ee, { ...O.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    I && (!ge || !A || ze > 0) && ph({
      id: t,
      store: K,
      nodeRef: j
    }), a && a(ee, { ...O.userNode });
  }, he = (ee) => {
    if (!(ix(ee.nativeEvent) || w)) {
      if (G1.includes(ee.key) && I) {
        const ge = ee.key === "Escape";
        ph({
          id: t,
          store: K,
          unselect: ge,
          nodeRef: j
        });
      } else if (A && E.selected && Object.prototype.hasOwnProperty.call(Zu, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: ge } = K.getState();
        K.setState({
          ariaLiveMessage: ge["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), C({
          direction: Zu[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, me = () => {
    if (w || !j.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: ge, height: ze, autoPanOnNodeFocus: Re, setCenter: Se } = K.getState();
    if (!Re)
      return;
    nm(/* @__PURE__ */ new Map([[t, E]]), { x: 0, y: 0, width: ge, height: ze }, ee, !0).length > 0 || Se(E.position.x + L.width / 2, E.position.y + L.height / 2, {
      zoom: ee[2]
    });
  };
  return S.jsx("div", { className: Qt([
    "react-flow__node",
    `react-flow__node-${U}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [b]: A
    },
    E.className,
    {
      selected: E.selected,
      selectable: I,
      parent: H,
      draggable: A,
      dragging: X
    }
  ]), ref: j, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: V ? "all" : "none",
    visibility: re ? "visible" : "hidden",
    ...E.style,
    ...Z
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: P, onMouseMove: D, onMouseLeave: q, onContextMenu: Q, onClick: se, onDoubleClick: te, onKeyDown: $ ? he : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? me : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${_x}-${N}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: S.jsx(GD, { value: t, children: S.jsx(B, { id: t, data: E.data, type: U, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: I, draggable: A, deletable: E.deletable ?? !0, isConnectable: le, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: X, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...L }) }) });
}
var fA = _.memo(cA);
const dA = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function jx(t) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(dA, At), c = lA(t.onlyRenderVisibleElements), h = sA();
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
    S.jsx(fA, { id: g, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, g)
  )) });
}
jx.displayName = "NodeRenderer";
const hA = _.memo(jx);
function mA(t) {
  return lt(_.useCallback((r) => {
    if (!t)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && sM({
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
const pA = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return S.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, gA = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return S.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Uv = {
  [Xu.Arrow]: pA,
  [Xu.ArrowClosed]: gA
};
function yA(t) {
  const a = zt();
  return _.useMemo(() => Object.prototype.hasOwnProperty.call(Uv, t) ? Uv[t] : (a.getState().onError?.("009", ya.error009(t)), null), [t]);
}
const vA = ({ id: t, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: h = "auto-start-reverse" }) => {
  const g = yA(a);
  return g ? S.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: S.jsx(g, { color: r, strokeWidth: c }) }) : null;
}, Lx = ({ defaultColor: t, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = _.useMemo(() => gM(r, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, t]);
  return s.length ? S.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: S.jsx("defs", { children: s.map((u) => S.jsx(vA, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Lx.displayName = "MarkerDefinitions";
var bA = _.memo(Lx);
function Hx({ x: t, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: h = 2, children: g, className: m, ...y }) {
  const [p, v] = _.useState({ x: 1, y: 0, width: 0, height: 0 }), b = Qt(["react-flow__edge-textwrapper", m]), w = _.useRef(null);
  return _.useEffect(() => {
    if (w.current) {
      const N = w.current.getBBox();
      v({
        x: N.x,
        y: N.y,
        width: N.width,
        height: N.height
      });
    }
  }, [r]), r ? S.jsxs("g", { transform: `translate(${t - p.width / 2} ${a - p.height / 2})`, className: b, visibility: p.width ? "visible" : "hidden", ...y, children: [s && S.jsx("rect", { width: p.width + 2 * c[0], x: -c[0], y: -c[1], height: p.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), S.jsx("text", { className: "react-flow__edge-text", y: p.height / 2, dy: "0.3em", ref: w, style: l, children: r }), g] }) : null;
}
Hx.displayName = "EdgeText";
const xA = _.memo(Hx);
function mc({ path: t, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: g, interactionWidth: m = 20, ...y }) {
  return S.jsxs(S.Fragment, { children: [S.jsx("path", { ...y, d: t, fill: "none", className: Qt(["react-flow__edge-path", y.className]) }), m ? S.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && pa(a) && pa(r) ? S.jsx(xA, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: g }) : null] });
}
function kv({ pos: t, x1: a, y1: r, x2: l, y2: s }) {
  return t === Ae.Left || t === Ae.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function Bx({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, h] = kv({
    pos: r,
    x1: t,
    y1: a,
    x2: l,
    y2: s
  }), [g, m] = kv({
    pos: u,
    x1: l,
    y1: s,
    x2: t,
    y2: a
  }), [y, p, v, b] = lx({
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
function Ux(t) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: h, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: M, interactionWidth: R }) => {
    const [z, E, O] = Bx({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), H = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: H, path: z, labelX: E, labelY: O, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: M, interactionWidth: R });
  });
}
const wA = Ux({ isInternal: !1 }), kx = Ux({ isInternal: !0 });
wA.displayName = "SimpleBezierEdge";
kx.displayName = "SimpleBezierEdgeInternal";
function Vx(t) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, sourcePosition: b = Ae.Bottom, targetPosition: w = Ae.Top, markerEnd: N, markerStart: M, pathOptions: R, interactionWidth: z }) => {
    const [E, O, H] = fh({
      sourceX: r,
      sourceY: l,
      sourcePosition: b,
      targetX: s,
      targetY: u,
      targetPosition: w,
      borderRadius: R?.borderRadius,
      offset: R?.offset,
      stepPosition: R?.stepPosition
    }), U = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: U, path: E, labelX: O, labelY: H, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: N, markerStart: M, interactionWidth: z });
  });
}
const qx = Vx({ isInternal: !1 }), Yx = Vx({ isInternal: !0 });
qx.displayName = "SmoothStepEdge";
Yx.displayName = "SmoothStepEdgeInternal";
function $x(t) {
  return _.memo(({ id: a, ...r }) => {
    const l = t.isInternal ? void 0 : a;
    return S.jsx(qx, { ...r, id: l, pathOptions: _.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const SA = $x({ isInternal: !1 }), Ix = $x({ isInternal: !0 });
SA.displayName = "StepEdge";
Ix.displayName = "StepEdgeInternal";
function Xx(t) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: b, markerStart: w, interactionWidth: N }) => {
    const [M, R, z] = ux({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: E, path: M, labelX: R, labelY: z, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: b, markerStart: w, interactionWidth: N });
  });
}
const EA = Xx({ isInternal: !1 }), Gx = Xx({ isInternal: !0 });
EA.displayName = "StraightEdge";
Gx.displayName = "StraightEdgeInternal";
function Zx(t) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: h = Ae.Top, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: M, pathOptions: R, interactionWidth: z }) => {
    const [E, O, H] = ox({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: R?.curvature
    }), U = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: U, path: E, labelX: O, labelY: H, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: M, interactionWidth: z });
  });
}
const _A = Zx({ isInternal: !1 }), Fx = Zx({ isInternal: !0 });
_A.displayName = "BezierEdge";
Fx.displayName = "BezierEdgeInternal";
const Vv = {
  default: Fx,
  straight: Gx,
  step: Ix,
  smoothstep: Yx,
  simplebezier: kx
}, qv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, NA = (t, a, r) => r === Ae.Left ? t - a : r === Ae.Right ? t + a : t, CA = (t, a, r) => r === Ae.Top ? t - a : r === Ae.Bottom ? t + a : t, Yv = "react-flow__edgeupdater";
function $v({ position: t, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: h }) {
  return S.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Qt([Yv, `${Yv}-${h}`]), cx: NA(a, l, t), cy: CA(r, l, t), r: l, stroke: "transparent", fill: "transparent" });
}
function RA({ isReconnectable: t, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: h, targetPosition: g, onReconnect: m, onReconnectStart: y, onReconnectEnd: p, setReconnecting: v, setUpdateHover: b }) {
  const w = zt(), N = (O, H) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: U, domNode: B, connectionMode: A, connectionRadius: I, lib: le, onConnectStart: $, cancelConnection: K, nodeLookup: re, rfId: j, panBy: X, updateConnection: C } = w.getState(), L = H.type === "target", Z = (D, q) => {
      v(!1), p?.(D, r, H.type, q);
    }, V = (D) => m?.(r, D), P = (D, q) => {
      v(!0), y?.(O, r, H.type), $?.(D, q);
    };
    mh.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: U,
      connectionMode: A,
      connectionRadius: I,
      domNode: B,
      handleId: H.id,
      nodeId: H.nodeId,
      nodeLookup: re,
      isTarget: L,
      edgeUpdaterType: H.type,
      lib: le,
      flowId: j,
      cancelConnection: K,
      panBy: X,
      isValidConnection: (...D) => w.getState().isValidConnection?.(...D) ?? !0,
      onConnect: V,
      onConnectStart: P,
      onConnectEnd: (...D) => w.getState().onConnectEnd?.(...D),
      onReconnectEnd: Z,
      updateConnection: C,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, M = (O) => N(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), R = (O) => N(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), z = () => b(!0), E = () => b(!1);
  return S.jsxs(S.Fragment, { children: [(t === !0 || t === "source") && S.jsx($v, { position: h, centerX: l, centerY: s, radius: a, onMouseDown: M, onMouseEnter: z, onMouseOut: E, type: "source" }), (t === !0 || t === "target") && S.jsx($v, { position: g, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function TA({ id: t, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: h, onMouseMove: g, onMouseLeave: m, reconnectRadius: y, onReconnect: p, onReconnectStart: v, onReconnectEnd: b, rfId: w, edgeTypes: N, noPanClassName: M, onError: R, disableKeyboardA11y: z }) {
  let E = lt((Se) => Se.edgeLookup.get(t));
  const O = lt((Se) => Se.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let H = E.type || "default", U = N?.[H] || Vv[H];
  U === void 0 && (R?.("011", ya.error011(H)), H = "default", U = N?.default || Vv.default);
  const B = !!(E.focusable || a && typeof E.focusable > "u"), A = typeof p < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), I = !!(E.selectable || l && typeof E.selectable > "u"), le = _.useRef(null), [$, K] = _.useState(!1), [re, j] = _.useState(!1), X = zt(), { zIndex: C, sourceX: L, sourceY: Z, targetX: V, targetY: P, sourcePosition: D, targetPosition: q } = lt(_.useCallback((Se) => {
    const xe = Se.nodeLookup.get(E.source), Ce = Se.nodeLookup.get(E.target);
    if (!xe || !Ce)
      return {
        zIndex: E.zIndex,
        ...qv
      };
    const Ye = pM({
      id: t,
      sourceNode: xe,
      targetNode: Ce,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: R
    });
    return {
      zIndex: oM({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Ce,
        elevateOnSelect: Se.elevateEdgesOnSelect,
        zIndexMode: Se.zIndexMode
      }),
      ...Ye || qv
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), Q = _.useMemo(() => E.markerStart ? `url('#${dh(E.markerStart, w)}')` : void 0, [E.markerStart, w]), te = _.useMemo(() => E.markerEnd ? `url('#${dh(E.markerEnd, w)}')` : void 0, [E.markerEnd, w]);
  if (E.hidden || L === null || Z === null || V === null || P === null)
    return null;
  const se = (Se) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Ce, multiSelectionActive: Ye } = X.getState();
    I && (X.setState({ nodesSelectionActive: !1 }), E.selected && Ye ? (Ce({ nodes: [], edges: [E] }), le.current?.blur()) : xe([t])), s && s(Se, E);
  }, he = u ? (Se) => {
    u(Se, { ...E });
  } : void 0, me = c ? (Se) => {
    c(Se, { ...E });
  } : void 0, ee = h ? (Se) => {
    h(Se, { ...E });
  } : void 0, ge = g ? (Se) => {
    g(Se, { ...E });
  } : void 0, ze = m ? (Se) => {
    m(Se, { ...E });
  } : void 0, Re = (Se) => {
    if (!z && G1.includes(Se.key) && I) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Ce } = X.getState();
      Se.key === "Escape" ? (le.current?.blur(), xe({ edges: [E] })) : Ce([t]);
    }
  };
  return S.jsx("svg", { style: { zIndex: C }, children: S.jsxs("g", { className: Qt([
    "react-flow__edge",
    `react-flow__edge-${H}`,
    E.className,
    M,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !I && !s,
      updating: $,
      selectable: I
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: ee, onMouseMove: ge, onMouseLeave: ze, onKeyDown: B ? Re : void 0, tabIndex: B ? 0 : void 0, role: E.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": B ? `${Nx}-${w}` : void 0, ref: le, ...E.domAttributes, children: [!re && S.jsx(U, { id: t, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: I, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: Z, targetX: V, targetY: P, sourcePosition: D, targetPosition: q, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: Q, markerEnd: te, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), A && S.jsx(RA, { edge: E, isReconnectable: A, reconnectRadius: y, onReconnect: p, onReconnectStart: v, onReconnectEnd: b, sourceX: L, sourceY: Z, targetX: V, targetY: P, sourcePosition: D, targetPosition: q, setUpdateHover: K, setReconnecting: j })] }) });
}
var MA = _.memo(TA);
const DA = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Qx({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: h, onEdgeMouseMove: g, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: p, onEdgeDoubleClick: v, onReconnectStart: b, onReconnectEnd: w, disableKeyboardA11y: N }) {
  const { edgesFocusable: M, edgesReconnectable: R, elementsSelectable: z, onError: E } = lt(DA, At), O = mA(a);
  return S.jsxs("div", { className: "react-flow__edges", children: [S.jsx(bA, { defaultColor: t, rfId: r }), O.map((H) => S.jsx(MA, { id: H, edgesFocusable: M, edgesReconnectable: R, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: h, onMouseMove: g, onMouseLeave: m, onClick: y, reconnectRadius: p, onDoubleClick: v, onReconnectStart: b, onReconnectEnd: w, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: N }, H))] });
}
Qx.displayName = "EdgeRenderer";
const AA = _.memo(Qx), zA = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function OA({ children: t }) {
  const a = lt(zA);
  return S.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function jA(t) {
  const a = fm(), r = _.useRef(!1);
  _.useEffect(() => {
    !r.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), r.current = !0);
  }, [t, a.viewportInitialized]);
}
const LA = (t) => t.panZoom?.syncViewport;
function HA(t) {
  const a = lt(LA), r = zt();
  return _.useEffect(() => {
    t && (a?.(t), r.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function BA(t) {
  return t.connection.inProgress ? { ...t.connection, to: _l(t.connection.to, t.transform) } : { ...t.connection };
}
function UA(t) {
  return BA;
}
function kA(t) {
  const a = UA();
  return lt(a, At);
}
const VA = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function qA({ containerStyle: t, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: h, inProgress: g } = lt(VA, At);
  return !(u && s && g) ? null : S.jsx("svg", { style: t, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: S.jsx("g", { className: Qt(["react-flow__connection", Q1(h)]), children: S.jsx(Px, { style: a, type: r, CustomComponent: l, isValid: h }) }) });
}
const Px = ({ style: t, type: a = $i.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: h, fromPosition: g, to: m, toNode: y, toHandle: p, toPosition: v, pointer: b } = kA();
  if (!s)
    return;
  if (r)
    return S.jsx(r, { connectionLineType: a, connectionLineStyle: t, fromNode: c, fromHandle: h, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: g, toPosition: v, connectionStatus: Q1(l), toNode: y, toHandle: p, pointer: b });
  let w = "";
  const N = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: g,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (a) {
    case $i.Bezier:
      [w] = ox(N);
      break;
    case $i.SimpleBezier:
      [w] = Bx(N);
      break;
    case $i.Step:
      [w] = fh({
        ...N,
        borderRadius: 0
      });
      break;
    case $i.SmoothStep:
      [w] = fh(N);
      break;
    default:
      [w] = ux(N);
  }
  return S.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: t });
};
Px.displayName = "ConnectionLine";
const YA = {};
function Iv(t = YA) {
  _.useRef(t), zt(), _.useEffect(() => {
  }, [t]);
}
function $A() {
  zt(), _.useRef(!1), _.useEffect(() => {
  }, []);
}
function Kx({ nodeTypes: t, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: p, onSelectionStart: v, onSelectionEnd: b, connectionLineType: w, connectionLineStyle: N, connectionLineComponent: M, connectionLineContainerStyle: R, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: H, panActivationKeyCode: U, zoomActivationKeyCode: B, deleteKeyCode: A, onlyRenderVisibleElements: I, elementsSelectable: le, defaultViewport: $, translateExtent: K, minZoom: re, maxZoom: j, preventScrolling: X, defaultMarkerColor: C, zoomOnScroll: L, zoomOnPinch: Z, panOnScroll: V, panOnScrollSpeed: P, panOnScrollMode: D, zoomOnDoubleClick: q, panOnDrag: Q, autoPanOnSelection: te, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Re, nodeClickDistance: Se, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: Ye, onEdgeMouseLeave: ft, reconnectRadius: Te, onReconnect: Ge, onReconnectStart: Be, onReconnectEnd: $e, noDragClassName: St, noWheelClassName: Je, noPanClassName: Fe, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt, viewport: It, onViewportChange: Lt }) {
  return Iv(t), Iv(a), $A(), jA(r), HA(It), S.jsx(iA, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Re, deleteKeyCode: A, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: H, panActivationKeyCode: U, zoomActivationKeyCode: B, elementsSelectable: le, zoomOnScroll: L, zoomOnPinch: Z, zoomOnDoubleClick: q, panOnScroll: V, panOnScrollSpeed: P, panOnScrollMode: D, panOnDrag: Q, autoPanOnSelection: te, defaultViewport: $, translateExtent: K, minZoom: re, maxZoom: j, onSelectionContextMenu: p, preventScrolling: X, noDragClassName: St, noWheelClassName: Je, noPanClassName: Fe, disableKeyboardA11y: Qe, onViewportChange: Lt, isControlledViewport: !!It, children: S.jsxs(OA, { children: [S.jsx(AA, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Ge, onReconnectStart: Be, onReconnectEnd: $e, onlyRenderVisibleElements: I, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: Ye, onEdgeMouseLeave: ft, reconnectRadius: Te, defaultMarkerColor: C, noPanClassName: Fe, disableKeyboardA11y: Qe, rfId: yt }), S.jsx(qA, { style: N, type: w, component: M, containerStyle: R }), S.jsx("div", { className: "react-flow__edgelabel-renderer" }), S.jsx(hA, { nodeTypes: t, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Se, onlyRenderVisibleElements: I, noPanClassName: Fe, noDragClassName: St, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt }), S.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Kx.displayName = "GraphView";
const IA = _.memo(Kx), XA = ex(), Xv = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: g = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: p, zIndexMode: v = "basic" } = {}) => {
  const b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), R = l ?? a ?? [], z = r ?? t ?? [], E = y ?? [0, 0], O = p ?? Lo;
  dx(N, M, R);
  const { nodesInitialized: H } = hh(z, b, w, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: v
  });
  let U = [0, 0, 1];
  if (c && s && u) {
    const B = Qo(b, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: A, y: I, zoom: le } = im(B, s, u, g, m, h?.padding ?? 0.1);
    U = [A, I, le];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: U,
    nodes: z,
    nodesInitialized: H,
    nodeLookup: b,
    parentLookup: w,
    edges: R,
    edgeLookup: M,
    connectionLookup: N,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: g,
    maxZoom: m,
    translateExtent: Lo,
    nodeExtent: O,
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
    connection: { ...F1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: XA,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Z1,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, GA = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: g, maxZoom: m, nodeOrigin: y, nodeExtent: p, zIndexMode: v }) => aD((b, w) => {
  async function N() {
    const { nodeLookup: M, panZoom: R, fitViewOptions: z, fitViewResolver: E, width: O, height: H, minZoom: U, maxZoom: B } = w();
    R && (await eM({
      nodes: M,
      width: O,
      height: H,
      panZoom: R,
      minZoom: U,
      maxZoom: B
    }, z), E?.resolve(!0), b({ fitViewResolver: null }));
  }
  return {
    ...Xv({
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
    setNodes: (M) => {
      const { nodeLookup: R, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: H, zIndexMode: U, nodesSelectionActive: B } = w(), { nodesInitialized: A, hasSelectedNodes: I } = hh(M, R, z, {
        nodeOrigin: E,
        nodeExtent: p,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: U
      }), le = B && I;
      H && A ? (N(), b({
        nodes: M,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: le
      })) : b({ nodes: M, nodesInitialized: A, nodesSelectionActive: le });
    },
    setEdges: (M) => {
      const { connectionLookup: R, edgeLookup: z } = w();
      dx(R, z, M), b({ edges: M });
    },
    setDefaultNodesAndEdges: (M, R) => {
      if (M) {
        const { setNodes: z } = w();
        z(M), b({ hasDefaultNodes: !0 });
      }
      if (R) {
        const { setEdges: z } = w();
        z(R), b({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (M) => {
      const { triggerNodeChanges: R, nodeLookup: z, parentLookup: E, domNode: O, nodeOrigin: H, nodeExtent: U, debug: B, fitViewQueued: A, zIndexMode: I } = w(), { changes: le, updatedInternals: $ } = EM(M, z, E, O, H, U, I);
      $ && (bM(z, E, { nodeOrigin: H, nodeExtent: U, zIndexMode: I }), A ? (N(), b({ fitViewQueued: !1, fitViewOptions: void 0 })) : b({}), le?.length > 0 && (B && console.log("React Flow: trigger node changes", le), R?.(le)));
    },
    updateNodePositions: (M, R = !1) => {
      const z = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: H, connection: U, updateConnection: B, onNodesChangeMiddlewareMap: A } = w();
      for (const [I, le] of M) {
        const $ = O.get(I), K = !!($?.expandParent && $?.parentId && le?.position), re = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, le.position.x),
            y: Math.max(0, le.position.y)
          } : le.position,
          dragging: R
        };
        if ($ && U.inProgress && U.fromNode.id === $.id) {
          const j = Er($, U.fromHandle, Ae.Left, !0);
          B({ ...U, from: j });
        }
        K && $.parentId && z.push({
          id: I,
          parentId: $.parentId,
          rect: {
            ...le.internals.positionAbsolute,
            width: le.measured.width ?? 0,
            height: le.measured.height ?? 0
          }
        }), E.push(re);
      }
      if (z.length > 0) {
        const { parentLookup: I, nodeOrigin: le } = w(), $ = cm(z, O, I, le);
        E.push(...$);
      }
      for (const I of A.values())
        E = I(E);
      H(E);
    },
    triggerNodeChanges: (M) => {
      const { onNodesChange: R, setNodes: z, nodes: E, hasDefaultNodes: O, debug: H } = w();
      if (M?.length) {
        if (O) {
          const U = CD(M, E);
          z(U);
        }
        H && console.log("React Flow: trigger node changes", M), R?.(M);
      }
    },
    triggerEdgeChanges: (M) => {
      const { onEdgesChange: R, setEdges: z, edges: E, hasDefaultEdges: O, debug: H } = w();
      if (M?.length) {
        if (O) {
          const U = RD(M, E);
          z(U);
        }
        H && console.log("React Flow: trigger edge changes", M), R?.(M);
      }
    },
    addSelectedNodes: (M) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = w();
      if (R) {
        const U = M.map((B) => hr(B, !0));
        O(U);
        return;
      }
      O(fl(E, /* @__PURE__ */ new Set([...M]), !0)), H(fl(z));
    },
    addSelectedEdges: (M) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = w();
      if (R) {
        const U = M.map((B) => hr(B, !0));
        H(U);
        return;
      }
      H(fl(z, /* @__PURE__ */ new Set([...M]))), O(fl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: M, edges: R } = {}) => {
      const { edges: z, nodes: E, nodeLookup: O, triggerNodeChanges: H, triggerEdgeChanges: U } = w(), B = M || E, A = R || z, I = [];
      for (const $ of B) {
        if (!$.selected)
          continue;
        const K = O.get($.id);
        K && (K.selected = !1), I.push(hr($.id, !1));
      }
      const le = [];
      for (const $ of A)
        $.selected && le.push(hr($.id, !1));
      H(I), U(le);
    },
    setMinZoom: (M) => {
      const { panZoom: R, maxZoom: z } = w();
      R?.setScaleExtent([M, z]), b({ minZoom: M });
    },
    setMaxZoom: (M) => {
      const { panZoom: R, minZoom: z } = w();
      R?.setScaleExtent([z, M]), b({ maxZoom: M });
    },
    setTranslateExtent: (M) => {
      w().panZoom?.setTranslateExtent(M), b({ translateExtent: M });
    },
    resetSelectedElements: () => {
      const { edges: M, nodes: R, triggerNodeChanges: z, triggerEdgeChanges: E, elementsSelectable: O } = w();
      if (!O)
        return;
      const H = R.reduce((B, A) => A.selected ? [...B, hr(A.id, !1)] : B, []), U = M.reduce((B, A) => A.selected ? [...B, hr(A.id, !1)] : B, []);
      z(H), E(U);
    },
    setNodeExtent: (M) => {
      const { nodes: R, nodeLookup: z, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: H, nodeExtent: U, zIndexMode: B } = w();
      M[0][0] === U[0][0] && M[0][1] === U[0][1] && M[1][0] === U[1][0] && M[1][1] === U[1][1] || (hh(R, z, E, {
        nodeOrigin: O,
        nodeExtent: M,
        elevateNodesOnSelect: H,
        checkEquality: !1,
        zIndexMode: B
      }), b({ nodeExtent: M }));
    },
    panBy: (M) => {
      const { transform: R, width: z, height: E, panZoom: O, translateExtent: H } = w();
      return _M({ delta: M, panZoom: O, transform: R, translateExtent: H, width: z, height: E });
    },
    setCenter: async (M, R, z) => {
      const { width: E, height: O, maxZoom: H, panZoom: U } = w();
      if (!U)
        return !1;
      const B = typeof z?.zoom < "u" ? z.zoom : H;
      return await U.setViewport({
        x: E / 2 - M * B,
        y: O / 2 - R * B,
        zoom: B
      }, { duration: z?.duration, ease: z?.ease, interpolate: z?.interpolate }), !0;
    },
    cancelConnection: () => {
      b({
        connection: { ...F1 }
      });
    },
    updateConnection: (M) => {
      b({ connection: M });
    },
    reset: () => b({ ...Xv() })
  };
}, Object.is);
function Jx({ initialNodes: t, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: h, initialFitViewOptions: g, fitView: m, nodeOrigin: y, nodeExtent: p, zIndexMode: v, children: b }) {
  const [w] = _.useState(() => GA({
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
  return S.jsx(lD, { value: w, children: S.jsx(OD, { children: b }) });
}
function ZA({ children: t, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: h, fitViewOptions: g, minZoom: m, maxZoom: y, nodeOrigin: p, nodeExtent: v, zIndexMode: b }) {
  return _.useContext(fc) ? S.jsx(S.Fragment, { children: t }) : S.jsx(Jx, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: h, initialFitViewOptions: g, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: p, nodeExtent: v, zIndexMode: b, children: t });
}
const FA = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function QA({ nodes: t, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: h, onEdgeClick: g, onInit: m, onMove: y, onMoveStart: p, onMoveEnd: v, onConnect: b, onConnectStart: w, onConnectEnd: N, onClickConnectStart: M, onClickConnectEnd: R, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: U, onNodeDragStart: B, onNodeDrag: A, onNodeDragStop: I, onNodesDelete: le, onEdgesDelete: $, onDelete: K, onSelectionChange: re, onSelectionDragStart: j, onSelectionDrag: X, onSelectionDragStop: C, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: V, onBeforeDelete: P, connectionMode: D, connectionLineType: q = $i.Bezier, connectionLineStyle: Q, connectionLineComponent: te, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ee = !1, selectionMode: ge = Ho.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Re = Uo() ? "Meta" : "Control", zoomActivationKeyCode: Se = Uo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Ce, onlyRenderVisibleElements: Ye = !1, selectNodesOnDrag: ft, nodesDraggable: Te, autoPanOnNodeFocus: Ge, nodesConnectable: Be, nodesFocusable: $e, nodeOrigin: St = Cx, edgesFocusable: Je, edgesReconnectable: Fe, elementsSelectable: Qe = !0, defaultViewport: gt = bD, minZoom: yt = 0.5, maxZoom: It = 2, translateExtent: Lt = Lo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: $n = "#b1b1b7", zoomOnScroll: yn = !0, zoomOnPinch: tn = !0, panOnScroll: Pt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: kt = vr.Free, zoomOnDoubleClick: fi = !0, panOnDrag: Sa = !0, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Dn, onPaneMouseLeave: In, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: k, onEdgeMouseMove: F, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: we = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: De, connectOnClick: ke, attributionPosition: je, proOptions: Xe, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: Ea = !0, autoPanSpeed: An, connectionRadius: cn, isValidConnection: nn, onError: bn, style: di, id: xn, nodeDragThreshold: hi, connectionDragThreshold: oa, viewport: sa, onViewportChange: Ue, width: bt, height: pn, colorMode: zn = "light", debug: mi, onScroll: Ba, ariaLabelConfig: dt, zIndexMode: Xn = "basic", ...an }, Gi) {
  const Cr = xn || "1", Nl = ED(zn), pi = _.useCallback((Cl) => {
    Cl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ba?.(Cl);
  }, [Ba]);
  return S.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: pi, style: { ...di, ...FA }, ref: Gi, className: Qt(["react-flow", s, Nl]), id: xn, role: "application", children: S.jsxs(ZA, { nodes: t, edges: a, width: bt, height: pn, fitView: Me, fitViewOptions: De, minZoom: yt, maxZoom: It, nodeOrigin: St, nodeExtent: ot, zIndexMode: Xn, children: [S.jsx(SD, { nodes: t, edges: a, defaultNodes: r, defaultEdges: l, onConnect: b, onConnectStart: w, onConnectEnd: N, onClickConnectStart: M, onClickConnectEnd: R, nodesDraggable: Te, autoPanOnNodeFocus: Ge, nodesConnectable: Be, nodesFocusable: $e, edgesFocusable: Je, edgesReconnectable: Fe, elementsSelectable: Qe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: It, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Ce, connectionMode: D, translateExtent: Lt, connectOnClick: ke, defaultEdgeOptions: rt, fitView: Me, fitViewOptions: De, onNodesDelete: le, onEdgesDelete: $, onDelete: K, onNodeDragStart: B, onNodeDrag: A, onNodeDragStop: I, onSelectionDrag: X, onSelectionDragStart: j, onSelectionDragStop: C, onMove: y, onMoveStart: p, onMoveEnd: v, noPanClassName: be, nodeOrigin: St, rfId: Cr, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: An, onError: bn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: hi, connectionDragThreshold: oa, onBeforeDelete: P, debug: mi, ariaLabelConfig: dt, zIndexMode: Xn }), S.jsx(IA, { onInit: m, onNodeClick: h, onEdgeClick: g, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: U, nodeTypes: u, edgeTypes: c, connectionLineType: q, connectionLineStyle: Q, connectionLineComponent: te, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: ee, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Re, panActivationKeyCode: ze, zoomActivationKeyCode: Se, onlyRenderVisibleElements: Ye, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: It, preventScrolling: mt, zoomOnScroll: yn, zoomOnPinch: tn, zoomOnDoubleClick: fi, panOnScroll: Pt, panOnScrollSpeed: Ot, panOnScrollMode: kt, panOnDrag: Sa, autoPanOnSelection: Ea, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Dn, onPaneMouseLeave: In, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: V, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: k, onEdgeMouseMove: F, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: $n, noDragClassName: ve, noWheelClassName: we, noPanClassName: be, rfId: Cr, disableKeyboardA11y: We, nodeExtent: ot, viewport: sa, onViewportChange: Ue }), S.jsx(vD, { onSelectionChange: re }), Vt, S.jsx(hD, { proOptions: Xe, position: je }), S.jsx(dD, { rfId: Cr, disableKeyboardA11y: We })] }) });
}
var PA = Tx(QA);
function KA({ dimensions: t, lineWidth: a, variant: r, className: l }) {
  return S.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Qt(["react-flow__background-pattern", r, l]) });
}
function JA({ radius: t, className: a }) {
  return S.jsx("circle", { cx: t, cy: t, r: t, className: Qt(["react-flow__background-pattern", "dots", a]) });
}
var ja;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(ja || (ja = {}));
const WA = {
  [ja.Dots]: 1,
  [ja.Lines]: 1,
  [ja.Cross]: 6
}, e3 = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function Wx({
  id: t,
  variant: a = ja.Dots,
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
  const p = _.useRef(null), { transform: v, patternId: b } = lt(e3, At), w = l || WA[a], N = a === ja.Dots, M = a === ja.Cross, R = Array.isArray(r) ? r : [r, r], z = [R[0] * v[2] || 1, R[1] * v[2] || 1], E = w * v[2], O = Array.isArray(u) ? u : [u, u], H = M ? [E, E] : z, U = [
    O[0] * v[2] || 1 + H[0] / 2,
    O[1] * v[2] || 1 + H[1] / 2
  ], B = `${b}${t || ""}`;
  return S.jsxs("svg", { className: Qt(["react-flow__background", m]), style: {
    ...g,
    ...hc,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": c
  }, ref: p, "data-testid": "rf__background", children: [S.jsx("pattern", { id: B, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${U[0]},-${U[1]})`, children: N ? S.jsx(JA, { radius: E / 2, className: y }) : S.jsx(KA, { dimensions: H, lineWidth: s, variant: a, className: y }) }), S.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
Wx.displayName = "Background";
const Gv = _.memo(Wx);
function t3() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: S.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function n3() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: S.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function a3() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: S.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function i3() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: S.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function r3() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: S.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function vu({ children: t, className: a, ...r }) {
  return S.jsx("button", { type: "button", className: Qt(["react-flow__controls-button", a]), ...r, children: t });
}
const l3 = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function ew({ style: t, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: h, onInteractiveChange: g, className: m, children: y, position: p = "bottom-left", orientation: v = "vertical", "aria-label": b }) {
  const w = zt(), { isInteractive: N, minZoomReached: M, maxZoomReached: R, ariaLabelConfig: z } = lt(l3, At), { zoomIn: E, zoomOut: O, fitView: H } = fm(), U = () => {
    E(), u?.();
  }, B = () => {
    O(), c?.();
  }, A = () => {
    H(s), h?.();
  }, I = () => {
    w.setState({
      nodesDraggable: !N,
      nodesConnectable: !N,
      elementsSelectable: !N
    }), g?.(!N);
  }, le = v === "horizontal" ? "horizontal" : "vertical";
  return S.jsxs(dc, { className: Qt(["react-flow__controls", le, m]), position: p, style: t, "data-testid": "rf__controls", "aria-label": b ?? z["controls.ariaLabel"], children: [a && S.jsxs(S.Fragment, { children: [S.jsx(vu, { onClick: U, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: R, children: S.jsx(t3, {}) }), S.jsx(vu, { onClick: B, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: M, children: S.jsx(n3, {}) })] }), r && S.jsx(vu, { className: "react-flow__controls-fitview", onClick: A, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: S.jsx(a3, {}) }), l && S.jsx(vu, { className: "react-flow__controls-interactive", onClick: I, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: N ? S.jsx(r3, {}) : S.jsx(i3, {}) }), y] });
}
ew.displayName = "Controls";
const o3 = _.memo(ew);
function s3({ id: t, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: h, strokeWidth: g, className: m, borderRadius: y, shapeRendering: p, selected: v, onClick: b }) {
  const { background: w, backgroundColor: N } = u || {}, M = c || w || N;
  return S.jsx("rect", { className: Qt(["react-flow__minimap-node", { selected: v }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: M,
    stroke: h,
    strokeWidth: g
  }, shapeRendering: p, onClick: b ? (R) => b(R, t) : void 0 });
}
const u3 = _.memo(s3), c3 = (t) => t.nodes.map((a) => a.id), $d = (t) => t instanceof Function ? t : () => t;
function f3({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = u3,
  onClick: c
}) {
  const h = lt(c3, At), g = $d(a), m = $d(t), y = $d(r), p = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return S.jsx(S.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    S.jsx(h3, { id: v, nodeColorFunc: g, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: p }, v)
  )) });
}
function d3({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: h, onClick: g }) {
  const { node: m, x: y, y: p, width: v, height: b } = lt((w) => {
    const N = w.nodeLookup.get(t);
    if (!N)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const M = N.internals.userNode, { x: R, y: z } = N.internals.positionAbsolute, { width: E, height: O } = ci(M);
    return {
      node: M,
      x: R,
      y: z,
      width: E,
      height: O
    };
  }, At);
  return !m || m.hidden || !tx(m) ? null : S.jsx(h, { x: y, y: p, width: v, height: b, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: g, id: m.id });
}
const h3 = _.memo(d3);
var m3 = _.memo(f3);
const p3 = 200, g3 = 150, y3 = (t) => !t.hidden, v3 = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? W1(Qo(t.nodeLookup, { filter: y3 }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, b3 = "react-flow__minimap-desc";
function tw({
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
  pannable: N = !1,
  zoomable: M = !1,
  ariaLabel: R,
  inversePan: z,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const H = zt(), U = _.useRef(null), { boundingRect: B, viewBB: A, rfId: I, panZoom: le, translateExtent: $, flowWidth: K, flowHeight: re, ariaLabelConfig: j } = lt(v3, At), X = t?.width ?? p3, C = t?.height ?? g3, L = B.width / X, Z = B.height / C, V = Math.max(L, Z), P = V * X, D = V * C, q = O * V, Q = B.x - (P - B.width) / 2 - q, te = B.y - (D - B.height) / 2 - q, se = P + q * 2, he = D + q * 2, me = `${b3}-${I}`, ee = _.useRef(0), ge = _.useRef();
  ee.current = V, _.useEffect(() => {
    if (U.current && le)
      return ge.current = OM({
        domNode: U.current,
        panZoom: le,
        getTransform: () => H.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        ge.current?.destroy();
      };
  }, [le]), _.useEffect(() => {
    ge.current?.update({
      translateExtent: $,
      width: K,
      height: re,
      inversePan: z,
      pannable: N,
      zoomStep: E,
      zoomable: M
    });
  }, [N, M, z, E, $, K, re]);
  const ze = b ? (xe) => {
    const [Ce, Ye] = ge.current?.pointer(xe) || [0, 0];
    b(xe, { x: Ce, y: Ye });
  } : void 0, Re = w ? _.useCallback((xe, Ce) => {
    const Ye = H.getState().nodeLookup.get(Ce).internals.userNode;
    w(xe, Ye);
  }, []) : void 0, Se = R ?? j["minimap.ariaLabel"];
  return S.jsx(dc, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof p == "number" ? p * V : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Qt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: S.jsxs("svg", { width: X, height: C, viewBox: `${Q} ${te} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: U, onClick: ze, children: [Se && S.jsx("title", { id: me, children: Se }), S.jsx(m3, { onClick: Re, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: h }), S.jsx("path", { className: "react-flow__minimap-mask", d: `M${Q - q},${te - q}h${se + q * 2}v${he + q * 2}h${-se - q * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
tw.displayName = "MiniMap";
const x3 = _.memo(tw), w3 = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, S3 = {
  [Sl.Line]: "right",
  [Sl.Handle]: "bottom-right"
};
function E3({ nodeId: t, position: a, variant: r = Sl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: h = 10, minHeight: g = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: p = !1, resizeDirection: v, autoScale: b = !0, shouldResize: w, onResizeStart: N, onResize: M, onResizeEnd: R }) {
  const z = zx(), E = typeof t == "string" ? t : z, O = zt(), H = _.useRef(null), U = r === Sl.Handle, B = lt(_.useCallback(w3(U && b), [U, b]), At), A = _.useRef(null), I = a ?? S3[r];
  _.useEffect(() => {
    if (!(!H.current || !E))
      return A.current || (A.current = GM({
        domNode: H.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: re, snapToGrid: j, nodeOrigin: X, domNode: C } = O.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: re,
            snapToGrid: j,
            nodeOrigin: X,
            paneDomNode: C
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: re, nodeLookup: j, parentLookup: X, nodeOrigin: C } = O.getState(), L = [], Z = { x: $.x, y: $.y }, V = j.get(E);
          if (V && V.expandParent && V.parentId) {
            const P = V.origin ?? C, D = $.width ?? V.measured.width ?? 0, q = $.height ?? V.measured.height ?? 0, Q = {
              id: V.id,
              parentId: V.parentId,
              rect: {
                width: D,
                height: q,
                ...nx({
                  x: $.x ?? V.position.x,
                  y: $.y ?? V.position.y
                }, { width: D, height: q }, V.parentId, j, P)
              }
            }, te = cm([Q], j, X, C);
            L.push(...te), Z.x = $.x ? Math.max(P[0] * D, $.x) : void 0, Z.y = $.y ? Math.max(P[1] * q, $.y) : void 0;
          }
          if (Z.x !== void 0 && Z.y !== void 0) {
            const P = {
              id: E,
              type: "position",
              position: { ...Z }
            };
            L.push(P);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const D = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            L.push(D);
          }
          for (const P of K) {
            const D = {
              ...P,
              type: "position"
            };
            L.push(D);
          }
          re(L);
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
          O.getState().triggerNodeChanges([re]);
        }
      })), A.current.update({
        controlPosition: I,
        boundaries: {
          minWidth: h,
          minHeight: g,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: p,
        resizeDirection: v,
        onResizeStart: N,
        onResize: M,
        onResizeEnd: R,
        shouldResize: w
      }), () => {
        A.current?.destroy();
      };
  }, [
    I,
    h,
    g,
    m,
    y,
    p,
    N,
    M,
    R,
    w
  ]);
  const le = I.split("-");
  return S.jsx("div", { className: Qt(["react-flow__resize-control", "nodrag", ...le, r, l]), ref: H, style: {
    ...s,
    scale: B,
    ...c && { [U ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
_.memo(E3);
var _3 = "_1bllf8b0", N3 = "_1bllf8b1";
const Zv = 16, C3 = "rgba(186, 158, 255, 0.14)", R3 = "rgba(186, 158, 255, 0.06)", T3 = "rgba(0, 0, 0, 0.6)", M3 = "#1d2023", D3 = "#ba9eff";
function A3({
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
  const y = [_3, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsx("div", { className: y, "aria-label": h ?? "node graph", children: /* @__PURE__ */ S.jsxs(
    PA,
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
          Gv,
          {
            id: "minor",
            variant: ja.Dots,
            gap: Zv,
            size: 1.1,
            color: C3
          }
        ),
        /* @__PURE__ */ S.jsx(
          Gv,
          {
            id: "major",
            variant: ja.Lines,
            gap: Zv * 5,
            lineWidth: 1,
            color: R3
          }
        ),
        s && /* @__PURE__ */ S.jsx(o3, { showInteractive: !1 }),
        l && /* @__PURE__ */ S.jsx(
          x3,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: T3,
            nodeColor: () => M3,
            nodeStrokeColor: () => D3,
            className: N3
          }
        ),
        g
      ]
    }
  ) });
}
function z3(t) {
  return /* @__PURE__ */ S.jsx(Jx, { children: /* @__PURE__ */ S.jsx(A3, { ...t }) });
}
var O3 = "a9gtw0", j3 = "a9gtw1", L3 = "a9gtw2", H3 = "a9gtw3", B3 = "a9gtw4", U3 = "a9gtw5";
const k3 = {
  default: "",
  raised: j3,
  inset: L3
};
function ai({
  title: t,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [O3, k3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs("section", { className: c, children: [
    (t || r) && /* @__PURE__ */ S.jsxs("header", { className: H3, children: [
      t && /* @__PURE__ */ S.jsx("span", { className: B3, children: t }),
      a && /* @__PURE__ */ S.jsx("span", { className: U3, children: a }),
      r
    ] }),
    l
  ] });
}
const hm = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function mm() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function Fu() {
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
    stageStates: mm()
  };
}
function V3(t, a, r = Date.now()) {
  return {
    ...Fu(),
    phase: "running",
    jobId: t,
    lastFrameAt: r,
    stageStates: {
      ...mm(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function q3(t, a, r = Date.now()) {
  const l = { ...t, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return { ...l, overallFraction: X3(a.params.fraction) };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: G3(l, "qwen_edit"), diffusion: "active" }
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
        stageStates: nw(l.stageStates)
      };
    default:
      return l;
  }
}
function Y3(t) {
  return { ...t, phase: "cancelled", stageStates: mm() };
}
const $3 = -32108;
function I3(t) {
  return {
    ...t,
    phase: "error",
    stalled: !1,
    errorCode: $3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: nw(t.stageStates)
  };
}
function Fv(t) {
  return t.phase !== "running" || t.stalled ? t : { ...t, stalled: !0 };
}
function Qv(t) {
  const a = Fu();
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
function X3(t) {
  return Number.isNaN(t) ? 0 : Math.min(1, Math.max(0, t));
}
function G3(t, a) {
  return t.stageStates[a] === "active" ? "done" : t.stageStates[a];
}
function nw(t) {
  const a = { ...t };
  for (const r of hm)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const aw = [
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
], pm = [
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
function Z3(t) {
  return pm.filter((a) => a.tier === t);
}
function F3() {
  const t = {};
  for (const a of pm)
    a.default !== void 0 && (t[a.key] = a.default);
  return t;
}
function Pv(t) {
  return {
    ...F3(),
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: t.blocksToSwap,
    interpolate_method: t.interpolateMethod,
    interpolate_fps: t.interpolateFps,
    models_dir: t.modelsDir || void 0,
    output_path: t.outputDir ? `${t.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: t.ditHighPath || void 0,
    dit_low_path: t.ditLowPath || void 0
  };
}
function Kv(t, a) {
  return {
    ...t,
    ...a.params,
    ref_image_path: t.ref_image_path,
    last_image_path: t.last_image_path ?? null,
    prompts: t.prompts
  };
}
const Vo = "svi-canonical", Q3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), P3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), K3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function J3(t) {
  const a = t.frames_per_clip, r = t.num_clips, l = t.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function W3(t) {
  const a = t.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = J3(a), c = a.fps;
  let h = "—";
  u !== null && c && c > 0 && (h = `${(u / c).toFixed(1)}s`);
  const g = Q3.has(t.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: h,
    vram: y,
    isLowVram: g,
    isOffDistribution: P3.has(t.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : K3.has(t.id)
  };
}
function ez(t) {
  return [...t].sort((a, r) => a.id === Vo ? -1 : r.id === Vo ? 1 : 0);
}
function tz(t) {
  const a = t.filter((r) => !r.hidden);
  return {
    featured: ez(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function nz(t = 25) {
  return Nr(`/render/jobs?limit=${t}`);
}
async function az(t) {
  return Nr(`/render/jobs/${t}`);
}
async function iz(t) {
  return Nr("/render/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function rz(t) {
  return Nr(`/render/jobs/${t}/cancel`, { method: "POST", body: "{}" });
}
function lz(t, a, r) {
  return fN(`/render/jobs/${t}/events`, a, r);
}
const oz = 9e4, sz = 24e4, uz = 5e3, iw = _.createContext(null);
function cz({
  initialSettings: t = h1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = _.useState(t), [u, c] = _.useState(
    a?.id ?? Vo
  ), [h, g] = _.useState(a !== null), [m, y] = _.useState(() => {
    const V = Pv(t);
    return a ? Kv(V, a) : V;
  }), [p, v] = _.useState(null), [b, w] = _.useState(null), [N, M] = _.useState({
    enabled: !1,
    prompt: ""
  }), [R, z] = _.useState(Fu), E = _.useRef(null), O = _.useRef(null), H = _.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), U = _.useCallback(() => {
    H(), O.current = setInterval(() => {
      z((V) => {
        if (V.phase !== "running" || V.lastFrameAt === null) return V;
        const P = Date.now() - V.lastFrameAt;
        return P >= sz ? (E.current?.(), E.current = null, H(), I3(V)) : P >= oz ? Fv(V) : V;
      });
    }, uz);
  }, [H]), B = _.useCallback(
    (V) => {
      const P = V.params.requires_last_image === !0;
      c(V.id), g(!0), y((D) => {
        const q = {
          ...Pv(l),
          ref_image_path: D.ref_image_path,
          prompts: D.prompts,
          last_image_path: P ? D.last_image_path ?? null : null
        };
        return Kv(q, V);
      }), P || w(null);
    },
    [l]
  ), A = _.useCallback(
    (V, P) => {
      y((D) => ({ ...D, [V]: P }));
    },
    []
  ), I = _.useCallback((V) => {
    y((P) => ({ ...P, prompts: V }));
  }, []), le = _.useCallback((V, P) => {
    v(V), y((D) => ({ ...D, ref_image_path: P }));
  }, []), $ = _.useCallback((V, P) => {
    w(V), y((D) => ({ ...D, last_image_path: P }));
  }, []), K = _.useCallback((V) => {
    M((P) => ({ ...P, ...V }));
  }, []), re = _.useCallback((V) => {
    s(V);
  }, []), j = _.useCallback(() => {
    E.current?.(), E.current = null, H(), z(Fu());
  }, [H]), X = _.useCallback(async () => {
    E.current?.();
    const { jobId: V } = await iz({ presetId: u, params: m });
    z(V3(V, N.enabled)), E.current = lz(
      V,
      (P) => {
        z((D) => q3(D, P));
      },
      () => {
        z((P) => Fv(P));
      }
    ), U();
  }, [m, u, N.enabled, U]), C = _.useCallback(async () => {
    const V = R.jobId;
    if (!V) return;
    const { status: P } = await rz(V);
    P !== "cancelling" && (E.current?.(), E.current = null, H(), z((D) => Y3(D)));
  }, [R.jobId, H]), L = _.useCallback(
    async (V) => {
      E.current?.(), E.current = null, H();
      try {
        const P = await az(V.id);
        z(Qv(P));
      } catch {
        z(Qv(V));
      }
    },
    [H]
  );
  _.useEffect(() => () => {
    E.current?.(), E.current = null, H();
  }, [H]);
  const Z = _.useMemo(
    () => ({
      settings: l,
      presetId: u,
      presetApplied: h,
      params: m,
      refImageName: p,
      lastImageName: b,
      qwenEdit: N,
      render: R,
      applyPresetById: B,
      updateParam: A,
      setPrompts: I,
      setRefImage: le,
      setLastImage: $,
      setQwenEdit: K,
      setSettings: re,
      startRenderJob: X,
      cancelRenderJob: C,
      resetRender: j,
      showJobResult: L
    }),
    [
      l,
      u,
      h,
      m,
      p,
      b,
      N,
      R,
      B,
      A,
      I,
      le,
      $,
      K,
      re,
      X,
      C,
      j,
      L
    ]
  );
  return /* @__PURE__ */ S.jsx(iw.Provider, { value: Z, children: r });
}
function wa() {
  const t = _.useContext(iw);
  if (!t)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return t;
}
function fz(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
}
const dz = (t) => {
  switch (t) {
    case "success":
      return pz;
    case "info":
      return yz;
    case "warning":
      return gz;
    case "error":
      return vz;
    default:
      return null;
  }
}, hz = Array(12).fill(0), mz = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, hz.map((r, l) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), pz = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), gz = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), yz = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), vz = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), bz = /* @__PURE__ */ ye.createElement("svg", {
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
})), xz = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), t;
};
let gh = 1;
class wz {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : gh++, c = this.toasts.find((g) => g.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
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
        else if (Ez(m) && !m.ok) {
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
      const l = r?.id || gh++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Rn = new wz(), Sz = (t, a) => {
  const r = a?.id || gh++;
  return Rn.addToast({
    title: t,
    ...a,
    id: r
  }), r;
}, Ez = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", _z = Sz, Nz = () => Rn.toasts, Cz = () => Rn.getActiveToasts(), gr = Object.assign(_z, {
  success: Rn.success,
  info: Rn.info,
  warning: Rn.warning,
  error: Rn.error,
  custom: Rn.custom,
  message: Rn.message,
  promise: Rn.promise,
  dismiss: Rn.dismiss,
  loading: Rn.loading
}, {
  getHistory: Nz,
  getToasts: Cz
});
fz("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function bu(t) {
  return t.label !== void 0;
}
const Rz = 3, Tz = "24px", Mz = "16px", Jv = 4e3, Dz = 356, Az = 14, zz = 45, Oz = 200;
function Ma(...t) {
  return t.filter(Boolean).join(" ");
}
function jz(t) {
  const [a, r] = t.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const Lz = (t) => {
  var a, r, l, s, u, c, h, g, m;
  const { invert: y, toast: p, unstyled: v, interacting: b, setHeights: w, visibleToasts: N, heights: M, index: R, toasts: z, expanded: E, removeToast: O, defaultRichColors: H, closeButton: U, style: B, cancelButtonStyle: A, actionButtonStyle: I, className: le = "", descriptionClassName: $ = "", duration: K, position: re, gap: j, expandByDefault: X, classNames: C, icons: L, closeButtonAriaLabel: Z = "Close toast" } = t, [V, P] = ye.useState(null), [D, q] = ye.useState(null), [Q, te] = ye.useState(!1), [se, he] = ye.useState(!1), [me, ee] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Re, Se] = ye.useState(!1), [xe, Ce] = ye.useState(0), [Ye, ft] = ye.useState(0), Te = ye.useRef(p.duration || K || Jv), Ge = ye.useRef(null), Be = ye.useRef(null), $e = R === 0, St = R + 1 <= N, Je = p.type, Fe = p.dismissible !== !1, Qe = p.className || "", gt = p.descriptionClassName || "", yt = ye.useMemo(() => M.findIndex((He) => He.toastId === p.id) || 0, [
    M,
    p.id
  ]), It = ye.useMemo(() => {
    var He;
    return (He = p.closeButton) != null ? He : U;
  }, [
    p.closeButton,
    U
  ]), Lt = ye.useMemo(() => p.duration || K || Jv, [
    p.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), $n = ye.useRef(0), yn = ye.useRef(null), [tn, Pt] = re.split("-"), Ot = ye.useMemo(() => M.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    M,
    yt
  ]), kt = xz(), fi = p.invert || y, Sa = Je === "loading";
  ot.current = ye.useMemo(() => yt * j + Ot, [
    yt,
    Ot
  ]), ye.useEffect(() => {
    Te.current = Lt;
  }, [
    Lt
  ]), ye.useEffect(() => {
    te(!0);
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
    if (!Q) return;
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
    Q,
    p.title,
    p.description,
    w,
    p.id,
    p.jsx,
    p.action,
    p.cancel
  ]);
  const vn = ye.useCallback(() => {
    he(!0), Ce(ot.current), w((He) => He.filter((vt) => vt.toastId !== p.id)), setTimeout(() => {
      O(p);
    }, Oz);
  }, [
    p,
    O,
    w,
    ot
  ]);
  ye.useEffect(() => {
    if (p.promise && Je === "loading" || p.duration === 1 / 0 || p.type === "loading") return;
    let He;
    return E || b || kt ? (() => {
      if ($n.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Te.current = Te.current - Vt;
      }
      $n.current = (/* @__PURE__ */ new Date()).getTime();
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
    if (L?.loading) {
      var vt;
      return /* @__PURE__ */ ye.createElement("div", {
        className: Ma(C?.loader, p == null || (vt = p.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ye.createElement(mz, {
      className: Ma(C?.loader, p == null || (He = p.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const Dn = p.icon || L?.[Je] || dz(Je);
  var In, un;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: Be,
    className: Ma(le, Qe, C?.toast, p == null || (a = p.classNames) == null ? void 0 : a.toast, C?.default, C?.[Je], p == null || (r = p.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": (In = p.richColors) != null ? In : H,
    "data-styled": !(p.jsx || p.unstyled || v),
    "data-mounted": Q,
    "data-promise": !!p.promise,
    "data-swiped": Re,
    "data-removed": se,
    "data-visible": St,
    "data-y-position": tn,
    "data-x-position": Pt,
    "data-index": R,
    "data-front": $e,
    "data-swiping": me,
    "data-dismissible": Fe,
    "data-type": Je,
    "data-invert": fi,
    "data-swipe-out": ge,
    "data-swipe-direction": D,
    "data-expanded": !!(E || X && Q),
    "data-testid": p.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": z.length - R,
      "--offset": `${se ? xe : ot.current}px`,
      "--initial-height": X ? "auto" : `${Ye}px`,
      ...B,
      ...p.style
    },
    onDragEnd: () => {
      ee(!1), P(null), yn.current = null;
    },
    onPointerDown: (He) => {
      He.button !== 2 && (Sa || !Fe || (Ge.current = /* @__PURE__ */ new Date(), Ce(ot.current), He.target.setPointerCapture(He.pointerId), He.target.tagName !== "BUTTON" && (ee(!0), yn.current = {
        x: He.clientX,
        y: He.clientY
      })));
    },
    onPointerUp: () => {
      var He, vt, Ht;
      if (ge || !Fe) return;
      yn.current = null;
      const Vt = Number(((He = Be.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), mn = Number(((vt = Be.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Ge.current) == null ? void 0 : Ht.getTime()), Kt = V === "x" ? Vt : mn, la = Math.abs(Kt) / pt;
      if (Math.abs(Kt) >= zz || la > 0.11) {
        Ce(ot.current), p.onDismiss == null || p.onDismiss.call(p, p), q(V === "x" ? Vt > 0 ? "right" : "left" : mn > 0 ? "down" : "up"), vn(), ze(!0);
        return;
      } else {
        var Wt, k;
        (Wt = Be.current) == null || Wt.style.setProperty("--swipe-amount-x", "0px"), (k = Be.current) == null || k.style.setProperty("--swipe-amount-y", "0px");
      }
      Se(!1), ee(!1), P(null);
    },
    onPointerMove: (He) => {
      var vt, Ht, Vt;
      if (!yn.current || !Fe || ((vt = window.getSelection()) == null ? void 0 : vt.toString().length) > 0) return;
      const pt = He.clientY - yn.current.y, Kt = He.clientX - yn.current.x;
      var la;
      const Wt = (la = t.swipeDirections) != null ? la : jz(re);
      !V && (Math.abs(Kt) > 1 || Math.abs(pt) > 1) && P(Math.abs(Kt) > Math.abs(pt) ? "x" : "y");
      let k = {
        x: 0,
        y: 0
      };
      const F = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if (V === "y") {
        if (Wt.includes("top") || Wt.includes("bottom"))
          if (Wt.includes("top") && pt < 0 || Wt.includes("bottom") && pt > 0)
            k.y = pt;
          else {
            const W = pt * F(pt);
            k.y = Math.abs(W) < Math.abs(pt) ? W : pt;
          }
      } else if (V === "x" && (Wt.includes("left") || Wt.includes("right")))
        if (Wt.includes("left") && Kt < 0 || Wt.includes("right") && Kt > 0)
          k.x = Kt;
        else {
          const W = Kt * F(Kt);
          k.x = Math.abs(W) < Math.abs(Kt) ? W : Kt;
        }
      (Math.abs(k.x) > 0 || Math.abs(k.y) > 0) && Se(!0), (Ht = Be.current) == null || Ht.style.setProperty("--swipe-amount-x", `${k.x}px`), (Vt = Be.current) == null || Vt.style.setProperty("--swipe-amount-y", `${k.y}px`);
    }
  }, It && !p.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": Z,
    "data-disabled": Sa,
    "data-close-button": !0,
    onClick: Sa || !Fe ? () => {
    } : () => {
      vn(), p.onDismiss == null || p.onDismiss.call(p, p);
    },
    className: Ma(C?.closeButton, p == null || (l = p.classNames) == null ? void 0 : l.closeButton)
  }, (un = L?.close) != null ? un : bz) : null, (Je || p.icon || p.promise) && p.icon !== null && (L?.[Je] !== null || p.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Ma(C?.icon, p == null || (s = p.classNames) == null ? void 0 : s.icon)
  }, p.promise || p.type === "loading" && !p.icon ? p.icon || ra() : null, p.type !== "loading" ? Dn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Ma(C?.content, p == null || (u = p.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Ma(C?.title, p == null || (c = p.classNames) == null ? void 0 : c.title)
  }, p.jsx ? p.jsx : typeof p.title == "function" ? p.title() : p.title), p.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Ma($, gt, C?.description, p == null || (h = p.classNames) == null ? void 0 : h.description)
  }, typeof p.description == "function" ? p.description() : p.description) : null), /* @__PURE__ */ ye.isValidElement(p.cancel) ? p.cancel : p.cancel && bu(p.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: p.cancelButtonStyle || A,
    onClick: (He) => {
      bu(p.cancel) && Fe && (p.cancel.onClick == null || p.cancel.onClick.call(p.cancel, He), vn());
    },
    className: Ma(C?.cancelButton, p == null || (g = p.classNames) == null ? void 0 : g.cancelButton)
  }, p.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(p.action) ? p.action : p.action && bu(p.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: p.actionButtonStyle || I,
    onClick: (He) => {
      bu(p.action) && (p.action.onClick == null || p.action.onClick.call(p.action, He), !He.defaultPrevented && vn());
    },
    className: Ma(C?.actionButton, p == null || (m = p.classNames) == null ? void 0 : m.actionButton)
  }, p.action.label) : null);
};
function Wv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function Hz(t, a) {
  const r = {};
  return [
    t,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", h = u ? Mz : Tz;
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
const Bz = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: g, className: m, offset: y, mobileOffset: p, theme: v = "light", richColors: b, duration: w, style: N, visibleToasts: M = Rz, toastOptions: R, dir: z = Wv(), gap: E = Az, icons: O, containerAriaLabel: H = "Notifications" } = a, [U, B] = ye.useState([]), A = ye.useMemo(() => l ? U.filter((Q) => Q.toasterId === l) : U.filter((Q) => !Q.toasterId), [
    U,
    l
  ]), I = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((Q) => Q.position).map((Q) => Q.position)))), [
    A,
    u
  ]), [le, $] = ye.useState([]), [K, re] = ye.useState(!1), [j, X] = ye.useState(!1), [C, L] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), Z = ye.useRef(null), V = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), P = ye.useRef(null), D = ye.useRef(!1), q = ye.useCallback((Q) => {
    B((te) => {
      var se;
      return (se = te.find((he) => he.id === Q.id)) != null && se.delete || Rn.dismiss(Q.id), te.filter(({ id: he }) => he !== Q.id);
    });
  }, []);
  return ye.useEffect(() => Rn.subscribe((Q) => {
    if (Q.dismiss) {
      requestAnimationFrame(() => {
        B((te) => te.map((se) => se.id === Q.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      rD.flushSync(() => {
        B((te) => {
          const se = te.findIndex((he) => he.id === Q.id);
          return se !== -1 ? [
            ...te.slice(0, se),
            {
              ...te[se],
              ...Q
            },
            ...te.slice(se + 1)
          ] : [
            Q,
            ...te
          ];
        });
      });
    });
  }), [
    U
  ]), ye.useEffect(() => {
    if (v !== "system") {
      L(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const Q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Q.addEventListener("change", ({ matches: te }) => {
        L(te ? "dark" : "light");
      });
    } catch {
      Q.addListener(({ matches: se }) => {
        try {
          L(se ? "dark" : "light");
        } catch (he) {
          console.error(he);
        }
      });
    }
  }, [
    v
  ]), ye.useEffect(() => {
    U.length <= 1 && re(!1);
  }, [
    U
  ]), ye.useEffect(() => {
    const Q = (te) => {
      var se;
      if (c.every((ee) => te[ee] || te.code === ee)) {
        var me;
        re(!0), (me = Z.current) == null || me.focus();
      }
      te.code === "Escape" && (document.activeElement === Z.current || (se = Z.current) != null && se.contains(document.activeElement)) && re(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    c
  ]), ye.useEffect(() => {
    if (Z.current)
      return () => {
        P.current && (P.current.focus({
          preventScroll: !0
        }), P.current = null, D.current = !1);
      };
  }, [
    Z.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: r,
    "aria-label": `${H} ${V}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((Q, te) => {
    var se;
    const [he, me] = Q.split("-");
    return A.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: Q,
      dir: z === "auto" ? Wv() : z,
      tabIndex: -1,
      ref: Z,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": C,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${Dz}px`,
        "--gap": `${E}px`,
        ...N,
        ...Hz(y, p)
      },
      onBlur: (ee) => {
        D.current && !ee.currentTarget.contains(ee.relatedTarget) && (D.current = !1, P.current && (P.current.focus({
          preventScroll: !0
        }), P.current = null));
      },
      onFocus: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || D.current || (D.current = !0, P.current = ee.relatedTarget);
      },
      onMouseEnter: () => re(!0),
      onMouseMove: () => re(!0),
      onMouseLeave: () => {
        j || re(!1);
      },
      onDragEnd: () => re(!1),
      onPointerDown: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || X(!0);
      },
      onPointerUp: () => X(!1)
    }, A.filter((ee) => !ee.position && te === 0 || ee.position === Q).map((ee, ge) => {
      var ze, Re;
      return /* @__PURE__ */ ye.createElement(Lz, {
        key: ee.id,
        icons: O,
        index: ge,
        toast: ee,
        defaultRichColors: b,
        duration: (ze = R?.duration) != null ? ze : w,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: s,
        visibleToasts: M,
        closeButton: (Re = R?.closeButton) != null ? Re : g,
        interacting: j,
        position: Q,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: q,
        toasts: A.filter((Se) => Se.position == ee.position),
        heights: le.filter((Se) => Se.position == ee.position),
        setHeights: $,
        expandByDefault: h,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), yh = "svi2-pro:trigger-render", vh = "svi2-pro:render-state";
function Uz() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(yh));
}
function kz(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(vh, { detail: t }));
}
function Vz(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(yh, t), () => window.removeEventListener(yh, t));
}
function qz(t) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && t(l);
  };
  return window.addEventListener(vh, a), () => window.removeEventListener(vh, a);
}
const Yz = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), $z = 832 * 480, Iz = 0.85;
function rw(t, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : t !== null && Yz.has(t);
}
function eb(t, a) {
  return Number.isFinite(t) && t % a === 0;
}
function Xz(t, a) {
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
  eb(c, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${c}).`,
    severity: "error"
  }), eb(h, 16) || r.push({
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
  }), rw(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Number.isFinite(c) && Number.isFinite(h) && c * h < $z * Iz && r.push({
    field: "width",
    message: `${c}×${h} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function Gz(t) {
  return t.some((a) => a.severity === "error");
}
function lw() {
  const {
    params: t,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = wa(), h = _.useMemo(
    () => Xz(t, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: t
    }),
    [t, a, r, l]
  ), g = Gz(h), m = s.phase === "running", [y, p] = _.useState(null), v = _.useCallback(async () => {
    if (g) {
      const w = h.find((N) => N.severity === "error");
      w && p({ field: w.field, token: Date.now() }), gr.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), gr.success("Render started.");
    } catch (w) {
      const N = w instanceof tc ? w.message : "Could not start the render.";
      gr.error(N);
    }
  }, [g, h, u]), b = _.useCallback(async () => {
    try {
      await c();
    } catch {
      gr.error("Could not cancel the render.");
    }
  }, [c]);
  return _.useEffect(() => Vz(() => void v()), [v]), _.useEffect(() => {
    kz({ busy: m, blocked: g });
  }, [m, g]), { issues: h, blocked: g, busy: m, submit: v, cancel: b, focusRequest: y };
}
const Zz = 220, Fz = 80;
function Qz(t) {
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
function Pz(t, a) {
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
function Kz(t) {
  const a = hm.filter(
    (s) => s !== "qwen_edit" || t.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: Qz(s),
      subtitle: Pz(s, t),
      state: t.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * Zz, y: Fz },
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
var Jz = "dk8hba0", Wz = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, e4 = "dk8hba5", t4 = "dk8hba6", n4 = "dk8hba7", a4 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, i4 = "dk8hbac";
function r4({ data: t }) {
  const a = t, r = [Jz, Wz[a.state]].join(" "), l = [i4, a4[a.state]].join(" ");
  return /* @__PURE__ */ S.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ S.jsx(El, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ S.jsxs("div", { className: e4, children: [
      /* @__PURE__ */ S.jsx("span", { className: t4, children: a.title }),
      /* @__PURE__ */ S.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ S.jsx("span", { className: n4, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ S.jsx(El, { type: "source", position: Ae.Right })
  ] });
}
const l4 = { pipeline: r4 };
var o4 = "_1g4g8kk0", s4 = "_1g4g8kk1", u4 = "_1g4g8kk2", c4 = "_1g4g8kk3", f4 = "_1g4g8kk4", d4 = "_1g4g8kk5";
const h4 = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, m4 = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function p4() {
  const { render: t, params: a, qwenEdit: r } = wa(), { busy: l, blocked: s, submit: u, cancel: c } = lw(), h = _.useMemo(
    () => Kz({ render: t, params: a, qwenEditEnabled: r.enabled }),
    [t, a, r.enabled]
  ), g = hm.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ S.jsxs("div", { className: o4, children: [
    /* @__PURE__ */ S.jsx("div", { className: s4, children: /* @__PURE__ */ S.jsx(
      z3,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: l4,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ S.jsx("div", { className: u4, children: /* @__PURE__ */ S.jsxs(
      ai,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ S.jsx("div", { className: c4, children: g.map((m) => /* @__PURE__ */ S.jsxs("div", { className: f4, children: [
            /* @__PURE__ */ S.jsx("span", { children: m4[m] }),
            /* @__PURE__ */ S.jsx(Tn, { tone: h4[t.stageStates[m]], children: t.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ S.jsx("div", { className: d4, children: l ? /* @__PURE__ */ S.jsx(ri, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ S.jsx(ri, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var tb = wx();
const ow = 0, sw = 1, uw = 2, nb = 3;
var ab = Object.prototype.hasOwnProperty;
function bh(t, a) {
  var r, l;
  if (t === a) return !0;
  if (t && a && (r = t.constructor) === a.constructor) {
    if (r === Date) return t.getTime() === a.getTime();
    if (r === RegExp) return t.toString() === a.toString();
    if (r === Array) {
      if ((l = t.length) === a.length)
        for (; l-- && bh(t[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof t == "object") {
      l = 0;
      for (r in t)
        if (ab.call(t, r) && ++l && !ab.call(a, r) || !(r in a) || !bh(t[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return t !== t && a !== a;
}
const ii = /* @__PURE__ */ new WeakMap(), oi = () => {
}, hn = (
  /*#__NOINLINE__*/
  oi()
), xh = Object, nt = (t) => t === hn, za = (t) => typeof t == "function", Xi = (t, a) => ({
  ...t,
  ...a
}), cw = (t) => za(t.then), Id = {}, xu = {}, gm = "undefined", Ko = typeof window != gm, wh = typeof document != gm, g4 = Ko && "Deno" in window, y4 = () => Ko && typeof window.requestAnimationFrame != gm, fw = (t, a) => {
  const r = ii.get(t);
  return [
    // Getter
    () => !nt(a) && t.get(a) || Id,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = t.get(a);
        a in xu || (xu[a] = s), r[5](a, Xi(s, l), s || Id);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in xu ? xu[a] : !nt(a) && t.get(a) || Id
  ];
};
let Sh = !0;
const v4 = () => Sh, [Eh, _h] = Ko && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  oi,
  oi
], b4 = () => {
  const t = wh && document.visibilityState;
  return nt(t) || t !== "hidden";
}, x4 = (t) => (wh && document.addEventListener("visibilitychange", t), Eh("focus", t), () => {
  wh && document.removeEventListener("visibilitychange", t), _h("focus", t);
}), w4 = (t) => {
  const a = () => {
    Sh = !0, t();
  }, r = () => {
    Sh = !1;
  };
  return Eh("online", a), Eh("offline", r), () => {
    _h("online", a), _h("offline", r);
  };
}, S4 = {
  isOnline: v4,
  isVisible: b4
}, E4 = {
  initFocus: x4,
  initReconnect: w4
}, ib = !ye.useId, pl = !Ko || g4, _4 = (t) => y4() ? window.requestAnimationFrame(t) : setTimeout(t, 1), Xd = pl ? _.useEffect : _.useLayoutEffect, Gd = typeof navigator < "u" && navigator.connection, rb = !pl && Gd && ([
  "slow-2g",
  "2g"
].includes(Gd.effectiveType) || Gd.saveData), wu = /* @__PURE__ */ new WeakMap(), N4 = (t) => xh.prototype.toString.call(t), Zd = (t, a) => t === `[object ${a}]`;
let C4 = 0;
const Nh = (t) => {
  const a = typeof t, r = N4(t), l = Zd(r, "Date"), s = Zd(r, "RegExp"), u = Zd(r, "Object");
  let c, h;
  if (xh(t) === t && !l && !s) {
    if (c = wu.get(t), c) return c;
    if (c = ++C4 + "~", wu.set(t, c), Array.isArray(t)) {
      for (c = "@", h = 0; h < t.length; h++)
        c += Nh(t[h]) + ",";
      wu.set(t, c);
    }
    if (u) {
      c = "#";
      const g = xh.keys(t).sort();
      for (; !nt(h = g.pop()); )
        nt(t[h]) || (c += h + ":" + Nh(t[h]) + ",");
      wu.set(t, c);
    }
  } else
    c = l ? t.toJSON() : a == "symbol" ? t.toString() : a == "string" ? JSON.stringify(t) : "" + t;
  return c;
}, ym = (t) => {
  if (za(t))
    try {
      t = t();
    } catch {
      t = "";
    }
  const a = t;
  return t = typeof t == "string" ? t : (Array.isArray(t) ? t.length : t) ? Nh(t) : "", [
    t,
    a
  ];
};
let R4 = 0;
const Ch = () => ++R4;
async function dw(...t) {
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
  if (za(r)) {
    const v = r, b = [], w = a.keys();
    for (const N of w)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(N) && v(a.get(N)._k) && b.push(N);
    return Promise.all(b.map(p));
  }
  return p(r);
  async function p(v) {
    const [b] = ym(v);
    if (!b) return;
    const [w, N] = fw(a, b), [M, R, z, E] = ii.get(a), O = () => {
      const j = M[b];
      return (za(u.revalidate) ? u.revalidate(w().data, v) : u.revalidate !== !1) && (delete z[b], delete E[b], j && j[0]) ? j[0](uw).then(() => w().data) : w().data;
    };
    if (t.length < 3)
      return O();
    let H = l, U, B = !1;
    const A = Ch();
    R[b] = [
      A,
      0
    ];
    const I = !nt(g), le = w(), $ = le.data, K = le._c, re = nt(K) ? $ : K;
    if (I && (g = za(g) ? g(re, $) : g, N({
      data: g,
      _c: re
    })), za(H))
      try {
        H = H(re);
      } catch (j) {
        U = j, B = !0;
      }
    if (H && cw(H))
      if (H = await H.catch((j) => {
        U = j, B = !0;
      }), A !== R[b][0]) {
        if (B) throw U;
        return H;
      } else B && I && m(U) && (c = !0, N({
        data: re,
        _c: hn
      }));
    if (c && !B)
      if (za(c)) {
        const j = c(H, re);
        N({
          data: j,
          error: hn,
          _c: hn
        });
      } else
        N({
          data: H,
          error: hn,
          _c: hn
        });
    if (R[b][1] = Ch(), Promise.resolve(O()).then(() => {
      N({
        _c: hn
      });
    }), B) {
      if (y) throw U;
      return;
    }
    return H;
  }
}
const lb = (t, a) => {
  for (const r in t)
    t[r][0] && t[r][0](a);
}, T4 = (t, a) => {
  if (!ii.has(t)) {
    const r = Xi(E4, a), l = /* @__PURE__ */ Object.create(null), s = dw.bind(hn, t);
    let u = oi;
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
      if (!ii.has(t) && (ii.set(t, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        g,
        h
      ]), !pl)) {
        const y = r.initFocus(setTimeout.bind(hn, lb.bind(hn, l, ow))), p = r.initReconnect(setTimeout.bind(hn, lb.bind(hn, l, sw)));
        u = () => {
          y && y(), p && p(), ii.delete(t);
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
    ii.get(t)[4]
  ];
}, M4 = (t, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, h = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, h, s);
}, D4 = bh, [hw, A4] = T4(/* @__PURE__ */ new Map()), z4 = Xi(
  {
    // events
    onLoadingSlow: oi,
    onSuccess: oi,
    onError: oi,
    onErrorRetry: M4,
    onDiscarded: oi,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: rb ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: rb ? 5e3 : 3e3,
    // providers
    compare: D4,
    isPaused: () => !1,
    cache: hw,
    mutate: A4,
    fallback: {}
  },
  // use web preset by default
  S4
), O4 = (t, a) => {
  const r = Xi(t, a);
  if (a) {
    const { use: l, fallback: s } = t, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Xi(s, c));
  }
  return r;
}, j4 = _.createContext({}), L4 = "$inf$", mw = Ko && window.__SWR_DEVTOOLS_USE__, H4 = mw ? window.__SWR_DEVTOOLS_USE__ : [], B4 = () => {
  mw && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, U4 = (t) => za(t[1]) ? [
  t[0],
  t[1],
  t[2] || {}
] : [
  t[0],
  null,
  (t[1] === null ? t[2] : t[1]) || {}
], k4 = () => {
  const t = _.useContext(j4);
  return _.useMemo(() => Xi(z4, t), [
    t
  ]);
}, V4 = (t) => (a, r, l) => t(a, r && ((...u) => {
  const [c] = ym(a), [, , , h] = ii.get(hw);
  if (c.startsWith(L4))
    return r(...u);
  const g = h[c];
  return nt(g) ? r(...u) : (delete h[c], g);
}), l), q4 = H4.concat(V4), Y4 = (t) => function(...r) {
  const l = k4(), [s, u, c] = U4(r), h = O4(l, c);
  let g = t;
  const { use: m } = h, y = (m || []).concat(q4);
  for (let p = y.length; p--; )
    g = y[p](g);
  return g(s, u || h.fetcher || null, h);
}, $4 = (t, a, r) => {
  const l = a[t] || (a[t] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
B4();
const Fd = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), Qd = {
  dedupe: !0
}, ob = Promise.resolve(hn), I4 = () => oi, X4 = (t, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: h, revalidateIfStale: g, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: p, keepPreviousData: v, strictServerPrefetchWarning: b } = r, [w, N, M, R] = ii.get(l), [z, E] = ym(t), O = _.useRef(!1), H = _.useRef(!1), U = _.useRef(z), B = _.useRef(a), A = _.useRef(r), I = () => A.current, le = () => I().isVisible() && I().isOnline(), [$, K, re, j] = fw(l, z), X = _.useRef({}).current, C = nt(c) ? nt(r.fallback) ? hn : r.fallback[z] : c, L = (Te, Ge) => {
    for (const Be in X) {
      const $e = Be;
      if ($e === "data") {
        if (!s(Te[$e], Ge[$e]) && (!nt(Te[$e]) || !s(he, Ge[$e])))
          return !1;
      } else if (Ge[$e] !== Te[$e])
        return !1;
    }
    return !0;
  }, Z = !O.current, V = _.useMemo(() => {
    const Te = $(), Ge = j(), Be = (Fe) => {
      const Qe = Xi(Fe);
      return delete Qe._k, (() => {
        if (!z || !a || I().isPaused()) return !1;
        if (Z && !nt(h)) return h;
        const yt = nt(C) ? Qe.data : C;
        return nt(yt) || g;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Qe
      } : Qe;
    }, $e = Be(Te), St = Te === Ge ? $e : Be(Ge);
    let Je = $e;
    return [
      () => {
        const Fe = Be($());
        return L(Fe, Je) ? (Je.data = Fe.data, Je.isLoading = Fe.isLoading, Je.isValidating = Fe.isValidating, Je.error = Fe.error, Je) : (Je = Fe, Fe);
      },
      () => St
    ];
  }, [
    l,
    z
  ]), P = tb.useSyncExternalStore(_.useCallback(
    (Te) => re(z, (Ge, Be) => {
      L(Be, Ge) || Te();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      z
    ]
  ), V[0], V[1]), D = w[z] && w[z].length > 0, q = P.data, Q = nt(q) ? C && cw(C) ? Fd(C) : C : q, te = P.error, se = _.useRef(Q), he = v ? nt(q) ? nt(se.current) ? Q : se.current : q : Q, me = z && nt(Q), ee = _.useRef(null);
  !pl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  tb.useSyncExternalStore(I4, () => (ee.current = !1, ee), () => (ee.current = !0, ee));
  const ge = ee.current;
  b && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !z || !a || I().isPaused() || D && !nt(te) ? !1 : Z && !nt(h) ? h : u ? nt(Q) ? !1 : g : nt(Q) || g, Re = Z && ze, Se = nt(P.isValidating) ? Re : P.isValidating, xe = nt(P.isLoading) ? Re : P.isLoading, Ce = _.useCallback(
    async (Te) => {
      const Ge = B.current;
      if (!z || !Ge || H.current || I().isPaused())
        return !1;
      let Be, $e, St = !0;
      const Je = Te || {}, Fe = !M[z] || !Je.dedupe, Qe = () => ib ? !H.current && z === U.current && O.current : z === U.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, It = () => {
        const mt = M[z];
        mt && mt[1] === $e && delete M[z];
      }, Lt = {
        isValidating: !0
      };
      nt($().data) && (Lt.isLoading = !0);
      try {
        if (Fe && (K(Lt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          St && Qe() && I().onLoadingSlow(z, r);
        }, r.loadingTimeout), M[z] = [
          Ge(E),
          Ch()
        ]), [Be, $e] = M[z], Be = await Be, Fe && setTimeout(It, r.dedupingInterval), !M[z] || M[z][1] !== $e)
          return Fe && Qe() && I().onDiscarded(z), !1;
        gt.error = hn;
        const mt = N[z];
        if (!nt(mt) && // case 1
        ($e <= mt[0] || // case 2
        $e <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Fe && Qe() && I().onDiscarded(z), !1;
        const ot = $().data;
        gt.data = s(ot, Be) ? ot : Be, Fe && Qe() && I().onSuccess(Be, z, r);
      } catch (mt) {
        It();
        const ot = I(), { shouldRetryOnError: $n } = ot;
        ot.isPaused() || (gt.error = mt, Fe && Qe() && (ot.onError(mt, z, ot), ($n === !0 || za($n) && $n(mt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || le()) && ot.onErrorRetry(mt, z, ot, (yn) => {
          const tn = w[z];
          tn && tn[0] && tn[0](nb, yn);
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
      z,
      l
    ]
  ), Ye = _.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Te) => dw(l, U.current, ...Te),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Xd(() => {
    B.current = a, A.current = r, nt(q) || (se.current = q);
  }), Xd(() => {
    if (!z) return;
    const Te = Ce.bind(hn, Qd);
    let Ge = 0;
    I().revalidateOnFocus && (Ge = Date.now() + I().focusThrottleInterval);
    const $e = $4(z, w, (St, Je = {}) => {
      if (St == ow) {
        const Fe = Date.now();
        I().revalidateOnFocus && Fe > Ge && le() && (Ge = Fe + I().focusThrottleInterval, Te());
      } else if (St == sw)
        I().revalidateOnReconnect && le() && Te();
      else {
        if (St == uw)
          return Ce();
        if (St == nb)
          return Ce(Je);
      }
    });
    return H.current = !1, U.current = z, O.current = !0, K({
      _k: E
    }), ze && (M[z] || (nt(Q) || pl ? Te() : _4(Te))), () => {
      H.current = !0, $e();
    };
  }, [
    z
  ]), Xd(() => {
    let Te;
    function Ge() {
      const $e = za(m) ? m($().data) : m;
      $e && Te !== -1 && (Te = setTimeout(Be, $e));
    }
    function Be() {
      !$().error && (y || I().isVisible()) && (p || I().isOnline()) ? Ce(Qd).then(Ge) : Ge();
    }
    return Ge(), () => {
      Te && (clearTimeout(Te), Te = -1);
    };
  }, [
    m,
    y,
    p,
    z
  ]), _.useDebugValue(he), u) {
    if (!ib && pl && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (B.current = a, A.current = r, H.current = !1);
    const Te = R[z], Ge = !nt(Te) && me ? Ye(Te) : ob;
    if (Fd(Ge), !nt(te) && me)
      throw te;
    const Be = me ? Ce(Qd) : ob;
    !nt(he) && me && (Be.status = "fulfilled", Be.value = !0), Fd(Be);
  }
  return {
    mutate: Ye,
    get data() {
      return X.data = !0, he;
    },
    get error() {
      return X.error = !0, te;
    },
    get isValidating() {
      return X.isValidating = !0, Se;
    },
    get isLoading() {
      return X.isLoading = !0, xe;
    }
  };
}, Rh = Y4(X4);
var G4 = "_1xasopc0", Z4 = "_1xasopc1", F4 = "_1xasopc2", Q4 = "_1xasopc3", P4 = "_1xasopc4", K4 = "_1xasopc5", J4 = "_1xasopc6", W4 = "_1xasopc7", e5 = "_1xasopc8";
function t5(t, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = t.name.toLowerCase(), s = t.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function n5(t, a, r) {
  for (const l of t) {
    if (a && !t5(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function sb({
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
  const y = _.useRef(null), p = _.useId(), v = _.useId(), [b, w] = _.useState(!1), [N, M] = _.useState(null), [R, z] = _.useState([]), E = _.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), re = r ? K : K.slice(0, 1), j = n5(re, t, a);
      if (j) {
        M(j);
        return;
      }
      M(null), z(re), m(re);
    },
    [t, a, r, m]
  ), O = _.useCallback(() => {
    l || y.current?.click();
  }, [l]), H = _.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), O());
    },
    [l, O]
  ), U = _.useCallback(
    ($) => {
      $.preventDefault(), w(!1), !l && E($.dataTransfer.files);
    },
    [l, E]
  ), B = _.useCallback(
    ($) => {
      $.preventDefault(), l || w(!0);
    },
    [l]
  ), A = _.useCallback(($) => {
    $.preventDefault(), w(!1);
  }, []), I = [u ? v : null, N ? p : null].filter(Boolean).join(" "), le = [
    G4,
    b ? Z4 : "",
    l ? F4 : "",
    N !== null ? Q4 : "",
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
        "aria-describedby": I || void 0,
        className: le,
        onClick: O,
        onKeyDown: H,
        onDrop: U,
        onDragOver: B,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ S.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: P4,
              accept: t,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ S.jsx("span", { className: K4, children: s ?? (b ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ S.jsx("span", { id: v, className: J4, children: u }),
          g && R.length > 0 && /* @__PURE__ */ S.jsx("div", { className: e5, children: g(R) })
        ]
      }
    ),
    N && /* @__PURE__ */ S.jsx("div", { id: p, role: "alert", className: W4, children: N })
  ] });
}
function ub(t) {
  const [a, r] = _.useState(null);
  return _.useEffect(() => {
    if (!t) {
      r(null);
      return;
    }
    const l = URL.createObjectURL(t);
    return r(l), () => URL.revokeObjectURL(l);
  }, [t]), a;
}
async function a5(t) {
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
function cb(t) {
  const [a, r] = _.useState(null), [l, s] = _.useState(!1), [u, c] = _.useState(null), h = _.useCallback(
    async (g) => {
      if (r(g), c(null), !g) {
        t(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await a5(g);
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
var i5 = "cyswg40", fb = "cyswg41", db = "cyswg42", hb = "cyswg43", mb = "cyswg44", pb = "cyswg45", Su = "cyswg46";
const gb = 32 * 1024 * 1024;
function r5({
  lastImageRequired: t,
  refError: a,
  lastError: r
}) {
  const { setRefImage: l, setLastImage: s } = wa(), u = _.useCallback(
    (p, v) => l(p, v ?? ""),
    [l]
  ), c = _.useCallback(
    (p, v) => s(p, v),
    [s]
  ), h = cb(u), g = cb(c), m = ub(h.file), y = ub(g.file);
  return /* @__PURE__ */ S.jsxs("div", { className: i5, children: [
    /* @__PURE__ */ S.jsxs("div", { className: fb, children: [
      /* @__PURE__ */ S.jsxs("span", { className: db, children: [
        "Reference image ",
        /* @__PURE__ */ S.jsx(Tn, { tone: "accent", children: "required" })
      ] }),
      /* @__PURE__ */ S.jsx(
        sb,
        {
          accept: "image/*",
          maxSizeBytes: gb,
          ariaLabel: "reference image upload",
          label: h.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: "Defines identity. Aspect-match to the render resolution; dims divisible by 16.",
          onFiles: (p) => void h.pick(p[0] ?? null),
          renderPreview: () => m ? /* @__PURE__ */ S.jsx("img", { className: hb, src: m, alt: "reference preview" }) : null
        }
      ),
      h.uploading && /* @__PURE__ */ S.jsx("span", { className: pb, children: "Uploading…" }),
      !h.uploading && h.file && /* @__PURE__ */ S.jsx("span", { className: mb, children: h.file.name }),
      h.uploadError && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: h.uploadError }),
      a && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: a })
    ] }),
    /* @__PURE__ */ S.jsxs("div", { className: fb, children: [
      /* @__PURE__ */ S.jsxs("span", { className: db, children: [
        "Last image",
        " ",
        t ? /* @__PURE__ */ S.jsx(Tn, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ S.jsx(Tn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ S.jsx(
        sb,
        {
          accept: "image/*",
          maxSizeBytes: gb,
          ariaLabel: "last image upload",
          label: g.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over the clip.",
          onFiles: (p) => void g.pick(p[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ S.jsx("img", { className: hb, src: y, alt: "last preview" }) : null
        }
      ),
      g.uploading && /* @__PURE__ */ S.jsx("span", { className: pb, children: "Uploading…" }),
      !g.uploading && g.file && /* @__PURE__ */ S.jsx("span", { className: mb, children: g.file.name }),
      g.uploadError && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: g.uploadError }),
      r && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: r })
    ] })
  ] });
}
const l5 = /wan[\s._-]?2[._]2/i, o5 = /i2v/i, s5 = /high/i, u5 = /low/i, c5 = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function f5(t) {
  const a = `${t.family_id} ${t.filename}`;
  return c5.has(t.format) && t.install_path !== null && l5.test(a) && o5.test(a);
}
function d5(t) {
  const a = /* @__PURE__ */ new Map();
  for (const l of t) {
    if (!f5(l)) continue;
    const s = a.get(l.family_id) ?? [];
    a.set(l.family_id, [...s, l]);
  }
  const r = [];
  for (const [l, s] of a) {
    const u = s.find((h) => s5.test(h.filename)), c = s.find((h) => u5.test(h.filename) && h !== u);
    !u?.install_path || !c?.install_path || r.push({
      familyId: l,
      label: l.replace(/^huggingface:/, ""),
      ditHighPath: u.install_path,
      ditLowPath: c.install_path
    });
  }
  return r.sort((l, s) => l.label.localeCompare(s.label));
}
const h5 = "/api/v1/model-store/installed";
async function m5() {
  const t = await fetch(h5, {
    headers: { accept: "application/json" }
  });
  if (!t.ok)
    throw new Error(`model-store installed: HTTP ${t.status}`);
  const a = await t.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var vm = "_1czy96m0", bm = "_1czy96m1", pw = "_1czy96m2", Th = "_1czy96m3", Mh = "_1czy96m4", p5 = "_1czy96m5", g5 = "_1czy96m6", gw = "_1czy96m7", y5 = "_1czy96m8", v5 = "_1czy96m9", Dh = "_1czy96ma";
const yb = "__bundled__";
function b5() {
  const { params: t, settings: a, updateParam: r, setSettings: l } = wa(), s = Rh("svi2/installed-models", m5), u = _.useMemo(
    () => d5(s.data?.installed ?? []),
    [s.data]
  ), c = u.find((m) => m.ditHighPath === t.dit_high_path)?.familyId ?? yb, h = _.useCallback(
    (m) => {
      const y = u.find((v) => v.familyId === m), p = y ? {
        ...a,
        baseModelFamilyId: y.familyId,
        ditHighPath: y.ditHighPath,
        ditLowPath: y.ditLowPath
      } : { ...a, baseModelFamilyId: "", ditHighPath: "", ditLowPath: "" };
      r("dit_high_path", y ? y.ditHighPath : void 0), r("dit_low_path", y ? y.ditLowPath : void 0), l(p), p1(p).catch(() => {
      });
    },
    [u, a, r, l]
  ), g = s.error !== void 0;
  return /* @__PURE__ */ S.jsxs("div", { className: vm, children: [
    /* @__PURE__ */ S.jsx("label", { className: bm, htmlFor: "svi2-base-model", children: "Base model (Wan2.2-I2V)" }),
    /* @__PURE__ */ S.jsxs(
      "select",
      {
        id: "svi2-base-model",
        className: v5,
        value: c,
        onChange: (m) => h(m.target.value),
        children: [
          /* @__PURE__ */ S.jsx("option", { value: yb, children: cN }),
          u.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.familyId, children: m.label }, m.familyId))
        ]
      }
    ),
    g && /* @__PURE__ */ S.jsx("span", { className: Dh, children: "Model Foundry list unavailable — using the bundled base model." }),
    !g && u.length === 0 && /* @__PURE__ */ S.jsx("span", { className: Dh, children: "No substitutable Wan2.2-I2V high/low pairs installed via Model Foundry yet." })
  ] });
}
var x5 = "dck790", w5 = "dck791", S5 = "dck792";
function Qu({ title: t, detail: a, action: r, className: l }) {
  const s = [x5, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs("div", { className: s, children: [
    /* @__PURE__ */ S.jsx("span", { className: w5, children: t }),
    a && /* @__PURE__ */ S.jsx("span", { className: S5, children: a }),
    r
  ] });
}
var E5 = "_1880igs0", _5 = "_1880igs1", N5 = "_1880igs2", C5 = "_1880igs3", R5 = "_1880igs4", T5 = "_1880igs5", M5 = "_1880igs6";
const D5 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function A5({ jobs: t, onOpen: a }) {
  return t.length === 0 ? /* @__PURE__ */ S.jsx(
    Qu,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ S.jsx("div", { className: E5, children: t.map((r) => /* @__PURE__ */ S.jsxs("button", { type: "button", className: _5, onClick: () => a(r), children: [
    /* @__PURE__ */ S.jsxs("span", { className: N5, children: [
      /* @__PURE__ */ S.jsx("span", { className: C5, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ S.jsx("span", { className: R5, children: z5(r) })
    ] }),
    /* @__PURE__ */ S.jsxs("span", { className: T5, children: [
      /* @__PURE__ */ S.jsx("time", { className: M5, dateTime: r.createdAt, title: O5(r.createdAt), children: j5(r.createdAt) }),
      /* @__PURE__ */ S.jsx(Tn, { tone: D5[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function z5(t) {
  const a = t.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function O5(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
function j5(t) {
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
const yw = [10, 20, 30, 60, 120], vw = "custom", Pd = { framesPerClip: 85, fps: 16, overlap: 5 };
function bw(t) {
  return {
    framesPerClip: t.frames_per_clip ?? Pd.framesPerClip,
    fps: t.fps ?? Pd.fps,
    overlap: t.num_overlap_frame ?? Pd.overlap
  };
}
function L5(t, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (t - 1) * (r - l);
}
function H5(t, a) {
  return a.fps <= 0 ? 0 : L5(t, a) / a.fps;
}
function xw(t, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = t * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
function B5(t, a) {
  for (const r of yw)
    if (xw(r, a) === t) return r;
  return vw;
}
function U5(t) {
  const a = bw(t), r = t.num_clips ?? 1, l = H5(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = t.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
function k5() {
  const { params: t, updateParam: a } = wa(), r = bw(t), l = B5(t.num_clips ?? 1, r), [s, u] = _.useState(60), [c, h] = _.useState(!1), g = c || l === vw, m = (y) => {
    a("num_clips", xw(y, r));
  };
  return /* @__PURE__ */ S.jsxs("div", { className: vm, children: [
    /* @__PURE__ */ S.jsx("span", { className: bm, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ S.jsxs("div", { className: pw, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: [
      yw.map((y) => {
        const p = !g && l === y;
        return /* @__PURE__ */ S.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: [Th, p ? Mh : ""].filter(Boolean).join(" "),
            onClick: () => {
              h(!1), m(y);
            },
            children: [
              y,
              "s"
            ]
          },
          y
        );
      }),
      /* @__PURE__ */ S.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": g,
          className: [Th, g ? Mh : ""].filter(Boolean).join(" "),
          onClick: () => h(!0),
          children: "Custom"
        }
      )
    ] }),
    g && /* @__PURE__ */ S.jsxs("div", { className: gw, children: [
      /* @__PURE__ */ S.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          "aria-label": "Custom length in seconds",
          className: y5,
          min: 1,
          max: 600,
          value: s,
          onChange: (y) => {
            const p = Number(y.target.value);
            u(p), Number.isFinite(p) && p >= 1 && p <= 600 && m(p);
          }
        }
      ),
      /* @__PURE__ */ S.jsx("span", { className: Dh, children: "seconds (1–600)" })
    ] }),
    /* @__PURE__ */ S.jsx("output", { className: g5, "aria-live": "polite", children: U5(t) })
  ] });
}
var V5 = "dgx4n20", q5 = "dgx4n21", Y5 = "dgx4n22", $5 = "dgx4n23", I5 = "dgx4n24", X5 = "dgx4n25", G5 = "dgx4n26", Z5 = "dgx4n27", F5 = "dgx4n28", Q5 = "dgx4n29", P5 = "dgx4n2a", vb = "dgx4n2b", K5 = "dgx4n2c", J5 = "dgx4n2d";
function W5(t) {
  const a = t.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function eO({
  presets: t,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = _.useState(!1), u = _.useMemo(() => tz(t), [t]), c = _.useMemo(() => {
    const v = u.legacy.filter((w) => w.id === a), b = l ? u.legacy : v;
    return [...u.featured, ...b];
  }, [u, l, a]), h = _.useRef([]), g = _.useCallback(
    (v) => {
      const b = c[v];
      b && (h.current[v]?.focus(), r(b));
    },
    [c, r]
  ), m = _.useCallback(
    (v, b) => {
      const w = c.length - 1;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowDown":
          v.preventDefault(), g(b === w ? 0 : b + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          v.preventDefault(), g(b === 0 ? w : b - 1);
          break;
        case "Home":
          v.preventDefault(), g(0);
          break;
        case "End":
          v.preventDefault(), g(w);
          break;
      }
    },
    [c, g]
  );
  if (t.length === 0)
    return /* @__PURE__ */ S.jsx(
      Qu,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((v) => v.id === a)
  ), p = u.legacy.length;
  return /* @__PURE__ */ S.jsxs("div", { className: Q5, children: [
    /* @__PURE__ */ S.jsx("div", { className: V5, role: "radiogroup", "aria-label": "Render presets", children: c.map((v, b) => {
      const w = W3(v), N = v.id === a, M = v.id === Vo, R = [
        q5,
        v.legacy ? "" : Y5,
        M ? $5 : "",
        N ? I5 : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ S.jsxs(
        "button",
        {
          ref: (z) => {
            h.current[b] = z;
          },
          type: "button",
          role: "radio",
          "aria-checked": N,
          tabIndex: b === y ? 0 : -1,
          title: v.description,
          className: R,
          onClick: () => r(v),
          onKeyDown: (z) => m(z, b),
          children: [
            /* @__PURE__ */ S.jsxs("div", { className: X5, children: [
              /* @__PURE__ */ S.jsx("span", { className: G5, children: v.label }),
              M && /* @__PURE__ */ S.jsx(Tn, { tone: "accent", children: "Default" })
            ] }),
            /* @__PURE__ */ S.jsx("span", { className: Z5, children: W5(v.description) }),
            /* @__PURE__ */ S.jsxs("div", { className: F5, children: [
              /* @__PURE__ */ S.jsx(Tn, { tone: "neutral", children: w.resolution }),
              /* @__PURE__ */ S.jsx(Tn, { tone: "neutral", children: w.duration }),
              /* @__PURE__ */ S.jsx(Tn, { tone: w.isLowVram ? "success" : "neutral", children: w.vram }),
              w.isOffDistribution && /* @__PURE__ */ S.jsx(Tn, { tone: "warning", children: "off-distribution" }),
              w.requiresLastImage && /* @__PURE__ */ S.jsx(Tn, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        v.id
      );
    }) }),
    p > 0 && /* @__PURE__ */ S.jsxs("div", { className: P5, children: [
      /* @__PURE__ */ S.jsx("span", { className: vb, "aria-hidden": "true" }),
      /* @__PURE__ */ S.jsxs(
        "button",
        {
          type: "button",
          className: K5,
          "aria-expanded": l,
          onClick: () => s((v) => !v),
          children: [
            /* @__PURE__ */ S.jsx("span", { className: J5, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${p})`
          ]
        }
      ),
      /* @__PURE__ */ S.jsx("span", { className: vb, "aria-hidden": "true" })
    ] })
  ] });
}
var tO = "_1ntn2zv0", nO = "_1ntn2zv1", aO = "_1ntn2zv2", iO = "_1ntn2zv3", rO = "_1ntn2zv4", lO = "_1ntn2zv5", bb = "_1ntn2zv6", oO = "_1ntn2zv7", sO = "_1ntn2zv8", uO = "_1ntn2zv9", cO = "_1ntn2zva";
function fO({ error: t, textareaId: a }) {
  const { params: r, setPrompts: l } = wa(), [s, u] = _.useState(!1), c = r.prompts ?? [""], h = _.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), g = _.useMemo(
    () => c.slice(h).filter((v) => v.trim().length > 0).length,
    [c, h]
  ), m = (v) => {
    const b = c.length > 0 ? [...c] : [""];
    b[0] = v, l(b);
  }, y = (v, b) => {
    const w = Math.max(h, c.length, v + 1), N = Array.from({ length: w }, (M, R) => c[R] ?? "");
    N[v] = b, l(N);
  }, p = (v) => {
    if (u(v), v) {
      const b = c[0] ?? "", w = Math.max(h, c.length);
      l(Array.from({ length: w }, (N, M) => c[M] ?? b));
    }
  };
  return /* @__PURE__ */ S.jsxs("div", { className: tO, children: [
    /* @__PURE__ */ S.jsx("div", { className: nO, children: /* @__PURE__ */ S.jsxs("span", { className: aO, children: [
      /* @__PURE__ */ S.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: iO,
          onClick: () => p(!s),
          children: /* @__PURE__ */ S.jsx("span", { className: rO, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: h }, (v, b) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ S.jsxs("div", { className: oO, children: [
        /* @__PURE__ */ S.jsxs("span", { className: sO, children: [
          "Clip ",
          b + 1
        ] }),
        /* @__PURE__ */ S.jsx(
          "textarea",
          {
            id: b === 0 ? a : void 0,
            className: bb,
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
        className: bb,
        "aria-label": "single prompt",
        "aria-invalid": t !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (v) => m(v.target.value)
      }
    ),
    g > 0 && /* @__PURE__ */ S.jsxs("output", { className: lO, children: [
      g,
      " per-clip prompt",
      g > 1 ? "s" : "",
      " beyond the current Clips count ",
      g > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      g > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ S.jsx("p", { className: uO, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    t && /* @__PURE__ */ S.jsx("span", { role: "alert", className: cO, children: t })
  ] });
}
var dO = "_1itrxk30", hO = "_1itrxk31", mO = "_1itrxk32", pO = "_1itrxk33", gO = "_1itrxk34", yO = "_1itrxk35", vO = "_1itrxk36", bO = "_1itrxk37";
function xO() {
  const { qwenEdit: t, setQwenEdit: a } = wa();
  return /* @__PURE__ */ S.jsxs("div", { className: dO, children: [
    /* @__PURE__ */ S.jsxs("div", { className: hO, children: [
      /* @__PURE__ */ S.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": t.enabled,
          "aria-label": "enable anchor edit",
          className: vO,
          onClick: () => a({ enabled: !t.enabled }),
          children: /* @__PURE__ */ S.jsx("span", { className: bO, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ S.jsxs("span", { className: mO, children: [
        /* @__PURE__ */ S.jsx("span", { className: pO, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ S.jsx("span", { className: gO, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    t.enabled && /* @__PURE__ */ S.jsx(
      "textarea",
      {
        className: yO,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: t.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var wO = "ob7g5b0", SO = "ob7g5b1", EO = "ob7g5b3", _O = "ob7g5b4", NO = "ob7g5b5", CO = "ob7g5b6", RO = "ob7g5b7", TO = "ob7g5b8", MO = "ob7g5b9", DO = "ob7g5ba";
function AO({
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
  const [b, w] = _.useState("loading"), [N, M] = _.useState(null), R = _.useCallback(() => {
    w("ready"), p?.();
  }, [p]), z = _.useCallback(
    (O) => {
      const H = O.target, U = H.error?.message || `media error code ${H.error?.code ?? "?"}`;
      w("error"), M(U), v?.(new Error(U));
    },
    [v]
  ), E = [wO, g].filter(Boolean).join(" ");
  return t ? b === "error" ? /* @__PURE__ */ S.jsx("div", { className: E, role: "alert", "aria-label": h ?? "video playback error", children: /* @__PURE__ */ S.jsxs("div", { className: RO, children: [
    /* @__PURE__ */ S.jsx("div", { className: TO, children: "Could not play video" }),
    /* @__PURE__ */ S.jsx("div", { className: MO, children: N ?? "unknown error" }),
    /* @__PURE__ */ S.jsx("a", { className: DO, href: t, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ S.jsxs("div", { className: E, children: [
    b === "loading" && /* @__PURE__ */ S.jsx("div", { className: EO, "aria-hidden": "true", children: /* @__PURE__ */ S.jsx("div", { className: _O }) }),
    r && /* @__PURE__ */ S.jsx("span", { className: NO, children: r }),
    /* @__PURE__ */ S.jsx(
      "video",
      {
        className: SO,
        src: t,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": h ?? "video player",
        onLoadedData: R,
        onEnded: y,
        onError: z,
        children: /* @__PURE__ */ S.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ S.jsx("div", { className: E, "aria-label": h ?? "no video", children: /* @__PURE__ */ S.jsx("div", { className: CO, children: m ?? "No video to display yet." }) });
}
const ni = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, xb = {
  [ni.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [ni.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [ni.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [ni.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [ni.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [ni.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [ni.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [ni.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [ni.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function zO(t, a) {
  return t !== null && xb[t] ? xb[t] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function OO(t) {
  return t ? `${nc}/media?path=${encodeURIComponent(t)}` : null;
}
var Eu = "_1ojc56g0", jO = "_1ojc56g1", LO = "_1ojc56g2", HO = "_1ojc56g3", BO = "_1ojc56g4", UO = "_1ojc56g5", kO = "_1ojc56g6", _u = "_1ojc56g7", VO = "_1ojc56g8", qO = "_1ojc56g9", YO = "_1ojc56ga", $O = "_1ojc56gb", IO = "_1ojc56gc", XO = "_1ojc56gd", GO = "_1ojc56ge", ZO = "_1ojc56gf";
function FO({ state: t, onCancel: a, onReset: r }) {
  const [l, s] = _.useState(!1);
  _.useEffect(() => {
    t.phase !== "running" && s(!1);
  }, [t.phase]);
  const u = _.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (t.phase === "idle")
    return /* @__PURE__ */ S.jsx(
      Qu,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (t.phase === "error") {
    const m = zO(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ S.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ S.jsxs("div", { className: XO, role: "alert", children: [
        /* @__PURE__ */ S.jsx("span", { className: GO, children: m.title }),
        /* @__PURE__ */ S.jsx("span", { className: ZO, children: m.hint })
      ] }),
      /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ri, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (t.phase === "cancelled")
    return /* @__PURE__ */ S.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ S.jsx(Qu, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ri, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = t.renderReport?.fps, h = typeof c == "number" ? c : void 0;
  if (t.phase === "done")
    return /* @__PURE__ */ S.jsxs("output", { className: Eu, children: [
      /* @__PURE__ */ S.jsx(
        AO,
        {
          src: OO(t.outputPath),
          fpsLabel: h ? `${h} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ S.jsx(QO, { state: t }),
      /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ri, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const g = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ S.jsxs("div", { className: Eu, children: [
    /* @__PURE__ */ S.jsx(
      "div",
      {
        className: UO,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": g,
        children: /* @__PURE__ */ S.jsx(
          "div",
          {
            className: kO,
            style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
          }
        )
      }
    ),
    t.stalled && /* @__PURE__ */ S.jsx("output", { className: IO, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ S.jsxs("div", { className: jO, "aria-live": "polite", children: [
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
    /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ri, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function Nu({ label: t, value: a }) {
  return /* @__PURE__ */ S.jsxs("div", { className: LO, children: [
    /* @__PURE__ */ S.jsx("span", { className: HO, children: t }),
    /* @__PURE__ */ S.jsx("span", { className: BO, children: a })
  ] });
}
function QO({ state: t }) {
  const a = t.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), t.vramPeakGib !== null && r.push(["VRAM peak", `${t.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), t.outputPath && r.push(["Output", t.outputPath]), r.length === 0 ? null : /* @__PURE__ */ S.jsx("div", { className: VO, children: r.map(([l, s]) => /* @__PURE__ */ S.jsxs("div", { className: qO, children: [
    /* @__PURE__ */ S.jsx("span", { className: YO, children: l }),
    /* @__PURE__ */ S.jsx("span", { className: $O, children: s })
  ] }, l)) });
}
const ww = "custom", PO = [
  {
    presetId: "svi-canonical",
    label: "Native — SVI 2.0 Pro 480p training budget",
    offDistribution: !1
  },
  { presetId: "svi-canonical-704", label: "One step down", offDistribution: !0 },
  { presetId: "svi-canonical-640", label: "Two steps down", offDistribution: !0 }
];
function KO(t) {
  const a = new Map(t.map((l) => [l.id, l])), r = [];
  for (const l of PO) {
    const s = a.get(l.presetId), u = s?.params.width, c = s?.params.height;
    !u || !c || r.push({
      id: l.presetId,
      width: u,
      height: c,
      label: l.label,
      offDistribution: l.offDistribution
    });
  }
  return r;
}
function JO(t, a) {
  const r = a.find(
    (l) => l.width === t.width && l.height === t.height
  );
  return r ? r.id : ww;
}
function WO({ presets: t }) {
  const { params: a, updateParam: r } = wa(), l = _.useMemo(() => KO(t), [t]);
  if (l.length === 0) return null;
  const s = JO(a, l);
  return /* @__PURE__ */ S.jsxs("div", { className: vm, children: [
    /* @__PURE__ */ S.jsx("span", { className: bm, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ S.jsx("div", { className: pw, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: l.map((u) => {
      const c = s === u.id;
      return /* @__PURE__ */ S.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": c,
          className: [Th, c ? Mh : ""].filter(Boolean).join(" "),
          onClick: () => {
            r("width", u.width), r("height", u.height);
          },
          children: [
            u.width,
            "×",
            u.height,
            /* @__PURE__ */ S.jsx("span", { className: p5, children: u.label })
          ]
        },
        u.id
      );
    }) }),
    /* @__PURE__ */ S.jsxs("div", { className: gw, children: [
      s === ww && /* @__PURE__ */ S.jsxs(Tn, { tone: "warning", children: [
        "custom ",
        a.width,
        "×",
        a.height
      ] }),
      l.find((u) => u.id === s)?.offDistribution && /* @__PURE__ */ S.jsx(Tn, { tone: "warning", children: "off-distribution" })
    ] })
  ] });
}
var e6 = "_1hbttwg0", t6 = "_1hbttwg1", n6 = "_1hbttwg2", a6 = "_1hbttwg3", Sw = "_1hbttwg4", i6 = "_1hbttwg5", r6 = "_1hbttwg7 _1hbttwg6", l6 = "_1hbttwg8 _1hbttwg6", wb = "_1hbttwg9", o6 = "_1hbttwga", s6 = "_1hbttwgb", u6 = "_1hbttwgc", c6 = "_1hbttwgd";
function f6({ spec: t, value: a, error: r, onChange: l }) {
  const s = _.useId(), u = `${s}-help`, c = r ? `${s}-error` : u;
  return /* @__PURE__ */ S.jsxs("div", { className: e6, children: [
    /* @__PURE__ */ S.jsxs("div", { className: t6, children: [
      /* @__PURE__ */ S.jsx("label", { className: n6, htmlFor: s, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ S.jsx("span", { className: a6, children: h6(a) })
    ] }),
    d6(t, a, l, s, c, r !== void 0),
    /* @__PURE__ */ S.jsx("span", { id: u, className: Sw, children: t.help }),
    r && /* @__PURE__ */ S.jsx("span", { id: `${s}-error`, role: "alert", className: i6, children: r })
  ] });
}
function d6(t, a, r, l, s, u) {
  switch (t.control) {
    case "toggle": {
      const c = !!a;
      return /* @__PURE__ */ S.jsxs("div", { className: s6, children: [
        /* @__PURE__ */ S.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": c,
            "aria-describedby": s,
            className: u6,
            onClick: () => r(!c),
            children: /* @__PURE__ */ S.jsx("span", { className: c6, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ S.jsx("span", { className: Sw, children: c ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ S.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          className: [l6, u ? wb : ""].filter(Boolean).join(" "),
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
          className: o6,
          min: t.min,
          max: t.max,
          step: t.step,
          value: Sb(a, t),
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
          className: [r6, u ? wb : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: Sb(a, t),
          onChange: (c) => r(Number(c.target.value))
        }
      );
  }
}
function Sb(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function h6(t) {
  return typeof t != "number" ? "—" : Number.isInteger(t) ? String(t) : t.toFixed(2);
}
var m6 = "_1f0q5gf0", p6 = "_1f0q5gf1", g6 = "_1f0q5gf2", y6 = "_1f0q5gf3", v6 = "_1f0q5gf4", b6 = "_1f0q5gf5", x6 = "_1f0q5gf6", w6 = "_1f0q5gf7", S6 = "_1f0q5gf8";
function E6({
  title: t,
  description: a,
  badge: r,
  defaultCollapsed: l = !1,
  collapsible: s = !0,
  className: u,
  children: c
}) {
  const h = _.useId(), [g, m] = _.useState(s ? l : !1), y = [m6, u].filter(Boolean).join(" "), p = [g6, g ? y6 : ""].filter(Boolean).join(" "), v = !s || !g;
  return /* @__PURE__ */ S.jsxs("section", { className: y, children: [
    /* @__PURE__ */ S.jsxs(
      "button",
      {
        type: "button",
        className: p6,
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
          /* @__PURE__ */ S.jsxs("span", { className: v6, children: [
            /* @__PURE__ */ S.jsx("span", { className: b6, children: t }),
            a && /* @__PURE__ */ S.jsx("span", { className: x6, children: a })
          ] }),
          r && /* @__PURE__ */ S.jsx("span", { className: w6, children: r })
        ]
      }
    ),
    v && /* @__PURE__ */ S.jsx("div", { id: h, className: S6, children: c })
  ] });
}
var _6 = "kn07ek0", N6 = "kn07ek1";
function C6({ issues: t }) {
  const { params: a, updateParam: r } = wa(), l = (s) => t.find((u) => u.field === s && u.severity === "error")?.message;
  return /* @__PURE__ */ S.jsx("div", { className: _6, children: aw.map((s) => {
    const u = Z3(s.id);
    return u.length === 0 ? null : /* @__PURE__ */ S.jsx(
      E6,
      {
        title: s.title,
        description: s.description,
        defaultCollapsed: s.defaultCollapsed,
        badge: s.defaultCollapsed ? /* @__PURE__ */ S.jsx(Tn, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ S.jsx("div", { className: N6, children: u.map((c) => /* @__PURE__ */ S.jsx(
          f6,
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
var R6 = "_1w9jfpf0", T6 = "_1w9jfpf1", M6 = "_1w9jfpf2", D6 = "_1w9jfpf3", A6 = "_1w9jfpf4", z6 = "_1w9jfpf5";
const Ah = "svi2-anchor-panel", Ew = "svi2-prompt-input";
function O6() {
  const { presetId: t, presetApplied: a, params: r, render: l, applyPresetById: s, resetRender: u, showJobResult: c } = wa(), { issues: h, blocked: g, busy: m, submit: y, cancel: p, focusRequest: v } = lw();
  L6(v);
  const b = Rh("svi2/presets", m1), w = Rh("svi2/history", () => nz(25)), N = b.data?.presets ?? [];
  _.useEffect(() => {
    if (a || N.length === 0) return;
    const B = N.find((A) => A.id === t) ?? N[0];
    B && s(B);
  }, [a, N, t, s]);
  const M = w.data?.jobs ?? [], R = rw(t, r), z = h.find((B) => B.field === "ref_image_path")?.message, E = h.find((B) => B.field === "last_image_path")?.message, O = h.find((B) => B.field === "prompts")?.message, H = h.find(
    (B) => B.field === "width" && B.severity === "warning"
  )?.message, U = _.useCallback(
    (B) => {
      c(B);
    },
    [c]
  );
  return /* @__PURE__ */ S.jsxs("div", { className: R6, children: [
    /* @__PURE__ */ S.jsxs("div", { className: T6, children: [
      /* @__PURE__ */ S.jsx(
        ai,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ S.jsx(eO, { presets: N, selectedId: t, onSelect: s })
        }
      ),
      /* @__PURE__ */ S.jsx("div", { id: Ah, children: /* @__PURE__ */ S.jsx(
        ai,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ S.jsx(
            r5,
            {
              lastImageRequired: R,
              refError: z,
              lastError: E
            }
          )
        }
      ) }),
      /* @__PURE__ */ S.jsx(ai, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ S.jsx(fO, { error: O, textareaId: Ew }) }),
      /* @__PURE__ */ S.jsx(ai, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ S.jsx(xO, {}) }),
      /* @__PURE__ */ S.jsxs(ai, { title: "Parameters", description: "Grouped by tier. Advanced tiers stay collapsed.", children: [
        H && /* @__PURE__ */ S.jsx("output", { className: A6, children: H }),
        /* @__PURE__ */ S.jsxs("div", { className: z6, children: [
          /* @__PURE__ */ S.jsx(k5, {}),
          /* @__PURE__ */ S.jsx(WO, { presets: N }),
          /* @__PURE__ */ S.jsx(b5, {})
        ] }),
        /* @__PURE__ */ S.jsx(C6, { issues: h })
      ] })
    ] }),
    /* @__PURE__ */ S.jsxs("div", { className: M6, children: [
      /* @__PURE__ */ S.jsxs(
        ai,
        {
          title: "Render",
          description: m ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ S.jsx(FO, { state: l, onCancel: p, onReset: u }),
            !m && /* @__PURE__ */ S.jsx("div", { className: D6, children: /* @__PURE__ */ S.jsx(
              ri,
              {
                variant: "primary",
                disabled: g,
                title: g ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void y(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ S.jsx(ai, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ S.jsx(A5, { jobs: M, onOpen: U }) })
    ] })
  ] });
}
const j6 = {
  ref_image_path: Ah,
  last_image_path: Ah,
  prompts: Ew
};
function L6(t) {
  _.useEffect(() => {
    if (!t || typeof document > "u") return;
    const a = j6[t.field];
    if (a) {
      const l = document.getElementById(a);
      Eb(l);
      return;
    }
    H6(t.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      Eb(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [t]);
}
function H6(t) {
  const a = pm.find((s) => s.key === t);
  if (!a) return;
  const r = aw.find((s) => s.id === a.tier);
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
function Eb(t) {
  if (!t) return;
  const a = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" ? t : t.querySelector("input, textarea, select, button");
  t.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var B6 = "_1smvon90", ur = "_1smvon91", cr = "_1smvon92", fr = "_1smvon93", Cu = "_1smvon94", Kd = "_1smvon95 _1smvon94", U6 = "_1smvon96", k6 = "_1smvon97";
const V6 = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function q6() {
  const { settings: t, setSettings: a } = wa(), [r, l] = _.useState(t), [s, u] = _.useState(!1), c = _.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== t[m]
    ),
    [r, t]
  ), h = (m, y) => {
    l((p) => ({ ...p, [m]: y }));
  }, g = async () => {
    u(!0);
    try {
      const m = await p1(r);
      a(m), l(m), gr.success("Settings saved. Applied to new renders.");
    } catch {
      gr.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ S.jsxs(
    ai,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ S.jsxs("div", { className: B6, children: [
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Models directory" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Cu,
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
                className: Cu,
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
                children: sN.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.value, children: m.label }, m.value))
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
                children: uN.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Blocks to swap" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Cu,
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
                children: V6.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Interpolate target fps" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Cu,
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
        /* @__PURE__ */ S.jsxs("div", { className: U6, children: [
          /* @__PURE__ */ S.jsx(ri, { loading: s, disabled: !c, onClick: () => void g(), children: "Save settings" }),
          /* @__PURE__ */ S.jsx(
            ri,
            {
              variant: "secondary",
              onClick: () => l(t),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ S.jsx("output", { className: k6, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var Y6 = "_1ugwva20", $6 = "_1ugwva21", I6 = "_1ugwva22", X6 = "_1ugwva23", G6 = "_1ugwva24", Z6 = "_1ugwva25", F6 = "_1ugwva26", Q6 = "_1ugwva27", P6 = "_1ugwva28";
const K6 = [
  { to: "recipe", label: "Recipe" },
  { to: "dag", label: "Pipeline" },
  { to: "settings", label: "Settings" }
];
function J6() {
  const t = g2(), { deploymentId: a } = l2(), r = W6(t.catalog?.presets ?? []);
  return /* @__PURE__ */ S.jsxs(cz, { initialSettings: t.settings, initialPreset: r, children: [
    /* @__PURE__ */ S.jsxs("div", { className: Y6, children: [
      /* @__PURE__ */ S.jsxs("header", { className: $6, children: [
        /* @__PURE__ */ S.jsxs("div", { className: I6, children: [
          /* @__PURE__ */ S.jsx("h1", { className: X6, children: "SVI 2.0 Pro" }),
          /* @__PURE__ */ S.jsx("p", { className: G6, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
        ] }),
        /* @__PURE__ */ S.jsx("nav", { className: Z6, "aria-label": "Workspace views", children: K6.map((l) => /* @__PURE__ */ S.jsx(
          f1,
          {
            to: `/${a}/${l.to}`,
            className: ({ isActive: s }) => [F6, s ? Q6 : ""].filter(Boolean).join(" "),
            children: l.label
          },
          l.to
        )) })
      ] }),
      /* @__PURE__ */ S.jsx("main", { className: P6, children: /* @__PURE__ */ S.jsx(M2, {}) })
    ] }),
    /* @__PURE__ */ S.jsx(Bz, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function W6(t) {
  return t.find((a) => a.id === Vo) ?? t[0] ?? null;
}
async function e8() {
  const [t, a] = await Promise.all([
    m1().catch(() => null),
    dN().catch(() => h1)
  ]);
  return { catalog: t, settings: a };
}
function t8() {
  return [
    {
      path: "/",
      loader: () => gy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: e8,
      Component: J6,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => gy(`/${n8(t, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: O6 },
        { path: "dag", Component: p4 },
        { path: "settings", Component: q6 }
      ]
    }
  ];
}
function n8(t, a) {
  const r = t[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const _b = "ext-actions-request", a8 = "ext-actions-declare", i8 = "ext-action-state", Nb = "ext-action-invoke", zh = "svi2-pro:navigate", Cb = "svi2-pro.render", Rb = "svi2-pro.dag";
function r8(t, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: Cb,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s(),
    secondary: {
      id: Rb,
      label: "Pipeline",
      icon: "account_tree",
      tone: "secondary",
      tooltip: "Open the pipeline DAG view"
    }
  }), c = () => {
    t.dispatchEvent(
      new CustomEvent(a8, { detail: { actions: u() }, bubbles: !1 })
    );
  }, h = () => {
    t.dispatchEvent(
      new CustomEvent(i8, { detail: { action: s() }, bubbles: !1 })
    );
  }, g = () => c(), m = (p) => {
    const v = p.detail?.id;
    v === Cb ? Uz() : v === Rb && t.dispatchEvent(
      new CustomEvent(zh, {
        detail: { path: `/${a}/dag` },
        bubbles: !1
      })
    );
  }, y = qz((p) => {
    r = p.busy, l = p.blocked, h();
  });
  return t.addEventListener(_b, g), t.addEventListener(Nb, m), c(), {
    dispose: () => {
      y(), t.removeEventListener(_b, g), t.removeEventListener(Nb, m);
    }
  };
}
const Oh = "svi2-pro-app", l8 = "ext-event", Tb = "svi2-pro-stylesheet", Mb = ["accent", "density", "card"];
function o8(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function s8() {
  if (typeof document > "u" || document.getElementById(Tb)) return;
  const t = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = Tb, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
s8();
class u8 extends HTMLElement {
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
    this.root = kE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(zh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = r8(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(zh, a);
  }
  syncTweaksFromBody() {
    for (const a of Mb) {
      const r = o8(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Mb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = _2(t8(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ S.jsx(_.StrictMode, { children: /* @__PURE__ */ S.jsx(C2, { router: r }) })
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
      new CustomEvent(l8, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function c8() {
  typeof customElements > "u" || customElements.get(Oh) || customElements.define(Oh, u8);
}
typeof customElements < "u" && !customElements.get(Oh) && c8();
export {
  c8 as register
};
//# sourceMappingURL=svi2-pro.js.map
