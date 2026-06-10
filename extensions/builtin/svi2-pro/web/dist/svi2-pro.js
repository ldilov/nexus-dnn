function FE(e, a) {
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
function Ih(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zd = { exports: {} }, xo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fy;
function ZE() {
  if (fy) return xo;
  fy = 1;
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
  return xo.Fragment = a, xo.jsx = r, xo.jsxs = r, xo;
}
var dy;
function QE() {
  return dy || (dy = 1, zd.exports = ZE()), zd.exports;
}
var x = QE(), Od = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hy;
function PE() {
  if (hy) return Ve;
  hy = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), v = Symbol.iterator;
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
  }, N = Object.assign, T = {};
  function C(D, q, Q) {
    this.props = D, this.context = q, this.refs = T, this.updater = Q || w;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(D, q) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, q, "setState");
  }, C.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function z() {
  }
  z.prototype = C.prototype;
  function E(D, q, Q) {
    this.props = D, this.context = q, this.refs = T, this.updater = Q || w;
  }
  var O = E.prototype = new z();
  O.constructor = E, N(O, C.prototype), O.isPureReactComponent = !0;
  var H = Array.isArray;
  function k() {
  }
  var B = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(D, q, Q) {
    var te = Q.ref;
    return {
      $$typeof: e,
      type: D,
      key: q,
      ref: te !== void 0 ? te : null,
      props: Q
    };
  }
  function le(D, q) {
    return I(D.type, q, D.props);
  }
  function Y(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
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
  function G(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(k, k) : (D.status = "pending", D.then(
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
  function R(D, q, Q, te, se) {
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
              return me = D._init, R(
                me(D._payload),
                q,
                Q,
                te,
                se
              );
          }
      }
    if (me)
      return se = se(D), me = te === "" ? "." + j(D, 0) : te, H(se) ? (Q = "", me != null && (Q = me.replace(re, "$&/") + "/"), R(se, q, Q, "", function(ze) {
        return ze;
      })) : se != null && (Y(se) && (se = le(
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
        te = D[ge], he = ee + j(te, ge), me += R(
          te,
          q,
          Q,
          he,
          se
        );
    else if (ge = b(D), typeof ge == "function")
      for (D = ge.call(D), ge = 0; !(te = D.next()).done; )
        te = te.value, he = ee + j(te, ge++), me += R(
          te,
          q,
          Q,
          he,
          se
        );
    else if (he === "object") {
      if (typeof D.then == "function")
        return R(
          G(D),
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
    return R(D, te, "", "", function(he) {
      return q.call(Q, he, se++);
    }), te;
  }
  function F(D) {
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
      if (!Y(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Ve.Activity = g, Ve.Children = P, Ve.Component = C, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, Ve.__COMPILER_RUNTIME = {
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
    return { $$typeof: d, render: D };
  }, Ve.isValidElement = Y, Ve.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: F
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
      se !== null && se(Q, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(k, V);
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
var my;
function Fo() {
  return my || (my = 1, Od.exports = PE()), Od.exports;
}
var _ = Fo();
const ye = /* @__PURE__ */ Ih(_), KE = /* @__PURE__ */ FE({
  __proto__: null,
  default: ye
}, [_]);
var jd = { exports: {} }, So = {}, Ld = { exports: {} }, Hd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var py;
function JE() {
  return py || (py = 1, (function(e) {
    function a(R, L) {
      var F = R.length;
      R.push(L);
      e: for (; 0 < F; ) {
        var V = F - 1 >>> 1, P = R[V];
        if (0 < s(P, L))
          R[V] = L, R[F] = P, F = V;
        else break e;
      }
    }
    function r(R) {
      return R.length === 0 ? null : R[0];
    }
    function l(R) {
      if (R.length === 0) return null;
      var L = R[0], F = R.pop();
      if (F !== L) {
        R[0] = F;
        e: for (var V = 0, P = R.length, D = P >>> 1; V < D; ) {
          var q = 2 * (V + 1) - 1, Q = R[q], te = q + 1, se = R[te];
          if (0 > s(Q, F))
            te < P && 0 > s(se, Q) ? (R[V] = se, R[te] = F, V = te) : (R[V] = Q, R[q] = F, V = q);
          else if (te < P && 0 > s(se, F))
            R[V] = se, R[te] = F, V = te;
          else break e;
        }
      }
      return L;
    }
    function s(R, L) {
      var F = R.sortIndex - L.sortIndex;
      return F !== 0 ? F : R.id - L.id;
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
    var p = [], m = [], y = 1, g = null, v = 3, b = !1, w = !1, N = !1, T = !1, C = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(R) {
      for (var L = r(m); L !== null; ) {
        if (L.callback === null) l(m);
        else if (L.startTime <= R)
          l(m), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(m);
      }
    }
    function H(R) {
      if (N = !1, O(R), !w)
        if (r(p) !== null)
          w = !0, k || (k = !0, K());
        else {
          var L = r(m);
          L !== null && G(H, L.startTime - R);
        }
    }
    var k = !1, B = -1, A = 5, I = -1;
    function le() {
      return T ? !0 : !(e.unstable_now() - I < A);
    }
    function Y() {
      if (T = !1, k) {
        var R = e.unstable_now();
        I = R;
        var L = !0;
        try {
          e: {
            w = !1, N && (N = !1, z(B), B = -1), b = !0;
            var F = v;
            try {
              t: {
                for (O(R), g = r(p); g !== null && !(g.expirationTime > R && le()); ) {
                  var V = g.callback;
                  if (typeof V == "function") {
                    g.callback = null, v = g.priorityLevel;
                    var P = V(
                      g.expirationTime <= R
                    );
                    if (R = e.unstable_now(), typeof P == "function") {
                      g.callback = P, O(R), L = !0;
                      break t;
                    }
                    g === r(p) && l(p), O(R);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) L = !0;
                else {
                  var D = r(m);
                  D !== null && G(
                    H,
                    D.startTime - R
                  ), L = !1;
                }
              }
              break e;
            } finally {
              g = null, v = F, b = !1;
            }
            L = void 0;
          }
        } finally {
          L ? K() : k = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E(Y);
      };
    else if (typeof MessageChannel < "u") {
      var re = new MessageChannel(), j = re.port2;
      re.port1.onmessage = Y, K = function() {
        j.postMessage(null);
      };
    } else
      K = function() {
        C(Y, 0);
      };
    function G(R, L) {
      B = C(function() {
        R(e.unstable_now());
      }, L);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(R) {
      R.callback = null;
    }, e.unstable_forceFrameRate = function(R) {
      0 > R || 125 < R ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < R ? Math.floor(1e3 / R) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, e.unstable_next = function(R) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = v;
      }
      var F = v;
      v = L;
      try {
        return R();
      } finally {
        v = F;
      }
    }, e.unstable_requestPaint = function() {
      T = !0;
    }, e.unstable_runWithPriority = function(R, L) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var F = v;
      v = R;
      try {
        return L();
      } finally {
        v = F;
      }
    }, e.unstable_scheduleCallback = function(R, L, F) {
      var V = e.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? V + F : V) : F = V, R) {
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
      return P = F + P, R = {
        id: y++,
        callback: L,
        priorityLevel: R,
        startTime: F,
        expirationTime: P,
        sortIndex: -1
      }, F > V ? (R.sortIndex = F, a(m, R), r(p) === null && R === r(m) && (N ? (z(B), B = -1) : N = !0, G(H, F - V))) : (R.sortIndex = P, a(p, R), w || b || (w = !0, k || (k = !0, K()))), R;
    }, e.unstable_shouldYield = le, e.unstable_wrapCallback = function(R) {
      var L = v;
      return function() {
        var F = v;
        v = L;
        try {
          return R.apply(this, arguments);
        } finally {
          v = F;
        }
      };
    };
  })(Hd)), Hd;
}
var gy;
function WE() {
  return gy || (gy = 1, Ld.exports = JE()), Ld.exports;
}
var Bd = { exports: {} }, fn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yy;
function e_() {
  if (yy) return fn;
  yy = 1;
  var e = Fo();
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
  return fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, fn.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, y);
  }, fn.flushSync = function(p) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, fn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, fn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, fn.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin), v = typeof m.integrity == "string" ? m.integrity : void 0, b = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: g,
          integrity: v,
          fetchPriority: b
        }
      ) : y === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: v,
        fetchPriority: b,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, fn.preinitModule = function(p, m) {
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
  }, fn.preload = function(p, m) {
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
  }, fn.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, fn.requestFormReset = function(p) {
    l.d.r(p);
  }, fn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, fn.useFormState = function(p, m, y) {
    return c.H.useFormState(p, m, y);
  }, fn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, fn.version = "19.2.7", fn;
}
var vy;
function $b() {
  if (vy) return Bd.exports;
  vy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Bd.exports = e_(), Bd.exports;
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
var by;
function t_() {
  if (by) return So;
  by = 1;
  var e = WE(), a = Fo(), r = $b();
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
        for (var S = !1, M = f.child; M; ) {
          if (M === i) {
            S = !0, i = f, o = h;
            break;
          }
          if (M === o) {
            S = !0, o = f, i = h;
            break;
          }
          M = M.sibling;
        }
        if (!S) {
          for (M = h.child; M; ) {
            if (M === i) {
              S = !0, i = h, o = f;
              break;
            }
            if (M === o) {
              S = !0, o = h, i = f;
              break;
            }
            M = M.sibling;
          }
          if (!S) throw Error(l(189));
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
  var g = Object.assign, v = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), B = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), le = Symbol.for("react.memo_cache_sentinel"), Y = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = Y && t[Y] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var re = Symbol.for("react.client.reference");
  function j(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === re ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case N:
        return "Fragment";
      case C:
        return "Profiler";
      case T:
        return "StrictMode";
      case H:
        return "Suspense";
      case k:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case E:
          return t.displayName || "Context";
        case z:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case B:
          return n = t.displayName || null, n !== null ? n : j(t.type) || "Memo";
        case A:
          n = t._payload, t = t._init;
          try {
            return j(t(n));
          } catch {
          }
      }
    return null;
  }
  var G = Array.isArray, R = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, V = [], P = -1;
  function D(t) {
    return { current: t };
  }
  function q(t) {
    0 > P || (t.current = V[P], V[P] = null, P--);
  }
  function Q(t, n) {
    P++, V[P] = t.current, t.current = n;
  }
  var te = D(null), se = D(null), he = D(null), me = D(null);
  function ee(t, n) {
    switch (Q(he, n), Q(se, t), Q(te, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? j0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = j0(n), t = L0(n, t);
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
    q(te), Q(te, t);
  }
  function ge() {
    q(te), q(se), q(he);
  }
  function ze(t) {
    t.memoizedState !== null && Q(me, t);
    var n = te.current, i = L0(n, t.type);
    n !== i && (Q(se, t), Q(te, i));
  }
  function Re(t) {
    se.current === t && (q(te), q(se)), me.current === t && (q(me), go._currentValue = F);
  }
  var we, xe;
  function Ce(t) {
    if (we === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        we = n && n[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + we + t + xe;
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
                Reflect.construct(t, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  ie = oe;
                }
                t.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                ie = oe;
              }
              (fe = t()) && typeof fe.catch == "function" && fe.catch(function() {
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
      var h = o.DetermineComponentFrameRoot(), S = h[0], M = h[1];
      if (S && M) {
        var $ = S.split(`
`), ae = M.split(`
`);
        for (f = o = 0; o < $.length && !$[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < ae.length && !ae[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === $.length || f === ae.length)
          for (o = $.length - 1, f = ae.length - 1; 1 <= o && 0 <= f && $[o] !== ae[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if ($[o] !== ae[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || $[o] !== ae[f]) {
                  var ue = `
` + $[o].replace(" at new ", " at ");
                  return t.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", t.displayName)), ue;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      $e = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Ce(i) : "";
  }
  function Te(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ce(t.type);
      case 16:
        return Ce("Lazy");
      case 13:
        return t.child !== n && n !== null ? Ce("Suspense Fallback") : Ce("Suspense");
      case 19:
        return Ce("SuspenseList");
      case 0:
      case 15:
        return ft(t.type, !1);
      case 11:
        return ft(t.type.render, !1);
      case 1:
        return ft(t.type, !0);
      case 31:
        return Ce("Activity");
      default:
        return "";
    }
  }
  function Xe(t) {
    try {
      var n = "", i = null;
      do
        n += Te(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Be = Object.prototype.hasOwnProperty, Ye = e.unstable_scheduleCallback, wt = e.unstable_cancelCallback, Je = e.unstable_shouldYield, Ze = e.unstable_requestPaint, Qe = e.unstable_now, gt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, It = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, mt = e.unstable_LowPriority, ot = e.unstable_IdlePriority, Gn = e.log, vn = e.unstable_setDisableYieldValue, tn = null, Pt = null;
  function Ot(t) {
    if (typeof Gn == "function" && vn(t), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(tn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : bn, mi = Math.log, Ea = Math.LN2;
  function bn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (mi(t) / Ea | 0) | 0;
  }
  var sa = 256, Dn = 262144, Xn = 4194304;
  function un(t) {
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
  function He(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = t.suspendedLanes, S = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = un(o) : (S &= M, S !== 0 ? f = un(S) : i || (i = M & ~t, i !== 0 && (f = un(i))))) : (M = o & ~h, M !== 0 ? f = un(M) : S !== 0 ? f = un(S) : i || (i = o & ~t, i !== 0 && (f = un(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, i = n & -n, h >= i || h === 32 && (i & 4194048) !== 0) ? n : f;
  }
  function vt(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Ht(t, n) {
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
    var t = Xn;
    return Xn <<= 1, (Xn & 62914560) === 0 && (Xn = 4194304), t;
  }
  function mn(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function pt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Kt(t, n, i, o, f, h) {
    var S = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var M = t.entanglements, $ = t.expirationTimes, ae = t.hiddenUpdates;
    for (i = S & ~i; 0 < i; ) {
      var ue = 31 - Ut(i), fe = 1 << ue;
      M[ue] = 0, $[ue] = -1;
      var ie = ae[ue];
      if (ie !== null)
        for (ae[ue] = null, ue = 0; ue < ie.length; ue++) {
          var oe = ie[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      i &= ~fe;
    }
    o !== 0 && ua(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(S & ~n));
  }
  function ua(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ut(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function Wt(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ut(i), f = 1 << o;
      f & n | t[o] & n && (t[o] |= n), i &= ~f;
    }
  }
  function U(t, n) {
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
  function de() {
    var t = L.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : iy(t.type));
  }
  function pe(t, n) {
    var i = L.p;
    try {
      return L.p = t, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, Se = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, Ue = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(t) {
    delete t[ve], delete t[Se], delete t[Me], delete t[De], delete t[Ue];
  }
  function Ct(t) {
    var n = t[ve];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = $0(t); t !== null; ) {
            if (i = t[ve]) return i;
            t = $0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function st(t) {
    if (t = t[ve] || t[be]) {
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
  function jt(t) {
    var n = t[je];
    return n || (n = t[je] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(t) {
    t[Ge] = !0;
  }
  var _a = /* @__PURE__ */ new Set(), An = {};
  function cn(t, n) {
    nn(t, n), nn(t + "Capture", n);
  }
  function nn(t, n) {
    for (An[t] = n, t = 0; t < n.length; t++)
      _a.add(n[t]);
  }
  var xn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), pi = {}, Sn = {};
  function gi(t) {
    return Be.call(Sn, t) ? !0 : Be.call(pi, t) ? !1 : xn.test(t) ? Sn[t] = !0 : (pi[t] = !0, !1);
  }
  function ca(t, n, i) {
    if (gi(n))
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
  function fa(t, n, i) {
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
  function ke(t, n, i, o) {
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
  function pn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function zn(t, n, i) {
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
        set: function(S) {
          i = "" + S, h.call(this, S);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(S) {
          i = "" + S;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function yi(t) {
    if (!t._valueTracker) {
      var n = pn(t) ? "checked" : "value";
      t._valueTracker = zn(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function qa(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = pn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function dt(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Fn = /[\n"\\]/g;
  function an(t) {
    return t.replace(
      Fn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Qi(t, n, i, o, f, h, S, M) {
    t.name = "", S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? t.type = S : t.removeAttribute("type"), n != null ? S === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + bt(n)) : t.value !== "" + bt(n) && (t.value = "" + bt(n)) : S !== "submit" && S !== "reset" || t.removeAttribute("value"), n != null ? Dl(t, S, bt(n)) : i != null ? Dl(t, S, bt(i)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + bt(M) : t.removeAttribute("name");
  }
  function Mr(t, n, i, o, f, h, S, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        yi(t);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" && (t.name = S), yi(t);
  }
  function Dl(t, n, i) {
    n === "number" && dt(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function vi(t, n, i, o) {
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
  function Al(t, n, i) {
    if (n != null && (n = "" + bt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + bt(i) : "";
  }
  function Dm(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (G(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), yi(t);
  }
  function Dr(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var $S = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Am(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || $S.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function zm(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && Am(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Am(t, h, n[h]);
  }
  function Rc(t) {
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
  var YS = /* @__PURE__ */ new Map([
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
  ]), IS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function is(t) {
    return IS.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function $a() {
  }
  var Tc = null;
  function Mc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ar = null, zr = null;
  function Om(t) {
    var n = st(t);
    if (n && (t = n.stateNode)) {
      var i = t[Se] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (Qi(
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
              'input[name="' + an(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var f = o[Se] || null;
                if (!f) throw Error(l(90));
                Qi(
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
              o = i[n], o.form === t.form && qa(o);
          }
          break e;
        case "textarea":
          Al(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && vi(t, !!i.multiple, n, !1);
      }
    }
  }
  var Dc = !1;
  function jm(t, n, i) {
    if (Dc) return t(n, i);
    Dc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (Dc = !1, (Ar !== null || zr !== null) && (Gs(), Ar && (n = Ar, t = zr, zr = Ar = null, Om(n), t)))
        for (n = 0; n < t.length; n++) Om(t[n]);
    }
  }
  function zl(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[Se] || null;
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
  var Ya = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ac = !1;
  if (Ya)
    try {
      var Ol = {};
      Object.defineProperty(Ol, "passive", {
        get: function() {
          Ac = !0;
        }
      }), window.addEventListener("test", Ol, Ol), window.removeEventListener("test", Ol, Ol);
    } catch {
      Ac = !1;
    }
  var bi = null, zc = null, rs = null;
  function Lm() {
    if (rs) return rs;
    var t, n = zc, i = n.length, o, f = "value" in bi ? bi.value : bi.textContent, h = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var S = i - t;
    for (o = 1; o <= S && n[i - o] === f[h - o]; o++) ;
    return rs = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function ls(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function os() {
    return !0;
  }
  function Hm() {
    return !1;
  }
  function wn(t) {
    function n(i, o, f, h, S) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = S, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (i = t[M], this[M] = i ? i(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? os : Hm, this.isPropagationStopped = Hm, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = os);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = os);
      },
      persist: function() {
      },
      isPersistent: os
    }), n;
  }
  var Pi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ss = wn(Pi), jl = g({}, Pi, { view: 0, detail: 0 }), GS = wn(jl), Oc, jc, Ll, us = g({}, jl, {
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
    getModifierState: Hc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ll && (Ll && t.type === "mousemove" ? (Oc = t.screenX - Ll.screenX, jc = t.screenY - Ll.screenY) : jc = Oc = 0, Ll = t), Oc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : jc;
    }
  }), Bm = wn(us), XS = g({}, us, { dataTransfer: 0 }), FS = wn(XS), ZS = g({}, jl, { relatedTarget: 0 }), Lc = wn(ZS), QS = g({}, Pi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), PS = wn(QS), KS = g({}, Pi, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), JS = wn(KS), WS = g({}, Pi, { data: 0 }), km = wn(WS), ew = {
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
  }, tw = {
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
  }, nw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function aw(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = nw[t]) ? !!n[t] : !1;
  }
  function Hc() {
    return aw;
  }
  var iw = g({}, jl, {
    key: function(t) {
      if (t.key) {
        var n = ew[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = ls(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? tw[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Hc,
    charCode: function(t) {
      return t.type === "keypress" ? ls(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ls(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), rw = wn(iw), lw = g({}, us, {
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
  }), Um = wn(lw), ow = g({}, jl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Hc
  }), sw = wn(ow), uw = g({}, Pi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), cw = wn(uw), fw = g({}, us, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), dw = wn(fw), hw = g({}, Pi, {
    newState: 0,
    oldState: 0
  }), mw = wn(hw), pw = [9, 13, 27, 32], Bc = Ya && "CompositionEvent" in window, Hl = null;
  Ya && "documentMode" in document && (Hl = document.documentMode);
  var gw = Ya && "TextEvent" in window && !Hl, Vm = Ya && (!Bc || Hl && 8 < Hl && 11 >= Hl), qm = " ", $m = !1;
  function Ym(t, n) {
    switch (t) {
      case "keyup":
        return pw.indexOf(n.keyCode) !== -1;
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
  function Im(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Or = !1;
  function yw(t, n) {
    switch (t) {
      case "compositionend":
        return Im(n);
      case "keypress":
        return n.which !== 32 ? null : ($m = !0, qm);
      case "textInput":
        return t = n.data, t === qm && $m ? null : t;
      default:
        return null;
    }
  }
  function vw(t, n) {
    if (Or)
      return t === "compositionend" || !Bc && Ym(t, n) ? (t = Lm(), rs = zc = bi = null, Or = !1, t) : null;
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
        return Vm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var bw = {
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
  function Gm(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!bw[t.type] : n === "textarea";
  }
  function Xm(t, n, i, o) {
    Ar ? zr ? zr.push(o) : zr = [o] : Ar = o, n = Js(n, "onChange"), 0 < n.length && (i = new ss(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var Bl = null, kl = null;
  function xw(t) {
    T0(t, 0);
  }
  function cs(t) {
    var n = We(t);
    if (qa(n)) return t;
  }
  function Fm(t, n) {
    if (t === "change") return n;
  }
  var Zm = !1;
  if (Ya) {
    var kc;
    if (Ya) {
      var Uc = "oninput" in document;
      if (!Uc) {
        var Qm = document.createElement("div");
        Qm.setAttribute("oninput", "return;"), Uc = typeof Qm.oninput == "function";
      }
      kc = Uc;
    } else kc = !1;
    Zm = kc && (!document.documentMode || 9 < document.documentMode);
  }
  function Pm() {
    Bl && (Bl.detachEvent("onpropertychange", Km), kl = Bl = null);
  }
  function Km(t) {
    if (t.propertyName === "value" && cs(kl)) {
      var n = [];
      Xm(
        n,
        kl,
        t,
        Mc(t)
      ), jm(xw, n);
    }
  }
  function Sw(t, n, i) {
    t === "focusin" ? (Pm(), Bl = n, kl = i, Bl.attachEvent("onpropertychange", Km)) : t === "focusout" && Pm();
  }
  function ww(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return cs(kl);
  }
  function Ew(t, n) {
    if (t === "click") return cs(n);
  }
  function _w(t, n) {
    if (t === "input" || t === "change")
      return cs(n);
  }
  function Nw(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var On = typeof Object.is == "function" ? Object.is : Nw;
  function Ul(t, n) {
    if (On(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!Be.call(n, f) || !On(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Jm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Wm(t, n) {
    var i = Jm(t);
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
      i = Jm(i);
    }
  }
  function ep(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? ep(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function tp(t) {
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
  function Vc(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var Cw = Ya && "documentMode" in document && 11 >= document.documentMode, jr = null, qc = null, Vl = null, $c = !1;
  function np(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    $c || jr == null || jr !== dt(o) || (o = jr, "selectionStart" in o && Vc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Vl && Ul(Vl, o) || (Vl = o, o = Js(qc, "onSelect"), 0 < o.length && (n = new ss(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = jr)));
  }
  function Ki(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var Lr = {
    animationend: Ki("Animation", "AnimationEnd"),
    animationiteration: Ki("Animation", "AnimationIteration"),
    animationstart: Ki("Animation", "AnimationStart"),
    transitionrun: Ki("Transition", "TransitionRun"),
    transitionstart: Ki("Transition", "TransitionStart"),
    transitioncancel: Ki("Transition", "TransitionCancel"),
    transitionend: Ki("Transition", "TransitionEnd")
  }, Yc = {}, ap = {};
  Ya && (ap = document.createElement("div").style, "AnimationEvent" in window || (delete Lr.animationend.animation, delete Lr.animationiteration.animation, delete Lr.animationstart.animation), "TransitionEvent" in window || delete Lr.transitionend.transition);
  function Ji(t) {
    if (Yc[t]) return Yc[t];
    if (!Lr[t]) return t;
    var n = Lr[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in ap)
        return Yc[t] = n[i];
    return t;
  }
  var ip = Ji("animationend"), rp = Ji("animationiteration"), lp = Ji("animationstart"), Rw = Ji("transitionrun"), Tw = Ji("transitionstart"), Mw = Ji("transitioncancel"), op = Ji("transitionend"), sp = /* @__PURE__ */ new Map(), Ic = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ic.push("scrollEnd");
  function da(t, n) {
    sp.set(t, n), cn(n, [t]);
  }
  var fs = typeof reportError == "function" ? reportError : function(t) {
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
  }, Zn = [], Hr = 0, Gc = 0;
  function ds() {
    for (var t = Hr, n = Gc = Hr = 0; n < t; ) {
      var i = Zn[n];
      Zn[n++] = null;
      var o = Zn[n];
      Zn[n++] = null;
      var f = Zn[n];
      Zn[n++] = null;
      var h = Zn[n];
      if (Zn[n++] = null, o !== null && f !== null) {
        var S = o.pending;
        S === null ? f.next = f : (f.next = S.next, S.next = f), o.pending = f;
      }
      h !== 0 && up(i, f, h);
    }
  }
  function hs(t, n, i, o) {
    Zn[Hr++] = t, Zn[Hr++] = n, Zn[Hr++] = i, Zn[Hr++] = o, Gc |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function Xc(t, n, i, o) {
    return hs(t, n, i, o), ms(t);
  }
  function Wi(t, n) {
    return hs(t, null, null, n), ms(t);
  }
  function up(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), h) : null;
  }
  function ms(t) {
    if (50 < so)
      throw so = 0, nd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Br = {};
  function Dw(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(t, n, i, o) {
    return new Dw(t, n, i, o);
  }
  function Fc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ia(t, n) {
    var i = t.alternate;
    return i === null ? (i = jn(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function cp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function ps(t, n, i, o, f, h) {
    var S = 0;
    if (o = t, typeof t == "function") Fc(t) && (S = 1);
    else if (typeof t == "string")
      S = LE(
        t,
        i,
        te.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case I:
          return t = jn(31, i, n, f), t.elementType = I, t.lanes = h, t;
        case N:
          return er(i.children, f, h, n);
        case T:
          S = 8, f |= 24;
          break;
        case C:
          return t = jn(12, i, n, f | 2), t.elementType = C, t.lanes = h, t;
        case H:
          return t = jn(13, i, n, f), t.elementType = H, t.lanes = h, t;
        case k:
          return t = jn(19, i, n, f), t.elementType = k, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case E:
                S = 10;
                break e;
              case z:
                S = 9;
                break e;
              case O:
                S = 11;
                break e;
              case B:
                S = 14;
                break e;
              case A:
                S = 16, o = null;
                break e;
            }
          S = 29, i = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = jn(S, i, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function er(t, n, i, o) {
    return t = jn(7, t, o, n), t.lanes = i, t;
  }
  function Zc(t, n, i) {
    return t = jn(6, t, null, n), t.lanes = i, t;
  }
  function fp(t) {
    var n = jn(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function Qc(t, n, i) {
    return n = jn(
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
  var dp = /* @__PURE__ */ new WeakMap();
  function Qn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = dp.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Xe(n)
      }, dp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Xe(n)
    };
  }
  var kr = [], Ur = 0, gs = null, ql = 0, Pn = [], Kn = 0, xi = null, Na = 1, Ca = "";
  function Ga(t, n) {
    kr[Ur++] = ql, kr[Ur++] = gs, gs = t, ql = n;
  }
  function hp(t, n, i) {
    Pn[Kn++] = Na, Pn[Kn++] = Ca, Pn[Kn++] = xi, xi = t;
    var o = Na;
    t = Ca;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), i += 1;
    var h = 32 - Ut(n) + f;
    if (30 < h) {
      var S = f - f % 5;
      h = (o & (1 << S) - 1).toString(32), o >>= S, f -= S, Na = 1 << 32 - Ut(n) + f | i << f | o, Ca = h + t;
    } else
      Na = 1 << h | i << f | o, Ca = t;
  }
  function Pc(t) {
    t.return !== null && (Ga(t, 1), hp(t, 1, 0));
  }
  function Kc(t) {
    for (; t === gs; )
      gs = kr[--Ur], kr[Ur] = null, ql = kr[--Ur], kr[Ur] = null;
    for (; t === xi; )
      xi = Pn[--Kn], Pn[Kn] = null, Ca = Pn[--Kn], Pn[Kn] = null, Na = Pn[--Kn], Pn[Kn] = null;
  }
  function mp(t, n) {
    Pn[Kn++] = Na, Pn[Kn++] = Ca, Pn[Kn++] = xi, Na = n.id, Ca = n.overflow, xi = t;
  }
  var rn = null, Tt = null, it = !1, Si = null, Jn = !1, Jc = Error(l(519));
  function wi(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $l(Qn(n, t)), Jc;
  }
  function pp(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ve] = t, n[Se] = o, i) {
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
        for (i = 0; i < co.length; i++)
          Ke(co[i], n);
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
        Ke("invalid", n), Mr(
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
        Ke("invalid", n), Dm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || z0(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = $a), n = !0) : n = !1, n || wi(t, !0);
  }
  function gp(t) {
    for (rn = t.return; rn; )
      switch (rn.tag) {
        case 5:
        case 31:
        case 13:
          Jn = !1;
          return;
        case 27:
        case 3:
          Jn = !0;
          return;
        default:
          rn = rn.return;
      }
  }
  function Vr(t) {
    if (t !== rn) return !1;
    if (!it) return gp(t), it = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || yd(t.type, t.memoizedProps)), i = !i), i && Tt && wi(t), gp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = q0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = q0(t);
    } else
      n === 27 ? (n = Tt, Hi(t.type) ? (t = wd, wd = null, Tt = t) : Tt = n) : Tt = rn ? ea(t.stateNode.nextSibling) : null;
    return !0;
  }
  function tr() {
    Tt = rn = null, it = !1;
  }
  function Wc() {
    var t = Si;
    return t !== null && (Cn === null ? Cn = t : Cn.push.apply(
      Cn,
      t
    ), Si = null), t;
  }
  function $l(t) {
    Si === null ? Si = [t] : Si.push(t);
  }
  var ef = D(null), nr = null, Xa = null;
  function Ei(t, n, i) {
    Q(ef, n._currentValue), n._currentValue = i;
  }
  function Fa(t) {
    t._currentValue = ef.current, q(ef);
  }
  function tf(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function nf(t, n, i, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var S = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var M = h;
          h = f;
          for (var $ = 0; $ < n.length; $++)
            if (M.context === n[$]) {
              h.lanes |= i, M = h.alternate, M !== null && (M.lanes |= i), tf(
                h.return,
                i,
                t
              ), o || (S = null);
              break e;
            }
          h = M.next;
        }
      } else if (f.tag === 18) {
        if (S = f.return, S === null) throw Error(l(341));
        S.lanes |= i, h = S.alternate, h !== null && (h.lanes |= i), tf(S, i, t), S = null;
      } else S = f.child;
      if (S !== null) S.return = f;
      else
        for (S = f; S !== null; ) {
          if (S === t) {
            S = null;
            break;
          }
          if (f = S.sibling, f !== null) {
            f.return = S.return, S = f;
            break;
          }
          S = S.return;
        }
      f = S;
    }
  }
  function qr(t, n, i, o) {
    t = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var S = f.alternate;
        if (S === null) throw Error(l(387));
        if (S = S.memoizedProps, S !== null) {
          var M = f.type;
          On(f.pendingProps.value, S.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === me.current) {
        if (S = f.alternate, S === null) throw Error(l(387));
        S.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(go) : t = [go]);
      }
      f = f.return;
    }
    t !== null && nf(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function ys(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!On(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ar(t) {
    nr = t, Xa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ln(t) {
    return yp(nr, t);
  }
  function vs(t, n) {
    return nr === null && ar(t), yp(t, n);
  }
  function yp(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Xa === null) {
      if (t === null) throw Error(l(308));
      Xa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Xa = Xa.next = n;
    return i;
  }
  var Aw = typeof AbortController < "u" ? AbortController : function() {
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
  }, zw = e.unstable_scheduleCallback, Ow = e.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function af() {
    return {
      controller: new Aw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Yl(t) {
    t.refCount--, t.refCount === 0 && zw(Ow, function() {
      t.controller.abort();
    });
  }
  var Il = null, rf = 0, $r = 0, Yr = null;
  function jw(t, n) {
    if (Il === null) {
      var i = Il = [];
      rf = 0, $r = sd(), Yr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return rf++, n.then(vp, vp), n;
  }
  function vp() {
    if (--rf === 0 && Il !== null) {
      Yr !== null && (Yr.status = "fulfilled");
      var t = Il;
      Il = null, $r = 0, Yr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function Lw(t, n) {
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
  var bp = R.S;
  R.S = function(t, n) {
    n0 = Qe(), typeof n == "object" && n !== null && typeof n.then == "function" && jw(t, n), bp !== null && bp(t, n);
  };
  var ir = D(null);
  function lf() {
    var t = ir.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function bs(t, n) {
    n === null ? Q(ir, ir.current) : Q(ir, n.pool);
  }
  function xp() {
    var t = lf();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Ir = Error(l(460)), of = Error(l(474)), xs = Error(l(542)), Ss = { then: function() {
  } };
  function Sp(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function wp(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then($a, $a), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, _p(t), t;
      default:
        if (typeof n.status == "string") n.then($a, $a);
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
            throw t = n.reason, _p(t), t;
        }
        throw lr = n, Ir;
    }
  }
  function rr(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (lr = i, Ir) : i;
    }
  }
  var lr = null;
  function Ep() {
    if (lr === null) throw Error(l(459));
    var t = lr;
    return lr = null, t;
  }
  function _p(t) {
    if (t === Ir || t === xs)
      throw Error(l(483));
  }
  var Gr = null, Gl = 0;
  function ws(t) {
    var n = Gl;
    return Gl += 1, Gr === null && (Gr = []), wp(Gr, t, n);
  }
  function Xl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Es(t, n) {
    throw n.$$typeof === v ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function Np(t) {
    function n(J, X) {
      if (t) {
        var ne = J.deletions;
        ne === null ? (J.deletions = [X], J.flags |= 16) : ne.push(X);
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
      return J = Ia(J, X), J.index = 0, J.sibling = null, J;
    }
    function h(J, X, ne) {
      return J.index = ne, t ? (ne = J.alternate, ne !== null ? (ne = ne.index, ne < X ? (J.flags |= 67108866, X) : ne) : (J.flags |= 67108866, X)) : (J.flags |= 1048576, X);
    }
    function S(J) {
      return t && J.alternate === null && (J.flags |= 67108866), J;
    }
    function M(J, X, ne, ce) {
      return X === null || X.tag !== 6 ? (X = Zc(ne, J.mode, ce), X.return = J, X) : (X = f(X, ne), X.return = J, X);
    }
    function $(J, X, ne, ce) {
      var Oe = ne.type;
      return Oe === N ? ue(
        J,
        X,
        ne.props.children,
        ce,
        ne.key
      ) : X !== null && (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && rr(Oe) === X.type) ? (X = f(X, ne.props), Xl(X, ne), X.return = J, X) : (X = ps(
        ne.type,
        ne.key,
        ne.props,
        null,
        J.mode,
        ce
      ), Xl(X, ne), X.return = J, X);
    }
    function ae(J, X, ne, ce) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ne.containerInfo || X.stateNode.implementation !== ne.implementation ? (X = Qc(ne, J.mode, ce), X.return = J, X) : (X = f(X, ne.children || []), X.return = J, X);
    }
    function ue(J, X, ne, ce, Oe) {
      return X === null || X.tag !== 7 ? (X = er(
        ne,
        J.mode,
        ce,
        Oe
      ), X.return = J, X) : (X = f(X, ne), X.return = J, X);
    }
    function fe(J, X, ne) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = Zc(
          "" + X,
          J.mode,
          ne
        ), X.return = J, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case b:
            return ne = ps(
              X.type,
              X.key,
              X.props,
              null,
              J.mode,
              ne
            ), Xl(ne, X), ne.return = J, ne;
          case w:
            return X = Qc(
              X,
              J.mode,
              ne
            ), X.return = J, X;
          case A:
            return X = rr(X), fe(J, X, ne);
        }
        if (G(X) || K(X))
          return X = er(
            X,
            J.mode,
            ne,
            null
          ), X.return = J, X;
        if (typeof X.then == "function")
          return fe(J, ws(X), ne);
        if (X.$$typeof === E)
          return fe(
            J,
            vs(J, X),
            ne
          );
        Es(J, X);
      }
      return null;
    }
    function ie(J, X, ne, ce) {
      var Oe = X !== null ? X.key : null;
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return Oe !== null ? null : M(J, X, "" + ne, ce);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case b:
            return ne.key === Oe ? $(J, X, ne, ce) : null;
          case w:
            return ne.key === Oe ? ae(J, X, ne, ce) : null;
          case A:
            return ne = rr(ne), ie(J, X, ne, ce);
        }
        if (G(ne) || K(ne))
          return Oe !== null ? null : ue(J, X, ne, ce, null);
        if (typeof ne.then == "function")
          return ie(
            J,
            X,
            ws(ne),
            ce
          );
        if (ne.$$typeof === E)
          return ie(
            J,
            X,
            vs(J, ne),
            ce
          );
        Es(J, ne);
      }
      return null;
    }
    function oe(J, X, ne, ce, Oe) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return J = J.get(ne) || null, M(X, J, "" + ce, Oe);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case b:
            return J = J.get(
              ce.key === null ? ne : ce.key
            ) || null, $(X, J, ce, Oe);
          case w:
            return J = J.get(
              ce.key === null ? ne : ce.key
            ) || null, ae(X, J, ce, Oe);
          case A:
            return ce = rr(ce), oe(
              J,
              X,
              ne,
              ce,
              Oe
            );
        }
        if (G(ce) || K(ce))
          return J = J.get(ne) || null, ue(X, J, ce, Oe, null);
        if (typeof ce.then == "function")
          return oe(
            J,
            X,
            ne,
            ws(ce),
            Oe
          );
        if (ce.$$typeof === E)
          return oe(
            J,
            X,
            ne,
            vs(X, ce),
            Oe
          );
        Es(X, ce);
      }
      return null;
    }
    function _e(J, X, ne, ce) {
      for (var Oe = null, ut = null, Ne = X, Ie = X = 0, tt = null; Ne !== null && Ie < ne.length; Ie++) {
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
        t && Ne && ct.alternate === null && n(J, Ne), X = h(ct, X, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ne = tt;
      }
      if (Ie === ne.length)
        return i(J, Ne), it && Ga(J, Ie), Oe;
      if (Ne === null) {
        for (; Ie < ne.length; Ie++)
          Ne = fe(J, ne[Ie], ce), Ne !== null && (X = h(
            Ne,
            X,
            Ie
          ), ut === null ? Oe = Ne : ut.sibling = Ne, ut = Ne);
        return it && Ga(J, Ie), Oe;
      }
      for (Ne = o(Ne); Ie < ne.length; Ie++)
        tt = oe(
          Ne,
          J,
          Ie,
          ne[Ie],
          ce
        ), tt !== null && (t && tt.alternate !== null && Ne.delete(
          tt.key === null ? Ie : tt.key
        ), X = h(
          tt,
          X,
          Ie
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return t && Ne.forEach(function(qi) {
        return n(J, qi);
      }), it && Ga(J, Ie), Oe;
    }
    function Le(J, X, ne, ce) {
      if (ne == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ne = X, Ie = X = 0, tt = null, ct = ne.next(); Ne !== null && !ct.done; Ie++, ct = ne.next()) {
        Ne.index > Ie ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var qi = ie(J, Ne, ct.value, ce);
        if (qi === null) {
          Ne === null && (Ne = tt);
          break;
        }
        t && Ne && qi.alternate === null && n(J, Ne), X = h(qi, X, Ie), ut === null ? Oe = qi : ut.sibling = qi, ut = qi, Ne = tt;
      }
      if (ct.done)
        return i(J, Ne), it && Ga(J, Ie), Oe;
      if (Ne === null) {
        for (; !ct.done; Ie++, ct = ne.next())
          ct = fe(J, ct.value, ce), ct !== null && (X = h(ct, X, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Ga(J, Ie), Oe;
      }
      for (Ne = o(Ne); !ct.done; Ie++, ct = ne.next())
        ct = oe(Ne, J, Ie, ct.value, ce), ct !== null && (t && ct.alternate !== null && Ne.delete(ct.key === null ? Ie : ct.key), X = h(ct, X, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return t && Ne.forEach(function(XE) {
        return n(J, XE);
      }), it && Ga(J, Ie), Oe;
    }
    function Nt(J, X, ne, ce) {
      if (typeof ne == "object" && ne !== null && ne.type === N && ne.key === null && (ne = ne.props.children), typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case b:
            e: {
              for (var Oe = ne.key; X !== null; ) {
                if (X.key === Oe) {
                  if (Oe = ne.type, Oe === N) {
                    if (X.tag === 7) {
                      i(
                        J,
                        X.sibling
                      ), ce = f(
                        X,
                        ne.props.children
                      ), ce.return = J, J = ce;
                      break e;
                    }
                  } else if (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && rr(Oe) === X.type) {
                    i(
                      J,
                      X.sibling
                    ), ce = f(X, ne.props), Xl(ce, ne), ce.return = J, J = ce;
                    break e;
                  }
                  i(J, X);
                  break;
                } else n(J, X);
                X = X.sibling;
              }
              ne.type === N ? (ce = er(
                ne.props.children,
                J.mode,
                ce,
                ne.key
              ), ce.return = J, J = ce) : (ce = ps(
                ne.type,
                ne.key,
                ne.props,
                null,
                J.mode,
                ce
              ), Xl(ce, ne), ce.return = J, J = ce);
            }
            return S(J);
          case w:
            e: {
              for (Oe = ne.key; X !== null; ) {
                if (X.key === Oe)
                  if (X.tag === 4 && X.stateNode.containerInfo === ne.containerInfo && X.stateNode.implementation === ne.implementation) {
                    i(
                      J,
                      X.sibling
                    ), ce = f(X, ne.children || []), ce.return = J, J = ce;
                    break e;
                  } else {
                    i(J, X);
                    break;
                  }
                else n(J, X);
                X = X.sibling;
              }
              ce = Qc(ne, J.mode, ce), ce.return = J, J = ce;
            }
            return S(J);
          case A:
            return ne = rr(ne), Nt(
              J,
              X,
              ne,
              ce
            );
        }
        if (G(ne))
          return _e(
            J,
            X,
            ne,
            ce
          );
        if (K(ne)) {
          if (Oe = K(ne), typeof Oe != "function") throw Error(l(150));
          return ne = Oe.call(ne), Le(
            J,
            X,
            ne,
            ce
          );
        }
        if (typeof ne.then == "function")
          return Nt(
            J,
            X,
            ws(ne),
            ce
          );
        if (ne.$$typeof === E)
          return Nt(
            J,
            X,
            vs(J, ne),
            ce
          );
        Es(J, ne);
      }
      return typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint" ? (ne = "" + ne, X !== null && X.tag === 6 ? (i(J, X.sibling), ce = f(X, ne), ce.return = J, J = ce) : (i(J, X), ce = Zc(ne, J.mode, ce), ce.return = J, J = ce), S(J)) : i(J, X);
    }
    return function(J, X, ne, ce) {
      try {
        Gl = 0;
        var Oe = Nt(
          J,
          X,
          ne,
          ce
        );
        return Gr = null, Oe;
      } catch (Ne) {
        if (Ne === Ir || Ne === xs) throw Ne;
        var ut = jn(29, Ne, null, J.mode);
        return ut.lanes = ce, ut.return = J, ut;
      } finally {
      }
    };
  }
  var or = Np(!0), Cp = Np(!1), _i = !1;
  function sf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function uf(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ni(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ci(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = ms(t), up(t, null, i), n;
    }
    return hs(t, o, n, i), ms(t);
  }
  function Fl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Wt(t, i);
    }
  }
  function cf(t, n) {
    var i = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var f = null, h = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var S = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = S : h = h.next = S, i = i.next;
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
  var ff = !1;
  function Zl() {
    if (ff) {
      var t = Yr;
      if (t !== null) throw t;
    }
  }
  function Ql(t, n, i, o) {
    ff = !1;
    var f = t.updateQueue;
    _i = !1;
    var h = f.firstBaseUpdate, S = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var $ = M, ae = $.next;
      $.next = null, S === null ? h = ae : S.next = ae, S = $;
      var ue = t.alternate;
      ue !== null && (ue = ue.updateQueue, M = ue.lastBaseUpdate, M !== S && (M === null ? ue.firstBaseUpdate = ae : M.next = ae, ue.lastBaseUpdate = $));
    }
    if (h !== null) {
      var fe = f.baseState;
      S = 0, ue = ae = $ = null, M = h;
      do {
        var ie = M.lane & -536870913, oe = ie !== M.lane;
        if (oe ? (et & ie) === ie : (o & ie) === ie) {
          ie !== 0 && ie === $r && (ff = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = t, Le = M;
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
                fe = g({}, fe, ie);
                break e;
              case 2:
                _i = !0;
            }
          }
          ie = M.callback, ie !== null && (t.flags |= 64, oe && (t.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [ie] : oe.push(ie));
        } else
          oe = {
            lane: ie,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, ue === null ? (ae = ue = oe, $ = fe) : ue = ue.next = oe, S |= ie;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          oe = M, M = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && ($ = fe), f.baseState = $, f.firstBaseUpdate = ae, f.lastBaseUpdate = ue, h === null && (f.shared.lanes = 0), Ai |= S, t.lanes = S, t.memoizedState = fe;
    }
  }
  function Rp(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function Tp(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        Rp(i[t], n);
  }
  var Xr = D(null), _s = D(0);
  function Mp(t, n) {
    t = ni, Q(_s, t), Q(Xr, n), ni = t | n.baseLanes;
  }
  function df() {
    Q(_s, ni), Q(Xr, Xr.current);
  }
  function hf() {
    ni = _s.current, q(Xr), q(_s);
  }
  var Ln = D(null), Wn = null;
  function Ri(t) {
    var n = t.alternate;
    Q(qt, qt.current & 1), Q(Ln, t), Wn === null && (n === null || Xr.current !== null || n.memoizedState !== null) && (Wn = t);
  }
  function mf(t) {
    Q(qt, qt.current), Q(Ln, t), Wn === null && (Wn = t);
  }
  function Dp(t) {
    t.tag === 22 ? (Q(qt, qt.current), Q(Ln, t), Wn === null && (Wn = t)) : Ti();
  }
  function Ti() {
    Q(qt, qt.current), Q(Ln, Ln.current);
  }
  function Hn(t) {
    q(Ln), Wn === t && (Wn = null), q(qt);
  }
  var qt = D(0);
  function Ns(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || xd(i) || Sd(i)))
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
  var Za = 0, qe = null, Et = null, Xt = null, Cs = !1, Fr = !1, sr = !1, Rs = 0, Pl = 0, Zr = null, Hw = 0;
  function Bt() {
    throw Error(l(321));
  }
  function pf(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!On(t[i], n[i])) return !1;
    return !0;
  }
  function gf(t, n, i, o, f, h) {
    return Za = h, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, R.H = t === null || t.memoizedState === null ? hg : Af, sr = !1, h = i(o, f), sr = !1, Fr && (h = zp(
      n,
      i,
      o,
      f
    )), Ap(t), h;
  }
  function Ap(t) {
    R.H = Wl;
    var n = Et !== null && Et.next !== null;
    if (Za = 0, Xt = Et = qe = null, Cs = !1, Pl = 0, Zr = null, n) throw Error(l(300));
    t === null || Ft || (t = t.dependencies, t !== null && ys(t) && (Ft = !0));
  }
  function zp(t, n, i, o) {
    qe = t;
    var f = 0;
    do {
      if (Fr && (Zr = null), Pl = 0, Fr = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Xt = Et = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      R.H = mg, h = n(i, o);
    } while (Fr);
    return h;
  }
  function Bw() {
    var t = R.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Kl(n) : n, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (qe.flags |= 1024), n;
  }
  function yf() {
    var t = Rs !== 0;
    return Rs = 0, t;
  }
  function vf(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function bf(t) {
    if (Cs) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Cs = !1;
    }
    Za = 0, Xt = Et = qe = null, Fr = !1, Pl = Rs = 0, Zr = null;
  }
  function gn() {
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
    if (Et === null) {
      var t = qe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Et.next;
    var n = Xt === null ? qe.memoizedState : Xt.next;
    if (n !== null)
      Xt = n, Et = t;
    else {
      if (t === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      Et = t, t = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t;
    }
    return Xt;
  }
  function Ts() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Kl(t) {
    var n = Pl;
    return Pl += 1, Zr === null && (Zr = []), t = wp(Zr, t, n), n = qe, (Xt === null ? n.memoizedState : Xt.next) === null && (n = n.alternate, R.H = n === null || n.memoizedState === null ? hg : Af), t;
  }
  function Ms(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Kl(t);
      if (t.$$typeof === E) return ln(t);
    }
    throw Error(l(438, String(t)));
  }
  function xf(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = Ts(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = le;
    return n.index++, i;
  }
  function Qa(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Ds(t) {
    var n = $t();
    return Sf(n, Et, t);
  }
  function Sf(t, n, i) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = i;
    var f = t.baseQueue, h = o.pending;
    if (h !== null) {
      if (f !== null) {
        var S = f.next;
        f.next = h.next, h.next = S;
      }
      n.baseQueue = f = h, o.pending = null;
    }
    if (h = t.baseState, f === null) t.memoizedState = h;
    else {
      n = f.next;
      var M = S = null, $ = null, ae = n, ue = !1;
      do {
        var fe = ae.lane & -536870913;
        if (fe !== ae.lane ? (et & fe) === fe : (Za & fe) === fe) {
          var ie = ae.revertLane;
          if (ie === 0)
            $ !== null && ($ = $.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }), fe === $r && (ue = !0);
          else if ((Za & ie) === ie) {
            ae = ae.next, ie === $r && (ue = !0);
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
            }, $ === null ? (M = $ = fe, S = h) : $ = $.next = fe, qe.lanes |= ie, Ai |= ie;
          fe = ae.action, sr && i(h, fe), h = ae.hasEagerState ? ae.eagerState : i(h, fe);
        } else
          ie = {
            lane: fe,
            revertLane: ae.revertLane,
            gesture: ae.gesture,
            action: ae.action,
            hasEagerState: ae.hasEagerState,
            eagerState: ae.eagerState,
            next: null
          }, $ === null ? (M = $ = ie, S = h) : $ = $.next = ie, qe.lanes |= fe, Ai |= fe;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if ($ === null ? S = h : $.next = M, !On(h, t.memoizedState) && (Ft = !0, ue && (i = Yr, i !== null)))
        throw i;
      t.memoizedState = h, t.baseState = S, t.baseQueue = $, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function wf(t) {
    var n = $t(), i = n.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, f = i.pending, h = n.memoizedState;
    if (f !== null) {
      i.pending = null;
      var S = f = f.next;
      do
        h = t(h, S.action), S = S.next;
      while (S !== f);
      On(h, n.memoizedState) || (Ft = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), i.lastRenderedState = h;
    }
    return [h, o];
  }
  function Op(t, n, i) {
    var o = qe, f = $t(), h = it;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var S = !On(
      (Et || f).memoizedState,
      i
    );
    if (S && (f.memoizedState = i, Ft = !0), f = f.queue, Nf(Hp.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || S || Xt !== null && Xt.memoizedState.tag & 1) {
      if (o.flags |= 2048, Qr(
        9,
        { destroy: void 0 },
        Lp.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (Za & 127) !== 0 || jp(o, n, i);
    }
    return i;
  }
  function jp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = Ts(), qe.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function Lp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, Bp(n) && kp(t);
  }
  function Hp(t, n, i) {
    return i(function() {
      Bp(n) && kp(t);
    });
  }
  function Bp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !On(t, i);
    } catch {
      return !0;
    }
  }
  function kp(t) {
    var n = Wi(t, 2);
    n !== null && Rn(n, t, 2);
  }
  function Ef(t) {
    var n = gn();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), sr) {
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
      lastRenderedReducer: Qa,
      lastRenderedState: t
    }, n;
  }
  function Up(t, n, i, o) {
    return t.baseState = i, Sf(
      t,
      Et,
      typeof o == "function" ? o : Qa
    );
  }
  function kw(t, n, i, o, f) {
    if (Os(t)) throw Error(l(485));
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
        then: function(S) {
          h.listeners.push(S);
        }
      };
      R.T !== null ? i(!0) : h.isTransition = !1, o(h), i = n.pending, i === null ? (h.next = n.pending = h, Vp(n, h)) : (h.next = i.next, n.pending = i.next = h);
    }
  }
  function Vp(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = R.T, S = {};
      R.T = S;
      try {
        var M = i(f, o), $ = R.S;
        $ !== null && $(S, M), qp(t, n, M);
      } catch (ae) {
        _f(t, n, ae);
      } finally {
        h !== null && S.types !== null && (h.types = S.types), R.T = h;
      }
    } else
      try {
        h = i(f, o), qp(t, n, h);
      } catch (ae) {
        _f(t, n, ae);
      }
  }
  function qp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        $p(t, n, o);
      },
      function(o) {
        return _f(t, n, o);
      }
    ) : $p(t, n, i);
  }
  function $p(t, n, i) {
    n.status = "fulfilled", n.value = i, Yp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, Vp(t, i)));
  }
  function _f(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Yp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Yp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Ip(t, n) {
    return n;
  }
  function Gp(t, n) {
    if (it) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, h = Jn; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = ea(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Tt = ea(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            wi(o);
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
      lastRenderedReducer: Ip,
      lastRenderedState: n
    }, i.queue = o, i = cg.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = Ef(!1), h = Df.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = gn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = kw.bind(
      null,
      qe,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function Xp(t) {
    var n = $t();
    return Fp(n, Et, t);
  }
  function Fp(t, n, i) {
    if (n = Sf(
      t,
      n,
      Ip
    )[0], t = Ds(Qa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Kl(n);
      } catch (S) {
        throw S === Ir ? xs : S;
      }
    else o = n;
    n = $t();
    var f = n.queue, h = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, Qr(
      9,
      { destroy: void 0 },
      Uw.bind(null, f, i),
      null
    )), [o, h, t];
  }
  function Uw(t, n) {
    t.action = n;
  }
  function Zp(t) {
    var n = $t(), i = Et;
    if (i !== null)
      return Fp(n, i, t);
    $t(), n = n.memoizedState, i = $t();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Qr(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = Ts(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Qp() {
    return $t().memoizedState;
  }
  function As(t, n, i, o) {
    var f = gn();
    qe.flags |= t, f.memoizedState = Qr(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function zs(t, n, i, o) {
    var f = $t();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    Et !== null && o !== null && pf(o, Et.memoizedState.deps) ? f.memoizedState = Qr(n, h, i, o) : (qe.flags |= t, f.memoizedState = Qr(
      1 | n,
      h,
      i,
      o
    ));
  }
  function Pp(t, n) {
    As(8390656, 8, t, n);
  }
  function Nf(t, n) {
    zs(2048, 8, t, n);
  }
  function Vw(t) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = Ts(), qe.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Kp(t) {
    var n = $t().memoizedState;
    return Vw({ ref: n, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Jp(t, n) {
    return zs(4, 2, t, n);
  }
  function Wp(t, n) {
    return zs(4, 4, t, n);
  }
  function eg(t, n) {
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
  function tg(t, n, i) {
    i = i != null ? i.concat([t]) : null, zs(4, 4, eg.bind(null, n, t), i);
  }
  function Cf() {
  }
  function ng(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && pf(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function ag(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && pf(n, o[1]))
      return o[0];
    if (o = t(), sr) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function Rf(t, n, i) {
    return i === void 0 || (Za & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = i0(), qe.lanes |= t, Ai |= t, i);
  }
  function ig(t, n, i, o) {
    return On(i, n) ? i : Xr.current !== null ? (t = Rf(t, i, o), On(t, n) || (Ft = !0), t) : (Za & 42) === 0 || (Za & 1073741824) !== 0 && (et & 261930) === 0 ? (Ft = !0, t.memoizedState = i) : (t = i0(), qe.lanes |= t, Ai |= t, n);
  }
  function rg(t, n, i, o, f) {
    var h = L.p;
    L.p = h !== 0 && 8 > h ? h : 8;
    var S = R.T, M = {};
    R.T = M, Df(t, !1, n, i);
    try {
      var $ = f(), ae = R.S;
      if (ae !== null && ae(M, $), $ !== null && typeof $ == "object" && typeof $.then == "function") {
        var ue = Lw(
          $,
          o
        );
        Jl(
          t,
          n,
          ue,
          Un(t)
        );
      } else
        Jl(
          t,
          n,
          o,
          Un(t)
        );
    } catch (fe) {
      Jl(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Un()
      );
    } finally {
      L.p = h, S !== null && M.types !== null && (S.types = M.types), R.T = S;
    }
  }
  function qw() {
  }
  function Tf(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = lg(t).queue;
    rg(
      t,
      f,
      n,
      F,
      i === null ? qw : function() {
        return og(t), i(o);
      }
    );
  }
  function lg(t) {
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
        lastRenderedReducer: Qa,
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
        lastRenderedReducer: Qa,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function og(t) {
    var n = lg(t);
    n.next === null && (n = t.alternate.memoizedState), Jl(
      t,
      n.next.queue,
      {},
      Un()
    );
  }
  function Mf() {
    return ln(go);
  }
  function sg() {
    return $t().memoizedState;
  }
  function ug() {
    return $t().memoizedState;
  }
  function $w(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Un();
          t = Ni(i);
          var o = Ci(n, t, i);
          o !== null && (Rn(o, n, i), Fl(o, n, i)), n = { cache: af() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Yw(t, n, i) {
    var o = Un();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Os(t) ? fg(n, i) : (i = Xc(t, n, i, o), i !== null && (Rn(i, t, o), dg(i, n, o)));
  }
  function cg(t, n, i) {
    var o = Un();
    Jl(t, n, i, o);
  }
  function Jl(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Os(t)) fg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var S = n.lastRenderedState, M = h(S, i);
          if (f.hasEagerState = !0, f.eagerState = M, On(M, S))
            return hs(t, n, f, 0), Rt === null && ds(), !1;
        } catch {
        } finally {
        }
      if (i = Xc(t, n, f, o), i !== null)
        return Rn(i, t, o), dg(i, n, o), !0;
    }
    return !1;
  }
  function Df(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: sd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Os(t)) {
      if (n) throw Error(l(479));
    } else
      n = Xc(
        t,
        i,
        o,
        2
      ), n !== null && Rn(n, t, 2);
  }
  function Os(t) {
    var n = t.alternate;
    return t === qe || n !== null && n === qe;
  }
  function fg(t, n) {
    Fr = Cs = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function dg(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Wt(t, i);
    }
  }
  var Wl = {
    readContext: ln,
    use: Ms,
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
  Wl.useEffectEvent = Bt;
  var hg = {
    readContext: ln,
    use: Ms,
    useCallback: function(t, n) {
      return gn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: ln,
    useEffect: Pp,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, As(
        4194308,
        4,
        eg.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return As(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      As(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = gn();
      n = n === void 0 ? null : n;
      var o = t();
      if (sr) {
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
      var o = gn();
      if (i !== void 0) {
        var f = i(n);
        if (sr) {
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
      }, o.queue = t, t = t.dispatch = Yw.bind(
        null,
        qe,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = gn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Ef(t);
      var n = t.queue, i = cg.bind(null, qe, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Cf,
    useDeferredValue: function(t, n) {
      var i = gn();
      return Rf(i, t, n);
    },
    useTransition: function() {
      var t = Ef(!1);
      return t = rg.bind(
        null,
        qe,
        t.queue,
        !0,
        !1
      ), gn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = qe, f = gn();
      if (it) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = n(), Rt === null)
          throw Error(l(349));
        (et & 127) !== 0 || jp(o, n, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: n };
      return f.queue = h, Pp(Hp.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, Qr(
        9,
        { destroy: void 0 },
        Lp.bind(
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
      var t = gn(), n = Rt.identifierPrefix;
      if (it) {
        var i = Ca, o = Na;
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Rs++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = Hw++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Mf,
    useFormState: Gp,
    useActionState: Gp,
    useOptimistic: function(t) {
      var n = gn();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = Df.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: xf,
    useCacheRefresh: function() {
      return gn().memoizedState = $w.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(t) {
      var n = gn(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((ht & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Af = {
    readContext: ln,
    use: Ms,
    useCallback: ng,
    useContext: ln,
    useEffect: Nf,
    useImperativeHandle: tg,
    useInsertionEffect: Jp,
    useLayoutEffect: Wp,
    useMemo: ag,
    useReducer: Ds,
    useRef: Qp,
    useState: function() {
      return Ds(Qa);
    },
    useDebugValue: Cf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return ig(
        i,
        Et.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Ds(Qa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : Kl(t),
        n
      ];
    },
    useSyncExternalStore: Op,
    useId: sg,
    useHostTransitionStatus: Mf,
    useFormState: Xp,
    useActionState: Xp,
    useOptimistic: function(t, n) {
      var i = $t();
      return Up(i, Et, t, n);
    },
    useMemoCache: xf,
    useCacheRefresh: ug
  };
  Af.useEffectEvent = Kp;
  var mg = {
    readContext: ln,
    use: Ms,
    useCallback: ng,
    useContext: ln,
    useEffect: Nf,
    useImperativeHandle: tg,
    useInsertionEffect: Jp,
    useLayoutEffect: Wp,
    useMemo: ag,
    useReducer: wf,
    useRef: Qp,
    useState: function() {
      return wf(Qa);
    },
    useDebugValue: Cf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return Et === null ? Rf(i, t, n) : ig(
        i,
        Et.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = wf(Qa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : Kl(t),
        n
      ];
    },
    useSyncExternalStore: Op,
    useId: sg,
    useHostTransitionStatus: Mf,
    useFormState: Zp,
    useActionState: Zp,
    useOptimistic: function(t, n) {
      var i = $t();
      return Et !== null ? Up(i, Et, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: xf,
    useCacheRefresh: ug
  };
  mg.useEffectEvent = Kp;
  function zf(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var Of = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Un(), f = Ni(o);
      f.payload = n, i != null && (f.callback = i), n = Ci(t, f, o), n !== null && (Rn(n, t, o), Fl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Un(), f = Ni(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Ci(t, f, o), n !== null && (Rn(n, t, o), Fl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Un(), o = Ni(i);
      o.tag = 2, n != null && (o.callback = n), n = Ci(t, o, i), n !== null && (Rn(n, t, i), Fl(n, t, i));
    }
  };
  function pg(t, n, i, o, f, h, S) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, S) : n.prototype && n.prototype.isPureReactComponent ? !Ul(i, o) || !Ul(f, h) : !0;
  }
  function gg(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && Of.enqueueReplaceState(n, n.state, null);
  }
  function ur(t, n) {
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
  function yg(t) {
    fs(t);
  }
  function vg(t) {
    console.error(t);
  }
  function bg(t) {
    fs(t);
  }
  function js(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function xg(t, n, i) {
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
  function jf(t, n, i) {
    return i = Ni(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      js(t, n);
    }, i;
  }
  function Sg(t) {
    return t = Ni(t), t.tag = 3, t;
  }
  function wg(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        xg(n, i, o);
      };
    }
    var S = i.stateNode;
    S !== null && typeof S.componentDidCatch == "function" && (t.callback = function() {
      xg(n, i, o), typeof f != "function" && (zi === null ? zi = /* @__PURE__ */ new Set([this]) : zi.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function Iw(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && qr(
        n,
        i,
        f,
        !0
      ), i = Ln.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Wn === null ? Xs() : i.alternate === null && kt === 0 && (kt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === Ss ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), rd(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === Ss ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), rd(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return rd(t, o, f), Xs(), !1;
    }
    if (it)
      return n = Ln.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== Jc && (t = Error(l(422), { cause: o }), $l(Qn(t, i)))) : (o !== Jc && (n = Error(l(423), {
        cause: o
      }), $l(
        Qn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Qn(o, i), f = jf(
        t.stateNode,
        o,
        f
      ), cf(t, f), kt !== 4 && (kt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Qn(h, i), oo === null ? oo = [h] : oo.push(h), kt !== 4 && (kt = 2), n === null) return !0;
    o = Qn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = jf(i.stateNode, o, t), cf(i, t), !1;
        case 1:
          if (n = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (zi === null || !zi.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = Sg(f), wg(
              f,
              t,
              i,
              o
            ), cf(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Lf = Error(l(461)), Ft = !1;
  function on(t, n, i, o) {
    n.child = t === null ? Cp(n, null, i, o) : or(
      n,
      t.child,
      i,
      o
    );
  }
  function Eg(t, n, i, o, f) {
    i = i.render;
    var h = n.ref;
    if ("ref" in o) {
      var S = {};
      for (var M in o)
        M !== "ref" && (S[M] = o[M]);
    } else S = o;
    return ar(n), o = gf(
      t,
      n,
      i,
      S,
      h,
      f
    ), M = yf(), t !== null && !Ft ? (vf(t, n, f), Pa(t, n, f)) : (it && M && Pc(n), n.flags |= 1, on(t, n, o, f), n.child);
  }
  function _g(t, n, i, o, f) {
    if (t === null) {
      var h = i.type;
      return typeof h == "function" && !Fc(h) && h.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = h, Ng(
        t,
        n,
        h,
        o,
        f
      )) : (t = ps(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !Yf(t, f)) {
      var S = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Ul, i(S, o) && t.ref === n.ref)
        return Pa(t, n, f);
    }
    return n.flags |= 1, t = Ia(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function Ng(t, n, i, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Ul(h, o) && t.ref === n.ref)
        if (Ft = !1, n.pendingProps = o = h, Yf(t, f))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return n.lanes = t.lanes, Pa(t, n, f);
    }
    return Hf(
      t,
      n,
      i,
      o,
      f
    );
  }
  function Cg(t, n, i, o) {
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
        return Rg(
          t,
          n,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && bs(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Mp(n, h) : df(), Dp(n);
      else
        return o = n.lanes = 536870912, Rg(
          t,
          n,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (bs(n, h.cachePool), Mp(n, h), Ti(), n.memoizedState = null) : (t !== null && bs(n, null), df(), Ti());
    return on(t, n, f, i), n.child;
  }
  function eo(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Rg(t, n, i, o, f) {
    var h = lf();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, t !== null && bs(n, null), df(), Dp(n), t !== null && qr(t, n, o, !0), n.childLanes = f, null;
  }
  function Ls(t, n) {
    return n = Bs(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function Tg(t, n, i) {
    return or(n, t.child, null, i), t = Ls(n, n.pendingProps), t.flags |= 2, Hn(n), n.memoizedState = null, t;
  }
  function Gw(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = Ls(n, o), n.lanes = 536870912, eo(null, t);
        if (mf(n), (t = Tt) ? (t = V0(
          t,
          Jn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: xi !== null ? { id: Na, overflow: Ca } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = fp(t), i.return = n, n.child = i, rn = n, Tt = null)) : t = null, t === null) throw wi(n);
        return n.lanes = 536870912, null;
      }
      return Ls(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var S = h.dehydrated;
      if (mf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = Tg(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ft || qr(t, n, i, !1), f = (i & t.childLanes) !== 0, Ft || f) {
        if (o = Rt, o !== null && (S = U(o, i), S !== 0 && S !== h.retryLane))
          throw h.retryLane = S, Wi(t, S), Rn(o, t, S), Lf;
        Xs(), n = Tg(
          t,
          n,
          i
        );
      } else
        t = h.treeContext, Tt = ea(S.nextSibling), rn = n, it = !0, Si = null, Jn = !1, t !== null && mp(n, t), n = Ls(n, o), n.flags |= 4096;
      return n;
    }
    return t = Ia(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Hs(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Hf(t, n, i, o, f) {
    return ar(n), i = gf(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = yf(), t !== null && !Ft ? (vf(t, n, f), Pa(t, n, f)) : (it && o && Pc(n), n.flags |= 1, on(t, n, i, f), n.child);
  }
  function Mg(t, n, i, o, f, h) {
    return ar(n), n.updateQueue = null, i = zp(
      n,
      o,
      i,
      f
    ), Ap(t), o = yf(), t !== null && !Ft ? (vf(t, n, h), Pa(t, n, h)) : (it && o && Pc(n), n.flags |= 1, on(t, n, i, h), n.child);
  }
  function Dg(t, n, i, o, f) {
    if (ar(n), n.stateNode === null) {
      var h = Br, S = i.contextType;
      typeof S == "object" && S !== null && (h = ln(S)), h = new i(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = Of, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, sf(n), S = i.contextType, h.context = typeof S == "object" && S !== null ? ln(S) : Br, h.state = n.memoizedState, S = i.getDerivedStateFromProps, typeof S == "function" && (zf(
        n,
        i,
        S,
        o
      ), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (S = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), S !== h.state && Of.enqueueReplaceState(h, h.state, null), Ql(n, o, h, f), Zl(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, $ = ur(i, M);
      h.props = $;
      var ae = h.context, ue = i.contextType;
      S = Br, typeof ue == "object" && ue !== null && (S = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || ae !== S) && gg(
        n,
        h,
        o,
        S
      ), _i = !1;
      var ie = n.memoizedState;
      h.state = ie, Ql(n, o, h, f), Zl(), ae = n.memoizedState, M || ie !== ae || _i ? (typeof fe == "function" && (zf(
        n,
        i,
        fe,
        o
      ), ae = n.memoizedState), ($ = _i || pg(
        n,
        i,
        $,
        o,
        ie,
        ae,
        S
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ae), h.props = o, h.state = ae, h.context = S, o = $) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, uf(t, n), S = n.memoizedProps, ue = ur(i, S), h.props = ue, fe = n.pendingProps, ie = h.context, ae = i.contextType, $ = Br, typeof ae == "object" && ae !== null && ($ = ln(ae)), M = i.getDerivedStateFromProps, (ae = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (S !== fe || ie !== $) && gg(
        n,
        h,
        o,
        $
      ), _i = !1, ie = n.memoizedState, h.state = ie, Ql(n, o, h, f), Zl();
      var oe = n.memoizedState;
      S !== fe || ie !== oe || _i || t !== null && t.dependencies !== null && ys(t.dependencies) ? (typeof M == "function" && (zf(
        n,
        i,
        M,
        o
      ), oe = n.memoizedState), (ue = _i || pg(
        n,
        i,
        ue,
        o,
        ie,
        oe,
        $
      ) || t !== null && t.dependencies !== null && ys(t.dependencies)) ? (ae || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, oe, $), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        oe,
        $
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || S === t.memoizedProps && ie === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || S === t.memoizedProps && ie === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), h.props = o, h.state = oe, h.context = $, o = ue) : (typeof h.componentDidUpdate != "function" || S === t.memoizedProps && ie === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || S === t.memoizedProps && ie === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Hs(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = or(
      n,
      t.child,
      null,
      f
    ), n.child = or(
      n,
      null,
      i,
      f
    )) : on(t, n, i, f), n.memoizedState = h.state, t = n.child) : t = Pa(
      t,
      n,
      f
    ), t;
  }
  function Ag(t, n, i, o) {
    return tr(), n.flags |= 256, on(t, n, i, o), n.child;
  }
  var Bf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kf(t) {
    return { baseLanes: t, cachePool: xp() };
  }
  function Uf(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= kn), t;
  }
  function zg(t, n, i) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, S;
    if ((S = h) || (S = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0), S && (f = !0, n.flags &= -129), S = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Ri(n) : Ti(), (t = Tt) ? (t = V0(
          t,
          Jn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: xi !== null ? { id: Na, overflow: Ca } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = fp(t), i.return = n, n.child = i, rn = n, Tt = null)) : t = null, t === null) throw wi(n);
        return Sd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (Ti(), f = n.mode, M = Bs(
        { mode: "hidden", children: M },
        f
      ), o = er(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = kf(i), o.childLanes = Uf(
        t,
        S,
        i
      ), n.memoizedState = Bf, eo(null, o)) : (Ri(n), Vf(n, M));
    }
    var $ = t.memoizedState;
    if ($ !== null && (M = $.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Ri(n), n.flags &= -257, n = qf(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (Ti(), n.child = t.child, n.flags |= 128, n = null) : (Ti(), M = o.fallback, f = n.mode, o = Bs(
          { mode: "visible", children: o.children },
          f
        ), M = er(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, or(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = kf(i), o.childLanes = Uf(
          t,
          S,
          i
        ), n.memoizedState = Bf, n = eo(null, o));
      else if (Ri(n), Sd(M)) {
        if (S = M.nextSibling && M.nextSibling.dataset, S) var ae = S.dgst;
        S = ae, o = Error(l(419)), o.stack = "", o.digest = S, $l({ value: o, source: null, stack: null }), n = qf(
          t,
          n,
          i
        );
      } else if (Ft || qr(t, n, i, !1), S = (i & t.childLanes) !== 0, Ft || S) {
        if (S = Rt, S !== null && (o = U(S, i), o !== 0 && o !== $.retryLane))
          throw $.retryLane = o, Wi(t, o), Rn(S, t, o), Lf;
        xd(M) || Xs(), n = qf(
          t,
          n,
          i
        );
      } else
        xd(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = $.treeContext, Tt = ea(
          M.nextSibling
        ), rn = n, it = !0, Si = null, Jn = !1, t !== null && mp(n, t), n = Vf(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Ti(), M = o.fallback, f = n.mode, $ = t.child, ae = $.sibling, o = Ia($, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = $.subtreeFlags & 65011712, ae !== null ? M = Ia(
      ae,
      M
    ) : (M = er(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, eo(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = kf(i) : (f = M.cachePool, f !== null ? ($ = Gt._currentValue, f = f.parent !== $ ? { parent: $, pool: $ } : f) : f = xp(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = Uf(
      t,
      S,
      i
    ), n.memoizedState = Bf, eo(t.child, o)) : (Ri(n), i = t.child, t = i.sibling, i = Ia(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (S = n.deletions, S === null ? (n.deletions = [t], n.flags |= 16) : S.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function Vf(t, n) {
    return n = Bs(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Bs(t, n) {
    return t = jn(22, t, null, n), t.lanes = 0, t;
  }
  function qf(t, n, i) {
    return or(n, t.child, null, i), t = Vf(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function Og(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), tf(t.return, n, i);
  }
  function $f(t, n, i, o, f, h) {
    var S = t.memoizedState;
    S === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: f,
      treeForkCount: h
    } : (S.isBackwards = n, S.rendering = null, S.renderingStartTime = 0, S.last = o, S.tail = i, S.tailMode = f, S.treeForkCount = h);
  }
  function jg(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var S = qt.current, M = (S & 2) !== 0;
    if (M ? (S = S & 1 | 2, n.flags |= 128) : S &= 1, Q(qt, S), on(t, n, o, i), o = it ? ql : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Og(t, i, n);
        else if (t.tag === 19)
          Og(t, i, n);
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
          t = i.alternate, t !== null && Ns(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), $f(
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
          if (t = f.alternate, t !== null && Ns(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        $f(
          n,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        $f(
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
  function Pa(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), Ai |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (qr(
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
      for (t = n.child, i = Ia(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Ia(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Yf(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ys(t)));
  }
  function Xw(t, n, i) {
    switch (n.tag) {
      case 3:
        ee(n, n.stateNode.containerInfo), Ei(n, Gt, t.memoizedState.cache), tr();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        ee(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ei(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, mf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ri(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? zg(t, n, i) : (Ri(n), t = Pa(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Ri(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (qr(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return jg(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Q(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, Cg(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ei(n, Gt, t.memoizedState.cache);
    }
    return Pa(t, n, i);
  }
  function Lg(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Ft = !0;
      else {
        if (!Yf(t, i) && (n.flags & 128) === 0)
          return Ft = !1, Xw(
            t,
            n,
            i
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, it && (n.flags & 1048576) !== 0 && hp(n, ql, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = rr(n.elementType), n.type = t, typeof t == "function")
            Fc(t) ? (o = ur(t, o), n.tag = 1, n = Dg(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = Hf(
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
                n.tag = 11, n = Eg(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === B) {
                n.tag = 14, n = _g(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              }
            }
            throw n = j(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return Hf(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = ur(
          o,
          n.pendingProps
        ), Dg(
          t,
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
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, uf(t, n), Ql(n, o, null, i);
          var S = n.memoizedState;
          if (o = S.cache, Ei(n, Gt, o), o !== h.cache && nf(
            n,
            [Gt],
            i,
            !0
          ), Zl(), o = S.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: S.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Ag(
                t,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = Qn(
                Error(l(424)),
                n
              ), $l(f), n = Ag(
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
              for (Tt = ea(t.firstChild), rn = n, it = !0, Si = null, Jn = !0, i = Cp(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (tr(), o === f) {
              n = Pa(
                t,
                n,
                i
              );
              break e;
            }
            on(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Hs(t, n), t === null ? (i = X0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, t = n.pendingProps, o = Ws(
          he.current
        ).createElement(i), o[ve] = n, o[Se] = t, sn(o, i, t), at(o), n.stateNode = o) : n.memoizedState = X0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ze(n), t === null && it && (o = n.stateNode = Y0(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Jn = !0, f = Tt, Hi(n.type) ? (wd = f, Tt = ea(o.firstChild)) : Tt = f), on(
          t,
          n,
          n.pendingProps.children,
          i
        ), Hs(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = wE(
          o,
          n.type,
          n.pendingProps,
          Jn
        ), o !== null ? (n.stateNode = o, rn = n, Tt = ea(o.firstChild), Jn = !1, f = !0) : f = !1), f || wi(n)), ze(n), f = n.type, h = n.pendingProps, S = t !== null ? t.memoizedProps : null, o = h.children, yd(f, h) ? o = null : S !== null && yd(f, S) && (n.flags |= 32), n.memoizedState !== null && (f = gf(
          t,
          n,
          Bw,
          null,
          null,
          i
        ), go._currentValue = f), Hs(t, n), on(t, n, o, i), n.child;
      case 6:
        return t === null && it && ((t = i = Tt) && (i = EE(
          i,
          n.pendingProps,
          Jn
        ), i !== null ? (n.stateNode = i, rn = n, Tt = null, t = !0) : t = !1), t || wi(n)), null;
      case 13:
        return zg(t, n, i);
      case 4:
        return ee(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = or(
          n,
          null,
          o,
          i
        ) : on(t, n, o, i), n.child;
      case 11:
        return Eg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return on(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return on(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return on(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, Ei(n, n.type, o.value), on(t, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, ar(n), f = ln(f), o = o(f), n.flags |= 1, on(t, n, o, i), n.child;
      case 14:
        return _g(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Ng(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return jg(t, n, i);
      case 31:
        return Gw(t, n, i);
      case 22:
        return Cg(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return ar(n), o = ln(Gt), t === null ? (f = lf(), f === null && (f = Rt, h = af(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), n.memoizedState = { parent: o, cache: f }, sf(n), Ei(n, Gt, f)) : ((t.lanes & i) !== 0 && (uf(t, n), Ql(n, null, null, i), Zl()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ei(n, Gt, o)) : (o = h.cache, Ei(n, Gt, o), o !== f.cache && nf(
          n,
          [Gt],
          i,
          !0
        ))), on(
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
  function Ka(t) {
    t.flags |= 4;
  }
  function If(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (s0()) t.flags |= 8192;
        else
          throw lr = Ss, of;
    } else t.flags &= -16777217;
  }
  function Hg(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !K0(n))
      if (s0()) t.flags |= 8192;
      else
        throw lr = Ss, of;
  }
  function ks(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, Wr |= n);
  }
  function to(t, n) {
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
  function Fw(t, n, i) {
    var o = n.pendingProps;
    switch (Kc(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Fa(Gt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Vr(n) ? Ka(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Wc())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (Ka(n), h !== null ? (Mt(n), Hg(n, h)) : (Mt(n), If(
          n,
          f,
          null,
          o,
          i
        ))) : h ? h !== t.memoizedState ? (Ka(n), Mt(n), Hg(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Ka(n), Mt(n), If(
          n,
          f,
          t,
          o,
          i
        )), null;
      case 27:
        if (Re(n), i = he.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ka(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = te.current, Vr(n) ? pp(n) : (t = Y0(f, o, i), n.stateNode = t, Ka(n));
        }
        return Mt(n), null;
      case 5:
        if (Re(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ka(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = te.current, Vr(n))
            pp(n);
          else {
            var S = Ws(
              he.current
            );
            switch (h) {
              case 1:
                h = S.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = S.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = S.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = S.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = S.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? S.createElement("select", {
                      is: o.is
                    }) : S.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? S.createElement(f, { is: o.is }) : S.createElement(f);
                }
            }
            h[ve] = n, h[Se] = o;
            e: for (S = n.child; S !== null; ) {
              if (S.tag === 5 || S.tag === 6)
                h.appendChild(S.stateNode);
              else if (S.tag !== 4 && S.tag !== 27 && S.child !== null) {
                S.child.return = S, S = S.child;
                continue;
              }
              if (S === n) break e;
              for (; S.sibling === null; ) {
                if (S.return === null || S.return === n)
                  break e;
                S = S.return;
              }
              S.sibling.return = S.return, S = S.sibling;
            }
            n.stateNode = h;
            e: switch (sn(h, f, o), f) {
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
            o && Ka(n);
          }
        }
        return Mt(n), If(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Ka(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = he.current, Vr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = rn, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[ve] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || z0(t.nodeValue, i)), t || wi(n, !0);
          } else
            t = Ws(t).createTextNode(
              o
            ), t[ve] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Vr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ve] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            i = Wc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Hn(n), n) : (Hn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Vr(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ve] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = Wc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Hn(n), n) : (Hn(n), null);
        }
        return Hn(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), ks(n, n.updateQueue), Mt(n), null);
      case 4:
        return ge(), t === null && dd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Fa(n.type), Mt(n), null;
      case 19:
        if (q(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) to(o, !1);
          else {
            if (kt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = Ns(t), h !== null) {
                  for (n.flags |= 128, to(o, !1), t = h.updateQueue, n.updateQueue = t, ks(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    cp(i, t), i = i.sibling;
                  return Q(
                    qt,
                    qt.current & 1 | 2
                  ), it && Ga(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Qe() > Ys && (n.flags |= 128, f = !0, to(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = Ns(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, ks(n, t), to(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Mt(n), null;
            } else
              2 * Qe() - o.renderingStartTime > Ys && i !== 536870912 && (n.flags |= 128, f = !0, to(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Qe(), t.sibling = null, i = qt.current, Q(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Ga(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return Hn(n), hf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && ks(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && q(ir), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Fa(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function Zw(t, n) {
    switch (Kc(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Fa(Gt), ge(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Re(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Hn(n), n.alternate === null)
            throw Error(l(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Hn(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return q(qt), null;
      case 4:
        return ge(), null;
      case 10:
        return Fa(n.type), null;
      case 22:
      case 23:
        return Hn(n), hf(), t !== null && q(ir), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Fa(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Bg(t, n) {
    switch (Kc(n), n.tag) {
      case 3:
        Fa(Gt), ge();
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
        Fa(n.type);
        break;
      case 22:
      case 23:
        Hn(n), hf(), t !== null && q(ir);
        break;
      case 24:
        Fa(Gt);
    }
  }
  function no(t, n) {
    try {
      var i = n.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        i = f;
        do {
          if ((i.tag & t) === t) {
            o = void 0;
            var h = i.create, S = i.inst;
            o = h(), S.destroy = o;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (M) {
      St(n, n.return, M);
    }
  }
  function Mi(t, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var S = o.inst, M = S.destroy;
            if (M !== void 0) {
              S.destroy = void 0, f = n;
              var $ = i, ae = M;
              try {
                ae();
              } catch (ue) {
                St(
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
      St(n, n.return, ue);
    }
  }
  function kg(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        Tp(n, i);
      } catch (o) {
        St(t, t.return, o);
      }
    }
  }
  function Ug(t, n, i) {
    i.props = ur(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      St(t, n, o);
    }
  }
  function ao(t, n) {
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
      St(t, n, f);
    }
  }
  function Ra(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          St(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          St(t, n, f);
        }
      else i.current = null;
  }
  function Vg(t) {
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
      St(t, t.return, f);
    }
  }
  function Gf(t, n, i) {
    try {
      var o = t.stateNode;
      gE(o, t.type, i, n), o[Se] = n;
    } catch (f) {
      St(t, t.return, f);
    }
  }
  function qg(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Hi(t.type) || t.tag === 4;
  }
  function Xf(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || qg(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Hi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ff(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = $a));
    else if (o !== 4 && (o === 27 && Hi(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (Ff(t, n, i), t = t.sibling; t !== null; )
        Ff(t, n, i), t = t.sibling;
  }
  function Us(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Hi(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (Us(t, n, i), t = t.sibling; t !== null; )
        Us(t, n, i), t = t.sibling;
  }
  function $g(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, o, i), n[ve] = t, n[Se] = i;
    } catch (h) {
      St(t, t.return, h);
    }
  }
  var Ja = !1, Zt = !1, Zf = !1, Yg = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function Qw(t, n) {
    if (t = t.containerInfo, pd = lu, t = tp(t), Vc(t)) {
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
            var S = 0, M = -1, $ = -1, ae = 0, ue = 0, fe = t, ie = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (M = S + f), fe !== h || o !== 0 && fe.nodeType !== 3 || ($ = S + o), fe.nodeType === 3 && (S += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                ie = fe, fe = oe;
              for (; ; ) {
                if (fe === t) break t;
                if (ie === i && ++ae === f && (M = S), ie === h && ++ue === o && ($ = S), (oe = fe.nextSibling) !== null) break;
                fe = ie, ie = fe.parentNode;
              }
              fe = oe;
            }
            i = M === -1 || $ === -1 ? null : { start: M, end: $ };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (gd = { focusedElem: t, selectionRange: i }, lu = !1, en = n; en !== null; )
      if (n = en, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, en = t;
      else
        for (; en !== null; ) {
          switch (n = en, h = n.alternate, t = n.flags, n.tag) {
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
                  var _e = ur(
                    i.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    _e,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Le) {
                  St(
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
                  bd(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      bd(t);
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
            t.return = n.return, en = t;
            break;
          }
          en = n.return;
        }
  }
  function Ig(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ei(t, i), o & 4 && no(5, i);
        break;
      case 1:
        if (ei(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (S) {
              St(i, i.return, S);
            }
          else {
            var f = ur(
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
            } catch (S) {
              St(
                i,
                i.return,
                S
              );
            }
          }
        o & 64 && kg(i), o & 512 && ao(i, i.return);
        break;
      case 3:
        if (ei(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            Tp(t, n);
          } catch (S) {
            St(i, i.return, S);
          }
        }
        break;
      case 27:
        n === null && o & 4 && $g(i);
      case 26:
      case 5:
        ei(t, i), n === null && o & 4 && Vg(i), o & 512 && ao(i, i.return);
        break;
      case 12:
        ei(t, i);
        break;
      case 31:
        ei(t, i), o & 4 && Fg(t, i);
        break;
      case 13:
        ei(t, i), o & 4 && Zg(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = iE.bind(
          null,
          i
        ), _E(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Ja, !o) {
          n = n !== null && n.memoizedState !== null || Zt, f = Ja;
          var h = Zt;
          Ja = o, (Zt = n) && !h ? ti(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ei(t, i), Ja = f, Zt = h;
        }
        break;
      case 30:
        break;
      default:
        ei(t, i);
    }
  }
  function Gg(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, Gg(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && rt(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, En = !1;
  function Wa(t, n, i) {
    for (i = i.child; i !== null; )
      Xg(t, n, i), i = i.sibling;
  }
  function Xg(t, n, i) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(tn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Zt || Ra(i, n), Wa(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Zt || Ra(i, n);
        var o = Dt, f = En;
        Hi(i.type) && (Dt = i.stateNode, En = !1), Wa(
          t,
          n,
          i
        ), ho(i.stateNode), Dt = o, En = f;
        break;
      case 5:
        Zt || Ra(i, n);
      case 6:
        if (o = Dt, f = En, Dt = null, Wa(
          t,
          n,
          i
        ), Dt = o, En = f, Dt !== null)
          if (En)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(i.stateNode);
            } catch (h) {
              St(
                i,
                n,
                h
              );
            }
          else
            try {
              Dt.removeChild(i.stateNode);
            } catch (h) {
              St(
                i,
                n,
                h
              );
            }
        break;
      case 18:
        Dt !== null && (En ? (t = Dt, k0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), ol(t)) : k0(Dt, i.stateNode));
        break;
      case 4:
        o = Dt, f = En, Dt = i.stateNode.containerInfo, En = !0, Wa(
          t,
          n,
          i
        ), Dt = o, En = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Mi(2, i, n), Zt || Mi(4, i, n), Wa(
          t,
          n,
          i
        );
        break;
      case 1:
        Zt || (Ra(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && Ug(
          i,
          n,
          o
        )), Wa(
          t,
          n,
          i
        );
        break;
      case 21:
        Wa(
          t,
          n,
          i
        );
        break;
      case 22:
        Zt = (o = Zt) || i.memoizedState !== null, Wa(
          t,
          n,
          i
        ), Zt = o;
        break;
      default:
        Wa(
          t,
          n,
          i
        );
    }
  }
  function Fg(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ol(t);
      } catch (i) {
        St(n, n.return, i);
      }
    }
  }
  function Zg(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ol(t);
      } catch (i) {
        St(n, n.return, i);
      }
  }
  function Pw(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new Yg()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new Yg()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Vs(t, n) {
    var i = Pw(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = rE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function _n(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], h = t, S = n, M = S;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Hi(M.type)) {
                Dt = M.stateNode, En = !1;
                break e;
              }
              break;
            case 5:
              Dt = M.stateNode, En = !1;
              break e;
            case 3:
            case 4:
              Dt = M.stateNode.containerInfo, En = !0;
              break e;
          }
          M = M.return;
        }
        if (Dt === null) throw Error(l(160));
        Xg(h, S, f), Dt = null, En = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Qg(n, t), n = n.sibling;
  }
  var ha = null;
  function Qg(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _n(n, t), Nn(t), o & 4 && (Mi(3, t, t.return), no(3, t), Mi(5, t, t.return));
        break;
      case 1:
        _n(n, t), Nn(t), o & 512 && (Zt || i === null || Ra(i, i.return)), o & 64 && Ja && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = ha;
        if (_n(n, t), Nn(t), o & 512 && (Zt || i === null || Ra(i, i.return)), o & 4) {
          var h = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, i = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Ge] || h[ve] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), sn(h, o, i), h[ve] = t, at(h), o = h;
                      break e;
                    case "link":
                      var S = Q0(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (S) {
                        for (var M = 0; M < S.length; M++)
                          if (h = S[M], h.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && h.getAttribute("rel") === (i.rel == null ? null : i.rel) && h.getAttribute("title") === (i.title == null ? null : i.title) && h.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            S.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), sn(h, o, i), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (S = Q0(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (M = 0; M < S.length; M++)
                          if (h = S[M], h.getAttribute("content") === (i.content == null ? null : "" + i.content) && h.getAttribute("name") === (i.name == null ? null : i.name) && h.getAttribute("property") === (i.property == null ? null : i.property) && h.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && h.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            S.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), sn(h, o, i), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[ve] = t, at(h), o = h;
                }
                t.stateNode = o;
              } else
                P0(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Z0(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? P0(
              f,
              t.type,
              t.stateNode
            ) : Z0(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && Gf(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        _n(n, t), Nn(t), o & 512 && (Zt || i === null || Ra(i, i.return)), i !== null && o & 4 && Gf(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (_n(n, t), Nn(t), o & 512 && (Zt || i === null || Ra(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Dr(f, "");
          } catch (_e) {
            St(t, t.return, _e);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, Gf(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (Zf = !0);
        break;
      case 6:
        if (_n(n, t), Nn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (_e) {
            St(t, t.return, _e);
          }
        }
        break;
      case 3:
        if (nu = null, f = ha, ha = eu(n.containerInfo), _n(n, t), ha = f, Nn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            ol(n.containerInfo);
          } catch (_e) {
            St(t, t.return, _e);
          }
        Zf && (Zf = !1, Pg(t));
        break;
      case 4:
        o = ha, ha = eu(
          t.stateNode.containerInfo
        ), _n(n, t), Nn(t), ha = o;
        break;
      case 12:
        _n(n, t), Nn(t);
        break;
      case 31:
        _n(n, t), Nn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Vs(t, o)));
        break;
      case 13:
        _n(n, t), Nn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && ($s = Qe()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Vs(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var $ = i !== null && i.memoizedState !== null, ae = Ja, ue = Zt;
        if (Ja = ae || f, Zt = ue || $, _n(n, t), Zt = ue, Ja = ae, Nn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || $ || Ja || Zt || cr(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                $ = i = n;
                try {
                  if (h = $.stateNode, f)
                    S = h.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none";
                  else {
                    M = $.stateNode;
                    var fe = $.memoizedProps.style, ie = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    M.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (_e) {
                  St($, $.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                $ = n;
                try {
                  $.stateNode.nodeValue = f ? "" : $.memoizedProps;
                } catch (_e) {
                  St($, $.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                $ = n;
                try {
                  var oe = $.stateNode;
                  f ? U0(oe, !0) : U0($.stateNode, !1);
                } catch (_e) {
                  St($, $.return, _e);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Vs(t, i))));
        break;
      case 19:
        _n(n, t), Nn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Vs(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        _n(n, t), Nn(t);
    }
  }
  function Nn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (qg(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = Xf(t);
            Us(t, h, f);
            break;
          case 5:
            var S = i.stateNode;
            i.flags & 32 && (Dr(S, ""), i.flags &= -33);
            var M = Xf(t);
            Us(t, M, S);
            break;
          case 3:
          case 4:
            var $ = i.stateNode.containerInfo, ae = Xf(t);
            Ff(
              t,
              ae,
              $
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ue) {
        St(t, t.return, ue);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function Pg(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        Pg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ei(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ig(t, n.alternate, n), n = n.sibling;
  }
  function cr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Mi(4, n, n.return), cr(n);
          break;
        case 1:
          Ra(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && Ug(
            n,
            n.return,
            i
          ), cr(n);
          break;
        case 27:
          ho(n.stateNode);
        case 26:
        case 5:
          Ra(n, n.return), cr(n);
          break;
        case 22:
          n.memoizedState === null && cr(n);
          break;
        case 30:
          cr(n);
          break;
        default:
          cr(n);
      }
      t = t.sibling;
    }
  }
  function ti(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, S = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ti(
            f,
            h,
            i
          ), no(4, h);
          break;
        case 1:
          if (ti(
            f,
            h,
            i
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ae) {
              St(o, o.return, ae);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var $ = f.shared.hiddenCallbacks;
              if ($ !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < $.length; f++)
                  Rp($[f], M);
            } catch (ae) {
              St(o, o.return, ae);
            }
          }
          i && S & 64 && kg(h), ao(h, h.return);
          break;
        case 27:
          $g(h);
        case 26:
        case 5:
          ti(
            f,
            h,
            i
          ), i && o === null && S & 4 && Vg(h), ao(h, h.return);
          break;
        case 12:
          ti(
            f,
            h,
            i
          );
          break;
        case 31:
          ti(
            f,
            h,
            i
          ), i && S & 4 && Fg(f, h);
          break;
        case 13:
          ti(
            f,
            h,
            i
          ), i && S & 4 && Zg(f, h);
          break;
        case 22:
          h.memoizedState === null && ti(
            f,
            h,
            i
          ), ao(h, h.return);
          break;
        case 30:
          break;
        default:
          ti(
            f,
            h,
            i
          );
      }
      n = n.sibling;
    }
  }
  function Qf(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Yl(i));
  }
  function Pf(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Yl(t));
  }
  function ma(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Kg(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function Kg(t, n, i, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ma(
          t,
          n,
          i,
          o
        ), f & 2048 && no(9, n);
        break;
      case 1:
        ma(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        ma(
          t,
          n,
          i,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Yl(t)));
        break;
      case 12:
        if (f & 2048) {
          ma(
            t,
            n,
            i,
            o
          ), t = n.stateNode;
          try {
            var h = n.memoizedProps, S = h.id, M = h.onPostCommit;
            typeof M == "function" && M(
              S,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch ($) {
            St(n, n.return, $);
          }
        } else
          ma(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        ma(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        ma(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, S = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? ma(
          t,
          n,
          i,
          o
        ) : io(t, n) : h._visibility & 2 ? ma(
          t,
          n,
          i,
          o
        ) : (h._visibility |= 2, Pr(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Qf(S, n);
        break;
      case 24:
        ma(
          t,
          n,
          i,
          o
        ), f & 2048 && Pf(n.alternate, n);
        break;
      default:
        ma(
          t,
          n,
          i,
          o
        );
    }
  }
  function Pr(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, S = n, M = i, $ = o, ae = S.flags;
      switch (S.tag) {
        case 0:
        case 11:
        case 15:
          Pr(
            h,
            S,
            M,
            $,
            f
          ), no(8, S);
          break;
        case 23:
          break;
        case 22:
          var ue = S.stateNode;
          S.memoizedState !== null ? ue._visibility & 2 ? Pr(
            h,
            S,
            M,
            $,
            f
          ) : io(
            h,
            S
          ) : (ue._visibility |= 2, Pr(
            h,
            S,
            M,
            $,
            f
          )), f && ae & 2048 && Qf(
            S.alternate,
            S
          );
          break;
        case 24:
          Pr(
            h,
            S,
            M,
            $,
            f
          ), f && ae & 2048 && Pf(S.alternate, S);
          break;
        default:
          Pr(
            h,
            S,
            M,
            $,
            f
          );
      }
      n = n.sibling;
    }
  }
  function io(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            io(i, o), f & 2048 && Qf(
              o.alternate,
              o
            );
            break;
          case 24:
            io(i, o), f & 2048 && Pf(o.alternate, o);
            break;
          default:
            io(i, o);
        }
        n = n.sibling;
      }
  }
  var ro = 8192;
  function Kr(t, n, i) {
    if (t.subtreeFlags & ro)
      for (t = t.child; t !== null; )
        Jg(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function Jg(t, n, i) {
    switch (t.tag) {
      case 26:
        Kr(
          t,
          n,
          i
        ), t.flags & ro && t.memoizedState !== null && HE(
          i,
          ha,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Kr(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ha;
        ha = eu(t.stateNode.containerInfo), Kr(
          t,
          n,
          i
        ), ha = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = ro, ro = 16777216, Kr(
          t,
          n,
          i
        ), ro = o) : Kr(
          t,
          n,
          i
        ));
        break;
      default:
        Kr(
          t,
          n,
          i
        );
    }
  }
  function Wg(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function lo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, t0(
            o,
            t
          );
        }
      Wg(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        e0(t), t = t.sibling;
  }
  function e0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        lo(t), t.flags & 2048 && Mi(9, t, t.return);
        break;
      case 3:
        lo(t);
        break;
      case 12:
        lo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, qs(t)) : lo(t);
        break;
      default:
        lo(t);
    }
  }
  function qs(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, t0(
            o,
            t
          );
        }
      Wg(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Mi(8, n, n.return), qs(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, qs(n));
          break;
        default:
          qs(n);
      }
      t = t.sibling;
    }
  }
  function t0(t, n) {
    for (; en !== null; ) {
      var i = en;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Mi(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Yl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, en = o;
      else
        e: for (i = t; en !== null; ) {
          o = en;
          var f = o.sibling, h = o.return;
          if (Gg(o), o === i) {
            en = null;
            break e;
          }
          if (f !== null) {
            f.return = h, en = f;
            break e;
          }
          en = h;
        }
    }
  }
  var Kw = {
    getCacheForType: function(t) {
      var n = ln(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return ln(Gt).controller.signal;
    }
  }, Jw = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Pe = null, et = 0, xt = 0, Bn = null, Di = !1, Jr = !1, Kf = !1, ni = 0, kt = 0, Ai = 0, fr = 0, Jf = 0, kn = 0, Wr = 0, oo = null, Cn = null, Wf = !1, $s = 0, n0 = 0, Ys = 1 / 0, Is = null, zi = null, Jt = 0, Oi = null, el = null, ai = 0, ed = 0, td = null, a0 = null, so = 0, nd = null;
  function Un() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : R.T !== null ? sd() : de();
  }
  function i0() {
    if (kn === 0)
      if ((et & 536870912) === 0 || it) {
        var t = Dn;
        Dn <<= 1, (Dn & 3932160) === 0 && (Dn = 262144), kn = t;
      } else kn = 536870912;
    return t = Ln.current, t !== null && (t.flags |= 32), kn;
  }
  function Rn(t, n, i) {
    (t === Rt && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null) && (tl(t, 0), ji(
      t,
      et,
      kn,
      !1
    )), pt(t, i), ((ht & 2) === 0 || t !== Rt) && (t === Rt && ((ht & 2) === 0 && (fr |= i), kt === 4 && ji(
      t,
      et,
      kn,
      !1
    )), Ta(t));
  }
  function r0(t, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || vt(t, n), f = o ? tE(t, n) : id(t, n, !0), h = o;
    do {
      if (f === 0) {
        Jr && !o && ji(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, h && !Ww(i)) {
          f = id(t, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var S = 0;
          else
            S = t.pendingLanes & -536870913, S = S !== 0 ? S : S & 536870912 ? 536870912 : 0;
          if (S !== 0) {
            n = S;
            e: {
              var M = t;
              f = oo;
              var $ = M.current.memoizedState.isDehydrated;
              if ($ && (tl(M, S).flags |= 256), S = id(
                M,
                S,
                !1
              ), S !== 2) {
                if (Kf && !$) {
                  M.errorRecoveryDisabledLanes |= h, fr |= h, f = 4;
                  break e;
                }
                h = Cn, Cn = f, h !== null && (Cn === null ? Cn = h : Cn.push.apply(
                  Cn,
                  h
                ));
              }
              f = S;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          tl(t, 0), ji(t, n, 0, !0);
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
              ji(
                o,
                n,
                kn,
                !Di
              );
              break e;
            case 2:
              Cn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = $s + 300 - Qe(), 10 < f)) {
            if (ji(
              o,
              n,
              kn,
              !Di
            ), He(o, 0, !0) !== 0) break e;
            ai = n, o.timeoutHandle = H0(
              l0.bind(
                null,
                o,
                i,
                Cn,
                Is,
                Wf,
                n,
                kn,
                fr,
                Wr,
                Di,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          l0(
            o,
            i,
            Cn,
            Is,
            Wf,
            n,
            kn,
            fr,
            Wr,
            Di,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ta(t);
  }
  function l0(t, n, i, o, f, h, S, M, $, ae, ue, fe, ie, oe) {
    if (t.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: $a
      }, Jg(
        n,
        h,
        fe
      );
      var _e = (h & 62914560) === h ? $s - Qe() : (h & 4194048) === h ? n0 - Qe() : 0;
      if (_e = BE(
        fe,
        _e
      ), _e !== null) {
        ai = h, t.cancelPendingCommit = _e(
          m0.bind(
            null,
            t,
            n,
            h,
            i,
            o,
            f,
            S,
            M,
            $,
            ue,
            fe,
            null,
            ie,
            oe
          )
        ), ji(t, h, S, !ae);
        return;
      }
    }
    m0(
      t,
      n,
      h,
      i,
      o,
      f,
      S,
      M,
      $
    );
  }
  function Ww(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!On(h(), f)) return !1;
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
  function ji(t, n, i, o) {
    n &= ~Jf, n &= ~fr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), S = 1 << h;
      o[h] = -1, f &= ~S;
    }
    i !== 0 && ua(t, i, n);
  }
  function Gs() {
    return (ht & 6) === 0 ? (uo(0), !1) : !0;
  }
  function ad() {
    if (Pe !== null) {
      if (xt === 0)
        var t = Pe.return;
      else
        t = Pe, Xa = nr = null, bf(t), Gr = null, Gl = 0, t = Pe;
      for (; t !== null; )
        Bg(t.alternate, t), t = t.return;
      Pe = null;
    }
  }
  function tl(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, bE(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), ai = 0, ad(), Rt = t, Pe = i = Ia(t.current, null), et = n, xt = 0, Bn = null, Di = !1, Jr = vt(t, n), Kf = !1, Wr = kn = Jf = fr = Ai = kt = 0, Cn = oo = null, Wf = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return ni = n, ds(), i;
  }
  function o0(t, n) {
    qe = null, R.H = Wl, n === Ir || n === xs ? (n = Ep(), xt = 3) : n === of ? (n = Ep(), xt = 4) : xt = n === Lf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, Pe === null && (kt = 1, js(
      t,
      Qn(n, t.current)
    ));
  }
  function s0() {
    var t = Ln.current;
    return t === null ? !0 : (et & 4194048) === et ? Wn === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === Wn : !1;
  }
  function u0() {
    var t = R.H;
    return R.H = Wl, t === null ? Wl : t;
  }
  function c0() {
    var t = R.A;
    return R.A = Kw, t;
  }
  function Xs() {
    kt = 4, Di || (et & 4194048) !== et && Ln.current !== null || (Jr = !0), (Ai & 134217727) === 0 && (fr & 134217727) === 0 || Rt === null || ji(
      Rt,
      et,
      kn,
      !1
    );
  }
  function id(t, n, i) {
    var o = ht;
    ht |= 2;
    var f = u0(), h = c0();
    (Rt !== t || et !== n) && (Is = null, tl(t, n)), n = !1;
    var S = kt;
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          var M = Pe, $ = Bn;
          switch (xt) {
            case 8:
              ad(), S = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ln.current === null && (n = !0);
              var ae = xt;
              if (xt = 0, Bn = null, nl(t, M, $, ae), i && Jr) {
                S = 0;
                break e;
              }
              break;
            default:
              ae = xt, xt = 0, Bn = null, nl(t, M, $, ae);
          }
        }
        eE(), S = kt;
        break;
      } catch (ue) {
        o0(t, ue);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Xa = nr = null, ht = o, R.H = f, R.A = h, Pe === null && (Rt = null, et = 0, ds()), S;
  }
  function eE() {
    for (; Pe !== null; ) f0(Pe);
  }
  function tE(t, n) {
    var i = ht;
    ht |= 2;
    var o = u0(), f = c0();
    Rt !== t || et !== n ? (Is = null, Ys = Qe() + 500, tl(t, n)) : Jr = vt(
      t,
      n
    );
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          n = Pe;
          var h = Bn;
          t: switch (xt) {
            case 1:
              xt = 0, Bn = null, nl(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (Sp(h)) {
                xt = 0, Bn = null, d0(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Rt !== t || (xt = 7), Ta(t);
              }, h.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              Sp(h) ? (xt = 0, Bn = null, d0(n)) : (xt = 0, Bn = null, nl(t, n, h, 7));
              break;
            case 5:
              var S = null;
              switch (Pe.tag) {
                case 26:
                  S = Pe.memoizedState;
                case 5:
                case 27:
                  var M = Pe;
                  if (S ? K0(S) : M.stateNode.complete) {
                    xt = 0, Bn = null;
                    var $ = M.sibling;
                    if ($ !== null) Pe = $;
                    else {
                      var ae = M.return;
                      ae !== null ? (Pe = ae, Fs(ae)) : Pe = null;
                    }
                    break t;
                  }
              }
              xt = 0, Bn = null, nl(t, n, h, 5);
              break;
            case 6:
              xt = 0, Bn = null, nl(t, n, h, 6);
              break;
            case 8:
              ad(), kt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        nE();
        break;
      } catch (ue) {
        o0(t, ue);
      }
    while (!0);
    return Xa = nr = null, R.H = o, R.A = f, ht = i, Pe !== null ? 0 : (Rt = null, et = 0, ds(), kt);
  }
  function nE() {
    for (; Pe !== null && !Je(); )
      f0(Pe);
  }
  function f0(t) {
    var n = Lg(t.alternate, t, ni);
    t.memoizedProps = t.pendingProps, n === null ? Fs(t) : Pe = n;
  }
  function d0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Mg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = Mg(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        bf(n);
      default:
        Bg(i, n), n = Pe = cp(n, ni), n = Lg(i, n, ni);
    }
    t.memoizedProps = t.pendingProps, n === null ? Fs(t) : Pe = n;
  }
  function nl(t, n, i, o) {
    Xa = nr = null, bf(n), Gr = null, Gl = 0;
    var f = n.return;
    try {
      if (Iw(
        t,
        f,
        n,
        i,
        et
      )) {
        kt = 1, js(
          t,
          Qn(i, t.current)
        ), Pe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Pe = f, h;
      kt = 1, js(
        t,
        Qn(i, t.current)
      ), Pe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : Jr || (et & 536870912) !== 0 ? t = !1 : (Di = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ln.current, o !== null && o.tag === 13 && (o.flags |= 16384))), h0(n, t)) : Fs(n);
  }
  function Fs(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        h0(
          n,
          Di
        );
        return;
      }
      t = n.return;
      var i = Fw(
        n.alternate,
        n,
        ni
      );
      if (i !== null) {
        Pe = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Pe = n;
        return;
      }
      Pe = n = t;
    } while (n !== null);
    kt === 0 && (kt = 5);
  }
  function h0(t, n) {
    do {
      var i = Zw(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Pe = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Pe = t;
        return;
      }
      Pe = t = i;
    } while (t !== null);
    kt = 6, Pe = null;
  }
  function m0(t, n, i, o, f, h, S, M, $) {
    t.cancelPendingCommit = null;
    do
      Zs();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= Gc, Kt(
        t,
        i,
        h,
        S,
        M,
        $
      ), t === Rt && (Pe = Rt = null, et = 0), el = n, Oi = t, ai = i, ed = h, td = f, a0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, lE(Lt, function() {
        return b0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = R.T, R.T = null, f = L.p, L.p = 2, S = ht, ht |= 4;
        try {
          Qw(t, n, i);
        } finally {
          ht = S, L.p = f, R.T = o;
        }
      }
      Jt = 1, p0(), g0(), y0();
    }
  }
  function p0() {
    if (Jt === 1) {
      Jt = 0;
      var t = Oi, n = el, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = R.T, R.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Qg(n, t);
          var h = gd, S = tp(t.containerInfo), M = h.focusedElem, $ = h.selectionRange;
          if (S !== M && M && M.ownerDocument && ep(
            M.ownerDocument.documentElement,
            M
          )) {
            if ($ !== null && Vc(M)) {
              var ae = $.start, ue = $.end;
              if (ue === void 0 && (ue = ae), "selectionStart" in M)
                M.selectionStart = ae, M.selectionEnd = Math.min(
                  ue,
                  M.value.length
                );
              else {
                var fe = M.ownerDocument || document, ie = fe && fe.defaultView || window;
                if (ie.getSelection) {
                  var oe = ie.getSelection(), _e = M.textContent.length, Le = Math.min($.start, _e), Nt = $.end === void 0 ? Le : Math.min($.end, _e);
                  !oe.extend && Le > Nt && (S = Nt, Nt = Le, Le = S);
                  var J = Wm(
                    M,
                    Le
                  ), X = Wm(
                    M,
                    Nt
                  );
                  if (J && X && (oe.rangeCount !== 1 || oe.anchorNode !== J.node || oe.anchorOffset !== J.offset || oe.focusNode !== X.node || oe.focusOffset !== X.offset)) {
                    var ne = fe.createRange();
                    ne.setStart(J.node, J.offset), oe.removeAllRanges(), Le > Nt ? (oe.addRange(ne), oe.extend(X.node, X.offset)) : (ne.setEnd(X.node, X.offset), oe.addRange(ne));
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
          lu = !!pd, gd = pd = null;
        } finally {
          ht = f, L.p = o, R.T = i;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function g0() {
    if (Jt === 2) {
      Jt = 0;
      var t = Oi, n = el, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = R.T, R.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Ig(t, n.alternate, n);
        } finally {
          ht = f, L.p = o, R.T = i;
        }
      }
      Jt = 3;
    }
  }
  function y0() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Ze();
      var t = Oi, n = el, i = ai, o = a0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, el = Oi = null, v0(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (zi = null), W(i), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
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
        n = R.T, f = L.p, L.p = 2, R.T = null;
        try {
          for (var h = t.onRecoverableError, S = 0; S < o.length; S++) {
            var M = o[S];
            h(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          R.T = n, L.p = f;
        }
      }
      (ai & 3) !== 0 && Zs(), Ta(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === nd ? so++ : (so = 0, nd = t) : so = 0, uo(0);
    }
  }
  function v0(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Yl(n)));
  }
  function Zs() {
    return p0(), g0(), y0(), b0();
  }
  function b0() {
    if (Jt !== 5) return !1;
    var t = Oi, n = ed;
    ed = 0;
    var i = W(ai), o = R.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, R.T = null, i = td, td = null;
      var h = Oi, S = ai;
      if (Jt = 0, el = Oi = null, ai = 0, (ht & 6) !== 0) throw Error(l(331));
      var M = ht;
      if (ht |= 4, e0(h.current), Kg(
        h,
        h.current,
        S,
        i
      ), ht = M, uo(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(tn, h);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, R.T = o, v0(t, n);
    }
  }
  function x0(t, n, i) {
    n = Qn(i, n), n = jf(t.stateNode, n, 2), t = Ci(t, n, 2), t !== null && (pt(t, 2), Ta(t));
  }
  function St(t, n, i) {
    if (t.tag === 3)
      x0(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          x0(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (zi === null || !zi.has(o))) {
            t = Qn(i, t), i = Sg(2), o = Ci(n, i, 2), o !== null && (wg(
              i,
              o,
              n,
              t
            ), pt(o, 2), Ta(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function rd(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new Jw();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (Kf = !0, f.add(i), t = aE.bind(null, t, n, i), n.then(t, t));
  }
  function aE(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (et & i) === i && (kt === 4 || kt === 3 && (et & 62914560) === et && 300 > Qe() - $s ? (ht & 2) === 0 && tl(t, 0) : Jf |= i, Wr === et && (Wr = 0)), Ta(t);
  }
  function S0(t, n) {
    n === 0 && (n = Vt()), t = Wi(t, n), t !== null && (pt(t, n), Ta(t));
  }
  function iE(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), S0(t, i);
  }
  function rE(t, n) {
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
    o !== null && o.delete(n), S0(t, i);
  }
  function lE(t, n) {
    return Ye(t, n);
  }
  var Qs = null, al = null, ld = !1, Ps = !1, od = !1, Li = 0;
  function Ta(t) {
    t !== al && t.next === null && (al === null ? Qs = al = t : al = al.next = t), Ps = !0, ld || (ld = !0, sE());
  }
  function uo(t, n) {
    if (!od && Ps) {
      od = !0;
      do
        for (var i = !1, o = Qs; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var S = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(S & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, N0(o, h));
          } else
            h = et, h = He(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || vt(o, h) || (i = !0, N0(o, h));
          o = o.next;
        }
      while (i);
      od = !1;
    }
  }
  function oE() {
    w0();
  }
  function w0() {
    Ps = ld = !1;
    var t = 0;
    Li !== 0 && vE() && (t = Li);
    for (var n = Qe(), i = null, o = Qs; o !== null; ) {
      var f = o.next, h = E0(o, n);
      h === 0 ? (o.next = null, i === null ? Qs = f : i.next = f, f === null && (al = i)) : (i = o, (t !== 0 || (h & 3) !== 0) && (Ps = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || uo(t), Li !== 0 && (Li = 0);
  }
  function E0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var S = 31 - Ut(h), M = 1 << S, $ = f[S];
      $ === -1 ? ((M & i) === 0 || (M & o) !== 0) && (f[S] = Ht(M, n)) : $ <= n && (t.expiredLanes |= M), h &= ~M;
    }
    if (n = Rt, i = et, i = He(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && wt(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || vt(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && wt(o), W(i)) {
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
      return o = _0.bind(null, t), i = Ye(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && wt(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function _0(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (Zs() && t.callbackNode !== i)
      return null;
    var o = et;
    return o = He(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (r0(t, o, n), E0(t, Qe()), t.callbackNode != null && t.callbackNode === i ? _0.bind(null, t) : null);
  }
  function N0(t, n) {
    if (Zs()) return null;
    r0(t, n, !0);
  }
  function sE() {
    xE(function() {
      (ht & 6) !== 0 ? Ye(
        yt,
        oE
      ) : w0();
    });
  }
  function sd() {
    if (Li === 0) {
      var t = $r;
      t === 0 && (t = sa, sa <<= 1, (sa & 261888) === 0 && (sa = 256)), Li = t;
    }
    return Li;
  }
  function C0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : is("" + t);
  }
  function R0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function uE(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var h = C0(
        (f[Se] || null).action
      ), S = o.submitter;
      S && (n = (n = S[Se] || null) ? C0(n.formAction) : S.getAttribute("formAction"), n !== null && (h = n, S = null));
      var M = new ss(
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
                if (Li !== 0) {
                  var $ = S ? R0(f, S) : new FormData(f);
                  Tf(
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
                typeof h == "function" && (M.preventDefault(), $ = S ? R0(f, S) : new FormData(f), Tf(
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
  for (var ud = 0; ud < Ic.length; ud++) {
    var cd = Ic[ud], cE = cd.toLowerCase(), fE = cd[0].toUpperCase() + cd.slice(1);
    da(
      cE,
      "on" + fE
    );
  }
  da(ip, "onAnimationEnd"), da(rp, "onAnimationIteration"), da(lp, "onAnimationStart"), da("dblclick", "onDoubleClick"), da("focusin", "onFocus"), da("focusout", "onBlur"), da(Rw, "onTransitionRun"), da(Tw, "onTransitionStart"), da(Mw, "onTransitionCancel"), da(op, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
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
  var co = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), dE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(co)
  );
  function T0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var S = o.length - 1; 0 <= S; S--) {
            var M = o[S], $ = M.instance, ae = M.currentTarget;
            if (M = M.listener, $ !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ae;
            try {
              h(f);
            } catch (ue) {
              fs(ue);
            }
            f.currentTarget = null, h = $;
          }
        else
          for (S = 0; S < o.length; S++) {
            if (M = o[S], $ = M.instance, ae = M.currentTarget, M = M.listener, $ !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ae;
            try {
              h(f);
            } catch (ue) {
              fs(ue);
            }
            f.currentTarget = null, h = $;
          }
      }
    }
  }
  function Ke(t, n) {
    var i = n[Me];
    i === void 0 && (i = n[Me] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (M0(n, t, 2, !1), i.add(o));
  }
  function fd(t, n, i) {
    var o = 0;
    n && (o |= 4), M0(
      i,
      t,
      o,
      n
    );
  }
  var Ks = "_reactListening" + Math.random().toString(36).slice(2);
  function dd(t) {
    if (!t[Ks]) {
      t[Ks] = !0, _a.forEach(function(i) {
        i !== "selectionchange" && (dE.has(i) || fd(i, !1, t), fd(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Ks] || (n[Ks] = !0, fd("selectionchange", !1, n));
    }
  }
  function M0(t, n, i, o) {
    switch (iy(n)) {
      case 2:
        var f = VE;
        break;
      case 8:
        f = qE;
        break;
      default:
        f = Rd;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !Ac || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, i, !0) : f !== void 0 ? t.addEventListener(n, i, {
      passive: f
    }) : t.addEventListener(n, i, !1);
  }
  function hd(t, n, i, o, f) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var S = o.tag;
        if (S === 3 || S === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (S === 4)
            for (S = o.return; S !== null; ) {
              var $ = S.tag;
              if (($ === 3 || $ === 4) && S.stateNode.containerInfo === f)
                return;
              S = S.return;
            }
          for (; M !== null; ) {
            if (S = Ct(M), S === null) return;
            if ($ = S.tag, $ === 5 || $ === 6 || $ === 26 || $ === 27) {
              o = h = S;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    jm(function() {
      var ae = h, ue = Mc(i), fe = [];
      e: {
        var ie = sp.get(t);
        if (ie !== void 0) {
          var oe = ss, _e = t;
          switch (t) {
            case "keypress":
              if (ls(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = rw;
              break;
            case "focusin":
              _e = "focus", oe = Lc;
              break;
            case "focusout":
              _e = "blur", oe = Lc;
              break;
            case "beforeblur":
            case "afterblur":
              oe = Lc;
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
              oe = Bm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = FS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = sw;
              break;
            case ip:
            case rp:
            case lp:
              oe = PS;
              break;
            case op:
              oe = cw;
              break;
            case "scroll":
            case "scrollend":
              oe = GS;
              break;
            case "wheel":
              oe = dw;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = JS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Um;
              break;
            case "toggle":
            case "beforetoggle":
              oe = mw;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (t === "scroll" || t === "scrollend"), J = Le ? ie !== null ? ie + "Capture" : null : ie;
          Le = [];
          for (var X = ae, ne; X !== null; ) {
            var ce = X;
            if (ne = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ne === null || J === null || (ce = zl(X, J), ce != null && Le.push(
              fo(X, ce, ne)
            )), Nt) break;
            X = X.return;
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
          if (ie = t === "mouseover" || t === "pointerover", oe = t === "mouseout" || t === "pointerout", ie && i !== Tc && (_e = i.relatedTarget || i.fromElement) && (Ct(_e) || _e[be]))
            break e;
          if ((oe || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ae, _e = _e ? Ct(_e) : null, _e !== null && (Nt = u(_e), Le = _e.tag, _e !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (oe = null, _e = ae), oe !== _e)) {
            if (Le = Bm, ce = "onMouseLeave", J = "onMouseEnter", X = "mouse", (t === "pointerout" || t === "pointerover") && (Le = Um, ce = "onPointerLeave", J = "onPointerEnter", X = "pointer"), Nt = oe == null ? ie : We(oe), ne = _e == null ? ie : We(_e), ie = new Le(
              ce,
              X + "leave",
              oe,
              i,
              ue
            ), ie.target = Nt, ie.relatedTarget = ne, ce = null, Ct(ue) === ae && (Le = new Le(
              J,
              X + "enter",
              _e,
              i,
              ue
            ), Le.target = ne, Le.relatedTarget = Nt, ce = Le), Nt = ce, oe && _e)
              t: {
                for (Le = hE, J = oe, X = _e, ne = 0, ce = J; ce; ce = Le(ce))
                  ne++;
                ce = 0;
                for (var Oe = X; Oe; Oe = Le(Oe))
                  ce++;
                for (; 0 < ne - ce; )
                  J = Le(J), ne--;
                for (; 0 < ce - ne; )
                  X = Le(X), ce--;
                for (; ne--; ) {
                  if (J === X || X !== null && J === X.alternate) {
                    Le = J;
                    break t;
                  }
                  J = Le(J), X = Le(X);
                }
                Le = null;
              }
            else Le = null;
            oe !== null && D0(
              fe,
              ie,
              oe,
              Le,
              !1
            ), _e !== null && Nt !== null && D0(
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
            var ut = Fm;
          else if (Gm(ie))
            if (Zm)
              ut = _w;
            else {
              ut = ww;
              var Ne = Sw;
            }
          else
            oe = ie.nodeName, !oe || oe.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ae && Rc(ae.elementType) && (ut = Fm) : ut = Ew;
          if (ut && (ut = ut(t, ae))) {
            Xm(
              fe,
              ut,
              i,
              ue
            );
            break e;
          }
          Ne && Ne(t, ie, ae), t === "focusout" && ae && ie.type === "number" && ae.memoizedProps.value != null && Dl(ie, "number", ie.value);
        }
        switch (Ne = ae ? We(ae) : window, t) {
          case "focusin":
            (Gm(Ne) || Ne.contentEditable === "true") && (jr = Ne, qc = ae, Vl = null);
            break;
          case "focusout":
            Vl = qc = jr = null;
            break;
          case "mousedown":
            $c = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            $c = !1, np(fe, i, ue);
            break;
          case "selectionchange":
            if (Cw) break;
          case "keydown":
          case "keyup":
            np(fe, i, ue);
        }
        var Ie;
        if (Bc)
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
          Or ? Ym(t, i) && (tt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Vm && i.locale !== "ko" && (Or || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Or && (Ie = Lm()) : (bi = ue, zc = "value" in bi ? bi.value : bi.textContent, Or = !0)), Ne = Js(ae, tt), 0 < Ne.length && (tt = new km(
          tt,
          t,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Ie ? tt.data = Ie : (Ie = Im(i), Ie !== null && (tt.data = Ie)))), (Ie = gw ? yw(t, i) : vw(t, i)) && (tt = Js(ae, "onBeforeInput"), 0 < tt.length && (Ne = new km(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Ie)), uE(
          fe,
          t,
          ae,
          i,
          ue
        );
      }
      T0(fe, n);
    });
  }
  function fo(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function Js(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = zl(t, i), f != null && o.unshift(
        fo(t, f, h)
      ), f = zl(t, n), f != null && o.push(
        fo(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function hE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function D0(t, n, i, o, f) {
    for (var h = n._reactName, S = []; i !== null && i !== o; ) {
      var M = i, $ = M.alternate, ae = M.stateNode;
      if (M = M.tag, $ !== null && $ === o) break;
      M !== 5 && M !== 26 && M !== 27 || ae === null || ($ = ae, f ? (ae = zl(i, h), ae != null && S.unshift(
        fo(i, ae, $)
      )) : f || (ae = zl(i, h), ae != null && S.push(
        fo(i, ae, $)
      ))), i = i.return;
    }
    S.length !== 0 && t.push({ event: n, listeners: S });
  }
  var mE = /\r\n?/g, pE = /\u0000|\uFFFD/g;
  function A0(t) {
    return (typeof t == "string" ? t : "" + t).replace(mE, `
`).replace(pE, "");
  }
  function z0(t, n) {
    return n = A0(n), A0(t) === n;
  }
  function _t(t, n, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Dr(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Dr(t, "" + o);
        break;
      case "className":
        fa(t, "class", o);
        break;
      case "tabIndex":
        fa(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        fa(t, i, o);
        break;
      case "style":
        zm(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          fa(t, "data", o);
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
        o = is("" + o), t.setAttribute(i, o);
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
          typeof h == "function" && (i === "formAction" ? (n !== "input" && _t(t, n, "name", f.name, f, null), _t(
            t,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), _t(
            t,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), _t(
            t,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (_t(t, n, "encType", f.encType, f, null), _t(t, n, "method", f.method, f, null), _t(t, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = is("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = $a);
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
        i = is("" + o), t.setAttributeNS(
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
        Ke("beforetoggle", t), Ke("toggle", t), ca(t, "popover", o);
        break;
      case "xlinkActuate":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        ke(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        ke(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        ca(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = YS.get(i) || i, ca(t, i, o));
    }
  }
  function md(t, n, i, o, f, h) {
    switch (i) {
      case "style":
        zm(t, o, h);
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
        typeof o == "string" ? Dr(t, o) : (typeof o == "number" || typeof o == "bigint") && Dr(t, "" + o);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = $a);
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
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), h = t[Se] || null, h = h != null ? h[i] : null, typeof h == "function" && t.removeEventListener(n, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, f);
              break e;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : ca(t, i, o);
          }
    }
  }
  function sn(t, n, i) {
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
        var o = !1, f = !1, h;
        for (h in i)
          if (i.hasOwnProperty(h)) {
            var S = i[h];
            if (S != null)
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
                  _t(t, n, h, S, i, null);
              }
          }
        f && _t(t, n, "srcSet", i.srcSet, i, null), o && _t(t, n, "src", i.src, i, null);
        return;
      case "input":
        Ke("invalid", t);
        var M = h = S = f = null, $ = null, ae = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var ue = i[o];
            if (ue != null)
              switch (o) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  S = ue;
                  break;
                case "checked":
                  $ = ue;
                  break;
                case "defaultChecked":
                  ae = ue;
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
                  _t(t, n, o, ue, i, null);
              }
          }
        Mr(
          t,
          h,
          M,
          $,
          ae,
          S,
          f,
          !1
        );
        return;
      case "select":
        Ke("invalid", t), o = S = h = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (M = i[f], M != null))
            switch (f) {
              case "value":
                h = M;
                break;
              case "defaultValue":
                S = M;
                break;
              case "multiple":
                o = M;
              default:
                _t(t, n, f, M, i, null);
            }
        n = h, i = S, t.multiple = !!o, n != null ? vi(t, !!o, n, !1) : i != null && vi(t, !!o, i, !0);
        return;
      case "textarea":
        Ke("invalid", t), h = f = o = null;
        for (S in i)
          if (i.hasOwnProperty(S) && (M = i[S], M != null))
            switch (S) {
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
                _t(t, n, S, M, i, null);
            }
        Dm(t, o, f, h);
        return;
      case "option":
        for ($ in i)
          if (i.hasOwnProperty($) && (o = i[$], o != null))
            switch ($) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                _t(t, n, $, o, i, null);
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
        for (o = 0; o < co.length; o++)
          Ke(co[o], t);
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
        for (ae in i)
          if (i.hasOwnProperty(ae) && (o = i[ae], o != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                _t(t, n, ae, o, i, null);
            }
        return;
      default:
        if (Rc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (o = i[ue], o !== void 0 && md(
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
      i.hasOwnProperty(M) && (o = i[M], o != null && _t(t, n, M, o, i, null));
  }
  function gE(t, n, i, o) {
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
        var f = null, h = null, S = null, M = null, $ = null, ae = null, ue = null;
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
                o.hasOwnProperty(oe) || _t(t, n, oe, null, o, fe);
            }
        }
        for (var ie in o) {
          var oe = o[ie];
          if (fe = i[ie], o.hasOwnProperty(ie) && (oe != null || fe != null))
            switch (ie) {
              case "type":
                h = oe;
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
                S = oe;
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
                oe !== fe && _t(
                  t,
                  n,
                  ie,
                  oe,
                  o,
                  fe
                );
            }
        }
        Qi(
          t,
          S,
          M,
          $,
          ae,
          ue,
          h,
          f
        );
        return;
      case "select":
        oe = S = M = ie = null;
        for (h in i)
          if ($ = i[h], i.hasOwnProperty(h) && $ != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = $;
              default:
                o.hasOwnProperty(h) || _t(
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
                ie = h;
                break;
              case "defaultValue":
                M = h;
                break;
              case "multiple":
                S = h;
              default:
                h !== $ && _t(
                  t,
                  n,
                  f,
                  h,
                  o,
                  $
                );
            }
        n = M, i = S, o = oe, ie != null ? vi(t, !!i, ie, !1) : !!o != !!i && (n != null ? vi(t, !!i, n, !0) : vi(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = ie = null;
        for (M in i)
          if (f = i[M], i.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(t, n, M, null, o, f);
            }
        for (S in o)
          if (f = o[S], h = i[S], o.hasOwnProperty(S) && (f != null || h != null))
            switch (S) {
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
                f !== h && _t(t, n, S, f, o, h);
            }
        Al(t, ie, oe);
        return;
      case "option":
        for (var _e in i)
          if (ie = i[_e], i.hasOwnProperty(_e) && ie != null && !o.hasOwnProperty(_e))
            switch (_e) {
              case "selected":
                t.selected = !1;
                break;
              default:
                _t(
                  t,
                  n,
                  _e,
                  null,
                  o,
                  ie
                );
            }
        for ($ in o)
          if (ie = o[$], oe = i[$], o.hasOwnProperty($) && ie !== oe && (ie != null || oe != null))
            switch ($) {
              case "selected":
                t.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                _t(
                  t,
                  n,
                  $,
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
          ie = i[Le], i.hasOwnProperty(Le) && ie != null && !o.hasOwnProperty(Le) && _t(t, n, Le, null, o, ie);
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
                  t,
                  n,
                  ae,
                  ie,
                  o,
                  oe
                );
            }
        return;
      default:
        if (Rc(n)) {
          for (var Nt in i)
            ie = i[Nt], i.hasOwnProperty(Nt) && ie !== void 0 && !o.hasOwnProperty(Nt) && md(
              t,
              n,
              Nt,
              void 0,
              o,
              ie
            );
          for (ue in o)
            ie = o[ue], oe = i[ue], !o.hasOwnProperty(ue) || ie === oe || ie === void 0 && oe === void 0 || md(
              t,
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
      ie = i[J], i.hasOwnProperty(J) && ie != null && !o.hasOwnProperty(J) && _t(t, n, J, null, o, ie);
    for (fe in o)
      ie = o[fe], oe = i[fe], !o.hasOwnProperty(fe) || ie === oe || ie == null && oe == null || _t(t, n, fe, ie, o, oe);
  }
  function O0(t) {
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
  function yE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, S = f.initiatorType, M = f.duration;
        if (h && M && O0(S)) {
          for (S = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var $ = i[o], ae = $.startTime;
            if (ae > M) break;
            var ue = $.transferSize, fe = $.initiatorType;
            ue && O0(fe) && ($ = $.responseEnd, S += ue * ($ < M ? 1 : (M - ae) / ($ - ae)));
          }
          if (--o, n += 8 * (h + S) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var pd = null, gd = null;
  function Ws(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function j0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function L0(t, n) {
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
  function yd(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var vd = null;
  function vE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === vd ? !1 : (vd = t, !0) : (vd = null, !1);
  }
  var H0 = typeof setTimeout == "function" ? setTimeout : void 0, bE = typeof clearTimeout == "function" ? clearTimeout : void 0, B0 = typeof Promise == "function" ? Promise : void 0, xE = typeof queueMicrotask == "function" ? queueMicrotask : typeof B0 < "u" ? function(t) {
    return B0.resolve(null).then(t).catch(SE);
  } : H0;
  function SE(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Hi(t) {
    return t === "head";
  }
  function k0(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), ol(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          ho(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, ho(i);
          for (var h = i.firstChild; h; ) {
            var S = h.nextSibling, M = h.nodeName;
            h[Ge] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = S;
          }
        } else
          i === "body" && ho(t.ownerDocument.body);
      i = f;
    } while (i);
    ol(n);
  }
  function U0(t, n) {
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
  function bd(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          bd(i), rt(i);
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
  function wE(t, n, i, o) {
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
      if (t = ea(t.nextSibling), t === null) break;
    }
    return null;
  }
  function EE(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ea(t.nextSibling), t === null)) return null;
    return t;
  }
  function V0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ea(t.nextSibling), t === null)) return null;
    return t;
  }
  function xd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Sd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function _E(t, n) {
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
  function ea(t) {
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
  var wd = null;
  function q0(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return ea(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function $0(t) {
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
  function Y0(t, n, i) {
    switch (n = Ws(i), t) {
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
  function ho(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    rt(t);
  }
  var ta = /* @__PURE__ */ new Map(), I0 = /* @__PURE__ */ new Set();
  function eu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ii = L.d;
  L.d = {
    f: NE,
    r: CE,
    D: RE,
    C: TE,
    L: ME,
    m: DE,
    X: zE,
    S: AE,
    M: OE
  };
  function NE() {
    var t = ii.f(), n = Gs();
    return t || n;
  }
  function CE(t) {
    var n = st(t);
    n !== null && n.tag === 5 && n.type === "form" ? og(n) : ii.r(t);
  }
  var il = typeof document > "u" ? null : document;
  function G0(t, n, i) {
    var o = il;
    if (o && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), I0.has(f) || (I0.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), sn(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function RE(t) {
    ii.D(t), G0("dns-prefetch", t, null);
  }
  function TE(t, n) {
    ii.C(t, n), G0("preconnect", t, n);
  }
  function ME(t, n, i) {
    ii.L(t, n, i);
    var o = il;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + an(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + an(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + an(
        i.imageSizes
      ) + '"]')) : f += '[href="' + an(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = rl(t);
          break;
        case "script":
          h = ll(t);
      }
      ta.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), ta.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(mo(h)) || n === "script" && o.querySelector(po(h)) || (n = o.createElement("link"), sn(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function DE(t, n) {
    ii.m(t, n);
    var i = il;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + an(o) + '"][href="' + an(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = ll(t);
      }
      if (!ta.has(h) && (t = g({ rel: "modulepreload", href: t }, n), ta.set(h, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(po(h)))
              return;
        }
        o = i.createElement("link"), sn(o, "link", t), at(o), i.head.appendChild(o);
      }
    }
  }
  function AE(t, n, i) {
    ii.S(t, n, i);
    var o = il;
    if (o && t) {
      var f = jt(o).hoistableStyles, h = rl(t);
      n = n || "default";
      var S = f.get(h);
      if (!S) {
        var M = { loading: 0, preload: null };
        if (S = o.querySelector(
          mo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = ta.get(h)) && Ed(t, i);
          var $ = S = o.createElement("link");
          at($), sn($, "link", t), $._p = new Promise(function(ae, ue) {
            $.onload = ae, $.onerror = ue;
          }), $.addEventListener("load", function() {
            M.loading |= 1;
          }), $.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, tu(S, n, o);
        }
        S = {
          type: "stylesheet",
          instance: S,
          count: 1,
          state: M
        }, f.set(h, S);
      }
    }
  }
  function zE(t, n) {
    ii.X(t, n);
    var i = il;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = ll(t), h = o.get(f);
      h || (h = i.querySelector(po(f)), h || (t = g({ src: t, async: !0 }, n), (n = ta.get(f)) && _d(t, n), h = i.createElement("script"), at(h), sn(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function OE(t, n) {
    ii.M(t, n);
    var i = il;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = ll(t), h = o.get(f);
      h || (h = i.querySelector(po(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = ta.get(f)) && _d(t, n), h = i.createElement("script"), at(h), sn(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function X0(t, n, i, o) {
    var f = (f = he.current) ? eu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = rl(i.href), i = jt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = rl(i.href);
          var h = jt(
            f
          ).hoistableStyles, S = h.get(t);
          if (S || (f = f.ownerDocument || f, S = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, S), (h = f.querySelector(
            mo(t)
          )) && !h._p && (S.instance = h, S.state.loading = 5), ta.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, ta.set(t, i), h || jE(
            f,
            t,
            i,
            S.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return S;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ll(i), i = jt(
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
  function rl(t) {
    return 'href="' + an(t) + '"';
  }
  function mo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function F0(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function jE(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), sn(n, "link", i), at(n), t.head.appendChild(n));
  }
  function ll(t) {
    return '[src="' + an(t) + '"]';
  }
  function po(t) {
    return "script[async]" + t;
  }
  function Z0(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + an(i.href) + '"]'
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
          ), at(o), sn(o, "style", f), tu(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = rl(i.href);
          var h = t.querySelector(
            mo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, at(h), h;
          o = F0(i), (f = ta.get(f)) && Ed(o, f), h = (t.ownerDocument || t).createElement("link"), at(h);
          var S = h;
          return S._p = new Promise(function(M, $) {
            S.onload = M, S.onerror = $;
          }), sn(h, "link", o), n.state.loading |= 4, tu(h, i.precedence, t), n.instance = h;
        case "script":
          return h = ll(i.src), (f = t.querySelector(
            po(h)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = ta.get(h)) && (o = g({}, i), _d(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), at(f), sn(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, tu(o, i.precedence, t));
    return n.instance;
  }
  function tu(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, S = 0; S < o.length; S++) {
      var M = o[S];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Ed(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function _d(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var nu = null;
  function Q0(t, n, i) {
    if (nu === null) {
      var o = /* @__PURE__ */ new Map(), f = nu = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = nu, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), f = 0; f < i.length; f++) {
      var h = i[f];
      if (!(h[Ge] || h[ve] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var S = h.getAttribute(n) || "";
        S = t + S;
        var M = o.get(S);
        M ? M.push(h) : o.set(S, [h]);
      }
    }
    return o;
  }
  function P0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function LE(t, n, i) {
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
  function K0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function HE(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = rl(o.href), h = n.querySelector(
          mo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = au.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = h, at(h);
          return;
        }
        h = n.ownerDocument || n, o = F0(o), (f = ta.get(f)) && Ed(o, f), h = h.createElement("link"), at(h);
        var S = h;
        S._p = new Promise(function(M, $) {
          S.onload = M, S.onerror = $;
        }), sn(h, "link", o), i.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = au.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Nd = 0;
  function BE(t, n) {
    return t.stylesheets && t.count === 0 && ru(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && ru(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Nd === 0 && (Nd = 62500 * yE());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ru(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Nd ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function au() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ru(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var iu = null;
  function ru(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, iu = /* @__PURE__ */ new Map(), n.forEach(kE, t), iu = null, au.call(t));
  }
  function kE(t, n) {
    if (!(n.state.loading & 4)) {
      var i = iu.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), iu.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var S = f[h];
          (S.nodeName === "LINK" || S.getAttribute("media") !== "not all") && (i.set(S.dataset.precedence, S), o = S);
        }
        o && i.set(null, o);
      }
      f = n.instance, S = f.getAttribute("data-precedence"), h = i.get(S) || o, h === o && i.set(null, f), i.set(S, f), this.count++, o = au.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var go = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function UE(t, n, i, o, f, h, S, M, $) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = S, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = $, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function J0(t, n, i, o, f, h, S, M, $, ae, ue, fe) {
    return t = new UE(
      t,
      n,
      i,
      S,
      $,
      ae,
      ue,
      fe,
      M
    ), n = 1, h === !0 && (n |= 24), h = jn(3, null, null, n), t.current = h, h.stateNode = t, n = af(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, sf(h), t;
  }
  function W0(t) {
    return t ? (t = Br, t) : Br;
  }
  function ey(t, n, i, o, f, h) {
    f = W0(f), o.context === null ? o.context = f : o.pendingContext = f, o = Ni(n), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Ci(t, o, n), i !== null && (Rn(i, t, n), Fl(i, t, n));
  }
  function ty(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Cd(t, n) {
    ty(t, n), (t = t.alternate) && ty(t, n);
  }
  function ny(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Wi(t, 67108864);
      n !== null && Rn(n, t, 67108864), Cd(t, 67108864);
    }
  }
  function ay(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Un();
      n = Z(n);
      var i = Wi(t, n);
      i !== null && Rn(i, t, n), Cd(t, n);
    }
  }
  var lu = !0;
  function VE(t, n, i, o) {
    var f = R.T;
    R.T = null;
    var h = L.p;
    try {
      L.p = 2, Rd(t, n, i, o);
    } finally {
      L.p = h, R.T = f;
    }
  }
  function qE(t, n, i, o) {
    var f = R.T;
    R.T = null;
    var h = L.p;
    try {
      L.p = 8, Rd(t, n, i, o);
    } finally {
      L.p = h, R.T = f;
    }
  }
  function Rd(t, n, i, o) {
    if (lu) {
      var f = Td(o);
      if (f === null)
        hd(
          t,
          n,
          o,
          ou,
          i
        ), ry(t, o);
      else if (YE(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (ry(t, o), n & 4 && -1 < $E.indexOf(t)) {
        for (; f !== null; ) {
          var h = st(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var S = un(h.pendingLanes);
                  if (S !== 0) {
                    var M = h;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; S; ) {
                      var $ = 1 << 31 - Ut(S);
                      M.entanglements[1] |= $, S &= ~$;
                    }
                    Ta(h), (ht & 6) === 0 && (Ys = Qe() + 500, uo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = Wi(h, 2), M !== null && Rn(M, h, 2), Gs(), Cd(h, 2);
            }
          if (h = Td(o), h === null && hd(
            t,
            n,
            o,
            ou,
            i
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        hd(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Td(t) {
    return t = Mc(t), Md(t);
  }
  var ou = null;
  function Md(t) {
    if (ou = null, t = Ct(t), t !== null) {
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
    return ou = t, null;
  }
  function iy(t) {
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
  var Dd = !1, Bi = null, ki = null, Ui = null, yo = /* @__PURE__ */ new Map(), vo = /* @__PURE__ */ new Map(), Vi = [], $E = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ry(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Bi = null;
        break;
      case "dragenter":
      case "dragleave":
        ki = null;
        break;
      case "mouseover":
      case "mouseout":
        Ui = null;
        break;
      case "pointerover":
      case "pointerout":
        yo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vo.delete(n.pointerId);
    }
  }
  function bo(t, n, i, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && ny(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function YE(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return Bi = bo(
          Bi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return ki = bo(
          ki,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return Ui = bo(
          Ui,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return yo.set(
          h,
          bo(
            yo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, vo.set(
          h,
          bo(
            vo.get(h) || null,
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
  function ly(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, pe(t.priority, function() {
              ay(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, pe(t.priority, function() {
              ay(i);
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
  function su(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Td(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Tc = o, i.target.dispatchEvent(o), Tc = null;
      } else
        return n = st(i), n !== null && ny(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function oy(t, n, i) {
    su(t) && i.delete(n);
  }
  function IE() {
    Dd = !1, Bi !== null && su(Bi) && (Bi = null), ki !== null && su(ki) && (ki = null), Ui !== null && su(Ui) && (Ui = null), yo.forEach(oy), vo.forEach(oy);
  }
  function uu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, Dd || (Dd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      IE
    )));
  }
  var cu = null;
  function sy(t) {
    cu !== t && (cu = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        cu === t && (cu = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Md(o || i) === null)
              continue;
            break;
          }
          var h = st(i);
          h !== null && (t.splice(n, 3), n -= 3, Tf(
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
  function ol(t) {
    function n($) {
      return uu($, t);
    }
    Bi !== null && uu(Bi, t), ki !== null && uu(ki, t), Ui !== null && uu(Ui, t), yo.forEach(n), vo.forEach(n);
    for (var i = 0; i < Vi.length; i++) {
      var o = Vi[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Vi.length && (i = Vi[0], i.blockedOn === null); )
      ly(i), i.blockedOn === null && Vi.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], S = f[Se] || null;
        if (typeof h == "function")
          S || sy(i);
        else if (S) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, S = h[Se] || null)
              M = S.formAction;
            else if (Md(f) !== null) continue;
          } else M = S.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), sy(i);
        }
      }
  }
  function uy() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(S) {
            return f = S;
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
  function Ad(t) {
    this._internalRoot = t;
  }
  fu.prototype.render = Ad.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = Un();
    ey(i, o, t, n, null, null);
  }, fu.prototype.unmount = Ad.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      ey(t.current, 2, null, t, null, null), Gs(), n[be] = null;
    }
  };
  function fu(t) {
    this._internalRoot = t;
  }
  fu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = de();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < Vi.length && n !== 0 && n < Vi[i].priority; i++) ;
      Vi.splice(i, 0, t), i === 0 && ly(t);
    }
  };
  var cy = a.version;
  if (cy !== "19.2.7")
    throw Error(
      l(
        527,
        cy,
        "19.2.7"
      )
    );
  L.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var GE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: R,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var du = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!du.isDisabled && du.supportsFiber)
      try {
        tn = du.inject(
          GE
        ), Pt = du;
      } catch {
      }
  }
  return So.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = yg, h = vg, S = bg;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (S = n.onRecoverableError)), n = J0(
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
      S,
      uy
    ), t[be] = n.current, dd(t), new Ad(n);
  }, So.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = yg, S = vg, M = bg, $ = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (S = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && ($ = i.formState)), n = J0(
      t,
      1,
      !0,
      n,
      i ?? null,
      o,
      f,
      $,
      h,
      S,
      M,
      uy
    ), n.context = W0(null), i = n.current, o = Un(), o = Z(o), f = Ni(o), f.callback = null, Ci(i, f, o), i = o, n.current.lanes = i, pt(n, i), Ta(n), t[be] = n.current, dd(t), new fu(n);
  }, So.version = "19.2.7", So;
}
var xy;
function n_() {
  if (xy) return jd.exports;
  xy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), jd.exports = t_(), jd.exports;
}
var a_ = n_();
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
var Yb = (e) => {
  throw TypeError(e);
}, Ib = (e, a, r) => a.has(e) || Yb("Cannot " + r), aa = (e, a, r) => (Ib(e, a, "read from private field"), r ? r.call(e) : a.get(e)), To = (e, a, r) => a.has(e) ? Yb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), Ma = (e, a, r, l) => (Ib(e, a, "write to private field"), a.set(e, r), r);
function Sy(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function i_(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: l = !1 } = e, s;
  s = a.map(
    (b, w) => y(
      b,
      typeof b == "string" ? null : b.state,
      w === 0 ? "default" : void 0,
      typeof b == "string" ? void 0 : b.mask
    )
  );
  let u = p(
    r ?? s.length - 1
  ), c = "POP", d = null;
  function p(b) {
    return Math.min(Math.max(b, 0), s.length - 1);
  }
  function m() {
    return s[u];
  }
  function y(b, w = null, N, T) {
    let C = fh(
      s ? m().pathname : "/",
      b,
      w,
      N,
      T
    );
    return Yt(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        b
      )}`
    ), C;
  }
  function g(b) {
    return typeof b == "string" ? b : ka(b);
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
    createURL(b) {
      return new URL(g(b), "http://localhost");
    },
    encodeLocation(b) {
      let w = typeof b == "string" ? Sa(b) : b;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(b, w) {
      c = "PUSH";
      let N = Sy(b) ? b : y(b, w);
      u += 1, s.splice(u, s.length, N), l && d && d({ action: c, location: N, delta: 1 });
    },
    replace(b, w) {
      c = "REPLACE";
      let N = Sy(b) ? b : y(b, w);
      s[u] = N, l && d && d({ action: c, location: N, delta: 0 });
    },
    go(b) {
      c = "POP";
      let w = p(u + b), N = s[w];
      u = w, d && d({ action: c, location: N, delta: b });
    },
    listen(b) {
      return d = b, () => {
        d = null;
      };
    }
  };
}
function Fe(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function Yt(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function r_() {
  return Math.random().toString(36).substring(2, 10);
}
function fh(e, a, r = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Sa(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || r_(),
    mask: s
  };
}
function ka({
  pathname: e = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Sa(e) {
  let a = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (a.hash = e.substring(r), e = e.substring(0, r));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function l_(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Fe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : ka(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Mo, wy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (To(this, Mo, /* @__PURE__ */ new Map()), e)
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
    if (aa(this, Mo).has(e))
      return aa(this, Mo).get(e);
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
    aa(this, Mo).set(e, a);
  }
};
Mo = /* @__PURE__ */ new WeakMap();
var o_ = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function s_(e) {
  return o_.has(
    e
  );
}
var u_ = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function c_(e) {
  return u_.has(
    e
  );
}
function f_(e) {
  return e.index === !0;
}
function Lo(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Fe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Fe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), f_(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = Ey(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = Ey(
        m,
        a(m)
      ), u.children && (m.children = Lo(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function Ey(e, a) {
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
function Gb(e, a, r = "/") {
  return pa(e, a, r, !1);
}
function pa(e, a, r, l, s) {
  let u = typeof a == "string" ? Sa(a) : a, c = la(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? ju(e), p = null, m = __(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = w_(
      d[y],
      m,
      l
    );
  return p;
}
function d_(e, a) {
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
function ju(e) {
  let a = Xb(e);
  return h_(a), a;
}
function Xb(e, a = [], r = [], l = "", s = !1) {
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
      Fe(
        y.relativePath.startsWith(l),
        `Absolute route path "${y.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(l.length);
    }
    let g = ra([l, y.relativePath]), v = r.concat(y);
    c.children && c.children.length > 0 && (Fe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Xb(
      c.children,
      a,
      v,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: x_(g, c.index),
      routesMeta: v
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Fb(c.path))
        u(c, d, !0, p);
  }), a;
}
function Fb(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Fb(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function h_(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : S_(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var m_ = /^:[\w-]+$/, p_ = 3, g_ = 2, y_ = 1, v_ = 10, b_ = -2, _y = (e) => e === "*";
function x_(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(_y) && (l += b_), a && (l += g_), r.filter((s) => !_y(s)).reduce(
    (s, u) => s + (m_.test(u) ? p_ : u === "" ? y_ : v_),
    l
  );
}
function S_(e, a) {
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
function w_(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = Yu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), v = p.route;
    if (!g && m && r && !l[l.length - 1].route.index && (g = Yu(
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
      pathname: ra([u, g.pathname]),
      pathnameBase: R_(
        ra([u, g.pathnameBase])
      ),
      route: v
    }), g.pathnameBase !== "/" && (u = ra([u, g.pathnameBase]));
  }
  return c;
}
function Yu(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = E_(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: y, isOptional: g }, v) => {
        if (y === "*") {
          let w = d[v] || "";
          c = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const b = d[v];
        return g && !b ? m[y] = void 0 : m[y] = (b || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function E_(e, a = !1, r = !0) {
  Yt(
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
function __(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Yt(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function la(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(r);
  return l && l !== "/" ? null : e.slice(r) || "/";
}
function N_({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : ra([e, a]);
}
var Zb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Gh = (e) => Zb.test(e);
function C_(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Sa(e) : e, u;
  return r ? (r = Fh(r), r.startsWith("/") ? u = Ny(r.substring(1), "/") : u = Ny(r, a)) : u = a, {
    pathname: u,
    search: T_(l),
    hash: M_(s)
  };
}
function Ny(e, a) {
  let r = Iu(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function kd(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qb(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Xh(e) {
  let a = Qb(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function ac(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Sa(e) : (s = { ...e }, Fe(
    !s.pathname || !s.pathname.includes("?"),
    kd("?", "pathname", "search", s)
  ), Fe(
    !s.pathname || !s.pathname.includes("#"),
    kd("#", "pathname", "hash", s)
  ), Fe(
    !s.search || !s.search.includes("#"),
    kd("#", "search", "hash", s)
  ));
  let u = e === "" || s.pathname === "", c = u ? "/" : s.pathname, d;
  if (c == null)
    d = r;
  else {
    let g = a.length - 1;
    if (!l && c.startsWith("..")) {
      let v = c.split("/");
      for (; v[0] === ".."; )
        v.shift(), g -= 1;
      s.pathname = v.join("/");
    }
    d = g >= 0 ? a[g] : "/";
  }
  let p = C_(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var Fh = (e) => e.replace(/\/\/+/g, "/"), ra = (e) => Fh(e.join("/")), Iu = (e) => e.replace(/\/+$/, ""), R_ = (e) => Iu(e).replace(/^\/*/, "/"), T_ = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, M_ = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Cy = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, ic = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Ho(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function Zo(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return ra(a) || "/";
}
var Pb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Kb(e, a) {
  let r = e;
  if (typeof r != "string" || !Zb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (Pb)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), d = la(c.pathname, a);
      c.origin === u.origin && d != null ? r = d + c.search + c.hash : s = !0;
    } catch {
      Yt(
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
var Fi = Symbol("Uninstrumented");
function D_(e, a) {
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
    let s = hl(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = hl(d, c, () => {
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
      let c = u[Fi] ?? u, d = hl(
        r[s],
        c,
        (...p) => Ry(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Fi] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Fi] ?? s, c = hl(
      r.middleware,
      u,
      (...d) => Ry(d[0])
    );
    return c ? (c[Fi] = u, c) : s;
  })), l;
}
function A_(e, a) {
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
    let l = e.navigate[Fi] ?? e.navigate, s = hl(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? ka(c) : ".",
          ...Ty(e, d ?? {})
        };
      }
    );
    s && (s[Fi] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Fi] ?? e.fetch, s = hl(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...Ty(e, p ?? {})
      };
    });
    s && (s[Fi] = l, e.fetch = s);
  }
  return e;
}
function hl(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await Jb(
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
async function Jb(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Jb(e, a, r, l - 1), u = await c, Fe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function Ry(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: z_(a),
    params: { ...l },
    pattern: s,
    context: O_(r)
  };
}
function Ty(e, a) {
  return {
    currentUrl: ka(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function z_(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function O_(e) {
  if (L_(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var j_ = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function L_(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === j_;
}
var Wb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], H_ = new Set(
  Wb
), B_ = [
  "GET",
  ...Wb
], k_ = new Set(B_), e1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), U_ = /* @__PURE__ */ new Set([307, 308]), Ud = {
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
}, V_ = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, wo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, q_ = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), t1 = "remix-router-transitions", n1 = Symbol("ResetLoaderData"), pr, cl, Ii, fl, $_ = class {
  constructor(e) {
    To(this, pr), To(this, cl), To(this, Ii), To(this, fl), Ma(this, pr, e), Ma(this, cl, ju(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return aa(this, pr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return aa(this, Ii) ?? aa(this, pr);
  }
  /** Pre-computed branches */
  get branches() {
    return aa(this, fl) ?? aa(this, cl);
  }
  get hasHMRRoutes() {
    return aa(this, Ii) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Ma(this, pr, e), Ma(this, cl, ju(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Ma(this, Ii, e), Ma(this, fl, ju(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    aa(this, Ii) && (Ma(this, pr, aa(this, Ii)), Ma(this, cl, aa(this, fl)), Ma(this, Ii, void 0), Ma(this, fl, void 0));
  }
};
pr = /* @__PURE__ */ new WeakMap();
cl = /* @__PURE__ */ new WeakMap();
Ii = /* @__PURE__ */ new WeakMap();
fl = /* @__PURE__ */ new WeakMap();
function Y_(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || q_, u = s;
  if (e.instrumentations) {
    let U = e.instrumentations;
    u = (Z) => ({
      ...s(Z),
      ...D_(
        U.map((W) => W.route).filter(Boolean),
        Z
      )
    });
  }
  let c = {}, d = new $_(
    Lo(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || Z_, y = {
    ...e.future
  }, g = null, v = /* @__PURE__ */ new Set(), b = null, w = null, N = null, T = null, C = e.hydrationData != null, z = pa(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), E = !1, O = null, H, k;
  if (z == null && !e.patchRoutesOnNavigation) {
    let U = ia(404, {
      pathname: e.history.location.pathname
    }), { matches: Z, route: W } = hu(d.activeRoutes);
    H = !0, k = !H, z = Z, O = { [W.id]: U };
  } else if (z && !e.hydrationData && mn(
    z,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (z = null), z)
    if (z.some((U) => U.route.lazy))
      H = !1, k = !H;
    else if (!z.some((U) => Zh(U.route)))
      H = !0, k = !H;
    else {
      let U = e.hydrationData ? e.hydrationData.loaderData : null, Z = e.hydrationData ? e.hydrationData.errors : null, W = z;
      if (Z) {
        let de = z.findIndex(
          (pe) => Z[pe.route.id] !== void 0
        );
        W = W.slice(0, de + 1);
      }
      k = !1, H = !0, W.forEach((de) => {
        let pe = a1(de.route, U, Z);
        k = k || pe.renderFallback, H = H && !pe.shouldLoad;
      });
    }
  else {
    H = !1, k = !H, z = [];
    let U = mn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    U.active && U.matches && (E = !0, z = U.matches);
  }
  let B, A = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: z,
    initialized: H,
    renderFallback: k,
    navigation: Ud,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", le = null, Y = !1, K, re = !1, j = /* @__PURE__ */ new Map(), G = null, R = !1, L = !1, F = /* @__PURE__ */ new Set(), V = /* @__PURE__ */ new Map(), P = 0, D = -1, q = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), te = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), ee, ge = null;
  function ze() {
    if (g = e.history.listen(
      ({ action: U, location: Z, delta: W }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        Yt(
          me.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = Xn({
          currentLocation: A.location,
          nextLocation: Z,
          historyAction: U
        });
        if (de && W != null) {
          let pe = new Promise((Ee) => {
            ee = Ee;
          });
          e.history.go(W * -1), Dn(de, {
            state: "blocked",
            location: Z,
            proceed() {
              Dn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Z
              }), pe.then(() => e.history.go(W));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(de, wo), xe({ blockers: Ee });
            }
          }), le?.resolve(), le = null;
          return;
        }
        return Te(U, Z);
      }
    ), r) {
      d2(a, j);
      let U = () => h2(a, j);
      a.addEventListener("pagehide", U), G = () => a.removeEventListener("pagehide", U);
    }
    return A.initialized || Te("POP", A.location, {
      initialHydration: !0
    }), B;
  }
  function Re() {
    g && g(), G && G(), v.clear(), K && K.abort(), A.fetchers.forEach((U, Z) => tn(A.fetchers, Z)), A.blockers.forEach((U, Z) => sa(Z));
  }
  function we(U) {
    if (v.add(U), b) {
      let { newErrors: Z } = b;
      b = null, U(A, {
        deletedFetchers: [],
        newErrors: Z,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(U);
  }
  function xe(U, Z = {}) {
    U.matches && (U.matches = U.matches.map((pe) => {
      let Ee = c[pe.route.id], ve = pe.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...pe,
        route: Ee
      } : pe;
    })), A = {
      ...A,
      ...U
    };
    let W = [], de = [];
    A.fetchers.forEach((pe, Ee) => {
      pe.state === "idle" && (he.has(Ee) ? W.push(Ee) : de.push(Ee));
    }), he.forEach((pe) => {
      !A.fetchers.has(pe) && !V.has(pe) && W.push(pe);
    }), v.size === 0 && (b = { newErrors: U.errors ?? null }), [...v].forEach(
      (pe) => pe(A, {
        deletedFetchers: W,
        newErrors: U.errors ?? null,
        viewTransitionOpts: Z.viewTransitionOpts,
        flushSync: Z.flushSync === !0
      })
    ), W.forEach((pe) => tn(A.fetchers, pe)), de.forEach((pe) => A.fetchers.delete(pe));
  }
  function Ce(U, Z, { flushSync: W } = {}) {
    let de = A.actionData != null && A.navigation.formMethod != null && dn(A.navigation.formMethod) && A.navigation.state === "loading" && U.state?._isRedirect !== !0, pe;
    Z.actionData ? Object.keys(Z.actionData).length > 0 ? pe = Z.actionData : pe = null : de ? pe = A.actionData : pe = null;
    let Ee = Z.loaderData ? Uy(
      A.loaderData,
      Z.loaderData,
      Z.matches || [],
      Z.errors
    ) : A.loaderData, ve = A.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((De, Ue) => ve.set(Ue, wo)));
    let Se = R ? !1 : Vt(U, Z.matches || A.matches), be = Y === !0 || A.navigation.formMethod != null && dn(A.navigation.formMethod) && U.state?._isRedirect !== !0;
    d.commitHmrRoutes(), R || I === "POP" || (I === "PUSH" ? e.history.push(U, U.state) : I === "REPLACE" && e.history.replace(U, U.state));
    let Me;
    if (I === "POP") {
      let De = j.get(A.location.pathname);
      De && De.has(U.pathname) ? Me = {
        currentLocation: A.location,
        nextLocation: U
      } : j.has(U.pathname) && (Me = {
        currentLocation: U,
        nextLocation: A.location
      });
    } else if (re) {
      let De = j.get(A.location.pathname);
      De ? De.add(U.pathname) : (De = /* @__PURE__ */ new Set([U.pathname]), j.set(A.location.pathname, De)), Me = {
        currentLocation: A.location,
        nextLocation: U
      };
    }
    xe(
      {
        ...Z,
        // matches, errors, fetchers go through as-is
        actionData: pe,
        loaderData: Ee,
        historyAction: I,
        location: U,
        initialized: !0,
        renderFallback: !1,
        navigation: Ud,
        revalidation: "idle",
        restoreScrollPosition: Se,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Me,
        flushSync: W === !0
      }
    ), I = "POP", Y = !1, re = !1, R = !1, L = !1, le?.resolve(), le = null, ge?.resolve(), ge = null;
  }
  async function $e(U, Z) {
    if (le?.resolve(), le = null, typeof U == "number") {
      le || (le = Yy());
      let rt = le.promise;
      return e.history.go(U), rt;
    }
    let W = dh(
      A.location,
      A.matches,
      p,
      U,
      Z?.fromRouteId,
      Z?.relative
    ), { path: de, submission: pe, error: Ee } = My(
      !1,
      W,
      Z
    ), ve;
    Z?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Z.mask == "string" ? Sa(Z.mask) : {
        ...A.location.mask,
        ...Z.mask
      }
    });
    let Se = A.location, be = fh(
      Se,
      de,
      Z && Z.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...e.history.encodeLocation(be)
    };
    let Me = Z && Z.replace != null ? Z.replace : void 0, De = "PUSH";
    Me === !0 ? De = "REPLACE" : Me === !1 || pe != null && dn(pe.formMethod) && pe.formAction === A.location.pathname + A.location.search && (De = "REPLACE");
    let Ue = Z && "preventScrollReset" in Z ? Z.preventScrollReset === !0 : void 0, je = (Z && Z.flushSync) === !0, Ge = Xn({
      currentLocation: Se,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      Dn(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          Dn(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), $e(U, Z);
        },
        reset() {
          let rt = new Map(A.blockers);
          rt.set(Ge, wo), xe({ blockers: rt });
        }
      });
      return;
    }
    await Te(De, be, {
      submission: pe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Ue,
      replace: Z && Z.replace,
      enableViewTransition: Z && Z.viewTransition,
      flushSync: je,
      callSiteDefaultShouldRevalidate: Z && Z.defaultShouldRevalidate
    });
  }
  function ft() {
    ge || (ge = Yy()), Lt(), xe({ revalidation: "loading" });
    let U = ge.promise;
    return A.navigation.state === "submitting" ? U : A.navigation.state === "idle" ? (Te(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), U) : (Te(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: re === !0
      }
    ), U);
  }
  async function Te(U, Z, W) {
    K && K.abort(), K = null, I = U, R = (W && W.startUninterruptedRevalidation) === !0, Ht(A.location, A.matches), Y = (W && W.preventScrollReset) === !0, re = (W && W.enableViewTransition) === !0;
    let de = d.activeRoutes, pe = W?.initialHydration && A.matches && A.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : pa(
      de,
      Z,
      p,
      !1,
      d.branches
    ), Ee = (W && W.flushSync) === !0;
    if (pe && A.initialized && !L && n2(A.location, Z) && !(W && W.submission && dn(W.submission.formMethod))) {
      Ce(Z, { matches: pe }, { flushSync: Ee });
      return;
    }
    let ve = mn(pe, de, Z.pathname);
    if (ve.active && ve.matches && (pe = ve.matches), !pe) {
      let { error: st, notFoundMatches: We, route: jt } = un(
        Z.pathname
      );
      Ce(
        Z,
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
    let Se = W && W.overrideNavigation ? {
      ...W.overrideNavigation,
      matches: pe,
      historyAction: U
    } : void 0;
    K = new AbortController();
    let be = dl(
      e.history,
      Z,
      K.signal,
      W && W.submission
    ), Me = e.getContext ? await e.getContext() : new wy(), De;
    if (W && W.pendingError)
      De = [
        Gi(pe).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && dn(W.submission.formMethod)) {
      let st = await Xe(
        be,
        Z,
        W.submission,
        pe,
        U,
        Me,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, jt] = st.pendingActionResult;
        if (qn(jt) && Ho(jt.error) && jt.error.status === 404) {
          K = null, Ce(Z, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: jt.error
            }
          });
          return;
        }
      }
      pe = st.matches || pe, De = st.pendingActionResult, Se = Vd(
        Z,
        pe,
        U,
        W.submission
      ), Ee = !1, ve.active = !1, be = dl(
        e.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: je,
      loaderData: Ge,
      errors: rt,
      workingFetchers: Ct
    } = await Be(
      be,
      Z,
      pe,
      U,
      Me,
      ve.active,
      Se,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      De,
      W && W.callSiteDefaultShouldRevalidate
    );
    Ue || (K = null, Ce(Z, {
      matches: je || pe,
      ...Vy(De),
      loaderData: Ge,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Xe(U, Z, W, de, pe, Ee, ve, Se, be = {}) {
    Lt();
    let Me = c2(
      Z,
      de,
      pe,
      W
    );
    if (xe({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await pt(
        de,
        Z.pathname,
        U.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = hu(
            d.activeRoutes
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
        let Ge = Gi(je.partialMatches).route.id;
        return {
          matches: je.partialMatches,
          pendingActionResult: [
            Ge,
            {
              type: "error",
              error: je.error
            }
          ]
        };
      } else if (je.matches)
        de = je.matches;
      else {
        let { notFoundMatches: Ge, error: rt, route: Ct } = un(
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
    let De, Ue = Lu(de, Z);
    if (!Ue.route.action && !Ue.route.lazy)
      De = {
        type: "error",
        error: ia(405, {
          method: U.method,
          pathname: Z.pathname,
          routeId: Ue.route.id
        })
      };
    else {
      let je = gl(
        u,
        c,
        U,
        Z,
        de,
        Ue,
        Se ? [] : l,
        Ee
      ), Ge = await yt(
        U,
        Z,
        je,
        Ee,
        null
      );
      if (De = Ge[Ue.route.id], !De) {
        for (let rt of de)
          if (Ge[rt.route.id]) {
            De = Ge[rt.route.id];
            break;
          }
      }
      if (U.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (yr(De)) {
      let je;
      return be && be.replace != null ? je = be.replace : je = Hy(
        De.response.headers.get("Location"),
        new URL(U.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await gt(U, De, !0, {
        submission: W,
        replace: je
      }), { shortCircuited: !0 };
    }
    if (qn(De)) {
      let je = Gi(de, Ue.route.id);
      return (be && be.replace) !== !0 && (I = "PUSH"), {
        matches: de,
        pendingActionResult: [
          je.route.id,
          De,
          Ue.route.id
        ]
      };
    }
    return {
      matches: de,
      pendingActionResult: [Ue.route.id, De]
    };
  }
  async function Be(U, Z, W, de, pe, Ee, ve, Se, be, Me, De, Ue, je, Ge) {
    let rt = ve || Vd(Z, W, de, Se), Ct = Se || be || $y(rt), st = !R && !De;
    if (Ee) {
      if (st) {
        let bt = Ye(je);
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
      let ke = await pt(
        W,
        Z.pathname,
        U.signal
      );
      if (ke.type === "aborted")
        return { shortCircuited: !0 };
      if (ke.type === "error") {
        if (ke.partialMatches.length === 0) {
          let { matches: pn, route: zn } = hu(
            d.activeRoutes
          );
          return {
            matches: pn,
            loaderData: {},
            errors: {
              [zn.id]: ke.error
            }
          };
        }
        let bt = Gi(ke.partialMatches).route.id;
        return {
          matches: ke.partialMatches,
          loaderData: {},
          errors: {
            [bt]: ke.error
          }
        };
      } else if (ke.matches)
        W = ke.matches;
      else {
        let { error: bt, notFoundMatches: pn, route: zn } = un(
          Z.pathname
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
    let We = d.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = Dy(
      U,
      pe,
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
      he,
      te,
      Q,
      We,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      je,
      Ge
    );
    if (D = ++P, !e.dataStrategy && !jt.some((ke) => ke.shouldLoad) && !jt.some(
      (ke) => ke.route.middleware && ke.route.middleware.length > 0
    ) && at.length === 0) {
      let ke = new Map(A.fetchers), bt = mi(ke);
      return Ce(
        Z,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: je && qn(je[1]) ? { [je[0]]: je[1].error } : null,
          ...Vy(je),
          ...bt ? { fetchers: ke } : {}
        },
        { flushSync: Ue }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let ke = {};
      if (!Ee) {
        ke.navigation = rt;
        let bt = Ye(je);
        bt !== void 0 && (ke.actionData = bt);
      }
      at.length > 0 && (ke.fetchers = wt(at)), xe(ke, { flushSync: Ue });
    }
    at.forEach((ke) => {
      Ot(ke.key), ke.controller && V.set(ke.key, ke.controller);
    });
    let _a = () => at.forEach((ke) => Ot(ke.key));
    K && K.signal.addEventListener(
      "abort",
      _a
    );
    let { loaderResults: An, fetcherResults: cn } = await It(
      jt,
      at,
      U,
      Z,
      pe
    );
    if (U.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      _a
    ), at.forEach((ke) => V.delete(ke.key));
    let nn = mu(An);
    if (nn)
      return await gt(U, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (nn = mu(cn), nn)
      return Q.add(nn.key), await gt(U, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let xn = new Map(A.fetchers), { loaderData: pi, errors: Sn } = ky(
      A,
      W,
      An,
      je,
      at,
      cn,
      xn
    );
    De && A.errors && (Sn = { ...A.errors, ...Sn });
    let gi = mi(xn), ca = Ea(
      D,
      xn
    ), fa = gi || ca || at.length > 0;
    return {
      matches: W,
      loaderData: pi,
      errors: Sn,
      ...fa ? { workingFetchers: xn } : {}
    };
  }
  function Ye(U) {
    if (U && !qn(U[1]))
      return {
        [U[0]]: U[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function wt(U) {
    let Z = new Map(A.fetchers);
    return U.forEach((W) => {
      let de = Z.get(W.key), pe = Eo(
        void 0,
        de ? de.data : void 0
      );
      Z.set(W.key, pe);
    }), Z;
  }
  async function Je(U, Z, W, de) {
    Ot(U);
    let pe = (de && de.flushSync) === !0, Ee = d.activeRoutes, ve = dh(
      A.location,
      A.matches,
      p,
      W,
      Z,
      de?.relative
    ), Se = pa(
      Ee,
      ve,
      p,
      !1,
      d.branches
    ), be = mn(Se, Ee, ve);
    if (be.active && be.matches && (Se = be.matches), !Se) {
      ot(
        U,
        Z,
        ia(404, { pathname: ve }),
        { flushSync: pe }
      );
      return;
    }
    let { path: Me, submission: De, error: Ue } = My(
      !0,
      ve,
      de
    );
    if (Ue) {
      ot(U, Z, Ue, { flushSync: pe });
      return;
    }
    let je = e.getContext ? await e.getContext() : new wy(), Ge = (de && de.preventScrollReset) === !0;
    if (De && dn(De.formMethod)) {
      await Ze(
        U,
        Z,
        Me,
        Se,
        je,
        be.active,
        pe,
        Ge,
        De,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    te.set(U, { routeId: Z, path: Me }), await Qe(
      U,
      Z,
      Me,
      Se,
      je,
      be.active,
      pe,
      Ge,
      De
    );
  }
  async function Ze(U, Z, W, de, pe, Ee, ve, Se, be, Me) {
    Lt(), te.delete(U);
    let De = A.fetchers.get(U);
    mt(U, f2(be, De), {
      flushSync: ve
    });
    let Ue = new AbortController(), je = dl(
      e.history,
      W,
      Ue.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        de,
        new URL(je.url).pathname,
        je.signal,
        U
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(U, Z, dt.error, { flushSync: ve });
        return;
      } else if (dt.matches)
        de = dt.matches;
      else {
        ot(
          U,
          Z,
          ia(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ge = Lu(de, W);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = ia(405, {
        method: be.formMethod,
        pathname: W,
        routeId: Z
      });
      ot(U, Z, dt, { flushSync: ve });
      return;
    }
    V.set(U, Ue);
    let rt = P, Ct = gl(
      u,
      c,
      je,
      W,
      de,
      Ge,
      l,
      pe
    ), st = await yt(
      je,
      W,
      Ct,
      pe,
      U
    ), We = st[Ge.route.id];
    if (!We) {
      for (let dt of Ct)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (je.signal.aborted) {
      V.get(U) === Ue && V.delete(U);
      return;
    }
    if (he.has(U)) {
      if (yr(We) || qn(We)) {
        mt(U, Aa(void 0));
        return;
      }
    } else {
      if (yr(We))
        if (V.delete(U), D > rt) {
          mt(U, Aa(void 0));
          return;
        } else
          return Q.add(U), mt(U, Eo(be)), gt(je, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: Se
          });
      if (qn(We)) {
        ot(U, Z, We.error);
        return;
      }
    }
    let jt = A.navigation.location || A.location, at = dl(
      e.history,
      jt,
      Ue.signal
    ), _a = d.activeRoutes, An = A.navigation.state !== "idle" ? pa(
      _a,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Fe(An, "Didn't find any matches after fetcher action");
    let cn = ++P;
    q.set(U, cn);
    let { dsMatches: nn, revalidatingFetchers: xn } = Dy(
      at,
      pe,
      u,
      c,
      e.history,
      A,
      An,
      be,
      jt,
      l,
      !1,
      L,
      F,
      he,
      te,
      Q,
      _a,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Ge.route.id, We],
      Me
    ), pi = Eo(be, We.data), Sn = new Map(A.fetchers);
    Sn.set(U, pi), xn.filter((dt) => dt.key !== U).forEach((dt) => {
      let Fn = dt.key, an = Sn.get(Fn), Qi = Eo(
        void 0,
        an ? an.data : void 0
      );
      Sn.set(Fn, Qi), Ot(Fn), dt.controller && V.set(Fn, dt.controller);
    }), xe({ fetchers: Sn });
    let gi = () => xn.forEach((dt) => Ot(dt.key));
    Ue.signal.addEventListener(
      "abort",
      gi
    );
    let { loaderResults: ca, fetcherResults: fa } = await It(
      nn,
      xn,
      at,
      jt,
      pe
    );
    if (Ue.signal.aborted)
      return;
    Ue.signal.removeEventListener(
      "abort",
      gi
    ), q.delete(U), V.delete(U), xn.forEach((dt) => V.delete(dt.key));
    let ke = A.fetchers.has(U), bt = (dt) => {
      if (!ke) return dt;
      let Fn = new Map(dt.fetchers);
      return Fn.set(U, Aa(We.data)), { ...dt, fetchers: Fn };
    }, pn = mu(ca);
    if (pn)
      return A = bt(A), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: Se }
      );
    if (pn = mu(fa), pn)
      return Q.add(pn.key), A = bt(A), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: Se }
      );
    let zn = new Map(A.fetchers);
    ke && zn.set(U, Aa(We.data));
    let { loaderData: yi, errors: qa } = ky(
      A,
      An,
      ca,
      void 0,
      xn,
      fa,
      zn
    );
    Ea(cn, zn), A.navigation.state === "loading" && cn > D ? (Fe(I, "Expected pending action"), K && K.abort(), Ce(A.navigation.location, {
      matches: An,
      loaderData: yi,
      errors: qa,
      fetchers: zn
    })) : (xe({
      errors: qa,
      loaderData: Uy(
        A.loaderData,
        yi,
        An,
        qa
      ),
      fetchers: zn
    }), L = !1);
  }
  async function Qe(U, Z, W, de, pe, Ee, ve, Se, be) {
    let Me = A.fetchers.get(U);
    mt(
      U,
      Eo(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let De = new AbortController(), Ue = dl(
      e.history,
      W,
      De.signal
    );
    if (Ee) {
      let We = await pt(
        de,
        new URL(Ue.url).pathname,
        Ue.signal,
        U
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(U, Z, We.error, { flushSync: ve });
        return;
      } else if (We.matches)
        de = We.matches;
      else {
        ot(
          U,
          Z,
          ia(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let je = Lu(de, W);
    V.set(U, De);
    let Ge = P, rt = gl(
      u,
      c,
      Ue,
      W,
      de,
      je,
      l,
      pe
    ), Ct = await yt(
      Ue,
      W,
      rt,
      pe,
      U
    ), st = Ct[je.route.id];
    if (!st) {
      for (let We of de)
        if (Ct[We.route.id]) {
          st = Ct[We.route.id];
          break;
        }
    }
    if (V.get(U) === De && V.delete(U), !Ue.signal.aborted) {
      if (he.has(U)) {
        mt(U, Aa(void 0));
        return;
      }
      if (yr(st))
        if (D > Ge) {
          mt(U, Aa(void 0));
          return;
        } else {
          Q.add(U), await gt(Ue, st, !1, {
            preventScrollReset: Se
          });
          return;
        }
      if (qn(st)) {
        ot(U, Z, st.error);
        return;
      }
      mt(U, Aa(st.data));
    }
  }
  async function gt(U, Z, W, {
    submission: de,
    fetcherSubmission: pe,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    W || (le?.resolve(), le = null), Z.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let Se = Z.response.headers.get("Location");
    Fe(Se, "Expected a Location header on the redirect Response"), Se = Hy(
      Se,
      new URL(U.url),
      p,
      e.history
    );
    let be = fh(A.location, Se, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Z.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (Gh(Se)) {
        const Ct = l_(a, Se, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        la(Ct.pathname, p) == null;
      }
      if (rt) {
        ve ? a.location.replace(Se) : a.location.assign(Se);
        return;
      }
    }
    K = null;
    let Me = ve === !0 || Z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: Ue, formEncType: je } = A.navigation;
    !de && !pe && De && Ue && je && (de = $y(A.navigation));
    let Ge = de || pe;
    if (U_.has(Z.response.status) && Ge && dn(Ge.formMethod))
      await Te(Me, be, {
        submission: {
          ...Ge,
          formAction: Se
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || Y,
        enableViewTransition: W ? re : void 0
      });
    else {
      let rt = Vd(
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
        preventScrollReset: Ee || Y,
        enableViewTransition: W ? re : void 0
      });
    }
  }
  async function yt(U, Z, W, de, pe) {
    let Ee, ve = {};
    try {
      Ee = await P_(
        m,
        U,
        Z,
        W,
        pe,
        de,
        !1
      );
    } catch (Se) {
      return W.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: Se
        };
      }), ve;
    }
    if (U.signal.aborted)
      return ve;
    if (!dn(U.method))
      for (let Se of W) {
        if (Ee[Se.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(Se.route.id) && !A.loaderData.hasOwnProperty(Se.route.id) && (!A.errors || !A.errors.hasOwnProperty(Se.route.id)) && Se.shouldCallHandler() && (Ee[Se.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Se.route.id}`
          )
        });
      }
    for (let [Se, be] of Object.entries(Ee))
      if (l2(be)) {
        let Me = be.result;
        ve[Se] = {
          type: "redirect",
          response: e2(
            Me,
            U,
            Se,
            W,
            p
          )
        };
      } else
        ve[Se] = await W_(be);
    return ve;
  }
  async function It(U, Z, W, de, pe) {
    let Ee = yt(
      W,
      de,
      U,
      pe,
      null
    ), ve = Promise.all(
      Z.map(async (Me) => {
        if (Me.matches && Me.match && Me.request && Me.controller) {
          let Ue = (await yt(
            Me.request,
            Me.path,
            Me.matches,
            pe,
            Me.key
          ))[Me.match.route.id];
          return { [Me.key]: Ue };
        } else
          return Promise.resolve({
            [Me.key]: {
              type: "error",
              error: ia(404, {
                pathname: Me.path
              })
            }
          });
      })
    ), Se = await Ee, be = (await ve).reduce(
      (Me, De) => Object.assign(Me, De),
      {}
    );
    return {
      loaderResults: Se,
      fetcherResults: be
    };
  }
  function Lt() {
    L = !0, te.forEach((U, Z) => {
      V.has(Z) && F.add(Z), Ot(Z);
    });
  }
  function mt(U, Z, W = {}) {
    let de = new Map(A.fetchers);
    de.set(U, Z), xe(
      { fetchers: de },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function ot(U, Z, W, de = {}) {
    let pe = Gi(A.matches, Z), Ee = new Map(A.fetchers);
    tn(Ee, U), xe(
      {
        errors: {
          [pe.route.id]: W
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function Gn(U) {
    return se.set(U, (se.get(U) || 0) + 1), he.has(U) && he.delete(U), A.fetchers.get(U) || V_;
  }
  function vn(U, Z) {
    Ot(U, Z?.reason), mt(U, Aa(null));
  }
  function tn(U, Z) {
    let W = A.fetchers.get(Z);
    V.has(Z) && !(W && W.state === "loading" && q.has(Z)) && Ot(Z), te.delete(Z), q.delete(Z), Q.delete(Z), he.delete(Z), F.delete(Z), U.delete(Z);
  }
  function Pt(U) {
    let Z = (se.get(U) || 0) - 1;
    Z <= 0 ? (se.delete(U), he.add(U)) : se.set(U, Z), xe({ fetchers: new Map(A.fetchers) });
  }
  function Ot(U, Z) {
    let W = V.get(U);
    W && (W.abort(Z), V.delete(U));
  }
  function Ut(U, Z) {
    for (let W of U) {
      let de = Z.get(W);
      Fe(de, `Expected fetcher: ${W}`);
      let pe = Aa(de.data);
      Z.set(W, pe);
    }
  }
  function mi(U) {
    let Z = [], W = !1;
    for (let de of Q) {
      let pe = U.get(de);
      Fe(pe, `Expected fetcher: ${de}`), pe.state === "loading" && (Q.delete(de), Z.push(de), W = !0);
    }
    return Ut(Z, U), W;
  }
  function Ea(U, Z) {
    let W = [];
    for (let [de, pe] of q)
      if (pe < U) {
        let Ee = Z.get(de);
        Fe(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Ot(de), q.delete(de), W.push(de));
      }
    return Ut(W, Z), W.length > 0;
  }
  function bn(U, Z) {
    let W = A.blockers.get(U) || wo;
    return me.get(U) !== Z && me.set(U, Z), W;
  }
  function sa(U) {
    A.blockers.delete(U), me.delete(U);
  }
  function Dn(U, Z) {
    let W = A.blockers.get(U) || wo;
    Fe(
      W.state === "unblocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "proceeding" || W.state === "blocked" && Z.state === "unblocked" || W.state === "proceeding" && Z.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${Z.state}`
    );
    let de = new Map(A.blockers);
    de.set(U, Z), xe({ blockers: de });
  }
  function Xn({
    currentLocation: U,
    nextLocation: Z,
    historyAction: W
  }) {
    if (me.size === 0)
      return;
    me.size > 1 && Yt(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [pe, Ee] = de[de.length - 1], ve = A.blockers.get(pe);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: U, nextLocation: Z, historyAction: W }))
      return pe;
  }
  function un(U) {
    let Z = ia(404, { pathname: U }), W = d.activeRoutes, { matches: de, route: pe } = hu(W);
    return { notFoundMatches: de, route: pe, error: Z };
  }
  function He(U, Z, W) {
    if (w = U, T = Z, N = W || null, !C && A.navigation === Ud) {
      C = !0;
      let de = Vt(A.location, A.matches);
      de != null && xe({ restoreScrollPosition: de });
    }
    return () => {
      w = null, T = null, N = null;
    };
  }
  function vt(U, Z) {
    return N && N(
      U,
      Z.map((de) => d_(de, A.loaderData))
    ) || U.key;
  }
  function Ht(U, Z) {
    if (w && T) {
      let W = vt(U, Z);
      w[W] = T();
    }
  }
  function Vt(U, Z) {
    if (w) {
      let W = vt(U, Z), de = w[W];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function mn(U, Z, W) {
    if (e.patchRoutesOnNavigation) {
      let de = d.branches;
      if (U) {
        if (Object.keys(U[0].params).length > 0)
          return { active: !0, matches: pa(
            Z,
            W,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: pa(
          Z,
          W,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(U, Z, W, de) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: U };
    let pe = U;
    for (; ; ) {
      let Ee = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: W,
          path: Z,
          matches: pe,
          fetcherKey: de,
          patch: (Me, De) => {
            W.aborted || Ay(
              Me,
              De,
              d,
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
      let ve = d.branches, Se = pa(
        d.activeRoutes,
        Z,
        p,
        !1,
        ve
      ), be = null;
      if (Se) {
        if (Object.keys(Se[0].params).length === 0)
          return { type: "success", matches: Se };
        if (be = pa(
          d.activeRoutes,
          Z,
          p,
          !0,
          ve
        ), !(be && pe.length < be.length && Kt(
          pe,
          be.slice(0, pe.length)
        )))
          return { type: "success", matches: Se };
      }
      if (be || (be = pa(
        d.activeRoutes,
        Z,
        p,
        !0,
        ve
      )), !be || Kt(pe, be))
        return { type: "success", matches: null };
      pe = be;
    }
  }
  function Kt(U, Z) {
    return U.length === Z.length && U.every((W, de) => W.route.id === Z[de].route.id);
  }
  function ua(U) {
    c = {}, d.setHmrRoutes(
      Lo(
        U,
        u,
        void 0,
        c
      )
    );
  }
  function Wt(U, Z, W = !1) {
    Ay(
      U,
      Z,
      d,
      c,
      u,
      W
    ), d.hasHMRRoutes || xe({});
  }
  return B = {
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
    initialize: ze,
    subscribe: we,
    enableScrollRestoration: He,
    navigate: $e,
    fetch: Je,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (U) => e.history.createHref(U),
    encodeLocation: (U) => e.history.encodeLocation(U),
    getFetcher: Gn,
    resetFetcher: vn,
    deleteFetcher: Pt,
    dispose: Re,
    getBlocker: bn,
    deleteBlocker: sa,
    patchRoutes: Wt,
    _internalFetchControllers: V,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ua,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(U) {
      xe(U);
    }
  }, e.instrumentations && (B = A_(
    B,
    e.instrumentations.map((U) => U.router).filter(Boolean)
  )), B;
}
function I_(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function dh(e, a, r, l, s, u) {
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
  let p = ac(
    l || ".",
    Xh(c),
    la(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = Ph(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((b) => b).forEach((b) => y.append("index", b));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (p.pathname = N_({ basename: r, pathname: p.pathname })), ka(p);
}
function My(e, a, r) {
  if (!r || !I_(r))
    return { path: a };
  if (r.formMethod && !u2(r.formMethod))
    return {
      path: a,
      error: ia(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: ia(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = c1(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!dn(u))
        return l();
      let g = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
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
          text: g
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!dn(u))
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
    d = mh(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = mh(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = By(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = By(d);
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
  if (dn(m.formMethod))
    return { path: a, submission: m };
  let y = Sa(a);
  return e && y.search && Ph(y.search) && d.append("index", ""), y.search = `?${d}`, { path: ka(y), submission: m };
}
function Dy(e, a, r, l, s, u, c, d, p, m, y, g, v, b, w, N, T, C, z, E, O, H) {
  let k = O ? qn(O[1]) ? O[1].error : O[1].data : void 0, B = s.createURL(u.location), A = s.createURL(p), I;
  if (y && u.errors) {
    let R = Object.keys(u.errors)[0];
    I = c.findIndex((L) => L.route.id === R);
  } else if (O && qn(O[1])) {
    let R = O[0];
    I = c.findIndex((L) => L.route.id === R) - 1;
  }
  let le = O ? O[1].statusCode : void 0, Y = le && le >= 400, K = {
    currentUrl: B,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: k,
    actionStatus: le
  }, re = Zo(c), j = c.map((R, L) => {
    let { route: F } = R, V = null;
    if (I != null && L > I)
      V = !1;
    else if (F.lazy)
      V = !0;
    else if (!Zh(F))
      V = !1;
    else if (y) {
      let { shouldLoad: Q } = a1(
        F,
        u.loaderData,
        u.errors
      );
      V = Q;
    } else G_(u.loaderData, u.matches[L], R) && (V = !0);
    if (V !== null)
      return hh(
        r,
        l,
        e,
        p,
        re,
        R,
        m,
        a,
        V
      );
    let P = !1;
    typeof H == "boolean" ? P = H : Y ? P = !1 : (g || B.pathname + B.search === A.pathname + A.search || B.search !== A.search || X_(u.matches[L], R)) && (P = !0);
    let D = {
      ...K,
      defaultShouldRevalidate: P
    }, q = zo(R, D);
    return hh(
      r,
      l,
      e,
      p,
      re,
      R,
      m,
      a,
      q,
      D,
      H
    );
  }), G = [];
  return w.forEach((R, L) => {
    if (y || !c.some((se) => se.route.id === R.routeId) || b.has(L))
      return;
    let F = u.fetchers.get(L), V = F && F.state !== "idle" && F.data === void 0, P = pa(
      T,
      R.path,
      C ?? "/",
      !1,
      E
    );
    if (!P) {
      if (z && V)
        return;
      G.push({
        key: L,
        routeId: R.routeId,
        path: R.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(L))
      return;
    let D = Lu(P, R.path), q = new AbortController(), Q = dl(
      s,
      R.path,
      q.signal
    ), te = null;
    if (v.has(L))
      v.delete(L), te = gl(
        r,
        l,
        Q,
        R.path,
        P,
        D,
        m,
        a
      );
    else if (V)
      g && (te = gl(
        r,
        l,
        Q,
        R.path,
        P,
        D,
        m,
        a
      ));
    else {
      let se;
      typeof H == "boolean" ? se = H : Y ? se = !1 : se = g;
      let he = {
        ...K,
        defaultShouldRevalidate: se
      };
      zo(D, he) && (te = gl(
        r,
        l,
        Q,
        R.path,
        P,
        D,
        m,
        a,
        he
      ));
    }
    te && G.push({
      key: L,
      routeId: R.routeId,
      path: R.path,
      matches: te,
      match: D,
      request: Q,
      controller: q
    });
  }), { dsMatches: j, revalidatingFetchers: G };
}
function Zh(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function a1(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Zh(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function G_(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function X_(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function zo(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Ay(e, a, r, l, s, u) {
  let c;
  if (e) {
    let m = l[e];
    Fe(
      m,
      `No route found to patch children into: routeId = ${e}`
    ), m.children || (m.children = []), c = m.children;
  } else
    c = r.activeRoutes;
  let d = [], p = [];
  if (a.forEach((m) => {
    let y = c.find(
      (g) => i1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Lo(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], v = y, [b] = Lo(
        [g],
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
function i1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => i1(r, s))
  ) ?? !1 : !1;
}
var zy = /* @__PURE__ */ new WeakMap(), r1 = ({
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
  let c = zy.get(s);
  c || (c = {}, zy.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = s_(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
    if (m)
      Yt(
        !m,
        "Route property " + e + " is not a supported lazy route property. This property will be ignored."
      ), c[e] = Promise.resolve();
    else if (g)
      Yt(
        !1,
        `Route "${s.id}" has a static property "${e}" defined. The lazy property will be ignored.`
      );
    else {
      let v = await u();
      v != null && (Object.assign(s, { [e]: v }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[e] = void 0, Object.values(s.lazy).every((v) => v === void 0) && (s.lazy = void 0));
  })();
  return c[e] = p, p;
}, Oy = /* @__PURE__ */ new WeakMap();
function F_(e, a, r, l, s) {
  let u = r[e.id];
  if (Fe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = Oy.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let g = (async () => {
      Fe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let v = await e.lazy(), b = {};
      for (let w in v) {
        let N = v[w];
        if (N === void 0)
          continue;
        let T = c_(w), z = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        T ? Yt(
          !T,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? Yt(
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
    return Oy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = r1({
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
async function jy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function Z_(e) {
  return e.matches.some((a) => a.route.middleware) ? l1(e, () => jy(e)) : jy(e);
}
function l1(e, a) {
  return Q_(
    e,
    a,
    (l) => {
      if (s2(l))
        throw l;
      return l;
    },
    i2,
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
      ), p = Gi(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function Q_(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await o1(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function o1(e, a, r, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await r();
  let [m, y] = p, g, v = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await o1(
        e,
        a,
        r,
        l,
        s,
        u,
        c + 1
      ) }, g.value;
    } catch (b) {
      return g = { value: await u(b, m, g) }, g.value;
    }
  };
  try {
    let b = await y(e, v), w = b != null ? l(b) : void 0;
    return s(w) ? w : g ? w ?? g.value : (g = { value: await v() }, g.value);
  } catch (b) {
    return await u(b, m, g);
  }
}
function s1(e, a, r, l, s) {
  let u = r1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = F_(
    l.route,
    dn(r.method) ? "action" : "loader",
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
function hh(e, a, r, l, s, u, c, d, p, m = null, y) {
  let g = !1, v = s1(
    e,
    a,
    r,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: v,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(b) {
      return g = !0, m ? typeof y == "boolean" ? zo(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof b == "boolean" ? zo(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : zo(u, m) : p;
    },
    resolve(b) {
      let { lazy: w, loader: N, middleware: T } = u.route, C = g || p || b && !dn(r.method) && (w || N), z = T && T.length > 0 && !N && !w;
      return C && (dn(r.method) || !z) ? K_({
        request: r,
        path: l,
        pattern: s,
        match: u,
        lazyHandlerPromise: v?.handler,
        lazyRoutePromise: v?.route,
        handlerOverride: b,
        scopedContext: d
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function gl(e, a, r, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: s1(
      e,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : hh(
    e,
    a,
    r,
    l,
    Zo(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function P_(e, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: u1(a, r),
    pattern: Zo(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return l1(g, () => y({
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
async function K_({
  request: e,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, y = dn(e.method), g = y ? "action" : "loader", v = (b) => {
    let w, N = new Promise((z, E) => w = E);
    m = () => w(), e.signal.addEventListener("abort", m);
    let T = (z) => typeof b != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : b(
      {
        request: e,
        url: u1(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...z !== void 0 ? [z] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => T(E)) : T()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([C, N]);
  };
  try {
    let b = y ? l.route.action : l.route.loader;
    if (s || u)
      if (b) {
        let w, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(b).catch((T) => {
            w = T;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (w !== void 0)
          throw w;
        p = N;
      } else {
        await s;
        let w = y ? l.route.action : l.route.loader;
        if (w)
          [p] = await Promise.all([v(w), u]);
        else if (g === "action") {
          let N = new URL(e.url), T = N.pathname + N.search;
          throw ia(405, {
            method: e.method,
            pathname: T,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (b)
      p = await v(b);
    else {
      let w = new URL(e.url), N = w.pathname + w.search;
      throw ia(404, {
        pathname: N
      });
    }
  } catch (b) {
    return { type: "error", result: b };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function J_(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function W_(e) {
  let { result: a, type: r } = e;
  if (Qh(a)) {
    let l;
    try {
      l = await J_(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new ic(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? qy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a2(a),
    statusCode: Ho(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Ho(a) ? a.status : void 0
  } : qy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function e2(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Fe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Gh(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = dh(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var Ly = [
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
function Hy(e, a, r, l) {
  if (Gh(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (Ly.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = la(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return Fh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (Ly.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function dl(e, a, r, l) {
  let s = e.createURL(c1(a)).toString(), u = { signal: r };
  if (l && dn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = mh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function u1(e, a) {
  let r = new URL(e.url), l = typeof a == "string" ? Sa(a) : a;
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
function mh(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function By(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function t2(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = r && qn(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let v = g.route.id, b = a[v];
    if (Fe(
      !yr(b),
      "Cannot handle redirect results in processLoaderData"
    ), qn(b)) {
      let w = b.error;
      if (y !== void 0 && (w = y, y = void 0), c = c || {}, s)
        c[v] = w;
      else {
        let N = Gi(e, v);
        c[N.route.id] == null && (c[N.route.id] = w);
      }
      l || (u[v] = n1), p || (p = !0, d = Ho(b.error) ? b.error.status : 500), b.headers && (m[v] = b.headers);
    } else
      u[v] = b.data, b.statusCode && b.statusCode !== 200 && !p && (d = b.statusCode), b.headers && (m[v] = b.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function ky(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = t2(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: v } = m;
    if (v && v.signal.aborted)
      return;
    let b = u[y];
    if (Fe(b, "Did not find corresponding fetcher result"), qn(b)) {
      let w = Gi(e.matches, g?.route.id);
      p && p[w.route.id] || (p = {
        ...p,
        [w.route.id]: b.error
      }), c.delete(y);
    } else if (yr(b))
      Fe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Aa(b.data);
      c.set(y, w);
    }
  }), { loaderData: d, errors: p };
}
function Uy(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== n1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Vy(e) {
  return e ? qn(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Gi(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function hu(e) {
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
function ia(e, {
  pathname: a,
  routeId: r,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", d = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", l && a && r ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${r}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && r ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new ic(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function mu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (yr(s))
      return { key: l, result: s };
  }
}
function c1(e) {
  let a = typeof e == "string" ? Sa(e) : e;
  return ka({ ...a, hash: "" });
}
function n2(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function a2(e) {
  return new ic(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function i2(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && r2(r)
  );
}
function r2(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function l2(e) {
  return Qh(e.result) && e1.has(e.result.status);
}
function qn(e) {
  return e.type === "error";
}
function yr(e) {
  return (e && e.type) === "redirect";
}
function qy(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function Qh(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function o2(e) {
  return e1.has(e);
}
function s2(e) {
  return Qh(e) && o2(e.status) && e.headers.has("Location");
}
function u2(e) {
  return k_.has(e.toUpperCase());
}
function dn(e) {
  return H_.has(e.toUpperCase());
}
function Ph(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function Lu(e, a) {
  let r = typeof a == "string" ? Sa(a).search : a.search;
  if (e[e.length - 1].route.index && Ph(r || ""))
    return e[e.length - 1];
  let l = Qb(e);
  return l[l.length - 1];
}
function $y(e) {
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
function Vd(e, a, r, l) {
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
function c2(e, a, r, l) {
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
function Eo(e, a) {
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
function f2(e, a) {
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
function Aa(e) {
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
function d2(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      t1
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function h2(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        t1,
        JSON.stringify(r)
      );
    } catch (l) {
      Yt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function Yy() {
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
var Rr = _.createContext(null);
Rr.displayName = "DataRouter";
var Qo = _.createContext(null);
Qo.displayName = "DataRouterState";
var f1 = _.createContext(!1);
function d1() {
  return _.useContext(f1);
}
var Kh = _.createContext({
  isTransitioning: !1
});
Kh.displayName = "ViewTransition";
var h1 = _.createContext(
  /* @__PURE__ */ new Map()
);
h1.displayName = "Fetchers";
var m2 = _.createContext(null);
m2.displayName = "Await";
var oa = _.createContext(
  null
);
oa.displayName = "Navigation";
var rc = _.createContext(
  null
);
rc.displayName = "Location";
var Ua = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ua.displayName = "Route";
var Jh = _.createContext(null);
Jh.displayName = "RouteError";
var m1 = "REACT_ROUTER_ERROR", p2 = "REDIRECT", g2 = "ROUTE_ERROR_RESPONSE";
function y2(e) {
  if (e.startsWith(`${m1}:${p2}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function v2(e) {
  if (e.startsWith(
    `${m1}:${g2}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new ic(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function b2(e, { relative: a } = {}) {
  Fe(
    Po(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = _.useContext(oa), { hash: s, pathname: u, search: c } = Ko(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : ra([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function Po() {
  return _.useContext(rc) != null;
}
function di() {
  return Fe(
    Po(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), _.useContext(rc).location;
}
var p1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function g1(e) {
  _.useContext(oa).static || _.useLayoutEffect(e);
}
function x2() {
  let { isDataRoute: e } = _.useContext(Ua);
  return e ? L2() : S2();
}
function S2() {
  Fe(
    Po(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = _.useContext(Rr), { basename: a, navigator: r } = _.useContext(oa), { matches: l } = _.useContext(Ua), { pathname: s } = di(), u = JSON.stringify(Xh(l)), c = _.useRef(!1);
  return g1(() => {
    c.current = !0;
  }), _.useCallback(
    (p, m = {}) => {
      if (Yt(c.current, p1), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let y = ac(
        p,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      e == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : ra([a, y.pathname])), (m.replace ? r.replace : r.push)(
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
var w2 = _.createContext(null);
function E2(e) {
  let a = _.useContext(Ua).outlet;
  return _.useMemo(
    () => a && /* @__PURE__ */ _.createElement(w2.Provider, { value: e }, a),
    [a, e]
  );
}
function Ko(e, { relative: a } = {}) {
  let { matches: r } = _.useContext(Ua), { pathname: l } = di(), s = JSON.stringify(Xh(r));
  return _.useMemo(
    () => ac(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function _2(e, a, r) {
  Fe(
    Po(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = _.useContext(oa), { matches: s } = _.useContext(Ua), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let T = m && m.path || "";
    b1(
      d,
      !m || T.endsWith("*") || T.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T === "/" ? "*" : `${T}/*`}">.`
    );
  }
  let y = di(), g;
  g = y;
  let v = g.pathname || "/", b = v;
  if (p !== "/") {
    let T = p.replace(/^\//, "").split("/");
    b = "/" + v.replace(/^\//, "").split("/").slice(T.length).join("/");
  }
  let w = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (T) => Object.assign(T, {
        route: r.manifest[T.route.id] || T.route
      })
    )
  ) : Gb(e, { pathname: b });
  return Yt(
    m || w != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Yt(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), M2(
    w && w.map(
      (T) => Object.assign({}, T, {
        params: Object.assign({}, c, T.params),
        pathname: ra([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            T.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathname
        ]),
        pathnameBase: T.pathnameBase === "/" ? p : ra([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            T.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function N2() {
  let e = j2(), a = Ho(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ _.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ _.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ _.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ _.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ _.createElement("pre", { style: s }, r) : null, c);
}
var C2 = /* @__PURE__ */ _.createElement(N2, null), y1 = class extends _.Component {
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
      const r = v2(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ _.createElement(Ua.Provider, { value: this.props.routeContext }, /* @__PURE__ */ _.createElement(
      Jh.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ _.createElement(R2, { error: e }, a) : a;
  }
};
y1.contextType = f1;
var qd = /* @__PURE__ */ new WeakMap();
function R2({
  children: e,
  error: a
}) {
  let { basename: r } = _.useContext(oa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = y2(a.digest);
    if (l) {
      let s = qd.get(a);
      if (s) throw s;
      let u = Kb(l.location, r);
      if (Pb && !qd.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw qd.set(a, c), c;
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
  return e;
}
function T2({ routeContext: e, match: a, children: r }) {
  let l = _.useContext(Rr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ _.createElement(Ua.Provider, { value: e }, r);
}
function M2(e, a = [], r) {
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
    Fe(
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
        let { loaderData: v, errors: b } = l, w = g.route.loader && !v.hasOwnProperty(g.route.id) && (!b || b[g.route.id] === void 0);
        if (g.route.lazy || w) {
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
      pattern: Zo(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, v) => {
      let b, w = !1, N = null, T = null;
      l && (b = u && g.route.id ? u[g.route.id] : void 0, N = g.route.errorElement || C2, c && (d < 0 && v === 0 ? (b1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, T = null) : d === v && (w = !0, T = g.route.hydrateFallbackElement || null)));
      let C = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return b ? E = N : w ? E = T : g.route.Component ? E = /* @__PURE__ */ _.createElement(g.route.Component, null) : g.route.element ? E = g.route.element : E = y, /* @__PURE__ */ _.createElement(
          T2,
          {
            match: g,
            routeContext: {
              outlet: y,
              matches: C,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || v === 0) ? /* @__PURE__ */ _.createElement(
        y1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: b,
          children: z(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function Wh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function D2(e) {
  let a = _.useContext(Rr);
  return Fe(a, Wh(e)), a;
}
function v1(e) {
  let a = _.useContext(Qo);
  return Fe(a, Wh(e)), a;
}
function A2(e) {
  let a = _.useContext(Ua);
  return Fe(a, Wh(e)), a;
}
function lc(e) {
  let a = A2(e), r = a.matches[a.matches.length - 1];
  return Fe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function z2() {
  return lc(
    "useRouteId"
    /* UseRouteId */
  );
}
function O2() {
  let e = v1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = lc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function j2() {
  let e = _.useContext(Jh), a = v1(
    "useRouteError"
    /* UseRouteError */
  ), r = lc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function L2() {
  let { router: e } = D2(
    "useNavigate"
    /* UseNavigateStable */
  ), a = lc(
    "useNavigate"
    /* UseNavigateStable */
  ), r = _.useRef(!1);
  return g1(() => {
    r.current = !0;
  }), _.useCallback(
    async (s, u = {}) => {
      Yt(r.current, p1), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var Iy = {};
function b1(e, a, r) {
  !a && !Iy[e] && (Iy[e] = !0, Yt(!1, r));
}
var Gy = {};
function Xy(e, a) {
  !e && !Gy[a] && (Gy[a] = !0, console.warn(a));
}
var H2 = "useOptimistic", Fy = KE[H2], B2 = () => {
};
function k2(e) {
  return Fy ? Fy(e) : [e, B2];
}
function U2(e) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (e.element && Yt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: _.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (e.hydrateFallbackElement && Yt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: _.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (e.errorElement && Yt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: _.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var V2 = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function q2(e, a) {
  return Y_({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: i_({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: V2,
    mapRouteProperties: U2,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var $2 = class {
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
function Y2({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = d1() || l;
  let [u, c] = _.useState(e.state), [d, p] = k2(u), [m, y] = _.useState(), [g, v] = _.useState({
    isTransitioning: !1
  }), [b, w] = _.useState(), [N, T] = _.useState(), [C, z] = _.useState(), E = _.useRef(/* @__PURE__ */ new Map()), O = _.useCallback(
    (A, { deletedFetchers: I, newErrors: le, flushSync: Y, viewTransitionOpts: K }) => {
      le && r && Object.values(le).forEach(
        (j) => r(j, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: Zo(A.matches)
        })
      ), A.fetchers.forEach((j, G) => {
        j.data !== void 0 && E.current.set(G, j.data);
      }), I.forEach((j) => E.current.delete(j)), Xy(
        Y === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let re = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (Xy(
        K == null || re,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !re) {
        a && Y ? a(() => c(A)) : l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && p((j) => Zy(j, A)), c(A);
        });
        return;
      }
      if (a && Y) {
        a(() => {
          N && (b?.resolve(), N.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let j = e.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        j.finished.finally(() => {
          a(() => {
            w(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => T(j));
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
      e.window,
      a,
      N,
      b,
      l,
      p,
      r
    ]
  );
  _.useLayoutEffect(() => e.subscribe(O), [e, O]), _.useEffect(() => {
    g.isTransitioning && !g.flushSync && w(new $2());
  }, [g]), _.useEffect(() => {
    if (b && m && e.window) {
      let A = m, I = b.promise, le = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && p((Y) => Zy(Y, A)), c(A);
        }), await I;
      });
      le.finished.finally(() => {
        w(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
      }), T(le);
    }
  }, [
    m,
    b,
    e.window,
    l,
    p
  ]), _.useEffect(() => {
    b && m && d.location.key === m.location.key && b.resolve();
  }, [b, N, d.location, m]), _.useEffect(() => {
    !g.isTransitioning && C && (y(C.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), z(void 0));
  }, [g.isTransitioning, C]);
  let H = _.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, I, le) => e.navigate(A, {
      state: I,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (A, I, le) => e.navigate(A, {
      replace: !0,
      state: I,
      preventScrollReset: le?.preventScrollReset
    })
  }), [e]), k = e.basename || "/", B = _.useMemo(
    () => ({
      router: e,
      navigator: H,
      static: !1,
      basename: k,
      onError: r
    }),
    [e, H, k, r]
  );
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(Rr.Provider, { value: B }, /* @__PURE__ */ _.createElement(Qo.Provider, { value: d }, /* @__PURE__ */ _.createElement(h1.Provider, { value: E.current }, /* @__PURE__ */ _.createElement(Kh.Provider, { value: g }, /* @__PURE__ */ _.createElement(
    F2,
    {
      basename: k,
      location: d.location,
      navigationType: d.historyAction,
      navigator: H,
      useTransitions: l
    },
    /* @__PURE__ */ _.createElement(
      I2,
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
function Zy(e, a) {
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
var I2 = _.memo(G2);
function G2({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return _2(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function X2(e) {
  return E2(e.context);
}
function F2({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Fe(
    !Po(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = _.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: u,
      useTransitions: c,
      future: {}
    }),
    [d, s, u, c]
  );
  typeof r == "string" && (r = Sa(r));
  let {
    pathname: m = "/",
    search: y = "",
    hash: g = "",
    state: v = null,
    key: b = "default",
    mask: w
  } = r, N = _.useMemo(() => {
    let T = la(m, d);
    return T == null ? null : {
      location: {
        pathname: T,
        search: y,
        hash: g,
        state: v,
        key: b,
        mask: w
      },
      navigationType: l
    };
  }, [d, m, y, g, v, b, l, w]);
  return Yt(
    N != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ _.createElement(oa.Provider, { value: p }, /* @__PURE__ */ _.createElement(rc.Provider, { children: a, value: N }));
}
var Hu = "get", Bu = "application/x-www-form-urlencoded";
function oc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function Z2(e) {
  return oc(e) && e.tagName.toLowerCase() === "button";
}
function Q2(e) {
  return oc(e) && e.tagName.toLowerCase() === "form";
}
function P2(e) {
  return oc(e) && e.tagName.toLowerCase() === "input";
}
function K2(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function J2(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !K2(e);
}
var pu = null;
function W2() {
  if (pu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), pu = !1;
    } catch {
      pu = !0;
    }
  return pu;
}
var eN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function $d(e) {
  return e != null && !eN.has(e) ? (Yt(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Bu}"`
  ), null) : e;
}
function tN(e, a) {
  let r, l, s, u, c;
  if (Q2(e)) {
    let d = e.getAttribute("action");
    l = d ? la(d, a) : null, r = e.getAttribute("method") || Hu, s = $d(e.getAttribute("enctype")) || Bu, u = new FormData(e);
  } else if (Z2(e) || P2(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? la(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || Hu, s = $d(e.getAttribute("formenctype")) || $d(d.getAttribute("enctype")) || Bu, u = new FormData(d, e), !W2()) {
      let { name: m, type: y, value: g } = e;
      if (y === "image") {
        let v = m ? `${m}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (oc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Hu, l = null, s = Bu, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function em(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function x1(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && la(s.pathname, a) === "/" ? s.pathname = `${Iu(a)}/_root.${l}` : s.pathname = `${Iu(s.pathname)}.${l}`, s;
}
async function nN(e, a) {
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
function aN(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function iN(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await nN(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return sN(
    l.flat(1).filter(aN).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Qy(e, a, r, l, s, u) {
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
function rN(e, a, { includeHydrateFallback: r } = {}) {
  return lN(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function lN(e) {
  return [...new Set(e)];
}
function oN(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function sN(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(oN(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function tm() {
  let e = _.useContext(Rr);
  return em(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function uN() {
  let e = _.useContext(Qo);
  return em(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var nm = _.createContext(void 0);
nm.displayName = "FrameworkContext";
function am() {
  let e = _.useContext(nm);
  return em(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function cN(e, a) {
  let r = _.useContext(nm), [l, s] = _.useState(!1), [u, c] = _.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, v = _.useRef(null);
  _.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let N = (C) => {
        C.forEach((z) => {
          c(z.isIntersecting);
        });
      }, T = new IntersectionObserver(N, { threshold: 0.5 });
      return v.current && T.observe(v.current), () => {
        T.disconnect();
      };
    }
  }, [e]), _.useEffect(() => {
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
  return r ? e !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: _o(d, b),
      onBlur: _o(p, w),
      onMouseEnter: _o(m, b),
      onMouseLeave: _o(y, w),
      onTouchStart: _o(g, b)
    }
  ] : [!1, v, {}];
}
function _o(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function fN({ page: e, ...a }) {
  let r = d1(), { router: l } = tm(), s = _.useMemo(
    () => Gb(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? r ? /* @__PURE__ */ _.createElement(hN, { page: e, matches: s, ...a }) : /* @__PURE__ */ _.createElement(mN, { page: e, matches: s, ...a }) : null;
}
function dN(e) {
  let { manifest: a, routeModules: r } = am(), [l, s] = _.useState([]);
  return _.useEffect(() => {
    let u = !1;
    return iN(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function hN({
  page: e,
  matches: a,
  ...r
}) {
  let l = di(), { future: s } = am(), { basename: u } = tm(), c = _.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = x1(
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
  return /* @__PURE__ */ _.createElement(_.Fragment, null, c.map((d) => /* @__PURE__ */ _.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function mN({
  page: e,
  matches: a,
  ...r
}) {
  let l = di(), { future: s, manifest: u, routeModules: c } = am(), { basename: d } = tm(), { loaderData: p, matches: m } = uN(), y = _.useMemo(
    () => Qy(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = _.useMemo(
    () => Qy(
      e,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [e, a, m, u, l]
  ), v = _.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), T = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((O) => O.route.id === z.route.id) && z.route.id in p && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? T = !0 : N.add(z.route.id));
    }), N.size === 0)
      return [];
    let C = x1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return T && N.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((z) => N.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [C.pathname + C.search];
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
  ]), b = _.useMemo(
    () => rN(g, u),
    [g, u]
  ), w = dN(g);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, v.map((N) => /* @__PURE__ */ _.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...r })), b.map((N) => /* @__PURE__ */ _.createElement("link", { key: N, rel: "modulepreload", href: N, ...r })), w.map(({ key: N, link: T }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ _.createElement(
      "link",
      {
        key: N,
        nonce: r.nonce,
        ...T,
        crossOrigin: T.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function pN(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var gN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  gN && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var S1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, w1 = _.forwardRef(
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
    viewTransition: v,
    defaultShouldRevalidate: b,
    ...w
  }, N) {
    let { basename: T, navigator: C, useTransitions: z } = _.useContext(oa), E = typeof y == "string" && S1.test(y), O = Kb(y, T);
    y = O.to;
    let H = b2(y, { relative: s }), k = di(), B = null;
    if (d) {
      let G = ac(
        d,
        [],
        k.mask ? k.mask.pathname : "/",
        !0
      );
      T !== "/" && (G.pathname = G.pathname === "/" ? T : ra([T, G.pathname])), B = C.createHref(G);
    }
    let [A, I, le] = cN(
      l,
      w
    ), Y = xN(y, {
      replace: c,
      mask: d,
      state: p,
      target: m,
      preventScrollReset: g,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: b,
      useTransitions: z
    });
    function K(G) {
      a && a(G), G.defaultPrevented || Y(G);
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
          ref: pN(N, I),
          target: m,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !E ? /* @__PURE__ */ _.createElement(_.Fragment, null, j, /* @__PURE__ */ _.createElement(fN, { page: H })) : j;
  }
);
w1.displayName = "Link";
var yN = _.forwardRef(
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
    let g = Ko(c, { relative: m.relative }), v = di(), b = _.useContext(Qo), { navigator: w, basename: N } = _.useContext(oa), T = b != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    NN(g) && d === !0, C = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname, z = v.pathname, E = b && b.navigation && b.navigation.location ? b.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), E = E ? E.toLowerCase() : null, C = C.toLowerCase()), E && N && (E = la(E, N) || E);
    const O = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let H = z === C || !s && z.startsWith(C) && z.charAt(O) === "/", k = E != null && (E === C || !s && E.startsWith(C) && E.charAt(C.length) === "/"), B = {
      isActive: H,
      isPending: k,
      isTransitioning: T
    }, A = H ? a : void 0, I;
    typeof l == "function" ? I = l(B) : I = [
      l,
      H ? "active" : null,
      k ? "pending" : null,
      T ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let le = typeof u == "function" ? u(B) : u;
    return /* @__PURE__ */ _.createElement(
      w1,
      {
        ...m,
        "aria-current": A,
        className: I,
        ref: y,
        style: le,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(B) : p
    );
  }
);
yN.displayName = "NavLink";
var vN = _.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = Hu,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: v,
    ...b
  }, w) => {
    let { useTransitions: N } = _.useContext(oa), T = EN(), C = _N(d, { relative: m }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof d == "string" && S1.test(d), O = (H) => {
      if (p && p(H), H.defaultPrevented) return;
      H.preventDefault();
      let k = H.nativeEvent.submitter, B = k?.getAttribute("formmethod") || c, A = () => T(k || H.currentTarget, {
        fetcherKey: a,
        method: B,
        navigate: r,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: g,
        defaultShouldRevalidate: v
      });
      N && r !== !1 ? _.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ _.createElement(
      "form",
      {
        ref: w,
        method: z,
        action: C,
        onSubmit: l ? p : O,
        ...b,
        "data-discover": !E && e === "render" ? "true" : void 0
      }
    );
  }
);
vN.displayName = "Form";
function bN(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function E1(e) {
  let a = _.useContext(Rr);
  return Fe(a, bN(e)), a;
}
function xN(e, {
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
  let y = x2(), g = di(), v = Ko(e, { relative: c });
  return _.useCallback(
    (b) => {
      if (J2(b, a)) {
        b.preventDefault();
        let w = r !== void 0 ? r : ka(g) === ka(v), N = () => y(e, {
          replace: w,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? _.startTransition(() => N()) : N();
      }
    },
    [
      g,
      y,
      v,
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
var SN = 0, wN = () => `__${String(++SN)}__`;
function EN() {
  let { router: e } = E1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = _.useContext(oa), r = z2(), l = e.fetch, s = e.navigate;
  return _.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = tN(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || wN();
        await l(v, r, c.action || d, {
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
function _N(e, { relative: a } = {}) {
  let { basename: r } = _.useContext(oa), l = _.useContext(Ua);
  Fe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...Ko(e || ".", { relative: a }) }, c = di();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((y) => y === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let y = d.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : ra([r, u.pathname])), ka(u);
}
function NN(e, { relative: a } = {}) {
  let r = _.useContext(Kh);
  Fe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = E1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Ko(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = la(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = la(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return Yu(s.pathname, c) != null || Yu(s.pathname, u) != null;
}
const CN = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], RN = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], _1 = {
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
}, TN = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)";
class sc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const uc = "/api/v1/extensions/nexus.video.svi2-pro";
async function Tr(e, a) {
  const r = e.startsWith("http") ? e : `${uc}${e}`, l = await fetch(r, {
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
    throw new sc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function MN(e, a, r) {
  const l = e.startsWith("http") ? e : `${uc}${e}`, s = new EventSource(l);
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
async function N1() {
  return Tr("/presets");
}
async function DN() {
  return Tr("/settings");
}
async function C1(e) {
  return Tr("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var AN = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function $n({ tone: e = "neutral", children: a, className: r }) {
  const l = [AN[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsx("span", { className: l, children: a });
}
var zN = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, ON = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, jN = "_1h48t1v9";
function La({
  variant: e = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [zN[e], ON[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ x.jsx("span", { className: jN, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Qt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let r = 0, l; r < e.length; r++)
      (l = Qt(e[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in e)
      e[r] && (a += (a && " ") + r);
  return a;
}
var LN = { value: () => {
} };
function cc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new ku(r);
}
function ku(e) {
  this._ = e;
}
function HN(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
ku.prototype = cc.prototype = {
  constructor: ku,
  on: function(e, a) {
    var r = this._, l = HN(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = BN(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = Py(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = Py(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new ku(e);
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
function BN(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function Py(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = LN, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var ph = "http://www.w3.org/1999/xhtml";
const Ky = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ph,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function fc(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Ky.hasOwnProperty(a) ? { space: Ky[a], local: e } : e;
}
function kN(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === ph && a.documentElement.namespaceURI === ph ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function UN(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function R1(e) {
  var a = fc(e);
  return (a.local ? UN : kN)(a);
}
function VN() {
}
function im(e) {
  return e == null ? VN : function() {
    return this.querySelector(e);
  };
}
function qN(e) {
  typeof e != "function" && (e = im(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new In(l, this._parents);
}
function $N(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function YN() {
  return [];
}
function T1(e) {
  return e == null ? YN : function() {
    return this.querySelectorAll(e);
  };
}
function IN(e) {
  return function() {
    return $N(e.apply(this, arguments));
  };
}
function GN(e) {
  typeof e == "function" ? e = IN(e) : e = T1(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new In(l, s);
}
function M1(e) {
  return function() {
    return this.matches(e);
  };
}
function D1(e) {
  return function(a) {
    return a.matches(e);
  };
}
var XN = Array.prototype.find;
function FN(e) {
  return function() {
    return XN.call(this.children, e);
  };
}
function ZN() {
  return this.firstElementChild;
}
function QN(e) {
  return this.select(e == null ? ZN : FN(typeof e == "function" ? e : D1(e)));
}
var PN = Array.prototype.filter;
function KN() {
  return Array.from(this.children);
}
function JN(e) {
  return function() {
    return PN.call(this.children, e);
  };
}
function WN(e) {
  return this.selectAll(e == null ? KN : JN(typeof e == "function" ? e : D1(e)));
}
function eC(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new In(l, this._parents);
}
function A1(e) {
  return new Array(e.length);
}
function tC() {
  return new In(this._enter || this._groups.map(A1), this._parents);
}
function Gu(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
Gu.prototype = {
  constructor: Gu,
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
function nC(e) {
  return function() {
    return e;
  };
}
function aC(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new Gu(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function iC(e, a, r, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, v = new Array(y), b;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (v[d] = b = c.call(p, p.__data__, d, a) + "", m.has(b) ? s[d] = p : m.set(b, p));
  for (d = 0; d < g; ++d)
    b = c.call(e, u[d], d, u) + "", (p = m.get(b)) ? (l[d] = p, p.__data__ = u[d], m.delete(b)) : r[d] = new Gu(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(v[d]) === p && (s[d] = p);
}
function rC(e) {
  return e.__data__;
}
function lC(e, a) {
  if (!arguments.length) return Array.from(this, rC);
  var r = a ? iC : aC, l = this._parents, s = this._groups;
  typeof e != "function" && (e = nC(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], v = g.length, b = oC(e.call(y, y && y.__data__, m, l)), w = b.length, N = d[m] = new Array(w), T = c[m] = new Array(w), C = p[m] = new Array(v);
    r(y, g, N, T, C, b, a);
    for (var z = 0, E = 0, O, H; z < w; ++z)
      if (O = N[z]) {
        for (z >= E && (E = z + 1); !(H = T[E]) && ++E < w; ) ;
        O._next = H || null;
      }
  }
  return c = new In(c, l), c._enter = d, c._exit = p, c;
}
function oC(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function sC() {
  return new In(this._exit || this._groups.map(A1), this._parents);
}
function uC(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function cC(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = r[p], y = l[p], g = m.length, v = d[p] = new Array(g), b, w = 0; w < g; ++w)
      (b = m[w] || y[w]) && (v[w] = b);
  for (; p < s; ++p)
    d[p] = r[p];
  return new In(d, this._parents);
}
function fC() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function dC(e) {
  e || (e = hC);
  function a(g, v) {
    return g && v ? e(g.__data__, v.__data__) : !g - !v;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], d = c.length, p = s[u] = new Array(d), m, y = 0; y < d; ++y)
      (m = c[y]) && (p[y] = m);
    p.sort(a);
  }
  return new In(s, this._parents).order();
}
function hC(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function mC() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function pC() {
  return Array.from(this);
}
function gC() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function yC() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function vC() {
  return !this.node();
}
function bC(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function xC(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function SC(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function wC(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function EC(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function _C(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function NC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function CC(e, a) {
  var r = fc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? SC : xC : typeof a == "function" ? r.local ? NC : _C : r.local ? EC : wC)(r, a));
}
function z1(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function RC(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function TC(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function MC(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function DC(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? RC : typeof a == "function" ? MC : TC)(e, a, r ?? "")) : xl(this.node(), e);
}
function xl(e, a) {
  return e.style.getPropertyValue(a) || z1(e).getComputedStyle(e, null).getPropertyValue(a);
}
function AC(e) {
  return function() {
    delete this[e];
  };
}
function zC(e, a) {
  return function() {
    this[e] = a;
  };
}
function OC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function jC(e, a) {
  return arguments.length > 1 ? this.each((a == null ? AC : typeof a == "function" ? OC : zC)(e, a)) : this.node()[e];
}
function O1(e) {
  return e.trim().split(/^|\s+/);
}
function rm(e) {
  return e.classList || new j1(e);
}
function j1(e) {
  this._node = e, this._names = O1(e.getAttribute("class") || "");
}
j1.prototype = {
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
  for (var r = rm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function H1(e, a) {
  for (var r = rm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function LC(e) {
  return function() {
    L1(this, e);
  };
}
function HC(e) {
  return function() {
    H1(this, e);
  };
}
function BC(e, a) {
  return function() {
    (a.apply(this, arguments) ? L1 : H1)(this, e);
  };
}
function kC(e, a) {
  var r = O1(e + "");
  if (arguments.length < 2) {
    for (var l = rm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? BC : a ? LC : HC)(r, a));
}
function UC() {
  this.textContent = "";
}
function VC(e) {
  return function() {
    this.textContent = e;
  };
}
function qC(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function $C(e) {
  return arguments.length ? this.each(e == null ? UC : (typeof e == "function" ? qC : VC)(e)) : this.node().textContent;
}
function YC() {
  this.innerHTML = "";
}
function IC(e) {
  return function() {
    this.innerHTML = e;
  };
}
function GC(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function XC(e) {
  return arguments.length ? this.each(e == null ? YC : (typeof e == "function" ? GC : IC)(e)) : this.node().innerHTML;
}
function FC() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ZC() {
  return this.each(FC);
}
function QC() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function PC() {
  return this.each(QC);
}
function KC(e) {
  var a = typeof e == "function" ? e : R1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function JC() {
  return null;
}
function WC(e, a) {
  var r = typeof e == "function" ? e : R1(e), l = a == null ? JC : typeof a == "function" ? a : im(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function eR() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function tR() {
  return this.each(eR);
}
function nR() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function aR() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function iR(e) {
  return this.select(e ? aR : nR);
}
function rR(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function lR(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function oR(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function sR(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function uR(e, a, r) {
  return function() {
    var l = this.__on, s, u = lR(a);
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
function cR(e, a, r) {
  var l = oR(e + ""), s, u = l.length, c;
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
  for (d = a ? uR : sR, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function B1(e, a, r) {
  var l = z1(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function fR(e, a) {
  return function() {
    return B1(this, e, a);
  };
}
function dR(e, a) {
  return function() {
    return B1(this, e, a.apply(this, arguments));
  };
}
function hR(e, a) {
  return this.each((typeof a == "function" ? dR : fR)(e, a));
}
function* mR() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var k1 = [null];
function In(e, a) {
  this._groups = e, this._parents = a;
}
function Jo() {
  return new In([[document.documentElement]], k1);
}
function pR() {
  return this;
}
In.prototype = Jo.prototype = {
  constructor: In,
  select: qN,
  selectAll: GN,
  selectChild: QN,
  selectChildren: WN,
  filter: eC,
  data: lC,
  enter: tC,
  exit: sC,
  join: uC,
  merge: cC,
  selection: pR,
  order: fC,
  sort: dC,
  call: mC,
  nodes: pC,
  node: gC,
  size: yC,
  empty: vC,
  each: bC,
  attr: CC,
  style: DC,
  property: jC,
  classed: kC,
  text: $C,
  html: XC,
  raise: ZC,
  lower: PC,
  append: KC,
  insert: WC,
  remove: tR,
  clone: iR,
  datum: rR,
  on: cR,
  dispatch: hR,
  [Symbol.iterator]: mR
};
function Yn(e) {
  return typeof e == "string" ? new In([[document.querySelector(e)]], [document.documentElement]) : new In([[e]], k1);
}
function gR(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function ga(e, a) {
  if (e = gR(e), a === void 0 && (a = e.currentTarget), a) {
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
const yR = { passive: !1 }, Bo = { capture: !0, passive: !1 };
function Yd(e) {
  e.stopImmediatePropagation();
}
function yl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function U1(e) {
  var a = e.document.documentElement, r = Yn(e).on("dragstart.drag", yl, Bo);
  "onselectstart" in a ? r.on("selectstart.drag", yl, Bo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function V1(e, a) {
  var r = e.document.documentElement, l = Yn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", yl, Bo), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const gu = (e) => () => e;
function gh(e, {
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
gh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function vR(e) {
  return !e.ctrlKey && !e.button;
}
function bR() {
  return this.parentNode;
}
function xR(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function SR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function q1() {
  var e = vR, a = bR, r = xR, l = SR, s = {}, u = cc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function v(O) {
    O.on("mousedown.drag", b).filter(l).on("touchstart.drag", T).on("touchmove.drag", C, yR).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function b(O, H) {
    if (!(y || !e.call(this, O, H))) {
      var k = E(this, a.call(this, O, H), O, H, "mouse");
      k && (Yn(O.view).on("mousemove.drag", w, Bo).on("mouseup.drag", N, Bo), U1(O.view), Yd(O), m = !1, d = O.clientX, p = O.clientY, k("start", O));
    }
  }
  function w(O) {
    if (yl(O), !m) {
      var H = O.clientX - d, k = O.clientY - p;
      m = H * H + k * k > g;
    }
    s.mouse("drag", O);
  }
  function N(O) {
    Yn(O.view).on("mousemove.drag mouseup.drag", null), V1(O.view, m), yl(O), s.mouse("end", O);
  }
  function T(O, H) {
    if (e.call(this, O, H)) {
      var k = O.changedTouches, B = a.call(this, O, H), A = k.length, I, le;
      for (I = 0; I < A; ++I)
        (le = E(this, B, O, H, k[I].identifier, k[I])) && (Yd(O), le("start", O, k[I]));
    }
  }
  function C(O) {
    var H = O.changedTouches, k = H.length, B, A;
    for (B = 0; B < k; ++B)
      (A = s[H[B].identifier]) && (yl(O), A("drag", O, H[B]));
  }
  function z(O) {
    var H = O.changedTouches, k = H.length, B, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), B = 0; B < k; ++B)
      (A = s[H[B].identifier]) && (Yd(O), A("end", O, H[B]));
  }
  function E(O, H, k, B, A, I) {
    var le = u.copy(), Y = ga(I || k, H), K, re, j;
    if ((j = r.call(O, new gh("beforestart", {
      sourceEvent: k,
      target: v,
      identifier: A,
      active: c,
      x: Y[0],
      y: Y[1],
      dx: 0,
      dy: 0,
      dispatch: le
    }), B)) != null)
      return K = j.x - Y[0] || 0, re = j.y - Y[1] || 0, function G(R, L, F) {
        var V = Y, P;
        switch (R) {
          case "start":
            s[A] = G, P = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            Y = ga(F || L, H), P = c;
            break;
        }
        le.call(
          R,
          O,
          new gh(R, {
            sourceEvent: L,
            subject: j,
            target: v,
            identifier: A,
            active: P,
            x: Y[0] + K,
            y: Y[1] + re,
            dx: Y[0] - V[0],
            dy: Y[1] - V[1],
            dispatch: le
          }),
          B
        );
      };
  }
  return v.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : gu(!!O), v) : e;
  }, v.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : gu(O), v) : a;
  }, v.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : gu(O), v) : r;
  }, v.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : gu(!!O), v) : l;
  }, v.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? v : O;
  }, v.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, v) : Math.sqrt(g);
  }, v;
}
function lm(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function $1(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function Wo() {
}
var ko = 0.7, Xu = 1 / ko, vl = "\\s*([+-]?\\d+)\\s*", Uo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ha = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", wR = /^#([0-9a-f]{3,8})$/, ER = new RegExp(`^rgb\\(${vl},${vl},${vl}\\)$`), _R = new RegExp(`^rgb\\(${Ha},${Ha},${Ha}\\)$`), NR = new RegExp(`^rgba\\(${vl},${vl},${vl},${Uo}\\)$`), CR = new RegExp(`^rgba\\(${Ha},${Ha},${Ha},${Uo}\\)$`), RR = new RegExp(`^hsl\\(${Uo},${Ha},${Ha}\\)$`), TR = new RegExp(`^hsla\\(${Uo},${Ha},${Ha},${Uo}\\)$`), Jy = {
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
lm(Wo, wr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Wy,
  // Deprecated! Use color.formatHex.
  formatHex: Wy,
  formatHex8: MR,
  formatHsl: DR,
  formatRgb: ev,
  toString: ev
});
function Wy() {
  return this.rgb().formatHex();
}
function MR() {
  return this.rgb().formatHex8();
}
function DR() {
  return Y1(this).formatHsl();
}
function ev() {
  return this.rgb().formatRgb();
}
function wr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = wR.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? tv(a) : r === 3 ? new Mn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? yu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? yu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = ER.exec(e)) ? new Mn(a[1], a[2], a[3], 1) : (a = _R.exec(e)) ? new Mn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = NR.exec(e)) ? yu(a[1], a[2], a[3], a[4]) : (a = CR.exec(e)) ? yu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = RR.exec(e)) ? iv(a[1], a[2] / 100, a[3] / 100, 1) : (a = TR.exec(e)) ? iv(a[1], a[2] / 100, a[3] / 100, a[4]) : Jy.hasOwnProperty(e) ? tv(Jy[e]) : e === "transparent" ? new Mn(NaN, NaN, NaN, 0) : null;
}
function tv(e) {
  return new Mn(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function yu(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new Mn(e, a, r, l);
}
function AR(e) {
  return e instanceof Wo || (e = wr(e)), e ? (e = e.rgb(), new Mn(e.r, e.g, e.b, e.opacity)) : new Mn();
}
function yh(e, a, r, l) {
  return arguments.length === 1 ? AR(e) : new Mn(e, a, r, l ?? 1);
}
function Mn(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
lm(Mn, yh, $1(Wo, {
  brighter(e) {
    return e = e == null ? Xu : Math.pow(Xu, e), new Mn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ko : Math.pow(ko, e), new Mn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Mn(xr(this.r), xr(this.g), xr(this.b), Fu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: nv,
  // Deprecated! Use color.formatHex.
  formatHex: nv,
  formatHex8: zR,
  formatRgb: av,
  toString: av
}));
function nv() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}`;
}
function zR() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}${vr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function av() {
  const e = Fu(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${xr(this.r)}, ${xr(this.g)}, ${xr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Fu(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function xr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function vr(e) {
  return e = xr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function iv(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new ya(e, a, r, l);
}
function Y1(e) {
  if (e instanceof ya) return new ya(e.h, e.s, e.l, e.opacity);
  if (e instanceof Wo || (e = wr(e)), !e) return new ya();
  if (e instanceof ya) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new ya(c, d, p, e.opacity);
}
function OR(e, a, r, l) {
  return arguments.length === 1 ? Y1(e) : new ya(e, a, r, l ?? 1);
}
function ya(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
lm(ya, OR, $1(Wo, {
  brighter(e) {
    return e = e == null ? Xu : Math.pow(Xu, e), new ya(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? ko : Math.pow(ko, e), new ya(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new Mn(
      Id(e >= 240 ? e - 240 : e + 120, s, l),
      Id(e, s, l),
      Id(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new ya(rv(this.h), vu(this.s), vu(this.l), Fu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Fu(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${rv(this.h)}, ${vu(this.s) * 100}%, ${vu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function rv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function vu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Id(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const om = (e) => () => e;
function jR(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function LR(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function HR(e) {
  return (e = +e) == 1 ? I1 : function(a, r) {
    return r - a ? LR(a, r, e) : om(isNaN(a) ? r : a);
  };
}
function I1(e, a) {
  var r = a - e;
  return r ? jR(e, r) : om(isNaN(e) ? a : e);
}
const Zu = (function e(a) {
  var r = HR(a);
  function l(s, u) {
    var c = r((s = yh(s)).r, (u = yh(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), m = I1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function BR(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function kR(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function UR(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = Oo(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function VR(e, a) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return r.setTime(e * (1 - l) + a * l), r;
  };
}
function Oa(e, a) {
  return e = +e, a = +a, function(r) {
    return e * (1 - r) + a * r;
  };
}
function qR(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = Oo(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var vh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Gd = new RegExp(vh.source, "g");
function $R(e) {
  return function() {
    return e;
  };
}
function YR(e) {
  return function(a) {
    return e(a) + "";
  };
}
function G1(e, a) {
  var r = vh.lastIndex = Gd.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = vh.exec(e)) && (s = Gd.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: Oa(l, s) })), r = Gd.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? YR(p[0].x) : $R(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function Oo(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? om(a) : (r === "number" ? Oa : r === "string" ? (l = wr(a)) ? (a = l, Zu) : G1 : a instanceof wr ? Zu : a instanceof Date ? VR : kR(a) ? BR : Array.isArray(a) ? UR : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? qR : Oa)(e, a);
}
var lv = 180 / Math.PI, bh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function X1(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * lv,
    skewX: Math.atan(p) * lv,
    scaleX: c,
    scaleY: d
  };
}
var bu;
function IR(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? bh : X1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function GR(e) {
  return e == null || (bu || (bu = document.createElementNS("http://www.w3.org/2000/svg", "g")), bu.setAttribute("transform", e), !(e = bu.transform.baseVal.consolidate())) ? bh : (e = e.matrix, X1(e.a, e.b, e.c, e.d, e.e, e.f));
}
function F1(e, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, v, b, w) {
    if (m !== g || y !== v) {
      var N = b.push("translate(", null, a, null, r);
      w.push({ i: N - 4, x: Oa(m, g) }, { i: N - 2, x: Oa(y, v) });
    } else (g || v) && b.push("translate(" + g + a + v + r);
  }
  function c(m, y, g, v) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), v.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: Oa(m, y) })) : y && g.push(s(g) + "rotate(" + y + l);
  }
  function d(m, y, g, v) {
    m !== y ? v.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: Oa(m, y) }) : y && g.push(s(g) + "skewX(" + y + l);
  }
  function p(m, y, g, v, b, w) {
    if (m !== g || y !== v) {
      var N = b.push(s(b) + "scale(", null, ",", null, ")");
      w.push({ i: N - 4, x: Oa(m, g) }, { i: N - 2, x: Oa(y, v) });
    } else (g !== 1 || v !== 1) && b.push(s(b) + "scale(" + g + "," + v + ")");
  }
  return function(m, y) {
    var g = [], v = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, v), c(m.rotate, y.rotate, g, v), d(m.skewX, y.skewX, g, v), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, v), m = y = null, function(b) {
      for (var w = -1, N = v.length, T; ++w < N; ) g[(T = v[w]).i] = T.x(b);
      return g.join("");
    };
  };
}
var XR = F1(IR, "px, ", "px)", "deg)"), FR = F1(GR, ", ", ")", ")"), ZR = 1e-12;
function ov(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function QR(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function PR(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Uu = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], v = c[2], b = y - d, w = g - p, N = b * b + w * w, T, C;
    if (N < ZR)
      C = Math.log(v / m) / a, T = function(B) {
        return [
          d + B * b,
          p + B * w,
          m * Math.exp(a * B * C)
        ];
      };
    else {
      var z = Math.sqrt(N), E = (v * v - m * m + l * N) / (2 * m * r * z), O = (v * v - m * m - l * N) / (2 * v * r * z), H = Math.log(Math.sqrt(E * E + 1) - E), k = Math.log(Math.sqrt(O * O + 1) - O);
      C = (k - H) / a, T = function(B) {
        var A = B * C, I = ov(H), le = m / (r * z) * (I * PR(a * A + H) - QR(H));
        return [
          d + le * b,
          p + le * w,
          m * I / ov(a * A + H)
        ];
      };
    }
    return T.duration = C * 1e3 * a / Math.SQRT2, T;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Sl = 0, Do = 0, No = 0, Z1 = 1e3, Qu, Ao, Pu = 0, Er = 0, dc = 0, Vo = typeof performance == "object" && performance.now ? performance : Date, Q1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function sm() {
  return Er || (Q1(KR), Er = Vo.now() + dc);
}
function KR() {
  Er = 0;
}
function Ku() {
  this._call = this._time = this._next = null;
}
Ku.prototype = P1.prototype = {
  constructor: Ku,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? sm() : +r) + (a == null ? 0 : +a), !this._next && Ao !== this && (Ao ? Ao._next = this : Qu = this, Ao = this), this._call = e, this._time = r, xh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xh());
  }
};
function P1(e, a, r) {
  var l = new Ku();
  return l.restart(e, a, r), l;
}
function JR() {
  sm(), ++Sl;
  for (var e = Qu, a; e; )
    (a = Er - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Sl;
}
function sv() {
  Er = (Pu = Vo.now()) + dc, Sl = Do = 0;
  try {
    JR();
  } finally {
    Sl = 0, eT(), Er = 0;
  }
}
function WR() {
  var e = Vo.now(), a = e - Pu;
  a > Z1 && (dc -= a, Pu = e);
}
function eT() {
  for (var e, a = Qu, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : Qu = r);
  Ao = e, xh(l);
}
function xh(e) {
  if (!Sl) {
    Do && (Do = clearTimeout(Do));
    var a = e - Er;
    a > 24 ? (e < 1 / 0 && (Do = setTimeout(sv, e - Vo.now() - dc)), No && (No = clearInterval(No))) : (No || (Pu = Vo.now(), No = setInterval(WR, Z1)), Sl = 1, Q1(sv));
  }
}
function uv(e, a, r) {
  var l = new Ku();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var tT = cc("start", "end", "cancel", "interrupt"), nT = [], K1 = 0, cv = 1, Sh = 2, Vu = 3, fv = 4, wh = 5, qu = 6;
function hc(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  aT(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: tT,
    tween: nT,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: K1
  });
}
function um(e, a) {
  var r = wa(e, a);
  if (r.state > K1) throw new Error("too late; already scheduled");
  return r;
}
function Va(e, a) {
  var r = wa(e, a);
  if (r.state > Vu) throw new Error("too late; already running");
  return r;
}
function wa(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function aT(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = P1(u, 0, r.time);
  function u(m) {
    r.state = cv, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, g, v, b;
    if (r.state !== cv) return p();
    for (y in l)
      if (b = l[y], b.name === r.name) {
        if (b.state === Vu) return uv(c);
        b.state === fv ? (b.state = qu, b.timer.stop(), b.on.call("interrupt", e, e.__data__, b.index, b.group), delete l[y]) : +y < a && (b.state = qu, b.timer.stop(), b.on.call("cancel", e, e.__data__, b.index, b.group), delete l[y]);
      }
    if (uv(function() {
      r.state === Vu && (r.state = fv, r.timer.restart(d, r.delay, r.time), d(m));
    }), r.state = Sh, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Sh) {
      for (r.state = Vu, s = new Array(v = r.tween.length), y = 0, g = -1; y < v; ++y)
        (b = r.tween[y].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = b);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(p), r.state = wh, 1), g = -1, v = s.length; ++g < v; )
      s[g].call(e, y);
    r.state === wh && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = qu, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function $u(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Sh && l.state < wh, l.state = qu, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function iT(e) {
  return this.each(function() {
    $u(this, e);
  });
}
function rT(e, a) {
  var r, l;
  return function() {
    var s = Va(this, e), u = s.tween;
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
function lT(e, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = Va(this, e), c = u.tween;
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
function oT(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = wa(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? rT : lT)(r, e, a));
}
function cm(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = Va(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return wa(s, l).value[a];
  };
}
function J1(e, a) {
  var r;
  return (typeof a == "number" ? Oa : a instanceof wr ? Zu : (r = wr(a)) ? (a = r, Zu) : G1)(e, a);
}
function sT(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function uT(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function cT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function fT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function dT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function hT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function mT(e, a) {
  var r = fc(e), l = r === "transform" ? FR : J1;
  return this.attrTween(e, typeof a == "function" ? (r.local ? hT : dT)(r, l, cm(this, "attr." + e, a)) : a == null ? (r.local ? uT : sT)(r) : (r.local ? fT : cT)(r, l, a));
}
function pT(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function gT(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function yT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && gT(e, u)), r;
  }
  return s._value = a, s;
}
function vT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && pT(e, u)), r;
  }
  return s._value = a, s;
}
function bT(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = fc(e);
  return this.tween(r, (l.local ? yT : vT)(l, a));
}
function xT(e, a) {
  return function() {
    um(this, e).delay = +a.apply(this, arguments);
  };
}
function ST(e, a) {
  return a = +a, function() {
    um(this, e).delay = a;
  };
}
function wT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? xT : ST)(a, e)) : wa(this.node(), a).delay;
}
function ET(e, a) {
  return function() {
    Va(this, e).duration = +a.apply(this, arguments);
  };
}
function _T(e, a) {
  return a = +a, function() {
    Va(this, e).duration = a;
  };
}
function NT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ET : _T)(a, e)) : wa(this.node(), a).duration;
}
function CT(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Va(this, e).ease = a;
  };
}
function RT(e) {
  var a = this._id;
  return arguments.length ? this.each(CT(a, e)) : wa(this.node(), a).ease;
}
function TT(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Va(this, e).ease = r;
  };
}
function MT(e) {
  if (typeof e != "function") throw new Error();
  return this.each(TT(this._id, e));
}
function DT(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new fi(l, this._parents, this._name, this._id);
}
function AT(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = r[d], y = p.length, g = c[d] = new Array(y), v, b = 0; b < y; ++b)
      (v = p[b] || m[b]) && (g[b] = v);
  for (; d < l; ++d)
    c[d] = a[d];
  return new fi(c, this._parents, this._name, this._id);
}
function zT(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function OT(e, a, r) {
  var l, s, u = zT(a) ? um : Va;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function jT(e, a) {
  var r = this._id;
  return arguments.length < 2 ? wa(this.node(), r).on.on(e) : this.each(OT(r, e, a));
}
function LT(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function HT() {
  return this.on("end.remove", LT(this._id));
}
function BT(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = im(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, v = 0; v < p; ++v)
      (y = d[v]) && (g = e.call(y, y.__data__, v, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[v] = g, hc(m[v], a, r, v, m, wa(y, r)));
  return new fi(u, this._parents, a, r);
}
function kT(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = T1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var v = e.call(y, y.__data__, g, p), b, w = wa(y, r), N = 0, T = v.length; N < T; ++N)
          (b = v[N]) && hc(b, a, r, N, v, w);
        u.push(v), c.push(y);
      }
  return new fi(u, c, a, r);
}
var UT = Jo.prototype.constructor;
function VT() {
  return new UT(this._groups, this._parents);
}
function qT(e, a) {
  var r, l, s;
  return function() {
    var u = xl(this, e), c = (this.style.removeProperty(e), xl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function W1(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function $T(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = xl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function YT(e, a, r) {
  var l, s, u;
  return function() {
    var c = xl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), xl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function IT(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = Va(this, e), m = p.on, y = p.value[u] == null ? d || (d = W1(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), p.on = l;
  };
}
function GT(e, a, r) {
  var l = (e += "") == "transform" ? XR : J1;
  return a == null ? this.styleTween(e, qT(e, l)).on("end.style." + e, W1(e)) : typeof a == "function" ? this.styleTween(e, YT(e, l, cm(this, "style." + e, a))).each(IT(this._id, e)) : this.styleTween(e, $T(e, l, a), r).on("end.style." + e, null);
}
function XT(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function FT(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && XT(e, c, r)), l;
  }
  return u._value = a, u;
}
function ZT(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, FT(e, a, r ?? ""));
}
function QT(e) {
  return function() {
    this.textContent = e;
  };
}
function PT(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function KT(e) {
  return this.tween("text", typeof e == "function" ? PT(cm(this, "text", e)) : QT(e == null ? "" : e + ""));
}
function JT(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function WT(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && JT(s)), a;
  }
  return l._value = e, l;
}
function eM(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, WT(e));
}
function tM() {
  for (var e = this._name, a = this._id, r = ex(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = wa(p, a);
        hc(p, e, r, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new fi(l, this._parents, e, r);
}
function nM() {
  var e, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = Va(this, l), y = m.on;
      y !== e && (a = (e = y).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var aM = 0;
function fi(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function ex() {
  return ++aM;
}
var ri = Jo.prototype;
fi.prototype = {
  constructor: fi,
  select: BT,
  selectAll: kT,
  selectChild: ri.selectChild,
  selectChildren: ri.selectChildren,
  filter: DT,
  merge: AT,
  selection: VT,
  transition: tM,
  call: ri.call,
  nodes: ri.nodes,
  node: ri.node,
  size: ri.size,
  empty: ri.empty,
  each: ri.each,
  on: jT,
  attr: mT,
  attrTween: bT,
  style: GT,
  styleTween: ZT,
  text: KT,
  textTween: eM,
  remove: HT,
  tween: oT,
  delay: wT,
  duration: NT,
  ease: RT,
  easeVarying: MT,
  end: nM,
  [Symbol.iterator]: ri[Symbol.iterator]
};
function iM(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var rM = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: iM
};
function lM(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function oM(e) {
  var a, r;
  e instanceof fi ? (a = e._id, e = e._name) : (a = ex(), (r = rM).time = sm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && hc(p, e, a, m, c, r || lM(p, a));
  return new fi(l, this._parents, e, a);
}
Jo.prototype.interrupt = iT;
Jo.prototype.transition = oM;
const xu = (e) => () => e;
function sM(e, {
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
function ui(e, a, r) {
  this.k = e, this.x = a, this.y = r;
}
ui.prototype = {
  constructor: ui,
  scale: function(e) {
    return e === 1 ? this : new ui(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new ui(this.k, this.x + this.k * e, this.y + this.k * a);
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
var mc = new ui(1, 0, 0);
tx.prototype = ui.prototype;
function tx(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return mc;
  return e.__zoom;
}
function Xd(e) {
  e.stopImmediatePropagation();
}
function Co(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function uM(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function cM() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function dv() {
  return this.__zoom || mc;
}
function fM(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function dM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function hM(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function nx() {
  var e = uM, a = cM, r = hM, l = fM, s = dM, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = Uu, m = cc("start", "zoom", "end"), y, g, v, b = 500, w = 150, N = 0, T = 10;
  function C(j) {
    j.property("__zoom", dv).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", Y).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  C.transform = function(j, G, R, L) {
    var F = j.selection ? j.selection() : j;
    F.property("__zoom", dv), j !== F ? H(j, G, R, L) : F.interrupt().each(function() {
      k(this, arguments).event(L).start().zoom(null, typeof G == "function" ? G.apply(this, arguments) : G).end();
    });
  }, C.scaleBy = function(j, G, R, L) {
    C.scaleTo(j, function() {
      var F = this.__zoom.k, V = typeof G == "function" ? G.apply(this, arguments) : G;
      return F * V;
    }, R, L);
  }, C.scaleTo = function(j, G, R, L) {
    C.transform(j, function() {
      var F = a.apply(this, arguments), V = this.__zoom, P = R == null ? O(F) : typeof R == "function" ? R.apply(this, arguments) : R, D = V.invert(P), q = typeof G == "function" ? G.apply(this, arguments) : G;
      return r(E(z(V, q), P, D), F, c);
    }, R, L);
  }, C.translateBy = function(j, G, R, L) {
    C.transform(j, function() {
      return r(this.__zoom.translate(
        typeof G == "function" ? G.apply(this, arguments) : G,
        typeof R == "function" ? R.apply(this, arguments) : R
      ), a.apply(this, arguments), c);
    }, null, L);
  }, C.translateTo = function(j, G, R, L, F) {
    C.transform(j, function() {
      var V = a.apply(this, arguments), P = this.__zoom, D = L == null ? O(V) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(mc.translate(D[0], D[1]).scale(P.k).translate(
        typeof G == "function" ? -G.apply(this, arguments) : -G,
        typeof R == "function" ? -R.apply(this, arguments) : -R
      ), V, c);
    }, L, F);
  };
  function z(j, G) {
    return G = Math.max(u[0], Math.min(u[1], G)), G === j.k ? j : new ui(G, j.x, j.y);
  }
  function E(j, G, R) {
    var L = G[0] - R[0] * j.k, F = G[1] - R[1] * j.k;
    return L === j.x && F === j.y ? j : new ui(j.k, L, F);
  }
  function O(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function H(j, G, R, L) {
    j.on("start.zoom", function() {
      k(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var F = this, V = arguments, P = k(F, V).event(L), D = a.apply(F, V), q = R == null ? O(D) : typeof R == "function" ? R.apply(F, V) : R, Q = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), te = F.__zoom, se = typeof G == "function" ? G.apply(F, V) : G, he = p(te.invert(q).concat(Q / te.k), se.invert(q).concat(Q / se.k));
      return function(me) {
        if (me === 1) me = se;
        else {
          var ee = he(me), ge = Q / ee[2];
          me = new ui(ge, q[0] - ee[0] * ge, q[1] - ee[1] * ge);
        }
        P.zoom(null, me);
      };
    });
  }
  function k(j, G, R) {
    return !R && j.__zooming || new B(j, G);
  }
  function B(j, G) {
    this.that = j, this.args = G, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, G), this.taps = 0;
  }
  B.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, G) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = G.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = G.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = G.invert(this.touch1[0])), this.that.__zoom = G, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var G = Yn(this.that).datum();
      m.call(
        j,
        this.that,
        new sM(j, {
          sourceEvent: this.sourceEvent,
          target: C,
          transform: this.that.__zoom,
          dispatch: m
        }),
        G
      );
    }
  };
  function A(j, ...G) {
    if (!e.apply(this, arguments)) return;
    var R = k(this, G).event(j), L = this.__zoom, F = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), V = ga(j);
    if (R.wheel)
      (R.mouse[0][0] !== V[0] || R.mouse[0][1] !== V[1]) && (R.mouse[1] = L.invert(R.mouse[0] = V)), clearTimeout(R.wheel);
    else {
      if (L.k === F) return;
      R.mouse = [V, L.invert(V)], $u(this), R.start();
    }
    Co(j), R.wheel = setTimeout(P, w), R.zoom("mouse", r(E(z(L, F), R.mouse[0], R.mouse[1]), R.extent, c));
    function P() {
      R.wheel = null, R.end();
    }
  }
  function I(j, ...G) {
    if (v || !e.apply(this, arguments)) return;
    var R = j.currentTarget, L = k(this, G, !0).event(j), F = Yn(j.view).on("mousemove.zoom", q, !0).on("mouseup.zoom", Q, !0), V = ga(j, R), P = j.clientX, D = j.clientY;
    U1(j.view), Xd(j), L.mouse = [V, this.__zoom.invert(V)], $u(this), L.start();
    function q(te) {
      if (Co(te), !L.moved) {
        var se = te.clientX - P, he = te.clientY - D;
        L.moved = se * se + he * he > N;
      }
      L.event(te).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ga(te, R), L.mouse[1]), L.extent, c));
    }
    function Q(te) {
      F.on("mousemove.zoom mouseup.zoom", null), V1(te.view, L.moved), Co(te), L.event(te).end();
    }
  }
  function le(j, ...G) {
    if (e.apply(this, arguments)) {
      var R = this.__zoom, L = ga(j.changedTouches ? j.changedTouches[0] : j, this), F = R.invert(L), V = R.k * (j.shiftKey ? 0.5 : 2), P = r(E(z(R, V), L, F), a.apply(this, G), c);
      Co(j), d > 0 ? Yn(this).transition().duration(d).call(H, P, L, j) : Yn(this).call(C.transform, P, L, j);
    }
  }
  function Y(j, ...G) {
    if (e.apply(this, arguments)) {
      var R = j.touches, L = R.length, F = k(this, G, j.changedTouches.length === L).event(j), V, P, D, q;
      for (Xd(j), P = 0; P < L; ++P)
        D = R[P], q = ga(D, this), q = [q, this.__zoom.invert(q), D.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== q[2] && (F.touch1 = q, F.taps = 0) : (F.touch0 = q, V = !0, F.taps = 1 + !!y);
      y && (y = clearTimeout(y)), V && (F.taps < 2 && (g = q[0], y = setTimeout(function() {
        y = null;
      }, b)), $u(this), F.start());
    }
  }
  function K(j, ...G) {
    if (this.__zooming) {
      var R = k(this, G).event(j), L = j.changedTouches, F = L.length, V, P, D, q;
      for (Co(j), V = 0; V < F; ++V)
        P = L[V], D = ga(P, this), R.touch0 && R.touch0[2] === P.identifier ? R.touch0[0] = D : R.touch1 && R.touch1[2] === P.identifier && (R.touch1[0] = D);
      if (P = R.that.__zoom, R.touch1) {
        var Q = R.touch0[0], te = R.touch0[1], se = R.touch1[0], he = R.touch1[1], me = (me = se[0] - Q[0]) * me + (me = se[1] - Q[1]) * me, ee = (ee = he[0] - te[0]) * ee + (ee = he[1] - te[1]) * ee;
        P = z(P, Math.sqrt(me / ee)), D = [(Q[0] + se[0]) / 2, (Q[1] + se[1]) / 2], q = [(te[0] + he[0]) / 2, (te[1] + he[1]) / 2];
      } else if (R.touch0) D = R.touch0[0], q = R.touch0[1];
      else return;
      R.zoom("touch", r(E(P, D, q), R.extent, c));
    }
  }
  function re(j, ...G) {
    if (this.__zooming) {
      var R = k(this, G).event(j), L = j.changedTouches, F = L.length, V, P;
      for (Xd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, b), V = 0; V < F; ++V)
        P = L[V], R.touch0 && R.touch0[2] === P.identifier ? delete R.touch0 : R.touch1 && R.touch1[2] === P.identifier && delete R.touch1;
      if (R.touch1 && !R.touch0 && (R.touch0 = R.touch1, delete R.touch1), R.touch0) R.touch0[1] = this.__zoom.invert(R.touch0[0]);
      else if (R.end(), R.taps === 2 && (P = ga(P, this), Math.hypot(g[0] - P[0], g[1] - P[1]) < T)) {
        var D = Yn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return C.wheelDelta = function(j) {
    return arguments.length ? (l = typeof j == "function" ? j : xu(+j), C) : l;
  }, C.filter = function(j) {
    return arguments.length ? (e = typeof j == "function" ? j : xu(!!j), C) : e;
  }, C.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : xu(!!j), C) : s;
  }, C.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : xu([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), C) : a;
  }, C.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], C) : [u[0], u[1]];
  }, C.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], C) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, C.constrain = function(j) {
    return arguments.length ? (r = j, C) : r;
  }, C.duration = function(j) {
    return arguments.length ? (d = +j, C) : d;
  }, C.interpolate = function(j) {
    return arguments.length ? (p = j, C) : p;
  }, C.on = function() {
    var j = m.on.apply(m, arguments);
    return j === m ? C : j;
  }, C.clickDistance = function(j) {
    return arguments.length ? (N = (j = +j) * j, C) : Math.sqrt(N);
  }, C.tapDistance = function(j) {
    return arguments.length ? (T = +j, C) : T;
  }, C;
}
const xa = {
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
}, qo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], ax = ["Enter", " ", "Escape"], ix = {
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
var wl;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(wl || (wl = {}));
var Sr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Sr || (Sr = {}));
var $o;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})($o || ($o = {}));
const rx = {
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
var Xi;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Xi || (Xi = {}));
var Ju;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(Ju || (Ju = {}));
var Ae;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(Ae || (Ae = {}));
const hv = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function lx(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const ox = (e) => "id" in e && "source" in e && "target" in e, mM = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), fm = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), es = (e, a = [0, 0]) => {
  const { width: r, height: l } = hi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, pM = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : fm(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? Wu(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return pc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return gc(r);
}, ts = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = pc(r, Wu(s)), l = !0);
  }), l ? gc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, dm = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Tl(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: v = !1 } = m;
    if (c && !g || v)
      continue;
    const b = y.width ?? m.width ?? m.initialWidth ?? null, w = y.height ?? m.height ?? m.initialHeight ?? null, N = Yo(d, _l(m)), T = (b ?? 0) * (w ?? 0), C = u && N > 0;
    (!m.internals.handleBounds || C || N >= T || m.dragging) && p.push(m);
  }
  return p;
}, gM = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function yM(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function vM({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = yM(e, c), p = ts(d), m = mm(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function sx({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(e), d = c.parentId ? r.get(c.parentId) : void 0, { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", xa.error005());
    else {
      const b = d.measured.width, w = d.measured.height;
      b && w && (g = [
        [p, m],
        [p + b, m + w]
      ]);
    }
  else d && Nr(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const v = Nr(g) ? _r(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", xa.error015()), {
    position: {
      x: v.x - p + (c.measured.width ?? 0) * y[0],
      y: v.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function bM({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const b = u.has(v.id), w = !b && v.parentId && c.find((N) => N.id === v.parentId);
    (b || w) && c.push(v);
  }
  const d = new Set(a.map((v) => v.id)), p = l.filter((v) => v.deletable !== !1), y = gM(c, p);
  for (const v of p)
    d.has(v.id) && !y.find((w) => w.id === v.id) && y.push(v);
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
const El = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), _r = (e = { x: 0, y: 0 }, a, r) => ({
  x: El(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: El(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function ux(e, a, r) {
  const { width: l, height: s } = hi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return _r(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const mv = (e, a, r) => e < a ? El(Math.abs(e - a), 1, a) / a : e > r ? -El(Math.abs(e - r), 1, a) / a : 0, hm = (e, a, r = 15, l = 40) => {
  const s = mv(e.x, l, a.width - l) * r, u = mv(e.y, l, a.height - l) * r;
  return [s, u];
}, pc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), Eh = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), gc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), _l = (e, a = [0, 0]) => {
  const { x: r, y: l } = fm(e) ? e.internals.positionAbsolute : es(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, Wu = (e, a = [0, 0]) => {
  const { x: r, y: l } = fm(e) ? e.internals.positionAbsolute : es(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, cx = (e, a) => gc(pc(Eh(e), Eh(a))), Yo = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, pv = (e) => va(e.width) && va(e.height) && va(e.x) && va(e.y), va = (e) => !isNaN(e) && isFinite(e), fx = (e, a) => (r, l) => {
}, ns = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Tl = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? ns(d, c) : d;
}, Nl = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function sl(e, a) {
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
function xM(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = sl(e, r), s = sl(e, a);
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
    const l = sl(e.top ?? e.y ?? 0, r), s = sl(e.bottom ?? e.y ?? 0, r), u = sl(e.left ?? e.x ?? 0, a), c = sl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function SM(e, a, r, l, s, u) {
  const { x: c, y: d } = Nl(e, [a, r, l]), { x: p, y: m } = Nl({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const mm = (e, a, r, l, s, u) => {
  const c = xM(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, m = Math.min(d, p), y = El(m, l, s), g = e.x + e.width / 2, v = e.y + e.height / 2, b = a / 2 - g * y, w = r / 2 - v * y, N = SM(e, b, w, y, a, r), T = {
    left: Math.min(N.left - c.left, 0),
    top: Math.min(N.top - c.top, 0),
    right: Math.min(N.right - c.right, 0),
    bottom: Math.min(N.bottom - c.bottom, 0)
  };
  return {
    x: b - T.left + T.right,
    y: w - T.top + T.bottom,
    zoom: y
  };
}, Io = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Nr(e) {
  return e != null && e !== "parent";
}
function hi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function dx(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function hx(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function gv(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function wM() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function EM(e) {
  return { ...ix, ...e || {} };
}
function jo(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = ba(e), d = Tl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = r ? ns(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const pm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), mx = (e) => e?.getRootNode?.() || window?.document, _M = ["INPUT", "SELECT", "TEXTAREA"];
function px(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : _M.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const gx = (e) => "clientX" in e, ba = (e, a) => {
  const r = gx(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, yv = (e, a, r, l, s) => {
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
      ...pm(c)
    };
  });
};
function yx({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function Su(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function vv({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case Ae.Left:
      return [a - Su(a - l, u), r];
    case Ae.Right:
      return [a + Su(l - a, u), r];
    case Ae.Top:
      return [a, r - Su(r - s, u)];
    case Ae.Bottom:
      return [a, r + Su(s - r, u)];
  }
}
function vx({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [d, p] = vv({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = vv({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, v, b, w] = yx({
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
    v,
    b,
    w
  ];
}
function bx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function NM({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function CM({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = pc(Wu(e), Wu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Yo(c, gc(u)) > 0;
}
const RM = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, TM = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), MM = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", xa.error006()), a;
  const l = r.getEdgeId || RM;
  let s;
  return ox(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, TM(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function xx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = bx({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const bv = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, DM = ({ source: e, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, xv = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function AM({ source: e, sourcePosition: a = Ae.Bottom, target: r, targetPosition: l = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const d = bv[a], p = bv[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: r.x + p.x * u, y: r.y + p.y * u }, g = DM({
    source: m,
    sourcePosition: a,
    target: y
  }), v = g.x !== 0 ? "x" : "y", b = g[v];
  let w = [], N, T;
  const C = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, O] = bx({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[v] * p[v] === -1) {
    v === "x" ? (N = s.x ?? m.x + (y.x - m.x) * c, T = s.y ?? (m.y + y.y) / 2) : (N = s.x ?? (m.x + y.x) / 2, T = s.y ?? m.y + (y.y - m.y) * c);
    const A = [
      { x: N, y: m.y },
      { x: N, y: y.y }
    ], I = [
      { x: m.x, y: T },
      { x: y.x, y: T }
    ];
    d[v] === b ? w = v === "x" ? A : I : w = v === "x" ? I : A;
  } else {
    const A = [{ x: m.x, y: y.y }], I = [{ x: y.x, y: m.y }];
    if (v === "x" ? w = d.x === b ? I : A : w = d.y === b ? A : I, a === l) {
      const j = Math.abs(e[v] - r[v]);
      if (j <= u) {
        const G = Math.min(u - 1, u - j);
        d[v] === b ? C[v] = (m[v] > e[v] ? -1 : 1) * G : z[v] = (y[v] > r[v] ? -1 : 1) * G;
      }
    }
    if (a !== l) {
      const j = v === "x" ? "y" : "x", G = d[v] === p[j], R = m[j] > y[j], L = m[j] < y[j];
      (d[v] === 1 && (!G && R || G && L) || d[v] !== 1 && (!G && L || G && R)) && (w = v === "x" ? A : I);
    }
    const le = { x: m.x + C.x, y: m.y + C.y }, Y = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(le.x - w[0].x), Math.abs(Y.x - w[0].x)), re = Math.max(Math.abs(le.y - w[0].y), Math.abs(Y.y - w[0].y));
    K >= re ? (N = (le.x + Y.x) / 2, T = w[0].y) : (N = w[0].x, T = (le.y + Y.y) / 2);
  }
  const H = { x: m.x + C.x, y: m.y + C.y }, k = { x: y.x + z.x, y: y.y + z.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...H.x !== w[0].x || H.y !== w[0].y ? [H] : [],
    ...w,
    ...k.x !== w[w.length - 1].x || k.y !== w[w.length - 1].y ? [k] : [],
    r
  ], N, T, E, O];
}
function zM(e, a, r, l) {
  const s = Math.min(xv(e, a) / 2, xv(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < r.x ? -1 : 1, y = e.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function _h({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, v, b, w, N] = AM({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let T = `M${g[0].x} ${g[0].y}`;
  for (let C = 1; C < g.length - 1; C++)
    T += zM(g[C - 1], g[C], g[C + 1], c);
  return T += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [T, v, b, w, N];
}
function Sv(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function OM(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!Sv(a) || !Sv(r))
    return null;
  const l = a.internals.handleBounds || wv(a.handles), s = r.internals.handleBounds || wv(r.handles), u = Ev(l?.source ?? [], e.sourceHandle), c = Ev(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === wl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", xa.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || Ae.Bottom, p = c?.position || Ae.Top, m = Cr(a, u, d), y = Cr(r, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function wv(e) {
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
function Cr(e, a, r = Ae.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? hi(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? r) {
    case Ae.Top:
      return { x: s + c / 2, y: u };
    case Ae.Right:
      return { x: s + c, y: u + d / 2 };
    case Ae.Bottom:
      return { x: s + c / 2, y: u + d };
    case Ae.Left:
      return { x: s, y: u + d / 2 };
  }
}
function Ev(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function Nh(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function jM(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = Nh(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || r, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Sx = 1e3, LM = 10, gm = {
  nodeOrigin: [0, 0],
  nodeExtent: qo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, HM = {
  ...gm,
  checkEquality: !0
};
function ym(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function BM(e, a, r) {
  const l = ym(gm, r);
  for (const s of e.values())
    if (s.parentId)
      bm(s, e, a, l);
    else {
      const u = es(s, l.nodeOrigin), c = Nr(s.extent) ? s.extent : l.nodeExtent, d = _r(u, c, hi(s));
      s.internals.positionAbsolute = d;
    }
}
function kM(e, a) {
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
function vm(e) {
  return e === "manual";
}
function Ch(e, a, r, l = {}) {
  const s = ym(HM, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !vm(s.zIndexMode) ? Sx : 0;
  let p = e.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const v = es(y, s.nodeOrigin), b = Nr(y.extent) ? y.extent : s.nodeExtent, w = _r(v, b, hi(y));
      g = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: w,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: kM(y, g),
          z: wx(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && bm(g, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function UM(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function bm(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = ym(gm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  UM(e, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * LM), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !vm(p) ? Sx : 0, { x: v, y: b, z: w } = VM(e, y, c, d, g, p), { positionAbsolute: N } = e.internals, T = v !== N.x || b !== N.y;
  (T || w !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: T ? { x: v, y: b } : N,
      z: w
    }
  });
}
function wx(e, a, r) {
  const l = va(e.zIndex) ? e.zIndex : 0;
  return vm(r) ? l : l + (e.selected ? a : 0);
}
function VM(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = hi(e), m = es(e, r), y = Nr(e.extent) ? _r(m, e.extent, p) : m;
  let g = _r({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = ux(g, p, a));
  const v = wx(e, s, u), b = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: b >= v ? b + 1 : v
  };
}
function xm(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? _l(d), m = cx(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = hi(d), g = d.origin ?? l, v = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, b = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, w = Math.max(y.width, Math.round(c.width)), N = Math.max(y.height, Math.round(c.height)), T = (w - y.width) * g[0], C = (N - y.height) * g[1];
    (v > 0 || b > 0 || T || C) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - v + T,
        y: d.position.y - b + C
      }
    }), r.get(p)?.forEach((z) => {
      e.some((E) => E.id === z.id) || s.push({
        id: z.id,
        type: "position",
        position: {
          x: z.position.x + v,
          y: z.position.y + b
        }
      });
    })), (y.width < c.width || y.height < c.height || v || b) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (v ? g[0] * v - T : 0),
        height: N + (b ? g[1] * b - C : 0)
      }
    });
  }), s;
}
function qM(e, a, r, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const m = [], y = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const b of e.values()) {
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
      }), p = !0;
      continue;
    }
    const N = pm(b.nodeElement), T = w.measured.width !== N.width || w.measured.height !== N.height;
    if (!!(N.width && N.height && (T || !w.internals.handleBounds || b.force))) {
      const z = b.nodeElement.getBoundingClientRect(), E = Nr(w.extent) ? w.extent : u;
      let { positionAbsolute: O } = w.internals;
      w.parentId && w.extent === "parent" ? O = ux(O, N, a.get(w.parentId)) : E && (O = _r(O, E, N));
      const H = {
        ...w,
        measured: N,
        internals: {
          ...w.internals,
          positionAbsolute: O,
          handleBounds: {
            source: yv("source", b.nodeElement, z, g, w.id),
            target: yv("target", b.nodeElement, z, g, w.id)
          }
        }
      };
      a.set(w.id, H), w.parentId && bm(H, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, T && (m.push({
        id: w.id,
        type: "dimensions",
        dimensions: N
      }), w.expandParent && w.parentId && v.push({
        id: w.id,
        parentId: w.parentId,
        rect: _l(H, s)
      }));
    }
  }
  if (v.length > 0) {
    const b = xm(v, a, r, s);
    m.push(...b);
  }
  return { changes: m, updatedInternals: p };
}
async function $M({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
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
function _v(e, a, r, l, s, u) {
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
function Ex(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    _v("source", p, y, e, s, c), _v("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function _x(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : _x(r, a) : !1;
}
function Nv(e, a, r) {
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
function YM(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !_x(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function Fd({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
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
function IM({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = ns(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function GM({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, v = null, b = !1, w = !1, N = null;
  function T({ noDragClassName: z, handleSelector: E, domNode: O, isSelectable: H, nodeId: k, nodeClickDistance: B = 0 }) {
    v = Yn(O);
    function A({ x: K, y: re }) {
      const { nodeLookup: j, nodeExtent: G, snapGrid: R, snapToGrid: L, nodeOrigin: F, onNodeDrag: V, onSelectionDrag: P, onError: D, updateNodePositions: q } = a();
      u = { x: K, y: re };
      let Q = !1;
      const te = d.size > 1, se = te && G ? Eh(ts(d)) : null, he = te && L ? IM({
        dragItems: d,
        snapGrid: R,
        x: K,
        y: re
      }) : null;
      for (const [me, ee] of d) {
        if (!j.has(me))
          continue;
        let ge = { x: K - ee.distance.x, y: re - ee.distance.y };
        L && (ge = he ? {
          x: Math.round(ge.x + he.x),
          y: Math.round(ge.y + he.y)
        } : ns(ge, R));
        let ze = null;
        if (te && G && !ee.extent && se) {
          const { positionAbsolute: xe } = ee.internals, Ce = xe.x - se.x + G[0][0], $e = xe.x + ee.measured.width - se.x2 + G[1][0], ft = xe.y - se.y + G[0][1], Te = xe.y + ee.measured.height - se.y2 + G[1][1];
          ze = [
            [Ce, ft],
            [$e, Te]
          ];
        }
        const { position: Re, positionAbsolute: we } = sx({
          nodeId: me,
          nextPosition: ge,
          nodeLookup: j,
          nodeExtent: ze || G,
          nodeOrigin: F,
          onError: D
        });
        Q = Q || ee.position.x !== Re.x || ee.position.y !== Re.y, ee.position = Re, ee.internals.positionAbsolute = we;
      }
      if (w = w || Q, !!Q && (q(d, !0), N && (l || V || !k && P))) {
        const [me, ee] = Fd({
          nodeId: k,
          dragItems: d,
          nodeLookup: j
        });
        l?.(N, d, me, ee), V?.(N, me, ee), k || P?.(N, ee);
      }
    }
    async function I() {
      if (!y)
        return;
      const { transform: K, panBy: re, autoPanSpeed: j, autoPanOnNodeDrag: G } = a();
      if (!G) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [R, L] = hm(m, y, j);
      (R !== 0 || L !== 0) && (u.x = (u.x ?? 0) - R / K[2], u.y = (u.y ?? 0) - L / K[2], await re({ x: R, y: L }) && A(u)), c = requestAnimationFrame(I);
    }
    function le(K) {
      const { nodeLookup: re, multiSelectionActive: j, nodesDraggable: G, transform: R, snapGrid: L, snapToGrid: F, selectNodesOnDrag: V, onNodeDragStart: P, onSelectionDragStart: D, unselectNodesAndEdges: q } = a();
      g = !0, (!V || !H) && !j && k && (re.get(k)?.selected || q()), H && V && k && e?.(k);
      const Q = jo(K.sourceEvent, { transform: R, snapGrid: L, snapToGrid: F, containerBounds: y });
      if (u = Q, d = YM(re, G, Q, k), d.size > 0 && (r || P || !k && D)) {
        const [te, se] = Fd({
          nodeId: k,
          dragItems: d,
          nodeLookup: re
        });
        r?.(K.sourceEvent, d, te, se), P?.(K.sourceEvent, te, se), k || D?.(K.sourceEvent, se);
      }
    }
    const Y = q1().clickDistance(B).on("start", (K) => {
      const { domNode: re, nodeDragThreshold: j, transform: G, snapGrid: R, snapToGrid: L } = a();
      y = re?.getBoundingClientRect() || null, b = !1, w = !1, N = K.sourceEvent, j === 0 && le(K), u = jo(K.sourceEvent, { transform: G, snapGrid: R, snapToGrid: L, containerBounds: y }), m = ba(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: re, transform: j, snapGrid: G, snapToGrid: R, nodeDragThreshold: L, nodeLookup: F } = a(), V = jo(K.sourceEvent, { transform: j, snapGrid: G, snapToGrid: R, containerBounds: y });
      if (N = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      k && !F.has(k)) && (b = !0), !b) {
        if (!p && re && g && (p = !0, I()), !g) {
          const P = ba(K.sourceEvent, y), D = P.x - m.x, q = P.y - m.y;
          Math.sqrt(D * D + q * q) > L && le(K);
        }
        (u.x !== V.xSnapped || u.y !== V.ySnapped) && d && g && (m = ba(K.sourceEvent, y), A(V));
      }
    }).on("end", (K) => {
      if (!g || b) {
        b && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: re, updateNodePositions: j, onNodeDragStop: G, onSelectionDragStop: R } = a();
        if (w && (j(d, !1), w = !1), s || G || !k && R) {
          const [L, F] = Fd({
            nodeId: k,
            dragItems: d,
            nodeLookup: re,
            dragging: !1
          });
          s?.(K.sourceEvent, d, L, F), G?.(K.sourceEvent, L, F), k || R?.(K.sourceEvent, F);
        }
      }
    }).filter((K) => {
      const re = K.target;
      return !K.button && (!z || !Nv(re, `.${z}`, O)) && (!E || Nv(re, E, O));
    });
    v.call(Y);
  }
  function C() {
    v?.on(".drag", null);
  }
  return {
    update: T,
    destroy: C
  };
}
function XM(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Yo(s, _l(u)) > 0 && l.push(u);
  return l;
}
const FM = 250;
function ZM(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = XM(e, r, a + FM);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: g } = Cr(d, m, m.position, !0), v = Math.sqrt(Math.pow(y - e.x, 2) + Math.pow(g - e.y, 2));
      v > a || (v < u ? (s = [{ ...m, x: y, y: g }], u = v) : v === u && s.push({ ...m, x: y, y: g }));
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
function Nx(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((m) => m.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...Cr(c, p, p.position, !0) } : p;
}
function Cx(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function QM(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const Rx = () => !0;
function PM(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: v, cancelConnection: b, onConnectStart: w, onConnect: N, onConnectEnd: T, isValidConnection: C = Rx, onReconnectEnd: z, updateConnection: E, getTransform: O, getFromHandle: H, autoPanSpeed: k, dragThreshold: B = 1, handleDomNode: A }) {
  const I = mx(e.target);
  let le = 0, Y;
  const { x: K, y: re } = ba(e), j = Cx(u, A), G = d?.getBoundingClientRect();
  let R = !1;
  if (!G || !j)
    return;
  const L = Nx(s, j, l, p, a);
  if (!L)
    return;
  let F = ba(e, G), V = !1, P = null, D = !1, q = null;
  function Q() {
    if (!y || !G)
      return;
    const [Re, we] = hm(F, G, k);
    v({ x: Re, y: we }), le = requestAnimationFrame(Q);
  }
  const te = {
    ...L,
    nodeId: s,
    type: j,
    position: L.position
  }, se = p.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: Cr(se, te, Ae.Left, !0),
    fromHandle: te,
    fromPosition: te.position,
    fromNode: se,
    to: F,
    toHandle: null,
    toPosition: hv[te.position],
    toNode: null,
    pointer: F
  };
  function ee() {
    R = !0, E(me), w?.(e, { nodeId: s, handleId: l, handleType: j });
  }
  B === 0 && ee();
  function ge(Re) {
    if (!R) {
      const { x: Te, y: Xe } = ba(Re), Be = Te - K, Ye = Xe - re;
      if (!(Be * Be + Ye * Ye > B * B))
        return;
      ee();
    }
    if (!H() || !te) {
      ze(Re);
      return;
    }
    const we = O();
    F = ba(Re, G), Y = ZM(Tl(F, we, !1, [1, 1]), r, p, te), V || (Q(), V = !0);
    const xe = Tx(Re, {
      handle: Y,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: C,
      doc: I,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    q = xe.handleDomNode, P = xe.connection, D = QM(!!Y, xe.isValid);
    const Ce = p.get(s), $e = Ce ? Cr(Ce, te, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: $e,
      isValid: D,
      to: xe.toHandle && D ? Nl({ x: xe.toHandle.x, y: xe.toHandle.y }, we) : F,
      toHandle: xe.toHandle,
      toPosition: D && xe.toHandle ? xe.toHandle.position : hv[te.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: F
    };
    E(ft), me = ft;
  }
  function ze(Re) {
    if (!("touches" in Re && Re.touches.length > 0)) {
      if (R) {
        (Y || q) && P && D && N?.(P);
        const { inProgress: we, ...xe } = me, Ce = {
          ...xe,
          toPosition: me.toHandle ? me.toPosition : null
        };
        T?.(Re, Ce), u && z?.(Re, Ce);
      }
      b(), cancelAnimationFrame(le), V = !1, D = !1, P = null, q = null, I.removeEventListener("mousemove", ge), I.removeEventListener("mouseup", ze), I.removeEventListener("touchmove", ge), I.removeEventListener("touchend", ze);
    }
  }
  I.addEventListener("mousemove", ge), I.addEventListener("mouseup", ze), I.addEventListener("touchmove", ge), I.addEventListener("touchend", ze);
}
function Tx(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Rx, nodeLookup: y }) {
  const g = u === "target", v = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x: b, y: w } = ba(e), N = c.elementFromPoint(b, w), T = N?.classList.contains(`${d}-flow__handle`) ? N : v, C = {
    handleDomNode: T,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (T) {
    const z = Cx(void 0, T), E = T.getAttribute("data-nodeid"), O = T.getAttribute("data-handleid"), H = T.classList.contains("connectable"), k = T.classList.contains("connectableend");
    if (!E || !z)
      return C;
    const B = {
      source: g ? E : l,
      sourceHandle: g ? O : s,
      target: g ? l : E,
      targetHandle: g ? s : O
    };
    C.connection = B;
    const I = H && k && (r === wl.Strict ? g && z === "source" || !g && z === "target" : E !== l || O !== s);
    C.isValid = I && m(B), C.toHandle = Nx(E, z, O, y, r, !0);
  }
  return C;
}
const Rh = {
  onPointerDown: PM,
  isValid: Tx
};
function KM({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Yn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: v = !0, inversePan: b = !1 }) {
    const w = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), H = E.sourceEvent.ctrlKey && Io() ? 10 : 1, k = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, B = O[2] * Math.pow(2, k * H);
      a.scaleTo(B);
    };
    let N = [0, 0];
    const T = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (N = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, C = (E) => {
      const O = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const H = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], k = [H[0] - N[0], H[1] - N[1]];
      N = H;
      const B = l() * Math.max(O[2], Math.log(O[2])) * (b ? -1 : 1), A = {
        x: O[0] - k[0] * B,
        y: O[1] - k[1] * B
      }, I = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, I, d);
    }, z = nx().on("start", T).on("zoom", g ? C : null).on("zoom.wheel", v ? w : null);
    s.call(z, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: ga
  };
}
const yc = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), Zd = ({ x: e, y: a, zoom: r }) => mc.translate(e, a).scale(r), ml = (e, a) => e.target.closest(`.${a}`), Mx = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), JM = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, Qd = (e, a = 0, r = JM, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, Dx = (e) => {
  const a = e.ctrlKey && Io() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function WM({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (ml(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const T = ga(y), C = Dx(y), z = g * Math.pow(2, C);
      l.scaleTo(r, z, T, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let b = s === Sr.Vertical ? 0 : y.deltaX * v, w = s === Sr.Horizontal ? 0 : y.deltaY * v;
    !Io() && y.shiftKey && s !== Sr.Vertical && (b = y.deltaY * v, w = 0), l.translateBy(
      r,
      -(b / g) * u,
      -(w / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const N = yc(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, N), e.panScrollTimeout = setTimeout(() => {
      m?.(y, N), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, N));
  };
}
function eD({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = ml(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function tD({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = yc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function nD({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && Mx(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, yc(u.transform));
  };
}
function aD({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Mx(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = yc(c.transform);
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
function iD({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const v = e || a, b = r && g.ctrlKey, w = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (ml(g, `${m}-flow__node`) || ml(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !v && !s && !u && !r || c || y && !w || ml(g, d) && w || ml(g, p) && (!w || s && w && !e) || !r && g.ctrlKey && w)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!v && !s && !b && w || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const N = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || w) && N;
  };
}
function rD({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = nx().scaleExtent([a, r]).translateExtent(l), v = Yn(e).call(g);
  z({
    x: s.x,
    y: s.y,
    zoom: El(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const b = v.on("wheel.zoom"), w = v.on("dblclick.zoom");
  g.wheelDelta(Dx);
  async function N(Y, K) {
    return v ? new Promise((re) => {
      g?.interpolate(K?.interpolate === "linear" ? Oo : Uu).transform(Qd(v, K?.duration, K?.ease, () => re(!0)), Y);
    }) : !1;
  }
  function T({ noWheelClassName: Y, noPanClassName: K, onPaneContextMenu: re, userSelectionActive: j, panOnScroll: G, panOnDrag: R, panOnScrollMode: L, panOnScrollSpeed: F, preventScrolling: V, zoomOnPinch: P, zoomOnScroll: D, zoomOnDoubleClick: q, zoomActivationKeyPressed: Q, lib: te, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: ee }) {
    j && !m.isZoomingOrPanning && C();
    const ge = G && !Q && !j;
    g.clickDistance(ee ? 1 / 0 : !va(me) || me < 0 ? 0 : me);
    const ze = ge ? WM({
      zoomPanValues: m,
      noWheelClassName: Y,
      d3Selection: v,
      d3Zoom: g,
      panOnScrollMode: L,
      panOnScrollSpeed: F,
      zoomOnPinch: P,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : eD({
      noWheelClassName: Y,
      preventScrolling: V,
      d3ZoomHandler: b
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Re = tD({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Re);
    const we = nD({
      zoomPanValues: m,
      panOnDrag: R,
      onPaneContextMenu: !!re,
      onPanZoom: u,
      onTransformChange: se
    });
    g.on("zoom", we);
    const xe = aD({
      zoomPanValues: m,
      panOnDrag: R,
      panOnScroll: G,
      onPaneContextMenu: re,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", xe);
    const Ce = iD({
      zoomActivationKeyPressed: Q,
      panOnDrag: R,
      zoomOnScroll: D,
      panOnScroll: G,
      zoomOnDoubleClick: q,
      zoomOnPinch: P,
      userSelectionActive: j,
      noPanClassName: K,
      noWheelClassName: Y,
      lib: te,
      connectionInProgress: he
    });
    g.filter(Ce), q ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null);
  }
  function C() {
    g.on("zoom", null);
  }
  async function z(Y, K, re) {
    const j = Zd(Y), G = g?.constrain()(j, K, re);
    return G && await N(G), G;
  }
  async function E(Y, K) {
    const re = Zd(Y);
    return await N(re, K), re;
  }
  function O(Y) {
    if (v) {
      const K = Zd(Y), re = v.property("__zoom");
      (re.k !== Y.zoom || re.x !== Y.x || re.y !== Y.y) && g?.transform(v, K, null, { sync: !0 });
    }
  }
  function H() {
    const Y = v ? tx(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: Y.x, y: Y.y, zoom: Y.k };
  }
  async function k(Y, K) {
    return v ? new Promise((re) => {
      g?.interpolate(K?.interpolate === "linear" ? Oo : Uu).scaleTo(Qd(v, K?.duration, K?.ease, () => re(!0)), Y);
    }) : !1;
  }
  async function B(Y, K) {
    return v ? new Promise((re) => {
      g?.interpolate(K?.interpolate === "linear" ? Oo : Uu).scaleBy(Qd(v, K?.duration, K?.ease, () => re(!0)), Y);
    }) : !1;
  }
  function A(Y) {
    g?.scaleExtent(Y);
  }
  function I(Y) {
    g?.translateExtent(Y);
  }
  function le(Y) {
    const K = !va(Y) || Y < 0 ? 0 : Y;
    g?.clickDistance(K);
  }
  return {
    update: T,
    destroy: C,
    setViewport: E,
    setViewportConstrained: z,
    getViewport: H,
    scaleTo: k,
    scaleBy: B,
    setScaleExtent: A,
    setTranslateExtent: I,
    syncViewport: O,
    setClickDistance: le
  };
}
var Cl;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Cl || (Cl = {}));
function lD({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function Cv(e) {
  const a = e.includes("right") || e.includes("left"), r = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function $i(e, a) {
  return Math.max(0, a - e);
}
function Yi(e, a) {
  return Math.max(0, e - a);
}
function wu(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function Rv(e, a) {
  return e ? !a : a;
}
function oD(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, v = y && g, { xSnapped: b, ySnapped: w } = r, { minWidth: N, maxWidth: T, minHeight: C, maxHeight: z } = l, { x: E, y: O, width: H, height: k, aspectRatio: B } = e;
  let A = Math.floor(y ? b - e.pointerX : 0), I = Math.floor(g ? w - e.pointerY : 0);
  const le = H + (p ? -A : A), Y = k + (m ? -I : I), K = -u[0] * H, re = -u[1] * k;
  let j = wu(le, N, T), G = wu(Y, C, z);
  if (c) {
    let F = 0, V = 0;
    p && A < 0 ? F = $i(E + A + K, c[0][0]) : !p && A > 0 && (F = Yi(E + le + K, c[1][0])), m && I < 0 ? V = $i(O + I + re, c[0][1]) : !m && I > 0 && (V = Yi(O + Y + re, c[1][1])), j = Math.max(j, F), G = Math.max(G, V);
  }
  if (d) {
    let F = 0, V = 0;
    p && A > 0 ? F = Yi(E + A, d[0][0]) : !p && A < 0 && (F = $i(E + le, d[1][0])), m && I > 0 ? V = Yi(O + I, d[0][1]) : !m && I < 0 && (V = $i(O + Y, d[1][1])), j = Math.max(j, F), G = Math.max(G, V);
  }
  if (s) {
    if (y) {
      const F = wu(le / B, C, z) * B;
      if (j = Math.max(j, F), c) {
        let V = 0;
        !p && !m || p && !m && v ? V = Yi(O + re + le / B, c[1][1]) * B : V = $i(O + re + (p ? A : -A) / B, c[0][1]) * B, j = Math.max(j, V);
      }
      if (d) {
        let V = 0;
        !p && !m || p && !m && v ? V = $i(O + le / B, d[1][1]) * B : V = Yi(O + (p ? A : -A) / B, d[0][1]) * B, j = Math.max(j, V);
      }
    }
    if (g) {
      const F = wu(Y * B, N, T) / B;
      if (G = Math.max(G, F), c) {
        let V = 0;
        !p && !m || m && !p && v ? V = Yi(E + Y * B + K, c[1][0]) / B : V = $i(E + (m ? I : -I) * B + K, c[0][0]) / B, G = Math.max(G, V);
      }
      if (d) {
        let V = 0;
        !p && !m || m && !p && v ? V = $i(E + Y * B, d[1][0]) / B : V = Yi(E + (m ? I : -I) * B, d[0][0]) / B, G = Math.max(G, V);
      }
    }
  }
  I = I + (I < 0 ? G : -G), A = A + (A < 0 ? j : -j), s && (v ? le > Y * B ? I = (Rv(p, m) ? -A : A) / B : A = (Rv(p, m) ? -I : I) * B : y ? (I = A / B, m = p) : (A = I * B, p = m));
  const R = p ? E + A : E, L = m ? O + I : O;
  return {
    width: H + (p ? -A : A),
    height: k + (m ? -I : I),
    x: u[0] * A * (p ? -1 : 1) + R,
    y: u[1] * I * (m ? -1 : 1) + L
  };
}
const Ax = { width: 0, height: 0, x: 0, y: 0 }, sD = {
  ...Ax,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function uD(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function cD({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Yn(e);
  let c = {
    controlDirection: Cv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: v, onResizeStart: b, onResize: w, onResizeEnd: N, shouldResize: T }) {
    let C = { ...Ax }, z = { ...sD };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: g,
      controlDirection: Cv(m)
    };
    let E, O = null, H = [], k, B, A, I = !1;
    const le = q1().on("start", (Y) => {
      const { nodeLookup: K, transform: re, snapGrid: j, snapToGrid: G, nodeOrigin: R, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      O = L?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: V } = jo(Y.sourceEvent, {
        transform: re,
        snapGrid: j,
        snapToGrid: G,
        containerBounds: O
      });
      C = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, z = {
        ...C,
        pointerX: F,
        pointerY: V,
        aspectRatio: C.width / C.height
      }, k = void 0, B = Nr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (k = K.get(E.parentId)), k && E.extent === "parent" && (B = [
        [0, 0],
        [k.measured.width, k.measured.height]
      ]), H = [], A = void 0;
      for (const [P, D] of K)
        if (D.parentId === a && (H.push({
          id: P,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const q = uD(D, E, D.origin ?? R);
          A ? A = [
            [Math.min(q[0][0], A[0][0]), Math.min(q[0][1], A[0][1])],
            [Math.max(q[1][0], A[1][0]), Math.max(q[1][1], A[1][1])]
          ] : A = q;
        }
      b?.(Y, { ...C });
    }).on("drag", (Y) => {
      const { transform: K, snapGrid: re, snapToGrid: j, nodeOrigin: G } = r(), R = jo(Y.sourceEvent, {
        transform: K,
        snapGrid: re,
        snapToGrid: j,
        containerBounds: O
      }), L = [];
      if (!E)
        return;
      const { x: F, y: V, width: P, height: D } = C, q = {}, Q = E.origin ?? G, { width: te, height: se, x: he, y: me } = oD(z, c.controlDirection, R, c.boundaries, c.keepAspectRatio, Q, B, A), ee = te !== P, ge = se !== D, ze = he !== F && ee, Re = me !== V && ge;
      if (!ze && !Re && !ee && !ge)
        return;
      if ((ze || Re || Q[0] === 1 || Q[1] === 1) && (q.x = ze ? he : C.x, q.y = Re ? me : C.y, C.x = q.x, C.y = q.y, H.length > 0)) {
        const $e = he - F, ft = me - V;
        for (const Te of H)
          Te.position = {
            x: Te.position.x - $e + Q[0] * (te - P),
            y: Te.position.y - ft + Q[1] * (se - D)
          }, L.push(Te);
      }
      if ((ee || ge) && (q.width = ee && (!c.resizeDirection || c.resizeDirection === "horizontal") ? te : C.width, q.height = ge && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : C.height, C.width = q.width, C.height = q.height), k && E.expandParent) {
        const $e = Q[0] * (q.width ?? 0);
        q.x && q.x < $e && (C.x = $e, z.x = z.x - (q.x - $e));
        const ft = Q[1] * (q.height ?? 0);
        q.y && q.y < ft && (C.y = ft, z.y = z.y - (q.y - ft));
      }
      const we = lD({
        width: C.width,
        prevWidth: P,
        height: C.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...C, direction: we };
      T?.(Y, xe) !== !1 && (I = !0, w?.(Y, xe), l(q, L));
    }).on("end", (Y) => {
      I && (N?.(Y, { ...C }), s?.({ ...C }), I = !1);
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
var Pd = { exports: {} }, Kd = {}, Jd = { exports: {} }, Wd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tv;
function fD() {
  if (Tv) return Wd;
  Tv = 1;
  var e = Fo();
  function a(g, v) {
    return g === v && (g !== 0 || 1 / g === 1 / v) || g !== g && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, v) {
    var b = v(), w = l({ inst: { value: b, getSnapshot: v } }), N = w[0].inst, T = w[1];
    return u(
      function() {
        N.value = b, N.getSnapshot = v, p(N) && T({ inst: N });
      },
      [g, b, v]
    ), s(
      function() {
        return p(N) && T({ inst: N }), g(function() {
          p(N) && T({ inst: N });
        });
      },
      [g]
    ), c(b), b;
  }
  function p(g) {
    var v = g.getSnapshot;
    g = g.value;
    try {
      var b = v();
      return !r(g, b);
    } catch {
      return !0;
    }
  }
  function m(g, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return Wd.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, Wd;
}
var Mv;
function zx() {
  return Mv || (Mv = 1, Jd.exports = fD()), Jd.exports;
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
var Dv;
function dD() {
  if (Dv) return Kd;
  Dv = 1;
  var e = Fo(), a = zx();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return Kd.useSyncExternalStoreWithSelector = function(m, y, g, v, b) {
    var w = u(null);
    if (w.current === null) {
      var N = { hasValue: !1, value: null };
      w.current = N;
    } else N = w.current;
    w = d(
      function() {
        function C(k) {
          if (!z) {
            if (z = !0, E = k, k = v(k), b !== void 0 && N.hasValue) {
              var B = N.value;
              if (b(B, k))
                return O = B;
            }
            return O = k;
          }
          if (B = O, l(E, k)) return B;
          var A = v(k);
          return b !== void 0 && b(B, A) ? (E = k, B) : (E = k, O = A);
        }
        var z = !1, E, O, H = g === void 0 ? null : g;
        return [
          function() {
            return C(y());
          },
          H === null ? void 0 : function() {
            return C(H());
          }
        ];
      },
      [y, g, v, b]
    );
    var T = s(m, w[0], w[1]);
    return c(
      function() {
        N.hasValue = !0, N.value = T;
      },
      [T]
    ), p(T), T;
  }, Kd;
}
var Av;
function hD() {
  return Av || (Av = 1, Pd.exports = dD()), Pd.exports;
}
var mD = hD();
const pD = /* @__PURE__ */ Ih(mD), gD = {}, zv = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, g) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const b = a;
      a = g ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((w) => w(a, b));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (gD ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = e(l, s, p);
  return p;
}, yD = (e) => e ? zv(e) : zv, { useDebugValue: vD } = ye, { useSyncExternalStoreWithSelector: bD } = pD, xD = (e) => e;
function Ox(e, a = xD, r) {
  const l = bD(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return vD(l), l;
}
const Ov = (e, a) => {
  const r = yD(e), l = (s, u = a) => Ox(r, s, u);
  return Object.assign(l, r), l;
}, SD = (e, a) => e ? Ov(e, a) : Ov;
function At(e, a) {
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
var wD = $b();
const ED = /* @__PURE__ */ Ih(wD), vc = _.createContext(null), _D = vc.Provider, jx = xa.error001("react");
function lt(e, a) {
  const r = _.useContext(vc);
  if (r === null)
    throw new Error(jx);
  return Ox(r, e, a);
}
function zt() {
  const e = _.useContext(vc);
  if (e === null)
    throw new Error(jx);
  return _.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const jv = { display: "none" }, ND = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Lx = "react-flow__node-desc", Hx = "react-flow__edge-desc", CD = "react-flow__aria-live", RD = (e) => e.ariaLiveMessage, TD = (e) => e.ariaLabelConfig;
function MD({ rfId: e }) {
  const a = lt(RD);
  return x.jsx("div", { id: `${CD}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: ND, children: a });
}
function DD({ rfId: e, disableKeyboardA11y: a }) {
  const r = lt(TD);
  return x.jsxs(x.Fragment, { children: [x.jsx("div", { id: `${Lx}-${e}`, style: jv, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), x.jsx("div", { id: `${Hx}-${e}`, style: jv, children: r["edge.a11yDescription.default"] }), !a && x.jsx(MD, { rfId: e })] });
}
const bc = _.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return x.jsx("div", { className: Qt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
bc.displayName = "Panel";
function AD({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : x.jsx(bc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: x.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const zD = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, Eu = (e) => e.id;
function OD(e, a) {
  return At(e.selectedNodes.map(Eu), a.selectedNodes.map(Eu)) && At(e.selectedEdges.map(Eu), a.selectedEdges.map(Eu));
}
function jD({ onSelectionChange: e }) {
  const a = zt(), { selectedNodes: r, selectedEdges: l } = lt(zD, OD);
  return _.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const LD = (e) => !!e.onSelectionChangeHandlers;
function HD({ onSelectionChange: e }) {
  const a = lt(LD);
  return e || a ? x.jsx(jD, { onSelectionChange: e }) : null;
}
const Bx = [0, 0], BD = { x: 0, y: 0, zoom: 1 }, kD = [
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
], Lv = [...kD, "rfId"], UD = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), Hv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: qo,
  nodeOrigin: Bx,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function VD(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = lt(UD, At), m = zt();
  _.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = Hv, d();
  }), []);
  const y = _.useRef(Hv);
  return _.useEffect(
    () => {
      for (const g of Lv) {
        const v = e[g], b = y.current[g];
        v !== b && (typeof e[g] > "u" || (g === "nodes" ? a(v) : g === "edges" ? r(v) : g === "minZoom" ? l(v) : g === "maxZoom" ? s(v) : g === "translateExtent" ? u(v) : g === "nodeExtent" ? c(v) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: EM(v) }) : g === "fitView" ? m.setState({ fitViewQueued: v }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [g]: v })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    Lv.map((g) => e[g])
  ), null;
}
function Bv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function qD(e) {
  const [a, r] = _.useState(e === "system" ? null : e);
  return _.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = Bv(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : Bv()?.matches ? "dark" : "light";
}
const kv = typeof document < "u" ? document : null;
function Go(e = null, a = { target: kv, actInsideInputWithModifier: !0 }) {
  const [r, l] = _.useState(!1), s = _.useRef(!1), u = _.useRef(/* @__PURE__ */ new Set([])), [c, d] = _.useMemo(() => {
    if (e !== null) {
      const m = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((g, v) => g.concat(...v), []);
      return [m, y];
    }
    return [[], []];
  }, [e]);
  return _.useEffect(() => {
    const p = a?.target ?? kv, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (b) => {
        if (s.current = b.ctrlKey || b.metaKey || b.shiftKey || b.altKey, (!s.current || s.current && !m) && px(b))
          return !1;
        const N = Vv(b.code, d);
        if (u.current.add(b[N]), Uv(c, u.current, !1)) {
          const T = b.composedPath?.()?.[0] || b.target, C = T?.nodeName === "BUTTON" || T?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !C) && b.preventDefault(), l(!0);
        }
      }, g = (b) => {
        const w = Vv(b.code, d);
        Uv(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(b[w]), b.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [e, l]), r;
}
function Uv(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Vv(e, a) {
  return a.includes(e) ? "code" : "key";
}
const $D = () => {
  const e = zt();
  return _.useMemo(() => ({
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
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = mm(a, l, s, u, c, r?.padding ?? 0.1);
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
      return Tl(m, l, g, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = Nl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function kx(e, a) {
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
      YD(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function YD(e, a) {
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
function ID(e, a) {
  return kx(e, a);
}
function GD(e, a) {
  return kx(e, a);
}
function gr(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function pl(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(gr(u.id, c)));
  }
  return l;
}
function qv({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function $v(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const XD = fx();
function FD(e, a, r = {}) {
  return MM(e, a, {
    ...r,
    onError: r.onError ?? XD
  });
}
const Yv = (e) => mM(e), ZD = (e) => ox(e);
function Ux(e) {
  return _.forwardRef(e);
}
const QD = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function Iv(e) {
  const [a, r] = _.useState(BigInt(0)), [l] = _.useState(() => PD(() => r((s) => s + BigInt(1))));
  return QD(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function PD(e) {
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
const Vx = _.createContext(null);
function KD({ children: e }) {
  const a = zt(), r = _.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: v, fitViewQueued: b, onNodesChangeMiddlewareMap: w } = a.getState();
    let N = p;
    for (const C of d)
      N = typeof C == "function" ? C(N) : C;
    let T = qv({
      items: N,
      lookup: v
    });
    for (const C of w.values())
      T = C(T);
    y && m(N), T.length > 0 ? g?.(T) : b && window.requestAnimationFrame(() => {
      const { fitViewQueued: C, nodes: z, setNodes: E } = a.getState();
      C && E(z);
    });
  }, []), l = Iv(r), s = _.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: v } = a.getState();
    let b = p;
    for (const w of d)
      b = typeof w == "function" ? w(b) : w;
    y ? m(b) : g && g(qv({
      items: b,
      lookup: v
    }));
  }, []), u = Iv(s), c = _.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return x.jsx(Vx.Provider, { value: c, children: e });
}
function JD() {
  const e = _.useContext(Vx);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const WD = (e) => !!e.panZoom;
function Sm() {
  const e = $D(), a = zt(), r = JD(), l = lt(WD), s = _.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: v, nodeOrigin: b } = a.getState(), w = Yv(g) ? g : v.get(g.id), N = w.parentId ? hx(w.position, w.measured, w.parentId, v, b) : w.position, T = {
        ...w,
        position: N,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return _l(T);
    }, m = (g, v, b = { replace: !1 }) => {
      c((w) => w.map((N) => {
        if (N.id === g) {
          const T = typeof v == "function" ? v(N) : v;
          return b.replace && Yv(T) ? T : { ...N, ...T };
        }
        return N;
      }));
    }, y = (g, v, b = { replace: !1 }) => {
      d((w) => w.map((N) => {
        if (N.id === g) {
          const T = typeof v == "function" ? v(N) : v;
          return b.replace && ZD(T) ? T : { ...N, ...T };
        }
        return N;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((g) => ({ ...g })),
      getNode: (g) => u(g)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: g = [] } = a.getState();
        return g.map((v) => ({ ...v }));
      },
      getEdge: (g) => a.getState().edgeLookup.get(g),
      setNodes: c,
      setEdges: d,
      addNodes: (g) => {
        const v = Array.isArray(g) ? g : [g];
        r.nodeQueue.push((b) => [...b, ...v]);
      },
      addEdges: (g) => {
        const v = Array.isArray(g) ? g : [g];
        r.edgeQueue.push((b) => [...b, ...v]);
      },
      toObject: () => {
        const { nodes: g = [], edges: v = [], transform: b } = a.getState(), [w, N, T] = b;
        return {
          nodes: g.map((C) => ({ ...C })),
          edges: v.map((C) => ({ ...C })),
          viewport: {
            x: w,
            y: N,
            zoom: T
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: v = [] }) => {
        const { nodes: b, edges: w, onNodesDelete: N, onEdgesDelete: T, triggerNodeChanges: C, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: H, edges: k } = await bM({
          nodesToRemove: g,
          edgesToRemove: v,
          nodes: b,
          edges: w,
          onBeforeDelete: O
        }), B = k.length > 0, A = H.length > 0;
        if (B) {
          const I = k.map($v);
          T?.(k), z(I);
        }
        if (A) {
          const I = H.map($v);
          N?.(H), C(I);
        }
        return (A || B) && E?.({ nodes: H, edges: k }), { deletedNodes: H, deletedEdges: k };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, v = !0, b) => {
        const w = pv(g), N = w ? g : p(g), T = b !== void 0;
        return N ? (b || a.getState().nodes).filter((C) => {
          const z = a.getState().nodeLookup.get(C.id);
          if (z && !w && (C.id === g.id || !z.internals.positionAbsolute))
            return !1;
          const E = _l(T ? C : z), O = Yo(E, N);
          return v && O > 0 || O >= E.width * E.height || O >= N.width * N.height;
        }) : [];
      },
      isNodeIntersecting: (g, v, b = !0) => {
        const N = pv(g) ? g : p(g);
        if (!N)
          return !1;
        const T = Yo(N, v);
        return b && T > 0 || T >= v.width * v.height || T >= N.width * N.height;
      },
      updateNode: m,
      updateNodeData: (g, v, b = { replace: !1 }) => {
        m(g, (w) => {
          const N = typeof v == "function" ? v(w) : v;
          return b.replace ? { ...w, data: N } : { ...w, data: { ...w.data, ...N } };
        }, b);
      },
      updateEdge: y,
      updateEdgeData: (g, v, b = { replace: !1 }) => {
        y(g, (w) => {
          const N = typeof v == "function" ? v(w) : v;
          return b.replace ? { ...w, data: N } : { ...w, data: { ...w.data, ...N } };
        }, b);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: v, nodeOrigin: b } = a.getState();
        return pM(g, { nodeLookup: v, nodeOrigin: b });
      },
      getHandleConnections: ({ type: g, id: v, nodeId: b }) => Array.from(a.getState().connectionLookup.get(`${b}-${g}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: v, nodeId: b }) => Array.from(a.getState().connectionLookup.get(`${b}${g ? v ? `-${g}-${v}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const v = a.getState().fitViewResolver ?? wM();
        return a.setState({ fitViewQueued: !0, fitViewOptions: g, fitViewResolver: v }), r.nodeQueue.push((b) => [...b]), v.promise;
      }
    };
  }, []);
  return _.useMemo(() => ({
    ...s,
    ...e,
    viewportInitialized: l
  }), [l]);
}
const Gv = (e) => e.selected, eA = typeof window < "u" ? window : void 0;
function tA({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: l } = Sm(), s = Go(e, { actInsideInputWithModifier: !1 }), u = Go(a, { target: eA });
  _.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(Gv), edges: c.filter(Gv) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), _.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function nA(e) {
  const a = zt();
  _.useEffect(() => {
    const r = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = pm(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", xa.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
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
const xc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, aA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function iA({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Sr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: v, preventScrolling: b = !0, children: w, noWheelClassName: N, noPanClassName: T, onViewportChange: C, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: O }) {
  const H = zt(), k = _.useRef(null), { userSelectionActive: B, lib: A, connectionInProgress: I } = lt(aA, At), le = Go(v), Y = _.useRef();
  nA(k);
  const K = _.useCallback((re) => {
    C?.({ x: re[0], y: re[1], zoom: re[2] }), z || H.setState({ transform: re });
  }, [C, z]);
  return _.useEffect(() => {
    if (k.current) {
      Y.current = rD({
        domNode: k.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (R) => H.setState((L) => L.paneDragging === R ? L : { paneDragging: R }),
        onPanZoomStart: (R, L) => {
          const { onViewportChangeStart: F, onMoveStart: V } = H.getState();
          V?.(R, L), F?.(L);
        },
        onPanZoom: (R, L) => {
          const { onViewportChange: F, onMove: V } = H.getState();
          V?.(R, L), F?.(L);
        },
        onPanZoomEnd: (R, L) => {
          const { onViewportChangeEnd: F, onMoveEnd: V } = H.getState();
          V?.(R, L), F?.(L);
        }
      });
      const { x: re, y: j, zoom: G } = Y.current.getViewport();
      return H.setState({
        panZoom: Y.current,
        transform: [re, j, G],
        domNode: k.current.closest(".react-flow")
      }), () => {
        Y.current?.destroy();
      };
    }
  }, []), _.useEffect(() => {
    Y.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: le,
      preventScrolling: b,
      noPanClassName: T,
      userSelectionActive: B,
      noWheelClassName: N,
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
    le,
    b,
    T,
    B,
    N,
    A,
    K,
    I,
    O,
    E
  ]), x.jsx("div", { className: "react-flow__renderer", ref: k, style: xc, children: w });
}
const rA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function lA() {
  const { userSelectionActive: e, userSelectionRect: a } = lt(rA, At);
  return e && a ? x.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const eh = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, oA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function sA({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = $o.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: v, onPaneMouseMove: b, onPaneMouseLeave: w, children: N }) {
  const T = _.useRef(0), C = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: O, connectionInProgress: H, panBy: k, autoPanSpeed: B } = lt(oA, At), A = E && (e || z), I = _.useRef(null), le = _.useRef(), Y = _.useRef(/* @__PURE__ */ new Set()), K = _.useRef(/* @__PURE__ */ new Set()), re = _.useRef(!1), j = _.useRef({ x: 0, y: 0 }), G = _.useRef(!1), R = (ee) => {
    if (re.current || H) {
      re.current = !1;
      return;
    }
    m?.(ee), C.getState().resetSelectedElements(), C.setState({ nodesSelectionActive: !1 });
  }, L = (ee) => {
    if (Array.isArray(l) && l?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, F = g ? (ee) => g(ee) : void 0, V = (ee) => {
    re.current && (ee.stopPropagation(), re.current = !1);
  }, P = (ee) => {
    const { domNode: ge, transform: ze } = C.getState();
    if (le.current = ge?.getBoundingClientRect(), !le.current)
      return;
    const Re = ee.target === I.current;
    if (!Re && !!ee.target.closest(".nokey") || !e || !(c && Re || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), re.current = !1;
    const { x: Ce, y: $e } = ba(ee.nativeEvent, le.current), ft = Tl({ x: Ce, y: $e }, ze);
    C.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Ce,
        y: $e
      }
    }), Re || (ee.stopPropagation(), ee.preventDefault());
  };
  function D(ee, ge) {
    const { userSelectionRect: ze } = C.getState();
    if (!ze)
      return;
    const { transform: Re, nodeLookup: we, edgeLookup: xe, connectionLookup: Ce, triggerNodeChanges: $e, triggerEdgeChanges: ft, defaultEdgeOptions: Te } = C.getState(), Xe = { x: ze.startX, y: ze.startY }, { x: Be, y: Ye } = Nl(Xe, Re), wt = {
      startX: Xe.x,
      startY: Xe.y,
      x: ee < Be ? ee : Be,
      y: ge < Ye ? ge : Ye,
      width: Math.abs(ee - Be),
      height: Math.abs(ge - Ye)
    }, Je = Y.current, Ze = K.current;
    Y.current = new Set(dm(we, wt, Re, r === $o.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Qe = Te?.selectable ?? !0;
    for (const gt of Y.current) {
      const yt = Ce.get(gt);
      if (yt)
        for (const { edgeId: It } of yt.values()) {
          const Lt = xe.get(It);
          Lt && (Lt.selectable ?? Qe) && K.current.add(It);
        }
    }
    if (!gv(Je, Y.current)) {
      const gt = pl(we, Y.current, !0);
      $e(gt);
    }
    if (!gv(Ze, K.current)) {
      const gt = pl(xe, K.current);
      ft(gt);
    }
    C.setState({
      userSelectionRect: wt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function q() {
    if (!s || !le.current)
      return;
    const [ee, ge] = hm(j.current, le.current, B);
    k({ x: ee, y: ge }).then((ze) => {
      if (!re.current || !ze) {
        T.current = requestAnimationFrame(q);
        return;
      }
      const { x: Re, y: we } = j.current;
      D(Re, we), T.current = requestAnimationFrame(q);
    });
  }
  const Q = () => {
    cancelAnimationFrame(T.current), T.current = 0, G.current = !1;
  };
  _.useEffect(() => () => Q(), []);
  const te = (ee) => {
    const { userSelectionRect: ge, transform: ze, resetSelectedElements: Re } = C.getState();
    if (!le.current || !ge)
      return;
    const { x: we, y: xe } = ba(ee.nativeEvent, le.current);
    j.current = { x: we, y: xe };
    const Ce = Nl({ x: ge.startX, y: ge.startY }, ze);
    if (!re.current) {
      const $e = a ? 0 : u;
      if (Math.hypot(we - Ce.x, xe - Ce.y) <= $e)
        return;
      Re(), d?.(ee);
    }
    re.current = !0, G.current || (q(), G.current = !0), D(we, xe);
  }, se = (ee) => {
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !z && ee.target === I.current && C.getState().userSelectionRect && R?.(ee), C.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), re.current && (p?.(ee), C.setState({
      nodesSelectionActive: Y.current.size > 0
    })), Q());
  }, he = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), Q();
  }, me = l === !0 || Array.isArray(l) && l.includes(0);
  return x.jsxs("div", { className: Qt(["react-flow__pane", { draggable: me, dragging: O, selection: e }]), onClick: A ? void 0 : eh(R, I), onContextMenu: eh(L, I), onWheel: eh(F, I), onPointerEnter: A ? void 0 : v, onPointerMove: A ? te : b, onPointerUp: A ? se : void 0, onPointerCancel: A ? he : void 0, onPointerDownCapture: A ? P : void 0, onClickCapture: A ? V : void 0, onPointerLeave: w, ref: I, style: xc, children: [N, x.jsx(lA, {})] });
}
function Th({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", xa.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function qx({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = zt(), [p, m] = _.useState(!1), y = _.useRef();
  return _.useEffect(() => {
    y.current = GM({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        Th({
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
  }, []), _.useEffect(() => {
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
const uA = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function $x() {
  const e = zt();
  return _.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), v = uA(c), b = s ? u[0] : 5, w = s ? u[1] : 5, N = r.direction.x * b * r.factor, T = r.direction.y * w * r.factor;
    for (const [, C] of m) {
      if (!v(C))
        continue;
      let z = {
        x: C.internals.positionAbsolute.x + N,
        y: C.internals.positionAbsolute.y + T
      };
      s && (z = ns(z, u));
      const { position: E, positionAbsolute: O } = sx({
        nodeId: C.id,
        nextPosition: z,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: d
      });
      C.position = E, C.internals.positionAbsolute = O, g.set(C.id, C);
    }
    p(g);
  }, []);
}
const wm = _.createContext(null), cA = wm.Provider;
wm.Consumer;
const Yx = () => _.useContext(wm), fA = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), dA = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === wl.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function hA({ type: e = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...v }, b) {
  const w = c || null, N = e === "target", T = zt(), C = Yx(), { connectOnClick: z, noPanClassName: E, rfId: O } = lt(fA, At), { connectingFrom: H, connectingTo: k, clickConnecting: B, isPossibleEndHandle: A, connectionInProcess: I, clickConnectionInProcess: le, valid: Y } = lt(dA(C, w, e), At);
  C || T.getState().onError?.("010", xa.error010());
  const K = (G) => {
    const { defaultEdgeOptions: R, onConnect: L, hasDefaultEdges: F } = T.getState(), V = {
      ...R,
      ...G
    };
    if (F) {
      const { edges: P, setEdges: D, onError: q } = T.getState();
      D(FD(V, P, { onError: q }));
    }
    L?.(V), d?.(V);
  }, re = (G) => {
    if (!C)
      return;
    const R = gx(G.nativeEvent);
    if (s && (R && G.button === 0 || !R)) {
      const L = T.getState();
      Rh.onPointerDown(G.nativeEvent, {
        handleDomNode: G.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: N,
        handleId: w,
        nodeId: C,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...F) => T.getState().onConnectEnd?.(...F),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...F) => T.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => T.getState().transform,
        getFromHandle: () => T.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    R ? y?.(G) : g?.(G);
  }, j = (G) => {
    const { onClickConnectStart: R, onClickConnectEnd: L, connectionClickStartHandle: F, connectionMode: V, isValidConnection: P, lib: D, rfId: q, nodeLookup: Q, connection: te } = T.getState();
    if (!C || !F && !s)
      return;
    if (!F) {
      R?.(G.nativeEvent, { nodeId: C, handleId: w, handleType: e }), T.setState({ connectionClickStartHandle: { nodeId: C, type: e, id: w } });
      return;
    }
    const se = mx(G.target), he = r || P, { connection: me, isValid: ee } = Rh.isValid(G.nativeEvent, {
      handle: {
        nodeId: C,
        id: w,
        type: e
      },
      connectionMode: V,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: he,
      flowId: q,
      doc: se,
      lib: D,
      nodeLookup: Q
    });
    ee && me && K(me);
    const ge = structuredClone(te);
    delete ge.inProgress, ge.toPosition = ge.toHandle ? ge.toHandle.position : null, L?.(G, ge), T.setState({ connectionClickStartHandle: null });
  };
  return x.jsx("div", { "data-handleid": w, "data-nodeid": C, "data-handlepos": a, "data-id": `${O}-${C}-${w}-${e}`, className: Qt([
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
      connectingto: k,
      valid: Y,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!I || A) && (I || le ? u : s)
    }
  ]), onMouseDown: re, onTouchStart: re, onClick: z ? j : void 0, ref: b, ...v, children: p });
}
const Rl = _.memo(Ux(hA));
function mA({ data: e, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return x.jsxs(x.Fragment, { children: [e?.label, x.jsx(Rl, { type: "source", position: r, isConnectable: a })] });
}
function pA({ data: e, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: l = Ae.Bottom }) {
  return x.jsxs(x.Fragment, { children: [x.jsx(Rl, { type: "target", position: r, isConnectable: a }), e?.label, x.jsx(Rl, { type: "source", position: l, isConnectable: a })] });
}
function gA() {
  return null;
}
function yA({ data: e, isConnectable: a, targetPosition: r = Ae.Top }) {
  return x.jsxs(x.Fragment, { children: [x.jsx(Rl, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const ec = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Xv = {
  input: mA,
  default: pA,
  output: yA,
  group: gA
};
function vA(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const bA = (e) => {
  const { width: a, height: r, x: l, y: s } = ts(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: va(a) ? a : null,
    height: va(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function xA({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = zt(), { width: s, height: u, transformString: c, userSelectionActive: d } = lt(bA, At), p = $x(), m = _.useRef(null);
  _.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !d && s !== null && u !== null;
  if (qx({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (b) => {
    const w = l.getState().nodes.filter((N) => N.selected);
    e(b, w);
  } : void 0, v = (b) => {
    Object.prototype.hasOwnProperty.call(ec, b.key) && (b.preventDefault(), p({
      direction: ec[b.key],
      factor: b.shiftKey ? 4 : 1
    }));
  };
  return x.jsx("div", { className: Qt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: x.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const Fv = typeof window < "u" ? window : void 0, SA = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Ix({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: w, panActivationKeyCode: N, zoomActivationKeyCode: T, elementsSelectable: C, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: H, panOnScrollMode: k, zoomOnDoubleClick: B, panOnDrag: A, autoPanOnSelection: I, defaultViewport: le, translateExtent: Y, minZoom: K, maxZoom: re, preventScrolling: j, onSelectionContextMenu: G, noWheelClassName: R, noPanClassName: L, disableKeyboardA11y: F, onViewportChange: V, isControlledViewport: P }) {
  const { nodesSelectionActive: D, userSelectionActive: q } = lt(SA, At), Q = Go(m, { target: Fv }), te = Go(N, { target: Fv }), se = te || A, he = te || O, me = y && se !== !0, ee = Q || q || me;
  return tA({ deleteKeyCode: p, multiSelectionKeyCode: w }), x.jsx(iA, { onPaneContextMenu: u, elementsSelectable: C, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: H, panOnScrollMode: k, zoomOnDoubleClick: B, panOnDrag: !Q && se, defaultViewport: le, translateExtent: Y, minZoom: K, maxZoom: re, zoomActivationKeyCode: T, preventScrolling: j, noWheelClassName: R, noPanClassName: L, onViewportChange: V, isControlledViewport: P, paneClickDistance: d, selectionOnDrag: me, children: x.jsxs(sA, { onSelectionStart: v, onSelectionEnd: b, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: I, isSelecting: !!ee, selectionMode: g, selectionKeyPressed: Q, paneClickDistance: d, selectionOnDrag: me, children: [e, D && x.jsx(xA, { onSelectionContextMenu: G, noPanClassName: L, disableKeyboardA11y: F })] }) });
}
Ix.displayName = "FlowRenderer";
const wA = _.memo(Ix), EA = (e) => (a) => e ? dm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function _A(e) {
  return lt(_.useCallback(EA(e), [e]), At);
}
const NA = (e) => e.updateNodeInternals;
function CA() {
  const e = lt(NA), [a] = _.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
  return _.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function RA({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = zt(), u = _.useRef(null), c = _.useRef(null), d = _.useRef(e.sourcePosition), p = _.useRef(e.targetPosition), m = _.useRef(a), y = r && !!e.internals.handleBounds;
  return _.useEffect(() => {
    u.current && !e.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, e.hidden]), _.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), _.useEffect(() => {
    if (u.current) {
      const g = m.current !== a, v = d.current !== e.sourcePosition, b = p.current !== e.targetPosition;
      (g || v || b) && (m.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function TA({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: v, noPanClassName: b, disableKeyboardA11y: w, rfId: N, nodeTypes: T, nodeClickDistance: C, onError: z }) {
  const { node: E, internals: O, isParent: H } = lt((ee) => {
    const ge = ee.nodeLookup.get(e), ze = ee.parentLookup.has(e);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let k = E.type || "default", B = T?.[k] || Xv[k];
  B === void 0 && (z?.("003", xa.error003(k)), k = "default", B = T?.default || Xv.default);
  const A = !!(E.draggable || d && typeof E.draggable > "u"), I = !!(E.selectable || p && typeof E.selectable > "u"), le = !!(E.connectable || m && typeof E.connectable > "u"), Y = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), re = dx(E), j = RA({ node: E, nodeType: k, hasDimensions: re, resizeObserver: g }), G = qx({
    nodeRef: j,
    disabled: E.hidden || !A,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: e,
    isSelectable: I,
    nodeClickDistance: C
  }), R = $x();
  if (E.hidden)
    return null;
  const L = hi(E), F = vA(E), V = I || A || a || r || l || s, P = r ? (ee) => r(ee, { ...O.userNode }) : void 0, D = l ? (ee) => l(ee, { ...O.userNode }) : void 0, q = s ? (ee) => s(ee, { ...O.userNode }) : void 0, Q = u ? (ee) => u(ee, { ...O.userNode }) : void 0, te = c ? (ee) => c(ee, { ...O.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    I && (!ge || !A || ze > 0) && Th({
      id: e,
      store: K,
      nodeRef: j
    }), a && a(ee, { ...O.userNode });
  }, he = (ee) => {
    if (!(px(ee.nativeEvent) || w)) {
      if (ax.includes(ee.key) && I) {
        const ge = ee.key === "Escape";
        Th({
          id: e,
          store: K,
          unselect: ge,
          nodeRef: j
        });
      } else if (A && E.selected && Object.prototype.hasOwnProperty.call(ec, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: ge } = K.getState();
        K.setState({
          ariaLiveMessage: ge["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), R({
          direction: ec[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, me = () => {
    if (w || !j.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: ge, height: ze, autoPanOnNodeFocus: Re, setCenter: we } = K.getState();
    if (!Re)
      return;
    dm(/* @__PURE__ */ new Map([[e, E]]), { x: 0, y: 0, width: ge, height: ze }, ee, !0).length > 0 || we(E.position.x + L.width / 2, E.position.y + L.height / 2, {
      zoom: ee[2]
    });
  };
  return x.jsx("div", { className: Qt([
    "react-flow__node",
    `react-flow__node-${k}`,
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
      dragging: G
    }
  ]), ref: j, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: V ? "all" : "none",
    visibility: re ? "visible" : "hidden",
    ...E.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: P, onMouseMove: D, onMouseLeave: q, onContextMenu: Q, onClick: se, onDoubleClick: te, onKeyDown: Y ? he : void 0, tabIndex: Y ? 0 : void 0, onFocus: Y ? me : void 0, role: E.ariaRole ?? (Y ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${Lx}-${N}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: x.jsx(cA, { value: e, children: x.jsx(B, { id: e, data: E.data, type: k, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: I, draggable: A, deletable: E.deletable ?? !0, isConnectable: le, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: G, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...L }) }) });
}
var MA = _.memo(TA);
const DA = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Gx(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(DA, At), c = _A(e.onlyRenderVisibleElements), d = CA();
  return x.jsx("div", { className: "react-flow__nodes", style: xc, children: c.map((p) => (
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
    x.jsx(MA, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
Gx.displayName = "NodeRenderer";
const AA = _.memo(Gx);
function zA(e) {
  return lt(_.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && CM({
          sourceNode: u,
          targetNode: c,
          width: r.width,
          height: r.height,
          transform: r.transform
        }) && l.push(s.id);
      }
    return l;
  }, [e]), At);
}
const OA = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return x.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, jA = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return x.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Zv = {
  [Ju.Arrow]: OA,
  [Ju.ArrowClosed]: jA
};
function LA(e) {
  const a = zt();
  return _.useMemo(() => Object.prototype.hasOwnProperty.call(Zv, e) ? Zv[e] : (a.getState().onError?.("009", xa.error009(e)), null), [e]);
}
const HA = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = LA(a);
  return p ? x.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: x.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, Xx = ({ defaultColor: e, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = _.useMemo(() => jM(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? x.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: x.jsx("defs", { children: s.map((u) => x.jsx(HA, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Xx.displayName = "MarkerDefinitions";
var BA = _.memo(Xx);
function Fx({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, v] = _.useState({ x: 1, y: 0, width: 0, height: 0 }), b = Qt(["react-flow__edge-textwrapper", m]), w = _.useRef(null);
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
  }, [r]), r ? x.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: b, visibility: g.width ? "visible" : "hidden", ...y, children: [s && x.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), x.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: w, style: l, children: r }), p] }) : null;
}
Fx.displayName = "EdgeText";
const kA = _.memo(Fx);
function Sc({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return x.jsxs(x.Fragment, { children: [x.jsx("path", { ...y, d: e, fill: "none", className: Qt(["react-flow__edge-path", y.className]) }), m ? x.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && va(a) && va(r) ? x.jsx(kA, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function Qv({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === Ae.Left || e === Ae.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function Zx({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, d] = Qv({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = Qv({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, v, b] = yx({
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
    v,
    b
  ];
}
function Qx(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: T, interactionWidth: C }) => {
    const [z, E, O] = Zx({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), H = e.isInternal ? void 0 : a;
    return x.jsx(Sc, { id: H, path: z, labelX: E, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: T, interactionWidth: C });
  });
}
const UA = Qx({ isInternal: !1 }), Px = Qx({ isInternal: !0 });
UA.displayName = "SimpleBezierEdge";
Px.displayName = "SimpleBezierEdgeInternal";
function Kx(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, sourcePosition: b = Ae.Bottom, targetPosition: w = Ae.Top, markerEnd: N, markerStart: T, pathOptions: C, interactionWidth: z }) => {
    const [E, O, H] = _h({
      sourceX: r,
      sourceY: l,
      sourcePosition: b,
      targetX: s,
      targetY: u,
      targetPosition: w,
      borderRadius: C?.borderRadius,
      offset: C?.offset,
      stepPosition: C?.stepPosition
    }), k = e.isInternal ? void 0 : a;
    return x.jsx(Sc, { id: k, path: E, labelX: O, labelY: H, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: N, markerStart: T, interactionWidth: z });
  });
}
const Jx = Kx({ isInternal: !1 }), Wx = Kx({ isInternal: !0 });
Jx.displayName = "SmoothStepEdge";
Wx.displayName = "SmoothStepEdgeInternal";
function eS(e) {
  return _.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return x.jsx(Jx, { ...r, id: l, pathOptions: _.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const VA = eS({ isInternal: !1 }), tS = eS({ isInternal: !0 });
VA.displayName = "StepEdge";
tS.displayName = "StepEdgeInternal";
function nS(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: b, markerStart: w, interactionWidth: N }) => {
    const [T, C, z] = xx({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = e.isInternal ? void 0 : a;
    return x.jsx(Sc, { id: E, path: T, labelX: C, labelY: z, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: b, markerStart: w, interactionWidth: N });
  });
}
const qA = nS({ isInternal: !1 }), aS = nS({ isInternal: !0 });
qA.displayName = "StraightEdge";
aS.displayName = "StraightEdgeInternal";
function iS(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: d = Ae.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: T, pathOptions: C, interactionWidth: z }) => {
    const [E, O, H] = vx({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: C?.curvature
    }), k = e.isInternal ? void 0 : a;
    return x.jsx(Sc, { id: k, path: E, labelX: O, labelY: H, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: N, markerStart: T, interactionWidth: z });
  });
}
const $A = iS({ isInternal: !1 }), rS = iS({ isInternal: !0 });
$A.displayName = "BezierEdge";
rS.displayName = "BezierEdgeInternal";
const Pv = {
  default: rS,
  straight: aS,
  step: tS,
  smoothstep: Wx,
  simplebezier: Px
}, Kv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, YA = (e, a, r) => r === Ae.Left ? e - a : r === Ae.Right ? e + a : e, IA = (e, a, r) => r === Ae.Top ? e - a : r === Ae.Bottom ? e + a : e, Jv = "react-flow__edgeupdater";
function Wv({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return x.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Qt([Jv, `${Jv}-${d}`]), cx: YA(a, l, e), cy: IA(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function GA({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: v, setUpdateHover: b }) {
  const w = zt(), N = (O, H) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: k, domNode: B, connectionMode: A, connectionRadius: I, lib: le, onConnectStart: Y, cancelConnection: K, nodeLookup: re, rfId: j, panBy: G, updateConnection: R } = w.getState(), L = H.type === "target", F = (D, q) => {
      v(!1), g?.(D, r, H.type, q);
    }, V = (D) => m?.(r, D), P = (D, q) => {
      v(!0), y?.(O, r, H.type), Y?.(D, q);
    };
    Rh.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: k,
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
      panBy: G,
      isValidConnection: (...D) => w.getState().isValidConnection?.(...D) ?? !0,
      onConnect: V,
      onConnectStart: P,
      onConnectEnd: (...D) => w.getState().onConnectEnd?.(...D),
      onReconnectEnd: F,
      updateConnection: R,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, T = (O) => N(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), C = (O) => N(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), z = () => b(!0), E = () => b(!1);
  return x.jsxs(x.Fragment, { children: [(e === !0 || e === "source") && x.jsx(Wv, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: T, onMouseEnter: z, onMouseOut: E, type: "source" }), (e === !0 || e === "target") && x.jsx(Wv, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: C, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function XA({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: b, rfId: w, edgeTypes: N, noPanClassName: T, onError: C, disableKeyboardA11y: z }) {
  let E = lt((we) => we.edgeLookup.get(e));
  const O = lt((we) => we.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let H = E.type || "default", k = N?.[H] || Pv[H];
  k === void 0 && (C?.("011", xa.error011(H)), H = "default", k = N?.default || Pv.default);
  const B = !!(E.focusable || a && typeof E.focusable > "u"), A = typeof g < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), I = !!(E.selectable || l && typeof E.selectable > "u"), le = _.useRef(null), [Y, K] = _.useState(!1), [re, j] = _.useState(!1), G = zt(), { zIndex: R, sourceX: L, sourceY: F, targetX: V, targetY: P, sourcePosition: D, targetPosition: q } = lt(_.useCallback((we) => {
    const xe = we.nodeLookup.get(E.source), Ce = we.nodeLookup.get(E.target);
    if (!xe || !Ce)
      return {
        zIndex: E.zIndex,
        ...Kv
      };
    const $e = OM({
      id: e,
      sourceNode: xe,
      targetNode: Ce,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: we.connectionMode,
      onError: C
    });
    return {
      zIndex: NM({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Ce,
        elevateOnSelect: we.elevateEdgesOnSelect,
        zIndexMode: we.zIndexMode
      }),
      ...$e || Kv
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), Q = _.useMemo(() => E.markerStart ? `url('#${Nh(E.markerStart, w)}')` : void 0, [E.markerStart, w]), te = _.useMemo(() => E.markerEnd ? `url('#${Nh(E.markerEnd, w)}')` : void 0, [E.markerEnd, w]);
  if (E.hidden || L === null || F === null || V === null || P === null)
    return null;
  const se = (we) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Ce, multiSelectionActive: $e } = G.getState();
    I && (G.setState({ nodesSelectionActive: !1 }), E.selected && $e ? (Ce({ nodes: [], edges: [E] }), le.current?.blur()) : xe([e])), s && s(we, E);
  }, he = u ? (we) => {
    u(we, { ...E });
  } : void 0, me = c ? (we) => {
    c(we, { ...E });
  } : void 0, ee = d ? (we) => {
    d(we, { ...E });
  } : void 0, ge = p ? (we) => {
    p(we, { ...E });
  } : void 0, ze = m ? (we) => {
    m(we, { ...E });
  } : void 0, Re = (we) => {
    if (!z && ax.includes(we.key) && I) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Ce } = G.getState();
      we.key === "Escape" ? (le.current?.blur(), xe({ edges: [E] })) : Ce([e]);
    }
  };
  return x.jsx("svg", { style: { zIndex: R }, children: x.jsxs("g", { className: Qt([
    "react-flow__edge",
    `react-flow__edge-${H}`,
    E.className,
    T,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !I && !s,
      updating: Y,
      selectable: I
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: ee, onMouseMove: ge, onMouseLeave: ze, onKeyDown: B ? Re : void 0, tabIndex: B ? 0 : void 0, role: E.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": B ? `${Hx}-${w}` : void 0, ref: le, ...E.domAttributes, children: [!re && x.jsx(k, { id: e, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: I, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: F, targetX: V, targetY: P, sourcePosition: D, targetPosition: q, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: Q, markerEnd: te, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), A && x.jsx(GA, { edge: E, isReconnectable: A, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: b, sourceX: L, sourceY: F, targetX: V, targetY: P, sourcePosition: D, targetPosition: q, setUpdateHover: K, setReconnecting: j })] }) });
}
var FA = _.memo(XA);
const ZA = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function lS({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: v, onReconnectStart: b, onReconnectEnd: w, disableKeyboardA11y: N }) {
  const { edgesFocusable: T, edgesReconnectable: C, elementsSelectable: z, onError: E } = lt(ZA, At), O = zA(a);
  return x.jsxs("div", { className: "react-flow__edges", children: [x.jsx(BA, { defaultColor: e, rfId: r }), O.map((H) => x.jsx(FA, { id: H, edgesFocusable: T, edgesReconnectable: C, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: v, onReconnectStart: b, onReconnectEnd: w, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: N }, H))] });
}
lS.displayName = "EdgeRenderer";
const QA = _.memo(lS), PA = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function KA({ children: e }) {
  const a = lt(PA);
  return x.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function JA(e) {
  const a = Sm(), r = _.useRef(!1);
  _.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const WA = (e) => e.panZoom?.syncViewport;
function e4(e) {
  const a = lt(WA), r = zt();
  return _.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function t4(e) {
  return e.connection.inProgress ? { ...e.connection, to: Tl(e.connection.to, e.transform) } : { ...e.connection };
}
function n4(e) {
  return t4;
}
function a4(e) {
  const a = n4();
  return lt(a, At);
}
const i4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function r4({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = lt(i4, At);
  return !(u && s && p) ? null : x.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: x.jsx("g", { className: Qt(["react-flow__connection", lx(d)]), children: x.jsx(oS, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const oS = ({ style: e, type: a = Xi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: v, pointer: b } = a4();
  if (!s)
    return;
  if (r)
    return x.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: v, connectionStatus: lx(l), toNode: y, toHandle: g, pointer: b });
  let w = "";
  const N = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (a) {
    case Xi.Bezier:
      [w] = vx(N);
      break;
    case Xi.SimpleBezier:
      [w] = Zx(N);
      break;
    case Xi.Step:
      [w] = _h({
        ...N,
        borderRadius: 0
      });
      break;
    case Xi.SmoothStep:
      [w] = _h(N);
      break;
    default:
      [w] = xx(N);
  }
  return x.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: e });
};
oS.displayName = "ConnectionLine";
const l4 = {};
function eb(e = l4) {
  _.useRef(e), zt(), _.useEffect(() => {
  }, [e]);
}
function o4() {
  zt(), _.useRef(!1), _.useEffect(() => {
  }, []);
}
function sS({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: v, onSelectionEnd: b, connectionLineType: w, connectionLineStyle: N, connectionLineComponent: T, connectionLineContainerStyle: C, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: H, panActivationKeyCode: k, zoomActivationKeyCode: B, deleteKeyCode: A, onlyRenderVisibleElements: I, elementsSelectable: le, defaultViewport: Y, translateExtent: K, minZoom: re, maxZoom: j, preventScrolling: G, defaultMarkerColor: R, zoomOnScroll: L, zoomOnPinch: F, panOnScroll: V, panOnScrollSpeed: P, panOnScrollMode: D, zoomOnDoubleClick: q, panOnDrag: Q, autoPanOnSelection: te, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Re, nodeClickDistance: we, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Te, onReconnect: Xe, onReconnectStart: Be, onReconnectEnd: Ye, noDragClassName: wt, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt, viewport: It, onViewportChange: Lt }) {
  return eb(e), eb(a), o4(), JA(r), e4(It), x.jsx(wA, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Re, deleteKeyCode: A, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: H, panActivationKeyCode: k, zoomActivationKeyCode: B, elementsSelectable: le, zoomOnScroll: L, zoomOnPinch: F, zoomOnDoubleClick: q, panOnScroll: V, panOnScrollSpeed: P, panOnScrollMode: D, panOnDrag: Q, autoPanOnSelection: te, defaultViewport: Y, translateExtent: K, minZoom: re, maxZoom: j, onSelectionContextMenu: g, preventScrolling: G, noDragClassName: wt, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Qe, onViewportChange: Lt, isControlledViewport: !!It, children: x.jsxs(KA, { children: [x.jsx(QA, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Xe, onReconnectStart: Be, onReconnectEnd: Ye, onlyRenderVisibleElements: I, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Te, defaultMarkerColor: R, noPanClassName: Ze, disableKeyboardA11y: Qe, rfId: yt }), x.jsx(r4, { style: N, type: w, component: T, containerStyle: C }), x.jsx("div", { className: "react-flow__edgelabel-renderer" }), x.jsx(AA, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: we, onlyRenderVisibleElements: I, noPanClassName: Ze, noDragClassName: wt, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt }), x.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
sS.displayName = "GraphView";
const s4 = _.memo(sS), u4 = fx(), tb = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: v = "basic" } = {}) => {
  const b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), C = l ?? a ?? [], z = r ?? e ?? [], E = y ?? [0, 0], O = g ?? qo;
  Ex(N, T, C);
  const { nodesInitialized: H } = Ch(z, b, w, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: v
  });
  let k = [0, 0, 1];
  if (c && s && u) {
    const B = ts(b, {
      filter: (Y) => !!((Y.width || Y.initialWidth) && (Y.height || Y.initialHeight))
    }), { x: A, y: I, zoom: le } = mm(B, s, u, p, m, d?.padding ?? 0.1);
    k = [A, I, le];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: k,
    nodes: z,
    nodesInitialized: H,
    nodeLookup: b,
    parentLookup: w,
    edges: C,
    edgeLookup: T,
    connectionLookup: N,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: qo,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: wl.Strict,
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
    connection: { ...rx },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: u4,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: ix,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, c4 = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v }) => SD((b, w) => {
  async function N() {
    const { nodeLookup: T, panZoom: C, fitViewOptions: z, fitViewResolver: E, width: O, height: H, minZoom: k, maxZoom: B } = w();
    C && (await vM({
      nodes: T,
      width: O,
      height: H,
      panZoom: C,
      minZoom: k,
      maxZoom: B
    }, z), E?.resolve(!0), b({ fitViewResolver: null }));
  }
  return {
    ...tb({
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
      zIndexMode: v
    }),
    setNodes: (T) => {
      const { nodeLookup: C, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: H, zIndexMode: k, nodesSelectionActive: B } = w(), { nodesInitialized: A, hasSelectedNodes: I } = Ch(T, C, z, {
        nodeOrigin: E,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: k
      }), le = B && I;
      H && A ? (N(), b({
        nodes: T,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: le
      })) : b({ nodes: T, nodesInitialized: A, nodesSelectionActive: le });
    },
    setEdges: (T) => {
      const { connectionLookup: C, edgeLookup: z } = w();
      Ex(C, z, T), b({ edges: T });
    },
    setDefaultNodesAndEdges: (T, C) => {
      if (T) {
        const { setNodes: z } = w();
        z(T), b({ hasDefaultNodes: !0 });
      }
      if (C) {
        const { setEdges: z } = w();
        z(C), b({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (T) => {
      const { triggerNodeChanges: C, nodeLookup: z, parentLookup: E, domNode: O, nodeOrigin: H, nodeExtent: k, debug: B, fitViewQueued: A, zIndexMode: I } = w(), { changes: le, updatedInternals: Y } = qM(T, z, E, O, H, k, I);
      Y && (BM(z, E, { nodeOrigin: H, nodeExtent: k, zIndexMode: I }), A ? (N(), b({ fitViewQueued: !1, fitViewOptions: void 0 })) : b({}), le?.length > 0 && (B && console.log("React Flow: trigger node changes", le), C?.(le)));
    },
    updateNodePositions: (T, C = !1) => {
      const z = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: H, connection: k, updateConnection: B, onNodesChangeMiddlewareMap: A } = w();
      for (const [I, le] of T) {
        const Y = O.get(I), K = !!(Y?.expandParent && Y?.parentId && le?.position), re = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, le.position.x),
            y: Math.max(0, le.position.y)
          } : le.position,
          dragging: C
        };
        if (Y && k.inProgress && k.fromNode.id === Y.id) {
          const j = Cr(Y, k.fromHandle, Ae.Left, !0);
          B({ ...k, from: j });
        }
        K && Y.parentId && z.push({
          id: I,
          parentId: Y.parentId,
          rect: {
            ...le.internals.positionAbsolute,
            width: le.measured.width ?? 0,
            height: le.measured.height ?? 0
          }
        }), E.push(re);
      }
      if (z.length > 0) {
        const { parentLookup: I, nodeOrigin: le } = w(), Y = xm(z, O, I, le);
        E.push(...Y);
      }
      for (const I of A.values())
        E = I(E);
      H(E);
    },
    triggerNodeChanges: (T) => {
      const { onNodesChange: C, setNodes: z, nodes: E, hasDefaultNodes: O, debug: H } = w();
      if (T?.length) {
        if (O) {
          const k = ID(T, E);
          z(k);
        }
        H && console.log("React Flow: trigger node changes", T), C?.(T);
      }
    },
    triggerEdgeChanges: (T) => {
      const { onEdgesChange: C, setEdges: z, edges: E, hasDefaultEdges: O, debug: H } = w();
      if (T?.length) {
        if (O) {
          const k = GD(T, E);
          z(k);
        }
        H && console.log("React Flow: trigger edge changes", T), C?.(T);
      }
    },
    addSelectedNodes: (T) => {
      const { multiSelectionActive: C, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = w();
      if (C) {
        const k = T.map((B) => gr(B, !0));
        O(k);
        return;
      }
      O(pl(E, /* @__PURE__ */ new Set([...T]), !0)), H(pl(z));
    },
    addSelectedEdges: (T) => {
      const { multiSelectionActive: C, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = w();
      if (C) {
        const k = T.map((B) => gr(B, !0));
        H(k);
        return;
      }
      H(pl(z, /* @__PURE__ */ new Set([...T]))), O(pl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: T, edges: C } = {}) => {
      const { edges: z, nodes: E, nodeLookup: O, triggerNodeChanges: H, triggerEdgeChanges: k } = w(), B = T || E, A = C || z, I = [];
      for (const Y of B) {
        if (!Y.selected)
          continue;
        const K = O.get(Y.id);
        K && (K.selected = !1), I.push(gr(Y.id, !1));
      }
      const le = [];
      for (const Y of A)
        Y.selected && le.push(gr(Y.id, !1));
      H(I), k(le);
    },
    setMinZoom: (T) => {
      const { panZoom: C, maxZoom: z } = w();
      C?.setScaleExtent([T, z]), b({ minZoom: T });
    },
    setMaxZoom: (T) => {
      const { panZoom: C, minZoom: z } = w();
      C?.setScaleExtent([z, T]), b({ maxZoom: T });
    },
    setTranslateExtent: (T) => {
      w().panZoom?.setTranslateExtent(T), b({ translateExtent: T });
    },
    resetSelectedElements: () => {
      const { edges: T, nodes: C, triggerNodeChanges: z, triggerEdgeChanges: E, elementsSelectable: O } = w();
      if (!O)
        return;
      const H = C.reduce((B, A) => A.selected ? [...B, gr(A.id, !1)] : B, []), k = T.reduce((B, A) => A.selected ? [...B, gr(A.id, !1)] : B, []);
      z(H), E(k);
    },
    setNodeExtent: (T) => {
      const { nodes: C, nodeLookup: z, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: H, nodeExtent: k, zIndexMode: B } = w();
      T[0][0] === k[0][0] && T[0][1] === k[0][1] && T[1][0] === k[1][0] && T[1][1] === k[1][1] || (Ch(C, z, E, {
        nodeOrigin: O,
        nodeExtent: T,
        elevateNodesOnSelect: H,
        checkEquality: !1,
        zIndexMode: B
      }), b({ nodeExtent: T }));
    },
    panBy: (T) => {
      const { transform: C, width: z, height: E, panZoom: O, translateExtent: H } = w();
      return $M({ delta: T, panZoom: O, transform: C, translateExtent: H, width: z, height: E });
    },
    setCenter: async (T, C, z) => {
      const { width: E, height: O, maxZoom: H, panZoom: k } = w();
      if (!k)
        return !1;
      const B = typeof z?.zoom < "u" ? z.zoom : H;
      return await k.setViewport({
        x: E / 2 - T * B,
        y: O / 2 - C * B,
        zoom: B
      }, { duration: z?.duration, ease: z?.ease, interpolate: z?.interpolate }), !0;
    },
    cancelConnection: () => {
      b({
        connection: { ...rx }
      });
    },
    updateConnection: (T) => {
      b({ connection: T });
    },
    reset: () => b({ ...tb() })
  };
}, Object.is);
function uS({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v, children: b }) {
  const [w] = _.useState(() => c4({
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
    zIndexMode: v
  }));
  return x.jsx(_D, { value: w, children: x.jsx(KD, { children: b }) });
}
function f4({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: b }) {
  return _.useContext(vc) ? x.jsx(x.Fragment, { children: e }) : x.jsx(uS, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: b, children: e });
}
const d4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function h4({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: v, onConnect: b, onConnectStart: w, onConnectEnd: N, onClickConnectStart: T, onClickConnectEnd: C, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: k, onNodeDragStart: B, onNodeDrag: A, onNodeDragStop: I, onNodesDelete: le, onEdgesDelete: Y, onDelete: K, onSelectionChange: re, onSelectionDragStart: j, onSelectionDrag: G, onSelectionDragStop: R, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: V, onBeforeDelete: P, connectionMode: D, connectionLineType: q = Xi.Bezier, connectionLineStyle: Q, connectionLineComponent: te, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ee = !1, selectionMode: ge = $o.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Re = Io() ? "Meta" : "Control", zoomActivationKeyCode: we = Io() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Ce, onlyRenderVisibleElements: $e = !1, selectNodesOnDrag: ft, nodesDraggable: Te, autoPanOnNodeFocus: Xe, nodesConnectable: Be, nodesFocusable: Ye, nodeOrigin: wt = Bx, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Qe = !0, defaultViewport: gt = BD, minZoom: yt = 0.5, maxZoom: It = 2, translateExtent: Lt = qo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Gn = "#b1b1b7", zoomOnScroll: vn = !0, zoomOnPinch: tn = !0, panOnScroll: Pt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = Sr.Free, zoomOnDoubleClick: mi = !0, panOnDrag: Ea = !0, onPaneClick: bn, onPaneMouseEnter: sa, onPaneMouseMove: Dn, onPaneMouseLeave: Xn, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ua, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: Se = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: De, connectOnClick: Ue, attributionPosition: je, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: _a = !0, autoPanSpeed: An, connectionRadius: cn, isValidConnection: nn, onError: xn, style: pi, id: Sn, nodeDragThreshold: gi, connectionDragThreshold: ca, viewport: fa, onViewportChange: ke, width: bt, height: pn, colorMode: zn = "light", debug: yi, onScroll: qa, ariaLabelConfig: dt, zIndexMode: Fn = "basic", ...an }, Qi) {
  const Mr = Sn || "1", Dl = qD(zn), vi = _.useCallback((Al) => {
    Al.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), qa?.(Al);
  }, [qa]);
  return x.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: vi, style: { ...pi, ...d4 }, ref: Qi, className: Qt(["react-flow", s, Dl]), id: Sn, role: "application", children: x.jsxs(f4, { nodes: e, edges: a, width: bt, height: pn, fitView: Me, fitViewOptions: De, minZoom: yt, maxZoom: It, nodeOrigin: wt, nodeExtent: ot, zIndexMode: Fn, children: [x.jsx(VD, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: b, onConnectStart: w, onConnectEnd: N, onClickConnectStart: T, onClickConnectEnd: C, nodesDraggable: Te, autoPanOnNodeFocus: Xe, nodesConnectable: Be, nodesFocusable: Ye, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Qe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: It, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Ce, connectionMode: D, translateExtent: Lt, connectOnClick: Ue, defaultEdgeOptions: rt, fitView: Me, fitViewOptions: De, onNodesDelete: le, onEdgesDelete: Y, onDelete: K, onNodeDragStart: B, onNodeDrag: A, onNodeDragStop: I, onSelectionDrag: G, onSelectionDragStart: j, onSelectionDragStop: R, onMove: y, onMoveStart: g, onMoveEnd: v, noPanClassName: be, nodeOrigin: wt, rfId: Mr, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: An, onError: xn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: gi, connectionDragThreshold: ca, onBeforeDelete: P, debug: yi, ariaLabelConfig: dt, zIndexMode: Fn }), x.jsx(s4, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: k, nodeTypes: u, edgeTypes: c, connectionLineType: q, connectionLineStyle: Q, connectionLineComponent: te, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: ee, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Re, panActivationKeyCode: ze, zoomActivationKeyCode: we, onlyRenderVisibleElements: $e, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: It, preventScrolling: mt, zoomOnScroll: vn, zoomOnPinch: tn, zoomOnDoubleClick: mi, panOnScroll: Pt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: Ea, autoPanOnSelection: _a, onPaneClick: bn, onPaneMouseEnter: sa, onPaneMouseMove: Dn, onPaneMouseLeave: Xn, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: V, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ua, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: Gn, noDragClassName: ve, noWheelClassName: Se, noPanClassName: be, rfId: Mr, disableKeyboardA11y: We, nodeExtent: ot, viewport: fa, onViewportChange: ke }), x.jsx(HD, { onSelectionChange: re }), Vt, x.jsx(AD, { proOptions: Ge, position: je }), x.jsx(DD, { rfId: Mr, disableKeyboardA11y: We })] }) });
}
var m4 = Ux(h4);
function p4({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return x.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Qt(["react-flow__background-pattern", r, l]) });
}
function g4({ radius: e, className: a }) {
  return x.jsx("circle", { cx: e, cy: e, r: e, className: Qt(["react-flow__background-pattern", "dots", a]) });
}
var Ba;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ba || (Ba = {}));
const y4 = {
  [Ba.Dots]: 1,
  [Ba.Lines]: 1,
  [Ba.Cross]: 6
}, v4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function cS({
  id: e,
  variant: a = Ba.Dots,
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
  const g = _.useRef(null), { transform: v, patternId: b } = lt(v4, At), w = l || y4[a], N = a === Ba.Dots, T = a === Ba.Cross, C = Array.isArray(r) ? r : [r, r], z = [C[0] * v[2] || 1, C[1] * v[2] || 1], E = w * v[2], O = Array.isArray(u) ? u : [u, u], H = T ? [E, E] : z, k = [
    O[0] * v[2] || 1 + H[0] / 2,
    O[1] * v[2] || 1 + H[1] / 2
  ], B = `${b}${e || ""}`;
  return x.jsxs("svg", { className: Qt(["react-flow__background", m]), style: {
    ...p,
    ...xc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [x.jsx("pattern", { id: B, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${k[0]},-${k[1]})`, children: N ? x.jsx(g4, { radius: E / 2, className: y }) : x.jsx(p4, { dimensions: H, lineWidth: s, variant: a, className: y }) }), x.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
cS.displayName = "Background";
const nb = _.memo(cS);
function b4() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: x.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function x4() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: x.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function S4() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: x.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function w4() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: x.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function E4() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: x.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function _u({ children: e, className: a, ...r }) {
  return x.jsx("button", { type: "button", className: Qt(["react-flow__controls-button", a]), ...r, children: e });
}
const _4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function fS({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: v = "vertical", "aria-label": b }) {
  const w = zt(), { isInteractive: N, minZoomReached: T, maxZoomReached: C, ariaLabelConfig: z } = lt(_4, At), { zoomIn: E, zoomOut: O, fitView: H } = Sm(), k = () => {
    E(), u?.();
  }, B = () => {
    O(), c?.();
  }, A = () => {
    H(s), d?.();
  }, I = () => {
    w.setState({
      nodesDraggable: !N,
      nodesConnectable: !N,
      elementsSelectable: !N
    }), p?.(!N);
  }, le = v === "horizontal" ? "horizontal" : "vertical";
  return x.jsxs(bc, { className: Qt(["react-flow__controls", le, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": b ?? z["controls.ariaLabel"], children: [a && x.jsxs(x.Fragment, { children: [x.jsx(_u, { onClick: k, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: C, children: x.jsx(b4, {}) }), x.jsx(_u, { onClick: B, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: T, children: x.jsx(x4, {}) })] }), r && x.jsx(_u, { className: "react-flow__controls-fitview", onClick: A, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: x.jsx(S4, {}) }), l && x.jsx(_u, { className: "react-flow__controls-interactive", onClick: I, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: N ? x.jsx(E4, {}) : x.jsx(w4, {}) }), y] });
}
fS.displayName = "Controls";
const N4 = _.memo(fS);
function C4({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: v, onClick: b }) {
  const { background: w, backgroundColor: N } = u || {}, T = c || w || N;
  return x.jsx("rect", { className: Qt(["react-flow__minimap-node", { selected: v }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: T,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: b ? (C) => b(C, e) : void 0 });
}
const R4 = _.memo(C4), T4 = (e) => e.nodes.map((a) => a.id), th = (e) => e instanceof Function ? e : () => e;
function M4({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = R4,
  onClick: c
}) {
  const d = lt(T4, At), p = th(a), m = th(e), y = th(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return x.jsx(x.Fragment, { children: d.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    x.jsx(A4, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, v)
  )) });
}
function D4({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: v, height: b } = lt((w) => {
    const N = w.nodeLookup.get(e);
    if (!N)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const T = N.internals.userNode, { x: C, y: z } = N.internals.positionAbsolute, { width: E, height: O } = hi(T);
    return {
      node: T,
      x: C,
      y: z,
      width: E,
      height: O
    };
  }, At);
  return !m || m.hidden || !dx(m) ? null : x.jsx(d, { x: y, y: g, width: v, height: b, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const A4 = _.memo(D4);
var z4 = _.memo(M4);
const O4 = 200, j4 = 150, L4 = (e) => !e.hidden, H4 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? cx(ts(e.nodeLookup, { filter: L4 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, B4 = "react-flow__minimap-desc";
function dS({
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
  position: v = "bottom-right",
  onClick: b,
  onNodeClick: w,
  pannable: N = !1,
  zoomable: T = !1,
  ariaLabel: C,
  inversePan: z,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const H = zt(), k = _.useRef(null), { boundingRect: B, viewBB: A, rfId: I, panZoom: le, translateExtent: Y, flowWidth: K, flowHeight: re, ariaLabelConfig: j } = lt(H4, At), G = e?.width ?? O4, R = e?.height ?? j4, L = B.width / G, F = B.height / R, V = Math.max(L, F), P = V * G, D = V * R, q = O * V, Q = B.x - (P - B.width) / 2 - q, te = B.y - (D - B.height) / 2 - q, se = P + q * 2, he = D + q * 2, me = `${B4}-${I}`, ee = _.useRef(0), ge = _.useRef();
  ee.current = V, _.useEffect(() => {
    if (k.current && le)
      return ge.current = KM({
        domNode: k.current,
        panZoom: le,
        getTransform: () => H.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        ge.current?.destroy();
      };
  }, [le]), _.useEffect(() => {
    ge.current?.update({
      translateExtent: Y,
      width: K,
      height: re,
      inversePan: z,
      pannable: N,
      zoomStep: E,
      zoomable: T
    });
  }, [N, T, z, E, Y, K, re]);
  const ze = b ? (xe) => {
    const [Ce, $e] = ge.current?.pointer(xe) || [0, 0];
    b(xe, { x: Ce, y: $e });
  } : void 0, Re = w ? _.useCallback((xe, Ce) => {
    const $e = H.getState().nodeLookup.get(Ce).internals.userNode;
    w(xe, $e);
  }, []) : void 0, we = C ?? j["minimap.ariaLabel"];
  return x.jsx(bc, { position: v, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * V : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Qt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: x.jsxs("svg", { width: G, height: R, viewBox: `${Q} ${te} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: k, onClick: ze, children: [we && x.jsx("title", { id: me, children: we }), x.jsx(z4, { onClick: Re, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), x.jsx("path", { className: "react-flow__minimap-mask", d: `M${Q - q},${te - q}h${se + q * 2}v${he + q * 2}h${-se - q * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
dS.displayName = "MiniMap";
const k4 = _.memo(dS), U4 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, V4 = {
  [Cl.Line]: "right",
  [Cl.Handle]: "bottom-right"
};
function q4({ nodeId: e, position: a, variant: r = Cl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: v, autoScale: b = !0, shouldResize: w, onResizeStart: N, onResize: T, onResizeEnd: C }) {
  const z = Yx(), E = typeof e == "string" ? e : z, O = zt(), H = _.useRef(null), k = r === Cl.Handle, B = lt(_.useCallback(U4(k && b), [k, b]), At), A = _.useRef(null), I = a ?? V4[r];
  _.useEffect(() => {
    if (!(!H.current || !E))
      return A.current || (A.current = cD({
        domNode: H.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: Y, transform: K, snapGrid: re, snapToGrid: j, nodeOrigin: G, domNode: R } = O.getState();
          return {
            nodeLookup: Y,
            transform: K,
            snapGrid: re,
            snapToGrid: j,
            nodeOrigin: G,
            paneDomNode: R
          };
        },
        onChange: (Y, K) => {
          const { triggerNodeChanges: re, nodeLookup: j, parentLookup: G, nodeOrigin: R } = O.getState(), L = [], F = { x: Y.x, y: Y.y }, V = j.get(E);
          if (V && V.expandParent && V.parentId) {
            const P = V.origin ?? R, D = Y.width ?? V.measured.width ?? 0, q = Y.height ?? V.measured.height ?? 0, Q = {
              id: V.id,
              parentId: V.parentId,
              rect: {
                width: D,
                height: q,
                ...hx({
                  x: Y.x ?? V.position.x,
                  y: Y.y ?? V.position.y
                }, { width: D, height: q }, V.parentId, j, P)
              }
            }, te = xm([Q], j, G, R);
            L.push(...te), F.x = Y.x ? Math.max(P[0] * D, Y.x) : void 0, F.y = Y.y ? Math.max(P[1] * q, Y.y) : void 0;
          }
          if (F.x !== void 0 && F.y !== void 0) {
            const P = {
              id: E,
              type: "position",
              position: { ...F }
            };
            L.push(P);
          }
          if (Y.width !== void 0 && Y.height !== void 0) {
            const D = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: Y.width,
                height: Y.height
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
        onEnd: ({ width: Y, height: K }) => {
          const re = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: Y,
              height: K
            }
          };
          O.getState().triggerNodeChanges([re]);
        }
      })), A.current.update({
        controlPosition: I,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: v,
        onResizeStart: N,
        onResize: T,
        onResizeEnd: C,
        shouldResize: w
      }), () => {
        A.current?.destroy();
      };
  }, [
    I,
    d,
    p,
    m,
    y,
    g,
    N,
    T,
    C,
    w
  ]);
  const le = I.split("-");
  return x.jsx("div", { className: Qt(["react-flow__resize-control", "nodrag", ...le, r, l]), ref: H, style: {
    ...s,
    scale: B,
    ...c && { [k ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
_.memo(q4);
var $4 = "_1bllf8b0", Y4 = "_1bllf8b1";
const ab = 16, I4 = "rgba(186, 158, 255, 0.14)", G4 = "rgba(186, 158, 255, 0.06)", X4 = "rgba(0, 0, 0, 0.6)", F4 = "#1d2023", Z4 = "#ba9eff";
function Q4({
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
  const y = [$4, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ x.jsxs(
    m4,
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
      onNodeClick: (g, v) => m?.(v),
      children: [
        /* @__PURE__ */ x.jsx(
          nb,
          {
            id: "minor",
            variant: Ba.Dots,
            gap: ab,
            size: 1.1,
            color: I4
          }
        ),
        /* @__PURE__ */ x.jsx(
          nb,
          {
            id: "major",
            variant: Ba.Lines,
            gap: ab * 5,
            lineWidth: 1,
            color: G4
          }
        ),
        s && /* @__PURE__ */ x.jsx(N4, { showInteractive: !1 }),
        l && /* @__PURE__ */ x.jsx(
          k4,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: X4,
            nodeColor: () => F4,
            nodeStrokeColor: () => Z4,
            className: Y4
          }
        ),
        p
      ]
    }
  ) });
}
function P4(e) {
  return /* @__PURE__ */ x.jsx(uS, { children: /* @__PURE__ */ x.jsx(Q4, { ...e }) });
}
var K4 = "a9gtw0", J4 = "a9gtw1", W4 = "a9gtw2", e3 = "a9gtw3", t3 = "a9gtw4", n3 = "a9gtw5", a3 = "a9gtw6", i3 = "a9gtw7";
const r3 = {
  default: "",
  raised: J4,
  inset: W4
};
function oi({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [K4, r3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ x.jsxs("header", { className: e3, children: [
      /* @__PURE__ */ x.jsxs("div", { className: t3, children: [
        e && /* @__PURE__ */ x.jsx("span", { className: a3, children: e }),
        a && /* @__PURE__ */ x.jsx("span", { className: i3, children: a })
      ] }),
      r && /* @__PURE__ */ x.jsx("div", { className: n3, children: r })
    ] }),
    l
  ] });
}
const Em = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function _m() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function tc() {
  return {
    phase: "idle",
    jobId: null,
    stage: null,
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
    stageStates: _m()
  };
}
function l3(e, a, r = Date.now()) {
  return {
    ...tc(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ..._m(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function o3(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: f3(a.params.fraction),
        stage: a.params.stage ?? l.stage
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: p3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: h3(
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
        stageStates: hS(l.stageStates)
      };
    default:
      return l;
  }
}
function s3(e) {
  return { ...e, phase: "cancelled", stageStates: _m() };
}
const u3 = -32108;
function c3(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: u3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: hS(e.stageStates)
  };
}
function ib(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function rb(e) {
  const a = tc();
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
function f3(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const d3 = 0.3;
function h3(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + d3 * (a - e);
}
function m3(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function p3(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function hS(e) {
  const a = { ...e };
  for (const r of Em)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const mS = [
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
], wc = [
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
    key: "upscale_factor",
    label: "RTX upscale",
    tier: "core",
    control: "select",
    numeric: !0,
    default: 0,
    options: [
      { value: "0", label: "Off" },
      { value: "2", label: "2× (Maxine VSR)" },
      { value: "3", label: "3× (Maxine VSR)" },
      { value: "4", label: "4× (Maxine VSR)" }
    ],
    help: "NVIDIA Maxine RTX Video Super Resolution after stitch, before interpolation. Tensor-Core fast; Windows + RTX only."
  },
  {
    key: "upscale_quality",
    label: "Upscale quality",
    tier: "core",
    control: "select",
    default: "HIGH",
    options: [
      { value: "LOW", label: "Low (fastest)" },
      { value: "MEDIUM", label: "Medium" },
      { value: "HIGH", label: "High" },
      { value: "ULTRA", label: "Ultra (best)" },
      { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
      { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
    ],
    help: "Maxine VSR quality preset. HIGHBITRATE_* favours clean (uncompressed) sources like fresh renders."
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
function g3(e) {
  return wc.filter((a) => a.tier === e);
}
function y3() {
  const e = {};
  for (const a of wc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function lb(e) {
  return {
    ...y3(),
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: e.blocksToSwap,
    interpolate_method: e.interpolateMethod,
    interpolate_fps: e.interpolateFps,
    models_dir: e.modelsDir || void 0,
    output_path: e.outputDir ? `${e.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: e.ditHighPath || void 0,
    dit_low_path: e.ditLowPath || void 0
  };
}
function ob(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const pS = [10, 20, 30, 60, 120], v3 = "custom", nh = { framesPerClip: 85, fps: 16, overlap: 5 };
function Ml(e) {
  return {
    framesPerClip: e.frames_per_clip ?? nh.framesPerClip,
    fps: e.fps ?? nh.fps,
    overlap: e.num_overlap_frame ?? nh.overlap
  };
}
function gS(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function yS(e, a) {
  return a.fps <= 0 ? 0 : gS(e, a) / a.fps;
}
function vS(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
const b3 = 5, bS = 129, x3 = [2, 3, 4, 5, 6, 8];
function xS(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(bS, Math.max(b3, a));
}
function sb(e, a) {
  return xS(e * a);
}
function S3(e) {
  return e <= 0 ? 0 : Math.floor(bS / e);
}
function SS(e) {
  const { framesPerClip: a, fps: r } = Ml(e);
  return r <= 0 ? 0 : a / r;
}
function w3(e) {
  const { framesPerClip: a, fps: r } = Ml(e), l = `1 × ${a} frames @ ${r} fps → ${SS(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function E3(e, a) {
  for (const r of pS)
    if (vS(r, a) === e) return r;
  return v3;
}
function _3(e) {
  const a = Ml(e), r = e.num_clips ?? 1, l = yS(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
const Xo = "svi-canonical", N3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), C3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), R3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function T3(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function M3(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = T3(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = N3.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: C3.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : R3.has(e.id)
  };
}
function D3(e) {
  return [...e].sort((a, r) => a.id === Xo ? -1 : r.id === Xo ? 1 : 0);
}
function A3(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: D3(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function z3(e = 25) {
  return Tr(`/render/jobs?limit=${e}`);
}
async function O3(e) {
  return Tr(`/render/jobs/${e}`);
}
async function j3(e) {
  return Tr("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function L3(e) {
  return Tr(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function H3(e, a, r) {
  return MN(`/render/jobs/${e}/events`, a, r);
}
const B3 = 9e4, k3 = 24e4, U3 = 5e3, wS = _.createContext(null);
function V3({
  initialSettings: e = _1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = _.useState(e), [u, c] = _.useState(
    a?.id ?? Xo
  ), [d, p] = _.useState(a !== null), [m, y] = _.useState(() => {
    const V = lb(e);
    return a ? ob(V, a) : V;
  }), [g, v] = _.useState(null), [b, w] = _.useState(null), [N, T] = _.useState({
    enabled: !1,
    prompt: ""
  }), [C, z] = _.useState(tc), E = _.useRef(null), O = _.useRef(null), H = _.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), k = _.useCallback(() => {
    H(), O.current = setInterval(() => {
      z((V) => {
        if (V.phase !== "running" || V.lastFrameAt === null) return V;
        const P = Date.now() - V.lastFrameAt;
        return P >= k3 ? (E.current?.(), E.current = null, H(), c3(V)) : P >= B3 ? ib(V) : V;
      });
    }, U3);
  }, [H]), B = _.useCallback(
    (V) => {
      const P = V.params.requires_last_image === !0;
      c(V.id), p(!0), y((D) => {
        const q = {
          ...lb(l),
          ref_image_path: D.ref_image_path,
          prompts: D.prompts,
          last_image_path: P ? D.last_image_path ?? null : null
        };
        return ob(q, V);
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
  }, []), Y = _.useCallback((V, P) => {
    w(V), y((D) => P === null || P.length === 0 ? { ...D, last_image_path: P } : {
      ...D,
      last_image_path: P,
      num_clips: 1,
      frames_per_clip: xS(D.frames_per_clip ?? 81)
    });
  }, []), K = _.useCallback((V) => {
    T((P) => ({ ...P, ...V }));
  }, []), re = _.useCallback((V) => {
    s(V);
  }, []), j = _.useCallback(() => {
    E.current?.(), E.current = null, H(), z(tc());
  }, [H]), G = _.useCallback(async () => {
    E.current?.();
    const { jobId: V } = await j3({ presetId: u, params: m });
    z(l3(V, N.enabled)), E.current = H3(
      V,
      (P) => {
        z((D) => o3(D, P));
      },
      () => {
        z((P) => ib(P));
      }
    ), k();
  }, [m, u, N.enabled, k]), R = _.useCallback(async () => {
    const V = C.jobId;
    if (!V) return;
    const { status: P } = await L3(V);
    P !== "cancelling" && (E.current?.(), E.current = null, H(), z((D) => s3(D)));
  }, [C.jobId, H]), L = _.useCallback(
    async (V) => {
      E.current?.(), E.current = null, H();
      try {
        const P = await O3(V.id);
        z(rb(P));
      } catch {
        z(rb(V));
      }
    },
    [H]
  );
  _.useEffect(() => () => {
    E.current?.(), E.current = null, H();
  }, [H]);
  const F = _.useMemo(
    () => ({
      settings: l,
      presetId: u,
      presetApplied: d,
      params: m,
      refImageName: g,
      lastImageName: b,
      qwenEdit: N,
      render: C,
      applyPresetById: B,
      updateParam: A,
      setPrompts: I,
      setRefImage: le,
      setLastImage: Y,
      setQwenEdit: K,
      setSettings: re,
      startRenderJob: G,
      cancelRenderJob: R,
      resetRender: j,
      showJobResult: L
    }),
    [
      l,
      u,
      d,
      m,
      g,
      b,
      N,
      C,
      B,
      A,
      I,
      le,
      Y,
      K,
      re,
      G,
      R,
      j,
      L
    ]
  );
  return /* @__PURE__ */ x.jsx(wS.Provider, { value: F, children: r });
}
function yn() {
  const e = _.useContext(wS);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
function q3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const $3 = (e) => {
  switch (e) {
    case "success":
      return G3;
    case "info":
      return F3;
    case "warning":
      return X3;
    case "error":
      return Z3;
    default:
      return null;
  }
}, Y3 = Array(12).fill(0), I3 = ({ visible: e, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, Y3.map((r, l) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), G3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), X3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), F3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), Z3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), Q3 = /* @__PURE__ */ ye.createElement("svg", {
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
})), P3 = () => {
  const [e, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let Mh = 1;
class K3 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Mh++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
        ], ye.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (W3(m) && !m.ok) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, v = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, w = typeof g == "object" && !ye.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...w
          });
        } else if (m instanceof Error) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(m) : r.error, v = typeof r.description == "function" ? await r.description(m) : r.description, w = typeof g == "object" && !ye.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...w
          });
        } else if (r.success !== void 0) {
          u = !1;
          const g = typeof r.success == "function" ? await r.success(m) : r.success, v = typeof r.description == "function" ? await r.description(m) : r.description, w = typeof g == "object" && !ye.isValidElement(g) ? g : {
            message: g
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
          const y = typeof r.error == "function" ? await r.error(m) : r.error, g = typeof r.description == "function" ? await r.description(m) : r.description, b = typeof y == "object" && !ye.isValidElement(y) ? y : {
            message: y
          };
          this.create({
            id: l,
            type: "error",
            description: g,
            ...b
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
      const l = r?.id || Mh++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Tn = new K3(), J3 = (e, a) => {
  const r = a?.id || Mh++;
  return Tn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, W3 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", e5 = J3, t5 = () => Tn.toasts, n5 = () => Tn.getActiveToasts(), br = Object.assign(e5, {
  success: Tn.success,
  info: Tn.info,
  warning: Tn.warning,
  error: Tn.error,
  custom: Tn.custom,
  message: Tn.message,
  promise: Tn.promise,
  dismiss: Tn.dismiss,
  loading: Tn.loading
}, {
  getHistory: t5,
  getToasts: n5
});
q3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Nu(e) {
  return e.label !== void 0;
}
const a5 = 3, i5 = "24px", r5 = "16px", ub = 4e3, l5 = 356, o5 = 14, s5 = 45, u5 = 200;
function Da(...e) {
  return e.filter(Boolean).join(" ");
}
function c5(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const f5 = (e) => {
  var a, r, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: v, interacting: b, setHeights: w, visibleToasts: N, heights: T, index: C, toasts: z, expanded: E, removeToast: O, defaultRichColors: H, closeButton: k, style: B, cancelButtonStyle: A, actionButtonStyle: I, className: le = "", descriptionClassName: Y = "", duration: K, position: re, gap: j, expandByDefault: G, classNames: R, icons: L, closeButtonAriaLabel: F = "Close toast" } = e, [V, P] = ye.useState(null), [D, q] = ye.useState(null), [Q, te] = ye.useState(!1), [se, he] = ye.useState(!1), [me, ee] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Re, we] = ye.useState(!1), [xe, Ce] = ye.useState(0), [$e, ft] = ye.useState(0), Te = ye.useRef(g.duration || K || ub), Xe = ye.useRef(null), Be = ye.useRef(null), Ye = C === 0, wt = C + 1 <= N, Je = g.type, Ze = g.dismissible !== !1, Qe = g.className || "", gt = g.descriptionClassName || "", yt = ye.useMemo(() => T.findIndex((He) => He.toastId === g.id) || 0, [
    T,
    g.id
  ]), It = ye.useMemo(() => {
    var He;
    return (He = g.closeButton) != null ? He : k;
  }, [
    g.closeButton,
    k
  ]), Lt = ye.useMemo(() => g.duration || K || ub, [
    g.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), Gn = ye.useRef(0), vn = ye.useRef(null), [tn, Pt] = re.split("-"), Ot = ye.useMemo(() => T.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    T,
    yt
  ]), Ut = P3(), mi = g.invert || y, Ea = Je === "loading";
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
          toastId: g.id,
          height: vt,
          position: g.position
        },
        ...Ht
      ]), () => w((Ht) => Ht.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    w,
    g.id
  ]), ye.useLayoutEffect(() => {
    if (!Q) return;
    const He = Be.current, vt = He.style.height;
    He.style.height = "auto";
    const Ht = He.getBoundingClientRect().height;
    He.style.height = vt, ft(Ht), w((Vt) => Vt.find((pt) => pt.toastId === g.id) ? Vt.map((pt) => pt.toastId === g.id ? {
      ...pt,
      height: Ht
    } : pt) : [
      {
        toastId: g.id,
        height: Ht,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    Q,
    g.title,
    g.description,
    w,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const bn = ye.useCallback(() => {
    he(!0), Ce(ot.current), w((He) => He.filter((vt) => vt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, u5);
  }, [
    g,
    O,
    w,
    ot
  ]);
  ye.useEffect(() => {
    if (g.promise && Je === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let He;
    return E || b || Ut ? (() => {
      if (Gn.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Te.current = Te.current - Vt;
      }
      Gn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Te.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), He = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), bn();
      }, Te.current));
    })(), () => clearTimeout(He);
  }, [
    E,
    b,
    g,
    Je,
    Ut,
    bn
  ]), ye.useEffect(() => {
    g.delete && (bn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    bn,
    g.delete
  ]);
  function sa() {
    var He;
    if (L?.loading) {
      var vt;
      return /* @__PURE__ */ ye.createElement("div", {
        className: Da(R?.loader, g == null || (vt = g.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ye.createElement(I3, {
      className: Da(R?.loader, g == null || (He = g.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const Dn = g.icon || L?.[Je] || $3(Je);
  var Xn, un;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: Be,
    className: Da(le, Qe, R?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, R?.default, R?.[Je], g == null || (r = g.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": (Xn = g.richColors) != null ? Xn : H,
    "data-styled": !(g.jsx || g.unstyled || v),
    "data-mounted": Q,
    "data-promise": !!g.promise,
    "data-swiped": Re,
    "data-removed": se,
    "data-visible": wt,
    "data-y-position": tn,
    "data-x-position": Pt,
    "data-index": C,
    "data-front": Ye,
    "data-swiping": me,
    "data-dismissible": Ze,
    "data-type": Je,
    "data-invert": mi,
    "data-swipe-out": ge,
    "data-swipe-direction": D,
    "data-expanded": !!(E || G && Q),
    "data-testid": g.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": z.length - C,
      "--offset": `${se ? xe : ot.current}px`,
      "--initial-height": G ? "auto" : `${$e}px`,
      ...B,
      ...g.style
    },
    onDragEnd: () => {
      ee(!1), P(null), vn.current = null;
    },
    onPointerDown: (He) => {
      He.button !== 2 && (Ea || !Ze || (Xe.current = /* @__PURE__ */ new Date(), Ce(ot.current), He.target.setPointerCapture(He.pointerId), He.target.tagName !== "BUTTON" && (ee(!0), vn.current = {
        x: He.clientX,
        y: He.clientY
      })));
    },
    onPointerUp: () => {
      var He, vt, Ht;
      if (ge || !Ze) return;
      vn.current = null;
      const Vt = Number(((He = Be.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), mn = Number(((vt = Be.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Xe.current) == null ? void 0 : Ht.getTime()), Kt = V === "x" ? Vt : mn, ua = Math.abs(Kt) / pt;
      if (Math.abs(Kt) >= s5 || ua > 0.11) {
        Ce(ot.current), g.onDismiss == null || g.onDismiss.call(g, g), q(V === "x" ? Vt > 0 ? "right" : "left" : mn > 0 ? "down" : "up"), bn(), ze(!0);
        return;
      } else {
        var Wt, U;
        (Wt = Be.current) == null || Wt.style.setProperty("--swipe-amount-x", "0px"), (U = Be.current) == null || U.style.setProperty("--swipe-amount-y", "0px");
      }
      we(!1), ee(!1), P(null);
    },
    onPointerMove: (He) => {
      var vt, Ht, Vt;
      if (!vn.current || !Ze || ((vt = window.getSelection()) == null ? void 0 : vt.toString().length) > 0) return;
      const pt = He.clientY - vn.current.y, Kt = He.clientX - vn.current.x;
      var ua;
      const Wt = (ua = e.swipeDirections) != null ? ua : c5(re);
      !V && (Math.abs(Kt) > 1 || Math.abs(pt) > 1) && P(Math.abs(Kt) > Math.abs(pt) ? "x" : "y");
      let U = {
        x: 0,
        y: 0
      };
      const Z = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if (V === "y") {
        if (Wt.includes("top") || Wt.includes("bottom"))
          if (Wt.includes("top") && pt < 0 || Wt.includes("bottom") && pt > 0)
            U.y = pt;
          else {
            const W = pt * Z(pt);
            U.y = Math.abs(W) < Math.abs(pt) ? W : pt;
          }
      } else if (V === "x" && (Wt.includes("left") || Wt.includes("right")))
        if (Wt.includes("left") && Kt < 0 || Wt.includes("right") && Kt > 0)
          U.x = Kt;
        else {
          const W = Kt * Z(Kt);
          U.x = Math.abs(W) < Math.abs(Kt) ? W : Kt;
        }
      (Math.abs(U.x) > 0 || Math.abs(U.y) > 0) && we(!0), (Ht = Be.current) == null || Ht.style.setProperty("--swipe-amount-x", `${U.x}px`), (Vt = Be.current) == null || Vt.style.setProperty("--swipe-amount-y", `${U.y}px`);
    }
  }, It && !g.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": F,
    "data-disabled": Ea,
    "data-close-button": !0,
    onClick: Ea || !Ze ? () => {
    } : () => {
      bn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: Da(R?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (un = L?.close) != null ? un : Q3) : null, (Je || g.icon || g.promise) && g.icon !== null && (L?.[Je] !== null || g.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Da(R?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || sa() : null, g.type !== "loading" ? Dn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Da(R?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Da(R?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Da(Y, gt, R?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ ye.isValidElement(g.cancel) ? g.cancel : g.cancel && Nu(g.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (He) => {
      Nu(g.cancel) && Ze && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, He), bn());
    },
    className: Da(R?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(g.action) ? g.action : g.action && Nu(g.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (He) => {
      Nu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, He), !He.defaultPrevented && bn());
    },
    className: Da(R?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function cb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function d5(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? r5 : i5;
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
const h5 = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: v = "light", richColors: b, duration: w, style: N, visibleToasts: T = a5, toastOptions: C, dir: z = cb(), gap: E = o5, icons: O, containerAriaLabel: H = "Notifications" } = a, [k, B] = ye.useState([]), A = ye.useMemo(() => l ? k.filter((Q) => Q.toasterId === l) : k.filter((Q) => !Q.toasterId), [
    k,
    l
  ]), I = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((Q) => Q.position).map((Q) => Q.position)))), [
    A,
    u
  ]), [le, Y] = ye.useState([]), [K, re] = ye.useState(!1), [j, G] = ye.useState(!1), [R, L] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = ye.useRef(null), V = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), P = ye.useRef(null), D = ye.useRef(!1), q = ye.useCallback((Q) => {
    B((te) => {
      var se;
      return (se = te.find((he) => he.id === Q.id)) != null && se.delete || Tn.dismiss(Q.id), te.filter(({ id: he }) => he !== Q.id);
    });
  }, []);
  return ye.useEffect(() => Tn.subscribe((Q) => {
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
      ED.flushSync(() => {
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
    k
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
    k.length <= 1 && re(!1);
  }, [
    k
  ]), ye.useEffect(() => {
    const Q = (te) => {
      var se;
      if (c.every((ee) => te[ee] || te.code === ee)) {
        var me;
        re(!0), (me = F.current) == null || me.focus();
      }
      te.code === "Escape" && (document.activeElement === F.current || (se = F.current) != null && se.contains(document.activeElement)) && re(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    c
  ]), ye.useEffect(() => {
    if (F.current)
      return () => {
        P.current && (P.current.focus({
          preventScroll: !0
        }), P.current = null, D.current = !1);
      };
  }, [
    F.current
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
      dir: z === "auto" ? cb() : z,
      tabIndex: -1,
      ref: F,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": R,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${l5}px`,
        "--gap": `${E}px`,
        ...N,
        ...d5(y, g)
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
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || G(!0);
      },
      onPointerUp: () => G(!1)
    }, A.filter((ee) => !ee.position && te === 0 || ee.position === Q).map((ee, ge) => {
      var ze, Re;
      return /* @__PURE__ */ ye.createElement(f5, {
        key: ee.id,
        icons: O,
        index: ge,
        toast: ee,
        defaultRichColors: b,
        duration: (ze = C?.duration) != null ? ze : w,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: s,
        visibleToasts: T,
        closeButton: (Re = C?.closeButton) != null ? Re : p,
        interacting: j,
        position: Q,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: q,
        toasts: A.filter((we) => we.position == ee.position),
        heights: le.filter((we) => we.position == ee.position),
        setHeights: Y,
        expandByDefault: d,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Dh = "svi2-pro:trigger-render", Ah = "svi2-pro:render-state";
function m5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Dh));
}
function p5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Ah, { detail: e }));
}
function g5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Dh, e), () => window.removeEventListener(Dh, e));
}
function y5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(Ah, a), () => window.removeEventListener(Ah, a);
}
const v5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), b5 = 832 * 480, x5 = 0.85;
function Nm(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && v5.has(e);
}
function Ec(e, a) {
  return Nm(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function fb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function S5(e, a) {
  const r = [];
  (!a.hasRefImage || !e.ref_image_path) && r.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (e.prompts ?? []).some((g) => g.trim().length > 0) || r.push({
    field: "prompts",
    message: "At least one prompt is required.",
    severity: "error"
  });
  const u = e.frames_per_clip ?? 81;
  (u - 1) % 4 !== 0 && r.push({
    field: "frames_per_clip",
    message: `Frames per clip must be 4n+1 (got ${u}). Try ${u - (u - 1) % 4}.`,
    severity: "error"
  });
  const c = e.width ?? 480, d = e.height ?? 832;
  fb(c, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${c}).`,
    severity: "error"
  }), fb(d, 16) || r.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${d}).`,
    severity: "error"
  });
  const p = e.num_inference_steps ?? 50;
  (p < 1 || p > 100) && r.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const m = e.cfg_scale ?? 5;
  (m < 1 || m > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const y = e.num_clips;
  return y !== void 0 && y < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), Nm(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Ec(a.presetId, e) && y !== void 0 && y > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${y}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(c) && Number.isFinite(d) && c * d < b5 * x5 && r.push({
    field: "width",
    message: `${c}×${d} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function w5(e) {
  return e.some((a) => a.severity === "error");
}
function ES() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = yn(), d = _.useMemo(
    () => S5(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = w5(d), m = s.phase === "running", [y, g] = _.useState(null), v = _.useCallback(async () => {
    if (p) {
      const w = d.find((N) => N.severity === "error");
      w && g({ field: w.field, token: Date.now() }), br.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), br.success("Render started.");
    } catch (w) {
      const N = w instanceof sc ? w.message : "Could not start the render.";
      br.error(N);
    }
  }, [p, d, u]), b = _.useCallback(async () => {
    try {
      await c();
    } catch {
      br.error("Could not cancel the render.");
    }
  }, [c]);
  return _.useEffect(() => g5(() => void v()), [v]), _.useEffect(() => {
    p5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: v, cancel: b, focusRequest: y };
}
const E5 = 220, _5 = 80;
function N5(e) {
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
function C5(e, a) {
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
function R5(e) {
  const a = Em.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: N5(s),
      subtitle: C5(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * E5, y: _5 },
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
var T5 = "dk8hba0", M5 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, D5 = "dk8hba5", A5 = "dk8hba6", z5 = "dk8hba7", O5 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, j5 = "dk8hbac";
function L5({ data: e }) {
  const a = e, r = [T5, M5[a.state]].join(" "), l = [j5, O5[a.state]].join(" ");
  return /* @__PURE__ */ x.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ x.jsx(Rl, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ x.jsxs("div", { className: D5, children: [
      /* @__PURE__ */ x.jsx("span", { className: A5, children: a.title }),
      /* @__PURE__ */ x.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ x.jsx("span", { className: z5, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ x.jsx(Rl, { type: "source", position: Ae.Right })
  ] });
}
const H5 = { pipeline: L5 };
var B5 = "_1g4g8kk0", k5 = "_1g4g8kk1", U5 = "_1g4g8kk2", V5 = "_1g4g8kk3", q5 = "_1g4g8kk4", $5 = "_1g4g8kk5";
const Y5 = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, I5 = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function G5() {
  const { render: e, params: a, qwenEdit: r } = yn(), { busy: l, blocked: s, submit: u, cancel: c } = ES(), d = _.useMemo(
    () => R5({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = Em.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ x.jsxs("div", { className: B5, children: [
    /* @__PURE__ */ x.jsx("div", { className: k5, children: /* @__PURE__ */ x.jsx(
      P4,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: H5,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ x.jsx("div", { className: U5, children: /* @__PURE__ */ x.jsxs(
      oi,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ x.jsx("div", { className: V5, children: p.map((m) => /* @__PURE__ */ x.jsxs("div", { className: q5, children: [
            /* @__PURE__ */ x.jsx("span", { children: I5[m] }),
            /* @__PURE__ */ x.jsx($n, { tone: Y5[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ x.jsx("div", { className: $5, children: l ? /* @__PURE__ */ x.jsx(La, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ x.jsx(La, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var db = zx();
const _S = 0, NS = 1, CS = 2, hb = 3;
var mb = Object.prototype.hasOwnProperty;
function zh(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && zh(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (mb.call(e, r) && ++l && !mb.call(a, r) || !(r in a) || !zh(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const si = /* @__PURE__ */ new WeakMap(), ci = () => {
}, hn = (
  /*#__NOINLINE__*/
  ci()
), Oh = Object, nt = (e) => e === hn, ja = (e) => typeof e == "function", Zi = (e, a) => ({
  ...e,
  ...a
}), RS = (e) => ja(e.then), ah = {}, Cu = {}, Cm = "undefined", as = typeof window != Cm, jh = typeof document != Cm, X5 = as && "Deno" in window, F5 = () => as && typeof window.requestAnimationFrame != Cm, TS = (e, a) => {
  const r = si.get(e);
  return [
    // Getter
    () => !nt(a) && e.get(a) || ah,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = e.get(a);
        a in Cu || (Cu[a] = s), r[5](a, Zi(s, l), s || ah);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in Cu ? Cu[a] : !nt(a) && e.get(a) || ah
  ];
};
let Lh = !0;
const Z5 = () => Lh, [Hh, Bh] = as && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ci,
  ci
], Q5 = () => {
  const e = jh && document.visibilityState;
  return nt(e) || e !== "hidden";
}, P5 = (e) => (jh && document.addEventListener("visibilitychange", e), Hh("focus", e), () => {
  jh && document.removeEventListener("visibilitychange", e), Bh("focus", e);
}), K5 = (e) => {
  const a = () => {
    Lh = !0, e();
  }, r = () => {
    Lh = !1;
  };
  return Hh("online", a), Hh("offline", r), () => {
    Bh("online", a), Bh("offline", r);
  };
}, J5 = {
  isOnline: Z5,
  isVisible: Q5
}, W5 = {
  initFocus: P5,
  initReconnect: K5
}, pb = !ye.useId, bl = !as || X5, ez = (e) => F5() ? window.requestAnimationFrame(e) : setTimeout(e, 1), ih = bl ? _.useEffect : _.useLayoutEffect, rh = typeof navigator < "u" && navigator.connection, gb = !bl && rh && ([
  "slow-2g",
  "2g"
].includes(rh.effectiveType) || rh.saveData), Ru = /* @__PURE__ */ new WeakMap(), tz = (e) => Oh.prototype.toString.call(e), lh = (e, a) => e === `[object ${a}]`;
let nz = 0;
const kh = (e) => {
  const a = typeof e, r = tz(e), l = lh(r, "Date"), s = lh(r, "RegExp"), u = lh(r, "Object");
  let c, d;
  if (Oh(e) === e && !l && !s) {
    if (c = Ru.get(e), c) return c;
    if (c = ++nz + "~", Ru.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += kh(e[d]) + ",";
      Ru.set(e, c);
    }
    if (u) {
      c = "#";
      const p = Oh.keys(e).sort();
      for (; !nt(d = p.pop()); )
        nt(e[d]) || (c += d + ":" + kh(e[d]) + ",");
      Ru.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, Rm = (e) => {
  if (ja(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? kh(e) : "", [
    e,
    a
  ];
};
let az = 0;
const Uh = () => ++az;
async function MS(...e) {
  const [a, r, l, s] = e, u = Zi({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const m = (v) => typeof d == "function" ? d(v) : d !== !1, y = u.throwOnError;
  if (ja(r)) {
    const v = r, b = [], w = a.keys();
    for (const N of w)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(N) && v(a.get(N)._k) && b.push(N);
    return Promise.all(b.map(g));
  }
  return g(r);
  async function g(v) {
    const [b] = Rm(v);
    if (!b) return;
    const [w, N] = TS(a, b), [T, C, z, E] = si.get(a), O = () => {
      const j = T[b];
      return (ja(u.revalidate) ? u.revalidate(w().data, v) : u.revalidate !== !1) && (delete z[b], delete E[b], j && j[0]) ? j[0](CS).then(() => w().data) : w().data;
    };
    if (e.length < 3)
      return O();
    let H = l, k, B = !1;
    const A = Uh();
    C[b] = [
      A,
      0
    ];
    const I = !nt(p), le = w(), Y = le.data, K = le._c, re = nt(K) ? Y : K;
    if (I && (p = ja(p) ? p(re, Y) : p, N({
      data: p,
      _c: re
    })), ja(H))
      try {
        H = H(re);
      } catch (j) {
        k = j, B = !0;
      }
    if (H && RS(H))
      if (H = await H.catch((j) => {
        k = j, B = !0;
      }), A !== C[b][0]) {
        if (B) throw k;
        return H;
      } else B && I && m(k) && (c = !0, N({
        data: re,
        _c: hn
      }));
    if (c && !B)
      if (ja(c)) {
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
    if (C[b][1] = Uh(), Promise.resolve(O()).then(() => {
      N({
        _c: hn
      });
    }), B) {
      if (y) throw k;
      return;
    }
    return H;
  }
}
const yb = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, iz = (e, a) => {
  if (!si.has(e)) {
    const r = Zi(W5, a), l = /* @__PURE__ */ Object.create(null), s = MS.bind(hn, e);
    let u = ci;
    const c = /* @__PURE__ */ Object.create(null), d = (y, g) => {
      const v = c[y] || [];
      return c[y] = v, v.push(g), () => v.splice(v.indexOf(g), 1);
    }, p = (y, g, v) => {
      e.set(y, g);
      const b = c[y];
      if (b)
        for (const w of b)
          w(g, v);
    }, m = () => {
      if (!si.has(e) && (si.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !bl)) {
        const y = r.initFocus(setTimeout.bind(hn, yb.bind(hn, l, _S))), g = r.initReconnect(setTimeout.bind(hn, yb.bind(hn, l, NS)));
        u = () => {
          y && y(), g && g(), si.delete(e);
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
    si.get(e)[4]
  ];
}, rz = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, d, s);
}, lz = zh, [DS, oz] = iz(/* @__PURE__ */ new Map()), sz = Zi(
  {
    // events
    onLoadingSlow: ci,
    onSuccess: ci,
    onError: ci,
    onErrorRetry: rz,
    onDiscarded: ci,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: gb ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: gb ? 5e3 : 3e3,
    // providers
    compare: lz,
    isPaused: () => !1,
    cache: DS,
    mutate: oz,
    fallback: {}
  },
  // use web preset by default
  J5
), uz = (e, a) => {
  const r = Zi(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Zi(s, c));
  }
  return r;
}, cz = _.createContext({}), fz = "$inf$", AS = as && window.__SWR_DEVTOOLS_USE__, dz = AS ? window.__SWR_DEVTOOLS_USE__ : [], hz = () => {
  AS && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, mz = (e) => ja(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], pz = () => {
  const e = _.useContext(cz);
  return _.useMemo(() => Zi(sz, e), [
    e
  ]);
}, gz = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = Rm(a), [, , , d] = si.get(DS);
  if (c.startsWith(fz))
    return r(...u);
  const p = d[c];
  return nt(p) ? r(...u) : (delete d[c], p);
}), l), yz = dz.concat(gz), vz = (e) => function(...r) {
  const l = pz(), [s, u, c] = mz(r), d = uz(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(yz);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, bz = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
hz();
const oh = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), sh = {
  dedupe: !0
}, vb = Promise.resolve(hn), xz = () => ci, Sz = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: v, strictServerPrefetchWarning: b } = r, [w, N, T, C] = si.get(l), [z, E] = Rm(e), O = _.useRef(!1), H = _.useRef(!1), k = _.useRef(z), B = _.useRef(a), A = _.useRef(r), I = () => A.current, le = () => I().isVisible() && I().isOnline(), [Y, K, re, j] = TS(l, z), G = _.useRef({}).current, R = nt(c) ? nt(r.fallback) ? hn : r.fallback[z] : c, L = (Te, Xe) => {
    for (const Be in G) {
      const Ye = Be;
      if (Ye === "data") {
        if (!s(Te[Ye], Xe[Ye]) && (!nt(Te[Ye]) || !s(he, Xe[Ye])))
          return !1;
      } else if (Xe[Ye] !== Te[Ye])
        return !1;
    }
    return !0;
  }, F = !O.current, V = _.useMemo(() => {
    const Te = Y(), Xe = j(), Be = (Ze) => {
      const Qe = Zi(Ze);
      return delete Qe._k, (() => {
        if (!z || !a || I().isPaused()) return !1;
        if (F && !nt(d)) return d;
        const yt = nt(R) ? Qe.data : R;
        return nt(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Qe
      } : Qe;
    }, Ye = Be(Te), wt = Te === Xe ? Ye : Be(Xe);
    let Je = Ye;
    return [
      () => {
        const Ze = Be(Y());
        return L(Ze, Je) ? (Je.data = Ze.data, Je.isLoading = Ze.isLoading, Je.isValidating = Ze.isValidating, Je.error = Ze.error, Je) : (Je = Ze, Ze);
      },
      () => wt
    ];
  }, [
    l,
    z
  ]), P = db.useSyncExternalStore(_.useCallback(
    (Te) => re(z, (Xe, Be) => {
      L(Be, Xe) || Te();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      z
    ]
  ), V[0], V[1]), D = w[z] && w[z].length > 0, q = P.data, Q = nt(q) ? R && RS(R) ? oh(R) : R : q, te = P.error, se = _.useRef(Q), he = v ? nt(q) ? nt(se.current) ? Q : se.current : q : Q, me = z && nt(Q), ee = _.useRef(null);
  !bl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  db.useSyncExternalStore(xz, () => (ee.current = !1, ee), () => (ee.current = !0, ee));
  const ge = ee.current;
  b && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !z || !a || I().isPaused() || D && !nt(te) ? !1 : F && !nt(d) ? d : u ? nt(Q) ? !1 : p : nt(Q) || p, Re = F && ze, we = nt(P.isValidating) ? Re : P.isValidating, xe = nt(P.isLoading) ? Re : P.isLoading, Ce = _.useCallback(
    async (Te) => {
      const Xe = B.current;
      if (!z || !Xe || H.current || I().isPaused())
        return !1;
      let Be, Ye, wt = !0;
      const Je = Te || {}, Ze = !T[z] || !Je.dedupe, Qe = () => pb ? !H.current && z === k.current && O.current : z === k.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, It = () => {
        const mt = T[z];
        mt && mt[1] === Ye && delete T[z];
      }, Lt = {
        isValidating: !0
      };
      nt(Y().data) && (Lt.isLoading = !0);
      try {
        if (Ze && (K(Lt), r.loadingTimeout && nt(Y().data) && setTimeout(() => {
          wt && Qe() && I().onLoadingSlow(z, r);
        }, r.loadingTimeout), T[z] = [
          Xe(E),
          Uh()
        ]), [Be, Ye] = T[z], Be = await Be, Ze && setTimeout(It, r.dedupingInterval), !T[z] || T[z][1] !== Ye)
          return Ze && Qe() && I().onDiscarded(z), !1;
        gt.error = hn;
        const mt = N[z];
        if (!nt(mt) && // case 1
        (Ye <= mt[0] || // case 2
        Ye <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Ze && Qe() && I().onDiscarded(z), !1;
        const ot = Y().data;
        gt.data = s(ot, Be) ? ot : Be, Ze && Qe() && I().onSuccess(Be, z, r);
      } catch (mt) {
        It();
        const ot = I(), { shouldRetryOnError: Gn } = ot;
        ot.isPaused() || (gt.error = mt, Ze && Qe() && (ot.onError(mt, z, ot), (Gn === !0 || ja(Gn) && Gn(mt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || le()) && ot.onErrorRetry(mt, z, ot, (vn) => {
          const tn = w[z];
          tn && tn[0] && tn[0](hb, vn);
        }, {
          retryCount: (Je.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return wt = !1, yt(), !0;
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
  ), $e = _.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Te) => MS(l, k.current, ...Te),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ih(() => {
    B.current = a, A.current = r, nt(q) || (se.current = q);
  }), ih(() => {
    if (!z) return;
    const Te = Ce.bind(hn, sh);
    let Xe = 0;
    I().revalidateOnFocus && (Xe = Date.now() + I().focusThrottleInterval);
    const Ye = bz(z, w, (wt, Je = {}) => {
      if (wt == _S) {
        const Ze = Date.now();
        I().revalidateOnFocus && Ze > Xe && le() && (Xe = Ze + I().focusThrottleInterval, Te());
      } else if (wt == NS)
        I().revalidateOnReconnect && le() && Te();
      else {
        if (wt == CS)
          return Ce();
        if (wt == hb)
          return Ce(Je);
      }
    });
    return H.current = !1, k.current = z, O.current = !0, K({
      _k: E
    }), ze && (T[z] || (nt(Q) || bl ? Te() : ez(Te))), () => {
      H.current = !0, Ye();
    };
  }, [
    z
  ]), ih(() => {
    let Te;
    function Xe() {
      const Ye = ja(m) ? m(Y().data) : m;
      Ye && Te !== -1 && (Te = setTimeout(Be, Ye));
    }
    function Be() {
      !Y().error && (y || I().isVisible()) && (g || I().isOnline()) ? Ce(sh).then(Xe) : Xe();
    }
    return Xe(), () => {
      Te && (clearTimeout(Te), Te = -1);
    };
  }, [
    m,
    y,
    g,
    z
  ]), _.useDebugValue(he), u) {
    if (!pb && bl && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (B.current = a, A.current = r, H.current = !1);
    const Te = C[z], Xe = !nt(Te) && me ? $e(Te) : vb;
    if (oh(Xe), !nt(te) && me)
      throw te;
    const Be = me ? Ce(sh) : vb;
    !nt(he) && me && (Be.status = "fulfilled", Be.value = !0), oh(Be);
  }
  return {
    mutate: $e,
    get data() {
      return G.data = !0, he;
    },
    get error() {
      return G.error = !0, te;
    },
    get isValidating() {
      return G.isValidating = !0, we;
    },
    get isLoading() {
      return G.isLoading = !0, xe;
    }
  };
}, Vh = vz(Sz);
var wz = "_1xasopc0", Ez = "_1xasopc1", _z = "_1xasopc2", Nz = "_1xasopc3", Cz = "_1xasopc4", Rz = "_1xasopc5", Tz = "_1xasopc6", Mz = "_1xasopc7", Dz = "_1xasopc8";
function Az(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function zz(e, a, r) {
  for (const l of e) {
    if (a && !Az(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function bb({
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
  const y = _.useRef(null), g = _.useId(), v = _.useId(), [b, w] = _.useState(!1), [N, T] = _.useState(null), [C, z] = _.useState([]), E = _.useCallback(
    (Y) => {
      if (!Y || Y.length === 0) return;
      const K = Array.from(Y), re = r ? K : K.slice(0, 1), j = zz(re, e, a);
      if (j) {
        T(j);
        return;
      }
      T(null), z(re), m(re);
    },
    [e, a, r, m]
  ), O = _.useCallback(() => {
    l || y.current?.click();
  }, [l]), H = _.useCallback(
    (Y) => {
      l || (Y.key === "Enter" || Y.key === " ") && (Y.preventDefault(), O());
    },
    [l, O]
  ), k = _.useCallback(
    (Y) => {
      Y.preventDefault(), w(!1), !l && E(Y.dataTransfer.files);
    },
    [l, E]
  ), B = _.useCallback(
    (Y) => {
      Y.preventDefault(), l || w(!0);
    },
    [l]
  ), A = _.useCallback((Y) => {
    Y.preventDefault(), w(!1);
  }, []), I = [u ? v : null, N ? g : null].filter(Boolean).join(" "), le = [
    wz,
    b ? Ez : "",
    l ? _z : "",
    N !== null ? Nz : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsxs("div", { children: [
    /* @__PURE__ */ x.jsxs(
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
        onDrop: k,
        onDragOver: B,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ x.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: Cz,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: (Y) => E(Y.target.files)
            }
          ),
          /* @__PURE__ */ x.jsx("span", { className: Rz, children: s ?? (b ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ x.jsx("span", { id: v, className: Tz, children: u }),
          p && C.length > 0 && /* @__PURE__ */ x.jsx("div", { className: Dz, children: p(C) })
        ]
      }
    ),
    N && /* @__PURE__ */ x.jsx("div", { id: g, role: "alert", className: Mz, children: N })
  ] });
}
function xb(e) {
  const [a, r] = _.useState(null);
  return _.useEffect(() => {
    if (!e) {
      r(null);
      return;
    }
    const l = URL.createObjectURL(e);
    return r(l), () => URL.revokeObjectURL(l);
  }, [e]), a;
}
async function Oz(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${uc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new sc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function Sb(e) {
  const [a, r] = _.useState(null), [l, s] = _.useState(!1), [u, c] = _.useState(null), d = _.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        e(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await Oz(p);
        e(p.name, m);
      } catch (m) {
        const y = m instanceof sc ? m.message : "Upload failed. Try again.";
        c(y), e(null, null), br.error(y);
      } finally {
        s(!1);
      }
    },
    [e]
  );
  return { file: a, uploading: l, uploadError: u, pick: d };
}
var jz = "cyswg40", wb = "cyswg41", Eb = "cyswg42", _b = "cyswg43", Nb = "cyswg44", Cb = "cyswg45", Tu = "cyswg46";
const Rb = 32 * 1024 * 1024;
function Lz({
  lastImageRequired: e,
  refError: a,
  lastError: r
}) {
  const { setRefImage: l, setLastImage: s } = yn(), u = _.useCallback(
    (g, v) => l(g, v ?? ""),
    [l]
  ), c = _.useCallback(
    (g, v) => s(g, v),
    [s]
  ), d = Sb(u), p = Sb(c), m = xb(d.file), y = xb(p.file);
  return /* @__PURE__ */ x.jsxs("div", { className: jz, children: [
    /* @__PURE__ */ x.jsxs("div", { className: wb, children: [
      /* @__PURE__ */ x.jsxs("span", { className: Eb, children: [
        "Reference image ",
        /* @__PURE__ */ x.jsx($n, { tone: "accent", children: "required" })
      ] }),
      /* @__PURE__ */ x.jsx(
        bb,
        {
          accept: "image/*",
          maxSizeBytes: Rb,
          ariaLabel: "reference image upload",
          label: d.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: "Defines identity. Aspect-match to the render resolution; dims divisible by 16.",
          onFiles: (g) => void d.pick(g[0] ?? null),
          renderPreview: () => m ? /* @__PURE__ */ x.jsx("img", { className: _b, src: m, alt: "reference preview" }) : null
        }
      ),
      d.uploading && /* @__PURE__ */ x.jsx("span", { className: Cb, children: "Uploading…" }),
      !d.uploading && d.file && /* @__PURE__ */ x.jsx("span", { className: Nb, children: d.file.name }),
      d.uploadError && /* @__PURE__ */ x.jsx("span", { role: "alert", className: Tu, children: d.uploadError }),
      a && /* @__PURE__ */ x.jsx("span", { role: "alert", className: Tu, children: a })
    ] }),
    /* @__PURE__ */ x.jsxs("div", { className: wb, children: [
      /* @__PURE__ */ x.jsxs("span", { className: Eb, children: [
        "Last image",
        " ",
        e ? /* @__PURE__ */ x.jsx($n, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ x.jsx($n, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ x.jsx(
        bb,
        {
          accept: "image/*",
          maxSizeBytes: Rb,
          ariaLabel: "last image upload",
          label: p.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (g) => void p.pick(g[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ x.jsx("img", { className: _b, src: y, alt: "last preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ x.jsx("span", { className: Cb, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ x.jsx("span", { className: Nb, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ x.jsx("span", { role: "alert", className: Tu, children: p.uploadError }),
      r && /* @__PURE__ */ x.jsx("span", { role: "alert", className: Tu, children: r })
    ] })
  ] });
}
const Hz = /wan[\s._-]?2[._]2/i, Bz = /i2v/i, kz = /high/i, Uz = /low/i, Vz = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function qz(e) {
  const a = `${e.family_id} ${e.filename}`;
  return Vz.has(e.format) && e.install_path !== null && Hz.test(a) && Bz.test(a);
}
function $z(e) {
  const a = /* @__PURE__ */ new Map();
  for (const l of e) {
    if (!qz(l)) continue;
    const s = a.get(l.family_id) ?? [];
    a.set(l.family_id, [...s, l]);
  }
  const r = [];
  for (const [l, s] of a) {
    const u = s.find((d) => kz.test(d.filename)), c = s.find((d) => Uz.test(d.filename) && d !== u);
    !u?.install_path || !c?.install_path || r.push({
      familyId: l,
      label: l.replace(/^huggingface:/, ""),
      ditHighPath: u.install_path,
      ditLowPath: c.install_path
    });
  }
  return r.sort((l, s) => l.label.localeCompare(s.label));
}
const Yz = "/api/v1/model-store/installed";
async function Iz() {
  const e = await fetch(Yz, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var _c = "_1czy96m0", Nc = "_1czy96m1", zS = "_1czy96m2", OS = "_1czy96m3", jS = "_1czy96m4", Gz = "_1czy96m5", LS = "_1czy96m6", HS = "_1czy96m7", BS = "_1czy96m8", kS = "_1czy96m9", Xz = "_1czy96ma", Fz = "_1czy96mb", Zz = "_1czy96mc", Qz = "_1czy96md", Pz = "_1czy96me", Kz = "_1czy96mf", Jz = "_1czy96mg", Wz = "_1czy96mh", eO = "_1czy96mi", tO = "_1czy96mk _1czy96mj", nO = "_1czy96ml _1czy96mj", aO = "_1czy96mm", iO = "_1czy96mn", rO = "_1czy96mo", qh = "_1czy96mp", lO = "_1czy96mq";
const Tb = "__bundled__";
function oO() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = yn(), s = Vh("svi2/installed-models", Iz), u = _.useMemo(
    () => $z(s.data?.installed ?? []),
    [s.data]
  ), c = u.find((m) => m.ditHighPath === e.dit_high_path)?.familyId ?? Tb, d = _.useCallback(
    (m) => {
      const y = u.find((v) => v.familyId === m), g = y ? {
        ...a,
        baseModelFamilyId: y.familyId,
        ditHighPath: y.ditHighPath,
        ditLowPath: y.ditLowPath
      } : { ...a, baseModelFamilyId: "", ditHighPath: "", ditLowPath: "" };
      r("dit_high_path", y ? y.ditHighPath : void 0), r("dit_low_path", y ? y.ditLowPath : void 0), l(g), C1(g).catch(() => {
      });
    },
    [u, a, r, l]
  ), p = s.error !== void 0;
  return /* @__PURE__ */ x.jsxs("div", { className: _c, children: [
    /* @__PURE__ */ x.jsx("label", { className: Nc, htmlFor: "svi2-base-model", children: "Base model (Wan2.2-I2V)" }),
    /* @__PURE__ */ x.jsxs("div", { className: aO, children: [
      /* @__PURE__ */ x.jsxs(
        "select",
        {
          id: "svi2-base-model",
          className: iO,
          value: c,
          onChange: (m) => d(m.target.value),
          children: [
            /* @__PURE__ */ x.jsx("option", { value: Tb, children: TN }),
            u.map((m) => /* @__PURE__ */ x.jsx("option", { value: m.familyId, children: m.label }, m.familyId))
          ]
        }
      ),
      /* @__PURE__ */ x.jsx("span", { className: rO, "aria-hidden": "true", children: /* @__PURE__ */ x.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ x.jsx("title", { children: "open" }),
        /* @__PURE__ */ x.jsx(
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
    p && /* @__PURE__ */ x.jsx("span", { className: qh, children: "Model Foundry list unavailable — using the bundled base model." }),
    !p && u.length === 0 && /* @__PURE__ */ x.jsx("span", { className: qh, children: "No substitutable Wan2.2-I2V high/low pairs installed via Model Foundry yet." })
  ] });
}
const Cc = "custom", sO = [
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
function Tm(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of sO) {
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
function Mm(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : Cc;
}
var uO = "_14qe5430", cO = "_14qe5431", fO = "_14qe5432", dO = "_14qe5433", hO = "_14qe5434", mO = "_14qe5435", pO = "_14qe5436", gO = "_14qe5437", yO = "_14qe5438", vO = "_14qe543a _14qe5439", bO = "_14qe543b _14qe5439", xO = "_14qe543c _14qe5439";
const SO = {
  ok: cO,
  neutral: fO,
  warn: dO
}, wO = {
  ok: mO,
  neutral: pO,
  warn: gO
}, EO = {
  ok: vO,
  neutral: bO,
  warn: xO
};
function _O(e, a) {
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
function NO({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ x.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ x.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ x.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ x.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ x.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ x.jsx("title", { children: "warning" }),
    /* @__PURE__ */ x.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ x.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ x.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ x.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ x.jsx("title", { children: "info" }),
    /* @__PURE__ */ x.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ x.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ x.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function CO({
  presets: e,
  warningText: a
}) {
  const { params: r } = yn(), l = _.useMemo(() => Tm(e), [e]);
  if (l.length === 0) return null;
  const s = Mm(r, l), u = s === Cc ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = _O(u, a);
  return /* @__PURE__ */ x.jsxs(
    "output",
    {
      className: [uO, SO[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ x.jsx("span", { className: [hO, wO[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ x.jsx(NO, { tone: c.tone }) }),
        /* @__PURE__ */ x.jsx("span", { className: yO, children: c.text }),
        /* @__PURE__ */ x.jsx("span", { className: EO[c.tone], children: c.tag })
      ]
    }
  );
}
var RO = "dck790", TO = "dck791", MO = "dck792";
function nc({ title: e, detail: a, action: r, className: l }) {
  const s = [RO, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsxs("div", { className: s, children: [
    /* @__PURE__ */ x.jsx("span", { className: TO, children: e }),
    a && /* @__PURE__ */ x.jsx("span", { className: MO, children: a }),
    r
  ] });
}
var DO = "_1880igs0", AO = "_1880igs1", zO = "_1880igs2", OO = "_1880igs3", jO = "_1880igs4", LO = "_1880igs5", HO = "_1880igs6";
const BO = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function kO({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ x.jsx(
    nc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ x.jsx("div", { className: DO, children: e.map((r) => /* @__PURE__ */ x.jsxs("button", { type: "button", className: AO, onClick: () => a(r), children: [
    /* @__PURE__ */ x.jsxs("span", { className: zO, children: [
      /* @__PURE__ */ x.jsx("span", { className: OO, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ x.jsx("span", { className: jO, children: UO(r) })
    ] }),
    /* @__PURE__ */ x.jsxs("span", { className: LO, children: [
      /* @__PURE__ */ x.jsx("time", { className: HO, dateTime: r.createdAt, title: VO(r.createdAt), children: qO(r.createdAt) }),
      /* @__PURE__ */ x.jsx($n, { tone: BO[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function UO(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function VO(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function qO(e) {
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
function $O() {
  const { presetId: e, params: a } = yn();
  return Ec(e, a) ? /* @__PURE__ */ x.jsx(IO, {}) : /* @__PURE__ */ x.jsx(YO, {});
}
function US(e) {
  return [jS, e ? Gz : ""].filter(Boolean).join(" ");
}
function YO() {
  const { params: e, updateParam: a } = yn(), r = Ml(e), l = E3(e.num_clips ?? 1, r), [s, u] = _.useState(
    () => Number(yS(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    a("num_clips", vS(d, r));
  };
  return /* @__PURE__ */ x.jsxs("div", { className: _c, children: [
    /* @__PURE__ */ x.jsx("span", { className: Nc, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ x.jsxs("div", { className: zS, children: [
      /* @__PURE__ */ x.jsx("div", { className: OS, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: pS.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ x.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: US(p),
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
      /* @__PURE__ */ x.jsxs("div", { className: LS, children: [
        /* @__PURE__ */ x.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: HS,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            }
          }
        ),
        /* @__PURE__ */ x.jsx("span", { className: BS, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ x.jsx("output", { className: kS, "aria-live": "polite", children: _3(e) })
  ] });
}
function IO() {
  const { params: e, updateParam: a } = yn(), r = Ml(e), l = S3(r.fps), [s, u] = _.useState(() => Number(SS(e).toFixed(1))), c = x3.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", sb(m, r.fps));
  };
  return /* @__PURE__ */ x.jsxs("div", { className: _c, children: [
    /* @__PURE__ */ x.jsx("span", { className: Nc, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ x.jsxs("div", { className: zS, children: [
      /* @__PURE__ */ x.jsx("div", { className: OS, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = sb(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ x.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: US(m),
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
      }) : /* @__PURE__ */ x.jsxs("span", { className: jS, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ x.jsxs("div", { className: LS, children: [
        /* @__PURE__ */ x.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: HS,
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
        /* @__PURE__ */ x.jsx("span", { className: BS, children: "sec" })
      ] }),
      /* @__PURE__ */ x.jsxs("span", { className: qh, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ x.jsx("output", { className: kS, "aria-live": "polite", children: w3(e) })
  ] });
}
var GO = "_17owg2e0", XO = "_17owg2e1", FO = "_17owg2e2", Mu = "_17owg2e3", Du = "_17owg2e4", ZO = "_17owg2e5", QO = "_17owg2e6", PO = "_17owg2e7", KO = "_17owg2e8";
function uh() {
  return /* @__PURE__ */ x.jsx("span", { className: ZO, "aria-hidden": "true" });
}
function JO({ presets: e }) {
  const { presetId: a, params: r } = yn(), l = _.useMemo(() => Tm(e), [e]), s = Ml(r), u = Ec(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : gS(c, s), p = s.fps > 0 ? d / s.fps : 0, m = r.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, v = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, b = v > 0 ? v : 1, w = (r.width ?? 0) * b, N = (r.height ?? 0) * b, T = Mm(r, l), C = T === Cc || (l.find((E) => E.id === T)?.stepsDown ?? 0) >= 2, z = [PO, C ? KO : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ x.jsxs("div", { className: GO, children: [
    /* @__PURE__ */ x.jsx("span", { className: XO, children: "Output" }),
    /* @__PURE__ */ x.jsxs("div", { className: FO, children: [
      /* @__PURE__ */ x.jsxs("span", { children: [
        /* @__PURE__ */ x.jsx("span", { className: Mu, children: g }),
        " ",
        /* @__PURE__ */ x.jsx("span", { className: Du, children: "frames" })
      ] }),
      /* @__PURE__ */ x.jsx(uh, {}),
      /* @__PURE__ */ x.jsxs("span", { className: Mu, children: [
        w,
        "×",
        N
      ] }),
      /* @__PURE__ */ x.jsx(uh, {}),
      /* @__PURE__ */ x.jsxs("span", { children: [
        /* @__PURE__ */ x.jsx("span", { className: Mu, children: y }),
        " ",
        /* @__PURE__ */ x.jsx("span", { className: Du, children: "fps" })
      ] }),
      /* @__PURE__ */ x.jsx(uh, {}),
      /* @__PURE__ */ x.jsxs("span", { children: [
        /* @__PURE__ */ x.jsx("span", { className: Du, children: "~" }),
        /* @__PURE__ */ x.jsx("span", { className: Mu, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ x.jsx("span", { className: Du, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ x.jsxs("span", { className: QO, children: [
      /* @__PURE__ */ x.jsx("span", { className: z, "aria-hidden": "true" }),
      C ? "off-distribution" : "ready"
    ] })
  ] });
}
var WO = "dgx4n20", ej = "dgx4n21", tj = "dgx4n22", nj = "dgx4n23", aj = "dgx4n24", ij = "dgx4n25", rj = "dgx4n26", lj = "dgx4n27", oj = "dgx4n28", sj = "dgx4n29", uj = "dgx4n2a", Mb = "dgx4n2b", cj = "dgx4n2c", fj = "dgx4n2d";
function dj(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function hj({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = _.useState(!1), u = _.useMemo(() => A3(e), [e]), c = _.useMemo(() => {
    const v = u.legacy.filter((w) => w.id === a), b = l ? u.legacy : v;
    return [...u.featured, ...b];
  }, [u, l, a]), d = _.useRef([]), p = _.useCallback(
    (v) => {
      const b = c[v];
      b && (d.current[v]?.focus(), r(b));
    },
    [c, r]
  ), m = _.useCallback(
    (v, b) => {
      const w = c.length - 1;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowDown":
          v.preventDefault(), p(b === w ? 0 : b + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          v.preventDefault(), p(b === 0 ? w : b - 1);
          break;
        case "Home":
          v.preventDefault(), p(0);
          break;
        case "End":
          v.preventDefault(), p(w);
          break;
      }
    },
    [c, p]
  );
  if (e.length === 0)
    return /* @__PURE__ */ x.jsx(
      nc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((v) => v.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ x.jsxs("div", { className: sj, children: [
    /* @__PURE__ */ x.jsx("div", { className: WO, role: "radiogroup", "aria-label": "Render presets", children: c.map((v, b) => {
      const w = M3(v), N = v.id === a, T = v.id === Xo, C = [
        ej,
        v.legacy ? "" : tj,
        T ? nj : "",
        N ? aj : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ x.jsxs(
        "button",
        {
          ref: (z) => {
            d.current[b] = z;
          },
          type: "button",
          role: "radio",
          "aria-checked": N,
          tabIndex: b === y ? 0 : -1,
          title: v.description,
          className: C,
          onClick: () => r(v),
          onKeyDown: (z) => m(z, b),
          children: [
            /* @__PURE__ */ x.jsxs("div", { className: ij, children: [
              /* @__PURE__ */ x.jsx("span", { className: rj, children: v.label }),
              T && /* @__PURE__ */ x.jsx($n, { tone: "accent", children: "Default" })
            ] }),
            /* @__PURE__ */ x.jsx("span", { className: lj, children: dj(v.description) }),
            /* @__PURE__ */ x.jsxs("div", { className: oj, children: [
              /* @__PURE__ */ x.jsx($n, { tone: "neutral", children: w.resolution }),
              /* @__PURE__ */ x.jsx($n, { tone: "neutral", children: w.duration }),
              /* @__PURE__ */ x.jsx($n, { tone: w.isLowVram ? "success" : "neutral", children: w.vram }),
              w.isOffDistribution && /* @__PURE__ */ x.jsx($n, { tone: "warning", children: "off-distribution" }),
              w.requiresLastImage && /* @__PURE__ */ x.jsx($n, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        v.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ x.jsxs("div", { className: uj, children: [
      /* @__PURE__ */ x.jsx("span", { className: Mb, "aria-hidden": "true" }),
      /* @__PURE__ */ x.jsxs(
        "button",
        {
          type: "button",
          className: cj,
          "aria-expanded": l,
          onClick: () => s((v) => !v),
          children: [
            /* @__PURE__ */ x.jsx("span", { className: fj, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ x.jsx("span", { className: Mb, "aria-hidden": "true" })
    ] })
  ] });
}
var mj = "_1ntn2zv0", pj = "_1ntn2zv1", gj = "_1ntn2zv2", yj = "_1ntn2zv3", vj = "_1ntn2zv4", bj = "_1ntn2zv5", Db = "_1ntn2zv6", xj = "_1ntn2zv7", Sj = "_1ntn2zv8", wj = "_1ntn2zv9", Ej = "_1ntn2zva";
function _j({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = yn(), [s, u] = _.useState(!1), c = r.prompts ?? [""], d = _.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = _.useMemo(
    () => c.slice(d).filter((v) => v.trim().length > 0).length,
    [c, d]
  ), m = (v) => {
    const b = c.length > 0 ? [...c] : [""];
    b[0] = v, l(b);
  }, y = (v, b) => {
    const w = Math.max(d, c.length, v + 1), N = Array.from({ length: w }, (T, C) => c[C] ?? "");
    N[v] = b, l(N);
  }, g = (v) => {
    if (u(v), v) {
      const b = c[0] ?? "", w = Math.max(d, c.length);
      l(Array.from({ length: w }, (N, T) => c[T] ?? b));
    }
  };
  return /* @__PURE__ */ x.jsxs("div", { className: mj, children: [
    /* @__PURE__ */ x.jsx("div", { className: pj, children: /* @__PURE__ */ x.jsxs("span", { className: gj, children: [
      /* @__PURE__ */ x.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: yj,
          onClick: () => g(!s),
          children: /* @__PURE__ */ x.jsx("span", { className: vj, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (v, b) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ x.jsxs("div", { className: xj, children: [
        /* @__PURE__ */ x.jsxs("span", { className: Sj, children: [
          "Clip ",
          b + 1
        ] }),
        /* @__PURE__ */ x.jsx(
          "textarea",
          {
            id: b === 0 ? a : void 0,
            className: Db,
            "aria-label": `prompt for clip ${b + 1}`,
            "aria-invalid": b === 0 && e !== void 0 ? !0 : void 0,
            value: c[b] ?? "",
            onChange: (w) => y(b, w.target.value)
          }
        )
      ] }, `clip-${b}`)
    )) : /* @__PURE__ */ x.jsx(
      "textarea",
      {
        id: a,
        className: Db,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (v) => m(v.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ x.jsxs("output", { className: bj, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ x.jsx("p", { className: wj, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ x.jsx("span", { role: "alert", className: Ej, children: e })
  ] });
}
var Nj = "_1itrxk30", Cj = "_1itrxk31", Rj = "_1itrxk32", Tj = "_1itrxk33", Mj = "_1itrxk34", Dj = "_1itrxk35", Aj = "_1itrxk36", zj = "_1itrxk37";
function Oj() {
  const { qwenEdit: e, setQwenEdit: a } = yn();
  return /* @__PURE__ */ x.jsxs("div", { className: Nj, children: [
    /* @__PURE__ */ x.jsxs("div", { className: Cj, children: [
      /* @__PURE__ */ x.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: Aj,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ x.jsx("span", { className: zj, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ x.jsxs("span", { className: Rj, children: [
        /* @__PURE__ */ x.jsx("span", { className: Tj, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ x.jsx("span", { className: Mj, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ x.jsx(
      "textarea",
      {
        className: Dj,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var jj = "ob7g5b0", Lj = "ob7g5b1", Hj = "ob7g5b3", Bj = "ob7g5b4", kj = "ob7g5b5", Uj = "ob7g5b6", Vj = "ob7g5b7", qj = "ob7g5b8", $j = "ob7g5b9", Yj = "ob7g5ba";
function Ij({
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
  onError: v
}) {
  const [b, w] = _.useState("loading"), [N, T] = _.useState(null), C = _.useCallback(() => {
    w("ready"), g?.();
  }, [g]), z = _.useCallback(
    (O) => {
      const H = O.target, k = H.error?.message || `media error code ${H.error?.code ?? "?"}`;
      w("error"), T(k), v?.(new Error(k));
    },
    [v]
  ), E = [jj, p].filter(Boolean).join(" ");
  return e ? b === "error" ? /* @__PURE__ */ x.jsx("div", { className: E, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ x.jsxs("div", { className: Vj, children: [
    /* @__PURE__ */ x.jsx("div", { className: qj, children: "Could not play video" }),
    /* @__PURE__ */ x.jsx("div", { className: $j, children: N ?? "unknown error" }),
    /* @__PURE__ */ x.jsx("a", { className: Yj, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ x.jsxs("div", { className: E, children: [
    b === "loading" && /* @__PURE__ */ x.jsx("div", { className: Hj, "aria-hidden": "true", children: /* @__PURE__ */ x.jsx("div", { className: Bj }) }),
    r && /* @__PURE__ */ x.jsx("span", { className: kj, children: r }),
    /* @__PURE__ */ x.jsx(
      "video",
      {
        className: Lj,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: C,
        onEnded: y,
        onError: z,
        children: /* @__PURE__ */ x.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ x.jsx("div", { className: E, "aria-label": d ?? "no video", children: /* @__PURE__ */ x.jsx("div", { className: Uj, children: m ?? "No video to display yet." }) });
}
const li = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, Ab = {
  [li.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [li.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [li.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [li.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [li.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [li.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [li.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [li.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [li.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function Gj(e, a) {
  return e !== null && Ab[e] ? Ab[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function Xj(e) {
  return e ? `${uc}/media?path=${encodeURIComponent(e)}` : null;
}
var Au = "_1ojc56g0", Fj = "_1ojc56g1", Zj = "_1ojc56g2", Qj = "_1ojc56g3", Pj = "_1ojc56g4", Kj = "_1ojc56g5", Jj = "_1ojc56g6", Wj = "_1ojc56g7", e6 = "_1ojc56g8", zu = "_1ojc56g9", t6 = "_1ojc56ga", n6 = "_1ojc56gb", a6 = "_1ojc56gc", i6 = "_1ojc56gd", r6 = "_1ojc56ge", l6 = "_1ojc56gf", o6 = "_1ojc56gg", s6 = "_1ojc56gh", u6 = "_51y2ql0", c6 = "_51y2ql1", f6 = "_51y2ql2", d6 = "_51y2ql3", h6 = "_51y2ql4", m6 = "_51y2ql5", p6 = "_51y2ql6 _51y2ql5", g6 = "_51y2ql7 _51y2ql5", y6 = "_51y2ql8", v6 = "_51y2ql9", b6 = "_51y2qla", x6 = "_51y2qlb", S6 = "_51y2qlc";
const na = 60, za = 62, Vn = 46, w6 = 180, E6 = 0.7, _6 = [0, 0.25, 0.5, 0.75, 1];
function N6(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: na + r * (Vn - 9),
    y1: za - l * (Vn - 9),
    x2: na + r * (Vn - 14),
    y2: za - l * (Vn - 14)
  };
}
function C6(e, a) {
  const r = 1 / e, l = a.maxSpeed - a.minSpeed;
  return l < 1e-6 ? E6 : Math.min(1, Math.max(0.04, (r - a.minSpeed) / l));
}
function R6(e) {
  return e >= 0.55 ? m6 : e >= 0.25 ? p6 : g6;
}
function T6({ secondsPerStep: e, jobId: a }) {
  const r = _.useRef({
    jobId: a,
    minSpeed: Number.POSITIVE_INFINITY,
    maxSpeed: Number.NEGATIVE_INFINITY
  });
  _.useEffect(() => {
    if (r.current.jobId !== a && (r.current = {
      jobId: a,
      minSpeed: Number.POSITIVE_INFINITY,
      maxSpeed: Number.NEGATIVE_INFINITY
    }), e !== null && e > 0) {
      const d = 1 / e;
      r.current.minSpeed = Math.min(r.current.minSpeed, d), r.current.maxSpeed = Math.max(r.current.maxSpeed, d);
    }
  }, [e, a]);
  const l = e !== null && e > 0, s = l ? C6(e, r.current) : 0, u = w6 * s, c = l ? e.toFixed(1) : "—";
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: u6,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": 0,
      "aria-valuemax": 1,
      "aria-valuenow": Number(s.toFixed(2)),
      "aria-valuetext": l ? `${c} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ x.jsx("span", { className: c6, children: "Speed" }),
        /* @__PURE__ */ x.jsxs("svg", { className: f6, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ x.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ x.jsx(
            "path",
            {
              className: d6,
              d: `M ${na - Vn} ${za} A ${Vn} ${Vn} 0 0 1 ${na + Vn} ${za}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          _6.map((d) => {
            const p = N6(d);
            return /* @__PURE__ */ x.jsx(
              "line",
              {
                className: h6,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          l && /* @__PURE__ */ x.jsx(
            "path",
            {
              className: R6(s),
              d: `M ${na - Vn} ${za} A ${Vn} ${Vn} 0 0 1 ${na + Vn} ${za}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, s * 100)} 100`
            }
          ),
          /* @__PURE__ */ x.jsx(
            "g",
            {
              className: y6,
              style: {
                transform: `rotate(${l ? u : 0}deg)`,
                transformOrigin: `${na}px ${za}px`
              },
              children: /* @__PURE__ */ x.jsx(
                "line",
                {
                  className: v6,
                  strokeWidth: 2.4,
                  x1: na,
                  y1: za,
                  x2: na - Vn + 16,
                  y2: za
                }
              )
            }
          ),
          /* @__PURE__ */ x.jsx("circle", { className: b6, cx: na, cy: za, r: 3.6 }),
          /* @__PURE__ */ x.jsx("text", { className: x6, x: na, y: 44, fontSize: 15, textAnchor: "middle", children: c }),
          /* @__PURE__ */ x.jsx("text", { className: S6, x: na, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] })
      ]
    }
  );
}
function M6({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = _.useState(!1);
  _.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = _.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ x.jsx(
      nc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = Gj(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ x.jsxs("div", { className: Au, children: [
      /* @__PURE__ */ x.jsxs("div", { className: l6, role: "alert", children: [
        /* @__PURE__ */ x.jsx("span", { className: o6, children: m.title }),
        /* @__PURE__ */ x.jsx("span", { className: s6, children: m.hint })
      ] }),
      /* @__PURE__ */ x.jsx("div", { className: zu, children: /* @__PURE__ */ x.jsx(La, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ x.jsxs("div", { className: Au, children: [
      /* @__PURE__ */ x.jsx(nc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ x.jsx("div", { className: zu, children: /* @__PURE__ */ x.jsx(La, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ x.jsxs("output", { className: Au, children: [
      /* @__PURE__ */ x.jsx(
        Ij,
        {
          src: Xj(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ x.jsx(O6, { state: e }),
      /* @__PURE__ */ x.jsx("div", { className: zu, children: /* @__PURE__ */ x.jsx(La, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ x.jsxs("div", { className: Au, children: [
    /* @__PURE__ */ x.jsx("output", { className: Fj, "aria-live": "polite", children: z6(e) }),
    /* @__PURE__ */ x.jsx(
      "div",
      {
        className: Wj,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ x.jsx(
          "div",
          {
            className: e6,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ x.jsx("output", { className: r6, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ x.jsxs("div", { className: Zj, "aria-live": "polite", children: [
      /* @__PURE__ */ x.jsx(T6, { secondsPerStep: e.secondsPerStep, jobId: e.jobId }),
      /* @__PURE__ */ x.jsxs("div", { className: Qj, children: [
        /* @__PURE__ */ x.jsx(Ro, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ x.jsx(
          Ro,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ x.jsx(
          Ro,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ x.jsx(Ro, { label: "ETA", value: D6(m3(e)) }),
        /* @__PURE__ */ x.jsx(
          Ro,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ x.jsx("div", { className: zu, children: /* @__PURE__ */ x.jsx(La, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function D6(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const A6 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading Wan2.2 diffusion experts (~28 GiB)…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function z6(e) {
  if (!e.stage) return "Starting worker…";
  const a = A6[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function Ro({ label: e, value: a }) {
  return /* @__PURE__ */ x.jsxs("div", { className: Pj, children: [
    /* @__PURE__ */ x.jsx("span", { className: Kj, children: e }),
    /* @__PURE__ */ x.jsx("span", { className: Jj, children: a })
  ] });
}
function O6({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ x.jsx("div", { className: t6, children: r.map(([l, s]) => /* @__PURE__ */ x.jsxs("div", { className: n6, children: [
    /* @__PURE__ */ x.jsx("span", { className: a6, children: l }),
    /* @__PURE__ */ x.jsx("span", { className: i6, children: s })
  ] }, l)) });
}
function j6() {
  return /* @__PURE__ */ x.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ x.jsx("title", { children: "selected" }),
    /* @__PURE__ */ x.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ x.jsx(
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
function L6({ presets: e }) {
  const { params: a, updateParam: r } = yn(), l = _.useMemo(() => Tm(e), [e]);
  if (l.length === 0) return null;
  const s = Mm(a, l);
  return /* @__PURE__ */ x.jsxs("div", { className: _c, children: [
    /* @__PURE__ */ x.jsx("span", { className: Nc, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ x.jsx("div", { className: Xz, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: l.map((u) => {
      const c = s === u.id, d = [Fz, c ? Zz : ""].filter(Boolean).join(" "), p = [Kz, c ? Jz : ""].filter(Boolean).join(" ");
      return /* @__PURE__ */ x.jsxs(
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
            /* @__PURE__ */ x.jsxs("span", { className: Qz, children: [
              /* @__PURE__ */ x.jsxs("span", { className: Pz, children: [
                u.width,
                "×",
                u.height
              ] }),
              /* @__PURE__ */ x.jsx("span", { className: p, children: /* @__PURE__ */ x.jsx(j6, {}) })
            ] }),
            /* @__PURE__ */ x.jsx("span", { className: Wz, children: u.label }),
            /* @__PURE__ */ x.jsx("span", { className: eO, children: u.sub }),
            u.stepsDown > 0 && /* @__PURE__ */ x.jsx(
              "span",
              {
                className: u.stepsDown >= 2 ? nO : tO,
                children: u.stepsDown >= 2 ? "off-distribution" : "below native"
              }
            )
          ]
        },
        u.id
      );
    }) }),
    s === Cc && /* @__PURE__ */ x.jsx("div", { className: lO, children: /* @__PURE__ */ x.jsxs($n, { tone: "warning", children: [
      "custom ",
      a.width,
      "×",
      a.height
    ] }) })
  ] });
}
var H6 = "_1hbttwg0", B6 = "_1hbttwg1", k6 = "_1hbttwg2", U6 = "_1hbttwg3", VS = "_1hbttwg4", V6 = "_1hbttwg5", q6 = "_1hbttwg7 _1hbttwg6", $6 = "_1hbttwg8 _1hbttwg6", zb = "_1hbttwg9", Y6 = "_1hbttwga", I6 = "_1hbttwgb", G6 = "_1hbttwgc", X6 = "_1hbttwgd";
function F6({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = _.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ x.jsxs("div", { className: H6, title: s ? u : void 0, children: [
    /* @__PURE__ */ x.jsxs("div", { className: B6, children: [
      /* @__PURE__ */ x.jsx("label", { className: k6, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ x.jsx("span", { className: U6, children: Q6(a, e.step) })
    ] }),
    Z6(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ x.jsx("span", { id: d, className: VS, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ x.jsx("span", { id: `${c}-error`, role: "alert", className: V6, children: r })
  ] });
}
function Z6(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ x.jsxs("div", { className: I6, children: [
        /* @__PURE__ */ x.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: G6,
            onClick: () => r(!d),
            children: /* @__PURE__ */ x.jsx("span", { className: X6, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ x.jsx("span", { className: VS, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ x.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [$6, u ? zb : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ x.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = Ob(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ x.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: Y6,
          style: g,
          min: e.min,
          max: e.max,
          step: e.step,
          value: d,
          onChange: (v) => r(Number(v.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ x.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [q6, u ? zb : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: Ob(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function Ob(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function Q6(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var P6 = "_1f0q5gf0", K6 = "_1f0q5gf1", J6 = "_1f0q5gf2", W6 = "_1f0q5gf3", eL = "_1f0q5gf4", tL = "_1f0q5gf5", nL = "_1f0q5gf6", aL = "_1f0q5gf7", iL = "_1f0q5gf8", rL = "_1f0q5gf9", lL = "_1f0q5gfa", oL = "_1f0q5gfb", sL = "_1f0q5gfc";
function uL({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = _.useId(), [m, y] = _.useState(u ? s : !1), g = [P6, c].filter(Boolean).join(" "), v = [J6, m ? W6 : ""].filter(Boolean).join(" "), b = !u || !m;
  return /* @__PURE__ */ x.jsxs("section", { className: g, children: [
    /* @__PURE__ */ x.jsxs(
      "button",
      {
        type: "button",
        className: K6,
        "aria-expanded": b,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && y((w) => !w),
        children: [
          u && /* @__PURE__ */ x.jsx("span", { className: v, "aria-hidden": "true", children: /* @__PURE__ */ x.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ x.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ x.jsx(
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
          /* @__PURE__ */ x.jsxs("span", { className: eL, children: [
            /* @__PURE__ */ x.jsx("span", { className: tL, children: e }),
            a && /* @__PURE__ */ x.jsx("span", { className: nL, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ x.jsxs("span", { className: aL, children: [
            l && /* @__PURE__ */ x.jsx("span", { className: iL, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ x.jsx(
      "div",
      {
        id: p,
        className: [rL, b ? lL : ""].filter(Boolean).join(" "),
        inert: !b || void 0,
        children: /* @__PURE__ */ x.jsx("div", { className: oL, children: /* @__PURE__ */ x.jsx("div", { className: sL, children: d }) })
      }
    )
  ] });
}
const cL = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function jb(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function fL(e) {
  return wc.find((a) => a.key === e)?.default;
}
function ul(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = fL(a);
  return typeof l == "number" ? l : 0;
}
function dL(e, a) {
  if (e === "core") {
    const r = ul(a, "fps"), l = ul(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = cL[u] ?? u, d = ul(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = ul(a, "num_inference_steps"), l = ul(a, "cfg_scale"), s = ul(a, "sigma_shift");
    return `${r} steps · CFG ${jb(l)} · shift ${jb(s)}`;
  }
  return null;
}
var hL = "kn07ek0", mL = "kn07ek1";
const pL = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function gL({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = yn(), s = Ec(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ x.jsx("div", { className: hL, children: mS.map((c) => {
    const d = g3(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ x.jsx(
      uL,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: dL(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ x.jsx($n, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ x.jsx("div", { className: mL, children: d.map((p) => {
          const m = s ? pL[p.key] : void 0;
          return /* @__PURE__ */ x.jsx(
            F6,
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
        }) })
      },
      c.id
    );
  }) });
}
var yL = "_1w9jfpf0", vL = "_1w9jfpf1", bL = "_1w9jfpf2", xL = "_1w9jfpf3", SL = "_1w9jfpf4", wL = "_1w9jfpf5";
const $h = "svi2-anchor-panel", qS = "svi2-prompt-input";
function EL() {
  const { presetId: e, presetApplied: a, params: r, render: l, applyPresetById: s, resetRender: u, showJobResult: c } = yn(), { issues: d, blocked: p, busy: m, submit: y, cancel: g, focusRequest: v } = ES();
  NL(v);
  const b = Vh("svi2/presets", N1), w = Vh("svi2/history", () => z3(25)), N = b.data?.presets ?? [];
  _.useEffect(() => {
    if (a || N.length === 0) return;
    const B = N.find((A) => A.id === e) ?? N[0];
    B && s(B);
  }, [a, N, e, s]);
  const T = w.data?.jobs ?? [], C = Nm(e, r), z = d.find((B) => B.field === "ref_image_path")?.message, E = d.find((B) => B.field === "last_image_path")?.message, O = d.find((B) => B.field === "prompts")?.message, H = d.find(
    (B) => B.field === "width" && B.severity === "warning"
  )?.message, k = _.useCallback(
    (B) => {
      c(B);
    },
    [c]
  );
  return /* @__PURE__ */ x.jsxs("div", { className: yL, children: [
    /* @__PURE__ */ x.jsxs("div", { className: vL, children: [
      /* @__PURE__ */ x.jsx(
        oi,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ x.jsx(hj, { presets: N, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ x.jsx("div", { id: $h, children: /* @__PURE__ */ x.jsx(
        oi,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ x.jsx(
            Lz,
            {
              lastImageRequired: C,
              refError: z,
              lastError: E
            }
          )
        }
      ) }),
      /* @__PURE__ */ x.jsx(oi, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ x.jsx(_j, { error: O, textareaId: qS }) }),
      /* @__PURE__ */ x.jsx(oi, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ x.jsx(Oj, {}) }),
      /* @__PURE__ */ x.jsxs(
        oi,
        {
          title: /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
            /* @__PURE__ */ x.jsx("span", { className: SL, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ x.jsx(
            La,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const B = N.find((A) => A.id === e);
                B && s(B);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ x.jsx(CO, { presets: N, warningText: H }),
            /* @__PURE__ */ x.jsxs("div", { className: wL, children: [
              /* @__PURE__ */ x.jsx($O, {}),
              /* @__PURE__ */ x.jsx(L6, { presets: N }),
              /* @__PURE__ */ x.jsx(oO, {})
            ] }),
            /* @__PURE__ */ x.jsx(gL, { issues: d }),
            /* @__PURE__ */ x.jsx(JO, { presets: N })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ x.jsxs("div", { className: bL, children: [
      /* @__PURE__ */ x.jsxs(
        oi,
        {
          title: "Render",
          description: m ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ x.jsx(M6, { state: l, onCancel: g, onReset: u }),
            !m && /* @__PURE__ */ x.jsx("div", { className: xL, children: /* @__PURE__ */ x.jsx(
              La,
              {
                variant: "primary",
                disabled: p,
                title: p ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void y(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ x.jsx(oi, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ x.jsx(kO, { jobs: T, onOpen: k }) })
    ] })
  ] });
}
const _L = {
  ref_image_path: $h,
  last_image_path: $h,
  prompts: qS
};
function NL(e) {
  _.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = _L[e.field];
    if (a) {
      const l = document.getElementById(a);
      Lb(l);
      return;
    }
    CL(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      Lb(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function CL(e) {
  const a = wc.find((s) => s.key === e);
  if (!a) return;
  const r = mS.find((s) => s.id === a.tier);
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
function Lb(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var RL = "_1smvon90", dr = "_1smvon91", hr = "_1smvon92", mr = "_1smvon93", Ou = "_1smvon94", ch = "_1smvon95 _1smvon94", TL = "_1smvon96", ML = "_1smvon97";
const DL = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function AL() {
  const { settings: e, setSettings: a } = yn(), [r, l] = _.useState(e), [s, u] = _.useState(!1), c = _.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== e[m]
    ),
    [r, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await C1(r);
      a(m), l(m), br.success("Settings saved. Applied to new renders.");
    } catch {
      br.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ x.jsxs(
    oi,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ x.jsxs("div", { className: RL, children: [
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "Models directory" }),
            /* @__PURE__ */ x.jsx(
              "input",
              {
                className: Ou,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "Output directory" }),
            /* @__PURE__ */ x.jsx(
              "input",
              {
                className: Ou,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ x.jsx(
              "select",
              {
                className: ch,
                value: r.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: CN.map((m) => /* @__PURE__ */ x.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ x.jsx(
              "select",
              {
                className: ch,
                value: r.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: RN.map((m) => /* @__PURE__ */ x.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "Blocks to swap" }),
            /* @__PURE__ */ x.jsx(
              "input",
              {
                className: Ou,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "Interpolation method" }),
            /* @__PURE__ */ x.jsx(
              "select",
              {
                className: ch,
                value: r.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: DL.map((m) => /* @__PURE__ */ x.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ x.jsx("span", { className: hr, children: "Interpolate target fps" }),
            /* @__PURE__ */ x.jsx(
              "input",
              {
                className: Ou,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ x.jsx("span", { className: mr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ x.jsxs("div", { className: TL, children: [
          /* @__PURE__ */ x.jsx(La, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ x.jsx(
            La,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ x.jsx("output", { className: ML, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var zL = "_1ugwva20", OL = "_1ugwva21", jL = "_1ugwva22", LL = "_1ugwva23", HL = "_1ugwva24", BL = "_1ugwva25";
function kL() {
  const e = O2(), a = UL(e.catalog?.presets ?? []);
  return /* @__PURE__ */ x.jsxs(V3, { initialSettings: e.settings, initialPreset: a, children: [
    /* @__PURE__ */ x.jsxs("div", { className: zL, children: [
      /* @__PURE__ */ x.jsx("header", { className: OL, children: /* @__PURE__ */ x.jsxs("div", { className: jL, children: [
        /* @__PURE__ */ x.jsx("h1", { className: LL, children: "SVI 2.0 Pro" }),
        /* @__PURE__ */ x.jsx("p", { className: HL, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
      ] }) }),
      /* @__PURE__ */ x.jsx("main", { className: BL, children: /* @__PURE__ */ x.jsx(X2, {}) })
    ] }),
    /* @__PURE__ */ x.jsx(h5, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function UL(e) {
  return e.find((a) => a.id === Xo) ?? e[0] ?? null;
}
async function VL() {
  const [e, a] = await Promise.all([
    N1().catch(() => null),
    DN().catch(() => _1)
  ]);
  return { catalog: e, settings: a };
}
function qL() {
  return [
    {
      path: "/",
      loader: () => Cy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: VL,
      Component: kL,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => Cy(`/${$L(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: EL },
        { path: "dag", Component: G5 },
        { path: "settings", Component: AL }
      ]
    }
  ];
}
function $L(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const Hb = "ext-actions-request", YL = "ext-actions-declare", IL = "ext-action-state", Bb = "ext-action-invoke", kb = "svi2-pro:navigate", Ub = "svi2-pro.render";
function GL(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: Ub,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(YL, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(IL, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === Ub && m5();
  }, y = y5((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(Hb, p), e.addEventListener(Bb, m), c(), {
    dispose: () => {
      y(), e.removeEventListener(Hb, p), e.removeEventListener(Bb, m);
    }
  };
}
const Yh = "svi2-pro-app", XL = "ext-event", Vb = "svi2-pro-stylesheet", qb = ["accent", "density", "card"];
function FL(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function ZL() {
  if (typeof document > "u" || document.getElementById(Vb)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = Vb, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
ZL();
class QL extends HTMLElement {
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
    this.root = a_.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(kb, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = GL(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(kb, a);
  }
  syncTweaksFromBody() {
    for (const a of qb) {
      const r = FL(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
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
    const a = this.resolveInitialEntry(), r = q2(qL(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ x.jsx(_.StrictMode, { children: /* @__PURE__ */ x.jsx(Y2, { router: r }) })
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
      new CustomEvent(XL, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function PL() {
  typeof customElements > "u" || customElements.get(Yh) || customElements.define(Yh, QL);
}
typeof customElements < "u" && !customElements.get(Yh) && PL();
export {
  PL as register
};
//# sourceMappingURL=svi2-pro.js.map
