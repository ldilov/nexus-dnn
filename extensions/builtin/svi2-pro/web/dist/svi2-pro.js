function iE(t, a) {
  for (var r = 0; r < a.length; r++) {
    const o = a[r];
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
function Th(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var bd = { exports: {} }, po = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var I0;
function rE() {
  if (I0) return po;
  I0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(o, s, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), s.key !== void 0 && (c = "" + s.key), "key" in s) {
      u = {};
      for (var h in s)
        h !== "key" && (u[h] = s[h]);
    } else u = s;
    return s = u.ref, {
      $$typeof: t,
      type: o,
      key: c,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return po.Fragment = a, po.jsx = r, po.jsxs = r, po;
}
var Z0;
function lE() {
  return Z0 || (Z0 = 1, bd.exports = rE()), bd.exports;
}
var w = lE(), xd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Q0;
function oE() {
  if (Q0) return Ve;
  Q0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), v = Symbol.iterator;
  function x(A) {
    return A === null || typeof A != "object" ? null : (A = v && A[v] || A["@@iterator"], typeof A == "function" ? A : null);
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
  }, T = Object.assign, N = {};
  function R(A, k, F) {
    this.props = A, this.context = k, this.refs = N, this.updater = F || S;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(A, k) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, k, "setState");
  }, R.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function z() {
  }
  z.prototype = R.prototype;
  function E(A, k, F) {
    this.props = A, this.context = k, this.refs = N, this.updater = F || S;
  }
  var j = E.prototype = new z();
  j.constructor = E, T(j, R.prototype), j.isPureReactComponent = !0;
  var U = Array.isArray;
  function H() {
  }
  var V = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function q(A, k, F) {
    var te = F.ref;
    return {
      $$typeof: t,
      type: A,
      key: k,
      ref: te !== void 0 ? te : null,
      props: F
    };
  }
  function le(A, k) {
    return q(A.type, k, A.props);
  }
  function I(A) {
    return typeof A == "object" && A !== null && A.$$typeof === t;
  }
  function K(A) {
    var k = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(F) {
      return k[F];
    });
  }
  var W = /\/+/g;
  function O(A, k) {
    return typeof A == "object" && A !== null && A.key != null ? K("" + A.key) : k.toString(36);
  }
  function $(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(H, H) : (A.status = "pending", A.then(
          function(k) {
            A.status === "pending" && (A.status = "fulfilled", A.value = k);
          },
          function(k) {
            A.status === "pending" && (A.status = "rejected", A.reason = k);
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
  function _(A, k, F, te, se) {
    var he = typeof A;
    (he === "undefined" || he === "boolean") && (A = null);
    var me = !1;
    if (A === null) me = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          me = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case t:
            case a:
              me = !0;
              break;
            case y:
              return me = A._init, _(
                me(A._payload),
                k,
                F,
                te,
                se
              );
          }
      }
    if (me)
      return se = se(A), me = te === "" ? "." + O(A, 0) : te, U(se) ? (F = "", me != null && (F = me.replace(W, "$&/") + "/"), _(se, k, F, "", function(ze) {
        return ze;
      })) : se != null && (I(se) && (se = le(
        se,
        F + (se.key == null || A && A.key === se.key ? "" : ("" + se.key).replace(
          W,
          "$&/"
        ) + "/") + me
      )), k.push(se)), 1;
    me = 0;
    var ee = te === "" ? "." : te + ":";
    if (U(A))
      for (var ge = 0; ge < A.length; ge++)
        te = A[ge], he = ee + O(te, ge), me += _(
          te,
          k,
          F,
          he,
          se
        );
    else if (ge = x(A), typeof ge == "function")
      for (A = ge.call(A), ge = 0; !(te = A.next()).done; )
        te = te.value, he = ee + O(te, ge++), me += _(
          te,
          k,
          F,
          he,
          se
        );
    else if (he === "object") {
      if (typeof A.then == "function")
        return _(
          $(A),
          k,
          F,
          te,
          se
        );
      throw k = String(A), Error(
        "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return me;
  }
  function L(A, k, F) {
    if (A == null) return A;
    var te = [], se = 0;
    return _(A, te, "", "", function(he) {
      return k.call(F, he, se++);
    }), te;
  }
  function Z(A) {
    if (A._status === -1) {
      var k = A._result;
      k = k(), k.then(
        function(F) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = F);
        },
        function(F) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = F);
        }
      ), A._status === -1 && (A._status = 0, A._result = k);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var G = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var k = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(k)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, ne = {
    map: L,
    forEach: function(A, k, F) {
      L(
        A,
        function() {
          k.apply(this, arguments);
        },
        F
      );
    },
    count: function(A) {
      var k = 0;
      return L(A, function() {
        k++;
      }), k;
    },
    toArray: function(A) {
      return L(A, function(k) {
        return k;
      }) || [];
    },
    only: function(A) {
      if (!I(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Ve.Activity = m, Ve.Children = ne, Ve.Component = R, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = o, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return V.H.useMemoCache(A);
    }
  }, Ve.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ve.cacheSignal = function() {
    return null;
  }, Ve.cloneElement = function(A, k, F) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var te = T({}, A.props), se = A.key;
    if (k != null)
      for (he in k.key !== void 0 && (se = "" + k.key), k)
        !D.call(k, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && k.ref === void 0 || (te[he] = k[he]);
    var he = arguments.length - 2;
    if (he === 1) te.children = F;
    else if (1 < he) {
      for (var me = Array(he), ee = 0; ee < he; ee++)
        me[ee] = arguments[ee + 2];
      te.children = me;
    }
    return q(A.type, se, te);
  }, Ve.createContext = function(A) {
    return A = {
      $$typeof: c,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: u,
      _context: A
    }, A;
  }, Ve.createElement = function(A, k, F) {
    var te, se = {}, he = null;
    if (k != null)
      for (te in k.key !== void 0 && (he = "" + k.key), k)
        D.call(k, te) && te !== "key" && te !== "__self" && te !== "__source" && (se[te] = k[te]);
    var me = arguments.length - 2;
    if (me === 1) se.children = F;
    else if (1 < me) {
      for (var ee = Array(me), ge = 0; ge < me; ge++)
        ee[ge] = arguments[ge + 2];
      se.children = ee;
    }
    if (A && A.defaultProps)
      for (te in me = A.defaultProps, me)
        se[te] === void 0 && (se[te] = me[te]);
    return q(A, he, se);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Ve.isValidElement = I, Ve.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: Z
    };
  }, Ve.memo = function(A, k) {
    return {
      $$typeof: g,
      type: A,
      compare: k === void 0 ? null : k
    };
  }, Ve.startTransition = function(A) {
    var k = V.T, F = {};
    V.T = F;
    try {
      var te = A(), se = V.S;
      se !== null && se(F, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(H, G);
    } catch (he) {
      G(he);
    } finally {
      k !== null && F.types !== null && (k.types = F.types), V.T = k;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ve.use = function(A) {
    return V.H.use(A);
  }, Ve.useActionState = function(A, k, F) {
    return V.H.useActionState(A, k, F);
  }, Ve.useCallback = function(A, k) {
    return V.H.useCallback(A, k);
  }, Ve.useContext = function(A) {
    return V.H.useContext(A);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(A, k) {
    return V.H.useDeferredValue(A, k);
  }, Ve.useEffect = function(A, k) {
    return V.H.useEffect(A, k);
  }, Ve.useEffectEvent = function(A) {
    return V.H.useEffectEvent(A);
  }, Ve.useId = function() {
    return V.H.useId();
  }, Ve.useImperativeHandle = function(A, k, F) {
    return V.H.useImperativeHandle(A, k, F);
  }, Ve.useInsertionEffect = function(A, k) {
    return V.H.useInsertionEffect(A, k);
  }, Ve.useLayoutEffect = function(A, k) {
    return V.H.useLayoutEffect(A, k);
  }, Ve.useMemo = function(A, k) {
    return V.H.useMemo(A, k);
  }, Ve.useOptimistic = function(A, k) {
    return V.H.useOptimistic(A, k);
  }, Ve.useReducer = function(A, k, F) {
    return V.H.useReducer(A, k, F);
  }, Ve.useRef = function(A) {
    return V.H.useRef(A);
  }, Ve.useState = function(A) {
    return V.H.useState(A);
  }, Ve.useSyncExternalStore = function(A, k, F) {
    return V.H.useSyncExternalStore(
      A,
      k,
      F
    );
  }, Ve.useTransition = function() {
    return V.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var F0;
function Yo() {
  return F0 || (F0 = 1, xd.exports = oE()), xd.exports;
}
var M = Yo();
const ye = /* @__PURE__ */ Th(M), sE = /* @__PURE__ */ iE({
  __proto__: null,
  default: ye
}, [M]);
var Sd = { exports: {} }, go = {}, wd = { exports: {} }, Ed = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K0;
function uE() {
  return K0 || (K0 = 1, (function(t) {
    function a(_, L) {
      var Z = _.length;
      _.push(L);
      e: for (; 0 < Z; ) {
        var G = Z - 1 >>> 1, ne = _[G];
        if (0 < s(ne, L))
          _[G] = L, _[Z] = ne, Z = G;
        else break e;
      }
    }
    function r(_) {
      return _.length === 0 ? null : _[0];
    }
    function o(_) {
      if (_.length === 0) return null;
      var L = _[0], Z = _.pop();
      if (Z !== L) {
        _[0] = Z;
        e: for (var G = 0, ne = _.length, A = ne >>> 1; G < A; ) {
          var k = 2 * (G + 1) - 1, F = _[k], te = k + 1, se = _[te];
          if (0 > s(F, Z))
            te < ne && 0 > s(se, F) ? (_[G] = se, _[te] = Z, G = te) : (_[G] = F, _[k] = Z, G = k);
          else if (te < ne && 0 > s(se, Z))
            _[G] = se, _[te] = Z, G = te;
          else break e;
        }
      }
      return L;
    }
    function s(_, L) {
      var Z = _.sortIndex - L.sortIndex;
      return Z !== 0 ? Z : _.id - L.id;
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
    var p = [], g = [], y = 1, m = null, v = 3, x = !1, S = !1, T = !1, N = !1, R = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function j(_) {
      for (var L = r(g); L !== null; ) {
        if (L.callback === null) o(g);
        else if (L.startTime <= _)
          o(g), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(g);
      }
    }
    function U(_) {
      if (T = !1, j(_), !S)
        if (r(p) !== null)
          S = !0, H || (H = !0, K());
        else {
          var L = r(g);
          L !== null && $(U, L.startTime - _);
        }
    }
    var H = !1, V = -1, D = 5, q = -1;
    function le() {
      return N ? !0 : !(t.unstable_now() - q < D);
    }
    function I() {
      if (N = !1, H) {
        var _ = t.unstable_now();
        q = _;
        var L = !0;
        try {
          e: {
            S = !1, T && (T = !1, z(V), V = -1), x = !0;
            var Z = v;
            try {
              t: {
                for (j(_), m = r(p); m !== null && !(m.expirationTime > _ && le()); ) {
                  var G = m.callback;
                  if (typeof G == "function") {
                    m.callback = null, v = m.priorityLevel;
                    var ne = G(
                      m.expirationTime <= _
                    );
                    if (_ = t.unstable_now(), typeof ne == "function") {
                      m.callback = ne, j(_), L = !0;
                      break t;
                    }
                    m === r(p) && o(p), j(_);
                  } else o(p);
                  m = r(p);
                }
                if (m !== null) L = !0;
                else {
                  var A = r(g);
                  A !== null && $(
                    U,
                    A.startTime - _
                  ), L = !1;
                }
              }
              break e;
            } finally {
              m = null, v = Z, x = !1;
            }
            L = void 0;
          }
        } finally {
          L ? K() : H = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E(I);
      };
    else if (typeof MessageChannel < "u") {
      var W = new MessageChannel(), O = W.port2;
      W.port1.onmessage = I, K = function() {
        O.postMessage(null);
      };
    } else
      K = function() {
        R(I, 0);
      };
    function $(_, L) {
      V = R(function() {
        _(t.unstable_now());
      }, L);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, t.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(_) {
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
        return _();
      } finally {
        v = Z;
      }
    }, t.unstable_requestPaint = function() {
      N = !0;
    }, t.unstable_runWithPriority = function(_, L) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var Z = v;
      v = _;
      try {
        return L();
      } finally {
        v = Z;
      }
    }, t.unstable_scheduleCallback = function(_, L, Z) {
      var G = t.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? G + Z : G) : Z = G, _) {
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
      return ne = Z + ne, _ = {
        id: y++,
        callback: L,
        priorityLevel: _,
        startTime: Z,
        expirationTime: ne,
        sortIndex: -1
      }, Z > G ? (_.sortIndex = Z, a(g, _), r(p) === null && _ === r(g) && (T ? (z(V), V = -1) : T = !0, $(U, Z - G))) : (_.sortIndex = ne, a(p, _), S || x || (S = !0, H || (H = !0, K()))), _;
    }, t.unstable_shouldYield = le, t.unstable_wrapCallback = function(_) {
      var L = v;
      return function() {
        var Z = v;
        v = L;
        try {
          return _.apply(this, arguments);
        } finally {
          v = Z;
        }
      };
    };
  })(Ed)), Ed;
}
var P0;
function cE() {
  return P0 || (P0 = 1, wd.exports = uE()), wd.exports;
}
var _d = { exports: {} }, fn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var J0;
function fE() {
  if (J0) return fn;
  J0 = 1;
  var t = Yo();
  function a(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        g += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var o = {
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
  var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, g) {
    if (p === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, fn.createPortal = function(p, g) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(a(299));
    return u(p, g, null, y);
  }, fn.flushSync = function(p) {
    var g = c.T, y = o.p;
    try {
      if (c.T = null, o.p = 2, p) return p();
    } finally {
      c.T = g, o.p = y, o.d.f();
    }
  }, fn.preconnect = function(p, g) {
    typeof p == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(p, g));
  }, fn.prefetchDNS = function(p) {
    typeof p == "string" && o.d.D(p);
  }, fn.preinit = function(p, g) {
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
  }, fn.preinitModule = function(p, g) {
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
  }, fn.preload = function(p, g) {
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
  }, fn.preloadModule = function(p, g) {
    if (typeof p == "string")
      if (g) {
        var y = h(g.as, g.crossOrigin);
        o.d.m(p, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: y,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else o.d.m(p);
  }, fn.requestFormReset = function(p) {
    o.d.r(p);
  }, fn.unstable_batchedUpdates = function(p, g) {
    return p(g);
  }, fn.useFormState = function(p, g, y) {
    return c.H.useFormState(p, g, y);
  }, fn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, fn.version = "19.2.7", fn;
}
var W0;
function pb() {
  if (W0) return _d.exports;
  W0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), _d.exports = fE(), _d.exports;
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
var ey;
function dE() {
  if (ey) return go;
  ey = 1;
  var t = cE(), a = Yo(), r = pb();
  function o(e) {
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
    for (var i = e, l = n; ; ) {
      var f = i.return;
      if (f === null) break;
      var d = f.alternate;
      if (d === null) {
        if (l = f.return, l !== null) {
          i = l;
          continue;
        }
        break;
      }
      if (f.child === d.child) {
        for (d = f.child; d; ) {
          if (d === i) return p(f), e;
          if (d === l) return p(f), n;
          d = d.sibling;
        }
        throw Error(o(188));
      }
      if (i.return !== l.return) i = f, l = d;
      else {
        for (var b = !1, C = f.child; C; ) {
          if (C === i) {
            b = !0, i = f, l = d;
            break;
          }
          if (C === l) {
            b = !0, l = f, i = d;
            break;
          }
          C = C.sibling;
        }
        if (!b) {
          for (C = d.child; C; ) {
            if (C === i) {
              b = !0, i = d, l = f;
              break;
            }
            if (C === l) {
              b = !0, l = d, i = f;
              break;
            }
            C = C.sibling;
          }
          if (!b) throw Error(o(189));
        }
      }
      if (i.alternate !== l) throw Error(o(190));
    }
    if (i.tag !== 3) throw Error(o(188));
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
  var m = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), E = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), H = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), le = Symbol.for("react.memo_cache_sentinel"), I = Symbol.iterator;
  function K(e) {
    return e === null || typeof e != "object" ? null : (e = I && e[I] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var W = Symbol.for("react.client.reference");
  function O(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === W ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case R:
        return "Profiler";
      case N:
        return "StrictMode";
      case U:
        return "Suspense";
      case H:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case E:
          return e.displayName || "Context";
        case z:
          return (e._context.displayName || "Context") + ".Consumer";
        case j:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case V:
          return n = e.displayName || null, n !== null ? n : O(e.type) || "Memo";
        case D:
          n = e._payload, e = e._init;
          try {
            return O(e(n));
          } catch {
          }
      }
    return null;
  }
  var $ = Array.isArray, _ = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], ne = -1;
  function A(e) {
    return { current: e };
  }
  function k(e) {
    0 > ne || (e.current = G[ne], G[ne] = null, ne--);
  }
  function F(e, n) {
    ne++, G[ne] = e.current, e.current = n;
  }
  var te = A(null), se = A(null), he = A(null), me = A(null);
  function ee(e, n) {
    switch (F(he, n), F(se, e), F(te, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? p0(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = p0(n), e = g0(n, e);
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
    k(te), F(te, e);
  }
  function ge() {
    k(te), k(se), k(he);
  }
  function ze(e) {
    e.memoizedState !== null && F(me, e);
    var n = te.current, i = g0(n, e.type);
    n !== i && (F(se, e), F(te, i));
  }
  function Ce(e) {
    se.current === e && (k(te), k(se)), me.current === e && (k(me), co._currentValue = Z);
  }
  var we, xe;
  function Re(e) {
    if (we === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        we = n && n[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + we + e + xe;
  }
  var qe = !1;
  function ft(e, n) {
    if (!e || qe) return "";
    qe = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
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
                Reflect.construct(e, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  re = oe;
                }
                e.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                re = oe;
              }
              (fe = e()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && re && typeof oe.stack == "string")
              return [oe.stack, re.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var d = l.DetermineComponentFrameRoot(), b = d[0], C = d[1];
      if (b && C) {
        var Y = b.split(`
`), ie = C.split(`
`);
        for (f = l = 0; l < Y.length && !Y[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; f < ie.length && !ie[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (l === Y.length || f === ie.length)
          for (l = Y.length - 1, f = ie.length - 1; 1 <= l && 0 <= f && Y[l] !== ie[f]; )
            f--;
        for (; 1 <= l && 0 <= f; l--, f--)
          if (Y[l] !== ie[f]) {
            if (l !== 1 || f !== 1)
              do
                if (l--, f--, 0 > f || Y[l] !== ie[f]) {
                  var ue = `
` + Y[l].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= l && 0 <= f);
            break;
          }
      }
    } finally {
      qe = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Re(i) : "";
  }
  function Te(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Re(e.type);
      case 16:
        return Re("Lazy");
      case 13:
        return e.child !== n && n !== null ? Re("Suspense Fallback") : Re("Suspense");
      case 19:
        return Re("SuspenseList");
      case 0:
      case 15:
        return ft(e.type, !1);
      case 11:
        return ft(e.type.render, !1);
      case 1:
        return ft(e.type, !0);
      case 31:
        return Re("Activity");
      default:
        return "";
    }
  }
  function Ie(e) {
    try {
      var n = "", i = null;
      do
        n += Te(e, i), i = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Be = Object.prototype.hasOwnProperty, $e = t.unstable_scheduleCallback, wt = t.unstable_cancelCallback, Je = t.unstable_shouldYield, Qe = t.unstable_requestPaint, Fe = t.unstable_now, gt = t.unstable_getCurrentPriorityLevel, yt = t.unstable_ImmediatePriority, Xt = t.unstable_UserBlockingPriority, Lt = t.unstable_NormalPriority, mt = t.unstable_LowPriority, ot = t.unstable_IdlePriority, qn = t.log, yn = t.unstable_setDisableYieldValue, tn = null, Kt = null;
  function Ot(e) {
    if (typeof qn == "function" && yn(e), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(tn, e);
      } catch {
      }
  }
  var kt = Math.clz32 ? Math.clz32 : vn, si = Math.log, Sa = Math.LN2;
  function vn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (si(e) / Sa | 0) | 0;
  }
  var ra = 256, Mn = 262144, $n = 4194304;
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
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var f = 0, d = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var C = l & 134217727;
    return C !== 0 ? (l = C & ~d, l !== 0 ? f = un(l) : (b &= C, b !== 0 ? f = un(b) : i || (i = C & ~e, i !== 0 && (f = un(i))))) : (C = l & ~d, C !== 0 ? f = un(C) : b !== 0 ? f = un(b) : i || (i = l & ~e, i !== 0 && (f = un(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & d) === 0 && (d = f & -f, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : f;
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
    var e = $n;
    return $n <<= 1, ($n & 62914560) === 0 && ($n = 4194304), e;
  }
  function mn(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function pt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Pt(e, n, i, l, f, d) {
    var b = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var C = e.entanglements, Y = e.expirationTimes, ie = e.hiddenUpdates;
    for (i = b & ~i; 0 < i; ) {
      var ue = 31 - kt(i), fe = 1 << ue;
      C[ue] = 0, Y[ue] = -1;
      var re = ie[ue];
      if (re !== null)
        for (ie[ue] = null, ue = 0; ue < re.length; ue++) {
          var oe = re[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      i &= ~fe;
    }
    l !== 0 && la(e, l, 0), d !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(b & ~n));
  }
  function la(e, n, i) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - kt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function Wt(e, n) {
    var i = e.entangledLanes |= n;
    for (e = e.entanglements; i; ) {
      var l = 31 - kt(i), f = 1 << l;
      f & n | e[l] & n && (e[l] |= n), i &= ~f;
    }
  }
  function B(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Q(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Q(e) {
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
  function J(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function de() {
    var e = L.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : k0(e.type));
  }
  function pe(e, n) {
    var i = L.p;
    try {
      return L.p = e, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, Se = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, ke = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(e) {
    delete e[ve], delete e[Se], delete e[Me], delete e[De], delete e[ke];
  }
  function Rt(e) {
    var n = e[ve];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = E0(e); e !== null; ) {
            if (i = e[ve]) return i;
            e = E0(e);
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
    throw Error(o(33));
  }
  function jt(e) {
    var n = e[je];
    return n || (n = e[je] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(e) {
    e[Ge] = !0;
  }
  var wa = /* @__PURE__ */ new Set(), Dn = {};
  function cn(e, n) {
    nn(e, n), nn(e + "Capture", n);
  }
  function nn(e, n) {
    for (Dn[e] = n, e = 0; e < n.length; e++)
      wa.add(n[e]);
  }
  var bn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ui = {}, xn = {};
  function ci(e) {
    return Be.call(xn, e) ? !0 : Be.call(ui, e) ? !1 : bn.test(e) ? xn[e] = !0 : (ui[e] = !0, !1);
  }
  function oa(e, n, i) {
    if (ci(n))
      if (i === null) e.removeAttribute(n);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var l = n.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
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
  function Ue(e, n, i, l) {
    if (l === null) e.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(n, i, "" + l);
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
  function An(e, n, i) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var f = l.get, d = l.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(b) {
          i = "" + b, d.call(this, b);
        }
      }), Object.defineProperty(e, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(b) {
          i = "" + b;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function fi(e) {
    if (!e._valueTracker) {
      var n = pn(e) ? "checked" : "value";
      e._valueTracker = An(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Ha(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), l = "";
    return e && (l = pn(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (n.setValue(e), !0) : !1;
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
  function Ii(e, n, i, l, f, d, b, C) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), n != null ? b === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + bt(n)) : e.value !== "" + bt(n) && (e.value = "" + bt(n)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), n != null ? Nl(e, b, bt(n)) : i != null ? Nl(e, b, bt(i)) : l != null && e.removeAttribute("value"), f == null && d != null && (e.defaultChecked = !!d), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? e.name = "" + bt(C) : e.removeAttribute("name");
  }
  function Nr(e, n, i, l, f, d, b, C) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        fi(e);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, C || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? f, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = C ? e.checked : !!l, e.defaultChecked = !!l, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), fi(e);
  }
  function Nl(e, n, i) {
    n === "number" && dt(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function di(e, n, i, l) {
    if (e = e.options, n) {
      n = {};
      for (var f = 0; f < i.length; f++)
        n["$" + i[f]] = !0;
      for (i = 0; i < e.length; i++)
        f = n.hasOwnProperty("$" + e[i].value), e[i].selected !== f && (e[i].selected = f), f && l && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + bt(i), n = null, f = 0; f < e.length; f++) {
        if (e[f].value === i) {
          e[f].selected = !0, l && (e[f].defaultSelected = !0);
          return;
        }
        n !== null || e[f].disabled || (n = e[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Rl(e, n, i) {
    if (n != null && (n = "" + bt(n), n !== e.value && (e.value = n), i == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = i != null ? "" + bt(i) : "";
  }
  function fm(e, n, i, l) {
    if (n == null) {
      if (l != null) {
        if (i != null) throw Error(o(92));
        if ($(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), fi(e);
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
  var Wx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function dm(e, n, i) {
    var l = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, i) : typeof i != "number" || i === 0 || Wx.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function hm(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(o(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var f in n)
        l = n[f], n.hasOwnProperty(f) && i[f] !== l && dm(e, f, l);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && dm(e, d, n[d]);
  }
  function mc(e) {
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
  var eS = /* @__PURE__ */ new Map([
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
  ]), tS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Jo(e) {
    return tS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Ba() {
  }
  var pc = null;
  function gc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Cr = null, Tr = null;
  function mm(e) {
    var n = st(e);
    if (n && (e = n.stateNode)) {
      var i = e[Se] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Ii(
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
              var l = i[n];
              if (l !== e && l.form === e.form) {
                var f = l[Se] || null;
                if (!f) throw Error(o(90));
                Ii(
                  l,
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
              l = i[n], l.form === e.form && Ha(l);
          }
          break e;
        case "textarea":
          Rl(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && di(e, !!i.multiple, n, !1);
      }
    }
  }
  var yc = !1;
  function pm(e, n, i) {
    if (yc) return e(n, i);
    yc = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (yc = !1, (Cr !== null || Tr !== null) && (ks(), Cr && (n = Cr, e = Tr, Tr = Cr = null, mm(n), e)))
        for (n = 0; n < e.length; n++) mm(e[n]);
    }
  }
  function Cl(e, n) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[Se] || null;
    if (l === null) return null;
    i = l[n];
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function")
      throw Error(
        o(231, n, typeof i)
      );
    return i;
  }
  var Ua = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vc = !1;
  if (Ua)
    try {
      var Tl = {};
      Object.defineProperty(Tl, "passive", {
        get: function() {
          vc = !0;
        }
      }), window.addEventListener("test", Tl, Tl), window.removeEventListener("test", Tl, Tl);
    } catch {
      vc = !1;
    }
  var hi = null, bc = null, Wo = null;
  function gm() {
    if (Wo) return Wo;
    var e, n = bc, i = n.length, l, f = "value" in hi ? hi.value : hi.textContent, d = f.length;
    for (e = 0; e < i && n[e] === f[e]; e++) ;
    var b = i - e;
    for (l = 1; l <= b && n[i - l] === f[d - l]; l++) ;
    return Wo = f.slice(e, 1 < l ? 1 - l : void 0);
  }
  function es(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ts() {
    return !0;
  }
  function ym() {
    return !1;
  }
  function Sn(e) {
    function n(i, l, f, d, b) {
      this._reactName = i, this._targetInst = f, this.type = l, this.nativeEvent = d, this.target = b, this.currentTarget = null;
      for (var C in e)
        e.hasOwnProperty(C) && (i = e[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ts : ym, this.isPropagationStopped = ym, this;
    }
    return m(n.prototype, {
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
  }, ns = Sn(Zi), Ml = m({}, Zi, { view: 0, detail: 0 }), nS = Sn(Ml), xc, Sc, Dl, as = m({}, Ml, {
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
    getModifierState: Ec,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Dl && (Dl && e.type === "mousemove" ? (xc = e.screenX - Dl.screenX, Sc = e.screenY - Dl.screenY) : Sc = xc = 0, Dl = e), xc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Sc;
    }
  }), vm = Sn(as), aS = m({}, as, { dataTransfer: 0 }), iS = Sn(aS), rS = m({}, Ml, { relatedTarget: 0 }), wc = Sn(rS), lS = m({}, Zi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), oS = Sn(lS), sS = m({}, Zi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), uS = Sn(sS), cS = m({}, Zi, { data: 0 }), bm = Sn(cS), fS = {
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
  }, dS = {
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
  }, hS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function mS(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = hS[e]) ? !!n[e] : !1;
  }
  function Ec() {
    return mS;
  }
  var pS = m({}, Ml, {
    key: function(e) {
      if (e.key) {
        var n = fS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = es(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ec,
    charCode: function(e) {
      return e.type === "keypress" ? es(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? es(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gS = Sn(pS), yS = m({}, as, {
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
  }), xm = Sn(yS), vS = m({}, Ml, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ec
  }), bS = Sn(vS), xS = m({}, Zi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SS = Sn(xS), wS = m({}, as, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ES = Sn(wS), _S = m({}, Zi, {
    newState: 0,
    oldState: 0
  }), NS = Sn(_S), RS = [9, 13, 27, 32], _c = Ua && "CompositionEvent" in window, Al = null;
  Ua && "documentMode" in document && (Al = document.documentMode);
  var CS = Ua && "TextEvent" in window && !Al, Sm = Ua && (!_c || Al && 8 < Al && 11 >= Al), wm = " ", Em = !1;
  function _m(e, n) {
    switch (e) {
      case "keyup":
        return RS.indexOf(n.keyCode) !== -1;
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
  function Nm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Mr = !1;
  function TS(e, n) {
    switch (e) {
      case "compositionend":
        return Nm(n);
      case "keypress":
        return n.which !== 32 ? null : (Em = !0, wm);
      case "textInput":
        return e = n.data, e === wm && Em ? null : e;
      default:
        return null;
    }
  }
  function MS(e, n) {
    if (Mr)
      return e === "compositionend" || !_c && _m(e, n) ? (e = gm(), Wo = bc = hi = null, Mr = !1, e) : null;
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
        return Sm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var DS = {
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
  function Rm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!DS[e.type] : n === "textarea";
  }
  function Cm(e, n, i, l) {
    Cr ? Tr ? Tr.push(l) : Tr = [l] : Cr = l, n = Is(n, "onChange"), 0 < n.length && (i = new ns(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: n }));
  }
  var zl = null, Ol = null;
  function AS(e) {
    u0(e, 0);
  }
  function is(e) {
    var n = We(e);
    if (Ha(n)) return e;
  }
  function Tm(e, n) {
    if (e === "change") return n;
  }
  var Mm = !1;
  if (Ua) {
    var Nc;
    if (Ua) {
      var Rc = "oninput" in document;
      if (!Rc) {
        var Dm = document.createElement("div");
        Dm.setAttribute("oninput", "return;"), Rc = typeof Dm.oninput == "function";
      }
      Nc = Rc;
    } else Nc = !1;
    Mm = Nc && (!document.documentMode || 9 < document.documentMode);
  }
  function Am() {
    zl && (zl.detachEvent("onpropertychange", zm), Ol = zl = null);
  }
  function zm(e) {
    if (e.propertyName === "value" && is(Ol)) {
      var n = [];
      Cm(
        n,
        Ol,
        e,
        gc(e)
      ), pm(AS, n);
    }
  }
  function zS(e, n, i) {
    e === "focusin" ? (Am(), zl = n, Ol = i, zl.attachEvent("onpropertychange", zm)) : e === "focusout" && Am();
  }
  function OS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return is(Ol);
  }
  function jS(e, n) {
    if (e === "click") return is(n);
  }
  function LS(e, n) {
    if (e === "input" || e === "change")
      return is(n);
  }
  function HS(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var zn = typeof Object.is == "function" ? Object.is : HS;
  function jl(e, n) {
    if (zn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(n);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var f = i[l];
      if (!Be.call(n, f) || !zn(e[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Om(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function jm(e, n) {
    var i = Om(e);
    e = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (l = e + i.textContent.length, e <= n && l >= n)
          return { node: i, offset: n - e };
        e = l;
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
      i = Om(i);
    }
  }
  function Lm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Lm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Hm(e) {
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
  function Cc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var BS = Ua && "documentMode" in document && 11 >= document.documentMode, Dr = null, Tc = null, Ll = null, Mc = !1;
  function Bm(e, n, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Mc || Dr == null || Dr !== dt(l) || (l = Dr, "selectionStart" in l && Cc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ll && jl(Ll, l) || (Ll = l, l = Is(Tc, "onSelect"), 0 < l.length && (n = new ns(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: l }), n.target = Dr)));
  }
  function Qi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var Ar = {
    animationend: Qi("Animation", "AnimationEnd"),
    animationiteration: Qi("Animation", "AnimationIteration"),
    animationstart: Qi("Animation", "AnimationStart"),
    transitionrun: Qi("Transition", "TransitionRun"),
    transitionstart: Qi("Transition", "TransitionStart"),
    transitioncancel: Qi("Transition", "TransitionCancel"),
    transitionend: Qi("Transition", "TransitionEnd")
  }, Dc = {}, Um = {};
  Ua && (Um = document.createElement("div").style, "AnimationEvent" in window || (delete Ar.animationend.animation, delete Ar.animationiteration.animation, delete Ar.animationstart.animation), "TransitionEvent" in window || delete Ar.transitionend.transition);
  function Fi(e) {
    if (Dc[e]) return Dc[e];
    if (!Ar[e]) return e;
    var n = Ar[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Um)
        return Dc[e] = n[i];
    return e;
  }
  var km = Fi("animationend"), Vm = Fi("animationiteration"), Ym = Fi("animationstart"), US = Fi("transitionrun"), kS = Fi("transitionstart"), VS = Fi("transitioncancel"), qm = Fi("transitionend"), $m = /* @__PURE__ */ new Map(), Ac = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ac.push("scrollEnd");
  function ua(e, n) {
    $m.set(e, n), cn(n, [e]);
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
  }, Gn = [], zr = 0, zc = 0;
  function ls() {
    for (var e = zr, n = zc = zr = 0; n < e; ) {
      var i = Gn[n];
      Gn[n++] = null;
      var l = Gn[n];
      Gn[n++] = null;
      var f = Gn[n];
      Gn[n++] = null;
      var d = Gn[n];
      if (Gn[n++] = null, l !== null && f !== null) {
        var b = l.pending;
        b === null ? f.next = f : (f.next = b.next, b.next = f), l.pending = f;
      }
      d !== 0 && Xm(i, f, d);
    }
  }
  function os(e, n, i, l) {
    Gn[zr++] = e, Gn[zr++] = n, Gn[zr++] = i, Gn[zr++] = l, zc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Oc(e, n, i, l) {
    return os(e, n, i, l), ss(e);
  }
  function Ki(e, n) {
    return os(e, null, null, n), ss(e);
  }
  function Xm(e, n, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var f = !1, d = e.return; d !== null; )
      d.childLanes |= i, l = d.alternate, l !== null && (l.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (f = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, f && n !== null && (f = 31 - kt(i), e = d.hiddenUpdates, l = e[f], l === null ? e[f] = [n] : l.push(n), n.lane = i | 536870912), d) : null;
  }
  function ss(e) {
    if (50 < ao)
      throw ao = 0, $f = null, Error(o(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Or = {};
  function YS(e, n, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function On(e, n, i, l) {
    return new YS(e, n, i, l);
  }
  function jc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ka(e, n) {
    var i = e.alternate;
    return i === null ? (i = On(
      e.tag,
      n,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Gm(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function us(e, n, i, l, f, d) {
    var b = 0;
    if (l = e, typeof e == "function") jc(e) && (b = 1);
    else if (typeof e == "string")
      b = Iw(
        e,
        i,
        te.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = On(31, i, n, f), e.elementType = q, e.lanes = d, e;
        case T:
          return Pi(i.children, f, d, n);
        case N:
          b = 8, f |= 24;
          break;
        case R:
          return e = On(12, i, n, f | 2), e.elementType = R, e.lanes = d, e;
        case U:
          return e = On(13, i, n, f), e.elementType = U, e.lanes = d, e;
        case H:
          return e = On(19, i, n, f), e.elementType = H, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
                b = 10;
                break e;
              case z:
                b = 9;
                break e;
              case j:
                b = 11;
                break e;
              case V:
                b = 14;
                break e;
              case D:
                b = 16, l = null;
                break e;
            }
          b = 29, i = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = On(b, i, n, f), n.elementType = e, n.type = l, n.lanes = d, n;
  }
  function Pi(e, n, i, l) {
    return e = On(7, e, l, n), e.lanes = i, e;
  }
  function Lc(e, n, i) {
    return e = On(6, e, null, n), e.lanes = i, e;
  }
  function Im(e) {
    var n = On(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Hc(e, n, i) {
    return n = On(
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
  var Zm = /* @__PURE__ */ new WeakMap();
  function In(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = Zm.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Ie(n)
      }, Zm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ie(n)
    };
  }
  var jr = [], Lr = 0, cs = null, Hl = 0, Zn = [], Qn = 0, mi = null, Ea = 1, _a = "";
  function Va(e, n) {
    jr[Lr++] = Hl, jr[Lr++] = cs, cs = e, Hl = n;
  }
  function Qm(e, n, i) {
    Zn[Qn++] = Ea, Zn[Qn++] = _a, Zn[Qn++] = mi, mi = e;
    var l = Ea;
    e = _a;
    var f = 32 - kt(l) - 1;
    l &= ~(1 << f), i += 1;
    var d = 32 - kt(n) + f;
    if (30 < d) {
      var b = f - f % 5;
      d = (l & (1 << b) - 1).toString(32), l >>= b, f -= b, Ea = 1 << 32 - kt(n) + f | i << f | l, _a = d + e;
    } else
      Ea = 1 << d | i << f | l, _a = e;
  }
  function Bc(e) {
    e.return !== null && (Va(e, 1), Qm(e, 1, 0));
  }
  function Uc(e) {
    for (; e === cs; )
      cs = jr[--Lr], jr[Lr] = null, Hl = jr[--Lr], jr[Lr] = null;
    for (; e === mi; )
      mi = Zn[--Qn], Zn[Qn] = null, _a = Zn[--Qn], Zn[Qn] = null, Ea = Zn[--Qn], Zn[Qn] = null;
  }
  function Fm(e, n) {
    Zn[Qn++] = Ea, Zn[Qn++] = _a, Zn[Qn++] = mi, Ea = n.id, _a = n.overflow, mi = e;
  }
  var rn = null, Tt = null, it = !1, pi = null, Fn = !1, kc = Error(o(519));
  function gi(e) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Bl(In(n, e)), kc;
  }
  function Km(e) {
    var n = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (n[ve] = e, n[Se] = l, i) {
      case "dialog":
        Pe("cancel", n), Pe("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Pe("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ro.length; i++)
          Pe(ro[i], n);
        break;
      case "source":
        Pe("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Pe("error", n), Pe("load", n);
        break;
      case "details":
        Pe("toggle", n);
        break;
      case "input":
        Pe("invalid", n), Nr(
          n,
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
        Pe("invalid", n);
        break;
      case "textarea":
        Pe("invalid", n), fm(n, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || l.suppressHydrationWarning === !0 || h0(n.textContent, i) ? (l.popover != null && (Pe("beforetoggle", n), Pe("toggle", n)), l.onScroll != null && Pe("scroll", n), l.onScrollEnd != null && Pe("scrollend", n), l.onClick != null && (n.onclick = Ba), n = !0) : n = !1, n || gi(e, !0);
  }
  function Pm(e) {
    for (rn = e.return; rn; )
      switch (rn.tag) {
        case 5:
        case 31:
        case 13:
          Fn = !1;
          return;
        case 27:
        case 3:
          Fn = !0;
          return;
        default:
          rn = rn.return;
      }
  }
  function Hr(e) {
    if (e !== rn) return !1;
    if (!it) return Pm(e), it = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || id(e.type, e.memoizedProps)), i = !i), i && Tt && gi(e), Pm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Tt = w0(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Tt = w0(e);
    } else
      n === 27 ? (n = Tt, Di(e.type) ? (e = ud, ud = null, Tt = e) : Tt = n) : Tt = rn ? Pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ji() {
    Tt = rn = null, it = !1;
  }
  function Vc() {
    var e = pi;
    return e !== null && (Nn === null ? Nn = e : Nn.push.apply(
      Nn,
      e
    ), pi = null), e;
  }
  function Bl(e) {
    pi === null ? pi = [e] : pi.push(e);
  }
  var Yc = A(null), Wi = null, Ya = null;
  function yi(e, n, i) {
    F(Yc, n._currentValue), n._currentValue = i;
  }
  function qa(e) {
    e._currentValue = Yc.current, k(Yc);
  }
  function qc(e, n, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function $c(e, n, i, l) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var d = f.dependencies;
      if (d !== null) {
        var b = f.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var C = d;
          d = f;
          for (var Y = 0; Y < n.length; Y++)
            if (C.context === n[Y]) {
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), qc(
                d.return,
                i,
                e
              ), l || (b = null);
              break e;
            }
          d = C.next;
        }
      } else if (f.tag === 18) {
        if (b = f.return, b === null) throw Error(o(341));
        b.lanes |= i, d = b.alternate, d !== null && (d.lanes |= i), qc(b, i, e), b = null;
      } else b = f.child;
      if (b !== null) b.return = f;
      else
        for (b = f; b !== null; ) {
          if (b === e) {
            b = null;
            break;
          }
          if (f = b.sibling, f !== null) {
            f.return = b.return, b = f;
            break;
          }
          b = b.return;
        }
      f = b;
    }
  }
  function Br(e, n, i, l) {
    e = null;
    for (var f = n, d = !1; f !== null; ) {
      if (!d) {
        if ((f.flags & 524288) !== 0) d = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var b = f.alternate;
        if (b === null) throw Error(o(387));
        if (b = b.memoizedProps, b !== null) {
          var C = f.type;
          zn(f.pendingProps.value, b.value) || (e !== null ? e.push(C) : e = [C]);
        }
      } else if (f === me.current) {
        if (b = f.alternate, b === null) throw Error(o(387));
        b.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(co) : e = [co]);
      }
      f = f.return;
    }
    e !== null && $c(
      n,
      e,
      i,
      l
    ), n.flags |= 262144;
  }
  function fs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!zn(
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
    return Jm(Wi, e);
  }
  function ds(e, n) {
    return Wi === null && er(e), Jm(e, n);
  }
  function Jm(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Ya === null) {
      if (e === null) throw Error(o(308));
      Ya = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ya = Ya.next = n;
    return i;
  }
  var qS = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(i, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, $S = t.unstable_scheduleCallback, XS = t.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Xc() {
    return {
      controller: new qS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ul(e) {
    e.refCount--, e.refCount === 0 && $S(XS, function() {
      e.controller.abort();
    });
  }
  var kl = null, Gc = 0, Ur = 0, kr = null;
  function GS(e, n) {
    if (kl === null) {
      var i = kl = [];
      Gc = 0, Ur = Ff(), kr = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return Gc++, n.then(Wm, Wm), n;
  }
  function Wm() {
    if (--Gc === 0 && kl !== null) {
      kr !== null && (kr.status = "fulfilled");
      var e = kl;
      kl = null, Ur = 0, kr = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function IS(e, n) {
    var i = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        i.push(f);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = n;
        for (var f = 0; f < i.length; f++) (0, i[f])(n);
      },
      function(f) {
        for (l.status = "rejected", l.reason = f, f = 0; f < i.length; f++)
          (0, i[f])(void 0);
      }
    ), l;
  }
  var ep = _.S;
  _.S = function(e, n) {
    Bg = Fe(), typeof n == "object" && n !== null && typeof n.then == "function" && GS(e, n), ep !== null && ep(e, n);
  };
  var tr = A(null);
  function Ic() {
    var e = tr.current;
    return e !== null ? e : Ct.pooledCache;
  }
  function hs(e, n) {
    n === null ? F(tr, tr.current) : F(tr, n.pool);
  }
  function tp() {
    var e = Ic();
    return e === null ? null : { parent: Gt._currentValue, pool: e };
  }
  var Vr = Error(o(460)), Zc = Error(o(474)), ms = Error(o(542)), ps = { then: function() {
  } };
  function np(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function ap(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(Ba, Ba), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, rp(e), e;
      default:
        if (typeof n.status == "string") n.then(Ba, Ba);
        else {
          if (e = Ct, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = n, e.status = "pending", e.then(
            function(l) {
              if (n.status === "pending") {
                var f = n;
                f.status = "fulfilled", f.value = l;
              }
            },
            function(l) {
              if (n.status === "pending") {
                var f = n;
                f.status = "rejected", f.reason = l;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, rp(e), e;
        }
        throw ar = n, Vr;
    }
  }
  function nr(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (ar = i, Vr) : i;
    }
  }
  var ar = null;
  function ip() {
    if (ar === null) throw Error(o(459));
    var e = ar;
    return ar = null, e;
  }
  function rp(e) {
    if (e === Vr || e === ms)
      throw Error(o(483));
  }
  var Yr = null, Vl = 0;
  function gs(e) {
    var n = Vl;
    return Vl += 1, Yr === null && (Yr = []), ap(Yr, e, n);
  }
  function Yl(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function ys(e, n) {
    throw n.$$typeof === v ? Error(o(525)) : (e = Object.prototype.toString.call(n), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function lp(e) {
    function n(P, X) {
      if (e) {
        var ae = P.deletions;
        ae === null ? (P.deletions = [X], P.flags |= 16) : ae.push(X);
      }
    }
    function i(P, X) {
      if (!e) return null;
      for (; X !== null; )
        n(P, X), X = X.sibling;
      return null;
    }
    function l(P) {
      for (var X = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? X.set(P.key, P) : X.set(P.index, P), P = P.sibling;
      return X;
    }
    function f(P, X) {
      return P = ka(P, X), P.index = 0, P.sibling = null, P;
    }
    function d(P, X, ae) {
      return P.index = ae, e ? (ae = P.alternate, ae !== null ? (ae = ae.index, ae < X ? (P.flags |= 67108866, X) : ae) : (P.flags |= 67108866, X)) : (P.flags |= 1048576, X);
    }
    function b(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function C(P, X, ae, ce) {
      return X === null || X.tag !== 6 ? (X = Lc(ae, P.mode, ce), X.return = P, X) : (X = f(X, ae), X.return = P, X);
    }
    function Y(P, X, ae, ce) {
      var Oe = ae.type;
      return Oe === T ? ue(
        P,
        X,
        ae.props.children,
        ce,
        ae.key
      ) : X !== null && (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === D && nr(Oe) === X.type) ? (X = f(X, ae.props), Yl(X, ae), X.return = P, X) : (X = us(
        ae.type,
        ae.key,
        ae.props,
        null,
        P.mode,
        ce
      ), Yl(X, ae), X.return = P, X);
    }
    function ie(P, X, ae, ce) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ae.containerInfo || X.stateNode.implementation !== ae.implementation ? (X = Hc(ae, P.mode, ce), X.return = P, X) : (X = f(X, ae.children || []), X.return = P, X);
    }
    function ue(P, X, ae, ce, Oe) {
      return X === null || X.tag !== 7 ? (X = Pi(
        ae,
        P.mode,
        ce,
        Oe
      ), X.return = P, X) : (X = f(X, ae), X.return = P, X);
    }
    function fe(P, X, ae) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = Lc(
          "" + X,
          P.mode,
          ae
        ), X.return = P, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return ae = us(
              X.type,
              X.key,
              X.props,
              null,
              P.mode,
              ae
            ), Yl(ae, X), ae.return = P, ae;
          case S:
            return X = Hc(
              X,
              P.mode,
              ae
            ), X.return = P, X;
          case D:
            return X = nr(X), fe(P, X, ae);
        }
        if ($(X) || K(X))
          return X = Pi(
            X,
            P.mode,
            ae,
            null
          ), X.return = P, X;
        if (typeof X.then == "function")
          return fe(P, gs(X), ae);
        if (X.$$typeof === E)
          return fe(
            P,
            ds(P, X),
            ae
          );
        ys(P, X);
      }
      return null;
    }
    function re(P, X, ae, ce) {
      var Oe = X !== null ? X.key : null;
      if (typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint")
        return Oe !== null ? null : C(P, X, "" + ae, ce);
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            return ae.key === Oe ? Y(P, X, ae, ce) : null;
          case S:
            return ae.key === Oe ? ie(P, X, ae, ce) : null;
          case D:
            return ae = nr(ae), re(P, X, ae, ce);
        }
        if ($(ae) || K(ae))
          return Oe !== null ? null : ue(P, X, ae, ce, null);
        if (typeof ae.then == "function")
          return re(
            P,
            X,
            gs(ae),
            ce
          );
        if (ae.$$typeof === E)
          return re(
            P,
            X,
            ds(P, ae),
            ce
          );
        ys(P, ae);
      }
      return null;
    }
    function oe(P, X, ae, ce, Oe) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return P = P.get(ae) || null, C(X, P, "" + ce, Oe);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return P = P.get(
              ce.key === null ? ae : ce.key
            ) || null, Y(X, P, ce, Oe);
          case S:
            return P = P.get(
              ce.key === null ? ae : ce.key
            ) || null, ie(X, P, ce, Oe);
          case D:
            return ce = nr(ce), oe(
              P,
              X,
              ae,
              ce,
              Oe
            );
        }
        if ($(ce) || K(ce))
          return P = P.get(ae) || null, ue(X, P, ce, Oe, null);
        if (typeof ce.then == "function")
          return oe(
            P,
            X,
            ae,
            gs(ce),
            Oe
          );
        if (ce.$$typeof === E)
          return oe(
            P,
            X,
            ae,
            ds(X, ce),
            Oe
          );
        ys(X, ce);
      }
      return null;
    }
    function _e(P, X, ae, ce) {
      for (var Oe = null, ut = null, Ne = X, Xe = X = 0, tt = null; Ne !== null && Xe < ae.length; Xe++) {
        Ne.index > Xe ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var ct = re(
          P,
          Ne,
          ae[Xe],
          ce
        );
        if (ct === null) {
          Ne === null && (Ne = tt);
          break;
        }
        e && Ne && ct.alternate === null && n(P, Ne), X = d(ct, X, Xe), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ne = tt;
      }
      if (Xe === ae.length)
        return i(P, Ne), it && Va(P, Xe), Oe;
      if (Ne === null) {
        for (; Xe < ae.length; Xe++)
          Ne = fe(P, ae[Xe], ce), Ne !== null && (X = d(
            Ne,
            X,
            Xe
          ), ut === null ? Oe = Ne : ut.sibling = Ne, ut = Ne);
        return it && Va(P, Xe), Oe;
      }
      for (Ne = l(Ne); Xe < ae.length; Xe++)
        tt = oe(
          Ne,
          P,
          Xe,
          ae[Xe],
          ce
        ), tt !== null && (e && tt.alternate !== null && Ne.delete(
          tt.key === null ? Xe : tt.key
        ), X = d(
          tt,
          X,
          Xe
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return e && Ne.forEach(function(Li) {
        return n(P, Li);
      }), it && Va(P, Xe), Oe;
    }
    function Le(P, X, ae, ce) {
      if (ae == null) throw Error(o(151));
      for (var Oe = null, ut = null, Ne = X, Xe = X = 0, tt = null, ct = ae.next(); Ne !== null && !ct.done; Xe++, ct = ae.next()) {
        Ne.index > Xe ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var Li = re(P, Ne, ct.value, ce);
        if (Li === null) {
          Ne === null && (Ne = tt);
          break;
        }
        e && Ne && Li.alternate === null && n(P, Ne), X = d(Li, X, Xe), ut === null ? Oe = Li : ut.sibling = Li, ut = Li, Ne = tt;
      }
      if (ct.done)
        return i(P, Ne), it && Va(P, Xe), Oe;
      if (Ne === null) {
        for (; !ct.done; Xe++, ct = ae.next())
          ct = fe(P, ct.value, ce), ct !== null && (X = d(ct, X, Xe), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Va(P, Xe), Oe;
      }
      for (Ne = l(Ne); !ct.done; Xe++, ct = ae.next())
        ct = oe(Ne, P, Xe, ct.value, ce), ct !== null && (e && ct.alternate !== null && Ne.delete(ct.key === null ? Xe : ct.key), X = d(ct, X, Xe), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return e && Ne.forEach(function(aE) {
        return n(P, aE);
      }), it && Va(P, Xe), Oe;
    }
    function Nt(P, X, ae, ce) {
      if (typeof ae == "object" && ae !== null && ae.type === T && ae.key === null && (ae = ae.props.children), typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            e: {
              for (var Oe = ae.key; X !== null; ) {
                if (X.key === Oe) {
                  if (Oe = ae.type, Oe === T) {
                    if (X.tag === 7) {
                      i(
                        P,
                        X.sibling
                      ), ce = f(
                        X,
                        ae.props.children
                      ), ce.return = P, P = ce;
                      break e;
                    }
                  } else if (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === D && nr(Oe) === X.type) {
                    i(
                      P,
                      X.sibling
                    ), ce = f(X, ae.props), Yl(ce, ae), ce.return = P, P = ce;
                    break e;
                  }
                  i(P, X);
                  break;
                } else n(P, X);
                X = X.sibling;
              }
              ae.type === T ? (ce = Pi(
                ae.props.children,
                P.mode,
                ce,
                ae.key
              ), ce.return = P, P = ce) : (ce = us(
                ae.type,
                ae.key,
                ae.props,
                null,
                P.mode,
                ce
              ), Yl(ce, ae), ce.return = P, P = ce);
            }
            return b(P);
          case S:
            e: {
              for (Oe = ae.key; X !== null; ) {
                if (X.key === Oe)
                  if (X.tag === 4 && X.stateNode.containerInfo === ae.containerInfo && X.stateNode.implementation === ae.implementation) {
                    i(
                      P,
                      X.sibling
                    ), ce = f(X, ae.children || []), ce.return = P, P = ce;
                    break e;
                  } else {
                    i(P, X);
                    break;
                  }
                else n(P, X);
                X = X.sibling;
              }
              ce = Hc(ae, P.mode, ce), ce.return = P, P = ce;
            }
            return b(P);
          case D:
            return ae = nr(ae), Nt(
              P,
              X,
              ae,
              ce
            );
        }
        if ($(ae))
          return _e(
            P,
            X,
            ae,
            ce
          );
        if (K(ae)) {
          if (Oe = K(ae), typeof Oe != "function") throw Error(o(150));
          return ae = Oe.call(ae), Le(
            P,
            X,
            ae,
            ce
          );
        }
        if (typeof ae.then == "function")
          return Nt(
            P,
            X,
            gs(ae),
            ce
          );
        if (ae.$$typeof === E)
          return Nt(
            P,
            X,
            ds(P, ae),
            ce
          );
        ys(P, ae);
      }
      return typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint" ? (ae = "" + ae, X !== null && X.tag === 6 ? (i(P, X.sibling), ce = f(X, ae), ce.return = P, P = ce) : (i(P, X), ce = Lc(ae, P.mode, ce), ce.return = P, P = ce), b(P)) : i(P, X);
    }
    return function(P, X, ae, ce) {
      try {
        Vl = 0;
        var Oe = Nt(
          P,
          X,
          ae,
          ce
        );
        return Yr = null, Oe;
      } catch (Ne) {
        if (Ne === Vr || Ne === ms) throw Ne;
        var ut = On(29, Ne, null, P.mode);
        return ut.lanes = ce, ut.return = P, ut;
      } finally {
      }
    };
  }
  var ir = lp(!0), op = lp(!1), vi = !1;
  function Qc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function bi(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function xi(e, n, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ht & 2) !== 0) {
      var f = l.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), l.pending = n, n = ss(e), Xm(e, null, i), n;
    }
    return os(e, l, n, i), ss(e);
  }
  function ql(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, i |= l, n.lanes = i, Wt(e, i);
    }
  }
  function Kc(e, n) {
    var i = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, i === l)) {
      var f = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var b = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? f = d = b : d = d.next = b, i = i.next;
        } while (i !== null);
        d === null ? f = d = n : d = d.next = n;
      } else f = d = n;
      i = {
        baseState: l.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: d,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = n : e.next = n, i.lastBaseUpdate = n;
  }
  var Pc = !1;
  function $l() {
    if (Pc) {
      var e = kr;
      if (e !== null) throw e;
    }
  }
  function Xl(e, n, i, l) {
    Pc = !1;
    var f = e.updateQueue;
    vi = !1;
    var d = f.firstBaseUpdate, b = f.lastBaseUpdate, C = f.shared.pending;
    if (C !== null) {
      f.shared.pending = null;
      var Y = C, ie = Y.next;
      Y.next = null, b === null ? d = ie : b.next = ie, b = Y;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, C = ue.lastBaseUpdate, C !== b && (C === null ? ue.firstBaseUpdate = ie : C.next = ie, ue.lastBaseUpdate = Y));
    }
    if (d !== null) {
      var fe = f.baseState;
      b = 0, ue = ie = Y = null, C = d;
      do {
        var re = C.lane & -536870913, oe = re !== C.lane;
        if (oe ? (et & re) === re : (l & re) === re) {
          re !== 0 && re === Ur && (Pc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = e, Le = C;
            re = n;
            var Nt = i;
            switch (Le.tag) {
              case 1:
                if (_e = Le.payload, typeof _e == "function") {
                  fe = _e.call(Nt, fe, re);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = Le.payload, re = typeof _e == "function" ? _e.call(Nt, fe, re) : _e, re == null) break e;
                fe = m({}, fe, re);
                break e;
              case 2:
                vi = !0;
            }
          }
          re = C.callback, re !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [re] : oe.push(re));
        } else
          oe = {
            lane: re,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, ue === null ? (ie = ue = oe, Y = fe) : ue = ue.next = oe, b |= re;
        if (C = C.next, C === null) {
          if (C = f.shared.pending, C === null)
            break;
          oe = C, C = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (Y = fe), f.baseState = Y, f.firstBaseUpdate = ie, f.lastBaseUpdate = ue, d === null && (f.shared.lanes = 0), Ni |= b, e.lanes = b, e.memoizedState = fe;
    }
  }
  function sp(e, n) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(n);
  }
  function up(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        sp(i[e], n);
  }
  var qr = A(null), vs = A(0);
  function cp(e, n) {
    e = Pa, F(vs, e), F(qr, n), Pa = e | n.baseLanes;
  }
  function Jc() {
    F(vs, Pa), F(qr, qr.current);
  }
  function Wc() {
    Pa = vs.current, k(qr), k(vs);
  }
  var jn = A(null), Kn = null;
  function Si(e) {
    var n = e.alternate;
    F(Yt, Yt.current & 1), F(jn, e), Kn === null && (n === null || qr.current !== null || n.memoizedState !== null) && (Kn = e);
  }
  function ef(e) {
    F(Yt, Yt.current), F(jn, e), Kn === null && (Kn = e);
  }
  function fp(e) {
    e.tag === 22 ? (F(Yt, Yt.current), F(jn, e), Kn === null && (Kn = e)) : wi();
  }
  function wi() {
    F(Yt, Yt.current), F(jn, jn.current);
  }
  function Ln(e) {
    k(jn), Kn === e && (Kn = null), k(Yt);
  }
  var Yt = A(0);
  function bs(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || od(i) || sd(i)))
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
  var $a = 0, Ye = null, Et = null, It = null, xs = !1, $r = !1, rr = !1, Ss = 0, Gl = 0, Xr = null, ZS = 0;
  function Bt() {
    throw Error(o(321));
  }
  function tf(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!zn(e[i], n[i])) return !1;
    return !0;
  }
  function nf(e, n, i, l, f, d) {
    return $a = d, Ye = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, _.H = e === null || e.memoizedState === null ? Qp : vf, rr = !1, d = i(l, f), rr = !1, $r && (d = hp(
      n,
      i,
      l,
      f
    )), dp(e), d;
  }
  function dp(e) {
    _.H = Ql;
    var n = Et !== null && Et.next !== null;
    if ($a = 0, It = Et = Ye = null, xs = !1, Gl = 0, Xr = null, n) throw Error(o(300));
    e === null || Zt || (e = e.dependencies, e !== null && fs(e) && (Zt = !0));
  }
  function hp(e, n, i, l) {
    Ye = e;
    var f = 0;
    do {
      if ($r && (Xr = null), Gl = 0, $r = !1, 25 <= f) throw Error(o(301));
      if (f += 1, It = Et = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      _.H = Fp, d = n(i, l);
    } while ($r);
    return d;
  }
  function QS() {
    var e = _.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Il(n) : n, e = e.useState()[0], (Et !== null ? Et.memoizedState : null) !== e && (Ye.flags |= 1024), n;
  }
  function af() {
    var e = Ss !== 0;
    return Ss = 0, e;
  }
  function rf(e, n, i) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i;
  }
  function lf(e) {
    if (xs) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      xs = !1;
    }
    $a = 0, It = Et = Ye = null, $r = !1, Gl = Ss = 0, Xr = null;
  }
  function gn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return It === null ? Ye.memoizedState = It = e : It = It.next = e, It;
  }
  function qt() {
    if (Et === null) {
      var e = Ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Et.next;
    var n = It === null ? Ye.memoizedState : It.next;
    if (n !== null)
      It = n, Et = e;
    else {
      if (e === null)
        throw Ye.alternate === null ? Error(o(467)) : Error(o(310));
      Et = e, e = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, It === null ? Ye.memoizedState = It = e : It = It.next = e;
    }
    return It;
  }
  function ws() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Il(e) {
    var n = Gl;
    return Gl += 1, Xr === null && (Xr = []), e = ap(Xr, e, n), n = Ye, (It === null ? n.memoizedState : It.next) === null && (n = n.alternate, _.H = n === null || n.memoizedState === null ? Qp : vf), e;
  }
  function Es(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Il(e);
      if (e.$$typeof === E) return ln(e);
    }
    throw Error(o(438, String(e)));
  }
  function of(e) {
    var n = null, i = Ye.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var l = Ye.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = ws(), Ye.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(e), l = 0; l < e; l++)
        i[l] = le;
    return n.index++, i;
  }
  function Xa(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function _s(e) {
    var n = qt();
    return sf(n, Et, e);
  }
  function sf(e, n, i) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = i;
    var f = e.baseQueue, d = l.pending;
    if (d !== null) {
      if (f !== null) {
        var b = f.next;
        f.next = d.next, d.next = b;
      }
      n.baseQueue = f = d, l.pending = null;
    }
    if (d = e.baseState, f === null) e.memoizedState = d;
    else {
      n = f.next;
      var C = b = null, Y = null, ie = n, ue = !1;
      do {
        var fe = ie.lane & -536870913;
        if (fe !== ie.lane ? (et & fe) === fe : ($a & fe) === fe) {
          var re = ie.revertLane;
          if (re === 0)
            Y !== null && (Y = Y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }), fe === Ur && (ue = !0);
          else if (($a & re) === re) {
            ie = ie.next, re === Ur && (ue = !0);
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
            }, Y === null ? (C = Y = fe, b = d) : Y = Y.next = fe, Ye.lanes |= re, Ni |= re;
          fe = ie.action, rr && i(d, fe), d = ie.hasEagerState ? ie.eagerState : i(d, fe);
        } else
          re = {
            lane: fe,
            revertLane: ie.revertLane,
            gesture: ie.gesture,
            action: ie.action,
            hasEagerState: ie.hasEagerState,
            eagerState: ie.eagerState,
            next: null
          }, Y === null ? (C = Y = re, b = d) : Y = Y.next = re, Ye.lanes |= fe, Ni |= fe;
        ie = ie.next;
      } while (ie !== null && ie !== n);
      if (Y === null ? b = d : Y.next = C, !zn(d, e.memoizedState) && (Zt = !0, ue && (i = kr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = b, e.baseQueue = Y, l.lastRenderedState = d;
    }
    return f === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function uf(e) {
    var n = qt(), i = n.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, f = i.pending, d = n.memoizedState;
    if (f !== null) {
      i.pending = null;
      var b = f = f.next;
      do
        d = e(d, b.action), b = b.next;
      while (b !== f);
      zn(d, n.memoizedState) || (Zt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, l];
  }
  function mp(e, n, i) {
    var l = Ye, f = qt(), d = it;
    if (d) {
      if (i === void 0) throw Error(o(407));
      i = i();
    } else i = n();
    var b = !zn(
      (Et || f).memoizedState,
      i
    );
    if (b && (f.memoizedState = i, Zt = !0), f = f.queue, df(yp.bind(null, l, f, e), [
      e
    ]), f.getSnapshot !== n || b || It !== null && It.memoizedState.tag & 1) {
      if (l.flags |= 2048, Gr(
        9,
        { destroy: void 0 },
        gp.bind(
          null,
          l,
          f,
          i,
          n
        ),
        null
      ), Ct === null) throw Error(o(349));
      d || ($a & 127) !== 0 || pp(l, n, i);
    }
    return i;
  }
  function pp(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = Ye.updateQueue, n === null ? (n = ws(), Ye.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function gp(e, n, i, l) {
    n.value = i, n.getSnapshot = l, vp(n) && bp(e);
  }
  function yp(e, n, i) {
    return i(function() {
      vp(n) && bp(e);
    });
  }
  function vp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !zn(e, i);
    } catch {
      return !0;
    }
  }
  function bp(e) {
    var n = Ki(e, 2);
    n !== null && Rn(n, e, 2);
  }
  function cf(e) {
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
  function xp(e, n, i, l) {
    return e.baseState = i, sf(
      e,
      Et,
      typeof l == "function" ? l : Xa
    );
  }
  function FS(e, n, i, l, f) {
    if (Cs(e)) throw Error(o(485));
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
        then: function(b) {
          d.listeners.push(b);
        }
      };
      _.T !== null ? i(!0) : d.isTransition = !1, l(d), i = n.pending, i === null ? (d.next = n.pending = d, Sp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function Sp(e, n) {
    var i = n.action, l = n.payload, f = e.state;
    if (n.isTransition) {
      var d = _.T, b = {};
      _.T = b;
      try {
        var C = i(f, l), Y = _.S;
        Y !== null && Y(b, C), wp(e, n, C);
      } catch (ie) {
        ff(e, n, ie);
      } finally {
        d !== null && b.types !== null && (d.types = b.types), _.T = d;
      }
    } else
      try {
        d = i(f, l), wp(e, n, d);
      } catch (ie) {
        ff(e, n, ie);
      }
  }
  function wp(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        Ep(e, n, l);
      },
      function(l) {
        return ff(e, n, l);
      }
    ) : Ep(e, n, i);
  }
  function Ep(e, n, i) {
    n.status = "fulfilled", n.value = i, _p(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, Sp(e, i)));
  }
  function ff(e, n, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = i, _p(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function _p(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Np(e, n) {
    return n;
  }
  function Rp(e, n) {
    if (it) {
      var i = Ct.formState;
      if (i !== null) {
        e: {
          var l = Ye;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, d = Fn; f.nodeType !== 8; ) {
                  if (!d) {
                    f = null;
                    break t;
                  }
                  if (f = Pn(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                d = f.data, f = d === "F!" || d === "F" ? f : null;
              }
              if (f) {
                Tt = Pn(
                  f.nextSibling
                ), l = f.data === "F!";
                break e;
              }
            }
            gi(l);
          }
          l = !1;
        }
        l && (n = i[0]);
      }
    }
    return i = gn(), i.memoizedState = i.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Np,
      lastRenderedState: n
    }, i.queue = l, i = Gp.bind(
      null,
      Ye,
      l
    ), l.dispatch = i, l = cf(!1), d = yf.bind(
      null,
      Ye,
      !1,
      l.queue
    ), l = gn(), f = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = f, i = FS.bind(
      null,
      Ye,
      f,
      d,
      i
    ), f.dispatch = i, l.memoizedState = e, [n, i, !1];
  }
  function Cp(e) {
    var n = qt();
    return Tp(n, Et, e);
  }
  function Tp(e, n, i) {
    if (n = sf(
      e,
      n,
      Np
    )[0], e = _s(Xa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Il(n);
      } catch (b) {
        throw b === Vr ? ms : b;
      }
    else l = n;
    n = qt();
    var f = n.queue, d = f.dispatch;
    return i !== n.memoizedState && (Ye.flags |= 2048, Gr(
      9,
      { destroy: void 0 },
      KS.bind(null, f, i),
      null
    )), [l, d, e];
  }
  function KS(e, n) {
    e.action = n;
  }
  function Mp(e) {
    var n = qt(), i = Et;
    if (i !== null)
      return Tp(n, i, e);
    qt(), n = n.memoizedState, i = qt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [n, l, !1];
  }
  function Gr(e, n, i, l) {
    return e = { tag: e, create: i, deps: l, inst: n, next: null }, n = Ye.updateQueue, n === null && (n = ws(), Ye.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Dp() {
    return qt().memoizedState;
  }
  function Ns(e, n, i, l) {
    var f = gn();
    Ye.flags |= e, f.memoizedState = Gr(
      1 | n,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function Rs(e, n, i, l) {
    var f = qt();
    l = l === void 0 ? null : l;
    var d = f.memoizedState.inst;
    Et !== null && l !== null && tf(l, Et.memoizedState.deps) ? f.memoizedState = Gr(n, d, i, l) : (Ye.flags |= e, f.memoizedState = Gr(
      1 | n,
      d,
      i,
      l
    ));
  }
  function Ap(e, n) {
    Ns(8390656, 8, e, n);
  }
  function df(e, n) {
    Rs(2048, 8, e, n);
  }
  function PS(e) {
    Ye.flags |= 4;
    var n = Ye.updateQueue;
    if (n === null)
      n = ws(), Ye.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function zp(e) {
    var n = qt().memoizedState;
    return PS({ ref: n, nextImpl: e }), function() {
      if ((ht & 2) !== 0) throw Error(o(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Op(e, n) {
    return Rs(4, 2, e, n);
  }
  function jp(e, n) {
    return Rs(4, 4, e, n);
  }
  function Lp(e, n) {
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
  function Hp(e, n, i) {
    i = i != null ? i.concat([e]) : null, Rs(4, 4, Lp.bind(null, n, e), i);
  }
  function hf() {
  }
  function Bp(e, n) {
    var i = qt();
    n = n === void 0 ? null : n;
    var l = i.memoizedState;
    return n !== null && tf(n, l[1]) ? l[0] : (i.memoizedState = [e, n], e);
  }
  function Up(e, n) {
    var i = qt();
    n = n === void 0 ? null : n;
    var l = i.memoizedState;
    if (n !== null && tf(n, l[1]))
      return l[0];
    if (l = e(), rr) {
      Ot(!0);
      try {
        e();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [l, n], l;
  }
  function mf(e, n, i) {
    return i === void 0 || ($a & 1073741824) !== 0 && (et & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = kg(), Ye.lanes |= e, Ni |= e, i);
  }
  function kp(e, n, i, l) {
    return zn(i, n) ? i : qr.current !== null ? (e = mf(e, i, l), zn(e, n) || (Zt = !0), e) : ($a & 42) === 0 || ($a & 1073741824) !== 0 && (et & 261930) === 0 ? (Zt = !0, e.memoizedState = i) : (e = kg(), Ye.lanes |= e, Ni |= e, n);
  }
  function Vp(e, n, i, l, f) {
    var d = L.p;
    L.p = d !== 0 && 8 > d ? d : 8;
    var b = _.T, C = {};
    _.T = C, yf(e, !1, n, i);
    try {
      var Y = f(), ie = _.S;
      if (ie !== null && ie(C, Y), Y !== null && typeof Y == "object" && typeof Y.then == "function") {
        var ue = IS(
          Y,
          l
        );
        Zl(
          e,
          n,
          ue,
          Un(e)
        );
      } else
        Zl(
          e,
          n,
          l,
          Un(e)
        );
    } catch (fe) {
      Zl(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Un()
      );
    } finally {
      L.p = d, b !== null && C.types !== null && (b.types = C.types), _.T = b;
    }
  }
  function JS() {
  }
  function pf(e, n, i, l) {
    if (e.tag !== 5) throw Error(o(476));
    var f = Yp(e).queue;
    Vp(
      e,
      f,
      n,
      Z,
      i === null ? JS : function() {
        return qp(e), i(l);
      }
    );
  }
  function Yp(e) {
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
  function qp(e) {
    var n = Yp(e);
    n.next === null && (n = e.alternate.memoizedState), Zl(
      e,
      n.next.queue,
      {},
      Un()
    );
  }
  function gf() {
    return ln(co);
  }
  function $p() {
    return qt().memoizedState;
  }
  function Xp() {
    return qt().memoizedState;
  }
  function WS(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Un();
          e = bi(i);
          var l = xi(n, e, i);
          l !== null && (Rn(l, n, i), ql(l, n, i)), n = { cache: Xc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function ew(e, n, i) {
    var l = Un();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(e) ? Ip(n, i) : (i = Oc(e, n, i, l), i !== null && (Rn(i, e, l), Zp(i, n, l)));
  }
  function Gp(e, n, i) {
    var l = Un();
    Zl(e, n, i, l);
  }
  function Zl(e, n, i, l) {
    var f = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Cs(e)) Ip(n, f);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var b = n.lastRenderedState, C = d(b, i);
          if (f.hasEagerState = !0, f.eagerState = C, zn(C, b))
            return os(e, n, f, 0), Ct === null && ls(), !1;
        } catch {
        } finally {
        }
      if (i = Oc(e, n, f, l), i !== null)
        return Rn(i, e, l), Zp(i, n, l), !0;
    }
    return !1;
  }
  function yf(e, n, i, l) {
    if (l = {
      lane: 2,
      revertLane: Ff(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(e)) {
      if (n) throw Error(o(479));
    } else
      n = Oc(
        e,
        i,
        l,
        2
      ), n !== null && Rn(n, e, 2);
  }
  function Cs(e) {
    var n = e.alternate;
    return e === Ye || n !== null && n === Ye;
  }
  function Ip(e, n) {
    $r = xs = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Zp(e, n, i) {
    if ((i & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, i |= l, n.lanes = i, Wt(e, i);
    }
  }
  var Ql = {
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
  Ql.useEffectEvent = Bt;
  var Qp = {
    readContext: ln,
    use: Es,
    useCallback: function(e, n) {
      return gn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: ln,
    useEffect: Ap,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Ns(
        4194308,
        4,
        Lp.bind(null, n, e),
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
      var l = e();
      if (rr) {
        Ot(!0);
        try {
          e();
        } finally {
          Ot(!1);
        }
      }
      return i.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, i) {
      var l = gn();
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
      return l.memoizedState = l.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, l.queue = e, e = e.dispatch = ew.bind(
        null,
        Ye,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = gn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = cf(e);
      var n = e.queue, i = Gp.bind(null, Ye, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: hf,
    useDeferredValue: function(e, n) {
      var i = gn();
      return mf(i, e, n);
    },
    useTransition: function() {
      var e = cf(!1);
      return e = Vp.bind(
        null,
        Ye,
        e.queue,
        !0,
        !1
      ), gn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, i) {
      var l = Ye, f = gn();
      if (it) {
        if (i === void 0)
          throw Error(o(407));
        i = i();
      } else {
        if (i = n(), Ct === null)
          throw Error(o(349));
        (et & 127) !== 0 || pp(l, n, i);
      }
      f.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return f.queue = d, Ap(yp.bind(null, l, d, e), [
        e
      ]), l.flags |= 2048, Gr(
        9,
        { destroy: void 0 },
        gp.bind(
          null,
          l,
          d,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var e = gn(), n = Ct.identifierPrefix;
      if (it) {
        var i = _a, l = Ea;
        i = (l & ~(1 << 32 - kt(l) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Ss++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = ZS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: gf,
    useFormState: Rp,
    useActionState: Rp,
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
      return n.queue = i, n = yf.bind(
        null,
        Ye,
        !0,
        i
      ), i.dispatch = n, [e, n];
    },
    useMemoCache: of,
    useCacheRefresh: function() {
      return gn().memoizedState = WS.bind(
        null,
        Ye
      );
    },
    useEffectEvent: function(e) {
      var n = gn(), i = { impl: e };
      return n.memoizedState = i, function() {
        if ((ht & 2) !== 0)
          throw Error(o(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, vf = {
    readContext: ln,
    use: Es,
    useCallback: Bp,
    useContext: ln,
    useEffect: df,
    useImperativeHandle: Hp,
    useInsertionEffect: Op,
    useLayoutEffect: jp,
    useMemo: Up,
    useReducer: _s,
    useRef: Dp,
    useState: function() {
      return _s(Xa);
    },
    useDebugValue: hf,
    useDeferredValue: function(e, n) {
      var i = qt();
      return kp(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = _s(Xa)[0], n = qt().memoizedState;
      return [
        typeof e == "boolean" ? e : Il(e),
        n
      ];
    },
    useSyncExternalStore: mp,
    useId: $p,
    useHostTransitionStatus: gf,
    useFormState: Cp,
    useActionState: Cp,
    useOptimistic: function(e, n) {
      var i = qt();
      return xp(i, Et, e, n);
    },
    useMemoCache: of,
    useCacheRefresh: Xp
  };
  vf.useEffectEvent = zp;
  var Fp = {
    readContext: ln,
    use: Es,
    useCallback: Bp,
    useContext: ln,
    useEffect: df,
    useImperativeHandle: Hp,
    useInsertionEffect: Op,
    useLayoutEffect: jp,
    useMemo: Up,
    useReducer: uf,
    useRef: Dp,
    useState: function() {
      return uf(Xa);
    },
    useDebugValue: hf,
    useDeferredValue: function(e, n) {
      var i = qt();
      return Et === null ? mf(i, e, n) : kp(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = uf(Xa)[0], n = qt().memoizedState;
      return [
        typeof e == "boolean" ? e : Il(e),
        n
      ];
    },
    useSyncExternalStore: mp,
    useId: $p,
    useHostTransitionStatus: gf,
    useFormState: Mp,
    useActionState: Mp,
    useOptimistic: function(e, n) {
      var i = qt();
      return Et !== null ? xp(i, Et, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: of,
    useCacheRefresh: Xp
  };
  Fp.useEffectEvent = zp;
  function bf(e, n, i, l) {
    n = e.memoizedState, i = i(l, n), i = i == null ? n : m({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var xf = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var l = Un(), f = bi(l);
      f.payload = n, i != null && (f.callback = i), n = xi(e, f, l), n !== null && (Rn(n, e, l), ql(n, e, l));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var l = Un(), f = bi(l);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = xi(e, f, l), n !== null && (Rn(n, e, l), ql(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = Un(), l = bi(i);
      l.tag = 2, n != null && (l.callback = n), n = xi(e, l, i), n !== null && (Rn(n, e, i), ql(n, e, i));
    }
  };
  function Kp(e, n, i, l, f, d, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, b) : n.prototype && n.prototype.isPureReactComponent ? !jl(i, l) || !jl(f, d) : !0;
  }
  function Pp(e, n, i, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, l), n.state !== e && xf.enqueueReplaceState(n, n.state, null);
  }
  function lr(e, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var l in n)
        l !== "ref" && (i[l] = n[l]);
    }
    if (e = e.defaultProps) {
      i === n && (i = m({}, i));
      for (var f in e)
        i[f] === void 0 && (i[f] = e[f]);
    }
    return i;
  }
  function Jp(e) {
    rs(e);
  }
  function Wp(e) {
    console.error(e);
  }
  function eg(e) {
    rs(e);
  }
  function Ts(e, n) {
    try {
      var i = e.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function tg(e, n, i) {
    try {
      var l = e.onCaughtError;
      l(i.value, {
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
    return i = bi(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ts(e, n);
    }, i;
  }
  function ng(e) {
    return e = bi(e), e.tag = 3, e;
  }
  function ag(e, n, i, l) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var d = l.value;
      e.payload = function() {
        return f(d);
      }, e.callback = function() {
        tg(n, i, l);
      };
    }
    var b = i.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      tg(n, i, l), typeof f != "function" && (Ri === null ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var C = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function tw(e, n, i, l, f) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = i.alternate, n !== null && Br(
        n,
        i,
        f,
        !0
      ), i = jn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Kn === null ? Vs() : i.alternate === null && Ut === 0 && (Ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, l === ps ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), If(e, l, f)), !1;
          case 22:
            return i.flags |= 65536, l === ps ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), If(e, l, f)), !1;
        }
        throw Error(o(435, i.tag));
      }
      return If(e, l, f), Vs(), !1;
    }
    if (it)
      return n = jn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, l !== kc && (e = Error(o(422), { cause: l }), Bl(In(e, i)))) : (l !== kc && (n = Error(o(423), {
        cause: l
      }), Bl(
        In(n, i)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, l = In(l, i), f = Sf(
        e.stateNode,
        l,
        f
      ), Kc(e, f), Ut !== 4 && (Ut = 2)), !1;
    var d = Error(o(520), { cause: l });
    if (d = In(d, i), no === null ? no = [d] : no.push(d), Ut !== 4 && (Ut = 2), n === null) return !0;
    l = In(l, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = f & -f, i.lanes |= e, e = Sf(i.stateNode, l, e), Kc(i, e), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Ri === null || !Ri.has(d))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = ng(f), ag(
              f,
              e,
              i,
              l
            ), Kc(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var wf = Error(o(461)), Zt = !1;
  function on(e, n, i, l) {
    n.child = e === null ? op(n, null, i, l) : ir(
      n,
      e.child,
      i,
      l
    );
  }
  function ig(e, n, i, l, f) {
    i = i.render;
    var d = n.ref;
    if ("ref" in l) {
      var b = {};
      for (var C in l)
        C !== "ref" && (b[C] = l[C]);
    } else b = l;
    return er(n), l = nf(
      e,
      n,
      i,
      b,
      d,
      f
    ), C = af(), e !== null && !Zt ? (rf(e, n, f), Ga(e, n, f)) : (it && C && Bc(n), n.flags |= 1, on(e, n, l, f), n.child);
  }
  function rg(e, n, i, l, f) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !jc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, lg(
        e,
        n,
        d,
        l,
        f
      )) : (e = us(
        i.type,
        null,
        l,
        n,
        n.mode,
        f
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, !Df(e, f)) {
      var b = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : jl, i(b, l) && e.ref === n.ref)
        return Ga(e, n, f);
    }
    return n.flags |= 1, e = ka(d, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function lg(e, n, i, l, f) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (jl(d, l) && e.ref === n.ref)
        if (Zt = !1, n.pendingProps = l = d, Df(e, f))
          (e.flags & 131072) !== 0 && (Zt = !0);
        else
          return n.lanes = e.lanes, Ga(e, n, f);
    }
    return Ef(
      e,
      n,
      i,
      l,
      f
    );
  }
  function og(e, n, i, l) {
    var f = l.children, d = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, e !== null) {
          for (l = n.child = e.child, f = 0; l !== null; )
            f = f | l.lanes | l.childLanes, l = l.sibling;
          l = f & ~d;
        } else l = 0, n.child = null;
        return sg(
          e,
          n,
          d,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && hs(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? cp(n, d) : Jc(), fp(n);
      else
        return l = n.lanes = 536870912, sg(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          l
        );
    } else
      d !== null ? (hs(n, d.cachePool), cp(n, d), wi(), n.memoizedState = null) : (e !== null && hs(n, null), Jc(), wi());
    return on(e, n, f, i), n.child;
  }
  function Fl(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function sg(e, n, i, l, f) {
    var d = Ic();
    return d = d === null ? null : { parent: Gt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && hs(n, null), Jc(), fp(n), e !== null && Br(e, n, l, !0), n.childLanes = f, null;
  }
  function Ms(e, n) {
    return n = As(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function ug(e, n, i) {
    return ir(n, e.child, null, i), e = Ms(n, n.pendingProps), e.flags |= 2, Ln(n), n.memoizedState = null, e;
  }
  function nw(e, n, i) {
    var l = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (it) {
        if (l.mode === "hidden")
          return e = Ms(n, l), n.lanes = 536870912, Fl(null, e);
        if (ef(n), (e = Tt) ? (e = S0(
          e,
          Fn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: mi !== null ? { id: Ea, overflow: _a } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Im(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw gi(n);
        return n.lanes = 536870912, null;
      }
      return Ms(n, l);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var b = d.dehydrated;
      if (ef(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = ug(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(o(558));
      else if (Zt || Br(e, n, i, !1), f = (i & e.childLanes) !== 0, Zt || f) {
        if (l = Ct, l !== null && (b = B(l, i), b !== 0 && b !== d.retryLane))
          throw d.retryLane = b, Ki(e, b), Rn(l, e, b), wf;
        Vs(), n = ug(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, Tt = Pn(b.nextSibling), rn = n, it = !0, pi = null, Fn = !1, e !== null && Fm(n, e), n = Ms(n, l), n.flags |= 4096;
      return n;
    }
    return e = ka(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function Ds(e, n) {
    var i = n.ref;
    if (i === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(o(284));
      (e === null || e.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Ef(e, n, i, l, f) {
    return er(n), i = nf(
      e,
      n,
      i,
      l,
      void 0,
      f
    ), l = af(), e !== null && !Zt ? (rf(e, n, f), Ga(e, n, f)) : (it && l && Bc(n), n.flags |= 1, on(e, n, i, f), n.child);
  }
  function cg(e, n, i, l, f, d) {
    return er(n), n.updateQueue = null, i = hp(
      n,
      l,
      i,
      f
    ), dp(e), l = af(), e !== null && !Zt ? (rf(e, n, d), Ga(e, n, d)) : (it && l && Bc(n), n.flags |= 1, on(e, n, i, d), n.child);
  }
  function fg(e, n, i, l, f) {
    if (er(n), n.stateNode === null) {
      var d = Or, b = i.contextType;
      typeof b == "object" && b !== null && (d = ln(b)), d = new i(l, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = xf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = l, d.state = n.memoizedState, d.refs = {}, Qc(n), b = i.contextType, d.context = typeof b == "object" && b !== null ? ln(b) : Or, d.state = n.memoizedState, b = i.getDerivedStateFromProps, typeof b == "function" && (bf(
        n,
        i,
        b,
        l
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (b = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), b !== d.state && xf.enqueueReplaceState(d, d.state, null), Xl(n, l, d, f), $l(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      d = n.stateNode;
      var C = n.memoizedProps, Y = lr(i, C);
      d.props = Y;
      var ie = d.context, ue = i.contextType;
      b = Or, typeof ue == "object" && ue !== null && (b = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || ie !== b) && Pp(
        n,
        d,
        l,
        b
      ), vi = !1;
      var re = n.memoizedState;
      d.state = re, Xl(n, l, d, f), $l(), ie = n.memoizedState, C || re !== ie || vi ? (typeof fe == "function" && (bf(
        n,
        i,
        fe,
        l
      ), ie = n.memoizedState), (Y = vi || Kp(
        n,
        i,
        Y,
        l,
        re,
        ie,
        b
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ie), d.props = l, d.state = ie, d.context = b, l = Y) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      d = n.stateNode, Fc(e, n), b = n.memoizedProps, ue = lr(i, b), d.props = ue, fe = n.pendingProps, re = d.context, ie = i.contextType, Y = Or, typeof ie == "object" && ie !== null && (Y = ln(ie)), C = i.getDerivedStateFromProps, (ie = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (b !== fe || re !== Y) && Pp(
        n,
        d,
        l,
        Y
      ), vi = !1, re = n.memoizedState, d.state = re, Xl(n, l, d, f), $l();
      var oe = n.memoizedState;
      b !== fe || re !== oe || vi || e !== null && e.dependencies !== null && fs(e.dependencies) ? (typeof C == "function" && (bf(
        n,
        i,
        C,
        l
      ), oe = n.memoizedState), (ue = vi || Kp(
        n,
        i,
        ue,
        l,
        re,
        oe,
        Y
      ) || e !== null && e.dependencies !== null && fs(e.dependencies)) ? (ie || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, oe, Y), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        l,
        oe,
        Y
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && re === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && re === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), d.props = l, d.state = oe, d.context = Y, l = ue) : (typeof d.componentDidUpdate != "function" || b === e.memoizedProps && re === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && re === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return d = l, Ds(e, n), l = (n.flags & 128) !== 0, d || l ? (d = n.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && l ? (n.child = ir(
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
  function dg(e, n, i, l) {
    return Ji(), n.flags |= 256, on(e, n, i, l), n.child;
  }
  var _f = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Nf(e) {
    return { baseLanes: e, cachePool: tp() };
  }
  function Rf(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= Bn), e;
  }
  function hg(e, n, i) {
    var l = n.pendingProps, f = !1, d = (n.flags & 128) !== 0, b;
    if ((b = d) || (b = e !== null && e.memoizedState === null ? !1 : (Yt.current & 2) !== 0), b && (f = !0, n.flags &= -129), b = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (it) {
        if (f ? Si(n) : wi(), (e = Tt) ? (e = S0(
          e,
          Fn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: mi !== null ? { id: Ea, overflow: _a } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Im(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw gi(n);
        return sd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var C = l.children;
      return l = l.fallback, f ? (wi(), f = n.mode, C = As(
        { mode: "hidden", children: C },
        f
      ), l = Pi(
        l,
        f,
        i,
        null
      ), C.return = n, l.return = n, C.sibling = l, n.child = C, l = n.child, l.memoizedState = Nf(i), l.childLanes = Rf(
        e,
        b,
        i
      ), n.memoizedState = _f, Fl(null, l)) : (Si(n), Cf(n, C));
    }
    var Y = e.memoizedState;
    if (Y !== null && (C = Y.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (Si(n), n.flags &= -257, n = Tf(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (wi(), n.child = e.child, n.flags |= 128, n = null) : (wi(), C = l.fallback, f = n.mode, l = As(
          { mode: "visible", children: l.children },
          f
        ), C = Pi(
          C,
          f,
          i,
          null
        ), C.flags |= 2, l.return = n, C.return = n, l.sibling = C, n.child = l, ir(
          n,
          e.child,
          null,
          i
        ), l = n.child, l.memoizedState = Nf(i), l.childLanes = Rf(
          e,
          b,
          i
        ), n.memoizedState = _f, n = Fl(null, l));
      else if (Si(n), sd(C)) {
        if (b = C.nextSibling && C.nextSibling.dataset, b) var ie = b.dgst;
        b = ie, l = Error(o(419)), l.stack = "", l.digest = b, Bl({ value: l, source: null, stack: null }), n = Tf(
          e,
          n,
          i
        );
      } else if (Zt || Br(e, n, i, !1), b = (i & e.childLanes) !== 0, Zt || b) {
        if (b = Ct, b !== null && (l = B(b, i), l !== 0 && l !== Y.retryLane))
          throw Y.retryLane = l, Ki(e, l), Rn(b, e, l), wf;
        od(C) || Vs(), n = Tf(
          e,
          n,
          i
        );
      } else
        od(C) ? (n.flags |= 192, n.child = e.child, n = null) : (e = Y.treeContext, Tt = Pn(
          C.nextSibling
        ), rn = n, it = !0, pi = null, Fn = !1, e !== null && Fm(n, e), n = Cf(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (wi(), C = l.fallback, f = n.mode, Y = e.child, ie = Y.sibling, l = ka(Y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = Y.subtreeFlags & 65011712, ie !== null ? C = ka(
      ie,
      C
    ) : (C = Pi(
      C,
      f,
      i,
      null
    ), C.flags |= 2), C.return = n, l.return = n, l.sibling = C, n.child = l, Fl(null, l), l = n.child, C = e.child.memoizedState, C === null ? C = Nf(i) : (f = C.cachePool, f !== null ? (Y = Gt._currentValue, f = f.parent !== Y ? { parent: Y, pool: Y } : f) : f = tp(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: f
    }), l.memoizedState = C, l.childLanes = Rf(
      e,
      b,
      i
    ), n.memoizedState = _f, Fl(e.child, l)) : (Si(n), i = e.child, e = i.sibling, i = ka(i, {
      mode: "visible",
      children: l.children
    }), i.return = n, i.sibling = null, e !== null && (b = n.deletions, b === null ? (n.deletions = [e], n.flags |= 16) : b.push(e)), n.child = i, n.memoizedState = null, i);
  }
  function Cf(e, n) {
    return n = As(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function As(e, n) {
    return e = On(22, e, null, n), e.lanes = 0, e;
  }
  function Tf(e, n, i) {
    return ir(n, e.child, null, i), e = Cf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function mg(e, n, i) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), qc(e.return, n, i);
  }
  function Mf(e, n, i, l, f, d) {
    var b = e.memoizedState;
    b === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: i,
      tailMode: f,
      treeForkCount: d
    } : (b.isBackwards = n, b.rendering = null, b.renderingStartTime = 0, b.last = l, b.tail = i, b.tailMode = f, b.treeForkCount = d);
  }
  function pg(e, n, i) {
    var l = n.pendingProps, f = l.revealOrder, d = l.tail;
    l = l.children;
    var b = Yt.current, C = (b & 2) !== 0;
    if (C ? (b = b & 1 | 2, n.flags |= 128) : b &= 1, F(Yt, b), on(e, n, l, i), l = it ? Hl : 0, !C && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && mg(e, i, n);
        else if (e.tag === 19)
          mg(e, i, n);
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
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), Mf(
          n,
          !1,
          f,
          i,
          d,
          l
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
        Mf(
          n,
          !0,
          i,
          null,
          d,
          l
        );
        break;
      case "together":
        Mf(
          n,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ga(e, n, i) {
    if (e !== null && (n.dependencies = e.dependencies), Ni |= n.lanes, (i & n.childLanes) === 0)
      if (e !== null) {
        if (Br(
          e,
          n,
          i,
          !1
        ), (i & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(o(153));
    if (n.child !== null) {
      for (e = n.child, i = ka(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        e = e.sibling, i = i.sibling = ka(e, e.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Df(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fs(e)));
  }
  function aw(e, n, i) {
    switch (n.tag) {
      case 3:
        ee(n, n.stateNode.containerInfo), yi(n, Gt, e.memoizedState.cache), Ji();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        ee(n, n.stateNode.containerInfo);
        break;
      case 10:
        yi(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, ef(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Si(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? hg(e, n, i) : (Si(n), e = Ga(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        Si(n);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (l = (i & n.childLanes) !== 0, l || (Br(
          e,
          n,
          i,
          !1
        ), l = (i & n.childLanes) !== 0), f) {
          if (l)
            return pg(
              e,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), F(Yt, Yt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, og(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        yi(n, Gt, e.memoizedState.cache);
    }
    return Ga(e, n, i);
  }
  function gg(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Zt = !0;
      else {
        if (!Df(e, i) && (n.flags & 128) === 0)
          return Zt = !1, aw(
            e,
            n,
            i
          );
        Zt = (e.flags & 131072) !== 0;
      }
    else
      Zt = !1, it && (n.flags & 1048576) !== 0 && Qm(n, Hl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = nr(n.elementType), n.type = e, typeof e == "function")
            jc(e) ? (l = lr(e, l), n.tag = 1, n = fg(
              null,
              n,
              e,
              l,
              i
            )) : (n.tag = 0, n = Ef(
              null,
              n,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var f = e.$$typeof;
              if (f === j) {
                n.tag = 11, n = ig(
                  null,
                  n,
                  e,
                  l,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = rg(
                  null,
                  n,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw n = O(e) || e, Error(o(306, n, ""));
          }
        }
        return n;
      case 0:
        return Ef(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return l = n.type, f = lr(
          l,
          n.pendingProps
        ), fg(
          e,
          n,
          l,
          f,
          i
        );
      case 3:
        e: {
          if (ee(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = n.pendingProps;
          var d = n.memoizedState;
          f = d.element, Fc(e, n), Xl(n, l, null, i);
          var b = n.memoizedState;
          if (l = b.cache, yi(n, Gt, l), l !== d.cache && $c(
            n,
            [Gt],
            i,
            !0
          ), $l(), l = b.element, d.isDehydrated)
            if (d = {
              element: l,
              isDehydrated: !1,
              cache: b.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = dg(
                e,
                n,
                l,
                i
              );
              break e;
            } else if (l !== f) {
              f = In(
                Error(o(424)),
                n
              ), Bl(f), n = dg(
                e,
                n,
                l,
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
              for (Tt = Pn(e.firstChild), rn = n, it = !0, pi = null, Fn = !0, i = op(
                n,
                null,
                l,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Ji(), l === f) {
              n = Ga(
                e,
                n,
                i
              );
              break e;
            }
            on(e, n, l, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Ds(e, n), e === null ? (i = C0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, e = n.pendingProps, l = Zs(
          he.current
        ).createElement(i), l[ve] = n, l[Se] = e, sn(l, i, e), at(l), n.stateNode = l) : n.memoizedState = C0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && it && (l = n.stateNode = _0(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Fn = !0, f = Tt, Di(n.type) ? (ud = f, Tt = Pn(l.firstChild)) : Tt = f), on(
          e,
          n,
          n.pendingProps.children,
          i
        ), Ds(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && it && ((f = l = Tt) && (l = Ow(
          l,
          n.type,
          n.pendingProps,
          Fn
        ), l !== null ? (n.stateNode = l, rn = n, Tt = Pn(l.firstChild), Fn = !1, f = !0) : f = !1), f || gi(n)), ze(n), f = n.type, d = n.pendingProps, b = e !== null ? e.memoizedProps : null, l = d.children, id(f, d) ? l = null : b !== null && id(f, b) && (n.flags |= 32), n.memoizedState !== null && (f = nf(
          e,
          n,
          QS,
          null,
          null,
          i
        ), co._currentValue = f), Ds(e, n), on(e, n, l, i), n.child;
      case 6:
        return e === null && it && ((e = i = Tt) && (i = jw(
          i,
          n.pendingProps,
          Fn
        ), i !== null ? (n.stateNode = i, rn = n, Tt = null, e = !0) : e = !1), e || gi(n)), null;
      case 13:
        return hg(e, n, i);
      case 4:
        return ee(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = ir(
          n,
          null,
          l,
          i
        ) : on(e, n, l, i), n.child;
      case 11:
        return ig(
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
        return l = n.pendingProps, yi(n, n.type, l.value), on(e, n, l.children, i), n.child;
      case 9:
        return f = n.type._context, l = n.pendingProps.children, er(n), f = ln(f), l = l(f), n.flags |= 1, on(e, n, l, i), n.child;
      case 14:
        return rg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return lg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return pg(e, n, i);
      case 31:
        return nw(e, n, i);
      case 22:
        return og(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return er(n), l = ln(Gt), e === null ? (f = Ic(), f === null && (f = Ct, d = Xc(), f.pooledCache = d, d.refCount++, d !== null && (f.pooledCacheLanes |= i), f = d), n.memoizedState = { parent: l, cache: f }, Qc(n), yi(n, Gt, f)) : ((e.lanes & i) !== 0 && (Fc(e, n), Xl(n, null, null, i), $l()), f = e.memoizedState, d = n.memoizedState, f.parent !== l ? (f = { parent: l, cache: l }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), yi(n, Gt, l)) : (l = d.cache, yi(n, Gt, l), l !== f.cache && $c(
          n,
          [Gt],
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
    throw Error(o(156, n.tag));
  }
  function Ia(e) {
    e.flags |= 4;
  }
  function Af(e, n, i, l, f) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if ($g()) e.flags |= 8192;
        else
          throw ar = ps, Zc;
    } else e.flags &= -16777217;
  }
  function yg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !z0(n))
      if ($g()) e.flags |= 8192;
      else
        throw ar = ps, Zc;
  }
  function zs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Vt() : 536870912, e.lanes |= n, Fr |= n);
  }
  function Kl(e, n) {
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
          for (var l = null; i !== null; )
            i.alternate !== null && (l = i), i = i.sibling;
          l === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function Mt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, i = 0, l = 0;
    if (n)
      for (var f = e.child; f !== null; )
        i |= f.lanes | f.childLanes, l |= f.subtreeFlags & 65011712, l |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        i |= f.lanes | f.childLanes, l |= f.subtreeFlags, l |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= l, e.childLanes = i, n;
  }
  function iw(e, n, i) {
    var l = n.pendingProps;
    switch (Uc(n), n.tag) {
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
        return i = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), qa(Gt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Hr(n) ? Ia(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Vc())), Mt(n), null;
      case 26:
        var f = n.type, d = n.memoizedState;
        return e === null ? (Ia(n), d !== null ? (Mt(n), yg(n, d)) : (Mt(n), Af(
          n,
          f,
          null,
          l,
          i
        ))) : d ? d !== e.memoizedState ? (Ia(n), Mt(n), yg(n, d)) : (Mt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ia(n), Mt(n), Af(
          n,
          f,
          e,
          l,
          i
        )), null;
      case 27:
        if (Ce(n), i = he.current, f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Ia(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(o(166));
            return Mt(n), null;
          }
          e = te.current, Hr(n) ? Km(n) : (e = _0(f, l, i), n.stateNode = e, Ia(n));
        }
        return Mt(n), null;
      case 5:
        if (Ce(n), f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Ia(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(o(166));
            return Mt(n), null;
          }
          if (d = te.current, Hr(n))
            Km(n);
          else {
            var b = Zs(
              he.current
            );
            switch (d) {
              case 1:
                d = b.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                d = b.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    d = b.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    d = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    d = b.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof l.is == "string" ? b.createElement("select", {
                      is: l.is
                    }) : b.createElement("select"), l.multiple ? d.multiple = !0 : l.size && (d.size = l.size);
                    break;
                  default:
                    d = typeof l.is == "string" ? b.createElement(f, { is: l.is }) : b.createElement(f);
                }
            }
            d[ve] = n, d[Se] = l;
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
            e: switch (sn(d, f, l), f) {
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
            l && Ia(n);
          }
        }
        return Mt(n), Af(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== l && Ia(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(o(166));
          if (e = he.current, Hr(n)) {
            if (e = n.stateNode, i = n.memoizedProps, l = null, f = rn, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  l = f.memoizedProps;
              }
            e[ve] = n, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || h0(e.nodeValue, i)), e || gi(n, !0);
          } else
            e = Zs(e).createTextNode(
              l
            ), e[ve] = n, n.stateNode = e;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Hr(n), i !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ve] = n;
            } else
              Ji(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), e = !1;
          } else
            i = Vc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Mt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = Hr(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(o(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(o(317));
              f[ve] = n;
            } else
              Ji(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = Vc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
        }
        return Ln(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = n.child, f = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (f = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== f && (l.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), zs(n, n.updateQueue), Mt(n), null);
      case 4:
        return ge(), e === null && Wf(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return qa(n.type), Mt(n), null;
      case 19:
        if (k(Yt), l = n.memoizedState, l === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, d = l.rendering, d === null)
          if (f) Kl(l, !1);
          else {
            if (Ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = bs(e), d !== null) {
                  for (n.flags |= 128, Kl(l, !1), e = d.updateQueue, n.updateQueue = e, zs(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    Gm(i, e), i = i.sibling;
                  return F(
                    Yt,
                    Yt.current & 1 | 2
                  ), it && Va(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Fe() > Bs && (n.flags |= 128, f = !0, Kl(l, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = bs(d), e !== null) {
              if (n.flags |= 128, f = !0, e = e.updateQueue, n.updateQueue = e, zs(n, e), Kl(l, !0), l.tail === null && l.tailMode === "hidden" && !d.alternate && !it)
                return Mt(n), null;
            } else
              2 * Fe() - l.renderingStartTime > Bs && i !== 536870912 && (n.flags |= 128, f = !0, Kl(l, !1), n.lanes = 4194304);
          l.isBackwards ? (d.sibling = n.child, n.child = d) : (e = l.last, e !== null ? e.sibling = d : n.child = d, l.last = d);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Fe(), e.sibling = null, i = Yt.current, F(
          Yt,
          f ? i & 1 | 2 : i & 1
        ), it && Va(n, l.treeForkCount), e) : (Mt(n), null);
      case 22:
      case 23:
        return Ln(n), Wc(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && zs(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== i && (n.flags |= 2048), e !== null && k(tr), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), qa(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function rw(e, n) {
    switch (Uc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return qa(Gt), ge(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ce(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Ln(n), n.alternate === null)
            throw Error(o(340));
          Ji();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Ln(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(o(340));
          Ji();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return k(Yt), null;
      case 4:
        return ge(), null;
      case 10:
        return qa(n.type), null;
      case 22:
      case 23:
        return Ln(n), Wc(), e !== null && k(tr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return qa(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function vg(e, n) {
    switch (Uc(n), n.tag) {
      case 3:
        qa(Gt), ge();
        break;
      case 26:
      case 27:
      case 5:
        Ce(n);
        break;
      case 4:
        ge();
        break;
      case 31:
        n.memoizedState !== null && Ln(n);
        break;
      case 13:
        Ln(n);
        break;
      case 19:
        k(Yt);
        break;
      case 10:
        qa(n.type);
        break;
      case 22:
      case 23:
        Ln(n), Wc(), e !== null && k(tr);
        break;
      case 24:
        qa(Gt);
    }
  }
  function Pl(e, n) {
    try {
      var i = n.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var f = l.next;
        i = f;
        do {
          if ((i.tag & e) === e) {
            l = void 0;
            var d = i.create, b = i.inst;
            l = d(), b.destroy = l;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (C) {
      St(n, n.return, C);
    }
  }
  function Ei(e, n, i) {
    try {
      var l = n.updateQueue, f = l !== null ? l.lastEffect : null;
      if (f !== null) {
        var d = f.next;
        l = d;
        do {
          if ((l.tag & e) === e) {
            var b = l.inst, C = b.destroy;
            if (C !== void 0) {
              b.destroy = void 0, f = n;
              var Y = i, ie = C;
              try {
                ie();
              } catch (ue) {
                St(
                  f,
                  Y,
                  ue
                );
              }
            }
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (ue) {
      St(n, n.return, ue);
    }
  }
  function bg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        up(n, i);
      } catch (l) {
        St(e, e.return, l);
      }
    }
  }
  function xg(e, n, i) {
    i.props = lr(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      St(e, n, l);
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
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof i == "function" ? e.refCleanup = i(l) : i.current = l;
      }
    } catch (f) {
      St(e, n, f);
    }
  }
  function Na(e, n) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (f) {
          St(e, n, f);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          St(e, n, f);
        }
      else i.current = null;
  }
  function Sg(e) {
    var n = e.type, i = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break e;
        case "img":
          i.src ? l.src = i.src : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (f) {
      St(e, e.return, f);
    }
  }
  function zf(e, n, i) {
    try {
      var l = e.stateNode;
      Cw(l, e.type, i, n), l[Se] = n;
    } catch (f) {
      St(e, e.return, f);
    }
  }
  function wg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Di(e.type) || e.tag === 4;
  }
  function Of(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || wg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Di(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function jf(e, n, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ba));
    else if (l !== 4 && (l === 27 && Di(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (jf(e, n, i), e = e.sibling; e !== null; )
        jf(e, n, i), e = e.sibling;
  }
  function Os(e, n, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && Di(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Os(e, n, i), e = e.sibling; e !== null; )
        Os(e, n, i), e = e.sibling;
  }
  function Eg(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, l, i), n[ve] = e, n[Se] = i;
    } catch (d) {
      St(e, e.return, d);
    }
  }
  var Za = !1, Qt = !1, Lf = !1, _g = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function lw(e, n) {
    if (e = e.containerInfo, nd = eu, e = Hm(e), Cc(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var l = i.getSelection && i.getSelection();
          if (l && l.rangeCount !== 0) {
            i = l.anchorNode;
            var f = l.anchorOffset, d = l.focusNode;
            l = l.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var b = 0, C = -1, Y = -1, ie = 0, ue = 0, fe = e, re = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (C = b + f), fe !== d || l !== 0 && fe.nodeType !== 3 || (Y = b + l), fe.nodeType === 3 && (b += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                re = fe, fe = oe;
              for (; ; ) {
                if (fe === e) break t;
                if (re === i && ++ie === f && (C = b), re === d && ++ue === l && (Y = b), (oe = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = oe;
            }
            i = C === -1 || Y === -1 ? null : { start: C, end: Y };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (ad = { focusedElem: e, selectionRange: i }, eu = !1, en = n; en !== null; )
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
                e = void 0, i = n, f = d.memoizedProps, d = d.memoizedState, l = i.stateNode;
                try {
                  var _e = lr(
                    i.type,
                    f
                  );
                  e = l.getSnapshotBeforeUpdate(
                    _e,
                    d
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
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
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, i = e.nodeType, i === 9)
                  ld(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ld(e);
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
            e.return = n.return, en = e;
            break;
          }
          en = n.return;
        }
  }
  function Ng(e, n, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Fa(e, i), l & 4 && Pl(5, i);
        break;
      case 1:
        if (Fa(e, i), l & 4)
          if (e = i.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (b) {
              St(i, i.return, b);
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
            } catch (b) {
              St(
                i,
                i.return,
                b
              );
            }
          }
        l & 64 && bg(i), l & 512 && Jl(i, i.return);
        break;
      case 3:
        if (Fa(e, i), l & 64 && (e = i.updateQueue, e !== null)) {
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
            up(e, n);
          } catch (b) {
            St(i, i.return, b);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Eg(i);
      case 26:
      case 5:
        Fa(e, i), n === null && l & 4 && Sg(i), l & 512 && Jl(i, i.return);
        break;
      case 12:
        Fa(e, i);
        break;
      case 31:
        Fa(e, i), l & 4 && Tg(e, i);
        break;
      case 13:
        Fa(e, i), l & 4 && Mg(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = pw.bind(
          null,
          i
        ), Lw(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || Za, !l) {
          n = n !== null && n.memoizedState !== null || Qt, f = Za;
          var d = Qt;
          Za = l, (Qt = n) && !d ? Ka(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Fa(e, i), Za = f, Qt = d;
        }
        break;
      case 30:
        break;
      default:
        Fa(e, i);
    }
  }
  function Rg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Rg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && rt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Dt = null, wn = !1;
  function Qa(e, n, i) {
    for (i = i.child; i !== null; )
      Cg(e, n, i), i = i.sibling;
  }
  function Cg(e, n, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(tn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Qt || Na(i, n), Qa(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Qt || Na(i, n);
        var l = Dt, f = wn;
        Di(i.type) && (Dt = i.stateNode, wn = !1), Qa(
          e,
          n,
          i
        ), oo(i.stateNode), Dt = l, wn = f;
        break;
      case 5:
        Qt || Na(i, n);
      case 6:
        if (l = Dt, f = wn, Dt = null, Qa(
          e,
          n,
          i
        ), Dt = l, wn = f, Dt !== null)
          if (wn)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(i.stateNode);
            } catch (d) {
              St(
                i,
                n,
                d
              );
            }
          else
            try {
              Dt.removeChild(i.stateNode);
            } catch (d) {
              St(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Dt !== null && (wn ? (e = Dt, b0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), al(e)) : b0(Dt, i.stateNode));
        break;
      case 4:
        l = Dt, f = wn, Dt = i.stateNode.containerInfo, wn = !0, Qa(
          e,
          n,
          i
        ), Dt = l, wn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ei(2, i, n), Qt || Ei(4, i, n), Qa(
          e,
          n,
          i
        );
        break;
      case 1:
        Qt || (Na(i, n), l = i.stateNode, typeof l.componentWillUnmount == "function" && xg(
          i,
          n,
          l
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
        Qt = (l = Qt) || i.memoizedState !== null, Qa(
          e,
          n,
          i
        ), Qt = l;
        break;
      default:
        Qa(
          e,
          n,
          i
        );
    }
  }
  function Tg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        al(e);
      } catch (i) {
        St(n, n.return, i);
      }
    }
  }
  function Mg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        al(e);
      } catch (i) {
        St(n, n.return, i);
      }
  }
  function ow(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new _g()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new _g()), n;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function js(e, n) {
    var i = ow(e);
    n.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var f = gw.bind(null, e, l);
        l.then(f, f);
      }
    });
  }
  function En(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var f = i[l], d = e, b = n, C = b;
        e: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (Di(C.type)) {
                Dt = C.stateNode, wn = !1;
                break e;
              }
              break;
            case 5:
              Dt = C.stateNode, wn = !1;
              break e;
            case 3:
            case 4:
              Dt = C.stateNode.containerInfo, wn = !0;
              break e;
          }
          C = C.return;
        }
        if (Dt === null) throw Error(o(160));
        Cg(d, b, f), Dt = null, wn = !1, d = f.alternate, d !== null && (d.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Dg(n, e), n = n.sibling;
  }
  var ca = null;
  function Dg(e, n) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        En(n, e), _n(e), l & 4 && (Ei(3, e, e.return), Pl(3, e), Ei(5, e, e.return));
        break;
      case 1:
        En(n, e), _n(e), l & 512 && (Qt || i === null || Na(i, i.return)), l & 64 && Za && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var f = ca;
        if (En(n, e), _n(e), l & 512 && (Qt || i === null || Na(i, i.return)), l & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, f = f.ownerDocument || f;
                  t: switch (l) {
                    case "title":
                      d = f.getElementsByTagName("title")[0], (!d || d[Ge] || d[ve] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = f.createElement(l), f.head.insertBefore(
                        d,
                        f.querySelector("head > title")
                      )), sn(d, l, i), d[ve] = e, at(d), l = d;
                      break e;
                    case "link":
                      var b = D0(
                        "link",
                        "href",
                        f
                      ).get(l + (i.href || ""));
                      if (b) {
                        for (var C = 0; C < b.length; C++)
                          if (d = b[C], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            b.splice(C, 1);
                            break t;
                          }
                      }
                      d = f.createElement(l), sn(d, l, i), f.head.appendChild(d);
                      break;
                    case "meta":
                      if (b = D0(
                        "meta",
                        "content",
                        f
                      ).get(l + (i.content || ""))) {
                        for (C = 0; C < b.length; C++)
                          if (d = b[C], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            b.splice(C, 1);
                            break t;
                          }
                      }
                      d = f.createElement(l), sn(d, l, i), f.head.appendChild(d);
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  d[ve] = e, at(d), l = d;
                }
                e.stateNode = l;
              } else
                A0(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = M0(
                f,
                l,
                e.memoizedProps
              );
          else
            d !== l ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, l === null ? A0(
              f,
              e.type,
              e.stateNode
            ) : M0(
              f,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && zf(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        En(n, e), _n(e), l & 512 && (Qt || i === null || Na(i, i.return)), i !== null && l & 4 && zf(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (En(n, e), _n(e), l & 512 && (Qt || i === null || Na(i, i.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Rr(f, "");
          } catch (_e) {
            St(e, e.return, _e);
          }
        }
        l & 4 && e.stateNode != null && (f = e.memoizedProps, zf(
          e,
          f,
          i !== null ? i.memoizedProps : f
        )), l & 1024 && (Lf = !0);
        break;
      case 6:
        if (En(n, e), _n(e), l & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (_e) {
            St(e, e.return, _e);
          }
        }
        break;
      case 3:
        if (Ks = null, f = ca, ca = Qs(n.containerInfo), En(n, e), ca = f, _n(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            al(n.containerInfo);
          } catch (_e) {
            St(e, e.return, _e);
          }
        Lf && (Lf = !1, Ag(e));
        break;
      case 4:
        l = ca, ca = Qs(
          e.stateNode.containerInfo
        ), En(n, e), _n(e), ca = l;
        break;
      case 12:
        En(n, e), _n(e);
        break;
      case 31:
        En(n, e), _n(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, js(e, l)));
        break;
      case 13:
        En(n, e), _n(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Hs = Fe()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, js(e, l)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var Y = i !== null && i.memoizedState !== null, ie = Za, ue = Qt;
        if (Za = ie || f, Qt = ue || Y, En(n, e), Qt = ue, Za = ie, _n(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || Y || Za || Qt || or(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                Y = i = n;
                try {
                  if (d = Y.stateNode, f)
                    b = d.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    C = Y.stateNode;
                    var fe = Y.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    C.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
                  }
                } catch (_e) {
                  St(Y, Y.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                Y = n;
                try {
                  Y.stateNode.nodeValue = f ? "" : Y.memoizedProps;
                } catch (_e) {
                  St(Y, Y.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                Y = n;
                try {
                  var oe = Y.stateNode;
                  f ? x0(oe, !0) : x0(Y.stateNode, !1);
                } catch (_e) {
                  St(Y, Y.return, _e);
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
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, js(e, i))));
        break;
      case 19:
        En(n, e), _n(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, js(e, l)));
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
        for (var i, l = e.return; l !== null; ) {
          if (wg(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(o(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, d = Of(e);
            Os(e, d, f);
            break;
          case 5:
            var b = i.stateNode;
            i.flags & 32 && (Rr(b, ""), i.flags &= -33);
            var C = Of(e);
            Os(e, C, b);
            break;
          case 3:
          case 4:
            var Y = i.stateNode.containerInfo, ie = Of(e);
            jf(
              e,
              ie,
              Y
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (ue) {
        St(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Ag(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Ag(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Fa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ng(e, n.alternate, n), n = n.sibling;
  }
  function or(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ei(4, n, n.return), or(n);
          break;
        case 1:
          Na(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && xg(
            n,
            n.return,
            i
          ), or(n);
          break;
        case 27:
          oo(n.stateNode);
        case 26:
        case 5:
          Na(n, n.return), or(n);
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
      var l = n.alternate, f = e, d = n, b = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ka(
            f,
            d,
            i
          ), Pl(4, d);
          break;
        case 1:
          if (Ka(
            f,
            d,
            i
          ), l = d, f = l.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ie) {
              St(l, l.return, ie);
            }
          if (l = d, f = l.updateQueue, f !== null) {
            var C = l.stateNode;
            try {
              var Y = f.shared.hiddenCallbacks;
              if (Y !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < Y.length; f++)
                  sp(Y[f], C);
            } catch (ie) {
              St(l, l.return, ie);
            }
          }
          i && b & 64 && bg(d), Jl(d, d.return);
          break;
        case 27:
          Eg(d);
        case 26:
        case 5:
          Ka(
            f,
            d,
            i
          ), i && l === null && b & 4 && Sg(d), Jl(d, d.return);
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
          ), i && b & 4 && Tg(f, d);
          break;
        case 13:
          Ka(
            f,
            d,
            i
          ), i && b & 4 && Mg(f, d);
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
  function Hf(e, n) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Ul(i));
  }
  function Bf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Ul(e));
  }
  function fa(e, n, i, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        zg(
          e,
          n,
          i,
          l
        ), n = n.sibling;
  }
  function zg(e, n, i, l) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        fa(
          e,
          n,
          i,
          l
        ), f & 2048 && Pl(9, n);
        break;
      case 1:
        fa(
          e,
          n,
          i,
          l
        );
        break;
      case 3:
        fa(
          e,
          n,
          i,
          l
        ), f & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Ul(e)));
        break;
      case 12:
        if (f & 2048) {
          fa(
            e,
            n,
            i,
            l
          ), e = n.stateNode;
          try {
            var d = n.memoizedProps, b = d.id, C = d.onPostCommit;
            typeof C == "function" && C(
              b,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (Y) {
            St(n, n.return, Y);
          }
        } else
          fa(
            e,
            n,
            i,
            l
          );
        break;
      case 31:
        fa(
          e,
          n,
          i,
          l
        );
        break;
      case 13:
        fa(
          e,
          n,
          i,
          l
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, b = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? fa(
          e,
          n,
          i,
          l
        ) : Wl(e, n) : d._visibility & 2 ? fa(
          e,
          n,
          i,
          l
        ) : (d._visibility |= 2, Ir(
          e,
          n,
          i,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Hf(b, n);
        break;
      case 24:
        fa(
          e,
          n,
          i,
          l
        ), f & 2048 && Bf(n.alternate, n);
        break;
      default:
        fa(
          e,
          n,
          i,
          l
        );
    }
  }
  function Ir(e, n, i, l, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, b = n, C = i, Y = l, ie = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Ir(
            d,
            b,
            C,
            Y,
            f
          ), Pl(8, b);
          break;
        case 23:
          break;
        case 22:
          var ue = b.stateNode;
          b.memoizedState !== null ? ue._visibility & 2 ? Ir(
            d,
            b,
            C,
            Y,
            f
          ) : Wl(
            d,
            b
          ) : (ue._visibility |= 2, Ir(
            d,
            b,
            C,
            Y,
            f
          )), f && ie & 2048 && Hf(
            b.alternate,
            b
          );
          break;
        case 24:
          Ir(
            d,
            b,
            C,
            Y,
            f
          ), f && ie & 2048 && Bf(b.alternate, b);
          break;
        default:
          Ir(
            d,
            b,
            C,
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
        var i = e, l = n, f = l.flags;
        switch (l.tag) {
          case 22:
            Wl(i, l), f & 2048 && Hf(
              l.alternate,
              l
            );
            break;
          case 24:
            Wl(i, l), f & 2048 && Bf(l.alternate, l);
            break;
          default:
            Wl(i, l);
        }
        n = n.sibling;
      }
  }
  var eo = 8192;
  function Zr(e, n, i) {
    if (e.subtreeFlags & eo)
      for (e = e.child; e !== null; )
        Og(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function Og(e, n, i) {
    switch (e.tag) {
      case 26:
        Zr(
          e,
          n,
          i
        ), e.flags & eo && e.memoizedState !== null && Zw(
          i,
          ca,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Zr(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var l = ca;
        ca = Qs(e.stateNode.containerInfo), Zr(
          e,
          n,
          i
        ), ca = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = eo, eo = 16777216, Zr(
          e,
          n,
          i
        ), eo = l) : Zr(
          e,
          n,
          i
        ));
        break;
      default:
        Zr(
          e,
          n,
          i
        );
    }
  }
  function jg(e) {
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
          var l = n[i];
          en = l, Hg(
            l,
            e
          );
        }
      jg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Lg(e), e = e.sibling;
  }
  function Lg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        to(e), e.flags & 2048 && Ei(9, e, e.return);
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
          var l = n[i];
          en = l, Hg(
            l,
            e
          );
        }
      jg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Ei(8, n, n.return), Ls(n);
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
  function Hg(e, n) {
    for (; en !== null; ) {
      var i = en;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ei(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Ul(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, en = l;
      else
        e: for (i = e; en !== null; ) {
          l = en;
          var f = l.sibling, d = l.return;
          if (Rg(l), l === i) {
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
  var sw = {
    getCacheForType: function(e) {
      var n = ln(Gt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return ln(Gt).controller.signal;
    }
  }, uw = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Ct = null, Ke = null, et = 0, xt = 0, Hn = null, _i = !1, Qr = !1, Uf = !1, Pa = 0, Ut = 0, Ni = 0, sr = 0, kf = 0, Bn = 0, Fr = 0, no = null, Nn = null, Vf = !1, Hs = 0, Bg = 0, Bs = 1 / 0, Us = null, Ri = null, Jt = 0, Ci = null, Kr = null, Ja = 0, Yf = 0, qf = null, Ug = null, ao = 0, $f = null;
  function Un() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : _.T !== null ? Ff() : de();
  }
  function kg() {
    if (Bn === 0)
      if ((et & 536870912) === 0 || it) {
        var e = Mn;
        Mn <<= 1, (Mn & 3932160) === 0 && (Mn = 262144), Bn = e;
      } else Bn = 536870912;
    return e = jn.current, e !== null && (e.flags |= 32), Bn;
  }
  function Rn(e, n, i) {
    (e === Ct && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null) && (Pr(e, 0), Ti(
      e,
      et,
      Bn,
      !1
    )), pt(e, i), ((ht & 2) === 0 || e !== Ct) && (e === Ct && ((ht & 2) === 0 && (sr |= i), Ut === 4 && Ti(
      e,
      et,
      Bn,
      !1
    )), Ra(e));
  }
  function Vg(e, n, i) {
    if ((ht & 6) !== 0) throw Error(o(327));
    var l = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || vt(e, n), f = l ? dw(e, n) : Gf(e, n, !0), d = l;
    do {
      if (f === 0) {
        Qr && !l && Ti(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !cw(i)) {
          f = Gf(e, n, !1), d = !1;
          continue;
        }
        if (f === 2) {
          if (d = n, e.errorRecoveryDisabledLanes & d)
            var b = 0;
          else
            b = e.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            n = b;
            e: {
              var C = e;
              f = no;
              var Y = C.current.memoizedState.isDehydrated;
              if (Y && (Pr(C, b).flags |= 256), b = Gf(
                C,
                b,
                !1
              ), b !== 2) {
                if (Uf && !Y) {
                  C.errorRecoveryDisabledLanes |= d, sr |= d, f = 4;
                  break e;
                }
                d = Nn, Nn = f, d !== null && (Nn === null ? Nn = d : Nn.push.apply(
                  Nn,
                  d
                ));
              }
              f = b;
            }
            if (d = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          Pr(e, 0), Ti(e, n, 0, !0);
          break;
        }
        e: {
          switch (l = e, d = f, d) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Ti(
                l,
                n,
                Bn,
                !_i
              );
              break e;
            case 2:
              Nn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((n & 62914560) === n && (f = Hs + 300 - Fe(), 10 < f)) {
            if (Ti(
              l,
              n,
              Bn,
              !_i
            ), He(l, 0, !0) !== 0) break e;
            Ja = n, l.timeoutHandle = y0(
              Yg.bind(
                null,
                l,
                i,
                Nn,
                Us,
                Vf,
                n,
                Bn,
                sr,
                Fr,
                _i,
                d,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          Yg(
            l,
            i,
            Nn,
            Us,
            Vf,
            n,
            Bn,
            sr,
            Fr,
            _i,
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
  function Yg(e, n, i, l, f, d, b, C, Y, ie, ue, fe, re, oe) {
    if (e.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ba
      }, Og(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? Hs - Fe() : (d & 4194048) === d ? Bg - Fe() : 0;
      if (_e = Qw(
        fe,
        _e
      ), _e !== null) {
        Ja = d, e.cancelPendingCommit = _e(
          Fg.bind(
            null,
            e,
            n,
            d,
            i,
            l,
            f,
            b,
            C,
            Y,
            ue,
            fe,
            null,
            re,
            oe
          )
        ), Ti(e, d, b, !ie);
        return;
      }
    }
    Fg(
      e,
      n,
      d,
      i,
      l,
      f,
      b,
      C,
      Y
    );
  }
  function cw(e) {
    for (var n = e; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var f = i[l], d = f.getSnapshot;
          f = f.value;
          try {
            if (!zn(d(), f)) return !1;
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
  function Ti(e, n, i, l) {
    n &= ~kf, n &= ~sr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var f = n; 0 < f; ) {
      var d = 31 - kt(f), b = 1 << d;
      l[d] = -1, f &= ~b;
    }
    i !== 0 && la(e, i, n);
  }
  function ks() {
    return (ht & 6) === 0 ? (io(0), !1) : !0;
  }
  function Xf() {
    if (Ke !== null) {
      if (xt === 0)
        var e = Ke.return;
      else
        e = Ke, Ya = Wi = null, lf(e), Yr = null, Vl = 0, e = Ke;
      for (; e !== null; )
        vg(e.alternate, e), e = e.return;
      Ke = null;
    }
  }
  function Pr(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Dw(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Ja = 0, Xf(), Ct = e, Ke = i = ka(e.current, null), et = n, xt = 0, Hn = null, _i = !1, Qr = vt(e, n), Uf = !1, Fr = Bn = kf = sr = Ni = Ut = 0, Nn = no = null, Vf = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var f = 31 - kt(l), d = 1 << f;
        n |= e[f], l &= ~d;
      }
    return Pa = n, ls(), i;
  }
  function qg(e, n) {
    Ye = null, _.H = Ql, n === Vr || n === ms ? (n = ip(), xt = 3) : n === Zc ? (n = ip(), xt = 4) : xt = n === wf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Hn = n, Ke === null && (Ut = 1, Ts(
      e,
      In(n, e.current)
    ));
  }
  function $g() {
    var e = jn.current;
    return e === null ? !0 : (et & 4194048) === et ? Kn === null : (et & 62914560) === et || (et & 536870912) !== 0 ? e === Kn : !1;
  }
  function Xg() {
    var e = _.H;
    return _.H = Ql, e === null ? Ql : e;
  }
  function Gg() {
    var e = _.A;
    return _.A = sw, e;
  }
  function Vs() {
    Ut = 4, _i || (et & 4194048) !== et && jn.current !== null || (Qr = !0), (Ni & 134217727) === 0 && (sr & 134217727) === 0 || Ct === null || Ti(
      Ct,
      et,
      Bn,
      !1
    );
  }
  function Gf(e, n, i) {
    var l = ht;
    ht |= 2;
    var f = Xg(), d = Gg();
    (Ct !== e || et !== n) && (Us = null, Pr(e, n)), n = !1;
    var b = Ut;
    e: do
      try {
        if (xt !== 0 && Ke !== null) {
          var C = Ke, Y = Hn;
          switch (xt) {
            case 8:
              Xf(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jn.current === null && (n = !0);
              var ie = xt;
              if (xt = 0, Hn = null, Jr(e, C, Y, ie), i && Qr) {
                b = 0;
                break e;
              }
              break;
            default:
              ie = xt, xt = 0, Hn = null, Jr(e, C, Y, ie);
          }
        }
        fw(), b = Ut;
        break;
      } catch (ue) {
        qg(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ya = Wi = null, ht = l, _.H = f, _.A = d, Ke === null && (Ct = null, et = 0, ls()), b;
  }
  function fw() {
    for (; Ke !== null; ) Ig(Ke);
  }
  function dw(e, n) {
    var i = ht;
    ht |= 2;
    var l = Xg(), f = Gg();
    Ct !== e || et !== n ? (Us = null, Bs = Fe() + 500, Pr(e, n)) : Qr = vt(
      e,
      n
    );
    e: do
      try {
        if (xt !== 0 && Ke !== null) {
          n = Ke;
          var d = Hn;
          t: switch (xt) {
            case 1:
              xt = 0, Hn = null, Jr(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (np(d)) {
                xt = 0, Hn = null, Zg(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Ct !== e || (xt = 7), Ra(e);
              }, d.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              np(d) ? (xt = 0, Hn = null, Zg(n)) : (xt = 0, Hn = null, Jr(e, n, d, 7));
              break;
            case 5:
              var b = null;
              switch (Ke.tag) {
                case 26:
                  b = Ke.memoizedState;
                case 5:
                case 27:
                  var C = Ke;
                  if (b ? z0(b) : C.stateNode.complete) {
                    xt = 0, Hn = null;
                    var Y = C.sibling;
                    if (Y !== null) Ke = Y;
                    else {
                      var ie = C.return;
                      ie !== null ? (Ke = ie, Ys(ie)) : Ke = null;
                    }
                    break t;
                  }
              }
              xt = 0, Hn = null, Jr(e, n, d, 5);
              break;
            case 6:
              xt = 0, Hn = null, Jr(e, n, d, 6);
              break;
            case 8:
              Xf(), Ut = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        hw();
        break;
      } catch (ue) {
        qg(e, ue);
      }
    while (!0);
    return Ya = Wi = null, _.H = l, _.A = f, ht = i, Ke !== null ? 0 : (Ct = null, et = 0, ls(), Ut);
  }
  function hw() {
    for (; Ke !== null && !Je(); )
      Ig(Ke);
  }
  function Ig(e) {
    var n = gg(e.alternate, e, Pa);
    e.memoizedProps = e.pendingProps, n === null ? Ys(e) : Ke = n;
  }
  function Zg(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = cg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = cg(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        lf(n);
      default:
        vg(i, n), n = Ke = Gm(n, Pa), n = gg(i, n, Pa);
    }
    e.memoizedProps = e.pendingProps, n === null ? Ys(e) : Ke = n;
  }
  function Jr(e, n, i, l) {
    Ya = Wi = null, lf(n), Yr = null, Vl = 0;
    var f = n.return;
    try {
      if (tw(
        e,
        f,
        n,
        i,
        et
      )) {
        Ut = 1, Ts(
          e,
          In(i, e.current)
        ), Ke = null;
        return;
      }
    } catch (d) {
      if (f !== null) throw Ke = f, d;
      Ut = 1, Ts(
        e,
        In(i, e.current)
      ), Ke = null;
      return;
    }
    n.flags & 32768 ? (it || l === 1 ? e = !0 : Qr || (et & 536870912) !== 0 ? e = !1 : (_i = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = jn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Qg(n, e)) : Ys(n);
  }
  function Ys(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Qg(
          n,
          _i
        );
        return;
      }
      e = n.return;
      var i = iw(
        n.alternate,
        n,
        Pa
      );
      if (i !== null) {
        Ke = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ke = n;
        return;
      }
      Ke = n = e;
    } while (n !== null);
    Ut === 0 && (Ut = 5);
  }
  function Qg(e, n) {
    do {
      var i = rw(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ke = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (e = e.sibling, e !== null)) {
        Ke = e;
        return;
      }
      Ke = e = i;
    } while (e !== null);
    Ut = 6, Ke = null;
  }
  function Fg(e, n, i, l, f, d, b, C, Y) {
    e.cancelPendingCommit = null;
    do
      qs();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (d = n.lanes | n.childLanes, d |= zc, Pt(
        e,
        i,
        d,
        b,
        C,
        Y
      ), e === Ct && (Ke = Ct = null, et = 0), Kr = n, Ci = e, Ja = i, Yf = d, qf = f, Ug = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yw(Lt, function() {
        return e0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = _.T, _.T = null, f = L.p, L.p = 2, b = ht, ht |= 4;
        try {
          lw(e, n, i);
        } finally {
          ht = b, L.p = f, _.T = l;
        }
      }
      Jt = 1, Kg(), Pg(), Jg();
    }
  }
  function Kg() {
    if (Jt === 1) {
      Jt = 0;
      var e = Ci, n = Kr, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = _.T, _.T = null;
        var l = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Dg(n, e);
          var d = ad, b = Hm(e.containerInfo), C = d.focusedElem, Y = d.selectionRange;
          if (b !== C && C && C.ownerDocument && Lm(
            C.ownerDocument.documentElement,
            C
          )) {
            if (Y !== null && Cc(C)) {
              var ie = Y.start, ue = Y.end;
              if (ue === void 0 && (ue = ie), "selectionStart" in C)
                C.selectionStart = ie, C.selectionEnd = Math.min(
                  ue,
                  C.value.length
                );
              else {
                var fe = C.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var oe = re.getSelection(), _e = C.textContent.length, Le = Math.min(Y.start, _e), Nt = Y.end === void 0 ? Le : Math.min(Y.end, _e);
                  !oe.extend && Le > Nt && (b = Nt, Nt = Le, Le = b);
                  var P = jm(
                    C,
                    Le
                  ), X = jm(
                    C,
                    Nt
                  );
                  if (P && X && (oe.rangeCount !== 1 || oe.anchorNode !== P.node || oe.anchorOffset !== P.offset || oe.focusNode !== X.node || oe.focusOffset !== X.offset)) {
                    var ae = fe.createRange();
                    ae.setStart(P.node, P.offset), oe.removeAllRanges(), Le > Nt ? (oe.addRange(ae), oe.extend(X.node, X.offset)) : (ae.setEnd(X.node, X.offset), oe.addRange(ae));
                  }
                }
              }
            }
            for (fe = [], oe = C; oe = oe.parentNode; )
              oe.nodeType === 1 && fe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < fe.length; C++) {
              var ce = fe[C];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          eu = !!nd, ad = nd = null;
        } finally {
          ht = f, L.p = l, _.T = i;
        }
      }
      e.current = n, Jt = 2;
    }
  }
  function Pg() {
    if (Jt === 2) {
      Jt = 0;
      var e = Ci, n = Kr, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = _.T, _.T = null;
        var l = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Ng(e, n.alternate, n);
        } finally {
          ht = f, L.p = l, _.T = i;
        }
      }
      Jt = 3;
    }
  }
  function Jg() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Qe();
      var e = Ci, n = Kr, i = Ja, l = Ug;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, Kr = Ci = null, Wg(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (Ri = null), J(i), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
        try {
          Kt.onCommitFiberRoot(
            tn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = _.T, f = L.p, L.p = 2, _.T = null;
        try {
          for (var d = e.onRecoverableError, b = 0; b < l.length; b++) {
            var C = l[b];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          _.T = n, L.p = f;
        }
      }
      (Ja & 3) !== 0 && qs(), Ra(e), f = e.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? e === $f ? ao++ : (ao = 0, $f = e) : ao = 0, io(0);
    }
  }
  function Wg(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Ul(n)));
  }
  function qs() {
    return Kg(), Pg(), Jg(), e0();
  }
  function e0() {
    if (Jt !== 5) return !1;
    var e = Ci, n = Yf;
    Yf = 0;
    var i = J(Ja), l = _.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, _.T = null, i = qf, qf = null;
      var d = Ci, b = Ja;
      if (Jt = 0, Kr = Ci = null, Ja = 0, (ht & 6) !== 0) throw Error(o(331));
      var C = ht;
      if (ht |= 4, Lg(d.current), zg(
        d,
        d.current,
        b,
        i
      ), ht = C, io(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(tn, d);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, _.T = l, Wg(e, n);
    }
  }
  function t0(e, n, i) {
    n = In(i, n), n = Sf(e.stateNode, n, 2), e = xi(e, n, 2), e !== null && (pt(e, 2), Ra(e));
  }
  function St(e, n, i) {
    if (e.tag === 3)
      t0(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          t0(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ri === null || !Ri.has(l))) {
            e = In(i, e), i = ng(2), l = xi(n, i, 2), l !== null && (ag(
              i,
              l,
              n,
              e
            ), pt(l, 2), Ra(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function If(e, n, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new uw();
      var f = /* @__PURE__ */ new Set();
      l.set(n, f);
    } else
      f = l.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), l.set(n, f));
    f.has(i) || (Uf = !0, f.add(i), e = mw.bind(null, e, n, i), n.then(e, e));
  }
  function mw(e, n, i) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ct === e && (et & i) === i && (Ut === 4 || Ut === 3 && (et & 62914560) === et && 300 > Fe() - Hs ? (ht & 2) === 0 && Pr(e, 0) : kf |= i, Fr === et && (Fr = 0)), Ra(e);
  }
  function n0(e, n) {
    n === 0 && (n = Vt()), e = Ki(e, n), e !== null && (pt(e, n), Ra(e));
  }
  function pw(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), n0(e, i);
  }
  function gw(e, n) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, f = e.memoizedState;
        f !== null && (i = f.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(n), n0(e, i);
  }
  function yw(e, n) {
    return $e(e, n);
  }
  var $s = null, Wr = null, Zf = !1, Xs = !1, Qf = !1, Mi = 0;
  function Ra(e) {
    e !== Wr && e.next === null && (Wr === null ? $s = Wr = e : Wr = Wr.next = e), Xs = !0, Zf || (Zf = !0, bw());
  }
  function io(e, n) {
    if (!Qf && Xs) {
      Qf = !0;
      do
        for (var i = !1, l = $s; l !== null; ) {
          if (e !== 0) {
            var f = l.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var b = l.suspendedLanes, C = l.pingedLanes;
              d = (1 << 31 - kt(42 | e) + 1) - 1, d &= f & ~(b & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, l0(l, d));
          } else
            d = et, d = He(
              l,
              l === Ct ? d : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (d & 3) === 0 || vt(l, d) || (i = !0, l0(l, d));
          l = l.next;
        }
      while (i);
      Qf = !1;
    }
  }
  function vw() {
    a0();
  }
  function a0() {
    Xs = Zf = !1;
    var e = 0;
    Mi !== 0 && Mw() && (e = Mi);
    for (var n = Fe(), i = null, l = $s; l !== null; ) {
      var f = l.next, d = i0(l, n);
      d === 0 ? (l.next = null, i === null ? $s = f : i.next = f, f === null && (Wr = i)) : (i = l, (e !== 0 || (d & 3) !== 0) && (Xs = !0)), l = f;
    }
    Jt !== 0 && Jt !== 5 || io(e), Mi !== 0 && (Mi = 0);
  }
  function i0(e, n) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, f = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var b = 31 - kt(d), C = 1 << b, Y = f[b];
      Y === -1 ? ((C & i) === 0 || (C & l) !== 0) && (f[b] = Ht(C, n)) : Y <= n && (e.expiredLanes |= C), d &= ~C;
    }
    if (n = Ct, i = et, i = He(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === n && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && wt(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || vt(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (l !== null && wt(l), J(i)) {
        case 2:
        case 8:
          i = Xt;
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
      return l = r0.bind(null, e), i = $e(i, l), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return l !== null && l !== null && wt(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function r0(e, n) {
    if (Jt !== 0 && Jt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (qs() && e.callbackNode !== i)
      return null;
    var l = et;
    return l = He(
      e,
      e === Ct ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Vg(e, l, n), i0(e, Fe()), e.callbackNode != null && e.callbackNode === i ? r0.bind(null, e) : null);
  }
  function l0(e, n) {
    if (qs()) return null;
    Vg(e, n, !0);
  }
  function bw() {
    Aw(function() {
      (ht & 6) !== 0 ? $e(
        yt,
        vw
      ) : a0();
    });
  }
  function Ff() {
    if (Mi === 0) {
      var e = Ur;
      e === 0 && (e = ra, ra <<= 1, (ra & 261888) === 0 && (ra = 256)), Mi = e;
    }
    return Mi;
  }
  function o0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Jo("" + e);
  }
  function s0(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function xw(e, n, i, l, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var d = o0(
        (f[Se] || null).action
      ), b = l.submitter;
      b && (n = (n = b[Se] || null) ? o0(n.formAction) : b.getAttribute("formAction"), n !== null && (d = n, b = null));
      var C = new ns(
        "action",
        "action",
        null,
        l,
        f
      );
      e.push({
        event: C,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Mi !== 0) {
                  var Y = b ? s0(f, b) : new FormData(f);
                  pf(
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
                typeof d == "function" && (C.preventDefault(), Y = b ? s0(f, b) : new FormData(f), pf(
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
  for (var Kf = 0; Kf < Ac.length; Kf++) {
    var Pf = Ac[Kf], Sw = Pf.toLowerCase(), ww = Pf[0].toUpperCase() + Pf.slice(1);
    ua(
      Sw,
      "on" + ww
    );
  }
  ua(km, "onAnimationEnd"), ua(Vm, "onAnimationIteration"), ua(Ym, "onAnimationStart"), ua("dblclick", "onDoubleClick"), ua("focusin", "onFocus"), ua("focusout", "onBlur"), ua(US, "onTransitionRun"), ua(kS, "onTransitionStart"), ua(VS, "onTransitionCancel"), ua(qm, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
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
  ), Ew = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ro)
  );
  function u0(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], f = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var b = l.length - 1; 0 <= b; b--) {
            var C = l[b], Y = C.instance, ie = C.currentTarget;
            if (C = C.listener, Y !== d && f.isPropagationStopped())
              break e;
            d = C, f.currentTarget = ie;
            try {
              d(f);
            } catch (ue) {
              rs(ue);
            }
            f.currentTarget = null, d = Y;
          }
        else
          for (b = 0; b < l.length; b++) {
            if (C = l[b], Y = C.instance, ie = C.currentTarget, C = C.listener, Y !== d && f.isPropagationStopped())
              break e;
            d = C, f.currentTarget = ie;
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
  function Pe(e, n) {
    var i = n[Me];
    i === void 0 && (i = n[Me] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (c0(n, e, 2, !1), i.add(l));
  }
  function Jf(e, n, i) {
    var l = 0;
    n && (l |= 4), c0(
      i,
      e,
      l,
      n
    );
  }
  var Gs = "_reactListening" + Math.random().toString(36).slice(2);
  function Wf(e) {
    if (!e[Gs]) {
      e[Gs] = !0, wa.forEach(function(i) {
        i !== "selectionchange" && (Ew.has(i) || Jf(i, !1, e), Jf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Gs] || (n[Gs] = !0, Jf("selectionchange", !1, n));
    }
  }
  function c0(e, n, i, l) {
    switch (k0(n)) {
      case 2:
        var f = Pw;
        break;
      case 8:
        f = Jw;
        break;
      default:
        f = md;
    }
    i = f.bind(
      null,
      n,
      i,
      e
    ), f = void 0, !vc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), l ? f !== void 0 ? e.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : e.addEventListener(n, i, !0) : f !== void 0 ? e.addEventListener(n, i, {
      passive: f
    }) : e.addEventListener(n, i, !1);
  }
  function ed(e, n, i, l, f) {
    var d = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var b = l.tag;
        if (b === 3 || b === 4) {
          var C = l.stateNode.containerInfo;
          if (C === f) break;
          if (b === 4)
            for (b = l.return; b !== null; ) {
              var Y = b.tag;
              if ((Y === 3 || Y === 4) && b.stateNode.containerInfo === f)
                return;
              b = b.return;
            }
          for (; C !== null; ) {
            if (b = Rt(C), b === null) return;
            if (Y = b.tag, Y === 5 || Y === 6 || Y === 26 || Y === 27) {
              l = d = b;
              continue e;
            }
            C = C.parentNode;
          }
        }
        l = l.return;
      }
    pm(function() {
      var ie = d, ue = gc(i), fe = [];
      e: {
        var re = $m.get(e);
        if (re !== void 0) {
          var oe = ns, _e = e;
          switch (e) {
            case "keypress":
              if (es(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = gS;
              break;
            case "focusin":
              _e = "focus", oe = wc;
              break;
            case "focusout":
              _e = "blur", oe = wc;
              break;
            case "beforeblur":
            case "afterblur":
              oe = wc;
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
              oe = vm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = iS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = bS;
              break;
            case km:
            case Vm:
            case Ym:
              oe = oS;
              break;
            case qm:
              oe = SS;
              break;
            case "scroll":
            case "scrollend":
              oe = nS;
              break;
            case "wheel":
              oe = ES;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = uS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = xm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = NS;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (e === "scroll" || e === "scrollend"), P = Le ? re !== null ? re + "Capture" : null : re;
          Le = [];
          for (var X = ie, ae; X !== null; ) {
            var ce = X;
            if (ae = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ae === null || P === null || (ce = Cl(X, P), ce != null && Le.push(
              lo(X, ce, ae)
            )), Nt) break;
            X = X.return;
          }
          0 < Le.length && (re = new oe(
            re,
            _e,
            null,
            i,
            ue
          ), fe.push({ event: re, listeners: Le }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (re = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", re && i !== pc && (_e = i.relatedTarget || i.fromElement) && (Rt(_e) || _e[be]))
            break e;
          if ((oe || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ie, _e = _e ? Rt(_e) : null, _e !== null && (Nt = u(_e), Le = _e.tag, _e !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (oe = null, _e = ie), oe !== _e)) {
            if (Le = vm, ce = "onMouseLeave", P = "onMouseEnter", X = "mouse", (e === "pointerout" || e === "pointerover") && (Le = xm, ce = "onPointerLeave", P = "onPointerEnter", X = "pointer"), Nt = oe == null ? re : We(oe), ae = _e == null ? re : We(_e), re = new Le(
              ce,
              X + "leave",
              oe,
              i,
              ue
            ), re.target = Nt, re.relatedTarget = ae, ce = null, Rt(ue) === ie && (Le = new Le(
              P,
              X + "enter",
              _e,
              i,
              ue
            ), Le.target = ae, Le.relatedTarget = Nt, ce = Le), Nt = ce, oe && _e)
              t: {
                for (Le = _w, P = oe, X = _e, ae = 0, ce = P; ce; ce = Le(ce))
                  ae++;
                ce = 0;
                for (var Oe = X; Oe; Oe = Le(Oe))
                  ce++;
                for (; 0 < ae - ce; )
                  P = Le(P), ae--;
                for (; 0 < ce - ae; )
                  X = Le(X), ce--;
                for (; ae--; ) {
                  if (P === X || X !== null && P === X.alternate) {
                    Le = P;
                    break t;
                  }
                  P = Le(P), X = Le(X);
                }
                Le = null;
              }
            else Le = null;
            oe !== null && f0(
              fe,
              re,
              oe,
              Le,
              !1
            ), _e !== null && Nt !== null && f0(
              fe,
              Nt,
              _e,
              Le,
              !0
            );
          }
        }
        e: {
          if (re = ie ? We(ie) : window, oe = re.nodeName && re.nodeName.toLowerCase(), oe === "select" || oe === "input" && re.type === "file")
            var ut = Tm;
          else if (Rm(re))
            if (Mm)
              ut = LS;
            else {
              ut = OS;
              var Ne = zS;
            }
          else
            oe = re.nodeName, !oe || oe.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? ie && mc(ie.elementType) && (ut = Tm) : ut = jS;
          if (ut && (ut = ut(e, ie))) {
            Cm(
              fe,
              ut,
              i,
              ue
            );
            break e;
          }
          Ne && Ne(e, re, ie), e === "focusout" && ie && re.type === "number" && ie.memoizedProps.value != null && Nl(re, "number", re.value);
        }
        switch (Ne = ie ? We(ie) : window, e) {
          case "focusin":
            (Rm(Ne) || Ne.contentEditable === "true") && (Dr = Ne, Tc = ie, Ll = null);
            break;
          case "focusout":
            Ll = Tc = Dr = null;
            break;
          case "mousedown":
            Mc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mc = !1, Bm(fe, i, ue);
            break;
          case "selectionchange":
            if (BS) break;
          case "keydown":
          case "keyup":
            Bm(fe, i, ue);
        }
        var Xe;
        if (_c)
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
          Mr ? _m(e, i) && (tt = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Sm && i.locale !== "ko" && (Mr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Mr && (Xe = gm()) : (hi = ue, bc = "value" in hi ? hi.value : hi.textContent, Mr = !0)), Ne = Is(ie, tt), 0 < Ne.length && (tt = new bm(
          tt,
          e,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Xe ? tt.data = Xe : (Xe = Nm(i), Xe !== null && (tt.data = Xe)))), (Xe = CS ? TS(e, i) : MS(e, i)) && (tt = Is(ie, "onBeforeInput"), 0 < tt.length && (Ne = new bm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Xe)), xw(
          fe,
          e,
          ie,
          i,
          ue
        );
      }
      u0(fe, n);
    });
  }
  function lo(e, n, i) {
    return {
      instance: e,
      listener: n,
      currentTarget: i
    };
  }
  function Is(e, n) {
    for (var i = n + "Capture", l = []; e !== null; ) {
      var f = e, d = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || d === null || (f = Cl(e, i), f != null && l.unshift(
        lo(e, f, d)
      ), f = Cl(e, n), f != null && l.push(
        lo(e, f, d)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function _w(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function f0(e, n, i, l, f) {
    for (var d = n._reactName, b = []; i !== null && i !== l; ) {
      var C = i, Y = C.alternate, ie = C.stateNode;
      if (C = C.tag, Y !== null && Y === l) break;
      C !== 5 && C !== 26 && C !== 27 || ie === null || (Y = ie, f ? (ie = Cl(i, d), ie != null && b.unshift(
        lo(i, ie, Y)
      )) : f || (ie = Cl(i, d), ie != null && b.push(
        lo(i, ie, Y)
      ))), i = i.return;
    }
    b.length !== 0 && e.push({ event: n, listeners: b });
  }
  var Nw = /\r\n?/g, Rw = /\u0000|\uFFFD/g;
  function d0(e) {
    return (typeof e == "string" ? e : "" + e).replace(Nw, `
`).replace(Rw, "");
  }
  function h0(e, n) {
    return n = d0(n), d0(e) === n;
  }
  function _t(e, n, i, l, f, d) {
    switch (i) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || Rr(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && Rr(e, "" + l);
        break;
      case "className":
        sa(e, "class", l);
        break;
      case "tabIndex":
        sa(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        sa(e, i, l);
        break;
      case "style":
        hm(e, l, d);
        break;
      case "data":
        if (n !== "object") {
          sa(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = Jo("" + l), e.setAttribute(i, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
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
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = Jo("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = Ba);
        break;
      case "onScroll":
        l != null && Pe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Pe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (i = l.__html, i != null) {
            if (f.children != null) throw Error(o(60));
            e.innerHTML = i;
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
        i = Jo("" + l), e.setAttributeNS(
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, "" + l) : e.removeAttribute(i);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(i, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, l) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(i, l) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(i) : e.setAttribute(i, l);
        break;
      case "popover":
        Pe("beforetoggle", e), Pe("toggle", e), oa(e, "popover", l);
        break;
      case "xlinkActuate":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Ue(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Ue(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Ue(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        oa(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = eS.get(i) || i, oa(e, i, l));
    }
  }
  function td(e, n, i, l, f, d) {
    switch (i) {
      case "style":
        hm(e, l, d);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (i = l.__html, i != null) {
            if (f.children != null) throw Error(o(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Rr(e, l) : (typeof l == "number" || typeof l == "bigint") && Rr(e, "" + l);
        break;
      case "onScroll":
        l != null && Pe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Pe("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Ba);
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
        if (!Dn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), d = e[Se] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(n, d, f), typeof l == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(n, l, f);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : oa(e, i, l);
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
        Pe("error", e), Pe("load", e);
        var l = !1, f = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var b = i[d];
            if (b != null)
              switch (d) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, n));
                default:
                  _t(e, n, d, b, i, null);
              }
          }
        f && _t(e, n, "srcSet", i.srcSet, i, null), l && _t(e, n, "src", i.src, i, null);
        return;
      case "input":
        Pe("invalid", e);
        var C = d = b = f = null, Y = null, ie = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var ue = i[l];
            if (ue != null)
              switch (l) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  b = ue;
                  break;
                case "checked":
                  Y = ue;
                  break;
                case "defaultChecked":
                  ie = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  C = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(o(137, n));
                  break;
                default:
                  _t(e, n, l, ue, i, null);
              }
          }
        Nr(
          e,
          d,
          C,
          Y,
          ie,
          b,
          f,
          !1
        );
        return;
      case "select":
        Pe("invalid", e), l = b = d = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (C = i[f], C != null))
            switch (f) {
              case "value":
                d = C;
                break;
              case "defaultValue":
                b = C;
                break;
              case "multiple":
                l = C;
              default:
                _t(e, n, f, C, i, null);
            }
        n = d, i = b, e.multiple = !!l, n != null ? di(e, !!l, n, !1) : i != null && di(e, !!l, i, !0);
        return;
      case "textarea":
        Pe("invalid", e), d = f = l = null;
        for (b in i)
          if (i.hasOwnProperty(b) && (C = i[b], C != null))
            switch (b) {
              case "value":
                l = C;
                break;
              case "defaultValue":
                f = C;
                break;
              case "children":
                d = C;
                break;
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(o(91));
                break;
              default:
                _t(e, n, b, C, i, null);
            }
        fm(e, l, f, d);
        return;
      case "option":
        for (Y in i)
          if (i.hasOwnProperty(Y) && (l = i[Y], l != null))
            switch (Y) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                _t(e, n, Y, l, i, null);
            }
        return;
      case "dialog":
        Pe("beforetoggle", e), Pe("toggle", e), Pe("cancel", e), Pe("close", e);
        break;
      case "iframe":
      case "object":
        Pe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < ro.length; l++)
          Pe(ro[l], e);
        break;
      case "image":
        Pe("error", e), Pe("load", e);
        break;
      case "details":
        Pe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Pe("error", e), Pe("load", e);
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
          if (i.hasOwnProperty(ie) && (l = i[ie], l != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, n));
              default:
                _t(e, n, ie, l, i, null);
            }
        return;
      default:
        if (mc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (l = i[ue], l !== void 0 && td(
              e,
              n,
              ue,
              l,
              i,
              void 0
            ));
          return;
        }
    }
    for (C in i)
      i.hasOwnProperty(C) && (l = i[C], l != null && _t(e, n, C, l, i, null));
  }
  function Cw(e, n, i, l) {
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
        var f = null, d = null, b = null, C = null, Y = null, ie = null, ue = null;
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
                l.hasOwnProperty(oe) || _t(e, n, oe, null, l, fe);
            }
        }
        for (var re in l) {
          var oe = l[re];
          if (fe = i[re], l.hasOwnProperty(re) && (oe != null || fe != null))
            switch (re) {
              case "type":
                d = oe;
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
                b = oe;
                break;
              case "defaultValue":
                C = oe;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (oe != null)
                  throw Error(o(137, n));
                break;
              default:
                oe !== fe && _t(
                  e,
                  n,
                  re,
                  oe,
                  l,
                  fe
                );
            }
        }
        Ii(
          e,
          b,
          C,
          Y,
          ie,
          ue,
          d,
          f
        );
        return;
      case "select":
        oe = b = C = re = null;
        for (d in i)
          if (Y = i[d], i.hasOwnProperty(d) && Y != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                oe = Y;
              default:
                l.hasOwnProperty(d) || _t(
                  e,
                  n,
                  d,
                  null,
                  l,
                  Y
                );
            }
        for (f in l)
          if (d = l[f], Y = i[f], l.hasOwnProperty(f) && (d != null || Y != null))
            switch (f) {
              case "value":
                re = d;
                break;
              case "defaultValue":
                C = d;
                break;
              case "multiple":
                b = d;
              default:
                d !== Y && _t(
                  e,
                  n,
                  f,
                  d,
                  l,
                  Y
                );
            }
        n = C, i = b, l = oe, re != null ? di(e, !!i, re, !1) : !!l != !!i && (n != null ? di(e, !!i, n, !0) : di(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = re = null;
        for (C in i)
          if (f = i[C], i.hasOwnProperty(C) && f != null && !l.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(e, n, C, null, l, f);
            }
        for (b in l)
          if (f = l[b], d = i[b], l.hasOwnProperty(b) && (f != null || d != null))
            switch (b) {
              case "value":
                re = f;
                break;
              case "defaultValue":
                oe = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(o(91));
                break;
              default:
                f !== d && _t(e, n, b, f, l, d);
            }
        Rl(e, re, oe);
        return;
      case "option":
        for (var _e in i)
          if (re = i[_e], i.hasOwnProperty(_e) && re != null && !l.hasOwnProperty(_e))
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
                  l,
                  re
                );
            }
        for (Y in l)
          if (re = l[Y], oe = i[Y], l.hasOwnProperty(Y) && re !== oe && (re != null || oe != null))
            switch (Y) {
              case "selected":
                e.selected = re && typeof re != "function" && typeof re != "symbol";
                break;
              default:
                _t(
                  e,
                  n,
                  Y,
                  re,
                  l,
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
          re = i[Le], i.hasOwnProperty(Le) && re != null && !l.hasOwnProperty(Le) && _t(e, n, Le, null, l, re);
        for (ie in l)
          if (re = l[ie], oe = i[ie], l.hasOwnProperty(ie) && re !== oe && (re != null || oe != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(o(137, n));
                break;
              default:
                _t(
                  e,
                  n,
                  ie,
                  re,
                  l,
                  oe
                );
            }
        return;
      default:
        if (mc(n)) {
          for (var Nt in i)
            re = i[Nt], i.hasOwnProperty(Nt) && re !== void 0 && !l.hasOwnProperty(Nt) && td(
              e,
              n,
              Nt,
              void 0,
              l,
              re
            );
          for (ue in l)
            re = l[ue], oe = i[ue], !l.hasOwnProperty(ue) || re === oe || re === void 0 && oe === void 0 || td(
              e,
              n,
              ue,
              re,
              l,
              oe
            );
          return;
        }
    }
    for (var P in i)
      re = i[P], i.hasOwnProperty(P) && re != null && !l.hasOwnProperty(P) && _t(e, n, P, null, l, re);
    for (fe in l)
      re = l[fe], oe = i[fe], !l.hasOwnProperty(fe) || re === oe || re == null && oe == null || _t(e, n, fe, re, l, oe);
  }
  function m0(e) {
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
  function Tw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var f = i[l], d = f.transferSize, b = f.initiatorType, C = f.duration;
        if (d && C && m0(b)) {
          for (b = 0, C = f.responseEnd, l += 1; l < i.length; l++) {
            var Y = i[l], ie = Y.startTime;
            if (ie > C) break;
            var ue = Y.transferSize, fe = Y.initiatorType;
            ue && m0(fe) && (Y = Y.responseEnd, b += ue * (Y < C ? 1 : (C - ie) / (Y - ie)));
          }
          if (--l, n += 8 * (d + b) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var nd = null, ad = null;
  function Zs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function p0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function g0(e, n) {
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
  function id(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var rd = null;
  function Mw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === rd ? !1 : (rd = e, !0) : (rd = null, !1);
  }
  var y0 = typeof setTimeout == "function" ? setTimeout : void 0, Dw = typeof clearTimeout == "function" ? clearTimeout : void 0, v0 = typeof Promise == "function" ? Promise : void 0, Aw = typeof queueMicrotask == "function" ? queueMicrotask : typeof v0 < "u" ? function(e) {
    return v0.resolve(null).then(e).catch(zw);
  } : y0;
  function zw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Di(e) {
    return e === "head";
  }
  function b0(e, n) {
    var i = n, l = 0;
    do {
      var f = i.nextSibling;
      if (e.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(f), al(n);
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          l++;
        else if (i === "html")
          oo(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, oo(i);
          for (var d = i.firstChild; d; ) {
            var b = d.nextSibling, C = d.nodeName;
            d[Ge] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = b;
          }
        } else
          i === "body" && oo(e.ownerDocument.body);
      i = f;
    } while (i);
    al(n);
  }
  function x0(e, n) {
    var i = e;
    e = 0;
    do {
      var l = i.nextSibling;
      if (i.nodeType === 1 ? n ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (n ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), l && l.nodeType === 8)
        if (i = l.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = l;
    } while (i);
  }
  function ld(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ld(i), rt(i);
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
  function Ow(e, n, i, l) {
    for (; e.nodeType === 1; ) {
      var f = i;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ge])
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
      if (e = Pn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function jw(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = Pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function S0(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function od(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function sd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Lw(e, n) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || i.readyState !== "loading")
      n();
    else {
      var l = function() {
        n(), i.removeEventListener("DOMContentLoaded", l);
      };
      i.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Pn(e) {
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
  var ud = null;
  function w0(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return Pn(e.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function E0(e) {
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
  function _0(e, n, i) {
    switch (n = Zs(i), e) {
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
  function oo(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    rt(e);
  }
  var Jn = /* @__PURE__ */ new Map(), N0 = /* @__PURE__ */ new Set();
  function Qs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Wa = L.d;
  L.d = {
    f: Hw,
    r: Bw,
    D: Uw,
    C: kw,
    L: Vw,
    m: Yw,
    X: $w,
    S: qw,
    M: Xw
  };
  function Hw() {
    var e = Wa.f(), n = ks();
    return e || n;
  }
  function Bw(e) {
    var n = st(e);
    n !== null && n.tag === 5 && n.type === "form" ? qp(n) : Wa.r(e);
  }
  var el = typeof document > "u" ? null : document;
  function R0(e, n, i) {
    var l = el;
    if (l && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), N0.has(f) || (N0.add(f), e = { rel: e, crossOrigin: i, href: n }, l.querySelector(f) === null && (n = l.createElement("link"), sn(n, "link", e), at(n), l.head.appendChild(n)));
    }
  }
  function Uw(e) {
    Wa.D(e), R0("dns-prefetch", e, null);
  }
  function kw(e, n) {
    Wa.C(e, n), R0("preconnect", e, n);
  }
  function Vw(e, n, i) {
    Wa.L(e, n, i);
    var l = el;
    if (l && e && n) {
      var f = 'link[rel="preload"][as="' + an(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + an(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + an(
        i.imageSizes
      ) + '"]')) : f += '[href="' + an(e) + '"]';
      var d = f;
      switch (n) {
        case "style":
          d = tl(e);
          break;
        case "script":
          d = nl(e);
      }
      Jn.has(d) || (e = m(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : e,
          as: n
        },
        i
      ), Jn.set(d, e), l.querySelector(f) !== null || n === "style" && l.querySelector(so(d)) || n === "script" && l.querySelector(uo(d)) || (n = l.createElement("link"), sn(n, "link", e), at(n), l.head.appendChild(n)));
    }
  }
  function Yw(e, n) {
    Wa.m(e, n);
    var i = el;
    if (i && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + an(l) + '"][href="' + an(e) + '"]', d = f;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = nl(e);
      }
      if (!Jn.has(d) && (e = m({ rel: "modulepreload", href: e }, n), Jn.set(d, e), i.querySelector(f) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(uo(d)))
              return;
        }
        l = i.createElement("link"), sn(l, "link", e), at(l), i.head.appendChild(l);
      }
    }
  }
  function qw(e, n, i) {
    Wa.S(e, n, i);
    var l = el;
    if (l && e) {
      var f = jt(l).hoistableStyles, d = tl(e);
      n = n || "default";
      var b = f.get(d);
      if (!b) {
        var C = { loading: 0, preload: null };
        if (b = l.querySelector(
          so(d)
        ))
          C.loading = 5;
        else {
          e = m(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = Jn.get(d)) && cd(e, i);
          var Y = b = l.createElement("link");
          at(Y), sn(Y, "link", e), Y._p = new Promise(function(ie, ue) {
            Y.onload = ie, Y.onerror = ue;
          }), Y.addEventListener("load", function() {
            C.loading |= 1;
          }), Y.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Fs(b, n, l);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: C
        }, f.set(d, b);
      }
    }
  }
  function $w(e, n) {
    Wa.X(e, n);
    var i = el;
    if (i && e) {
      var l = jt(i).hoistableScripts, f = nl(e), d = l.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = m({ src: e, async: !0 }, n), (n = Jn.get(f)) && fd(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(f, d));
    }
  }
  function Xw(e, n) {
    Wa.M(e, n);
    var i = el;
    if (i && e) {
      var l = jt(i).hoistableScripts, f = nl(e), d = l.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = m({ src: e, async: !0, type: "module" }, n), (n = Jn.get(f)) && fd(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(f, d));
    }
  }
  function C0(e, n, i, l) {
    var f = (f = he.current) ? Qs(f) : null;
    if (!f) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = tl(i.href), i = jt(
          f
        ).hoistableStyles, l = i.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = tl(i.href);
          var d = jt(
            f
          ).hoistableStyles, b = d.get(e);
          if (b || (f = f.ownerDocument || f, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, b), (d = f.querySelector(
            so(e)
          )) && !d._p && (b.instance = d, b.state.loading = 5), Jn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Jn.set(e, i), d || Gw(
            f,
            e,
            i,
            b.state
          ))), n && l === null)
            throw Error(o(528, ""));
          return b;
        }
        if (n && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = nl(i), i = jt(
          f
        ).hoistableScripts, l = i.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function tl(e) {
    return 'href="' + an(e) + '"';
  }
  function so(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function T0(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Gw(e, n, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), sn(n, "link", i), at(n), e.head.appendChild(n));
  }
  function nl(e) {
    return '[src="' + an(e) + '"]';
  }
  function uo(e) {
    return "script[async]" + e;
  }
  function M0(e, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + an(i.href) + '"]'
          );
          if (l)
            return n.instance = l, at(l), l;
          var f = m({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), at(l), sn(l, "style", f), Fs(l, i.precedence, e), n.instance = l;
        case "stylesheet":
          f = tl(i.href);
          var d = e.querySelector(
            so(f)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, at(d), d;
          l = T0(i), (f = Jn.get(f)) && cd(l, f), d = (e.ownerDocument || e).createElement("link"), at(d);
          var b = d;
          return b._p = new Promise(function(C, Y) {
            b.onload = C, b.onerror = Y;
          }), sn(d, "link", l), n.state.loading |= 4, Fs(d, i.precedence, e), n.instance = d;
        case "script":
          return d = nl(i.src), (f = e.querySelector(
            uo(d)
          )) ? (n.instance = f, at(f), f) : (l = i, (f = Jn.get(d)) && (l = m({}, i), fd(l, f)), e = e.ownerDocument || e, f = e.createElement("script"), at(f), sn(f, "link", l), e.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(o(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, Fs(l, i.precedence, e));
    return n.instance;
  }
  function Fs(e, n, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = l.length ? l[l.length - 1] : null, d = f, b = 0; b < l.length; b++) {
      var C = l[b];
      if (C.dataset.precedence === n) d = C;
      else if (d !== f) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(e, n.firstChild));
  }
  function cd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function fd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ks = null;
  function D0(e, n, i) {
    if (Ks === null) {
      var l = /* @__PURE__ */ new Map(), f = Ks = /* @__PURE__ */ new Map();
      f.set(i, l);
    } else
      f = Ks, l = f.get(i), l || (l = /* @__PURE__ */ new Map(), f.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), f = 0; f < i.length; f++) {
      var d = i[f];
      if (!(d[Ge] || d[ve] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = d.getAttribute(n) || "";
        b = e + b;
        var C = l.get(b);
        C ? C.push(d) : l.set(b, [d]);
      }
    }
    return l;
  }
  function A0(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Iw(e, n, i) {
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
  function z0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Zw(e, n, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = tl(l.href), d = n.querySelector(
          so(f)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ps.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, at(d);
          return;
        }
        d = n.ownerDocument || n, l = T0(l), (f = Jn.get(f)) && cd(l, f), d = d.createElement("link"), at(d);
        var b = d;
        b._p = new Promise(function(C, Y) {
          b.onload = C, b.onerror = Y;
        }), sn(d, "link", l), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Ps.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var dd = 0;
  function Qw(e, n) {
    return e.stylesheets && e.count === 0 && Ws(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && dd === 0 && (dd = 62500 * Tw());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > dd ? 50 : 800) + n
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(f);
      };
    } : null;
  }
  function Ps() {
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Js = /* @__PURE__ */ new Map(), n.forEach(Fw, e), Js = null, Ps.call(e));
  }
  function Fw(e, n) {
    if (!(n.state.loading & 4)) {
      var i = Js.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Js.set(e, i);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < f.length; d++) {
          var b = f[d];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (i.set(b.dataset.precedence, b), l = b);
        }
        l && i.set(null, l);
      }
      f = n.instance, b = f.getAttribute("data-precedence"), d = i.get(b) || l, d === l && i.set(null, f), i.set(b, f), this.count++, l = Ps.bind(this), f.addEventListener("load", l), f.addEventListener("error", l), d ? d.parentNode.insertBefore(f, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), n.state.loading |= 4;
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
  function Kw(e, n, i, l, f, d, b, C, Y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = l, this.onUncaughtError = f, this.onCaughtError = d, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = Y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function O0(e, n, i, l, f, d, b, C, Y, ie, ue, fe) {
    return e = new Kw(
      e,
      n,
      i,
      b,
      Y,
      ie,
      ue,
      fe,
      C
    ), n = 1, d === !0 && (n |= 24), d = On(3, null, null, n), e.current = d, d.stateNode = e, n = Xc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: n
    }, Qc(d), e;
  }
  function j0(e) {
    return e ? (e = Or, e) : Or;
  }
  function L0(e, n, i, l, f, d) {
    f = j0(f), l.context === null ? l.context = f : l.pendingContext = f, l = bi(n), l.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (l.callback = d), i = xi(e, l, n), i !== null && (Rn(i, e, n), ql(i, e, n));
  }
  function H0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function hd(e, n) {
    H0(e, n), (e = e.alternate) && H0(e, n);
  }
  function B0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ki(e, 67108864);
      n !== null && Rn(n, e, 67108864), hd(e, 67108864);
    }
  }
  function U0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Un();
      n = Q(n);
      var i = Ki(e, n);
      i !== null && Rn(i, e, n), hd(e, n);
    }
  }
  var eu = !0;
  function Pw(e, n, i, l) {
    var f = _.T;
    _.T = null;
    var d = L.p;
    try {
      L.p = 2, md(e, n, i, l);
    } finally {
      L.p = d, _.T = f;
    }
  }
  function Jw(e, n, i, l) {
    var f = _.T;
    _.T = null;
    var d = L.p;
    try {
      L.p = 8, md(e, n, i, l);
    } finally {
      L.p = d, _.T = f;
    }
  }
  function md(e, n, i, l) {
    if (eu) {
      var f = pd(l);
      if (f === null)
        ed(
          e,
          n,
          l,
          tu,
          i
        ), V0(e, l);
      else if (eE(
        f,
        e,
        n,
        i,
        l
      ))
        l.stopPropagation();
      else if (V0(e, l), n & 4 && -1 < Ww.indexOf(e)) {
        for (; f !== null; ) {
          var d = st(f);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var b = un(d.pendingLanes);
                  if (b !== 0) {
                    var C = d;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; b; ) {
                      var Y = 1 << 31 - kt(b);
                      C.entanglements[1] |= Y, b &= ~Y;
                    }
                    Ra(d), (ht & 6) === 0 && (Bs = Fe() + 500, io(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = Ki(d, 2), C !== null && Rn(C, d, 2), ks(), hd(d, 2);
            }
          if (d = pd(l), d === null && ed(
            e,
            n,
            l,
            tu,
            i
          ), d === f) break;
          f = d;
        }
        f !== null && l.stopPropagation();
      } else
        ed(
          e,
          n,
          l,
          null,
          i
        );
    }
  }
  function pd(e) {
    return e = gc(e), gd(e);
  }
  var tu = null;
  function gd(e) {
    if (tu = null, e = Rt(e), e !== null) {
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
  function k0(e) {
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
          case Xt:
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
  var yd = !1, Ai = null, zi = null, Oi = null, fo = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map(), ji = [], Ww = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function V0(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ai = null;
        break;
      case "dragenter":
      case "dragleave":
        zi = null;
        break;
      case "mouseover":
      case "mouseout":
        Oi = null;
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
  function mo(e, n, i, l, f, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: d,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && B0(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), e);
  }
  function eE(e, n, i, l, f) {
    switch (n) {
      case "focusin":
        return Ai = mo(
          Ai,
          e,
          n,
          i,
          l,
          f
        ), !0;
      case "dragenter":
        return zi = mo(
          zi,
          e,
          n,
          i,
          l,
          f
        ), !0;
      case "mouseover":
        return Oi = mo(
          Oi,
          e,
          n,
          i,
          l,
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
            l,
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
            l,
            f
          )
        ), !0;
    }
    return !1;
  }
  function Y0(e) {
    var n = Rt(e.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              U0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              U0(i);
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
      var i = pd(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        pc = l, i.target.dispatchEvent(l), pc = null;
      } else
        return n = st(i), n !== null && B0(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function q0(e, n, i) {
    nu(e) && i.delete(n);
  }
  function tE() {
    yd = !1, Ai !== null && nu(Ai) && (Ai = null), zi !== null && nu(zi) && (zi = null), Oi !== null && nu(Oi) && (Oi = null), fo.forEach(q0), ho.forEach(q0);
  }
  function au(e, n) {
    e.blockedOn === n && (e.blockedOn = null, yd || (yd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      tE
    )));
  }
  var iu = null;
  function $0(e) {
    iu !== e && (iu = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        iu === e && (iu = null);
        for (var n = 0; n < e.length; n += 3) {
          var i = e[n], l = e[n + 1], f = e[n + 2];
          if (typeof l != "function") {
            if (gd(l || i) === null)
              continue;
            break;
          }
          var d = st(i);
          d !== null && (e.splice(n, 3), n -= 3, pf(
            d,
            {
              pending: !0,
              data: f,
              method: i.method,
              action: l
            },
            l,
            f
          ));
        }
      }
    ));
  }
  function al(e) {
    function n(Y) {
      return au(Y, e);
    }
    Ai !== null && au(Ai, e), zi !== null && au(zi, e), Oi !== null && au(Oi, e), fo.forEach(n), ho.forEach(n);
    for (var i = 0; i < ji.length; i++) {
      var l = ji[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ji.length && (i = ji[0], i.blockedOn === null); )
      Y0(i), i.blockedOn === null && ji.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var f = i[l], d = i[l + 1], b = f[Se] || null;
        if (typeof d == "function")
          b || $0(i);
        else if (b) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (f = d, b = d[Se] || null)
              C = b.formAction;
            else if (gd(f) !== null) continue;
          } else C = b.action;
          typeof C == "function" ? i[l + 1] = C : (i.splice(l, 3), l -= 3), $0(i);
        }
      }
  }
  function X0() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
        handler: function() {
          return new Promise(function(b) {
            return f = b;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      f !== null && (f(), f = null), l || setTimeout(i, 20);
    }
    function i() {
      if (!l && !navigation.transition) {
        var d = navigation.currentEntry;
        d && d.url != null && navigation.navigate(d.url, {
          state: d.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, f = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function vd(e) {
    this._internalRoot = e;
  }
  ru.prototype.render = vd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    var i = n.current, l = Un();
    L0(i, l, e, n, null, null);
  }, ru.prototype.unmount = vd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      L0(e.current, 2, null, e, null, null), ks(), n[be] = null;
    }
  };
  function ru(e) {
    this._internalRoot = e;
  }
  ru.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = de();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < ji.length && n !== 0 && n < ji[i].priority; i++) ;
      ji.splice(i, 0, e), i === 0 && Y0(e);
    }
  };
  var G0 = a.version;
  if (G0 !== "19.2.7")
    throw Error(
      o(
        527,
        G0,
        "19.2.7"
      )
    );
  L.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = g(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var nE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var lu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!lu.isDisabled && lu.supportsFiber)
      try {
        tn = lu.inject(
          nE
        ), Kt = lu;
      } catch {
      }
  }
  return go.createRoot = function(e, n) {
    if (!s(e)) throw Error(o(299));
    var i = !1, l = "", f = Jp, d = Wp, b = eg;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError)), n = O0(
      e,
      1,
      !1,
      null,
      null,
      i,
      l,
      null,
      f,
      d,
      b,
      X0
    ), e[be] = n.current, Wf(e), new vd(n);
  }, go.hydrateRoot = function(e, n, i) {
    if (!s(e)) throw Error(o(299));
    var l = !1, f = "", d = Jp, b = Wp, C = eg, Y = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (b = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (Y = i.formState)), n = O0(
      e,
      1,
      !0,
      n,
      i ?? null,
      l,
      f,
      Y,
      d,
      b,
      C,
      X0
    ), n.context = j0(null), i = n.current, l = Un(), l = Q(l), f = bi(l), f.callback = null, xi(i, f, l), i = l, n.current.lanes = i, pt(n, i), Ra(n), e[be] = n.current, Wf(e), new ru(n);
  }, go.version = "19.2.7", go;
}
var ty;
function hE() {
  if (ty) return Sd.exports;
  ty = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Sd.exports = dE(), Sd.exports;
}
var mE = hE();
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
var gb = (t) => {
  throw TypeError(t);
}, yb = (t, a, r) => a.has(t) || gb("Cannot " + r), Wn = (t, a, r) => (yb(t, a, "read from private field"), r ? r.call(t) : a.get(t)), wo = (t, a, r) => a.has(t) ? gb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, r), Ca = (t, a, r, o) => (yb(t, a, "write to private field"), a.set(t, r), r);
function ny(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function pE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: o = !1 } = t, s;
  s = a.map(
    (x, S) => y(
      x,
      typeof x == "string" ? null : x.state,
      S === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    r ?? s.length - 1
  ), c = "POP", h = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function g() {
    return s[u];
  }
  function y(x, S = null, T, N) {
    let R = Kd(
      s ? g().pathname : "/",
      x,
      S,
      T,
      N
    );
    return $t(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), R;
  }
  function m(x) {
    return typeof x == "string" ? x : ja(x);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return c;
    },
    get location() {
      return g();
    },
    createHref: m,
    createURL(x) {
      return new URL(m(x), "http://localhost");
    },
    encodeLocation(x) {
      let S = typeof x == "string" ? va(x) : x;
      return {
        pathname: S.pathname || "",
        search: S.search || "",
        hash: S.hash || ""
      };
    },
    push(x, S) {
      c = "PUSH";
      let T = ny(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, T), o && h && h({ action: c, location: T, delta: 1 });
    },
    replace(x, S) {
      c = "REPLACE";
      let T = ny(x) ? x : y(x, S);
      s[u] = T, o && h && h({ action: c, location: T, delta: 0 });
    },
    go(x) {
      c = "POP";
      let S = p(u + x), T = s[S];
      u = S, h && h({ action: c, location: T, delta: x });
    },
    listen(x) {
      return h = x, () => {
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
function gE() {
  return Math.random().toString(36).substring(2, 10);
}
function Kd(t, a, r = null, o, s) {
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
    key: a && a.key || o || gE(),
    mask: s
  };
}
function ja({
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
    let o = t.indexOf("?");
    o >= 0 && (a.search = t.substring(o), t = t.substring(0, o)), t && (a.pathname = t);
  }
  return a;
}
function yE(t, a, r = !1) {
  let o = "http://localhost";
  t && (o = t.location.origin !== "null" ? t.location.origin : t.location.href), Ze(o, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : ja(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = o + s), new URL(s, o);
}
var Eo, ay = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (wo(this, Eo, /* @__PURE__ */ new Map()), t)
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
    if (Wn(this, Eo).has(t))
      return Wn(this, Eo).get(t);
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
    Wn(this, Eo).set(t, a);
  }
};
Eo = /* @__PURE__ */ new WeakMap();
var vE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function bE(t) {
  return vE.has(
    t
  );
}
var xE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function SE(t) {
  return xE.has(
    t
  );
}
function wE(t) {
  return t.index === !0;
}
function Mo(t, a, r = [], o = {}, s = !1) {
  return t.map((u, c) => {
    let h = [...r, String(c)], p = typeof u.id == "string" ? u.id : h.join("-");
    if (Ze(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ze(
      s || !o[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), wE(u)) {
      let g = {
        ...u,
        id: p
      };
      return o[p] = iy(
        g,
        a(g)
      ), g;
    } else {
      let g = {
        ...u,
        id: p,
        children: void 0
      };
      return o[p] = iy(
        g,
        a(g)
      ), u.children && (g.children = Mo(
        u.children,
        a,
        h,
        o,
        s
      )), g;
    }
  });
}
function iy(t, a) {
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
function vb(t, a, r = "/") {
  return da(t, a, r, !1);
}
function da(t, a, r, o, s) {
  let u = typeof a == "string" ? va(a) : a, c = aa(u.pathname || "/", r);
  if (c == null)
    return null;
  let h = s ?? Cu(t), p = null, g = LE(c);
  for (let y = 0; p == null && y < h.length; ++y)
    p = OE(
      h[y],
      g,
      o
    );
  return p;
}
function EE(t, a) {
  let { route: r, pathname: o, params: s } = t;
  return {
    id: r.id,
    pathname: o,
    params: s,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function Cu(t) {
  let a = bb(t);
  return _E(a), a;
}
function bb(t, a = [], r = [], o = "", s = !1) {
  let u = (c, h, p = s, g) => {
    let y = {
      relativePath: g === void 0 ? c.path || "" : g,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: h,
      route: c
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(o) && p)
        return;
      Ze(
        y.relativePath.startsWith(o),
        `Absolute route path "${y.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(o.length);
    }
    let m = na([o, y.relativePath]), v = r.concat(y);
    c.children && c.children.length > 0 && (Ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
    ), bb(
      c.children,
      a,
      v,
      m,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: m,
      score: AE(m, c.index),
      routesMeta: v
    });
  };
  return t.forEach((c, h) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, h);
    else
      for (let p of xb(c.path))
        u(c, h, !0, p);
  }), a;
}
function xb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [r, ...o] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [u, ""] : [u];
  let c = xb(o.join("/")), h = [];
  return h.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && h.push(...c), h.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function _E(t) {
  t.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : zE(
      a.routesMeta.map((o) => o.childrenIndex),
      r.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var NE = /^:[\w-]+$/, RE = 3, CE = 2, TE = 1, ME = 10, DE = -2, ry = (t) => t === "*";
function AE(t, a) {
  let r = t.split("/"), o = r.length;
  return r.some(ry) && (o += DE), a && (o += CE), r.filter((s) => !ry(s)).reduce(
    (s, u) => s + (NE.test(u) ? RE : u === "" ? TE : ME),
    o
  );
}
function zE(t, a) {
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
function OE(t, a, r = !1) {
  let { routesMeta: o } = t, s = {}, u = "/", c = [];
  for (let h = 0; h < o.length; ++h) {
    let p = o[h], g = h === o.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", m = Hu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: g },
      y
    ), v = p.route;
    if (!m && g && r && !o[o.length - 1].route.index && (m = Hu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !m)
      return null;
    Object.assign(s, m.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: na([u, m.pathname]),
      pathnameBase: UE(
        na([u, m.pathnameBase])
      ),
      route: v
    }), m.pathnameBase !== "/" && (u = na([u, m.pathnameBase]));
  }
  return c;
}
function Hu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [r, o] = jE(
    t.path,
    t.caseSensitive,
    t.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), h = s.slice(1);
  return {
    params: o.reduce(
      (g, { paramName: y, isOptional: m }, v) => {
        if (y === "*") {
          let S = h[v] || "";
          c = u.slice(0, u.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const x = h[v];
        return m && !x ? g[y] = void 0 : g[y] = (x || "").replace(/%2F/g, "/"), g;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: t
  };
}
function jE(t, a = !1, r = !0) {
  $t(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let o = [], s = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, h, p, g, y) => {
      if (o.push({ paramName: h, isOptional: p != null }), p) {
        let m = y.charAt(g + c.length);
        return m && m !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (o.push({ paramName: "*" }), s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), o];
}
function LE(t) {
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
  let r = a.endsWith("/") ? a.length - 1 : a.length, o = t.charAt(r);
  return o && o !== "/" ? null : t.slice(r) || "/";
}
function HE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : na([t, a]);
}
var Sb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Mh = (t) => Sb.test(t);
function BE(t, a = "/") {
  let {
    pathname: r,
    search: o = "",
    hash: s = ""
  } = typeof t == "string" ? va(t) : t, u;
  return r ? (r = Ah(r), r.startsWith("/") ? u = ly(r.substring(1), "/") : u = ly(r, a)) : u = a, {
    pathname: u,
    search: kE(o),
    hash: VE(s)
  };
}
function ly(t, a) {
  let r = Bu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Nd(t, a, r, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function wb(t) {
  return t.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Dh(t) {
  let a = wb(t);
  return a.map(
    (r, o) => o === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Fu(t, a, r, o = !1) {
  let s;
  typeof t == "string" ? s = va(t) : (s = { ...t }, Ze(
    !s.pathname || !s.pathname.includes("?"),
    Nd("?", "pathname", "search", s)
  ), Ze(
    !s.pathname || !s.pathname.includes("#"),
    Nd("#", "pathname", "hash", s)
  ), Ze(
    !s.search || !s.search.includes("#"),
    Nd("#", "search", "hash", s)
  ));
  let u = t === "" || s.pathname === "", c = u ? "/" : s.pathname, h;
  if (c == null)
    h = r;
  else {
    let m = a.length - 1;
    if (!o && c.startsWith("..")) {
      let v = c.split("/");
      for (; v[0] === ".."; )
        v.shift(), m -= 1;
      s.pathname = v.join("/");
    }
    h = m >= 0 ? a[m] : "/";
  }
  let p = BE(s, h), g = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (g || y) && (p.pathname += "/"), p;
}
var Ah = (t) => t.replace(/\/\/+/g, "/"), na = (t) => Ah(t.join("/")), Bu = (t) => t.replace(/\/+$/, ""), UE = (t) => Bu(t).replace(/^\/*/, "/"), kE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, VE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, oy = (t, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let o = new Headers(r.headers);
  return o.set("Location", t), new Response(null, { ...r, headers: o });
}, Ku = class {
  constructor(t, a, r, o = !1) {
    this.status = t, this.statusText = a || "", this.internal = o, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Do(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function qo(t) {
  let a = t.map((r) => r.route.path).filter(Boolean);
  return na(a) || "/";
}
var Eb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function _b(t, a) {
  let r = t;
  if (typeof r != "string" || !Sb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let o = r, s = !1;
  if (Eb)
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
    absoluteURL: o,
    isExternal: s,
    to: r
  };
}
var qi = Symbol("Uninstrumented");
function YE(t, a) {
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
  let o = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let s = sl(r.lazy, a.lazy, () => {
    });
    s && (o.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], h = r[`lazy.${u}`];
      if (typeof c == "function" && h.length > 0) {
        let p = sl(h, c, () => {
        });
        p && (o.lazy = Object.assign(o.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && r[s].length > 0) {
      let c = u[qi] ?? u, h = sl(
        r[s],
        c,
        (...p) => sy(p[0])
      );
      h && (s === "loader" && c.hydrate === !0 && (h.hydrate = !0), h[qi] = c, o[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (o.middleware = a.middleware.map((s) => {
    let u = s[qi] ?? s, c = sl(
      r.middleware,
      u,
      (...h) => sy(h[0])
    );
    return c ? (c[qi] = u, c) : s;
  })), o;
}
function qE(t, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (o) => o({
      instrument(s) {
        let u = Object.keys(s);
        for (let c of u)
          s[c] && r[c].push(s[c]);
      }
    })
  ), r.navigate.length > 0) {
    let o = t.navigate[qi] ?? t.navigate, s = sl(
      r.navigate,
      o,
      (...u) => {
        let [c, h] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? ja(c) : ".",
          ...uy(t, h ?? {})
        };
      }
    );
    s && (s[qi] = o, t.navigate = s);
  }
  if (r.fetch.length > 0) {
    let o = t.fetch[qi] ?? t.fetch, s = sl(r.fetch, o, (...u) => {
      let [c, , h, p] = u;
      return {
        href: h ?? ".",
        fetcherKey: c,
        ...uy(t, p ?? {})
      };
    });
    s && (s[qi] = o, t.fetch = s);
  }
  return t;
}
function sl(t, a, r) {
  return t.length === 0 ? null : async (...o) => {
    let s = await Nb(
      t,
      r(...o),
      () => a(...o),
      t.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function Nb(t, a, r, o) {
  let s = t[o], u;
  if (s) {
    let c, h = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Nb(t, a, r, o - 1), u = await c, Ze(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
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
function sy(t) {
  let { request: a, context: r, params: o, pattern: s } = t;
  return {
    request: $E(a),
    params: { ...o },
    pattern: s,
    context: XE(r)
  };
}
function uy(t, a) {
  return {
    currentUrl: ja(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function $E(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function XE(t) {
  if (IE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var GE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function IE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === GE;
}
var Rb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], ZE = new Set(
  Rb
), QE = [
  "GET",
  ...Rb
], FE = new Set(QE), Cb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), KE = /* @__PURE__ */ new Set([307, 308]), Rd = {
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
}, PE = {
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
}, JE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Tb = "remix-router-transitions", Mb = Symbol("ResetLoaderData"), dr, rl, ki, ll, WE = class {
  constructor(t) {
    wo(this, dr), wo(this, rl), wo(this, ki), wo(this, ll), Ca(this, dr, t), Ca(this, rl, Cu(t));
  }
  /** The stable route tree */
  get stableRoutes() {
    return Wn(this, dr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return Wn(this, ki) ?? Wn(this, dr);
  }
  /** Pre-computed branches */
  get branches() {
    return Wn(this, ll) ?? Wn(this, rl);
  }
  get hasHMRRoutes() {
    return Wn(this, ki) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    Ca(this, dr, t), Ca(this, rl, Cu(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    Ca(this, ki, t), Ca(this, ll, Cu(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Wn(this, ki) && (Ca(this, dr, Wn(this, ki)), Ca(this, rl, Wn(this, ll)), Ca(this, ki, void 0), Ca(this, ll, void 0));
  }
};
dr = /* @__PURE__ */ new WeakMap();
rl = /* @__PURE__ */ new WeakMap();
ki = /* @__PURE__ */ new WeakMap();
ll = /* @__PURE__ */ new WeakMap();
function e_(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ze(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o = t.hydrationRouteProperties || [], s = t.mapRouteProperties || JE, u = s;
  if (t.instrumentations) {
    let B = t.instrumentations;
    u = (Q) => ({
      ...s(Q),
      ...YE(
        B.map((J) => J.route).filter(Boolean),
        Q
      )
    });
  }
  let c = {}, h = new WE(
    Mo(
      t.routes,
      u,
      void 0,
      c
    )
  ), p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let g = t.dataStrategy || r_, y = {
    ...t.future
  }, m = null, v = /* @__PURE__ */ new Set(), x = null, S = null, T = null, N = null, R = t.hydrationData != null, z = da(
    h.activeRoutes,
    t.history.location,
    p,
    !1,
    h.branches
  ), E = !1, j = null, U, H;
  if (z == null && !t.patchRoutesOnNavigation) {
    let B = ea(404, {
      pathname: t.history.location.pathname
    }), { matches: Q, route: J } = ou(h.activeRoutes);
    U = !0, H = !U, z = Q, j = { [J.id]: B };
  } else if (z && !t.hydrationData && mn(
    z,
    h.activeRoutes,
    t.history.location.pathname
  ).active && (z = null), z)
    if (z.some((B) => B.route.lazy))
      U = !1, H = !U;
    else if (!z.some((B) => zh(B.route)))
      U = !0, H = !U;
    else {
      let B = t.hydrationData ? t.hydrationData.loaderData : null, Q = t.hydrationData ? t.hydrationData.errors : null, J = z;
      if (Q) {
        let de = z.findIndex(
          (pe) => Q[pe.route.id] !== void 0
        );
        J = J.slice(0, de + 1);
      }
      H = !1, U = !0, J.forEach((de) => {
        let pe = Db(de.route, B, Q);
        H = H || pe.renderFallback, U = U && !pe.shouldLoad;
      });
    }
  else {
    U = !1, H = !U, z = [];
    let B = mn(
      null,
      h.activeRoutes,
      t.history.location.pathname
    );
    B.active && B.matches && (E = !0, z = B.matches);
  }
  let V, D = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: z,
    initialized: U,
    renderFallback: H,
    navigation: Rd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || j,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", le = null, I = !1, K, W = !1, O = /* @__PURE__ */ new Map(), $ = null, _ = !1, L = !1, Z = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), ne = 0, A = -1, k = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Set(), te = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), ee, ge = null;
  function ze() {
    if (m = t.history.listen(
      ({ action: B, location: Q, delta: J }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        $t(
          me.size === 0 || J != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = $n({
          currentLocation: D.location,
          nextLocation: Q,
          historyAction: B
        });
        if (de && J != null) {
          let pe = new Promise((Ee) => {
            ee = Ee;
          });
          t.history.go(J * -1), Mn(de, {
            state: "blocked",
            location: Q,
            proceed() {
              Mn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Q
              }), pe.then(() => t.history.go(J));
            },
            reset() {
              let Ee = new Map(D.blockers);
              Ee.set(de, yo), xe({ blockers: Ee });
            }
          }), le?.resolve(), le = null;
          return;
        }
        return Te(B, Q);
      }
    ), r) {
      E_(a, O);
      let B = () => __(a, O);
      a.addEventListener("pagehide", B), $ = () => a.removeEventListener("pagehide", B);
    }
    return D.initialized || Te("POP", D.location, {
      initialHydration: !0
    }), V;
  }
  function Ce() {
    m && m(), $ && $(), v.clear(), K && K.abort(), D.fetchers.forEach((B, Q) => tn(D.fetchers, Q)), D.blockers.forEach((B, Q) => ra(Q));
  }
  function we(B) {
    if (v.add(B), x) {
      let { newErrors: Q } = x;
      x = null, B(D, {
        deletedFetchers: [],
        newErrors: Q,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(B);
  }
  function xe(B, Q = {}) {
    B.matches && (B.matches = B.matches.map((pe) => {
      let Ee = c[pe.route.id], ve = pe.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...pe,
        route: Ee
      } : pe;
    })), D = {
      ...D,
      ...B
    };
    let J = [], de = [];
    D.fetchers.forEach((pe, Ee) => {
      pe.state === "idle" && (he.has(Ee) ? J.push(Ee) : de.push(Ee));
    }), he.forEach((pe) => {
      !D.fetchers.has(pe) && !G.has(pe) && J.push(pe);
    }), v.size === 0 && (x = { newErrors: B.errors ?? null }), [...v].forEach(
      (pe) => pe(D, {
        deletedFetchers: J,
        newErrors: B.errors ?? null,
        viewTransitionOpts: Q.viewTransitionOpts,
        flushSync: Q.flushSync === !0
      })
    ), J.forEach((pe) => tn(D.fetchers, pe)), de.forEach((pe) => D.fetchers.delete(pe));
  }
  function Re(B, Q, { flushSync: J } = {}) {
    let de = D.actionData != null && D.navigation.formMethod != null && dn(D.navigation.formMethod) && D.navigation.state === "loading" && B.state?._isRedirect !== !0, pe;
    Q.actionData ? Object.keys(Q.actionData).length > 0 ? pe = Q.actionData : pe = null : de ? pe = D.actionData : pe = null;
    let Ee = Q.loaderData ? xy(
      D.loaderData,
      Q.loaderData,
      Q.matches || [],
      Q.errors
    ) : D.loaderData, ve = D.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((De, ke) => ve.set(ke, yo)));
    let Se = _ ? !1 : Vt(B, Q.matches || D.matches), be = I === !0 || D.navigation.formMethod != null && dn(D.navigation.formMethod) && B.state?._isRedirect !== !0;
    h.commitHmrRoutes(), _ || q === "POP" || (q === "PUSH" ? t.history.push(B, B.state) : q === "REPLACE" && t.history.replace(B, B.state));
    let Me;
    if (q === "POP") {
      let De = O.get(D.location.pathname);
      De && De.has(B.pathname) ? Me = {
        currentLocation: D.location,
        nextLocation: B
      } : O.has(B.pathname) && (Me = {
        currentLocation: B,
        nextLocation: D.location
      });
    } else if (W) {
      let De = O.get(D.location.pathname);
      De ? De.add(B.pathname) : (De = /* @__PURE__ */ new Set([B.pathname]), O.set(D.location.pathname, De)), Me = {
        currentLocation: D.location,
        nextLocation: B
      };
    }
    xe(
      {
        ...Q,
        // matches, errors, fetchers go through as-is
        actionData: pe,
        loaderData: Ee,
        historyAction: q,
        location: B,
        initialized: !0,
        renderFallback: !1,
        navigation: Rd,
        revalidation: "idle",
        restoreScrollPosition: Se,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Me,
        flushSync: J === !0
      }
    ), q = "POP", I = !1, W = !1, _ = !1, L = !1, le?.resolve(), le = null, ge?.resolve(), ge = null;
  }
  async function qe(B, Q) {
    if (le?.resolve(), le = null, typeof B == "number") {
      le || (le = _y());
      let rt = le.promise;
      return t.history.go(B), rt;
    }
    let J = Pd(
      D.location,
      D.matches,
      p,
      B,
      Q?.fromRouteId,
      Q?.relative
    ), { path: de, submission: pe, error: Ee } = cy(
      !1,
      J,
      Q
    ), ve;
    Q?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Q.mask == "string" ? va(Q.mask) : {
        ...D.location.mask,
        ...Q.mask
      }
    });
    let Se = D.location, be = Kd(
      Se,
      de,
      Q && Q.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...t.history.encodeLocation(be)
    };
    let Me = Q && Q.replace != null ? Q.replace : void 0, De = "PUSH";
    Me === !0 ? De = "REPLACE" : Me === !1 || pe != null && dn(pe.formMethod) && pe.formAction === D.location.pathname + D.location.search && (De = "REPLACE");
    let ke = Q && "preventScrollReset" in Q ? Q.preventScrollReset === !0 : void 0, je = (Q && Q.flushSync) === !0, Ge = $n({
      currentLocation: Se,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      Mn(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          Mn(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), qe(B, Q);
        },
        reset() {
          let rt = new Map(D.blockers);
          rt.set(Ge, yo), xe({ blockers: rt });
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
      replace: Q && Q.replace,
      enableViewTransition: Q && Q.viewTransition,
      flushSync: je,
      callSiteDefaultShouldRevalidate: Q && Q.defaultShouldRevalidate
    });
  }
  function ft() {
    ge || (ge = _y()), Lt(), xe({ revalidation: "loading" });
    let B = ge.promise;
    return D.navigation.state === "submitting" ? B : D.navigation.state === "idle" ? (Te(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), B) : (Te(
      q || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: W === !0
      }
    ), B);
  }
  async function Te(B, Q, J) {
    K && K.abort(), K = null, q = B, _ = (J && J.startUninterruptedRevalidation) === !0, Ht(D.location, D.matches), I = (J && J.preventScrollReset) === !0, W = (J && J.enableViewTransition) === !0;
    let de = h.activeRoutes, pe = J?.initialHydration && D.matches && D.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : da(
      de,
      Q,
      p,
      !1,
      h.branches
    ), Ee = (J && J.flushSync) === !0;
    if (pe && D.initialized && !L && h_(D.location, Q) && !(J && J.submission && dn(J.submission.formMethod))) {
      Re(Q, { matches: pe }, { flushSync: Ee });
      return;
    }
    let ve = mn(pe, de, Q.pathname);
    if (ve.active && ve.matches && (pe = ve.matches), !pe) {
      let { error: st, notFoundMatches: We, route: jt } = un(
        Q.pathname
      );
      Re(
        Q,
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
    let Se = J && J.overrideNavigation ? {
      ...J.overrideNavigation,
      matches: pe,
      historyAction: B
    } : void 0;
    K = new AbortController();
    let be = ol(
      t.history,
      Q,
      K.signal,
      J && J.submission
    ), Me = t.getContext ? await t.getContext() : new ay(), De;
    if (J && J.pendingError)
      De = [
        Vi(pe).route.id,
        { type: "error", error: J.pendingError }
      ];
    else if (J && J.submission && dn(J.submission.formMethod)) {
      let st = await Ie(
        be,
        Q,
        J.submission,
        pe,
        B,
        Me,
        ve.active,
        J && J.initialHydration === !0,
        { replace: J.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, jt] = st.pendingActionResult;
        if (kn(jt) && Do(jt.error) && jt.error.status === 404) {
          K = null, Re(Q, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: jt.error
            }
          });
          return;
        }
      }
      pe = st.matches || pe, De = st.pendingActionResult, Se = Cd(
        Q,
        pe,
        B,
        J.submission
      ), Ee = !1, ve.active = !1, be = ol(
        t.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: ke,
      matches: je,
      loaderData: Ge,
      errors: rt,
      workingFetchers: Rt
    } = await Be(
      be,
      Q,
      pe,
      B,
      Me,
      ve.active,
      Se,
      J && J.submission,
      J && J.fetcherSubmission,
      J && J.replace,
      J && J.initialHydration === !0,
      Ee,
      De,
      J && J.callSiteDefaultShouldRevalidate
    );
    ke || (K = null, Re(Q, {
      matches: je || pe,
      ...Sy(De),
      loaderData: Ge,
      errors: rt,
      ...Rt ? { fetchers: Rt } : {}
    }));
  }
  async function Ie(B, Q, J, de, pe, Ee, ve, Se, be = {}) {
    Lt();
    let Me = S_(
      Q,
      de,
      pe,
      J
    );
    if (xe({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await pt(
        de,
        Q.pathname,
        B.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: rt, route: Rt } = ou(
            h.activeRoutes
          );
          return {
            matches: rt,
            pendingActionResult: [
              Rt.id,
              {
                type: "error",
                error: je.error
              }
            ]
          };
        }
        let Ge = Vi(je.partialMatches).route.id;
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
        let { notFoundMatches: Ge, error: rt, route: Rt } = un(
          Q.pathname
        );
        return {
          matches: Ge,
          pendingActionResult: [
            Rt.id,
            {
              type: "error",
              error: rt
            }
          ]
        };
      }
    }
    let De, ke = Tu(de, Q);
    if (!ke.route.action && !ke.route.lazy)
      De = {
        type: "error",
        error: ea(405, {
          method: B.method,
          pathname: Q.pathname,
          routeId: ke.route.id
        })
      };
    else {
      let je = fl(
        u,
        c,
        B,
        Q,
        de,
        ke,
        Se ? [] : o,
        Ee
      ), Ge = await yt(
        B,
        Q,
        je,
        Ee,
        null
      );
      if (De = Ge[ke.route.id], !De) {
        for (let rt of de)
          if (Ge[rt.route.id]) {
            De = Ge[rt.route.id];
            break;
          }
      }
      if (B.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (mr(De)) {
      let je;
      return be && be.replace != null ? je = be.replace : je = yy(
        De.response.headers.get("Location"),
        new URL(B.url),
        p,
        t.history
      ) === D.location.pathname + D.location.search, await gt(B, De, !0, {
        submission: J,
        replace: je
      }), { shortCircuited: !0 };
    }
    if (kn(De)) {
      let je = Vi(de, ke.route.id);
      return (be && be.replace) !== !0 && (q = "PUSH"), {
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
  async function Be(B, Q, J, de, pe, Ee, ve, Se, be, Me, De, ke, je, Ge) {
    let rt = ve || Cd(Q, J, de, Se), Rt = Se || be || Ey(rt), st = !_ && !De;
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
        J,
        Q.pathname,
        B.signal
      );
      if (Ue.type === "aborted")
        return { shortCircuited: !0 };
      if (Ue.type === "error") {
        if (Ue.partialMatches.length === 0) {
          let { matches: pn, route: An } = ou(
            h.activeRoutes
          );
          return {
            matches: pn,
            loaderData: {},
            errors: {
              [An.id]: Ue.error
            }
          };
        }
        let bt = Vi(Ue.partialMatches).route.id;
        return {
          matches: Ue.partialMatches,
          loaderData: {},
          errors: {
            [bt]: Ue.error
          }
        };
      } else if (Ue.matches)
        J = Ue.matches;
      else {
        let { error: bt, notFoundMatches: pn, route: An } = un(
          Q.pathname
        );
        return {
          matches: pn,
          loaderData: {},
          errors: {
            [An.id]: bt
          }
        };
      }
    }
    let We = h.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = fy(
      B,
      pe,
      u,
      c,
      t.history,
      D,
      J,
      Rt,
      Q,
      De ? [] : o,
      De === !0,
      L,
      Z,
      he,
      te,
      F,
      We,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      je,
      Ge
    );
    if (A = ++ne, !t.dataStrategy && !jt.some((Ue) => Ue.shouldLoad) && !jt.some(
      (Ue) => Ue.route.middleware && Ue.route.middleware.length > 0
    ) && at.length === 0) {
      let Ue = new Map(D.fetchers), bt = si(Ue);
      return Re(
        Q,
        {
          matches: J,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: je && kn(je[1]) ? { [je[0]]: je[1].error } : null,
          ...Sy(je),
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
      at.length > 0 && (Ue.fetchers = wt(at)), xe(Ue, { flushSync: ke });
    }
    at.forEach((Ue) => {
      Ot(Ue.key), Ue.controller && G.set(Ue.key, Ue.controller);
    });
    let wa = () => at.forEach((Ue) => Ot(Ue.key));
    K && K.signal.addEventListener(
      "abort",
      wa
    );
    let { loaderResults: Dn, fetcherResults: cn } = await Xt(
      jt,
      at,
      B,
      Q,
      pe
    );
    if (B.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      wa
    ), at.forEach((Ue) => G.delete(Ue.key));
    let nn = su(Dn);
    if (nn)
      return await gt(B, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (nn = su(cn), nn)
      return F.add(nn.key), await gt(B, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let bn = new Map(D.fetchers), { loaderData: ui, errors: xn } = by(
      D,
      J,
      Dn,
      je,
      at,
      cn,
      bn
    );
    De && D.errors && (xn = { ...D.errors, ...xn });
    let ci = si(bn), oa = Sa(
      A,
      bn
    ), sa = ci || oa || at.length > 0;
    return {
      matches: J,
      loaderData: ui,
      errors: xn,
      ...sa ? { workingFetchers: bn } : {}
    };
  }
  function $e(B) {
    if (B && !kn(B[1]))
      return {
        [B[0]]: B[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function wt(B) {
    let Q = new Map(D.fetchers);
    return B.forEach((J) => {
      let de = Q.get(J.key), pe = vo(
        void 0,
        de ? de.data : void 0
      );
      Q.set(J.key, pe);
    }), Q;
  }
  async function Je(B, Q, J, de) {
    Ot(B);
    let pe = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = Pd(
      D.location,
      D.matches,
      p,
      J,
      Q,
      de?.relative
    ), Se = da(
      Ee,
      ve,
      p,
      !1,
      h.branches
    ), be = mn(Se, Ee, ve);
    if (be.active && be.matches && (Se = be.matches), !Se) {
      ot(
        B,
        Q,
        ea(404, { pathname: ve }),
        { flushSync: pe }
      );
      return;
    }
    let { path: Me, submission: De, error: ke } = cy(
      !0,
      ve,
      de
    );
    if (ke) {
      ot(B, Q, ke, { flushSync: pe });
      return;
    }
    let je = t.getContext ? await t.getContext() : new ay(), Ge = (de && de.preventScrollReset) === !0;
    if (De && dn(De.formMethod)) {
      await Qe(
        B,
        Q,
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
    te.set(B, { routeId: Q, path: Me }), await Fe(
      B,
      Q,
      Me,
      Se,
      je,
      be.active,
      pe,
      Ge,
      De
    );
  }
  async function Qe(B, Q, J, de, pe, Ee, ve, Se, be, Me) {
    Lt(), te.delete(B);
    let De = D.fetchers.get(B);
    mt(B, w_(be, De), {
      flushSync: ve
    });
    let ke = new AbortController(), je = ol(
      t.history,
      J,
      ke.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        de,
        new URL(je.url).pathname,
        je.signal,
        B
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(B, Q, dt.error, { flushSync: ve });
        return;
      } else if (dt.matches)
        de = dt.matches;
      else {
        ot(
          B,
          Q,
          ea(404, { pathname: J }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ge = Tu(de, J);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = ea(405, {
        method: be.formMethod,
        pathname: J,
        routeId: Q
      });
      ot(B, Q, dt, { flushSync: ve });
      return;
    }
    G.set(B, ke);
    let rt = ne, Rt = fl(
      u,
      c,
      je,
      J,
      de,
      Ge,
      o,
      pe
    ), st = await yt(
      je,
      J,
      Rt,
      pe,
      B
    ), We = st[Ge.route.id];
    if (!We) {
      for (let dt of Rt)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (je.signal.aborted) {
      G.get(B) === ke && G.delete(B);
      return;
    }
    if (he.has(B)) {
      if (mr(We) || kn(We)) {
        mt(B, Ma(void 0));
        return;
      }
    } else {
      if (mr(We))
        if (G.delete(B), A > rt) {
          mt(B, Ma(void 0));
          return;
        } else
          return F.add(B), mt(B, vo(be)), gt(je, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: Se
          });
      if (kn(We)) {
        ot(B, Q, We.error);
        return;
      }
    }
    let jt = D.navigation.location || D.location, at = ol(
      t.history,
      jt,
      ke.signal
    ), wa = h.activeRoutes, Dn = D.navigation.state !== "idle" ? da(
      wa,
      D.navigation.location,
      p,
      !1,
      h.branches
    ) : D.matches;
    Ze(Dn, "Didn't find any matches after fetcher action");
    let cn = ++ne;
    k.set(B, cn);
    let { dsMatches: nn, revalidatingFetchers: bn } = fy(
      at,
      pe,
      u,
      c,
      t.history,
      D,
      Dn,
      be,
      jt,
      o,
      !1,
      L,
      Z,
      he,
      te,
      F,
      wa,
      p,
      t.patchRoutesOnNavigation != null,
      h.branches,
      [Ge.route.id, We],
      Me
    ), ui = vo(be, We.data), xn = new Map(D.fetchers);
    xn.set(B, ui), bn.filter((dt) => dt.key !== B).forEach((dt) => {
      let Xn = dt.key, an = xn.get(Xn), Ii = vo(
        void 0,
        an ? an.data : void 0
      );
      xn.set(Xn, Ii), Ot(Xn), dt.controller && G.set(Xn, dt.controller);
    }), xe({ fetchers: xn });
    let ci = () => bn.forEach((dt) => Ot(dt.key));
    ke.signal.addEventListener(
      "abort",
      ci
    );
    let { loaderResults: oa, fetcherResults: sa } = await Xt(
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
      ci
    ), k.delete(B), G.delete(B), bn.forEach((dt) => G.delete(dt.key));
    let Ue = D.fetchers.has(B), bt = (dt) => {
      if (!Ue) return dt;
      let Xn = new Map(dt.fetchers);
      return Xn.set(B, Ma(We.data)), { ...dt, fetchers: Xn };
    }, pn = su(oa);
    if (pn)
      return D = bt(D), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: Se }
      );
    if (pn = su(sa), pn)
      return F.add(pn.key), D = bt(D), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: Se }
      );
    let An = new Map(D.fetchers);
    Ue && An.set(B, Ma(We.data));
    let { loaderData: fi, errors: Ha } = by(
      D,
      Dn,
      oa,
      void 0,
      bn,
      sa,
      An
    );
    Sa(cn, An), D.navigation.state === "loading" && cn > A ? (Ze(q, "Expected pending action"), K && K.abort(), Re(D.navigation.location, {
      matches: Dn,
      loaderData: fi,
      errors: Ha,
      fetchers: An
    })) : (xe({
      errors: Ha,
      loaderData: xy(
        D.loaderData,
        fi,
        Dn,
        Ha
      ),
      fetchers: An
    }), L = !1);
  }
  async function Fe(B, Q, J, de, pe, Ee, ve, Se, be) {
    let Me = D.fetchers.get(B);
    mt(
      B,
      vo(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let De = new AbortController(), ke = ol(
      t.history,
      J,
      De.signal
    );
    if (Ee) {
      let We = await pt(
        de,
        new URL(ke.url).pathname,
        ke.signal,
        B
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(B, Q, We.error, { flushSync: ve });
        return;
      } else if (We.matches)
        de = We.matches;
      else {
        ot(
          B,
          Q,
          ea(404, { pathname: J }),
          { flushSync: ve }
        );
        return;
      }
    }
    let je = Tu(de, J);
    G.set(B, De);
    let Ge = ne, rt = fl(
      u,
      c,
      ke,
      J,
      de,
      je,
      o,
      pe
    ), Rt = await yt(
      ke,
      J,
      rt,
      pe,
      B
    ), st = Rt[je.route.id];
    if (!st) {
      for (let We of de)
        if (Rt[We.route.id]) {
          st = Rt[We.route.id];
          break;
        }
    }
    if (G.get(B) === De && G.delete(B), !ke.signal.aborted) {
      if (he.has(B)) {
        mt(B, Ma(void 0));
        return;
      }
      if (mr(st))
        if (A > Ge) {
          mt(B, Ma(void 0));
          return;
        } else {
          F.add(B), await gt(ke, st, !1, {
            preventScrollReset: Se
          });
          return;
        }
      if (kn(st)) {
        ot(B, Q, st.error);
        return;
      }
      mt(B, Ma(st.data));
    }
  }
  async function gt(B, Q, J, {
    submission: de,
    fetcherSubmission: pe,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    J || (le?.resolve(), le = null), Q.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let Se = Q.response.headers.get("Location");
    Ze(Se, "Expected a Location header on the redirect Response"), Se = yy(
      Se,
      new URL(B.url),
      p,
      t.history
    );
    let be = Kd(D.location, Se, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Q.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (Mh(Se)) {
        const Rt = yE(a, Se, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Rt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(Rt.pathname, p) == null;
      }
      if (rt) {
        ve ? a.location.replace(Se) : a.location.assign(Se);
        return;
      }
    }
    K = null;
    let Me = ve === !0 || Q.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: ke, formEncType: je } = D.navigation;
    !de && !pe && De && ke && je && (de = Ey(D.navigation));
    let Ge = de || pe;
    if (KE.has(Q.response.status) && Ge && dn(Ge.formMethod))
      await Te(Me, be, {
        submission: {
          ...Ge,
          formAction: Se
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || I,
        enableViewTransition: J ? W : void 0
      });
    else {
      let rt = Cd(
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
        preventScrollReset: Ee || I,
        enableViewTransition: J ? W : void 0
      });
    }
  }
  async function yt(B, Q, J, de, pe) {
    let Ee, ve = {};
    try {
      Ee = await o_(
        g,
        B,
        Q,
        J,
        pe,
        de,
        !1
      );
    } catch (Se) {
      return J.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: Se
        };
      }), ve;
    }
    if (B.signal.aborted)
      return ve;
    if (!dn(B.method))
      for (let Se of J) {
        if (Ee[Se.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(Se.route.id) && !D.loaderData.hasOwnProperty(Se.route.id) && (!D.errors || !D.errors.hasOwnProperty(Se.route.id)) && Se.shouldCallHandler() && (Ee[Se.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Se.route.id}`
          )
        });
      }
    for (let [Se, be] of Object.entries(Ee))
      if (y_(be)) {
        let Me = be.result;
        ve[Se] = {
          type: "redirect",
          response: f_(
            Me,
            B,
            Se,
            J,
            p
          )
        };
      } else
        ve[Se] = await c_(be);
    return ve;
  }
  async function Xt(B, Q, J, de, pe) {
    let Ee = yt(
      J,
      de,
      B,
      pe,
      null
    ), ve = Promise.all(
      Q.map(async (Me) => {
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
              error: ea(404, {
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
    L = !0, te.forEach((B, Q) => {
      G.has(Q) && Z.add(Q), Ot(Q);
    });
  }
  function mt(B, Q, J = {}) {
    let de = new Map(D.fetchers);
    de.set(B, Q), xe(
      { fetchers: de },
      { flushSync: (J && J.flushSync) === !0 }
    );
  }
  function ot(B, Q, J, de = {}) {
    let pe = Vi(D.matches, Q), Ee = new Map(D.fetchers);
    tn(Ee, B), xe(
      {
        errors: {
          [pe.route.id]: J
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function qn(B) {
    return se.set(B, (se.get(B) || 0) + 1), he.has(B) && he.delete(B), D.fetchers.get(B) || PE;
  }
  function yn(B, Q) {
    Ot(B, Q?.reason), mt(B, Ma(null));
  }
  function tn(B, Q) {
    let J = D.fetchers.get(Q);
    G.has(Q) && !(J && J.state === "loading" && k.has(Q)) && Ot(Q), te.delete(Q), k.delete(Q), F.delete(Q), he.delete(Q), Z.delete(Q), B.delete(Q);
  }
  function Kt(B) {
    let Q = (se.get(B) || 0) - 1;
    Q <= 0 ? (se.delete(B), he.add(B)) : se.set(B, Q), xe({ fetchers: new Map(D.fetchers) });
  }
  function Ot(B, Q) {
    let J = G.get(B);
    J && (J.abort(Q), G.delete(B));
  }
  function kt(B, Q) {
    for (let J of B) {
      let de = Q.get(J);
      Ze(de, `Expected fetcher: ${J}`);
      let pe = Ma(de.data);
      Q.set(J, pe);
    }
  }
  function si(B) {
    let Q = [], J = !1;
    for (let de of F) {
      let pe = B.get(de);
      Ze(pe, `Expected fetcher: ${de}`), pe.state === "loading" && (F.delete(de), Q.push(de), J = !0);
    }
    return kt(Q, B), J;
  }
  function Sa(B, Q) {
    let J = [];
    for (let [de, pe] of k)
      if (pe < B) {
        let Ee = Q.get(de);
        Ze(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Ot(de), k.delete(de), J.push(de));
      }
    return kt(J, Q), J.length > 0;
  }
  function vn(B, Q) {
    let J = D.blockers.get(B) || yo;
    return me.get(B) !== Q && me.set(B, Q), J;
  }
  function ra(B) {
    D.blockers.delete(B), me.delete(B);
  }
  function Mn(B, Q) {
    let J = D.blockers.get(B) || yo;
    Ze(
      J.state === "unblocked" && Q.state === "blocked" || J.state === "blocked" && Q.state === "blocked" || J.state === "blocked" && Q.state === "proceeding" || J.state === "blocked" && Q.state === "unblocked" || J.state === "proceeding" && Q.state === "unblocked",
      `Invalid blocker state transition: ${J.state} -> ${Q.state}`
    );
    let de = new Map(D.blockers);
    de.set(B, Q), xe({ blockers: de });
  }
  function $n({
    currentLocation: B,
    nextLocation: Q,
    historyAction: J
  }) {
    if (me.size === 0)
      return;
    me.size > 1 && $t(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [pe, Ee] = de[de.length - 1], ve = D.blockers.get(pe);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: B, nextLocation: Q, historyAction: J }))
      return pe;
  }
  function un(B) {
    let Q = ea(404, { pathname: B }), J = h.activeRoutes, { matches: de, route: pe } = ou(J);
    return { notFoundMatches: de, route: pe, error: Q };
  }
  function He(B, Q, J) {
    if (S = B, N = Q, T = J || null, !R && D.navigation === Rd) {
      R = !0;
      let de = Vt(D.location, D.matches);
      de != null && xe({ restoreScrollPosition: de });
    }
    return () => {
      S = null, N = null, T = null;
    };
  }
  function vt(B, Q) {
    return T && T(
      B,
      Q.map((de) => EE(de, D.loaderData))
    ) || B.key;
  }
  function Ht(B, Q) {
    if (S && N) {
      let J = vt(B, Q);
      S[J] = N();
    }
  }
  function Vt(B, Q) {
    if (S) {
      let J = vt(B, Q), de = S[J];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function mn(B, Q, J) {
    if (t.patchRoutesOnNavigation) {
      let de = h.branches;
      if (B) {
        if (Object.keys(B[0].params).length > 0)
          return { active: !0, matches: da(
            Q,
            J,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: da(
          Q,
          J,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(B, Q, J, de) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: B };
    let pe = B;
    for (; ; ) {
      let Ee = c;
      try {
        await t.patchRoutesOnNavigation({
          signal: J,
          path: Q,
          matches: pe,
          fetcherKey: de,
          patch: (Me, De) => {
            J.aborted || dy(
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
      if (J.aborted)
        return { type: "aborted" };
      let ve = h.branches, Se = da(
        h.activeRoutes,
        Q,
        p,
        !1,
        ve
      ), be = null;
      if (Se) {
        if (Object.keys(Se[0].params).length === 0)
          return { type: "success", matches: Se };
        if (be = da(
          h.activeRoutes,
          Q,
          p,
          !0,
          ve
        ), !(be && pe.length < be.length && Pt(
          pe,
          be.slice(0, pe.length)
        )))
          return { type: "success", matches: Se };
      }
      if (be || (be = da(
        h.activeRoutes,
        Q,
        p,
        !0,
        ve
      )), !be || Pt(pe, be))
        return { type: "success", matches: null };
      pe = be;
    }
  }
  function Pt(B, Q) {
    return B.length === Q.length && B.every((J, de) => J.route.id === Q[de].route.id);
  }
  function la(B) {
    c = {}, h.setHmrRoutes(
      Mo(
        B,
        u,
        void 0,
        c
      )
    );
  }
  function Wt(B, Q, J = !1) {
    dy(
      B,
      Q,
      h,
      c,
      u,
      J
    ), h.hasHMRRoutes || xe({});
  }
  return V = {
    get basename() {
      return p;
    },
    get future() {
      return y;
    },
    get state() {
      return D;
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
    subscribe: we,
    enableScrollRestoration: He,
    navigate: qe,
    fetch: Je,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (B) => t.history.createHref(B),
    encodeLocation: (B) => t.history.encodeLocation(B),
    getFetcher: qn,
    resetFetcher: yn,
    deleteFetcher: Kt,
    dispose: Ce,
    getBlocker: vn,
    deleteBlocker: ra,
    patchRoutes: Wt,
    _internalFetchControllers: G,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: la,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(B) {
      xe(B);
    }
  }, t.instrumentations && (V = qE(
    V,
    t.instrumentations.map((B) => B.router).filter(Boolean)
  )), V;
}
function t_(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Pd(t, a, r, o, s, u) {
  let c, h;
  if (s) {
    c = [];
    for (let g of a)
      if (c.push(g), g.route.id === s) {
        h = g;
        break;
      }
  } else
    c = a, h = a[a.length - 1];
  let p = Fu(
    o || ".",
    Dh(c),
    aa(t.pathname, r) || t.pathname,
    u === "path"
  );
  if (o == null && (p.search = t.search, p.hash = t.hash), (o == null || o === "" || o === ".") && h) {
    let g = jh(p.search);
    if (h.route.index && !g)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && g) {
      let y = new URLSearchParams(p.search), m = y.getAll("index");
      y.delete("index"), m.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (p.pathname = HE({ basename: r, pathname: p.pathname })), ja(p);
}
function cy(t, a, r) {
  if (!r || !t_(r))
    return { path: a };
  if (r.formMethod && !x_(r.formMethod))
    return {
      path: a,
      error: ea(405, { method: r.formMethod })
    };
  let o = () => ({
    path: a,
    error: ea(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = Bb(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!dn(u))
        return o();
      let m = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (v, [x, S]) => `${v}${x}=${S}
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
          text: m
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!dn(u))
        return o();
      try {
        let m = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: r.formEncType,
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
  Ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (r.formData)
    h = Wd(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    h = Wd(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, p = vy(h);
  else if (r.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), p = vy(h);
    } catch {
      return o();
    }
  let g = {
    formMethod: u,
    formAction: c,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (dn(g.formMethod))
    return { path: a, submission: g };
  let y = va(a);
  return t && y.search && jh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: ja(y), submission: g };
}
function fy(t, a, r, o, s, u, c, h, p, g, y, m, v, x, S, T, N, R, z, E, j, U) {
  let H = j ? kn(j[1]) ? j[1].error : j[1].data : void 0, V = s.createURL(u.location), D = s.createURL(p), q;
  if (y && u.errors) {
    let _ = Object.keys(u.errors)[0];
    q = c.findIndex((L) => L.route.id === _);
  } else if (j && kn(j[1])) {
    let _ = j[0];
    q = c.findIndex((L) => L.route.id === _) - 1;
  }
  let le = j ? j[1].statusCode : void 0, I = le && le >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: D,
    nextParams: c[0].params,
    ...h,
    actionResult: H,
    actionStatus: le
  }, W = qo(c), O = c.map((_, L) => {
    let { route: Z } = _, G = null;
    if (q != null && L > q)
      G = !1;
    else if (Z.lazy)
      G = !0;
    else if (!zh(Z))
      G = !1;
    else if (y) {
      let { shouldLoad: F } = Db(
        Z,
        u.loaderData,
        u.errors
      );
      G = F;
    } else n_(u.loaderData, u.matches[L], _) && (G = !0);
    if (G !== null)
      return Jd(
        r,
        o,
        t,
        p,
        W,
        _,
        g,
        a,
        G
      );
    let ne = !1;
    typeof U == "boolean" ? ne = U : I ? ne = !1 : (m || V.pathname + V.search === D.pathname + D.search || V.search !== D.search || a_(u.matches[L], _)) && (ne = !0);
    let A = {
      ...K,
      defaultShouldRevalidate: ne
    }, k = Ro(_, A);
    return Jd(
      r,
      o,
      t,
      p,
      W,
      _,
      g,
      a,
      k,
      A,
      U
    );
  }), $ = [];
  return S.forEach((_, L) => {
    if (y || !c.some((se) => se.route.id === _.routeId) || x.has(L))
      return;
    let Z = u.fetchers.get(L), G = Z && Z.state !== "idle" && Z.data === void 0, ne = da(
      N,
      _.path,
      R ?? "/",
      !1,
      E
    );
    if (!ne) {
      if (z && G)
        return;
      $.push({
        key: L,
        routeId: _.routeId,
        path: _.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(L))
      return;
    let A = Tu(ne, _.path), k = new AbortController(), F = ol(
      s,
      _.path,
      k.signal
    ), te = null;
    if (v.has(L))
      v.delete(L), te = fl(
        r,
        o,
        F,
        _.path,
        ne,
        A,
        g,
        a
      );
    else if (G)
      m && (te = fl(
        r,
        o,
        F,
        _.path,
        ne,
        A,
        g,
        a
      ));
    else {
      let se;
      typeof U == "boolean" ? se = U : I ? se = !1 : se = m;
      let he = {
        ...K,
        defaultShouldRevalidate: se
      };
      Ro(A, he) && (te = fl(
        r,
        o,
        F,
        _.path,
        ne,
        A,
        g,
        a,
        he
      ));
    }
    te && $.push({
      key: L,
      routeId: _.routeId,
      path: _.path,
      matches: te,
      match: A,
      request: F,
      controller: k
    });
  }), { dsMatches: O, revalidatingFetchers: $ };
}
function zh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Db(t, a, r) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!zh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let o = a != null && t.id in a, s = r != null && r[t.id] !== void 0;
  if (!o && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let u = !o && !s;
  return { shouldLoad: u, renderFallback: u };
}
function n_(t, a, r) {
  let o = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !t.hasOwnProperty(r.route.id);
  return o || s;
}
function a_(t, a) {
  let r = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function Ro(t, a) {
  if (t.route.shouldRevalidate) {
    let r = t.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function dy(t, a, r, o, s, u) {
  let c;
  if (t) {
    let g = o[t];
    Ze(
      g,
      `No route found to patch children into: routeId = ${t}`
    ), g.children || (g.children = []), c = g.children;
  } else
    c = r.activeRoutes;
  let h = [], p = [];
  if (a.forEach((g) => {
    let y = c.find(
      (m) => Ab(g, m)
    );
    y ? p.push({ existingRoute: y, newRoute: g }) : h.push(g);
  }), h.length > 0) {
    let g = Mo(
      h,
      s,
      [t || "_", "patch", String(c?.length || "0")],
      o
    );
    c.push(...g);
  }
  if (u && p.length > 0)
    for (let g = 0; g < p.length; g++) {
      let { existingRoute: y, newRoute: m } = p[g], v = y, [x] = Mo(
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
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function Ab(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (r, o) => a.children?.some((s) => Ab(r, s))
  ) ?? !1 : !1;
}
var hy = /* @__PURE__ */ new WeakMap(), zb = ({
  key: t,
  route: a,
  manifest: r,
  mapRouteProperties: o
}) => {
  let s = r[a.id];
  if (Ze(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[t];
  if (!u)
    return;
  let c = hy.get(s);
  c || (c = {}, hy.set(s, c));
  let h = c[t];
  if (h)
    return h;
  let p = (async () => {
    let g = bE(t), m = s[t] !== void 0 && t !== "hasErrorBoundary";
    if (g)
      $t(
        !g,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), c[t] = Promise.resolve();
    else if (m)
      $t(
        !1,
        `Route "${s.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let v = await u();
      v != null && (Object.assign(s, { [t]: v }), Object.assign(s, o(s)));
    }
    typeof s.lazy == "object" && (s.lazy[t] = void 0, Object.values(s.lazy).every((v) => v === void 0) && (s.lazy = void 0));
  })();
  return c[t] = p, p;
}, my = /* @__PURE__ */ new WeakMap();
function i_(t, a, r, o, s) {
  let u = r[t.id];
  if (Ze(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = my.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let m = (async () => {
      Ze(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let v = await t.lazy(), x = {};
      for (let S in v) {
        let T = v[S];
        if (T === void 0)
          continue;
        let N = SE(S), z = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        N ? $t(
          !N,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? $t(
          !z,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = T;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...o(u),
        lazy: void 0
      });
    })();
    return my.set(u, m), m.catch(() => {
    }), {
      lazyRoutePromise: m,
      lazyHandlerPromise: m
    };
  }
  let c = Object.keys(t.lazy), h = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let m = zb({
      key: y,
      route: t,
      manifest: r,
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
async function py(t) {
  let a = t.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function r_(t) {
  return t.matches.some((a) => a.route.middleware) ? Ob(t, () => py(t)) : py(t);
}
function Ob(t, a) {
  return l_(
    t,
    a,
    (o) => {
      if (b_(o))
        throw o;
      return o;
    },
    p_,
    r
  );
  function r(o, s, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [s]: { type: "error", result: o }
        })
      );
    {
      let { matches: c } = t, h = Math.min(
        // Throwing route
        Math.max(
          c.findIndex((g) => g.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          c.findIndex((g) => g.shouldCallHandler()),
          0
        )
      ), p = Vi(
        c,
        c[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: o }
      });
    }
  }
}
async function l_(t, a, r, o, s) {
  let { matches: u, ...c } = t, h = u.flatMap(
    (g) => g.route.middleware ? g.route.middleware.map((y) => [g.route.id, y]) : []
  );
  return await jb(
    c,
    h,
    a,
    r,
    o,
    s
  );
}
async function jb(t, a, r, o, s, u, c = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[c];
  if (!p)
    return await r();
  let [g, y] = p, m, v = async () => {
    if (m)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return m = { value: await jb(
        t,
        a,
        r,
        o,
        s,
        u,
        c + 1
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
function Lb(t, a, r, o, s) {
  let u = zb({
    key: "middleware",
    route: o.route,
    manifest: a,
    mapRouteProperties: t
  }), c = i_(
    o.route,
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
function Jd(t, a, r, o, s, u, c, h, p, g = null, y) {
  let m = !1, v = Lb(
    t,
    a,
    r,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: v,
    shouldLoad: p,
    shouldRevalidateArgs: g,
    shouldCallHandler(x) {
      return m = !0, g ? typeof y == "boolean" ? Ro(u, {
        ...g,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? Ro(u, {
        ...g,
        defaultShouldRevalidate: x
      }) : Ro(u, g) : p;
    },
    resolve(x) {
      let { lazy: S, loader: T, middleware: N } = u.route, R = m || p || x && !dn(r.method) && (S || T), z = N && N.length > 0 && !T && !S;
      return R && (dn(r.method) || !z) ? s_({
        request: r,
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
function fl(t, a, r, o, s, u, c, h, p = null) {
  return s.map((g) => g.route.id !== u.route.id ? {
    ...g,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Lb(
      t,
      a,
      r,
      g,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Jd(
    t,
    a,
    r,
    o,
    qo(s),
    g,
    c,
    h,
    !0,
    p
  ));
}
async function o_(t, a, r, o, s, u, c) {
  o.some((y) => y._lazyPromises?.middleware) && await Promise.all(o.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: Hb(a, r),
    pattern: qo(o),
    params: o[0].params,
    context: u,
    matches: o
  }, g = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let m = h;
      return Ob(m, () => y({
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
async function s_({
  request: t,
  path: a,
  pattern: r,
  match: o,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: h
}) {
  let p, g, y = dn(t.method), m = y ? "action" : "loader", v = (x) => {
    let S, T = new Promise((z, E) => S = E);
    g = () => S(), t.signal.addEventListener("abort", g);
    let N = (z) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${m}" [routeId: ${o.route.id}]`
      )
    ) : x(
      {
        request: t,
        url: Hb(t, a),
        pattern: r,
        params: o.params,
        context: h
      },
      ...z !== void 0 ? [z] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => N(E)) : N()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([R, T]);
  };
  try {
    let x = y ? o.route.action : o.route.loader;
    if (s || u)
      if (x) {
        let S, [T] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(x).catch((N) => {
            S = N;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (S !== void 0)
          throw S;
        p = T;
      } else {
        await s;
        let S = y ? o.route.action : o.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (m === "action") {
          let T = new URL(t.url), N = T.pathname + T.search;
          throw ea(405, {
            method: t.method,
            pathname: N,
            routeId: o.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await v(x);
    else {
      let S = new URL(t.url), T = S.pathname + S.search;
      throw ea(404, {
        pathname: T
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    g && t.signal.removeEventListener("abort", g);
  }
  return p;
}
async function u_(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function c_(t) {
  let { result: a, type: r } = t;
  if (Oh(a)) {
    let o;
    try {
      o = await u_(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new Ku(a.status, a.statusText, o),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: o,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? wy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: m_(a),
    statusCode: Do(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Do(a) ? a.status : void 0
  } : wy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function f_(t, a, r, o, s) {
  let u = t.headers.get("Location");
  if (Ze(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Mh(u)) {
    let c = o.slice(
      0,
      o.findIndex((h) => h.route.id === r) + 1
    );
    u = Pd(
      new URL(a.url),
      c,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var gy = [
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
function yy(t, a, r, o) {
  if (Mh(t)) {
    let s = t, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (gy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = aa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return Ah(u.pathname) + u.search + u.hash;
  }
  try {
    let s = o.createURL(t);
    if (gy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function ol(t, a, r, o) {
  let s = t.createURL(Bb(a)).toString(), u = { signal: r };
  if (o && dn(o.formMethod)) {
    let { formMethod: c, formEncType: h } = o;
    u.method = c.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(o.json)) : h === "text/plain" ? u.body = o.text : h === "application/x-www-form-urlencoded" && o.formData ? u.body = Wd(o.formData) : u.body = o.formData;
  }
  return new Request(s, u);
}
function Hb(t, a) {
  let r = new URL(t.url), o = typeof a == "string" ? va(a) : a;
  if (r.pathname = o.pathname || "/", o.search) {
    let s = new URLSearchParams(o.search), u = s.getAll("index");
    s.delete("index");
    for (let c of u.filter(Boolean))
      s.append("index", c);
    r.search = s.size ? `?${s.toString()}` : "";
  } else
    r.search = "";
  return r.hash = o.hash || "", r;
}
function Wd(t) {
  let a = new URLSearchParams();
  for (let [r, o] of t.entries())
    a.append(r, typeof o == "string" ? o : o.name);
  return a;
}
function vy(t) {
  let a = new FormData();
  for (let [r, o] of t.entries())
    a.append(r, o);
  return a;
}
function d_(t, a, r, o = !1, s = !1) {
  let u = {}, c = null, h, p = !1, g = {}, y = r && kn(r[1]) ? r[1].error : void 0;
  return t.forEach((m) => {
    if (!(m.route.id in a))
      return;
    let v = m.route.id, x = a[v];
    if (Ze(
      !mr(x),
      "Cannot handle redirect results in processLoaderData"
    ), kn(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), c = c || {}, s)
        c[v] = S;
      else {
        let T = Vi(t, v);
        c[T.route.id] == null && (c[T.route.id] = S);
      }
      o || (u[v] = Mb), p || (p = !0, h = Do(x.error) ? x.error.status : 500), x.headers && (g[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (h = x.statusCode), x.headers && (g[v] = x.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: h || 200,
    loaderHeaders: g
  };
}
function by(t, a, r, o, s, u, c) {
  let { loaderData: h, errors: p } = d_(
    a,
    r,
    o
  );
  return s.filter((g) => !g.matches || g.matches.some((y) => y.shouldLoad)).forEach((g) => {
    let { key: y, match: m, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (Ze(x, "Did not find corresponding fetcher result"), kn(x)) {
      let S = Vi(t.matches, m?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: x.error
      }), c.delete(y);
    } else if (mr(x))
      Ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ma(x.data);
      c.set(y, S);
    }
  }), { loaderData: h, errors: p };
}
function xy(t, a, r, o) {
  let s = Object.entries(a).filter(([, u]) => u !== Mb).reduce((u, [c, h]) => (u[c] = h, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && t.hasOwnProperty(c) && u.route.loader && (s[c] = t[c]), o && o.hasOwnProperty(c))
      break;
  }
  return s;
}
function Sy(t) {
  return t ? kn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function Vi(t, a) {
  return (a ? t.slice(0, t.findIndex((o) => o.route.id === a) + 1) : [...t]).reverse().find((o) => o.route.hasErrorBoundary === !0) || t[0];
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
function ea(t, {
  pathname: a,
  routeId: r,
  method: o,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (c = "Bad Request", o && a && r ? h = `You made a ${o} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (c = "Forbidden", h = `Route "${r}" does not match URL "${a}"`) : t === 404 ? (c = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (c = "Method Not Allowed", o && a && r ? h = `You made a ${o.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : o && (h = `Invalid request method "${o.toUpperCase()}"`)), new Ku(
    t || 500,
    c,
    new Error(h),
    !0
  );
}
function su(t) {
  let a = Object.entries(t);
  for (let r = a.length - 1; r >= 0; r--) {
    let [o, s] = a[r];
    if (mr(s))
      return { key: o, result: s };
  }
}
function Bb(t) {
  let a = typeof t == "string" ? va(t) : t;
  return ja({ ...a, hash: "" });
}
function h_(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function m_(t) {
  return new Ku(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function p_(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, r]) => typeof a == "string" && g_(r)
  );
}
function g_(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function y_(t) {
  return Oh(t.result) && Cb.has(t.result.status);
}
function kn(t) {
  return t.type === "error";
}
function mr(t) {
  return (t && t.type) === "redirect";
}
function wy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Oh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function v_(t) {
  return Cb.has(t);
}
function b_(t) {
  return Oh(t) && v_(t.status) && t.headers.has("Location");
}
function x_(t) {
  return FE.has(t.toUpperCase());
}
function dn(t) {
  return ZE.has(t.toUpperCase());
}
function jh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Tu(t, a) {
  let r = typeof a == "string" ? va(a).search : a.search;
  if (t[t.length - 1].route.index && jh(r || ""))
    return t[t.length - 1];
  let o = wb(t);
  return o[o.length - 1];
}
function Ey(t) {
  let { formMethod: a, formAction: r, formEncType: o, text: s, formData: u, json: c } = t;
  if (!(!a || !r || !o)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: o,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: o,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (c !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: o,
        formData: void 0,
        json: c,
        text: void 0
      };
  }
}
function Cd(t, a, r, o) {
  return o ? {
    state: "loading",
    location: t,
    matches: a,
    historyAction: r,
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
    historyAction: r,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function S_(t, a, r, o) {
  return {
    state: "submitting",
    location: t,
    matches: a,
    historyAction: r,
    formMethod: o.formMethod,
    formAction: o.formAction,
    formEncType: o.formEncType,
    formData: o.formData,
    json: o.json,
    text: o.text
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
function w_(t, a) {
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
function Ma(t) {
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
function E_(t, a) {
  try {
    let r = t.sessionStorage.getItem(
      Tb
    );
    if (r) {
      let o = JSON.parse(r);
      for (let [s, u] of Object.entries(o || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function __(t, a) {
  if (a.size > 0) {
    let r = {};
    for (let [o, s] of a)
      r[o] = [...s];
    try {
      t.sessionStorage.setItem(
        Tb,
        JSON.stringify(r)
      );
    } catch (o) {
      $t(
        !1,
        `Failed to save applied view transitions in sessionStorage (${o}).`
      );
    }
  }
}
function _y() {
  let t, a, r = new Promise((o, s) => {
    t = async (u) => {
      o(u);
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
var _r = M.createContext(null);
_r.displayName = "DataRouter";
var $o = M.createContext(null);
$o.displayName = "DataRouterState";
var Ub = M.createContext(!1);
function kb() {
  return M.useContext(Ub);
}
var Lh = M.createContext({
  isTransitioning: !1
});
Lh.displayName = "ViewTransition";
var Vb = M.createContext(
  /* @__PURE__ */ new Map()
);
Vb.displayName = "Fetchers";
var N_ = M.createContext(null);
N_.displayName = "Await";
var ia = M.createContext(
  null
);
ia.displayName = "Navigation";
var Pu = M.createContext(
  null
);
Pu.displayName = "Location";
var ba = M.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ba.displayName = "Route";
var Hh = M.createContext(null);
Hh.displayName = "RouteError";
var Yb = "REACT_ROUTER_ERROR", R_ = "REDIRECT", C_ = "ROUTE_ERROR_RESPONSE";
function T_(t) {
  if (t.startsWith(`${Yb}:${R_}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function M_(t) {
  if (t.startsWith(
    `${Yb}:${C_}:{`
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
function D_(t, { relative: a } = {}) {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: o } = M.useContext(ia), { hash: s, pathname: u, search: c } = Go(t, { relative: a }), h = u;
  return r !== "/" && (h = u === "/" ? r : na([r, u])), o.createHref({ pathname: h, search: c, hash: s });
}
function Xo() {
  return M.useContext(Pu) != null;
}
function li() {
  return Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), M.useContext(Pu).location;
}
var qb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function $b(t) {
  M.useContext(ia).static || M.useLayoutEffect(t);
}
function A_() {
  let { isDataRoute: t } = M.useContext(ba);
  return t ? Z_() : z_();
}
function z_() {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = M.useContext(_r), { basename: a, navigator: r } = M.useContext(ia), { matches: o } = M.useContext(ba), { pathname: s } = li(), u = JSON.stringify(Dh(o)), c = M.useRef(!1);
  return $b(() => {
    c.current = !0;
  }), M.useCallback(
    (p, g = {}) => {
      if ($t(c.current, qb), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let y = Fu(
        p,
        JSON.parse(u),
        s,
        g.relative === "path"
      );
      t == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : na([a, y.pathname])), (g.replace ? r.replace : r.push)(
        y,
        g.state,
        g
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
var O_ = M.createContext(null);
function j_(t) {
  let a = M.useContext(ba).outlet;
  return M.useMemo(
    () => a && /* @__PURE__ */ M.createElement(O_.Provider, { value: t }, a),
    [a, t]
  );
}
function L_() {
  let { matches: t } = M.useContext(ba);
  return t[t.length - 1]?.params ?? {};
}
function Go(t, { relative: a } = {}) {
  let { matches: r } = M.useContext(ba), { pathname: o } = li(), s = JSON.stringify(Dh(r));
  return M.useMemo(
    () => Fu(
      t,
      JSON.parse(s),
      o,
      a === "path"
    ),
    [t, s, o, a]
  );
}
function H_(t, a, r) {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = M.useContext(ia), { matches: s } = M.useContext(ba), u = s[s.length - 1], c = u ? u.params : {}, h = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", g = u && u.route;
  {
    let N = g && g.path || "";
    Ib(
      h,
      !g || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = li(), m;
  m = y;
  let v = m.pathname || "/", x = v;
  if (p !== "/") {
    let N = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let S = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (N) => Object.assign(N, {
        route: r.manifest[N.route.id] || N.route
      })
    )
  ) : vb(t, { pathname: x });
  return $t(
    g || S != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), $t(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Y_(
    S && S.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, c, N.params),
        pathname: na([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? p : na([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            N.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function B_() {
  let t = I_(), a = Do(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), r = t instanceof Error ? t.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, u = { padding: "2px 4px", backgroundColor: o }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), c = /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ M.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ M.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ M.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ M.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ M.createElement("pre", { style: s }, r) : null, c);
}
var U_ = /* @__PURE__ */ M.createElement(B_, null), Xb = class extends M.Component {
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
      const r = M_(t.digest);
      r && (t = r);
    }
    let a = t !== void 0 ? /* @__PURE__ */ M.createElement(ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ M.createElement(
      Hh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ M.createElement(k_, { error: t }, a) : a;
  }
};
Xb.contextType = Ub;
var Td = /* @__PURE__ */ new WeakMap();
function k_({
  children: t,
  error: a
}) {
  let { basename: r } = M.useContext(ia);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let o = T_(a.digest);
    if (o) {
      let s = Td.get(a);
      if (s) throw s;
      let u = _b(o.location, r);
      if (Eb && !Td.get(a))
        if (u.isExternal || o.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: o.replace
            })
          );
          throw Td.set(a, c), c;
        }
      return /* @__PURE__ */ M.createElement(
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
function V_({ routeContext: t, match: a, children: r }) {
  let o = M.useContext(_r);
  return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ M.createElement(ba.Provider, { value: t }, r);
}
function Y_(t, a = [], r) {
  let o = r?.state;
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
  if (r && o) {
    c = o.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let m = s[y];
      if ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (h = y), m.route.id) {
        let { loaderData: v, errors: x } = o, S = m.route.loader && !v.hasOwnProperty(m.route.id) && (!x || x[m.route.id] === void 0);
        if (m.route.lazy || S) {
          r.isStatic && (c = !0), h >= 0 ? s = s.slice(0, h + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, g = o && p ? (y, m) => {
    p(y, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      pattern: qo(o.matches),
      errorInfo: m
    });
  } : void 0;
  return s.reduceRight(
    (y, m, v) => {
      let x, S = !1, T = null, N = null;
      o && (x = u && m.route.id ? u[m.route.id] : void 0, T = m.route.errorElement || U_, c && (h < 0 && v === 0 ? (Ib(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, N = null) : h === v && (S = !0, N = m.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return x ? E = T : S ? E = N : m.route.Component ? E = /* @__PURE__ */ M.createElement(m.route.Component, null) : m.route.element ? E = m.route.element : E = y, /* @__PURE__ */ M.createElement(
          V_,
          {
            match: m,
            routeContext: {
              outlet: y,
              matches: R,
              isDataRoute: o != null
            },
            children: E
          }
        );
      };
      return o && (m.route.ErrorBoundary || m.route.errorElement || v === 0) ? /* @__PURE__ */ M.createElement(
        Xb,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: T,
          error: x,
          children: z(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: g
        }
      ) : z();
    },
    null
  );
}
function Bh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function q_(t) {
  let a = M.useContext(_r);
  return Ze(a, Bh(t)), a;
}
function Gb(t) {
  let a = M.useContext($o);
  return Ze(a, Bh(t)), a;
}
function $_(t) {
  let a = M.useContext(ba);
  return Ze(a, Bh(t)), a;
}
function Ju(t) {
  let a = $_(t), r = a.matches[a.matches.length - 1];
  return Ze(
    r.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function X_() {
  return Ju(
    "useRouteId"
    /* UseRouteId */
  );
}
function G_() {
  let t = Gb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Ju(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function I_() {
  let t = M.useContext(Hh), a = Gb(
    "useRouteError"
    /* UseRouteError */
  ), r = Ju(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[r];
}
function Z_() {
  let { router: t } = q_(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Ju(
    "useNavigate"
    /* UseNavigateStable */
  ), r = M.useRef(!1);
  return $b(() => {
    r.current = !0;
  }), M.useCallback(
    async (s, u = {}) => {
      $t(r.current, qb), r.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Ny = {};
function Ib(t, a, r) {
  !a && !Ny[t] && (Ny[t] = !0, $t(!1, r));
}
var Ry = {};
function Cy(t, a) {
  !t && !Ry[a] && (Ry[a] = !0, console.warn(a));
}
var Q_ = "useOptimistic", Ty = sE[Q_], F_ = () => {
};
function K_(t) {
  return Ty ? Ty(t) : [t, F_];
}
function P_(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && $t(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: M.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && $t(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: M.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && $t(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: M.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var J_ = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function W_(t, a) {
  return e_({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: pE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: J_,
    mapRouteProperties: P_,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var e2 = class {
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
function t2({
  router: t,
  flushSync: a,
  onError: r,
  useTransitions: o
}) {
  o = kb() || o;
  let [u, c] = M.useState(t.state), [h, p] = K_(u), [g, y] = M.useState(), [m, v] = M.useState({
    isTransitioning: !1
  }), [x, S] = M.useState(), [T, N] = M.useState(), [R, z] = M.useState(), E = M.useRef(/* @__PURE__ */ new Map()), j = M.useCallback(
    (D, { deletedFetchers: q, newErrors: le, flushSync: I, viewTransitionOpts: K }) => {
      le && r && Object.values(le).forEach(
        (O) => r(O, {
          location: D.location,
          params: D.matches[0]?.params ?? {},
          pattern: qo(D.matches)
        })
      ), D.fetchers.forEach((O, $) => {
        O.data !== void 0 && E.current.set($, O.data);
      }), q.forEach((O) => E.current.delete(O)), Cy(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let W = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Cy(
        K == null || W,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !W) {
        a && I ? a(() => c(D)) : o === !1 ? c(D) : M.startTransition(() => {
          o === !0 && p((O) => My(O, D)), c(D);
        });
        return;
      }
      if (a && I) {
        a(() => {
          T && (x?.resolve(), T.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let O = t.window.document.startViewTransition(() => {
          a(() => c(D));
        });
        O.finished.finally(() => {
          a(() => {
            S(void 0), N(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => N(O));
        return;
      }
      T ? (x?.resolve(), T.skipTransition(), z({
        state: D,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (y(D), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      t.window,
      a,
      T,
      x,
      o,
      p,
      r
    ]
  );
  M.useLayoutEffect(() => t.subscribe(j), [t, j]), M.useEffect(() => {
    m.isTransitioning && !m.flushSync && S(new e2());
  }, [m]), M.useEffect(() => {
    if (x && g && t.window) {
      let D = g, q = x.promise, le = t.window.document.startViewTransition(async () => {
        o === !1 ? c(D) : M.startTransition(() => {
          o === !0 && p((I) => My(I, D)), c(D);
        }), await q;
      });
      le.finished.finally(() => {
        S(void 0), N(void 0), y(void 0), v({ isTransitioning: !1 });
      }), N(le);
    }
  }, [
    g,
    x,
    t.window,
    o,
    p
  ]), M.useEffect(() => {
    x && g && h.location.key === g.location.key && x.resolve();
  }, [x, T, h.location, g]), M.useEffect(() => {
    !m.isTransitioning && R && (y(R.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), z(void 0));
  }, [m.isTransitioning, R]);
  let U = M.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (D) => t.navigate(D),
    push: (D, q, le) => t.navigate(D, {
      state: q,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (D, q, le) => t.navigate(D, {
      replace: !0,
      state: q,
      preventScrollReset: le?.preventScrollReset
    })
  }), [t]), H = t.basename || "/", V = M.useMemo(
    () => ({
      router: t,
      navigator: U,
      static: !1,
      basename: H,
      onError: r
    }),
    [t, U, H, r]
  );
  return /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement(_r.Provider, { value: V }, /* @__PURE__ */ M.createElement($o.Provider, { value: h }, /* @__PURE__ */ M.createElement(Vb.Provider, { value: E.current }, /* @__PURE__ */ M.createElement(Lh.Provider, { value: m }, /* @__PURE__ */ M.createElement(
    r2,
    {
      basename: H,
      location: h.location,
      navigationType: h.historyAction,
      navigator: U,
      useTransitions: o
    },
    /* @__PURE__ */ M.createElement(
      n2,
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
function My(t, a) {
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
var n2 = M.memo(a2);
function a2({
  routes: t,
  manifest: a,
  future: r,
  state: o,
  isStatic: s,
  onError: u
}) {
  return H_(t, void 0, {
    manifest: a,
    state: o,
    isStatic: s,
    onError: u
  });
}
function i2(t) {
  return j_(t.context);
}
function r2({
  basename: t = "/",
  children: a = null,
  location: r,
  navigationType: o = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Ze(
    !Xo(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), p = M.useMemo(
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
    pathname: g = "/",
    search: y = "",
    hash: m = "",
    state: v = null,
    key: x = "default",
    mask: S
  } = r, T = M.useMemo(() => {
    let N = aa(g, h);
    return N == null ? null : {
      location: {
        pathname: N,
        search: y,
        hash: m,
        state: v,
        key: x,
        mask: S
      },
      navigationType: o
    };
  }, [h, g, y, m, v, x, o, S]);
  return $t(
    T != null,
    `<Router basename="${h}"> is not able to match the URL "${g}${y}${m}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ M.createElement(ia.Provider, { value: p }, /* @__PURE__ */ M.createElement(Pu.Provider, { children: a, value: T }));
}
var Mu = "get", Du = "application/x-www-form-urlencoded";
function Wu(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function l2(t) {
  return Wu(t) && t.tagName.toLowerCase() === "button";
}
function o2(t) {
  return Wu(t) && t.tagName.toLowerCase() === "form";
}
function s2(t) {
  return Wu(t) && t.tagName.toLowerCase() === "input";
}
function u2(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function c2(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !u2(t);
}
var uu = null;
function f2() {
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
var d2 = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Md(t) {
  return t != null && !d2.has(t) ? ($t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Du}"`
  ), null) : t;
}
function h2(t, a) {
  let r, o, s, u, c;
  if (o2(t)) {
    let h = t.getAttribute("action");
    o = h ? aa(h, a) : null, r = t.getAttribute("method") || Mu, s = Md(t.getAttribute("enctype")) || Du, u = new FormData(t);
  } else if (l2(t) || s2(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || h.getAttribute("action");
    if (o = p ? aa(p, a) : null, r = t.getAttribute("formmethod") || h.getAttribute("method") || Mu, s = Md(t.getAttribute("formenctype")) || Md(h.getAttribute("enctype")) || Du, u = new FormData(h, t), !f2()) {
      let { name: g, type: y, value: m } = t;
      if (y === "image") {
        let v = g ? `${g}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else g && u.append(g, m);
    }
  } else {
    if (Wu(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Mu, o = null, s = Du, c = t;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: o, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Uh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Zb(t, a, r, o) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : a && aa(s.pathname, a) === "/" ? s.pathname = `${Bu(a)}/_root.${o}` : s.pathname = `${Bu(s.pathname)}.${o}`, s;
}
async function m2(t, a) {
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
function p2(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function g2(t, a, r) {
  let o = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await m2(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return x2(
    o.flat(1).filter(p2).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Dy(t, a, r, o, s, u) {
  let c = (p, g) => r[g] ? p.route.id !== r[g].route.id : !0, h = (p, g) => (
    // param change, /users/123 -> /users/456
    r[g].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[g].route.path?.endsWith("*") && r[g].params["*"] !== p.params["*"]
  );
  return u === "assets" ? a.filter(
    (p, g) => c(p, g) || h(p, g)
  ) : u === "data" ? a.filter((p, g) => {
    let y = o.routes[p.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (c(p, g) || h(p, g))
      return !0;
    if (p.route.shouldRevalidate) {
      let m = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
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
function y2(t, a, { includeHydrateFallback: r } = {}) {
  return v2(
    t.map((o) => {
      let s = a.routes[o.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function v2(t) {
  return [...new Set(t)];
}
function b2(t) {
  let a = {}, r = Object.keys(t).sort();
  for (let o of r)
    a[o] = t[o];
  return a;
}
function x2(t, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((o, s) => {
    let u = JSON.stringify(b2(s));
    return r.has(u) || (r.add(u), o.push({ key: u, link: s })), o;
  }, []);
}
function kh() {
  let t = M.useContext(_r);
  return Uh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function S2() {
  let t = M.useContext($o);
  return Uh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Vh = M.createContext(void 0);
Vh.displayName = "FrameworkContext";
function Yh() {
  let t = M.useContext(Vh);
  return Uh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function w2(t, a) {
  let r = M.useContext(Vh), [o, s] = M.useState(!1), [u, c] = M.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: m } = a, v = M.useRef(null);
  M.useEffect(() => {
    if (t === "render" && c(!0), t === "viewport") {
      let T = (R) => {
        R.forEach((z) => {
          c(z.isIntersecting);
        });
      }, N = new IntersectionObserver(T, { threshold: 0.5 });
      return v.current && N.observe(v.current), () => {
        N.disconnect();
      };
    }
  }, [t]), M.useEffect(() => {
    if (o) {
      let T = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(T);
      };
    }
  }, [o]);
  let x = () => {
    s(!0);
  }, S = () => {
    s(!1), c(!1);
  };
  return r ? t !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: bo(h, x),
      onBlur: bo(p, S),
      onMouseEnter: bo(g, x),
      onMouseLeave: bo(y, S),
      onTouchStart: bo(m, x)
    }
  ] : [!1, v, {}];
}
function bo(t, a) {
  return (r) => {
    t && t(r), r.defaultPrevented || a(r);
  };
}
function E2({ page: t, ...a }) {
  let r = kb(), { router: o } = kh(), s = M.useMemo(
    () => vb(o.routes, t, o.basename),
    [o.routes, t, o.basename]
  );
  return s ? r ? /* @__PURE__ */ M.createElement(N2, { page: t, matches: s, ...a }) : /* @__PURE__ */ M.createElement(R2, { page: t, matches: s, ...a }) : null;
}
function _2(t) {
  let { manifest: a, routeModules: r } = Yh(), [o, s] = M.useState([]);
  return M.useEffect(() => {
    let u = !1;
    return g2(t, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, r]), o;
}
function N2({
  page: t,
  matches: a,
  ...r
}) {
  let o = li(), { future: s } = Yh(), { basename: u } = kh(), c = M.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let h = Zb(
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
  return /* @__PURE__ */ M.createElement(M.Fragment, null, c.map((h) => /* @__PURE__ */ M.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function R2({
  page: t,
  matches: a,
  ...r
}) {
  let o = li(), { future: s, manifest: u, routeModules: c } = Yh(), { basename: h } = kh(), { loaderData: p, matches: g } = S2(), y = M.useMemo(
    () => Dy(
      t,
      a,
      g,
      u,
      o,
      "data"
    ),
    [t, a, g, u, o]
  ), m = M.useMemo(
    () => Dy(
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
    let T = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((j) => j.route.id === z.route.id) && z.route.id in p && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? N = !0 : T.add(z.route.id));
    }), T.size === 0)
      return [];
    let R = Zb(
      t,
      h,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return N && T.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((z) => T.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [R.pathname + R.search];
  }, [
    h,
    s.v8_trailingSlashAwareDataRequests,
    p,
    o,
    u,
    y,
    a,
    t,
    c
  ]), x = M.useMemo(
    () => y2(m, u),
    [m, u]
  ), S = _2(m);
  return /* @__PURE__ */ M.createElement(M.Fragment, null, v.map((T) => /* @__PURE__ */ M.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...r })), x.map((T) => /* @__PURE__ */ M.createElement("link", { key: T, rel: "modulepreload", href: T, ...r })), S.map(({ key: T, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ M.createElement(
      "link",
      {
        key: T,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function C2(...t) {
  return (a) => {
    t.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var T2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  T2 && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var Qb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Fb = M.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: o = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: h,
    state: p,
    target: g,
    to: y,
    preventScrollReset: m,
    viewTransition: v,
    defaultShouldRevalidate: x,
    ...S
  }, T) {
    let { basename: N, navigator: R, useTransitions: z } = M.useContext(ia), E = typeof y == "string" && Qb.test(y), j = _b(y, N);
    y = j.to;
    let U = D_(y, { relative: s }), H = li(), V = null;
    if (h) {
      let $ = Fu(
        h,
        [],
        H.mask ? H.mask.pathname : "/",
        !0
      );
      N !== "/" && ($.pathname = $.pathname === "/" ? N : na([N, $.pathname])), V = R.createHref($);
    }
    let [D, q, le] = w2(
      o,
      S
    ), I = A2(y, {
      replace: c,
      mask: h,
      state: p,
      target: g,
      preventScrollReset: m,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: x,
      useTransitions: z
    });
    function K($) {
      a && a($), $.defaultPrevented || I($);
    }
    let W = !(j.isExternal || u), O = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ M.createElement(
        "a",
        {
          ...S,
          ...le,
          href: (W ? V : void 0) || j.absoluteURL || U,
          onClick: W ? K : a,
          ref: C2(T, q),
          target: g,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return D && !E ? /* @__PURE__ */ M.createElement(M.Fragment, null, O, /* @__PURE__ */ M.createElement(E2, { page: U })) : O;
  }
);
Fb.displayName = "Link";
var Kb = M.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: o = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: h,
    children: p,
    ...g
  }, y) {
    let m = Go(c, { relative: g.relative }), v = li(), x = M.useContext($o), { navigator: S, basename: T } = M.useContext(ia), N = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    H2(m) && h === !0, R = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, z = v.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), E = E ? E.toLowerCase() : null, R = R.toLowerCase()), E && T && (E = aa(E, T) || E);
    const j = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let U = z === R || !s && z.startsWith(R) && z.charAt(j) === "/", H = E != null && (E === R || !s && E.startsWith(R) && E.charAt(R.length) === "/"), V = {
      isActive: U,
      isPending: H,
      isTransitioning: N
    }, D = U ? a : void 0, q;
    typeof o == "function" ? q = o(V) : q = [
      o,
      U ? "active" : null,
      H ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let le = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ M.createElement(
      Fb,
      {
        ...g,
        "aria-current": D,
        className: q,
        ref: y,
        style: le,
        to: c,
        viewTransition: h
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
Kb.displayName = "NavLink";
var M2 = M.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: o,
    replace: s,
    state: u,
    method: c = Mu,
    action: h,
    onSubmit: p,
    relative: g,
    preventScrollReset: y,
    viewTransition: m,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: T } = M.useContext(ia), N = j2(), R = L2(h, { relative: g }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof h == "string" && Qb.test(h), j = (U) => {
      if (p && p(U), U.defaultPrevented) return;
      U.preventDefault();
      let H = U.nativeEvent.submitter, V = H?.getAttribute("formmethod") || c, D = () => N(H || U.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: r,
        replace: s,
        state: u,
        relative: g,
        preventScrollReset: y,
        viewTransition: m,
        defaultShouldRevalidate: v
      });
      T && r !== !1 ? M.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ M.createElement(
      "form",
      {
        ref: S,
        method: z,
        action: R,
        onSubmit: o ? p : j,
        ...x,
        "data-discover": !E && t === "render" ? "true" : void 0
      }
    );
  }
);
M2.displayName = "Form";
function D2(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Pb(t) {
  let a = M.useContext(_r);
  return Ze(a, D2(t)), a;
}
function A2(t, {
  target: a,
  replace: r,
  mask: o,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: h,
  defaultShouldRevalidate: p,
  useTransitions: g
} = {}) {
  let y = A_(), m = li(), v = Go(t, { relative: c });
  return M.useCallback(
    (x) => {
      if (c2(x, a)) {
        x.preventDefault();
        let S = r !== void 0 ? r : ja(m) === ja(v), T = () => y(t, {
          replace: S,
          mask: o,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: h,
          defaultShouldRevalidate: p
        });
        g ? M.startTransition(() => T()) : T();
      }
    },
    [
      m,
      y,
      v,
      r,
      o,
      s,
      a,
      t,
      u,
      c,
      h,
      p,
      g
    ]
  );
}
var z2 = 0, O2 = () => `__${String(++z2)}__`;
function j2() {
  let { router: t } = Pb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = M.useContext(ia), r = X_(), o = t.fetch, s = t.navigate;
  return M.useCallback(
    async (u, c = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: m } = h2(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || O2();
        await o(v, r, c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: m,
          formMethod: c.method || p,
          formEncType: c.encType || g,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: m,
          formMethod: c.method || p,
          formEncType: c.encType || g,
          replace: c.replace,
          state: c.state,
          fromRouteId: r,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition
        });
    },
    [o, s, a, r]
  );
}
function L2(t, { relative: a } = {}) {
  let { basename: r } = M.useContext(ia), o = M.useContext(ba);
  Ze(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), u = { ...Go(t || ".", { relative: a }) }, c = li();
  if (t == null) {
    u.search = c.search;
    let h = new URLSearchParams(u.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((m) => m).forEach((m) => h.append("index", m));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : na([r, u.pathname])), ja(u);
}
function H2(t, { relative: a } = {}) {
  let r = M.useContext(Lh);
  Ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = Pb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Go(t, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = aa(r.currentLocation.pathname, o) || r.currentLocation.pathname, c = aa(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return Hu(s.pathname, c) != null || Hu(s.pathname, u) != null;
}
const B2 = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], U2 = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], Jb = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: ""
};
class ec extends Error {
  constructor(a, r, o, s) {
    super(o), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const tc = "/api/v1/extensions/nexus.video.svi2-pro";
async function El(t, a) {
  const r = t.startsWith("http") ? t : `${tc}${t}`, o = await fetch(r, {
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
    throw new ec(
      o.status,
      s?.category ?? "unknown",
      s?.message ?? o.statusText,
      s?.requestId
    );
  }
  if (o.status !== 204)
    return await o.json();
}
function k2(t, a, r) {
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
async function Wb() {
  return El("/presets");
}
async function V2() {
  return El("/settings");
}
async function Y2(t) {
  return El("/settings", {
    method: "PUT",
    body: JSON.stringify(t)
  });
}
var q2 = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function ta({ tone: t = "neutral", children: a, className: r }) {
  const o = [q2[t], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("span", { className: o, children: a });
}
var $2 = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, X2 = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, G2 = "_1h48t1v9";
function $i({
  variant: t = "primary",
  size: a = "md",
  type: r = "button",
  loading: o = !1,
  disabled: s,
  children: u,
  className: c,
  ...h
}) {
  const p = [$2[t], X2[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: o || s,
      "aria-busy": o || void 0,
      ...h,
      children: [
        o ? /* @__PURE__ */ w.jsx("span", { className: G2, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Ft(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let a = "";
  if (Array.isArray(t))
    for (let r = 0, o; r < t.length; r++)
      (o = Ft(t[r])) !== "" && (a += (a && " ") + o);
  else
    for (let r in t)
      t[r] && (a += (a && " ") + r);
  return a;
}
var I2 = { value: () => {
} };
function nc() {
  for (var t = 0, a = arguments.length, r = {}, o; t < a; ++t) {
    if (!(o = arguments[t] + "") || o in r || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    r[o] = [];
  }
  return new Au(r);
}
function Au(t) {
  this._ = t;
}
function Z2(t, a) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var o = "", s = r.indexOf(".");
    if (s >= 0 && (o = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: o };
  });
}
Au.prototype = nc.prototype = {
  constructor: Au,
  on: function(t, a) {
    var r = this._, o = Z2(t + "", r), s, u = -1, c = o.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (t = o[u]).type) && (s = Q2(r[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (t = o[u]).type) r[s] = Ay(r[s], t.name, a);
      else if (a == null) for (s in r) r[s] = Ay(r[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, a = this._;
    for (var r in a) t[r] = a[r].slice();
    return new Au(t);
  },
  call: function(t, a) {
    if ((s = arguments.length - 2) > 0) for (var r = new Array(s), o = 0, s, u; o < s; ++o) r[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (u = this._[t], o = 0, s = u.length; o < s; ++o) u[o].value.apply(a, r);
  },
  apply: function(t, a, r) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var o = this._[t], s = 0, u = o.length; s < u; ++s) o[s].value.apply(a, r);
  }
};
function Q2(t, a) {
  for (var r = 0, o = t.length, s; r < o; ++r)
    if ((s = t[r]).name === a)
      return s.value;
}
function Ay(t, a, r) {
  for (var o = 0, s = t.length; o < s; ++o)
    if (t[o].name === a) {
      t[o] = I2, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return r != null && t.push({ name: a, value: r }), t;
}
var eh = "http://www.w3.org/1999/xhtml";
const zy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: eh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ac(t) {
  var a = t += "", r = a.indexOf(":");
  return r >= 0 && (a = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)), zy.hasOwnProperty(a) ? { space: zy[a], local: t } : t;
}
function F2(t) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === eh && a.documentElement.namespaceURI === eh ? a.createElement(t) : a.createElementNS(r, t);
  };
}
function K2(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function e1(t) {
  var a = ac(t);
  return (a.local ? K2 : F2)(a);
}
function P2() {
}
function qh(t) {
  return t == null ? P2 : function() {
    return this.querySelector(t);
  };
}
function J2(t) {
  typeof t != "function" && (t = qh(t));
  for (var a = this._groups, r = a.length, o = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = o[s] = new Array(c), p, g, y = 0; y < c; ++y)
      (p = u[y]) && (g = t.call(p, p.__data__, y, u)) && ("__data__" in p && (g.__data__ = p.__data__), h[y] = g);
  return new Yn(o, this._parents);
}
function W2(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function eN() {
  return [];
}
function t1(t) {
  return t == null ? eN : function() {
    return this.querySelectorAll(t);
  };
}
function tN(t) {
  return function() {
    return W2(t.apply(this, arguments));
  };
}
function nN(t) {
  typeof t == "function" ? t = tN(t) : t = t1(t);
  for (var a = this._groups, r = a.length, o = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], h = c.length, p, g = 0; g < h; ++g)
      (p = c[g]) && (o.push(t.call(p, p.__data__, g, c)), s.push(p));
  return new Yn(o, s);
}
function n1(t) {
  return function() {
    return this.matches(t);
  };
}
function a1(t) {
  return function(a) {
    return a.matches(t);
  };
}
var aN = Array.prototype.find;
function iN(t) {
  return function() {
    return aN.call(this.children, t);
  };
}
function rN() {
  return this.firstElementChild;
}
function lN(t) {
  return this.select(t == null ? rN : iN(typeof t == "function" ? t : a1(t)));
}
var oN = Array.prototype.filter;
function sN() {
  return Array.from(this.children);
}
function uN(t) {
  return function() {
    return oN.call(this.children, t);
  };
}
function cN(t) {
  return this.selectAll(t == null ? sN : uN(typeof t == "function" ? t : a1(t)));
}
function fN(t) {
  typeof t != "function" && (t = n1(t));
  for (var a = this._groups, r = a.length, o = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = o[s] = [], p, g = 0; g < c; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new Yn(o, this._parents);
}
function i1(t) {
  return new Array(t.length);
}
function dN() {
  return new Yn(this._enter || this._groups.map(i1), this._parents);
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
function hN(t) {
  return function() {
    return t;
  };
}
function mN(t, a, r, o, s, u) {
  for (var c = 0, h, p = a.length, g = u.length; c < g; ++c)
    (h = a[c]) ? (h.__data__ = u[c], o[c] = h) : r[c] = new Uu(t, u[c]);
  for (; c < p; ++c)
    (h = a[c]) && (s[c] = h);
}
function pN(t, a, r, o, s, u, c) {
  var h, p, g = /* @__PURE__ */ new Map(), y = a.length, m = u.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (p = a[h]) && (v[h] = x = c.call(p, p.__data__, h, a) + "", g.has(x) ? s[h] = p : g.set(x, p));
  for (h = 0; h < m; ++h)
    x = c.call(t, u[h], h, u) + "", (p = g.get(x)) ? (o[h] = p, p.__data__ = u[h], g.delete(x)) : r[h] = new Uu(t, u[h]);
  for (h = 0; h < y; ++h)
    (p = a[h]) && g.get(v[h]) === p && (s[h] = p);
}
function gN(t) {
  return t.__data__;
}
function yN(t, a) {
  if (!arguments.length) return Array.from(this, gN);
  var r = a ? pN : mN, o = this._parents, s = this._groups;
  typeof t != "function" && (t = hN(t));
  for (var u = s.length, c = new Array(u), h = new Array(u), p = new Array(u), g = 0; g < u; ++g) {
    var y = o[g], m = s[g], v = m.length, x = vN(t.call(y, y && y.__data__, g, o)), S = x.length, T = h[g] = new Array(S), N = c[g] = new Array(S), R = p[g] = new Array(v);
    r(y, m, T, N, R, x, a);
    for (var z = 0, E = 0, j, U; z < S; ++z)
      if (j = T[z]) {
        for (z >= E && (E = z + 1); !(U = N[E]) && ++E < S; ) ;
        j._next = U || null;
      }
  }
  return c = new Yn(c, o), c._enter = h, c._exit = p, c;
}
function vN(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function bN() {
  return new Yn(this._exit || this._groups.map(i1), this._parents);
}
function xN(t, a, r) {
  var o = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), o && s ? o.merge(s).order() : s;
}
function SN(t) {
  for (var a = t.selection ? t.selection() : t, r = this._groups, o = a._groups, s = r.length, u = o.length, c = Math.min(s, u), h = new Array(s), p = 0; p < c; ++p)
    for (var g = r[p], y = o[p], m = g.length, v = h[p] = new Array(m), x, S = 0; S < m; ++S)
      (x = g[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    h[p] = r[p];
  return new Yn(h, this._parents);
}
function wN() {
  for (var t = this._groups, a = -1, r = t.length; ++a < r; )
    for (var o = t[a], s = o.length - 1, u = o[s], c; --s >= 0; )
      (c = o[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function EN(t) {
  t || (t = _N);
  function a(m, v) {
    return m && v ? t(m.__data__, v.__data__) : !m - !v;
  }
  for (var r = this._groups, o = r.length, s = new Array(o), u = 0; u < o; ++u) {
    for (var c = r[u], h = c.length, p = s[u] = new Array(h), g, y = 0; y < h; ++y)
      (g = c[y]) && (p[y] = g);
    p.sort(a);
  }
  return new Yn(s, this._parents).order();
}
function _N(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function NN() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function RN() {
  return Array.from(this);
}
function CN() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var o = t[a], s = 0, u = o.length; s < u; ++s) {
      var c = o[s];
      if (c) return c;
    }
  return null;
}
function TN() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function MN() {
  return !this.node();
}
function DN(t) {
  for (var a = this._groups, r = 0, o = a.length; r < o; ++r)
    for (var s = a[r], u = 0, c = s.length, h; u < c; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function AN(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zN(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ON(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function jN(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function LN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
  };
}
function HN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, r);
  };
}
function BN(t, a) {
  var r = ac(t);
  if (arguments.length < 2) {
    var o = this.node();
    return r.local ? o.getAttributeNS(r.space, r.local) : o.getAttribute(r);
  }
  return this.each((a == null ? r.local ? zN : AN : typeof a == "function" ? r.local ? HN : LN : r.local ? jN : ON)(r, a));
}
function r1(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function UN(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function kN(t, a, r) {
  return function() {
    this.style.setProperty(t, a, r);
  };
}
function VN(t, a, r) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, r);
  };
}
function YN(t, a, r) {
  return arguments.length > 1 ? this.each((a == null ? UN : typeof a == "function" ? VN : kN)(t, a, r ?? "")) : pl(this.node(), t);
}
function pl(t, a) {
  return t.style.getPropertyValue(a) || r1(t).getComputedStyle(t, null).getPropertyValue(a);
}
function qN(t) {
  return function() {
    delete this[t];
  };
}
function $N(t, a) {
  return function() {
    this[t] = a;
  };
}
function XN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[t] : this[t] = r;
  };
}
function GN(t, a) {
  return arguments.length > 1 ? this.each((a == null ? qN : typeof a == "function" ? XN : $N)(t, a)) : this.node()[t];
}
function l1(t) {
  return t.trim().split(/^|\s+/);
}
function $h(t) {
  return t.classList || new o1(t);
}
function o1(t) {
  this._node = t, this._names = l1(t.getAttribute("class") || "");
}
o1.prototype = {
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
function s1(t, a) {
  for (var r = $h(t), o = -1, s = a.length; ++o < s; ) r.add(a[o]);
}
function u1(t, a) {
  for (var r = $h(t), o = -1, s = a.length; ++o < s; ) r.remove(a[o]);
}
function IN(t) {
  return function() {
    s1(this, t);
  };
}
function ZN(t) {
  return function() {
    u1(this, t);
  };
}
function QN(t, a) {
  return function() {
    (a.apply(this, arguments) ? s1 : u1)(this, t);
  };
}
function FN(t, a) {
  var r = l1(t + "");
  if (arguments.length < 2) {
    for (var o = $h(this.node()), s = -1, u = r.length; ++s < u; ) if (!o.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? QN : a ? IN : ZN)(r, a));
}
function KN() {
  this.textContent = "";
}
function PN(t) {
  return function() {
    this.textContent = t;
  };
}
function JN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function WN(t) {
  return arguments.length ? this.each(t == null ? KN : (typeof t == "function" ? JN : PN)(t)) : this.node().textContent;
}
function eR() {
  this.innerHTML = "";
}
function tR(t) {
  return function() {
    this.innerHTML = t;
  };
}
function nR(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function aR(t) {
  return arguments.length ? this.each(t == null ? eR : (typeof t == "function" ? nR : tR)(t)) : this.node().innerHTML;
}
function iR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function rR() {
  return this.each(iR);
}
function lR() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function oR() {
  return this.each(lR);
}
function sR(t) {
  var a = typeof t == "function" ? t : e1(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function uR() {
  return null;
}
function cR(t, a) {
  var r = typeof t == "function" ? t : e1(t), o = a == null ? uR : typeof a == "function" ? a : qh(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function fR() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function dR() {
  return this.each(fR);
}
function hR() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function mR() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function pR(t) {
  return this.select(t ? mR : hR);
}
function gR(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function yR(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function vR(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var r = "", o = a.indexOf(".");
    return o >= 0 && (r = a.slice(o + 1), a = a.slice(0, o)), { type: a, name: r };
  });
}
function bR(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, o = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++o] = u;
      ++o ? a.length = o : delete this.__on;
    }
  };
}
function xR(t, a, r) {
  return function() {
    var o = this.__on, s, u = yR(a);
    if (o) {
      for (var c = 0, h = o.length; c < h; ++c)
        if ((s = o[c]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = r), s.value = a;
          return;
        }
    }
    this.addEventListener(t.type, u, r), s = { type: t.type, name: t.name, value: a, listener: u, options: r }, o ? o.push(s) : this.__on = [s];
  };
}
function SR(t, a, r) {
  var o = vR(t + ""), s, u = o.length, c;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var p = 0, g = h.length, y; p < g; ++p)
        for (s = 0, y = h[p]; s < u; ++s)
          if ((c = o[s]).type === y.type && c.name === y.name)
            return y.value;
    }
    return;
  }
  for (h = a ? xR : bR, s = 0; s < u; ++s) this.each(h(o[s], a, r));
  return this;
}
function c1(t, a, r) {
  var o = r1(t), s = o.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = o.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function wR(t, a) {
  return function() {
    return c1(this, t, a);
  };
}
function ER(t, a) {
  return function() {
    return c1(this, t, a.apply(this, arguments));
  };
}
function _R(t, a) {
  return this.each((typeof a == "function" ? ER : wR)(t, a));
}
function* NR() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var o = t[a], s = 0, u = o.length, c; s < u; ++s)
      (c = o[s]) && (yield c);
}
var f1 = [null];
function Yn(t, a) {
  this._groups = t, this._parents = a;
}
function Io() {
  return new Yn([[document.documentElement]], f1);
}
function RR() {
  return this;
}
Yn.prototype = Io.prototype = {
  constructor: Yn,
  select: J2,
  selectAll: nN,
  selectChild: lN,
  selectChildren: cN,
  filter: fN,
  data: yN,
  enter: dN,
  exit: bN,
  join: xN,
  merge: SN,
  selection: RR,
  order: wN,
  sort: EN,
  call: NN,
  nodes: RN,
  node: CN,
  size: TN,
  empty: MN,
  each: DN,
  attr: BN,
  style: YN,
  property: GN,
  classed: FN,
  text: WN,
  html: aR,
  raise: rR,
  lower: oR,
  append: sR,
  insert: cR,
  remove: dR,
  clone: pR,
  datum: gR,
  on: SR,
  dispatch: _R,
  [Symbol.iterator]: NR
};
function Vn(t) {
  return typeof t == "string" ? new Yn([[document.querySelector(t)]], [document.documentElement]) : new Yn([[t]], f1);
}
function CR(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ha(t, a) {
  if (t = CR(t), a === void 0 && (a = t.currentTarget), a) {
    var r = a.ownerSVGElement || a;
    if (r.createSVGPoint) {
      var o = r.createSVGPoint();
      return o.x = t.clientX, o.y = t.clientY, o = o.matrixTransform(a.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [t.clientX - s.left - a.clientLeft, t.clientY - s.top - a.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const TR = { passive: !1 }, Ao = { capture: !0, passive: !1 };
function Dd(t) {
  t.stopImmediatePropagation();
}
function dl(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function d1(t) {
  var a = t.document.documentElement, r = Vn(t).on("dragstart.drag", dl, Ao);
  "onselectstart" in a ? r.on("selectstart.drag", dl, Ao) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function h1(t, a) {
  var r = t.document.documentElement, o = Vn(t).on("dragstart.drag", null);
  a && (o.on("click.drag", dl, Ao), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in r ? o.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const cu = (t) => () => t;
function th(t, {
  sourceEvent: a,
  subject: r,
  target: o,
  identifier: s,
  active: u,
  x: c,
  y: h,
  dx: p,
  dy: g,
  dispatch: y
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: g, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
th.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function MR(t) {
  return !t.ctrlKey && !t.button;
}
function DR() {
  return this.parentNode;
}
function AR(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function zR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function m1() {
  var t = MR, a = DR, r = AR, o = zR, s = {}, u = nc("start", "drag", "end"), c = 0, h, p, g, y, m = 0;
  function v(j) {
    j.on("mousedown.drag", x).filter(o).on("touchstart.drag", N).on("touchmove.drag", R, TR).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(j, U) {
    if (!(y || !t.call(this, j, U))) {
      var H = E(this, a.call(this, j, U), j, U, "mouse");
      H && (Vn(j.view).on("mousemove.drag", S, Ao).on("mouseup.drag", T, Ao), d1(j.view), Dd(j), g = !1, h = j.clientX, p = j.clientY, H("start", j));
    }
  }
  function S(j) {
    if (dl(j), !g) {
      var U = j.clientX - h, H = j.clientY - p;
      g = U * U + H * H > m;
    }
    s.mouse("drag", j);
  }
  function T(j) {
    Vn(j.view).on("mousemove.drag mouseup.drag", null), h1(j.view, g), dl(j), s.mouse("end", j);
  }
  function N(j, U) {
    if (t.call(this, j, U)) {
      var H = j.changedTouches, V = a.call(this, j, U), D = H.length, q, le;
      for (q = 0; q < D; ++q)
        (le = E(this, V, j, U, H[q].identifier, H[q])) && (Dd(j), le("start", j, H[q]));
    }
  }
  function R(j) {
    var U = j.changedTouches, H = U.length, V, D;
    for (V = 0; V < H; ++V)
      (D = s[U[V].identifier]) && (dl(j), D("drag", j, U[V]));
  }
  function z(j) {
    var U = j.changedTouches, H = U.length, V, D;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < H; ++V)
      (D = s[U[V].identifier]) && (Dd(j), D("end", j, U[V]));
  }
  function E(j, U, H, V, D, q) {
    var le = u.copy(), I = ha(q || H, U), K, W, O;
    if ((O = r.call(j, new th("beforestart", {
      sourceEvent: H,
      target: v,
      identifier: D,
      active: c,
      x: I[0],
      y: I[1],
      dx: 0,
      dy: 0,
      dispatch: le
    }), V)) != null)
      return K = O.x - I[0] || 0, W = O.y - I[1] || 0, function $(_, L, Z) {
        var G = I, ne;
        switch (_) {
          case "start":
            s[D] = $, ne = c++;
            break;
          case "end":
            delete s[D], --c;
          // falls through
          case "drag":
            I = ha(Z || L, U), ne = c;
            break;
        }
        le.call(
          _,
          j,
          new th(_, {
            sourceEvent: L,
            subject: O,
            target: v,
            identifier: D,
            active: ne,
            x: I[0] + K,
            y: I[1] + W,
            dx: I[0] - G[0],
            dy: I[1] - G[1],
            dispatch: le
          }),
          V
        );
      };
  }
  return v.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : cu(!!j), v) : t;
  }, v.container = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : cu(j), v) : a;
  }, v.subject = function(j) {
    return arguments.length ? (r = typeof j == "function" ? j : cu(j), v) : r;
  }, v.touchable = function(j) {
    return arguments.length ? (o = typeof j == "function" ? j : cu(!!j), v) : o;
  }, v.on = function() {
    var j = u.on.apply(u, arguments);
    return j === u ? v : j;
  }, v.clickDistance = function(j) {
    return arguments.length ? (m = (j = +j) * j, v) : Math.sqrt(m);
  }, v;
}
function Xh(t, a, r) {
  t.prototype = a.prototype = r, r.constructor = t;
}
function p1(t, a) {
  var r = Object.create(t.prototype);
  for (var o in a) r[o] = a[o];
  return r;
}
function Zo() {
}
var zo = 0.7, ku = 1 / zo, hl = "\\s*([+-]?\\d+)\\s*", Oo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", za = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", OR = /^#([0-9a-f]{3,8})$/, jR = new RegExp(`^rgb\\(${hl},${hl},${hl}\\)$`), LR = new RegExp(`^rgb\\(${za},${za},${za}\\)$`), HR = new RegExp(`^rgba\\(${hl},${hl},${hl},${Oo}\\)$`), BR = new RegExp(`^rgba\\(${za},${za},${za},${Oo}\\)$`), UR = new RegExp(`^hsl\\(${Oo},${za},${za}\\)$`), kR = new RegExp(`^hsla\\(${Oo},${za},${za},${Oo}\\)$`), Oy = {
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
Xh(Zo, br, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: jy,
  // Deprecated! Use color.formatHex.
  formatHex: jy,
  formatHex8: VR,
  formatHsl: YR,
  formatRgb: Ly,
  toString: Ly
});
function jy() {
  return this.rgb().formatHex();
}
function VR() {
  return this.rgb().formatHex8();
}
function YR() {
  return g1(this).formatHsl();
}
function Ly() {
  return this.rgb().formatRgb();
}
function br(t) {
  var a, r;
  return t = (t + "").trim().toLowerCase(), (a = OR.exec(t)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? Hy(a) : r === 3 ? new Tn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? fu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? fu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = jR.exec(t)) ? new Tn(a[1], a[2], a[3], 1) : (a = LR.exec(t)) ? new Tn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = HR.exec(t)) ? fu(a[1], a[2], a[3], a[4]) : (a = BR.exec(t)) ? fu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = UR.exec(t)) ? ky(a[1], a[2] / 100, a[3] / 100, 1) : (a = kR.exec(t)) ? ky(a[1], a[2] / 100, a[3] / 100, a[4]) : Oy.hasOwnProperty(t) ? Hy(Oy[t]) : t === "transparent" ? new Tn(NaN, NaN, NaN, 0) : null;
}
function Hy(t) {
  return new Tn(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function fu(t, a, r, o) {
  return o <= 0 && (t = a = r = NaN), new Tn(t, a, r, o);
}
function qR(t) {
  return t instanceof Zo || (t = br(t)), t ? (t = t.rgb(), new Tn(t.r, t.g, t.b, t.opacity)) : new Tn();
}
function nh(t, a, r, o) {
  return arguments.length === 1 ? qR(t) : new Tn(t, a, r, o ?? 1);
}
function Tn(t, a, r, o) {
  this.r = +t, this.g = +a, this.b = +r, this.opacity = +o;
}
Xh(Tn, nh, p1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new Tn(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new Tn(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Tn(yr(this.r), yr(this.g), yr(this.b), Vu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: By,
  // Deprecated! Use color.formatHex.
  formatHex: By,
  formatHex8: $R,
  formatRgb: Uy,
  toString: Uy
}));
function By() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}`;
}
function $R() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}${pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Uy() {
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
function ky(t, a, r, o) {
  return o <= 0 ? t = a = r = NaN : r <= 0 || r >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ma(t, a, r, o);
}
function g1(t) {
  if (t instanceof ma) return new ma(t.h, t.s, t.l, t.opacity);
  if (t instanceof Zo || (t = br(t)), !t) return new ma();
  if (t instanceof ma) return t;
  t = t.rgb();
  var a = t.r / 255, r = t.g / 255, o = t.b / 255, s = Math.min(a, r, o), u = Math.max(a, r, o), c = NaN, h = u - s, p = (u + s) / 2;
  return h ? (a === u ? c = (r - o) / h + (r < o) * 6 : r === u ? c = (o - a) / h + 2 : c = (a - r) / h + 4, h /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : h = p > 0 && p < 1 ? 0 : c, new ma(c, h, p, t.opacity);
}
function XR(t, a, r, o) {
  return arguments.length === 1 ? g1(t) : new ma(t, a, r, o ?? 1);
}
function ma(t, a, r, o) {
  this.h = +t, this.s = +a, this.l = +r, this.opacity = +o;
}
Xh(ma, XR, p1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, r = this.l, o = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - o;
    return new Tn(
      Ad(t >= 240 ? t - 240 : t + 120, s, o),
      Ad(t, s, o),
      Ad(t < 120 ? t + 240 : t - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new ma(Vy(this.h), du(this.s), du(this.l), Vu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Vu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Vy(this.h)}, ${du(this.s) * 100}%, ${du(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Vy(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function du(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ad(t, a, r) {
  return (t < 60 ? a + (r - a) * t / 60 : t < 180 ? r : t < 240 ? a + (r - a) * (240 - t) / 60 : a) * 255;
}
const Gh = (t) => () => t;
function GR(t, a) {
  return function(r) {
    return t + r * a;
  };
}
function IR(t, a, r) {
  return t = Math.pow(t, r), a = Math.pow(a, r) - t, r = 1 / r, function(o) {
    return Math.pow(t + o * a, r);
  };
}
function ZR(t) {
  return (t = +t) == 1 ? y1 : function(a, r) {
    return r - a ? IR(a, r, t) : Gh(isNaN(a) ? r : a);
  };
}
function y1(t, a) {
  var r = a - t;
  return r ? GR(t, r) : Gh(isNaN(t) ? a : t);
}
const Yu = (function t(a) {
  var r = ZR(a);
  function o(s, u) {
    var c = r((s = nh(s)).r, (u = nh(u)).r), h = r(s.g, u.g), p = r(s.b, u.b), g = y1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = h(y), s.b = p(y), s.opacity = g(y), s + "";
    };
  }
  return o.gamma = t, o;
})(1);
function QR(t, a) {
  a || (a = []);
  var r = t ? Math.min(a.length, t.length) : 0, o = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) o[s] = t[s] * (1 - u) + a[s] * u;
    return o;
  };
}
function FR(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function KR(t, a) {
  var r = a ? a.length : 0, o = t ? Math.min(r, t.length) : 0, s = new Array(o), u = new Array(r), c;
  for (c = 0; c < o; ++c) s[c] = Co(t[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(h) {
    for (c = 0; c < o; ++c) u[c] = s[c](h);
    return u;
  };
}
function PR(t, a) {
  var r = /* @__PURE__ */ new Date();
  return t = +t, a = +a, function(o) {
    return r.setTime(t * (1 - o) + a * o), r;
  };
}
function Da(t, a) {
  return t = +t, a = +a, function(r) {
    return t * (1 - r) + a * r;
  };
}
function JR(t, a) {
  var r = {}, o = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? r[s] = Co(t[s], a[s]) : o[s] = a[s];
  return function(u) {
    for (s in r) o[s] = r[s](u);
    return o;
  };
}
var ah = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, zd = new RegExp(ah.source, "g");
function WR(t) {
  return function() {
    return t;
  };
}
function eC(t) {
  return function(a) {
    return t(a) + "";
  };
}
function v1(t, a) {
  var r = ah.lastIndex = zd.lastIndex = 0, o, s, u, c = -1, h = [], p = [];
  for (t = t + "", a = a + ""; (o = ah.exec(t)) && (s = zd.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), h[c] ? h[c] += u : h[++c] = u), (o = o[0]) === (s = s[0]) ? h[c] ? h[c] += s : h[++c] = s : (h[++c] = null, p.push({ i: c, x: Da(o, s) })), r = zd.lastIndex;
  return r < a.length && (u = a.slice(r), h[c] ? h[c] += u : h[++c] = u), h.length < 2 ? p[0] ? eC(p[0].x) : WR(a) : (a = p.length, function(g) {
    for (var y = 0, m; y < a; ++y) h[(m = p[y]).i] = m.x(g);
    return h.join("");
  });
}
function Co(t, a) {
  var r = typeof a, o;
  return a == null || r === "boolean" ? Gh(a) : (r === "number" ? Da : r === "string" ? (o = br(a)) ? (a = o, Yu) : v1 : a instanceof br ? Yu : a instanceof Date ? PR : FR(a) ? QR : Array.isArray(a) ? KR : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? JR : Da)(t, a);
}
var Yy = 180 / Math.PI, ih = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function b1(t, a, r, o, s, u) {
  var c, h, p;
  return (c = Math.sqrt(t * t + a * a)) && (t /= c, a /= c), (p = t * r + a * o) && (r -= t * p, o -= a * p), (h = Math.sqrt(r * r + o * o)) && (r /= h, o /= h, p /= h), t * o < a * r && (t = -t, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * Yy,
    skewX: Math.atan(p) * Yy,
    scaleX: c,
    scaleY: h
  };
}
var hu;
function tC(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? ih : b1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function nC(t) {
  return t == null || (hu || (hu = document.createElementNS("http://www.w3.org/2000/svg", "g")), hu.setAttribute("transform", t), !(t = hu.transform.baseVal.consolidate())) ? ih : (t = t.matrix, b1(t.a, t.b, t.c, t.d, t.e, t.f));
}
function x1(t, a, r, o) {
  function s(g) {
    return g.length ? g.pop() + " " : "";
  }
  function u(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var T = x.push("translate(", null, a, null, r);
      S.push({ i: T - 4, x: Da(g, m) }, { i: T - 2, x: Da(y, v) });
    } else (m || v) && x.push("translate(" + m + a + v + r);
  }
  function c(g, y, m, v) {
    g !== y ? (g - y > 180 ? y += 360 : y - g > 180 && (g += 360), v.push({ i: m.push(s(m) + "rotate(", null, o) - 2, x: Da(g, y) })) : y && m.push(s(m) + "rotate(" + y + o);
  }
  function h(g, y, m, v) {
    g !== y ? v.push({ i: m.push(s(m) + "skewX(", null, o) - 2, x: Da(g, y) }) : y && m.push(s(m) + "skewX(" + y + o);
  }
  function p(g, y, m, v, x, S) {
    if (g !== m || y !== v) {
      var T = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: T - 4, x: Da(g, m) }, { i: T - 2, x: Da(y, v) });
    } else (m !== 1 || v !== 1) && x.push(s(x) + "scale(" + m + "," + v + ")");
  }
  return function(g, y) {
    var m = [], v = [];
    return g = t(g), y = t(y), u(g.translateX, g.translateY, y.translateX, y.translateY, m, v), c(g.rotate, y.rotate, m, v), h(g.skewX, y.skewX, m, v), p(g.scaleX, g.scaleY, y.scaleX, y.scaleY, m, v), g = y = null, function(x) {
      for (var S = -1, T = v.length, N; ++S < T; ) m[(N = v[S]).i] = N.x(x);
      return m.join("");
    };
  };
}
var aC = x1(tC, "px, ", "px)", "deg)"), iC = x1(nC, ", ", ")", ")"), rC = 1e-12;
function qy(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function lC(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function oC(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const zu = (function t(a, r, o) {
  function s(u, c) {
    var h = u[0], p = u[1], g = u[2], y = c[0], m = c[1], v = c[2], x = y - h, S = m - p, T = x * x + S * S, N, R;
    if (T < rC)
      R = Math.log(v / g) / a, N = function(V) {
        return [
          h + V * x,
          p + V * S,
          g * Math.exp(a * V * R)
        ];
      };
    else {
      var z = Math.sqrt(T), E = (v * v - g * g + o * T) / (2 * g * r * z), j = (v * v - g * g - o * T) / (2 * v * r * z), U = Math.log(Math.sqrt(E * E + 1) - E), H = Math.log(Math.sqrt(j * j + 1) - j);
      R = (H - U) / a, N = function(V) {
        var D = V * R, q = qy(U), le = g / (r * z) * (q * oC(a * D + U) - lC(U));
        return [
          h + le * x,
          p + le * S,
          g * q / qy(a * D + U)
        ];
      };
    }
    return N.duration = R * 1e3 * a / Math.SQRT2, N;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), h = c * c, p = h * h;
    return t(c, h, p);
  }, s;
})(Math.SQRT2, 2, 4);
var gl = 0, _o = 0, xo = 0, S1 = 1e3, qu, No, $u = 0, xr = 0, ic = 0, jo = typeof performance == "object" && performance.now ? performance : Date, w1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ih() {
  return xr || (w1(sC), xr = jo.now() + ic);
}
function sC() {
  xr = 0;
}
function Xu() {
  this._call = this._time = this._next = null;
}
Xu.prototype = E1.prototype = {
  constructor: Xu,
  restart: function(t, a, r) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Ih() : +r) + (a == null ? 0 : +a), !this._next && No !== this && (No ? No._next = this : qu = this, No = this), this._call = t, this._time = r, rh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, rh());
  }
};
function E1(t, a, r) {
  var o = new Xu();
  return o.restart(t, a, r), o;
}
function uC() {
  Ih(), ++gl;
  for (var t = qu, a; t; )
    (a = xr - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --gl;
}
function $y() {
  xr = ($u = jo.now()) + ic, gl = _o = 0;
  try {
    uC();
  } finally {
    gl = 0, fC(), xr = 0;
  }
}
function cC() {
  var t = jo.now(), a = t - $u;
  a > S1 && (ic -= a, $u = t);
}
function fC() {
  for (var t, a = qu, r, o = 1 / 0; a; )
    a._call ? (o > a._time && (o = a._time), t = a, a = a._next) : (r = a._next, a._next = null, a = t ? t._next = r : qu = r);
  No = t, rh(o);
}
function rh(t) {
  if (!gl) {
    _o && (_o = clearTimeout(_o));
    var a = t - xr;
    a > 24 ? (t < 1 / 0 && (_o = setTimeout($y, t - jo.now() - ic)), xo && (xo = clearInterval(xo))) : (xo || ($u = jo.now(), xo = setInterval(cC, S1)), gl = 1, w1($y));
  }
}
function Xy(t, a, r) {
  var o = new Xu();
  return a = a == null ? 0 : +a, o.restart((s) => {
    o.stop(), t(s + a);
  }, a, r), o;
}
var dC = nc("start", "end", "cancel", "interrupt"), hC = [], _1 = 0, Gy = 1, lh = 2, Ou = 3, Iy = 4, oh = 5, ju = 6;
function rc(t, a, r, o, s, u) {
  var c = t.__transition;
  if (!c) t.__transition = {};
  else if (r in c) return;
  mC(t, r, {
    name: a,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: dC,
    tween: hC,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: _1
  });
}
function Zh(t, a) {
  var r = xa(t, a);
  if (r.state > _1) throw new Error("too late; already scheduled");
  return r;
}
function La(t, a) {
  var r = xa(t, a);
  if (r.state > Ou) throw new Error("too late; already running");
  return r;
}
function xa(t, a) {
  var r = t.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function mC(t, a, r) {
  var o = t.__transition, s;
  o[a] = r, r.timer = E1(u, 0, r.time);
  function u(g) {
    r.state = Gy, r.timer.restart(c, r.delay, r.time), r.delay <= g && c(g - r.delay);
  }
  function c(g) {
    var y, m, v, x;
    if (r.state !== Gy) return p();
    for (y in o)
      if (x = o[y], x.name === r.name) {
        if (x.state === Ou) return Xy(c);
        x.state === Iy ? (x.state = ju, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete o[y]) : +y < a && (x.state = ju, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete o[y]);
      }
    if (Xy(function() {
      r.state === Ou && (r.state = Iy, r.timer.restart(h, r.delay, r.time), h(g));
    }), r.state = lh, r.on.call("start", t, t.__data__, r.index, r.group), r.state === lh) {
      for (r.state = Ou, s = new Array(v = r.tween.length), y = 0, m = -1; y < v; ++y)
        (x = r.tween[y].value.call(t, t.__data__, r.index, r.group)) && (s[++m] = x);
      s.length = m + 1;
    }
  }
  function h(g) {
    for (var y = g < r.duration ? r.ease.call(null, g / r.duration) : (r.timer.restart(p), r.state = oh, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(t, y);
    r.state === oh && (r.on.call("end", t, t.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = ju, r.timer.stop(), delete o[a];
    for (var g in o) return;
    delete t.__transition;
  }
}
function Lu(t, a) {
  var r = t.__transition, o, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((o = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = o.state > lh && o.state < oh, o.state = ju, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete r[c];
    }
    u && delete t.__transition;
  }
}
function pC(t) {
  return this.each(function() {
    Lu(this, t);
  });
}
function gC(t, a) {
  var r, o;
  return function() {
    var s = La(this, t), u = s.tween;
    if (u !== r) {
      o = r = u;
      for (var c = 0, h = o.length; c < h; ++c)
        if (o[c].name === a) {
          o = o.slice(), o.splice(c, 1);
          break;
        }
    }
    s.tween = o;
  };
}
function yC(t, a, r) {
  var o, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = La(this, t), c = u.tween;
    if (c !== o) {
      s = (o = c).slice();
      for (var h = { name: a, value: r }, p = 0, g = s.length; p < g; ++p)
        if (s[p].name === a) {
          s[p] = h;
          break;
        }
      p === g && s.push(h);
    }
    u.tween = s;
  };
}
function vC(t, a) {
  var r = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = xa(this.node(), r).tween, s = 0, u = o.length, c; s < u; ++s)
      if ((c = o[s]).name === t)
        return c.value;
    return null;
  }
  return this.each((a == null ? gC : yC)(r, t, a));
}
function Qh(t, a, r) {
  var o = t._id;
  return t.each(function() {
    var s = La(this, o);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return xa(s, o).value[a];
  };
}
function N1(t, a) {
  var r;
  return (typeof a == "number" ? Da : a instanceof br ? Yu : (r = br(a)) ? (a = r, Yu) : v1)(t, a);
}
function bC(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function xC(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function SC(t, a, r) {
  var o, s = r + "", u;
  return function() {
    var c = this.getAttribute(t);
    return c === s ? null : c === o ? u : u = a(o = c, r);
  };
}
function wC(t, a, r) {
  var o, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(t.space, t.local);
    return c === s ? null : c === o ? u : u = a(o = c, r);
  };
}
function EC(t, a, r) {
  var o, s, u;
  return function() {
    var c, h = r(this), p;
    return h == null ? void this.removeAttribute(t) : (c = this.getAttribute(t), p = h + "", c === p ? null : c === o && p === s ? u : (s = p, u = a(o = c, h)));
  };
}
function _C(t, a, r) {
  var o, s, u;
  return function() {
    var c, h = r(this), p;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (c = this.getAttributeNS(t.space, t.local), p = h + "", c === p ? null : c === o && p === s ? u : (s = p, u = a(o = c, h)));
  };
}
function NC(t, a) {
  var r = ac(t), o = r === "transform" ? iC : N1;
  return this.attrTween(t, typeof a == "function" ? (r.local ? _C : EC)(r, o, Qh(this, "attr." + t, a)) : a == null ? (r.local ? xC : bC)(r) : (r.local ? wC : SC)(r, o, a));
}
function RC(t, a) {
  return function(r) {
    this.setAttribute(t, a.call(this, r));
  };
}
function CC(t, a) {
  return function(r) {
    this.setAttributeNS(t.space, t.local, a.call(this, r));
  };
}
function TC(t, a) {
  var r, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (r = (o = u) && CC(t, u)), r;
  }
  return s._value = a, s;
}
function MC(t, a) {
  var r, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (r = (o = u) && RC(t, u)), r;
  }
  return s._value = a, s;
}
function DC(t, a) {
  var r = "attr." + t;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var o = ac(t);
  return this.tween(r, (o.local ? TC : MC)(o, a));
}
function AC(t, a) {
  return function() {
    Zh(this, t).delay = +a.apply(this, arguments);
  };
}
function zC(t, a) {
  return a = +a, function() {
    Zh(this, t).delay = a;
  };
}
function OC(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? AC : zC)(a, t)) : xa(this.node(), a).delay;
}
function jC(t, a) {
  return function() {
    La(this, t).duration = +a.apply(this, arguments);
  };
}
function LC(t, a) {
  return a = +a, function() {
    La(this, t).duration = a;
  };
}
function HC(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? jC : LC)(a, t)) : xa(this.node(), a).duration;
}
function BC(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    La(this, t).ease = a;
  };
}
function UC(t) {
  var a = this._id;
  return arguments.length ? this.each(BC(a, t)) : xa(this.node(), a).ease;
}
function kC(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    La(this, t).ease = r;
  };
}
function VC(t) {
  if (typeof t != "function") throw new Error();
  return this.each(kC(this._id, t));
}
function YC(t) {
  typeof t != "function" && (t = n1(t));
  for (var a = this._groups, r = a.length, o = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = o[s] = [], p, g = 0; g < c; ++g)
      (p = u[g]) && t.call(p, p.__data__, g, u) && h.push(p);
  return new ri(o, this._parents, this._name, this._id);
}
function qC(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, r = t._groups, o = a.length, s = r.length, u = Math.min(o, s), c = new Array(o), h = 0; h < u; ++h)
    for (var p = a[h], g = r[h], y = p.length, m = c[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || g[x]) && (m[x] = v);
  for (; h < o; ++h)
    c[h] = a[h];
  return new ri(c, this._parents, this._name, this._id);
}
function $C(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function XC(t, a, r) {
  var o, s, u = $C(a) ? Zh : La;
  return function() {
    var c = u(this, t), h = c.on;
    h !== o && (s = (o = h).copy()).on(a, r), c.on = s;
  };
}
function GC(t, a) {
  var r = this._id;
  return arguments.length < 2 ? xa(this.node(), r).on.on(t) : this.each(XC(r, t, a));
}
function IC(t) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== t) return;
    a && a.removeChild(this);
  };
}
function ZC() {
  return this.on("end.remove", IC(this._id));
}
function QC(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = qh(t));
  for (var o = this._groups, s = o.length, u = new Array(s), c = 0; c < s; ++c)
    for (var h = o[c], p = h.length, g = u[c] = new Array(p), y, m, v = 0; v < p; ++v)
      (y = h[v]) && (m = t.call(y, y.__data__, v, h)) && ("__data__" in y && (m.__data__ = y.__data__), g[v] = m, rc(g[v], a, r, v, g, xa(y, r)));
  return new ri(u, this._parents, a, r);
}
function FC(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = t1(t));
  for (var o = this._groups, s = o.length, u = [], c = [], h = 0; h < s; ++h)
    for (var p = o[h], g = p.length, y, m = 0; m < g; ++m)
      if (y = p[m]) {
        for (var v = t.call(y, y.__data__, m, p), x, S = xa(y, r), T = 0, N = v.length; T < N; ++T)
          (x = v[T]) && rc(x, a, r, T, v, S);
        u.push(v), c.push(y);
      }
  return new ri(u, c, a, r);
}
var KC = Io.prototype.constructor;
function PC() {
  return new KC(this._groups, this._parents);
}
function JC(t, a) {
  var r, o, s;
  return function() {
    var u = pl(this, t), c = (this.style.removeProperty(t), pl(this, t));
    return u === c ? null : u === r && c === o ? s : s = a(r = u, o = c);
  };
}
function R1(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function WC(t, a, r) {
  var o, s = r + "", u;
  return function() {
    var c = pl(this, t);
    return c === s ? null : c === o ? u : u = a(o = c, r);
  };
}
function eT(t, a, r) {
  var o, s, u;
  return function() {
    var c = pl(this, t), h = r(this), p = h + "";
    return h == null && (p = h = (this.style.removeProperty(t), pl(this, t))), c === p ? null : c === o && p === s ? u : (s = p, u = a(o = c, h));
  };
}
function tT(t, a) {
  var r, o, s, u = "style." + a, c = "end." + u, h;
  return function() {
    var p = La(this, t), g = p.on, y = p.value[u] == null ? h || (h = R1(a)) : void 0;
    (g !== r || s !== y) && (o = (r = g).copy()).on(c, s = y), p.on = o;
  };
}
function nT(t, a, r) {
  var o = (t += "") == "transform" ? aC : N1;
  return a == null ? this.styleTween(t, JC(t, o)).on("end.style." + t, R1(t)) : typeof a == "function" ? this.styleTween(t, eT(t, o, Qh(this, "style." + t, a))).each(tT(this._id, t)) : this.styleTween(t, WC(t, o, a), r).on("end.style." + t, null);
}
function aT(t, a, r) {
  return function(o) {
    this.style.setProperty(t, a.call(this, o), r);
  };
}
function iT(t, a, r) {
  var o, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (o = (s = c) && aT(t, c, r)), o;
  }
  return u._value = a, u;
}
function rT(t, a, r) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (a == null) return this.tween(o, null);
  if (typeof a != "function") throw new Error();
  return this.tween(o, iT(t, a, r ?? ""));
}
function lT(t) {
  return function() {
    this.textContent = t;
  };
}
function oT(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function sT(t) {
  return this.tween("text", typeof t == "function" ? oT(Qh(this, "text", t)) : lT(t == null ? "" : t + ""));
}
function uT(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function cT(t) {
  var a, r;
  function o() {
    var s = t.apply(this, arguments);
    return s !== r && (a = (r = s) && uT(s)), a;
  }
  return o._value = t, o;
}
function fT(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, cT(t));
}
function dT() {
  for (var t = this._name, a = this._id, r = C1(), o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var c = o[u], h = c.length, p, g = 0; g < h; ++g)
      if (p = c[g]) {
        var y = xa(p, a);
        rc(p, t, r, g, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new ri(o, this._parents, t, r);
}
function hT() {
  var t, a, r = this, o = r._id, s = r.size();
  return new Promise(function(u, c) {
    var h = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var g = La(this, o), y = g.on;
      y !== t && (a = (t = y).copy(), a._.cancel.push(h), a._.interrupt.push(h), a._.end.push(p)), g.on = a;
    }), s === 0 && u();
  });
}
var mT = 0;
function ri(t, a, r, o) {
  this._groups = t, this._parents = a, this._name = r, this._id = o;
}
function C1() {
  return ++mT;
}
var ei = Io.prototype;
ri.prototype = {
  constructor: ri,
  select: QC,
  selectAll: FC,
  selectChild: ei.selectChild,
  selectChildren: ei.selectChildren,
  filter: YC,
  merge: qC,
  selection: PC,
  transition: dT,
  call: ei.call,
  nodes: ei.nodes,
  node: ei.node,
  size: ei.size,
  empty: ei.empty,
  each: ei.each,
  on: GC,
  attr: NC,
  attrTween: DC,
  style: nT,
  styleTween: rT,
  text: sT,
  textTween: fT,
  remove: ZC,
  tween: vC,
  delay: OC,
  duration: HC,
  ease: UC,
  easeVarying: VC,
  end: hT,
  [Symbol.iterator]: ei[Symbol.iterator]
};
function pT(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var gT = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: pT
};
function yT(t, a) {
  for (var r; !(r = t.__transition) || !(r = r[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function vT(t) {
  var a, r;
  t instanceof ri ? (a = t._id, t = t._name) : (a = C1(), (r = gT).time = Ih(), t = t == null ? null : t + "");
  for (var o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var c = o[u], h = c.length, p, g = 0; g < h; ++g)
      (p = c[g]) && rc(p, t, a, g, c, r || yT(p, a));
  return new ri(o, this._parents, t, a);
}
Io.prototype.interrupt = pC;
Io.prototype.transition = vT;
const mu = (t) => () => t;
function bT(t, {
  sourceEvent: a,
  target: r,
  transform: o,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function ai(t, a, r) {
  this.k = t, this.x = a, this.y = r;
}
ai.prototype = {
  constructor: ai,
  scale: function(t) {
    return t === 1 ? this : new ai(this.k * t, this.x, this.y);
  },
  translate: function(t, a) {
    return t === 0 & a === 0 ? this : new ai(this.k, this.x + this.k * t, this.y + this.k * a);
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
var lc = new ai(1, 0, 0);
T1.prototype = ai.prototype;
function T1(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return lc;
  return t.__zoom;
}
function Od(t) {
  t.stopImmediatePropagation();
}
function So(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function xT(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function ST() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Zy() {
  return this.__zoom || lc;
}
function wT(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function ET() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _T(t, a, r) {
  var o = t.invertX(a[0][0]) - r[0][0], s = t.invertX(a[1][0]) - r[1][0], u = t.invertY(a[0][1]) - r[0][1], c = t.invertY(a[1][1]) - r[1][1];
  return t.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function M1() {
  var t = xT, a = ST, r = _T, o = wT, s = ET, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, p = zu, g = nc("start", "zoom", "end"), y, m, v, x = 500, S = 150, T = 0, N = 10;
  function R(O) {
    O.property("__zoom", Zy).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", I).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", W).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(O, $, _, L) {
    var Z = O.selection ? O.selection() : O;
    Z.property("__zoom", Zy), O !== Z ? U(O, $, _, L) : Z.interrupt().each(function() {
      H(this, arguments).event(L).start().zoom(null, typeof $ == "function" ? $.apply(this, arguments) : $).end();
    });
  }, R.scaleBy = function(O, $, _, L) {
    R.scaleTo(O, function() {
      var Z = this.__zoom.k, G = typeof $ == "function" ? $.apply(this, arguments) : $;
      return Z * G;
    }, _, L);
  }, R.scaleTo = function(O, $, _, L) {
    R.transform(O, function() {
      var Z = a.apply(this, arguments), G = this.__zoom, ne = _ == null ? j(Z) : typeof _ == "function" ? _.apply(this, arguments) : _, A = G.invert(ne), k = typeof $ == "function" ? $.apply(this, arguments) : $;
      return r(E(z(G, k), ne, A), Z, c);
    }, _, L);
  }, R.translateBy = function(O, $, _, L) {
    R.transform(O, function() {
      return r(this.__zoom.translate(
        typeof $ == "function" ? $.apply(this, arguments) : $,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), a.apply(this, arguments), c);
    }, null, L);
  }, R.translateTo = function(O, $, _, L, Z) {
    R.transform(O, function() {
      var G = a.apply(this, arguments), ne = this.__zoom, A = L == null ? j(G) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(lc.translate(A[0], A[1]).scale(ne.k).translate(
        typeof $ == "function" ? -$.apply(this, arguments) : -$,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), G, c);
    }, L, Z);
  };
  function z(O, $) {
    return $ = Math.max(u[0], Math.min(u[1], $)), $ === O.k ? O : new ai($, O.x, O.y);
  }
  function E(O, $, _) {
    var L = $[0] - _[0] * O.k, Z = $[1] - _[1] * O.k;
    return L === O.x && Z === O.y ? O : new ai(O.k, L, Z);
  }
  function j(O) {
    return [(+O[0][0] + +O[1][0]) / 2, (+O[0][1] + +O[1][1]) / 2];
  }
  function U(O, $, _, L) {
    O.on("start.zoom", function() {
      H(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      H(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var Z = this, G = arguments, ne = H(Z, G).event(L), A = a.apply(Z, G), k = _ == null ? j(A) : typeof _ == "function" ? _.apply(Z, G) : _, F = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), te = Z.__zoom, se = typeof $ == "function" ? $.apply(Z, G) : $, he = p(te.invert(k).concat(F / te.k), se.invert(k).concat(F / se.k));
      return function(me) {
        if (me === 1) me = se;
        else {
          var ee = he(me), ge = F / ee[2];
          me = new ai(ge, k[0] - ee[0] * ge, k[1] - ee[1] * ge);
        }
        ne.zoom(null, me);
      };
    });
  }
  function H(O, $, _) {
    return !_ && O.__zooming || new V(O, $);
  }
  function V(O, $) {
    this.that = O, this.args = $, this.active = 0, this.sourceEvent = null, this.extent = a.apply(O, $), this.taps = 0;
  }
  V.prototype = {
    event: function(O) {
      return O && (this.sourceEvent = O), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(O, $) {
      return this.mouse && O !== "mouse" && (this.mouse[1] = $.invert(this.mouse[0])), this.touch0 && O !== "touch" && (this.touch0[1] = $.invert(this.touch0[0])), this.touch1 && O !== "touch" && (this.touch1[1] = $.invert(this.touch1[0])), this.that.__zoom = $, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(O) {
      var $ = Vn(this.that).datum();
      g.call(
        O,
        this.that,
        new bT(O, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: g
        }),
        $
      );
    }
  };
  function D(O, ...$) {
    if (!t.apply(this, arguments)) return;
    var _ = H(this, $).event(O), L = this.__zoom, Z = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, o.apply(this, arguments)))), G = ha(O);
    if (_.wheel)
      (_.mouse[0][0] !== G[0] || _.mouse[0][1] !== G[1]) && (_.mouse[1] = L.invert(_.mouse[0] = G)), clearTimeout(_.wheel);
    else {
      if (L.k === Z) return;
      _.mouse = [G, L.invert(G)], Lu(this), _.start();
    }
    So(O), _.wheel = setTimeout(ne, S), _.zoom("mouse", r(E(z(L, Z), _.mouse[0], _.mouse[1]), _.extent, c));
    function ne() {
      _.wheel = null, _.end();
    }
  }
  function q(O, ...$) {
    if (v || !t.apply(this, arguments)) return;
    var _ = O.currentTarget, L = H(this, $, !0).event(O), Z = Vn(O.view).on("mousemove.zoom", k, !0).on("mouseup.zoom", F, !0), G = ha(O, _), ne = O.clientX, A = O.clientY;
    d1(O.view), Od(O), L.mouse = [G, this.__zoom.invert(G)], Lu(this), L.start();
    function k(te) {
      if (So(te), !L.moved) {
        var se = te.clientX - ne, he = te.clientY - A;
        L.moved = se * se + he * he > T;
      }
      L.event(te).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ha(te, _), L.mouse[1]), L.extent, c));
    }
    function F(te) {
      Z.on("mousemove.zoom mouseup.zoom", null), h1(te.view, L.moved), So(te), L.event(te).end();
    }
  }
  function le(O, ...$) {
    if (t.apply(this, arguments)) {
      var _ = this.__zoom, L = ha(O.changedTouches ? O.changedTouches[0] : O, this), Z = _.invert(L), G = _.k * (O.shiftKey ? 0.5 : 2), ne = r(E(z(_, G), L, Z), a.apply(this, $), c);
      So(O), h > 0 ? Vn(this).transition().duration(h).call(U, ne, L, O) : Vn(this).call(R.transform, ne, L, O);
    }
  }
  function I(O, ...$) {
    if (t.apply(this, arguments)) {
      var _ = O.touches, L = _.length, Z = H(this, $, O.changedTouches.length === L).event(O), G, ne, A, k;
      for (Od(O), ne = 0; ne < L; ++ne)
        A = _[ne], k = ha(A, this), k = [k, this.__zoom.invert(k), A.identifier], Z.touch0 ? !Z.touch1 && Z.touch0[2] !== k[2] && (Z.touch1 = k, Z.taps = 0) : (Z.touch0 = k, G = !0, Z.taps = 1 + !!y);
      y && (y = clearTimeout(y)), G && (Z.taps < 2 && (m = k[0], y = setTimeout(function() {
        y = null;
      }, x)), Lu(this), Z.start());
    }
  }
  function K(O, ...$) {
    if (this.__zooming) {
      var _ = H(this, $).event(O), L = O.changedTouches, Z = L.length, G, ne, A, k;
      for (So(O), G = 0; G < Z; ++G)
        ne = L[G], A = ha(ne, this), _.touch0 && _.touch0[2] === ne.identifier ? _.touch0[0] = A : _.touch1 && _.touch1[2] === ne.identifier && (_.touch1[0] = A);
      if (ne = _.that.__zoom, _.touch1) {
        var F = _.touch0[0], te = _.touch0[1], se = _.touch1[0], he = _.touch1[1], me = (me = se[0] - F[0]) * me + (me = se[1] - F[1]) * me, ee = (ee = he[0] - te[0]) * ee + (ee = he[1] - te[1]) * ee;
        ne = z(ne, Math.sqrt(me / ee)), A = [(F[0] + se[0]) / 2, (F[1] + se[1]) / 2], k = [(te[0] + he[0]) / 2, (te[1] + he[1]) / 2];
      } else if (_.touch0) A = _.touch0[0], k = _.touch0[1];
      else return;
      _.zoom("touch", r(E(ne, A, k), _.extent, c));
    }
  }
  function W(O, ...$) {
    if (this.__zooming) {
      var _ = H(this, $).event(O), L = O.changedTouches, Z = L.length, G, ne;
      for (Od(O), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), G = 0; G < Z; ++G)
        ne = L[G], _.touch0 && _.touch0[2] === ne.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === ne.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (ne = ha(ne, this), Math.hypot(m[0] - ne[0], m[1] - ne[1]) < N)) {
        var A = Vn(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return R.wheelDelta = function(O) {
    return arguments.length ? (o = typeof O == "function" ? O : mu(+O), R) : o;
  }, R.filter = function(O) {
    return arguments.length ? (t = typeof O == "function" ? O : mu(!!O), R) : t;
  }, R.touchable = function(O) {
    return arguments.length ? (s = typeof O == "function" ? O : mu(!!O), R) : s;
  }, R.extent = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : mu([[+O[0][0], +O[0][1]], [+O[1][0], +O[1][1]]]), R) : a;
  }, R.scaleExtent = function(O) {
    return arguments.length ? (u[0] = +O[0], u[1] = +O[1], R) : [u[0], u[1]];
  }, R.translateExtent = function(O) {
    return arguments.length ? (c[0][0] = +O[0][0], c[1][0] = +O[1][0], c[0][1] = +O[0][1], c[1][1] = +O[1][1], R) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, R.constrain = function(O) {
    return arguments.length ? (r = O, R) : r;
  }, R.duration = function(O) {
    return arguments.length ? (h = +O, R) : h;
  }, R.interpolate = function(O) {
    return arguments.length ? (p = O, R) : p;
  }, R.on = function() {
    var O = g.on.apply(g, arguments);
    return O === g ? R : O;
  }, R.clickDistance = function(O) {
    return arguments.length ? (T = (O = +O) * O, R) : Math.sqrt(T);
  }, R.tapDistance = function(O) {
    return arguments.length ? (N = +O, R) : N;
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
  error008: (t, { id: a, sourceHandle: r, targetHandle: o }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? r : o}", edge id: ${a}.`,
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
], D1 = ["Enter", " ", "Escape"], A1 = {
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
var yl;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(yl || (yl = {}));
var vr;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(vr || (vr = {}));
var Ho;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Ho || (Ho = {}));
const z1 = {
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
var Yi;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Yi || (Yi = {}));
var Gu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Gu || (Gu = {}));
var Ae;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(Ae || (Ae = {}));
const Qy = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function O1(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const j1 = (t) => "id" in t && "source" in t && "target" in t, NT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), Fh = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Qo = (t, a = [0, 0]) => {
  const { width: r, height: o } = oi(t), s = t.origin ?? a, u = r * s[0], c = o * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - c
  };
}, RT = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = t.reduce((o, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Fh(s) ? s : a.nodeLookup.get(s.id));
    const h = c ? Iu(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return oc(o, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return sc(r);
}, Fo = (t, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = oc(r, Iu(s)), o = !0);
  }), o ? sc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Kh = (t, a, [r, o, s] = [0, 0, 1], u = !1, c = !1) => {
  const h = {
    ..._l(a, [r, o, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const g of t.values()) {
    const { measured: y, selectable: m = !0, hidden: v = !1 } = g;
    if (c && !m || v)
      continue;
    const x = y.width ?? g.width ?? g.initialWidth ?? null, S = y.height ?? g.height ?? g.initialHeight ?? null, T = Bo(h, bl(g)), N = (x ?? 0) * (S ?? 0), R = u && T > 0;
    (!g.internals.handleBounds || R || T >= N || g.dragging) && p.push(g);
  }
  return p;
}, CT = (t, a) => {
  const r = /* @__PURE__ */ new Set();
  return t.forEach((o) => {
    r.add(o.id);
  }), a.filter((o) => r.has(o.source) || r.has(o.target));
};
function TT(t, a) {
  const r = /* @__PURE__ */ new Map(), o = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!o || o.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function MT({ nodes: t, width: a, height: r, panZoom: o, minZoom: s, maxZoom: u }, c) {
  if (t.size === 0)
    return !0;
  const h = TT(t, c), p = Fo(h), g = Jh(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await o.setViewport(g, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function L1({ nodeId: t, nextPosition: a, nodeLookup: r, nodeOrigin: o = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(t), h = c.parentId ? r.get(c.parentId) : void 0, { x: p, y: g } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? o;
  let m = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!h)
      u?.("005", ya.error005());
    else {
      const x = h.measured.width, S = h.measured.height;
      x && S && (m = [
        [p, g],
        [p + x, g + S]
      ]);
    }
  else h && wr(c.extent) && (m = [
    [c.extent[0][0] + p, c.extent[0][1] + g],
    [c.extent[1][0] + p, c.extent[1][1] + g]
  ]);
  const v = wr(m) ? Sr(a, m, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", ya.error015()), {
    position: {
      x: v.x - p + (c.measured.width ?? 0) * y[0],
      y: v.y - g + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function DT({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: r, edges: o, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && c.find((T) => T.id === v.parentId);
    (x || S) && c.push(v);
  }
  const h = new Set(a.map((v) => v.id)), p = o.filter((v) => v.deletable !== !1), y = CT(c, p);
  for (const v of p)
    h.has(v.id) && !y.find((S) => S.id === v.id) && y.push(v);
  if (!s)
    return {
      edges: y,
      nodes: c
    };
  const m = await s({
    nodes: c,
    edges: y
  });
  return typeof m == "boolean" ? m ? { edges: y, nodes: c } : { edges: [], nodes: [] } : m;
}
const vl = (t, a = 0, r = 1) => Math.min(Math.max(t, a), r), Sr = (t = { x: 0, y: 0 }, a, r) => ({
  x: vl(t.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: vl(t.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function H1(t, a, r) {
  const { width: o, height: s } = oi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return Sr(t, [
    [u, c],
    [u + o, c + s]
  ], a);
}
const Fy = (t, a, r) => t < a ? vl(Math.abs(t - a), 1, a) / a : t > r ? -vl(Math.abs(t - r), 1, a) / a : 0, Ph = (t, a, r = 15, o = 40) => {
  const s = Fy(t.x, o, a.width - o) * r, u = Fy(t.y, o, a.height - o) * r;
  return [s, u];
}, oc = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), sh = ({ x: t, y: a, width: r, height: o }) => ({
  x: t,
  y: a,
  x2: t + r,
  y2: a + o
}), sc = ({ x: t, y: a, x2: r, y2: o }) => ({
  x: t,
  y: a,
  width: r - t,
  height: o - a
}), bl = (t, a = [0, 0]) => {
  const { x: r, y: o } = Fh(t) ? t.internals.positionAbsolute : Qo(t, a);
  return {
    x: r,
    y: o,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Iu = (t, a = [0, 0]) => {
  const { x: r, y: o } = Fh(t) ? t.internals.positionAbsolute : Qo(t, a);
  return {
    x: r,
    y: o,
    x2: r + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: o + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, B1 = (t, a) => sc(oc(sh(t), sh(a))), Bo = (t, a) => {
  const r = Math.max(0, Math.min(t.x + t.width, a.x + a.width) - Math.max(t.x, a.x)), o = Math.max(0, Math.min(t.y + t.height, a.y + a.height) - Math.max(t.y, a.y));
  return Math.ceil(r * o);
}, Ky = (t) => pa(t.width) && pa(t.height) && pa(t.x) && pa(t.y), pa = (t) => !isNaN(t) && isFinite(t), U1 = (t, a) => (r, o) => {
}, Ko = (t, a = [1, 1]) => ({
  x: a[0] * Math.round(t.x / a[0]),
  y: a[1] * Math.round(t.y / a[1])
}), _l = ({ x: t, y: a }, [r, o, s], u = !1, c = [1, 1]) => {
  const h = {
    x: (t - r) / s,
    y: (a - o) / s
  };
  return u ? Ko(h, c) : h;
}, xl = ({ x: t, y: a }, [r, o, s]) => ({
  x: t * s + r,
  y: a * s + o
});
function il(t, a) {
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
function AT(t, a, r) {
  if (typeof t == "string" || typeof t == "number") {
    const o = il(t, r), s = il(t, a);
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
    const o = il(t.top ?? t.y ?? 0, r), s = il(t.bottom ?? t.y ?? 0, r), u = il(t.left ?? t.x ?? 0, a), c = il(t.right ?? t.x ?? 0, a);
    return { top: o, right: c, bottom: s, left: u, x: u + c, y: o + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function zT(t, a, r, o, s, u) {
  const { x: c, y: h } = xl(t, [a, r, o]), { x: p, y: g } = xl({ x: t.x + t.width, y: t.y + t.height }, [a, r, o]), y = s - p, m = u - g;
  return {
    left: Math.floor(c),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const Jh = (t, a, r, o, s, u) => {
  const c = AT(u, a, r), h = (a - c.x) / t.width, p = (r - c.y) / t.height, g = Math.min(h, p), y = vl(g, o, s), m = t.x + t.width / 2, v = t.y + t.height / 2, x = a / 2 - m * y, S = r / 2 - v * y, T = zT(t, x, S, y, a, r), N = {
    left: Math.min(T.left - c.left, 0),
    top: Math.min(T.top - c.top, 0),
    right: Math.min(T.right - c.right, 0),
    bottom: Math.min(T.bottom - c.bottom, 0)
  };
  return {
    x: x - N.left + N.right,
    y: S - N.top + N.bottom,
    zoom: y
  };
}, Uo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function wr(t) {
  return t != null && t !== "parent";
}
function oi(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function k1(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function V1(t, a = { width: 0, height: 0 }, r, o, s) {
  const u = { ...t }, c = o.get(r);
  if (c) {
    const h = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function Py(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const r of t)
    if (!a.has(r))
      return !1;
  return !0;
}
function OT() {
  let t, a;
  return { promise: new Promise((o, s) => {
    t = o, a = s;
  }), resolve: t, reject: a };
}
function jT(t) {
  return { ...A1, ...t || {} };
}
function To(t, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: o, containerBounds: s }) {
  const { x: u, y: c } = ga(t), h = _l({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, o), { x: p, y: g } = r ? Ko(h, a) : h;
  return {
    xSnapped: p,
    ySnapped: g,
    ...h
  };
}
const Wh = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), Y1 = (t) => t?.getRootNode?.() || window?.document, LT = ["INPUT", "SELECT", "TEXTAREA"];
function q1(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : LT.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const $1 = (t) => "clientX" in t, ga = (t, a) => {
  const r = $1(t), o = r ? t.clientX : t.touches?.[0].clientX, s = r ? t.clientY : t.touches?.[0].clientY;
  return {
    x: o - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Jy = (t, a, r, o, s) => {
  const u = a.querySelectorAll(`.${t}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const h = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: t,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (h.left - r.left) / o,
      y: (h.top - r.top) / o,
      ...Wh(c)
    };
  });
};
function X1({ sourceX: t, sourceY: a, targetX: r, targetY: o, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: h }) {
  const p = t * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, g = a * 0.125 + u * 0.375 + h * 0.375 + o * 0.125, y = Math.abs(p - t), m = Math.abs(g - a);
  return [p, g, y, m];
}
function pu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function Wy({ pos: t, x1: a, y1: r, x2: o, y2: s, c: u }) {
  switch (t) {
    case Ae.Left:
      return [a - pu(a - o, u), r];
    case Ae.Right:
      return [a + pu(o - a, u), r];
    case Ae.Top:
      return [a, r - pu(r - s, u)];
    case Ae.Bottom:
      return [a, r + pu(s - r, u)];
  }
}
function G1({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: o, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [h, p] = Wy({
    pos: r,
    x1: t,
    y1: a,
    x2: o,
    y2: s,
    c
  }), [g, y] = Wy({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a,
    c
  }), [m, v, x, S] = X1({
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
function I1({ sourceX: t, sourceY: a, targetX: r, targetY: o }) {
  const s = Math.abs(r - t) / 2, u = r < t ? r + s : r - s, c = Math.abs(o - a) / 2, h = o < a ? o + c : o - c;
  return [u, h, s, c];
}
function HT({ sourceNode: t, targetNode: a, selected: r = !1, zIndex: o = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return o;
  const c = s && r ? o + 1e3 : o, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + h;
}
function BT({ sourceNode: t, targetNode: a, width: r, height: o, transform: s }) {
  const u = oc(Iu(t), Iu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: o / s[2]
  };
  return Bo(c, sc(u)) > 0;
}
const UT = ({ source: t, sourceHandle: a, target: r, targetHandle: o }) => `xy-edge__${t}${a || ""}-${r}${o || ""}`, kT = (t, a) => a.some((r) => r.source === t.source && r.target === t.target && (r.sourceHandle === t.sourceHandle || !r.sourceHandle && !t.sourceHandle) && (r.targetHandle === t.targetHandle || !r.targetHandle && !t.targetHandle)), VT = (t, a, r = {}) => {
  if (!t.source || !t.target)
    return r.onError?.("006", ya.error006()), a;
  const o = r.getEdgeId || UT;
  let s;
  return j1(t) ? s = { ...t } : s = {
    ...t,
    id: o(t)
  }, kT(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function Z1({ sourceX: t, sourceY: a, targetX: r, targetY: o }) {
  const [s, u, c, h] = I1({
    sourceX: t,
    sourceY: a,
    targetX: r,
    targetY: o
  });
  return [`M ${t},${a}L ${r},${o}`, s, u, c, h];
}
const ev = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, YT = ({ source: t, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? t.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, tv = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function qT({ source: t, sourcePosition: a = Ae.Bottom, target: r, targetPosition: o = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const h = ev[a], p = ev[o], g = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: r.x + p.x * u, y: r.y + p.y * u }, m = YT({
    source: g,
    sourcePosition: a,
    target: y
  }), v = m.x !== 0 ? "x" : "y", x = m[v];
  let S = [], T, N;
  const R = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, j] = I1({
    sourceX: t.x,
    sourceY: t.y,
    targetX: r.x,
    targetY: r.y
  });
  if (h[v] * p[v] === -1) {
    v === "x" ? (T = s.x ?? g.x + (y.x - g.x) * c, N = s.y ?? (g.y + y.y) / 2) : (T = s.x ?? (g.x + y.x) / 2, N = s.y ?? g.y + (y.y - g.y) * c);
    const D = [
      { x: T, y: g.y },
      { x: T, y: y.y }
    ], q = [
      { x: g.x, y: N },
      { x: y.x, y: N }
    ];
    h[v] === x ? S = v === "x" ? D : q : S = v === "x" ? q : D;
  } else {
    const D = [{ x: g.x, y: y.y }], q = [{ x: y.x, y: g.y }];
    if (v === "x" ? S = h.x === x ? q : D : S = h.y === x ? D : q, a === o) {
      const O = Math.abs(t[v] - r[v]);
      if (O <= u) {
        const $ = Math.min(u - 1, u - O);
        h[v] === x ? R[v] = (g[v] > t[v] ? -1 : 1) * $ : z[v] = (y[v] > r[v] ? -1 : 1) * $;
      }
    }
    if (a !== o) {
      const O = v === "x" ? "y" : "x", $ = h[v] === p[O], _ = g[O] > y[O], L = g[O] < y[O];
      (h[v] === 1 && (!$ && _ || $ && L) || h[v] !== 1 && (!$ && L || $ && _)) && (S = v === "x" ? D : q);
    }
    const le = { x: g.x + R.x, y: g.y + R.y }, I = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(le.x - S[0].x), Math.abs(I.x - S[0].x)), W = Math.max(Math.abs(le.y - S[0].y), Math.abs(I.y - S[0].y));
    K >= W ? (T = (le.x + I.x) / 2, N = S[0].y) : (T = S[0].x, N = (le.y + I.y) / 2);
  }
  const U = { x: g.x + R.x, y: g.y + R.y }, H = { x: y.x + z.x, y: y.y + z.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...U.x !== S[0].x || U.y !== S[0].y ? [U] : [],
    ...S,
    ...H.x !== S[S.length - 1].x || H.y !== S[S.length - 1].y ? [H] : [],
    r
  ], T, N, E, j];
}
function $T(t, a, r, o) {
  const s = Math.min(tv(t, a) / 2, tv(a, r) / 2, o), { x: u, y: c } = a;
  if (t.x === u && u === r.x || t.y === c && c === r.y)
    return `L${u} ${c}`;
  if (t.y === c) {
    const g = t.x < r.x ? -1 : 1, y = t.y < r.y ? 1 : -1;
    return `L ${u + s * g},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const h = t.x < r.x ? 1 : -1, p = t.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * h},${c}`;
}
function uh({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: o, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: h, centerY: p, offset: g = 20, stepPosition: y = 0.5 }) {
  const [m, v, x, S, T] = qT({
    source: { x: t, y: a },
    sourcePosition: r,
    target: { x: o, y: s },
    targetPosition: u,
    center: { x: h, y: p },
    offset: g,
    stepPosition: y
  });
  let N = `M${m[0].x} ${m[0].y}`;
  for (let R = 1; R < m.length - 1; R++)
    N += $T(m[R - 1], m[R], m[R + 1], c);
  return N += `L${m[m.length - 1].x} ${m[m.length - 1].y}`, [N, v, x, S, T];
}
function nv(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function XT(t) {
  const { sourceNode: a, targetNode: r } = t;
  if (!nv(a) || !nv(r))
    return null;
  const o = a.internals.handleBounds || av(a.handles), s = r.internals.handleBounds || av(r.handles), u = iv(o?.source ?? [], t.sourceHandle), c = iv(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === yl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !c)
    return t.onError?.("008", ya.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const h = u?.position || Ae.Bottom, p = c?.position || Ae.Top, g = Er(a, u, h), y = Er(r, c, p);
  return {
    sourceX: g.x,
    sourceY: g.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: p
  };
}
function av(t) {
  if (!t)
    return null;
  const a = [], r = [];
  for (const o of t)
    o.width = o.width ?? 1, o.height = o.height ?? 1, o.type === "source" ? a.push(o) : o.type === "target" && r.push(o);
  return {
    source: a,
    target: r
  };
}
function Er(t, a, r = Ae.Left, o = !1) {
  const s = (a?.x ?? 0) + t.internals.positionAbsolute.x, u = (a?.y ?? 0) + t.internals.positionAbsolute.y, { width: c, height: h } = a ?? oi(t);
  if (o)
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
function iv(t, a) {
  return t && (a ? t.find((r) => r.id === a) : t[0]) || null;
}
function ch(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((o) => `${o}=${t[o]}`).join("&")}` : "";
}
function GT(t, { id: a, defaultColor: r, defaultMarkerStart: o, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((c, h) => ([h.markerStart || o, h.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const g = ch(p, a);
      u.has(g) || (c.push({ id: g, color: p.color || r, ...p }), u.add(g));
    }
  }), c), []).sort((c, h) => c.id.localeCompare(h.id));
}
const Q1 = 1e3, IT = 10, em = {
  nodeOrigin: [0, 0],
  nodeExtent: Lo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, ZT = {
  ...em,
  checkEquality: !0
};
function tm(t, a) {
  const r = { ...t };
  for (const o in a)
    a[o] !== void 0 && (r[o] = a[o]);
  return r;
}
function QT(t, a, r) {
  const o = tm(em, r);
  for (const s of t.values())
    if (s.parentId)
      am(s, t, a, o);
    else {
      const u = Qo(s, o.nodeOrigin), c = wr(s.extent) ? s.extent : o.nodeExtent, h = Sr(u, c, oi(s));
      s.internals.positionAbsolute = h;
    }
}
function FT(t, a) {
  if (!t.handles)
    return t.measured ? a?.internals.handleBounds : void 0;
  const r = [], o = [];
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
    s.type === "source" ? r.push(u) : s.type === "target" && o.push(u);
  }
  return {
    source: r,
    target: o
  };
}
function nm(t) {
  return t === "manual";
}
function fh(t, a, r, o = {}) {
  const s = tm(ZT, o), u = { i: 0 }, c = new Map(a), h = s?.elevateNodesOnSelect && !nm(s.zIndexMode) ? Q1 : 0;
  let p = t.length > 0, g = !1;
  a.clear(), r.clear();
  for (const y of t) {
    let m = c.get(y.id);
    if (s.checkEquality && y === m?.internals.userNode)
      a.set(y.id, m);
    else {
      const v = Qo(y, s.nodeOrigin), x = wr(y.extent) ? y.extent : s.nodeExtent, S = Sr(v, x, oi(y));
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
          handleBounds: FT(y, m),
          z: F1(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, m);
    }
    (m.measured === void 0 || m.measured.width === void 0 || m.measured.height === void 0) && !m.hidden && (p = !1), y.parentId && am(m, a, r, o, u), g ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: g };
}
function KT(t, a) {
  if (!t.parentId)
    return;
  const r = a.get(t.parentId);
  r ? r.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function am(t, a, r, o, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: h, zIndexMode: p } = tm(em, o), g = t.parentId, y = a.get(g);
  if (!y) {
    console.warn(`Parent node ${g} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  KT(t, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * IT), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = u && !nm(p) ? Q1 : 0, { x: v, y: x, z: S } = PT(t, y, c, h, m, p), { positionAbsolute: T } = t.internals, N = v !== T.x || x !== T.y;
  (N || S !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: N ? { x: v, y: x } : T,
      z: S
    }
  });
}
function F1(t, a, r) {
  const o = pa(t.zIndex) ? t.zIndex : 0;
  return nm(r) ? o : o + (t.selected ? a : 0);
}
function PT(t, a, r, o, s, u) {
  const { x: c, y: h } = a.internals.positionAbsolute, p = oi(t), g = Qo(t, r), y = wr(t.extent) ? Sr(g, t.extent, p) : g;
  let m = Sr({ x: c + y.x, y: h + y.y }, o, p);
  t.extent === "parent" && (m = H1(m, p, a));
  const v = F1(t, s, u), x = a.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: x >= v ? x + 1 : v
  };
}
function im(t, a, r, o = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of t) {
    const h = a.get(c.parentId);
    if (!h)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? bl(h), g = B1(p, c.rect);
    u.set(c.parentId, { expandedRect: g, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: h }, p) => {
    const g = h.internals.positionAbsolute, y = oi(h), m = h.origin ?? o, v = c.x < g.x ? Math.round(Math.abs(g.x - c.x)) : 0, x = c.y < g.y ? Math.round(Math.abs(g.y - c.y)) : 0, S = Math.max(y.width, Math.round(c.width)), T = Math.max(y.height, Math.round(c.height)), N = (S - y.width) * m[0], R = (T - y.height) * m[1];
    (v > 0 || x > 0 || N || R) && (s.push({
      id: p,
      type: "position",
      position: {
        x: h.position.x - v + N,
        y: h.position.y - x + R
      }
    }), r.get(p)?.forEach((z) => {
      t.some((E) => E.id === z.id) || s.push({
        id: z.id,
        type: "position",
        position: {
          x: z.position.x + v,
          y: z.position.y + x
        }
      });
    })), (y.width < c.width || y.height < c.height || v || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? m[0] * v - N : 0),
        height: T + (x ? m[1] * x - R : 0)
      }
    });
  }), s;
}
function JT(t, a, r, o, s, u, c) {
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
    const T = Wh(x.nodeElement), N = S.measured.width !== T.width || S.measured.height !== T.height;
    if (!!(T.width && T.height && (N || !S.internals.handleBounds || x.force))) {
      const z = x.nodeElement.getBoundingClientRect(), E = wr(S.extent) ? S.extent : u;
      let { positionAbsolute: j } = S.internals;
      S.parentId && S.extent === "parent" ? j = H1(j, T, a.get(S.parentId)) : E && (j = Sr(j, E, T));
      const U = {
        ...S,
        measured: T,
        internals: {
          ...S.internals,
          positionAbsolute: j,
          handleBounds: {
            source: Jy("source", x.nodeElement, z, m, S.id),
            target: Jy("target", x.nodeElement, z, m, S.id)
          }
        }
      };
      a.set(S.id, U), S.parentId && am(U, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, N && (g.push({
        id: S.id,
        type: "dimensions",
        dimensions: T
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: bl(U, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = im(v, a, r, s);
    g.push(...x);
  }
  return { changes: g, updatedInternals: p };
}
async function WT({ delta: t, panZoom: a, transform: r, translateExtent: o, width: s, height: u }) {
  if (!a || !t.x && !t.y)
    return !1;
  const c = await a.setViewportConstrained({
    x: r[0] + t.x,
    y: r[1] + t.y,
    zoom: r[2]
  }, [
    [0, 0],
    [s, u]
  ], o);
  return !!c && (c.x !== r[0] || c.y !== r[1] || c.k !== r[2]);
}
function rv(t, a, r, o, s, u) {
  let c = s;
  const h = o.get(c) || /* @__PURE__ */ new Map();
  o.set(c, h.set(r, a)), c = `${s}-${t}`;
  const p = o.get(c) || /* @__PURE__ */ new Map();
  if (o.set(c, p.set(r, a)), u) {
    c = `${s}-${t}-${u}`;
    const g = o.get(c) || /* @__PURE__ */ new Map();
    o.set(c, g.set(r, a));
  }
}
function K1(t, a, r) {
  t.clear(), a.clear();
  for (const o of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: h = null } = o, p = { edgeId: o.id, source: s, target: u, sourceHandle: c, targetHandle: h }, g = `${s}-${c}--${u}-${h}`, y = `${u}-${h}--${s}-${c}`;
    rv("source", p, y, t, s, c), rv("target", p, g, t, u, h), a.set(o.id, o);
  }
}
function P1(t, a) {
  if (!t.parentId)
    return !1;
  const r = a.get(t.parentId);
  return r ? r.selected ? !0 : P1(r, a) : !1;
}
function lv(t, a, r) {
  let o = t;
  do {
    if (o?.matches?.(a))
      return !0;
    if (o === r)
      return !1;
    o = o?.parentElement;
  } while (o);
  return !1;
}
function eM(t, a, r, o) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of t)
    if ((c.selected || c.id === o) && (!c.parentId || !P1(c, t)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function jd({ nodeId: t, dragItems: a, nodeLookup: r, dragging: o = !0 }) {
  const s = [];
  for (const [c, h] of a) {
    const p = r.get(c)?.internals.userNode;
    p && s.push({
      ...p,
      position: h.position,
      dragging: o
    });
  }
  if (!t)
    return [s[0], s];
  const u = r.get(t)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(t)?.position || u.position,
      dragging: o
    } : s[0],
    s
  ];
}
function tM({ dragItems: t, snapGrid: a, x: r, y: o }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: o - s.distance.y
  }, c = Ko(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function nM({ onNodeMouseDown: t, getStoreItems: a, onDragStart: r, onDrag: o, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, h = /* @__PURE__ */ new Map(), p = !1, g = { x: 0, y: 0 }, y = null, m = !1, v = null, x = !1, S = !1, T = null;
  function N({ noDragClassName: z, handleSelector: E, domNode: j, isSelectable: U, nodeId: H, nodeClickDistance: V = 0 }) {
    v = Vn(j);
    function D({ x: K, y: W }) {
      const { nodeLookup: O, nodeExtent: $, snapGrid: _, snapToGrid: L, nodeOrigin: Z, onNodeDrag: G, onSelectionDrag: ne, onError: A, updateNodePositions: k } = a();
      u = { x: K, y: W };
      let F = !1;
      const te = h.size > 1, se = te && $ ? sh(Fo(h)) : null, he = te && L ? tM({
        dragItems: h,
        snapGrid: _,
        x: K,
        y: W
      }) : null;
      for (const [me, ee] of h) {
        if (!O.has(me))
          continue;
        let ge = { x: K - ee.distance.x, y: W - ee.distance.y };
        L && (ge = he ? {
          x: Math.round(ge.x + he.x),
          y: Math.round(ge.y + he.y)
        } : Ko(ge, _));
        let ze = null;
        if (te && $ && !ee.extent && se) {
          const { positionAbsolute: xe } = ee.internals, Re = xe.x - se.x + $[0][0], qe = xe.x + ee.measured.width - se.x2 + $[1][0], ft = xe.y - se.y + $[0][1], Te = xe.y + ee.measured.height - se.y2 + $[1][1];
          ze = [
            [Re, ft],
            [qe, Te]
          ];
        }
        const { position: Ce, positionAbsolute: we } = L1({
          nodeId: me,
          nextPosition: ge,
          nodeLookup: O,
          nodeExtent: ze || $,
          nodeOrigin: Z,
          onError: A
        });
        F = F || ee.position.x !== Ce.x || ee.position.y !== Ce.y, ee.position = Ce, ee.internals.positionAbsolute = we;
      }
      if (S = S || F, !!F && (k(h, !0), T && (o || G || !H && ne))) {
        const [me, ee] = jd({
          nodeId: H,
          dragItems: h,
          nodeLookup: O
        });
        o?.(T, h, me, ee), G?.(T, me, ee), H || ne?.(T, ee);
      }
    }
    async function q() {
      if (!y)
        return;
      const { transform: K, panBy: W, autoPanSpeed: O, autoPanOnNodeDrag: $ } = a();
      if (!$) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [_, L] = Ph(g, y, O);
      (_ !== 0 || L !== 0) && (u.x = (u.x ?? 0) - _ / K[2], u.y = (u.y ?? 0) - L / K[2], await W({ x: _, y: L }) && D(u)), c = requestAnimationFrame(q);
    }
    function le(K) {
      const { nodeLookup: W, multiSelectionActive: O, nodesDraggable: $, transform: _, snapGrid: L, snapToGrid: Z, selectNodesOnDrag: G, onNodeDragStart: ne, onSelectionDragStart: A, unselectNodesAndEdges: k } = a();
      m = !0, (!G || !U) && !O && H && (W.get(H)?.selected || k()), U && G && H && t?.(H);
      const F = To(K.sourceEvent, { transform: _, snapGrid: L, snapToGrid: Z, containerBounds: y });
      if (u = F, h = eM(W, $, F, H), h.size > 0 && (r || ne || !H && A)) {
        const [te, se] = jd({
          nodeId: H,
          dragItems: h,
          nodeLookup: W
        });
        r?.(K.sourceEvent, h, te, se), ne?.(K.sourceEvent, te, se), H || A?.(K.sourceEvent, se);
      }
    }
    const I = m1().clickDistance(V).on("start", (K) => {
      const { domNode: W, nodeDragThreshold: O, transform: $, snapGrid: _, snapToGrid: L } = a();
      y = W?.getBoundingClientRect() || null, x = !1, S = !1, T = K.sourceEvent, O === 0 && le(K), u = To(K.sourceEvent, { transform: $, snapGrid: _, snapToGrid: L, containerBounds: y }), g = ga(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: W, transform: O, snapGrid: $, snapToGrid: _, nodeDragThreshold: L, nodeLookup: Z } = a(), G = To(K.sourceEvent, { transform: O, snapGrid: $, snapToGrid: _, containerBounds: y });
      if (T = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      H && !Z.has(H)) && (x = !0), !x) {
        if (!p && W && m && (p = !0, q()), !m) {
          const ne = ga(K.sourceEvent, y), A = ne.x - g.x, k = ne.y - g.y;
          Math.sqrt(A * A + k * k) > L && le(K);
        }
        (u.x !== G.xSnapped || u.y !== G.ySnapped) && h && m && (g = ga(K.sourceEvent, y), D(G));
      }
    }).on("end", (K) => {
      if (!m || x) {
        x && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (p = !1, m = !1, cancelAnimationFrame(c), h.size > 0) {
        const { nodeLookup: W, updateNodePositions: O, onNodeDragStop: $, onSelectionDragStop: _ } = a();
        if (S && (O(h, !1), S = !1), s || $ || !H && _) {
          const [L, Z] = jd({
            nodeId: H,
            dragItems: h,
            nodeLookup: W,
            dragging: !1
          });
          s?.(K.sourceEvent, h, L, Z), $?.(K.sourceEvent, L, Z), H || _?.(K.sourceEvent, Z);
        }
      }
    }).filter((K) => {
      const W = K.target;
      return !K.button && (!z || !lv(W, `.${z}`, j)) && (!E || lv(W, E, j));
    });
    v.call(I);
  }
  function R() {
    v?.on(".drag", null);
  }
  return {
    update: N,
    destroy: R
  };
}
function aM(t, a, r) {
  const o = [], s = {
    x: t.x - r,
    y: t.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Bo(s, bl(u)) > 0 && o.push(u);
  return o;
}
const iM = 250;
function rM(t, a, r, o) {
  let s = [], u = 1 / 0;
  const c = aM(t, r, a + iM);
  for (const h of c) {
    const p = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const g of p) {
      if (o.nodeId === g.nodeId && o.type === g.type && o.id === g.id)
        continue;
      const { x: y, y: m } = Er(h, g, g.position, !0), v = Math.sqrt(Math.pow(y - t.x, 2) + Math.pow(m - t.y, 2));
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
function J1(t, a, r, o, s, u = !1) {
  const c = o.get(t);
  if (!c)
    return null;
  const h = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? h?.find((g) => g.id === r) : h?.[0]) ?? null;
  return p && u ? { ...p, ...Er(c, p, p.position, !0) } : p;
}
function W1(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function lM(t, a) {
  let r = null;
  return a ? r = !0 : t && !a && (r = !1), r;
}
const ex = () => !0;
function oM(t, { connectionMode: a, connectionRadius: r, handleId: o, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: h, nodeLookup: p, lib: g, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: T, onConnectEnd: N, isValidConnection: R = ex, onReconnectEnd: z, updateConnection: E, getTransform: j, getFromHandle: U, autoPanSpeed: H, dragThreshold: V = 1, handleDomNode: D }) {
  const q = Y1(t.target);
  let le = 0, I;
  const { x: K, y: W } = ga(t), O = W1(u, D), $ = h?.getBoundingClientRect();
  let _ = !1;
  if (!$ || !O)
    return;
  const L = J1(s, O, o, p, a);
  if (!L)
    return;
  let Z = ga(t, $), G = !1, ne = null, A = !1, k = null;
  function F() {
    if (!y || !$)
      return;
    const [Ce, we] = Ph(Z, $, H);
    v({ x: Ce, y: we }), le = requestAnimationFrame(F);
  }
  const te = {
    ...L,
    nodeId: s,
    type: O,
    position: L.position
  }, se = p.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: Er(se, te, Ae.Left, !0),
    fromHandle: te,
    fromPosition: te.position,
    fromNode: se,
    to: Z,
    toHandle: null,
    toPosition: Qy[te.position],
    toNode: null,
    pointer: Z
  };
  function ee() {
    _ = !0, E(me), S?.(t, { nodeId: s, handleId: o, handleType: O });
  }
  V === 0 && ee();
  function ge(Ce) {
    if (!_) {
      const { x: Te, y: Ie } = ga(Ce), Be = Te - K, $e = Ie - W;
      if (!(Be * Be + $e * $e > V * V))
        return;
      ee();
    }
    if (!U() || !te) {
      ze(Ce);
      return;
    }
    const we = j();
    Z = ga(Ce, $), I = rM(_l(Z, we, !1, [1, 1]), r, p, te), G || (F(), G = !0);
    const xe = tx(Ce, {
      handle: I,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: o,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: q,
      lib: g,
      flowId: m,
      nodeLookup: p
    });
    k = xe.handleDomNode, ne = xe.connection, A = lM(!!I, xe.isValid);
    const Re = p.get(s), qe = Re ? Er(Re, te, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: qe,
      isValid: A,
      to: xe.toHandle && A ? xl({ x: xe.toHandle.x, y: xe.toHandle.y }, we) : Z,
      toHandle: xe.toHandle,
      toPosition: A && xe.toHandle ? xe.toHandle.position : Qy[te.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: Z
    };
    E(ft), me = ft;
  }
  function ze(Ce) {
    if (!("touches" in Ce && Ce.touches.length > 0)) {
      if (_) {
        (I || k) && ne && A && T?.(ne);
        const { inProgress: we, ...xe } = me, Re = {
          ...xe,
          toPosition: me.toHandle ? me.toPosition : null
        };
        N?.(Ce, Re), u && z?.(Ce, Re);
      }
      x(), cancelAnimationFrame(le), G = !1, A = !1, ne = null, k = null, q.removeEventListener("mousemove", ge), q.removeEventListener("mouseup", ze), q.removeEventListener("touchmove", ge), q.removeEventListener("touchend", ze);
    }
  }
  q.addEventListener("mousemove", ge), q.addEventListener("mouseup", ze), q.addEventListener("touchmove", ge), q.addEventListener("touchend", ze);
}
function tx(t, { handle: a, connectionMode: r, fromNodeId: o, fromHandleId: s, fromType: u, doc: c, lib: h, flowId: p, isValidConnection: g = ex, nodeLookup: y }) {
  const m = u === "target", v = a ? c.querySelector(`.${h}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = ga(t), T = c.elementFromPoint(x, S), N = T?.classList.contains(`${h}-flow__handle`) ? T : v, R = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const z = W1(void 0, N), E = N.getAttribute("data-nodeid"), j = N.getAttribute("data-handleid"), U = N.classList.contains("connectable"), H = N.classList.contains("connectableend");
    if (!E || !z)
      return R;
    const V = {
      source: m ? E : o,
      sourceHandle: m ? j : s,
      target: m ? o : E,
      targetHandle: m ? s : j
    };
    R.connection = V;
    const q = U && H && (r === yl.Strict ? m && z === "source" || !m && z === "target" : E !== o || j !== s);
    R.isValid = q && g(V), R.toHandle = J1(E, z, j, y, r, !0);
  }
  return R;
}
const dh = {
  onPointerDown: oM,
  isValid: tx
};
function sM({ domNode: t, panZoom: a, getTransform: r, getViewScale: o }) {
  const s = Vn(t);
  function u({ translateExtent: h, width: p, height: g, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const j = r(), U = E.sourceEvent.ctrlKey && Uo() ? 10 : 1, H = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = j[2] * Math.pow(2, H * U);
      a.scaleTo(V);
    };
    let T = [0, 0];
    const N = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (T = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, R = (E) => {
      const j = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const U = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], H = [U[0] - T[0], U[1] - T[1]];
      T = U;
      const V = o() * Math.max(j[2], Math.log(j[2])) * (x ? -1 : 1), D = {
        x: j[0] - H[0] * V,
        y: j[1] - H[1] * V
      }, q = [
        [0, 0],
        [p, g]
      ];
      a.setViewportConstrained({
        x: D.x,
        y: D.y,
        zoom: j[2]
      }, q, h);
    }, z = M1().on("start", N).on("zoom", m ? R : null).on("zoom.wheel", v ? S : null);
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
const uc = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Ld = ({ x: t, y: a, zoom: r }) => lc.translate(t, a).scale(r), ul = (t, a) => t.target.closest(`.${a}`), nx = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), uM = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Hd = (t, a = 0, r = uM, o = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || o(), s ? t.transition().duration(a).ease(r).on("end", o) : t;
}, ax = (t) => {
  const a = t.ctrlKey && Uo() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function cM({ zoomPanValues: t, noWheelClassName: a, d3Selection: r, d3Zoom: o, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: h, onPanZoom: p, onPanZoomEnd: g }) {
  return (y) => {
    if (ul(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const N = ha(y), R = ax(y), z = m * Math.pow(2, R);
      o.scaleTo(r, z, N, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === vr.Vertical ? 0 : y.deltaX * v, S = s === vr.Horizontal ? 0 : y.deltaY * v;
    !Uo() && y.shiftKey && s !== vr.Vertical && (x = y.deltaY * v, S = 0), o.translateBy(
      r,
      -(x / m) * u,
      -(S / m) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const T = uc(r.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (p?.(y, T), t.panScrollTimeout = setTimeout(() => {
      g?.(y, T), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, T));
  };
}
function fM({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: r }) {
  return function(o, s) {
    const u = o.type === "wheel", c = !a && u && !o.ctrlKey, h = ul(o, t);
    if (o.ctrlKey && u && h && o.preventDefault(), c || h)
      return null;
    o.preventDefault(), r.call(this, o, s);
  };
}
function dM({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: r }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const s = uc(o.transform);
    t.mouseButton = o.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, o.sourceEvent?.type === "mousedown" && a(!0), r && r?.(o.sourceEvent, s);
  };
}
function hM({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: r, onTransformChange: o, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(r && nx(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || o([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, uc(u.transform));
  };
}
function mM({ zoomPanValues: t, panOnDrag: a, panOnScroll: r, onDraggingChange: o, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && nx(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), t.usedRightMouseButton = !1, o(!1), s)) {
      const h = uc(c.transform);
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
function pM({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: o, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: h, noPanClassName: p, lib: g, connectionInProgress: y }) {
  return (m) => {
    const v = t || a, x = r && m.ctrlKey, S = m.type === "wheel";
    if (m.button === 1 && m.type === "mousedown" && (ul(m, `${g}-flow__node`) || ul(m, `${g}-flow__edge`)))
      return !0;
    if (!o && !v && !s && !u && !r || c || y && !S || ul(m, h) && S || ul(m, p) && (!S || s && S && !t) || !r && m.ctrlKey && S)
      return !1;
    if (!r && m.type === "touchstart" && m.touches?.length > 1)
      return m.preventDefault(), !1;
    if (!v && !s && !x && S || !o && (m.type === "mousedown" || m.type === "touchstart") || Array.isArray(o) && !o.includes(m.button) && m.type === "mousedown")
      return !1;
    const T = Array.isArray(o) && o.includes(m.button) || !m.button || m.button <= 1;
    return (!m.ctrlKey || S) && T;
  };
}
function gM({ domNode: t, minZoom: a, maxZoom: r, translateExtent: o, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: h, onDraggingChange: p }) {
  const g = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), m = M1().scaleExtent([a, r]).translateExtent(o), v = Vn(t).call(m);
  z({
    x: s.x,
    y: s.y,
    zoom: vl(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], o);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  m.wheelDelta(ax);
  async function T(I, K) {
    return v ? new Promise((W) => {
      m?.interpolate(K?.interpolate === "linear" ? Co : zu).transform(Hd(v, K?.duration, K?.ease, () => W(!0)), I);
    }) : !1;
  }
  function N({ noWheelClassName: I, noPanClassName: K, onPaneContextMenu: W, userSelectionActive: O, panOnScroll: $, panOnDrag: _, panOnScrollMode: L, panOnScrollSpeed: Z, preventScrolling: G, zoomOnPinch: ne, zoomOnScroll: A, zoomOnDoubleClick: k, zoomActivationKeyPressed: F, lib: te, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: ee }) {
    O && !g.isZoomingOrPanning && R();
    const ge = $ && !F && !O;
    m.clickDistance(ee ? 1 / 0 : !pa(me) || me < 0 ? 0 : me);
    const ze = ge ? cM({
      zoomPanValues: g,
      noWheelClassName: I,
      d3Selection: v,
      d3Zoom: m,
      panOnScrollMode: L,
      panOnScrollSpeed: Z,
      zoomOnPinch: ne,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : fM({
      noWheelClassName: I,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Ce = dM({
      zoomPanValues: g,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    m.on("start", Ce);
    const we = hM({
      zoomPanValues: g,
      panOnDrag: _,
      onPaneContextMenu: !!W,
      onPanZoom: u,
      onTransformChange: se
    });
    m.on("zoom", we);
    const xe = mM({
      zoomPanValues: g,
      panOnDrag: _,
      panOnScroll: $,
      onPaneContextMenu: W,
      onPanZoomEnd: h,
      onDraggingChange: p
    });
    m.on("end", xe);
    const Re = pM({
      zoomActivationKeyPressed: F,
      panOnDrag: _,
      zoomOnScroll: A,
      panOnScroll: $,
      zoomOnDoubleClick: k,
      zoomOnPinch: ne,
      userSelectionActive: O,
      noPanClassName: K,
      noWheelClassName: I,
      lib: te,
      connectionInProgress: he
    });
    m.filter(Re), k ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function R() {
    m.on("zoom", null);
  }
  async function z(I, K, W) {
    const O = Ld(I), $ = m?.constrain()(O, K, W);
    return $ && await T($), $;
  }
  async function E(I, K) {
    const W = Ld(I);
    return await T(W, K), W;
  }
  function j(I) {
    if (v) {
      const K = Ld(I), W = v.property("__zoom");
      (W.k !== I.zoom || W.x !== I.x || W.y !== I.y) && m?.transform(v, K, null, { sync: !0 });
    }
  }
  function U() {
    const I = v ? T1(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: I.x, y: I.y, zoom: I.k };
  }
  async function H(I, K) {
    return v ? new Promise((W) => {
      m?.interpolate(K?.interpolate === "linear" ? Co : zu).scaleTo(Hd(v, K?.duration, K?.ease, () => W(!0)), I);
    }) : !1;
  }
  async function V(I, K) {
    return v ? new Promise((W) => {
      m?.interpolate(K?.interpolate === "linear" ? Co : zu).scaleBy(Hd(v, K?.duration, K?.ease, () => W(!0)), I);
    }) : !1;
  }
  function D(I) {
    m?.scaleExtent(I);
  }
  function q(I) {
    m?.translateExtent(I);
  }
  function le(I) {
    const K = !pa(I) || I < 0 ? 0 : I;
    m?.clickDistance(K);
  }
  return {
    update: N,
    destroy: R,
    setViewport: E,
    setViewportConstrained: z,
    getViewport: U,
    scaleTo: H,
    scaleBy: V,
    setScaleExtent: D,
    setTranslateExtent: q,
    syncViewport: j,
    setClickDistance: le
  };
}
var Sl;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Sl || (Sl = {}));
function yM({ width: t, prevWidth: a, height: r, prevHeight: o, affectsX: s, affectsY: u }) {
  const c = t - a, h = r - o, p = [c > 0 ? 1 : c < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), h && u && (p[1] = p[1] * -1), p;
}
function ov(t) {
  const a = t.includes("right") || t.includes("left"), r = t.includes("bottom") || t.includes("top"), o = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: o,
    affectsY: s
  };
}
function Hi(t, a) {
  return Math.max(0, a - t);
}
function Bi(t, a) {
  return Math.max(0, t - a);
}
function gu(t, a, r) {
  return Math.max(0, a - t, t - r);
}
function sv(t, a) {
  return t ? !a : a;
}
function vM(t, a, r, o, s, u, c, h) {
  let { affectsX: p, affectsY: g } = a;
  const { isHorizontal: y, isVertical: m } = a, v = y && m, { xSnapped: x, ySnapped: S } = r, { minWidth: T, maxWidth: N, minHeight: R, maxHeight: z } = o, { x: E, y: j, width: U, height: H, aspectRatio: V } = t;
  let D = Math.floor(y ? x - t.pointerX : 0), q = Math.floor(m ? S - t.pointerY : 0);
  const le = U + (p ? -D : D), I = H + (g ? -q : q), K = -u[0] * U, W = -u[1] * H;
  let O = gu(le, T, N), $ = gu(I, R, z);
  if (c) {
    let Z = 0, G = 0;
    p && D < 0 ? Z = Hi(E + D + K, c[0][0]) : !p && D > 0 && (Z = Bi(E + le + K, c[1][0])), g && q < 0 ? G = Hi(j + q + W, c[0][1]) : !g && q > 0 && (G = Bi(j + I + W, c[1][1])), O = Math.max(O, Z), $ = Math.max($, G);
  }
  if (h) {
    let Z = 0, G = 0;
    p && D > 0 ? Z = Bi(E + D, h[0][0]) : !p && D < 0 && (Z = Hi(E + le, h[1][0])), g && q > 0 ? G = Bi(j + q, h[0][1]) : !g && q < 0 && (G = Hi(j + I, h[1][1])), O = Math.max(O, Z), $ = Math.max($, G);
  }
  if (s) {
    if (y) {
      const Z = gu(le / V, R, z) * V;
      if (O = Math.max(O, Z), c) {
        let G = 0;
        !p && !g || p && !g && v ? G = Bi(j + W + le / V, c[1][1]) * V : G = Hi(j + W + (p ? D : -D) / V, c[0][1]) * V, O = Math.max(O, G);
      }
      if (h) {
        let G = 0;
        !p && !g || p && !g && v ? G = Hi(j + le / V, h[1][1]) * V : G = Bi(j + (p ? D : -D) / V, h[0][1]) * V, O = Math.max(O, G);
      }
    }
    if (m) {
      const Z = gu(I * V, T, N) / V;
      if ($ = Math.max($, Z), c) {
        let G = 0;
        !p && !g || g && !p && v ? G = Bi(E + I * V + K, c[1][0]) / V : G = Hi(E + (g ? q : -q) * V + K, c[0][0]) / V, $ = Math.max($, G);
      }
      if (h) {
        let G = 0;
        !p && !g || g && !p && v ? G = Hi(E + I * V, h[1][0]) / V : G = Bi(E + (g ? q : -q) * V, h[0][0]) / V, $ = Math.max($, G);
      }
    }
  }
  q = q + (q < 0 ? $ : -$), D = D + (D < 0 ? O : -O), s && (v ? le > I * V ? q = (sv(p, g) ? -D : D) / V : D = (sv(p, g) ? -q : q) * V : y ? (q = D / V, g = p) : (D = q * V, p = g));
  const _ = p ? E + D : E, L = g ? j + q : j;
  return {
    width: U + (p ? -D : D),
    height: H + (g ? -q : q),
    x: u[0] * D * (p ? -1 : 1) + _,
    y: u[1] * q * (g ? -1 : 1) + L
  };
}
const ix = { width: 0, height: 0, x: 0, y: 0 }, bM = {
  ...ix,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function xM(t, a, r) {
  const o = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, c = t.measured.height ?? 0, h = r[0] * u, p = r[1] * c;
  return [
    [o - h, s - p],
    [o + u - h, s + c - p]
  ];
}
function SM({ domNode: t, nodeId: a, getStoreItems: r, onChange: o, onEnd: s }) {
  const u = Vn(t);
  let c = {
    controlDirection: ov("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: g, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: T, shouldResize: N }) {
    let R = { ...ix }, z = { ...bM };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: ov(g)
    };
    let E, j = null, U = [], H, V, D, q = !1;
    const le = m1().on("start", (I) => {
      const { nodeLookup: K, transform: W, snapGrid: O, snapToGrid: $, nodeOrigin: _, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      j = L?.getBoundingClientRect() ?? null;
      const { xSnapped: Z, ySnapped: G } = To(I.sourceEvent, {
        transform: W,
        snapGrid: O,
        snapToGrid: $,
        containerBounds: j
      });
      R = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, z = {
        ...R,
        pointerX: Z,
        pointerY: G,
        aspectRatio: R.width / R.height
      }, H = void 0, V = wr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (H = K.get(E.parentId)), H && E.extent === "parent" && (V = [
        [0, 0],
        [H.measured.width, H.measured.height]
      ]), U = [], D = void 0;
      for (const [ne, A] of K)
        if (A.parentId === a && (U.push({
          id: ne,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const k = xM(A, E, A.origin ?? _);
          D ? D = [
            [Math.min(k[0][0], D[0][0]), Math.min(k[0][1], D[0][1])],
            [Math.max(k[1][0], D[1][0]), Math.max(k[1][1], D[1][1])]
          ] : D = k;
        }
      x?.(I, { ...R });
    }).on("drag", (I) => {
      const { transform: K, snapGrid: W, snapToGrid: O, nodeOrigin: $ } = r(), _ = To(I.sourceEvent, {
        transform: K,
        snapGrid: W,
        snapToGrid: O,
        containerBounds: j
      }), L = [];
      if (!E)
        return;
      const { x: Z, y: G, width: ne, height: A } = R, k = {}, F = E.origin ?? $, { width: te, height: se, x: he, y: me } = vM(z, c.controlDirection, _, c.boundaries, c.keepAspectRatio, F, V, D), ee = te !== ne, ge = se !== A, ze = he !== Z && ee, Ce = me !== G && ge;
      if (!ze && !Ce && !ee && !ge)
        return;
      if ((ze || Ce || F[0] === 1 || F[1] === 1) && (k.x = ze ? he : R.x, k.y = Ce ? me : R.y, R.x = k.x, R.y = k.y, U.length > 0)) {
        const qe = he - Z, ft = me - G;
        for (const Te of U)
          Te.position = {
            x: Te.position.x - qe + F[0] * (te - ne),
            y: Te.position.y - ft + F[1] * (se - A)
          }, L.push(Te);
      }
      if ((ee || ge) && (k.width = ee && (!c.resizeDirection || c.resizeDirection === "horizontal") ? te : R.width, k.height = ge && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : R.height, R.width = k.width, R.height = k.height), H && E.expandParent) {
        const qe = F[0] * (k.width ?? 0);
        k.x && k.x < qe && (R.x = qe, z.x = z.x - (k.x - qe));
        const ft = F[1] * (k.height ?? 0);
        k.y && k.y < ft && (R.y = ft, z.y = z.y - (k.y - ft));
      }
      const we = yM({
        width: R.width,
        prevWidth: ne,
        height: R.height,
        prevHeight: A,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...R, direction: we };
      N?.(I, xe) !== !1 && (q = !0, S?.(I, xe), o(k, L));
    }).on("end", (I) => {
      q && (T?.(I, { ...R }), s?.({ ...R }), q = !1);
    });
    u.call(le);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: h,
    destroy: p
  };
}
var Bd = { exports: {} }, Ud = {}, kd = { exports: {} }, Vd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uv;
function wM() {
  if (uv) return Vd;
  uv = 1;
  var t = Yo();
  function a(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, o = t.useState, s = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function h(m, v) {
    var x = v(), S = o({ inst: { value: x, getSnapshot: v } }), T = S[0].inst, N = S[1];
    return u(
      function() {
        T.value = x, T.getSnapshot = v, p(T) && N({ inst: T });
      },
      [m, x, v]
    ), s(
      function() {
        return p(T) && N({ inst: T }), m(function() {
          p(T) && N({ inst: T });
        });
      },
      [m]
    ), c(x), x;
  }
  function p(m) {
    var v = m.getSnapshot;
    m = m.value;
    try {
      var x = v();
      return !r(m, x);
    } catch {
      return !0;
    }
  }
  function g(m, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : h;
  return Vd.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y, Vd;
}
var cv;
function rx() {
  return cv || (cv = 1, kd.exports = wM()), kd.exports;
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
var fv;
function EM() {
  if (fv) return Ud;
  fv = 1;
  var t = Yo(), a = rx();
  function r(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var o = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = t.useRef, c = t.useEffect, h = t.useMemo, p = t.useDebugValue;
  return Ud.useSyncExternalStoreWithSelector = function(g, y, m, v, x) {
    var S = u(null);
    if (S.current === null) {
      var T = { hasValue: !1, value: null };
      S.current = T;
    } else T = S.current;
    S = h(
      function() {
        function R(H) {
          if (!z) {
            if (z = !0, E = H, H = v(H), x !== void 0 && T.hasValue) {
              var V = T.value;
              if (x(V, H))
                return j = V;
            }
            return j = H;
          }
          if (V = j, o(E, H)) return V;
          var D = v(H);
          return x !== void 0 && x(V, D) ? (E = H, V) : (E = H, j = D);
        }
        var z = !1, E, j, U = m === void 0 ? null : m;
        return [
          function() {
            return R(y());
          },
          U === null ? void 0 : function() {
            return R(U());
          }
        ];
      },
      [y, m, v, x]
    );
    var N = s(g, S[0], S[1]);
    return c(
      function() {
        T.hasValue = !0, T.value = N;
      },
      [N]
    ), p(N), N;
  }, Ud;
}
var dv;
function _M() {
  return dv || (dv = 1, Bd.exports = EM()), Bd.exports;
}
var NM = _M();
const RM = /* @__PURE__ */ Th(NM), CM = {}, hv = (t) => {
  let a;
  const r = /* @__PURE__ */ new Set(), o = (y, m) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: o, getState: s, getInitialState: () => g, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (CM ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, g = a = t(o, s, p);
  return p;
}, TM = (t) => t ? hv(t) : hv, { useDebugValue: MM } = ye, { useSyncExternalStoreWithSelector: DM } = RM, AM = (t) => t;
function lx(t, a = AM, r) {
  const o = DM(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    r
  );
  return MM(o), o;
}
const mv = (t, a) => {
  const r = TM(t), o = (s, u = a) => lx(r, s, u);
  return Object.assign(o, r), o;
}, zM = (t, a) => t ? mv(t, a) : mv;
function At(t, a) {
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
  const r = Object.keys(t);
  if (r.length !== Object.keys(a).length)
    return !1;
  for (const o of r)
    if (!Object.prototype.hasOwnProperty.call(a, o) || !Object.is(t[o], a[o]))
      return !1;
  return !0;
}
var OM = pb();
const jM = /* @__PURE__ */ Th(OM), cc = M.createContext(null), LM = cc.Provider, ox = ya.error001("react");
function lt(t, a) {
  const r = M.useContext(cc);
  if (r === null)
    throw new Error(ox);
  return lx(r, t, a);
}
function zt() {
  const t = M.useContext(cc);
  if (t === null)
    throw new Error(ox);
  return M.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const pv = { display: "none" }, HM = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, sx = "react-flow__node-desc", ux = "react-flow__edge-desc", BM = "react-flow__aria-live", UM = (t) => t.ariaLiveMessage, kM = (t) => t.ariaLabelConfig;
function VM({ rfId: t }) {
  const a = lt(UM);
  return w.jsx("div", { id: `${BM}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: HM, children: a });
}
function YM({ rfId: t, disableKeyboardA11y: a }) {
  const r = lt(kM);
  return w.jsxs(w.Fragment, { children: [w.jsx("div", { id: `${sx}-${t}`, style: pv, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), w.jsx("div", { id: `${ux}-${t}`, style: pv, children: r["edge.a11yDescription.default"] }), !a && w.jsx(VM, { rfId: t })] });
}
const fc = M.forwardRef(({ position: t = "top-left", children: a, className: r, style: o, ...s }, u) => {
  const c = `${t}`.split("-");
  return w.jsx("div", { className: Ft(["react-flow__panel", r, ...c]), style: o, ref: u, ...s, children: a });
});
fc.displayName = "Panel";
function qM({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : w.jsx(fc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: w.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const $M = (t) => {
  const a = [], r = [];
  for (const [, o] of t.nodeLookup)
    o.selected && a.push(o.internals.userNode);
  for (const [, o] of t.edgeLookup)
    o.selected && r.push(o);
  return { selectedNodes: a, selectedEdges: r };
}, yu = (t) => t.id;
function XM(t, a) {
  return At(t.selectedNodes.map(yu), a.selectedNodes.map(yu)) && At(t.selectedEdges.map(yu), a.selectedEdges.map(yu));
}
function GM({ onSelectionChange: t }) {
  const a = zt(), { selectedNodes: r, selectedEdges: o } = lt($M, XM);
  return M.useEffect(() => {
    const s = { nodes: r, edges: o };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, o, t]), null;
}
const IM = (t) => !!t.onSelectionChangeHandlers;
function ZM({ onSelectionChange: t }) {
  const a = lt(IM);
  return t || a ? w.jsx(GM, { onSelectionChange: t }) : null;
}
const cx = [0, 0], QM = { x: 0, y: 0, zoom: 1 }, FM = [
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
], gv = [...FM, "rfId"], KM = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), yv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Lo,
  nodeOrigin: cx,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function PM(t) {
  const { setNodes: a, setEdges: r, setMinZoom: o, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: h, setDefaultNodesAndEdges: p } = lt(KM, At), g = zt();
  M.useEffect(() => (p(t.defaultNodes, t.defaultEdges), () => {
    y.current = yv, h();
  }), []);
  const y = M.useRef(yv);
  return M.useEffect(
    () => {
      for (const m of gv) {
        const v = t[m], x = y.current[m];
        v !== x && (typeof t[m] > "u" || (m === "nodes" ? a(v) : m === "edges" ? r(v) : m === "minZoom" ? o(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? u(v) : m === "nodeExtent" ? c(v) : m === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: jT(v) }) : m === "fitView" ? g.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? g.setState({ fitViewOptions: v }) : g.setState({ [m]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    gv.map((m) => t[m])
  ), null;
}
function vv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function JM(t) {
  const [a, r] = M.useState(t === "system" ? null : t);
  return M.useEffect(() => {
    if (t !== "system") {
      r(t);
      return;
    }
    const o = vv(), s = () => r(o?.matches ? "dark" : "light");
    return s(), o?.addEventListener("change", s), () => {
      o?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : vv()?.matches ? "dark" : "light";
}
const bv = typeof document < "u" ? document : null;
function ko(t = null, a = { target: bv, actInsideInputWithModifier: !0 }) {
  const [r, o] = M.useState(!1), s = M.useRef(!1), u = M.useRef(/* @__PURE__ */ new Set([])), [c, h] = M.useMemo(() => {
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
    const p = a?.target ?? bv, g = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !g) && q1(x))
          return !1;
        const T = Sv(x.code, h);
        if (u.current.add(x[T]), xv(c, u.current, !1)) {
          const N = x.composedPath?.()?.[0] || x.target, R = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && x.preventDefault(), o(!0);
        }
      }, m = (x) => {
        const S = Sv(x.code, h);
        xv(c, u.current, !0) ? (o(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), o(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, o]), r;
}
function xv(t, a, r) {
  return t.filter((o) => r || o.length === a.size).some((o) => o.every((s) => a.has(s)));
}
function Sv(t, a) {
  return a.includes(t) ? "code" : "key";
}
const WM = () => {
  const t = zt();
  return M.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: r } = t.getState();
      return r ? r.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: r } = t.getState();
      return r ? r.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, r) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleTo(a, r) : !1;
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (a, r) => {
      const { transform: [o, s, u], panZoom: c } = t.getState();
      return c ? (await c.setViewport({
        x: a.x ?? o,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, r), !0) : !1;
    },
    getViewport: () => {
      const [a, r, o] = t.getState().transform;
      return { x: a, y: r, zoom: o };
    },
    setCenter: async (a, r, o) => t.getState().setCenter(a, r, o),
    fitBounds: async (a, r) => {
      const { width: o, height: s, minZoom: u, maxZoom: c, panZoom: h } = t.getState(), p = Jh(a, o, s, u, c, r?.padding ?? 0.1);
      return h ? (await h.setViewport(p, {
        duration: r?.duration,
        ease: r?.ease,
        interpolate: r?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, r = {}) => {
      const { transform: o, snapGrid: s, snapToGrid: u, domNode: c } = t.getState();
      if (!c)
        return a;
      const { x: h, y: p } = c.getBoundingClientRect(), g = {
        x: a.x - h,
        y: a.y - p
      }, y = r.snapGrid ?? s, m = r.snapToGrid ?? u;
      return _l(g, o, m, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: o } = t.getState();
      if (!o)
        return a;
      const { x: s, y: u } = o.getBoundingClientRect(), c = xl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function fx(t, a) {
  const r = [], o = /* @__PURE__ */ new Map(), s = [];
  for (const u of t)
    if (u.type === "add") {
      s.push(u);
      continue;
    } else if (u.type === "remove" || u.type === "replace")
      o.set(u.id, [u]);
    else {
      const c = o.get(u.id);
      c ? c.push(u) : o.set(u.id, [u]);
    }
  for (const u of a) {
    const c = o.get(u.id);
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
    for (const p of c)
      eD(p, h);
    r.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function eD(t, a) {
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
function tD(t, a) {
  return fx(t, a);
}
function nD(t, a) {
  return fx(t, a);
}
function hr(t, a) {
  return {
    id: t,
    type: "select",
    selected: a
  };
}
function cl(t, a = /* @__PURE__ */ new Set(), r = !1) {
  const o = [];
  for (const [s, u] of t) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), o.push(hr(u.id, c)));
  }
  return o;
}
function wv({ items: t = [], lookup: a }) {
  const r = [], o = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const c = a.get(u.id), h = c?.internals?.userNode ?? c;
    h !== void 0 && h !== u && r.push({ id: u.id, item: u, type: "replace" }), h === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    o.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function Ev(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const aD = U1();
function iD(t, a, r = {}) {
  return VT(t, a, {
    ...r,
    onError: r.onError ?? aD
  });
}
const _v = (t) => NT(t), rD = (t) => j1(t);
function dx(t) {
  return M.forwardRef(t);
}
const lD = typeof window < "u" ? M.useLayoutEffect : M.useEffect;
function Nv(t) {
  const [a, r] = M.useState(BigInt(0)), [o] = M.useState(() => oD(() => r((s) => s + BigInt(1))));
  return lD(() => {
    const s = o.get();
    s.length && (t(s), o.reset());
  }, [a]), o;
}
function oD(t) {
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
const hx = M.createContext(null);
function sD({ children: t }) {
  const a = zt(), r = M.useCallback((h) => {
    const { nodes: p = [], setNodes: g, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let T = p;
    for (const R of h)
      T = typeof R == "function" ? R(T) : R;
    let N = wv({
      items: T,
      lookup: v
    });
    for (const R of S.values())
      N = R(N);
    y && g(T), N.length > 0 ? m?.(N) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: z, setNodes: E } = a.getState();
      R && E(z);
    });
  }, []), o = Nv(r), s = M.useCallback((h) => {
    const { edges: p = [], setEdges: g, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? g(x) : m && m(wv({
      items: x,
      lookup: v
    }));
  }, []), u = Nv(s), c = M.useMemo(() => ({ nodeQueue: o, edgeQueue: u }), []);
  return w.jsx(hx.Provider, { value: c, children: t });
}
function uD() {
  const t = M.useContext(hx);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const cD = (t) => !!t.panZoom;
function rm() {
  const t = WM(), a = zt(), r = uD(), o = lt(cD), s = M.useMemo(() => {
    const u = (m) => a.getState().nodeLookup.get(m), c = (m) => {
      r.nodeQueue.push(m);
    }, h = (m) => {
      r.edgeQueue.push(m);
    }, p = (m) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = _v(m) ? m : v.get(m.id), T = S.parentId ? V1(S.position, S.measured, S.parentId, v, x) : S.position, N = {
        ...S,
        position: T,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return bl(N);
    }, g = (m, v, x = { replace: !1 }) => {
      c((S) => S.map((T) => {
        if (T.id === m) {
          const N = typeof v == "function" ? v(T) : v;
          return x.replace && _v(N) ? N : { ...T, ...N };
        }
        return T;
      }));
    }, y = (m, v, x = { replace: !1 }) => {
      h((S) => S.map((T) => {
        if (T.id === m) {
          const N = typeof v == "function" ? v(T) : v;
          return x.replace && rD(N) ? N : { ...T, ...N };
        }
        return T;
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
      setNodes: c,
      setEdges: h,
      addNodes: (m) => {
        const v = Array.isArray(m) ? m : [m];
        r.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (m) => {
        const v = Array.isArray(m) ? m : [m];
        r.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: m = [], edges: v = [], transform: x } = a.getState(), [S, T, N] = x;
        return {
          nodes: m.map((R) => ({ ...R })),
          edges: v.map((R) => ({ ...R })),
          viewport: {
            x: S,
            y: T,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: m = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: T, onEdgesDelete: N, triggerNodeChanges: R, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: j } = a.getState(), { nodes: U, edges: H } = await DT({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: j
        }), V = H.length > 0, D = U.length > 0;
        if (V) {
          const q = H.map(Ev);
          N?.(H), z(q);
        }
        if (D) {
          const q = U.map(Ev);
          T?.(U), R(q);
        }
        return (D || V) && E?.({ nodes: U, edges: H }), { deletedNodes: U, deletedEdges: H };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (m, v = !0, x) => {
        const S = Ky(m), T = S ? m : p(m), N = x !== void 0;
        return T ? (x || a.getState().nodes).filter((R) => {
          const z = a.getState().nodeLookup.get(R.id);
          if (z && !S && (R.id === m.id || !z.internals.positionAbsolute))
            return !1;
          const E = bl(N ? R : z), j = Bo(E, T);
          return v && j > 0 || j >= E.width * E.height || j >= T.width * T.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, x = !0) => {
        const T = Ky(m) ? m : p(m);
        if (!T)
          return !1;
        const N = Bo(T, v);
        return x && N > 0 || N >= v.width * v.height || N >= T.width * T.height;
      },
      updateNode: g,
      updateNodeData: (m, v, x = { replace: !1 }) => {
        g(m, (S) => {
          const T = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: T } : { ...S, data: { ...S.data, ...T } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (m, v, x = { replace: !1 }) => {
        y(m, (S) => {
          const T = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: T } : { ...S, data: { ...S.data, ...T } };
        }, x);
      },
      getNodesBounds: (m) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return RT(m, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = a.getState().fitViewResolver ?? OT();
        return a.setState({ fitViewQueued: !0, fitViewOptions: m, fitViewResolver: v }), r.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return M.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: o
  }), [o]);
}
const Rv = (t) => t.selected, fD = typeof window < "u" ? window : void 0;
function dD({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: o } = rm(), s = ko(t, { actInsideInputWithModifier: !1 }), u = ko(a, { target: fD });
  M.useEffect(() => {
    if (s) {
      const { edges: c, nodes: h } = r.getState();
      o({ nodes: h.filter(Rv), edges: c.filter(Rv) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), M.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function hD(t) {
  const a = zt();
  M.useEffect(() => {
    const r = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Wh(t.current);
      (o.height === 0 || o.width === 0) && a.getState().onError?.("004", ya.error004()), a.setState({ width: o.width || 500, height: o.height || 500 });
    };
    if (t.current) {
      r(), window.addEventListener("resize", r);
      const o = new ResizeObserver(() => r());
      return o.observe(t.current), () => {
        window.removeEventListener("resize", r), o && t.current && o.unobserve(t.current);
      };
    }
  }, []);
}
const dc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, mD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function pD({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: o = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = vr.Free, zoomOnDoubleClick: c = !0, panOnDrag: h = !0, defaultViewport: p, translateExtent: g, minZoom: y, maxZoom: m, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: T, noPanClassName: N, onViewportChange: R, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: j }) {
  const U = zt(), H = M.useRef(null), { userSelectionActive: V, lib: D, connectionInProgress: q } = lt(mD, At), le = ko(v), I = M.useRef();
  hD(H);
  const K = M.useCallback((W) => {
    R?.({ x: W[0], y: W[1], zoom: W[2] }), z || U.setState({ transform: W });
  }, [R, z]);
  return M.useEffect(() => {
    if (H.current) {
      I.current = gM({
        domNode: H.current,
        minZoom: y,
        maxZoom: m,
        translateExtent: g,
        viewport: p,
        onDraggingChange: (_) => U.setState((L) => L.paneDragging === _ ? L : { paneDragging: _ }),
        onPanZoomStart: (_, L) => {
          const { onViewportChangeStart: Z, onMoveStart: G } = U.getState();
          G?.(_, L), Z?.(L);
        },
        onPanZoom: (_, L) => {
          const { onViewportChange: Z, onMove: G } = U.getState();
          G?.(_, L), Z?.(L);
        },
        onPanZoomEnd: (_, L) => {
          const { onViewportChangeEnd: Z, onMoveEnd: G } = U.getState();
          G?.(_, L), Z?.(L);
        }
      });
      const { x: W, y: O, zoom: $ } = I.current.getViewport();
      return U.setState({
        panZoom: I.current,
        transform: [W, O, $],
        domNode: H.current.closest(".react-flow")
      }), () => {
        I.current?.destroy();
      };
    }
  }, []), M.useEffect(() => {
    I.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: o,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: h,
      zoomActivationKeyPressed: le,
      preventScrolling: x,
      noPanClassName: N,
      userSelectionActive: V,
      noWheelClassName: T,
      lib: D,
      onTransformChange: K,
      connectionInProgress: q,
      selectionOnDrag: j,
      paneClickDistance: E
    });
  }, [
    t,
    a,
    r,
    o,
    s,
    u,
    c,
    h,
    le,
    x,
    N,
    V,
    T,
    D,
    K,
    q,
    j,
    E
  ]), w.jsx("div", { className: "react-flow__renderer", ref: H, style: dc, children: S });
}
const gD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function yD() {
  const { userSelectionActive: t, userSelectionRect: a } = lt(gD, At);
  return t && a ? w.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Yd = (t, a) => (r) => {
  r.target === a.current && t?.(r);
}, vD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  connectionInProgress: t.connection.inProgress,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function bD({ isSelecting: t, selectionKeyPressed: a, selectionMode: r = Ho.Full, panOnDrag: o, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: h, onSelectionEnd: p, onPaneClick: g, onPaneContextMenu: y, onPaneScroll: m, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: T }) {
  const N = M.useRef(0), R = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: j, connectionInProgress: U, panBy: H, autoPanSpeed: V } = lt(vD, At), D = E && (t || z), q = M.useRef(null), le = M.useRef(), I = M.useRef(/* @__PURE__ */ new Set()), K = M.useRef(/* @__PURE__ */ new Set()), W = M.useRef(!1), O = M.useRef({ x: 0, y: 0 }), $ = M.useRef(!1), _ = (ee) => {
    if (W.current || U) {
      W.current = !1;
      return;
    }
    g?.(ee), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
  }, L = (ee) => {
    if (Array.isArray(o) && o?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, Z = m ? (ee) => m(ee) : void 0, G = (ee) => {
    W.current && (ee.stopPropagation(), W.current = !1);
  }, ne = (ee) => {
    const { domNode: ge, transform: ze } = R.getState();
    if (le.current = ge?.getBoundingClientRect(), !le.current)
      return;
    const Ce = ee.target === q.current;
    if (!Ce && !!ee.target.closest(".nokey") || !t || !(c && Ce || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), W.current = !1;
    const { x: Re, y: qe } = ga(ee.nativeEvent, le.current), ft = _l({ x: Re, y: qe }, ze);
    R.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Re,
        y: qe
      }
    }), Ce || (ee.stopPropagation(), ee.preventDefault());
  };
  function A(ee, ge) {
    const { userSelectionRect: ze } = R.getState();
    if (!ze)
      return;
    const { transform: Ce, nodeLookup: we, edgeLookup: xe, connectionLookup: Re, triggerNodeChanges: qe, triggerEdgeChanges: ft, defaultEdgeOptions: Te } = R.getState(), Ie = { x: ze.startX, y: ze.startY }, { x: Be, y: $e } = xl(Ie, Ce), wt = {
      startX: Ie.x,
      startY: Ie.y,
      x: ee < Be ? ee : Be,
      y: ge < $e ? ge : $e,
      width: Math.abs(ee - Be),
      height: Math.abs(ge - $e)
    }, Je = I.current, Qe = K.current;
    I.current = new Set(Kh(we, wt, Ce, r === Ho.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Fe = Te?.selectable ?? !0;
    for (const gt of I.current) {
      const yt = Re.get(gt);
      if (yt)
        for (const { edgeId: Xt } of yt.values()) {
          const Lt = xe.get(Xt);
          Lt && (Lt.selectable ?? Fe) && K.current.add(Xt);
        }
    }
    if (!Py(Je, I.current)) {
      const gt = cl(we, I.current, !0);
      qe(gt);
    }
    if (!Py(Qe, K.current)) {
      const gt = cl(xe, K.current);
      ft(gt);
    }
    R.setState({
      userSelectionRect: wt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function k() {
    if (!s || !le.current)
      return;
    const [ee, ge] = Ph(O.current, le.current, V);
    H({ x: ee, y: ge }).then((ze) => {
      if (!W.current || !ze) {
        N.current = requestAnimationFrame(k);
        return;
      }
      const { x: Ce, y: we } = O.current;
      A(Ce, we), N.current = requestAnimationFrame(k);
    });
  }
  const F = () => {
    cancelAnimationFrame(N.current), N.current = 0, $.current = !1;
  };
  M.useEffect(() => () => F(), []);
  const te = (ee) => {
    const { userSelectionRect: ge, transform: ze, resetSelectedElements: Ce } = R.getState();
    if (!le.current || !ge)
      return;
    const { x: we, y: xe } = ga(ee.nativeEvent, le.current);
    O.current = { x: we, y: xe };
    const Re = xl({ x: ge.startX, y: ge.startY }, ze);
    if (!W.current) {
      const qe = a ? 0 : u;
      if (Math.hypot(we - Re.x, xe - Re.y) <= qe)
        return;
      Ce(), h?.(ee);
    }
    W.current = !0, $.current || (k(), $.current = !0), A(we, xe);
  }, se = (ee) => {
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !z && ee.target === q.current && R.getState().userSelectionRect && _?.(ee), R.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), W.current && (p?.(ee), R.setState({
      nodesSelectionActive: I.current.size > 0
    })), F());
  }, he = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), F();
  }, me = o === !0 || Array.isArray(o) && o.includes(0);
  return w.jsxs("div", { className: Ft(["react-flow__pane", { draggable: me, dragging: j, selection: t }]), onClick: D ? void 0 : Yd(_, q), onContextMenu: Yd(L, q), onWheel: Yd(Z, q), onPointerEnter: D ? void 0 : v, onPointerMove: D ? te : x, onPointerUp: D ? se : void 0, onPointerCancel: D ? he : void 0, onPointerDownCapture: D ? ne : void 0, onClickCapture: D ? G : void 0, onPointerLeave: S, ref: q, style: dc, children: [T, w.jsx(yD, {})] });
}
function hh({ id: t, store: a, unselect: r = !1, nodeRef: o }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: h, onError: p } = a.getState(), g = h.get(t);
  if (!g) {
    p?.("012", ya.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), g.selected ? (r || g.selected && c) && (u({ nodes: [g], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : s([t]);
}
function mx({ nodeRef: t, disabled: a = !1, noDragClassName: r, handleSelector: o, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const h = zt(), [p, g] = M.useState(!1), y = M.useRef();
  return M.useEffect(() => {
    y.current = nM({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (m) => {
        hh({
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
        noDragClassName: r,
        handleSelector: o,
        domNode: t.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        y.current?.destroy();
      };
  }, [r, o, a, u, t, s, c]), p;
}
const xD = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function px() {
  const t = zt();
  return M.useCallback((r) => {
    const { nodeExtent: o, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: h, updateNodePositions: p, nodeLookup: g, nodeOrigin: y } = t.getState(), m = /* @__PURE__ */ new Map(), v = xD(c), x = s ? u[0] : 5, S = s ? u[1] : 5, T = r.direction.x * x * r.factor, N = r.direction.y * S * r.factor;
    for (const [, R] of g) {
      if (!v(R))
        continue;
      let z = {
        x: R.internals.positionAbsolute.x + T,
        y: R.internals.positionAbsolute.y + N
      };
      s && (z = Ko(z, u));
      const { position: E, positionAbsolute: j } = L1({
        nodeId: R.id,
        nextPosition: z,
        nodeLookup: g,
        nodeExtent: o,
        nodeOrigin: y,
        onError: h
      });
      R.position = E, R.internals.positionAbsolute = j, m.set(R.id, R);
    }
    p(m);
  }, []);
}
const lm = M.createContext(null), SD = lm.Provider;
lm.Consumer;
const gx = () => M.useContext(lm), wD = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), ED = (t, a, r) => (o) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = o, { fromHandle: h, toHandle: p, isValid: g } = c, y = p?.nodeId === t && p?.id === a && p?.type === r;
  return {
    connectingFrom: h?.nodeId === t && h?.id === a && h?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === t && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === yl.Strict ? h?.type !== r : t !== h?.nodeId || a !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && g
  };
};
function _D({ type: t = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: o = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: h, children: p, className: g, onMouseDown: y, onTouchStart: m, ...v }, x) {
  const S = c || null, T = t === "target", N = zt(), R = gx(), { connectOnClick: z, noPanClassName: E, rfId: j } = lt(wD, At), { connectingFrom: U, connectingTo: H, clickConnecting: V, isPossibleEndHandle: D, connectionInProcess: q, clickConnectionInProcess: le, valid: I } = lt(ED(R, S, t), At);
  R || N.getState().onError?.("010", ya.error010());
  const K = ($) => {
    const { defaultEdgeOptions: _, onConnect: L, hasDefaultEdges: Z } = N.getState(), G = {
      ..._,
      ...$
    };
    if (Z) {
      const { edges: ne, setEdges: A, onError: k } = N.getState();
      A(iD(G, ne, { onError: k }));
    }
    L?.(G), h?.(G);
  }, W = ($) => {
    if (!R)
      return;
    const _ = $1($.nativeEvent);
    if (s && (_ && $.button === 0 || !_)) {
      const L = N.getState();
      dh.onPointerDown($.nativeEvent, {
        handleDomNode: $.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: T,
        handleId: S,
        nodeId: R,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...Z) => N.getState().onConnectEnd?.(...Z),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...Z) => N.getState().isValidConnection?.(...Z) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    _ ? y?.($) : m?.($);
  }, O = ($) => {
    const { onClickConnectStart: _, onClickConnectEnd: L, connectionClickStartHandle: Z, connectionMode: G, isValidConnection: ne, lib: A, rfId: k, nodeLookup: F, connection: te } = N.getState();
    if (!R || !Z && !s)
      return;
    if (!Z) {
      _?.($.nativeEvent, { nodeId: R, handleId: S, handleType: t }), N.setState({ connectionClickStartHandle: { nodeId: R, type: t, id: S } });
      return;
    }
    const se = Y1($.target), he = r || ne, { connection: me, isValid: ee } = dh.isValid($.nativeEvent, {
      handle: {
        nodeId: R,
        id: S,
        type: t
      },
      connectionMode: G,
      fromNodeId: Z.nodeId,
      fromHandleId: Z.id || null,
      fromType: Z.type,
      isValidConnection: he,
      flowId: k,
      doc: se,
      lib: A,
      nodeLookup: F
    });
    ee && me && K(me);
    const ge = structuredClone(te);
    delete ge.inProgress, ge.toPosition = ge.toHandle ? ge.toHandle.position : null, L?.($, ge), N.setState({ connectionClickStartHandle: null });
  };
  return w.jsx("div", { "data-handleid": S, "data-nodeid": R, "data-handlepos": a, "data-id": `${j}-${R}-${S}-${t}`, className: Ft([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    g,
    {
      source: !T,
      target: T,
      connectable: o,
      connectablestart: s,
      connectableend: u,
      clickconnecting: V,
      connectingfrom: U,
      connectingto: H,
      valid: I,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!q || D) && (q || le ? u : s)
    }
  ]), onMouseDown: W, onTouchStart: W, onClick: z ? O : void 0, ref: x, ...v, children: p });
}
const wl = M.memo(dx(_D));
function ND({ data: t, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return w.jsxs(w.Fragment, { children: [t?.label, w.jsx(wl, { type: "source", position: r, isConnectable: a })] });
}
function RD({ data: t, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: o = Ae.Bottom }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(wl, { type: "target", position: r, isConnectable: a }), t?.label, w.jsx(wl, { type: "source", position: o, isConnectable: a })] });
}
function CD() {
  return null;
}
function TD({ data: t, isConnectable: a, targetPosition: r = Ae.Top }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(wl, { type: "target", position: r, isConnectable: a }), t?.label] });
}
const Zu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Cv = {
  input: ND,
  default: RD,
  output: TD,
  group: CD
};
function MD(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const DD = (t) => {
  const { width: a, height: r, x: o, y: s } = Fo(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: pa(a) ? a : null,
    height: pa(r) ? r : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${o}px,${s}px)`
  };
};
function AD({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: r }) {
  const o = zt(), { width: s, height: u, transformString: c, userSelectionActive: h } = lt(DD, At), p = px(), g = M.useRef(null);
  M.useEffect(() => {
    r || g.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !h && s !== null && u !== null;
  if (mx({
    nodeRef: g,
    disabled: !y
  }), !y)
    return null;
  const m = t ? (x) => {
    const S = o.getState().nodes.filter((T) => T.selected);
    t(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Zu, x.key) && (x.preventDefault(), p({
      direction: Zu[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return w.jsx("div", { className: Ft(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: w.jsx("div", { ref: g, className: "react-flow__nodesselection-rect", onContextMenu: m, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const Tv = typeof window < "u" ? window : void 0, zD = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function yx({ children: t, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: h, deleteKeyCode: p, selectionKeyCode: g, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: T, zoomActivationKeyCode: N, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: j, panOnScrollSpeed: U, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: D, autoPanOnSelection: q, defaultViewport: le, translateExtent: I, minZoom: K, maxZoom: W, preventScrolling: O, onSelectionContextMenu: $, noWheelClassName: _, noPanClassName: L, disableKeyboardA11y: Z, onViewportChange: G, isControlledViewport: ne }) {
  const { nodesSelectionActive: A, userSelectionActive: k } = lt(zD, At), F = ko(g, { target: Tv }), te = ko(T, { target: Tv }), se = te || D, he = te || j, me = y && se !== !0, ee = F || k || me;
  return dD({ deleteKeyCode: p, multiSelectionKeyCode: S }), w.jsx(pD, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: U, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: !F && se, defaultViewport: le, translateExtent: I, minZoom: K, maxZoom: W, zoomActivationKeyCode: N, preventScrolling: O, noWheelClassName: _, noPanClassName: L, onViewportChange: G, isControlledViewport: ne, paneClickDistance: h, selectionOnDrag: me, children: w.jsxs(bD, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: q, isSelecting: !!ee, selectionMode: m, selectionKeyPressed: F, paneClickDistance: h, selectionOnDrag: me, children: [t, A && w.jsx(AD, { onSelectionContextMenu: $, noPanClassName: L, disableKeyboardA11y: Z })] }) });
}
yx.displayName = "FlowRenderer";
const OD = M.memo(yx), jD = (t) => (a) => t ? Kh(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function LD(t) {
  return lt(M.useCallback(jD(t), [t]), At);
}
const HD = (t) => t.updateNodeInternals;
function BD() {
  const t = lt(HD), [a] = M.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
    const o = /* @__PURE__ */ new Map();
    r.forEach((s) => {
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
function UD({ node: t, nodeType: a, hasDimensions: r, resizeObserver: o }) {
  const s = zt(), u = M.useRef(null), c = M.useRef(null), h = M.useRef(t.sourcePosition), p = M.useRef(t.targetPosition), g = M.useRef(a), y = r && !!t.internals.handleBounds;
  return M.useEffect(() => {
    u.current && !t.hidden && (!y || c.current !== u.current) && (c.current && o?.unobserve(c.current), o?.observe(u.current), c.current = u.current);
  }, [y, t.hidden]), M.useEffect(() => () => {
    c.current && (o?.unobserve(c.current), c.current = null);
  }, []), M.useEffect(() => {
    if (u.current) {
      const m = g.current !== a, v = h.current !== t.sourcePosition, x = p.current !== t.targetPosition;
      (m || v || x) && (g.current = a, h.current = t.sourcePosition, p.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, a, t.sourcePosition, t.targetPosition]), u;
}
function kD({ id: t, onClick: a, onMouseEnter: r, onMouseMove: o, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: h, elementsSelectable: p, nodesConnectable: g, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: T, nodeTypes: N, nodeClickDistance: R, onError: z }) {
  const { node: E, internals: j, isParent: U } = lt((ee) => {
    const ge = ee.nodeLookup.get(t), ze = ee.parentLookup.has(t);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let H = E.type || "default", V = N?.[H] || Cv[H];
  V === void 0 && (z?.("003", ya.error003(H)), H = "default", V = N?.default || Cv.default);
  const D = !!(E.draggable || h && typeof E.draggable > "u"), q = !!(E.selectable || p && typeof E.selectable > "u"), le = !!(E.connectable || g && typeof E.connectable > "u"), I = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), W = k1(E), O = UD({ node: E, nodeType: H, hasDimensions: W, resizeObserver: m }), $ = mx({
    nodeRef: O,
    disabled: E.hidden || !D,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: t,
    isSelectable: q,
    nodeClickDistance: R
  }), _ = px();
  if (E.hidden)
    return null;
  const L = oi(E), Z = MD(E), G = q || D || a || r || o || s, ne = r ? (ee) => r(ee, { ...j.userNode }) : void 0, A = o ? (ee) => o(ee, { ...j.userNode }) : void 0, k = s ? (ee) => s(ee, { ...j.userNode }) : void 0, F = u ? (ee) => u(ee, { ...j.userNode }) : void 0, te = c ? (ee) => c(ee, { ...j.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    q && (!ge || !D || ze > 0) && hh({
      id: t,
      store: K,
      nodeRef: O
    }), a && a(ee, { ...j.userNode });
  }, he = (ee) => {
    if (!(q1(ee.nativeEvent) || S)) {
      if (D1.includes(ee.key) && q) {
        const ge = ee.key === "Escape";
        hh({
          id: t,
          store: K,
          unselect: ge,
          nodeRef: O
        });
      } else if (D && E.selected && Object.prototype.hasOwnProperty.call(Zu, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: ge } = K.getState();
        K.setState({
          ariaLiveMessage: ge["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~j.positionAbsolute.x,
            y: ~~j.positionAbsolute.y
          })
        }), _({
          direction: Zu[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, me = () => {
    if (S || !O.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: ge, height: ze, autoPanOnNodeFocus: Ce, setCenter: we } = K.getState();
    if (!Ce)
      return;
    Kh(/* @__PURE__ */ new Map([[t, E]]), { x: 0, y: 0, width: ge, height: ze }, ee, !0).length > 0 || we(E.position.x + L.width / 2, E.position.y + L.height / 2, {
      zoom: ee[2]
    });
  };
  return w.jsx("div", { className: Ft([
    "react-flow__node",
    `react-flow__node-${H}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: D
    },
    E.className,
    {
      selected: E.selected,
      selectable: q,
      parent: U,
      draggable: D,
      dragging: $
    }
  ]), ref: O, style: {
    zIndex: j.z,
    transform: `translate(${j.positionAbsolute.x}px,${j.positionAbsolute.y}px)`,
    pointerEvents: G ? "all" : "none",
    visibility: W ? "visible" : "hidden",
    ...E.style,
    ...Z
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: ne, onMouseMove: A, onMouseLeave: k, onContextMenu: F, onClick: se, onDoubleClick: te, onKeyDown: I ? he : void 0, tabIndex: I ? 0 : void 0, onFocus: I ? me : void 0, role: E.ariaRole ?? (I ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${sx}-${T}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: w.jsx(SD, { value: t, children: w.jsx(V, { id: t, data: E.data, type: H, positionAbsoluteX: j.positionAbsolute.x, positionAbsoluteY: j.positionAbsolute.y, selected: E.selected ?? !1, selectable: q, draggable: D, deletable: E.deletable ?? !0, isConnectable: le, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: $, dragHandle: E.dragHandle, zIndex: j.z, parentId: E.parentId, ...L }) }) });
}
var VD = M.memo(kD);
const YD = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function vx(t) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: o, elementsSelectable: s, onError: u } = lt(YD, At), c = LD(t.onlyRenderVisibleElements), h = BD();
  return w.jsx("div", { className: "react-flow__nodes", style: dc, children: c.map((p) => (
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
    w.jsx(VD, { id: p, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: r, nodesFocusable: o, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, p)
  )) });
}
vx.displayName = "NodeRenderer";
const qD = M.memo(vx);
function $D(t) {
  return lt(M.useCallback((r) => {
    if (!t)
      return r.edges.map((s) => s.id);
    const o = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && BT({
          sourceNode: u,
          targetNode: c,
          width: r.width,
          height: r.height,
          transform: r.transform
        }) && o.push(s.id);
      }
    return o;
  }, [t]), At);
}
const XD = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return w.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, GD = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return w.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Mv = {
  [Gu.Arrow]: XD,
  [Gu.ArrowClosed]: GD
};
function ID(t) {
  const a = zt();
  return M.useMemo(() => Object.prototype.hasOwnProperty.call(Mv, t) ? Mv[t] : (a.getState().onError?.("009", ya.error009(t)), null), [t]);
}
const ZD = ({ id: t, type: a, color: r, width: o = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: h = "auto-start-reverse" }) => {
  const p = ID(a);
  return p ? w.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${o}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: w.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, bx = ({ defaultColor: t, rfId: a }) => {
  const r = lt((u) => u.edges), o = lt((u) => u.defaultEdgeOptions), s = M.useMemo(() => GT(r, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [r, o, a, t]);
  return s.length ? w.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: w.jsx("defs", { children: s.map((u) => w.jsx(ZD, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
bx.displayName = "MarkerDefinitions";
var QD = M.memo(bx);
function xx({ x: t, y: a, label: r, labelStyle: o, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: h = 2, children: p, className: g, ...y }) {
  const [m, v] = M.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Ft(["react-flow__edge-textwrapper", g]), S = M.useRef(null);
  return M.useEffect(() => {
    if (S.current) {
      const T = S.current.getBBox();
      v({
        x: T.x,
        y: T.y,
        width: T.width,
        height: T.height
      });
    }
  }, [r]), r ? w.jsxs("g", { transform: `translate(${t - m.width / 2} ${a - m.height / 2})`, className: x, visibility: m.width ? "visible" : "hidden", ...y, children: [s && w.jsx("rect", { width: m.width + 2 * c[0], x: -c[0], y: -c[1], height: m.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), w.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: S, style: o, children: r }), p] }) : null;
}
xx.displayName = "EdgeText";
const FD = M.memo(xx);
function hc({ path: t, labelX: a, labelY: r, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: p, interactionWidth: g = 20, ...y }) {
  return w.jsxs(w.Fragment, { children: [w.jsx("path", { ...y, d: t, fill: "none", className: Ft(["react-flow__edge-path", y.className]) }), g ? w.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: g, className: "react-flow__edge-interaction" }) : null, o && pa(a) && pa(r) ? w.jsx(FD, { x: a, y: r, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: p }) : null] });
}
function Dv({ pos: t, x1: a, y1: r, x2: o, y2: s }) {
  return t === Ae.Left || t === Ae.Right ? [0.5 * (a + o), r] : [a, 0.5 * (r + s)];
}
function Sx({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: o, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, h] = Dv({
    pos: r,
    x1: t,
    y1: a,
    x2: o,
    y2: s
  }), [p, g] = Dv({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a
  }), [y, m, v, x] = X1({
    sourceX: t,
    sourceY: a,
    targetX: o,
    targetY: s,
    sourceControlX: c,
    sourceControlY: h,
    targetControlX: p,
    targetControlY: g
  });
  return [
    `M${t},${a} C${c},${h} ${p},${g} ${o},${s}`,
    y,
    m,
    v,
    x
  ];
}
function wx(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, sourcePosition: c, targetPosition: h, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, interactionWidth: R }) => {
    const [z, E, j] = Sx({
      sourceX: r,
      sourceY: o,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), U = t.isInternal ? void 0 : a;
    return w.jsx(hc, { id: U, path: z, labelX: E, labelY: j, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, interactionWidth: R });
  });
}
const KD = wx({ isInternal: !1 }), Ex = wx({ isInternal: !0 });
KD.displayName = "SimpleBezierEdge";
Ex.displayName = "SimpleBezierEdgeInternal";
function _x(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: x = Ae.Bottom, targetPosition: S = Ae.Top, markerEnd: T, markerStart: N, pathOptions: R, interactionWidth: z }) => {
    const [E, j, U] = uh({
      sourceX: r,
      sourceY: o,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: R?.borderRadius,
      offset: R?.offset,
      stepPosition: R?.stepPosition
    }), H = t.isInternal ? void 0 : a;
    return w.jsx(hc, { id: H, path: E, labelX: j, labelY: U, label: c, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: T, markerStart: N, interactionWidth: z });
  });
}
const Nx = _x({ isInternal: !1 }), Rx = _x({ isInternal: !0 });
Nx.displayName = "SmoothStepEdge";
Rx.displayName = "SmoothStepEdgeInternal";
function Cx(t) {
  return M.memo(({ id: a, ...r }) => {
    const o = t.isInternal ? void 0 : a;
    return w.jsx(Nx, { ...r, id: o, pathOptions: M.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const PD = Cx({ isInternal: !1 }), Tx = Cx({ isInternal: !0 });
PD.displayName = "StepEdge";
Tx.displayName = "StepEdgeInternal";
function Mx(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: T }) => {
    const [N, R, z] = Z1({ sourceX: r, sourceY: o, targetX: s, targetY: u }), E = t.isInternal ? void 0 : a;
    return w.jsx(hc, { id: E, path: N, labelX: R, labelY: z, label: c, labelStyle: h, labelShowBg: p, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: T });
  });
}
const JD = Mx({ isInternal: !1 }), Dx = Mx({ isInternal: !0 });
JD.displayName = "StraightEdge";
Dx.displayName = "StraightEdgeInternal";
function Ax(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: h = Ae.Top, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, pathOptions: R, interactionWidth: z }) => {
    const [E, j, U] = G1({
      sourceX: r,
      sourceY: o,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: R?.curvature
    }), H = t.isInternal ? void 0 : a;
    return w.jsx(hc, { id: H, path: E, labelX: j, labelY: U, label: p, labelStyle: g, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, interactionWidth: z });
  });
}
const WD = Ax({ isInternal: !1 }), zx = Ax({ isInternal: !0 });
WD.displayName = "BezierEdge";
zx.displayName = "BezierEdgeInternal";
const Av = {
  default: zx,
  straight: Dx,
  step: Tx,
  smoothstep: Rx,
  simplebezier: Ex
}, zv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, eA = (t, a, r) => r === Ae.Left ? t - a : r === Ae.Right ? t + a : t, tA = (t, a, r) => r === Ae.Top ? t - a : r === Ae.Bottom ? t + a : t, Ov = "react-flow__edgeupdater";
function jv({ position: t, centerX: a, centerY: r, radius: o = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: h }) {
  return w.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Ft([Ov, `${Ov}-${h}`]), cx: eA(a, o, t), cy: tA(r, o, t), r: o, stroke: "transparent", fill: "transparent" });
}
function nA({ isReconnectable: t, reconnectRadius: a, edge: r, sourceX: o, sourceY: s, targetX: u, targetY: c, sourcePosition: h, targetPosition: p, onReconnect: g, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: x }) {
  const S = zt(), T = (j, U) => {
    if (j.button !== 0)
      return;
    const { autoPanOnConnect: H, domNode: V, connectionMode: D, connectionRadius: q, lib: le, onConnectStart: I, cancelConnection: K, nodeLookup: W, rfId: O, panBy: $, updateConnection: _ } = S.getState(), L = U.type === "target", Z = (A, k) => {
      v(!1), m?.(A, r, U.type, k);
    }, G = (A) => g?.(r, A), ne = (A, k) => {
      v(!0), y?.(j, r, U.type), I?.(A, k);
    };
    dh.onPointerDown(j.nativeEvent, {
      autoPanOnConnect: H,
      connectionMode: D,
      connectionRadius: q,
      domNode: V,
      handleId: U.id,
      nodeId: U.nodeId,
      nodeLookup: W,
      isTarget: L,
      edgeUpdaterType: U.type,
      lib: le,
      flowId: O,
      cancelConnection: K,
      panBy: $,
      isValidConnection: (...A) => S.getState().isValidConnection?.(...A) ?? !0,
      onConnect: G,
      onConnectStart: ne,
      onConnectEnd: (...A) => S.getState().onConnectEnd?.(...A),
      onReconnectEnd: Z,
      updateConnection: _,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: j.currentTarget
    });
  }, N = (j) => T(j, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), R = (j) => T(j, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), z = () => x(!0), E = () => x(!1);
  return w.jsxs(w.Fragment, { children: [(t === !0 || t === "source") && w.jsx(jv, { position: h, centerX: o, centerY: s, radius: a, onMouseDown: N, onMouseEnter: z, onMouseOut: E, type: "source" }), (t === !0 || t === "target") && w.jsx(jv, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function aA({ id: t, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: o, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: T, noPanClassName: N, onError: R, disableKeyboardA11y: z }) {
  let E = lt((we) => we.edgeLookup.get(t));
  const j = lt((we) => we.defaultEdgeOptions);
  E = j ? { ...j, ...E } : E;
  let U = E.type || "default", H = T?.[U] || Av[U];
  H === void 0 && (R?.("011", ya.error011(U)), U = "default", H = T?.default || Av.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), D = typeof m < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), q = !!(E.selectable || o && typeof E.selectable > "u"), le = M.useRef(null), [I, K] = M.useState(!1), [W, O] = M.useState(!1), $ = zt(), { zIndex: _, sourceX: L, sourceY: Z, targetX: G, targetY: ne, sourcePosition: A, targetPosition: k } = lt(M.useCallback((we) => {
    const xe = we.nodeLookup.get(E.source), Re = we.nodeLookup.get(E.target);
    if (!xe || !Re)
      return {
        zIndex: E.zIndex,
        ...zv
      };
    const qe = XT({
      id: t,
      sourceNode: xe,
      targetNode: Re,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: we.connectionMode,
      onError: R
    });
    return {
      zIndex: HT({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Re,
        elevateOnSelect: we.elevateEdgesOnSelect,
        zIndexMode: we.zIndexMode
      }),
      ...qe || zv
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), F = M.useMemo(() => E.markerStart ? `url('#${ch(E.markerStart, S)}')` : void 0, [E.markerStart, S]), te = M.useMemo(() => E.markerEnd ? `url('#${ch(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || L === null || Z === null || G === null || ne === null)
    return null;
  const se = (we) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Re, multiSelectionActive: qe } = $.getState();
    q && ($.setState({ nodesSelectionActive: !1 }), E.selected && qe ? (Re({ nodes: [], edges: [E] }), le.current?.blur()) : xe([t])), s && s(we, E);
  }, he = u ? (we) => {
    u(we, { ...E });
  } : void 0, me = c ? (we) => {
    c(we, { ...E });
  } : void 0, ee = h ? (we) => {
    h(we, { ...E });
  } : void 0, ge = p ? (we) => {
    p(we, { ...E });
  } : void 0, ze = g ? (we) => {
    g(we, { ...E });
  } : void 0, Ce = (we) => {
    if (!z && D1.includes(we.key) && q) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Re } = $.getState();
      we.key === "Escape" ? (le.current?.blur(), xe({ edges: [E] })) : Re([t]);
    }
  };
  return w.jsx("svg", { style: { zIndex: _ }, children: w.jsxs("g", { className: Ft([
    "react-flow__edge",
    `react-flow__edge-${U}`,
    E.className,
    N,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !q && !s,
      updating: I,
      selectable: q
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: ee, onMouseMove: ge, onMouseLeave: ze, onKeyDown: V ? Ce : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${ux}-${S}` : void 0, ref: le, ...E.domAttributes, children: [!W && w.jsx(H, { id: t, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: q, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: Z, targetX: G, targetY: ne, sourcePosition: A, targetPosition: k, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: F, markerEnd: te, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), D && w.jsx(nA, { edge: E, isReconnectable: D, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, sourceX: L, sourceY: Z, targetX: G, targetY: ne, sourcePosition: A, targetPosition: k, setUpdateHover: K, setReconnecting: O })] }) });
}
var iA = M.memo(aA);
const rA = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Ox({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: r, edgeTypes: o, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: h, onEdgeMouseMove: p, onEdgeMouseLeave: g, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: T }) {
  const { edgesFocusable: N, edgesReconnectable: R, elementsSelectable: z, onError: E } = lt(rA, At), j = $D(a);
  return w.jsxs("div", { className: "react-flow__edges", children: [w.jsx(QD, { defaultColor: t, rfId: r }), j.map((U) => w.jsx(iA, { id: U, edgesFocusable: N, edgesReconnectable: R, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: h, onMouseMove: p, onMouseLeave: g, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: r, onError: E, edgeTypes: o, disableKeyboardA11y: T }, U))] });
}
Ox.displayName = "EdgeRenderer";
const lA = M.memo(Ox), oA = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function sA({ children: t }) {
  const a = lt(oA);
  return w.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function uA(t) {
  const a = rm(), r = M.useRef(!1);
  M.useEffect(() => {
    !r.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), r.current = !0);
  }, [t, a.viewportInitialized]);
}
const cA = (t) => t.panZoom?.syncViewport;
function fA(t) {
  const a = lt(cA), r = zt();
  return M.useEffect(() => {
    t && (a?.(t), r.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function dA(t) {
  return t.connection.inProgress ? { ...t.connection, to: _l(t.connection.to, t.transform) } : { ...t.connection };
}
function hA(t) {
  return dA;
}
function mA(t) {
  const a = hA();
  return lt(a, At);
}
const pA = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function gA({ containerStyle: t, style: a, type: r, component: o }) {
  const { nodesConnectable: s, width: u, height: c, isValid: h, inProgress: p } = lt(pA, At);
  return !(u && s && p) ? null : w.jsx("svg", { style: t, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: w.jsx("g", { className: Ft(["react-flow__connection", O1(h)]), children: w.jsx(jx, { style: a, type: r, CustomComponent: o, isValid: h }) }) });
}
const jx = ({ style: t, type: a = Yi.Bezier, CustomComponent: r, isValid: o }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: h, fromPosition: p, to: g, toNode: y, toHandle: m, toPosition: v, pointer: x } = mA();
  if (!s)
    return;
  if (r)
    return w.jsx(r, { connectionLineType: a, connectionLineStyle: t, fromNode: c, fromHandle: h, fromX: u.x, fromY: u.y, toX: g.x, toY: g.y, fromPosition: p, toPosition: v, connectionStatus: O1(o), toNode: y, toHandle: m, pointer: x });
  let S = "";
  const T = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: g.x,
    targetY: g.y,
    targetPosition: v
  };
  switch (a) {
    case Yi.Bezier:
      [S] = G1(T);
      break;
    case Yi.SimpleBezier:
      [S] = Sx(T);
      break;
    case Yi.Step:
      [S] = uh({
        ...T,
        borderRadius: 0
      });
      break;
    case Yi.SmoothStep:
      [S] = uh(T);
      break;
    default:
      [S] = Z1(T);
  }
  return w.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: t });
};
jx.displayName = "ConnectionLine";
const yA = {};
function Lv(t = yA) {
  M.useRef(t), zt(), M.useEffect(() => {
  }, [t]);
}
function vA() {
  zt(), M.useRef(!1), M.useEffect(() => {
  }, []);
}
function Lx({ nodeTypes: t, edgeTypes: a, onInit: r, onNodeClick: o, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: T, connectionLineComponent: N, connectionLineContainerStyle: R, selectionKeyCode: z, selectionOnDrag: E, selectionMode: j, multiSelectionKeyCode: U, panActivationKeyCode: H, zoomActivationKeyCode: V, deleteKeyCode: D, onlyRenderVisibleElements: q, elementsSelectable: le, defaultViewport: I, translateExtent: K, minZoom: W, maxZoom: O, preventScrolling: $, defaultMarkerColor: _, zoomOnScroll: L, zoomOnPinch: Z, panOnScroll: G, panOnScrollSpeed: ne, panOnScrollMode: A, zoomOnDoubleClick: k, panOnDrag: F, autoPanOnSelection: te, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Ce, nodeClickDistance: we, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: qe, onEdgeMouseLeave: ft, reconnectRadius: Te, onReconnect: Ie, onReconnectStart: Be, onReconnectEnd: $e, noDragClassName: wt, noWheelClassName: Je, noPanClassName: Qe, disableKeyboardA11y: Fe, nodeExtent: gt, rfId: yt, viewport: Xt, onViewportChange: Lt }) {
  return Lv(t), Lv(a), vA(), uA(r), fA(Xt), w.jsx(OD, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Ce, deleteKeyCode: D, selectionKeyCode: z, selectionOnDrag: E, selectionMode: j, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: U, panActivationKeyCode: H, zoomActivationKeyCode: V, elementsSelectable: le, zoomOnScroll: L, zoomOnPinch: Z, zoomOnDoubleClick: k, panOnScroll: G, panOnScrollSpeed: ne, panOnScrollMode: A, panOnDrag: F, autoPanOnSelection: te, defaultViewport: I, translateExtent: K, minZoom: W, maxZoom: O, onSelectionContextMenu: m, preventScrolling: $, noDragClassName: wt, noWheelClassName: Je, noPanClassName: Qe, disableKeyboardA11y: Fe, onViewportChange: Lt, isControlledViewport: !!Xt, children: w.jsxs(sA, { children: [w.jsx(lA, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Ie, onReconnectStart: Be, onReconnectEnd: $e, onlyRenderVisibleElements: q, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: qe, onEdgeMouseLeave: ft, reconnectRadius: Te, defaultMarkerColor: _, noPanClassName: Qe, disableKeyboardA11y: Fe, rfId: yt }), w.jsx(gA, { style: T, type: S, component: N, containerStyle: R }), w.jsx("div", { className: "react-flow__edgelabel-renderer" }), w.jsx(qD, { nodeTypes: t, onNodeClick: o, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: p, onNodeMouseLeave: g, onNodeContextMenu: y, nodeClickDistance: we, onlyRenderVisibleElements: q, noPanClassName: Qe, noDragClassName: wt, disableKeyboardA11y: Fe, nodeExtent: gt, rfId: yt }), w.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Lx.displayName = "GraphView";
const bA = M.memo(Lx), xA = U1(), Hv = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: o, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: p = 0.5, maxZoom: g = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), R = o ?? a ?? [], z = r ?? t ?? [], E = y ?? [0, 0], j = m ?? Lo;
  K1(T, N, R);
  const { nodesInitialized: U } = fh(z, x, S, {
    nodeOrigin: E,
    nodeExtent: j,
    zIndexMode: v
  });
  let H = [0, 0, 1];
  if (c && s && u) {
    const V = Fo(x, {
      filter: (I) => !!((I.width || I.initialWidth) && (I.height || I.initialHeight))
    }), { x: D, y: q, zoom: le } = Jh(V, s, u, p, g, h?.padding ?? 0.1);
    H = [D, q, le];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: H,
    nodes: z,
    nodesInitialized: U,
    nodeLookup: x,
    parentLookup: S,
    edges: R,
    edgeLookup: N,
    connectionLookup: T,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: g,
    translateExtent: Lo,
    nodeExtent: j,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: yl.Strict,
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
    connection: { ...z1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: xA,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: A1,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, SA = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: o, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: p, maxZoom: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => zM((x, S) => {
  async function T() {
    const { nodeLookup: N, panZoom: R, fitViewOptions: z, fitViewResolver: E, width: j, height: U, minZoom: H, maxZoom: V } = S();
    R && (await MT({
      nodes: N,
      width: j,
      height: U,
      panZoom: R,
      minZoom: H,
      maxZoom: V
    }, z), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...Hv({
      nodes: t,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: h,
      minZoom: p,
      maxZoom: g,
      nodeOrigin: y,
      nodeExtent: m,
      defaultNodes: r,
      defaultEdges: o,
      zIndexMode: v
    }),
    setNodes: (N) => {
      const { nodeLookup: R, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: j, fitViewQueued: U, zIndexMode: H, nodesSelectionActive: V } = S(), { nodesInitialized: D, hasSelectedNodes: q } = fh(N, R, z, {
        nodeOrigin: E,
        nodeExtent: m,
        elevateNodesOnSelect: j,
        checkEquality: !0,
        zIndexMode: H
      }), le = V && q;
      U && D ? (T(), x({
        nodes: N,
        nodesInitialized: D,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: le
      })) : x({ nodes: N, nodesInitialized: D, nodesSelectionActive: le });
    },
    setEdges: (N) => {
      const { connectionLookup: R, edgeLookup: z } = S();
      K1(R, z, N), x({ edges: N });
    },
    setDefaultNodesAndEdges: (N, R) => {
      if (N) {
        const { setNodes: z } = S();
        z(N), x({ hasDefaultNodes: !0 });
      }
      if (R) {
        const { setEdges: z } = S();
        z(R), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: R, nodeLookup: z, parentLookup: E, domNode: j, nodeOrigin: U, nodeExtent: H, debug: V, fitViewQueued: D, zIndexMode: q } = S(), { changes: le, updatedInternals: I } = JT(N, z, E, j, U, H, q);
      I && (QT(z, E, { nodeOrigin: U, nodeExtent: H, zIndexMode: q }), D ? (T(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), le?.length > 0 && (V && console.log("React Flow: trigger node changes", le), R?.(le)));
    },
    updateNodePositions: (N, R = !1) => {
      const z = [];
      let E = [];
      const { nodeLookup: j, triggerNodeChanges: U, connection: H, updateConnection: V, onNodesChangeMiddlewareMap: D } = S();
      for (const [q, le] of N) {
        const I = j.get(q), K = !!(I?.expandParent && I?.parentId && le?.position), W = {
          id: q,
          type: "position",
          position: K ? {
            x: Math.max(0, le.position.x),
            y: Math.max(0, le.position.y)
          } : le.position,
          dragging: R
        };
        if (I && H.inProgress && H.fromNode.id === I.id) {
          const O = Er(I, H.fromHandle, Ae.Left, !0);
          V({ ...H, from: O });
        }
        K && I.parentId && z.push({
          id: q,
          parentId: I.parentId,
          rect: {
            ...le.internals.positionAbsolute,
            width: le.measured.width ?? 0,
            height: le.measured.height ?? 0
          }
        }), E.push(W);
      }
      if (z.length > 0) {
        const { parentLookup: q, nodeOrigin: le } = S(), I = im(z, j, q, le);
        E.push(...I);
      }
      for (const q of D.values())
        E = q(E);
      U(E);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: R, setNodes: z, nodes: E, hasDefaultNodes: j, debug: U } = S();
      if (N?.length) {
        if (j) {
          const H = tD(N, E);
          z(H);
        }
        U && console.log("React Flow: trigger node changes", N), R?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: R, setEdges: z, edges: E, hasDefaultEdges: j, debug: U } = S();
      if (N?.length) {
        if (j) {
          const H = nD(N, E);
          z(H);
        }
        U && console.log("React Flow: trigger edge changes", N), R?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: j, triggerEdgeChanges: U } = S();
      if (R) {
        const H = N.map((V) => hr(V, !0));
        j(H);
        return;
      }
      j(cl(E, /* @__PURE__ */ new Set([...N]), !0)), U(cl(z));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: j, triggerEdgeChanges: U } = S();
      if (R) {
        const H = N.map((V) => hr(V, !0));
        U(H);
        return;
      }
      U(cl(z, /* @__PURE__ */ new Set([...N]))), j(cl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: R } = {}) => {
      const { edges: z, nodes: E, nodeLookup: j, triggerNodeChanges: U, triggerEdgeChanges: H } = S(), V = N || E, D = R || z, q = [];
      for (const I of V) {
        if (!I.selected)
          continue;
        const K = j.get(I.id);
        K && (K.selected = !1), q.push(hr(I.id, !1));
      }
      const le = [];
      for (const I of D)
        I.selected && le.push(hr(I.id, !1));
      U(q), H(le);
    },
    setMinZoom: (N) => {
      const { panZoom: R, maxZoom: z } = S();
      R?.setScaleExtent([N, z]), x({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: R, minZoom: z } = S();
      R?.setScaleExtent([z, N]), x({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      S().panZoom?.setTranslateExtent(N), x({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: R, triggerNodeChanges: z, triggerEdgeChanges: E, elementsSelectable: j } = S();
      if (!j)
        return;
      const U = R.reduce((V, D) => D.selected ? [...V, hr(D.id, !1)] : V, []), H = N.reduce((V, D) => D.selected ? [...V, hr(D.id, !1)] : V, []);
      z(U), E(H);
    },
    setNodeExtent: (N) => {
      const { nodes: R, nodeLookup: z, parentLookup: E, nodeOrigin: j, elevateNodesOnSelect: U, nodeExtent: H, zIndexMode: V } = S();
      N[0][0] === H[0][0] && N[0][1] === H[0][1] && N[1][0] === H[1][0] && N[1][1] === H[1][1] || (fh(R, z, E, {
        nodeOrigin: j,
        nodeExtent: N,
        elevateNodesOnSelect: U,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: R, width: z, height: E, panZoom: j, translateExtent: U } = S();
      return WT({ delta: N, panZoom: j, transform: R, translateExtent: U, width: z, height: E });
    },
    setCenter: async (N, R, z) => {
      const { width: E, height: j, maxZoom: U, panZoom: H } = S();
      if (!H)
        return !1;
      const V = typeof z?.zoom < "u" ? z.zoom : U;
      return await H.setViewport({
        x: E / 2 - N * V,
        y: j / 2 - R * V,
        zoom: V
      }, { duration: z?.duration, ease: z?.ease, interpolate: z?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...z1 }
      });
    },
    updateConnection: (N) => {
      x({ connection: N });
    },
    reset: () => x({ ...Hv() })
  };
}, Object.is);
function Hx({ initialNodes: t, initialEdges: a, defaultNodes: r, defaultEdges: o, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: h, initialFitViewOptions: p, fitView: g, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: x }) {
  const [S] = M.useState(() => SA({
    nodes: t,
    edges: a,
    defaultNodes: r,
    defaultEdges: o,
    width: s,
    height: u,
    fitView: g,
    minZoom: c,
    maxZoom: h,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: m,
    zIndexMode: v
  }));
  return w.jsx(LM, { value: S, children: w.jsx(sD, { children: x }) });
}
function wA({ children: t, nodes: a, edges: r, defaultNodes: o, defaultEdges: s, width: u, height: c, fitView: h, fitViewOptions: p, minZoom: g, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x }) {
  return M.useContext(cc) ? w.jsx(w.Fragment, { children: t }) : w.jsx(Hx, { initialNodes: a, initialEdges: r, defaultNodes: o, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: h, initialFitViewOptions: p, initialMinZoom: g, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x, children: t });
}
const EA = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function _A({ nodes: t, edges: a, defaultNodes: r, defaultEdges: o, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: h, onEdgeClick: p, onInit: g, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: T, onClickConnectStart: N, onClickConnectEnd: R, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: j, onNodeContextMenu: U, onNodeDoubleClick: H, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: q, onNodesDelete: le, onEdgesDelete: I, onDelete: K, onSelectionChange: W, onSelectionDragStart: O, onSelectionDrag: $, onSelectionDragStop: _, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: G, onBeforeDelete: ne, connectionMode: A, connectionLineType: k = Yi.Bezier, connectionLineStyle: F, connectionLineComponent: te, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ee = !1, selectionMode: ge = Ho.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Ce = Uo() ? "Meta" : "Control", zoomActivationKeyCode: we = Uo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Re, onlyRenderVisibleElements: qe = !1, selectNodesOnDrag: ft, nodesDraggable: Te, autoPanOnNodeFocus: Ie, nodesConnectable: Be, nodesFocusable: $e, nodeOrigin: wt = cx, edgesFocusable: Je, edgesReconnectable: Qe, elementsSelectable: Fe = !0, defaultViewport: gt = QM, minZoom: yt = 0.5, maxZoom: Xt = 2, translateExtent: Lt = Lo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: qn = "#b1b1b7", zoomOnScroll: yn = !0, zoomOnPinch: tn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: kt = vr.Free, zoomOnDoubleClick: si = !0, panOnDrag: Sa = !0, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Mn, onPaneMouseLeave: $n, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Pt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: B, onEdgeMouseMove: Q, onEdgeMouseLeave: J, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: Se = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: De, connectOnClick: ke, attributionPosition: je, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Rt = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: wa = !0, autoPanSpeed: Dn, connectionRadius: cn, isValidConnection: nn, onError: bn, style: ui, id: xn, nodeDragThreshold: ci, connectionDragThreshold: oa, viewport: sa, onViewportChange: Ue, width: bt, height: pn, colorMode: An = "light", debug: fi, onScroll: Ha, ariaLabelConfig: dt, zIndexMode: Xn = "basic", ...an }, Ii) {
  const Nr = xn || "1", Nl = JM(An), di = M.useCallback((Rl) => {
    Rl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ha?.(Rl);
  }, [Ha]);
  return w.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: di, style: { ...ui, ...EA }, ref: Ii, className: Ft(["react-flow", s, Nl]), id: xn, role: "application", children: w.jsxs(wA, { nodes: t, edges: a, width: bt, height: pn, fitView: Me, fitViewOptions: De, minZoom: yt, maxZoom: Xt, nodeOrigin: wt, nodeExtent: ot, zIndexMode: Xn, children: [w.jsx(PM, { nodes: t, edges: a, defaultNodes: r, defaultEdges: o, onConnect: x, onConnectStart: S, onConnectEnd: T, onClickConnectStart: N, onClickConnectEnd: R, nodesDraggable: Te, autoPanOnNodeFocus: Ie, nodesConnectable: Be, nodesFocusable: $e, edgesFocusable: Je, edgesReconnectable: Qe, elementsSelectable: Fe, elevateNodesOnSelect: Rt, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: Xt, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Re, connectionMode: A, translateExtent: Lt, connectOnClick: ke, defaultEdgeOptions: rt, fitView: Me, fitViewOptions: De, onNodesDelete: le, onEdgesDelete: I, onDelete: K, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: q, onSelectionDrag: $, onSelectionDragStart: O, onSelectionDragStop: _, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: be, nodeOrigin: wt, rfId: Nr, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: Dn, onError: bn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: ci, connectionDragThreshold: oa, onBeforeDelete: ne, debug: fi, ariaLabelConfig: dt, zIndexMode: Xn }), w.jsx(bA, { onInit: g, onNodeClick: h, onEdgeClick: p, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: j, onNodeContextMenu: U, onNodeDoubleClick: H, nodeTypes: u, edgeTypes: c, connectionLineType: k, connectionLineStyle: F, connectionLineComponent: te, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: ee, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Ce, panActivationKeyCode: ze, zoomActivationKeyCode: we, onlyRenderVisibleElements: qe, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: Xt, preventScrolling: mt, zoomOnScroll: yn, zoomOnPinch: tn, zoomOnDoubleClick: si, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: kt, panOnDrag: Sa, autoPanOnSelection: wa, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Mn, onPaneMouseLeave: $n, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: G, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Pt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: B, onEdgeMouseMove: Q, onEdgeMouseLeave: J, reconnectRadius: de, defaultMarkerColor: qn, noDragClassName: ve, noWheelClassName: Se, noPanClassName: be, rfId: Nr, disableKeyboardA11y: We, nodeExtent: ot, viewport: sa, onViewportChange: Ue }), w.jsx(ZM, { onSelectionChange: W }), Vt, w.jsx(qM, { proOptions: Ge, position: je }), w.jsx(YM, { rfId: Nr, disableKeyboardA11y: We })] }) });
}
var NA = dx(_A);
function RA({ dimensions: t, lineWidth: a, variant: r, className: o }) {
  return w.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Ft(["react-flow__background-pattern", r, o]) });
}
function CA({ radius: t, className: a }) {
  return w.jsx("circle", { cx: t, cy: t, r: t, className: Ft(["react-flow__background-pattern", "dots", a]) });
}
var Oa;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(Oa || (Oa = {}));
const TA = {
  [Oa.Dots]: 1,
  [Oa.Lines]: 1,
  [Oa.Cross]: 6
}, MA = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function Bx({
  id: t,
  variant: a = Oa.Dots,
  // only used for dots and cross
  gap: r = 20,
  // only used for lines and cross
  size: o,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: h,
  style: p,
  className: g,
  patternClassName: y
}) {
  const m = M.useRef(null), { transform: v, patternId: x } = lt(MA, At), S = o || TA[a], T = a === Oa.Dots, N = a === Oa.Cross, R = Array.isArray(r) ? r : [r, r], z = [R[0] * v[2] || 1, R[1] * v[2] || 1], E = S * v[2], j = Array.isArray(u) ? u : [u, u], U = N ? [E, E] : z, H = [
    j[0] * v[2] || 1 + U[0] / 2,
    j[1] * v[2] || 1 + U[1] / 2
  ], V = `${x}${t || ""}`;
  return w.jsxs("svg", { className: Ft(["react-flow__background", g]), style: {
    ...p,
    ...dc,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": c
  }, ref: m, "data-testid": "rf__background", children: [w.jsx("pattern", { id: V, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${H[0]},-${H[1]})`, children: T ? w.jsx(CA, { radius: E / 2, className: y }) : w.jsx(RA, { dimensions: U, lineWidth: s, variant: a, className: y }) }), w.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
Bx.displayName = "Background";
const Bv = M.memo(Bx);
function DA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: w.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function AA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: w.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function zA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: w.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function OA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function jA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function vu({ children: t, className: a, ...r }) {
  return w.jsx("button", { type: "button", className: Ft(["react-flow__controls-button", a]), ...r, children: t });
}
const LA = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function Ux({ style: t, showZoom: a = !0, showFitView: r = !0, showInteractive: o = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: h, onInteractiveChange: p, className: g, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = zt(), { isInteractive: T, minZoomReached: N, maxZoomReached: R, ariaLabelConfig: z } = lt(LA, At), { zoomIn: E, zoomOut: j, fitView: U } = rm(), H = () => {
    E(), u?.();
  }, V = () => {
    j(), c?.();
  }, D = () => {
    U(s), h?.();
  }, q = () => {
    S.setState({
      nodesDraggable: !T,
      nodesConnectable: !T,
      elementsSelectable: !T
    }), p?.(!T);
  }, le = v === "horizontal" ? "horizontal" : "vertical";
  return w.jsxs(fc, { className: Ft(["react-flow__controls", le, g]), position: m, style: t, "data-testid": "rf__controls", "aria-label": x ?? z["controls.ariaLabel"], children: [a && w.jsxs(w.Fragment, { children: [w.jsx(vu, { onClick: H, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: R, children: w.jsx(DA, {}) }), w.jsx(vu, { onClick: V, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: N, children: w.jsx(AA, {}) })] }), r && w.jsx(vu, { className: "react-flow__controls-fitview", onClick: D, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: w.jsx(zA, {}) }), o && w.jsx(vu, { className: "react-flow__controls-interactive", onClick: q, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: T ? w.jsx(jA, {}) : w.jsx(OA, {}) }), y] });
}
Ux.displayName = "Controls";
const HA = M.memo(Ux);
function BA({ id: t, x: a, y: r, width: o, height: s, style: u, color: c, strokeColor: h, strokeWidth: p, className: g, borderRadius: y, shapeRendering: m, selected: v, onClick: x }) {
  const { background: S, backgroundColor: T } = u || {}, N = c || S || T;
  return w.jsx("rect", { className: Ft(["react-flow__minimap-node", { selected: v }, g]), x: a, y: r, rx: y, ry: y, width: o, height: s, style: {
    fill: N,
    stroke: h,
    strokeWidth: p
  }, shapeRendering: m, onClick: x ? (R) => x(R, t) : void 0 });
}
const UA = M.memo(BA), kA = (t) => t.nodes.map((a) => a.id), qd = (t) => t instanceof Function ? t : () => t;
function VA({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = UA,
  onClick: c
}) {
  const h = lt(kA, At), p = qd(a), g = qd(t), y = qd(r), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return w.jsx(w.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    w.jsx(qA, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: g, nodeClassNameFunc: y, nodeBorderRadius: o, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: m }, v)
  )) });
}
function YA({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: o, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: h, onClick: p }) {
  const { node: g, x: y, y: m, width: v, height: x } = lt((S) => {
    const T = S.nodeLookup.get(t);
    if (!T)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = T.internals.userNode, { x: R, y: z } = T.internals.positionAbsolute, { width: E, height: j } = oi(N);
    return {
      node: N,
      x: R,
      y: z,
      width: E,
      height: j
    };
  }, At);
  return !g || g.hidden || !k1(g) ? null : w.jsx(h, { x: y, y: m, width: v, height: x, style: g.style, selected: !!g.selected, className: o(g), color: a(g), borderRadius: s, strokeColor: r(g), strokeWidth: u, shapeRendering: c, onClick: p, id: g.id });
}
const qA = M.memo(YA);
var $A = M.memo(VA);
const XA = 200, GA = 150, IA = (t) => !t.hidden, ZA = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? B1(Fo(t.nodeLookup, { filter: IA }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, QA = "react-flow__minimap-desc";
function kx({
  style: t,
  className: a,
  nodeStrokeColor: r,
  nodeColor: o,
  nodeClassName: s = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: c,
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
  pannable: T = !1,
  zoomable: N = !1,
  ariaLabel: R,
  inversePan: z,
  zoomStep: E = 1,
  offsetScale: j = 5
}) {
  const U = zt(), H = M.useRef(null), { boundingRect: V, viewBB: D, rfId: q, panZoom: le, translateExtent: I, flowWidth: K, flowHeight: W, ariaLabelConfig: O } = lt(ZA, At), $ = t?.width ?? XA, _ = t?.height ?? GA, L = V.width / $, Z = V.height / _, G = Math.max(L, Z), ne = G * $, A = G * _, k = j * G, F = V.x - (ne - V.width) / 2 - k, te = V.y - (A - V.height) / 2 - k, se = ne + k * 2, he = A + k * 2, me = `${QA}-${q}`, ee = M.useRef(0), ge = M.useRef();
  ee.current = G, M.useEffect(() => {
    if (H.current && le)
      return ge.current = sM({
        domNode: H.current,
        panZoom: le,
        getTransform: () => U.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        ge.current?.destroy();
      };
  }, [le]), M.useEffect(() => {
    ge.current?.update({
      translateExtent: I,
      width: K,
      height: W,
      inversePan: z,
      pannable: T,
      zoomStep: E,
      zoomable: N
    });
  }, [T, N, z, E, I, K, W]);
  const ze = x ? (xe) => {
    const [Re, qe] = ge.current?.pointer(xe) || [0, 0];
    x(xe, { x: Re, y: qe });
  } : void 0, Ce = S ? M.useCallback((xe, Re) => {
    const qe = U.getState().nodeLookup.get(Re).internals.userNode;
    S(xe, qe);
  }, []) : void 0, we = R ?? O["minimap.ariaLabel"];
  return w.jsx(fc, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * G : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Ft(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: w.jsxs("svg", { width: $, height: _, viewBox: `${F} ${te} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: H, onClick: ze, children: [we && w.jsx("title", { id: me, children: we }), w.jsx($A, { onClick: Ce, nodeColor: o, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: h }), w.jsx("path", { className: "react-flow__minimap-mask", d: `M${F - k},${te - k}h${se + k * 2}v${he + k * 2}h${-se - k * 2}z
        M${D.x},${D.y}h${D.width}v${D.height}h${-D.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
kx.displayName = "MiniMap";
const FA = M.memo(kx), KA = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, PA = {
  [Sl.Line]: "right",
  [Sl.Handle]: "bottom-right"
};
function JA({ nodeId: t, position: a, variant: r = Sl.Handle, className: o, style: s = void 0, children: u, color: c, minWidth: h = 10, minHeight: p = 10, maxWidth: g = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: T, onResize: N, onResizeEnd: R }) {
  const z = gx(), E = typeof t == "string" ? t : z, j = zt(), U = M.useRef(null), H = r === Sl.Handle, V = lt(M.useCallback(KA(H && x), [H, x]), At), D = M.useRef(null), q = a ?? PA[r];
  M.useEffect(() => {
    if (!(!U.current || !E))
      return D.current || (D.current = SM({
        domNode: U.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: I, transform: K, snapGrid: W, snapToGrid: O, nodeOrigin: $, domNode: _ } = j.getState();
          return {
            nodeLookup: I,
            transform: K,
            snapGrid: W,
            snapToGrid: O,
            nodeOrigin: $,
            paneDomNode: _
          };
        },
        onChange: (I, K) => {
          const { triggerNodeChanges: W, nodeLookup: O, parentLookup: $, nodeOrigin: _ } = j.getState(), L = [], Z = { x: I.x, y: I.y }, G = O.get(E);
          if (G && G.expandParent && G.parentId) {
            const ne = G.origin ?? _, A = I.width ?? G.measured.width ?? 0, k = I.height ?? G.measured.height ?? 0, F = {
              id: G.id,
              parentId: G.parentId,
              rect: {
                width: A,
                height: k,
                ...V1({
                  x: I.x ?? G.position.x,
                  y: I.y ?? G.position.y
                }, { width: A, height: k }, G.parentId, O, ne)
              }
            }, te = im([F], O, $, _);
            L.push(...te), Z.x = I.x ? Math.max(ne[0] * A, I.x) : void 0, Z.y = I.y ? Math.max(ne[1] * k, I.y) : void 0;
          }
          if (Z.x !== void 0 && Z.y !== void 0) {
            const ne = {
              id: E,
              type: "position",
              position: { ...Z }
            };
            L.push(ne);
          }
          if (I.width !== void 0 && I.height !== void 0) {
            const A = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: I.width,
                height: I.height
              }
            };
            L.push(A);
          }
          for (const ne of K) {
            const A = {
              ...ne,
              type: "position"
            };
            L.push(A);
          }
          W(L);
        },
        onEnd: ({ width: I, height: K }) => {
          const W = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: I,
              height: K
            }
          };
          j.getState().triggerNodeChanges([W]);
        }
      })), D.current.update({
        controlPosition: q,
        boundaries: {
          minWidth: h,
          minHeight: p,
          maxWidth: g,
          maxHeight: y
        },
        keepAspectRatio: m,
        resizeDirection: v,
        onResizeStart: T,
        onResize: N,
        onResizeEnd: R,
        shouldResize: S
      }), () => {
        D.current?.destroy();
      };
  }, [
    q,
    h,
    p,
    g,
    y,
    m,
    T,
    N,
    R,
    S
  ]);
  const le = q.split("-");
  return w.jsx("div", { className: Ft(["react-flow__resize-control", "nodrag", ...le, r, o]), ref: U, style: {
    ...s,
    scale: V,
    ...c && { [H ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
M.memo(JA);
var WA = "_1bllf8b0", e3 = "_1bllf8b1";
const Uv = 16, t3 = "rgba(186, 158, 255, 0.14)", n3 = "rgba(186, 158, 255, 0.06)", a3 = "rgba(0, 0, 0, 0.6)", i3 = "#1d2023", r3 = "#ba9eff";
function l3({
  nodes: t,
  edges: a,
  nodeTypes: r,
  showMiniMap: o = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: h,
  children: p,
  onNodeClick: g
}) {
  const y = [WA, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("div", { className: y, "aria-label": h ?? "node graph", children: /* @__PURE__ */ w.jsxs(
    NA,
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
      onNodeClick: (m, v) => g?.(v),
      children: [
        /* @__PURE__ */ w.jsx(
          Bv,
          {
            id: "minor",
            variant: Oa.Dots,
            gap: Uv,
            size: 1.1,
            color: t3
          }
        ),
        /* @__PURE__ */ w.jsx(
          Bv,
          {
            id: "major",
            variant: Oa.Lines,
            gap: Uv * 5,
            lineWidth: 1,
            color: n3
          }
        ),
        s && /* @__PURE__ */ w.jsx(HA, { showInteractive: !1 }),
        o && /* @__PURE__ */ w.jsx(
          FA,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: a3,
            nodeColor: () => i3,
            nodeStrokeColor: () => r3,
            className: e3
          }
        ),
        p
      ]
    }
  ) });
}
function o3(t) {
  return /* @__PURE__ */ w.jsx(Hx, { children: /* @__PURE__ */ w.jsx(l3, { ...t }) });
}
var s3 = "a9gtw0", u3 = "a9gtw1", c3 = "a9gtw2", f3 = "a9gtw3";
function ti({
  title: t,
  description: a,
  actions: r,
  children: o,
  className: s
}) {
  const u = [s3, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("section", { className: u, children: [
    (t || r) && /* @__PURE__ */ w.jsxs("header", { className: u3, children: [
      t && /* @__PURE__ */ w.jsx("span", { className: c3, children: t }),
      a && /* @__PURE__ */ w.jsx("span", { className: f3, children: a }),
      r
    ] }),
    o
  ] });
}
const om = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function sm() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function mh() {
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
    stageStates: sm()
  };
}
function d3(t, a) {
  return {
    ...mh(),
    phase: "running",
    jobId: t,
    stageStates: {
      ...sm(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function h3(t, a) {
  switch (a.method) {
    case "svi2.video.progress":
      return { ...t, overallFraction: p3(a.params.fraction) };
    case "svi2.video.clip.started":
      return {
        ...t,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...t.stageStates, qwen_edit: g3(t, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...t,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps
      };
    case "svi2.video.clip.completed":
      return {
        ...t,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        stageStates: a.params.clip_index >= a.params.num_clips - 1 ? { ...t.stageStates, diffusion: "done", stitch: "active" } : t.stageStates
      };
    case "runtime.memory_stats": {
      const r = a.params.vram_peak_gib ?? a.params.vram_used_gib ?? null;
      return r === null ? t : { ...t, vramPeakGib: Math.max(r, t.vramPeakGib ?? 0) };
    }
    case "svi2.video.done":
      return {
        ...t,
        phase: "done",
        overallFraction: 1,
        outputPath: a.params.output_path,
        renderReport: a.params.render_report ?? null,
        vramPeakGib: a.params.render_report?.vram_peak_gib ?? t.vramPeakGib,
        stageStates: {
          anchor: "done",
          qwen_edit: t.stageStates.qwen_edit === "idle" ? "idle" : "done",
          diffusion: "done",
          stitch: "done",
          interpolate: "done",
          mux: "done"
        }
      };
    case "svi2.video.error":
      return {
        ...t,
        phase: "error",
        errorCode: a.params.code,
        errorMessage: a.params.message,
        stageStates: y3(t.stageStates)
      };
    default:
      return t;
  }
}
function m3(t) {
  return { ...t, phase: "cancelled", stageStates: sm() };
}
function p3(t) {
  return Number.isNaN(t) ? 0 : Math.min(1, Math.max(0, t));
}
function g3(t, a) {
  return t.stageStates[a] === "active" ? "done" : t.stageStates[a];
}
function y3(t) {
  const a = { ...t };
  for (const r of om)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const v3 = [
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
    description: "Defaulted to canonical chaining. Change only for A/B.",
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
], Vx = [
  {
    key: "num_clips",
    label: "Clips",
    tier: "core",
    control: "number",
    min: 1,
    max: 64,
    step: 1,
    default: 5,
    help: "Number of chained clips. Longer take = more clips. Identity holds with one prompt."
  },
  {
    key: "frames_per_clip",
    label: "Frames per clip",
    tier: "core",
    control: "number",
    min: 5,
    max: 129,
    step: 4,
    default: 69,
    help: "Must be 4n+1 (49, 65, 69, 81). 69 @ 5 clips ≈ 20s."
  },
  {
    key: "width",
    label: "Width",
    tier: "core",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 832,
    help: "Must be divisible by 16. 832×480 is the trained 480p budget."
  },
  {
    key: "height",
    label: "Height",
    tier: "core",
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
function b3(t) {
  return Vx.filter((a) => a.tier === t);
}
function x3() {
  const t = {};
  for (const a of Vx)
    a.default !== void 0 && (t[a.key] = a.default);
  return t;
}
function S3(t) {
  return {
    ...x3(),
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: t.blocksToSwap,
    interpolate_method: t.interpolateMethod,
    interpolate_fps: t.interpolateFps,
    models_dir: t.modelsDir || void 0,
    output_path: t.outputDir ? `${t.outputDir}/svi2_out.mp4` : void 0
  };
}
function kv(t, a) {
  return {
    ...t,
    ...a.params,
    ref_image_path: t.ref_image_path,
    last_image_path: t.last_image_path ?? null,
    prompts: t.prompts
  };
}
const Vo = "svi-canonical", w3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), E3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), _3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function N3(t) {
  const a = t.frames_per_clip, r = t.num_clips, o = t.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - o);
}
function R3(t) {
  const a = t.params, r = a.width ?? 480, o = a.height ?? 832, s = `${r}×${o}`, u = N3(a), c = (a.interpolate_fps && a.interpolate_fps > 0, a.fps);
  let h = "—";
  u !== null && c && (h = `${(u / c).toFixed(1)}s`);
  const p = w3.has(t.id), g = a.blocks_to_swap ?? 0, y = g >= 40 ? "~10–11 GiB (16 GB)" : g > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: h,
    vram: y,
    isLowVram: p,
    isOffDistribution: E3.has(t.id),
    requiresLastImage: _3.has(t.id)
  };
}
function C3(t) {
  return [...t].sort((a, r) => a.id === Vo ? -1 : r.id === Vo ? 1 : 0);
}
async function T3(t) {
  return El("/render/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function M3(t) {
  return El(`/render/jobs/${t}/cancel`, { method: "POST", body: "{}" });
}
function D3(t, a, r) {
  return k2(`/render/jobs/${t}/events`, a);
}
const Yx = M.createContext(null);
function A3({
  initialSettings: t = Jb,
  initialPreset: a = null,
  children: r
}) {
  const [o, s] = M.useState(t), [u, c] = M.useState(
    a?.id ?? Vo
  ), [h, p] = M.useState(() => {
    const W = S3(t);
    return a ? kv(W, a) : W;
  }), [g, y] = M.useState(null), [m, v] = M.useState(null), [x, S] = M.useState({
    enabled: !1,
    prompt: ""
  }), [T, N] = M.useState(mh), R = M.useRef(null), z = M.useCallback((W) => {
    c(W.id), p((O) => kv(O, W));
  }, []), E = M.useCallback(
    (W, O) => {
      p(($) => ({ ...$, [W]: O }));
    },
    []
  ), j = M.useCallback((W) => {
    p((O) => ({ ...O, prompts: W }));
  }, []), U = M.useCallback((W, O) => {
    y(W), p(($) => ({ ...$, ref_image_path: O }));
  }, []), H = M.useCallback((W, O) => {
    v(W), p(($) => ({ ...$, last_image_path: O }));
  }, []), V = M.useCallback((W) => {
    S((O) => ({ ...O, ...W }));
  }, []), D = M.useCallback((W) => {
    s(W);
  }, []), q = M.useCallback(() => {
    R.current?.(), R.current = null, N(mh());
  }, []), le = M.useCallback(async () => {
    R.current?.();
    const { jobId: W } = await T3({ presetId: u, params: h });
    N(d3(W, x.enabled)), R.current = D3(W, (O) => {
      N(($) => h3($, O));
    });
  }, [h, u, x.enabled]), I = M.useCallback(async () => {
    const W = T.jobId;
    W && (await M3(W), R.current?.(), R.current = null, N((O) => m3(O)));
  }, [T.jobId]), K = M.useMemo(
    () => ({
      settings: o,
      presetId: u,
      params: h,
      refImageName: g,
      lastImageName: m,
      qwenEdit: x,
      render: T,
      applyPresetById: z,
      updateParam: E,
      setPrompts: j,
      setRefImage: U,
      setLastImage: H,
      setQwenEdit: V,
      setSettings: D,
      startRenderJob: le,
      cancelRenderJob: I,
      resetRender: q
    }),
    [
      o,
      u,
      h,
      g,
      m,
      x,
      T,
      z,
      E,
      j,
      U,
      H,
      V,
      D,
      le,
      I,
      q
    ]
  );
  return /* @__PURE__ */ w.jsx(Yx.Provider, { value: K, children: r });
}
function Gi() {
  const t = M.useContext(Yx);
  if (!t)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return t;
}
function z3(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
}
const O3 = (t) => {
  switch (t) {
    case "success":
      return H3;
    case "info":
      return U3;
    case "warning":
      return B3;
    case "error":
      return k3;
    default:
      return null;
  }
}, j3 = Array(12).fill(0), L3 = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, j3.map((r, o) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${o}`
})))), H3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), B3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), U3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), k3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), V3 = /* @__PURE__ */ ye.createElement("svg", {
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
})), Y3 = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), t;
};
let ph = 1;
class q3 {
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
      const { message: o, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : ph++, c = this.toasts.find((p) => p.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), c ? this.toasts = this.toasts.map((p) => p.id === u ? (this.publish({
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
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((r) => r({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((r) => {
      this.subscribers.forEach((o) => o({
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
      let o;
      r.loading !== void 0 && (o = this.create({
        ...r,
        promise: a,
        type: "loading",
        message: r.loading,
        description: typeof r.description != "function" ? r.description : void 0
      }));
      const s = Promise.resolve(a instanceof Function ? a() : a);
      let u = o !== void 0, c;
      const h = s.then(async (g) => {
        if (c = [
          "resolve",
          g
        ], ye.isValidElement(g))
          u = !1, this.create({
            id: o,
            type: "default",
            message: g
          });
        else if (X3(g) && !g.ok) {
          u = !1;
          const m = typeof r.error == "function" ? await r.error(`HTTP error! status: ${g.status}`) : r.error, v = typeof r.description == "function" ? await r.description(`HTTP error! status: ${g.status}`) : r.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
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
          const m = typeof r.error == "function" ? await r.error(g) : r.error, v = typeof r.description == "function" ? await r.description(g) : r.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "error",
            description: v,
            ...S
          });
        } else if (r.success !== void 0) {
          u = !1;
          const m = typeof r.success == "function" ? await r.success(g) : r.success, v = typeof r.description == "function" ? await r.description(g) : r.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
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
        if (c = [
          "reject",
          g
        ], r.error !== void 0) {
          u = !1;
          const y = typeof r.error == "function" ? await r.error(g) : r.error, m = typeof r.description == "function" ? await r.description(g) : r.description, x = typeof y == "object" && !ye.isValidElement(y) ? y : {
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
        u && (this.dismiss(o), o = void 0), r.finally == null || r.finally.call(r);
      }), p = () => new Promise((g, y) => h.then(() => c[0] === "reject" ? y(c[1]) : g(c[1])).catch(y));
      return typeof o != "string" && typeof o != "number" ? {
        unwrap: p
      } : Object.assign(o, {
        unwrap: p
      });
    }, this.custom = (a, r) => {
      const o = r?.id || ph++;
      return this.create({
        jsx: a(o),
        id: o,
        ...r
      }), o;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Cn = new q3(), $3 = (t, a) => {
  const r = a?.id || ph++;
  return Cn.addToast({
    title: t,
    ...a,
    id: r
  }), r;
}, X3 = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", G3 = $3, I3 = () => Cn.toasts, Z3 = () => Cn.getActiveToasts(), gr = Object.assign(G3, {
  success: Cn.success,
  info: Cn.info,
  warning: Cn.warning,
  error: Cn.error,
  custom: Cn.custom,
  message: Cn.message,
  promise: Cn.promise,
  dismiss: Cn.dismiss,
  loading: Cn.loading
}, {
  getHistory: I3,
  getToasts: Z3
});
z3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function bu(t) {
  return t.label !== void 0;
}
const Q3 = 3, F3 = "24px", K3 = "16px", Vv = 4e3, P3 = 356, J3 = 14, W3 = 45, ez = 200;
function Ta(...t) {
  return t.filter(Boolean).join(" ");
}
function tz(t) {
  const [a, r] = t.split("-"), o = [];
  return a && o.push(a), r && o.push(r), o;
}
const nz = (t) => {
  var a, r, o, s, u, c, h, p, g;
  const { invert: y, toast: m, unstyled: v, interacting: x, setHeights: S, visibleToasts: T, heights: N, index: R, toasts: z, expanded: E, removeToast: j, defaultRichColors: U, closeButton: H, style: V, cancelButtonStyle: D, actionButtonStyle: q, className: le = "", descriptionClassName: I = "", duration: K, position: W, gap: O, expandByDefault: $, classNames: _, icons: L, closeButtonAriaLabel: Z = "Close toast" } = t, [G, ne] = ye.useState(null), [A, k] = ye.useState(null), [F, te] = ye.useState(!1), [se, he] = ye.useState(!1), [me, ee] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Ce, we] = ye.useState(!1), [xe, Re] = ye.useState(0), [qe, ft] = ye.useState(0), Te = ye.useRef(m.duration || K || Vv), Ie = ye.useRef(null), Be = ye.useRef(null), $e = R === 0, wt = R + 1 <= T, Je = m.type, Qe = m.dismissible !== !1, Fe = m.className || "", gt = m.descriptionClassName || "", yt = ye.useMemo(() => N.findIndex((He) => He.toastId === m.id) || 0, [
    N,
    m.id
  ]), Xt = ye.useMemo(() => {
    var He;
    return (He = m.closeButton) != null ? He : H;
  }, [
    m.closeButton,
    H
  ]), Lt = ye.useMemo(() => m.duration || K || Vv, [
    m.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), qn = ye.useRef(0), yn = ye.useRef(null), [tn, Kt] = W.split("-"), Ot = ye.useMemo(() => N.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    N,
    yt
  ]), kt = Y3(), si = m.invert || y, Sa = Je === "loading";
  ot.current = ye.useMemo(() => yt * O + Ot, [
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
      return ft(vt), S((Ht) => [
        {
          toastId: m.id,
          height: vt,
          position: m.position
        },
        ...Ht
      ]), () => S((Ht) => Ht.filter((Vt) => Vt.toastId !== m.id));
    }
  }, [
    S,
    m.id
  ]), ye.useLayoutEffect(() => {
    if (!F) return;
    const He = Be.current, vt = He.style.height;
    He.style.height = "auto";
    const Ht = He.getBoundingClientRect().height;
    He.style.height = vt, ft(Ht), S((Vt) => Vt.find((pt) => pt.toastId === m.id) ? Vt.map((pt) => pt.toastId === m.id ? {
      ...pt,
      height: Ht
    } : pt) : [
      {
        toastId: m.id,
        height: Ht,
        position: m.position
      },
      ...Vt
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
  const vn = ye.useCallback(() => {
    he(!0), Re(ot.current), S((He) => He.filter((vt) => vt.toastId !== m.id)), setTimeout(() => {
      j(m);
    }, ez);
  }, [
    m,
    j,
    S,
    ot
  ]);
  ye.useEffect(() => {
    if (m.promise && Je === "loading" || m.duration === 1 / 0 || m.type === "loading") return;
    let He;
    return E || x || kt ? (() => {
      if (qn.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Te.current = Te.current - Vt;
      }
      qn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Te.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), He = setTimeout(() => {
        m.onAutoClose == null || m.onAutoClose.call(m, m), vn();
      }, Te.current));
    })(), () => clearTimeout(He);
  }, [
    E,
    x,
    m,
    Je,
    kt,
    vn
  ]), ye.useEffect(() => {
    m.delete && (vn(), m.onDismiss == null || m.onDismiss.call(m, m));
  }, [
    vn,
    m.delete
  ]);
  function ra() {
    var He;
    if (L?.loading) {
      var vt;
      return /* @__PURE__ */ ye.createElement("div", {
        className: Ta(_?.loader, m == null || (vt = m.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ye.createElement(L3, {
      className: Ta(_?.loader, m == null || (He = m.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const Mn = m.icon || L?.[Je] || O3(Je);
  var $n, un;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: Be,
    className: Ta(le, Fe, _?.toast, m == null || (a = m.classNames) == null ? void 0 : a.toast, _?.default, _?.[Je], m == null || (r = m.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": ($n = m.richColors) != null ? $n : U,
    "data-styled": !(m.jsx || m.unstyled || v),
    "data-mounted": F,
    "data-promise": !!m.promise,
    "data-swiped": Ce,
    "data-removed": se,
    "data-visible": wt,
    "data-y-position": tn,
    "data-x-position": Kt,
    "data-index": R,
    "data-front": $e,
    "data-swiping": me,
    "data-dismissible": Qe,
    "data-type": Je,
    "data-invert": si,
    "data-swipe-out": ge,
    "data-swipe-direction": A,
    "data-expanded": !!(E || $ && F),
    "data-testid": m.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": z.length - R,
      "--offset": `${se ? xe : ot.current}px`,
      "--initial-height": $ ? "auto" : `${qe}px`,
      ...V,
      ...m.style
    },
    onDragEnd: () => {
      ee(!1), ne(null), yn.current = null;
    },
    onPointerDown: (He) => {
      He.button !== 2 && (Sa || !Qe || (Ie.current = /* @__PURE__ */ new Date(), Re(ot.current), He.target.setPointerCapture(He.pointerId), He.target.tagName !== "BUTTON" && (ee(!0), yn.current = {
        x: He.clientX,
        y: He.clientY
      })));
    },
    onPointerUp: () => {
      var He, vt, Ht;
      if (ge || !Qe) return;
      yn.current = null;
      const Vt = Number(((He = Be.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), mn = Number(((vt = Be.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Ie.current) == null ? void 0 : Ht.getTime()), Pt = G === "x" ? Vt : mn, la = Math.abs(Pt) / pt;
      if (Math.abs(Pt) >= W3 || la > 0.11) {
        Re(ot.current), m.onDismiss == null || m.onDismiss.call(m, m), k(G === "x" ? Vt > 0 ? "right" : "left" : mn > 0 ? "down" : "up"), vn(), ze(!0);
        return;
      } else {
        var Wt, B;
        (Wt = Be.current) == null || Wt.style.setProperty("--swipe-amount-x", "0px"), (B = Be.current) == null || B.style.setProperty("--swipe-amount-y", "0px");
      }
      we(!1), ee(!1), ne(null);
    },
    onPointerMove: (He) => {
      var vt, Ht, Vt;
      if (!yn.current || !Qe || ((vt = window.getSelection()) == null ? void 0 : vt.toString().length) > 0) return;
      const pt = He.clientY - yn.current.y, Pt = He.clientX - yn.current.x;
      var la;
      const Wt = (la = t.swipeDirections) != null ? la : tz(W);
      !G && (Math.abs(Pt) > 1 || Math.abs(pt) > 1) && ne(Math.abs(Pt) > Math.abs(pt) ? "x" : "y");
      let B = {
        x: 0,
        y: 0
      };
      const Q = (J) => 1 / (1.5 + Math.abs(J) / 20);
      if (G === "y") {
        if (Wt.includes("top") || Wt.includes("bottom"))
          if (Wt.includes("top") && pt < 0 || Wt.includes("bottom") && pt > 0)
            B.y = pt;
          else {
            const J = pt * Q(pt);
            B.y = Math.abs(J) < Math.abs(pt) ? J : pt;
          }
      } else if (G === "x" && (Wt.includes("left") || Wt.includes("right")))
        if (Wt.includes("left") && Pt < 0 || Wt.includes("right") && Pt > 0)
          B.x = Pt;
        else {
          const J = Pt * Q(Pt);
          B.x = Math.abs(J) < Math.abs(Pt) ? J : Pt;
        }
      (Math.abs(B.x) > 0 || Math.abs(B.y) > 0) && we(!0), (Ht = Be.current) == null || Ht.style.setProperty("--swipe-amount-x", `${B.x}px`), (Vt = Be.current) == null || Vt.style.setProperty("--swipe-amount-y", `${B.y}px`);
    }
  }, Xt && !m.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": Z,
    "data-disabled": Sa,
    "data-close-button": !0,
    onClick: Sa || !Qe ? () => {
    } : () => {
      vn(), m.onDismiss == null || m.onDismiss.call(m, m);
    },
    className: Ta(_?.closeButton, m == null || (o = m.classNames) == null ? void 0 : o.closeButton)
  }, (un = L?.close) != null ? un : V3) : null, (Je || m.icon || m.promise) && m.icon !== null && (L?.[Je] !== null || m.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Ta(_?.icon, m == null || (s = m.classNames) == null ? void 0 : s.icon)
  }, m.promise || m.type === "loading" && !m.icon ? m.icon || ra() : null, m.type !== "loading" ? Mn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Ta(_?.content, m == null || (u = m.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Ta(_?.title, m == null || (c = m.classNames) == null ? void 0 : c.title)
  }, m.jsx ? m.jsx : typeof m.title == "function" ? m.title() : m.title), m.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Ta(I, gt, _?.description, m == null || (h = m.classNames) == null ? void 0 : h.description)
  }, typeof m.description == "function" ? m.description() : m.description) : null), /* @__PURE__ */ ye.isValidElement(m.cancel) ? m.cancel : m.cancel && bu(m.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: m.cancelButtonStyle || D,
    onClick: (He) => {
      bu(m.cancel) && Qe && (m.cancel.onClick == null || m.cancel.onClick.call(m.cancel, He), vn());
    },
    className: Ta(_?.cancelButton, m == null || (p = m.classNames) == null ? void 0 : p.cancelButton)
  }, m.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(m.action) ? m.action : m.action && bu(m.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: m.actionButtonStyle || q,
    onClick: (He) => {
      bu(m.action) && (m.action.onClick == null || m.action.onClick.call(m.action, He), !He.defaultPrevented && vn());
    },
    className: Ta(_?.actionButton, m == null || (g = m.classNames) == null ? void 0 : g.actionButton)
  }, m.action.label) : null);
};
function Yv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function az(t, a) {
  const r = {};
  return [
    t,
    a
  ].forEach((o, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", h = u ? K3 : F3;
    function p(g) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        r[`${c}-${y}`] = typeof g == "number" ? `${g}px` : g;
      });
    }
    typeof o == "number" || typeof o == "string" ? p(o) : typeof o == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((g) => {
      o[g] === void 0 ? r[`${c}-${g}`] = h : r[`${c}-${g}`] = typeof o[g] == "number" ? `${o[g]}px` : o[g];
    }) : p(h);
  }), r;
}
const iz = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: o, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: p, className: g, offset: y, mobileOffset: m, theme: v = "light", richColors: x, duration: S, style: T, visibleToasts: N = Q3, toastOptions: R, dir: z = Yv(), gap: E = J3, icons: j, containerAriaLabel: U = "Notifications" } = a, [H, V] = ye.useState([]), D = ye.useMemo(() => o ? H.filter((F) => F.toasterId === o) : H.filter((F) => !F.toasterId), [
    H,
    o
  ]), q = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((F) => F.position).map((F) => F.position)))), [
    D,
    u
  ]), [le, I] = ye.useState([]), [K, W] = ye.useState(!1), [O, $] = ye.useState(!1), [_, L] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), Z = ye.useRef(null), G = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ne = ye.useRef(null), A = ye.useRef(!1), k = ye.useCallback((F) => {
    V((te) => {
      var se;
      return (se = te.find((he) => he.id === F.id)) != null && se.delete || Cn.dismiss(F.id), te.filter(({ id: he }) => he !== F.id);
    });
  }, []);
  return ye.useEffect(() => Cn.subscribe((F) => {
    if (F.dismiss) {
      requestAnimationFrame(() => {
        V((te) => te.map((se) => se.id === F.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      jM.flushSync(() => {
        V((te) => {
          const se = te.findIndex((he) => he.id === F.id);
          return se !== -1 ? [
            ...te.slice(0, se),
            {
              ...te[se],
              ...F
            },
            ...te.slice(se + 1)
          ] : [
            F,
            ...te
          ];
        });
      });
    });
  }), [
    H
  ]), ye.useEffect(() => {
    if (v !== "system") {
      L(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const F = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      F.addEventListener("change", ({ matches: te }) => {
        L(te ? "dark" : "light");
      });
    } catch {
      F.addListener(({ matches: se }) => {
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
    H.length <= 1 && W(!1);
  }, [
    H
  ]), ye.useEffect(() => {
    const F = (te) => {
      var se;
      if (c.every((ee) => te[ee] || te.code === ee)) {
        var me;
        W(!0), (me = Z.current) == null || me.focus();
      }
      te.code === "Escape" && (document.activeElement === Z.current || (se = Z.current) != null && se.contains(document.activeElement)) && W(!1);
    };
    return document.addEventListener("keydown", F), () => document.removeEventListener("keydown", F);
  }, [
    c
  ]), ye.useEffect(() => {
    if (Z.current)
      return () => {
        ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null, A.current = !1);
      };
  }, [
    Z.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: r,
    "aria-label": `${U} ${G}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((F, te) => {
    var se;
    const [he, me] = F.split("-");
    return D.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: F,
      dir: z === "auto" ? Yv() : z,
      tabIndex: -1,
      ref: Z,
      className: g,
      "data-sonner-toaster": !0,
      "data-sonner-theme": _,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${P3}px`,
        "--gap": `${E}px`,
        ...T,
        ...az(y, m)
      },
      onBlur: (ee) => {
        A.current && !ee.currentTarget.contains(ee.relatedTarget) && (A.current = !1, ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null));
      },
      onFocus: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || A.current || (A.current = !0, ne.current = ee.relatedTarget);
      },
      onMouseEnter: () => W(!0),
      onMouseMove: () => W(!0),
      onMouseLeave: () => {
        O || W(!1);
      },
      onDragEnd: () => W(!1),
      onPointerDown: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || $(!0);
      },
      onPointerUp: () => $(!1)
    }, D.filter((ee) => !ee.position && te === 0 || ee.position === F).map((ee, ge) => {
      var ze, Ce;
      return /* @__PURE__ */ ye.createElement(nz, {
        key: ee.id,
        icons: j,
        index: ge,
        toast: ee,
        defaultRichColors: x,
        duration: (ze = R?.duration) != null ? ze : S,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: s,
        visibleToasts: N,
        closeButton: (Ce = R?.closeButton) != null ? Ce : p,
        interacting: O,
        position: F,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: k,
        toasts: D.filter((we) => we.position == ee.position),
        heights: le.filter((we) => we.position == ee.position),
        setHeights: I,
        expandByDefault: h,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), gh = "svi2-pro:trigger-render", yh = "svi2-pro:render-state";
function rz() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(gh));
}
function lz(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(yh, { detail: t }));
}
function oz(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(gh, t), () => window.removeEventListener(gh, t));
}
function sz(t) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const o = r.detail;
    o && t(o);
  };
  return window.addEventListener(yh, a), () => window.removeEventListener(yh, a);
}
const uz = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), cz = 832 * 480, fz = 0.85;
function qx(t) {
  return t !== null && uz.has(t);
}
function qv(t, a) {
  return Number.isFinite(t) && t % a === 0;
}
function dz(t, a) {
  const r = [];
  (!a.hasRefImage || !t.ref_image_path) && r.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (t.prompts ?? []).some((m) => m.trim().length > 0) || r.push({
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
  qv(c, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${c}).`,
    severity: "error"
  }), qv(h, 16) || r.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${h}).`,
    severity: "error"
  });
  const p = t.num_inference_steps ?? 50;
  (p < 1 || p > 100) && r.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const g = t.cfg_scale ?? 5;
  (g < 1 || g > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const y = t.num_clips;
  return y !== void 0 && y < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), qx(a.presetId) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Number.isFinite(c) && Number.isFinite(h) && c * h < cz * fz && r.push({
    field: "width",
    message: `${c}×${h} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function hz(t) {
  return t.some((a) => a.severity === "error");
}
function $x() {
  const {
    params: t,
    presetId: a,
    refImageName: r,
    lastImageName: o,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Gi(), h = M.useMemo(
    () => dz(t, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!o
    }),
    [t, a, r, o]
  ), p = hz(h), g = s.phase === "running", y = M.useCallback(async () => {
    if (p) {
      gr.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), gr.success("Render started.");
    } catch (v) {
      const x = v instanceof ec ? v.message : "Could not start the render.";
      gr.error(x);
    }
  }, [p, u]), m = M.useCallback(async () => {
    try {
      await c();
    } catch {
      gr.error("Could not cancel the render.");
    }
  }, [c]);
  return M.useEffect(() => oz(() => void y()), [y]), M.useEffect(() => {
    lz({ busy: g });
  }, [g]), { issues: h, blocked: p, busy: g, submit: y, cancel: m };
}
const mz = 220, pz = 80;
function gz(t) {
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
function yz(t, a) {
  const r = a.params;
  switch (t) {
    case "anchor":
      return "Reference image";
    case "qwen_edit":
      return a.qwenEditEnabled ? "Edit-then-animate" : "Skipped";
    case "diffusion": {
      const o = r.num_clips ?? 1, s = a.render.clipIndex + 1;
      return a.render.phase === "running" ? `Clip ${Math.min(s, o)}/${o}` : `${o} clip${o === 1 ? "" : "s"}`;
    }
    case "stitch":
      return r.stitch_mode === "crossfade" ? "Crossfade" : "Overlap trim";
    case "interpolate":
      return r.interpolate_fps && r.interpolate_fps > 0 ? `→ ${r.interpolate_fps} fps` : "Off";
    case "mux":
      return "Encode mp4";
  }
}
function vz(t) {
  const a = om.filter(
    (s) => s !== "qwen_edit" || t.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: gz(s),
      subtitle: yz(s, t),
      state: t.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * mz, y: pz },
      data: c
    };
  }), o = [];
  for (let s = 1; s < a.length; s += 1) {
    const u = a[s - 1], c = a[s];
    !u || !c || o.push({
      id: `${u}->${c}`,
      source: u,
      target: c,
      animated: t.render.stageStates[c] === "active"
    });
  }
  return { nodes: r, edges: o };
}
var bz = "dk8hba0", xz = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, Sz = "dk8hba5", wz = "dk8hba6", Ez = "dk8hba7", _z = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, Nz = "dk8hbac";
function Rz({ data: t }) {
  const a = t, r = [bz, xz[a.state]].join(" "), o = [Nz, _z[a.state]].join(" ");
  return /* @__PURE__ */ w.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ w.jsx(wl, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ w.jsxs("div", { className: Sz, children: [
      /* @__PURE__ */ w.jsx("span", { className: wz, children: a.title }),
      /* @__PURE__ */ w.jsx("span", { className: o, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ w.jsx("span", { className: Ez, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ w.jsx(wl, { type: "source", position: Ae.Right })
  ] });
}
const Cz = { pipeline: Rz };
var Tz = "_1g4g8kk0", Mz = "_1g4g8kk1", Dz = "_1g4g8kk2", Az = "_1g4g8kk3", zz = "_1g4g8kk4", Oz = "_1g4g8kk5";
const jz = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, Lz = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function Hz() {
  const { render: t, params: a, qwenEdit: r } = Gi(), { busy: o, blocked: s, submit: u, cancel: c } = $x(), h = M.useMemo(
    () => vz({ render: t, params: a, qwenEditEnabled: r.enabled }),
    [t, a, r.enabled]
  ), p = om.filter(
    (g) => g !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ w.jsxs("div", { className: Tz, children: [
    /* @__PURE__ */ w.jsx("div", { className: Mz, children: /* @__PURE__ */ w.jsx(
      o3,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: Cz,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ w.jsx("div", { className: Dz, children: /* @__PURE__ */ w.jsxs(
      ti,
      {
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ w.jsx("div", { className: Az, children: p.map((g) => /* @__PURE__ */ w.jsxs("div", { className: zz, children: [
            /* @__PURE__ */ w.jsx("span", { children: Lz[g] }),
            /* @__PURE__ */ w.jsx(ta, { tone: jz[t.stageStates[g]], children: t.stageStates[g] })
          ] }, g)) }),
          /* @__PURE__ */ w.jsx("div", { className: Oz, children: o ? /* @__PURE__ */ w.jsx($i, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ w.jsx($i, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var $v = rx();
const Xx = 0, Gx = 1, Ix = 2, Xv = 3;
var Gv = Object.prototype.hasOwnProperty;
function vh(t, a) {
  var r, o;
  if (t === a) return !0;
  if (t && a && (r = t.constructor) === a.constructor) {
    if (r === Date) return t.getTime() === a.getTime();
    if (r === RegExp) return t.toString() === a.toString();
    if (r === Array) {
      if ((o = t.length) === a.length)
        for (; o-- && vh(t[o], a[o]); ) ;
      return o === -1;
    }
    if (!r || typeof t == "object") {
      o = 0;
      for (r in t)
        if (Gv.call(t, r) && ++o && !Gv.call(a, r) || !(r in a) || !vh(t[r], a[r])) return !1;
      return Object.keys(a).length === o;
    }
  }
  return t !== t && a !== a;
}
const ni = /* @__PURE__ */ new WeakMap(), ii = () => {
}, hn = (
  /*#__NOINLINE__*/
  ii()
), bh = Object, nt = (t) => t === hn, Aa = (t) => typeof t == "function", Xi = (t, a) => ({
  ...t,
  ...a
}), Zx = (t) => Aa(t.then), $d = {}, xu = {}, um = "undefined", Po = typeof window != um, xh = typeof document != um, Bz = Po && "Deno" in window, Uz = () => Po && typeof window.requestAnimationFrame != um, Qx = (t, a) => {
  const r = ni.get(t);
  return [
    // Getter
    () => !nt(a) && t.get(a) || $d,
    // Setter
    (o) => {
      if (!nt(a)) {
        const s = t.get(a);
        a in xu || (xu[a] = s), r[5](a, Xi(s, o), s || $d);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in xu ? xu[a] : !nt(a) && t.get(a) || $d
  ];
};
let Sh = !0;
const kz = () => Sh, [wh, Eh] = Po && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ii,
  ii
], Vz = () => {
  const t = xh && document.visibilityState;
  return nt(t) || t !== "hidden";
}, Yz = (t) => (xh && document.addEventListener("visibilitychange", t), wh("focus", t), () => {
  xh && document.removeEventListener("visibilitychange", t), Eh("focus", t);
}), qz = (t) => {
  const a = () => {
    Sh = !0, t();
  }, r = () => {
    Sh = !1;
  };
  return wh("online", a), wh("offline", r), () => {
    Eh("online", a), Eh("offline", r);
  };
}, $z = {
  isOnline: kz,
  isVisible: Vz
}, Xz = {
  initFocus: Yz,
  initReconnect: qz
}, Iv = !ye.useId, ml = !Po || Bz, Gz = (t) => Uz() ? window.requestAnimationFrame(t) : setTimeout(t, 1), Xd = ml ? M.useEffect : M.useLayoutEffect, Gd = typeof navigator < "u" && navigator.connection, Zv = !ml && Gd && ([
  "slow-2g",
  "2g"
].includes(Gd.effectiveType) || Gd.saveData), Su = /* @__PURE__ */ new WeakMap(), Iz = (t) => bh.prototype.toString.call(t), Id = (t, a) => t === `[object ${a}]`;
let Zz = 0;
const _h = (t) => {
  const a = typeof t, r = Iz(t), o = Id(r, "Date"), s = Id(r, "RegExp"), u = Id(r, "Object");
  let c, h;
  if (bh(t) === t && !o && !s) {
    if (c = Su.get(t), c) return c;
    if (c = ++Zz + "~", Su.set(t, c), Array.isArray(t)) {
      for (c = "@", h = 0; h < t.length; h++)
        c += _h(t[h]) + ",";
      Su.set(t, c);
    }
    if (u) {
      c = "#";
      const p = bh.keys(t).sort();
      for (; !nt(h = p.pop()); )
        nt(t[h]) || (c += h + ":" + _h(t[h]) + ",");
      Su.set(t, c);
    }
  } else
    c = o ? t.toJSON() : a == "symbol" ? t.toString() : a == "string" ? JSON.stringify(t) : "" + t;
  return c;
}, cm = (t) => {
  if (Aa(t))
    try {
      t = t();
    } catch {
      t = "";
    }
  const a = t;
  return t = typeof t == "string" ? t : (Array.isArray(t) ? t.length : t) ? _h(t) : "", [
    t,
    a
  ];
};
let Qz = 0;
const Nh = () => ++Qz;
async function Fx(...t) {
  const [a, r, o, s] = t, u = Xi({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const h = u.rollbackOnError;
  let p = u.optimisticData;
  const g = (v) => typeof h == "function" ? h(v) : h !== !1, y = u.throwOnError;
  if (Aa(r)) {
    const v = r, x = [], S = a.keys();
    for (const T of S)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(T) && v(a.get(T)._k) && x.push(T);
    return Promise.all(x.map(m));
  }
  return m(r);
  async function m(v) {
    const [x] = cm(v);
    if (!x) return;
    const [S, T] = Qx(a, x), [N, R, z, E] = ni.get(a), j = () => {
      const O = N[x];
      return (Aa(u.revalidate) ? u.revalidate(S().data, v) : u.revalidate !== !1) && (delete z[x], delete E[x], O && O[0]) ? O[0](Ix).then(() => S().data) : S().data;
    };
    if (t.length < 3)
      return j();
    let U = o, H, V = !1;
    const D = Nh();
    R[x] = [
      D,
      0
    ];
    const q = !nt(p), le = S(), I = le.data, K = le._c, W = nt(K) ? I : K;
    if (q && (p = Aa(p) ? p(W, I) : p, T({
      data: p,
      _c: W
    })), Aa(U))
      try {
        U = U(W);
      } catch (O) {
        H = O, V = !0;
      }
    if (U && Zx(U))
      if (U = await U.catch((O) => {
        H = O, V = !0;
      }), D !== R[x][0]) {
        if (V) throw H;
        return U;
      } else V && q && g(H) && (c = !0, T({
        data: W,
        _c: hn
      }));
    if (c && !V)
      if (Aa(c)) {
        const O = c(U, W);
        T({
          data: O,
          error: hn,
          _c: hn
        });
      } else
        T({
          data: U,
          error: hn,
          _c: hn
        });
    if (R[x][1] = Nh(), Promise.resolve(j()).then(() => {
      T({
        _c: hn
      });
    }), V) {
      if (y) throw H;
      return;
    }
    return U;
  }
}
const Qv = (t, a) => {
  for (const r in t)
    t[r][0] && t[r][0](a);
}, Fz = (t, a) => {
  if (!ni.has(t)) {
    const r = Xi(Xz, a), o = /* @__PURE__ */ Object.create(null), s = Fx.bind(hn, t);
    let u = ii;
    const c = /* @__PURE__ */ Object.create(null), h = (y, m) => {
      const v = c[y] || [];
      return c[y] = v, v.push(m), () => v.splice(v.indexOf(m), 1);
    }, p = (y, m, v) => {
      t.set(y, m);
      const x = c[y];
      if (x)
        for (const S of x)
          S(m, v);
    }, g = () => {
      if (!ni.has(t) && (ni.set(t, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        h
      ]), !ml)) {
        const y = r.initFocus(setTimeout.bind(hn, Qv.bind(hn, o, Xx))), m = r.initReconnect(setTimeout.bind(hn, Qv.bind(hn, o, Gx)));
        u = () => {
          y && y(), m && m(), ni.delete(t);
        };
      }
    };
    return g(), [
      t,
      s,
      g,
      u
    ];
  }
  return [
    t,
    ni.get(t)[4]
  ];
}, Kz = (t, a, r, o, s) => {
  const u = r.errorRetryCount, c = s.retryCount, h = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(o, h, s);
}, Pz = vh, [Kx, Jz] = Fz(/* @__PURE__ */ new Map()), Wz = Xi(
  {
    // events
    onLoadingSlow: ii,
    onSuccess: ii,
    onError: ii,
    onErrorRetry: Kz,
    onDiscarded: ii,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Zv ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Zv ? 5e3 : 3e3,
    // providers
    compare: Pz,
    isPaused: () => !1,
    cache: Kx,
    mutate: Jz,
    fallback: {}
  },
  // use web preset by default
  $z
), e5 = (t, a) => {
  const r = Xi(t, a);
  if (a) {
    const { use: o, fallback: s } = t, { use: u, fallback: c } = a;
    o && u && (r.use = o.concat(u)), s && c && (r.fallback = Xi(s, c));
  }
  return r;
}, t5 = M.createContext({}), n5 = "$inf$", Px = Po && window.__SWR_DEVTOOLS_USE__, a5 = Px ? window.__SWR_DEVTOOLS_USE__ : [], i5 = () => {
  Px && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, r5 = (t) => Aa(t[1]) ? [
  t[0],
  t[1],
  t[2] || {}
] : [
  t[0],
  null,
  (t[1] === null ? t[2] : t[1]) || {}
], l5 = () => {
  const t = M.useContext(t5);
  return M.useMemo(() => Xi(Wz, t), [
    t
  ]);
}, o5 = (t) => (a, r, o) => t(a, r && ((...u) => {
  const [c] = cm(a), [, , , h] = ni.get(Kx);
  if (c.startsWith(n5))
    return r(...u);
  const p = h[c];
  return nt(p) ? r(...u) : (delete h[c], p);
}), o), s5 = a5.concat(o5), u5 = (t) => function(...r) {
  const o = l5(), [s, u, c] = r5(r), h = e5(o, c);
  let p = t;
  const { use: g } = h, y = (g || []).concat(s5);
  for (let m = y.length; m--; )
    p = y[m](p);
  return p(s, u || h.fetcher || null, h);
}, c5 = (t, a, r) => {
  const o = a[t] || (a[t] = []);
  return o.push(r), () => {
    const s = o.indexOf(r);
    s >= 0 && (o[s] = o[o.length - 1], o.pop());
  };
};
i5();
const Zd = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}, Fv = Promise.resolve(hn), f5 = () => ii, d5 = (t, a, r) => {
  const { cache: o, compare: s, suspense: u, fallbackData: c, revalidateOnMount: h, revalidateIfStale: p, refreshInterval: g, refreshWhenHidden: y, refreshWhenOffline: m, keepPreviousData: v, strictServerPrefetchWarning: x } = r, [S, T, N, R] = ni.get(o), [z, E] = cm(t), j = M.useRef(!1), U = M.useRef(!1), H = M.useRef(z), V = M.useRef(a), D = M.useRef(r), q = () => D.current, le = () => q().isVisible() && q().isOnline(), [I, K, W, O] = Qx(o, z), $ = M.useRef({}).current, _ = nt(c) ? nt(r.fallback) ? hn : r.fallback[z] : c, L = (Te, Ie) => {
    for (const Be in $) {
      const $e = Be;
      if ($e === "data") {
        if (!s(Te[$e], Ie[$e]) && (!nt(Te[$e]) || !s(he, Ie[$e])))
          return !1;
      } else if (Ie[$e] !== Te[$e])
        return !1;
    }
    return !0;
  }, Z = !j.current, G = M.useMemo(() => {
    const Te = I(), Ie = O(), Be = (Qe) => {
      const Fe = Xi(Qe);
      return delete Fe._k, (() => {
        if (!z || !a || q().isPaused()) return !1;
        if (Z && !nt(h)) return h;
        const yt = nt(_) ? Fe.data : _;
        return nt(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Fe
      } : Fe;
    }, $e = Be(Te), wt = Te === Ie ? $e : Be(Ie);
    let Je = $e;
    return [
      () => {
        const Qe = Be(I());
        return L(Qe, Je) ? (Je.data = Qe.data, Je.isLoading = Qe.isLoading, Je.isValidating = Qe.isValidating, Je.error = Qe.error, Je) : (Je = Qe, Qe);
      },
      () => wt
    ];
  }, [
    o,
    z
  ]), ne = $v.useSyncExternalStore(M.useCallback(
    (Te) => W(z, (Ie, Be) => {
      L(Be, Ie) || Te();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      z
    ]
  ), G[0], G[1]), A = S[z] && S[z].length > 0, k = ne.data, F = nt(k) ? _ && Zx(_) ? Zd(_) : _ : k, te = ne.error, se = M.useRef(F), he = v ? nt(k) ? nt(se.current) ? F : se.current : k : F, me = z && nt(F), ee = M.useRef(null);
  !ml && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  $v.useSyncExternalStore(f5, () => (ee.current = !1, ee), () => (ee.current = !0, ee));
  const ge = ee.current;
  x && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !z || !a || q().isPaused() || A && !nt(te) ? !1 : Z && !nt(h) ? h : u ? nt(F) ? !1 : p : nt(F) || p, Ce = Z && ze, we = nt(ne.isValidating) ? Ce : ne.isValidating, xe = nt(ne.isLoading) ? Ce : ne.isLoading, Re = M.useCallback(
    async (Te) => {
      const Ie = V.current;
      if (!z || !Ie || U.current || q().isPaused())
        return !1;
      let Be, $e, wt = !0;
      const Je = Te || {}, Qe = !N[z] || !Je.dedupe, Fe = () => Iv ? !U.current && z === H.current && j.current : z === H.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, Xt = () => {
        const mt = N[z];
        mt && mt[1] === $e && delete N[z];
      }, Lt = {
        isValidating: !0
      };
      nt(I().data) && (Lt.isLoading = !0);
      try {
        if (Qe && (K(Lt), r.loadingTimeout && nt(I().data) && setTimeout(() => {
          wt && Fe() && q().onLoadingSlow(z, r);
        }, r.loadingTimeout), N[z] = [
          Ie(E),
          Nh()
        ]), [Be, $e] = N[z], Be = await Be, Qe && setTimeout(Xt, r.dedupingInterval), !N[z] || N[z][1] !== $e)
          return Qe && Fe() && q().onDiscarded(z), !1;
        gt.error = hn;
        const mt = T[z];
        if (!nt(mt) && // case 1
        ($e <= mt[0] || // case 2
        $e <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Qe && Fe() && q().onDiscarded(z), !1;
        const ot = I().data;
        gt.data = s(ot, Be) ? ot : Be, Qe && Fe() && q().onSuccess(Be, z, r);
      } catch (mt) {
        Xt();
        const ot = q(), { shouldRetryOnError: qn } = ot;
        ot.isPaused() || (gt.error = mt, Qe && Fe() && (ot.onError(mt, z, ot), (qn === !0 || Aa(qn) && qn(mt)) && (!q().revalidateOnFocus || !q().revalidateOnReconnect || le()) && ot.onErrorRetry(mt, z, ot, (yn) => {
          const tn = S[z];
          tn && tn[0] && tn[0](Xv, yn);
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
      o
    ]
  ), qe = M.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Te) => Fx(o, H.current, ...Te),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Xd(() => {
    V.current = a, D.current = r, nt(k) || (se.current = k);
  }), Xd(() => {
    if (!z) return;
    const Te = Re.bind(hn, Qd);
    let Ie = 0;
    q().revalidateOnFocus && (Ie = Date.now() + q().focusThrottleInterval);
    const $e = c5(z, S, (wt, Je = {}) => {
      if (wt == Xx) {
        const Qe = Date.now();
        q().revalidateOnFocus && Qe > Ie && le() && (Ie = Qe + q().focusThrottleInterval, Te());
      } else if (wt == Gx)
        q().revalidateOnReconnect && le() && Te();
      else {
        if (wt == Ix)
          return Re();
        if (wt == Xv)
          return Re(Je);
      }
    });
    return U.current = !1, H.current = z, j.current = !0, K({
      _k: E
    }), ze && (N[z] || (nt(F) || ml ? Te() : Gz(Te))), () => {
      U.current = !0, $e();
    };
  }, [
    z
  ]), Xd(() => {
    let Te;
    function Ie() {
      const $e = Aa(g) ? g(I().data) : g;
      $e && Te !== -1 && (Te = setTimeout(Be, $e));
    }
    function Be() {
      !I().error && (y || q().isVisible()) && (m || q().isOnline()) ? Re(Qd).then(Ie) : Ie();
    }
    return Ie(), () => {
      Te && (clearTimeout(Te), Te = -1);
    };
  }, [
    g,
    y,
    m,
    z
  ]), M.useDebugValue(he), u) {
    if (!Iv && ml && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (V.current = a, D.current = r, U.current = !1);
    const Te = R[z], Ie = !nt(Te) && me ? qe(Te) : Fv;
    if (Zd(Ie), !nt(te) && me)
      throw te;
    const Be = me ? Re(Qd) : Fv;
    !nt(he) && me && (Be.status = "fulfilled", Be.value = !0), Zd(Be);
  }
  return {
    mutate: qe,
    get data() {
      return $.data = !0, he;
    },
    get error() {
      return $.error = !0, te;
    },
    get isValidating() {
      return $.isValidating = !0, we;
    },
    get isLoading() {
      return $.isLoading = !0, xe;
    }
  };
}, Kv = u5(d5);
async function h5(t = 25) {
  return El(`/render/jobs?limit=${t}`);
}
var m5 = "_1xasopc0", p5 = "_1xasopc1", g5 = "_1xasopc2", y5 = "_1xasopc3", v5 = "_1xasopc4", b5 = "_1xasopc5", x5 = "_1xasopc6", S5 = "_1xasopc7", w5 = "_1xasopc8";
function E5(t, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const o = t.name.toLowerCase(), s = t.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? o.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function _5(t, a, r) {
  for (const o of t) {
    if (a && !E5(o, a))
      return `"${o.name}" is not an accepted file type.`;
    if (r !== void 0 && o.size > r)
      return `"${o.name}" exceeds the maximum size.`;
  }
  return null;
}
function Pv({
  accept: t,
  maxSizeBytes: a,
  multiple: r = !1,
  disabled: o = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: h,
  renderPreview: p,
  onFiles: g
}) {
  const y = M.useRef(null), m = M.useId(), [v, x] = M.useState(!1), [S, T] = M.useState(null), [N, R] = M.useState([]), z = M.useCallback(
    (q) => {
      if (!q || q.length === 0) return;
      const le = Array.from(q), I = r ? le : le.slice(0, 1), K = _5(I, t, a);
      if (K) {
        T(K);
        return;
      }
      T(null), R(I), g(I);
    },
    [t, a, r, g]
  ), E = M.useCallback(() => {
    o || y.current?.click();
  }, [o]), j = M.useCallback(
    (q) => {
      o || (q.key === "Enter" || q.key === " ") && (q.preventDefault(), E());
    },
    [o, E]
  ), U = M.useCallback(
    (q) => {
      q.preventDefault(), x(!1), !o && z(q.dataTransfer.files);
    },
    [o, z]
  ), H = M.useCallback(
    (q) => {
      q.preventDefault(), o || x(!0);
    },
    [o]
  ), V = M.useCallback((q) => {
    q.preventDefault(), x(!1);
  }, []), D = [
    m5,
    v ? p5 : "",
    o ? g5 : "",
    S !== null ? y5 : "",
    h
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("div", { children: [
    /* @__PURE__ */ w.jsxs(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": o,
        "aria-describedby": S ? m : void 0,
        className: D,
        onClick: E,
        onKeyDown: j,
        onDrop: U,
        onDragOver: H,
        onDragLeave: V,
        children: [
          /* @__PURE__ */ w.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: v5,
              accept: t,
              multiple: r,
              disabled: o,
              tabIndex: -1,
              onChange: (q) => z(q.target.files)
            }
          ),
          /* @__PURE__ */ w.jsx("span", { className: b5, children: s ?? (v ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ w.jsx("span", { className: x5, children: u }),
          p && N.length > 0 && /* @__PURE__ */ w.jsx("div", { className: w5, children: p(N) })
        ]
      }
    ),
    S && /* @__PURE__ */ w.jsx("div", { id: m, role: "alert", className: S5, children: S })
  ] });
}
function Jv(t) {
  const [a, r] = M.useState(null);
  return M.useEffect(() => {
    if (!t) {
      r(null);
      return;
    }
    const o = URL.createObjectURL(t);
    return r(o), () => URL.revokeObjectURL(o);
  }, [t]), a;
}
async function N5(t) {
  const a = new FormData();
  a.append("file", t);
  const r = await fetch(`${tc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let o = null;
    try {
      o = await r.json();
    } catch {
      o = null;
    }
    throw new ec(
      r.status,
      o?.category ?? "unknown",
      o?.message ?? r.statusText,
      o?.requestId
    );
  }
  return await r.json();
}
function Wv(t) {
  const [a, r] = M.useState(null), [o, s] = M.useState(!1), [u, c] = M.useState(null), h = M.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        t(null, null);
        return;
      }
      s(!0);
      try {
        const { path: g } = await N5(p);
        t(p.name, g);
      } catch (g) {
        const y = g instanceof ec ? g.message : "Upload failed. Try again.";
        c(y), t(null, null), gr.error(y);
      } finally {
        s(!1);
      }
    },
    [t]
  );
  return { file: a, uploading: o, uploadError: u, pick: h };
}
var R5 = "cyswg40", eb = "cyswg41", tb = "cyswg42", nb = "cyswg43", ab = "cyswg44", ib = "cyswg45", wu = "cyswg46";
const rb = 32 * 1024 * 1024;
function C5({
  lastImageRequired: t,
  refError: a,
  lastError: r
}) {
  const { setRefImage: o, setLastImage: s } = Gi(), u = M.useCallback(
    (m, v) => o(m, v ?? ""),
    [o]
  ), c = M.useCallback(
    (m, v) => s(m, v),
    [s]
  ), h = Wv(u), p = Wv(c), g = Jv(h.file), y = Jv(p.file);
  return /* @__PURE__ */ w.jsxs("div", { className: R5, children: [
    /* @__PURE__ */ w.jsxs("div", { className: eb, children: [
      /* @__PURE__ */ w.jsxs("span", { className: tb, children: [
        "Reference image ",
        /* @__PURE__ */ w.jsx(ta, { tone: "accent", children: "required" })
      ] }),
      /* @__PURE__ */ w.jsx(
        Pv,
        {
          accept: "image/*",
          maxSizeBytes: rb,
          ariaLabel: "reference image upload",
          label: h.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: "Defines identity. Aspect-match to the render resolution; dims divisible by 16.",
          onFiles: (m) => void h.pick(m[0] ?? null),
          renderPreview: () => g ? /* @__PURE__ */ w.jsx("img", { className: nb, src: g, alt: "reference preview" }) : null
        }
      ),
      h.uploading && /* @__PURE__ */ w.jsx("span", { className: ib, children: "Uploading…" }),
      !h.uploading && h.file && /* @__PURE__ */ w.jsx("span", { className: ab, children: h.file.name }),
      h.uploadError && /* @__PURE__ */ w.jsx("span", { role: "alert", className: wu, children: h.uploadError }),
      a && /* @__PURE__ */ w.jsx("span", { role: "alert", className: wu, children: a })
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: eb, children: [
      /* @__PURE__ */ w.jsxs("span", { className: tb, children: [
        "Last image",
        " ",
        t ? /* @__PURE__ */ w.jsx(ta, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ w.jsx(ta, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ w.jsx(
        Pv,
        {
          accept: "image/*",
          maxSizeBytes: rb,
          ariaLabel: "last image upload",
          label: p.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over the clip.",
          onFiles: (m) => void p.pick(m[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ w.jsx("img", { className: nb, src: y, alt: "last preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ w.jsx("span", { className: ib, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ w.jsx("span", { className: ab, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ w.jsx("span", { role: "alert", className: wu, children: p.uploadError }),
      r && /* @__PURE__ */ w.jsx("span", { role: "alert", className: wu, children: r })
    ] })
  ] });
}
var T5 = "dck790", M5 = "dck791", D5 = "dck792";
function Qu({ title: t, detail: a, action: r, className: o }) {
  const s = [T5, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("div", { className: s, children: [
    /* @__PURE__ */ w.jsx("span", { className: M5, children: t }),
    a && /* @__PURE__ */ w.jsx("span", { className: D5, children: a }),
    r
  ] });
}
var A5 = "_1880igs0", z5 = "_1880igs1", O5 = "_1880igs2", j5 = "_1880igs3", L5 = "_1880igs4", H5 = "_1880igs5";
const B5 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function U5({ jobs: t, onOpen: a }) {
  return t.length === 0 ? /* @__PURE__ */ w.jsx(
    Qu,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ w.jsx("div", { className: A5, children: t.map((r) => /* @__PURE__ */ w.jsxs("button", { type: "button", className: z5, onClick: () => a(r), children: [
    /* @__PURE__ */ w.jsxs("span", { className: O5, children: [
      /* @__PURE__ */ w.jsx("span", { className: j5, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ w.jsx("span", { className: L5, children: k5(r) })
    ] }),
    /* @__PURE__ */ w.jsx("span", { className: H5, children: /* @__PURE__ */ w.jsx(ta, { tone: B5[r.status], children: r.status }) })
  ] }, r.id)) });
}
function k5(t) {
  const a = t.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
var V5 = "dgx4n20", Y5 = "dgx4n21", q5 = "dgx4n22", $5 = "dgx4n23", X5 = "dgx4n24", G5 = "dgx4n25", I5 = "dgx4n26", Z5 = "dgx4n27";
function Q5({
  presets: t,
  selectedId: a,
  onSelect: r
}) {
  if (t.length === 0)
    return /* @__PURE__ */ w.jsx(
      Qu,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const o = C3(t);
  return /* @__PURE__ */ w.jsx("div", { className: V5, role: "radiogroup", "aria-label": "Render presets", children: o.map((s) => {
    const u = R3(s), c = s.id === a, h = s.id === Vo, p = [Y5, c ? q5 : ""].filter(Boolean).join(" ");
    return /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": c,
        className: p,
        onClick: () => r(s),
        children: [
          /* @__PURE__ */ w.jsxs("div", { className: $5, children: [
            /* @__PURE__ */ w.jsx("span", { className: X5, children: s.label }),
            h && /* @__PURE__ */ w.jsx(ta, { tone: "accent", children: "Default" })
          ] }),
          h && /* @__PURE__ */ w.jsx("span", { className: Z5, children: "Recommended baseline" }),
          /* @__PURE__ */ w.jsx("span", { className: G5, children: s.description }),
          /* @__PURE__ */ w.jsxs("div", { className: I5, children: [
            /* @__PURE__ */ w.jsx(ta, { tone: "neutral", children: u.resolution }),
            /* @__PURE__ */ w.jsx(ta, { tone: "neutral", children: u.duration }),
            /* @__PURE__ */ w.jsx(ta, { tone: u.isLowVram ? "success" : "neutral", children: u.vram }),
            u.isOffDistribution && /* @__PURE__ */ w.jsx(ta, { tone: "warning", children: "off-distribution" }),
            u.requiresLastImage && /* @__PURE__ */ w.jsx(ta, { tone: "warning", children: "needs last image" })
          ] })
        ]
      },
      s.id
    );
  }) });
}
var F5 = "_1ntn2zv0", K5 = "_1ntn2zv1", P5 = "_1ntn2zv2", lb = "_1ntn2zv3", J5 = "_1ntn2zv4", W5 = "_1ntn2zv5", e4 = "_1ntn2zv6", t4 = "_1ntn2zv7";
function n4({ error: t }) {
  const { params: a, setPrompts: r } = Gi(), [o, s] = M.useState(!1), u = a.prompts ?? [""], c = M.useMemo(() => a.num_clips ?? u.length ?? 1, [a.num_clips, u.length]), h = (y) => {
    r([y]);
  }, p = (y, m) => {
    const v = Array.from({ length: c }, (x, S) => u[S] ?? "");
    v[y] = m, r(v);
  }, g = (y) => {
    if (s(y), !y)
      r([u[0] ?? ""]);
    else {
      const m = u[0] ?? "";
      r(Array.from({ length: c }, (v, x) => u[x] ?? m));
    }
  };
  return /* @__PURE__ */ w.jsxs("div", { className: F5, children: [
    /* @__PURE__ */ w.jsx("div", { className: K5, children: /* @__PURE__ */ w.jsxs("label", { className: P5, children: [
      /* @__PURE__ */ w.jsx(
        "input",
        {
          type: "checkbox",
          checked: o,
          onChange: (y) => g(y.target.checked)
        }
      ),
      "Per-clip prompts"
    ] }) }),
    o ? Array.from({ length: c }, (y, m) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ w.jsxs("div", { className: J5, children: [
        /* @__PURE__ */ w.jsxs("span", { className: W5, children: [
          "Clip ",
          m + 1
        ] }),
        /* @__PURE__ */ w.jsx(
          "textarea",
          {
            className: lb,
            "aria-label": `prompt for clip ${m + 1}`,
            value: u[m] ?? "",
            onChange: (v) => p(m, v.target.value)
          }
        )
      ] }, `clip-${m}`)
    )) : /* @__PURE__ */ w.jsx(
      "textarea",
      {
        className: lb,
        "aria-label": "single prompt",
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: u[0] ?? "",
        onChange: (y) => h(y.target.value)
      }
    ),
    /* @__PURE__ */ w.jsx("p", { className: e4, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    t && /* @__PURE__ */ w.jsx("span", { role: "alert", className: t4, children: t })
  ] });
}
var a4 = "_1itrxk30", i4 = "_1itrxk31", r4 = "_1itrxk32", l4 = "_1itrxk33", o4 = "_1itrxk34", s4 = "_1itrxk35", u4 = "_1itrxk36", c4 = "_1itrxk37";
function f4() {
  const { qwenEdit: t, setQwenEdit: a } = Gi();
  return /* @__PURE__ */ w.jsxs("div", { className: a4, children: [
    /* @__PURE__ */ w.jsxs("div", { className: i4, children: [
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": t.enabled,
          "aria-label": "enable anchor edit",
          className: u4,
          onClick: () => a({ enabled: !t.enabled }),
          children: /* @__PURE__ */ w.jsx("span", { className: c4, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ w.jsxs("span", { className: r4, children: [
        /* @__PURE__ */ w.jsx("span", { className: l4, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ w.jsx("span", { className: o4, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    t.enabled && /* @__PURE__ */ w.jsx(
      "textarea",
      {
        className: s4,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: t.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var d4 = "ob7g5b0", h4 = "ob7g5b1", m4 = "ob7g5b3", p4 = "ob7g5b4", g4 = "ob7g5b5", y4 = "ob7g5b6", v4 = "ob7g5b7", b4 = "ob7g5b8", x4 = "ob7g5b9";
function S4({
  src: t,
  poster: a,
  fpsLabel: r,
  controls: o = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: h,
  className: p,
  emptyContent: g,
  onEnded: y,
  onReady: m,
  onError: v
}) {
  const [x, S] = M.useState("loading"), [T, N] = M.useState(null), R = M.useCallback(() => {
    S("ready"), m?.();
  }, [m]), z = M.useCallback(
    (j) => {
      const U = j.target, H = U.error?.message || `media error code ${U.error?.code ?? "?"}`;
      S("error"), N(H), v?.(new Error(H));
    },
    [v]
  ), E = [d4, p].filter(Boolean).join(" ");
  return t ? x === "error" ? /* @__PURE__ */ w.jsx("div", { className: E, role: "alert", "aria-label": h ?? "video playback error", children: /* @__PURE__ */ w.jsxs("div", { className: v4, children: [
    /* @__PURE__ */ w.jsx("div", { className: b4, children: "Could not play video" }),
    /* @__PURE__ */ w.jsx("div", { className: x4, children: T ?? "unknown error" })
  ] }) }) : /* @__PURE__ */ w.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ w.jsx("div", { className: m4, "aria-hidden": "true", children: /* @__PURE__ */ w.jsx("div", { className: p4 }) }),
    r && /* @__PURE__ */ w.jsx("span", { className: g4, children: r }),
    /* @__PURE__ */ w.jsx(
      "video",
      {
        className: h4,
        src: t,
        poster: a,
        controls: o,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": h ?? "video player",
        onLoadedData: R,
        onEnded: y,
        onError: z,
        children: /* @__PURE__ */ w.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ w.jsx("div", { className: E, "aria-label": h ?? "no video", children: /* @__PURE__ */ w.jsx("div", { className: y4, children: g ?? "No video to display yet." }) });
}
const Ui = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107
}, ob = {
  [Ui.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [Ui.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [Ui.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [Ui.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [Ui.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [Ui.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [Ui.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [Ui.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  }
};
function w4(t, a) {
  return t !== null && ob[t] ? ob[t] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function E4(t) {
  return t ? `${tc}/media?path=${encodeURIComponent(t)}` : null;
}
var Eu = "_1ojc56g0", _4 = "_1ojc56g1", N4 = "_1ojc56g2", R4 = "_1ojc56g3", C4 = "_1ojc56g4", T4 = "_1ojc56g5", M4 = "_1ojc56g6", _u = "_1ojc56g7", D4 = "_1ojc56g8", A4 = "_1ojc56g9", z4 = "_1ojc56ga", O4 = "_1ojc56gb", j4 = "_1ojc56gc", L4 = "_1ojc56gd", H4 = "_1ojc56ge";
function B4({ state: t, onCancel: a, onReset: r }) {
  const o = M.useCallback(() => a(), [a]);
  if (t.phase === "idle")
    return /* @__PURE__ */ w.jsx(
      Qu,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (t.phase === "error") {
    const h = w4(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ w.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ w.jsxs("div", { className: j4, role: "alert", children: [
        /* @__PURE__ */ w.jsx("span", { className: L4, children: h.title }),
        /* @__PURE__ */ w.jsx("span", { className: H4, children: h.hint })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: _u, children: /* @__PURE__ */ w.jsx($i, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (t.phase === "cancelled")
    return /* @__PURE__ */ w.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ w.jsx(Qu, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ w.jsx("div", { className: _u, children: /* @__PURE__ */ w.jsx($i, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const s = t.renderReport?.fps, u = typeof s == "number" ? s : void 0;
  if (t.phase === "done")
    return /* @__PURE__ */ w.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ w.jsx(
        S4,
        {
          src: E4(t.outputPath),
          fpsLabel: u ? `${u} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ w.jsx(U4, { state: t }),
      /* @__PURE__ */ w.jsx("div", { className: _u, children: /* @__PURE__ */ w.jsx($i, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const c = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ w.jsxs("div", { className: Eu, children: [
    /* @__PURE__ */ w.jsx("div", { className: T4, "aria-label": "overall progress", children: /* @__PURE__ */ w.jsx(
      "div",
      {
        className: M4,
        style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
      }
    ) }),
    /* @__PURE__ */ w.jsxs("div", { className: _4, children: [
      /* @__PURE__ */ w.jsx(Nu, { label: "Overall", value: `${c}%` }),
      /* @__PURE__ */ w.jsx(
        Nu,
        {
          label: "Clip",
          value: t.numClips ? `${t.clipIndex + 1} / ${t.numClips}` : "—"
        }
      ),
      /* @__PURE__ */ w.jsx(
        Nu,
        {
          label: "Step",
          value: t.totalSteps ? `${t.step} / ${t.totalSteps}` : "—"
        }
      ),
      /* @__PURE__ */ w.jsx(
        Nu,
        {
          label: "VRAM peak",
          value: t.vramPeakGib !== null ? `${t.vramPeakGib.toFixed(1)} GiB` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: _u, children: /* @__PURE__ */ w.jsx($i, { variant: "danger", onClick: o, children: "Cancel render" }) })
  ] });
}
function Nu({ label: t, value: a }) {
  return /* @__PURE__ */ w.jsxs("div", { className: N4, children: [
    /* @__PURE__ */ w.jsx("span", { className: R4, children: t }),
    /* @__PURE__ */ w.jsx("span", { className: C4, children: a })
  ] });
}
function U4({ state: t }) {
  const a = t.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), t.vramPeakGib !== null && r.push(["VRAM peak", `${t.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", a.sha256.slice(0, 16)]), t.outputPath && r.push(["Output", t.outputPath]), r.length === 0 ? null : /* @__PURE__ */ w.jsx("div", { className: D4, children: r.map(([o, s]) => /* @__PURE__ */ w.jsxs("div", { className: A4, children: [
    /* @__PURE__ */ w.jsx("span", { className: z4, children: o }),
    /* @__PURE__ */ w.jsx("span", { className: O4, children: s })
  ] }, o)) });
}
var k4 = "_1hbttwg0", V4 = "_1hbttwg1", Y4 = "_1hbttwg2", q4 = "_1hbttwg3", Jx = "_1hbttwg4", $4 = "_1hbttwg5", X4 = "_1hbttwg7 _1hbttwg6", G4 = "_1hbttwg8 _1hbttwg6", I4 = "_1hbttwg9", Z4 = "_1hbttwga", Q4 = "_1hbttwgb", F4 = "_1hbttwgc", K4 = "_1hbttwgd";
function P4({ spec: t, value: a, error: r, onChange: o }) {
  const s = M.useId(), u = `${s}-help`, c = r ? `${s}-error` : u;
  return /* @__PURE__ */ w.jsxs("div", { className: k4, children: [
    /* @__PURE__ */ w.jsxs("div", { className: V4, children: [
      /* @__PURE__ */ w.jsx("label", { className: Y4, htmlFor: s, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ w.jsx("span", { className: q4, children: W4(a) })
    ] }),
    J4(t, a, o, s, c, r !== void 0),
    /* @__PURE__ */ w.jsx("span", { id: u, className: Jx, children: t.help }),
    r && /* @__PURE__ */ w.jsx("span", { id: `${s}-error`, role: "alert", className: $4, children: r })
  ] });
}
function J4(t, a, r, o, s, u) {
  switch (t.control) {
    case "toggle": {
      const c = !!a;
      return /* @__PURE__ */ w.jsxs("div", { className: Q4, children: [
        /* @__PURE__ */ w.jsx(
          "button",
          {
            type: "button",
            id: o,
            role: "switch",
            "aria-checked": c,
            "aria-describedby": s,
            className: F4,
            onClick: () => r(!c),
            children: /* @__PURE__ */ w.jsx("span", { className: K4, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ w.jsx("span", { className: Jx, children: c ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ w.jsx(
        "select",
        {
          id: o,
          "aria-describedby": s,
          className: G4,
          value: String(a ?? t.default ?? ""),
          onChange: (c) => r(c.target.value),
          children: t.options?.map((c) => /* @__PURE__ */ w.jsx("option", { value: c.value, children: c.label }, c.value))
        }
      );
    case "slider":
      return /* @__PURE__ */ w.jsx(
        "input",
        {
          id: o,
          type: "range",
          "aria-describedby": s,
          className: Z4,
          min: t.min,
          max: t.max,
          step: t.step,
          value: sb(a, t),
          onChange: (c) => r(Number(c.target.value))
        }
      );
    default:
      return /* @__PURE__ */ w.jsx(
        "input",
        {
          id: o,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          className: [X4, u ? I4 : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: sb(a, t),
          onChange: (c) => r(Number(c.target.value))
        }
      );
  }
}
function sb(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function W4(t) {
  return typeof t != "number" ? "—" : Number.isInteger(t) ? String(t) : t.toFixed(2);
}
var eO = "_1f0q5gf0", tO = "_1f0q5gf1", nO = "_1f0q5gf2", aO = "_1f0q5gf3", iO = "_1f0q5gf4", rO = "_1f0q5gf5", lO = "_1f0q5gf6", oO = "_1f0q5gf7", sO = "_1f0q5gf8";
function uO({
  title: t,
  description: a,
  badge: r,
  defaultCollapsed: o = !1,
  collapsible: s = !0,
  className: u,
  children: c
}) {
  const h = M.useId(), [p, g] = M.useState(s ? o : !1), y = [eO, u].filter(Boolean).join(" "), m = [nO, p ? aO : ""].filter(Boolean).join(" "), v = !s || !p;
  return /* @__PURE__ */ w.jsxs("section", { className: y, children: [
    /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        className: tO,
        "aria-expanded": v,
        "aria-controls": h,
        disabled: !s,
        onClick: () => s && g((x) => !x),
        children: [
          s && /* @__PURE__ */ w.jsx("span", { className: m, "aria-hidden": "true", children: /* @__PURE__ */ w.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ w.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ w.jsx(
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
          /* @__PURE__ */ w.jsxs("span", { className: iO, children: [
            /* @__PURE__ */ w.jsx("span", { className: rO, children: t }),
            a && /* @__PURE__ */ w.jsx("span", { className: lO, children: a })
          ] }),
          r && /* @__PURE__ */ w.jsx("span", { className: oO, children: r })
        ]
      }
    ),
    v && /* @__PURE__ */ w.jsx("div", { id: h, className: sO, children: c })
  ] });
}
var cO = "kn07ek0", fO = "kn07ek1";
function dO({ issues: t }) {
  const { params: a, updateParam: r } = Gi(), o = (s) => t.find((u) => u.field === s && u.severity === "error")?.message;
  return /* @__PURE__ */ w.jsx("div", { className: cO, children: v3.map((s) => {
    const u = b3(s.id);
    return u.length === 0 ? null : /* @__PURE__ */ w.jsx(
      uO,
      {
        title: s.title,
        description: s.description,
        defaultCollapsed: s.defaultCollapsed,
        badge: s.defaultCollapsed ? /* @__PURE__ */ w.jsx(ta, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ w.jsx("div", { className: fO, children: u.map((c) => /* @__PURE__ */ w.jsx(
          P4,
          {
            spec: c,
            value: a[c.key],
            error: o(c.key),
            onChange: (h) => r(c.key, h)
          },
          c.key
        )) })
      },
      s.id
    );
  }) });
}
var hO = "_1w9jfpf0", mO = "_1w9jfpf1", pO = "_1w9jfpf2", gO = "_1w9jfpf3";
function yO() {
  const { presetId: t, render: a, applyPresetById: r, resetRender: o } = Gi(), { issues: s, busy: u, cancel: c } = $x(), h = Kv("svi2/presets", Wb), p = Kv("svi2/history", () => h5(25)), g = h.data?.presets ?? [], y = p.data?.jobs ?? [], m = qx(t), v = s.find((N) => N.field === "ref_image_path")?.message, x = s.find((N) => N.field === "last_image_path")?.message, S = s.find((N) => N.field === "prompts")?.message, T = s.find(
    (N) => N.field === "width" && N.severity === "warning"
  )?.message;
  return /* @__PURE__ */ w.jsxs("div", { className: hO, children: [
    /* @__PURE__ */ w.jsxs("div", { className: mO, children: [
      /* @__PURE__ */ w.jsx(
        ti,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ w.jsx(Q5, { presets: g, selectedId: t, onSelect: r })
        }
      ),
      /* @__PURE__ */ w.jsx(ti, { title: "Anchor", description: "The reference image defines identity for the whole take.", children: /* @__PURE__ */ w.jsx(
        C5,
        {
          lastImageRequired: m,
          refError: v,
          lastError: x
        }
      ) }),
      /* @__PURE__ */ w.jsx(ti, { title: "Prompt", children: /* @__PURE__ */ w.jsx(n4, { error: S }) }),
      /* @__PURE__ */ w.jsx(ti, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ w.jsx(f4, {}) }),
      /* @__PURE__ */ w.jsxs(ti, { title: "Parameters", description: "Grouped by tier. Advanced tiers stay collapsed.", children: [
        T && /* @__PURE__ */ w.jsx("output", { className: gO, children: T }),
        /* @__PURE__ */ w.jsx(dO, { issues: s })
      ] })
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: pO, children: [
      /* @__PURE__ */ w.jsx(ti, { title: "Render", description: u ? "Render in progress." : "Live progress and output.", children: /* @__PURE__ */ w.jsx(B4, { state: a, onCancel: c, onReset: o }) }),
      /* @__PURE__ */ w.jsx(ti, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ w.jsx(U5, { jobs: y, onOpen: () => {
      } }) })
    ] })
  ] });
}
var vO = "_1smvon90", ur = "_1smvon91", cr = "_1smvon92", fr = "_1smvon93", Ru = "_1smvon94", Fd = "_1smvon95 _1smvon94", bO = "_1smvon96";
const xO = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function SO() {
  const { settings: t, setSettings: a } = Gi(), [r, o] = M.useState(t), [s, u] = M.useState(!1), c = (p, g) => {
    o((y) => ({ ...y, [p]: g }));
  }, h = async () => {
    u(!0);
    try {
      const p = await Y2(r);
      a(p), o(p), gr.success("Settings saved. Applied to new renders.");
    } catch {
      gr.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ w.jsxs(
    ti,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ w.jsxs("div", { className: vO, children: [
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Models directory" }),
            /* @__PURE__ */ w.jsx(
              "input",
              {
                className: Ru,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (p) => c("modelsDir", p.target.value)
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Output directory" }),
            /* @__PURE__ */ w.jsx(
              "input",
              {
                className: Ru,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (p) => c("outputDir", p.target.value)
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ w.jsx(
              "select",
              {
                className: Fd,
                value: r.attentionBackend,
                onChange: (p) => c("attentionBackend", p.target.value),
                children: B2.map((p) => /* @__PURE__ */ w.jsx("option", { value: p.value, children: p.label }, p.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ w.jsx(
              "select",
              {
                className: Fd,
                value: r.fp8Compute,
                onChange: (p) => c("fp8Compute", p.target.value),
                children: U2.map((p) => /* @__PURE__ */ w.jsx("option", { value: p.value, children: p.label }, p.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Blocks to swap" }),
            /* @__PURE__ */ w.jsx(
              "input",
              {
                className: Ru,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (p) => c("blocksToSwap", Number(p.target.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Interpolation method" }),
            /* @__PURE__ */ w.jsx(
              "select",
              {
                className: Fd,
                value: r.interpolateMethod,
                onChange: (p) => c("interpolateMethod", p.target.value),
                children: xO.map((p) => /* @__PURE__ */ w.jsx("option", { value: p.value, children: p.label }, p.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Interpolate target fps" }),
            /* @__PURE__ */ w.jsx(
              "input",
              {
                className: Ru,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (p) => c("interpolateFps", Number(p.target.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ w.jsxs("div", { className: bO, children: [
          /* @__PURE__ */ w.jsx($i, { loading: s, onClick: () => void h(), children: "Save settings" }),
          /* @__PURE__ */ w.jsx($i, { variant: "secondary", onClick: () => o(t), disabled: s, children: "Reset" })
        ] })
      ]
    }
  );
}
var wO = "_1ugwva20", EO = "_1ugwva21", _O = "_1ugwva22", NO = "_1ugwva23", RO = "_1ugwva24", CO = "_1ugwva25", TO = "_1ugwva26", MO = "_1ugwva27", DO = "_1ugwva28";
const AO = [
  { to: "recipe", label: "Recipe" },
  { to: "dag", label: "Pipeline" },
  { to: "settings", label: "Settings" }
];
function zO() {
  const t = G_(), { deploymentId: a } = L_(), r = OO(t.catalog?.presets ?? []);
  return /* @__PURE__ */ w.jsxs(A3, { initialSettings: t.settings, initialPreset: r, children: [
    /* @__PURE__ */ w.jsxs("div", { className: wO, children: [
      /* @__PURE__ */ w.jsxs("header", { className: EO, children: [
        /* @__PURE__ */ w.jsxs("div", { className: _O, children: [
          /* @__PURE__ */ w.jsx("h1", { className: NO, children: "SVI 2.0 Pro" }),
          /* @__PURE__ */ w.jsx("p", { className: RO, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
        ] }),
        /* @__PURE__ */ w.jsx("nav", { className: CO, "aria-label": "Workspace views", children: AO.map((o) => /* @__PURE__ */ w.jsx(
          Kb,
          {
            to: `/${a}/${o.to}`,
            className: ({ isActive: s }) => [TO, s ? MO : ""].filter(Boolean).join(" "),
            children: o.label
          },
          o.to
        )) })
      ] }),
      /* @__PURE__ */ w.jsx("main", { className: DO, children: /* @__PURE__ */ w.jsx(i2, {}) })
    ] }),
    /* @__PURE__ */ w.jsx(iz, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function OO(t) {
  return t.find((a) => a.id === Vo) ?? t[0] ?? null;
}
async function jO() {
  const [t, a] = await Promise.all([
    Wb().catch(() => null),
    V2().catch(() => Jb)
  ]);
  return { catalog: t, settings: a };
}
function LO() {
  return [
    {
      path: "/",
      loader: () => oy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: jO,
      Component: zO,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => oy(`/${HO(t, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: yO },
        { path: "dag", Component: Hz },
        { path: "settings", Component: SO }
      ]
    }
  ];
}
function HO(t, a) {
  const r = t[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const ub = "ext-actions-request", BO = "ext-actions-declare", UO = "ext-action-state", cb = "ext-action-invoke", Rh = "svi2-pro:navigate", fb = "svi2-pro.render", db = "svi2-pro.dag";
function kO(t, a) {
  let r = !1;
  const o = () => ({
    id: fb,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : "idle",
    tooltip: "Start the SVI 2.0 Pro render"
  }), s = () => ({
    primary: o(),
    secondary: {
      id: db,
      label: "Pipeline",
      icon: "account_tree",
      tone: "secondary",
      tooltip: "Open the pipeline DAG view"
    }
  }), u = () => {
    t.dispatchEvent(
      new CustomEvent(BO, { detail: { actions: s() }, bubbles: !1 })
    );
  }, c = () => {
    t.dispatchEvent(
      new CustomEvent(UO, { detail: { action: o() }, bubbles: !1 })
    );
  }, h = () => u(), p = (y) => {
    const m = y.detail?.id;
    m === fb ? rz() : m === db && t.dispatchEvent(
      new CustomEvent(Rh, {
        detail: { path: `/${a}/dag` },
        bubbles: !1
      })
    );
  }, g = sz((y) => {
    r = y.busy, c();
  });
  return t.addEventListener(ub, h), t.addEventListener(cb, p), u(), {
    dispose: () => {
      g(), t.removeEventListener(ub, h), t.removeEventListener(cb, p);
    }
  };
}
const Ch = "svi2-pro-app", VO = "ext-event", hb = "svi2-pro-stylesheet", mb = ["accent", "density", "card"];
function YO(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function qO() {
  if (typeof document > "u" || document.getElementById(hb)) return;
  const t = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = hb, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
qO();
class $O extends HTMLElement {
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
    this.root = mE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Rh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = kO(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const o = r.detail?.path;
      o && this.router && this.router.navigate(o);
    };
    this.navigateListener = a, this.addEventListener(Rh, a);
  }
  syncTweaksFromBody() {
    for (const a of mb) {
      const r = YO(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: mb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = W_(LO(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ w.jsx(M.StrictMode, { children: /* @__PURE__ */ w.jsx(t2, { router: r }) })
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
      new CustomEvent(VO, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function XO() {
  typeof customElements > "u" || customElements.get(Ch) || customElements.define(Ch, $O);
}
typeof customElements < "u" && !customElements.get(Ch) && XO();
export {
  XO as register
};
//# sourceMappingURL=svi2-pro.js.map
