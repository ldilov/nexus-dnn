function tE(t, a) {
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
function Rh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var yd = { exports: {} }, po = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G0;
function nE() {
  if (G0) return po;
  G0 = 1;
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
var I0;
function aE() {
  return I0 || (I0 = 1, yd.exports = nE()), yd.exports;
}
var w = aE(), vd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Z0;
function iE() {
  if (Z0) return Ve;
  Z0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), v = Symbol.iterator;
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
  return Ve.Activity = m, Ve.Children = ne, Ve.Component = R, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = o, Ve.Suspense = g, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
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
      $$typeof: p,
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
var Q0;
function Yo() {
  return Q0 || (Q0 = 1, vd.exports = iE()), vd.exports;
}
var M = Yo();
const ye = /* @__PURE__ */ Rh(M), rE = /* @__PURE__ */ tE({
  __proto__: null,
  default: ye
}, [M]);
var bd = { exports: {} }, go = {}, xd = { exports: {} }, Sd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var F0;
function lE() {
  return F0 || (F0 = 1, (function(t) {
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
    var g = [], p = [], y = 1, m = null, v = 3, x = !1, S = !1, T = !1, N = !1, R = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function j(_) {
      for (var L = r(p); L !== null; ) {
        if (L.callback === null) o(p);
        else if (L.startTime <= _)
          o(p), L.sortIndex = L.expirationTime, a(g, L);
        else break;
        L = r(p);
      }
    }
    function U(_) {
      if (T = !1, j(_), !S)
        if (r(g) !== null)
          S = !0, H || (H = !0, K());
        else {
          var L = r(p);
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
                for (j(_), m = r(g); m !== null && !(m.expirationTime > _ && le()); ) {
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
                    m === r(g) && o(g), j(_);
                  } else o(g);
                  m = r(g);
                }
                if (m !== null) L = !0;
                else {
                  var A = r(p);
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
      }, Z > G ? (_.sortIndex = Z, a(p, _), r(g) === null && _ === r(p) && (T ? (z(V), V = -1) : T = !0, $(U, Z - G))) : (_.sortIndex = ne, a(g, _), S || x || (S = !0, H || (H = !0, K()))), _;
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
  })(Sd)), Sd;
}
var K0;
function oE() {
  return K0 || (K0 = 1, xd.exports = lE()), xd.exports;
}
var wd = { exports: {} }, fn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var P0;
function sE() {
  if (P0) return fn;
  P0 = 1;
  var t = Yo();
  function a(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        p += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(g, p, y) {
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: m == null ? null : "" + m,
      children: g,
      containerInfo: p,
      implementation: y
    };
  }
  var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, fn.createPortal = function(g, p) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(g, p, null, y);
  }, fn.flushSync = function(g) {
    var p = c.T, y = o.p;
    try {
      if (c.T = null, o.p = 2, g) return g();
    } finally {
      c.T = p, o.p = y, o.d.f();
    }
  }, fn.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, o.d.C(g, p));
  }, fn.prefetchDNS = function(g) {
    typeof g == "string" && o.d.D(g);
  }, fn.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var y = p.as, m = h(y, p.crossOrigin), v = typeof p.integrity == "string" ? p.integrity : void 0, x = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      y === "style" ? o.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: m,
          integrity: v,
          fetchPriority: x
        }
      ) : y === "script" && o.d.X(g, {
        crossOrigin: m,
        integrity: v,
        fetchPriority: x,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, fn.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var y = h(
            p.as,
            p.crossOrigin
          );
          o.d.M(g, {
            crossOrigin: y,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && o.d.M(g);
  }, fn.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var y = p.as, m = h(y, p.crossOrigin);
      o.d.L(g, y, {
        crossOrigin: m,
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
  }, fn.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var y = h(p.as, p.crossOrigin);
        o.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else o.d.m(g);
  }, fn.requestFormReset = function(g) {
    o.d.r(g);
  }, fn.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, fn.useFormState = function(g, p, y) {
    return c.H.useFormState(g, p, y);
  }, fn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, fn.version = "19.2.7", fn;
}
var J0;
function fb() {
  if (J0) return wd.exports;
  J0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), wd.exports = sE(), wd.exports;
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
var W0;
function uE() {
  if (W0) return go;
  W0 = 1;
  var t = oE(), a = Yo(), r = fb();
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
  function g(e) {
    if (u(e) !== e)
      throw Error(o(188));
  }
  function p(e) {
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
          if (d === i) return g(f), e;
          if (d === l) return g(f), n;
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
        e = (e = n.documentElement) && (e = e.namespaceURI) ? m0(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = m0(n), e = p0(n, e);
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
    var n = te.current, i = p0(n, e.type);
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
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : U0(e.type));
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
          for (e = w0(e); e !== null; ) {
            if (i = e[ve]) return i;
            e = w0(e);
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
  function _r(e, n, i, l, f, d, b, C) {
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
  function cm(e, n, i, l) {
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
  function Nr(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Kx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function fm(e, n, i) {
    var l = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, i) : typeof i != "number" || i === 0 || Kx.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function dm(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(o(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var f in n)
        l = n[f], n.hasOwnProperty(f) && i[f] !== l && fm(e, f, l);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && fm(e, d, n[d]);
  }
  function dc(e) {
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
  var Px = /* @__PURE__ */ new Map([
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
  ]), Jx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Jo(e) {
    return Jx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Ba() {
  }
  var hc = null;
  function mc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Rr = null, Cr = null;
  function hm(e) {
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
  var pc = !1;
  function mm(e, n, i) {
    if (pc) return e(n, i);
    pc = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (pc = !1, (Rr !== null || Cr !== null) && (ks(), Rr && (n = Rr, e = Cr, Cr = Rr = null, hm(n), e)))
        for (n = 0; n < e.length; n++) hm(e[n]);
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
  var Ua = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gc = !1;
  if (Ua)
    try {
      var Tl = {};
      Object.defineProperty(Tl, "passive", {
        get: function() {
          gc = !0;
        }
      }), window.addEventListener("test", Tl, Tl), window.removeEventListener("test", Tl, Tl);
    } catch {
      gc = !1;
    }
  var hi = null, yc = null, Wo = null;
  function pm() {
    if (Wo) return Wo;
    var e, n = yc, i = n.length, l, f = "value" in hi ? hi.value : hi.textContent, d = f.length;
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
  function gm() {
    return !1;
  }
  function Sn(e) {
    function n(i, l, f, d, b) {
      this._reactName = i, this._targetInst = f, this.type = l, this.nativeEvent = d, this.target = b, this.currentTarget = null;
      for (var C in e)
        e.hasOwnProperty(C) && (i = e[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ts : gm, this.isPropagationStopped = gm, this;
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
  }, ns = Sn(Zi), Ml = m({}, Zi, { view: 0, detail: 0 }), Wx = Sn(Ml), vc, bc, Dl, as = m({}, Ml, {
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
    getModifierState: Sc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Dl && (Dl && e.type === "mousemove" ? (vc = e.screenX - Dl.screenX, bc = e.screenY - Dl.screenY) : bc = vc = 0, Dl = e), vc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : bc;
    }
  }), ym = Sn(as), eS = m({}, as, { dataTransfer: 0 }), tS = Sn(eS), nS = m({}, Ml, { relatedTarget: 0 }), xc = Sn(nS), aS = m({}, Zi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), iS = Sn(aS), rS = m({}, Zi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), lS = Sn(rS), oS = m({}, Zi, { data: 0 }), vm = Sn(oS), sS = {
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
  }, uS = {
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
  }, cS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fS(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = cS[e]) ? !!n[e] : !1;
  }
  function Sc() {
    return fS;
  }
  var dS = m({}, Ml, {
    key: function(e) {
      if (e.key) {
        var n = sS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = es(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? uS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Sc,
    charCode: function(e) {
      return e.type === "keypress" ? es(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? es(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), hS = Sn(dS), mS = m({}, as, {
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
  }), bm = Sn(mS), pS = m({}, Ml, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Sc
  }), gS = Sn(pS), yS = m({}, Zi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vS = Sn(yS), bS = m({}, as, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xS = Sn(bS), SS = m({}, Zi, {
    newState: 0,
    oldState: 0
  }), wS = Sn(SS), ES = [9, 13, 27, 32], wc = Ua && "CompositionEvent" in window, Al = null;
  Ua && "documentMode" in document && (Al = document.documentMode);
  var _S = Ua && "TextEvent" in window && !Al, xm = Ua && (!wc || Al && 8 < Al && 11 >= Al), Sm = " ", wm = !1;
  function Em(e, n) {
    switch (e) {
      case "keyup":
        return ES.indexOf(n.keyCode) !== -1;
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
  function _m(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Tr = !1;
  function NS(e, n) {
    switch (e) {
      case "compositionend":
        return _m(n);
      case "keypress":
        return n.which !== 32 ? null : (wm = !0, Sm);
      case "textInput":
        return e = n.data, e === Sm && wm ? null : e;
      default:
        return null;
    }
  }
  function RS(e, n) {
    if (Tr)
      return e === "compositionend" || !wc && Em(e, n) ? (e = pm(), Wo = yc = hi = null, Tr = !1, e) : null;
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
        return xm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var CS = {
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
  function Nm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!CS[e.type] : n === "textarea";
  }
  function Rm(e, n, i, l) {
    Rr ? Cr ? Cr.push(l) : Cr = [l] : Rr = l, n = Is(n, "onChange"), 0 < n.length && (i = new ns(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: n }));
  }
  var zl = null, Ol = null;
  function TS(e) {
    s0(e, 0);
  }
  function is(e) {
    var n = We(e);
    if (Ha(n)) return e;
  }
  function Cm(e, n) {
    if (e === "change") return n;
  }
  var Tm = !1;
  if (Ua) {
    var Ec;
    if (Ua) {
      var _c = "oninput" in document;
      if (!_c) {
        var Mm = document.createElement("div");
        Mm.setAttribute("oninput", "return;"), _c = typeof Mm.oninput == "function";
      }
      Ec = _c;
    } else Ec = !1;
    Tm = Ec && (!document.documentMode || 9 < document.documentMode);
  }
  function Dm() {
    zl && (zl.detachEvent("onpropertychange", Am), Ol = zl = null);
  }
  function Am(e) {
    if (e.propertyName === "value" && is(Ol)) {
      var n = [];
      Rm(
        n,
        Ol,
        e,
        mc(e)
      ), mm(TS, n);
    }
  }
  function MS(e, n, i) {
    e === "focusin" ? (Dm(), zl = n, Ol = i, zl.attachEvent("onpropertychange", Am)) : e === "focusout" && Dm();
  }
  function DS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return is(Ol);
  }
  function AS(e, n) {
    if (e === "click") return is(n);
  }
  function zS(e, n) {
    if (e === "input" || e === "change")
      return is(n);
  }
  function OS(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var zn = typeof Object.is == "function" ? Object.is : OS;
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
  function zm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Om(e, n) {
    var i = zm(e);
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
      i = zm(i);
    }
  }
  function jm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? jm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Lm(e) {
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
  function Nc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var jS = Ua && "documentMode" in document && 11 >= document.documentMode, Mr = null, Rc = null, Ll = null, Cc = !1;
  function Hm(e, n, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Cc || Mr == null || Mr !== dt(l) || (l = Mr, "selectionStart" in l && Nc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ll && jl(Ll, l) || (Ll = l, l = Is(Rc, "onSelect"), 0 < l.length && (n = new ns(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: l }), n.target = Mr)));
  }
  function Qi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var Dr = {
    animationend: Qi("Animation", "AnimationEnd"),
    animationiteration: Qi("Animation", "AnimationIteration"),
    animationstart: Qi("Animation", "AnimationStart"),
    transitionrun: Qi("Transition", "TransitionRun"),
    transitionstart: Qi("Transition", "TransitionStart"),
    transitioncancel: Qi("Transition", "TransitionCancel"),
    transitionend: Qi("Transition", "TransitionEnd")
  }, Tc = {}, Bm = {};
  Ua && (Bm = document.createElement("div").style, "AnimationEvent" in window || (delete Dr.animationend.animation, delete Dr.animationiteration.animation, delete Dr.animationstart.animation), "TransitionEvent" in window || delete Dr.transitionend.transition);
  function Fi(e) {
    if (Tc[e]) return Tc[e];
    if (!Dr[e]) return e;
    var n = Dr[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Bm)
        return Tc[e] = n[i];
    return e;
  }
  var Um = Fi("animationend"), km = Fi("animationiteration"), Vm = Fi("animationstart"), LS = Fi("transitionrun"), HS = Fi("transitionstart"), BS = Fi("transitioncancel"), Ym = Fi("transitionend"), qm = /* @__PURE__ */ new Map(), Mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Mc.push("scrollEnd");
  function ua(e, n) {
    qm.set(e, n), cn(n, [e]);
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
  }, Gn = [], Ar = 0, Dc = 0;
  function ls() {
    for (var e = Ar, n = Dc = Ar = 0; n < e; ) {
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
      d !== 0 && $m(i, f, d);
    }
  }
  function os(e, n, i, l) {
    Gn[Ar++] = e, Gn[Ar++] = n, Gn[Ar++] = i, Gn[Ar++] = l, Dc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Ac(e, n, i, l) {
    return os(e, n, i, l), ss(e);
  }
  function Ki(e, n) {
    return os(e, null, null, n), ss(e);
  }
  function $m(e, n, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var f = !1, d = e.return; d !== null; )
      d.childLanes |= i, l = d.alternate, l !== null && (l.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (f = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, f && n !== null && (f = 31 - kt(i), e = d.hiddenUpdates, l = e[f], l === null ? e[f] = [n] : l.push(n), n.lane = i | 536870912), d) : null;
  }
  function ss(e) {
    if (50 < ao)
      throw ao = 0, Yf = null, Error(o(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var zr = {};
  function US(e, n, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function On(e, n, i, l) {
    return new US(e, n, i, l);
  }
  function zc(e) {
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
  function Xm(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function us(e, n, i, l, f, d) {
    var b = 0;
    if (l = e, typeof e == "function") zc(e) && (b = 1);
    else if (typeof e == "string")
      b = $w(
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
  function Oc(e, n, i) {
    return e = On(6, e, null, n), e.lanes = i, e;
  }
  function Gm(e) {
    var n = On(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function jc(e, n, i) {
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
  var Im = /* @__PURE__ */ new WeakMap();
  function In(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = Im.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Ie(n)
      }, Im.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ie(n)
    };
  }
  var Or = [], jr = 0, cs = null, Hl = 0, Zn = [], Qn = 0, mi = null, Ea = 1, _a = "";
  function Va(e, n) {
    Or[jr++] = Hl, Or[jr++] = cs, cs = e, Hl = n;
  }
  function Zm(e, n, i) {
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
  function Lc(e) {
    e.return !== null && (Va(e, 1), Zm(e, 1, 0));
  }
  function Hc(e) {
    for (; e === cs; )
      cs = Or[--jr], Or[jr] = null, Hl = Or[--jr], Or[jr] = null;
    for (; e === mi; )
      mi = Zn[--Qn], Zn[Qn] = null, _a = Zn[--Qn], Zn[Qn] = null, Ea = Zn[--Qn], Zn[Qn] = null;
  }
  function Qm(e, n) {
    Zn[Qn++] = Ea, Zn[Qn++] = _a, Zn[Qn++] = mi, Ea = n.id, _a = n.overflow, mi = e;
  }
  var rn = null, Tt = null, it = !1, pi = null, Fn = !1, Bc = Error(o(519));
  function gi(e) {
    var n = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Bl(In(n, e)), Bc;
  }
  function Fm(e) {
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
        Pe("invalid", n), _r(
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
        Pe("invalid", n), cm(n, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || l.suppressHydrationWarning === !0 || d0(n.textContent, i) ? (l.popover != null && (Pe("beforetoggle", n), Pe("toggle", n)), l.onScroll != null && Pe("scroll", n), l.onScrollEnd != null && Pe("scrollend", n), l.onClick != null && (n.onclick = Ba), n = !0) : n = !1, n || gi(e, !0);
  }
  function Km(e) {
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
  function Lr(e) {
    if (e !== rn) return !1;
    if (!it) return Km(e), it = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || nd(e.type, e.memoizedProps)), i = !i), i && Tt && gi(e), Km(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Tt = S0(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Tt = S0(e);
    } else
      n === 27 ? (n = Tt, Di(e.type) ? (e = od, od = null, Tt = e) : Tt = n) : Tt = rn ? Pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ji() {
    Tt = rn = null, it = !1;
  }
  function Uc() {
    var e = pi;
    return e !== null && (Nn === null ? Nn = e : Nn.push.apply(
      Nn,
      e
    ), pi = null), e;
  }
  function Bl(e) {
    pi === null ? pi = [e] : pi.push(e);
  }
  var kc = A(null), Wi = null, Ya = null;
  function yi(e, n, i) {
    F(kc, n._currentValue), n._currentValue = i;
  }
  function qa(e) {
    e._currentValue = kc.current, k(kc);
  }
  function Vc(e, n, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function Yc(e, n, i, l) {
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
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), Vc(
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
        b.lanes |= i, d = b.alternate, d !== null && (d.lanes |= i), Vc(b, i, e), b = null;
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
  function Hr(e, n, i, l) {
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
    e !== null && Yc(
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
    return Pm(Wi, e);
  }
  function ds(e, n) {
    return Wi === null && er(e), Pm(e, n);
  }
  function Pm(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Ya === null) {
      if (e === null) throw Error(o(308));
      Ya = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ya = Ya.next = n;
    return i;
  }
  var kS = typeof AbortController < "u" ? AbortController : function() {
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
  }, VS = t.unstable_scheduleCallback, YS = t.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function qc() {
    return {
      controller: new kS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ul(e) {
    e.refCount--, e.refCount === 0 && VS(YS, function() {
      e.controller.abort();
    });
  }
  var kl = null, $c = 0, Br = 0, Ur = null;
  function qS(e, n) {
    if (kl === null) {
      var i = kl = [];
      $c = 0, Br = Zf(), Ur = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return $c++, n.then(Jm, Jm), n;
  }
  function Jm() {
    if (--$c === 0 && kl !== null) {
      Ur !== null && (Ur.status = "fulfilled");
      var e = kl;
      kl = null, Br = 0, Ur = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function $S(e, n) {
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
  var Wm = _.S;
  _.S = function(e, n) {
    Hg = Fe(), typeof n == "object" && n !== null && typeof n.then == "function" && qS(e, n), Wm !== null && Wm(e, n);
  };
  var tr = A(null);
  function Xc() {
    var e = tr.current;
    return e !== null ? e : Ct.pooledCache;
  }
  function hs(e, n) {
    n === null ? F(tr, tr.current) : F(tr, n.pool);
  }
  function ep() {
    var e = Xc();
    return e === null ? null : { parent: Gt._currentValue, pool: e };
  }
  var kr = Error(o(460)), Gc = Error(o(474)), ms = Error(o(542)), ps = { then: function() {
  } };
  function tp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function np(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(Ba, Ba), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, ip(e), e;
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
            throw e = n.reason, ip(e), e;
        }
        throw ar = n, kr;
    }
  }
  function nr(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (ar = i, kr) : i;
    }
  }
  var ar = null;
  function ap() {
    if (ar === null) throw Error(o(459));
    var e = ar;
    return ar = null, e;
  }
  function ip(e) {
    if (e === kr || e === ms)
      throw Error(o(483));
  }
  var Vr = null, Vl = 0;
  function gs(e) {
    var n = Vl;
    return Vl += 1, Vr === null && (Vr = []), np(Vr, e, n);
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
  function rp(e) {
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
      return X === null || X.tag !== 6 ? (X = Oc(ae, P.mode, ce), X.return = P, X) : (X = f(X, ae), X.return = P, X);
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
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ae.containerInfo || X.stateNode.implementation !== ae.implementation ? (X = jc(ae, P.mode, ce), X.return = P, X) : (X = f(X, ae.children || []), X.return = P, X);
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
        return X = Oc(
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
            return X = jc(
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
      return e && Ne.forEach(function(eE) {
        return n(P, eE);
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
              ce = jc(ae, P.mode, ce), ce.return = P, P = ce;
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
      return typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint" ? (ae = "" + ae, X !== null && X.tag === 6 ? (i(P, X.sibling), ce = f(X, ae), ce.return = P, P = ce) : (i(P, X), ce = Oc(ae, P.mode, ce), ce.return = P, P = ce), b(P)) : i(P, X);
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
        return Vr = null, Oe;
      } catch (Ne) {
        if (Ne === kr || Ne === ms) throw Ne;
        var ut = On(29, Ne, null, P.mode);
        return ut.lanes = ce, ut.return = P, ut;
      } finally {
      }
    };
  }
  var ir = rp(!0), lp = rp(!1), vi = !1;
  function Ic(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Zc(e, n) {
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
      return f === null ? n.next = n : (n.next = f.next, f.next = n), l.pending = n, n = ss(e), $m(e, null, i), n;
    }
    return os(e, l, n, i), ss(e);
  }
  function ql(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, i |= l, n.lanes = i, Wt(e, i);
    }
  }
  function Qc(e, n) {
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
  var Fc = !1;
  function $l() {
    if (Fc) {
      var e = Ur;
      if (e !== null) throw e;
    }
  }
  function Xl(e, n, i, l) {
    Fc = !1;
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
          re !== 0 && re === Br && (Fc = !0), ue !== null && (ue = ue.next = {
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
  function op(e, n) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(n);
  }
  function sp(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        op(i[e], n);
  }
  var Yr = A(null), vs = A(0);
  function up(e, n) {
    e = Pa, F(vs, e), F(Yr, n), Pa = e | n.baseLanes;
  }
  function Kc() {
    F(vs, Pa), F(Yr, Yr.current);
  }
  function Pc() {
    Pa = vs.current, k(Yr), k(vs);
  }
  var jn = A(null), Kn = null;
  function Si(e) {
    var n = e.alternate;
    F(Yt, Yt.current & 1), F(jn, e), Kn === null && (n === null || Yr.current !== null || n.memoizedState !== null) && (Kn = e);
  }
  function Jc(e) {
    F(Yt, Yt.current), F(jn, e), Kn === null && (Kn = e);
  }
  function cp(e) {
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
        if (i !== null && (i = i.dehydrated, i === null || rd(i) || ld(i)))
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
  var $a = 0, Ye = null, Et = null, It = null, xs = !1, qr = !1, rr = !1, Ss = 0, Gl = 0, $r = null, XS = 0;
  function Bt() {
    throw Error(o(321));
  }
  function Wc(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!zn(e[i], n[i])) return !1;
    return !0;
  }
  function ef(e, n, i, l, f, d) {
    return $a = d, Ye = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, _.H = e === null || e.memoizedState === null ? Zp : gf, rr = !1, d = i(l, f), rr = !1, qr && (d = dp(
      n,
      i,
      l,
      f
    )), fp(e), d;
  }
  function fp(e) {
    _.H = Ql;
    var n = Et !== null && Et.next !== null;
    if ($a = 0, It = Et = Ye = null, xs = !1, Gl = 0, $r = null, n) throw Error(o(300));
    e === null || Zt || (e = e.dependencies, e !== null && fs(e) && (Zt = !0));
  }
  function dp(e, n, i, l) {
    Ye = e;
    var f = 0;
    do {
      if (qr && ($r = null), Gl = 0, qr = !1, 25 <= f) throw Error(o(301));
      if (f += 1, It = Et = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      _.H = Qp, d = n(i, l);
    } while (qr);
    return d;
  }
  function GS() {
    var e = _.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Il(n) : n, e = e.useState()[0], (Et !== null ? Et.memoizedState : null) !== e && (Ye.flags |= 1024), n;
  }
  function tf() {
    var e = Ss !== 0;
    return Ss = 0, e;
  }
  function nf(e, n, i) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i;
  }
  function af(e) {
    if (xs) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      xs = !1;
    }
    $a = 0, It = Et = Ye = null, qr = !1, Gl = Ss = 0, $r = null;
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
    return Gl += 1, $r === null && ($r = []), e = np($r, e, n), n = Ye, (It === null ? n.memoizedState : It.next) === null && (n = n.alternate, _.H = n === null || n.memoizedState === null ? Zp : gf), e;
  }
  function Es(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Il(e);
      if (e.$$typeof === E) return ln(e);
    }
    throw Error(o(438, String(e)));
  }
  function rf(e) {
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
    return lf(n, Et, e);
  }
  function lf(e, n, i) {
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
            }), fe === Br && (ue = !0);
          else if (($a & re) === re) {
            ie = ie.next, re === Br && (ue = !0);
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
      if (Y === null ? b = d : Y.next = C, !zn(d, e.memoizedState) && (Zt = !0, ue && (i = Ur, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = b, e.baseQueue = Y, l.lastRenderedState = d;
    }
    return f === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function of(e) {
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
  function hp(e, n, i) {
    var l = Ye, f = qt(), d = it;
    if (d) {
      if (i === void 0) throw Error(o(407));
      i = i();
    } else i = n();
    var b = !zn(
      (Et || f).memoizedState,
      i
    );
    if (b && (f.memoizedState = i, Zt = !0), f = f.queue, cf(gp.bind(null, l, f, e), [
      e
    ]), f.getSnapshot !== n || b || It !== null && It.memoizedState.tag & 1) {
      if (l.flags |= 2048, Xr(
        9,
        { destroy: void 0 },
        pp.bind(
          null,
          l,
          f,
          i,
          n
        ),
        null
      ), Ct === null) throw Error(o(349));
      d || ($a & 127) !== 0 || mp(l, n, i);
    }
    return i;
  }
  function mp(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = Ye.updateQueue, n === null ? (n = ws(), Ye.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function pp(e, n, i, l) {
    n.value = i, n.getSnapshot = l, yp(n) && vp(e);
  }
  function gp(e, n, i) {
    return i(function() {
      yp(n) && vp(e);
    });
  }
  function yp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !zn(e, i);
    } catch {
      return !0;
    }
  }
  function vp(e) {
    var n = Ki(e, 2);
    n !== null && Rn(n, e, 2);
  }
  function sf(e) {
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
  function bp(e, n, i, l) {
    return e.baseState = i, lf(
      e,
      Et,
      typeof l == "function" ? l : Xa
    );
  }
  function IS(e, n, i, l, f) {
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
      _.T !== null ? i(!0) : d.isTransition = !1, l(d), i = n.pending, i === null ? (d.next = n.pending = d, xp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function xp(e, n) {
    var i = n.action, l = n.payload, f = e.state;
    if (n.isTransition) {
      var d = _.T, b = {};
      _.T = b;
      try {
        var C = i(f, l), Y = _.S;
        Y !== null && Y(b, C), Sp(e, n, C);
      } catch (ie) {
        uf(e, n, ie);
      } finally {
        d !== null && b.types !== null && (d.types = b.types), _.T = d;
      }
    } else
      try {
        d = i(f, l), Sp(e, n, d);
      } catch (ie) {
        uf(e, n, ie);
      }
  }
  function Sp(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        wp(e, n, l);
      },
      function(l) {
        return uf(e, n, l);
      }
    ) : wp(e, n, i);
  }
  function wp(e, n, i) {
    n.status = "fulfilled", n.value = i, Ep(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, xp(e, i)));
  }
  function uf(e, n, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = i, Ep(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Ep(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function _p(e, n) {
    return n;
  }
  function Np(e, n) {
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
      lastRenderedReducer: _p,
      lastRenderedState: n
    }, i.queue = l, i = Xp.bind(
      null,
      Ye,
      l
    ), l.dispatch = i, l = sf(!1), d = pf.bind(
      null,
      Ye,
      !1,
      l.queue
    ), l = gn(), f = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = f, i = IS.bind(
      null,
      Ye,
      f,
      d,
      i
    ), f.dispatch = i, l.memoizedState = e, [n, i, !1];
  }
  function Rp(e) {
    var n = qt();
    return Cp(n, Et, e);
  }
  function Cp(e, n, i) {
    if (n = lf(
      e,
      n,
      _p
    )[0], e = _s(Xa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Il(n);
      } catch (b) {
        throw b === kr ? ms : b;
      }
    else l = n;
    n = qt();
    var f = n.queue, d = f.dispatch;
    return i !== n.memoizedState && (Ye.flags |= 2048, Xr(
      9,
      { destroy: void 0 },
      ZS.bind(null, f, i),
      null
    )), [l, d, e];
  }
  function ZS(e, n) {
    e.action = n;
  }
  function Tp(e) {
    var n = qt(), i = Et;
    if (i !== null)
      return Cp(n, i, e);
    qt(), n = n.memoizedState, i = qt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [n, l, !1];
  }
  function Xr(e, n, i, l) {
    return e = { tag: e, create: i, deps: l, inst: n, next: null }, n = Ye.updateQueue, n === null && (n = ws(), Ye.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Mp() {
    return qt().memoizedState;
  }
  function Ns(e, n, i, l) {
    var f = gn();
    Ye.flags |= e, f.memoizedState = Xr(
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
    Et !== null && l !== null && Wc(l, Et.memoizedState.deps) ? f.memoizedState = Xr(n, d, i, l) : (Ye.flags |= e, f.memoizedState = Xr(
      1 | n,
      d,
      i,
      l
    ));
  }
  function Dp(e, n) {
    Ns(8390656, 8, e, n);
  }
  function cf(e, n) {
    Rs(2048, 8, e, n);
  }
  function QS(e) {
    Ye.flags |= 4;
    var n = Ye.updateQueue;
    if (n === null)
      n = ws(), Ye.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function Ap(e) {
    var n = qt().memoizedState;
    return QS({ ref: n, nextImpl: e }), function() {
      if ((ht & 2) !== 0) throw Error(o(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function zp(e, n) {
    return Rs(4, 2, e, n);
  }
  function Op(e, n) {
    return Rs(4, 4, e, n);
  }
  function jp(e, n) {
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
  function Lp(e, n, i) {
    i = i != null ? i.concat([e]) : null, Rs(4, 4, jp.bind(null, n, e), i);
  }
  function ff() {
  }
  function Hp(e, n) {
    var i = qt();
    n = n === void 0 ? null : n;
    var l = i.memoizedState;
    return n !== null && Wc(n, l[1]) ? l[0] : (i.memoizedState = [e, n], e);
  }
  function Bp(e, n) {
    var i = qt();
    n = n === void 0 ? null : n;
    var l = i.memoizedState;
    if (n !== null && Wc(n, l[1]))
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
  function df(e, n, i) {
    return i === void 0 || ($a & 1073741824) !== 0 && (et & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = Ug(), Ye.lanes |= e, Ni |= e, i);
  }
  function Up(e, n, i, l) {
    return zn(i, n) ? i : Yr.current !== null ? (e = df(e, i, l), zn(e, n) || (Zt = !0), e) : ($a & 42) === 0 || ($a & 1073741824) !== 0 && (et & 261930) === 0 ? (Zt = !0, e.memoizedState = i) : (e = Ug(), Ye.lanes |= e, Ni |= e, n);
  }
  function kp(e, n, i, l, f) {
    var d = L.p;
    L.p = d !== 0 && 8 > d ? d : 8;
    var b = _.T, C = {};
    _.T = C, pf(e, !1, n, i);
    try {
      var Y = f(), ie = _.S;
      if (ie !== null && ie(C, Y), Y !== null && typeof Y == "object" && typeof Y.then == "function") {
        var ue = $S(
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
  function FS() {
  }
  function hf(e, n, i, l) {
    if (e.tag !== 5) throw Error(o(476));
    var f = Vp(e).queue;
    kp(
      e,
      f,
      n,
      Z,
      i === null ? FS : function() {
        return Yp(e), i(l);
      }
    );
  }
  function Vp(e) {
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
  function Yp(e) {
    var n = Vp(e);
    n.next === null && (n = e.alternate.memoizedState), Zl(
      e,
      n.next.queue,
      {},
      Un()
    );
  }
  function mf() {
    return ln(co);
  }
  function qp() {
    return qt().memoizedState;
  }
  function $p() {
    return qt().memoizedState;
  }
  function KS(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Un();
          e = bi(i);
          var l = xi(n, e, i);
          l !== null && (Rn(l, n, i), ql(l, n, i)), n = { cache: qc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function PS(e, n, i) {
    var l = Un();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(e) ? Gp(n, i) : (i = Ac(e, n, i, l), i !== null && (Rn(i, e, l), Ip(i, n, l)));
  }
  function Xp(e, n, i) {
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
    if (Cs(e)) Gp(n, f);
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
      if (i = Ac(e, n, f, l), i !== null)
        return Rn(i, e, l), Ip(i, n, l), !0;
    }
    return !1;
  }
  function pf(e, n, i, l) {
    if (l = {
      lane: 2,
      revertLane: Zf(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(e)) {
      if (n) throw Error(o(479));
    } else
      n = Ac(
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
  function Gp(e, n) {
    qr = xs = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Ip(e, n, i) {
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
  var Zp = {
    readContext: ln,
    use: Es,
    useCallback: function(e, n) {
      return gn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: ln,
    useEffect: Dp,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Ns(
        4194308,
        4,
        jp.bind(null, n, e),
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
      }, l.queue = e, e = e.dispatch = PS.bind(
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
      e = sf(e);
      var n = e.queue, i = Xp.bind(null, Ye, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: ff,
    useDeferredValue: function(e, n) {
      var i = gn();
      return df(i, e, n);
    },
    useTransition: function() {
      var e = sf(!1);
      return e = kp.bind(
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
        (et & 127) !== 0 || mp(l, n, i);
      }
      f.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return f.queue = d, Dp(gp.bind(null, l, d, e), [
        e
      ]), l.flags |= 2048, Xr(
        9,
        { destroy: void 0 },
        pp.bind(
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
        i = XS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: mf,
    useFormState: Np,
    useActionState: Np,
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
      return n.queue = i, n = pf.bind(
        null,
        Ye,
        !0,
        i
      ), i.dispatch = n, [e, n];
    },
    useMemoCache: rf,
    useCacheRefresh: function() {
      return gn().memoizedState = KS.bind(
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
  }, gf = {
    readContext: ln,
    use: Es,
    useCallback: Hp,
    useContext: ln,
    useEffect: cf,
    useImperativeHandle: Lp,
    useInsertionEffect: zp,
    useLayoutEffect: Op,
    useMemo: Bp,
    useReducer: _s,
    useRef: Mp,
    useState: function() {
      return _s(Xa);
    },
    useDebugValue: ff,
    useDeferredValue: function(e, n) {
      var i = qt();
      return Up(
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
    useSyncExternalStore: hp,
    useId: qp,
    useHostTransitionStatus: mf,
    useFormState: Rp,
    useActionState: Rp,
    useOptimistic: function(e, n) {
      var i = qt();
      return bp(i, Et, e, n);
    },
    useMemoCache: rf,
    useCacheRefresh: $p
  };
  gf.useEffectEvent = Ap;
  var Qp = {
    readContext: ln,
    use: Es,
    useCallback: Hp,
    useContext: ln,
    useEffect: cf,
    useImperativeHandle: Lp,
    useInsertionEffect: zp,
    useLayoutEffect: Op,
    useMemo: Bp,
    useReducer: of,
    useRef: Mp,
    useState: function() {
      return of(Xa);
    },
    useDebugValue: ff,
    useDeferredValue: function(e, n) {
      var i = qt();
      return Et === null ? df(i, e, n) : Up(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = of(Xa)[0], n = qt().memoizedState;
      return [
        typeof e == "boolean" ? e : Il(e),
        n
      ];
    },
    useSyncExternalStore: hp,
    useId: qp,
    useHostTransitionStatus: mf,
    useFormState: Tp,
    useActionState: Tp,
    useOptimistic: function(e, n) {
      var i = qt();
      return Et !== null ? bp(i, Et, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: rf,
    useCacheRefresh: $p
  };
  Qp.useEffectEvent = Ap;
  function yf(e, n, i, l) {
    n = e.memoizedState, i = i(l, n), i = i == null ? n : m({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var vf = {
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
  function Fp(e, n, i, l, f, d, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, b) : n.prototype && n.prototype.isPureReactComponent ? !jl(i, l) || !jl(f, d) : !0;
  }
  function Kp(e, n, i, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, l), n.state !== e && vf.enqueueReplaceState(n, n.state, null);
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
  function Pp(e) {
    rs(e);
  }
  function Jp(e) {
    console.error(e);
  }
  function Wp(e) {
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
  function eg(e, n, i) {
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
  function bf(e, n, i) {
    return i = bi(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ts(e, n);
    }, i;
  }
  function tg(e) {
    return e = bi(e), e.tag = 3, e;
  }
  function ng(e, n, i, l) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var d = l.value;
      e.payload = function() {
        return f(d);
      }, e.callback = function() {
        eg(n, i, l);
      };
    }
    var b = i.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      eg(n, i, l), typeof f != "function" && (Ri === null ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var C = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function JS(e, n, i, l, f) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = i.alternate, n !== null && Hr(
        n,
        i,
        f,
        !0
      ), i = jn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Kn === null ? Vs() : i.alternate === null && Ut === 0 && (Ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, l === ps ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Xf(e, l, f)), !1;
          case 22:
            return i.flags |= 65536, l === ps ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), Xf(e, l, f)), !1;
        }
        throw Error(o(435, i.tag));
      }
      return Xf(e, l, f), Vs(), !1;
    }
    if (it)
      return n = jn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, l !== Bc && (e = Error(o(422), { cause: l }), Bl(In(e, i)))) : (l !== Bc && (n = Error(o(423), {
        cause: l
      }), Bl(
        In(n, i)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, l = In(l, i), f = bf(
        e.stateNode,
        l,
        f
      ), Qc(e, f), Ut !== 4 && (Ut = 2)), !1;
    var d = Error(o(520), { cause: l });
    if (d = In(d, i), no === null ? no = [d] : no.push(d), Ut !== 4 && (Ut = 2), n === null) return !0;
    l = In(l, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = f & -f, i.lanes |= e, e = bf(i.stateNode, l, e), Qc(i, e), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Ri === null || !Ri.has(d))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = tg(f), ng(
              f,
              e,
              i,
              l
            ), Qc(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var xf = Error(o(461)), Zt = !1;
  function on(e, n, i, l) {
    n.child = e === null ? lp(n, null, i, l) : ir(
      n,
      e.child,
      i,
      l
    );
  }
  function ag(e, n, i, l, f) {
    i = i.render;
    var d = n.ref;
    if ("ref" in l) {
      var b = {};
      for (var C in l)
        C !== "ref" && (b[C] = l[C]);
    } else b = l;
    return er(n), l = ef(
      e,
      n,
      i,
      b,
      d,
      f
    ), C = tf(), e !== null && !Zt ? (nf(e, n, f), Ga(e, n, f)) : (it && C && Lc(n), n.flags |= 1, on(e, n, l, f), n.child);
  }
  function ig(e, n, i, l, f) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !zc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, rg(
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
    if (d = e.child, !Tf(e, f)) {
      var b = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : jl, i(b, l) && e.ref === n.ref)
        return Ga(e, n, f);
    }
    return n.flags |= 1, e = ka(d, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function rg(e, n, i, l, f) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (jl(d, l) && e.ref === n.ref)
        if (Zt = !1, n.pendingProps = l = d, Tf(e, f))
          (e.flags & 131072) !== 0 && (Zt = !0);
        else
          return n.lanes = e.lanes, Ga(e, n, f);
    }
    return Sf(
      e,
      n,
      i,
      l,
      f
    );
  }
  function lg(e, n, i, l) {
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
        return og(
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
        ), d !== null ? up(n, d) : Kc(), cp(n);
      else
        return l = n.lanes = 536870912, og(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          l
        );
    } else
      d !== null ? (hs(n, d.cachePool), up(n, d), wi(), n.memoizedState = null) : (e !== null && hs(n, null), Kc(), wi());
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
  function og(e, n, i, l, f) {
    var d = Xc();
    return d = d === null ? null : { parent: Gt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && hs(n, null), Kc(), cp(n), e !== null && Hr(e, n, l, !0), n.childLanes = f, null;
  }
  function Ms(e, n) {
    return n = As(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function sg(e, n, i) {
    return ir(n, e.child, null, i), e = Ms(n, n.pendingProps), e.flags |= 2, Ln(n), n.memoizedState = null, e;
  }
  function WS(e, n, i) {
    var l = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (it) {
        if (l.mode === "hidden")
          return e = Ms(n, l), n.lanes = 536870912, Fl(null, e);
        if (Jc(n), (e = Tt) ? (e = x0(
          e,
          Fn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: mi !== null ? { id: Ea, overflow: _a } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Gm(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw gi(n);
        return n.lanes = 536870912, null;
      }
      return Ms(n, l);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var b = d.dehydrated;
      if (Jc(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = sg(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(o(558));
      else if (Zt || Hr(e, n, i, !1), f = (i & e.childLanes) !== 0, Zt || f) {
        if (l = Ct, l !== null && (b = B(l, i), b !== 0 && b !== d.retryLane))
          throw d.retryLane = b, Ki(e, b), Rn(l, e, b), xf;
        Vs(), n = sg(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, Tt = Pn(b.nextSibling), rn = n, it = !0, pi = null, Fn = !1, e !== null && Qm(n, e), n = Ms(n, l), n.flags |= 4096;
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
  function Sf(e, n, i, l, f) {
    return er(n), i = ef(
      e,
      n,
      i,
      l,
      void 0,
      f
    ), l = tf(), e !== null && !Zt ? (nf(e, n, f), Ga(e, n, f)) : (it && l && Lc(n), n.flags |= 1, on(e, n, i, f), n.child);
  }
  function ug(e, n, i, l, f, d) {
    return er(n), n.updateQueue = null, i = dp(
      n,
      l,
      i,
      f
    ), fp(e), l = tf(), e !== null && !Zt ? (nf(e, n, d), Ga(e, n, d)) : (it && l && Lc(n), n.flags |= 1, on(e, n, i, d), n.child);
  }
  function cg(e, n, i, l, f) {
    if (er(n), n.stateNode === null) {
      var d = zr, b = i.contextType;
      typeof b == "object" && b !== null && (d = ln(b)), d = new i(l, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = vf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = l, d.state = n.memoizedState, d.refs = {}, Ic(n), b = i.contextType, d.context = typeof b == "object" && b !== null ? ln(b) : zr, d.state = n.memoizedState, b = i.getDerivedStateFromProps, typeof b == "function" && (yf(
        n,
        i,
        b,
        l
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (b = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), b !== d.state && vf.enqueueReplaceState(d, d.state, null), Xl(n, l, d, f), $l(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      d = n.stateNode;
      var C = n.memoizedProps, Y = lr(i, C);
      d.props = Y;
      var ie = d.context, ue = i.contextType;
      b = zr, typeof ue == "object" && ue !== null && (b = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || ie !== b) && Kp(
        n,
        d,
        l,
        b
      ), vi = !1;
      var re = n.memoizedState;
      d.state = re, Xl(n, l, d, f), $l(), ie = n.memoizedState, C || re !== ie || vi ? (typeof fe == "function" && (yf(
        n,
        i,
        fe,
        l
      ), ie = n.memoizedState), (Y = vi || Fp(
        n,
        i,
        Y,
        l,
        re,
        ie,
        b
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ie), d.props = l, d.state = ie, d.context = b, l = Y) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      d = n.stateNode, Zc(e, n), b = n.memoizedProps, ue = lr(i, b), d.props = ue, fe = n.pendingProps, re = d.context, ie = i.contextType, Y = zr, typeof ie == "object" && ie !== null && (Y = ln(ie)), C = i.getDerivedStateFromProps, (ie = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (b !== fe || re !== Y) && Kp(
        n,
        d,
        l,
        Y
      ), vi = !1, re = n.memoizedState, d.state = re, Xl(n, l, d, f), $l();
      var oe = n.memoizedState;
      b !== fe || re !== oe || vi || e !== null && e.dependencies !== null && fs(e.dependencies) ? (typeof C == "function" && (yf(
        n,
        i,
        C,
        l
      ), oe = n.memoizedState), (ue = vi || Fp(
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
  function fg(e, n, i, l) {
    return Ji(), n.flags |= 256, on(e, n, i, l), n.child;
  }
  var wf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ef(e) {
    return { baseLanes: e, cachePool: ep() };
  }
  function _f(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= Bn), e;
  }
  function dg(e, n, i) {
    var l = n.pendingProps, f = !1, d = (n.flags & 128) !== 0, b;
    if ((b = d) || (b = e !== null && e.memoizedState === null ? !1 : (Yt.current & 2) !== 0), b && (f = !0, n.flags &= -129), b = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (it) {
        if (f ? Si(n) : wi(), (e = Tt) ? (e = x0(
          e,
          Fn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: mi !== null ? { id: Ea, overflow: _a } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Gm(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw gi(n);
        return ld(e) ? n.lanes = 32 : n.lanes = 536870912, null;
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
      ), C.return = n, l.return = n, C.sibling = l, n.child = C, l = n.child, l.memoizedState = Ef(i), l.childLanes = _f(
        e,
        b,
        i
      ), n.memoizedState = wf, Fl(null, l)) : (Si(n), Nf(n, C));
    }
    var Y = e.memoizedState;
    if (Y !== null && (C = Y.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (Si(n), n.flags &= -257, n = Rf(
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
        ), l = n.child, l.memoizedState = Ef(i), l.childLanes = _f(
          e,
          b,
          i
        ), n.memoizedState = wf, n = Fl(null, l));
      else if (Si(n), ld(C)) {
        if (b = C.nextSibling && C.nextSibling.dataset, b) var ie = b.dgst;
        b = ie, l = Error(o(419)), l.stack = "", l.digest = b, Bl({ value: l, source: null, stack: null }), n = Rf(
          e,
          n,
          i
        );
      } else if (Zt || Hr(e, n, i, !1), b = (i & e.childLanes) !== 0, Zt || b) {
        if (b = Ct, b !== null && (l = B(b, i), l !== 0 && l !== Y.retryLane))
          throw Y.retryLane = l, Ki(e, l), Rn(b, e, l), xf;
        rd(C) || Vs(), n = Rf(
          e,
          n,
          i
        );
      } else
        rd(C) ? (n.flags |= 192, n.child = e.child, n = null) : (e = Y.treeContext, Tt = Pn(
          C.nextSibling
        ), rn = n, it = !0, pi = null, Fn = !1, e !== null && Qm(n, e), n = Nf(
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
    ), C.flags |= 2), C.return = n, l.return = n, l.sibling = C, n.child = l, Fl(null, l), l = n.child, C = e.child.memoizedState, C === null ? C = Ef(i) : (f = C.cachePool, f !== null ? (Y = Gt._currentValue, f = f.parent !== Y ? { parent: Y, pool: Y } : f) : f = ep(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: f
    }), l.memoizedState = C, l.childLanes = _f(
      e,
      b,
      i
    ), n.memoizedState = wf, Fl(e.child, l)) : (Si(n), i = e.child, e = i.sibling, i = ka(i, {
      mode: "visible",
      children: l.children
    }), i.return = n, i.sibling = null, e !== null && (b = n.deletions, b === null ? (n.deletions = [e], n.flags |= 16) : b.push(e)), n.child = i, n.memoizedState = null, i);
  }
  function Nf(e, n) {
    return n = As(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function As(e, n) {
    return e = On(22, e, null, n), e.lanes = 0, e;
  }
  function Rf(e, n, i) {
    return ir(n, e.child, null, i), e = Nf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function hg(e, n, i) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Vc(e.return, n, i);
  }
  function Cf(e, n, i, l, f, d) {
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
  function mg(e, n, i) {
    var l = n.pendingProps, f = l.revealOrder, d = l.tail;
    l = l.children;
    var b = Yt.current, C = (b & 2) !== 0;
    if (C ? (b = b & 1 | 2, n.flags |= 128) : b &= 1, F(Yt, b), on(e, n, l, i), l = it ? Hl : 0, !C && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && hg(e, i, n);
        else if (e.tag === 19)
          hg(e, i, n);
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
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), Cf(
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
        Cf(
          n,
          !0,
          i,
          null,
          d,
          l
        );
        break;
      case "together":
        Cf(
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
        if (Hr(
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
  function Tf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fs(e)));
  }
  function ew(e, n, i) {
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
          return n.flags |= 128, Jc(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Si(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? dg(e, n, i) : (Si(n), e = Ga(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        Si(n);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (l = (i & n.childLanes) !== 0, l || (Hr(
          e,
          n,
          i,
          !1
        ), l = (i & n.childLanes) !== 0), f) {
          if (l)
            return mg(
              e,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), F(Yt, Yt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, lg(
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
  function pg(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Zt = !0;
      else {
        if (!Tf(e, i) && (n.flags & 128) === 0)
          return Zt = !1, ew(
            e,
            n,
            i
          );
        Zt = (e.flags & 131072) !== 0;
      }
    else
      Zt = !1, it && (n.flags & 1048576) !== 0 && Zm(n, Hl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = nr(n.elementType), n.type = e, typeof e == "function")
            zc(e) ? (l = lr(e, l), n.tag = 1, n = cg(
              null,
              n,
              e,
              l,
              i
            )) : (n.tag = 0, n = Sf(
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
                n.tag = 11, n = ag(
                  null,
                  n,
                  e,
                  l,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = ig(
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
        return Sf(
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
        ), cg(
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
          f = d.element, Zc(e, n), Xl(n, l, null, i);
          var b = n.memoizedState;
          if (l = b.cache, yi(n, Gt, l), l !== d.cache && Yc(
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
              n = fg(
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
              ), Bl(f), n = fg(
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
              for (Tt = Pn(e.firstChild), rn = n, it = !0, pi = null, Fn = !0, i = lp(
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
        return Ds(e, n), e === null ? (i = R0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, e = n.pendingProps, l = Zs(
          he.current
        ).createElement(i), l[ve] = n, l[Se] = e, sn(l, i, e), at(l), n.stateNode = l) : n.memoizedState = R0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && it && (l = n.stateNode = E0(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Fn = !0, f = Tt, Di(n.type) ? (od = f, Tt = Pn(l.firstChild)) : Tt = f), on(
          e,
          n,
          n.pendingProps.children,
          i
        ), Ds(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && it && ((f = l = Tt) && (l = Dw(
          l,
          n.type,
          n.pendingProps,
          Fn
        ), l !== null ? (n.stateNode = l, rn = n, Tt = Pn(l.firstChild), Fn = !1, f = !0) : f = !1), f || gi(n)), ze(n), f = n.type, d = n.pendingProps, b = e !== null ? e.memoizedProps : null, l = d.children, nd(f, d) ? l = null : b !== null && nd(f, b) && (n.flags |= 32), n.memoizedState !== null && (f = ef(
          e,
          n,
          GS,
          null,
          null,
          i
        ), co._currentValue = f), Ds(e, n), on(e, n, l, i), n.child;
      case 6:
        return e === null && it && ((e = i = Tt) && (i = Aw(
          i,
          n.pendingProps,
          Fn
        ), i !== null ? (n.stateNode = i, rn = n, Tt = null, e = !0) : e = !1), e || gi(n)), null;
      case 13:
        return dg(e, n, i);
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
        return ag(
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
        return ig(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return rg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return mg(e, n, i);
      case 31:
        return WS(e, n, i);
      case 22:
        return lg(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return er(n), l = ln(Gt), e === null ? (f = Xc(), f === null && (f = Ct, d = qc(), f.pooledCache = d, d.refCount++, d !== null && (f.pooledCacheLanes |= i), f = d), n.memoizedState = { parent: l, cache: f }, Ic(n), yi(n, Gt, f)) : ((e.lanes & i) !== 0 && (Zc(e, n), Xl(n, null, null, i), $l()), f = e.memoizedState, d = n.memoizedState, f.parent !== l ? (f = { parent: l, cache: l }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), yi(n, Gt, l)) : (l = d.cache, yi(n, Gt, l), l !== f.cache && Yc(
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
  function Mf(e, n, i, l, f) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (qg()) e.flags |= 8192;
        else
          throw ar = ps, Gc;
    } else e.flags &= -16777217;
  }
  function gg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !A0(n))
      if (qg()) e.flags |= 8192;
      else
        throw ar = ps, Gc;
  }
  function zs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Vt() : 536870912, e.lanes |= n, Qr |= n);
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
  function tw(e, n, i) {
    var l = n.pendingProps;
    switch (Hc(n), n.tag) {
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
        return i = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), qa(Gt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Lr(n) ? Ia(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Uc())), Mt(n), null;
      case 26:
        var f = n.type, d = n.memoizedState;
        return e === null ? (Ia(n), d !== null ? (Mt(n), gg(n, d)) : (Mt(n), Mf(
          n,
          f,
          null,
          l,
          i
        ))) : d ? d !== e.memoizedState ? (Ia(n), Mt(n), gg(n, d)) : (Mt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ia(n), Mt(n), Mf(
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
          e = te.current, Lr(n) ? Fm(n) : (e = E0(f, l, i), n.stateNode = e, Ia(n));
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
          if (d = te.current, Lr(n))
            Fm(n);
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
        return Mt(n), Mf(
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
          if (e = he.current, Lr(n)) {
            if (e = n.stateNode, i = n.memoizedProps, l = null, f = rn, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  l = f.memoizedProps;
              }
            e[ve] = n, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || d0(e.nodeValue, i)), e || gi(n, !0);
          } else
            e = Zs(e).createTextNode(
              l
            ), e[ve] = n, n.stateNode = e;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Lr(n), i !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ve] = n;
            } else
              Ji(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), e = !1;
          } else
            i = Uc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Mt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = Lr(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(o(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(o(317));
              f[ve] = n;
            } else
              Ji(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = Uc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
        }
        return Ln(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = n.child, f = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (f = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== f && (l.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), zs(n, n.updateQueue), Mt(n), null);
      case 4:
        return ge(), e === null && Pf(n.stateNode.containerInfo), Mt(n), null;
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
                    Xm(i, e), i = i.sibling;
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
        return Ln(n), Pc(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && zs(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== i && (n.flags |= 2048), e !== null && k(tr), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), qa(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function nw(e, n) {
    switch (Hc(n), n.tag) {
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
        return Ln(n), Pc(), e !== null && k(tr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return qa(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function yg(e, n) {
    switch (Hc(n), n.tag) {
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
        Ln(n), Pc(), e !== null && k(tr);
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
  function vg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        sp(n, i);
      } catch (l) {
        St(e, e.return, l);
      }
    }
  }
  function bg(e, n, i) {
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
  function xg(e) {
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
  function Df(e, n, i) {
    try {
      var l = e.stateNode;
      _w(l, e.type, i, n), l[Se] = n;
    } catch (f) {
      St(e, e.return, f);
    }
  }
  function Sg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Di(e.type) || e.tag === 4;
  }
  function Af(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Sg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Di(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function zf(e, n, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ba));
    else if (l !== 4 && (l === 27 && Di(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (zf(e, n, i), e = e.sibling; e !== null; )
        zf(e, n, i), e = e.sibling;
  }
  function Os(e, n, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && Di(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Os(e, n, i), e = e.sibling; e !== null; )
        Os(e, n, i), e = e.sibling;
  }
  function wg(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, l, i), n[ve] = e, n[Se] = i;
    } catch (d) {
      St(e, e.return, d);
    }
  }
  var Za = !1, Qt = !1, Of = !1, Eg = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function aw(e, n) {
    if (e = e.containerInfo, ed = eu, e = Lm(e), Nc(e)) {
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
    for (td = { focusedElem: e, selectionRange: i }, eu = !1, en = n; en !== null; )
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
                  id(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      id(e);
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
  function _g(e, n, i) {
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
        l & 64 && vg(i), l & 512 && Jl(i, i.return);
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
            sp(e, n);
          } catch (b) {
            St(i, i.return, b);
          }
        }
        break;
      case 27:
        n === null && l & 4 && wg(i);
      case 26:
      case 5:
        Fa(e, i), n === null && l & 4 && xg(i), l & 512 && Jl(i, i.return);
        break;
      case 12:
        Fa(e, i);
        break;
      case 31:
        Fa(e, i), l & 4 && Cg(e, i);
        break;
      case 13:
        Fa(e, i), l & 4 && Tg(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = dw.bind(
          null,
          i
        ), zw(e, i))));
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
  function Ng(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Ng(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && rt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Dt = null, wn = !1;
  function Qa(e, n, i) {
    for (i = i.child; i !== null; )
      Rg(e, n, i), i = i.sibling;
  }
  function Rg(e, n, i) {
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
        Dt !== null && (wn ? (e = Dt, v0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), nl(e)) : v0(Dt, i.stateNode));
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
        Qt || (Na(i, n), l = i.stateNode, typeof l.componentWillUnmount == "function" && bg(
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
  function Cg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        nl(e);
      } catch (i) {
        St(n, n.return, i);
      }
    }
  }
  function Tg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        nl(e);
      } catch (i) {
        St(n, n.return, i);
      }
  }
  function iw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Eg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Eg()), n;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function js(e, n) {
    var i = iw(e);
    n.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var f = hw.bind(null, e, l);
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
        Rg(d, b, f), Dt = null, wn = !1, d = f.alternate, d !== null && (d.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Mg(n, e), n = n.sibling;
  }
  var ca = null;
  function Mg(e, n) {
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
                      var b = M0(
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
                      if (b = M0(
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
                D0(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = T0(
                f,
                l,
                e.memoizedProps
              );
          else
            d !== l ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, l === null ? D0(
              f,
              e.type,
              e.stateNode
            ) : T0(
              f,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Df(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        En(n, e), _n(e), l & 512 && (Qt || i === null || Na(i, i.return)), i !== null && l & 4 && Df(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (En(n, e), _n(e), l & 512 && (Qt || i === null || Na(i, i.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Nr(f, "");
          } catch (_e) {
            St(e, e.return, _e);
          }
        }
        l & 4 && e.stateNode != null && (f = e.memoizedProps, Df(
          e,
          f,
          i !== null ? i.memoizedProps : f
        )), l & 1024 && (Of = !0);
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
            nl(n.containerInfo);
          } catch (_e) {
            St(e, e.return, _e);
          }
        Of && (Of = !1, Dg(e));
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
                  f ? b0(oe, !0) : b0(Y.stateNode, !1);
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
          if (Sg(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(o(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, d = Af(e);
            Os(e, d, f);
            break;
          case 5:
            var b = i.stateNode;
            i.flags & 32 && (Nr(b, ""), i.flags &= -33);
            var C = Af(e);
            Os(e, C, b);
            break;
          case 3:
          case 4:
            var Y = i.stateNode.containerInfo, ie = Af(e);
            zf(
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
  function Dg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Dg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Fa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        _g(e, n.alternate, n), n = n.sibling;
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
          typeof i.componentWillUnmount == "function" && bg(
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
                  op(Y[f], C);
            } catch (ie) {
              St(l, l.return, ie);
            }
          }
          i && b & 64 && vg(d), Jl(d, d.return);
          break;
        case 27:
          wg(d);
        case 26:
        case 5:
          Ka(
            f,
            d,
            i
          ), i && l === null && b & 4 && xg(d), Jl(d, d.return);
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
          ), i && b & 4 && Cg(f, d);
          break;
        case 13:
          Ka(
            f,
            d,
            i
          ), i && b & 4 && Tg(f, d);
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
  function jf(e, n) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Ul(i));
  }
  function Lf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Ul(e));
  }
  function fa(e, n, i, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Ag(
          e,
          n,
          i,
          l
        ), n = n.sibling;
  }
  function Ag(e, n, i, l) {
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
        ) : (d._visibility |= 2, Gr(
          e,
          n,
          i,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && jf(b, n);
        break;
      case 24:
        fa(
          e,
          n,
          i,
          l
        ), f & 2048 && Lf(n.alternate, n);
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
  function Gr(e, n, i, l, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, b = n, C = i, Y = l, ie = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Gr(
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
          b.memoizedState !== null ? ue._visibility & 2 ? Gr(
            d,
            b,
            C,
            Y,
            f
          ) : Wl(
            d,
            b
          ) : (ue._visibility |= 2, Gr(
            d,
            b,
            C,
            Y,
            f
          )), f && ie & 2048 && jf(
            b.alternate,
            b
          );
          break;
        case 24:
          Gr(
            d,
            b,
            C,
            Y,
            f
          ), f && ie & 2048 && Lf(b.alternate, b);
          break;
        default:
          Gr(
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
            Wl(i, l), f & 2048 && jf(
              l.alternate,
              l
            );
            break;
          case 24:
            Wl(i, l), f & 2048 && Lf(l.alternate, l);
            break;
          default:
            Wl(i, l);
        }
        n = n.sibling;
      }
  }
  var eo = 8192;
  function Ir(e, n, i) {
    if (e.subtreeFlags & eo)
      for (e = e.child; e !== null; )
        zg(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function zg(e, n, i) {
    switch (e.tag) {
      case 26:
        Ir(
          e,
          n,
          i
        ), e.flags & eo && e.memoizedState !== null && Xw(
          i,
          ca,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ir(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var l = ca;
        ca = Qs(e.stateNode.containerInfo), Ir(
          e,
          n,
          i
        ), ca = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = eo, eo = 16777216, Ir(
          e,
          n,
          i
        ), eo = l) : Ir(
          e,
          n,
          i
        ));
        break;
      default:
        Ir(
          e,
          n,
          i
        );
    }
  }
  function Og(e) {
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
          en = l, Lg(
            l,
            e
          );
        }
      Og(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        jg(e), e = e.sibling;
  }
  function jg(e) {
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
          en = l, Lg(
            l,
            e
          );
        }
      Og(e);
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
  function Lg(e, n) {
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
          if (Ng(l), l === i) {
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
  var rw = {
    getCacheForType: function(e) {
      var n = ln(Gt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return ln(Gt).controller.signal;
    }
  }, lw = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Ct = null, Ke = null, et = 0, xt = 0, Hn = null, _i = !1, Zr = !1, Hf = !1, Pa = 0, Ut = 0, Ni = 0, sr = 0, Bf = 0, Bn = 0, Qr = 0, no = null, Nn = null, Uf = !1, Hs = 0, Hg = 0, Bs = 1 / 0, Us = null, Ri = null, Jt = 0, Ci = null, Fr = null, Ja = 0, kf = 0, Vf = null, Bg = null, ao = 0, Yf = null;
  function Un() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : _.T !== null ? Zf() : de();
  }
  function Ug() {
    if (Bn === 0)
      if ((et & 536870912) === 0 || it) {
        var e = Mn;
        Mn <<= 1, (Mn & 3932160) === 0 && (Mn = 262144), Bn = e;
      } else Bn = 536870912;
    return e = jn.current, e !== null && (e.flags |= 32), Bn;
  }
  function Rn(e, n, i) {
    (e === Ct && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null) && (Kr(e, 0), Ti(
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
  function kg(e, n, i) {
    if ((ht & 6) !== 0) throw Error(o(327));
    var l = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || vt(e, n), f = l ? uw(e, n) : $f(e, n, !0), d = l;
    do {
      if (f === 0) {
        Zr && !l && Ti(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !ow(i)) {
          f = $f(e, n, !1), d = !1;
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
              if (Y && (Kr(C, b).flags |= 256), b = $f(
                C,
                b,
                !1
              ), b !== 2) {
                if (Hf && !Y) {
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
          Kr(e, 0), Ti(e, n, 0, !0);
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
            Ja = n, l.timeoutHandle = g0(
              Vg.bind(
                null,
                l,
                i,
                Nn,
                Us,
                Uf,
                n,
                Bn,
                sr,
                Qr,
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
          Vg(
            l,
            i,
            Nn,
            Us,
            Uf,
            n,
            Bn,
            sr,
            Qr,
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
  function Vg(e, n, i, l, f, d, b, C, Y, ie, ue, fe, re, oe) {
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
      }, zg(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? Hs - Fe() : (d & 4194048) === d ? Hg - Fe() : 0;
      if (_e = Gw(
        fe,
        _e
      ), _e !== null) {
        Ja = d, e.cancelPendingCommit = _e(
          Qg.bind(
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
    Qg(
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
  function ow(e) {
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
    n &= ~Bf, n &= ~sr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var f = n; 0 < f; ) {
      var d = 31 - kt(f), b = 1 << d;
      l[d] = -1, f &= ~b;
    }
    i !== 0 && la(e, i, n);
  }
  function ks() {
    return (ht & 6) === 0 ? (io(0), !1) : !0;
  }
  function qf() {
    if (Ke !== null) {
      if (xt === 0)
        var e = Ke.return;
      else
        e = Ke, Ya = Wi = null, af(e), Vr = null, Vl = 0, e = Ke;
      for (; e !== null; )
        yg(e.alternate, e), e = e.return;
      Ke = null;
    }
  }
  function Kr(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Cw(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Ja = 0, qf(), Ct = e, Ke = i = ka(e.current, null), et = n, xt = 0, Hn = null, _i = !1, Zr = vt(e, n), Hf = !1, Qr = Bn = Bf = sr = Ni = Ut = 0, Nn = no = null, Uf = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var f = 31 - kt(l), d = 1 << f;
        n |= e[f], l &= ~d;
      }
    return Pa = n, ls(), i;
  }
  function Yg(e, n) {
    Ye = null, _.H = Ql, n === kr || n === ms ? (n = ap(), xt = 3) : n === Gc ? (n = ap(), xt = 4) : xt = n === xf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Hn = n, Ke === null && (Ut = 1, Ts(
      e,
      In(n, e.current)
    ));
  }
  function qg() {
    var e = jn.current;
    return e === null ? !0 : (et & 4194048) === et ? Kn === null : (et & 62914560) === et || (et & 536870912) !== 0 ? e === Kn : !1;
  }
  function $g() {
    var e = _.H;
    return _.H = Ql, e === null ? Ql : e;
  }
  function Xg() {
    var e = _.A;
    return _.A = rw, e;
  }
  function Vs() {
    Ut = 4, _i || (et & 4194048) !== et && jn.current !== null || (Zr = !0), (Ni & 134217727) === 0 && (sr & 134217727) === 0 || Ct === null || Ti(
      Ct,
      et,
      Bn,
      !1
    );
  }
  function $f(e, n, i) {
    var l = ht;
    ht |= 2;
    var f = $g(), d = Xg();
    (Ct !== e || et !== n) && (Us = null, Kr(e, n)), n = !1;
    var b = Ut;
    e: do
      try {
        if (xt !== 0 && Ke !== null) {
          var C = Ke, Y = Hn;
          switch (xt) {
            case 8:
              qf(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jn.current === null && (n = !0);
              var ie = xt;
              if (xt = 0, Hn = null, Pr(e, C, Y, ie), i && Zr) {
                b = 0;
                break e;
              }
              break;
            default:
              ie = xt, xt = 0, Hn = null, Pr(e, C, Y, ie);
          }
        }
        sw(), b = Ut;
        break;
      } catch (ue) {
        Yg(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ya = Wi = null, ht = l, _.H = f, _.A = d, Ke === null && (Ct = null, et = 0, ls()), b;
  }
  function sw() {
    for (; Ke !== null; ) Gg(Ke);
  }
  function uw(e, n) {
    var i = ht;
    ht |= 2;
    var l = $g(), f = Xg();
    Ct !== e || et !== n ? (Us = null, Bs = Fe() + 500, Kr(e, n)) : Zr = vt(
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
              xt = 0, Hn = null, Pr(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (tp(d)) {
                xt = 0, Hn = null, Ig(n);
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
              tp(d) ? (xt = 0, Hn = null, Ig(n)) : (xt = 0, Hn = null, Pr(e, n, d, 7));
              break;
            case 5:
              var b = null;
              switch (Ke.tag) {
                case 26:
                  b = Ke.memoizedState;
                case 5:
                case 27:
                  var C = Ke;
                  if (b ? A0(b) : C.stateNode.complete) {
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
              xt = 0, Hn = null, Pr(e, n, d, 5);
              break;
            case 6:
              xt = 0, Hn = null, Pr(e, n, d, 6);
              break;
            case 8:
              qf(), Ut = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        cw();
        break;
      } catch (ue) {
        Yg(e, ue);
      }
    while (!0);
    return Ya = Wi = null, _.H = l, _.A = f, ht = i, Ke !== null ? 0 : (Ct = null, et = 0, ls(), Ut);
  }
  function cw() {
    for (; Ke !== null && !Je(); )
      Gg(Ke);
  }
  function Gg(e) {
    var n = pg(e.alternate, e, Pa);
    e.memoizedProps = e.pendingProps, n === null ? Ys(e) : Ke = n;
  }
  function Ig(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = ug(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = ug(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        af(n);
      default:
        yg(i, n), n = Ke = Xm(n, Pa), n = pg(i, n, Pa);
    }
    e.memoizedProps = e.pendingProps, n === null ? Ys(e) : Ke = n;
  }
  function Pr(e, n, i, l) {
    Ya = Wi = null, af(n), Vr = null, Vl = 0;
    var f = n.return;
    try {
      if (JS(
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
    n.flags & 32768 ? (it || l === 1 ? e = !0 : Zr || (et & 536870912) !== 0 ? e = !1 : (_i = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = jn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Zg(n, e)) : Ys(n);
  }
  function Ys(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Zg(
          n,
          _i
        );
        return;
      }
      e = n.return;
      var i = tw(
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
  function Zg(e, n) {
    do {
      var i = nw(e.alternate, e);
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
  function Qg(e, n, i, l, f, d, b, C, Y) {
    e.cancelPendingCommit = null;
    do
      qs();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(o(327));
    if (n !== null) {
      if (n === e.current) throw Error(o(177));
      if (d = n.lanes | n.childLanes, d |= Dc, Pt(
        e,
        i,
        d,
        b,
        C,
        Y
      ), e === Ct && (Ke = Ct = null, et = 0), Fr = n, Ci = e, Ja = i, kf = d, Vf = f, Bg = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, mw(Lt, function() {
        return Wg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = _.T, _.T = null, f = L.p, L.p = 2, b = ht, ht |= 4;
        try {
          aw(e, n, i);
        } finally {
          ht = b, L.p = f, _.T = l;
        }
      }
      Jt = 1, Fg(), Kg(), Pg();
    }
  }
  function Fg() {
    if (Jt === 1) {
      Jt = 0;
      var e = Ci, n = Fr, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = _.T, _.T = null;
        var l = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Mg(n, e);
          var d = td, b = Lm(e.containerInfo), C = d.focusedElem, Y = d.selectionRange;
          if (b !== C && C && C.ownerDocument && jm(
            C.ownerDocument.documentElement,
            C
          )) {
            if (Y !== null && Nc(C)) {
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
                  var P = Om(
                    C,
                    Le
                  ), X = Om(
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
          eu = !!ed, td = ed = null;
        } finally {
          ht = f, L.p = l, _.T = i;
        }
      }
      e.current = n, Jt = 2;
    }
  }
  function Kg() {
    if (Jt === 2) {
      Jt = 0;
      var e = Ci, n = Fr, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = _.T, _.T = null;
        var l = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          _g(e, n.alternate, n);
        } finally {
          ht = f, L.p = l, _.T = i;
        }
      }
      Jt = 3;
    }
  }
  function Pg() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Qe();
      var e = Ci, n = Fr, i = Ja, l = Bg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, Fr = Ci = null, Jg(e, e.pendingLanes));
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
      (Ja & 3) !== 0 && qs(), Ra(e), f = e.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? e === Yf ? ao++ : (ao = 0, Yf = e) : ao = 0, io(0);
    }
  }
  function Jg(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Ul(n)));
  }
  function qs() {
    return Fg(), Kg(), Pg(), Wg();
  }
  function Wg() {
    if (Jt !== 5) return !1;
    var e = Ci, n = kf;
    kf = 0;
    var i = J(Ja), l = _.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, _.T = null, i = Vf, Vf = null;
      var d = Ci, b = Ja;
      if (Jt = 0, Fr = Ci = null, Ja = 0, (ht & 6) !== 0) throw Error(o(331));
      var C = ht;
      if (ht |= 4, jg(d.current), Ag(
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
      L.p = f, _.T = l, Jg(e, n);
    }
  }
  function e0(e, n, i) {
    n = In(i, n), n = bf(e.stateNode, n, 2), e = xi(e, n, 2), e !== null && (pt(e, 2), Ra(e));
  }
  function St(e, n, i) {
    if (e.tag === 3)
      e0(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          e0(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ri === null || !Ri.has(l))) {
            e = In(i, e), i = tg(2), l = xi(n, i, 2), l !== null && (ng(
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
  function Xf(e, n, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new lw();
      var f = /* @__PURE__ */ new Set();
      l.set(n, f);
    } else
      f = l.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), l.set(n, f));
    f.has(i) || (Hf = !0, f.add(i), e = fw.bind(null, e, n, i), n.then(e, e));
  }
  function fw(e, n, i) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ct === e && (et & i) === i && (Ut === 4 || Ut === 3 && (et & 62914560) === et && 300 > Fe() - Hs ? (ht & 2) === 0 && Kr(e, 0) : Bf |= i, Qr === et && (Qr = 0)), Ra(e);
  }
  function t0(e, n) {
    n === 0 && (n = Vt()), e = Ki(e, n), e !== null && (pt(e, n), Ra(e));
  }
  function dw(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), t0(e, i);
  }
  function hw(e, n) {
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
    l !== null && l.delete(n), t0(e, i);
  }
  function mw(e, n) {
    return $e(e, n);
  }
  var $s = null, Jr = null, Gf = !1, Xs = !1, If = !1, Mi = 0;
  function Ra(e) {
    e !== Jr && e.next === null && (Jr === null ? $s = Jr = e : Jr = Jr.next = e), Xs = !0, Gf || (Gf = !0, gw());
  }
  function io(e, n) {
    if (!If && Xs) {
      If = !0;
      do
        for (var i = !1, l = $s; l !== null; ) {
          if (e !== 0) {
            var f = l.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var b = l.suspendedLanes, C = l.pingedLanes;
              d = (1 << 31 - kt(42 | e) + 1) - 1, d &= f & ~(b & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, r0(l, d));
          } else
            d = et, d = He(
              l,
              l === Ct ? d : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (d & 3) === 0 || vt(l, d) || (i = !0, r0(l, d));
          l = l.next;
        }
      while (i);
      If = !1;
    }
  }
  function pw() {
    n0();
  }
  function n0() {
    Xs = Gf = !1;
    var e = 0;
    Mi !== 0 && Rw() && (e = Mi);
    for (var n = Fe(), i = null, l = $s; l !== null; ) {
      var f = l.next, d = a0(l, n);
      d === 0 ? (l.next = null, i === null ? $s = f : i.next = f, f === null && (Jr = i)) : (i = l, (e !== 0 || (d & 3) !== 0) && (Xs = !0)), l = f;
    }
    Jt !== 0 && Jt !== 5 || io(e), Mi !== 0 && (Mi = 0);
  }
  function a0(e, n) {
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
      return l = i0.bind(null, e), i = $e(i, l), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return l !== null && l !== null && wt(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function i0(e, n) {
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
    ), l === 0 ? null : (kg(e, l, n), a0(e, Fe()), e.callbackNode != null && e.callbackNode === i ? i0.bind(null, e) : null);
  }
  function r0(e, n) {
    if (qs()) return null;
    kg(e, n, !0);
  }
  function gw() {
    Tw(function() {
      (ht & 6) !== 0 ? $e(
        yt,
        pw
      ) : n0();
    });
  }
  function Zf() {
    if (Mi === 0) {
      var e = Br;
      e === 0 && (e = ra, ra <<= 1, (ra & 261888) === 0 && (ra = 256)), Mi = e;
    }
    return Mi;
  }
  function l0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Jo("" + e);
  }
  function o0(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function yw(e, n, i, l, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var d = l0(
        (f[Se] || null).action
      ), b = l.submitter;
      b && (n = (n = b[Se] || null) ? l0(n.formAction) : b.getAttribute("formAction"), n !== null && (d = n, b = null));
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
                  var Y = b ? o0(f, b) : new FormData(f);
                  hf(
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
                typeof d == "function" && (C.preventDefault(), Y = b ? o0(f, b) : new FormData(f), hf(
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
  for (var Qf = 0; Qf < Mc.length; Qf++) {
    var Ff = Mc[Qf], vw = Ff.toLowerCase(), bw = Ff[0].toUpperCase() + Ff.slice(1);
    ua(
      vw,
      "on" + bw
    );
  }
  ua(Um, "onAnimationEnd"), ua(km, "onAnimationIteration"), ua(Vm, "onAnimationStart"), ua("dblclick", "onDoubleClick"), ua("focusin", "onFocus"), ua("focusout", "onBlur"), ua(LS, "onTransitionRun"), ua(HS, "onTransitionStart"), ua(BS, "onTransitionCancel"), ua(Ym, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
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
  ), xw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ro)
  );
  function s0(e, n) {
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
    i.has(l) || (u0(n, e, 2, !1), i.add(l));
  }
  function Kf(e, n, i) {
    var l = 0;
    n && (l |= 4), u0(
      i,
      e,
      l,
      n
    );
  }
  var Gs = "_reactListening" + Math.random().toString(36).slice(2);
  function Pf(e) {
    if (!e[Gs]) {
      e[Gs] = !0, wa.forEach(function(i) {
        i !== "selectionchange" && (xw.has(i) || Kf(i, !1, e), Kf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Gs] || (n[Gs] = !0, Kf("selectionchange", !1, n));
    }
  }
  function u0(e, n, i, l) {
    switch (U0(n)) {
      case 2:
        var f = Qw;
        break;
      case 8:
        f = Fw;
        break;
      default:
        f = dd;
    }
    i = f.bind(
      null,
      n,
      i,
      e
    ), f = void 0, !gc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), l ? f !== void 0 ? e.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : e.addEventListener(n, i, !0) : f !== void 0 ? e.addEventListener(n, i, {
      passive: f
    }) : e.addEventListener(n, i, !1);
  }
  function Jf(e, n, i, l, f) {
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
    mm(function() {
      var ie = d, ue = mc(i), fe = [];
      e: {
        var re = qm.get(e);
        if (re !== void 0) {
          var oe = ns, _e = e;
          switch (e) {
            case "keypress":
              if (es(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = hS;
              break;
            case "focusin":
              _e = "focus", oe = xc;
              break;
            case "focusout":
              _e = "blur", oe = xc;
              break;
            case "beforeblur":
            case "afterblur":
              oe = xc;
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
              oe = ym;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = tS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = gS;
              break;
            case Um:
            case km:
            case Vm:
              oe = iS;
              break;
            case Ym:
              oe = vS;
              break;
            case "scroll":
            case "scrollend":
              oe = Wx;
              break;
            case "wheel":
              oe = xS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = lS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = bm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = wS;
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
          if (re = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", re && i !== hc && (_e = i.relatedTarget || i.fromElement) && (Rt(_e) || _e[be]))
            break e;
          if ((oe || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ie, _e = _e ? Rt(_e) : null, _e !== null && (Nt = u(_e), Le = _e.tag, _e !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (oe = null, _e = ie), oe !== _e)) {
            if (Le = ym, ce = "onMouseLeave", P = "onMouseEnter", X = "mouse", (e === "pointerout" || e === "pointerover") && (Le = bm, ce = "onPointerLeave", P = "onPointerEnter", X = "pointer"), Nt = oe == null ? re : We(oe), ae = _e == null ? re : We(_e), re = new Le(
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
                for (Le = Sw, P = oe, X = _e, ae = 0, ce = P; ce; ce = Le(ce))
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
            oe !== null && c0(
              fe,
              re,
              oe,
              Le,
              !1
            ), _e !== null && Nt !== null && c0(
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
            var ut = Cm;
          else if (Nm(re))
            if (Tm)
              ut = zS;
            else {
              ut = DS;
              var Ne = MS;
            }
          else
            oe = re.nodeName, !oe || oe.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? ie && dc(ie.elementType) && (ut = Cm) : ut = AS;
          if (ut && (ut = ut(e, ie))) {
            Rm(
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
            (Nm(Ne) || Ne.contentEditable === "true") && (Mr = Ne, Rc = ie, Ll = null);
            break;
          case "focusout":
            Ll = Rc = Mr = null;
            break;
          case "mousedown":
            Cc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Cc = !1, Hm(fe, i, ue);
            break;
          case "selectionchange":
            if (jS) break;
          case "keydown":
          case "keyup":
            Hm(fe, i, ue);
        }
        var Xe;
        if (wc)
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
          Tr ? Em(e, i) && (tt = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (xm && i.locale !== "ko" && (Tr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Tr && (Xe = pm()) : (hi = ue, yc = "value" in hi ? hi.value : hi.textContent, Tr = !0)), Ne = Is(ie, tt), 0 < Ne.length && (tt = new vm(
          tt,
          e,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Xe ? tt.data = Xe : (Xe = _m(i), Xe !== null && (tt.data = Xe)))), (Xe = _S ? NS(e, i) : RS(e, i)) && (tt = Is(ie, "onBeforeInput"), 0 < tt.length && (Ne = new vm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Xe)), yw(
          fe,
          e,
          ie,
          i,
          ue
        );
      }
      s0(fe, n);
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
  function Sw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function c0(e, n, i, l, f) {
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
  var ww = /\r\n?/g, Ew = /\u0000|\uFFFD/g;
  function f0(e) {
    return (typeof e == "string" ? e : "" + e).replace(ww, `
`).replace(Ew, "");
  }
  function d0(e, n) {
    return n = f0(n), f0(e) === n;
  }
  function _t(e, n, i, l, f, d) {
    switch (i) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || Nr(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && Nr(e, "" + l);
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
        dm(e, l, d);
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Px.get(i) || i, oa(e, i, l));
    }
  }
  function Wf(e, n, i, l, f, d) {
    switch (i) {
      case "style":
        dm(e, l, d);
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
        typeof l == "string" ? Nr(e, l) : (typeof l == "number" || typeof l == "bigint") && Nr(e, "" + l);
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
        _r(
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
        cm(e, l, f, d);
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
        if (dc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (l = i[ue], l !== void 0 && Wf(
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
  function _w(e, n, i, l) {
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
        if (dc(n)) {
          for (var Nt in i)
            re = i[Nt], i.hasOwnProperty(Nt) && re !== void 0 && !l.hasOwnProperty(Nt) && Wf(
              e,
              n,
              Nt,
              void 0,
              l,
              re
            );
          for (ue in l)
            re = l[ue], oe = i[ue], !l.hasOwnProperty(ue) || re === oe || re === void 0 && oe === void 0 || Wf(
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
  function h0(e) {
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
  function Nw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var f = i[l], d = f.transferSize, b = f.initiatorType, C = f.duration;
        if (d && C && h0(b)) {
          for (b = 0, C = f.responseEnd, l += 1; l < i.length; l++) {
            var Y = i[l], ie = Y.startTime;
            if (ie > C) break;
            var ue = Y.transferSize, fe = Y.initiatorType;
            ue && h0(fe) && (Y = Y.responseEnd, b += ue * (Y < C ? 1 : (C - ie) / (Y - ie)));
          }
          if (--l, n += 8 * (d + b) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ed = null, td = null;
  function Zs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function m0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function p0(e, n) {
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
  function nd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var ad = null;
  function Rw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ad ? !1 : (ad = e, !0) : (ad = null, !1);
  }
  var g0 = typeof setTimeout == "function" ? setTimeout : void 0, Cw = typeof clearTimeout == "function" ? clearTimeout : void 0, y0 = typeof Promise == "function" ? Promise : void 0, Tw = typeof queueMicrotask == "function" ? queueMicrotask : typeof y0 < "u" ? function(e) {
    return y0.resolve(null).then(e).catch(Mw);
  } : g0;
  function Mw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Di(e) {
    return e === "head";
  }
  function v0(e, n) {
    var i = n, l = 0;
    do {
      var f = i.nextSibling;
      if (e.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(f), nl(n);
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
    nl(n);
  }
  function b0(e, n) {
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
  function id(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          id(i), rt(i);
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
  function Dw(e, n, i, l) {
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
  function Aw(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = Pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function x0(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function rd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ld(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function zw(e, n) {
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
  var od = null;
  function S0(e) {
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
  function w0(e) {
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
  function E0(e, n, i) {
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
  var Jn = /* @__PURE__ */ new Map(), _0 = /* @__PURE__ */ new Set();
  function Qs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Wa = L.d;
  L.d = {
    f: Ow,
    r: jw,
    D: Lw,
    C: Hw,
    L: Bw,
    m: Uw,
    X: Vw,
    S: kw,
    M: Yw
  };
  function Ow() {
    var e = Wa.f(), n = ks();
    return e || n;
  }
  function jw(e) {
    var n = st(e);
    n !== null && n.tag === 5 && n.type === "form" ? Yp(n) : Wa.r(e);
  }
  var Wr = typeof document > "u" ? null : document;
  function N0(e, n, i) {
    var l = Wr;
    if (l && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), _0.has(f) || (_0.add(f), e = { rel: e, crossOrigin: i, href: n }, l.querySelector(f) === null && (n = l.createElement("link"), sn(n, "link", e), at(n), l.head.appendChild(n)));
    }
  }
  function Lw(e) {
    Wa.D(e), N0("dns-prefetch", e, null);
  }
  function Hw(e, n) {
    Wa.C(e, n), N0("preconnect", e, n);
  }
  function Bw(e, n, i) {
    Wa.L(e, n, i);
    var l = Wr;
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
          d = el(e);
          break;
        case "script":
          d = tl(e);
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
  function Uw(e, n) {
    Wa.m(e, n);
    var i = Wr;
    if (i && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + an(l) + '"][href="' + an(e) + '"]', d = f;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = tl(e);
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
  function kw(e, n, i) {
    Wa.S(e, n, i);
    var l = Wr;
    if (l && e) {
      var f = jt(l).hoistableStyles, d = el(e);
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
          ), (i = Jn.get(d)) && sd(e, i);
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
  function Vw(e, n) {
    Wa.X(e, n);
    var i = Wr;
    if (i && e) {
      var l = jt(i).hoistableScripts, f = tl(e), d = l.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = m({ src: e, async: !0 }, n), (n = Jn.get(f)) && ud(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(f, d));
    }
  }
  function Yw(e, n) {
    Wa.M(e, n);
    var i = Wr;
    if (i && e) {
      var l = jt(i).hoistableScripts, f = tl(e), d = l.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = m({ src: e, async: !0, type: "module" }, n), (n = Jn.get(f)) && ud(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(f, d));
    }
  }
  function R0(e, n, i, l) {
    var f = (f = he.current) ? Qs(f) : null;
    if (!f) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = el(i.href), i = jt(
          f
        ).hoistableStyles, l = i.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = el(i.href);
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
          }, Jn.set(e, i), d || qw(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = tl(i), i = jt(
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
  function el(e) {
    return 'href="' + an(e) + '"';
  }
  function so(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function C0(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function qw(e, n, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), sn(n, "link", i), at(n), e.head.appendChild(n));
  }
  function tl(e) {
    return '[src="' + an(e) + '"]';
  }
  function uo(e) {
    return "script[async]" + e;
  }
  function T0(e, n, i) {
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
          f = el(i.href);
          var d = e.querySelector(
            so(f)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, at(d), d;
          l = C0(i), (f = Jn.get(f)) && sd(l, f), d = (e.ownerDocument || e).createElement("link"), at(d);
          var b = d;
          return b._p = new Promise(function(C, Y) {
            b.onload = C, b.onerror = Y;
          }), sn(d, "link", l), n.state.loading |= 4, Fs(d, i.precedence, e), n.instance = d;
        case "script":
          return d = tl(i.src), (f = e.querySelector(
            uo(d)
          )) ? (n.instance = f, at(f), f) : (l = i, (f = Jn.get(d)) && (l = m({}, i), ud(l, f)), e = e.ownerDocument || e, f = e.createElement("script"), at(f), sn(f, "link", l), e.head.appendChild(f), n.instance = f);
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
  function sd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function ud(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ks = null;
  function M0(e, n, i) {
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
  function D0(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function $w(e, n, i) {
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
  function A0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Xw(e, n, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = el(l.href), d = n.querySelector(
          so(f)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ps.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, at(d);
          return;
        }
        d = n.ownerDocument || n, l = C0(l), (f = Jn.get(f)) && sd(l, f), d = d.createElement("link"), at(d);
        var b = d;
        b._p = new Promise(function(C, Y) {
          b.onload = C, b.onerror = Y;
        }), sn(d, "link", l), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Ps.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var cd = 0;
  function Gw(e, n) {
    return e.stylesheets && e.count === 0 && Ws(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && cd === 0 && (cd = 62500 * Nw());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > cd ? 50 : 800) + n
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Js = /* @__PURE__ */ new Map(), n.forEach(Iw, e), Js = null, Ps.call(e));
  }
  function Iw(e, n) {
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
  function Zw(e, n, i, l, f, d, b, C, Y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = l, this.onUncaughtError = f, this.onCaughtError = d, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = Y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function z0(e, n, i, l, f, d, b, C, Y, ie, ue, fe) {
    return e = new Zw(
      e,
      n,
      i,
      b,
      Y,
      ie,
      ue,
      fe,
      C
    ), n = 1, d === !0 && (n |= 24), d = On(3, null, null, n), e.current = d, d.stateNode = e, n = qc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: n
    }, Ic(d), e;
  }
  function O0(e) {
    return e ? (e = zr, e) : zr;
  }
  function j0(e, n, i, l, f, d) {
    f = O0(f), l.context === null ? l.context = f : l.pendingContext = f, l = bi(n), l.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (l.callback = d), i = xi(e, l, n), i !== null && (Rn(i, e, n), ql(i, e, n));
  }
  function L0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function fd(e, n) {
    L0(e, n), (e = e.alternate) && L0(e, n);
  }
  function H0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ki(e, 67108864);
      n !== null && Rn(n, e, 67108864), fd(e, 67108864);
    }
  }
  function B0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Un();
      n = Q(n);
      var i = Ki(e, n);
      i !== null && Rn(i, e, n), fd(e, n);
    }
  }
  var eu = !0;
  function Qw(e, n, i, l) {
    var f = _.T;
    _.T = null;
    var d = L.p;
    try {
      L.p = 2, dd(e, n, i, l);
    } finally {
      L.p = d, _.T = f;
    }
  }
  function Fw(e, n, i, l) {
    var f = _.T;
    _.T = null;
    var d = L.p;
    try {
      L.p = 8, dd(e, n, i, l);
    } finally {
      L.p = d, _.T = f;
    }
  }
  function dd(e, n, i, l) {
    if (eu) {
      var f = hd(l);
      if (f === null)
        Jf(
          e,
          n,
          l,
          tu,
          i
        ), k0(e, l);
      else if (Pw(
        f,
        e,
        n,
        i,
        l
      ))
        l.stopPropagation();
      else if (k0(e, l), n & 4 && -1 < Kw.indexOf(e)) {
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
                C = Ki(d, 2), C !== null && Rn(C, d, 2), ks(), fd(d, 2);
            }
          if (d = hd(l), d === null && Jf(
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
        Jf(
          e,
          n,
          l,
          null,
          i
        );
    }
  }
  function hd(e) {
    return e = mc(e), md(e);
  }
  var tu = null;
  function md(e) {
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
  function U0(e) {
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
  var pd = !1, Ai = null, zi = null, Oi = null, fo = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map(), ji = [], Kw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function k0(e, n) {
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
    }, n !== null && (n = st(n), n !== null && H0(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), e);
  }
  function Pw(e, n, i, l, f) {
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
  function V0(e) {
    var n = Rt(e.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              B0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              B0(i);
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
      var i = hd(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        hc = l, i.target.dispatchEvent(l), hc = null;
      } else
        return n = st(i), n !== null && H0(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Y0(e, n, i) {
    nu(e) && i.delete(n);
  }
  function Jw() {
    pd = !1, Ai !== null && nu(Ai) && (Ai = null), zi !== null && nu(zi) && (zi = null), Oi !== null && nu(Oi) && (Oi = null), fo.forEach(Y0), ho.forEach(Y0);
  }
  function au(e, n) {
    e.blockedOn === n && (e.blockedOn = null, pd || (pd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      Jw
    )));
  }
  var iu = null;
  function q0(e) {
    iu !== e && (iu = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        iu === e && (iu = null);
        for (var n = 0; n < e.length; n += 3) {
          var i = e[n], l = e[n + 1], f = e[n + 2];
          if (typeof l != "function") {
            if (md(l || i) === null)
              continue;
            break;
          }
          var d = st(i);
          d !== null && (e.splice(n, 3), n -= 3, hf(
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
  function nl(e) {
    function n(Y) {
      return au(Y, e);
    }
    Ai !== null && au(Ai, e), zi !== null && au(zi, e), Oi !== null && au(Oi, e), fo.forEach(n), ho.forEach(n);
    for (var i = 0; i < ji.length; i++) {
      var l = ji[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ji.length && (i = ji[0], i.blockedOn === null); )
      V0(i), i.blockedOn === null && ji.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var f = i[l], d = i[l + 1], b = f[Se] || null;
        if (typeof d == "function")
          b || q0(i);
        else if (b) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (f = d, b = d[Se] || null)
              C = b.formAction;
            else if (md(f) !== null) continue;
          } else C = b.action;
          typeof C == "function" ? i[l + 1] = C : (i.splice(l, 3), l -= 3), q0(i);
        }
      }
  }
  function $0() {
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
  function gd(e) {
    this._internalRoot = e;
  }
  ru.prototype.render = gd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(o(409));
    var i = n.current, l = Un();
    j0(i, l, e, n, null, null);
  }, ru.prototype.unmount = gd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      j0(e.current, 2, null, e, null, null), ks(), n[be] = null;
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
      ji.splice(i, 0, e), i === 0 && V0(e);
    }
  };
  var X0 = a.version;
  if (X0 !== "19.2.7")
    throw Error(
      o(
        527,
        X0,
        "19.2.7"
      )
    );
  L.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = p(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Ww = {
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
          Ww
        ), Kt = lu;
      } catch {
      }
  }
  return go.createRoot = function(e, n) {
    if (!s(e)) throw Error(o(299));
    var i = !1, l = "", f = Pp, d = Jp, b = Wp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError)), n = z0(
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
      $0
    ), e[be] = n.current, Pf(e), new gd(n);
  }, go.hydrateRoot = function(e, n, i) {
    if (!s(e)) throw Error(o(299));
    var l = !1, f = "", d = Pp, b = Jp, C = Wp, Y = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (b = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (Y = i.formState)), n = z0(
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
      $0
    ), n.context = O0(null), i = n.current, l = Un(), l = Q(l), f = bi(l), f.callback = null, xi(i, f, l), i = l, n.current.lanes = i, pt(n, i), Ra(n), e[be] = n.current, Pf(e), new ru(n);
  }, go.version = "19.2.7", go;
}
var ey;
function cE() {
  if (ey) return bd.exports;
  ey = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), bd.exports = uE(), bd.exports;
}
var fE = cE();
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
var db = (t) => {
  throw TypeError(t);
}, hb = (t, a, r) => a.has(t) || db("Cannot " + r), Wn = (t, a, r) => (hb(t, a, "read from private field"), r ? r.call(t) : a.get(t)), wo = (t, a, r) => a.has(t) ? db("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, r), Ca = (t, a, r, o) => (hb(t, a, "write to private field"), a.set(t, r), r);
function ty(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function dE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: o = !1 } = t, s;
  s = a.map(
    (x, S) => y(
      x,
      typeof x == "string" ? null : x.state,
      S === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = g(
    r ?? s.length - 1
  ), c = "POP", h = null;
  function g(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function p() {
    return s[u];
  }
  function y(x, S = null, T, N) {
    let R = Qd(
      s ? p().pathname : "/",
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
      return p();
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
      let T = ty(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, T), o && h && h({ action: c, location: T, delta: 1 });
    },
    replace(x, S) {
      c = "REPLACE";
      let T = ty(x) ? x : y(x, S);
      s[u] = T, o && h && h({ action: c, location: T, delta: 0 });
    },
    go(x) {
      c = "POP";
      let S = g(u + x), T = s[S];
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
function hE() {
  return Math.random().toString(36).substring(2, 10);
}
function Qd(t, a, r = null, o, s) {
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
    key: a && a.key || o || hE(),
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
function mE(t, a, r = !1) {
  let o = "http://localhost";
  t && (o = t.location.origin !== "null" ? t.location.origin : t.location.href), Ze(o, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : ja(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = o + s), new URL(s, o);
}
var Eo, ny = class {
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
var pE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function gE(t) {
  return pE.has(
    t
  );
}
var yE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function vE(t) {
  return yE.has(
    t
  );
}
function bE(t) {
  return t.index === !0;
}
function Mo(t, a, r = [], o = {}, s = !1) {
  return t.map((u, c) => {
    let h = [...r, String(c)], g = typeof u.id == "string" ? u.id : h.join("-");
    if (Ze(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ze(
      s || !o[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), bE(u)) {
      let p = {
        ...u,
        id: g
      };
      return o[g] = ay(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: g,
        children: void 0
      };
      return o[g] = ay(
        p,
        a(p)
      ), u.children && (p.children = Mo(
        u.children,
        a,
        h,
        o,
        s
      )), p;
    }
  });
}
function ay(t, a) {
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
function mb(t, a, r = "/") {
  return da(t, a, r, !1);
}
function da(t, a, r, o, s) {
  let u = typeof a == "string" ? va(a) : a, c = aa(u.pathname || "/", r);
  if (c == null)
    return null;
  let h = s ?? Cu(t), g = null, p = zE(c);
  for (let y = 0; g == null && y < h.length; ++y)
    g = DE(
      h[y],
      p,
      o
    );
  return g;
}
function xE(t, a) {
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
  let a = pb(t);
  return SE(a), a;
}
function pb(t, a = [], r = [], o = "", s = !1) {
  let u = (c, h, g = s, p) => {
    let y = {
      relativePath: p === void 0 ? c.path || "" : p,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: h,
      route: c
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(o) && g)
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
    ), pb(
      c.children,
      a,
      v,
      m,
      g
    )), !(c.path == null && !c.index) && a.push({
      path: m,
      score: TE(m, c.index),
      routesMeta: v
    });
  };
  return t.forEach((c, h) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, h);
    else
      for (let g of gb(c.path))
        u(c, h, !0, g);
  }), a;
}
function gb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [r, ...o] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (o.length === 0)
    return s ? [u, ""] : [u];
  let c = gb(o.join("/")), h = [];
  return h.push(
    ...c.map(
      (g) => g === "" ? u : [u, g].join("/")
    )
  ), s && h.push(...c), h.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function SE(t) {
  t.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : ME(
      a.routesMeta.map((o) => o.childrenIndex),
      r.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var wE = /^:[\w-]+$/, EE = 3, _E = 2, NE = 1, RE = 10, CE = -2, iy = (t) => t === "*";
function TE(t, a) {
  let r = t.split("/"), o = r.length;
  return r.some(iy) && (o += CE), a && (o += _E), r.filter((s) => !iy(s)).reduce(
    (s, u) => s + (wE.test(u) ? EE : u === "" ? NE : RE),
    o
  );
}
function ME(t, a) {
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
function DE(t, a, r = !1) {
  let { routesMeta: o } = t, s = {}, u = "/", c = [];
  for (let h = 0; h < o.length; ++h) {
    let g = o[h], p = h === o.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", m = Hu(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      y
    ), v = g.route;
    if (!m && p && r && !o[o.length - 1].route.index && (m = Hu(
      {
        path: g.relativePath,
        caseSensitive: g.caseSensitive,
        end: !1
      },
      y
    )), !m)
      return null;
    Object.assign(s, m.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: na([u, m.pathname]),
      pathnameBase: LE(
        na([u, m.pathnameBase])
      ),
      route: v
    }), m.pathnameBase !== "/" && (u = na([u, m.pathnameBase]));
  }
  return c;
}
function Hu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [r, o] = AE(
    t.path,
    t.caseSensitive,
    t.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), h = s.slice(1);
  return {
    params: o.reduce(
      (p, { paramName: y, isOptional: m }, v) => {
        if (y === "*") {
          let S = h[v] || "";
          c = u.slice(0, u.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const x = h[v];
        return m && !x ? p[y] = void 0 : p[y] = (x || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: t
  };
}
function AE(t, a = !1, r = !0) {
  $t(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let o = [], s = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, h, g, p, y) => {
      if (o.push({ paramName: h, isOptional: g != null }), g) {
        let m = y.charAt(p + c.length);
        return m && m !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (o.push({ paramName: "*" }), s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), o];
}
function zE(t) {
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
function OE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : na([t, a]);
}
var yb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ch = (t) => yb.test(t);
function jE(t, a = "/") {
  let {
    pathname: r,
    search: o = "",
    hash: s = ""
  } = typeof t == "string" ? va(t) : t, u;
  return r ? (r = Mh(r), r.startsWith("/") ? u = ry(r.substring(1), "/") : u = ry(r, a)) : u = a, {
    pathname: u,
    search: HE(o),
    hash: BE(s)
  };
}
function ry(t, a) {
  let r = Bu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Ed(t, a, r, o) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function vb(t) {
  return t.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Th(t) {
  let a = vb(t);
  return a.map(
    (r, o) => o === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Fu(t, a, r, o = !1) {
  let s;
  typeof t == "string" ? s = va(t) : (s = { ...t }, Ze(
    !s.pathname || !s.pathname.includes("?"),
    Ed("?", "pathname", "search", s)
  ), Ze(
    !s.pathname || !s.pathname.includes("#"),
    Ed("#", "pathname", "hash", s)
  ), Ze(
    !s.search || !s.search.includes("#"),
    Ed("#", "search", "hash", s)
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
  let g = jE(s, h), p = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !g.pathname.endsWith("/") && (p || y) && (g.pathname += "/"), g;
}
var Mh = (t) => t.replace(/\/\/+/g, "/"), na = (t) => Mh(t.join("/")), Bu = (t) => t.replace(/\/+$/, ""), LE = (t) => Bu(t).replace(/^\/*/, "/"), HE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, BE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, ly = (t, a = 302) => {
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
var bb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function xb(t, a) {
  let r = t;
  if (typeof r != "string" || !yb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let o = r, s = !1;
  if (bb)
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
function UE(t, a) {
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
    let s = ol(r.lazy, a.lazy, () => {
    });
    s && (o.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], h = r[`lazy.${u}`];
      if (typeof c == "function" && h.length > 0) {
        let g = ol(h, c, () => {
        });
        g && (o.lazy = Object.assign(o.lazy || {}, {
          [u]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && r[s].length > 0) {
      let c = u[qi] ?? u, h = ol(
        r[s],
        c,
        (...g) => oy(g[0])
      );
      h && (s === "loader" && c.hydrate === !0 && (h.hydrate = !0), h[qi] = c, o[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (o.middleware = a.middleware.map((s) => {
    let u = s[qi] ?? s, c = ol(
      r.middleware,
      u,
      (...h) => oy(h[0])
    );
    return c ? (c[qi] = u, c) : s;
  })), o;
}
function kE(t, a) {
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
    let o = t.navigate[qi] ?? t.navigate, s = ol(
      r.navigate,
      o,
      (...u) => {
        let [c, h] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? ja(c) : ".",
          ...sy(t, h ?? {})
        };
      }
    );
    s && (s[qi] = o, t.navigate = s);
  }
  if (r.fetch.length > 0) {
    let o = t.fetch[qi] ?? t.fetch, s = ol(r.fetch, o, (...u) => {
      let [c, , h, g] = u;
      return {
        href: h ?? ".",
        fetcherKey: c,
        ...sy(t, g ?? {})
      };
    });
    s && (s[qi] = o, t.fetch = s);
  }
  return t;
}
function ol(t, a, r) {
  return t.length === 0 ? null : async (...o) => {
    let s = await Sb(
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
async function Sb(t, a, r, o) {
  let s = t[o], u;
  if (s) {
    let c, h = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Sb(t, a, r, o - 1), u = await c, Ze(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function oy(t) {
  let { request: a, context: r, params: o, pattern: s } = t;
  return {
    request: VE(a),
    params: { ...o },
    pattern: s,
    context: YE(r)
  };
}
function sy(t, a) {
  return {
    currentUrl: ja(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function VE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function YE(t) {
  if ($E(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var qE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function $E(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === qE;
}
var wb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], XE = new Set(
  wb
), GE = [
  "GET",
  ...wb
], IE = new Set(GE), Eb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), ZE = /* @__PURE__ */ new Set([307, 308]), _d = {
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
}, QE = {
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
}, FE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), _b = "remix-router-transitions", Nb = Symbol("ResetLoaderData"), dr, il, ki, rl, KE = class {
  constructor(t) {
    wo(this, dr), wo(this, il), wo(this, ki), wo(this, rl), Ca(this, dr, t), Ca(this, il, Cu(t));
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
    return Wn(this, rl) ?? Wn(this, il);
  }
  get hasHMRRoutes() {
    return Wn(this, ki) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    Ca(this, dr, t), Ca(this, il, Cu(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    Ca(this, ki, t), Ca(this, rl, Cu(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Wn(this, ki) && (Ca(this, dr, Wn(this, ki)), Ca(this, il, Wn(this, rl)), Ca(this, ki, void 0), Ca(this, rl, void 0));
  }
};
dr = /* @__PURE__ */ new WeakMap();
il = /* @__PURE__ */ new WeakMap();
ki = /* @__PURE__ */ new WeakMap();
rl = /* @__PURE__ */ new WeakMap();
function PE(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ze(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o = t.hydrationRouteProperties || [], s = t.mapRouteProperties || FE, u = s;
  if (t.instrumentations) {
    let B = t.instrumentations;
    u = (Q) => ({
      ...s(Q),
      ...UE(
        B.map((J) => J.route).filter(Boolean),
        Q
      )
    });
  }
  let c = {}, h = new KE(
    Mo(
      t.routes,
      u,
      void 0,
      c
    )
  ), g = t.basename || "/";
  g.startsWith("/") || (g = `/${g}`);
  let p = t.dataStrategy || n_, y = {
    ...t.future
  }, m = null, v = /* @__PURE__ */ new Set(), x = null, S = null, T = null, N = null, R = t.hydrationData != null, z = da(
    h.activeRoutes,
    t.history.location,
    g,
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
    else if (!z.some((B) => Dh(B.route)))
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
        let pe = Rb(de.route, B, Q);
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
    navigation: _d,
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
      x_(a, O);
      let B = () => S_(a, O);
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
    let Ee = Q.loaderData ? by(
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
        navigation: _d,
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
      le || (le = Ey());
      let rt = le.promise;
      return t.history.go(B), rt;
    }
    let J = Fd(
      D.location,
      D.matches,
      g,
      B,
      Q?.fromRouteId,
      Q?.relative
    ), { path: de, submission: pe, error: Ee } = uy(
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
    let Se = D.location, be = Qd(
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
    ge || (ge = Ey()), Lt(), xe({ revalidation: "loading" });
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
      g,
      !1,
      h.branches
    ), Ee = (J && J.flushSync) === !0;
    if (pe && D.initialized && !L && c_(D.location, Q) && !(J && J.submission && dn(J.submission.formMethod))) {
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
    let be = ll(
      t.history,
      Q,
      K.signal,
      J && J.submission
    ), Me = t.getContext ? await t.getContext() : new ny(), De;
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
      pe = st.matches || pe, De = st.pendingActionResult, Se = Nd(
        Q,
        pe,
        B,
        J.submission
      ), Ee = !1, ve.active = !1, be = ll(
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
      ...xy(De),
      loaderData: Ge,
      errors: rt,
      ...Rt ? { fetchers: Rt } : {}
    }));
  }
  async function Ie(B, Q, J, de, pe, Ee, ve, Se, be = {}) {
    Lt();
    let Me = v_(
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
      return be && be.replace != null ? je = be.replace : je = gy(
        De.response.headers.get("Location"),
        new URL(B.url),
        g,
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
    let rt = ve || Nd(Q, J, de, Se), Rt = Se || be || wy(rt), st = !_ && !De;
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
    let We = h.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = cy(
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
      g,
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
          ...xy(je),
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
    let bn = new Map(D.fetchers), { loaderData: ui, errors: xn } = vy(
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
    let pe = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = Fd(
      D.location,
      D.matches,
      g,
      J,
      Q,
      de?.relative
    ), Se = da(
      Ee,
      ve,
      g,
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
    let { path: Me, submission: De, error: ke } = uy(
      !0,
      ve,
      de
    );
    if (ke) {
      ot(B, Q, ke, { flushSync: pe });
      return;
    }
    let je = t.getContext ? await t.getContext() : new ny(), Ge = (de && de.preventScrollReset) === !0;
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
    mt(B, b_(be, De), {
      flushSync: ve
    });
    let ke = new AbortController(), je = ll(
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
    let jt = D.navigation.location || D.location, at = ll(
      t.history,
      jt,
      ke.signal
    ), wa = h.activeRoutes, Dn = D.navigation.state !== "idle" ? da(
      wa,
      D.navigation.location,
      g,
      !1,
      h.branches
    ) : D.matches;
    Ze(Dn, "Didn't find any matches after fetcher action");
    let cn = ++ne;
    k.set(B, cn);
    let { dsMatches: nn, revalidatingFetchers: bn } = cy(
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
      g,
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
    let { loaderData: fi, errors: Ha } = vy(
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
      loaderData: by(
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
    let De = new AbortController(), ke = ll(
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
    Ze(Se, "Expected a Location header on the redirect Response"), Se = gy(
      Se,
      new URL(B.url),
      g,
      t.history
    );
    let be = Qd(D.location, Se, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Q.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (Ch(Se)) {
        const Rt = mE(a, Se, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Rt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(Rt.pathname, g) == null;
      }
      if (rt) {
        ve ? a.location.replace(Se) : a.location.assign(Se);
        return;
      }
    }
    K = null;
    let Me = ve === !0 || Q.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: ke, formEncType: je } = D.navigation;
    !de && !pe && De && ke && je && (de = wy(D.navigation));
    let Ge = de || pe;
    if (ZE.has(Q.response.status) && Ge && dn(Ge.formMethod))
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
      let rt = Nd(
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
      Ee = await i_(
        p,
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
      if (m_(be)) {
        let Me = be.result;
        ve[Se] = {
          type: "redirect",
          response: s_(
            Me,
            B,
            Se,
            J,
            g
          )
        };
      } else
        ve[Se] = await o_(be);
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
    return se.set(B, (se.get(B) || 0) + 1), he.has(B) && he.delete(B), D.fetchers.get(B) || QE;
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
    if (S = B, N = Q, T = J || null, !R && D.navigation === _d) {
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
      Q.map((de) => xE(de, D.loaderData))
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
            g,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: da(
          Q,
          J,
          g,
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
            J.aborted || fy(
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
        g,
        !1,
        ve
      ), be = null;
      if (Se) {
        if (Object.keys(Se[0].params).length === 0)
          return { type: "success", matches: Se };
        if (be = da(
          h.activeRoutes,
          Q,
          g,
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
        g,
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
    fy(
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
      return g;
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
  }, t.instrumentations && (V = kE(
    V,
    t.instrumentations.map((B) => B.router).filter(Boolean)
  )), V;
}
function JE(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Fd(t, a, r, o, s, u) {
  let c, h;
  if (s) {
    c = [];
    for (let p of a)
      if (c.push(p), p.route.id === s) {
        h = p;
        break;
      }
  } else
    c = a, h = a[a.length - 1];
  let g = Fu(
    o || ".",
    Th(c),
    aa(t.pathname, r) || t.pathname,
    u === "path"
  );
  if (o == null && (g.search = t.search, g.hash = t.hash), (o == null || o === "" || o === ".") && h) {
    let p = zh(g.search);
    if (h.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && p) {
      let y = new URLSearchParams(g.search), m = y.getAll("index");
      y.delete("index"), m.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      g.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (g.pathname = OE({ basename: r, pathname: g.pathname })), ja(g);
}
function uy(t, a, r) {
  if (!r || !JE(r))
    return { path: a };
  if (r.formMethod && !y_(r.formMethod))
    return {
      path: a,
      error: ea(405, { method: r.formMethod })
    };
  let o = () => ({
    path: a,
    error: ea(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = Ob(a);
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
  let h, g;
  if (r.formData)
    h = Pd(r.formData), g = r.formData;
  else if (r.body instanceof FormData)
    h = Pd(r.body), g = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, g = yy(h);
  else if (r.body == null)
    h = new URLSearchParams(), g = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), g = yy(h);
    } catch {
      return o();
    }
  let p = {
    formMethod: u,
    formAction: c,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (dn(p.formMethod))
    return { path: a, submission: p };
  let y = va(a);
  return t && y.search && zh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: ja(y), submission: p };
}
function cy(t, a, r, o, s, u, c, h, g, p, y, m, v, x, S, T, N, R, z, E, j, U) {
  let H = j ? kn(j[1]) ? j[1].error : j[1].data : void 0, V = s.createURL(u.location), D = s.createURL(g), q;
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
    else if (!Dh(Z))
      G = !1;
    else if (y) {
      let { shouldLoad: F } = Rb(
        Z,
        u.loaderData,
        u.errors
      );
      G = F;
    } else WE(u.loaderData, u.matches[L], _) && (G = !0);
    if (G !== null)
      return Kd(
        r,
        o,
        t,
        g,
        W,
        _,
        p,
        a,
        G
      );
    let ne = !1;
    typeof U == "boolean" ? ne = U : I ? ne = !1 : (m || V.pathname + V.search === D.pathname + D.search || V.search !== D.search || e_(u.matches[L], _)) && (ne = !0);
    let A = {
      ...K,
      defaultShouldRevalidate: ne
    }, k = Ro(_, A);
    return Kd(
      r,
      o,
      t,
      g,
      W,
      _,
      p,
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
    let A = Tu(ne, _.path), k = new AbortController(), F = ll(
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
        p,
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
        p,
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
        p,
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
function Dh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Rb(t, a, r) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Dh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let o = a != null && t.id in a, s = r != null && r[t.id] !== void 0;
  if (!o && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let u = !o && !s;
  return { shouldLoad: u, renderFallback: u };
}
function WE(t, a, r) {
  let o = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !t.hasOwnProperty(r.route.id);
  return o || s;
}
function e_(t, a) {
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
function fy(t, a, r, o, s, u) {
  let c;
  if (t) {
    let p = o[t];
    Ze(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), c = p.children;
  } else
    c = r.activeRoutes;
  let h = [], g = [];
  if (a.forEach((p) => {
    let y = c.find(
      (m) => Cb(p, m)
    );
    y ? g.push({ existingRoute: y, newRoute: p }) : h.push(p);
  }), h.length > 0) {
    let p = Mo(
      h,
      s,
      [t || "_", "patch", String(c?.length || "0")],
      o
    );
    c.push(...p);
  }
  if (u && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: y, newRoute: m } = g[p], v = y, [x] = Mo(
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
function Cb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (r, o) => a.children?.some((s) => Cb(r, s))
  ) ?? !1 : !1;
}
var dy = /* @__PURE__ */ new WeakMap(), Tb = ({
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
  let c = dy.get(s);
  c || (c = {}, dy.set(s, c));
  let h = c[t];
  if (h)
    return h;
  let g = (async () => {
    let p = gE(t), m = s[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      $t(
        !p,
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
  return c[t] = g, g;
}, hy = /* @__PURE__ */ new WeakMap();
function t_(t, a, r, o, s) {
  let u = r[t.id];
  if (Ze(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = hy.get(u);
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
        let N = vE(S), z = u[S] !== void 0 && // This property isn't static since it should always be updated based
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
    return hy.set(u, m), m.catch(() => {
    }), {
      lazyRoutePromise: m,
      lazyHandlerPromise: m
    };
  }
  let c = Object.keys(t.lazy), h = [], g;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let m = Tb({
      key: y,
      route: t,
      manifest: r,
      mapRouteProperties: o
    });
    m && (h.push(m), y === a && (g = m));
  }
  let p = h.length > 0 ? Promise.all(h).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), g?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: g
  };
}
async function my(t) {
  let a = t.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function n_(t) {
  return t.matches.some((a) => a.route.middleware) ? Mb(t, () => my(t)) : my(t);
}
function Mb(t, a) {
  return a_(
    t,
    a,
    (o) => {
      if (g_(o))
        throw o;
      return o;
    },
    d_,
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
          c.findIndex((p) => p.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          c.findIndex((p) => p.shouldCallHandler()),
          0
        )
      ), g = Vi(
        c,
        c[h].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: o }
      });
    }
  }
}
async function a_(t, a, r, o, s) {
  let { matches: u, ...c } = t, h = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((y) => [p.route.id, y]) : []
  );
  return await Db(
    c,
    h,
    a,
    r,
    o,
    s
  );
}
async function Db(t, a, r, o, s, u, c = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let g = a[c];
  if (!g)
    return await r();
  let [p, y] = g, m, v = async () => {
    if (m)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return m = { value: await Db(
        t,
        a,
        r,
        o,
        s,
        u,
        c + 1
      ) }, m.value;
    } catch (x) {
      return m = { value: await u(x, p, m) }, m.value;
    }
  };
  try {
    let x = await y(t, v), S = x != null ? o(x) : void 0;
    return s(S) ? S : m ? S ?? m.value : (m = { value: await v() }, m.value);
  } catch (x) {
    return await u(x, p, m);
  }
}
function Ab(t, a, r, o, s) {
  let u = Tb({
    key: "middleware",
    route: o.route,
    manifest: a,
    mapRouteProperties: t
  }), c = t_(
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
function Kd(t, a, r, o, s, u, c, h, g, p = null, y) {
  let m = !1, v = Ab(
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
    shouldRevalidateArgs: p,
    shouldCallHandler(x) {
      return m = !0, p ? typeof y == "boolean" ? Ro(u, {
        ...p,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? Ro(u, {
        ...p,
        defaultShouldRevalidate: x
      }) : Ro(u, p) : g;
    },
    resolve(x) {
      let { lazy: S, loader: T, middleware: N } = u.route, R = m || g || x && !dn(r.method) && (S || T), z = N && N.length > 0 && !T && !S;
      return R && (dn(r.method) || !z) ? r_({
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
function fl(t, a, r, o, s, u, c, h, g = null) {
  return s.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: Ab(
      t,
      a,
      r,
      p,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Kd(
    t,
    a,
    r,
    o,
    qo(s),
    p,
    c,
    h,
    !0,
    g
  ));
}
async function i_(t, a, r, o, s, u, c) {
  o.some((y) => y._lazyPromises?.middleware) && await Promise.all(o.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: zb(a, r),
    pattern: qo(o),
    params: o[0].params,
    context: u,
    matches: o
  }, p = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let m = h;
      return Mb(m, () => y({
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
  return p;
}
async function r_({
  request: t,
  path: a,
  pattern: r,
  match: o,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: h
}) {
  let g, p, y = dn(t.method), m = y ? "action" : "loader", v = (x) => {
    let S, T = new Promise((z, E) => S = E);
    p = () => S(), t.signal.addEventListener("abort", p);
    let N = (z) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${m}" [routeId: ${o.route.id}]`
      )
    ) : x(
      {
        request: t,
        url: zb(t, a),
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
        g = T;
      } else {
        await s;
        let S = y ? o.route.action : o.route.loader;
        if (S)
          [g] = await Promise.all([v(S), u]);
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
      g = await v(x);
    else {
      let S = new URL(t.url), T = S.pathname + S.search;
      throw ea(404, {
        pathname: T
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return g;
}
async function l_(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function o_(t) {
  let { result: a, type: r } = t;
  if (Ah(a)) {
    let o;
    try {
      o = await l_(a);
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
  return r === "error" ? Sy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: f_(a),
    statusCode: Do(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Do(a) ? a.status : void 0
  } : Sy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function s_(t, a, r, o, s) {
  let u = t.headers.get("Location");
  if (Ze(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Ch(u)) {
    let c = o.slice(
      0,
      o.findIndex((h) => h.route.id === r) + 1
    );
    u = Fd(
      new URL(a.url),
      c,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var py = [
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
function gy(t, a, r, o) {
  if (Ch(t)) {
    let s = t, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (py.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = aa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return Mh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = o.createURL(t);
    if (py.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function ll(t, a, r, o) {
  let s = t.createURL(Ob(a)).toString(), u = { signal: r };
  if (o && dn(o.formMethod)) {
    let { formMethod: c, formEncType: h } = o;
    u.method = c.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(o.json)) : h === "text/plain" ? u.body = o.text : h === "application/x-www-form-urlencoded" && o.formData ? u.body = Pd(o.formData) : u.body = o.formData;
  }
  return new Request(s, u);
}
function zb(t, a) {
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
function Pd(t) {
  let a = new URLSearchParams();
  for (let [r, o] of t.entries())
    a.append(r, typeof o == "string" ? o : o.name);
  return a;
}
function yy(t) {
  let a = new FormData();
  for (let [r, o] of t.entries())
    a.append(r, o);
  return a;
}
function u_(t, a, r, o = !1, s = !1) {
  let u = {}, c = null, h, g = !1, p = {}, y = r && kn(r[1]) ? r[1].error : void 0;
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
      o || (u[v] = Nb), g || (g = !0, h = Do(x.error) ? x.error.status : 500), x.headers && (p[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !g && (h = x.statusCode), x.headers && (p[v] = x.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: h || 200,
    loaderHeaders: p
  };
}
function vy(t, a, r, o, s, u, c) {
  let { loaderData: h, errors: g } = u_(
    a,
    r,
    o
  );
  return s.filter((p) => !p.matches || p.matches.some((y) => y.shouldLoad)).forEach((p) => {
    let { key: y, match: m, controller: v } = p;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (Ze(x, "Did not find corresponding fetcher result"), kn(x)) {
      let S = Vi(t.matches, m?.route.id);
      g && g[S.route.id] || (g = {
        ...g,
        [S.route.id]: x.error
      }), c.delete(y);
    } else if (mr(x))
      Ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ma(x.data);
      c.set(y, S);
    }
  }), { loaderData: h, errors: g };
}
function by(t, a, r, o) {
  let s = Object.entries(a).filter(([, u]) => u !== Nb).reduce((u, [c, h]) => (u[c] = h, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && t.hasOwnProperty(c) && u.route.loader && (s[c] = t[c]), o && o.hasOwnProperty(c))
      break;
  }
  return s;
}
function xy(t) {
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
function Ob(t) {
  let a = typeof t == "string" ? va(t) : t;
  return ja({ ...a, hash: "" });
}
function c_(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function f_(t) {
  return new Ku(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function d_(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, r]) => typeof a == "string" && h_(r)
  );
}
function h_(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function m_(t) {
  return Ah(t.result) && Eb.has(t.result.status);
}
function kn(t) {
  return t.type === "error";
}
function mr(t) {
  return (t && t.type) === "redirect";
}
function Sy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Ah(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function p_(t) {
  return Eb.has(t);
}
function g_(t) {
  return Ah(t) && p_(t.status) && t.headers.has("Location");
}
function y_(t) {
  return IE.has(t.toUpperCase());
}
function dn(t) {
  return XE.has(t.toUpperCase());
}
function zh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Tu(t, a) {
  let r = typeof a == "string" ? va(a).search : a.search;
  if (t[t.length - 1].route.index && zh(r || ""))
    return t[t.length - 1];
  let o = vb(t);
  return o[o.length - 1];
}
function wy(t) {
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
function Nd(t, a, r, o) {
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
function v_(t, a, r, o) {
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
function b_(t, a) {
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
function x_(t, a) {
  try {
    let r = t.sessionStorage.getItem(
      _b
    );
    if (r) {
      let o = JSON.parse(r);
      for (let [s, u] of Object.entries(o || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function S_(t, a) {
  if (a.size > 0) {
    let r = {};
    for (let [o, s] of a)
      r[o] = [...s];
    try {
      t.sessionStorage.setItem(
        _b,
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
function Ey() {
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
var Er = M.createContext(null);
Er.displayName = "DataRouter";
var $o = M.createContext(null);
$o.displayName = "DataRouterState";
var jb = M.createContext(!1);
function Lb() {
  return M.useContext(jb);
}
var Oh = M.createContext({
  isTransitioning: !1
});
Oh.displayName = "ViewTransition";
var Hb = M.createContext(
  /* @__PURE__ */ new Map()
);
Hb.displayName = "Fetchers";
var w_ = M.createContext(null);
w_.displayName = "Await";
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
var jh = M.createContext(null);
jh.displayName = "RouteError";
var Bb = "REACT_ROUTER_ERROR", E_ = "REDIRECT", __ = "ROUTE_ERROR_RESPONSE";
function N_(t) {
  if (t.startsWith(`${Bb}:${E_}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function R_(t) {
  if (t.startsWith(
    `${Bb}:${__}:{`
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
function C_(t, { relative: a } = {}) {
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
var Ub = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function kb(t) {
  M.useContext(ia).static || M.useLayoutEffect(t);
}
function T_() {
  let { isDataRoute: t } = M.useContext(ba);
  return t ? X_() : M_();
}
function M_() {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = M.useContext(Er), { basename: a, navigator: r } = M.useContext(ia), { matches: o } = M.useContext(ba), { pathname: s } = li(), u = JSON.stringify(Th(o)), c = M.useRef(!1);
  return kb(() => {
    c.current = !0;
  }), M.useCallback(
    (g, p = {}) => {
      if ($t(c.current, Ub), !c.current) return;
      if (typeof g == "number") {
        r.go(g);
        return;
      }
      let y = Fu(
        g,
        JSON.parse(u),
        s,
        p.relative === "path"
      );
      t == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : na([a, y.pathname])), (p.replace ? r.replace : r.push)(
        y,
        p.state,
        p
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
var D_ = M.createContext(null);
function A_(t) {
  let a = M.useContext(ba).outlet;
  return M.useMemo(
    () => a && /* @__PURE__ */ M.createElement(D_.Provider, { value: t }, a),
    [a, t]
  );
}
function z_() {
  let { matches: t } = M.useContext(ba);
  return t[t.length - 1]?.params ?? {};
}
function Go(t, { relative: a } = {}) {
  let { matches: r } = M.useContext(ba), { pathname: o } = li(), s = JSON.stringify(Th(r));
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
function O_(t, a, r) {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = M.useContext(ia), { matches: s } = M.useContext(ba), u = s[s.length - 1], c = u ? u.params : {}, h = u ? u.pathname : "/", g = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let N = p && p.path || "";
    qb(
      h,
      !p || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = li(), m;
  m = y;
  let v = m.pathname || "/", x = v;
  if (g !== "/") {
    let N = g.replace(/^\//, "").split("/");
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
  ) : mb(t, { pathname: x });
  return $t(
    p || S != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), $t(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), U_(
    S && S.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, c, N.params),
        pathname: na([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? g : na([
          g,
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
function j_() {
  let t = $_(), a = Do(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), r = t instanceof Error ? t.stack : null, o = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: o }, u = { padding: "2px 4px", backgroundColor: o }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), c = /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ M.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ M.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ M.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ M.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ M.createElement("pre", { style: s }, r) : null, c);
}
var L_ = /* @__PURE__ */ M.createElement(j_, null), Vb = class extends M.Component {
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
      const r = R_(t.digest);
      r && (t = r);
    }
    let a = t !== void 0 ? /* @__PURE__ */ M.createElement(ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ M.createElement(
      jh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ M.createElement(H_, { error: t }, a) : a;
  }
};
Vb.contextType = jb;
var Rd = /* @__PURE__ */ new WeakMap();
function H_({
  children: t,
  error: a
}) {
  let { basename: r } = M.useContext(ia);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let o = N_(a.digest);
    if (o) {
      let s = Rd.get(a);
      if (s) throw s;
      let u = xb(o.location, r);
      if (bb && !Rd.get(a))
        if (u.isExternal || o.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: o.replace
            })
          );
          throw Rd.set(a, c), c;
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
function B_({ routeContext: t, match: a, children: r }) {
  let o = M.useContext(Er);
  return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ M.createElement(ba.Provider, { value: t }, r);
}
function U_(t, a = [], r) {
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
  let g = r?.onError, p = o && g ? (y, m) => {
    g(y, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      pattern: qo(o.matches),
      errorInfo: m
    });
  } : void 0;
  return s.reduceRight(
    (y, m, v) => {
      let x, S = !1, T = null, N = null;
      o && (x = u && m.route.id ? u[m.route.id] : void 0, T = m.route.errorElement || L_, c && (h < 0 && v === 0 ? (qb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, N = null) : h === v && (S = !0, N = m.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return x ? E = T : S ? E = N : m.route.Component ? E = /* @__PURE__ */ M.createElement(m.route.Component, null) : m.route.element ? E = m.route.element : E = y, /* @__PURE__ */ M.createElement(
          B_,
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
        Vb,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: T,
          error: x,
          children: z(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: p
        }
      ) : z();
    },
    null
  );
}
function Lh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function k_(t) {
  let a = M.useContext(Er);
  return Ze(a, Lh(t)), a;
}
function Yb(t) {
  let a = M.useContext($o);
  return Ze(a, Lh(t)), a;
}
function V_(t) {
  let a = M.useContext(ba);
  return Ze(a, Lh(t)), a;
}
function Ju(t) {
  let a = V_(t), r = a.matches[a.matches.length - 1];
  return Ze(
    r.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Y_() {
  return Ju(
    "useRouteId"
    /* UseRouteId */
  );
}
function q_() {
  let t = Yb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Ju(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function $_() {
  let t = M.useContext(jh), a = Yb(
    "useRouteError"
    /* UseRouteError */
  ), r = Ju(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[r];
}
function X_() {
  let { router: t } = k_(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Ju(
    "useNavigate"
    /* UseNavigateStable */
  ), r = M.useRef(!1);
  return kb(() => {
    r.current = !0;
  }), M.useCallback(
    async (s, u = {}) => {
      $t(r.current, Ub), r.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var _y = {};
function qb(t, a, r) {
  !a && !_y[t] && (_y[t] = !0, $t(!1, r));
}
var Ny = {};
function Ry(t, a) {
  !t && !Ny[a] && (Ny[a] = !0, console.warn(a));
}
var G_ = "useOptimistic", Cy = rE[G_], I_ = () => {
};
function Z_(t) {
  return Cy ? Cy(t) : [t, I_];
}
function Q_(t) {
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
var F_ = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function K_(t, a) {
  return PE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: dE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: F_,
    mapRouteProperties: Q_,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var P_ = class {
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
function J_({
  router: t,
  flushSync: a,
  onError: r,
  useTransitions: o
}) {
  o = Lb() || o;
  let [u, c] = M.useState(t.state), [h, g] = Z_(u), [p, y] = M.useState(), [m, v] = M.useState({
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
      }), q.forEach((O) => E.current.delete(O)), Ry(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let W = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Ry(
        K == null || W,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !W) {
        a && I ? a(() => c(D)) : o === !1 ? c(D) : M.startTransition(() => {
          o === !0 && g((O) => Ty(O, D)), c(D);
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
      g,
      r
    ]
  );
  M.useLayoutEffect(() => t.subscribe(j), [t, j]), M.useEffect(() => {
    m.isTransitioning && !m.flushSync && S(new P_());
  }, [m]), M.useEffect(() => {
    if (x && p && t.window) {
      let D = p, q = x.promise, le = t.window.document.startViewTransition(async () => {
        o === !1 ? c(D) : M.startTransition(() => {
          o === !0 && g((I) => Ty(I, D)), c(D);
        }), await q;
      });
      le.finished.finally(() => {
        S(void 0), N(void 0), y(void 0), v({ isTransitioning: !1 });
      }), N(le);
    }
  }, [
    p,
    x,
    t.window,
    o,
    g
  ]), M.useEffect(() => {
    x && p && h.location.key === p.location.key && x.resolve();
  }, [x, T, h.location, p]), M.useEffect(() => {
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
  return /* @__PURE__ */ M.createElement(M.Fragment, null, /* @__PURE__ */ M.createElement(Er.Provider, { value: V }, /* @__PURE__ */ M.createElement($o.Provider, { value: h }, /* @__PURE__ */ M.createElement(Hb.Provider, { value: E.current }, /* @__PURE__ */ M.createElement(Oh.Provider, { value: m }, /* @__PURE__ */ M.createElement(
    n2,
    {
      basename: H,
      location: h.location,
      navigationType: h.historyAction,
      navigator: U,
      useTransitions: o
    },
    /* @__PURE__ */ M.createElement(
      W_,
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
var W_ = M.memo(e2);
function e2({
  routes: t,
  manifest: a,
  future: r,
  state: o,
  isStatic: s,
  onError: u
}) {
  return O_(t, void 0, {
    manifest: a,
    state: o,
    isStatic: s,
    onError: u
  });
}
function t2(t) {
  return A_(t.context);
}
function n2({
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
  let h = t.replace(/^\/*/, "/"), g = M.useMemo(
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
    pathname: p = "/",
    search: y = "",
    hash: m = "",
    state: v = null,
    key: x = "default",
    mask: S
  } = r, T = M.useMemo(() => {
    let N = aa(p, h);
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
  }, [h, p, y, m, v, x, o, S]);
  return $t(
    T != null,
    `<Router basename="${h}"> is not able to match the URL "${p}${y}${m}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ M.createElement(ia.Provider, { value: g }, /* @__PURE__ */ M.createElement(Pu.Provider, { children: a, value: T }));
}
var Mu = "get", Du = "application/x-www-form-urlencoded";
function Wu(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function a2(t) {
  return Wu(t) && t.tagName.toLowerCase() === "button";
}
function i2(t) {
  return Wu(t) && t.tagName.toLowerCase() === "form";
}
function r2(t) {
  return Wu(t) && t.tagName.toLowerCase() === "input";
}
function l2(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function o2(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !l2(t);
}
var uu = null;
function s2() {
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
var u2 = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Cd(t) {
  return t != null && !u2.has(t) ? ($t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Du}"`
  ), null) : t;
}
function c2(t, a) {
  let r, o, s, u, c;
  if (i2(t)) {
    let h = t.getAttribute("action");
    o = h ? aa(h, a) : null, r = t.getAttribute("method") || Mu, s = Cd(t.getAttribute("enctype")) || Du, u = new FormData(t);
  } else if (a2(t) || r2(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || h.getAttribute("action");
    if (o = g ? aa(g, a) : null, r = t.getAttribute("formmethod") || h.getAttribute("method") || Mu, s = Cd(t.getAttribute("formenctype")) || Cd(h.getAttribute("enctype")) || Du, u = new FormData(h, t), !s2()) {
      let { name: p, type: y, value: m } = t;
      if (y === "image") {
        let v = p ? `${p}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else p && u.append(p, m);
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
function Hh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function $b(t, a, r, o) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${o}` : s.pathname = `${s.pathname}.${o}` : s.pathname === "/" ? s.pathname = `_root.${o}` : a && aa(s.pathname, a) === "/" ? s.pathname = `${Bu(a)}/_root.${o}` : s.pathname = `${Bu(s.pathname)}.${o}`, s;
}
async function f2(t, a) {
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
function d2(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function h2(t, a, r) {
  let o = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await f2(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return y2(
    o.flat(1).filter(d2).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function My(t, a, r, o, s, u) {
  let c = (g, p) => r[p] ? g.route.id !== r[p].route.id : !0, h = (g, p) => (
    // param change, /users/123 -> /users/456
    r[p].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[p].route.path?.endsWith("*") && r[p].params["*"] !== g.params["*"]
  );
  return u === "assets" ? a.filter(
    (g, p) => c(g, p) || h(g, p)
  ) : u === "data" ? a.filter((g, p) => {
    let y = o.routes[g.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (c(g, p) || h(g, p))
      return !0;
    if (g.route.shouldRevalidate) {
      let m = g.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: g.params,
        defaultShouldRevalidate: !0
      });
      if (typeof m == "boolean")
        return m;
    }
    return !0;
  }) : [];
}
function m2(t, a, { includeHydrateFallback: r } = {}) {
  return p2(
    t.map((o) => {
      let s = a.routes[o.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function p2(t) {
  return [...new Set(t)];
}
function g2(t) {
  let a = {}, r = Object.keys(t).sort();
  for (let o of r)
    a[o] = t[o];
  return a;
}
function y2(t, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((o, s) => {
    let u = JSON.stringify(g2(s));
    return r.has(u) || (r.add(u), o.push({ key: u, link: s })), o;
  }, []);
}
function Bh() {
  let t = M.useContext(Er);
  return Hh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function v2() {
  let t = M.useContext($o);
  return Hh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Uh = M.createContext(void 0);
Uh.displayName = "FrameworkContext";
function kh() {
  let t = M.useContext(Uh);
  return Hh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function b2(t, a) {
  let r = M.useContext(Uh), [o, s] = M.useState(!1), [u, c] = M.useState(!1), { onFocus: h, onBlur: g, onMouseEnter: p, onMouseLeave: y, onTouchStart: m } = a, v = M.useRef(null);
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
      onBlur: bo(g, S),
      onMouseEnter: bo(p, x),
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
function x2({ page: t, ...a }) {
  let r = Lb(), { router: o } = Bh(), s = M.useMemo(
    () => mb(o.routes, t, o.basename),
    [o.routes, t, o.basename]
  );
  return s ? r ? /* @__PURE__ */ M.createElement(w2, { page: t, matches: s, ...a }) : /* @__PURE__ */ M.createElement(E2, { page: t, matches: s, ...a }) : null;
}
function S2(t) {
  let { manifest: a, routeModules: r } = kh(), [o, s] = M.useState([]);
  return M.useEffect(() => {
    let u = !1;
    return h2(t, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, r]), o;
}
function w2({
  page: t,
  matches: a,
  ...r
}) {
  let o = li(), { future: s } = kh(), { basename: u } = Bh(), c = M.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let h = $b(
      t,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, p = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? g = !0 : p.push(y.route.id);
    return g && p.length > 0 && h.searchParams.set("_routes", p.join(",")), [h.pathname + h.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    t,
    o,
    a
  ]);
  return /* @__PURE__ */ M.createElement(M.Fragment, null, c.map((h) => /* @__PURE__ */ M.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function E2({
  page: t,
  matches: a,
  ...r
}) {
  let o = li(), { future: s, manifest: u, routeModules: c } = kh(), { basename: h } = Bh(), { loaderData: g, matches: p } = v2(), y = M.useMemo(
    () => My(
      t,
      a,
      p,
      u,
      o,
      "data"
    ),
    [t, a, p, u, o]
  ), m = M.useMemo(
    () => My(
      t,
      a,
      p,
      u,
      o,
      "assets"
    ),
    [t, a, p, u, o]
  ), v = M.useMemo(() => {
    if (t === o.pathname + o.search + o.hash)
      return [];
    let T = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((j) => j.route.id === z.route.id) && z.route.id in g && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? N = !0 : T.add(z.route.id));
    }), T.size === 0)
      return [];
    let R = $b(
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
    g,
    o,
    u,
    y,
    a,
    t,
    c
  ]), x = M.useMemo(
    () => m2(m, u),
    [m, u]
  ), S = S2(m);
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
function _2(...t) {
  return (a) => {
    t.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var N2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  N2 && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var Xb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Gb = M.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: o = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: h,
    state: g,
    target: p,
    to: y,
    preventScrollReset: m,
    viewTransition: v,
    defaultShouldRevalidate: x,
    ...S
  }, T) {
    let { basename: N, navigator: R, useTransitions: z } = M.useContext(ia), E = typeof y == "string" && Xb.test(y), j = xb(y, N);
    y = j.to;
    let U = C_(y, { relative: s }), H = li(), V = null;
    if (h) {
      let $ = Fu(
        h,
        [],
        H.mask ? H.mask.pathname : "/",
        !0
      );
      N !== "/" && ($.pathname = $.pathname === "/" ? N : na([N, $.pathname])), V = R.createHref($);
    }
    let [D, q, le] = b2(
      o,
      S
    ), I = T2(y, {
      replace: c,
      mask: h,
      state: g,
      target: p,
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
          ref: _2(T, q),
          target: p,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return D && !E ? /* @__PURE__ */ M.createElement(M.Fragment, null, O, /* @__PURE__ */ M.createElement(x2, { page: U })) : O;
  }
);
Gb.displayName = "Link";
var Ib = M.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: o = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: h,
    children: g,
    ...p
  }, y) {
    let m = Go(c, { relative: p.relative }), v = li(), x = M.useContext($o), { navigator: S, basename: T } = M.useContext(ia), N = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    O2(m) && h === !0, R = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname, z = v.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
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
      Gb,
      {
        ...p,
        "aria-current": D,
        className: q,
        ref: y,
        style: le,
        to: c,
        viewTransition: h
      },
      typeof g == "function" ? g(V) : g
    );
  }
);
Ib.displayName = "NavLink";
var R2 = M.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: o,
    replace: s,
    state: u,
    method: c = Mu,
    action: h,
    onSubmit: g,
    relative: p,
    preventScrollReset: y,
    viewTransition: m,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: T } = M.useContext(ia), N = A2(), R = z2(h, { relative: p }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof h == "string" && Xb.test(h), j = (U) => {
      if (g && g(U), U.defaultPrevented) return;
      U.preventDefault();
      let H = U.nativeEvent.submitter, V = H?.getAttribute("formmethod") || c, D = () => N(H || U.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: r,
        replace: s,
        state: u,
        relative: p,
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
        onSubmit: o ? g : j,
        ...x,
        "data-discover": !E && t === "render" ? "true" : void 0
      }
    );
  }
);
R2.displayName = "Form";
function C2(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Zb(t) {
  let a = M.useContext(Er);
  return Ze(a, C2(t)), a;
}
function T2(t, {
  target: a,
  replace: r,
  mask: o,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: h,
  defaultShouldRevalidate: g,
  useTransitions: p
} = {}) {
  let y = T_(), m = li(), v = Go(t, { relative: c });
  return M.useCallback(
    (x) => {
      if (o2(x, a)) {
        x.preventDefault();
        let S = r !== void 0 ? r : ja(m) === ja(v), T = () => y(t, {
          replace: S,
          mask: o,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: h,
          defaultShouldRevalidate: g
        });
        p ? M.startTransition(() => T()) : T();
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
      g,
      p
    ]
  );
}
var M2 = 0, D2 = () => `__${String(++M2)}__`;
function A2() {
  let { router: t } = Zb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = M.useContext(ia), r = Y_(), o = t.fetch, s = t.navigate;
  return M.useCallback(
    async (u, c = {}) => {
      let { action: h, method: g, encType: p, formData: y, body: m } = c2(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || D2();
        await o(v, r, c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: m,
          formMethod: c.method || g,
          formEncType: c.encType || p,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: m,
          formMethod: c.method || g,
          formEncType: c.encType || p,
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
function z2(t, { relative: a } = {}) {
  let { basename: r } = M.useContext(ia), o = M.useContext(ba);
  Ze(o, "useFormAction must be used inside a RouteContext");
  let [s] = o.matches.slice(-1), u = { ...Go(t || ".", { relative: a }) }, c = li();
  if (t == null) {
    u.search = c.search;
    let h = new URLSearchParams(u.search), g = h.getAll("index");
    if (g.some((y) => y === "")) {
      h.delete("index"), g.filter((m) => m).forEach((m) => h.append("index", m));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : na([r, u.pathname])), ja(u);
}
function O2(t, { relative: a } = {}) {
  let r = M.useContext(Oh);
  Ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = Zb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Go(t, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = aa(r.currentLocation.pathname, o) || r.currentLocation.pathname, c = aa(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return Hu(s.pathname, c) != null || Hu(s.pathname, u) != null;
}
const j2 = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], L2 = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], Qb = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: ""
};
class Fb extends Error {
  constructor(a, r, o, s) {
    super(o), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Vh = "/api/v1/extensions/nexus.video.svi2-pro";
async function El(t, a) {
  const r = t.startsWith("http") ? t : `${Vh}${t}`, o = await fetch(r, {
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
    throw new Fb(
      o.status,
      s?.category ?? "unknown",
      s?.message ?? o.statusText,
      s?.requestId
    );
  }
  if (o.status !== 204)
    return await o.json();
}
function H2(t, a, r) {
  const o = t.startsWith("http") ? t : `${Vh}${t}`, s = new EventSource(o);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
  }, () => s.close();
}
async function Kb() {
  return El("/presets");
}
async function B2() {
  return El("/settings");
}
async function U2(t) {
  return El("/settings", {
    method: "PUT",
    body: JSON.stringify(t)
  });
}
var k2 = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function ta({ tone: t = "neutral", children: a, className: r }) {
  const o = [k2[t], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("span", { className: o, children: a });
}
var V2 = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, Y2 = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, q2 = "_1h48t1v9";
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
  const g = [V2[t], Y2[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs(
    "button",
    {
      type: r,
      className: g,
      disabled: o || s,
      "aria-busy": o || void 0,
      ...h,
      children: [
        o ? /* @__PURE__ */ w.jsx("span", { className: q2, "aria-hidden": "true" }) : null,
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
var $2 = { value: () => {
} };
function ec() {
  for (var t = 0, a = arguments.length, r = {}, o; t < a; ++t) {
    if (!(o = arguments[t] + "") || o in r || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    r[o] = [];
  }
  return new Au(r);
}
function Au(t) {
  this._ = t;
}
function X2(t, a) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var o = "", s = r.indexOf(".");
    if (s >= 0 && (o = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: o };
  });
}
Au.prototype = ec.prototype = {
  constructor: Au,
  on: function(t, a) {
    var r = this._, o = X2(t + "", r), s, u = -1, c = o.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (t = o[u]).type) && (s = G2(r[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (t = o[u]).type) r[s] = Dy(r[s], t.name, a);
      else if (a == null) for (s in r) r[s] = Dy(r[s], t.name, null);
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
function G2(t, a) {
  for (var r = 0, o = t.length, s; r < o; ++r)
    if ((s = t[r]).name === a)
      return s.value;
}
function Dy(t, a, r) {
  for (var o = 0, s = t.length; o < s; ++o)
    if (t[o].name === a) {
      t[o] = $2, t = t.slice(0, o).concat(t.slice(o + 1));
      break;
    }
  return r != null && t.push({ name: a, value: r }), t;
}
var Jd = "http://www.w3.org/1999/xhtml";
const Ay = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Jd,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function tc(t) {
  var a = t += "", r = a.indexOf(":");
  return r >= 0 && (a = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)), Ay.hasOwnProperty(a) ? { space: Ay[a], local: t } : t;
}
function I2(t) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === Jd && a.documentElement.namespaceURI === Jd ? a.createElement(t) : a.createElementNS(r, t);
  };
}
function Z2(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Pb(t) {
  var a = tc(t);
  return (a.local ? Z2 : I2)(a);
}
function Q2() {
}
function Yh(t) {
  return t == null ? Q2 : function() {
    return this.querySelector(t);
  };
}
function F2(t) {
  typeof t != "function" && (t = Yh(t));
  for (var a = this._groups, r = a.length, o = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = o[s] = new Array(c), g, p, y = 0; y < c; ++y)
      (g = u[y]) && (p = t.call(g, g.__data__, y, u)) && ("__data__" in g && (p.__data__ = g.__data__), h[y] = p);
  return new Yn(o, this._parents);
}
function K2(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function P2() {
  return [];
}
function Jb(t) {
  return t == null ? P2 : function() {
    return this.querySelectorAll(t);
  };
}
function J2(t) {
  return function() {
    return K2(t.apply(this, arguments));
  };
}
function W2(t) {
  typeof t == "function" ? t = J2(t) : t = Jb(t);
  for (var a = this._groups, r = a.length, o = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], h = c.length, g, p = 0; p < h; ++p)
      (g = c[p]) && (o.push(t.call(g, g.__data__, p, c)), s.push(g));
  return new Yn(o, s);
}
function Wb(t) {
  return function() {
    return this.matches(t);
  };
}
function e1(t) {
  return function(a) {
    return a.matches(t);
  };
}
var eN = Array.prototype.find;
function tN(t) {
  return function() {
    return eN.call(this.children, t);
  };
}
function nN() {
  return this.firstElementChild;
}
function aN(t) {
  return this.select(t == null ? nN : tN(typeof t == "function" ? t : e1(t)));
}
var iN = Array.prototype.filter;
function rN() {
  return Array.from(this.children);
}
function lN(t) {
  return function() {
    return iN.call(this.children, t);
  };
}
function oN(t) {
  return this.selectAll(t == null ? rN : lN(typeof t == "function" ? t : e1(t)));
}
function sN(t) {
  typeof t != "function" && (t = Wb(t));
  for (var a = this._groups, r = a.length, o = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = o[s] = [], g, p = 0; p < c; ++p)
      (g = u[p]) && t.call(g, g.__data__, p, u) && h.push(g);
  return new Yn(o, this._parents);
}
function t1(t) {
  return new Array(t.length);
}
function uN() {
  return new Yn(this._enter || this._groups.map(t1), this._parents);
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
function cN(t) {
  return function() {
    return t;
  };
}
function fN(t, a, r, o, s, u) {
  for (var c = 0, h, g = a.length, p = u.length; c < p; ++c)
    (h = a[c]) ? (h.__data__ = u[c], o[c] = h) : r[c] = new Uu(t, u[c]);
  for (; c < g; ++c)
    (h = a[c]) && (s[c] = h);
}
function dN(t, a, r, o, s, u, c) {
  var h, g, p = /* @__PURE__ */ new Map(), y = a.length, m = u.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (g = a[h]) && (v[h] = x = c.call(g, g.__data__, h, a) + "", p.has(x) ? s[h] = g : p.set(x, g));
  for (h = 0; h < m; ++h)
    x = c.call(t, u[h], h, u) + "", (g = p.get(x)) ? (o[h] = g, g.__data__ = u[h], p.delete(x)) : r[h] = new Uu(t, u[h]);
  for (h = 0; h < y; ++h)
    (g = a[h]) && p.get(v[h]) === g && (s[h] = g);
}
function hN(t) {
  return t.__data__;
}
function mN(t, a) {
  if (!arguments.length) return Array.from(this, hN);
  var r = a ? dN : fN, o = this._parents, s = this._groups;
  typeof t != "function" && (t = cN(t));
  for (var u = s.length, c = new Array(u), h = new Array(u), g = new Array(u), p = 0; p < u; ++p) {
    var y = o[p], m = s[p], v = m.length, x = pN(t.call(y, y && y.__data__, p, o)), S = x.length, T = h[p] = new Array(S), N = c[p] = new Array(S), R = g[p] = new Array(v);
    r(y, m, T, N, R, x, a);
    for (var z = 0, E = 0, j, U; z < S; ++z)
      if (j = T[z]) {
        for (z >= E && (E = z + 1); !(U = N[E]) && ++E < S; ) ;
        j._next = U || null;
      }
  }
  return c = new Yn(c, o), c._enter = h, c._exit = g, c;
}
function pN(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function gN() {
  return new Yn(this._exit || this._groups.map(t1), this._parents);
}
function yN(t, a, r) {
  var o = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (o = t(o), o && (o = o.selection())) : o = o.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), o && s ? o.merge(s).order() : s;
}
function vN(t) {
  for (var a = t.selection ? t.selection() : t, r = this._groups, o = a._groups, s = r.length, u = o.length, c = Math.min(s, u), h = new Array(s), g = 0; g < c; ++g)
    for (var p = r[g], y = o[g], m = p.length, v = h[g] = new Array(m), x, S = 0; S < m; ++S)
      (x = p[S] || y[S]) && (v[S] = x);
  for (; g < s; ++g)
    h[g] = r[g];
  return new Yn(h, this._parents);
}
function bN() {
  for (var t = this._groups, a = -1, r = t.length; ++a < r; )
    for (var o = t[a], s = o.length - 1, u = o[s], c; --s >= 0; )
      (c = o[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function xN(t) {
  t || (t = SN);
  function a(m, v) {
    return m && v ? t(m.__data__, v.__data__) : !m - !v;
  }
  for (var r = this._groups, o = r.length, s = new Array(o), u = 0; u < o; ++u) {
    for (var c = r[u], h = c.length, g = s[u] = new Array(h), p, y = 0; y < h; ++y)
      (p = c[y]) && (g[y] = p);
    g.sort(a);
  }
  return new Yn(s, this._parents).order();
}
function SN(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function wN() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function EN() {
  return Array.from(this);
}
function _N() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var o = t[a], s = 0, u = o.length; s < u; ++s) {
      var c = o[s];
      if (c) return c;
    }
  return null;
}
function NN() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function RN() {
  return !this.node();
}
function CN(t) {
  for (var a = this._groups, r = 0, o = a.length; r < o; ++r)
    for (var s = a[r], u = 0, c = s.length, h; u < c; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function TN(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function MN(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function DN(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function AN(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function zN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
  };
}
function ON(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, r);
  };
}
function jN(t, a) {
  var r = tc(t);
  if (arguments.length < 2) {
    var o = this.node();
    return r.local ? o.getAttributeNS(r.space, r.local) : o.getAttribute(r);
  }
  return this.each((a == null ? r.local ? MN : TN : typeof a == "function" ? r.local ? ON : zN : r.local ? AN : DN)(r, a));
}
function n1(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function LN(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function HN(t, a, r) {
  return function() {
    this.style.setProperty(t, a, r);
  };
}
function BN(t, a, r) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, r);
  };
}
function UN(t, a, r) {
  return arguments.length > 1 ? this.each((a == null ? LN : typeof a == "function" ? BN : HN)(t, a, r ?? "")) : pl(this.node(), t);
}
function pl(t, a) {
  return t.style.getPropertyValue(a) || n1(t).getComputedStyle(t, null).getPropertyValue(a);
}
function kN(t) {
  return function() {
    delete this[t];
  };
}
function VN(t, a) {
  return function() {
    this[t] = a;
  };
}
function YN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[t] : this[t] = r;
  };
}
function qN(t, a) {
  return arguments.length > 1 ? this.each((a == null ? kN : typeof a == "function" ? YN : VN)(t, a)) : this.node()[t];
}
function a1(t) {
  return t.trim().split(/^|\s+/);
}
function qh(t) {
  return t.classList || new i1(t);
}
function i1(t) {
  this._node = t, this._names = a1(t.getAttribute("class") || "");
}
i1.prototype = {
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
function r1(t, a) {
  for (var r = qh(t), o = -1, s = a.length; ++o < s; ) r.add(a[o]);
}
function l1(t, a) {
  for (var r = qh(t), o = -1, s = a.length; ++o < s; ) r.remove(a[o]);
}
function $N(t) {
  return function() {
    r1(this, t);
  };
}
function XN(t) {
  return function() {
    l1(this, t);
  };
}
function GN(t, a) {
  return function() {
    (a.apply(this, arguments) ? r1 : l1)(this, t);
  };
}
function IN(t, a) {
  var r = a1(t + "");
  if (arguments.length < 2) {
    for (var o = qh(this.node()), s = -1, u = r.length; ++s < u; ) if (!o.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? GN : a ? $N : XN)(r, a));
}
function ZN() {
  this.textContent = "";
}
function QN(t) {
  return function() {
    this.textContent = t;
  };
}
function FN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function KN(t) {
  return arguments.length ? this.each(t == null ? ZN : (typeof t == "function" ? FN : QN)(t)) : this.node().textContent;
}
function PN() {
  this.innerHTML = "";
}
function JN(t) {
  return function() {
    this.innerHTML = t;
  };
}
function WN(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function eR(t) {
  return arguments.length ? this.each(t == null ? PN : (typeof t == "function" ? WN : JN)(t)) : this.node().innerHTML;
}
function tR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function nR() {
  return this.each(tR);
}
function aR() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function iR() {
  return this.each(aR);
}
function rR(t) {
  var a = typeof t == "function" ? t : Pb(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function lR() {
  return null;
}
function oR(t, a) {
  var r = typeof t == "function" ? t : Pb(t), o = a == null ? lR : typeof a == "function" ? a : Yh(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function sR() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function uR() {
  return this.each(sR);
}
function cR() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function fR() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function dR(t) {
  return this.select(t ? fR : cR);
}
function hR(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function mR(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function pR(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var r = "", o = a.indexOf(".");
    return o >= 0 && (r = a.slice(o + 1), a = a.slice(0, o)), { type: a, name: r };
  });
}
function gR(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, o = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++o] = u;
      ++o ? a.length = o : delete this.__on;
    }
  };
}
function yR(t, a, r) {
  return function() {
    var o = this.__on, s, u = mR(a);
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
function vR(t, a, r) {
  var o = pR(t + ""), s, u = o.length, c;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var g = 0, p = h.length, y; g < p; ++g)
        for (s = 0, y = h[g]; s < u; ++s)
          if ((c = o[s]).type === y.type && c.name === y.name)
            return y.value;
    }
    return;
  }
  for (h = a ? yR : gR, s = 0; s < u; ++s) this.each(h(o[s], a, r));
  return this;
}
function o1(t, a, r) {
  var o = n1(t), s = o.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = o.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function bR(t, a) {
  return function() {
    return o1(this, t, a);
  };
}
function xR(t, a) {
  return function() {
    return o1(this, t, a.apply(this, arguments));
  };
}
function SR(t, a) {
  return this.each((typeof a == "function" ? xR : bR)(t, a));
}
function* wR() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var o = t[a], s = 0, u = o.length, c; s < u; ++s)
      (c = o[s]) && (yield c);
}
var s1 = [null];
function Yn(t, a) {
  this._groups = t, this._parents = a;
}
function Io() {
  return new Yn([[document.documentElement]], s1);
}
function ER() {
  return this;
}
Yn.prototype = Io.prototype = {
  constructor: Yn,
  select: F2,
  selectAll: W2,
  selectChild: aN,
  selectChildren: oN,
  filter: sN,
  data: mN,
  enter: uN,
  exit: gN,
  join: yN,
  merge: vN,
  selection: ER,
  order: bN,
  sort: xN,
  call: wN,
  nodes: EN,
  node: _N,
  size: NN,
  empty: RN,
  each: CN,
  attr: jN,
  style: UN,
  property: qN,
  classed: IN,
  text: KN,
  html: eR,
  raise: nR,
  lower: iR,
  append: rR,
  insert: oR,
  remove: uR,
  clone: dR,
  datum: hR,
  on: vR,
  dispatch: SR,
  [Symbol.iterator]: wR
};
function Vn(t) {
  return typeof t == "string" ? new Yn([[document.querySelector(t)]], [document.documentElement]) : new Yn([[t]], s1);
}
function _R(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ha(t, a) {
  if (t = _R(t), a === void 0 && (a = t.currentTarget), a) {
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
const NR = { passive: !1 }, Ao = { capture: !0, passive: !1 };
function Td(t) {
  t.stopImmediatePropagation();
}
function dl(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function u1(t) {
  var a = t.document.documentElement, r = Vn(t).on("dragstart.drag", dl, Ao);
  "onselectstart" in a ? r.on("selectstart.drag", dl, Ao) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function c1(t, a) {
  var r = t.document.documentElement, o = Vn(t).on("dragstart.drag", null);
  a && (o.on("click.drag", dl, Ao), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in r ? o.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const cu = (t) => () => t;
function Wd(t, {
  sourceEvent: a,
  subject: r,
  target: o,
  identifier: s,
  active: u,
  x: c,
  y: h,
  dx: g,
  dy: p,
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
    dx: { value: g, enumerable: !0, configurable: !0 },
    dy: { value: p, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
Wd.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function RR(t) {
  return !t.ctrlKey && !t.button;
}
function CR() {
  return this.parentNode;
}
function TR(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function MR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function f1() {
  var t = RR, a = CR, r = TR, o = MR, s = {}, u = ec("start", "drag", "end"), c = 0, h, g, p, y, m = 0;
  function v(j) {
    j.on("mousedown.drag", x).filter(o).on("touchstart.drag", N).on("touchmove.drag", R, NR).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(j, U) {
    if (!(y || !t.call(this, j, U))) {
      var H = E(this, a.call(this, j, U), j, U, "mouse");
      H && (Vn(j.view).on("mousemove.drag", S, Ao).on("mouseup.drag", T, Ao), u1(j.view), Td(j), p = !1, h = j.clientX, g = j.clientY, H("start", j));
    }
  }
  function S(j) {
    if (dl(j), !p) {
      var U = j.clientX - h, H = j.clientY - g;
      p = U * U + H * H > m;
    }
    s.mouse("drag", j);
  }
  function T(j) {
    Vn(j.view).on("mousemove.drag mouseup.drag", null), c1(j.view, p), dl(j), s.mouse("end", j);
  }
  function N(j, U) {
    if (t.call(this, j, U)) {
      var H = j.changedTouches, V = a.call(this, j, U), D = H.length, q, le;
      for (q = 0; q < D; ++q)
        (le = E(this, V, j, U, H[q].identifier, H[q])) && (Td(j), le("start", j, H[q]));
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
      (D = s[U[V].identifier]) && (Td(j), D("end", j, U[V]));
  }
  function E(j, U, H, V, D, q) {
    var le = u.copy(), I = ha(q || H, U), K, W, O;
    if ((O = r.call(j, new Wd("beforestart", {
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
          new Wd(_, {
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
function $h(t, a, r) {
  t.prototype = a.prototype = r, r.constructor = t;
}
function d1(t, a) {
  var r = Object.create(t.prototype);
  for (var o in a) r[o] = a[o];
  return r;
}
function Zo() {
}
var zo = 0.7, ku = 1 / zo, hl = "\\s*([+-]?\\d+)\\s*", Oo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", za = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", DR = /^#([0-9a-f]{3,8})$/, AR = new RegExp(`^rgb\\(${hl},${hl},${hl}\\)$`), zR = new RegExp(`^rgb\\(${za},${za},${za}\\)$`), OR = new RegExp(`^rgba\\(${hl},${hl},${hl},${Oo}\\)$`), jR = new RegExp(`^rgba\\(${za},${za},${za},${Oo}\\)$`), LR = new RegExp(`^hsl\\(${Oo},${za},${za}\\)$`), HR = new RegExp(`^hsla\\(${Oo},${za},${za},${Oo}\\)$`), zy = {
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
$h(Zo, vr, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Oy,
  // Deprecated! Use color.formatHex.
  formatHex: Oy,
  formatHex8: BR,
  formatHsl: UR,
  formatRgb: jy,
  toString: jy
});
function Oy() {
  return this.rgb().formatHex();
}
function BR() {
  return this.rgb().formatHex8();
}
function UR() {
  return h1(this).formatHsl();
}
function jy() {
  return this.rgb().formatRgb();
}
function vr(t) {
  var a, r;
  return t = (t + "").trim().toLowerCase(), (a = DR.exec(t)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? Ly(a) : r === 3 ? new Tn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? fu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? fu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = AR.exec(t)) ? new Tn(a[1], a[2], a[3], 1) : (a = zR.exec(t)) ? new Tn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = OR.exec(t)) ? fu(a[1], a[2], a[3], a[4]) : (a = jR.exec(t)) ? fu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = LR.exec(t)) ? Uy(a[1], a[2] / 100, a[3] / 100, 1) : (a = HR.exec(t)) ? Uy(a[1], a[2] / 100, a[3] / 100, a[4]) : zy.hasOwnProperty(t) ? Ly(zy[t]) : t === "transparent" ? new Tn(NaN, NaN, NaN, 0) : null;
}
function Ly(t) {
  return new Tn(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function fu(t, a, r, o) {
  return o <= 0 && (t = a = r = NaN), new Tn(t, a, r, o);
}
function kR(t) {
  return t instanceof Zo || (t = vr(t)), t ? (t = t.rgb(), new Tn(t.r, t.g, t.b, t.opacity)) : new Tn();
}
function eh(t, a, r, o) {
  return arguments.length === 1 ? kR(t) : new Tn(t, a, r, o ?? 1);
}
function Tn(t, a, r, o) {
  this.r = +t, this.g = +a, this.b = +r, this.opacity = +o;
}
$h(Tn, eh, d1(Zo, {
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
    return new Tn(gr(this.r), gr(this.g), gr(this.b), Vu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Hy,
  // Deprecated! Use color.formatHex.
  formatHex: Hy,
  formatHex8: VR,
  formatRgb: By,
  toString: By
}));
function Hy() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}`;
}
function VR() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}${pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function By() {
  const t = Vu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${gr(this.r)}, ${gr(this.g)}, ${gr(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Vu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function gr(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function pr(t) {
  return t = gr(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Uy(t, a, r, o) {
  return o <= 0 ? t = a = r = NaN : r <= 0 || r >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ma(t, a, r, o);
}
function h1(t) {
  if (t instanceof ma) return new ma(t.h, t.s, t.l, t.opacity);
  if (t instanceof Zo || (t = vr(t)), !t) return new ma();
  if (t instanceof ma) return t;
  t = t.rgb();
  var a = t.r / 255, r = t.g / 255, o = t.b / 255, s = Math.min(a, r, o), u = Math.max(a, r, o), c = NaN, h = u - s, g = (u + s) / 2;
  return h ? (a === u ? c = (r - o) / h + (r < o) * 6 : r === u ? c = (o - a) / h + 2 : c = (a - r) / h + 4, h /= g < 0.5 ? u + s : 2 - u - s, c *= 60) : h = g > 0 && g < 1 ? 0 : c, new ma(c, h, g, t.opacity);
}
function YR(t, a, r, o) {
  return arguments.length === 1 ? h1(t) : new ma(t, a, r, o ?? 1);
}
function ma(t, a, r, o) {
  this.h = +t, this.s = +a, this.l = +r, this.opacity = +o;
}
$h(ma, YR, d1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, r = this.l, o = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - o;
    return new Tn(
      Md(t >= 240 ? t - 240 : t + 120, s, o),
      Md(t, s, o),
      Md(t < 120 ? t + 240 : t - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new ma(ky(this.h), du(this.s), du(this.l), Vu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Vu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${ky(this.h)}, ${du(this.s) * 100}%, ${du(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function ky(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function du(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Md(t, a, r) {
  return (t < 60 ? a + (r - a) * t / 60 : t < 180 ? r : t < 240 ? a + (r - a) * (240 - t) / 60 : a) * 255;
}
const Xh = (t) => () => t;
function qR(t, a) {
  return function(r) {
    return t + r * a;
  };
}
function $R(t, a, r) {
  return t = Math.pow(t, r), a = Math.pow(a, r) - t, r = 1 / r, function(o) {
    return Math.pow(t + o * a, r);
  };
}
function XR(t) {
  return (t = +t) == 1 ? m1 : function(a, r) {
    return r - a ? $R(a, r, t) : Xh(isNaN(a) ? r : a);
  };
}
function m1(t, a) {
  var r = a - t;
  return r ? qR(t, r) : Xh(isNaN(t) ? a : t);
}
const Yu = (function t(a) {
  var r = XR(a);
  function o(s, u) {
    var c = r((s = eh(s)).r, (u = eh(u)).r), h = r(s.g, u.g), g = r(s.b, u.b), p = m1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = h(y), s.b = g(y), s.opacity = p(y), s + "";
    };
  }
  return o.gamma = t, o;
})(1);
function GR(t, a) {
  a || (a = []);
  var r = t ? Math.min(a.length, t.length) : 0, o = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) o[s] = t[s] * (1 - u) + a[s] * u;
    return o;
  };
}
function IR(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function ZR(t, a) {
  var r = a ? a.length : 0, o = t ? Math.min(r, t.length) : 0, s = new Array(o), u = new Array(r), c;
  for (c = 0; c < o; ++c) s[c] = Co(t[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(h) {
    for (c = 0; c < o; ++c) u[c] = s[c](h);
    return u;
  };
}
function QR(t, a) {
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
function FR(t, a) {
  var r = {}, o = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? r[s] = Co(t[s], a[s]) : o[s] = a[s];
  return function(u) {
    for (s in r) o[s] = r[s](u);
    return o;
  };
}
var th = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Dd = new RegExp(th.source, "g");
function KR(t) {
  return function() {
    return t;
  };
}
function PR(t) {
  return function(a) {
    return t(a) + "";
  };
}
function p1(t, a) {
  var r = th.lastIndex = Dd.lastIndex = 0, o, s, u, c = -1, h = [], g = [];
  for (t = t + "", a = a + ""; (o = th.exec(t)) && (s = Dd.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), h[c] ? h[c] += u : h[++c] = u), (o = o[0]) === (s = s[0]) ? h[c] ? h[c] += s : h[++c] = s : (h[++c] = null, g.push({ i: c, x: Da(o, s) })), r = Dd.lastIndex;
  return r < a.length && (u = a.slice(r), h[c] ? h[c] += u : h[++c] = u), h.length < 2 ? g[0] ? PR(g[0].x) : KR(a) : (a = g.length, function(p) {
    for (var y = 0, m; y < a; ++y) h[(m = g[y]).i] = m.x(p);
    return h.join("");
  });
}
function Co(t, a) {
  var r = typeof a, o;
  return a == null || r === "boolean" ? Xh(a) : (r === "number" ? Da : r === "string" ? (o = vr(a)) ? (a = o, Yu) : p1 : a instanceof vr ? Yu : a instanceof Date ? QR : IR(a) ? GR : Array.isArray(a) ? ZR : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? FR : Da)(t, a);
}
var Vy = 180 / Math.PI, nh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function g1(t, a, r, o, s, u) {
  var c, h, g;
  return (c = Math.sqrt(t * t + a * a)) && (t /= c, a /= c), (g = t * r + a * o) && (r -= t * g, o -= a * g), (h = Math.sqrt(r * r + o * o)) && (r /= h, o /= h, g /= h), t * o < a * r && (t = -t, a = -a, g = -g, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * Vy,
    skewX: Math.atan(g) * Vy,
    scaleX: c,
    scaleY: h
  };
}
var hu;
function JR(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? nh : g1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function WR(t) {
  return t == null || (hu || (hu = document.createElementNS("http://www.w3.org/2000/svg", "g")), hu.setAttribute("transform", t), !(t = hu.transform.baseVal.consolidate())) ? nh : (t = t.matrix, g1(t.a, t.b, t.c, t.d, t.e, t.f));
}
function y1(t, a, r, o) {
  function s(p) {
    return p.length ? p.pop() + " " : "";
  }
  function u(p, y, m, v, x, S) {
    if (p !== m || y !== v) {
      var T = x.push("translate(", null, a, null, r);
      S.push({ i: T - 4, x: Da(p, m) }, { i: T - 2, x: Da(y, v) });
    } else (m || v) && x.push("translate(" + m + a + v + r);
  }
  function c(p, y, m, v) {
    p !== y ? (p - y > 180 ? y += 360 : y - p > 180 && (p += 360), v.push({ i: m.push(s(m) + "rotate(", null, o) - 2, x: Da(p, y) })) : y && m.push(s(m) + "rotate(" + y + o);
  }
  function h(p, y, m, v) {
    p !== y ? v.push({ i: m.push(s(m) + "skewX(", null, o) - 2, x: Da(p, y) }) : y && m.push(s(m) + "skewX(" + y + o);
  }
  function g(p, y, m, v, x, S) {
    if (p !== m || y !== v) {
      var T = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: T - 4, x: Da(p, m) }, { i: T - 2, x: Da(y, v) });
    } else (m !== 1 || v !== 1) && x.push(s(x) + "scale(" + m + "," + v + ")");
  }
  return function(p, y) {
    var m = [], v = [];
    return p = t(p), y = t(y), u(p.translateX, p.translateY, y.translateX, y.translateY, m, v), c(p.rotate, y.rotate, m, v), h(p.skewX, y.skewX, m, v), g(p.scaleX, p.scaleY, y.scaleX, y.scaleY, m, v), p = y = null, function(x) {
      for (var S = -1, T = v.length, N; ++S < T; ) m[(N = v[S]).i] = N.x(x);
      return m.join("");
    };
  };
}
var eC = y1(JR, "px, ", "px)", "deg)"), tC = y1(WR, ", ", ")", ")"), nC = 1e-12;
function Yy(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function aC(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function iC(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const zu = (function t(a, r, o) {
  function s(u, c) {
    var h = u[0], g = u[1], p = u[2], y = c[0], m = c[1], v = c[2], x = y - h, S = m - g, T = x * x + S * S, N, R;
    if (T < nC)
      R = Math.log(v / p) / a, N = function(V) {
        return [
          h + V * x,
          g + V * S,
          p * Math.exp(a * V * R)
        ];
      };
    else {
      var z = Math.sqrt(T), E = (v * v - p * p + o * T) / (2 * p * r * z), j = (v * v - p * p - o * T) / (2 * v * r * z), U = Math.log(Math.sqrt(E * E + 1) - E), H = Math.log(Math.sqrt(j * j + 1) - j);
      R = (H - U) / a, N = function(V) {
        var D = V * R, q = Yy(U), le = p / (r * z) * (q * iC(a * D + U) - aC(U));
        return [
          h + le * x,
          g + le * S,
          p * q / Yy(a * D + U)
        ];
      };
    }
    return N.duration = R * 1e3 * a / Math.SQRT2, N;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), h = c * c, g = h * h;
    return t(c, h, g);
  }, s;
})(Math.SQRT2, 2, 4);
var gl = 0, _o = 0, xo = 0, v1 = 1e3, qu, No, $u = 0, br = 0, nc = 0, jo = typeof performance == "object" && performance.now ? performance : Date, b1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Gh() {
  return br || (b1(rC), br = jo.now() + nc);
}
function rC() {
  br = 0;
}
function Xu() {
  this._call = this._time = this._next = null;
}
Xu.prototype = x1.prototype = {
  constructor: Xu,
  restart: function(t, a, r) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Gh() : +r) + (a == null ? 0 : +a), !this._next && No !== this && (No ? No._next = this : qu = this, No = this), this._call = t, this._time = r, ah();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ah());
  }
};
function x1(t, a, r) {
  var o = new Xu();
  return o.restart(t, a, r), o;
}
function lC() {
  Gh(), ++gl;
  for (var t = qu, a; t; )
    (a = br - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --gl;
}
function qy() {
  br = ($u = jo.now()) + nc, gl = _o = 0;
  try {
    lC();
  } finally {
    gl = 0, sC(), br = 0;
  }
}
function oC() {
  var t = jo.now(), a = t - $u;
  a > v1 && (nc -= a, $u = t);
}
function sC() {
  for (var t, a = qu, r, o = 1 / 0; a; )
    a._call ? (o > a._time && (o = a._time), t = a, a = a._next) : (r = a._next, a._next = null, a = t ? t._next = r : qu = r);
  No = t, ah(o);
}
function ah(t) {
  if (!gl) {
    _o && (_o = clearTimeout(_o));
    var a = t - br;
    a > 24 ? (t < 1 / 0 && (_o = setTimeout(qy, t - jo.now() - nc)), xo && (xo = clearInterval(xo))) : (xo || ($u = jo.now(), xo = setInterval(oC, v1)), gl = 1, b1(qy));
  }
}
function $y(t, a, r) {
  var o = new Xu();
  return a = a == null ? 0 : +a, o.restart((s) => {
    o.stop(), t(s + a);
  }, a, r), o;
}
var uC = ec("start", "end", "cancel", "interrupt"), cC = [], S1 = 0, Xy = 1, ih = 2, Ou = 3, Gy = 4, rh = 5, ju = 6;
function ac(t, a, r, o, s, u) {
  var c = t.__transition;
  if (!c) t.__transition = {};
  else if (r in c) return;
  fC(t, r, {
    name: a,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: uC,
    tween: cC,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: S1
  });
}
function Ih(t, a) {
  var r = xa(t, a);
  if (r.state > S1) throw new Error("too late; already scheduled");
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
function fC(t, a, r) {
  var o = t.__transition, s;
  o[a] = r, r.timer = x1(u, 0, r.time);
  function u(p) {
    r.state = Xy, r.timer.restart(c, r.delay, r.time), r.delay <= p && c(p - r.delay);
  }
  function c(p) {
    var y, m, v, x;
    if (r.state !== Xy) return g();
    for (y in o)
      if (x = o[y], x.name === r.name) {
        if (x.state === Ou) return $y(c);
        x.state === Gy ? (x.state = ju, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete o[y]) : +y < a && (x.state = ju, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete o[y]);
      }
    if ($y(function() {
      r.state === Ou && (r.state = Gy, r.timer.restart(h, r.delay, r.time), h(p));
    }), r.state = ih, r.on.call("start", t, t.__data__, r.index, r.group), r.state === ih) {
      for (r.state = Ou, s = new Array(v = r.tween.length), y = 0, m = -1; y < v; ++y)
        (x = r.tween[y].value.call(t, t.__data__, r.index, r.group)) && (s[++m] = x);
      s.length = m + 1;
    }
  }
  function h(p) {
    for (var y = p < r.duration ? r.ease.call(null, p / r.duration) : (r.timer.restart(g), r.state = rh, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(t, y);
    r.state === rh && (r.on.call("end", t, t.__data__, r.index, r.group), g());
  }
  function g() {
    r.state = ju, r.timer.stop(), delete o[a];
    for (var p in o) return;
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
      s = o.state > ih && o.state < rh, o.state = ju, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", t, t.__data__, o.index, o.group), delete r[c];
    }
    u && delete t.__transition;
  }
}
function dC(t) {
  return this.each(function() {
    Lu(this, t);
  });
}
function hC(t, a) {
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
function mC(t, a, r) {
  var o, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = La(this, t), c = u.tween;
    if (c !== o) {
      s = (o = c).slice();
      for (var h = { name: a, value: r }, g = 0, p = s.length; g < p; ++g)
        if (s[g].name === a) {
          s[g] = h;
          break;
        }
      g === p && s.push(h);
    }
    u.tween = s;
  };
}
function pC(t, a) {
  var r = this._id;
  if (t += "", arguments.length < 2) {
    for (var o = xa(this.node(), r).tween, s = 0, u = o.length, c; s < u; ++s)
      if ((c = o[s]).name === t)
        return c.value;
    return null;
  }
  return this.each((a == null ? hC : mC)(r, t, a));
}
function Zh(t, a, r) {
  var o = t._id;
  return t.each(function() {
    var s = La(this, o);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return xa(s, o).value[a];
  };
}
function w1(t, a) {
  var r;
  return (typeof a == "number" ? Da : a instanceof vr ? Yu : (r = vr(a)) ? (a = r, Yu) : p1)(t, a);
}
function gC(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function yC(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function vC(t, a, r) {
  var o, s = r + "", u;
  return function() {
    var c = this.getAttribute(t);
    return c === s ? null : c === o ? u : u = a(o = c, r);
  };
}
function bC(t, a, r) {
  var o, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(t.space, t.local);
    return c === s ? null : c === o ? u : u = a(o = c, r);
  };
}
function xC(t, a, r) {
  var o, s, u;
  return function() {
    var c, h = r(this), g;
    return h == null ? void this.removeAttribute(t) : (c = this.getAttribute(t), g = h + "", c === g ? null : c === o && g === s ? u : (s = g, u = a(o = c, h)));
  };
}
function SC(t, a, r) {
  var o, s, u;
  return function() {
    var c, h = r(this), g;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (c = this.getAttributeNS(t.space, t.local), g = h + "", c === g ? null : c === o && g === s ? u : (s = g, u = a(o = c, h)));
  };
}
function wC(t, a) {
  var r = tc(t), o = r === "transform" ? tC : w1;
  return this.attrTween(t, typeof a == "function" ? (r.local ? SC : xC)(r, o, Zh(this, "attr." + t, a)) : a == null ? (r.local ? yC : gC)(r) : (r.local ? bC : vC)(r, o, a));
}
function EC(t, a) {
  return function(r) {
    this.setAttribute(t, a.call(this, r));
  };
}
function _C(t, a) {
  return function(r) {
    this.setAttributeNS(t.space, t.local, a.call(this, r));
  };
}
function NC(t, a) {
  var r, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (r = (o = u) && _C(t, u)), r;
  }
  return s._value = a, s;
}
function RC(t, a) {
  var r, o;
  function s() {
    var u = a.apply(this, arguments);
    return u !== o && (r = (o = u) && EC(t, u)), r;
  }
  return s._value = a, s;
}
function CC(t, a) {
  var r = "attr." + t;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var o = tc(t);
  return this.tween(r, (o.local ? NC : RC)(o, a));
}
function TC(t, a) {
  return function() {
    Ih(this, t).delay = +a.apply(this, arguments);
  };
}
function MC(t, a) {
  return a = +a, function() {
    Ih(this, t).delay = a;
  };
}
function DC(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? TC : MC)(a, t)) : xa(this.node(), a).delay;
}
function AC(t, a) {
  return function() {
    La(this, t).duration = +a.apply(this, arguments);
  };
}
function zC(t, a) {
  return a = +a, function() {
    La(this, t).duration = a;
  };
}
function OC(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? AC : zC)(a, t)) : xa(this.node(), a).duration;
}
function jC(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    La(this, t).ease = a;
  };
}
function LC(t) {
  var a = this._id;
  return arguments.length ? this.each(jC(a, t)) : xa(this.node(), a).ease;
}
function HC(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    La(this, t).ease = r;
  };
}
function BC(t) {
  if (typeof t != "function") throw new Error();
  return this.each(HC(this._id, t));
}
function UC(t) {
  typeof t != "function" && (t = Wb(t));
  for (var a = this._groups, r = a.length, o = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = o[s] = [], g, p = 0; p < c; ++p)
      (g = u[p]) && t.call(g, g.__data__, p, u) && h.push(g);
  return new ri(o, this._parents, this._name, this._id);
}
function kC(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, r = t._groups, o = a.length, s = r.length, u = Math.min(o, s), c = new Array(o), h = 0; h < u; ++h)
    for (var g = a[h], p = r[h], y = g.length, m = c[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = g[x] || p[x]) && (m[x] = v);
  for (; h < o; ++h)
    c[h] = a[h];
  return new ri(c, this._parents, this._name, this._id);
}
function VC(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function YC(t, a, r) {
  var o, s, u = VC(a) ? Ih : La;
  return function() {
    var c = u(this, t), h = c.on;
    h !== o && (s = (o = h).copy()).on(a, r), c.on = s;
  };
}
function qC(t, a) {
  var r = this._id;
  return arguments.length < 2 ? xa(this.node(), r).on.on(t) : this.each(YC(r, t, a));
}
function $C(t) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== t) return;
    a && a.removeChild(this);
  };
}
function XC() {
  return this.on("end.remove", $C(this._id));
}
function GC(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = Yh(t));
  for (var o = this._groups, s = o.length, u = new Array(s), c = 0; c < s; ++c)
    for (var h = o[c], g = h.length, p = u[c] = new Array(g), y, m, v = 0; v < g; ++v)
      (y = h[v]) && (m = t.call(y, y.__data__, v, h)) && ("__data__" in y && (m.__data__ = y.__data__), p[v] = m, ac(p[v], a, r, v, p, xa(y, r)));
  return new ri(u, this._parents, a, r);
}
function IC(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = Jb(t));
  for (var o = this._groups, s = o.length, u = [], c = [], h = 0; h < s; ++h)
    for (var g = o[h], p = g.length, y, m = 0; m < p; ++m)
      if (y = g[m]) {
        for (var v = t.call(y, y.__data__, m, g), x, S = xa(y, r), T = 0, N = v.length; T < N; ++T)
          (x = v[T]) && ac(x, a, r, T, v, S);
        u.push(v), c.push(y);
      }
  return new ri(u, c, a, r);
}
var ZC = Io.prototype.constructor;
function QC() {
  return new ZC(this._groups, this._parents);
}
function FC(t, a) {
  var r, o, s;
  return function() {
    var u = pl(this, t), c = (this.style.removeProperty(t), pl(this, t));
    return u === c ? null : u === r && c === o ? s : s = a(r = u, o = c);
  };
}
function E1(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function KC(t, a, r) {
  var o, s = r + "", u;
  return function() {
    var c = pl(this, t);
    return c === s ? null : c === o ? u : u = a(o = c, r);
  };
}
function PC(t, a, r) {
  var o, s, u;
  return function() {
    var c = pl(this, t), h = r(this), g = h + "";
    return h == null && (g = h = (this.style.removeProperty(t), pl(this, t))), c === g ? null : c === o && g === s ? u : (s = g, u = a(o = c, h));
  };
}
function JC(t, a) {
  var r, o, s, u = "style." + a, c = "end." + u, h;
  return function() {
    var g = La(this, t), p = g.on, y = g.value[u] == null ? h || (h = E1(a)) : void 0;
    (p !== r || s !== y) && (o = (r = p).copy()).on(c, s = y), g.on = o;
  };
}
function WC(t, a, r) {
  var o = (t += "") == "transform" ? eC : w1;
  return a == null ? this.styleTween(t, FC(t, o)).on("end.style." + t, E1(t)) : typeof a == "function" ? this.styleTween(t, PC(t, o, Zh(this, "style." + t, a))).each(JC(this._id, t)) : this.styleTween(t, KC(t, o, a), r).on("end.style." + t, null);
}
function eT(t, a, r) {
  return function(o) {
    this.style.setProperty(t, a.call(this, o), r);
  };
}
function tT(t, a, r) {
  var o, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (o = (s = c) && eT(t, c, r)), o;
  }
  return u._value = a, u;
}
function nT(t, a, r) {
  var o = "style." + (t += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (a == null) return this.tween(o, null);
  if (typeof a != "function") throw new Error();
  return this.tween(o, tT(t, a, r ?? ""));
}
function aT(t) {
  return function() {
    this.textContent = t;
  };
}
function iT(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function rT(t) {
  return this.tween("text", typeof t == "function" ? iT(Zh(this, "text", t)) : aT(t == null ? "" : t + ""));
}
function lT(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function oT(t) {
  var a, r;
  function o() {
    var s = t.apply(this, arguments);
    return s !== r && (a = (r = s) && lT(s)), a;
  }
  return o._value = t, o;
}
function sT(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, oT(t));
}
function uT() {
  for (var t = this._name, a = this._id, r = _1(), o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var c = o[u], h = c.length, g, p = 0; p < h; ++p)
      if (g = c[p]) {
        var y = xa(g, a);
        ac(g, t, r, p, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new ri(o, this._parents, t, r);
}
function cT() {
  var t, a, r = this, o = r._id, s = r.size();
  return new Promise(function(u, c) {
    var h = { value: c }, g = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var p = La(this, o), y = p.on;
      y !== t && (a = (t = y).copy(), a._.cancel.push(h), a._.interrupt.push(h), a._.end.push(g)), p.on = a;
    }), s === 0 && u();
  });
}
var fT = 0;
function ri(t, a, r, o) {
  this._groups = t, this._parents = a, this._name = r, this._id = o;
}
function _1() {
  return ++fT;
}
var ei = Io.prototype;
ri.prototype = {
  constructor: ri,
  select: GC,
  selectAll: IC,
  selectChild: ei.selectChild,
  selectChildren: ei.selectChildren,
  filter: UC,
  merge: kC,
  selection: QC,
  transition: uT,
  call: ei.call,
  nodes: ei.nodes,
  node: ei.node,
  size: ei.size,
  empty: ei.empty,
  each: ei.each,
  on: qC,
  attr: wC,
  attrTween: CC,
  style: WC,
  styleTween: nT,
  text: rT,
  textTween: sT,
  remove: XC,
  tween: pC,
  delay: DC,
  duration: OC,
  ease: LC,
  easeVarying: BC,
  end: cT,
  [Symbol.iterator]: ei[Symbol.iterator]
};
function dT(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var hT = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: dT
};
function mT(t, a) {
  for (var r; !(r = t.__transition) || !(r = r[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function pT(t) {
  var a, r;
  t instanceof ri ? (a = t._id, t = t._name) : (a = _1(), (r = hT).time = Gh(), t = t == null ? null : t + "");
  for (var o = this._groups, s = o.length, u = 0; u < s; ++u)
    for (var c = o[u], h = c.length, g, p = 0; p < h; ++p)
      (g = c[p]) && ac(g, t, a, p, c, r || mT(g, a));
  return new ri(o, this._parents, t, a);
}
Io.prototype.interrupt = dC;
Io.prototype.transition = pT;
const mu = (t) => () => t;
function gT(t, {
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
var ic = new ai(1, 0, 0);
N1.prototype = ai.prototype;
function N1(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return ic;
  return t.__zoom;
}
function Ad(t) {
  t.stopImmediatePropagation();
}
function So(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function yT(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function vT() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Iy() {
  return this.__zoom || ic;
}
function bT(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function xT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ST(t, a, r) {
  var o = t.invertX(a[0][0]) - r[0][0], s = t.invertX(a[1][0]) - r[1][0], u = t.invertY(a[0][1]) - r[0][1], c = t.invertY(a[1][1]) - r[1][1];
  return t.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function R1() {
  var t = yT, a = vT, r = ST, o = bT, s = xT, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, g = zu, p = ec("start", "zoom", "end"), y, m, v, x = 500, S = 150, T = 0, N = 10;
  function R(O) {
    O.property("__zoom", Iy).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", q).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", I).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", W).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(O, $, _, L) {
    var Z = O.selection ? O.selection() : O;
    Z.property("__zoom", Iy), O !== Z ? U(O, $, _, L) : Z.interrupt().each(function() {
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
      return r(ic.translate(A[0], A[1]).scale(ne.k).translate(
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
      var Z = this, G = arguments, ne = H(Z, G).event(L), A = a.apply(Z, G), k = _ == null ? j(A) : typeof _ == "function" ? _.apply(Z, G) : _, F = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), te = Z.__zoom, se = typeof $ == "function" ? $.apply(Z, G) : $, he = g(te.invert(k).concat(F / te.k), se.invert(k).concat(F / se.k));
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
      p.call(
        O,
        this.that,
        new gT(O, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: p
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
    u1(O.view), Ad(O), L.mouse = [G, this.__zoom.invert(G)], Lu(this), L.start();
    function k(te) {
      if (So(te), !L.moved) {
        var se = te.clientX - ne, he = te.clientY - A;
        L.moved = se * se + he * he > T;
      }
      L.event(te).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ha(te, _), L.mouse[1]), L.extent, c));
    }
    function F(te) {
      Z.on("mousemove.zoom mouseup.zoom", null), c1(te.view, L.moved), So(te), L.event(te).end();
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
      for (Ad(O), ne = 0; ne < L; ++ne)
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
      for (Ad(O), v && clearTimeout(v), v = setTimeout(function() {
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
    return arguments.length ? (g = O, R) : g;
  }, R.on = function() {
    var O = p.on.apply(p, arguments);
    return O === p ? R : O;
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
], C1 = ["Enter", " ", "Escape"], T1 = {
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
var yr;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(yr || (yr = {}));
var Ho;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Ho || (Ho = {}));
const M1 = {
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
const Zy = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function D1(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const A1 = (t) => "id" in t && "source" in t && "target" in t, wT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), Qh = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Qo = (t, a = [0, 0]) => {
  const { width: r, height: o } = oi(t), s = t.origin ?? a, u = r * s[0], c = o * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - c
  };
}, ET = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = t.reduce((o, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Qh(s) ? s : a.nodeLookup.get(s.id));
    const h = c ? Iu(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return rc(o, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return lc(r);
}, Fo = (t, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = rc(r, Iu(s)), o = !0);
  }), o ? lc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Fh = (t, a, [r, o, s] = [0, 0, 1], u = !1, c = !1) => {
  const h = {
    ..._l(a, [r, o, s]),
    width: a.width / s,
    height: a.height / s
  }, g = [];
  for (const p of t.values()) {
    const { measured: y, selectable: m = !0, hidden: v = !1 } = p;
    if (c && !m || v)
      continue;
    const x = y.width ?? p.width ?? p.initialWidth ?? null, S = y.height ?? p.height ?? p.initialHeight ?? null, T = Bo(h, bl(p)), N = (x ?? 0) * (S ?? 0), R = u && T > 0;
    (!p.internals.handleBounds || R || T >= N || p.dragging) && g.push(p);
  }
  return g;
}, _T = (t, a) => {
  const r = /* @__PURE__ */ new Set();
  return t.forEach((o) => {
    r.add(o.id);
  }), a.filter((o) => r.has(o.source) || r.has(o.target));
};
function NT(t, a) {
  const r = /* @__PURE__ */ new Map(), o = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!o || o.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function RT({ nodes: t, width: a, height: r, panZoom: o, minZoom: s, maxZoom: u }, c) {
  if (t.size === 0)
    return !0;
  const h = NT(t, c), g = Fo(h), p = Ph(g, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await o.setViewport(p, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function z1({ nodeId: t, nextPosition: a, nodeLookup: r, nodeOrigin: o = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(t), h = c.parentId ? r.get(c.parentId) : void 0, { x: g, y: p } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? o;
  let m = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!h)
      u?.("005", ya.error005());
    else {
      const x = h.measured.width, S = h.measured.height;
      x && S && (m = [
        [g, p],
        [g + x, p + S]
      ]);
    }
  else h && Sr(c.extent) && (m = [
    [c.extent[0][0] + g, c.extent[0][1] + p],
    [c.extent[1][0] + g, c.extent[1][1] + p]
  ]);
  const v = Sr(m) ? xr(a, m, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", ya.error015()), {
    position: {
      x: v.x - g + (c.measured.width ?? 0) * y[0],
      y: v.y - p + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function CT({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: r, edges: o, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && c.find((T) => T.id === v.parentId);
    (x || S) && c.push(v);
  }
  const h = new Set(a.map((v) => v.id)), g = o.filter((v) => v.deletable !== !1), y = _T(c, g);
  for (const v of g)
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
const vl = (t, a = 0, r = 1) => Math.min(Math.max(t, a), r), xr = (t = { x: 0, y: 0 }, a, r) => ({
  x: vl(t.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: vl(t.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function O1(t, a, r) {
  const { width: o, height: s } = oi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return xr(t, [
    [u, c],
    [u + o, c + s]
  ], a);
}
const Qy = (t, a, r) => t < a ? vl(Math.abs(t - a), 1, a) / a : t > r ? -vl(Math.abs(t - r), 1, a) / a : 0, Kh = (t, a, r = 15, o = 40) => {
  const s = Qy(t.x, o, a.width - o) * r, u = Qy(t.y, o, a.height - o) * r;
  return [s, u];
}, rc = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), lh = ({ x: t, y: a, width: r, height: o }) => ({
  x: t,
  y: a,
  x2: t + r,
  y2: a + o
}), lc = ({ x: t, y: a, x2: r, y2: o }) => ({
  x: t,
  y: a,
  width: r - t,
  height: o - a
}), bl = (t, a = [0, 0]) => {
  const { x: r, y: o } = Qh(t) ? t.internals.positionAbsolute : Qo(t, a);
  return {
    x: r,
    y: o,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Iu = (t, a = [0, 0]) => {
  const { x: r, y: o } = Qh(t) ? t.internals.positionAbsolute : Qo(t, a);
  return {
    x: r,
    y: o,
    x2: r + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: o + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, j1 = (t, a) => lc(rc(lh(t), lh(a))), Bo = (t, a) => {
  const r = Math.max(0, Math.min(t.x + t.width, a.x + a.width) - Math.max(t.x, a.x)), o = Math.max(0, Math.min(t.y + t.height, a.y + a.height) - Math.max(t.y, a.y));
  return Math.ceil(r * o);
}, Fy = (t) => pa(t.width) && pa(t.height) && pa(t.x) && pa(t.y), pa = (t) => !isNaN(t) && isFinite(t), L1 = (t, a) => (r, o) => {
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
function al(t, a) {
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
function TT(t, a, r) {
  if (typeof t == "string" || typeof t == "number") {
    const o = al(t, r), s = al(t, a);
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
    const o = al(t.top ?? t.y ?? 0, r), s = al(t.bottom ?? t.y ?? 0, r), u = al(t.left ?? t.x ?? 0, a), c = al(t.right ?? t.x ?? 0, a);
    return { top: o, right: c, bottom: s, left: u, x: u + c, y: o + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function MT(t, a, r, o, s, u) {
  const { x: c, y: h } = xl(t, [a, r, o]), { x: g, y: p } = xl({ x: t.x + t.width, y: t.y + t.height }, [a, r, o]), y = s - g, m = u - p;
  return {
    left: Math.floor(c),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const Ph = (t, a, r, o, s, u) => {
  const c = TT(u, a, r), h = (a - c.x) / t.width, g = (r - c.y) / t.height, p = Math.min(h, g), y = vl(p, o, s), m = t.x + t.width / 2, v = t.y + t.height / 2, x = a / 2 - m * y, S = r / 2 - v * y, T = MT(t, x, S, y, a, r), N = {
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
function Sr(t) {
  return t != null && t !== "parent";
}
function oi(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function H1(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function B1(t, a = { width: 0, height: 0 }, r, o, s) {
  const u = { ...t }, c = o.get(r);
  if (c) {
    const h = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function Ky(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const r of t)
    if (!a.has(r))
      return !1;
  return !0;
}
function DT() {
  let t, a;
  return { promise: new Promise((o, s) => {
    t = o, a = s;
  }), resolve: t, reject: a };
}
function AT(t) {
  return { ...T1, ...t || {} };
}
function To(t, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: o, containerBounds: s }) {
  const { x: u, y: c } = ga(t), h = _l({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, o), { x: g, y: p } = r ? Ko(h, a) : h;
  return {
    xSnapped: g,
    ySnapped: p,
    ...h
  };
}
const Jh = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), U1 = (t) => t?.getRootNode?.() || window?.document, zT = ["INPUT", "SELECT", "TEXTAREA"];
function k1(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : zT.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const V1 = (t) => "clientX" in t, ga = (t, a) => {
  const r = V1(t), o = r ? t.clientX : t.touches?.[0].clientX, s = r ? t.clientY : t.touches?.[0].clientY;
  return {
    x: o - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Py = (t, a, r, o, s) => {
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
      ...Jh(c)
    };
  });
};
function Y1({ sourceX: t, sourceY: a, targetX: r, targetY: o, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: h }) {
  const g = t * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, p = a * 0.125 + u * 0.375 + h * 0.375 + o * 0.125, y = Math.abs(g - t), m = Math.abs(p - a);
  return [g, p, y, m];
}
function pu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function Jy({ pos: t, x1: a, y1: r, x2: o, y2: s, c: u }) {
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
function q1({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: o, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [h, g] = Jy({
    pos: r,
    x1: t,
    y1: a,
    x2: o,
    y2: s,
    c
  }), [p, y] = Jy({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a,
    c
  }), [m, v, x, S] = Y1({
    sourceX: t,
    sourceY: a,
    targetX: o,
    targetY: s,
    sourceControlX: h,
    sourceControlY: g,
    targetControlX: p,
    targetControlY: y
  });
  return [
    `M${t},${a} C${h},${g} ${p},${y} ${o},${s}`,
    m,
    v,
    x,
    S
  ];
}
function $1({ sourceX: t, sourceY: a, targetX: r, targetY: o }) {
  const s = Math.abs(r - t) / 2, u = r < t ? r + s : r - s, c = Math.abs(o - a) / 2, h = o < a ? o + c : o - c;
  return [u, h, s, c];
}
function OT({ sourceNode: t, targetNode: a, selected: r = !1, zIndex: o = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return o;
  const c = s && r ? o + 1e3 : o, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + h;
}
function jT({ sourceNode: t, targetNode: a, width: r, height: o, transform: s }) {
  const u = rc(Iu(t), Iu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: o / s[2]
  };
  return Bo(c, lc(u)) > 0;
}
const LT = ({ source: t, sourceHandle: a, target: r, targetHandle: o }) => `xy-edge__${t}${a || ""}-${r}${o || ""}`, HT = (t, a) => a.some((r) => r.source === t.source && r.target === t.target && (r.sourceHandle === t.sourceHandle || !r.sourceHandle && !t.sourceHandle) && (r.targetHandle === t.targetHandle || !r.targetHandle && !t.targetHandle)), BT = (t, a, r = {}) => {
  if (!t.source || !t.target)
    return r.onError?.("006", ya.error006()), a;
  const o = r.getEdgeId || LT;
  let s;
  return A1(t) ? s = { ...t } : s = {
    ...t,
    id: o(t)
  }, HT(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function X1({ sourceX: t, sourceY: a, targetX: r, targetY: o }) {
  const [s, u, c, h] = $1({
    sourceX: t,
    sourceY: a,
    targetX: r,
    targetY: o
  });
  return [`M ${t},${a}L ${r},${o}`, s, u, c, h];
}
const Wy = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, UT = ({ source: t, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? t.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, ev = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function kT({ source: t, sourcePosition: a = Ae.Bottom, target: r, targetPosition: o = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const h = Wy[a], g = Wy[o], p = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: r.x + g.x * u, y: r.y + g.y * u }, m = UT({
    source: p,
    sourcePosition: a,
    target: y
  }), v = m.x !== 0 ? "x" : "y", x = m[v];
  let S = [], T, N;
  const R = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, j] = $1({
    sourceX: t.x,
    sourceY: t.y,
    targetX: r.x,
    targetY: r.y
  });
  if (h[v] * g[v] === -1) {
    v === "x" ? (T = s.x ?? p.x + (y.x - p.x) * c, N = s.y ?? (p.y + y.y) / 2) : (T = s.x ?? (p.x + y.x) / 2, N = s.y ?? p.y + (y.y - p.y) * c);
    const D = [
      { x: T, y: p.y },
      { x: T, y: y.y }
    ], q = [
      { x: p.x, y: N },
      { x: y.x, y: N }
    ];
    h[v] === x ? S = v === "x" ? D : q : S = v === "x" ? q : D;
  } else {
    const D = [{ x: p.x, y: y.y }], q = [{ x: y.x, y: p.y }];
    if (v === "x" ? S = h.x === x ? q : D : S = h.y === x ? D : q, a === o) {
      const O = Math.abs(t[v] - r[v]);
      if (O <= u) {
        const $ = Math.min(u - 1, u - O);
        h[v] === x ? R[v] = (p[v] > t[v] ? -1 : 1) * $ : z[v] = (y[v] > r[v] ? -1 : 1) * $;
      }
    }
    if (a !== o) {
      const O = v === "x" ? "y" : "x", $ = h[v] === g[O], _ = p[O] > y[O], L = p[O] < y[O];
      (h[v] === 1 && (!$ && _ || $ && L) || h[v] !== 1 && (!$ && L || $ && _)) && (S = v === "x" ? D : q);
    }
    const le = { x: p.x + R.x, y: p.y + R.y }, I = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(le.x - S[0].x), Math.abs(I.x - S[0].x)), W = Math.max(Math.abs(le.y - S[0].y), Math.abs(I.y - S[0].y));
    K >= W ? (T = (le.x + I.x) / 2, N = S[0].y) : (T = S[0].x, N = (le.y + I.y) / 2);
  }
  const U = { x: p.x + R.x, y: p.y + R.y }, H = { x: y.x + z.x, y: y.y + z.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...U.x !== S[0].x || U.y !== S[0].y ? [U] : [],
    ...S,
    ...H.x !== S[S.length - 1].x || H.y !== S[S.length - 1].y ? [H] : [],
    r
  ], T, N, E, j];
}
function VT(t, a, r, o) {
  const s = Math.min(ev(t, a) / 2, ev(a, r) / 2, o), { x: u, y: c } = a;
  if (t.x === u && u === r.x || t.y === c && c === r.y)
    return `L${u} ${c}`;
  if (t.y === c) {
    const p = t.x < r.x ? -1 : 1, y = t.y < r.y ? 1 : -1;
    return `L ${u + s * p},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const h = t.x < r.x ? 1 : -1, g = t.y < r.y ? -1 : 1;
  return `L ${u},${c + s * g}Q ${u},${c} ${u + s * h},${c}`;
}
function oh({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: o, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: h, centerY: g, offset: p = 20, stepPosition: y = 0.5 }) {
  const [m, v, x, S, T] = kT({
    source: { x: t, y: a },
    sourcePosition: r,
    target: { x: o, y: s },
    targetPosition: u,
    center: { x: h, y: g },
    offset: p,
    stepPosition: y
  });
  let N = `M${m[0].x} ${m[0].y}`;
  for (let R = 1; R < m.length - 1; R++)
    N += VT(m[R - 1], m[R], m[R + 1], c);
  return N += `L${m[m.length - 1].x} ${m[m.length - 1].y}`, [N, v, x, S, T];
}
function tv(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function YT(t) {
  const { sourceNode: a, targetNode: r } = t;
  if (!tv(a) || !tv(r))
    return null;
  const o = a.internals.handleBounds || nv(a.handles), s = r.internals.handleBounds || nv(r.handles), u = av(o?.source ?? [], t.sourceHandle), c = av(
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
  const h = u?.position || Ae.Bottom, g = c?.position || Ae.Top, p = wr(a, u, h), y = wr(r, c, g);
  return {
    sourceX: p.x,
    sourceY: p.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: g
  };
}
function nv(t) {
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
function wr(t, a, r = Ae.Left, o = !1) {
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
function av(t, a) {
  return t && (a ? t.find((r) => r.id === a) : t[0]) || null;
}
function sh(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((o) => `${o}=${t[o]}`).join("&")}` : "";
}
function qT(t, { id: a, defaultColor: r, defaultMarkerStart: o, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((c, h) => ([h.markerStart || o, h.markerEnd || s].forEach((g) => {
    if (g && typeof g == "object") {
      const p = sh(g, a);
      u.has(p) || (c.push({ id: p, color: g.color || r, ...g }), u.add(p));
    }
  }), c), []).sort((c, h) => c.id.localeCompare(h.id));
}
const G1 = 1e3, $T = 10, Wh = {
  nodeOrigin: [0, 0],
  nodeExtent: Lo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, XT = {
  ...Wh,
  checkEquality: !0
};
function em(t, a) {
  const r = { ...t };
  for (const o in a)
    a[o] !== void 0 && (r[o] = a[o]);
  return r;
}
function GT(t, a, r) {
  const o = em(Wh, r);
  for (const s of t.values())
    if (s.parentId)
      nm(s, t, a, o);
    else {
      const u = Qo(s, o.nodeOrigin), c = Sr(s.extent) ? s.extent : o.nodeExtent, h = xr(u, c, oi(s));
      s.internals.positionAbsolute = h;
    }
}
function IT(t, a) {
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
function tm(t) {
  return t === "manual";
}
function uh(t, a, r, o = {}) {
  const s = em(XT, o), u = { i: 0 }, c = new Map(a), h = s?.elevateNodesOnSelect && !tm(s.zIndexMode) ? G1 : 0;
  let g = t.length > 0, p = !1;
  a.clear(), r.clear();
  for (const y of t) {
    let m = c.get(y.id);
    if (s.checkEquality && y === m?.internals.userNode)
      a.set(y.id, m);
    else {
      const v = Qo(y, s.nodeOrigin), x = Sr(y.extent) ? y.extent : s.nodeExtent, S = xr(v, x, oi(y));
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
          handleBounds: IT(y, m),
          z: I1(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, m);
    }
    (m.measured === void 0 || m.measured.width === void 0 || m.measured.height === void 0) && !m.hidden && (g = !1), y.parentId && nm(m, a, r, o, u), p ||= y.selected ?? !1;
  }
  return { nodesInitialized: g, hasSelectedNodes: p };
}
function ZT(t, a) {
  if (!t.parentId)
    return;
  const r = a.get(t.parentId);
  r ? r.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function nm(t, a, r, o, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: h, zIndexMode: g } = em(Wh, o), p = t.parentId, y = a.get(p);
  if (!y) {
    console.warn(`Parent node ${p} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  ZT(t, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && g === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * $T), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = u && !tm(g) ? G1 : 0, { x: v, y: x, z: S } = QT(t, y, c, h, m, g), { positionAbsolute: T } = t.internals, N = v !== T.x || x !== T.y;
  (N || S !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: N ? { x: v, y: x } : T,
      z: S
    }
  });
}
function I1(t, a, r) {
  const o = pa(t.zIndex) ? t.zIndex : 0;
  return tm(r) ? o : o + (t.selected ? a : 0);
}
function QT(t, a, r, o, s, u) {
  const { x: c, y: h } = a.internals.positionAbsolute, g = oi(t), p = Qo(t, r), y = Sr(t.extent) ? xr(p, t.extent, g) : p;
  let m = xr({ x: c + y.x, y: h + y.y }, o, g);
  t.extent === "parent" && (m = O1(m, g, a));
  const v = I1(t, s, u), x = a.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: x >= v ? x + 1 : v
  };
}
function am(t, a, r, o = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of t) {
    const h = a.get(c.parentId);
    if (!h)
      continue;
    const g = u.get(c.parentId)?.expandedRect ?? bl(h), p = j1(g, c.rect);
    u.set(c.parentId, { expandedRect: p, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: h }, g) => {
    const p = h.internals.positionAbsolute, y = oi(h), m = h.origin ?? o, v = c.x < p.x ? Math.round(Math.abs(p.x - c.x)) : 0, x = c.y < p.y ? Math.round(Math.abs(p.y - c.y)) : 0, S = Math.max(y.width, Math.round(c.width)), T = Math.max(y.height, Math.round(c.height)), N = (S - y.width) * m[0], R = (T - y.height) * m[1];
    (v > 0 || x > 0 || N || R) && (s.push({
      id: g,
      type: "position",
      position: {
        x: h.position.x - v + N,
        y: h.position.y - x + R
      }
    }), r.get(g)?.forEach((z) => {
      t.some((E) => E.id === z.id) || s.push({
        id: z.id,
        type: "position",
        position: {
          x: z.position.x + v,
          y: z.position.y + x
        }
      });
    })), (y.width < c.width || y.height < c.height || v || x) && s.push({
      id: g,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? m[0] * v - N : 0),
        height: T + (x ? m[1] * x - R : 0)
      }
    });
  }), s;
}
function FT(t, a, r, o, s, u, c) {
  const h = o?.querySelector(".xyflow__viewport");
  let g = !1;
  if (!h)
    return { changes: [], updatedInternals: g };
  const p = [], y = window.getComputedStyle(h), { m22: m } = new window.DOMMatrixReadOnly(y.transform), v = [];
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
      }), g = !0;
      continue;
    }
    const T = Jh(x.nodeElement), N = S.measured.width !== T.width || S.measured.height !== T.height;
    if (!!(T.width && T.height && (N || !S.internals.handleBounds || x.force))) {
      const z = x.nodeElement.getBoundingClientRect(), E = Sr(S.extent) ? S.extent : u;
      let { positionAbsolute: j } = S.internals;
      S.parentId && S.extent === "parent" ? j = O1(j, T, a.get(S.parentId)) : E && (j = xr(j, E, T));
      const U = {
        ...S,
        measured: T,
        internals: {
          ...S.internals,
          positionAbsolute: j,
          handleBounds: {
            source: Py("source", x.nodeElement, z, m, S.id),
            target: Py("target", x.nodeElement, z, m, S.id)
          }
        }
      };
      a.set(S.id, U), S.parentId && nm(U, a, r, { nodeOrigin: s, zIndexMode: c }), g = !0, N && (p.push({
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
    const x = am(v, a, r, s);
    p.push(...x);
  }
  return { changes: p, updatedInternals: g };
}
async function KT({ delta: t, panZoom: a, transform: r, translateExtent: o, width: s, height: u }) {
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
function iv(t, a, r, o, s, u) {
  let c = s;
  const h = o.get(c) || /* @__PURE__ */ new Map();
  o.set(c, h.set(r, a)), c = `${s}-${t}`;
  const g = o.get(c) || /* @__PURE__ */ new Map();
  if (o.set(c, g.set(r, a)), u) {
    c = `${s}-${t}-${u}`;
    const p = o.get(c) || /* @__PURE__ */ new Map();
    o.set(c, p.set(r, a));
  }
}
function Z1(t, a, r) {
  t.clear(), a.clear();
  for (const o of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: h = null } = o, g = { edgeId: o.id, source: s, target: u, sourceHandle: c, targetHandle: h }, p = `${s}-${c}--${u}-${h}`, y = `${u}-${h}--${s}-${c}`;
    iv("source", g, y, t, s, c), iv("target", g, p, t, u, h), a.set(o.id, o);
  }
}
function Q1(t, a) {
  if (!t.parentId)
    return !1;
  const r = a.get(t.parentId);
  return r ? r.selected ? !0 : Q1(r, a) : !1;
}
function rv(t, a, r) {
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
function PT(t, a, r, o) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of t)
    if ((c.selected || c.id === o) && (!c.parentId || !Q1(c, t)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function zd({ nodeId: t, dragItems: a, nodeLookup: r, dragging: o = !0 }) {
  const s = [];
  for (const [c, h] of a) {
    const g = r.get(c)?.internals.userNode;
    g && s.push({
      ...g,
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
function JT({ dragItems: t, snapGrid: a, x: r, y: o }) {
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
function WT({ onNodeMouseDown: t, getStoreItems: a, onDragStart: r, onDrag: o, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, h = /* @__PURE__ */ new Map(), g = !1, p = { x: 0, y: 0 }, y = null, m = !1, v = null, x = !1, S = !1, T = null;
  function N({ noDragClassName: z, handleSelector: E, domNode: j, isSelectable: U, nodeId: H, nodeClickDistance: V = 0 }) {
    v = Vn(j);
    function D({ x: K, y: W }) {
      const { nodeLookup: O, nodeExtent: $, snapGrid: _, snapToGrid: L, nodeOrigin: Z, onNodeDrag: G, onSelectionDrag: ne, onError: A, updateNodePositions: k } = a();
      u = { x: K, y: W };
      let F = !1;
      const te = h.size > 1, se = te && $ ? lh(Fo(h)) : null, he = te && L ? JT({
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
        const { position: Ce, positionAbsolute: we } = z1({
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
        const [me, ee] = zd({
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
        g = !1, cancelAnimationFrame(c);
        return;
      }
      const [_, L] = Kh(p, y, O);
      (_ !== 0 || L !== 0) && (u.x = (u.x ?? 0) - _ / K[2], u.y = (u.y ?? 0) - L / K[2], await W({ x: _, y: L }) && D(u)), c = requestAnimationFrame(q);
    }
    function le(K) {
      const { nodeLookup: W, multiSelectionActive: O, nodesDraggable: $, transform: _, snapGrid: L, snapToGrid: Z, selectNodesOnDrag: G, onNodeDragStart: ne, onSelectionDragStart: A, unselectNodesAndEdges: k } = a();
      m = !0, (!G || !U) && !O && H && (W.get(H)?.selected || k()), U && G && H && t?.(H);
      const F = To(K.sourceEvent, { transform: _, snapGrid: L, snapToGrid: Z, containerBounds: y });
      if (u = F, h = PT(W, $, F, H), h.size > 0 && (r || ne || !H && A)) {
        const [te, se] = zd({
          nodeId: H,
          dragItems: h,
          nodeLookup: W
        });
        r?.(K.sourceEvent, h, te, se), ne?.(K.sourceEvent, te, se), H || A?.(K.sourceEvent, se);
      }
    }
    const I = f1().clickDistance(V).on("start", (K) => {
      const { domNode: W, nodeDragThreshold: O, transform: $, snapGrid: _, snapToGrid: L } = a();
      y = W?.getBoundingClientRect() || null, x = !1, S = !1, T = K.sourceEvent, O === 0 && le(K), u = To(K.sourceEvent, { transform: $, snapGrid: _, snapToGrid: L, containerBounds: y }), p = ga(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: W, transform: O, snapGrid: $, snapToGrid: _, nodeDragThreshold: L, nodeLookup: Z } = a(), G = To(K.sourceEvent, { transform: O, snapGrid: $, snapToGrid: _, containerBounds: y });
      if (T = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      H && !Z.has(H)) && (x = !0), !x) {
        if (!g && W && m && (g = !0, q()), !m) {
          const ne = ga(K.sourceEvent, y), A = ne.x - p.x, k = ne.y - p.y;
          Math.sqrt(A * A + k * k) > L && le(K);
        }
        (u.x !== G.xSnapped || u.y !== G.ySnapped) && h && m && (p = ga(K.sourceEvent, y), D(G));
      }
    }).on("end", (K) => {
      if (!m || x) {
        x && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (g = !1, m = !1, cancelAnimationFrame(c), h.size > 0) {
        const { nodeLookup: W, updateNodePositions: O, onNodeDragStop: $, onSelectionDragStop: _ } = a();
        if (S && (O(h, !1), S = !1), s || $ || !H && _) {
          const [L, Z] = zd({
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
      return !K.button && (!z || !rv(W, `.${z}`, j)) && (!E || rv(W, E, j));
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
function eM(t, a, r) {
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
const tM = 250;
function nM(t, a, r, o) {
  let s = [], u = 1 / 0;
  const c = eM(t, r, a + tM);
  for (const h of c) {
    const g = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const p of g) {
      if (o.nodeId === p.nodeId && o.type === p.type && o.id === p.id)
        continue;
      const { x: y, y: m } = wr(h, p, p.position, !0), v = Math.sqrt(Math.pow(y - t.x, 2) + Math.pow(m - t.y, 2));
      v > a || (v < u ? (s = [{ ...p, x: y, y: m }], u = v) : v === u && s.push({ ...p, x: y, y: m }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const h = o.type === "source" ? "target" : "source";
    return s.find((g) => g.type === h) ?? s[0];
  }
  return s[0];
}
function F1(t, a, r, o, s, u = !1) {
  const c = o.get(t);
  if (!c)
    return null;
  const h = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], g = (r ? h?.find((p) => p.id === r) : h?.[0]) ?? null;
  return g && u ? { ...g, ...wr(c, g, g.position, !0) } : g;
}
function K1(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function aM(t, a) {
  let r = null;
  return a ? r = !0 : t && !a && (r = !1), r;
}
const P1 = () => !0;
function iM(t, { connectionMode: a, connectionRadius: r, handleId: o, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: h, nodeLookup: g, lib: p, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: T, onConnectEnd: N, isValidConnection: R = P1, onReconnectEnd: z, updateConnection: E, getTransform: j, getFromHandle: U, autoPanSpeed: H, dragThreshold: V = 1, handleDomNode: D }) {
  const q = U1(t.target);
  let le = 0, I;
  const { x: K, y: W } = ga(t), O = K1(u, D), $ = h?.getBoundingClientRect();
  let _ = !1;
  if (!$ || !O)
    return;
  const L = F1(s, O, o, g, a);
  if (!L)
    return;
  let Z = ga(t, $), G = !1, ne = null, A = !1, k = null;
  function F() {
    if (!y || !$)
      return;
    const [Ce, we] = Kh(Z, $, H);
    v({ x: Ce, y: we }), le = requestAnimationFrame(F);
  }
  const te = {
    ...L,
    nodeId: s,
    type: O,
    position: L.position
  }, se = g.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: wr(se, te, Ae.Left, !0),
    fromHandle: te,
    fromPosition: te.position,
    fromNode: se,
    to: Z,
    toHandle: null,
    toPosition: Zy[te.position],
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
    Z = ga(Ce, $), I = nM(_l(Z, we, !1, [1, 1]), r, g, te), G || (F(), G = !0);
    const xe = J1(Ce, {
      handle: I,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: o,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: q,
      lib: p,
      flowId: m,
      nodeLookup: g
    });
    k = xe.handleDomNode, ne = xe.connection, A = aM(!!I, xe.isValid);
    const Re = g.get(s), qe = Re ? wr(Re, te, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: qe,
      isValid: A,
      to: xe.toHandle && A ? xl({ x: xe.toHandle.x, y: xe.toHandle.y }, we) : Z,
      toHandle: xe.toHandle,
      toPosition: A && xe.toHandle ? xe.toHandle.position : Zy[te.position],
      toNode: xe.toHandle ? g.get(xe.toHandle.nodeId) : null,
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
function J1(t, { handle: a, connectionMode: r, fromNodeId: o, fromHandleId: s, fromType: u, doc: c, lib: h, flowId: g, isValidConnection: p = P1, nodeLookup: y }) {
  const m = u === "target", v = a ? c.querySelector(`.${h}-flow__handle[data-id="${g}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = ga(t), T = c.elementFromPoint(x, S), N = T?.classList.contains(`${h}-flow__handle`) ? T : v, R = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const z = K1(void 0, N), E = N.getAttribute("data-nodeid"), j = N.getAttribute("data-handleid"), U = N.classList.contains("connectable"), H = N.classList.contains("connectableend");
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
    R.isValid = q && p(V), R.toHandle = F1(E, z, j, y, r, !0);
  }
  return R;
}
const ch = {
  onPointerDown: iM,
  isValid: J1
};
function rM({ domNode: t, panZoom: a, getTransform: r, getViewScale: o }) {
  const s = Vn(t);
  function u({ translateExtent: h, width: g, height: p, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: x = !1 }) {
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
        [g, p]
      ];
      a.setViewportConstrained({
        x: D.x,
        y: D.y,
        zoom: j[2]
      }, q, h);
    }, z = R1().on("start", N).on("zoom", m ? R : null).on("zoom.wheel", v ? S : null);
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
const oc = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Od = ({ x: t, y: a, zoom: r }) => ic.translate(t, a).scale(r), sl = (t, a) => t.target.closest(`.${a}`), W1 = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), lM = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, jd = (t, a = 0, r = lM, o = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || o(), s ? t.transition().duration(a).ease(r).on("end", o) : t;
}, ex = (t) => {
  const a = t.ctrlKey && Uo() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function oM({ zoomPanValues: t, noWheelClassName: a, d3Selection: r, d3Zoom: o, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: h, onPanZoom: g, onPanZoomEnd: p }) {
  return (y) => {
    if (sl(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const N = ha(y), R = ex(y), z = m * Math.pow(2, R);
      o.scaleTo(r, z, N, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === yr.Vertical ? 0 : y.deltaX * v, S = s === yr.Horizontal ? 0 : y.deltaY * v;
    !Uo() && y.shiftKey && s !== yr.Vertical && (x = y.deltaY * v, S = 0), o.translateBy(
      r,
      -(x / m) * u,
      -(S / m) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const T = oc(r.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (g?.(y, T), t.panScrollTimeout = setTimeout(() => {
      p?.(y, T), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, T));
  };
}
function sM({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: r }) {
  return function(o, s) {
    const u = o.type === "wheel", c = !a && u && !o.ctrlKey, h = sl(o, t);
    if (o.ctrlKey && u && h && o.preventDefault(), c || h)
      return null;
    o.preventDefault(), r.call(this, o, s);
  };
}
function uM({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: r }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const s = oc(o.transform);
    t.mouseButton = o.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, o.sourceEvent?.type === "mousedown" && a(!0), r && r?.(o.sourceEvent, s);
  };
}
function cM({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: r, onTransformChange: o, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(r && W1(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || o([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, oc(u.transform));
  };
}
function fM({ zoomPanValues: t, panOnDrag: a, panOnScroll: r, onDraggingChange: o, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && W1(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), t.usedRightMouseButton = !1, o(!1), s)) {
      const h = oc(c.transform);
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
function dM({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: o, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: h, noPanClassName: g, lib: p, connectionInProgress: y }) {
  return (m) => {
    const v = t || a, x = r && m.ctrlKey, S = m.type === "wheel";
    if (m.button === 1 && m.type === "mousedown" && (sl(m, `${p}-flow__node`) || sl(m, `${p}-flow__edge`)))
      return !0;
    if (!o && !v && !s && !u && !r || c || y && !S || sl(m, h) && S || sl(m, g) && (!S || s && S && !t) || !r && m.ctrlKey && S)
      return !1;
    if (!r && m.type === "touchstart" && m.touches?.length > 1)
      return m.preventDefault(), !1;
    if (!v && !s && !x && S || !o && (m.type === "mousedown" || m.type === "touchstart") || Array.isArray(o) && !o.includes(m.button) && m.type === "mousedown")
      return !1;
    const T = Array.isArray(o) && o.includes(m.button) || !m.button || m.button <= 1;
    return (!m.ctrlKey || S) && T;
  };
}
function hM({ domNode: t, minZoom: a, maxZoom: r, translateExtent: o, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: h, onDraggingChange: g }) {
  const p = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), m = R1().scaleExtent([a, r]).translateExtent(o), v = Vn(t).call(m);
  z({
    x: s.x,
    y: s.y,
    zoom: vl(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], o);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  m.wheelDelta(ex);
  async function T(I, K) {
    return v ? new Promise((W) => {
      m?.interpolate(K?.interpolate === "linear" ? Co : zu).transform(jd(v, K?.duration, K?.ease, () => W(!0)), I);
    }) : !1;
  }
  function N({ noWheelClassName: I, noPanClassName: K, onPaneContextMenu: W, userSelectionActive: O, panOnScroll: $, panOnDrag: _, panOnScrollMode: L, panOnScrollSpeed: Z, preventScrolling: G, zoomOnPinch: ne, zoomOnScroll: A, zoomOnDoubleClick: k, zoomActivationKeyPressed: F, lib: te, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: ee }) {
    O && !p.isZoomingOrPanning && R();
    const ge = $ && !F && !O;
    m.clickDistance(ee ? 1 / 0 : !pa(me) || me < 0 ? 0 : me);
    const ze = ge ? oM({
      zoomPanValues: p,
      noWheelClassName: I,
      d3Selection: v,
      d3Zoom: m,
      panOnScrollMode: L,
      panOnScrollSpeed: Z,
      zoomOnPinch: ne,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : sM({
      noWheelClassName: I,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Ce = uM({
      zoomPanValues: p,
      onDraggingChange: g,
      onPanZoomStart: c
    });
    m.on("start", Ce);
    const we = cM({
      zoomPanValues: p,
      panOnDrag: _,
      onPaneContextMenu: !!W,
      onPanZoom: u,
      onTransformChange: se
    });
    m.on("zoom", we);
    const xe = fM({
      zoomPanValues: p,
      panOnDrag: _,
      panOnScroll: $,
      onPaneContextMenu: W,
      onPanZoomEnd: h,
      onDraggingChange: g
    });
    m.on("end", xe);
    const Re = dM({
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
    const O = Od(I), $ = m?.constrain()(O, K, W);
    return $ && await T($), $;
  }
  async function E(I, K) {
    const W = Od(I);
    return await T(W, K), W;
  }
  function j(I) {
    if (v) {
      const K = Od(I), W = v.property("__zoom");
      (W.k !== I.zoom || W.x !== I.x || W.y !== I.y) && m?.transform(v, K, null, { sync: !0 });
    }
  }
  function U() {
    const I = v ? N1(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: I.x, y: I.y, zoom: I.k };
  }
  async function H(I, K) {
    return v ? new Promise((W) => {
      m?.interpolate(K?.interpolate === "linear" ? Co : zu).scaleTo(jd(v, K?.duration, K?.ease, () => W(!0)), I);
    }) : !1;
  }
  async function V(I, K) {
    return v ? new Promise((W) => {
      m?.interpolate(K?.interpolate === "linear" ? Co : zu).scaleBy(jd(v, K?.duration, K?.ease, () => W(!0)), I);
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
function mM({ width: t, prevWidth: a, height: r, prevHeight: o, affectsX: s, affectsY: u }) {
  const c = t - a, h = r - o, g = [c > 0 ? 1 : c < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return c && s && (g[0] = g[0] * -1), h && u && (g[1] = g[1] * -1), g;
}
function lv(t) {
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
function ov(t, a) {
  return t ? !a : a;
}
function pM(t, a, r, o, s, u, c, h) {
  let { affectsX: g, affectsY: p } = a;
  const { isHorizontal: y, isVertical: m } = a, v = y && m, { xSnapped: x, ySnapped: S } = r, { minWidth: T, maxWidth: N, minHeight: R, maxHeight: z } = o, { x: E, y: j, width: U, height: H, aspectRatio: V } = t;
  let D = Math.floor(y ? x - t.pointerX : 0), q = Math.floor(m ? S - t.pointerY : 0);
  const le = U + (g ? -D : D), I = H + (p ? -q : q), K = -u[0] * U, W = -u[1] * H;
  let O = gu(le, T, N), $ = gu(I, R, z);
  if (c) {
    let Z = 0, G = 0;
    g && D < 0 ? Z = Hi(E + D + K, c[0][0]) : !g && D > 0 && (Z = Bi(E + le + K, c[1][0])), p && q < 0 ? G = Hi(j + q + W, c[0][1]) : !p && q > 0 && (G = Bi(j + I + W, c[1][1])), O = Math.max(O, Z), $ = Math.max($, G);
  }
  if (h) {
    let Z = 0, G = 0;
    g && D > 0 ? Z = Bi(E + D, h[0][0]) : !g && D < 0 && (Z = Hi(E + le, h[1][0])), p && q > 0 ? G = Bi(j + q, h[0][1]) : !p && q < 0 && (G = Hi(j + I, h[1][1])), O = Math.max(O, Z), $ = Math.max($, G);
  }
  if (s) {
    if (y) {
      const Z = gu(le / V, R, z) * V;
      if (O = Math.max(O, Z), c) {
        let G = 0;
        !g && !p || g && !p && v ? G = Bi(j + W + le / V, c[1][1]) * V : G = Hi(j + W + (g ? D : -D) / V, c[0][1]) * V, O = Math.max(O, G);
      }
      if (h) {
        let G = 0;
        !g && !p || g && !p && v ? G = Hi(j + le / V, h[1][1]) * V : G = Bi(j + (g ? D : -D) / V, h[0][1]) * V, O = Math.max(O, G);
      }
    }
    if (m) {
      const Z = gu(I * V, T, N) / V;
      if ($ = Math.max($, Z), c) {
        let G = 0;
        !g && !p || p && !g && v ? G = Bi(E + I * V + K, c[1][0]) / V : G = Hi(E + (p ? q : -q) * V + K, c[0][0]) / V, $ = Math.max($, G);
      }
      if (h) {
        let G = 0;
        !g && !p || p && !g && v ? G = Hi(E + I * V, h[1][0]) / V : G = Bi(E + (p ? q : -q) * V, h[0][0]) / V, $ = Math.max($, G);
      }
    }
  }
  q = q + (q < 0 ? $ : -$), D = D + (D < 0 ? O : -O), s && (v ? le > I * V ? q = (ov(g, p) ? -D : D) / V : D = (ov(g, p) ? -q : q) * V : y ? (q = D / V, p = g) : (D = q * V, g = p));
  const _ = g ? E + D : E, L = p ? j + q : j;
  return {
    width: U + (g ? -D : D),
    height: H + (p ? -q : q),
    x: u[0] * D * (g ? -1 : 1) + _,
    y: u[1] * q * (p ? -1 : 1) + L
  };
}
const tx = { width: 0, height: 0, x: 0, y: 0 }, gM = {
  ...tx,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function yM(t, a, r) {
  const o = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, c = t.measured.height ?? 0, h = r[0] * u, g = r[1] * c;
  return [
    [o - h, s - g],
    [o + u - h, s + c - g]
  ];
}
function vM({ domNode: t, nodeId: a, getStoreItems: r, onChange: o, onEnd: s }) {
  const u = Vn(t);
  let c = {
    controlDirection: lv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: p, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: T, shouldResize: N }) {
    let R = { ...tx }, z = { ...gM };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: lv(p)
    };
    let E, j = null, U = [], H, V, D, q = !1;
    const le = f1().on("start", (I) => {
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
      }, H = void 0, V = Sr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (H = K.get(E.parentId)), H && E.extent === "parent" && (V = [
        [0, 0],
        [H.measured.width, H.measured.height]
      ]), U = [], D = void 0;
      for (const [ne, A] of K)
        if (A.parentId === a && (U.push({
          id: ne,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const k = yM(A, E, A.origin ?? _);
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
      const { x: Z, y: G, width: ne, height: A } = R, k = {}, F = E.origin ?? $, { width: te, height: se, x: he, y: me } = pM(z, c.controlDirection, _, c.boundaries, c.keepAspectRatio, F, V, D), ee = te !== ne, ge = se !== A, ze = he !== Z && ee, Ce = me !== G && ge;
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
      const we = mM({
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
  function g() {
    u.on(".drag", null);
  }
  return {
    update: h,
    destroy: g
  };
}
var Ld = { exports: {} }, Hd = {}, Bd = { exports: {} }, Ud = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sv;
function bM() {
  if (sv) return Ud;
  sv = 1;
  var t = Yo();
  function a(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, o = t.useState, s = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function h(m, v) {
    var x = v(), S = o({ inst: { value: x, getSnapshot: v } }), T = S[0].inst, N = S[1];
    return u(
      function() {
        T.value = x, T.getSnapshot = v, g(T) && N({ inst: T });
      },
      [m, x, v]
    ), s(
      function() {
        return g(T) && N({ inst: T }), m(function() {
          g(T) && N({ inst: T });
        });
      },
      [m]
    ), c(x), x;
  }
  function g(m) {
    var v = m.getSnapshot;
    m = m.value;
    try {
      var x = v();
      return !r(m, x);
    } catch {
      return !0;
    }
  }
  function p(m, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : h;
  return Ud.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y, Ud;
}
var uv;
function nx() {
  return uv || (uv = 1, Bd.exports = bM()), Bd.exports;
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
var cv;
function xM() {
  if (cv) return Hd;
  cv = 1;
  var t = Yo(), a = nx();
  function r(p, y) {
    return p === y && (p !== 0 || 1 / p === 1 / y) || p !== p && y !== y;
  }
  var o = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = t.useRef, c = t.useEffect, h = t.useMemo, g = t.useDebugValue;
  return Hd.useSyncExternalStoreWithSelector = function(p, y, m, v, x) {
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
    var N = s(p, S[0], S[1]);
    return c(
      function() {
        T.hasValue = !0, T.value = N;
      },
      [N]
    ), g(N), N;
  }, Hd;
}
var fv;
function SM() {
  return fv || (fv = 1, Ld.exports = xM()), Ld.exports;
}
var wM = SM();
const EM = /* @__PURE__ */ Rh(wM), _M = {}, dv = (t) => {
  let a;
  const r = /* @__PURE__ */ new Set(), o = (y, m) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((S) => S(a, x));
    }
  }, s = () => a, g = { setState: o, getState: s, getInitialState: () => p, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (_M ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, p = a = t(o, s, g);
  return g;
}, NM = (t) => t ? dv(t) : dv, { useDebugValue: RM } = ye, { useSyncExternalStoreWithSelector: CM } = EM, TM = (t) => t;
function ax(t, a = TM, r) {
  const o = CM(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    r
  );
  return RM(o), o;
}
const hv = (t, a) => {
  const r = NM(t), o = (s, u = a) => ax(r, s, u);
  return Object.assign(o, r), o;
}, MM = (t, a) => t ? hv(t, a) : hv;
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
var DM = fb();
const AM = /* @__PURE__ */ Rh(DM), sc = M.createContext(null), zM = sc.Provider, ix = ya.error001("react");
function lt(t, a) {
  const r = M.useContext(sc);
  if (r === null)
    throw new Error(ix);
  return ax(r, t, a);
}
function zt() {
  const t = M.useContext(sc);
  if (t === null)
    throw new Error(ix);
  return M.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const mv = { display: "none" }, OM = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, rx = "react-flow__node-desc", lx = "react-flow__edge-desc", jM = "react-flow__aria-live", LM = (t) => t.ariaLiveMessage, HM = (t) => t.ariaLabelConfig;
function BM({ rfId: t }) {
  const a = lt(LM);
  return w.jsx("div", { id: `${jM}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: OM, children: a });
}
function UM({ rfId: t, disableKeyboardA11y: a }) {
  const r = lt(HM);
  return w.jsxs(w.Fragment, { children: [w.jsx("div", { id: `${rx}-${t}`, style: mv, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), w.jsx("div", { id: `${lx}-${t}`, style: mv, children: r["edge.a11yDescription.default"] }), !a && w.jsx(BM, { rfId: t })] });
}
const uc = M.forwardRef(({ position: t = "top-left", children: a, className: r, style: o, ...s }, u) => {
  const c = `${t}`.split("-");
  return w.jsx("div", { className: Ft(["react-flow__panel", r, ...c]), style: o, ref: u, ...s, children: a });
});
uc.displayName = "Panel";
function kM({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : w.jsx(uc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: w.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const VM = (t) => {
  const a = [], r = [];
  for (const [, o] of t.nodeLookup)
    o.selected && a.push(o.internals.userNode);
  for (const [, o] of t.edgeLookup)
    o.selected && r.push(o);
  return { selectedNodes: a, selectedEdges: r };
}, yu = (t) => t.id;
function YM(t, a) {
  return At(t.selectedNodes.map(yu), a.selectedNodes.map(yu)) && At(t.selectedEdges.map(yu), a.selectedEdges.map(yu));
}
function qM({ onSelectionChange: t }) {
  const a = zt(), { selectedNodes: r, selectedEdges: o } = lt(VM, YM);
  return M.useEffect(() => {
    const s = { nodes: r, edges: o };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, o, t]), null;
}
const $M = (t) => !!t.onSelectionChangeHandlers;
function XM({ onSelectionChange: t }) {
  const a = lt($M);
  return t || a ? w.jsx(qM, { onSelectionChange: t }) : null;
}
const ox = [0, 0], GM = { x: 0, y: 0, zoom: 1 }, IM = [
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
], pv = [...IM, "rfId"], ZM = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), gv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Lo,
  nodeOrigin: ox,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function QM(t) {
  const { setNodes: a, setEdges: r, setMinZoom: o, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: h, setDefaultNodesAndEdges: g } = lt(ZM, At), p = zt();
  M.useEffect(() => (g(t.defaultNodes, t.defaultEdges), () => {
    y.current = gv, h();
  }), []);
  const y = M.useRef(gv);
  return M.useEffect(
    () => {
      for (const m of pv) {
        const v = t[m], x = y.current[m];
        v !== x && (typeof t[m] > "u" || (m === "nodes" ? a(v) : m === "edges" ? r(v) : m === "minZoom" ? o(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? u(v) : m === "nodeExtent" ? c(v) : m === "ariaLabelConfig" ? p.setState({ ariaLabelConfig: AT(v) }) : m === "fitView" ? p.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? p.setState({ fitViewOptions: v }) : p.setState({ [m]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    pv.map((m) => t[m])
  ), null;
}
function yv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function FM(t) {
  const [a, r] = M.useState(t === "system" ? null : t);
  return M.useEffect(() => {
    if (t !== "system") {
      r(t);
      return;
    }
    const o = yv(), s = () => r(o?.matches ? "dark" : "light");
    return s(), o?.addEventListener("change", s), () => {
      o?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : yv()?.matches ? "dark" : "light";
}
const vv = typeof document < "u" ? document : null;
function ko(t = null, a = { target: vv, actInsideInputWithModifier: !0 }) {
  const [r, o] = M.useState(!1), s = M.useRef(!1), u = M.useRef(/* @__PURE__ */ new Set([])), [c, h] = M.useMemo(() => {
    if (t !== null) {
      const p = (Array.isArray(t) ? t : [t]).filter((m) => typeof m == "string").map((m) => m.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = p.reduce((m, v) => m.concat(...v), []);
      return [p, y];
    }
    return [[], []];
  }, [t]);
  return M.useEffect(() => {
    const g = a?.target ?? vv, p = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !p) && k1(x))
          return !1;
        const T = xv(x.code, h);
        if (u.current.add(x[T]), bv(c, u.current, !1)) {
          const N = x.composedPath?.()?.[0] || x.target, R = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && x.preventDefault(), o(!0);
        }
      }, m = (x) => {
        const S = xv(x.code, h);
        bv(c, u.current, !0) ? (o(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), o(!1);
      };
      return g?.addEventListener("keydown", y), g?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        g?.removeEventListener("keydown", y), g?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, o]), r;
}
function bv(t, a, r) {
  return t.filter((o) => r || o.length === a.size).some((o) => o.every((s) => a.has(s)));
}
function xv(t, a) {
  return a.includes(t) ? "code" : "key";
}
const KM = () => {
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
      const { width: o, height: s, minZoom: u, maxZoom: c, panZoom: h } = t.getState(), g = Ph(a, o, s, u, c, r?.padding ?? 0.1);
      return h ? (await h.setViewport(g, {
        duration: r?.duration,
        ease: r?.ease,
        interpolate: r?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, r = {}) => {
      const { transform: o, snapGrid: s, snapToGrid: u, domNode: c } = t.getState();
      if (!c)
        return a;
      const { x: h, y: g } = c.getBoundingClientRect(), p = {
        x: a.x - h,
        y: a.y - g
      }, y = r.snapGrid ?? s, m = r.snapToGrid ?? u;
      return _l(p, o, m, y);
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
function sx(t, a) {
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
    for (const g of c)
      PM(g, h);
    r.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function PM(t, a) {
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
function JM(t, a) {
  return sx(t, a);
}
function WM(t, a) {
  return sx(t, a);
}
function hr(t, a) {
  return {
    id: t,
    type: "select",
    selected: a
  };
}
function ul(t, a = /* @__PURE__ */ new Set(), r = !1) {
  const o = [];
  for (const [s, u] of t) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), o.push(hr(u.id, c)));
  }
  return o;
}
function Sv({ items: t = [], lookup: a }) {
  const r = [], o = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const c = a.get(u.id), h = c?.internals?.userNode ?? c;
    h !== void 0 && h !== u && r.push({ id: u.id, item: u, type: "replace" }), h === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    o.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function wv(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const eD = L1();
function tD(t, a, r = {}) {
  return BT(t, a, {
    ...r,
    onError: r.onError ?? eD
  });
}
const Ev = (t) => wT(t), nD = (t) => A1(t);
function ux(t) {
  return M.forwardRef(t);
}
const aD = typeof window < "u" ? M.useLayoutEffect : M.useEffect;
function _v(t) {
  const [a, r] = M.useState(BigInt(0)), [o] = M.useState(() => iD(() => r((s) => s + BigInt(1))));
  return aD(() => {
    const s = o.get();
    s.length && (t(s), o.reset());
  }, [a]), o;
}
function iD(t) {
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
const cx = M.createContext(null);
function rD({ children: t }) {
  const a = zt(), r = M.useCallback((h) => {
    const { nodes: g = [], setNodes: p, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let T = g;
    for (const R of h)
      T = typeof R == "function" ? R(T) : R;
    let N = Sv({
      items: T,
      lookup: v
    });
    for (const R of S.values())
      N = R(N);
    y && p(T), N.length > 0 ? m?.(N) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: z, setNodes: E } = a.getState();
      R && E(z);
    });
  }, []), o = _v(r), s = M.useCallback((h) => {
    const { edges: g = [], setEdges: p, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = a.getState();
    let x = g;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? p(x) : m && m(Sv({
      items: x,
      lookup: v
    }));
  }, []), u = _v(s), c = M.useMemo(() => ({ nodeQueue: o, edgeQueue: u }), []);
  return w.jsx(cx.Provider, { value: c, children: t });
}
function lD() {
  const t = M.useContext(cx);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const oD = (t) => !!t.panZoom;
function im() {
  const t = KM(), a = zt(), r = lD(), o = lt(oD), s = M.useMemo(() => {
    const u = (m) => a.getState().nodeLookup.get(m), c = (m) => {
      r.nodeQueue.push(m);
    }, h = (m) => {
      r.edgeQueue.push(m);
    }, g = (m) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = Ev(m) ? m : v.get(m.id), T = S.parentId ? B1(S.position, S.measured, S.parentId, v, x) : S.position, N = {
        ...S,
        position: T,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return bl(N);
    }, p = (m, v, x = { replace: !1 }) => {
      c((S) => S.map((T) => {
        if (T.id === m) {
          const N = typeof v == "function" ? v(T) : v;
          return x.replace && Ev(N) ? N : { ...T, ...N };
        }
        return T;
      }));
    }, y = (m, v, x = { replace: !1 }) => {
      h((S) => S.map((T) => {
        if (T.id === m) {
          const N = typeof v == "function" ? v(T) : v;
          return x.replace && nD(N) ? N : { ...T, ...N };
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
        const { nodes: x, edges: S, onNodesDelete: T, onEdgesDelete: N, triggerNodeChanges: R, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: j } = a.getState(), { nodes: U, edges: H } = await CT({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: j
        }), V = H.length > 0, D = U.length > 0;
        if (V) {
          const q = H.map(wv);
          N?.(H), z(q);
        }
        if (D) {
          const q = U.map(wv);
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
        const S = Fy(m), T = S ? m : g(m), N = x !== void 0;
        return T ? (x || a.getState().nodes).filter((R) => {
          const z = a.getState().nodeLookup.get(R.id);
          if (z && !S && (R.id === m.id || !z.internals.positionAbsolute))
            return !1;
          const E = bl(N ? R : z), j = Bo(E, T);
          return v && j > 0 || j >= E.width * E.height || j >= T.width * T.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, x = !0) => {
        const T = Fy(m) ? m : g(m);
        if (!T)
          return !1;
        const N = Bo(T, v);
        return x && N > 0 || N >= v.width * v.height || N >= T.width * T.height;
      },
      updateNode: p,
      updateNodeData: (m, v, x = { replace: !1 }) => {
        p(m, (S) => {
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
        return ET(m, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = a.getState().fitViewResolver ?? DT();
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
const Nv = (t) => t.selected, sD = typeof window < "u" ? window : void 0;
function uD({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: o } = im(), s = ko(t, { actInsideInputWithModifier: !1 }), u = ko(a, { target: sD });
  M.useEffect(() => {
    if (s) {
      const { edges: c, nodes: h } = r.getState();
      o({ nodes: h.filter(Nv), edges: c.filter(Nv) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), M.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function cD(t) {
  const a = zt();
  M.useEffect(() => {
    const r = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Jh(t.current);
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
const cc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, fD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function dD({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: o = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = yr.Free, zoomOnDoubleClick: c = !0, panOnDrag: h = !0, defaultViewport: g, translateExtent: p, minZoom: y, maxZoom: m, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: T, noPanClassName: N, onViewportChange: R, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: j }) {
  const U = zt(), H = M.useRef(null), { userSelectionActive: V, lib: D, connectionInProgress: q } = lt(fD, At), le = ko(v), I = M.useRef();
  cD(H);
  const K = M.useCallback((W) => {
    R?.({ x: W[0], y: W[1], zoom: W[2] }), z || U.setState({ transform: W });
  }, [R, z]);
  return M.useEffect(() => {
    if (H.current) {
      I.current = hM({
        domNode: H.current,
        minZoom: y,
        maxZoom: m,
        translateExtent: p,
        viewport: g,
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
  ]), w.jsx("div", { className: "react-flow__renderer", ref: H, style: cc, children: S });
}
const hD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function mD() {
  const { userSelectionActive: t, userSelectionRect: a } = lt(hD, At);
  return t && a ? w.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const kd = (t, a) => (r) => {
  r.target === a.current && t?.(r);
}, pD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  connectionInProgress: t.connection.inProgress,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function gD({ isSelecting: t, selectionKeyPressed: a, selectionMode: r = Ho.Full, panOnDrag: o, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: h, onSelectionEnd: g, onPaneClick: p, onPaneContextMenu: y, onPaneScroll: m, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: T }) {
  const N = M.useRef(0), R = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: j, connectionInProgress: U, panBy: H, autoPanSpeed: V } = lt(pD, At), D = E && (t || z), q = M.useRef(null), le = M.useRef(), I = M.useRef(/* @__PURE__ */ new Set()), K = M.useRef(/* @__PURE__ */ new Set()), W = M.useRef(!1), O = M.useRef({ x: 0, y: 0 }), $ = M.useRef(!1), _ = (ee) => {
    if (W.current || U) {
      W.current = !1;
      return;
    }
    p?.(ee), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
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
    I.current = new Set(Fh(we, wt, Ce, r === Ho.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Fe = Te?.selectable ?? !0;
    for (const gt of I.current) {
      const yt = Re.get(gt);
      if (yt)
        for (const { edgeId: Xt } of yt.values()) {
          const Lt = xe.get(Xt);
          Lt && (Lt.selectable ?? Fe) && K.current.add(Xt);
        }
    }
    if (!Ky(Je, I.current)) {
      const gt = ul(we, I.current, !0);
      qe(gt);
    }
    if (!Ky(Qe, K.current)) {
      const gt = ul(xe, K.current);
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
    const [ee, ge] = Kh(O.current, le.current, V);
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
    }), W.current && (g?.(ee), R.setState({
      nodesSelectionActive: I.current.size > 0
    })), F());
  }, he = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), F();
  }, me = o === !0 || Array.isArray(o) && o.includes(0);
  return w.jsxs("div", { className: Ft(["react-flow__pane", { draggable: me, dragging: j, selection: t }]), onClick: D ? void 0 : kd(_, q), onContextMenu: kd(L, q), onWheel: kd(Z, q), onPointerEnter: D ? void 0 : v, onPointerMove: D ? te : x, onPointerUp: D ? se : void 0, onPointerCancel: D ? he : void 0, onPointerDownCapture: D ? ne : void 0, onClickCapture: D ? G : void 0, onPointerLeave: S, ref: q, style: cc, children: [T, w.jsx(mD, {})] });
}
function fh({ id: t, store: a, unselect: r = !1, nodeRef: o }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: h, onError: g } = a.getState(), p = h.get(t);
  if (!p) {
    g?.("012", ya.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), p.selected ? (r || p.selected && c) && (u({ nodes: [p], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : s([t]);
}
function fx({ nodeRef: t, disabled: a = !1, noDragClassName: r, handleSelector: o, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const h = zt(), [g, p] = M.useState(!1), y = M.useRef();
  return M.useEffect(() => {
    y.current = WT({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (m) => {
        fh({
          id: m,
          store: h,
          nodeRef: t
        });
      },
      onDragStart: () => {
        p(!0);
      },
      onDragStop: () => {
        p(!1);
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
  }, [r, o, a, u, t, s, c]), g;
}
const yD = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function dx() {
  const t = zt();
  return M.useCallback((r) => {
    const { nodeExtent: o, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: h, updateNodePositions: g, nodeLookup: p, nodeOrigin: y } = t.getState(), m = /* @__PURE__ */ new Map(), v = yD(c), x = s ? u[0] : 5, S = s ? u[1] : 5, T = r.direction.x * x * r.factor, N = r.direction.y * S * r.factor;
    for (const [, R] of p) {
      if (!v(R))
        continue;
      let z = {
        x: R.internals.positionAbsolute.x + T,
        y: R.internals.positionAbsolute.y + N
      };
      s && (z = Ko(z, u));
      const { position: E, positionAbsolute: j } = z1({
        nodeId: R.id,
        nextPosition: z,
        nodeLookup: p,
        nodeExtent: o,
        nodeOrigin: y,
        onError: h
      });
      R.position = E, R.internals.positionAbsolute = j, m.set(R.id, R);
    }
    g(m);
  }, []);
}
const rm = M.createContext(null), vD = rm.Provider;
rm.Consumer;
const hx = () => M.useContext(rm), bD = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), xD = (t, a, r) => (o) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = o, { fromHandle: h, toHandle: g, isValid: p } = c, y = g?.nodeId === t && g?.id === a && g?.type === r;
  return {
    connectingFrom: h?.nodeId === t && h?.id === a && h?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === t && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === yl.Strict ? h?.type !== r : t !== h?.nodeId || a !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && p
  };
};
function SD({ type: t = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: o = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: h, children: g, className: p, onMouseDown: y, onTouchStart: m, ...v }, x) {
  const S = c || null, T = t === "target", N = zt(), R = hx(), { connectOnClick: z, noPanClassName: E, rfId: j } = lt(bD, At), { connectingFrom: U, connectingTo: H, clickConnecting: V, isPossibleEndHandle: D, connectionInProcess: q, clickConnectionInProcess: le, valid: I } = lt(xD(R, S, t), At);
  R || N.getState().onError?.("010", ya.error010());
  const K = ($) => {
    const { defaultEdgeOptions: _, onConnect: L, hasDefaultEdges: Z } = N.getState(), G = {
      ..._,
      ...$
    };
    if (Z) {
      const { edges: ne, setEdges: A, onError: k } = N.getState();
      A(tD(G, ne, { onError: k }));
    }
    L?.(G), h?.(G);
  }, W = ($) => {
    if (!R)
      return;
    const _ = V1($.nativeEvent);
    if (s && (_ && $.button === 0 || !_)) {
      const L = N.getState();
      ch.onPointerDown($.nativeEvent, {
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
    const se = U1($.target), he = r || ne, { connection: me, isValid: ee } = ch.isValid($.nativeEvent, {
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
    p,
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
  ]), onMouseDown: W, onTouchStart: W, onClick: z ? O : void 0, ref: x, ...v, children: g });
}
const wl = M.memo(ux(SD));
function wD({ data: t, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return w.jsxs(w.Fragment, { children: [t?.label, w.jsx(wl, { type: "source", position: r, isConnectable: a })] });
}
function ED({ data: t, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: o = Ae.Bottom }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(wl, { type: "target", position: r, isConnectable: a }), t?.label, w.jsx(wl, { type: "source", position: o, isConnectable: a })] });
}
function _D() {
  return null;
}
function ND({ data: t, isConnectable: a, targetPosition: r = Ae.Top }) {
  return w.jsxs(w.Fragment, { children: [w.jsx(wl, { type: "target", position: r, isConnectable: a }), t?.label] });
}
const Zu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Rv = {
  input: wD,
  default: ED,
  output: ND,
  group: _D
};
function RD(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const CD = (t) => {
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
function TD({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: r }) {
  const o = zt(), { width: s, height: u, transformString: c, userSelectionActive: h } = lt(CD, At), g = dx(), p = M.useRef(null);
  M.useEffect(() => {
    r || p.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !h && s !== null && u !== null;
  if (fx({
    nodeRef: p,
    disabled: !y
  }), !y)
    return null;
  const m = t ? (x) => {
    const S = o.getState().nodes.filter((T) => T.selected);
    t(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Zu, x.key) && (x.preventDefault(), g({
      direction: Zu[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return w.jsx("div", { className: Ft(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: w.jsx("div", { ref: p, className: "react-flow__nodesselection-rect", onContextMenu: m, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const Cv = typeof window < "u" ? window : void 0, MD = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function mx({ children: t, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: h, deleteKeyCode: g, selectionKeyCode: p, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: T, zoomActivationKeyCode: N, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: j, panOnScrollSpeed: U, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: D, autoPanOnSelection: q, defaultViewport: le, translateExtent: I, minZoom: K, maxZoom: W, preventScrolling: O, onSelectionContextMenu: $, noWheelClassName: _, noPanClassName: L, disableKeyboardA11y: Z, onViewportChange: G, isControlledViewport: ne }) {
  const { nodesSelectionActive: A, userSelectionActive: k } = lt(MD, At), F = ko(p, { target: Cv }), te = ko(T, { target: Cv }), se = te || D, he = te || j, me = y && se !== !0, ee = F || k || me;
  return uD({ deleteKeyCode: g, multiSelectionKeyCode: S }), w.jsx(dD, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: U, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: !F && se, defaultViewport: le, translateExtent: I, minZoom: K, maxZoom: W, zoomActivationKeyCode: N, preventScrolling: O, noWheelClassName: _, noPanClassName: L, onViewportChange: G, isControlledViewport: ne, paneClickDistance: h, selectionOnDrag: me, children: w.jsxs(gD, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: o, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: q, isSelecting: !!ee, selectionMode: m, selectionKeyPressed: F, paneClickDistance: h, selectionOnDrag: me, children: [t, A && w.jsx(TD, { onSelectionContextMenu: $, noPanClassName: L, disableKeyboardA11y: Z })] }) });
}
mx.displayName = "FlowRenderer";
const DD = M.memo(mx), AD = (t) => (a) => t ? Fh(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function zD(t) {
  return lt(M.useCallback(AD(t), [t]), At);
}
const OD = (t) => t.updateNodeInternals;
function jD() {
  const t = lt(OD), [a] = M.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
function LD({ node: t, nodeType: a, hasDimensions: r, resizeObserver: o }) {
  const s = zt(), u = M.useRef(null), c = M.useRef(null), h = M.useRef(t.sourcePosition), g = M.useRef(t.targetPosition), p = M.useRef(a), y = r && !!t.internals.handleBounds;
  return M.useEffect(() => {
    u.current && !t.hidden && (!y || c.current !== u.current) && (c.current && o?.unobserve(c.current), o?.observe(u.current), c.current = u.current);
  }, [y, t.hidden]), M.useEffect(() => () => {
    c.current && (o?.unobserve(c.current), c.current = null);
  }, []), M.useEffect(() => {
    if (u.current) {
      const m = p.current !== a, v = h.current !== t.sourcePosition, x = g.current !== t.targetPosition;
      (m || v || x) && (p.current = a, h.current = t.sourcePosition, g.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, a, t.sourcePosition, t.targetPosition]), u;
}
function HD({ id: t, onClick: a, onMouseEnter: r, onMouseMove: o, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: h, elementsSelectable: g, nodesConnectable: p, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: T, nodeTypes: N, nodeClickDistance: R, onError: z }) {
  const { node: E, internals: j, isParent: U } = lt((ee) => {
    const ge = ee.nodeLookup.get(t), ze = ee.parentLookup.has(t);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let H = E.type || "default", V = N?.[H] || Rv[H];
  V === void 0 && (z?.("003", ya.error003(H)), H = "default", V = N?.default || Rv.default);
  const D = !!(E.draggable || h && typeof E.draggable > "u"), q = !!(E.selectable || g && typeof E.selectable > "u"), le = !!(E.connectable || p && typeof E.connectable > "u"), I = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), W = H1(E), O = LD({ node: E, nodeType: H, hasDimensions: W, resizeObserver: m }), $ = fx({
    nodeRef: O,
    disabled: E.hidden || !D,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: t,
    isSelectable: q,
    nodeClickDistance: R
  }), _ = dx();
  if (E.hidden)
    return null;
  const L = oi(E), Z = RD(E), G = q || D || a || r || o || s, ne = r ? (ee) => r(ee, { ...j.userNode }) : void 0, A = o ? (ee) => o(ee, { ...j.userNode }) : void 0, k = s ? (ee) => s(ee, { ...j.userNode }) : void 0, F = u ? (ee) => u(ee, { ...j.userNode }) : void 0, te = c ? (ee) => c(ee, { ...j.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    q && (!ge || !D || ze > 0) && fh({
      id: t,
      store: K,
      nodeRef: O
    }), a && a(ee, { ...j.userNode });
  }, he = (ee) => {
    if (!(k1(ee.nativeEvent) || S)) {
      if (C1.includes(ee.key) && q) {
        const ge = ee.key === "Escape";
        fh({
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
    Fh(/* @__PURE__ */ new Map([[t, E]]), { x: 0, y: 0, width: ge, height: ze }, ee, !0).length > 0 || we(E.position.x + L.width / 2, E.position.y + L.height / 2, {
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
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: ne, onMouseMove: A, onMouseLeave: k, onContextMenu: F, onClick: se, onDoubleClick: te, onKeyDown: I ? he : void 0, tabIndex: I ? 0 : void 0, onFocus: I ? me : void 0, role: E.ariaRole ?? (I ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${rx}-${T}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: w.jsx(vD, { value: t, children: w.jsx(V, { id: t, data: E.data, type: H, positionAbsoluteX: j.positionAbsolute.x, positionAbsoluteY: j.positionAbsolute.y, selected: E.selected ?? !1, selectable: q, draggable: D, deletable: E.deletable ?? !0, isConnectable: le, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: $, dragHandle: E.dragHandle, zIndex: j.z, parentId: E.parentId, ...L }) }) });
}
var BD = M.memo(HD);
const UD = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function px(t) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: o, elementsSelectable: s, onError: u } = lt(UD, At), c = zD(t.onlyRenderVisibleElements), h = jD();
  return w.jsx("div", { className: "react-flow__nodes", style: cc, children: c.map((g) => (
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
    w.jsx(BD, { id: g, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: r, nodesFocusable: o, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, g)
  )) });
}
px.displayName = "NodeRenderer";
const kD = M.memo(px);
function VD(t) {
  return lt(M.useCallback((r) => {
    if (!t)
      return r.edges.map((s) => s.id);
    const o = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && jT({
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
const YD = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return w.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, qD = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return w.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Tv = {
  [Gu.Arrow]: YD,
  [Gu.ArrowClosed]: qD
};
function $D(t) {
  const a = zt();
  return M.useMemo(() => Object.prototype.hasOwnProperty.call(Tv, t) ? Tv[t] : (a.getState().onError?.("009", ya.error009(t)), null), [t]);
}
const XD = ({ id: t, type: a, color: r, width: o = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: h = "auto-start-reverse" }) => {
  const g = $D(a);
  return g ? w.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${o}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: w.jsx(g, { color: r, strokeWidth: c }) }) : null;
}, gx = ({ defaultColor: t, rfId: a }) => {
  const r = lt((u) => u.edges), o = lt((u) => u.defaultEdgeOptions), s = M.useMemo(() => qT(r, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [r, o, a, t]);
  return s.length ? w.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: w.jsx("defs", { children: s.map((u) => w.jsx(XD, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
gx.displayName = "MarkerDefinitions";
var GD = M.memo(gx);
function yx({ x: t, y: a, label: r, labelStyle: o, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: h = 2, children: g, className: p, ...y }) {
  const [m, v] = M.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Ft(["react-flow__edge-textwrapper", p]), S = M.useRef(null);
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
  }, [r]), r ? w.jsxs("g", { transform: `translate(${t - m.width / 2} ${a - m.height / 2})`, className: x, visibility: m.width ? "visible" : "hidden", ...y, children: [s && w.jsx("rect", { width: m.width + 2 * c[0], x: -c[0], y: -c[1], height: m.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), w.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: S, style: o, children: r }), g] }) : null;
}
yx.displayName = "EdgeText";
const ID = M.memo(yx);
function fc({ path: t, labelX: a, labelY: r, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: g, interactionWidth: p = 20, ...y }) {
  return w.jsxs(w.Fragment, { children: [w.jsx("path", { ...y, d: t, fill: "none", className: Ft(["react-flow__edge-path", y.className]) }), p ? w.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: p, className: "react-flow__edge-interaction" }) : null, o && pa(a) && pa(r) ? w.jsx(ID, { x: a, y: r, label: o, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: g }) : null] });
}
function Mv({ pos: t, x1: a, y1: r, x2: o, y2: s }) {
  return t === Ae.Left || t === Ae.Right ? [0.5 * (a + o), r] : [a, 0.5 * (r + s)];
}
function vx({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: o, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, h] = Mv({
    pos: r,
    x1: t,
    y1: a,
    x2: o,
    y2: s
  }), [g, p] = Mv({
    pos: u,
    x1: o,
    y1: s,
    x2: t,
    y2: a
  }), [y, m, v, x] = Y1({
    sourceX: t,
    sourceY: a,
    targetX: o,
    targetY: s,
    sourceControlX: c,
    sourceControlY: h,
    targetControlX: g,
    targetControlY: p
  });
  return [
    `M${t},${a} C${c},${h} ${g},${p} ${o},${s}`,
    y,
    m,
    v,
    x
  ];
}
function bx(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, sourcePosition: c, targetPosition: h, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, interactionWidth: R }) => {
    const [z, E, j] = vx({
      sourceX: r,
      sourceY: o,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), U = t.isInternal ? void 0 : a;
    return w.jsx(fc, { id: U, path: z, labelX: E, labelY: j, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, interactionWidth: R });
  });
}
const ZD = bx({ isInternal: !1 }), xx = bx({ isInternal: !0 });
ZD.displayName = "SimpleBezierEdge";
xx.displayName = "SimpleBezierEdgeInternal";
function Sx(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: x = Ae.Bottom, targetPosition: S = Ae.Top, markerEnd: T, markerStart: N, pathOptions: R, interactionWidth: z }) => {
    const [E, j, U] = oh({
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
    return w.jsx(fc, { id: H, path: E, labelX: j, labelY: U, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: T, markerStart: N, interactionWidth: z });
  });
}
const wx = Sx({ isInternal: !1 }), Ex = Sx({ isInternal: !0 });
wx.displayName = "SmoothStepEdge";
Ex.displayName = "SmoothStepEdgeInternal";
function _x(t) {
  return M.memo(({ id: a, ...r }) => {
    const o = t.isInternal ? void 0 : a;
    return w.jsx(wx, { ...r, id: o, pathOptions: M.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const QD = _x({ isInternal: !1 }), Nx = _x({ isInternal: !0 });
QD.displayName = "StepEdge";
Nx.displayName = "StepEdgeInternal";
function Rx(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: T }) => {
    const [N, R, z] = X1({ sourceX: r, sourceY: o, targetX: s, targetY: u }), E = t.isInternal ? void 0 : a;
    return w.jsx(fc, { id: E, path: N, labelX: R, labelY: z, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: T });
  });
}
const FD = Rx({ isInternal: !1 }), Cx = Rx({ isInternal: !0 });
FD.displayName = "StraightEdge";
Cx.displayName = "StraightEdgeInternal";
function Tx(t) {
  return M.memo(({ id: a, sourceX: r, sourceY: o, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: h = Ae.Top, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, pathOptions: R, interactionWidth: z }) => {
    const [E, j, U] = q1({
      sourceX: r,
      sourceY: o,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: R?.curvature
    }), H = t.isInternal ? void 0 : a;
    return w.jsx(fc, { id: H, path: E, labelX: j, labelY: U, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: T, markerStart: N, interactionWidth: z });
  });
}
const KD = Tx({ isInternal: !1 }), Mx = Tx({ isInternal: !0 });
KD.displayName = "BezierEdge";
Mx.displayName = "BezierEdgeInternal";
const Dv = {
  default: Mx,
  straight: Cx,
  step: Nx,
  smoothstep: Ex,
  simplebezier: xx
}, Av = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, PD = (t, a, r) => r === Ae.Left ? t - a : r === Ae.Right ? t + a : t, JD = (t, a, r) => r === Ae.Top ? t - a : r === Ae.Bottom ? t + a : t, zv = "react-flow__edgeupdater";
function Ov({ position: t, centerX: a, centerY: r, radius: o = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: h }) {
  return w.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Ft([zv, `${zv}-${h}`]), cx: PD(a, o, t), cy: JD(r, o, t), r: o, stroke: "transparent", fill: "transparent" });
}
function WD({ isReconnectable: t, reconnectRadius: a, edge: r, sourceX: o, sourceY: s, targetX: u, targetY: c, sourcePosition: h, targetPosition: g, onReconnect: p, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: x }) {
  const S = zt(), T = (j, U) => {
    if (j.button !== 0)
      return;
    const { autoPanOnConnect: H, domNode: V, connectionMode: D, connectionRadius: q, lib: le, onConnectStart: I, cancelConnection: K, nodeLookup: W, rfId: O, panBy: $, updateConnection: _ } = S.getState(), L = U.type === "target", Z = (A, k) => {
      v(!1), m?.(A, r, U.type, k);
    }, G = (A) => p?.(r, A), ne = (A, k) => {
      v(!0), y?.(j, r, U.type), I?.(A, k);
    };
    ch.onPointerDown(j.nativeEvent, {
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
  return w.jsxs(w.Fragment, { children: [(t === !0 || t === "source") && w.jsx(Ov, { position: h, centerX: o, centerY: s, radius: a, onMouseDown: N, onMouseEnter: z, onMouseOut: E, type: "source" }), (t === !0 || t === "target") && w.jsx(Ov, { position: g, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function eA({ id: t, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: o, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: h, onMouseMove: g, onMouseLeave: p, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: T, noPanClassName: N, onError: R, disableKeyboardA11y: z }) {
  let E = lt((we) => we.edgeLookup.get(t));
  const j = lt((we) => we.defaultEdgeOptions);
  E = j ? { ...j, ...E } : E;
  let U = E.type || "default", H = T?.[U] || Dv[U];
  H === void 0 && (R?.("011", ya.error011(U)), U = "default", H = T?.default || Dv.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), D = typeof m < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), q = !!(E.selectable || o && typeof E.selectable > "u"), le = M.useRef(null), [I, K] = M.useState(!1), [W, O] = M.useState(!1), $ = zt(), { zIndex: _, sourceX: L, sourceY: Z, targetX: G, targetY: ne, sourcePosition: A, targetPosition: k } = lt(M.useCallback((we) => {
    const xe = we.nodeLookup.get(E.source), Re = we.nodeLookup.get(E.target);
    if (!xe || !Re)
      return {
        zIndex: E.zIndex,
        ...Av
      };
    const qe = YT({
      id: t,
      sourceNode: xe,
      targetNode: Re,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: we.connectionMode,
      onError: R
    });
    return {
      zIndex: OT({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Re,
        elevateOnSelect: we.elevateEdgesOnSelect,
        zIndexMode: we.zIndexMode
      }),
      ...qe || Av
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), F = M.useMemo(() => E.markerStart ? `url('#${sh(E.markerStart, S)}')` : void 0, [E.markerStart, S]), te = M.useMemo(() => E.markerEnd ? `url('#${sh(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
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
  } : void 0, ge = g ? (we) => {
    g(we, { ...E });
  } : void 0, ze = p ? (we) => {
    p(we, { ...E });
  } : void 0, Ce = (we) => {
    if (!z && C1.includes(we.key) && q) {
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
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: ee, onMouseMove: ge, onMouseLeave: ze, onKeyDown: V ? Ce : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${lx}-${S}` : void 0, ref: le, ...E.domAttributes, children: [!W && w.jsx(H, { id: t, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: q, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: Z, targetX: G, targetY: ne, sourcePosition: A, targetPosition: k, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: F, markerEnd: te, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), D && w.jsx(WD, { edge: E, isReconnectable: D, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, sourceX: L, sourceY: Z, targetX: G, targetY: ne, sourcePosition: A, targetPosition: k, setUpdateHover: K, setReconnecting: O })] }) });
}
var tA = M.memo(eA);
const nA = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Dx({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: r, edgeTypes: o, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: h, onEdgeMouseMove: g, onEdgeMouseLeave: p, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: T }) {
  const { edgesFocusable: N, edgesReconnectable: R, elementsSelectable: z, onError: E } = lt(nA, At), j = VD(a);
  return w.jsxs("div", { className: "react-flow__edges", children: [w.jsx(GD, { defaultColor: t, rfId: r }), j.map((U) => w.jsx(tA, { id: U, edgesFocusable: N, edgesReconnectable: R, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: h, onMouseMove: g, onMouseLeave: p, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: r, onError: E, edgeTypes: o, disableKeyboardA11y: T }, U))] });
}
Dx.displayName = "EdgeRenderer";
const aA = M.memo(Dx), iA = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function rA({ children: t }) {
  const a = lt(iA);
  return w.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function lA(t) {
  const a = im(), r = M.useRef(!1);
  M.useEffect(() => {
    !r.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), r.current = !0);
  }, [t, a.viewportInitialized]);
}
const oA = (t) => t.panZoom?.syncViewport;
function sA(t) {
  const a = lt(oA), r = zt();
  return M.useEffect(() => {
    t && (a?.(t), r.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function uA(t) {
  return t.connection.inProgress ? { ...t.connection, to: _l(t.connection.to, t.transform) } : { ...t.connection };
}
function cA(t) {
  return uA;
}
function fA(t) {
  const a = cA();
  return lt(a, At);
}
const dA = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function hA({ containerStyle: t, style: a, type: r, component: o }) {
  const { nodesConnectable: s, width: u, height: c, isValid: h, inProgress: g } = lt(dA, At);
  return !(u && s && g) ? null : w.jsx("svg", { style: t, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: w.jsx("g", { className: Ft(["react-flow__connection", D1(h)]), children: w.jsx(Ax, { style: a, type: r, CustomComponent: o, isValid: h }) }) });
}
const Ax = ({ style: t, type: a = Yi.Bezier, CustomComponent: r, isValid: o }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: h, fromPosition: g, to: p, toNode: y, toHandle: m, toPosition: v, pointer: x } = fA();
  if (!s)
    return;
  if (r)
    return w.jsx(r, { connectionLineType: a, connectionLineStyle: t, fromNode: c, fromHandle: h, fromX: u.x, fromY: u.y, toX: p.x, toY: p.y, fromPosition: g, toPosition: v, connectionStatus: D1(o), toNode: y, toHandle: m, pointer: x });
  let S = "";
  const T = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: g,
    targetX: p.x,
    targetY: p.y,
    targetPosition: v
  };
  switch (a) {
    case Yi.Bezier:
      [S] = q1(T);
      break;
    case Yi.SimpleBezier:
      [S] = vx(T);
      break;
    case Yi.Step:
      [S] = oh({
        ...T,
        borderRadius: 0
      });
      break;
    case Yi.SmoothStep:
      [S] = oh(T);
      break;
    default:
      [S] = X1(T);
  }
  return w.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: t });
};
Ax.displayName = "ConnectionLine";
const mA = {};
function jv(t = mA) {
  M.useRef(t), zt(), M.useEffect(() => {
  }, [t]);
}
function pA() {
  zt(), M.useRef(!1), M.useEffect(() => {
  }, []);
}
function zx({ nodeTypes: t, edgeTypes: a, onInit: r, onNodeClick: o, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: p, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: T, connectionLineComponent: N, connectionLineContainerStyle: R, selectionKeyCode: z, selectionOnDrag: E, selectionMode: j, multiSelectionKeyCode: U, panActivationKeyCode: H, zoomActivationKeyCode: V, deleteKeyCode: D, onlyRenderVisibleElements: q, elementsSelectable: le, defaultViewport: I, translateExtent: K, minZoom: W, maxZoom: O, preventScrolling: $, defaultMarkerColor: _, zoomOnScroll: L, zoomOnPinch: Z, panOnScroll: G, panOnScrollSpeed: ne, panOnScrollMode: A, zoomOnDoubleClick: k, panOnDrag: F, autoPanOnSelection: te, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Ce, nodeClickDistance: we, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: qe, onEdgeMouseLeave: ft, reconnectRadius: Te, onReconnect: Ie, onReconnectStart: Be, onReconnectEnd: $e, noDragClassName: wt, noWheelClassName: Je, noPanClassName: Qe, disableKeyboardA11y: Fe, nodeExtent: gt, rfId: yt, viewport: Xt, onViewportChange: Lt }) {
  return jv(t), jv(a), pA(), lA(r), sA(Xt), w.jsx(DD, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Ce, deleteKeyCode: D, selectionKeyCode: z, selectionOnDrag: E, selectionMode: j, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: U, panActivationKeyCode: H, zoomActivationKeyCode: V, elementsSelectable: le, zoomOnScroll: L, zoomOnPinch: Z, zoomOnDoubleClick: k, panOnScroll: G, panOnScrollSpeed: ne, panOnScrollMode: A, panOnDrag: F, autoPanOnSelection: te, defaultViewport: I, translateExtent: K, minZoom: W, maxZoom: O, onSelectionContextMenu: m, preventScrolling: $, noDragClassName: wt, noWheelClassName: Je, noPanClassName: Qe, disableKeyboardA11y: Fe, onViewportChange: Lt, isControlledViewport: !!Xt, children: w.jsxs(rA, { children: [w.jsx(aA, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Ie, onReconnectStart: Be, onReconnectEnd: $e, onlyRenderVisibleElements: q, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: qe, onEdgeMouseLeave: ft, reconnectRadius: Te, defaultMarkerColor: _, noPanClassName: Qe, disableKeyboardA11y: Fe, rfId: yt }), w.jsx(hA, { style: T, type: S, component: N, containerStyle: R }), w.jsx("div", { className: "react-flow__edgelabel-renderer" }), w.jsx(kD, { nodeTypes: t, onNodeClick: o, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: p, onNodeContextMenu: y, nodeClickDistance: we, onlyRenderVisibleElements: q, noPanClassName: Qe, noDragClassName: wt, disableKeyboardA11y: Fe, nodeExtent: gt, rfId: yt }), w.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
zx.displayName = "GraphView";
const gA = M.memo(zx), yA = L1(), Lv = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: o, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: g = 0.5, maxZoom: p = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), R = o ?? a ?? [], z = r ?? t ?? [], E = y ?? [0, 0], j = m ?? Lo;
  Z1(T, N, R);
  const { nodesInitialized: U } = uh(z, x, S, {
    nodeOrigin: E,
    nodeExtent: j,
    zIndexMode: v
  });
  let H = [0, 0, 1];
  if (c && s && u) {
    const V = Fo(x, {
      filter: (I) => !!((I.width || I.initialWidth) && (I.height || I.initialHeight))
    }), { x: D, y: q, zoom: le } = Ph(V, s, u, g, p, h?.padding ?? 0.1);
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
    minZoom: g,
    maxZoom: p,
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
    connection: { ...M1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: yA,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: T1,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, vA = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: o, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: g, maxZoom: p, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => MM((x, S) => {
  async function T() {
    const { nodeLookup: N, panZoom: R, fitViewOptions: z, fitViewResolver: E, width: j, height: U, minZoom: H, maxZoom: V } = S();
    R && (await RT({
      nodes: N,
      width: j,
      height: U,
      panZoom: R,
      minZoom: H,
      maxZoom: V
    }, z), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...Lv({
      nodes: t,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: h,
      minZoom: g,
      maxZoom: p,
      nodeOrigin: y,
      nodeExtent: m,
      defaultNodes: r,
      defaultEdges: o,
      zIndexMode: v
    }),
    setNodes: (N) => {
      const { nodeLookup: R, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: j, fitViewQueued: U, zIndexMode: H, nodesSelectionActive: V } = S(), { nodesInitialized: D, hasSelectedNodes: q } = uh(N, R, z, {
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
      Z1(R, z, N), x({ edges: N });
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
      const { triggerNodeChanges: R, nodeLookup: z, parentLookup: E, domNode: j, nodeOrigin: U, nodeExtent: H, debug: V, fitViewQueued: D, zIndexMode: q } = S(), { changes: le, updatedInternals: I } = FT(N, z, E, j, U, H, q);
      I && (GT(z, E, { nodeOrigin: U, nodeExtent: H, zIndexMode: q }), D ? (T(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), le?.length > 0 && (V && console.log("React Flow: trigger node changes", le), R?.(le)));
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
          const O = wr(I, H.fromHandle, Ae.Left, !0);
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
        const { parentLookup: q, nodeOrigin: le } = S(), I = am(z, j, q, le);
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
          const H = JM(N, E);
          z(H);
        }
        U && console.log("React Flow: trigger node changes", N), R?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: R, setEdges: z, edges: E, hasDefaultEdges: j, debug: U } = S();
      if (N?.length) {
        if (j) {
          const H = WM(N, E);
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
      j(ul(E, /* @__PURE__ */ new Set([...N]), !0)), U(ul(z));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: j, triggerEdgeChanges: U } = S();
      if (R) {
        const H = N.map((V) => hr(V, !0));
        U(H);
        return;
      }
      U(ul(z, /* @__PURE__ */ new Set([...N]))), j(ul(E, /* @__PURE__ */ new Set(), !0));
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
      N[0][0] === H[0][0] && N[0][1] === H[0][1] && N[1][0] === H[1][0] && N[1][1] === H[1][1] || (uh(R, z, E, {
        nodeOrigin: j,
        nodeExtent: N,
        elevateNodesOnSelect: U,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: R, width: z, height: E, panZoom: j, translateExtent: U } = S();
      return KT({ delta: N, panZoom: j, transform: R, translateExtent: U, width: z, height: E });
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
        connection: { ...M1 }
      });
    },
    updateConnection: (N) => {
      x({ connection: N });
    },
    reset: () => x({ ...Lv() })
  };
}, Object.is);
function Ox({ initialNodes: t, initialEdges: a, defaultNodes: r, defaultEdges: o, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: h, initialFitViewOptions: g, fitView: p, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: x }) {
  const [S] = M.useState(() => vA({
    nodes: t,
    edges: a,
    defaultNodes: r,
    defaultEdges: o,
    width: s,
    height: u,
    fitView: p,
    minZoom: c,
    maxZoom: h,
    fitViewOptions: g,
    nodeOrigin: y,
    nodeExtent: m,
    zIndexMode: v
  }));
  return w.jsx(zM, { value: S, children: w.jsx(rD, { children: x }) });
}
function bA({ children: t, nodes: a, edges: r, defaultNodes: o, defaultEdges: s, width: u, height: c, fitView: h, fitViewOptions: g, minZoom: p, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x }) {
  return M.useContext(sc) ? w.jsx(w.Fragment, { children: t }) : w.jsx(Ox, { initialNodes: a, initialEdges: r, defaultNodes: o, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: h, initialFitViewOptions: g, initialMinZoom: p, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x, children: t });
}
const xA = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function SA({ nodes: t, edges: a, defaultNodes: r, defaultEdges: o, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: h, onEdgeClick: g, onInit: p, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: T, onClickConnectStart: N, onClickConnectEnd: R, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: j, onNodeContextMenu: U, onNodeDoubleClick: H, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: q, onNodesDelete: le, onEdgesDelete: I, onDelete: K, onSelectionChange: W, onSelectionDragStart: O, onSelectionDrag: $, onSelectionDragStop: _, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: G, onBeforeDelete: ne, connectionMode: A, connectionLineType: k = Yi.Bezier, connectionLineStyle: F, connectionLineComponent: te, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ee = !1, selectionMode: ge = Ho.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Ce = Uo() ? "Meta" : "Control", zoomActivationKeyCode: we = Uo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Re, onlyRenderVisibleElements: qe = !1, selectNodesOnDrag: ft, nodesDraggable: Te, autoPanOnNodeFocus: Ie, nodesConnectable: Be, nodesFocusable: $e, nodeOrigin: wt = ox, edgesFocusable: Je, edgesReconnectable: Qe, elementsSelectable: Fe = !0, defaultViewport: gt = GM, minZoom: yt = 0.5, maxZoom: Xt = 2, translateExtent: Lt = Lo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: qn = "#b1b1b7", zoomOnScroll: yn = !0, zoomOnPinch: tn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: kt = yr.Free, zoomOnDoubleClick: si = !0, panOnDrag: Sa = !0, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Mn, onPaneMouseLeave: $n, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Pt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: B, onEdgeMouseMove: Q, onEdgeMouseLeave: J, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: Se = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: De, connectOnClick: ke, attributionPosition: je, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Rt = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: wa = !0, autoPanSpeed: Dn, connectionRadius: cn, isValidConnection: nn, onError: bn, style: ui, id: xn, nodeDragThreshold: ci, connectionDragThreshold: oa, viewport: sa, onViewportChange: Ue, width: bt, height: pn, colorMode: An = "light", debug: fi, onScroll: Ha, ariaLabelConfig: dt, zIndexMode: Xn = "basic", ...an }, Ii) {
  const _r = xn || "1", Nl = FM(An), di = M.useCallback((Rl) => {
    Rl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ha?.(Rl);
  }, [Ha]);
  return w.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: di, style: { ...ui, ...xA }, ref: Ii, className: Ft(["react-flow", s, Nl]), id: xn, role: "application", children: w.jsxs(bA, { nodes: t, edges: a, width: bt, height: pn, fitView: Me, fitViewOptions: De, minZoom: yt, maxZoom: Xt, nodeOrigin: wt, nodeExtent: ot, zIndexMode: Xn, children: [w.jsx(QM, { nodes: t, edges: a, defaultNodes: r, defaultEdges: o, onConnect: x, onConnectStart: S, onConnectEnd: T, onClickConnectStart: N, onClickConnectEnd: R, nodesDraggable: Te, autoPanOnNodeFocus: Ie, nodesConnectable: Be, nodesFocusable: $e, edgesFocusable: Je, edgesReconnectable: Qe, elementsSelectable: Fe, elevateNodesOnSelect: Rt, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: Xt, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Re, connectionMode: A, translateExtent: Lt, connectOnClick: ke, defaultEdgeOptions: rt, fitView: Me, fitViewOptions: De, onNodesDelete: le, onEdgesDelete: I, onDelete: K, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: q, onSelectionDrag: $, onSelectionDragStart: O, onSelectionDragStop: _, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: be, nodeOrigin: wt, rfId: _r, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: Dn, onError: bn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: ci, connectionDragThreshold: oa, onBeforeDelete: ne, debug: fi, ariaLabelConfig: dt, zIndexMode: Xn }), w.jsx(gA, { onInit: p, onNodeClick: h, onEdgeClick: g, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: j, onNodeContextMenu: U, onNodeDoubleClick: H, nodeTypes: u, edgeTypes: c, connectionLineType: k, connectionLineStyle: F, connectionLineComponent: te, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: ee, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Ce, panActivationKeyCode: ze, zoomActivationKeyCode: we, onlyRenderVisibleElements: qe, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: Xt, preventScrolling: mt, zoomOnScroll: yn, zoomOnPinch: tn, zoomOnDoubleClick: si, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: kt, panOnDrag: Sa, autoPanOnSelection: wa, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Mn, onPaneMouseLeave: $n, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: G, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Pt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: B, onEdgeMouseMove: Q, onEdgeMouseLeave: J, reconnectRadius: de, defaultMarkerColor: qn, noDragClassName: ve, noWheelClassName: Se, noPanClassName: be, rfId: _r, disableKeyboardA11y: We, nodeExtent: ot, viewport: sa, onViewportChange: Ue }), w.jsx(XM, { onSelectionChange: W }), Vt, w.jsx(kM, { proOptions: Ge, position: je }), w.jsx(UM, { rfId: _r, disableKeyboardA11y: We })] }) });
}
var wA = ux(SA);
function EA({ dimensions: t, lineWidth: a, variant: r, className: o }) {
  return w.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Ft(["react-flow__background-pattern", r, o]) });
}
function _A({ radius: t, className: a }) {
  return w.jsx("circle", { cx: t, cy: t, r: t, className: Ft(["react-flow__background-pattern", "dots", a]) });
}
var Oa;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(Oa || (Oa = {}));
const NA = {
  [Oa.Dots]: 1,
  [Oa.Lines]: 1,
  [Oa.Cross]: 6
}, RA = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function jx({
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
  style: g,
  className: p,
  patternClassName: y
}) {
  const m = M.useRef(null), { transform: v, patternId: x } = lt(RA, At), S = o || NA[a], T = a === Oa.Dots, N = a === Oa.Cross, R = Array.isArray(r) ? r : [r, r], z = [R[0] * v[2] || 1, R[1] * v[2] || 1], E = S * v[2], j = Array.isArray(u) ? u : [u, u], U = N ? [E, E] : z, H = [
    j[0] * v[2] || 1 + U[0] / 2,
    j[1] * v[2] || 1 + U[1] / 2
  ], V = `${x}${t || ""}`;
  return w.jsxs("svg", { className: Ft(["react-flow__background", p]), style: {
    ...g,
    ...cc,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": c
  }, ref: m, "data-testid": "rf__background", children: [w.jsx("pattern", { id: V, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${H[0]},-${H[1]})`, children: T ? w.jsx(_A, { radius: E / 2, className: y }) : w.jsx(EA, { dimensions: U, lineWidth: s, variant: a, className: y }) }), w.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
jx.displayName = "Background";
const Hv = M.memo(jx);
function CA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: w.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function TA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: w.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function MA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: w.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function DA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function AA() {
  return w.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: w.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function vu({ children: t, className: a, ...r }) {
  return w.jsx("button", { type: "button", className: Ft(["react-flow__controls-button", a]), ...r, children: t });
}
const zA = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function Lx({ style: t, showZoom: a = !0, showFitView: r = !0, showInteractive: o = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: h, onInteractiveChange: g, className: p, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = zt(), { isInteractive: T, minZoomReached: N, maxZoomReached: R, ariaLabelConfig: z } = lt(zA, At), { zoomIn: E, zoomOut: j, fitView: U } = im(), H = () => {
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
    }), g?.(!T);
  }, le = v === "horizontal" ? "horizontal" : "vertical";
  return w.jsxs(uc, { className: Ft(["react-flow__controls", le, p]), position: m, style: t, "data-testid": "rf__controls", "aria-label": x ?? z["controls.ariaLabel"], children: [a && w.jsxs(w.Fragment, { children: [w.jsx(vu, { onClick: H, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: R, children: w.jsx(CA, {}) }), w.jsx(vu, { onClick: V, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: N, children: w.jsx(TA, {}) })] }), r && w.jsx(vu, { className: "react-flow__controls-fitview", onClick: D, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: w.jsx(MA, {}) }), o && w.jsx(vu, { className: "react-flow__controls-interactive", onClick: q, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: T ? w.jsx(AA, {}) : w.jsx(DA, {}) }), y] });
}
Lx.displayName = "Controls";
const OA = M.memo(Lx);
function jA({ id: t, x: a, y: r, width: o, height: s, style: u, color: c, strokeColor: h, strokeWidth: g, className: p, borderRadius: y, shapeRendering: m, selected: v, onClick: x }) {
  const { background: S, backgroundColor: T } = u || {}, N = c || S || T;
  return w.jsx("rect", { className: Ft(["react-flow__minimap-node", { selected: v }, p]), x: a, y: r, rx: y, ry: y, width: o, height: s, style: {
    fill: N,
    stroke: h,
    strokeWidth: g
  }, shapeRendering: m, onClick: x ? (R) => x(R, t) : void 0 });
}
const LA = M.memo(jA), HA = (t) => t.nodes.map((a) => a.id), Vd = (t) => t instanceof Function ? t : () => t;
function BA({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = LA,
  onClick: c
}) {
  const h = lt(HA, At), g = Vd(a), p = Vd(t), y = Vd(r), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return w.jsx(w.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    w.jsx(kA, { id: v, nodeColorFunc: g, nodeStrokeColorFunc: p, nodeClassNameFunc: y, nodeBorderRadius: o, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: m }, v)
  )) });
}
function UA({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: o, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: h, onClick: g }) {
  const { node: p, x: y, y: m, width: v, height: x } = lt((S) => {
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
  return !p || p.hidden || !H1(p) ? null : w.jsx(h, { x: y, y: m, width: v, height: x, style: p.style, selected: !!p.selected, className: o(p), color: a(p), borderRadius: s, strokeColor: r(p), strokeWidth: u, shapeRendering: c, onClick: g, id: p.id });
}
const kA = M.memo(UA);
var VA = M.memo(BA);
const YA = 200, qA = 150, $A = (t) => !t.hidden, XA = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? j1(Fo(t.nodeLookup, { filter: $A }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, GA = "react-flow__minimap-desc";
function Hx({
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
  bgColor: g,
  maskColor: p,
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
  const U = zt(), H = M.useRef(null), { boundingRect: V, viewBB: D, rfId: q, panZoom: le, translateExtent: I, flowWidth: K, flowHeight: W, ariaLabelConfig: O } = lt(XA, At), $ = t?.width ?? YA, _ = t?.height ?? qA, L = V.width / $, Z = V.height / _, G = Math.max(L, Z), ne = G * $, A = G * _, k = j * G, F = V.x - (ne - V.width) / 2 - k, te = V.y - (A - V.height) / 2 - k, se = ne + k * 2, he = A + k * 2, me = `${GA}-${q}`, ee = M.useRef(0), ge = M.useRef();
  ee.current = G, M.useEffect(() => {
    if (H.current && le)
      return ge.current = rM({
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
  return w.jsx(uc, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * G : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Ft(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: w.jsxs("svg", { width: $, height: _, viewBox: `${F} ${te} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: H, onClick: ze, children: [we && w.jsx("title", { id: me, children: we }), w.jsx(VA, { onClick: Ce, nodeColor: o, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: h }), w.jsx("path", { className: "react-flow__minimap-mask", d: `M${F - k},${te - k}h${se + k * 2}v${he + k * 2}h${-se - k * 2}z
        M${D.x},${D.y}h${D.width}v${D.height}h${-D.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Hx.displayName = "MiniMap";
const IA = M.memo(Hx), ZA = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, QA = {
  [Sl.Line]: "right",
  [Sl.Handle]: "bottom-right"
};
function FA({ nodeId: t, position: a, variant: r = Sl.Handle, className: o, style: s = void 0, children: u, color: c, minWidth: h = 10, minHeight: g = 10, maxWidth: p = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: T, onResize: N, onResizeEnd: R }) {
  const z = hx(), E = typeof t == "string" ? t : z, j = zt(), U = M.useRef(null), H = r === Sl.Handle, V = lt(M.useCallback(ZA(H && x), [H, x]), At), D = M.useRef(null), q = a ?? QA[r];
  M.useEffect(() => {
    if (!(!U.current || !E))
      return D.current || (D.current = vM({
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
                ...B1({
                  x: I.x ?? G.position.x,
                  y: I.y ?? G.position.y
                }, { width: A, height: k }, G.parentId, O, ne)
              }
            }, te = am([F], O, $, _);
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
          minHeight: g,
          maxWidth: p,
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
    g,
    p,
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
M.memo(FA);
var KA = "_1bllf8b0", PA = "_1bllf8b1";
const Bv = 16, JA = "rgba(186, 158, 255, 0.14)", WA = "rgba(186, 158, 255, 0.06)", e3 = "rgba(0, 0, 0, 0.6)", t3 = "#1d2023", n3 = "#ba9eff";
function a3({
  nodes: t,
  edges: a,
  nodeTypes: r,
  showMiniMap: o = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: h,
  children: g,
  onNodeClick: p
}) {
  const y = [KA, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsx("div", { className: y, "aria-label": h ?? "node graph", children: /* @__PURE__ */ w.jsxs(
    wA,
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
      onNodeClick: (m, v) => p?.(v),
      children: [
        /* @__PURE__ */ w.jsx(
          Hv,
          {
            id: "minor",
            variant: Oa.Dots,
            gap: Bv,
            size: 1.1,
            color: JA
          }
        ),
        /* @__PURE__ */ w.jsx(
          Hv,
          {
            id: "major",
            variant: Oa.Lines,
            gap: Bv * 5,
            lineWidth: 1,
            color: WA
          }
        ),
        s && /* @__PURE__ */ w.jsx(OA, { showInteractive: !1 }),
        o && /* @__PURE__ */ w.jsx(
          IA,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: e3,
            nodeColor: () => t3,
            nodeStrokeColor: () => n3,
            className: PA
          }
        ),
        g
      ]
    }
  ) });
}
function i3(t) {
  return /* @__PURE__ */ w.jsx(Ox, { children: /* @__PURE__ */ w.jsx(a3, { ...t }) });
}
var r3 = "a9gtw0", l3 = "a9gtw1", o3 = "a9gtw2", s3 = "a9gtw3";
function ti({
  title: t,
  description: a,
  actions: r,
  children: o,
  className: s
}) {
  const u = [r3, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("section", { className: u, children: [
    (t || r) && /* @__PURE__ */ w.jsxs("header", { className: l3, children: [
      t && /* @__PURE__ */ w.jsx("span", { className: o3, children: t }),
      a && /* @__PURE__ */ w.jsx("span", { className: s3, children: a }),
      r
    ] }),
    o
  ] });
}
const lm = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function om() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function dh() {
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
    stageStates: om()
  };
}
function u3(t, a) {
  return {
    ...dh(),
    phase: "running",
    jobId: t,
    stageStates: {
      ...om(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function c3(t, a) {
  switch (a.method) {
    case "svi2.video.progress":
      return { ...t, overallFraction: d3(a.params.fraction) };
    case "svi2.video.clip.started":
      return {
        ...t,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...t.stageStates, qwen_edit: h3(t, "qwen_edit"), diffusion: "active" }
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
        stageStates: m3(t.stageStates)
      };
    default:
      return t;
  }
}
function f3(t) {
  return { ...t, phase: "cancelled", stageStates: om() };
}
function d3(t) {
  return Number.isNaN(t) ? 0 : Math.min(1, Math.max(0, t));
}
function h3(t, a) {
  return t.stageStates[a] === "active" ? "done" : t.stageStates[a];
}
function m3(t) {
  const a = { ...t };
  for (const r of lm)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const p3 = [
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
], Bx = [
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
function g3(t) {
  return Bx.filter((a) => a.tier === t);
}
function y3() {
  const t = {};
  for (const a of Bx)
    a.default !== void 0 && (t[a.key] = a.default);
  return t;
}
function v3(t) {
  return {
    ...y3(),
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
function Uv(t, a) {
  return {
    ...t,
    ...a.params,
    ref_image_path: t.ref_image_path,
    last_image_path: t.last_image_path ?? null,
    prompts: t.prompts
  };
}
const Vo = "svi-canonical", b3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), x3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), S3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function w3(t) {
  const a = t.frames_per_clip, r = t.num_clips, o = t.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - o);
}
function E3(t) {
  const a = t.params, r = a.width ?? 480, o = a.height ?? 832, s = `${r}×${o}`, u = w3(a), c = (a.interpolate_fps && a.interpolate_fps > 0, a.fps);
  let h = "—";
  u !== null && c && (h = `${(u / c).toFixed(1)}s`);
  const g = b3.has(t.id), p = a.blocks_to_swap ?? 0, y = p >= 40 ? "~10–11 GiB (16 GB)" : p > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: h,
    vram: y,
    isLowVram: g,
    isOffDistribution: x3.has(t.id),
    requiresLastImage: S3.has(t.id)
  };
}
function _3(t) {
  return [...t].sort((a, r) => a.id === Vo ? -1 : r.id === Vo ? 1 : 0);
}
async function N3(t) {
  return El("/render/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function R3(t) {
  return El(`/render/jobs/${t}/cancel`, { method: "POST", body: "{}" });
}
function C3(t, a, r) {
  return H2(`/render/jobs/${t}/events`, a);
}
const Ux = M.createContext(null);
function T3({
  initialSettings: t = Qb,
  initialPreset: a = null,
  children: r
}) {
  const [o, s] = M.useState(t), [u, c] = M.useState(
    a?.id ?? Vo
  ), [h, g] = M.useState(() => {
    const W = v3(t);
    return a ? Uv(W, a) : W;
  }), [p, y] = M.useState(null), [m, v] = M.useState(null), [x, S] = M.useState({
    enabled: !1,
    prompt: ""
  }), [T, N] = M.useState(dh), R = M.useRef(null), z = M.useCallback((W) => {
    c(W.id), g((O) => Uv(O, W));
  }, []), E = M.useCallback(
    (W, O) => {
      g(($) => ({ ...$, [W]: O }));
    },
    []
  ), j = M.useCallback((W) => {
    g((O) => ({ ...O, prompts: W }));
  }, []), U = M.useCallback((W, O) => {
    y(W), g(($) => ({ ...$, ref_image_path: O }));
  }, []), H = M.useCallback((W, O) => {
    v(W), g(($) => ({ ...$, last_image_path: O }));
  }, []), V = M.useCallback((W) => {
    S((O) => ({ ...O, ...W }));
  }, []), D = M.useCallback((W) => {
    s(W);
  }, []), q = M.useCallback(() => {
    R.current?.(), R.current = null, N(dh());
  }, []), le = M.useCallback(async () => {
    R.current?.();
    const { jobId: W } = await N3({ presetId: u, params: h });
    N(u3(W, x.enabled)), R.current = C3(W, (O) => {
      N(($) => c3($, O));
    });
  }, [h, u, x.enabled]), I = M.useCallback(async () => {
    const W = T.jobId;
    W && (await R3(W), R.current?.(), R.current = null, N((O) => f3(O)));
  }, [T.jobId]), K = M.useMemo(
    () => ({
      settings: o,
      presetId: u,
      params: h,
      refImageName: p,
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
      p,
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
  return /* @__PURE__ */ w.jsx(Ux.Provider, { value: K, children: r });
}
function Gi() {
  const t = M.useContext(Ux);
  if (!t)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return t;
}
function M3(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
}
const D3 = (t) => {
  switch (t) {
    case "success":
      return O3;
    case "info":
      return L3;
    case "warning":
      return j3;
    case "error":
      return H3;
    default:
      return null;
  }
}, A3 = Array(12).fill(0), z3 = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, A3.map((r, o) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${o}`
})))), O3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), j3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), L3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), H3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), B3 = /* @__PURE__ */ ye.createElement("svg", {
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
})), U3 = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), t;
};
let hh = 1;
class k3 {
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
      const { message: o, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : hh++, c = this.toasts.find((g) => g.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), c ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({
        ...g,
        ...a,
        id: u,
        title: o
      }), {
        ...g,
        ...a,
        id: u,
        dismissible: h,
        title: o
      }) : g) : this.addToast({
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
      const h = s.then(async (p) => {
        if (c = [
          "resolve",
          p
        ], ye.isValidElement(p))
          u = !1, this.create({
            id: o,
            type: "default",
            message: p
          });
        else if (Y3(p) && !p.ok) {
          u = !1;
          const m = typeof r.error == "function" ? await r.error(`HTTP error! status: ${p.status}`) : r.error, v = typeof r.description == "function" ? await r.description(`HTTP error! status: ${p.status}`) : r.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "error",
            description: v,
            ...S
          });
        } else if (p instanceof Error) {
          u = !1;
          const m = typeof r.error == "function" ? await r.error(p) : r.error, v = typeof r.description == "function" ? await r.description(p) : r.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
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
          const m = typeof r.success == "function" ? await r.success(p) : r.success, v = typeof r.description == "function" ? await r.description(p) : r.description, S = typeof m == "object" && !ye.isValidElement(m) ? m : {
            message: m
          };
          this.create({
            id: o,
            type: "success",
            description: v,
            ...S
          });
        }
      }).catch(async (p) => {
        if (c = [
          "reject",
          p
        ], r.error !== void 0) {
          u = !1;
          const y = typeof r.error == "function" ? await r.error(p) : r.error, m = typeof r.description == "function" ? await r.description(p) : r.description, x = typeof y == "object" && !ye.isValidElement(y) ? y : {
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
      }), g = () => new Promise((p, y) => h.then(() => c[0] === "reject" ? y(c[1]) : p(c[1])).catch(y));
      return typeof o != "string" && typeof o != "number" ? {
        unwrap: g
      } : Object.assign(o, {
        unwrap: g
      });
    }, this.custom = (a, r) => {
      const o = r?.id || hh++;
      return this.create({
        jsx: a(o),
        id: o,
        ...r
      }), o;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Cn = new k3(), V3 = (t, a) => {
  const r = a?.id || hh++;
  return Cn.addToast({
    title: t,
    ...a,
    id: r
  }), r;
}, Y3 = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", q3 = V3, $3 = () => Cn.toasts, X3 = () => Cn.getActiveToasts(), cl = Object.assign(q3, {
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
  getHistory: $3,
  getToasts: X3
});
M3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function bu(t) {
  return t.label !== void 0;
}
const G3 = 3, I3 = "24px", Z3 = "16px", kv = 4e3, Q3 = 356, F3 = 14, K3 = 45, P3 = 200;
function Ta(...t) {
  return t.filter(Boolean).join(" ");
}
function J3(t) {
  const [a, r] = t.split("-"), o = [];
  return a && o.push(a), r && o.push(r), o;
}
const W3 = (t) => {
  var a, r, o, s, u, c, h, g, p;
  const { invert: y, toast: m, unstyled: v, interacting: x, setHeights: S, visibleToasts: T, heights: N, index: R, toasts: z, expanded: E, removeToast: j, defaultRichColors: U, closeButton: H, style: V, cancelButtonStyle: D, actionButtonStyle: q, className: le = "", descriptionClassName: I = "", duration: K, position: W, gap: O, expandByDefault: $, classNames: _, icons: L, closeButtonAriaLabel: Z = "Close toast" } = t, [G, ne] = ye.useState(null), [A, k] = ye.useState(null), [F, te] = ye.useState(!1), [se, he] = ye.useState(!1), [me, ee] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Ce, we] = ye.useState(!1), [xe, Re] = ye.useState(0), [qe, ft] = ye.useState(0), Te = ye.useRef(m.duration || K || kv), Ie = ye.useRef(null), Be = ye.useRef(null), $e = R === 0, wt = R + 1 <= T, Je = m.type, Qe = m.dismissible !== !1, Fe = m.className || "", gt = m.descriptionClassName || "", yt = ye.useMemo(() => N.findIndex((He) => He.toastId === m.id) || 0, [
    N,
    m.id
  ]), Xt = ye.useMemo(() => {
    var He;
    return (He = m.closeButton) != null ? He : H;
  }, [
    m.closeButton,
    H
  ]), Lt = ye.useMemo(() => m.duration || K || kv, [
    m.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), qn = ye.useRef(0), yn = ye.useRef(null), [tn, Kt] = W.split("-"), Ot = ye.useMemo(() => N.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    N,
    yt
  ]), kt = U3(), si = m.invert || y, Sa = Je === "loading";
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
    }, P3);
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
    return /* @__PURE__ */ ye.createElement(z3, {
      className: Ta(_?.loader, m == null || (He = m.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const Mn = m.icon || L?.[Je] || D3(Je);
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
      if (Math.abs(Pt) >= K3 || la > 0.11) {
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
      const Wt = (la = t.swipeDirections) != null ? la : J3(W);
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
  }, (un = L?.close) != null ? un : B3) : null, (Je || m.icon || m.promise) && m.icon !== null && (L?.[Je] !== null || m.icon) ? /* @__PURE__ */ ye.createElement("div", {
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
    className: Ta(_?.cancelButton, m == null || (g = m.classNames) == null ? void 0 : g.cancelButton)
  }, m.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(m.action) ? m.action : m.action && bu(m.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: m.actionButtonStyle || q,
    onClick: (He) => {
      bu(m.action) && (m.action.onClick == null || m.action.onClick.call(m.action, He), !He.defaultPrevented && vn());
    },
    className: Ta(_?.actionButton, m == null || (p = m.classNames) == null ? void 0 : p.actionButton)
  }, m.action.label) : null);
};
function Vv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function ez(t, a) {
  const r = {};
  return [
    t,
    a
  ].forEach((o, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", h = u ? Z3 : I3;
    function g(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        r[`${c}-${y}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof o == "number" || typeof o == "string" ? g(o) : typeof o == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      o[p] === void 0 ? r[`${c}-${p}`] = h : r[`${c}-${p}`] = typeof o[p] == "number" ? `${o[p]}px` : o[p];
    }) : g(h);
  }), r;
}
const tz = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: o, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: g, className: p, offset: y, mobileOffset: m, theme: v = "light", richColors: x, duration: S, style: T, visibleToasts: N = G3, toastOptions: R, dir: z = Vv(), gap: E = F3, icons: j, containerAriaLabel: U = "Notifications" } = a, [H, V] = ye.useState([]), D = ye.useMemo(() => o ? H.filter((F) => F.toasterId === o) : H.filter((F) => !F.toasterId), [
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
      AM.flushSync(() => {
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
      dir: z === "auto" ? Vv() : z,
      tabIndex: -1,
      ref: Z,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": _,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${Q3}px`,
        "--gap": `${E}px`,
        ...T,
        ...ez(y, m)
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
      return /* @__PURE__ */ ye.createElement(W3, {
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
        closeButton: (Ce = R?.closeButton) != null ? Ce : g,
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
}), mh = "svi2-pro:trigger-render", ph = "svi2-pro:render-state";
function nz() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(mh));
}
function az(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(ph, { detail: t }));
}
function iz(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(mh, t), () => window.removeEventListener(mh, t));
}
function rz(t) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const o = r.detail;
    o && t(o);
  };
  return window.addEventListener(ph, a), () => window.removeEventListener(ph, a);
}
const lz = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), oz = 832 * 480, sz = 0.85;
function kx(t) {
  return t !== null && lz.has(t);
}
function Yv(t, a) {
  return Number.isFinite(t) && t % a === 0;
}
function uz(t, a) {
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
  Yv(c, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${c}).`,
    severity: "error"
  }), Yv(h, 16) || r.push({
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
  const p = t.cfg_scale ?? 5;
  (p < 1 || p > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const y = t.num_clips;
  return y !== void 0 && y < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), kx(a.presetId) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Number.isFinite(c) && Number.isFinite(h) && c * h < oz * sz && r.push({
    field: "width",
    message: `${c}×${h} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function cz(t) {
  return t.some((a) => a.severity === "error");
}
function Vx() {
  const {
    params: t,
    presetId: a,
    refImageName: r,
    lastImageName: o,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Gi(), h = M.useMemo(
    () => uz(t, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!o
    }),
    [t, a, r, o]
  ), g = cz(h), p = s.phase === "running", y = M.useCallback(async () => {
    if (g) {
      cl.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), cl.success("Render started.");
    } catch (v) {
      const x = v instanceof Fb ? v.message : "Could not start the render.";
      cl.error(x);
    }
  }, [g, u]), m = M.useCallback(async () => {
    try {
      await c();
    } catch {
      cl.error("Could not cancel the render.");
    }
  }, [c]);
  return M.useEffect(() => iz(() => void y()), [y]), M.useEffect(() => {
    az({ busy: p });
  }, [p]), { issues: h, blocked: g, busy: p, submit: y, cancel: m };
}
const fz = 220, dz = 80;
function hz(t) {
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
function mz(t, a) {
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
function pz(t) {
  const a = lm.filter(
    (s) => s !== "qwen_edit" || t.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: hz(s),
      subtitle: mz(s, t),
      state: t.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * fz, y: dz },
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
var gz = "dk8hba0", yz = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, vz = "dk8hba5", bz = "dk8hba6", xz = "dk8hba7", Sz = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, wz = "dk8hbac";
function Ez({ data: t }) {
  const a = t, r = [gz, yz[a.state]].join(" "), o = [wz, Sz[a.state]].join(" ");
  return /* @__PURE__ */ w.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ w.jsx(wl, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ w.jsxs("div", { className: vz, children: [
      /* @__PURE__ */ w.jsx("span", { className: bz, children: a.title }),
      /* @__PURE__ */ w.jsx("span", { className: o, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ w.jsx("span", { className: xz, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ w.jsx(wl, { type: "source", position: Ae.Right })
  ] });
}
const _z = { pipeline: Ez };
var Nz = "_1g4g8kk0", Rz = "_1g4g8kk1", Cz = "_1g4g8kk2", Tz = "_1g4g8kk3", Mz = "_1g4g8kk4", Dz = "_1g4g8kk5";
const Az = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, zz = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function Oz() {
  const { render: t, params: a, qwenEdit: r } = Gi(), { busy: o, blocked: s, submit: u, cancel: c } = Vx(), h = M.useMemo(
    () => pz({ render: t, params: a, qwenEditEnabled: r.enabled }),
    [t, a, r.enabled]
  ), g = lm.filter(
    (p) => p !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ w.jsxs("div", { className: Nz, children: [
    /* @__PURE__ */ w.jsx("div", { className: Rz, children: /* @__PURE__ */ w.jsx(
      i3,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: _z,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ w.jsx("div", { className: Cz, children: /* @__PURE__ */ w.jsxs(
      ti,
      {
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ w.jsx("div", { className: Tz, children: g.map((p) => /* @__PURE__ */ w.jsxs("div", { className: Mz, children: [
            /* @__PURE__ */ w.jsx("span", { children: zz[p] }),
            /* @__PURE__ */ w.jsx(ta, { tone: Az[t.stageStates[p]], children: t.stageStates[p] })
          ] }, p)) }),
          /* @__PURE__ */ w.jsx("div", { className: Dz, children: o ? /* @__PURE__ */ w.jsx($i, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ w.jsx($i, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var qv = nx();
const Yx = 0, qx = 1, $x = 2, $v = 3;
var Xv = Object.prototype.hasOwnProperty;
function gh(t, a) {
  var r, o;
  if (t === a) return !0;
  if (t && a && (r = t.constructor) === a.constructor) {
    if (r === Date) return t.getTime() === a.getTime();
    if (r === RegExp) return t.toString() === a.toString();
    if (r === Array) {
      if ((o = t.length) === a.length)
        for (; o-- && gh(t[o], a[o]); ) ;
      return o === -1;
    }
    if (!r || typeof t == "object") {
      o = 0;
      for (r in t)
        if (Xv.call(t, r) && ++o && !Xv.call(a, r) || !(r in a) || !gh(t[r], a[r])) return !1;
      return Object.keys(a).length === o;
    }
  }
  return t !== t && a !== a;
}
const ni = /* @__PURE__ */ new WeakMap(), ii = () => {
}, hn = (
  /*#__NOINLINE__*/
  ii()
), yh = Object, nt = (t) => t === hn, Aa = (t) => typeof t == "function", Xi = (t, a) => ({
  ...t,
  ...a
}), Xx = (t) => Aa(t.then), Yd = {}, xu = {}, sm = "undefined", Po = typeof window != sm, vh = typeof document != sm, jz = Po && "Deno" in window, Lz = () => Po && typeof window.requestAnimationFrame != sm, Gx = (t, a) => {
  const r = ni.get(t);
  return [
    // Getter
    () => !nt(a) && t.get(a) || Yd,
    // Setter
    (o) => {
      if (!nt(a)) {
        const s = t.get(a);
        a in xu || (xu[a] = s), r[5](a, Xi(s, o), s || Yd);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in xu ? xu[a] : !nt(a) && t.get(a) || Yd
  ];
};
let bh = !0;
const Hz = () => bh, [xh, Sh] = Po && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ii,
  ii
], Bz = () => {
  const t = vh && document.visibilityState;
  return nt(t) || t !== "hidden";
}, Uz = (t) => (vh && document.addEventListener("visibilitychange", t), xh("focus", t), () => {
  vh && document.removeEventListener("visibilitychange", t), Sh("focus", t);
}), kz = (t) => {
  const a = () => {
    bh = !0, t();
  }, r = () => {
    bh = !1;
  };
  return xh("online", a), xh("offline", r), () => {
    Sh("online", a), Sh("offline", r);
  };
}, Vz = {
  isOnline: Hz,
  isVisible: Bz
}, Yz = {
  initFocus: Uz,
  initReconnect: kz
}, Gv = !ye.useId, ml = !Po || jz, qz = (t) => Lz() ? window.requestAnimationFrame(t) : setTimeout(t, 1), qd = ml ? M.useEffect : M.useLayoutEffect, $d = typeof navigator < "u" && navigator.connection, Iv = !ml && $d && ([
  "slow-2g",
  "2g"
].includes($d.effectiveType) || $d.saveData), Su = /* @__PURE__ */ new WeakMap(), $z = (t) => yh.prototype.toString.call(t), Xd = (t, a) => t === `[object ${a}]`;
let Xz = 0;
const wh = (t) => {
  const a = typeof t, r = $z(t), o = Xd(r, "Date"), s = Xd(r, "RegExp"), u = Xd(r, "Object");
  let c, h;
  if (yh(t) === t && !o && !s) {
    if (c = Su.get(t), c) return c;
    if (c = ++Xz + "~", Su.set(t, c), Array.isArray(t)) {
      for (c = "@", h = 0; h < t.length; h++)
        c += wh(t[h]) + ",";
      Su.set(t, c);
    }
    if (u) {
      c = "#";
      const g = yh.keys(t).sort();
      for (; !nt(h = g.pop()); )
        nt(t[h]) || (c += h + ":" + wh(t[h]) + ",");
      Su.set(t, c);
    }
  } else
    c = o ? t.toJSON() : a == "symbol" ? t.toString() : a == "string" ? JSON.stringify(t) : "" + t;
  return c;
}, um = (t) => {
  if (Aa(t))
    try {
      t = t();
    } catch {
      t = "";
    }
  const a = t;
  return t = typeof t == "string" ? t : (Array.isArray(t) ? t.length : t) ? wh(t) : "", [
    t,
    a
  ];
};
let Gz = 0;
const Eh = () => ++Gz;
async function Ix(...t) {
  const [a, r, o, s] = t, u = Xi({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const h = u.rollbackOnError;
  let g = u.optimisticData;
  const p = (v) => typeof h == "function" ? h(v) : h !== !1, y = u.throwOnError;
  if (Aa(r)) {
    const v = r, x = [], S = a.keys();
    for (const T of S)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(T) && v(a.get(T)._k) && x.push(T);
    return Promise.all(x.map(m));
  }
  return m(r);
  async function m(v) {
    const [x] = um(v);
    if (!x) return;
    const [S, T] = Gx(a, x), [N, R, z, E] = ni.get(a), j = () => {
      const O = N[x];
      return (Aa(u.revalidate) ? u.revalidate(S().data, v) : u.revalidate !== !1) && (delete z[x], delete E[x], O && O[0]) ? O[0]($x).then(() => S().data) : S().data;
    };
    if (t.length < 3)
      return j();
    let U = o, H, V = !1;
    const D = Eh();
    R[x] = [
      D,
      0
    ];
    const q = !nt(g), le = S(), I = le.data, K = le._c, W = nt(K) ? I : K;
    if (q && (g = Aa(g) ? g(W, I) : g, T({
      data: g,
      _c: W
    })), Aa(U))
      try {
        U = U(W);
      } catch (O) {
        H = O, V = !0;
      }
    if (U && Xx(U))
      if (U = await U.catch((O) => {
        H = O, V = !0;
      }), D !== R[x][0]) {
        if (V) throw H;
        return U;
      } else V && q && p(H) && (c = !0, T({
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
    if (R[x][1] = Eh(), Promise.resolve(j()).then(() => {
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
const Zv = (t, a) => {
  for (const r in t)
    t[r][0] && t[r][0](a);
}, Iz = (t, a) => {
  if (!ni.has(t)) {
    const r = Xi(Yz, a), o = /* @__PURE__ */ Object.create(null), s = Ix.bind(hn, t);
    let u = ii;
    const c = /* @__PURE__ */ Object.create(null), h = (y, m) => {
      const v = c[y] || [];
      return c[y] = v, v.push(m), () => v.splice(v.indexOf(m), 1);
    }, g = (y, m, v) => {
      t.set(y, m);
      const x = c[y];
      if (x)
        for (const S of x)
          S(m, v);
    }, p = () => {
      if (!ni.has(t) && (ni.set(t, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        g,
        h
      ]), !ml)) {
        const y = r.initFocus(setTimeout.bind(hn, Zv.bind(hn, o, Yx))), m = r.initReconnect(setTimeout.bind(hn, Zv.bind(hn, o, qx)));
        u = () => {
          y && y(), m && m(), ni.delete(t);
        };
      }
    };
    return p(), [
      t,
      s,
      p,
      u
    ];
  }
  return [
    t,
    ni.get(t)[4]
  ];
}, Zz = (t, a, r, o, s) => {
  const u = r.errorRetryCount, c = s.retryCount, h = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(o, h, s);
}, Qz = gh, [Zx, Fz] = Iz(/* @__PURE__ */ new Map()), Kz = Xi(
  {
    // events
    onLoadingSlow: ii,
    onSuccess: ii,
    onError: ii,
    onErrorRetry: Zz,
    onDiscarded: ii,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Iv ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Iv ? 5e3 : 3e3,
    // providers
    compare: Qz,
    isPaused: () => !1,
    cache: Zx,
    mutate: Fz,
    fallback: {}
  },
  // use web preset by default
  Vz
), Pz = (t, a) => {
  const r = Xi(t, a);
  if (a) {
    const { use: o, fallback: s } = t, { use: u, fallback: c } = a;
    o && u && (r.use = o.concat(u)), s && c && (r.fallback = Xi(s, c));
  }
  return r;
}, Jz = M.createContext({}), Wz = "$inf$", Qx = Po && window.__SWR_DEVTOOLS_USE__, e5 = Qx ? window.__SWR_DEVTOOLS_USE__ : [], t5 = () => {
  Qx && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, n5 = (t) => Aa(t[1]) ? [
  t[0],
  t[1],
  t[2] || {}
] : [
  t[0],
  null,
  (t[1] === null ? t[2] : t[1]) || {}
], a5 = () => {
  const t = M.useContext(Jz);
  return M.useMemo(() => Xi(Kz, t), [
    t
  ]);
}, i5 = (t) => (a, r, o) => t(a, r && ((...u) => {
  const [c] = um(a), [, , , h] = ni.get(Zx);
  if (c.startsWith(Wz))
    return r(...u);
  const g = h[c];
  return nt(g) ? r(...u) : (delete h[c], g);
}), o), r5 = e5.concat(i5), l5 = (t) => function(...r) {
  const o = a5(), [s, u, c] = n5(r), h = Pz(o, c);
  let g = t;
  const { use: p } = h, y = (p || []).concat(r5);
  for (let m = y.length; m--; )
    g = y[m](g);
  return g(s, u || h.fetcher || null, h);
}, o5 = (t, a, r) => {
  const o = a[t] || (a[t] = []);
  return o.push(r), () => {
    const s = o.indexOf(r);
    s >= 0 && (o[s] = o[o.length - 1], o.pop());
  };
};
t5();
const Gd = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), Id = {
  dedupe: !0
}, Qv = Promise.resolve(hn), s5 = () => ii, u5 = (t, a, r) => {
  const { cache: o, compare: s, suspense: u, fallbackData: c, revalidateOnMount: h, revalidateIfStale: g, refreshInterval: p, refreshWhenHidden: y, refreshWhenOffline: m, keepPreviousData: v, strictServerPrefetchWarning: x } = r, [S, T, N, R] = ni.get(o), [z, E] = um(t), j = M.useRef(!1), U = M.useRef(!1), H = M.useRef(z), V = M.useRef(a), D = M.useRef(r), q = () => D.current, le = () => q().isVisible() && q().isOnline(), [I, K, W, O] = Gx(o, z), $ = M.useRef({}).current, _ = nt(c) ? nt(r.fallback) ? hn : r.fallback[z] : c, L = (Te, Ie) => {
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
        return nt(yt) || g;
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
  ]), ne = qv.useSyncExternalStore(M.useCallback(
    (Te) => W(z, (Ie, Be) => {
      L(Be, Ie) || Te();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      z
    ]
  ), G[0], G[1]), A = S[z] && S[z].length > 0, k = ne.data, F = nt(k) ? _ && Xx(_) ? Gd(_) : _ : k, te = ne.error, se = M.useRef(F), he = v ? nt(k) ? nt(se.current) ? F : se.current : k : F, me = z && nt(F), ee = M.useRef(null);
  !ml && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  qv.useSyncExternalStore(s5, () => (ee.current = !1, ee), () => (ee.current = !0, ee));
  const ge = ee.current;
  x && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !z || !a || q().isPaused() || A && !nt(te) ? !1 : Z && !nt(h) ? h : u ? nt(F) ? !1 : g : nt(F) || g, Ce = Z && ze, we = nt(ne.isValidating) ? Ce : ne.isValidating, xe = nt(ne.isLoading) ? Ce : ne.isLoading, Re = M.useCallback(
    async (Te) => {
      const Ie = V.current;
      if (!z || !Ie || U.current || q().isPaused())
        return !1;
      let Be, $e, wt = !0;
      const Je = Te || {}, Qe = !N[z] || !Je.dedupe, Fe = () => Gv ? !U.current && z === H.current && j.current : z === H.current, gt = {
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
          Eh()
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
          tn && tn[0] && tn[0]($v, yn);
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
    (...Te) => Ix(o, H.current, ...Te),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (qd(() => {
    V.current = a, D.current = r, nt(k) || (se.current = k);
  }), qd(() => {
    if (!z) return;
    const Te = Re.bind(hn, Id);
    let Ie = 0;
    q().revalidateOnFocus && (Ie = Date.now() + q().focusThrottleInterval);
    const $e = o5(z, S, (wt, Je = {}) => {
      if (wt == Yx) {
        const Qe = Date.now();
        q().revalidateOnFocus && Qe > Ie && le() && (Ie = Qe + q().focusThrottleInterval, Te());
      } else if (wt == qx)
        q().revalidateOnReconnect && le() && Te();
      else {
        if (wt == $x)
          return Re();
        if (wt == $v)
          return Re(Je);
      }
    });
    return U.current = !1, H.current = z, j.current = !0, K({
      _k: E
    }), ze && (N[z] || (nt(F) || ml ? Te() : qz(Te))), () => {
      U.current = !0, $e();
    };
  }, [
    z
  ]), qd(() => {
    let Te;
    function Ie() {
      const $e = Aa(p) ? p(I().data) : p;
      $e && Te !== -1 && (Te = setTimeout(Be, $e));
    }
    function Be() {
      !I().error && (y || q().isVisible()) && (m || q().isOnline()) ? Re(Id).then(Ie) : Ie();
    }
    return Ie(), () => {
      Te && (clearTimeout(Te), Te = -1);
    };
  }, [
    p,
    y,
    m,
    z
  ]), M.useDebugValue(he), u) {
    if (!Gv && ml && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (V.current = a, D.current = r, U.current = !1);
    const Te = R[z], Ie = !nt(Te) && me ? qe(Te) : Qv;
    if (Gd(Ie), !nt(te) && me)
      throw te;
    const Be = me ? Re(Id) : Qv;
    !nt(he) && me && (Be.status = "fulfilled", Be.value = !0), Gd(Be);
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
}, Fv = l5(u5);
async function c5(t = 25) {
  return El(`/render/jobs?limit=${t}`);
}
var f5 = "_1xasopc0", d5 = "_1xasopc1", h5 = "_1xasopc2", m5 = "_1xasopc3", p5 = "_1xasopc4", g5 = "_1xasopc5", y5 = "_1xasopc6", v5 = "_1xasopc7", b5 = "_1xasopc8";
function x5(t, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const o = t.name.toLowerCase(), s = t.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? o.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function S5(t, a, r) {
  for (const o of t) {
    if (a && !x5(o, a))
      return `"${o.name}" is not an accepted file type.`;
    if (r !== void 0 && o.size > r)
      return `"${o.name}" exceeds the maximum size.`;
  }
  return null;
}
function Kv({
  accept: t,
  maxSizeBytes: a,
  multiple: r = !1,
  disabled: o = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: h,
  renderPreview: g,
  onFiles: p
}) {
  const y = M.useRef(null), m = M.useId(), [v, x] = M.useState(!1), [S, T] = M.useState(null), [N, R] = M.useState([]), z = M.useCallback(
    (q) => {
      if (!q || q.length === 0) return;
      const le = Array.from(q), I = r ? le : le.slice(0, 1), K = S5(I, t, a);
      if (K) {
        T(K);
        return;
      }
      T(null), R(I), p(I);
    },
    [t, a, r, p]
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
    f5,
    v ? d5 : "",
    o ? h5 : "",
    S !== null ? m5 : "",
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
              className: p5,
              accept: t,
              multiple: r,
              disabled: o,
              tabIndex: -1,
              onChange: (q) => z(q.target.files)
            }
          ),
          /* @__PURE__ */ w.jsx("span", { className: g5, children: s ?? (v ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ w.jsx("span", { className: y5, children: u }),
          g && N.length > 0 && /* @__PURE__ */ w.jsx("div", { className: b5, children: g(N) })
        ]
      }
    ),
    S && /* @__PURE__ */ w.jsx("div", { id: m, role: "alert", className: v5, children: S })
  ] });
}
function Pv(t) {
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
var w5 = "cyswg40", Jv = "cyswg41", Wv = "cyswg42", eb = "cyswg43", wu = "cyswg44";
const tb = 32 * 1024 * 1024;
function E5({
  lastImageRequired: t,
  refError: a,
  lastError: r
}) {
  const { setRefImage: o, setLastImage: s } = Gi(), [u, c] = M.useState(null), [h, g] = M.useState(null), p = Pv(u), y = Pv(h);
  return /* @__PURE__ */ w.jsxs("div", { className: w5, children: [
    /* @__PURE__ */ w.jsxs("div", { className: Jv, children: [
      /* @__PURE__ */ w.jsxs("span", { className: Wv, children: [
        "Reference image ",
        /* @__PURE__ */ w.jsx(ta, { tone: "accent", children: "required" })
      ] }),
      /* @__PURE__ */ w.jsx(
        Kv,
        {
          accept: "image/*",
          maxSizeBytes: tb,
          ariaLabel: "reference image upload",
          label: u ? "Replace reference image" : "Drop the anchor image or browse",
          hint: "Defines identity. Aspect-match to the render resolution; dims divisible by 16.",
          onFiles: (m) => {
            const v = m[0] ?? null;
            c(v), o(v?.name ?? null, v?.name ?? "");
          },
          renderPreview: () => p ? /* @__PURE__ */ w.jsx("img", { className: eb, src: p, alt: "reference preview" }) : null
        }
      ),
      u && /* @__PURE__ */ w.jsx("span", { className: wu, children: u.name }),
      a && /* @__PURE__ */ w.jsx("span", { role: "alert", className: wu, style: { color: "var(--error)" }, children: a })
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: Jv, children: [
      /* @__PURE__ */ w.jsxs("span", { className: Wv, children: [
        "Last image",
        " ",
        t ? /* @__PURE__ */ w.jsx(ta, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ w.jsx(ta, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ w.jsx(
        Kv,
        {
          accept: "image/*",
          maxSizeBytes: tb,
          ariaLabel: "last image upload",
          label: h ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over the clip.",
          onFiles: (m) => {
            const v = m[0] ?? null;
            g(v), s(v?.name ?? null, v?.name ?? null);
          },
          renderPreview: () => y ? /* @__PURE__ */ w.jsx("img", { className: eb, src: y, alt: "last preview" }) : null
        }
      ),
      h && /* @__PURE__ */ w.jsx("span", { className: wu, children: h.name }),
      r && /* @__PURE__ */ w.jsx("span", { role: "alert", className: wu, style: { color: "var(--error)" }, children: r })
    ] })
  ] });
}
var _5 = "dck790", N5 = "dck791", R5 = "dck792";
function Qu({ title: t, detail: a, action: r, className: o }) {
  const s = [_5, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ w.jsxs("div", { className: s, children: [
    /* @__PURE__ */ w.jsx("span", { className: N5, children: t }),
    a && /* @__PURE__ */ w.jsx("span", { className: R5, children: a }),
    r
  ] });
}
var C5 = "_1880igs0", T5 = "_1880igs1", M5 = "_1880igs2", D5 = "_1880igs3", A5 = "_1880igs4", z5 = "_1880igs5";
const O5 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function j5({ jobs: t, onOpen: a }) {
  return t.length === 0 ? /* @__PURE__ */ w.jsx(
    Qu,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ w.jsx("div", { className: C5, children: t.map((r) => /* @__PURE__ */ w.jsxs("button", { type: "button", className: T5, onClick: () => a(r), children: [
    /* @__PURE__ */ w.jsxs("span", { className: M5, children: [
      /* @__PURE__ */ w.jsx("span", { className: D5, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ w.jsx("span", { className: A5, children: L5(r) })
    ] }),
    /* @__PURE__ */ w.jsx("span", { className: z5, children: /* @__PURE__ */ w.jsx(ta, { tone: O5[r.status], children: r.status }) })
  ] }, r.id)) });
}
function L5(t) {
  const a = t.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
var H5 = "dgx4n20", B5 = "dgx4n21", U5 = "dgx4n22", k5 = "dgx4n23", V5 = "dgx4n24", Y5 = "dgx4n25", q5 = "dgx4n26", $5 = "dgx4n27";
function X5({
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
  const o = _3(t);
  return /* @__PURE__ */ w.jsx("div", { className: H5, role: "radiogroup", "aria-label": "Render presets", children: o.map((s) => {
    const u = E3(s), c = s.id === a, h = s.id === Vo, g = [B5, c ? U5 : ""].filter(Boolean).join(" ");
    return /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": c,
        className: g,
        onClick: () => r(s),
        children: [
          /* @__PURE__ */ w.jsxs("div", { className: k5, children: [
            /* @__PURE__ */ w.jsx("span", { className: V5, children: s.label }),
            h && /* @__PURE__ */ w.jsx(ta, { tone: "accent", children: "Default" })
          ] }),
          h && /* @__PURE__ */ w.jsx("span", { className: $5, children: "Recommended baseline" }),
          /* @__PURE__ */ w.jsx("span", { className: Y5, children: s.description }),
          /* @__PURE__ */ w.jsxs("div", { className: q5, children: [
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
var G5 = "_1ntn2zv0", I5 = "_1ntn2zv1", Z5 = "_1ntn2zv2", nb = "_1ntn2zv3", Q5 = "_1ntn2zv4", F5 = "_1ntn2zv5", K5 = "_1ntn2zv6", P5 = "_1ntn2zv7";
function J5({ error: t }) {
  const { params: a, setPrompts: r } = Gi(), [o, s] = M.useState(!1), u = a.prompts ?? [""], c = M.useMemo(() => a.num_clips ?? u.length ?? 1, [a.num_clips, u.length]), h = (y) => {
    r([y]);
  }, g = (y, m) => {
    const v = Array.from({ length: c }, (x, S) => u[S] ?? "");
    v[y] = m, r(v);
  }, p = (y) => {
    if (s(y), !y)
      r([u[0] ?? ""]);
    else {
      const m = u[0] ?? "";
      r(Array.from({ length: c }, (v, x) => u[x] ?? m));
    }
  };
  return /* @__PURE__ */ w.jsxs("div", { className: G5, children: [
    /* @__PURE__ */ w.jsx("div", { className: I5, children: /* @__PURE__ */ w.jsxs("label", { className: Z5, children: [
      /* @__PURE__ */ w.jsx(
        "input",
        {
          type: "checkbox",
          checked: o,
          onChange: (y) => p(y.target.checked)
        }
      ),
      "Per-clip prompts"
    ] }) }),
    o ? Array.from({ length: c }, (y, m) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ w.jsxs("div", { className: Q5, children: [
        /* @__PURE__ */ w.jsxs("span", { className: F5, children: [
          "Clip ",
          m + 1
        ] }),
        /* @__PURE__ */ w.jsx(
          "textarea",
          {
            className: nb,
            "aria-label": `prompt for clip ${m + 1}`,
            value: u[m] ?? "",
            onChange: (v) => g(m, v.target.value)
          }
        )
      ] }, `clip-${m}`)
    )) : /* @__PURE__ */ w.jsx(
      "textarea",
      {
        className: nb,
        "aria-label": "single prompt",
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: u[0] ?? "",
        onChange: (y) => h(y.target.value)
      }
    ),
    /* @__PURE__ */ w.jsx("p", { className: K5, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    t && /* @__PURE__ */ w.jsx("span", { role: "alert", className: P5, children: t })
  ] });
}
var W5 = "_1itrxk30", e4 = "_1itrxk31", t4 = "_1itrxk32", n4 = "_1itrxk33", a4 = "_1itrxk34", i4 = "_1itrxk35", r4 = "_1itrxk36", l4 = "_1itrxk37";
function o4() {
  const { qwenEdit: t, setQwenEdit: a } = Gi();
  return /* @__PURE__ */ w.jsxs("div", { className: W5, children: [
    /* @__PURE__ */ w.jsxs("div", { className: e4, children: [
      /* @__PURE__ */ w.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": t.enabled,
          "aria-label": "enable anchor edit",
          className: r4,
          onClick: () => a({ enabled: !t.enabled }),
          children: /* @__PURE__ */ w.jsx("span", { className: l4, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ w.jsxs("span", { className: t4, children: [
        /* @__PURE__ */ w.jsx("span", { className: n4, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ w.jsx("span", { className: a4, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    t.enabled && /* @__PURE__ */ w.jsx(
      "textarea",
      {
        className: i4,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: t.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var s4 = "ob7g5b0", u4 = "ob7g5b1", c4 = "ob7g5b3", f4 = "ob7g5b4", d4 = "ob7g5b5", h4 = "ob7g5b6", m4 = "ob7g5b7", p4 = "ob7g5b8", g4 = "ob7g5b9";
function y4({
  src: t,
  poster: a,
  fpsLabel: r,
  controls: o = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: h,
  className: g,
  emptyContent: p,
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
  ), E = [s4, g].filter(Boolean).join(" ");
  return t ? x === "error" ? /* @__PURE__ */ w.jsx("div", { className: E, role: "alert", "aria-label": h ?? "video playback error", children: /* @__PURE__ */ w.jsxs("div", { className: m4, children: [
    /* @__PURE__ */ w.jsx("div", { className: p4, children: "Could not play video" }),
    /* @__PURE__ */ w.jsx("div", { className: g4, children: T ?? "unknown error" })
  ] }) }) : /* @__PURE__ */ w.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ w.jsx("div", { className: c4, "aria-hidden": "true", children: /* @__PURE__ */ w.jsx("div", { className: f4 }) }),
    r && /* @__PURE__ */ w.jsx("span", { className: d4, children: r }),
    /* @__PURE__ */ w.jsx(
      "video",
      {
        className: u4,
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
  ] }) : /* @__PURE__ */ w.jsx("div", { className: E, "aria-label": h ?? "no video", children: /* @__PURE__ */ w.jsx("div", { className: h4, children: p ?? "No video to display yet." }) });
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
}, ab = {
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
function v4(t, a) {
  return t !== null && ab[t] ? ab[t] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function b4(t) {
  return t ? `${Vh}/media?path=${encodeURIComponent(t)}` : null;
}
var Eu = "_1ojc56g0", x4 = "_1ojc56g1", S4 = "_1ojc56g2", w4 = "_1ojc56g3", E4 = "_1ojc56g4", _4 = "_1ojc56g5", N4 = "_1ojc56g6", _u = "_1ojc56g7", R4 = "_1ojc56g8", C4 = "_1ojc56g9", T4 = "_1ojc56ga", M4 = "_1ojc56gb", D4 = "_1ojc56gc", A4 = "_1ojc56gd", z4 = "_1ojc56ge";
function O4({ state: t, onCancel: a, onReset: r }) {
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
    const h = v4(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ w.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ w.jsxs("div", { className: D4, role: "alert", children: [
        /* @__PURE__ */ w.jsx("span", { className: A4, children: h.title }),
        /* @__PURE__ */ w.jsx("span", { className: z4, children: h.hint })
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
        y4,
        {
          src: b4(t.outputPath),
          fpsLabel: u ? `${u} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ w.jsx(j4, { state: t }),
      /* @__PURE__ */ w.jsx("div", { className: _u, children: /* @__PURE__ */ w.jsx($i, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const c = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ w.jsxs("div", { className: Eu, children: [
    /* @__PURE__ */ w.jsx("div", { className: _4, "aria-label": "overall progress", children: /* @__PURE__ */ w.jsx(
      "div",
      {
        className: N4,
        style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
      }
    ) }),
    /* @__PURE__ */ w.jsxs("div", { className: x4, children: [
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
  return /* @__PURE__ */ w.jsxs("div", { className: S4, children: [
    /* @__PURE__ */ w.jsx("span", { className: w4, children: t }),
    /* @__PURE__ */ w.jsx("span", { className: E4, children: a })
  ] });
}
function j4({ state: t }) {
  const a = t.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), t.vramPeakGib !== null && r.push(["VRAM peak", `${t.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", a.sha256.slice(0, 16)]), t.outputPath && r.push(["Output", t.outputPath]), r.length === 0 ? null : /* @__PURE__ */ w.jsx("div", { className: R4, children: r.map(([o, s]) => /* @__PURE__ */ w.jsxs("div", { className: C4, children: [
    /* @__PURE__ */ w.jsx("span", { className: T4, children: o }),
    /* @__PURE__ */ w.jsx("span", { className: M4, children: s })
  ] }, o)) });
}
var L4 = "_1hbttwg0", H4 = "_1hbttwg1", B4 = "_1hbttwg2", U4 = "_1hbttwg3", Fx = "_1hbttwg4", k4 = "_1hbttwg5", V4 = "_1hbttwg7 _1hbttwg6", Y4 = "_1hbttwg8 _1hbttwg6", q4 = "_1hbttwg9", $4 = "_1hbttwga", X4 = "_1hbttwgb", G4 = "_1hbttwgc", I4 = "_1hbttwgd";
function Z4({ spec: t, value: a, error: r, onChange: o }) {
  const s = M.useId(), u = `${s}-help`, c = r ? `${s}-error` : u;
  return /* @__PURE__ */ w.jsxs("div", { className: L4, children: [
    /* @__PURE__ */ w.jsxs("div", { className: H4, children: [
      /* @__PURE__ */ w.jsx("label", { className: B4, htmlFor: s, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ w.jsx("span", { className: U4, children: F4(a) })
    ] }),
    Q4(t, a, o, s, c, r !== void 0),
    /* @__PURE__ */ w.jsx("span", { id: u, className: Fx, children: t.help }),
    r && /* @__PURE__ */ w.jsx("span", { id: `${s}-error`, role: "alert", className: k4, children: r })
  ] });
}
function Q4(t, a, r, o, s, u) {
  switch (t.control) {
    case "toggle": {
      const c = !!a;
      return /* @__PURE__ */ w.jsxs("div", { className: X4, children: [
        /* @__PURE__ */ w.jsx(
          "button",
          {
            type: "button",
            id: o,
            role: "switch",
            "aria-checked": c,
            "aria-describedby": s,
            className: G4,
            onClick: () => r(!c),
            children: /* @__PURE__ */ w.jsx("span", { className: I4, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ w.jsx("span", { className: Fx, children: c ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ w.jsx(
        "select",
        {
          id: o,
          "aria-describedby": s,
          className: Y4,
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
          className: $4,
          min: t.min,
          max: t.max,
          step: t.step,
          value: ib(a, t),
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
          className: [V4, u ? q4 : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: ib(a, t),
          onChange: (c) => r(Number(c.target.value))
        }
      );
  }
}
function ib(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function F4(t) {
  return typeof t != "number" ? "—" : Number.isInteger(t) ? String(t) : t.toFixed(2);
}
var K4 = "_1f0q5gf0", P4 = "_1f0q5gf1", J4 = "_1f0q5gf2", W4 = "_1f0q5gf3", eO = "_1f0q5gf4", tO = "_1f0q5gf5", nO = "_1f0q5gf6", aO = "_1f0q5gf7", iO = "_1f0q5gf8";
function rO({
  title: t,
  description: a,
  badge: r,
  defaultCollapsed: o = !1,
  collapsible: s = !0,
  className: u,
  children: c
}) {
  const h = M.useId(), [g, p] = M.useState(s ? o : !1), y = [K4, u].filter(Boolean).join(" "), m = [J4, g ? W4 : ""].filter(Boolean).join(" "), v = !s || !g;
  return /* @__PURE__ */ w.jsxs("section", { className: y, children: [
    /* @__PURE__ */ w.jsxs(
      "button",
      {
        type: "button",
        className: P4,
        "aria-expanded": v,
        "aria-controls": h,
        disabled: !s,
        onClick: () => s && p((x) => !x),
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
          /* @__PURE__ */ w.jsxs("span", { className: eO, children: [
            /* @__PURE__ */ w.jsx("span", { className: tO, children: t }),
            a && /* @__PURE__ */ w.jsx("span", { className: nO, children: a })
          ] }),
          r && /* @__PURE__ */ w.jsx("span", { className: aO, children: r })
        ]
      }
    ),
    v && /* @__PURE__ */ w.jsx("div", { id: h, className: iO, children: c })
  ] });
}
var lO = "kn07ek0", oO = "kn07ek1";
function sO({ issues: t }) {
  const { params: a, updateParam: r } = Gi(), o = (s) => t.find((u) => u.field === s && u.severity === "error")?.message;
  return /* @__PURE__ */ w.jsx("div", { className: lO, children: p3.map((s) => {
    const u = g3(s.id);
    return u.length === 0 ? null : /* @__PURE__ */ w.jsx(
      rO,
      {
        title: s.title,
        description: s.description,
        defaultCollapsed: s.defaultCollapsed,
        badge: s.defaultCollapsed ? /* @__PURE__ */ w.jsx(ta, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ w.jsx("div", { className: oO, children: u.map((c) => /* @__PURE__ */ w.jsx(
          Z4,
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
var uO = "_1w9jfpf0", cO = "_1w9jfpf1", fO = "_1w9jfpf2", dO = "_1w9jfpf3";
function hO() {
  const { presetId: t, render: a, applyPresetById: r, resetRender: o } = Gi(), { issues: s, busy: u, cancel: c } = Vx(), h = Fv("svi2/presets", Kb), g = Fv("svi2/history", () => c5(25)), p = h.data?.presets ?? [], y = g.data?.jobs ?? [], m = kx(t), v = s.find((N) => N.field === "ref_image_path")?.message, x = s.find((N) => N.field === "last_image_path")?.message, S = s.find((N) => N.field === "prompts")?.message, T = s.find(
    (N) => N.field === "width" && N.severity === "warning"
  )?.message;
  return /* @__PURE__ */ w.jsxs("div", { className: uO, children: [
    /* @__PURE__ */ w.jsxs("div", { className: cO, children: [
      /* @__PURE__ */ w.jsx(
        ti,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ w.jsx(X5, { presets: p, selectedId: t, onSelect: r })
        }
      ),
      /* @__PURE__ */ w.jsx(ti, { title: "Anchor", description: "The reference image defines identity for the whole take.", children: /* @__PURE__ */ w.jsx(
        E5,
        {
          lastImageRequired: m,
          refError: v,
          lastError: x
        }
      ) }),
      /* @__PURE__ */ w.jsx(ti, { title: "Prompt", children: /* @__PURE__ */ w.jsx(J5, { error: S }) }),
      /* @__PURE__ */ w.jsx(ti, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ w.jsx(o4, {}) }),
      /* @__PURE__ */ w.jsxs(ti, { title: "Parameters", description: "Grouped by tier. Advanced tiers stay collapsed.", children: [
        T && /* @__PURE__ */ w.jsx("output", { className: dO, children: T }),
        /* @__PURE__ */ w.jsx(sO, { issues: s })
      ] })
    ] }),
    /* @__PURE__ */ w.jsxs("div", { className: fO, children: [
      /* @__PURE__ */ w.jsx(ti, { title: "Render", description: u ? "Render in progress." : "Live progress and output.", children: /* @__PURE__ */ w.jsx(O4, { state: a, onCancel: c, onReset: o }) }),
      /* @__PURE__ */ w.jsx(ti, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ w.jsx(j5, { jobs: y, onOpen: () => {
      } }) })
    ] })
  ] });
}
var mO = "_1smvon90", ur = "_1smvon91", cr = "_1smvon92", fr = "_1smvon93", Ru = "_1smvon94", Zd = "_1smvon95 _1smvon94", pO = "_1smvon96";
const gO = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function yO() {
  const { settings: t, setSettings: a } = Gi(), [r, o] = M.useState(t), [s, u] = M.useState(!1), c = (g, p) => {
    o((y) => ({ ...y, [g]: p }));
  }, h = async () => {
    u(!0);
    try {
      const g = await U2(r);
      a(g), o(g), cl.success("Settings saved. Applied to new renders.");
    } catch {
      cl.error("Could not save settings.");
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
        /* @__PURE__ */ w.jsxs("div", { className: mO, children: [
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Models directory" }),
            /* @__PURE__ */ w.jsx(
              "input",
              {
                className: Ru,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (g) => c("modelsDir", g.target.value)
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
                onChange: (g) => c("outputDir", g.target.value)
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ w.jsx(
              "select",
              {
                className: Zd,
                value: r.attentionBackend,
                onChange: (g) => c("attentionBackend", g.target.value),
                children: j2.map((g) => /* @__PURE__ */ w.jsx("option", { value: g.value, children: g.label }, g.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ w.jsx(
              "select",
              {
                className: Zd,
                value: r.fp8Compute,
                onChange: (g) => c("fp8Compute", g.target.value),
                children: L2.map((g) => /* @__PURE__ */ w.jsx("option", { value: g.value, children: g.label }, g.value))
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
                onChange: (g) => c("blocksToSwap", Number(g.target.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ w.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ w.jsx("span", { className: cr, children: "Interpolation method" }),
            /* @__PURE__ */ w.jsx(
              "select",
              {
                className: Zd,
                value: r.interpolateMethod,
                onChange: (g) => c("interpolateMethod", g.target.value),
                children: gO.map((g) => /* @__PURE__ */ w.jsx("option", { value: g.value, children: g.label }, g.value))
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
                onChange: (g) => c("interpolateFps", Number(g.target.value))
              }
            ),
            /* @__PURE__ */ w.jsx("span", { className: fr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ w.jsxs("div", { className: pO, children: [
          /* @__PURE__ */ w.jsx($i, { loading: s, onClick: () => void h(), children: "Save settings" }),
          /* @__PURE__ */ w.jsx($i, { variant: "secondary", onClick: () => o(t), disabled: s, children: "Reset" })
        ] })
      ]
    }
  );
}
var vO = "_1ugwva20", bO = "_1ugwva21", xO = "_1ugwva22", SO = "_1ugwva23", wO = "_1ugwva24", EO = "_1ugwva25", _O = "_1ugwva26", NO = "_1ugwva27", RO = "_1ugwva28";
const CO = [
  { to: "recipe", label: "Recipe" },
  { to: "dag", label: "Pipeline" },
  { to: "settings", label: "Settings" }
];
function TO() {
  const t = q_(), { deploymentId: a } = z_(), r = MO(t.catalog?.presets ?? []);
  return /* @__PURE__ */ w.jsxs(T3, { initialSettings: t.settings, initialPreset: r, children: [
    /* @__PURE__ */ w.jsxs("div", { className: vO, children: [
      /* @__PURE__ */ w.jsxs("header", { className: bO, children: [
        /* @__PURE__ */ w.jsxs("div", { className: xO, children: [
          /* @__PURE__ */ w.jsx("h1", { className: SO, children: "SVI 2.0 Pro" }),
          /* @__PURE__ */ w.jsx("p", { className: wO, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
        ] }),
        /* @__PURE__ */ w.jsx("nav", { className: EO, "aria-label": "Workspace views", children: CO.map((o) => /* @__PURE__ */ w.jsx(
          Ib,
          {
            to: `/${a}/${o.to}`,
            className: ({ isActive: s }) => [_O, s ? NO : ""].filter(Boolean).join(" "),
            children: o.label
          },
          o.to
        )) })
      ] }),
      /* @__PURE__ */ w.jsx("main", { className: RO, children: /* @__PURE__ */ w.jsx(t2, {}) })
    ] }),
    /* @__PURE__ */ w.jsx(tz, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function MO(t) {
  return t.find((a) => a.id === Vo) ?? t[0] ?? null;
}
async function DO() {
  const [t, a] = await Promise.all([
    Kb().catch(() => null),
    B2().catch(() => Qb)
  ]);
  return { catalog: t, settings: a };
}
function AO() {
  return [
    {
      path: "/",
      loader: () => ly("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: DO,
      Component: TO,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => ly(`/${zO(t, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: hO },
        { path: "dag", Component: Oz },
        { path: "settings", Component: yO }
      ]
    }
  ];
}
function zO(t, a) {
  const r = t[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const rb = "ext-actions-request", OO = "ext-actions-declare", jO = "ext-action-state", lb = "ext-action-invoke", _h = "svi2-pro:navigate", ob = "svi2-pro.render", sb = "svi2-pro.dag";
function LO(t, a) {
  let r = !1;
  const o = () => ({
    id: ob,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : "idle",
    tooltip: "Start the SVI 2.0 Pro render"
  }), s = () => ({
    primary: o(),
    secondary: {
      id: sb,
      label: "Pipeline",
      icon: "account_tree",
      tone: "secondary",
      tooltip: "Open the pipeline DAG view"
    }
  }), u = () => {
    t.dispatchEvent(
      new CustomEvent(OO, { detail: { actions: s() }, bubbles: !1 })
    );
  }, c = () => {
    t.dispatchEvent(
      new CustomEvent(jO, { detail: { action: o() }, bubbles: !1 })
    );
  }, h = () => u(), g = (y) => {
    const m = y.detail?.id;
    m === ob ? nz() : m === sb && t.dispatchEvent(
      new CustomEvent(_h, {
        detail: { path: `/${a}/dag` },
        bubbles: !1
      })
    );
  }, p = rz((y) => {
    r = y.busy, c();
  });
  return t.addEventListener(rb, h), t.addEventListener(lb, g), u(), {
    dispose: () => {
      p(), t.removeEventListener(rb, h), t.removeEventListener(lb, g);
    }
  };
}
const Nh = "svi2-pro-app", HO = "ext-event", ub = "svi2-pro-stylesheet", cb = ["accent", "density", "card"];
function BO(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function UO() {
  if (typeof document > "u" || document.getElementById(ub)) return;
  const t = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = ub, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
UO();
class kO extends HTMLElement {
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
    this.root = fE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(_h, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = LO(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const o = r.detail?.path;
      o && this.router && this.router.navigate(o);
    };
    this.navigateListener = a, this.addEventListener(_h, a);
  }
  syncTweaksFromBody() {
    for (const a of cb) {
      const r = BO(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: cb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = K_(AO(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ w.jsx(M.StrictMode, { children: /* @__PURE__ */ w.jsx(J_, { router: r }) })
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
      new CustomEvent(HO, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function VO() {
  typeof customElements > "u" || customElements.get(Nh) || customElements.define(Nh, kO);
}
typeof customElements < "u" && !customElements.get(Nh) && VO();
export {
  VO as register
};
//# sourceMappingURL=svi2-pro.js.map
